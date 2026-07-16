window.INVEST = window.INVEST || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit X Lesson Y: Lesson title",
    sources: []
  },
  stockMarketGame: {
    integrationLevel: "required formative course lab",
    studentAction: "Replace with the exact stockMarketGame.studentAction from the canonical course map.",
    requiredOutput: "Complete the assigned workbook judgement or activity insert; add a team-log row when the lesson creates a decision or monitoring update.",
    workbook: {
      pages: "Replace with the exact stockMarketGame.workbook.pages value.",
      treatment: "Replace with the exact stockMarketGame.workbook.treatment value.",
      studentAction: "Replace with the exact stockMarketGame.workbook.studentAction value."
    },
    dataRule: "Capture and freeze the required portfolio, watchlist, transaction, quote or benchmark evidence at the start of the lesson."
  },
  handout: {
    title: "Lesson title",
    subtitle: "Unit X Lesson Y",
    description: "Exam revision / 考试复习：complete bilingual definitions during the lesson, then revise the numbered knowledge points.",
    sections: [
      {
        label: "1",
        title: "Key definitions / 核心定义",
        instruction: "Complete the English key terms during the lesson; use the Chinese line to check meaning.",
        blocks: [
          {
            type: "bilingualDefinitions",
            items: [
              { term: "Term 1", termZh: "术语一", prompt: "Replace selected key words with __________.", answers: ["exact answer"], definitionZh: "填写完整的简体中文定义。" },
              { term: "Term 2", termZh: "术语二", prompt: "Replace selected key words with __________.", answers: ["exact answer"], definitionZh: "填写完整的简体中文定义。" },
              { term: "Term 3", termZh: "术语三", prompt: "Replace selected key words with __________.", answers: ["exact answer"], definitionZh: "填写完整的简体中文定义。" }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Numbered revision points / 编号复习要点",
        instruction: "Memorise these short bilingual examinable statements.",
        blocks: [
          {
            type: "bilingualNumberedKnowledge",
            points: [
              { en: "Replace with the lesson core claim as a complete sentence.", zh: "填写对应的简体中文完整句子。" },
              { en: "Replace with one essential relationship or condition taught in the lesson.", zh: "填写对应的简体中文完整句子。" },
              { en: "Replace with the exact formula or qualitative decision rule.", zh: "填写对应的简体中文完整句子。" },
              { en: "Replace with the concise correction to the canonical misconception.", zh: "填写对应的简体中文完整句子。" }
            ]
          }
        ]
      }
    ],
    sources: "List only sources used to support definitions and knowledge printed on this handout. Student work remains in the SMG workbook, activity insert or team log."
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
      type: "answer",
      eyebrow: "Recall",
      title: "Recall last lesson",
      zhTitle: "回忆上一课",
      items: [
        { prompt: "Term A means __________.", answer: "replace with the exact definition", zh: "术语A是__________。", answerZh: "替换为准确的定义" },
        { prompt: "Term B means __________.", answer: "replace with the exact definition", zh: "术语B是__________。", answerZh: "替换为准确的定义" },
        { prompt: "Term C means __________.", answer: "replace with the exact definition", zh: "术语C是__________。", answerZh: "替换为准确的定义" }
      ],
      notes: "Students complete all three before reveal, then compare and improve one definition."
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end, you can",
      zhTitle: "本课结束时，你能够",
      phases: ["Define", "Use", "Produce"],
      bullets: [
        "[Lesson terms and rule]",
        "[Named evidence or calculation]",
        "[Specified output and success condition]"
      ],
      zhBullets: [
        "[本课术语和规则]",
        "[指定证据或计算]",
        "[指定成果和成功条件]"
      ],
      highlights: [
        ["[Lesson terms and rule]"],
        ["[Named evidence or calculation]"],
        ["[Specified output and success condition]"]
      ],
      zhHighlights: [
        ["[本课术语和规则]"],
        ["[指定证据或计算]"],
        ["[指定成果和成功条件]"]
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
      revealTitle: "Evidence should come before judgement.",
      revealTitleZh: "先看证据，再作判断。",
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
      type: "flow",
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
      type: "flow",
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
      type: "answer",
      eyebrow: "Classify",
      title: "Classify the evidence habit",
      zhTitle: "给证据习惯分类",
      items: [
        { prompt: "A dated annual-report figure is __________.", answer: "evidence", zh: "带日期的年报数据属于__________。", answerZh: "证据" },
        { prompt: "“The company is famous, so the share is safe” is a __________.", answer: "weak opinion", zh: "“公司很有名，所以股票安全”属于__________。", answerZh: "薄弱观点" },
        { prompt: "Asking what could reduce future profit checks __________.", answer: "risk", zh: "询问什么可能降低未来利润是在检查__________。", answerZh: "风险" }
      ],
      notes: "Students classify all three before reveal, then defend one answer with a reason."
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
      type: "section",
      eyebrow: "Course laboratory",
      title: "SMG evidence and decision",
      zhTitle: "SMG证据与决策",
      notes: "Move from taught concept to the required team portfolio application. Allocate roughly 35-50% of lesson time to the lab sequence, not necessarily 35-50% of slide count."
    },
    {
      type: "flow",
      eyebrow: "SMG core lab",
      title: "Apply the lesson to the team portfolio",
      zhTitle: "把本课知识应用于团队投资组合",
      prompt: "Complete the exact stockMarketGame.studentAction from the canonical course map using a frozen platform snapshot.",
      promptZh: "使用冻结的平台截图，完成课程地图中本课规定的SMG任务。",
      steps: [
        { label: "1", text: "Open the assigned workbook pages and apply the stated treatment or trade override.", zh: "打开指定练习册页面，并执行规定的处理方式或交易覆盖规则。" },
        { label: "2", text: "Add one dated fact and limitation only when the workbook cannot hold the required evidence.", zh: "仅在练习册无法容纳所需证据时，补充一条带日期的事实和一条局限。" },
        { label: "3", text: "Complete the individual judgement; add a team-log row when the lesson creates a decision or monitoring update.", zh: "完成个人判断；当本课形成团队决策或监测更新时，添加一条团队日志记录。" }
      ],
      sharePrompt: "Name the student and role responsible for the evidence row and state the review trigger.",
      sharePromptZh: "写明负责该证据记录的学生及角色，并说明复查条件。"
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
