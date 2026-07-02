window.INVEST = window.INVEST || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit X Lesson Y: Lesson title",
    sources: []
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Lesson overview",
      title: "Lesson title",
      zhTitle: "课程标题",
      subtitle: "Unit X Lesson Y",
      kicker: "Replace with one short guiding question.",
      visual: window.INVEST.photos?.modernTradingDesk
    },
    {
      type: "marketBrief",
      eyebrow: "Market Brief",
      title: "Start with the company case file",
      subtitle: "Recover the facts and prior lesson links before new content.",
      ticker: "Handout A",
      question: "Before each reveal, circle the matching fact and write what it helps you remember or check.",
      questionZh: "每次揭示前，先在讲义上圈出对应事实。",
      visual: window.INVEST.photos?.financialAnalysisDesk,
      revealMetricValues: true,
      metrics: [
        { label: "1. Company", value: "Company name" },
        { label: "2. Code", value: "Ticker / code" },
        { label: "3. Source date", value: "Date" }
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      bullets: [
        "objective one",
        "objective two",
        "objective three"
      ],
      zhBullets: [
        "目标一",
        "目标二",
        "目标三"
      ]
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "Replace with the first lesson part",
      zhTitle: "绗竴閮ㄥ垎",
      notes: "Keep section dividers simple. Each taught section after this starts with brief retrieval from retrievalBase or earlier course concepts, then moves through attempt, reveal/teach, formative check and improvement."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Replace with a concrete visual bridge",
      visual: window.INVEST.photos?.modernTradingDesk,
      notes: [
        "Observation/retrieval question: what should students notice, and what prior concept, formula, misconception or source habit should they recover before the new definition, data task or judgement frame?",
        "Bridge: name the next teaching link in one sentence."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "Replace with an answerable prompt",
      visual: window.INVEST.photos?.financialAnalysisDesk,
      question: "Ask students to choose, predict, calculate, classify or correct a misconception before revealing the explanation.",
      questionZh: "先让学生选择、预测或分类，再揭示解释。",
      revealTitle: "Answer: evidence comes before judgement",
      answer: "Reveal a concise model answer only after students commit to an answer.",
      notes: "Use the response as a formative decision point: move on, reteach, ask for improvement or collect the written check."
    },
    {
      type: "flow",
      eyebrow: "Key idea",
      title: "Replace with the concept flow",
      visual: window.INVEST.photos?.stockReportCalculator,
      flowStyle: "sequence",
      steps: [
        { text: "First key link uses a __________.", answer: "blank", zh: "第一步使用关键空格。" },
        { text: "Second key link changes __________.", answer: "something", zh: "第二步说明变化。" },
        { text: "Third key link affects the __________.", answer: "outcome", zh: "第三步连接结果。" }
      ]
    },
    {
      type: "peerTask",
      eyebrow: "Practice check",
      title: "Replace with the practice task",
      visual: window.INVEST.photos?.businessChartsPaper,
      steps: [
        "Write your own answer first.",
        "Compare with your partner and underline the evidence.",
        "Improve one sentence before the reveal or teacher check."
      ],
      sampleAnswer: "Reveal a complete model answer, not a fragment.",
      notes: "Vary these checks across the lesson: hinge question, sort, mini calculation, source check, misconception correction, peer comparison, cold-call justification or individual written check."
    },
    {
      type: "dataSnapshot",
      eyebrow: "Data Snapshot",
      title: "Company: frozen data snapshot",
      visual: window.INVEST.photos?.tencentBinhaiTowers,
      sourceStamp: "Source | units | snapshot date",
      focusMetrics: [
        { label: "Metric 1", value: "Value" },
        { label: "Metric 2", value: "Value" },
        { label: "Metric 3", value: "Value" }
      ],
      task: "Read the three figures. Write what each shows before judging what it proves."
    },
    {
      type: "analystBoard",
      eyebrow: "Analyst Board",
      title: "Judge evidence, expectations and price paid",
      visual: window.INVEST.photos?.financialAnalysisDesk,
      revealBlocks: true,
      blocks: [
        { label: "Evidence block 1", title: "What do we know?", body: "Replace with one concise body sentence." },
        { label: "Evidence block 2", title: "What is expected?", body: "Replace with one concise body sentence." },
        { label: "Evidence block 3", title: "What is the price/risk link?", body: "Replace with one concise body sentence." }
      ],
      prompt: "Which block is missing from the weak judgement?"
    },
    {
      type: "riskRegister",
      eyebrow: "Risk Register",
      title: "A strong company can still be a risky share",
      visual: window.INVEST.photos?.shippingPort,
      revealEffects: true,
      effectLabel: "Effect link",
      table: [
        ["Risk", "Investor question", "Likely effect"],
        ["Risk 1", "Ask the investor question.", "Link the risk to future profit, expectations or price paid."],
        ["Risk 2", "Ask the investor question.", "Link the risk to future profit, expectations or price paid."],
        ["Risk 3", "Ask the investor question.", "Link the risk to future profit, expectations or price paid."],
        ["Risk 4", "Ask the investor question.", "Link the risk to future profit, expectations or price paid."]
      ],
      prompt: "Choose one risk and complete: risk -> future profit or expectations -> price paid."
    },
    {
      type: "exam",
      eyebrow: "Output rehearsal",
      title: "Replace with the full exam-style question. [marks]",
      visual: window.INVEST.photos?.businessChartsPaper,
      revealKeywords: true,
      prompt: "Write the plan first. Reveal keywords only after students attempt the lesson primary output.",
      keywords: ["keyword 1", "keyword 2", "keyword 3"]
    },
    {
      type: "modelAnswer",
      eyebrow: "Model answer",
      title: "Replace with the same exam-style question. [marks]",
      visual: window.INVEST.photos?.financialAnalysisDesk,
      cueLabel: "Compare your answer",
      cueText: "Underline evidence, then underline the limitation or judgement link.",
      paragraphs: [
        "Reveal paragraph one after students compare their first point.",
        "Reveal paragraph two after students compare their second point."
      ]
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Retrieve and submit the lesson output",
      mode: "fillBlanks",
      items: [
        { prompt: "The key term or rule I must remember is __________.", answer: "lesson target" },
        { prompt: "The evidence, formula or source habit I used was __________.", answer: "lesson skill" },
        { prompt: "My individual output answers the question: __________.", answer: "guiding question" }
      ],
      notes: "Replace these placeholders with the lesson exitTicket and primaryOutput. The final check should be individual, collectable and aligned with the follow-up quiz; do not force a generic limitation sentence when the lesson output is a calculation, classification or source log."
    }
  ]
};
