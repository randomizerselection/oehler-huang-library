import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import { DEMO_QUESTION, DEMO_SAMPLES, VERSIONS } from "../src/demo-data.js";
import { serializableBatchRecord } from "../src/batch-workflow.js";
import { runDemoWorkflow } from "../src/workflow.js";

const filenames = [
  "grading-input.schema.json",
  "parsed-rubric.schema.json",
  "evidence-record.schema.json",
  "grading-output.schema.json",
  "teacher-review.schema.json",
  "audit-record.schema.json",
  "batch-run.schema.json",
  "account.schema.json",
  "auth-session.schema.json",
  "persistence-record.schema.json",
  "stored-run.schema.json",
  "assignment.schema.json"
];
const schemas = await Promise.all(filenames.map(async (filename) => JSON.parse(await readFile(resolve("spec", filename), "utf8"))));
const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });
ajv.addSchema(schemas);

for (const sample of DEMO_SAMPLES) {
  test(`${sample.id} workflow payloads satisfy the published JSON Schemas`, () => {
    const { input, rubric, output } = runDemoWorkflow({ sample, transcript: sample.transcript });
    for (const [schemaId, value] of [
      ["https://econmark.local/spec/grading-input.schema.json", input],
      ["https://econmark.local/spec/parsed-rubric.schema.json", rubric],
      ["https://econmark.local/spec/grading-output.schema.json", output]
    ]) {
      const validate = ajv.getSchema(schemaId);
      assert.equal(validate(value), true, JSON.stringify(validate.errors, null, 2));
    }
  });
}

test("an approved run remains valid as a complete audit record", () => {
  const sample = DEMO_SAMPLES[1];
  const workflow = runDemoWorkflow({ sample, transcript: sample.transcript, mode: "account_upload" });
  workflow.output = {
    ...workflow.output,
    final_mark: workflow.output.provisional_mark,
    teacher_review: {
      decision: "approved",
      teacher_mark: workflow.output.provisional_mark,
      override_reason: null,
      reviewed_at: "2026-08-02T10:00:00.000Z",
      decision_source: "teacher"
    }
  };
  const record = { ...workflow, created_at: "2026-08-02T09:59:00.000Z" };
  const validate = ajv.getSchema("https://econmark.local/spec/audit-record.schema.json");
  assert.equal(validate(record), true, JSON.stringify(validate.errors, null, 2));
});

test("a complete 30-student batch record satisfies the batch schema", () => {
  const items = Array.from({ length: 30 }, (_, index) => {
    const sample = DEMO_SAMPLES[index % 3];
    const workflow = runDemoWorkflow({ sample, transcript: sample.transcript, mode: "account_upload", runId: `batch-run-${index + 1}` });
    workflow.input.student_ref = `S-${String(index + 1).padStart(2, "0")}`;
    return {
      submission_id: `SUB-${index + 1}`,
      student_ref: workflow.input.student_ref,
      source_name: `S-${index + 1}.jpg`,
      status: "completed",
      workflow
    };
  });
  const record = serializableBatchRecord({
    batchId: "batch-30",
    assignment: {
      assignment_id: "WH-2026-W01",
      question_text: DEMO_QUESTION.question_text,
      command_word: DEMO_QUESTION.command_word,
      max_mark: DEMO_QUESTION.max_mark,
      mark_scheme_text: DEMO_QUESTION.mark_scheme_text
    },
    items,
    createdAt: "2026-08-04T09:00:00.000Z",
    completedAt: "2026-08-04T09:10:00.000Z",
    versions: VERSIONS
  });
  const validate = ajv.getSchema("https://econmark.local/spec/batch-run.schema.json");
  assert.equal(validate(record), true, JSON.stringify(validate.errors, null, 2));
});

test("an automatically finalized run satisfies the published review and output schemas", () => {
  const sample = DEMO_SAMPLES[0];
  const workflow = runDemoWorkflow({
    sample,
    transcript: sample.transcript,
    mode: "account_upload",
    confirmationMethod: "auto_gated"
  });
  workflow.output = {
    ...workflow.output,
    final_mark: workflow.output.provisional_mark,
    teacher_review: {
      decision: "approved",
      teacher_mark: workflow.output.provisional_mark,
      override_reason: null,
      reviewed_at: "2026-08-09T10:00:00.000Z",
      decision_source: "automatic_policy",
      policy_version: "econmark-auto-approval/1.0.0"
    }
  };
  const validate = ajv.getSchema("https://econmark.local/spec/grading-output.schema.json");
  assert.equal(validate(workflow.output), true, JSON.stringify(validate.errors, null, 2));
});
