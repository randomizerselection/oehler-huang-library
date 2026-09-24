import ExcelJS from "exceljs";
import { existsSync, mkdirSync, rmSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, extname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";

const METADATA_HEADERS = new Set(["", "学号", "姓名", "所属标签", "账号", "学校"]);
const MISSING_VALUES = new Set(["未交", "未提交", "缺交", "missing"]);

function cellValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") {
    if (Array.isArray(value.richText)) return value.richText.map((item) => item.text ?? "").join("");
    if (value.text !== undefined) return String(value.text);
    if (value.result !== undefined) return value.result;
  }
  return value;
}

export function textValue(value) {
  return String(cellValue(value) ?? "").normalize("NFKC").trim();
}

export function detectIcGrade(...values) {
  for (const value of values) {
    const match = textValue(value).match(/\b(IC[123])(?:\b|[ ._-])/i);
    if (match) return match[1].toUpperCase();
  }
  return null;
}

function defaultSoffice() {
  const configured = textValue(process.env.OH_LIBREOFFICE_PROGRAM);
  if (configured) return configured;
  if (process.platform === "win32" && process.env.LOCALAPPDATA) {
    const isolated = join(process.env.LOCALAPPDATA, "Programs", "LibreOfficeCodex", "current", "program", "soffice.com");
    if (existsSync(isolated)) return isolated;
  }
  return process.platform === "win32" ? "soffice.com" : "soffice";
}

function convertLegacyWorkbook(sourcePath) {
  const temporaryRoot = join(tmpdir(), `oh-ic-homework-${randomUUID()}`);
  const profileRoot = join(temporaryRoot, "libreoffice-profile");
  mkdirSync(profileRoot, { recursive: true });
  const copiedSource = join(temporaryRoot, "source.xls");
  const convertedPath = join(temporaryRoot, "source.xlsx");
  copyFileSync(sourcePath, copiedSource);
  const result = spawnSync(defaultSoffice(), [
    "--headless", "--nologo", "--nodefault", "--nofirststartwizard", "--norestore",
    `-env:UserInstallation=${pathToFileURL(profileRoot).href}`,
    "--convert-to", "xlsx:Calc MS Excel 2007 XML", "--outdir", temporaryRoot, copiedSource
  ], { encoding: "utf8", timeout: 90_000, windowsHide: true });
  if (!existsSync(convertedPath)) {
    rmSync(temporaryRoot, { recursive: true, force: true });
    const detail = [result.error?.message, result.stderr, result.stdout].filter(Boolean).join("\n").trim();
    throw new Error(`LibreOffice could not convert the legacy workbook.${detail ? `\n${detail}` : ""}`);
  }
  return { convertedPath, cleanup: () => rmSync(temporaryRoot, { recursive: true, force: true }) };
}

export async function readKetangpaiWorkbook(filePath) {
  const absolutePath = resolve(filePath);
  if (!existsSync(absolutePath)) throw new Error(`Workbook does not exist: ${absolutePath}`);
  const extension = extname(absolutePath).toLowerCase();
  if (!new Set([".xls", ".xlsx"]).has(extension)) throw new Error("Homework workbook must be an .xls or .xlsx file.");
  const converted = extension === ".xls" ? convertLegacyWorkbook(absolutePath) : null;
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(converted?.convertedPath ?? absolutePath);
    if (workbook.worksheets.length !== 1) throw new Error("The Ketangpai export must contain exactly one worksheet.");
    const worksheet = workbook.worksheets[0];
    const headerRow = worksheet.getRow(1);
    const headers = [];
    for (let column = 1; column <= worksheet.columnCount; column += 1) headers.push(textValue(headerRow.getCell(column).value));
    const nameColumn = headers.findIndex((header) => header === "姓名") + 1;
    const accountColumn = headers.findIndex((header) => header === "账号") + 1;
    const studentNumberColumn = headers.findIndex((header) => header === "学号") + 1;
    if (!nameColumn || !accountColumn || !studentNumberColumn) throw new Error("The workbook is missing the 学号, 姓名, or 账号 column.");
    const assignmentColumns = headers
      .map((header, index) => ({ header, column: index + 1 }))
      .filter((item) => item.header && !METADATA_HEADERS.has(item.header));
    if (!assignmentColumns.length) throw new Error("The workbook does not contain assignment columns.");
    const rows = [];
    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber += 1) {
      const row = worksheet.getRow(rowNumber);
      const name = textValue(row.getCell(nameColumn).value);
      const externalId = textValue(row.getCell(accountColumn).value);
      const studentNumber = textValue(row.getCell(studentNumberColumn).value);
      if (!name && !externalId && !studentNumber) continue;
      rows.push({
        rowNumber,
        name,
        externalId,
        studentNumber,
        values: Object.fromEntries(assignmentColumns.map(({ header, column }) => [header, cellValue(row.getCell(column).value)]))
      });
    }
    return {
      sourcePath: absolutePath,
      sourceName: basename(absolutePath),
      sheetName: worksheet.name,
      assignmentColumns,
      rows
    };
  } finally {
    converted?.cleanup();
  }
}

function parsedStatus(value, rowNumber, assignmentTitle) {
  const normalized = textValue(value);
  if (typeof value === "number" && Number.isFinite(value)) return { status: "submitted", score: value };
  if (/^\d+(?:\.\d+)?$/.test(normalized)) return { status: "submitted", score: Number(normalized) };
  if (MISSING_VALUES.has(normalized.toLowerCase()) || MISSING_VALUES.has(normalized)) return { status: "missing", score: null };
  throw new Error(`Unsupported value in row ${rowNumber}, ${assignmentTitle}: ${normalized || "(blank)"}`);
}

function resolveOverride(reference, roster) {
  return roster.find((student) => student.account_id === reference || student.student_id === reference) ?? null;
}

export function planIcHomeworkImport({
  workbook,
  roster,
  classes,
  grade,
  latest = 2,
  dates,
  overrides = new Map(),
  ignoredExternalIds = new Set(),
  existingIdentities = new Map()
}) {
  const normalizedGrade = textValue(grade).toUpperCase();
  if (!/^IC[123]$/.test(normalizedGrade)) throw new Error("Grade must be IC1, IC2, or IC3.");
  const targetClasses = classes.filter((item) => new RegExp(`^${normalizedGrade}\\.\\d+$`, "i").test(item.name));
  if (targetClasses.length < 2 || targetClasses.length > 3) throw new Error(`${normalizedGrade} must have two or three active numbered classes.`);
  const targetClassIds = new Set(targetClasses.map((item) => item.class_id));
  const targetRoster = roster.filter((student) => targetClassIds.has(student.class_id));
  const classMemberships = new Map();
  for (const student of targetRoster) {
    const memberships = classMemberships.get(student.account_id) ?? [];
    memberships.push(student.class_id);
    classMemberships.set(student.account_id, memberships);
  }
  for (const [accountId, memberships] of classMemberships) {
    if (memberships.length !== 1) throw new Error(`Student ${accountId} belongs to more than one ${normalizedGrade} Economics class.`);
  }
  const selectedAssignments = workbook.assignmentColumns.slice(0, latest);
  if (selectedAssignments.length !== latest) throw new Error(`The workbook has fewer than ${latest} assignment columns.`);
  if (!Array.isArray(dates) || dates.length !== selectedAssignments.length || dates.some((date) => !/^\d{4}-\d{2}-\d{2}$/.test(date))) {
    throw new Error(`Provide one YYYY-MM-DD date for each of the ${selectedAssignments.length} selected assignments.`);
  }

  const rosterByAccount = new Map(targetRoster.map((student) => [student.account_id, student]));
  const legalNameMatches = (name) => targetRoster.filter((student) => student.legal_name && textValue(name).includes(textValue(student.legal_name)));
  const matchedRows = new Map();
  const unmatchedRows = [];
  for (const row of workbook.rows) {
    if (ignoredExternalIds.has(row.externalId)) continue;
    let student = null;
    let matchedBy = null;
    const override = overrides.get(row.externalId);
    if (override) {
      student = resolveOverride(override, targetRoster);
      if (!student) throw new Error(`Override for ${row.externalId} does not reference an active ${normalizedGrade} student.`);
      matchedBy = "override";
    }
    if (!student && existingIdentities.has(row.externalId)) {
      student = rosterByAccount.get(existingIdentities.get(row.externalId)) ?? null;
      if (student) matchedBy = "ketangpai_identity";
    }
    if (!student) {
      const matches = legalNameMatches(row.name);
      if (matches.length === 1) {
        [student] = matches;
        matchedBy = "legal_name";
      } else if (matches.length > 1) {
        throw new Error(`Row ${row.rowNumber} matches more than one roster student: ${row.name}`);
      }
    }
    if (!student) {
      unmatchedRows.push({ rowNumber: row.rowNumber, name: row.name, externalId: row.externalId });
      continue;
    }
    const rows = matchedRows.get(student.account_id) ?? [];
    rows.push({ ...row, matchedBy });
    matchedRows.set(student.account_id, rows);
  }
  if (unmatchedRows.length) {
    const detail = unmatchedRows.map((row) => `row ${row.rowNumber}: ${row.name || "(no name)"} [${row.externalId || "no account"}]`).join("; ");
    throw new Error(`Workbook rows do not match the ${normalizedGrade} roster: ${detail}`);
  }
  const missingStudents = targetRoster.filter((student) => !matchedRows.has(student.account_id));
  if (missingStudents.length) throw new Error(`Roster students are missing from the workbook: ${missingStudents.map((student) => student.display_name).join(", ")}`);

  const assignments = selectedAssignments.map((assignment, assignmentIndex) => {
    const classItems = new Map(targetClasses.map((item) => [item.class_id, []]));
    for (const student of targetRoster) {
      const sourceRows = matchedRows.get(student.account_id);
      const results = sourceRows.map((row) => ({ row, ...parsedStatus(row.values[assignment.header], row.rowNumber, assignment.header) }));
      const submissions = results.filter((item) => item.status === "submitted");
      const selected = submissions.length
        ? submissions.reduce((best, item) => item.score > best.score ? item : best)
        : results[0];
      if (selected.score !== null && (selected.score < 0 || selected.score > 100)) {
        throw new Error(`Score for ${student.display_name}, ${assignment.header} must be a percentage from 0 to 100.`);
      }
      const storedScore = Number.isInteger(selected.score) ? selected.score : null;
      const classId = classMemberships.get(student.account_id)[0];
      classItems.get(classId).push({
        student_account_id: student.account_id,
        status: selected.status,
        score: storedScore,
        score_max: storedScore === null ? null : 100,
        evidence: {
          import_format: "ketangpai-grade-export",
          workbook: workbook.sourceName,
          worksheet: workbook.sheetName,
          column: assignment.column,
          source_rows: results.map((item) => item.row.rowNumber),
          external_ids: results.map((item) => item.row.externalId).filter(Boolean),
          raw_values: results.map((item) => textValue(item.row.values[assignment.header]))
        },
        note: [
          results.length > 1 ? `Combined ${results.length} Ketangpai account rows.` : null,
          selected.score !== null && storedScore === null ? `Source percentage: ${selected.score}.` : null
        ].filter(Boolean).join(" ") || null
      });
    }
    return {
      title: assignment.header,
      assigned_on: dates[assignmentIndex],
      classes: targetClasses.map((classroom) => ({
        ...classroom,
        items: classItems.get(classroom.class_id).sort((left, right) => left.student_account_id.localeCompare(right.student_account_id))
      }))
    };
  });

  const identities = [];
  const accountsWithIdentity = new Set(existingIdentities.values());
  for (const student of targetRoster) {
    if (accountsWithIdentity.has(student.account_id)) continue;
    const candidates = matchedRows.get(student.account_id).filter((row) => row.externalId);
    const preferred = candidates.find((row) => row.name.includes(student.legal_name) && row.studentNumber) ?? candidates[0];
    if (preferred) identities.push({ account_id: student.account_id, external_id: preferred.externalId });
  }
  return { grade: normalizedGrade, targetClasses, targetRoster, assignments, identities, matchedRows };
}
