import { applyAutomaticApproval, applyTeacherReview, InvariantError } from "./invariants.js";

export const DEFAULT_MAX_BATCH_SIZE = 100;
export const DEFAULT_BATCH_CONCURRENCY = 4;
export const MAX_BATCH_CONCURRENCY = 12;
export const BATCH_APPROVAL_MODES = Object.freeze({
  TEACHER_REVIEW: "teacher_review",
  FULL_AUTO: "full_auto"
});
export const AUTO_APPROVAL_POLICY_VERSION = "econmark-auto-approval/1.0.0";

export function batchRunReadiness({
  running = false,
  assignmentConfirmed = false,
  itemCount = 0,
  realUploadsNeedLogin = false
} = {}) {
  if (running) {
    return {
      ready: false,
      blockers: [{ code: "BATCH_RUNNING", message: "批量评分正在运行，请等待本批次完成。" }]
    };
  }

  const blockers = [];
  if (!assignmentConfirmed) {
    blockers.push({
      code: "ASSIGNMENT_UNCONFIRMED",
      message: "尚缺少确认：请点击上方“确认全班作业设置（必需）”。"
    });
  }
  if (!Number.isInteger(itemCount) || itemCount < 1) {
    blockers.push({
      code: "SUBMISSIONS_MISSING",
      message: "尚未添加学生作答：请载入 30 人合成班级，或登录后选择真实文件。"
    });
  }
  if (realUploadsNeedLogin) {
    blockers.push({
      code: "AUTH_REQUIRED",
      message: "真实作答需要先登录账户，合成演示不需要登录。"
    });
  }
  return { ready: blockers.length === 0, blockers };
}

export function deriveStudentRef(filename, index = 0) {
  const raw = String(filename ?? "").replace(/\.[^.]+$/, "").trim();
  const cleaned = raw
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}_-]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return cleaned || `STUDENT-${String(index + 1).padStart(2, "0")}`;
}

export function uniqueStudentRef(candidate, existingRefs = []) {
  const occupied = new Set([...existingRefs].map((value) => String(value ?? "").trim()).filter(Boolean));
  const base = String(candidate ?? "").trim() || "STUDENT";
  if (!occupied.has(base)) return base;
  let suffix = 2;
  while (occupied.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

export function nextStudentRef(existingRefs = [], prefix = "STUDENT") {
  const occupied = new Set([...existingRefs].map((value) => String(value ?? "").trim()).filter(Boolean));
  let index = 1;
  while (occupied.has(`${prefix}-${String(index).padStart(2, "0")}`)) index += 1;
  return `${prefix}-${String(index).padStart(2, "0")}`;
}

export function assertBatchReady(items, options = {}) {
  const maximum = Math.max(1, Number(options.maxBatchSize ?? DEFAULT_MAX_BATCH_SIZE));
  if (!Array.isArray(items) || items.length === 0) {
    throw new InvariantError("Add at least one student answer before running the batch.", "BATCH_EMPTY");
  }
  if (items.length > maximum) {
    throw new InvariantError(`This server permits at most ${maximum} answers in one batch.`, "BATCH_TOO_LARGE");
  }
  const refs = new Set();
  for (const item of items) {
    const ref = String(item.student_ref ?? "").trim();
    if (!ref) throw new InvariantError("Every submission needs a pseudonymous student reference.", "STUDENT_REF_MISSING");
    if (refs.has(ref)) throw new InvariantError(`Duplicate student reference: ${ref}.`, "STUDENT_REF_DUPLICATE");
    refs.add(ref);
  }
  return true;
}

export async function processBatch(items, worker, options = {}) {
  assertBatchReady(items, options);
  if (typeof worker !== "function") throw new TypeError("Batch worker must be a function.");
  const concurrency = Math.max(1, Math.min(
    Number(options.concurrency ?? DEFAULT_BATCH_CONCURRENCY),
    Number(options.maxConcurrency ?? MAX_BATCH_CONCURRENCY),
    items.length
  ));
  const onProgress = typeof options.onProgress === "function" ? options.onProgress : () => {};
  const results = new Array(items.length);
  let cursor = 0;

  async function runner() {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      const item = items[index];
      onProgress({ index, submission_id: item.submission_id, status: "processing" });
      try {
        const workflow = await worker(item, index);
        results[index] = { ...item, status: "completed", workflow };
        onProgress({ index, submission_id: item.submission_id, status: "completed", workflow });
      } catch (error) {
        results[index] = {
          ...item,
          status: "failed",
          error_code: error.code ?? "BATCH_ITEM_FAILED",
          error_message: error.message ?? String(error)
        };
        onProgress({ index, submission_id: item.submission_id, status: "failed", error });
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => runner()));
  return results;
}

export function summarizeBatch(items) {
  const completed = items.filter((item) => item.status === "completed" && item.workflow?.output);
  const failed = items.filter((item) => item.status === "failed");
  const pendingReview = completed.filter((item) => !item.workflow.output.teacher_review);
  const manualReview = completed.filter((item) => item.workflow.output.manual_review_required);
  const approved = completed.filter((item) => ["approved", "adjusted"].includes(item.workflow.output.teacher_review?.decision));
  const automaticallyApproved = approved.filter((item) => item.workflow.output.teacher_review?.decision_source === "automatic_policy");
  const marks = completed.map((item) => item.workflow.output.provisional_mark);
  return {
    total: items.length,
    completed: completed.length,
    failed: failed.length,
    pending_review: pendingReview.length,
    manual_review_required: manualReview.length,
    approved: approved.length,
    automatically_approved: automaticallyApproved.length,
    high_confidence_eligible: completed.filter((item) => (
      item.workflow.output.confidence === "high"
      && !item.workflow.output.manual_review_required
      && !item.workflow.output.teacher_review
    )).length,
    provisional_average: marks.length ? marks.reduce((sum, mark) => sum + mark, 0) / marks.length : null
  };
}

export function approveEligibleResults(items, reviewedAt = new Date().toISOString()) {
  return items.map((item) => {
    const output = item.workflow?.output;
    if (
      item.status !== "completed"
      || !output
      || output.teacher_review
      || output.confidence !== "high"
      || output.manual_review_required
    ) return item;
    return {
      ...item,
      workflow: {
        ...item.workflow,
        output: applyTeacherReview(output, { decision: "approved", reviewed_at: reviewedAt })
      }
    };
  });
}

export function automaticApprovalEligibility(item) {
  const workflow = item?.workflow;
  const output = workflow?.output;
  const transcript = workflow?.input?.confirmed_transcript;
  const rubric = workflow?.rubric;
  if (item?.status !== "completed" || !output || output.teacher_review || output.final_mark !== null) return false;
  if (output.manual_review_required || output.confidence === "low") return false;
  const transcriptAccepted = (
    (transcript?.confirmation_method === "teacher" && transcript.teacher_confirmed === true)
    || (
      transcript?.confirmation_method === "auto_gated"
      && transcript.teacher_confirmed === false
      && transcript.transcription_confidence >= 0.97
      && transcript.uncertain_spans?.length === 0
    )
  );
  if (!transcriptAccepted || rubric?.teacher_confirmed !== true) return false;
  if (!transcript.text?.trim()) return false;
  if (workflow.input?.answer_images?.some((image) => image.validation_flags?.length)) return false;
  const primary = output.scorer_marks?.primary;
  const reviewer = output.scorer_marks?.reviewer;
  if (!Number.isInteger(primary) || !Number.isInteger(reviewer)) return false;
  const difference = Math.abs(primary - reviewer);
  if (difference >= 2 || (difference === 1 && !Number.isInteger(output.scorer_marks.adjudicated))) return false;
  return true;
}

export function approveAutomaticResults(items, approvedAt = new Date().toISOString()) {
  return items.map((item) => {
    if (!automaticApprovalEligibility(item)) return item;
    return {
      ...item,
      workflow: {
        ...item.workflow,
        output: applyAutomaticApproval(item.workflow.output, {
          reviewed_at: approvedAt,
          policy_version: AUTO_APPROVAL_POLICY_VERSION
        })
      }
    };
  });
}

export function serializableBatchRecord({ batchId, assignment, items, createdAt, completedAt, versions, approvalMode = BATCH_APPROVAL_MODES.TEACHER_REVIEW }) {
  return {
    batch_id: batchId,
    approval_mode: approvalMode,
    assignment: {
      assignment_id: assignment.assignment_id,
      question_text: assignment.question_text,
      command_word: assignment.command_word,
      max_mark: assignment.max_mark,
      mark_scheme_text: assignment.mark_scheme_text,
      teacher_confirmed: true
    },
    submissions: items.map((item) => ({
      submission_id: item.submission_id,
      student_ref: item.student_ref,
      source_name: item.source_name,
      status: item.status,
      ...(item.workflow?.output ? { output: item.workflow.output } : {}),
      ...(item.error_code ? { error_code: item.error_code, error_message: item.error_message } : {})
    })),
    status: items.some((item) => item.status === "failed")
      ? "partial_failure"
      : items.every((item) => item.workflow?.output?.teacher_review)
        ? "completed"
        : "review",
    created_at: createdAt,
    completed_at: completedAt ?? null,
    schema_version: versions.schema_version,
    workflow_version: versions.workflow_version
  };
}
