// Copy individual functions into Coze code nodes. Keep this file versioned with spec/invariants.md.

export function scopeGate({ command_word, max_mark }) {
  const supported = (command_word === "Analyse" && Number(max_mark) === 6)
    || (command_word === "Discuss" && Number(max_mark) === 8);
  return {
    accepted: supported,
    reason_code: supported ? "OK" : "UNSUPPORTED_SCOPE",
    message_en: supported ? "Scope accepted." : "Version 1 supports only Analyse [6] and Discuss [8].",
    message_zh: supported ? "题型符合范围。" : "第一版仅支持 Analyse [6] 和 Discuss [8]。"
  };
}

export function evidenceInvariant({ confirmed_transcript, evidence }) {
  const failures = [];
  const seen = new Set();
  for (const item of evidence ?? []) {
    const quote = String(item.transcript_quote ?? "").trim();
    if (!quote || !confirmed_transcript.includes(quote)) failures.push(`${item.evidence_id}: EVIDENCE_NOT_VERBATIM`);
    if (!String(item.rubric_reference ?? "").trim()) failures.push(`${item.evidence_id}: RUBRIC_REFERENCE_MISSING`);
    const key = `${quote}|${item.rubric_reference}`;
    if (item.credit_status !== "not_credited" && seen.has(key)) failures.push(`${item.evidence_id}: DUPLICATE_CREDIT`);
    if (item.credit_status !== "not_credited") seen.add(key);
  }
  return { accepted: failures.length === 0, failures };
}

export function disagreementRouter({ primary_mark, reviewer_mark, primary_level, reviewer_level }) {
  const difference = Math.abs(Number(primary_mark) - Number(reviewer_mark));
  const wholeLevelDifference = primary_level !== reviewer_level;
  return {
    route: difference >= 2 || wholeLevelDifference ? "manual_range" : difference === 1 ? "adjudicate" : "agree",
    difference,
    whole_level_difference: wholeLevelDifference,
    manual_review_required: difference >= 2 || wholeLevelDifference
  };
}

export function bilingualInvariant({ feedback_en, feedback_zh }) {
  const en = (feedback_en?.priorities ?? []).map((item) => item.priority_id);
  const zh = (feedback_zh?.priorities ?? []).map((item) => item.priority_id);
  const accepted = en.length === 2 && zh.length === 2 && en.join("|") === zh.join("|");
  return { accepted, reason_code: accepted ? "OK" : "BILINGUAL_PRIORITY_MISMATCH" };
}

export function provisionalFinalMark() {
  return { final_mark: null, final_mark_status: "pending_teacher_review" };
}
