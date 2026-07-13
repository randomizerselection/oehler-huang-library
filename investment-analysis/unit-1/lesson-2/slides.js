window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment and Financial Decision-Making",
    lessonLabel: "Unit 1 Lesson 2: How do goals change investment decisions?",
    sources: [
      {
        label: "Investor.gov: Time Horizon",
        note: "Supports defining time horizon as the period available to invest for a financial goal.",
        date: "Accessed 13 July 2026",
        url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/time-horizon"
      },
      {
        label: "Investor.gov: Asset Allocation",
        note: "Supports the factual relationship between an investor's time horizon, risk tolerance and the investment mix considered.",
        date: "Accessed 13 July 2026",
        url: "https://www.investor.gov/introduction-investing/getting-started/asset-allocation"
      },
      {
        label: "IFEC: Building an investment portfolio",
        note: "Supports checking purpose, investment time horizon, liquidity needs, financial resources and risk tolerance before choosing investments.",
        date: "Published 1 April 2016; accessed 13 July 2026",
        url: "https://www.ifec.org.hk/web/en/moneyessentials/financial-planning/building-an-investment-portfolio.page"
      },
      {
        label: "Hong Kong Monetary Authority: Investment Services",
        note: "Supports checking objectives, investment horizon, product risk, possible loss and suitability before making an investment decision.",
        date: "Page revised 7 January 2026; accessed 13 July 2026",
        url: "https://www.hkma.gov.hk/eng/smart-consumers/investment-services/"
      },
      {
        label: "Frozen three-goal family profile",
        note: "Teacher-created hypothetical education, home and retirement goals. No live rates, named products or personal recommendations are used.",
        date: "Frozen 13 July 2026",
        url: "Local classroom scenario"
      }
    ]
  },
  handout: {
    title: "How do goals change investment decisions?",
    subtitle: "Unit 1 Lesson 2",
    description: "Compare education, home and retirement goals by time horizon, liquidity need and suitability before considering investment choices.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Opening decision",
        instruction: "Make a judgement before the new definitions, then revise it at the end.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "First judgement", prompt: "Should money for university in three years be invested like retirement money needed in thirty years?", lines: 3 },
              { label: "Missing evidence", prompt: "What would you need to know about both goals before deciding?", lines: 4 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Vocabulary",
        instruction: "Complete and use the three Lesson 2 definitions.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Time horizon", prompt: "Time horizon is the period before invested money is expected to be __________.", answer: "needed" },
              { label: "Liquidity need", prompt: "Liquidity need is the need to access money quickly without a large loss or __________.", answer: "delay" },
              { label: "Suitability", prompt: "Suitability checks whether an investment matches the goal, horizon, liquidity need and ability to accept __________.", answer: "loss" }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Evidence and Data Analysis",
        instruction: "Read the frozen goal facts and classify each horizon and access need.",
        blocks: [
          {
            type: "table",
            columns: ["Goal", "Amount", "When needed", "Date flexibility", "Liquidity need"],
            rows: [
              ["University", "HK$240,000", "3 years", "Low", "High as the start date approaches"],
              ["Home deposit", "HK$500,000", "8 years", "Up to 2 years", "Medium"],
              ["Retirement", "Target not fixed", "30 years", "Retirement date range not fixed", "Low now; later withdrawals not yet specified"]
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Goal comparison",
        instruction: "Use the evidence to rank horizons and access needs. No calculation is required.",
        blocks: [
          {
            type: "cases",
            cases: [
              { label: "A", text: "University in three years", answer: "Shortest horizon; highest near-term liquidity need" },
              { label: "B", text: "Home deposit in eight years with some flexibility", answer: "Medium horizon; medium liquidity need" },
              { label: "C", text: "Retirement in thirty years", answer: "Longest horizon; lowest current liquidity need, but later withdrawals are unknown" },
              { label: "D", text: "The product with the highest possible return", answer: "Cannot be classified as suitable without the goal constraints" }
            ]
          }
        ]
      },
      {
        label: "5",
        title: "Misconception check",
        instruction: "Correct the product-first shortcut.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Weak claim", prompt: "The investment with the highest possible return fits every goal.", lines: 2 },
              { label: "Correction", prompt: "Use time horizon, liquidity need and possible loss to correct the claim.", lines: 5 }
            ]
          }
        ]
      },
      {
        label: "6",
        title: "Individual output",
        instruction: "Compare two goals using at least two lesson terms.",
        blocks: [
          {
            type: "writing",
            question: "Explain why two goals require different investment choices.",
            keywords: ["time horizon", "liquidity need", "suitability", "possible loss", "goal"],
            lines: 10
          }
        ]
      }
    ],
    sources: "Investor.gov Time Horizon and Asset Allocation, IFEC Building an Investment Portfolio, and HKMA Investment Services, accessed 13 Jul 2026. Goal figures are a frozen hypothetical classroom profile; this is not personal investment advice."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 2",
      title: "How do goals change investment decisions?",
      zhTitle: "目标如何改变投资决定？",
      prominentTitle: true,
      visual: investmentPhotos.lesson1ScenarioFinancialDocuments,
      notes: [
        "Keep the title screen simple.",
        "Move immediately to the university-versus-retirement judgement."
      ]
    },
    {
      type: "discussion",
      eyebrow: "First judgement",
      title: "Three years and thirty years",
      zhTitle: "三年与三十年",
      question: "Should money for university in three years be invested like retirement money needed in thirty years?",
      questionZh: "三年后用于大学的资金，是否应该像三十年后才需要的退休资金一样投资？",
      revealTitle: "The goal constraints are different",
      answer: "Not automatically. University money has a shorter time horizon and a higher need for reliable access on a known date. Retirement money has a longer horizon, but its target, later withdrawals and ability to accept loss still need evidence.",
      answerZh: "不应该自动采用相同方式。大学资金的投资期限更短，而且在已知日期可靠取用资金的需要更高。退休资金期限更长，但目标金额、以后提取资金的安排和承受损失能力仍需要证据。",
      visual: investmentPhotos.investorMeetingReport,
      notes: [
        "Take same/different votes before reveal.",
        "Listen for students who choose a product before naming the goal constraints."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本课结束时，你能够",
      visual: investmentPhotos.businessChartsPaper,
      bullets: [
        "Define and use time horizon, liquidity need, suitability.",
        "Classify education, home and retirement goals by horizon and liquidity need.",
        "Explain why two goals require different investment choices."
      ],
      zhBullets: [
        "定义并使用投资期限、流动性需求和适合度。",
        "根据期限和流动性需求给教育、住房和退休目标分类。",
        "解释为什么两个目标需要不同的投资选择。"
      ]
    },
    {
      type: "peerTask",
      taskType: "definitionRecall",
      eyebrow: "Lesson 1 retrieval",
      title: "Recall the goal before comparing choices",
      zhTitle: "比较选择前先回忆目标",
      prompt: "Without notes, complete the three definitions that Lesson 2 will use.",
      promptZh: "不看笔记，补全第二课将使用的三个定义。",
      definitionItems: [
        { label: "1", term: "Investment", termZh: "投资", answer: "Investment is putting money into an asset to seek future return while accepting possible loss.", answerZh: "投资是把钱投入资产以寻求未来回报，同时接受可能发生的损失。" },
        { label: "2", term: "Return", termZh: "回报", answer: "Return is the gain or loss from an investment over a stated period, including price change and income.", answerZh: "回报是投资在规定期间内的收益或损失，包括价格变化和收入。" },
        { label: "3", term: "Financial goal", termZh: "财务目标", answer: "A financial goal is a stated future use of money with an amount, priority and time horizon.", answerZh: "财务目标是对资金未来用途的明确说明，并包括金额、优先级和投资期限。" }
      ],
      sharePrompt: "Explain which part of a financial goal distinguishes university from retirement.",
      sharePromptZh: "解释财务目标的哪一部分区分了大学目标和退休目标。"
    },
    {
      type: "section",
      eyebrow: "Part 1",
      title: "Goal constraints come before products",
      zhTitle: "目标限制先于产品",
      notes: "Try first -> define horizon -> define access -> define fit -> hinge check."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "What makes the two goals different?",
      zhTitle: "什么使两个目标不同？",
      question: "University begins in three years; retirement begins in thirty years. Apart from the dates, what else should the family compare?",
      questionZh: "大学在三年后开始；退休在三十年后开始。除了日期，家庭还应比较什么？",
      revealTitle: "Compare access, flexibility and the consequence of loss",
      answer: "The family should compare when each payment is required, whether the date can move, how quickly money must be accessed and what loss would damage each goal.",
      answerZh: "家庭应比较每笔付款何时需要、日期能否调整、需要多快取用资金，以及什么样的损失会损害每个目标。",
      visual: investmentPhotos.lesson1ScenarioHouseForRent
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Time horizon",
      term: "Time horizon",
      termZh: "投资期限",
      keywordVisuals: [
        { label: "Time before money is needed", labelZh: "需要资金前的时间", visual: investmentPhotos.lesson1ScenarioFinancialDocuments }
      ],
      definition: "Time horizon is the period before invested money is expected to be needed.",
      definitionBlanks: ["period", "invested money", "needed"],
      definitionZh: "投资期限是预计需要使用已投资资金之前的时间。"
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "A known payment date changes the decision",
      visual: investmentPhotos.assetCashSavings,
      notes: [
        "Image only. Ask what could go wrong if the money cannot be accessed on the required date.",
        "Bridge from time horizon to liquidity need."
      ]
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Liquidity need",
      term: "Liquidity need",
      termZh: "流动性需求",
      keywordVisuals: [
        { label: "Quick access without a large loss or delay", labelZh: "无需承受重大损失或延迟即可快速取用", visual: investmentPhotos.assetCashSavings }
      ],
      definition: "Liquidity need is the need to access money quickly without accepting a large loss or delay.",
      definitionBlanks: ["access money quickly", "large loss", "delay"],
      definitionZh: "流动性需求是无需承受重大损失或延迟即可快速取用资金的需要。"
    },
    {
      type: "term",
      eyebrow: "Key definition",
      title: "Suitability",
      term: "Suitability",
      termZh: "适合度",
      keywordVisuals: [
        { label: "Match the choice to the person and goal", labelZh: "使选择与个人和目标相匹配", visual: investmentPhotos.investorMeetingReport }
      ],
      definition: "Suitability is the degree to which an investment matches a person's goal, horizon, liquidity need and ability to accept loss.",
      definitionBlanks: ["goal", "horizon", "liquidity need", "ability to accept loss"],
      definitionZh: "适合度是投资与个人目标、期限、流动性需求和承受损失能力相匹配的程度。"
    },
    {
      type: "flow",
      eyebrow: "Decision rule",
      title: "Move from goal to suitability",
      zhTitle: "从目标走向适合度",
      visual: investmentPhotos.businessChartsPaper,
      flowStyle: "sequence",
      steps: [
        { text: "Define the goal and required amount", zh: "明确目标和所需金额", visual: investmentPhotos.lesson1ScenarioFinancialDocuments },
        { text: "Identify the time horizon and liquidity need", zh: "识别投资期限和流动性需求", visual: investmentPhotos.assetCashSavings },
        { text: "Check what loss the person can accept without damaging the goal", zh: "检查个人在不损害目标的情况下能够承受什么损失", visual: investmentPhotos.investorMeetingReport },
        { text: "Only then compare whether an investment choice is suitable", zh: "只有这样才能比较投资选择是否适合", visual: investmentPhotos.financialAnalysisDesk }
      ]
    },
    {
      type: "quiz",
      eyebrow: "Hinge question",
      title: "Which question comes first?",
      zhTitle: "哪一个问题应先提出？",
      question: "Before comparing investment products for university money, which question should the family answer first?",
      zh: "在比较大学资金的投资产品前，家庭应先回答哪一个问题？",
      choices: [
        "Which product had the highest return last year?",
        "When is the money required, and how much loss or delay can the goal accept?",
        "Which product is most popular online?",
        "How often can the price be checked?"
      ],
      answer: 1,
      explanation: "Time horizon, liquidity need and the consequence of loss define the suitability problem before products are compared.",
      explanationZh: "在比较产品前，投资期限、流动性需求和损失后果界定了适合度问题。"
    },
    {
      type: "section",
      eyebrow: "Part 2",
      title: "Classify three family goals",
      zhTitle: "给三个家庭目标分类",
      notes: "Read frozen evidence -> classify horizon -> rank access need -> compare -> check guidance."
    },
    {
      type: "dataSnapshot",
      eyebrow: "Frozen three-goal profile",
      title: "Education, home and retirement",
      zhTitle: "教育、住房和退休",
      visual: investmentPhotos.investorMeetingReport,
      sourceStamp: "Teacher-created family profile | Frozen 13 Jul 2026 | No live rates or products",
      focusMetrics: [
        { label: "University", value: "HK$240k | 3 years | fixed start" },
        { label: "Home deposit", value: "HK$500k | 8 years | 2-year flexibility" },
        { label: "Retirement", value: "30 years | target and withdrawals not fixed" }
      ],
      task: "Classify each goal by horizon and liquidity need, then identify one missing suitability fact.",
      taskZh: "根据期限和流动性需求给每个目标分类，然后识别一个缺少的适合度事实。"
    },
    {
      type: "classificationTask",
      eyebrow: "Horizon classification",
      title: "Which horizon belongs to each goal?",
      zhTitle: "每个目标属于哪一种期限？",
      prompt: "Use only the frozen dates to classify the three goals.",
      promptZh: "只使用冻结日期给三个目标分类。",
      categories: [
        { title: "Shorter horizon", zhTitle: "较短期限", clue: "money needed in about three years" },
        { title: "Medium horizon", zhTitle: "中等期限", clue: "money needed in about eight years" },
        { title: "Long horizon", zhTitle: "长期限", clue: "money needed in about thirty years" }
      ],
      items: [
        { label: "A", text: "Retirement begins in thirty years.", zh: "退休在三十年后开始。", answer: "Long horizon", answerZh: "长期限", reason: "It has the longest period before the money begins to be needed.", reasonZh: "在开始需要资金前，它拥有最长时间。" },
        { label: "B", text: "University fees begin in three years.", zh: "大学学费在三年后开始支付。", answer: "Shorter horizon", answerZh: "较短期限", reason: "It has the shortest period before a known payment date.", reasonZh: "在已知付款日期前，它拥有最短时间。" },
        { label: "C", text: "The home deposit is planned for eight years from now.", zh: "购房首付计划在八年后使用。", answer: "Medium horizon", answerZh: "中等期限", reason: "Its horizon lies between the education and retirement goals.", reasonZh: "它的期限处于教育目标和退休目标之间。" }
      ],
      sharePrompt: "State why horizon alone does not prove suitability.",
      sharePromptZh: "说明为什么仅凭期限不能证明适合度。"
    },
    {
      type: "rankingTask",
      eyebrow: "Liquidity ranking",
      title: "Rank the goals by current access need",
      zhTitle: "按当前资金使用需要排列目标",
      visual: investmentPhotos.assetCashSavings,
      prompt: "Rank from highest current liquidity need to lowest current liquidity need.",
      promptZh: "从当前流动性需求最高排到最低。",
      axis: {
        low: "Highest need",
        lowZh: "需求最高",
        high: "Lowest need",
        highZh: "需求最低"
      },
      items: [
        { label: "A", text: "Retirement in thirty years; withdrawals not yet specified", zh: "三十年后退休；提取安排尚未明确" },
        { label: "B", text: "University in three years; fixed start date", zh: "三年后上大学；开学日期固定" },
        { label: "C", text: "Home deposit in eight years; date flexible by up to two years", zh: "八年后购房首付；日期最多可调整两年" }
      ],
      revealLabel: "One defensible ranking",
      revealLabelZh: "一种合理排序",
      modelOrder: [
        { rank: "1", label: "B", text: "University in three years", zh: "三年后上大学", reason: "The earliest fixed payment date creates the highest current access need.", reasonZh: "最早且固定的付款日期形成最高的当前资金使用需要。" },
        { rank: "2", label: "C", text: "Home deposit in eight years", zh: "八年后购房首付", reason: "The goal is later and has some date flexibility, but access will still matter.", reasonZh: "目标时间较晚且日期有一定灵活性，但资金使用仍然重要。" },
        { rank: "3", label: "A", text: "Retirement in thirty years", zh: "三十年后退休", reason: "The money is not needed soon, although later withdrawal needs still require planning.", reasonZh: "近期不需要这笔钱，但以后提取资金的需要仍需规划。" }
      ],
      caveat: "This ranks access need from the frozen facts; it does not choose a product.",
      caveatZh: "该排序只依据冻结事实判断资金使用需要，并不选择产品。"
    },
    {
      type: "compare",
      eyebrow: "Goal comparison",
      title: "University or retirement?",
      zhTitle: "大学目标还是退休目标？",
      mode: "fillBlanks",
      leftTitle: "University in three years",
      leftTitleZh: "三年后上大学",
      left: [
        { label: "1", text: "The time horizon is relatively __________.", answer: "short", zh: "投资期限相对__________。", answerZh: "较短" },
        { label: "2", text: "A loss near the fixed start date could block the __________.", answer: "goal", zh: "临近固定开学日期发生损失可能阻碍__________。", answerZh: "目标" }
      ],
      rightTitle: "Retirement in thirty years",
      rightTitleZh: "三十年后退休",
      right: [
        { label: "1", text: "The time horizon is relatively __________.", answer: "long", zh: "投资期限相对__________。", answerZh: "较长" },
        { label: "2", text: "The target amount and later __________ needs are still missing.", answer: "withdrawal", zh: "目标金额和以后的__________需要仍然缺失。", answerZh: "提取" }
      ],
      prompt: "Fill the blanks, then explain why the same investment choice is not automatically suitable for both goals.",
      promptZh: "填空，然后解释为什么同一个投资选择不会自动同时适合两个目标。"
    },
    {
      type: "sourceLens",
      eyebrow: "Official guidance",
      title: "What does time-horizon guidance add?",
      zhTitle: "投资期限指引增加了什么？",
      visual: investmentPhotos.financialAnalysisDesk,
      revealAnswers: true,
      metaItems: [
        { label: "Source", value: "Investor.gov: Time Horizon and Asset Allocation" },
        { label: "Accessed", value: "13 July 2026" }
      ],
      checks: [
        { label: "Use", prompt: "What relationship does the guidance support?", zh: "该指引支持什么关系？", answer: "The period before a goal and a person's ability to accept risk affect which broad investment choices may be appropriate.", answerZh: "目标前的时间长度以及个人承受风险的能力，会影响哪些广义投资选择可能合适。" },
        { label: "Limit", prompt: "What does the guidance not decide for the frozen family?", zh: "该指引不能替冻结家庭决定什么？", answer: "It does not choose a named product, define the family's priorities or supply missing loss-capacity evidence.", answerZh: "它不选择具体产品，不设定家庭优先级，也不提供缺少的损失承受能力证据。" }
      ],
      task: "Use one source point to improve the university-versus-retirement comparison, then state one limitation.",
      taskZh: "用一个来源要点改进大学目标与退休目标的比较，然后说明一个局限。"
    },
    {
      type: "yesNoCheck",
      eyebrow: "Misconception check",
      title: "Does the highest possible return fit every goal?",
      zhTitle: "最高的可能回报适合每一个目标吗？",
      prompt: "Vote yes or no before revealing each reason.",
      promptZh: "先投票判断是或否，再揭示每个理由。",
      items: [
        { text: "A high possible return can make a choice unsuitable when the money is needed soon.", zh: "当资金很快需要使用时，较高的可能回报也可能使选择不适合。", answer: true, answerZh: "是", reason: "The possible loss or delay may damage the near-term goal.", reasonZh: "可能损失或延迟可能损害近期目标。" },
        { text: "A thirty-year horizon means the family can accept unlimited loss.", zh: "三十年的期限意味着家庭可以承受无限损失。", answer: false, answerZh: "否", reason: "A long horizon does not replace evidence about target amount and ability to accept loss.", reasonZh: "较长期限不能替代目标金额和承受损失能力的证据。" },
        { text: "Suitability can differ for the same person because different goals have different constraints.", zh: "同一个人的适合度可能因不同目标具有不同限制而不同。", answer: true, answerZh: "是", reason: "Goal, horizon and liquidity need can differ across portions of the same family's money.", reasonZh: "同一家庭不同部分资金的目标、期限和流动性需求可能不同。" }
      ]
    },
    {
      type: "section",
      eyebrow: "Part 3",
      title: "Explain a different choice without naming a product",
      zhTitle: "不提具体产品，解释为什么选择不同",
      notes: "Rehearse -> assess -> revise judgement -> submit."
    },
    {
      type: "peerTask",
      taskType: "missingSentence",
      eyebrow: "Output rehearsal",
      title: "Complete the comparison chain",
      zhTitle: "补全比较链条",
      prompt: "Write the missing sentence that connects goal evidence to different investment choices.",
      promptZh: "写出缺少的句子，把目标证据与不同投资选择联系起来。",
      steps: [
        { label: "1", text: "University money is needed in three years on a fixed date, so its current liquidity need is high.", zh: "大学资金在三年后的固定日期需要使用，因此当前流动性需求较高。" },
        { label: "2", text: "__________", answer: "Retirement money has a thirty-year horizon and a lower current liquidity need, but the target and ability to accept loss are still unknown.", zh: "退休资金有三十年的期限，当前流动性需求较低，但目标金额和承受损失能力仍然未知。" },
        { label: "3", text: "Therefore, the same investment choice is not automatically suitable for both goals.", zh: "因此，同一个投资选择不会自动同时适合两个目标。" }
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: "Retirement money has a thirty-year horizon and a lower current liquidity need, but the target and ability to accept loss are still unknown.",
      missingSentenceAnswerZh: "退休资金有三十年的期限，当前流动性需求较低，但目标金额和承受损失能力仍然未知。",
      sharePrompt: "Underline the horizon comparison once and the suitability condition twice.",
      sharePromptZh: "给期限比较画一条线，给适合度条件画两条线。"
    },
    {
      type: "exam",
      eyebrow: "Assessment",
      title: "Assess two family goals",
      zhTitle: "评估两个家庭目标",
      visual: investmentPhotos.businessChartsPaper,
      revealKeywords: true,
      prompt: "Assess why the university and retirement goals require different investment choices. [8]",
      zh: "评估为什么大学目标和退休目标需要不同的投资选择。[8]",
      keywords: ["financial goal", "time horizon", "liquidity need", "possible loss", "suitability", "conditional judgement"],
      notes: [
        "Students should compare the frozen facts and identify missing evidence.",
        "Do not reward a named product recommendation without the goal analysis."
      ]
    },
    {
      type: "discussion",
      eyebrow: "Return to the dilemma",
      title: "Should the two goals be invested alike?",
      zhTitle: "两个目标是否应该采用相同投资方式？",
      question: "Use time horizon, liquidity need and suitability to revise the opening judgement.",
      questionZh: "使用投资期限、流动性需求和适合度修改开场判断。",
      revealTitle: "Different constraints require different investment choices",
      answer: "University money has a three-year horizon, a fixed start date and a high need for access, so a large loss or delay could damage the goal. Retirement money has a thirty-year horizon and a lower current access need, but the target and ability to accept loss still need evidence. The same choice is therefore not automatically suitable for both.",
      answerZh: "大学资金有三年期限、固定开学日期和较高资金使用需要，因此重大损失或延迟可能损害目标。退休资金有三十年期限且当前资金使用需要较低，但目标金额和承受损失能力仍需要证据。因此，同一个选择不会自动同时适合两者。",
      visual: investmentPhotos.investorMeetingReport
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Submit the goal comparison",
      zhTitle: "提交目标比较",
      mode: "fillBlanks",
      items: [
        { prompt: "The period before money is needed is the time __________.", answer: "horizon", zh: "需要资金前的时间是投资__________。", answerZh: "期限" },
        { prompt: "The need for quick access without a large loss or delay is the __________ need.", answer: "liquidity", zh: "无需承受重大损失或延迟即可快速取用资金的需要是__________需求。", answerZh: "流动性" },
        { prompt: "An investment is not suitable unless it matches the goal and ability to accept __________.", answer: "loss", zh: "除非投资与目标和承受__________的能力相匹配，否则它并不适合。", answerZh: "损失" }
      ],
      notes: "Collect individually. Lesson 3 can retrieve the goal-first rule before distinguishing saving, investing and speculation."
    }
  ]
};
