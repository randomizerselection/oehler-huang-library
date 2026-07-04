window.INVEST = window.INVEST || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit X Lesson Y: Lesson title",
    sources: []
  },
  slides: [
    {
      type: "hero",
      eyebrow: "Lesson overview",
      title: "Lesson title",
      zhTitle: "课程标题",
      subtitle: "Unit X Lesson Y",
      kicker: "Replace with one short guiding question.",
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
        { label: "1", term: "Term A", termZh: "术语A", answer: "Replace with a full, simple model definition.", answerZh: "替换为完整、简单的参考定义。" },
        { label: "2", term: "Term B", termZh: "术语B", answer: "Replace with a full, simple model definition.", answerZh: "替换为完整、简单的参考定义。" },
        { label: "3", term: "Term C", termZh: "术语C", answer: "Replace with a full, simple model definition.", answerZh: "替换为完整、简单的参考定义。" }
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
        "objective one",
        "objective two",
        "objective three"
      ],
      zhBullets: [
        "完成第一个学习目标。",
        "完成第二个学习目标。",
        "完成第三个学习目标。"
      ]
    },
    {
      type: "section",
      eyebrow: "Part 1",
      part: "1",
      title: "Replace with the first lesson part",
      zhTitle: "替换为第一部分标题",
      notes: "Keep section dividers simple. Each taught section after this starts with brief retrieval from retrievalBase or earlier course concepts, then moves through attempt, reveal/teach, formative check and improvement."
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
      type: "discussion",
      eyebrow: "Try first",
      title: "Replace with an answerable prompt",
      zhTitle: "替换为可回答的问题",
      visual: window.INVEST.photos?.financialAnalysisDesk,
      question: "Ask students to choose, predict, calculate, classify or correct a misconception before revealing the explanation.",
      questionZh: "先让学生选择、预测、计算、分类或纠正误解，再揭示解释。",
      revealTitle: "Answer: evidence comes before judgement",
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
        { text: "First key link uses a __________.", answer: "blank", zh: "第一步使用一个关键空格。" },
        { text: "Second key link changes __________.", answer: "something", zh: "第二步说明发生了什么变化。" },
        { text: "Third key link affects the __________.", answer: "outcome", zh: "第三步连接到结果。" }
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
      type: "compare",
      eyebrow: "Review",
      title: "Compare two ideas in a T-table",
      zhTitle: "用T表比较两个概念",
      mode: "fillBlanks",
      leftTitle: "Evidence-based analysis",
      leftTitleZh: "基于证据的分析",
      left: [
        { label: "1", text: "Starts with a dated __________.", answer: "source", zh: "从带日期的来源开始。" },
        { label: "2", text: "Names a possible __________.", answer: "risk", zh: "说出一个可能的风险。" }
      ],
      rightTitle: "Weak opinion",
      rightTitleZh: "薄弱观点",
      right: [
        { label: "1", text: "Starts with personal __________.", answer: "familiarity", zh: "从个人熟悉度开始。" },
        { label: "2", text: "Ignores the __________ paid.", answer: "price", zh: "忽视支付的价格。" }
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
        { title: "Evidence", zhTitle: "证据", clue: "source, date, figure" },
        { title: "Risk", zhTitle: "风险", clue: "what could go worse" },
        { title: "Weak opinion", zhTitle: "薄弱观点", clue: "claim without support" }
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
      ]
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
        { prompt: "The key term or rule I must remember is __________.", answer: "lesson target", zh: "我必须记住的关键词或规则是……" },
        { prompt: "The evidence, formula or source habit I used was __________.", answer: "lesson skill", zh: "我使用的证据、公式或来源习惯是……" },
        { prompt: "My individual output answers the question: __________.", answer: "guiding question", zh: "我的个人输出回答的问题是……" }
      ],
      notes: "Replace these placeholders with the lesson exitTicket and primaryOutput. The final check should be individual, collectable and aligned with the follow-up quiz; do not force a generic limitation sentence when the lesson output is a calculation, classification or source log."
    }
  ]
};
