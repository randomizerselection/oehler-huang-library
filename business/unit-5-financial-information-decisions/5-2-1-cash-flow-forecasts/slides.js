/* ============================================================
   Cambridge IGCSE Business 0264 - Unit 5
   Lesson 5.2.1: Cash-flow forecasts

   Reference:
   ../../../references/igcse-business-0264-syllabus-2027-2029.md
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.businessFinance || {};

const businessSyllabus = {
  label: 'Syllabus source',
  ref: 'Cambridge IGCSE Business 0264 syllabus 2027-2029, 5.2.1',
  note: 'Cash importance, cash-flow forecast features, completing/amending/interpreting simple forecasts, and short-term solutions.',
};

const assessmentLimit = {
  label: 'Assessment note',
  ref: 'Cambridge IGCSE Business 0264 syllabus 2027-2029, 5.2.1',
  note: 'Candidates will not be assessed on constructing a cash-flow forecast from scratch.',
};

IGCSE.lesson = {
  meta: {
    subject: 'business',
    code: '5.2.1',
    unit: 'Unit 5 - Financial information and decisions',
    title: 'Cash-flow forecasts - Cambridge IGCSE Business 0264',
    lessonLabel: 'Business finance lesson 3',
    courseLabel: 'Cambridge IGCSE Business 0264',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
    courseIndexUrl: '../../index.html',
    courseIndexLabel: 'Business index',
    availableViews: ['slides', 'handout'],
    sources: [businessSyllabus, assessmentLimit],
  },

  slides: [
    {
      type: 'hero',
      eyebrow: 'Overview',
      title: 'Cash-flow forecasts',
      zhTitle: '现金流预测',
      subtitle: 'Unit 5.2.1 - Completing and interpreting cash-flow data',
      kicker: 'Profit later does not pay suppliers today. Cash timing matters.',
      visual: photos.cashRegister,
    },
    {
      type: 'peerTask',
      taskType: 'definitionRecall',
      eyebrow: 'Recall',
      title: 'Recall last lesson',
      prompt: 'On paper, write a simple definition for each term. Use one sentence for each.',
      stepsLabel: 'Write these definitions',
      definitionItems: [
        { label: '1', term: 'Internal source of finance', answer: 'Finance that comes from inside the business, such as retained profit or sale of unwanted assets.' },
        { label: '2', term: 'External source of finance', answer: 'Finance that comes from outside the business, such as a bank loan, overdraft, leasing, share capital or crowdfunding.' },
        { label: '3', term: 'Bank overdraft', answer: 'A flexible short-term borrowing facility that allows a business to spend more than it has in its bank account up to an agreed limit.' },
      ],
      sharePrompt: 'Compare your definitions with a partner before revealing the model answers.',
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Explain why cash is important to a business.',
        'Complete and interpret a simple cash-flow forecast.',
        'Recommend ways to overcome a short-term cash-flow problem.',
      ],
      zhBullets: [
        '解释现金对企业为什么重要。',
        '完成并解读简单现金流预测。',
        '推荐解决短期现金流问题的方法。',
      ],
    },
    {
      type: 'paperExtract',
      eyebrow: 'Case data',
      title: 'Harbor Phone Repair: cash timing',
      paragraphs: [
        'Harbor Phone Repair receives cash from repairs and accessory sales. Some school customers pay immediately, but a local office account pays at the end of each month.',
        'The business must pay wages every month and suppliers often require payment before replacement screens are delivered.',
        'Lina wants to complete a simple cash-flow forecast before deciding whether to delay buying a new diagnostic tablet.',
      ],
      question: 'Why might a profitable repair business still have a cash-flow problem?',
      source: 'Original teaching case written for this deck.',
    },
    {
      type: 'section',
      eyebrow: 'Part 1',
      title: 'Why cash matters',
      zhTitle: '现金的重要性',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: cash paid out',
      visual: photos.cashRegister,
      objectPosition: 'center center',
      notes: 'Ask: which payments leave the business before all customer cash arrives? Bridge to cash timing and liquidity.',
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'Why cash is important',
      cardStyle: 'compactVisual',
      cardLayout: 'balancedGrid',
      cards: [
        { title: 'Pay suppliers', zhTitle: '支付供应商', body: 'replacement screens and accessories may need payment before sale', icon: 'payments' },
        { title: 'Pay employees', zhTitle: '支付员工工资', body: 'wages must be paid even when sales are lower', icon: 'employment' },
        { title: 'Avoid insolvency', zhTitle: '避免无力偿债', body: 'a business can fail if it cannot pay short-term debts', icon: 'bank' },
        { title: 'Plan borrowing', zhTitle: '计划借款', body: 'forecast gaps before asking for an overdraft or loan', icon: 'prices' },
      ],
      footer: 'Cash-flow answers should focus on timing, not just total profit.',
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      definitionCue: 'Key term',
      title: 'Cash-flow forecast',
      zhTitle: '现金流预测',
      term: 'cash-flow forecast',
      definition: 'A prediction of future cash inflows and cash outflows over a period of time.',
      definitionZh: '对未来一段时间现金流入和现金流出的预测。',
      keyTerms: [
        { term: 'prediction', zh: '预测', note: 'an estimate of what may happen in the future' },
        { term: 'cash inflows', zh: '现金流入', note: 'money coming into the business' },
        { term: 'cash outflows', zh: '现金流出', note: 'money leaving the business' },
      ],
      showExamples: false,
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Cash __________ are money coming into the business.', 'inflows'],
        ['2', 'Cash __________ are money leaving the business.', 'outflows'],
        ['3', 'A cash-flow forecast helps a business plan future cash __________.', 'shortages'],
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 2',
      title: 'Complete the forecast',
      zhTitle: '完成预测表',
    },
    {
      type: 'dataTable',
      eyebrow: 'Learn',
      title: 'Main features of a cash-flow forecast',
      lead: 'Candidates complete, amend and interpret simple forecasts. They are not assessed on constructing a full forecast from scratch.',
      table: {
        columns: ['Feature', 'Meaning', 'Formula or link'],
        rows: [
          ['Cash inflow', 'Money entering the business', 'sales receipts, customer payments, loans received'],
          ['Cash outflow', 'Money leaving the business', 'wages, supplier payments, rent, loan repayments'],
          ['Net cash flow', 'Cash inflows minus cash outflows', 'inflows - outflows'],
          ['Opening balance', 'Cash available at the start of the period', 'previous closing balance'],
          ['Closing balance', 'Cash available at the end of the period', 'opening balance + net cash flow'],
        ],
      },
      prompt: 'The key calculation is closing balance = opening balance + net cash flow.',
    },
    {
      type: 'dataTable',
      eyebrow: 'Calculate',
      title: 'Complete Harbor Phone Repair cash-flow forecast',
      lead: 'Complete the missing figures, then decide which month has the main cash-flow problem.',
      table: {
        columns: ['Month', 'July', 'August', 'September'],
        rows: [
          ['Cash inflows', '$5,200', '$4,600', '$6,400'],
          ['Cash outflows', '$4,900', '$6,100', '$5,200'],
          ['Net cash flow', '$300', { text: '__________', answer: '-$1,500' }, '$1,200'],
          ['Opening balance', '$1,000', '$1,300', { text: '__________', answer: '-$200' }],
          ['Closing balance', '$1,300', { text: '__________', answer: '-$200' }, '$1,000'],
        ],
        align: ['', 'right', 'right', 'right'],
        caption: 'August is the problem month because the closing balance is negative.',
      },
      prompt: 'Interpret before recommending: what caused the negative closing balance?',
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Cash-flow calculation check',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Net cash flow = cash inflows minus cash __________.', 'outflows'],
        ['2', 'August net cash flow is $4,600 - $6,100 = __________.', '-$1,500'],
        ['3', 'Closing balance = opening balance plus __________ cash flow.', 'net'],
        ['4', 'August closing balance is $1,300 + -$1,500 = __________.', '-$200'],
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 3',
      title: 'Interpret and solve',
      zhTitle: '解读并解决',
    },
    {
      type: 'dataTable',
      eyebrow: 'Interpret',
      title: 'What the forecast shows',
      lead: 'A Business answer must explain what the figures mean for the business decision.',
      table: {
        columns: ['Evidence from forecast', 'Interpretation', 'Possible decision'],
        rows: [
          ['August outflows are $6,100', 'Cash payments are unusually high', 'Check if the diagnostic tablet purchase can be delayed.'],
          ['August net cash flow is -$1,500', 'More cash leaves than enters', 'Arrange temporary finance before August.'],
          ['August closing balance is -$200', 'The business may not have enough cash', 'Use an overdraft or speed up customer payments.'],
          ['September closing balance returns to $1,000', 'The problem may be short-term', 'Avoid a long-term solution if a short-term one fits.'],
        ],
      },
      prompt: 'Use figures in the recommendation, not only general phrases.',
    },
    {
      type: 'compare',
      eyebrow: 'Decide',
      mode: 'fillBlanks',
      leftTitle: 'Short-term cash-flow solutions',
      left: [
        ['1', 'Arrange a bank __________ for a temporary negative balance.', 'overdraft'],
        ['2', 'Ask customers to pay more __________.', 'quickly'],
        ['3', 'Delay supplier payments if this does not damage __________.', 'relationships'],
        ['4', 'Delay buying non-current __________.', 'assets'],
      ],
      rightTitle: 'Possible drawbacks',
      right: [
        ['1', 'An overdraft may charge interest and __________.', 'fees'],
        ['2', 'Customers may dislike shorter payment __________.', 'terms'],
        ['3', 'Suppliers may stop offering trade __________.', 'credit'],
        ['4', 'Delaying assets may slow service __________.', 'quality'],
      ],
      prompt: 'Recommend a solution that fits the timing and cause of the cash-flow problem.',
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Using the cash-flow forecast, recommend one way Harbor Phone Repair could overcome its August cash-flow problem. Justify your answer. [6]',
      keywordLabel: 'Use evidence',
      keywords: ['August closing balance -$200', 'short-term problem', 'overdraft or delay purchase', 'benefit', 'drawback', 'justified decision'],
      prompt: 'Use at least one figure from the forecast and explain why the solution fits this business.',
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Using the cash-flow forecast, recommend one way Harbor Phone Repair could overcome its August cash-flow problem. Justify your answer. [6]',
      paragraphs: [
        'I recommend arranging a small bank overdraft for August. The forecast shows a negative closing balance of $200, so Harbor Phone Repair only has a short-term cash shortage.',
        'An overdraft is suitable because it is flexible and can cover the temporary gap while the business waits for September cash inflows, when the closing balance is forecast to return to $1,000.',
        'However, overdrafts may charge interest and fees. Overall, this is better than a long-term bank loan because the problem appears temporary and the amount needed is small.',
      ],
      links: ['bank overdraft', 'negative closing balance', '$200', 'short-term cash shortage', 'September cash inflows', '$1,000', 'interest and fees'],
      showLinkChips: false,
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '离堂小测',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Cash inflows minus cash outflows equals net cash __________.', 'flow'],
        ['2', 'Closing balance equals opening balance plus __________ cash flow.', 'net'],
        ['3', 'A negative closing balance may show a cash-flow __________.', 'problem'],
        ['4', 'The syllabus requires completing and interpreting forecasts, not constructing one from __________.', 'scratch'],
      ],
    },
  ],
};
