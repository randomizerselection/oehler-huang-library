/* Sources:
   Syllabus 2027-2029: ../../../references/igcse-economics-syllabus-2027-2029.md (2.8; price mechanism link to 2.4)
   Definitions 2026: ../../../references/igcse-economics-definitions-2026.md (Price mechanism, Consumer sovereignty)
   Paper 2 archive: ../../../references/paper-2-mark-schemes-2023-2025/2-allocation-of-resources.md (2.8)
*/
window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.marketTeaching;

IGCSE.lesson = {
  meta: {
    code: '2.8.1',
    unit: 'Unit 2 - The allocation of resources',
    title: 'Market economic system lesson 2: price mechanism - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Market economic system lesson 2',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },
  slides: [
    {
      type: 'hero',
      eyebrow: 'Lesson overview',
      title: 'Price mechanism',
      zhTitle: '价格机制',
      subtitle: '2.8.1 - demand and supply signals allocate resources',
      kicker: 'How do prices tell firms where resources should move?',
      visual: photos.vegetables,
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'Signals on the shelf',
      question: 'If a supermarket vegetable shelf sells out every afternoon, what signal is the market sending to the shop?',
      zh: '如果超市的蔬菜货架每天下午都卖空，市场向商店发出了什么信号？',
      answer: 'Demand is higher than the shop expected, so the price may rise and the shop may order more vegetables.',
      answerZh: '需求高于商店预期，因此价格可能上升，商店也可能订购更多蔬菜。',
      visual: photos.vegetables,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives - 2.8.1',
      title: 'By the end, you can',
      bullets: [
        'Explain prices as signals and incentives.',
        'Show how rising demand can move resources into production.',
        'Show how falling demand can move resources away from production.',
        'Apply the price mechanism to a specific market example.',
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Price signals',
      zhTitle: '价格信号',
    },
    {
      type: 'fact',
      eyebrow: 'Specific example',
      facts: {
        left: {
          country: 'World',
          context: 'Electric car sales topped 17 million worldwide in 2024 as consumer demand rose.',
          question: 'How could higher demand for electric cars affect price and output?',
          questionZh: '电动汽车需求上升会如何影响价格和产量？',
          answer: 'Higher demand can raise price at first and encourage firms to increase output if they expect profit.',
          source: 'Source: IEA Global EV Outlook 2025.',
        },
        china: {
          country: 'China',
          context: 'China sold over 11 million electric cars in 2024, more than the world sold two years earlier.',
          question: 'How could higher demand for electric cars affect price and output?',
          questionZh: '电动汽车需求上升会如何影响价格和产量？',
          answer: 'Higher demand can raise price at first and encourage firms to increase output if they expect profit.',
          source: 'Source: IEA Global EV Outlook 2025.',
        },
      },
      visual: photos.evCharging,
    },
    {
      type: 'marketMechanismSim',
      eyebrow: 'Explore',
      title: 'Demand, price, profit and resources',
      defaultDemand: 58,
      defaultCost: 18,
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: 'Demand rises',
      zhTitle: '需求上升',
      nodes: [['demand rises', 'price rises', 'profit may rise', 'firms produce more', 'resources move into the market']],
      footer: 'Resources include land, labour, capital and enterprise.',
      visual: photos.evCharging,
      partialReview: ['.flowRow > .flowChip', '.prompt'],
    },
    {
      type: 'discussion',
      eyebrow: 'Apply',
      title: 'E-bike demand',
      question: 'If more commuters want e-bikes, what should happen to workers, shop space and parts suppliers?',
      zh: '如果更多通勤者想要电动自行车，工人、店铺空间和零部件供应商应该发生什么变化？',
      answer: 'More resources should move into e-bike production and sales because higher demand can raise profit.',
      answerZh: '更多资源应流向电动自行车的生产和销售，因为更高需求可能提高利润。',
      visual: photos.eBikeShop,
    },
    {
      type: 'fact',
      eyebrow: 'Specific example',
      facts: {
        left: {
          country: 'United States',
          context: 'US e-bike imports rose sharply after 2020, reflecting stronger demand for electric bicycles.',
          question: 'What market signal could encourage firms to supply more e-bikes?',
          questionZh: '什么市场信号会鼓励企业供应更多电动自行车？',
          answer: 'Rising demand or higher prices signal profit opportunities, so firms may increase supply.',
          source: 'Source: USITC DataWeb and industry reporting.',
        },
        china: {
          country: 'China',
          context: 'China produces most of the world’s electric bicycles and has a large domestic e-bike market.',
          question: 'What market signal could encourage firms to supply more e-bikes?',
          questionZh: '什么市场信号会鼓励企业供应更多电动自行车？',
          answer: 'Rising demand or higher prices signal profit opportunities, so firms may increase supply.',
          source: 'Source: China Bicycle Association industry reports.',
        },
      },
      visual: photos.eBikeShop,
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: 'Demand falls',
      zhTitle: '需求下降',
      nodes: [['demand falls', 'price falls', 'profit may fall', 'firms cut output', 'resources move elsewhere']],
      footer: 'The price mechanism can redirect resources without a central planner.',
      visual: photos.bubbleTeaShop,
      partialReview: ['.flowRow > .flowChip', '.prompt'],
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      title: 'Consumer sovereignty',
      zhTitle: '消费者主权',
      term: 'consumer sovereignty',
      definition: 'The idea that firms produce what consumers demand because profit provides an incentive to respond to demand.',
      definitionZh: '指企业生产消费者所需求的商品，因为利润为企业回应需求提供激励。',
      examples: [
        ['More spending', 'firms stock more of the product'],
        ['Less spending', 'firms reduce output'],
        ['Profit signal', 'firms follow consumer demand'],
      ],
      visual: photos.vegetables,
      partialReview: ['.termBox', '.termExamples > .termExample'],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Demand for electric cars rises. Which chain best shows the price mechanism?',
      choices: [
        'Demand rises -> price may rise -> profit incentive rises -> more resources move into EV production.',
        'Demand rises -> government must produce every electric car.',
        'Demand rises -> firms always leave the market.',
      ],
      answer: 0,
      prompt: 'Name one resource that may move into production.',
    },
    {
      type: 'fact',
      eyebrow: 'Specific example',
      facts: {
        left: {
          country: 'United States',
          context: 'Plant-based food sales reached USD 8.1 billion in the United States in 2024.',
          question: 'How could changing consumer tastes affect demand and supply for plant-based food?',
          questionZh: '消费者偏好的变化会如何影响需求和供给？',
          answer: 'If tastes shift toward plant-based food, demand rises and firms may increase supply to earn revenue.',
          source: 'Source: Good Food Institute, 2024 retail sales data.',
        },
        china: {
          country: 'China',
          context: 'China’s plant-based meat market was estimated at about USD 428 million in 2023.',
          question: 'How could changing consumer tastes affect demand and supply for plant-based food?',
          questionZh: '消费者偏好的变化会如何影响需求和供给？',
          answer: 'If tastes shift toward plant-based food, demand rises and firms may increase supply to earn revenue.',
          source: 'Source: Grand View Research, 2023 market estimate.',
        },
      },
      visual: photos.vegetables,
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '离堂小测',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Prices act as signals and __________.', 'incentives'],
        ['2', 'When demand rises, price and profit may __________.', 'rise'],
        ['3', 'The profit motive encourages firms to allocate more __________.', 'resources'],
        ['4', 'Consumer sovereignty means consumers influence what is __________.', 'produced'],
      ],
    },
  ],
};
