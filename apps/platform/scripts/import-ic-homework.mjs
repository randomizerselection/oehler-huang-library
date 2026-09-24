import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { resolveAppConfig } from "../server/app-config.mjs";
import { createPlatformStore } from "../server/platform-store.mjs";
import { detectIcGrade, planIcHomeworkImport, readKetangpaiWorkbook } from "./lib/ic-homework-workbook.mjs";

function parseArgs(argv) {
  const result = { dates: [], matches: [], ignores: [], latest: 2, apply: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--apply") result.apply = true;
    else if (argument === "--file") result.file = argv[++index];
    else if (argument === "--grade") result.grade = argv[++index];
    else if (argument === "--latest") result.latest = Number(argv[++index]);
    else if (argument === "--date") result.dates.push(argv[++index]);
    else if (argument === "--match") result.matches.push(argv[++index]);
    else if (argument === "--ignore") result.ignores.push(argv[++index]);
    else throw new Error(`Unknown argument: ${argument}`);
  }
  if (!result.file) throw new Error("Use --file PATH to select a Ketangpai .xls or .xlsx export.");
  if (!Number.isInteger(result.latest) || result.latest < 1 || result.latest > 10) throw new Error("--latest must be an integer from 1 to 10.");
  return result;
}

function pairMap(values, option) {
  const result = new Map();
  for (const value of values) {
    const separator = String(value).indexOf("=");
    if (separator < 1 || separator === String(value).length - 1) throw new Error(`${option} values must use EXTERNAL_ID=STUDENT_ID.`);
    result.set(String(value).slice(0, separator), String(value).slice(separator + 1));
  }
  return result;
}

function summary(plan) {
  return {
    mode: "dry-run",
    grade: plan.grade,
    classes: plan.targetClasses.map((item) => item.name),
    students: plan.targetRoster.length,
    identities_to_register: plan.identities.length,
    assignments: plan.assignments.map((assignment) => ({
      title: assignment.title,
      assigned_on: assignment.assigned_on,
      classes: assignment.classes.map((classroom) => ({
        name: classroom.name,
        records: classroom.items.length,
        submitted: classroom.items.filter((item) => item.status === "submitted").length,
        missing: classroom.items.filter((item) => item.status === "missing").length
      }))
    }))
  };
}

const options = parseArgs(process.argv.slice(2));
const root = resolve(import.meta.dirname, "..");
const envFile = resolve(root, "..", "..", ".env");
if (existsSync(envFile) && process.loadEnvFile) process.loadEnvFile(envFile);
const config = resolveAppConfig(process.env, root);
const store = createPlatformStore(config);
try {
  const workbook = await readKetangpaiWorkbook(options.file);
  const grade = String(options.grade || detectIcGrade(workbook.sheetName, workbook.sourceName) || "").toUpperCase();
  const classes = store.database.prepare("SELECT id AS class_id,name,owner_account_id FROM classes WHERE status='active' ORDER BY name").all();
  const targetClassIds = classes.filter((item) => new RegExp(`^${grade}\\.\\d+$`, "i").test(item.name)).map((item) => item.class_id);
  const placeholders = targetClassIds.map(() => "?").join(",");
  const roster = targetClassIds.length ? store.database.prepare(`SELECT cm.class_id,a.id AS account_id,a.student_id,a.display_name,a.legal_name,a.preferred_name
    FROM class_memberships cm JOIN accounts a ON a.id=cm.account_id
    WHERE cm.status='active' AND a.status='active' AND a.role='student' AND cm.class_id IN (${placeholders})
    ORDER BY cm.class_id,a.display_name`).all(...targetClassIds) : [];
  const existingIdentities = new Map(store.database.prepare("SELECT external_id,account_id FROM student_integrations WHERE provider='ketangpai'").all()
    .map((item) => [item.external_id, item.account_id]));
  const plan = planIcHomeworkImport({
    workbook,
    roster,
    classes,
    grade,
    latest: options.latest,
    dates: options.dates,
    overrides: pairMap(options.matches, "--match"),
    ignoredExternalIds: new Set(options.ignores),
    existingIdentities
  });
  const owners = new Set(plan.targetClasses.map((item) => item.owner_account_id));
  if (owners.size !== 1) throw new Error(`${plan.grade} classes do not have one common teacher owner.`);
  const [teacherId] = owners;
  const output = summary(plan);
  if (!options.apply) {
    console.log(JSON.stringify(output, null, 2));
    console.error("Dry run only. Back up the platform database, then rerun with --apply.");
    process.exitCode = 2;
  } else {
    const recorded = [];
    for (const assignment of plan.assignments) {
      for (const classroom of assignment.classes) {
        recorded.push(store.recordHomeworkSubmissions(teacherId, classroom.class_id, {
          assignment_title: assignment.title,
          assigned_on: assignment.assigned_on,
          source: "ketangpai",
          items: classroom.items
        }));
      }
    }
    const verifiedAt = new Date().toISOString();
    store.database.exec("BEGIN IMMEDIATE");
    try {
      const insertIdentity = store.database.prepare(`INSERT INTO student_integrations
        (account_id,provider,external_id,verified_at,metadata_json) VALUES (?,'ketangpai',?,?,?)
        ON CONFLICT(account_id,provider) DO NOTHING`);
      const audit = store.database.prepare("INSERT INTO audit_events (id,actor_account_id,action,target_type,target_id,details_json,occurred_at) VALUES (?,?,?,?,?,?,?)");
      for (const identity of plan.identities) {
        const conflict = store.database.prepare("SELECT account_id FROM student_integrations WHERE provider='ketangpai' AND external_id=?").get(identity.external_id);
        if (conflict && conflict.account_id !== identity.account_id) throw new Error(`Ketangpai account ${identity.external_id} is already linked to another student.`);
        const inserted = insertIdentity.run(identity.account_id, identity.external_id, verifiedAt, JSON.stringify({ source: workbook.sourceName, worksheet: workbook.sheetName }));
        if (inserted.changes) audit.run(`audit_${randomUUID()}`, teacherId, "student_integration.link", "account", identity.account_id, JSON.stringify({ provider: "ketangpai", external_id: identity.external_id }), verifiedAt);
      }
      store.database.exec("COMMIT");
    } catch (error) {
      store.database.exec("ROLLBACK");
      throw error;
    }
    console.log(JSON.stringify({ ...output, mode: "applied", recorded }, null, 2));
  }
} finally {
  store.close();
}
