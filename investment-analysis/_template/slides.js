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
      subtitle: "Before any opinion, find the facts.",
      ticker: "Handout A",
      question: "Before each reveal, circle the matching fact on your handout.",
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
      notes: "Keep section dividers simple: part label, title, optional Chinese title, and the automatic progress strip. Do not add a photo, prompt card or manual roadmap."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Replace with a concrete visual bridge",
      visual: window.INVEST.photos?.modernTradingDesk,
      notes: [
        "Observation question: what should students notice before the definition, data task or judgement frame?",
        "Bridge: name the next teaching link in one sentence."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Starter",
      title: "Replace with an answerable prompt",
      visual: window.INVEST.photos?.financialAnalysisDesk,
      question: "Ask students to choose, predict or classify before revealing the explanation.",
      questionZh: "先让学生选择、预测或分类，再揭示解释。",
      revealTitle: "Model direction",
      answer: "Reveal a concise model answer only after students commit to an answer."
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
      eyebrow: "Pair task",
      title: "Replace with the practice task",
      visual: window.INVEST.photos?.businessChartsPaper,
      steps: [
        "Write your own answer first.",
        "Compare with your partner and underline the evidence.",
        "Improve one sentence before the reveal."
      ],
      sampleAnswer: "Reveal a complete model answer, not a fragment."
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
      title: "Three evidence blocks before judgement",
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
      eyebrow: "Exam practice",
      title: "Replace with the full exam-style question. [marks]",
      visual: window.INVEST.photos?.businessChartsPaper,
      revealKeywords: true,
      prompt: "Write the plan first. Reveal keywords only if needed.",
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
    }
  ]
};
