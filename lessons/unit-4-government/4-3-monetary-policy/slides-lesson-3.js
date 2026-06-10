/* ============================================================
   Lesson 4.3 - Monetary policy lesson 3
   Cambridge IGCSE Economics 0455 - Unit 4: Government and the macroeconomy

   Syllabus source: ../../../references/igcse-economics-syllabus-2027-2029.md
   Definitions source: ../../../references/igcse-economics-definitions-2026.md
   Paper 2 mark-scheme archive: ../../../references/paper-2-mark-schemes-2023-2025/
   Focus: 4.3.2 money supply measures, with only a brief exchange-rate intro.
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.monetaryPolicy;
const fiscalPhotos = IGCSE.photos.fiscalPolicy;

IGCSE.lesson = {
  meta: {
    code: '4.3.2',
    unit: 'Unit 4 - Government and the macroeconomy',
    title: 'Monetary policy lesson 3: money supply and exchange rates - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Monetary policy lesson 3',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow: 'Overview',
      title: 'Money supply and exchange rates',
      zhTitle: '货币供给与汇率',
      subtitle: 'Monetary policy lesson 3 - 4.3.2',
      kicker: 'What can a central bank change besides interest rates?',
      visual: photos.helicopterMoneyDrop,
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
          term: 'Fiscal policy',
          answer: 'Fiscal policy uses government spending and taxation to influence economic activity and macroeconomic aims.',
        },
        {
          label: '2',
          term: 'Monetary policy',
          answer: 'Monetary policy uses interest rates, money supply and foreign exchange rates to influence aggregate demand and macroeconomic aims.',
        },
        {
          label: '3',
          term: 'Interest rate',
          answer: 'An interest rate is the cost of borrowing and the reward for saving, expressed as a percentage.',
        },
      ],
      sharePrompt: 'Compare your definitions with a partner before revealing the model answers.',
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'A helicopter drops new money',
      question: 'If extra money suddenly reaches banks, how could that help a small firm that needs a loan?',
      zh: '如果新增货币突然流向银行，这会怎样帮助一家急需贷款的小企业？',
      answer: 'Banks may have more liquidity and may lend more. A small firm could borrow to buy equipment, hire workers or expand production.',
      answerZh: '银行可能拥有更多流动性，并可能增加贷款。小企业可以借钱购买设备、雇用工人或扩大生产。',
      visual: photos.helicopterMoneyDrop,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Classify money-supply measures.',
        'Explain money-supply changes.',
        'Introduce exchange rates briefly.',
      ],
      zhBullets: [
        '判断货币供给措施。',
        '解释货币供给变化。',
        '简要介绍汇率。',
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 1',
      title: 'Money supply measures',
      zhTitle: '货币供给措施',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: extra liquidity',
      visual: photos.helicopterMoneyDrop,
      notes: 'Before teaching money-supply directions, let students observe the image silently. Ask: if more money enters the economy, who may spend or lend first, and what macro aim might improve? Keep the model answer to liquidity, bank lending, spending, output and employment; save inflation risk for the later pause.',
    },
    {
      type: 'section',
      eyebrow: 'Part 2',
      title: 'Increasing money supply',
      zhTitle: '增加货币供给',
      subtitle: 'Expansionary use',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: money reaches borrowers',
      visual: photos.bankLendingCashier,
      objectPosition: '50% 42%',
      notes: 'Before the increasing-money-supply flow, ask students to identify the action in the image. Bridge to the chain: more liquidity can make banks more willing or able to lend, so households and firms may spend or invest more.',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: 'Increasing money supply',
      zhTitle: '增加货币供给',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: '__________ rises', answer: 'money supply', zh: '货币供给上升' },
          { text: '__________ may increase', answer: 'bank lending', zh: '银行可能增加贷款' },
          { text: 'spending and __________ may rise', answer: 'investment', zh: '支出和投资可能上升' },
          { text: 'output and __________ may rise', answer: 'employment', zh: '产出和就业可能上升' },
        ]
      ],
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2025FM-22 Q3(d)',
          note: 'Money-supply discuss wording includes consumer expenditure, investment, demand, growth, employment and inflation risks.',
          extract: 'MS basis: increased money supply can raise spending and investment, but may cause demand-pull inflation.',
        },
      ],
    },
    {
      type: 'peerTask',
      taskType: 'missingSentence',
      eyebrow: 'Pair task',
      title: 'Complete the missing sentence',
      zhPrompt: '两人合作，写出一条从银行到家庭或企业的货币供给影响链。',
      steps: [
        ['1', 'Money supply rises and banks may lend more.'],
        ['2', '__________', 'Households may spend more and firms may invest more.'],
        ['3', 'Output and employment may rise, but inflationary pressure may also rise.'],
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: 'Households may spend more and firms may invest more.',
    },
    {
      type: 'section',
      eyebrow: 'Part 3',
      title: 'Reducing money supply',
      zhTitle: '减少货币供给',
      subtitle: 'Contractionary use',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: price pressure',
      visual: photos.visualPauseFomcBoardRoom,
      notes: 'Before the reducing-money-supply flow, ask why policymakers might worry if extra lending pushes demand up faster than output. Bridge to demand-pull inflationary pressure and the reason a central bank may reduce the money supply.',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: 'Reducing money supply',
      zhTitle: '减少货币供给',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: '__________ falls', answer: 'money supply', zh: '货币供给下降' },
          { text: '__________ may decrease', answer: 'bank lending', zh: '银行可能减少贷款' },
          { text: 'spending and __________ may fall', answer: 'investment', zh: '支出和投资可能下降' },
          { text: '__________ may fall', answer: 'inflationary pressure', zh: '通胀压力可能下降' },
        ]
      ],
    },
    {
      type: 'compare',
      eyebrow: 'Review',
      mode: 'fillBlanks',
      leftTitle: 'Increase money supply 增加货币供给',
      left: [
        ['1', 'liquidity __________', 'rises'],
        ['2', 'bank lending may __________', 'increase'],
        ['3', 'spending and investment may __________', 'rise'],
        ['4', 'aim: support output and __________', 'employment'],
      ],
      rightTitle: 'Reduce money supply 减少货币供给',
      right: [
        ['1', 'liquidity __________', 'falls'],
        ['2', 'bank lending may __________', 'decrease'],
        ['3', 'spending and investment may __________', 'fall'],
        ['4', 'aim: reduce inflationary __________', 'pressure'],
      ],
    },
    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'Classify the money-supply change',
      zhTitle: '政策方向',
      prompt: 'Classify each case as expansionary, contractionary or a risk.',
      zhPrompt: '判断每种情况属于扩张性、紧缩性还是风险。',
      categories: [
        { title: 'Expansionary', zhTitle: '扩张性', clue: 'support output and employment' },
        { title: 'Contractionary', zhTitle: '紧缩性', clue: 'reduce inflationary pressure' },
        { title: 'Risk', zhTitle: '风险', clue: 'side effect or trade-off' },
      ],
      items: [
        { text: 'Output is below capacity and banks are reluctant to lend to firms', answer: 'Expansionary', reason: 'A larger money supply may raise liquidity, lending, investment and employment.' },
        { text: 'Consumer spending is rising faster than output and prices are accelerating', answer: 'Contractionary', reason: 'A smaller money supply may reduce lending, spending and demand-pull inflation.' },
        { text: 'A larger money supply raises demand when firms cannot increase output', answer: 'Risk', reason: 'Extra demand without spare capacity may create inflationary pressure.' },
      ],
      sharePrompt: 'Share one classification and the macro aim it targets.',
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Increasing money supply can increase __________.', 'bank lending'],
        ['2', 'More lending may increase spending and __________.', 'investment'],
        ['3', 'Reducing money supply can reduce __________.', 'inflationary pressure'],
        ['4', 'A risk of increasing money supply too quickly is __________.', 'inflation'],
      ],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Discuss whether or not an increase in the money supply will benefit an economy. [8]',
      question: 'Discuss whether or not an increase in the money supply will benefit an economy.',
      marks: 8,
      keywordLabel: 'Use both sides',
      keywords: ['bank lending', 'investment', 'total demand', 'economic growth', 'employment', 'inflation', 'imports', 'debt'],
      prompt: 'Write one developed argument for, one developed argument against, and a final judgement.',
      visual: photos.bankLendingCashier,
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2025FM-22 Q3(d)',
          question: 'Discuss whether or not an increase in the money supply will benefit an economy.',
          extract: 'MS basis: benefits may include higher lending, spending, investment, total demand, growth and employment; risks may include demand-pull inflation, more imports, current-account pressure and debt.',
        },
      ],
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Discuss whether or not an increase in the money supply will benefit an economy. [8]',
      question: 'Discuss whether or not an increase in the money supply will benefit an economy.',
      paragraphs: [
        'An increase in the money supply may benefit an economy because banks may have more liquidity and may increase lending to households and firms.',
        'If borrowing becomes easier or cheaper, consumers may spend more and firms may invest more in capital goods, new shops or extra workers.',
        'This can increase total demand, raise output, create economic growth and reduce unemployment, especially when there is spare capacity.',
        'However, it may not benefit the economy if total demand rises faster than output. Prices may rise, causing demand-pull inflation and reducing the internal value of money.',
        'Higher incomes and spending may also increase imports, which can worsen a current account deficit or reduce a surplus. Easier credit may also leave some households and firms with too much debt.',
        'Overall, an increase in the money supply is most likely to benefit an economy when unemployment is high, firms have spare capacity and inflation is low. It is less likely to benefit an economy that is already near full capacity, has high inflation or has a large current account deficit.'
      ],
      links: ['bank lending', 'spending', 'investment', 'total demand', 'economic growth', 'employment', 'demand-pull inflation', 'imports', 'current account', 'debt', 'judgement'],
      showLinkChips: false,
      markSchemeNote: 'Full-mark answers need developed analysis on both sides plus a supported judgement. This answer covers lending, spending, investment, demand, growth and employment, then inflation, imports, current-account pressure and debt.',
      partialReview: ['.modelAnswerCard', '.modelAnswerNote'],
    },
    {
      type: 'visualPause',
      title: 'Visual pause: trade prices',
      visual: fiscalPhotos.visualPausePortTacoma,
      notes: 'Before the exchange-rate price link, ask students what kinds of goods cross this port and who pays for them. Bridge to the simple price rule only: exchange rates can change the prices of exports and imports.',
    },
    {
      type: 'discussion',
      eyebrow: 'Brief link',
      title: 'Imported phones and exchange rates',
      question: 'If the yuan buys more U.S. dollars, what might happen to the yuan price of an imported phone?',
      zh: '如果人民币能买到更多美元，进口手机的人民币价格可能会怎样变化？',
      answer: 'The imported phone may become cheaper in yuan because each yuan can buy more foreign currency. This is the basic price effect of a higher exchange rate.',
      answerZh: '进口手机的人民币价格可能下降，因为每一元人民币能买到更多外币。这是较高汇率的基本价格影响。',
      visual: photos.currencyExchangeStall,
    },
    {
      type: 'visualPause',
      title: 'Visual pause: currency exchange',
      visual: photos.currencyExchangeStall,
      objectPosition: '50% 44%',
      notes: 'Before the foreign-exchange-rate definition, ask students what the exchange counter is pricing and why the price has to compare two currencies. Keep the answer simple: it is the price of one currency in terms of another currency.',
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      definitionCue: 'Key term',
      title: 'Foreign exchange rate',
      zhTitle: '外汇汇率',
      term: 'foreign exchange rate',
      definition: 'The price of one currency in terms of another currency.',
      definitionZh: '一种货币用另一种货币表示的价格。',
      keyTerms: [
        { term: 'price', zh: '价格', explain: false },
        { term: 'one currency', zh: '一种货币', explain: false },
        { term: 'another currency', zh: '另一种货币', explain: false },
      ],
      showExamples: false,    },
    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'Exchange-rate direction',
      zhTitle: '汇率方向',
      prompt: 'Classify each basic trade-price effect.',
      zhPrompt: '判断每个基本贸易价格影响。',
      categories: [
        { title: 'Lower exchange rate', zhTitle: '较低汇率', clue: 'exports cheaper, imports dearer' },
        { title: 'Higher exchange rate', zhTitle: '较高汇率', clue: 'exports dearer, imports cheaper' },
      ],
      items: [
        { text: 'Exports may become cheaper for foreign buyers', answer: 'Lower exchange rate', reason: 'A lower currency value can reduce the foreign-currency price of exports.' },
        { text: 'Imports may become cheaper for domestic buyers', answer: 'Higher exchange rate', reason: 'A higher currency value can buy more foreign currency and reduce import prices.' },
        { text: 'Exports may become more expensive for foreign buyers', answer: 'Higher exchange rate', reason: 'A higher currency value can raise the foreign-currency price of exports.' },
      ],
      sharePrompt: 'Share one price effect only; detailed current-account analysis comes in Unit 6.',
    },
    {
      type: 'compare',
      eyebrow: 'Brief link',
      mode: 'fillBlanks',
      leftTitle: 'Lower exchange rate',
      left: [
        ['1', '__________ may become cheaper for foreign buyers.', 'exports'],
        ['2', '__________ may become more expensive.', 'imports'],
      ],
      rightTitle: 'Higher exchange rate',
      right: [
        ['1', '__________ may become more expensive for foreign buyers.', 'exports'],
        ['2', '__________ may become cheaper.', 'imports'],
      ],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Which pair lists two monetary policy measures?',
      choices: [
        'Interest rates and money supply.',
        'Income tax and government spending.',
        'Minimum wage and subsidies.',
        'Tariffs and public-sector pensions.',
      ],
      answer: 0,
      prompt: 'Past Paper 2 accepts interest rates and money supply as monetary-policy measures.',
      visual: photos.moneySupply,
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2023ON-21 Q5(a); 2025ON-22 Q4(a)',
          note: 'Recent items identify monetary-policy measures and central-bank measures for price stability.',
          extract: 'MS basis: interest rates, money supply and exchange-rate measures are accepted monetary-policy tools.',
        },
      ],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '\u79bb\u5802\u5c0f\u6d4b',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Monetary policy measures include changes in interest rates and the __________.', 'money supply'],
        ['2', 'Increasing money supply may increase bank __________.', 'lending'],
        ['3', 'Reducing money supply may reduce inflationary __________.', 'pressure'],
        ['4', 'The foreign exchange rate is the price of one __________ in terms of another.', 'currency'],
      ],
      cue: 'Answer before leaving.',
    },
  ],
};
