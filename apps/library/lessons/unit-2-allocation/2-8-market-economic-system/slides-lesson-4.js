/* Sources:
   Syllabus 2027-2029: ../../../references/igcse-economics-syllabus-2027-2029.md (2.8, 2.9)
   Definitions 2026: ../../../references/igcse-economics-definitions-2026.md (Market failure, External cost, Public good)
   Paper 2 archive: ../../../references/paper-2-mark-schemes-2023-2025/2-allocation-of-resources.md (2.8, 2.9)
*/
window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.marketTeaching;

IGCSE.lesson = {
  meta: {
    code: '2.8.2',
    unit: 'Unit 2 - The allocation of resources',
    title: 'Market economic system lesson 4: arguments against markets - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Market economic system lesson 4',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },
  slides: [
    {
      type: 'hero',
      eyebrow: 'Lesson overview',
      title: 'Arguments against markets',
      zhTitle: '反对市场的论点',
      subtitle: '2.8.2 - inequality, market failure and under-provision',
      kicker: 'When might markets allocate resources badly?',
      visual: photos.factorySmoke,
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'What markets may ignore',
      question: 'If a firm earns profit while nearby residents breathe polluted air, what is missing from the market price?',
      zh: '如果企业赚取利润，但附近居民呼吸受污染的空气，市场价格中缺少了什么？',
      answer: 'The price does not include the external cost of pollution faced by nearby residents.',
      answerZh: '价格没有包括附近居民承受的污染外部成本。',
      visual: photos.factorySmoke,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Explain inequality as an argument against markets.',
        'Explain market failure as an argument against markets.',
        'Compare arguments for and against markets in a balanced answer.',
      ],
      zhBullets: [
        '解释不平等如何反对市场经济。',
        '解释市场失灵如何反对市场经济。',
        '在平衡答案中比较支持和反对市场经济的论点。',
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Inequality',
      zhTitle: '不平等',
    },
        {
      type: 'visualPause',
      title: 'Visual pause: World',
      visual: photos.socialSecurity,
      notes: 'Example: World / China. Former fact context: The richest 10% of the global population receive about half of global income. | China’s official urban-rural disposable income ratio remained above 2.3 to 1 in 2024. Teacher question: Why might a market economy create unequal income distribution? Possible answer: Markets reward ownership, skills and enterprise unequally, so income can become uneven without redistribution. Source: Source: World Inequality Report 2022. | Source: National Bureau of Statistics of China, 2025.',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title: 'Inequality',
      zhTitle: '不平等',
      nodes: [
        [
          { text: 'richer consumers have more spending __________', answer: 'power', zh: '中文提示： richer consumers have more spending power' },
          { text: 'firms respond to profitable __________', answer: 'demand', zh: '中文提示： firms respond to profitable demand' },
          { text: 'poorer households have less __________', answer: 'access', zh: '中文提示： poorer households have less access' },
          { text: 'inequality may __________', answer: 'persist', zh: '中文提示： inequality may persist' },
        ]
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Market failure',
      zhTitle: '市场失灵',
    },
        {
      type: 'visualPause',
      title: 'Visual pause: World',
      visual: photos.factorySmoke,
      notes: 'Example: World / China. Former fact context: Air pollution is linked to 6.7 million premature deaths annually. | China’s city PM2.5 average was 29.3 micrograms per m3 in 2024. Teacher question: Why might market activity create external costs for third parties? Possible answer: The third party is people affected by pollution; they face health costs that are not fully paid by producers or consumers. Source: Source: World Health Organization. | Source: Ministry of Ecology and Environment of China, 2025.',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title: 'External costs',
      zhTitle: '外部成本',
      nodes: [
        [
          { text: 'factory __________', answer: 'pollutes', zh: 'factory pollutes' },
          { text: 'third parties face health __________', answer: 'costs', zh: '中文提示： third parties face health costs' },
          { text: 'market price ignores external __________', answer: 'cost', zh: '中文提示： market price ignores external cost' },
          { text: 'output may be too __________', answer: 'high', zh: '中文提示： output may be too high' },
        ]
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Under-provision',
      zhTitle: '供给不足',
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title: 'Who pays for the light?',
      question: 'If a street light benefits everyone nearby, why might a private firm struggle to charge each user?',
      zh: '如果路灯让附近每个人都受益，为什么私人企业难以向每个使用者收费？',
      answer: 'People can benefit without paying, so free-riding makes it hard for a firm to earn enough revenue.',
      answerZh: '人们可以不付费也受益，因此“搭便车”会使企业难以获得足够收入。',
      visual: photos.streetLight,
    },
        {
      type: 'visualPause',
      title: 'Visual pause: United Kingdom',
      visual: photos.floodBarrier,
      notes: 'Example: United Kingdom / China. Former fact context: The UK government planned GBP 5.2 billion for flood and coastal erosion schemes from 2021 to 2027. | China increased central support for flood-control and disaster-prevention projects after major 2023 floods. Teacher question: Why might government provide goods or services that markets underprovide? Possible answer: Government may provide it because private firms may not find enough paying customers despite wider social benefits. Source: Source: UK Environment Agency. | Source: China State Council, 2024.',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title: 'Public goods may be under-provided',
      zhTitle: '公共物品可能供给不足',
      nodes: [
        [
          { text: 'people can benefit without __________', answer: 'paying', zh: 'people can benefit without paying' },
          { text: 'private revenue is __________', answer: 'low', zh: '中文提示： private revenue is low' },
          { text: 'profit incentive is __________', answer: 'weak', zh: '中文提示： profit incentive is weak' },
          { text: 'good may not be __________', answer: 'provided', zh: '中文提示： good may not be provided' },
        ]
      ],
    },
    {
      type: 'compare',
      mode: 'fillBlanks',
      eyebrow: 'Review',
      title: 'For and against markets',
      leftTitle: 'Arguments for',
      left: [
        ['1', '__________', 'choice'],
        ['2', '__________', 'incentives'],
        ['3', '__________', 'efficiency'],
      ],
      rightTitle: 'Arguments against',
      right: [
        ['1', '__________', 'inequality'],
        ['2', 'market __________', 'failure'],
        ['3', 'under-provision of some __________', 'goods'],
      ],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Which statement is the strongest argument against markets?',
      choices: [
        'Markets may ignore external costs, so resources can be over-allocated to polluting goods.',
        'Markets always give every household equal income.',
        'Markets always provide all public goods efficiently.',
      ],
      answer: 0,
      prompt: 'Identify the cause and consequence.',
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Discuss whether a market economic system is the best way to allocate resources. [8]',
      keywords: ['choice', 'incentives', 'efficiency', 'inequality', 'market failure'],
      prompt: 'One paragraph for, one against, then a judgement. Paper 2 source: 2023MJ-21 Q2(d).',
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'modelAnswer',
      partialReview: ['.modelAnswerCard'],
      showLinkChips: false,
      eyebrow: 'Exam answer',
      title: 'Discuss whether a market economic system is the best way to allocate resources. [8]',
      question: 'Discuss whether a market economic system is the best way to allocate resources. [8]',
      answer: 'A market economic system can allocate resources well because consumer choice and profit incentives encourage firms to produce goods people want. Competition can also improve efficiency and keep prices lower. However, markets can create inequality because high-income consumers have more influence, and market failure may occur when external costs are ignored or public goods are under-provided. Overall, markets are useful for many private goods, but they are not always best without government intervention.',
      links: ['choice', 'incentives', 'efficiency', 'inequality', 'market failure'],
      partialReview: ['.modelAnswerCard'],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '\u79bb\u5802\u5c0f\u6d4b',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Arguments against markets include inequality, market failure and under-__________.', 'provision'],
        ['2', 'Market demand reflects wants and ability to __________.', 'pay'],
        ['3', 'Pollution is an example of an external __________.', 'cost'],
        ['4', 'Public goods may not be provided because people can benefit without __________.', 'paying'],
      ],
    },
  ],
};
