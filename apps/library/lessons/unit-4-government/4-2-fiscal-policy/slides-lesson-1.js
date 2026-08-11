/* ============================================================
   Lesson 4.2 - Fiscal policy (4.2.1-4.2.2)
   Cambridge IGCSE Economics 0455 - Unit 4: Government and the macroeconomy

   Syllabus source:
   ../../../references/igcse-economics-syllabus-2027-2029.md
   Definitions source:
   ../../../references/igcse-economics-definitions-2026.md
   Paper 2 mark-scheme archive:
   ../../../references/paper-2-mark-schemes-2023-2025/4-government-and-macroeconomy.md

   Pacing note:
   Keep each slide to one teaching move and tie each policy effect back to
   the macroeconomic aims taught in 4.1.1.
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.fiscalPolicy;
const factPhotos = IGCSE.photos.fiscalPolicyFacts;
IGCSE.lesson = {
  meta: {
    code:         '4.2',
    unit:         'Unit 4 - Government and the macroeconomy',
    title:        'Fiscal policy lesson 1: government budget and spending - Cambridge IGCSE Economics 0455',
    lessonLabel:  'Fiscal policy lesson 1',
    courseLabel:  'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow:  'Lesson overview',
      title:    'Government budget and spending',
      zhTitle: '政府预算与支出',
      subtitle: 'Fiscal policy lesson 1',
      kicker:   'How do budgets and spending choices affect the economy?',
      visual:   photos.budgetMeeting,
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title:   'Trade-offs',
      question: 'What should a government do first when it cannot achieve every aim at once?',
      zh: '当政府无法同时实现所有目标时，应该先做什么？',
      answer: 'It should prioritise the most urgent aim and accept that there may be trade-offs with other aims.',
      answerZh: '政府应优先处理最紧迫的目标，并承认这可能与其他目标存在取舍。',
      visual: photos.budgetMeeting,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title:   'By the end, you can',
      bullets: [
        'Define a government budget.',
        'Calculate deficits and surpluses.',
        'Explain reasons and effects of government spending.',
      ],
      zhBullets: [
        '定义政府预算。',
        '计算预算赤字和预算盈余。',
        '解释政府支出的原因和影响。',
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title:   'Government budget',
      zhTitle: '政府预算',
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title:   'Public money',
      question: 'What should happen if a government spends more than it receives?',
      zh: '如果政府支出超过收入，应该怎么办？',
      answer: 'It has a budget deficit, so it may need to borrow, raise revenue, or reduce some spending.',
      answerZh: '这会形成预算赤字，因此政府可能需要借款、增加收入或削减部分支出。',
      visual: photos.budgetHearing,
    },
    {
      type: 'term',
      keyTerms: [
        { term: 'government revenue', zh: '政府收入', note: 'money received by government' },
        { term: 'government expenditure', zh: '政府支出', note: 'money spent by government' },
      ],
      showExamples: false,
      eyebrow: 'Learn',
      title:   'Budget balance',
      zhTitle: '预算差额',
      term:    'government budget',
      definition: 'A government budget is a plan or forecast for government revenue and government expenditure.',
      definitionZh: '政府预算是政府收入和政府支出的计划或预测。',
      formula: 'Budget balance = government revenue - government expenditure',
      examples: [
        ['Deficit', 'negative balance'],
        ['Surplus', 'positive balance'],
      ],
    },
        {
      type: 'visualPause',
      title: 'Visual pause: United Kingdom',
      visual: factPhotos.ukBudget,
      notes: 'Example: United Kingdom / China. Former fact context: UK public borrowing was GBP 131.1 billion (about RMB 1.2 trillion) in 2023/24. | China planned a RMB 4.06 trillion budget deficit in 2024, equal to 3% of GDP. Teacher question: How is a budget deficit linked to government borrowing? Possible answer: A budget deficit means government spending exceeds revenue, so the government usually needs to borrow. Source: Source: UK ONS; RMB conversion approximate. | Source: 2024 Government Work Report.',
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Government revenue = $420m. Government expenditure = $510m.',
      choices: ['$90m surplus', '$90m deficit', '$930m deficit'],
      answer: 1,
      prompt:  'Calculate revenue - expenditure.',
      visual:  photos.taxForms,
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title:   'Answer',
      answer:  '$90m deficit',
      body:    '$420m - $510m = -$90m. A deficit occurs because spending is greater than revenue.',
      visual:  photos.budgetMeeting,
      partialReview: ['.answerBox'],
    },
    {
      type: 'compare',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title:   'Deficit or surplus?',
      leftTitle:  'Budget deficit',
      left:  [
        ['1', 'government spending exceeds government __________', 'revenue'],
        ['2', 'may require __________', 'borrowing'],
      ],
      rightTitle: 'Budget surplus',
      right: [
        ['1', 'government revenue exceeds government __________', 'spending'],
        ['2', 'may reduce borrowing or __________', 'debt'],
      ],      visual: photos.budgetHearing,    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title:   'Fill in the blanks',
      mode:    'fillBlanks',
      steps: [
        ['1', 'A government budget is a plan for revenue and __________.', 'expenditure'],
        ['2', 'A budget deficit occurs when expenditure is greater than __________.', 'revenue'],
        ['3', 'A budget surplus occurs when revenue is greater than __________.', 'expenditure'],
        ['4', 'Budget balance = revenue - __________.', 'expenditure'],
      ],
    },

    {
      type: 'section',
      eyebrow: 'New section',
      title:   'Government spending',
      zhTitle: '政府支出',
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title:   'Priorities',
      question: 'Which area of government spending should receive more money first?',
      zh: '政府支出的哪个领域应该最先获得更多资金？',
      answer: 'A strong answer chooses one area, such as healthcare or education, and explains the likely benefit and opportunity cost.',
      answerZh: '好的回答应选择一个领域，如医疗或教育，并解释可能的收益和机会成本。',
      visual: photos.budgetHearing,
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title:   'Main areas of spending',
      cardStyle: 'compactVisual',
      cardLayout: 'balancedGrid',
      cards: [
        { title: 'Education', zhTitle: '教育', body: 'schools and training', icon: 'education' },
        { title: 'Healthcare', zhTitle: '医疗保健', body: 'hospitals and public health', icon: 'healthcare' },
        { title: 'Infrastructure', zhTitle: '基础设施', body: 'transport and digital networks', icon: 'infrastructure' },
        { title: 'Welfare', zhTitle: '福利', body: 'benefits and pensions', icon: 'welfare' },
        { title: 'Defence', zhTitle: '国防', body: 'national security', icon: 'defence' },
        { title: 'Industry support', zhTitle: '产业支持', body: 'subsidies and research', icon: 'industry' },
      ],
      partialReview: ['.cardgrid > .card'],
    },
        {
      type: 'visualPause',
      title: 'Visual pause: Finland',
      visual: factPhotos.finlandEducation,
      notes: 'Example: Finland / China. Former fact context: Finland’s government education spending was 6.38% of GDP in 2022. | China spent RMB 6.4595 trillion on education in 2023. Teacher question: Which government spending aim could education support? Possible answer: Education spending can support long-run growth by improving human capital and productivity. Source: Source: World Bank, based on UNESCO UIS data. | Source: China Ministry of Education.',
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title:   'Why spend?',
      question: 'Why might markets fail to provide enough education, healthcare or infrastructure?',
      zh: '为什么市场可能无法提供足够的教育、医疗或基础设施？',
      answer: 'Markets may under-provide them because benefits spill over to society or because some people cannot afford the full price.',
      answerZh: '市场可能提供不足，因为这些服务的收益会扩散到社会，或有些人无法承担全部价格。',
      visual: photos.classroom,
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title:   'Why governments spend',
      cardStyle: 'compactVisual',
      cardLayout: 'balancedGrid',
      cards: [
        { title: 'Merit goods', zhTitle: '有益品', body: 'education, healthcare', icon: 'education' },
        { title: 'Public goods', zhTitle: '公共物品', body: 'defence', icon: 'publicGood' },
        { title: 'Infrastructure', zhTitle: '基础设施', body: 'roads, rail, ports', icon: 'infrastructure' },
        { title: 'Key industries', zhTitle: '关键产业', body: 'subsidies, R&D', icon: 'industry' },
        { title: 'Inequality', zhTitle: '不平等', body: 'benefits, pensions', icon: 'redistribution' },
        { title: 'Macroeconomy', zhTitle: '宏观经济', body: 'demand, inflation', icon: 'macroeconomy' },
      ],
      partialReview: ['.cardgrid > .card'],
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title:   'Education and healthcare',
      question: 'Why might a person consume too little education or healthcare if they must pay the full price?',
      zh: '如果必须支付全部价格，为什么人们可能消费太少的教育或医疗？',
      answer: 'They may focus on the private cost and ignore wider long-term benefits, or simply be unable to afford it.',
      answerZh: '他们可能只看到私人费用而忽视长期广泛收益，或者根本负担不起。',
      visual: photos.classroom,
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title:   '1. Provide merit goods',
      zhTitle: '提供有益品',
      question: 'Education and healthcare may be underprovided if people have to pay the full price.',
      nodes: [
        [
          { text: 'government funds schools or __________', answer: 'hospitals', zh: '中文提示： government funds schools or hospitals' },
          { text: 'more people can access __________', answer: 'them', zh: '中文提示： more people can access them' },
          { text: 'skills and health __________', answer: 'improve', zh: '中文提示： skills and health improve' },
          { text: 'productivity may __________', answer: 'rise', zh: '中文提示： productivity may rise' },
        ]
      ],
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title:   'Free rider problem',
      question: 'Why is defence difficult to sell only to people who pay for it?',
      zh: '为什么国防很难只卖给付费的人？',
      answer: 'Defence is non-excludable: once provided, people in the country are protected even if they did not pay directly.',
      answerZh: '国防具有非排他性：一旦提供，国内居民即使没有直接付费也会受到保护。',
      visual: photos.defence,
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title:   '2. Provide public goods',
      zhTitle: '提供公共物品',
      question: 'Some goods would not be provided by private firms because people can benefit without paying directly.',
      nodes: [
        [
          { text: 'government funds __________', answer: 'defence', zh: '中文提示： government funds defence' },
          { text: 'the country is __________', answer: 'protected', zh: 'the country is protected' },
          { text: 'people and firms face less __________', answer: 'risk', zh: '中文提示： people and firms face less risk' },
          { text: 'economic activity is __________', answer: 'protected', zh: 'economic activity is protected' },
        ]
      ],
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title:   'Roads, rail and ports',
      question: 'How can a better road or railway help firms produce more?',
      zh: '更好的公路或铁路如何帮助企业生产更多？',
      answer: 'Better infrastructure can reduce transport time and costs, helping firms move inputs and goods more efficiently.',
      answerZh: '更好的基础设施可以减少运输时间和成本，帮助企业更高效地运输投入品和商品。',
      visual: photos.roadwork,
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title:   '3. Invest in infrastructure',
      zhTitle: '投资基础设施',
      nodes: [
        [
          { text: 'more infrastructure __________', answer: 'spending', zh: '中文提示： more infrastructure spending' },
          { text: 'lower transport __________', answer: 'costs', zh: '中文提示： lower transport costs' },
          { text: 'firms may produce __________', answer: 'more', zh: '中文提示： firms may produce more' },
          { text: 'real GDP may __________', answer: 'rise', zh: '中文提示： real GDP may rise' },
        ]
      ],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'The government builds a new railway between factories and a port. Which reason for spending is most direct?',
      choices: [
        'Provide a public good',
        'Invest in infrastructure',
        'Reduce inequality',
      ],
      answer: 1,
      prompt: 'Say the answer, then add one likely effect on firms.',
      visual: photos.roadwork,
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title:   'Picking winners',
      question: 'Should a government support an industry if it is important for future jobs?',
      zh: '如果某个产业对未来就业很重要，政府应该支持它吗？',
      answer: 'It may support the industry if future benefits are large, but it should consider opportunity cost and possible inefficiency.',
      answerZh: '如果未来收益很大，政府可以支持该产业，但应考虑机会成本和可能的低效率。',
      visual: photos.industry,
    },
        {
      type: 'visualPause',
      title: 'Visual pause: United States',
      visual: factPhotos.usSemiconductors,
      notes: 'Example: United States / China. Former fact context: The US CHIPS Act offered $52.7 billion (about RMB 380 billion) for semiconductors. | China’s Big Fund III had RMB 344 billion registered capital. Teacher question: How could this support investment, output and employment? Possible answer: It can raise investment first, then increase productive capacity, output and employment if firms expand. Source: Source: NIST; RMB conversion approximate. | Source: Gov.cn.',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title:   '4. Support key industries',
      zhTitle: '支持关键产业',
      question: 'Governments may support industries that are important for jobs, exports or future technology.',
      nodes: [
        [
          { text: 'subsidy for a key __________', answer: 'industry', zh: 'subsidy for a key industry' },
          { text: 'firms face lower __________', answer: 'costs', zh: '中文提示： firms face lower costs' },
          { text: 'investment or R&D may __________', answer: 'rise', zh: '中文提示： investment or R&D may rise' },
          { text: 'competitiveness may __________', answer: 'improve', zh: '中文提示： competitiveness may improve' },
        ]
      ],
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title:   'Welfare support',
      question: 'How much responsibility should a government take for reducing poverty?',
      zh: '政府在减少贫困方面应该承担多大责任？',
      answer: 'Governments often redistribute income through taxes and spending, but the extent depends on priorities and costs.',
      answerZh: '政府通常通过税收和支出来再分配收入，但承担程度取决于优先目标和成本。',
      visual: photos.socialSecurity,
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title:   '5. Reduce inequality',
      zhTitle: '减少不平等',
      nodes: [
        [
          { text: 'higher welfare __________', answer: 'spending', zh: '中文提示： higher welfare spending' },
          { text: 'poorer households receive __________', answer: 'support', zh: '中文提示： poorer households receive support' },
          { text: 'income inequality may __________', answer: 'fall', zh: '中文提示： income inequality may fall' },
        ]
      ],
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title:   'Managing demand',
      question: 'Should a government spend more when unemployment is rising?',
      zh: '当失业率上升时，政府应该增加支出吗？',
      answer: 'It may increase spending to raise aggregate demand and employment, but this could increase borrowing or inflationary pressure.',
      answerZh: '政府可以增加支出来提高总需求和就业，但这可能增加借款或通胀压力。',
      visual: photos.budgetMeeting,
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title:   '6. Manage the macroeconomy',
      zhTitle: '管理宏观经济',
      question: 'Government spending can be changed to influence aggregate demand.',
      nodes: [
        [
          { text: 'higher government __________', answer: 'spending', zh: '中文提示： higher government spending' },
          { text: 'aggregate demand __________', answer: 'rises', zh: '中文提示： aggregate demand rises' },
          { text: 'firms may increase __________', answer: 'output', zh: '中文提示： firms may increase output' },
          { text: 'growth and employment may __________', answer: 'rise', zh: '中文提示： growth and employment may rise' },
        ]
      ],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'The government increases unemployment benefits during a downturn. Which reason fits best?',
      choices: [
        'Reduce inequality',
        'Support key industries',
        'Provide public goods',
      ],
      answer: 0,
      prompt: 'Now name one possible opportunity cost.',
      visual: photos.socialSecurity,
    },
    {
      type: 'quiz',
      eyebrow: 'Apply',
      question: 'Which spending decision most directly supports environmental sustainability?',
      choices: [
        'Build cleaner public transport',
        'Increase debt-interest payments',
        'Cut education spending',
      ],
      answer: 0,
      prompt: 'Now add one possible opportunity cost.',
      visual: photos.pollution,
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title:   'Fill in the blanks',
      mode:    'fillBlanks',
      steps: [
        ['1', 'Government spending on education and healthcare can increase access to __________ goods.', 'merit'],
        ['2', 'Defence is an example of a public __________.', 'good'],
        ['3', 'Infrastructure spending may lower transport __________ for firms.', 'costs'],
        ['4', 'Welfare spending can reduce income __________.', 'inequality'],
      ],
    },

  ],
};
