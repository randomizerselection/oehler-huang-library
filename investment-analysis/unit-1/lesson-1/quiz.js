window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 1 Quiz",
  description: "Review shares, shareholders, stock codes, share prices and the first investment judgement rule.",
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
      prompt: "What does the stock code 0700.HK mainly help investors do?",
      choices: [
        "Identify Tencent shares on the Hong Kong market",
        "Prove Tencent shares are cheap",
        "Calculate Tencent gross profit",
        "Guarantee Tencent future dividends"
      ],
      answer: 0,
      explanation: "A stock code identifies the listed security. It does not judge value by itself."
    },
    {
      id: "price-change",
      type: "multipleChoice",
      prompt: "A share price rises from HK$50 to HK$55. What is the percentage increase?",
      choices: ["5%", "10%", "50%", "55%"],
      answer: 1,
      explanation: "(55 - 50) / 50 x 100 = 10%."
    },
    {
      id: "good-investment",
      type: "multipleChoice",
      prompt: "Why can a good company still be a poor investment?",
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
      id: "ownership-blank",
      type: "fillBlank",
      prompt: "A share is one unit of ________ in a company.",
      acceptedAnswers: ["ownership"],
      explanation: "Ownership is the key word: a share is not a loan or a bank deposit."
    },
    {
      id: "identify-blank",
      type: "fillBlank",
      prompt: "A stock code helps investors ________ the correct listed company.",
      acceptedAnswers: ["identify", "find"],
      explanation: "The code helps with identification, not valuation."
    },
    {
      id: "price-blank",
      type: "fillBlank",
      prompt: "A company can have high revenue, but investors still need to consider risk and the ________ paid for the share.",
      acceptedAnswers: ["price"],
      explanation: "A good company can be a weak investment if the price is too high."
    }
  ]
};
