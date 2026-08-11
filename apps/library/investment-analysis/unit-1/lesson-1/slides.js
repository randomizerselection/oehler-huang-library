window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment and Financial Decision-Making",
    lessonLabel: "Unit 1 Lesson 1: Why do people and families invest?",
    deliveryPlan: {
      coreRoute: "Teach in one standard period; section dividers are transitions, not separate activities.",
      phaseShares: { launchAndRetrieval: "15%", keyIdeaAndPractice: "30%", smgCoreLab: "40%", outputAndExit: "15%" },
      optionalReinforcementSlides: ["Which statement fully defines investment?", "What must the family know first?"],
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
    studentAction: "Form the SMG team, choose a shared long-horizon purpose, assign the first roles and open the team and individual evidence records.",
    requiredOutput: "Complete Workbook pp. 1-3 and 8 and the individual exit judgement; add the opening authoritative team-log row.",
    workbook: {
      pages: "1-3 and 8",
      treatment: "complete",
      studentAction: "Set up the personal workbook, record only the team ID or username, assign roles and complete the opening orientation."
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
      phases: ["Define", "Identify", "Decide"],
      bullets: [
        "Investment, return and financial goal",
        "Four facts needed before investing",
        "SMG team purpose, first roles and evidence record"
      ],
      zhBullets: [
        "投资、回报与财务目标",
        "投资前需要明确的四项信息",
        "SMG团队目标、首轮角色与证据记录"
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
        { label: "Future return with possible loss", labelZh: "寻求未来回报并接受可能损失", visual: investmentPhotos.financialAnalysisDesk }
      ],
      definition: "Investment is putting money into an asset to seek future return while accepting possible loss.",
      definitionBlanks: ["asset", "future return", "possible loss"],
      definitionZh: "投资是把钱投入资产以寻求未来回报，同时接受可能发生的损失。"
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
          visual: investmentPhotos.lesson1ScenarioHouseForRent
        },
        {
          title: "Access",
          titleZh: "资金使用",
          body: "Check when the money is needed and whether it must remain available.",
          zh: "检查何时需要这笔钱，以及资金是否必须保持可用。",
          visual: investmentPhotos.assetCashSavings
        },
        {
          title: "Possible loss",
          titleZh: "可能损失",
          body: "Check what loss could be accepted without damaging the goal.",
          zh: "检查在不损害目标的情况下可以接受多大损失。",
          visual: investmentPhotos.financialAnalysisDesk
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
        { label: "Gain, loss, price change and income", labelZh: "收益、损失、价格变化和收入", visual: investmentPhotos.keywordDividendCheque }
      ],
      definition: "Return is the gain or loss from an investment over a stated period, including price change and income.",
      definitionBlanks: ["gain or loss", "stated period", "price change and income"],
      definitionZh: "回报是投资在规定期间内的收益或损失，包括价格变化和收入。"
    },
    {
      type: "yesNoCheck",
      eyebrow: "Check the idea",
      title: "Does every future goal justify investing?",
      zhTitle: "每个未来目标都适合投资吗？",
      classroomLargeText: true,
      prompt: "Vote yes or no before revealing each reason.",
      promptZh: "先投票判断是或否，再揭示每个理由。",
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
        { label: "Use, amount, priority and horizon", labelZh: "用途、金额、优先级和期限", visual: investmentPhotos.lesson1ScenarioFinancialDocuments }
      ],
      definition: "A financial goal is a stated future use of money with an amount, priority and time horizon.",
      definitionBlanks: ["future use of money", "amount", "priority", "time horizon"],
      definitionZh: "财务目标是对资金未来用途的明确说明，并包括金额、优先级和投资期限。"
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
      title: "Is possible return enough?",
      zhTitle: "只看到可能的回报就足够吗？",
      prompt: "Judge each correction before revealing the explanation.",
      promptZh: "先判断每个修正，再揭示解释。",
      items: [
        { text: "The statement is incomplete because return can be a gain or a loss.", zh: "该陈述不完整，因为回报可能是收益，也可能是损失。", answer: true, answerZh: "是", reason: "Possible loss is part of the definition of investment.", reasonZh: "可能损失是投资定义的一部分。" },
        { text: "A high possible return makes an investment suitable for every goal.", zh: "较高的可能回报使投资适合每一个目标。", answer: false, answerZh: "否", reason: "Goal, horizon, access need and possible loss still differ.", reasonZh: "目标、期限、资金使用需要和可能损失仍然不同。" },
        { text: "A family may invest to move resources toward a future goal while accepting uncertainty.", zh: "家庭可以通过投资把资源用于未来目标，同时接受不确定性。", answer: true, answerZh: "是", reason: "This connects the reason for investing to both a goal and risk.", reasonZh: "这把投资理由同时与目标和风险联系起来。" }
      ]
    },
    {
      type: "section",
      eyebrow: "Course laboratory",
      title: "SMG team mandate",
      zhTitle: "SMG团队任务准则",
      notes: "The next two slides are the Lesson 1 SMG core lab. Allow roughly 15-20 minutes: students apply the goal-first concept by forming the team, writing a mock long-horizon purpose, assigning first roles and opening the evidence record."
    },
    {
      type: "flow",
      eyebrow: "SMG core lab",
      title: "Define the team investment purpose",
      zhTitle: "明确团队投资目标",
      prompt: "Agree one clearly labelled mock long-horizon purpose before discussing any security.",
      promptZh: "在讨论任何证券之前，先商定一个明确标注为模拟的长期目标。",
      steps: [
        { label: "1", text: "Form a team of three to five. Open Workbook pp. 1-3 and 8; record an ID, never a password.", zh: "组成三至五人团队。打开练习册第1至3页和第8页；只记录编号，绝不记录密码。" },
        { label: "2", text: "Record one mock purpose. Choose no security until goal, horizon, liquidity and risk rules are agreed.", zh: "记录一个模拟目标。商定目标、期限、流动性和风险规则前，不选择证券。" }
      ],
      sharePrompt: "Each student records the purpose and why it must come before an investment choice.",
      sharePromptZh: "每位学生记录团队目标，并说明为什么必须先明确目标再选择投资。"
    },
    {
      type: "flow",
      eyebrow: "SMG evidence checkpoint",
      title: "Open the team evidence record",
      zhTitle: "建立团队证据记录",
      prompt: "Assign the first roles and create the Lesson 1 evidence row. Do not enter an order.",
      promptZh: "分配首轮角色并建立第一课证据记录。不得提交交易指令。",
      steps: [
        { label: "1", text: "Assign Director, Researcher, Portfolio, Data Entry and Reporter roles; combine roles in smaller teams.", zh: "分配负责人、研究员、投资组合、数据录入和报告员角色；小组人数不足时可合并角色。" },
        { label: "2", text: "Add one team evidence row: date, purpose, names, roles, decision reason and the Lesson 7 review trigger.", zh: "添加一条团队证据记录：日期、目标、姓名、角色、决策理由和第七课复查条件。" }
      ],
      sharePrompt: "Submit one team evidence row. Every student then completes the individual exit judgement later in this deck.",
      sharePromptZh: "提交一条团队证据记录。随后每位学生在本课件中独立完成离堂判断。",
      notes: "This is a summative SMG milestone. Check that every student is rostered on exactly one team and has a recorded role; do not assess the chosen mock goal itself."
    },
    {
      type: "answer",
      eyebrow: "Output rehearsal",
      title: "Write a clear next-step judgement",
      zhTitle: "写出清晰的下一步判断",
      items: [
        {
          prompt: "The family may __________ because urgent access is not needed; however, it must check how a loss could delay the goal.",
          answer: "consider investing",
          zh: "家庭可__________，因为无需紧急使用资金；但是，必须检查损失会如何推迟目标。",
          answerZh: "考虑投资"
        }
      ],
      notes: "Students complete the sentence individually, then underline the reason once and the condition twice."
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
      eyebrow: "Exit ticket",
      title: "Fill in the blanks",
      zhTitle: "完成填空",
      mode: "fillBlanks",
      items: [
        {
          prompt: "Investment seeks future return while accepting possible __________.",
          answer: "loss",
          zh: "投资寻求未来回报，同时接受可能发生的__________。",
          answerZh: "损失"
        },
        {
          prompt: "Before comparing investments, a family should first define its financial __________.",
          answer: "goal",
          zh: "在比较投资之前，家庭应先明确其财务__________。",
          answerZh: "目标"
        },
        {
          prompt: "The family should check when the money is needed and whether it must remain __________.",
          answer: "available",
          zh: "家庭应检查何时需要这笔钱，以及资金是否必须保持__________。",
          answerZh: "可用"
        }
      ],
      notes: "Students complete all three statements individually before the answers are revealed. Lesson 2 will compare goals by time horizon, liquidity need and suitability."
    },
  ]
};
