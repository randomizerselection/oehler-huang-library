window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 1 Quiz",
  description: "Review the Lesson 1 foundations: investment versus speculation, investment analysis, asset, share, possible return, risk and share price.",
  questions: [
    {
      id: "investment-vs-speculation",
      type: "multipleChoice",
      prompt: "Which sentence is investment analysis rather than short-term speculation?",
      zh: "哪一句是投资分析，而不是短期投机？",
      choices: [
        "The price might jump next week, so buy now.",
        "Tencent is famous, so the share must be safe.",
        "I need evidence about possible return, risk and price before judging.",
        "A high share price always means a better company."
      ],
      answer: 2,
      explanation: "Investment analysis uses evidence before judgement. Speculation mainly guesses a short-term price movement.",
      explanationZh: "投资分析在判断前使用证据。投机主要是在猜测短期价格变动。"
    },
    {
      id: "investment-analysis-definition",
      type: "multipleChoice",
      prompt: "What does investment analysis study before making a judgement?",
      zh: "投资分析在作出判断前研究什么？",
      choices: [
        "Possible return, risk and price using evidence",
        "Only whether a company is famous",
        "Only next week's price movement",
        "Only whether classmates like the product"
      ],
      answer: 0,
      explanation: "The Lesson 1 definition is: investment analysis uses evidence to study possible return, risk and price before judgement.",
      explanationZh: "第一课的定义是：投资分析在判断前用证据研究可能回报、风险和价格。"
    },
    {
      id: "asset-definition",
      type: "fillBlank",
      prompt: "An asset is something owned that may have ________.",
      zh: "资产是被拥有且可能有________的东西。",
      acceptedAnswers: ["value"],
      explanation: "Value is the key word. An asset is something owned that may have value.",
      explanationZh: "关键词是“价值”。资产是被拥有且可能有价值的东西。"
    },
    {
      id: "share-definition",
      type: "fillBlank",
      prompt: "A share is one unit of ________ in a company.",
      zh: "一股股票是公司中的一个________单位。",
      acceptedAnswers: ["ownership"],
      explanation: "Ownership is the key word. A share is one ownership unit in a company.",
      explanationZh: "关键词是“所有权”。一股股票是公司中的一个所有权单位。"
    },
    {
      id: "one-share-meaning",
      type: "multipleChoice",
      prompt: "If you own one share, what do you own?",
      zh: "如果你拥有一股股票，你拥有什么？",
      choices: [
        "The whole company",
        "One product",
        "One unit of ownership in the company",
        "Guaranteed profit"
      ],
      answer: 2,
      explanation: "One share is one ownership unit. It is not the whole company, a product or guaranteed profit.",
      explanationZh: "一股股票是一个所有权单位。它不是整家公司、一个产品，也不是保证利润。"
    },
    {
      id: "possible-return",
      type: "multipleChoice",
      prompt: "What is possible return?",
      zh: "什么是可能回报？",
      choices: [
        "The gain an investor hopes to earn",
        "A guaranteed profit",
        "The risk that price falls",
        "The name of the stock exchange"
      ],
      answer: 0,
      explanation: "Possible return is hoped for, not guaranteed.",
      explanationZh: "可能回报是希望获得的，不是保证的。"
    },
    {
      id: "risk-definition",
      type: "fillBlank",
      prompt: "Risk is the possibility that results, returns or prices are worse than ________.",
      zh: "风险是结果、回报或价格比________更差的可能性。",
      acceptedAnswers: ["expected", "expectation", "expectations"],
      explanation: "Expected is the key word. Risk means the result may disappoint.",
      explanationZh: "关键词是“预期”。风险意味着结果可能令人失望。"
    },
    {
      id: "risk-return-together",
      type: "multipleChoice",
      prompt: "Why must possible return and risk be judged together?",
      zh: "为什么必须把可能回报和风险一起判断？",
      choices: [
        "Because a high possible return is incomplete if the risk is ignored",
        "Because risk guarantees higher return",
        "Because share prices never change",
        "Because famous companies have no risk"
      ],
      answer: 0,
      explanation: "A careful judgement asks what gain is possible and what could be worse than expected.",
      explanationZh: "谨慎的判断会同时询问可能获得什么收益，以及什么可能比预期更差。"
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
      explanation: "A share price is one share at one time. It is not revenue, profit or total company value.",
      explanationZh: "股价是在某一时间的一股价格。它不是收入、利润或整家公司的总价值。"
    },
    {
      id: "share-price-evidence",
      type: "multipleChoice",
      prompt: "What can one Tencent share-price point prove by itself?",
      zh: "一个腾讯股价点本身能证明什么？",
      choices: [
        "The market price of one Tencent share at that time",
        "That Tencent is definitely a good investment",
        "That possible return is guaranteed",
        "That there is no risk"
      ],
      answer: 0,
      explanation: "One price point is useful evidence, but it does not prove return, risk or investment quality by itself.",
      explanationZh: "一个价格点是有用证据，但它本身不能证明回报、风险或投资质量。"
    }
  ]
};
