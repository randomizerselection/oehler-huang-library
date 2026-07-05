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
        note: "Used for the frozen five-year 0700.HK monthly share-price graph as a classroom observation source.",
        date: "Accessed 2 July 2026",
        url: "https://finance.yahoo.com/quote/0700.HK/history/"
      }
    ]
  },
  handout: {
    title: "Investment analysis starter sheet",
    subtitle: "Unit 1 Lesson 1: What is investment analysis, and what is a share?",
    description: "Distinguish investment analysis from short-term speculation, define the first share vocabulary, and explain why return, risk and share price must be considered together.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Source box",
        instruction: "Record the classroom source before making any judgement.",
        blocks: [
          {
            type: "facts",
            items: [
              { label: "Company", value: "Tencent Holdings Limited" },
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
              { label: "Observation", prompt: "What do you notice about the Tencent share-price line?", lines: 2 },
              { label: "Question", prompt: "What evidence would you need before judging the share?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Investment or speculation",
        instruction: "Classify each statement, then correct one weak statement.",
        blocks: [
          {
            type: "cases",
            cases: [
              { label: "A", text: "I will buy because the line might jump next week.", answer: "speculation" },
              { label: "B", text: "I need evidence about possible return, risk and price before judging.", answer: "investment analysis" },
              { label: "C", text: "Tencent is famous, so the share must be safe.", answer: "weak opinion" }
            ]
          },
          {
            type: "sentence",
            label: "Correction sentence",
            prompt: "Rewrite one weak statement so it becomes an investment-analysis question.",
            keywords: ["evidence", "possible return", "risk", "share price"],
            lines: 3
          }
        ]
      },
      {
        label: "3",
        title: "Vocabulary",
        instruction: "Complete the definitions. These are the Lesson 1 core terms.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Investment analysis", prompt: "Investment analysis uses evidence to study possible return, risk and __________ before judgement.", answer: "price" },
              { label: "Asset", prompt: "An asset is something owned that may have __________.", answer: "value" },
              { label: "Share", prompt: "A share is one unit of __________ in a company.", answer: "ownership" },
              { label: "Possible return", prompt: "Possible return is the gain an investor hopes to __________.", answer: "earn" },
              { label: "Risk", prompt: "Risk is the possibility that results are worse than __________.", answer: "expected" },
              { label: "Share price", prompt: "A share price is the market price of one __________ at a specific time.", answer: "share" }
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Asset, share and share price",
        instruction: "Keep the three ideas separate before judging the graph.",
        blocks: [
          {
            type: "table",
            columns: ["Idea", "Meaning", "What it is not"],
            rows: [
              { metric: "Asset", value: "Something owned that may have value", shows: "Owned item with possible value", limits: "Not automatically profitable" },
              { metric: "Share", value: "One ownership unit in a company", shows: "A claim on one unit of ownership", limits: "Not the whole company" },
              { metric: "Share price", value: "Market price of one share at one time", shows: "What buyers and sellers paid then", limits: "Not revenue, profit or total company value" }
            ]
          }
        ]
      },
      {
        label: "5",
        title: "Risk and return",
        instruction: "Explain why possible return is incomplete without risk.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Return", prompt: "How could an investor gain from owning a share?", lines: 2 },
              { label: "Risk", prompt: "What could make the result worse than expected?", lines: 2 },
              { label: "Trade-off", prompt: "Why should return and risk be judged together?", lines: 3 }
            ]
          }
        ]
      },
      {
        label: "6",
        title: "Individual written output",
        instruction: "Submit one careful Lesson 1 analyst sentence.",
        blocks: [
          {
            type: "writing",
            question: "Write three sentences: define investment analysis, define one share, and explain why possible return must be judged with risk and share price.",
            keywords: ["investment analysis", "evidence", "share", "possible return", "risk", "share price", "not speculation"],
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
      title: "What is investment analysis, and what is a share?",
      zhTitle: "什么是投资分析？什么是股票？",
      visual: investmentPhotos.modernTradingDesk,
      notes: [
        "This is a vocabulary-and-boundary starter lesson.",
        "Keep the focus on concepts, not advice or stock picking."
      ]
    },
    {
      type: "priceChart",
      eyebrow: "Case hook",
      title: "What is investment?",
      zhTitle: "什么是投资？",
      question: "Look at the Tencent price line. What would make buying one share investment analysis rather than short-term speculation?",
      questionZh: "看腾讯股价线。什么会使买入一股成为投资分析，而不是短期投机？",
      ticker: "0700.HK",
      data: investmentMarketData.tencentFiveYearSharePrice,
      yMin: 150,
      yMax: 700,
      sourceStamp: "Tencent 0700.HK monthly closes | Yahoo Finance | accessed 2 Jul 2026",
      alt: "Five-year line chart of Tencent 0700.HK monthly share-price closes.",
      notes: [
        "Use the chart as the hook only. The lesson question is not whether Tencent is a good investment.",
        "Students should say that investment analysis needs evidence about possible return, risk and price."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本节课结束时，你能够",
      phases: ["Separate", "Define", "Define", "Explain", "Explain"],
      bullets: [
        "distinguish between investment and speculation",
        "define investment analysis",
        "define asset and share",
        "explain risk and return",
        "explain what a share price is"
      ],
      zhBullets: [
        "区分投资与投机",
        "定义投资分析",
        "定义资产和股票",
        "解释风险与回报",
        "解释什么是股价"
      ],
      notes: "These five visible objectives are the whole Lesson 1 contract."
    },
    {
      type: "visualPause",
      title: "Speculator and investor race",
      zhTitle: "投机者与投资者赛跑",
      visual: investmentPhotos.speculatorInvestorRace,
      notes: [
        "Project the image without text. Ask students silently: Which figure looks fast? Which figure looks steady?",
        "Bridge: now separate short-term speculation from investment analysis."
      ]
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "Investment is not short-term speculation",
      zhTitle: "投资不是短期投机",
      notes: "Cycle 1: separate the course method from price-jump guessing."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "Is this investment or speculation?",
      zhTitle: "这是投资还是投机？",
      visual: investmentPhotos.smartphoneMarketChart,
      question: "A student says: 'The line might jump next week, so buy now.' What is missing?",
      zh: "一位学生说：“这条线下周可能会上涨，所以现在买。”这句话缺少什么？",
      revealTitle: "A price guess is not analysis",
      answer: "It is missing evidence about possible return, risk and price. It guesses a short-term movement instead of analysing the investment.",
      answerZh: "它缺少关于可能回报、风险和价格的证据。它是在猜测短期价格变动，而不是分析投资。",
      notes: "Students should identify missing evidence before the reveal."
    },
    {
      type: "compare",
      eyebrow: "Key distinction",
      title: "Investment analysis vs speculation",
      zhTitle: "投资分析与投机",
      leftTitle: "Investment analysis",
      leftTitleZh: "投资分析",
      rightTitle: "Short-term speculation",
      rightTitleZh: "短期投机",
      left: [
        { label: "1", text: "Checks dated evidence.", zh: "检查有日期的证据。" },
        { label: "2", text: "Studies return, risk and price.", zh: "研究回报、风险和价格。" },
        { label: "3", text: "Waits when evidence is missing.", zh: "证据不足时先等待。" }
      ],
      right: [
        { label: "1", text: "Chases short-term price.", zh: "追逐短期价格。" },
        { label: "2", text: "Follows tips, fame or feelings.", zh: "跟随消息、名气或感觉。" },
        { label: "3", text: "Jumps to buy or sell too fast.", zh: "过快跳到买或卖。" }
      ],
      prompt: "Which side is this course?",
      promptZh: "本课程采用哪一边的方法？",
      notes: "Frame speculation as the mistake to avoid."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Investment analysis",
      term: "Investment analysis",
      termZh: "投资分析",
      definition: "Investment analysis uses <span class=\"blank invReveal\" data-answer=\"evidence\" style=\"--blank-width:10ch\"><span class=\"invBlankText\">evidence</span></span> to study possible return, risk and price before making a judgement.",
      definitionZh: "投资分析是在作出判断之前，用证据研究可能回报、风险和价格。",
      notes: "Make students write the definition and underline evidence, return, risk and price."
    },
    {
      type: "quiz",
      eyebrow: "Practice check",
      title: "Check 1: investment or speculation?",
      zhTitle: "检查1：投资还是投机？",
      visual: investmentPhotos.investorMeetingReport,
      question: "Which sentence is investment analysis?",
      zh: "哪一句是投资分析？",
      choices: [
        "Tencent is famous, so the share must be safe.",
        "The line might jump next week, so buy now.",
        "I need evidence about possible return, risk and price before judging.",
        "A high price always means a good company."
      ],
      answer: 2,
      explanation: "Correct: investment analysis delays judgement until evidence about possible return, risk and price is checked.",
      explanationZh: "正确：投资分析会等到核查可能回报、风险和价格的证据之后再作判断。",
      notes: "Use responses to decide whether to reteach the distinction."
    },
    {
      type: "section",
      eyebrow: "Part 2",
      part: "2",
      title: "Assets and shares are ownership ideas",
      zhTitle: "资产和股票是所有权概念",
      notes: "Cycle 2: define asset and share cleanly before adding price."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Asset",
      term: "Asset",
      termZh: "资产",
      definition: "An asset is something owned that may have <span class=\"blank invReveal\" data-answer=\"value\" style=\"--blank-width:8ch\"><span class=\"invBlankText\">value</span></span>.",
      definitionZh: "资产是被拥有且可能有价值的东西。",
      notes: "Examples can include cash, a building, a machine, a brand or a share."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Share",
      term: "Share",
      termZh: "股票 / 股份",
      definition: "A share is one unit of <span class=\"blank invReveal\" data-answer=\"ownership\" style=\"--blank-width:11ch\"><span class=\"invBlankText\">ownership</span></span> in a company.",
      definitionZh: "一股股票是公司所有权中的一个单位。",
      notes: "Keep this definition simple. Voting rights and ownership percentages come later."
    },
    {
      type: "discussion",
      eyebrow: "Practice check",
      title: "What does one share mean?",
      zhTitle: "一股股票意味着什么？",
      visual: investmentPhotos.shareholderMeeting,
      question: "If you own one Tencent share, do you own the whole company, one product, or one ownership unit?",
      zh: "如果你拥有一股腾讯股票，你拥有的是整家公司、一个产品，还是一个所有权单位？",
      revealTitle: "One share is one ownership unit",
      answer: "One share is one ownership unit in a company. It is not the whole company, one product or guaranteed profit.",
      answerZh: "一股股票是公司中的一个所有权单位。它不是整家公司、一个产品，也不是保证利润。",
      notes: "This checks the core share misconception."
    },
    {
      type: "classificationTask",
      eyebrow: "Hinge check",
      title: "Check 2: asset, share or not?",
      zhTitle: "检查2：资产、股票还是不是？",
      prompt: "Classify each item before revealing the reason.",
      promptZh: "揭示理由前，先给每一项分类。",
      categories: [
        { title: "Asset", zhTitle: "资产", clue: "owned and may have value" },
        { title: "Share", zhTitle: "股票", clue: "ownership unit in a company" },
        { title: "Not enough information", zhTitle: "信息不足", clue: "cannot classify safely" }
      ],
      items: [
        {
          label: "A",
          text: "One Tencent 0700.HK share.",
          zh: "一股腾讯0700.HK股票。",
          answer: "Share",
          answerZh: "股票",
          reason: "It is one ownership unit in Tencent.",
          reasonZh: "它是腾讯公司的一个所有权单位。"
        },
        {
          label: "B",
          text: "A phone app used by customers.",
          zh: "顾客使用的一款手机应用。",
          answer: "Not enough information",
          answerZh: "信息不足",
          reason: "Using a product does not tell us who owns it or whether it is an asset for that person.",
          reasonZh: "使用产品不能说明谁拥有它，也不能说明它是否是这个人的资产。"
        },
        {
          label: "C",
          text: "Cash owned by a household.",
          zh: "一个家庭拥有的现金。",
          answer: "Asset",
          answerZh: "资产",
          reason: "Cash is owned and has value.",
          reasonZh: "现金被拥有并且有价值。"
        }
      ],
      sharePrompt: "Defend one classification using the words owned, value or ownership.",
      sharePromptZh: "用“拥有、价值或所有权”说明一个分类理由。",
      notes: "This keeps asset and share precise before the price concept."
    },
    {
      type: "section",
      eyebrow: "Part 3",
      part: "3",
      title: "Risk and return must be judged together",
      zhTitle: "风险和回报必须一起判断",
      notes: "Cycle 3: explain possible return, risk and the beginner risk-return trade-off."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Possible return",
      term: "Possible return",
      termZh: "可能回报",
      definition: "Possible return is the gain an investor hopes to <span class=\"blank invReveal\" data-answer=\"earn\" style=\"--blank-width:7ch\"><span class=\"invBlankText\">earn</span></span> from an investment.",
      definitionZh: "可能回报是投资者希望从投资中获得的收益。",
      notes: "Return is possible, not guaranteed."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Risk",
      term: "Risk",
      termZh: "风险",
      definition: "Risk is the possibility that results, returns or prices are worse than <span class=\"blank invReveal\" data-answer=\"expected\" style=\"--blank-width:10ch\"><span class=\"invBlankText\">expected</span></span>.",
      definitionZh: "风险是结果、回报或价格比预期更差的可能性。",
      notes: "Keep risk broad. Detailed risk categories come later."
    },
    {
      type: "compare",
      eyebrow: "Key idea",
      title: "Risk and return belong together",
      zhTitle: "风险和回报要一起看",
      leftTitle: "Possible return",
      leftTitleZh: "可能回报",
      rightTitle: "Risk",
      rightTitleZh: "风险",
      left: [
        { label: "1", text: "What gain might the investor earn?", zh: "投资者可能获得什么收益？" },
        { label: "2", text: "What improvement would support that gain?", zh: "什么改善会支持这个收益？" }
      ],
      right: [
        { label: "1", text: "What could be worse than expected?", zh: "什么可能比预期更差？" },
        { label: "2", text: "What could reduce or remove the return?", zh: "什么可能减少或消除回报？" }
      ],
      prompt: "Why is a high possible return incomplete without risk?",
      promptZh: "为什么高可能回报如果没有风险分析就是不完整的？",
      notes: "Teach the simple rule: higher possible return usually comes with higher uncertainty, but higher risk does not guarantee return."
    },
    {
      type: "yesNoCheck",
      eyebrow: "Hinge check",
      title: "Check 3: risk and return",
      zhTitle: "检查3：风险与回报",
      prompt: "Vote yes or no before reveal.",
      promptZh: "揭示前先投票：是还是不是。",
      items: [
        {
          text: "Possible return means guaranteed profit.",
          zh: "可能回报意味着保证利润。",
          answer: false,
          answerZh: "不是",
          reason: "Possible return is hoped for, not guaranteed.",
          reasonZh: "可能回报是希望获得的，不是保证的。"
        },
        {
          text: "Risk means the result may be worse than expected.",
          zh: "风险意味着结果可能比预期更差。",
          answer: true,
          answerZh: "是",
          reason: "This is the Lesson 1 risk definition.",
          reasonZh: "这就是第一课的风险定义。"
        },
        {
          text: "A careful analyst considers return and risk together.",
          zh: "谨慎的分析者会一起考虑回报和风险。",
          answer: true,
          answerZh: "是",
          reason: "Return without risk is an incomplete judgement.",
          reasonZh: "没有风险分析的回报是不完整的判断。"
        }
      ],
      notes: "This is the formative check for the risk-return objective."
    },
    {
      type: "section",
      eyebrow: "Part 4",
      part: "4",
      title: "A share price is one share at one time",
      zhTitle: "股价是在某一时间的一股价格",
      notes: "Cycle 4: define share price and connect it back to the Tencent hook."
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Share price",
      term: "Share price",
      termZh: "股价",
      definition: "A share price is the market price of one <span class=\"blank invReveal\" data-answer=\"share\" style=\"--blank-width:7ch\"><span class=\"invBlankText\">share</span></span> at a specific time.",
      definitionZh: "股价是在特定时间一股股票的市场价格。",
      notes: "Emphasise one share at one time. It is not revenue, profit or total company value."
    },
    {
      type: "answer",
      eyebrow: "Practice check",
      title: "Share price check",
      zhTitle: "股价检查",
      mode: "fillBlanks",
      items: [
        { prompt: "A share price is for one __________.", answer: "share", zh: "股价对应的是一股股票。" },
        { prompt: "A share price is recorded at one specific __________.", answer: "time", zh: "股价是在一个特定时间记录的。" },
        { prompt: "A share price is not the total value of the whole __________.", answer: "company", zh: "股价不是整家公司的总价值。" }
      ],
      notes: "This is direct retrieval from the term slide."
    },
    {
      type: "yesNoCheck",
      eyebrow: "Hinge check",
      title: "Check 4: what can a share price prove?",
      zhTitle: "检查4：股价能证明什么？",
      prompt: "Vote yes or no before reveal. Which claims are safe from one share price?",
      promptZh: "揭示前先投票：从一个股价可以稳妥得出哪些说法？",
      items: [
        {
          text: "It shows the market price of one share at that time.",
          zh: "它显示那个时间一股股票的市场价格。",
          answer: true,
          answerZh: "是",
          reason: "That is exactly what a share price means.",
          reasonZh: "这正是股价的含义。"
        },
        {
          text: "It proves the company is a good investment.",
          zh: "它证明这家公司是好投资。",
          answer: false,
          answerZh: "不是",
          reason: "A share price alone does not prove return, risk or value.",
          reasonZh: "单独一个股价不能证明回报、风险或价值。"
        },
        {
          text: "It can be one piece of evidence for analysis.",
          zh: "它可以成为分析中的一项证据。",
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
      title: "Connect the five lesson ideas",
      zhTitle: "连接本课五个概念",
      visual: investmentPhotos.financeChartWhiteboard,
      flowStyle: "sequence",
      steps: [
        { text: "Separate investment analysis from short-term __________.", answer: "speculation", zh: "区分投资分析和短期投机。" },
        { text: "Use __________ before judgement.", answer: "evidence", zh: "判断前使用证据。" },
        { text: "Define a share as one unit of __________.", answer: "ownership", zh: "把股票定义为一个所有权单位。" },
        { text: "Judge possible return together with __________.", answer: "risk", zh: "把可能回报和风险一起判断。" },
        { text: "Read share price as one share at one __________.", answer: "time", zh: "把股价理解为某一时间的一股价格。" }
      ],
      notes: "Students rehearse the final answer before the individual output."
    },
    {
      type: "peerTask",
      eyebrow: "Output rehearsal",
      title: "Build a careful analyst sentence",
      zhTitle: "写出谨慎的分析句",
      taskType: "missingSentence",
      missingSentenceStep: 2,
      steps: [
        { text: "Choose one starting claim about Tencent.", zh: "选择一个关于腾讯的起始观点。" },
        {
          text: "Tencent is familiar, but investment analysis needs __________ about possible return, risk and the current share price before judgement.",
          zh: "腾讯很熟悉，但投资分析在判断前需要关于可能回报、风险和当前股价的证据。"
        },
        { text: "Remove any buy, sell or next-week prediction.", zh: "删除任何买、卖或下周预测。" }
      ],
      missingSentenceAnswer: "source-dated evidence",
      missingSentenceAnswerZh: "有来源和日期的证据",
      notes: "Pair talk is allowed. The final sentence must be individual."
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Exit ticket",
      zhTitle: "离堂小测",
      mode: "fillBlanks",
      items: [
        { prompt: "Investment analysis differs from short-term stock __________.", answer: "speculation", zh: "投资分析不同于短期股票投机。" },
        { prompt: "Investment analysis uses __________ before judgement.", answer: "evidence", zh: "投资分析在判断前使用证据。" },
        { prompt: "A share is one unit of __________ in a company.", answer: "ownership", zh: "一股股票是公司中的一个所有权单位。" },
        { prompt: "Possible return must be judged together with __________.", answer: "risk", zh: "可能回报必须和风险一起判断。" },
        { prompt: "A share price is one share at a specific __________.", answer: "time", zh: "股价是在特定时间一股股票的市场价格。" }
      ],
      notes: "Collect the handout output after the fill-blank exit check."
    }
  ]
};
