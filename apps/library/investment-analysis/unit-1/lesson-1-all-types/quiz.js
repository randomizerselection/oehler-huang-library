window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Slide Type Gallery Review Check",
  description: "Quickly check that the current Investment Analysis slide types and their main uses are clear.",
  questions: [
    {
      id: "compact-data-purpose",
      type: "multipleChoice",
      prompt: "If a deck needs compact company figures with a student task, which slide type should it use?",
      zh: "如果课件需要带学生任务的紧凑公司数据，应该使用哪种幻灯片类型？",
      choices: ["dataSnapshot", "modelAnswer", "riskRegister", "visualPause"],
      answer: 0,
      explanation: "Use dataSnapshot for compact figures with a clear student task.",
      explanationZh: "用 dataSnapshot 呈现紧凑数据和明确任务。"
    },
    {
      id: "chart-hook",
      type: "multipleChoice",
      prompt: "Which slide type shows a frozen share-price chart as a classroom hook?",
      zh: "哪种幻灯片类型用冻结的股价图作为课堂导入？",
      choices: ["quoteMap", "priceChart", "comparisonMatrix", "answer"],
      answer: 1,
      explanation: "priceChart is the dedicated full-screen chart slide.",
      explanationZh: "priceChart 是专门用于全屏图表的幻灯片。"
    },
    {
      id: "question-first",
      type: "multipleChoice",
      prompt: "Which slide type should ask a student-answerable question before revealing a concise answer?",
      zh: "哪种幻灯片类型应先提出学生能回答的问题，再揭示简洁答案？",
      choices: ["discussion", "section", "sourceLens", "modelAnswer"],
      answer: 0,
      explanation: "discussion is the question-first, reveal-second slide type.",
      explanationZh: "discussion 是先提问、后揭示的幻灯片类型。"
    },
    {
      id: "source-check",
      type: "multipleChoice",
      prompt: "Which slide type is designed for source metadata and source-limit checks?",
      zh: "哪种幻灯片类型用于来源信息和来源局限检查？",
      choices: ["sourceLens", "hero", "flow", "quiz"],
      answer: 0,
      explanation: "sourceLens shows source title, publisher, date, unit and source checks.",
      explanationZh: "sourceLens 显示来源标题、发布者、日期、单位和来源检查。"
    },
    {
      id: "quote-fields",
      type: "multipleChoice",
      prompt: "Which slide type maps quote-page fields such as company, code, exchange, price, date and currency?",
      zh: "哪种幻灯片类型整理公司、代码、交易所、价格、日期和货币等报价页字段？",
      choices: ["conceptTriad", "quoteMap", "calculationDesk", "outcomes"],
      answer: 1,
      explanation: "quoteMap is the quote-page identity field map.",
      explanationZh: "quoteMap 用来整理报价页上的身份字段。"
    },
    {
      id: "calculation",
      type: "multipleChoice",
      prompt: "Which slide type is best for formula, inputs, worked example and try-it calculation work?",
      zh: "哪种幻灯片类型最适合公式、输入、例题和试算任务？",
      choices: ["calculationDesk", "analystBoard", "visualPause", "section"],
      answer: 0,
      explanation: "calculationDesk is the calculation-focused slide type.",
      explanationZh: "calculationDesk 是以计算为核心的幻灯片类型。"
    },
    {
      id: "risk",
      type: "multipleChoice",
      prompt: "Which slide type makes risk categories and their likely effects explicit?",
      zh: "哪种幻灯片类型能清楚展示风险类别及其可能影响？",
      choices: ["riskRegister", "term", "priceChart", "visualPause"],
      answer: 0,
      explanation: "riskRegister shows risk rows with revealed effect links.",
      explanationZh: "riskRegister 用风险行和揭示的影响连接来展示风险。"
    },
    {
      id: "review-decision",
      type: "fillBlank",
      prompt: "After reviewing a slide type, mark it as keep, edit, split, replace or ________.",
      zh: "复习一个幻灯片类型后，把它标记为保留、修改、拆分、替换或……",
      acceptedAnswers: ["delete"],
      explanation: "The gallery worksheet uses keep, edit, split, replace and delete as the review decisions.",
      explanationZh: "展示讲义使用保留、修改、拆分、替换和删除作为复习决定。"
    }
  ]
};
