window.INVESTMENT_COURSE = window.INVESTMENT_COURSE || {};
(() => {
  const photo={src:'../../course-assets/images/first-stock-trades/nyse-2025.jpg',alt:'The New York Stock Exchange on Broad Street.',credit:'Epicgenius / Wikimedia Commons · CC BY-SA 4.0',source:'https://commons.wikimedia.org/wiki/File:Wall_St_May_2025_42.jpg',position:'50% 42%'};
  const stocks=[{label:'Investor.gov · Stocks',href:'https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks'}];
  const orders=[{label:'Investor.gov · Order types',href:'https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders'}];
  const rules=[{label:'SMG · Official rules: fees and execution',href:'https://www.stockmarketgame.org/rotg.html'}];
  const hours=[...rules,{label:'NYSE · Hours and holidays',href:'https://www.nyse.com/trade/hours-calendars'},{label:'NIST · US daylight-saving dates',href:'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst'}];
  const smg=[{label:'SMG · Stock entry',href:'https://www.stockmarketgame.org/enterstock_prod.htm'},{label:'SMG · Transaction Notes',href:'https://www.stockmarketgame.org/transaction-notes_b.html'}];
  const capture=' Teacher-supplied SMG screenshots, received 16 September 2026. Frozen teaching example, not a live quote or stock recommendation. Annotations are editable HTML; the screenshot is unchanged.';
  const section=(id,number,title,zh,note)=>({id,kind:'section',number,title,zh,caption:'',note});
  const table=(id,title,titleZh,rows,note,extra={})=>({id,kind:'table',group:'CONCEPT',title,titleZh,columns:['Term · 词语','Meaning · 含义'],rows,note,...extra});
  const recall=(id,title,titleZh,context,question,equations,answer,note,extra={})=>({id,kind:'recall',variant:'retrieval',group:'PRACTICE',title,titleZh,context,items:[{question,equations,answer}],note,...extra});
  // Crop and annotation coordinates are original screenshot pixels.
  const screen=(id,title,titleZh,file,size,crop,rows,boxes,note,extra={})=>table(id,title,titleZh,rows,note+capture,{group:'SMG WALKTHROUGH',screenshot:{src:`assets/smg-${file}.png`,size,crop,boxes,alt:title},sources:smg,...extra});
  window.INVESTMENT_COURSE.lesson={
    meta:{lesson:5,title:'Planning your first stock trades',titleZh:'规划首次股票交易',folio:'FIRST STOCK TRADES',course:'Investment Course',source:'SOURCE-NOTES.md',plannedMinutes:40,coreSlideCount:30,date:'2026-09-16'},photos:{exchange:photo},
    slides:[
      {id:'hero',kind:'hero',title:'Planning your first stock trades',zh:'规划首次股票交易',subtitle:'From $100,000 of virtual cash to your team’s first share purchase.',photo,syllabus:[{code:'3',title:'Markets, evidence and investment decisions',zh:'市场、证据与投资决策'},{code:'3.1',title:'How markets work',zh:'市场如何运作'},{code:'3.1.2',title:'How a trade reaches the market',zh:'交易如何进入市场'}],note:'0–0:30. Special practical SMG lesson. No opening retrieval. Teach shares and the observed interface, with two planning periods totalling ten minutes. AAPL is the supplied example, not a prescribed investment. No student account is accessed by this lesson.',sources:[{label:'NYSE photo · Epicgenius · CC BY-SA 4.0',href:photo.source}]},
      table('launch-recap','Last Friday’s Stock Market Game launch','回顾上周五的模拟交易任务',[
        ['Your group / 你们的小组','Three members; one shared virtual account. / 三人一组，共用一个虚拟账户。'],
        ['The access check / 登录检查','Each member tried logging in; one HOME screenshot. / 每人尝试登录，保存一张主页截图。'],
        ['One QQ message / 一条QQ消息','Names, roles and login results; no trades yet. / 姓名、分工和登录结果；当时不交易。']
      ],'0:30–2:00. Recap the Friday 11 September four-minute launch, due Sunday 13 September at 20:00 China time. Do not imply completion: collect unresolved access problems. Organiser records decisions; research lead combines evidence; portfolio coordinator checks the account. Preserve groups and roles.',{group:'FRIDAY 11 SEPTEMBER · 4-MINUTE LAUNCH',conclusion:'Today: understand the screens and plan your first purchase. / 今天：看懂界面，规划首次买入。'}),
      {id:'objectives',kind:'objectives',variant:'visual-roadmap',compact:true,partialReveal:true,title:'Learning objectives',titleZh:'学习目标',items:[['1','Explain what a share is','理解股票是什么',''],['2','Read the SMG screens and enter a buy order','看懂界面并输入买入订单',''],['3','Agree a first trade and check its status','商定首次交易并核对状态','']],note:'2:00–2:30. Three concrete beginner outcomes: ownership, order entry and an agreed first trade.'},
      section('section-evidence','01','Shares and your account','股票与账户','2:30–3:00. Show countable ownership pieces before the definition, then the account screens.'),
      table('ownership-example','Ten pieces of one company','一家公司的十份所有权',[
        ['100 equal shares / 100股','Suppose a company is divided into 100 equal shares. / 假设一家公司的所有权分成100股。'],
        ['Emma buys 10 / Emma买入10股','Emma owns 10 of 100 shares: 10% of the company. / Emma持有100股中的10股，即10%的所有权。']
      ],'3:00–4:00. Invented small company. Ask what Emma owns before revealing her ten pieces. The grid represents ownership, not products. Apple has vastly more shares: ten Apple shares do not mean 10% ownership.',{ownership:true,partialReveal:['tbody tr']}),
      {id:'share-and-ticker',kind:'definition',title:'A share is part ownership',titleZh:'股票代表部分所有权',prompt:'A share is one unit of ownership in a company. “Stock” also refers to company ownership through shares.',translation:'股票代表公司的一份所有权。英语中的stock也指通过股票持有公司的所有权。',highlights:['one unit of ownership'],highlightsZh:['一份所有权'],note:'4:00–5:00. Shareholder / 股东. A share is not a product or a guaranteed repayment. A price rise can give a capital gain; a fall can cause a loss. A dividend / 股息 is a payment a company may make to shareholders, not guaranteed. SMG simulates ownership; pupils do not legally own real shares.',sources:stocks,afterDefinition:['The price can rise or fall; some companies pay dividends.','股价可能上涨或下跌；有些公司会支付股息。']},
      table('account-balances','Cash, account value and buying power','现金、账户价值与购买力',[
        ['Cash Balance / 现金余额','$100,043.76 · money held as cash. / 当前账户中的现金。'],
        ['Total Equity / 账户净值','$100,043.76 · account value after borrowing. / 扣除借款后的账户价值。'],
        ['Net Equity Gain / 净值增益','+$43.76 (+0.044%) · gain since the start. / 相对初始10万美元的增益。'],
        ['Buying Power / 购买力','$150,065.64 · may include borrowing. / 可能包含借款，不等于现金。']
      ],'5:00–6:00. Transcribed from supplied HOME / Account Info dated 09/16/2026; the account identifier is not republished. This all-cash account has equal cash and equity. In a simple account, equity is cash plus share value minus borrowing. Reserve costs and pending commitments. A gain does not prove a stock trade; supplied history shows interest credits.',{balanceCards:true,conclusion:'For our first trades, use cash and leave room for costs. / 首次交易只用现金，并预留费用。',sources:[{label:'SMG · Cash and buying power',href:'https://www.stockmarketgame.org/acctsum_b.html'}]}),
      screen('account-details','Account details and market news','账户明细与市场新闻','account-details',[1000,562],[22,20,950,534],[
        ['Value of Long Stocks / 股票持仓市值','$0: no bought shares are recorded here yet. / 此时尚未记录买入股票的持仓。'],
        ['Interest & Dividends / 利息与股息','$43.76 income; fees and realised gain/loss are $0. / 收入43.76美元；费用、已实现盈亏均为0。'],
        ['Market News / 市场新闻','Headlines to investigate, not instructions to trade. / 新闻供进一步研究，不等于买卖指令。']
      ],[[34,78,337,26],[34,402,337,102],[404,32,553,184]],'6:00–6:45. Follow-up teacher screenshot dated 09/16/2026. Connect the prior $43.76 net equity gain to the Interest & Dividends category; the screen does not split that category into its two components. The earlier supplied Transaction History showed interest credits. Fees & Commission and Realized Gains/Loss are both $0 in this snapshot, not guaranteed to remain zero after trading. Realised gain/loss is profit or loss recorded when a position is closed. Value of Long Stocks is the value of bought stock positions; zero here does not rule out a submitted pending order. Market headlines are third-party content, not verified claims or instructions to sell. Check dates and original sources when researching; do not teach the screenshot allegations as established facts. Borrowing/short-position fields are outside this first cash-trade lesson.',{sources:[]}),
      screen('account-allocation','Your portfolio starts as cash','投资组合从现金开始','summary',[982,588],[20,55,935,400],[
        ['Allocation / 资产配置','100% cash: no shares held here. / 此时全部是现金，尚未持有股票。'],
        ['Performance / 账户表现','Total equity over time. / 账户净值随时间的变化。'],
        ['Equity Positions / 股票持仓','This area will list share positions. / 此区域将显示股票持仓。']
      ],[[25,175,103,51],[393,83,556,245],[24,395,465,53]],'6:45–7:30. Portfolio / 投资组合 means investments held together with cash. A rising account line need not mean a successful stock choice: cash interest can increase equity.'),
      screen('research-record','Find the company and its ticker','查找公司与股票代码','research',[973,835],[25,27,930,258],[
        ['AAPL / 股票代码','The ticker identifies Apple shares. / AAPL是苹果公司股票的代码。'],
        ['Overview / 公司简介','Read what the company does. / 了解公司销售什么、从事什么业务。'],
        ['Trade AAPL / 交易AAPL','Opens a form; it does not buy yet. / 打开表格，此时还没有买入。']
      ],[[86,52,110,71],[26,135,920,125],[844,53,110,50]],'7:30–8:30. Distinguish company, ticker and product brand. The $332 quote is frozen, not current. The business description is a starting point, not sufficient evidence for a purchase.'),
      screen('research-chart','Read the chart and save an idea','看懂图表并保存备选股票','research',[973,835],[23,278,932,398],[
        ['1D to 5Y / 1日至5年','Change the chart’s time period. / 切换图表显示的时间范围。'],
        ['Price chart / 股价图','Past prices move up and down. / 历史股价有涨有跌。'],
        ['Watchlist / 自选股','Saving an idea does not buy it. / 加入自选股不代表持有或买入。']
      ],[[28,304,233,34],[29,337,672,279],[747,280,201,61]],'8:30–9:30. Point to a fall as well as a rise. Past prices are not a forecast. The original News area offers research leads; check date and source. Market cap, EPS and valuation are left for later lessons.'),
      table('team-strategy','Your team’s first idea','小组的第一个投资想法',[
        ['Choose / 选择','Name one company and describe its business. / 选一家公司，用一句话说明其业务。'],
        ['Explain / 说明','Write one reason to consider it and one risk. / 写出一个考虑买入的理由和一个风险。'],
        ['Set a budget / 设定预算','Agree an amount to use and cash to keep. / 商定投入金额及保留的现金。']
      ],'9:30–13:30. Protect four minutes. Hand out one double-sided A4 worksheet per group; complete section 1, then set the budget in section 2. Everyone suggests; research lead combines ideas; organiser records the shared choice. Use the SMG overview and one dated source if accessible. A simple understandable reason is enough; no causal-chain essay. Paper planning continues if access fails. Existing classroom exercise caps: $10,000 per stock and $20,000 across 1–2 first-weekend stocks, including costs; cash only. These are classroom limits, not SMG rules.',{group:'TEAM PLANNING · 4 MINUTES',conclusion:'Fill in your group worksheet. / 共同填写小组学习单。'}),
      section('section-size','02','Enter and preview a buy order','输入并预览买入订单','13:30–14:00. Follow the supplied example: 10 AAPL shares, Market order. Do not replace it with the previous buy-limit-only lesson.'),
      screen('open-stock-trade','Open the stock-trade form','打开股票交易表格','trade-menu',[1060,625],[43,139,973,244],[
        ['TRADE / 交易','Go to Enter a Trade. / 进入“输入交易”。'],
        ['Stock Trade / 股票交易','Choose this for a share purchase. / 买入股票时选择此项。']
      ],[[236,147,74,42],[348,300,104,48]],'14:00–14:30. TRADE → Enter a Trade → Stock Trade. Mutual Fund Trade / 共同基金交易 and Bond Trade / 债券交易 are separate options.'),
      screen('ticket-identity','Choose the company and Buy','确认公司并选择买入','ticket',[1014,661],[96,74,818,143],[
        ['Search Symbol / 搜索股票代码','Enter AAPL; check APPLE INC. / 输入代码后核对公司名称。'],
        ['Buy / 买入','Buy adds shares; Sell sells existing shares. / 买入增加持股；卖出出售已有股票。']
      ],[[108,85,337,57],[108,182,115,28]],'14:30–15:30. The company at the top of the chart must match the plan. Other actions: Short Sell / 卖空 and Short Cover / 买入平仓; not for this first cash purchase. This is a screenshot, not a live widget.'),
      screen('ticket-quantity','Ten shares, not ten dollars','10股，不是10美元','ticket',[1014,661],[96,215,335,182],[
        ['Number of Shares / 股数','10 means ten shares. / 输入10代表买入10股。'],
        ['Order Type / 订单类型','The example selects Market. / 示例选择“市价单”。'],
        ['Preview Trade / 预览交易','Check before submitting. / 提交前先查看并核对详情。']
      ],[[109,223,168,51],[109,291,255,54],[108,359,101,33]],'15:30–16:30. Ask what entering 1,000 by mistake means. Quantity is not a dollar budget. Official SMG rule 8 specifies at least 10 shares for stock buys; use whole shares. Check Local Rules and security eligibility before entry.',{narrowScreenshot:true,sources:rules}),
      {id:'market-limit',kind:'compare',group:'ORDER TYPE',title:'Market orders and buy limits',titleZh:'市价单与买入限价单',left:['Market / 市价单','Buy at the price available when the order executes. / 按订单成交时可获得的价格买入。','The preview price can change. / 预览价格可能变化。'],right:['Buy limit / 买入限价单','Buy only at your limit price or lower. / 仅按限价或更低价格买入。','It may not execute. / 可能无法成交。'],partialReveal:['.compare-card'],note:'16:30–18:00. The captured order is Market. Suppose a buy limit is $332: $330 meets the condition; $335 does not. A limit caps purchase price, not later losses. Find the actual limit field if using it. SMG processing rules apply; do not assume an unfilled order stays active indefinitely.',sources:orders},
      screen('preview-identity','Check your order before submitting','提交前核对订单','preview',[1006,696],[9,64,598,214],[
        ['Action and company / 操作与公司','Buy · AAPL · APPLE INC. / 买入苹果公司股票。'],
        ['Quantity / 数量','10 shares, as agreed. / 核对是否为商定的10股。'],
        ['Order type / 订单类型','Market Order; no limit set. / 市价单；没有设置限价。']
      ],[[500,101,91,87],[503,190,87,25],[501,223,98,51]],'18:00–19:00. The student entering the trade compares it with the agreed team record. No separate checker role. A search result or watchlist entry is not an order.'),
      recall('emma-size-model','What would these ten shares cost?','这10股预计需要多少钱？','10 AAPL shares at $331.34 each. SMG’s standard commission is $5 per trade. / 10股苹果股票，每股331.34美元；标准佣金每笔5美元。','Estimate the total cost of this buy, including the fee. / 估算这笔买入的含费总成本。',['10 × $331.34 = $3,313.40','$3,313.40 + $5 = $3,318.40'],'Allow for a changed execution price. Selling later incurs another $5 plus an SEC fee. / 成交价可能变化；以后卖出另收5美元及SEC费用。','19:00–20:00. Published SMG rule 13 checked 16 September 2026: $5 per transaction, plus SEC fee on sales; the page does not state the SEC rate. Teacher checks applicable Local Rules and actual preview. Try before revealing both steps. $331.34 is the dated last-known quote, not a guaranteed price. $3,318.40 is estimated cash cost; it is not the screenshot’s buying-power reduction.',{group:'WORKED EXAMPLE',sources:rules}),
      screen('preview-money','Estimated cost is not buying power','预计成本不等于购买力','preview',[1006,696],[9,281,600,268],[
        ['Estimated Cost / 预计成本','$3,313.40 before charges; brackets show an outflow. / 未含费用；括号表示支出。'],
        ['Buying Power / 购买力','Starts from $150,065.64, not cash. / 从购买力开始计算，不是现金。'],
        ['After Trade / 交易后','$146,750.55 is remaining buying power. / 此数是预计剩余购买力。']
      ],[[502,398,94,25],[502,431,94,52],[502,512,96,29]],'20:00–21:30. Note the price date and estimated labels. The buying-power reduction reconciles with the published $5 commission: 3313.40 × 0.666 × 1.5 + 5 = 3315.0866, rounded to $3,315.09. Thus the $1.69 difference is NOT the commission. Estimated cash cost is $3,318.40, assuming the displayed price and standard fee. Remaining buying power is not remaining cash. The adjustment formula stays in teacher notes; students need cost plus $5 and a price buffer.',{sources:rules}),
      screen('preview-confirm','Check the order, then confirm once','核对订单，只确认一次','preview',[1006,696],[9,574,624,122],[
        ['Edit Trade / 修改交易','Go back if any field is wrong. / 任何字段有误，先返回修改。'],
        ['Confirm Trade / 确认交易','Agree, enter the password privately, submit once. / 全组同意后私下输入密码，只提交一次。']
      ],[[114,656,75,38],[16,657,95,36]],'21:30–22:00. Empty password field from supplied screenshot. Never type a password into the lesson or project it. Actual entry uses the authorised SMG account after checks. This preparation does not place an order.'),
      section('section-orders','03','Check the result and plan together','核对结果，合作规划','22:00–22:30. Read the actual confirmation message and then protect six more minutes for the team plan.'),
      screen('order-status','Confirmed does not mean executed','已确认不等于已成交','confirmation',[1008,469],[8,60,990,291],[
        ['Order submitted / 订单已提交','The system received the request. / 系统已收到交易请求。'],
        ['Market closed / 市场已休市','This order has not executed yet. / 这笔订单尚未成交。'],
        ['Check again / 再次核对','Holdings update after execution. / 成交后持仓还需更新。']
      ],[[13,62,978,38],[29,164,610,37],[672,220,313,109]],'22:30–23:30. This captured market order says next business day at 9:30am ET; holdings/balance reflect it the business day after. Other orders may be limited or rejected. Do not promise instant execution or duplicate an order because holdings are not yet visible.'),
      table('beijing-trading-times','When can trades execute?','交易何时可以成交？',[
        ['Opens / 开市','09:30','21:30'],
        ['Closes / 收市','16:00','04:00\nNext day · 次日']
      ],'23:30–24:30. Our supplied account is REALTIME. Regular US stock session Monday–Friday 09:30–16:00 ET; exclude US market holidays and early closes. Beijing is UTC+8: add 12 hours during US daylight time and 13 during standard time. In 2026 DST ends Sunday 1 November, so trading days from Monday 2 November use the later Beijing hours. A valid market order submitted while closed is normally priced at the next opening; limits, eligibility and checks may prevent execution. Daytime Wednesday 16 September submission would wait for that evening’s 21:30 opening. Sunday 20 September submission normally reaches Monday 21 September 21:30, not Sunday evening. Saturday Beijing before 04:00 can still be the US Friday session. End-of-Day games use closing prices instead; verify any account whose mode differs. The screen timestamp timezone is unspecified and is not used to derive this schedule. No overnight attendance required: inspect the next day.',{group:'SEPTEMBER 2026 · 2026年9月',columns:['','US Eastern time / 美国东部时间','Beijing time / 北京时间'],sources:hours,conclusion:'US Monday–Friday. Closed market? Wait for the next opening. / 美国周一至周五（交易所假日除外）；休市订单等下次开市处理。'}),
      screen('pending-order-screen','Your order is waiting in the queue','订单正在排队等待','pending-redacted',[2083,755],[40,210,1980,395],[
        ['Buy · 10 · AAPL / 买入10股苹果股票','These details match the submitted order. / 这些信息与刚提交的订单一致。'],
        ['MKT / 市价单','MKT means Market, not a dollar limit price. / MKT表示市价单，不是美元限价。'],
        ['Order Queued / 订单排队中','SFK-9022 is the reference; this is not yet executed. / SFK-9022是订单编号；此时尚未成交。']
      ],[[60,367,730,100],[790,367,190,100],[1355,367,640,100]],'24:30–25:30. Follow-up screenshot supplied by the teacher on 16 September. The row matches Buy, 10, AAPL, MKT, entry 2026-09-15 22:01:40 and reference SFK-9022 from the prior confirmation. Read Description: Order Queued. This is a submitted request, not proof of ownership. Do not submit the same order again. The screenshot timestamp timezone is not specified. Cancellation controls shown in the source are interface content, not an instruction to cancel.',{note:'24:30–25:30. Teacher-supplied follow-up Pending Orders screenshot received 16 September 2026. Team ID obscured with the built-in image editor; the result is enlarged. Checked against the original: Buy, 10, AAPL, MKT, 2026-09-15 22:01:40, SFK-9022, Order Queued are preserved. HTML callouts are separate. The reference matches the previous confirmation; queued does not mean executed. Do not duplicate the order. Timestamp timezone is unspecified. Cancellation controls are interface content, not instructions to cancel.'}),
      table('order-check','Where to check what happened','在哪里核对交易结果',[
        ['Pending Orders / 待处理订单','Submitted orders awaiting processing. / 查看已提交、尚待处理的订单。'],
        ['Transaction Notes / 交易说明','Find “Order Executed” or a rejection reason. / 查看“订单已成交”或被拒原因。'],
        ['Account Holdings / 账户持仓','Check the company and share quantity. / 更新后核对公司和持股数量。'],
        ['Transaction History / 交易历史','Record actual price, amount and fees. / 记录实际价格、金额和费用。']
      ],'25:30–26:00. TRADE contains Pending Orders and Transaction Notes; PORTFOLIO contains Holdings and History. A blank pending list alone is not success. Use execution record and updated holding. Supplied history INTCRD is an interest credit, zero shares, not a stock purchase. Private account identifiers are omitted.',{sources:smg,conclusion:'Record the outcome; do not submit a duplicate. / 记录实际结果，不要重复下单。'}),
      table('team-ticket','Prepare your first order together','共同准备首次订单',[
        ['Choose and explain / 选择并说明','Company + ticker + reason + risk. / 公司、代码、理由、风险。'],
        ['Calculate / 计算','Shares × price + $5; leave a price buffer. / 股数×价格＋5美元，并预留价格余量。'],
        ['Read back / 复述核对','Buy + quantity + type + limit, if used. / 买入、股数、类型及限价（如使用）。'],
        ['Agree / 达成一致','Everyone agrees; one student enters the trade. / 全组同意，由一名同学输入交易。']
      ],'26:00–32:00. Protect six minutes. Complete worksheet sections 2–4; the time reminder and later record are on the reverse. With access, the designated student compares the preview with the agreed worksheet, then enters the trade. If SMG is slow or inaccessible, hand the agreed worksheet to the teacher for entry. Record whether anyone already tried to submit: teacher checks pending orders/notes first to prevent duplication. Students do not also submit while teacher handles the ticket. Keep passwords off paper. Teacher checks quote, cash, fees, eligibility and local rules; any change to the agreed order needs group agreement. Preserve existing classroom caps and reserve pending commitments. A missing quote can be left blank for teacher checking.',{group:'TEAM PLANNING · 6 MINUTES',conclusion:'Website slow? Give the agreed worksheet to your teacher. / 网站太慢？将商定的学习单交给老师代为输入。'}),
      recall('exit-order','Ready to enter a first trade','准备好输入首次交易','Jack plans to buy 10 shares at an estimated $50 each, with a $5 fee. His confirmation says “market closed”. / Jack计划买10股，每股约50美元，佣金5美元；确认信息显示市场已休市。','What will he own? Estimate total cost. Has it executed, and where should he check? / 持有什么？预计含费总成本多少？已成交了吗？在哪里核对？',['10 × $50 + $5 = $505'],'Ten units of company ownership; $505 is an estimate. Submitted, not executed: check Transaction Notes, then updated Account Holdings. / 公司10股的所有权；505美元是估算。已提交但未成交：查看交易说明及更新后的持仓。','32:00–35:00. Individual assessed exit. Five marks: ownership, $505 including fee, estimate not guaranteed, submitted not executed, Notes then Holdings. Correct status and quantity misconceptions before entry.',{group:'EXIT QUESTION'}),
      table('weekend-timing','Your first trade and follow-up','首次交易与后续核对',[
        ['Friday 18 September / 9月18日周五','Review risk and finish checking the plan. / 讨论风险，完成小组计划核对。'],
        ['Sunday 20 September, 20:00 / 9月20日周日20:00','QQ: order/status and plan, or teacher-entry worksheet. / QQ提交订单状态与计划，或交代为输入的学习单。'],
        ['Tuesday 22 September, 20:00 / 9月22日周二20:00','Report execution or rejection/problem. / 报告成交详情，或被拒原因及问题。']
      ],'35:00–36:00. Existing China-time deadlines. Organiser sends privately through existing teacher contact. For access failure, hand in today’s worksheet or send its completed photo privately by the same deadline; explain existing submission status. Teacher entry is followed by a reference/status report to the group. Weekend entry is not weekend execution. No overnight monitoring. This preparation is not recorded as taught.',{group:'AFTER THE LESSON',conclusion:'All times are China time. / 以上均为中国时间。'}),
      table('summary','Summary','小结',[
        ['A share / 股票','Part ownership; its price can rise or fall. / 公司的部分所有权，股价有涨有跌。'],
        ['A buy order / 买入订单','Check company, shares, type and estimated cost. / 核对公司、股数、类型及预计成本。'],
        ['Your first trade / 首次交易','Agree, submit once and verify execution. / 共同商定，只提交一次，并核实成交。']
      ],'36:00–37:00. Core ending. Reserve 37:00–40:00 for feedback and access/ticket help; ten minutes of group planning have been protected. Assess understanding and records, not short-term profit.',{group:'SUMMARY',partialReveal:['tbody tr']}),
      screen('extension-holdings','What changes after a purchase?','买入后哪些内容会变化？','holdings',[1054,691],[226,289,564,345],[
        ['Stocks / 股票','A completed buy would add a stock holding. / 买入成交后将新增股票持仓。'],
        ['Cash / 现金','Here: 100% cash. A purchase would reduce it. / 此时为100%现金；买入后会减少。']
      ],[[233,403,162,143],[445,295,324,340]],'Optional after Summary. Predict changes from this 100% cash starting view. It is not evidence the AAPL order executed. Holdings may update after confirmation.',{group:'OPTIONAL'}),
      recall('extension-unfilled','The holding is still missing','账户里仍没有这只股票','A team sees no new holding after submitting. / 小组提交订单后仍未看到新持仓。','What should they check before trying again? / 再次下单前应该核对什么？',[],'Check Pending Orders and Transaction Notes. If pending, wait for updating; if rejected, read the reason and agree corrections before one new submission. / 先查待处理订单和交易说明。待处理则等待更新；被拒则读明原因，共同修改后再提交一次。','Optional two minutes. Missing holdings alone cannot distinguish pending, rejected or delayed posting. Never solve this by repeated clicking.',{group:'OPTIONAL',sources:smg})
    ]
  };
})();
