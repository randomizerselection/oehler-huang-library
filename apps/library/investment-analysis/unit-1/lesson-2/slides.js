window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment and Financial Decision-Making",
    lessonLabel: "Unit 1 Lesson 2: How do goals change investment decisions?",
    deliveryPlan: {
      coreRoute: "Teach in one standard period; section dividers are transitions, not separate activities.",
      phaseShares: { launchAndRetrieval: "15%", keyIdeaAndPractice: "30%", smgCoreLab: "40%", outputAndExit: "15%" },
      optionalReinforcementSlides: ["Which question comes first?", "What can official guidance decide?", "Vote yes or no."],
      rule: "If time is short, skip the optional reinforcement slides; never cut the goal comparison, SMG core lab or individual exit judgement."
    },
    sources: [
      {
        label: "Investor.gov: Time Horizon",
        note: "Supports defining time horizon as the period available to invest for a financial goal.",
        date: "Accessed 16 July 2026",
        url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/time-horizon"
      },
      {
        label: "Investor.gov: Asset Allocation",
        note: "Supports the relationship between time horizon, risk tolerance and broad investment choices.",
        date: "Accessed 16 July 2026",
        url: "https://www.investor.gov/introduction-investing/getting-started/asset-allocation"
      },
      {
        label: "IFEC: Building an investment portfolio",
        note: "Supports checking purpose, time horizon, liquidity needs, financial resources and risk tolerance before choosing investments.",
        date: "Published 1 April 2016; accessed 16 July 2026",
        url: "https://www.ifec.org.hk/web/en/moneyessentials/financial-planning/building-an-investment-portfolio.page"
      },
      {
        label: "Hong Kong Monetary Authority: Investment Services",
        note: "Supports checking objectives, investment horizon, possible loss and suitability before making an investment decision.",
        date: "Page revised 7 January 2026; accessed 16 July 2026",
        url: "https://www.hkma.gov.hk/eng/smart-consumers/investment-services/"
      },
      {
        label: "Frozen mainland China three-goal family profile",
        note: "A hypothetical university, home and retirement comparison used only to practise time-horizon, liquidity and suitability judgements.",
        date: "Frozen 16 July 2026",
        url: "Local classroom scenario"
      }
    ]
  },
  stockMarketGame: {
    phase: 1,
    integrationLevel: "required formative course lab",
    studentAction: "Turn the team purpose into explicit goal, time-horizon and liquidity rules that will govern later portfolio decisions.",
    requiredOutput: "Revisit Workbook pp. 5-6 and complete the individual exit judgement; add a team-log row for the revised goal and liquidity rule.",
    workbook: {
      pages: "5-6",
      treatment: "revisit with course addition",
      studentAction: "Revisit the completed short- and long-term goal tables; add liquidity need beside each goal."
    },
    dataRule: "Use the frozen team mandate written in Lesson 1; no order is entered before the Lesson 17 launch gate."
  },
  handout: {
    title: "How do goals change investment decisions?",
    subtitle: "Unit 1 Lesson 2",
    description: "Exam revision / 考试复习：complete the bilingual definitions during the lesson, then revise the numbered knowledge points.",
    sections: [
      {
        label: "1",
        title: "Key definitions / 核心定义",
        instruction: "Complete the English key terms during the lesson; use the Chinese line to check meaning.",
        blocks: [
          {
            type: "bilingualDefinitions",
            items: [
              {
                term: "Time horizon",
                termZh: "投资期限",
                prompt: "Time horizon is the __________ before invested money is expected to be __________.",
                answers: ["period", "needed"],
                definitionZh: "投资期限是预计需要使用已投资资金之前的时间。"
              },
              {
                term: "Liquidity need",
                termZh: "流动性需求",
                prompt: "Liquidity need is the need to access money __________ without accepting a large __________ or __________.",
                answers: ["quickly", "loss", "delay"],
                definitionZh: "流动性需求是无需承受重大损失或延迟即可快速取用资金的需要。"
              },
              {
                term: "Suitability",
                termZh: "适合度",
                prompt: "Suitability is the degree to which an investment matches a person's __________, __________, __________ and ability to accept __________.",
                answers: ["goal", "horizon", "liquidity need", "loss"],
                definitionZh: "适合度是投资与个人目标、期限、流动性需求和承受损失能力相匹配的程度。"
              }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Numbered revision points / 编号复习要点",
        instruction: "Memorise these six bilingual examinable statements.",
        blocks: [
          {
            type: "bilingualNumberedKnowledge",
            points: [
              { en: "Begin with the financial goal, time horizon and liquidity need rather than a preferred investment.", zh: "投资决策应从财务目标、投资期限和流动性需求开始，而不是从偏好的投资选择开始。" },
              { en: "A shorter or fixed horizon makes reliable access more important because a loss could block the goal.", zh: "较短或固定的期限使可靠取用资金更重要，因为损失可能阻碍目标实现。" },
              { en: "Suitability depends on the match between the goal, horizon, liquidity need and ability to accept loss.", zh: "适合度取决于投资与目标、期限、流动性需求和承受损失能力之间的匹配。" },
              { en: "A long horizon may allow more recovery time, but it does not make every investment suitable.", zh: "较长期限可能提供更多恢复时间，但并不意味着每项投资都适合。" },
              { en: "Different goals may require different investment choices because their constraints differ.", zh: "不同目标可能需要不同的投资选择，因为它们的限制条件不同。" },
              { en: "The investment with the highest possible return does not fit every goal.", zh: "可能回报最高的投资并不适合每一个目标。" }
            ]
          }
        ]
      }
    ],
    sources: "Definitions and lesson principles align with Investor.gov, IFEC and HKMA guidance accessed 16 July 2026. Student activities remain in the SMG workbook and team evidence log."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 2",
      title: "How do goals change investment decisions?",
      zhTitle: "目标如何改变投资决定？",
      prominentTitle: true,
      visual: investmentPhotos.lesson2HomeKey,
      notes: [
        "Keep the title screen simple.",
        "Teams retrieve the mock investment purpose written in Lesson 1.",
        "Move immediately to the university-versus-retirement judgement."
      ]
    },
    {
      type: "discussion",
      eyebrow: "First judgement",
      question: "Should money for university in three years be invested like retirement money needed in thirty years?",
      questionZh: "三年后用于大学的资金，是否应该像三十年后才需要的退休资金一样投资？",
      revealTitle: "The two goals should not automatically use the same investment choice.",
      revealTitleZh: "这两个目标不应自动采用相同的投资选择。",
      visual: investmentPhotos.lesson2RetirementCouple,
      notes: [
        "Take same/different votes before reveal.",
        "Ask for one reason only; do not teach the terms yet."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本课结束时，你能够",
      visual: investmentPhotos.lesson2UniversityStudents,
      phases: ["Define", "Compare", "Write"],
      bullets: [
        "Define time horizon, liquidity need and suitability",
        "Compare three goals by time, access and possible loss",
        "Write team rules and an individual judgement"
      ],
      zhBullets: [
        "定义投资期限、流动性需求与适合度",
        "按期限、资金使用与可能损失比较三个目标",
        "写出团队规则和个人判断"
      ]
    },
    {
      type: "answer",
      eyebrow: "Lesson 1 retrieval",
      title: "Recall the goal-first rule",
      zhTitle: "回忆目标优先规则",
      items: [
        {
          prompt: "Investment seeks future return while accepting possible __________.",
          answer: "loss",
          zh: "投资寻求未来回报，同时接受可能发生的__________。",
          answerZh: "损失"
        },
        {
          prompt: "A financial goal states a use, amount, priority and time __________.",
          answer: "horizon",
          zh: "财务目标说明用途、金额、优先级和投资__________。",
          answerZh: "期限"
        },
        {
          prompt: "Before comparing investments, define the financial __________.",
          answer: "goal",
          zh: "在比较投资之前，应先明确财务__________。",
          answerZh: "目标"
        }
      ],
      notes: "Students answer without notes, then explain which missing word matters most for the opening dilemma."
    },
    {
      type: "section",
      eyebrow: "Part 1",
      title: "Goal constraints",
      zhTitle: "目标限制条件",
      notes: "Try first -> define time -> define access -> define fit -> check the method."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      question: "Besides the date, what else makes university and retirement money different?",
      questionZh: "除了日期，大学资金和退休资金还有什么不同？",
      revealTitle: "The family should compare access needs, date flexibility and the consequence of loss.",
      revealTitleZh: "家庭应比较资金使用需要、日期灵活性和损失后果。",
      visual: investmentPhotos.lesson2UniversityStudents
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Time horizon",
      term: "Time horizon",
      termZh: "投资期限",
      keywordVisuals: [
        { label: "Time until the money is needed", labelZh: "距离需要资金的时间", visual: investmentPhotos.definitionTimeHorizonGraphic }
      ],
      definition: "Time horizon is the period before invested money is expected to be needed.",
      definitionBlanks: ["period", "invested money", "needed"],
      definitionZh: "投资期限是预计需要使用已投资资金之前的时间。",
      examples: [
        { text: "School trip money needed in 8 months", zh: "8个月后需要的研学旅行资金" },
        { text: "University fees needed in 3 years", zh: "3年后需要的大学费用" },
        { text: "Retirement money needed in 30 years", zh: "30年后需要的退休资金" }
      ]
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Liquidity need",
      term: "Liquidity need",
      termZh: "流动性需求",
      keywordVisuals: [
        { label: "Quick access to money", labelZh: "快速取用资金", visual: investmentPhotos.definitionLiquidityNeedGraphic }
      ],
      definition: "Liquidity need is the need to access money quickly without accepting a large loss or delay.",
      definitionBlanks: ["access money quickly", "large loss", "delay"],
      definitionZh: "流动性需求是无需承受重大损失或延迟即可快速取用资金的需要。",
      examples: [
        { text: "Emergency money may need same-day access.", zh: "应急资金可能需要当天取用。" },
        { text: "A fixed university payment needs reliable access on its due date.", zh: "固定日期的大学费用需要在到期日可靠取用。" },
        { text: "Retirement money in 30 years has a lower current access need.", zh: "30年后使用的退休资金当前取用需要较低。" }
      ]
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Suitability",
      term: "Suitability",
      termZh: "适合度",
      keywordVisuals: [
        { label: "A choice that matches the person and goal", labelZh: "与个人和目标相匹配的选择", visual: investmentPhotos.definitionSuitabilityGraphic }
      ],
      definition: "Suitability is the degree to which an investment matches a person's goal, horizon, liquidity need and ability to accept loss.",
      definitionBlanks: ["goal", "horizon", "liquidity need", "ability to accept loss"],
      definitionZh: "适合度是投资与个人目标、期限、流动性需求和承受损失能力相匹配的程度。",
      examples: [
        { text: "Accessible cash may suit money needed for an emergency.", zh: "可随时取用的现金可能适合应急资金。" },
        { text: "A volatile share may not suit tuition due on a fixed date soon.", zh: "波动较大的股票可能不适合近期固定日期到期的学费。" },
        { text: "A diversified fund may fit a long horizon only if possible loss is acceptable.", zh: "只有在能够承受可能损失时，分散化基金才可能适合较长期限。" }
      ]
    },
    {
      type: "flow",
      eyebrow: "Decision method",
      title: "What changes when the goal changes?",
      zhTitle: "目标改变时，哪些条件会改变？",
      flowStyle: "decisionChecks",
      revealSteps: true,
      steps: [
        {
          title: "Time",
          titleZh: "期限",
          body: "Check when the money is needed and whether the date can move.",
          zh: "检查何时需要资金，以及日期能否调整。",
          visual: investmentPhotos.definitionTimeHorizonGraphic
        },
        {
          title: "Access",
          titleZh: "资金使用",
          body: "Check how quickly and reliably the money must be available.",
          zh: "检查资金需要多快、多可靠地保持可用。",
          visual: investmentPhotos.definitionLiquidityNeedGraphic
        },
        {
          title: "Possible loss",
          titleZh: "可能损失",
          body: "Check whether a loss could delay or prevent the goal.",
          zh: "检查损失是否会推迟或阻碍目标。",
          visual: investmentPhotos.lesson1ScenarioRedMarketLosses
        }
      ]
    },
    {
      type: "quiz",
      eyebrow: "Hinge question",
      title: "Which question comes first?",
      zhTitle: "哪一个问题应先提出？",
      choices: [
        "Which investment earned the highest return last year?",
        "When is the money needed, and what loss or delay can the goal accept?",
        "Which investment is most popular online?",
        "How often can the price be checked?"
      ],
      answer: 1,
      explanation: "Define the goal constraints before comparing investment choices.",
      explanationZh: "应先明确目标限制条件，再比较投资选择。"
    },
    {
      type: "section",
      eyebrow: "Part 2",
      title: "Comparing financial goals",
      zhTitle: "比较财务目标",
      notes: "Meet the three goals -> rank access need -> compare two goals -> check guidance and misconceptions."
    },
    {
      type: "visualGrid",
      visualGridStyle: "goalComparison",
      eyebrow: "Frozen family profile",
      title: "Meet the three goals",
      zhTitle: "认识三个目标",
      prompt: "Notice when the money is needed and how fixed the date is.",
      promptZh: "注意何时需要资金，以及日期是否固定。",
      showCardNumbers: false,
      cards: [
        {
          title: "University",
          zhTitle: "大学",
          body: "CNY 240,000 · 3 years · fixed date",
          bodyZh: "24万元人民币 · 3年 · 日期固定",
          visual: investmentPhotos.lesson2UniversityStudents
        },
        {
          title: "Home deposit",
          zhTitle: "购房首付",
          body: "CNY 500,000 · 8 years · ±2 years",
          bodyZh: "50万元人民币 · 8年 · 可调整2年",
          visual: investmentPhotos.lesson2HomeKey
        },
        {
          title: "Retirement",
          zhTitle: "退休",
          body: "30 years · amount and withdrawals not set",
          bodyZh: "30年 · 金额和提取安排未定",
          visual: investmentPhotos.lesson2RetirementCouple
        }
      ],
      notes: "This is a frozen classroom scenario, not personal advice. Students identify the time and access evidence before naming any investment."
    },
    {
      type: "rankingTask",
      eyebrow: "Liquidity ranking",
      title: "Rank the goals by current access need",
      zhTitle: "按当前资金使用需要排列目标",
      prompt: "Rank from highest current need to lowest.",
      promptZh: "从当前需要最高排到最低。",
      axis: {
        low: "Highest need",
        lowZh: "需要最高",
        high: "Lowest need",
        highZh: "需要最低",
        showNote: false
      },
      items: [
        { label: "A", text: "Retirement in thirty years", zh: "三十年后退休" },
        { label: "B", text: "University in three years on a fixed date", zh: "三年后在固定日期上大学" },
        { label: "C", text: "Home deposit in eight years with date flexibility", zh: "八年后购房，日期可以调整" }
      ],
      revealLabel: "One defensible ranking",
      revealLabelZh: "一种合理排序",
      modelOrder: [
        { rank: "1", label: "B", text: "University", zh: "大学", reason: "It has the earliest fixed payment date.", reasonZh: "它的固定付款日期最早。" },
        { rank: "2", label: "C", text: "Home deposit", zh: "购房首付", reason: "It is later and the date can move.", reasonZh: "时间较晚，而且日期可以调整。" },
        { rank: "3", label: "A", text: "Retirement", zh: "退休", reason: "The money is not needed soon.", reasonZh: "近期不需要这笔钱。" }
      ],
      caveat: "This ranks access need; it does not choose an investment.",
      caveatZh: "这里只排列资金使用需要，并不选择投资。"
    },
    {
      type: "compare",
      eyebrow: "Goal comparison",
      title: "Compare university and retirement",
      zhTitle: "比较大学目标与退休目标",
      mode: "fillBlanks",
      leftTitle: "University in three years",
      leftTitleZh: "三年后上大学",
      left: [
        { label: "1", text: "The horizon is relatively __________.", answer: "short", zh: "期限相对__________。", answerZh: "较短" },
        { label: "2", text: "A loss near the fixed date could block the __________.", answer: "goal", zh: "临近固定日期的损失可能阻碍__________。", answerZh: "目标" }
      ],
      rightTitle: "Retirement in thirty years",
      rightTitleZh: "三十年后退休",
      right: [
        { label: "1", text: "The horizon is relatively __________.", answer: "long", zh: "期限相对__________。", answerZh: "较长" },
        { label: "2", text: "The target amount and later __________ needs are missing.", answer: "withdrawal", zh: "目标金额和之后的__________需要尚不明确。", answerZh: "提取" }
      ],
      prompt: "Complete the contrast before judging suitability.",
      promptZh: "先完成对比，再判断适合度。"
    },
    {
      type: "sourceLens",
      eyebrow: "Official guidance",
      title: "What can official guidance decide?",
      zhTitle: "官方指引能决定什么？",
      revealAnswers: true,
      metaItems: [
        { label: "Source", value: "Hong Kong Monetary Authority: Investment Services" },
        { label: "Revised", value: "7 January 2026" },
        { label: "Scope", value: "Investment objectives, horizon, possible loss and suitability" },
        { label: "Use here", value: "A method for checking the frozen family goals" }
      ],
      checks: [
        {
          label: "Use",
          prompt: "What does the guidance support?",
          zh: "该指引支持什么？",
          answer: "Check the goal, horizon and possible loss before making an investment decision.",
          answerZh: "作出投资决定前，应检查目标、期限和可能损失。"
        },
        {
          label: "Limit",
          prompt: "What can it not decide?",
          zh: "它不能决定什么？",
          answer: "It cannot choose a named investment or decide what loss this family can accept.",
          answerZh: "它不能选择具体投资，也不能决定这个家庭能承受多大损失。"
        }
      ],
      task: "State one useful point and one limit.",
      taskZh: "说出一个有用要点和一个局限。"
    },
    {
      type: "yesNoCheck",
      eyebrow: "Misconception check",
      title: "Vote yes or no.",
      zhTitle: "投票：是或否。",
      classroomLargeText: true,
      items: [
        {
          text: "High possible return may not fit money needed soon.",
          zh: "较高的可能回报未必适合很快需要的资金。",
          answer: true,
          answerZh: "是",
          reason: "A loss or delay could damage the near-term goal.",
          reasonZh: "损失或延迟可能损害近期目标。"
        },
        {
          text: "A thirty-year horizon allows unlimited loss.",
          zh: "三十年的期限允许无限损失。",
          answer: false,
          answerZh: "否",
          reason: "A long horizon does not remove loss or suitability limits.",
          reasonZh: "较长期限不会消除损失或适合度限制。"
        },
        {
          text: "One family may need different choices for different goals.",
          zh: "同一个家庭的不同目标可能需要不同选择。",
          answer: true,
          answerZh: "是",
          reason: "The timing and access needs may differ.",
          reasonZh: "期限和资金使用需要可能不同。"
        }
      ]
    },
    {
      type: "visualGrid",
      eyebrow: "SMG core lab",
      title: "Update the goal tables",
      zhTitle: "更新目标表",
      visualGridStyle: "twoStep",
      cards: [
        {
          title: "Revisit four goals",
          zhTitle: "回看四个目标",
          body: "Open Workbook pp. 5–6.",
          bodyZh: "打开练习册第5至6页。",
          visual: investmentPhotos.stockReportCalculator
        },
        {
          title: "Add liquidity need",
          zhTitle: "补充流动性需求",
          body: "For each goal: high, medium or low—plus one reason.",
          bodyZh: "为每个目标填写高、中或低，并写一个理由。",
          visual: investmentPhotos.definitionLiquidityNeedGraphic
        }
      ],
      notes: "Students write directly in the SMG Essentials Workbook. Use realistic or fictional goals; do not require personal amounts."
    },
    {
      type: "visualGrid",
      eyebrow: "SMG core lab",
      title: "Write two team rules",
      zhTitle: "写出两条团队规则",
      visualGridStyle: "twoStep",
      cards: [
        {
          title: "Time rule",
          zhTitle: "期限规则",
          body: "Our mock goal needs the money in ___ years.",
          bodyZh: "我们的模拟目标在___年后需要资金。",
          visual: investmentPhotos.definitionTimeHorizonGraphic
        },
        {
          title: "Access rule",
          zhTitle: "资金使用规则",
          body: "The money must remain available by ___.",
          bodyZh: "资金必须在___之前保持可用。",
          visual: investmentPhotos.definitionLiquidityNeedGraphic
        }
      ],
      notes: "Turn the Lesson 1 team purpose into explicit horizon and liquidity rules. Do not enter an order."
    },
    {
      type: "visualGrid",
      eyebrow: "SMG evidence checkpoint",
      title: "Record the evidence",
      zhTitle: "记录证据",
      visualGridStyle: "twoStep",
      cards: [
        {
          title: "Team evidence row",
          zhTitle: "团队证据记录",
          body: "Goal · horizon · liquidity rule · reason · review trigger",
          bodyZh: "目标 · 期限 · 流动性规则 · 理由 · 复查条件",
          visual: investmentPhotos.businessChartsPaper
        },
        {
          title: "Individual exit",
          zhTitle: "个人离堂判断",
          body: "Explain why two goals may need different choices.",
          bodyZh: "解释为什么两个目标可能需要不同选择。",
          visual: investmentPhotos.lesson2UniversityStudents
        }
      ],
      notes: "Add one team evidence row. Every student prepares the individual exit judgement; assess the use of horizon, liquidity need and suitability."
    },
    {
      type: "answer",
      eyebrow: "Output rehearsal",
      title: "Write the comparison sentence",
      zhTitle: "写出比较句",
      items: [
        {
          prompt: "Different goals may require different investment choices because their __________ differ.",
          answer: "time horizons and liquidity needs",
          zh: "不同目标可能需要不同的投资选择，因为它们的__________不同。",
          answerZh: "投资期限和流动性需求"
        }
      ],
      notes: "Students complete the sentence individually, then add one piece of evidence from the university or retirement goal."
    },
    {
      type: "discussion",
      eyebrow: "Return to the dilemma",
      question: "Should university and retirement money use the same investment choice?",
      questionZh: "大学资金和退休资金是否应采用相同的投资选择？",
      revealTitle: "The goals need different judgements because their time and access constraints differ.",
      revealTitleZh: "这两个目标需要不同判断，因为它们的期限和资金使用限制不同。",
      visual: investmentPhotos.lesson2RetirementCouple
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Exit ticket",
      zhTitle: "离堂小测",
      mode: "fillBlanks",
      items: [
        {
          prompt: "The period before money is needed is the time __________.",
          answer: "horizon",
          zh: "需要资金前的时间是投资__________。",
          answerZh: "期限"
        },
        {
          prompt: "The need for quick access is the __________ need.",
          answer: "liquidity",
          zh: "快速取用资金的需要是__________需求。",
          answerZh: "流动性"
        },
        {
          prompt: "Suitability matches an investment to the goal and its __________.",
          answer: "constraints",
          zh: "适合度使投资与目标及其__________相匹配。",
          answerZh: "限制条件"
        },
        {
          prompt: "University and retirement may need different choices because their time and __________ needs differ.",
          answer: "access",
          zh: "大学和退休目标可能需要不同选择，因为它们的期限和资金__________需要不同。",
          answerZh: "使用"
        }
      ],
      notes: "Collect individually. Lesson 3 retrieves the goal-first rule before separating saving, investing and speculation."
    }
  ]
};
