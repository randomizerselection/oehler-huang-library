window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit 1 Lesson 2: How are saving, investing and speculation different?",
    sources: [
      {
        label: "IFEC: Building an investment portfolio",
        note: "Supports the distinction between money needed for short-term purchases and long-term investment, and the checks for time horizon, liquidity needs, possible loss and get-rich-quick risk.",
        date: "Published 1 April 2016; accessed 11 July 2026",
        url: "https://www.ifec.org.hk/web/en/moneyessentials/financial-planning/building-an-investment-portfolio.page"
      },
      {
        label: "Hong Kong Monetary Authority: Investment Services",
        note: "Supports checking objectives, investment horizon, product risks, possible loss and suitability before making an investment decision.",
        date: "Page revised 7 January 2026; accessed 11 July 2026",
        url: "https://www.hkma.gov.hk/eng/smart-consumers/investment-services/"
      },
      {
        label: "Frozen family classroom profile",
        note: "Teacher-created hypothetical profile: HK$30,000 total, HK$12,000 needed in six months and HK$18,000 not needed for at least five years. No live rates or named products are used.",
        date: "Frozen 11 July 2026",
        url: "Local classroom scenario"
      }
    ]
  },
  handout: {
    title: "Saving, investing and speculation",
    subtitle: "Unit 1 Lesson 2",
    description: "Use a family money decision to separate short-term saving, long-term investing and weak-evidence speculation.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "First judgement",
        instruction: "Decide before the definitions, then improve the decision at the end.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Decision", prompt: "A family has HK$30,000. Should it save, invest or speculate with all of the money?", lines: 3 },
              { label: "Missing information", prompt: "What do you need to know before deciding?", lines: 4 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Vocabulary",
        instruction: "Complete and use the three lesson definitions.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Saving", prompt: "Saving keeps money safe and __________ for future use.", answer: "available" },
              { label: "Investment", prompt: "Investment seeks future return while accepting possible __________.", answer: "loss" },
              { label: "Speculation", prompt: "Speculation tries to profit from uncertain price movements, often over a __________ time.", answer: "short" }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Family evidence box",
        instruction: "Record the purpose and time horizon for each part of the money.",
        blocks: [
          {
            type: "table",
            columns: ["Amount", "When needed", "Can accept possible loss?", "First category"],
            rows: [
              ["HK$12,000", "Six months", "No", ""],
              ["HK$18,000", "At least five years", "Possibly, after checking risk and fit", ""],
              ["Rumour-led one-week price bet", "One week", "High uncertainty and weak evidence", ""]
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Classification task",
        instruction: "Classify each action and explain the deciding evidence.",
        blocks: [
          {
            type: "cases",
            cases: [
              { label: "A", text: "Keep school-fee money ready for use in six months.", answer: "Saving" },
              { label: "B", text: "Put long-term surplus into a researched asset while accepting possible loss.", answer: "Investing" },
              { label: "C", text: "Bet all HK$30,000 on a one-week price rumour.", answer: "Speculation" },
              { label: "D", text: "Wait and gather more evidence before choosing an investment.", answer: "Careful next action" }
            ]
          }
        ]
      },
      {
        label: "5",
        title: "Misconception check",
        instruction: "Correct both shortcuts.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Shortcut 1", prompt: "Investing is always better than saving because the expected return is higher.", lines: 3 },
              { label: "Shortcut 2", prompt: "A fast price gain based on a rumour is the same as investment analysis.", lines: 3 }
            ]
          }
        ]
      },
      {
        label: "6",
        title: "Final family decision",
        instruction: "Use the evidence to choose a defensible next action for each part of the money.",
        blocks: [
          {
            type: "writing",
            question: "Explain why the HK$12,000 should be saved, why only the long-term surplus might be considered for investment, and why the rumour-led bet should be rejected as speculation.",
            keywords: ["saving", "investment", "speculation", "time horizon", "liquidity need", "possible loss", "evidence"],
            lines: 10
          }
        ]
      }
    ],
    sources: "IFEC Building an Investment Portfolio and HKMA Investment Services, accessed 11 Jul 2026. Family figures are a frozen hypothetical classroom profile; no live rate or product recommendation is used."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Unit 1 Lesson 2",
      title: "Saving, investing or speculating?",
      zhTitle: "储蓄、投资，还是投机？",
      prominentTitle: true,
      visual: investmentPhotos.assetCashSavings,
      notes: [
        "Keep the title screen simple.",
        "Move immediately to the family decision before defining the three categories."
      ]
    },
    {
      type: "discussion",
      eyebrow: "First judgement",
      title: "What should the family do with HK$30,000?",
      zhTitle: "这个家庭应该如何处理30,000港元？",
      question: "Should the family save, invest or speculate with all HK$30,000? Give one reason.",
      questionZh: "这个家庭应该把全部30,000港元用于储蓄、投资，还是投机？给出一个理由。",
      revealTitle: "The purpose and time horizon must come first",
      answer: "Do not choose one action for all the money yet. First find out when each part is needed, whether it must stay available and whether possible loss can be accepted.",
      answerZh: "先不要把全部资金都归入同一种行动。首先要知道每一部分资金何时需要、是否必须保持可用，以及是否能够承受可能的损失。",
      visual: investmentPhotos.investorMeetingReport,
      notes: [
        "Take a save/invest/speculate vote before showing the family facts.",
        "Listen for the Lesson 1 checks: evidence, risk and investor fit."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本课结束时，你能够",
      visual: investmentPhotos.businessChartsPaper,
      bullets: [
        "define saving, investment and speculation",
        "classify choices using purpose, time horizon, liquidity and possible loss",
        "write a justified family next action without recommending a product"
      ],
      zhBullets: [
        "定义储蓄、投资和投机",
        "根据用途、期限、流动性和可能损失给选择分类",
        "写出有理由的家庭下一步行动，而不推荐具体产品"
      ]
    },
    {
      type: "peerTask",
      taskType: "definitionRecall",
      eyebrow: "Lesson 1 retrieval",
      title: "Recall three checks before choosing",
      zhTitle: "选择前回忆三个检查",
      prompt: "Without notes, complete the definitions that the family decision needs.",
      promptZh: "不看笔记，补全家庭决策需要的定义。",
      definitionItems: [
        { label: "1", term: "Investment analysis", termZh: "投资分析", answer: "Investment analysis is the process of evaluating an investment opportunity with evidence to judge its potential return, risk and suitability before making a decision.", answerZh: "投资分析是利用证据评估投资机会的过程，在作出决定前判断其潜在回报、风险和适合性。" },
        { label: "2", term: "Return", termZh: "回报", answer: "Return is the gain or loss earned from an investment over a stated holding period, including price change and any income received.", answerZh: "回报是投资在某一持有期间获得的收益或损失，包括价格变动和收到的任何收入。" },
        { label: "3", term: "Risk", termZh: "风险", answer: "Risk is the possibility that results, returns or prices are worse than expected.", answerZh: "风险是结果、回报或价格比预期更差的可能性。" }
      ],
      sharePrompt: "Explain which definition matters most when money is needed in six months.",
      sharePromptZh: "解释当资金在六个月后就需要时，哪一个定义最重要。"
    },
    {
      type: "section",
      eyebrow: "Part 1",
      title: "Three different actions",
      zhTitle: "三种不同的行动",
      notes: "Retrieve -> define -> classify -> correct."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Money kept available for a near-term need",
      visual: investmentPhotos.assetCashSavings,
      notes: [
        "Image only. Ask what purpose this money might have.",
        "Bridge to the saving definition without naming a product or live rate."
      ]
    },
    {
      type: "term",
      eyebrow: "Definition",
      title: "Saving",
      term: "Saving",
      termZh: "储蓄",
      keywordVisuals: [
        { label: "Safe and available", labelZh: "安全且可用", visual: investmentPhotos.assetCashSavings }
      ],
      definition: "Saving is keeping money safe and available for future use, usually with lower risk and lower expected return than investing.",
      definitionBlanks: ["safe and available"],
      definitionZh: "储蓄是把钱安全地保留下来以备将来使用，通常风险较低，预期回报也低于投资。"
    },
    {
      type: "term",
      eyebrow: "Definition",
      title: "Investment",
      term: "Investment",
      termZh: "投资",
      keywordVisuals: [
        { label: "Future return with possible loss", labelZh: "寻求未来回报并接受可能损失", visual: investmentPhotos.financialAnalysisDesk }
      ],
      definition: "Investment is putting money into an asset to seek future return while accepting possible loss.",
      definitionBlanks: ["future return while accepting possible loss"],
      definitionZh: "投资是把钱投入资产以寻求未来回报，同时接受可能发生的损失。"
    },
    {
      type: "term",
      eyebrow: "Definition",
      title: "Speculation",
      term: "Speculation",
      termZh: "投机",
      keywordVisuals: [
        { label: "Short-term uncertain price bet", labelZh: "短期不确定价格押注", visual: investmentPhotos.smartphoneMarketChart }
      ],
      definition: "Speculation is trying to profit from uncertain price movements, often over a short time and with weaker evidence than investment analysis requires.",
      definitionBlanks: ["uncertain price movements"],
      definitionZh: "投机是试图从不确定的价格变动中获利，通常时间较短，所依据的证据弱于投资分析所要求的证据。"
    },
    {
      type: "conceptTriad",
      eyebrow: "Concept map",
      title: "Separate the three actions",
      zhTitle: "区分三种行动",
      visual: investmentPhotos.businessChartsPaper,
      revealDetails: true,
      concepts: [
        { label: "Saving", tag: "Needed soon", definition: "Saving is keeping money safe and available for future use, usually with lower risk and lower expected return than investing.", definitionZh: "储蓄是把钱安全地保留下来以备将来使用，通常风险较低，预期回报也低于投资。" },
        { label: "Investment", tag: "Longer-term return", definition: "Investment is putting money into an asset to seek future return while accepting possible loss.", definitionZh: "投资是把钱投入资产以寻求未来回报，同时接受可能发生的损失。" },
        { label: "Speculation", tag: "Weak-evidence price bet", definition: "Speculation is trying to profit from uncertain price movements, often over a short time and with weaker evidence than investment analysis requires.", definitionZh: "投机是试图从不确定的价格变动中获利，通常时间较短，所依据的证据弱于投资分析所要求的证据。" }
      ],
      prompt: "Before reveal, classify one family action into the correct concept.",
      promptZh: "揭示前，把一个家庭行动归入正确概念。"
    },
    {
      type: "classificationTask",
      eyebrow: "Practice check",
      title: "Saving, investing or speculation?",
      zhTitle: "储蓄、投资，还是投机？",
      prompt: "Classify each action, then defend the deciding evidence.",
      promptZh: "给每个行动分类，然后说明决定性证据。",
      categories: [
        { title: "Saving", zhTitle: "储蓄", clue: "safe, available, needed soon" },
        { title: "Investing", zhTitle: "投资", clue: "future return, evidence, possible loss" },
        { title: "Speculation", zhTitle: "投机", clue: "short-term price bet, weak evidence" }
      ],
      items: [
        { label: "A", text: "Keep school-fee money ready for use in six months.", zh: "把六个月后要用的学费资金保持为随时可用。", answer: "Saving", answerZh: "储蓄", reason: "The money is needed soon and should remain available.", reasonZh: "这笔钱很快就需要使用，并且应保持可用。" },
        { label: "B", text: "Use researched long-term surplus to seek future return while accepting possible loss.", zh: "把经过研究的长期余钱用于寻求未来回报，同时接受可能损失。", answer: "Investing", answerZh: "投资", reason: "The action uses evidence, a longer horizon and accepts risk.", reasonZh: "这个行动使用证据、较长期限并接受风险。" },
        { label: "C", text: "Bet all the money on a one-week price rumour.", zh: "根据一周价格传闻押上全部资金。", answer: "Speculation", answerZh: "投机", reason: "The action seeks a short-term price gain from weak evidence.", reasonZh: "这个行动依据薄弱证据追求短期价格收益。" }
      ],
      sharePrompt: "Name the purpose, time horizon and possible loss in one case.",
      sharePromptZh: "说出一个案例中的用途、期限和可能损失。"
    },
    {
      type: "section",
      eyebrow: "Part 2",
      title: "Fit the action to the money",
      zhTitle: "让行动符合资金用途",
      notes: "Retrieve the definitions, reveal the profile, apply the decision rule, check sources."
    },
    {
      type: "dataSnapshot",
      eyebrow: "Frozen classroom profile",
      title: "One family, three facts",
      zhTitle: "一个家庭，三个事实",
      visual: investmentPhotos.investorMeetingReport,
      sourceStamp: "Teacher-created profile | Frozen 11 Jul 2026 | No live rates",
      focusMetrics: [
        { label: "Total money", value: "HK$30,000" },
        { label: "Needed in six months", value: "HK$12,000" },
        { label: "Not needed for 5+ years", value: "HK$18,000" }
      ],
      task: "For each amount, identify the purpose, time horizon, liquidity need and ability to accept loss.",
      taskZh: "对每一笔金额，识别用途、期限、流动性需求和承受损失的能力。"
    },
    {
      type: "flow",
      eyebrow: "Decision rule",
      title: "Purpose and time horizon come before action",
      zhTitle: "用途和期限先于行动",
      visual: investmentPhotos.businessChartsPaper,
      flowStyle: "sequence",
      steps: [
        { text: "Needed soon and must stay available -> save", zh: "很快需要并且必须保持可用 -> 储蓄", visual: investmentPhotos.assetCashSavings },
        { text: "Long-term surplus and possible loss accepted -> consider investing after research", zh: "长期余钱并能承受可能损失 -> 研究后考虑投资", visual: investmentPhotos.financialAnalysisDesk },
        { text: "Short-term rumour and weak evidence -> reject as speculation", zh: "短期传闻且证据薄弱 -> 作为投机予以拒绝", visual: investmentPhotos.smartphoneMarketChart }
      ]
    },
    {
      type: "compare",
      eyebrow: "Time-horizon check",
      title: "Money needed soon or long-term surplus?",
      zhTitle: "近期需要的资金，还是长期余钱？",
      mode: "fillBlanks",
      leftTitle: "Needed in six months",
      leftTitleZh: "六个月后需要",
      left: [
        { label: "1", text: "High need for ready __________.", answer: "cash", zh: "对随时可用的__________需求高。", answerZh: "现金" },
        { label: "2", text: "Possible loss could block the family __________.", answer: "goal", zh: "可能损失会阻碍家庭__________。", answerZh: "目标" }
      ],
      rightTitle: "Not needed for five years",
      rightTitleZh: "五年内不需要",
      right: [
        { label: "1", text: "Longer time to face market __________.", answer: "changes", zh: "有更长时间面对市场__________。", answerZh: "变化" },
        { label: "2", text: "Investment still requires evidence and possible-loss __________.", answer: "acceptance", zh: "投资仍需要证据和对可能损失的__________。", answerZh: "接受" }
      ],
      prompt: "Fill the blanks, then explain why the two amounts should not receive the same action.",
      promptZh: "填空，然后解释为什么两笔资金不应采用同一种行动。"
    },
    {
      type: "sourceLens",
      eyebrow: "Official guidance",
      title: "What does IFEC guidance add?",
      zhTitle: "投委会指引增加了什么？",
      visual: investmentPhotos.financialAnalysisDesk,
      revealAnswers: true,
      metaItems: [
        { label: "Source", value: "IFEC: Building an investment portfolio" },
        { label: "Published/accessed", value: "1 Apr 2016 / 11 Jul 2026" }
      ],
      checks: [
        { label: "Use", prompt: "Which investor-fit factors does the guidance identify?", zh: "该指引识别了哪些投资者适合度因素？", answer: "Purpose, investment time horizon, liquidity needs, financial resources and risk tolerance.", answerZh: "用途、投资期限、流动性需求、财务资源和风险承受能力。" },
        { label: "Limit", prompt: "What does the guidance not decide for this family?", zh: "该指引不能替这个家庭决定什么？", answer: "It does not choose a named product or guarantee a return.", answerZh: "它不选择具体产品，也不保证回报。" }
      ],
      task: "Use one source point to improve the family decision, then state one limitation.",
      taskZh: "用一个来源要点改进家庭决策，然后说明一个局限。"
    },
    {
      type: "yesNoCheck",
      eyebrow: "Borderline vote",
      title: "Does the label alone settle the case?",
      zhTitle: "仅凭标签能决定案例吗？",
      prompt: "Vote yes or no before revealing the reason.",
      promptZh: "先投票判断是或否，再揭示理由。",
      items: [
        { text: "Investing is automatically better than saving because its expected return may be higher.", zh: "投资的预期回报可能更高，所以投资一定比储蓄更好。", answer: false, answerZh: "否", reason: "Money needed soon may require safety and availability more than possible return.", reasonZh: "近期需要的资金可能更需要安全和可用性，而不是可能的回报。" },
        { text: "Long-term surplus may be considered for investment after risk and fit checks.", zh: "经过风险和适合度检查后，长期余钱可以考虑用于投资。", answer: true, answerZh: "是", reason: "The longer horizon may allow risk, but it does not remove the need for evidence.", reasonZh: "较长期限可能允许承受风险，但不能取消证据要求。" },
        { text: "A one-week rumour-led price bet uses the same evidence standard as investment analysis.", zh: "根据传闻进行一周价格押注，与投资分析使用相同的证据标准。", answer: false, answerZh: "否", reason: "The short horizon and weak evidence make it speculation, not analysis.", reasonZh: "短期期限和薄弱证据使它属于投机，而不是分析。" }
      ]
    },
    {
      type: "section",
      eyebrow: "Part 3",
      title: "Choose the family next action",
      zhTitle: "选择家庭的下一步行动",
      notes: "Misconception correction -> output rehearsal -> individual exit."
    },
    {
      type: "peerTask",
      taskType: "missingSentence",
      eyebrow: "Output rehearsal",
      title: "Complete the family decision chain",
      zhTitle: "补全家庭决策链条",
      prompt: "Write the missing sentence that connects the family facts to different actions.",
      promptZh: "写出缺少的句子，把家庭事实与不同的行动连接起来。",
      steps: [
        { label: "1", text: "HK$12,000 is needed in six months and must remain available.", zh: "12,000港元在六个月后需要使用，并且必须保持可用。" },
        { label: "2", text: "__________", answer: "The HK$18,000 has a longer horizon, but investment still requires evidence and acceptance of possible loss.", zh: "18,000港元有较长期限，但投资仍需要证据并接受可能损失。" },
        { label: "3", text: "Therefore, save the near-term money, research the long-term surplus and reject the rumour-led bet.", zh: "因此，储蓄近期资金，研究长期余钱，并拒绝传闻驱动的押注。" }
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: "The HK$18,000 has a longer horizon, but investment still requires evidence and acceptance of possible loss.",
      missingSentenceAnswerZh: "18,000港元有较长期限，但投资仍需要证据并接受可能损失。",
      sharePrompt: "Check that every action follows the purpose, horizon and evidence.",
      sharePromptZh: "检查每一个行动是否由用途、期限和证据推导出来。"
    },
    {
      type: "classificationTask",
      eyebrow: "Final practice",
      title: "Allocate the family money by purpose",
      zhTitle: "按用途分配家庭资金",
      prompt: "Place each case in the most defensible next-action category.",
      promptZh: "把每个案例放入最合理的下一步行动类别。",
      categories: [
        { title: "Save", zhTitle: "储蓄", clue: "needed soon, must stay available" },
        { title: "Consider investing", zhTitle: "考虑投资", clue: "long-term surplus, research first" },
        { title: "Reject speculation", zhTitle: "拒绝投机", clue: "rumour-led short-term bet" }
      ],
      items: [
        { label: "A", text: "HK$12,000 for a bill due in six months", zh: "六个月后到期账单所需的12,000港元", answer: "Save", answerZh: "储蓄", reason: "The family needs safety and ready access.", reasonZh: "家庭需要安全和随时可用。" },
        { label: "B", text: "HK$18,000 not needed for at least five years", zh: "至少五年内不需要的18,000港元", answer: "Consider investing", answerZh: "考虑投资", reason: "Only the long-term surplus can move to researched investment consideration.", reasonZh: "只有长期余钱可以进入经过研究的投资考虑。" },
        { label: "C", text: "All HK$30,000 on a one-week rumour", zh: "根据一周传闻押上全部30,000港元", answer: "Reject speculation", answerZh: "拒绝投机", reason: "The action combines a short horizon, weak evidence and excessive exposure.", reasonZh: "这个行动结合了短期期限、薄弱证据和过度风险暴露。" }
      ],
      sharePrompt: "Write one caveat: the lesson classifies the action, not a named financial product.",
      sharePromptZh: "写出一个局限：本课给行动分类，而不是推荐具体金融产品。"
    },
    {
      type: "quiz",
      eyebrow: "Hinge question",
      title: "Which family decision uses the lesson rule?",
      zhTitle: "哪一个家庭决定使用了本课规则？",
      question: "Which decision is most defensible from the frozen facts?",
      zh: "根据冻结的事实，哪一个决定最合理？",
      choices: [
        "Invest all HK$30,000 because investing has possible return.",
        "Save all HK$30,000 because investment always loses money.",
        "Save the HK$12,000, research whether the HK$18,000 fits a long-term investment and reject the rumour-led bet.",
        "Use all HK$30,000 for the one-week rumour because the time horizon is short."
      ],
      answer: 2,
      explanation: "The decision matches each amount to its purpose, time horizon, liquidity need, evidence and possible loss.",
      explanationZh: "这个决定把每笔资金与其用途、期限、流动性需求、证据和可能损失相匹配。"
    },
    {
      type: "discussion",
      eyebrow: "Return to the dilemma",
      title: "What should the family do next?",
      zhTitle: "这个家庭下一步应该做什么？",
      question: "Give one action for the HK$12,000, one action for the HK$18,000 and one verdict on the rumour-led bet.",
      questionZh: "分别给12,000港元和18,000港元一个行动，并对传闻驱动的押注作出判断。",
      revealTitle: "Match each action to purpose, horizon and evidence",
      answer: "Save the HK$12,000 needed in six months. Gather evidence before considering whether the HK$18,000 long-term surplus fits an investment. Reject the one-week rumour-led bet as speculation.",
      answerZh: "储蓄六个月后需要的12,000港元。先收集证据，再考虑18,000港元长期余钱是否适合投资。拒绝基于一周传闻的押注，把它视为投机。",
      visual: investmentPhotos.investorMeetingReport
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Submit the family decision",
      zhTitle: "提交家庭决策",
      mode: "fillBlanks",
      items: [
        { prompt: "Money needed soon and kept available belongs in __________.", answer: "saving", zh: "近期需要并保持可用的资金属于__________。", answerZh: "储蓄" },
        { prompt: "Long-term surplus may be considered for __________ after evidence and risk checks.", answer: "investment", zh: "经过证据和风险检查后，长期余钱可以考虑用于__________。", answerZh: "投资" },
        { prompt: "A weak-evidence one-week price bet is __________.", answer: "speculation", zh: "依据薄弱证据进行一周价格押注属于__________。", answerZh: "投机" }
      ],
      notes: "Collect individually. The next lesson should retrieve purpose, time horizon, liquidity need and possible loss before introducing asset classes."
    }
  ]
};
