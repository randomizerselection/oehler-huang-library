window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit 1 Lesson 1: Investment analysis, assets and shares",
    sources: [
      {
        label: "Tencent investor relations",
        note: "Used for company identity and the opening classroom investment question.",
        date: "Accessed 26 June 2026",
        url: "https://www.tencent.com/en-us/investors.html"
      },
      {
        label: "Local investment visual pack",
        note: "Used for classroom visuals on analysis, assets, asset types and shares.",
        date: "Compiled July 2026",
        url: "assets/images/investment-analysis/"
      }
    ]
  },
  handout: {
    title: "Investment analysis, assets and shares",
    subtitle: "Unit 1 Lesson 1",
    description: "Use the Tencent question to define investment analysis, separate investment from speculation, classify assets, and explain what buying a share means.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Opening judgement",
        instruction: "Answer before the lesson, then improve your answer at the end.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Initial answer", prompt: "Would you buy shares in Tencent? Give one reason.", lines: 3 },
              { label: "Better question", prompt: "What evidence would you need before deciding?", lines: 3 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Vocabulary",
        instruction: "Complete the Lesson 1 definitions.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Investment analysis", prompt: "Investment analysis is the process of evaluating an investment opportunity with evidence to judge its potential return, risk and __________ before making a decision.", answer: "suitability" },
              { label: "Return", prompt: "Return is the gain or __________ earned from an investment over a stated holding period, including price change and any income received.", answer: "loss" },
              { label: "Risk", prompt: "Risk is the possibility that results, returns or prices are worse than __________.", answer: "expected" },
              { label: "Investment", prompt: "Investment is putting money into an asset to seek future __________ while accepting possible loss.", answer: "return" },
              { label: "Speculation", prompt: "Speculation is trying to profit from uncertain price __________, often over a short time and with weaker evidence than investment analysis requires.", answer: "movements" },
              { label: "Asset", prompt: "An asset is something with economic __________ that can be owned or controlled, such as cash, property, a bond, a share or a business resource.", answer: "value" },
              { label: "Share", prompt: "A share is one unit of ownership in a company, giving the shareholder a claim on part of the company's __________ and, depending on the share class, certain rights such as votes or dividends.", answer: "equity" }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Course boundaries",
        instruction: "Decide what belongs in this course.",
        blocks: [
          {
            type: "cases",
            cases: [
              { label: "A", text: "Use annual reports and dated evidence.", answer: "Yes" },
              { label: "B", text: "Predict next week's exact share price.", answer: "No" },
              { label: "C", text: "Compare potential return, risk and suitability.", answer: "Yes" },
              { label: "D", text: "Give personal buy or sell tips.", answer: "No" }
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Assets",
        instruction: "List and rank asset types.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Four asset types", prompt: "Write four asset types from memory.", lines: 4 },
              { label: "Risk ranking", prompt: "Rank cash/savings, property, shares and commodities from lower to higher risk. Explain one choice.", lines: 4 }
            ]
          }
        ]
      },
      {
        label: "5",
        title: "Shares",
        instruction: "Separate what a share gives from what it does not guarantee.",
        blocks: [
          {
            type: "cases",
            cases: [
              { label: "A", text: "One unit of ownership", answer: "Share gives this" },
              { label: "B", text: "Possible dividends", answer: "May give this" },
              { label: "C", text: "Guaranteed profit", answer: "Does not give this" },
              { label: "D", text: "Control of the whole company", answer: "Does not give this" }
            ]
          }
        ]
      },
      {
        label: "6",
        title: "Exit answer",
        instruction: "Return to the Tencent question using the key terms.",
        blocks: [
          {
            type: "writing",
            question: "Explain why a student cannot decide to buy shares in Tencent only because the company is familiar.",
            keywords: ["investment analysis", "evidence", "return", "risk", "suitability", "share", "not guaranteed"],
            lines: 8
          }
        ]
      }
    ],
    sources: "Tencent company identity: Tencent investor relations, accessed 26 Jun 2026. Visuals are local classroom assets. This lesson is a classroom analysis exercise, not personal investment advice."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 1",
      title: "What is investment analysis?",
      zhTitle: "什么是投资分析？",
      prominentTitle: true,
      visual: investmentPhotos.financialAnalysisDesk,
      notes: [
        "Title-only hero in the Economics style: no visible prompt, task, or extra teaching text.",
        "Teacher bridge: move straight to the Tencent starter question on the next slide."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Starter",
      title: "Would you buy shares in Tencent?",
      zhTitle: "你会买腾讯股票吗？",
      question: "Would you buy shares in Tencent? Give one reason.",
      questionZh: "你会买腾讯股票吗？给出一个理由。",
      revealTitle: "Not yet: check the evidence first",
      answer: "Not yet. A familiar company is not enough. First check evidence on potential return, risk, price and investor fit.",
      answerZh: "还不能。熟悉公司还不够。先检查潜在回报、风险、价格和投资者适合度的证据。",
      visual: investmentPhotos.lesson1TencentBinhaiBuilding01,
      notes: [
        "Take a quick yes/no vote.",
        "Do not correct students yet; capture the reasons so later definitions answer a real classroom need."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本课结束时，你能够",
      visual: investmentPhotos.financeChartWhiteboard,
      bullets: [
        "define investment analysis: return, risk, fit",
        "classify assets by risk",
        "explain what one share gives"
      ],
      zhBullets: [
        "定义投资分析：回报、风险、适合性",
        "按风险区分资产",
        "解释一股股票能给什么"
      ],
      highlights: [
        ["investment analysis", "return", "risk", "fit"],
        ["assets", "risk"],
        ["one share"]
      ],
      zhHighlights: [
        ["投资分析", "回报", "风险", "适合性"],
        ["风险", "资产"],
        ["一股股票"]
      ],
      phases: ["Define", "Compare", "Explain"]
    },
    {
      type: "section",
      eyebrow: "Part 1",
      title: "Investment analysis",
      zhTitle: "投资分析",
      subtitle: "From opinion to evidence before judgement",
      notes: "Section 1 establishes the method and the course boundary."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "What is investment analysis?",
      zhTitle: "什么是投资分析？",
      question: "What is investment analysis?",
      questionZh: "什么是投资分析？",
      visual: investmentPhotos.stockReportCalculator,
      revealTitle: "It checks evidence before action",
      answer: "Investment analysis checks evidence before deciding: possible return, risk, price and whether the investment fits the investor.",
      answerZh: "投资分析是在行动前检查证据：可能回报、风险、价格，以及这项投资是否适合投资者。",
      notes: "Students should try a definition before the formal term slide."
    },
    {
      type: "visualPause",
      title: "Visual pause: investment analysis",
      visual: investmentPhotos.businessChartsPaper,
      notes: [
        "Image-only bridge before the definition.",
        "Ask silently: what evidence is being marked before making a judgement?",
        "Bridge: investment analysis is an evidence habit."
      ]
    },
    {
      type: "term",
      eyebrow: "Definition",
      title: "Investment analysis",
      term: "Investment analysis",
      termZh: "投资分析",
      visual: investmentPhotos.investorChartScreens,
      keywordVisuals: [
        { label: "Evidence before action", labelZh: "行动前看证据", visual: investmentPhotos.stockReportCalculator }
      ],
      definition: "Investment analysis is the process of evaluating an investment opportunity with evidence to judge its potential return, risk and suitability before making a decision.",
      definitionBlanks: ["potential return"],
      definitionZh: "投资分析是利用证据评估投资机会的过程，在作出决定前判断其潜在回报、风险和适合性。",
      notes: "Use the full textbook-style definition from references/investment-analysis-definitions.md."
    },
    {
      type: "flow",
      eyebrow: "Definition breakdown",
      title: "The definition has three checks",
      zhTitle: "定义包含三个检查点",
      visual: investmentPhotos.investorMeetingReport,
      flowStyle: "definitionChecks",
      steps: [
        {
          label: "01",
          title: "Potential return",
          visual: investmentPhotos.keywordDividendCheque,
          visualLabel: "Return",
          visualLabelZh: "回报",
          text: "What the investor may gain or lose.",
          zh: "潜在回报：可能赚多少或亏多少。"
        },
        {
          label: "02",
          title: "Risk",
          visual: investmentPhotos.lesson1ScenarioRedMarketLosses,
          visualLabel: "Risk",
          visualLabelZh: "风险",
          text: "What could be worse than expected.",
          zh: "风险：结果可能比预期更差。"
        },
        {
          label: "03",
          title: "Suitability",
          visual: investmentPhotos.investorMeetingReport,
          visualLabel: "Suitability",
          visualLabelZh: "适合性",
          text: "Whether it fits this investor's goals, time and risk tolerance.",
          zh: "适合性：是否符合目标、时间和风险承受能力。"
        }
      ],
      notes: "Keep suitability brief: it is not personalised advice; it explains why the same opportunity may fit one investor but not another."
    },
    {
      type: "term",
      eyebrow: "Definition",
      title: "Return",
      term: "Return",
      termZh: "回报",
      visual: investmentPhotos.marketScreen,
      keywordVisuals: [
        { label: "Gain, loss or income", labelZh: "收益、损失或收入", visual: investmentPhotos.keywordDividendCheque }
      ],
      definition: "Return is the gain or loss earned from an investment over a stated holding period, including price change and any income received.",
      definitionBlanks: ["gain or loss"],
      definitionZh: "回报是投资在某一持有期间获得的收益或损失，包括价格变动和收到的任何收入。",
      notes: "Use the shared return definition even though the formula comes later in Unit 3."
    },
    {
      type: "term",
      eyebrow: "Definition",
      title: "Risk",
      term: "Risk",
      termZh: "风险",
      visual: investmentPhotos.lesson1ScenarioRedMarketLosses,
      keywordVisuals: [
        { label: "Worse than expected", labelZh: "比预期更差", visual: investmentPhotos.keywordDemandRiskEmptyStore }
      ],
      definition: "Risk is the possibility that results, returns or prices are worse than expected.",
      definitionBlanks: ["worse than expected"],
      definitionZh: "风险是结果、回报或价格比预期更差的可能性。",
      notes: "Keep risk broad and beginner-friendly. Detailed risk types come later."
    },
    {
      type: "quiz",
      eyebrow: "Retrieval check",
      title: "What is investment analysis?",
      zhTitle: "什么是投资分析？",
      question: "Which response is investment analysis?",
      zh: "哪一个回应属于投资分析？",
      visual: investmentPhotos.financeChartWhiteboard,
      choices: [
        "Evaluate dated evidence on return, risk, price and fit",
        "Use Tencent's reputation as evidence that the share is suitable",
        "Treat a lower recent price as a sign the return is attractive",
        "Read one positive source and make it the main reason to buy"
      ],
      answer: 0,
      explanation: "The correct response combines dated evidence with return, risk, price and fit. The other choices use one clue, but not a full investment analysis.",
      explanationZh: "正确回应会把有日期的证据与回报、风险、价格和适合性结合起来。其他选项只使用一个线索，不是完整的投资分析。"
    },
    {
      type: "classificationTask",
      eyebrow: "Course method",
      title: "For each statement, choose the main focus: return, risk or suitability.",
      zhTitle: "给每个说法分类：主要是在判断回报、风险，还是适合性。",
      visual: investmentPhotos.annualReports,
      compact: true,
      categories: [
        { title: "Return", zhTitle: "回报", clue: "gain, loss, income or price change", visual: investmentPhotos.keywordDividendCheque },
        { title: "Risk", zhTitle: "风险", clue: "what could be worse than expected", visual: investmentPhotos.lesson1ScenarioRedMarketLosses },
        { title: "Suitability", zhTitle: "适合性", clue: "fit for this investor", visual: investmentPhotos.investorMeetingReport }
      ],
      items: [
        {
          label: "A",
          text: "A new rule or weaker profit could make the share price fall.",
          zh: "新规定或利润变弱可能使股价下跌。",
          answer: "Risk",
          answerZh: "风险",
          reason: "The sentence is mostly about what could go worse than expected.",
          reasonZh: "这个说法主要在判断哪些结果可能比预期更差。"
        },
        {
          label: "B",
          text: "This investor needs the money next year, so a volatile share may not fit.",
          zh: "这位投资者明年需要用钱，所以波动大的股票可能不适合。",
          answer: "Suitability",
          answerZh: "适合性",
          reason: "The sentence matches the opportunity to the investor's time and needs.",
          reasonZh: "这个说法把投资机会与投资者的时间和需要进行匹配。"
        },
        {
          label: "C",
          text: "The share could pay dividends and rise in price over three years.",
          zh: "这只股票三年内可能支付股息并上涨。",
          answer: "Return",
          answerZh: "回报",
          reason: "The sentence is mostly about possible gain.",
          reasonZh: "这个说法主要在判断可能收益。"
        }
      ],
      sharePrompt: "Pick one borderline statement and explain why it is mostly one category.",
      sharePromptZh: "选择一个容易混淆的说法，解释为什么它主要属于某一类。",
      notes: "Use this to replace the binary boundary check with classification and justification. Accept alternative answers only if students defend the main focus."
    },
    {
      type: "compare",
      eyebrow: "Key distinction",
      title: "Investment or speculation?",
      zhTitle: "投资还是投机？",
      mode: "fillBlanks",
      visual: investmentPhotos.speculatorInvestorRace,
      leftVisual: investmentPhotos.stockReportCalculator,
      leftVisualLabel: "Evidence habit",
      leftVisualLabelZh: "证据习惯",
      rightVisual: investmentPhotos.lesson1ScenarioSmartphoneCandlestick,
      rightVisualLabel: "Price chase",
      rightVisualLabelZh: "追逐价格",
      leftTitle: "Investment",
      leftTitleZh: "投资",
      rightTitle: "Speculation",
      rightTitleZh: "投机",
      left: [
        { label: "1", text: "Putting money into an __________ to seek future return while accepting possible loss.", answer: "asset", zh: "把钱投入__________以寻求未来回报，同时接受可能亏损。", answerZh: "资产" },
        { label: "2", text: "Uses evidence about return, risk and __________ before judging.", answer: "suitability", zh: "判断前使用关于回报、风险和__________的证据。", answerZh: "适合性" }
      ],
      right: [
        { label: "1", text: "Trying to profit from uncertain price __________, often over a short time.", answer: "movements", zh: "试图从不确定的价格__________中获利，通常时间较短。", answerZh: "变动" },
        { label: "2", text: "Often starts from a guess, tip or selected __________.", answer: "evidence", zh: "常从猜测、消息或被挑选的__________开始。", answerZh: "证据" }
      ],
      prompt: "Fill the blanks, then use the contrast for the five scenario judgments.",
      promptZh: "先补全空格，然后用这个对比判断接下来的五个情境。",
      notes: "Use this as a quick retrieval check before scenario practice. Reveal the blanks, then ask students to apply the contrast."
    },
    {
      type: "discussion",
      eyebrow: "Scenario 1",
      title: "Investment or speculation?",
      zhTitle: "投资还是投机？",
      visual: investmentPhotos.lesson1ScenarioFinancialDocuments,
      question: "Maya reads Tencent's annual report, checks profit, risk and price, then considers holding the share for three years. Investment or speculation?",
      questionZh: "Maya 阅读腾讯年报，检查利润、风险和价格，然后考虑持有这只股票三年。投资还是投机？",
      revealTitle: "This is investment",
      answer: "She is using evidence before judgement and has a longer holding period. The return is still not guaranteed.",
      answerZh: "她在判断前使用证据，并且有较长持有期。但回报仍然不保证。",
      notes: "Use the annual-report photo as the evidence cue. Ask students to name the evidence and the time horizon."
    },
    {
      type: "discussion",
      eyebrow: "Scenario 2",
      title: "Investment or speculation?",
      zhTitle: "投资还是投机？",
      visual: investmentPhotos.lesson1ScenarioSmartphoneCandlestick,
      question: "Leo sees a share jump on a phone chart and buys quickly because he thinks it will rise again before lunch. Investment or speculation?",
      questionZh: "Leo 在手机图表上看到一只股票上涨，就迅速买入，因为他认为午饭前还会再涨。投资还是投机？",
      revealTitle: "This is speculation",
      answer: "The decision chases a short-term price movement and gives no evidence about return, risk or suitability.",
      answerZh: "这个决策追逐短期价格变动，没有关于回报、风险或适合性的证据。",
      notes: "The smartphone market chart should cue speed and short-term price chasing."
    },
    {
      type: "discussion",
      eyebrow: "Scenario 3",
      title: "Investment or speculation?",
      zhTitle: "投资还是投机？",
      visual: investmentPhotos.lesson1ScenarioHouseForRent,
      question: "A family compares rent, repair costs, location risk and loan payments before buying a small flat to rent out. Investment or speculation?",
      questionZh: "一个家庭在买小公寓出租前，比较租金、维修成本、地段风险和贷款还款。投资还是投机？",
      revealTitle: "This is investment",
      answer: "They compare possible return with risks and costs before deciding. It can still lose money.",
      answerZh: "他们在决策前比较可能回报、风险和成本。它仍然可能亏损。",
      notes: "This connects the next section on assets without turning the lesson into property advice."
    },
    {
      type: "discussion",
      eyebrow: "Scenario 4",
      title: "Investment or speculation?",
      zhTitle: "投资还是投机？",
      visual: investmentPhotos.lesson1ScenarioRedMarketLosses,
      question: "A student follows an online tip: 'Buy today because everyone is excited.' She checks no source, price or risk. Investment or speculation?",
      questionZh: "一名学生听从网络消息：“今天买，因为大家都很兴奋。”她没有检查来源、价格或风险。投资还是投机？",
      revealTitle: "This is speculation",
      answer: "The decision starts from a tip and confidence, not source-dated evidence or risk-return analysis.",
      answerZh: "这个决策从消息和自信开始，而不是从有来源日期的证据或风险回报分析开始。",
      notes: "The trading-app photo should make the online-tip scenario concrete."
    },
    {
      type: "discussion",
      eyebrow: "Scenario 5",
      title: "Investment or speculation?",
      zhTitle: "投资还是投机？",
      visual: investmentPhotos.lesson1ScenarioContainerPort,
      question: "An investor studies a shipping company's revenue, fuel costs, demand risk and share price before buying for a two-year plan. Investment or speculation?",
      questionZh: "一位投资者研究一家航运公司的收入、燃料成本、需求风险和股价，然后按两年计划买入。投资还是投机？",
      revealTitle: "This is investment",
      answer: "The judgement uses business evidence, price and risk before a planned holding period. The result is uncertain.",
      answerZh: "这个判断在计划持有期前使用企业证据、价格和风险。结果仍然不确定。",
      notes: "Use the port photo to connect a real business setting with risk and return evidence."
    },
    {
      type: "section",
      eyebrow: "Part 2",
      title: "Assets",
      zhTitle: "资产",
      subtitle: "What can be owned, and how risky might it be?",
      notes: "Section 2 gives students the vocabulary needed before shares."
    },
    {
      type: "visualPause",
      title: "Visual pause: asset",
      visual: investmentPhotos.assetPropertyBuilding,
      notes: [
        "Image-only bridge before the asset definition.",
        "Ask silently: why might a building count as an asset?",
        "Bridge: an asset has value and can be owned."
      ]
    },
    {
      type: "term",
      eyebrow: "Definition",
      title: "Asset",
      term: "Asset",
      termZh: "资产",
      keywordVisuals: [
        { label: "Owned economic value", labelZh: "可拥有的经济价值", visual: investmentPhotos.assetPropertyBuilding }
      ],
      definition: "An asset is something with economic value that can be owned or controlled, such as cash, property, a bond, a share or a business resource.",
      definitionBlanks: ["value"],
      definitionZh: "资产是指具有经济价值、可以被拥有或控制的东西，例如现金、房产、债券、股票或企业资源。",
      notes: "Keep this broad: the next slide gives concrete types."
    },
    {
      type: "visualGrid",
      eyebrow: "Asset types",
      title: "Types of assets",
      zhTitle: "资产类型",
      prompt: "Which assets do you see here?",
      promptZh: "你在这里看到了哪些资产？",
      revealCardLabels: true,
      showCardNumbers: false,
      cards: [
        {
          title: "Cash and savings",
          zhTitle: "现金和储蓄",
          visual: investmentPhotos.assetCashSavings
        },
        {
          title: "Property",
          zhTitle: "房产",
          visual: investmentPhotos.assetPropertyBuilding
        },
        {
          title: "Shares",
          zhTitle: "股票",
          visual: investmentPhotos.assetShareCertificate
        },
        {
          title: "Commodities",
          zhTitle: "大宗商品",
          visual: investmentPhotos.assetCommoditiesPort
        }
      ],
      notes: "Let students identify the assets visually first. Reveal only the category labels after they have guessed."
    },
    {
      type: "peerTask",
      taskType: "definitionRecall",
      eyebrow: "Retrieval check",
      title: "Recall four asset types",
      zhTitle: "回忆四种资产类型",
      visual: investmentPhotos.assetCashSavings,
      prompt: "Without looking at notes, write down four types of assets.",
      promptZh: "不看笔记，写下四种资产类型。",
      definitionItems: [
        { label: "1", term: "Type 1", termZh: "类型1", answer: "cash and savings", answerZh: "现金和储蓄" },
        { label: "2", term: "Type 2", termZh: "类型2", answer: "property", answerZh: "房产" },
        { label: "3", term: "Type 3", termZh: "类型3", answer: "shares", answerZh: "股票" },
        { label: "4", term: "Type 4", termZh: "类型4", answer: "commodities", answerZh: "大宗商品" }
      ],
      sharePrompt: "Check with a partner, then add one risk next to each asset type.",
      sharePromptZh: "与同伴核对，然后在每种资产旁写一个风险。",
      notes: "Students should retrieve from the visual grid before revealing the answers."
    },
    {
      type: "rankingTask",
      eyebrow: "Student task",
      title: "Rank assets by risk",
      zhTitle: "按风险给资产排序",
      visual: investmentPhotos.businessChartsPaper,
      prompt: "Rank the cards from lower risk to higher risk.",
      promptZh: "把卡片从较低风险排到较高风险。",
      axis: {
        low: "Lower risk",
        lowZh: "较低风险",
        high: "Higher risk",
        highZh: "较高风险",
        note: "Risk means the result may be worse than expected",
        noteZh: "风险指结果可能比预期更差"
      },
      items: [
        { label: "A", text: "Cash and savings", zh: "现金和储蓄", visual: investmentPhotos.assetCashSavings },
        { label: "B", text: "Property", zh: "房产", visual: investmentPhotos.assetPropertyBuilding },
        { label: "C", text: "Shares", zh: "股票", visual: investmentPhotos.assetShareCertificate },
        { label: "D", text: "Commodities", zh: "大宗商品", visual: investmentPhotos.assetCommoditiesPort }
      ],
      revealLabel: "One defensible order",
      revealLabelZh: "一种合理排序",
      modelOrder: [
        { rank: "1", label: "A", text: "Cash and savings", zh: "现金和储蓄", reason: "Usually the most stable starting point, though not risk-free.", reasonZh: "通常是较稳定的起点，但并非没有风险。" },
        { rank: "2", label: "B", text: "Property", zh: "房产", reason: "Can be valuable, but selling quickly and choosing the right location matter.", reasonZh: "可能价值高，但快速出售和地点选择很重要。" },
        { rank: "3", label: "C", text: "Shares", zh: "股票", reason: "Prices can change as company performance and investor expectations change.", reasonZh: "价格会随公司表现和投资者预期变化。" },
        { rank: "4", label: "D", text: "Commodities", zh: "大宗商品", reason: "Prices can swing sharply because global supply and demand change.", reasonZh: "全球供需变化可能导致价格大幅波动。" }
      ],
      caveat: "This is one reasonable classroom order, not a fixed law.",
      caveatZh: "这是一种合理的课堂排序，不是固定规律。",
      writtenCheck: "Write one evidence-based reason for the asset you ranked highest.",
      writtenCheckZh: "为你排在最高风险的资产写一个基于证据的理由。",
      notes: "Accept alternative rankings if the reasoning is coherent; students should practise comparative risk thinking, not memorise a fixed order."
    },
    {
      type: "discussion",
      eyebrow: "Reveal",
      title: "There is no perfect risk ranking",
      zhTitle: "风险排序没有唯一答案",
      visual: investmentPhotos.keywordPortfolioDiversificationCards,
      question: "Why might two reasonable students rank the same asset types differently?",
      questionZh: "为什么两个合理的学生可能会给同样的资产类型排出不同顺序？",
      revealTitle: "Risk depends on the exact asset",
      answer: "Asset type matters, but the specific example also matters: the country, company, price paid, time horizon and source evidence can all change the risk.",
      answerZh: "资产类型重要，但具体例子也重要：国家、公司、支付价格、时间范围和来源证据都会改变风险。",
      notes: "This reveal prevents students from treating the risk ranking as a fixed law."
    },
    {
      type: "section",
      eyebrow: "Part 3",
      title: "Shares",
      zhTitle: "股票",
      subtitle: "What do you buy when you buy one share?",
      notes: "Section 3 returns to the Tencent question with the asset vocabulary ready."
    },
    {
      type: "visualPause",
      title: "Visual pause: share",
      visual: investmentPhotos.shareholderMeeting,
      notes: [
        "Image-only bridge before the share definition.",
        "Ask silently: what might shareholders have a claim to, and what do they not control?",
        "Bridge: a share is an ownership unit, not the whole company."
      ]
    },
    {
      type: "term",
      eyebrow: "Definition",
      title: "Share",
      term: "Share",
      termZh: "股票 / 股份",
      visual: investmentPhotos.assetSharesScreen,
      keywordVisuals: [
        { label: "Ownership unit", labelZh: "所有权单位", visual: investmentPhotos.assetShareCertificate }
      ],
      definition: "A share is one unit of ownership in a company, giving the shareholder a claim on part of the company's equity and, depending on the share class, certain rights such as votes or dividends.",
      definitionBlanks: ["ownership"],
      definitionZh: "股票或股份是公司所有权的一个单位，使股东对公司部分权益拥有要求权，并且视股票类别而可能享有投票权或股息等权利。",
      notes: "Keep the rights clause as part of the definition; control detail comes later."
    },
    {
      type: "classificationTask",
      eyebrow: "Check",
      title: "What does a share give?",
      zhTitle: "一股股票给你什么？",
      visual: investmentPhotos.shareholderMeeting,
      compact: true,
      prompt: "Classify each statement.",
      promptZh: "给每个说法分类。",
      categories: [
        { title: "Gives", zhTitle: "会得到", clue: "part of the definition" },
        { title: "May give", zhTitle: "可能得到", clue: "depends on the company" },
        { title: "Does not give", zhTitle: "不会得到", clue: "wrong or guaranteed too strongly" }
      ],
      items: [
        {
          label: "A",
          text: "One ownership unit in the company.",
          zh: "公司中的一个所有权单位。",
          answer: "Gives",
          answerZh: "会得到",
          reason: "That is the definition of a share.",
          reasonZh: "这就是股票的定义。"
        },
        {
          label: "B",
          text: "Possible future dividends.",
          zh: "未来可能获得股息。",
          answer: "May give",
          answerZh: "可能得到",
          reason: "Dividends depend on company decisions.",
          reasonZh: "股息取决于公司决定。"
        },
        {
          label: "C",
          text: "Guaranteed profit.",
          zh: "保证利润。",
          answer: "Does not give",
          answerZh: "不会得到",
          reason: "Share prices and dividends can disappoint.",
          reasonZh: "股价和股息都可能令人失望。"
        },
        {
          label: "D",
          text: "Ownership of the whole company.",
          zh: "拥有整家公司。",
          answer: "Does not give",
          answerZh: "不会得到",
          reason: "One share is only one ownership unit.",
          reasonZh: "一股只是一个所有权单位。"
        }
      ],
      sharePrompt: "Return to Tencent: what would you need to know before buying a share?",
      sharePromptZh: "回到腾讯：买入股票前你需要知道什么？",
      notes: "Use this to correct the whole-company and guaranteed-profit misconceptions."
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Exit ticket",
      zhTitle: "离堂小测",
      mode: "fillBlanks",
      visual: investmentPhotos.lesson1TencentSeafrontSiteVisit11,
      items: [
        { prompt: "Investment analysis evaluates potential return, risk and __________.", answer: "suitability", zh: "投资分析评估潜在回报、风险和__________。", answerZh: "适合性" },
        { prompt: "Speculation often chases price __________.", answer: "movement", zh: "投机常常追逐价格__________。", answerZh: "变动" },
        { prompt: "An asset has __________.", answer: "value", zh: "资产具有__________。", answerZh: "价值" },
        { prompt: "Return can be a gain or a __________.", answer: "loss", zh: "回报可以是收益，也可以是__________。", answerZh: "损失" },
        { prompt: "Risk means results may be worse than __________.", answer: "expected", zh: "风险意味着结果可能比__________更差。", answerZh: "预期" },
        { prompt: "A share is an ownership __________.", answer: "unit", zh: "股票是一个所有权__________。", answerZh: "单位" }
      ],
      notes: "Keep this compact; collect it as the individual readiness check."
    }
  ]
};
