import argon2 from "argon2";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { chmodSync, createReadStream, mkdirSync, unlinkSync } from "node:fs";
import { chmod, mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { runPlatformMigrations } from "./migration-runner.mjs";

const USERNAME_PATTERN = /^[\p{L}\p{N}._-]{3,60}$/u;
const MIME_EXTENSIONS = Object.freeze({
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "application/pdf": ".pdf"
});

export class AccountStoreError extends Error {
  constructor(message, code = "ACCOUNT_STORE_ERROR", status = 400) {
    super(message);
    this.name = "AccountStoreError";
    this.code = code;
    this.status = status;
  }
}

function iso(now = new Date()) {
  return now.toISOString();
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function randomToken() {
  return randomBytes(32).toString("base64url");
}

function publicAccount(row) {
  if (!row) return null;
  return {
    account_id: row.id,
    username: row.username,
    display_name: row.display_name,
    role: row.role ?? "teacher",
    created_at: row.created_at,
    last_login_at: row.last_login_at,
    status: row.status
  };
}

const ASSIGNMENT_CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function assignmentCode() {
  const bytes = randomBytes(8);
  return [...bytes].map((value) => ASSIGNMENT_CODE_ALPHABET[value % ASSIGNMENT_CODE_ALPHABET.length]).join("");
}

function normalizedAssignment(value = {}) {
  const title = String(value.title ?? "").normalize("NFKC").trim();
  const studentInstructions = String(value.student_instructions ?? "").normalize("NFKC").trim();
  const questionText = String(value.question_text ?? "").trim();
  const commandWord = String(value.command_word ?? "");
  const maxMark = Number(value.max_mark);
  const markSchemeText = String(value.mark_scheme_text ?? "").trim();
  if (!title || !questionText || !markSchemeText) {
    throw new AccountStoreError("Title, question, and mark scheme are required.", "ASSIGNMENT_INCOMPLETE");
  }
  if (title.length > 160 || studentInstructions.length > 2000 || questionText.length > 5000 || markSchemeText.length > 30000) {
    throw new AccountStoreError("Assignment content exceeds the supported length.", "ASSIGNMENT_TOO_LONG");
  }
  if (!((commandWord === "Analyse" && maxMark === 6) || (commandWord === "Discuss" && maxMark === 8))) {
    throw new AccountStoreError("Assignments must use Analyse [6] or Discuss [8].", "ASSIGNMENT_TYPE_UNSUPPORTED");
  }
  return { title, studentInstructions, questionText, commandWord, maxMark, markSchemeText };
}

function assignmentRecord(row, { publicView = false } = {}) {
  if (!row) return null;
  const result = {
    assignment_id: row.id,
    series_id: row.series_id,
    parent_assignment_id: row.parent_assignment_id,
    owner_account_id: publicView ? undefined : row.owner_account_id,
    title: row.title,
    student_instructions: row.student_instructions,
    question_text: row.question_text,
    command_word: row.command_word,
    max_mark: row.max_mark,
    status: row.status,
    version: row.version,
    share_code: row.share_code,
    created_at: row.created_at,
    updated_at: row.updated_at,
    published_at: row.published_at,
    archived_at: row.archived_at
  };
  if (!publicView) result.mark_scheme_text = row.mark_scheme_text;
  if (publicView) delete result.owner_account_id;
  return result;
}

function assertCredentials({ username, password, display_name: displayName }) {
  const normalizedUsername = String(username ?? "").normalize("NFKC").trim();
  if (!USERNAME_PATTERN.test(normalizedUsername)) {
    throw new AccountStoreError("Username must contain 3–60 letters, numbers, dots, underscores, or hyphens.", "USERNAME_INVALID");
  }
  const normalizedPassword = String(password ?? "");
  if (normalizedPassword.length < 10 || normalizedPassword.length > 128) {
    throw new AccountStoreError("Password must contain 10–128 characters.", "PASSWORD_INVALID");
  }
  const normalizedDisplayName = String(displayName ?? normalizedUsername).normalize("NFKC").trim().slice(0, 80) || normalizedUsername;
  return { username: normalizedUsername, password: normalizedPassword, displayName: normalizedDisplayName };
}

function decodeDataUrl(dataUrl, expectedMimeType, maximumBytes) {
  const match = String(dataUrl ?? "").match(/^data:([^;,]+);base64,([A-Za-z0-9+/=\r\n]+)$/);
  if (!match || match[1] !== expectedMimeType || !(expectedMimeType in MIME_EXTENSIONS)) {
    throw new AccountStoreError("Uploaded file data is invalid or does not match its MIME type.", "IMAGE_DATA_INVALID");
  }
  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length) throw new AccountStoreError("Uploaded file is empty.", "IMAGE_EMPTY");
  if (bytes.length > maximumBytes) throw new AccountStoreError("Uploaded file exceeds the configured server limit.", "FILE_TOO_LARGE", 413);
  return bytes;
}

function parseJson(value, fallback = null) {
  try { return JSON.parse(value); } catch { return fallback; }
}

export function createAccountStore({ dataDir, maxFileBytes, studentMaxFileBytes = maxFileBytes, teacherMaxFileBytes = maxFileBytes, maxBatchSize = 100, maxBatchTotalBytes = 512 * 1024 * 1024, maxAccountStorageBytes = 50 * 1024 * 1024 * 1024, studentStorageBytes = maxAccountStorageBytes, teacherStorageBytes = maxAccountStorageBytes, uploadGuard = () => ({ allowed: true }), sessionTtlMs, now = () => new Date() }) {
  mkdirSync(dataDir, { recursive: true, mode: 0o750 });
  chmodSync(dataDir, 0o750);
  const imageRoot = join(dataDir, "images");
  mkdirSync(imageRoot, { recursive: true, mode: 0o750 });
  chmodSync(imageRoot, 0o750);
  const database = new DatabaseSync(join(dataDir, "econmark.sqlite"));
  database.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA synchronous = FULL;");
  database.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL COLLATE NOCASE UNIQUE,
      display_name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      last_login_at TEXT,
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
      role TEXT NOT NULL DEFAULT 'teacher' CHECK (role IN ('student', 'teacher'))
    );
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
      token_hash TEXT NOT NULL UNIQUE,
      csrf_token TEXT NOT NULL,
      csrf_hash TEXT NOT NULL,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      last_seen_at TEXT NOT NULL,
      user_agent TEXT,
      ip_hash TEXT
    );
    CREATE INDEX IF NOT EXISTS sessions_account_idx ON sessions(account_id);
    CREATE INDEX IF NOT EXISTS sessions_expiry_idx ON sessions(expires_at);
    CREATE TABLE IF NOT EXISTS assignments (
      id TEXT PRIMARY KEY,
      series_id TEXT NOT NULL,
      parent_assignment_id TEXT REFERENCES assignments(id) ON DELETE RESTRICT,
      owner_account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
      title TEXT NOT NULL,
      student_instructions TEXT NOT NULL DEFAULT '',
      question_text TEXT NOT NULL,
      command_word TEXT NOT NULL CHECK (command_word IN ('Analyse', 'Discuss')),
      max_mark INTEGER NOT NULL CHECK (max_mark IN (6, 8)),
      mark_scheme_text TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
      version INTEGER NOT NULL DEFAULT 1,
      share_code TEXT UNIQUE,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      published_at TEXT,
      archived_at TEXT
    );
    CREATE INDEX IF NOT EXISTS assignments_owner_idx ON assignments(owner_account_id, updated_at DESC);
    CREATE INDEX IF NOT EXISTS assignments_series_idx ON assignments(series_id, version DESC);
    CREATE TABLE IF NOT EXISTS batches (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
      assignment_id TEXT REFERENCES assignments(id) ON DELETE RESTRICT,
      assignment_json TEXT NOT NULL,
      approval_mode TEXT NOT NULL CHECK (approval_mode IN ('teacher_review', 'full_auto')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS batches_account_idx ON batches(account_id, created_at DESC);
    CREATE TABLE IF NOT EXISTS runs (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
      assignment_id TEXT REFERENCES assignments(id) ON DELETE RESTRICT,
      batch_id TEXT REFERENCES batches(id) ON DELETE RESTRICT,
      source_type TEXT NOT NULL CHECK (source_type IN ('upload', 'sample')),
      student_ref TEXT NOT NULL,
      source_name TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('completed', 'rejected')),
      workflow_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      final_mark INTEGER,
      max_mark INTEGER NOT NULL,
      confidence TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS runs_account_idx ON runs(account_id, created_at DESC);
    CREATE INDEX IF NOT EXISTS runs_batch_idx ON runs(batch_id, created_at ASC);
    CREATE TABLE IF NOT EXISTS images (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
      run_id TEXT NOT NULL UNIQUE REFERENCES runs(id) ON DELETE RESTRICT,
      original_name TEXT NOT NULL,
      stored_path TEXT NOT NULL UNIQUE,
      mime_type TEXT NOT NULL,
      byte_size INTEGER NOT NULL,
      sha256 TEXT NOT NULL,
      created_at TEXT NOT NULL,
      immutable INTEGER NOT NULL DEFAULT 1 CHECK (immutable = 1)
    );
    CREATE INDEX IF NOT EXISTS images_account_idx ON images(account_id, created_at DESC);
  `);

  const accountColumns = new Set(database.prepare("PRAGMA table_info(accounts)").all().map((column) => column.name));
  if (!accountColumns.has("role")) database.exec("ALTER TABLE accounts ADD COLUMN role TEXT NOT NULL DEFAULT 'teacher' CHECK (role IN ('student', 'teacher'))");
  const batchColumns = new Set(database.prepare("PRAGMA table_info(batches)").all().map((column) => column.name));
  if (!batchColumns.has("assignment_id")) database.exec("ALTER TABLE batches ADD COLUMN assignment_id TEXT REFERENCES assignments(id) ON DELETE RESTRICT");
  const runColumns = new Set(database.prepare("PRAGMA table_info(runs)").all().map((column) => column.name));
  if (!runColumns.has("assignment_id")) database.exec("ALTER TABLE runs ADD COLUMN assignment_id TEXT REFERENCES assignments(id) ON DELETE RESTRICT");
  const schemaVersion = Number(database.prepare("PRAGMA user_version").get().user_version ?? 0);
  if (schemaVersion < 4) database.exec("PRAGMA user_version = 4");
  runPlatformMigrations(database, { dataDir });

  const statements = {
    accountByUsername: database.prepare("SELECT * FROM accounts WHERE username = ? COLLATE NOCASE"),
    accountById: database.prepare("SELECT * FROM accounts WHERE id = ?"),
    insertAccount: database.prepare("INSERT INTO accounts (id, username, display_name, password_hash, created_at, updated_at, status, role) VALUES (?, ?, ?, ?, ?, ?, 'active', ?)"),
    updateLogin: database.prepare("UPDATE accounts SET last_login_at = ?, updated_at = ? WHERE id = ?"),
    updatePassword: database.prepare("UPDATE accounts SET password_hash = ?, updated_at = ? WHERE id = ?"),
    insertSession: database.prepare("INSERT INTO sessions (id, account_id, token_hash, csrf_token, csrf_hash, created_at, expires_at, last_seen_at, user_agent, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)") ,
    sessionByHash: database.prepare("SELECT s.*, a.username, a.display_name, a.created_at AS account_created_at, a.last_login_at, a.status, a.role FROM sessions s JOIN accounts a ON a.id = s.account_id WHERE s.token_hash = ?"),
    touchSession: database.prepare("UPDATE sessions SET last_seen_at = ? WHERE id = ?"),
    deleteSession: database.prepare("DELETE FROM sessions WHERE token_hash = ?"),
    deleteOtherSessions: database.prepare("DELETE FROM sessions WHERE account_id = ? AND id <> ?"),
    deleteExpiredSessions: database.prepare("DELETE FROM sessions WHERE expires_at <= ?"),
    runById: database.prepare("SELECT * FROM runs WHERE id = ? AND account_id = ?"),
    runByIdAny: database.prepare("SELECT * FROM runs WHERE id = ?"),
    imageByRun: database.prepare("SELECT * FROM images WHERE run_id = ? AND account_id = ?"),
    imageById: database.prepare("SELECT * FROM images WHERE id = ? AND account_id = ?"),
    listRuns: database.prepare("SELECT id, assignment_id, batch_id, source_type, student_ref, source_name, status, created_at, updated_at, final_mark, max_mark, confidence FROM runs WHERE account_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?"),
    countRuns: database.prepare("SELECT COUNT(*) AS count FROM runs WHERE account_id = ?"),
    insertRun: database.prepare("INSERT INTO runs (id, account_id, assignment_id, batch_id, source_type, student_ref, source_name, status, workflow_json, created_at, updated_at, final_mark, max_mark, confidence) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"),
    insertImage: database.prepare("INSERT INTO images (id, account_id, run_id, original_name, stored_path, mime_type, byte_size, sha256, created_at, immutable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)"),
    updateRun: database.prepare("UPDATE runs SET status = ?, workflow_json = ?, updated_at = ?, final_mark = ?, max_mark = ?, confidence = ? WHERE id = ? AND account_id = ?"),
    batchById: database.prepare("SELECT * FROM batches WHERE id = ?"),
    batchRunCount: database.prepare("SELECT COUNT(*) AS count FROM runs WHERE batch_id = ? AND account_id = ?"),
    batchByteTotal: database.prepare("SELECT COALESCE(SUM(i.byte_size), 0) AS total FROM images i JOIN runs r ON r.id = i.run_id WHERE r.batch_id = ? AND r.account_id = ?"),
    accountByteTotal: database.prepare("SELECT COALESCE(SUM(byte_size), 0) AS total FROM images WHERE account_id = ?"),
    insertBatch: database.prepare("INSERT INTO batches (id, account_id, assignment_id, assignment_json, approval_mode, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"),
    assignmentById: database.prepare("SELECT * FROM assignments WHERE id = ?"),
    assignmentByCode: database.prepare("SELECT * FROM assignments WHERE share_code = ? AND status = 'published'"),
    assignmentsByOwner: database.prepare("SELECT * FROM assignments WHERE owner_account_id = ? ORDER BY updated_at DESC"),
    insertAssignment: database.prepare("INSERT INTO assignments (id, series_id, parent_assignment_id, owner_account_id, title, student_instructions, question_text, command_word, max_mark, mark_scheme_text, status, version, share_code, created_at, updated_at, published_at, archived_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"),
    updateAssignmentDraft: database.prepare("UPDATE assignments SET title = ?, student_instructions = ?, question_text = ?, command_word = ?, max_mark = ?, mark_scheme_text = ?, updated_at = ? WHERE id = ? AND owner_account_id = ? AND status = 'draft'"),
    publishAssignment: database.prepare("UPDATE assignments SET status = 'published', share_code = ?, published_at = ?, updated_at = ? WHERE id = ? AND owner_account_id = ? AND status = 'draft'"),
    archiveAssignment: database.prepare("UPDATE assignments SET status = 'archived', archived_at = ?, updated_at = ? WHERE id = ? AND owner_account_id = ? AND status = 'published'"),
    maxAssignmentVersion: database.prepare("SELECT COALESCE(MAX(version), 0) AS version FROM assignments WHERE series_id = ?"),
    assignmentSubmissionRows: database.prepare("SELECT r.* FROM runs r JOIN assignments a ON a.id = r.assignment_id JOIN accounts submitter ON submitter.id = r.account_id WHERE a.owner_account_id = ? AND a.id = ? AND submitter.role = 'student' ORDER BY r.created_at DESC"),
    assignmentSubmissionCount: database.prepare("SELECT COUNT(*) AS count FROM runs r JOIN assignments a ON a.id = r.assignment_id JOIN accounts submitter ON submitter.id = r.account_id WHERE a.owner_account_id = ? AND a.id = ? AND submitter.role = 'student'")
  };

  async function register(credentials) {
    const valid = assertCredentials(credentials);
    const role = credentials?.role === "admin" ? "admin" : credentials?.role === "teacher" ? "teacher" : "student";
    const createdAt = iso(now());
    const passwordHash = await argon2.hash(valid.password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1
    });
    const accountId = `acct_${randomUUID()}`;
    try {
      statements.insertAccount.run(accountId, valid.username, valid.displayName, passwordHash, createdAt, createdAt, role);
    } catch (error) {
      if (String(error.message).includes("UNIQUE")) throw new AccountStoreError("This username is already registered.", "USERNAME_TAKEN", 409);
      throw error;
    }
    return publicAccount(statements.accountById.get(accountId));
  }

  async function authenticate(credentials) {
    const username = String(credentials?.username ?? "").normalize("NFKC").trim();
    const password = String(credentials?.password ?? "");
    const row = statements.accountByUsername.get(username);
    if (!row || row.status !== "active" || !(await argon2.verify(row.password_hash, password))) {
      throw new AccountStoreError("Username or password is incorrect.", "LOGIN_INVALID", 401);
    }
    const loggedInAt = iso(now());
    statements.updateLogin.run(loggedInAt, loggedInAt, row.id);
    return publicAccount(statements.accountById.get(row.id));
  }

  function createSession(accountId, { userAgent = "", ip = "" } = {}) {
    const token = randomToken();
    const csrfToken = randomToken();
    const createdAt = now();
    const expiresAt = new Date(createdAt.valueOf() + sessionTtlMs);
    statements.insertSession.run(
      `sess_${randomUUID()}`,
      accountId,
      sha256(token),
      csrfToken,
      sha256(csrfToken),
      iso(createdAt),
      iso(expiresAt),
      iso(createdAt),
      String(userAgent).slice(0, 500),
      ip ? sha256(ip) : null
    );
    return { token, csrfToken, expiresAt: iso(expiresAt) };
  }

  function sessionForToken(token) {
    if (!token) return null;
    const timestamp = iso(now());
    statements.deleteExpiredSessions.run(timestamp);
    const row = statements.sessionByHash.get(sha256(token));
    if (!row || row.status !== "active" || row.expires_at <= timestamp) return null;
    statements.touchSession.run(timestamp, row.id);
    return {
      sessionId: row.id,
      account: publicAccount({
        id: row.account_id,
        username: row.username,
        display_name: row.display_name,
        created_at: row.account_created_at,
        last_login_at: row.last_login_at,
      status: row.status,
      role: row.role
      }),
      csrfToken: row.csrf_token,
      csrfHash: row.csrf_hash,
      expiresAt: row.expires_at
    };
  }

  function endSession(token) {
    if (token) statements.deleteSession.run(sha256(token));
  }

  async function changePassword(accountId, currentPassword, nextPassword) {
    const row = statements.accountById.get(accountId);
    if (!row || !(await argon2.verify(row.password_hash, String(currentPassword ?? "")))) {
      throw new AccountStoreError("Current password is incorrect.", "CURRENT_PASSWORD_INVALID", 401);
    }
    assertCredentials({ username: row.username, password: nextPassword, display_name: row.display_name });
    const passwordHash = await argon2.hash(String(nextPassword), { type: argon2.argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1 });
    statements.updatePassword.run(passwordHash, iso(now()), accountId);
  }

  function ensureBatch({ batchId, accountId, assignmentId, assignment, approvalMode }) {
    if (!batchId) return null;
    const existing = statements.batchById.get(batchId);
    if (existing && existing.account_id !== accountId) throw new AccountStoreError("Batch identifier belongs to another account.", "BATCH_OWNERSHIP_CONFLICT", 409);
    if (existing && (existing.assignment_id ?? null) !== (assignmentId ?? null)) throw new AccountStoreError("Batch assignment cannot change after the batch starts.", "BATCH_ASSIGNMENT_CONFLICT", 409);
    if (!existing) {
      const createdAt = iso(now());
      statements.insertBatch.run(batchId, accountId, assignmentId ?? null, JSON.stringify(assignment ?? {}), approvalMode === "full_auto" ? "full_auto" : "teacher_review", createdAt, createdAt);
    }
    return batchId;
  }

  async function persistWorkflow({ accountId, payload, workflow }) {
    const runId = workflow?.output?.run_id ?? workflow?.input?.run_id;
    if (!runId) throw new AccountStoreError("Workflow has no run identifier.", "RUN_ID_MISSING");
    const existing = statements.runById.get(runId, accountId);
    if (existing) return storedRun(existing, accountId);
    const account = statements.accountById.get(accountId);
    if (!account) throw new AccountStoreError("Account was not found.", "ACCOUNT_NOT_FOUND", 404);
    const guard = uploadGuard();
    if (!guard.allowed) throw new AccountStoreError("New uploads are temporarily paused because server storage reached its safety threshold.", "UPLOAD_STORAGE_GUARD", 507);
    const roleFileLimit = account.role === "student" ? studentMaxFileBytes : teacherMaxFileBytes;
    const roleStorageLimit = account.role === "student" ? studentStorageBytes : teacherStorageBytes;
    const mimeType = String(payload.answer_mime_type ?? "");
    const bytes = decodeDataUrl(payload.answer_data_url, mimeType, roleFileLimit);
    const createdAt = iso(now());
    const imageId = `image_${randomUUID()}`;
    const extension = MIME_EXTENSIONS[mimeType] ?? (extname(String(payload.answer_name ?? "")) || ".bin");
    const accountDirectory = join(imageRoot, accountId);
    await mkdir(accountDirectory, { recursive: true, mode: 0o700 });
    await chmod(accountDirectory, 0o700);
    const storedName = `${imageId}${extension}`;
    const storedPath = join(accountDirectory, storedName);
    const currentAccountBytes = Number(statements.accountByteTotal.get(accountId).total);
    if (currentAccountBytes + bytes.length > roleStorageLimit) {
      throw new AccountStoreError("This account has reached its configured permanent-storage quota.", "ACCOUNT_STORAGE_QUOTA_REACHED", 413);
    }
    await writeFile(storedPath, bytes, { flag: "wx", mode: 0o600 });
    const output = workflow.output;
    const status = output.teacher_review?.decision === "rejected" ? "rejected" : "completed";
    database.exec("BEGIN IMMEDIATE");
    try {
      const accountByteTotal = Number(statements.accountByteTotal.get(accountId).total);
      if (accountByteTotal + bytes.length > roleStorageLimit) {
        throw new AccountStoreError("This account has reached its configured permanent-storage quota.", "ACCOUNT_STORAGE_QUOTA_REACHED", 413);
      }
      const batchId = ensureBatch({
        batchId: payload.batch_id ?? null,
        accountId,
        assignmentId: payload.assignment_id ?? null,
        assignment: payload.assignment,
        approvalMode: payload.approval_mode
      });
      if (batchId) {
        const runCount = Number(statements.batchRunCount.get(batchId, accountId).count);
        const byteTotal = Number(statements.batchByteTotal.get(batchId, accountId).total);
        if (runCount >= maxBatchSize) throw new AccountStoreError(`This batch has reached the configured limit of ${maxBatchSize} answers.`, "BATCH_TOO_LARGE", 413);
        if (byteTotal + bytes.length > maxBatchTotalBytes) throw new AccountStoreError("This batch exceeds the configured total upload size.", "BATCH_TOTAL_TOO_LARGE", 413);
      }
      statements.insertRun.run(
        runId,
        accountId,
        payload.assignment_id ?? null,
        batchId,
        payload.sample_id ? "sample" : "upload",
        workflow.input.student_ref,
        String(payload.answer_name ?? "answer"),
        status,
        JSON.stringify(workflow),
        createdAt,
        createdAt,
        output.final_mark,
        output.max_mark,
        output.confidence
      );
      statements.insertImage.run(imageId, accountId, runId, String(payload.answer_name ?? "answer"), storedPath, mimeType, bytes.length, sha256(bytes), createdAt);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      try { unlinkSync(storedPath); } catch (unlinkError) { if (unlinkError.code !== "ENOENT") throw unlinkError; }
      throw error;
    }
    return storedRun(statements.runById.get(runId, accountId), accountId);
  }

  function storedRun(row, accountId) {
    if (!row) return null;
    const image = statements.imageByRun.get(row.id, accountId);
    return {
      ...parseJson(row.workflow_json, {}),
      persistence: {
        run_id: row.id,
        assignment_id: row.assignment_id,
        account_id: row.account_id,
        batch_id: row.batch_id,
        image_id: image?.id ?? null,
        image_url: image ? `/api/images/${encodeURIComponent(image.id)}` : null,
        stored_at: row.created_at,
        updated_at: row.updated_at,
        retention_policy: "permanent_no_automatic_deletion"
      }
    };
  }

  function getRun(runId, accountId) {
    return storedRun(statements.runById.get(runId, accountId), accountId);
  }

  function listRuns(accountId, { limit = 100, offset = 0 } = {}) {
    const boundedLimit = Math.max(1, Math.min(Number(limit) || 100, 500));
    const boundedOffset = Math.max(0, Number(offset) || 0);
    return {
      total: Number(statements.countRuns.get(accountId).count),
      items: statements.listRuns.all(accountId, boundedLimit, boundedOffset).map((row) => ({
        run_id: row.id,
        assignment_id: row.assignment_id,
        batch_id: row.batch_id,
        source_type: row.source_type,
        student_ref: row.student_ref,
        source_name: row.source_name,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        final_mark: row.final_mark,
        max_mark: row.max_mark,
        confidence: row.confidence,
        result_url: `/api/runs/${encodeURIComponent(row.id)}`
      }))
    };
  }

  function updateWorkflow(runId, accountId, workflow) {
    const existing = statements.runById.get(runId, accountId);
    if (!existing) throw new AccountStoreError("Stored result was not found.", "RUN_NOT_FOUND", 404);
    const output = workflow.output;
    const status = output.teacher_review?.decision === "rejected" ? "rejected" : "completed";
    const updatedAt = iso(now());
    statements.updateRun.run(status, JSON.stringify(workflow), updatedAt, output.final_mark, output.max_mark, output.confidence, runId, accountId);
    return storedRun(statements.runById.get(runId, accountId), accountId);
  }

  function assignmentOwnedBy(assignmentId, accountId) {
    const assignment = statements.assignmentById.get(assignmentId);
    return assignment?.owner_account_id === accountId ? assignment : null;
  }

  function canAccessRun(row, actor) {
    if (!row || !actor) return false;
    if (row.account_id === actor.account_id) return true;
    return actor.role === "teacher" && row.assignment_id && Boolean(assignmentOwnedBy(row.assignment_id, actor.account_id));
  }

  function getRunForActor(runId, actor) {
    const row = statements.runByIdAny.get(runId);
    return canAccessRun(row, actor) ? storedRun(row, row.account_id) : null;
  }

  function updateWorkflowForActor(runId, actor, workflow) {
    const row = statements.runByIdAny.get(runId);
    if (!canAccessRun(row, actor) || actor.role !== "teacher") return null;
    return updateWorkflow(runId, row.account_id, workflow);
  }

  function createAssignment(ownerAccountId, value) {
    const valid = normalizedAssignment(value);
    const id = `assignment_${randomUUID()}`;
    const createdAt = iso(now());
    statements.insertAssignment.run(id, id, null, ownerAccountId, valid.title, valid.studentInstructions, valid.questionText, valid.commandWord, valid.maxMark, valid.markSchemeText, "draft", 1, null, createdAt, createdAt, null, null);
    return assignmentRecord(statements.assignmentById.get(id));
  }

  function listAssignments(ownerAccountId) {
    return { items: statements.assignmentsByOwner.all(ownerAccountId).map((row) => assignmentRecord(row)) };
  }

  function getAssignment(assignmentId, ownerAccountId) {
    const row = statements.assignmentById.get(assignmentId);
    return row?.owner_account_id === ownerAccountId ? assignmentRecord(row) : null;
  }

  function updateAssignment(assignmentId, ownerAccountId, value) {
    const valid = normalizedAssignment(value);
    const result = statements.updateAssignmentDraft.run(valid.title, valid.studentInstructions, valid.questionText, valid.commandWord, valid.maxMark, valid.markSchemeText, iso(now()), assignmentId, ownerAccountId);
    if (!result.changes) throw new AccountStoreError("Only an owned draft assignment can be edited.", "ASSIGNMENT_NOT_EDITABLE", 409);
    return assignmentRecord(statements.assignmentById.get(assignmentId));
  }

  function publishAssignment(assignmentId, ownerAccountId) {
    let code;
    let result;
    for (let attempt = 0; attempt < 8; attempt += 1) {
      code = assignmentCode();
      const publishedAt = iso(now());
      try {
        result = statements.publishAssignment.run(code, publishedAt, publishedAt, assignmentId, ownerAccountId);
        break;
      } catch (error) {
        if (!String(error.message).includes("UNIQUE")) throw error;
      }
    }
    if (!result?.changes) throw new AccountStoreError("Only an owned draft assignment can be published.", "ASSIGNMENT_NOT_PUBLISHABLE", 409);
    return assignmentRecord(statements.assignmentById.get(assignmentId));
  }

  function reviseAssignment(assignmentId, ownerAccountId) {
    const source = statements.assignmentById.get(assignmentId);
    if (!source || source.owner_account_id !== ownerAccountId || !["published", "archived"].includes(source.status)) {
      throw new AccountStoreError("Only an owned published or archived assignment can be revised.", "ASSIGNMENT_NOT_REVISABLE", 409);
    }
    const id = `assignment_${randomUUID()}`;
    const createdAt = iso(now());
    const version = Number(statements.maxAssignmentVersion.get(source.series_id).version) + 1;
    statements.insertAssignment.run(id, source.series_id, source.id, ownerAccountId, source.title, source.student_instructions, source.question_text, source.command_word, source.max_mark, source.mark_scheme_text, "draft", version, null, createdAt, createdAt, null, null);
    return assignmentRecord(statements.assignmentById.get(id));
  }

  function archiveAssignment(assignmentId, ownerAccountId) {
    const archivedAt = iso(now());
    const result = statements.archiveAssignment.run(archivedAt, archivedAt, assignmentId, ownerAccountId);
    if (!result.changes) throw new AccountStoreError("Only an owned published assignment can be archived.", "ASSIGNMENT_NOT_ARCHIVABLE", 409);
    return assignmentRecord(statements.assignmentById.get(assignmentId));
  }

  function publishedAssignmentByCode(code) {
    return assignmentRecord(statements.assignmentByCode.get(String(code ?? "").trim().toUpperCase()), { publicView: true });
  }

  function assignmentForGrading(assignmentId, ownerAccountId) {
    const row = statements.assignmentById.get(assignmentId);
    if (!row || row.owner_account_id !== ownerAccountId || row.status !== "published") return null;
    return assignmentRecord(row);
  }

  function assignmentByCodeForGrading(code) {
    return assignmentRecord(statements.assignmentByCode.get(String(code ?? "").trim().toUpperCase()));
  }

  function listAssignmentSubmissions(ownerAccountId, assignmentId) {
    if (!assignmentOwnedBy(assignmentId, ownerAccountId)) return null;
    const rows = statements.assignmentSubmissionRows.all(ownerAccountId, assignmentId);
    return {
      total: Number(statements.assignmentSubmissionCount.get(ownerAccountId, assignmentId).count),
      items: rows.map((row) => ({
        run_id: row.id,
        assignment_id: row.assignment_id,
        student_ref: row.student_ref,
        source_name: row.source_name,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        final_mark: row.final_mark,
        max_mark: row.max_mark,
        confidence: row.confidence
      }))
    };
  }

  function getImage(imageId, accountId) {
    const row = statements.imageById.get(imageId, accountId);
    if (!row) throw new AccountStoreError("Stored image was not found.", "IMAGE_NOT_FOUND", 404);
    return { ...row, stream: () => createReadStream(row.stored_path) };
  }

  function getImageForActor(imageId, actor) {
    const row = database.prepare("SELECT i.*, r.assignment_id, r.account_id AS run_account_id FROM images i JOIN runs r ON r.id = i.run_id WHERE i.id = ?").get(imageId);
    if (!row || !canAccessRun({ account_id: row.run_account_id, assignment_id: row.assignment_id }, actor)) {
      throw new AccountStoreError("Stored image was not found.", "IMAGE_NOT_FOUND", 404);
    }
    return { ...row, stream: () => createReadStream(row.stored_path) };
  }

  return Object.freeze({
    register,
    authenticate,
    createSession,
    sessionForToken,
    endSession,
    changePassword,
    endOtherSessions(accountId, sessionId) {
      statements.deleteOtherSessions.run(accountId, sessionId);
    },
    persistWorkflow,
    createAssignment,
    listAssignments,
    getAssignment,
    updateAssignment,
    publishAssignment,
    reviseAssignment,
    archiveAssignment,
    publishedAssignmentByCode,
    assignmentForGrading,
    assignmentByCodeForGrading,
    listAssignmentSubmissions,
    validatePayloadUpload(payload, role = "teacher") {
      const maximum = role === "student" ? studentMaxFileBytes : teacherMaxFileBytes;
      return decodeDataUrl(payload?.answer_data_url, String(payload?.answer_mime_type ?? ""), maximum).length;
    },
    getRun,
    getRunForActor,
    listRuns,
    updateWorkflow,
    updateWorkflowForActor,
    getImage,
    getImageForActor,
    csrfMatches(session, token) {
      return Boolean(session && token && sha256(String(token)) === session.csrfHash);
    },
    close() { database.close(); }
  });
}

export { USERNAME_PATTERN };
