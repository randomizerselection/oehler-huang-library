import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createEconMarkServer } from '../server/app-server.mjs';

test('combined server serves shared assets and compatibility routes without exposing repository internals', async t => {
  const dataDir = await mkdtemp(join(tmpdir(), 'oh-public-boundaries-'));
  const app = await createEconMarkServer({
    root: process.cwd(), env: { OH_DATA_DIR: dataDir },
    storageStatus: () => ({ allowed: true, uploads_allowed: true, level: 'normal' }),
    gateway: { status: () => ({ ready: false, roles: {} }) },
  });
  await new Promise(resolve => app.server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${app.server.address().port}`;
  t.after(async () => {
    await new Promise(resolve => app.server.close(resolve));
    app.accountStore.close();
    app.platformStore.close();
    await rm(dataDir, { recursive: true, force: true });
  });
  for (const url of ['/', '/econmark/single', '/econmark/batch', '/platform/account-shell.js', '/src/demo-data.js', '/assets/samples/weak.svg', '/student-selector/selector.js', '/student-selector/assets/messages.csv', '/investment-analysis/lessons/1-1-2-measuring-investment-return/SOURCE-NOTES.md', '/investment-analysis/unit-1/lesson-1-archive-price-graph/index.html']) {
    const response = await fetch(base + url);
    assert.equal(response.status, 200, url);
  }
  for (const url of ['/econmark/server/app-server.mjs', '/econmark/prompts/00-shared-guardrails.md', '/econmark/spec/grading-input.schema.json', '/student-selector/assets/students.csv', '/student-selector/tests/harness.html', '/generated/quiz-bank.json', '/references/igcse-economics-definitions-2026.md', '/investment-analysis/AGENTS.md', '/authoring/README.md', '/investment-analysis/%5c..%5cpackage.json', '/bad%ZZ']) {
    assert.equal((await fetch(base + url)).status, 404, url);
  }
  const selector = await fetch(base + '/selector/', { redirect: 'manual' });
  assert.equal(selector.status, 302);
  const legacy = await fetch(base + '/mark/teacher?tab=quizzes', { redirect: 'manual' });
  assert.equal(legacy.headers.get('location'), '/econmark/teacher?tab=quizzes');
});
