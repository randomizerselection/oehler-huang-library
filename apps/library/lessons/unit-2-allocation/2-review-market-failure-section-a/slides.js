/* Sources:
   Review target: photo-led preparation for IC1 Section A market-failure questions.
   References:
   - ../../../references/igcse-economics-syllabus-2027-2029.md (2.9.1-2.9.4)
   - ../../../references/igcse-economics-definitions-2026.md (external cost, external benefit, merit good, demerit good)
   - ../../../references/paper-2-mark-schemes-2023-2025/2-allocation-of-resources.md
   Use transfer examples only; do not copy the live exam examples or source wording.
*/
window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.marketFailureReview;

const syllabusSource = {
  label: 'Syllabus source',
  ref: 'Cambridge IGCSE Economics 0455 syllabus 2.9.1-2.9.4',
  note: 'Market failure terms, causes and consequences.',
};

const definitionsSource = {
  label: 'Definitions source',
  ref: 'Definitions 2026: external cost, external benefit, merit good, demerit good',
  note: 'Used for short exam-ready classification wording.',
};

const paper2Source = {
  label: 'Paper 2 archive',
  ref: '2023FM-22 Q2(c); 2025ON-21 Q5(c); 2025MJ-22 Q1(c)',
  note: 'Used for transfer practice on merit goods, demerit goods, external effects and intervention logic.',
};

IGCSE.lesson = {
  meta: {
    code: 'IC1 Section A review',
    unit: 'Unit 2 - The allocation of resources',
    title: 'Market failure photo review - IGCSE Economics 0455',
    lessonLabel: 'Market failure photo review',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
    availableViews: ['slides', 'handout'],
    sources: [syllabusSource, definitionsSource, paper2Source],
  },
  slides: [
    {
      type: 'hero',
      eyebrow: 'Review',
      title: 'Market failure review',
      zhTitle: '市场失灵复习',
      subtitle: '40-minute Section A preparation',
      kicker: 'Explain and analyse different types of market failure.',
      visual: photos.protectedBikeLane,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Classify external effects, merit goods and demerit goods.',
        'Explain over-consumption and under-consumption clearly.',
        'Use a demand and supply diagram for a market-failure policy.',
      ],
      zhBullets: [
        '区分外部影响、有益品和有害品。',
        '清楚解释消费过度和消费不足。',
        '用需求供给图分析信息宣传的影响。',
      ],
    },
    {
      type: 'cards',
      eyebrow: 'Starter',
      title: 'From the picture, name the problem',
      cardStyle: 'photoGrid',
      cardLayout: 'photoGridFour',
      handoutVisuals: true,
      cards: [
        {
          title: 'Factory smoke',
          body: 'Someone nearby is harmed without buying the product.',
          visual: photos.factoryAirPollution,
        },
        {
          title: 'Cycle helmets',
          body: 'The buyer may focus on cost today, not protection later.',
          visual: photos.cycleHelmetRoad,
        },
        {
          title: 'Energy drinks',
          body: 'The buyer notices taste and energy now, but may miss later costs.',
          visual: photos.energyDrinkFridge,
        },
        {
          title: 'Bike lanes',
          body: 'More cycling can reduce congestion for people outside the trip.',
          visual: photos.protectedBikeLane,
        },
      ],
      footer: 'Use only four labels: external cost, external benefit, merit good, demerit good.',
      sources: [definitionsSource],
    },
    {
      type: 'section',
      eyebrow: 'Part 1',
      title: 'Classify fast',
      zhTitle: '快速分类',
    },
    {
      type: 'cards',
      eyebrow: 'Classify',
      title: 'Six photo clues',
      cardStyle: 'photoGrid',
      cardLayout: 'photoGridSix',
      handoutVisuals: true,
      cards: [
        {
          title: 'A. Factory smoke',
          zhTitle: '工厂烟尘',
          visual: photos.factoryAirPollution,
        },
        {
          title: 'B. Protected lane',
          zhTitle: '受保护车道',
          visual: photos.protectedBikeLane,
        },
        {
          title: 'C. Fitness class',
          zhTitle: '健身课',
          visual: photos.fitnessClass,
        },
        {
          title: 'D. Energy drinks',
          zhTitle: '能量饮料',
          visual: photos.energyDrinkFridge,
        },
        {
          title: 'E. Reusable bag',
          zhTitle: '可重复使用购物袋',
          visual: photos.reusableShoppingBag,
        },
        {
          title: 'F. City congestion',
          zhTitle: '城市拥堵',
          visual: photos.cityTrafficCongestion,
        },
      ],
      footer: 'Labels: external cost (外部成本), external benefit (外部收益), merit good (有益品), demerit good (有害品).',
      sources: [definitionsSource],
    },
    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'External benefit, external cost, merit good or demerit good? [4]',
      categories: [
        { title: 'External cost', clue: 'third party is harmed' },
        { title: 'External benefit', clue: 'third party gains' },
        { title: 'Merit good', clue: 'beneficial but under-consumed' },
        { title: 'Demerit good', clue: 'harmful but over-consumed' },
      ],
      items: [
        {
          label: 'A',
          text: 'Factory smoke affects nearby households.',
          answer: 'External cost',
          reason: 'A third party is harmed outside the transaction.',
        },
        {
          label: 'B',
          text: 'A protected lane makes cycling safer and may reduce congestion for others.',
          answer: 'External benefit',
          reason: 'People outside the trip may gain.',
        },
        {
          label: 'C',
          text: 'Fitness classes may be used less than is beneficial.',
          answer: 'Merit good',
          reason: 'Long-term benefits may not be fully recognised.',
        },
        {
          label: 'D',
          text: 'High-caffeine energy drinks may be used more than is beneficial.',
          answer: 'Demerit good',
          reason: 'Full costs may not be fully recognised.',
        },
        {
          label: 'E',
          text: 'Reusable bags can reduce waste for the wider community.',
          answer: 'External benefit',
          reason: 'Others may benefit from less waste.',
        },
        {
          label: 'F',
          text: 'Extra car journeys delay other road users.',
          answer: 'External cost',
          reason: 'Other people lose time without choosing the journey.',
        },
      ],
      sharePrompt: 'After reveal: choose one and explain why the label fits in one sentence.',
      sources: [definitionsSource, paper2Source],
    },
    {
      type: 'cards',
      eyebrow: 'Review',
      title: 'Previously studied definitions',
      cardLayout: 'balancedGrid',
      partialReview: ['.cardgrid > .card'],
      cards: [
        {
          title: 'External cost',
          body: 'A cost suffered by a third party who is not directly involved in the consumption or production of the product.',
          highlightTerms: ['cost', 'third party', 'not directly involved', 'consumption', 'production'],
        },
        {
          title: 'External benefit',
          body: 'A benefit gained by a third party who is not directly involved in the consumption or production of the product.',
          highlightTerms: ['benefit', 'third party', 'not directly involved', 'consumption', 'production'],
        },
        {
          title: 'Merit good',
          body: 'A beneficial good that may be under-consumed because consumers may not recognise its full benefits.',
          highlightTerms: ['beneficial good', 'under-consumed', 'consumers may not recognise', 'full benefits'],
        },
        {
          title: 'Demerit good',
          body: 'A harmful good that may be over-consumed because consumers may not recognise its full costs.',
          highlightTerms: ['harmful good', 'over-consumed', 'consumers may not recognise', 'full costs'],
        },
      ],
      footer: 'For identify questions, use the label; for explain/analyse questions, develop the definition into a chain.',
      sources: [definitionsSource],
    },
    {
      type: 'section',
      eyebrow: 'Part 2',
      title: 'Explain over-consumption',
      zhTitle: '解释消费过度',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: energy drink display',
      visual: photos.energyDrinkFridge,
      objectPosition: 'center center',
      notes: 'Ask students what a buyer notices immediately, then separate private costs from third-party costs before the explanation practice.',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title: 'Two chains: over-consumption',
      zhTitle: '两条链条：消费过度',
      nodes: [
        [
          { text: 'demerit good: short-term enjoyment is __________', answer: 'noticed', zh: '有害品链条：短期享受被注意到' },
          { text: 'full private costs are not fully __________', answer: 'recognised', zh: '全部私人长期成本没有被充分认识' },
          { text: 'demand is too __________', answer: 'high', zh: '需求过高' },
          { text: 'the good is __________-consumed', answer: 'over', zh: '该产品被过度消费' },
        ],
        [
          { text: 'external cost: discarded cans can harm __________ parties', answer: 'third', zh: '外部成本链条：废弃饮料罐可能影响第三方' },
          { text: 'clean-up costs are not included in the market __________', answer: 'price', zh: '清理成本没有包含在市场价格中' },
          { text: 'quantity is too __________ from society’s viewpoint', answer: 'high', zh: '从社会角度看，数量过高' },
          { text: 'resources are __________-allocated', answer: 'over', zh: '资源配置过多' },
        ],
      ],
      sources: [definitionsSource, paper2Source],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Explain two reasons why high-caffeine energy drinks may be over-consumed. [4]',
      keywordLabel: 'Answer first',
      keywords: ['two reasons', 'develop each reason', '4 marks'],
      prompt: 'Write the answer before looking at the mark scheme.',
      visual: photos.energyDrinkFridge,
      sources: [definitionsSource, paper2Source],
    },
    {
      type: 'cards',
      eyebrow: 'Model answer',
      title: 'Mark scheme: Explain two reasons why high-caffeine energy drinks may be over-consumed. [4]',
      cardStyle: 'compact',
      cardLayout: 'balancedGrid',
      cards: [
        { title: 'Demerit good', body: '1 mark for explaining that consumers may not appreciate the full private costs.' },
        { title: 'Development', body: '1 mark for linking this to demand or consumption being too high because the price paid and short-term benefit are noticed.' },
        { title: 'External cost', body: '1 mark for explaining that third parties may be affected, for example by litter or clean-up costs.' },
        { title: 'Development', body: '1 mark for linking this to costs not being reflected in the price paid, so quantity is too high from society’s viewpoint.' },
      ],
      footer: 'Award marks for two separate developed reasons, not for repeating the same chain.',
      sources: [definitionsSource, paper2Source],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Explain two reasons why high-caffeine energy drinks may be over-consumed. [4]',
      question: 'Explain two reasons why high-caffeine energy drinks may be over-consumed. [4]',
      answer: 'One reason is that high-caffeine energy drinks may be a demerit good. Consumers may focus on the price paid and short-term enjoyment, but not recognise the full private costs such as worse sleep or health problems. This can make demand too high. A second reason is that consumption may create external costs. For example, discarded cans may create litter and clean-up costs for third parties. If these costs are not reflected in the price paid, the quantity consumed can be too high from society’s viewpoint.',
      links: ['demerit good', 'price paid', 'short-term enjoyment', 'full private costs', 'demand too high', 'external costs', 'third parties', 'price paid', 'quantity consumed'],
      showLinkChips: false,
      partialReview: ['.modelAnswerCard'],
      sources: [definitionsSource, paper2Source],
    },
    {
      type: 'section',
      eyebrow: 'Part 3',
      title: 'Analyse under-consumption',
      zhTitle: '分析消费不足',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: cycle helmet',
      visual: photos.cycleHelmetRoad,
      objectPosition: 'center center',
      notes: 'Ask what protection the rider may not value enough before linking beneficial products to under-consumption.',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title: 'Cycle helmets: under-consumption',
      zhTitle: '自行车头盔：消费不足',
      nodes: [
        { text: 'the product is __________', answer: 'beneficial', zh: '该产品有益' },
        { text: 'full protection benefits are not fully __________', answer: 'recognised', zh: '保护作用没有被充分认识' },
        { text: 'demand is too __________', answer: 'low', zh: '需求过低' },
        { text: 'quantity used is too __________', answer: 'low', zh: '使用数量过低' },
        { text: 'market failure: __________-consumption', answer: 'under', zh: '市场失灵：消费不足' },
      ],
      sources: [definitionsSource, paper2Source],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Analyse why cycle helmets may be under-used. [6]',
      keywordLabel: 'Use these keywords',
      keywords: ['beneficial', 'full benefits not recognised', 'demand too low', 'under-consumption', 'wider benefits', 'misallocation'],
      prompt: 'Write one developed paragraph with at least four links.',
      visual: photos.cycleHelmetRoad,
      sources: [definitionsSource, paper2Source],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Analyse why cycle helmets may be under-used. [6]',
      question: 'Analyse why cycle helmets may be under-used. [6]',
      paragraphs: [
        'Cycle helmets are beneficial because they can reduce the risk of injury when cyclists crash.',
        'Some riders may not recognise the full benefits because the protection is only needed if an accident happens later. This can make demand too low and lead to under-consumption.',
        'If too few helmets are used, there may be more injuries and accident costs for families, health services and other road users. This means resources are not allocated in the best way.',
      ],
      links: ['beneficial', 'full benefits', 'demand too low', 'under-consumption', 'resources'],
      showLinkChips: false,
      partialReview: ['.modelAnswerCard'],
      sources: [definitionsSource, paper2Source],
    },
    {
      type: 'section',
      eyebrow: 'Part 4',
      title: 'Diagram practice',
      zhTitle: '图表练习',
    },
    {
      type: 'visualPause',
      title: 'Visual pause: cycle helmet support',
      visual: photos.cycleHelmetRoad,
      objectPosition: 'center center',
      notes: 'Ask how a lower cost of supplying helmets could affect price and quantity, without using a demand-reduction mechanism.',
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Using a demand and supply diagram, analyse the effect of a producer subsidy on cycle helmets. [6]',
      keywordLabel: 'Diagram checklist',
      keywords: ['D and S1 labelled', 'S shifts right to S2', 'price falls', 'quantity rises', 'lower supply cost', 'subsidy'],
      prompt: 'Draw first. Then write two sentences explaining the diagram.',
      visual: photos.cycleHelmetRoad,
      sources: [definitionsSource, paper2Source],
    },
    {
      type: 'answer',
      eyebrow: 'Model answer',
      title: 'Model diagram: supply shifts right',
      cue: 'A producer subsidy can lower the cost of supplying helmets. With demand unchanged, equilibrium price falls and quantity rises.',
      visual: {
        type: 'diagram',
        kind: 'demand-supply',
        title: 'Subsidy increases supply',
        shift: 'supplyRight',
        xLabel: 'Quantity of cycle helmets',
        yLabel: 'Price of cycle helmets',
        caption: 'S1 to S2: price falls from P1 to P2; quantity rises from Q1 to Q2.',
      },
      partialReview: ['.prompt'],
      sources: [definitionsSource, paper2Source],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Using a demand and supply diagram, analyse the effect of a producer subsidy on cycle helmets. [6]',
      question: 'Using a demand and supply diagram, analyse the effect of a producer subsidy on cycle helmets. [6]',
      answer: 'A producer subsidy reduces the cost of supplying cycle helmets. This increases supply, shown by a rightward shift from S1 to S2. With demand unchanged, the market moves to a new equilibrium with a lower price and a higher quantity bought and sold. This may reduce under-consumption of a beneficial product.',
      links: ['producer subsidy', 'cost of supplying', 'increases supply', 'rightward shift', 'lower price', 'higher quantity', 'under-consumption'],
      showLinkChips: false,
      partialReview: ['.modelAnswerCard'],
      sources: [definitionsSource, paper2Source],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '离堂小测',
      mode: 'fillBlanks',
      steps: [
        ['1', 'A cost suffered by a third party is an external __________.', 'cost'],
        ['2', 'A harmful good may be __________-consumed if full costs are not recognised.', 'over'],
        ['3', 'A beneficial good may be under-consumed if full benefits are not __________.', 'recognised'],
        ['4', 'A producer subsidy is likely to shift supply to the __________.', 'right'],
      ],
      sources: [definitionsSource, paper2Source],
    },
  ],
};
