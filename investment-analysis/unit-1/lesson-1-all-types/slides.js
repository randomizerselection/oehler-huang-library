window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};
const investmentMarketData = window.INVEST.marketData || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit 1 Lesson 1: Knowledge-based starter version",
    sources: [
      {
        label: "Tencent investor relations",
        note: "Used for company identity and official source habits.",
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
        note: "Used for a simple company-evidence example without valuation judgement.",
        date: "Published 18 March 2026; accessed 26 June 2026",
        url: "https://static.www.tencent.com/uploads/2026/03/18/e6a646796d0d869acc76271c9ee1a6a5.pdf"
      }
    ]
  },
  handout: {
    title: "Investment Analysis Starter Map",
    subtitle: "Unit 1 Lesson 1: Saving, investment, speculation and one share price",
    description: "Classify saving, investment and speculation; define asset, share and share price; then use Tencent to ask why a share price can move.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Three uses of money",
        instruction: "Define the three choices before using Tencent.",
        blocks: [
          {
            type: "table",
            columns: ["Choice", "Main purpose", "Main risk"],
            rows: [
              { metric: "Saving", value: "Safety and access", shows: "Low return; inflation may reduce buying power.", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "Investment", value: "Possible future return", shows: "Value can rise or fall.", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "Speculation", value: "Short-term price bet", shows: "High uncertainty and weak analysis.", limits: "", showsLines: 1, limitLines: 1 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Vocabulary",
        instruction: "Complete each definition.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Asset", prompt: "An asset is something owned that may have __________.", answer: "value" },
              { label: "Share", prompt: "A share is one unit of __________ in a company.", answer: "ownership" },
              { label: "Share price", prompt: "A share price is the market price of one __________ at a specific time.", answer: "share" },
              { label: "Possible return", prompt: "Possible return is what an investor may __________.", answer: "gain" },
              { label: "Risk", prompt: "Risk means results may be worse than __________.", answer: "expected" },
              { label: "Speculation", prompt: "Speculation mainly bets on a short-term price __________.", answer: "movement" }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Tencent map",
        instruction: "Separate the company, product, listed share and one share price.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Company", prompt: "What is the company name?", lines: 1 },
              { label: "Product", prompt: "Name one product or service Tencent provides.", lines: 1 },
              { label: "Listed share", prompt: "Which code identifies the listed share?", lines: 1 },
              { label: "Share price", prompt: "What does one point on the graph represent?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Why can price move?",
        instruction: "Use the graph to write a knowledge question, not advice.",
        blocks: [
          {
            type: "sentence",
            label: "Price movement chain",
            prompt: "New information can change __________, which can change buying and selling, which can move the share price.",
            keywords: ["expectations", "buyers", "sellers", "share price"],
            lines: 3
          }
        ]
      },
      {
        label: "5",
        title: "Misconception check",
        instruction: "Correct each weak idea.",
        blocks: [
          {
            type: "cases",
            cases: [
              { label: "A", text: "Saving and investing are the same.", answer: "misconception" },
              { label: "B", text: "A famous company must be a good investment.", answer: "misconception" },
              { label: "C", text: "A share price is the whole company's value.", answer: "misconception" },
              { label: "D", text: "Speculation is mainly a short-term price bet.", answer: "correct" }
            ]
          }
        ]
      },
      {
        label: "6",
        title: "Exit output",
        instruction: "Submit the knowledge map and one Tencent question.",
        blocks: [
          {
            type: "writing",
            question: "Classify saving, investment and speculation; define share price; then write one Tencent price-movement question.",
            keywords: ["saving", "investment", "speculation", "asset", "share", "share price", "expectations", "risk"],
            lines: 8
          }
        ]
      }
    ],
    sources: "Tencent price graph: Yahoo Finance monthly historical prices, accessed 2 Jul 2026. Tencent company data: FY2025 annual and Q4 results, published 18 Mar 2026, accessed 26 Jun 2026. Frozen classroom evidence only; no personal investment recommendation."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 1",
      title: "Saving, investment, speculation and one share price",
      subtitle: "Tencent starter map",
      kicker: "Learn the first knowledge map: three uses of money, one ownership unit, one share price and one price-movement question.",
      visual: investmentPhotos.modernTradingDesk,
      notes: [
        "Keep the course boundary explicit: no stock tips, market timing or personal investment advice.",
        "This version is knowledge-first. Evidence habits appear only where they help students understand source dates and price movement."
      ]
    },
    {
      type: "priceChart",
      eyebrow: "Case hook",
      title: "Tencent's share price moved over time",
      question: "What do you notice about the line before we define anything?",
      ticker: "0700.HK",
      data: investmentMarketData.tencentFiveYearSharePrice,
      yMin: 150,
      yMax: 700,
      sourceStamp: "Tencent 0700.HK monthly closes | Yahoo Finance | accessed 2 Jul 2026",
      alt: "Five-year line chart of Tencent 0700.HK monthly share-price closes.",
      notes: "Students only observe direction and volatility. Do not calculate percentage change."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "Is this saving, investment or speculation?",
      visual: investmentPhotos.smartphoneMarketChart,
      question: "A student sees the Tencent line and says, 'I want to put money there because it might jump next week.' Which category is this closest to, and why?",
      revealTitle: "A short-term price bet is speculation",
      answer: "It is closest to speculation because the student is mainly betting on a short-term price jump, not explaining the asset, possible return and risk.",
      notes: "This opens with classification knowledge rather than a source-method lecture."
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      phases: ["Classify", "Define", "Explain"],
      bullets: [
        "classify saving, investment and speculation",
        "define asset, share, share price, possible return and risk",
        "explain why a Tencent share price can move"
      ],
      notes: "Exactly three objectives, all knowledge-facing."
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "Three uses of money",
      subtitle: "Saving, investment and speculation are not the same choice.",
      notes: "Cycle: classify first, teach the triad, then sort examples."
    },
    {
      type: "conceptTriad",
      eyebrow: "Concept map",
      title: "Saving, investment and speculation",
      visual: investmentPhotos.businessChartsPaper,
      revealDetails: true,
      concepts: [
        {
          label: "Saving",
          tag: "Safety and access",
          definition: "Money kept for safety, access or future spending.",
          purpose: "Keep money available",
          risk: "Usually lower, but inflation can reduce buying power",
          time: "Short to medium term",
          example: "Emergency money in a bank account"
        },
        {
          label: "Investment",
          tag: "Asset with risk",
          definition: "Money put into an asset for possible return and risk.",
          purpose: "Seek future gain",
          risk: "Value can rise or fall",
          time: "Usually medium to long term",
          example: "Owning one listed share"
        },
        {
          label: "Speculation",
          tag: "Price bet",
          definition: "A short-term price bet with weak analysis.",
          purpose: "Try to profit from a quick move",
          risk: "High uncertainty",
          time: "Often short term",
          example: "Buying because of a tip"
        }
      ],
      prompt: "Classify the Tencent price-jump sentence from the starter."
    },
    {
      type: "flow",
      eyebrow: "Key idea",
      title: "Each money choice asks a different question",
      visual: investmentPhotos.financeChartWhiteboard,
      flowStyle: "sequence",
      steps: [
        { text: "Saving asks: is my money safe and __________?", answer: "accessible" },
        { text: "Investment asks: what asset, return and __________?", answer: "risk" },
        { text: "Speculation asks: can I catch a short-term price __________?", answer: "move" }
      ],
      notes: "Students should write the three guiding questions in notebooks."
    },
    {
      type: "peerTask",
      eyebrow: "Practice check",
      title: "Classify the money choice",
      visual: investmentPhotos.investorChartScreens,
      taskType: "sort",
      categories: ["Saving", "Investment", "Speculation"],
      steps: [
        { text: "Sort each example." },
        { text: "Explain one difficult choice." }
      ],
      cases: [
        { label: "A", text: "Emergency money." },
        { label: "B", text: "One listed share." },
        { label: "C", text: "Tip says jump." },
        { label: "D", text: "Next month cash." },
        { label: "E", text: "Long-term asset." },
        { label: "F", text: "Quick price bet." }
      ],
      sampleAnswer: "Tip-based quick bets are speculation; asset ownership with return and risk is investment.",
      notes: "Use this as the first formative check."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 1: classify the choice",
      visual: investmentPhotos.businessChartsPaper,
      question: "Which choice is most clearly investment?",
      choices: [
        "Cash for next week",
        "One share, possible return and risk",
        "Tip says price jumps tomorrow",
        "Money kept for safety and access"
      ],
      answer: 1,
      explanation: "Investment means putting money into an asset with possible future return and risk."
    },
    {
      type: "section",
      eyebrow: "Part 2",
      part: "2",
      title: "Assets, shares and share prices",
      subtitle: "Now define what the Tencent graph is actually showing.",
      notes: "Cycle: define asset, share and share price, then map Tencent."
    },
    {
      type: "visualPause",
      eyebrow: "Look carefully",
      title: "Tencent is a company, not a price line",
      visual: investmentPhotos.tencentBinhaiTowers,
      notes: "Use the image to separate company identity from the listed share and the share price."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "An asset is something owned that may have value",
      term: "Asset",
      definition: "An asset is something owned that may have <span class=\"blank invReveal\" data-answer=\"value\" style=\"--blank-width:8ch\"><span class=\"invBlankText\">value</span></span>.",
      notes: "Keep asset broad: cash, a building, equipment or a share can be assets."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "A share is one ownership unit",
      term: "Share",
      definition: "A share is one unit of <span class=\"blank invReveal\" data-answer=\"ownership\" style=\"--blank-width:11ch\"><span class=\"invBlankText\">ownership</span></span> in a company.",
      notes: "Do not teach ownership percentages or voting yet."
    },
    {
      type: "discussion",
      eyebrow: "Practice check",
      title: "What do you own if you own one share?",
      visual: investmentPhotos.shareholderMeeting,
      question: "Choose one: the whole company, one product, one ownership unit or guaranteed profit.",
      revealTitle: "One share is one ownership unit",
      answer: "One share is one ownership unit in a company. It is not the whole company, not a product and not guaranteed profit."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Share price means one share at one time",
      term: "Share price",
      definition: "A share price is the market price of one <span class=\"blank invReveal\" data-answer=\"share\" style=\"--blank-width:7ch\"><span class=\"invBlankText\">share</span></span> at a specific time.",
      notes: "This corrects the misconception that share price is total company value."
    },
    {
      type: "quoteMap",
      eyebrow: "Listed-share identity",
      title: "Read the quote page only for identity today",
      visual: investmentPhotos.tradingApps,
      quoteLabel: "Beginner quote snapshot",
      quoteTitle: "Tencent | 0700.HK | HKD | date",
      revealValues: true,
      fields: [
        { label: "Company", value: "Tencent", note: "The business" },
        { label: "Code", value: "0700.HK", note: "Listed-share identifier" },
        { label: "Exchange", value: "HKEX", note: "Where it trades" },
        { label: "Price", value: "One share", note: "Not total company value" },
        { label: "Date", value: "Snapshot", note: "One time point" },
        { label: "Currency", value: "HKD", note: "Price unit" }
      ],
      prompt: "Point to the field that identifies the listed share.",
      answer: "0700.HK identifies the listed share. The price is for one share at one time."
    },
    {
      type: "comparisonMatrix",
      eyebrow: "Compare",
      title: "Company and share price differ",
      visual: investmentPhotos.stockReportCalculator,
      revealCells: true,
      cornerLabel: "Question",
      columns: [
        { label: "Tencent company", note: "The business" },
        { label: "Tencent listed share", note: "One ownership unit" }
      ],
      rows: [
        { label: "Example", values: ["Products and services", "0700.HK"] },
        { label: "Price means", values: ["Not the whole value", "One share at one time"] },
        { label: "Misconception", values: ["Famous means good", "High price means big company"] }
      ],
      prompt: "Correct one misconception from the matrix."
    },
    {
      type: "quiz",
      eyebrow: "Hinge check",
      title: "Check 2: what does one graph point show?",
      visual: investmentPhotos.tabletFinancialChart,
      question: "What does one point on the Tencent share-price graph show?",
      choices: [
        "Tencent's total company value",
        "The market price of one listed share at one date",
        "Tencent's revenue for the year",
        "A guaranteed future return"
      ],
      answer: 1,
      explanation: "A graph point shows the market price of one listed share at one date."
    },
    {
      type: "section",
      eyebrow: "Part 3",
      part: "3",
      title: "Why can a share price move?",
      subtitle: "Price movement starts with changing expectations.",
      notes: "Cycle: teach information, expectations, buying/selling and price movement."
    },
    {
      type: "catalystTimeline",
      eyebrow: "Price movement",
      title: "Information can change expectations and price",
      visual: investmentPhotos.financeChartWhiteboard,
      revealEffects: true,
      effectLabel: "Link",
      events: [
        { date: "1", title: "New information", detail: "A result, product, risk or market event appears.", effect: "Investors update expectations." },
        { date: "2", title: "Buying and selling", detail: "More buyers or sellers may react.", effect: "Market pressure changes." },
        { date: "3", title: "Share price movement", detail: "The price of one share may rise or fall.", effect: "The graph records the movement." }
      ],
      prompt: "Complete: new information can change expectations, which can move..."
    },
    {
      type: "flow",
      eyebrow: "Key idea",
      title: "The beginner price-movement chain",
      visual: investmentPhotos.financeChartWhiteboard,
      flowStyle: "sequence",
      steps: [
        { text: "New information changes __________.", answer: "expectations" },
        { text: "Expectations affect buyers and __________.", answer: "sellers" },
        { text: "Buying and selling can move the share __________.", answer: "price" }
      ],
      notes: "This is qualitative only. Percentage change is later."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Possible return is what an investor may gain",
      term: "Possible return",
      definition: "Possible return is what an investor may <span class=\"blank invReveal\" data-answer=\"gain\" style=\"--blank-width:7ch\"><span class=\"invBlankText\">gain</span></span> from holding an asset.",
      notes: "Keep dividends and formal total return for later lessons."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Risk means results may be worse than expected",
      term: "Risk",
      definition: "Risk is the possibility that results, returns or prices are worse than <span class=\"blank invReveal\" data-answer=\"expected\" style=\"--blank-width:10ch\"><span class=\"invBlankText\">expected</span></span>.",
      notes: "Detailed risk categories come later."
    },
    {
      type: "peerTask",
      eyebrow: "Misconception check",
      title: "Correct the weak knowledge claim",
      visual: investmentPhotos.investorMeetingReport,
      steps: [
        "Choose one weak claim.",
        "Name the correct concept.",
        "Rewrite it in one accurate sentence."
      ],
      sampleAnswer: "A famous company is not automatically a good investment. Investment still involves return, risk and price.",
      notes: "Use this for the four misconceptions in the plan."
    },
    {
      type: "quiz",
      eyebrow: "Final hinge",
      title: "Check 3: strongest knowledge statement",
      visual: investmentPhotos.businessChartsPaper,
      question: "Which statement is most accurate?",
      choices: [
        "Saving and investing are the same.",
        "Speculation is mainly a short-term price bet.",
        "A high share price is the whole company's value.",
        "A famous company is automatically a good investment."
      ],
      answer: 1,
      explanation: "Speculation mainly bets on a short-term price movement without enough analysis of value, return and risk."
    },
    {
      type: "section",
      eyebrow: "Exit",
      part: "4",
      title: "Build the starter knowledge map",
      subtitle: "Classify, define, explain and ask one Tencent question.",
      notes: "Students now produce a compact knowledge map, not a methodology slogan."
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Exit ticket",
      mode: "fillBlanks",
      items: [
        { prompt: "Saving mainly protects safety and __________.", answer: "access" },
        { prompt: "Investment puts money into an __________ with possible return and risk.", answer: "asset" },
        { prompt: "A share price is the market price of one __________ at one time.", answer: "share" },
        { prompt: "New information can change __________ and move price.", answer: "expectations" }
      ],
      notes: "Collect the written Tencent question after this slide."
    }
  ]
};
