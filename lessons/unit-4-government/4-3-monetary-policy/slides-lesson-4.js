/* ============================================================
   Lesson 4.3 - Monetary policy lesson 4
   Cambridge IGCSE Economics 0455 - Unit 4: Government and the macroeconomy

   Syllabus source: ../../../references/igcse-economics-syllabus-2027-2029.md
   Definitions source: ../../../references/igcse-economics-definitions-2026.md
   Paper 2 mark-scheme archive: ../../../references/paper-2-mark-schemes-2023-2025/
   Focus: 4.3.3 macroeconomic effects, limitations and Paper 2 evaluation.
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.monetaryPolicy;

IGCSE.lesson = {
  meta: {
    code: '4.3.3',
    unit: 'Unit 4 - Government and the macroeconomy',
    title: 'Monetary policy lesson 4: effects and limitations - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Monetary policy lesson 4',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow: 'Overview',
      title: 'Effects and limitations of monetary policy',
      zhTitle: '货币政策的影响与局限性',
      subtitle: 'Monetary policy lesson 4 - 4.3.3',
      kicker: 'Use the macro aims to judge whether a policy is likely to work.',
      visual: photos.visualPauseFomcBoardRoom,
      sources: [
        {
          label: 'Syllabus',
          ref: 'Cambridge IGCSE Economics 0455, 4.3.3',
          note: 'Effects of monetary policy on spending, saving, borrowing, investment, output, cyclical unemployment, inflation and imports.',
        },
      ],
    },
    {
      type: 'peerTask',
      taskType: 'definitionRecall',
      eyebrow: 'Recall',
      title: 'Recall last lesson',
      prompt: 'On paper, write a simple definition for each term. Use one sentence for each.',
      stepsLabel: 'Write these definitions',
      definitionItems: [
        {
          label: '1',
          term: 'Contractionary monetary policy',
          answer: 'Contractionary monetary policy uses higher interest rates or reduced money supply to reduce consumer expenditure, investment, aggregate demand and inflationary pressure.',
        },
        {
          label: '2',
          term: 'Bank lending',
          answer: 'Bank lending means banks provide loans to households or firms that want to borrow money.',
        },
        {
          label: '3',
          term: 'Foreign exchange rate',
          answer: 'A foreign exchange rate is the price of one currency in terms of another currency.',
        },
      ],
      sharePrompt: 'Compare definitions with a partner, then improve one word or phrase before the reveal.',
      sources: [
        {
          label: 'Definitions',
          ref: 'IGCSE Economics definitions 2026',
          note: 'Contractionary monetary policy, lending and foreign exchange rate recall.',
        },
      ],
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'One policy, several aims',
      question: 'A central bank increases the money supply during weak economic growth. What is one possible benefit and one possible risk?',
      zh: '中央银行在经济增长疲弱时增加货币供给。一个可能的好处和一个可能的风险是什么？',
      answer: 'A possible benefit is higher bank lending, spending and investment, which may raise aggregate demand and reduce cyclical unemployment. A possible risk is demand-pull inflation if output cannot rise as fast as spending.',
      answerZh: '可能的好处是银行贷款、支出和投资增加，从而提高总需求并减少周期性失业。可能的风险是，如果产出不能像支出那样快速增加，会出现需求拉动型通货膨胀。',
      visual: photos.bankLendingCashier,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Explain effects on macro aims.',
        'Judge key limitations.',
        'Write a balanced discuss answer.',
      ],
      zhBullets: [
        '解释对宏观目标的影响。',
        '判断主要局限性。',
        '写出平衡的讨论答案。',
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 1',
      title: 'Effects on macro aims',
      zhTitle: '对宏观目标的影响',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: lending',
      visual: photos.bankLendingCashier,
      notes: 'Ask students what happens when banks have more funds to lend. Bridge to spending, investment, aggregate demand and output.',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: '1. Economic growth',
      zhTitle: '目标1：经济增长',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: 'lower rates or more money may raise __________', answer: 'borrowing', zh: '较低利率或更多货币可能增加借款' },
          { text: 'consumer spending and __________ may rise', answer: 'investment', zh: '消费支出和投资可能上升' },
          { text: 'aggregate demand may __________', answer: 'increase', zh: '总需求可能增加' },
          { text: 'real GDP and output may __________', answer: 'rise', zh: '实际国内生产总值和产出可能上升' },
        ],
      ],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Expansionary monetary policy may increase consumer spending and __________.', 'investment'],
        ['2', 'This may increase aggregate __________.', 'demand'],
        ['3', 'Higher aggregate demand may increase output and economic __________.', 'growth'],
      ],
    },
    {
      type: 'visualPause',
      title: 'Visual pause: jobs',
      visual: photos.householdSaving,
      notes: 'Ask students why a household might care about firm output. Bridge to labour as a derived demand and cyclical unemployment.',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: '2. Full employment / low unemployment',
      zhTitle: '目标2：充分就业 / 低失业',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: 'aggregate demand may __________', answer: 'increase', zh: '总需求可能增加' },
          { text: 'firms may raise __________', answer: 'output', zh: '企业可能提高产出' },
          { text: 'labour is a derived __________', answer: 'demand', zh: '劳动力需求是派生需求' },
          { text: 'cyclical unemployment may __________', answer: 'fall', zh: '周期性失业可能下降' },
        ],
      ],
    },
    {
      type: 'peerTask',
      taskType: 'missingSentence',
      eyebrow: 'Pair task',
      title: 'Complete the missing sentence',
      zhPrompt: '两人合作，补全有关周期性失业的句子。',
      steps: [
        ['1', 'Expansionary monetary policy may increase aggregate demand.'],
        ['2', '__________', 'Because labour is a derived demand, firms may increase output and demand more workers.'],
        ['3', 'As a result, cyclical unemployment may fall.'],
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: 'Because labour is a derived demand, firms may increase output and demand more workers.',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: stable prices',
      visual: photos.visualPauseFomcBoardRoom,
      objectPosition: 'center center',
      notes: 'Ask students why a central bank may worry when aggregate demand rises faster than output. Bridge to price stability and demand-pull inflation.',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: '3. Price stability',
      zhTitle: '目标3：价格稳定',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: 'higher rates or less money reduce __________', answer: 'borrowing', zh: '较高利率或较少货币减少借款' },
          { text: 'spending and investment may __________', answer: 'fall', zh: '支出和投资可能下降' },
          { text: 'aggregate demand may __________', answer: 'fall', zh: '总需求可能下降' },
          { text: 'demand-pull inflation may __________', answer: 'fall', zh: '需求拉动型通货膨胀可能下降' },
        ],
      ],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Which statement is most accurate?',
      choices: [
        'Higher interest rates directly reduce all types of inflation.',
        'Higher interest rates may reduce aggregate demand and demand-pull inflation.',
        'Higher interest rates always increase aggregate demand.',
        'Higher interest rates only affect exports and imports.',
      ],
      answer: 1,
      prompt: 'Contractionary monetary policy is strongest when inflation is caused by high aggregate demand.',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: imports',
      visual: photos.visualPauseShippingContainersPort,
      objectPosition: 'center center',
      notes: 'Ask students why containers matter when household spending rises. Bridge only to the simple import-spending link.',
    },
    {
      type: 'flow',
      eyebrow: 'Brief link',
      title: '4. Balance of payments stability',
      zhTitle: '目标4：国际收支稳定',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: 'aggregate demand may __________', answer: 'increase', zh: '总需求可能增加' },
          { text: 'households and firms buy more __________', answer: 'imports', zh: '家庭和企业购买更多进口品' },
          { text: 'import spending may __________', answer: 'rise', zh: '进口支出可能上升' },
          { text: 'less extra spending goes to domestic __________', answer: 'firms', zh: '较少新增支出流向本国企业' },
        ],
      ],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Higher aggregate demand may increase spending on __________.', 'imports'],
        ['2', 'Some extra spending may go to foreign __________.', 'firms'],
        ['3', 'This is a trade-off when policy also raises output and reduces cyclical __________.', 'unemployment'],
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 2',
      title: 'Limitations of monetary policy',
      zhTitle: '货币政策的局限性',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: time lag',
      visual: photos.visualPauseFomcBoardRoom,
      objectPosition: 'center center',
      notes: 'Ask students why a central-bank decision is not the same as an immediate change in shopping, investment, output or prices.',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: '1. Time lag',
      zhTitle: '时间滞后',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: 'interest rates or money supply __________', answer: 'change', zh: '利率或货币供给发生变化' },
          { text: 'banks, households and firms respond __________', answer: 'slowly', zh: '银行、家庭和企业反应较慢' },
          { text: 'aggregate demand changes after a __________', answer: 'delay', zh: '总需求在延迟后变化' },
          { text: 'output, cyclical unemployment and prices adjust __________', answer: 'later', zh: '产出、周期性失业和价格较晚调整' },
        ],
      ],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'A time lag means policy effects happen after a __________.', 'delay'],
        ['2', 'Borrowing and investment may not respond __________.', 'immediately'],
        ['3', 'Output, cyclical unemployment and prices may adjust __________.', 'later'],
      ],
    },
    {
      type: 'visualPause',
      title: 'Visual pause: low confidence',
      visual: photos.visualPauseClosedMallShops,
      objectPosition: 'center center',
      notes: 'Ask students why low confidence could stop lower interest rates from raising spending or investment.',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: '2. Consumer and business confidence',
      zhTitle: '消费者和企业信心',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: 'interest rates fall or money supply __________', answer: 'rises', zh: '利率下降或货币供给上升' },
          { text: 'confidence remains __________', answer: 'low', zh: '信心仍然较低' },
          { text: 'households save and firms delay __________', answer: 'investment', zh: '家庭储蓄，企业推迟投资' },
          { text: 'aggregate demand rises less than __________', answer: 'expected', zh: '总需求增长低于预期' },
        ],
      ],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'If confidence is low, what may happen even when interest rates fall?',
      choices: [
        'Households may save and firms may avoid borrowing for investment.',
        'Aggregate demand must rise by a large amount immediately.',
        'Cost-push inflation must disappear.',
        'Imports must fall immediately.',
      ],
      answer: 0,
      prompt: 'Confidence affects whether households and firms choose to spend, borrow and invest.',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: cost pressure',
      visual: photos.visualPauseGasStationPricing,
      objectPosition: 'center center',
      notes: 'Ask students whether higher fuel prices are caused by too much aggregate demand or higher production costs. Bridge to cost-push inflation.',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: '3. Cannot reduce cost-push inflation',
      zhTitle: '不能降低成本推动型通货膨胀',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: 'higher rates reduce aggregate __________', answer: 'demand', zh: '较高利率降低总需求' },
          { text: 'this can reduce demand-pull __________', answer: 'inflation', zh: '这可以降低需求拉动型通货膨胀' },
          { text: 'fuel, wages or raw material costs may still __________', answer: 'rise', zh: '燃料、工资或原材料成本仍可能上升' },
          { text: 'cost-push inflation may __________', answer: 'continue', zh: '成本推动型通货膨胀可能继续' },
        ],
      ],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: '2024ON-23 Q5(d) asks whether a cut in the interest rate will reduce inflation. Which evaluation fits that question?',
      choices: [
        'A cut may reduce cost-push inflation if production costs fall, but it may raise aggregate demand and demand-pull inflation.',
        'A cut must reduce demand-pull inflation because consumers borrow more.',
        'A cut cannot affect firms investment or costs in any way.',
        'A cut only changes imports and has no inflation effect.',
      ],
      answer: 0,
      prompt: 'The exam anchor separates cost-push inflation from demand-pull inflation.',
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2024ON-23 Q5(d)',
          question: 'Discuss whether or not a cut in the interest rate will reduce inflation. [8]',
          extract: 'MS basis: lower rates may reduce production costs and cost-push inflation, but may increase borrowing, aggregate demand and demand-pull inflation.',
        },
      ],
    },
    {
      type: 'visualPause',
      title: 'Visual pause: debt risk',
      visual: photos.visualPauseCreditCardDebt,
      objectPosition: 'center center',
      notes: 'Ask students when extra borrowing helps and when it becomes a future problem. Bridge to over-indebted households and firms.',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: '4. Debt may rise',
      zhTitle: '债务可能上升',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: 'money supply __________', answer: 'increases', zh: '货币供给增加' },
          { text: 'bank lending may __________', answer: 'rise', zh: '银行贷款可能上升' },
          { text: 'households or firms may borrow too __________', answer: 'much', zh: '家庭或企业可能借款过多' },
          { text: 'future spending may be limited by __________', answer: 'debt', zh: '未来支出可能受债务限制' },
        ],
      ],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'More money supply may increase bank __________.', 'lending'],
        ['2', 'More lending can help firms expand, but it can also increase __________.', 'debt'],
        ['3', 'Over-indebted households and firms may reduce future __________.', 'spending'],
      ],
    },
    {
      type: 'visualPause',
      title: 'Visual pause: imported goods',
      visual: photos.visualPauseShippingContainersPort,
      objectPosition: 'center center',
      notes: 'Ask students why a boom in spending may not only help domestic firms. Bridge to imports as a limitation.',
    },
    {
      type: 'flow',
      eyebrow: 'Brief link',
      title: '5. Imports may rise',
      zhTitle: '进口可能上升',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: 'expansionary policy raises aggregate __________', answer: 'demand', zh: '扩张性政策提高总需求' },
          { text: 'spending on imports may __________', answer: 'rise', zh: '进口支出可能增加' },
          { text: 'some extra spending leaves the domestic __________', answer: 'economy', zh: '部分新增支出流出本国经济' },
          { text: 'the effect on domestic output may be __________', answer: 'smaller', zh: '对本国产出的影响可能较小' },
        ],
      ],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Why can higher aggregate demand create an imports trade-off?',
      choices: [
        'Some extra spending may go on imports, so domestic firms receive less of the extra demand.',
        'All extra spending must go to domestic firms.',
        'Imports always fall when aggregate demand rises.',
        'Imports are unrelated to household spending.',
      ],
      answer: 0,
      prompt: 'This is only the simple bridge: more spending can mean more imports.',
    },
    {
      type: 'section',
      eyebrow: 'Part 3',
      title: 'Paper 2 discuss practice',
      zhTitle: 'Paper 2 讨论题练习',
    },
    {
      type: 'compare',
      mode: 'fillBlanks',
      variant: 'examDiscussion',
      eyebrow: 'Exam practice',
      title: 'Discuss whether or not an increase in the money supply will benefit an economy. [8]',
      leftTitle: 'An increase in the money supply may benefit an economy',
      rightTitle: 'An increase in the money supply may not benefit an economy',
      left: [
        ['1', 'bank lending may __________', 'rise'],
        ['2', 'consumer spending and investment may __________', 'rise'],
        ['3', 'aggregate demand and output may __________', 'rise'],
        ['4', 'cyclical unemployment may __________', 'fall'],
      ],
      right: [
        ['1', 'demand-pull inflation may __________', 'rise'],
        ['2', 'spending on imports may __________', 'rise'],
        ['3', 'households and firms may borrow too __________', 'much'],
        ['4', 'future spending may be limited by __________', 'debt'],
      ],
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2025FM-22 Q3(d)',
          question: 'Discuss whether or not an increase in the money supply will benefit an economy. [8]',
          extract: 'MS basis: benefits include higher spending, investment, aggregate demand, growth, lower cyclical unemployment, bank lending and firm expansion; risks include demand-pull inflation, imports and debt.',
        },
      ],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'One side: it may benefit',
      question: 'Discuss whether or not an increase in the money supply will benefit an economy.',
      answer: 'An increase in the money supply may benefit an economy because banks may have more funds available for lending. If households and firms can borrow more easily, consumer spending and investment may rise.',
      paragraphs: [
        'An increase in the money supply may benefit an economy because banks may have more funds available for lending. If households and firms can borrow more easily, consumer spending and investment may rise.',
        'Higher consumer spending and investment can increase aggregate demand. Firms may use extra finance for firm expansion and raise output, which can increase economic growth and reduce cyclical unemployment, especially when there is spare capacity.',
      ],
      links: [
        'bank lending',
        'consumer spending',
        'investment',
        'aggregate demand',
        'economic growth',
        'cyclical unemployment',
        'demand-pull inflation',
        'imports',
        'debt',
      ],
      showLinkChips: false,
      markSchemeNote: 'This side matches the discuss mark scheme by developing benefits: bank lending, spending, investment, aggregate demand, growth and lower cyclical unemployment.',
      partialReview: ['.modelAnswerCard', '.modelAnswerNote'],
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2025FM-22 Q3(d)',
          question: 'Discuss whether or not an increase in the money supply will benefit an economy. [8]',
          extract: 'MS basis: higher spending, investment, aggregate demand, growth, lower cyclical unemployment and lending.',
        },
      ],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Other side: it may not benefit',
      question: 'Discuss whether or not an increase in the money supply will benefit an economy.',
      answer: 'An increase in the money supply may not benefit an economy if it creates demand-pull inflation, more imports or excessive debt.',
      paragraphs: [
        'An increase in the money supply may not benefit the economy if aggregate demand rises faster than output. Prices may rise, causing demand-pull inflation and reducing the internal value of money.',
        'Higher incomes and spending may also increase imports, so some extra demand goes to foreign firms rather than domestic firms. More bank lending may also leave some households and firms with too much debt.',
      ],
      links: [
        'demand-pull inflation',
        'imports',
        'debt',
      ],
      showLinkChips: false,
      markSchemeNote: 'This side matches the discuss mark scheme by developing limitations: demand-pull inflation, imports and debt.',
      partialReview: ['.modelAnswerCard', '.modelAnswerNote'],
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2025FM-22 Q3(d)',
          question: 'Discuss whether or not an increase in the money supply will benefit an economy. [8]',
          extract: 'MS basis: risks include demand-pull inflation, imports and debt.',
        },
      ],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '离堂小测',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Expansionary monetary policy may increase aggregate __________.', 'demand'],
        ['2', 'Higher aggregate demand may reduce cyclical __________.', 'unemployment'],
        ['3', 'Contractionary monetary policy is stronger against demand-pull __________ than cost-push inflation.', 'inflation'],
        ['4', 'Low confidence, time lag, debt and imports can limit policy __________.', 'effectiveness'],
      ],
    },
  ],
};
