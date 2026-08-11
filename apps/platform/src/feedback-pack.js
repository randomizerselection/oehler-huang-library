export function buildFeedbackPackModel(items, assignment) {
  return items
    .filter((item) => {
      const decision = item.workflow?.output?.teacher_review?.decision;
      return item.status === "completed" && (decision === "approved" || decision === "adjusted");
    })
    .map((item) => {
      const output = item.workflow.output;
      return {
        student_ref: item.student_ref,
        source_name: item.source_name,
        question_text: item.workflow.input?.question_text ?? assignment.question_text,
        final_mark: output.final_mark,
        max_mark: output.max_mark,
        level: output.level,
        strengths_en: output.feedback_en.strengths.slice(0, 2),
        strengths_zh: output.feedback_zh.strengths.slice(0, 2),
        priorities_en: output.feedback_en.priorities.map((item) => item.text),
        priorities_zh: output.feedback_zh.priorities.map((item) => item.text),
        follow_up_questions_en: output.follow_up_questions_en.map((item) => item.text),
        follow_up_questions_zh: output.follow_up_questions_zh.map((item) => item.text),
        reviewed_at: output.teacher_review.reviewed_at,
        decision: output.teacher_review.decision,
        decision_source: output.teacher_review.decision_source
      };
    });
}

export function feedbackPackStats(items, assignment) {
  const slips = buildFeedbackPackModel(items, assignment);
  const printableRefs = new Set(slips.map((slip) => slip.student_ref));
  const missing_students = items
    .filter((item) => !printableRefs.has(item.student_ref))
    .map((item) => {
      const review = item.workflow?.output?.teacher_review;
      let reason = "等待形成最终成绩";
      if (item.status === "failed") reason = "评分失败";
      else if (!item.workflow?.output) reason = "评分尚未完成";
      else if (review?.decision === "rejected") reason = "评分已拒绝";
      else if (!review) reason = "等待终审";
      return { student_ref: item.student_ref, reason };
    });
  return {
    total_students: items.length,
    reviewed_students: slips.length,
    individual_sheet_count: slips.length,
    all_students_have_sheets: items.length > 0 && slips.length === items.length,
    missing_students,
    sheets_at_two_per_page: Math.ceil(slips.length / 2),
    sheets_at_one_per_page: slips.length,
    slips
  };
}
