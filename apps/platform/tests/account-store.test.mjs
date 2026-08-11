import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdir } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import argon2 from "argon2";
import { createAccountStore } from "../server/account-store.mjs";

function workflow(runId, studentRef = "S-01") {
  return {
    input: { run_id: runId, student_ref: studentRef },
    rubric: { teacher_confirmed: true },
    output: {
      run_id: runId,
      provisional_mark: 5,
      max_mark: 8,
      confidence: "high",
      final_mark: null
    }
  };
}

function uploadPayload(runId, batchId = null) {
  return {
    run_id: runId,
    batch_id: batchId,
    approval_mode: "teacher_review",
    assignment: { assignment_id: "WH-1" },
    answer_name: `${runId}.png`,
    answer_mime_type: "image/png",
    answer_data_url: `data:image/png;base64,${Buffer.from(`immutable-${runId}`).toString("base64")}`
  };
}

test("accounts use password authentication and account-owned permanent records", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "econmark-account-store-"));
  const store = createAccountStore({
    dataDir: directory,
    maxFileBytes: 1024,
    maxBatchSize: 2,
    maxBatchTotalBytes: 1024,
    sessionTtlMs: 60_000
  });
  t.after(async () => {
    store.close();
    await rm(directory, { recursive: true, force: true });
  });

  const owner = await store.register({ username: "teacher.one", password: "a-strong-password", display_name: "Teacher One" });
  const other = await store.register({ username: "teacher.two", password: "another-password", display_name: "Teacher Two" });
  await assert.rejects(store.authenticate({ username: owner.username, password: "incorrect-value" }), (error) => error.code === "LOGIN_INVALID");
  assert.equal((await store.authenticate({ username: owner.username, password: "a-strong-password" })).account_id, owner.account_id);

  const session = store.createSession(owner.account_id);
  const otherSession = store.createSession(owner.account_id);
  const loadedSession = store.sessionForToken(session.token);
  assert.equal(loadedSession.account.account_id, owner.account_id);
  assert.equal(store.csrfMatches(loadedSession, session.csrfToken), true);
  assert.equal(store.csrfMatches(loadedSession, "wrong"), false);
  store.endOtherSessions(owner.account_id, loadedSession.sessionId);
  assert.equal(store.sessionForToken(otherSession.token), null);
  assert.equal(store.sessionForToken(session.token).account.account_id, owner.account_id);

  const stored = await store.persistWorkflow({ accountId: owner.account_id, payload: uploadPayload("run-1", "batch-1"), workflow: workflow("run-1") });
  assert.equal(stored.persistence.retention_policy, "permanent_no_automatic_deletion");
  assert.match(stored.persistence.image_url, /^\/api\/images\//);
  assert.equal(store.getRun("run-1", other.account_id), null);
  assert.equal(store.listRuns(owner.account_id).total, 1);
  assert.equal(store.listRuns(other.account_id).total, 0);
  const image = store.getImage(stored.persistence.image_id, owner.account_id);
  assert.equal((await readFile(image.stored_path)).toString(), "immutable-run-1");
  assert.equal("deleteRun" in store, false);
  assert.equal("deleteImage" in store, false);
});

test("server-configured batch count is enforced inside persistence", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "econmark-batch-limit-"));
  const store = createAccountStore({ dataDir: directory, maxFileBytes: 1024, maxBatchSize: 1, maxBatchTotalBytes: 1024, sessionTtlMs: 60_000 });
  t.after(async () => {
    store.close();
    await rm(directory, { recursive: true, force: true });
  });
  const account = await store.register({ username: "capacity.user", password: "capacity-password" });
  await store.persistWorkflow({ accountId: account.account_id, payload: uploadPayload("run-a", "batch-a"), workflow: workflow("run-a") });
  await assert.rejects(
    store.persistWorkflow({ accountId: account.account_id, payload: uploadPayload("run-b", "batch-a"), workflow: workflow("run-b") }),
    (error) => error.code === "BATCH_TOO_LARGE"
  );
});

test("legacy accounts migrate to the teacher role without losing authentication", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "econmark-legacy-role-"));
  await mkdir(directory, { recursive: true });
  const database = new DatabaseSync(join(directory, "econmark.sqlite"));
  database.exec(`CREATE TABLE accounts (id TEXT PRIMARY KEY, username TEXT NOT NULL COLLATE NOCASE UNIQUE, display_name TEXT NOT NULL, password_hash TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, last_login_at TEXT, status TEXT NOT NULL DEFAULT 'active');`);
  const hash = await argon2.hash("legacy-password", { type: argon2.argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1 });
  database.prepare("INSERT INTO accounts (id, username, display_name, password_hash, created_at, updated_at, status) VALUES (?, ?, ?, ?, ?, ?, 'active')").run("acct_legacy", "legacy.teacher", "Legacy Teacher", hash, new Date().toISOString(), new Date().toISOString());
  database.close();
  const store = createAccountStore({ dataDir: directory, maxFileBytes: 1024, sessionTtlMs: 60_000 });
  t.after(async () => { store.close(); await rm(directory, { recursive: true, force: true }); });
  const account = await store.authenticate({ username: "legacy.teacher", password: "legacy-password" });
  assert.equal(account.role, "teacher");
});
