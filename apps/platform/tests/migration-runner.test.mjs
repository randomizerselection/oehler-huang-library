import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { runPlatformMigrations } from "../server/migration-runner.mjs";

test("standalone unified-login version 5 migrates without losing profile classes or its old quiz ledger", async (t) => {
  const dataDir = await mkdtemp(join(tmpdir(), "oh-standalone-v5-"));
  const database = new DatabaseSync(join(dataDir, "econmark.sqlite"));
  t.after(async () => {
    database.close();
    await rm(dataDir, { recursive: true, force: true });
  });

  database.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE accounts (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL COLLATE NOCASE UNIQUE,
      display_name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      last_login_at TEXT,
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
      role TEXT NOT NULL DEFAULT 'teacher' CHECK (role IN ('student', 'teacher')),
      class_name TEXT
    );
    CREATE TABLE quiz_attempts (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
      class_name_snapshot TEXT NOT NULL,
      course_id TEXT NOT NULL,
      course_title TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      lesson_title TEXT NOT NULL,
      quiz_id TEXT NOT NULL,
      quiz_version TEXT NOT NULL,
      normalized_answers_json TEXT NOT NULL,
      result_json TEXT NOT NULL,
      score INTEGER NOT NULL,
      max_score INTEGER NOT NULL,
      percentage INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );
    INSERT INTO accounts VALUES (
      'legacy-student', 'legacy.student', 'Legacy Student', 'hash',
      '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z', NULL,
      'active', 'student', 'IC 1.2'
    );
    INSERT INTO quiz_attempts VALUES (
      'legacy-attempt', 'legacy-student', 'IC 1.2', 'economics', 'Economics',
      'lesson-1', 'Lesson 1', 'quiz-1', '1.0.0', '{"q1":"answer"}',
      '{"score":1}', 1, 1, 100, '2026-01-02T00:00:00.000Z'
    );
    PRAGMA user_version = 5;
  `);

  const migration = runPlatformMigrations(database, { dataDir });
  assert.equal(migration.from, 5);
  assert.equal(migration.to, 11);
  assert.equal(migration.compatibility, "standalone-unified-v5");
  assert.ok(existsSync(migration.backupPath), "the pre-migration database is backed up");
  assert.equal(database.prepare("PRAGMA user_version").get().user_version, 11);
  assert.equal(database.prepare("SELECT class_name FROM accounts WHERE id='legacy-student'").get().class_name, "IC 1.2");

  const unifiedColumns = new Set(database.prepare("PRAGMA table_info(quiz_attempts)").all().map((column) => column.name));
  assert.ok(unifiedColumns.has("idempotency_key"));
  assert.ok(unifiedColumns.has("class_name_snapshot"));
  assert.ok(unifiedColumns.has("submitted_at"));
  assert.equal(database.prepare("SELECT COUNT(*) AS count FROM quiz_attempts").get().count, 0);

  const archived = database.prepare("SELECT id,class_name_snapshot,normalized_answers_json FROM archived_standalone_quiz_attempts_v5").get();
  assert.equal(archived.id, "legacy-attempt");
  assert.equal(archived.class_name_snapshot, "IC 1.2");
  assert.equal(archived.normalized_answers_json, '{"q1":"answer"}');
});
