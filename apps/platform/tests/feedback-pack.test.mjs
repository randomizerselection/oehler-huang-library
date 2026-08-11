import test from "node:test";
import assert from "node:assert/strict";
import { DEMO_QUESTION, DEMO_SAMPLES } from "../src/demo-data.js";
import { buildFeedbackPackModel, feedbackPackStats } from "../src/feedback-pack.js";
import { approveAutomaticResults } from "../src/batch-workflow.js";
import { applyTeacherReview } from "../src/invariants.js";
import { runDemoWorkflow } from "../src/workflow.js";

function reviewedItem(index, decision = "approved") {
  const sample = DEMO_SAMPLES[index % DEMO_SAMPLES.length];
  const workflow = runDemoWorkflow({ sample, transcript: sample.transcript, mode: "account_upload", runId: `feedback-${index}` });
  workflow.output = applyTeacherReview(workflow.output, decision === "adjusted"
    ? { decision, teacher_mark: Math.max(0, workflow.output.provisional_mark - 1), override_reason: "Evidence supports the lower boundary." }
    : { decision }
  );
  return {
    submission_id: `SUB-${index}`,
    student_ref: `S-${index}`,
    source_name: `S-${index}.jpg`,
    status: "completed",
    workflow
  };
}

test("feedback pack includes only approved or adjusted final results", () => {
  const approved = reviewedItem(1);
  const adjusted = reviewedItem(2, "adjusted");
  const pending = reviewedItem(3);
  pending.workflow.output = runDemoWorkflow({ sample: DEMO_SAMPLES[0], transcript: DEMO_SAMPLES[0].transcript }).output;
  const rejected = reviewedItem(4);
  rejected.workflow.output = applyTeacherReview(
    runDemoWorkflow({ sample: DEMO_SAMPLES[1], transcript: DEMO_SAMPLES[1].transcript }).output,
    { decision: "rejected" }
  );
  const items = [approved, adjusted, pending, rejected];
  const slips = buildFeedbackPackModel(items, DEMO_QUESTION);
  const stats = feedbackPackStats(items, DEMO_QUESTION);
  assert.equal(slips.length, 2);
  assert.deepEqual(slips.map((slip) => slip.decision), ["approved", "adjusted"]);
  assert.equal(stats.total_students, 4);
  assert.equal(stats.individual_sheet_count, 2);
  assert.equal(stats.all_students_have_sheets, false);
  assert.deepEqual(stats.missing_students, [
    { student_ref: "S-3", reason: "等待终审" },
    { student_ref: "S-4", reason: "评分已拒绝" }
  ]);
});

test("each printable slip contains bilingual priorities and one or two targeted questions", () => {
  const slip = buildFeedbackPackModel([reviewedItem(1)], DEMO_QUESTION)[0];
  assert.equal(slip.priorities_en.length, 2);
  assert.equal(slip.priorities_zh.length, 2);
  assert.ok(slip.follow_up_questions_en.length >= 1 && slip.follow_up_questions_en.length <= 2);
  assert.equal(slip.follow_up_questions_en.length, slip.follow_up_questions_zh.length);
  assert.equal(Number.isInteger(slip.final_mark), true);
  assert.equal(slip.decision_source, "teacher");
});

test("paper estimate uses two feedback slips per A4 sheet", () => {
  const items = Array.from({ length: 5 }, (_, index) => reviewedItem(index));
  const stats = feedbackPackStats(items, DEMO_QUESTION);
  assert.equal(stats.sheets_at_two_per_page, 3);
  assert.equal(stats.sheets_at_one_per_page, 5);
  assert.equal(stats.all_students_have_sheets, true);
});

test("a fully automatic 30-student class can produce the complete print pack", () => {
  const items = Array.from({ length: 30 }, (_, index) => {
    const sample = DEMO_SAMPLES[index % DEMO_SAMPLES.length];
    const workflow = runDemoWorkflow({
      sample,
      transcript: sample.transcript,
      mode: "account_upload",
      runId: `auto-pack-${index + 1}`,
      confirmationMethod: "auto_gated"
    });
    workflow.input.student_ref = `AUTO-${String(index + 1).padStart(2, "0")}`;
    return {
      submission_id: `AUTO-SUB-${index + 1}`,
      student_ref: workflow.input.student_ref,
      source_name: `AUTO-${index + 1}.jpg`,
      status: "completed",
      workflow
    };
  });
  const finalized = approveAutomaticResults(items, "2026-08-09T10:00:00.000Z");
  const stats = feedbackPackStats(finalized, DEMO_QUESTION);
  assert.equal(stats.reviewed_students, 30);
  assert.equal(stats.individual_sheet_count, 30);
  assert.equal(new Set(stats.slips.map((slip) => slip.student_ref)).size, 30);
  assert.equal(stats.all_students_have_sheets, true);
  assert.deepEqual(stats.missing_students, []);
  assert.equal(stats.sheets_at_two_per_page, 15);
  assert.equal(stats.sheets_at_one_per_page, 30);
  assert.equal(stats.slips.every((slip) => slip.decision_source === "automatic_policy"), true);
});
