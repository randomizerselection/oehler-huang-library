import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createEconMarkServer } from "../server/app-server.mjs";

function cookieFrom(response) { return response.headers.get("set-cookie").split(";", 1)[0]; }

async function post(base, path, body, session = null) {
  const headers = { "content-type": "application/json", origin: base };
  if (session) {
    headers.cookie = session.cookie;
    headers["x-csrf-token"] = session.body.csrf_token;
  }
  const response = await fetch(`${base}${path}`, { method: "POST", headers, body: JSON.stringify(body) });
  let value = {};
  try { value = await response.json(); } catch { /* csv or empty */ }
  return { response, value };
}

async function register(base, path, value) {
  const result = await post(base, path, value);
  return { ...result, body: result.value, cookie: result.response.ok ? cookieFrom(result.response) : null };
}

test("unified quiz attempts are server graded, immutable, isolated, class-snapshotted, and preview safe", async (t) => {
  const dataDir = await mkdtemp(join(tmpdir(), "oh-unified-quiz-"));
  const app = await createEconMarkServer({
    root: process.cwd(),
    env: {
      ...process.env,
      OH_DATA_DIR: dataDir,
      OH_ALLOW_LEGACY_REGISTRATION: "true",
      ECONMARK_TEACHER_INVITE_CODE: "school-teacher-code",
      ECONMARK_STUDENT_CLASSES: "IC 1.1,IC 1.2"
    },
    storageStatus: () => ({ allowed: true, uploads_allowed: true, level: "normal" }),
    gateway: { status: () => ({ ready: false, roles: {} }) }
  });
  await new Promise((resolveListen) => app.server.listen(0, "127.0.0.1", resolveListen));
  const base = `http://127.0.0.1:${app.server.address().port}`;
  t.after(async () => {
    await new Promise((resolveClose) => app.server.close(resolveClose));
    app.accountStore.close();
    app.platformStore.close();
    await rm(dataDir, { recursive: true, force: true });
  });

  const bank = JSON.parse(await readFile(resolve(process.cwd(), "../library/generated/quiz-bank.json"), "utf8"));
  const quiz = bank.quizzes[0];
  const answers = Object.fromEntries(quiz.questions.map((question) => [question.id, question.type === "multipleChoice" ? question.answer : (question.acceptedAnswers || [question.answer])[0]]));
  const fillBlankQuestion = quiz.questions.find((question) => question.type === "fillBlank");
  if (fillBlankQuestion) answers[fillBlankQuestion.id] = `  ${(fillBlankQuestion.acceptedAnswers || [fillBlankQuestion.answer])[0]}   . `;

  const student = await register(base, "/api/auth/register/student", { username: "student.quiz", display_name: "Student Quiz", password: "student-password-1", class_name: "IC 1.1" });
  const other = await register(base, "/api/auth/register/student", { username: "student.other", display_name: "Student Other", password: "student-password-2", class_name: "IC 1.2" });
  const teacher = await register(base, "/api/auth/register", { username: "teacher.quiz", display_name: "Teacher Quiz", password: "teacher-password-1", role: "teacher", teacher_invite_code: "school-teacher-code" });
  assert.equal(student.response.status, 201);
  assert.equal(student.body.account.class_name, "IC 1.1");

  const firstPayload = { attempt_id: "attempt_quiz_000001", quiz_id: quiz.id, quiz_version: quiz.version, answers };
  const first = await post(base, "/api/quiz-attempts", firstPayload, student);
  assert.equal(first.response.status, 201, JSON.stringify(first.value));
  assert.equal(first.value.percentage, 100);
  assert.equal(first.value.class_name, "IC 1.1");
  assert.equal(first.value.saved, true);
  assert.equal(first.value.result.questions[0].question_id, quiz.questions[0].id);
  assert.equal(typeof first.value.result.questions[0].correct_answer_text, "string");
  if (fillBlankQuestion) assert.equal(first.value.answers[fillBlankQuestion.id], (fillBlankQuestion.acceptedAnswers || [fillBlankQuestion.answer])[0].toLowerCase());

  const retry = await post(base, "/api/quiz-attempts", firstPayload, student);
  assert.equal(retry.response.status, 201);
  assert.equal(retry.value.attempt_id, first.value.attempt_id);
  const changed = await post(base, "/api/quiz-attempts", { ...firstPayload, answers: { ...answers, [quiz.questions[0].id]: "changed" } }, student);
  assert.equal(changed.response.status, 409);
  const wrongVersion = await post(base, "/api/quiz-attempts", { ...firstPayload, attempt_id: "attempt_quiz_000002", quiz_version: "missing" }, student);
  assert.equal(wrongVersion.response.status, 409);

  const own = await fetch(`${base}/api/quiz-attempts/me`, { headers: { cookie: student.cookie } }).then((response) => response.json());
  const isolated = await fetch(`${base}/api/quiz-attempts/me`, { headers: { cookie: other.cookie } }).then((response) => response.json());
  assert.equal(own.total, 1);
  assert.equal(isolated.total, 0);

  const profile = await fetch(`${base}/api/account/profile`, {
    method: "PATCH",
    headers: { "content-type": "application/json", origin: base, cookie: student.cookie, "x-csrf-token": student.body.csrf_token },
    body: JSON.stringify({ display_name: "Student Updated", class_name: "IC 1.2" })
  }).then((response) => response.json());
  assert.equal(profile.account.class_name, "IC 1.2");
  const second = await post(base, "/api/quiz-attempts", { ...firstPayload, attempt_id: "attempt_quiz_000003" }, student);
  assert.equal(second.value.class_name, "IC 1.2");

  const preview = await post(base, "/api/quiz-attempts", { ...firstPayload, attempt_id: "attempt_teacher_0001" }, teacher);
  assert.equal(preview.response.status, 200);
  assert.equal(preview.value.preview, true);
  assert.equal(preview.value.saved, false);

  const gradebook = await fetch(`${base}/api/teacher/quiz-attempts?view=all`, { headers: { cookie: teacher.cookie } }).then((response) => response.json());
  assert.equal(gradebook.total, 2);
  assert.equal(gradebook.items.length, 2);
  assert.deepEqual(new Set(gradebook.items.map((item) => item.class_name)), new Set(["IC 1.1", "IC 1.2"]));
  const pagedGradebook = await fetch(`${base}/api/teacher/quiz-attempts?view=all&limit=1`, { headers: { cookie: teacher.cookie } }).then((response) => response.json());
  assert.equal(pagedGradebook.total, 2);
  assert.equal(pagedGradebook.items.length, 1);
  const latestGradebook = await fetch(`${base}/api/teacher/quiz-attempts?view=latest`, { headers: { cookie: teacher.cookie } }).then((response) => response.json());
  assert.equal(latestGradebook.total, 1);
  assert.equal(latestGradebook.items.length, 1);
  const csv = await fetch(`${base}/api/teacher/quiz-attempts.csv?view=all`, { headers: { cookie: teacher.cookie } });
  assert.equal(csv.status, 200);
  assert.match(await csv.text(), /class_name/);
  assert.equal((await fetch(`${base}/api/teacher/quiz-attempts`, { headers: { cookie: other.cookie } })).status, 403);
});
