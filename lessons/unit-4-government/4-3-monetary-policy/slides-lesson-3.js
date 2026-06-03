/* ============================================================
   Lesson 4.3 - Monetary policy lesson 3
   Cambridge IGCSE Economics 0455 - Unit 4: Government and the macroeconomy

   Syllabus source: ../../../references/igcse-economics-syllabus-2027-2029.md
   Definitions source: ../../../references/igcse-economics-definitions-2026.md
   Paper 2 mark-scheme archive: ../../../references/paper-2-mark-schemes-2023-2025/
   Focus: 4.3.2 money supply measures, with only a brief exchange-rate intro.
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.monetaryPolicy;

IGCSE.lesson = {
  meta: {
    code: '4.3.2',
    unit: 'Unit 4 - Government and the macroeconomy',
    title: 'Monetary policy lesson 3: money supply measures - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Monetary policy lesson 3',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow: 'Lesson overview',
      title: 'Money supply measures',
      zhTitle: '货币供给措施',
      subtitle: 'Monetary policy lesson 3 - 4.3.2',
      kicker: 'What can a central bank change besides interest rates?',
      visual: photos.moneySupply,
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'More money, more spending?',
      question: 'If banks have more money available to lend, what might households and firms do next?',
      zh: '如果银行有更多资金可以贷款，家庭和企业接下来可能会做什么？',
      answer: 'Households may borrow and spend more, while firms may borrow for investment. This can raise demand, output and employment.',
      answerZh: '家庭可能增加借款和消费，企业可能为投资而借款。这会提高需求、产出和就业。',
      visual: photos.moneySupply,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives - 4.3.2',
      title: 'By the end, you can',
      bullets: [
        'Explain how changing money supply affects lending and spending.',
        'Distinguish expansionary and contractionary money-supply measures.',
        'Briefly introduce foreign exchange rates as a monetary-policy tool.',
      ],
      zhBullets: [
        '解释改变货币供给如何影响贷款和支出。',
        '区分扩张性和紧缩性货币供给措施。',
        '简要介绍外汇汇率这一货币政策工具。',
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 1',
      title: 'Money supply measures',
      zhTitle: '货币供给措施',
    },
    {
      type: 'fact',
      eyebrow: 'Example',
      facts: {
        left: {
          country: 'United States',
          context: 'The Federal Reserve can use money and bank reserves to influence liquidity in the financial system.',
          question: 'How can changing money or bank reserves affect liquidity in the financial system?',
          questionZh: '改变货币或银行准备金会如何影响金融体系流动性？',
          answer: 'More money or reserves can increase liquidity, making it easier for banks to lend and for spending to rise.',
          source: 'Source: Federal Reserve monetary policy implementation materials.',
        },
        china: {
          country: 'China',
          context: 'In February 2024, China cut the reserve requirement ratio by 0.5 percentage points.',
          question: 'How could this affect liquidity and spending?',
          questionZh: '这会如何影响流动性和支出？',
          answer: 'Lower reserve requirements can increase bank liquidity, making it easier for banks to lend and for spending to rise.',
          source: 'Source: People\'s Bank of China, January 2024 announcement.',
        },
      },
      visual: photos.pboc,
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'Two money-supply directions',
      cards: [
        ['Increase money supply', 'more liquidity available to banks and households'],
        ['Reduce money supply', 'less liquidity available in the economy'],
        ['Expansionary aim', 'raise spending, investment, output and employment'],
        ['Contractionary aim', 'reduce spending growth and inflationary pressure'],
      ],
      footer: 'Keep the wording at IGCSE level: more or less money available in the economy.',
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'Policy direction',
      zhTitle: '政策方向',
      prompt: 'Classify each case as expansionary, contractionary or a risk.',
      zhPrompt: '判断每种情况属于扩张性、紧缩性还是风险。',
      categories: [
        { title: 'Expansionary', zhTitle: '扩张性', clue: 'support output and employment' },
        { title: 'Contractionary', zhTitle: '紧缩性', clue: 'reduce inflationary pressure' },
        { title: 'Risk', zhTitle: '风险', clue: 'side effect or trade-off' },
      ],
      items: [
        { text: 'Output is below capacity and banks are reluctant to lend to firms', answer: 'Expansionary', reason: 'A larger money supply may raise liquidity, lending, investment and employment.' },
        { text: 'Consumer spending is rising faster than output and prices are accelerating', answer: 'Contractionary', reason: 'A smaller money supply may reduce lending, spending and demand-pull inflation.' },
        { text: 'A larger money supply raises demand when firms cannot increase output', answer: 'Risk', reason: 'Extra demand without spare capacity may create inflationary pressure.' },
      ],
      sharePrompt: 'Share one classification and the macro aim it targets.',
    },
    {
      type: 'section',
      eyebrow: 'Part 2',
      title: 'Increasing money supply',
      zhTitle: '增加货币供给',
      subtitle: 'Expansionary use',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: 'Increasing money supply',
      zhTitle: '增加货币供给',
      mode: 'fillBlanks',
      nodes: [[
        { text: '__________ rises', answer: 'money supply', zh: '货币供给上升' },
        { text: '__________ may increase', answer: 'bank lending', zh: '银行可能增加贷款' },
        { text: 'spending and __________ may rise', answer: 'investment', zh: '支出和投资可能上升' },
        { text: 'output and __________ may rise', answer: 'employment', zh: '产出和就业可能上升' },
      ]],
      footer: 'Risk: inflationary pressure may rise if aggregate demand grows faster than output.',
      visual: photos.pboc,
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2025FM-22 Q3(d)',
          note: 'Money-supply discuss wording includes consumer expenditure, investment, demand, growth, employment and inflation risks.',
          extract: 'MS basis: increased money supply can raise spending and investment, but may cause demand-pull inflation.',
        },
      ],
    },
    {
      type: 'peerTask',
      eyebrow: 'Pair check',
      prompt: 'With your partner, write one money-supply link from banks to households or firms.',
      zhPrompt: '两人合作，写出一条从银行到家庭或企业的货币供给影响链。',
      steps: [
        ['1', 'Start with: money supply rises and banks may lend more.'],
        ['2', 'Choose households OR firms, then name spending or investment.'],
        ['3', 'End with output, employment or inflationary pressure.'],
      ],
      sharePrompt: 'Share one complete bank-lending link.',
      sampleAnswers: ['If money supply rises, banks may lend more to firms, so business investment and output may rise and employment may increase.'],
      partialReview: ['.peerTaskSamples > .choice'],
    },
    {
      type: 'section',
      eyebrow: 'Part 3',
      title: 'Reducing money supply',
      zhTitle: '减少货币供给',
      subtitle: 'Contractionary use',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: 'Reducing money supply',
      zhTitle: '减少货币供给',
      mode: 'fillBlanks',
      nodes: [[
        { text: '__________ falls', answer: 'money supply', zh: '货币供给下降' },
        { text: '__________ may decrease', answer: 'bank lending', zh: '银行可能减少贷款' },
        { text: 'spending and __________ may fall', answer: 'investment', zh: '支出和投资可能下降' },
        { text: '__________ may fall', answer: 'inflationary pressure', zh: '通胀压力可能下降' },
      ]],
      footer: 'Risk: output and employment may fall if demand is reduced too much.',
      visual: photos.fed,
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Money supply check',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Increasing money supply can increase __________.', 'bank lending'],
        ['2', 'More lending may increase spending and __________.', 'investment'],
        ['3', 'Reducing money supply can reduce __________.', 'inflationary pressure'],
        ['4', 'A risk of increasing money supply too quickly is __________.', 'inflation'],
      ],
    },
    {
      type: 'discussion',
      eyebrow: 'Brief intro',
      title: 'Foreign exchange rate',
      question: 'Why should we only introduce exchange rates briefly in this monetary-policy lesson?',
      zh: '为什么在这节货币政策课中只简要介绍汇率？',
      answer: 'Exchange rates are listed as a monetary-policy tool here, but exchange-rate determination and current-account analysis are taught properly in Unit 6.',
      answerZh: '汇率在这里作为一种货币政策工具出现，但汇率决定和经常账户分析会在第六单元系统学习。',
      visual: photos.exchangeRate,
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      definitionCue: 'Key term',
      title: 'Foreign exchange rate',
      zhTitle: '外汇汇率',
      term: 'foreign exchange rate',
      definition: 'The price of one currency in terms of another currency.',
      definitionZh: '一种货币用另一种货币表示的价格。',
      keyTerms: [
        { term: 'price', zh: '价格', note: 'how much one currency costs' },
        { term: 'one currency', zh: '一种货币', note: 'for example, the yuan' },
        { term: 'another currency', zh: '另一种货币', note: 'for example, the US dollar' },
      ],
      showExamples: false,
      partialReview: ['.definitionTermNotes > .definitionTermNote'],
    },
    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'Exchange-rate direction',
      zhTitle: '汇率方向',
      prompt: 'Classify each basic trade-price effect.',
      zhPrompt: '判断每个基本贸易价格影响。',
      categories: [
        { title: 'Lower exchange rate', zhTitle: '较低汇率', clue: 'exports cheaper, imports dearer' },
        { title: 'Higher exchange rate', zhTitle: '较高汇率', clue: 'exports dearer, imports cheaper' },
      ],
      items: [
        { text: 'Exports may become cheaper for foreign buyers', answer: 'Lower exchange rate', reason: 'A lower currency value can reduce the foreign-currency price of exports.' },
        { text: 'Imports may become cheaper for domestic buyers', answer: 'Higher exchange rate', reason: 'A higher currency value can buy more foreign currency and reduce import prices.' },
        { text: 'Exports may become more expensive for foreign buyers', answer: 'Higher exchange rate', reason: 'A higher currency value can raise the foreign-currency price of exports.' },
      ],
      sharePrompt: 'Share one price effect only; detailed current-account analysis comes in Unit 6.',
    },
    {
      type: 'compare',
      eyebrow: 'Brief link',
      mode: 'fillBlanks',
      leftTitle: 'Lower exchange rate',
      left: [
        ['1', '__________ may become cheaper for foreign buyers.', 'exports'],
        ['2', '__________ may become more expensive.', 'imports'],
      ],
      rightTitle: 'Higher exchange rate',
      right: [
        ['1', '__________ may become more expensive for foreign buyers.', 'exports'],
        ['2', '__________ may become cheaper.', 'imports'],
      ],
      prompt: 'Stop here for now: exchange-rate determination and current-account analysis come later in Unit 6.',
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Which pair lists two monetary policy measures?',
      choices: [
        'Interest rates and money supply.',
        'Income tax and government spending.',
        'Minimum wage and subsidies.',
        'Tariffs and public-sector pensions.',
      ],
      answer: 0,
      prompt: 'Past Paper 2 accepts interest rates and money supply as monetary-policy measures.',
      visual: photos.moneySupply,
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2023ON-21 Q5(a); 2025ON-22 Q4(a)',
          note: 'Recent items identify monetary-policy measures and central-bank measures for price stability.',
          extract: 'MS basis: interest rates, money supply and exchange-rate measures are accepted monetary-policy tools.',
        },
      ],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '离堂小测',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Monetary policy measures include changes in interest rates and the __________.', 'money supply'],
        ['2', 'Increasing money supply may increase bank __________.', 'lending'],
        ['3', 'Reducing money supply may reduce inflationary __________.', 'pressure'],
        ['4', 'The foreign exchange rate is the price of one __________ in terms of another.', 'currency'],
      ],
      cue: 'Answer before leaving.',
    },
  ],
};
