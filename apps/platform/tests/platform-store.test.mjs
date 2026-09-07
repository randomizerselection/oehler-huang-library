import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createAccountStore } from "../server/account-store.mjs";
import { createPlatformStore } from "../server/platform-store.mjs";

async function rejectsCode(operation, code) {
  let caught = null;
  try { await operation(); } catch (error) { caught = error; }
  assert.equal(caught?.code, code, caught?.message || `Expected ${code}.`);
}

test("shared accounts, classes, learning, selector, recovery, isolation, and deletion work together", async (t) => {
  const dataDir = await mkdtemp(join(tmpdir(), "oh-platform-store-"));
  const config = {
    dataDir,
    maxFileBytes: 32 * 1024 * 1024,
    studentMaxFileBytes: 16 * 1024 * 1024,
    teacherMaxFileBytes: 32 * 1024 * 1024,
    maxBatchSize: 100,
    maxBatchTotalBytes: 512 * 1024 * 1024,
    maxAccountStorageBytes: 2 * 1024 * 1024 * 1024,
    studentStorageBytes: 100 * 1024 * 1024,
    teacherStorageBytes: 2 * 1024 * 1024 * 1024,
    sessionTtlMs: 30 * 24 * 60 * 60 * 1000,
    uploadGuard: () => ({ allowed: true })
  };
  const accounts = createAccountStore(config);
  const store = createPlatformStore(config);
  t.after(async () => {
    store.close();
    accounts.close();
    await rm(dataDir, { recursive: true, force: true });
  });

  assert.equal(store.migration.to, 11);
  const admin = await store.bootstrapAdmin({ username: "admin.one", display_name: "Admin One", password: "admin-password-1" });
  const invitation = store.createTeacherInvitation(admin.account.account_id);
  const teacher = await store.registerTeacher({ invitation_code: invitation.invitation_code, username: "teacher.one", display_name: "Teacher One", password: "teacher-password-1" });
  const otherInvitation = store.createTeacherInvitation(admin.account.account_id);
  const otherTeacher = await store.registerTeacher({ invitation_code: otherInvitation.invitation_code, username: "teacher.two", display_name: "Teacher Two", password: "teacher-password-2" });
  await rejectsCode(() => store.registerTeacher({ invitation_code: invitation.invitation_code, username: "teacher.reuse", password: "teacher-password-3" }), "TEACHER_INVITATION_INVALID");

  const classroom = store.createClass(teacher.account.account_id, { name: "IC1 Economics" });
  await rejectsCode(() => Promise.resolve(store.rotateJoinCode(teacher.account.account_id, classroom.class_id)), "CLASS_CONSENT_REQUIRED");
  store.attestClassConsent(teacher.account.account_id, classroom.class_id, { statement_version: "school-authorization-v1" });
  const classJoin = store.rotateJoinCode(teacher.account.account_id, classroom.class_id);
  const studentOne = await store.registerStudent({ join_code: classJoin.join_code, username: "student.one", display_name: "Student One", password: "student-password-1" });
  const studentTwo = await store.registerStudent({ join_code: classJoin.join_code, username: "student.two", display_name: "Student Two", password: "student-password-2" });
  assert.equal(store.roster(teacher.account.account_id, classroom.class_id).students.length, 2);
  await rejectsCode(() => Promise.resolve(store.roster(otherTeacher.account.account_id, classroom.class_id)), "CLASS_NOT_FOUND");

  const selector = store.startSelectorSession(teacher.account.account_id, { class_id: classroom.class_id, lesson_content_id: "lesson:one" });
  assert.equal(selector.roster.length, 2);
  const selectionPayload = { version: selector.version, events: [{ type: "selection", event_id: "select-1", student_account_id: studentOne.account.account_id, occurred_at: "2026-08-11T10:00:00.000Z" }] };
  const selected = store.recordSelectorEvents(teacher.account.account_id, selector.session_id, selectionPayload);
  assert.equal(selected.selections.length, 1);
  assert.equal(store.recordSelectorEvents(teacher.account.account_id, selector.session_id, selectionPayload).version, selected.version, "an idempotent retry may use the prior version");
  const outcome = store.recordSelectorEvents(teacher.account.account_id, selector.session_id, { version: selected.version, events: [{ type: "outcome", event_id: "outcome-1", selection_id: selected.selections[0].selection_id, student_account_id: studentOne.account.account_id, outcome: "A", occurred_at: "2026-08-11T10:01:00.000Z" }] });
  const attendance = store.recordSelectorEvents(teacher.account.account_id, selector.session_id, { version: outcome.version, events: [{ type: "attendance", event_id: "attendance-1", student_account_id: studentTwo.account.account_id, status: "absent", occurred_at: "2026-08-11T10:02:00.000Z" }] });
  await rejectsCode(() => Promise.resolve(store.recordSelectorEvents(teacher.account.account_id, selector.session_id, { version: attendance.version, events: [{ type: "selection", event_id: "select-duplicate", student_account_id: studentOne.account.account_id }] })), "SELECTOR_ALREADY_SELECTED");
  assert.equal(store.startSelectorSession(teacher.account.account_id, { class_id: classroom.class_id }).session_id, selector.session_id, "a second tab resumes the one active session");

  await store.registerStudent({ join_code: classJoin.join_code, username: "student.three", display_name: "Student Three", password: "student-password-3" });
  assert.equal(store.selectorSessionState(teacher.account.account_id, selector.session_id).roster.length, 2, "active sessions retain their membership snapshot");

  const quiz = { id: "quiz:one", version: "1.0.0", title: "Quiz One", kind: "quiz" };
  const catalog = { get: (id) => id === quiz.id ? quiz : null };
  const assignment = store.createLearningAssignment(teacher.account.account_id, classroom.class_id, { content_id: quiz.id, kind: "quiz", title: "Assigned quiz" }, catalog);
  assert.equal(store.listStudentAssignments(studentOne.account.account_id).items.length, 1);
  const result = { score: 1, max_score: 2, percentage: 50, responses: [{ question_id: "q1", correct: true }] };
  const firstAttempt = store.saveQuizAttempt(studentOne.account.account_id, quiz, { idempotency_key: "quiz-attempt-1", mode: "assigned", learning_assignment_id: assignment.assignment_id, answers: { q1: 0 } }, result);
  const repeatedAttempt = store.saveQuizAttempt(studentOne.account.account_id, quiz, { idempotency_key: "quiz-attempt-1", mode: "assigned", learning_assignment_id: assignment.assignment_id, answers: { q1: 0 } }, result);
  assert.equal(repeatedAttempt.attempt_id, firstAttempt.attempt_id);
  assert.equal(repeatedAttempt.score, 1);
  assert.equal(repeatedAttempt.class_name, "IC1 Economics");
  await rejectsCode(() => Promise.resolve(store.saveQuizAttempt(studentOne.account.account_id, quiz, { idempotency_key: "quiz-attempt-1", mode: "assigned", learning_assignment_id: assignment.assignment_id, answers: { q1: 999 } }, { ...result, score: 0 })), "QUIZ_ATTEMPT_CONFLICT");

  const learningEvents = Array.from({ length: 200 }, (_, index) => ({ event_id: `active-${index}`, content_id: "lesson:one", content_version: "1.0.0", event_type: "active_time", occurred_at: "2026-08-11T11:00:00.000Z", data: { seconds: 60 } }));
  assert.equal(store.recordLearningEvents(studentOne.account.account_id, learningEvents).accepted, 200);
  assert.equal(store.recordLearningEvents(studentOne.account.account_id, learningEvents).accepted, 0);
  store.recordLearningEvents(studentOne.account.account_id, Array.from({ length: 100 }, (_, index) => ({ event_id: `active-more-${index}`, content_id: "lesson:one", content_version: "1.0.0", event_type: "active_time", occurred_at: "2026-08-11T12:00:00.000Z", data: { seconds: 60 } })));
  assert.equal(store.studentProgress(studentOne.account.account_id).active_time[0].seconds, 14_400, "daily active time is capped at four hours");

  const report = store.selectorReport(teacher.account.account_id, classroom.class_id);
  assert.equal(report.students.find((item) => item.account_id === studentOne.account.account_id).a_count, 1);
  const exported = store.privacyExport(studentOne.account.account_id);
  assert.equal(exported.quiz_attempts.length, 1);
  assert.equal(exported.selector_participation.length, 1);

  const recovered = await store.recoverAccount({ username: studentOne.account.username, recovery_code: studentOne.recovery_code, new_password: "student-password-new" });
  assert.match(recovered.recovery_code, /^R-/);
  await rejectsCode(() => store.recoverAccount({ username: studentOne.account.username, recovery_code: studentOne.recovery_code, new_password: "student-password-next" }), "RECOVERY_INVALID");

  const deletion = store.requestDeletion(studentOne.account.account_id, { reason: "test" });
  await store.completeDeletion(admin.account.account_id, deletion.request_id);
  const deletedAccount = store.database.prepare("SELECT username,display_name,status FROM accounts WHERE id=?").get(studentOne.account.account_id);
  assert.equal(deletedAccount.status, "deleted");
  assert.equal(deletedAccount.display_name, "Deleted account");
  assert.equal(store.database.prepare("SELECT COUNT(*) AS count FROM learning_events WHERE account_id=?").get(studentOne.account.account_id).count, 0);
  assert.equal(store.database.prepare("SELECT value FROM privacy_anonymous_aggregates WHERE metric='accounts_deleted'").get().value, 1);
});
