function exactLocation(transcript, quote) {
  const start = transcript.indexOf(quote);
  return {
    located: start >= 0,
    start,
    end: start >= 0 ? start + quote.length : -1
  };
}

export function buildMarkerRemarksModel(item, assignment = {}) {
  const workflow = item?.workflow;
  const output = workflow?.output;
  if (!output) throw new TypeError("A completed grading output is required to build marker remarks.");

  const transcript = workflow.input?.confirmed_transcript?.text ?? "";
  const annotations = output.evidence.map((evidence, index) => ({
    number: index + 1,
    evidence_id: evidence.evidence_id,
    transcript_quote: evidence.transcript_quote,
    rubric_reference: evidence.rubric_reference,
    credit_status: evidence.credit_status,
    mark_value: evidence.mark_value,
    economic_reason: evidence.economic_reason,
    quality_flags: [...evidence.quality_flags],
    ...exactLocation(transcript, evidence.transcript_quote)
  }));

  return {
    student_ref: item.student_ref,
    source_name: item.source_name,
    question_text: workflow.input?.question_text ?? assignment.question_text ?? "",
    transcript,
    annotations,
    missed_opportunities: [...(output.feedback_zh?.missing_development ?? output.missed_opportunities ?? [])],
    priorities: (output.feedback_zh?.priorities ?? []).map((priority) => ({ ...priority })),
    provisional_mark: output.provisional_mark,
    final_mark: output.final_mark,
    max_mark: output.max_mark,
    confidence: output.confidence,
    confidence_reasons: [...output.confidence_reasons],
    manual_review_required: output.manual_review_required,
    scorer_marks: output.scorer_marks ? { ...output.scorer_marks } : null,
    teacher_review: output.teacher_review ? { ...output.teacher_review } : null
  };
}

export function buildAnnotatedTranscriptSegments(model) {
  const annotations = model.annotations
    .filter((annotation) => annotation.located)
    .sort((a, b) => a.start - b.start || a.number - b.number);
  const segments = [];
  let cursor = 0;

  for (const annotation of annotations) {
    if (annotation.start < cursor) continue;
    if (annotation.start > cursor) {
      segments.push({ type: "text", text: model.transcript.slice(cursor, annotation.start) });
    }
    segments.push({
      type: "annotation",
      text: model.transcript.slice(annotation.start, annotation.end),
      number: annotation.number,
      credit_status: annotation.credit_status,
      mark_value: annotation.mark_value
    });
    cursor = annotation.end;
  }

  if (cursor < model.transcript.length) {
    segments.push({ type: "text", text: model.transcript.slice(cursor) });
  }
  return segments;
}
