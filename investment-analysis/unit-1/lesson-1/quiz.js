window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 1 Quiz",
  description: "Review saving, investing, speculating, trading, shares, shareholders, stock codes, share prices and the first investment judgement rule.",
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
      id: "stock-code",
      type: "multipleChoice",
      prompt: "What does the quote ticker 0700.HK or HKEX code 00700 mainly help investors do?",
      zh: "0700.HK 报价代码或港交所 00700 主要帮助投资者做什么？",
      choices: [
        "Identify Tencent shares on the Hong Kong market",
        "Prove Tencent shares are cheap",
        "Calculate Tencent gross profit",
        "Guarantee Tencent future dividends"
      ],
      answer: 0,
      explanation: "A ticker or stock code identifies the listed security. It does not judge value by itself."
    },
    {
      id: "price-change",
      type: "multipleChoice",
      prompt: "A share price rises from HK$50 to HK$55. What is the percentage increase?",
      zh: "股价从50港元升至55港元。百分比涨幅是多少？",
      choices: ["5%", "10%", "50%", "55%"],
      answer: 1,
      explanation: "(55 - 50) / 50 x 100 = 10%."
    },
    {
      id: "good-investment",
      type: "multipleChoice",
      prompt: "Why can a good company still be a poor investment?",
      zh: "为什么好公司仍可能不是好投资？",
      choices: [
        "A good company never earns profit.",
        "The share price may already be too high compared with future profit and risk.",
        "Stock codes remove all risk.",
        "Revenue is the same as ownership."
      ],
      answer: 1,
      explanation: "Investment judgement compares future profit and risk with the current price paid."
    },
    {
      id: "investing-definition",
      type: "multipleChoice",
      prompt: "Which choice best describes investing?",
      zh: "哪一个最能描述投资？",
      choices: [
        "Keeping money safe for use next week",
        "Putting money into an asset with expected return and risk after checking evidence",
        "Buying only because the price rose yesterday",
        "Buying and selling many times in a short period"
      ],
      answer: 1,
      explanation: "Investing uses evidence and accepts risk for expected return. It is different from saving, speculating and short-term trading."
    },
    {
      id: "speculating-vs-trading",
      type: "multipleChoice",
      prompt: "A student buys a share only because a short video says it will jump tomorrow. Which term best fits?",
      zh: "学生只因为短视频说股票明天会上涨就买入。哪个术语最合适？",
      choices: [
        "Saving",
        "Investing",
        "Speculating",
        "Reading a source carefully"
      ],
      answer: 2,
      explanation: "This is speculating because the decision depends mainly on a hoped-for price jump, not careful evidence."
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
      id: "identify-blank",
      type: "fillBlank",
      prompt: "A stock code or quote ticker helps investors ________ the correct listed company.",
      zh: "股票代码或报价代码帮助投资者________正确的上市公司。",
      acceptedAnswers: ["identify", "find"],
      explanation: "The code helps with identification, not valuation."
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
