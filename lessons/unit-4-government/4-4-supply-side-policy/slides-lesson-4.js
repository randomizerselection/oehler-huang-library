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
   Lesson 4 focuses on 4.4.3. Effects should be connected to macroeconomic
   aims: growth, employment, stable prices, competitiveness and the current
   account, with time lag and opportunity cost evaluation.
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.supplySidePolicy;
const factPhotos = IGCSE.photos.supplySidePolicyFacts;
const ppcGrowth = {
  type: 'diagram',
  kind: 'ppc',
  mode: 'rightShift',
  title: 'PPC: long-run growth',
  caption: 'Higher productivity, capital or technology can shift PPC1 to PPC2.',
};
const ppcEmployment = {
  type: 'diagram',
  kind: 'ppc',
  mode: 'insideToOn',
  title: 'PPC: employment effect',
  caption: 'Lower structural unemployment can move output from inside the PPC towards the PPC.',
};
IGCSE.lesson = {
  meta: {
    code:         '4.4.3',
    unit:         'Unit 4 - Government and the macroeconomy',
    title:        'Supply-side policy lesson 4: effects and evaluation - Cambridge IGCSE Economics 0455',
    lessonLabel:  'Supply-side policy lesson 4',
    courseLabel:  'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow:  'Lesson overview',
      title:    'Effects and evaluation',
      zhTitle: '影响与评价',
      subtitle: 'Supply-side policy lesson 4 - 4.4.3',
      kicker:   'How do capacity, productivity and competitiveness affect macroeconomic aims?',
      visual:   photos.portTerminal,
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title:   'Better supply, better economy?',
      question: 'If firms become more productive, which macroeconomic aims might improve at the same time?',
      zh: '如果企业生产率提高，哪些宏观经济目标可能同时改善？',
      answer: 'Growth, employment, price stability and the current account may improve, but only if the policy is effective and well targeted.',
      answerZh: '经济增长、就业、价格稳定和经常账户都可能改善，但前提是政策有效且目标明确。',
      visual: photos.industrialRobot,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives - 4.4.3',
      title:   'By the end, you can',
      bullets: [
        'Explain supply-side effects on growth and employment.',
        'Explain effects on prices, competitiveness and the current account.',
        'Evaluate time lags, opportunity cost and unequal effects.',
        'Build balanced Paper 2 discuss answers.',
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title:   'Growth and employment',
      zhTitle: '增长与就业',
    },
    {
      type: 'fact',
      eyebrow: 'Example',
      facts: {
        left: {
          country: 'Exam archive',
          context: 'Recent Paper 2 mark schemes link education, training, healthcare and infrastructure to productivity and lower unemployment.',
          question: 'Which macroeconomic aim is shown, and what cost can unemployment create?',
          questionZh: '这里体现了哪个宏观经济目标，失业会造成什么成本？',
          answer: 'The aim is low unemployment; unemployment wastes labour and reduces household income.',
          source: 'Source: Cambridge IGCSE Economics 0455 Paper 2 archive, 2023-2025.',
        },
        china: {
          country: 'China',
          context: 'China planned a modern vocational education system by 2025 to support high-quality development.',
          question: 'How could vocational education support long-term economic growth?',
          questionZh: '教育支出可能支持哪个政府支出目标？',
          answer: 'Education spending can support long-run growth by improving human capital and productivity.',
          source: 'Source: China State Council vocational education guidelines, 2021.',
        },
      },
      visual: factPhotos.vocationalEducation,
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title:   'Growth route',
      zhTitle: '增长路径',
      nodes: [['productivity rises', 'costs per unit fall', 'firms can expand output', 'real GDP can rise']],
      footer: 'Supply-side growth is about raising capacity, not only using spare capacity.',
      visual: photos.industrialRobot,
      partialReview: ['.flowRow > .flowChip', '.prompt'],
    },
    {
      type: 'cards',
      eyebrow: 'PPC reasoning',
      title:   'Growth on a PPC',
      cards: [
        ['Growth route', 'productivity or capital increases maximum possible output'],
        ['Policy route', 'education, infrastructure, investment or technology improves supply conditions'],
        ['Capacity route', 'maximum possible output rises'],
        ['Analysis', 'state that productive capacity and long-run output rise'],
      ],
      footer: 'This is the main diagram link for supply-side growth.',
      visual: ppcGrowth,
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title:   'Employment route',
      zhTitle: '就业路径',
      nodes: [['skills or mobility improve', 'workers match vacancies', 'structural unemployment falls', 'employment can rise']],
      footer: 'Evaluation: jobs must exist and workers must be able to access them.',
      visual: photos.employmentOffice,
      partialReview: ['.flowRow > .flowChip', '.prompt'],
    },
    {
      type: 'cards',
      eyebrow: 'PPC reasoning',
      title:   'Employment on a PPC',
      cards: [
        ['Problem', 'structural unemployment can leave output inside the PPC'],
        ['Policy', 'skills or mobility improve'],
        ['Effect', 'workers match vacancies and output moves closer to the PPC'],
        ['Limit', 'this is not automatically a rightward shift'],
      ],
      footer: 'Use this when the question asks about unemployment rather than capacity growth.',
      visual: ppcEmployment,
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title:   'Prices and competitiveness',
      zhTitle: '价格与竞争力',
    },
    {
      type: 'discussion',
      eyebrow: 'Explore',
      title:   'Lower costs',
      question: 'Why might a supply-side policy reduce inflation without reducing employment?',
      zh: '为什么供给侧政策可能在不减少就业的情况下降低通货膨胀？',
      answer: 'If productivity rises and unit costs fall, firms may increase supply and lower prices rather than cut output.',
      answerZh: '如果生产率上升、单位成本下降，企业可能增加供给并降低价格，而不是削减产出。',
      visual: photos.industrialRobot,
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title:   'Price stability route',
      zhTitle: '价格稳定路径',
      nodes: [['productivity rises', 'average costs fall', 'supply rises', 'cost-push inflationary pressure may fall']],
      footer: 'This is why supply-side policy can help with stable prices.',
      visual: photos.industrialRobot,
      partialReview: ['.flowRow > .flowChip', '.prompt'],
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title:   'Current account route',
      zhTitle: '经常账户路径',
      nodes: [['quality rises or costs fall', 'exports become more competitive', 'exports may rise', 'current account may improve']],
      footer: 'Evaluation: exchange rates, foreign demand and rival firms also matter.',
      visual: photos.portTerminal,
      partialReview: ['.flowRow > .flowChip', '.prompt'],
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title:   'Effects on macro aims',
      cards: [
        ['Economic growth', 'higher capacity can raise real GDP'],
        ['Employment', 'skills and expansion can reduce unemployment'],
        ['Price stability', 'lower unit costs can reduce cost-push pressure'],
        ['Current account', 'competitiveness can raise exports or reduce imports'],
      ],
      footer: 'A strong answer identifies the aim and explains the route.',
      visual: ppcGrowth,
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title:   'Fill in the blanks',
      mode:    'fillBlanks',
      steps: [
        ['1', 'Higher productivity can reduce average __________.', 'costs'],
        ['2', 'Lower costs may reduce cost-push __________.', 'inflation'],
        ['3', 'More competitive exports may improve the current __________.', 'account'],
        ['4', 'Better skills may reduce structural __________.', 'unemployment'],
      ],
    },
    {
      type: 'section',
      eyebrow: 'New section',
      title:   'Evaluation',
      zhTitle: '评价',
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title:   'Why effects may be limited',
      cards: [
        ['Time lag', 'education and infrastructure can take years to affect output'],
        ['Opportunity cost', 'money spent here cannot be spent elsewhere'],
        ['Targeting', 'training may not match the jobs firms need'],
        ['Inequality', 'benefits may go mainly to some workers, firms or regions'],
      ],
      footer: 'Use "may" because supply-side policy is not automatic.',
      visual: photos.vwApprentices,
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title:   'Discuss education',
      question: 'Discuss whether improving education can help a government achieve its macroeconomic aims.',
      keywords: ['productivity', 'employment', 'prices', 'exports', 'opportunity cost'],
      prompt:   'Use 2024ON-21 Q3(d): one argument for, one argument against, then a judgement.',
      visual:   ppcGrowth,
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Exam answer',
      title:   'Model answer',
      question: 'Discuss whether improving education can help a government achieve its macroeconomic aims.',
      answer: 'Improving education can raise productivity because workers gain more skills. This may increase employment, reduce costs and help firms keep prices stable. More productive firms may also become more competitive, increasing exports. However, education has an opportunity cost and can take years to affect output. It will help most if the education matches the skills firms need.',
      links: ['productivity', 'employment', 'prices', 'exports', 'opportunity cost'],
      markSchemeNote: 'This follows discuss level wording by developing benefits, adding a limitation, and making a judgement about when the policy works best.',
      partialReview: ['.modelAnswerCard', '.modelAnswerLinks > span', '.modelAnswerNote'],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title:   'Evaluate supply-side policy',
      question: 'Discuss whether supply-side policies are the best way to reduce inflation.',
      keywords: ['productivity', 'costs', 'time lag', 'demand-pull inflation', 'monetary policy'],
      prompt:   'Compare supply-side policy with demand-side alternatives and judge the cause of inflation.',
      visual:   photos.industrialRobot,
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Exam answer',
      title:   'Model answer',
      question: 'Discuss whether supply-side policies are the best way to reduce inflation.',
      answer: 'Supply-side policies can reduce inflation if they raise productivity and lower firms\' costs. Lower costs can reduce cost-push inflation and higher output can reduce pressure on prices. However, there may be a long time lag, and these policies may not solve demand-pull inflation quickly. Monetary policy may be more effective if inflation is caused by excessive spending.',
      links: ['productivity', 'costs', 'time lag', 'demand-pull inflation', 'monetary policy'],
      markSchemeNote: 'This follows discuss wording by comparing both sides and judging effectiveness according to the cause of inflation.',
      partialReview: ['.modelAnswerCard', '.modelAnswerLinks > span', '.modelAnswerNote'],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title:   'Exit ticket',
      zhTitle: '离堂小测',
      mode:    'fillBlanks',
      steps: [
        ['1', 'Supply-side policy can raise long-run output by increasing productive __________.', 'capacity'],
        ['2', 'It may improve price stability by lowering production __________.', 'costs'],
        ['3', 'It may improve the current account by raising international __________.', 'competitiveness'],
        ['4', 'Evaluation should mention time lags, targeting or opportunity __________.', 'cost'],
      ],
      cue: 'Answer before leaving.',
    },
  ],
};
