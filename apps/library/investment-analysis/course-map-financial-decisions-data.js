(function attachFinancialDecisionCourseMap(global) {
  const termBank = {
    investment: ["investment", "投资", "Investment is putting money into an asset to seek future return while accepting possible loss."],
    return: ["return", "回报", "Return is the gain or loss from an investment over a stated period, including price change and income."],
    financialGoal: ["financial goal", "财务目标", "A financial goal is a stated future use of money with an amount, priority and time horizon."],
    timeHorizon: ["time horizon", "投资期限", "Time horizon is the period before invested money is expected to be needed."],
    liquidityNeed: ["liquidity need", "流动性需求", "Liquidity need is the need to access money quickly without accepting a large loss or delay."],
    suitability: ["suitability", "适合度", "Suitability is the degree to which an investment matches a person's goal, horizon, liquidity need and ability to accept loss."],
    saving: ["saving", "储蓄", "Saving is keeping money available for future use, usually with lower risk and lower expected return than investing."],
    speculation: ["speculation", "投机", "Speculation is seeking profit from uncertain price movements, often with a short horizon and weaker evidence than investment analysis requires."],
    evidence: ["investment evidence", "投资证据", "Investment evidence is dated information used to support or challenge an investment judgement."],
    compounding: ["compounding", "复利", "Compounding is growth in which later returns build on earlier returns."],
    futureValue: ["future value", "终值", "Future value is the projected value of money after growth over a stated period and assumed return."],
    contribution: ["regular contribution", "定期投入", "A regular contribution is an amount added to an investment on a repeated schedule."],
    inflation: ["inflation", "通货膨胀", "Inflation is a sustained increase in the general price level that reduces the purchasing power of money."],
    purchasingPower: ["purchasing power", "购买力", "Purchasing power is the quantity of goods and services that money can buy."],
    realReturn: ["real return", "实际回报", "Real return is investment return after allowing for inflation."],
    risk: ["risk", "风险", "Risk is the possibility that results, returns or prices are worse than expected."],
    expectedReturn: ["expected return", "预期回报", "Expected return is a reasoned estimate of possible average return, not a guaranteed outcome."],
    uncertainty: ["uncertainty", "不确定性", "Uncertainty is limited knowledge about which future outcome will occur."],
    riskTolerance: ["risk tolerance", "风险承受意愿", "Risk tolerance is a person's willingness to accept uncertainty and investment losses."],
    riskCapacity: ["risk capacity", "风险承受能力", "Risk capacity is a person's financial ability to withstand loss without damaging important goals."],
    lossCapacity: ["loss capacity", "亏损承受能力", "Loss capacity is the amount of loss a person can absorb while still meeting essential goals."],
    investmentPlan: ["investment plan", "投资计划", "An investment plan records goals, horizon, risk limits, permitted asset types and review arrangements before investment choices are compared."],
    constraint: ["investment constraint", "投资限制", "An investment constraint is a limit such as a short horizon, liquidity need, loss limit or restricted asset or instrument type."],
    decisionRule: ["decision rule", "决策规则", "A decision rule is a written condition used to make choices consistently rather than emotionally."],
    cash: ["cash", "现金", "Cash is money available immediately with little price risk but exposure to inflation."],
    deposit: ["deposit", "存款", "A deposit is money held with a financial institution under stated access, interest and protection terms."],
    liquidity: ["liquidity", "流动性", "Liquidity is the ability to access or trade an asset quickly at relatively low cost without a large price change."],
    bond: ["bond", "债券", "A bond is a security representing money lent to an issuer in return for promised payments under stated terms."],
    coupon: ["coupon", "票息", "A coupon is the periodic interest payment specified by a bond."],
    maturity: ["maturity", "到期日", "Maturity is the date on which a bond's principal is due to be repaid."],
    share: ["share", "股票", "A share is one unit of ownership in a company and gives a claim on part of its equity."],
    shareholderRights: ["shareholder rights", "股东权利", "Shareholder rights are the voting, information or distribution rights attached to a class of shares."],
    equity: ["equity", "权益", "Equity is the residual ownership claim after liabilities are deducted from assets."],
    fund: ["investment fund", "投资基金", "An investment fund pools money from investors to hold a portfolio under stated objectives and rules."],
    etf: ["ETF", "交易型开放式指数基金", "An ETF is a fund whose units trade on an exchange during the trading day."],
    portfolioWeight: ["portfolio weight", "投资组合权重", "Portfolio weight is the percentage of a portfolio represented by one holding or asset class."],
    indexFund: ["index fund", "指数基金", "An index fund aims to track a specified market index rather than select securities to outperform it."],
    activeFund: ["actively managed fund", "主动管理基金", "An actively managed fund selects investments in an attempt to meet an objective or outperform a benchmark."],
    benchmark: ["benchmark", "基准", "A benchmark is a stated standard used to compare investment performance or risk."],
    expenseRatio: ["expense ratio", "费用率", "Expense ratio is the annual operating cost of a fund expressed as a percentage of fund assets."],
    feeDrag: ["fee drag", "费用拖累", "Fee drag is the reduction in investment growth caused by recurring fees and charges."],
    netReturn: ["net return", "净回报", "Net return is the return remaining after relevant fees and costs."],
    diversification: ["diversification", "分散投资", "Diversification is spreading investments across different exposures to reduce dependence on any single one."],
    correlation: ["correlation", "相关性", "Correlation describes the degree to which two investments tend to move together."],
    companySpecificRisk: ["company-specific risk", "公司特定风险", "Company-specific risk is risk arising from events or conditions affecting one company."],
    regularInvesting: ["regular investing", "定期投资", "Regular investing is adding money to investments on a repeated schedule rather than waiting for a perfect date."],
    lumpSum: ["lump-sum investing", "一次性投资", "Lump-sum investing is investing an available amount at one time."],
    timingRisk: ["timing risk", "时点风险", "Timing risk is the risk that the chosen entry or exit date leads to an unfavourable result."],
    assetAllocation: ["asset allocation", "资产配置", "Asset allocation is the division of a portfolio among asset classes such as cash, bonds and shares."],
    investorProfile: ["investor profile", "投资者画像", "An investor profile summarises goals, horizon, liquidity needs, knowledge and ability and willingness to accept risk."],
    portfolio: ["portfolio", "投资组合", "A portfolio is the collection of investments held by an investor."],
    equityFinancing: ["equity financing", "股权融资", "Equity financing is raising money by issuing ownership claims rather than borrowing."],
    ipo: ["initial public offering", "首次公开募股", "An initial public offering is the first public sale of a company's shares."],
    dilution: ["dilution", "股权稀释", "Dilution is a reduction in an existing shareholder's ownership percentage when additional shares are issued."],
    primaryMarket: ["primary market", "一级市场", "The primary market is where newly issued securities are sold and the issuer receives the proceeds."],
    secondaryMarket: ["secondary market", "二级市场", "The secondary market is where investors trade existing securities with one another."],
    exchange: ["stock exchange", "证券交易所", "A stock exchange is a regulated market where listed securities trade under published rules."],
    broker: ["broker", "经纪商", "A broker is an authorised intermediary that receives and executes client orders in financial markets."],
    custody: ["custody", "托管", "Custody is the safekeeping and administration of financial assets for an investor."],
    settlement: ["settlement", "结算", "Settlement is the completion of a trade through delivery of the security and payment."],
    bid: ["bid price", "买价", "Bid price is the highest displayed price a buyer is currently willing to pay."],
    ask: ["ask price", "卖价", "Ask price is the lowest displayed price a seller is currently willing to accept."],
    bidAskSpread: ["bid-ask spread", "买卖价差", "Bid-ask spread is the difference between the ask price and the bid price."],
    expectations: ["market expectations", "市场预期", "Market expectations are investors' collective views about future company or economic outcomes."],
    information: ["market information", "市场信息", "Market information is news, data or disclosure that may change expectations and trading decisions."],
    marketPrice: ["market price", "市场价格", "Market price is the price at which a security can trade at a particular time."],
    sharePrice: ["share price", "股价", "Share price is the market price of one share at a stated time."],
    marketCap: ["market capitalisation", "市值", "Market capitalisation is share price multiplied by shares outstanding."],
    sharesOutstanding: ["shares outstanding", "流通在外股份", "Shares outstanding are the shares issued and currently held by investors."],
    dividend: ["dividend", "股息", "A dividend is a distribution a company makes to shareholders from available resources."],
    capitalGain: ["capital gain", "资本利得", "A capital gain is the increase in an asset's value compared with its purchase price when measured or realised."],
    totalReturn: ["total return", "总回报", "Total return combines price change and income received over a stated holding period."],
    marketIndex: ["market index", "市场指数", "A market index measures the performance of a defined basket of securities according to stated rules."],
    indexWeight: ["index weight", "指数权重", "Index weight is the influence one constituent has on an index's movement."],
    marketReturn: ["market return", "市场回报", "Market return is the change in value of a stated market measure over a stated period, including income when specified."],
    sourceQuality: ["source quality", "来源质量", "Source quality is the reliability, relevance, date and limitations of evidence used in analysis."],
    materialInformation: ["material information", "重大信息", "Material information is information that could reasonably affect an investment decision or security price."],
    rumour: ["market rumour", "市场传闻", "A market rumour is an unverified claim circulating among market participants."],
    analystEthics: ["analyst ethics", "分析师职业道德", "Analyst ethics are principles requiring honesty, independence, competence and fair treatment in investment work."],
    conflictInterest: ["conflict of interest", "利益冲突", "A conflict of interest is a situation in which another interest could impair objective professional judgement."],
    professionalJudgement: ["professional judgement", "专业判断", "Professional judgement is a reasoned conclusion formed from evidence, standards, limitations and ethical duties."],
    businessModel: ["business model", "商业模式", "A business model explains how a company creates value, serves customers and earns revenue."],
    revenueDriver: ["revenue driver", "收入驱动因素", "A revenue driver is a factor such as price, volume, users or locations that influences sales."],
    competitiveAdvantage: ["competitive advantage", "竞争优势", "A competitive advantage is a capability or position that helps a company perform better than competitors over time."],
    incomeStatement: ["income statement", "利润表", "An income statement reports revenue, expenses and profit over a period."],
    revenue: ["revenue", "收入", "Revenue is income generated from ordinary business activities before expenses are deducted."],
    profitMargin: ["profit margin", "利润率", "Profit margin expresses a measure of profit as a percentage of revenue."],
    balanceSheet: ["balance sheet", "资产负债表", "A balance sheet reports assets, liabilities and equity at a point in time."],
    debt: ["debt", "债务", "Debt is money owed under repayment and interest obligations."],
    leverage: ["leverage", "杠杆", "Leverage is the use of debt or other fixed obligations that can amplify gains and losses to owners."],
    operatingCashFlow: ["operating cash flow", "经营现金流", "Operating cash flow is cash generated or used by normal business operations."],
    freeCashFlow: ["free cash flow", "自由现金流", "Free cash flow is operating cash flow minus capital expenditure in the course's simplified calculation."],
    earningsQuality: ["earnings quality", "盈利质量", "Earnings quality is the degree to which reported profit is supported by sustainable operations and cash generation."],
    peerComparison: ["peer comparison", "同业比较", "Peer comparison evaluates similar companies using aligned periods and definitions."],
    financialRatio: ["financial ratio", "财务比率", "A financial ratio relates two financial figures to support interpretation and comparison."],
    comparability: ["comparability", "可比性", "Comparability is the degree to which evidence can be compared fairly across companies or periods."],
    businessRisk: ["business risk", "经营风险", "Business risk is uncertainty arising from a company's operations, customers, costs and competitive environment."],
    industryRisk: ["industry risk", "行业风险", "Industry risk is exposure to conditions affecting companies in the same industry."],
    governanceRisk: ["governance risk", "治理风险", "Governance risk is the possibility that leadership, controls or incentives harm investors' interests."],
    eps: ["earnings per share", "每股收益", "Earnings per share is profit attributable to ordinary shareholders divided by the relevant number of shares."],
    peRatio: ["P/E ratio", "市盈率", "The P/E ratio is share price divided by earnings per share."],
    valuationRisk: ["valuation risk", "估值风险", "Valuation risk is the possibility that the price paid already assumes outcomes that may not occur."],
    investmentMemo: ["investment memo", "投资备忘录", "An investment memo is a structured written judgement using evidence, risks, valuation, limitations and a next action."],
    caveat: ["caveat", "限制说明", "A caveat is a stated limitation or condition that qualifies a conclusion."],
    evidenceBasedVerdict: ["evidence-based verdict", "基于证据的结论", "An evidence-based verdict is a conclusion explicitly supported by dated evidence and limitations."],
    strategicAllocation: ["strategic asset allocation", "战略资产配置", "Strategic asset allocation is a long-run target mix designed around goals and risk constraints."],
    goalBucket: ["goal bucket", "目标资金组合", "A goal bucket is a portion of a portfolio assigned to a particular purpose and horizon."],
    positionSize: ["position size", "持仓规模", "Position size is one holding's value as a percentage of the total portfolio."],
    concentrationRisk: ["concentration risk", "集中风险", "Concentration risk is the risk created when too much of a portfolio depends on one exposure."],
    currencyRisk: ["currency risk", "货币风险", "Currency risk is the possibility that exchange-rate changes affect investment value or return."],
    geographicExposure: ["geographic exposure", "地域敞口", "Geographic exposure is the share of an investment connected to particular countries or regions."],
    homeBias: ["home bias", "本土偏好", "Home bias is the tendency to invest disproportionately in familiar domestic markets."],
    marketRisk: ["market risk", "市场风险", "Market risk is the risk of broad price movements affecting many investments at the same time."],
    investmentComparison: ["investment comparison", "投资选择比较", "Investment comparison evaluates alternatives using the same goal, risk, cost, liquidity and evidence criteria."],
    opportunityCost: ["opportunity cost", "机会成本", "Opportunity cost is the next-best alternative given up when a choice is made."],
    rebalancing: ["rebalancing", "再平衡", "Rebalancing is adjusting portfolio weights toward stated targets after they have changed."],
    targetWeight: ["target weight", "目标权重", "Target weight is the planned percentage of a portfolio assigned to a holding or asset class."],
    transactionCost: ["transaction cost", "交易成本", "Transaction cost is a cost caused by buying, selling or administering an investment."],
    watchlist: ["watchlist", "观察名单", "A watchlist records investments and evidence that should be reviewed before a judgement changes."],
    reviewTrigger: ["review trigger", "复核触发条件", "A review trigger is an event or evidence threshold that requires a decision to be reconsidered."],
    monitoringEvidence: ["monitoring evidence", "监测证据", "Monitoring evidence is updated information used to test whether an earlier investment case still holds."],
    fomo: ["FOMO", "错失恐惧", "FOMO is fear of missing out that can push an investor to act without sufficient evidence."],
    recencyBias: ["recency bias", "近因偏差", "Recency bias is giving too much weight to recent events when judging the future."],
    performanceChasing: ["performance chasing", "追逐业绩", "Performance chasing is choosing investments mainly because of strong recent returns."],
    educationFund: ["education fund", "教育资金", "An education fund is money invested or saved for future education costs under a stated horizon and target."],
    targetAmount: ["target amount", "目标金额", "Target amount is the planned value needed for a financial goal."],
    contributionRate: ["contribution rate", "投入比例", "Contribution rate is the amount or percentage regularly added toward a goal."],
    shortTermGoal: ["short-term goal", "短期目标", "A short-term goal is a planned use of money within a relatively short and clearly stated period."],
    capitalPreservation: ["capital preservation", "资本保全", "Capital preservation is prioritising protection of the amount invested over seeking high return."],
    lossRisk: ["loss risk", "亏损风险", "Loss risk is the possibility that an investment is worth less when the money is needed."],
    retirementGoal: ["retirement goal", "退休目标", "A retirement goal is a long-term objective to finance spending after employment income reduces or stops."],
    retirementHorizon: ["retirement horizon", "退休投资期限", "Retirement horizon is the time until retirement money begins to be used and the period over which it may be needed."],
    withdrawalNeed: ["withdrawal need", "提取需求", "Withdrawal need is the amount and timing of money expected to be taken from a portfolio."],
    windfall: ["financial windfall", "意外之财", "A financial windfall is an unexpected receipt of a significant amount of money."],
    stagedDecision: ["staged decision", "分阶段决策", "A staged decision divides a large choice into planned steps so evidence can be gathered before all money is committed."],
    decisionPause: ["decision pause", "决策冷静期", "A decision pause is a deliberate waiting period used to reduce emotional or pressured action."],
    investmentFraud: ["investment fraud", "投资欺诈", "Investment fraud is deception used to obtain money by making false or misleading investment claims."],
    redFlag: ["fraud red flag", "欺诈警示信号", "A fraud red flag is a warning sign such as guaranteed high return, urgency, secrecy or unverifiable custody."],
    suitabilityDisclosure: ["suitability disclosure", "适合度说明", "A suitability disclosure explains relevant risks, investor requirements and product limitations."],
    equityResearch: ["equity research", "股票研究", "Equity research analyses companies and securities using financial, industry and valuation evidence."],
    portfolioManagement: ["portfolio management", "投资组合管理", "Portfolio management is selecting, monitoring and adjusting investments to meet stated objectives and constraints."],
    compliance: ["compliance", "合规", "Compliance is the function that helps an organisation and its staff follow laws, regulations and professional standards."],
    familyStrategy: ["family investment strategy", "家庭投资策略", "A family investment strategy connects several goals to suitable investment choices, risk limits, contributions and review rules."],
    familyCommunication: ["financial communication", "财务沟通", "Financial communication explains evidence, choices, risks and limitations clearly to other decision-makers."],
    professionalReferral: ["professional referral", "专业转介", "A professional referral identifies when a regulated or specialised adviser is needed instead of relying only on classroom analysis."]
  };

  const units = [
    { unit: 1, semester: 1, lessons: [1, 8], title: "Personal Investment Foundations", summary: "Students connect family goals, time, inflation, compounding and risk to a written investment plan before comparing investment choices.", unitOutput: "A team SMG investment policy plus an individual goal-horizon-risk decision charter." },
    { unit: 2, semester: 1, lessons: [9, 17], title: "Investment Choices for Families", summary: "Students compare cash, fixed-income securities, shares and funds, then combine knowledge of these choices with fees, diversification and suitable investing methods.", unitOutput: "An SMG portfolio-construction and investment-choice memo." },
    { unit: 3, semester: 1, lessons: [18, 26], title: "How Markets Work", summary: "Students trace securities from issue to settlement, read market evidence and explain prices, returns, indices and news without drifting into short-term speculation.", unitOutput: "An SMG transaction, quote, return and benchmark evidence memo." },
    { unit: 4, semester: 2, lessons: [27, 35], title: "Analysing Companies", summary: "Students use ethical source discipline, business models, financial statements, comparisons, risks and valuation to write a balanced junior analyst memo.", unitOutput: "A junior company-analysis memo on an SMG holding or watchlist candidate." },
    { unit: 5, semester: 2, lessons: [36, 43], title: "Portfolios and Investor Behaviour", summary: "Students construct, compare, monitor and rebalance portfolios while recognising concentration, currency, market and behavioural risks.", unitOutput: "An SMG portfolio review and evidence-based rebalance decision." },
    { unit: 6, semester: 2, lessons: [44, 50], title: "Family Investment Decisions and Careers", summary: "Students apply the course to education, housing, retirement and windfall cases, identify unsafe offers, explore careers and defend a final family strategy.", unitOutput: "A final SMG portfolio evaluation linked to a family strategy and team presentation." }
  ];

  const lessonSpecs = [
    { anchor: "Family goal table", role: "mock mainland China family profile", q: "Why do people and families invest?", zh: "个人与家庭为什么要投资？", hook: "A family has CNY 50,000 but no stated goal. What should it do next?", core: "People invest to move resources toward future goals while accepting uncertainty and possible loss.", terms: ["investment", "return", "financialGoal"], formula: "No new formula; classify goals by purpose, amount and time horizon.", task: "Choose whether to keep money available, gather more information or consider investing for four family goals.", naive: "Investing is simply a way to make more money.", need: "Students need the goal, time horizon, liquidity need and possible loss before judging whether investment is appropriate.", output: "Choose one goal. State the next step and justify it with one reason and one condition.", avoid: "Do not introduce budgeting, consumer finance or specific investment recommendations in the opening lesson." },
    { anchor: "Three family goals", role: "mock family profile", q: "How do goals change investment decisions?", zh: "财务目标如何改变投资决策？", hook: "Should money for university in three years be invested like retirement money needed in thirty years?", core: "An investment decision must begin with the goal, time horizon and liquidity need rather than a preferred investment.", terms: ["timeHorizon", "liquidityNeed", "suitability"], formula: "No new formula; rank goals by horizon and access need.", task: "Classify education, home and retirement goals by horizon and liquidity need.", naive: "The investment with the highest possible return fits every goal.", need: "Students need when the money is required, how flexible the date is and what loss would damage the goal.", output: "Explain why two goals require different investment choices.", avoid: "Do not compare or select investments before students can define the goal constraints." },
    { anchor: "Short-term and long-term money", role: "comparison case", q: "How are saving, investing and speculation different?", zh: "储蓄、投资和投机有什么区别？", hook: "A family has money for next year's fees and money for retirement. Should both amounts be treated in the same way?", core: "Saving protects near-term access, investing accepts risk for future return and speculation relies more heavily on uncertain price movement.", terms: ["saving", "investment", "speculation"], formula: "No new formula; classify choices by purpose, horizon, evidence and possible loss.", task: "Sort six actions as saving, investing or speculation and justify one borderline case.", naive: "Any purchase of shares is investing and any bank deposit is always the best choice.", need: "Students need the purpose, time horizon, evidence quality and loss consequences for each action.", output: "Correct one mistaken classification using the four decision criteria.", avoid: "Treat speculation only as a weak method to reject, not a parallel course topic." },
    { anchor: "Monthly investment projection", role: "calculation case", q: "How does compounding build wealth over time?", zh: "复利如何随时间积累财富？", hook: "Which matters more for long-run accumulation: starting earlier or waiting to contribute more later?", core: "Compounding allows returns to build on earlier returns, but every projection depends on assumed returns and contributions.", terms: ["compounding", "futureValue", "contribution"], formula: "Future value of one amount = starting amount x (1 + assumed return)^years; regular-contribution tables may be teacher-provided.", task: "Compare two frozen projections with different start dates and label every assumption.", naive: "A compound-growth projection shows what the investor will definitely receive.", need: "Students need the starting amount, contribution pattern, assumed return, time and whether fees are included.", output: "Explain why an earlier start changes the projection and state one limitation.", avoid: "Do not present assumed returns as promises or teach advanced annuity algebra." },
    { anchor: "Inflation and return table", role: "economic data case", q: "How does inflation affect real return?", zh: "通货膨胀如何影响实际回报？", hook: "An investment rises by 4% while prices rise by 3%. Has purchasing power risen by 4%?", core: "Real return measures how investment growth changes purchasing power after inflation.", terms: ["inflation", "purchasingPower", "realReturn"], formula: "Approximate real return = nominal return - inflation rate.", task: "Calculate approximate real return for three scenarios and interpret purchasing-power change.", naive: "Any positive nominal return makes the investor better off in real terms.", need: "Students need the same-period nominal return, inflation rate, fees and the limits of the approximation.", output: "Calculate one real return and explain what it means for a family goal.", avoid: "Do not turn the lesson into a general macroeconomics survey." },
    { anchor: "Risk-return choice set", role: "comparison case", q: "What is the relationship between risk and possible return?", zh: "风险与潜在回报有什么关系？", hook: "One choice offers a higher possible return. Does that make it the better investment?", core: "Higher possible return usually comes with greater uncertainty, but taking more risk does not guarantee higher return.", terms: ["risk", "expectedReturn", "uncertainty"], formula: "No new formula; compare possible upside, downside and uncertainty qualitatively.", task: "Place four choices on a risk-return grid and add one caveat to each placement.", naive: "Higher risk guarantees higher return over time.", need: "Students need the range of outcomes, probability limits, time horizon and consequences of loss.", output: "Reject or improve the statement that more risk always produces more return.", avoid: "Keep the risk-return rule simple; do not introduce volatility statistics yet." },
    { anchor: "Two investor profiles", role: "mock investor profile", q: "How are risk tolerance and risk capacity different?", zh: "风险承受意愿与风险承受能力有何不同？", hook: "Two people both say they accept risk, but only one can afford a large loss. Are their profiles the same?", core: "Risk tolerance describes willingness to accept loss, while risk capacity describes financial ability to withstand it.", terms: ["riskTolerance", "riskCapacity", "lossCapacity"], formula: "No new formula; compare willingness, financial consequences and time to recover.", task: "Diagnose the mismatch between stated willingness and actual loss capacity in two profiles.", naive: "A confident investor automatically has high risk capacity.", need: "Students need the goal, horizon, income stability, liquidity needs and effect of a loss.", output: "Explain which profile has lower risk capacity and why.", avoid: "Do not use personality quizzes as a substitute for financial evidence." },
    { anchor: "Family investment policy", role: "synthesis case", q: "Why should an investor write a plan before choosing investments?", zh: "为什么应先制定投资计划再选择投资？", hook: "A popular fund appears before a family has agreed its goals or risk limits. What should happen first?", core: "A written investment plan turns goals and constraints into decision rules before investment choices or market excitement influence the decision.", terms: ["investmentPlan", "constraint", "decisionRule"], formula: "No new formula; write rules for goal, horizon, liquidity, risk, cost and review.", task: "Complete a one-page investment plan for a mock family using evidence from Lessons 1-7.", naive: "A plan is unnecessary if the investment has performed well recently.", need: "Students need agreed goals, constraints, acceptable risks, asset-class and instrument boundaries and review arrangements.", output: "Write three investment-plan rules and justify the most important one.", avoid: "Do not select named investments; finish Unit 1 with rules that later security, fund and deposit lessons will use." },

    { anchor: "House-deposit money", role: "mock family profile", q: "When should money remain in cash or deposits?", zh: "哪些资金应保留为现金或存款？", hook: "A family expects to use its house-deposit money in eighteen months. Should it seek a higher stock-market return?", core: "Money needed soon may require liquidity and capital preservation even when cash has a lower expected return.", terms: ["cash", "deposit", "liquidity"], formula: "Simple annual interest = amount x stated annual rate; compare with inflation only when periods align.", task: "Compare two deposit extracts and a risky investment against the same short-horizon goal.", naive: "Cash is always safe because its price does not fall.", need: "Students need access terms, protection limits, interest, inflation and the consequence of investment loss.", output: "Choose cash, deposit or gather more evidence for the mock goal and justify the action.", avoid: "Do not turn the case into mortgage, banking or household-budget instruction." },
    { anchor: "Government and corporate bonds", role: "fixed-income security", q: "How do bonds provide income, and what risks remain?", zh: "债券如何提供收入，又有哪些风险？", hook: "A corporate bond offers a higher yield than a government bond. Is the extra income free?", core: "A bond is a lending claim whose income must be judged with maturity, credit, inflation and interest-rate risk.", terms: ["bond", "coupon", "maturity"], formula: "Annual coupon income = face value x coupon rate; current yield = annual coupon / market price x 100 when suitable.", task: "Label coupon, maturity and issuer risk on two frozen bond summaries.", naive: "Bonds cannot lose value because they pay interest.", need: "Students need issuer strength, maturity, coupon, price, yield and risk disclosures.", output: "Compare the two bonds and identify which evidence is still missing.", avoid: "Do not teach duration mathematics or imply that any bond is risk-free." },
    { anchor: "Tencent share ownership", role: "listed company", q: "What does owning a share mean?", zh: "持有股票意味着什么？", hook: "If you own one Tencent share, do you control the company or own its buildings?", core: "A share is one ownership unit with a residual claim and specified rights, not direct ownership of company assets.", terms: ["share", "shareholderRights", "equity"], formula: "Ownership percentage = shares owned / total shares outstanding x 100.", task: "Sort statements into ownership rights, possible benefits and claims a share does not provide.", naive: "One share gives direct control over the company and its assets.", need: "Students need the share class, total shares, voting rights and distribution policy.", output: "Explain accurately what one share gives and does not give.", avoid: "Do not move into exchange mechanics or valuation before ownership is secure." },
    { anchor: "CSI 300 ETF factsheet", role: "fund", q: "How do funds and ETFs let investors hold many assets?", zh: "基金和ETF如何让投资者持有多种资产？", hook: "One ETF holds hundreds of shares. Does that automatically make it suitable for every family?", core: "Funds pool investments and can broaden exposure, but their objective, holdings, cost and remaining risks must still be checked.", terms: ["fund", "etf", "portfolioWeight"], formula: "Portfolio weight = holding value / total portfolio value x 100.", task: "Read a frozen ETF factsheet and identify objective, top exposure, cost and one remaining risk.", naive: "An ETF is automatically safe because it contains many holdings.", need: "Students need the fund objective, index or strategy, holdings, geographic exposure, cost and risk disclosure.", output: "Write a fund-factsheet verdict for a mock long-term goal.", avoid: "Do not rank named funds or rely on recent performance." },
    { anchor: "Index and active fund pair", role: "fund comparison", q: "How are index funds and actively managed funds different?", zh: "指数基金与主动管理基金有何不同？", hook: "One fund tracks a market and another tries to beat it. Which evidence should decide between them?", core: "Index and active funds have different objectives, methods, costs and evidence requirements; neither label proves suitability.", terms: ["indexFund", "activeFund", "benchmark"], formula: "Active return = fund return - benchmark return when periods and fee treatment align.", task: "Compare two frozen fund summaries using objective, benchmark, cost, risk and evidence quality.", naive: "Active management always beats an index because experts choose the investments.", need: "Students need the stated objective, benchmark, fee, risk, holdings and multi-period evidence.", output: "Explain which evidence matters most before choosing between the two fund types.", avoid: "Do not present one fund type as universally superior." },
    { anchor: "Two fund fee schedules", role: "fund comparison", q: "How do investment fees reduce long-term wealth?", zh: "投资费用如何减少长期财富？", hook: "A fee difference of 0.8 percentage points looks small. Can it matter over twenty years?", core: "Recurring fees reduce the amount that remains invested and therefore reduce later compounding as well as current return.", terms: ["expenseRatio", "feeDrag", "netReturn"], formula: "Annual fund cost = invested amount x expense ratio; net return = gross return - relevant fees as a classroom approximation.", task: "Calculate first-year costs and compare two frozen long-run projections with different fees.", naive: "A fee below 1% is too small to affect a long-term decision.", need: "Students need all recurring and transaction fees, investment amount, period and assumptions used in projections.", output: "Calculate the fee difference and explain its long-run effect without assuming future returns.", avoid: "Do not choose a fund using cost alone or turn the lesson into tax administration." },
    { anchor: "Concentrated family holdings", role: "portfolio case", q: "How does diversification reduce avoidable risk?", zh: "分散投资如何降低可避免的风险？", hook: "A family owns ten technology shares. Is that a diversified portfolio?", core: "Diversification reduces dependence on one company or shared exposure, but it does not remove broad market risk.", terms: ["diversification", "correlation", "companySpecificRisk"], formula: "Combined exposure weight = sum of holdings sharing the same exposure.", task: "Map ten holdings by company, sector and geography, then identify hidden concentration.", naive: "Owning many securities always means the portfolio is diversified.", need: "Students need holding weights and the economic exposures the holdings share.", output: "Identify one avoidable concentration and one risk diversification cannot remove.", avoid: "Do not teach full portfolio optimisation or covariance calculations." },
    { anchor: "Monthly and lump-sum scenarios", role: "comparison case", q: "How do regular investing and lump-sum investing differ?", zh: "定期投资与一次性投资有何不同？", hook: "A family has money available now but dislikes choosing one purchase date. Should it invest all at once or in stages?", core: "Lump-sum and regular investing create different market-exposure and timing patterns; neither method guarantees profit.", terms: ["regularInvesting", "lumpSum", "timingRisk"], formula: "Average purchase price = total amount invested / total units purchased.", task: "Compare frozen rising, falling and uneven price paths for both methods.", naive: "Regular investing always earns a higher return than investing a lump sum.", need: "Students need when the money became available, the goal horizon, transaction costs and price path.", output: "Explain one advantage and one limitation of each method for a mock profile.", avoid: "Do not teach market timing or claim one method always wins." },
    { anchor: "Three family profiles", role: "synthesis case", q: "Which investment mix fits different family goals?", zh: "哪种投资组合适合不同的家庭目标？", hook: "Three families have the same amount but different goals. Should they hold the same investments?", core: "A suitable asset-class mix connects each goal to horizon, liquidity, loss capacity, diversification and cost.", terms: ["assetAllocation", "investorProfile", "portfolio"], formula: "Asset-class weight = asset-class value / total portfolio value x 100.", task: "Build and defend different high-level asset-class mixes for short-, medium- and long-horizon profiles.", naive: "The portfolio with the highest expected return is best for all three families.", need: "Students need each goal's horizon, flexibility, liquidity need, risk capacity and investment-choice evidence.", output: "Write an investment-choice comparison memo for the three profiles.", avoid: "Use broad asset classes and mock profiles; do not recommend named securities, funds, provider products or personalised portfolios." },

    { anchor: "Growth company financing", role: "listed company", q: "Why do companies issue shares?", zh: "公司为什么发行股票？", hook: "A growing company needs new capital. Why might it issue shares instead of borrowing?", core: "Companies issue shares to raise equity capital, but new issuance changes ownership claims and may dilute existing holders.", terms: ["equityFinancing", "ipo", "dilution"], formula: "Ownership percentage = shares owned / total shares outstanding x 100 before and after issuance.", task: "Trace how a new share issue changes company cash and an existing shareholder's percentage ownership.", naive: "When investors trade a company's shares, the company receives the money every time.", need: "Students need whether shares are newly issued, the use of proceeds and share counts before and after.", output: "Explain one benefit to the company and one effect on existing shareholders.", avoid: "Do not teach advanced capital-structure theory or assume every share issue is positive." },
    { anchor: "HKEX market map", role: "market infrastructure", q: "How are primary and secondary markets different?", zh: "一级市场和二级市场有何不同？", hook: "You buy an existing share through HKEX. Does your payment go to the company?", core: "Primary markets fund issuers through new securities, while secondary markets allow investors to trade existing securities.", terms: ["primaryMarket", "secondaryMarket", "exchange"], formula: "No new formula; trace security and money flows between issuer, investor and market participants.", task: "Complete two flow diagrams for a new issue and a secondary-market trade.", naive: "Every stock-market purchase sends new money to the listed company.", need: "Students need the security's issue status, counterparties and role of the exchange.", output: "Correct the money-flow misconception using both market diagrams.", avoid: "Do not add bid-ask or order mechanics until later lessons." },
    { anchor: "Broker trade journey", role: "market infrastructure", q: "How do brokers, custody and settlement complete a trade?", zh: "经纪商、托管和结算如何完成交易？", hook: "A student presses buy in an app. Which institutions must act before the trade is complete?", core: "A securities trade depends on authorised intermediation, recordkeeping, custody and settlement beyond the trading screen.", terms: ["broker", "custody", "settlement"], formula: "No new formula; sequence the operational steps from order to settlement.", task: "Put order entry, execution, confirmation, payment, delivery and custody into the correct sequence.", naive: "The trading app itself owns the shares and completes the entire trade instantly.", need: "Students need the roles, legal holder arrangement, settlement cycle and relevant costs.", output: "Explain the role of three market participants in one completed trade.", avoid: "Do not recommend brokers or teach app-specific procedures." },
    { anchor: "Alibaba quote snapshot", role: "Hong Kong market data case", q: "What can a quote page tell an investor?", zh: "报价页面能告诉投资者什么？", hook: "An HKEX quote shows Hong Kong-listed Alibaba at HKD 82. Is that the price every investor can trade immediately?", core: "A quote page is a dated market snapshot showing available information, not guaranteed execution or evidence of intrinsic value.", terms: ["bid", "ask", "bidAskSpread"], formula: "Bid-ask spread = ask price - bid price.", task: "Read a frozen quote page, calculate the spread and separate known facts from unsupported conclusions.", naive: "The displayed last price is always the exact price of the next trade.", need: "Students need the snapshot time, bid, ask, volume, market status and order conditions.", output: "Calculate the spread and state two things the quote page cannot prove.", avoid: "Do not introduce technical chart patterns or live-price dependence." },
    { anchor: "Earnings-news price reaction", role: "market data case", q: "Why do share prices change?", zh: "为什么股价会变化？", hook: "A company reports higher profit, yet its share price falls. How can both be true?", core: "Share prices change when new information changes expectations and investors' willingness to buy or sell at particular prices.", terms: ["expectations", "information", "marketPrice"], formula: "Percentage price change = (new price - old price) / old price x 100.", task: "Connect four news items to expectation changes and possible buying or selling pressure without predicting certainty.", naive: "Good company news must make the share price rise.", need: "Students need prior expectations, the new information, valuation, alternative explanations and the price snapshot period.", output: "Explain one price reaction using the chain information to expectations to action to price pressure.", avoid: "Do not claim that one news item fully explains a market move." },
    { anchor: "Nvidia and peer scale case", role: "United States company comparison", q: "How are share price and company size different?", zh: "股价与公司规模有什么区别？", hook: "Company A has a USD 500 share price and Company B has a USD 100 share price. Which company is larger?", core: "One-share price cannot show company size because market capitalisation also depends on shares outstanding.", terms: ["sharePrice", "marketCap", "sharesOutstanding"], formula: "Market capitalisation = share price x shares outstanding.", task: "Calculate market capitalisation for two simplified companies and compare scale.", naive: "The company with the higher share price is the larger or more valuable company.", need: "Students need share price, share count, consistent currency and snapshot date.", output: "Calculate both market capitalisations and correct the high-price misconception.", avoid: "Do not treat market capitalisation as proof of investment quality or fair value." },
    { anchor: "HSBC return case", role: "listed company", q: "How does a share create gains, losses and income?", zh: "股票如何为投资者带来或损失回报？", hook: "A share pays a dividend but its price falls. Did the investor earn a positive return?", core: "Shareholder return combines price change and distributions over the same holding period.", terms: ["dividend", "capitalGain", "totalReturn"], formula: "Total return amount = ending value - starting value + income; total return percentage = total return amount / starting value x 100.", task: "Calculate and interpret total return in gain, loss and dividend scenarios.", naive: "Receiving a dividend means the investment produced a positive total return.", need: "Students need purchase value, ending value, income, holding period, currency and costs.", output: "Calculate total return and explain which component drove the result.", avoid: "Do not treat historical return as a forecast." },
    { anchor: "Hang Seng Index snapshot", role: "market data case", q: "How does a market index measure performance?", zh: "市场指数如何衡量市场表现？", hook: "The Hang Seng Index rises. Does that mean every listed share rose?", core: "A market index measures a defined basket under weighting rules and cannot represent every security or every investor's return.", terms: ["marketIndex", "indexWeight", "marketReturn"], formula: "Index percentage change = (new index level - old index level) / old index level x 100.", task: "Read constituent weights and explain why one large company can influence an index more than another.", naive: "If an index rises, all constituent shares and all investor portfolios gained the same amount.", need: "Students need index rules, constituents, weights, dates and whether income is included.", output: "Explain what the index movement shows and two things it does not show.", avoid: "Do not teach complex index construction or imply that an index equals the whole economy." },
    { anchor: "News and rumour evidence pack", role: "source evaluation case", q: "How should investors judge market news?", zh: "投资者应如何判断市场新闻？", hook: "A social-media post claims a company will announce a major deal tomorrow. What should a careful investor do?", core: "Market news should be checked for source quality, date, materiality, confirmation and limitations before it changes an investment judgement.", terms: ["sourceQuality", "materialInformation", "rumour"], formula: "No new formula; score sources by authority, date, evidence, corroboration and limitation.", task: "Rank five source extracts and decide which justify action, monitoring or rejection.", naive: "Widely shared information is reliable enough to trade on.", need: "Students need the original source, publication time, supporting evidence, independent confirmation and legal or ethical limits.", output: "Write a market-evidence memo choosing monitor, reject or gather more evidence.", avoid: "Do not simulate rumour trading or turn news evaluation into market timing." },

    { anchor: "Analyst conflict case", role: "professional ethics case", q: "What ethical responsibilities does an investment analyst have?", zh: "投资分析师有哪些道德责任？", hook: "An analyst owns shares in a company before publishing a positive report. What must readers know?", core: "Investment analysis requires honesty, independence, competence, conflict disclosure and clear separation of evidence from opinion.", terms: ["analystEthics", "conflictInterest", "professionalJudgement"], formula: "No new formula; apply an ethics checklist to evidence, incentives and disclosure.", task: "Identify ethical problems in three analyst scenarios and propose a corrective action.", naive: "Accurate calculations make an analysis ethical even when conflicts are hidden.", need: "Students need the analyst's interests, evidence process, audience, disclosures and professional duties.", output: "Explain the most serious conflict and the action needed before publication.", avoid: "Do not reduce ethics to a vocabulary lesson; require an evidence-based professional decision." },
    { anchor: "Tencent business model", role: "listed company", q: "How does a business make money and defend its position?", zh: "企业如何赚钱并保持竞争优势？", hook: "Tencent offers many services. Which activities actually create revenue and strengthen the business?", core: "A company analysis begins with how the business creates value, earns revenue and sustains an advantage before reading ratios.", terms: ["businessModel", "revenueDriver", "competitiveAdvantage"], formula: "No new formula; map customer, value proposition, revenue driver, cost and competitive advantage.", task: "Build a business-model map from a frozen company extract and identify one weak assumption.", naive: "A famous brand automatically proves a durable competitive advantage.", need: "Students need segment revenue, customer behaviour, costs, competitors and evidence that an advantage can persist.", output: "Explain one revenue driver and one risk to the claimed advantage.", avoid: "Do not evaluate share price or valuation before the business model is understood." },
    { anchor: "Meituan income statement", role: "listed company", q: "What does an income statement reveal about performance?", zh: "利润表能说明企业表现的哪些方面？", hook: "Meituan's revenue rises quickly. Does that prove the business became more profitable?", core: "An income statement shows revenue, expenses and profit over a period, but each figure needs comparison and explanation.", terms: ["incomeStatement", "revenue", "profitMargin"], formula: "Revenue growth = (new revenue - old revenue) / old revenue x 100; profit margin = profit / revenue x 100.", task: "Calculate revenue growth and one margin, then explain why they can move differently.", naive: "Rising revenue always means rising profitability and a stronger investment case.", need: "Students need aligned periods, accounting definitions, segment context and cost changes.", output: "Calculate two measures and write one sentence linking them to company performance.", avoid: "Do not cover every income-statement line or treat one year as a full trend." },
    { anchor: "Lenovo balance sheet", role: "listed company", q: "How does a balance sheet reveal financial strength and debt risk?", zh: "资产负债表如何揭示财务实力和债务风险？", hook: "A company owns many assets but also owes large amounts. Which side matters more?", core: "A balance sheet shows resources, obligations and equity at one date; debt must be judged with liquidity, cash generation and business context.", terms: ["balanceSheet", "debt", "leverage"], formula: "Equity = assets - liabilities; debt-to-equity = total debt / equity when definitions are suitable.", task: "Classify balance-sheet items, calculate a simplified leverage measure and state one limitation.", naive: "More debt always means a company is weak, while more assets always mean it is safe.", need: "Students need debt type, maturity, cash, equity, operating cash flow and comparable definitions.", output: "Interpret the leverage measure and identify the next evidence needed.", avoid: "Do not use bank balance sheets or advanced solvency ratios in this foundation lesson." },
    { anchor: "Tesla cash-flow extract", role: "listed company", q: "Why can profit and cash flow tell different stories?", zh: "为什么利润和现金流可能讲述不同的故事？", hook: "A company reports profit but has negative free cash flow. Is one figure wrong?", core: "Profit uses accounting recognition while cash flow records cash movement, so both are needed to judge earnings quality and investment needs.", terms: ["operatingCashFlow", "freeCashFlow", "earningsQuality"], formula: "Free cash flow = operating cash flow - capital expenditure.", task: "Calculate free cash flow and compare it with reported profit across two periods.", naive: "Reported profit means the same amount of cash entered the company.", need: "Students need operating cash flow, capital expenditure, working-capital context and the reporting period.", output: "Explain why profit and free cash flow differ and what the difference may imply.", avoid: "Do not introduce a full cash-flow statement reconstruction." },
    { anchor: "BYD and Toyota peer comparison", role: "company comparison", q: "How can two companies be compared fairly?", zh: "如何公平比较两家公司？", hook: "BYD grows faster while Toyota has a higher margin. Which company is stronger?", core: "A fair comparison uses aligned periods, currencies, definitions, business models and several relevant measures rather than one headline figure.", terms: ["peerComparison", "financialRatio", "comparability"], formula: "Use previously taught growth, margin and leverage formulas with aligned figures.", task: "Audit a flawed comparison table, repair the mismatches and write a balanced comparison.", naive: "The company with the best single ratio is the stronger investment.", need: "Students need comparable periods, accounting definitions, scale, business mix and risk evidence.", output: "Write a two-measure comparison with one explicit comparability caveat.", avoid: "Do not introduce new ratios simply to make the table larger." },
    { anchor: "Global consumer company risk register", role: "listed company", q: "Which important risks may not appear directly in the financial statements?", zh: "哪些重要风险不会直接出现在财务报表中？", hook: "A company's historical numbers look strong. What could still damage its future results?", core: "Company analysis must add operational, industry, competitive and governance evidence because historical statements cannot show every future risk.", terms: ["businessRisk", "industryRisk", "governanceRisk"], formula: "No new formula; assess each risk by evidence, likelihood, impact and possible indicator.", task: "Build a risk register from dated company and industry extracts.", naive: "Strong historical profit proves that the company is low risk.", need: "Students need risk disclosures, industry evidence, competitive conditions, governance information and indicators to monitor.", output: "Prioritise two risks and explain the evidence behind the ranking.", avoid: "Do not list generic risks without linking them to the case and a transmission channel." },
    { anchor: "Microsoft valuation case", role: "listed company", q: "Can a good company still be too expensive?", zh: "一家好公司是否仍可能价格过高？", hook: "Microsoft has a strong business, but investors pay a high price for its earnings. Can both statements be true?", core: "Investment quality depends on both the business and the price paid; a high valuation can increase disappointment risk when expectations are demanding.", terms: ["eps", "peRatio", "valuationRisk"], formula: "EPS = net profit / shares; P/E ratio = share price / EPS.", task: "Calculate a simplified P/E, compare it with a peer and list the expectations the price may imply.", naive: "A high-quality company is attractive at any price.", need: "Students need sustainable earnings, price date, peer basis, growth expectations and risk evidence.", output: "Interpret the P/E comparison and state why it cannot decide the case alone.", avoid: "Do not teach discounted cash flow or use P/E as a mechanical buy signal." },
    { anchor: "Junior analyst evidence pack", role: "synthesis case", q: "How should a junior analyst write an evidence-based company memo?", zh: "如何撰写有证据支持的公司分析备忘录？", hook: "The evidence shows a strong business, mixed cash flow and a demanding price. What conclusion is defensible?", core: "A balanced company memo connects business quality, financial evidence, risk, valuation, caveats and a practical next action.", terms: ["investmentMemo", "caveat", "evidenceBasedVerdict"], formula: "Use one relevant earlier formula only when the source pack supports it.", task: "Audit a multi-source evidence pack and write a memo choosing consider, watch, avoid, compare or gather more evidence.", naive: "A company analysis is incomplete unless it ends with buy, sell or hold advice.", need: "Students need dated business, statement, risk and valuation evidence plus source limitations.", output: "Write a junior analyst memo with three evidence points, two risks, one caveat and one next action.", avoid: "Do not give personal buy, sell or hold advice or hide mixed evidence." },

    { anchor: "Three-goal family portfolio", role: "portfolio case", q: "How should asset allocation reflect family goals?", zh: "资产配置应如何反映家庭目标？", hook: "One family portfolio must support education, a home purchase and retirement. Should every goal use the same asset mix?", core: "Asset allocation should connect separate goal buckets to their horizons, liquidity needs and risk capacities.", terms: ["assetAllocation", "strategicAllocation", "goalBucket"], formula: "Asset-class weight = asset-class value / total portfolio value x 100.", task: "Assign broad asset classes to three goal buckets and calculate the resulting weights.", naive: "One family should have one identical risk level for all money and all goals.", need: "Students need each goal amount, horizon, flexibility, contribution plan and loss capacity.", output: "Defend the allocation of each goal bucket and state one unresolved assumption.", avoid: "Use broad asset classes and mock profiles; do not name securities." },
    { anchor: "Concentrated Tencent holding", role: "portfolio case", q: "When is one holding too large?", zh: "什么时候单一持仓比例过高？", hook: "Tencent rises until it becomes 38% of a family portfolio. Is that success, risk or both?", core: "Position size controls how strongly one company can affect the whole portfolio, so a familiar winner can become a concentration risk.", terms: ["positionSize", "concentrationRisk", "portfolioWeight"], formula: "Position size = holding value / total portfolio value x 100.", task: "Calculate position sizes before and after a price change and identify the portfolio consequence.", naive: "A strong company cannot be too large in a portfolio.", need: "Students need current weights, target rules, tax or transaction constraints if relevant and the holding's shared exposures.", output: "Calculate the concentration and choose monitor, rebalance or gather more evidence for the mock plan.", avoid: "Do not create one universal maximum position size." },
    { anchor: "Global fund exposure", role: "fund", q: "How do geographic and currency exposures affect a portfolio?", zh: "地域和货币敞口如何影响投资组合？", hook: "A fund is labelled global, but most holdings and revenue come from one region. How diversified is it?", core: "Global labels do not remove geographic or currency concentration; investors must inspect where holdings earn money and in which currencies returns are measured.", terms: ["currencyRisk", "geographicExposure", "homeBias"], formula: "Region weight = regional holding value / portfolio value x 100; exchange-rate percentage change may be interpreted from a frozen table.", task: "Read regional weights and revenue exposure, then identify hidden home or currency bias.", naive: "A global fund removes country and currency risk.", need: "Students need holdings, revenue geography, base currency, hedging policy and regional weights.", output: "Explain one geographic benefit and one remaining currency or concentration risk.", avoid: "Do not teach currency forecasting or derivative hedging mechanics." },
    { anchor: "Diversified portfolio stress test", role: "portfolio case", q: "Which risks remain after diversification?", zh: "分散投资后还剩下哪些风险？", hook: "A portfolio owns many companies and funds, yet nearly everything falls during a market shock. Has diversification failed?", core: "Diversification reduces some specific risks but cannot eliminate broad market risk or exposures that become more correlated in stress.", terms: ["marketRisk", "correlation", "diversification"], formula: "No new formula; compare direction and magnitude of holding changes in a frozen stress scenario.", task: "Stress-test a diversified portfolio against market, sector and company-specific shocks.", naive: "A diversified portfolio should never experience a large loss.", need: "Students need asset weights, shared exposures, scenario assumptions and the goal horizon.", output: "Identify which risks were diversified and which remained in each scenario.", avoid: "Do not introduce beta, standard deviation or optimisation mathematics." },
    { anchor: "Fund-share-bond comparison", role: "investment comparison", q: "How can funds, shares and bonds be compared fairly?", zh: "如何公平比较基金、股票和债券？", hook: "A bond has a clear yield, a fund has broad holdings and a share has strong growth. Which comparison is fair?", core: "Fair investment comparison uses the same goal and evaluates return source, downside, liquidity, cost, diversification and evidence limitations.", terms: ["investmentComparison", "opportunityCost", "suitability"], formula: "Use relevant earlier return, yield, cost and weight formulas only with aligned data.", task: "Complete a comparison matrix for one mock profile using frozen investment evidence.", naive: "The investment with the highest recent return is the best alternative.", need: "Students need the same goal, date, currency, horizon, risk categories, costs and the terms of each choice.", output: "Choose compare further, consider, watch or avoid and justify the investment trade-off.", avoid: "Do not force unlike return measures into one misleading ranking." },
    { anchor: "Drifted portfolio", role: "portfolio case", q: "Why and when should a portfolio be rebalanced?", zh: "为什么以及何时需要再平衡投资组合？", hook: "Shares rise and the portfolio moves far above its planned share weight. Should the family leave it alone?", core: "Rebalancing restores planned risk exposure, but any action must consider evidence, thresholds and transaction costs.", terms: ["rebalancing", "targetWeight", "transactionCost"], formula: "Weight gap = current weight - target weight; trade amount = target value - current value.", task: "Calculate weight gaps and compare calendar, threshold and no-action choices.", naive: "Rebalancing always improves returns and should happen whenever prices move.", need: "Students need target weights, current weights, tolerance bands, costs and whether goals changed.", output: "Calculate one adjustment and justify rebalance, monitor or no action.", avoid: "Do not imply that rebalancing predicts which asset will rise next." },
    { anchor: "Investment watchlist", role: "monitoring case", q: "What should investors monitor after making a decision?", zh: "投资者在决策后应监测什么？", hook: "A careful investor chooses watch rather than buy or avoid. What must be watched next?", core: "Monitoring tests the original investment case using planned evidence, dates and triggers rather than reacting to every price movement.", terms: ["watchlist", "reviewTrigger", "monitoringEvidence"], formula: "No new formula; define measurable triggers and scheduled review dates.", task: "Convert a company or fund thesis into a watchlist of evidence, trigger, date and response.", naive: "Monitoring means checking the price every day.", need: "Students need the original thesis, material evidence indicators, review interval and action rules.", output: "Create a four-item watchlist and explain the most important trigger.", avoid: "Do not reward constant price checking or news-driven trading." },
    { anchor: "Past-winner fund", role: "behaviour case", q: "Why do investors chase winners or panic after losses?", zh: "为什么投资者会追涨或恐慌卖出？", hook: "Last year's best-performing fund attracts large inflows just before it falls. Why might investors still have chosen it?", core: "FOMO, recency bias and performance chasing can replace goal-based evidence with emotional reactions to recent prices.", terms: ["fomo", "recencyBias", "performanceChasing"], formula: "No new formula; separate evidence, emotion, recent outcome and decision rule.", task: "Diagnose the bias in six scenarios and rewrite each decision using the investment plan.", naive: "Recent winners are the safest investments because their trend is proven.", need: "Students need the original goal, long-run evidence, valuation, risk and whether the decision rule changed.", output: "Correct one performance-chasing decision using evidence and a written plan rule.", avoid: "Do not teach behavioural labels without requiring a better replacement decision." },

    { anchor: "Education investment goal", role: "mock family profile", q: "How should a family invest for an education goal?", zh: "家庭应如何为教育目标投资？", hook: "University costs begin in eight years, but payments will be needed over four years. Is one investment horizon enough?", core: "An education strategy connects target amount, contribution rate, investment horizon and later withdrawal needs, with risk normally reducing as the goal approaches.", terms: ["educationFund", "targetAmount", "contributionRate"], formula: "Funding gap = target amount - projected available amount; contribution scenarios use teacher-provided compound tables.", task: "Build a staged education-funding plan from a mock family profile and frozen projections.", naive: "A long-term goal should remain fully invested in risky assets until the first payment date.", need: "Students need target cost, timing of several payments, current amount, contributions, inflation assumption and loss capacity.", output: "Explain how the education strategy should change as the first payment approaches.", avoid: "Do not promise a required return or recommend named education products." },
    { anchor: "Home-deposit goal", role: "mock family profile", q: "How much investment risk should house-deposit money take?", zh: "计划购房的资金应承担多少风险？", hook: "A family hopes to buy a home in three years but could delay by one year. How much loss risk can the deposit accept?", core: "A short, partly flexible goal usually prioritises capital preservation and liquidity over maximising expected return.", terms: ["shortTermGoal", "capitalPreservation", "lossRisk"], formula: "Maximum affordable loss = current amount - minimum amount required by the purchase date.", task: "Compare cash, short-maturity bond and equity scenarios against the goal's minimum amount and flexibility.", naive: "Because housing is expensive, the deposit must seek the highest possible return.", need: "Students need minimum amount, target date, flexibility, loss limit and the access conditions of each choice.", output: "Choose a broad risk level and justify it using the goal constraints.", avoid: "Do not teach mortgages, property valuation or household budgeting." },
    { anchor: "Retirement investment goal", role: "mock family profile", q: "How can long-term investing support retirement?", zh: "长期投资如何支持退休目标？", hook: "A retirement goal is thirty years away, but the money may then be needed for decades. Which horizon matters?", core: "Retirement investing combines a long accumulation period with later withdrawal needs, so contributions, diversification, fees and changing risk capacity all matter.", terms: ["retirementGoal", "retirementHorizon", "withdrawalNeed"], formula: "Projected value = current amount x (1 + assumed return)^years plus teacher-provided contribution projections; label all assumptions.", task: "Compare two retirement contribution paths and design review stages for a mock profile.", naive: "A long horizon means retirement money can take unlimited risk until retirement day.", need: "Students need contribution capacity, retirement date range, expected withdrawals, inflation, fees and loss capacity.", output: "Explain why the strategy should be reviewed during both accumulation and withdrawal stages.", avoid: "Do not teach jurisdiction-specific pension administration or promise a retirement income." },
    { anchor: "Family windfall", role: "mock mainland China family profile", q: "How should a family handle a financial windfall?", zh: "家庭应如何处理一笔意外之财？", hook: "A family receives CNY 500,000 unexpectedly and feels pressure to invest immediately. What should happen first?", core: "A windfall should trigger a decision pause, goal review and staged evidence process rather than an immediate all-or-nothing investment.", terms: ["windfall", "stagedDecision", "decisionPause"], formula: "Allocation percentage = amount assigned to a goal / total windfall x 100.", task: "Create a staged decision map that separates immediate protection, goal review, evidence gathering and later allocation.", naive: "Leaving windfall money temporarily uninvested always wastes an opportunity.", need: "Students need goals, obligations, decision-makers, horizon, risk capacity, professional needs and investment evidence.", output: "Write a first-month windfall action plan without selecting named investments.", avoid: "Do not turn the lesson into inheritance law, tax advice or a model portfolio recommendation." },
    { anchor: "Suspicious investment offer", role: "product-risk case", q: "How can investors recognise fraud and unsuitable products?", zh: "如何识别投资骗局和不合适的产品？", hook: "An online offer promises a guaranteed 18% return and demands payment today. Which claims should stop the decision?", core: "Guaranteed high return, urgency, secrecy, unverifiable custody and missing suitability evidence are reasons to stop and verify before transferring money.", terms: ["investmentFraud", "redFlag", "suitabilityDisclosure"], formula: "No new formula; apply a stop-check-verify checklist to claims, provider, custody and disclosure.", task: "Audit four offers and identify fraud red flags, unsuitable features and verification steps.", naive: "A professional-looking website and testimonials prove an investment is legitimate.", need: "Students need provider authorisation, independent contact details, custody, written terms, risk disclosure and complaint routes.", output: "Write a stop-and-verify response identifying the three strongest red flags.", avoid: "Do not teach general online safety; keep the lesson specific to investment offers and suitability." },
    { anchor: "Investment career rotation", role: "career case", q: "Which careers support investment decisions, and how do they work?", zh: "投资行业有哪些职业及其工作方式？", hook: "A family investment decision may involve research, planning, portfolio management, operations and compliance. Who does what?", core: "Investment careers apply different combinations of analysis, communication, technology, ethics and control to the same decision process.", terms: ["equityResearch", "portfolioManagement", "compliance"], formula: "No new formula; map evidence, decision, communication and control responsibilities across roles.", task: "Rotate through analyst, adviser, portfolio, risk, operations and compliance mini-cases and produce one work sample.", naive: "Investment careers mainly involve choosing winning stocks.", need: "Students need role responsibilities, required skills, ethical duties, typical outputs and decision authority.", output: "Compare three careers and identify the skills this course develops for each.", avoid: "Do not present career titles as interchangeable or promise a career outcome." },
    { anchor: "Family investment strategy capstone", role: "synthesis case", q: "How should students build and explain a family investment strategy?", zh: "如何制定并说明家庭投资策略？", hook: "A mock family has education, housing and retirement goals plus an existing portfolio. What should its next investment process be?", core: "A defensible family strategy connects goals, horizons, asset classes, investment choices, evidence, costs, risks, monitoring and professional limits in clear language.", terms: ["familyStrategy", "familyCommunication", "professionalReferral"], formula: "Use relevant earlier formulas only where the frozen case evidence supports them.", task: "Build and present a complete strategy from a multi-source mock family evidence pack.", naive: "A final strategy is useful only if it tells the family exactly what to buy.", need: "Students need the full profile, investment evidence, existing allocation, goal priorities, uncertainties and matters requiring professional advice.", output: "Present a family strategy with goal allocations, evidence, risks, caveats, review rules and professional referrals.", avoid: "Do not use real family account data or give personalised buy, sell or hold advice." }
  ];

  const unitReuse = {
    1: "Reused throughout the course when investment choices, markets, companies and portfolios are judged against goals and constraints.",
    2: "Reused in market, portfolio and family-case lessons when students compare security, fund or deposit structure, cost and suitability.",
    3: "Reused in company analysis and portfolio monitoring when students interpret prices, returns, market evidence and news.",
    4: "Reused in portfolio comparison and the final family strategy when students judge individual-company evidence.",
    5: "Reused in the family cases and capstone when students construct, monitor and explain portfolios.",
    6: "Synthesises the entire course and provides evidence of readiness for further study or introductory finance careers work."
  };

  function getUnit(lessonNumber) {
    return units.find(function findUnit(unit) {
      return lessonNumber >= unit.lessons[0] && lessonNumber <= unit.lessons[1];
    });
  }

  function getTerms(keys) {
    return keys.map(function mapTerm(key) {
      const item = termBank[key];
      if (!item) throw new Error("Missing financial-decisions term: " + key);
      return { term: item[0], zh: item[1], definition: item[2] };
    });
  }

  function sourceTypes(spec) {
    if (/listed company|company comparison/.test(spec.role)) {
      return ["official annual or interim report extract", "dated company or market-data snapshot", "risk, industry or governance source"];
    }
    if (/fund|fixed-income security|deposit product|investment comparison|product-risk case/.test(spec.role)) {
      return ["official factsheet or product disclosure", "dated fee, holdings, yield or risk snapshot", "official or regulator investor-education source"];
    }
    if (/market/.test(spec.role)) {
      return ["official exchange or market-infrastructure source", "teacher-frozen market-data snapshot", "dated disclosure or reputable market explanation"];
    }
    if (/career|professional ethics/.test(spec.role)) {
      return ["professional code or official role description", "teacher-built workflow case", "dated career or industry source"];
    }
    return ["mock family or investor profile", "teacher-frozen investment, market or economic evidence", "official or regulator investor-education source"];
  }

  const stockMarketGamePhases = [
    {
      phase: 1,
      lessons: [1, 8],
      officialStage: "Understanding SMG and Before You Invest",
      coursePurpose: "Form teams, learn the national and local rules, rotate defined roles, open the team journal and write an evidence-based investment policy before any order is entered.",
      defaultStudentAction: "Apply each lesson's concept to the team purpose, rules, policy or pre-launch watchlist; do not trade during Unit 1.",
      requiredEvidence: "Roster, role record, completed rules quiz, team investment policy and individual Unit 1 checkpoint.",
      officialResources: ["program-guides/SMG_Advisor_Guide_2022.pdf", "high-school-lessons/00_Understanding_SMG_Grades_9-12.pdf", "rules-and-platform/SMG_National_Rules_Handout.pdf", "rules-and-platform/SMG_Rules_Quiz.pdf", "rules-and-platform/SMG_Team_Roles.pdf"]
    },
    {
      phase: 2,
      lessons: [9, 17],
      officialStage: "Selecting Your Investments",
      coursePurpose: "Compare investment choices, learn what shares and funds provide, test costs and diversification, then prepare the first evidence-backed order against the approved team plan.",
      defaultStudentAction: "Apply each lesson's investment-choice criteria to a paper portfolio or eligible candidate; no order is entered before the Lesson 17 launch gate.",
      requiredEvidence: "Investment-choice comparison, research worksheet, proposed allocation, proposal author, team decision and review trigger.",
      officialResources: ["program-guides/SMG_Essentials_Workbook.pdf", "high-school-lessons/04_Diversification_Grades_9-12.pdf", "high-school-lessons/05_Stock_Research_Guide_and_Worksheet.pdf", "high-school-lessons/06_What_Is_Risk_Grades_9-12.pdf", "rules-and-platform/SMG_How_to_Trade_Stocks.pdf"]
    },
    {
      phase: 3,
      lessons: [18, 26],
      officialStage: "Selecting and Tracking Your Investments",
      coursePurpose: "Use the live team portfolio to understand issuance, exchanges, order entry, quotes, price change, return, benchmarks and market information.",
      defaultStudentAction: "Apply each lesson's market concept to a platform page, transaction, price move, return or benchmark result.",
      requiredEvidence: "Platform-page annotation, transaction check, dated price or news evidence, benchmark comparison and one limitation.",
      officialResources: ["student-handouts/SMG_Understanding_Stock_Quotes.pdf", "high-school-lessons/03_Ticker_Symbols_and_Stock_Quotes_Grades_9-12.pdf", "high-school-lessons/07_What_Causes_Stock_Prices_to_Change_Grades_9-12.pdf", "rules-and-platform/SMG_Portfolio_Rankings_Guide.pdf"]
    },
    {
      phase: 4,
      lessons: [27, 35],
      officialStage: "Tracking Your Investments",
      coursePurpose: "Apply ethical company analysis to one holding or watchlist candidate and replace unsupported portfolio stories with dated business and financial evidence.",
      defaultStudentAction: "Apply each lesson's company-analysis method to one holding or watchlist candidate and record what would maintain or change the team decision.",
      requiredEvidence: "Source log, company evidence note, risk or valuation caveat and junior analyst memo linked to a holding or candidate.",
      officialResources: ["high-school-lessons/05_Stock_Research_Guide_and_Worksheet.pdf", "high-school-lessons/08_Buy_Sell_or_Hold_Grades_9-12.pdf"]
    },
    {
      phase: 5,
      lessons: [36, 43],
      officialStage: "Tracking Your Investments",
      coursePurpose: "Review allocation, concentration, currency exposure, remaining risk, rebalancing, monitoring triggers and behavioural mistakes using the active portfolio.",
      defaultStudentAction: "Apply each lesson's portfolio method to current allocation, benchmark and evidence, then choose hold, research, trade, rebalance or no action under the course rules.",
      requiredEvidence: "Cumulative portfolio review, weights, benchmark, risk check, decision, evidence owner and review trigger.",
      officialResources: ["program-guides/SMG_Essentials_Workbook.pdf", "high-school-lessons/08_Buy_Sell_or_Hold_Grades_9-12.pdf", "rules-and-platform/SMG_Portfolio_Rankings_Guide.pdf"]
    },
    {
      phase: 6,
      lessons: [44, 50],
      officialStage: "Reflections",
      coursePurpose: "Evaluate the strategy rather than celebrate rank, connect results to long-horizon family goals and defend a final evidence-based portfolio judgement.",
      defaultStudentAction: "Apply each lesson's family-decision, safety or career concept to the portfolio and add evidence to the final team evaluation and individual reflection.",
      requiredEvidence: "Final portfolio evaluation, benchmark-aware reflection, team presentation and an individual account of contribution and changed thinking.",
      officialResources: ["high-school-lessons/09_Investment_Strategy_Reflection_Grades_9-12.pdf", "program-guides/SMG_Essentials_Workbook.pdf"]
    }
  ];

  const stockMarketGameMilestones = {
    8: "Submit the Unit 1 investment policy and individual goal-horizon-risk decision charter; no order is entered.",
    17: "Submit the Unit 2 investment-choice memo, approve the proposed allocation and complete the first qualifying teacher-approved order.",
    26: "Submit the Unit 3 market-evidence memo using transaction, quote, return and benchmark evidence.",
    35: "Submit the Unit 4 junior analyst memo connected to one holding or watchlist candidate.",
    43: "Submit the Unit 5 portfolio review and evidence-based rebalance or no-rebalance decision.",
    50: "Submit the Unit 6 final portfolio evaluation and an individual reflection proving participation, evidence use and changed judgement."
  };

  const stockMarketGameEvidenceCheckpoints = {
    1: "Create teams, roster every student, assign the first roles and open individual evidence records.",
    3: "Read the live national and local rules, complete the official rules quiz and sign the long-only participation agreement.",
    7: "Set the team's risk-tolerance and risk-capacity limits without selecting a security.",
    15: "Audit the proposed paper portfolio for company, sector and geographic concentration.",
    21: "Annotate one eligible security's quote page before any later order is considered.",
    25: "Compare team performance with the applicable benchmark without treating rank as proof of decision quality.",
    36: "Record the portfolio's current asset allocation and compare it with the approved team plan.",
    41: "Complete a formal rebalance check using target weights, transaction costs and evidence.",
    48: "Re-check current national and local rules, account security and unsafe-offer boundaries before the final portfolio period."
  };

  const stockMarketGameLessonActions = {
    1: "Form the SMG team, choose a shared long-horizon purpose, assign the first roles and open the team and individual evidence records.",
    2: "Turn the team purpose into explicit goal, time-horizon and liquidity rules that will govern later portfolio decisions.",
    3: "Classify proposed team actions as saving, investing or speculation, complete the official rules quiz and sign the course's long-only participation agreement.",
    4: "Use a frozen contribution-and-return scenario to project how the team's starting capital could compound, then label every assumption and limitation.",
    5: "Calculate the approximate real return of a frozen portfolio or benchmark scenario and explain the effect on the team's purchasing-power goal.",
    6: "Place one watchlist candidate and the team's cash position on a risk-possible-return map, including one downside that the map cannot quantify.",
    7: "Set team risk-tolerance and risk-capacity limits, complete the official rules check and record which investment-choice evidence must be learned before any order.",
    8: "Approve the team investment policy, permitted-choice boundaries and pre-launch research plan; do not select or purchase a security.",
    9: "Set and justify the proposed portfolio's cash reserve by explaining which money should remain liquid rather than being invested immediately.",
    10: "Compare the portfolio with a teacher-frozen bond alternative; if the platform does not permit that bond, record the comparison as a paper allocation rather than a trade.",
    11: "Explain what ownership of one eligible watchlist share would give the team and what it would not give; no order is entered.",
    12: "Test whether an eligible fund or teacher-frozen ETF candidate would broaden the proposed portfolio's exposures, then identify one risk that remains.",
    13: "Compare an index-tracking and actively managed fund candidate by objective, benchmark, cost, holdings and evidence quality.",
    14: "Use the current platform or local fee schedule to calculate how transaction or fund costs would affect one proposed portfolio action.",
    15: "Audit the proposed paper portfolio by company, sector and geography, then improve its diversification before launch.",
    16: "Model regular contributions versus one lump-sum contribution in a side scenario and state why this projection is not a promised platform result.",
    17: "Complete the formal portfolio-fit review, approve the first evidence-backed proposal and then complete the qualifying long stock purchase when the teacher opens the launch gate.",
    18: "Use a dated filing or official company source to explain why one holding or watchlist company issued shares and what the issue financed.",
    19: "Classify one team transaction as a secondary-market trade and contrast it with the company's primary-market issuance.",
    20: "Trace one order from proposal through submission, execution and settlement, recording the actual platform status at each available stage.",
    21: "Annotate the quote page for one eligible security before any new order is approved, including price, change, volume and time stamp.",
    22: "Explain one material price move in a holding or watchlist candidate using dated evidence, an alternative explanation and one limitation.",
    23: "Compare market capitalisation and share price for two eligible candidates and correct the claim that the lower-priced share is the cheaper company.",
    24: "Calculate total return for one holding or frozen candidate, including distributions where relevant, and distinguish it from price return.",
    25: "Compare the team's return with the applicable platform benchmark over the same period and explain why rank does not prove decision quality.",
    26: "Audit one market-news item used by the team for source quality, date, material evidence, uncertainty and possible conflict.",
    27: "Apply the course ethics and conflict check to a team source, recommendation or proposed action before it enters the evidence record.",
    28: "Write a concise business-model note for one holding or watchlist candidate: customer, value offered, revenue driver and main vulnerability.",
    29: "Extract one revenue, cost and profit trend from a holding or candidate's income statement and state how it affects the team judgement.",
    30: "Use balance-sheet evidence to assess one holding or candidate's liquidity, debt or financial resilience without relying on a single ratio.",
    31: "Compare profit with operating cash flow for one holding or candidate and record why the difference matters to the portfolio decision.",
    32: "Compare one holding or candidate with a relevant peer using the same dated measures and explain one limit of the comparison.",
    33: "Add two qualitative risks and one disconfirming indicator to the monitoring record for a holding or watchlist candidate.",
    34: "Make a cautious valuation judgement for one holding or candidate using at least one comparison measure, assumptions and an explicit caveat.",
    35: "Submit the junior analyst memo on one SMG holding or watchlist candidate and connect its evidence to a hold, research, trade or no-trade decision.",
    36: "Calculate the live portfolio's asset and security weights and compare them with the approved team policy.",
    37: "Identify the portfolio's largest company, sector and factor concentrations and decide which concentration is most avoidable.",
    38: "Map the geographic and currency exposures behind the portfolio's listings, revenues or funds and identify one mismatch with the team goal.",
    39: "Separate company-specific risks from market-wide risks in the portfolio and explain which risks diversification cannot remove.",
    40: "Compare a current share holding, an eligible fund and a teacher-frozen bond alternative against the same team objective and constraints.",
    41: "Complete the formal rebalance decision using current weights, target ranges, transaction costs, dated evidence and a justified action or no action.",
    42: "Build the team's monitoring dashboard with benchmark, cash, weights, decision thesis, disconfirming evidence and dated review triggers.",
    43: "Audit one team decision for FOMO, recency bias or performance chasing and revise the decision process before any related order.",
    44: "Stress-test the current portfolio against a mock education goal and state which holding, risk or liquidity feature would need reconsideration.",
    45: "Stress-test the current portfolio against a near-term house-deposit goal and explain why the same allocation may become unsuitable.",
    46: "Stress-test the current portfolio against a long-horizon retirement goal and identify which evidence supports or weakens its suitability.",
    47: "Apply a mock windfall to the team strategy, choosing an immediate, staged or no-investment action with a decision pause and evidence plan.",
    48: "Re-check live national and local rules, account security and unsafe-offer red flags before the final portfolio period.",
    49: "Map the team's research, portfolio, compliance, data-entry and reporting work to real investment careers and their ethical responsibilities.",
    50: "Defend the final portfolio against its goal and benchmark, evaluate the decision process and submit an individual reflection on contribution and changed judgement."
  };

  const stockMarketGameWorkbookSessions = [
    { session: 1, title: "Intro to Investing", pages: [4, 8], courseLessons: [1, 3], courseUse: "Goals, saving versus investing, reflection and team roles." },
    { session: 2, title: "Intro to Companies & Stocks", pages: [9, 14], courseLessons: [11, 11], courseUse: "Company-share foundations and public-company identification after the team policy is complete." },
    { session: 3, title: "Building Your Portfolio", pages: [15, 19], courseLessons: [17, 17], courseUse: "Investment-choice review, proposed allocation and the first qualifying order at the launch gate." },
    { session: 4, title: "Conducting Research", pages: [20, 24], courseLessons: [21, 21], courseUse: "Candidate research and quote-page annotation after students have learned shares, funds, costs and diversification." },
    { session: 5, title: "Assessing Risk", pages: [25, 28], courseLessons: [6, 7], courseUse: "Risk, risk tolerance and risk capacity before any security is selected." },
    { session: 6, title: "Diversification", pages: [29, 36], courseLessons: [12, 15], courseUse: "Funds, costs, sectors, diversification and a controlled fund proposal." },
    { session: 7, title: "Market Analysis", pages: [37, 40], courseLessons: [22, 29], courseUse: "Price-moving information, earnings evidence and source limitations." },
    { session: 8, title: "Asset Allocation", pages: [41, 45], courseLessons: [10, 40], courseUse: "Bond structure, goal fit and later cross-asset comparison." },
    { session: 9, title: "Portfolio Evaluation", pages: [46, 48], courseLessons: [29, 35], courseUse: "Annual-report evidence and the company-analysis portfolio implication." },
    { session: 10, title: "Wrap Up & Reflection", pages: [49, 55], courseLessons: [49, 50], courseUse: "Benchmark-aware evaluation, team presentation and individual reflection." }
  ];

  const stockMarketGameWorkbookLessonPlan = {
    1: { pages: "1-3 and 8", action: "Set up the personal workbook, record only the team ID or username, assign roles and complete the opening orientation.", treatment: "complete" },
    2: { pages: "5-6", action: "Complete the short- and long-term goal tables; add liquidity need beside each goal.", treatment: "complete with course addition" },
    3: { pages: "4 and 7", action: "Use the introduction and reflection to distinguish saving, investing and speculation for the stated goals.", treatment: "complete" },
    6: { pages: "25-26", action: "Complete the risk introduction and distinguish possible return from guaranteed return; no security is selected.", treatment: "complete with course boundary" },
    7: { pages: "27-28", action: "Separate willingness to take risk from financial ability to withstand loss and record the team's pre-launch risk limits.", treatment: "complete with course addition" },
    10: { pages: "41-45", action: "Complete the bond comparison as a paper allocation unless current platform, local and course rules permit an approved order.", treatment: "complete with trade override" },
    11: { pages: "9-14", action: "Complete the company-and-stock pages and correct what owning one share gives and does not give before any order is entered.", treatment: "complete with course correction" },
    12: { pages: "33-35", action: "Complete the mutual-fund quote and holdings investigation, adding objective, cost and one remaining concentration risk.", treatment: "complete with course addition" },
    13: { pages: "36", action: "Replace the automatic mutual-fund trade with a compare, research, hold, propose or no-trade decision supported by evidence.", treatment: "complete with trade override" },
    14: { pages: "34-36", action: "Revisit the fund evidence and calculate how the stated expense ratio affects the proposed holding.", treatment: "revisit with calculation" },
    15: { pages: "29-32", action: "Complete the sector map and portfolio circle, then test company, sector and geographic concentration rather than counting holdings.", treatment: "complete with course addition" },
    17: { pages: "15-19 and 24", action: "Complete the proposed allocation, test it against the approved goal and limits, then treat any buy instruction as submission to the Lesson 17 approval gate.", treatment: "complete with trade override" },
    21: { pages: "20-23", action: "Complete the research and quote pages and annotate one live or frozen eligible-security quote before any later order is considered.", treatment: "complete with course addition" },
    22: { pages: "37 and 40", action: "Use the market-analysis opener and current-events reflection to explain one price move with an alternative explanation and limitation.", treatment: "complete" },
    26: { pages: "40", action: "Audit the source, date, material claim, uncertainty and possible conflict behind the completed current-events reflection.", treatment: "revisit" },
    29: { pages: "38-39 and 46-47", action: "Use earnings and annual-report evidence for one holding or candidate; do not treat an analyst estimate or one ratio as a decision by itself.", treatment: "complete with course addition" },
    35: { pages: "47-48", action: "Convert buy, sell or hold into an evidence-based portfolio implication: hold, research, trade or no trade, with a caveat and review trigger.", treatment: "revisit with trade override" },
    36: { pages: "32 and 44-45", action: "Revisit the workbook allocation and compare it with the live portfolio's actual asset and security weights.", treatment: "revisit" },
    40: { pages: "41-45", action: "Revisit bonds beside a current share holding and eligible fund using the same goal, risk, liquidity, cost and evidence criteria.", treatment: "revisit" },
    49: { pages: "54", action: "Use the additional-assessment menu to select evidence for the final presentation; do not add a second project.", treatment: "extension menu" },
    50: { pages: "49-53 and 55", action: "Complete the final benchmark-aware evaluation, team presentation and individual reflection; judge the process, not the ranking.", treatment: "complete" }
  };

  const stockMarketGameWorkbookRules = [
    "The complete SMG Essentials Workbook is issued to every student and remains the default individual paper record for the full course.",
    "Workbook pages are completed or revisited at the lesson shown in the course page calendar, not necessarily in numerical page or session order.",
    "Any workbook instruction to buy, purchase or enter a trade means propose buy, hold, research, sell, rebalance or no trade; an order is entered only after the course approval gate is met.",
    "A workbook answer does not authorise a transaction. The shared team decision log is the authoritative decision, evidence and platform-status record.",
    "When a workbook activity overlaps the lesson task, use the workbook and do not generate a duplicate worksheet. Generate one separately labelled activity insert only for evidence, calculation or judgement that the workbook cannot hold.",
    "Add dated evidence, one material fact, one limitation, plan fit and a review trigger whenever the workbook does not request them explicitly.",
    "Portfolio rank and raw return carry no marks; compare the appropriate benchmark and assess evidence, reasoning, participation, rule compliance and reflection.",
    "Students may record a team ID or username in the workbook but must never record a password."
  ];

  const stockMarketGameWorkbookRulesZh = [
    "每位学生领取完整的《SMG Essentials Workbook》，并把它作为全课程默认的个人纸质学习记录。",
    "按照课程页码安排完成或重做练习册内容，不必按页码或单元顺序从头做到尾。",
    "练习册中任何“买入”“购买”或“提交交易”的指令，都应理解为提出买入、持有、继续研究、卖出、再平衡或不交易的建议；只有通过课程审批关卡后才能下单。",
    "练习册答案不能授权交易。共享团队决策日志才是证据、决策和平台状态的正式记录。",
    "练习册活动与课堂任务重合时，不再生成重复练习单；只有在练习册无法容纳必要证据、计算或判断时，才使用一页简短补充单。",
    "若练习册没有明确要求，应补充带日期的证据、一个重要事实、一个局限、与团队计划的匹配以及复查条件。",
    "投资组合排名和原始收益不计分；应比较适用基准，并评估证据、推理、参与、规则遵守和反思。",
    "学生可以记录团队编号或用户名，但绝不能在练习册中记录密码。"
  ];

  function getStockMarketGameWorkbookUse(lesson) {
    const planned = stockMarketGameWorkbookLessonPlan[lesson];
    if (planned) {
      return {
        hasAssignedPages: true,
        pages: planned.pages,
        treatment: planned.treatment,
        studentAction: planned.action,
        individualRecord: "Complete the assigned workbook pages and the lesson's individual exit judgement.",
        supplementRule: "Use at most one separately labelled activity insert for required evidence or judgement that the assigned workbook pages cannot hold; do not reproduce the workbook activity."
      };
    }
    return {
      hasAssignedPages: false,
      pages: "No new workbook pages",
      treatment: "activity insert",
      studentAction: "Keep the workbook as the permanent course record and complete only the separately labelled lesson activity insert; do not add a duplicate general worksheet.",
      individualRecord: "Complete the lesson's individual activity insert and file it with the workbook.",
      supplementRule: "The insert must contain only the lesson-specific evidence, calculation or judgement missing from the official workbook."
    };
  }

  function getStockMarketGameLessonIntegration(lesson) {
    const phase = stockMarketGamePhases.find(function findPhase(item) {
      return lesson >= item.lessons[0] && lesson <= item.lessons[1];
    });
    const milestone = Boolean(stockMarketGameMilestones[lesson]);
    const evidenceCheckpoint = Boolean(stockMarketGameEvidenceCheckpoints[lesson]);
    const workbook = getStockMarketGameWorkbookUse(lesson);
    return {
      required: true,
      central: true,
      phase: phase.phase,
      officialStage: phase.officialStage,
      studentAction: stockMarketGameLessonActions[lesson],
      requiredEvidence: phase.requiredEvidence,
      officialResources: phase.officialResources,
      milestone: milestone,
      evidenceCheckpoint: evidenceCheckpoint,
      integrationLevel: milestone ? "summative unit output" : (evidenceCheckpoint ? "formative evidence checkpoint" : "required formative course lab"),
      lessonUse: "Use as the lesson's main application and evidence task. Complete the assigned official workbook pages when present; otherwise use one separately labelled activity insert. Never append a duplicate worksheet.",
      requiredOutput: workbook.individualRecord + " Add one authoritative team decision-log row when the lesson produces a team decision or monitoring update.",
      workbook: workbook,
      dataRule: "Use a portfolio, watchlist, transaction, quote or benchmark snapshot captured at the start of the lesson so the task remains stable while the platform continues to move."
    };
  }

  function lessonFromSpec(spec, index) {
    const lesson = index + 1;
    const unit = getUnit(lesson);
    const stockMarketGame = getStockMarketGameLessonIntegration(lesson);
    const terms = getTerms(spec.terms);
    const retrievalBase = lesson === 1
      ? "Everyday understanding of future goals, waiting, uncertainty and familiar investment claims."
      : "Retrieve the prior lesson's core claim and the cumulative goal-horizon-risk-evidence decision chain.";
    const studentOutput = spec.output.replace(/[.]?$/, ".");
    const actionSentence = "Use the evidence to choose consider, watch, avoid, compare or gather more evidence for the mock case, unless the lesson specifies a narrower planning action.";
    const groundedScenario = {
      requirement: "Use a short scenario in the projected lesson or workbook activity that combines real, dated evidence with a clearly labelled mock or anonymised decision.",
      realEvidence: "Use at least one source-backed figure or statement with its source title and evidence date.",
      fictionalFrame: "Label every invented amount, profile detail or decision as mock, hypothetical or anonymised.",
      lessonUse: "Reuse the same scenario evidence in the lesson task: " + spec.task + " Then use it again in the individual output: " + studentOutput,
      limitation: "State what the real evidence cannot show about the mock profile or future investment result."
    };
    const misconceptionCorrection = "The claim '" + spec.naive + "' is incorrect. Use this principle instead: " + spec.core;
    const revisionPoints = [
      spec.core,
      "Evidence to check: " + spec.need.replace(/^Students need\s+/i, ""),
      "Formula or relationship: " + spec.formula,
      "Exam correction: " + misconceptionCorrection
    ];
    const handoutSections = [
      {
        key: "definitions",
        title: "Key definitions / 核心定义",
        content: terms.map(function mapDefinition(term) { return { term: term.term, termZh: term.zh, definition: term.definition }; }),
        bilingual: true,
        fillInTheBlanks: true,
        translationRule: "Generate a complete Simplified Chinese definition and select only English key words taught during the lesson as blanks."
      },
      {
        key: "numberedRevisionPoints",
        title: "Numbered revision points / 编号复习要点",
        content: revisionPoints,
        bilingual: true,
        translationRule: "Render every English revision point with a faithful Simplified Chinese partner sentence."
      }
    ];
    const handoutBlocks = handoutSections.map(function mapSection(section) {
      return { key: section.key, title: section.title, content: section.content, bilingual: section.bilingual, fillInTheBlanks: Boolean(section.fillInTheBlanks), translationRule: section.translationRule, studentUse: section.fillInTheBlanks ? "Complete selected English key terms during the lesson, then use the answer toggle to check exact wording." : "Memorise the bilingual numbered statements for exam revision." };
    });
    const decisionFirst = {
      starterDilemma: spec.hook,
      firstJudgementPrompt: "Make a first judgement about " + spec.anchor + " and give one reason before the key idea is taught.",
      likelyNaiveAnswer: spec.naive,
      missingEvidence: spec.need,
      keyIdea: spec.core,
      tryIt: spec.task,
      misconceptionCheck: "Correct the claim: " + spec.naive,
      exitJudgement: studentOutput
    };
    const simpleFlow = [
      { label: "Hook", text: spec.hook },
      { label: "Key idea", text: spec.core },
      { label: "Try it", text: spec.task },
      { label: "Decide", text: studentOutput }
    ];

    return {
      lesson: lesson,
      semester: unit.semester,
      unit: unit.unit,
      unitTitle: unit.title,
      caseAnchor: spec.anchor,
      company: spec.anchor,
      caseRole: spec.role,
      guidingQuestion: spec.q,
      guidingQuestionZh: spec.zh,
      studentHook: spec.hook,
      judgementFocus: spec.anchor + " investment decision",
      sequenceRole: "Lesson " + lesson + " in Unit " + unit.unit + ": " + unit.title + ".",
      retrievalBase: retrievalBase,
      newKnowledge: spec.core,
      evidenceTask: spec.task,
      avoidOverlap: spec.avoid,
      misconception: spec.naive,
      studentOutput: studentOutput,
      stockMarketGame: stockMarketGame,
      futureReuse: unitReuse[unit.unit],
      focus: "Focus: " + spec.q + " Case anchor: " + spec.anchor + ".",
      objectives: [
        "Define and use " + terms.map(function termName(item) { return item.term; }).join(", ") + ".",
        spec.task,
        studentOutput
      ],
      terms: terms,
      formulaOrNoFormula: spec.formula,
      evidenceSummary: sourceTypes(spec).join("; ") + ".",
      check: "Students can use the lesson evidence and terms to improve the first judgement and complete the stated output.",
      coreClaim: spec.core,
      decisionFirst: decisionFirst,
      simpleFlow: simpleFlow,
      formativeAssessment: "First judgement, targeted retrieval, required SMG core lab, misconception correction and individual exit output.",
      exitTicket: studentOutput,
      groundedScenario: groundedScenario,
      handoutMaterial: "A bilingual exam-revision handout for " + spec.anchor + ": fill-in-the-blank English key definitions with complete Simplified Chinese support, followed by four to seven bilingual numbered knowledge points covering the taught principle, evidence relationship, formula or decision rule and misconception correction. Definition blanks are completed during the lesson and checked with the answer toggle. Do not include workbook directions, evidence tasks, extended response prompts, writing lines or an individual output.",
      handoutSections: handoutSections,
      writtenRecord: {
        primaryArtifact: stockMarketGame.workbook.hasAssignedPages ? "SMG Essentials Workbook" : "activity insert filed with the SMG Essentials Workbook",
        workbookPages: stockMarketGame.workbook.pages,
        workbookTreatment: stockMarketGame.workbook.treatment,
        workbookAction: stockMarketGame.workbook.studentAction,
        supplementRule: stockMarketGame.workbook.supplementRule,
        authoritativeTeamRecord: "The shared SMG team decision log is authoritative for evidence, decisions, dissent, order checks, platform status and review triggers.",
        individualOutput: studentOutput
      },
      primaryOutput: { type: "evidence-based-investment-decision", description: studentOutput },
      investmentAction: {
        studentAction: actionSentence,
        decisionRule: "The action must match the goal, horizon, risk, evidence strength, cost and missing information.",
        portfolioQuestion: "How would this evidence affect a suitable mock family or investor profile?",
        classroomOutput: studentOutput
      },
      retrievalPractice: {
        yesNo: { prompt: spec.naive, answer: "No. Use the lesson evidence and key idea to correct the claim." },
        multipleChoice: { prompt: "Which evidence would most improve the first judgement about " + spec.anchor + "?", answer: spec.need },
        matching: { prompt: "Match the lesson terms to their definitions and to one item in the case evidence." },
        sourceCheck: "Identify the source date, the figure or claim used and one limitation before judging."
      },
      analyseWhy: {
        question: "Analyse why the evidence in " + spec.anchor + " could change the initial investment judgement.",
        chain: ["dated evidence", "effect on goal, return, risk, price or fit", "reason the judgement changes", "qualified next action"]
      },
      worksheet: {
        evidenceAndDataAnalysis: {
          stimulus: "A short grounded " + spec.anchor + " scenario combining at least one dated, source-backed figure or statement with clearly labelled mock or anonymised details, plus the source title, evidence date and one stated limitation.",
          questions: [
            { command: "Identify", prompt: "Identify one relevant fact from the evidence pack." },
            { command: "Calculate or interpret", prompt: spec.formula },
            { command: "Explain", prompt: "Explain what one item of evidence can and cannot prove." },
            { command: "Analyse why", prompt: "Analyse why the evidence changes the first judgement." },
            { command: "Judge", prompt: studentOutput }
          ]
        }
      },
      sourcePack: {
        requiredSourceTypes: sourceTypes(spec),
        preferredSourceOrder: ["official issuer, company, exchange, regulator or professional source", "reputable dated market or education source", "teacher-frozen classroom snapshot with clear source notes"],
        snapshotDateFields: ["source title", "source URL or local path", "publication date", "accessed date", "figures date", "evidence limitation"],
        evidenceLimitations: ["The evidence is frozen for classroom use and is not live investment data.", "Historical evidence does not guarantee future return.", "The same evidence can lead to different actions for different goals and profiles."],
        noLivePriceDependency: true,
        sourceFitCheck: "Complete the source-fit audit before generating the deck, handout or exam item."
      },
      assessmentBlueprint: {
        commandWord: "Assess",
        marks: 8,
        stimulusType: "frozen " + spec.anchor + " evidence pack",
        calculationRequirement: spec.formula,
        judgementRequirement: studentOutput,
        mustAvoid: spec.avoid + " Do not reward unsupported personal advice."
      },
      examPattern: {
        checkpoint: unit.unit,
        itemType: "evidence, calculation or interpretation, analysis and judgement item",
        sourceRequirement: "Use a frozen " + spec.anchor + " source with title, date, accessed date and relevant figures or statements.",
        task: studentOutput,
        mustAssess: "Vocabulary, evidence interpretation, reasoning, limitation and a justified next action."
      },
      artifactBlueprint: {
        deckArc: [
          "Hook: " + spec.hook,
          "Retrieval: " + retrievalBase,
          "Teach: " + spec.core,
          "SMG core lab: " + stockMarketGame.studentAction,
          "Output rehearsal: improve the first judgement using the taught evidence.",
          "Individual exit ticket: " + studentOutput
        ],
        handoutBlocks: handoutBlocks,
        stockMarketGame: stockMarketGame,
        chapterOutput: "Use the definition-and-numbered-point lesson handout as the exam-revision chapter. Keep workbook directions, evidence tasks, calculations to complete and individual judgements in the workbook or a separately labelled activity insert; do not place them in the handout.",
        examItemShape: "Assess using a frozen evidence pack, one calculation or interpretation, an analyse-why chain and the lesson output."
      },
      cardGenerator: {
        retrievalBase: retrievalBase,
        newKnowledge: spec.core,
        avoidOverlap: spec.avoid,
        misconception: spec.naive,
        evidenceTask: spec.task,
        studentOutput: studentOutput,
        studentHook: spec.hook,
        firstJudgementPrompt: decisionFirst.firstJudgementPrompt,
        missingEvidence: spec.need,
        exitJudgement: studentOutput,
        stockMarketGame: stockMarketGame
      },
      publishedRoutes: lesson <= 2 ? {
        slides: "unit-1/lesson-" + lesson + "/index.html",
        quiz: "unit-1/lesson-" + lesson + "/index.html?view=quiz",
        handout: "unit-1/lesson-" + lesson + "/index.html?view=print"
      } : null,
      caseReview: {
        status: lesson <= 2 ? "published and source-verified" : "planned",
        sourceFit: "The case can be taught from frozen evidence without live-price dependence or personal account data.",
        reason: "The anchor supports the unit progression and an evidence-based investment decision."
      }
    };
  }

  const examCheckpoints = units.map(function mapCheckpoint(unit) {
    return {
      checkpoint: unit.unit,
      afterLesson: unit.lessons[1],
      title: unit.title + " checkpoint",
      coverage: "Lessons " + unit.lessons[0] + "-" + unit.lessons[1] + ": " + unit.summary,
      primaryOutput: unit.unitOutput
    };
  });

  const courseMap = {
    version: 10,
    syllabusKey: "financial-decisions",
    courseTitle: "Investment and Financial Decision-Making",
    mapTitle: "50-Lesson Personal Wealth, Markets and Analysis Course Map",
    currencyRule: "Use ISO currency codes that match the case: CNY for mainland China family scenarios, HKD for Hong Kong-listed securities or Hong Kong transactions, USD for United States cases, and the corresponding local or transaction currency for other countries. In Chinese support, name 人民币, 港元 or 美元 as appropriate.",
    courseIntroduction: "Investment is not simply choosing a stock. It begins with understanding what the money is for, when it will be needed, what risk can be accepted and which evidence is still missing. The Stock Market Game is the course's required laboratory: every lesson applies its investment concept to the team's policy, watchlist, portfolio, transactions, evidence or benchmark. Students learn to make informed investment decisions, contribute thoughtfully to family discussions, understand stock markets, analyse companies and portfolios, and explore the tools and responsibilities of finance professionals.",
    coursePromise: "Students move from family goal to investor profile, investment choice, market understanding, security analysis and portfolio decision. In every lesson they test that learning in a shared Stock Market Game portfolio and communicate a justified next action with evidence and limits.",
    stockMarketGameIntegration: {
      status: "required for every enrolled student",
      role: "core course laboratory and assessment spine",
      provider: "SIFMA Foundation",
      program: "The Stock Market Game",
      courseStart: "2026-09-01",
      session: "Use the registered 2026-2027 full-academic-year session and the exact dates displayed in the advisor account; official registration guidance says dates and competition conditions vary by program.",
      officialSequence: ["Understanding SMG", "Before You Invest", "Selecting Your Investments", "Tracking Your Investments", "Reflections"],
      nationalMinimum: "A team is not listed in rankings until it completes at least one successful buy or short-sell transaction. National rules require stock and mutual-fund buy orders and stock short-sell orders to contain at least 10 shares. This platform threshold is not sufficient evidence of individual course participation.",
      courseMinimum: "Every student must belong to exactly one team, understand the rules, rotate roles, contribute research and decisions, maintain individual evidence and complete a final reflection. Team rank or return never substitutes for this evidence.",
      teamModel: {
        recommendedSize: "3-5 students per portfolio where class numbers permit",
        rosterRule: "Roster every enrolled student on exactly one SMG portfolio and retain an advisor copy of the team list.",
        roles: ["Director", "Researcher", "Portfolio Coordinator", "Data Entry Coordinator", "Lead Reporter"],
        rotationRule: "Rotate roles every two course weeks. Teams with fewer than five students may combine roles, but the proposal author and order checker should be different students where team size permits; no rotation may expose team passwords."
      },
      launchGate: {
        timing: "At the end of Lesson 17, after students have completed the investment-choice foundations in Units 1 and 2.",
        readiness: ["Every student is rostered.", "National and local rules have been read.", "The official rules quiz is complete.", "The team investment policy is approved.", "Students can explain shares and funds, compare costs and identify concentration risk.", "The proposed allocation fits the goal, horizon, liquidity need and risk limits.", "A dated research note supports the proposed order."],
        qualifyingAction: "Complete one successful teacher-approved long stock buy of at least 10 shares, subject to any stricter local rule. Every student records their contribution to the team proposal."
      },
      classroomRules: [
        "Long-only: no short selling, short covering or strategy tasks based on profiting from price falls.",
        "No margin or borrowing, even if the platform account displays buying power above the starting cash balance.",
        "No order without a dated evidence record, named proposal author, team decision, decision reason and review trigger.",
        "Check the live national rules and the advisor account's local rules before the first order and again before the final portfolio period; the stricter rule governs.",
        "Keep team credentials private and enter orders only through the assigned Data Entry Coordinator under teacher supervision.",
        "Do not grade rank, raw return or a single winning trade; assess research, reasoning, rule compliance, collaboration, monitoring and reflection."
      ],
      lessonRoutine: [
        "Capture the portfolio, watchlist, transaction, quote or benchmark snapshot needed for the lesson.",
        "Apply the lesson's concept to a real team decision, holding, candidate, platform process or portfolio result.",
        "Choose hold, research, trade, rebalance or no action when the evidence calls for a decision.",
        "Add one concise team evidence row and complete the individual exit judgement."
      ],
      operatingModel: {
        lessonTimeShare: "Allocate roughly 35-50% of every lesson to the SMG core lab; scale the exact minutes to the timetable and give milestone lessons the larger share.",
        integrationRule: "The SMG core lab is the lesson's main application and evidence task. The complete official workbook is the default individual work record; assigned workbook pages replace compatible generic practice, and only missing course evidence receives a separately labelled activity insert.",
        lessonEvidenceCadence: "Every lesson produces an individual workbook entry or activity insert. A team decision-log row is added whenever the lesson produces a team decision or monitoring update; the six unit outputs curate this evidence rather than asking students to reproduce it.",
        summativeCadence: "Only the six unit outputs are summative. All other SMG work, including named evidence checkpoints, is formative and builds the same portfolio evidence trail.",
        individualEvidenceCadence: "Every student contributes through rotating roles and an individual exit judgement in every lesson, then curates one personal checkpoint per unit plus the final reflection.",
        tradingCadence: "After the required first qualifying purchase, there is no trade quota. A justified hold or no-trade decision counts equally when evidence or portfolio fit does not support action.",
        workloadRule: "SMG work is the application layer of the course, not a second parallel homework course. Never assign the official workbook activity and a duplicate six-block worksheet; use an activity insert only for missing course evidence.",
        snapshotRule: "Capture the required platform evidence at the start of the lesson and use that frozen snapshot for teaching, writing and assessment so live price movement cannot destabilise the task."
      },
      workbook: {
        title: "SMG Essentials Workbook",
        file: "investment-analysis/references/stock-market-game/program-guides/SMG_Essentials_Workbook.pdf",
        pages: 55,
        distribution: "Print and issue the complete workbook to every student at the start of the course.",
        role: "Default individual paper record for the full course; students complete or revisit pages according to the course calendar rather than workbook order.",
        courseRules: stockMarketGameWorkbookRules,
        courseRulesZh: stockMarketGameWorkbookRulesZh,
        sessions: stockMarketGameWorkbookSessions,
        lessonPlan: stockMarketGameWorkbookLessonPlan,
        studentGuide: "investment-analysis/smg-workbook-course-guide.html",
        teamLog: "investment-analysis/smg-team-evidence-log.html"
      },
      decisionLogFields: [
        { key: "date", label: "Decision date", requirement: "Use the date the evidence was reviewed." },
        { key: "student", label: "Student and role", requirement: "Name the responsible student and current team role." },
        { key: "evidence", label: "Dated evidence", requirement: "Record source, date, one material figure or claim and one limitation." },
        { key: "proposal", label: "Proposed action", requirement: "Choose hold, research, buy, sell, rebalance or no trade." },
        { key: "fit", label: "Plan and risk fit", requirement: "Explain how the proposal fits the team goal, horizon, risk limits and course rules." },
        { key: "teamDecision", label: "Team decision", requirement: "Record the decision, dissent if material and the student who checked the order." },
        { key: "platformResult", label: "Platform result", requirement: "Record not entered, pending, executed or rejected; never treat submission as execution." },
        { key: "reviewTrigger", label: "Review trigger", requirement: "State the date, evidence or threshold that requires reconsideration." }
      ],
      unitEvidence: [
        { unit: 1, lessons: [1, 8], title: "SMG investment policy", teamEvidence: "Roster, role schedule, rules check, goal-horizon-risk rules, permitted-choice boundaries and the approved investment policy; no trade is entered.", individualEvidence: "Curate the strongest Unit 1 exit judgements into a personal goal-horizon-risk decision charter.", assessmentUse: "This is the Personal Investment Foundations unit output." },
        { unit: 2, lessons: [9, 17], title: "SMG portfolio construction", teamEvidence: "Cash rule, investment-choice comparisons, cost check, diversification audit, formal portfolio-fit review and the first approved qualifying order.", individualEvidence: "Defend one chosen investment criterion and one rejected portfolio alternative using the lesson evidence trail.", assessmentUse: "This is the SMG portfolio-construction and investment-choice memo." },
        { unit: 3, lessons: [18, 26], title: "SMG market evidence", teamEvidence: "Issuance note, transaction trace, quote annotation, price explanation, return calculation and benchmark comparison.", individualEvidence: "Explain one transaction, price or return judgement with dated evidence and a limitation.", assessmentUse: "This is the SMG transaction, quote, return and benchmark evidence memo." },
        { unit: 4, lessons: [27, 35], title: "SMG company analysis", teamEvidence: "Ethics check, source log, business model, statements, peer comparison, risks and valuation evidence for a holding or candidate.", individualEvidence: "Author or critically review one balanced company judgement and its portfolio implication.", assessmentUse: "This is the junior company-analysis memo on an SMG holding or watchlist candidate." },
        { unit: 5, lessons: [36, 43], title: "SMG portfolio review", teamEvidence: "Weights, concentration, geographic and currency exposure, remaining risk, alternatives, rebalance, dashboard and behaviour audit.", individualEvidence: "Defend the rebalance or no-rebalance decision and specify a dated review trigger.", assessmentUse: "This is the SMG portfolio review and evidence-based rebalance decision." },
        { unit: 6, lessons: [44, 50], title: "SMG final evaluation", teamEvidence: "Three goal stress tests, windfall decision, rules and security re-check, career reflection and final benchmark-aware portfolio defence.", individualEvidence: "Explain personal contribution, one changed judgement and one process improvement using evidence from the year.", assessmentUse: "This is the final SMG portfolio evaluation linked to a family strategy and team presentation; InvestWrite may be offered separately but is not required." }
      ],
      individualParticipationEvidence: [
        "Completed rules quiz and signed course participation agreement.",
        "Role-rotation record showing meaningful work in more than one role.",
        "One dated individual exit judgement from every lesson, curated into one checkpoint in each of the six units.",
        "At least one authored investment proposal and one authored monitoring or no-trade note.",
        "Final individual reflection explaining contribution, evidence use, benchmark-aware results and one judgement that changed."
      ],
      assessmentRule: "SMG evidence is the required application evidence for every lesson and the assessment spine for all six unit outputs. Scores reward evidence quality, concept use, decision reasoning, monitoring, rule compliance and reflection, not portfolio rank or short-term return.",
      officialResourceDirectory: "investment-analysis/references/stock-market-game/README.md",
      officialResourceManifest: "investment-analysis/references/stock-market-game/official-sources.json",
      implementationGuide: "investment-analysis/stock-market-game-integration.md",
      phases: stockMarketGamePhases
    },
    writtenArtifactRule: "The complete SMG Essentials Workbook is the default individual work record. Assigned workbook pages replace overlapping lesson worksheets. When the workbook cannot hold required dated evidence, calculation or judgement, generate one separately labelled activity insert and file it with the workbook. Lesson handouts are bilingual exam-revision sheets containing in-lesson definition blanks and numbered knowledge points, never extended tasks or response spaces. The shared team decision log remains the authoritative evidence and transaction record.",
    groundedScenarioContract: {
      rule: "Every lesson uses a short grounded scenario in the deck, workbook activity or separately labelled activity insert when the assigned workbook pages do not already hold the required evidence task.",
      realEvidence: "Include at least one dated, source-backed figure or statement that materially informs the student task.",
      fictionalFrame: "Mock or anonymised family, investor and company details are allowed only when clearly labelled and separated from the real evidence.",
      lessonUse: "Reuse the same scenario and evidence in at least one projected lesson activity and in the workbook or activity insert; do not move the task into the content-only handout.",
      limitation: "State what the source-backed evidence cannot prove about the mock case or future outcome."
    },
    definitionOverview: {
      source: "investment-analysis/course-map-financial-decisions-data.js",
      archivedCompanyAnalysisSource: "references/investment-analysis-definitions.md",
      studentPage: "investment-analysis/definitions.html",
      rule: "Generate the active definition page from each lesson's canonical terms. Reuse archived source matches only as cross-references; never let the archived company-analysis glossary replace active course wording."
    },
    handoutContract: [
      { key: "definitions", title: "Key definitions / 核心定义", requirement: "Print every new term bilingually. Use targeted English fill-in-the-blank key words answerable during the lesson, preserve the exact answers for the toggle and provide the complete Simplified Chinese definition." },
      { key: "numberedRevisionPoints", title: "Numbered revision points / 编号复习要点", requirement: "Give four to seven short, complete, examinable English statements, each followed by faithful Simplified Chinese. Cover the core principle, important relationship, formula or decision rule and misconception correction." }
    ],
    textbookAssembly: {
      source: "Bilingual definition-and-numbered-point lesson handouts",
      rule: "The lesson handouts may be compiled verbatim as a bilingual course revision handbook. Do not add textbook-only chapters, workbook directions, case tasks, extended questions, response spaces or model activities.",
      sections: ["Unit dividers", "Lesson questions", "Bilingual fill-in definitions", "Bilingual numbered revision points"]
    },
    generatorAccess: {
      canonicalSource: "investment-analysis/course-map-financial-decisions-data.js",
      contextModule: "investment-analysis/generator-context.js",
      cli: "node scripts/export-investment-generator-context.js --syllabus financial-decisions --lesson <1-50> --target lesson",
      targets: [
        { key: "lesson", purpose: "Full lesson-planning context.", use: "Load before writing a deck, notes or source task." },
        { key: "deck", purpose: "Slide-deck contract.", use: "Use the decision-first fields, deck arc, retrieval, formative assessment and exit output." },
        { key: "handout", purpose: "Bilingual exam-revision handout contract.", use: "Generate targeted English definition blanks with complete Chinese definitions and four to seven bilingual numbered knowledge points; exclude workbook directions, extended activities and response spaces." },
        { key: "activity-insert", purpose: "One-page lesson work record when the official workbook has no suitable pages.", use: "Generate only the frozen evidence, calculation or judgement missing from the workbook; file the completed insert with the student's workbook." },
        { key: "quiz", purpose: "Follow-up retrieval contract.", use: "Retrieve the lesson terms, misconception, formula or decision rule and exit judgement." },
        { key: "exam", purpose: "Unit-checkpoint item contract.", use: "Use the source pack and assessment blueprint." },
        { key: "textbook", purpose: "Compiled knowledge-handbook contract.", use: "Compile the content-only lesson handouts verbatim with light unit navigation; keep all student work in the workbook or activity inserts." }
      ],
      rules: [
        "Treat this file as the canonical Investment and Financial Decision-Making syllabus.",
        "Preserve the progression family goal -> investor profile -> investment choice -> market understanding -> security analysis -> portfolio decision.",
        "Build every lesson around a first judgement, missing evidence, one focused key idea, an evidence task, misconception correction and a justified next action.",
        "Keep every handout exam-revision focused and bilingual: targeted English definition blanks with complete Simplified Chinese definitions, followed by four to seven bilingual numbered knowledge points; exclude scenarios to analyse, extended activities and response spaces.",
        "Use every lesson's stockMarketGame field as the main application and evidence task. Only the six unit outputs are summative; all other lesson labs and evidence checkpoints are required formative work that builds the same portfolio evidence trail.",
        "Issue the complete SMG Essentials Workbook to every student. Follow the course page calendar rather than workbook order, and apply the printed course overrides to every automatic trade instruction.",
        "Make assigned workbook pages replace compatible generic practice. Generate only a separately labelled missing-evidence activity insert; never append a duplicate six-block worksheet or parallel homework stream.",
        "Keep the shared team decision log authoritative for evidence, decisions, dissent, order checks, platform status and review triggers. The individual workbook and inserts show each student's thinking.",
        "Freeze the required portfolio, watchlist, transaction, quote or benchmark snapshot at the start of the lesson so generators never depend on a live price remaining unchanged.",
        "Apply the course's stricter SMG rules: long-only, no margin, no short selling, evidence before every order and grades based on process rather than rank or return.",
        "After the first qualifying purchase, do not impose a trade quota; a justified hold or no-trade decision is an equally valid evidence-based output.",
        "Use mock or anonymised family profiles and frozen evidence; never require real family account data.",
        "Keep personal relevance investment-centred. Do not add budgeting, payslips, consumer credit, insurance administration, tax administration or general banking units.",
        "Do not give personalised buy, sell or hold advice, stock tips, market-timing rules or short-term speculation tasks."
      ]
    },
    practicalInvestingBoundary: {
      positiveMethod: "Use goals, horizon, liquidity, risk capacity, investment-choice evidence, company evidence, price, cost and limitations to choose a defensible next action.",
      allowedClassroomActions: ["consider", "watch", "avoid", "compare", "gather more evidence", "write or revise the plan", "seek regulated professional help"],
      excluded: ["personalised financial advice", "named product recommendations", "stock tips", "market timing", "short-term speculation", "real family account data"]
    },
    investmentWorkflow: [
      { step: 1, title: "Start with the goal", studentAction: "State what the money is for, when it is needed and how flexible the goal is.", evidenceCheck: "Goal, amount, horizon and liquidity need are explicit.", decisionOutput: "A defined investment problem rather than a preferred investment choice." },
      { step: 2, title: "Build the profile", studentAction: "Judge willingness and ability to accept loss.", evidenceCheck: "Risk tolerance is separated from risk capacity.", decisionOutput: "A profile with clear constraints." },
      { step: 3, title: "Understand the investment", studentAction: "Identify what is owned, how return may arise, costs, liquidity and major risks.", evidenceCheck: "Official security terms, fund factsheets or product disclosures and dated evidence are recorded.", decisionOutput: "An investment evidence summary." },
      { step: 4, title: "Read market or company evidence", studentAction: "Use sources, statements, market data and valuation only when relevant.", evidenceCheck: "Dates, figures and limitations are visible.", decisionOutput: "An evidence chain that can improve the first judgement." },
      { step: 5, title: "Compare alternatives", studentAction: "Use the same goal, time period and criteria across choices.", evidenceCheck: "Return, downside, cost, liquidity, diversification and fit are aligned.", decisionOutput: "A fair comparison with opportunity cost." },
      { step: 6, title: "Decide and monitor", studentAction: "Choose a qualified next action and define what evidence could change it.", evidenceCheck: "The action follows the plan and includes caveats and review triggers.", decisionOutput: "Consider, watch, avoid, compare, gather evidence or seek professional help." }
    ],
    simpleLessonStructure: [
      { label: "Hook", purpose: "Begin with a family, investment-choice, market, company or portfolio dilemma students can answer before definitions.", studentQuestion: "What would I decide first?" },
      { label: "Key idea", purpose: "Teach one concept, formula or rule needed to improve that judgement.", studentQuestion: "What new idea changes my thinking?" },
      { label: "Try it", purpose: "Use one short source, calculation, classification or comparison task.", studentQuestion: "Can I use the evidence myself?" },
      { label: "Decide", purpose: "Write a qualified next action with evidence and limits.", studentQuestion: "What should a careful investor do next?" }
    ],
    decisionFirstSyllabus: {
      name: "Decision-first investment and financial decision-making",
      coursePromise: "Every lesson moves from a first opinion to a more defensible investment decision using evidence, risk, suitability and limitations.",
      lessonContract: [
        "Starter dilemma: a goal, investment-choice, market, company or portfolio question students can answer before definitions.",
        "First judgement: a quick vote, ranking or written reason that exposes current thinking.",
        "Missing evidence: the exact source, figure, comparison, concept or caveat required next.",
        "Key idea: one concept, formula or rule that improves the initial judgement.",
        "Try it: one evidence, calculation, classification or comparison task.",
        "Misconception check: one explicit weak shortcut to correct.",
        "Exit judgement: a qualified next action or planning output supported by evidence."
      ],
      generatorRule: "Lesson and material generators must preserve the decision-first contract and the unit progression before adding examples.",
      studentFacingRule: "Visible materials should foreground the case dilemma, evidence task and student decision rather than planning labels.",
      assessmentRule: "Every lesson must produce visible evidence of understanding through a calculation, classification, source check, explanation, comparison or written judgement."
    },
    units: units,
    examCheckpoints: examCheckpoints,
    lessons: lessonSpecs.map(lessonFromSpec),
    sourceFitAudit: {
      rule: "Review each planned case before lesson production and replace it only when the source cannot support the required output with frozen, age-appropriate evidence.",
      checks: [
        "At least one official or reputable source can support the lesson's evidence task.",
        "Figures and claims can be frozen with publication and accessed dates.",
        "The case does not require live prices, real family data or personalised advice.",
        "The case teaches the unit's new knowledge without duplicating the previous output.",
        "The case supports concise English teaching text and Simplified Chinese support for key terms and prompts."
      ]
    }
  };

  if (typeof module === "object" && module.exports) {
    module.exports = courseMap;
  }

  global.INVEST = global.INVEST || {};
  global.INVEST.courseMap = courseMap;
})(typeof globalThis !== "undefined" ? globalThis : window);
