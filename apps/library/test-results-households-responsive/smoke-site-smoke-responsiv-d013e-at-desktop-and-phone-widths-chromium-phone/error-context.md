# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.js >> site smoke >> @responsive landing page renders at desktop and phone widths
- Location: tests\smoke.spec.js:1077:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.lesson-card .deck-title-zh').filter({ hasText: '银行：商业银行与中央银行' }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.lesson-card .deck-title-zh').filter({ hasText: '银行：商业银行与中央银行' }).first()

```

```yaml
- link "Skip to lessons":
  - /url: "#course-map"
- main:
  - link "学思札记首页":
    - /url: ../index.html
    - strong: 学思札记
  - navigation "Primary destinations":
    - link "IGCSE 经济学":
      - /url: index.html
    - link "A Level 经济学":
      - /url: ../a-level/index.html
    - link "投资与金融":
      - /url: ../investment-analysis/index.html
    - link "作业入口":
      - /url: http://127.0.0.1:4173/econmark/
  - paragraph: Cambridge IGCSE Economics 0455
  - heading "IGCSE Economics" [level=1]
  - paragraph: IGCSE 经济学
  - paragraph: 通过课件、测验和考试练习学习经济学概念。
  - navigation "Course resources":
    - link "View lessons":
      - /url: "#course-map"
    - link "Definitions":
      - /url: ../definitions.html
  - region "Lessons":
    - heading "Lessons" [level=2]
    - paragraph: 课件
    - navigation "Jump to a unit":
      - link "1 · The basic economic problem":
        - /url: "#unit-1"
      - link "2 · The allocation of resources":
        - /url: "#unit-2"
      - link "3 · Microeconomic decision makers":
        - /url: "#unit-3"
      - link "4 · Government and the macroeconomy":
        - /url: "#unit-4"
    - article:
      - text: Unit 1
      - heading "The basic economic problem" [level=3]
      - paragraph: 基本经济问题
      - text: "1.1"
      - heading "The basic economic problem" [level=4]
      - paragraph: 基本经济问题
      - article:
        - text: 1.1.1
        - heading "The basic economic problem" [level=5]
        - paragraph: 基本经济问题
        - link "Open lesson":
          - /url: ../lessons/unit-1-basic-economic-problem/1-1-basic-economic-problem/index.html
        - link "Handout":
          - /url: ../lessons/unit-1-basic-economic-problem/1-1-basic-economic-problem/index.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-1-basic-economic-problem/1-1-basic-economic-problem/index.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-1-basic-economic-problem/1-1-basic-economic-problem/index.html?view=flashcards
      - text: "1.2"
      - heading "Factors of production" [level=4]
      - paragraph: 生产要素
      - article:
        - text: Lesson 1 · 1.2.1
        - heading "Factors of production" [level=5]
        - paragraph: 生产要素
        - link "Open lesson":
          - /url: ../lessons/unit-1-basic-economic-problem/1-2-factors-of-production/index.html
        - link "Handout":
          - /url: ../lessons/unit-1-basic-economic-problem/1-2-factors-of-production/index.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-1-basic-economic-problem/1-2-factors-of-production/index.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-1-basic-economic-problem/1-2-factors-of-production/index.html?view=flashcards
      - article:
        - text: Lesson 2 · 1.2.1
        - heading "Enterprise and factor rewards" [level=5]
        - paragraph: 企业家才能与要素报酬
        - link "Open lesson":
          - /url: ../lessons/unit-1-basic-economic-problem/1-2-factors-of-production/lesson-2.html
        - link "Handout":
          - /url: ../lessons/unit-1-basic-economic-problem/1-2-factors-of-production/lesson-2.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-1-basic-economic-problem/1-2-factors-of-production/lesson-2.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-1-basic-economic-problem/1-2-factors-of-production/lesson-2.html?view=flashcards
    - article:
      - text: Unit 2
      - heading "The allocation of resources" [level=3]
      - paragraph: 资源配置
      - text: "2.8"
      - heading "Market economic system and market arguments" [level=4]
      - paragraph: 市场经济体制与市场论点
      - article:
        - text: 2.8.1
        - heading "Market economic system" [level=5]
        - paragraph: 市场经济体制
        - link "Open lesson":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html
        - link "Handout":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-1.html?view=flashcards
      - article:
        - text: 2.8.1
        - heading "Price mechanism" [level=5]
        - paragraph: 价格机制
        - link "Open lesson":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-2.html
        - link "Handout":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-2.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-2.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-2.html?view=flashcards
      - article:
        - text: 2.8.2
        - heading "Arguments for markets" [level=5]
        - paragraph: 支持市场的论点
        - link "Open lesson":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-3.html
        - link "Handout":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-3.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-3.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-3.html?view=flashcards
      - article:
        - text: 2.8.2
        - heading "Arguments against markets" [level=5]
        - paragraph: 反对市场的论点
        - link "Open lesson":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-4.html
        - link "Handout":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-4.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-4.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-2-allocation/2-8-market-economic-system/lesson-4.html?view=flashcards
      - text: "2.9"
      - heading "Market failure" [level=4]
      - paragraph: 市场失灵
      - article:
        - text: "2.9"
        - heading "External costs and benefits" [level=5]
        - paragraph: 外部成本与外部收益
        - link "Open lesson":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-1.html
        - link "Handout":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-1.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-1.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-1.html?view=flashcards
      - article:
        - text: "2.9"
        - heading "Merit and demerit goods" [level=5]
        - paragraph: 有益品与有害品
        - link "Open lesson":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-2.html
        - link "Handout":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-2.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-2.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-2.html?view=flashcards
      - article:
        - text: "2.9"
        - heading "Public goods" [level=5]
        - paragraph: 公共物品
        - link "Open lesson":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-3.html
        - link "Handout":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-3.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-3.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-3.html?view=flashcards
      - article:
        - text: "2.9"
        - heading "Monopoly power and evaluation" [level=5]
        - paragraph: 垄断力量与评价
        - link "Open lesson":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-4.html
        - link "Handout":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-4.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-4.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-2-allocation/2-9-market-failure/lesson-4.html?view=flashcards
      - text: Review
      - heading "End-of-unit exam review" [level=4]
      - article:
        - text: IC1 Section A
        - heading "Cocoa and chocolate exam discussion" [level=5]
        - paragraph: Discuss elasticity, supply shocks, economic sectors and the advantages of markets.
        - link "Open lesson":
          - /url: ../lessons/unit-2-allocation/2-review-cocoa-chocolate-section-a/index.html
        - link "Handout":
          - /url: ../lessons/unit-2-allocation/2-review-cocoa-chocolate-section-a/index.html?view=print
      - article:
        - text: IC1 Section A
        - heading "Market failure photo review" [level=5]
        - paragraph: Review external effects, merit and demerit goods, and changes in demand through real-world photographs.
        - link "Open lesson":
          - /url: ../lessons/unit-2-allocation/2-review-market-failure-section-a/index.html
        - link "Handout":
          - /url: ../lessons/unit-2-allocation/2-review-market-failure-section-a/index.html?view=print
    - article:
      - text: Unit 3
      - heading "Microeconomic decision makers" [level=3]
      - paragraph: 微观经济决策者
      - text: "3.1"
      - heading "Money and banking" [level=4]
      - paragraph: 货币与银行
      - article:
        - text: 3.1.1
        - 'heading "Money: forms and functions" [level=5]'
        - paragraph: 货币：形式与职能
        - link "Open lesson":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-1.html
        - link "Handout":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-1.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-1.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-1.html?view=flashcards
      - article:
        - text: 3.1.1
        - 'heading "Money: characteristics and exam practice" [level=5]'
        - paragraph: 货币：特征与考试练习
        - link "Open lesson":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-2.html
        - link "Handout":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-2.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-2.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-2.html?view=flashcards
      - article:
        - text: 3.1.2
        - heading "Commercial banks" [level=5]
        - paragraph: 商业银行
        - link "Open lesson":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-3.html
        - link "Handout":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-3.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-3.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-3.html?view=flashcards
      - article:
        - text: 3.1.2
        - heading "Central banks" [level=5]
        - paragraph: 中央银行
        - link "Open lesson":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-4.html
        - link "Handout":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-4.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-4.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-4.html?view=flashcards
      - text: "3.2"
      - heading "Households" [level=4]
      - paragraph: 家庭
      - article:
        - text: 3.2.1
        - heading "Spending, saving and borrowing" [level=5]
        - paragraph: 消费、储蓄与借款
        - link "Open lesson":
          - /url: ../lessons/unit-3-decision-makers/3-2-households/index.html
        - link "Handout":
          - /url: ../lessons/unit-3-decision-makers/3-2-households/index.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-3-decision-makers/3-2-households/index.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-3-decision-makers/3-2-households/index.html?view=flashcards
    - article:
      - text: Unit 4
      - heading "Government and the macroeconomy" [level=3]
      - paragraph: 政府与宏观经济
      - text: "4.1"
      - heading "Macroeconomic aims" [level=4]
      - paragraph: 宏观经济目标
      - article:
        - text: 4.1.1
        - heading "Macroeconomic aims" [level=5]
        - paragraph: 宏观经济目标
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-1-macroeconomic-aims/index.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-1-macroeconomic-aims/index.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-1-macroeconomic-aims/index.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-1-macroeconomic-aims/index.html?view=flashcards
      - text: "4.2"
      - heading "Fiscal policy" [level=4]
      - paragraph: 财政政策
      - article:
        - text: 4.2.1-4.2.2
        - heading "Government budget and spending" [level=5]
        - paragraph: 政府预算与支出
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-1.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-1.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-1.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-1.html?view=flashcards
      - article:
        - text: 4.2.3
        - heading "Taxation foundations" [level=5]
        - paragraph: 税收基础
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-2.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-2.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-2.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-2.html?view=flashcards
      - article:
        - text: 4.2.3
        - heading "Tax structures" [level=5]
        - paragraph: 税收结构
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-3.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-3.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-3.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-3.html?view=flashcards
      - article:
        - text: 4.2.4-4.2.5
        - heading "Expansionary and contractionary fiscal policy" [level=5]
        - paragraph: 扩张性与紧缩性财政政策
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-4.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-4.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-4.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-4.html?view=flashcards
      - article:
        - text: 4.2.6
        - heading "Effects on macroeconomic aims" [level=5]
        - paragraph: 对宏观经济目标的影响
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-5.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-5.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-5.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-2-fiscal-policy/lesson-5.html?view=flashcards
      - text: "4.3"
      - heading "Monetary policy" [level=4]
      - paragraph: 货币政策
      - article:
        - text: 4.3.1
        - heading "Money supply and monetary policy" [level=5]
        - paragraph: 货币供应与货币政策
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-1.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-1.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-1.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-1.html?view=flashcards
      - article:
        - text: 4.3.2
        - heading "Interest rates" [level=5]
        - paragraph: 利率
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-2.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-2.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-2.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-2.html?view=flashcards
      - article:
        - text: 4.3.2
        - heading "Money supply measures" [level=5]
        - paragraph: 货币供给措施
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-3.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-3.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-3.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-3.html?view=flashcards
      - article:
        - text: 4.3.3
        - heading "Effects of monetary policy" [level=5]
        - paragraph: 货币政策的影响
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-4.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-4.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-4.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-3-monetary-policy/lesson-4.html?view=flashcards
      - text: "4.4"
      - heading "Supply-side policy" [level=4]
      - paragraph: 供给侧政策
      - article:
        - text: 4.4.1
        - heading "Productive capacity and total supply" [level=5]
        - paragraph: 生产能力与总供给
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-1.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-1.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-1.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-1.html?view=flashcards
      - article:
        - text: 4.4.2
        - heading "Interventionist supply-side policies" [level=5]
        - paragraph: 干预型供给侧政策
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-2.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-2.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-2.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-2.html?view=flashcards
      - article:
        - text: 4.4.2
        - heading "Market-based supply-side policies" [level=5]
        - paragraph: 市场型供给侧政策
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-3.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-3.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-3.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-3.html?view=flashcards
      - article:
        - text: 4.4.3
        - heading "Effects of supply-side policy" [level=5]
        - paragraph: 供给侧政策的影响
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-4.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-4.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-4.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-4.html?view=flashcards
      - article:
        - text: 4.4.3
        - heading "Limitations and evaluation" [level=5]
        - paragraph: 局限与评价
        - link "Open lesson":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-5.html
        - link "Handout":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-5.html?view=print
        - link "Quiz":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-5.html?view=quiz
        - link "Flashcards":
          - /url: ../lessons/unit-4-government/4-4-supply-side-policy/lesson-5.html?view=flashcards
  - text: 学思札记 · 个人学习与教学资料
  - link "教学心得与网站说明":
    - /url: ../pedagogy.html
  - text: · 独立整理的资料，未经 Cambridge International Education 背书。
```

# Test source

```ts
  1031 |       const isHistoricPhoto = visual.src.endsWith('/enterprise-steve-jobs-keynote.jpg');
  1032 |       expect(dimensions.width).toBeGreaterThanOrEqual(isHistoricPhoto ? 1200 : 2200);
  1033 |       expect(dimensions.height).toBeGreaterThanOrEqual(isHistoricPhoto ? 900 : 1500);
  1034 |       await expectNoHorizontalOverflow(page);
  1035 |     }
  1036 | 
  1037 |     const yesNoNumber = await page.evaluate(() => (
  1038 |       window.IGCSE.lesson.slides.findIndex((slide) => slide.title === 'Land: Yes or No?') + 1
  1039 |     ));
  1040 |     await page.goto(`${pageUrl(lessonPath)}#${yesNoNumber}`);
  1041 |     await expect(page.locator('.slide.is-active .yesNoStatement')).toHaveCount(3);
  1042 |     await expect(page.locator('.slide.is-active .yesNoAnswer.is-visible')).toHaveCount(0);
  1043 | 
  1044 |     await page.goto(`${pageUrl(lessonPath)}?view=quiz`);
  1045 |     await expect(page.locator('.quizQuestion')).toHaveCount(5);
  1046 |     await expectNoHorizontalOverflow(page);
  1047 | 
  1048 |     await page.goto(`${pageUrl(lessonPath)}?view=flashcards`);
  1049 |     await expect(page.locator('.flashcardPosition')).toHaveText('5 left');
  1050 |     await expectNoHorizontalOverflow(page);
  1051 | 
  1052 |     await page.goto(`${pageUrl(lessonPath)}?view=print`);
  1053 |     await expect(page.locator('.handoutDocument')).toBeVisible();
  1054 |     await expectNoHorizontalOverflow(page);
  1055 |   });
  1056 | 
  1057 |   test('@responsive phone layout keeps core pages usable', async ({ page }, testInfo) => {
  1058 |     test.skip(!testInfo.project.name.includes('phone'), 'Responsive smoke is phone-only.');
  1059 | 
  1060 |     await page.goto(pageUrl('index.html'));
  1061 |     await expect(page.getByRole('heading', { name: /^课件与作业$/ })).toBeVisible();
  1062 |     await expect(page.locator('.entry-card')).toHaveCount(4);
  1063 |     await expect(page.locator('[data-entry="homework"]')).toHaveAttribute('href', localHomeworkUrl);
  1064 |     await expectNoHorizontalOverflow(page);
  1065 | 
  1066 |     await page.goto(pageUrl('economics/index.html'));
  1067 |     await expect(page.getByRole('heading', { name: /^IGCSE Economics$/i })).toBeVisible();
  1068 |     await expectNoHorizontalOverflow(page);
  1069 | 
  1070 |     await page.goto(pageUrl('lessons/unit-4-government/4-1-macroeconomic-aims/index.html'));
  1071 |     await expect(page.locator('.slide.is-active')).toBeVisible();
  1072 |     await expect(page.getByRole('button', { name: /^Student selector$/i })).toBeVisible();
  1073 |     await expect(page.locator('.lessonModeMenu')).toBeHidden();
  1074 |     await expectNoHorizontalOverflow(page);
  1075 |   });
  1076 | 
  1077 |   test('@responsive landing page renders at desktop and phone widths', async ({ page }) => {
  1078 |     await page.goto(pageUrl('index.html'));
  1079 | 
  1080 |     await expect(page.getByRole('heading', { name: /^课件与作业$/ })).toBeVisible();
  1081 |     await expect(page.locator('[data-entry="economics"]')).toHaveAttribute('href', 'economics/index.html');
  1082 |     await expect(page.locator('[data-entry="a-level"]')).toHaveAttribute('href', 'a-level/index.html');
  1083 |     await expect(page.locator('[data-entry="investment"]')).toHaveAttribute('href', 'investment-analysis/index.html');
  1084 |     await expect(page.locator('[data-entry="homework"]')).toHaveAttribute('href', localHomeworkUrl);
  1085 |     await expect(page.getByText('通过课件、测验和考试练习学习经济学概念。')).toBeVisible();
  1086 |     await expect(page.getByText('结合课件、交互图表和考试练习学习宏观经济学。')).toBeVisible();
  1087 |     await expect(page.getByText('通过课堂案例和计算练习学习投资回报、金融市场与财务决策。')).toBeVisible();
  1088 |     await expect(page.getByText('登录已有账户，使用老师分享的作业代码提交作答并查看暂定反馈。')).toBeVisible();
  1089 |     await expect(page.getByRole('link', { name: /^Start Lesson 1$/i })).toHaveCount(0);
  1090 |     await expect(page.getByRole('link', { name: /Business 0264/i })).toHaveCount(0);
  1091 |     await expect(page.locator('a[href^="business/"]')).toHaveCount(0);
  1092 |     await expect(page.getByRole('link', { name: /^IGCSE 术语$/ })).toHaveAttribute('href', 'definitions.html');
  1093 |     await expect(page.getByRole('link', { name: /^教学心得与网站说明$/ })).toBeVisible();
  1094 |     await expect(page.getByRole('link', { name: /^Open lesson$/i })).toHaveCount(0);
  1095 |     await expectNoHorizontalOverflow(page);
  1096 | 
  1097 |     await page.goto(pageUrl('economics/index.html'));
  1098 |     await expect(page.locator('link[href="../assets/css/course-home.css"]')).toHaveCount(1);
  1099 |     await expect(page.locator('.landing-nav')).toHaveCount(1);
  1100 |     await expect(page.getByRole('link', { name: /^投资与金融$/ })).toHaveAttribute('href', '../investment-analysis/index.html');
  1101 |     await expect(page.getByRole('link', { name: /^Definitions$/i })).toHaveAttribute('href', '../definitions.html');
  1102 |     await expect(page.locator('#unit-2')).toBeVisible();
  1103 |     await expect(page.locator('#unit-3')).toBeVisible();
  1104 |     await expect(page.locator('#unit-4')).toBeVisible();
  1105 |     await expect(page.locator('.unit-step.is-empty').first()).toBeHidden();
  1106 |     await expect(page.getByRole('link', { name: /教学心得与网站说明/ }).first()).toHaveAttribute('href', '../pedagogy.html');
  1107 |     await expect(page.getByRole('heading', { name: /^IGCSE Economics$/i })).toBeVisible();
  1108 |     await expect(page.locator('.hero .author-line')).toHaveCount(0);
  1109 |     await expect(page.getByText(/未经 Cambridge International Education 背书/)).toBeVisible();
  1110 |     await expect(page.getByRole('link', { name: /^Open lesson$/i }).first()).toBeVisible();
  1111 |     await expect(page.getByRole('link', { name: /^Handout$/i }).first()).toBeVisible();
  1112 |     await expect(page.getByRole('link', { name: /^Quiz$/i }).first()).toBeVisible();
  1113 |     await expect(page.getByRole('link', { name: /^Flashcards$/i }).first()).toBeVisible();
  1114 |     await expect(page.locator('.section-title-zh')).toHaveText('课件');
  1115 | 
  1116 |     for (const [title, translation] of Object.entries(hierarchyTitleTranslations.units)) {
  1117 |       const unit = page.locator('.unit-summary').filter({ hasText: title });
  1118 |       await expect(unit.locator('.unit-title-zh')).toHaveText(translation);
  1119 |     }
  1120 | 
  1121 |     for (const [title, translation] of Object.entries(hierarchyTitleTranslations.topics)) {
  1122 |       const topic = page.locator('.topic-copy').filter({ has: page.getByRole('heading', { name: title, level: 4 }) });
  1123 |       await expect(topic.locator('.topic-title-zh')).toHaveText(translation);
  1124 |     }
  1125 | 
  1126 |     const macroLessonCard = page.locator('.lesson-card').filter({ hasText: /4\.1\.1/i });
  1127 |     await expect(macroLessonCard.getByRole('heading', { name: /Macroeconomic aims/i })).toBeVisible();
  1128 |     await expect(macroLessonCard.locator('.deck-title-zh')).toHaveText(deckTitleTranslations['Macroeconomic aims']);
  1129 | 
  1130 |     for (const translation of Object.values(deckTitleTranslations)) {
> 1131 |       await expect(page.locator('.lesson-card .deck-title-zh', { hasText: translation }).first()).toBeVisible();
       |                                                                                                   ^ Error: expect(locator).toBeVisible() failed
  1132 |     }
  1133 | 
  1134 |     await expect(page.getByRole('link', { name: /^Open lesson$/i })).toHaveCount(28);
  1135 |     await expect(page.getByRole('link', { name: /^Handout$/i })).toHaveCount(28);
  1136 |     await expect(page.getByRole('link', { name: /^Quiz$/i })).toHaveCount(26);
  1137 |     await expect(page.getByRole('link', { name: /^Flashcards$/i })).toHaveCount(26);
  1138 |     await expect(page.getByRole('link', { name: /^Handout$/i }).first()).toHaveAttribute('href', /view=print/);
  1139 |     await expect(page.getByRole('link', { name: /^Quiz$/i }).first()).toHaveAttribute('href', /view=quiz/);
  1140 |     await expect(page.getByRole('link', { name: /^Flashcards$/i }).first()).toHaveAttribute('href', /view=flashcards/);
  1141 | 
  1142 |     await expectNoHorizontalOverflow(page);
  1143 | 
  1144 |     const macroHeadingBox = await page
  1145 |       .locator('.lesson-card')
  1146 |       .filter({ hasText: /4\.1\.1/i })
  1147 |       .getByRole('heading', { name: /Macroeconomic aims/i })
  1148 |       .boundingBox();
  1149 |     const viewport = page.viewportSize();
  1150 | 
  1151 |     expect(macroHeadingBox).not.toBeNull();
  1152 |     expect(macroHeadingBox.x).toBeGreaterThanOrEqual(0);
  1153 |     expect(macroHeadingBox.x + macroHeadingBox.width).toBeLessThanOrEqual(viewport.width + 1);
  1154 | 
  1155 |     for (const course of [
  1156 |       { route: 'economics/index.html', name: 'IGCSE Economics', count: 28, section: '#course-map' },
  1157 |       { route: 'a-level/index.html', name: 'A Level Economics', count: 4, section: '#lessons' },
  1158 |       { route: 'investment-analysis/index.html', name: 'Investment and finance', count: 3, section: '#course-map' },
  1159 |     ]) {
  1160 |       await page.goto(pageUrl(course.route));
  1161 |       await expect(page.getByRole('heading', { name: course.name, exact: true })).toBeVisible();
  1162 |       await expect(page.locator('.oh-primary-nav [aria-current="page"]')).toHaveText(course.name);
  1163 |       await expect(page.locator('.oh-primary-nav a')).toHaveText(['IGCSE 经济学', 'A Level 经济学', '投资与金融', '作业入口']);
  1164 |       await expect(page.locator('.oh-primary-nav a[data-oh-nav="homework"]')).toHaveAttribute('href', localHomeworkUrl);
  1165 |       await expect(page.getByRole('link', { name: 'View lessons', exact: true })).toHaveAttribute('href', course.section);
  1166 |       await page.getByRole('link', { name: 'View lessons', exact: true }).click();
  1167 |       await expect(page.getByRole('heading', { name: 'Lessons', exact: true })).toBeInViewport();
  1168 |       await expect(page.locator('.lesson-card')).toHaveCount(course.count);
  1169 |       await expect(page.locator('.lesson-card .lesson-action.primary')).toHaveText(Array(course.count).fill('Open lesson'));
  1170 |       await expect(page.locator('.section-title-zh')).toHaveText('课件');
  1171 |       const columns = await page.locator('.topic-lessons').first().evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
  1172 |       expect(columns).toBe(page.viewportSize().width <= 700 ? 1 : 2);
  1173 |       await expectNoHorizontalOverflow(page);
  1174 |     }
  1175 | 
  1176 |     await expect(page.getByRole('link', { name: 'Syllabus', exact: true })).toHaveAttribute('href', 'syllabus-2026-27.html');
  1177 |     await expect(page.getByRole('link', { name: 'Definitions', exact: true })).toHaveAttribute('href', 'definitions.html');
  1178 |     await expect(page.locator('.lesson-card a[href="lessons/1-1-2-measuring-investment-return/index.html"]')).toHaveCount(1);
  1179 |     await expect(page.locator('.lesson-card a[href="lessons/1-1-3-compound-growth/index.html"]')).toHaveCount(1);
  1180 |     await expect(page.locator('.lesson-card a[href="lessons/1-1-3-assumed-return/index.html"]')).toHaveCount(1);
  1181 |     await expect(page.locator('a[href*="unit-1/lesson-"]')).toHaveCount(0);
  1182 |   });
  1183 | 
  1184 |   test('@smoke Investment Course landing mirrors the Economics course overview', async ({ page }) => {
  1185 |     await page.goto(pageUrl('investment-analysis/index.html'));
  1186 |     await expect(page.locator('body')).toHaveClass(/course-home/);
  1187 |     await expect(page.locator('body')).toHaveClass(/investment-course-home/);
  1188 |     await expect(page.locator('.hero')).toBeVisible();
  1189 |     await expect(page.locator('.economics-priority-panel')).toHaveCount(0);
  1190 |     await expect(page.locator('.course-roadmap .unit-step.is-live')).toHaveCount(1);
  1191 |     await expect(page.locator('.unit-topics .topic-group')).toHaveCount(1);
  1192 |     await expect(page.locator('.lesson-card')).toHaveCount(6);
  1193 |     await expect(page.locator('.lesson-card .lesson-action.primary')).toHaveCount(6);
  1194 |     await expect(page.locator('a[href*="unit-1/lesson-"]')).toHaveCount(0);
  1195 |     await expect(page.locator('a[href="syllabus-2026-27.html"]')).toHaveCount(1);
  1196 |     await expectNoHorizontalOverflow(page);
  1197 |   });
  1198 | 
  1199 |   test('@smoke current Investment Course HTML lessons load from student navigation', async ({ page }) => {
  1200 |     const lessons = [
  1201 |       { path: 'investment-analysis/lessons/stock-market-game-launch/index.html', title: /Launch film/i },
  1202 |       { path: 'investment-analysis/lessons/1-1-2-measuring-investment-return/index.html', title: /Measuring investment return/i },
  1203 |       { path: 'investment-analysis/lessons/1-1-3-compound-growth/index.html', title: /Compound growth/i },
  1204 |       { path: 'investment-analysis/lessons/1-1-3-assumed-return/index.html', title: /Assumed return/i },
  1205 |       { path: 'investment-analysis/lessons/first-stock-trades/index.html', title: /Planning your first stock trades/i },
  1206 |       { path: 'investment-analysis/lessons/1-1-4-nominal-real-return/index.html', title: /Nominal and real return/i },
  1207 |     ];
  1208 | 
  1209 |     for (const lesson of lessons) {
  1210 |       await page.goto(pageUrl(lesson.path));
  1211 |       const context = { window: {} };
  1212 |       vm.runInNewContext(fs.readFileSync(path.join(root, path.dirname(lesson.path), 'slides.js'), 'utf8'), context);
  1213 |       const slideCount = context.window.INVESTMENT_COURSE.lesson.slides.length;
  1214 |       expect(slideCount).toBeGreaterThan(0);
  1215 |       await expect(page.locator('.slide')).toHaveCount(slideCount);
  1216 |       await expect(page.locator('.slide.is-active')).toHaveAttribute('data-index', '0');
  1217 |       await expect(page.locator('.slide.is-active')).toContainText(lesson.title);
  1218 |       await openLessonModeMenu(page);
  1219 |       await expect(page.getByRole('link', { name: 'Investment course', exact: true })).toHaveAttribute('href', /investment-analysis\/index\.html$/);
  1220 |       await page.keyboard.press('Escape');
  1221 |       await expect(page.locator('script[src="../../course-assets/js/presentation.js"]')).toHaveCount(1);
  1222 |       await expectNoHorizontalOverflow(page);
  1223 |     }
  1224 |   });
  1225 | 
  1226 |   test('@smoke Investment teaching sequence brings orders before the first weekend', async ({ page }) => {
  1227 |     await page.goto(pageUrl('investment-analysis/syllabus-2026-27.html'));
  1228 |     await expect(page.locator('.lesson')).toHaveCount(33);
  1229 |     const numbers = await page.locator('.lesson__number').allTextContents();
  1230 |     expect(numbers).toEqual(Array.from({length: 33}, (_, i) => `Lesson ${i + 1}`));
  1231 |     await expect(page.locator('#lesson-18')).toContainText('Wed Sep 16');
```