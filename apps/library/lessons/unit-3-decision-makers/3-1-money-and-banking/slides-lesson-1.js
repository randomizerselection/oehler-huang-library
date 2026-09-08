/* Sources:
   Syllabus 2027-2029: ../../../references/igcse-economics-syllabus-2027-2029.md (3.1.1)
   Definitions 2026: ../../../references/igcse-economics-definitions-2026.md (Money, functions and characteristics)
   Paper 2 archive: ../../../references/paper-2-mark-schemes-2023-2025/3-microeconomic-decision-makers.md
   Local Paper 1 corpus: C:/Users/oehle/Documents/past-papers/economics_0455_igcse_paper1/ (2023-2025 QP/MS)
   Local Paper 2 corpus: C:/Users/oehle/Documents/past-papers/economics_0455_igcse_paper2/ (2023-2025 QP/MS)
   Key Paper 1 items: 2023MJ-12 Q11-Q12, 2023MJ-13 Q11, 2024ON-11 Q10, 2025ON-11 Q10, 2025ON-13 Q10
   Key Paper 2 items: 2023MJ-21 Q2(a), 2023ON-21 Q3(b), 2024MJ-22 Q4(b), 2025ON-23 Q3(b)
*/
window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.moneyBanking;
const imageCredit = (photo) => ({ label: 'Image credit', ref: photo.credit, note: photo.source });

IGCSE.lesson = {
  meta: {
    code: '3.1.1',
    unit: 'Unit 3 - Microeconomic decision makers',
    title: 'Money lesson 1: forms and functions - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Money lesson 1',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow: 'Overview',
      title: '3.1.1 Money',
      zhTitle: '货币',
      subtitle: 'Money and banking - lesson 1',
      kicker: 'Definition, forms and functions',
      visual: photos.cashAndCoins,
      notes: "Class 1 actual endpoint, 4 September 2026: the four functions were taught. End the core lesson after the functions review and exit ticket. Characteristics now begin lesson 2; banking follows in lesson 3. The final function exam questions are optional consolidation, not assumed completed.",
    },

    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'Is the phone the money?',
      question: 'When a customer taps a phone at this terminal, what is actually being transferred?',
      zh: '顾客用手机在这个终端付款时，真正被转移的是什么？',
      answer: 'The phone and app are payment tools. The money is usually a bank deposit: value moves from the buyer\'s account to the seller\'s account.',
      answerZh: '手机和应用程序是支付工具。货币通常是银行存款：价值从买方账户转移到卖方账户。',
      visual: photos.contactlessPayment,
    },

    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Define money.',
        'Distinguish forms of money from payment tools.',
        'Explain the four functions of money.',
      ],
      zhBullets: [
        '定义货币。',
        '区分货币形式与支付工具。',
        '解释货币的四种职能。',
      ],
    },

    {
      type: 'section',
      eyebrow: 'Part 1',
      title: 'What counts as money?',
      zhTitle: '什么可以算作货币？',
    },

    {
      type: 'visualPause',
      title: 'What makes this money?',
      visual: photos.cashAndCoins,
      objectPosition: '40% 55%',
      notes: 'Ask: Why are people willing to accept these banknotes and coins in payment? Bridge to the definition of money as anything generally accepted as a means of payment; emphasise that money also includes bank deposits, not just cash.',
    },

    {
      type: 'term',
      eyebrow: 'Learn',
      definitionCue: 'Key term',
      title: 'Money',
      zhTitle: '货币',
      term: 'money',
      definition: 'Anything generally accepted as a means of payment.',
      definitionZh: '任何被普遍接受、可用于支付的东西。',
      keyTerms: [
        { term: 'generally accepted', zh: '被普遍接受', note: 'buyers and sellers are normally willing to receive it' },
        { term: 'means of payment', zh: '支付手段', note: 'it can settle purchases and debts' },
      ],
      showExamples: false,
      sources: [
        {
          label: 'Syllabus source',
          ref: '3.1.1 Money',
          note: 'Cover the forms, functions and characteristics of money.',
        },
        {
          label: 'Definitions 2026',
          ref: '3.1.1 Money',
          extract: 'Money is anything generally accepted as a means of payment.',
        },
      ],
    },

    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Which item best fits the definition of money?',
      zh: '哪一项最符合货币的定义？',
      choices: [
        'A balance in a current bank account that can be used for payments',
        'A smartphone used to open a payment app',
        'A shop voucher accepted by only one retailer',
        'A gold ring kept because it may rise in value',
      ],
      answer: 0,
      prompt: 'A bank deposit can settle many payments. The phone is a tool, the voucher is not generally accepted, and the ring is an asset rather than a normal means of payment.',
      promptZh: '银行存款可以结算许多付款；手机只是工具，购物券并非被普遍接受，金戒指是资产而不是通常的支付手段。',
    },

    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'Common forms of money today',
      layout: 'money-forms',
      cardStyle: 'photoGrid',
      handoutVisuals: true,
      cards: [
        { title: 'Coins', zhTitle: '硬币', body: 'small-value physical currency', visual: photos.coinDenominations },
        { title: 'Banknotes', zhTitle: '纸币', body: 'paper or polymer currency', visual: photos.matchingBanknotes },
        { title: 'Bank deposits', zhTitle: '银行存款', body: 'account balances used for payments', visual: photos.bankDepositBalance },
      ],
      partialReview: ['.cardgrid > .card'],
      footer: 'Exam distinction: the card or phone is usually the payment method; the deposit balance is the money.',
      sources: [photos.coinDenominations, photos.matchingBanknotes, photos.bankDepositBalance].map(imageCredit),
    },

    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'Money or payment tool?',
      zhTitle: '货币还是支付工具？',
      prompt: 'Classify each item, then use the words payment or account in your reason.',
      zhPrompt: '判断每一项，然后在理由中使用“支付”或“账户”。',
      categories: [
        { title: 'Money', zhTitle: '货币', clue: 'value that can settle a payment' },
        { title: 'Payment tool', zhTitle: '支付工具', clue: 'a device or method that moves money' },
      ],
      items: [
        { text: 'RMB 80 in coins and banknotes', answer: 'Money', reason: 'The currency can be handed over to settle a payment.' },
        { text: 'RMB 800 in a current account', answer: 'Money', reason: 'The bank deposit is value available for account payments.' },
        { text: 'A plastic debit card', answer: 'Payment tool', reason: 'The card gives access to the money in an account.' },
        { text: 'A phone showing a payment app', answer: 'Payment tool', reason: 'The phone instructs an account transfer; it is not itself the money.' },
      ],
      sharePrompt: 'Share the hardest item and the clue that decided it.',
    },

    {
      type: 'section',
      eyebrow: 'Part 2',
      title: 'The four functions of money',
      zhTitle: '货币的四种职能',
    },

    {
      type: 'discussion',
      layout: 'question-only',
      question: 'How would you buy things if there was no money?',
      notes: 'Think, then discuss with a partner. Elicit swapping goods and the difficulty of finding someone who wants what you offer. Bridge to money as a medium of exchange. 如果没有货币，你会怎样购买东西？',
    },

    {
      type: 'term',
      layout: 'photo-term',
      eyebrow: 'Learn',
      definitionCue: 'Function 1 of 4',
      title: 'Medium of exchange',
      zhTitle: '交换媒介',
      term: 'medium of exchange',
      definition: 'Money can be used to buy goods and services and to trade.',
      definitionZh: '货币可以用来购买商品和服务，并完成交易。',
      keyTerms: [
        { term: 'buy goods and services', zh: '购买商品和服务', note: 'money is handed over to complete an exchange now' },
      ],
      showExamples: false,
      visual: photos.mediumExchangeCash,
      sources: [
        {
          label: 'Definitions 2026',
          ref: '3.1.1 Medium of exchange',
          extract: 'Money can be used to buy goods and services / to trade.',
        },
        {
          label: 'Paper 2 source',
          ref: '2023ON-21 Q3(b)',
          question: 'Explain two functions of money.',
          extract: 'MS basis: medium of exchange (1) to buy goods and services / to trade (1).',
        },
      ],
    },

    {
      type: 'yesNoCheck',
      eyebrow: 'Check',
      title: 'Is money completing an exchange now?',
      zhTitle: '货币现在是否正在完成交易？',
      prompt: 'Vote on each statement. Only one shows money acting as a medium of exchange.',
      items: [
        { statement: 'A customer gives a baker RMB 20 and receives bread.', answer: true, reason: 'Money completes the purchase now, so it is a medium of exchange.' },
        { statement: 'A bakery labels bread at RMB 20.', answer: false, reason: 'The price measures value, so this is unit of account.' },
        { statement: 'A customer keeps RMB 20 for next week.', answer: false, reason: 'Keeping purchasing power for later is store of value.' },
      ],
    },

    {
      type: 'discussion',
      layout: 'question-only',
      question: 'How could you compare the value of a bicycle and a phone without prices?',
      notes: 'Think, then compare ideas with a partner. Elicit a common measuring unit, then introduce unit of account. 如果没有价格，你怎样比较自行车和手机的价值？',
    },

    {
      type: 'term',
      layout: 'photo-term',
      eyebrow: 'Learn',
      definitionCue: 'Function 2 of 4',
      title: 'Unit of account',
      zhTitle: '计价单位',
      term: 'unit of account',
      definition: 'Money measures how much a product is worth.',
      definitionZh: '货币衡量一种产品值多少钱。',
      keyTerms: [
        { term: 'how much a product is worth', zh: '一种产品值多少钱', note: 'one common unit lets consumers compare prices and value' },
      ],
      showExamples: false,
      visual: photos.supermarketPrices,
      sources: [
        {
          label: 'Definitions 2026',
          ref: '3.1.1 Unit of account / measure of value',
          extract: 'Money measures how much a product is worth.',
        },
        {
          label: 'Paper 2 source',
          ref: '2023ON-21 Q3(b)',
          question: 'Explain two functions of money.',
          extract: 'MS basis: measure of value / unit of account (1) to measure how much a product is worth (1).',
        },
      ],
    },

    {
      type: 'quiz',
      eyebrow: 'Paper 1 check',
      question: 'One function of money is to act as a measure of value. What does this mean?',
      choices: [
        'Money allows people to borrow and lend.',
        'Money allows people to save surplus income.',
        'Money is used to buy goods and services.',
        'Money is used to compare the worth of different goods and services.',
      ],
      answer: 3,
      prompt: 'A measure of value is the unit-of-account function: prices expressed in one unit make products comparable.',
      sources: [
        {
          label: 'Paper 1 source',
          ref: '2023MJ-12 Q12',
          note: 'Original recent Paper 1 distinction between the four functions of money; answer D.',
        },
      ],
    },

    {
      type: 'discussion',
      layout: 'question-only',
      question: 'You earn money today but want to spend it next month. What could you do?',
      notes: 'Think, then discuss saving rather than spending immediately. Bridge to carrying purchasing power into the future: store of value. 今天赚的钱想下个月再花，可以怎样做？',
    },

    {
      type: 'term',
      layout: 'photo-term',
      eyebrow: 'Learn',
      definitionCue: 'Function 3 of 4',
      title: 'Store of value',
      zhTitle: '价值储藏',
      term: 'store of value',
      definition: 'Money allows people to save value over time.',
      definitionZh: '货币使人们能够随时间保存价值。',
      keyTerms: [
        { term: 'save value over time', zh: '随时间保存价值', note: 'purchasing power is carried from the present into the future' },
      ],
      showExamples: false,
      visual: photos.storeValueSavingsJar,
      sources: [
        {
          label: 'Definitions 2026',
          ref: '3.1.1 Store of value',
          extract: 'Money allows people to save value over time.',
        },
        {
          label: 'Paper 2 source',
          ref: '2023ON-21 Q3(b)',
          question: 'Explain two functions of money.',
          extract: 'MS basis: store of value (1) to allow people to save (1).',
        },
      ],
    },

    {
      type: 'quiz',
      eyebrow: 'Paper 1 check',
      question: 'During rapid inflation, why may cash perform poorly as a store of value?',
      choices: [
        'Cash can no longer be used as a medium of exchange.',
        'Its purchasing power falls as prices rise.',
        'Cash becomes impossible to divide into smaller values.',
        'Its denomination becomes impossible to recognise.',
      ],
      answer: 1,
      prompt: 'Rapid inflation raises the price level, so a fixed amount of cash buys fewer goods and services. It therefore stores less purchasing power.',
      sources: [
        {
          label: 'Paper 1 source',
          ref: '2023MJ-11 Q11 and 2023MJ-12 Q11',
          note: 'Adapted from two recent Paper 1 questions linking inflation to the store-of-value function.',
        },
      ],
    },

    {
      type: 'discussion',
      layout: 'question-only',
      question: 'If you buy a bicycle now but pay next month, how could you agree the amount owed?',
      notes: 'Think, then discuss with a partner. The key is agreeing an amount of money now that will be paid later. Contrast this debt with saving your own money. Bridge to standard of deferred payment. 今天赊购自行车，怎样约定下个月应付多少？',
    },

    {
      type: 'term',
      layout: 'photo-term',
      eyebrow: 'Learn',
      definitionCue: 'Function 4 of 4',
      title: 'Standard of deferred payment',
      zhTitle: '延期支付标准',
      term: 'standard of deferred payment',
      definition: 'Money is used for borrowing and lending, making payments in the future.',
      definitionZh: '货币用于借贷，并作为将来付款的标准。',
      keyTerms: [
        { term: 'payments in the future', zh: '将来的付款', note: 'the amount owed now can be measured and repaid later' },
      ],
      showExamples: false,
      visual: photos.deferredPaymentLoanAgreement,
      sources: [
        {
          label: 'Definitions 2026',
          ref: '3.1.1 Standard of deferred payment',
          extract: 'Money is used for borrowing and lending / making payments in the future.',
        },
        {
          label: 'Paper 2 source',
          ref: '2023ON-21 Q3(b)',
          question: 'Explain two functions of money.',
          extract: 'MS basis: method of deferred payment (1) for borrowing and lending (1).',
        },
      ],
    },

    {
      type: 'peerTask',
      taskType: 'missingSentence',
      eyebrow: 'Pair task',
      title: 'Complete the missing sentence',
      zhPrompt: '先判断货币职能，再补全解释。',
      steps: [
        ['1', 'Mina buys a bicycle today and agrees to repay RMB 400 each month.'],
        ['2', 'Money acts as a __________ because it provides an agreed unit for payments made in the future.', 'standard of deferred payment'],
        ['3', 'Compare: keeping RMB 400 until next month would instead show a store of value.'],
      ],
      missingSentenceStep: 2,
      sharePrompt: 'Say why this is not simply a medium of exchange.',
    },

    {
      type: 'visualPause',
      layout: 'contain-overview',
      title: 'Four functions of money',
      visual: photos.functionsOverview,
      notes: 'All four functions have now been taught and checked. Use this overview to consolidate the four names before students classify new examples.',
    },

    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'Name the function',
      zhTitle: '判断货币职能',
      prompt: 'Classify each case using the four function names. Be ready to justify one.',
      zhPrompt: '用四种货币职能来判断每个案例，并准备解释其中一个。',
      categories: [
        { title: 'Medium of exchange', zhTitle: '交换媒介', clue: 'buying or selling now' },
        { title: 'Unit of account', zhTitle: '计价单位', clue: 'pricing or comparing value' },
        { title: 'Store of value', zhTitle: '价值储藏', clue: 'saving purchasing power' },
        { title: 'Deferred payment', zhTitle: '延期支付', clue: 'repaying later' },
      ],
      items: [
        { text: 'A cafe lists tea at RMB 18 and juice at RMB 24.', answer: 'Unit of account', reason: 'Prices use one common unit so customers can compare value.' },
        { text: 'A student pays RMB 18 for the tea.', answer: 'Medium of exchange', reason: 'Money is used to complete a trade now.' },
        { text: 'A family keeps RMB 3,000 for next term.', answer: 'Store of value', reason: 'Purchasing power is kept for future use.' },
        { text: 'A borrower agrees to repay RMB 600 each month.', answer: 'Deferred payment', reason: 'Money provides the agreed unit for payments made later.' },
      ],
      sharePrompt: 'Explain one answer without repeating the category clue word for word.',
    },

    {
      type: 'visualPause',
      layout: 'contain-overview',
      title: 'Review the four functions of money',
      visual: photos.functionsOverviewDark,
      notes: 'Use this as a rapid retrieval review. Point to each panel in a different order and ask students to name the function and explain what the photograph demonstrates.',
    },

    {
      "type": "answer",
      "eyebrow": "Check",
      "title": "Exit ticket",
      "zhTitle": "离堂小测",
      "mode": "fillBlanks",
      "steps": [
        [
          "1",
          "Money is anything generally accepted as a means of __________.",
          "payment"
        ],
        [
          "2",
          "Prices use money as a unit of __________.",
          "account"
        ],
        [
          "3",
          "Money provides a standard for repaying debts later: standard of __________ payment.",
          "deferred"
        ]
      ],
      "notes": "End of the core lesson. This is the class 1 stopping point; characteristics are first taught in lesson 2. The following two past-paper questions are optional function practice."
    },

    {
      type: 'exam',
      eyebrow: 'Paper 2 practice',
      title: 'Identify two functions of money. [2]',
      examSpec: { paper: 'Paper 2', marks: 2, command: 'Identify', pattern: '2 x 1', skills: ['k'] },
      keywordLabel: 'Write only two',
      keywords: ['medium of exchange', 'unit of account', 'store of value', 'standard of deferred payment'],
      prompt: 'Write two function names. Do not add characteristics of money.',
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2023MJ-21 Q2(a)',
          question: 'Identify two functions of money.',
          extract: 'MS basis: one mark for each valid function; descriptions are accepted, but characteristics earn no credit.',
        },
      ],
      notes: "Optional consolidation after the core exit ticket. Do not assume this question was completed in the first class.",
    },

    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Identify two functions of money. [2]',
      examSpec: { paper: 'Paper 2', marks: 2, command: 'Identify', pattern: '2 x 1', skills: ['k'] },
      paragraphs: [
        'Medium of exchange.',
        'Store of value.',
      ],
      links: ['Medium of exchange', 'Store of value'],
      showLinkChips: false,
      markSchemeNote: 'One mark is awarded for each valid function. Characteristics earn no credit. If more than two functions are listed, only the first three are considered.',
      partialReview: ['.modelAnswerCard', '.modelAnswerNote'],
      sources: [
        {
          label: 'Paper 2 mark scheme',
          ref: '2023MJ-21 Q2(a)',
          question: 'Identify two functions of money.',
          extract: 'Accepted functions: medium of exchange, unit of account / measure of value, store of value, and standard of deferred payments.',
        },
      ],
    },

    {
      type: 'exam',
      eyebrow: 'Paper 2 practice',
      title: 'Explain two functions of money. [4]',
      examSpec: { paper: 'Paper 2', marks: 4, command: 'Explain', pattern: '2 x (1 + 1)', skills: ['k', 'an'] },
      keywordLabel: 'Build two complete links',
      keywords: ['name the function', 'explain what it does', 'one mark + one mark'],
      prompt: 'For each function, name it and explain what money allows people to do.',
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2023ON-21 Q3(b)',
          question: 'Explain two functions of money.',
          extract: 'MS basis: one mark for each of two functions identified and one mark for each explanation.',
        },
      ],
      notes: "Optional consolidation after the core exit ticket. Do not assume this question was completed in the first class.",
    },

    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Explain two functions of money. [4]',
      examSpec: { paper: 'Paper 2', marks: 4, command: 'Explain', pattern: '2 x (1 + 1)', skills: ['k', 'an'] },
      paragraphs: [
        'Money is a medium of exchange because it is used to buy goods and services and to trade.',
        'Money is a unit of account because it measures how much a product is worth, allowing values to be compared.',
      ],
      links: ['medium of exchange', 'buy goods and services', 'unit of account', 'measures how much a product is worth'],
      showLinkChips: false,
      markSchemeNote: 'Each paragraph earns one mark for naming the function and one mark for explaining what it enables.',
      partialReview: ['.modelAnswerCard', '.modelAnswerNote'],
      sources: [
        {
          label: 'Paper 2 mark scheme',
          ref: '2023ON-21 Q3(b)',
          question: 'Explain two functions of money.',
          extract: 'Accepted links include medium of exchange -> buy goods and services / trade, and unit of account -> measure how much a product is worth.',
        },
      ],
    },
  ],
};
