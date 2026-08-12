import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createEconMarkServer } from "../server/app-server.mjs";

function fakeWorkflow(payload) {
  return {
    input: {
      run_id: payload.run_id,
      mode: "account_upload",
      student_ref: payload.student_ref ?? "S-01",
      question_text: payload.assignment.question_text,
      command_word: payload.assignment.command_word,
      max_mark: payload.assignment.max_mark,
      mark_scheme_text: payload.assignment.mark_scheme_text,
      answer_images: [{ image_id: "provider-image", name: payload.answer_name, mime_type: payload.answer_mime_type, page: 1, validation_flags: [] }],
      confirmed_transcript: { text: "A valid response.", version: 1, teacher_confirmed: false, confirmation_method: "auto_gated", transcription_confidence: 1, uncertain_spans: [] },
      language: "en_zh",
      schema_version: "econmark/4.0.0"
    },
    rubric: { teacher_confirmed: true },
    output: {
      run_id: payload.run_id,
      provisional_mark: 5,
      max_mark: payload.assignment.max_mark,
      confidence: "high",
      manual_review_required: false,
      scorer_marks: { primary: 5, reviewer: 5, adjudicated: null },
      final_mark: null
    }
  };
}

function cookieFrom(response) { return response.headers.get("set-cookie").split(";", 1)[0]; }

async function register(base, payload) {
  const response = await fetch(`${base}/api/auth/register`, { method: "POST", headers: { "content-type": "application/json", origin: base }, body: JSON.stringify(payload) });
  return { response, body: await response.json(), cookie: response.ok ? cookieFrom(response) : null };
}

function stateHeaders(base, session, cookie) {
  return { "content-type": "application/json", origin: base, cookie, "x-csrf-token": session.csrf_token };
}

test("student-first HTTP routes enforce roles, assignment lifecycle, rubric authority, and linked teacher review", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "econmark-http-v4-"));
  let lastGatewayPayload = null;
  const app = await createEconMarkServer({
    root: process.cwd(),
    env: { ...process.env, ECONMARK_DATA_DIR: directory, ECONMARK_TEACHER_INVITE_CODE: "school-teacher-code", OH_ALLOW_LEGACY_REGISTRATION: "true", OH_DISK_UPLOAD_STOP_PERCENT: "100", ECONMARK_MAX_FILE_MB: "1", ECONMARK_MAX_BATCH_SIZE: "5", ECONMARK_MAX_BATCH_TOTAL_MB: "5" },
    storageStatus: () => ({ total_bytes: 1_000_000, free_bytes: 900_000, used_percent: 10, level: "normal", allowed: true, uploads_allowed: true }),
    gateway: { status: () => ({ ready: true, roles: {} }), grade: async (payload) => { lastGatewayPayload = payload; return fakeWorkflow(payload); } }
  });
  await new Promise((resolve) => app.server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${app.server.address().port}`;
  t.after(async () => { await new Promise((resolve) => app.server.close(resolve)); app.accountStore.close(); app.platformStore.close(); await rm(directory, { recursive: true, force: true }); });

  const landingResponse = await fetch(`${base}/`);
  assert.equal(landingResponse.headers.get("permissions-policy"), "camera=(self), microphone=(), geolocation=()");
  const landing = await landingResponse.text();
  assert.match(landing, /Oehler-Huang Learning Platform/);
  /* Consolidated root now serves the Library; the former student-entry assertion below is retained for migration history.
  assert.match(landing, /输入老师分享的作业代码/);
  */
  assert.equal(await fetch(`${base}/index.html`).then((response) => response.text()), landing);
  assert.match(await fetch(`${base}/teacher`).then((response) => response.text()), /题目与评分标准/);
  assert.match(await fetch(`${base}/single`).then((response) => response.text()), /从中央作业库选择/);
  assert.match(await fetch(`${base}/batch`).then((response) => response.text()), /从中央作业库选择/);

  const config = await fetch(`${base}/api/config`).then((response) => response.json());
  assert.equal(config.teacher_registration_enabled, true);
  assert.equal("teacherInviteCode" in config, false);
  const invalidTeacher = await register(base, { username: "bad.teacher", password: "teacher-password", role: "teacher", teacher_invite_code: "wrong" });
  assert.equal(invalidTeacher.response.status, 403);

  const teacher = await register(base, { username: "teacher.one", password: "teacher-password", display_name: "Teacher One", role: "teacher", teacher_invite_code: "school-teacher-code" });
  assert.equal(teacher.response.status, 201);
  assert.equal(teacher.body.account.role, "teacher");
  const assignmentPayload = { title: "Inflation policy", student_instructions: "Upload one clear page.", question_text: "Discuss whether higher interest rates reduce inflation. [8]", command_word: "Discuss", max_mark: 8, mark_scheme_text: "Teacher-owned original rubric with levels and a supported judgment." };
  const csrfFailure = await fetch(`${base}/api/assignments`, { method: "POST", headers: { "content-type": "application/json", origin: base, cookie: teacher.cookie }, body: JSON.stringify(assignmentPayload) });
  assert.equal(csrfFailure.status, 403);
  const created = await fetch(`${base}/api/assignments`, { method: "POST", headers: stateHeaders(base, teacher.body, teacher.cookie), body: JSON.stringify(assignmentPayload) }).then((response) => response.json());
  assert.equal(created.status, "draft");
  const published = await fetch(`${base}/api/assignments/${created.assignment_id}/publish`, { method: "POST", headers: stateHeaders(base, teacher.body, teacher.cookie), body: "{}" }).then((response) => response.json());
  assert.match(published.share_code, /^[A-Z2-9]{8}$/);
  const publicAssignment = await fetch(`${base}/api/student/assignments/${published.share_code}`).then((response) => response.json());
  assert.equal(publicAssignment.title, assignmentPayload.title);
  assert.equal("mark_scheme_text" in publicAssignment, false);

  const teacherGrade = await fetch(`${base}/api/grade`, { method: "POST", headers: stateHeaders(base, teacher.body, teacher.cookie), body: JSON.stringify({ run_id: "teacher-run-1", assignment_id: created.assignment_id, student_ref: "TEACHER-UPLOAD-01", answer_name: "teacher-upload.png", answer_mime_type: "image/png", answer_data_url: `data:image/png;base64,${Buffer.from("teacher-image").toString("base64")}` }) });
  assert.equal(teacherGrade.status, 200, await teacherGrade.clone().text());
  assert.equal(lastGatewayPayload.assignment.mark_scheme_text, assignmentPayload.mark_scheme_text);
  assert.equal((await fetch(`${base}/api/runs`, { headers: { cookie: teacher.cookie } }).then((response) => response.json())).total, 1);

  const student = await register(base, { username: "student.one", password: "student-password", display_name: "Student One" });
  assert.equal(student.response.status, 201);
  assert.equal(student.body.account.role, "student");
  assert.equal((await fetch(`${base}/api/assignments`, { headers: { cookie: student.cookie } })).status, 403);
  assert.equal((await fetch(`${base}/api/grade`, { method: "POST", headers: stateHeaders(base, student.body, student.cookie), body: "{}" })).status, 403);

  const studentGradeResponse = await fetch(`${base}/api/student/grade`, {
    method: "POST", headers: stateHeaders(base, student.body, student.cookie), body: JSON.stringify({ run_id: "student-run-1", assignment_code: published.share_code, student_ref: "IC1-08", mark_scheme_text: "Malicious replacement rubric", answer_name: "answer.png", answer_mime_type: "image/png", answer_data_url: `data:image/png;base64,${Buffer.from("student-image").toString("base64")}` })
  });
  assert.equal(studentGradeResponse.status, 200);
  const studentRun = await studentGradeResponse.json();
  assert.equal(studentRun.persistence.assignment_id, created.assignment_id);
  assert.equal(lastGatewayPayload.assignment.mark_scheme_text, assignmentPayload.mark_scheme_text);
  assert.doesNotMatch(lastGatewayPayload.assignment.mark_scheme_text, /malicious/i);
  assert.equal(studentRun.input.mark_scheme_text, assignmentPayload.mark_scheme_text);

  const submissions = await fetch(`${base}/api/assignments/${created.assignment_id}/submissions`, { headers: { cookie: teacher.cookie } }).then((response) => response.json());
  assert.equal(submissions.total, 1);
  assert.equal(submissions.items[0].student_ref, "IC1-08");
  assert.equal((await fetch(`${base}/api/runs/student-run-1`, { headers: { cookie: teacher.cookie } })).status, 200);
  assert.equal((await fetch(`${base}${studentRun.persistence.image_url}`, { headers: { cookie: teacher.cookie } })).status, 200);

  const other = await register(base, { username: "student.two", password: "student-password-two" });
  assert.equal((await fetch(`${base}/api/runs/student-run-1`, { headers: { cookie: other.cookie } })).status, 404);
  assert.equal((await fetch(`${base}${studentRun.persistence.image_url}`, { headers: { cookie: other.cookie } })).status, 404);

  const decision = await fetch(`${base}/api/runs/student-run-1/decision`, { method: "POST", headers: stateHeaders(base, teacher.body, teacher.cookie), body: JSON.stringify({ decision: "adjusted", teacher_mark: 6, override_reason: "Teacher evidence review." }) }).then((response) => response.json());
  assert.equal(decision.output.final_mark, 6);
  const studentReload = await fetch(`${base}/api/runs/student-run-1`, { headers: { cookie: student.cookie } }).then((response) => response.json());
  assert.equal(studentReload.output.final_mark, 6);
  assert.equal((await fetch(`${base}/api/runs/student-run-1/decision`, { method: "POST", headers: stateHeaders(base, student.body, student.cookie), body: JSON.stringify({ decision: "approved" }) })).status, 403);

  const revision = await fetch(`${base}/api/assignments/${created.assignment_id}/revise`, { method: "POST", headers: stateHeaders(base, teacher.body, teacher.cookie), body: "{}" }).then((response) => response.json());
  assert.equal(revision.status, "draft");
  assert.equal(revision.version, 2);
  assert.equal(revision.share_code, null);
  assert.notEqual(revision.assignment_id, created.assignment_id);
  assert.equal((await fetch(`${base}/api/assignments/${created.assignment_id}`, { method: "PATCH", headers: stateHeaders(base, teacher.body, teacher.cookie), body: JSON.stringify({ ...assignmentPayload, title: "Illegal edit" }) })).status, 409);

  const archived = await fetch(`${base}/api/assignments/${created.assignment_id}/archive`, { method: "POST", headers: stateHeaders(base, teacher.body, teacher.cookie), body: "{}" }).then((response) => response.json());
  assert.equal(archived.status, "archived");
  assert.equal((await fetch(`${base}/api/student/assignments/${published.share_code}`)).status, 404);
  assert.equal((await fetch(`${base}/api/runs/student-run-1`, { headers: { cookie: student.cookie } })).status, 200);
});
