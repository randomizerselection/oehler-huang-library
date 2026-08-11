/* ============================================================
   Lesson 4.3 - Monetary policy lesson 2
   Cambridge IGCSE Economics 0455 - Unit 4: Government and the macroeconomy

   Syllabus source: ../../../references/igcse-economics-syllabus-2027-2029.md
   Definitions source: ../../../references/igcse-economics-definitions-2026.md
   Paper 2 mark-scheme archive: ../../../references/paper-2-mark-schemes-2023-2025/
   Focus: 4.3.2 interest rates and first-round monetary-policy effects.
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.monetaryPolicy;
const stakeholderPhotos = {
  household: IGCSE.photos.fiscalPolicy.shopping,
  saver: photos.householdSaving,
  firm: IGCSE.photos.supplySidePolicy.smallMobilePhoneShop,
  centralBank: photos.fed,
};

IGCSE.lesson = {
  meta: {
    code: '4.3.2',
    unit: 'Unit 4 - Government and the macroeconomy',
    title: 'Monetary policy lesson 2: interest rates - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Monetary policy lesson 2',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow: 'Overview',
      title: 'Interest rates',
      zhTitle: '利率',
      subtitle: 'Monetary policy lesson 2 - 4.3.2',
      kicker: 'Why does one rate affect spending, saving, borrowing and investment?',
      visual: photos.bankEngland,
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
          term: 'Money supply',
          answer: 'Money supply is the amount of money in an economy at a particular time.',
        },
        {
          label: '2',
          term: 'Central bank',
          answer: 'A central bank manages money and credit conditions for the whole economy.',
        },
        {
          label: '3',
          term: 'Monetary policy',
          answer: 'Monetary policy is central-bank policy using interest rates, money supply and foreign exchange rates to influence economic activity and macroeconomic aims.',
        },
      ],
      sharePrompt: 'Compare your definitions with a partner before revealing the model answers.',
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'Borrow or save?',
      question: 'If interest rates rise, would you be more likely to borrow money or save money? Why?',
      zh: '如果利率上升，你更可能借钱还是存钱？为什么？',
      answer: 'Higher interest rates make borrowing more expensive and saving more rewarding.',
      answerZh: '较高利率会使借款更贵，也会使储蓄回报更高。',
      visual: photos.bankEngland,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Define interest rate.',
        'Explain lower interest rates.',
        'Explain higher interest rates.',
      ],
      zhBullets: [
        '定义利率。',
        '解释较低利率。',
        '解释较高利率。',
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 1',
      title: 'Interest rate definition',
      zhTitle: '利率定义',
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'Buy now, repay later',
      question: 'A family wants a new phone today but will repay the bank next year. Why would the bank ask for more money back than it lent?',
      zh: '如果你现在使用别人的钱，以后再归还，为什么可能要多付一些？',
      answer: 'The extra money is interest: it is the cost of borrowing for the family and the reward for lending or saving for the bank.',
      answerZh: '这笔额外的钱是对贷款人等待和承担还款风险的回报。',
      visual: stakeholderPhotos.firm,
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'Interest rate: cost and reward',
      cards: [
        { title: 'Borrower', body: 'faces the cost of borrowing', visual: stakeholderPhotos.household },
        { title: 'Saver', body: 'receives the reward for saving', visual: stakeholderPhotos.saver },
        { title: 'Firm', body: 'compares borrowing cost with expected profit', visual: stakeholderPhotos.firm },
        { title: 'Central bank', body: 'changes rates to influence aggregate demand', visual: stakeholderPhotos.centralBank },
      ],
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'A borrower pays interest because they use money __________.', 'now'],
        ['2', 'A saver earns interest because they wait to __________.', 'spend'],
        ['3', 'The interest rate is usually shown as a __________.', 'percentage'],
      ],
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      definitionCue: 'Key term',
      title: 'Interest rate',
      zhTitle: '利率',
      term: 'interest rate',
      definition: 'The cost of borrowing and the reward for saving, expressed as a percentage.',
      definitionZh: '借款成本和储蓄回报，通常用百分比表示。',
      keyTerms: [
        { term: 'cost of borrowing', zh: '借款成本', note: 'the extra amount paid by a borrower' },
        { term: 'reward for saving', zh: '储蓄回报', note: 'the extra amount earned by a saver' },
        { term: 'percentage', zh: '百分比', explain: false },
      ],
      showExamples: false,    },
    {
      type: 'yesNoCheck',
      eyebrow: 'Check',
      title: 'Right or wrong?',
      prompt: 'I will show one statement at a time. Thumbs up if it is correct; thumbs down if it is wrong.',
      items: [
        { statement: 'Higher interest rates make borrowing more expensive.', answer: true, reason: 'The cost of borrowing rises.' },
        { statement: 'Higher interest rates make saving less rewarding.', answer: false, reason: 'Saving becomes more rewarding.' },
        { statement: 'Lower interest rates may encourage firms to invest.', answer: true, reason: 'Loans are cheaper, so some investment projects become more profitable.' },
        { statement: 'Lower interest rates always reduce spending.', answer: false, reason: 'They usually encourage spending, but the effect is not guaranteed.' },
      ],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'The central bank raises the interest rate from 1% to 4%. What is the most likely effect on savers and borrowers?',
      choices: [
        'Saving becomes less rewarding; borrowing becomes cheaper.',
        'Saving becomes less rewarding; borrowing becomes more expensive.',
        'Saving becomes more rewarding; borrowing becomes cheaper.',
        'Saving becomes more rewarding; borrowing becomes more expensive.',
      ],
      answer: 3,
      prompt: 'Higher interest rates raise both the reward for saving and the cost of borrowing.',
      visual: photos.bankEngland,
      sources: [
        {
          label: 'Paper 1 source',
          ref: '0455_s25_13 Q10',
          note: 'Recent Paper 1 MCQ on interest-rate effects for savers and borrowers.',
        },
      ],
    },
    {
      type: 'compare',
      mode: 'fillBlanks',
      eyebrow: 'Key idea',
      variant: 'policyDirection',
      leftTitle: 'Expansionary monetary policy',
      rightTitle: 'Contractionary monetary policy',
      left: [
        ['1', 'Lower interest rates or increase money __________', 'supply'],
        ['2', 'Borrowing, lending, spending and investment may __________', 'rise'],
        ['3', 'Aggregate demand, output and employment may __________', 'rise'],
      ],
      right: [
        ['1', 'Raise interest rates or reduce money __________', 'supply'],
        ['2', 'Borrowing, lending, spending and investment may __________', 'fall'],
        ['3', 'Inflationary pressure may __________', 'fall'],
      ],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Policy that raises aggregate demand is __________.', 'expansionary'],
        ['2', 'Policy that cools demand to reduce inflationary pressure is __________.', 'contractionary'],
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 2',
      title: 'Lower interest rates',
      zhTitle: '较低利率',
      subtitle: 'Expansionary monetary policy',
    },
    {
      type: 'discussion',
      eyebrow: 'Discuss',
      title: 'Cheaper loans',
      question: 'Why might lower interest rates increase demand in the economy?',
      zh: '为什么较低利率可能增加经济中的需求？',
      answer: 'Borrowing becomes cheaper, saving becomes less attractive, and households and firms may spend or invest more.',
      answerZh: '借款变得更便宜，储蓄吸引力下降，家庭和企业可能增加消费或投资。',
      visual: photos.fed,
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: 'Effect of a lower interest rate',
      zhTitle: '较低利率影响链',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: 'lower interest rates reduce the __________', answer: 'cost of borrowing', zh: '较低利率降低借款成本' },
          { text: 'households and firms may __________ more', answer: 'borrow', zh: '家庭和企业可能增加借款' },
          { text: 'spending and __________ may rise', answer: 'investment', zh: '支出和投资可能上升' },
          { text: 'aggregate demand, output and __________ may rise', answer: 'employment', zh: '总需求、产出和就业可能上升' },
        ],
        [
          { text: 'lower interest rates reduce the __________', answer: 'reward for saving', zh: '较低利率降低储蓄回报' },
          { text: 'saving becomes less __________', answer: 'attractive', zh: '储蓄吸引力下降' },
          { text: 'households may __________ more', answer: 'spend', zh: '家庭可能增加支出' },
          { text: 'aggregate demand, output and __________ may rise', answer: 'employment', zh: '总需求、产出和就业可能上升' },
        ]
      ],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Lower interest rates reduce the __________.', 'cost of borrowing'],
        ['2', 'Spending and investment may __________.', 'rise'],
        ['3', 'Output and employment may __________.', 'rise'],
      ],
    },
    {
      type: 'cards',
      eyebrow: 'Discuss',
      title: 'Who is affected by lower rates?',
      cards: [
        { title: 'Households borrowing', body: 'loans are cheaper, so borrowing and spending may rise', visual: stakeholderPhotos.household },
        { title: 'Households saving', body: 'saving is less rewarding, so some households may spend more', visual: stakeholderPhotos.saver },
        { title: 'Firms investing', body: 'investment projects are cheaper to finance', visual: stakeholderPhotos.firm },
        { title: 'Whole economy', body: 'output and employment may rise if demand increases', visual: stakeholderPhotos.centralBank },
      ],
      footer: 'Use "may": households and firms do not all respond in the same way.',
      partialReview: ['.cardgrid > .card .cardBody', '.prompt'],
    },
    {
      type: 'peerTask',
      taskType: 'missingSentence',
      eyebrow: 'Pair task',
      title: 'Complete the missing sentence',
      zhPrompt: '两人合作，写出一个完整的较低利率解释。',
      steps: [
        ['1', 'Lower interest rates make borrowing cheaper.'],
        ['2', '__________', 'Households may spend more and firms may invest more.'],
        ['3', 'Aggregate demand, output and employment may rise.'],
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: 'Households may spend more and firms may invest more.',
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Lower interest rates reduce the __________.', 'cost of borrowing'],
        ['2', 'Lower interest rates reduce the __________.', 'reward for saving'],
        ['3', 'Higher spending and investment may increase __________.', 'aggregate demand'],
        ['4', 'Higher output may increase __________.', 'employment'],
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 3',
      title: 'Higher interest rates',
      zhTitle: '较高利率',
      subtitle: 'Contractionary monetary policy',
    },
    {
      type: 'discussion',
      eyebrow: 'Discuss',
      title: 'Cooling demand',
      question: 'Why might a central bank raise interest rates when inflation is high?',
      zh: '当通货膨胀较高时，中央银行为什么可能提高利率？',
      answer: 'Higher rates can reduce borrowing and spending, lowering aggregate demand and demand-pull inflationary pressure.',
      answerZh: '较高利率可以减少借款和支出，降低总需求和需求拉动型通胀压力。',
      visual: photos.bankEngland,
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: 'Effect of a higher interest rate',
      zhTitle: '较高利率影响链',
      mode: 'fillBlanks',
      nodes: [
        [
          { text: 'higher interest rates increase the __________', answer: 'cost of borrowing', zh: '较高利率提高借款成本' },
          { text: 'households and firms may __________ less', answer: 'borrow', zh: '家庭和企业可能减少借款' },
          { text: 'spending and __________ may fall', answer: 'investment', zh: '支出和投资可能下降' },
          { text: 'aggregate demand and __________ may fall', answer: 'inflationary pressure', zh: '总需求和通胀压力可能下降' },
        ],
        [
          { text: 'higher interest rates increase the __________', answer: 'reward for saving', zh: '较高利率提高储蓄回报' },
          { text: 'saving becomes more __________', answer: 'attractive', zh: '储蓄吸引力上升' },
          { text: 'households may __________ less', answer: 'spend', zh: '家庭可能减少支出' },
          { text: 'aggregate demand and __________ may fall', answer: 'inflationary pressure', zh: '总需求和通胀压力可能下降' },
        ]
      ],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Higher interest rates increase the cost of __________.', 'borrowing'],
        ['2', 'Saving becomes more __________.', 'rewarding'],
        ['3', 'Spending and investment may __________.', 'fall'],
      ],
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'Higher interest rates: exam trade-off',
      cards: [
        ['Anti-inflation effect', 'borrowing, spending and investment may fall, so aggregate demand and demand-pull inflationary pressure may fall'],
        ['Output and employment cost', 'firms may sell less output or invest less, so employment may fall'],
        ['Most useful when', 'inflation is caused by excess aggregate demand'],
        ['Less useful when', 'inflation is caused by higher production costs'],
      ],
      footer: 'Use this in discuss answers: the judgement depends on the cause of inflation.',
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'peerTask',
      taskType: 'missingSentence',
      eyebrow: 'Pair task',
      title: 'Complete the missing sentence',
      zhPrompt: '两人合作，写出一个完整的较高利率解释。',
      steps: [
        ['1', 'Higher interest rates make borrowing more expensive and saving more rewarding.'],
        ['2', '__________', 'Households and firms may spend or invest less.'],
        ['3', 'Aggregate demand and inflationary pressure may fall.'],
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: 'Households and firms may spend or invest less.',
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Governments use monetary policy such as increasing the rate of interest. What is a result of increasing the rate of interest?',
      choices: [
        'It creates disincentives for wage earners.',
        'It discourages investment by entrepreneurs.',
        'It reduces the disposable income of consumers.',
        'It reduces government transfer payments.',
      ],
      answer: 1,
      prompt: 'Higher interest rates raise borrowing costs, so some investment becomes less attractive.',
      visual: photos.bankEngland,
      sources: [
        {
          label: 'Paper 1 source',
          ref: '0455_m25_12 Q19',
          note: 'Recent Paper 1 MCQ on increasing interest rates and investment.',
        },
      ],
    },
    {
      type: 'exam',
      title: 'Explain how higher interest rates may reduce inflation. [4]',
      eyebrow: 'Exam practice',      marks: 4,
      keywords: ['borrowing', 'saving', 'spending', 'aggregate demand', 'inflation'],
      prompt: 'Write four connected steps with one clear "may".',
      visual: photos.bankEngland,
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2025ON-21 Q1(g)',
          note: 'Interest-rate discuss wording includes borrowing, saving, spending, investment and demand-pull inflation links.',
          extract: 'MS basis: higher rates can increase saving, reduce borrowing and reduce spending or investment.',
        },
      ],
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'modelAnswer',
      partialReview: ['.modelAnswerCard'],
      showLinkChips: false,
      eyebrow: 'Model answer',
      title: 'Explain how higher interest rates may reduce inflation. [4]',
      question: 'Explain how higher interest rates may reduce inflation.',
      answer: 'Higher interest rates make borrowing more expensive and saving more rewarding. Consumers and firms may borrow and spend less, so aggregate demand falls. With lower demand, firms have less ability to raise prices, so demand-pull inflationary pressure may fall.',
      links: ['borrowing', 'saving', 'spending', 'aggregate demand', 'inflation'],
      partialReview: ['.modelAnswerCard'],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '\u79bb\u5802\u5c0f\u6d4b',
      mode: 'fillBlanks',
      steps: [
        ['1', 'An __________ is the cost of borrowing and reward for saving.', 'interest rate'],
        ['2', 'Lower interest rates may increase __________.', 'spending and investment'],
        ['3', 'Higher interest rates may reduce __________.', 'aggregate demand'],
        ['4', 'Lower aggregate demand may reduce __________.', 'inflationary pressure'],
      ],
      cue: 'Answer before leaving.',
    },
  ],
};
