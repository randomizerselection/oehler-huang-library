/* Sources:
   Syllabus 2027-2029: ../../../references/igcse-economics-syllabus-2027-2029.md (2.8)
   Definitions 2026: ../../../references/igcse-economics-definitions-2026.md (Market economic system, Consumer sovereignty)
   Paper 2 archive: ../../../references/paper-2-mark-schemes-2023-2025/2-allocation-of-resources.md (2.8)
*/
window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.marketTeaching;

IGCSE.lesson = {
  meta: {
    code: '2.8.2',
    unit: 'Unit 2 - The allocation of resources',
    title: 'Market economic system lesson 3: arguments for markets - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Market economic system lesson 3',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },
  slides: [
    {
      type: 'hero',
      eyebrow: 'Lesson overview',
      title: 'Arguments for markets',
      zhTitle: '支持市场的论点',
      subtitle: '2.8.2 - consumer sovereignty, choice, quality and innovation, and efficiency',
      kicker: 'Why can markets be powerful allocators of scarce resources?',
      visual: photos.phoneDisplay,
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'Competing for customers',
      question: 'Why do smartphone firms keep improving cameras, battery life, screens and prices?',
      zh: '为什么智能手机企业不断改进摄像头、电池续航、屏幕和价格？',
      answer: 'Competition and the profit motive push firms to improve products so they can win customers.',
      answerZh: '竞争和利润动机促使企业改进产品，从而吸引消费者。',
      visual: photos.phoneDisplay,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Explain consumer sovereignty as an argument for markets.',
        'Explain choice, quality and innovation.',
        'Build exam chains for arguments for markets.',
      ],
      zhBullets: [
        '解释消费者主权如何支持市场经济。',
        '解释选择、质量和创新。',
        '为支持市场经济的论点构建考试解释链。',
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Consumer sovereignty',
      zhTitle: '消费者主权',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title: 'Consumer sovereignty',
      zhTitle: '消费者主权',
      nodes: [
        [
          { text: 'consumers demand __________', answer: 'products', zh: '中文提示： consumers demand products' },
          { text: 'firms respond to __________', answer: 'demand', zh: '中文提示： firms respond to demand' },
          { text: 'profit rewards successful __________', answer: 'firms', zh: '中文提示： profit rewards successful firms' },
          { text: 'consumers influence resource __________', answer: 'allocation', zh: '中文提示： consumers influence resource allocation' },
        ]
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Choice',
      zhTitle: '选择',
    },
        {
      type: 'visualPause',
      title: 'Visual pause: United States',
      visual: photos.phoneDisplay,
      notes: 'Example: United States / China. Former fact context: The US App Store ecosystem facilitated USD 406 billion in developer billings and sales in 2024. | China’s App Store ecosystem reached RMB 3.76 trillion in 2023. Teacher question: How can competition in digital markets benefit consumers and producers? Possible answer: Competition can push firms to improve quality, reduce prices and offer more choice to users and developers. Source: Source: Apple Newsroom, 2025. | Source: Apple China Newsroom, 2024.',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title: 'Choice',
      zhTitle: '选择',
      nodes: [
        [
          { text: 'many firms __________', answer: 'compete', zh: '中文提示： many firms compete' },
          { text: 'different prices and designs __________', answer: 'appear', zh: '中文提示： different prices and designs appear' },
          { text: 'consumers compare __________', answer: 'options', zh: '中文提示： consumers compare options' },
          { text: 'consumer welfare may __________', answer: 'rise', zh: '中文提示： consumer welfare may rise' },
        ]
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Quality and innovation',
      zhTitle: '质量与创新',
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title: 'Profit pressure',
      question: 'If a bubble tea shop can earn more profit by launching a popular drink, what incentive does profit create?',
      zh: '如果奶茶店推出受欢迎的饮品可以赚取更多利润，利润会产生什么激励？',
      answer: 'Profit gives the shop an incentive to innovate, produce more of the popular drink and use more resources there.',
      answerZh: '利润会激励商店创新、生产更多受欢迎的饮品，并把更多资源投入其中。',
      visual: photos.bubbleTeaShop,
    },
        {
      type: 'visualPause',
      title: 'Visual pause: World',
      visual: photos.evCharging,
      notes: 'Example: World / China. Former fact context: Electric car sales topped 17 million in 2024 as firms competed for a fast-growing market. | Chinese-headquartered car makers accounted for about 80% of domestic EV sales in China in 2024. Teacher question: How could competition affect price, quality or choice in this market? Possible answer: A strong answer should name the concept, link the context to the first economic effect, and then explain the likely outcome. Source: Source: IEA Global EV Outlook 2025.',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title: 'Quality and innovation',
      zhTitle: '质量与创新',
      nodes: [
        [
          { text: 'firms want __________', answer: 'profit', zh: '中文提示： firms want profit' },
          { text: 'better products attract __________', answer: 'consumers', zh: '中文提示： better products attract consumers' },
          { text: 'sales may __________', answer: 'rise', zh: '中文提示： sales may rise' },
          { text: 'quality and innovation __________', answer: 'improve', zh: '中文提示： quality and innovation improve' },
        ]
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Efficiency',
      zhTitle: '效率',
    },
        {
      type: 'visualPause',
      title: 'Visual pause: United States',
      visual: photos.amazonWarehouse,
      notes: 'Example: United States / China. Former fact context: Amazon’s fulfilment centers use large-scale logistics systems to reduce delivery times and unit handling costs. | China’s express delivery volume exceeded 130 billion parcels in 2023,. Teacher question: How can large-scale production lower average costs or improve service? Possible answer: Large-scale operations can spread fixed costs and use specialised systems, lowering average costs or improving speed. Source: Source: Amazon operations reporting and public fulfilment-center materials. | Source: State Post Bureau of China, 2024.',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title: 'Efficiency',
      zhTitle: '效率',
      nodes: [
        [
          { text: 'competition pressures __________', answer: 'firms', zh: '中文提示： competition pressures firms' },
          { text: 'firms cut waste and __________', answer: 'costs', zh: '中文提示： firms cut waste and costs' },
          { text: 'prices may __________', answer: 'fall', zh: '中文提示： prices may fall' },
          { text: 'resources may be used __________', answer: 'efficiently', zh: '中文提示： resources may be used efficiently' },
        ]
      ],
    },
    {
      type: 'marketSignalGame',
      eyebrow: 'Apply',
      title: 'Follow the market signal',
    },
    {
      type: 'compare',
      mode: 'fillBlanks',
      eyebrow: 'Exam practice',
      title: 'Weak answer or strong answer?',
      leftTitle: 'Weak',
      left: [
        ['1', 'Markets are good because there is __________', 'choice'],
        ['2', 'Firms make __________', 'profit'],
        ['3', 'Competition is __________', 'good'],
      ],
      rightTitle: 'Strong',
      right: [
        ['1', 'Competition gives firms an incentive to reduce __________', 'costs'],
        ['2', 'Lower costs may allow lower __________', 'prices'],
        ['3', 'Consumers may gain more choice and better __________', 'quality'],
      ],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Analyse two advantages of a market economic system. [6]',
      keywords: ['consumer sovereignty', 'choice', 'quality and innovation', 'efficiency'],
      prompt: 'Build two chains. Each chain needs a cause, an effect and a benefit. Paper 2 source: 2.8 market economic system archive.',
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'modelAnswer',
      partialReview: ['.modelAnswerCard'],
      showLinkChips: false,
      eyebrow: 'Exam answer',
      title: 'Analyse two advantages of a market economic system. [6]',
      question: 'Analyse two advantages of a market economic system. [6]',
      answer: 'A market economic system can increase consumer sovereignty because firms respond to what consumers demand. This can increase choice and encourage firms to improve quality and innovation to attract buyers. Competition also gives firms an incentive to cut costs and use resources efficiently, which may lower prices for consumers.',
      links: ['consumer sovereignty', 'choice', 'quality and innovation', 'efficiency'],
      partialReview: ['.modelAnswerCard'],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '\u79bb\u5802\u5c0f\u6d4b',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Consumer sovereignty means firms produce what consumers __________.', 'demand'],
        ['2', 'A market economic system can increase consumer __________.', 'choice'],
        ['3', 'Profit can encourage quality and __________.', 'innovation'],
        ['4', 'Efficiency means fewer resources are __________.', 'wasted'],
      ],
    },
  ],
};
