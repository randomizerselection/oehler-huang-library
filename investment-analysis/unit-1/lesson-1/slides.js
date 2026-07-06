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
              { label: "Investment analysis", prompt: "Investment analysis is the process of using source-dated __________ about an asset, business, return, risk and price before a justified investment judgement.", answer: "evidence" },
              { label: "Investment", prompt: "Investment aims for future __________ while accepting risk.", answer: "return" },
              { label: "Speculation", prompt: "Speculation often relies on short-term price __________.", answer: "movement" },
              { label: "Asset", prompt: "An asset is something with __________ that can be owned.", answer: "value" },
              { label: "Share", prompt: "A share is one unit of __________ in a company.", answer: "ownership" }
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
              { label: "C", text: "Compare possible return and risk.", answer: "Yes" },
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
            keywords: ["investment analysis", "evidence", "asset", "risk", "share", "not guaranteed"],
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
      question: "Tencent is familiar. Would you buy shares in Tencent? Give one reason.",
      questionZh: "腾讯很熟悉。你会买腾讯股票吗？给出一个理由。",
      revealTitle: "A first reason is not analysis yet",
      answer: "A first answer is useful because it shows what evidence is missing. Familiarity is a starting point, not a final investment judgement.",
      answerZh: "第一反应有用，因为它能显示还缺少哪些证据。熟悉只是起点，不是最终投资判断。",
      visual: investmentPhotos.lesson1TencentBinhaiBuilding01,
      notes: [
        "Take a quick yes/no vote.",
        "Do not correct students yet; capture the reasons so later definitions answer a real classroom need."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end of this lesson, you can",
      zhTitle: "本课结束时，你能够",
      bullets: [
        "define investment analysis and separate it from speculation",
        "define an asset and compare simple asset types by risk",
        "explain what buying a share gives and does not guarantee"
      ],
      zhBullets: [
        "定义投资分析，并把它与投机区分开",
        "定义资产，并按风险比较简单资产类型",
        "解释买入一股股票得到什么、不能保证什么"
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
      question: "Before seeing the definition, write one sentence: what should investment analysis do?",
      questionZh: "在看到定义前，写一句话：投资分析应该做什么？",
      revealTitle: "Analysis uses source-dated evidence",
      answer: "Investment analysis is the process of using source-dated evidence about an asset, business, return, risk and price before making a justified investment judgement.",
      answerZh: "投资分析是一个过程：在作出有依据的投资判断前，使用关于资产、企业、回报、风险和价格的有来源和日期的证据。",
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
      definition: "Investment analysis is the process of using <span class=\"blank invReveal\" data-answer=\"source-dated evidence\" style=\"--blank-width:22ch\"><span class=\"invBlankText\">source-dated evidence</span></span> about an asset, business, return, risk and price before making a justified investment judgement.",
      definitionZh: "投资分析是一个过程：在作出有依据的投资判断前，使用关于资产、企业、回报、风险和价格的有来源和日期的证据。",
      notes: "Use the full textbook-style definition from references/investment-analysis-definitions.md."
    },
    {
      type: "quiz",
      eyebrow: "Retrieval check",
      title: "What is investment analysis?",
      zhTitle: "什么是投资分析？",
      question: "Which response is investment analysis?",
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
      type: "yesNoCheck",
      eyebrow: "Course preview",
      title: "Course boundary: yes or no?",
      zhTitle: "课程边界：是或否？",
      compact: true,
      prompt: "Vote yes or no: does this belong in an investment analysis course?",
      promptZh: "投票判断：这是否属于投资分析课程？",
      items: [
        { text: "Read dated evidence.", zh: "阅读有日期的证据。", answer: true, answerZh: "是", reason: "Core habit.", reasonZh: "核心习惯。" },
        { text: "Compare revenue and profit.", zh: "比较收入和利润。", answer: true, answerZh: "是", reason: "Later lessons.", reasonZh: "后续课程。" },
        { text: "Check cash flow first.", zh: "先检查现金流。", answer: true, answerZh: "是", reason: "Evidence check.", reasonZh: "证据检查。" },
        { text: "Compare return with risk.", zh: "比较回报和风险。", answer: true, answerZh: "是", reason: "Course habit.", reasonZh: "课程习惯。" },
        { text: "Compare companies fairly.", zh: "公平比较公司。", answer: true, answerZh: "是", reason: "Fair comparison.", reasonZh: "公平比较。" },
        { text: "Use one price rise as the main reason.", zh: "把一次涨价作为主要理由。", answer: false, answerZh: "否", reason: "Too thin.", reasonZh: "证据太单薄。" },
        { text: "Search only for buying evidence.", zh: "只寻找支持买入的证据。", answer: false, answerZh: "否", reason: "Biased search.", reasonZh: "搜索有偏见。" },
        { text: "Treat online confidence as evidence.", zh: "把网络自信当作证据。", answer: false, answerZh: "否", reason: "Weak source.", reasonZh: "来源薄弱。" },
        { text: "Use one good headline before price.", zh: "未看价格先用一条好消息判断。", answer: false, answerZh: "否", reason: "Incomplete.", reasonZh: "证据不完整。" },
        { text: "Use a chart without source/date.", zh: "使用无来源或日期的图表。", answer: false, answerZh: "否", reason: "Source problem.", reasonZh: "来源有问题。" }
      ],
      notes: "This slide makes the course boundary visible without adding a teacher-facing lecture."
    },
    {
      type: "compare",
      eyebrow: "Key distinction",
      title: "Investment or speculation?",
      zhTitle: "投资还是投机？",
      mode: "fillBlanks",
      leftTitle: "Investment",
      leftTitleZh: "投资",
      rightTitle: "Speculation",
      rightTitleZh: "投机",
      left: [
        { label: "1", text: "Evidence: checks dated __________ first", answer: "evidence", zh: "证据：先检查有日期的证据" },
        { label: "2", text: "Horizon: studies longer-term __________", answer: "value", zh: "期限：研究较长期价值" },
        { label: "3", text: "Risk: weighs return against __________", answer: "risk", zh: "风险：把回报与风险进行权衡" },
        { label: "4", text: "Decision: gives reasons before __________", answer: "judgement", zh: "决策：先给理由，再作判断" }
      ],
      right: [
        { label: "1", text: "Evidence: uses selected __________", answer: "evidence", zh: "证据：使用被挑选过的证据" },
        { label: "2", text: "Horizon: chases short-term price __________", answer: "movement", zh: "期限：追逐短期价格变动" },
        { label: "3", text: "Risk: hopes return will cover __________", answer: "risk", zh: "风险：希望回报能弥补风险" },
        { label: "4", text: "Decision: starts with a __________", answer: "guess", zh: "决策：从猜测开始" }
      ],
      prompt: "Fill the blanks, then explain the difference.",
      promptZh: "填空后解释区别。",
      notes: "Do not make speculation sound impossible; make the evidence difference clear."
    },
    {
      type: "yesNoCheck",
      eyebrow: "Retrieval check",
      title: "Investment or speculation?",
      zhTitle: "投资还是投机？",
      compact: true,
      prompt: "Vote before reveal.",
      promptZh: "先投票，再揭示答案。",
      items: [
        { text: "Analysis can still lose money.", zh: "分析后仍然可能亏钱。", answer: true, answerZh: "是", reason: "No certainty.", reasonZh: "没有确定性。" },
        { text: "A price story can still be speculation.", zh: "价格故事仍可能是投机。", answer: true, answerZh: "是", reason: "Too short-term.", reasonZh: "太短期。" },
        { text: "Long holding automatically makes analysis.", zh: "长期持有就自动成为分析。", answer: false, answerZh: "否", reason: "Needs evidence.", reasonZh: "需要证据。" },
        { text: "One price rise is enough for a famous firm.", zh: "知名公司一次涨价就足够。", answer: false, answerZh: "否", reason: "Not enough.", reasonZh: "还不够。" }
      ],
      notes: "Use this as a quick hinge check before moving into assets."
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
      definition: "An asset is something with <span class=\"blank invReveal\" data-answer=\"value\" style=\"--blank-width:8ch\"><span class=\"invBlankText\">value</span></span> that can be owned.",
      definitionZh: "资产是具有价值并且可以被拥有的东西。",
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
          visual: investmentPhotos.assetSharesScreen
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
      type: "peerTask",
      taskType: "sort",
      eyebrow: "Student task",
      title: "Rank assets by risk",
      zhTitle: "按风险给资产排序",
      steps: [
        { text: "Place each asset from lower risk to higher risk.", zh: "把每种资产从较低风险排到较高风险。" },
        { text: "Write one reason for the asset you put highest.", zh: "为你排在最高风险的资产写一个理由。" }
      ],
      categories: ["Lower risk", "Medium risk", "Higher risk"],
      cases: [
        { label: "A", text: "Cash and savings" },
        { label: "B", text: "Property" },
        { label: "C", text: "Shares" },
        { label: "D", text: "Commodities" }
      ],
      sampleAnswer: "One defensible order: cash/savings -> property -> shares -> commodities. The exact risk depends on the specific asset.",
      sampleAnswerZh: "一种合理排序：现金/储蓄 -> 房产 -> 股票 -> 大宗商品。具体风险取决于具体资产。",
      notes: "Accept alternative rankings if the reason is coherent; this is about comparative risk thinking."
    },
    {
      type: "discussion",
      eyebrow: "Reveal",
      title: "There is no perfect risk ranking",
      zhTitle: "风险排序没有唯一答案",
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
      definition: "A share is one unit of <span class=\"blank invReveal\" data-answer=\"ownership\" style=\"--blank-width:11ch\"><span class=\"invBlankText\">ownership</span></span> in a company.",
      definitionZh: "一股股票是公司中的一个所有权单位。",
      notes: "Keep the definition simple; dividend policy, voting power and control come later."
    },
    {
      type: "classificationTask",
      eyebrow: "Check",
      title: "What does a share give?",
      zhTitle: "一股股票给你什么？",
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
      items: [
        { prompt: "Investment analysis uses source-dated __________ before a justified judgement.", answer: "evidence", zh: "投资分析在作出有依据的判断前使用有来源和日期的证据。" },
        { prompt: "Speculation often chases price __________.", answer: "movement", zh: "投机常常追逐价格变动。" },
        { prompt: "An asset has __________.", answer: "value", zh: "资产具有价值。" },
        { prompt: "Risk means returns are __________.", answer: "uncertain", zh: "风险意味着回报不确定。" },
        { prompt: "A share is an ownership __________.", answer: "unit", zh: "股票是一个所有权单位。" }
      ],
      notes: "Keep this compact; collect it as the individual readiness check."
    }
  ]
};
