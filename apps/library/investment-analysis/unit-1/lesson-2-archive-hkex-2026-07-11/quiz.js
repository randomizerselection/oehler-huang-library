// Archived 11 July 2026 before course realignment.
window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 2 Quiz",
  description: "Check whether students can explain why a stock market exists, identify a listed share, and avoid the misconception that every market purchase gives new money to the company.",
  questions: [
    {
      id: "stock-exchange-role",
      type: "multipleChoice",
      prompt: "What is a stock exchange?",
      zh: "证券交易所是什么？",
      choices: [
        "A regulated market where listed securities can be bought and sold",
        "A guarantee that every share price will rise",
        "A company product catalogue",
        "A private investment adviser"
      ],
      answer: 0,
      explanation: "A stock exchange organises trading in listed securities under market rules.",
      explanationZh: "证券交易所在市场规则下组织上市证券交易。"
    },
    {
      id: "listing-definition",
      type: "multipleChoice",
      prompt: "In this lesson, what does listing mean?",
      zh: "本课中，“上市”是什么意思？",
      choices: [
        "A company's securities have permission to trade on an exchange",
        "The company has no investment risk",
        "Every trade gives new money to the company",
        "The company must be the largest business in its industry"
      ],
      answer: 0,
      explanation: "Listing is about permission to trade on an exchange after meeting market rules.",
      explanationZh: "上市指在满足市场规则后获准在交易所交易。"
    },
    {
      id: "stock-code-purpose",
      type: "multipleChoice",
      prompt: "What is the main purpose of a stock code such as 0700.HK?",
      zh: "像 0700.HK 这样的股票代码主要有什么作用？",
      choices: [
        "It identifies a listed security in market data.",
        "It proves the share is good value.",
        "It removes all trading friction.",
        "It replaces the need for a source date."
      ],
      answer: 0,
      explanation: "A stock code is an identifier. It is not proof of investment quality.",
      explanationZh: "股票代码是识别码，不是投资质量的证明。"
    },
    {
      id: "secondary-market-money",
      type: "multipleChoice",
      prompt: "An investor buys existing listed shares from another investor on HKEX. What should we not assume?",
      zh: "一位投资者在港交所从另一位投资者手中买入已有上市股票。我们不应该假设什么？",
      choices: [
        "That the company automatically receives new money from this trade",
        "That ownership can change hands",
        "That the trade happens through a market",
        "That the share can have a stock code"
      ],
      answer: 0,
      explanation: "A normal secondary-market trade transfers existing shares between investors.",
      explanationZh: "普通二级市场交易是在投资者之间转让已有股票。"
    },
    {
      id: "primary-issue",
      type: "multipleChoice",
      prompt: "Which situation is most clearly company fundraising?",
      zh: "哪种情况最明显属于公司筹资？",
      choices: [
        "The company issues new shares, such as in an IPO.",
        "One investor sells existing shares to another investor.",
        "A student recognises the company name.",
        "A stock code appears on a quote page."
      ],
      answer: 0,
      explanation: "A new share issue can raise capital for the company. A secondary-market trade usually pays the selling investor.",
      explanationZh: "新股发行可以为公司筹集资本；二级市场交易通常是买方向卖方付款。"
    },
    {
      id: "source-box",
      type: "multipleChoice",
      prompt: "Which source-box record is strongest before judging an HKEX example?",
      zh: "判断港交所例子前，哪种来源框记录最强？",
      choices: [
        "Company, exchange, stock code, source title, accessed date and limitation",
        "Only the company logo",
        "Only whether the price looks high",
        "Only a friend's trading opinion"
      ],
      answer: 0,
      explanation: "Lesson 2 continues the source habit: identify the security and record the source before judging.",
      explanationZh: "第二课延续来源习惯：先识别证券并记录来源，再作判断。"
    },
    {
      id: "liquidity-definition",
      type: "multipleChoice",
      prompt: "What does liquidity describe?",
      zh: "流动性描述什么？",
      choices: [
        "How easily an asset can be bought or sold without a large price change",
        "Whether a company is famous",
        "The exact future share price",
        "How many products the company sells"
      ],
      answer: 0,
      explanation: "Liquidity is about ease of trading, not a guarantee of profit or safety.",
      explanationZh: "流动性关于交易便利度，不保证盈利或安全。"
    },
    {
      id: "trading-friction",
      type: "multipleChoice",
      prompt: "Which example shows trading friction?",
      zh: "哪一个例子体现了交易摩擦？",
      choices: [
        "Trading hours, board lots, spreads, costs or limited buyers and sellers",
        "A company has a familiar brand",
        "A share has a stock code",
        "A student likes the product"
      ],
      answer: 0,
      explanation: "Markets reduce friction, but real trading still happens inside rules and costs.",
      explanationZh: "市场减少摩擦，但真实交易仍受规则和成本影响。"
    },
    {
      id: "market-importance",
      type: "multipleChoice",
      prompt: "Why can a stock market matter even when a company does not receive money from every trade?",
      zh: "即使公司不是每笔交易都收到钱，股票市场为什么仍然重要？",
      choices: [
        "It helps investors transfer ownership and can improve liquidity.",
        "It guarantees every investor will earn a return.",
        "It removes the need to check sources.",
        "It proves the company is undervalued."
      ],
      answer: 0,
      explanation: "Secondary-market trading can support ownership transfer and liquidity, but it does not guarantee returns.",
      explanationZh: "二级市场交易支持所有权转让和流动性，但不保证收益。"
    },
    {
      id: "exit-sentence",
      type: "fillBlank",
      prompt: "A normal secondary-market trade transfers existing shares between investors; it does not automatically give new money to the ________.",
      zh: "普通二级市场交易是在投资者之间转让已有股票；它不会自动给________带来新资金。",
      acceptedAnswers: ["company", "firm", "business"],
      explanation: "The company raises new money mainly through issuing new shares, not through every later market trade.",
      explanationZh: "公司主要通过发行新股筹集新资金，而不是通过之后的每一笔市场交易。"
    }
  ]
};
