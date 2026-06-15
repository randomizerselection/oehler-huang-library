/* ============================================================
   Cambridge IGCSE Business 0264 - Unit 5
   Lesson 5.1.1: The need for business finance

   Reference:
   ../../../references/igcse-business-0264-syllabus-2027-2029.md
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.businessFinance || {};

const businessSyllabus = {
  label: 'Syllabus source',
  ref: 'Cambridge IGCSE Business 0264 syllabus 2027-2029, 5.1.1',
  note: 'Need for finance, short-term and long-term finance needs, and working capital.',
};

const formulaSource = {
  label: 'Formula source',
  ref: 'Cambridge IGCSE Business 0264 formulas and ratios',
  note: 'Working capital = current assets - current liabilities.',
};

IGCSE.lesson = {
  meta: {
    subject: 'business',
    code: '5.1.1',
    unit: 'Unit 5 - Financial information and decisions',
    title: 'The need for business finance - Cambridge IGCSE Business 0264',
    lessonLabel: 'Business finance lesson 1',
    courseLabel: 'Cambridge IGCSE Business 0264',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
    courseIndexUrl: '../../index.html',
    courseIndexLabel: 'Business index',
    availableViews: ['slides', 'handout'],
    sources: [businessSyllabus, formulaSource],
  },

  slides: [
    {
      type: 'hero',
      eyebrow: 'Overview',
      title: 'The need for business finance',
      zhTitle: '企业为什么需要资金',
      subtitle: 'Unit 5.1.1 - Financial information and decisions',
      kicker: 'A business does not only need a good idea. It needs cash at the right time.',
      visual: photos.phoneShop,
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'The first month problem',
      question: 'Harbor Phone Repair wants to open a small shop. Which must be paid before customers start bringing in phones?',
      zh: 'Harbor Phone Repair想开一家小维修店。在顾客开始送手机维修之前，哪些费用必须先支付？',
      answer: 'Rent deposit, tools, spare parts, signs and some wages may need to be paid before sales revenue arrives.',
      answerZh: '房租押金、工具、零件、招牌和部分工资可能要在销售收入到来之前先支付。',
      visual: photos.phoneShop,
      notes: 'Push students to separate a business idea from the finance needed to start operating.',
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Explain why businesses need finance.',
        'Distinguish short-term and long-term finance needs.',
        'Calculate and explain working capital.',
      ],
      zhBullets: [
        '解释企业为什么需要资金。',
        '区分短期和长期资金需求。',
        '计算并解释营运资金。',
      ],
    },
    {
      type: 'paperExtract',
      eyebrow: 'Case data',
      title: 'Harbor Phone Repair: start-up plan',
      paragraphs: [
        'Harbor Phone Repair is a small private sector business owned by Lina. It repairs phones and sells basic accessories.',
        'Lina has found a shop near a school and a bus stop. Before opening, she must pay a rent deposit, buy repair tools, buy initial inventory and pay for a sign.',
        'She also wants to keep enough cash to pay suppliers and wages during the first month, when customer numbers may be uncertain.',
      ],
      question: 'What finance needs can you identify from the case?',
      source: 'Original teaching case written for this deck.',
    },
    {
      type: 'section',
      eyebrow: 'Part 1',
      title: 'Why finance is needed',
      zhTitle: '资金需求的原因',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: small phone shop',
      visual: photos.phoneShop,
      objectPosition: 'center center',
      notes: 'Ask: what must the owner pay for before the first repair is completed? Bridge to start-up capital and working capital.',
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'Five reasons businesses need finance',
      cardStyle: 'compactVisual',
      cardLayout: 'balancedGrid',
      cards: [
        { title: 'Start-up capital', zhTitle: '创业启动资金', body: 'money needed before trading begins', icon: 'payments' },
        { title: 'Expansion or growth', zhTitle: '扩张或成长', body: 'larger premises, more staff or more inventory', icon: 'growth' },
        { title: 'Replace non-current assets', zhTitle: '更换非流动资产', body: 'replace old tools, machinery or vehicles', icon: 'industry' },
        { title: 'Invest in new technology', zhTitle: '投资新技术', body: 'new equipment, software or production methods', icon: 'prices' },
        { title: 'Working capital', zhTitle: '营运资金', body: 'cash for day-to-day running costs', icon: 'bank' },
      ],
      footer: 'In Business answers, name the need and connect it to the specific business.',
    },
    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'Classify the finance need',
      prompt: 'Classify each Harbor Phone Repair cost, then justify one answer using the case.',
      categories: [
        { title: 'Start-up capital', clue: 'needed before trading begins' },
        { title: 'Expansion or growth', clue: 'needed to make the business larger' },
        { title: 'Replace non-current assets', clue: 'needed because a long-term asset is worn out' },
        { title: 'Invest in new technology', clue: 'needed for newer equipment or software' },
        { title: 'Working capital', clue: 'needed for day-to-day operations' },
      ],
      items: [
        { text: 'Rent deposit before the shop opens', answer: 'Start-up capital', reason: 'It is paid before trading begins.' },
        { text: 'Extra inventory before opening a second repair counter', answer: 'Expansion or growth', reason: 'It supports a larger scale of operation.' },
        { text: 'New diagnostic software for newer phone models', answer: 'Invest in new technology', reason: 'It improves the technology used by the business.' },
        { text: 'Cash kept aside to pay suppliers next week', answer: 'Working capital', reason: 'It helps pay short-term day-to-day costs.' },
      ],
      sharePrompt: 'Share one answer using the phrase: This is a finance need because...',
    },
    {
      type: 'section',
      eyebrow: 'Part 2',
      title: 'Short-term or long-term?',
      zhTitle: '短期还是长期？',
    },
    {
      type: 'compare',
      eyebrow: 'Learn',
      mode: 'fillBlanks',
      leftTitle: 'Short-term finance need',
      left: [
        ['1', 'Needed for a __________ period.', 'short'],
        ['2', 'Often linked to day-to-day __________.', 'cash flow'],
        ['3', 'Example: paying suppliers before customers __________.', 'pay'],
      ],
      rightTitle: 'Long-term finance need',
      right: [
        ['1', 'Needed for a __________ period.', 'long'],
        ['2', 'Often linked to non-current __________.', 'assets'],
        ['3', 'Example: buying a van or opening another __________.', 'shop'],
      ],
      prompt: 'The time period helps a business choose a suitable finance source.',
    },
    {
      type: 'dataTable',
      eyebrow: 'Apply',
      title: 'Harbor Phone Repair: time period',
      lead: 'Use the purpose and time period to decide whether the need is short-term or long-term.',
      table: {
        columns: ['Finance need', 'Amount', 'Likely time period', 'Reason'],
        rows: [
          ['Initial spare parts inventory', '$900', 'Short-term', 'Parts are sold or used soon after opening.'],
          ['Shop refit and repair bench', '$8,000', 'Long-term', 'The refit will be used for several years.'],
          ['Cash for wages before revenue arrives', '$1,500', 'Short-term', 'It covers immediate operating costs.'],
          ['Second branch next year', '$18,000', 'Long-term', 'It supports expansion over a longer period.'],
        ],
        align: ['', 'right', '', ''],
        caption: 'Business exam skill: match the finance need to the time period and purpose.',
      },
      prompt: 'Choose one row and explain why the time period matters.',
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'A rent deposit before trading begins is part of __________ capital.', 'start-up'],
        ['2', 'Cash for day-to-day costs is linked to __________ capital.', 'working'],
        ['3', 'Buying a repair bench used for several years is a __________-term finance need.', 'long'],
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 3',
      title: 'Working capital',
      zhTitle: '营运资金',
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      definitionCue: 'Key term',
      title: 'Working capital',
      zhTitle: '营运资金',
      term: 'working capital',
      definition: 'The finance available for day-to-day running of a business, calculated as current assets minus current liabilities.',
      definitionZh: '企业用于日常经营的资金，计算方法是流动资产减去流动负债。',
      formula: 'Working capital = current assets - current liabilities',
      keyTerms: [
        { term: 'day-to-day running', zh: '日常经营', note: 'regular costs such as wages, inventory and supplier payments' },
        { term: 'current assets', zh: '流动资产', note: 'assets expected to turn into cash within a year' },
        { term: 'current liabilities', zh: '流动负债', note: 'debts due within a year' },
      ],
      showExamples: false,
    },
    {
      type: 'dataTable',
      eyebrow: 'Calculate',
      title: 'Working capital calculation',
      lead: 'Harbor Phone Repair has these current assets and current liabilities at the end of its first month.',
      table: {
        columns: ['Item', 'Amount'],
        rows: [
          ['Cash', '$2,200'],
          ['Inventory of phone cases', '$1,100'],
          ['Trade receivables', '$700'],
          ['Trade payables', '$1,300'],
          ['Short-term overdraft', '$600'],
          ['Working capital', '$2,100'],
        ],
        align: ['', 'right'],
        caption: 'Current assets = $4,000. Current liabilities = $1,900. Working capital = $2,100.',
      },
      prompt: 'Interpret the result: can the business cover its short-term liabilities?',
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Explain two reasons why Harbor Phone Repair needs finance before opening. [4]',
      keywordLabel: 'Use the case',
      keywords: ['start-up capital', 'tools and rent deposit', 'working capital', 'pay suppliers and wages'],
      prompt: 'Write two developed points. Each point needs a reason linked to Harbor Phone Repair.',
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Explain two reasons why Harbor Phone Repair needs finance before opening. [4]',
      paragraphs: [
        'Harbor Phone Repair needs start-up capital because it must pay for the rent deposit, tools and signs before it can start trading.',
        'It also needs working capital because it must pay suppliers and wages during the first month before enough customer revenue arrives.',
      ],
      links: ['start-up capital', 'rent deposit', 'tools', 'working capital', 'suppliers', 'wages', 'revenue'],
      showLinkChips: false,
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '离堂小测',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Start-up capital is finance needed before a business starts __________.', 'trading'],
        ['2', 'Working capital is current assets minus current __________.', 'liabilities'],
        ['3', 'A finance need for new equipment used for years is usually __________-term.', 'long'],
        ['4', 'A Business answer should apply the finance need to the given __________.', 'business'],
      ],
    },
  ],
};
