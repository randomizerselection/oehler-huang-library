window.INVEST = window.INVEST || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit X Lesson Y: Lesson title",
    sources: []
  },
  handout: {
    title: "Lesson title",
    subtitle: "Unit X Lesson Y",
    description: "Use a short grounded scenario and the lesson evidence to complete one investment judgement.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Grounded scenario and source box",
        instruction: "Read the real, dated evidence and the clearly labelled mock or anonymised decision.",
        blocks: [
          {
            type: "scenario",
            title: "Real evidence, mock or anonymised decision",
            context: "Replace with a two- or three-sentence scenario that combines the source-backed evidence with the lesson decision.",
            realData: [
              { label: "Dated source-backed figure", value: "Replace with value and unit", source: "Source title | evidence date" }
            ],
            fictionalElement: "Identify every invented or anonymised profile detail.",
            lessonUse: "State the exact slide activity and handout task that use this evidence.",
            limitation: "State what the real evidence cannot prove about the case or future result."
          }
        ]
      },
      {
        label: "2",
        title: "Vocabulary",
        instruction: "Complete and use the lesson definitions.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Term A", prompt: "Replace with a definition containing one conceptual __________.", answer: "blank" }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Evidence and Data Analysis",
        instruction: "Use the grounded scenario to identify or interpret evidence, explain its meaning and make a judgement.",
        blocks: [
          {
            type: "table",
            columns: ["Evidence", "Value", "What it may show", "What it cannot show"],
            rows: [
              ["Source-backed item", "Value and unit", "Replace with a focused interpretation", "Replace with one limitation"]
            ]
          }
        ]
      },
      {
        label: "4",
        title: "Calculation or judgement task",
        instruction: "Apply the lesson formula or decision rule to the scenario.",
        blocks: [
          { type: "writing", question: "Replace with the lesson calculation, interpretation or judgement task.", lines: 6 }
        ]
      },
      {
        label: "5",
        title: "Misconception check",
        instruction: "Correct one explicit investment shortcut using the scenario evidence.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "Weak claim", prompt: "Replace with the lesson misconception.", lines: 2 },
              { label: "Correction", prompt: "Correct it using one source-backed fact and the lesson concept.", lines: 4 }
            ]
          }
        ]
      },
      {
        label: "6",
        title: "Individual written output",
        instruction: "Complete the lesson primary output independently.",
        blocks: [
          { type: "writing", question: "Replace with the exact course-map studentOutput.", lines: 8 }
        ]
      }
    ],
    sources: "List the scenario source title, publication or evidence date, accessed date and limitation. Label mock or anonymised details."
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Lesson overview",
      title: "Lesson title",
      zhTitle: "课程标题",
      subtitle: "Unit X Lesson Y",
      visual: window.INVEST.photos?.modernTradingDesk
    },
    {
      type: "dataSnapshot",
      eyebrow: "Data Snapshot",
      title: "Start with focused source facts",
      zhTitle: "从聚焦的来源事实开始",
      subtitle: "Recover the facts and prior lesson links before new content.",
      ticker: "Handout A",
      task: "Read the three facts. Write what each helps you remember or check.",
      taskZh: "阅读三个事实，写出每个事实帮助你回忆或核查什么。",
      visual: window.INVEST.photos?.financialAnalysisDesk,
      revealMetricValues: true,
      focusMetrics: [
        { label: "1. Company", value: "Company name" },
        { label: "2. Code", value: "Ticker / code" },
        { label: "3. Source date", value: "Date" }
      ]
    },
    {
      type: "peerTask",
      taskType: "definitionRecall",
      eyebrow: "Recall",
      title: "Recall last lesson",
      zhTitle: "回忆上一课",
      prompt: "Write one-sentence definitions before reveal.",
      promptZh: "先写一句定义，再揭示答案。",
      definitionItems: [
        { label: "1", term: "Term A", termZh: "术语A", answer: "Use the CFA-inspired textbook definition from the course overview when the term exists there.", answerZh: "若课程总览已有该术语，请使用其中受CFA启发的教材式定义。" },
        { label: "2", term: "Term B", termZh: "术语B", answer: "If no overview match exists, write a complete definition with the same precise finance style.", answerZh: "若总览没有匹配术语，请用同样精确的金融表达写出完整定义。" },
        { label: "3", term: "Term C", termZh: "术语C", answer: "Keep slide blanks on the concept payload, not on filler words or the term itself.", answerZh: "幻灯片填空应放在概念关键词上，而不是填充词或术语本身。" }
      ],
      sharePrompt: "Compare with a partner, then improve one definition.",
      sharePromptZh: "与同伴比较，然后改进一个定义。"
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本课结束时，你能够",
      bullets: [
        "define the key term",
        "use the evidence source",
        "write the next action"
      ],
      zhBullets: [
        "定义关键词。",
        "使用证据来源。",
        "写出下一步行动。"
      ],
      highlights: [
        ["key term"],
        ["evidence source"],
        ["next action"]
      ],
      zhHighlights: [
        ["关键词"],
        ["证据来源"],
        ["下一步行动"]
      ]
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "Replace with a concise academic topic",
      zhTitle: "替换为简洁的学术主题",
      notes: "Name the knowledge students should copy into their notebooks, such as Investment and return or What is investment? Do not use an activity instruction, slogan or transition. Each taught section then starts with brief retrieval and moves through attempt, reveal or teaching, formative check and improvement."
    },
    {
      type: "visualPause",
      eyebrow: "Look first",
      title: "Replace with a concrete visual bridge",
      visual: window.INVEST.photos?.modernTradingDesk,
      notes: [
        "The projected slide is image-only: no visible title, prompt, caption or credit.",
        "Put the observation/retrieval question and the next teaching bridge in these notes, or on the slide before/after the pause."
      ]
    },
    {
      type: "term",
      eyebrow: "Definition",
      title: "Key term",
      term: "Key term",
      termZh: "关键词",
      keywordVisuals: [
        { label: "Visible keyword image", labelZh: "关键词配图", visual: window.INVEST.photos?.stockReportCalculator }
      ],
      definition: "A key term is the precise concept students must use when writing an evidence-based investment judgement.",
      definitionBlanks: ["precise concept"],
      definitionZh: "关键词是学生在写出基于证据的投资判断时必须使用的准确概念。",
      notes: "Keep definition text canonical and put the projected fill-in answer in definitionBlanks."
    },
    {
      type: "discussion",
      eyebrow: "Try first",
      title: "Replace with an answerable prompt",
      zhTitle: "替换为可回答的问题",
      visual: window.INVEST.photos?.financialAnalysisDesk,
      question: "Ask students to choose, predict, calculate, classify or correct a misconception before revealing the explanation.",
      questionZh: "先让学生选择、预测、计算、分类或纠正误解，再揭示解释。",
      revealTitle: "Evidence comes before judgement",
      answer: "Reveal a concise model answer only after students commit to an answer.",
      answerZh: "学生先作答后，再揭示简洁的参考答案。",
      notes: "Use the response as a formative decision point: move on, reteach, ask for improvement or collect the written check."
    },
    {
      type: "flow",
      eyebrow: "Key idea",
      title: "Replace with the concept flow",
      zhTitle: "替换为概念流程",
      visual: window.INVEST.photos?.stockReportCalculator,
      flowStyle: "sequence",
      steps: [
        { text: "First key link uses a __________.", answer: "blank", zh: "第一步使用一个关键空格。", visual: window.INVEST.photos?.annualReports, visualLabel: "Source evidence", visualLabelZh: "来源证据" },
        { text: "Second key link changes __________.", answer: "something", zh: "第二步说明发生了什么变化。", visual: window.INVEST.photos?.keywordDemandRiskEmptyStore, visualLabel: "Change or risk", visualLabelZh: "变化或风险" },
        { text: "Third key link affects the __________.", answer: "outcome", zh: "第三步连接到结果。", visual: window.INVEST.photos?.keywordDividendCheque, visualLabel: "Outcome", visualLabelZh: "结果" }
      ]
    },
    {
      type: "peerTask",
      eyebrow: "Practice check",
      title: "Replace with the practice task",
      zhTitle: "替换为练习任务",
      visual: window.INVEST.photos?.businessChartsPaper,
      steps: [
        { text: "Write your own answer first.", zh: "先写出自己的答案。" },
        { text: "Compare with your partner and underline the evidence.", zh: "与同伴比较，并划出证据。" },
        { text: "Improve one sentence before the reveal or teacher check.", zh: "揭示或教师检查前，改进一个句子。" }
      ],
      sampleAnswer: "Reveal a complete model answer, not a fragment.",
      sampleAnswerZh: "揭示完整的参考答案，而不是片段。",
      notes: "Vary these checks across the lesson: hinge question, sort, mini calculation, source check, misconception correction, peer comparison, cold-call justification or individual written check."
    },
    {
      type: "rankingTask",
      eyebrow: "Student task",
      title: "Rank choices on a risk line",
      zhTitle: "按风险线给选择排序",
      visual: window.INVEST.photos?.businessChartsPaper,
      prompt: "Assign ranks 1–4 from lower to higher risk, then defend rank 4.",
      promptZh: "按风险从低到高标出1至4，然后为第4位写出理由。",
      axis: {
        low: "Lower risk",
        lowZh: "较低风险",
        high: "Higher risk",
        highZh: "较高风险",
        note: "The order must be justified, not guessed",
        noteZh: "排序必须有理由，而不是猜测"
      },
      items: [
        { label: "A", text: "Choice A", zh: "选择A", visual: window.INVEST.photos?.assetCashSavings },
        { label: "B", text: "Choice B", zh: "选择B", visual: window.INVEST.photos?.assetPropertyBuilding },
        { label: "C", text: "Choice C", zh: "选择C", visual: window.INVEST.photos?.assetShareCertificate },
        { label: "D", text: "Choice D", zh: "选择D", visual: window.INVEST.photos?.assetCommoditiesPort }
      ],
      revealLabel: "One defensible order",
      revealLabelZh: "一种合理排序",
      modelOrder: [
        { rank: "1", label: "A", text: "Choice A", zh: "选择A", reason: "Use the lowest-risk case only when the reason is explicit.", reasonZh: "只有在理由明确时才作为较低风险案例。" },
        { rank: "2", label: "B", text: "Choice B", zh: "选择B", reason: "Explain which evidence makes it more or less risky.", reasonZh: "解释哪些证据使它风险更高或更低。" },
        { rank: "3", label: "C", text: "Choice C", zh: "选择C", reason: "Connect uncertainty to possible worse-than-expected results.", reasonZh: "把不确定性连接到可能低于预期的结果。" },
        { rank: "4", label: "D", text: "Choice D", zh: "选择D", reason: "Name the evidence that makes this the highest-risk choice.", reasonZh: "指出使它成为最高风险选择的证据。" }
      ],
      caveat: "A different order can be valid if the evidence supports it.",
      caveatZh: "如果证据支持，不同排序也可以成立。",
      writtenCheck: "Write one evidence-based reason for your highest-risk card.",
      writtenCheckZh: "为你选择的最高风险卡片写一个基于证据的理由。",
      notes: "Use three to five concise options. Students assign each option a rank in one vertical decision ladder; reveal one defensible sequence with a reason for every position.",
      notes: "Use rankingTask for ordered low-to-high, risk-return, priority or confidence tasks where students must defend a comparative order."
    },
    {
      type: "peerTask",
      taskType: "missingSentence",
      eyebrow: "Pair task",
      title: "Complete the missing sentence",
      zhTitle: "补全缺失句子",
      prompt: "Use the first and last step to write the missing explanation sentence.",
      promptZh: "利用第一步和最后一步，写出缺失的解释句。",
      steps: [
        { label: "1", text: "A source gives a dated fact.", zh: "一个来源提供了带日期的事实。" },
        { label: "2", text: "__________", answer: "The analyst connects the fact to expectations.", zh: "分析者把事实连接到预期。" },
        { label: "3", text: "The judgement becomes more careful.", zh: "判断会变得更谨慎。" }
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: "The analyst connects the fact to expectations.",
      missingSentenceAnswerZh: "分析者把事实连接到预期。",
      sharePrompt: "Read your sentence aloud and check that it explains the link.",
      sharePromptZh: "读出你的句子，并检查它是否解释了连接。"
    },
    {
      type: "dataSnapshot",
      eyebrow: "Data Snapshot",
      title: "Company: frozen data snapshot",
      zhTitle: "公司：冻结数据快照",
      visual: window.INVEST.photos?.tencentBinhaiTowers,
      sourceStamp: "Source | units | snapshot date",
      focusMetrics: [
        { label: "Metric 1", value: "Value" },
        { label: "Metric 2", value: "Value" },
        { label: "Metric 3", value: "Value" }
      ],
      task: "Read the three figures. Write what each shows before judging what it proves.",
      taskZh: "阅读三个数据。先写出每个数据说明什么，再判断它能证明什么。"
    },
    {
      type: "conceptTriad",
      eyebrow: "Concept map",
      title: "Compare three beginner ideas",
      zhTitle: "比较三个入门概念",
      visual: window.INVEST.photos?.businessChartsPaper,
      revealDetails: true,
      concepts: [
        {
          label: "Concept A",
          tag: "Use when...",
          definition: "Definition A.",
          definitionZh: "定义A。"
        },
        {
          label: "Concept B",
          tag: "Different because...",
          definition: "Definition B.",
          definitionZh: "定义B。"
        },
        {
          label: "Concept C",
          tag: "Do not confuse",
          definition: "Definition C.",
          definitionZh: "定义C。"
        }
      ],
      prompt: "Before reveal, classify one classroom example into the correct concept.",
      promptZh: "揭示前，把一个课堂例子归入正确概念。"
    },
    {
      type: "visualGrid",
      eyebrow: "Visual examples",
      title: "Compare examples with pictures",
      zhTitle: "用图片比较例子",
      prompt: "Use the pictures to name what is similar and what is different.",
      promptZh: "利用图片说出相同点和不同点。",
      cards: [
        {
          title: "Example A",
          zhTitle: "例子A",
          body: "Short teaching label.",
          bodyZh: "简短教学标签。",
          visual: window.INVEST.photos?.assetCashSavings
        },
        {
          title: "Example B",
          zhTitle: "例子B",
          body: "Short teaching label.",
          bodyZh: "简短教学标签。",
          visual: window.INVEST.photos?.assetPropertyBuilding
        },
        {
          title: "Example C",
          zhTitle: "例子C",
          body: "Short teaching label.",
          bodyZh: "简短教学标签。",
          visual: window.INVEST.photos?.assetSharesScreen
        },
        {
          title: "Example D",
          zhTitle: "例子D",
          body: "Short teaching label.",
          bodyZh: "简短教学标签。",
          visual: window.INVEST.photos?.assetCommoditiesPort
        }
      ]
    },
    {
      type: "compare",
      eyebrow: "Review",
      title: "Compare two ideas in a T-table",
      zhTitle: "用T表比较两个概念",
      mode: "fillBlanks",
      leftTitle: "Evidence-based analysis",
      leftTitleZh: "基于证据的分析",
      leftVisual: window.INVEST.photos?.annualReports,
      leftVisualLabel: "Source evidence",
      leftVisualLabelZh: "来源证据",
      left: [
        { label: "1", text: "Starts with a dated __________.", answer: "source", zh: "从带日期的__________开始。", answerZh: "来源" },
        { label: "2", text: "Names a possible __________.", answer: "risk", zh: "说出一个可能的__________。", answerZh: "风险" }
      ],
      rightTitle: "Weak opinion",
      rightTitleZh: "薄弱观点",
      rightVisual: window.INVEST.photos?.modernTradingDesk,
      rightVisualLabel: "Unsupported view",
      rightVisualLabelZh: "缺少证据的观点",
      right: [
        { label: "1", text: "Starts with personal __________.", answer: "familiarity", zh: "从个人__________开始。", answerZh: "熟悉度" },
        { label: "2", text: "Ignores the __________ paid.", answer: "price", zh: "忽视支付的__________。", answerZh: "价格" }
      ],
      prompt: "Fill the blanks, then explain which side is stronger.",
      promptZh: "填空后，解释哪一边更有说服力。"
    },
    {
      type: "classificationTask",
      eyebrow: "Classify",
      title: "Classify the evidence habit",
      zhTitle: "给证据习惯分类",
      prompt: "Classify each case using the taught categories.",
      promptZh: "用已学类别给每个案例分类。",
      categories: [
        { title: "Evidence", zhTitle: "证据", clue: "source, date, figure", visual: window.INVEST.photos?.annualReports },
        { title: "Risk", zhTitle: "风险", clue: "what could go worse", visual: window.INVEST.photos?.keywordDemandRiskEmptyStore },
        { title: "Weak opinion", zhTitle: "薄弱观点", clue: "claim without support", visual: window.INVEST.photos?.modernTradingDesk }
      ],
      items: [
        { label: "A", text: "Uses a dated annual-report figure.", zh: "使用带日期的年报数据。", answer: "Evidence", answerZh: "证据", reason: "It names a source-backed fact.", reasonZh: "它说出了有来源支持的事实。" },
        { label: "B", text: "Says the company is famous, so the share is safe.", zh: "说公司很有名，所以股票安全。", answer: "Weak opinion", answerZh: "薄弱观点", reason: "Familiarity is not evidence of value or risk.", reasonZh: "熟悉度不是价值或风险的证据。" },
        { label: "C", text: "Asks what could reduce future profit.", zh: "询问什么可能降低未来利润。", answer: "Risk", answerZh: "风险", reason: "It checks what could go worse than expected.", reasonZh: "它检查什么可能比预期更差。" }
      ],
      sharePrompt: "Defend one classification with a reason.",
      sharePromptZh: "用理由说明一个分类。"
    },
    {
      type: "yesNoCheck",
      eyebrow: "Check",
      title: "Yes or no: does this prove quality?",
      zhTitle: "判断：这能证明投资质量吗？",
      prompt: "Vote yes or no before revealing the reason.",
      promptZh: "先投票判断是或否，再揭示理由。",
      items: [
        { text: "A stock code proves the share is a good investment.", zh: "股票代码能证明这只股票是好投资。", answer: false, answerZh: "否", reason: "A code identifies the security; it is not a quality signal.", reasonZh: "代码识别证券，但不是质量信号。" },
        { text: "A dated source is useful evidence.", zh: "带日期的来源是有用证据。", answer: true, answerZh: "是", reason: "The date helps judge whether the evidence is current.", reasonZh: "日期帮助判断证据是否及时。" },
        { text: "One source can prove the full investment case.", zh: "一个来源能证明完整投资判断。", answer: false, answerZh: "否", reason: "A judgement still needs return, risk, price and limits.", reasonZh: "判断仍需要回报、风险、价格和局限。" }
      ],
      notes: "Use three or four concise statements. Students click Yes or No to score the choice and reveal that row's verdict and reason; the shared reveal controls remain available for teacher-led voting."
    },
    {
      type: "sourceLens",
      eyebrow: "Source check",
      title: "Can this source support the claim?",
      zhTitle: "这个来源能支持这个观点吗？",
      visual: window.INVEST.photos?.financialAnalysisDesk,
      revealAnswers: true,
      metaItems: [
        { label: "Source title", value: "Replace with source title" },
        { label: "Date", value: "Published or accessed date" }
      ],
      checks: [
        { label: "Authority", prompt: "Who produced this evidence?", zh: "谁提供了这项证据？", answer: "Name the source and why it is useful.", answerZh: "写出来源，并说明它为什么有用。" },
        { label: "Limit", prompt: "What can it not prove alone?", zh: "它单独不能证明什么？", answer: "Name one missing evidence need.", answerZh: "说出还缺少哪一类证据。" }
      ],
      task: "Write one source-backed sentence and one limitation.",
      taskZh: "写出一句有来源支持的话，并写出一个局限。"
    },
    {
      type: "quoteMap",
      eyebrow: "Quote page",
      title: "Read the quote page before the opinion",
      zhTitle: "先读报价页，再形成观点",
      visual: window.INVEST.photos?.smartphoneMarketChart,
      quoteLabel: "Classroom quote snapshot",
      quoteTitle: "Company code / exchange / price / date",
      revealValues: true,
      fields: [
        { label: "Company", value: "Company name", note: "Do not confuse company with share." },
        { label: "Code", value: "Ticker / stock code", note: "Identifier, not a quality signal." },
        { label: "Exchange", value: "Market", note: "Where the security is listed." },
        { label: "Price", value: "Price and currency", note: "One share at one time." },
        { label: "Date/time", value: "Snapshot time", note: "Price evidence needs a date." },
        { label: "Source", value: "Provider", note: "Record before judging." }
      ],
      prompt: "Before reveal, point to the field that proves the identity of the listed share.",
      promptZh: "揭示前，指出哪个字段能证明上市股票的身份。",
      answer: "A quote page identifies a listed security and a dated price; it does not prove investment quality.",
      answerZh: "报价页能识别上市证券和带日期的价格，但不能证明投资质量。"
    },
    {
      type: "comparisonMatrix",
      eyebrow: "Compare",
      title: "Compare two choices with the same criteria",
      zhTitle: "用相同标准比较两个选择",
      visual: window.INVEST.photos?.businessChartsPaper,
      revealCells: true,
      cornerLabel: "Test",
      columns: [
        { label: "Choice A", note: "Replace with company, ETF or strategy" },
        { label: "Choice B", note: "Replace with comparison case" }
      ],
      rows: [
        { label: "Evidence", values: ["Known source", "Known source"] },
        { label: "Possible return", values: ["Return argument", "Return argument"] },
        { label: "Risk", values: ["Risk argument", "Risk argument"] },
        { label: "Price paid", values: ["Valuation link", "Valuation link"] }
      ],
      prompt: "Choose the stronger case only after filling every criterion.",
      promptZh: "填完每个标准后，再选择更强的案例。"
    },
    {
      type: "evidenceSimulator",
      eyebrow: "Teacher-led simulation",
      title: "Reveal clues, then choose the next step",
      zhTitle: "揭示线索，然后选择下一步",
      prompt: "After each clue, ask the class to choose 1, 2 or 3.",
      promptZh: "每条线索出现后，请全班选择1、2或3。",
      evidenceLabel: "Goal clues",
      decisionLabel: "Choose one after each clue",
      facts: [
        { label: "Purpose and amount", labelZh: "用途和金额", value: "University fees · CNY 180,000", valueZh: "大学学费·180,000元人民币" },
        { label: "Time horizon", labelZh: "时间期限", value: "The fees are due in six years", valueZh: "学费将在六年后支付" },
        { label: "Access need", labelZh: "资金使用需要", value: "The payment date is fixed", valueZh: "付款日期是固定的" },
        { label: "Possible loss", labelZh: "可能的损失", value: "A loss near the date could block the goal", valueZh: "临近日期的损失可能阻碍目标实现" }
      ],
      decisionOptions: [
        { id: "keep-available", label: "Keep available", labelZh: "保持资金可用", detail: "Use this when the money is needed soon.", detailZh: "资金很快要使用时，选择此项。", tone: "caution" },
        { id: "more-information", label: "Need more information", labelZh: "需要更多信息", detail: "Use this when the amount, date or possible loss is unclear.", detailZh: "金额、日期或可能损失不清楚时，选择此项。", tone: "neutral" },
        { id: "consider-investing", label: "Consider investing", labelZh: "可考虑投资", detail: "Use this for a later goal with no urgent access need; check risk first.", detailZh: "目标较远且无需紧急使用资金时可选择；先检查风险。", tone: "positive" }
      ],
      conclusion: {
        verdict: "more-information",
        tone: "caution",
        label: "Need more information before deciding",
        labelZh: "决定之前需要更多信息",
        text: "Six years gives the family time, but the fixed payment date and possible loss must be checked before investment could be considered.",
        textZh: "六年期限给了家庭一定时间，但在考虑投资之前，仍必须检查固定付款日期和可能损失的影响。"
      },
      instruction: "Students show 1, 2 or 3 with their fingers. The teacher clicks only Reveal next clue.",
      notes: "Use this only as a teacher-led whole-class simulation. Reveal one clue at a time and ask students to justify any change of choice."
    },
    {
      type: "catalystTimeline",
      eyebrow: "Price movement",
      title: "Connect information to expectations",
      zhTitle: "把信息与预期连接起来",
      visual: window.INVEST.photos?.financeChartWhiteboard,
      revealEffects: true,
      effectLabel: "Expectation link",
      events: [
        { date: "Step 1", title: "New information", detail: "Replace with a source event.", detailZh: "替换为一个来源事件。", effect: "Students explain why expectations might change.", effectZh: "学生解释为什么预期可能改变。" },
        { date: "Step 2", title: "Market reaction", detail: "Replace with the observed price or volume move.", detailZh: "替换为观察到的价格或成交量变化。", effect: "Students avoid claiming the source proves the whole cause.", effectZh: "学生避免声称一个来源证明全部原因。" },
        { date: "Step 3", title: "Careful claim", detail: "Replace with the cautious sentence.", detailZh: "替换为谨慎句子。", effect: "Students link information to price without advice.", effectZh: "学生连接信息和价格，但不提建议。" }
      ],
      prompt: "Write one cautious sentence: the information may have mattered because...",
      promptZh: "写一句谨慎的话：这个信息可能重要，因为……"
    },
    {
      type: "judgementFrame",
      eyebrow: "Judgement frame",
      title: "Build a balanced investment judgement",
      zhTitle: "形成平衡的投资判断",
      visual: window.INVEST.photos?.stockReportCalculator,
      revealAnswers: true,
      stages: [
        { label: "Evidence", prompt: "What source-backed fact matters?", zh: "哪个有来源支持的事实重要？", answer: "Use one dated fact.", answerZh: "使用一个带日期的事实。" },
        { label: "Return", prompt: "How could value or profit improve?", zh: "价值或利润可能怎样改善？", answer: "Name the return mechanism.", answerZh: "说出回报机制。" },
        { label: "Risk", prompt: "What could go worse than expected?", zh: "什么可能比预期更差？", answer: "Name the risk.", answerZh: "说出风险。" },
        { label: "Price paid", prompt: "Why does the current price matter?", zh: "为什么当前价格重要？", answer: "Link to the price paid.", answerZh: "连接到支付价格。" }
      ],
      finalPrompt: "Write one final judgement sentence.",
      finalPromptZh: "写出一句最终判断。"
    },
    {
      type: "analystBoard",
      eyebrow: "Analyst Board",
      title: "Judge evidence, expectations and price paid",
      zhTitle: "判断证据、预期和支付价格",
      visual: window.INVEST.photos?.financialAnalysisDesk,
      revealBlocks: true,
      blocks: [
        { label: "Evidence block 1", title: "What do we know?", body: "Replace with one concise body sentence.", zh: "替换为一句简洁的证据句。" },
        { label: "Evidence block 2", title: "What is expected?", body: "Replace with one concise body sentence.", zh: "替换为一句简洁的预期句。" },
        { label: "Evidence block 3", title: "What is the price/risk link?", body: "Replace with one concise body sentence.", zh: "替换为一句简洁的价格或风险句。" }
      ],
      prompt: "Which block is missing from the weak judgement?",
      promptZh: "这个弱判断缺少哪一块？"
    },
    {
      type: "riskRegister",
      eyebrow: "Risk Register",
      title: "A strong company can still be a risky share",
      zhTitle: "强公司仍可能是有风险的股票",
      visual: window.INVEST.photos?.shippingPort,
      revealEffects: true,
      effectLabel: "Effect link",
      table: [
        ["Risk", "Investor question", "Likely effect"],
        ["Risk 1", "Ask the investor question.", "Link the risk to future profit, expectations or price paid."],
        ["Risk 2", "Ask the investor question.", "Link the risk to future profit, expectations or price paid."],
        ["Risk 3", "Ask the investor question.", "Link the risk to future profit, expectations or price paid."],
        ["Risk 4", "Ask the investor question.", "Link the risk to future profit, expectations or price paid."]
      ],
      prompt: "Choose one risk and complete: risk -> future profit or expectations -> price paid.",
      promptZh: "选择一个风险并完成：风险 -> 未来利润或预期 -> 支付价格。"
    },
    {
      type: "exam",
      eyebrow: "Output rehearsal",
      title: "Replace with the full exam-style question. [marks]",
      zhTitle: "替换为完整的考试风格问题",
      visual: window.INVEST.photos?.businessChartsPaper,
      revealKeywords: true,
      prompt: "Write the plan first. Reveal keywords only after students attempt the lesson primary output.",
      zh: "先写计划。学生尝试本课主要输出后，再揭示关键词。",
      keywords: ["keyword 1", "keyword 2", "keyword 3"]
    },
    {
      type: "modelAnswer",
      eyebrow: "Model answer",
      title: "Replace with the same exam-style question. [marks]",
      zhTitle: "替换为同一个考试风格问题",
      visual: window.INVEST.photos?.financialAnalysisDesk,
      cueLabel: "Compare your answer",
      cueText: "Underline evidence, then underline the limitation or judgement link.",
      cueTextZh: "先划出证据，再划出局限或判断连接。",
      paragraphs: [
        "Reveal paragraph one after students compare their first point.",
        "Reveal paragraph two after students compare their second point."
      ],
      paragraphsZh: [
        "学生比较第一个要点后，再揭示第一段。",
        "学生比较第二个要点后，再揭示第二段。"
      ]
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Retrieve and submit the lesson output",
      zhTitle: "回忆并提交本课输出",
      mode: "fillBlanks",
      items: [
        { prompt: "The key term or rule I must remember is __________.", answer: "lesson target", zh: "我必须记住的关键词或规则是__________。", answerZh: "本课目标" },
        { prompt: "The evidence, formula or source habit I used was __________.", answer: "lesson skill", zh: "我使用的证据、公式或来源习惯是__________。", answerZh: "本课技能" },
        { prompt: "My individual output answers the question: __________.", answer: "guiding question", zh: "我的个人输出回答的问题是__________。", answerZh: "引导问题" }
      ],
      notes: "Replace these placeholders with the lesson exitTicket and primaryOutput. The final check should be individual, collectable and aligned with the follow-up quiz; do not force a generic limitation sentence when the lesson output is a calculation, classification or source log."
    }
  ]
};
