window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 1 Quiz",
  description: "Review the Lesson 1 map question: what investment analysis is, what a share is, and why evidence comes before opinion.",
  questions: [
    {
      id: "evidence-before-opinion",
      type: "multipleChoice",
      prompt: "What does investment analysis use before opinion?",
      zh: "投资分析在形成观点之前先使用什么？",
      choices: [
        "Evidence",
        "A favourite brand",
        "A guess",
        "A class vote"
      ],
      answer: 0,
      explanation: "Investment analysis starts with evidence, then builds a careful judgement."
    },
    {
      id: "analysis-not-opinion",
      type: "multipleChoice",
      prompt: "Which sentence is analysis rather than unsupported opinion?",
      zh: "哪一句是分析，而不是没有证据的观点？",
      choices: [
        "Tencent must be good because I know the brand.",
        "Tencent is a familiar company, so risk is impossible.",
        "Tencent has source-dated company evidence, but I still need to judge price and risk.",
        "The share is good because the name is famous."
      ],
      answer: 2,
      explanation: "The analytical sentence uses evidence and keeps price and risk open for judgement."
    },
    {
      id: "asset",
      type: "multipleChoice",
      prompt: "What is an asset?",
      zh: "资产是什么？",
      choices: [
        "Something owned that may have value",
        "Only a daily price movement",
        "Only a company product",
        "A guaranteed profit"
      ],
      answer: 0,
      explanation: "A share is one type of financial asset because it can be owned and may have value."
    },
    {
      id: "share-definition",
      type: "multipleChoice",
      prompt: "What is a share?",
      zh: "股票是什么？",
      choices: [
        "One unit of ownership in a company",
        "A guaranteed bank payment",
        "A company product",
        "A government tax"
      ],
      answer: 0,
      explanation: "A share is an ownership claim, not the product sold by the company."
    },
    {
      id: "share-price-point",
      type: "multipleChoice",
      prompt: "What does one point on a share-price graph show?",
      zh: "股价图上的一个点表示什么？",
      choices: [
        "The market price of one share at that date",
        "The company's total revenue for the year",
        "A final proof that the share is a good investment",
        "The number of products the company sold"
      ],
      answer: 0,
      explanation: "A graph point is a source-dated share price. It is evidence, not a complete judgement."
    },
    {
      id: "risk",
      type: "multipleChoice",
      prompt: "What is risk in this lesson?",
      zh: "本课中的风险是什么意思？",
      choices: [
        "The possibility that results, returns or prices are worse than expected",
        "A source date on a graph",
        "The code used to find a listed share",
        "A company being famous"
      ],
      answer: 0,
      explanation: "Risk means the outcome may disappoint compared with expectations."
    },
    {
      id: "product-not-share",
      type: "multipleChoice",
      prompt: "Tencent makes games, social apps and payment services. What kind of statement is this?",
      zh: "腾讯制作游戏、社交应用和支付服务。这是哪类句子？",
      choices: [
        "A company/product fact",
        "A share price",
        "A complete investment judgement",
        "A risk-free guarantee"
      ],
      answer: 0,
      explanation: "The products help identify the company, but they are not the same thing as the listed share."
    },
    {
      id: "ownership-blank",
      type: "fillBlank",
      prompt: "A share is one unit of ________ in a company.",
      zh: "股票是公司中的一个________单位。",
      acceptedAnswers: ["ownership"],
      explanation: "Ownership is the key word: a share is not a loan or a bank deposit."
    },
    {
      id: "evidence-blank",
      type: "fillBlank",
      prompt: "Investment analysis uses ________ before opinion.",
      zh: "投资分析先用________，再形成观点。",
      acceptedAnswers: ["evidence"],
      explanation: "Evidence is the starting point for a careful investment judgement."
    },
    {
      id: "risk-blank",
      type: "fillBlank",
      prompt: "Before judging a share, an analyst asks about price and ________.",
      zh: "判断股票前，分析者要问价格和________。",
      acceptedAnswers: ["risk"],
      explanation: "Lesson 1 introduces risk as a basic question before judgement."
    }
  ]
};
