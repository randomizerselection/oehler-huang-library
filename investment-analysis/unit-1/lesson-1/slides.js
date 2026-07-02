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
    description: "Start the course by separating company, product, share, share price, evidence, opinion and risk, then ask one evidence question about a price movement.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Course-entry concept sorter",
        instruction: "Sort each classroom statement before using any investment words.",
        blocks: [
          {
            type: "cases",
            cases: [
              { label: "A", text: "Tencent makes games, social apps and payment services.", answer: "company/product fact" },
              { label: "B", text: "0700.HK is a listed share that can be found in market data.", answer: "share" },
              { label: "C", text: "HK$429.80 is one graph point in the frozen classroom source.", answer: "share price" },
              { label: "D", text: "Tencent must be a good investment because I know the brand.", answer: "opinion" },
              { label: "E", text: "Investors need evidence about return, risk and price.", answer: "analysis rule" }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Tencent first look",
        instruction: "Identify the case before making a judgement.",
        blocks: [
          {
            type: "facts",
            items: [
              { label: "Company", value: "Tencent Holdings Limited" },
              { label: "Familiar products", value: "Games, social apps, payments and cloud services" },
              { label: "Quote ticker", value: "0700.HK" },
              { label: "Official HKEX code", value: "00700 (HKD counter)" },
              { label: "Exchange", value: "Hong Kong Stock Exchange" },
              { label: "Graph source", value: "Yahoo Finance historical prices" },
              { label: "Graph accessed", value: "2 Jul 2026" }
            ]
          },
          {
            type: "prompts",
            prompts: [
              { label: "Company", prompt: "What real company are we studying today?", lines: 1 },
              { label: "Listed share", prompt: "Which code helps us find the listed share?", lines: 1 },
              { label: "First caution", prompt: "What should we not decide from the company name alone?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Key terms",
        instruction: "Complete the course-entry definitions.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Investment analysis", prompt: "Investment analysis uses __________ before opinion.", answer: "evidence" },
              { label: "Asset", prompt: "An asset is something owned that may have __________.", answer: "value" },
              { label: "Share", prompt: "A share is one unit of __________ in a company.", answer: "ownership" },
              { label: "Share price", prompt: "A share price is the market price of one __________ at a specific time.", answer: "share" },
              { label: "Risk", prompt: "Risk is the possibility that results are worse than __________.", answer: "expected" }
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Company, product, share, price",
        instruction: "Keep the four ideas separate.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Company", prompt: "Tencent is a company. Name one product or service connected to it.", lines: 1 },
              { label: "Share", prompt: "What does one share represent?", lines: 1 },
              { label: "Price", prompt: "What does one point on a share-price graph show?", lines: 2 },
              { label: "Opinion", prompt: "Why is 'famous brand = good investment' not analysis?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "5",
        title: "First graph observation and movement question",
        instruction: "Look before calculating. This lesson does not require percentage change, but it does require one evidence question about a price movement.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Observation", prompt: "Does the Tencent share-price line stay flat, rise steadily, or move up and down?", lines: 1 },
              { label: "Meaning", prompt: "What does each point on the line measure?", lines: 1 },
              { label: "Question", prompt: "Write one evidence question about what information might explain one movement in the graph.", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "6",
        title: "Evidence before opinion",
        instruction: "Use each source as evidence, then write what it cannot prove alone.",
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
                shows: "Large sales before costs are deducted.",
                limits: "",
                showsLines: 1,
                limitLines: 2
              },
              {
                metric: "Risk note",
                value: "Future unknowns",
                shows: "A reason the result may be worse than expected.",
                limits: "",
                showsLines: 1,
                limitLines: 2
              }
            ]
          }
        ]
      },
      {
        label: "Exit",
        title: "Exit ticket",
        instruction: "Answer individually.",
        blocks: [
          {
            type: "writing",
            question: "Why does investment analysis need evidence before opinion?",
            keywords: ["company", "share", "share price", "evidence", "risk", "opinion"],
            lines: 6
          }
        ]
      }
    ],
    sources: "Tencent price graph: Yahoo Finance monthly historical prices, accessed 2 Jul 2026. Tencent company data: 2025 annual and fourth quarter results, published 18 Mar 2026, accessed 26 Jun 2026. Educational use only; no personal investment recommendation."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Overview",
      title: "What is investment analysis, and what is a share?",
      zhTitle: "什么是投资分析？什么是股票？",
      subtitle: "Unit 1 Lesson 1",
      kicker: "Use evidence before opinion: separate Tencent the company from Tencent the listed share.",
      visual: investmentPhotos.modernTradingDesk,
      notes: [
        "Frame this as the first investment lesson for students with no prior investment study.",
        "Emphasise that the course teaches evidence-based analysis, not personal investment recommendations."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Starter",
      title: "What will this course ask you to do?",
      zhTitle: "这门课会要求你做什么？",
      visual: investmentPhotos.financialAnalysisDesk,
      question: "Write one guess: will investment analysis be more like guessing, calculating, reading evidence, or giving advice?",
      zh: "先写一个猜测：投资分析更像猜测、计算、读证据，还是给建议？",
      revealTitle: "Course rule",
      answer: "Investment analysis uses evidence to study possible return, risk and price before making a judgement. It is not a promise and not personal advice.",
      notes: "Let students guess first. Then set the non-advice boundary explicitly."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Course rule: evidence before opinion",
      zhTitle: "课程规则：先证据，后观点",
      mode: "fillBlanks",
      items: [
        { prompt: "Investment analysis uses __________ before opinion.", answer: "evidence", zh: "投资分析要先看证据，再形成观点。" },
        { prompt: "A judgement is weaker if it ignores __________.", answer: "risk", zh: "如果忽视风险，判断就更弱。" },
        { prompt: "This course gives no personal investment __________.", answer: "advice", zh: "本课程不提供个人投资建议。" }
      ],
      notes: "Students complete the course rule on the handout before revealing the blanks."
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "Company, product, share",
      zhTitle: "公司、产品、股票",
      notes: "This section separates familiar-company knowledge from listed-share analysis."
    },
    {
      type: "discussion",
      eyebrow: "Case",
      title: "What do you already know about Tencent?",
      zhTitle: "你已经知道腾讯什么？",
      visual: investmentPhotos.tencentBinhaiTowers,
      question: "List two familiar Tencent products or services. Then write one thing that this does not prove about the share.",
      zh: "列出两个你熟悉的腾讯产品或服务。然后写出这不能证明股票的哪一点。",
      revealTitle: "Analysis boundary",
      answer: "Knowing the company helps us start, but product familiarity does not prove the share is a good investment.",
      notes: "Use student familiarity as the hook, then separate brand awareness from investment judgement."
    },
    {
      type: "marketBrief",
      eyebrow: "Exercise 1",
      title: "Identify the case before judging",
      zhTitle: "判断前先识别案例",
      subtitle: "Circle the company, listed share, exchange and source date.",
      ticker: "Tencent case file",
      question: "Circle Tencent, 0700.HK / 00700, Hong Kong Stock Exchange and the source date.",
      questionZh: "圈出腾讯、0700.HK / 00700、香港交易所和来源日期。",
      sourceStamp: "Tencent graph | Yahoo Finance | accessed 2 Jul 2026",
      revealMetricValues: true,
      metrics: [
        { label: "Company", value: "Tencent", note: "腾讯控股" },
        { label: "Listed share", value: "0700.HK / 00700", note: "报价 / 港交所" },
        { label: "Graph source", value: "Yahoo Finance", note: "课堂冻结数据" }
      ],
      notes: "Keep this as identification only. Do not teach quote-page mechanics."
    },
    {
      type: "flow",
      eyebrow: "Key distinction",
      title: "What are we separating?",
      zhTitle: "我们要区分什么？",
      visual: investmentPhotos.businessChartsPaper,
      flowStyle: "sequence",
      steps: [
        { text: "Tencent is the __________.", answer: "company", zh: "腾讯是公司。" },
        { text: "Games and apps are __________ or services.", answer: "products", zh: "游戏和应用是产品或服务。" },
        { text: "0700.HK is a listed __________.", answer: "share", zh: "0700.HK 是上市股票。" },
        { text: "A graph point shows the __________ of one share.", answer: "price", zh: "图上的点显示一股股票的价格。" }
      ],
      notes: "This is the core beginner distinction. Keep it slow and explicit."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Investment analysis",
      term: "Investment analysis",
      termZh: "投资分析",
      definition: "Investment analysis uses <span class=\"blank invReveal\" data-answer=\"evidence\" style=\"--blank-width:10ch\"><span class=\"invBlankText\">evidence</span></span> to study possible return, risk and price before making a judgement.",
      definitionZh: "投资分析是在判断前用证据研究可能的回报、风险和价格。",
      keyTerms: [
        { term: "Evidence", zh: "证据", note: "Sources, dates and figures used to support a claim." },
        { term: "Judgement", zh: "判断", note: "A careful conclusion after evidence is checked." }
      ],
      notes: "Do not let students equate analysis with prediction or advice."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Asset",
      term: "Asset",
      termZh: "资产",
      definition: "An asset is something owned that may have <span class=\"blank invReveal\" data-answer=\"value\" style=\"--blank-width:8ch\"><span class=\"invBlankText\">value</span></span>.",
      definitionZh: "资产是被拥有且可能有价值的东西。",
      keyTerms: [
        { term: "Owned", zh: "被拥有", note: "Someone has a claim to it." },
        { term: "Value", zh: "价值", note: "The value may change and is not guaranteed." }
      ],
      notes: "Use simple examples: cash, a building, a share. Avoid asset-class taxonomy."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 1: evidence or opinion?",
      zhTitle: "检查1：证据还是观点？",
      visual: investmentPhotos.investorMeetingReport,
      question: "Which sentence is best for an analyst notebook?",
      zh: "哪一句最适合写进分析记录？",
      choices: [
        "Tencent is famous, so it must be a good investment.",
        "Tencent's listed share can be identified as 0700.HK, and we need more evidence before judging.",
        "I like Tencent's products, so the share is safe.",
        "The graph moved, so there is no risk."
      ],
      answer: 1,
      explanation: "Correct: it records an identifiable fact and delays judgement until more evidence is checked.",
      explanationZh: "正确：它记录了可识别的事实，并把判断放在更多证据之后。",
      notes: "This catches the beginner shortcut from familiarity to judgement."
    },
    {
      type: "section",
      eyebrow: "Part 2",
      part: "2",
      title: "What is a share?",
      zhTitle: "股票是什么？",
      notes: "This section introduces share and share price without market-cap or valuation formulas."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Share",
      term: "Share",
      termZh: "股票 / 股份",
      definition: "A share is one unit of <span class=\"blank invReveal\" data-answer=\"ownership\" style=\"--blank-width:11ch\"><span class=\"invBlankText\">ownership</span></span> in a company.",
      definitionZh: "股票是公司所有权中的一个单位。",
      keyTerms: [
        { term: "One unit", zh: "一个单位", note: "A share is a small part, not the whole company." },
        { term: "Ownership", zh: "所有权", note: "The shareholder owns a claim, not the company's products." }
      ],
      notes: "Keep the definition direct. Control and voting detail comes later."
    },
    {
      type: "discussion",
      eyebrow: "Think",
      title: "What do you own if you own one share?",
      zhTitle: "如果拥有一股，你拥有了什么？",
      visual: investmentPhotos.shareholderMeeting,
      question: "Choose one: the whole company, one product, one unit of ownership, or one guaranteed profit. Explain your choice.",
      zh: "选择一个：整家公司、一个产品、一个所有权单位，还是一个保证利润。说明理由。",
      revealTitle: "Model answer",
      answer: "One share is one ownership unit. It does not mean owning the whole company, owning a product or receiving guaranteed profit.",
      notes: "This prepares Lesson 4 but does not teach ownership percentage yet."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Share price",
      term: "Share price",
      termZh: "股价",
      definition: "A share price is the market price of one <span class=\"blank invReveal\" data-answer=\"share\" style=\"--blank-width:7ch\"><span class=\"invBlankText\">share</span></span> at a specific time.",
      definitionZh: "股价是在特定时间一股股票的市场价格。",
      keyTerms: [
        { term: "One share", zh: "一股", note: "Not the whole company." },
        { term: "Specific time", zh: "特定时间", note: "The classroom graph is frozen, not live." }
      ],
      notes: "Do not calculate percentage change in this lesson."
    },
    {
      type: "priceChart",
      eyebrow: "First graph",
      title: "First look: Tencent share-price graph",
      zhTitle: "第一次看腾讯股价图",
      question: "What movement do you notice, and what information might explain it?",
      questionZh: "你注意到哪一次变化？可能需要什么信息来解释它？",
      ticker: "0700.HK",
      data: investmentMarketData.tencentFiveYearSharePrice,
      yMin: 150,
      yMax: 700,
      sourceStamp: "Tencent 0700.HK monthly closes | Yahoo Finance | accessed 2 Jul 2026",
      alt: "Five-year line chart of Tencent 0700.HK monthly share-price closes.",
      notes: [
        "Use this for observation only: up, down, high, low, latest point.",
        "Say clearly that percentage-change calculation is for a later lesson."
      ]
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Graph observation and movement question",
      zhTitle: "图表观察和价格变化问题",
      mode: "fillBlanks",
      items: [
        { prompt: "Each graph point shows the price of one __________.", answer: "share", zh: "每个点显示一股股票的价格。" },
        { prompt: "The graph is evidence, not a complete investment __________.", answer: "judgement", zh: "图表是证据，不是完整的投资判断。" },
        { prompt: "A price movement needs a question about missing __________.", answer: "information", zh: "价格变化需要关于缺失信息的问题。" }
      ],
      notes: "Use this after the chart reveal. Do not ask for a calculation; ask what evidence might explain one movement."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 2: what can the graph prove?",
      zhTitle: "检查2：图表能证明什么？",
      visual: investmentPhotos.tabletFinancialChart,
      question: "Which claim is safest after looking at the graph?",
      zh: "看完图表后，哪一个说法最稳妥？",
      choices: [
        "Tencent is definitely a good investment.",
        "The line shows how one Tencent share price moved in this frozen source.",
        "Tencent's revenue must equal the latest share price.",
        "The graph removes the need to study risk."
      ],
      answer: 1,
      explanation: "Correct: the graph is useful evidence, but it does not prove investment quality by itself.",
      explanationZh: "正确：图表是有用证据，但它本身不能证明投资质量。",
      notes: "This checks the graph/evidence boundary."
    },
    {
      type: "section",
      eyebrow: "Part 3",
      part: "3",
      title: "Risk and evidence",
      zhTitle: "风险与证据",
      notes: "This section introduces risk and the evidence-before-opinion habit."
    },
    {
      type: "dataSnapshot",
      eyebrow: "Evidence",
      title: "One company fact is not a judgement",
      zhTitle: "一个公司事实不是完整判断",
      visual: investmentPhotos.annualReports,
      sourceStamp: "Tencent FY2025 results | RMB billions | snapshot date 26 Jun 2026",
      focusMetrics: [
        { label: "Revenue", value: "RMB751.8bn" },
        { label: "Gross profit", value: "RMB422.6bn" },
        { label: "Gross margin", value: "56%" }
      ],
      task: "Mark each figure as evidence, not a recommendation.",
      taskZh: "把每个数字标为证据，而不是投资建议。",
      note: "A company figure can help an analyst ask a better question, but it cannot prove a good investment alone.",
      noteZh: "公司数据能帮助分析者提出更好的问题，但单独一个数据不能证明好投资。",
      notes: "Do not teach revenue, gross profit or margin formulas. They are source examples only."
    },
    {
      type: "analystBoard",
      eyebrow: "Analyst board",
      title: "What evidence should an analyst collect?",
      zhTitle: "分析者应该收集哪些证据？",
      visual: investmentPhotos.financialAnalysisDesk,
      revealBlocks: true,
      blocks: [
        {
          label: "Company",
          title: "What does the business do?",
          body: "A familiar company gives context, but familiarity is not enough.",
          zh: "熟悉的公司能提供背景，但熟悉不等于证据充分。"
        },
        {
          label: "Share price",
          title: "What is the market price?",
          body: "The price tells us what investors paid for one share at a point in time.",
          zh: "股价告诉我们某个时间点一股股票的市场价格。"
        },
        {
          label: "Risk",
          title: "What could go wrong?",
          body: "Risk reminds us that future results may be worse than expected.",
          zh: "风险提醒我们未来结果可能低于预期。"
        }
      ],
      prompt: "Which block is missing from this weak claim: 'Tencent is famous, so it is a good investment'?",
      promptZh: "这句弱判断缺少哪一块证据：“腾讯很有名，所以是好投资”？",
      notes: "Reveal blocks one by one. Make students name the missing evidence type before reveal."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Risk",
      term: "Risk",
      termZh: "风险",
      definition: "Risk is the possibility that results, returns or prices are worse than <span class=\"blank invReveal\" data-answer=\"expected\" style=\"--blank-width:10ch\"><span class=\"invBlankText\">expected</span></span>.",
      definitionZh: "风险是结果、回报或价格比预期更差的可能性。",
      keyTerms: [
        { term: "Possibility", zh: "可能性", note: "Risk is about what could happen." },
        { term: "Expected", zh: "预期", note: "A result can disappoint if expectations were too high." }
      ],
      notes: "Keep risk broad and beginner-friendly. Detailed risk types come in Unit 4."
    },
    {
      type: "riskRegister",
      eyebrow: "First risk register",
      title: "What could make an opinion weak?",
      zhTitle: "什么会让观点变弱？",
      visual: investmentPhotos.shippingPort,
      revealEffects: true,
      effectLabel: "Why it matters",
      table: [
        ["Risk", "Analyst question", "Likely effect"],
        ["Missing source", "Where did the number come from?", "The claim may not be reliable."],
        ["Ignoring price", "What price is paid for one share?", "A strong company can still be expensive."],
        ["Ignoring risk", "What could go worse than expected?", "Future results may disappoint."],
        ["Only using opinion", "What evidence supports the claim?", "The judgement is weak." ]
      ],
      prompt: "Pick one weak opinion and improve it by adding evidence.",
      promptZh: "选择一个弱观点，并加入证据来改进它。",
      answer: "Better judgement starts with a source, a figure and a risk question.",
      notes: "This is a first risk habit, not a full risk taxonomy."
    },
    {
      type: "peerTask",
      eyebrow: "Pair task",
      title: "Sort the statements",
      zhTitle: "给句子分类",
      taskType: "sort",
      categories: ["Company fact", "Share price", "Evidence", "Weak opinion"],
      steps: [
        { text: "Sort each statement into one category.", zh: "把每个句子分到一个类别。" },
        { text: "Choose one weak opinion and add evidence to improve it.", zh: "选择一个弱观点，并加入证据来改进。" }
      ],
      cases: [
        { label: "A", text: "Tencent is listed as 0700.HK." },
        { label: "B", text: "The graph line moved up and down." },
        { label: "C", text: "The source was accessed on 2 Jul 2026." },
        { label: "D", text: "Tencent must be safe because many students know it." }
      ],
      notes: "This matches the handout sorter and gives a quick collaborative check. Model improvement: Tencent is familiar, but an analyst still needs source-dated evidence about share price, company performance and risk."
    },
    {
      type: "flow",
      eyebrow: "Analyst habit",
      title: "How should an analyst think?",
      zhTitle: "分析者应该怎样思考？",
      visual: investmentPhotos.investorChartScreens,
      flowStyle: "sequence",
      steps: [
        { text: "Start with the __________.", answer: "company", zh: "先确认公司。" },
        { text: "Identify the listed __________.", answer: "share", zh: "识别上市股票。" },
        { text: "Read source-dated __________.", answer: "evidence", zh: "阅读带来源日期的证据。" },
        { text: "Ask about price and __________ before judging.", answer: "risk", zh: "判断前询问价格和风险。" }
      ],
      notes: "This is the final structure students should remember from Lesson 1."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 3: evidence before opinion",
      zhTitle: "检查3：先证据，后观点",
      visual: investmentPhotos.tradingApps,
      question: "Which sentence best follows today's course rule?",
      zh: "哪一句最符合今天的课程规则？",
      choices: [
        "I know Tencent, so I know the share is good.",
        "A share-price graph and company figures are evidence, but I still need risk and price judgement.",
        "If a company has revenue, there is no risk.",
        "A source date is not important."
      ],
      answer: 1,
      explanation: "Correct: evidence starts the analysis, but judgement still needs price, risk and limits.",
      explanationZh: "正确：证据开启分析，但判断仍需要价格、风险和局限。",
      notes: "This is the main formative check before the exit ticket."
    },
    {
      type: "discussion",
      eyebrow: "Next lesson bridge",
      title: "What question should we ask next?",
      zhTitle: "下一节课应该问什么？",
      visual: investmentPhotos.hkexHall,
      question: "If Tencent is a company and 0700.HK is a listed share, what do we need to understand about the stock market next?",
      zh: "如果腾讯是公司，0700.HK 是上市股票，那么下一步我们需要理解股票市场的什么？",
      revealTitle: "Bridge to Lesson 2",
      answer: "Next we ask why companies need a stock market and how exchanges, listing, liquidity and trading frictions help a share trade.",
      notes: "Make the progression to Lesson 2 explicit."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Exit ticket",
      zhTitle: "离堂小测",
      mode: "fillBlanks",
      items: [
        { prompt: "Investment analysis uses __________ before opinion.", answer: "evidence", zh: "投资分析先用证据，再形成观点。" },
        { prompt: "A share is one unit of __________ in a company.", answer: "ownership", zh: "股票是公司所有权中的一个单位。" },
        { prompt: "Before judging a share, an analyst asks about price and __________.", answer: "risk", zh: "判断股票前，分析者要问价格和风险。" }
      ],
      notes: "Collect or cold-call. The written handout exit ticket asks for one full sentence."
    }
  ]
};
