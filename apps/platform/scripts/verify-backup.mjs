import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

const source = resolve(process.argv[2] || "");
if (!source || !existsSync(join(source, "manifest.json"))) throw new Error("Pass a backup directory containing manifest.json.");
const manifest = JSON.parse(readFileSync(join(source, "manifest.json"), "utf8"));
const databasePath = join(source, manifest.database.filename);
const bytes = readFileSync(databasePath);
const digest = createHash("sha256").update(bytes).digest("hex");
if (digest !== manifest.database.sha256) throw new Error("Database backup checksum does not match its manifest.");
for (const image of manifest.images || []) {
  const imagePath = join(source, "images", image.path);
  if (!existsSync(imagePath)) throw new Error(`Backup image is missing: ${image.path}`);
}

const rehearsal = mkdtempSync(join(tmpdir(), "oh-restore-rehearsal-"));
try {
  const restored = join(rehearsal, "econmark.sqlite");
  cpSync(databasePath, restored, { errorOnExist: true });
  const database = new DatabaseSync(restored, { readOnly: true });
  try {
    const quickCheck = database.prepare("PRAGMA quick_check").get().quick_check;
    if (quickCheck !== "ok") throw new Error(`SQLite quick_check failed: ${quickCheck}`);
    const schemaVersion = database.prepare("PRAGMA user_version").get().user_version;
    const accounts = database.prepare("SELECT COUNT(*) AS count FROM accounts").get().count;
    console.log(JSON.stringify({ verified: true, restore_rehearsal: true, schema_version: schemaVersion, account_count: accounts, image_count: (manifest.images || []).length }, null, 2));
  } finally {
    database.close();
  }
} finally {
  rmSync(rehearsal, { recursive: true, force: true });
}
