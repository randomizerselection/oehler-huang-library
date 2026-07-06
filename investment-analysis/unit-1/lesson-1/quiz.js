window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 1 Quiz",
  description: "Review the Lesson 1 core: evidence before judgement, one share, and what a share price can prove.",
  questions: [
    {
      id: "tencent-buy-reason",
      type: "multipleChoice",
      prompt: "Which reason is closest to investment analysis?",
      zh: "哪一个理由最接近投资分析？",
      choices: [
        "Tencent is famous, so I would buy.",
        "The price moved up, so I would buy now.",
        "I need dated evidence before judging one Tencent share.",
        "The app is familiar, so the share must be safe."
      ],
      answer: 2,
      explanation: "Investment analysis delays judgement until evidence has been checked.",
      explanationZh: "投资分析会等证据被检查之后再作判断。"
    },
    {
      id: "investment-analysis-definition",
      type: "fillBlank",
      prompt: "Investment analysis uses ________ before judgement.",
      zh: "投资分析在判断前使用________。",
      acceptedAnswers: ["evidence"],
      explanation: "Evidence is the key Lesson 1 word.",
      explanationZh: "“证据”是第一课的关键词。"
    },
    {
      id: "familiar-company-limit",
      type: "multipleChoice",
      prompt: "Why is knowing Tencent not enough reason to buy one share?",
      zh: "为什么认识腾讯不足以成为买入一股的理由？",
      choices: [
        "Because familiarity is not the same as evidence.",
        "Because familiar companies never have shares.",
        "Because one share means owning the whole company.",
        "Because share prices cannot be recorded."
      ],
      answer: 0,
      explanation: "A familiar company can still require evidence about the share, the price and what is still unknown.",
      explanationZh: "熟悉的公司仍然需要关于股票、价格和未知信息的证据。"
    },
    {
      id: "share-definition",
      type: "fillBlank",
      prompt: "A share is one unit of ________ in a company.",
      zh: "一股股票是公司中的一个________单位。",
      acceptedAnswers: ["ownership"],
      explanation: "A share is one ownership unit in a company.",
      explanationZh: "一股股票是公司中的一个所有权单位。"
    },
    {
      id: "one-share-not",
      type: "multipleChoice",
      prompt: "If you own one Tencent share, what do you not own?",
      zh: "如果你拥有一股腾讯股票，你没有拥有什么？",
      choices: [
        "One ownership unit",
        "The whole Tencent company",
        "A listed share",
        "A share with a market price"
      ],
      answer: 1,
      explanation: "One share is not ownership of the whole company.",
      explanationZh: "一股股票不是拥有整家公司。"
    },
    {
      id: "share-price-definition",
      type: "multipleChoice",
      prompt: "What is a share price?",
      zh: "什么是股价？",
      choices: [
        "The market price of one share at a specific time",
        "The total value of the whole company",
        "The company's annual revenue",
        "A guarantee that the share is a good investment"
      ],
      answer: 0,
      explanation: "A share price is for one share at one specific time.",
      explanationZh: "股价是在特定时间一股股票的市场价格。"
    },
    {
      id: "price-graph-proof",
      type: "multipleChoice",
      prompt: "What can one Tencent share-price graph prove by itself?",
      zh: "一张腾讯股价图本身能证明什么？",
      choices: [
        "The recorded price of one Tencent share at different times",
        "That Tencent is definitely a good investment",
        "That buying now is always correct",
        "That no more evidence is needed"
      ],
      answer: 0,
      explanation: "A price graph is useful evidence, but it cannot prove investment quality by itself.",
      explanationZh: "价格图是有用证据，但它本身不能证明投资质量。"
    },
    {
      id: "missing-evidence",
      type: "multipleChoice",
      prompt: "A careful answer to 'Would you buy one Tencent share?' should include...",
      zh: "对“你会买一股腾讯吗？”的谨慎回答应该包括……",
      choices: [
        "a claim that famous companies are always safe",
        "a next-week price prediction",
        "what the current evidence shows and what evidence is still missing",
        "only whether students like the product"
      ],
      answer: 2,
      explanation: "The Lesson 1 exit answer should return to the opening question with evidence and limits.",
      explanationZh: "第一课的离堂回答应带着证据和局限回到开头问题。"
    }
  ]
};
