import test from "node:test";
import assert from "node:assert/strict";
import { DEMO_RUBRIC, DEMO_SAMPLES } from "../src/demo-data.js";
import { runDemoWorkflow } from "../src/workflow.js";

for (const sample of DEMO_SAMPLES) {
  test(`synthetic ${sample.id} response completes with expected provisional mark`, () => {
    const { input, rubric, output } = runDemoWorkflow({ sample, transcript: sample.transcript });
    assert.equal(input.confirmed_transcript.teacher_confirmed, true);
    assert.equal(rubric.teacher_confirmed, true);
    assert.equal(output.provisional_mark, sample.expected_mark);
    assert.equal(output.final_mark, null);
    assert.ok(output.evidence.length > 0);
    for (const item of output.evidence) assert.ok(sample.transcript.includes(item.transcript_quote));
    assert.deepEqual(
      output.feedback_en.priorities.map((item) => item.priority_id),
      output.feedback_zh.priorities.map((item) => item.priority_id)
    );
  });
}

test("middle response demonstrates isolated one-mark review and adjudication", () => {
  const sample = DEMO_SAMPLES.find((item) => item.id === "middle");
  const { output } = runDemoWorkflow({ sample, transcript: sample.transcript });
  assert.deepEqual(output.scorer_marks, { primary: 5, reviewer: 4, adjudicated: 5 });
  assert.equal(output.confidence, "medium");
  assert.equal(output.manual_review_required, false);
});

test("editing away exact evidence removes its credit", () => {
  const sample = DEMO_SAMPLES.find((item) => item.id === "weak");
  const edited = sample.transcript.replace("People will spend less so inflation may fall.", "People may react.");
  const { output } = runDemoWorkflow({ sample, transcript: edited });
  assert.equal(output.provisional_mark, 1);
  assert.equal(output.evidence.some((item) => item.evidence_id === "E-W-2"), false);
});

test("rubric confirmation is mandatory", () => {
  const sample = DEMO_SAMPLES[0];
  assert.throws(
    () => runDemoWorkflow({ sample, transcript: sample.transcript, rubricConfirmed: false }),
    (error) => error.code === "RUBRIC_UNCONFIRMED"
  );
  assert.equal(DEMO_RUBRIC.teacher_confirmed, false);
});
