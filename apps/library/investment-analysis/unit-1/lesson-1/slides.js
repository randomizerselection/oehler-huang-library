window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment and Financial Decision-Making",
    lessonLabel: "Unit 1 Lesson 1: Why do people and families invest?",
    deliveryPlan: {
      coreRoute: "Teach in one standard period; section dividers are transitions, not separate activities.",
      phaseShares: { launchAndRetrieval: "15%", keyIdeaAndPractice: "30%", smgCoreLab: "40%", outputAndExit: "15%" },
      optionalReinforcementSlides: ["Which statement fully defines investment?", "What must the family know first?", "Vote yes or no."],
      rule: "If time is short, skip the optional reinforcement slides; never cut the SMG core lab or individual exit judgement."
    },
    sources: [
      {
        label: "Investor.gov: Introduction to Investing",
        note: "Supports the factual distinction between investing for future return and the possibility of loss, and links investment choices to goals and time horizon.",
        date: "Accessed 13 July 2026",
        url: "https://www.investor.gov/introduction-investing"
      },
      {
        label: "IFEC: Building an investment portfolio",
        note: "Supports beginning with purpose, investment time horizon, liquidity needs, financial resources and risk tolerance rather than a particular investment.",
        date: "Published 1 April 2016; accessed 13 July 2026",
        url: "https://www.ifec.org.hk/web/en/moneyessentials/financial-planning/building-an-investment-portfolio.page"
      },
      {
        label: "National Bureau of Statistics of China: Households' Income and Consumption Expenditure in 2025",
        note: "Reports nationwide per-capita disposable income of CNY 43,377 in 2025. The lesson uses this as a scale benchmark, not as evidence about the hypothetical family's income or suitability.",
        date: "Published 20 January 2026; accessed 13 July 2026",
        url: "https://www.stats.gov.cn/english/PressRelease/202601/t20260120_1962356.html"
      },
      {
        label: "Teacher-created family goal table",
        note: "Combines the real NBS benchmark with hypothetical mainland China goals for classroom classification. The family, CNY 50,000 decision and goal figures are not a recommendation or a real family plan.",
        date: "Frozen 13 July 2026",
        url: "Local classroom scenario"
      }
    ]
  },
  stockMarketGame: {
    phase: 1,
    integrationLevel: "formative evidence checkpoint",
    studentAction: "Complete the short- and long-term goal tables, form the SMG team, choose a shared long-horizon purpose, assign the first roles and open the team and individual evidence records.",
    requiredOutput: "Complete Workbook pp. 1-3, 5-6 and 8 and the individual exit judgement; add the opening authoritative team-log row.",
    workbook: {
      pages: "1-3, 5-6 and 8",
      treatment: "complete",
      studentAction: "Set up the personal workbook, complete the short- and long-term goal tables, record only the team ID or username, assign roles and complete the opening orientation."
    },
    dataRule: "Use the teacher-frozen team setup and mandate record; no order is entered before the Lesson 17 launch gate."
  },
  handout: {
    title: "Why do people and families invest?",
    subtitle: "Unit 1 Lesson 1",
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
                term: "Investment",
                termZh: "投资",
                prompt: "Investment is putting money into an __________ to seek __________ while accepting __________.",
                answers: ["asset", "future return", "possible loss"],
                definitionZh: "投资是把钱投入资产以寻求未来回报，同时接受可能发生的损失。"
              },
              {
                term: "Return",
                termZh: "回报",
                prompt: "Return is the __________ from an investment over a __________, including __________.",
                answers: ["gain or loss", "stated period", "price change and income"],
                definitionZh: "回报是投资在规定期间内的收益或损失，包括价格变化和收入。"
              },
              {
                term: "Financial goal",
                termZh: "财务目标",
                prompt: "A financial goal is a stated __________ with an __________, __________ and __________.",
                answers: ["future use of money", "amount", "priority", "time horizon"],
                definitionZh: "财务目标是对资金未来用途的明确说明，并包括金额、优先级和投资期限。"
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
              { en: "People invest to move resources toward future goals while accepting uncertainty and possible loss.", zh: "个人与家庭通过投资把资源用于未来目标，同时接受不确定性和可能的损失。" },
              { en: "A financial goal should state the future use of the money, target amount, priority and time horizon.", zh: "财务目标应说明资金的未来用途、目标金额、优先级和投资期限。" },
              { en: "Before considering an investment, check the liquidity need and the consequence of a possible loss.", zh: "考虑投资前，应检查流动性需求以及可能损失带来的后果。" },
              { en: "Return includes gain or loss over a stated period, including price change and income.", zh: "回报是规定期间内的收益或损失，包括价格变化和收入。" },
              { en: "Use this decision sequence: financial goal → time horizon and access need → consequence of loss → keep available, gather more evidence or consider investing.", zh: "使用此决策顺序：财务目标 → 投资期限和资金使用需求 → 损失后果 → 保持资金可用、收集更多证据或考虑投资。" },
              { en: "Investing is not simply a way to make more money; it seeks future return for a defined goal while accepting uncertainty and possible loss.", zh: "投资不只是赚更多钱；投资是为了明确的未来目标寻求回报，同时接受不确定性和可能损失。" }
            ]
          }
        ]
      }
    ],
    sources: "Definitions and lesson principles are aligned with Investor.gov Introduction to Investing and IFEC Building an Investment Portfolio, accessed 13 Jul 2026. Student activities remain in the SMG workbook and team evidence log."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 1",
      title: "Why do people and families invest?",
      zhTitle: "个人与家庭为什么要投资？",
      prominentTitle: true,
      visual: investmentPhotos.investorMeetingReport,
      notes: [
        "Keep this as a clean title screen.",
        "Opening minute: explain that the shared SMG portfolio is the course laboratory. Students will form teams and write a mock investment purpose after learning why goals must come first.",
        "Move directly to the CNY 50,000 three-choice judgement before teaching any definition."
      ]
    },
    {
      type: "discussion",
      eyebrow: "First judgement",
      title: "What should the family do with CNY 50,000?",
      zhTitle: "这个家庭应如何处理5万元人民币？",
      question: "A family has CNY 50,000 but no stated goal. What should it do next?",
      questionZh: "一个家庭有5万元人民币，但没有明确的财务目标。下一步应该怎么做？",
      revealTitle: "The family should first define what the money is for and when it will be needed.",
      revealTitleZh: "这个家庭应先明确这笔钱的用途以及何时需要使用。",
      visual: investmentPhotos.lesson1FamilyGoalTarget,
      notes: [
        "Keep only the short question visible; do not add statistics, choices or instructions to the hook screen.",
        "Ask students for a one-sentence answer and justification before revealing the model response.",
        "Use the piggy bank and target to make the missing financial goal visible before students know the formal term."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本课结束时，你能够",
      visual: investmentPhotos.businessChartsPaper,
      phases: ["Define", "Record", "Apply"],
      bullets: [
        "Define investment, return and financial goal",
        "Complete short- and long-term goal tables with a time horizon and reason",
        "Use goal, access and possible loss to choose a next step and set the SMG team purpose"
      ],
      zhBullets: [
        "定义投资、回报与财务目标",
        "完成短期和长期目标表，并填写期限与理由",
        "运用目标、资金使用需要与可能损失选择下一步并确定SMG团队目标"
      ]
    },
    {
      type: "section",
      eyebrow: "Part 1",
      title: "Investment and return",
      zhTitle: "投资与回报",
      notes: "Identify missing knowledge -> define investment and return -> connect the concepts -> check understanding."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "What does ‘make more money’ leave out?",
      zhTitle: "“赚更多钱”的说法遗漏了什么？",
      question: "A student says, ‘Investing is simply a way to make more money.’ What does this answer leave out?",
      questionZh: "一名学生说：“投资只是一种赚更多钱的方式。”这个回答遗漏了什么？",
      revealTitle: "The answer leaves out the financial goal, time horizon, access need and possibility of loss.",
      revealTitleZh: "这个回答遗漏了财务目标、投资期限、资金使用需要和发生损失的可能性。",
      visual: investmentPhotos.lesson1GainAndLossMarketScreen,
      notes: "Use the green and red market columns to ask what an upward-only idea of investing ignores."
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Investment",
      term: "Investment",
      termZh: "投资",
      keywordVisuals: [
        { label: "Money enters an asset for an uncertain future result", labelZh: "把钱投入资产以面对不确定的未来结果", visual: investmentPhotos.definitionInvestmentGraphic }
      ],
      definition: "Investment is putting money into an asset to seek future return while accepting possible loss.",
      definitionBlanks: ["asset", "future return", "possible loss"],
      definitionZh: "投资是把钱投入资产以寻求未来回报，同时接受可能发生的损失。",
      examples: [
        { text: "Buy shares to seek dividends or a price gain; their market value may also fall.", zh: "买入股票以寻求股息或价格上涨；其市场价值也可能下跌。" },
        { text: "Buy a bond to seek interest; the issuer may still fail to repay.", zh: "买入债券以寻求利息；发行人仍可能无法偿还。" },
        { text: "Use a diversified fund for a future goal; the fund value can still decrease.", zh: "为未来目标使用分散化基金；基金价值仍可能下降。" }
      ]
    },
    {
      type: "flow",
      eyebrow: "Decision method",
      title: "What should you check before investing?",
      zhTitle: "投资前应该检查什么？",
      visual: investmentPhotos.businessChartsPaper,
      flowStyle: "decisionChecks",
      revealSteps: true,
      steps: [
        {
          title: "Goal",
          titleZh: "目标",
          body: "State what the money is for and the amount required.",
          zh: "说明这笔钱的用途和所需金额。",
          visual: investmentPhotos.lesson1FamilyGoalTarget
        },
        {
          title: "Access",
          titleZh: "资金使用",
          body: "Check when the money is needed and whether it must remain available.",
          zh: "检查何时需要这笔钱，以及资金是否必须保持可用。",
          visual: investmentPhotos.lesson1CashAccessAtm
        },
        {
          title: "Possible loss",
          titleZh: "可能损失",
          body: "Check what loss could be accepted without damaging the goal.",
          zh: "检查在不损害目标的情况下可以接受多大损失。",
          visual: investmentPhotos.lesson1ScenarioRedMarketLosses
        }
      ]
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Return",
      term: "Return",
      termZh: "回报",
      keywordVisuals: [
        { label: "Gain or loss", labelZh: "收益或损失", visual: investmentPhotos.definitionReturnGraphic }
      ],
      definition: "Return is the gain or loss from an investment over a stated period, including price change and income.",
      definitionBlanks: ["gain or loss", "stated period", "price change and income"],
      definitionZh: "回报是投资在规定期间内的收益或损失，包括价格变化和收入。",
      examples: [
        { text: "A share rises from CNY 100 to CNY 108: CNY 8 price gain.", zh: "股价从100元升至108元：价格收益为8元。" },
        { text: "A bond pays CNY 50 interest: CNY 50 income return.", zh: "债券支付50元利息：收入回报为50元。" },
        { text: "A fund falls from CNY 1,000 to CNY 920: CNY 80 loss.", zh: "基金从1000元跌至920元：损失为80元。" }
      ]
    },
    {
      type: "yesNoCheck",
      eyebrow: "Goals and investing",
      title: "Vote yes or no.",
      zhTitle: "投票：是或否。",
      classroomLargeText: true,
      items: [
        { text: "A possible return is guaranteed to be positive.", zh: "可能的回报一定是正数。", answer: false, answerZh: "否", reason: "Return includes both gain and loss.", reasonZh: "回报包括收益和损失。" },
        { text: "A longer future goal may give investment more time to work through uncertainty.", zh: "较长期的未来目标可能给投资更多时间应对不确定性。", answer: true, answerZh: "是", reason: "A longer horizon may support consideration of investment, although it does not remove risk.", reasonZh: "较长期限可能支持考虑投资，但不会消除风险。" },
        { text: "Money needed urgently in four months should be judged only by its possible return.", zh: "四个月后急需的资金只应根据可能回报来判断。", answer: false, answerZh: "否", reason: "The need for fast access and the damage from loss are essential conditions.", reasonZh: "快速取用资金的需要以及损失带来的影响是关键条件。" }
      ]
    },
    {
      type: "quiz",
      eyebrow: "Hinge question",
      title: "Which statement fully defines investment?",
      zhTitle: "哪项陈述完整定义了投资？",
      choices: [
        "Investment guarantees that saved money grows.",
        "Investment puts money into an asset to seek future return while accepting possible loss.",
        "Investment is any decision to delay spending.",
        "Investment is suitable whenever a goal is expensive."
      ],
      answer: 1,
      explanation: "Investment seeks future return through an asset, but possible loss remains.",
      explanationZh: "投资通过资产寻求未来回报，但仍存在可能损失。"
    },
    {
      type: "section",
      eyebrow: "Part 2",
      title: "Financial goals",
      zhTitle: "财务目标",
      notes: "Attempt -> define financial goal -> compare horizons -> classify goals -> prioritise evidence."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "What makes a financial goal usable?",
      zhTitle: "什么使财务目标可用于决策？",
      question: "‘We want a better future’ is too vague for an investment decision. Which details would make the goal usable?",
      questionZh: "“我们想要更好的未来”对投资决策来说太模糊。哪些细节能使这个目标变得可用？",
      revealTitle: "A usable goal states the purpose, amount, priority and time horizon.",
      revealTitleZh: "可用的目标应说明用途、金额、优先级和投资期限。",
      visual: investmentPhotos.lesson1ScenarioFinancialDocuments,
      notes: [
        "Students list details before the possible answer is shown.",
        "Use their answers to decide whether the financial-goal definition can be taught immediately or needs one more example."
      ]
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Financial goal",
      term: "Financial goal",
      termZh: "财务目标",
      keywordVisuals: [
        { label: "Money directed towards a target", labelZh: "把资金用于一个目标", visual: investmentPhotos.definitionFinancialGoalGraphic }
      ],
      definition: "A financial goal is a stated future use of money with an amount, priority and time horizon.",
      definitionBlanks: ["future use of money", "amount", "priority", "time horizon"],
      definitionZh: "财务目标是对资金未来用途的明确说明，并包括金额、优先级和投资期限。",
      examples: [
        { text: "Laptop in 8 months · CNY 6,000 · high priority", zh: "8个月后购买笔记本电脑 · 6000元 · 高优先级" },
        { text: "Home deposit in 8 years · CNY 500,000 · medium priority", zh: "8年后支付购房首付 · 50万元 · 中等优先级" },
        { text: "Retirement in 30 years · target amount not yet set · high priority", zh: "30年后退休 · 目标金额尚未确定 · 高优先级" }
      ]
    },
    {
      type: "compare",
      eyebrow: "Applied examples",
      title: "Short-term and long-term goals",
      zhTitle: "短期目标与长期目标",
      leftTitle: "Short-term goal",
      leftTitleZh: "短期目标",
      left: [
        { label: "1", text: "Needed in the near future.", zh: "资金在近期需要使用。" },
        { label: "2", text: "Examples: laptop in 8 months; course fee next year.", zh: "例子：8个月后购买电脑；明年支付课程费用。" }
      ],
      rightTitle: "Long-term goal",
      rightTitleZh: "长期目标",
      right: [
        { label: "1", text: "Needed several years later.", zh: "资金在数年后才需要使用。" },
        { label: "2", text: "Examples: home deposit in 8 years; retirement in 30 years.", zh: "例子：8年后支付购房首付；30年后退休。" }
      ],
      notes: "Students compare the stated time horizons, then move directly to the classification check. Emphasise that the time horizon, not the goal name alone, determines the category."
    },
    {
      type: "answer",
      eyebrow: "Practice check",
      title: "Classify the goals",
      zhTitle: "给目标分类",
      mode: "fillBlanks",
      checkLayout: "twoColumn",
      items: [
        { prompt: "A laptop needed in 8 months is a __________ goal.", answer: "short-term", zh: "8个月后需要购买笔记本电脑属于__________目标。", answerZh: "短期" },
        { prompt: "A course fee due next year is a __________ goal.", answer: "short-term", zh: "明年到期的课程费用属于__________目标。", answerZh: "短期" },
        { prompt: "A home deposit planned for 8 years from now is a __________ goal.", answer: "long-term", zh: "计划8年后支付的购房首付属于__________目标。", answerZh: "长期" },
        { prompt: "Retirement planned for 30 years from now is a __________ goal.", answer: "long-term", zh: "计划30年后退休属于__________目标。", answerZh: "长期" }
      ],
      notes: "Students classify all four examples before reveal, then explain which time-horizon evidence decided each answer. Use the result to decide whether they are ready to complete the workbook goal tables."
    },
    {
      type: "visualGrid",
      visualGridStyle: "workbookGoals",
      eyebrow: "SMG Essentials Workbook",
      title: "Complete your goal tables in the workbook",
      zhTitle: "在练习册中完成你的目标表",
      prompt: "Write directly in Workbook pp. 5-6. Complete every column for four goals.",
      promptZh: "直接填写练习册第5至6页，为四个目标完成每一栏。",
      showCardNumbers: false,
      cards: [
        {
          title: "Short-term goals · p. 5",
          zhTitle: "短期目标 · 第5页",
          body: "Write two near-future goals. For each: description, time horizon and why it matters to you.",
          bodyZh: "写出两个近期目标；分别填写目标描述、期限以及它为何重要。",
          visual: investmentPhotos.assetCashSavings
        },
        {
          title: "Long-term goals · p. 6",
          zhTitle: "长期目标 · 第6页",
          body: "Write two goals several years away. For each: description, time horizon and why it matters to you.",
          bodyZh: "写出两个数年后的目标；分别填写目标描述、期限以及它为何重要。",
          visual: investmentPhotos.lesson1FamilyGoalTarget
        }
      ],
      notes: "Students answer directly in the official SMG Essentials Workbook. Allow about 8-10 minutes. Students may use realistic personal goals or fictional examples if they prefer privacy; do not require amounts. Check that all four goals include a description, time horizon and reason."
    },
    {
      type: "quiz",
      eyebrow: "Quick check",
      title: "What must the family know first?",
      zhTitle: "这个家庭首先必须了解什么？",
      visual: investmentPhotos.businessChartsPaper,
      choices: [
        "What the money is for, when it is needed and what would happen if some were lost.",
        "Which investment earned the highest return last month.",
        "Which investment is most popular with other families.",
        "Which investment has the lowest current price."
      ],
      answer: 0,
      explanation: "Start with the family's needs: what the money is for, when it is needed and what a loss would mean. Only then should the family compare investment choices and returns.",
      explanationZh: "先了解家庭的需要：资金用途、何时需要这笔钱，以及损失会带来什么后果。然后再比较投资选择和回报。",
      notes: "Students answer individually. If many choose B, C or D, revisit the rule: understand the family's needs before comparing investment choices."
    },
    {
      type: "yesNoCheck",
      eyebrow: "Misconception check",
      title: "Vote yes or no.",
      zhTitle: "投票：是或否。",
      items: [
        { text: "The statement is incomplete because return can be a gain or a loss.", zh: "该陈述不完整，因为回报可能是收益，也可能是损失。", answer: true, answerZh: "是", reason: "Possible loss is part of the definition of investment.", reasonZh: "可能损失是投资定义的一部分。" },
        { text: "A high possible return makes an investment suitable for every goal.", zh: "较高的可能回报使投资适合每一个目标。", answer: false, answerZh: "否", reason: "Goal, horizon, access need and possible loss still differ.", reasonZh: "目标、期限、资金使用需要和可能损失仍然不同。" },
        { text: "A family may invest to move resources toward a future goal while accepting uncertainty.", zh: "家庭可以通过投资把资源用于未来目标，同时接受不确定性。", answer: true, answerZh: "是", reason: "This connects the reason for investing to both a goal and risk.", reasonZh: "这把投资理由同时与目标和风险联系起来。" }
      ]
    },
    {
      type: "visualGrid",
      eyebrow: "Stock Market Game",
      title: "Welcome to the Stock Market Game!",
      zhTitle: "欢迎参加股票市场模拟游戏！",
      prompt: "Become a student investment team—without risking real money.",
      promptZh: "成为学生投资团队——无需承担真实资金风险。",
      showCardNumbers: false,
      cards: [
        {
          title: "Virtual portfolio",
          zhTitle: "虚拟投资组合",
          body: "Use virtual money to practise investment choices safely.",
          bodyZh: "使用虚拟资金，安全练习投资选择。",
          visual: investmentPhotos.marketScreen
        },
        {
          title: "Team challenge",
          zhTitle: "团队挑战",
          body: "Share roles, debate ideas and agree decisions together.",
          bodyZh: "分担角色、讨论观点并共同作出决定。",
          visual: investmentPhotos.investorMeetingReport
        },
        {
          title: "Evidence hunt",
          zhTitle: "寻找证据",
          body: "Use company information and market data before acting.",
          bodyZh: "行动前使用公司信息和市场数据。",
          visual: investmentPhotos.annualReports
        },
        {
          title: "Progress story",
          zhTitle: "成长记录",
          body: "Track results, explain choices and improve the next decision.",
          bodyZh: "记录结果、解释选择并改进下一次决策。",
          visual: investmentPhotos.businessChartsPaper
        }
      ],
      notes: "Launch with energy and reassure students that this is a virtual learning simulation. Emphasise teamwork, evidence and improvement rather than promising profit or rewarding only the highest short-term return."
    },
    {
      type: "flow",
      flowStyle: "decisionChecks",
      revealSteps: true,
      eyebrow: "SMG course journey",
      title: "What will your team do during the course?",
      zhTitle: "你的团队将在课程中做什么？",
      steps: [
        {
          label: "1",
          title: "Learn",
          titleZh: "学习",
          body: "Build the vocabulary and judgement tools needed by an investment team.",
          zh: "掌握投资团队需要的词汇和判断工具。",
          visual: investmentPhotos.financeChartWhiteboard
        },
        {
          label: "2",
          title: "Research",
          titleZh: "研究",
          body: "Use company information, market data and reliable sources.",
          zh: "使用公司信息、市场数据和可靠来源。",
          visual: investmentPhotos.annualReports
        },
        {
          label: "3",
          title: "Decide",
          titleZh: "决策",
          body: "Agree team rules and later make virtual portfolio decisions.",
          zh: "商定团队规则，之后作出虚拟投资组合决策。",
          visual: investmentPhotos.investorMeetingReport
        },
        {
          label: "4",
          title: "Review",
          titleZh: "复盘",
          body: "Track evidence, explain results and improve the next decision.",
          zh: "记录证据、解释结果并改进下一次决策。",
          visual: investmentPhotos.investorChartScreens
        }
      ],
      notes: "Reveal one stage at a time. Invite students to predict what an investment team might do at each stage before showing the card."
    },
    {
      type: "visualGrid",
      eyebrow: "SMG core lab",
      title: "Set up your team",
      zhTitle: "组建团队",
      visualGridStyle: "twoStep",
      cards: [
        {
          title: "Form a team",
          zhTitle: "组建团队",
          body: "3–5 students.",
          bodyZh: "3至5人。",
          visual: investmentPhotos.investorMeetingReport
        },
        {
          title: "Open the workbook",
          zhTitle: "打开练习册",
          body: "Use pp. 1–3, 5–6 and 8.",
          bodyZh: "使用第1–3、5–6和8页。",
          visual: investmentPhotos.stockReportCalculator
        }
      ],
      notes: "Students form teams of 3–5 and open workbook pp. 1–3, 5–6 and 8. If the team records platform access details, save the team ID but never a password."
    },
    {
      type: "visualGrid",
      eyebrow: "SMG core lab",
      title: "Choose the team goal",
      zhTitle: "选择团队目标",
      visualGridStyle: "twoStep",
      cards: [
        {
          title: "Choose one long-term goal",
          zhTitle: "选择一个长期目标",
          body: "Use the workbook—or invent one.",
          bodyZh: "使用练习册，或虚构一个。",
          visual: investmentPhotos.lesson1FamilyGoalTarget
        },
        {
          title: "Set four boundaries",
          zhTitle: "设定四项边界",
          body: "Goal · time · access · possible loss",
          bodyZh: "目标 · 期限 · 资金使用 · 可能损失",
          visual: investmentPhotos.definitionSuitabilityGraphic
        }
      ],
      notes: "Do not require students to disclose a personal goal. The team chooses one mock long-term goal from the workbook or invents a fictional goal, then agrees its goal, time horizon, liquidity need and possible-loss boundary before discussing a security. Every student records the team goal and why it comes before an investment choice."
    },
    {
      type: "visualGrid",
      eyebrow: "SMG evidence checkpoint",
      title: "Open the team evidence record",
      zhTitle: "建立团队证据记录",
      prompt: "Choose roles and open the Lesson 1 team evidence row. Do not enter an order.",
      promptZh: "分配角色并建立第一课团队证据记录。不得提交交易指令。",
      showCardNumbers: false,
      cards: [
        {
          title: "Director",
          zhTitle: "负责人",
          body: "Coordinate the purpose and roles.",
          bodyZh: "协调团队目标与角色。",
          visual: investmentPhotos.investorMeetingReport
        },
        {
          title: "Researcher + Portfolio",
          zhTitle: "研究员 + 投资组合",
          body: "Find evidence and connect it to later choices.",
          bodyZh: "寻找证据并联系之后的选择。",
          visual: investmentPhotos.annualReports
        },
        {
          title: "Data Entry",
          zhTitle: "数据录入",
          body: "Create the team evidence row: people, purpose, roles, reason and review trigger.",
          bodyZh: "建立团队证据记录：成员、目标、角色、理由和复查条件。",
          visual: investmentPhotos.businessChartsPaper
        },
        {
          title: "Reporter",
          zhTitle: "报告员",
          body: "Explain the record; each student completes the individual exit judgement.",
          bodyZh: "说明记录；每位学生独立完成离堂判断。",
          visual: investmentPhotos.investorChartScreens
        }
      ],
      notes: "This is a summative SMG milestone. Smaller teams may combine roles. Check that every student is rostered on exactly one team and has a recorded role; do not assess the chosen mock goal itself and do not allow an order."
    },
    {
      type: "judgementFrame",
      eyebrow: "Output rehearsal",
      title: "Write one judgement about one goal",
      zhTitle: "针对一个目标写出一个判断",
      stages: [
        {
          label: "Choose a goal",
          labelZh: "选择目标",
          prompt: "Pick one goal from Workbook pp. 5–6.",
          zh: "从练习册第5至6页选择一个目标。"
        },
        {
          label: "State the next step",
          labelZh: "说明下一步",
          prompt: "Choose: keep the money available, gather more evidence, or consider investing.",
          zh: "选择：保持资金可用、收集更多证据或考虑投资。"
        },
        {
          label: "Give one reason",
          labelZh: "给出一个理由",
          prompt: "Use the time horizon or access need.",
          zh: "使用投资期限或资金使用需要。"
        },
        {
          label: "Add one condition",
          labelZh: "补充一个条件",
          prompt: "State how a possible loss could affect the goal.",
          zh: "说明可能损失会如何影响目标。"
        }
      ],
      finalPrompt: "Write one sentence: For [goal], the family should [next step] because [reason]; however, it must first check [condition].",
      finalPromptZh: "写一个句子：对于[目标]，家庭应该[下一步]，因为[理由]；但是，必须先检查[条件]。",
      notes: [
        "Students choose one goal from their own workbook rather than completing a predetermined answer.",
        "Give two minutes for an individual sentence before revealing the structure.",
        "Check for all four elements: named goal, next step, reason and condition."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Return to the dilemma",
      title: "What should the family do now?",
      zhTitle: "这个家庭现在应该怎么做？",
      question: "The family still has no stated goal. Which next step is most defensible, and what evidence is missing?",
      questionZh: "这个家庭仍没有明确目标。哪一个下一步最合理？还缺少什么证据？",
      revealTitle: "The family should define its financial goal before considering investment.",
      revealTitleZh: "这个家庭应在考虑投资前明确其财务目标。",
      visual: investmentPhotos.lesson1FamilyGoalTarget
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Exit ticket",
      zhTitle: "离堂小测",
      mode: "fillBlanks",
      items: [
        {
          prompt: "Investment means putting money into an __________.",
          answer: "asset",
          zh: "投资是把钱投入一种__________。",
          answerZh: "资产"
        },
        {
          prompt: "Investment seeks future return while accepting possible __________.",
          answer: "loss",
          zh: "投资寻求未来回报，同时接受可能发生的__________。",
          answerZh: "损失"
        },
        {
          prompt: "Before comparing investments, define the financial __________.",
          answer: "goal",
          zh: "在比较投资之前，家庭应先明确其财务__________。",
          answerZh: "目标"
        },
        {
          prompt: "Check when the money is needed and whether it must remain __________.",
          answer: "available",
          zh: "家庭应检查何时需要这笔钱，以及资金是否必须保持__________。",
          answerZh: "可用"
        }
      ],
      notes: "Students complete all four statements individually before the answers are revealed. Lesson 2 will compare goals by time horizon, liquidity need and suitability."
    },
  ]
};
