import { DEMO_QUESTION, DEMO_RUBRIC, VERSIONS } from "./demo-data.js";
import { assertGradingOutput, assertReadyForGrading } from "./invariants.js";

function levelFor(mark) {
  if (mark === 0) return "L0";
  if (mark <= 2) return "L1";
  if (mark <= 5) return "L2";
  return "L3";
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function presentEvidence(sample, transcript) {
  return sample.evidence_templates
    .filter((item) => transcript.includes(item.transcript_quote))
    .map(clone);
}

function createFeedback(mark, evidence) {
  const creditedRefs = new Set(evidence.filter((item) => item.credit_status !== "not_credited").map((item) => item.rubric_reference));
  const hasLimitation = creditedRefs.has("C4_LIMITATION");
  const hasJudgment = creditedRefs.has("C5_JUDGMENT");
  const hasExchange = creditedRefs.has("C3_EXCHANGE_RATE");

  const strengthsEn = [];
  const strengthsZh = [];
  if (creditedRefs.has("C1_BORROWING_AD")) {
    strengthsEn.push("You identify a relevant route from higher borrowing costs to lower inflation.");
    strengthsZh.push("你识别了从借贷成本上升到通货膨胀下降的一条相关传导路径。");
  }
  if (hasLimitation) {
    strengthsEn.push("You consider a relevant limit to the policy rather than assuming it always works.");
    strengthsZh.push("你考虑了政策的相关局限，而不是假定政策总是有效。");
  }
  if (mark >= 6) {
    strengthsEn.push("Your analysis is developed across more than one channel and supports the judgment.");
    strengthsZh.push("你的分析发展了不止一条传导机制，并能支撑最终判断。");
  }

  const missingEn = [];
  const missingZh = [];
  if (!hasExchange) {
    missingEn.push("A second developed channel, such as exchange-rate effects, is absent.");
    missingZh.push("尚缺少第二条充分展开的传导机制，例如汇率影响。");
  }
  if (!hasLimitation) {
    missingEn.push("The response does not develop a relevant limitation or counterargument.");
    missingZh.push("作答没有充分展开相关局限或反方论点。");
  }
  if (!hasJudgment) {
    missingEn.push("The conclusion is not conditional on the cause or circumstances of inflation.");
    missingZh.push("结论没有结合通胀成因或具体条件作出有条件判断。");
  }
  if (missingEn.length === 0) {
    missingEn.push("The answer could compare the relative importance and timing of its channels more explicitly.");
    missingZh.push("作答还可以更明确地比较不同传导机制的相对重要性与时间差异。");
  }

  const priority1 = hasLimitation ? "P_COMPARE" : "P_BALANCE";
  const priority2 = hasJudgment ? "P_PRECISION" : "P_JUDGMENT";

  let question1;
  let question1Zh;
  if (!creditedRefs.has("C1_BORROWING_AD")) {
    question1 = "Complete this chain: higher interest rates → borrowing and spending → aggregate demand → inflation. Explain every arrow.";
    question1Zh = "补全并解释这条因果链中的每一个箭头：利率上升 → 借贷与支出 → 总需求 → 通货膨胀。";
  } else if (!hasLimitation) {
    question1 = "Why might higher interest rates be less effective when inflation is caused by rising production costs?";
    question1Zh = "当通胀由生产成本上升造成时，为什么提高利率可能效果较弱？";
  } else if (!hasExchange) {
    question1 = "How could higher interest rates affect the exchange rate, imported production costs, and inflation?";
    question1Zh = "利率上升可能如何影响汇率、进口生产成本和通货膨胀？";
  } else {
    question1 = "Which transmission channel in your answer is likely to reduce inflation most strongly, and under what conditions?";
    question1Zh = "你答案中的哪条传导机制最可能有力地降低通胀？需要哪些条件？";
  }

  const question2 = hasJudgment
    ? "How would a long policy time lag change your final judgment about the effectiveness of higher interest rates?"
    : "Write a one-sentence judgment explaining when higher interest rates will be most and least effective at reducing inflation.";
  const question2Zh = hasJudgment
    ? "较长的政策时滞会如何改变你对提高利率有效性的最终判断？"
    : "用一句话判断：在什么情况下提高利率对降低通胀最有效，又在什么情况下最无效？";

  return {
    feedback_en: {
      strengths: strengthsEn.length ? strengthsEn : ["You make a relevant point about interest rates and inflation."],
      missing_development: missingEn,
      priorities: [
        {
          priority_id: priority1,
          text: hasLimitation
            ? "Compare the conditions under which each channel is likely to be strongest."
            : "Develop one counterargument, such as cost-push inflation or a policy time lag."
        },
        {
          priority_id: priority2,
          text: hasJudgment
            ? "Make the judgment more precise by weighing cause, policy size, and time."
            : "End with a supported judgment that depends on the cause of inflation."
        }
      ]
    },
    feedback_zh: {
      strengths: strengthsZh.length ? strengthsZh : ["你提出了一个与利率和通货膨胀相关的观点。"],
      missing_development: missingZh,
      priorities: [
        {
          priority_id: priority1,
          text: hasLimitation
            ? "比较在什么条件下每条传导机制最可能发挥较强作用。"
            : "展开一个反方论点，例如成本推动型通胀或政策时滞。"
        },
        {
          priority_id: priority2,
          text: hasJudgment
            ? "从通胀成因、政策幅度和时间三个方面让判断更精确。"
            : "以通胀成因为条件，给出有分析支撑的最终判断。"
        }
      ]
    },
    improved_outline_en: [
      "Mechanism: higher rates → borrowing/spending or investment → aggregate demand → inflation.",
      "Alternative or limitation: identify when the mechanism may be weak or offset.",
      "Judgment: decide conditionally using the cause of inflation, policy size, and time lag."
    ],
    improved_outline_zh: [
      "机制：利率上升 → 借贷、消费或投资变化 → 总需求变化 → 通胀变化。",
      "反方或局限：说明在何种情况下该机制较弱或可能被抵消。",
      "判断：结合通胀成因、政策幅度和时滞作出有条件结论。"
    ],
    follow_up_questions_en: [
      { question_id: "FQ1", target_priority_id: priority1, text: question1 },
      { question_id: "FQ2", target_priority_id: priority2, text: question2 }
    ],
    follow_up_questions_zh: [
      { question_id: "FQ1", target_priority_id: priority1, text: question1Zh },
      { question_id: "FQ2", target_priority_id: priority2, text: question2Zh }
    ]
  };
}

export function buildDemoInput(sample, transcript, options = {}) {
  const confirmationMethod = options.confirmationMethod ?? "teacher";
  return {
    run_id: options.runId ?? `run-${crypto.randomUUID()}`,
    mode: options.mode ?? "public_sample",
    student_ref: sample.student_ref,
    question_text: DEMO_QUESTION.question_text,
    command_word: DEMO_QUESTION.command_word,
    max_mark: DEMO_QUESTION.max_mark,
    mark_scheme_text: DEMO_QUESTION.mark_scheme_text,
    mark_scheme_sha256: "abb73564dbd95d788e08b7be455f94121e2fb11eeaf4aa89316319c6f223c7f8",
    answer_images: [
      {
        image_id: `img-${sample.id}-1`,
        name: `${sample.id}.svg`,
        mime_type: "image/svg+xml",
        page: 1,
        validation_flags: []
      }
    ],
    confirmed_transcript: {
      text: transcript,
      version: options.transcriptVersion ?? 1,
      teacher_confirmed: confirmationMethod === "teacher",
      confirmation_method: confirmationMethod,
      transcription_confidence: sample.transcription_confidence,
      confirmed_at: options.confirmedAt ?? new Date().toISOString(),
      uncertain_spans: []
    },
    language: "en_zh",
    schema_version: VERSIONS.schema_version
  };
}

export function runDemoWorkflow({ sample, transcript, rubricConfirmed = true, runId, mode = "public_sample", confirmationMethod = "teacher" }) {
  const input = buildDemoInput(sample, transcript, {
    runId,
    mode,
    confirmationMethod
  });
  const rubric = { ...clone(DEMO_RUBRIC), teacher_confirmed: rubricConfirmed };
  assertReadyForGrading(input, rubric);

  const evidence = presentEvidence(sample, transcript);
  const rawMark = evidence
    .filter((item) => item.credit_status !== "not_credited")
    .reduce((sum, item) => sum + item.mark_value, 0);
  let primaryMark = Math.min(DEMO_QUESTION.max_mark, rawMark);
  const refs = new Set(evidence.filter((item) => item.credit_status !== "not_credited").map((item) => item.rubric_reference));
  if (!refs.has("C4_LIMITATION")) primaryMark = Math.min(primaryMark, 5);
  if (!refs.has("C5_JUDGMENT")) primaryMark = Math.min(primaryMark, 7);

  const transcriptUnchanged = transcript === sample.transcript;
  const reviewerMark = transcriptUnchanged ? sample.reviewer_mark : primaryMark;
  const difference = Math.abs(primaryMark - reviewerMark);
  const adjudicatedMark = difference === 1
    ? (transcriptUnchanged ? sample.adjudicated_mark ?? primaryMark : primaryMark)
    : null;
  const provisionalMark = difference >= 2 ? Math.min(primaryMark, reviewerMark) : (adjudicatedMark ?? primaryMark);
  const manualReviewRequired = difference >= 2;
  const confidence = manualReviewRequired ? "low" : difference === 1 ? "medium" : sample.transcription_confidence < 0.96 ? "medium" : "high";
  const feedback = createFeedback(provisionalMark, evidence);

  const output = {
    run_id: input.run_id,
    provisional_mark: provisionalMark,
    max_mark: DEMO_QUESTION.max_mark,
    level: levelFor(provisionalMark),
    confidence,
    confidence_reasons: [
      `Teacher-confirmed transcript; demo transcription confidence ${(sample.transcription_confidence * 100).toFixed(0)}%.`,
      difference === 0
        ? "Primary and independent demo scorers agree."
        : difference === 1
          ? "The one-mark scorer difference was adjudicated from the evidence table."
          : "Scorers differ by at least two marks; manual review is mandatory.",
      "Every credited item passed an exact-quotation check against the confirmed transcript."
    ],
    evidence,
    missed_opportunities: feedback.feedback_en.missing_development,
    ...feedback,
    manual_review_required: manualReviewRequired,
    scorer_marks: {
      primary: primaryMark,
      reviewer: reviewerMark,
      adjudicated: adjudicatedMark
    },
    ...VERSIONS,
    final_mark: null
  };

  assertGradingOutput(output, transcript);
  return { input, rubric, output };
}

export async function runConfiguredProvider(payload, fetchImpl = fetch) {
  const endpoint = globalThis.ECONMARK_PROVIDER_ENDPOINT ?? "/api/grade";
  const response = await fetchImpl(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    let detail;
    try { detail = await response.json(); } catch { detail = {}; }
    const error = new Error(detail.message ?? `Provider failed with status ${response.status}.`);
    error.code = detail.error_code ?? "PROVIDER_FAILED";
    throw error;
  }
  return response.json();
}

export async function getProviderStatus(fetchImpl = fetch) {
  const endpoint = globalThis.ECONMARK_PROVIDER_STATUS_ENDPOINT ?? "/api/providers/status";
  const response = await fetchImpl(endpoint, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`Provider status failed with ${response.status}.`);
  return response.json();
}
