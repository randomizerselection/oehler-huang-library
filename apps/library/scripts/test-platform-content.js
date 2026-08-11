const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { build } = require('./build-platform-content.js');

const root = path.resolve(__dirname, '..');
const result = build({ write: false });
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'generated/content-manifest.json'), 'utf8'));
const bank = JSON.parse(fs.readFileSync(path.join(root, 'generated/quiz-bank.json'), 'utf8'));

assert.equal(JSON.stringify(manifest), JSON.stringify(result.manifest), 'content-manifest.json is stale; run npm run build:content');
assert.equal(JSON.stringify(bank), JSON.stringify(result.bank), 'quiz-bank.json is stale; run npm run build:content');
assert.equal(new Set(manifest.items.map((item) => item.id)).size, manifest.items.length, 'content IDs must be unique');
assert.equal(new Set(manifest.items.map((item) => item.route)).size, manifest.items.length, 'content routes must be unique');
assert.equal(new Set(bank.quizzes.map((quiz) => quiz.id)).size, bank.quizzes.length, 'quiz IDs must be unique');
for (const item of manifest.items) {
  assert.match(item.id, /^[a-z0-9][a-z0-9:._-]*$/i);
  assert.match(item.version, /^\d+\.\d+\.\d+$/);
  assert.ok(item.route.startsWith('/') && item.route.endsWith('/'));
}
for (const quiz of bank.quizzes) {
  assert.match(quiz.version, /^\d+\.\d+\.\d+$/);
  assert.ok(quiz.questions.length > 0);
  assert.equal(new Set(quiz.questions.map((question) => question.id)).size, quiz.questions.length);
}
console.log(`Platform content validation passed for ${manifest.items.length} items and ${bank.quizzes.length} quizzes.`);
