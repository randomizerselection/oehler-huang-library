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
        note: "Used for FY2025 revenue, gross profit and gross-margin snapshot, and official listing context: HKEX 00700 (HKD Counter) / 80700 (RMB Counter).",
        date: "Published 18 March 2026; accessed 26 June 2026",
        url: "https://static.www.tencent.com/uploads/2026/03/18/e6a646796d0d869acc76271c9ee1a6a5.pdf"
      }
    ]
  },
  handout: {
    title: "Tencent analyst sheet",
    subtitle: "Unit 1 Lesson 1: What is a share?",
    description: "Use this sheet throughout the lesson. Complete each section before moving to the next judgement.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "A",
        title: "Tencent case file",
        instruction: "First identify the company, listing and source before judging anything.",
        blocks: [
          {
            type: "facts",
            items: [
              { label: "Company", value: "Tencent Holdings Limited" },
              { label: "Quote ticker", value: "0700.HK" },
              { label: "Official HKEX code", value: "00700 (HKD counter)" },
              { label: "Exchange", value: "Hong Kong Stock Exchange" },
              { label: "Source", value: "Tencent 2025 annual and fourth quarter results" },
              { label: "Published", value: "18 Mar 2026" },
              { label: "Accessed", value: "26 Jun 2026" }
            ]
          },
          {
            type: "prompts",
            prompts: [
              { label: "Identity check", prompt: "Circle the quote ticker and official HKEX code; underline the source date.", lines: 1 },
              { label: "Boundary", prompt: "What can a ticker or stock code prove, and what can it not prove?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "B",
        title: "Key terms and first checks",
        instruction: "Classify the decision first, then complete the ownership terms.",
        blocks: [
          {
            type: "cases",
            cases: [
              { label: "A", text: "Keep money in a bank account for next month.", answer: "Saving" },
              { label: "B", text: "Buy Tencent only after checking evidence and accepting risk.", answer: "Investing" },
              { label: "C", text: "Buy Tencent because a short video says it will jump tomorrow.", answer: "Speculating" },
              { label: "D", text: "Buy and sell Tencent shares several times this week.", answer: "Trading" }
            ]
          },
          {
            type: "terms",
            terms: [
              { label: "Saving", prompt: "Saving means keeping money __________ for later use.", answer: "safe" },
              { label: "Investing", prompt: "Investing means putting money into an asset with expected __________ and risk.", answer: "return" },
              { label: "Speculating", prompt: "Speculating means taking high risk mainly because you expect a __________ move.", answer: "price" },
              { label: "Trading", prompt: "Trading means frequent buying and selling over a __________ period.", answer: "shorter" },
              { label: "Share", prompt: "A share is one unit of __________ in a company.", answer: "ownership" },
              { label: "Shareholder", prompt: "A shareholder is a person or institution that owns one or more __________.", answer: "shares" },
              { label: "Share price", prompt: "A share price is the market price of one share at a specific __________.", answer: "time" }
            ]
          }
        ]
      },
      {
        label: "C",
        title: "What the Tencent data can show",
        instruction: "Use each figure first, then write the limitation yourself before the reveal.",
        blocks: [
          {
            type: "table",
            columns: ["Figure", "What it shows", "What it does not show"],
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
        title: "Price move and expectations",
        instruction: "Only calculate after the company and source are clear.",
        blocks: [
          {
            type: "calculation",
            formula: "percentage change = (new price - old price) / old price x 100",
            worked: "Tencent-style example: HK$400 to HK$420 = (420 - 400) / 400 x 100 = 5%.",
            task: "A Tencent-style price rises from HK$50 to HK$55. Calculate the percentage change.",
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
        title: "Good company or good investment?",
        instruction: "Use one Tencent figure and one limitation before writing.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Evidence", prompt: "Which Tencent figure will you use?", lines: 1 },
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
    sources: "Tencent data: 2025 annual and fourth quarter results, published 18 Mar 2026, accessed 26 Jun 2026. Educational use only; no personal investment recommendation."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Overview",
      title: "What is a share?",
      zhTitle: "什么是股票？",
      subtitle: "Unit 1 Lesson 1",
      kicker: "If you buy one Tencent share, what do you actually own?",
      visual: investmentPhotos.modernTradingDesk,
      notes: [
        "Use this as the formal title slide before starting the market brief.",
        "Set expectations: this lesson teaches ownership, identification, price movement and careful judgement, not a recommendation."
      ]
    },
    {
      type: "marketBrief",
      eyebrow: "Market Brief",
      title: "Start with the Tencent case file",
      subtitle: "Before any opinion, find the facts.",
      visual: investmentPhotos.tencentBinhaiTowers,
      ticker: "Handout A",
      question: "Open Section A. Circle each fact before it is revealed.",
      questionZh: "打开A部分。每个事实揭示前先圈出来。",
      sourceStamp: "Tencent snapshot | accessed 26 Jun 2026",
      revealMetricValues: true,
      metrics: [
        { label: "1. Company", value: "Tencent", note: "腾讯控股" },
        { label: "2. Codes", value: "0700.HK / 00700", note: "报价 / 港交所" },
        { label: "3. Source date", value: "18 Mar 2026", note: "来源日期" }
      ],
      notes: [
        "Give students the Tencent analyst sheet first. Reveal company, codes and source date one at a time only after they have located each item.",
        "Emphasise that the lesson is not investment advice; the company is used as a real data example."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      phases: ["Learn terms", "Use data", "Judge evidence"],
      bullets: [
        "define share, shareholder and share price accurately",
        "identify Tencent's company, code, source date and three figures",
        "write why high revenue alone does not prove a good investment"
      ],
      zhBullets: [
        "准确解释股票、股东和股价",
        "识别腾讯的公司、代码、来源日期和三项数据",
        "写出为什么高收入本身不能证明是好投资"
      ],
      notes: "Keep this short. The success test is whether students can define the ownership terms, locate the case-file evidence, and write one evidence-limitation judgement."
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "Why invest at all?",
      zhTitle: "为什么投资？",
      visual: investmentPhotos.financialAnalysisDesk,
      prompt: "First we separate saving, investing, speculating and trading before talking about shares.",
      parts: [
        { label: "Why invest at all?", current: true },
        { label: "Shares and company identity" },
        { label: "Data, price and expectations" },
        { label: "Good company or good investment?" }
      ],
      notes: "This section gives students the decision categories they need before the ownership and data parts."
    },
    {
      type: "discussion",
      eyebrow: "Before the first share",
      title: "Why not just keep money as cash?",
      visual: investmentPhotos.financialAnalysisDesk,
      question: "A: keep money for lunch next week. B: buy Tencent after checking evidence. C: buy because a short video says it will jump tomorrow. Which one is saving, investing or speculating? What clue tells you?",
      zh: "A：把钱留到下周午饭用。B：查证后买腾讯。C：因为短视频说明天会涨就买。哪一个是储蓄、投资或投机？线索是什么？",
      revealTitle: "Careful answer",
      answer: "A is saving because the money is kept safe for near use. B is investing because the decision uses evidence and accepts risk for expected return. C is speculating because the reason is mainly a hoped-for quick price move.",
      notes: [
        "Make every student choose before revealing. This turns the opening from a definition lecture into a diagnostic check.",
        "Keep the tone balanced: investing is not automatically better than saving, and prediction risk is real."
      ]
    },
    {
      type: "flow",
      eyebrow: "Key distinctions",
      title: "Saving, investing, speculating, trading",
      visual: investmentPhotos.stockReportCalculator,
      flowStyle: "categories",
      steps: [
        { text: "__________ keeps money safe for later use.", answer: "Saving", zh: "储蓄：把钱安全地留到以后使用。" },
        { text: "__________ puts money into an asset with expected return and risk.", answer: "Investing", zh: "投资：把钱投入有预期回报和风险的资产。" },
        { text: "__________ takes high risk mainly for an expected price move.", answer: "Speculating", zh: "投机：主要基于价格预期承担较高风险。" },
        { text: "__________ means frequent buying and selling over a shorter period.", answer: "Trading", zh: "交易：在较短时间内频繁买卖。" }
      ],
      notes: "Make students predict each term from the clue before revealing the blank. They then complete the Section B term blanks and use the following sort task as the formative check."
    },
    {
      type: "peerTask",
      eyebrow: "Pair task",
      title: "Sort the money decision",
      visual: investmentPhotos.businessChartsPaper,
      taskType: "sort",
      categories: ["Saving", "Investing", "Speculating", "Trading"],
      cases: [
        { label: "A", text: "Bank account for next month." },
        { label: "B", text: "Tencent after checking evidence." },
        { label: "C", text: "Short-video price jump." },
        { label: "D", text: "Buy and sell this week." }
      ],
      steps: [
        "Sort A-D alone first.",
        "Underline the clue in each case.",
        "Write: A careful investor..., but a speculator..."
      ],
      sampleAnswer: "A = saving because the money is kept safe for near use. B = investing because evidence is checked and risk is accepted. C = speculating because the decision depends on a quick hoped-for price jump. D = trading because buying and selling happens repeatedly in a short period.",
      notes: "This is a one-class sorting task, not a project. Require each student to copy one justified classification individually on the handout."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Investing or speculating?",
      visual: investmentPhotos.smartphoneMarketChart,
      question: "Handout Section B check: Which choice best describes investing?",
      zh: "哪一个最能描述投资？",
      choices: [
        "Keeping money safe for next week's lunch payment.",
        "Putting money into an asset with expected return and risk after checking evidence.",
        "Buying only because the price rose yesterday.",
        "Buying and selling quickly many times for small price moves."
      ],
      answer: 1,
      explanation: "Investing uses evidence and accepts risk for expected return. Saving, speculating and trading are different decisions.",
      notes: "If students choose C or D, pause and ask what evidence or time horizon is missing before moving past Section B."
    },
    {
      type: "section",
      eyebrow: "Part 2",
      part: "2",
      title: "Shares and company identity",
      zhTitle: "股票与公司身份",
      prompt: "Now we separate the business, one ownership unit, the owner and the market identifiers.",
      parts: [
        { label: "Why invest at all?" },
        { label: "Shares and company identity", current: true },
        { label: "Data, price and expectations" },
        { label: "Good company or good investment?" }
      ],
      notes: "Students should finish Section B ownership terms and Section A identity checks before any data or price judgement."
    },
    {
      type: "discussion",
      eyebrow: "Starter",
      title: "One share, one claim",
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
      title: "A listed company has many owners",
      zhTitle: "上市公司有许多所有者",
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
      title: "Shareholders can be people or institutions",
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
      title: "Does a shareholder control the company?",
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
      title: "Share or shareholder?",
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
      title: "First identify the company",
      visual: investmentPhotos.tencentBinhaiTowers,
      notes: [
        "Observation question: what real business is behind the quote ticker 0700.HK and HKEX code 00700?",
        "Bridge: before analysing a share price, students need the company name, market, code, source and date from Handout Section A."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Discuss",
      title: "A code points to one listing",
      visual: investmentPhotos.financeChartWhiteboard,
      question: "Look at 0700.HK and 00700 in Handout A. What can these codes identify, and what can they not prove about the investment?",
      zh: "看A部分的0700.HK和00700。这些代码能识别什么？又不能证明什么投资判断？",
      revealTitle: "Identifier, not judgement",
      answer: "The codes identify Tencent's listed shares on the Hong Kong market. They do not prove whether the share is cheap, expensive, safe or risky.",
      notes: "This replaces the second back-to-back visual pause with a commitment question. Students should write the boundary in Section A before reveal."
    },
    {
      type: "term",
      eyebrow: "Key idea",
      title: "Stock code",
      term: "Stock code",
      termZh: "股票代码",
      definition: "A stock code or quote ticker is a short <span class=\"blank invReveal\" data-answer=\"identifier\" style=\"--blank-width:11ch\"><span class=\"invBlankText\">identifier</span></span> used to find a listed company's shares.",
      definitionZh: "股票代码或报价代码是寻找上市公司股票的简短标识。",
      keyTerms: [
        { term: "0700.HK", zh: "课堂报价代码", note: "Market-data ticker used in class." },
        { term: "00700", zh: "腾讯港股代码", note: "Official HKEX HKD-counter code in Tencent's source." }
      ],
      notes: "Students complete the stock-code idea from Section A. Contrast with company name: codes reduce confusion when companies have similar names."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Fill in the blanks",
      mode: "fillBlanks",
      items: [
        { prompt: "A stock code or quote ticker helps investors __________ the correct listed company.", answer: "identify", zh: "股票代码或报价代码帮助投资者识别正确的上市公司。" },
        { prompt: "0700.HK and 00700 connect Tencent to the __________ market.", answer: "Hong Kong", zh: "0700.HK 和 00700 说明该股票与香港市场有关。" }
      ],
      notes: "Accept HK or Hong Kong verbally, but reveal the full wording. This is the Section A identification check."
    },
    {
      type: "discussion",
      eyebrow: "Discuss",
      title: "What the code cannot tell you",
      visual: investmentPhotos.financialAnalysisDesk,
      question: "Handout Section A check: Do 0700.HK or 00700 tell us whether Tencent shares are cheap, expensive, risky or safe?",
      zh: "0700.HK 或 00700 能不能告诉我们腾讯股票便宜、昂贵、有风险或安全？",
      revealTitle: "Boundary",
      answer: "No. A ticker or stock code identifies the share. To judge the investment, investors need evidence about performance, expectations, risk and price.",
      notes: "Students write what the code can and cannot prove in Section A. This prepares the final objective: identification is not analysis."
    },
    {
      type: "section",
      eyebrow: "Part 3",
      part: "3",
      title: "Data, price and expectations",
      zhTitle: "数据、价格与预期",
      visual: investmentPhotos.tabletFinancialChart,
      prompt: "Now we use Handout Sections C and D to read evidence, calculate one price move and explain why prices can change.",
      parts: [
        { label: "Why invest at all?" },
        { label: "Shares and company identity" },
        { label: "Data, price and expectations", current: true },
        { label: "Good company or good investment?" }
      ],
      notes: "Students first read the FY2025 data, then calculate one frozen Tencent-style price change, then explain the information-expectations-price chain."
    },
    {
      type: "dataSnapshot",
      eyebrow: "Data Snapshot",
      title: "Tencent: frozen company snapshot",
      visual: investmentPhotos.tencentBinhaiTowers,
      sourceStamp: "Tencent FY2025 results | RMB billions | snapshot date 26 Jun 2026",
      focusMetrics: [
        { label: "Revenue", value: "RMB751.8bn" },
        { label: "Gross profit", value: "RMB422.6bn" },
        { label: "Gross margin", value: "56%" }
      ],
      task: "Handout Section C: record what each figure shows. Leave the limitation column blank until you have written your own limit.",
      note: "Company, code, exchange, source and date are secure. Now read the performance figures.",
      notes: "Students have already checked company/code/source in Section A. Keep this slide to three headline figures only; limitations are generated on the next check."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Correct the evidence claim",
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
      title: "A price is only a time point",
      visual: investmentPhotos.smartphoneMarketChart,
      notes: [
        "Observation question: what would you need to know before saying whether this price is high or low?",
        "Bridge: a share price is the market price of one share at a specific time, so the time point matters. Students complete the share-price term in Section B before the calculation."
      ]
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
      type: "visualPause",
      eyebrow: "Look first",
      title: "The old price is the base",
      visual: investmentPhotos.stockReportCalculator,
      notes: [
        "Observation question: which number should be the base before calculating a percentage change?",
        "Bridge: percentage price change compares the change with the old price. Students set up the calculation in Handout Section D."
      ]
    },
    {
      type: "calculationDesk",
      eyebrow: "Calculation Desk",
      title: "Formula: percentage price change",
      visual: investmentPhotos.stockReportCalculator,
      formula: "percentage change = (new price - old price) / old price x 100",
      worked: "Tencent-style example: HK$400 to HK$420 means the change is HK$20. The old price is the base: 20 / 400 x 100 = 5%.",
      workedZh: "如果股价从400港元升至420港元，变化是20港元；旧价格400港元是基数。",
      notes: "Keep this slide to formula plus worked example. Students do the HK$50 to HK$55 try-it on the next slide so the base-denominator idea is not crowded."
    },
    {
      type: "answer",
      eyebrow: "Check",
      title: "Try it: old price is the base",
      mode: "fillBlanks",
      items: [
        { prompt: "If a share rises from HK$50 to HK$55, the increase is HK$__________.", answer: "5", zh: "先找出价格增加了多少。" },
        { prompt: "The denominator is the __________ price, HK$50.", answer: "old", zh: "分母是旧价格，而不是新价格。" },
        { prompt: "HK$5 divided by HK$50, times 100, equals __________%.", answer: "10", zh: "再把增加额除以原价并乘以100。" }
      ],
      notes: "This checks Handout Section D and catches students who divide by the new price."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Which denominator?",
      visual: investmentPhotos.tabletFinancialChart,
      question: "Handout Section D check: A share price falls from HK$80 to HK$72. What is the percentage change?",
      zh: "股价从80港元跌至72港元。百分比变化是多少？",
      choices: [
        "-8%",
        "-10%",
        "-11.1%",
        "+10%"
      ],
      answer: 1,
      explanation: "(72 - 80) / 80 x 100 = -10%. The old price is the denominator.",
      notes: "This is the main calculation hinge before the expectations chain. If many choose -11.1%, re-teach old price as the base."
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
      title: "Why share prices move",
      visual: investmentPhotos.investorChartScreens,
      zhTitle: "股价为什么变化",
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
      title: "Complete the missing sentence",
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
      title: "Good company or good investment?",
      zhTitle: "好公司还是好投资？",
      visual: investmentPhotos.financialAnalysisDesk,
      prompt: "Finally we use Handout Section E to separate business quality from the price paid for the share.",
      parts: [
        { label: "Why invest at all?" },
        { label: "Shares and company identity" },
        { label: "Data, price and expectations" },
        { label: "Good company or good investment?", current: true }
      ],
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
      title: "Three evidence blocks before judgement",
      visual: investmentPhotos.financialAnalysisDesk,
      revealBlocks: true,
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
        }
      ],
      prompt: "Handout Section E: which block is missing when someone says 'high revenue means a good investment'?",
      notes: "Show only the block labels and questions first. Students choose the missing block, then reveal the three bodies one by one and finally reveal the prompt."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Risk sits beside the return question",
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
      prompt: "Handout Section E: choose one risk and complete: risk -> future profit or expectations -> price paid.",
      answer: "A strong answer names one Tencent risk and links it to future profit, investor expectations or the price paid.",
      notes: "Reveal the effect links only after students have chosen a risk. This is not a recommendation; it trains risk-evidence-effect language before the final hinge question."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Good company = good investment?",
      visual: investmentPhotos.financialAnalysisDesk,
      question: "Handout Section E check: Which answer best explains why a profitable company may still be a poor investment?",
      zh: "哪一个答案最能解释为什么盈利公司仍可能不是好投资？",
      choices: [
        "A famous company is automatically a safe investment.",
        "The share price may already be too high compared with expected future profit and risk.",
        "High revenue always means the share price is cheap.",
        "A stock code proves the company has no future risk."
      ],
      answer: 1,
      explanation: "Investment judgement compares expected future profit and risk with the price paid for the share.",
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
      prompt: "First write a two-point plan: one revenue/profit limit and one price/risk/expectations limit. Then reveal keywords if needed.",
      zh: "写出两个有发展的观点。可以使用腾讯数据快照。",
      keywords: ["revenue", "profit", "risk", "price paid", "expectations", "future"],
      notes: "Give 4 minutes. Require two because-cause-effect chains and at least one Tencent figure from the handout."
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
        "A share can also be unattractive if the <mark>price paid</mark> is already too high. Investors compare expected future profit and <mark>risk</mark> with the current share price before judging whether it is a good investment."
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
        { prompt: "A share is one unit of __________ in a company.", answer: "ownership", zh: "股票是公司所有权的一个单位。" },
        { prompt: "A code helps investors __________ the correct listed company.", answer: "identify", zh: "代码帮助投资者识别公司。" },
        { prompt: "A good company may be a poor investment if the share __________ is too high.", answer: "price", zh: "如果股价过高，好公司也可能不是好投资。" }
      ],
      notes: "Collect or cold-call. This checks the handout's minimum exit evidence: ownership, identification and price-paid judgement."
    }
  ]
};
