window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};
const investmentMarketData = window.INVEST.marketData || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit 1 Lesson 1: What is investment analysis, and what is a share?",
    sources: [
      {
        label: "Tencent investor relations",
        note: "Used for company identity, official investor-material context and listed-company source habits.",
        date: "Accessed 26 June 2026",
        url: "https://www.tencent.com/en-us/investors.html"
      },
      {
        label: "Yahoo Finance historical prices",
        note: "Used for the frozen five-year 0700.HK monthly share-price graph as a classroom observation source.",
        date: "Accessed 2 July 2026",
        url: "https://finance.yahoo.com/quote/0700.HK/history/"
      },
      {
        label: "Tencent 2025 annual and fourth quarter results",
        note: "Used for a simple company-evidence example: HKEX 00700 / 0700.HK and FY2025 revenue, gross profit and gross margin.",
        date: "Published 18 March 2026; accessed 26 June 2026",
        url: "https://static.www.tencent.com/uploads/2026/03/18/e6a646796d0d869acc76271c9ee1a6a5.pdf"
      }
    ]
  },
  handout: {
    title: "Investment analysis starter sheet",
    subtitle: "Unit 1 Lesson 1: What is investment analysis, and what is a share?",
    description: "Build the first analyst habit: record the source, separate Tencent the company from Tencent the listed share, define share price and risk, and write one evidence question before making an opinion.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Source box",
        instruction: "Record the source before making any judgement.",
        blocks: [
          {
            type: "facts",
            items: [
              { label: "Company", value: "Tencent Holdings Limited" },
              { label: "Quote ticker", value: "0700.HK" },
              { label: "Official HKEX code", value: "00700 (HKD counter)" },
              { label: "Exchange", value: "Hong Kong Stock Exchange" },
              { label: "Graph source", value: "Yahoo Finance historical prices" },
              { label: "Graph accessed", value: "2 Jul 2026" },
              { label: "Company results source", value: "Tencent FY2025 annual and Q4 results" },
              { label: "Results published", value: "18 Mar 2026" }
            ]
          },
          {
            type: "prompts",
            prompts: [
              { label: "URL", prompt: "Write the source URL or source title you used.", lines: 1 },
              { label: "Key figure", prompt: "Record one figure or graph point from the source.", lines: 1 },
              { label: "Limitation", prompt: "What can this source not prove by itself?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Vocabulary",
        instruction: "Complete the course-entry definitions, then use one term in a sentence.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Investment analysis", prompt: "Investment analysis uses __________ before opinion.", answer: "evidence" },
              { label: "Asset", prompt: "An asset is something owned that may have __________.", answer: "value" },
              { label: "Share", prompt: "A share is one unit of __________ in a company.", answer: "ownership" },
              { label: "Share price", prompt: "A share price is the market price of one __________ at a specific time.", answer: "share" },
              { label: "Risk", prompt: "Risk is the possibility that results are worse than __________.", answer: "expected" },
              { label: "Short-term stock speculation", prompt: "Speculation bets on price movement without enough __________.", answer: "evidence" }
            ]
          },
          {
            type: "sentence",
            label: "Use-in-context check",
            prompt: "Use one vocabulary term to explain why a famous company is not automatically a good investment.",
            keywords: ["company", "share", "evidence", "risk"],
            lines: 3
          }
        ]
      },
      {
        label: "3",
        title: "Company evidence",
        instruction: "Use Tencent as a familiar company, then inspect the frozen graph as evidence.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Company", prompt: "Name one Tencent product or service students may recognise.", lines: 1 },
              { label: "Listed share", prompt: "Which code identifies the listed share in the classroom source?", lines: 1 },
              { label: "Graph observation", prompt: "Does the frozen share-price line stay flat, rise steadily, fall steadily or move up and down?", lines: 2 },
              { label: "Movement question", prompt: "What information might explain one movement in the graph?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Calculation or judgement task",
        instruction: "No percentage-change formula yet. Separate evidence from judgement.",
        blocks: [
          {
            type: "table",
            columns: ["Evidence", "What it may show", "What it cannot prove alone"],
            rows: [
              {
                metric: "Share-price graph",
                value: "0700.HK monthly closes",
                shows: "How one share price moved over time.",
                limits: "",
                showsLines: 1,
                limitLines: 2
              },
              {
                metric: "Revenue",
                value: "RMB751.8bn",
                shows: "The scale of sales before costs.",
                limits: "",
                showsLines: 1,
                limitLines: 2
              },
              {
                metric: "Gross margin",
                value: "56%",
                shows: "Gross profit compared with revenue.",
                limits: "",
                showsLines: 1,
                limitLines: 2
              },
              {
                metric: "Risk note",
                value: "Future unknowns",
                shows: "A reason results may be worse than expected.",
                limits: "",
                showsLines: 1,
                limitLines: 2
              }
            ]
          }
        ]
      },
      {
        label: "5",
        title: "Misconception check",
        instruction: "Correct each weak claim so it becomes an analyst sentence.",
        blocks: [
          {
            type: "cases",
            cases: [
              { label: "A", text: "Tencent is famous, so the share must be a good investment.", answer: "weak opinion" },
              { label: "B", text: "The line moved up, so there is no risk.", answer: "graph overclaim" },
              { label: "C", text: "I heard it will jump next week.", answer: "short-term speculation" },
              { label: "D", text: "An analyst needs source-dated evidence about the company, share price, possible return and risk.", answer: "analysis rule" }
            ]
          },
          {
            type: "sentence",
            label: "Correction sentence",
            prompt: "Rewrite one weak claim so it delays judgement until evidence is checked.",
            keywords: ["source", "date", "price", "risk", "evidence before opinion"],
            lines: 3
          }
        ]
      },
      {
        label: "6",
        title: "Individual written output",
        instruction: "Submit your own course promise sentence and one evidence question.",
        blocks: [
          {
            type: "writing",
            question: "Write one course promise sentence and one evidence question about a Tencent price movement.",
            keywords: ["investment analysis", "company", "listed share", "share price", "evidence", "risk", "not speculation"],
            lines: 8
          }
        ]
      }
    ],
    sources: "Tencent price graph: Yahoo Finance monthly historical prices, accessed 2 Jul 2026. Tencent company data: 2025 annual and fourth quarter results, published 18 Mar 2026, accessed 26 Jun 2026. Frozen classroom evidence only; no personal investment recommendation."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 1",
      title: "What is investment analysis, and what is a share?",
      zhTitle: "什么是投资分析？什么是股票？",
      subtitle: "Tencent first case",
      kicker: "Use evidence before opinion. Separate Tencent the company, Tencent the listed share, the share price, possible return and risk.",
      visual: investmentPhotos.modernTradingDesk,
      notes: [
        "This is the course-entry lesson for students with no prior investment study.",
        "State the boundary early: this course is not stock tips, market timing, short-term speculation or personal investment advice."
      ]
    },
    {
      type: "priceChart",
      eyebrow: "Case hook",
      title: "What does this line make you ask?",
      zhTitle: "这条线让你提出什么问题？",
      question: "Look first. What movement do you notice, and what information might explain one change?",
      questionZh: "先观察。你注意到什么变化？可能需要什么信息来解释其中一次变化？",
      ticker: "0700.HK",
      data: investmentMarketData.tencentFiveYearSharePrice,
      yMin: 150,
      yMax: 700,
      sourceStamp: "Tencent 0700.HK monthly closes | Yahoo Finance | accessed 2 Jul 2026",
      alt: "Five-year line chart of Tencent 0700.HK monthly share-price closes.",
      notes: [
        "Use the chart before definitions so students experience evidence first.",
        "Do not calculate percentage change. Students only observe movement and ask what evidence may explain it."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "What can we say before we calculate?",
      zhTitle: "计算之前我们能说什么？",
      visual: investmentPhotos.smartphoneMarketChart,
      question: "Write one careful sentence about the line without saying buy, sell, good or bad.",
      zh: "写一句谨慎的话描述这条线，但不要说买、卖、好或坏。",
      revealTitle: "A graph gives a question, not advice",
      answer: "The line shows how one Tencent share price moved in this frozen source. It raises a question about evidence; it does not give investment advice.",
      answerZh: "这条线显示这份冻结来源中一股腾讯股票价格如何变化。它提出证据问题，不提供投资建议。",
      notes: "This immediately separates observation from recommendation."
    },
    {
      type: "answer",
      eyebrow: "Retrieval",
      title: "Everyday ideas we already know",
      zhTitle: "我们已经知道的日常概念",
      mode: "fillBlanks",
      items: [
        { prompt: "A company sells products or __________.", answer: "services", zh: "公司销售产品或服务。" },
        { prompt: "A price tells us what someone pays at a specific __________.", answer: "time", zh: "价格告诉我们某个特定时间有人支付多少。" },
        { prompt: "Risk means the result may be worse than __________.", answer: "expected", zh: "风险意味着结果可能低于预期。" }
      ],
      notes: "Brief diagnostic only. No prior investment vocabulary is assumed."
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本节课结束时，你能够",
      phases: ["Define", "Separate", "Write"],
      bullets: [
        "define analysis, asset, share, price and risk",
        "separate company, products, share and price",
        "write one promise and one evidence question"
      ],
      zhBullets: [
        "定义分析、资产、股票、股价和风险",
        "区分公司、产品、股票和股价",
        "写一句承诺和一个证据问题"
      ],
      notes: "Exactly three objectives, aligned to the syllabus handout and exit output."
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "Evidence before opinion",
      zhTitle: "先证据，后观点",
      notes: "Cycle 1: retrieve everyday opinions, attempt to classify, reveal the course rule, check the core claim."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "Is this analysis or opinion?",
      zhTitle: "这是分析还是观点？",
      visual: investmentPhotos.investorMeetingReport,
      question: "Tencent is famous, so the share must be a good investment. What is missing from this sentence?",
      zh: "“腾讯很有名，所以这只股票一定是好投资。”这句话缺少什么？",
      revealTitle: "Familiarity is not evidence",
      answer: "The sentence starts with opinion. It does not identify a source, date, share price, possible return, risk or limitation.",
      answerZh: "这句话从观点开始，没有说明来源、日期、股价、可能回报、风险或局限性。",
      notes: "Cold-call one missing evidence type before reveal."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Investment analysis",
      term: "Investment analysis",
      termZh: "投资分析",
      definition: "Investment analysis uses <span class=\"blank invReveal\" data-answer=\"evidence\" style=\"--blank-width:10ch\"><span class=\"invBlankText\">evidence</span></span> to study possible return, risk and price before making a judgement.",
      definitionZh: "投资分析是在作出判断之前，用证据研究可能回报、风险和价格。",
      notes: "Make students write the definition, then underline evidence, return, risk and price."
    },
    {
      type: "answer",
      eyebrow: "Key idea",
      title: "Core claim: evidence before opinion",
      zhTitle: "核心观点：先证据，后观点",
      mode: "fillBlanks",
      items: [
        { prompt: "Investment analysis uses __________ before opinion.", answer: "evidence", zh: "投资分析先使用证据，再形成观点。" },
        { prompt: "It studies the company, listed share, price, possible return and __________.", answer: "risk", zh: "它研究公司、上市股票、价格、可能回报和风险。" },
        { prompt: "It is not stock tips, market timing or personal __________.", answer: "advice", zh: "它不是股票提示、择时交易或个人投资建议。" }
      ],
      notes: "This is the core claim from the course map. Students complete the blanks before reveal."
    },
    {
      type: "quiz",
      eyebrow: "Practice check",
      title: "Check 1: what changes a guess into analysis?",
      zhTitle: "检查1：什么把猜测变成分析？",
      visual: investmentPhotos.financialAnalysisDesk,
      question: "Which sentence best follows evidence before opinion?",
      zh: "哪一句最符合先证据、后观点？",
      choices: [
        "Tencent is famous, so the share is safe.",
        "I heard the price will jump next week.",
        "Tencent is a familiar company, but I need source-dated evidence before judging the share.",
        "The graph moved up, so risk has disappeared."
      ],
      answer: 2,
      explanation: "Correct: the sentence identifies the company but delays judgement until source-dated evidence is checked.",
      explanationZh: "正确：这句话识别了公司，但把判断放在核查带日期的证据之后。",
      notes: "Use responses to decide whether to reteach opinion versus evidence."
    },
    {
      type: "section",
      eyebrow: "Part 2",
      part: "2",
      title: "Company, product, listed share, share price",
      zhTitle: "公司、产品、上市股票、股价",
      notes: "Cycle 2: separate the four beginner ideas and define asset, share and share price."
    },
    {
      type: "discussion",
      eyebrow: "Retrieve",
      title: "What do you already know about Tencent?",
      zhTitle: "你已经知道腾讯什么？",
      visual: investmentPhotos.tencentBinhaiTowers,
      question: "List two Tencent products or services. Then write one thing product familiarity cannot prove.",
      zh: "列出两个腾讯产品或服务。再写出产品熟悉度不能证明的一件事。",
      revealTitle: "A company is not the same as its share",
      answer: "Products help us recognise Tencent, but they do not prove whether Tencent's listed share is good value or low risk.",
      answerZh: "产品帮助我们认识腾讯，但不能证明腾讯上市股票是否价格合理或风险低。",
      notes: "Use familiarity as an entry point, not as evidence for investment quality."
    },
    {
      type: "marketBrief",
      eyebrow: "Source box",
      title: "Record the Tencent source box",
      zhTitle: "记录腾讯来源框",
      subtitle: "Identify the case before judging.",
      ticker: "Tencent classroom source",
      question: "Circle the company, listed share, source title and accessed date.",
      questionZh: "圈出公司、上市股票、来源标题和访问日期。",
      sourceStamp: "Tencent graph | Yahoo Finance | accessed 2 Jul 2026",
      revealMetricValues: true,
      metrics: [
        { label: "Company", value: "Tencent Holdings Limited", note: "腾讯控股有限公司" },
        { label: "Listed share", value: "0700.HK / HKEX 00700", note: "报价代码 / 港交所代码" },
        { label: "Source date", value: "Accessed 2 Jul 2026", note: "冻结课堂来源" }
      ],
      notes: "This fulfills the source-box habit: company/security identifier, source title and date before judgement."
    },
    {
      type: "flow",
      eyebrow: "Try first",
      title: "Keep the four ideas separate",
      zhTitle: "把四个概念分清楚",
      visual: investmentPhotos.businessChartsPaper,
      flowStyle: "sequence",
      steps: [
        { text: "Tencent Holdings Limited is the __________.", answer: "company", zh: "腾讯控股有限公司是公司。" },
        { text: "Games, apps and payments are products or __________.", answer: "services", zh: "游戏、应用和支付是产品或服务。" },
        { text: "0700.HK is a listed __________.", answer: "share", zh: "0700.HK 是上市股票。" },
        { text: "One graph point shows the share __________.", answer: "price", zh: "图上的一个点显示股价。" }
      ],
      notes: "Students predict the labels, then reveal. Do not teach quote-page mechanics."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Asset",
      term: "Asset",
      termZh: "资产",
      definition: "An asset is something owned that may have <span class=\"blank invReveal\" data-answer=\"value\" style=\"--blank-width:8ch\"><span class=\"invBlankText\">value</span></span>.",
      definitionZh: "资产是被拥有且可能有价值的东西。",
      notes: "Examples can include cash, a building, a machine or a share. Avoid a full asset-class taxonomy."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Share",
      term: "Share",
      termZh: "股票 / 股份",
      definition: "A share is one unit of <span class=\"blank invReveal\" data-answer=\"ownership\" style=\"--blank-width:11ch\"><span class=\"invBlankText\">ownership</span></span> in a company.",
      definitionZh: "一股股票是公司所有权中的一个单位。",
      notes: "Control, voting power and ownership percentage come later. Keep this first definition simple."
    },
    {
      type: "discussion",
      eyebrow: "Practice check",
      title: "What do you own if you own one share?",
      zhTitle: "如果拥有一股，你拥有什么？",
      visual: investmentPhotos.shareholderMeeting,
      question: "Choose one: the whole company, one product, one unit of ownership, or guaranteed profit. Explain your choice.",
      zh: "选择一个：整家公司、一个产品、一个所有权单位，还是保证利润。说明你的选择。",
      revealTitle: "One share is one ownership unit",
      answer: "One share is one ownership unit in a company. It is not the whole company, not a product and not guaranteed profit.",
      answerZh: "一股股票是公司中的一个所有权单位。它不是整家公司，不是产品，也不是保证利润。",
      notes: "This checks the most important beginner misconception before moving to share price."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Share price",
      term: "Share price",
      termZh: "股价",
      definition: "A share price is the market price of one <span class=\"blank invReveal\" data-answer=\"share\" style=\"--blank-width:7ch\"><span class=\"invBlankText\">share</span></span> at a specific time.",
      definitionZh: "股价是在特定时间一股股票的市场价格。",
      notes: "Emphasise one share at one time. It is not revenue, profit or the total value of the whole company."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 2: separate the ideas",
      zhTitle: "检查2：区分概念",
      visual: investmentPhotos.tabletFinancialChart,
      question: "Which statement keeps company, product, share and share price separate?",
      zh: "哪一句把公司、产品、股票和股价区分清楚？",
      choices: [
        "Tencent games are the same thing as Tencent's share price.",
        "0700.HK is a listed share; one point on the graph is the price of one share at one date.",
        "Revenue is the same as share price.",
        "One share means owning all Tencent products."
      ],
      answer: 1,
      explanation: "Correct: it identifies the listed share and explains what one graph point measures.",
      explanationZh: "正确：它识别了上市股票，并说明图上一个点衡量的是什么。",
      notes: "If many students miss this, reteach the four-part distinction with the source box."
    },
    {
      type: "section",
      eyebrow: "Part 3",
      part: "3",
      title: "Frozen graph evidence",
      zhTitle: "冻结图表证据",
      notes: "Cycle 3: use the graph and company figures as evidence with limits, not as recommendations."
    },
    {
      type: "answer",
      eyebrow: "Graph check",
      title: "Graph observation and movement question",
      zhTitle: "图表观察和价格变化问题",
      mode: "fillBlanks",
      items: [
        { prompt: "Each point shows the price of one __________.", answer: "share", zh: "每个点显示一股股票的价格。" },
        { prompt: "The graph is source-dated evidence, not a complete investment __________.", answer: "judgement", zh: "图表是带来源日期的证据，不是完整的投资判断。" },
        { prompt: "A price movement needs a question about missing __________.", answer: "information", zh: "价格变化需要关于缺失信息的问题。" }
      ],
      notes: "Students answer from the earlier chart. Keep formal percentage change for a later lesson."
    },
    {
      type: "dataSnapshot",
      eyebrow: "Evidence",
      title: "One company fact is not a judgement",
      zhTitle: "一个公司事实不是完整判断",
      visual: investmentPhotos.annualReports,
      sourceStamp: "Tencent FY2025 results | RMB billions | published 18 Mar 2026",
      focusMetrics: [
        { label: "Revenue", value: "RMB751.8bn" },
        { label: "Gross profit", value: "RMB422.6bn" },
        { label: "Gross margin", value: "56%" }
      ],
      task: "Mark each figure as evidence, then write what it cannot prove alone.",
      taskZh: "把每个数字标为证据，然后写出它单独不能证明什么。",
      note: "A figure can help an analyst ask a better question, but one figure cannot prove quality, value and risk at the same time.",
      noteZh: "一个数据可以帮助分析者提出更好的问题，但单个数据不能同时证明质量、价值和风险。",
      notes: "Do not teach revenue or margin formulas. They are evidence examples only."
    },
    {
      type: "analystBoard",
      eyebrow: "Source limits",
      title: "What can evidence show and not prove?",
      zhTitle: "证据能显示什么，不能证明什么？",
      visual: investmentPhotos.financialAnalysisDesk,
      revealBlocks: true,
      blocks: [
        {
          label: "Graph",
          title: "Movement over time",
          body: "A price graph may show how one share price moved. It cannot explain every cause by itself.",
          zh: "股价图可以显示一股价格如何变化，但不能单独解释所有原因。"
        },
        {
          label: "Company figure",
          title: "Business evidence",
          body: "Revenue or gross profit may show scale or performance. It cannot prove the current share price is fair.",
          zh: "收入或毛利润可以显示规模或表现，但不能证明当前股价合理。"
        },
        {
          label: "Risk note",
          title: "What could go worse",
          body: "A risk note may show uncertainty. It cannot tell the exact future result.",
          zh: "风险说明可以显示不确定性，但不能告诉我们准确的未来结果。"
        }
      ],
      prompt: "Before reveal: choose one source and say what it cannot prove alone.",
      promptZh: "揭示前：选择一个来源，说出它单独不能证明什么。",
      notes: "This mirrors the handout table and creates a teacher decision point before output rehearsal."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 3: what can the graph prove?",
      zhTitle: "检查3：图表能证明什么？",
      visual: investmentPhotos.investorChartScreens,
      question: "Which claim is safest after looking at the frozen Tencent graph?",
      zh: "看完冻结的腾讯图表后，哪一个说法最稳妥？",
      choices: [
        "Tencent is definitely a good investment.",
        "The line shows how one Tencent share price moved in this source.",
        "Tencent's revenue equals the latest share price.",
        "The graph removes the need to study risk."
      ],
      answer: 1,
      explanation: "Correct: the graph is useful evidence, but it cannot prove investment quality by itself.",
      explanationZh: "正确：图表是有用证据，但不能单独证明投资质量。",
      notes: "This is the formative check for evidence limits."
    },
    {
      type: "section",
      eyebrow: "Part 4",
      part: "4",
      title: "Risk, speculation, output",
      zhTitle: "风险、投机与输出",
      notes: "Cycle 4: define risk, name the anti-speculation boundary, rehearse and submit the individual output."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Risk",
      term: "Risk",
      termZh: "风险",
      definition: "Risk is the possibility that results, returns or prices are worse than <span class=\"blank invReveal\" data-answer=\"expected\" style=\"--blank-width:10ch\"><span class=\"invBlankText\">expected</span></span>.",
      definitionZh: "风险是结果、回报或价格比预期更差的可能性。",
      notes: "Keep risk broad. Detailed risk categories arrive later in the course."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Short-term stock speculation",
      term: "Short-term stock speculation",
      termZh: "短期股票投机 / 炒股",
      definition: "Short-term stock speculation means betting mainly on a price movement without enough <span class=\"blank invReveal\" data-answer=\"evidence\" style=\"--blank-width:10ch\"><span class=\"invBlankText\">evidence</span></span> about value, risk and return.",
      definitionZh: "短期股票投机是主要押注价格变化，而没有足够证据说明价值、风险和回报。",
      notes: "Use the term as a course boundary, not as a moral lecture."
    },
    {
      type: "riskRegister",
      eyebrow: "Misconception check",
      title: "What makes a claim speculative?",
      zhTitle: "什么让观点变成投机？",
      visual: investmentPhotos.shippingPort,
      revealEffects: true,
      effectLabel: "Why it is weak",
      table: [
        ["Weak pattern", "Analyst question", "Likely effect"],
        ["Famous company shortcut", "What source-dated evidence supports the claim?", "Familiarity is not enough."],
        ["Price jump chase", "Am I only betting on a short-term movement?", "This is speculation, not analysis."],
        ["Ignoring price", "What price is paid for one share?", "A good company may still be too expensive."],
        ["Ignoring risk", "What could be worse than expected?", "Possible return is incomplete without risk."]
      ],
      prompt: "Pick one weak pattern and turn it into an evidence question.",
      promptZh: "选择一个弱点，把它改写成一个证据问题。",
      answer: "A stronger claim names the source, date, share price, possible return, risk and limitation before judging.",
      notes: "This completes the misconception check from the syllabus."
    },
    {
      type: "peerTask",
      eyebrow: "Practice check",
      title: "Rewrite weak claims as evidence questions",
      zhTitle: "把弱观点改写成证据问题",
      taskType: "sort",
      categories: ["Company fact", "Share price evidence", "Risk question", "Speculation / weak opinion"],
      steps: [
        { text: "Sort each sentence into one category.", zh: "把每句话分到一个类别。" },
        { text: "Choose one weak opinion and rewrite it as a question an analyst could investigate.", zh: "选择一个弱观点，把它改写成分析者可以调查的问题。" },
        { text: "End with one individual sentence in your handout.", zh: "最后在讲义上写一句个人句子。" }
      ],
      cases: [
        { label: "A", text: "Tencent is listed as 0700.HK." },
        { label: "B", text: "The graph moved up and down." },
        { label: "C", text: "What risk could make future results worse than expected?" },
        { label: "D", text: "Tencent must be safe because everyone knows it." }
      ],
      sampleAnswer: "Tencent is familiar, but what source-dated evidence explains one movement in the share-price graph and what risk could affect the judgement?",
      sampleAnswerZh: "腾讯很熟悉，但哪些带来源日期的证据能解释股价图中的一次变化？什么风险可能影响判断？",
      notes: "Pair talk is allowed, but the last sentence must be individual."
    },
    {
      type: "flow",
      eyebrow: "Output rehearsal",
      title: "How should an analyst think?",
      zhTitle: "分析者应该怎样思考？",
      visual: investmentPhotos.financeChartWhiteboard,
      flowStyle: "sequence",
      steps: [
        { text: "Identify the __________ and listed share.", answer: "company", zh: "识别公司和上市股票。" },
        { text: "Record the source title and __________.", answer: "date", zh: "记录来源标题和日期。" },
        { text: "Separate evidence from __________.", answer: "opinion", zh: "区分证据和观点。" },
        { text: "Ask about price, possible return and __________ before judging.", answer: "risk", zh: "判断前询问价格、可能回报和风险。" }
      ],
      notes: "Students rehearse the final written structure before the exit ticket."
    },
    {
      type: "discussion",
      eyebrow: "Output rehearsal",
      title: "Write the course promise",
      zhTitle: "写出课程承诺",
      visual: investmentPhotos.businessChartsPaper,
      question: "Complete this sentence: In this course, I will not guess from a famous company; I will first...",
      zh: "完成这句话：在这门课中，我不会因为公司有名就猜测；我会先……",
      revealTitle: "A promise delays judgement",
      answer: "In this course, I will identify the company and listed share, record source-dated evidence, ask about price and risk, and avoid short-term speculation.",
      answerZh: "在这门课中，我会识别公司和上市股票，记录带来源日期的证据，询问价格和风险，并避免短期投机。",
      notes: "Students can adapt the revealed sentence, but the submitted sentence must be their own."
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Exit ticket",
      zhTitle: "离堂小测",
      mode: "fillBlanks",
      items: [
        { prompt: "A share is one unit of __________ in a company.", answer: "ownership", zh: "股票是公司所有权中的一个单位。" },
        { prompt: "Investment analysis uses __________ before opinion.", answer: "evidence", zh: "投资分析先使用证据，再形成观点。" },
        { prompt: "This course is not about short-term stock __________.", answer: "speculation", zh: "本课程不是关于短期股票投机。" },
        { prompt: "Write one question: What information might explain one Tencent price __________?", answer: "movement", zh: "写一个问题：什么信息可能解释腾讯股价的一次变化？" }
      ],
      notes: "Collect the handout output: one course promise sentence and one evidence question about a Tencent price movement."
    }
  ]
};
