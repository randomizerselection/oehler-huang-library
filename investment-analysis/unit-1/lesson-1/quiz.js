window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 1 Quiz",
  description: "Check whether students can define investment, return and financial goal, then choose and justify a clear next step for a family goal.",
  questions: [
    {
      id: "investment-definition",
      type: "multipleChoice",
      prompt: "Which statement correctly defines investment?",
      zh: "哪一个陈述正确定义了投资？",
      choices: [
        "Putting money into an asset to seek future return while accepting possible loss",
        "Keeping all money unchanged until it is spent",
        "Guaranteeing that money grows faster than prices",
        "Choosing the investment with the highest recent return"
      ],
      answer: 0,
      explanation: "Investment seeks future return through an asset while retaining the possibility of loss.",
      explanationZh: "投资通过资产寻求未来回报，同时仍存在可能损失。"
    },
    {
      id: "return-definition",
      type: "fillBlank",
      prompt: "Return is the gain or ________ from an investment over a stated period.",
      zh: "回报是投资在规定期间内的收益或________。",
      acceptedAnswers: ["loss", "损失"],
      explanation: "Return can be positive or negative and includes price change and income.",
      explanationZh: "回报可以为正，也可以为负，并包括价格变化和收入。"
    },
    {
      id: "return-components",
      type: "multipleChoice",
      prompt: "Which pair is included in the Lesson 1 definition of return?",
      zh: "哪一组内容包含在第一课的回报定义中？",
      choices: [
        "Goal priority and age",
        "Price change and income",
        "Budget and tax",
        "Investment name and popularity"
      ],
      answer: 1,
      explanation: "The course definition includes price change and income over a stated period.",
      explanationZh: "课程定义包括规定期间内的价格变化和收入。"
    },
    {
      id: "financial-goal-definition",
      type: "multipleChoice",
      prompt: "Which description is a complete financial goal?",
      zh: "哪一个描述是完整的财务目标？",
      choices: [
        "Make more money",
        "Choose an investment soon",
        "CNY 180,000 for university fees in six years, with high priority",
        "Choose a high return"
      ],
      answer: 2,
      explanation: "A financial goal states a future use, amount, priority and time horizon.",
      explanationZh: "财务目标说明资金的未来用途、金额、优先级和投资期限。"
    },
    {
      id: "why-invest",
      type: "multipleChoice",
      prompt: "Which is the strongest reason a family might invest?",
      zh: "哪一个是家庭可能投资的最有力理由？",
      choices: [
        "To guarantee that every goal is reached",
        "To avoid identifying when the money is needed",
        "To copy an investment chosen by another family",
        "To seek future return for a stated long-term goal while accepting possible loss"
      ],
      answer: 3,
      explanation: "The reason links investment to a stated goal, future return and possible loss.",
      explanationZh: "该理由把投资与明确目标、未来回报和可能损失联系起来。"
    },
    {
      id: "medical-goal",
      type: "multipleChoice",
      prompt: "What is the best next step for CNY 25,000 needed for a medical bill in four months?",
      zh: "四个月后支付医疗账单所需的25,000元人民币，最佳下一步是什么？",
      choices: [
        "Keep it available because a loss or delay could leave the bill unpaid",
        "Consider investing because every goal needs the highest possible return",
        "Choose an investment before checking when the bill is due",
        "Need more information because the purpose and date are unknown"
      ],
      answer: 0,
      explanation: "Choose ‘Keep available.’ The goal is near-term and urgent, so the money must be accessible and has little room for loss.",
      explanationZh: "选择“保持资金可用”。该目标近期且紧急，因此资金必须可以使用，几乎没有承受损失的空间。"
    },
    {
      id: "retirement-condition",
      type: "multipleChoice",
      prompt: "A retirement goal is thirty years away. Which condition is still missing?",
      zh: "退休目标在三十年后。仍然缺少哪一个条件？",
      choices: [
        "Proof that every return will be positive",
        "The target amount and the family's ability to accept loss",
        "A promise to choose one investment today",
        "A list of classmates' opinions"
      ],
      answer: 1,
      explanation: "Choose ‘Need more information.’ A long horizon may support investment consideration, but the target amount and loss capacity are still missing.",
      explanationZh: "选择“需要更多信息”。较长期限可能支持考虑投资，但仍缺少目标金额和损失承受能力。"
    },
    {
      id: "misconception",
      type: "multipleChoice",
      prompt: "Why is ‘investing is simply a way to make more money’ incomplete?",
      zh: "为什么“投资只是赚更多钱的一种方式”是不完整的？",
      choices: [
        "It contains too many financial conditions",
        "It proves that investment is saving",
        "It ignores the financial goal, time horizon, access need and possible loss",
        "It explains the family goal fully"
      ],
      answer: 2,
      explanation: "A careful investment decision begins with the goal and its constraints, not return alone.",
      explanationZh: "谨慎的投资决定从目标及其限制开始，而不是只看回报。"
    },
    {
      id: "source-limit",
      type: "multipleChoice",
      prompt: "What can general investor guidance not decide for a family?",
      zh: "一般投资者指引不能替家庭决定什么？",
      choices: [
        "That investment involves risk",
        "That goals have time horizons",
        "That evidence should be checked",
        "Its exact priorities, investment choice and whether a particular loss is acceptable"
      ],
      answer: 3,
      explanation: "General guidance supports a method, but family-specific priorities and constraints still require evidence.",
      explanationZh: "一般指引支持一种方法，但家庭具体的优先级和限制仍需要证据。"
    },
    {
      id: "exit-judgement",
      type: "multipleChoice",
      prompt: "Which answer states a clear next step and justifies it with evidence?",
      zh: "哪一个答案说明了清晰的下一步，并用证据加以说明？",
      choices: [
        "Consider investing for the stated long-term goal because urgent access is not needed; first check what loss could delay the goal.",
        "Invest because returns are always positive.",
        "Choose the most popular investment before setting a goal.",
        "Avoid every investment because loss is possible."
      ],
      answer: 0,
      explanation: "The answer names the next step, connects it to the goal and gives access and loss conditions.",
      explanationZh: "该答案说明了下一步，把它与目标联系起来，并给出资金使用和损失条件。"
    }
  ]
};
