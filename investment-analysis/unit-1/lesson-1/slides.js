window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};
const investmentMarketData = window.INVEST.marketData || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit 1 Lesson 1: Share price means one ownership unit",
    sources: [
      {
        label: "Tencent investor relations",
        note: "Used for company listing context and official investor-material links.",
        date: "Accessed 26 June 2026",
        url: "https://www.tencent.com/en-us/investors.html"
      },
      {
        label: "Yahoo Finance historical prices",
        note: "Used for the frozen five-year 0700.HK monthly share-price graph.",
        date: "Accessed 2 July 2026",
        url: "https://finance.yahoo.com/quote/0700.HK/history/"
      },
      {
        label: "Tencent 2025 annual and fourth quarter results",
        note: "Used for FY2025 revenue, gross profit and gross-margin snapshot, and official listing context: HKEX 00700 (HKD Counter) / 80700 (RMB Counter).",
        date: "Published 18 March 2026; accessed 26 June 2026",
        url: "https://static.www.tencent.com/uploads/2026/03/18/e6a646796d0d869acc76271c9ee1a6a5.pdf"
      }
    ]
  },
  handout: {
    title: "Tencent analyst sheet",
    subtitle: "Unit 1 Lesson 1: What does a stock price mean?",
    description: "Start from Tencent's five-year price graph, then connect one share, market price and why that price changes.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "A",
        title: "Tencent's graph shows one listed share price",
        instruction: "Use the five-year graph as the hook, then identify the company and code quickly.",
        blocks: [
          {
            type: "facts",
            items: [
              { label: "Company", value: "Tencent Holdings Limited" },
              { label: "Quote ticker", value: "0700.HK" },
              { label: "Official HKEX code", value: "00700 (HKD counter)" },
              { label: "Exchange", value: "Hong Kong Stock Exchange" },
              { label: "Price graph source", value: "Yahoo Finance historical prices" },
              { label: "Graph accessed", value: "2 Jul 2026" },
              { label: "Source", value: "Tencent 2025 annual and fourth quarter results" },
              { label: "Published", value: "18 Mar 2026" },
              { label: "Accessed", value: "26 Jun 2026" }
            ]
          },
          {
            type: "prompts",
            prompts: [
              { label: "Graph hook", prompt: "The Tencent line rises and falls sharply. What exactly does each point on the line measure?", lines: 2 },
              { label: "Fast ID check", prompt: "Circle Tencent, 0700.HK / 00700 and the source date. This should take under one minute.", lines: 1 },
              { label: "Price meaning", prompt: "A share price is the price of what exactly? What can it not prove by itself?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "B",
        title: "Key terms: ownership unit and market price",
        instruction: "Complete the ownership and price terms before judging whether the price is attractive.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Share", prompt: "A share is one unit of __________ in a company.", answer: "ownership" },
              { label: "Shareholder", prompt: "A shareholder is a person or institution that owns one or more __________.", answer: "shares" },
              { label: "Share price", prompt: "A share price is the __________ price of one share at a specific time.", answer: "market" },
              { label: "Market price", prompt: "A market price is formed by __________ and sellers.", answer: "buyers" },
              { label: "Expectations", prompt: "Expectations are investors' views about future profit and __________.", answer: "risk" }
            ]
          }
        ]
      },
      {
        label: "C",
        title: "New information can change Tencent's price",
        instruction: "Use each figure as possible information, then connect information to expectations and price.",
        blocks: [
          {
            type: "table",
            columns: ["Figure", "Possible information", "Why the price may still change"],
            rows: [
              {
                metric: "Revenue",
                value: "RMB751.8bn",
                shows: "Total sales before costs are deducted.",
                limits: "",
                showsLines: 1,
                limitLines: 2
              },
              {
                metric: "Gross profit",
                value: "RMB422.6bn",
                shows: "Revenue left after direct costs.",
                limits: "",
                showsLines: 1,
                limitLines: 2
              },
              {
                metric: "Gross margin",
                value: "56%",
                shows: "Gross profit as a percentage of revenue.",
                limits: "",
                showsLines: 1,
                limitLines: 2
              }
            ]
          }
        ]
      },
      {
        label: "D",
        title: "Measure a move on Tencent's graph",
        instruction: "Use the old graph point as the base, then explain why the move may have happened.",
        blocks: [
          {
            type: "calculation",
            formula: "percentage change = (new price - old price) / old price x 100",
            worked: "Tencent graph example: HK$195.27 to HK$663.00 = (663.00 - 195.27) / 195.27 x 100 = about 240%.",
            task: "Tencent's graph then moves from HK$663.00 to HK$429.80. Calculate the percentage change.",
            lines: 4
          },
          {
            type: "sentence",
            label: "Price movement sentence",
            prompt: "Explain why a price can rise before profit actually rises.",
            keywords: ["information", "expectations", "buyers", "price"],
            lines: 2
          }
        ]
      },
      {
        label: "E",
        title: "Strong company does not always mean good investment",
        instruction: "Use one Tencent figure, one graph point and one limitation before writing.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Evidence", prompt: "Which Tencent figure or graph point will you use?", lines: 1 },
              { label: "Limitation", prompt: "What does that figure not prove?", lines: 1 },
              { label: "Risk", prompt: "Name one risk and link it to future profit, expectations or price paid.", lines: 2 }
            ]
          },
          {
            type: "writing",
            question: "Explain why high revenue does not prove that a share is a good investment. [4]",
            keywords: ["revenue", "profit", "risk", "price paid", "expectations", "future"],
            lines: 7
          }
        ]
      }
    ],
    sources: "Tencent price graph: Yahoo Finance monthly historical prices, accessed 2 Jul 2026. Tencent company data: 2025 annual and fourth quarter results, published 18 Mar 2026, accessed 26 Jun 2026. Educational use only; no personal investment recommendation."
  },
  slides: [
    {
      type: "priceChart",
      eyebrow: "Starter",
      title: "Tencent's price story",
      question: "What is this line actually measuring?",
      ticker: "0700.HK",
      data: investmentMarketData.tencentFiveYearSharePrice,
      yMin: 150,
      yMax: 700,
      sourceStamp: "Tencent 0700.HK monthly closes | Yahoo Finance | accessed 2 Jul 2026",
      alt: "Five-year line chart of Tencent 0700.HK monthly share-price closes.",
      notes: [
        "Do not define share price first. Put the graph on screen and ask students to say what the line measures.",
        "Reveal the high, low and latest monthly-close labels one by one. Then ask whether each point is the whole company, one share price or revenue.",
        "State that this is a frozen classroom snapshot, not a live quote and not investment advice."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Starter",
      title: "Each point is one share price",
      question: "Look at Tencent's five-year line. Does one point show the value of the whole company, one share's market price, or Tencent's annual revenue? Explain.",
      zh: "看腾讯五年股价走势。一个点表示整家公司价值、一股的市场价格，还是腾讯的年度收入？说明理由。",
      revealTitle: "Line meaning",
      answer: "Each point is the market price of one Tencent share at that time. The graph does not show Tencent's whole company value or its annual revenue.",
      notes: [
        "Ask students to vote before revealing. This is the misconception check that makes the graph useful.",
        "After reveal, move straight into the fast ID check: Tencent, 0700.HK / 00700, Hong Kong Stock Exchange."
      ]
    },
    {
      type: "marketBrief",
      eyebrow: "Market Brief",
      title: "The graph belongs to one listed share",
      subtitle: "Company and code identify the share; the line prices one ownership unit over time.",
      visual: investmentPhotos.tencentBinhaiTowers,
      ticker: "Handout A",
      question: "Open Section A. Circle Tencent, 0700.HK / 00700 and the graph source, then answer: what is the line attached to?",
      questionZh: "打开A部分。圈出公司、代码和来源日期，然后回答：这个价格对应的是什么？",
      sourceStamp: "Tencent price graph and company snapshot | accessed Jul 2026",
      revealMetricValues: true,
      metrics: [
        { label: "1. Company", value: "Tencent", note: "腾讯控股" },
        { label: "2. Listed share", value: "0700.HK / 00700", note: "报价 / 港交所" },
        { label: "3. Graph line", value: "One share price", note: "一股股票的价格" }
      ],
      notes: [
        "Students should already have said what the graph measures. Use this slide to attach the graph to the correct listed share.",
        "Emphasise that the company is a real data example, not personal investment advice."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      phases: ["Share = ownership", "Information moves price", "Price affects judgement"],
      bullets: [
        "explain what each point on a stock-price graph represents",
        "explain why new information can move the price line",
        "calculate a graph-based price change and judge why price still matters"
      ],
      zhBullets: [
        "解释股价代表什么",
        "解释新信息为什么会改变股价",
        "计算简单价格变化，并判断为什么价格仍然重要"
      ],
      notes: "Keep this short. The success test is whether students can say what the graph line measures, why it moves, and why high company figures still need a price judgement."
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "A stock price is one share's market price",
      zhTitle: "股价是一股股票的市场价格",
      notes: "This section starts with the price concept instead of spending time on identifiers or decision categories."
    },
    {
      type: "discussion",
      eyebrow: "Starter",
      title: "A stock price is for one share",
      visual: investmentPhotos.financialAnalysisDesk,
      question: "The graph shows Tencent at HK$429.80 in the latest monthly close. What exactly costs HK$429.80: the whole company, one ownership unit, or last year's revenue? Explain.",
      zh: "如果课堂例子中腾讯股价是420港元，420港元对应的到底是什么：整家公司、一份所有权单位，还是去年的收入？说明理由。",
      revealTitle: "Price of one share",
      answer: "The price is for one share: one small ownership unit in the company at that time. It is not the price of the whole company and it is not the same as last year's revenue.",
      notes: [
        "Make every student choose before revealing. This turns the opening into the central misconception check.",
        "Use HK$429.80 as the latest monthly close in the frozen classroom snapshot; do not imply it is a live price."
      ]
    },
    {
      type: "flow",
      eyebrow: "Key idea",
      title: "Share price means one ownership unit at one time",
      visual: investmentPhotos.stockReportCalculator,
      flowStyle: "sequence",
      steps: [
        { text: "A listed company is split into many __________.", answer: "shares", zh: "上市公司的所有权被分成许多股票。" },
        { text: "One share is a small unit of __________.", answer: "ownership", zh: "一股股票是一小份所有权。" },
        { text: "The share price is the market price of __________ share.", answer: "one", zh: "股价是一股股票的市场价格。" },
        { text: "That price is a time point, not a guarantee of __________.", answer: "value", zh: "这个价格是某一时点的价格，不保证价值。" }
      ],
      notes: "Make students predict each blank before reveal. The point is to attach price to one ownership unit."
    },
    {
      type: "peerTask",
      eyebrow: "Pair task",
      title: "Define stock price in one sentence",
      visual: investmentPhotos.businessChartsPaper,
      steps: [
        "Write: A stock price is...",
        "Add what the price represents.",
        "Add one thing the price does not prove."
      ],
      sampleAnswer: "A stock price is the market price of one share at a specific time. It represents what buyers and sellers currently pay for one ownership unit, but it does not prove the share is cheap, safe or a good investment.",
      notes: "This is the first individual written check. Students copy a corrected sentence into Handout Section A or B."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Price shows one share at one time",
      visual: investmentPhotos.smartphoneMarketChart,
      question: "Handout Section B check: Tencent's latest monthly graph point is HK$429.80. Which statement is best?",
      zh: "B部分检查：腾讯风格的价格是420港元。哪句话最准确？",
      choices: [
        "The whole company costs HK$420.",
        "One Tencent share had a market price of HK$429.80 at that monthly close.",
        "Tencent's revenue is HK$420.",
        "The share is guaranteed to be a good investment."
      ],
      answer: 1,
      explanation: "A share price is the market price of one share at a specific time. It does not prove total company value, revenue or investment quality by itself.",
      notes: "If students choose A or C, re-anchor the price to one share. If they choose D, stress that price alone is not a judgement."
    },
    {
      type: "section",
      eyebrow: "Part 2",
      part: "2",
      title: "Buying a share gives a small ownership claim",
      zhTitle: "买入股票获得一小份所有权",
      notes: "Keep this focused on the ownership claim. Identifiers are handled later as a quick one-minute check."
    },
    {
      type: "discussion",
      eyebrow: "Starter",
      title: "One share gives a tiny ownership claim",
      visual: investmentPhotos.smartphoneMarketChart,
      question: "If one student buys 1 Tencent share, which statement is correct: they own a tiny claim, they own Tencent's buildings, or they control Tencent's managers? Explain your choice.",
      zh: "如果一个学生买了1股腾讯股票，哪句话正确：拥有很小的权益、拥有腾讯大楼，还是控制腾讯经理？说明理由。",
      revealTitle: "Useful distinction",
      answer: "They own a tiny ownership claim. A shareholder does not personally own Tencent's buildings, managers or bank account, and one tiny shareholder does not control the company.",
      notes: "Ask for votes before revealing. Students then write one thing a shareholder owns and one thing a shareholder does not personally own."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Listed companies split ownership into shares",
      zhTitle: "上市公司把所有权分成许多股票",
      visual: investmentPhotos.modernTradingDesk,
      notes: [
        "Observation question: what do the screens show that a private family business would not show?",
        "Bridge: listed shares can be bought and sold by many investors, so ownership is split into many small units."
      ]
    },
    {
      type: "term",
      eyebrow: "Key idea",
      title: "Share",
      term: "Share",
      termZh: "股票 / 股份",
      definition: "A share is one <span class=\"blank invReveal\" data-answer=\"unit\" style=\"--blank-width:6ch\"><span class=\"invBlankText\">unit</span></span> of <span class=\"blank invReveal\" data-answer=\"ownership\" style=\"--blank-width:11ch\"><span class=\"invBlankText\">ownership</span></span> in a company.",
      definitionZh: "股票是公司所有权中的一个单位。",
      keyTerms: [
        { term: "Ownership", zh: "所有权", note: "The investor has a claim on part of the company." },
        { term: "Unit", zh: "单位", note: "One share is only a small piece, not the whole company." }
      ],
      notes: "Students complete the Share line in Section B before reveal. The reveal should focus on unit and ownership, not just the word share."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Fill in the blanks",
      mode: "fillBlanks",
      items: [
        { prompt: "A share is one unit of __________ in a company.", answer: "ownership", zh: "股票代表公司所有权中的一个单位。" },
        { prompt: "Buying one share does not mean you own the __________ company.", answer: "whole", zh: "买一股不等于拥有整家公司。" }
      ],
      notes: "Students write the Section B ownership blanks first. Click to reveal each answer before introducing shareholder."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "A shareholder owns one or more shares",
      visual: investmentPhotos.investorMeetingReport,
      notes: [
        "Observation question: who might own shares besides one individual student?",
        "Bridge: a shareholder is any person or institution that owns one or more shares. Students then complete the shareholder line in Section B."
      ]
    },
    {
      type: "term",
      eyebrow: "Key idea",
      title: "Shareholder",
      term: "Shareholder",
      termZh: "股东",
      definition: "A shareholder is a person or institution that <span class=\"blank invReveal\" data-answer=\"owns\" style=\"--blank-width:6ch\"><span class=\"invBlankText\">owns</span></span> one or more shares in a company.",
      definitionZh: "股东是拥有公司一股或多股股票的个人或机构。",
      keyTerms: [
        { term: "Person", zh: "个人", note: "For example, a household investor." },
        { term: "Institution", zh: "机构", note: "For example, a fund, pension scheme or company." }
      ],
      notes: "Students complete the Shareholder line in Section B before reveal. Point out that shareholders can be people or institutions; Grade 9 students often assume only individuals."
    },
    {
      type: "discussion",
      eyebrow: "Discuss",
      title: "More shares usually mean more influence",
      visual: investmentPhotos.investorMeetingReport,
      question: "Handout Section B check: One student owns 1 share. A large fund owns 100 million shares. Which shareholder is more likely to influence company decisions? Why?",
      zh: "一个学生拥有1股，一个大型基金拥有1亿股。哪个股东更可能影响公司决策？为什么？",
      revealTitle: "Model direction",
      answer: "The large fund is more likely to influence decisions because voting power and attention from managers usually depend on how many shares are owned.",
      notes: "Keep this conceptual. Do not teach detailed voting rights yet. Check this before moving to company identification."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "A share is the unit; a shareholder owns units",
      visual: investmentPhotos.smartphoneMarketChart,
      question: "Handout Section B check: Which statement is correct?",
      zh: "哪一句是正确的？",
      choices: [
        "A share is a person who owns a company.",
        "A shareholder owns one or more shares.",
        "A share guarantees a fixed interest payment.",
        "A shareholder always controls the company."
      ],
      answer: 1,
      explanation: "A shareholder is the owner of one or more shares. A share is the ownership unit.",
      notes: "Wait for votes before clicking a choice. The explanation should stay hidden until a choice is selected."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Stock codes identify the right listed share",
      visual: investmentPhotos.tencentBinhaiTowers,
      notes: [
        "Observation question: what real business is behind the quote ticker 0700.HK and HKEX code 00700?",
        "Bridge: the code is a quick address check. Once students have the right listed share, return to price meaning and price movement."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Discuss",
      title: "Codes identify the share; price explains the quote",
      visual: investmentPhotos.financeChartWhiteboard,
      question: "Look at 0700.HK and 00700 in Handout A. What do the codes help us find, and what is the more important price question for today?",
      zh: "看A部分的0700.HK和00700。代码帮助我们找到什么？今天更重要的价格问题是什么？",
      revealTitle: "Fast identifier, bigger question",
      answer: "The codes help us find Tencent's Hong Kong-listed share. Today's bigger question is what the share price represents and why that price might change.",
      notes: "Keep this to one reveal. The point is not to drill identifiers; it is to clear the path for price analysis."
    },
    {
      type: "term",
      eyebrow: "Key idea",
      title: "Share price",
      term: "Share price",
      termZh: "股价",
      definition: "A share price is the <span class=\"blank invReveal\" data-answer=\"market price\" style=\"--blank-width:13ch\"><span class=\"invBlankText\">market price</span></span> of one share at a <span class=\"blank invReveal\" data-answer=\"specific time\" style=\"--blank-width:14ch\"><span class=\"invBlankText\">specific time</span></span>.",
      definitionZh: "股价是在特定时间一股股票的市场价格。",
      keyTerms: [
        { term: "Market price", zh: "市场价格", note: "It is formed by buyers and sellers in the market." },
        { term: "Specific time", zh: "特定时间", note: "Prices can change during the day." }
      ],
      notes: "Students complete the share-price line in Section B. Stress market price and specific time; students often speak as if a share has one permanent price."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Share price = one share at one time",
      mode: "fillBlanks",
      items: [
        { prompt: "A share price is the market price of __________ share.", answer: "one", zh: "股价是一股股票的市场价格。" },
        { prompt: "It is recorded at a specific __________.", answer: "time", zh: "股价对应一个特定时间。" },
        { prompt: "It does not prove the share is cheap, safe or a good __________.", answer: "investment", zh: "股价本身不能证明便宜、安全或是好投资。" }
      ],
      notes: "This is the main price-definition check. Students should write the full sentence in Handout Section B."
    },
    {
      type: "discussion",
      eyebrow: "Discuss",
      title: "Price is not the same as value",
      visual: investmentPhotos.financialAnalysisDesk,
      question: "If Tencent's share price rises today, does that prove the business became better today? What else could have changed?",
      zh: "如果腾讯股价今天上涨，能不能证明公司今天变好了？还可能是什么发生了变化？",
      revealTitle: "Price reacts to views",
      answer: "Not necessarily. The business may be the same today, but investors' information, expectations, buying pressure or selling pressure may have changed.",
      notes: "This bridges from price meaning into the information-expectations sequence."
    },
    {
      type: "section",
      eyebrow: "Part 3",
      part: "3",
      title: "New information can move the price line",
      zhTitle: "新信息会改变预期和股价",
      notes: "Students first read the FY2025 data as possible information, then connect information to expectations and movements on the frozen Tencent price graph."
    },
    {
      type: "dataSnapshot",
      eyebrow: "Data Snapshot",
      title: "What could move this line?",
      visual: investmentPhotos.tencentBinhaiTowers,
      sourceStamp: "Tencent FY2025 results | RMB billions | snapshot date 26 Jun 2026",
      focusMetrics: [
        { label: "Revenue", value: "RMB751.8bn" },
        { label: "Gross profit", value: "RMB422.6bn" },
        { label: "Gross margin", value: "56%" }
      ],
      task: "Handout Section C: record what each figure shows, then decide how it might change expectations about the price line.",
      note: "A graph line can move when investors receive new information about performance, risk or future profit.",
      notes: "Students have already done the quick ID check in Section A. Keep this slide to three headline figures only, then ask which figure might help explain a change in the price line."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "High revenue is evidence, not a full judgement",
      mode: "fillBlanks",
      items: [
        { prompt: "High revenue shows large __________ before costs are deducted.", answer: "sales", zh: "营业收入说明销售规模。" },
        { prompt: "It does not prove a good __________, because price and risk still matter.", answer: "investment", zh: "它不能单独证明是好投资。" },
        { prompt: "Gross margin is useful evidence, but it is not a complete __________.", answer: "judgement", zh: "毛利率有用，但不是完整判断。" }
      ],
      notes: "Start with the wrong claim 'high revenue proves a good investment'. Students correct it by adding sales, investment and judgement before reveal."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Price lines need buyers and sellers",
      visual: investmentPhotos.smartphoneMarketChart,
      notes: [
        "Observation question: what could make more buyers want the same Tencent share at the same time?",
        "Bridge: every point on the price line is a market price formed by buyers and sellers."
      ]
    },
    {
      type: "term",
      eyebrow: "Key idea",
      title: "Market price",
      term: "Market price",
      termZh: "市场价格",
      definition: "A market price is formed by <span class=\"blank invReveal\" data-answer=\"buyers\" style=\"--blank-width:7ch\"><span class=\"invBlankText\">buyers</span></span> and <span class=\"blank invReveal\" data-answer=\"sellers\" style=\"--blank-width:8ch\"><span class=\"invBlankText\">sellers</span></span> at a specific time.",
      definitionZh: "市场价格是在特定时间由买方和卖方形成的价格。",
      keyTerms: [
        { term: "Buyers", zh: "买方", note: "More buying pressure can push the price up." },
        { term: "Sellers", zh: "卖方", note: "More selling pressure can push the price down." }
      ],
      notes: "Students complete the market-price and expectations lines in Section B. This prepares the price-line movement flow."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "The old graph point is the base",
      visual: investmentPhotos.stockReportCalculator,
      notes: [
        "Observation question: which graph point should be the base before calculating a percentage change?",
        "Bridge: percentage price change compares the change with the old price. Students set up the calculation in Handout Section D."
      ]
    },
    {
      type: "calculationDesk",
      eyebrow: "Calculation Desk",
      title: "Formula: percentage price change",
      visual: investmentPhotos.stockReportCalculator,
      formula: "percentage change = (new price - old price) / old price x 100",
      worked: "Tencent graph example: HK$195.27 to HK$663.00 means the change is HK$467.73. The old price is the base: 467.73 / 195.27 x 100 = about 240%.",
      workedZh: "腾讯图表示例：股价从195.27港元到663.00港元，变化为467.73港元；旧价格195.27港元是基数。",
      notes: "Keep this slide to formula plus worked graph example. Students do the latest graph fall on the next slide so the base-denominator idea is not crowded."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Try it: old price is the base",
      mode: "fillBlanks",
      items: [
        { prompt: "From HK$663.00 to HK$429.80, the change is HK$__________.", answer: "-233.20", zh: "先找出价格变化：429.80 - 663.00。" },
        { prompt: "The denominator is the __________ graph point, HK$663.00.", answer: "old", zh: "分母是旧价格，而不是新价格。" },
        { prompt: "-233.20 divided by 663.00, times 100, is about __________%.", answer: "-35", zh: "再把变化额除以原价并乘以100。" }
      ],
      notes: "This checks Handout Section D using the graph's high-to-latest move and catches students who divide by the new price."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Use old price as the denominator",
      visual: investmentPhotos.tabletFinancialChart,
      question: "Handout Section D check: Tencent's graph falls from HK$663.00 to HK$429.80. What is the approximate percentage change?",
      zh: "腾讯图表从663.00港元跌至429.80港元。大约百分比变化是多少？",
      choices: [
        "-35%",
        "-54%",
        "+35%",
        "-233%"
      ],
      answer: 0,
      explanation: "(429.80 - 663.00) / 663.00 x 100 is about -35%. The old graph point is the denominator.",
      notes: "This is the main calculation hinge before the expectations chain. If many choose -54% or -233%, re-teach old price as the base and percent as relative change."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "New information changes expectations",
      visual: investmentPhotos.modernTradingDesk,
      notes: [
        "Observation question: why might investors react before a company's profit has actually changed?",
        "Bridge: information changes expectations, and expectations can change buying and selling pressure. Students use this to write the Section D sentence."
      ]
    },
    {
      type: "flow",
      eyebrow: "Key idea",
      title: "New information can move the price",
      visual: investmentPhotos.investorChartScreens,
      zhTitle: "信息会改变买卖压力和股价",
      flowStyle: "sequence",
      steps: [
        { text: "Investors receive new __________.", answer: "information", zh: "投资者收到新的信息。" },
        { text: "They change __________ about future profit.", answer: "expectations", zh: "他们改变对未来利润的预期。" },
        { text: "More __________ than sellers can push the price up.", answer: "buyers", zh: "买方多于卖方可能推动价格上涨。" },
        { text: "More sellers than buyers can push the price __________.", answer: "down", zh: "卖方多于买方可能推动价格下跌。" }
      ],
      notes: "Show the whole causal sequence, but make students predict each key link before reveal. The following sentence-completion task is the formative check. Do not introduce efficient-market theory."
    },
    {
      type: "peerTask",
      eyebrow: "Pair task",
      title: "Write the information-to-price sentence",
      visual: investmentPhotos.investorChartScreens,
      steps: [
        "Write your own sentence first using: information, expectations, buyers, price.",
        "Compare with your partner and check the order: information -> expectations -> buyers -> price.",
        "Prepare one sentence explaining why a price can rise before profits actually rise."
      ],
      sampleAnswer: "If investors receive positive information, their expectations about future profit may rise, so more buyers want the share and the price can rise.",
      notes: "Students need this sentence-level explanation in Section D before moving to judgement."
    },
    {
      type: "section",
      eyebrow: "Part 4",
      part: "4",
      title: "A strong company can still be a weak investment",
      zhTitle: "强公司仍可能是弱投资",
      notes: "This is the judgement frame for the course."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Evidence comes before judgement",
      visual: investmentPhotos.financialAnalysisDesk,
      notes: [
        "Observation question: what evidence is visible here besides a price chart?",
        "Bridge: a good investment judgement needs business performance, expectations and the price paid. Students now combine Sections C and E."
      ]
    },
    {
      type: "analystBoard",
      eyebrow: "Analyst Board",
      title: "Judge performance, expectations and price paid",
      visual: investmentPhotos.financialAnalysisDesk,
      revealBlocks: true,
      blocks: [
        {
          label: "Company performance",
          title: "What does the business do?",
          body: "Tencent's FY2025 snapshot shows very large revenue and gross profit, but those figures do not explain the whole price line by themselves.",
          zh: "公司业绩：业务规模和利润情况。"
        },
        {
          label: "Expectations",
          title: "What does the market expect next?",
          body: "Tencent's graph can move because the share price reflects what investors expect in the future, not only what happened last year.",
          zh: "市场预期：投资者对未来的看法。"
        },
        {
          label: "Price paid",
          title: "What are you paying?",
          body: "Even a strong company can be a weak investment if the price point you pay already assumes excellent results.",
          zh: "买入价格：价格太高会降低投资吸引力。"
        }
      ],
      prompt: "Handout Section E: which block is missing when someone says 'Tencent's graph went up, so it must be a good investment'?",
      notes: "Show only the block labels and questions first. Students choose the missing block, then reveal the three bodies one by one and finally reveal the prompt."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Risk changes whether the price is attractive",
      visual: investmentPhotos.shippingPort,
      notes: [
        "Observation question: what could change outside the company even if the company is well managed?",
        "Bridge: investor judgement includes future risk, not just last year's revenue or profit. Students add one risk to Section E."
      ]
    },
    {
      type: "riskRegister",
      eyebrow: "Risk Register",
      title: "A good company can still be a risky share",
      visual: investmentPhotos.shippingPort,
      revealEffects: true,
      effectLabel: "Effect link",
      table: [
        ["Risk", "Investor question", "Likely effect"],
        ["High expectations", "Has Tencent's price already assumed strong growth?", "Good results may still disappoint investors if expectations were even higher."],
        ["Regulation", "Could platform or gaming rules reduce future profit?", "Lower expected future profit can reduce the price investors are willing to pay."],
        ["Competition", "Could rivals weaken Tencent's games, ads or cloud margins?", "Lower margins or slower growth can weaken the investment case."],
        ["Currency and market mood", "Could exchange rates or market sentiment change returns?", "Some investors may earn less even if the business remains strong."]
      ],
      prompt: "Handout Section E: choose one risk and complete: risk -> future profit or expectations -> next point on the price line.",
      answer: "A strong answer names one Tencent risk and links it to future profit, investor expectations or the price paid.",
      notes: "Reveal the effect links only after students have chosen a risk. This is not a recommendation; it trains risk-evidence-effect language before the final hinge question."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "A good company can still be overpriced",
      visual: investmentPhotos.financialAnalysisDesk,
      question: "Handout Section E check: Which answer best explains why a famous company with a rising price graph may still be a poor investment?",
      zh: "哪一个答案最能解释为什么盈利公司仍可能不是好投资？",
      choices: [
        "A famous company is automatically a safe investment.",
        "The price point may already be too high compared with expected future profit and risk.",
        "High revenue always means the share price is cheap.",
        "A lower share price always means a better investment."
      ],
      answer: 1,
      explanation: "Investment judgement compares expected future profit and risk with the price paid for the share, not just the shape of the graph.",
      notes: "Use this before the 4-mark question. The wrong options are plausible student shortcuts, so ask students to explain why each shortcut fails."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Plan the evidence before writing",
      visual: investmentPhotos.businessChartsPaper,
      notes: [
        "Observation question: what evidence would you select before answering the 4-mark question?",
        "Bridge: the exam answer needs two developed points, not just a statement that revenue is high. Students should use their Section C and E notes."
      ]
    },
    {
      type: "exam",
      eyebrow: "Exam practice",
      title: "Explain why high revenue does not prove that a share is a good investment. [4]",
      visual: investmentPhotos.businessChartsPaper,
      revealKeywords: true,
      prompt: "First write a two-point plan: one revenue/profit limit and one price-graph/risk/expectations limit. Then reveal keywords if needed.",
      zh: "写出两个有发展的观点。可以使用腾讯数据快照。",
      keywords: ["revenue", "profit", "risk", "price paid", "expectations", "future"],
      notes: "Give 4 minutes. Require two because-cause-effect chains and at least one Tencent figure or graph point from the handout."
    },
    {
      type: "modelAnswer",
      eyebrow: "Model answer",
      title: "Explain why high revenue does not prove that a share is a good investment. [4]",
      visual: investmentPhotos.financialAnalysisDesk,
      cueLabel: "Compare your answer",
      cueText: "Underline evidence, then underline the limitation or judgement link in each paragraph.",
      paragraphs: [
        "Tencent's <mark>revenue</mark> of RMB751.8bn shows very large sales before costs are deducted, but revenue alone does not prove strong <mark>profit</mark> after all costs.",
        "A share can also be unattractive if the <mark>price paid</mark> is already too high. Tencent's five-year graph shows that price points can move sharply, so investors compare expected future profit and <mark>risk</mark> with the current share price before judging whether it is a good investment."
      ],
      notes: "Ask students to compare the model answer with Sections C and E of the handout, then underline two developed points: revenue vs profit, and price/risk/expectations."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Exit ticket",
      zhTitle: "离堂小测",
      mode: "fillBlanks",
      items: [
        { prompt: "Share price = market price of one __________.", answer: "share", zh: "股价是一股股票的市场价格。" },
        { prompt: "New information can change investor __________.", answer: "expectations", zh: "新信息会改变投资者预期。" },
        { prompt: "A high share price can make a good company a poor __________.", answer: "investment", zh: "高股价会影响投资判断。" }
      ],
      notes: "Collect or cold-call. This checks the handout's minimum exit evidence: price meaning, expectations and price-paid judgement."
    }
  ]
};
