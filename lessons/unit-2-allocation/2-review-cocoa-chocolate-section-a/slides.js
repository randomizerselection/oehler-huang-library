/* Sources:
   Exam section: IC1 Section A.docx (Suzhou Foreign Language School, Second Examination - IC 1, May 2026)
   Internal lesson wording reused from:
   - ../2-8-market-economic-system/slides-lesson-1.js (market economic system; private/public sector)
   - ../2-8-market-economic-system/slides-lesson-3.js (consumer sovereignty; choice; quality and innovation; efficiency)
   Reference fallback for elasticity and supply shifts:
   - ../../../references/igcse-economics-syllabus-2027-2029.md (2.2-2.7, 2.8)
   - ../../../references/igcse-economics-definitions-2026.md (demand/supply shifts, PED, PES, market economic system)
   - ../../../references/paper-2-mark-schemes-2023-2025/2-allocation-of-resources.md
*/
window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.cocoaChocolate;

const examSource = {
  label: 'Exam section',
  ref: 'IC1 Section A, May 2026',
  note: 'Cocoa and chocolate markets case data and six Section A questions.',
};

const examPaper = {
  paragraphs: {
    opening: 'Cocoa beans are the main raw material used to make chocolate. Côte d’Ivoire and Ghana are two of the world’s largest cocoa producers.',
    output: 'In the 2023/24 cocoa year, world cocoa production was estimated at 4.365 million tonnes, while world cocoa grindings were 4.810 million tonnes. Cocoa prices rose sharply, and in June 2024 moved above US$10 000 per metric tonne.',
    supply: 'The fall in cocoa output was linked to poor harvests in West Africa. Some farms were affected by disease, bad weather and ageing cocoa trees. Cocoa supply is difficult to increase quickly because new cocoa trees usually take 3–5 years to produce a crop. Suitable land, labour and fertiliser may also be limited.',
    demand: 'In the United States, confectionery sales were US$54.2 billion in 2024, and 98.3% of households bought confectionery products. Consumers had many alternatives to chocolate, including non-chocolate candy, gum, mints, biscuits and other snacks. The average spending per confectionery shopping trip was US$7.73. Many consumers bought chocolate and candy for occasions such as Christmas and Easter.',
    sectors: 'The cocoa and chocolate industries include both private sector and public sector organisations. Private firms, such as chocolate manufacturers and supermarkets, decide what to produce by considering consumer demand, costs and profit. Consumers can choose between many brands and product sizes. In Ghana, the Ghana Cocoa Board is a government organisation involved in the cocoa industry.',
  },
  questions: {
    q1: 'Using the information above, identify two factors that may affect the price elasticity of supply (PES) of cocoa beans. [2]',
    q2: 'Using the information above, identify two factors that may affect the price elasticity of demand (PED) for chocolate products. [2]',
    q3: 'Draw a demand and supply diagram to show the effect of poor cocoa harvests on the world market for chocolate. [4]',
    q4: 'Define private sector and public sector. [4]',
    q5: 'Define market economic system. [2]',
    q6: 'Explain two advantages of a market economic system. [4]',
  },
};

const numberedQuestions = {
  q1: `Q1: ${examPaper.questions.q1}`,
  q2: `Q2: ${examPaper.questions.q2}`,
  q3: `Q3: ${examPaper.questions.q3}`,
  q4: `Q4: ${examPaper.questions.q4}`,
  q5: `Q5: ${examPaper.questions.q5}`,
  q6: `Q6: ${examPaper.questions.q6}`,
};

const paperSource = (questionKey, paragraphKeys) => ({
  label: 'Exam section',
  ref: 'IC1 Section A, May 2026',
  note: 'Verbatim question paper wording used for student retry context.',
  question: examPaper.questions[questionKey],
  extract: paragraphKeys.map((key) => examPaper.paragraphs[key]).join(' '),
});

const q1ExamSource = paperSource('q1', ['opening', 'output', 'supply']);
const q2ExamSource = paperSource('q2', ['demand']);
const q3ExamSource = paperSource('q3', ['output', 'supply']);
const q4ExamSource = paperSource('q4', ['sectors']);
const q5ExamSource = paperSource('q5', ['sectors']);
const q6ExamSource = paperSource('q6', ['sectors']);

const elasticitySource = {
  label: 'Reference source',
  ref: 'Definitions 2026: PED and PES determinants; Syllabus 2.6-2.7',
  note: 'Used where no existing lesson deck directly covers elasticity.',
};

const marketSystemSource = {
  label: 'Internal lesson source',
  ref: '../2-8-market-economic-system/slides-lesson-1.js; slides-lesson-3.js',
  note: 'Reused wording for market economic system, sectors, choice, incentives and efficiency.',
};

IGCSE.lesson = {
  meta: {
    code: 'IC1 Section A',
    unit: 'Unit 2 - The allocation of resources',
    title: 'Cocoa and chocolate exam discussion - IGCSE Economics 0455',
    lessonLabel: 'IC1 Section A discussion',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
    availableViews: ['slides', 'handout'],
    sources: [examSource],
  },
  slides: [
    {
      type: 'hero',
      eyebrow: 'Lesson overview',
      title: 'Cocoa and chocolate markets',
      zhTitle: '可可与巧克力市场',
      subtitle: 'IC1 Section A exam discussion',
      kicker: 'A cocoa price shock above US$10,000 per tonne turns one case into six exam skills.',
      visual: photos.cocoaPods,
    },
    {
      type: 'fact',
      eyebrow: 'Starter',
      facts: {
        left: {
          country: 'World cocoa market',
          fact: 'In June 2024, cocoa prices moved above US$10,000 per metric tonne after poor harvests in West Africa.',
          source: 'Source: IC1 Section A case extract.',
        },
        china: {
          country: 'Case visual',
          fact: 'Cocoa starts as pods and beans before it becomes chocolate, so harvest problems can travel through the supply chain.',
          source: 'Source: IC1 Section A case extract.',
        },
      },
      visual: photos.cocoaPods,
      sources: [examSource],
    },
    {
      type: 'discussion',
      question: 'Before we mark answers, what single market problem connects the cocoa case to all six questions?',
      zh: '在评分答案之前，这个可可案例中的哪一个市场问题把六道题联系起来？',
      answer: 'Poor cocoa harvests reduced the supply of cocoa beans. That supply shock can make cocoa supply less responsive in the short run, raise chocolate production costs, push chocolate supply left, and create exam links to elasticity, sectors and market allocation.',
      answerZh: '可可歉收减少了可可豆供给。这个供给冲击会使短期可可供给反应较弱，提高巧克力生产成本，使巧克力供给曲线左移，并把弹性、部门和市场配置等考点联系起来。',
      visual: photos.cocoaPods,
      sources: [examSource, elasticitySource, marketSystemSource],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Question 1: PES of cocoa beans',
      zhTitle: '问题1：可可豆的供给价格弹性',
    },
    {
      type: 'paperExtract',
      eyebrow: 'Question paper',
      title: numberedQuestions.q1,
      paragraphs: [examPaper.paragraphs.opening, examPaper.paragraphs.output, examPaper.paragraphs.supply],
      question: examPaper.questions.q1,
      source: 'Source: IC1 Section A question paper.',
      sources: [q1ExamSource],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Exam answer',
      title: numberedQuestions.q1,
      question: examPaper.questions.q1,
      answer: 'One factor is time, because new cocoa trees usually take 3-5 years to produce a crop. Another factor is resource availability, because suitable land, labour and fertiliser may be limited.',
      links: ['time', 'resource availability'],
      partialReview: ['.modelAnswerCard', '.modelAnswerLinks > span'],
      sources: [q1ExamSource, elasticitySource],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Question 2: PED for chocolate products',
      zhTitle: '问题2：巧克力产品的需求价格弹性',
    },
    {
      type: 'paperExtract',
      eyebrow: 'Question paper',
      title: numberedQuestions.q2,
      paragraphs: [examPaper.paragraphs.demand],
      question: examPaper.questions.q2,
      source: 'Source: IC1 Section A question paper.',
      sources: [q2ExamSource],
    },
    {
      type: 'fact',
      eyebrow: 'Explore',
      facts: {
        left: {
          country: 'United States',
          fact: 'Consumers had many alternatives to chocolate, including non-chocolate candy, gum, mints, biscuits and other snacks.',
          source: 'Source: IC1 Section A case extract.',
        },
        china: {
          country: 'Case clue',
          fact: 'Average spending per confectionery shopping trip was US$7.73, so the share of income may be small for many buyers.',
          source: 'Source: IC1 Section A case extract.',
        },
      },
      visual: photos.confectioneryShelf,
      sources: [q2ExamSource, elasticitySource],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Which product is likely to have the most elastic demand?',
      choices: [
        'One brand of chocolate with many close substitutes.',
        'All confectionery bought for a family holiday.',
        'A small snack that takes a tiny share of income.',
      ],
      answer: 0,
      prompt: 'Close substitutes usually make demand more elastic.',
      visual: photos.chocolateShopDisplay,
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Exam answer',
      title: numberedQuestions.q2,
      question: examPaper.questions.q2,
      answer: 'One factor is the availability of substitutes, because consumers can buy non-chocolate candy, gum, mints, biscuits and other snacks. Another factor is the proportion of income spent, because average confectionery spending per shopping trip was only US$7.73.',
      links: ['substitutes', 'proportion of income'],
      partialReview: ['.modelAnswerCard', '.modelAnswerLinks > span'],
      sources: [q2ExamSource, elasticitySource],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Question 3: supply shock diagram',
      zhTitle: '问题3：供给冲击图',
    },
    {
      type: 'paperExtract',
      eyebrow: 'Question paper',
      title: numberedQuestions.q3,
      paragraphs: [examPaper.paragraphs.output, examPaper.paragraphs.supply],
      question: examPaper.questions.q3,
      source: 'Source: IC1 Section A question paper.',
      sources: [q3ExamSource],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: numberedQuestions.q3,
      question: examPaper.questions.q3,
      keywords: ['D and S1 labelled', 'S shifts left to S2', 'price rises', 'quantity falls'],
      prompt: 'Try it on paper before revealing the model diagram.',
      visual: photos.chocolateShopDisplay,
      partialReview: ['.cardgrid > .card', '.prompt'],
      sources: [q3ExamSource],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Exam answer',
      title: numberedQuestions.q3,
      question: examPaper.questions.q3,
      answer: 'A full-credit diagram should show a labelled demand curve and original supply curve, then shift supply left from S1 to S2 because poor cocoa harvests reduce cocoa availability. The new equilibrium should show price rising and quantity falling in the world market for chocolate.',
      links: ['D and S1 labelled', 'S shifts left to S2', 'price rises', 'quantity falls'],
      markSchemeNote: 'This follows the mark-scheme chain for a diagram question: label the original curves, show the correct supply shift, then identify the price and quantity effects.',
      partialReview: ['.modelAnswerCard', '.modelAnswerLinks > span', '.modelAnswerNote'],
      sources: [q3ExamSource],
    },
    {
      type: 'answer',
      eyebrow: 'Exam answer',
      title: 'Q3 model diagram',
      cue: 'Supply shifts left because poor harvests reduce cocoa availability. The new equilibrium has a higher price and lower quantity.',
      visual: {
        type: 'diagram',
        kind: 'demand-supply',
        title: 'Poor harvests reduce chocolate supply',
        shift: 'supplyLeft',
        xLabel: 'Quantity of chocolate',
        yLabel: 'Price of chocolate',
        caption: 'S1 to S2: price rises from P1 to P2; quantity falls from Q1 to Q2.',
      },
      partialReview: ['.prompt'],
      sources: [q3ExamSource],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Questions 4 and 5: sectors and systems',
      zhTitle: '问题4和5：部门与经济体制',
    },
    {
      type: 'paperExtract',
      eyebrow: 'Question paper',
      title: `${numberedQuestions.q4} / ${numberedQuestions.q5}`,
      paragraphs: [examPaper.paragraphs.sectors],
      questions: [examPaper.questions.q4, examPaper.questions.q5],
      source: 'Source: IC1 Section A question paper.',
      sources: [q4ExamSource, q5ExamSource],
    },
    {
      type: 'compare',
      eyebrow: 'Learn',
      title: 'Private sector and public sector',
      leftTitle: 'Private sector',
      left: ['owned by individuals or shareholders', 'usually aims to earn profit', 'case examples: chocolate manufacturers and supermarkets'],
      rightTitle: 'Public sector',
      right: ['owned or controlled by government', 'often provides services or regulates activity', 'case example: Ghana Cocoa Board'],
      prompt: 'This wording follows the existing market economic system lesson.',
      visual: photos.confectioneryShelf,
      partialReview: ['.splitCols > .card', '.prompt'],
      sources: [marketSystemSource, q4ExamSource],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Exam answer',
      title: numberedQuestions.q4,
      question: examPaper.questions.q4,
      answer: 'The private sector is operated and owned by individuals or firms, with decisions often influenced by profit. The public sector is operated and owned or controlled by the government.',
      links: ['private sector', 'public sector', 'profit', 'government'],
      partialReview: ['.modelAnswerCard', '.modelAnswerLinks > span'],
      sources: [q4ExamSource, marketSystemSource],
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      title: 'Market economic system',
      zhTitle: '市场经济体制',
      term: 'market economic system',
      definition: 'An economy where resources are allocated mainly by market forces or the price mechanism, with private sector ownership and decisions influenced by the profit motive.',
      definitionZh: '一种经济体制，资源主要由市场力量或价格机制配置，资源以私人部门所有为主，决策受利润动机影响。',
      examples: [
        ['Markets', 'buyers and sellers interact'],
        ['Private ownership', 'resources owned by individuals and firms'],
        ['Price mechanism', 'prices signal where resources should move'],
      ],
      visual: photos.chocolateShopDisplay,
      partialReview: ['.termBox', '.termExamples > .termExample'],
      sources: [q5ExamSource, marketSystemSource],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Exam answer',
      title: numberedQuestions.q5,
      question: examPaper.questions.q5,
      answer: 'A market economic system is an economy where resources are allocated mainly by market forces or the price mechanism, with private sector ownership and decisions influenced by the profit motive.',
      links: ['market forces', 'price mechanism', 'private sector ownership', 'profit motive'],
      partialReview: ['.modelAnswerCard', '.modelAnswerLinks > span'],
      sources: [q5ExamSource, marketSystemSource],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title: 'Question 6: advantages of markets',
      zhTitle: '问题6：市场的优点',
    },
    {
      type: 'paperExtract',
      eyebrow: 'Question paper',
      title: numberedQuestions.q6,
      paragraphs: [examPaper.paragraphs.sectors],
      question: examPaper.questions.q6,
      source: 'Source: IC1 Section A question paper.',
      sources: [q6ExamSource],
    },
    {
      type: 'cards',
      eyebrow: 'Apply',
      title: 'Build two advantage chains',
      cardStyle: 'compactVisual',
      cardLayout: 'balancedGrid',
      cards: [
        { title: 'Consumer sovereignty', body: 'firms respond to what consumers demand', icon: 'market' },
        { title: 'Choice', body: 'competition can create different brands and sizes', icon: 'prices' },
        { title: 'Quality and innovation', body: 'profit rewards products that attract buyers', icon: 'growth' },
        { title: 'Efficiency', body: 'competition pressures firms to cut waste and costs', icon: 'industry' },
      ],
      footer: 'Each chain needs an advantage, a cause and a result.',
      partialReview: ['.cardgrid > .card', '.prompt'],
      sources: [q6ExamSource, marketSystemSource],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Exam answer',
      title: numberedQuestions.q6,
      question: examPaper.questions.q6,
      answer: 'One advantage is consumer sovereignty: firms can earn more profit by producing goods that consumers demand, so resources are directed towards popular products and consumers get more choice. A second advantage is efficiency: competition pressures firms to reduce waste and lower production costs, so resources may be used more efficiently and prices may be lower.',
      links: ['consumer sovereignty', 'demand', 'profit', 'choice', 'competition', 'efficiency'],
      partialReview: ['.modelAnswerCard', '.modelAnswerLinks > span'],
      sources: [q6ExamSource, marketSystemSource],
    },
    {
      type: 'answer',
      eyebrow: 'Exit ticket',
      title: 'Four fast checks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'New cocoa trees taking 3-5 years makes supply less price __________.', 'elastic'],
        ['2', 'Many sweets and snacks are __________ for chocolate.', 'substitutes'],
        ['3', 'Poor harvests shift supply to the __________.', 'left'],
        ['4', 'Competition may improve efficiency by reducing waste and __________.', 'costs'],
      ],
      visual: photos.cocoaPods,
      partialReview: ['.steps > .step'],
      sources: [examSource, elasticitySource, marketSystemSource],
    },
  ],
};
