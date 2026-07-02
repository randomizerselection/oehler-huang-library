window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 1 Quiz",
  description: "Review the Lesson 1 course-entry question: what investment analysis is, how a share and share price differ from a company, why source-dated evidence comes before opinion, and why this course is not short-term stock speculation.",
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
      explanation: "Investment analysis starts with evidence, then builds a careful judgement about possible return, risk and price.",
      explanationZh: "投资分析从证据开始，再对可能回报、风险和价格作出谨慎判断。"
    },
    {
      id: "not-stock-speculation",
      type: "multipleChoice",
      prompt: "What is this course not teaching students to do?",
      zh: "本课程不是教学生做什么？",
      choices: [
        "Short-term stock speculation, tips or market timing",
        "Read source-dated evidence",
        "Separate a company from its listed share",
        "Ask about possible return, risk and price"
      ],
      answer: 0,
      explanation: "The course teaches analysis, not short-term price-jump betting or personal buy/sell advice.",
      explanationZh: "本课程教授分析，不教授短期押注价格跳动或个人买卖建议。"
    },
    {
      id: "source-box",
      type: "multipleChoice",
      prompt: "Which item belongs in a source box before judging Tencent?",
      zh: "在判断腾讯之前，哪一项应该记录在来源框中？",
      choices: [
        "A source title, accessed date and company/security identifier",
        "Only whether students like Tencent products",
        "A final buy or sell recommendation",
        "A percentage-change calculation from a later lesson"
      ],
      answer: 0,
      explanation: "Lesson 1 requires a source title, source URL or title, dates, identifier, key figure and limitation before judgement.",
      explanationZh: "第1课要求在判断前记录来源标题、URL或标题、日期、识别代码、关键数据和局限性。"
    },
    {
      id: "company-share-price",
      type: "multipleChoice",
      prompt: "Which sentence correctly separates Tencent, 0700.HK and one graph point?",
      zh: "哪一句正确区分腾讯、0700.HK 和图上的一个点？",
      choices: [
        "Tencent is a product, and 0700.HK is the annual revenue.",
        "Tencent is the company, 0700.HK is the listed share, and one graph point is the share price at one date.",
        "Tencent's products are the same thing as the listed share.",
        "One graph point proves the share is a good investment."
      ],
      answer: 1,
      explanation: "Tencent is the company, 0700.HK identifies the listed share, and one graph point shows the market price of one share at a date.",
      explanationZh: "腾讯是公司，0700.HK 识别上市股票，图上一个点显示某一日期一股股票的市场价格。"
    },
    {
      id: "asset-share",
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
      explanation: "A share is an ownership unit in a company. It is not a product, a loan or guaranteed profit.",
      explanationZh: "股票是公司中的一个所有权单位。它不是产品、贷款或保证利润。"
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
      explanation: "A graph point is source-dated share-price evidence. It is useful, but it is not a complete investment judgement.",
      explanationZh: "图上的一个点是带来源日期的股价证据。它有用，但不是完整的投资判断。"
    },
    {
      id: "evidence-limitation",
      type: "multipleChoice",
      prompt: "What can a single company figure or graph not prove alone?",
      zh: "单个公司数据或图表不能单独证明什么？",
      choices: [
        "The complete quality, value and risk of the investment",
        "That the source has a date",
        "That Tencent is a company",
        "That a price can move"
      ],
      answer: 0,
      explanation: "One figure or graph can be evidence, but it cannot prove quality, value and risk at the same time.",
      explanationZh: "单个数据或图表可以作为证据，但不能同时证明质量、价值和风险。"
    },
    {
      id: "risk-definition",
      type: "fillBlank",
      prompt: "Risk is the possibility that results, returns or prices are worse than ________.",
      zh: "风险是结果、回报或价格比________更差的可能性。",
      acceptedAnswers: ["expected", "expectation", "expectations"],
      explanation: "Expected is the key word: risk means the result may disappoint.",
      explanationZh: "关键词是“预期”：风险意味着结果可能令人失望。"
    },
    {
      id: "ownership-blank",
      type: "fillBlank",
      prompt: "A share is one unit of ________ in a company.",
      zh: "一股股票是公司中的一个________单位。",
      acceptedAnswers: ["ownership"],
      explanation: "Ownership is the key word: a share is not the whole company or a product.",
      explanationZh: "关键词是“所有权”：股票不是整家公司，也不是产品。"
    },
    {
      id: "movement-question",
      type: "fillBlank",
      prompt: "A good first question is: what information might explain one Tencent price ________?",
      zh: "一个好的初始问题是：什么信息可能解释腾讯股价的一次________？",
      acceptedAnswers: ["movement", "change"],
      explanation: "Lesson 1 asks for one evidence question about a price movement, not a buy/sell judgement.",
      explanationZh: "第1课要求提出一个关于价格变化的证据问题，而不是买卖判断。"
    }
  ]
};
