export const lesson = {
  number: 2,
  title: "Measuring investment return",
  titleZh: "衡量投资回报",
  focus: "Total return, return amount, percentage return, and fair comparison",
  communicationJob:
    "By the end, junior-high students should calculate and interpret a simple investment return and use percentage return to compare unequal starting amounts fairly.",
  objectives: [
    ["Explain the components of total return", "解释总回报的构成"],
    ["Calculate return amount and percentage return", "计算回报额与回报率"],
    ["Use percentage return to compare investments fairly", "用回报率公平比较投资"],
  ],
  opening: {
    prompt:
      "Investment A earns CNY 200 and Investment B earns CNY 600. Which performed better?",
    answer:
      "Insufficient information: compare each return with its starting amount and stated period.",
  },
  formula: {
    totalReturn: "Total return = ending value − starting value + income",
    percentageReturn: "Return % = total return ÷ starting value × 100",
  },
  examples: {
    worked: { start: 5000, end: 5400, income: 100, amount: 500, percent: 10 },
    gainPractice: { start: 3000, end: 3240, income: 60, amount: 300, percent: 10 },
    lossPractice: { start: 5000, end: 4550, income: 150, amount: -300, percent: -6 },
    hinge: { start: 1000, end: 1100, income: 20, amount: 120, percent: 12 },
    fairA: { start: 2000, end: 2200, income: 0, amount: 200, percent: 10 },
    fairB: { start: 10000, end: 10600, income: 0, amount: 600, percent: 6 },
    pairedC: { start: 4000, end: 4280, income: 120, amount: 400, percent: 10 },
    pairedD: { start: 8000, end: 8480, income: 80, amount: 560, percent: 7 },
    shortAnswer: { start: 8000, end: 8540, income: 260, amount: 800, percent: 10 },
  },
};

const targets = {
  1: [
    { shapeId: "sh/7qp4be9c", action: "rewrite-and-reposition", purpose: "Lesson 2 title" },
    { sourceElementId: "im/ri9kvmxs", action: "replace", purpose: "new return-analysis title photograph" },
  ],
  3: [
    { shapeId: "sh/cza94vmx", action: "rewrite", purpose: "roadmap title" },
    { shapeId: "sh/d0jax03i", action: "rewrite", purpose: "three bilingual objectives" },
  ],
  4: [{ shapeId: "sh/1cj2d8b6", action: "rewrite", purpose: "section title" }],
  11: [{ shapeId: "sh/xcryxg7y", action: "rewrite", purpose: "section title" }],
  12: [
    { shapeId: "sh/1gbm9s3a", action: "rewrite", purpose: "visual prompt title" },
    { sourceElementId: "im/hs3a54f2", action: "replace", purpose: "new formula photograph" },
  ],
  16: [
    { shapeId: "sh/8z2h8bq1", action: "rewrite", purpose: "comparison title" },
    { shapeId: "sh/ytkf2h8j", action: "rewrite", purpose: "left comparison" },
    { shapeId: "sh/zutgvm94", action: "rewrite", purpose: "right comparison" },
  ],
  17: [
    { shapeId: "sh/rm5czq50", action: "rewrite", purpose: "content title" },
    { shapeId: "sh/gbedwfmx", action: "rewrite", purpose: "content body" },
  ],
  18: [
    { shapeId: "sh/wrelszu9", action: "rewrite", purpose: "visual prompt title" },
    { sourceElementId: "im/0fyt8ni5", action: "replace", purpose: "new content-specific photograph" },
  ],
  21: [
    { shapeId: "sh/1gbmxs7a", action: "rewrite", purpose: "retrieval title" },
    { shapeId: "sh/0f2lon6p", action: "rewrite", purpose: "retrieval body" },
  ],
  22: [{ shapeId: "sh/k7qpgjul", action: "rewrite", purpose: "section title" }],
  23: [
    { shapeId: "sh/90vqdczq", action: "rewrite", purpose: "task title" },
    { shapeId: "sh/8zm9k7y5", action: "rewrite", purpose: "task body" },
  ],
  26: [{ shapeId: "sh/8fil4b21", action: "rewrite", purpose: "section title" }],
  27: [
    { shapeId: "sh/kn694nmx", action: "rewrite", purpose: "MCQ label" },
    { shapeId: "sh/lofadsni", action: "rewrite", purpose: "MCQ body" },
  ],
  28: [
    { shapeId: "sh/q9cz6xkv", action: "rewrite", purpose: "MCQ label" },
    { shapeId: "sh/ralgf21g", action: "rewrite", purpose: "MCQ body" },
  ],
  29: [
    { shapeId: "sh/tk36hwby", action: "rewrite", purpose: "MCQ label" },
    { shapeId: "sh/8jup8rad", action: "rewrite", purpose: "MCQ body" },
  ],
  30: [
    { shapeId: "sh/po72d8nm", action: "rewrite", purpose: "MCQ label" },
    { shapeId: "sh/o3yl4361", action: "rewrite", purpose: "MCQ body" },
  ],
  31: [
    { shapeId: "sh/dgja98fe", action: "rewrite", purpose: "MCQ label" },
    { shapeId: "sh/cfa903yt", action: "rewrite", purpose: "MCQ body" },
  ],
  33: [
    { shapeId: "sh/lk3m50nq", action: "rewrite", purpose: "evidence task title" },
    { shapeId: "sh/0jalwfm5", action: "rewrite", purpose: "evidence task body" },
    { sourceElementId: "im/u903mxc7", action: "replace", purpose: "new evidence-record photograph" },
  ],
  34: [
    { shapeId: "sh/pwzm1kbm", action: "rewrite", purpose: "model-answer title" },
    { shapeId: "sh/ovq58fu1", action: "rewrite", purpose: "model-answer body" },
  ],
  38: [
    { shapeId: "sh/kvy1kbep", action: "rewrite", purpose: "model-answer title" },
    { shapeId: "sh/lw7idgva", action: "rewrite", purpose: "model-answer body" },
  ],
};

const slidePlan = [
  ["lesson-title", 1, "opening title"],
  ["opening-dilemma", 18, "student-answerable dilemma"],
  ["lesson-roadmap", 3, "three bilingual objectives"],
  ["section-total-return", 4, "section divider"],
  ["retrieve-return-sources", 21, "retrieval attempt"],
  ["retrieve-return-sources-answer", 34, "retrieval model answer"],
  ["define-total-return", 17, "definition and examples"],
  ["return-evidence-visual", 12, "content-specific visual pause"],
  ["build-total-return-formula", 23, "formula construction"],
  ["worked-total-return", 17, "guided worked example"],
  ["try-total-return", 23, "guided calculation attempt"],
  ["try-total-return-answer", 34, "guided calculation model answer"],
  ["section-calculate", 11, "section divider"],
  ["calculation-method", 23, "four-step calculation method"],
  ["practice-capital-gain", 23, "independent calculation attempt"],
  ["practice-capital-gain-answer", 34, "calculation model answer"],
  ["practice-capital-loss", 23, "independent calculation attempt"],
  ["practice-capital-loss-answer", 34, "calculation model answer"],
  ["classify-return-items", 23, "classification attempt"],
  ["classify-return-items-answer", 34, "classification model answer"],
  ["hinge-check", 23, "hinge calculation"],
  ["hinge-check-answer", 34, "hinge model answer"],
  ["section-compare", 22, "section divider"],
  ["amount-versus-percentage", 16, "fair-comparison explanation"],
  ["opening-data-reveal", 23, "opening case with starting amounts"],
  ["opening-data-reveal-answer", 34, "opening comparison model"],
  ["paired-comparison", 23, "paired comparison attempt"],
  ["paired-comparison-answer", 34, "paired comparison model"],
  ["smg-return-record", 33, "Stock Market Game evidence action"],
  ["section-check", 26, "section divider"],
  ["mcq-1", 27, "MCQ"],
  ["mcq-2", 28, "MCQ"],
  ["mcq-3", 29, "MCQ"],
  ["mcq-4", 30, "MCQ"],
  ["mcq-5", 31, "MCQ"],
  ["short-answer-calculation", 23, "short written calculation"],
  ["short-answer-calculation-model", 34, "short-answer model"],
  ["individual-exit-comparison", 23, "individual exit judgement"],
  ["individual-exit-comparison-model", 38, "final model judgement"],
];

export const slides = slidePlan.map(([id, sourceSlide, narrativeRole], index) => ({
  id,
  outputSlide: index + 1,
  sourceSlide,
  narrativeRole,
}));

export const templateFrameMap = {
  outputSlides: slides.map((slide) => ({
    outputSlide: slide.outputSlide,
    sourceSlide: slide.sourceSlide,
    semanticId: slide.id,
    narrativeRole: slide.narrativeRole,
    reuseMode: "duplicate-slide",
    editTargets: targets[slide.sourceSlide] ?? [],
  })),
  omittedSourceSlides: Array.from({ length: 38 }, (_, index) => index + 1)
    .filter((sourceSlide) => !new Set(slides.map((slide) => slide.sourceSlide)).has(sourceSlide))
    .map((sourceSlide) => ({
      sourceSlide,
      reason: "This source pattern is not needed for the Lesson 2 narrative; a more suitable inherited layout is used.",
    })),
};

export const imageSources = {
  title: {
    file: "lesson02-return-title.jpg",
    creator: "Jakub Zerdzicki",
    page: "https://www.pexels.com/photo/stock-market-analysis-with-calculator-in-office-36755617/",
    alt: "A person using a calculator beside financial-market screens",
  },
  comparison: {
    file: "lesson02-fair-comparison.jpg",
    creator: "AlphaTradeZone",
    page: "https://www.pexels.com/photo/a-hand-pointing-the-crypto-graph-on-the-table-while-the-person-beside-him-is-writing-on-a-notebook-5833301/",
    alt: "Two people comparing a chart with a calculator and written notes",
  },
  formula: {
    file: "lesson02-formula-flatlay.jpg",
    creator: "RDNE Stock project",
    page: "https://www.pexels.com/photo/notebook-and-calculator-and-magnifier-on-graph-7947746/",
    alt: "A calculator, notebook and magnifying glass on a financial chart",
  },
  evidence: {
    file: "lesson02-evidence-record.jpg",
    creator: "Jakub Zerdzicki",
    page: "https://www.pexels.com/photo/man-taking-notes-with-stock-market-data-on-screen-36633860/",
    alt: "A person recording evidence while reviewing market data",
  },
};
