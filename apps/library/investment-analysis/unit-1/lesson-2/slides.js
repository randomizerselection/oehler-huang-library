window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment and Financial Decision-Making",
    lessonLabel: "Unit 1 Lesson 2: How do goals change investment decisions?",
    deliveryPlan: {
      coreRoute: "Teach in one standard period; section dividers are transitions, not separate activities.",
      phaseShares: { launchAndRetrieval: "15%", keyIdeaAndPractice: "30%", smgCoreLab: "40%", outputAndExit: "15%" },
      optionalReinforcementSlides: ["Which question comes first?", "National averages are not family goals", "What does time-horizon guidance add?"],
      rule: "If time is short, skip the optional reinforcement slides; never cut the SMG core lab or individual exit judgement."
    },
    sources: [
      {
        label: "Investor.gov: Time Horizon",
        note: "Supports defining time horizon as the period available to invest for a financial goal.",
        date: "Accessed 13 July 2026",
        url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/time-horizon"
      },
      {
        label: "Investor.gov: Asset Allocation",
        note: "Supports the factual relationship between an investor's time horizon, risk tolerance and the investment mix considered.",
        date: "Accessed 13 July 2026",
        url: "https://www.investor.gov/introduction-investing/getting-started/asset-allocation"
      },
      {
        label: "IFEC: Building an investment portfolio",
        note: "Supports checking purpose, investment time horizon, liquidity needs, financial resources and risk tolerance before choosing investments.",
        date: "Published 1 April 2016; accessed 13 July 2026",
        url: "https://www.ifec.org.hk/web/en/moneyessentials/financial-planning/building-an-investment-portfolio.page"
      },
      {
        label: "Hong Kong Monetary Authority: Investment Services",
        note: "Supports checking objectives, investment horizon, investment risk, possible loss and suitability before making an investment decision.",
        date: "Page revised 7 January 2026; accessed 13 July 2026",
        url: "https://www.hkma.gov.hk/eng/smart-consumers/investment-services/"
      },
      {
        label: "National Bureau of Statistics of China: Households' Income and Consumption Expenditure in 2025",
        note: "Reports 2025 nationwide per-capita consumption expenditure of CNY 29,476, including CNY 6,397 for residence and CNY 3,489 for education, culture and recreation. These averages provide context, not family goal estimates.",
        date: "Published 20 January 2026; accessed 13 July 2026",
        url: "https://www.stats.gov.cn/english/PressRelease/202601/t20260120_1962356.html"
      },
      {
        label: "Frozen mainland China three-goal family profile",
        note: "Combines real NBS national spending figures with hypothetical mainland China education, home and retirement goals. No live rates, named investments or personal recommendations are used.",
        date: "Frozen 13 July 2026",
        url: "Local classroom scenario"
      }
    ]
  },
  stockMarketGame: {
    phase: 1,
    integrationLevel: "required formative course lab",
    studentAction: "Turn the team purpose into explicit goal, time-horizon and liquidity rules that will govern later portfolio decisions.",
    requiredOutput: "Complete Workbook pp. 5-6 and the individual exit judgement; add a team-log row for the revised goal and liquidity rule.",
    workbook: {
      pages: "5-6",
      treatment: "complete with course addition",
      studentAction: "Complete the short- and long-term goal tables; add liquidity need beside each goal."
    },
    dataRule: "Use the frozen team mandate written in Lesson 1; no order is entered before the Lesson 17 launch gate."
  },
  handout: {
    title: "How do goals change investment decisions?",
    subtitle: "Unit 1 Lesson 2",
    description: "Exam revision / 考试复习：complete bilingual definitions during the lesson, then revise the numbered knowledge points.",
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
              { en: "An investment decision begins with the financial goal, time horizon and liquidity need rather than a preferred investment.", zh: "投资决策应从财务目标、投资期限和流动性需求开始，而不是从偏好的投资选择开始。" },
              { en: "Time horizon is the period before the invested money is expected to be needed.", zh: "投资期限是预计需要使用已投资资金之前的时间。" },
              { en: "A shorter or inflexible horizon usually increases the importance of reliable access and the damage that a market loss could cause.", zh: "投资期限越短或越缺乏灵活性，可靠取用资金的重要性通常越高，市场损失造成的损害也越大。" },
              { en: "Suitability depends on the match between the goal, time horizon, liquidity need, date flexibility and ability to accept loss.", zh: "适合度取决于投资与目标、期限、流动性需求、日期灵活性和承受损失能力之间的匹配。" },
              { en: "A long horizon may allow more time to recover from losses, but it does not make every investment suitable.", zh: "较长的投资期限可能提供更多时间从损失中恢复，但并不意味着每项投资都适合。" },
              { en: "The investment with the highest possible return does not fit every goal; possible return matters only after goal constraints have been considered.", zh: "可能回报最高的投资并不适合每个目标；只有在考虑目标限制后，才应判断可能回报。" }
            ]
          }
        ]
      }
    ],
    sources: "Definitions and lesson principles are aligned with Investor.gov Time Horizon and Asset Allocation, IFEC Building an Investment Portfolio, and HKMA Investment Services, accessed 13 Jul 2026. Student activities remain in the SMG workbook and team evidence log."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 2",
      title: "How do goals change investment decisions?",
      zhTitle: "目标如何改变投资决定？",
      prominentTitle: true,
      visual: investmentPhotos.lesson1ScenarioFinancialDocuments,
      notes: [
        "Keep the title screen simple.",
        "Opening minute: teams retrieve the mock investment purpose written in Lesson 1, but do not revise it until they have compared horizon, liquidity need and suitability.",
        "Move immediately to the university-versus-retirement judgement."
      ]
    },
    {
      type: "discussion",
      eyebrow: "First judgement",
      title: "Should three-year and thirty-year goals be invested alike?",
      zhTitle: "三年目标和三十年目标应该采用相同投资方式吗？",
      question: "Should money for university in three years be invested like retirement money needed in thirty years?",
      questionZh: "三年后用于大学的资金，是否应该像三十年后才需要的退休资金一样投资？",
      revealTitle: "University and retirement money should not automatically be invested alike.",
      revealTitleZh: "大学资金和退休资金不应自动采用相同的投资方式。",
      visual: investmentPhotos.investorMeetingReport,
      notes: [
        "Take same/different votes before reveal.",
        "Listen for students who choose an investment before comparing when the money is needed, access needs and possible loss."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本课结束时，你能够",
      visual: investmentPhotos.businessChartsPaper,
      phases: ["Define", "Classify", "Write"],
      bullets: [
        "Define and use time horizon, liquidity need, suitability.",
        "Classify education, home and retirement goals by horizon and liquidity need.",
        "Write the SMG team's goal, horizon and liquidity rules."
      ],
      zhBullets: [
        "定义并使用投资期限、流动性需求和适合度。",
        "根据期限和流动性需求给教育、住房和退休目标分类。",
        "写出SMG团队的目标、期限和流动性规则。"
      ]
    },
    {
      type: "answer",
      eyebrow: "Lesson 1 retrieval",
      title: "Recall the Lesson 1 definitions",
      zhTitle: "回忆第一课的定义",
      items: [
        { prompt: "Investment seeks future __________ while accepting possible loss.", answer: "return", zh: "投资寻求未来__________，同时接受可能的损失。", answerZh: "回报" },
        { prompt: "Return is the gain or __________ from an investment over a stated period.", answer: "loss", zh: "回报是投资在规定期间内的收益或__________。", answerZh: "损失" },
        { prompt: "A financial goal states a future use, amount, priority and time __________.", answer: "horizon", zh: "财务目标说明未来用途、金额、优先级和投资__________。", answerZh: "期限" }
      ],
      notes: "Students complete all three without notes, then explain which part distinguishes university from retirement."
    },
    {
      type: "section",
      eyebrow: "Part 1",
      title: "Time horizon, liquidity and suitability",
      zhTitle: "投资期限、流动性与适合度",
      notes: "Try first -> define horizon -> define access -> define fit -> hinge check."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "What makes the two goals different?",
      zhTitle: "什么使两个目标不同？",
      question: "University begins in three years; retirement begins in thirty years. Apart from the dates, what else should the family compare?",
      questionZh: "大学在三年后开始；退休在三十年后开始。除了日期，家庭还应比较什么？",
      revealTitle: "The family should compare access, flexibility and the consequence of loss.",
      revealTitleZh: "这个家庭应比较资金使用需要、日期灵活性和损失后果。",
      visual: investmentPhotos.lesson1ScenarioHouseForRent
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Time horizon",
      term: "Time horizon",
      termZh: "投资期限",
      keywordVisuals: [
        { label: "Time before money is needed", labelZh: "需要资金前的时间", visual: investmentPhotos.lesson1ScenarioFinancialDocuments }
      ],
      definition: "Time horizon is the period before invested money is expected to be needed.",
      definitionBlanks: ["period", "invested money", "needed"],
      definitionZh: "投资期限是预计需要使用已投资资金之前的时间。"
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "A known payment date changes the decision",
      visual: investmentPhotos.assetCashSavings,
      notes: [
        "Image only. Ask what could go wrong if the money cannot be accessed on the required date.",
        "Bridge from time horizon to liquidity need."
      ]
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Liquidity need",
      term: "Liquidity need",
      termZh: "流动性需求",
      keywordVisuals: [
        { label: "Quick access without a large loss or delay", labelZh: "无需承受重大损失或延迟即可快速取用", visual: investmentPhotos.assetCashSavings }
      ],
      definition: "Liquidity need is the need to access money quickly without accepting a large loss or delay.",
      definitionBlanks: ["access money quickly", "large loss", "delay"],
      definitionZh: "流动性需求是无需承受重大损失或延迟即可快速取用资金的需要。"
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Suitability",
      term: "Suitability",
      termZh: "适合度",
      keywordVisuals: [
        { label: "Match the choice to the person and goal", labelZh: "使选择与个人和目标相匹配", visual: investmentPhotos.investorMeetingReport }
      ],
      definition: "Suitability is the degree to which an investment matches a person's goal, horizon, liquidity need and ability to accept loss.",
      definitionBlanks: ["goal", "horizon", "liquidity need", "ability to accept loss"],
      definitionZh: "适合度是投资与个人目标、期限、流动性需求和承受损失能力相匹配的程度。"
    },
    {
      type: "flow",
      eyebrow: "Decision rule",
      title: "What determines whether an investment is suitable?",
      zhTitle: "什么决定一项投资是否适合？",
      visual: investmentPhotos.businessChartsPaper,
      flowStyle: "decisionChecks",
      revealSteps: true,
      steps: [
        {
          title: "Goal",
          titleZh: "目标",
          body: "Define what the money is for and the amount required.",
          zh: "明确这笔钱的用途和所需金额。",
          visual: investmentPhotos.lesson1ScenarioFinancialDocuments
        },
        {
          title: "Time and access",
          titleZh: "期限与资金使用",
          body: "Identify the time horizon and when the money must be available.",
          zh: "明确投资期限以及何时必须能够使用这笔钱。",
          visual: investmentPhotos.assetCashSavings
        },
        {
          title: "Loss capacity",
          titleZh: "损失承受能力",
          body: "Check what loss could be accepted without damaging the goal.",
          zh: "检查在不损害目标的情况下可以承受多大损失。",
          visual: investmentPhotos.investorMeetingReport
        },
        {
          title: "Suitability",
          titleZh: "适合度",
          body: "Use all three checks to judge whether the investment fits.",
          zh: "综合前三项检查，判断这项投资是否适合。",
          visual: investmentPhotos.financialAnalysisDesk
        }
      ]
    },
    {
      type: "quiz",
      eyebrow: "Hinge question",
      title: "Which question comes first?",
      zhTitle: "哪一个问题应先提出？",
      choices: [
        "Which investment had the highest return last year?",
        "When is the money required, and how much loss or delay can the goal accept?",
        "Which investment is most popular online?",
        "How often can the price be checked?"
      ],
      answer: 1,
      explanation: "Time horizon, liquidity need and the consequence of loss define the suitability problem before investment choices are compared.",
      explanationZh: "在比较投资选择前，投资期限、流动性需求和损失后果界定了适合度问题。"
    },
    {
      type: "section",
      eyebrow: "Part 2",
      title: "Financial goal comparison",
      zhTitle: "财务目标比较",
      notes: "Read frozen evidence -> classify horizon -> rank access need -> compare -> check guidance."
    },
    {
      type: "dataSnapshot",
      eyebrow: "Grounded scenario",
      title: "National averages are not family goals",
      zhTitle: "全国平均数不是家庭目标金额",
      visual: investmentPhotos.lesson1ScenarioFinancialDocuments,
      sourceStamp: "National Bureau of Statistics of China | 2025 household expenditure | Published 20 Jan 2026",
      focusMetrics: [
        { label: "Total spending per person", value: "CNY 29,476" },
        { label: "Residence per person", value: "CNY 6,397" },
        { label: "Education/culture per person", value: "CNY 3,489" }
      ],
      task: "Why can these averages not set this family's three goals?",
      taskZh: "为什么这些平均数不能确定这个家庭的三个目标？",
      note: "The figures give context. The family still needs its own amount, date, access need and loss consequences.",
      noteZh: "这些数据提供背景。家庭仍需明确自己的金额、日期、资金使用需求和损失后果。"
    },
    {
      type: "dataSnapshot",
      eyebrow: "Frozen three-goal profile",
      title: "Education, home and retirement",
      zhTitle: "教育、住房和退休",
      visual: investmentPhotos.investorMeetingReport,
      sourceStamp: "Teacher-created mainland China family profile | Frozen 13 Jul 2026 | No live rates or named investments",
      focusMetrics: [
        { label: "University", value: "CNY 240k | 3y fixed" },
        { label: "Home deposit", value: "CNY 500k | 8y ±2y" },
        { label: "Retirement", value: "30y | target/withdrawals open" }
      ],
      task: "Classify horizon and liquidity. Add one suitability fact.",
      taskZh: "按期限和流动性分类，再补一项适合度事实。"
    },
    {
      type: "answer",
      eyebrow: "Horizon classification",
      title: "Classify each goal by time horizon",
      zhTitle: "按投资期限给每个目标分类",
      items: [
        { prompt: "University fees in three years: __________ horizon.", answer: "shorter", zh: "三年后的大学学费：__________期限。", answerZh: "较短" },
        { prompt: "Home deposit in eight years: __________ horizon.", answer: "medium", zh: "八年后的购房首付：__________期限。", answerZh: "中等" },
        { prompt: "Retirement in thirty years: __________ horizon.", answer: "long", zh: "三十年后的退休：__________期限。", answerZh: "长" }
      ],
      notes: "Reveal after students classify all three. Ask why horizon alone does not prove suitability."
    },
    {
      type: "rankingTask",
      eyebrow: "Liquidity ranking",
      title: "Rank the goals by current access need",
      zhTitle: "按当前资金使用需要排列目标",
      visual: investmentPhotos.assetCashSavings,
      prompt: "Rank from highest current liquidity need to lowest current liquidity need.",
      promptZh: "从当前流动性需求最高排到最低。",
      axis: {
        low: "Highest need",
        lowZh: "需求最高",
        high: "Lowest need",
        highZh: "需求最低"
      },
      items: [
        { label: "A", text: "Retirement in thirty years; withdrawals not yet specified", zh: "三十年后退休；提取安排尚未明确" },
        { label: "B", text: "University in three years; fixed start date", zh: "三年后上大学；开学日期固定" },
        { label: "C", text: "Home deposit in eight years; date flexible by up to two years", zh: "八年后购房首付；日期最多可调整两年" }
      ],
      revealLabel: "One defensible ranking",
      revealLabelZh: "一种合理排序",
      modelOrder: [
        { rank: "1", label: "B", text: "University in three years", zh: "三年后上大学", reason: "The earliest fixed payment date creates the highest current access need.", reasonZh: "最早且固定的付款日期形成最高的当前资金使用需要。" },
        { rank: "2", label: "C", text: "Home deposit in eight years", zh: "八年后购房首付", reason: "The goal is later and has some date flexibility, but access will still matter.", reasonZh: "目标时间较晚且日期有一定灵活性，但资金使用仍然重要。" },
        { rank: "3", label: "A", text: "Retirement in thirty years", zh: "三十年后退休", reason: "The money is not needed soon, although later withdrawal needs still require planning.", reasonZh: "近期不需要这笔钱，但以后提取资金的需要仍需规划。" }
      ],
      caveat: "This ranks access need from the frozen facts; it does not choose an investment.",
      caveatZh: "该排序只依据冻结事实判断资金使用需要，并不选择投资。"
    },
    {
      type: "compare",
      eyebrow: "Goal comparison",
      title: "Compare university and retirement goals",
      zhTitle: "比较大学目标与退休目标",
      mode: "fillBlanks",
      leftTitle: "University in three years",
      leftTitleZh: "三年后上大学",
      left: [
        { label: "1", text: "The time horizon is relatively __________.", answer: "short", zh: "投资期限相对__________。", answerZh: "较短" },
        { label: "2", text: "A loss near the fixed start date could block the __________.", answer: "goal", zh: "临近固定开学日期发生损失可能阻碍__________。", answerZh: "目标" }
      ],
      rightTitle: "Retirement in thirty years",
      rightTitleZh: "三十年后退休",
      right: [
        { label: "1", text: "The time horizon is relatively __________.", answer: "long", zh: "投资期限相对__________。", answerZh: "较长" },
        { label: "2", text: "The target amount and later __________ needs are still missing.", answer: "withdrawal", zh: "目标金额和以后的__________需要仍然缺失。", answerZh: "提取" }
      ],
      prompt: "Fill the blanks, then explain why the same investment choice is not automatically suitable for both goals.",
      promptZh: "填空，然后解释为什么同一个投资选择不会自动同时适合两个目标。"
    },
    {
      type: "sourceLens",
      eyebrow: "Official guidance",
      title: "What does time-horizon guidance add?",
      zhTitle: "投资期限指引增加了什么？",
      visual: investmentPhotos.financialAnalysisDesk,
      revealAnswers: true,
      metaItems: [
        { label: "Source", value: "Investor.gov: Time Horizon and Asset Allocation" },
        { label: "Accessed", value: "13 July 2026" }
      ],
      checks: [
        { label: "Use", prompt: "What relationship does the guidance support?", zh: "该指引支持什么关系？", answer: "The period before a goal and a person's ability to accept risk affect which broad investment choices may be appropriate.", answerZh: "目标前的时间长度以及个人承受风险的能力，会影响哪些广义投资选择可能合适。" },
        { label: "Limit", prompt: "What does the guidance not decide for the frozen family?", zh: "该指引不能替冻结家庭决定什么？", answer: "It does not choose a named investment, define the family's priorities or supply missing loss-capacity evidence.", answerZh: "它不选择具体投资，不设定家庭优先级，也不提供缺少的损失承受能力证据。" }
      ],
      task: "Use one source point to improve the university-versus-retirement comparison, then state one limitation.",
      taskZh: "用一个来源要点改进大学目标与退休目标的比较，然后说明一个局限。"
    },
    {
      type: "yesNoCheck",
      eyebrow: "Misconception check",
      title: "Does highest return fit every goal?",
      zhTitle: "最高的可能回报适合每一个目标吗？",
      prompt: "Vote yes or no before revealing each reason.",
      promptZh: "先投票判断是或否，再揭示每个理由。",
      items: [
        { text: "High possible return may not fit money needed soon.", zh: "较高的可能回报未必适合很快需要的资金。", answer: true, answerZh: "是", reason: "A loss or delay could damage the near-term goal.", reasonZh: "损失或延迟可能损害近期目标。" },
        { text: "A thirty-year horizon allows unlimited loss.", zh: "三十年的期限允许无限损失。", answer: false, answerZh: "否", reason: "The family must still know the target and what loss it can accept.", reasonZh: "家庭仍须明确目标金额及能承受的损失。" },
        { text: "One family may need different choices for different goals.", zh: "同一个家庭的不同目标可能需要不同选择。", answer: true, answerZh: "是", reason: "The timing and need for access may differ for each goal.", reasonZh: "每个目标的时间和资金使用需求可能不同。" }
      ]
    },
    {
      type: "section",
      eyebrow: "Course laboratory",
      title: "SMG goal and liquidity rules",
      zhTitle: "SMG目标与流动性规则",
      notes: "The next slide is the Lesson 2 SMG core lab. Allow roughly 15-20 minutes so teams improve the Lesson 1 mandate using today's horizon, liquidity and suitability concepts before the individual assessment."
    },
    {
      type: "flow",
      eyebrow: "SMG core lab",
      title: "Set the team goal rules",
      zhTitle: "制定团队目标规则",
      prompt: "Turn the Lesson 1 team purpose into rules that can govern later portfolio decisions. Do not enter an order.",
      promptZh: "把第一课的团队目标转化为能够指导后续投资组合决策的规则。不得提交交易指令。",
      steps: [
        { label: "1", text: "Complete Workbook pp. 5-6 for the mock goal and add a specific time horizon.", zh: "完成练习册第5至6页，并为模拟目标补充明确期限。" },
        { label: "2", text: "Add the liquidity need: state when access matters and how much virtual cash must remain available.", zh: "补充流动性需求：说明何时需要使用资金，以及必须保留多少虚拟现金。" }
      ],
      sharePrompt: "Check that the horizon and liquidity rule describe the same mock goal.",
      sharePromptZh: "检查期限和流动性规则是否针对同一个模拟目标。",
      notes: "Use the frozen Lesson 1 mandate. Allow about ten minutes; no order is entered."
    },
    {
      type: "flow",
      eyebrow: "SMG core lab",
      title: "Record the team decision rule",
      zhTitle: "记录团队决策规则",
      prompt: "Complete the suitability rule and the Lesson 2 evidence row.",
      promptZh: "完成适合度规则和第二课团队证据记录。",
      steps: [
        { label: "1", text: "No investment choice unless it fits goal, horizon, liquidity need and ability to accept loss.", zh: "只有符合目标、期限、流动性需求和承受损失能力时，才能考虑投资选择。" },
        { label: "2", text: "Add one team evidence row: responsible student, decision reason and Lesson 7 review trigger.", zh: "添加一条团队证据记录：负责学生、决策理由和第七课复查条件。" }
      ],
      sharePrompt: "Add one team evidence row. Every student writes one individual exit judgement defending a team rule.",
      sharePromptZh: "添加一条团队证据记录。每位学生独立写出一句话，为一条团队规则辩护。",
      notes: "Allow five to ten minutes. Assess concept use and evidence, not the team's preferred horizon."
    },
    {
      type: "section",
      eyebrow: "Part 3",
      title: "Suitability judgement",
      zhTitle: "适合度判断",
      notes: "Rehearse -> assess -> revise judgement -> submit."
    },
    {
      type: "flow",
      eyebrow: "Output rehearsal",
      title: "Complete the comparison chain",
      zhTitle: "补全比较链条",
      prompt: "Write the missing sentence that connects goal evidence to different investment choices.",
      promptZh: "写出缺少的句子，把目标证据与不同投资选择联系起来。",
      steps: [
        { label: "1", text: "University money is needed in three years on a fixed date, so its current liquidity need is high.", zh: "大学资金在三年后的固定日期需要使用，因此当前流动性需求较高。" },
        { label: "2", text: "__________", answer: "Retirement money has a thirty-year horizon and a lower current liquidity need, but the target and ability to accept loss are still unknown.", zh: "退休资金有三十年的期限，当前流动性需求较低，但目标金额和承受损失能力仍然未知。" },
        { label: "3", text: "Therefore, the same investment choice is not automatically suitable for both goals.", zh: "因此，同一个投资选择不会自动同时适合两个目标。" }
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: "Retirement money has a thirty-year horizon and a lower current liquidity need, but the target and ability to accept loss are still unknown.",
      missingSentenceAnswerZh: "退休资金有三十年的期限，当前流动性需求较低，但目标金额和承受损失能力仍然未知。",
      sharePrompt: "Underline the horizon comparison once and the suitability condition twice.",
      sharePromptZh: "给期限比较画一条线，给适合度条件画两条线。"
    },
    {
      type: "exam",
      eyebrow: "Assessment",
      title: "Assess two family goals",
      zhTitle: "评估两个家庭目标",
      visual: investmentPhotos.businessChartsPaper,
      revealKeywords: true,
      prompt: "Assess why the university and retirement goals require different investment choices. [8]",
      zh: "评估为什么大学目标和退休目标需要不同的投资选择。[8]",
      keywords: ["financial goal", "time horizon", "liquidity need", "possible loss", "suitability", "conditional judgement"],
      notes: [
        "Students should compare the frozen facts and identify missing evidence.",
        "Do not reward a named investment recommendation without the goal analysis."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Return to the dilemma",
      title: "Should the two goals be invested alike?",
      zhTitle: "两个目标是否应该采用相同投资方式？",
      question: "Use time horizon, liquidity need and suitability to revise the opening judgement.",
      questionZh: "使用投资期限、流动性需求和适合度修改开场判断。",
      revealTitle: "Different constraints require different investment choices.",
      revealTitleZh: "不同限制条件需要不同的投资选择。",
      visual: investmentPhotos.investorMeetingReport
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Submit the goal comparison",
      zhTitle: "提交目标比较",
      mode: "fillBlanks",
      items: [
        { prompt: "The period before money is needed is the time __________.", answer: "horizon", zh: "需要资金前的时间是投资__________。", answerZh: "期限" },
        { prompt: "The need for quick access without a large loss or delay is the __________ need.", answer: "liquidity", zh: "无需承受重大损失或延迟即可快速取用资金的需要是__________需求。", answerZh: "流动性" },
        { prompt: "An investment is not suitable unless it matches the goal and ability to accept __________.", answer: "loss", zh: "除非投资与目标和承受__________的能力相匹配，否则它并不适合。", answerZh: "损失" }
      ],
      notes: "Collect individually. Lesson 3 can retrieve the goal-first rule before distinguishing saving, investing and speculation."
    },
  ]
};
