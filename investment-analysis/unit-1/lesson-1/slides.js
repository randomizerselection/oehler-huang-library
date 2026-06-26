window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit 1 Lesson 1: What is a share?",
    sources: [
      {
        label: "Tencent investor relations",
        note: "Used for company listing context and official investor-material links.",
        date: "Accessed 26 June 2026",
        url: "https://www.tencent.com/en-us/investors.html"
      },
      {
        label: "Tencent 2025 annual and fourth quarter results",
        note: "Used for FY2025 revenue, gross profit and gross-margin snapshot: revenue RMB751.8 billion, gross profit RMB422.6 billion, gross margin 56%.",
        date: "Published 18 March 2026; accessed 26 June 2026",
        url: "https://static.www.tencent.com/uploads/2026/03/18/e6a646796d0d869acc76271c9ee1a6a5.pdf"
      }
    ]
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Lesson overview",
      title: "What is a share?",
      zhTitle: "什么是股票？",
      subtitle: "Unit 1 Lesson 1",
      kicker: "What does one small ownership claim actually mean?",
      visual: investmentPhotos.hkexHall,
      notes: [
        "Use this as the formal title slide before starting the market brief.",
        "Set expectations: this lesson teaches ownership, identification, price movement and careful judgement, not a recommendation."
      ]
    },
    {
      type: "hero",
      eyebrow: "Market Brief",
      title: "What do you own when you buy one share?",
      subtitle: "Lesson 1 starts with a concrete listed company: Tencent Holdings, stock code 0700.HK.",
      visual: investmentPhotos.hkexHall,
      ticker: "0700.HK",
      question: "If you buy one Tencent share, do you own Tencent?",
      questionZh: "如果你买一股腾讯股票，你是否拥有腾讯这家公司？",
      sourceStamp: "Tencent snapshot | accessed 26 Jun 2026",
      metrics: [
        { label: "Company", value: "Tencent", note: "腾讯控股" },
        { label: "Listing", value: "HKEX", note: "香港交易所" },
        { label: "Stock code", value: "0700.HK", note: "股票代码" },
        { label: "Data type", value: "FY2025", note: "年度业绩" }
      ],
      notes: [
        "Start with ownership, not price. Ask students to vote yes/no before showing the careful answer.",
        "Emphasise that the lesson is not investment advice; the company is used as a real data example."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Starter",
      title: "One share, one claim",
      visual: investmentPhotos.stockCertificate,
      question: "A student owns one Tencent share. Write one thing the student owns and one thing the student does not own.",
      zh: "一名学生拥有一股腾讯股票。写出他拥有的一样东西，以及他不拥有的一样东西。",
      revealTitle: "Useful distinction",
      answer: "The student owns a very small ownership claim. The student does not own Tencent's offices, games, managers, or bank account personally.",
      notes: "Give students 60 seconds on paper, then take two answers. This prepares the share/shareholder definitions."
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      bullets: [
        "explain that a share is part ownership of a company",
        "read company, exchange, stock code and share price in a stock snapshot",
        "explain why a good company is not automatically a good investment"
      ],
      zhBullets: [
        "解释股票代表公司的一部分所有权",
        "读懂公司、交易所、股票代码和股价等信息",
        "解释为什么好公司不一定等于好投资"
      ],
      notes: "Keep this short. The success test is whether students can separate company, share and price."
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "Company, share, shareholder",
      zhTitle: "公司、股票与股东",
      prompt: "First we separate the business itself from one small ownership unit.",
      parts: [
        { label: "Company, share, shareholder", current: true },
        { label: "Finding the right listed company" },
        { label: "Reading a price move" },
        { label: "Good company or good investment?" }
      ],
      notes: "Use this as a map: students are not yet judging whether Tencent is attractive."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "A listed company has many owners",
      zhTitle: "上市公司有许多所有者",
      visual: investmentPhotos.hkexHall,
      notes: [
        "Observation question: what does the board show that a private family business would not show?",
        "Bridge: listed shares can be bought and sold by many investors, so ownership is split into many small units."
      ]
    },
    {
      type: "term",
      eyebrow: "Key idea",
      title: "Share",
      visual: investmentPhotos.stockCertificate,
      term: "Share",
      termZh: "股票 / 股份",
      definition: "A <span class=\"blank invReveal\">share</span> is one unit of ownership in a company.",
      definitionZh: "股票是公司所有权中的一个单位。",
      keyTerms: [
        { term: "Ownership", zh: "所有权", note: "The investor has a claim on part of the company." },
        { term: "Unit", zh: "单位", note: "One share is only a small piece, not the whole company." }
      ],
      notes: "Make students say the full sentence aloud after the blank is revealed."
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
      notes: "Students write first. Click to reveal each answer."
    },
    {
      type: "term",
      eyebrow: "Key idea",
      title: "Shareholder",
      visual: investmentPhotos.shareholderMeeting,
      term: "Shareholder",
      termZh: "股东",
      definition: "A <span class=\"blank invReveal\">shareholder</span> is a person or institution that owns one or more shares in a company.",
      definitionZh: "股东是拥有公司一股或多股股票的个人或机构。",
      keyTerms: [
        { term: "Person", zh: "个人", note: "For example, a household investor." },
        { term: "Institution", zh: "机构", note: "For example, a fund, pension scheme or company." }
      ],
      notes: "Point out that shareholders can be people or institutions; Grade 9 students often assume only individuals."
    },
    {
      type: "discussion",
      eyebrow: "Discuss",
      title: "Does a shareholder control the company?",
      visual: investmentPhotos.shareholderMeeting,
      question: "One student owns 1 share. A large fund owns 100 million shares. Which shareholder is more likely to influence company decisions? Why?",
      zh: "一个学生拥有1股，一个大型基金拥有1亿股。哪个股东更可能影响公司决策？为什么？",
      revealTitle: "Model direction",
      answer: "The large fund is more likely to influence decisions because voting power and attention from managers usually depend on how many shares are owned.",
      notes: "Keep this conceptual. Do not teach detailed voting rights yet."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Share or shareholder?",
      visual: investmentPhotos.stockCertificate,
      question: "Which statement is correct?",
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
      type: "section",
      eyebrow: "Part 2",
      part: "2",
      title: "Finding the right listed company",
      zhTitle: "找到正确的上市公司",
      visual: investmentPhotos.appleStore,
      prompt: "Next we read the identification information in a stock snapshot.",
      parts: [
        { label: "Company, share, shareholder" },
        { label: "Finding the right listed company", current: true },
        { label: "Reading a price move" },
        { label: "Good company or good investment?" }
      ],
      notes: "The point is identification, not valuation."
    },
    {
      type: "dataSnapshot",
      eyebrow: "Data Snapshot",
      title: "Tencent: frozen company snapshot",
      subtitle: "Real company data are useful only if the date and source are clear.",
      visual: investmentPhotos.tencentTowers,
      sourceStamp: "Tencent FY2025 results | RMB billions | snapshot date 26 Jun 2026",
      focusMetrics: [
        { label: "Revenue", value: "RMB751.8bn" },
        { label: "Gross profit", value: "RMB422.6bn" },
        { label: "Gross margin", value: "56%" }
      ],
      table: [
        ["Item", "What it tells an investor", "Snapshot"],
        ["Company", "The business being analysed", "Tencent Holdings Limited"],
        ["Exchange", "The market where this share is listed", "Hong Kong Stock Exchange"],
        ["Stock code", "The identifier investors use to find the share", "0700.HK"],
        ["Revenue", "Total sales before costs are deducted", "RMB751.8bn"],
        ["Gross profit", "Revenue left after direct costs", "RMB422.6bn"],
        ["Gross margin", "Gross profit as a percentage of revenue", "56%"]
      ],
      chartTitle: "Scale of FY2025 figures",
      bars: [
        { label: "Revenue", value: "751.8", width: 100, tone: "blue" },
        { label: "Gross profit", value: "422.6", width: 56, tone: "green" },
        { label: "Direct costs implied", value: "329.2", width: 44, tone: "amber" }
      ],
      note: "The snapshot identifies the company and its latest annual figures. It still does not say whether the share is cheap or expensive.",
      notes: "Ask students to find the stock code first, then one performance number, then the source/date stamp."
    },
    {
      type: "term",
      eyebrow: "Key idea",
      title: "Stock code",
      visual: investmentPhotos.marketScreen,
      term: "Stock code",
      termZh: "股票代码",
      definition: "A <span class=\"blank invReveal\">stock code</span> is the short market identifier used to find a listed company's shares.",
      definitionZh: "股票代码是在市场上寻找上市公司股票的简短标识。",
      keyTerms: [
        { term: "0700.HK", zh: "腾讯在港股的代码", note: "The suffix helps show the market." },
        { term: "Identifier", zh: "标识", note: "A code helps you find the share; it does not judge the investment." }
      ],
      notes: "Contrast with company name: codes reduce confusion when companies have similar names."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Fill in the blanks",
      mode: "fillBlanks",
      items: [
        { prompt: "A stock code helps investors __________ the correct listed company.", answer: "identify", zh: "股票代码帮助投资者识别正确的上市公司。" },
        { prompt: "The code 0700.HK tells us the share is connected to the __________ market.", answer: "Hong Kong", zh: "0700.HK 表明该股票与香港市场有关。" }
      ],
      notes: "Accept HK or Hong Kong verbally, but reveal the full wording."
    },
    {
      type: "discussion",
      eyebrow: "Discuss",
      title: "What the code cannot tell you",
      visual: investmentPhotos.iphoneDisplay,
      question: "Does 0700.HK tell us whether Tencent shares are cheap, expensive, risky or safe?",
      zh: "0700.HK 能不能告诉我们腾讯股票便宜、昂贵、有风险或安全？",
      revealTitle: "Boundary",
      answer: "No. A stock code identifies the share. To judge the investment, investors need evidence about performance, expectations, risk and price.",
      notes: "This prepares the final objective: identification is not analysis."
    },
    {
      type: "section",
      eyebrow: "Part 3",
      part: "3",
      title: "Reading a price move",
      zhTitle: "读懂股价变化",
      prompt: "Now we read a simple share-price change as a percentage.",
      parts: [
        { label: "Company, share, shareholder" },
        { label: "Finding the right listed company" },
        { label: "Reading a price move", current: true },
        { label: "Good company or good investment?" }
      ],
      notes: "Use simple invented prices here. The lesson is the percentage method, not Tencent's current market price."
    },
    {
      type: "term",
      eyebrow: "Key idea",
      title: "Share price",
      visual: investmentPhotos.tradingApps,
      term: "Share price",
      termZh: "股价",
      definition: "A <span class=\"blank invReveal\">share price</span> is the market price of one share at a specific time.",
      definitionZh: "股价是在特定时间一股股票的市场价格。",
      keyTerms: [
        { term: "Market price", zh: "市场价格", note: "It is formed by buyers and sellers in the market." },
        { term: "Specific time", zh: "特定时间", note: "Prices can change during the day." }
      ],
      notes: "Stress the time point. Students often speak as if a share has one permanent price."
    },
    {
      type: "calculationDesk",
      eyebrow: "Calculation Desk",
      title: "Formula: percentage price change",
      visual: investmentPhotos.marketScreen,
      formula: "percentage change = (new price - old price) / old price x 100",
      worked: "If a share rises from HK$400 to HK$420: (420 - 400) / 400 x 100 = 5%.",
      workedZh: "如果股价从400港元升至420港元，涨幅为5%。",
      prompt: "A share rises from HK$50 to HK$55. Calculate the percentage change.",
      promptZh: "一只股票从50港元升至55港元。计算百分比变化。",
      answer: "(55 - 50) / 50 x 100 = 10%.",
      notes: "Students should write the substitution, not just the answer. Reveal answer after they try."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Fill in the blanks",
      mode: "fillBlanks",
      items: [
        { prompt: "If a share rises from HK$50 to HK$55, the increase is HK$__________.", answer: "5", zh: "先找出价格增加了多少。" },
        { prompt: "HK$5 divided by HK$50, times 100, equals __________%.", answer: "10", zh: "再把增加额除以原价并乘以100。" }
      ],
      notes: "This catches students who divide by the new price."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Which denominator?",
      visual: investmentPhotos.tradingApps,
      question: "A share price falls from HK$80 to HK$72. What is the percentage change?",
      zh: "股价从80港元跌至72港元。百分比变化是多少？",
      choices: [
        "-8%",
        "-10%",
        "-11.1%",
        "+10%"
      ],
      answer: 1,
      explanation: "(72 - 80) / 80 x 100 = -10%. The old price is the denominator.",
      notes: "This is the main calculation hinge. If many choose -11.1%, re-teach old price as the base."
    },
    {
      type: "flow",
      eyebrow: "Key idea",
      title: "Why share prices move",
      visual: investmentPhotos.marketScreen,
      zhTitle: "股价为什么变化",
      mode: "fillBlanks",
      steps: [
        { text: "Investors receive new __________.", answer: "information", zh: "投资者收到新的信息。" },
        { text: "They change expectations about future __________.", answer: "profit", zh: "他们改变对未来利润的预期。" },
        { text: "More buyers than sellers can push the price __________.", answer: "up", zh: "买方多于卖方可能推动价格上涨。" },
        { text: "More sellers than buyers can push the price __________.", answer: "down", zh: "卖方多于买方可能推动价格下跌。" }
      ],
      notes: "This is a basic expectations chain. Do not introduce efficient-market theory."
    },
    {
      type: "peerTask",
      eyebrow: "Pair task",
      title: "Complete the missing sentence",
      visual: investmentPhotos.tradingApps,
      steps: [
        "With your partner, complete the sentence in your notebook.",
        "Use the words: information, expectations, buyers, price.",
        "Prepare one sentence explaining why a price can rise even before profits actually rise."
      ],
      sampleAnswer: "If investors receive positive information, their expectations about future profit may rise, so more buyers want the share and the price can rise.",
      notes: "Students need a sentence-level explanation before exam practice."
    },
    {
      type: "section",
      eyebrow: "Part 4",
      part: "4",
      title: "Good company or good investment?",
      zhTitle: "好公司还是好投资？",
      visual: investmentPhotos.hsbcBuilding,
      prompt: "Finally we separate business quality from the price paid for the share.",
      parts: [
        { label: "Company, share, shareholder" },
        { label: "Finding the right listed company" },
        { label: "Reading a price move" },
        { label: "Good company or good investment?", current: true }
      ],
      notes: "This is the judgement frame for the course."
    },
    {
      type: "analystBoard",
      eyebrow: "Analyst Board",
      title: "Three evidence blocks before judgement",
      visual: investmentPhotos.annualReports,
      blocks: [
        {
          label: "Company performance",
          title: "What does the business do?",
          body: "Tencent's FY2025 snapshot shows very large revenue and gross profit.",
          zh: "公司业绩：业务规模和利润情况。"
        },
        {
          label: "Expectations",
          title: "What does the market expect next?",
          body: "A share price often reflects what investors expect in the future, not only what happened last year.",
          zh: "市场预期：投资者对未来的看法。"
        },
        {
          label: "Price paid",
          title: "What are you paying?",
          body: "Even a strong company can be a weak investment if the share price already assumes excellent results.",
          zh: "买入价格：价格太高会降低投资吸引力。"
        },
        {
          label: "Risk",
          title: "What could go wrong?",
          body: "Competition, regulation and changing demand can reduce future profits.",
          zh: "风险：未来利润可能低于预期。"
        }
      ],
      prompt: "Which block is missing when someone says 'high revenue means a good investment'?",
      notes: "Students should identify price paid and risk as missing evidence."
    },
    {
      type: "riskRegister",
      eyebrow: "Risk Register",
      title: "A good company can still be a risky share",
      visual: investmentPhotos.shippingPort,
      table: [
        ["Risk", "Investor question", "Likely effect"],
        ["High expectations", "Has the price already assumed strong growth?", "Even good results may disappoint investors"],
        ["Regulation", "Could rules reduce future profit?", "Lower expected future cash flows"],
        ["Competition", "Can rivals weaken the business model?", "Lower margins or slower growth"],
        ["Currency and market risk", "Could exchange rates or market sentiment change?", "Lower return for some investors"]
      ],
      prompt: "Which risk is most important for Tencent in this lesson snapshot?",
      answer: "A strong answer names one risk and links it to future profit, investor expectations or the price paid.",
      notes: "This is not a recommendation. It trains risk-evidence-effect language."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Good company = good investment?",
      visual: investmentPhotos.annualReports,
      question: "Which answer best explains why a profitable company may still be a poor investment?",
      zh: "哪一个答案最能解释为什么盈利公司仍可能不是好投资？",
      choices: [
        "Profit is always bad for shareholders.",
        "The share price may already be too high compared with expected future profit.",
        "Stock codes make companies impossible to identify.",
        "Revenue and profit are the same thing."
      ],
      answer: 1,
      explanation: "Investment judgement compares future profit and risk with the price paid for the share.",
      notes: "Use this before the 4-mark question. Students need the core judgement sentence."
    },
    {
      type: "exam",
      eyebrow: "Exam practice",
      title: "Explain why high revenue does not prove that a share is a good investment. [4]",
      visual: investmentPhotos.tencentTowers,
      prompt: "Write two developed points. Use the Tencent snapshot if it helps.",
      zh: "写出两个有发展的观点。可以使用腾讯数据快照。",
      keywords: ["revenue", "profit", "risk", "price paid", "expectations", "future"],
      notes: "Give 4 minutes. Require two because-cause-effect chains."
    },
    {
      type: "modelAnswer",
      eyebrow: "Model answer",
      title: "Explain why high revenue does not prove that a share is a good investment. [4]",
      visual: investmentPhotos.annualReports,
      paragraphs: [
        "<mark>Revenue</mark> only shows the value of sales before costs are deducted. A company may have high revenue but weaker <mark>profit</mark> if its costs are also high.",
        "A share can also be unattractive if the <mark>price paid</mark> is already too high. Investors compare expected future profit and <mark>risk</mark> with the current share price before judging whether it is a good investment."
      ],
      notes: "Ask students to underline two developed points: revenue vs profit, and price/risk/expectations."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Exit ticket",
      zhTitle: "离堂小测",
      mode: "fillBlanks",
      items: [
        { prompt: "A share is one unit of __________ in a company.", answer: "ownership", zh: "股票是公司所有权的一个单位。" },
        { prompt: "A stock code helps investors __________ the correct listed company.", answer: "identify", zh: "股票代码帮助投资者识别公司。" },
        { prompt: "A good company may be a poor investment if the share __________ is too high.", answer: "price", zh: "如果股价过高，好公司也可能不是好投资。" }
      ],
      notes: "Collect or cold-call. This is the lesson's minimum exit evidence."
    }
  ]
};
