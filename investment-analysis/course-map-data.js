(function attachInvestmentCourseMap(global) {
  const courseMap = {
  "version": 4,
  "syllabusKey": "company-analysis",
  "courseTitle": "Investment Analysis: Evidence-Based Investing",
  "mapTitle": "Standard 50-Lesson Evidence-Based Investing Course Map",
  "writtenArtifactRule": "Each lesson worksheet is the primary written artifact. The textbook is a compiled collection of the 50 worksheets with light front matter and unit dividers only. Every worksheet also ends with a practical investment action so students learn the steps of analysing before investing.",
  "definitionOverview": {
    "source": "references/investment-analysis-definitions.md",
    "cfaMatches": "references/investment-analysis-cfa-glossary-matches.json",
    "textbookDefinitions": "references/investment-analysis-textbook-definitions.json",
    "studentPage": "investment-analysis/definitions.html",
    "prioritySource": "CFA Program glossary",
    "prioritySourceUrl": "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/glossary-terms",
    "rule": "Use the textbook-style definition overview for handouts, textbook chapters, quizzes and assessment wording. Where a course term overlaps with the CFA Program glossary, prioritise the CFA-aligned investment or accounting meaning, then simplify for Grade 9. Use the CFA matches file to show the matched source term and official glossary link, and use the local textbook definitions file as supplementary source support. Shorten definitions for slides only when the same meaning is preserved."
  },
  "handoutContract": [
    {
      "key": "sourceBox",
      "title": "Source box",
      "requirement": "Company identity, listed security or source context, source title, URL, publication date, accessed date, key figures and limitation."
    },
    {
      "key": "vocabulary",
      "title": "Vocabulary",
      "requirement": "All lesson terms with English definition and Chinese support."
    },
    {
      "key": "companyEvidence",
      "title": "Evidence and Data Analysis",
      "requirement": "A Section A-style worksheet section with short case information followed by identify, calculate or interpret, explain, analyse why and evidence-based judgement questions."
    },
    {
      "key": "calculationOrJudgement",
      "title": "Calculation or judgement task",
      "requirement": "The lesson formula, evidence interpretation or judgement check."
    },
    {
      "key": "misconceptionCheck",
      "title": "Misconception check",
      "requirement": "One explicit misconception the handout breaks."
    },
    {
      "key": "individualOutput",
      "title": "Individual written output",
      "requirement": "The student evidence-based judgement or verdict that can be assessed in class or in an exam."
    }
  ],
  "textbookAssembly": {
    "source": "lesson handouts",
    "rule": "Do not write separate textbook-only teaching chapters; compile the handout sequence with a cover, contents page and five unit dividers.",
    "sections": [
      "Cover",
      "Contents",
      "Unit divider",
      "Lesson handouts 1-50"
    ]
  },
  "generatorAccess": {
    "canonicalSource": "investment-analysis/course-map-data.js",
    "contextModule": "investment-analysis/generator-context.js",
    "cli": "node scripts/export-investment-generator-context.js --lesson <1-50> --target lesson",
    "targets": [
      {
        "key": "lesson",
        "purpose": "Full lesson-planning context for a deck generator.",
        "use": "Use before writing slides.js, lesson notes, source tasks or quiz alignment."
      },
      {
        "key": "deck",
        "purpose": "Slide-deck contract.",
        "use": "Use artifactBlueprint.deckArc, retrievalBase, formativeAssessment, exitTicket and primaryOutput as the lesson spine."
      },
      {
        "key": "handout",
        "purpose": "Lesson handout contract.",
        "use": "Use artifactBlueprint.handoutBlocks in the fixed six-block handout order."
      },
      {
        "key": "quiz",
        "purpose": "Follow-up quiz contract.",
        "use": "Retrieve terms, core claim, misconception correction, formula or judgement rule and exit-ticket output."
      },
      {
        "key": "exam",
        "purpose": "Checkpoint exam-item contract.",
        "use": "Use assessmentBlueprint and examPattern for command word, marks, stimulus, calculation and judgement."
      },
      {
        "key": "textbook",
        "purpose": "Compiled handout-book contract.",
        "use": "Use the lesson handout as the chapter; do not create textbook-only teaching content."
      }
    ],
    "rules": [
      "Treat course-map-data.js as the standard 50-lesson evidence-based investing course scope.",
      "Use the decisionFirst contract before drafting any lesson: starter dilemma, first judgement, missing evidence, key idea, try it, misconception check and exit judgement.",
      "Use the simple lesson structure for student-facing decks and syllabus cards: Hook, Key idea, Try it, Decide.",
      "Build every lesson as an evidence-based investing judgement cycle: first opinion, targeted retrieval, new knowledge, evidence and data analysis, misconception correction, analyse-why reasoning and practical next action.",
      "Make compounding and long-run accumulation explicit where time horizon matters: students should see how returns can build on earlier returns while recognising that projected returns are assumptions, not promises.",
      "Keep real cases, source extracts, company examples, product examples and investor profiles embedded throughout the syllabus; do not reserve cases for a final-only case-lab block.",
      "Use references/investment-analysis-definitions.md for textbook-style definition wording in handouts, textbook chapters, quizzes and assessment items; where a term overlaps with the CFA Program glossary, prioritise the CFA-aligned meaning before simplifying for Grade 9, and use references/investment-analysis-textbook-definitions.json as supplementary textbook-source support.",
      "Use worksheet.evidenceAndDataAnalysis as the source for the lesson worksheet stimulus and Section A-style questions.",
      "Make every lesson actionable: students must finish by choosing a justified next investment action such as consider, watch, avoid, compare with another choice or gather more evidence.",
      "Use the investmentWorkflow steps as the course method: know what is being bought, check fit and time horizon, read evidence, compare return-compounding-risk-price-cost and choose the next action.",
      "Students may make evidence-based classroom judgements such as attractive, risky, too expensive, incomplete evidence, watch, avoid or consider when justified with dated evidence and caveats.",
      "Freeze source dates and figures before generating classroom materials; do not depend on live prices.",
      "Do not turn a lesson into personalised investment advice, stock tips, market timing or unsupported recommendations."
    ]
  }
};


  function applyDecisionFirstSyllabus(map) {
    const units = [
      {
        unit: 1,
        semester: 1,
        lessons: [1, 10],
        title: "Foundations, assets and market access",
        summary: "Students build the first investing vocabulary, compare asset types, read market evidence and learn how organised markets, shares, bonds and funds work before making any recommendation."
      },
      {
        unit: 2,
        semester: 1,
        lessons: [11, 20],
        title: "Company evidence and financial statements",
        summary: "Students use revenue, margin, cash-flow, balance-sheet, dividend, risk and comparison evidence to judge business strength without treating one number as the whole case."
      },
      {
        unit: 3,
        semester: 1,
        lessons: [21, 30],
        title: "Returns, valuation and investor fit",
        summary: "Students connect investor return, valuation, diversification, profile fit and risk caveats into the first semester investment memo."
      },
      {
        unit: 4,
        semester: 2,
        lessons: [31, 40],
        title: "Funds, bonds, costs, diversification and behaviour",
        summary: "Students broaden the course beyond single shares by analysing cash, bonds, funds, fees, concentration, geography, compounding, gradual investing, behaviour and written plan rules."
      },
      {
        unit: 5,
        semester: 2,
        lessons: [41, 50],
        title: "Portfolio decision process, monitoring and final memo",
        summary: "Students compare alternatives, build and monitor a simple portfolio, control concentration and costs, avoid performance chasing and write a final evidence-based investment memo."
      }
    ];

    const lessonSpecs = [
      { n: 1, anchor: "Tencent", role: "listed company", q: "What is investment analysis?", hook: "Would you buy shares in Tencent? Give one reason.", idea: "Investment analysis judges potential return, risk and suitability before action.", tryIt: "Classify the missing evidence before making a Tencent judgement.", terms: [["investment analysis", "投资分析"], ["investor fit", "投资者适合度"], ["return", "回报"], ["risk", "风险"], ["asset", "资产"], ["share", "股票 / 股份"]], formula: "no new formula; students classify evidence needs and explain in words only." },
      { n: 2, anchor: "Family saving plan", role: "financial product", q: "How are saving, investing and speculation different?", hook: "A family has money left over. Should it save, invest or speculate?", idea: "Saving protects short-term needs, while investing accepts risk for possible future return.", tryIt: "Sort actions into saving, investing and speculation with a reason.", terms: [["saving", "储蓄"], ["investment", "投资"], ["speculation", "投机"]], formula: "no new formula; students classify choices by goal, risk and time horizon." },
      { n: 3, anchor: "Mixed asset set", role: "comparison case", q: "What kinds of assets can an investor own?", hook: "Cash, property, bonds and shares all have value. Are they the same kind of risk?", idea: "Different asset classes have different liquidity, risk and return patterns.", tryIt: "Rank a mixed asset set by liquidity and risk with one caveat.", terms: [["asset class", "资产类别"], ["liquidity need", "流动性需求"]], formula: "no new formula; students rank asset types qualitatively and explain caveats." },
      { n: 4, anchor: "Xiaomi", role: "listed company", q: "What does owning one share actually give?", hook: "If you own one Xiaomi share, do you control Xiaomi?", idea: "A share is an ownership claim, but control depends on rights and ownership size.", tryIt: "Sort shareholder statements into gives, may give and does not give.", terms: [["share ownership", "股票所有权"], ["shareholder right", "股东权利"]], formula: "ownership % = shares owned / total shares x 100." },
      { n: 5, anchor: "HKEX", role: "exchange/infrastructure case", q: "Why do investors need organised markets?", hook: "If you buy a share today, who gets the money and why does the market exist?", idea: "An exchange helps listed securities trade, but secondary trades do not always fund the company.", tryIt: "Match company, exchange, stock code and one market friction.", terms: [["stock exchange", "证券交易所"], ["secondary market", "二级市场"], ["listing", "上市"], ["stock code", "股票代码"], ["liquidity", "流动性"]], formula: "no new formula; students identify company, exchange, code and one trading friction accurately." },
      { n: 6, anchor: "Alibaba quote snapshot", role: "listed company", q: "What can a quote page tell us?", hook: "A quote page shows Alibaba's price. Is that enough to decide?", idea: "A quote page is a dated market snapshot, not a promise of value or execution.", tryIt: "Read one quote snapshot and separate what it tells from what it cannot prove.", terms: [["quote page", "报价页面"], ["bid-ask spread", "买卖价差"], ["share price", "股价"]], formula: "bid-ask spread = ask price - bid price." },
      { n: 7, anchor: "JD.com evidence pack", role: "listed company", q: "How should an analyst record evidence before judging?", hook: "JD.com's price moved. Which source would you trust first?", idea: "Useful evidence records source, date, figure, use and limitation before judgement.", tryIt: "Build one evidence-log row and state one limitation.", terms: [["evidence log", "证据记录"], ["source limitation", "来源局限"]], formula: "no new formula; students use the chain information -> expectation -> action -> possible price movement." },
      { n: 8, anchor: "Government bond", role: "financial product", q: "How is a bond different from a share?", hook: "A bond promises payments. Does that make it risk-free?", idea: "A bond is a lending claim, not ownership, and still has interest-rate and credit risk.", tryIt: "Label coupon, maturity and issuer risk on a bond example.", terms: [["bond", "债券"], ["coupon", "票息"]], formula: "coupon income = coupon rate x face value." },
      { n: 9, anchor: "ChinaAMC CSI 300 ETF", role: "fund", q: "How can one fund hold many investments?", hook: "One ETF holds many companies. Is it automatically safe?", idea: "A fund can diversify company-specific risk but still carries market, sector and product risks.", tryIt: "Read a fund factsheet and identify exposure, cost and one remaining risk.", terms: [["ETF", "交易型开放式指数基金"], ["fund factsheet", "基金资料页"]], formula: "portfolio weight = holding value / total portfolio value x 100." },
      { n: 10, anchor: "Mini portfolio checkpoint", role: "synthesis case", q: "What evidence is enough for a first investment judgement?", hook: "You can choose cash, a bond, a share or a fund. What evidence is still missing?", idea: "A first judgement must connect product, evidence, risk, return and investor fit.", tryIt: "Write a first evidence memo with one action and one caveat.", terms: [["risk-return trade-off", "风险回报权衡"], ["first evidence memo", "初步证据备忘录"]], formula: "no new formula; students synthesise the Unit 1 evidence chain." },
      { n: 11, anchor: "Meituan", role: "listed company", q: "Does high revenue mean a company is strong?", hook: "Meituan's revenue is high. Does that mean the company is strong?", idea: "Revenue shows sales scale, not profit strength or investment quality by itself.", tryIt: "Calculate or interpret revenue growth and name one thing it cannot prove.", terms: [["revenue", "收入"], ["business model", "商业模式"]], formula: "revenue growth = (new revenue - old revenue) / old revenue x 100." },
      { n: 12, anchor: "BYD", role: "listed company", q: "Can sales rise while costs become a problem?", hook: "BYD's sales rise. Could costs still make the story weaker?", idea: "Rising sales can hide cost pressure, so gross profit and gross margin matter.", tryIt: "Calculate gross margin and explain what changed.", terms: [["cost of sales", "销售成本"], ["gross margin", "毛利率"]], formula: "gross profit = revenue - cost of sales; gross margin = gross profit / revenue x 100." },
      { n: 13, anchor: "CATL", role: "listed company", q: "Which company turns sales into profit more efficiently?", hook: "Two battery companies sell a lot. Which turns sales into profit more efficiently?", idea: "Efficiency comparison needs aligned metrics, time periods and margin evidence.", tryIt: "Compare operating margins using the same period.", terms: [["operating profit", "营业利润"], ["operating margin", "营业利润率"]], formula: "operating margin = operating profit / revenue x 100." },
      { n: 14, anchor: "Tesla", role: "listed company", q: "Why can a growing company still need cash?", hook: "Tesla can grow and still need cash. How can that happen?", idea: "Profit and cash flow answer different questions.", tryIt: "Interpret operating cash flow and capital expenditure evidence.", terms: [["operating cash flow", "经营现金流"], ["capital expenditure", "资本支出"]], formula: "free cash flow = operating cash flow - capital expenditure." },
      { n: 15, anchor: "Balance sheet snapshot", role: "economic data case", q: "What does a balance sheet add to company analysis?", hook: "A company reports assets and liabilities. Which side should an investor check first?", idea: "A balance sheet helps students see resources, obligations and equity claims.", tryIt: "Classify items as asset, liability or equity and state one limitation.", terms: [["balance sheet asset", "资产负债表资产"], ["liability", "负债"]], formula: "equity = assets - liabilities." },
      { n: 16, anchor: "Lenovo", role: "listed company", q: "When does borrowing become a shareholder risk?", hook: "Lenovo borrows money. When does borrowing become a shareholder risk?", idea: "Borrowing can fund growth but also raises fixed obligations and shareholder risk.", tryIt: "Interpret or calculate a debt-risk measure and connect it to one caveat.", terms: [["debt", "债务"], ["leverage", "杠杆"]], formula: "debt-to-equity = total debt / equity, if the data is suitable." },
      { n: 17, anchor: "HSBC", role: "listed company", q: "Why might an investor like dividends?", hook: "HSBC pays dividends. Is a high dividend yield enough reason to like it?", idea: "Dividends add income, but yield and total return depend on price and risk.", tryIt: "Calculate or interpret dividend yield and explain one limitation.", terms: [["dividend", "股息"], ["dividend safety", "股息安全性"]], formula: "dividend yield = annual dividend / share price x 100." },
      { n: 18, anchor: "Starbucks", role: "listed company", q: "What could hurt one familiar company?", hook: "Starbucks is familiar. What could still hurt it?", idea: "A familiar company can still face risks that affect future revenue, profit, expectations and price.", tryIt: "Build a risk register with likelihood, impact and evidence.", terms: [["company-specific risk", "公司特定风险"], ["risk register", "风险登记表"]], formula: "no new formula; build a risk-evidence-effect chain." },
      { n: 19, anchor: "Toyota peer set", role: "comparison case", q: "How can a company comparison be fair?", hook: "Toyota looks strong. What makes a comparison unfair?", idea: "Fair comparison requires aligned metrics, dates, currencies and business context.", tryIt: "Complete one peer-comparison row with a fairness caveat.", terms: [["benchmark", "基准"], ["peer comparison", "同业比较"]], formula: "compare the same metric over the same period; no single new formula." },
      { n: 20, anchor: "Company evidence checkpoint", role: "synthesis case", q: "How do financial statements change an investment judgement?", hook: "A company has growth, debt and risk evidence. What should change your view?", idea: "A company judgement improves when evidence is connected across revenue, margin, cash, debt and risk.", tryIt: "Write one company evidence memo with source dates and caveats.", terms: [["financial statement memo", "财务报表备忘录"], ["evidence caveat", "证据限制说明"]], formula: "no new formula; students combine statement evidence into a written judgement." },
      { n: 21, anchor: "Apple", role: "listed company", q: "How does a share make or lose money for an investor?", hook: "Apple's share price changed. How much did the investor really gain or lose?", idea: "Investor return depends on gain or loss relative to the purchase price.", tryIt: "Calculate a percentage return and explain the first risk-return trade-off.", terms: [["capital gain", "资本利得"], ["percentage return", "百分比回报"]], formula: "gain = sale price - purchase price; return % = gain / purchase price x 100." },
      { n: 22, anchor: "Nvidia", role: "listed company", q: "How can one company be worth so much?", hook: "Nvidia's share price is high. Does that mean it is the biggest company?", idea: "Market capitalisation combines one-share price and share count.", tryIt: "Calculate or interpret market capitalisation and compare company scale.", terms: [["market capitalisation", "市值"], ["shares outstanding", "已发行股数"]], formula: "market capitalisation = share price x shares outstanding." },
      { n: 23, anchor: "Microsoft", role: "listed company", q: "When do investors pay a high price for profit?", hook: "Microsoft trades at a high price for profit. Is that optimism, risk or both?", idea: "A P/E ratio can signal expectations, risk or both.", tryIt: "Interpret a P/E ratio and connect it to expectations and evidence limits.", terms: [["earnings per share", "每股收益"], ["P/E ratio", "市盈率"]], formula: "EPS = net profit / shares; P/E = share price / EPS." },
      { n: 24, anchor: "Toyota valuation case", role: "listed company", q: "Can a good company still be too expensive?", hook: "Toyota is a good company. Could it still be too expensive?", idea: "A good company only becomes attractive when quality is judged with price and risk.", tryIt: "Classify the case as attractive, risky, too expensive or incomplete.", terms: [["valuation risk", "估值风险"], ["margin of safety", "安全边际"]], formula: "compare P/E, growth and risk evidence; no new calculation." },
      { n: 25, anchor: "HSBC income case", role: "listed company", q: "How should income and price change be combined?", hook: "A dividend looks attractive. What if the share price falls?", idea: "Total return combines price movement and income received.", tryIt: "Separate capital gain, dividend income and total return.", terms: [["total return", "总回报"], ["dividend yield", "股息收益率"]], formula: "total return = capital gain or loss + dividends." },
      { n: 26, anchor: "Two-holding portfolio", role: "comparison case", q: "How does diversification change risk?", hook: "Two holdings feel safer than one. What risk remains?", idea: "Diversification can reduce company-specific risk but does not remove market risk.", tryIt: "Calculate a portfolio weight and name one remaining risk.", terms: [["diversification", "分散化"], ["portfolio weight", "投资组合权重"]], formula: "portfolio weight = holding value / total portfolio value x 100." },
      { n: 27, anchor: "Investor profile A", role: "financial product", q: "Why can the same investment fit one person but not another?", hook: "Two students choose the same fund. Could one choice still be unsuitable?", idea: "Investor fit depends on goal, time horizon, liquidity need and risk tolerance.", tryIt: "Match investor profiles to suitable and unsuitable product choices.", terms: [["investor profile", "投资者画像"], ["time horizon", "投资期限"]], formula: "no new formula; students match product risk to investor profile." },
      { n: 28, anchor: "Samsung", role: "listed company", q: "Why can exchange rates matter to shareholders?", hook: "Samsung sells globally. Why can exchange rates matter to shareholders?", idea: "Exchange rates can create measurement and return risk for global companies.", tryIt: "Interpret a simple currency scenario and state who benefits or loses.", terms: [["currency risk", "货币风险"], ["geographic exposure", "地域敞口"]], formula: "exchange-rate change % = (new rate - old rate) / old rate x 100." },
      { n: 29, anchor: "Risk-return scenario", role: "economic data case", q: "How should possible return be compared with downside risk?", hook: "One choice has a higher possible return. Is it automatically better?", idea: "Expected return must be judged with downside risk and investor fit.", tryIt: "Classify evidence as return, risk, price or fit.", terms: [["expected return", "预期回报"], ["downside risk", "下行风险"]], formula: "no new formula; students compare return clues with possible downside." },
      { n: 30, anchor: "Semester 1 memo", role: "synthesis case", q: "What should a first-semester investment memo include?", hook: "You have company, price, return and fit evidence. What is still not enough?", idea: "A defensible memo uses dated evidence, caveats and a practical next action.", tryIt: "Write a first-semester memo that chooses consider, watch, avoid, compare or gather evidence.", terms: [["semester-one investment memo", "第一学期投资备忘录"], ["evidence-based verdict", "基于证据的结论"]], formula: "synthesis of return, valuation, risk and investor fit; no new formula." },
      { n: 31, anchor: "Bank deposit", role: "financial product", q: "When is cash or a deposit the better choice?", hook: "A deposit earns less than shares. Why might it still fit?", idea: "Cash and deposits protect liquidity but can lose purchasing power to inflation.", tryIt: "Match short-term needs to cash or risky investments.", terms: [["cash deposit", "现金存款"], ["inflation risk", "通货膨胀风险"]], formula: "real return = nominal return - inflation rate, as a simple classroom approximation." },
      { n: 32, anchor: "Treasury bond", role: "financial product", q: "What do maturity and yield tell a bond investor?", hook: "Two bonds pay different yields. Which one is actually safer?", idea: "Bond yield must be read with maturity, issuer and price risk.", tryIt: "Label maturity date, coupon and yield on a bond extract.", terms: [["maturity date", "到期日"], ["yield", "收益率"]], formula: "current yield = annual coupon / bond price x 100, if the data is suitable." },
      { n: 33, anchor: "Bond fund", role: "fund", q: "Why do bond prices move when interest rates change?", hook: "Interest rates rise. Why might an existing bond fund fall?", idea: "Bond prices and interest rates usually move in opposite directions.", tryIt: "Use a simple scenario to state who gains or loses.", terms: [["interest rate risk", "利率风险"], ["bond price", "债券价格"]], formula: "no new formula; students explain the inverse price-rate direction." },
      { n: 34, anchor: "Corporate bond", role: "financial product", q: "How can credit risk affect bond investors?", hook: "A corporate bond pays more. Is the extra yield free money?", idea: "Higher yield can compensate for higher credit risk, but it does not remove default risk.", tryIt: "Classify issuer evidence as credit strength or credit warning.", terms: [["credit risk", "信用风险"], ["issuer strength", "发行人实力"]], formula: "yield spread = corporate bond yield - safer benchmark yield." },
      { n: 35, anchor: "Index fund", role: "fund", q: "How is an index fund different from active stock picking?", hook: "One fund tracks an index and another chooses stocks. Which evidence matters?", idea: "Index funds aim to track a market, while active funds try to beat a benchmark.", tryIt: "Compare an index fund and active fund using objective evidence.", terms: [["index fund", "指数基金"], ["active fund", "主动型基金"]], formula: "no new formula; students compare objective, benchmark and evidence." },
      { n: 36, anchor: "Active fund", role: "fund", q: "How much do fund costs matter?", hook: "A fund fee looks small. How can it still affect returns?", idea: "Fees reduce investor return and must be compared with performance evidence and risk.", tryIt: "Read an expense ratio and explain what it cannot prove.", terms: [["expense ratio", "费用率"], ["tracking difference", "跟踪差异"]], formula: "annual fund cost = invested amount x expense ratio." },
      { n: 37, anchor: "Sector ETF", role: "fund", q: "Can a diversified fund still be concentrated?", hook: "A fund owns many shares. Why might it still be risky?", idea: "Many holdings can still share the same sector, theme or exposure.", tryIt: "Find the largest sector and holding concentration in a fund factsheet.", terms: [["sector concentration", "行业集中度"], ["holdings overlap", "持仓重叠"]], formula: "top-holdings weight = sum of largest holding weights." },
      { n: 38, anchor: "Global fund", role: "fund", q: "How does geography change portfolio risk?", hook: "A global fund sounds diversified. Which countries dominate it?", idea: "Geographic diversification reduces some local risk but can leave home bias or currency exposure.", tryIt: "Read regional weights and identify one remaining exposure.", terms: [["geographic diversification", "地域分散化"], ["home bias", "本土偏好"]], formula: "region weight = region holding value / portfolio value x 100." },
      { n: 39, anchor: "Monthly investment plan", role: "financial product", q: "How do compounding and gradual investing affect long-run accumulation?", topic: "compounding and gradual investing in long-run accumulation", hook: "Should an investor rely on one perfect purchase, or build a long-run plan over time?", idea: "Compounding can make long-run accumulation grow as returns build on earlier returns, while gradual investing can reduce timing pressure without guaranteeing profit.", tryIt: "Compare a simple compound-growth table with one lump-sum and one gradual-investing scenario.", terms: [["compounding", "复利"], ["dollar-cost averaging", "定期定额投资"]], formula: "future value = starting amount x (1 + return rate)^years; average purchase price = total amount invested / total units bought." },
      { n: 40, anchor: "Investor policy statement", role: "synthesis case", q: "What rules should guide an investor before choosing products?", hook: "A product looks exciting. What rule should stop a careless decision?", idea: "A written plan protects the decision process before emotion or news takes over.", tryIt: "Write simple plan rules for goal, risk, liquidity, evidence and action.", terms: [["investment policy statement", "投资政策说明"], ["written plan", "书面计划"]], formula: "no new formula; students write rules that constrain later choices." },
      { n: 41, anchor: "Fund comparison", role: "comparison case", q: "How should two investment choices be compared?", hook: "Two funds both look reasonable. What makes the comparison fair?", idea: "Fair comparison uses the same dates, metrics, risk categories and investor profile.", tryIt: "Complete a comparison matrix with one caveat.", terms: [["opportunity cost", "机会成本"], ["alternative comparison", "替代方案比较"]], formula: "compare return, risk, cost and fit side by side; no single new formula." },
      { n: 42, anchor: "Starter portfolio", role: "synthesis case", q: "How can a simple portfolio be built from evidence?", hook: "A portfolio has cash, bonds, funds and one share. What is each holding doing?", idea: "A portfolio should connect each holding to goal, risk and evidence.", tryIt: "Build a simple portfolio table with purpose and risk for each holding.", terms: [["simple portfolio", "简单投资组合"], ["asset allocation", "资产配置"]], formula: "asset allocation weight = asset-class value / total portfolio value x 100." },
      { n: 43, anchor: "Concentrated Tencent holding", role: "listed company", q: "When is one holding too large?", hook: "Tencent is familiar and large in the portfolio. Is that comfort or concentration risk?", idea: "Position size controls how much one holding can affect the whole portfolio.", tryIt: "Calculate a position size and state whether it is too concentrated.", terms: [["concentration risk", "集中风险"], ["position size", "持仓规模"]], formula: "position size = holding value / total portfolio value x 100." },
      { n: 44, anchor: "Watchlist dashboard", role: "synthesis case", q: "What should an investor monitor after deciding to watch?", hook: "A watch decision is not doing nothing. What should be watched?", idea: "Monitoring tracks the evidence that could change a judgement later.", tryIt: "Create a watchlist with evidence item, date and trigger.", terms: [["monitoring evidence", "跟踪证据"], ["watchlist", "观察名单"]], formula: "no new formula; students define evidence triggers and review dates." },
      { n: 45, anchor: "Rebalanced portfolio", role: "synthesis case", q: "Why might a portfolio need rebalancing?", hook: "One holding rises a lot. Should the portfolio be left alone?", idea: "Rebalancing can restore target weights but must consider costs and evidence.", tryIt: "Compare current and target weights and decide whether action is justified.", terms: [["rebalancing", "再平衡"], ["target weight", "目标权重"]], formula: "weight gap = current weight - target weight." },
      { n: 46, anchor: "Trading-cost scenario", role: "financial product", q: "How do costs and taxes affect a decision?", hook: "A trade looks profitable before costs. What changes after friction?", idea: "Transaction costs and tax friction can reduce or reverse an expected benefit.", tryIt: "Identify cost items before choosing whether to trade.", terms: [["transaction cost", "交易成本"], ["tax friction", "税务摩擦"]], formula: "net gain = gross gain - transaction costs - tax estimate." },
      { n: 47, anchor: "Past-winner fund", role: "fund", q: "Why can chasing recent performance be dangerous?", hook: "Last year's best fund looks obvious. Why might that be a trap?", idea: "Recent performance is evidence, but it can mislead if risk, luck and valuation are ignored.", tryIt: "Sort evidence into durable skill, luck, risk and missing information.", terms: [["performance chasing", "追逐业绩"], ["recency bias", "近因偏差"]], formula: "no new formula; students classify behaviour and evidence quality." },
      { n: 48, anchor: "Next-action board", role: "synthesis case", q: "How should an investor choose watch, avoid, consider or compare?", hook: "The evidence is mixed. Which next action is most defensible?", idea: "The next action should match evidence strength, risk, fit and missing information.", tryIt: "Place cases into watch, avoid, consider, compare or gather-more-evidence categories.", terms: [["next-action verdict", "下一步行动结论"], ["decision rule", "决策规则"]], formula: "no new formula; students use a decision rule rather than a tip." },
      { n: 49, anchor: "Evidence pack", role: "synthesis case", q: "What evidence must be checked before a final memo?", hook: "A final answer sounds confident. Which source check could still weaken it?", idea: "A final evidence pack must record source date, figure, use, limitation and missing evidence.", tryIt: "Audit a source pack and flag one weak source.", terms: [["evidence pack", "证据包"], ["source checklist", "来源检查清单"]], formula: "no new formula; students audit evidence completeness and source quality." },
      { n: 50, anchor: "Final investment memo", role: "synthesis case", q: "How do students write a final evidence-based investment memo?", hook: "A careful investor has to choose a defensible next action. What belongs in the final memo?", idea: "The final memo combines product, evidence, return, risk, fit, alternatives, caveats and next action.", tryIt: "Write the final memo with dated evidence and a defensible classroom action.", terms: [["final investment memo", "最终投资备忘录"], ["investment caveat", "投资限制说明"]], formula: "synthesis of product, return, risk, cost, fit and evidence; no new formula." }
    ];

    function unitForLesson(lessonNumber) {
      return Math.floor((lessonNumber - 1) / 10) + 1;
    }

    function semesterForLesson(lessonNumber) {
      return lessonNumber <= 30 ? 1 : 2;
    }

    function definitionFor(term, spec) {
      const customDefinitions = {
        compounding: "Compounding is growth where later returns build on earlier returns, so a long-run projection can increase faster over time, but the projected return is an assumption and not a promise.",
        "dollar-cost averaging": "Dollar-cost averaging is investing a fixed amount on a regular schedule, which can reduce timing pressure but does not guarantee profit or remove market risk.",
        asset: "An asset is something with economic value that can be owned or controlled, such as cash, property, a bond, a share or a business resource.",
        investment: "Investment is putting money into an asset to seek future return while accepting possible loss.",
        "investment analysis": "Investment analysis is the process of evaluating an investment opportunity with evidence to judge its potential return, risk and suitability before making a decision.",
        "investor fit": "Investor fit is the degree to which an investment matches an investor's goal, time horizon, liquidity need and risk tolerance.",
        listing: "A listing is the formal permission for a company's securities to trade on a stock exchange after the company meets the exchange's requirements.",
        liquidity: "Liquidity is the ability to trade an asset quickly, at relatively low cost and in meaningful quantities without causing a large price change.",
        return: "Return is the gain or loss earned from an investment over a stated holding period, including price change and any income received.",
        risk: "Risk is the possibility that results, returns or prices are worse than expected.",
        saving: "Saving is keeping money safe and available for future use, usually with lower risk and lower expected return than investing.",
        share: "A share is one unit of ownership in a company, giving the shareholder a claim on part of the company's equity and, depending on the share class, certain rights such as votes or dividends.",
        "share price": "A share price is the market price of one share at a specific time.",
        speculation: "Speculation is trying to profit from uncertain price movements, often over a short time and with weaker evidence than investment analysis requires.",
        "secondary market": "A secondary market is the market where investors buy and sell existing securities with each other after they have been issued.",
        "stock code": "A stock code is the short market identifier used to find a listed security on an exchange or market-data system.",
        "stock exchange": "A stock exchange is a regulated market where listed securities can be bought and sold under published trading rules."
      };
      const customDefinition = customDefinitions[term.toLowerCase()];
      if (customDefinition) {
        return customDefinition;
      }
      const label = term.replace(/^[a-z]/, (match) => match.toUpperCase());
      return `${label} is a course concept used to analyse ${spec.anchor} with dated evidence, risk, return, price or investor-fit limits before choosing a defensible next action.`;
    }

    function makeSourcePack(spec) {
      return {
        requiredSourceTypes: [
          `dated source extract for ${spec.anchor}`,
          "teacher-provided case or product snapshot with source title and accessed date",
          "supporting visual, table, factsheet or statement extract where relevant"
        ],
        preferredSourceOrder: [
          "official issuer, fund, exchange or company source",
          "reputable market, regulator or financial education source",
          "teacher-built classroom snapshot with clear source notes"
        ],
        snapshotDateFields: [
          "source title",
          "source URL or local asset path",
          "publication date if available",
          "accessed date",
          "case anchor, security, fund or product identifier",
          "key figure used",
          "evidence limitation"
        ],
        evidenceLimitations: [
          "A single source cannot prove that an investment is suitable.",
          "Historical figures and current facts do not guarantee future return.",
          "The same evidence may lead to different actions for different investor profiles."
        ],
        noLivePriceDependency: true,
        sourceFitCheck: "Complete the source-fit audit before building the deck, handout chapter or exam item."
      };
    }

    function handoutSectionsFor(spec, terms) {
      const termList = terms.map((term) => term.term).join(", ");
      return [
        {
          key: "sourceBox",
          title: "Source box",
          task: `Record the ${spec.anchor} source title, source date or accessed date, key figure and one limitation before judging.`
        },
        {
          key: "vocabulary",
          title: "Vocabulary",
          task: `Define and use the lesson terms: ${termList}.`
        },
        {
          key: "companyEvidence",
          title: "Evidence and Data Analysis",
          task: `Use a short ${spec.anchor} case extract with source title, date, key figures and one limitation. Identify the source, interpret one figure, explain what it can and cannot prove, analyse why it changes the judgement and choose a next investment action.`
        },
        {
          key: "calculationOrJudgement",
          title: "Calculation or judgement task",
          task: spec.tryIt
        },
        {
          key: "misconceptionCheck",
          title: "Misconception check",
          task: `Correct the shortcut: ${spec.misconception || "one attractive clue is enough for an investment decision."}`
        },
        {
          key: "individualOutput",
          title: "Individual written output",
          task: `Write a short ${spec.anchor} judgement with dated evidence, one caveat and a next action: consider, watch, avoid, compare or gather more evidence.`
        }
      ];
    }

    function blueprintBlocksFor(handoutSections) {
      return handoutSections.map((section) => ({
        key: section.key,
        title: section.title,
        prompt: section.task,
        expectedStudentWork: section.key === "sourceBox"
          ? "A dated source note with one limitation."
          : "A concise written response that uses the lesson concept and evidence."
      }));
    }

    function buildLesson(spec) {
      const unit = unitForLesson(spec.n);
      const unitInfo = units[unit - 1];
      const semester = semesterForLesson(spec.n);
      const terms = spec.terms.map(([term, zh]) => ({
        term,
        zh,
        definition: definitionFor(term, spec)
      }));
      const decisionFirst = {
        starterDilemma: spec.hook,
        firstJudgementPrompt: `Students make a first judgement about ${spec.anchor} before the key idea is taught.`,
        likelyNaiveAnswer: spec.naive || "One attractive clue is enough to choose an investment action.",
        missingEvidence: spec.missing || `Students need dated source evidence, risk, return, price and investor-fit context for ${spec.anchor}.`,
        keyIdea: spec.idea,
        tryIt: spec.tryIt,
        misconceptionCheck: spec.misconception || "A familiar or attractive example is automatically a suitable investment.",
        exitJudgement: `Write a ${spec.anchor} next-action judgement using evidence, caveat and fit.`
      };
      const handoutSections = handoutSectionsFor(spec, terms);
      const handoutBlocks = blueprintBlocksFor(handoutSections);
      const studentOutput = handoutSections.find((section) => section.key === "individualOutput").task;
      const formula = spec.formula || "no new formula; students interpret evidence and explain the judgement in words.";
      const topic = spec.topic || spec.q.toLowerCase();

      return {
        lesson: spec.n,
        semester,
        caseAnchor: spec.anchor,
        company: spec.anchor,
        guidingQuestion: spec.q,
        guidingQuestionZh: `课程问题：${spec.q}`,
        handoutMaterial: `${spec.anchor} worksheet on ${topic}`,
        formativeAssessment: `First judgement, retrieval check, source-date check, ${spec.tryIt.toLowerCase()} and an individual next-action sentence.`,
        exitTicket: `Complete a short ${spec.anchor} exit judgement using one evidence point, one caveat and one next action.`,
        sequenceRole: `Lesson ${spec.n} in Semester ${semester}, Unit ${unit}: ${unitInfo.title}.`,
        retrievalBase: spec.n === 1
          ? "Everyday familiarity with companies, saving choices, risk and first impressions."
          : "Earlier course concepts, source discipline, risk-return-fit thinking and the previous ten-lesson checkpoint.",
        newKnowledge: spec.idea,
        evidenceTask: spec.tryIt,
        avoidOverlap: "Do not give stock tips, use live-price dependence, make personalised recommendations or require advanced finance beyond the taught lesson evidence.",
        misconception: decisionFirst.misconceptionCheck,
        studentOutput,
        futureReuse: `Reused in later lessons when students compare evidence, risk, return, cost, fit and next actions.`,
        focus: `Focus: ${spec.q} Case anchor: ${spec.anchor}. Key idea: ${spec.idea}`,
        terms,
        formulaOrNoFormula: formula,
        evidenceSummary: `${spec.anchor} source or classroom snapshot with source title, date, key figures and limitation.`,
        check: `Students can use ${terms.map((term) => term.term).join(" and ")} to improve a first judgement and choose a next action.`,
        unit,
        unitTitle: unitInfo.title,
        handoutSections,
        examPattern: {
          checkpoint: unit,
          itemType: "Section A-style evidence and judgement worksheet",
          sourceRequirement: `Use a frozen ${spec.anchor} extract with source title, date, accessed date and at least one figure or evidence statement.`,
          task: `Use the worksheet Evidence and Data Analysis section to answer: ${spec.q}`,
          mustAssess: `Definition, source-date discipline, evidence interpretation, analyse-why chain and a justified next investment action.`
        },
        cardGenerator: {
          retrievalBase: "prior source discipline, risk-return-fit vocabulary and earlier evidence-judgement chains.",
          newKnowledge: spec.idea,
          avoidOverlap: "avoid stock tips, personalised advice, live-price dependence and later-course finance techniques.",
          misconception: decisionFirst.misconceptionCheck,
          evidenceTask: spec.tryIt,
          studentOutput,
          studentHook: decisionFirst.starterDilemma,
          firstJudgementPrompt: decisionFirst.firstJudgementPrompt,
          missingEvidence: decisionFirst.missingEvidence,
          exitJudgement: decisionFirst.exitJudgement
        },
        coreClaim: spec.idea,
        caseRole: spec.role,
        primaryOutput: {
          type: "evidence-based-next-action-judgement",
          description: `one ${spec.anchor} judgement with dated evidence, caveat and next action`
        },
        sourcePack: makeSourcePack(spec),
        assessmentBlueprint: {
          commandWord: "Analyse why",
          marks: 6,
          stimulusType: `short ${spec.anchor} source extract with key figures and limitation`,
          calculationRequirement: formula,
          judgementRequirement: "Students must justify consider, watch, avoid, compare with another choice or gather more evidence using dated evidence and caveats.",
          mustAvoid: "Personal financial advice, stock tips, market timing, unsupported recommendations and live-price dependent answers."
        },
        artifactBlueprint: {
          deckArc: [
            `Hook: start with ${decisionFirst.starterDilemma}`,
            `Retrieval: activate source discipline and the previous risk-return-fit chain.`,
            `Teach: ${spec.idea}`,
            `Evidence practice: ${spec.tryIt}`,
            `Output rehearsal: students draft the evidence-caveat-next-action sentence.`,
            `Exit ticket: ${decisionFirst.exitJudgement}`
          ],
          handoutBlocks,
          chapterOutput: "Use the lesson handout as the chapter; do not add textbook-only content.",
          examItemShape: `Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for ${spec.anchor}.`
        },
        caseReview: {
          status: "keep",
          sourceFit: "pending-source-pack-check",
          reason: `${spec.anchor} fits this lesson because it makes the key idea concrete while preserving the evidence-before-action boundary.`,
          replacementCandidate: null
        },
        analyseWhy: {
          question: `Analyse why the evidence used in the ${spec.anchor} case could change an investor's judgement about ${topic}`,
          chain: [
            "dated evidence or source detail",
            spec.idea,
            "investor implication for return, risk, price or fit",
            "defensible next action"
          ]
        },
        retrievalPractice: {
          yesNo: {
            prompt: `Can a student judge ${spec.anchor} from one attractive clue alone?`,
            answer: "No. The judgement needs dated evidence, risk, return and fit context."
          },
          multipleChoice: {
            prompt: `Which action best supports a careful judgement about ${spec.anchor}?`,
            options: [
              "Check dated source evidence and its limitation before judging.",
              "Copy the most confident opinion.",
              "Use only the most recent price movement."
            ],
            answer: "Check dated source evidence and its limitation before judging."
          },
          matching: {
            prompt: `Match the lesson terms to their meaning before using the ${spec.anchor} case.`,
            pairs: terms.map((term) => ({
              term: term.term,
              meaning: term.definition
            }))
          },
          sourceCheck: `Record the source title, date or accessed date, one key figure and one limitation before using ${spec.anchor} evidence.`
        },
        worksheet: {
          evidenceAndDataAnalysis: {
            title: "Evidence and Data Analysis",
            stimulus: `Use a short ${spec.anchor} case extract with source title, publication or accessed date, key figures and one limitation.`,
            questions: [
              {
                type: "identify-define",
                command: "Identify/Define",
                prompt: `Identify the source date and define ${terms[0].term}.`
              },
              {
                type: "calculate-interpret",
                command: "Calculate/Interpret",
                prompt: `Use or interpret the lesson rule: ${formula}`
              },
              {
                type: "explain-evidence",
                command: "Explain",
                prompt: `Explain what one ${spec.anchor} evidence point shows and one thing it cannot prove.`
              },
              {
                type: "analyse-why",
                command: "Analyse why",
                prompt: `Analyse why this evidence could change the judgement about ${topic}.`
              },
              {
                type: "student-judgement",
                command: "Judge",
                prompt: `Give your own evidence-based classroom verdict on ${spec.anchor}. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.`
              }
            ]
          }
        },
        investmentAction: {
          title: "Evidence-based next-action decision",
          studentAction: `Choose consider, watch, avoid, compare with another choice or gather more evidence for ${spec.anchor}.`,
          decisionRule: "The action must follow the strength of evidence, the main risk, the possible return and the investor-fit constraint.",
          portfolioQuestion: "Ask whether this choice fits the hypothetical investor's goal, time horizon, liquidity need and risk tolerance.",
          classroomOutput: `I can write a ${spec.anchor} next-action judgement with dated evidence and one caveat.`
        },
        studentHook: decisionFirst.starterDilemma,
        simpleFlow: [
          { label: "Hook", text: decisionFirst.starterDilemma },
          { label: "Key idea", text: decisionFirst.keyIdea },
          { label: "Try it", text: decisionFirst.tryIt },
          { label: "Decide", text: decisionFirst.exitJudgement }
        ],
        decisionFirst
      };
    }

    map.version = 6;
    map.syllabusKey = "company-analysis";
    map.courseTitle = "Investment Analysis: Evidence-Based Investing";
    map.mapTitle = "Standard 50-Lesson Evidence-Based Investing Course Map";
    map.writtenArtifactRule = "Each lesson worksheet is the primary written artifact. The textbook is a compiled collection of the 50 worksheets with light front matter and unit dividers only. Every worksheet also ends with a practical investment action so students learn the steps of analysing before investing.";
    map.definitionOverview.rule = "Use the textbook-style definition overview for handouts, textbook chapters, quizzes and assessment wording. Where a course term overlaps with the CFA Program glossary, prioritise the CFA-aligned investment or accounting meaning, then simplify for Grade 9.";
    map.textbookAssembly.rule = "Do not write separate textbook-only teaching chapters; compile the handout sequence with a cover, contents page and five unit dividers.";
    map.textbookAssembly.sections = [
      "Cover",
      "Contents",
      "Unit divider",
      "Lesson handouts 1-50"
    ];
    map.generatorAccess.cli = "node scripts/export-investment-generator-context.js --lesson <1-50> --target lesson";
    map.generatorAccess.rules = [
      "Treat course-map-data.js as the standard 50-lesson evidence-based investing course scope.",
      "Use the decisionFirst contract before drafting any lesson: starter dilemma, first judgement, missing evidence, key idea, try it, misconception check and exit judgement.",
      "Use the simple lesson structure for student-facing decks and syllabus cards: Hook, Key idea, Try it, Decide.",
      "Build every lesson as an evidence-based investing judgement cycle: first opinion, targeted retrieval, new knowledge, evidence and data analysis, misconception correction, analyse-why reasoning and practical next action.",
      "Make compounding and long-run accumulation explicit where time horizon matters: students should see how returns can build on earlier returns while recognising that projected returns are assumptions, not promises.",
      "Keep real cases, source extracts, company examples, product examples and investor profiles embedded throughout the syllabus; do not reserve cases for a final-only case-lab block.",
      "Freeze source dates and figures before generating classroom materials; do not depend on live prices.",
      "Do not turn a lesson into personalised investment advice, stock tips, market timing or unsupported recommendations."
    ];
    map.units = units;
    map.examCheckpoints = [
      { checkpoint: 1, semester: 1, afterLessons: [1, 10], title: "Foundations, assets and market access", summary: "Saving, investing, assets, shares, markets, quote pages, bonds, funds, source discipline and first evidence memo." },
      { checkpoint: 2, semester: 1, afterLessons: [11, 20], title: "Company evidence and financial statements", summary: "Revenue, margins, cash flow, balance sheets, debt, dividends, risk registers, benchmarks and company evidence memos." },
      { checkpoint: 3, semester: 1, afterLessons: [21, 30], title: "Returns, valuation and investor fit", summary: "Returns, market value, EPS, P/E, valuation risk, diversification, profiles, currency risk and first-semester memo." },
      { checkpoint: 4, semester: 2, afterLessons: [31, 40], title: "Funds, bonds, costs, diversification and behaviour", summary: "Cash, bonds, yield, credit risk, fund types, fees, concentration, geography, compounding, gradual investing and written plan rules." },
      { checkpoint: 5, semester: 2, afterLessons: [41, 50], title: "Portfolio decision process, monitoring and final memo", summary: "Comparison, portfolio construction, concentration, monitoring, rebalancing, costs, behaviour, evidence packs and final memo." }
    ];
    map.sourceFitAudit = {
      rule: "Run this before building a lesson deck or final exam item. Keep the current case anchor unless source evidence is not classroom-clean, source dates are missing, or the case no longer fits the unit role.",
      checks: [
        "At least one official or reputable dated source is available for the required evidence task.",
        "The needed figures can be frozen into a classroom snapshot without live-price dependency.",
        "The source can support the lesson output without requiring advanced finance beyond the map.",
        "The case does not duplicate the prior lesson output or weaken the five-unit progression.",
        "Any replacement keeps the same unit role, skill target and assessment blueprint."
      ]
    };
    map.practicalInvestingBoundary = "Students learn a decision-first investing process: start with a concrete company, product, fund, portfolio or investor-profile dilemma, make a first judgement, collect dated evidence, compare return, compounding, risk, price, cost, time horizon and fit, then make an evidence-based classroom action such as consider, watch, avoid, compare with another choice or gather more evidence. They do not receive stock tips, market timing calls or personalised portfolio instructions.";
    map.investmentWorkflow = [
      {
        step: 1,
        title: "Know what you are buying",
        studentAction: "Name the company, product, fund, bond, cash choice, portfolio holding or investor profile, and explain the ownership, lending claim or exposure.",
        evidenceCheck: "Record source title, publication date or accessed date, identifier, product type and the figure being used.",
        decisionOutput: "I can or cannot explain the investment in plain English."
      },
      {
        step: 2,
        title: "Check whether it fits the investor",
        studentAction: "State the goal, time horizon, need for liquidity and risk level before looking at possible return or compound-growth projections.",
        evidenceCheck: "Separate money needed soon from money that could accept market risk in a hypothetical profile.",
        decisionOutput: "This could fit, does not fit, or needs a safer product for the profile."
      },
      {
        step: 3,
        title: "Read evidence",
        studentAction: "Use company statements, quote pages, bond terms, fund factsheets, costs, risks, users or sector evidence to judge the case.",
        evidenceCheck: "Use dated figures and state what each figure can and cannot prove.",
        decisionOutput: "The evidence is improving, weakening, mixed or incomplete."
      },
      {
        step: 4,
        title: "Compare return, compounding, risk, price and cost",
        studentAction: "Estimate possible sources of return, identify whether compounding matters over the time horizon, identify risks and costs, and ask whether the price already reflects good news.",
        evidenceCheck: "Use valuation, quote-page, dividend, bond, fund-cost, compound-growth or comparison evidence where the lesson has taught it.",
        decisionOutput: "At this price, cost, time horizon and risk level, the case is attractive, risky, too expensive or not clear enough."
      },
      {
        step: 5,
        title: "Choose the next action",
        studentAction: "Write a justified classroom action: consider, watch, avoid, compare with another choice, or gather more evidence.",
        evidenceCheck: "Include dated evidence, one caveat, investor-fit logic and one item to monitor later.",
        decisionOutput: "A short investment memo that can be defended without tips or guesswork."
      }
    ];
    map.simpleLessonStructure = [
      {
        label: "Hook",
        purpose: "Start with a concrete company, product, fund, portfolio or investor-profile dilemma that students can answer before definitions.",
        studentQuestion: "What would I think at first, and why?"
      },
      {
        label: "Key idea",
        purpose: "Teach one concept, formula or rule that fixes the weakness in the first judgement.",
        studentQuestion: "What new idea makes my first answer better?"
      },
      {
        label: "Try it",
        purpose: "Use one short evidence, calculation, classification, matching or source task.",
        studentQuestion: "Can I use the evidence myself?"
      },
      {
        label: "Decide",
        purpose: "Write a justified next action: consider, watch, avoid, compare or gather more evidence.",
        studentQuestion: "What would a careful investor do next?"
      }
    ];
    map.decisionFirstSyllabus = {
      name: "Decision-first evidence-based investing",
      coursePromise: "Students move from first opinion to evidence-based judgement: each lesson begins with a concrete investor dilemma, exposes the missing evidence, teaches one useful idea and finishes with a justified next action.",
      lessonContract: [
        "Starter dilemma: a company, product, fund, portfolio or investor-profile question students can answer before definitions.",
        "First judgement: a quick vote, written reason or ranking that exposes the starting misconception.",
        "Missing evidence: the exact source, figure, comparison, concept or caveat students need next.",
        "Key idea: one concept, formula or rule that improves the initial judgement.",
        "Try it: one short evidence, calculation, classification, matching or source task.",
        "Misconception check: one explicit wrong shortcut to break before the exit.",
        "Exit judgement: a short defensible action such as consider, watch, avoid, compare or gather more evidence."
      ],
      generatorRule: "Lesson, handout, quiz and exam generators must preserve the decision-first contract before adding extra examples. Do not turn lessons into topic summaries or broad finance lectures.",
      studentFacingRule: "Visible lesson materials should foreground the case dilemma and student judgement. Detailed retrieval, worksheet and source metadata remain available in notes, handouts and generator context.",
      assessmentRule: "Every lesson must give the teacher evidence of readiness through a hinge check, classification, calculation, source check, peer comparison, misconception correction or individual written exit."
    };
    map.lessons = lessonSpecs.map(buildLesson);
  }

  applyDecisionFirstSyllabus(courseMap);

  global.INVEST = global.INVEST || {};
  global.INVEST.courseMap = courseMap;

  if (typeof module === "object" && module.exports) {
    module.exports = courseMap;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
