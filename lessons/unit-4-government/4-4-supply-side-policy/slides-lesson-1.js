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
   Lesson 1 focuses on 4.4.1. Keep the contrast with fiscal and monetary
   policy explicit: demand-side policies mainly shift aggregate demand, while
   supply-side policy raises productive capacity, efficiency and long-run output.
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.supplySidePolicy;
const factPhotos = IGCSE.photos.supplySidePolicyFacts;
const ppcRightShift = {
  type: 'diagram',
  kind: 'ppc',
  mode: 'rightShift',
  title: 'PPC: supply-side growth',
  caption: 'Better resources or technology can shift PPC1 to PPC2.',
};
IGCSE.lesson = {
  meta: {
    code:         '4.4.1',
    unit:         'Unit 4 - Government and the macroeconomy',
    title:        'Supply-side policy lesson 1: productive capacity and total supply - Cambridge IGCSE Economics 0455',
    lessonLabel:  'Supply-side policy lesson 1',
    courseLabel:  'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow:  'Lesson overview',
      title:    'Supply-side policy',
      zhTitle: '供给侧政策',
      subtitle: 'Supply-side policy lesson 1 - 4.4.1',
      kicker:   'How can policy raise what an economy is able to produce?',
      visual:   photos.industrialRobot,
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title:   'More demand or more capacity?',
      question: 'If firms already have full order books but cannot find skilled workers, should policy mainly increase spending or capacity?',
      zh: '如果企业订单很多，却找不到熟练工人，政策应主要增加支出还是增加生产能力？',
      answer: 'Capacity. More spending may raise prices, but skills, infrastructure and investment can help firms produce more.',
      answerZh: '应增加生产能力。更多支出可能推高价格，而技能、基础设施和投资能帮助企业增加产量。',
      visual: photos.vwApprentices,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title:   'By the end, you can',
      bullets: [
        'Define supply-side policy.',
        'Explain productive capacity and efficiency.',
        'Classify supply-side policies as interventionist or market-based.',
      ],
      zhBullets: [
        '定义供给侧政策。',
        '解释生产能力和效率。',
        '判断供给侧政策是干预型还是市场化。',
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title:   'Supply-side policy',
      zhTitle: '供给侧政策',
    },
        {
      type: 'visualPause',
      title: 'Visual pause: Singapore',
      visual: factPhotos.skillsTraining,
      notes: 'Example: Singapore / China. Former fact context: SkillsFuture Credit began with a S$500 opening credit for eligible adults to support skills development. | China reported about 10 million technical and skilled workers trained each year by vocational colleges and schools. Teacher question: How could training subsidies increase labour productivity? Possible answer: Training improves workers\' skills, so each worker can produce more output per hour. Source: Source: SkillsFuture Singapore, 2015 launch materials. | Source: China Ministry of Education, 13th Five-Year Plan vocational education briefing.',
    },
    {
      type: 'term',
      keyTerms: [
        { term: 'productive capacity', zh: '生产能力', note: 'maximum output potential' },
        { term: 'total supply', zh: '总供给', note: 'economy-wide supply' },
        { term: 'efficiency', zh: '效率', note: 'better use of resources' },
        { term: 'mobility', zh: '流动性', note: 'factors can move usefully' },
      ],
      showExamples: false,
      eyebrow: 'Learn',
      title:   'Supply-side policy',
      zhTitle: '供给侧政策',
      term:    'supply-side policy',
      definition: 'Policy measures designed to increase productive capacity, total supply, efficiency or mobility of factors of production.',
      definitionZh: '旨在提高生产能力、总供给、效率或生产要素流动性的政策措施。',
      examples: [
        ['Capacity', 'more or better resources'],
        ['Efficiency', 'more output from the same resources'],
        ['Mobility', 'resources move to where they are needed'],
      ],
    },
    {
      type: 'compare',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title:   'Demand-side vs supply-side',
      leftTitle:  'Demand-side policy',
      left:  [
        ['1', 'changes aggregate __________', 'demand'],
        ['2', 'often has a shorter-term __________', 'impact'],
        ['3', 'examples: fiscal and monetary __________', 'stimulus'],
      ],
      rightTitle: 'Supply-side policy',
      right: [
        ['1', 'raises total __________', 'supply'],
        ['2', 'often works over the long __________', 'run'],
        ['3', 'examples: education, infrastructure, tax __________', 'incentives'],
      ],      visual: photos.fed,    },
    {
      type: 'compare',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title:   'Two types of supply-side policy',
      leftTitle:  'Interventionist',
      left:  [
        ['1', 'government spending or direct __________', 'support'],
        ['2', 'education, training, healthcare and __________', 'infrastructure'],
        ['3', 'subsidies to encourage __________', 'production'],
      ],
      rightTitle: 'Market-based',
      right: [
        ['1', 'change incentives through __________', 'markets'],
        ['2', 'tax cuts, privatisation and __________', 'deregulation'],
        ['3', 'labour-market __________', 'reforms'],
      ],      visual: photos.singaporeIte,    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title:   'Long-run output',
      zhTitle: '长期产出',
      nodes: [['better skills or capital', 'productivity rises', 'productive capacity rises', 'long-run output can rise']],
      footer: 'Syllabus terms: productive capacity, efficiency and long-run output.',
      visual: photos.industrialRobot,
      partialReview: ['.flowRow > .flowChip', '.prompt'],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Which answer best describes the aim of supply-side policy?',
      choices: [
        'To increase productive capacity and total supply.',
        'To reduce all production in the economy.',
        'To use only interest rates to reduce spending.',
        'To make imports illegal.',
      ],
      answer: 0,
      prompt: 'Supply-side policy focuses on the economy\'s ability to produce.',
      visual: photos.industrialRobot,
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title:   'Capacity, efficiency and output',
      zhTitle: '能力、效率与产出',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title:   'What sets the PPC?',
      question: 'The PPC is the boundary of what an economy can produce with its current resources and technology.',
      zhTitle: '什么决定PPC？',
      nodes: [
        [
          { text: '__________', answer: 'resources', zh: '中文提示： resources' },
          { text: '__________', answer: 'technology', zh: '中文提示： technology' },
          { text: '__________', answer: 'productivity', zh: '中文提示： productivity' },
          { text: 'productive __________', answer: 'capacity', zh: '中文提示： productive capacity' },
          { text: 'PPC __________', answer: 'boundary', zh: '生产可能性曲线边界' },
        ]
      ],
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title:   'From policy to PPC shift',
      zhTitle: '生产可能性曲线联系',
      lead:    'Start with the policy, then prove why capacity changes.',
      cards: [
        ['1. Policy change', 'education, investment, infrastructure or technology improves supply conditions'],
        ['2. Factor link', 'labour becomes more productive or capital/technology improves'],
        ['3. Capacity link', 'maximum possible output rises'],
        ['4. Diagram link', 'PPC shifts right from PPC1 to PPC2'],
      ],
      footer: 'Supply-side policy connects back to the PPC work in Unit 1.',
      visual: ppcRightShift,
    },
    {
      type: 'cards',
      eyebrow: 'Past paper reasoning',
      title:   'Past paper right-shift causes',
      cards: [
        ['Technological progress', 'more output can be produced from the same resources'],
        ['Investment', 'more or better capital increases productive capacity'],
        ['Education and training', 'higher-quality labour raises productivity'],
        ['Infrastructure', 'lower transport and communication costs let firms expand output'],
      ],
      footer: 'Past paper chain: policy or cause -> better factors/productivity -> higher productive capacity -> PPC shifts right.',
      visual: ppcRightShift,
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title:   'Fill in the blanks',
      mode:    'fillBlanks',
      steps: [
        ['1', 'Supply-side policy aims to increase productive __________.', 'capacity'],
        ['2', 'Higher productivity means more output per worker or per __________.', 'input'],
        ['3', 'A rightward PPC shift shows higher productive __________.', 'capacity'],
        ['4', 'Supply-side policy usually affects the economy in the long __________.', 'run'],
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title:   'Exam distinction',
      zhTitle: '考试区分',
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title:   'Explain one difference between monetary policy and supply-side policy. [4]',
      keywords: ['central bank', 'government', 'aggregate demand', 'total supply'],
      prompt:   'Use the contrast from 2025ON-22 Q5(b): who implements it and whether it targets demand or supply.',
      visual:   photos.fed,
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'modelAnswer',
      partialReview: ['.modelAnswerCard'],
      showLinkChips: false,
      eyebrow: 'Exam answer',
      title:   'Explain one difference between monetary policy and supply-side policy. [4]',
      question: 'Explain one difference between monetary policy and supply-side policy.',
      answer: 'Monetary policy is usually carried out by a central bank and uses measures such as interest rates to influence aggregate demand. Supply-side policy is usually carried out by the government and aims to increase total supply or productive capacity, for example through education, training or infrastructure.',
      links: ['central bank', 'government', 'aggregate demand', 'total supply'],
      partialReview: ['.modelAnswerCard'],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title:   'Exit ticket',
      zhTitle: '\u79bb\u5802\u5c0f\u6d4b',
      mode:    'fillBlanks',
      steps: [
        ['1', 'Monetary policy mainly influences total __________.', 'demand'],
        ['2', 'Supply-side policy aims to increase total __________.', 'supply'],
        ['3', 'Supply-side effects often take __________ than demand-side effects.', 'longer'],
        ['4', 'Supply-side policies can be interventionist or market-__________.', 'based'],
      ],
      cue: 'Answer before leaving.',
    },
  ],
};
