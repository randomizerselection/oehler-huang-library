window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit 1 Lesson 1: What is investment analysis?",
    sources: [
      {
        label: "Tencent investor relations",
        note: "Used only for company identity and the opening classroom judgement; the page does not prove that Tencent is a suitable investment.",
        date: "Accessed 11 July 2026",
        url: "https://www.tencent.com/en-us/investors.html"
      },
      {
        label: "Hong Kong Monetary Authority: Investment Services",
        note: "Supports the lesson habit of checking potential return, risk, possible loss, investment horizon and suitability before acting.",
        date: "Page revised 7 January 2026; accessed 11 July 2026",
        url: "https://www.hkma.gov.hk/eng/smart-consumers/investment-services/"
      }
    ]
  },
  handout: {
    title: "What is investment analysis?",
    subtitle: "Unit 1 Lesson 1",
    description: "Use the Tencent question to move from familiarity and first opinion to a judgement based on evidence, potential return, risk and investor fit.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Opening judgement",
        instruction: "Answer before definitions. Return to this answer at the end.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "First answer", prompt: "Would you buy shares in Tencent? Give one reason.", lines: 3 },
              { label: "Missing evidence", prompt: "What would you need to know before making a careful judgement?", lines: 4 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Vocabulary",
        instruction: "Complete the four Lesson 1 definitions.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Investment analysis", prompt: "Investment analysis evaluates an opportunity with evidence to judge potential return, risk and __________ before a decision.", answer: "suitability" },
              { label: "Return", prompt: "Return is the gain or __________ earned over a stated holding period.", answer: "loss" },
              { label: "Risk", prompt: "Risk is the possibility that results, returns or prices are worse than __________.", answer: "expected" },
              { label: "Investor fit", prompt: "Investor fit checks goal, time horizon, liquidity need and risk __________.", answer: "tolerance" }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Evidence check",
        instruction: "Classify what each question is mainly checking.",
        blocks: [
          {
            type: "cases",
            cases: [
              { label: "A", text: "How could the investment gain or lose value?", answer: "Potential return" },
              { label: "B", text: "What could be worse than expected?", answer: "Risk" },
              { label: "C", text: "Does this match the investor's goal and time horizon?", answer: "Investor fit" },
              { label: "D", text: "Who published the information, and when?", answer: "Evidence quality" }
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Tencent source box",
        instruction: "Record the source before using it.",
        blocks: [
          {
            type: "facts",
            items: [
              { label: "Source title", value: "Tencent investor relations" },
              { label: "Accessed", value: "11 July 2026" },
              { label: "Useful for", value: "Company identity and official investor information" },
              { label: "Cannot prove", value: "Future return, risk level, price attractiveness or investor fit" }
            ]
          }
        ]
      },
      {
        label: "5",
        title: "Misconception check",
        instruction: "Correct the weak shortcut.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Weak claim", prompt: "Tencent is familiar, so buying its shares must be suitable.", lines: 2 },
              { label: "Correction", prompt: "Explain why familiarity is not enough evidence.", lines: 4 }
            ]
          }
        ]
      },
      {
        label: "6",
        title: "Exit judgement",
        instruction: "Improve the opening answer with the Lesson 1 method.",
        blocks: [
          {
            type: "writing",
            question: "Write a Tencent next-action judgement using one source detail, one missing evidence need, one caveat and the action gather more evidence.",
            keywords: ["investment analysis", "evidence", "potential return", "risk", "investor fit", "gather more evidence"],
            lines: 8
          }
        ]
      }
    ],
    sources: "Tencent investor relations and HKMA Investment Services, accessed 11 Jul 2026. Classroom analysis only; not personal investment advice."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 1",
      title: "What is investment analysis?",
      zhTitle: "什么是投资分析？",
      prominentTitle: true,
      visual: investmentPhotos.financialAnalysisDesk,
      notes: [
        "Keep this as a clean title screen.",
        "Move directly to the Tencent judgement before teaching definitions."
      ]
    },
    {
      type: "discussion",
      eyebrow: "First judgement",
      title: "Would you buy shares in Tencent?",
      zhTitle: "你会买腾讯股票吗？",
      question: "Would you buy shares in Tencent? Give one reason.",
      questionZh: "你会买腾讯股票吗？给出一个理由。",
      revealTitle: "Familiarity is not enough evidence",
      answer: "Do not decide yet. A familiar company name does not show the potential return, risk, price paid or fit for a particular investor.",
      answerZh: "先不要作决定。熟悉的公司名称并不能说明潜在回报、风险、支付价格，或是否适合某位投资者。",
      visual: investmentPhotos.lesson1TencentBinhaiBuilding01,
      notes: [
        "Take a vote and collect reasons before reveal.",
        "Treat every reason as diagnostic evidence for what the class thinks investment analysis means."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本课结束时，你能够",
      visual: investmentPhotos.financeChartWhiteboard,
      bullets: [
        "define investment analysis using evidence, return, risk and suitability",
        "classify the missing evidence in a first investment opinion",
        "write a careful next action without giving a stock tip"
      ],
      zhBullets: [
        "用证据、回报、风险和适合性定义投资分析",
        "给初步投资观点中缺少的证据分类",
        "写出谨慎的下一步行动，而不是给出股票提示"
      ]
    },
    {
      type: "section",
      eyebrow: "Part 1",
      title: "Evidence before judgement",
      zhTitle: "先看证据，再作判断",
      notes: "Retrieval -> first attempt -> definition -> hinge check."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "What is missing from the first opinion?",
      zhTitle: "初步观点缺少什么？",
      question: "A student says, 'Tencent is famous, so its shares are a good investment.' What evidence is missing?",
      questionZh: "一名学生说：‘腾讯很有名，所以它的股票是好投资。’这个观点缺少什么证据？",
      revealTitle: "The opinion is missing return, risk and fit evidence",
      answer: "The student needs dated evidence about possible return, what could go wrong, the price paid and whether the investment fits the investor's goal and constraints.",
      answerZh: "学生需要带日期的证据，说明可能的回报、可能出现的问题、支付价格，以及这项投资是否符合投资者的目标和限制。",
      visual: investmentPhotos.lesson1ScenarioFinancialDocuments
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Investment analysis",
      term: "Investment analysis",
      termZh: "投资分析",
      keywordVisuals: [
        { label: "Evidence before judgement", labelZh: "先看证据再判断", visual: investmentPhotos.financialAnalysisDesk }
      ],
      definition: "Investment analysis is the process of evaluating an investment opportunity with evidence to judge its potential return, risk and suitability before making a decision.",
      definitionBlanks: ["potential return, risk and suitability"],
      definitionZh: "投资分析是利用证据评估投资机会的过程，在作出决定前判断其潜在回报、风险和适合性。"
    },
    {
      type: "flow",
      eyebrow: "Course method",
      title: "Three checks improve the first opinion",
      zhTitle: "三个检查改进初步观点",
      visual: investmentPhotos.businessChartsPaper,
      flowStyle: "sequence",
      steps: [
        { text: "Potential return: how could value or income change?", zh: "潜在回报：价值或收入可能如何变化？", visual: investmentPhotos.keywordDividendCheque },
        { text: "Risk: what could be worse than expected?", zh: "风险：什么结果可能比预期更差？", visual: investmentPhotos.lesson1ScenarioRedMarketLosses },
        { text: "Investor fit: does it match the goal and constraints?", zh: "投资者适合度：它是否符合目标和限制？", visual: investmentPhotos.investorMeetingReport }
      ]
    },
    {
      type: "term",
      eyebrow: "Check 1",
      title: "Return",
      term: "Return",
      termZh: "回报",
      keywordVisuals: [
        { label: "Gain, loss or income", labelZh: "收益、损失或收入", visual: investmentPhotos.keywordDividendCheque }
      ],
      definition: "Return is the gain or loss earned from an investment over a stated holding period, including price change and any income received.",
      definitionBlanks: ["gain or loss"],
      definitionZh: "回报是投资在某一持有期间获得的收益或损失，包括价格变动和收到的任何收入。"
    },
    {
      type: "term",
      eyebrow: "Check 2",
      title: "Risk",
      term: "Risk",
      termZh: "风险",
      keywordVisuals: [
        { label: "Worse than expected", labelZh: "比预期更差", visual: investmentPhotos.lesson1ScenarioRedMarketLosses }
      ],
      definition: "Risk is the possibility that results, returns or prices are worse than expected.",
      definitionBlanks: ["worse than expected"],
      definitionZh: "风险是结果、回报或价格比预期更差的可能性。"
    },
    {
      type: "term",
      eyebrow: "Check 3",
      title: "Investor fit",
      term: "Investor fit",
      termZh: "投资者适合度",
      keywordVisuals: [
        { label: "Goal and constraints", labelZh: "目标与限制", visual: investmentPhotos.investorMeetingReport }
      ],
      definition: "Investor fit is the degree to which an investment matches an investor's goal, time horizon, liquidity need and risk tolerance.",
      definitionBlanks: ["goal, time horizon, liquidity need and risk tolerance"],
      definitionZh: "投资者适合度是指一项投资与投资者目标、投资期限、流动性需求和风险承受能力的匹配程度。"
    },
    {
      type: "classificationTask",
      eyebrow: "Practice check",
      title: "Classify evidence",
      zhTitle: "证据分类",
      compact: true,
      prompt: "For each question, choose the main check: potential return, risk or investor fit.",
      promptZh: "给每个问题选择主要检查：潜在回报、风险或投资者适合度。",
      categories: [
        { title: "Potential return", zhTitle: "潜在回报", clue: "gain, loss or income", visual: investmentPhotos.keywordDividendCheque },
        { title: "Risk", zhTitle: "风险", clue: "worse than expected", visual: investmentPhotos.lesson1ScenarioRedMarketLosses },
        { title: "Investor fit", zhTitle: "投资者适合度", clue: "goal and constraints", visual: investmentPhotos.investorMeetingReport }
      ],
      items: [
        { label: "A", text: "Could weaker demand reduce future profit?", zh: "需求减弱会不会降低未来利润？", answer: "Risk", answerZh: "风险", reason: "It asks what could make the result worse.", reasonZh: "它询问什么会使结果变差。" },
        { label: "B", text: "Could dividends or a higher future price create a gain?", zh: "股息或未来更高的价格会不会带来收益？", answer: "Potential return", answerZh: "潜在回报", reason: "It asks how the investor could gain or lose.", reasonZh: "它询问投资者可能如何获得收益或损失。" },
        { label: "C", text: "Is the money needed again in six months?", zh: "这笔钱是否在六个月后就需要使用？", answer: "Investor fit", answerZh: "投资者适合度", reason: "It checks the investor's time horizon and liquidity need.", reasonZh: "它检查投资者的投资期限和流动性需求。" }
      ],
      sharePrompt: "Defend one classification using the definition.",
      sharePromptZh: "用定义说明一个分类的理由。"
    },
    {
      type: "rankingTask",
      eyebrow: "Evidence priority",
      title: "Rank the evidence checks",
      zhTitle: "排列证据检查",
      visual: investmentPhotos.businessChartsPaper,
      prompt: "Rank the four cards from check first to check last.",
      promptZh: "把四张卡从最先检查排到最后检查。",
      axis: {
        low: "Check first",
        lowZh: "最先检查",
        high: "Check last",
        highZh: "最后检查"
      },
      items: [
        { label: "A", text: "Source title and date", zh: "来源标题和日期", visual: investmentPhotos.lesson1ScenarioFinancialDocuments },
        { label: "B", text: "Potential return evidence", zh: "潜在回报证据", visual: investmentPhotos.keywordDividendCheque },
        { label: "C", text: "Risk evidence", zh: "风险证据", visual: investmentPhotos.lesson1ScenarioRedMarketLosses },
        { label: "D", text: "Investor-fit evidence", zh: "投资者适合度证据", visual: investmentPhotos.investorMeetingReport }
      ],
      revealLabel: "One defensible order",
      revealLabelZh: "一种合理顺序",
      modelOrder: [
        { rank: "1", label: "A", text: "Source title and date", zh: "来源标题和日期", reason: "Confirm what the evidence is before using it.", reasonZh: "使用证据前先确认它是什么。" },
        { rank: "2", label: "C", text: "Risk evidence", zh: "风险证据", reason: "Identify what could make the outcome worse.", reasonZh: "识别什么可能使结果变差。" },
        { rank: "3", label: "B", text: "Potential return evidence", zh: "潜在回报证据", reason: "Then compare possible gain and loss.", reasonZh: "然后比较可能的收益和损失。" },
        { rank: "4", label: "D", text: "Investor-fit evidence", zh: "投资者适合度证据", reason: "Finish by testing the case against the investor's constraints.", reasonZh: "最后用投资者的限制检查这个案例。" }
      ],
      notes: "After reveal, ask one student to defend why the first card should be checked before the Tencent judgement."
    },
    {
      type: "quiz",
      eyebrow: "Hinge question",
      title: "Which response is investment analysis?",
      zhTitle: "哪一个回应属于投资分析？",
      question: "Which student is using investment analysis?",
      zh: "哪一名学生正在使用投资分析？",
      choices: [
        "A: Tencent is famous, so I would buy.",
        "B: The price fell, so it must be cheap.",
        "C: I need dated evidence on return, risk, price and fit before deciding.",
        "D: My friends like the company, so the risk is low."
      ],
      answer: 2,
      explanation: "Investment analysis checks dated evidence, potential return, risk, price and investor fit before action.",
      explanationZh: "投资分析会在行动前检查带日期的证据、潜在回报、风险、价格和投资者适合度。"
    },
    {
      type: "section",
      eyebrow: "Part 2",
      title: "Use sources carefully",
      zhTitle: "谨慎使用来源",
      notes: "Retrieve the three checks, inspect a source, then correct the overclaim."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Tencent evidence needs a source",
      visual: investmentPhotos.lesson1TencentBinhaiBuilding01,
      notes: [
        "Image only. Ask: what does this picture prove, and what can it not prove?",
        "Bridge to the source lens: company identity is evidence, but not the whole investment case."
      ]
    },
    {
      type: "sourceLens",
      eyebrow: "Source check",
      title: "What can Tencent investor relations prove?",
      zhTitle: "腾讯投资者关系页面能证明什么？",
      visual: investmentPhotos.lesson1TencentSeafrontSiteVisit03,
      revealAnswers: true,
      metaItems: [
        { label: "Source", value: "Tencent investor relations" },
        { label: "Accessed", value: "11 July 2026" }
      ],
      checks: [
        { label: "Useful", prompt: "What can an official company source help verify?", zh: "公司官方来源可以帮助核实什么？", answer: "Company identity, reports and official investor information.", answerZh: "公司身份、报告和官方投资者信息。" },
        { label: "Limit", prompt: "What can this page not prove by itself?", zh: "这个页面单独不能证明什么？", answer: "It cannot prove future return, low risk, an attractive price or investor fit.", answerZh: "它不能证明未来回报、低风险、价格有吸引力或投资者适合度。" }
      ],
      task: "Write one source-backed fact and one limitation before judging Tencent.",
      taskZh: "在判断腾讯之前，写出一个有来源支持的事实和一个局限。"
    },
    {
      type: "yesNoCheck",
      eyebrow: "Misconception check",
      title: "Can one clue settle the investment case?",
      zhTitle: "一个线索能决定整个投资判断吗？",
      prompt: "Vote yes or no before revealing each reason.",
      promptZh: "先投票判断是或否，再揭示每个理由。",
      items: [
        { text: "An official source is useful evidence.", zh: "官方来源是有用的证据。", answer: true, answerZh: "是", reason: "It can verify specific facts when its date and limits are recorded.", reasonZh: "记录日期和局限后，它可以核实具体事实。" },
        { text: "Tencent's large size proves its shares are suitable for every investor.", zh: "腾讯规模大，证明其股票适合每一位投资者。", answer: false, answerZh: "否", reason: "Suitability depends on the investor's goal, horizon, liquidity need and risk tolerance.", reasonZh: "适合性取决于投资者的目标、期限、流动性需求和风险承受能力。" },
        { text: "If evidence is incomplete, gathering more evidence is a valid next action.", zh: "如果证据不完整，收集更多证据是合理的下一步行动。", answer: true, answerZh: "是", reason: "A careful analyst does not force a buy or avoid verdict from weak evidence.", reasonZh: "谨慎的分析者不会用薄弱证据强行作出买入或回避判断。" }
      ]
    },
    {
      type: "compare",
      eyebrow: "Improve the claim",
      title: "Evidence-based analysis or weak opinion?",
      zhTitle: "基于证据的分析，还是薄弱观点？",
      mode: "fillBlanks",
      leftTitle: "Evidence-based analysis",
      leftTitleZh: "基于证据的分析",
      leftVisual: investmentPhotos.lesson1ScenarioFinancialDocuments,
      left: [
        { label: "1", text: "Records the source and __________.", answer: "date", zh: "记录来源和__________。", answerZh: "日期" },
        { label: "2", text: "Checks return, risk and investor __________.", answer: "fit", zh: "检查回报、风险和投资者__________。", answerZh: "适合度" }
      ],
      rightTitle: "Weak opinion",
      rightTitleZh: "薄弱观点",
      rightVisual: investmentPhotos.modernTradingDesk,
      right: [
        { label: "1", text: "Uses company __________ as the main evidence.", answer: "familiarity", zh: "把公司__________当作主要证据。", answerZh: "熟悉度" },
        { label: "2", text: "Forces a decision while evidence is __________.", answer: "incomplete", zh: "在证据__________时强行作决定。", answerZh: "不完整" }
      ],
      prompt: "Fill the blanks, then explain which side improves the Tencent judgement.",
      promptZh: "填空，然后解释哪一边能改进腾讯判断。"
    },
    {
      type: "section",
      eyebrow: "Part 3",
      title: "Improve the first answer",
      zhTitle: "改进最初答案",
      notes: "Retrieve -> rehearse -> individual exit."
    },
    {
      type: "peerTask",
      taskType: "missingSentence",
      eyebrow: "Output rehearsal",
      title: "Complete the evidence-to-action chain",
      zhTitle: "补全从证据到行动的链条",
      prompt: "Write the missing sentence that links incomplete evidence to the next action.",
      promptZh: "写出缺少的句子，把不完整证据与下一步行动连接起来。",
      steps: [
        { label: "1", text: "Tencent is familiar, but familiarity is not enough evidence.", zh: "腾讯很熟悉，但熟悉度不是充分证据。" },
        { label: "2", text: "__________", answer: "The judgement still needs dated return, risk, price and investor-fit evidence.", zh: "这个判断仍需要带日期的回报、风险、价格和投资者适合度证据。" },
        { label: "3", text: "Therefore, the next action is to gather more evidence.", zh: "因此，下一步行动是收集更多证据。" }
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: "The judgement still needs dated return, risk, price and investor-fit evidence.",
      missingSentenceAnswerZh: "这个判断仍需要带日期的回报、风险、价格和投资者适合度证据。",
      sharePrompt: "Read the full chain aloud and check that the action follows the evidence.",
      sharePromptZh: "朗读完整链条，并检查行动是否由证据推导出来。"
    },
    {
      type: "discussion",
      eyebrow: "Return to the dilemma",
      title: "What should the careful next action be?",
      zhTitle: "谨慎的下一步行动应该是什么？",
      question: "After this lesson, should the class say buy, avoid or gather more evidence about Tencent? Why?",
      questionZh: "学完本课后，班级应该说买入、回避，还是收集更多腾讯证据？为什么？",
      revealTitle: "Gather more evidence before choosing an investment action",
      answer: "Gather more evidence. The class has company identity and a method, but not enough dated evidence about return, risk, price and fit to defend a buy or avoid judgement.",
      answerZh: "收集更多证据。班级已经知道公司身份和分析方法，但还没有足够的带日期的回报、风险、价格和适合度证据来支持买入或回避判断。",
      visual: investmentPhotos.lesson1TencentSeafrontSiteVisit09
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Submit the improved Tencent judgement",
      zhTitle: "提交改进后的腾讯判断",
      mode: "fillBlanks",
      items: [
        { prompt: "Investment analysis uses __________ before making a decision.", answer: "evidence", zh: "投资分析在作出决定前使用__________。", answerZh: "证据" },
        { prompt: "The three checks are potential return, risk and investor __________.", answer: "fit", zh: "三个检查是潜在回报、风险和投资者__________。", answerZh: "适合度" },
        { prompt: "When the evidence is incomplete, a defensible next action is to __________.", answer: "gather more evidence", zh: "当证据不完整时，合理的下一步行动是__________。", answerZh: "收集更多证据" }
      ],
      notes: "Collect the final answer individually and use it to decide whether Lesson 2 retrieval can begin with the four key terms or needs reteaching."
    }
  ]
};
