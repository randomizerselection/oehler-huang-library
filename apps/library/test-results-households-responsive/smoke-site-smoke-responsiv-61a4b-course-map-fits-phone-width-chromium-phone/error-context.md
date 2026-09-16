# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.js >> site smoke >> @responsive investment course map fits phone width
- Location: tests\smoke.spec.js:2231:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-syllabus-lesson]')
Expected: 51
Received: 32
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('[data-syllabus-lesson]')
    14 × locator resolved to 32 elements
       - unexpected value "32"

```

# Page snapshot

```yaml
- main [ref=e2]:
  - generic "Platform navigation" [ref=e3]:
    - link "学思札记首页" [ref=e4] [cursor=pointer]:
      - /url: ../index.html
      - generic [ref=e5]: OH
      - strong [ref=e7]: 学思札记
    - navigation "Primary destinations" [ref=e8]:
      - link "Economics" [ref=e9] [cursor=pointer]:
        - /url: ../economics/index.html
      - link "Investment" [ref=e10] [cursor=pointer]:
        - /url: index.html
      - link "作业入口" [ref=e11] [cursor=pointer]:
        - /url: http://127.0.0.1:4173/econmark/
  - generic [ref=e12]:
    - strong [ref=e13]: Investment
    - navigation "Investment course resources" [ref=e14]:
      - link "Course home" [ref=e15] [cursor=pointer]:
        - /url: index.html
      - link "Syllabus" [ref=e16] [cursor=pointer]:
        - /url: syllabus.html
      - link "Definitions" [ref=e17] [cursor=pointer]:
        - /url: definitions.html
  - generic [ref=e18]:
    - generic [ref=e19]:
      - generic [ref=e20]: Grade 9 · One semester · 32 lessons 九年级 · 一学期 · 32课时
      - heading "Investment and Financial Decision-Making 投资与财务决策" [level=1] [ref=e21]:
        - text: Investment and Financial Decision-Making
        - generic [ref=e22]: 投资与财务决策
      - paragraph [ref=e23]:
        - text: Goals, evidence, markets and portfolios
        - generic [ref=e24]: 目标、证据、市场与投资组合
      - paragraph [ref=e25]:
        - text: Learn how to make and defend investment decisions, then apply each lesson in the team Stock Market Game portfolio. Two lessons per week for 16 teaching weeks.
        - generic [ref=e26]: 学习如何作出并论证投资决策，再把每课知识应用于团队股票市场游戏投资组合。每周两课，共16个教学周。
      - paragraph [ref=e27]:
        - text: Fictional cases and classroom portfolios only—no real family account details and no personal investment advice.
        - generic [ref=e28]: 仅使用虚构案例和课堂投资组合，不收集真实家庭账户信息，也不提供个人投资建议。
      - generic "Syllabus links / 课程大纲链接" [ref=e29]:
        - link "Start Lesson 1 开始第一课" [ref=e30] [cursor=pointer]:
          - /url: unit-1/lesson-1/index.html
          - text: Start Lesson 1
          - generic [ref=e31]: 开始第一课
        - link "See the course route 查看课程路线" [ref=e32] [cursor=pointer]:
          - /url: "#course-structure"
          - text: See the course route
          - generic [ref=e33]: 查看课程路线
    - complementary "Student course route / 学生学习路线" [ref=e34]:
      - generic [ref=e35]: What you do 你的学习任务
      - list [ref=e36]:
        - listitem [ref=e37]:
          - strong [ref=e38]: Learn the idea
          - generic [ref=e39]: 学习核心概念
        - listitem [ref=e40]:
          - strong [ref=e41]: Apply it in SMG
          - generic [ref=e42]: 在SMG中应用
        - listitem [ref=e43]:
          - strong [ref=e44]: Defend your judgement
          - generic [ref=e45]: 论证个人判断
  - region [ref=e46]:
    - generic [ref=e47]:
      - generic [ref=e48]:
        - generic [ref=e49]: Course route 课程路线
        - heading "Six connected units 六个相互衔接的单元" [level=2] [ref=e50]
      - paragraph [ref=e51]:
        - text: Move from goals and risk to markets, company analysis and portfolio decisions.
        - generic [ref=e52]: 从目标与风险出发，逐步学习市场、公司分析和投资组合决策。
    - generic "Six unit roadmap / 六单元课程路线" [ref=e53]:
      - article [ref=e54]:
        - generic [ref=e55]: Lessons 1-7 · 第1-7课
        - heading "Personal Investment Foundations" [level=3] [ref=e56]
        - paragraph [ref=e57]: 个人投资基础
        - paragraph [ref=e58]: Goals, horizon, compounding, inflation and risk.目标、期限、复利、通胀与风险。
        - paragraph [ref=e59]:
          - strong [ref=e60]: "Build / 成果:"
          - text: Team SMG investment policy 团队SMG投资政策
      - article [ref=e61]:
        - generic [ref=e62]: Lessons 8-13 · 第8-13课
        - heading "Investment Choices for Families" [level=3] [ref=e63]
        - paragraph [ref=e64]: 家庭投资选择
        - paragraph [ref=e65]: Cash, bonds, shares, funds, fees and diversification.现金、债券、股票、基金、费用与分散投资。
        - paragraph [ref=e66]:
          - strong [ref=e67]: "Build / 成果:"
          - text: Portfolio-construction memo 投资组合构建备忘录
      - article [ref=e68]:
        - generic [ref=e69]: Lessons 14-18 · 第14-18课
        - heading "How Markets Work" [level=3] [ref=e70]
        - paragraph [ref=e71]: 市场如何运作
        - paragraph [ref=e72]: Issuance, trading, prices, returns, indices and news.发行、交易、价格、回报、指数与新闻。
        - paragraph [ref=e73]:
          - strong [ref=e74]: "Build / 成果:"
          - text: Market-evidence memo 市场证据备忘录
      - article [ref=e75]:
        - generic [ref=e76]: Lessons 19-24 · 第19-24课
        - heading "Analysing Companies" [level=3] [ref=e77]
        - paragraph [ref=e78]: 公司分析
        - paragraph [ref=e79]: Business models, statements, comparison, risk and valuation.商业模式、财务报表、比较、风险与估值。
        - paragraph [ref=e80]:
          - strong [ref=e81]: "Build / 成果:"
          - text: Company-analysis memo 公司分析备忘录
      - article [ref=e82]:
        - generic [ref=e83]: Lessons 25-28 · 第25-28课
        - heading "Portfolios and Investor Behaviour" [level=3] [ref=e84]
        - paragraph [ref=e85]: 投资组合与投资者行为
        - paragraph [ref=e86]: Allocation, concentration, rebalancing, monitoring and bias.资产配置、集中度、再平衡、监测与行为偏差。
        - paragraph [ref=e87]:
          - strong [ref=e88]: "Build / 成果:"
          - text: Portfolio review 投资组合评估
      - article [ref=e89]:
        - generic [ref=e90]: Lessons 29-32 · 第29-32课
        - heading "Family Decisions and Careers" [level=3] [ref=e91]
        - paragraph [ref=e92]: 家庭投资决策与职业
        - paragraph [ref=e93]: Education, housing, retirement, careers and final strategy.教育、住房、退休、职业与最终策略。
        - paragraph [ref=e94]:
          - strong [ref=e95]: "Build / 成果:"
          - text: Final strategy and presentation 最终策略与展示
  - region [ref=e96]:
    - generic [ref=e97]:
      - generic [ref=e98]:
        - generic [ref=e99]: Your progress 学习成果
        - heading "What you will learn 你将学会什么" [level=2] [ref=e100]
      - paragraph [ref=e101]:
        - text: Four capabilities connect all six units.
        - generic [ref=e102]: 四项核心能力贯穿六个单元。
    - list [ref=e103]:
      - listitem [ref=e104]:
        - strong [ref=e105]: Define the goal.
        - text: Set the horizon, liquidity need and risk limits.
        - generic [ref=e106]: 明确目标：说明期限、流动性需求与风险限制。
      - listitem [ref=e107]:
        - strong [ref=e108]: Compare choices.
        - text: Judge cash, bonds, shares and funds using the same criteria.
        - generic [ref=e109]: 比较选择：用统一标准评估现金、债券、股票与基金。
      - listitem [ref=e110]:
        - strong [ref=e111]: Use evidence.
        - text: Explain markets and analyse companies using dated sources.
        - generic [ref=e112]: 运用证据：使用有日期的来源解释市场并分析公司。
      - listitem [ref=e113]:
        - strong [ref=e114]: Defend a portfolio decision.
        - text: Connect goals, evidence, risk and review rules.
        - generic [ref=e115]: 论证投资组合决策：把目标、证据、风险与复查规则联系起来。
  - region [ref=e116]:
    - generic [ref=e117]:
      - generic [ref=e118]:
        - generic [ref=e119]: Course laboratory 课程实践
        - heading "The Stock Market Game is part of every lesson 股票市场游戏贯穿每一课" [level=2] [ref=e120]
      - paragraph [ref=e121]:
        - text: Every student participates and contributes evidence to one team portfolio.
        - generic [ref=e122]: 每位学生都必须参加，并为一个团队投资组合贡献证据。
    - generic "Stock Market Game participation requirements / 股票市场游戏参与要求" [ref=e123]:
      - article [ref=e124]:
        - generic [ref=e125]: Every lesson · 每一课
        - heading "Team lab and individual judgement" [level=3] [ref=e126]
        - paragraph [ref=e127]: 团队实践与个人判断
        - paragraph [ref=e128]:
          - text: Apply the lesson idea to the team portfolio, then write your own conclusion.
          - generic [ref=e129]: 把本课概念应用于团队投资组合，再独立写出个人结论。
      - article [ref=e130]:
        - generic [ref=e131]: Before trading · 交易前
        - heading "First trade after Lesson 13" [level=3] [ref=e132]
        - paragraph [ref=e133]: 第十三课后才进行首次交易
        - paragraph [ref=e134]:
          - text: "First learn goals, risk, shares, funds, costs and diversification, then pass the evidence gate. The course is long-only: no margin, borrowing or short selling."
          - generic [ref=e135]: 先学习目标、风险、股票、基金、费用与分散投资，再通过证据关卡。课程只允许做多，不使用保证金、借款或卖空。
      - article [ref=e136]:
        - generic [ref=e137]: Your record · 你的记录
        - heading "Workbook and team decision log" [level=3] [ref=e138]
        - paragraph [ref=e139]: 学习手册与团队决策记录
        - paragraph [ref=e140]:
          - text: Keep individual work in the SMG workbook and team evidence, decisions and review triggers in the shared log.
          - generic [ref=e141]: 个人记录保存在SMG学习手册中，团队证据、决策与复查条件保存在共享日志中。
      - article [ref=e142]:
        - generic [ref=e143]: Assessment · 评估
        - heading "Process, not rank or return" [level=3] [ref=e144]
        - paragraph [ref=e145]: 评估过程，而非排名或收益
        - paragraph [ref=e146]:
          - text: Grades reward evidence, reasoning, collaboration and reflection. Portfolio rank and raw return receive no marks.
          - generic [ref=e147]: 成绩依据证据、推理、合作与反思；投资组合排名和原始收益不计分。
    - group [ref=e148]:
      - generic "More SMG information 更多SMG信息 Workbook route, evidence and student materials 学习手册路线、证据与学生资料 +" [ref=e149] [cursor=pointer]:
        - generic [ref=e150]: More SMG information 更多SMG信息
        - strong [ref=e151]: Workbook route, evidence and student materials 学习手册路线、证据与学生资料
        - text: +
  - group [ref=e152]:
    - generic "How lessons work 课程如何进行 Try, learn, apply and decide 尝试、学习、应用与判断 +" [ref=e153] [cursor=pointer]:
      - generic [ref=e154]: How lessons work 课程如何进行
      - strong [ref=e155]: Try, learn, apply and decide 尝试、学习、应用与判断
      - text: +
  - region [ref=e156]:
    - generic [ref=e157]:
      - generic [ref=e158]:
        - generic [ref=e159]: Lesson map 课程地图
        - heading "Choose a lesson 选择课程" [level=2] [ref=e160]
      - paragraph [ref=e161]:
        - text: Every card shows the lesson question and required SMG lab. Lessons 1 and 2 are available now.
        - generic [ref=e162]: 每张卡片显示课程问题和必修SMG实践；第一课和第二课现已开放。
    - generic [ref=e163]:
      - article [ref=e164]:
        - generic [ref=e165]: Lesson 1 · 第1课
        - heading "What is investment?" [level=3] [ref=e167]
        - paragraph [ref=e168]: 什么是投资？
        - paragraph [ref=e169]: A friend says a share price will rise tomorrow. Would you borrow CNY 1,000 to buy it?
        - generic "Lesson 1 SMG core lab / SMG核心实践" [ref=e170]:
          - generic [ref=e171]:
            - generic [ref=e172]: SMG core lab SMG核心实践
            - strong [ref=e173]: Required team lab / 必修团队实践
          - paragraph [ref=e174]: Use the four-category classifier on the lesson handout, agree one team boundary rule for investment versus saving, speculation and consumption, and record one concise team evidence row; do not enter an order.
        - navigation "Lesson 1 materials / 第1课学习材料" [ref=e175]:
          - link "Slides 课件" [ref=e176] [cursor=pointer]:
            - /url: unit-1/lesson-1/index.html
            - text: Slides
            - generic [ref=e177]: 课件
          - link "Quiz 测验" [ref=e178] [cursor=pointer]:
            - /url: unit-1/lesson-1/index.html?view=quiz
            - text: Quiz
            - generic [ref=e179]: 测验
          - link "Handout 学习单" [ref=e180] [cursor=pointer]:
            - /url: unit-1/lesson-1/index.html?view=print
            - text: Handout
            - generic [ref=e181]: 学习单
        - group [ref=e182]:
          - generic "More about this lesson 更多课程信息" [ref=e183] [cursor=pointer]
      - article [ref=e184]:
        - generic [ref=e185]: Lesson 2 · 第2课
        - heading "Why do people and families invest?" [level=3] [ref=e187]
        - paragraph [ref=e188]: 个人与家庭为什么要投资？
        - paragraph [ref=e189]: A family has CNY 50,000 but no stated goal. What should it do next?
        - generic "Lesson 2 SMG core lab / SMG核心实践" [ref=e190]:
          - generic [ref=e191]:
            - generic [ref=e192]: SMG core lab SMG核心实践
            - strong [ref=e193]: Formative evidence checkpoint / 形成性证据检查
          - paragraph [ref=e194]: Complete the short- and long-term goal tables, form the SMG team, choose a shared long-horizon purpose, assign the first roles and open the team and individual evidence records.
        - navigation "Lesson 2 materials / 第2课学习材料" [ref=e195]:
          - link "Slides 课件" [ref=e196] [cursor=pointer]:
            - /url: unit-1/lesson-2/index.html
            - text: Slides
            - generic [ref=e197]: 课件
          - link "Quiz 测验" [ref=e198] [cursor=pointer]:
            - /url: unit-1/lesson-2/index.html?view=quiz
            - text: Quiz
            - generic [ref=e199]: 测验
          - link "Handout 学习单" [ref=e200] [cursor=pointer]:
            - /url: unit-1/lesson-2/index.html?view=print
            - text: Handout
            - generic [ref=e201]: 学习单
        - group [ref=e202]:
          - generic "More about this lesson 更多课程信息" [ref=e203] [cursor=pointer]
      - article [ref=e204]:
        - generic [ref=e205]: Lesson 3 · 第3课
        - heading "How do goals change investment decisions?" [level=3] [ref=e207]
        - paragraph [ref=e208]: 财务目标如何改变投资决策？
        - paragraph [ref=e209]: Should money for university in three years be invested like retirement money needed in thirty years?
        - generic "Lesson 3 SMG core lab / SMG核心实践" [ref=e210]:
          - generic [ref=e211]:
            - generic [ref=e212]: SMG core lab SMG核心实践
            - strong [ref=e213]: Required team lab / 必修团队实践
          - paragraph [ref=e214]: Turn the team purpose into explicit goal, time-horizon and liquidity rules that will govern later portfolio decisions.
        - navigation "Lesson 3 materials / 第3课学习材料" [ref=e215]:
          - link "Slides 课件" [ref=e216] [cursor=pointer]:
            - /url: unit-1/lesson-3/index.html
            - text: Slides
            - generic [ref=e217]: 课件
          - link "Quiz 测验" [ref=e218] [cursor=pointer]:
            - /url: unit-1/lesson-3/index.html?view=quiz
            - text: Quiz
            - generic [ref=e219]: 测验
          - link "Handout 学习单" [ref=e220] [cursor=pointer]:
            - /url: unit-1/lesson-3/index.html?view=print
            - text: Handout
            - generic [ref=e221]: 学习单
        - group [ref=e222]:
          - generic "More about this lesson 更多课程信息" [ref=e223] [cursor=pointer]
      - article [ref=e224]:
        - generic [ref=e225]: Lesson 4 · 第4课
        - heading "How do compounding and inflation change wealth over time?" [level=3] [ref=e227]
        - paragraph [ref=e228]: 复利与通货膨胀如何改变长期财富？
        - paragraph [ref=e229]: A portfolio grows by 5% each year while prices also rise. How much of the projected growth is a real gain?
        - generic "Lesson 4 SMG core lab / SMG核心实践" [ref=e230]:
          - generic [ref=e231]:
            - generic [ref=e232]: SMG core lab SMG核心实践
            - strong [ref=e233]: Formative evidence checkpoint / 形成性证据检查
          - paragraph [ref=e234]: Use frozen contribution, return and inflation figures to compare nominal and real compound-growth projections, label every assumption and complete the official rules quiz.
        - group [ref=e235]:
          - generic "More about this lesson 更多课程信息" [ref=e236] [cursor=pointer]
      - article [ref=e237]:
        - generic [ref=e238]: Lesson 5 · 第5课
        - heading "What is the relationship between risk and possible return?" [level=3] [ref=e240]
        - paragraph [ref=e241]: 风险与潜在回报有什么关系？
        - paragraph [ref=e242]: One choice offers a higher possible return. Does that make it the better investment?
        - generic "Lesson 5 SMG core lab / SMG核心实践" [ref=e243]:
          - generic [ref=e244]:
            - generic [ref=e245]: SMG core lab SMG核心实践
            - strong [ref=e246]: Required team lab / 必修团队实践
          - paragraph [ref=e247]: Place one watchlist candidate and the team's cash position on a risk-possible-return map, including one downside that the map cannot quantify.
        - group [ref=e248]:
          - generic "More about this lesson 更多课程信息" [ref=e249] [cursor=pointer]
      - article [ref=e250]:
        - generic [ref=e251]: Lesson 6 · 第6课
        - heading "How are risk tolerance and risk capacity different?" [level=3] [ref=e253]
        - paragraph [ref=e254]: 风险承受意愿与风险承受能力有何不同？
        - paragraph [ref=e255]: Two people both say they accept risk, but only one can afford a large loss. Are their profiles the same?
        - generic "Lesson 6 SMG core lab / SMG核心实践" [ref=e256]:
          - generic [ref=e257]:
            - generic [ref=e258]: SMG core lab SMG核心实践
            - strong [ref=e259]: Formative evidence checkpoint / 形成性证据检查
          - paragraph [ref=e260]: Set team risk-tolerance and risk-capacity limits and record which investment-choice evidence must be learned before any order.
        - group [ref=e261]:
          - generic "More about this lesson 更多课程信息" [ref=e262] [cursor=pointer]
      - article [ref=e263]:
        - generic [ref=e264]: Lesson 7 · 第7课
        - heading "Why should an investor write a plan before choosing investments?" [level=3] [ref=e266]
        - paragraph [ref=e267]: 为什么应先制定投资计划再选择投资？
        - paragraph [ref=e268]: A popular fund appears before a family has agreed its goals or risk limits. What should happen first?
        - generic "Lesson 7 SMG core lab / SMG核心实践" [ref=e269]:
          - generic [ref=e270]:
            - generic [ref=e271]: SMG core lab SMG核心实践
            - strong [ref=e272]: Summative unit output / 单元素养评估
          - paragraph [ref=e273]: Approve the team investment policy, permitted-choice boundaries and pre-launch research plan; do not select or purchase a security.
        - group [ref=e274]:
          - generic "More about this lesson 更多课程信息" [ref=e275] [cursor=pointer]
      - article [ref=e276]:
        - generic [ref=e277]: Lesson 8 · 第8课
        - heading "How should families compare cash, deposits and bonds?" [level=3] [ref=e279]
        - paragraph [ref=e280]: 家庭应如何比较现金、存款与债券？
        - paragraph [ref=e281]: A family needs some money in eighteen months and the rest in ten years. Should it use the same low-risk choice for both amounts?
        - generic "Lesson 8 SMG core lab / SMG核心实践" [ref=e282]:
          - generic [ref=e283]:
            - generic [ref=e284]: SMG core lab SMG核心实践
            - strong [ref=e285]: Required team lab / 必修团队实践
          - paragraph [ref=e286]: Compare the proposed cash reserve with a teacher-frozen deposit and bond alternative, recording any non-platform choice as a paper allocation.
        - group [ref=e287]:
          - generic "More about this lesson 更多课程信息" [ref=e288] [cursor=pointer]
      - article [ref=e289]:
        - generic [ref=e290]: Lesson 9 · 第9课
        - heading "What does owning a share mean?" [level=3] [ref=e292]
        - paragraph [ref=e293]: 持有股票意味着什么？
        - paragraph [ref=e294]: If you own one Tencent share, do you control the company or own its buildings?
        - generic "Lesson 9 SMG core lab / SMG核心实践" [ref=e295]:
          - generic [ref=e296]:
            - generic [ref=e297]: SMG core lab SMG核心实践
            - strong [ref=e298]: Required team lab / 必修团队实践
          - paragraph [ref=e299]: Explain what ownership of one eligible watchlist share would give the team and what it would not give; no order is entered.
        - group [ref=e300]:
          - generic "More about this lesson 更多课程信息" [ref=e301] [cursor=pointer]
      - article [ref=e302]:
        - generic [ref=e303]: Lesson 10 · 第10课
        - heading "How do funds, ETFs, index funds and active funds differ?" [level=3] [ref=e305]
        - paragraph [ref=e306]: 基金、ETF、指数基金与主动管理基金有何不同？
        - paragraph [ref=e307]: One fund tracks an index and another tries to beat it. Does either label prove that the fund fits the family goal?
        - generic "Lesson 10 SMG core lab / SMG核心实践" [ref=e308]:
          - generic [ref=e309]:
            - generic [ref=e310]: SMG core lab SMG核心实践
            - strong [ref=e311]: Required team lab / 必修团队实践
          - paragraph [ref=e312]: Compare an ETF, index-tracking fund and actively managed fund by objective, benchmark, holdings, cost and remaining risk.
        - group [ref=e313]:
          - generic "More about this lesson 更多课程信息" [ref=e314] [cursor=pointer]
      - article [ref=e315]:
        - generic [ref=e316]: Lesson 11 · 第11课
        - heading "How do fees and diversification affect an investment choice?" [level=3] [ref=e318]
        - paragraph [ref=e319]: 费用与分散投资如何影响投资选择？
        - paragraph [ref=e320]: A low-fee portfolio owns many securities but most share the same technology exposure. Is it well constructed?
        - generic "Lesson 11 SMG core lab / SMG核心实践" [ref=e321]:
          - generic [ref=e322]:
            - generic [ref=e323]: SMG core lab SMG核心实践
            - strong [ref=e324]: Formative evidence checkpoint / 形成性证据检查
          - paragraph [ref=e325]: Calculate the cost of one proposed fund or transaction and audit the paper portfolio for company, sector and geographic concentration.
        - group [ref=e326]:
          - generic "More about this lesson 更多课程信息" [ref=e327] [cursor=pointer]
      - article [ref=e328]:
        - generic [ref=e329]: Lesson 12 · 第12课
        - heading "How do regular investing and lump-sum investing differ?" [level=3] [ref=e331]
        - paragraph [ref=e332]: 定期投资与一次性投资有何不同？
        - paragraph [ref=e333]: A family has money available now but dislikes choosing one purchase date. Should it invest all at once or in stages?
        - generic "Lesson 12 SMG core lab / SMG核心实践" [ref=e334]:
          - generic [ref=e335]:
            - generic [ref=e336]: SMG core lab SMG核心实践
            - strong [ref=e337]: Required team lab / 必修团队实践
          - paragraph [ref=e338]: Model regular contributions versus one lump-sum contribution and explain why neither method guarantees the better result.
        - group [ref=e339]:
          - generic "More about this lesson 更多课程信息" [ref=e340] [cursor=pointer]
      - article [ref=e341]:
        - generic [ref=e342]: Lesson 13 · 第13课
        - heading "Which investment mix fits different family goals?" [level=3] [ref=e344]
        - paragraph [ref=e345]: 哪种投资组合适合不同的家庭目标？
        - paragraph [ref=e346]: Three families have the same amount but different goals. Should they hold the same investments?
        - generic "Lesson 13 SMG core lab / SMG核心实践" [ref=e347]:
          - generic [ref=e348]:
            - generic [ref=e349]: SMG core lab SMG核心实践
            - strong [ref=e350]: Summative unit output / 单元素养评估
          - paragraph [ref=e351]: Complete the formal portfolio-fit review, approve the first evidence-backed proposal and complete the qualifying long stock purchase when the teacher opens the launch gate.
        - group [ref=e352]:
          - generic "More about this lesson 更多课程信息" [ref=e353] [cursor=pointer]
      - article [ref=e354]:
        - generic [ref=e355]: Lesson 14 · 第14课
        - heading "How do primary and secondary markets connect companies and investors?" [level=3] [ref=e357]
        - paragraph [ref=e358]: 一级市场与二级市场如何连接公司和投资者？
        - paragraph [ref=e359]: You buy an existing share through HKEX. Does your payment finance the company?
        - generic "Lesson 14 SMG core lab / SMG核心实践" [ref=e360]:
          - generic [ref=e361]:
            - generic [ref=e362]: SMG core lab SMG核心实践
            - strong [ref=e363]: Required team lab / 必修团队实践
          - paragraph [ref=e364]: Trace a holding from company issuance in the primary market to the team's secondary-market trade, explaining where money and securities moved.
        - group [ref=e365]:
          - generic "More about this lesson 更多课程信息" [ref=e366] [cursor=pointer]
      - article [ref=e367]:
        - generic [ref=e368]: Lesson 15 · 第15课
        - heading "How does an order become a completed trade, and what does a quote show?" [level=3] [ref=e370]
        - paragraph [ref=e371]: 订单如何成为已完成交易，行情页面显示什么？
        - paragraph [ref=e372]: A team submits a buy order at the displayed price. Is execution at that price guaranteed?
        - generic "Lesson 15 SMG core lab / SMG核心实践" [ref=e373]:
          - generic [ref=e374]:
            - generic [ref=e375]: SMG core lab SMG核心实践
            - strong [ref=e376]: Formative evidence checkpoint / 形成性证据检查
          - paragraph [ref=e377]: Trace one order through submission, execution and settlement and annotate the related quote with bid, ask, volume and time stamp.
        - group [ref=e378]:
          - generic "More about this lesson 更多课程信息" [ref=e379] [cursor=pointer]
      - article [ref=e380]:
        - generic [ref=e381]: Lesson 16 · 第16课
        - heading "Why do share prices change, and why is price not company value?" [level=3] [ref=e383]
        - paragraph [ref=e384]: 股价为何变化，为什么股价不等于公司价值？
        - paragraph [ref=e385]: A lower-priced share belongs to the larger company. Which figure explains this?
        - generic "Lesson 16 SMG core lab / SMG核心实践" [ref=e386]:
          - generic [ref=e387]:
            - generic [ref=e388]: SMG core lab SMG核心实践
            - strong [ref=e389]: Required team lab / 必修团队实践
          - paragraph [ref=e390]: Explain one material price move using dated evidence and compare share price with market capitalisation for two candidates.
        - group [ref=e391]:
          - generic "More about this lesson 更多课程信息" [ref=e392] [cursor=pointer]
      - article [ref=e393]:
        - generic [ref=e394]: Lesson 17 · 第17课
        - heading "How should investment performance be measured and compared?" [level=3] [ref=e396]
        - paragraph [ref=e397]: 应如何衡量并比较投资表现？
        - paragraph [ref=e398]: A portfolio gained 8% while its market index gained 11%. Was the portfolio successful?
        - generic "Lesson 17 SMG core lab / SMG核心实践" [ref=e399]:
          - generic [ref=e400]:
            - generic [ref=e401]: SMG core lab SMG核心实践
            - strong [ref=e402]: Formative evidence checkpoint / 形成性证据检查
          - paragraph [ref=e403]: Calculate total return for one holding and compare the team's same-period performance with the applicable benchmark without using rank as proof of quality.
        - group [ref=e404]:
          - generic "More about this lesson 更多课程信息" [ref=e405] [cursor=pointer]
      - article [ref=e406]:
        - generic [ref=e407]: Lesson 18 · 第18课
        - heading "How should investors judge market information and analyst conflicts?" [level=3] [ref=e409]
        - paragraph [ref=e410]: 投资者应如何判断市场信息与分析师利益冲突？
        - paragraph [ref=e411]: A positive report is shared online, but the author owns the shares and cites no original source. Should the team use it?
        - generic "Lesson 18 SMG core lab / SMG核心实践" [ref=e412]:
          - generic [ref=e413]:
            - generic [ref=e414]: SMG core lab SMG核心实践
            - strong [ref=e415]: Summative unit output / 单元素养评估
          - paragraph [ref=e416]: Audit one market-news or analyst item for source quality, date, material evidence, uncertainty and conflict, then submit the market-evidence memo.
        - group [ref=e417]:
          - generic "More about this lesson 更多课程信息" [ref=e418] [cursor=pointer]
      - article [ref=e419]:
        - generic [ref=e420]: Lesson 19 · 第19课
        - heading "How does a business make money and defend its position?" [level=3] [ref=e422]
        - paragraph [ref=e423]: 企业如何赚钱并保持竞争优势？
        - paragraph [ref=e424]: Tencent offers many services. Which activities actually create revenue and strengthen the business?
        - generic "Lesson 19 SMG core lab / SMG核心实践" [ref=e425]:
          - generic [ref=e426]:
            - generic [ref=e427]: SMG core lab SMG核心实践
            - strong [ref=e428]: Required team lab / 必修团队实践
          - paragraph [ref=e429]: "Write a concise business-model note for one holding or watchlist candidate: customer, value offered, revenue driver and main vulnerability."
        - group [ref=e430]:
          - generic "More about this lesson 更多课程信息" [ref=e431] [cursor=pointer]
      - article [ref=e432]:
        - generic [ref=e433]: Lesson 20 · 第20课
        - heading "How do profit and cash flow reveal different parts of company performance?" [level=3] [ref=e435]
        - paragraph [ref=e436]: 利润与现金流如何揭示公司表现的不同方面？
        - paragraph [ref=e437]: A company reports higher profit but weaker operating cash flow. Which result should the analyst trust?
        - generic "Lesson 20 SMG core lab / SMG核心实践" [ref=e438]:
          - generic [ref=e439]:
            - generic [ref=e440]: SMG core lab SMG核心实践
            - strong [ref=e441]: Required team lab / 必修团队实践
          - paragraph [ref=e442]: Extract revenue and profit evidence, compare profit with operating cash flow and explain the difference for the team judgement.
        - group [ref=e443]:
          - generic "More about this lesson 更多课程信息" [ref=e444] [cursor=pointer]
      - article [ref=e445]:
        - generic [ref=e446]: Lesson 21 · 第21课
        - heading "How does a balance sheet reveal financial strength and debt risk?" [level=3] [ref=e448]
        - paragraph [ref=e449]: 资产负债表如何揭示财务实力和债务风险？
        - paragraph [ref=e450]: A company owns many assets but also owes large amounts. Which side matters more?
        - generic "Lesson 21 SMG core lab / SMG核心实践" [ref=e451]:
          - generic [ref=e452]:
            - generic [ref=e453]: SMG core lab SMG核心实践
            - strong [ref=e454]: Required team lab / 必修团队实践
          - paragraph [ref=e455]: Use balance-sheet evidence to assess one holding or candidate's liquidity, debt and resilience without relying on a single ratio.
        - group [ref=e456]:
          - generic "More about this lesson 更多课程信息" [ref=e457] [cursor=pointer]
      - article [ref=e458]:
        - generic [ref=e459]: Lesson 22 · 第22课
        - heading "How should analysts compare companies and record important risks?" [level=3] [ref=e461]
        - paragraph [ref=e462]: 分析师应如何比较公司并记录重要风险？
        - paragraph [ref=e463]: Two companies have different margins and growth rates. Can one number prove which company is stronger?
        - generic "Lesson 22 SMG core lab / SMG核心实践" [ref=e464]:
          - generic [ref=e465]:
            - generic [ref=e466]: SMG core lab SMG核心实践
            - strong [ref=e467]: Required team lab / 必修团队实践
          - paragraph [ref=e468]: Compare one holding with a relevant peer using aligned measures and add two material risks plus a disconfirming indicator to the monitoring record.
        - group [ref=e469]:
          - generic "More about this lesson 更多课程信息" [ref=e470] [cursor=pointer]
      - article [ref=e471]:
        - generic [ref=e472]: Lesson 23 · 第23课
        - heading "Can a good company still be too expensive?" [level=3] [ref=e474]
        - paragraph [ref=e475]: 一家好公司是否仍可能价格过高？
        - paragraph [ref=e476]: Microsoft has a strong business, but investors pay a high price for its earnings. Can both statements be true?
        - generic "Lesson 23 SMG core lab / SMG核心实践" [ref=e477]:
          - generic [ref=e478]:
            - generic [ref=e479]: SMG core lab SMG核心实践
            - strong [ref=e480]: Required team lab / 必修团队实践
          - paragraph [ref=e481]: Make a cautious valuation judgement for one holding or candidate using at least one comparison measure, assumptions and an explicit caveat.
        - group [ref=e482]:
          - generic "More about this lesson 更多课程信息" [ref=e483] [cursor=pointer]
      - article [ref=e484]:
        - generic [ref=e485]: Lesson 24 · 第24课
        - heading "How should a junior analyst write an evidence-based company memo?" [level=3] [ref=e487]
        - paragraph [ref=e488]: 如何撰写有证据支持的公司分析备忘录？
        - paragraph [ref=e489]: The evidence shows a strong business, mixed cash flow and a demanding price. What conclusion is defensible?
        - generic "Lesson 24 SMG core lab / SMG核心实践" [ref=e490]:
          - generic [ref=e491]:
            - generic [ref=e492]: SMG core lab SMG核心实践
            - strong [ref=e493]: Summative unit output / 单元素养评估
          - paragraph [ref=e494]: Submit the junior analyst memo on one SMG holding or watchlist candidate and connect its evidence to a hold, research, trade or no-trade decision.
        - group [ref=e495]:
          - generic "More about this lesson 更多课程信息" [ref=e496] [cursor=pointer]
      - article [ref=e497]:
        - generic [ref=e498]: Lesson 25 · 第25课
        - heading "How do asset allocation and concentration shape portfolio risk?" [level=3] [ref=e500]
        - paragraph [ref=e501]: 资产配置与集中度如何影响投资组合风险？
        - paragraph [ref=e502]: A portfolio owns many securities but half its value depends on one company. Which feature matters more?
        - generic "Lesson 25 SMG core lab / SMG核心实践" [ref=e503]:
          - generic [ref=e504]:
            - generic [ref=e505]: SMG core lab SMG核心实践
            - strong [ref=e506]: Formative evidence checkpoint / 形成性证据检查
          - paragraph [ref=e507]: Calculate the live portfolio's asset and security weights and identify the largest avoidable company, sector or asset-class concentration.
        - group [ref=e508]:
          - generic "More about this lesson 更多课程信息" [ref=e509] [cursor=pointer]
      - article [ref=e510]:
        - generic [ref=e511]: Lesson 26 · 第26课
        - heading "Which geographic, currency and market risks remain in a diversified portfolio?" [level=3] [ref=e513]
        - paragraph [ref=e514]: 分散投资组合仍有哪些地域、货币与市场风险？
        - paragraph [ref=e515]: A global-looking portfolio owns many funds, yet most revenue and currency exposure points to one market. Is it diversified?
        - generic "Lesson 26 SMG core lab / SMG核心实践" [ref=e516]:
          - generic [ref=e517]:
            - generic [ref=e518]: SMG core lab SMG核心实践
            - strong [ref=e519]: Required team lab / 必修团队实践
          - paragraph [ref=e520]: Map geographic and currency exposures, then separate company-specific risks from the market-wide risks diversification cannot remove.
        - group [ref=e521]:
          - generic "More about this lesson 更多课程信息" [ref=e522] [cursor=pointer]
      - article [ref=e523]:
        - generic [ref=e524]: Lesson 27 · 第27课
        - heading "How should investors compare, rebalance and monitor a portfolio?" [level=3] [ref=e526]
        - paragraph [ref=e527]: 投资者应如何比较、再平衡并监测投资组合？
        - paragraph [ref=e528]: A share holding rises above its target weight. Should the team sell, hold or gather more evidence?
        - generic "Lesson 27 SMG core lab / SMG核心实践" [ref=e529]:
          - generic [ref=e530]:
            - generic [ref=e531]: SMG core lab SMG核心实践
            - strong [ref=e532]: Formative evidence checkpoint / 形成性证据检查
          - paragraph [ref=e533]: Compare a share, fund and teacher-frozen bond alternative, calculate weight gaps and complete a rebalance, monitor or no-action decision with dated triggers.
        - group [ref=e534]:
          - generic "More about this lesson 更多课程信息" [ref=e535] [cursor=pointer]
      - article [ref=e536]:
        - generic [ref=e537]: Lesson 28 · 第28课
        - heading "How can investors recognise bias and improve a portfolio review?" [level=3] [ref=e539]
        - paragraph [ref=e540]: 投资者如何识别偏差并改进投资组合评估？
        - paragraph [ref=e541]: Last year's best-performing fund attracts large inflows just before it falls. Why might investors still have chosen it?
        - generic "Lesson 28 SMG core lab / SMG核心实践" [ref=e542]:
          - generic [ref=e543]:
            - generic [ref=e544]: SMG core lab SMG核心实践
            - strong [ref=e545]: Summative unit output / 单元素养评估
          - paragraph [ref=e546]: Audit one team decision for FOMO, recency bias or performance chasing, correct the process and submit the Unit 5 portfolio review.
        - group [ref=e547]:
          - generic "More about this lesson 更多课程信息" [ref=e548] [cursor=pointer]
      - article [ref=e549]:
        - generic [ref=e550]: Lesson 29 · 第29课
        - heading "How should one portfolio change for education, housing and retirement goals?" [level=3] [ref=e552]
        - paragraph [ref=e553]: 同一投资组合应如何因教育、住房与退休目标而调整？
        - paragraph [ref=e554]: The same family portfolio must support a house purchase in three years, university payments in eight years and retirement in thirty years. Can one allocation fit all three?
        - generic "Lesson 29 SMG core lab / SMG核心实践" [ref=e555]:
          - generic [ref=e556]:
            - generic [ref=e557]: SMG core lab SMG核心实践
            - strong [ref=e558]: Required team lab / 必修团队实践
          - paragraph [ref=e559]: Stress-test the current portfolio against education, house-deposit and retirement goals and explain why the three allocations require different risk rules.
        - group [ref=e560]:
          - generic "More about this lesson 更多课程信息" [ref=e561] [cursor=pointer]
      - article [ref=e562]:
        - generic [ref=e563]: Lesson 30 · 第30课
        - heading "How should a family pause, plan and verify before investing unexpected money?" [level=3] [ref=e565]
        - paragraph [ref=e566]: 家庭应如何在投资意外所得前暂停、规划并核实？
        - paragraph [ref=e567]: A family receives CNY 500,000 and immediately sees an offer promising a guaranteed 18% return. What should happen first?
        - generic "Lesson 30 SMG core lab / SMG核心实践" [ref=e568]:
          - generic [ref=e569]:
            - generic [ref=e570]: SMG core lab SMG核心实践
            - strong [ref=e571]: Formative evidence checkpoint / 形成性证据检查
          - paragraph [ref=e572]: Build a staged windfall plan, audit a suspicious offer and re-check current rules, account security and stop-and-verify boundaries.
        - group [ref=e573]:
          - generic "More about this lesson 更多课程信息" [ref=e574] [cursor=pointer]
      - article [ref=e575]:
        - generic [ref=e576]: Lesson 31 · 第31课
        - heading "Which careers support investment decisions, and how do they work?" [level=3] [ref=e578]
        - paragraph [ref=e579]: 投资行业有哪些职业及其工作方式？
        - paragraph [ref=e580]: A family investment decision may involve research, planning, portfolio management, operations and compliance. Who does what?
        - generic "Lesson 31 SMG core lab / SMG核心实践" [ref=e581]:
          - generic [ref=e582]:
            - generic [ref=e583]: SMG core lab SMG核心实践
            - strong [ref=e584]: Required team lab / 必修团队实践
          - paragraph [ref=e585]: Map the team's research, portfolio, compliance, data-entry and reporting work to real investment careers and their ethical responsibilities.
        - group [ref=e586]:
          - generic "More about this lesson 更多课程信息" [ref=e587] [cursor=pointer]
      - article [ref=e588]:
        - generic [ref=e589]: Lesson 32 · 第32课
        - heading "How should students build and explain a family investment strategy?" [level=3] [ref=e591]
        - paragraph [ref=e592]: 如何制定并说明家庭投资策略？
        - paragraph [ref=e593]: A mock family has education, housing and retirement goals plus an existing portfolio. What should its next investment process be?
        - generic "Lesson 32 SMG core lab / SMG核心实践" [ref=e594]:
          - generic [ref=e595]:
            - generic [ref=e596]: SMG core lab SMG核心实践
            - strong [ref=e597]: Summative unit output / 单元素养评估
          - paragraph [ref=e598]: Defend the final portfolio against its goal and benchmark, present the family strategy and submit an individual reflection on contribution and changed judgement.
        - group [ref=e599]:
          - generic "More about this lesson 更多课程信息" [ref=e600] [cursor=pointer]
    - group [ref=e601]:
      - generic "Teacher tools 教师工具 Generator planning table 课程生成规划表 +" [ref=e602] [cursor=pointer]:
        - generic [ref=e603]: Teacher tools 教师工具
        - strong [ref=e604]: Generator planning table 课程生成规划表
        - text: +
  - group [ref=e605]:
    - generic "Teacher tools 教师工具 Generator and source information 生成器与来源信息 +" [ref=e606] [cursor=pointer]:
      - generic [ref=e607]: Teacher tools 教师工具
      - strong [ref=e608]: Generator and source information 生成器与来源信息
      - text: +
  - region [ref=e609]:
    - generic [ref=e610]:
      - generic [ref=e611]:
        - generic [ref=e612]: Assessment 课程评估
        - heading "How your work is assessed 你的学习如何评估" [level=2] [ref=e613]
      - paragraph [ref=e614]:
        - text: Six unit tasks assess knowledge, evidence, reasoning and a qualified decision—not portfolio rank.
        - generic [ref=e615]: 六项单元任务评估知识、证据、推理与有条件的判断，而非投资组合排名。
    - generic "Six assessment checkpoints / 六项评估节点" [ref=e616]:
      - article [ref=e617]:
        - generic [ref=e618]: After Lesson 7 · 第7课后
        - heading "Investment plan" [level=3] [ref=e619]
        - paragraph [ref=e620]: 投资计划
        - paragraph [ref=e621]:
          - text: Goals, horizon, risk limits and decision rules.
          - generic [ref=e622]: 目标、期限、风险限制与决策规则。
      - article [ref=e623]:
        - generic [ref=e624]: After Lesson 13 · 第13课后
        - heading "Investment choices" [level=3] [ref=e625]
        - paragraph [ref=e626]: 投资选择
        - paragraph [ref=e627]:
          - text: Compare cash, bonds, shares and funds.
          - generic [ref=e628]: 比较现金、债券、股票与基金。
      - article [ref=e629]:
        - generic [ref=e630]: After Lesson 18 · 第18课后
        - heading "Market evidence" [level=3] [ref=e631]
        - paragraph [ref=e632]: 市场证据
        - paragraph [ref=e633]:
          - text: Explain one judgement using market evidence.
          - generic [ref=e634]: 运用市场证据解释一个判断。
      - article [ref=e635]:
        - generic [ref=e636]: After Lesson 24 · 第24课后
        - heading "Company analysis" [level=3] [ref=e637]
        - paragraph [ref=e638]: 公司分析
        - paragraph [ref=e639]:
          - text: Write a balanced memo with evidence and caveats.
          - generic [ref=e640]: 撰写包含证据与限制说明的平衡备忘录。
      - article [ref=e641]:
        - generic [ref=e642]: After Lesson 28 · 第28课后
        - heading "Portfolio review" [level=3] [ref=e643]
        - paragraph [ref=e644]: 投资组合评估
        - paragraph [ref=e645]:
          - text: Review allocation, concentration and behaviour.
          - generic [ref=e646]: 评估配置、集中度与投资者行为。
      - article [ref=e647]:
        - generic [ref=e648]: After Lesson 32 · 第32课后
        - heading "Final strategy" [level=3] [ref=e649]
        - paragraph [ref=e650]: 最终策略
        - paragraph [ref=e651]:
          - text: Present and defend the complete investment process.
          - generic [ref=e652]: 展示并论证完整的投资决策过程。
  - group [ref=e653]:
    - generic "Course boundaries 课程边界 Scope and advice limits 课程范围与建议限制 +" [ref=e654] [cursor=pointer]:
      - generic [ref=e655]: Course boundaries 课程边界
      - strong [ref=e656]: Scope and advice limits 课程范围与建议限制
      - text: +
  - group [ref=e657]:
    - generic "Reference 参考资料 Core calculations 核心计算 +" [ref=e658] [cursor=pointer]:
      - generic [ref=e659]: Reference 参考资料
      - strong [ref=e660]: Core calculations 核心计算
      - text: +
  - generic [ref=e661]:
    - generic [ref=e662]: 学思札记 · 个人学习与教学资料
    - generic [ref=e663]: Educational use only; not personal financial advice. 仅供教学使用，不构成个人财务建议。
```

# Test source

```ts
  2136 |     await expect(page.locator('#generator-access .investment-section-head > p')).toBeHidden();
  2137 |     await expect(page.locator('body')).toContainText(/--syllabus financial-decisions/i);
  2138 |     await expect(page.locator('body')).not.toContainText(/--syllabus company-analysis/i);
  2139 |     await expect(page.locator('.investment-generator-table thead')).toContainText(/Starter dilemma/i);
  2140 |     await expect(page.locator('.investment-generator-table thead')).toContainText(/Missing evidence/i);
  2141 |     await expect(page.locator('.investment-generator-table thead')).toContainText(/Exit judgement/i);
  2142 |     await expect(page.locator('.investment-generator-table thead')).toContainText(/Investment action/i);
  2143 |     await expect(page.locator('.investment-generator-table thead')).toContainText(/SMG core lab/i);
  2144 |     await expect(page.locator('.investment-generator-table tbody tr')).toHaveCount(51);
  2145 |     await expect(page.locator('.investment-generator-table tbody tr').first()).toContainText(/Two people buy the same shares.*Can one be investing while the other is speculating/i);
  2146 |     await expect(page.locator('.investment-generator-table tbody tr').first()).toContainText(/main purpose.*expected payoff source.*evidence used.*possible loss/i);
  2147 |     await expect(page.locator('[data-syllabus-lesson]')).toHaveCount(51);
  2148 |     await expect(page.locator('[data-syllabus-lesson] .investment-lesson-title-zh')).toHaveCount(51);
  2149 |     await expect(page.locator('[data-syllabus-lesson] .investment-lesson-title-zh').first()).toHaveText('什么是投资？');
  2150 |     await expect(page.locator('[data-exam-checkpoint]')).toHaveCount(6);
  2151 |     await expect(page.locator('[data-syllabus-lesson]').first()).toBeVisible();
  2152 |     await expect(page.locator('[data-syllabus-lesson]').last()).toBeVisible();
  2153 |     await expect(page.locator('[data-smg-core-lab]')).toHaveCount(51);
  2154 |     await expect(page.locator('[data-smg-milestone]')).toHaveCount(6);
  2155 |     await expect(page.locator('[data-smg-evidence-checkpoint]')).toHaveCount(9);
  2156 |     await expect(page.locator('[data-syllabus-lesson]').first()).toContainText(/SMG core lab[\s\S]*Required team lab[\s\S]*four-category classifier/i);
  2157 |     await expect(page.locator('[data-syllabus-lesson]').last()).toContainText(/SMG core lab[\s\S]*Summative unit output[\s\S]*Defend the final portfolio/i);
  2158 |     await expect(page.locator('[data-syllabus-lesson][data-lesson="1"] .investment-lesson-routes a')).toHaveCount(3);
  2159 |     await expect(page.locator('[data-syllabus-lesson][data-lesson="2"] .investment-lesson-routes a')).toHaveCount(3);
  2160 |     await expect(page.locator('[data-syllabus-lesson][data-lesson="3"] .investment-lesson-routes a')).toHaveCount(3);
  2161 |     await expect(page.locator('[data-syllabus-lesson][data-lesson="4"] .investment-lesson-routes')).toHaveCount(0);
  2162 |     await expectNoHorizontalOverflow(page);
  2163 |   });
  2164 | 
  2165 |   test('@legacy investment SMG workbook guide and team log work', async ({ page }) => {
  2166 | 
  2167 |     await page.goto(pageUrl('investment-analysis/smg-workbook-course-guide.html'));
  2168 |     await expect(page.getByRole('heading', { name: /SMG Workbook Course Guide/i })).toBeVisible();
  2169 |     await expect(page.locator('[data-workbook-rules] li')).toHaveCount(8);
  2170 |     await expect(page.locator('[data-workbook-calendar] tr')).toHaveCount(Object.keys(financialDecisionCourseMap.stockMarketGameIntegration.workbook.lessonPlan).length);
  2171 |     await expect(page.locator('[data-workbook-calendar] tr').first()).toContainText(/Lesson 2[\s\S]*1-3, 5-6 and 8/i);
  2172 |     await expect(page.locator('[data-workbook-calendar]')).toContainText(/Any instruction to buy|trade override|approval gate/i);
  2173 |     await expect(page.getByRole('link', { name: /Open official workbook/i })).toHaveAttribute('href', 'references/stock-market-game/program-guides/SMG_Essentials_Workbook.pdf');
  2174 |     await expect(page.getByRole('link', { name: /Team evidence log/i })).toHaveAttribute('href', 'smg-team-evidence-log.html');
  2175 |     await expectNoHorizontalOverflow(page);
  2176 | 
  2177 |     await page.goto(pageUrl('investment-analysis/smg-team-evidence-log.html'));
  2178 |     await expect(page.getByRole('heading', { name: /SMG Team Evidence and Decision Log/i })).toHaveCount(2);
  2179 |     await expect(page.locator('.workbook-log-entry')).toHaveCount(6);
  2180 |     await expect(page.locator('.workbook-log-entry').first()).toContainText(/Dated evidence[\s\S]*Plan and risk fit[\s\S]*Team decision[\s\S]*Review trigger/i);
  2181 |     await expect(page.locator('body')).toContainText(/Never write a password/i);
  2182 |     await expectNoHorizontalOverflow(page);
  2183 |     await page.emulateMedia({ media: 'print' });
  2184 |     await expect(page.locator('.workbook-nav')).toBeHidden();
  2185 |     await expect(page.locator('.workbook-log-sheet')).toHaveCount(2);
  2186 |   });
  2187 | 
  2188 |   test('@legacy investment print views use complete definitions without fill-in-the-blanks', async ({ page }) => {
  2189 |     const handouts = [
  2190 |       { path: 'investment-analysis/unit-1/lesson-1/index.html', sectionCount: 5, terms: ['Financial investment', 'Speculation', 'Saving'] },
  2191 |       { path: 'investment-analysis/unit-1/lesson-2/index.html', sectionCount: 3, terms: ['Investment', 'Return', 'Financial goal'] },
  2192 |       { path: 'investment-analysis/unit-1/lesson-3/index.html', sectionCount: 3, terms: ['Time horizon', 'Liquidity need', 'Suitability'] },
  2193 |     ];
  2194 | 
  2195 |     for (const handout of handouts) {
  2196 |       await page.goto(pageUrl(handout.path) + '?view=print');
  2197 |       await expect(page.locator('body')).toHaveClass(/subject-economics/);
  2198 |       await expect(page.locator('body')).toHaveClass(/is-handout-mode/);
  2199 |       await expect(page.locator('.handoutSection')).toHaveCount(handout.sectionCount);
  2200 |       await expect(page.locator('.handoutDefinition')).toHaveCount(handout.terms.length);
  2201 |       await expect(page.locator('.handoutBlock:has(.handoutDefinition) > h3')).toHaveText(handout.terms);
  2202 |       await expect(page.locator('.handoutDefinitionZh')).toHaveCount(handout.terms.length);
  2203 |       await expect(page.locator('.handoutBlank, .handoutAnswerToggle')).toHaveCount(0);
  2204 |       await expect(page.locator('.handoutDocument')).not.toContainText(/in this handout|^Here,/i);
  2205 |       await expectNoHorizontalOverflow(page);
  2206 |     }
  2207 |   });
  2208 | 
  2209 |   test('@legacy investment company-analysis syllabus option works', async ({ page }, testInfo) => {
  2210 |     test.skip(testInfo.project.name.includes('phone'), 'Phone coverage stays on the default syllabus map.');
  2211 | 
  2212 |     await page.goto(pageUrl('investment-analysis/syllabus-company-analysis.html'));
  2213 |     await expect(page.getByRole('heading', { name: /^Archived: Investment Analysis — Evidence-Based Investing$/i })).toBeVisible();
  2214 |     await expect(page.getByRole('heading', { name: /^Decision-first evidence-based investing$/i })).toBeVisible();
  2215 |     await expect(page.getByRole('heading', { name: /^Hook, key idea, try it, decide$/i })).toBeVisible();
  2216 |     await expect(page.getByRole('heading', { name: /^A practical investor workflow$/i })).toBeVisible();
  2217 |     await expect(page.getByRole('heading', { name: /^50-lesson evidence-based investing map$/i })).toBeVisible();
  2218 |     await expect(page.locator('.investment-generator-table tbody tr')).toHaveCount(50);
  2219 |     await expect(page.locator('.investment-generator-table tbody tr').first()).toContainText(/Would you buy shares in Tencent\? Give one reason\./i);
  2220 |     await expect(page.locator('.investment-generator-table tbody tr').first()).toContainText(/dated evidence on potential return, risk, price, source limitations and investor fit/i);
  2221 |     await expect(page.locator('[data-syllabus-lesson]').first()).toContainText(/Tencent/i);
  2222 |     await expect(page.locator('[data-syllabus-lesson]').first()).toContainText(/Practical investing action/i);
  2223 |     await expect(page.locator('[data-syllabus-lesson][data-lesson="5"]')).toContainText(/HKEX/i);
  2224 |     await expect(page.locator('[data-syllabus-lesson][data-lesson="9"]')).toContainText(/ChinaAMC CSI 300 ETF/i);
  2225 |     await expect(page.locator('body')).toContainText(/Archived 13 July 2026/i);
  2226 |     await expect(page.locator('body')).not.toContainText(/Personal Finance/i);
  2227 |     await expect(page.locator('body')).not.toContainText(/course-map-company-analysis-data\.js/i);
  2228 |     await expectNoHorizontalOverflow(page);
  2229 |   });
  2230 | 
  2231 |   test('@responsive investment course map fits phone width', async ({ page }, testInfo) => {
  2232 |     test.skip(!testInfo.project.name.includes('phone'), 'Responsive investment course map coverage is phone-only.');
  2233 | 
  2234 |     await page.goto(pageUrl('investment-analysis/syllabus.html'));
  2235 |     await expect(page.getByRole('heading', { name: /Investment and Financial Decision-Making/i })).toBeVisible();
> 2236 |     await expect(page.locator('[data-syllabus-lesson]')).toHaveCount(51);
       |                                                          ^ Error: expect(locator).toHaveCount(expected) failed
  2237 |     await expect(page.locator('[data-exam-checkpoint]')).toHaveCount(6);
  2238 |     await expect(page.locator('.investment-generator-table tbody tr')).toHaveCount(51);
  2239 |     await expectNoHorizontalOverflow(page);
  2240 |   });
  2241 | 
  2242 |   test('@responsive investment course and quiz fit phone width', async ({ page }, testInfo) => {
  2243 |     test.skip(true, 'Superseded by the native Economics-renderer Investment Analysis coverage.');
  2244 |     test.setTimeout(60000);
  2245 |     test.skip(!testInfo.project.name.includes('phone'), 'Responsive investment smoke is phone-only.');
  2246 | 
  2247 |     const newLessonPath = 'investment-analysis/unit-1/lesson-1/index.html';
  2248 |     const lessonPath = 'investment-analysis/unit-1/lesson-2/index.html';
  2249 | 
  2250 |     await page.goto(pageUrl('investment-analysis/index.html'));
  2251 |     await expect(page.getByRole('heading', { name: /Investment and Financial Decision-Making/i }).first()).toBeVisible();
  2252 |     await expect(page.locator('body')).toContainText(/goals, evidence, risk and portfolio choices/i);
  2253 |     await expect(page.locator('#start-course + #investment-overview')).toHaveCount(1);
  2254 |     await expectNoHorizontalOverflow(page);
  2255 | 
  2256 |     await page.goto(pageUrl(newLessonPath));
  2257 |     await expect(page.locator('.invSlide.is-active')).toContainText(/What is investment\?/i);
  2258 |     await goToInvestmentSlide(page, { type: 'classificationTask', title: 'Classify the four decisions' }, newLessonPath);
  2259 |     await expect(page.locator('.invSlide.is-active .invClassificationCategory')).toHaveCount(4);
  2260 |     await expect(page.locator('.invSlide.is-active .invClassificationItem')).toHaveCount(4);
  2261 |     await revealInvestmentSlide(page);
  2262 |     await expect(page.locator('.invSlide.is-active .invClassificationResult.is-revealed')).toHaveCount(4);
  2263 |     await expectInvestmentSlideFits(page, 'new lesson 1 classification phone');
  2264 |     await expectNoHorizontalOverflow(page);
  2265 | 
  2266 |     await page.goto(pageUrl(lessonPath));
  2267 |     await expect(page.locator('.invSlide.is-active')).toBeVisible();
  2268 |     await expect(page.locator('.invCounter')).toHaveText(/1 \/ \d+/);
  2269 |     await expectInvestmentSlideFits(page, 'lesson 1 first slide phone');
  2270 |     await expectInvestmentRepresentativeSlidesFit(
  2271 |       page,
  2272 |       lessonPath,
  2273 |       'lesson 1 phone',
  2274 |       ['section', 'discussion', 'outcomes', 'term', 'flow', 'visualGrid', 'compare', 'quiz', 'yesNoCheck', 'judgementFrame', 'answer', 'exam']
  2275 |     );
  2276 |     await goToInvestmentSlide(page, { type: 'visualGrid', title: 'Welcome to the Stock Market Game!' }, lessonPath);
  2277 |     await expect(page.locator('.invSlide.is-active .invVisualGridCard')).toHaveCount(4);
  2278 |     await expectInvestmentSlideFits(page, 'lesson 1 SMG welcome phone');
  2279 |     await goToInvestmentSlide(page, { type: 'visualGrid', title: 'Complete your goal tables in the workbook' }, lessonPath);
  2280 |     await expect(page.locator('.invSlide.is-active .invVisualGridCard')).toHaveCount(2);
  2281 |     await expect(page.locator('.invSlide.is-active .invFocusPrompt')).toContainText(/Workbook pp\. 5-6/i);
  2282 |     await expectInvestmentSlideFits(page, 'lesson 1 workbook goal tables phone');
  2283 |     await goToInvestmentSlide(page, { type: 'flow', title: 'What will your team do during the course?' }, lessonPath);
  2284 |     for (let revealCount = 1; revealCount <= 4; revealCount += 1) {
  2285 |       await page.locator('.invSlide.is-active .invSlideHeader').click();
  2286 |       await expect(page.locator('.invSlide.is-active .invStep.is-revealed')).toHaveCount(revealCount);
  2287 |     }
  2288 |     await expect(page.locator('.invSlide.is-active .invStepTitleZh')).toHaveText(['学习', '研究', '决策', '复盘']);
  2289 |     await expectInvestmentSlideFits(page, 'lesson 1 SMG journey reveal phone');
  2290 |     await goToInvestmentSlide(page, { type: 'visualGrid', title: 'Open the team evidence record' }, lessonPath);
  2291 |     await expect(page.locator('.invSlide.is-active')).toContainText(/team evidence row/i);
  2292 |     await expectInvestmentSlideFits(page, 'lesson 1 SMG evidence lab phone');
  2293 |     await goToInvestmentSlide(page, { type: 'discussion', title: 'What does ‘make more money’ leave out?' }, lessonPath);
  2294 |     await page.getByRole('button', { name: /^Show possible answer$/i }).click();
  2295 |     await expect(page.locator('.invSlide.is-active .invDiscussionAnswerSentenceZh')).toBeVisible();
  2296 |     await expect(page.locator('.invSlide.is-active .invDiscussionAnswerPanel > p')).toHaveCount(2);
  2297 |     await expectInvestmentSlideFits(page, 'lesson 1 one-sentence bilingual discussion reveal phone');
  2298 |     await goToInvestmentSlide(page, { type: 'flow', title: 'What should you check before investing?' }, lessonPath);
  2299 |     for (let revealCount = 1; revealCount <= 3; revealCount += 1) {
  2300 |       await page.locator('.invSlide.is-active .invSlideHeader').click();
  2301 |       await expect(page.locator('.invSlide.is-active .invStep.is-revealed')).toHaveCount(revealCount);
  2302 |     }
  2303 |     await expect(page.locator('.invSlide.is-active .invStepTitleZh')).toHaveText(['目标', '资金使用', '可能损失']);
  2304 |     await expectInvestmentSlideFits(page, 'lesson 1 decision checks reveal phone');
  2305 |     await goToInvestmentSlide(page, { type: 'term', title: 'Financial goal' }, lessonPath);
  2306 |     await expect(page.locator('.invSlide.is-active .invTermExamples li')).toHaveCount(3);
  2307 |     await expect(page.locator('.invSlide.is-active .invTermExamples li small')).toHaveCount(3);
  2308 |     await expectInvestmentSlideFits(page, 'lesson 1 definition examples phone');
  2309 |     await goToInvestmentSlide(page, { type: 'compare', title: 'Short-term and long-term goals' }, lessonPath);
  2310 |     await expect(page.locator('.invSlide.is-active .invCompareListItem')).toHaveCount(4);
  2311 |     await expectInvestmentSlideFits(page, 'lesson 1 short- and long-term goal examples phone');
  2312 |     await goToInvestmentSlide(page, { type: 'answer', title: 'Classify the goals' }, lessonPath);
  2313 |     await expect(page.locator('.invSlide.is-active .invCheckItem')).toHaveCount(4);
  2314 |     await expectInvestmentSlideFits(page, 'lesson 1 goal classification phone');
  2315 |     await goToInvestmentSlide(page, { type: 'judgementFrame', title: 'Write one judgement about one goal' }, lessonPath);
  2316 |     await expect(page.locator('.invSlide.is-active .invJudgementStage')).toHaveCount(4);
  2317 |     await expect(page.locator('.invSlide.is-active .invJudgementStage > strong')).toHaveText([
  2318 |       'Choose a goal',
  2319 |       'State the next step',
  2320 |       'Give one reason',
  2321 |       'Add one condition',
  2322 |     ]);
  2323 |     await expectInvestmentSlideFits(page, 'lesson 1 output judgement frame phone');
  2324 |     await goToInvestmentSlide(page, { type: 'answer', title: 'Exit ticket' }, lessonPath);
  2325 |     await expect(page.locator('.invSlide.is-active .blank')).toHaveCount(8);
  2326 |     await expectInvestmentSlideFits(page, 'lesson 1 fill-blank exit ticket phone');
  2327 |     await revealInvestmentSlide(page);
  2328 |     await expect(page.locator('.invSlide.is-active .blank.is-revealed')).toHaveCount(8);
  2329 |     await expectInvestmentSlideFits(page, 'lesson 1 fill-blank exit ticket revealed phone');
  2330 |     await expectNoHorizontalOverflow(page);
  2331 | 
  2332 |     await page.goto(pageUrl(lessonPath) + '?view=print');
  2333 |     await expect(page.locator('.handoutSection')).toHaveCount(2);
  2334 |     await expect(page.locator('.handoutDefinitionItem')).toHaveCount(3);
  2335 |     await expect(page.locator('.handoutDefinitionZh')).toHaveCount(3);
  2336 |     await expect(page.locator('.handoutBlank')).toHaveCount(10);
```