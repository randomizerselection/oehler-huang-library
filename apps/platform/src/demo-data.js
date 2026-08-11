export const VERSIONS = Object.freeze({
  schema_version: "econmark/4.0.0",
  workflow_version: "econmark-workflow/3.0.0",
  prompt_version: "econmark-prompts/3.0.0",
  model_version: "econmark-deterministic-demo/1.0.0"
});

export const DEMO_QUESTION = Object.freeze({
  question_text: "Discuss whether an increase in interest rates is likely to reduce inflation. [8]",
  command_word: "Discuss",
  max_mark: 8,
  mark_scheme_text: [
    "This is an original demonstration rubric, not an official Cambridge mark scheme.",
    "Level 3 (6–8): developed analysis of how higher interest rates may affect inflation, considers limitations or an alternative outcome, and reaches a supported judgment.",
    "Level 2 (3–5): some accurate analysis, but development, balance, or judgment is incomplete.",
    "Level 1 (1–2): relevant assertions or basic economic knowledge with little development.",
    "Level 0 (0): no creditworthy response.",
    "Credit may include: borrowing/consumption/investment and aggregate demand; saving; exchange-rate channels; cause of inflation; time lags; confidence; borrowing costs for firms; a conditional judgment.",
    "Cap at 5 when there is no relevant counterargument or limitation. Cap at 7 without a supported judgment."
  ].join("\n")
});

export const DEMO_RUBRIC = Object.freeze({
  rubric_type: "level",
  criteria: [
    {
      criterion_id: "C1_BORROWING_AD",
      description: "Explains a valid borrowing, spending, investment, aggregate-demand, and inflation channel.",
      max_credit: 3,
      indicators: ["borrowing cost", "consumption", "investment", "aggregate demand", "demand-pull inflation"]
    },
    {
      criterion_id: "C2_SAVING",
      description: "Explains how a stronger incentive to save may reduce consumption and inflationary pressure.",
      max_credit: 2,
      indicators: ["return on saving", "consumption", "aggregate demand"]
    },
    {
      criterion_id: "C3_EXCHANGE_RATE",
      description: "Explains a valid exchange-rate channel affecting net exports or imported costs.",
      max_credit: 2,
      indicators: ["capital inflow", "exchange rate", "imports", "exports", "cost-push inflation"]
    },
    {
      criterion_id: "C4_LIMITATION",
      description: "Develops a relevant limitation, counterargument, or alternative outcome.",
      max_credit: 2,
      indicators: ["cost-push inflation", "time lag", "confidence", "firms' interest costs"]
    },
    {
      criterion_id: "C5_JUDGMENT",
      description: "Reaches a supported, conditional judgment grounded in prior analysis.",
      max_credit: 1,
      indicators: ["depends", "cause", "size", "time", "likely"]
    }
  ],
  levels: [
    { level: "L0", min_mark: 0, max_mark: 0, descriptor: "No creditworthy response." },
    { level: "L1", min_mark: 1, max_mark: 2, descriptor: "Relevant assertions or basic knowledge with little development." },
    { level: "L2", min_mark: 3, max_mark: 5, descriptor: "Some accurate analysis; development, balance, or judgment is incomplete." },
    { level: "L3", min_mark: 6, max_mark: 8, descriptor: "Developed analysis, a relevant alternative or limitation, and a supported judgment." }
  ],
  caps: [
    "Maximum 5 without a relevant counterargument or limitation.",
    "Maximum 7 without a supported judgment."
  ],
  acceptable_alternatives: [
    "Higher saving may reduce consumption and aggregate demand.",
    "Currency appreciation may reduce net exports or imported input prices.",
    "Effectiveness depends on the cause of inflation, size of the rate change, confidence, and time lags."
  ],
  special_instructions: ["Use the best-fit level, then locate the mark within that level using the quality and breadth of evidence."],
  command_word: "Discuss",
  max_mark: 8,
  parser_confidence: 1,
  teacher_confirmed: false
});

const samples = [
  {
    id: "weak",
    label_en: "Weak response",
    label_zh: "基础作答",
    student_ref: "SYN-W01",
    image: "/assets/samples/weak.svg",
    image_alt: "Synthetic handwritten weak economics response",
    transcript: "Higher interest rates make borrowing more expensive. People will spend less so inflation may fall. This will definitely work.",
    transcription_confidence: 0.99,
    expected_mark: 2,
    reviewer_mark: 2,
    evidence_templates: [
      {
        evidence_id: "E-W-1",
        transcript_quote: "Higher interest rates make borrowing more expensive.",
        rubric_reference: "C1_BORROWING_AD",
        credit_status: "credited",
        economic_reason: "Identifies the first step in the borrowing-cost channel.",
        mark_value: 1,
        quality_flags: ["undeveloped_chain"]
      },
      {
        evidence_id: "E-W-2",
        transcript_quote: "People will spend less so inflation may fall.",
        rubric_reference: "C1_BORROWING_AD",
        credit_status: "credited",
        economic_reason: "Connects lower spending to lower inflation, although aggregate demand is not explained.",
        mark_value: 1,
        quality_flags: ["missing_aggregate_demand_link"]
      },
      {
        evidence_id: "E-W-3",
        transcript_quote: "This will definitely work.",
        rubric_reference: "C5_JUDGMENT",
        credit_status: "not_credited",
        economic_reason: "The conclusion is absolute and unsupported rather than a conditional judgment.",
        mark_value: 0,
        quality_flags: ["unsupported_judgment"]
      }
    ]
  },
  {
    id: "middle",
    label_en: "Middle response",
    label_zh: "中等作答",
    student_ref: "SYN-M01",
    image: "/assets/samples/middle.svg",
    image_alt: "Synthetic handwritten middle economics response",
    transcript: "When the central bank raises interest rates, loans and credit become more expensive. Households may borrow less and reduce consumption, while firms may cut investment. Aggregate demand therefore falls, which can reduce demand-pull inflation. However, if inflation is caused by higher oil prices, lower demand may not remove the original cost increase. The policy may reduce inflation, but it depends on what caused it.",
    transcription_confidence: 0.98,
    expected_mark: 5,
    reviewer_mark: 4,
    adjudicated_mark: 5,
    evidence_templates: [
      {
        evidence_id: "E-M-1",
        transcript_quote: "loans and credit become more expensive.",
        rubric_reference: "C1_BORROWING_AD",
        credit_status: "credited",
        economic_reason: "Explains that the cost of borrowing increases.",
        mark_value: 1,
        quality_flags: []
      },
      {
        evidence_id: "E-M-2",
        transcript_quote: "Households may borrow less and reduce consumption, while firms may cut investment.",
        rubric_reference: "C1_BORROWING_AD",
        credit_status: "credited",
        economic_reason: "Develops effects on two components of aggregate demand.",
        mark_value: 1,
        quality_flags: []
      },
      {
        evidence_id: "E-M-3",
        transcript_quote: "Aggregate demand therefore falls, which can reduce demand-pull inflation.",
        rubric_reference: "C1_BORROWING_AD",
        credit_status: "credited",
        economic_reason: "Completes the causal chain from spending to demand-pull inflation.",
        mark_value: 1,
        quality_flags: []
      },
      {
        evidence_id: "E-M-4",
        transcript_quote: "if inflation is caused by higher oil prices, lower demand may not remove the original cost increase.",
        rubric_reference: "C4_LIMITATION",
        credit_status: "credited",
        economic_reason: "Develops a relevant cost-push limitation.",
        mark_value: 1,
        quality_flags: []
      },
      {
        evidence_id: "E-M-5",
        transcript_quote: "The policy may reduce inflation, but it depends on what caused it.",
        rubric_reference: "C5_JUDGMENT",
        credit_status: "credited",
        economic_reason: "Reaches a conditional judgment linked to the identified cause of inflation.",
        mark_value: 1,
        quality_flags: ["brief_judgment"]
      }
    ]
  },
  {
    id: "strong",
    label_en: "Strong response",
    label_zh: "优秀作答",
    student_ref: "SYN-S01",
    image: "/assets/samples/strong.svg",
    image_alt: "Synthetic handwritten strong economics response",
    transcript: "A rise in interest rates increases the cost of borrowing. Households are less likely to use credit for consumption and firms may postpone investment, so aggregate demand falls. With less excess demand, firms face less pressure to raise prices and demand-pull inflation should slow.\n\nHigher rates can also attract financial capital, appreciating the currency. Imported raw materials become cheaper, reducing firms' production costs, although exports may become less competitive and reduce aggregate demand further.\n\nHowever, the result is not certain. If inflation mainly comes from an oil supply shock, interest rates do not remove that shortage. Higher loan repayments may even raise some firms' costs, and policy works with a time lag. Therefore rates are most likely to reduce inflation when excess demand is the main cause and the increase is large enough to change spending; they will be less effective against temporary cost-push inflation.",
    transcription_confidence: 0.97,
    expected_mark: 8,
    reviewer_mark: 8,
    evidence_templates: [
      {
        evidence_id: "E-S-1",
        transcript_quote: "Households are less likely to use credit for consumption and firms may postpone investment, so aggregate demand falls.",
        rubric_reference: "C1_BORROWING_AD",
        credit_status: "credited",
        economic_reason: "Develops the consumption and investment channel to aggregate demand.",
        mark_value: 2,
        quality_flags: []
      },
      {
        evidence_id: "E-S-2",
        transcript_quote: "With less excess demand, firms face less pressure to raise prices and demand-pull inflation should slow.",
        rubric_reference: "C1_BORROWING_AD",
        credit_status: "credited",
        economic_reason: "Completes the developed demand-pull inflation chain.",
        mark_value: 1,
        quality_flags: []
      },
      {
        evidence_id: "E-S-3",
        transcript_quote: "Higher rates can also attract financial capital, appreciating the currency. Imported raw materials become cheaper, reducing firms' production costs",
        rubric_reference: "C3_EXCHANGE_RATE",
        credit_status: "credited",
        economic_reason: "Develops an exchange-rate and imported-cost channel.",
        mark_value: 2,
        quality_flags: []
      },
      {
        evidence_id: "E-S-4",
        transcript_quote: "If inflation mainly comes from an oil supply shock, interest rates do not remove that shortage.",
        rubric_reference: "C4_LIMITATION",
        credit_status: "credited",
        economic_reason: "Explains why monetary policy may be less effective against cost-push inflation.",
        mark_value: 1,
        quality_flags: []
      },
      {
        evidence_id: "E-S-5",
        transcript_quote: "Higher loan repayments may even raise some firms' costs, and policy works with a time lag.",
        rubric_reference: "C4_LIMITATION",
        credit_status: "credited",
        economic_reason: "Adds two developed limitations to policy effectiveness.",
        mark_value: 1,
        quality_flags: []
      },
      {
        evidence_id: "E-S-6",
        transcript_quote: "rates are most likely to reduce inflation when excess demand is the main cause and the increase is large enough to change spending; they will be less effective against temporary cost-push inflation.",
        rubric_reference: "C5_JUDGMENT",
        credit_status: "credited",
        economic_reason: "Provides a supported judgment conditional on cause and policy magnitude.",
        mark_value: 1,
        quality_flags: []
      }
    ]
  }
];

export const DEMO_SAMPLES = Object.freeze(samples.map((sample) => Object.freeze(sample)));

export function getDemoSample(id) {
  return DEMO_SAMPLES.find((sample) => sample.id === id) ?? null;
}
