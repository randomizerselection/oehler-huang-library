import { chmodSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

function sqliteLiteral(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

export function runPlatformMigrations(database, { dataDir, migrationsDir = new URL("./migrations/", import.meta.url) } = {}) {
  const directory = migrationsDir instanceof URL ? migrationsDir : new URL(`file:///${String(migrationsDir).replaceAll("\\", "/")}/`);
  const files = readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /^\d{3}_.+\.sql$/.test(entry.name))
    .map((entry) => ({ name: entry.name, version: Number(entry.name.slice(0, 3)) }))
    .sort((left, right) => left.version - right.version);
  let current = Number(database.prepare("PRAGMA user_version").get().user_version ?? 0);
  const initialVersion = current;
  let pending = files.filter((file) => file.version > current);
  if (!pending.length) return { from: current, to: current, applied: [], backupPath: null };

  let backupPath = null;
  if (current > 0 && dataDir) {
    const backupRoot = join(dataDir, "backups");
    mkdirSync(backupRoot, { recursive: true, mode: 0o700 });
    chmodSync(backupRoot, 0o700);
    backupPath = join(backupRoot, `pre-migration-v${current}-${new Date().toISOString().replaceAll(":", "-")}.sqlite`);
    database.exec("PRAGMA wal_checkpoint(FULL)");
    database.exec(`VACUUM INTO ${sqliteLiteral(backupPath)}`);
  }

  const tableExists = (name) => Boolean(database.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?").get(name));
  const accountColumns = () => new Set(database.prepare("PRAGMA table_info(accounts)").all().map((column) => column.name));
  const standaloneUnifiedV5 = current === 5
    && tableExists("quiz_attempts")
    && !tableExists("classes")
    && accountColumns().has("class_name");
  if (standaloneUnifiedV5) {
    database.exec(`
      BEGIN IMMEDIATE;
      ALTER TABLE quiz_attempts RENAME TO archived_standalone_quiz_attempts_v5;
      CREATE TABLE standalone_v5_account_classes AS SELECT id, class_name FROM accounts;
      PRAGMA user_version = 4;
      COMMIT;
    `);
    current = 4;
    pending = files.filter((file) => file.version > current);
  }

  const applied = [];
  let expected = current;
  for (const migration of pending) {
    if (migration.version !== expected + 1) {
      throw new Error(`Missing platform migration between ${expected} and ${migration.version}.`);
    }
    const sql = readFileSync(new URL(migration.name, directory), "utf8");
    database.exec(sql);
    const actual = Number(database.prepare("PRAGMA user_version").get().user_version ?? 0);
    if (actual !== migration.version) throw new Error(`Migration ${migration.name} did not set user_version=${migration.version}.`);
    applied.push(migration.name);
    expected = actual;
  }
  if (tableExists("standalone_v5_account_classes")) {
    database.exec(`
      UPDATE accounts
      SET class_name = (SELECT legacy.class_name FROM standalone_v5_account_classes legacy WHERE legacy.id=accounts.id)
      WHERE id IN (SELECT id FROM standalone_v5_account_classes);
      DROP TABLE standalone_v5_account_classes;
    `);
  }
  database.exec("PRAGMA foreign_keys = ON");
  return { from: initialVersion, to: expected, applied, backupPath, compatibility: standaloneUnifiedV5 ? "standalone-unified-v5" : null };
}
