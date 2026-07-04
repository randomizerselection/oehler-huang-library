window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 1 Knowledge Quiz",
  description: "Review saving, investment, speculation, asset, share, share price, possible return, risk and the Tencent price-movement chain.",
  questions: [
    {
      id: "saving-definition",
      type: "multipleChoice",
      prompt: "Which description best matches saving?",
      choices: [
        "Setting money aside mainly for safety, access or future spending",
        "Buying an asset for possible future return and risk",
        "Betting mainly on a short-term price jump",
        "Owning one unit of a listed company"
      ],
      answer: 0,
      explanation: "Saving is mainly about safety, access or future spending."
    },
    {
      id: "investment-definition",
      type: "multipleChoice",
      prompt: "Which description best matches investment?",
      choices: [
        "Keeping cash only for next week's spending",
        "Putting money into an asset with possible future return and risk",
        "Buying because a friend gives a tip",
        "Guessing the next one-day price move"
      ],
      answer: 1,
      explanation: "Investment involves an asset, possible return and risk."
    },
    {
      id: "speculation-definition",
      type: "multipleChoice",
      prompt: "Which action is closest to short-term stock speculation?",
      choices: [
        "Saving money for a school trip",
        "Buying because a tip says the price will jump tomorrow",
        "Defining a share as one ownership unit",
        "Recording the quote date"
      ],
      answer: 1,
      explanation: "Short-term speculation mainly bets on a quick price movement."
    },
    {
      id: "asset-blank",
      type: "fillBlank",
      prompt: "An asset is something owned that may have ________.",
      acceptedAnswers: ["value"],
      explanation: "Value is the key word."
    },
    {
      id: "share-blank",
      type: "fillBlank",
      prompt: "A share is one unit of ________ in a company.",
      acceptedAnswers: ["ownership"],
      explanation: "A share is an ownership unit, not the whole company or a product."
    },
    {
      id: "share-price",
      type: "multipleChoice",
      prompt: "What does one point on Tencent's share-price graph show?",
      choices: [
        "Tencent's total company value",
        "The market price of one listed share at one date",
        "Tencent's annual revenue",
        "A guaranteed future return"
      ],
      answer: 1,
      explanation: "A share-price graph point shows one share's market price at one date."
    },
    {
      id: "company-share-separation",
      type: "multipleChoice",
      prompt: "Which statement correctly separates Tencent the company from Tencent's listed share?",
      choices: [
        "Tencent products are the same thing as 0700.HK.",
        "Tencent is the company; 0700.HK identifies the listed share.",
        "Tencent revenue is the same as its share price.",
        "One share means owning every Tencent product."
      ],
      answer: 1,
      explanation: "The company and the listed share are connected, but they are not the same thing."
    },
    {
      id: "return-risk",
      type: "multipleChoice",
      prompt: "Which pair belongs together in an investment decision?",
      choices: [
        "Possible return and risk",
        "Saving and guaranteed high return",
        "Speculation and low uncertainty",
        "Share price and total company value"
      ],
      answer: 0,
      explanation: "Investment decisions must consider possible return and risk together."
    },
    {
      id: "expectations-blank",
      type: "fillBlank",
      prompt: "New information can change investor ________, which can affect buying, selling and price.",
      acceptedAnswers: ["expectations", "expectation"],
      explanation: "Expectations are the link between information and possible price movement."
    },
    {
      id: "knowledge-question",
      type: "multipleChoice",
      prompt: "Which is the best Lesson 1 question about Tencent's graph?",
      choices: [
        "Should I buy it today?",
        "What information might explain one price movement?",
        "Which exact percentage return will happen next?",
        "Why is the company automatically a good investment?"
      ],
      answer: 1,
      explanation: "Lesson 1 ends with a knowledge question about why the share price may have moved, not advice."
    }
  ]
};
