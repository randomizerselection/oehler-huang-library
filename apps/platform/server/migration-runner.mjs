import { mkdirSync, readFileSync, readdirSync } from "node:fs";
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
  const current = Number(database.prepare("PRAGMA user_version").get().user_version ?? 0);
  const pending = files.filter((file) => file.version > current);
  if (!pending.length) return { from: current, to: current, applied: [], backupPath: null };

  let backupPath = null;
  if (current > 0 && dataDir) {
    const backupRoot = join(dataDir, "backups");
    mkdirSync(backupRoot, { recursive: true });
    backupPath = join(backupRoot, `pre-migration-v${current}-${new Date().toISOString().replaceAll(":", "-")}.sqlite`);
    database.exec("PRAGMA wal_checkpoint(FULL)");
    database.exec(`VACUUM INTO ${sqliteLiteral(backupPath)}`);
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
  database.exec("PRAGMA foreign_keys = ON");
  return { from: current, to: expected, applied, backupPath };
}
