const test = require('node:test');
const assert = require('node:assert/strict');
const { CONTENT_SCHEMA, QUIZ_SCHEMA, validateContentCatalog } = require('../content.cjs');
const { isPublicAsset } = require('../public-files.cjs');

function catalog() {
  const source_hash = 'a'.repeat(64);
  return [
    { schema_version: CONTENT_SCHEMA, source_hash, items: [{ id: 'lesson', route: '/lesson/', quiz_id: 'quiz' }] },
    { schema_version: QUIZ_SCHEMA, source_hash, quizzes: [{ id: 'quiz', version: '1.0.0', route: '/lesson/', questions: [{ id: 'q1', type: 'multipleChoice', choices: ['A', 'B'], answer: 1, points: 1 }] }] },
  ];
}

test('content producer and consumer reject incompatible builds and broken grading references', () => {
  assert.doesNotThrow(() => validateContentCatalog(...catalog()));
  const mutations = [
    ([manifest]) => { manifest.schema_version = 'future/2'; },
    ([, bank]) => { bank.source_hash = 'b'.repeat(64); },
    ([manifest]) => { manifest.items.push({ ...manifest.items[0] }); },
    ([manifest]) => { manifest.items[0].quiz_id = 'missing'; },
    ([, bank]) => { bank.quizzes[0].route = '/elsewhere/'; },
    ([, bank]) => { bank.quizzes[0].questions[0].answer = 5; },
    ([, bank]) => { bank.quizzes[0].questions[0].points = -1; },
    ([, bank]) => { bank.quizzes[0].questions.push({ ...bank.quizzes[0].questions[0] }); },
  ];
  for (const mutate of mutations) {
    const pair = catalog();
    mutate(pair);
    assert.throws(() => validateContentCatalog(...pair), /Invalid content catalogue/);
  }
});

test('public assets preserve teaching sources and historical pages while excluding private work', () => {
  for (const file of ['index.html', 'assets/js/presentation.js', 'investment-analysis/unit-1/lesson-1-archive-price-graph/index.html', 'investment-analysis/lessons/current/SOURCE-NOTES.md']) {
    assert.equal(isPublicAsset('library', file), true, file);
  }
  for (const file of ['generated/quiz-bank.json', 'assets/data/quiz-bank.json', 'investment-analysis/.codex/cache.json', 'investment-analysis/.tmp/export.html', 'investment-analysis/references/book.pdf', 'investment-analysis/planning/plan.json', 'archive/function.js', 'android-definitions/app.js', 'lessons/topic/scripts/build.js', 'student-performance-report.html', '../platform/server/app-server.mjs', 'assets\\..\\server\\secret.json', 'package.json', 'playwright.config.js', 'authoring/plan.json', 'secret.env']) {
    assert.equal(isPublicAsset('library', file), false, file);
  }
  assert.equal(isPublicAsset('student-selector', 'assets/messages.csv'), true);
  assert.equal(isPublicAsset('student-selector', 'assets/students.csv'), false);
  assert.equal(isPublicAsset('platform', 'src/platform-account-shell.js'), true);
  assert.equal(isPublicAsset('platform', 'spec/grading-input.schema.json'), false);
});
