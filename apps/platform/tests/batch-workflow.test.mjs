import test from "node:test";
import assert from "node:assert/strict";
import {
  approveAutomaticResults,
  approveEligibleResults,
  assertBatchReady,
  batchRunReadiness,
  deriveStudentRef,
  nextStudentRef,
  processBatch,
  summarizeBatch,
  uniqueStudentRef
} from "../src/batch-workflow.js";

function makeItems(count) {
  return Array.from({ length: count }, (_, index) => ({
    submission_id: `SUB-${index + 1}`,
    student_ref: `S-${index + 1}`,
    source_name: `S-${index + 1}.jpg`,
    status: "queued"
  }));
}

test("student references are safely derived from filenames", () => {
  assert.equal(deriveStudentRef("IC1 01 Zhang.jpg"), "IC1-01-Zhang");
  assert.equal(deriveStudentRef(".jpg", 4), "STUDENT-05");
});

test("phone scans and appended files receive collision-free references", () => {
  assert.equal(nextStudentRef(["STUDENT-01", "STUDENT-03"]), "STUDENT-02");
  assert.equal(nextStudentRef(["SCAN-01", "SCAN-02"], "SCAN"), "SCAN-03");
  assert.equal(uniqueStudentRef("IC1-01-Zhang", ["IC1-01-Zhang"]), "IC1-01-Zhang-2");
  assert.equal(uniqueStudentRef("IC1-01-Zhang", ["IC1-01-Zhang", "IC1-01-Zhang-2"]), "IC1-01-Zhang-3");
});

test("batch readiness visibly reports every missing prerequisite", () => {
  const readiness = batchRunReadiness({ assignmentConfirmed: false, itemCount: 0 });
  assert.equal(readiness.ready, false);
  assert.deepEqual(readiness.blockers.map((blocker) => blocker.code), ["ASSIGNMENT_UNCONFIRMED", "SUBMISSIONS_MISSING"]);
  assert.match(readiness.blockers[0].message, /尚缺少确认/);
  assert.match(readiness.blockers[1].message, /尚未添加学生作答/);
});

test("batch readiness identifies authentication and running states", () => {
  const authentication = batchRunReadiness({ assignmentConfirmed: true, itemCount: 30, realUploadsNeedLogin: true });
  assert.deepEqual(authentication.blockers.map((blocker) => blocker.code), ["AUTH_REQUIRED"]);
  const running = batchRunReadiness({ running: true, assignmentConfirmed: true, itemCount: 30 });
  assert.deepEqual(running.blockers.map((blocker) => blocker.code), ["BATCH_RUNNING"]);
});

test("batch readiness enables the action only when all prerequisites are complete", () => {
  const readiness = batchRunReadiness({ assignmentConfirmed: true, itemCount: 30, realUploadsNeedLogin: false });
  assert.equal(readiness.ready, true);
  assert.deepEqual(readiness.blockers, []);
});

test("batch contract follows the server-configured capacity and rejects duplicate references", () => {
  assert.doesNotThrow(() => assertBatchReady(makeItems(75), { maxBatchSize: 75 }));
  assert.throws(() => assertBatchReady(makeItems(76), { maxBatchSize: 75 }), (error) => error.code === "BATCH_TOO_LARGE");
  const duplicate = makeItems(2);
  duplicate[1].student_ref = duplicate[0].student_ref;
  assert.throws(() => assertBatchReady(duplicate), (error) => error.code === "STUDENT_REF_DUPLICATE");
});

test("batch processing follows configured concurrency and preserves order", async () => {
  const items = makeItems(30);
  let active = 0;
  let maximumActive = 0;
  const results = await processBatch(items, async (item, index) => {
    active += 1;
    maximumActive = Math.max(maximumActive, active);
    await new Promise((resolve) => setTimeout(resolve, index % 3));
    active -= 1;
    return { output: { provisional_mark: index % 9 } };
  }, { concurrency: 8, maxConcurrency: 8 });
  assert.equal(maximumActive, 8);
  assert.equal(results.length, 30);
  assert.equal(results[29].student_ref, "S-30");
  assert.equal(results.every((item) => item.status === "completed"), true);
});

test("one failed answer does not abort the remaining class", async () => {
  const results = await processBatch(makeItems(3), async (_item, index) => {
    if (index === 1) throw new Error("Unreadable page");
    return { output: { provisional_mark: index } };
  });
  assert.deepEqual(results.map((item) => item.status), ["completed", "failed", "completed"]);
});

test("only high-confidence non-manual results receive batch approval", () => {
  const base = {
    run_id: "r1",
    provisional_mark: 5,
    max_mark: 8,
    final_mark: null,
    confidence: "high",
    manual_review_required: false
  };
  const items = [
    { ...makeItems(1)[0], status: "completed", workflow: { output: base } },
    { ...makeItems(2)[1], status: "completed", workflow: { output: { ...base, run_id: "r2", confidence: "medium" } } },
    { ...makeItems(3)[2], status: "completed", workflow: { output: { ...base, run_id: "r3", manual_review_required: true } } }
  ];
  const approved = approveEligibleResults(items, "2026-08-04T10:00:00.000Z");
  assert.equal(approved[0].workflow.output.final_mark, 5);
  assert.equal(approved[0].workflow.output.teacher_review.decision_source, "teacher");
  assert.equal(approved[1].workflow.output.final_mark, null);
  assert.equal(approved[2].workflow.output.final_mark, null);
  assert.equal(summarizeBatch(approved).approved, 1);
});

function automaticCandidate(index, outputOverrides = {}, transcriptOverrides = {}) {
  return {
    ...makeItems(index + 1)[index],
    status: "completed",
    workflow: {
      input: {
        answer_images: [{ validation_flags: [] }],
        confirmed_transcript: {
          text: "Higher rates reduce borrowing and aggregate demand.",
          teacher_confirmed: false,
          confirmation_method: "auto_gated",
          transcription_confidence: 0.98,
          uncertain_spans: [],
          ...transcriptOverrides
        }
      },
      rubric: { teacher_confirmed: true },
      output: {
        run_id: `auto-${index + 1}`,
        provisional_mark: 5,
        max_mark: 8,
        final_mark: null,
        confidence: "high",
        manual_review_required: false,
        scorer_marks: { primary: 5, reviewer: 5, adjudicated: null },
        ...outputOverrides
      }
    }
  };
}

test("full-auto mode finalizes safe high and adjudicated medium results", () => {
  const items = [
    automaticCandidate(0),
    automaticCandidate(1, {
      confidence: "medium",
      scorer_marks: { primary: 5, reviewer: 4, adjudicated: 5 }
    }),
    automaticCandidate(2, { confidence: "low", manual_review_required: true }),
    automaticCandidate(3, {}, { transcription_confidence: 0.96 }),
    automaticCandidate(4, { scorer_marks: undefined })
  ];
  const approved = approveAutomaticResults(items, "2026-08-09T10:00:00.000Z");
  assert.deepEqual(approved.map((item) => item.workflow.output.final_mark), [5, 5, null, null, null]);
  assert.equal(approved[0].workflow.output.teacher_review.decision_source, "automatic_policy");
  assert.equal(approved[0].workflow.output.teacher_review.policy_version, "econmark-auto-approval/1.0.0");
  assert.equal(summarizeBatch(approved).automatically_approved, 2);
  assert.equal(summarizeBatch(approved).pending_review, 3);
});

test("a complete safe class of 30 can be finalized without per-student clicks", () => {
  const approved = approveAutomaticResults(
    Array.from({ length: 30 }, (_, index) => automaticCandidate(index)),
    "2026-08-09T10:00:00.000Z"
  );
  const summary = summarizeBatch(approved);
  assert.equal(summary.completed, 30);
  assert.equal(summary.automatically_approved, 30);
  assert.equal(summary.pending_review, 0);
  assert.equal(approved.every((item) => Number.isInteger(item.workflow.output.final_mark)), true);
});
