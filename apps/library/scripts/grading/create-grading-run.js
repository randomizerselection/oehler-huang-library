const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..', '..');
const schemaVersion = 'igcse-economics-grading-pilot/v1';

function slugifyExamId(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function starterData(examId) {
  return {
    schema_version: schemaVersion,
    exam: {
      id: examId,
      title: examId,
      class_group: '',
      max_marks: null,
      question_paper: 'exam/question-paper.pdf',
      mark_scheme: 'exam/mark-scheme.pdf',
      notes: ['Marks are provisional until teacher review.'],
    },
    sources: {
      roster: '',
    },
    rubric: [],
    students: [],
    answers: [],
    unmatched: [],
    audit: {
      codex_operator: '',
      run_notes: ['Teacher review is required before final marks are used.'],
      limitations: [
        'Diagram answers require manual review unless all labels and shifts are clearly readable.',
      ],
    },
  };
}

function createGradingRun(examId, options = {}) {
  const root = options.rootDir ? path.resolve(options.rootDir) : workspaceRoot;
  const safeExamId = slugifyExamId(examId);
  if (!safeExamId) {
    throw new Error('Usage: node scripts/grading/create-grading-run.js <exam-id>');
  }

  const runDir = path.join(root, 'grading', 'runs', safeExamId);
  const folders = ['exam', 'photos', 'work', 'outputs'];
  for (const folder of folders) {
    fs.mkdirSync(path.join(runDir, folder), { recursive: true });
  }

  const dataPath = path.join(runDir, 'work', 'grading-data.json');
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, `${JSON.stringify(starterData(safeExamId), null, 2)}\n`, 'utf8');
  }

  return { examId: safeExamId, runDir, dataPath };
}

if (require.main === module) {
  const result = createGradingRun(process.argv[2]);
  console.log(`Created grading run: ${path.relative(workspaceRoot, result.runDir)}`);
  console.log('Add question-paper.*, mark-scheme.*, and photos, then fill work/grading-data.json.');
}

module.exports = {
  createGradingRun,
  schemaVersion,
  slugifyExamId,
  starterData,
};
