import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { resolve } from "node:path";

const platformRoot = resolve(import.meta.dirname, "..");
const workspaceRoot = resolve(platformRoot, "..", "..");

async function source(relativePath) {
  return readFile(resolve(workspaceRoot, relativePath), "utf8");
}

test("core applications share the consolidated platform navigation", async () => {
  const pages = [
    "apps/library/index.html",
    "apps/library/economics/index.html",
    "apps/library/investment-analysis/index.html",
    "apps/library/investment-analysis/definitions.html",
    "apps/library/investment-analysis/syllabus.html",
    "apps/library/investment-analysis/syllabus-company-analysis.html",
    "apps/library/investment-analysis/photo-archive.html",
    "apps/library/definitions.html",
    "apps/library/pedagogy.html",
    "apps/platform/student.html",
    "apps/platform/teacher.html",
    "apps/platform/index.html",
    "apps/platform/batch.html",
    "apps/student-selector/index.html"
  ];

  for (const page of pages) {
    const html = await source(page);
    assert.match(html, /app-shell\.css/, `${page} should load the shared app shell`);
    assert.match(html, /class="[^"]*oh-app-header/, `${page} should use the shared header`);
    assert.match(html, /data-oh-nav="economics"/, `${page} should link to Economics`);
    assert.match(html, /data-oh-nav="investment"/, `${page} should link to Investment`);
    assert.match(html, /data-oh-nav="homework"/, `${page} should link to Homework`);
  }
});

test("EconMark and Selector expose their local tools below the global destinations", async () => {
  for (const page of ["apps/platform/teacher.html", "apps/platform/index.html", "apps/platform/batch.html"]) {
    const html = await source(page);
    assert.match(html, /class="oh-context-bar oh-context-bar--full"/);
    assert.match(html, /href="\/mark\/teacher"/);
    assert.match(html, /href="\/mark\/single"/);
    assert.match(html, /href="\/mark\/batch"/);
    assert.match(html, /href="\/selector\/"/);
  }

  const selector = await source("apps/student-selector/index.html");
  assert.match(selector, />Student selector</);
  assert.match(selector, /data-oh-account-dock/);
});
