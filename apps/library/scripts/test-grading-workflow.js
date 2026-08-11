const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const ExcelJS = require('exceljs');
const { createGradingRun } = require('./grading/create-grading-run');
const { generateReviewWorkbook, validateGradingData } = require('./grading/generate-review-workbook');

async function main() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'igcse-grading-test-'));
  try {
    const { runDir, dataPath } = createGradingRun('Pilot Exam 01', { rootDir: tempRoot });
    fs.writeFileSync(path.join(runDir, 'exam', 'question-paper.pdf'), 'placeholder question paper', 'utf8');
    fs.writeFileSync(path.join(runDir, 'exam', 'mark-scheme.pdf'), 'placeholder mark scheme', 'utf8');

    const data = {
      schema_version: 'igcse-economics-grading-pilot/v1',
      exam: {
        id: 'pilot-exam-01',
        title: 'Pilot Exam 01',
        class_group: 'IC 1',
        max_marks: 6,
        question_paper: 'exam/question-paper.pdf',
        mark_scheme: 'exam/mark-scheme.pdf',
      },
      sources: { roster: '' },
      rubric: [
        {
          question_id: 'Q1',
          question: 'Identify two factors affecting PES. [2]',
          command_word: 'identify',
          max_mark: 2,
          mark_scheme_points: ['time', 'resource availability'],
          award_rules: ['one mark per valid identification'],
          review_default: 'Pending',
        },
        {
          question_id: 'Q2',
          question: 'Explain one advantage of a market economic system. [4]',
          command_word: 'explain',
          max_mark: 4,
          mark_scheme_points: ['consumer choice', 'profit incentive', 'competition', 'resource allocation'],
          award_rules: ['developed economic links required'],
          review_default: 'Pending',
        },
      ],
      students: [
        {
          student_id: 'S001',
          extracted_name: 'Example Student',
          matched_name: 'Example Student',
          class: 'IC 1.1',
          identity_confidence: 'High',
        },
      ],
      answers: [
        {
          student_id: 'S001',
          question_id: 'Q1',
          ai_mark: 1,
          max_mark: 2,
          confidence: 'Medium',
          evidence: 'Identifies time needed for trees to grow.',
          missing_point: 'No second valid factor.',
          flags: ['short-answer'],
          source_photo_refs: ['photos/example-page-1.jpg'],
          transcription: 'new trees take a long time',
        },
        {
          student_id: 'S001',
          question_id: 'Q2',
          ai_mark: 3,
          max_mark: 4,
          confidence: 'High',
          evidence: 'Links consumer demand to firms producing goods for profit.',
          missing_point: 'No developed competition point.',
          flags: [],
          source_photo_refs: ['photos/example-page-1.jpg'],
          transcription: 'firms make what people want so they can gain profit',
        },
      ],
      unmatched: [
        {
          issue_type: 'Ambiguous identity',
          extracted_name: '',
          class: '',
          source_photo_refs: ['photos/unknown-page-1.jpg'],
          reason: 'Name is cropped.',
          confidence: 'Low',
        },
      ],
      audit: {
        run_notes: ['Test run'],
        limitations: ['Diagram answers require manual review.'],
      },
    };
    fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

    const validation = validateGradingData(data, runDir);
    assert.deepStrictEqual(validation.errors, []);
    assert.strictEqual(validation.rubricTotal, 6);

    const { outputPath } = await generateReviewWorkbook(dataPath);
    assert.ok(fs.existsSync(outputPath), 'workbook should be written');

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(outputPath);
    const sheetNames = workbook.worksheets.map((sheet) => sheet.name);
    assert.deepStrictEqual(sheetNames, [
      'Review Dashboard',
      'Student Scores',
      'Question Detail',
      'Rubric',
      'Unmatched',
      'Audit',
    ]);

    const detail = workbook.getWorksheet('Question Detail');
    assert.strictEqual(detail.getCell('M2').value, 'Pending');
    assert.strictEqual(
      detail.getCell('O2').value.formula,
      'IF(OR(M2="Approved",M2="Adjusted"),IF(ISNUMBER(N2),N2,G2),"")',
    );
    assert.deepStrictEqual(detail.getCell('M2').dataValidation.formulae, ['"Pending,Approved,Adjusted,Rejected"']);

    const studentScores = workbook.getWorksheet('Student Scores');
    assert.match(studentScores.getCell('G2').value.formula, /IF\(E2="Reviewed"/);

    const dashboard = workbook.getWorksheet('Review Dashboard');
    assert.match(dashboard.getCell('B8').value.formula, /COUNTIF\('Question Detail'!H:H,"Low"\)/);
  } finally {
    const resolved = path.resolve(tempRoot);
    if (resolved.startsWith(os.tmpdir())) {
      fs.rmSync(resolved, { recursive: true, force: true });
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
