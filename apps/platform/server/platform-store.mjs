import argon2 from "argon2";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { chmodSync, mkdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { runPlatformMigrations } from "./migration-runner.mjs";

const USERNAME_PATTERN = /^[\p{L}\p{N}._-]{3,60}$/u;
const CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const OUTCOMES = new Set(["A*", "A", "B", "C", "No Grade", "Absent"]);

export class PlatformStoreError extends Error {
  constructor(message, code = "PLATFORM_STORE_ERROR", status = 400) {
    super(message);
    this.name = "PlatformStoreError";
    this.code = code;
    this.status = status;
  }
}

function timestamp(now = new Date()) {
  return now.toISOString();
}

function hash(value) {
  return createHash("sha256").update(String(value)).digest("hex");
}

function code(prefix, size = 12) {
  const bytes = randomBytes(size);
  return `${prefix}${[...bytes].map((value) => CODE_ALPHABET[value % CODE_ALPHABET.length]).join("")}`;
}

function jsonParse(value, fallback) {
  try { return JSON.parse(value); } catch { return fallback; }
}

function publicAccount(row) {
  if (!row) return null;
  return {
    account_id: row.id,
    username: row.username,
    display_name: row.display_name,
    role: row.role,
    class_name: row.class_name ?? null,
    status: row.status,
    created_at: row.created_at,
    last_login_at: row.last_login_at
  };
}

function credentials(value = {}) {
  const username = String(value.username ?? "").normalize("NFKC").trim();
  const password = String(value.password ?? "");
  const displayName = String(value.display_name ?? username).normalize("NFKC").trim().slice(0, 80) || username;
  if (!USERNAME_PATTERN.test(username)) throw new PlatformStoreError("Username must contain 3–60 letters, numbers, dots, underscores, or hyphens.", "USERNAME_INVALID");
  if (password.length < 10 || password.length > 128) throw new PlatformStoreError("Password must contain 10–128 characters.", "PASSWORD_INVALID");
  return { username, password, displayName };
}

async function passwordHash(password) {
  return argon2.hash(password, { type: argon2.argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1 });
}

function withTransaction(database, operation) {
  database.exec("BEGIN IMMEDIATE");
  try {
    const result = operation();
    database.exec("COMMIT");
    return result;
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

export function createPlatformStore({ dataDir, studentClasses = [], classJoinRequired = false, now = () => new Date() }) {
  mkdirSync(dataDir, { recursive: true, mode: 0o750 });
  chmodSync(dataDir, 0o750);
  const database = new DatabaseSync(join(dataDir, "econmark.sqlite"));
  database.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA synchronous = FULL;");
  const migration = runPlatformMigrations(database, { dataDir });
  const configuredStudentClasses = new Set(studentClasses.map((name) => String(name).normalize("NFKC").trim()).filter(Boolean));

  function configuredClassName(value, { required = true } = {}) {
    const className = String(value ?? "").normalize("NFKC").trim();
    if (!className && !required) return null;
    if (!className) throw new PlatformStoreError("Choose your class before continuing.", "CLASS_NAME_REQUIRED", 409);
    if (configuredStudentClasses.size && !configuredStudentClasses.has(className)) {
      throw new PlatformStoreError("Choose a class from the configured school list.", "CLASS_NAME_INVALID", 400);
    }
    return className;
  }

  function audit(actorId, action, targetType, targetId = null, details = {}) {
    database.prepare("INSERT INTO audit_events (id, actor_account_id, action, target_type, target_id, details_json, occurred_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(`audit_${randomUUID()}`, actorId ?? null, action, targetType, targetId, JSON.stringify(details), timestamp(now()));
  }

  function accountById(accountId) {
    return database.prepare("SELECT * FROM accounts WHERE id = ?").get(accountId);
  }

  function requireRole(accountId, roles) {
    const account = accountById(accountId);
    if (!account || account.status !== "active" || !roles.includes(account.role)) {
      throw new PlatformStoreError("This account does not have permission for that action.", "ROLE_FORBIDDEN", 403);
    }
    return account;
  }

  function teacherClass(teacherId, classId) {
    const row = database.prepare("SELECT * FROM classes WHERE id = ? AND owner_account_id = ?").get(classId, teacherId);
    if (!row) throw new PlatformStoreError("Class was not found.", "CLASS_NOT_FOUND", 404);
    return row;
  }

  function activeMembership(accountId, classId) {
    return database.prepare("SELECT 1 FROM class_memberships WHERE account_id = ? AND class_id = ? AND status = 'active'").get(accountId, classId);
  }

  function insertRecoveryCode(accountId, rawCode, createdAt) {
    database.prepare(`INSERT INTO recovery_codes (id, account_id, code_hash, created_at, used_at)
      VALUES (?, ?, ?, ?, NULL)
      ON CONFLICT(account_id) DO UPDATE SET id=excluded.id, code_hash=excluded.code_hash, created_at=excluded.created_at, used_at=NULL`)
      .run(`recovery_${randomUUID()}`, accountId, hash(rawCode), createdAt);
  }

  async function insertAccountWithRecovery(value, role, extraOperation) {
    const valid = credentials(value);
    const encoded = await passwordHash(valid.password);
    const accountId = `acct_${randomUUID()}`;
    const recoveryCode = code("R-", 16);
    const createdAt = timestamp(now());
    try {
      withTransaction(database, () => {
        database.prepare("INSERT INTO accounts (id, username, display_name, password_hash, created_at, updated_at, status, role, class_name) VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?)")
          .run(accountId, valid.username, valid.displayName, encoded, createdAt, createdAt, role, role === "student" ? value.class_name : null);
        insertRecoveryCode(accountId, recoveryCode, createdAt);
        extraOperation?.({ accountId, createdAt });
      });
    } catch (error) {
      if (String(error.message).includes("UNIQUE")) throw new PlatformStoreError("This username is already registered.", "USERNAME_TAKEN", 409);
      throw error;
    }
    return { account: publicAccount(accountById(accountId)), recovery_code: recoveryCode };
  }

  async function bootstrapAdmin(value) {
    const existing = Number(database.prepare("SELECT COUNT(*) AS count FROM accounts WHERE role = 'admin' AND status = 'active'").get().count);
    if (existing) throw new PlatformStoreError("An active platform administrator already exists.", "ADMIN_ALREADY_EXISTS", 409);
    const created = await insertAccountWithRecovery(value, "admin");
    audit(created.account.account_id, "admin.bootstrap", "account", created.account.account_id);
    return created;
  }

  function createTeacherInvitation(adminId, { expires_hours: expiresHours = 72 } = {}) {
    requireRole(adminId, ["admin"]);
    const raw = code("T-", 18);
    const createdAt = now();
    const boundedHours = Math.max(1, Math.min(Number(expiresHours) || 72, 720));
    const invitationId = `invite_${randomUUID()}`;
    database.prepare("INSERT INTO teacher_invitations (id, token_hash, created_by_account_id, created_at, expires_at) VALUES (?, ?, ?, ?, ?)")
      .run(invitationId, hash(raw), adminId, timestamp(createdAt), timestamp(new Date(createdAt.valueOf() + boundedHours * 3_600_000)));
    audit(adminId, "teacher_invitation.create", "teacher_invitation", invitationId, { expires_hours: boundedHours });
    return { invitation_id: invitationId, invitation_code: raw, expires_at: timestamp(new Date(createdAt.valueOf() + boundedHours * 3_600_000)) };
  }

  async function registerTeacher(value) {
    const invitation = database.prepare("SELECT * FROM teacher_invitations WHERE token_hash = ?").get(hash(String(value.invitation_code ?? "").trim().toUpperCase()));
    const current = timestamp(now());
    if (!invitation || invitation.used_at || invitation.expires_at <= current) {
      throw new PlatformStoreError("Teacher invitation is invalid, expired, or already used.", "TEACHER_INVITATION_INVALID", 403);
    }
    const created = await insertAccountWithRecovery(value, "teacher", ({ accountId, createdAt }) => {
      const result = database.prepare("UPDATE teacher_invitations SET used_at = ?, used_by_account_id = ? WHERE id = ? AND used_at IS NULL AND expires_at > ?")
        .run(createdAt, accountId, invitation.id, createdAt);
      if (!result.changes) throw new PlatformStoreError("Teacher invitation is no longer available.", "TEACHER_INVITATION_INVALID", 409);
    });
    audit(created.account.account_id, "teacher.register", "account", created.account.account_id, { invitation_id: invitation.id });
    return created;
  }

  async function registerStudent(value) {
    const rawJoinCode = String(value.join_code ?? "").trim().toUpperCase();
    if (classJoinRequired && !rawJoinCode) {
      throw new PlatformStoreError("请输入老师提供的班级邀请码。A teacher-issued class invitation is required.", "CLASS_INVITATION_REQUIRED", 403);
    }
    const classroom = rawJoinCode
      ? database.prepare("SELECT * FROM classes WHERE join_code_hash = ? AND status = 'active'").get(hash(rawJoinCode))
      : null;
    if (rawJoinCode && !classroom) throw new PlatformStoreError("Class join code is invalid.", "CLASS_JOIN_CODE_INVALID", 404);
    if (classroom && !classroom.consent_attested_at) throw new PlatformStoreError("Enrollment is not enabled until the teacher records the required authorization.", "CLASS_CONSENT_REQUIRED", 409);
    const className = classroom?.name || configuredClassName(value.class_name);
    const created = await insertAccountWithRecovery({ ...value, class_name: className }, "student", ({ accountId, createdAt }) => {
      if (classroom) database.prepare("INSERT INTO class_memberships (class_id, account_id, status, joined_at) VALUES (?, ?, 'active', ?)").run(classroom.id, accountId, createdAt);
    });
    audit(created.account.account_id, "student.register", classroom ? "class" : "account", classroom?.id || created.account.account_id, { class_name: className });
    return { ...created, class: classroom ? { class_id: classroom.id, name: classroom.name } : { class_id: null, name: className } };
  }

  function updateProfile(accountId, value = {}) {
    const account = requireRole(accountId, ["student", "teacher", "admin"]);
    const displayName = String(value.display_name ?? account.display_name).normalize("NFKC").trim().slice(0, 80);
    if (!displayName) throw new PlatformStoreError("Display name is required.", "DISPLAY_NAME_INVALID");
    const className = account.role === "student"
      ? configuredClassName(value.class_name ?? account.class_name)
      : null;
    const updatedAt = timestamp(now());
    database.prepare("UPDATE accounts SET display_name=?, class_name=?, updated_at=? WHERE id=?")
      .run(displayName, className, updatedAt, accountId);
    audit(accountId, "account.profile_update", "account", accountId, { class_name: className });
    return publicAccount(accountById(accountId));
  }

  function joinClass(studentId, rawCode) {
    requireRole(studentId, ["student"]);
    const classroom = database.prepare("SELECT * FROM classes WHERE join_code_hash = ? AND status = 'active'").get(hash(String(rawCode ?? "").trim().toUpperCase()));
    if (!classroom) throw new PlatformStoreError("Class join code is invalid.", "CLASS_JOIN_CODE_INVALID", 404);
    if (!classroom.consent_attested_at) throw new PlatformStoreError("Enrollment is not enabled for this class.", "CLASS_CONSENT_REQUIRED", 409);
    const joinedAt = timestamp(now());
    database.prepare(`INSERT INTO class_memberships (class_id, account_id, status, joined_at, removed_at)
      VALUES (?, ?, 'active', ?, NULL)
      ON CONFLICT(class_id, account_id) DO UPDATE SET status='active', joined_at=excluded.joined_at, removed_at=NULL`)
      .run(classroom.id, studentId, joinedAt);
    audit(studentId, "class.join", "class", classroom.id);
    return { class_id: classroom.id, name: classroom.name, joined_at: joinedAt };
  }

  async function recoverAccount({ username, recovery_code: recoveryCode, new_password: nextPassword }) {
    const account = database.prepare("SELECT * FROM accounts WHERE username = ? COLLATE NOCASE AND status = 'active'").get(String(username ?? "").normalize("NFKC").trim());
    const recovery = account ? database.prepare("SELECT * FROM recovery_codes WHERE account_id = ? AND code_hash = ? AND used_at IS NULL").get(account.id, hash(String(recoveryCode ?? "").trim().toUpperCase())) : null;
    if (!account || !recovery) throw new PlatformStoreError("Recovery details are invalid.", "RECOVERY_INVALID", 401);
    credentials({ username: account.username, display_name: account.display_name, password: nextPassword });
    const encoded = await passwordHash(String(nextPassword));
    const rotated = code("R-", 16);
    const changedAt = timestamp(now());
    withTransaction(database, () => {
      database.prepare("UPDATE accounts SET password_hash = ?, updated_at = ? WHERE id = ?").run(encoded, changedAt, account.id);
      database.prepare("DELETE FROM sessions WHERE account_id = ?").run(account.id);
      insertRecoveryCode(account.id, rotated, changedAt);
    });
    audit(account.id, "account.recover", "account", account.id);
    return { account: publicAccount(accountById(account.id)), recovery_code: rotated, sessions_revoked: true };
  }

  function rotateRecoveryCode(accountId) {
    requireRole(accountId, ["student", "teacher", "admin"]);
    const raw = code("R-", 16);
    const createdAt = timestamp(now());
    insertRecoveryCode(accountId, raw, createdAt);
    audit(accountId, "recovery.rotate", "account", accountId);
    return { recovery_code: raw, created_at: createdAt };
  }

  async function adminResetPassword(adminId, accountId, nextPassword) {
    requireRole(adminId, ["admin"]);
    const account = accountById(accountId);
    if (!account) throw new PlatformStoreError("Account was not found.", "ACCOUNT_NOT_FOUND", 404);
    credentials({ username: account.username, display_name: account.display_name, password: nextPassword });
    const encoded = await passwordHash(String(nextPassword));
    const raw = code("R-", 16);
    const changedAt = timestamp(now());
    withTransaction(database, () => {
      database.prepare("UPDATE accounts SET password_hash = ?, updated_at = ? WHERE id = ?").run(encoded, changedAt, accountId);
      database.prepare("DELETE FROM sessions WHERE account_id = ?").run(accountId);
      insertRecoveryCode(accountId, raw, changedAt);
    });
    audit(adminId, "account.admin_reset", "account", accountId);
    return { account: publicAccount(accountById(accountId)), recovery_code: raw, sessions_revoked: true };
  }

  function createClass(teacherId, value = {}) {
    requireRole(teacherId, ["teacher"]);
    const name = String(value.name ?? "").normalize("NFKC").trim().slice(0, 120);
    if (!name) throw new PlatformStoreError("Class name is required.", "CLASS_NAME_REQUIRED");
    const id = `class_${randomUUID()}`;
    const createdAt = timestamp(now());
    try {
      database.prepare("INSERT INTO classes (id, owner_account_id, name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)").run(id, teacherId, name, createdAt, createdAt);
    } catch (error) {
      if (String(error.message).includes("UNIQUE")) throw new PlatformStoreError("A class with that name already exists.", "CLASS_NAME_TAKEN", 409);
      throw error;
    }
    audit(teacherId, "class.create", "class", id);
    return classRecord(database.prepare("SELECT * FROM classes WHERE id = ?").get(id));
  }

  function classRecord(row) {
    if (!row) return null;
    return {
      class_id: row.id,
      name: row.name,
      owner_account_id: row.owner_account_id,
      status: row.status,
      enrollment_enabled: Boolean(row.consent_attested_at && row.join_code_hash),
      consent_attested_at: row.consent_attested_at,
      created_at: row.created_at,
      updated_at: row.updated_at
    };
  }

  function listClasses(actor) {
    if (actor.role === "teacher") return { items: database.prepare("SELECT * FROM classes WHERE owner_account_id = ? ORDER BY updated_at DESC").all(actor.account_id).map(classRecord) };
    if (actor.role === "admin") return { items: database.prepare("SELECT * FROM classes ORDER BY updated_at DESC").all().map(classRecord) };
    return { items: database.prepare(`SELECT c.* FROM classes c JOIN class_memberships m ON m.class_id=c.id
      WHERE m.account_id=? AND m.status='active' AND c.status='active' ORDER BY c.name`).all(actor.account_id).map(classRecord) };
  }

  function attestClassConsent(teacherId, classId, { statement_version: statementVersion = "school-authorization-v1" } = {}) {
    teacherClass(teacherId, classId);
    const attestedAt = timestamp(now());
    const id = `consent_${randomUUID()}`;
    withTransaction(database, () => {
      database.prepare("INSERT INTO class_consent_attestations (id, class_id, teacher_account_id, statement_version, attested_at) VALUES (?, ?, ?, ?, ?)")
        .run(id, classId, teacherId, String(statementVersion).slice(0, 80), attestedAt);
      database.prepare("UPDATE classes SET consent_attested_at=?, consent_attested_by_account_id=?, updated_at=? WHERE id=?").run(attestedAt, teacherId, attestedAt, classId);
    });
    audit(teacherId, "class.consent_attest", "class", classId, { statement_version: statementVersion });
    return { class_id: classId, attested_at: attestedAt, statement_version: statementVersion };
  }

  function rotateJoinCode(teacherId, classId) {
    const classroom = teacherClass(teacherId, classId);
    if (!classroom.consent_attested_at) throw new PlatformStoreError("Record school authorization before enabling enrollment.", "CLASS_CONSENT_REQUIRED", 409);
    const raw = code("", 8);
    const changedAt = timestamp(now());
    database.prepare("UPDATE classes SET join_code_hash=?, join_code_rotated_at=?, updated_at=? WHERE id=?").run(hash(raw), changedAt, changedAt, classId);
    audit(teacherId, "class.join_code_rotate", "class", classId);
    return { class_id: classId, join_code: raw, rotated_at: changedAt };
  }

  function roster(teacherId, classId) {
    const classroom = teacherClass(teacherId, classId);
    const students = database.prepare(`SELECT a.id, a.username, a.display_name, m.joined_at
      FROM class_memberships m JOIN accounts a ON a.id=m.account_id
      WHERE m.class_id=? AND m.status='active' AND a.status='active' AND a.role='student'
      ORDER BY a.display_name COLLATE NOCASE, a.username COLLATE NOCASE`).all(classId);
    return { class: classRecord(classroom), students: students.map((row) => ({ account_id: row.id, username: row.username, display_name: row.display_name, joined_at: row.joined_at })) };
  }

  function createLearningAssignment(teacherId, classId, value, contentCatalog) {
    teacherClass(teacherId, classId);
    const content = contentCatalog.get(String(value.content_id ?? ""));
    if (!content) throw new PlatformStoreError("Content item was not found.", "CONTENT_NOT_FOUND", 404);
    const id = `learning_${randomUUID()}`;
    const createdAt = timestamp(now());
    const kind = ["lesson", "quiz", "flashcards", "investment", "econmark"].includes(value.kind) ? value.kind : content.kind;
    database.prepare(`INSERT INTO learning_assignments
      (id,class_id,teacher_account_id,content_id,content_version,kind,title,instructions,available_at,due_at,completion_rule_json,status,created_at,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,'published',?,?)`)
      .run(id, classId, teacherId, content.id, content.version, kind, String(value.title ?? content.title).slice(0, 180), String(value.instructions ?? "").slice(0, 4000), value.available_at ?? null, value.due_at ?? null, JSON.stringify(value.completion_rule ?? {}), createdAt, createdAt);
    audit(teacherId, "learning_assignment.create", "learning_assignment", id, { class_id: classId, content_id: content.id });
    return learningAssignment(database.prepare("SELECT * FROM learning_assignments WHERE id=?").get(id));
  }

  function learningAssignment(row) {
    if (!row) return null;
    return { assignment_id: row.id, class_id: row.class_id, content_id: row.content_id, content_version: row.content_version, kind: row.kind, title: row.title, instructions: row.instructions, available_at: row.available_at, due_at: row.due_at, completion_rule: jsonParse(row.completion_rule_json, {}), status: row.status, created_at: row.created_at, updated_at: row.updated_at };
  }

  function listClassAssignments(teacherId, classId) {
    teacherClass(teacherId, classId);
    return { items: database.prepare("SELECT * FROM learning_assignments WHERE class_id=? ORDER BY created_at DESC").all(classId).map(learningAssignment) };
  }

  function listStudentAssignments(studentId) {
    requireRole(studentId, ["student"]);
    const current = timestamp(now());
    return { items: database.prepare(`SELECT la.* FROM learning_assignments la
      JOIN class_memberships m ON m.class_id=la.class_id
      WHERE m.account_id=? AND m.status='active' AND la.status='published'
        AND (la.available_at IS NULL OR la.available_at<=?)
      ORDER BY CASE WHEN la.due_at IS NULL THEN 1 ELSE 0 END, la.due_at, la.created_at DESC`).all(studentId, current).map(learningAssignment) };
  }

  function saveQuizAttempt(accountId, quiz, value, result) {
    const account = requireRole(accountId, ["student"]);
    if (!account.class_name) throw new PlatformStoreError("Choose your class before submitting a quiz.", "CLASS_NAME_REQUIRED", 409);
    const idempotency = String(value.idempotency_key ?? "").trim().slice(0, 120);
    if (!idempotency) throw new PlatformStoreError("Quiz attempt requires an idempotency key.", "IDEMPOTENCY_REQUIRED");
    const answersJson = JSON.stringify(result.normalized_answers ?? value.answers ?? {});
    const existing = database.prepare("SELECT * FROM quiz_attempts WHERE account_id=? AND idempotency_key=?").get(accountId, idempotency);
    if (existing) {
      if (existing.quiz_id !== quiz.id || existing.quiz_version !== quiz.version || existing.answers_json !== answersJson) {
        throw new PlatformStoreError("A retry cannot change the quiz or answers for an existing attempt.", "QUIZ_ATTEMPT_CONFLICT", 409);
      }
      return quizAttempt(existing);
    }
    const mode = value.mode === "assigned" ? "assigned" : "practice";
    let assignment = null;
    if (mode === "assigned") {
      assignment = database.prepare("SELECT * FROM learning_assignments WHERE id=? AND content_id=? AND status='published'").get(String(value.learning_assignment_id ?? ""), quiz.id);
      if (!assignment || !activeMembership(accountId, assignment.class_id)) throw new PlatformStoreError("Assigned quiz is unavailable for this account.", "QUIZ_ASSIGNMENT_INVALID", 403);
    }
    const attemptId = `attempt_${randomUUID()}`;
    database.prepare(`INSERT INTO quiz_attempts
      (id,quiz_id,quiz_version,account_id,class_id,learning_assignment_id,mode,answers_json,result_json,score,max_score,percentage,submitted_at,idempotency_key,class_name_snapshot,course_id,course_title,lesson_id,lesson_title)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .run(attemptId, quiz.id, quiz.version, accountId, assignment?.class_id ?? null, assignment?.id ?? null, mode, answersJson, JSON.stringify(result), result.score, result.max_score, result.percentage, timestamp(now()), idempotency, account.class_name, quiz.course_id ?? null, quiz.course_title ?? null, quiz.lesson_id ?? null, quiz.lesson_title ?? quiz.title ?? null);
    return quizAttempt(database.prepare("SELECT * FROM quiz_attempts WHERE id=?").get(attemptId));
  }

  function quizAttempt(row) {
    const result = jsonParse(row.result_json, {});
    const identity = row.username ? row : accountById(row.account_id);
    return {
      attempt_id: row.id,
      account_id: row.account_id,
      username: identity?.username ?? "",
      display_name: identity?.display_name ?? "",
      class_name: row.class_name_snapshot ?? null,
      course_id: row.course_id ?? null,
      course_title: row.course_title ?? null,
      lesson_id: row.lesson_id ?? null,
      lesson_title: row.lesson_title ?? null,
      quiz_id: row.quiz_id,
      quiz_version: row.quiz_version,
      mode: row.mode,
      learning_assignment_id: row.learning_assignment_id,
      score: row.score,
      max_score: row.max_score,
      percentage: row.percentage,
      answers: jsonParse(row.answers_json, {}),
      result,
      responses: result.questions ?? result.responses ?? [],
      submitted_at: row.submitted_at,
      created_at: row.submitted_at,
      saved: true
    };
  }

  function listOwnQuizAttempts(accountId, { limit = 100, offset = 0 } = {}) {
    requireRole(accountId, ["student"]);
    const boundedLimit = Math.max(1, Math.min(Number(limit) || 100, 500));
    const boundedOffset = Math.max(0, Number(offset) || 0);
    const total = Number(database.prepare("SELECT COUNT(*) AS value FROM quiz_attempts WHERE account_id=?").get(accountId).value);
    const rows = database.prepare("SELECT * FROM quiz_attempts WHERE account_id=? ORDER BY submitted_at DESC LIMIT ? OFFSET ?").all(accountId, boundedLimit, boundedOffset);
    return { total, items: rows.map(quizAttempt) };
  }

  function listSchoolQuizAttempts(teacherId, filters = {}) {
    requireRole(teacherId, ["teacher", "admin"]);
    const clauses = ["1=1"];
    const params = [];
    const exact = [
      ["class_name", "qa.class_name_snapshot"],
      ["course_id", "qa.course_id"],
      ["lesson_id", "qa.lesson_id"],
      ["quiz_id", "qa.quiz_id"],
      ["quiz_version", "qa.quiz_version"]
    ];
    for (const [key, column] of exact) {
      if (filters[key]) { clauses.push(`${column}=?`); params.push(String(filters[key])); }
    }
    if (filters.student) {
      clauses.push("(a.display_name LIKE ? OR a.username LIKE ?)");
      const term = `%${String(filters.student).slice(0, 80)}%`;
      params.push(term, term);
    }
    if (filters.date_from) { clauses.push("qa.submitted_at>=?"); params.push(String(filters.date_from)); }
    if (filters.date_to) { clauses.push("qa.submitted_at<=?"); params.push(`${String(filters.date_to).slice(0, 10)}T23:59:59.999Z`); }
    const view = ["latest", "best", "all"].includes(filters.view) ? filters.view : "latest";
    const order = view === "best" ? "qa.percentage DESC, qa.submitted_at DESC" : "qa.submitted_at DESC";
    const partitionOrder = view === "best" ? "qa.percentage DESC, qa.submitted_at DESC" : "qa.submitted_at DESC";
    const limit = Math.max(1, Math.min(Number(filters.limit) || 250, 10000));
    const offset = Math.max(0, Number(filters.offset) || 0);
    const where = clauses.join(" AND ");
    const base = `SELECT qa.*,a.username,a.display_name,ROW_NUMBER() OVER (PARTITION BY qa.account_id,qa.quiz_id ORDER BY ${partitionOrder}) AS attempt_rank FROM quiz_attempts qa JOIN accounts a ON a.id=qa.account_id WHERE ${where}`;
    const rankedFilter = view === "all" ? "" : "WHERE attempt_rank=1";
    const total = Number(database.prepare(`SELECT COUNT(*) AS value FROM (${base}) ${rankedFilter}`).get(...params).value);
    const rows = database.prepare(`SELECT * FROM (${base}) ${rankedFilter} ORDER BY ${order.replaceAll("qa.", "")} LIMIT ? OFFSET ?`).all(...params, limit, offset);
    const items = rows.map((row) => ({ ...quizAttempt(row), username: row.username, display_name: row.display_name }));
    return { total, view, items };
  }

  function recordLearningEvents(accountId, events = []) {
    requireRole(accountId, ["student", "teacher", "admin"]);
    if (!Array.isArray(events) || events.length > 200) throw new PlatformStoreError("Learning event batch must contain at most 200 events.", "EVENT_BATCH_INVALID");
    const inserted = [];
    withTransaction(database, () => {
      for (const raw of events) {
        const eventId = String(raw.event_id ?? "").slice(0, 120);
        const contentId = String(raw.content_id ?? "").slice(0, 240);
        const contentVersion = String(raw.content_version ?? "1.0.0").slice(0, 40);
        const eventType = String(raw.event_type ?? "").slice(0, 80);
        if (!eventId || !contentId || !eventType) continue;
        const classId = raw.class_id && activeMembership(accountId, raw.class_id) ? raw.class_id : null;
        const occurredAt = new Date(raw.occurred_at ?? now());
        const safeOccurredAt = Number.isNaN(occurredAt.valueOf()) ? now() : occurredAt;
        const result = database.prepare(`INSERT OR IGNORE INTO learning_events
          (id,event_id,account_id,class_id,learning_assignment_id,content_id,content_version,event_type,event_json,occurred_at,received_at)
          VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
          .run(`event_${randomUUID()}`, eventId, accountId, classId, raw.learning_assignment_id ?? null, contentId, contentVersion, eventType, JSON.stringify(raw.data ?? {}), timestamp(safeOccurredAt), timestamp(now()));
        if (!result.changes) continue;
        inserted.push(eventId);
        if (eventType === "active_time") {
          const seconds = Math.max(0, Math.min(60, Math.round(Number(raw.data?.seconds) || 0)));
          const day = timestamp(safeOccurredAt).slice(0, 10);
          database.prepare(`INSERT INTO learning_active_time (account_id,content_id,content_version,activity_date,seconds,last_event_at)
            VALUES (?,?,?,?,?,?) ON CONFLICT(account_id,content_id,content_version,activity_date)
            DO UPDATE SET seconds=MIN(14400, learning_active_time.seconds+excluded.seconds), last_event_at=excluded.last_event_at`)
            .run(accountId, contentId, contentVersion, day, seconds, timestamp(safeOccurredAt));
        }
        if (["slide_visible", "slide_complete", "lesson_complete"].includes(eventType)) {
          const current = database.prepare("SELECT * FROM lesson_progress WHERE account_id=? AND content_id=? AND content_version=?").get(accountId, contentId, contentVersion);
          const completed = new Set(jsonParse(current?.completed_slide_ids_json, []));
          if (eventType === "slide_complete" && raw.data?.slide_id) completed.add(String(raw.data.slide_id));
          database.prepare(`INSERT INTO lesson_progress
            (account_id,content_id,content_version,class_id,learning_assignment_id,last_slide_id,completed_slide_ids_json,completed_at,updated_at)
            VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(account_id,content_id,content_version) DO UPDATE SET
            class_id=excluded.class_id, learning_assignment_id=excluded.learning_assignment_id,
            last_slide_id=excluded.last_slide_id, completed_slide_ids_json=excluded.completed_slide_ids_json,
            completed_at=COALESCE(excluded.completed_at,lesson_progress.completed_at), updated_at=excluded.updated_at`)
            .run(accountId, contentId, contentVersion, classId, raw.learning_assignment_id ?? null, raw.data?.slide_id ?? current?.last_slide_id ?? null, JSON.stringify([...completed]), eventType === "lesson_complete" ? timestamp(safeOccurredAt) : null, timestamp(safeOccurredAt));
        }
      }
    });
    return { accepted: inserted.length, event_ids: inserted };
  }

  function studentProgress(accountId) {
    requireRole(accountId, ["student"]);
    return {
      lessons: database.prepare("SELECT * FROM lesson_progress WHERE account_id=? ORDER BY updated_at DESC").all(accountId).map((row) => ({ content_id: row.content_id, content_version: row.content_version, last_slide_id: row.last_slide_id, completed_slide_ids: jsonParse(row.completed_slide_ids_json, []), completed_at: row.completed_at, updated_at: row.updated_at })),
      active_time: database.prepare("SELECT content_id,content_version,SUM(seconds) AS seconds,MAX(last_event_at) AS last_event_at FROM learning_active_time WHERE account_id=? GROUP BY content_id,content_version ORDER BY last_event_at DESC").all(accountId),
      quiz_attempts: database.prepare("SELECT * FROM quiz_attempts WHERE account_id=? ORDER BY submitted_at DESC LIMIT 200").all(accountId).map(quizAttempt)
    };
  }

  function classProgress(teacherId, classId) {
    teacherClass(teacherId, classId);
    return {
      students: database.prepare(`SELECT a.id AS account_id,a.display_name,
        COALESCE((SELECT SUM(lat.seconds) FROM learning_active_time lat WHERE lat.account_id=a.id),0) AS active_seconds,
        (SELECT COUNT(DISTINCT lp.content_id) FROM lesson_progress lp WHERE lp.account_id=a.id AND (lp.class_id=? OR lp.class_id IS NULL)) AS lessons_started,
        (SELECT COUNT(DISTINCT lp.content_id) FROM lesson_progress lp WHERE lp.account_id=a.id AND lp.completed_at IS NOT NULL AND (lp.class_id=? OR lp.class_id IS NULL)) AS lessons_completed,
        (SELECT COUNT(*) FROM quiz_attempts qa WHERE qa.account_id=a.id AND qa.class_id=? AND qa.mode='assigned') AS assigned_quiz_attempts
        FROM class_memberships m JOIN accounts a ON a.id=m.account_id
        WHERE m.class_id=? AND m.status='active' AND a.status='active'
        ORDER BY a.display_name COLLATE NOCASE`).all(classId, classId, classId, classId)
    };
  }

  function closeStaleSelectorSessions() {
    const staleBefore = timestamp(new Date(now().valueOf() - 12 * 3_600_000));
    return database.prepare("UPDATE selector_sessions SET status='stale', completed_at=?, updated_at=?, version=version+1 WHERE status='active' AND updated_at<?")
      .run(timestamp(now()), timestamp(now()), staleBefore).changes;
  }

  function selectorClasses(teacherId) {
    requireRole(teacherId, ["teacher"]);
    return { items: database.prepare(`SELECT c.id AS class_id,c.name,COUNT(m.account_id) AS student_count
      FROM classes c LEFT JOIN class_memberships m ON m.class_id=c.id AND m.status='active'
      WHERE c.owner_account_id=? AND c.status='active' GROUP BY c.id,c.name ORDER BY c.name`).all(teacherId) };
  }

  function selectorSessionRecord(row) {
    if (!row) return null;
    return { session_id: row.id, class_id: row.class_id, lesson_content_id: row.lesson_content_id, learning_assignment_id: row.learning_assignment_id, selection_policy: row.selection_policy, status: row.status, version: row.version, started_at: row.started_at, updated_at: row.updated_at, completed_at: row.completed_at };
  }

  function selectorSessionState(teacherId, sessionId) {
    const row = database.prepare("SELECT * FROM selector_sessions WHERE id=? AND teacher_account_id=?").get(sessionId, teacherId);
    if (!row) throw new PlatformStoreError("Selector session was not found.", "SELECTOR_SESSION_NOT_FOUND", 404);
    return {
      ...selectorSessionRecord(row),
      roster: database.prepare("SELECT student_account_id AS account_id,student_display_name AS display_name,roster_position FROM selector_session_roster WHERE session_id=? ORDER BY roster_position").all(sessionId),
      attendance: database.prepare("SELECT student_account_id AS account_id,status,marked_at FROM selector_attendance WHERE session_id=?").all(sessionId),
      selections: database.prepare("SELECT id AS selection_id,event_id,student_account_id AS account_id,sequence_number,selected_at,outcome,outcome_at FROM selector_selections WHERE session_id=? ORDER BY sequence_number").all(sessionId)
    };
  }

  function startSelectorSession(teacherId, value = {}) {
    requireRole(teacherId, ["teacher"]);
    closeStaleSelectorSessions();
    const classId = String(value.class_id ?? "");
    teacherClass(teacherId, classId);
    const active = database.prepare("SELECT * FROM selector_sessions WHERE teacher_account_id=? AND class_id=? AND status='active'").get(teacherId, classId);
    if (active) return selectorSessionState(teacherId, active.id);
    const students = roster(teacherId, classId).students;
    if (!students.length) throw new PlatformStoreError("This class has no active student accounts.", "SELECTOR_ROSTER_EMPTY", 409);
    const sessionId = `selector_${randomUUID()}`;
    const startedAt = timestamp(now());
    withTransaction(database, () => {
      database.prepare(`INSERT INTO selector_sessions
        (id,teacher_account_id,class_id,lesson_content_id,learning_assignment_id,selection_policy,status,version,started_at,updated_at)
        VALUES (?,?,?,?,?,'session_random','active',1,?,?)`)
        .run(sessionId, teacherId, classId, value.lesson_content_id ?? null, value.learning_assignment_id ?? null, startedAt, startedAt);
      const insert = database.prepare("INSERT INTO selector_session_roster (session_id,student_account_id,student_display_name,roster_position) VALUES (?,?,?,?)");
      students.forEach((student, index) => insert.run(sessionId, student.account_id, student.display_name, index));
    });
    audit(teacherId, "selector.start", "selector_session", sessionId, { class_id: classId, roster_size: students.length });
    return selectorSessionState(teacherId, sessionId);
  }

  function recordSelectorEvents(teacherId, sessionId, value = {}) {
    requireRole(teacherId, ["teacher"]);
    const session = database.prepare("SELECT * FROM selector_sessions WHERE id=? AND teacher_account_id=?").get(sessionId, teacherId);
    if (!session) throw new PlatformStoreError("Selector session was not found.", "SELECTOR_SESSION_NOT_FOUND", 404);
    if (session.status !== "active") throw new PlatformStoreError("Selector session is already closed.", "SELECTOR_SESSION_CLOSED", 409);
    const events = Array.isArray(value.events) ? value.events.slice(0, 200) : [];
    for (const event of events) {
      event.event_id = String(event.event_id ?? "").slice(0, 120);
      if (!event.event_id) throw new PlatformStoreError("Selector events require an event_id.", "IDEMPOTENCY_REQUIRED");
    }
    if (Number(value.version) !== Number(session.version)) {
      const replay = events.length > 0 && events.every((event) => database.prepare("SELECT 1 FROM selector_event_log WHERE session_id=? AND event_id=?").get(sessionId, event.event_id));
      if (replay) return selectorSessionState(teacherId, sessionId);
      throw new PlatformStoreError("Selector session changed in another tab. Reload its latest state.", "SELECTOR_VERSION_CONFLICT", 409);
    }
    const changedAt = timestamp(now());
    let changed = 0;
    withTransaction(database, () => {
      for (const event of events) {
        if (database.prepare("SELECT 1 FROM selector_event_log WHERE session_id=? AND event_id=?").get(sessionId, event.event_id)) continue;
        const studentId = String(event.student_account_id ?? "");
        const rostered = database.prepare("SELECT 1 FROM selector_session_roster WHERE session_id=? AND student_account_id=?").get(sessionId, studentId);
        if (!rostered) throw new PlatformStoreError("Selector event references a student outside the session roster.", "SELECTOR_STUDENT_INVALID", 400);
        if (event.type === "attendance") {
          const status = event.status === "absent" ? "absent" : "present";
          database.prepare(`INSERT INTO selector_attendance (session_id,student_account_id,status,marked_at) VALUES (?,?,?,?)
            ON CONFLICT(session_id,student_account_id) DO UPDATE SET status=excluded.status,marked_at=excluded.marked_at`)
            .run(sessionId, studentId, status, String(event.occurred_at ?? changedAt));
        } else if (event.type === "selection") {
          if (database.prepare("SELECT 1 FROM selector_selections WHERE session_id=? AND student_account_id=?").get(sessionId, studentId)) {
            throw new PlatformStoreError("That student has already been selected in this session.", "SELECTOR_ALREADY_SELECTED", 409);
          }
          const sequence = Number(database.prepare("SELECT COALESCE(MAX(sequence_number),0)+1 AS next FROM selector_selections WHERE session_id=?").get(sessionId).next);
          database.prepare("INSERT INTO selector_selections (id,event_id,session_id,student_account_id,sequence_number,selected_at) VALUES (?,?,?,?,?,?)")
            .run(`selection_${randomUUID()}`, event.event_id, sessionId, studentId, sequence, String(event.occurred_at ?? changedAt));
        } else if (event.type === "outcome") {
          const outcome = String(event.outcome ?? "");
          if (!OUTCOMES.has(outcome)) throw new PlatformStoreError("Selector outcome is invalid.", "SELECTOR_OUTCOME_INVALID");
          const selection = event.selection_id
            ? database.prepare("SELECT * FROM selector_selections WHERE id=? AND session_id=?").get(String(event.selection_id), sessionId)
            : database.prepare("SELECT * FROM selector_selections WHERE session_id=? AND student_account_id=? ORDER BY sequence_number DESC LIMIT 1").get(sessionId, studentId);
          if (!selection) throw new PlatformStoreError("Selection was not found for that outcome.", "SELECTOR_SELECTION_NOT_FOUND", 404);
          database.prepare("UPDATE selector_selections SET outcome=?,outcome_at=? WHERE id=?").run(outcome, String(event.occurred_at ?? changedAt), selection.id);
        } else {
          throw new PlatformStoreError("Selector event type is invalid.", "SELECTOR_EVENT_INVALID");
        }
        database.prepare("INSERT INTO selector_event_log (id,event_id,session_id,event_type,recorded_at) VALUES (?,?,?,?,?)")
          .run(`selector_event_${randomUUID()}`, event.event_id, sessionId, event.type, changedAt);
        changed += 1;
      }
      if (changed) database.prepare("UPDATE selector_sessions SET version=version+1,updated_at=? WHERE id=?").run(changedAt, sessionId);
    });
    return selectorSessionState(teacherId, sessionId);
  }

  function completeSelectorSession(teacherId, sessionId, status = "completed") {
    requireRole(teacherId, ["teacher"]);
    const normalized = status === "reset" ? "reset" : "completed";
    const changedAt = timestamp(now());
    const result = database.prepare("UPDATE selector_sessions SET status=?,completed_at=?,updated_at=?,version=version+1 WHERE id=? AND teacher_account_id=? AND status='active'")
      .run(normalized, changedAt, changedAt, sessionId, teacherId);
    if (!result.changes) throw new PlatformStoreError("Active selector session was not found.", "SELECTOR_SESSION_NOT_FOUND", 404);
    audit(teacherId, `selector.${normalized}`, "selector_session", sessionId);
    return selectorSessionState(teacherId, sessionId);
  }

  function selectorReport(teacherId, classId) {
    teacherClass(teacherId, classId);
    return {
      class_id: classId,
      students: database.prepare(`SELECT a.id AS account_id,a.display_name,
        COUNT(ss.id) AS selected_count,
        SUM(CASE WHEN ss.outcome='A*' THEN 1 ELSE 0 END) AS a_star,
        SUM(CASE WHEN ss.outcome='A' THEN 1 ELSE 0 END) AS a_count,
        SUM(CASE WHEN ss.outcome='B' THEN 1 ELSE 0 END) AS b_count,
        SUM(CASE WHEN ss.outcome='C' THEN 1 ELSE 0 END) AS c_count,
        SUM(CASE WHEN ss.outcome='No Grade' THEN 1 ELSE 0 END) AS no_grade,
        MAX(ss.selected_at) AS last_selected_at
        FROM class_memberships m JOIN accounts a ON a.id=m.account_id
        LEFT JOIN selector_sessions se ON se.class_id=m.class_id
        LEFT JOIN selector_selections ss ON ss.session_id=se.id AND ss.student_account_id=a.id
        WHERE m.class_id=? AND m.status='active' GROUP BY a.id,a.display_name ORDER BY a.display_name COLLATE NOCASE`).all(classId)
    };
  }

  function privacyExport(accountId) {
    const account = requireRole(accountId, ["student", "teacher", "admin"]);
    const result = {
      exported_at: timestamp(now()),
      account: publicAccount(account),
      classes: listClasses(publicAccount(account)).items,
      assignments: database.prepare("SELECT * FROM learning_assignments WHERE teacher_account_id=? OR class_id IN (SELECT class_id FROM class_memberships WHERE account_id=?)").all(accountId, accountId).map(learningAssignment),
      quiz_attempts: database.prepare("SELECT * FROM quiz_attempts WHERE account_id=? ORDER BY submitted_at").all(accountId).map(quizAttempt),
      learning_events: database.prepare("SELECT event_id,content_id,content_version,event_type,event_json,occurred_at FROM learning_events WHERE account_id=? ORDER BY occurred_at").all(accountId).map((row) => ({ ...row, event: jsonParse(row.event_json, {}) })),
      lesson_progress: database.prepare("SELECT * FROM lesson_progress WHERE account_id=?").all(accountId),
      selector_participation: database.prepare("SELECT se.class_id,ss.sequence_number,ss.selected_at,ss.outcome,ss.outcome_at FROM selector_selections ss JOIN selector_sessions se ON se.id=ss.session_id WHERE ss.student_account_id=? ORDER BY ss.selected_at").all(accountId),
      econmark_runs: database.prepare("SELECT id,assignment_id,student_ref,source_name,status,created_at,updated_at,final_mark,max_mark,confidence FROM runs WHERE account_id=? ORDER BY created_at").all(accountId),
      uploads: database.prepare("SELECT id,original_name,mime_type,byte_size,sha256,created_at FROM images WHERE account_id=? ORDER BY created_at").all(accountId)
    };
    audit(accountId, "privacy.export", "account", accountId);
    return result;
  }

  function requestDeletion(accountId, details = {}) {
    requireRole(accountId, ["student", "teacher", "admin"]);
    const id = `privacy_${randomUUID()}`;
    const requestedAt = timestamp(now());
    database.prepare("INSERT INTO privacy_requests (id,account_id,request_type,status,details_json,requested_at) VALUES (?,?,'deletion','pending',?,?)")
      .run(id, accountId, JSON.stringify(details), requestedAt);
    audit(accountId, "privacy.deletion_request", "privacy_request", id);
    return { request_id: id, status: "pending", requested_at: requestedAt };
  }

  function correctAccount(accountId, value = {}) {
    const account = requireRole(accountId, ["student", "teacher", "admin"]);
    const displayName = String(value.display_name ?? "").normalize("NFKC").trim().slice(0, 80);
    if (!displayName) throw new PlatformStoreError("Display name is required.", "DISPLAY_NAME_REQUIRED");
    const updatedAt = timestamp(now());
    database.prepare("UPDATE accounts SET display_name=?,updated_at=? WHERE id=?").run(displayName, updatedAt, accountId);
    audit(accountId, "privacy.correction", "account", accountId, { field: "display_name" });
    return publicAccount(accountById(accountId));
  }

  async function completeDeletion(adminId, requestId) {
    requireRole(adminId, ["admin"]);
    const request = database.prepare("SELECT * FROM privacy_requests WHERE id=? AND request_type='deletion' AND status='pending'").get(requestId);
    if (!request) throw new PlatformStoreError("Pending deletion request was not found.", "PRIVACY_REQUEST_NOT_FOUND", 404);
    const account = accountById(request.account_id);
    const paths = database.prepare("SELECT stored_path FROM images WHERE account_id=?").all(account.id).map((row) => row.stored_path);
    const tombstone = `deleted-${randomUUID()}`;
    const encoded = await passwordHash(randomBytes(48).toString("base64url"));
    const completedAt = timestamp(now());
    const aggregatePeriod = completedAt.slice(0, 7);
    const aggregateValues = {
      accounts_deleted: 1,
      learning_active_seconds: Number(database.prepare("SELECT COALESCE(SUM(seconds),0) AS value FROM learning_active_time WHERE account_id=?").get(account.id).value),
      quiz_attempts: Number(database.prepare("SELECT COUNT(*) AS value FROM quiz_attempts WHERE account_id=?").get(account.id).value),
      selector_selections: Number(database.prepare("SELECT COUNT(*) AS value FROM selector_selections WHERE student_account_id=?").get(account.id).value),
      econmark_runs: Number(database.prepare("SELECT COUNT(*) AS value FROM runs WHERE account_id=?").get(account.id).value),
      upload_bytes: Number(database.prepare("SELECT COALESCE(SUM(byte_size),0) AS value FROM images WHERE account_id=?").get(account.id).value)
    };
    withTransaction(database, () => {
      const addAggregate = database.prepare(`INSERT INTO privacy_anonymous_aggregates (metric,period,value,updated_at) VALUES (?,?,?,?)
        ON CONFLICT(metric,period) DO UPDATE SET value=privacy_anonymous_aggregates.value+excluded.value,updated_at=excluded.updated_at`);
      Object.entries(aggregateValues).forEach(([metric, value]) => addAggregate.run(metric, aggregatePeriod, value, completedAt));
      database.prepare("DELETE FROM recovery_codes WHERE account_id=?").run(account.id);
      database.prepare("DELETE FROM sessions WHERE account_id=?").run(account.id);
      database.prepare("DELETE FROM learning_events WHERE account_id=?").run(account.id);
      database.prepare("DELETE FROM learning_active_time WHERE account_id=?").run(account.id);
      database.prepare("DELETE FROM lesson_progress WHERE account_id=?").run(account.id);
      database.prepare("DELETE FROM quiz_attempts WHERE account_id=?").run(account.id);
      database.prepare("DELETE FROM selector_attendance WHERE student_account_id=?").run(account.id);
      database.prepare("DELETE FROM selector_selections WHERE student_account_id=?").run(account.id);
      database.prepare("DELETE FROM selector_session_roster WHERE student_account_id=?").run(account.id);
      database.prepare("DELETE FROM class_memberships WHERE account_id=?").run(account.id);
      database.prepare("DELETE FROM images WHERE account_id=?").run(account.id);
      database.prepare("DELETE FROM runs WHERE account_id=?").run(account.id);
      database.prepare("DELETE FROM batches WHERE account_id=?").run(account.id);
      database.prepare("UPDATE accounts SET username=?,display_name='Deleted account',password_hash=?,status='deleted',deleted_at=?,updated_at=? WHERE id=?")
        .run(tombstone, encoded, completedAt, completedAt, account.id);
      database.prepare("UPDATE privacy_requests SET status='completed',completed_at=?,handled_by_account_id=? WHERE id=?").run(completedAt, adminId, requestId);
    });
    for (const path of paths) {
      try { unlinkSync(path); } catch (error) { if (error.code !== "ENOENT") throw error; }
    }
    audit(adminId, "privacy.deletion_complete", "privacy_request", requestId, { anonymized_account_id: account.id });
    return { request_id: requestId, status: "completed", completed_at: completedAt };
  }

  return Object.freeze({
    database,
    migration,
    bootstrapAdmin,
    createTeacherInvitation,
    registerTeacher,
    registerStudent,
    updateProfile,
    joinClass,
    recoverAccount,
    rotateRecoveryCode,
    adminResetPassword,
    createClass,
    listClasses,
    attestClassConsent,
    rotateJoinCode,
    roster,
    createLearningAssignment,
    listClassAssignments,
    listStudentAssignments,
    saveQuizAttempt,
    listOwnQuizAttempts,
    listSchoolQuizAttempts,
    recordLearningEvents,
    studentProgress,
    classProgress,
    selectorClasses,
    startSelectorSession,
    selectorSessionState,
    recordSelectorEvents,
    completeSelectorSession,
    selectorReport,
    privacyExport,
    requestDeletion,
    correctAccount,
    completeDeletion,
    closeStaleSelectorSessions,
    close() { database.close(); }
  });
}
