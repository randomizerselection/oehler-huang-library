window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 1 Quiz",
  description: "Check whether students can define investment, return and financial goal, then connect a family goal to a reason and a condition.",
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
        "Choosing the product with the highest recent return"
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
        "Price change and income",
        "Goal priority and age",
        "Budget and tax",
        "Product name and popularity"
      ],
      answer: 0,
      explanation: "The course definition includes price change and income over a stated period.",
      explanationZh: "课程定义包括规定期间内的价格变化和收入。"
    },
    {
      id: "financial-goal-definition",
      type: "multipleChoice",
      prompt: "Which description is a complete financial goal?",
      zh: "哪一个描述是完整的财务目标？",
      choices: [
        "CNY 180,000 for university fees in six years, with high priority",
        "Make more money",
        "Buy an investment product soon",
        "Choose a high return"
      ],
      answer: 0,
      explanation: "A financial goal states a future use, amount, priority and time horizon.",
      explanationZh: "财务目标说明资金的未来用途、金额、优先级和投资期限。"
    },
    {
      id: "why-invest",
      type: "multipleChoice",
      prompt: "Which is the strongest reason a family might invest?",
      zh: "哪一个是家庭可能投资的最有力理由？",
      choices: [
        "To seek future return for a stated long-term goal while accepting possible loss",
        "To guarantee that every goal is reached",
        "To avoid identifying when the money is needed",
        "To copy a product chosen by another family"
      ],
      answer: 0,
      explanation: "The reason links investment to a stated goal, future return and possible loss.",
      explanationZh: "该理由把投资与明确目标、未来回报和可能损失联系起来。"
    },
    {
      id: "medical-goal",
      type: "multipleChoice",
      prompt: "Why may investment not help with a medical bill due in four months?",
      zh: "为什么投资可能无法帮助支付四个月后到期的医疗账单？",
      choices: [
        "The money must remain available soon, and a loss or delay could block the goal",
        "Medical goals never require money",
        "All investments need exactly thirty years",
        "A short horizon guarantees a gain"
      ],
      answer: 0,
      explanation: "A near-term, urgent goal creates a high need for access and little room for loss.",
      explanationZh: "近期且紧急的目标对资金使用有较高需求，几乎没有承受损失的空间。"
    },
    {
      id: "retirement-condition",
      type: "multipleChoice",
      prompt: "A retirement goal is thirty years away. Which condition is still missing?",
      zh: "退休目标在三十年后。仍然缺少哪一个条件？",
      choices: [
        "The target amount and the family's ability to accept loss",
        "Proof that every return will be positive",
        "A promise to choose one product today",
        "A list of classmates' opinions"
      ],
      answer: 0,
      explanation: "A long horizon may support investment consideration, but it does not remove the need for a target and loss check.",
      explanationZh: "较长期限可能支持考虑投资，但不会消除目标金额和损失检查的需要。"
    },
    {
      id: "misconception",
      type: "multipleChoice",
      prompt: "Why is ‘investing is simply a way to make more money’ incomplete?",
      zh: "为什么“投资只是赚更多钱的一种方式”是不完整的？",
      choices: [
        "It ignores the financial goal, time horizon, access need and possible loss",
        "It contains too many financial conditions",
        "It proves that investment is saving",
        "It explains the family goal fully"
      ],
      answer: 0,
      explanation: "A careful investment decision begins with the goal and its constraints, not return alone.",
      explanationZh: "谨慎的投资决定从目标及其限制开始，而不是只看回报。"
    },
    {
      id: "source-limit",
      type: "multipleChoice",
      prompt: "What can general investor guidance not decide for a family?",
      zh: "一般投资者指引不能替家庭决定什么？",
      choices: [
        "Its exact priorities, product choice and whether a particular loss is acceptable",
        "That investment involves risk",
        "That goals have time horizons",
        "That evidence should be checked"
      ],
      answer: 0,
      explanation: "General guidance supports a method, but family-specific priorities and constraints still require evidence.",
      explanationZh: "一般指引支持一种方法，但家庭具体的优先级和限制仍需要证据。"
    },
    {
      id: "exit-judgement",
      type: "multipleChoice",
      prompt: "Which answer includes both a reason to invest and a condition to check first?",
      zh: "哪一个答案同时包括投资理由和必须先检查的条件？",
      choices: [
        "Invest to seek future return for a stated goal, but first check when the money is needed and what loss could damage the goal.",
        "Invest because returns are always positive.",
        "Choose the most popular product before setting a goal.",
        "Avoid every investment because loss is possible."
      ],
      answer: 0,
      explanation: "The answer connects a future goal to return and qualifies the decision with horizon and loss conditions.",
      explanationZh: "该答案把未来目标与回报联系起来，并用期限和损失条件限定决定。"
    }
  ]
};
