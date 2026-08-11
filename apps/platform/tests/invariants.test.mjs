import test from "node:test";
import assert from "node:assert/strict";
import {
  applyAutomaticApproval,
  applyTeacherReview,
  assertBilingualParity,
  assertEvidenceLocked,
  assertSupportedQuestion
} from "../src/invariants.js";

test("only Analyse 6 and Discuss 8 are supported", () => {
  assert.doesNotThrow(() => assertSupportedQuestion("Analyse", 6));
  assert.doesNotThrow(() => assertSupportedQuestion("Discuss", 8));
  assert.throws(() => assertSupportedQuestion("Discuss", 6), (error) => error.code === "UNSUPPORTED_SCOPE");
  assert.throws(() => assertSupportedQuestion("Evaluate", 8), (error) => error.code === "UNSUPPORTED_SCOPE");
});

test("evidence must be verbatim and not double-credited", () => {
  const base = {
    evidence_id: "E1",
    transcript_quote: "aggregate demand falls",
    rubric_reference: "C1",
    credit_status: "credited",
    economic_reason: "Valid chain.",
    mark_value: 1,
    quality_flags: []
  };
  assert.doesNotThrow(() => assertEvidenceLocked({ evidence: [base] }, "Therefore aggregate demand falls and inflation slows."));
  assert.throws(
    () => assertEvidenceLocked({ evidence: [{ ...base, transcript_quote: "invented words" }] }, "aggregate demand falls"),
    (error) => error.code === "EVIDENCE_NOT_VERBATIM"
  );
  assert.throws(
    () => assertEvidenceLocked({ evidence: [base, { ...base, evidence_id: "E2" }] }, "aggregate demand falls"),
    (error) => error.code === "DUPLICATE_CREDIT"
  );
});

test("bilingual priorities use the same two stable identifiers", () => {
  const valid = {
    feedback_en: { priorities: [{ priority_id: "P1" }, { priority_id: "P2" }] },
    feedback_zh: { priorities: [{ priority_id: "P1" }, { priority_id: "P2" }] },
    follow_up_questions_en: [{ question_id: "FQ1", target_priority_id: "P1" }],
    follow_up_questions_zh: [{ question_id: "FQ1", target_priority_id: "P1" }]
  };
  assert.doesNotThrow(() => assertBilingualParity(valid));
  assert.throws(
    () => assertBilingualParity({ ...valid, feedback_zh: { priorities: [{ priority_id: "P2" }, { priority_id: "P1" }] } }),
    (error) => error.code === "BILINGUAL_MISMATCH"
  );
  assert.throws(
    () => assertBilingualParity({ ...valid, follow_up_questions_zh: [{ question_id: "FQ2", target_priority_id: "P1" }] }),
    (error) => error.code === "FOLLOW_UP_MISMATCH"
  );
});

test("teacher approval creates the first final mark", () => {
  const provisional = { provisional_mark: 5, max_mark: 8, final_mark: null };
  const approved = applyTeacherReview(provisional, { decision: "approved", reviewed_at: "2026-08-02T10:00:00.000Z" });
  assert.equal(approved.final_mark, 5);
  assert.equal(approved.teacher_review.teacher_mark, 5);
  assert.equal(approved.teacher_review.decision_source, "teacher");
  const adjusted = applyTeacherReview(provisional, { decision: "adjusted", teacher_mark: 4, override_reason: "Judgment is not supported." });
  assert.equal(adjusted.final_mark, 4);
  assert.throws(
    () => applyTeacherReview(provisional, { decision: "adjusted", teacher_mark: 4, override_reason: "No" }),
    (error) => error.code === "OVERRIDE_REASON_REQUIRED"
  );
  const rejected = applyTeacherReview(provisional, { decision: "rejected" });
  assert.equal(rejected.final_mark, null);
});

test("automatic approval records its policy source and rejects unresolved risk", () => {
  const provisional = {
    provisional_mark: 5,
    max_mark: 8,
    final_mark: null,
    confidence: "medium",
    manual_review_required: false,
    scorer_marks: { primary: 5, reviewer: 4, adjudicated: 5 }
  };
  const approved = applyAutomaticApproval(provisional, { reviewed_at: "2026-08-09T10:00:00.000Z" });
  assert.equal(approved.final_mark, 5);
  assert.equal(approved.teacher_review.decision_source, "automatic_policy");
  assert.equal(approved.teacher_review.policy_version, "econmark-auto-approval/1.0.0");
  assert.throws(
    () => applyAutomaticApproval({ ...provisional, confidence: "low", manual_review_required: true }),
    (error) => error.code === "AUTO_APPROVAL_REVIEW_REQUIRED"
  );
});
