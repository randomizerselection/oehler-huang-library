window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

const classificationCategories = [
  { title: "Investment", zhTitle: "投资", clue: "income and/or evidence about underlying value" },
  { title: "Speculation", zhTitle: "投机", clue: "predicted price change is the main basis" },
  { title: "Saving", zhTitle: "储蓄", clue: "capital preservation and liquidity" }
];

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment and Financial Decision-Making",
    lessonLabel: "Unit 1 Lesson 1: What is investment? — Investment generator",
    contentSource: "Investment Version 24 handout",
    notes: "A standalone generator comparison. It is not linked from the active course route."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 1",
      title: "What is investment?",
      zhTitle: "什么是投资？",
      prominentTitle: true,
      visual: investmentPhotos.definitionInvestmentGraphic,
      notes: "Handout Version 24 supplies the content sequence and terminology."
    },
    {
      type: "discussion",
      eyebrow: "First judgement",
      question: "Two people buy the same shares. Can one be investing while the other is speculating?",
      questionZh: "两个人买同样的股票。一个可能在投资，另一个可能在投机吗？",
      revealTitle: "Yes—their main purpose and expected payoff source can make the decisions different.",
      revealTitleZh: "可以——主要目的和预期回报来源可以使两个决定不同。",
      visual: investmentPhotos.speculatorInvestorRace
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本课结束时，你能够",
      phases: ["Define", "Distinguish", "Justify"],
      bullets: [
        "Define — Financial investment, speculation and saving",
        "Distinguish — Main purpose, payoff source, liquidity and possible loss",
        "Justify — A classification with one decisive clue"
      ],
      zhBullets: [
        "定义——金融投资、投机与储蓄",
        "区分——主要目的、回报来源、流动性与可能亏损",
        "论证——用一个决定性线索说明分类"
      ]
    },
    {
      type: "section",
      eyebrow: "Part 1",
      title: "Financial investment",
      zhTitle: "金融投资"
    },
    {
      type: "visualPause",
      title: "Money enters an asset; future gain or loss remains uncertain",
      visual: investmentPhotos.definitionInvestmentGraphic,
      notes: "Ask students what goes into the asset and what may come back."
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Financial investment",
      term: "Financial investment",
      termZh: "金融投资",
      keywordVisuals: [
        { label: "Asset and uncertain future return", labelZh: "资产与不确定的未来回报", visual: investmentPhotos.definitionInvestmentGraphic }
      ],
      definition: "Financial investment means putting money into an asset to seek future total return. Evidence can support the expectation, but possible loss remains.",
      definitionZh: "金融投资是把钱投入资产以寻求未来总回报。证据可以支持预期，但仍可能亏损。",
      examples: [
        { text: "Shares: dividends or capital gain; price and dividends can fall.", zh: "股票：股息或资本利得；价格与股息也可能下降。" },
        { text: "Bonds: coupon interest; default or a lower sale price can cause loss.", zh: "债券：票息；违约或售价下降可造成亏损。" },
        { text: "Property or index fund: income or gain; costs, fees or falling values reduce return.", zh: "房产或指数基金：收入或利得；成本、费用或价值下跌会降低回报。" }
      ]
    },
    {
      type: "visualGrid",
      eyebrow: "Structured examples",
      title: "Compare return sources and loss routes",
      zhTitle: "比较回报来源与亏损途径",
      prompt: "Total return = income + change in market value. Identify one possible return source and one loss route for each asset.",
      promptZh: "总回报 = 收入 + 市场价值的变化。为每种资产找出一种可能的回报来源和一种亏损途径。",
      visualGridStyle: "goalComparison",
      revealCardLabels: true,
      cards: [
        {
          title: "Stocks",
          zhTitle: "股票",
          body: "Return: dividends; possible capital gain. Loss: price falls or dividends are reduced.",
          visual: investmentPhotos.assetSharesScreen
        },
        {
          title: "Bonds",
          zhTitle: "债券",
          body: "Return: coupon interest; possible capital gain. Loss: missed payments, default or a lower sale price.",
          visual: investmentPhotos.annualReports
        },
        {
          title: "Property",
          zhTitle: "房产",
          body: "Return: net rental income; possible capital gain. Loss: vacancy, costs or a lower sale price.",
          visual: investmentPhotos.assetPropertyBuilding
        },
        {
          title: "Index fund",
          zhTitle: "指数基金",
          body: "Return: income if any; possible capital gain. Loss: fund value falls or fees reduce return.",
          visual: investmentPhotos.keywordEtfKeyboard
        }
      ]
    },
    {
      type: "quiz",
      eyebrow: "Practice check",
      title: "What is the strongest evidence that a decision is a financial investment?",
      zhTitle: "什么证据最能说明一个决定属于金融投资？",
      choices: [
        "The asset has risen in price before.",
        "Expected income and/or evidence about underlying value is the main basis, while possible loss is accepted.",
        "The money can be withdrawn immediately with no possible loss.",
        "The buyer plans to sell after an unverified rumour."
      ],
      answer: 1,
      explanation: "Investment is identified by the decision's main basis and accepted loss risk, not by past price rises.",
      explanationZh: "投资取决于决定的主要依据和所接受的亏损风险，而不是过去的价格上涨。"
    },
    {
      type: "section",
      eyebrow: "Part 2",
      title: "Speculation",
      zhTitle: "投机"
    },
    {
      type: "visualPause",
      title: "A trade driven by a predicted price move",
      visual: investmentPhotos.lesson1ScenarioSmartphoneCandlestick,
      notes: "Ask what would have to happen to the price for the trader to profit."
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Speculation",
      term: "Speculation",
      termZh: "投机",
      keywordVisuals: [
        { label: "Predicted price change", labelZh: "预测的价格变动", visual: investmentPhotos.lesson1ScenarioSmartphoneCandlestick }
      ],
      definition: "Speculation means trading mainly to profit from a predicted price change. Income or underlying value is not the main basis for the trade.",
      definitionZh: "投机是主要为了从预测的价格变动中获利而交易。收入或基础价值不是交易的主要依据。",
      examples: [
        { text: "Buy shares mainly because of an unverified rumour.", zh: "主要因为未经核实的传闻而买入股票。" },
        { text: "Buy gold mainly for a rapid resale gain.", zh: "买入黄金主要为了快速转售获利。" },
        { text: "Trade foreign currency after a researched exchange-rate prediction; research does not change the main payoff source.", zh: "根据研究过的汇率预测交易外币；研究不会改变主要回报来源。" }
      ]
    },
    {
      type: "yesNoCheck",
      eyebrow: "Boundary check",
      title: "Vote yes or no.",
      zhTitle: "投票：是或否。",
      classroomLargeText: true,
      items: [
        {
          text: "A short holding period automatically makes a trade speculation.",
          zh: "持有期短会自动使交易成为投机。",
          answer: false,
          answerZh: "否",
          reason: "Holding period can be a clue, but the main purpose and payoff source decide the classification.",
          reasonZh: "持有期可以是线索，但主要目的和回报来源决定分类。"
        },
        {
          text: "Careful research can support a speculative price prediction.",
          zh: "认真研究可以支持投机性的价格预测。",
          answer: true,
          answerZh: "是",
          reason: "Research quality and classification are separate questions.",
          reasonZh: "研究质量与分类是两个不同问题。"
        },
        {
          text: "Any risky asset purchase is speculation.",
          zh: "购买任何有风险的资产都属于投机。",
          answer: false,
          answerZh: "否",
          reason: "Financial investment also involves possible loss; the main basis remains decisive.",
          reasonZh: "金融投资也可能亏损；主要依据仍是决定性因素。"
        }
      ]
    },
    {
      type: "section",
      eyebrow: "Part 3",
      title: "Saving",
      zhTitle: "储蓄"
    },
    {
      type: "visualPause",
      title: "Money kept safe and accessible for a future need",
      visual: investmentPhotos.assetCashSavings,
      notes: "Ask why immediate access may matter more than a higher expected return."
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Saving",
      term: "Saving",
      termZh: "储蓄",
      keywordVisuals: [
        { label: "Capital preservation and liquidity", labelZh: "保本与流动性", visual: investmentPhotos.assetCashSavings }
      ],
      definition: "Saving is current income not spent now. Saving emphasises capital preservation and liquidity.",
      definitionZh: "储蓄是当前没有支出的收入。储蓄强调保本与流动性。",
      examples: [
        { text: "Keep an emergency fund in an easy-access account.", zh: "把应急资金放在灵活存取账户。" },
        { text: "Hold examination-fee money in a bank deposit.", zh: "把考试费存入银行存款。" },
        { text: "Keep a short-term cash buffer that earns modest interest; interest does not automatically make it investment.", zh: "保留赚取适度利息的短期现金缓冲；利息不会自动使其成为投资。" }
      ]
    },
    {
      type: "compare",
      eyebrow: "Structured comparison",
      title: "Distinguish investment from saving",
      zhTitle: "区分投资与储蓄",
      leftTitle: "Financial investment",
      leftTitleZh: "金融投资",
      leftVisual: investmentPhotos.definitionInvestmentGraphic,
      left: [
        { label: "1", text: "Main aim: seek future total return" },
        { label: "2", text: "Payoff: income and/or change in market value" },
        { label: "3", text: "Possible loss is accepted" },
        { label: "4", text: "Evidence supports, but cannot guarantee, the return" }
      ],
      rightTitle: "Saving",
      rightTitleZh: "储蓄",
      rightVisual: investmentPhotos.assetCashSavings,
      right: [
        { label: "1", text: "Main act: current income is not spent now" },
        { label: "2", text: "Priority: capital preservation and liquidity" },
        { label: "3", text: "Money is kept for a future need or ready access" },
        { label: "4", text: "Interest can be earned without changing the main purpose" }
      ],
      prompt: "Classify by the main purpose and priority, not by whether interest is paid.",
      promptZh: "根据主要目的和优先事项分类，而不是根据是否支付利息。"
    },
    {
      type: "quiz",
      eyebrow: "Practice check",
      title: "Which statement about saving is correct?",
      zhTitle: "关于储蓄，哪一项正确？",
      choices: [
        "Earning interest automatically changes saving into financial investment.",
        "Saving cannot lose purchasing power.",
        "Capital preservation and liquidity can matter more than a high return.",
        "Saving always means holding cash at home."
      ],
      answer: 2,
      explanation: "Saving can earn interest and can lose purchasing power; its main priorities are capital preservation and liquidity.",
      explanationZh: "储蓄可以赚取利息，也可能失去购买力；其主要优先事项是保本与流动性。"
    },
    {
      type: "section",
      eyebrow: "Part 4",
      title: "Three-way classification",
      zhTitle: "三类决定的分类"
    },
    {
      type: "conceptTriad",
      eyebrow: "Comparison grid",
      title: "Use the main basis of the decision",
      zhTitle: "根据决定的主要依据分类",
      visual: investmentPhotos.businessChartsPaper,
      revealDetails: true,
      concepts: [
        {
          label: "Investment",
          tag: "Total return",
          definition: "Money enters an asset to seek future total return.",
          definitionZh: "把钱投入资产以寻求未来总回报。",
          purpose: "Seek income and/or value growth",
          risk: "Possible loss accepted",
          time: "Holding period alone does not decide",
          example: "Analysed diversified fund"
        },
        {
          label: "Speculation",
          tag: "Price prediction",
          definition: "Trading depends mainly on a predicted price change.",
          definitionZh: "交易主要依赖预测的价格变动。",
          purpose: "Profit from the price move",
          risk: "Prediction may be wrong",
          time: "Often short, but not defined by time alone",
          example: "Rumour-driven rapid resale"
        },
        {
          label: "Saving",
          tag: "Safety and access",
          definition: "Current income is not spent now.",
          definitionZh: "当前收入没有在现在支出。",
          purpose: "Keep money for future use",
          risk: "Preserve capital; purchasing power may fall",
          time: "Often near-term or uncertain need",
          example: "Emergency fund"
        }
      ],
      prompt: "The asset name, interest payment or holding period cannot decide the category alone.",
      promptZh: "资产名称、利息支付或持有期都不能单独决定类别。"
    },
    {
      type: "classificationTask",
      eyebrow: "Practice 1",
      title: "Classify the decisions",
      zhTitle: "给这些决定分类",
      compact: true,
      categories: classificationCategories,
      items: [
        {
          label: "A",
          text: "Amina studies profits, cash flow and debt before buying a diversified share portfolio. She expects dividends and evidence-supported long-term value growth.",
          answer: "Investment",
          answerZh: "投资",
          reason: "Income and evidence about underlying value are the main basis."
        },
        {
          label: "B",
          text: "Bao borrows after an online rumour predicts a price rise next week. He plans to sell after an announcement.",
          answer: "Speculation",
          answerZh: "投机",
          reason: "The trade depends mainly on a rumoured short-term price change."
        },
        {
          label: "C",
          text: "Chloe estimates rent, maintenance and vacancy costs, then buys a flat mainly for net rental income.",
          answer: "Investment",
          answerZh: "投资",
          reason: "Expected income and evidence about costs are the main basis."
        },
        {
          label: "D",
          text: "Daniel needs examination-fee money in eight months, so he uses an easy-access account for safety and liquidity.",
          answer: "Saving",
          answerZh: "储蓄",
          reason: "Capital preservation and access for a known need dominate."
        }
      ]
    },
    {
      type: "classificationTask",
      eyebrow: "Practice 2",
      title: "Classify the decisions",
      zhTitle: "给这些决定分类",
      compact: true,
      categories: classificationCategories,
      items: [
        {
          label: "E",
          text: "Eva uses a diversified fund for university in ten years after reviewing fees and risks. She accepts a possible fall in market value.",
          answer: "Investment",
          answerZh: "投资",
          reason: "She seeks long-term asset return with evidence and accepted loss risk."
        },
        {
          label: "F",
          text: "Farah keeps an emergency fund in an easy-access account. Quick withdrawal matters more than return.",
          answer: "Saving",
          answerZh: "储蓄",
          reason: "Liquidity and capital preservation are the priorities."
        },
        {
          label: "G",
          text: "George buys a bond fund for retirement after checking interest income, credit risk, interest-rate risk and fees.",
          answer: "Investment",
          answerZh: "投资",
          reason: "Expected income, risk evidence and accepted possible loss support the decision."
        }
      ]
    },
    {
      type: "classificationTask",
      eyebrow: "Practice 3",
      title: "Classify the decisions",
      zhTitle: "给这些决定分类",
      compact: true,
      categories: classificationCategories,
      items: [
        {
          label: "H",
          text: "Hadi buys Bitcoin after an influencer predicts a weekend price jump. He will sell immediately if it happens.",
          answer: "Speculation",
          answerZh: "投机",
          reason: "A predicted rapid price change is the main payoff source."
        },
        {
          label: "I",
          text: "Iris buys foreign currency before a central-bank announcement. Her expected gain depends on an exchange-rate prediction.",
          answer: "Speculation",
          answerZh: "投机",
          reason: "The trade is mainly a researched price prediction, so it remains speculation."
        },
        {
          label: "J",
          text: "Jun needs tuition money in three months, so he uses an easy-access account for safety and liquidity.",
          answer: "Saving",
          answerZh: "储蓄",
          reason: "The near-term need makes capital preservation and liquidity decisive."
        }
      ]
    },
    {
      type: "quiz",
      eyebrow: "Boundary check",
      title: "Why might two people buying the same asset be in different categories?",
      zhTitle: "为什么买同一种资产的两个人可能属于不同类别？",
      choices: [
        "The asset name decides the category.",
        "The person paying the higher price is the speculator.",
        "One relies mainly on income and/or evidence about value; the other mainly on a price prediction.",
        "The person planning to sell sooner is always the speculator."
      ],
      answer: 2,
      explanation: "The decision's main basis matters more than the asset name, purchase price or holding period alone.",
      explanationZh: "决定的主要依据比资产名称、买入价格或持有期本身更重要。",
      visual: investmentPhotos.speculatorInvestorRace
    },
    {
      type: "section",
      eyebrow: "Part 5",
      title: "Written application",
      zhTitle: "书面应用"
    },
    {
      type: "comparisonMatrix",
      eyebrow: "Short answer",
      title: "Compare Mina and Leo",
      zhTitle: "比较Mina与Leo",
      revealCells: true,
      cornerLabel: "Decision clue",
      columns: [
        { label: "Mina", note: "CNY 500; no emergency money" },
        { label: "Leo", note: "Laptop needed in six months" }
      ],
      rows: [
        { label: "Known need", values: ["Emergency protection", "Laptop purchase"] },
        { label: "Liquidity", values: ["Money must stay accessible", "Money is needed on a known date"] },
        { label: "Loss capacity", values: ["Very limited", "Cannot afford a loss"] },
        { label: "Classification", values: ["Save some before investing", "Save rather than invest"] }
      ],
      prompt: "Choose one case. Explain the decision using at least two terms: emergency fund, time horizon, liquidity, capital preservation or possible loss.",
      promptZh: "选择一个案例。至少使用两个术语解释决定：应急资金、投资期限、流动性、保本或可能亏损。"
    },
    {
      type: "discussion",
      eyebrow: "Short answer",
      question: "Nora borrows to buy shares after an unverified rumour and will sell tomorrow if the price rises. What makes this speculation, and how can borrowing worsen the loss?",
      questionZh: "Nora因未经核实的传闻借钱买股，若明天涨价就卖出。为什么这是投机？借款如何加重亏损？",
      revealTitle: "The trade relies mainly on a rumoured price prediction, and Nora must repay the borrowed money even if the shares fall.",
      revealTitleZh: "交易主要依赖传闻中的价格预测；即使股价下跌，Nora仍必须偿还借入资金。",
      visual: investmentPhotos.lesson1ScenarioSmartphoneCandlestick
    },
    {
      type: "judgementFrame",
      eyebrow: "Output rehearsal",
      title: "Build Nora's answer",
      zhTitle: "组织Nora案例的答案",
      revealAnswers: true,
      stages: [
        {
          label: "Classify",
          labelZh: "分类",
          prompt: "State the category.",
          zh: "写出类别。",
          answer: "Speculation."
        },
        {
          label: "Use evidence",
          labelZh: "使用证据",
          prompt: "Identify the main payoff source.",
          zh: "找出主要回报来源。",
          answer: "A price rise predicted by an unverified rumour."
        },
        {
          label: "Reject investment",
          labelZh: "排除投资",
          prompt: "Explain why investment is the weaker category.",
          zh: "解释为什么投资不是更合适的类别。",
          answer: "Income and evidence about underlying value are not the main basis."
        },
        {
          label: "Add borrowing risk",
          labelZh: "补充借款风险",
          prompt: "Explain the repayment obligation.",
          zh: "解释偿还义务。",
          answer: "The debt remains even if the asset value falls."
        }
      ],
      finalPrompt: "Write one connected paragraph using speculation, rumour, price prediction, borrowed money, repayment obligation and possible loss.",
      finalPromptZh: "用投机、传闻、价格预测、借入资金、偿还义务与可能亏损写一个连贯段落。"
    },
    {
      type: "classificationTask",
      eyebrow: "Exit ticket",
      title: "Classify, cite, distinguish",
      zhTitle: "分类、引用线索、作出区分",
      compact: true,
      categories: classificationCategories,
      items: [
        {
          label: "1",
          text: "School-fee money is kept in an easy-access deposit that earns interest.",
          answer: "Saving",
          answerZh: "储蓄",
          reason: "The main priorities are capital preservation and liquidity; interest does not reclassify it."
        },
        {
          label: "2",
          text: "Shares are bought after analysing profits and debt, mainly for dividends and long-term value growth.",
          answer: "Investment",
          answerZh: "投资",
          reason: "Expected income and evidence about underlying value are the main basis."
        },
        {
          label: "3",
          text: "The same shares are bought mainly because a rumour predicts a price rise tomorrow.",
          answer: "Speculation",
          answerZh: "投机",
          reason: "A predicted price change, not income or underlying value, is the main basis."
        }
      ],
      sharePrompt: "For one answer, cite the decisive clue and explain why the nearest category is weaker.",
      sharePromptZh: "选择一个答案，引用决定性线索，并解释为什么相近类别较弱。"
    }
  ]
};
