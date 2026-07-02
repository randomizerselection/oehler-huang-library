window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};
const investmentMarketData = window.INVEST.marketData || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit 1 Lesson 1: Shares (1): Share prices",
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
    subtitle: "Unit 1 Lesson 1: Shares (1): Share prices",
    description: "Start from Tencent's five-year price graph, then connect one share, market price and why that price changes.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Exercise 1: identify the graph",
        instruction: "Use the five-year graph as the hook, then identify what one point on the line shows.",
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
              { label: "First answer", prompt: "Each point shows the market price of __________ Tencent share at that time.", lines: 1 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Exercise 2: define share price",
        instruction: "Write the definition before checking the key-term blanks.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Definition sentence", prompt: "A share price is...", lines: 2 },
              { label: "What it represents", prompt: "It represents the price of what ownership unit?", lines: 1 },
              { label: "What it does not prove", prompt: "Name one thing a share price does not prove by itself.", lines: 1 }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Exercise 3: identify the listed share",
        instruction: "Use the company name and stock codes as a quick address check.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Fast ID check", prompt: "Circle Tencent, 0700.HK / 00700 and the source date. This should take under one minute.", lines: 1 },
              { label: "Code meaning", prompt: "What do 0700.HK and 00700 help us find?", lines: 1 },
              { label: "Main price question", prompt: "After the code check, what is the more important price question for today?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Exercise 4: share price",
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
        label: "5",
        title: "Exercise 5: evidence is not judgement",
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
        label: "6",
        title: "Exercise 6: calculate the price change",
        instruction: "Use the old graph point as the base.",
        blocks: [
          {
            type: "calculation",
            formula: "percentage change = (new price - old price) / old price x 100",
            worked: "Tencent graph example: HK$195.27 to HK$663.00 = (663.00 - 195.27) / 195.27 x 100 = about 240%.",
            task: "Tencent's graph then moves from HK$663.00 to HK$429.80. Calculate the percentage change.",
            lines: 4
          }
        ]
      },
      {
        label: "7",
        title: "Exercise 7: explain a price movement",
        instruction: "Use the information-expectations-buyers-price steps.",
        blocks: [
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
        label: "Exam",
        title: "Are high-share-price companies good investments?",
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
      type: "hero",
      eyebrow: "Overview",
      title: "Shares (1): Share prices (股价)",
      zhTitle: "股票（一）：股价",
      subtitle: "Unit 1 Lesson 1",
      kicker: "What does each point on Tencent's share-price line show?",
      visual: investmentPhotos.modernTradingDesk,
      notes: [
        "Use this as the title slide before the graph hook.",
        "Then move to the Tencent price line and ask students what the line actually measures."
      ]
    },
    {
      type: "priceChart",
      eyebrow: "Starter",
      title: "What does this line measure?",
      zhTitle: "这条线衡量什么？",
      question: "What is this line actually measuring?",
      questionZh: "这条线到底在衡量什么？",
      ticker: "0700.HK",
      data: investmentMarketData.tencentFiveYearSharePrice,
      yMin: 150,
      yMax: 700,
      sourceStamp: "Tencent 0700.HK monthly closes | Yahoo Finance | accessed 2 Jul 2026",
      alt: "Five-year line chart of Tencent 0700.HK monthly share-price closes.",
      notes: [
        "Do not define share price first. Put the graph on screen and ask students what the line measures.",
        "Reveal the high, low and latest monthly-close labels one by one.",
        "State that this is a frozen classroom snapshot, not a live quote and not investment advice."
      ]
    },
    {
      type: "marketBrief",
      eyebrow: "Starter",
      title: "Exercise 1: identify the graph",
      zhTitle: "练习1：识别图表",
      subtitle: "Circle the listed share details before judging the line.",
      ticker: "Handout Exercise 1",
      question: "Circle Tencent, 0700.HK / 00700, the source date, and the line's meaning.",
      questionZh: "圈出腾讯、0700.HK / 00700、来源日期和这条线的含义。",
      sourceStamp: "Tencent graph | Yahoo Finance | accessed 2 Jul 2026",
      revealMetricValues: true,
      metrics: [
        { label: "Company", value: "Tencent", note: "腾讯控股" },
        { label: "Listed share", value: "0700.HK / 00700", note: "报价 / 港交所" },
        { label: "Graph line", value: "One share price", note: "一股股票的价格" }
      ],
      notes: [
        "Students should attach the graph to the correct listed share and source before interpreting it.",
        "Keep this as a fast ID check; the next part handles the misconception in detail."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      phases: ["One share price", "Information moves price", "Price affects judgement"],
      bullets: [
        "explain what one point on a stock-price graph represents",
        "explain why new information can move the price line",
        "calculate a graph-based price change and judge why price still matters"
      ],
      zhBullets: [
        "解释股价图上一个点代表什么",
        "解释新信息为什么会改变股价",
        "计算简单价格变化，并判断为什么价格仍然重要"
      ],
      notes: "The success test is whether students can say what the graph line measures, why it moves, and why high company figures still need a price judgement."
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "What does one share price mean?",
      zhTitle: "一股股价是什么意思？",
      notes: "This section teaches price meaning, ownership and the quick stock-code address check."
    },
    {
      type: "discussion",
      eyebrow: "Starter",
      title: "What exactly does HK$429.80 measure?",
      zhTitle: "429.80港元到底衡量什么？",
      visual: investmentPhotos.smartphoneMarketChart,
      question: "Write first: complete the analyst sentence. HK$429.80 is the ____ of ____ at ____. Do not use value, revenue or good.",
      zh: "先写：补全分析句。429.80港元是在____时____的____。不要用“价值”“收入”或“好投资”。",
      revealTitle: "Model sentence",
      answer: "HK$429.80 is the frozen monthly market price of one Tencent share at that graph point. It is not total company value, revenue or an investment judgement.",
      notes: [
        "Students write first, compare second. This is the central precision check: unit, price basis and time.",
        "Use HK$429.80 as the latest monthly close in the frozen classroom snapshot; do not imply it is a live price."
      ]
    },
    {
      type: "flow",
      eyebrow: "Key idea",
      title: "How can we define share price?",
      zhTitle: "怎样定义股价？",
      visual: investmentPhotos.businessChartsPaper,
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
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 1: share price",
      zhTitle: "检查1：股价",
      visual: investmentPhotos.tradingApps,
      question: "Which analyst sentence is precise?",
      zh: "哪一句足够精确，可以写进分析记录？",
      choices: [
        "Monthly close: HK$429.80 for one 0700.HK share.",
        "Whole Tencent business value: HK$429.80.",
        "Revenue per share: HK$429.80.",
        "Cheap because below an earlier high."
      ],
      answer: 0,
      explanation: "Correct: it names the unit, price basis and time. The misconception is turning a price point into company value, revenue or a cheap/expensive judgement.",
      explanationZh: "正确：它说明了单位、价格依据和时间。误区是把价格点当成公司价值、收入或贵贱判断。",
      notes: "If students choose B or C, re-anchor the price to one share. If they choose D, stress that comparison with a past high is not enough."
    },
    {
      type: "term",
      eyebrow: "Key idea",
      title: "Share",
      term: "Share",
      termZh: "股票 / 股份",
      definition: "A share is one unit of <span class=\"blank invReveal\" data-answer=\"ownership\" style=\"--blank-width:11ch\"><span class=\"invBlankText\">ownership</span></span> in a company.",
      definitionZh: "股票是公司所有权中的一个单位。",
      keyTerms: [
        { term: "Ownership", zh: "所有权", note: "The investor has a claim on part of the company." },
        { term: "Unit", zh: "单位", note: "One share is a small piece, not the whole company." }
      ],
      notes: "Students complete the Share line in Handout Exercise 4 before reveal."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Fill in the blanks",
      zhTitle: "填空",
      mode: "fillBlanks",
      items: [
        { prompt: "A share is one unit of __________ in a company.", answer: "ownership", zh: "股票代表公司所有权中的一个单位。" },
        { prompt: "Buying one share does not mean you own the __________ company.", answer: "whole", zh: "买一股不等于拥有整家公司。" }
      ],
      notes: "Students write the Handout Exercise 4 ownership blanks first. Click to reveal each answer before introducing shareholder."
    },
    {
      type: "term",
      eyebrow: "Key idea",
      title: "Shareholder",
      term: "Shareholder",
      termZh: "股东",
      definition: "A shareholder is a person or <span class=\"blank invReveal\" data-answer=\"institution\" style=\"--blank-width:13ch\"><span class=\"invBlankText\">institution</span></span> that owns one or more shares.",
      definitionZh: "股东是拥有一股或多股股票的个人或机构。",
      keyTerms: [
        { term: "Person", zh: "个人", note: "For example, a household investor." },
        { term: "Institution", zh: "机构", note: "For example, a fund, pension scheme or company." }
      ],
      notes: "Students complete the Shareholder line in Handout Exercise 4 before reveal."
    },
    {
      type: "discussion",
      eyebrow: "Discuss",
      title: "What claim does one share give?",
      zhTitle: "一股到底给投资者什么权利主张？",
      visual: investmentPhotos.shareholderMeeting,
      question: "1 share vs 100 million: write one shared ownership claim and one influence claim only the fund can make.",
      zh: "一个学生拥有1股，一个基金拥有1亿股。写出两者都能提出的一项权利主张，再写出只有基金更可能拥有的一项影响力主张。",
      revealTitle: "Model sentence",
      answer: "Both are shareholders with an ownership claim. The fund has more influence because voting power and management attention depend on shareholding size.",
      notes: "Students write both claims before comparing. Use this as the short ownership-scale warning before the stock-code sidebar."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 2: share or shareholder?",
      zhTitle: "检查2：股票还是股东？",
      visual: investmentPhotos.investorMeetingReport,
      question: "Which label map is usable?",
      zh: "哪组标签能用？",
      choices: [
        "Unit: share. Owner: shareholder. Price: share price.",
        "Unit: shareholder. Owner: share. Price: revenue.",
        "Unit: company. Owner: ticker. Price: profit.",
        "Unit: revenue. Owner: customer. Price: control."
      ],
      answer: 0,
      explanation: "Correct: it separates the unit, the owner and the price. The misconception is mixing ownership language with price or revenue language.",
      explanationZh: "正确：它区分了单位、所有者和价格。误区是把所有权、价格和收入混在一起。",
      notes: "Ask students to explain which label each wrong option confuses."
    },
    {
      type: "discussion",
      eyebrow: "Quick sidebar",
      title: "What do 0700.HK and 00700 help us find?",
      zhTitle: "0700.HK和00700帮助我们找到什么？",
      visual: investmentPhotos.financeChartWhiteboard,
      question: "Exercise 3: circle Tencent's codes. What do these codes help us find, and what bigger price question remains?",
      zh: "练习3：圈出腾讯代码。这些代码帮助我们找到什么？更重要的股价问题是什么？",
      revealTitle: "One-minute code check",
      answer: "The codes help us find Tencent's Hong Kong-listed share. The bigger question is what the quoted price means and whether it is attractive.",
      notes: "Keep this under one minute. Codes identify the address; analysis starts with price meaning and price judgement."
    },
    {
      type: "term",
      eyebrow: "Key idea",
      title: "Share price",
      term: "Share price",
      termZh: "股价",
      definition: "A share price is the <span class=\"blank invReveal\" data-answer=\"market price\" style=\"--blank-width:13ch\"><span class=\"invBlankText\">market price</span></span> of one share at a specific time.",
      definitionZh: "股价是在特定时间一股股票的市场价格。",
      keyTerms: [
        { term: "Market price", zh: "市场价格", note: "The price buyers and sellers form in the market." },
        { term: "Specific time", zh: "特定时间", note: "The lesson uses a frozen monthly close, not a live quote." }
      ],
      notes: "Students complete the Share price line in Handout Exercise 4 before reveal."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Exercise 4: share price",
      zhTitle: "练习4：股价",
      mode: "fillBlanks",
      items: [
        { prompt: "Share price = market price of __________ share.", answer: "one", zh: "股价是一股股票的市场价格。" },
        { prompt: "It is measured at a specific __________.", answer: "time", zh: "股价对应一个特定时间。" },
        { prompt: "It does not prove the share is cheap, safe or a good __________.", answer: "investment", zh: "股价本身不能证明便宜、安全或是好投资。" }
      ],
      notes: "This is the main price-definition check. Students should write the full sentence in Handout Exercise 4."
    },
    {
      type: "discussion",
      eyebrow: "Warning",
      title: "Does a higher share price mean a bigger company?",
      zhTitle: "股价更高就代表公司更大吗？",
      visual: investmentPhotos.marketScreen,
      question: "Company A has a higher share price than Company B. Does that alone prove Company A is worth more in total?",
      zh: "A公司的股价高于B公司。仅凭这一点能证明A公司的总价值更高吗？",
      revealTitle: "Market-cap warning",
      answer: "No. Total company value depends on share price and the number of shares. Share price alone does not show market capitalisation.",
      notes: "This prevents students from treating one-share price as total company value. Do not teach a market-cap calculation yet."
    },
    {
      type: "section",
      eyebrow: "Part 2",
      part: "2",
      title: "Why does the price line move?",
      zhTitle: "股价线为什么会变化？",
      notes: "Students read FY2025 data as possible information, then connect information to expectations and movements on the frozen Tencent price graph."
    },
    {
      type: "dataSnapshot",
      eyebrow: "Data Snapshot",
      title: "What could move this line?",
      zhTitle: "什么可能推动这条线变化？",
      visual: investmentPhotos.tencentBinhaiTowers,
      sourceStamp: "Tencent FY2025 results | RMB billions | snapshot date 26 Jun 2026",
      focusMetrics: [
        { label: "Revenue", value: "RMB751.8bn" },
        { label: "Gross profit", value: "RMB422.6bn" },
        { label: "Gross margin", value: "56%" }
      ],
      task: "Exercise 5: mark each figure as information, not judgement.",
      taskZh: "练习5：把每个数据当作信息，而不是最终判断。",
      note: "Investors can react when new information changes expected future profit or risk.",
      noteZh: "当新信息改变未来利润或风险预期时，投资者可能会反应。",
      notes: "Keep this slide to three headline figures only, then ask which figure might help explain a change in the price line."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Exercise 5: evidence is not judgement",
      zhTitle: "练习5：证据不等于判断",
      mode: "fillBlanks",
      items: [
        { prompt: "High revenue shows large __________ before costs are deducted.", answer: "sales", zh: "营业收入说明销售规模。" },
        { prompt: "Gross profit is useful, but future __________ can still change.", answer: "expectations", zh: "毛利润有用，但未来预期仍会变化。" },
        { prompt: "A figure is evidence, not a complete investment __________.", answer: "judgement", zh: "数据是证据，不是完整投资判断。" }
      ],
      notes: "Students correct the wrong claim 'high revenue proves a good investment' before reveal."
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
      notes: "Students complete the market-price and expectations lines in Handout Exercise 4. This prepares the price-line movement flow."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Which graph point is the base?",
      zhTitle: "哪个图表点是基数？",
      visual: investmentPhotos.stockReportCalculator,
      notes: [
        "Observation question: which graph point should be the base before calculating a percentage change?",
        "Bridge: percentage price change compares the change with the old price. Students set up the calculation in Handout Exercise 6."
      ]
    },
    {
      type: "calculationDesk",
      eyebrow: "Calculation Desk",
      title: "How is price change calculated?",
      zhTitle: "怎样计算价格变化？",
      visual: investmentPhotos.stockReportCalculator,
      formula: "percentage change = (new price - old price) / old price x 100",
      rows: [
        { label: "Old price", value: "HK$663.00", zh: "旧价格：基数" },
        { label: "New price", value: "HK$429.80", zh: "新价格：比较点" },
        { label: "Change", value: "-HK$233.20", zh: "429.80 - 663.00" },
        { label: "Denominator", value: "HK$663.00", zh: "用旧价格作分母" },
        { label: "Result", value: "about -35%", zh: "约为下跌35%" }
      ],
      worked: "HK$195.27 to HK$663.00: change = HK$467.73; percentage change = 467.73 / 195.27 x 100, about 240%.",
      workedZh: "旧价格是基数：467.73 / 195.27 x 100 ≈ 240%。",
      answer: "Model sentence: Tencent's price fell by about 35% from the old graph point to the latest monthly close.",
      notes: "Keep this slide to formula plus the stable row layout. Students do the high-to-latest move in Handout Exercise 6."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Exercise 6: calculate the price change",
      zhTitle: "练习6：计算价格变化",
      mode: "fillBlanks",
      items: [
        { prompt: "From HK$663.00 to HK$429.80, the change is HK$__________.", answer: "-233.20", zh: "先找出价格变化：429.80 - 663.00。" },
        { prompt: "The denominator is the __________ graph point, HK$663.00.", answer: "old", zh: "分母是旧价格，而不是新价格。" },
        { prompt: "The percentage change is about __________%.", answer: "-35", zh: "再把变化额除以原价并乘以100。" }
      ],
      notes: "This catches students who divide by the new price or write the money change as the percent change."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 3: which price is the base?",
      zhTitle: "检查3：哪个价格是基数？",
      visual: investmentPhotos.tabletFinancialChart,
      question: "Tencent's graph falls from HK$663.00 to HK$429.80. What is the approximate percentage change?",
      zh: "腾讯图表从663.00港元跌至429.80港元。大约百分比变化是多少？",
      choices: [
        "-35%",
        "-54%",
        "+35%",
        "-233%"
      ],
      answer: 0,
      explanation: "Correct: divide the price change by the old price. The common mistake is using the new price as the base.",
      explanationZh: "正确：用价格变化除以旧价格。常见错误是把新价格当作基数。",
      notes: "If many choose -54% or -233%, re-teach old price as the base and percent as relative change."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "What can change investor expectations?",
      zhTitle: "什么会改变投资者预期？",
      visual: investmentPhotos.modernTradingDesk,
      notes: [
        "Observation question: why might investors react before a company's profit has actually changed?",
        "Bridge: information changes expectations, and expectations can change buying and selling pressure. Students use this to write the Exercise 7 sentence."
      ]
    },
    {
      type: "flow",
      eyebrow: "Key idea",
      title: "Why can price move?",
      visual: investmentPhotos.investorChartScreens,
      zhTitle: "信息会改变买卖压力和股价",
      flowStyle: "sequence",
      steps: [
        { text: "New __________ arrives.", answer: "information", zh: "投资者收到新的信息。" },
        { text: "Future-profit __________ change.", answer: "expectations", zh: "他们改变对未来利润的预期。" },
        { text: "Positive news can bring more __________.", answer: "buyers", zh: "正面消息可能带来更多买方。" },
        { text: "More buyers can push the market price __________.", answer: "up", zh: "买方增加可能推动市场价格上涨。" }
      ],
      notes: "Show the whole positive sequence, but make students predict each key link before reveal. The next slide gives the negative mirror image."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Negative information example",
      zhTitle: "负面信息例子",
      mode: "fillBlanks",
      items: [
        { prompt: "Negative information can lower expected future __________.", answer: "profit", zh: "负面信息会降低预期未来利润。" },
        { prompt: "More __________ may want to leave the share.", answer: "sellers", zh: "更多卖方可能想卖出股票。" },
        { prompt: "The next point on the price line may __________.", answer: "fall", zh: "价格线上的下一个点可能下跌。" }
      ],
      notes: "Use this quick check to balance the positive-information flow before students write their own sentence."
    },
    {
      type: "peerTask",
      eyebrow: "Pair task",
      title: "Exercise 7: explain a price movement",
      zhTitle: "练习7：解释股价变化",
      visual: investmentPhotos.investorChartScreens,
      steps: [
        { text: "Write first using: information, expectations, buyers or sellers, price.", zh: "先写：使用信息、预期、买方或卖方、价格。" },
        { text: "Compare the causal order with a partner.", zh: "与同伴比较因果顺序。" },
        { text: "Improve one sentence so every keyword is used correctly.", zh: "修改一句话，确保关键词使用正确。" }
      ],
      sampleAnswer: "If investors receive positive information, expectations about future profit may rise, more buyers may want the share, and the price can rise.",
      sampleAnswerZh: "如果投资者收到正面信息，对未来利润的预期可能上升，更多买方可能想买这只股票，价格就可能上涨。",
      notes: "Students need this sentence-level explanation in Handout Exercise 7 before moving to judgement."
    },
    {
      type: "section",
      eyebrow: "Part 3",
      part: "3",
      title: "When is the price attractive?",
      zhTitle: "什么时候价格有吸引力？",
      notes: "This section separates good businesses from good investments."
    },
    {
      type: "discussion",
      eyebrow: "Discuss",
      title: "Can a good company be a poor investment?",
      zhTitle: "好公司也可能不是好投资吗？",
      visual: investmentPhotos.annualReports,
      question: "Tencent has large revenue and profit. What else must an investor compare before saying the share is attractive?",
      zh: "腾讯有很高的收入和利润。投资者还必须比较什么，才能判断股票是否有吸引力？",
      revealTitle: "Judgement rule",
      answer: "A good investment judgement compares business evidence, future expectations, risk and the price paid. A good company can still be overpriced.",
      notes: "Use this to open Part 3 before the evidence board."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "What evidence do we need before judging?",
      zhTitle: "判断前需要哪些证据？",
      visual: investmentPhotos.financialAnalysisDesk,
      notes: [
        "Observation question: what evidence is visible here besides a price chart?",
        "Bridge: a good investment judgement needs business performance, expectations, risk and the price paid."
      ]
    },
    {
      type: "analystBoard",
      eyebrow: "Analyst Board",
      title: "What evidence belongs in the judgement?",
      zhTitle: "判断中应包含哪些证据？",
      visual: investmentPhotos.financialAnalysisDesk,
      revealBlocks: true,
      blocks: [
        {
          label: "Company performance",
          title: "What does the business do?",
          body: "Revenue and gross profit show business scale, but they do not prove the share is attractive.",
          zh: "公司业绩：业务规模和利润情况。"
        },
        {
          label: "Expectations",
          title: "What does the market expect next?",
          body: "The price can move because investors react to future profit, not only last year's data.",
          zh: "市场预期：投资者对未来的看法。"
        },
        {
          label: "Price paid",
          title: "What are you paying?",
          body: "A strong company can be a weak investment if the price already assumes excellent results.",
          zh: "买入价格：价格太高会降低投资吸引力。"
        }
      ],
      prompt: "Choose the missing block in this claim: 'Tencent's graph went up, so it must be a good investment.'",
      promptZh: "判断这句话遗漏了哪一块：“腾讯图表上涨，所以一定是好投资。”",
      notes: "Show only the block labels and questions first. Students choose the missing block, then reveal the three bodies one by one and finally reveal the prompt."
    },
    {
      type: "riskRegister",
      eyebrow: "Risk Register",
      title: "Rank one Tencent risk",
      zhTitle: "给一个腾讯风险排序",
      visual: investmentPhotos.shippingPort,
      revealEffects: true,
      effectLabel: "Effect link",
      table: [
        ["Risk", "Investor question", "Likely effect"],
        ["High expectations", "Has the price already assumed strong growth?", "Good results may disappoint if investors expected even more."],
        ["Regulation", "Could platform or gaming rules reduce future profit?", "Lower expected future profit can reduce the price investors pay."],
        ["Competition", "Could rivals weaken games, ads or cloud margins?", "Lower margins or slower growth can weaken the investment case."],
        ["Currency and market mood", "Could exchange rates or sentiment change returns?", "Some investors may earn less even if the business remains strong."]
      ],
      prompt: "Rank one risk, then complete: risk -> future profit or expectations -> next price point.",
      promptZh: "选择一个风险排序，并完成：风险 -> 未来利润或预期 -> 下一个股价点。",
      answer: "Model sentence: Regulation risk could lower expected future profit, so investors may pay a lower price.",
      notes: "Reveal the effect links only after students have chosen and ranked one risk."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 4: overpriced shares",
      zhTitle: "检查4：股票会被高估吗？",
      visual: investmentPhotos.hkexHall,
      question: "Why can a famous company still be a poor investment?",
      zh: "为什么知名公司仍可能不是好投资？",
      choices: [
        "Famous company = safe investment.",
        "Price may be too high for profit and risk.",
        "High revenue means cheap share.",
        "Lower price always means better."
      ],
      answer: 1,
      explanation: "Correct: judgement compares expected profit and risk with the price paid. Fame and revenue are not enough.",
      explanationZh: "正确：投资判断要比较预期利润、风险和买入价格。知名度和收入还不够。",
      notes: "Use this before the 4-mark question. The wrong options are plausible student shortcuts."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "What evidence should your answer use?",
      zhTitle: "答案应该使用哪些证据？",
      visual: investmentPhotos.businessChartsPaper,
      notes: [
        "Observation question: what evidence would you select before answering the 4-mark question?",
        "Bridge: the exam answer needs two developed points, not just a statement that revenue is high."
      ]
    },
    {
      type: "exam",
      eyebrow: "Exam practice",
      title: "Explain why high revenue does not prove that a share is a good investment. [4]",
      zhTitle: "解释为什么高收入不能证明一股股票是好投资。[4]",
      visual: investmentPhotos.businessChartsPaper,
      revealKeywords: true,
      prompt: "Write a two-point plan: revenue/profit limit, then price/risk/expectations limit. Underline evidence and limitation.",
      zh: "写两个要点：收入/利润限制，再写价格/风险/预期限制。划出证据和限制。",
      keywords: ["revenue", "profit", "risk", "price paid", "expectations", "future"],
      notes: "Give 4 minutes. Require two because-cause-effect chains and at least one Tencent figure or graph point from the handout."
    },
    {
      type: "modelAnswer",
      eyebrow: "Model answer",
      title: "Explain why high revenue does not prove that a share is a good investment. [4]",
      zhTitle: "示范答案：高收入不等于好投资",
      visual: investmentPhotos.financialAnalysisDesk,
      cueLabel: "Compare your answer",
      cueText: "Underline one piece of evidence, one limitation, and one price/risk judgement link.",
      paragraphs: [
        "Tencent's <mark>revenue</mark> of RMB751.8bn shows very large sales before costs are deducted, but revenue alone does not prove strong <mark>profit</mark> after all costs.",
        "A share can also be unattractive if the <mark>price paid</mark> is already too high. Investors compare expected future profit and <mark>risk</mark> with the current share price."
      ],
      markNote: "4 marks: two developed limitations, supported by evidence or clear price/risk logic.",
      notes: "Ask students to compare the model answer with the handout, then underline two developed points: revenue vs profit, and price/risk/expectations."
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
