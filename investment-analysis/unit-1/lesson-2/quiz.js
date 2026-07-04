window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 2 Quiz",
  description: "Review why companies need a stock market, how HKEX helps listed shares trade, what stock codes and listings mean, and why real trading is not frictionless.",
  questions: [
    {
      id: "stock-exchange-role",
      type: "multipleChoice",
      prompt: "What is a stock exchange?",
      zh: "证券交易所是什么？",
      choices: [
        "A regulated market where listed securities can be bought and sold",
        "A company product catalogue",
        "A guarantee that all shares will rise",
        "A personal investment adviser"
      ],
      answer: 0,
      explanation: "A stock exchange provides a regulated market for trading listed securities.",
      explanationZh: "证券交易所为上市证券的买卖提供受监管的市场。"
    },
    {
      id: "listing",
      type: "multipleChoice",
      prompt: "What does listing mean in this lesson?",
      zh: "本课中的“上市”是什么意思？",
      choices: [
        "Permission for a company's shares to trade on an exchange",
        "A company's total revenue",
        "A rule that every trade gives new money to the company",
        "A private class opinion"
      ],
      answer: 0,
      explanation: "Listing gives a company's shares permission to trade on an exchange.",
      explanationZh: "上市意味着公司的股票获准在交易所交易。"
    },
    {
      id: "stock-code",
      type: "multipleChoice",
      prompt: "What is a stock code used for?",
      zh: "股票代码有什么用途？",
      choices: [
        "Finding a listed security in market data",
        "Proving the share is a good investment",
        "Replacing a source date",
        "Avoiding all trading friction"
      ],
      answer: 0,
      explanation: "A stock code is the short identifier used to find a listed security.",
      explanationZh: "股票代码是用来查找上市证券的简短识别码。"
    },
    {
      id: "hkex-source-box",
      type: "multipleChoice",
      prompt: "Which source-box entry is strongest before judging an HKEX example?",
      zh: "在判断 HKEX 例子之前，哪一个来源框记录最强？",
      choices: [
        "HKEX source title, URL, accessed date, company/security identifier and limitation",
        "Only the company logo",
        "Only whether the price looks high",
        "Only a friend's trading tip"
      ],
      answer: 0,
      explanation: "Lesson 2 continues the Lesson 1 source habit: record source, date, identifier and limitation before judgement.",
      explanationZh: "第2课延续第1课的来源习惯：判断前记录来源、日期、识别代码和局限性。"
    },
    {
      id: "secondary-market",
      type: "multipleChoice",
      prompt: "If one investor buys listed shares from another investor on the market, what should we be careful not to assume?",
      zh: "如果一个投资者在市场上从另一个投资者手中买入上市股票，我们不应该假设什么？",
      choices: [
        "That the company automatically receives new money from that trade",
        "That an exchange helps trading happen",
        "That the share has a stock code",
        "That the trade needs a market"
      ],
      answer: 0,
      explanation: "Secondary-market trades help shares change hands, but they do not automatically give new money to the company.",
      explanationZh: "二级市场交易帮助股票换手，但不会自动给公司带来新资金。"
    },
    {
      id: "liquidity-definition",
      type: "multipleChoice",
      prompt: "What does liquidity describe?",
      zh: "流动性描述什么？",
      choices: [
        "How easily an asset can be bought or sold without a large price change",
        "How many products a company sells",
        "Whether a company is famous",
        "The exact future share price"
      ],
      answer: 0,
      explanation: "Liquidity is about ease of trading without a large price change.",
      explanationZh: "流动性指买卖资产是否容易，以及是否会造成较大价格变化。"
    },
    {
      id: "trading-friction",
      type: "multipleChoice",
      prompt: "Which example shows that real trading is not frictionless?",
      zh: "哪一个例子说明真实交易并非没有摩擦？",
      choices: [
        "Trading happens through rules, market hours, trading units and available buyers or sellers.",
        "A stock code exists.",
        "A company has a name.",
        "A student recognises the brand."
      ],
      answer: 0,
      explanation: "Rules, time windows, trading units, liquidity and costs can all make trading less than perfectly frictionless.",
      explanationZh: "规则、交易时段、交易单位、流动性和成本都会让交易并非完全无摩擦。"
    },
    {
      id: "stock-exchange-blank",
      type: "fillBlank",
      prompt: "A stock exchange is a regulated market where listed securities can be bought and ________.",
      zh: "证券交易所是一个受监管的市场，上市证券可以在这里买入和________。",
      acceptedAnswers: ["sold", "sell"],
      explanation: "Bought and sold is the key phrase.",
      explanationZh: "关键词是“买入和卖出”。"
    },
    {
      id: "stock-code-blank",
      type: "fillBlank",
      prompt: "A stock code is a short market ________ used to find a listed security.",
      zh: "股票代码是用来查找上市证券的简短市场________。",
      acceptedAnswers: ["identifier", "id", "code"],
      explanation: "Identifier is the precise definition word.",
      explanationZh: "“识别码”是定义中的精确词。"
    },
    {
      id: "output-blank",
      type: "fillBlank",
      prompt: "The Lesson 2 output is one company-code-exchange match plus one trading-________ sentence.",
      zh: "第2课输出是一条公司-代码-交易所匹配，加上一句交易________句子。",
      acceptedAnswers: ["friction"],
      explanation: "The written output must name one reason trading through a market is not frictionless.",
      explanationZh: "书面输出必须说明一个市场交易并非无摩擦的原因。"
    }
  ]
};
