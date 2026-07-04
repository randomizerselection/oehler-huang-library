window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit 1 Lesson 2: Why do companies need a stock market?",
    sources: [
      {
        label: "HKEX homepage",
        note: "Used for the official exchange context and source-box habit.",
        date: "Accessed 2 July 2026",
        url: "https://www.hkex.com.hk/?sc_lang=en"
      },
      {
        label: "HKEX List with HKEX FAQ",
        note: "Used for listing context and the stock-code allocation reference.",
        date: "Accessed 2 July 2026",
        url: "https://www.hkex.com.hk/Global/Exchange/FAQ/List-with-HKEX?sc_lang=en"
      },
      {
        label: "HKEX Securities Market Operations FAQ",
        note: "Used for simple trading-friction examples: board lots, odd lots, trading system and liquidity language.",
        date: "Accessed 2 July 2026",
        url: "https://www.hkex.com.hk/Global/Exchange/FAQ/Securities-Market/Trading/Securities-Market-Operations?sc_lang=en"
      },
      {
        label: "HKEX Securities Market Trading Hours",
        note: "Used to show that real trading happens inside market rules and time windows.",
        date: "Updated 16 September 2017; accessed 2 July 2026",
        url: "https://www.hkex.com.hk/Services/Trading-hours-and-Severe-Weather-Arrangements/Trading-Hours/Securities-Market?sc_lang=en"
      },
      {
        label: "HKEX Equities Quote pages",
        note: "Used as frozen classroom stock-code examples for Tencent 0700, HSBC 0005, AIA 1299 and HKEX 0388.",
        date: "Accessed 2 July 2026",
        url: "https://www.hkex.com.hk/Market-Data/Securities-Prices/Equities/Equities-Quote?sc_lang=en&sym=700"
      }
    ]
  },
  handout: {
    title: "Stock market infrastructure sheet",
    subtitle: "Unit 1 Lesson 2: Why do companies need a stock market?",
    description: "Use HKEX as the exchange case. Match company, stock code and exchange, then explain why trading through a market is useful but not frictionless.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Source box",
        instruction: "Record the HKEX source before using the examples.",
        blocks: [
          {
            type: "facts",
            items: [
              { label: "Exchange case", value: "HKEX" },
              { label: "Source title", value: "HKEX website and FAQs" },
              { label: "Accessed date", value: "2 Jul 2026" },
              { label: "Example security", value: "Tencent Holdings Limited" },
              { label: "Example stock code", value: "0700.HK / 00700" },
              { label: "Exchange", value: "Hong Kong Stock Exchange" },
              { label: "Evidence limit", value: "A code identifies a security; it does not prove investment quality." }
            ]
          },
          {
            type: "prompts",
            prompts: [
              { label: "URL", prompt: "Write the HKEX source title or URL.", lines: 1 },
              { label: "Identifier", prompt: "Record one company and its stock code.", lines: 1 },
              { label: "Limitation", prompt: "What can the code or exchange source not prove by itself?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Vocabulary",
        instruction: "Complete the four Lesson 2 definitions.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Stock exchange", prompt: "A stock exchange is a regulated market where listed securities can be bought and __________.", answer: "sold" },
              { label: "Listing", prompt: "Listing is permission for a company's shares to trade on an __________.", answer: "exchange" },
              { label: "Stock code", prompt: "A stock code is the short market __________ used to find a listed security.", answer: "identifier" },
              { label: "Liquidity", prompt: "Liquidity means how easily an asset can be bought or sold without a large price __________.", answer: "change" }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Company evidence",
        instruction: "Use HKEX examples to identify company, exchange, code, listing and friction.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Company", prompt: "Name the company in one HKEX example.", lines: 1 },
              { label: "Code", prompt: "Write the stock code that identifies the listed share.", lines: 1 },
              { label: "Exchange", prompt: "Which exchange does the example trade on?", lines: 1 },
              { label: "Friction", prompt: "Name one reason market trading is not frictionless.", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Calculation or judgement task",
        instruction: "No new formula. Match the market identifiers accurately.",
        blocks: [
          {
            type: "table",
            columns: ["Company", "Stock code", "Exchange"],
            rows: [
              { metric: "Tencent Holdings Limited", value: "0700.HK / 00700", shows: "Hong Kong Stock Exchange", limits: "", showsLines: 0, limitLines: 1 },
              { metric: "HSBC Holdings plc", value: "0005.HK / 00005", shows: "Hong Kong Stock Exchange", limits: "", showsLines: 0, limitLines: 1 },
              { metric: "AIA Group Limited", value: "1299.HK / 01299", shows: "Hong Kong Stock Exchange", limits: "", showsLines: 0, limitLines: 1 },
              { metric: "Hong Kong Exchanges and Clearing Limited", value: "0388.HK / 00388", shows: "Hong Kong Stock Exchange", limits: "", showsLines: 0, limitLines: 1 }
            ]
          }
        ]
      },
      {
        label: "5",
        title: "Misconception check",
        instruction: "Correct the claim using primary and secondary market language.",
        blocks: [
          {
            type: "sentence",
            label: "Weak claim",
            prompt: "Every market purchase gives new money to the company. Why is this not always correct?",
            keywords: ["listed share", "exchange", "secondary market", "investor", "company"],
            lines: 4
          }
        ]
      },
      {
        label: "6",
        title: "Individual written output",
        instruction: "Submit one matched row and one trading-friction sentence.",
        blocks: [
          {
            type: "writing",
            question: "Complete one company-code-exchange match and explain why trading through a market is not frictionless.",
            keywords: ["company", "stock code", "exchange", "listing", "liquidity", "trading friction"],
            lines: 8
          }
        ]
      }
    ],
    sources: "HKEX source pack: HKEX homepage, List with HKEX FAQ, Securities Market Operations FAQ, Securities Market Trading Hours and HKEX Equities Quote pages, accessed 2 Jul 2026. Frozen classroom source records only; no personal investment recommendation."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 2",
      title: "Why do companies need a stock market?",
      zhTitle: "公司为什么需要股票市场？",
      subtitle: "HKEX case",
      kicker: "A stock exchange helps listed shares trade, but secondary-market trades do not automatically give new money to the company.",
      visual: investmentPhotos.marketScreen,
      notes: [
        "Connect directly from Lesson 1: students know company, listed share and share price; now they ask where listed shares trade.",
        "Keep this lesson on market infrastructure. Do not teach bid, ask, spread, order types or quote-page interpretation."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Case hook",
      title: "HKEX is market infrastructure",
      zhTitle: "港交所是市场基础设施",
      subtitle: "Recover the case before definitions.",
      ticker: "HKEX source",
      question: "Before reveal, circle the exchange, one listed share code and the source date.",
      questionZh: "揭示前，圈出交易所、一个上市股票代码和来源日期。",
      sourceStamp: "HKEX website and FAQs | accessed 2 Jul 2026",
      visual: investmentPhotos.financialAnalysisDesk,
      revealTitle: "HKEX is market infrastructure",
      answer: "HKEX is the exchange where listed shares can trade. A stock code identifies a listed share; it is not a quality signal or investment recommendation.",
      answerZh: "港交所是上市股票可以交易的交易所。股票代码识别上市股票，但不是质量信号或投资建议。",
      sourceFacts: [
        { label: "Exchange case", value: "HKEX", note: "香港交易所" },
        { label: "Example code", value: "0700.HK / 00700", note: "腾讯上市股票" },
        { label: "Source date", value: "Accessed 2 Jul 2026", note: "冻结课堂来源" }
      ],
      notes: "Use this as a question-first hook. Students record source details in the handout, but the projected slide should teach the infrastructure idea."
    },
    {
      type: "answer",
      eyebrow: "Retrieval",
      title: "What did Lesson 1 give us?",
      zhTitle: "第1课给了我们什么？",
      mode: "fillBlanks",
      items: [
        { prompt: "Tencent is the company; 0700.HK is the listed __________.", answer: "share", zh: "腾讯是公司；0700.HK 是上市股票。" },
        { prompt: "A share price is the market price of one share at one __________.", answer: "time", zh: "股价是在某一时间一股股票的市场价格。" },
        { prompt: "Analysis uses evidence before __________.", answer: "opinion", zh: "分析先使用证据，再形成观点。" }
      ],
      notes: "Use this as the retrieval diagnostic. If students miss share versus company, reteach before continuing."
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本节课结束时，你能够",
      phases: ["Define", "Match", "Explain"],
      bullets: [
        "define exchange, listing, code and liquidity",
        "match company, code and exchange",
        "explain one trading friction"
      ],
      zhBullets: [
        "定义交易所、上市、代码和流动性",
        "匹配公司、代码和交易所",
        "解释一个交易摩擦"
      ],
      notes: "Exactly three objectives aligned to the primary output."
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "What a stock exchange does",
      zhTitle: "证券交易所的作用",
      notes: "Cycle 1: retrieve listed-share identity, attempt the exchange role, reveal the definition and core claim."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "What problem does a market solve?",
      zhTitle: "市场解决什么问题？",
      visual: investmentPhotos.investorMeetingReport,
      question: "If one student wants to buy a listed share and another wants to sell it, what problem does an exchange help solve?",
      zh: "如果一个学生想买上市股票，另一个学生想卖，交易所帮助解决什么问题？",
      revealTitle: "A market helps buyers and sellers meet under rules",
      answer: "A stock exchange gives listed securities a regulated place to trade, so buyers and sellers do not have to find each other privately.",
      answerZh: "证券交易所为上市证券提供受监管的交易场所，使买方和卖方不必私下寻找对方。",
      notes: "Avoid implying perfect trading. The next section introduces frictions."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Stock exchange",
      term: "Stock exchange",
      termZh: "证券交易所",
      definition: "A stock exchange is a regulated market where listed securities can be bought and <span class=\"blank invReveal\" data-answer=\"sold\" style=\"--blank-width:7ch\"><span class=\"invBlankText\">sold</span></span>.",
      definitionZh: "证券交易所是一个受监管的市场，上市证券可以在这里买入和卖出。",
      notes: "Keep this definition broad. HKEX is the case, not the only possible exchange."
    },
    {
      type: "answer",
      eyebrow: "Key idea",
      title: "Core claim: trade does not always fund the company",
      zhTitle: "核心观点：交易不一定给公司融资",
      mode: "fillBlanks",
      items: [
        { prompt: "A stock exchange helps listed shares __________.", answer: "trade", zh: "证券交易所帮助上市股票交易。" },
        { prompt: "A market trade can be investor to __________.", answer: "investor", zh: "市场交易可以是投资者之间的交易。" },
        { prompt: "Secondary-market trades do not automatically give new money to the __________.", answer: "company", zh: "二级市场交易不会自动给公司带来新资金。" }
      ],
      notes: "This is the Lesson 2 core claim from the course map."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 1: what is the exchange role?",
      zhTitle: "检查1：交易所的作用是什么？",
      visual: investmentPhotos.tabletFinancialChart,
      question: "Which statement best describes HKEX in this lesson?",
      zh: "哪一句最能描述本课中的 HKEX？",
      choices: [
        "It guarantees every listed share is a good investment.",
        "It is a regulated market infrastructure where listed securities can trade.",
        "It removes every trading cost and friction.",
        "It gives new money to the company every time an investor buys from another investor."
      ],
      answer: 1,
      explanation: "Correct: HKEX is market infrastructure. It helps trading happen, but it does not guarantee quality or remove all frictions.",
      explanationZh: "正确：HKEX 是市场基础设施。它帮助交易发生，但不保证投资质量，也不消除所有摩擦。",
      notes: "Use responses to catch the two target misconceptions: guaranteed good investment and every trade funds the company."
    },
    {
      type: "section",
      eyebrow: "Part 2",
      part: "2",
      title: "Listing and stock code",
      zhTitle: "上市和股票代码",
      notes: "Cycle 2: identify how a listed share is found in market data."
    },
    {
      type: "discussion",
      eyebrow: "Retrieve",
      title: "Why is the code useful?",
      zhTitle: "代码为什么有用？",
      visual: investmentPhotos.smartphoneMarketChart,
      question: "If you only search 'Tencent', what confusion might happen? How does 0700.HK help?",
      zh: "如果只搜索“腾讯”，可能会产生什么混淆？0700.HK 如何帮助？",
      revealTitle: "A code identifies one listed security",
      answer: "A company name can be broad. A stock code helps an analyst find one listed security in a market data source.",
      answerZh: "公司名称可能很宽泛。股票代码帮助分析者在市场数据来源中找到一个上市证券。",
      notes: "Keep this to identifier discipline, not quote-page reading."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Listing",
      term: "Listing",
      termZh: "上市",
      definition: "Listing is permission for a company's shares to trade on an <span class=\"blank invReveal\" data-answer=\"exchange\" style=\"--blank-width:10ch\"><span class=\"invBlankText\">exchange</span></span>.",
      definitionZh: "上市是指公司的股票获准在交易所交易。",
      notes: "Students should not overstate this as a quality guarantee."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Stock code",
      term: "Stock code",
      termZh: "股票代码",
      definition: "A stock code is the short market <span class=\"blank invReveal\" data-answer=\"identifier\" style=\"--blank-width:12ch\"><span class=\"invBlankText\">identifier</span></span> used to find a listed security.",
      definitionZh: "股票代码是用来查找上市证券的简短市场识别码。",
      notes: "Use Tencent 0700.HK, HSBC 0005.HK and AIA 1299.HK as classroom examples."
    },
    {
      type: "flow",
      eyebrow: "Try first",
      title: "How does a share become findable?",
      zhTitle: "股票如何变得可查找？",
      visual: investmentPhotos.financeChartWhiteboard,
      flowStyle: "sequence",
      steps: [
        { text: "A company applies for __________.", answer: "listing", zh: "公司申请上市。" },
        { text: "The exchange gives market __________.", answer: "access", zh: "交易所提供市场准入。" },
        { text: "A stock __________ helps analysts find the security.", answer: "code", zh: "股票代码帮助分析者找到证券。" },
        { text: "The code must be recorded with the source and __________.", answer: "date", zh: "代码必须和来源及日期一起记录。" }
      ],
      notes: "This is a source habit flow, not a full IPO process."
    },
    {
      type: "peerTask",
      eyebrow: "Practice check",
      title: "Match company, code and exchange",
      zhTitle: "匹配公司、代码和交易所",
      taskType: "sort",
      categories: ["Tencent", "HSBC", "AIA", "HKEX"],
      steps: [
        { text: "Match each company to its HKEX classroom code.", zh: "把每家公司与课堂中的 HKEX 代码匹配。" },
        { text: "Write the exchange for one matched row.", zh: "为其中一行写出交易所。" },
        { text: "Add one source limitation before you judge anything.", zh: "判断前添加一个来源局限性。" }
      ],
      cases: [
        { label: "A", text: "0700.HK / 00700" },
        { label: "B", text: "0005.HK / 00005" },
        { label: "C", text: "1299.HK / 01299" },
        { label: "D", text: "0388.HK / 00388" }
      ],
      sampleAnswer: "Tencent - 0700.HK - Hong Kong Stock Exchange. This code identifies a listed share, but it does not prove the share is a good investment.",
      sampleAnswerZh: "腾讯 - 0700.HK - 香港交易所。这个代码识别一只上市股票，但不能证明它是好投资。",
      notes: "The individual written check is one company-code-exchange row plus one limitation."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 2: what does a code prove?",
      zhTitle: "检查2：代码能证明什么？",
      visual: investmentPhotos.investorChartScreens,
      question: "Which claim is safest after finding a stock code?",
      zh: "找到股票代码后，哪一个说法最稳妥？",
      choices: [
        "The code proves the company is a good investment.",
        "The code helps identify a listed security in a market source.",
        "The code means the company receives money from every trade.",
        "The code removes the need for a source date."
      ],
      answer: 1,
      explanation: "Correct: a stock code helps identification. It does not prove quality, value, risk or funding.",
      explanationZh: "正确：股票代码帮助识别。它不能证明质量、价值、风险或融资。",
      notes: "This is the formative decision point before moving to liquidity and friction."
    },
    {
      type: "section",
      eyebrow: "Part 3",
      part: "3",
      title: "Liquidity and trading friction",
      zhTitle: "流动性和交易摩擦",
      notes: "Cycle 3: show that an exchange helps trading, but trading still has rules, time windows, liquidity and costs."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "Why is trading not frictionless?",
      zhTitle: "为什么交易不是无摩擦的？",
      visual: investmentPhotos.businessChartsPaper,
      question: "If a market exists, why might buying or selling still not be instant, free or exactly at the price you hoped for?",
      zh: "即使有市场，为什么买卖仍可能不是即时、免费或按你希望的价格完成？",
      revealTitle: "Markets reduce friction; they do not erase it",
      answer: "Trading still depends on rules, trading hours, trading units, available buyers or sellers, costs and price movement.",
      answerZh: "交易仍取决于规则、交易时段、交易单位、可用买方或卖方、成本和价格变化。",
      notes: "Keep this at a simple friction level. Avoid bid/ask/spread and order types."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Liquidity",
      term: "Liquidity",
      termZh: "流动性",
      definition: "Liquidity means how easily an asset can be bought or sold without a large price <span class=\"blank invReveal\" data-answer=\"change\" style=\"--blank-width:8ch\"><span class=\"invBlankText\">change</span></span>.",
      definitionZh: "流动性指资产买入或卖出的容易程度，以及是否会造成较大价格变化。",
      notes: "The HKEX FAQ odd-lot example supports the basic idea that lower liquidity can affect trading terms."
    },
    {
      type: "dataSnapshot",
      eyebrow: "Evidence",
      title: "Three trading facts",
      zhTitle: "三个交易事实",
      visual: investmentPhotos.financialAnalysisDesk,
      sourceStamp: "HKEX FAQs and trading-hours pages | accessed 2 Jul 2026",
      focusMetrics: [
        { label: "Market", value: "Regulated trading place" },
        { label: "Code", value: "Short identifier" },
        { label: "Friction", value: "Rules, time, units, liquidity" }
      ],
      task: "Explain why a market helps but trading still has friction.",
      taskZh: "解释市场为什么有帮助，但交易仍有摩擦。",
      note: "HKEX sources identify where shares trade; they do not prove investment quality.",
      noteZh: "HKEX 来源识别股票在哪里交易；不能证明投资质量。",
      notes: "Exactly three metrics, with limitation language."
    },
    {
      type: "riskRegister",
      eyebrow: "Friction register",
      title: "What can make trading less easy?",
      zhTitle: "什么会让交易不那么容易？",
      visual: investmentPhotos.shippingPort,
      revealEffects: true,
      effectLabel: "Why it matters",
      table: [
        ["Friction", "Investor question", "Likely effect"],
        ["Trading hours", "Is the market open now?", "Trading happens inside market time windows."],
        ["Trading unit", "Can I trade the exact amount easily?", "Some quantities may be harder to match."],
        ["Liquidity", "Are there enough buyers and sellers?", "Thin trading can make the price harder to achieve."],
        ["Costs and rules", "What rules or costs apply?", "The final result can differ from the simple plan."]
      ],
      prompt: "Choose one friction and complete: market helps because..., but trading is not frictionless because...",
      promptZh: "选择一个摩擦，完成句子：市场有帮助，因为……但交易不是无摩擦的，因为……",
      answer: "A good answer names the exchange role and one specific friction without giving investment advice.",
      notes: "This is the lesson's trading-friction prompt."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 3: secondary-market misconception",
      zhTitle: "检查3：二级市场误解",
      visual: investmentPhotos.tradingApps,
      question: "Which sentence corrects the misconception?",
      zh: "哪一句纠正了误解？",
      choices: [
        "Every market purchase gives new money to the company.",
        "A secondary-market trade can transfer shares between investors; it does not automatically fund the company.",
        "A stock exchange removes all risk.",
        "A stock code is just decoration."
      ],
      answer: 1,
      explanation: "Correct: secondary-market trading helps ownership units change hands, but it is not automatically new company finance.",
      explanationZh: "正确：二级市场交易帮助所有权单位换手，但不自动成为公司的新融资。",
      notes: "This should be correct before the output rehearsal."
    },
    {
      type: "section",
      eyebrow: "Part 4",
      part: "4",
      title: "Output rehearsal",
      zhTitle: "输出排练",
      notes: "Cycle 4: assemble the company-code-exchange match and friction sentence."
    },
    {
      type: "flow",
      eyebrow: "Output rehearsal",
      title: "Build the matching-table answer",
      zhTitle: "构建匹配表答案",
      visual: investmentPhotos.financeChartWhiteboard,
      flowStyle: "sequence",
      steps: [
        { text: "Company: __________ Holdings Limited.", answer: "Tencent", zh: "公司：腾讯控股有限公司。" },
        { text: "Stock code: __________.HK / HKEX 00700.", answer: "0700", zh: "股票代码：0700.HK / 港交所 00700。" },
        { text: "Exchange: Hong Kong Stock __________.", answer: "Exchange", zh: "交易所：香港交易所。" },
        { text: "Limitation: a code identifies the share; it does not prove investment __________.", answer: "quality", zh: "局限性：代码识别股票，但不能证明投资质量。" }
      ],
      notes: "Students can use another matched row from the handout if they prefer."
    },
    {
      type: "discussion",
      eyebrow: "Output rehearsal",
      title: "Write the trading-friction sentence",
      zhTitle: "写出交易摩擦句",
      visual: investmentPhotos.stockReportCalculator,
      question: "Complete one sentence: A stock exchange helps trading because..., but trading is not frictionless because...",
      zh: "完成一句话：证券交易所帮助交易，因为……但交易不是无摩擦的，因为……",
      revealTitle: "A strong sentence names the help and the friction",
      answer: "A stock exchange helps listed shares trade under rules, but trading is not frictionless because price, time, trading units, liquidity and costs can still matter.",
      answerZh: "证券交易所帮助上市股票在规则下交易，但交易不是无摩擦的，因为价格、时间、交易单位、流动性和成本仍然重要。",
      notes: "This model sentence is deliberately broad and avoids bid/ask/spread mechanics."
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Exit ticket",
      zhTitle: "离堂小测",
      mode: "fillBlanks",
      items: [
        { prompt: "A stock exchange is a regulated market where listed securities can be bought and __________.", answer: "sold", zh: "证券交易所是上市证券可以买入和卖出的受监管市场。" },
        { prompt: "A stock code is a short market __________.", answer: "identifier", zh: "股票代码是简短的市场识别码。" },
        { prompt: "Secondary-market trades do not automatically give new money to the __________.", answer: "company", zh: "二级市场交易不会自动给公司带来新资金。" },
        { prompt: "One trading friction is rules, time, trading units, costs or __________.", answer: "liquidity", zh: "一个交易摩擦是规则、时间、交易单位、成本或流动性。" }
      ],
      notes: "Collect the handout output: one company-code-exchange row and one sentence explaining why trading through a market is not frictionless."
    }
  ]
};
