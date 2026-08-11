const SUPPORTED = Object.freeze({ Analyse: 6, Discuss: 8 });

export class InvariantError extends Error {
  constructor(message, code = "INVARIANT_FAILED") {
    super(message);
    this.name = "InvariantError";
    this.code = code;
  }
}

export function assertSupportedQuestion(commandWord, maxMark) {
  if (!(commandWord in SUPPORTED) || SUPPORTED[commandWord] !== Number(maxMark)) {
    throw new InvariantError(
      `Version 1 supports only Analyse [6] and Discuss [8]; received ${commandWord} [${maxMark}].`,
      "UNSUPPORTED_SCOPE"
    );
  }
}

export function assertReadyForGrading(input, rubric) {
  assertSupportedQuestion(input.command_word, input.max_mark);
  const transcript = input.confirmed_transcript;
  const teacherConfirmed = transcript?.teacher_confirmed && transcript.confirmation_method === "teacher";
  const safelyAutoGated = transcript?.confirmation_method === "auto_gated"
    && transcript.teacher_confirmed === false
    && transcript.transcription_confidence >= 0.97
    && transcript.uncertain_spans?.length === 0;
  if (!teacherConfirmed && !safelyAutoGated) {
    throw new InvariantError("The transcript must be teacher-confirmed or pass the explicit automatic confidence gate.", "TRANSCRIPT_UNCONFIRMED");
  }
  if (!rubric?.teacher_confirmed) {
    throw new InvariantError("Teacher confirmation of the parsed rubric is required before grading.", "RUBRIC_UNCONFIRMED");
  }
  if (!transcript.text.trim()) {
    throw new InvariantError("The confirmed transcript is empty.", "TRANSCRIPT_EMPTY");
  }
}

export function assertEvidenceLocked(output, confirmedTranscript) {
  const seen = new Set();
  for (const item of output.evidence ?? []) {
    const quote = item.transcript_quote?.trim();
    if (!quote || !confirmedTranscript.includes(quote)) {
      throw new InvariantError(`Evidence ${item.evidence_id} is not an exact excerpt of the confirmed transcript.`, "EVIDENCE_NOT_VERBATIM");
    }
    if (!item.rubric_reference?.trim()) {
      throw new InvariantError(`Evidence ${item.evidence_id} has no rubric reference.`, "RUBRIC_REFERENCE_MISSING");
    }
    if (item.credit_status !== "not_credited" && item.mark_value <= 0) {
      throw new InvariantError(`Credited evidence ${item.evidence_id} has no positive mark value.`, "CREDIT_WITHOUT_VALUE");
    }
    const key = `${quote}\u241f${item.rubric_reference}`;
    if (seen.has(key) && item.credit_status !== "not_credited") {
      throw new InvariantError(`Evidence is double-credited: ${item.evidence_id}.`, "DUPLICATE_CREDIT");
    }
    if (item.credit_status !== "not_credited") seen.add(key);
  }
}

export function assertBilingualParity(output) {
  const english = output.feedback_en?.priorities ?? [];
  const chinese = output.feedback_zh?.priorities ?? [];
  if (english.length !== 2 || chinese.length !== 2) {
    throw new InvariantError("English and Chinese feedback must each contain exactly two priorities.", "PRIORITY_COUNT");
  }
  const enIds = english.map((item) => item.priority_id).join("|");
  const zhIds = chinese.map((item) => item.priority_id).join("|");
  if (enIds !== zhIds) {
    throw new InvariantError("Bilingual priority identifiers or order do not match.", "BILINGUAL_MISMATCH");
  }
  const questionsEn = output.follow_up_questions_en ?? [];
  const questionsZh = output.follow_up_questions_zh ?? [];
  if (questionsEn.length < 1 || questionsEn.length > 2 || questionsZh.length !== questionsEn.length) {
    throw new InvariantError("Bilingual follow-up questions must contain the same one or two items.", "FOLLOW_UP_COUNT");
  }
  const enQuestionIds = questionsEn.map((item) => `${item.question_id}:${item.target_priority_id}`).join("|");
  const zhQuestionIds = questionsZh.map((item) => `${item.question_id}:${item.target_priority_id}`).join("|");
  if (enQuestionIds !== zhQuestionIds) {
    throw new InvariantError("Bilingual follow-up question identifiers or targets do not match.", "FOLLOW_UP_MISMATCH");
  }
}

export function assertGradingOutput(output, confirmedTranscript) {
  if (!Number.isInteger(output.provisional_mark) || output.provisional_mark < 0 || output.provisional_mark > output.max_mark) {
    throw new InvariantError("The provisional mark is outside the permitted integer range.", "MARK_OUT_OF_RANGE");
  }
  if (output.final_mark !== null) {
    throw new InvariantError("Final mark must remain null before teacher review.", "PREMATURE_FINAL_MARK");
  }
  assertEvidenceLocked(output, confirmedTranscript);
  assertBilingualParity(output);

  const primary = output.scorer_marks?.primary;
  const reviewer = output.scorer_marks?.reviewer;
  if (Number.isInteger(primary) && Number.isInteger(reviewer)) {
    const difference = Math.abs(primary - reviewer);
    if (difference >= 2 && !output.manual_review_required) {
      throw new InvariantError("A scorer difference of two or more must require manual review.", "SCORER_DISAGREEMENT");
    }
    if (difference === 1 && output.scorer_marks.adjudicated === null && !output.manual_review_required) {
      throw new InvariantError("A one-mark scorer difference requires adjudication.", "ADJUDICATION_MISSING");
    }
  }
  return true;
}

export function applyTeacherReview(output, review) {
  const reviewedAt = review.reviewed_at ?? new Date().toISOString();
  if (review.decision === "approved") {
    return {
      ...output,
      final_mark: output.provisional_mark,
      teacher_review: {
        decision: "approved",
        teacher_mark: output.provisional_mark,
        override_reason: null,
        reviewed_at: reviewedAt,
        decision_source: "teacher"
      }
    };
  }
  if (review.decision === "adjusted") {
    const mark = Number(review.teacher_mark);
    const reason = String(review.override_reason ?? "").trim();
    if (!Number.isInteger(mark) || mark < 0 || mark > output.max_mark) {
      throw new InvariantError("Adjusted mark must be an integer within the question range.", "ADJUSTED_MARK_INVALID");
    }
    if (reason.length < 5) {
      throw new InvariantError("An adjusted mark requires a meaningful override reason.", "OVERRIDE_REASON_REQUIRED");
    }
    return {
      ...output,
      final_mark: mark,
      teacher_review: {
        decision: "adjusted",
        teacher_mark: mark,
        override_reason: reason,
        reviewed_at: reviewedAt,
        decision_source: "teacher"
      }
    };
  }
  if (review.decision === "rejected") {
    return {
      ...output,
      final_mark: null,
      teacher_review: {
        decision: "rejected",
        teacher_mark: null,
        override_reason: String(review.override_reason ?? "").trim() || null,
        reviewed_at: reviewedAt,
        decision_source: "teacher"
      }
    };
  }
  throw new InvariantError("Teacher decision must be approved, adjusted, or rejected.", "DECISION_INVALID");
}

export function applyAutomaticApproval(output, options = {}) {
  if (output.teacher_review || output.final_mark !== null) {
    throw new InvariantError("Only an unreviewed provisional result can be approved automatically.", "AUTO_APPROVAL_NOT_PROVISIONAL");
  }
  if (output.manual_review_required || output.confidence === "low") {
    throw new InvariantError("A low-confidence or mandatory-review result cannot be approved automatically.", "AUTO_APPROVAL_REVIEW_REQUIRED");
  }
  const primary = output.scorer_marks?.primary;
  const reviewer = output.scorer_marks?.reviewer;
  if (!Number.isInteger(primary) || !Number.isInteger(reviewer)) {
    throw new InvariantError("Automatic approval requires a recorded primary and independent reviewer mark.", "AUTO_APPROVAL_SCORER_MISSING");
  }
  const difference = Math.abs(primary - reviewer);
  if (difference >= 2 || (difference === 1 && !Number.isInteger(output.scorer_marks.adjudicated))) {
    throw new InvariantError("Automatic approval requires scorer agreement or completed one-mark adjudication.", "AUTO_APPROVAL_SCORER_UNRESOLVED");
  }
  const reviewedAt = options.reviewed_at ?? new Date().toISOString();
  return {
    ...output,
    final_mark: output.provisional_mark,
    teacher_review: {
      decision: "approved",
      teacher_mark: output.provisional_mark,
      override_reason: null,
      reviewed_at: reviewedAt,
      decision_source: "automatic_policy",
      policy_version: options.policy_version ?? "econmark-auto-approval/1.0.0"
    }
  };
}
