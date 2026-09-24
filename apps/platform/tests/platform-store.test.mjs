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
  const store = createPlatformStore({ ...config, now: () => new Date("2026-09-22T04:00:00.000Z") });
  t.after(async () => {
    store.close();
    accounts.close();
    await rm(dataDir, { recursive: true, force: true });
  });

  assert.equal(store.migration.to, 21);
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
  store.database.prepare("UPDATE accounts SET student_id='20241025',form_class=1 WHERE id=?").run(studentOne.account.account_id);
  store.database.prepare("UPDATE accounts SET student_id='20244019',form_class=4 WHERE id=?").run(studentTwo.account.account_id);
  const courseTwo = store.createClass(teacher.account.account_id, { name: "IC2 Economics" });
  store.attestClassConsent(teacher.account.account_id, courseTwo.class_id, { statement_version: "school-authorization-v1" });
  const courseTwoJoin = store.rotateJoinCode(teacher.account.account_id, courseTwo.class_id);
  store.joinClass(studentOne.account.account_id, courseTwoJoin.join_code);
  const initialRoster = store.roster(teacher.account.account_id, classroom.class_id).students;
  assert.equal(initialRoster.length, 2);
  assert.equal(initialRoster.find((item) => item.account_id === studentOne.account.account_id).form_class, 1);
  await rejectsCode(() => Promise.resolve(store.roster(otherTeacher.account.account_id, classroom.class_id)), "CLASS_NOT_FOUND");

  const selector = store.startSelectorSession(teacher.account.account_id, { class_id: classroom.class_id, lesson_content_id: "lesson:one" });
  assert.equal(selector.roster.length, 2);
  const selectionPayload = { version: selector.version, events: [{ type: "selection", event_id: "select-1", student_account_id: studentOne.account.account_id, occurred_at: "2026-08-11T10:00:00.000Z" }] };
  const selected = store.recordSelectorEvents(teacher.account.account_id, selector.session_id, selectionPayload);
  assert.equal(selected.selections.length, 1);
  assert.equal(store.recordSelectorEvents(teacher.account.account_id, selector.session_id, selectionPayload).version, selected.version, "an idempotent retry may use the prior version");
  const outcome = store.recordSelectorEvents(teacher.account.account_id, selector.session_id, { version: selected.version, events: [{ type: "outcome", event_id: "outcome-1", selection_id: selected.selections[0].selection_id, student_account_id: studentOne.account.account_id, outcome: "A", occurred_at: "2026-08-11T10:01:00.000Z" }] });
  await rejectsCode(() => Promise.resolve(store.recordSelectorEvents(teacher.account.account_id, selector.session_id, { version: outcome.version, events: [
    { type: "attendance", event_id: "attendance-batch-1", student_account_id: studentOne.account.account_id, status: "present" },
    { type: "attendance", event_id: "attendance-batch-2", student_account_id: studentTwo.account.account_id, status: "absent" }
  ] })), "SELECTOR_ATTENDANCE_BATCH_REQUIRES_FINALIZE");
  await rejectsCode(() => Promise.resolve(store.recordSelectorEvents(teacher.account.account_id, selector.session_id, { version: outcome.version, events: [
    { type: "attendance", event_id: "verify-attendance-1", student_account_id: studentTwo.account.account_id, status: "absent" }
  ] })), "SELECTOR_SYNTHETIC_EVENT_REJECTED");
  await rejectsCode(() => Promise.resolve(store.recordSelectorAttendance(teacher.account.account_id, selector.session_id, {
    version: outcome.version,
    marks: [{ student_account_id: studentOne.account.account_id, status: "present" }]
  })), "SELECTOR_ATTENDANCE_INCOMPLETE");
  const attendancePayload = { version: outcome.version, lesson_content_id: "lesson:one", marks: [
    { student_account_id: studentOne.account.account_id, status: "present" },
    { student_account_id: studentTwo.account.account_id, status: "absent" }
  ] };
  const attendance = store.recordSelectorAttendance(teacher.account.account_id, selector.session_id, attendancePayload);
  assert.deepEqual(attendance.attendance_summary, { roster_total: 2, marked: 2, present: 1, absent: 1, finalized: true, finalized_at: attendance.attendance_finalized_at });
  assert.equal(store.recordSelectorAttendance(teacher.account.account_id, selector.session_id, attendancePayload).version, attendance.version, "an identical stale attendance retry is idempotent");
  const correctedPresent = store.recordSelectorAttendance(teacher.account.account_id, selector.session_id, { version: attendance.version, marks: [
    { student_account_id: studentOne.account.account_id, status: "present" },
    { student_account_id: studentTwo.account.account_id, status: "present" }
  ] });
  const attendanceFinal = store.recordSelectorAttendance(teacher.account.account_id, selector.session_id, { version: correctedPresent.version, marks: attendancePayload.marks });
  assert.equal(store.database.prepare("SELECT COUNT(*) AS count FROM selector_attendance_log WHERE session_id=?").get(selector.session_id).count, 2, "corrections update one durable log row per student");
  assert.equal(store.database.prepare("SELECT COUNT(*) AS count FROM audit_events WHERE target_id=? AND action='selector.attendance_correct'").get(selector.session_id).count, 2);
  await rejectsCode(() => Promise.resolve(store.recordSelectorEvents(teacher.account.account_id, selector.session_id, { version: attendanceFinal.version, events: [{ type: "selection", event_id: "select-duplicate", student_account_id: studentOne.account.account_id }] })), "SELECTOR_ALREADY_SELECTED");
  assert.equal(store.startSelectorSession(teacher.account.account_id, { class_id: classroom.class_id }).session_id, selector.session_id, "a second tab resumes the one active session");

  const studentThree = await store.registerStudent({ join_code: classJoin.join_code, username: "student.three", display_name: "Student Three", password: "student-password-3" });
  assert.equal(store.selectorSessionState(teacher.account.account_id, selector.session_id).roster.length, 2, "active sessions retain their membership snapshot");
  await rejectsCode(() => Promise.resolve(store.recordSelectorEvents(teacher.account.account_id, selector.session_id, {
    version: attendanceFinal.version,
    lesson_content_id: "lesson:two",
    events: []
  })), "SELECTOR_CONTEXT_MISMATCH");
  const nextLessonSelector = store.startSelectorSession(teacher.account.account_id, { class_id: classroom.class_id, lesson_content_id: "lesson:two" });
  assert.notEqual(nextLessonSelector.session_id, selector.session_id);
  assert.equal(nextLessonSelector.lesson_content_id, "lesson:two");
  assert.equal(nextLessonSelector.roster.length, 3, "a new lesson gets a fresh roster snapshot");
  assert.equal(store.selectorSessionState(teacher.account.account_id, selector.session_id).status, "completed");

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

  const homework = store.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, {
    assignment_title: "Interest worksheet",
    assigned_on: "2026-08-12",
    source: "dingtalk",
    items: [
      { student_account_id: studentOne.account.account_id, status: "submitted" },
      { student_account_id: studentTwo.account.account_id, status: "missing", note: "Not in DingTalk submission list" }
    ]
  });
  assert.equal(homework.recorded, 2);
  const homeworkUpdate = store.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, {
    assignment_title: "Interest worksheet",
    assigned_on: "2026-08-12",
    items: [{ student_account_id: studentTwo.account.account_id, status: "late" }]
  });
  assert.equal(homeworkUpdate.recorded, 1);
  store.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, {
    assignment_title: "Working check",
    assigned_on: "2026-08-13",
    due_at: "2026-08-13T15:59:00.000Z",
    source: "dingtalk",
    items: [{
      student_account_id: studentOne.account.account_id,
      status: "awaiting_working",
      source_message_id: "dingtalk-message-1",
      last_activity_at: "2026-08-13T08:00:00.000Z",
      evidence: { responseFormat: "letter_only" }
    }]
  });
  const workingCheck = store.database.prepare("SELECT status,source_message_id,evidence_json FROM homework_submissions WHERE student_account_id=? AND assignment_title='Working check'").get(studentOne.account.account_id);
  assert.equal(workingCheck.status, "awaiting_working");
  assert.equal(workingCheck.source_message_id, "dingtalk-message-1");
  assert.deepEqual(JSON.parse(workingCheck.evidence_json), { responseFormat: "letter_only" });
  store.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, {
    assignment_title: "Second assignment in one message",
    assigned_on: "2026-08-14",
    source: "dingtalk",
    items: [{ student_account_id: studentOne.account.account_id, status: "submitted", source_message_id: "dingtalk-message-1" }]
  });
  assert.equal(store.database.prepare("SELECT COUNT(*) AS count FROM homework_submissions WHERE source_message_id='dingtalk-message-1'").get().count, 2);
  const graded = store.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, {
    assignment_title: "Supply-side essay",
    assigned_on: "2026-09-18",
    source: "ketangpai",
    items: [
      {
        student_account_id: studentOne.account.account_id,
        status: "submitted",
        score: 5,
        score_max: 8,
        feedback: "Develop the counter-argument before judging."
      },
      { student_account_id: studentTwo.account.account_id, status: "submitted", score: 7, score_max: 8 },
      { student_account_id: studentThree.account.account_id, status: "submitted", score: 14, score_max: 16 }
    ]
  });
  assert.equal(graded.recorded, 3);
  const gradedRow = store.database.prepare("SELECT score,score_max,feedback,graded_at FROM homework_submissions WHERE student_account_id=? AND assignment_title='Supply-side essay'").get(studentOne.account.account_id);
  assert.equal(gradedRow.score, 5);
  assert.equal(gradedRow.score_max, 8);
  assert.equal(gradedRow.feedback, "Develop the counter-argument before judging.");
  assert.ok(gradedRow.graded_at);
  // Scores are additive: a later non-graded write for the same row keeps them.
  store.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, {
    assignment_title: "Supply-side essay",
    assigned_on: "2026-09-18",
    items: [{ student_account_id: studentOne.account.account_id, status: "late" }]
  });
  const regraded = store.database.prepare("SELECT status,score FROM homework_submissions WHERE student_account_id=? AND assignment_title='Supply-side essay'").get(studentOne.account.account_id);
  assert.equal(regraded.status, "late");
  assert.equal(regraded.score, 5);
  store.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, {
    assignment_title: "Structured growth question",
    assigned_on: "2026-09-17",
    source: "qq",
    items: [
      { student_account_id: studentOne.account.account_id, status: "submitted" },
      { student_account_id: studentTwo.account.account_id, status: "submitted" },
      { student_account_id: studentThree.account.account_id, status: "missing" }
    ]
  });
  const rewardState = store.selectorSessionState(teacher.account.account_id, nextLessonSelector.session_id);
  const leaderboard = rewardState.homework_leaderboard;
  assert.equal(leaderboard.assignment_title, "Supply-side essay");
  assert.equal(leaderboard.assigned_on, "2026-09-18");
  assert.equal(leaderboard.graded_count, 3);
  assert.deepEqual(leaderboard.entries.map((entry) => [entry.display_name, entry.percentage, entry.rank]), [
    ["Student Three", 87.5, 1],
    ["Student Two", 87.5, 1],
    ["Student One", 62.5, 2]
  ], "leaderboard ranks percentages, keeps proportional-score ties, and uses dense places");
  assert.deepEqual(rewardState.homework_rewards.groups.map((group) => group.kind), ["score", "submission"]);
  assert.deepEqual(rewardState.homework_rewards.groups[1].entries.map((entry) => entry.display_name), ["Student One", "Student Two"]);
  // Remove the grading fixture again so the later aggregate assertions in this
  // shared test still describe the original homework set.
  store.database.prepare("DELETE FROM homework_submissions WHERE assignment_title IN ('Supply-side essay','Structured growth question')").run();
  await rejectsCode(() => Promise.resolve(store.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, { assignment_title: "Bad grade", assigned_on: "2026-09-18", items: [{ student_account_id: studentOne.account.account_id, status: "submitted", score: 9, score_max: 8 }] })), "HOMEWORK_SCORE_RANGE_INVALID");
  await rejectsCode(() => Promise.resolve(store.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, { assignment_title: "Bad grade", assigned_on: "2026-09-18", items: [{ student_account_id: studentOne.account.account_id, status: "submitted", score: 4 }] })), "HOMEWORK_SCORE_MAX_REQUIRED");
  await rejectsCode(() => Promise.resolve(store.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, { assignment_title: "Bad grade", assigned_on: "2026-09-18", items: [{ student_account_id: studentOne.account.account_id, status: "submitted", score: 2.5, score_max: 8 }] })), "HOMEWORK_SCORE_INVALID");
  await rejectsCode(() => Promise.resolve(store.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, { assignment_title: "X", assigned_on: "2026-08-12", items: [{ student_account_id: studentOne.account.account_id, status: "done" }] })), "HOMEWORK_STATUS_INVALID");
  await rejectsCode(() => Promise.resolve(store.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, { assignment_title: "X", assigned_on: "12 August", items: [{ student_account_id: studentOne.account.account_id, status: "submitted" }] })), "HOMEWORK_DATE_INVALID");
  await rejectsCode(() => Promise.resolve(store.recordHomeworkSubmissions(otherTeacher.account.account_id, classroom.class_id, { assignment_title: "X", assigned_on: "2026-08-12", items: [{ student_account_id: studentOne.account.account_id, status: "submitted" }] })), "CLASS_NOT_FOUND");

  const overview = store.classStudentOverview(teacher.account.account_id, classroom.class_id);
  const overviewOne = overview.students.find((item) => item.account_id === studentOne.account.account_id);
  const overviewTwo = overview.students.find((item) => item.account_id === studentTwo.account.account_id);
  assert.equal(overviewOne.homework.submitted, 2);
  assert.equal(overviewTwo.homework.late, 1);
  assert.equal(overviewTwo.homework.last_status, "late");
  assert.equal(overviewTwo.attendance.absences, 1);
  const rollCallContext = store.selectorSessionState(teacher.account.account_id, nextLessonSelector.session_id);
  const rollCallOne = rollCallContext.roster.find((item) => item.account_id === studentOne.account.account_id);
  const rollCallTwo = rollCallContext.roster.find((item) => item.account_id === studentTwo.account.account_id);
  assert.deepEqual(rollCallTwo.attendance_history, {
    marks: 1,
    present: 0,
    absent: 1,
    recent: [{ status: "absent", marked_at: attendanceFinal.attendance.find((item) => item.account_id === studentTwo.account.account_id).marked_at }],
    rate: 0
  }, "roll call shows only finalized attendance from earlier sessions");
  assert.equal(rollCallOne.homework.completion_rate, 67);
  assert.deepEqual(rollCallOne.homework.outstanding.map((item) => item.assignment_title), ["Working check"]);
  assert.equal(rollCallTwo.homework.completion_rate, 100);
  assert.equal(rollCallTwo.homework.late, 1);
  const absentLog = store.database.prepare("SELECT id FROM selector_attendance_log WHERE student_account_id=? AND status='absent'").get(studentTwo.account.account_id);
  store.database.prepare(`INSERT INTO absence_followups
    (attendance_log_id,status,recipient_external_id,outbound_message_id,conversation_id,message_text,lesson_pdf_name,lesson_pdf_sha256,sent_at,response_message_id,reason_text,reason_category,absence_start_date,absence_end_date,responded_at,updated_at)
    VALUES (?,'responded','ding-student-two','msg-out','conv-two','Please explain your absence.','lesson.pdf','abc','2026-08-11T10:03:00.000Z','msg-in','Medical appointment','health','2026-09-20','2026-09-30','2026-08-11T10:10:00.000Z','2026-08-11T10:10:00.000Z')`).run(absentLog.id);
  const overviewWithReason = store.classStudentOverview(teacher.account.account_id, classroom.class_id);
  assert.equal(overviewWithReason.attendance_log[0].followup_sent, 1);
  assert.equal(overviewWithReason.attendance_log[0].reasons_received, 1);
  assert.equal(overviewWithReason.students.find((item) => item.account_id === studentTwo.account.account_id).absence.category_label, "Health / medical");
  assert.equal(overviewWithReason.students.find((item) => item.account_id === studentTwo.account.account_id).absence.active, true);
  const rollCallWithReason = store.selectorSessionState(teacher.account.account_id, nextLessonSelector.session_id);
  assert.equal(rollCallWithReason.roster.find((item) => item.account_id === studentTwo.account.account_id).absence_context.reason, "Medical appointment");
  assert.ok(overview.attendance_log_by_form_class.some((item) => item.form_class === 4));
  assert.equal(overviewOne.selector.a_count, 1);
  const allCourses = store.teacherStudentOverview(teacher.account.account_id);
  assert.equal(allCourses.students.length, 3);
  assert.deepEqual(allCourses.students.find((item) => item.account_id === studentOne.account.account_id).course_classes, ["IC1 Economics", "IC2 Economics"]);
  assert.equal(allCourses.students.find((item) => item.account_id === studentTwo.account.account_id).form_class, 4);
  assert.ok(allCourses.attendance_log_by_form_class.some((item) => item.form_class === 4));

  const profile = store.studentProfile(teacher.account.account_id, studentOne.account.account_id);
  assert.equal(profile.homework.length, 3);
  assert.deepEqual(profile.homework.map((item) => item.assignment_title), ["Second assignment in one message", "Working check", "Interest worksheet"]);
  assert.equal(profile.selector.length, 1);
  const absentProfile = store.studentProfile(teacher.account.account_id, studentTwo.account.account_id);
  assert.equal(absentProfile.attendance[0].reason_text, "Medical appointment");
  assert.equal(absentProfile.attendance[0].reason_category_label, "Health / medical");
  assert.equal(absentProfile.attendance[0].absence_active, true);
  await rejectsCode(() => Promise.resolve(store.studentProfile(otherTeacher.account.account_id, studentOne.account.account_id)), "STUDENT_NOT_FOUND");

  const exportedWithHomework = store.privacyExport(studentOne.account.account_id);
  assert.equal(exportedWithHomework.homework_submissions.length, 3);

  const recovered = await store.recoverAccount({ username: studentOne.account.username, recovery_code: studentOne.recovery_code, new_password: "student-password-new" });
  assert.match(recovered.recovery_code, /^R-/);
  await rejectsCode(() => store.recoverAccount({ username: studentOne.account.username, recovery_code: studentOne.recovery_code, new_password: "student-password-next" }), "RECOVERY_INVALID");

  const deletion = store.requestDeletion(studentOne.account.account_id, { reason: "test" });
  await store.completeDeletion(admin.account.account_id, deletion.request_id);
  const deletedAccount = store.database.prepare("SELECT username,display_name,status FROM accounts WHERE id=?").get(studentOne.account.account_id);
  assert.equal(deletedAccount.status, "deleted");
  assert.equal(deletedAccount.display_name, "Deleted account");
  assert.equal(store.database.prepare("SELECT COUNT(*) AS count FROM learning_events WHERE account_id=?").get(studentOne.account.account_id).count, 0);
  assert.equal(store.database.prepare("SELECT COUNT(*) AS count FROM homework_submissions WHERE student_account_id=?").get(studentOne.account.account_id).count, 0);
  assert.equal(store.database.prepare("SELECT value FROM privacy_anonymous_aggregates WHERE metric='accounts_deleted'").get().value, 1);
});
