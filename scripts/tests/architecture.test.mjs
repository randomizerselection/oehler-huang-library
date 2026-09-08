import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { checkArchitecture, root } from '../check-architecture.mjs';
import { collectReleaseFiles, isReleaseFile } from '../../deploy/release-files.mjs';

const require = createRequire(import.meta.url);
const { activeContentFiles } = require('../../apps/library/scripts/content-sources.js');

function temporary(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'oh-architecture-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}
function write(root, file, value) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), typeof value === 'string' ? value : JSON.stringify(value));
}

test('landing pages publish lessons; merely creating an old or draft file cannot publish it', t => {
  const directory = temporary(t);
  write(directory, 'index.html', 'Home');
  for (const [id, lessons] of [['economics', '../lessons/'], ['investment-analysis', 'lessons/'], ['a-level', 'lessons/']]) {
    write(directory, `${id}/index.html`, `<a href="${lessons}current/index.html">Current</a><a href="${lessons}current/index.html?view=quiz">Quiz</a><!-- <a href="${lessons}old/index.html">Old</a> -->`);
    const base = id === 'economics' ? 'lessons' : `${id}/lessons`;
    write(directory, `${base}/current/index.html`, 'Current');
    write(directory, `${base}/old/index.html`, 'Old');
    write(directory, `${base}/draft/index.html`, 'Draft');
  }
  const files = activeContentFiles(directory);
  assert.equal(files.length, 7);
  assert.ok(!files.some(file => /old|draft/.test(file)));
  write(directory, 'a-level/index.html', '<a href="lessons/missing/index.html">Missing</a>');
  assert.throws(() => activeContentFiles(directory), /ENOENT/);
});

test('release includes shared contracts, server inputs and public legacy URLs, but no private authoring or tooling', () => {
  const files = new Set(collectReleaseFiles());
  for (const file of ['packages/contracts/package.json', 'packages/contracts/content.cjs', 'packages/contracts/public-files.cjs', 'apps/platform/prompts/00-shared-guardrails.md', 'apps/platform/spec/grading-input.schema.json', 'apps/library/scripts/content-sources.js', 'apps/library/generated/quiz-bank.json', 'apps/student-selector/assets/messages.csv', 'apps/library/investment-analysis/unit-1/lesson-1-archive-price-graph/index.html']) assert.ok(files.has(file), file);
  for (const file of ['authoring/a-level/planning/plan.xlsx', 'apps/library/references/book.pdf', 'apps/library/investment-analysis/.tmp/draft.html', 'apps/library/investment-analysis/lesson.pptx', 'apps/library/android-definitions/app/build/app.apk', 'apps/library/archive/function.js', 'apps/platform/tests/test.mjs', 'apps/platform/deploy/old-service.service', 'apps/student-selector/assets/students.csv', '.platform-data/econmark.sqlite', 'packages/contracts/tests/contracts.test.cjs']) assert.equal(isReleaseFile(file), false, file);
  for (const file of activeContentFiles(path.join(root, 'apps/library'))) assert.ok(files.has(`apps/library/${file}`), `Active content missing from release: ${file}`);
});

test('architecture check rejects direct cross-app imports and extra lockfiles', t => {
  const directory = temporary(t);
  write(directory, 'package.json', { workspaces: ['apps/*', 'packages/*'] });
  for (const [owner, name] of [['apps/library', 'library'], ['apps/platform', 'platform'], ['apps/student-selector', 'student-selector'], ['packages/contracts', 'contracts']]) {
    write(directory, `${owner}/package.json`, { name: `@oehler-huang/${name}`, private: true });
  }
  assert.deepEqual(checkArchitecture(directory), []);
  write(directory, 'apps/platform/server/wrong.mjs', "import '../../library/private.js';");
  write(directory, 'apps/library/package-lock.json', {});
  assert.equal(checkArchitecture(directory).length, 2);
});
