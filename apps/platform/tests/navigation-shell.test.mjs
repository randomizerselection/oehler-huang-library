import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { resolve } from "node:path";

const platformRoot = resolve(import.meta.dirname, "..");
const workspaceRoot = resolve(platformRoot, "..", "..");

async function source(relativePath) {
  return readFile(resolve(workspaceRoot, relativePath), "utf8");
}

test("public learning entrances use the canonical routes and account mount", async () => {
  const pages = [
    "apps/library/index.html",
    "apps/library/economics/index.html",
    "apps/library/a-level/index.html",
    "apps/library/investment-analysis/index.html",
    "apps/library/definitions.html",
    "apps/library/investment-analysis/definitions.html",
    "apps/library/pedagogy.html"
  ];
  for (const page of pages) {
    const html = await source(page);
    assert.match(html, /data-platform-account/, `${page} should expose the shared account control`);
    assert.doesNotMatch(html, /href="\/mark\//, `${page} should not link to the retired /mark route`);
  }
  const landing = await source("apps/library/index.html");
  assert.equal((landing.match(/class="entry-card/g) || []).length, 4);
  assert.match(landing, /href="a-level\/index\.html" data-entry="a-level"/);
  assert.match(landing, /href="\/econmark\/" data-entry="homework"/);
});

test("EconMark and Selector use one account shell and /econmark tools", async () => {
  for (const page of ["apps/platform/student.html", "apps/platform/teacher.html", "apps/platform/index.html", "apps/platform/batch.html"]) {
    const html = await source(page);
    assert.match(html, /data-platform-account/);
    assert.match(html, /href="\/econmark\//);
    assert.doesNotMatch(html, /id="account-dialog"/);
  }
  const selector = await source("apps/student-selector/index.html");
  assert.match(selector, /data-platform-account/);
  assert.match(selector, /href="\/econmark\/teacher"/);

  const shell = await source("apps/platform/src/platform-account-shell.js");
  assert.match(shell, /attachShadow\(\{ mode: 'open' \}\)/);
  assert.match(shell, /\/api\/account\/profile/);
  assert.match(shell, /\/api\/auth\/register\/\$\{this\.requiredRole\}/);
});
