window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};
const investmentMarketData = window.INVEST.marketData || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Slide Type Gallery: Investment Analysis",
    sources: [
      {
        label: "Investment deck renderer",
        note: "The gallery mirrors the current renderer keys in assets/js/investment-deck.js.",
        date: "Reviewed 4 July 2026",
        url: "../../../assets/js/investment-deck.js"
      },
      {
        label: "Investment lesson template",
        note: "The template provides the starting examples for future Investment Analysis decks.",
        date: "Reviewed 4 July 2026",
        url: "../../_template/slides.js"
      }
    ]
  },
  handout: {
    title: "Investment slide type decision worksheet",
    subtitle: "Review deck for future lesson design",
    description: "Use this as a structured review sheet while moving through the gallery. Mark each type as keep, edit, replace, split into variants, or delete.",
    meta: [
      { label: "Reviewer", value: "" },
      { label: "Date", value: "" },
      { label: "Next deck", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Opening and navigation types",
        instruction: "Decide whether each type should stay available for future decks.",
        blocks: [
          {
            type: "table",
            columns: ["Slide type", "Current role", "Decision"],
            rows: [
              { metric: "hero", value: "Lesson opener and big case signal.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "priceChart", value: "Frozen share-price chart hook.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "outcomes", value: "Three lesson objectives.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "section", value: "Section divider and progress reset.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "visualPause", value: "Image-only pause before a concept or source.", shows: "", limits: "", showsLines: 1, limitLines: 1 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Teaching and practice types",
        instruction: "Record whether the type teaches clearly or needs a redesign.",
        blocks: [
          {
            type: "table",
            columns: ["Slide type", "Current role", "Decision"],
            rows: [
              { metric: "discussion", value: "Question first, answer reveal second.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "term", value: "One key term and definition.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "answer", value: "Fill-in retrieval, checks, or exit ticket.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "flow", value: "Sequence with reveal blanks.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "peerTask", value: "Partner steps or sorting board.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "rankingTask", value: "Ordered low-to-high line with defended reveal.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "definitionRecall", value: "Opening recall with revealed model definitions.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "missingSentence", value: "Sentence-level explanation practice.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "yesNoCheck", value: "Vote yes/no, then reveal the reason.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "quiz", value: "Interactive multiple-choice hinge check.", shows: "", limits: "", showsLines: 1, limitLines: 1 }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Evidence and judgement types",
        instruction: "Identify which types should be used often, rarely, or replaced.",
        blocks: [
          {
            type: "table",
            columns: ["Slide type", "Current role", "Decision"],
            rows: [
              { metric: "dataSnapshot", value: "Three metrics plus a student evidence task.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "conceptTriad", value: "Compare three related concepts.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "visualGrid", value: "Compare concrete examples through purposeful images.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "compare", value: "Two-column T-table for clean contrasts.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "classificationTask", value: "Classify cases and reveal reasons.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "sourceLens", value: "Source metadata and source checks.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "quoteMap", value: "Quote-page identity fields.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "comparisonMatrix", value: "Compare choices across common criteria.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "catalystTimeline", value: "Event-to-expectation chain.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "calculationDesk", value: "Formula, inputs, worked example, try-it task.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "analystBoard", value: "Three evidence blocks and a missing-block prompt.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "riskRegister", value: "Risk table with revealed effects.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "judgementFrame", value: "Evidence, return, risk, price-paid stages.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "exam", value: "Output rehearsal with keywords.", shows: "", limits: "", showsLines: 1, limitLines: 1 },
              { metric: "modelAnswer", value: "Revealed paragraphs for comparison.", shows: "", limits: "", showsLines: 1, limitLines: 1 }
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Replacement notes",
        instruction: "Use this area for specific instructions I should apply to future decks.",
        blocks: [
          {
            type: "writing",
            question: "Which slide types should be kept, edited, split into variants, replaced, or deleted?",
            keywords: ["keep", "edit", "split", "replace", "delete", "future use"],
            lines: 10
          }
        ]
      }
    ],
    sources: "Gallery generated from the current Investment Analysis renderer on 4 July 2026."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "type: hero",
      title: "Investment slide type gallery",
      zhTitle: "投资幻灯片类型展示",
      subtitle: "A review deck for future presentation design",
      kicker: "Move through each available renderer. Use Notes and the worksheet to mark keep, edit, replace, split or delete.",
      visual: investmentPhotos.modernTradingDesk,
      notes: [
        "Current role: hero opens a lesson with a strong case signal.",
        "Future use: use once at the start of a deck, not as a generic section title.",
        "Review decision: keep, edit, replace or delete."
      ]
    },
    {
      type: "priceChart",
      eyebrow: "type: priceChart",
      title: "A chart can start a question",
      zhTitle: "图表可以引出问题",
      question: "What movement do you notice before any explanation?",
      questionZh: "在任何解释之前，你注意到什么变化？",
      ticker: "0700.HK",
      data: investmentMarketData.tencentFiveYearSharePrice,
      yMin: 150,
      yMax: 700,
      sourceStamp: "Tencent 0700.HK monthly closes | Yahoo Finance | accessed 2 Jul 2026",
      alt: "Five-year line chart of Tencent 0700.HK monthly share-price closes.",
      notes: [
        "Current role: full-screen frozen chart hook.",
        "Future use: use for observation, not live price dependence or advice.",
        "Review decision: decide whether chart controls, labels or annotations need redesign."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "type: outcomes",
      title: "By the end, you can",
      zhTitle: "本课结束时，你能够",
      phases: ["Recognise", "Decide", "Apply"],
      bullets: [
        "recognise the available slide types",
        "decide which types need edits or replacement",
        "apply the strongest types in future decks"
      ],
      zhBullets: [
        "识别可用的幻灯片类型",
        "判断哪些类型需要修改或替换",
        "在未来课件中使用最有效的类型"
      ],
      notes: [
        "Current role: exactly three objective cards.",
        "Future use: use once near the start and keep objectives concrete.",
        "Review decision: decide whether the phase labels add value."
      ]
    },
    {
      type: "section",
      eyebrow: "Review group",
      part: "1",
      title: "Navigation and lesson rhythm",
      zhTitle: "导航与课堂节奏",
      subtitle: "These types structure the deck before or between learning cycles.",
      notes: [
        "Current role: section reset with automatic progress labels.",
        "Future use: use between major lesson parts only.",
        "Review decision: decide whether the progress strip is useful enough to keep."
      ]
    },
    {
      type: "visualPause",
      eyebrow: "type: visualPause",
      title: "Look before the explanation",
      visual: investmentPhotos.hkexHall,
      notes: [
        "Current role: image-only reset that lets students observe before explanation.",
        "Future use: strongest before a new source, market setting, company context or misconception.",
        "Review decision: keep it picture-only; put any prompt in notes or the next slide."
      ]
    },
    {
      type: "section",
      eyebrow: "Review group",
      part: "2",
      title: "Teach, reveal and check",
      zhTitle: "讲解、揭示与检查",
      subtitle: "These types create the core classroom moves inside each section.",
      notes: [
        "Current role: reset before the main teaching and practice examples.",
        "Future use: keep section titles notebook-ready and student-facing.",
        "Review decision: keep, edit, replace or delete."
      ]
    },
    {
      type: "discussion",
      eyebrow: "type: discussion",
      title: "Question first, answer second",
      zhTitle: "先提问，再揭示答案",
      visual: investmentPhotos.investorMeetingReport,
      question: "A student says: Tencent is famous, so its share must be safe. What is missing?",
      questionZh: "学生说：腾讯很有名，所以它的股票一定安全。这里缺少什么？",
      revealTitle: "Familiarity is not evidence",
      answer: "The claim needs a source, date, share price, possible return, risk and limitation before judgement.",
      answerZh: "判断前需要来源、日期、股价、可能回报、风险和局限，而不能只靠熟悉度。",
      notes: [
        "Current role: student-answerable prompt with a concise reveal answer.",
        "Future use: use when you want commitment before explanation.",
        "Review decision: decide whether the answer reveal is visually strong enough."
      ]
    },
    {
      type: "term",
      eyebrow: "type: term",
      title: "Share price",
      term: "Share price",
      termZh: "股价",
      keywordVisuals: [
        { label: "One share at one time", labelZh: "特定时间的一股股票", visual: investmentPhotos.assetSharesScreen }
      ],
      definition: "A share price is the market price of one <span class=\"blank invReveal\" data-answer=\"share\" style=\"--blank-width:7ch\"><span class=\"invBlankText\">share</span></span> at a specific time.",
      definitionZh: "股价是在特定时间一股股票的市场交易价格。",
      notes: [
        "Current role: one term, one definition, optional revealed blank.",
        "Future use: use for definitions students should copy exactly.",
        "Review decision: decide whether examples or non-examples should be built into this type."
      ]
    },
    {
      type: "answer",
      eyebrow: "type: answer",
      title: "Retrieval check",
      zhTitle: "回忆检查",
      mode: "fillBlanks",
      items: [
        { prompt: "Evidence comes before __________.", answer: "opinion", zh: "先看证据，再形成__________。", answerZh: "观点" },
        { prompt: "A share is one unit of __________.", answer: "ownership", zh: "一股股票是一个__________单位。", answerZh: "所有权" },
        { prompt: "Risk means results may be worse than __________.", answer: "expected", zh: "风险意味着结果可能低于__________。", answerZh: "预期" }
      ],
      notes: [
        "Current role: fill-in retrieval or short answer list.",
        "Future use: use for quick diagnostic checks and notebook-ready rules.",
        "Review decision: decide whether this type should be renamed because it is not always an answer slide."
      ]
    },
    {
      type: "flow",
      eyebrow: "type: flow",
      title: "Link information to price movement",
      zhTitle: "把信息连接到价格变化",
      visual: investmentPhotos.financeChartWhiteboard,
      flowStyle: "sequence",
      steps: [
        { text: "New information changes __________.", answer: "expectations", zh: "新信息会改变预期。", visual: investmentPhotos.annualReports, visualLabel: "Information", visualLabelZh: "信息" },
        { text: "Expectations affect buyers and __________.", answer: "sellers", zh: "预期会影响买方和卖方。", visual: investmentPhotos.investorChartScreens, visualLabel: "Expectations", visualLabelZh: "预期" },
        { text: "Buying and selling can move the share __________.", answer: "price", zh: "买卖力量可能推动股价变化。", visual: investmentPhotos.marketScreen, visualLabel: "Price movement", visualLabelZh: "价格变动" },
        { text: "The analyst checks evidence before __________.", answer: "judgement", zh: "分析者先核查证据，再作判断。", visual: investmentPhotos.stockReportCalculator, visualLabel: "Judgement", visualLabelZh: "判断" }
      ],
      notes: [
        "Current role: sequence with revealed blanks.",
        "Future use: good for mechanisms, calculation steps and evidence chains.",
        "Review decision: decide whether arrows or a more visual pathway would improve it."
      ]
    },
    {
      type: "peerTask",
      eyebrow: "type: peerTask",
      title: "Improve one analyst sentence",
      zhTitle: "改进一句分析句",
      visual: investmentPhotos.businessChartsPaper,
      steps: [
        { text: "Write your own sentence first.", zh: "先写出自己的句子。" },
        { text: "Compare with a partner and underline the evidence.", zh: "与同伴比较，并划出证据。" },
        { text: "Improve one word before the reveal.", zh: "揭示前改进一个词。" }
      ],
      sampleAnswer: "Tencent is a familiar company, but a judgement needs source-dated evidence about price, return and risk.",
      sampleAnswerZh: "腾讯是熟悉的公司，但判断需要关于价格、回报和风险的带日期证据。",
      notes: [
        "Current role: partner work with a revealed sample answer.",
        "Future use: use for short writing, peer comparison or improvement routines.",
        "Review decision: decide whether the steps panel is clear enough."
      ]
    },
    {
      type: "peerTask",
      eyebrow: "type: peerTask / sort variant",
      title: "Sort the evidence habit",
      zhTitle: "给证据习惯分类",
      visual: investmentPhotos.investorChartScreens,
      taskType: "sort",
      categories: ["Company", "Share price", "Risk", "Weak opinion"],
      steps: [
        { text: "Sort each case into one category.", zh: "把每个案例分到一个类别。" },
        { text: "Explain the most difficult choice.", zh: "解释最难判断的一项。" }
      ],
      cases: [
        { label: "A", text: "Tencent Holdings" },
        { label: "B", text: "0700.HK moved" },
        { label: "C", text: "Competition may reduce profit" },
        { label: "D", text: "Famous means safe" }
      ],
      sampleAnswer: "Famous means safe is a weak opinion because it has not checked price, return or risk.",
      sampleAnswerZh: "“有名就安全”是弱观点，因为它没有核查价格、回报或风险。",
      notes: [
        "Current role: same peerTask type, but taskType sort changes the layout.",
        "Future use: use for categories, concepts, evidence/source sorting and misconception checks.",
        "Review decision: decide whether this should become its own slide type."
      ]
    },
    {
      type: "rankingTask",
      eyebrow: "type: rankingTask",
      title: "Rank assets by risk",
      zhTitle: "按风险给资产排序",
      visual: investmentPhotos.businessChartsPaper,
      prompt: "Assign ranks 1–4 from lower to higher risk, then defend rank 4.",
      promptZh: "按风险从低到高标出1至4，然后为第4位写出理由。",
      axis: {
        low: "Lower risk",
        lowZh: "较低风险",
        high: "Higher risk",
        highZh: "较高风险",
        note: "The order needs a reason",
        noteZh: "排序需要理由"
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
        { rank: "1", label: "A", text: "Cash and savings", zh: "现金和储蓄", reason: "Usually the most stable starting point.", reasonZh: "通常是较稳定的起点。" },
        { rank: "2", label: "B", text: "Property", zh: "房产", reason: "Specific price, location and time horizon matter.", reasonZh: "具体价格、地点和时间范围都重要。" },
        { rank: "3", label: "C", text: "Shares", zh: "股票", reason: "Company results and investor expectations can move the price.", reasonZh: "公司表现和投资者预期可能影响价格。" },
        { rank: "4", label: "D", text: "Commodities", zh: "大宗商品", reason: "Prices can swing sharply with global supply and demand.", reasonZh: "价格可能随全球供需大幅波动。" }
      ],
      caveat: "A different order can be valid if the evidence supports it.",
      caveatZh: "如果证据支持，不同排序也可以成立。",
      writtenCheck: "Write one reason for the card you ranked highest.",
      writtenCheckZh: "为你排在最高风险的卡片写一个理由。",
      notes: [
        "Current role: custom ordered-line task for comparative risk or priority ranking.",
        "Future use: use when students must defend a low-to-high sequence rather than sort cases into categories.",
        "Review decision: keep rankingTask separate from the sort peerTask."
      ]
    },
    {
      type: "peerTask",
      taskType: "definitionRecall",
      eyebrow: "type: peerTask / definitionRecall",
      title: "Recall three definitions",
      zhTitle: "回忆三个定义",
      prompt: "Write one-sentence definitions before reveal.",
      promptZh: "先写一句定义，再揭示答案。",
      definitionItems: [
        { label: "1", term: "Share", termZh: "股票 / 股份", answer: "A share is one unit of ownership in a company, giving the shareholder a claim on part of the company's equity and, depending on the share class, certain rights such as votes or dividends.", answerZh: "股票或股份是公司所有权的一个单位，使股东对公司部分权益拥有要求权，并且视股票类别而可能享有投票权或股息等权利。" },
        { label: "2", term: "Stock code", termZh: "股票代码", answer: "A stock code is the short market identifier used to find a listed security on an exchange or market-data system.", answerZh: "股票代码是用于在交易所或市场数据系统中查找某一上市证券的简短市场识别代码。" },
        { label: "3", term: "Risk", termZh: "风险", answer: "Risk is the possibility that results, returns or prices are worse than expected.", answerZh: "风险是结果、回报或价格比预期更差的可能性。" }
      ],
      sharePrompt: "Compare one definition and improve the wording.",
      sharePromptZh: "比较一个定义，并改进表达。",
      notes: [
        "Current role: economics-derived peerTask variant for opening retrieval.",
        "Future use: use at the start of Lesson 2+ when students need to recall exact definitions.",
        "Review decision: decide whether this should stay as a peerTask variant or become a named slide type."
      ]
    },
    {
      type: "peerTask",
      taskType: "missingSentence",
      eyebrow: "type: peerTask / missingSentence",
      title: "Complete the missing explanation sentence",
      zhTitle: "补全缺失的解释句",
      prompt: "Use the first and last step to write the missing analyst sentence.",
      promptZh: "利用第一步和最后一步，写出缺失的分析句。",
      steps: [
        { label: "1", text: "The source reports a change in profit.", zh: "来源报告利润发生变化。" },
        { label: "2", text: "__________", answer: "Investors may update expectations about future returns.", zh: "投资者可能更新对未来回报的预期。" },
        { label: "3", text: "The share price may move as buying and selling pressure changes.", zh: "随着买卖压力变化，股价可能变动。" }
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: "Investors may update expectations about future returns.",
      missingSentenceAnswerZh: "投资者可能更新对未来回报的预期。",
      sharePrompt: "Read the sentence aloud and check that it explains the middle link.",
      sharePromptZh: "读出句子，并检查它是否解释了中间环节。",
      notes: [
        "Current role: economics-derived sentence-chain practice.",
        "Future use: use when students need to write one missing link in an evidence-to-judgement chain.",
        "Review decision: decide whether this adds enough value beyond flow and normal peerTask."
      ]
    },
    {
      type: "quiz",
      eyebrow: "type: quiz",
      title: "Hinge check",
      zhTitle: "关键检查",
      visual: investmentPhotos.tabletFinancialChart,
      question: "Which claim is safest after looking at a frozen share-price chart?",
      zh: "看完冻结的股价图后，哪一个说法最稳妥？",
      choices: [
        "The share is definitely a good investment.",
        "The chart shows how one share price moved in that source.",
        "The company has no risk.",
        "The latest price proves future return."
      ],
      answer: 1,
      explanation: "A chart is evidence of movement in a source. It does not prove quality, risk or future return by itself.",
      explanationZh: "图表是某个来源中的价格变化证据，但不能单独证明质量、风险或未来回报。",
      notes: [
        "Current role: clickable multiple-choice hinge check.",
        "Future use: use after a key concept when the teacher needs a fast decision.",
        "Review decision: decide whether feedback should be more visible after selection."
      ]
    },
    {
      type: "section",
      eyebrow: "Review group",
      part: "3",
      title: "Evidence and source work",
      zhTitle: "证据与来源任务",
      subtitle: "These types help students read data, sources, quote pages and comparisons.",
      notes: [
        "Current role: reset before evidence-heavy slide types.",
        "Future use: use this group when a lesson moves from terms into analyst habits.",
        "Review decision: keep, edit, replace or delete."
      ]
    },
    {
      type: "dataSnapshot",
      eyebrow: "type: dataSnapshot",
      title: "Compact facts with a task",
      zhTitle: "带任务的紧凑事实",
      visual: investmentPhotos.annualReports,
      sourceStamp: "Tencent FY2025 results | RMB billions | published 18 Mar 2026",
      focusMetrics: [
        { label: "Revenue", value: "RMB751.8bn" },
        { label: "Gross profit", value: "RMB422.6bn" },
        { label: "Gross margin", value: "56%" }
      ],
      task: "Mark what each figure shows, then name what it cannot prove alone.",
      taskZh: "标出每个数字说明什么，再写出它单独不能证明什么。",
      notes: [
        "Current role: data focus plus a task.",
        "Future use: use this when students need compact facts with a purpose.",
        "Review decision: decide whether source limitations need a built-in field."
      ]
    },
    {
      type: "conceptTriad",
      eyebrow: "type: conceptTriad",
      title: "Compare three beginner ideas",
      zhTitle: "比较三个入门概念",
      visual: investmentPhotos.businessChartsPaper,
      revealDetails: true,
      concepts: [
        {
          label: "Saving",
          tag: "Safety",
          definition: "Saving is keeping money safe and available for future use, usually with lower risk and lower expected return than investing.",
          definitionZh: "储蓄是把钱安全地保留下来以备将来使用，通常风险较低，预期回报也低于投资。",
          purpose: "Keep money available",
          risk: "Lower uncertainty"
        },
        {
          label: "Investment",
          tag: "Asset",
          definition: "Investment is putting money into an asset to seek future return while accepting possible loss.",
          definitionZh: "投资是把钱投入资产以寻求未来回报，同时接受可能发生的损失。",
          purpose: "Seek future gain",
          risk: "Value can rise or fall"
        },
        {
          label: "Speculation",
          tag: "Price bet",
          definition: "Speculation is trying to profit from uncertain price movements, often over a short time and with weaker evidence than investment analysis requires.",
          definitionZh: "投机是试图从不确定的价格变动中获利，通常时间较短，所依据的证据弱于投资分析所要求的证据。",
          purpose: "Catch a quick move",
          risk: "High uncertainty"
        }
      ],
      notes: [
        "Current role: three-way comparison with reveal details.",
        "Future use: use for closely related concepts students confuse.",
        "Review decision: decide whether the detail reveal is too dense."
      ]
    },
    {
      type: "visualGrid",
      eyebrow: "type: visualGrid",
      title: "Compare concrete assets with pictures",
      zhTitle: "用图片比较具体资产",
      prompt: "Name what each asset is, then compare liquidity and uncertainty.",
      promptZh: "说出每种资产是什么，然后比较流动性和不确定性。",
      cards: [
        {
          title: "Cash savings",
          zhTitle: "现金储蓄",
          body: "Usually liquid, with lower uncertainty.",
          bodyZh: "通常流动性较强，不确定性较低。",
          visual: investmentPhotos.assetCashSavings
        },
        {
          title: "Property",
          zhTitle: "房地产",
          body: "A physical asset that can take time to sell.",
          bodyZh: "一种出售可能需要时间的实物资产。",
          visual: investmentPhotos.assetPropertyBuilding
        },
        {
          title: "Shares",
          zhTitle: "股票",
          body: "Tradable ownership whose market price can change quickly.",
          bodyZh: "可交易的所有权单位，市场价格可能快速变化。",
          visual: investmentPhotos.assetSharesScreen
        },
        {
          title: "Commodities",
          zhTitle: "大宗商品",
          body: "Prices respond to supply, demand and expectations.",
          bodyZh: "价格会对供给、需求和预期作出反应。",
          visual: investmentPhotos.assetCommoditiesPort
        }
      ],
      notes: [
        "Current role: image-led comparison of concrete categories.",
        "Future use: keep only when the pictures help students distinguish the examples.",
        "Review decision: remove decorative image grids that do not support a comparison."
      ]
    },
    {
      type: "compare",
      eyebrow: "type: compare",
      title: "Use a T-table for a clean contrast",
      zhTitle: "用T表做清晰对比",
      mode: "fillBlanks",
      leftTitle: "Evidence-based analysis",
      leftTitleZh: "基于证据的分析",
      leftVisual: investmentPhotos.annualReports,
      leftVisualLabel: "Source evidence",
      leftVisualLabelZh: "来源证据",
      left: [
        { label: "1", text: "Starts with a dated __________.", answer: "source", zh: "从带日期的__________开始。", answerZh: "来源" },
        { label: "2", text: "Checks return, risk and __________.", answer: "price", zh: "检查回报、风险和__________。", answerZh: "价格" }
      ],
      rightTitle: "Weak opinion",
      rightTitleZh: "薄弱观点",
      rightVisual: investmentPhotos.modernTradingDesk,
      rightVisualLabel: "Unsupported view",
      rightVisualLabelZh: "缺少证据的观点",
      right: [
        { label: "1", text: "Starts with personal __________.", answer: "familiarity", zh: "从个人__________开始。", answerZh: "熟悉度" },
        { label: "2", text: "Ignores what the investor __________.", answer: "pays", zh: "忽视投资者__________了什么。", answerZh: "支付" }
      ],
      prompt: "Fill the blanks, then explain which side is stronger.",
      promptZh: "填空后，解释哪一边更有说服力。",
      notes: [
        "Current role: economics-derived compare type, adapted as a simple T-table.",
        "Future use: use when two concepts need a cleaner contrast than a criteria matrix.",
        "Review decision: decide whether this overlaps with comparisonMatrix or is useful as a simpler option."
      ]
    },
    {
      type: "classificationTask",
      eyebrow: "type: classificationTask",
      title: "Classify the evidence habit",
      zhTitle: "给证据习惯分类",
      prompt: "Classify each case using the categories already taught.",
      promptZh: "用已经学过的类别给每个案例分类。",
      categories: [
        { title: "Evidence", zhTitle: "证据", clue: "source, date, figure", visual: investmentPhotos.annualReports },
        { title: "Risk", zhTitle: "风险", clue: "what could go worse", visual: investmentPhotos.keywordDemandRiskEmptyStore },
        { title: "Weak opinion", zhTitle: "薄弱观点", clue: "claim without support", visual: investmentPhotos.modernTradingDesk }
      ],
      items: [
        { label: "A", text: "Uses a dated annual-report figure.", zh: "使用带日期的年报数据。", answer: "Evidence", answerZh: "证据", reason: "It names a source-backed fact.", reasonZh: "它说出了有来源支持的事实。" },
        { label: "B", text: "Says Tencent is famous, so it is safe.", zh: "说腾讯很有名，所以很安全。", answer: "Weak opinion", answerZh: "薄弱观点", reason: "Familiarity is not evidence of value or risk.", reasonZh: "熟悉度不是价值或风险的证据。" },
        { label: "C", text: "Asks what could reduce future profit.", zh: "询问什么可能降低未来利润。", answer: "Risk", answerZh: "风险", reason: "It checks what could go worse than expected.", reasonZh: "它检查什么可能比预期更差。" }
      ],
      sharePrompt: "Defend one classification with a reason.",
      sharePromptZh: "用理由说明一个分类。",
      notes: [
        "Current role: economics-derived classify-and-justify routine.",
        "Future use: use for evidence/opinion/risk/source-quality categories.",
        "Review decision: decide whether it should replace the sort peerTask for some tasks."
      ]
    },
    {
      type: "yesNoCheck",
      eyebrow: "type: yesNoCheck",
      title: "Yes or no: does this prove quality?",
      zhTitle: "判断：这能证明投资质量吗？",
      prompt: "Vote yes or no before revealing the reason.",
      promptZh: "先投票判断是或否，再揭示理由。",
      items: [
        { text: "A stock code proves the share is a good investment.", zh: "股票代码能证明这只股票是好投资。", answer: false, answerZh: "否", reason: "A code identifies the security; it is not a quality signal.", reasonZh: "代码识别证券，但不是质量信号。" },
        { text: "A dated source is useful evidence.", zh: "带日期的来源是有用证据。", answer: true, answerZh: "是", reason: "The date helps judge whether the evidence is current.", reasonZh: "日期帮助判断证据是否及时。" },
        { text: "One source can prove the full investment case.", zh: "一个来源能证明完整投资判断。", answer: false, answerZh: "否", reason: "A judgement still needs return, risk, price and limits.", reasonZh: "判断仍需要回报、风险、价格和局限。" }
      ],
      notes: [
        "Current role: economics-derived misconception check.",
        "Future use: use for borderline judgements where students should commit before seeing the reason.",
        "Review decision: decide whether yes/no voting adds enough value beside quiz slides."
      ]
    },
    {
      type: "sourceLens",
      eyebrow: "type: sourceLens",
      title: "Check whether the source can support the claim",
      zhTitle: "检查来源能否支持观点",
      visual: investmentPhotos.financialAnalysisDesk,
      revealAnswers: true,
      metaItems: [
        { label: "Source title", value: "Tencent FY2025 results" },
        { label: "Date", value: "18 Mar 2026" }
      ],
      checks: [
        { label: "Scope", prompt: "What can it support?", zh: "它能支持什么？", answer: "Reported company figures.", answerZh: "它能支持公司报告中的数据。" },
        { label: "Limit", prompt: "What can it not prove?", zh: "它不能证明什么？", answer: "Good value by itself.", answerZh: "它不能单独证明股票价格合理。" }
      ],
      notes: [
        "Current role: source metadata and four checks.",
        "Future use: use when students may overclaim from one source.",
        "Review decision: decide whether source checks should be shorter for classroom slides."
      ]
    },
    {
      type: "quoteMap",
      eyebrow: "type: quoteMap",
      title: "Read the quote page before the opinion",
      zhTitle: "先读报价页，再形成观点",
      visual: investmentPhotos.tradingApps,
      quoteLabel: "Classroom quote snapshot",
      quoteTitle: "Tencent | 0700.HK | HKD | date",
      revealValues: true,
      fields: [
        { label: "Company", value: "Tencent", note: "The business" },
        { label: "Code", value: "0700.HK", note: "Listed-share identifier" },
        { label: "Exchange", value: "HKEX", note: "Where it trades" },
        { label: "Price", value: "One share", note: "Not total company value" },
        { label: "Date", value: "Snapshot", note: "One point in time" },
        { label: "Currency", value: "HKD", note: "Price unit" }
      ],
      prompt: "Before reveal, point to the field that identifies the listed share.",
      promptZh: "揭示前，指出哪个字段能识别上市股票。",
      answer: "A quote page identifies a listed security and a dated price; it does not prove investment quality.",
      answerZh: "报价页能识别上市证券和带日期的价格，但不能证明投资质量。",
      notes: [
        "Current role: quote-page field map.",
        "Future use: use when students need to read ticker, exchange, date, price and currency.",
        "Review decision: decide whether six fields are too many."
      ]
    },
    {
      type: "comparisonMatrix",
      eyebrow: "type: comparisonMatrix",
      title: "Compare two choices with the same criteria",
      zhTitle: "用相同标准比较两个选择",
      visual: investmentPhotos.stockReportCalculator,
      revealCells: true,
      cornerLabel: "Criterion",
      columns: [
        { label: "Company A" },
        { label: "Company B" }
      ],
      rows: [
        { label: "Evidence", values: ["Official report", "Market data"] },
        { label: "Return", values: ["Profit growth", "Dividend yield"] },
        { label: "Risk", values: ["Competition", "Currency exposure"] }
      ],
      notes: [
        "Current role: two- or three-column criteria comparison.",
        "Future use: use for investment choices, company-versus-fund choices or strategy comparisons.",
        "Review decision: decide whether this should support student input boxes or only reveal cells."
      ]
    },
    {
      type: "evidenceSimulator",
      eyebrow: "type: evidenceSimulator",
      title: "Update the class judgement as evidence arrives",
      zhTitle: "随着证据出现更新全班判断",
      prompt: "A family has money set aside for a future goal. Vote before the evidence, then revise the class judgement after each reveal.",
      promptZh: "一个家庭为未来目标留出了一笔钱。先在证据出现前投票，然后在每次揭示后修改全班判断。",
      evidenceLabel: "Progressive evidence",
      voteLabel: "Could investment help?",
      facts: [
        { label: "Purpose and amount", labelZh: "用途和金额", value: "Home deposit · CNY 400,000", valueZh: "住房首付·400,000元人民币" },
        { label: "Time horizon", labelZh: "时间期限", value: "The goal is ten years away", valueZh: "目标将在十年后实现" },
        { label: "Access need", labelZh: "资金使用需要", value: "The date has some flexibility", valueZh: "日期具有一定灵活性" },
        { label: "Possible loss", labelZh: "可能的损失", value: "A loss could delay the purchase", valueZh: "损失可能推迟购房" }
      ],
      verdicts: [
        { id: "may-help", label: "Investment may help", labelZh: "投资可能有帮助", tone: "positive" },
        { id: "conditions-needed", label: "Conditions needed", labelZh: "需要更多条件", tone: "caution" },
        { id: "may-not-help", label: "Investment may not help", labelZh: "投资可能没有帮助", tone: "negative" }
      ],
      conclusion: {
        verdict: "may-help",
        tone: "positive",
        label: "Investment may help after the family checks the remaining conditions",
        labelZh: "家庭检查其余条件后，投资可能有帮助",
        text: "The longer, flexible horizon supports considering investment, but the family must still judge the consequence of loss and how much must remain available.",
        textZh: "较长且灵活的期限支持考虑投资，但家庭仍必须判断损失后果以及需要保持可用的资金金额。"
      },
      notes: [
        "Current role: teacher-led progressive-evidence simulation with repeated whole-class votes.",
        "Future use: use when each new fact should change or qualify a judgement.",
        "Review decision: keep the prompt, revealed facts and conclusion visible together on classroom screens."
      ]
    },
    {
      type: "catalystTimeline",
      eyebrow: "type: catalystTimeline",
      title: "Connect information to expectations",
      zhTitle: "把信息连接到预期",
      visual: investmentPhotos.financeChartWhiteboard,
      revealEffects: true,
      effectLabel: "Expectation link",
      events: [
        { date: "Step 1", title: "New information", detail: "A result, product or risk event appears.", detailZh: "出现业绩、产品或风险事件。", effect: "Investors update expectations.", effectZh: "投资者更新预期。" },
        { date: "Step 2", title: "Market reaction", detail: "Buying or selling pressure changes.", detailZh: "买入或卖出压力发生变化。", effect: "The price may move.", effectZh: "价格可能发生变化。" },
        { date: "Step 3", title: "Evidence check", detail: "A second source tests the story.", detailZh: "第二个来源检验这个解释。", effect: "The claim becomes more careful.", effectZh: "观点会变得更谨慎。" }
      ],
      notes: [
        "Current role: event-to-expectation timeline.",
        "Future use: use for price movement, news, results, risk events or market reactions.",
        "Review decision: decide whether the timeline should be horizontal or shorter."
      ]
    },
    {
      type: "calculationDesk",
      eyebrow: "type: calculationDesk",
      title: "Show the calculation without hiding the judgement",
      zhTitle: "展示计算，但不隐藏判断",
      visual: investmentPhotos.stockReportCalculator,
      formula: "% change = change / old price x 100",
      rows: [
        { label: "Old price", value: "HKD 310" },
        { label: "New price", value: "HKD 403" }
      ],
      worked: "93 / 310 x 100 = 30.0%",
      workedZh: "计算：93 / 310 x 100 = 30.0%。",
      answer: "HKD 250 to HKD 300 is 20.0%.",
      answerZh: "从250港元到300港元是20.0%。",
      notes: [
        "Current role: formula, inputs, worked example, try-it task and answer reveal.",
        "Future use: use for simple calculations with a visible method.",
        "Review decision: decide whether calculator rows are large enough on phone."
      ]
    },
    {
      type: "section",
      eyebrow: "Review group",
      part: "4",
      title: "Judgement, risk and output",
      zhTitle: "判断、风险与输出",
      subtitle: "These types support stronger written analysis and exam rehearsal.",
      notes: [
        "Current role: reset before judgement and output slide types.",
        "Future use: section titles should make the final student output clear.",
        "Review decision: keep, edit, replace or delete."
      ]
    },
    {
      type: "analystBoard",
      eyebrow: "type: analystBoard",
      title: "What is missing from the weak judgement?",
      zhTitle: "这个弱判断缺少什么？",
      visual: investmentPhotos.financialAnalysisDesk,
      revealBlocks: true,
      blocks: [
        {
          label: "Evidence",
          title: "What do we know?",
          body: "Use one dated source fact before making a claim.",
          zh: "提出观点前，先使用一个带日期的来源事实。"
        },
        {
          label: "Expectation",
          title: "What might change?",
          body: "Explain why future profit, demand or risk could change.",
          zh: "解释未来利润、需求或风险可能怎样变化。"
        },
        {
          label: "Price paid",
          title: "What is already priced in?",
          body: "A good company can still be an expensive share.",
          zh: "好公司仍可能是一只价格偏高的股票。"
        }
      ],
      prompt: "Before reveal: which block is missing from the weak judgement?",
      promptZh: "揭示前：这个弱判断缺少哪一块？",
      notes: [
        "Current role: three evidence blocks plus missing-block prompt.",
        "Future use: use for output rehearsal before paragraph writing.",
        "Review decision: decide whether three cards work better than a matrix."
      ]
    },
    {
      type: "riskRegister",
      eyebrow: "type: riskRegister",
      title: "A strong company can still be a risky share",
      zhTitle: "强公司仍可能是有风险的股票",
      visual: investmentPhotos.shippingPort,
      revealEffects: true,
      effectLabel: "Effect link",
      table: [
        ["Risk", "Investor question", "Likely effect"],
        ["Competition", "Can rivals reduce future profit?", "Lower expected profit may reduce valuation."],
        ["Currency", "Are costs and revenue in different currencies?", "Exchange-rate changes can affect returns."],
        ["Regulation", "Could rules change the business model?", "Policy risk can change expectations."],
        ["Price paid", "Is good news already priced in?", "A strong company may still disappoint investors."]
      ],
      prompt: "Choose one risk and complete: risk -> future profit or expectations -> price paid.",
      promptZh: "选择一个风险并完成：风险 -> 未来利润或预期 -> 支付价格。",
      notes: [
        "Current role: risk categories with revealed effect links.",
        "Future use: use when risk needs to be explicit before a judgement.",
        "Review decision: decide whether the risk question should stay visible after reveal."
      ]
    },
    {
      type: "judgementFrame",
      eyebrow: "type: judgementFrame",
      title: "Build a balanced investment judgement",
      zhTitle: "形成平衡的投资判断",
      visual: investmentPhotos.stockReportCalculator,
      revealAnswers: true,
      stages: [
        { label: "Evidence", prompt: "What source-backed fact matters?", zh: "哪个有来源支持的事实重要？", answer: "Use one dated figure, quote field or document fact.", answerZh: "使用一个带日期的数据、报价字段或文件事实。" },
        { label: "Return", prompt: "How could value or profit improve?", zh: "价值或利润可能怎样改善？", answer: "Name the possible return mechanism.", answerZh: "说出可能回报的机制。" },
        { label: "Risk", prompt: "What could go worse than expected?", zh: "什么可能比预期更差？", answer: "Name the risk and who it affects.", answerZh: "说出风险以及它影响谁。" },
        { label: "Price paid", prompt: "Why does the current price matter?", zh: "为什么当前价格重要？", answer: "Link judgement to what investors already pay.", answerZh: "把判断连接到投资者已经支付的价格。" }
      ],
      finalPrompt: "Write the final sentence with evidence, risk and price paid.",
      finalPromptZh: "用证据、风险和支付价格写出最后一句判断。",
      notes: [
        "Current role: four-stage judgement scaffold.",
        "Future use: use before longer written answers or investment memos.",
        "Review decision: decide whether this overlaps too much with analystBoard."
      ]
    },
    {
      type: "exam",
      eyebrow: "type: exam",
      title: "Output rehearsal",
      zhTitle: "输出演练",
      visual: investmentPhotos.businessChartsPaper,
      revealKeywords: true,
      prompt: "Using the evidence, explain why a familiar company is not automatically a good investment. [6]",
      zh: "利用证据解释为什么熟悉的公司不一定自动是好投资。[6]",
      keywords: ["source date", "share price", "possible return", "risk", "price paid", "judgement"],
      notes: [
        "Current role: exam-style output prompt plus keyword reveal.",
        "Future use: use after teaching and before model answer comparison.",
        "Review decision: decide whether keywords should be hidden until after an attempt."
      ]
    },
    {
      type: "modelAnswer",
      eyebrow: "type: modelAnswer",
      title: "Compare your answer with the model",
      zhTitle: "把你的答案与范例比较",
      visual: investmentPhotos.investorMeetingReport,
      cueLabel: "Comparison focus",
      cueText: "Underline evidence once and judgement twice.",
      cueTextZh: "划出一次证据，再划出两次判断。",
      paragraphs: [
        "A familiar company is not automatically a good investment because investors need evidence about the listed share, not only knowledge of the company's products.",
        "A stronger judgement also checks risk and price paid. Even if the company performs well, the current share price may already include high expectations."
      ],
      paragraphsZh: [
        "熟悉的公司不一定自动是好投资，因为投资者需要关于上市股票的证据，而不只是知道公司的产品。",
        "更强的判断还要检查风险和支付价格。即使公司表现好，当前股价也可能已经包含很高预期。"
      ],
      markNote: "A strong answer uses evidence, explains risk and reaches a conditional judgement.",
      markNoteZh: "强答案会使用证据，解释风险，并得出有条件的判断。",
      notes: [
        "Current role: revealed paragraphs for comparison and improvement.",
        "Future use: use after students write first, not before.",
        "Review decision: decide whether paragraph reveal should support sentence-by-sentence annotation."
      ]
    },
    {
      type: "answer",
      eyebrow: "type: answer / exit ticket variant",
      title: "Exit ticket",
      zhTitle: "离堂小测",
      mode: "fillBlanks",
      items: [
        { prompt: "The slide type I would keep is __________.", answer: "name one type", zh: "我会保留的幻灯片类型是__________。", answerZh: "说出一个类型" },
        { prompt: "The slide type I would edit first is __________.", answer: "name one type", zh: "我会优先修改的幻灯片类型是__________。", answerZh: "说出一个类型" },
        { prompt: "The slide type I may replace or delete is __________.", answer: "name one type", zh: "我可能替换或删除的幻灯片类型是__________。", answerZh: "说出一个类型" },
        { prompt: "One rule for future decks is __________.", answer: "write a rule", zh: "未来课件的一条规则是__________。", answerZh: "写一条规则" }
      ],
      notes: [
        "Current role: answer type becomes an exit ticket when the title includes Exit ticket.",
        "Future use: use for collectable individual output at the end of a lesson.",
        "Review decision: decide whether this variant should be split from retrieval checks."
      ]
    }
  ]
};
