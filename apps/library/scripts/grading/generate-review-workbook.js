const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const workspaceRoot = path.resolve(__dirname, '..', '..');
const schemaVersion = 'igcse-economics-grading-pilot/v1';
const reviewStatuses = ['Pending', 'Approved', 'Adjusted', 'Rejected'];
const confidenceLevels = ['High', 'Medium', 'Low'];

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === '') return [];
  return [value];
}

function joinList(value) {
  return asArray(value).filter(Boolean).join('; ');
}

function isRelativePath(value) {
  return typeof value === 'string' && value.trim() && !path.isAbsolute(value) && !/^[a-z]+:\/\//i.test(value);
}

function escapeFormulaText(value) {
  return String(value || '').replace(/"/g, '""');
}

function loadJson(jsonPath) {
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

function resolveInputPath(inputArg) {
  if (!inputArg) {
    throw new Error('Usage: node scripts/grading/generate-review-workbook.js <run-folder-or-grading-data.json>');
  }
  const absolute = path.resolve(workspaceRoot, inputArg);
  if (!fs.existsSync(absolute)) {
    throw new Error(`Input not found: ${absolute}`);
  }
  if (fs.statSync(absolute).isDirectory()) {
    return path.join(absolute, 'work', 'grading-data.json');
  }
  return absolute;
}

function deriveRunDir(dataPath) {
  const parent = path.basename(path.dirname(dataPath)).toLowerCase();
  if (parent === 'work') return path.dirname(path.dirname(dataPath));
  return path.dirname(dataPath);
}

function validateGradingData(data, runDir) {
  const errors = [];
  const warnings = [];

  if (data.schema_version && data.schema_version !== schemaVersion) {
    warnings.push(`Unexpected schema_version: ${data.schema_version}`);
  }
  if (!data.exam || typeof data.exam !== 'object') {
    errors.push('Missing exam object.');
  }

  const exam = data.exam || {};
  for (const [label, key] of [['question paper', 'question_paper'], ['mark scheme', 'mark_scheme']]) {
    const value = exam[key];
    if (!isRelativePath(value)) {
      errors.push(`Exam ${label} path must be a relative path in exam.${key}.`);
      continue;
    }
    const absolute = path.resolve(runDir, value);
    if (!absolute.startsWith(path.resolve(runDir))) {
      errors.push(`Exam ${label} path escapes the run folder: ${value}`);
    } else if (!fs.existsSync(absolute)) {
      errors.push(`Exam ${label} file does not exist: ${value}`);
    }
  }

  const rubric = asArray(data.rubric);
  if (!rubric.length) errors.push('Rubric must contain at least one question.');
  const rubricById = new Map();
  let rubricTotal = 0;
  for (const item of rubric) {
    if (!item.question_id) {
      errors.push('Rubric entry is missing question_id.');
      continue;
    }
    if (rubricById.has(item.question_id)) errors.push(`Duplicate rubric question_id: ${item.question_id}`);
    rubricById.set(item.question_id, item);
    const maxMark = Number(item.max_mark);
    if (!Number.isFinite(maxMark) || maxMark <= 0) {
      errors.push(`Rubric ${item.question_id} has invalid max_mark.`);
    } else {
      rubricTotal += maxMark;
    }
    if (/diagram|draw/i.test(`${item.question || ''} ${item.command_word || ''}`) && item.review_default !== 'Pending') {
      warnings.push(`Rubric ${item.question_id} appears diagram-based and should default to Pending review.`);
    }
  }
  if (exam.max_marks !== null && exam.max_marks !== undefined && Number(exam.max_marks) !== rubricTotal) {
    errors.push(`Exam max_marks (${exam.max_marks}) does not equal rubric total (${rubricTotal}).`);
  }

  const students = asArray(data.students);
  const studentIds = new Set(students.map((student) => student.student_id).filter(Boolean));
  const answers = asArray(data.answers);
  for (const [index, answer] of answers.entries()) {
    const label = `answers[${index}]`;
    if (!answer.student_id) errors.push(`${label} is missing student_id.`);
    if (answer.student_id && !studentIds.has(answer.student_id)) {
      warnings.push(`${label} references student_id not listed in students: ${answer.student_id}`);
    }
    if (!rubricById.has(answer.question_id)) {
      errors.push(`${label} references unknown question_id: ${answer.question_id}`);
      continue;
    }
    const rubricItem = rubricById.get(answer.question_id);
    const maxMark = Number(rubricItem.max_mark);
    const aiMark = Number(answer.ai_mark);
    if (!Number.isFinite(aiMark) || aiMark < 0 || aiMark > maxMark) {
      errors.push(`${label} has ai_mark outside 0-${maxMark}.`);
    }
    if (answer.max_mark !== undefined && Number(answer.max_mark) !== maxMark) {
      errors.push(`${label} max_mark (${answer.max_mark}) does not match rubric ${answer.question_id} (${maxMark}).`);
    }
    if (!confidenceLevels.includes(answer.confidence)) {
      warnings.push(`${label} confidence should be High, Medium, or Low.`);
    }
    const photoRefs = asArray(answer.source_photo_refs);
    if (!photoRefs.length) errors.push(`${label} must include at least one source_photo_refs value.`);
    for (const photoRef of photoRefs) {
      if (!isRelativePath(photoRef)) errors.push(`${label} source photo must be a relative path: ${photoRef}`);
    }
  }

  for (const [index, item] of asArray(data.unmatched).entries()) {
    for (const photoRef of asArray(item.source_photo_refs)) {
      if (!isRelativePath(photoRef)) errors.push(`unmatched[${index}] source photo must be a relative path: ${photoRef}`);
    }
  }

  return { errors, warnings, rubricTotal };
}

function collectStudents(data) {
  const byId = new Map();
  for (const student of asArray(data.students)) {
    if (!student.student_id) continue;
    byId.set(student.student_id, {
      student_id: student.student_id,
      extracted_name: student.extracted_name || '',
      matched_name: student.matched_name || student.extracted_name || '',
      class: student.class || '',
      identity_confidence: student.identity_confidence || '',
    });
  }
  for (const answer of asArray(data.answers)) {
    if (!answer.student_id || byId.has(answer.student_id)) continue;
    byId.set(answer.student_id, {
      student_id: answer.student_id,
      extracted_name: answer.extracted_name || '',
      matched_name: answer.matched_name || answer.extracted_name || '',
      class: answer.class || '',
      identity_confidence: 'Unlisted',
    });
  }
  return [...byId.values()].sort((left, right) => left.student_id.localeCompare(right.student_id));
}

function styleTitle(cell) {
  cell.font = { bold: true, size: 16, color: { argb: 'FFFFFFFF' } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF263241' } };
  cell.alignment = { vertical: 'middle' };
}

function styleHeader(row) {
  row.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FF344054' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF4F8' } };
    cell.border = { bottom: { style: 'thin', color: { argb: 'FFD9E0E8' } } };
    cell.alignment = { vertical: 'top', wrapText: true };
  });
}

function styleSheet(sheet, widths) {
  widths.forEach((width, index) => {
    sheet.getColumn(index + 1).width = width;
  });
  sheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.alignment = { vertical: 'top', wrapText: true };
    });
  });
}

function addValidationIssueRows(sheet, validation) {
  sheet.addRow(['Validation errors', validation.errors.length ? validation.errors.join('\n') : 'None']);
  sheet.addRow(['Validation warnings', validation.warnings.length ? validation.warnings.join('\n') : 'None']);
}

async function buildWorkbook(data, options) {
  const runDir = options.runDir;
  const validation = validateGradingData(data, runDir);
  if (validation.errors.length && !options.allowInvalid) {
    throw new Error(`Cannot generate workbook:\n${validation.errors.join('\n')}`);
  }

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Oehler-Huang Library grading workflow';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.properties.date1904 = false;

  const exam = data.exam || {};
  const students = collectStudents(data);
  const answers = asArray(data.answers);
  const rubric = asArray(data.rubric);
  const answersByStudent = new Map();
  for (const answer of answers) {
    if (!answersByStudent.has(answer.student_id)) answersByStudent.set(answer.student_id, []);
    answersByStudent.get(answer.student_id).push(answer);
  }

  const dashboard = workbook.addWorksheet('Review Dashboard', { views: [{ state: 'frozen', ySplit: 1 }] });
  dashboard.mergeCells('A1:F1');
  dashboard.getCell('A1').value = `${exam.title || exam.id || 'IGCSE Economics grading'} - review dashboard`;
  styleTitle(dashboard.getCell('A1'));
  dashboard.addRow([]);
  dashboard.addRows([
    ['Exam', exam.title || exam.id || ''],
    ['Class group', exam.class_group || ''],
    ['Rubric total marks', validation.rubricTotal],
    ['Students', { formula: "COUNTA('Student Scores'!A2:A10000)" }],
    ['Pending review questions', { formula: "COUNTIF('Question Detail'!M:M,\"Pending\")+COUNTIF('Question Detail'!M:M,\"\")" }],
    ['Low/medium confidence rows', { formula: "COUNTIF('Question Detail'!H:H,\"Low\")+COUNTIF('Question Detail'!H:H,\"Medium\")" }],
    ['Unmatched photo groups', { formula: 'COUNTA(Unmatched!A2:A10000)' }],
    ['Reviewed students', { formula: "COUNTIF('Student Scores'!E:E,\"Reviewed\")" }],
  ]);
  dashboard.addRow([]);
  dashboard.addRow(['Question weakness summary']);
  dashboard.getRow(dashboard.lastRow.number).font = { bold: true, size: 13 };
  dashboard.addRow(['Question', 'Max mark', 'Average AI mark', 'Lowest AI mark', 'Pending reviews', 'Low/medium confidence']);
  styleHeader(dashboard.lastRow);
  const summaryStart = dashboard.lastRow.number + 1;
  rubric.forEach((item, index) => {
    const row = summaryStart + index;
    dashboard.addRow([
      item.question_id,
      Number(item.max_mark),
      { formula: `IFERROR(AVERAGEIF('Question Detail'!$E:$E,A${row},'Question Detail'!$G:$G),"")` },
      { formula: `IFERROR(MINIFS('Question Detail'!$G:$G,'Question Detail'!$E:$E,A${row}),"")` },
      { formula: `COUNTIFS('Question Detail'!$E:$E,A${row},'Question Detail'!$M:$M,"Pending")+COUNTIFS('Question Detail'!$E:$E,A${row},'Question Detail'!$M:$M,"")` },
      { formula: `COUNTIFS('Question Detail'!$E:$E,A${row},'Question Detail'!$H:$H,"Low")+COUNTIFS('Question Detail'!$E:$E,A${row},'Question Detail'!$H:$H,"Medium")` },
    ]);
  });
  styleSheet(dashboard, [24, 18, 18, 18, 18, 24]);

  const studentSheet = workbook.addWorksheet('Student Scores', { views: [{ state: 'frozen', ySplit: 1 }] });
  studentSheet.addRow([
    'Student ID',
    'Extracted name',
    'Matched name',
    'Class',
    'Review status',
    'Provisional total',
    'Teacher final total',
    'Identity confidence',
    'Low/medium confidence rows',
    'Flags',
    'Teacher notes',
  ]);
  styleHeader(studentSheet.getRow(1));
  students.forEach((student, index) => {
    const row = index + 2;
    const flags = [...new Set(asArray(answersByStudent.get(student.student_id)).flatMap((answer) => asArray(answer.flags)))].join('; ');
    studentSheet.addRow([
      student.student_id,
      student.extracted_name,
      student.matched_name,
      student.class,
      {
        formula: `IF(COUNTIF('Question Detail'!$A:$A,A${row})=0,"No answers",IF(COUNTIFS('Question Detail'!$A:$A,A${row},'Question Detail'!$M:$M,"Pending")+COUNTIFS('Question Detail'!$A:$A,A${row},'Question Detail'!$M:$M,"")>0,"Pending Review",IF(COUNTIFS('Question Detail'!$A:$A,A${row},'Question Detail'!$M:$M,"Rejected")>0,"Has Rejections","Reviewed")))`,
      },
      { formula: `SUMIF('Question Detail'!$A:$A,A${row},'Question Detail'!$G:$G)` },
      { formula: `IF(E${row}="Reviewed",SUMIF('Question Detail'!$A:$A,A${row},'Question Detail'!$O:$O),"")` },
      student.identity_confidence,
      {
        formula: `COUNTIFS('Question Detail'!$A:$A,A${row},'Question Detail'!$H:$H,"Low")+COUNTIFS('Question Detail'!$A:$A,A${row},'Question Detail'!$H:$H,"Medium")`,
      },
      flags,
      '',
    ]);
  });
  studentSheet.autoFilter = 'A1:K1';
  styleSheet(studentSheet, [14, 22, 22, 12, 18, 16, 18, 18, 18, 30, 30]);

  const detailSheet = workbook.addWorksheet('Question Detail', { views: [{ state: 'frozen', ySplit: 1 }] });
  detailSheet.addRow([
    'Student ID',
    'Extracted name',
    'Matched name',
    'Class',
    'Question',
    'Max mark',
    'AI mark',
    'Confidence',
    'Evidence',
    'Missing point',
    'Flags',
    'Source photos',
    'Review status',
    'Teacher mark',
    'Final mark',
    'Transcription',
  ]);
  styleHeader(detailSheet.getRow(1));
  const studentById = new Map(students.map((student) => [student.student_id, student]));
  answers.forEach((answer, index) => {
    const row = index + 2;
    const student = studentById.get(answer.student_id) || {};
    const rubricItem = rubric.find((item) => item.question_id === answer.question_id) || {};
    const reviewDefault = answer.review_status || rubricItem.review_default || 'Pending';
    detailSheet.addRow([
      answer.student_id || '',
      student.extracted_name || answer.extracted_name || '',
      student.matched_name || answer.matched_name || '',
      student.class || answer.class || '',
      answer.question_id || '',
      Number(rubricItem.max_mark || answer.max_mark || 0),
      Number(answer.ai_mark || 0),
      answer.confidence || '',
      answer.evidence || '',
      answer.missing_point || '',
      joinList(answer.flags),
      joinList(answer.source_photo_refs),
      reviewStatuses.includes(reviewDefault) ? reviewDefault : 'Pending',
      '',
      { formula: `IF(OR(M${row}="Approved",M${row}="Adjusted"),IF(ISNUMBER(N${row}),N${row},G${row}),"")` },
      answer.transcription || '',
    ]);
    detailSheet.getCell(`M${row}`).dataValidation = {
      type: 'list',
      allowBlank: false,
      formulae: [`"${reviewStatuses.join(',')}"`],
    };
    detailSheet.getCell(`N${row}`).dataValidation = {
      type: 'decimal',
      operator: 'between',
      allowBlank: true,
      formulae: [0, Number(rubricItem.max_mark || answer.max_mark || 0)],
      showErrorMessage: true,
      errorTitle: 'Invalid mark',
      error: 'Teacher mark must be between 0 and the max mark for this question.',
    };
  });
  detailSheet.autoFilter = 'A1:P1';
  styleSheet(detailSheet, [14, 22, 22, 12, 12, 10, 10, 12, 44, 44, 26, 34, 16, 12, 12, 54]);

  const rubricSheet = workbook.addWorksheet('Rubric', { views: [{ state: 'frozen', ySplit: 1 }] });
  rubricSheet.addRow(['Question', 'Command word', 'Max mark', 'Question text', 'Mark scheme points', 'Award rules', 'Review default']);
  styleHeader(rubricSheet.getRow(1));
  rubric.forEach((item) => {
    rubricSheet.addRow([
      item.question_id || '',
      item.command_word || '',
      Number(item.max_mark || 0),
      item.question || '',
      joinList(item.mark_scheme_points),
      joinList(item.award_rules),
      item.review_default || 'Pending',
    ]);
  });
  rubricSheet.autoFilter = 'A1:G1';
  styleSheet(rubricSheet, [12, 16, 10, 48, 58, 58, 16]);

  const unmatchedSheet = workbook.addWorksheet('Unmatched', { views: [{ state: 'frozen', ySplit: 1 }] });
  unmatchedSheet.addRow(['Issue type', 'Extracted name', 'Class', 'Source photos', 'Reason', 'Confidence', 'Reviewer notes']);
  styleHeader(unmatchedSheet.getRow(1));
  asArray(data.unmatched).forEach((item) => {
    unmatchedSheet.addRow([
      item.issue_type || '',
      item.extracted_name || '',
      item.class || '',
      joinList(item.source_photo_refs),
      item.reason || '',
      item.confidence || '',
      '',
    ]);
  });
  unmatchedSheet.autoFilter = 'A1:G1';
  styleSheet(unmatchedSheet, [24, 24, 12, 36, 54, 14, 34]);

  const auditSheet = workbook.addWorksheet('Audit');
  auditSheet.addRow(['Field', 'Value']);
  styleHeader(auditSheet.getRow(1));
  auditSheet.addRows([
    ['Schema version', data.schema_version || ''],
    ['Run generated at', new Date().toISOString()],
    ['Exam ID', exam.id || ''],
    ['Question paper', exam.question_paper || ''],
    ['Mark scheme', exam.mark_scheme || ''],
    ['Roster source', data.sources?.roster || ''],
    ['Assumption', 'AI/Codex marks are provisional until teacher review.'],
    ['Assumption', 'Teacher final totals use only rows marked Approved or Adjusted.'],
    ['Limitation', joinList(data.audit?.limitations) || 'Diagram answers require manual review when unclear.'],
    ['Run notes', joinList(data.audit?.run_notes)],
  ]);
  addValidationIssueRows(auditSheet, validation);
  styleSheet(auditSheet, [24, 96]);

  [dashboard, studentSheet, detailSheet, rubricSheet, unmatchedSheet, auditSheet].forEach((sheet) => {
    sheet.getRow(1).height = 24;
    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE8EDF2' } },
          left: { style: 'thin', color: { argb: 'FFE8EDF2' } },
          bottom: { style: 'thin', color: { argb: 'FFE8EDF2' } },
          right: { style: 'thin', color: { argb: 'FFE8EDF2' } },
        };
      });
    });
  });

  detailSheet.addConditionalFormatting({
    ref: `H2:H${Math.max(2, answers.length + 1)}`,
    rules: [
      {
        type: 'containsText',
        operator: 'containsText',
        text: 'Low',
        style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFFD7D7' } } },
      },
      {
        type: 'containsText',
        operator: 'containsText',
        text: 'Medium',
        style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFFF0C2' } } },
      },
    ],
  });

  dashboard.getCell('A12').note = `Question paper: ${escapeFormulaText(exam.question_paper || '')}\nMark scheme: ${escapeFormulaText(exam.mark_scheme || '')}`;

  return { workbook, validation };
}

async function generateReviewWorkbook(inputPath, options = {}) {
  const dataPath = resolveInputPath(inputPath);
  const runDir = options.runDir ? path.resolve(options.runDir) : deriveRunDir(dataPath);
  const data = loadJson(dataPath);
  const { workbook, validation } = await buildWorkbook(data, { runDir, allowInvalid: options.allowInvalid });
  const outputPath = options.outputPath
    ? path.resolve(options.outputPath)
    : path.join(runDir, 'outputs', `${data.exam?.id || path.basename(runDir)}-grading-review.xlsx`);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await workbook.xlsx.writeFile(outputPath);
  return { outputPath, validation };
}

if (require.main === module) {
  generateReviewWorkbook(process.argv[2])
    .then((result) => {
      console.log(`Wrote ${path.relative(workspaceRoot, result.outputPath)}`);
      if (result.validation.warnings.length) {
        console.warn(`Warnings:\n${result.validation.warnings.join('\n')}`);
      }
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}

module.exports = {
  buildWorkbook,
  generateReviewWorkbook,
  validateGradingData,
  schemaVersion,
};
