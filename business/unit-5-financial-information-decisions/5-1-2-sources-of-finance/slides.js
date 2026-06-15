/* ============================================================
   Cambridge IGCSE Business 0264 - Unit 5
   Lesson 5.1.2: Sources of finance

   Reference:
   ../../../references/igcse-business-0264-syllabus-2027-2029.md
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.businessFinance || {};

const businessSyllabus = {
  label: 'Syllabus source',
  ref: 'Cambridge IGCSE Business 0264 syllabus 2027-2029, 5.1.2',
  note: 'Internal and external sources of finance, selection factors, and justified recommendations.',
};

IGCSE.lesson = {
  meta: {
    subject: 'business',
    code: '5.1.2',
    unit: 'Unit 5 - Financial information and decisions',
    title: 'Sources of finance - Cambridge IGCSE Business 0264',
    lessonLabel: 'Business finance lesson 2',
    courseLabel: 'Cambridge IGCSE Business 0264',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
    courseIndexUrl: '../../index.html',
    courseIndexLabel: 'Business index',
    availableViews: ['slides', 'handout'],
    sources: [businessSyllabus],
  },

  slides: [
    {
      type: 'hero',
      eyebrow: 'Overview',
      title: 'Sources of finance',
      zhTitle: '资金来源',
      subtitle: 'Unit 5.1.2 - Choosing suitable finance',
      kicker: 'The best source depends on the business, the amount, the purpose, the time period and the cost.',
      visual: photos.shareCapital,
    },
    {
      type: 'peerTask',
      taskType: 'definitionRecall',
      eyebrow: 'Recall',
      title: 'Recall last lesson',
      prompt: 'On paper, write a simple definition for each term. Use one sentence for each.',
      stepsLabel: 'Write these definitions',
      definitionItems: [
        { label: '1', term: 'Start-up capital', answer: 'Finance needed before a business starts trading.' },
        { label: '2', term: 'Working capital', answer: 'Finance available for day-to-day running of a business, calculated as current assets minus current liabilities.' },
        { label: '3', term: 'Long-term finance need', answer: 'A finance need linked to assets or plans used over a longer period, usually more than one year.' },
      ],
      sharePrompt: 'Compare your definitions with a partner before revealing the model answers.',
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Distinguish internal and external sources of finance.',
        'Explain advantages and disadvantages of common sources.',
        'Recommend and justify a suitable source for a business.',
      ],
      zhBullets: [
        '区分内部和外部资金来源。',
        '解释常见资金来源的优点和缺点。',
        '为企业推荐并论证合适的资金来源。',
      ],
    },
    {
      type: 'paperExtract',
      eyebrow: 'Case data',
      title: 'Harbor Phone Repair: expansion choice',
      paragraphs: [
        'After six months, Harbor Phone Repair has regular customers and a small retained profit. Lina wants to add a second repair counter and buy faster diagnostic equipment.',
        'The expansion will cost $8,000. Lina does not want to lose control of the business, but she wants a source that can be arranged quickly.',
        'The business has already used a small overdraft in two months when sales were lower than expected.',
      ],
      question: 'Which sources of finance could Lina consider, and which source is most suitable?',
      source: 'Original teaching case written for this deck.',
    },
    {
      type: 'section',
      eyebrow: 'Part 1',
      title: 'Internal sources',
      zhTitle: '内部资金来源',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: repair shop cash inside the business',
      visual: photos.mobileStore,
      objectPosition: 'center center',
      notes: 'Ask: what money or assets might already be inside a trading business? Bridge to internal sources.',
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'Internal sources of finance',
      cardStyle: 'compactVisual',
      cardLayout: 'balancedGrid',
      cards: [
        { title: "Owner's investment", zhTitle: '业主投入', body: 'owner puts more personal money into the business', icon: 'payments' },
        { title: 'Retained profit', zhTitle: '留存利润', body: 'profit kept in the business instead of taken out', icon: 'growth' },
        { title: 'Sale of unwanted assets', zhTitle: '出售闲置资产', body: 'sell equipment or assets no longer needed', icon: 'market' },
        { title: 'Working capital', zhTitle: '营运资金', body: 'release cash tied up in day-to-day operations', icon: 'bank' },
      ],
      footer: 'Internal finance avoids outside lenders or new owners, but may be limited.',
    },
    {
      type: 'compare',
      eyebrow: 'Review',
      mode: 'fillBlanks',
      leftTitle: 'Advantages of internal finance',
      left: [
        ['1', 'No interest has to be __________.', 'paid'],
        ['2', 'The owner keeps more __________.', 'control'],
        ['3', 'It avoids taking on extra __________.', 'debt'],
      ],
      rightTitle: 'Disadvantages of internal finance',
      right: [
        ['1', 'The amount available may be __________.', 'limited'],
        ['2', 'Using retained profit may reduce funds for other __________.', 'uses'],
        ['3', 'Selling assets may reduce business __________.', 'capacity'],
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 2',
      title: 'External sources',
      zhTitle: '外部资金来源',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: share ownership',
      visual: photos.shareCapital,
      objectPosition: 'center center',
      notes: 'Ask: what does a share certificate suggest about raising finance from outside owners? Bridge to external finance sources.',
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'External sources of finance',
      cardStyle: 'compactVisual',
      cardLayout: 'balancedGrid',
      cards: [
        { title: 'Share capital', zhTitle: '股本', body: 'sell shares to raise finance', icon: 'growth' },
        { title: 'Venture capital', zhTitle: '风险投资', body: 'investment from specialist investors', icon: 'market' },
        { title: 'Bank overdraft', zhTitle: '银行透支', body: 'short-term flexible borrowing from a bank account', icon: 'bank' },
        { title: 'Leasing or hire purchase', zhTitle: '租赁或分期付款', body: 'use an asset while paying over time', icon: 'industry' },
        { title: 'Bank loan or trade credit', zhTitle: '银行贷款或商业信用', body: 'borrow for a set period or pay suppliers later', icon: 'payments' },
        { title: 'Grant or crowdfunding', zhTitle: '补助或众筹', body: 'funds from government support or many small backers', icon: 'welfare' },
      ],
      footer: 'External finance can raise larger amounts, but may add cost, debt or loss of control.',
    },
    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'Which source fits the situation?',
      prompt: 'Choose the most suitable source, then justify one choice using amount, purpose or time period.',
      categories: [
        { title: 'Overdraft', clue: 'short-term cash-flow gap' },
        { title: 'Bank loan', clue: 'larger long-term amount with repayment schedule' },
        { title: 'Leasing', clue: 'use equipment without buying it immediately' },
        { title: 'Retained profit', clue: 'use profit kept inside the business' },
        { title: 'Share capital', clue: 'raise money by selling ownership shares' },
      ],
      items: [
        { text: 'Pay suppliers while waiting two weeks for customers to pay', answer: 'Overdraft', reason: 'It is a short-term cash-flow gap.' },
        { text: 'Buy a repair bench used for several years', answer: 'Bank loan', reason: 'It is a larger long-term need.' },
        { text: 'Use expensive diagnostic equipment without buying it now', answer: 'Leasing', reason: 'The business can use the asset while paying over time.' },
        { text: 'Fund a small sign using profit kept from earlier sales', answer: 'Retained profit', reason: 'The money is already inside the business.' },
      ],
      sharePrompt: 'Use this sentence: I recommend ___ because the business needs finance for ___.',
    },
    {
      type: 'section',
      eyebrow: 'Part 3',
      title: 'Choose and justify',
      zhTitle: '选择并论证',
    },
    {
      type: 'dataTable',
      eyebrow: 'Apply',
      title: 'Selection factors for Harbor Phone Repair',
      lead: 'The same source is not suitable for every business. Use the case details before recommending.',
      table: {
        columns: ['Factor', 'Case evidence', 'Why it matters'],
        rows: [
          ['Amount required', '$8,000', 'Large enough that retained profit alone may be too small.'],
          ['Purpose', 'Second repair counter and diagnostic equipment', 'The assets will help the business operate for several years.'],
          ['Time period', 'Long-term expansion', 'A longer-term source is more suitable than a temporary overdraft.'],
          ['Control', 'Lina does not want to lose control', 'Selling shares or taking venture capital may be less suitable.'],
          ['Existing loans', 'Small overdraft already used twice', 'More overdraft borrowing may increase risk and cost.'],
        ],
      },
      prompt: 'Which source best fits the evidence: bank loan, leasing, retained profit, or share capital?',
    },
    {
      type: 'compare',
      eyebrow: 'Decide',
      mode: 'fillBlanks',
      leftTitle: 'Bank loan',
      left: [
        ['1', 'Suitable for a larger __________-term need.', 'long'],
        ['2', 'Interest must be __________.', 'paid'],
        ['3', 'Lina keeps ownership __________.', 'control'],
      ],
      rightTitle: 'Share capital',
      right: [
        ['1', 'Can raise finance without loan __________.', 'repayments'],
        ['2', 'May reduce owner __________.', 'control'],
        ['3', 'May not suit a small sole trader unless legal form __________.', 'changes'],
      ],
      prompt: 'For this case, the best answer depends on evidence, not on memorising one source.',
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Recommend and justify one suitable source of finance for Harbor Phone Repair. [6]',
      keywordLabel: 'Build the recommendation',
      keywords: ['recommend one source', 'link to $8,000 expansion', 'explain advantage', 'explain drawback', 'justify using case evidence'],
      prompt: 'Write one recommendation. Use the case details; do not list every possible source.',
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Recommend and justify one suitable source of finance for Harbor Phone Repair. [6]',
      paragraphs: [
        'I recommend a bank loan for Harbor Phone Repair. The business needs $8,000 for a second repair counter and diagnostic equipment, so this is a long-term finance need.',
        'A bank loan could provide the full amount and Lina would keep control of the business, unlike selling shares or accepting venture capital.',
        'However, interest and repayments would increase costs. Overall, a bank loan is suitable if Harbor Phone Repair expects enough future revenue from the expansion to make the repayments, because the equipment should be used for several years.',
      ],
      links: ['bank loan', '$8,000', 'long-term finance need', 'keep control', 'interest', 'repayments', 'future revenue'],
      showLinkChips: false,
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '离堂小测',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Retained profit is an __________ source of finance.', 'internal'],
        ['2', 'A bank overdraft is usually used for __________-term cash-flow problems.', 'short'],
        ['3', 'Selling shares may reduce the owner’s __________.', 'control'],
        ['4', 'A recommendation must be justified using the business __________.', 'context'],
      ],
    },
  ],
};
