window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 2 Quiz",
  description: "Check whether students can distinguish saving, investing and speculation using purpose, time horizon, liquidity, evidence and possible loss.",
  questions: [
    {
      id: "saving-definition",
      type: "multipleChoice",
      prompt: "Which statement best defines saving?",
      zh: "哪一个说法最准确地定义储蓄？",
      choices: [
        "Keeping money safe and available for future use",
        "Trying to profit from a one-week price rumour",
        "Putting all money into an asset regardless of risk",
        "Guaranteeing a higher return than investing"
      ],
      answer: 0,
      explanation: "Saving prioritises safety and availability for future use.",
      explanationZh: "储蓄优先考虑未来使用所需的安全性和可用性。"
    },
    {
      id: "investment-definition",
      type: "fillBlank",
      prompt: "Investment seeks future return while accepting possible ________.",
      zh: "投资寻求未来回报，同时接受可能的________。",
      acceptedAnswers: ["loss", "损失"],
      explanation: "Investment accepts possible loss; return is not guaranteed.",
      explanationZh: "投资接受可能损失；回报并不保证。"
    },
    {
      id: "speculation-definition",
      type: "multipleChoice",
      prompt: "Which action is closest to speculation?",
      zh: "哪一个行动最接近投机？",
      choices: [
        "Betting on a one-week price rumour with weak evidence",
        "Keeping bill money available for six months",
        "Checking risk and fit before a long-term investment",
        "Recording an official source and its date"
      ],
      answer: 0,
      explanation: "A short-term price bet based on weak evidence fits the lesson definition of speculation.",
      explanationZh: "基于薄弱证据的短期价格押注符合本课对投机的定义。"
    },
    {
      id: "near-term-money",
      type: "multipleChoice",
      prompt: "The family needs HK$12,000 in six months. Which first action is most defensible?",
      zh: "家庭在六个月后需要12,000港元。哪一个初步行动最合理？",
      choices: [
        "Keep it saved and available",
        "Use it for a one-week price bet",
        "Accept any possible loss for higher return",
        "Ignore when the money is needed"
      ],
      answer: 0,
      explanation: "Near-term money with a high liquidity need should remain safe and available.",
      explanationZh: "流动性需求高的近期资金应保持安全和可用。"
    },
    {
      id: "long-term-surplus",
      type: "multipleChoice",
      prompt: "What should happen before the HK$18,000 long-term surplus is invested?",
      zh: "在把18,000港元长期余钱用于投资之前，应该做什么？",
      choices: [
        "Check evidence, risk, possible loss and investor fit",
        "Follow the first rumour",
        "Assume a long horizon guarantees profit",
        "Choose the product with the most exciting advert"
      ],
      answer: 0,
      explanation: "A longer horizon allows consideration, not an automatic investment decision.",
      explanationZh: "较长期限允许进行考虑，但不等于自动作出投资决定。"
    },
    {
      id: "liquidity-need",
      type: "multipleChoice",
      prompt: "What does a high liquidity need mean in this family case?",
      zh: "在这个家庭案例中，高流动性需求意味着什么？",
      choices: [
        "The money must be readily available",
        "The money should face more price risk",
        "The money cannot be saved",
        "The money has no purpose"
      ],
      answer: 0,
      explanation: "Liquidity need concerns how readily the family must be able to use the money.",
      explanationZh: "流动性需求关注家庭需要多容易地使用这笔钱。"
    },
    {
      id: "higher-return-shortcut",
      type: "multipleChoice",
      prompt: "Why is 'investing is always better than saving' incorrect?",
      zh: "为什么“投资总是比储蓄更好”是不正确的？",
      choices: [
        "The right action depends on purpose, horizon, liquidity and possible loss",
        "Saving always earns a higher return",
        "Investment never produces a return",
        "Time horizon does not matter"
      ],
      answer: 0,
      explanation: "Possible return is only one factor; near-term purpose and liquidity can make saving the better fit.",
      explanationZh: "可能回报只是一个因素；近期用途和流动性可能使储蓄更适合。"
    },
    {
      id: "source-guidance",
      type: "multipleChoice",
      prompt: "Which factor is supported by the IFEC source used in the lesson?",
      zh: "本课使用的投委会来源支持哪一个因素？",
      choices: [
        "Investment time horizon and liquidity needs matter",
        "Every long-term investment makes a profit",
        "A rumour is enough evidence",
        "One product fits every family"
      ],
      answer: 0,
      explanation: "The IFEC guidance highlights time horizon, liquidity needs, resources and risk tolerance.",
      explanationZh: "投委会指引强调投资期限、流动性需求、财务资源和风险承受能力。"
    },
    {
      id: "source-limitation",
      type: "multipleChoice",
      prompt: "What can the official guidance not decide for the family?",
      zh: "官方指引不能替这个家庭决定什么？",
      choices: [
        "A named product that is guaranteed to be suitable",
        "That time horizon matters",
        "That possible loss should be considered",
        "That investment decisions need evidence"
      ],
      answer: 0,
      explanation: "General guidance supports the method but does not choose or guarantee a named product.",
      explanationZh: "一般指引支持分析方法，但不会选择或保证某个具体产品。"
    },
    {
      id: "family-final-decision",
      type: "multipleChoice",
      prompt: "Which final family decision best uses the lesson evidence?",
      zh: "哪一个家庭最终决定最符合本课证据？",
      choices: [
        "Save the HK$12,000, research the HK$18,000 before considering investment, and reject the rumour-led bet",
        "Invest all HK$30,000 immediately",
        "Save all HK$30,000 because investment always fails",
        "Use all HK$30,000 for the rumour because the possible return is high"
      ],
      answer: 0,
      explanation: "The answer matches each amount to purpose, horizon, liquidity, evidence and possible loss.",
      explanationZh: "这个答案把每笔资金与用途、期限、流动性、证据和可能损失相匹配。"
    }
  ]
};
