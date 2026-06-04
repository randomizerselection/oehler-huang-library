/* Sources:
   Syllabus 2027-2029: ../../../references/igcse-economics-syllabus-2027-2029.md (4.1.1)
   Definitions 2026: ../../../references/igcse-economics-definitions-2026.md (macroeconomic aims)
   Paper 2 archive: ../../../references/paper-2-mark-schemes-2023-2025/4-government-and-macroeconomy.md (4.1)
*/
window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.macroAims;

IGCSE.lesson = {
  meta: {
    code: '4.1.1',
    unit: 'Unit 4 - Government and the macroeconomy',
    title: 'Macroeconomic aims - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Macroeconomic aims',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow: 'Lesson overview',
      title: 'Macroeconomic aims',
      zhTitle: '宏观经济目标',
      subtitle: '4.1.1',
      kicker: 'What is the government trying to achieve for the whole economy?',
      visual: photos.worldBankHeadquarters,
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'Which aim is under pressure?',
      question: 'If prices are rising quickly, young workers struggle to find jobs and factories create pollution, which macroeconomic aims are being missed?',
      zh: '如果物价快速上涨，年轻劳动者难以找到工作，工厂还造成污染，哪些宏观经济目标没有实现？',
      answer: 'Stable prices, full employment and environmental sustainability are under pressure. A stronger answer explains that governments often have to prioritise one aim when aims conflict.',
      answerZh: '价格稳定、充分就业和环境可持续性都受到压力。更强的答案会说明，当目标冲突时，政府往往必须确定优先顺序。',
      visual: photos.pollution,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Identify the six main macroeconomic aims.',
        'Explain why each aim matters for an economy.',
        'Analyse conflicts between aims using clear cause-and-effect chains.',
      ],
      zhBullets: [
        '识别六个主要宏观经济目标。',
        '解释每个目标对经济为什么重要。',
        '分析宏观目标之间的冲突。',
      ],
    },
    {
      type: 'quiz',
      eyebrow: 'Starter',
      title: 'Choose the priority',
      question: 'A country has rising GDP, rising pollution, low unemployment and fast inflation. Which aim should the government prioritise first?',
      choices: ['Economic growth', 'Stable prices', 'Environmental sustainability', 'Low unemployment'],
      prompt: 'Give one reason and one possible cost of your choice.',
      visual: 'abstract',
      partialReview: ['.choices > .choice', '.prompt'],
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'The six macroeconomic aims',
      cardStyle: 'compactVisual',
      cardLayout: 'balancedGrid',
      cards: [
        { title: 'Economic growth', zhTitle: '经济增长', body: 'increase real GDP', icon: 'realGdp' },
        { title: 'Full employment', zhTitle: '充分就业', body: 'keep unemployment low', icon: 'lowUnemployment' },
        { title: 'Stable prices / low inflation', zhTitle: '价格稳定 / 低通胀', body: 'low, predictable inflation', icon: 'lowInflation' },
        { title: 'Balance of payments stability', zhTitle: '国际收支稳定', body: 'avoid current account gaps', icon: 'balancePayments' },
        { title: 'Redistribution of income', zhTitle: '收入再分配', body: 'reduce income inequality', icon: 'incomeRedistribution' },
        { title: 'Environmental sustainability', zhTitle: '环境可持续性', body: 'protect resources', icon: 'environmentalSustainability' },
      ],
      partialReview: ['.cardgrid > .card'],
    },
        {
      type: 'visualPause',
      title: 'Visual pause: World economy',
      visual: photos.worldBankHeadquarters,
      notes: 'Example: World economy / China. Former fact context: Global growth was projected at 2.6% in 2024, below the 3.1% average in the decade before COVID-19. | Real GDP grew 5.0% in 2024,. Teacher question: Which macroeconomic aim is shown, and why might governments care about it? Possible answer: The aim is economic growth; governments care because growth can raise incomes, output and living standards. Source: Source: World Bank Global Economic Prospects, June 2024. | Source: National Bureau of Statistics of China, 2025.',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title: 'Growth can raise living standards',
      zhTitle: '经济增长可提高生活水平',
      nodes: [
        [
          { text: 'higher real __________', answer: 'GDP', zh: '中文提示： higher real GDP' },
          { text: 'more goods and __________', answer: 'services', zh: '中文提示： more goods and services' },
          { text: 'higher incomes may __________', answer: 'follow', zh: '中文提示： higher incomes may follow' },
          { text: 'living standards may __________', answer: 'improve', zh: '中文提示： living standards may improve' },
        ]
      ],
    },
        {
      type: 'visualPause',
      title: 'Visual pause: World economy',
      visual: photos.inflationShelf,
      notes: 'Example: World economy / China. Former fact context: Global inflation was expected to fall to 3.5% in 2024 and 2.9% in 2025, so stable prices remained a policy aim. | Consumer prices rose 0.2% in 2024,. Teacher question: Which macroeconomic aim is shown, and what problem can high inflation create? Possible answer: The aim is stable prices; high inflation reduces purchasing power and creates uncertainty. Source: Source: World Bank Global Economic Prospects, June 2024. | Source: National Bureau of Statistics of China, 2025.',
    },
    {
      type: 'flow',
      mode: 'fillBlanks',
      eyebrow: 'Learn',
      title: 'Stable prices protect confidence',
      zhTitle: '价格稳定保护信心',
      nodes: [
        [
          { text: 'low and stable __________', answer: 'inflation', zh: '中文提示： low and stable inflation' },
          { text: 'money keeps its purchasing __________', answer: 'power', zh: 'money keeps its purchasing power' },
          { text: 'firms can __________', answer: 'plan', zh: '中文提示： firms can plan' },
          { text: 'investment may __________', answer: 'increase', zh: '中文提示： investment may increase' },
        ]
      ],
    },
        {
      type: 'visualPause',
      title: 'Visual pause: Global labour market',
      visual: photos.youthCareerFair,
      notes: 'Example: Global labour market / China. Former fact context: Global unemployment was steady at 5% in 2024, while youth unemployment remained much higher at 12.6%. | The surveyed urban unemployment rate averaged 5.1% in 2024. Teacher question: Which macroeconomic aim is shown, and what cost can unemployment create? Possible answer: The aim is low unemployment; unemployment wastes labour and reduces household income. Source: Source: ILO World Employment and Social Outlook: Trends 2025. | Source: National Bureau of Statistics of China, 2025.',
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'Aims can clash',
      lead: 'Good answers recognise trade-offs rather than assuming every aim improves together.',
      cardStyle: 'compactVisual',
      cards: [
        { title: 'Employment vs inflation', zhTitle: '就业 vs 通胀', body: 'more demand may create jobs but raise prices', icon: 'employment' },
        { title: 'Growth vs environmental sustainability', zhTitle: '增长 vs 环境可持续性', body: 'more output may use more resources and create pollution', icon: 'sustainability' },
        { title: 'Employment vs balance of payments', zhTitle: '就业 vs 国际收支', body: 'higher incomes may increase spending on imports', icon: 'currentAccount' },
      ],
      footer: 'Use cautious language: may, could, depends on spare capacity.',
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      title: 'Which conflict is shown?',
      question: 'A government increases spending to create jobs. Consumers then buy more imported goods.',
      choices: ['Employment vs balance of payments stability', 'Growth vs environmental sustainability', 'Stable prices vs redistribution'],
      prompt: 'Explain the chain in one sentence.',
      partialReview: ['.choices > .choice', '.prompt'],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Explain why economic growth may conflict with environmental sustainability. [4]',
      keywords: ['more output', 'resource use', 'pollution', 'environmental sustainability'],
      prompt: 'Write a linked chain and include one judgement word such as "may". Paper 2 source: 4.1 macroeconomic aims archive.',
      visual: 'flowArrows',
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'modelAnswer',
      partialReview: ['.modelAnswerCard'],
      showLinkChips: false,
      eyebrow: 'Exam answer',
      title: 'Explain why economic growth may conflict with environmental sustainability. [4]',
      question: 'Explain why economic growth may conflict with environmental sustainability.',
      answer: 'Economic growth means more output is produced. This may require more resource use, such as energy and raw materials. If firms burn more fuel or create more waste, pollution can rise, so environmental sustainability may be damaged.',
      links: ['more output', 'resource use', 'pollution', 'environmental sustainability'],
      partialReview: ['.modelAnswerCard'],
    },
    {
      type: 'answer',
      mode: 'fillBlanks',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '\u79bb\u5802\u5c0f\u6d4b',
      steps: [
        ['1', 'One macroeconomic aim is low __________.', 'inflation'],
        ['2', 'Another aim is economic __________.', 'growth'],
        ['3', 'A conflict means one aim may make another aim harder to __________.', 'achieve'],
      ],
      cue: 'Answer without notes before leaving.',
      partialReview: ['.steps > .step', '.prompt'],
    },
  ],
};
