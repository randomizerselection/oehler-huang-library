window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 2 Quiz",
  description: "Check whether students can classify goals by time horizon and liquidity need, then explain suitability without choosing a product first.",
  questions: [
    {
      id: "time-horizon-definition",
      type: "multipleChoice",
      prompt: "What is time horizon?",
      zh: "什么是投资期限？",
      choices: [
        "The number of products a family owns",
        "The return earned last year",
        "The period before invested money is expected to be needed",
        "The date on which a product becomes popular"
      ],
      answer: 2,
      explanation: "Time horizon measures the period before the invested money is expected to be needed for the goal.",
      explanationZh: "投资期限衡量预计需要为目标使用已投资资金之前的时间。"
    },
    {
      id: "liquidity-definition",
      type: "fillBlank",
      prompt: "Liquidity need is the need to access money quickly without accepting a large loss or ________.",
      zh: "流动性需求是无需承受重大损失或________即可快速取用资金的需要。",
      acceptedAnswers: ["delay", "延迟"],
      explanation: "Liquidity need concerns reliable access without a large loss or delay.",
      explanationZh: "流动性需求涉及无需承受重大损失或延迟即可可靠取用资金。"
    },
    {
      id: "suitability-definition",
      type: "multipleChoice",
      prompt: "Which factors belong in the Lesson 2 definition of suitability?",
      zh: "哪些因素属于第二课的适合度定义？",
      choices: [
        "Product popularity, logo and advertising",
        "Last week's price change only",
        "The opinions of other families",
        "Goal, horizon, liquidity need and ability to accept loss"
      ],
      answer: 3,
      explanation: "Suitability tests whether an investment matches the person's goal and constraints.",
      explanationZh: "适合度检查投资是否与个人目标和限制相匹配。"
    },
    {
      id: "education-horizon",
      type: "multipleChoice",
      prompt: "Which goal has the shortest horizon in the frozen profile?",
      zh: "冻结资料中哪一个目标的期限最短？",
      choices: [
        "University fees beginning in three years",
        "A home deposit in eight years",
        "Retirement in thirty years",
        "All three have the same horizon"
      ],
      answer: 0,
      explanation: "Three years is the shortest period before the money is expected to be needed.",
      explanationZh: "三年是预计需要资金前最短的时间。"
    },
    {
      id: "home-flexibility",
      type: "multipleChoice",
      prompt: "Why does the home goal differ from the university goal?",
      zh: "为什么住房目标与大学目标不同？",
      choices: [
        "It guarantees a higher return",
        "It has a longer horizon and up to two years of date flexibility",
        "It has no target amount",
        "It requires money sooner"
      ],
      answer: 1,
      explanation: "The home goal is planned for eight years and its date can move, so its constraints differ from the fixed three-year education goal.",
      explanationZh: "住房目标计划在八年后且日期可以调整，因此其限制不同于固定三年的教育目标。"
    },
    {
      id: "retirement-missing-evidence",
      type: "multipleChoice",
      prompt: "Which important facts are missing for the retirement goal?",
      zh: "退休目标缺少哪些重要事实？",
      choices: [
        "Whether retirement is a future goal",
        "Whether thirty years is longer than three years",
        "The target amount, later withdrawal needs and ability to accept loss",
        "Whether investment can involve return"
      ],
      answer: 2,
      explanation: "A long horizon alone is not enough to establish suitability.",
      explanationZh: "仅凭较长期限不足以确定适合度。"
    },
    {
      id: "highest-return-misconception",
      type: "multipleChoice",
      prompt: "Why does the investment with the highest possible return not fit every goal?",
      zh: "为什么可能回报最高的投资并不适合每一个目标？",
      choices: [
        "High possible return always means low risk",
        "Every family has the same goal",
        "Suitability depends only on recent performance",
        "Goals have different horizons, liquidity needs and consequences of loss"
      ],
      answer: 3,
      explanation: "Return cannot establish suitability without the goal constraints.",
      explanationZh: "如果没有目标限制，回报不能确定适合度。"
    },
    {
      id: "liquidity-ranking",
      type: "multipleChoice",
      prompt: "Which goal has the highest current liquidity need in the frozen profile?",
      zh: "冻结资料中哪一个目标的当前流动性需求最高？",
      choices: [
        "University in three years with a fixed start date",
        "Retirement in thirty years",
        "Home deposit in eight years with date flexibility",
        "All three have identical liquidity needs"
      ],
      answer: 0,
      explanation: "The earliest fixed payment date creates the strongest current need for reliable access.",
      explanationZh: "最早且固定的付款日期形成最强的当前可靠取用资金需要。"
    },
    {
      id: "source-limit",
      type: "multipleChoice",
      prompt: "What can official time-horizon guidance not decide for the family?",
      zh: "官方投资期限指引不能替家庭决定什么？",
      choices: [
        "That the period before a goal matters",
        "A named product and whether its possible loss is acceptable for this family",
        "That risk tolerance affects choices",
        "That goals can have different horizons"
      ],
      answer: 1,
      explanation: "General guidance supports a method; family-specific suitability still requires evidence.",
      explanationZh: "一般指引支持一种方法；家庭具体的适合度仍需要证据。"
    },
    {
      id: "goal-comparison",
      type: "multipleChoice",
      prompt: "Which explanation best shows why two goals require different investment choices?",
      zh: "哪一个解释最能说明为什么两个目标需要不同的投资选择？",
      choices: [
        "Retirement is later, so any investment is suitable.",
        "University is expensive, so it needs the highest possible return.",
        "University money is needed sooner on a fixed date, while retirement money has a longer horizon and lower current access need; each choice must match its goal and loss capacity.",
        "The same family should use one identical choice for all money."
      ],
      answer: 2,
      explanation: "The answer compares horizon and liquidity need, then keeps the judgement conditional on suitability evidence.",
      explanationZh: "该答案比较期限和流动性需求，并使判断以适合度证据为条件。"
    }
  ]
};
