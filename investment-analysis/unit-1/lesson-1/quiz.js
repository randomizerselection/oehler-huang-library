window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 1 Quiz",
  description: "Review what a stock-price graph represents, why it can change, graph-based percentage changes and the first investment judgement rule.",
  questions: [
    {
      id: "share-definition",
      type: "multipleChoice",
      prompt: "What is a share?",
      zh: "股票是什么？",
      choices: [
        "One unit of ownership in a company",
        "A guaranteed payment from a bank",
        "A government tax on companies",
        "A loan that must pay fixed interest"
      ],
      answer: 0,
      explanation: "A share is an ownership claim, not a bank deposit or fixed-interest loan."
    },
    {
      id: "shareholder",
      type: "multipleChoice",
      prompt: "Which person is a shareholder?",
      zh: "谁是股东？",
      choices: [
        "A person who reads a company website",
        "A person or institution that owns one or more shares",
        "A customer who buys the company's product",
        "A worker who receives a fixed wage"
      ],
      answer: 1,
      explanation: "A shareholder owns shares. Customers and workers may be connected to the company without owning it."
    },
    {
      id: "share-price-meaning",
      type: "multipleChoice",
      prompt: "Which sentence reads the Tencent price graph precisely?",
      zh: "哪一句能精确解读腾讯价格图？",
      choices: [
        "Each point is the market price of one Tencent share at that date.",
        "Each point is Tencent's total company value.",
        "Each point is Tencent's revenue for that year.",
        "Each point proves whether Tencent is a good investment."
      ],
      answer: 0,
      explanation: "Correct: the graph gives one-share market prices over time. The misconception is treating a price point as total value, revenue or investment quality."
    },
    {
      id: "price-change",
      type: "multipleChoice",
      prompt: "Tencent's graph falls from HK$663.00 to HK$429.80. What is the approximate percentage change?",
      zh: "腾讯图表从663.00港元跌至429.80港元。大约百分比变化是多少？",
      choices: ["-35%", "-54%", "+35%", "-233%"],
      answer: 0,
      explanation: "(429.80 - 663.00) / 663.00 x 100 is about -35%. The old graph point is the denominator."
    },
    {
      id: "good-investment",
      type: "multipleChoice",
      prompt: "Why can a famous company with a rising price graph still be a poor investment?",
      zh: "为什么有上涨价格图表的知名公司仍可能不是好投资？",
      choices: [
        "A good company never earns profit.",
        "The price point may already be too high compared with future profit and risk.",
        "A low share price removes all risk.",
        "Revenue is the same as ownership."
      ],
      answer: 1,
      explanation: "Investment judgement compares future profit and risk with the current price paid, not just the shape of the graph."
    },
    {
      id: "market-price",
      type: "multipleChoice",
      prompt: "What can push a share price up?",
      zh: "什么可能推动股价上涨？",
      choices: [
        "More buyers than sellers after positive information changes expectations",
        "The company having a stock code",
        "The old price being used as the denominator",
        "The company having a long name"
      ],
      answer: 0,
      explanation: "New information can change expectations. If more buyers want the share than sellers, the market price can rise."
    },
    {
      id: "expectations",
      type: "multipleChoice",
      prompt: "Why can a price rise before profit actually rises?",
      zh: "为什么利润还没有真正上升，股价就可能先上涨？",
      choices: [
        "Investors may expect higher future profit after new information.",
        "A share price is fixed once a year.",
        "Revenue and price are always the same number.",
        "A ticker guarantees a higher price."
      ],
      answer: 0,
      explanation: "Share prices can react to expectations about the future, not only to profit that has already happened."
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
      id: "expectations-blank",
      type: "fillBlank",
      prompt: "New information can change investors' ________ about future profit.",
      zh: "新信息会改变投资者对未来利润的________。",
      acceptedAnswers: ["expectations", "expectation"],
      explanation: "Expectations are investors' views about what may happen in the future."
    },
    {
      id: "price-blank",
      type: "fillBlank",
      prompt: "A company can have high revenue, but investors still need to consider risk and the ________ paid for the share.",
      zh: "公司可以有很高的营业收入，但投资者仍需要考虑风险和买入股票的________。",
      acceptedAnswers: ["price"],
      explanation: "A good company can be a weak investment if the price is too high."
    }
  ]
};
