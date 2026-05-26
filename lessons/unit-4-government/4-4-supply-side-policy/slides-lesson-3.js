/* ============================================================
   Lesson 4.4 - Supply-side policy
   Cambridge IGCSE Economics 0455 - Unit 4: Government and the macroeconomy

   Syllabus source:
   ../../../references/igcse-economics-syllabus-2027-2029.md
   Definitions source:
   ../../../references/igcse-economics-definitions-2026.md
   Paper 2 mark-scheme archive:
   ../../../references/paper-2-mark-schemes-2023-2025/4-government-and-macroeconomy.md

   Pacing note:
   Lesson 3 focuses on market-based supply-side policies in 4.4.2. These
   work through incentives, profit, competition and labour-market flexibility:
   tax incentives, privatisation, deregulation and labour-market reforms.
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.supplySidePolicy;
const ppcMarketRight = {
  type: 'diagram',
  kind: 'ppc',
  mode: 'rightShift',
  title: 'PPC: investment raises capacity',
  caption: 'If incentives increase capital or technology, PPC1 shifts to PPC2.',
};
const ppcEfficiencyMove = {
  type: 'diagram',
  kind: 'ppc',
  mode: 'insideToOn',
  title: 'PPC: efficiency uses resources better',
  caption: 'Efficiency gains may move output towards the PPC before capacity expands.',
};
IGCSE.lesson = {
  meta: {
    code:         '4.4.2',
    unit:         'Unit 4 - Government and the macroeconomy',
    title:        'Supply-side policy lesson 3: market-based supply-side policies - Cambridge IGCSE Economics 0455',
    lessonLabel:  'Supply-side policy lesson 3',
    courseLabel:  'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow:  'Lesson overview',
      title:    'Market-based supply-side policies',
      zhTitle: '市场型供给侧政策',
      subtitle: 'Supply-side policy lesson 3 - 4.4.2',
      kicker:   'How can markets, profit and competition raise productive capacity?',
      visual:   photos.stockCertificate,
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title:   'Using incentives',
      question: 'What would make a firm more likely to invest if the government wants to use markets rather than direct spending?',
      zh: '如果政府想利用市场而不是直接支出，什么会让企业更愿意投资？',
      answer: 'Lower taxes, fewer barriers, stronger competition and more flexible labour markets can raise expected profit and efficiency.',
      answerZh: '更低税收、更少壁垒、更强竞争和更灵活的劳动力市场可以提高预期利润和效率。',
      visual: photos.chipsInvestment,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives - 4.4.2',
      title:   'By the end, you can',
      bullets: [
        'Classify tax cuts, privatisation, deregulation and labour-market reforms as market-based policies.',
        'Explain how tax incentives can raise investment.',
        'Explain how privatisation and deregulation may raise efficiency.',
        'Evaluate risks such as inequality, weaker protection and uncertain investment.',
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title:   'Market-based policies',
      zhTitle: '市场型政策',
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title:   'Markets create incentives',
      cardStyle: 'compactVisual',
      cards: [
        { title: 'Tax cuts', zhTitle: '减税', body: 'raise retained profit and work incentives', icon: 'subsidy' },
        { title: 'Privatisation', zhTitle: '私有化', body: 'private ownership may raise efficiency', icon: 'industry' },
        { title: 'Deregulation', zhTitle: '放松管制', body: 'lower barriers and business costs', icon: 'market' },
        { title: 'Labour-market reform', zhTitle: '劳动力市场改革', body: 'make hiring or job search more responsive', icon: 'employment' },
      ],
      footer: 'Market-based supply-side policy changes incentives rather than directly building capacity.',
      visual: ppcMarketRight,
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Which measure is most clearly market-based supply-side policy?',
      choices: [
        'Deregulating a market to increase competition.',
        'Building a new government-funded road.',
        'Increasing public healthcare spending.',
        'Subsidising worker training directly.',
      ],
      answer: 0,
      prompt: 'Market-based policies work through incentives, competition and flexibility.',
      visual: photos.mobilePhoneStore,
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title:   'Tax incentives',
      zhTitle: '税收激励',
    },
    {
      type: 'fact',
      eyebrow: 'Example',
      facts: {
        left: {
          country: 'Exam archive',
          context: 'A cut in corporation tax can increase retained profit and the incentive for firms to invest.',
          question: 'How could lower corporation tax increase investment and total supply?',
          questionZh: '降低公司税会如何增加投资和总供给？',
          answer: 'Higher retained profit can encourage firms to invest, increasing total supply over time.',
          source: 'Source: 2025MJ-21 Q4(c), Cambridge IGCSE Economics 0455 Paper 2 archive.',
        },
        china: {
          country: 'China comparison',
          context: 'Tax incentives can be targeted at investment, innovation or small firms to encourage expansion.',
          question: 'How could targeted tax incentives increase productive capacity?',
          questionZh: '有针对性的税收激励会如何提高生产能力？',
          answer: 'Higher retained profit can encourage firms to invest, increasing total supply over time.',
          source: 'Source: Cambridge 4.4 supply-side policy syllabus wording and Paper 2 archive.',
        },
      },
      visual: photos.corporationTaxReturn,
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title:   'Tax incentive route',
      zhTitle: '税收激励路径',
      nodes: [['lower corporation tax', 'retained profit rises', 'investment may rise', 'productive capacity may rise']],
      footer: 'Paper 2 basis: a corporation-tax cut can increase investment, technology and output.',
      visual: photos.corporationTaxReturn,
      partialReview: ['.flowRow > .flowChip', '.prompt'],
    },
    {
      type: 'cards',
      eyebrow: 'PPC reasoning',
      title:   'Investment on a PPC',
      cards: [
        ['Tax cut', 'retained profit and expected reward may rise'],
        ['Investment', 'firms may buy capital equipment or technology'],
        ['Capacity', 'maximum output can increase'],
        ['PPC result', 'PPC shifts right if the investment raises productive capacity'],
      ],
      footer: 'Use "may" because firms might save profits instead of investing.',
      visual: ppcMarketRight,
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title:   'Competition and flexibility',
      zhTitle: '竞争与灵活性',
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      title:   'Privatisation',
      zhTitle: '私有化',
      term:    'privatisation',
      definition: 'The sale or transfer of assets from the public sector to the private sector.',
      definitionZh: '将资产从公共部门出售或转移给私营部门。',
      examples: [
        ['Possible benefit', 'profit motive may raise efficiency'],
        ['Possible risk', 'private monopoly may raise prices'],
        ['Exam word', 'evaluate, do not assume it always helps'],
      ],
      visual: photos.stockCertificate,
      partialReview: ['.termBox', '.termExamples > .termExample'],
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title:   'Market-based reforms',
      cardStyle: 'compactVisual',
      cards: [
        { title: 'Privatisation', zhTitle: '私有化', body: 'private ownership may increase efficiency and investment', icon: 'industry' },
        { title: 'Deregulation', zhTitle: '放松管制', body: 'fewer rules may reduce business costs and entry barriers', icon: 'market' },
        { title: 'Labour-market reform', zhTitle: '劳动力市场改革', body: 'rules may make hiring easier or strengthen work incentives', icon: 'employment' },
        { title: 'Trade union reform', zhTitle: '工会改革', body: 'may reduce wage pressure but can reduce worker protection', icon: 'redistribution' },
      ],
      footer: 'Evaluation: reforms can raise efficiency, but may create inequality or weaker standards.',
      visual: ppcEfficiencyMove,
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'cards',
      eyebrow: 'PPC reasoning',
      title:   'Efficiency on a PPC',
      cards: [
        ['Deregulation', 'may reduce business costs and barriers to entry'],
        ['Privatisation', 'may strengthen incentives to cut waste'],
        ['Inside to on', 'better resource use can move output closer to the PPC'],
        ['Right shift', 'if investment or technology rises, capacity may also increase'],
      ],
      footer: 'Separate better use of current capacity from a rise in productive capacity.',
      visual: ppcEfficiencyMove,
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title:   'Who gains?',
      question: 'Why might market-based supply-side policies increase efficiency but also create fairness concerns?',
      zh: '为什么市场型供给侧政策可能提高效率，但也带来公平问题？',
      answer: 'Firms may face lower costs and stronger incentives, but workers or consumers may have weaker protection and inequality may rise.',
      answerZh: '企业可能成本更低、激励更强，但工人或消费者保护可能减弱，不平等也可能上升。',
      visual: photos.smallMobilePhoneShop,
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title:   'Fill in the blanks',
      mode:    'fillBlanks',
      steps: [
        ['1', 'Market-based policies rely on prices, profit and __________.', 'competition'],
        ['2', 'A lower corporation tax can increase the incentive to __________.', 'invest'],
        ['3', 'Deregulation can reduce business costs and barriers to __________.', 'entry'],
        ['4', 'Privatisation transfers assets from the public sector to the __________ sector.', 'private'],
      ],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title:   'Analyse investment',
      question: 'Analyse how a cut in corporation tax can increase economic growth.',
      keywords: ['retained profit', 'investment', 'technology', 'productive capacity'],
      prompt:   'Use 2025MJ-21 Q4(c): profits retained, investment rises, capital or technology improves, output rises.',
      visual:   photos.corporationTaxReturn,
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Exam answer',
      title:   'Model answer',
      question: 'Analyse how a cut in corporation tax can increase economic growth.',
      answer: 'A cut in corporation tax can allow firms to keep more retained profit. This may increase investment in capital equipment and technology. Better technology can raise productivity and productive capacity, allowing firms to produce more output, so real GDP and economic growth may increase.',
      links: ['retained profit', 'investment', 'technology', 'productive capacity'],
      markSchemeNote: 'This follows analyse wording by developing a logical chain from lower tax to investment, capacity and real GDP.',
      partialReview: ['.modelAnswerCard', '.modelAnswerLinks > span', '.modelAnswerNote'],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title:   'Exit ticket',
      zhTitle: '离堂小测',
      mode:    'fillBlanks',
      steps: [
        ['1', 'Deregulation can reduce barriers to market __________.', 'entry'],
        ['2', 'Market-based policies use incentives rather than direct government __________.', 'spending'],
        ['3', 'Privatisation may increase efficiency but can reduce worker or consumer __________.', 'protection'],
        ['4', 'Lower taxes can reduce government tax __________.', 'revenue'],
      ],
      cue: 'Answer before leaving.',
    },
  ],
};
