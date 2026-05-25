/* Sources:
   Syllabus 2027-2029: ../../../references/igcse-economics-syllabus-2027-2029.md (2.8)
   Definitions 2026: ../../../references/igcse-economics-definitions-2026.md (Market economic system, Price mechanism)
   Paper 2 archive: ../../../references/paper-2-mark-schemes-2023-2025/2-allocation-of-resources.md (2.8)
*/
window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.marketTeaching;

IGCSE.lesson = {
  meta: {
    code: '2.8.1',
    unit: 'Unit 2 - The allocation of resources',
    title: 'Market economic system lesson 1 - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Market economic system lesson 1',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },
  slides: [
    {
      type: 'hero',
      eyebrow: 'Lesson overview',
      title: 'Market economic system',
      zhTitle: '市场经济体制',
      subtitle: '2.8.1 - markets, private ownership and the price mechanism',
      kicker: 'How can millions of private decisions allocate scarce resources?',
      visual: photos.starbucks,
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'Who decides?',
      question: 'At Pike Place Market, who decides what coffee is sold, what price is charged and whether the store survives?',
      zh: '在派克市场，谁决定出售哪种咖啡、收取什么价格以及这家店能否生存？',
      answer: 'Consumers and firms both matter: consumer demand affects sales, while the firm sets prices and decides what to supply.',
      answerZh: '消费者和企业都会影响结果：消费者需求影响销量，企业决定价格和供应什么。',
      visual: photos.starbucks,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives - 2.8.1',
      title: 'By the end, you can',
      bullets: [
        'Define a market economic system using syllabus wording.',
        'Explain private ownership and the profit motive.',
        'Explain how markets and the price mechanism allocate resources.',
        'Distinguish market, mixed and planned economic systems.',
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Market economy basics',
      zhTitle: '市场经济基础',
    },
    {
      type: 'fact',
      eyebrow: 'Specific example',
      facts: {
        left: {
          country: 'United States',
          fact: 'Starbucks operated over 16,000 stores in the United States in 2024, showing private firms allocating resources to meet demand.',
          source: 'Source: Starbucks FY2024 Form 10-K.',
        },
        china: {
          country: 'China',
          fact: 'Starbucks had more than 7,600 stores in China at the end of fiscal 2024.',
          source: 'Source: Starbucks FY2024 Form 10-K.',
        },
      },
      visual: photos.starbucks,
    },
    {
      type: 'systemCompare',
      eyebrow: 'Learn',
      title: 'Three economic systems',
      systems: [
        {
          visual: 'market',
          title: 'Market economy',
          points: ['private ownership', 'prices set by demand and supply', 'profit motive guides firms'],
        },
        {
          visual: 'mixed',
          title: 'Mixed economy',
          points: ['private and public sectors', 'markets plus government intervention', 'most real economies'],
        },
        {
          visual: 'planned',
          title: 'Planned economy',
          points: ['public ownership', 'government planning', 'prices may be set centrally'],
        },
      ],
      prompt: 'Exam focus: the market economic system.',
      partialReview: ['.systemCompare > .systemCard', '.prompt'],
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      title: 'Market economic system',
      zhTitle: '市场经济制度',
      term: 'market economic system',
      definition: 'An economy where resources are allocated mainly by market forces or the price mechanism, with private sector ownership and decisions influenced by the profit motive.',
      definitionZh: '一种经济制度，资源主要由市场力量或价格机制配置，以私营部门所有为主，决策受利润动机影响。',
      examples: [
        ['Markets', 'buyers and sellers interact'],
        ['Private ownership', 'resources owned by individuals and firms'],
        ['Price mechanism', 'prices signal where resources should move'],
      ],
      visual: photos.bubbleTeaShop,
      partialReview: ['.termBox', '.termExamples > .termExample'],
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'Four core features',
      cardStyle: 'compactVisual',
      cards: [
        { title: 'Markets', zhTitle: '市场', body: 'buyers and sellers decide what is exchanged', icon: 'market' },
        { title: 'Private ownership', zhTitle: '私有制', body: 'resources are owned by individuals and firms', icon: 'industry' },
        { title: 'Price mechanism', zhTitle: '价格机制', body: 'prices act as signals and incentives', icon: 'prices' },
        { title: 'Profit motive', zhTitle: '利润动机', body: 'profit rewards firms for satisfying demand', icon: 'growth' },
      ],
      visual: photos.bubbleTeaShop,
      partialReview: ['.cardgrid > .card'],
    },
    {
      type: 'fact',
      eyebrow: 'Specific example',
      facts: {
        left: {
          country: 'United States',
          fact: 'In 2024, small businesses made up 99.9% of all US businesses.',
          source: 'Source: US Small Business Administration, 2024 Small Business Profile.',
        },
        china: {
          country: 'China',
          fact: 'China said private enterprises account for more than 90% of all enterprises.',
          source: 'Source: State Council Information Office, 2024.',
        },
      },
      visual: photos.bubbleTeaShop,
    },
    {
      type: 'compare',
      eyebrow: 'Learn',
      title: 'Private sector and public sector',
      leftTitle: 'Private sector',
      left: ['owned by individuals or shareholders', 'usually aims to earn profit', 'examples: shops, restaurants, app firms'],
      rightTitle: 'Public sector',
      right: ['owned or controlled by government', 'often provides services for society', 'examples: state schools, public hospitals, defence'],
      visual: photos.healthcare,
      partialReview: ['.splitCols > .card'],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Which phrase best proves an economy is mainly a market economic system?',
      choices: [
        'Resources are allocated mainly through private ownership, markets and prices.',
        'Government owns all resources and sets every output target.',
        'All goods are provided free by the public sector.',
      ],
      answer: 0,
      prompt: 'Use the exact syllabus wording.',
    },
    {
      type: 'fact',
      eyebrow: 'Specific example',
      facts: {
        left: {
          country: 'Global',
          fact: 'In 2024, global retail e-commerce sales were estimated at over USD 6 trillion, showing markets coordinating buyers and sellers at scale.',
          source: 'Source: eMarketer/Insider Intelligence, 2024 estimate.',
        },
        china: {
          country: 'China',
          fact: 'China remained the world’s largest online retail market in 2024.',
          source: 'Source: China Ministry of Commerce, 2024 retail reporting.',
        },
      },
      visual: photos.phoneDisplay,
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '离堂小测',
      mode: 'fillBlanks',
      steps: [
        ['1', 'A market economic system allocates resources mainly through markets, private ownership and the price __________.', 'mechanism'],
        ['2', 'Private firms are influenced by the profit __________.', 'motive'],
        ['3', 'In a planned economy, government planning is more __________.', 'important'],
        ['4', 'Most real economies are __________ economies.', 'mixed'],
      ],
    },
  ],
};
