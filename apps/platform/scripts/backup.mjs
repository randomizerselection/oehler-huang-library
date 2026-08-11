import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { resolveAppConfig } from "../server/app-config.mjs";

process.umask(0o077);
function sqliteLiteral(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function walk(directory, root = directory, items = []) {
  if (!existsSync(directory)) return items;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const full = join(directory, entry.name);
    if (entry.isDirectory()) walk(full, root, items);
    else items.push({ path: full.slice(root.length + 1).replaceAll("\\", "/"), bytes: statSync(full).size });
  }
  return items;
}

const root = resolve(import.meta.dirname, "..");
if (process.loadEnvFile) {
  try { process.loadEnvFile(resolve(root, "..", "..", ".env")); } catch {}
}
const config = resolveAppConfig(process.env, root);
const backupRoot = resolve(process.env.OH_BACKUP_DIR || join(config.dataDir, "backups"));
const backupId = process.argv[2] || new Date().toISOString().replaceAll(":", "-");
if (!/^[A-Za-z0-9._-]{3,120}$/.test(backupId)) throw new Error("Backup id contains unsupported characters.");
const destination = join(backupRoot, backupId);
if (existsSync(destination)) throw new Error(`Backup already exists: ${destination}`);
mkdirSync(destination, { recursive: true, mode: 0o700 });

const sourceDatabase = join(config.dataDir, "econmark.sqlite");
if (!existsSync(sourceDatabase)) throw new Error(`Database does not exist: ${sourceDatabase}`);
const databaseBackup = join(destination, "econmark.sqlite");
const database = new DatabaseSync(sourceDatabase);
try {
  database.exec("PRAGMA wal_checkpoint(FULL)");
  database.exec(`VACUUM INTO ${sqliteLiteral(databaseBackup)}`);
} finally {
  database.close();
}

const imagesSource = join(config.dataDir, "images");
const imagesBackup = join(destination, "images");
if (existsSync(imagesSource)) cpSync(imagesSource, imagesBackup, { recursive: true, errorOnExist: true, preserveTimestamps: true });
const databaseBytes = readFileSync(databaseBackup);
const manifest = {
  schema: "oehler-huang-backup/1.0.0",
  backup_id: backupId,
  created_at: new Date().toISOString(),
  data_directory: config.dataDir,
  database: {
    filename: basename(databaseBackup),
    bytes: databaseBytes.length,
    sha256: createHash("sha256").update(databaseBytes).digest("hex")
  },
  images: walk(imagesBackup)
};
writeFileSync(join(destination, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o600 });
console.log(JSON.stringify({ backup_directory: destination, database_bytes: manifest.database.bytes, image_count: manifest.images.length }, null, 2));
