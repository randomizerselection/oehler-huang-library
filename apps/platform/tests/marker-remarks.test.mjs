import test from "node:test";
import assert from "node:assert/strict";
import { DEMO_SAMPLES } from "../src/demo-data.js";
import { buildAnnotatedTranscriptSegments, buildMarkerRemarksModel } from "../src/marker-remarks.js";
import { runDemoWorkflow } from "../src/workflow.js";

function completedItem(sample, studentRef) {
  const workflow = runDemoWorkflow({
    sample,
    transcript: sample.transcript,
    runId: `remarks-${studentRef}`,
    confirmationMethod: "auto_gated"
  });
  workflow.input.student_ref = studentRef;
  return {
    submission_id: `submission-${studentRef}`,
    student_ref: studentRef,
    source_name: `${studentRef}.svg`,
    sample_id: sample.id,
    status: "completed",
    workflow
  };
}

test("marker remarks locate every grading quotation in the student's transcript", () => {
  const model = buildMarkerRemarksModel(completedItem(DEMO_SAMPLES[1], "SYN-MARK-01"));
  assert.equal(model.student_ref, "SYN-MARK-01");
  assert.equal(model.annotations.length, DEMO_SAMPLES[1].evidence_templates.length);
  assert.equal(model.annotations.every((annotation) => annotation.located), true);
  for (const annotation of model.annotations) {
    assert.equal(model.transcript.slice(annotation.start, annotation.end), annotation.transcript_quote);
  }
  const highlighted = buildAnnotatedTranscriptSegments(model).filter((segment) => segment.type === "annotation");
  assert.equal(highlighted.length, model.annotations.length);
  assert.deepEqual(highlighted.map((segment) => segment.number), model.annotations.map((annotation) => annotation.number));
});

test("per-student marker models do not mix identity, transcript, or evidence", () => {
  const weak = buildMarkerRemarksModel(completedItem(DEMO_SAMPLES[0], "CLASS-A-01"));
  const strong = buildMarkerRemarksModel(completedItem(DEMO_SAMPLES[2], "CLASS-A-02"));
  assert.equal(weak.student_ref, "CLASS-A-01");
  assert.equal(strong.student_ref, "CLASS-A-02");
  assert.notEqual(weak.transcript, strong.transcript);
  assert.deepEqual(weak.annotations.map((annotation) => annotation.evidence_id), ["E-W-1", "E-W-2", "E-W-3"]);
  assert.equal(strong.annotations.every((annotation) => annotation.evidence_id.startsWith("E-S-")), true);
  assert.equal(weak.annotations.some((annotation) => annotation.evidence_id.startsWith("E-S-")), false);
});

test("uncredited evidence remains visible as an explanatory marker", () => {
  const model = buildMarkerRemarksModel(completedItem(DEMO_SAMPLES[0], "CLASS-A-03"));
  const rejectedClaim = model.annotations.find((annotation) => annotation.credit_status === "not_credited");
  assert.equal(rejectedClaim.transcript_quote, "This will definitely work.");
  assert.equal(rejectedClaim.mark_value, 0);
  assert.match(rejectedClaim.economic_reason, /unsupported/i);
});
