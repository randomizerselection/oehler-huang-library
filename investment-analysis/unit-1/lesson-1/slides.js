window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment and Financial Decision-Making",
    lessonLabel: "Unit 1 Lesson 1: Why do people and families invest?",
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
  handout: {
    title: "Why do people and families invest?",
    subtitle: "Unit 1 Lesson 1",
    description: "Use a family goal table to decide whether to keep money available, gather more information or consider investing.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Opening decision: choose the next step",
        instruction: "Use the real benchmark and mock family case to choose 1, 2 or 3, then return to the same decision at the end.",
        blocks: [
          {
            type: "scenario",
            title: "CNY 50,000—but what is it for?",
            context: "China's National Bureau of Statistics reported nationwide per-capita disposable income of CNY 43,377 in 2025. A hypothetical family has CNY 50,000 available after current commitments, but its future goal is unknown.",
            realData: [
              { label: "2025 nationwide per-capita disposable income", value: "CNY 43,377", source: "National Bureau of Statistics of China, published 20 Jan 2026" }
            ],
            fictionalElement: "The family, its CNY 50,000 and the four goal amounts are hypothetical classroom details.",
            lessonUse: "Use the benchmark to recognise that this is a significant decision, then choose whether to keep money available, gather more information or consider investing.",
            limitation: "A national per-capita figure does not show this family's income, current commitments, priorities or ability to accept loss."
          },
          {
            type: "prompts",
            prompts: [
              { label: "First judgement", prompt: "Circle one: 1 Keep available · 2 Need more information · 3 Consider investing. Explain your choice.", lines: 3 },
              { label: "Missing evidence", prompt: "What must the family know before it can choose a different next step?", lines: 4 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Vocabulary",
        instruction: "Complete the three Lesson 1 definitions.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Investment", prompt: "Investment puts money into an asset to seek future return while accepting possible __________.", answer: "loss" },
              { label: "Return", prompt: "Return is the gain or loss over a stated period, including price change and __________.", answer: "income" },
              { label: "Financial goal", prompt: "A financial goal states a future use, amount, priority and time __________.", answer: "horizon" }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Evidence and Data Analysis",
        instruction: "Read the family goal table before choosing the next step for each goal.",
        blocks: [
          {
            type: "table",
            columns: ["Goal", "Amount", "When needed", "Could a loss damage the goal?"],
            rows: [
              ["University fees", "CNY 180,000", "6 years", "Yes, if the amount is below target when fees are due"],
              ["Home deposit", "CNY 400,000", "10 years", "Yes, but the date has some flexibility"],
              ["Retirement income", "Not fixed yet", "30 years", "Yes, but the horizon is long"],
              ["Medical bill", "CNY 25,000", "4 months", "Yes, and access is urgent"]
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Classification judgement",
        instruction: "Classify each goal as keep available, need more information or consider investing.",
        blocks: [
          {
            type: "cases",
            cases: [
              { label: "A", text: "University fees in six years", answer: "Need more information: the fixed date and possible loss must be checked" },
              { label: "B", text: "Home deposit in ten years with some flexibility", answer: "Consider investing after checks: the horizon is longer, but loss could still delay the goal" },
              { label: "C", text: "Retirement income in thirty years", answer: "Need more information: the target and ability to accept loss are still missing" },
              { label: "D", text: "Medical bill in four months", answer: "Keep available: the money is needed soon" }
            ]
          }
        ]
      },
      {
        label: "5",
        title: "Misconception check",
        instruction: "Correct the shortcut with evidence from the family goal table.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Weak claim", prompt: "Investing is simply a way to make more money.", lines: 2 },
              { label: "Correction", prompt: "Explain why goal, time horizon, access need and possible loss must be checked first.", lines: 4 }
            ]
          }
        ]
      },
      {
        label: "6",
        title: "Individual output",
        instruction: "Use the lesson definitions and one condition from the family goal table.",
        blocks: [
          {
            type: "writing",
            question: "Choose one goal. State the next step and justify it with one reason and one condition.",
            keywords: ["next step", "future goal", "return", "time horizon", "possible loss"],
            lines: 8
          }
        ]
      }
    ],
    sources: "National Bureau of Statistics of China, Households' Income and Consumption Expenditure in 2025, published 20 Jan 2026; Investor.gov Introduction to Investing and IFEC Building an Investment Portfolio, accessed 13 Jul 2026. The NBS income figure is real and dated; the family and goal figures are hypothetical classroom details. This is not personal investment advice."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 1",
      title: "Why do people and families invest?",
      zhTitle: "人们和家庭为什么投资？",
      prominentTitle: true,
      visual: investmentPhotos.investorMeetingReport,
      notes: [
        "Keep this as a clean title screen.",
        "Move directly to the CNY 50,000 three-choice judgement before teaching any definition."
      ]
    },
    {
      type: "discussion",
      eyebrow: "First judgement",
      title: "CNY 50,000—but what is it for?",
      zhTitle: "50,000元人民币——用途是什么？",
      question: "A family has CNY 50,000 but no stated goal. What should it do next?",
      questionZh: "一个家庭有50,000元人民币，但没有明确目标。下一步该怎么做？",
      revealTitle: "Need more information before deciding",
      answer: "Without a stated goal, choose ‘Need more information.’ The 2025 national benchmark of CNY 43,377 per person shows the amount is significant, but the family still needs the purpose, amount, priority, time horizon, access need and consequence of loss.",
      answerZh: "没有明确目标时，应选择“需要更多信息”。2025年全国人均43,377元人民币的基准表明这笔金额很重要，但家庭仍需了解用途、金额、优先级、期限、资金使用需要和损失后果。",
      visual: investmentPhotos.lesson1ScenarioFinancialDocuments,
      notes: [
        "Keep only the short question visible; do not add statistics, choices or instructions to the hook screen.",
        "Ask students for a one-sentence answer and justification before revealing the model response.",
        "Use the NBS benchmark in the answer reveal and handout rather than crowding the opening question."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本课结束时，你能够",
      visual: investmentPhotos.businessChartsPaper,
      bullets: [
        "Define investment, return and financial goal.",
        "Choose a next step using goal, time, access and loss.",
        "Justify the choice with one reason and one condition."
      ],
      zhBullets: [
        "定义投资、回报和财务目标。",
        "根据目标、期限、资金使用和损失选择下一步。",
        "用一个理由和一个条件说明选择。"
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
      title: "What is missing from ‘invest to make more money’?",
      zhTitle: "“投资就是为了赚更多钱”缺少了什么？",
      question: "A student says, ‘Investing is simply a way to make more money.’ What does this answer leave out?",
      questionZh: "一名学生说：“投资只是赚更多钱的一种方式。”这个回答遗漏了什么？",
      revealTitle: "The shortcut ignores the goal and the possibility of loss",
      answer: "Investment seeks future return, but the return can be a gain or a loss. A careful decision also identifies the financial goal, the time horizon and the need to access the money.",
      answerZh: "投资寻求未来回报，但回报可能是收益，也可能是损失。谨慎的决定还要明确财务目标、投资期限以及使用资金的需要。",
      visual: investmentPhotos.assetCashSavings
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
      title: "Check the goal before considering investment",
      zhTitle: "考虑投资前先检查目标",
      visual: investmentPhotos.businessChartsPaper,
      flowStyle: "sequence",
      steps: [
        { text: "State the goal and required __________", answer: "amount", zh: "说明目标和所需金额", visual: investmentPhotos.lesson1ScenarioHouseForRent },
        { text: "Check when the money is needed and whether it must stay __________", answer: "available", zh: "检查何时需要资金以及资金是否必须保持可用", visual: investmentPhotos.assetCashSavings },
        { text: "Then seek return while accepting possible __________", answer: "loss", zh: "然后寻求回报，同时接受可能损失", visual: investmentPhotos.financialAnalysisDesk }
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
      title: "A future goal does not automatically justify investing",
      zhTitle: "未来目标不会自动说明投资是合理的",
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
      title: "Which statement uses the full definition?",
      zhTitle: "哪一个陈述使用了完整定义？",
      question: "Which statement best explains investment?",
      zh: "哪一个陈述最准确地解释了投资？",
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
      title: "Financial goals and time horizons",
      zhTitle: "财务目标与期限",
      notes: "Attempt -> define financial goal -> compare horizons -> classify goals -> prioritise evidence."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "What turns a future wish into a usable financial goal?",
      zhTitle: "什么能把未来愿望变成可用的财务目标？",
      question: "‘We want a better future’ is too vague for an investment decision. Which details would make the goal usable?",
      questionZh: "“我们想要更好的未来”对投资决策来说太模糊。哪些细节能使这个目标变得可用？",
      revealTitle: "A usable goal states the purpose, amount, priority and time horizon",
      answer: "The family must name what the money is for, how much is needed, how important the goal is and when the money is required.",
      answerZh: "家庭必须说明资金用途、所需金额、目标的重要程度以及何时需要这笔钱。",
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
      type: "evidenceSimulator",
      eyebrow: "Whole-class simulation",
      title: "What should the family do as each clue appears?",
      zhTitle: "随着每条线索出现，家庭应该怎么做？",
      prompt: "A family has CNY 50,000. After each clue, ask the class to choose 1, 2 or 3.",
      promptZh: "一个家庭有50,000元人民币。每条线索出现后，请全班选择1、2或3。",
      evidenceLabel: "Family-goal clues",
      decisionLabel: "Choose one after each clue",
      facts: [
        {
          label: "Purpose and amount",
          labelZh: "用途和金额",
          value: "Medical bill · CNY 25,000",
          valueZh: "医疗账单·25,000元人民币"
        },
        {
          label: "Time horizon",
          labelZh: "时间期限",
          value: "The bill is due in four months",
          valueZh: "账单将在四个月后到期"
        },
        {
          label: "Access need",
          labelZh: "资金使用需要",
          value: "The money must be available when the bill is due",
          valueZh: "账单到期时必须能够使用这笔钱"
        },
        {
          label: "Possible loss",
          labelZh: "可能的损失",
          value: "A loss could leave the medical bill unpaid",
          valueZh: "损失可能导致医疗账单无法支付"
        }
      ],
      decisionOptions: [
        { id: "keep-available", label: "Keep available", labelZh: "保持资金可用", detail: "Use this when the money is needed soon.", detailZh: "资金很快要使用时，选择此项。", tone: "caution" },
        { id: "more-information", label: "Need more information", labelZh: "需要更多信息", detail: "Use this when the amount, date or possible loss is unclear.", detailZh: "金额、日期或可能损失不清楚时，选择此项。", tone: "neutral" },
        { id: "consider-investing", label: "Consider investing", labelZh: "可考虑投资", detail: "Use this for a later goal with no urgent access need; check risk first.", detailZh: "目标较远且无需紧急使用资金时可选择；先检查风险。", tone: "positive" }
      ],
      conclusion: {
        verdict: "keep-available",
        tone: "caution",
        label: "Keep CNY 25,000 available",
        labelZh: "保留25,000元人民币以便使用",
        text: "The CNY 25,000 is needed in four months. A loss could leave the bill unpaid, so this amount should remain available. Judge the remaining CNY 25,000 separately.",
        textZh: "25,000元人民币四个月后就要使用。损失可能导致账单无法支付，因此这笔钱应保持可用。剩余25,000元人民币须另行判断。"
      },
      conclusionLabel: "Best next step",
      instruction: "Students show 1, 2 or 3 with their fingers. The teacher clicks only Reveal next clue.",
      notes: [
        "This is teacher-led. Students show 1, 2 or 3; there is no on-screen vote to record.",
        "Reveal one clue, ask one student to justify whether the class should change its choice, then reveal the next clue.",
        "After the fourth clue, ask for a final choice before showing the conclusion.",
        "Keep the conclusion limited to the medical-bill portion. Do not infer that the rest of the CNY 50,000 should be invested."
      ]
    },
    {
      type: "classificationTask",
      compact: true,
      eyebrow: "Evidence task",
      title: "Choose the next step for each goal",
      zhTitle: "为每个目标选择下一步",
      prompt: "Medical bill is the worked example. Choose the next step for the other three goals, then defend one.",
      promptZh: "医疗账单是示例。为其余三个目标选择下一步，然后说明一个理由。",
      categories: [
        { title: "Keep available", zhTitle: "保持资金可用", clue: "money needed soon; loss would damage the goal" },
        { title: "Need more information", zhTitle: "需要更多信息", clue: "amount, date or loss capacity is missing" },
        { title: "Consider investing", zhTitle: "可考虑投资", clue: "longer horizon; urgent access not needed" }
      ],
      items: [
        { label: "A", text: "Retirement income in 30 years; target not fixed.", zh: "三十年后的退休收入；目标金额未定。", answer: "Need more information", answerZh: "需要更多信息", reason: "The long horizon helps, but target and loss capacity are missing.", reasonZh: "长期限有利，但仍缺目标金额和损失承受能力。" },
        { label: "C", text: "CNY 400k home deposit; 10 years; flexible date.", zh: "40万元人民币首付；十年；日期灵活。", answer: "Consider investing", answerZh: "可考虑投资", reason: "The long, flexible horizon supports consideration; loss still matters.", reasonZh: "长期且灵活，可考虑投资；损失仍重要。" },
        { label: "D", text: "CNY 180k university fees; 6 years; fixed date.", zh: "18万元人民币学费；六年；日期固定。", answer: "Need more information", answerZh: "需要更多信息", reason: "Six years gives time, but loss near the fixed date could block the goal.", reasonZh: "六年提供时间，但临近固定日期的损失可能阻碍目标。" }
      ],
      sharePrompt: "Use goal, horizon and possible loss in one justification.",
      sharePromptZh: "在一个理由中使用目标、期限和可能损失。"
    },
    {
      type: "quiz",
      eyebrow: "Quick check",
      title: "Start with the goal before comparing investments",
      zhTitle: "比较投资前先了解目标",
      visual: investmentPhotos.businessChartsPaper,
      question: "Before comparing investment choices, what should the family know?",
      zh: "在比较投资选择之前，家庭应该了解什么？",
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
      title: "Possible return alone does not justify investing",
      zhTitle: "仅有可能回报不能说明投资是合理的",
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
      eyebrow: "Part 3",
      title: "Investment reasoning and judgement",
      zhTitle: "投资推理与判断",
      notes: "Build the reasoning chain -> compare judgements -> revise the first answer -> submit."
    },
    {
      type: "peerTask",
      taskType: "missingSentence",
      eyebrow: "Output rehearsal",
      title: "Build a clear next-step judgement",
      zhTitle: "形成清晰的下一步判断",
      prompt: "Add the missing sentence so the judgement names a next step, a reason and a condition.",
      promptZh: "补全句子，使判断包含下一步、理由和条件。",
      steps: [
        { label: "1", text: "The home-deposit goal is ten years away and the date is flexible.", zh: "住房首付目标在十年后，日期可以调整。" },
        { label: "2", text: "__________", answer: "The family may consider investing because urgent access is not needed, but it must check how a loss could delay the goal.", zh: "家庭可考虑投资，因为无需紧急使用资金，但必须检查损失会如何推迟目标。" },
        { label: "3", text: "Therefore, set the access and loss conditions before comparing investments.", zh: "因此，比较投资前先确定资金使用和损失条件。" }
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: "The family may consider investing because urgent access is not needed, but it must check how a loss could delay the goal.",
      missingSentenceAnswerZh: "家庭可考虑投资，因为无需紧急使用资金，但必须检查损失会如何推迟目标。",
      sharePrompt: "Underline the reason once; the condition twice.",
      sharePromptZh: "理由画一条线；条件画两条线。"
    },
    {
      type: "compare",
      eyebrow: "Improve the answer",
      title: "Replace vague labels with a clear next step",
      zhTitle: "用清晰的下一步替换模糊标签",
      mode: "fillBlanks",
      leftTitle: "Vague label",
      leftTitleZh: "模糊标签",
      left: [
        { label: "1", text: "Says only, ‘Investment may __________.’", answer: "help", zh: "只说“投资可能有__________”。", answerZh: "帮助" },
        { label: "2", text: "Does not name an action or use goal __________.", answer: "evidence", zh: "没有说明行动，也没有使用目标__________。", answerZh: "证据" }
      ],
      rightTitle: "Clear next step",
      rightTitleZh: "清晰的下一步",
      right: [
        { label: "1", text: "Names the action: keep available, need more information or consider __________.", answer: "investing", zh: "说明行动：保持资金可用、需要更多信息或考虑__________。", answerZh: "投资" },
        { label: "2", text: "Uses ‘because’ to connect the goal, horizon, access and possible __________.", answer: "loss", zh: "用“因为”连接目标、期限、资金使用和可能的__________。", answerZh: "损失" }
      ],
      prompt: "Complete the contrast, then improve one vague judgement from earlier in the lesson.",
      promptZh: "完成对比，然后改进本课前面出现的一个模糊判断。"
    },
    {
      type: "discussion",
      eyebrow: "Return to the dilemma",
      title: "Return to the hook: choose the next step",
      zhTitle: "回到开场：选择下一步",
      question: "The family still has no stated goal. Which next step is most defensible, and what evidence is missing?",
      questionZh: "这个家庭仍没有明确目标。哪一个下一步最合理？还缺少什么证据？",
      revealTitle: "Need more information before considering investment",
      answer: "Choose ‘Need more information.’ The family must define the purpose, amount, priority, time horizon, access need and consequence of loss. The national income benchmark cannot supply that family-specific evidence.",
      answerZh: "选择“需要更多信息”。家庭必须明确用途、金额、优先级、期限、资金使用需要和损失后果。全国收入基准不能提供这些家庭特定证据。",
      visual: investmentPhotos.investorMeetingReport
    },
    {
      type: "exam",
      eyebrow: "Exit ticket",
      title: "Choose and justify the next step",
      zhTitle: "选择并说明下一步",
      revealKeywords: true,
      prompt: "Choose one goal. Select: keep available, need more information or consider investing. Justify with one reason and one condition. [4]",
      zh: "选择一个目标。选择保持资金可用、需要更多信息或考虑投资，并用一个理由和一个条件说明。[4]",
      keywords: ["next step", "financial goal", "because", "however", "horizon / access / loss"],
      notes: [
        "Collect the response individually before revealing the keyword check.",
        "Lesson 2 will compare goals by time horizon, liquidity need and suitability."
      ]
    }
  ]
};
