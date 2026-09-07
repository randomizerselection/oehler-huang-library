import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const schemaFiles = [
  "grading-input.schema.json",
  "parsed-rubric.schema.json",
  "evidence-record.schema.json",
  "grading-output.schema.json",
  "teacher-review.schema.json",
  "audit-record.schema.json",
  "batch-run.schema.json",
  "transcription-output.schema.json",
  "primary-score.schema.json",
  "reviewer-score.schema.json",
  "adjudicator-output.schema.json",
  "feedback-output.schema.json",
  "account.schema.json",
  "quiz-attempt.schema.json",
  "auth-session.schema.json",
  "persistence-record.schema.json",
  "stored-run.schema.json",
  "assignment.schema.json"
];

for (const filename of schemaFiles) {
  test(`${filename} parses as a versioned draft 2020-12 JSON Schema`, async () => {
    const schema = JSON.parse(await readFile(resolve("spec", filename), "utf8"));
    assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
    assert.equal(schema.type, "object");
    assert.ok(Array.isArray(schema.required));
    assert.ok(schema.required.length > 0);
  });
}
