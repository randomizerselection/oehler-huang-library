window.INVEST = window.INVEST || {};

window.INVEST.quiz = {
  title: "Unit 1 Lesson 1 Quiz",
  description: "Review investment analysis, investment versus speculation, assets, risk and shares.",
  questions: [
    {
      id: "investment-analysis-definition",
      type: "multipleChoice",
      prompt: "Which response is investment analysis?",
      zh: "哪一个回应属于投资分析？",
      choices: [
        "Use source-dated evidence before judgement",
        "Check whether many people know the company",
        "Wait for the share price to rise first",
        "Ask classmates which share may rise"
      ],
      answer: 0,
      explanation: "The correct response turns a first opinion into a justified investment judgement supported by source-dated evidence.",
      explanationZh: "正确回应会把第一印象转化为由有来源和日期的证据支持的投资判断。"
    },
    {
      id: "investment-speculation",
      type: "multipleChoice",
      prompt: "Which action is closest to speculation?",
      zh: "哪一个行为最接近投机？",
      choices: [
        "Reading a dated annual report before judging",
        "Comparing risk and possible return",
        "Buying only because the price rose this morning",
        "Checking whether a company pays dividends"
      ],
      answer: 2,
      explanation: "Speculation often focuses on short-term price movement rather than evidence-based judgement.",
      explanationZh: "投机常常关注短期价格变动，而不是基于证据的判断。"
    },
    {
      id: "asset-definition",
      type: "fillBlank",
      prompt: "An asset is something with ________ that can be owned.",
      zh: "资产是具有________并且可以被拥有的东西。",
      acceptedAnswers: ["value"],
      explanation: "Assets have value; different assets carry different risks.",
      explanationZh: "资产具有价值；不同资产有不同风险。"
    },
    {
      id: "asset-type",
      type: "multipleChoice",
      prompt: "Which item is an asset type from the lesson?",
      zh: "哪一项是本课学到的资产类型？",
      choices: [
        "Cash and savings",
        "A classroom opinion",
        "A company slogan",
        "A random prediction"
      ],
      answer: 0,
      explanation: "Cash and savings are one simple asset type.",
      explanationZh: "现金和储蓄是一种简单资产类型。"
    },
    {
      id: "risk-ranking",
      type: "multipleChoice",
      prompt: "Why can asset risk rankings differ?",
      zh: "为什么资产风险排序可能不同？",
      choices: [
        "Because the exact asset, price, time and evidence matter",
        "Because all assets always have the same risk",
        "Because cash is always more risky than every share",
        "Because risk disappears if the company is famous"
      ],
      answer: 0,
      explanation: "Asset type matters, but the specific example and evidence also matter.",
      explanationZh: "资产类型重要，但具体例子和证据也重要。"
    },
    {
      id: "share-definition",
      type: "fillBlank",
      prompt: "A share is one unit of ________ in a company.",
      zh: "一股股票是公司中的一个________单位。",
      acceptedAnswers: ["ownership"],
      explanation: "A share is one ownership unit, not the whole company.",
      explanationZh: "一股股票是一个所有权单位，不是整家公司。"
    },
    {
      id: "share-gives",
      type: "multipleChoice",
      prompt: "What might a share give, depending on the company?",
      zh: "股票可能带来什么，取决于公司情况？",
      choices: [
        "Possible dividends",
        "Guaranteed profit",
        "Control of the whole company",
        "A risk-free return"
      ],
      answer: 0,
      explanation: "Some shares may pay dividends, but dividends are not guaranteed.",
      explanationZh: "有些股票可能支付股息，但股息不是保证的。"
    },
    {
      id: "tencent-decision",
      type: "multipleChoice",
      prompt: "Why is Tencent being familiar not enough reason to buy shares?",
      zh: "为什么熟悉腾讯不足以成为买入股票的理由？",
      choices: [
        "Familiarity is not evidence about value, risk or return",
        "Familiar companies cannot have shares",
        "Shares always guarantee profit",
        "Assets never carry risk"
      ],
      answer: 0,
      explanation: "The opening question needs investment analysis: evidence, risk, return and the meaning of a share.",
      explanationZh: "开头问题需要投资分析：证据、风险、回报以及股票的含义。"
    }
  ]
};
