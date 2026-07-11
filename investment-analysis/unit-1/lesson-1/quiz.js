window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 1 Quiz",
  description: "Check whether students can define investment analysis, classify evidence needs and choose a careful next action.",
  questions: [
    {
      id: "investment-analysis-definition",
      type: "multipleChoice",
      prompt: "Which response best describes investment analysis?",
      zh: "哪一个回应最准确地描述投资分析？",
      choices: [
        "Using evidence to judge potential return, risk and suitability before deciding",
        "Buying a familiar company before checking the evidence",
        "Predicting next week's exact share price",
        "Following the most confident opinion"
      ],
      answer: 0,
      explanation: "Investment analysis evaluates an opportunity with evidence before a decision.",
      explanationZh: "投资分析是在作出决定前利用证据评估投资机会。"
    },
    {
      id: "return-definition",
      type: "fillBlank",
      prompt: "Return is the gain or ________ earned over a stated holding period.",
      zh: "回报是在某一持有期间获得的收益或________。",
      acceptedAnswers: ["loss", "损失"],
      explanation: "Return includes both gains and losses, plus relevant income and price change.",
      explanationZh: "回报包括收益和损失，以及相关收入和价格变动。"
    },
    {
      id: "risk-definition",
      type: "multipleChoice",
      prompt: "What is risk in this lesson?",
      zh: "本课中的风险是什么？",
      choices: [
        "The possibility that results, returns or prices are worse than expected",
        "A guarantee that an investment loses all its value",
        "The same thing as a low share price",
        "A reason to avoid every investment"
      ],
      answer: 0,
      explanation: "Risk concerns outcomes that may be worse than expected; it is not a guaranteed loss.",
      explanationZh: "风险指结果可能比预期更差，并不等于保证发生损失。"
    },
    {
      id: "investor-fit",
      type: "multipleChoice",
      prompt: "Which question mainly checks investor fit?",
      zh: "哪一个问题主要检查投资者适合度？",
      choices: [
        "Does the investment match the investor's goal, time horizon and liquidity need?",
        "Is the company famous?",
        "Did the price rise yesterday?",
        "Do classmates like the company?"
      ],
      answer: 0,
      explanation: "Investor fit matches the investment to the investor's goal and constraints.",
      explanationZh: "投资者适合度把投资与投资者的目标和限制相匹配。"
    },
    {
      id: "return-check",
      type: "multipleChoice",
      prompt: "Which question is mainly about potential return?",
      zh: "哪一个问题主要关于潜在回报？",
      choices: [
        "How could dividends or a future price change create a gain or loss?",
        "Who published the source?",
        "Is the money needed in six months?",
        "What could reduce future profit?"
      ],
      answer: 0,
      explanation: "Potential return asks how an investor might gain or lose over the holding period.",
      explanationZh: "潜在回报询问投资者在持有期间可能如何获得收益或损失。"
    },
    {
      id: "risk-check",
      type: "multipleChoice",
      prompt: "Which question is mainly about risk?",
      zh: "哪一个问题主要关于风险？",
      choices: [
        "What could make Tencent's result worse than expected?",
        "How familiar is the company name?",
        "How many classmates voted yes?",
        "What colour is the company logo?"
      ],
      answer: 0,
      explanation: "A risk question identifies what could make the outcome worse than expected.",
      explanationZh: "风险问题识别什么可能使结果比预期更差。"
    },
    {
      id: "source-date",
      type: "multipleChoice",
      prompt: "Why should an analyst record the source date?",
      zh: "为什么分析者应该记录来源日期？",
      choices: [
        "To judge how current the evidence is",
        "To guarantee that the claim is correct",
        "To remove the need for a limitation",
        "To prove the share price will rise"
      ],
      answer: 0,
      explanation: "A date helps judge whether evidence is current, but it does not remove the need to check limits.",
      explanationZh: "日期帮助判断证据是否及时，但不能代替对局限的检查。"
    },
    {
      id: "source-limit",
      type: "multipleChoice",
      prompt: "What can Tencent investor relations not prove by itself?",
      zh: "腾讯投资者关系页面单独不能证明什么？",
      choices: [
        "That Tencent is suitable for every investor",
        "That the source belongs to Tencent",
        "That official investor information exists",
        "That Tencent is a company"
      ],
      answer: 0,
      explanation: "An official company source can verify facts, but it cannot prove universal suitability.",
      explanationZh: "公司官方来源可以核实事实，但不能证明它普遍适合所有投资者。"
    },
    {
      id: "familiarity-misconception",
      type: "multipleChoice",
      prompt: "Why is company familiarity a weak reason to invest?",
      zh: "为什么熟悉公司是一个薄弱的投资理由？",
      choices: [
        "Familiarity does not establish return, risk, price or investor fit",
        "Familiar companies cannot issue shares",
        "Familiar companies never publish reports",
        "Familiarity always means high risk"
      ],
      answer: 0,
      explanation: "Familiarity may start a question, but it is not evidence for the full investment case.",
      explanationZh: "熟悉度可以引出问题，但不是完整投资判断的证据。"
    },
    {
      id: "next-action",
      type: "multipleChoice",
      prompt: "The Tencent evidence is incomplete. What is the most defensible next action?",
      zh: "腾讯证据不完整。最合理的下一步行动是什么？",
      choices: [
        "Gather more dated evidence",
        "Buy because the company is familiar",
        "Avoid because one risk exists",
        "Copy the class majority"
      ],
      answer: 0,
      explanation: "Incomplete evidence supports gathering more evidence, not forcing a buy or avoid verdict.",
      explanationZh: "证据不完整时应收集更多证据，而不是强行作出买入或回避判断。"
    }
  ]
};
