import test from "node:test";
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { createContentCatalog } from "../server/content-catalog.mjs";

const libraryRoot = resolve(import.meta.dirname, "..", "..", "library");

test("content ids recorded as a lesson page path resolve to the manifest lesson", () => {
  const catalog = createContentCatalog(libraryRoot);
  const lesson = catalog.get("a-level:lessons:9-2-1-growth-output-gaps");
  assert.ok(lesson, "the growth and output gaps lesson should be in the manifest");
  // A deck opened from disk or behind a hosting prefix reports its page path, and
  // attendance records keep that value as their content id.
  const fromDisk = "C::Users:teacher:Documents:oehler-huang-platform:apps:library:a-level:lessons:9-2-1-growth-output-gaps";
  assert.equal(catalog.get(fromDisk)?.id, lesson.id);
  assert.equal(catalog.get(fromDisk)?.title, lesson.title);
  assert.equal(catalog.get(fromDisk)?.kind, lesson.kind);
  assert.equal(catalog.get("C:\\Users\\teacher\\apps\\library\\a-level\\lessons\\9-2-1-growth-output-gaps")?.id, lesson.id);
  assert.equal(catalog.get("/library/a-level/lessons/9-2-1-growth-output-gaps/")?.id, lesson.id);
  assert.equal(catalog.get(fromDisk)?.id, lesson.id, "a resolved alias is cached");
  assert.equal(
    catalog.get("C::Users:teacher:apps:library:lessons:unit-4-government:4-4-supply-side-policy:lesson-5")?.id,
    "lessons:unit-4-government:4-4-supply-side-policy:lesson-5",
    "the longest matching route wins over a shorter nested lesson"
  );
});

test("unknown content ids and the site root stay unresolved", () => {
  const catalog = createContentCatalog(libraryRoot);
  for (const id of ["", "   ", "/", "nonsense:garbage", "library:missing"]) {
    assert.equal(catalog.get(id), null, `${JSON.stringify(id)} should not resolve`);
  }
});