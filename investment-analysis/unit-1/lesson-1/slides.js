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
        note: "Used for company identity and official investor-material context.",
        date: "Accessed 26 June 2026",
        url: "https://www.tencent.com/en-us/investors.html"
      },
      {
        label: "Yahoo Finance historical prices",
        note: "Used for the frozen five-year 0700.HK monthly share-price graph as classroom evidence.",
        date: "Accessed 2 July 2026",
        url: "https://finance.yahoo.com/quote/0700.HK/history/"
      }
    ]
  },
  handout: {
    title: "Would you buy one share in Tencent?",
    subtitle: "Unit 1 Lesson 1: What is investment analysis, and what is a share?",
    description: "Start with a familiar company, then decide what evidence is needed before judging one share.",
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
              { label: "Initial answer", prompt: "Would you buy one share in Tencent? Why or why not?", lines: 3 },
              { label: "Missing evidence", prompt: "What would you need to know before making a careful judgement?", lines: 3 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Source box",
        instruction: "Record the classroom evidence before using it.",
        blocks: [
          {
            type: "facts",
            items: [
              { label: "Company", value: "Tencent Holdings Limited" },
              { label: "Listed share", value: "0700.HK" },
              { label: "Exchange", value: "Hong Kong Stock Exchange" },
              { label: "Company source", value: "Tencent investor relations" },
              { label: "Graph source", value: "Yahoo Finance historical prices" },
              { label: "Graph accessed", value: "2 Jul 2026" }
            ]
          },
          {
            type: "prompts",
            prompts: [
              { label: "What it shows", prompt: "What can the price graph show?", lines: 2 },
              { label: "What it cannot prove", prompt: "What can the price graph not prove by itself?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Vocabulary",
        instruction: "Complete the three Lesson 1 terms.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Investment analysis", prompt: "Investment analysis uses __________ before judgement.", answer: "evidence" },
              { label: "Share", prompt: "A share is one unit of __________ in a company.", answer: "ownership" },
              { label: "Share price", prompt: "A share price is the market price of one share at one specific __________.", answer: "time" }
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Analysis or guess",
        instruction: "Classify each reason, then correct one weak reason.",
        blocks: [
          {
            type: "cases",
            cases: [
              { label: "A", text: "Tencent is famous, so I would buy.", answer: "weak reason" },
              { label: "B", text: "The line moved up, so I would buy now.", answer: "price guess" },
              { label: "C", text: "I need dated evidence about the share before judging.", answer: "investment analysis" }
            ]
          },
          {
            type: "sentence",
            label: "Correction sentence",
            prompt: "Rewrite one weak reason so it becomes an investment-analysis question.",
            keywords: ["Tencent", "one share", "evidence", "price", "not enough yet"],
            lines: 3
          }
        ]
      },
      {
        label: "5",
        title: "Explain",
        instruction: "Plan a 4-mark explanation before writing the final answer.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Point 1", prompt: "Why is knowing Tencent not enough?", lines: 2 },
              { label: "Point 2", prompt: "What does one share mean?", lines: 2 },
              { label: "Point 3", prompt: "What can the share price show?", lines: 2 },
              { label: "Point 4", prompt: "What evidence is still missing?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "6",
        title: "Individual written output",
        instruction: "Return to the opening question with a careful answer.",
        blocks: [
          {
            type: "writing",
            question: "Explain why knowing Tencent is not enough reason to buy one share. [4]",
            keywords: ["familiar company", "one share", "share price", "evidence", "not a recommendation"],
            lines: 8
          }
        ]
      }
    ],
    sources: "Tencent price graph: Yahoo Finance monthly historical prices, accessed 2 Jul 2026. Tencent company identity: Tencent investor relations, accessed 26 Jun 2026. Frozen classroom evidence only; no personal investment recommendation."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 1",
      title: "Would you buy one share in Tencent?",
      zhTitle: "你会买一股腾讯吗？",
      question: "Tencent is a familiar company. Is that enough reason to buy one share?",
      questionZh: "腾讯是一家熟悉的公司。这足以成为买入一股的理由吗？",
      visual: investmentPhotos.lesson1TencentBinhaiBuilding01,
      notes: [
        "Start with a quick vote. Students should answer before any definition appears.",
        "Stress that this is a classroom question about analysis, not personal investment advice."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Starter",
      title: "Give your first answer",
      zhTitle: "先给出你的第一判断",
      question: "Would you buy one share in Tencent today? Give one reason only.",
      zh: "如果是今天，你会买一股腾讯吗？只给出一个理由。",
      revealTitle: "A reason is not analysis yet",
      answer: "A first answer is useful because it reveals what evidence is missing. Familiarity, a product you know, or a price movement is not enough by itself.",
      answerZh: "第一判断很有用，因为它能显示还缺少哪些证据。熟悉公司、认识产品或看到价格变化，本身都还不够。",
      visual: investmentPhotos.lesson1TencentSeafrontSiteVisit13,
      notes: "Collect two yes answers and two no answers. Do not correct the class yet; use the reasons to motivate the lesson."
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本节课结束时，你能够",
      phases: ["Decide", "Define", "Use"],
      bullets: [
        "explain why a buy answer needs evidence",
        "define investment analysis and a share",
        "explain what a share price can and cannot prove"
      ],
      zhBullets: [
        "解释为什么买入判断需要证据",
        "定义投资分析和一股股票",
        "解释股价能证明什么、不能证明什么"
      ],
      notes: "Keep exactly three objectives. Risk-return is preview language only, not a formal Lesson 1 objective."
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "A buy answer needs evidence",
      zhTitle: "买入判断需要证据",
      notes: "Cycle 1: turn the opening opinion into an evidence question."
    },
    {
      type: "visualPause",
      title: "Visual pause: Tencent company",
      visual: investmentPhotos.lesson1TencentSeafrontSiteVisit03,
      notes: [
        "Image-only pause before the first concept.",
        "Ask silently: What do you know from seeing a real company building? What do you still not know before buying one share?",
        "Bridge: a familiar company is a starting point, not an investment judgement."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "Is knowing the company enough?",
      zhTitle: "认识公司就够了吗？",
      question: "A student says: 'I use Tencent products, so I would buy the share.' What is missing?",
      zh: "一位学生说：“我用腾讯的产品，所以我会买它的股票。”这句话缺少什么？",
      revealTitle: "Familiarity is not evidence",
      answer: "The student has not checked what one share means, what price is being paid, or what dated evidence supports the judgement.",
      answerZh: "这位学生还没有检查一股股票代表什么、要支付的价格是多少、以及哪些有日期的证据支持这个判断。",
      notes: "Students should name missing evidence before seeing the revealed answer."
    },
    {
      type: "compare",
      eyebrow: "Key distinction",
      title: "Investment analysis or weak reason?",
      zhTitle: "投资分析还是薄弱理由？",
      mode: "fillBlanks",
      leftTitle: "Investment analysis",
      leftTitleZh: "投资分析",
      rightTitle: "Weak reason",
      rightTitleZh: "薄弱理由",
      left: [
        { label: "1", text: "uses dated __________", answer: "evidence", zh: "使用有日期的证据" },
        { label: "2", text: "checks what one __________ means", answer: "share", zh: "检查一股股票代表什么" }
      ],
      right: [
        { label: "1", text: "buys because the company is __________", answer: "famous", zh: "因为公司有名就买" },
        { label: "2", text: "guesses a short-term price __________", answer: "movement", zh: "猜测短期价格变化" }
      ],
      notes: "This is the first formal contrast: analysis is a method, not a buy signal."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Investment analysis",
      term: "Investment analysis",
      termZh: "投资分析",
      definition: "Investment analysis uses <span class=\"blank invReveal\" data-answer=\"evidence\" style=\"--blank-width:10ch\"><span class=\"invBlankText\">evidence</span></span> before making a judgement.",
      definitionZh: "投资分析是在作出判断前使用证据。",
      notes: "This is deliberately simpler than the later course definition. Return and risk come later."
    },
    {
      type: "quiz",
      eyebrow: "Practice check",
      title: "Which reason is analysis?",
      zhTitle: "哪一个理由是分析？",
      question: "Which sentence is closest to investment analysis?",
      zh: "哪一句最接近投资分析？",
      choices: [
        "Tencent is famous, so I would buy.",
        "The price line moved up, so I would buy now.",
        "I need dated evidence before judging one Tencent share.",
        "My classmates know the app, so the share must be safe."
      ],
      answer: 2,
      explanation: "Correct: analysis delays judgement until evidence has been checked.",
      explanationZh: "正确：分析会在证据被检查之后才作判断。",
      notes: "Use responses to decide whether to reteach the distinction before moving to ownership."
    },
    {
      type: "section",
      eyebrow: "Part 2",
      part: "2",
      title: "What is one share?",
      zhTitle: "一股股票是什么？",
      notes: "Cycle 2: define one share before talking about price."
    },
    {
      type: "visualPause",
      title: "Visual pause: company and share",
      visual: investmentPhotos.lesson1TencentSeafrontSiteVisit25,
      notes: [
        "Image-only pause before the share definition.",
        "Ask: if you buy one share, do you own this whole company, one product, or one ownership unit?",
        "Bridge: a share is an ownership idea, not a product or the whole company."
      ]
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Share",
      term: "Share",
      termZh: "股票 / 一股",
      definition: "A share is one unit of <span class=\"blank invReveal\" data-answer=\"ownership\" style=\"--blank-width:11ch\"><span class=\"invBlankText\">ownership</span></span> in a company.",
      definitionZh: "一股股票是公司所有权中的一个单位。",
      notes: "Keep this definition short. Voting rights, ownership percentages and control are later-course topics."
    },
    {
      type: "classificationTask",
      eyebrow: "Classify",
      title: "What does one share give?",
      zhTitle: "一股股票给你什么？",
      prompt: "Classify each statement before revealing the reason.",
      promptZh: "揭示理由前，先判断每一句话。",
      categories: [
        { title: "One share", zhTitle: "一股股票", clue: "ownership unit" },
        { title: "Not one share", zhTitle: "不是一股股票", clue: "too broad or wrong" }
      ],
      items: [
        {
          label: "A",
          text: "One ownership unit in Tencent.",
          zh: "腾讯公司中的一个所有权单位。",
          answer: "One share",
          answerZh: "一股股票",
          reason: "That is the Lesson 1 definition of a share.",
          reasonZh: "这就是本课对一股股票的定义。"
        },
        {
          label: "B",
          text: "The whole Tencent company.",
          zh: "整家腾讯公司。",
          answer: "Not one share",
          answerZh: "不是一股股票",
          reason: "One share is not ownership of the whole company.",
          reasonZh: "一股股票不是拥有整家公司。"
        },
        {
          label: "C",
          text: "A Tencent product or app.",
          zh: "腾讯的一个产品或应用。",
          answer: "Not one share",
          answerZh: "不是一股股票",
          reason: "Using a product is different from owning a share.",
          reasonZh: "使用产品不同于持有一股股票。"
        }
      ],
      sharePrompt: "Say the full sentence: A share is one unit of ownership in a company.",
      sharePromptZh: "完整说出这句话：一股股票是公司所有权中的一个单位。",
      notes: "This check should catch the whole-company and product-user misconceptions."
    },
    {
      type: "section",
      eyebrow: "Part 3",
      part: "3",
      title: "What can the price show?",
      zhTitle: "价格能显示什么？",
      notes: "Cycle 3: use the chart only after the class has a reason to need evidence."
    },
    {
      type: "priceChart",
      eyebrow: "Evidence",
      title: "Tencent share-price evidence",
      zhTitle: "腾讯股价证据",
      question: "What can this graph show, and what can it not prove by itself?",
      questionZh: "这张图能显示什么？它本身不能证明什么？",
      ticker: "0700.HK",
      data: investmentMarketData.tencentFiveYearSharePrice,
      yMin: 150,
      yMax: 700,
      sourceStamp: "Tencent 0700.HK monthly closes | Yahoo Finance | accessed 2 Jul 2026",
      alt: "Five-year line chart of Tencent 0700.HK monthly share-price closes.",
      notes: [
        "This is now evidence, not the opening hook.",
        "Students should separate what the graph shows from what it cannot prove."
      ]
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Share price",
      term: "Share price",
      termZh: "股价",
      definition: "A share price is the market price of one share at a specific <span class=\"blank invReveal\" data-answer=\"time\" style=\"--blank-width:7ch\"><span class=\"invBlankText\">time</span></span>.",
      definitionZh: "股价是在特定时间一股股票的市场价格。",
      notes: "Emphasise one share at one time. It is not revenue, profit or total company value."
    },
    {
      type: "yesNoCheck",
      eyebrow: "Check",
      title: "What can one price graph prove?",
      zhTitle: "一张价格图能证明什么？",
      prompt: "Vote yes or no before reveal.",
      promptZh: "揭示前先投票：是还是不是。",
      items: [
        {
          text: "It shows prices of one Tencent share at different times.",
          zh: "它显示腾讯一股股票在不同时间的价格。",
          answer: true,
          answerZh: "是",
          reason: "That is what a share-price graph can show.",
          reasonZh: "这正是股价图可以显示的内容。"
        },
        {
          text: "It proves Tencent is a good investment.",
          zh: "它证明腾讯是一项好投资。",
          answer: false,
          answerZh: "不是",
          reason: "A price graph alone does not prove quality, value or risk.",
          reasonZh: "单独一张价格图不能证明质量、价值或风险。"
        },
        {
          text: "It can be one piece of evidence in investment analysis.",
          zh: "它可以成为投资分析中的一项证据。",
          answer: true,
          answerZh: "是",
          reason: "It matters, but it must be combined with other evidence.",
          reasonZh: "它很重要，但必须和其他证据一起使用。"
        }
      ],
      notes: "This prevents students from overreading the Tencent chart."
    },
    {
      type: "flow",
      eyebrow: "Output rehearsal",
      title: "From first question to careful answer",
      zhTitle: "从第一问题到谨慎回答",
      flowStyle: "sequence",
      steps: [
        { text: "Start with the question: would you buy one __________?", answer: "share", zh: "从问题开始：你会买一股股票吗？" },
        { text: "Do not answer only because Tencent is __________.", answer: "familiar", zh: "不要只因为熟悉腾讯就回答。" },
        { text: "Define a share as one unit of __________.", answer: "ownership", zh: "把一股股票定义为一个所有权单位。" },
        { text: "Use the share price as one piece of __________.", answer: "evidence", zh: "把股价作为一项证据使用。" },
        { text: "Say what evidence is still __________.", answer: "missing", zh: "说明还缺少哪些证据。" }
      ],
      notes: "Students rehearse the final written structure before the exam-style question."
    },
    {
      type: "exam",
      eyebrow: "Exam practice",
      title: "Explain why knowing Tencent is not enough reason to buy one share. [4]",
      zhTitle: "解释为什么认识腾讯不足以成为买入一股的理由。[4]",
      prompt: "Explain why knowing Tencent is not enough reason to buy one share. [4]",
      zh: "解释为什么认识腾讯不足以成为买入一股腾讯股票的理由。[4]",
      keywordLabel: "Use these points",
      keywords: [
        "familiar company",
        "one share = ownership unit",
        "share price = one piece of evidence",
        "more evidence is needed"
      ],
      revealKeywords: true,
      notes: "Let students plan first. Reveal keywords only after they have tried a paragraph plan."
    },
    {
      type: "modelAnswer",
      eyebrow: "Model answer",
      title: "Explain why knowing Tencent is not enough reason to buy one share. [4]",
      zhTitle: "解释为什么认识腾讯不足以成为买入一股的理由。[4]",
      cueLabel: "Compare your answer",
      cueLabelZh: "对照你的答案",
      cueText: "Check whether your answer uses the company, the share, the price and missing evidence.",
      cueTextZh: "检查你的答案是否使用了公司、一股股票、价格和缺失证据。",
      paragraphs: [
        "Knowing Tencent is only a starting point, not a reason to buy. One share is one unit of ownership, not the whole company or a guaranteed profit. The price graph is one piece of evidence about what one share cost at a specific time, so a careful analyst still needs more dated evidence before making a judgement."
      ],
      paragraphsZh: [
        "认识腾讯只是起点，不是买入理由。一股股票是一个所有权单位，不是整家公司或保证利润；价格图只是一项证据，所以仍需要更多有日期的证据。"
      ],
      markNote: "This earns marks by explaining the familiar-company problem, defining one share, using price evidence carefully, and stating the need for more evidence.",
      markNoteZh: "这个答案通过解释熟悉公司的问题、定义一股股票、谨慎使用价格证据，并说明需要更多证据来得分。",
      notes: "Reveal one paragraph at a time and ask students to improve one sentence in their own answer."
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Exit ticket",
      zhTitle: "离堂小测",
      mode: "fillBlanks",
      items: [
        { prompt: "I cannot answer the Tencent question yet because I need __________.", answer: "evidence", zh: "我还不能回答腾讯问题，因为我需要证据。" },
        { prompt: "One share means one unit of __________.", answer: "ownership", zh: "一股股票代表一个所有权单位。" },
        { prompt: "A price graph is useful, but it is not __________ by itself.", answer: "enough", zh: "价格图有用，但它本身还不够。" }
      ],
      notes: "Collect the handout paragraph after this check."
    }
  ]
};
