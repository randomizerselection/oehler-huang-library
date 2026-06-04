/* ============================================================
   Lesson 4.3 - Monetary policy lesson 4
   Cambridge IGCSE Economics 0455 - Unit 4: Government and the macroeconomy

   Syllabus source: ../../../references/igcse-economics-syllabus-2027-2029.md
   Definitions source: ../../../references/igcse-economics-definitions-2026.md
   Paper 2 mark-scheme archive: ../../../references/paper-2-mark-schemes-2023-2025/
   Focus: 4.3.3 synthesis, macroeconomic effects and exam evaluation.
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.monetaryPolicy;

IGCSE.lesson = {
  meta: {
    code: '4.3.3',
    unit: 'Unit 4 - Government and the macroeconomy',
    title: 'Monetary policy lesson 4: effects and evaluation - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Monetary policy lesson 4',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow: 'Overview',
      title: 'Effects of monetary policy',
      zhTitle: '影响与评价',
      subtitle: 'Monetary policy lesson 4 - 4.3.3',
      kicker: 'How do policy measures move through the whole economy?',
      visual: photos.householdSaving,
    },
    {
      type: 'peerTask',
      eyebrow: 'Recall',
      title: 'Recall last lesson',
      prompt: 'On paper, write a simple definition for each term. Use one sentence for each.',
      stepsLabel: 'Write these definitions',
      steps: [
        ['1', 'Money supply'],
        ['2', 'Foreign exchange rate'],
        ['3', 'Increasing money supply'],
      ],
      sharePrompt: 'Compare your definitions with a partner before revealing the model answers.',
      sampleAnswers: [
        'Money supply is the total amount of money available in an economy at a given time.',
        'A foreign exchange rate is the price of one currency in terms of another currency.',
        'Increasing money supply means making more money or liquidity available in the economy, which may increase bank lending and spending.',
      ],
      partialReview: ['.peerTaskSamples > .choice'],
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'What if borrowing gets dearer?',
      question: 'A household wants to buy a car using a loan. If interest rates rise, how might its borrowing and spending decision change?',
      zh: '一个家庭想贷款买车。如果利率上升，它的借款和消费决定可能会怎样改变？',
      answer: 'Borrowing becomes more expensive, so the household may borrow less or delay the purchase. Spending falls, and this can reduce aggregate demand.',
      answerZh: '借款变得更贵，因此家庭可能减少借款或推迟购买。支出下降，这可能减少总需求。',
      visual: photos.householdSaving,
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Build effect chains.',
        'Compare macro effects.',
        'Evaluate monetary policy.',
      ],
      zhBullets: [
        '构建影响链。',
        '比较宏观影响。',
        '评价货币政策。',
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 1',
      title: 'The full transmission process',
      zhTitle: '完整传导链',
    },
    {
      type: 'cards',
      eyebrow: 'Review',
      title: 'Policy tools to first effects',
      cards: [
        { title: 'Lower interest rates', zhTitle: '降低利率', body: 'Borrowing becomes cheaper.' },
        { title: 'Higher interest rates', zhTitle: '提高利率', body: 'Borrowing becomes dearer.' },
        { title: 'Increase money supply', zhTitle: '增加货币供给', body: 'Bank lending may rise.' },
        { title: 'Reduce money supply', zhTitle: '减少货币供给', body: 'Bank lending may fall.' },
      ],
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'Expansionary or contractionary?',
      zhTitle: '扩张性还是紧缩性？',
      prompt: 'Classify each policy change, then name the first effect.',
      zhPrompt: '判断每个政策变化属于扩张性还是紧缩性，并说出第一步影响。',
      categories: [
        { title: 'Expansionary', zhTitle: '扩张性', clue: 'raises aggregate demand' },
        { title: 'Contractionary', zhTitle: '紧缩性', clue: 'reduces aggregate demand' },
      ],
      items: [
        { text: 'The central bank lowers interest rates', answer: 'Expansionary', reason: 'Borrowing becomes cheaper and spending or investment may rise.' },
        { text: 'The central bank reduces the money supply', answer: 'Contractionary', reason: 'Bank lending and spending may fall.' },
        { text: 'The central bank increases money supply', answer: 'Expansionary', reason: 'Liquidity and lending may rise.' },
        { text: 'The central bank raises interest rates', answer: 'Contractionary', reason: 'Borrowing becomes more expensive and saving more rewarding.' },
      ],
      sharePrompt: 'Share one policy direction and the first effect.',
    },
    {
      type: 'section',
      eyebrow: 'Part 2',
      title: 'Effects on macro aims',
      zhTitle: '对宏观目标的影响',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: 'Growth and employment',
      zhTitle: '经济增长与就业',
      mode: 'fillBlanks',
      nodes: [[
        { text: 'lower rates or more money increase __________', answer: 'borrowing and lending', zh: '较低利率或更多货币增加借款和贷款' },
        { text: 'spending and __________ may rise', answer: 'investment', zh: '支出和投资可能上升' },
        { text: 'firms may raise __________', answer: 'output', zh: '企业可能提高产出' },
        { text: 'demand for labour and __________ may rise', answer: 'employment', zh: '劳动力需求和就业可能上升' },
      ]],
      visual: photos.bankLendingCashier,
    },
    {
      type: 'peerTask',
      taskType: 'missingSentence',
      eyebrow: 'Pair task',
      title: 'Complete the missing sentence',
      zhPrompt: '两人合作，写出一个关于增长和就业的解释。',
      steps: [
        ['1', 'Lower interest rates or increased money supply may raise borrowing and lending.'],
        ['2', '__________', 'Spending and investment may rise.'],
        ['3', 'Firms may raise output and employment may increase.'],
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: 'Spending and investment may rise as households and firms increase demand.',
    },
    {
      type: 'flow',
      eyebrow: 'Learn',
      title: 'Inflationary pressure',
      zhTitle: '通胀压力',
      mode: 'fillBlanks',
      nodes: [[
        { text: 'higher rates or less money reduce __________', answer: 'borrowing and lending', zh: '较高利率或更少货币减少借款和贷款' },
        { text: 'spending and __________ may fall', answer: 'investment', zh: '支出和投资可能下降' },
        { text: 'aggregate demand may __________', answer: 'fall', zh: '总需求可能下降' },
        { text: 'demand-pull __________ may fall', answer: 'inflation', zh: '需求拉动型通胀可能下降' },
      ]],
      visual: photos.householdSaving,
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Higher rates may reduce borrowing and __________.', 'lending'],
        ['2', 'Aggregate demand may __________.', 'fall'],
        ['3', 'Demand-pull inflation may __________.', 'fall'],
      ],
    },
    {
      type: 'cards',
      eyebrow: 'Brief link',
      title: 'Current account: only the bridge for now',
      cards: [
        { title: 'Spending link', zhTitle: '支出联系', body: 'Lower spending may reduce imports.' },
        { title: 'Exchange-rate link', zhTitle: '汇率联系', body: 'Interest rates may affect the currency.' },
        { title: 'Trade link', zhTitle: '贸易联系', body: 'Exports and imports may change.' },
        { title: 'Later unit', zhTitle: '后续单元', body: 'Unit 6 teaches full current-account analysis.' },
      ],
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Fill in the blanks',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Expansionary monetary policy may increase aggregate __________.', 'demand'],
        ['2', 'Higher demand may increase output and __________.', 'employment'],
        ['3', 'Contractionary monetary policy may reduce inflationary __________.', 'pressure'],
        ['4', 'Monetary policy may also briefly affect imports, exports and the current __________.', 'account'],
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 3',
      title: 'Evaluation',
      zhTitle: '评价',
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'What decides effectiveness?',
      cards: [
        { title: 'Cause of inflation', zhTitle: '通胀原因', body: 'Higher rates work best against demand-pull inflation.' },
        { title: 'Business confidence', zhTitle: '商业信心', body: 'Firms may not invest if confidence is low.' },
        { title: 'Spare capacity', zhTitle: '闲置产能', body: 'Extra demand can raise output when resources are unused.' },
        { title: 'Time lag', zhTitle: '时间滞后', body: 'Households and firms do not respond instantly.' },
      ],
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'peerTask',
      eyebrow: 'Pair task',
      prompt: 'With your partner, write one judgement sentence about a monetary-policy trade-off.',
      zhPrompt: '两人合作，写出一个关于货币政策取舍的判断句。',
      steps: [
        ['1', 'Choose one trade-off: growth vs inflation, employment vs prices, or time lag.'],
        ['2', 'Name one benefit and one risk.'],
        ['3', 'Use this frame: Overall, this policy is most useful when ___.'],
      ],
      sharePrompt: 'Share the judgement and the condition that decides it.',
      sampleAnswers: ['Overall, higher interest rates are most useful when inflation is caused by excess demand, but they are risky when unemployment is already high because spending and output may fall.'],
      partialReview: ['.peerTaskSamples > .choice'],
    },
    {
      type: 'discussion',
      eyebrow: 'Exam practice',
      title: 'Exam synthesis',
      question: 'What does an exam answer need beyond naming a monetary-policy measure?',
      zh: '考试答案除了说出一种货币政策措施，还需要什么？',
      answer: 'It needs connected explanation steps, a clear macroeconomic effect, and for discuss questions, a balanced judgement.',
      answerZh: '它需要连贯的解释步骤、明确的宏观经济影响；在讨论题中还需要平衡判断。',
      visual: photos.bankLendingCashier,
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Explain how lower interest rates may increase employment. [4]',
      question: 'Explain how lower interest rates may increase employment.',
      marks: 4,
      keywordLabel: 'Use these keywords',
      keywords: ['borrowing', 'spending', 'output', 'employment'],
      prompt: 'Use at least three connected explanation points.',
      visual: photos.bankLendingCashier,
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2025ON-21 Q1(g)',
          note: 'Interest-rate effects include borrowing, saving, spending, investment, output and employment links.',
          extract: 'MS basis: interest-rate changes affect borrowing, saving, spending and investment.',
        },
      ],
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Explain how lower interest rates may increase employment. [4]',
      question: 'Explain how lower interest rates may increase employment.',
      paragraphs: [
        'Lower interest rates make borrowing cheaper, so consumers and firms may spend more.',
        'Higher spending can increase demand for goods and services, encouraging firms to raise output.',
        'To produce more, firms may employ more workers, so employment increases.'
      ],
      links: ['borrowing', 'spending', 'output', 'employment'],
      showLinkChips: false,
      partialReview: ['.modelAnswerCard'],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Discuss whether higher interest rates are the best way to reduce inflation. [6]',
      question: 'Discuss whether higher interest rates are the best way to reduce inflation.',
      marks: 6,
      keywordLabel: 'Use these keywords',
      keywords: ['saving', 'borrowing', 'spending', 'inflation', 'employment'],
      prompt: 'Build one argument for, one argument against and a judgement.',
      visual: photos.householdSaving,
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2025ON-21 Q1(g); 2023FM-22 Q1(g)',
          note: 'Discuss wording supports both anti-inflation benefits and risks to spending, investment and employment.',
          extract: 'MS basis: higher rates can reduce demand-pull inflation but may reduce spending, investment and employment.',
        },
      ],
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Discuss whether higher interest rates are the best way to reduce inflation. [6]',
      question: 'Discuss whether higher interest rates are the best way to reduce inflation.',
      paragraphs: [
        'Higher interest rates can encourage saving and make borrowing more expensive, so spending falls.',
        'This may reduce demand-pull inflation.',
        'However, lower spending can reduce firms\' output and employment, so unemployment may rise.',
        'It may also be less effective if inflation is caused by higher production costs.',
        'Overall, higher interest rates are useful against demand-pull inflation, but supply-side or fiscal policies may be better for cost-push inflation.'
      ],
      links: ['saving', 'borrowing', 'spending', 'inflation', 'employment'],
      showLinkChips: false,
      partialReview: ['.modelAnswerCard'],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Discuss whether an increase in the money supply will benefit an economy. [8]',
      question: 'Discuss whether an increase in the money supply will benefit an economy.',
      marks: 8,
      keywordLabel: 'Use these keywords',
      keywords: ['lending', 'spending', 'investment', 'employment', 'inflation'],
      prompt: 'Use one benefit, one risk and a judgement.',
      visual: photos.bankLendingCashier,
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2025FM-22 Q3(d)',
          note: 'Money-supply discuss wording includes benefits for demand, growth and employment plus inflation and current-account risks.',
          extract: 'MS basis: increased money supply can raise spending and investment, but may cause demand-pull inflation.',
        },
      ],
      partialReview: ['.cardgrid > .card', '.prompt'],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Discuss whether an increase in the money supply will benefit an economy. [8]',
      question: 'Discuss whether an increase in the money supply will benefit an economy.',
      paragraphs: [
        'An increase in the money supply may help an economy because banks can lend more to households and firms.',
        'This can raise spending, investment, output and employment.',
        'However, if output cannot rise quickly, extra demand may cause demand-pull inflation.',
        'Overall, it is most useful when there is spare capacity and firms can increase output.'
      ],
      links: ['lending', 'spending', 'investment', 'employment', 'inflation'],
      showLinkChips: false,
      partialReview: ['.modelAnswerCard'],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '离堂小测',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Expansionary monetary policy may increase spending and __________.', 'investment'],
        ['2', 'Contractionary monetary policy may reduce aggregate __________.', 'demand'],
        ['3', 'Higher interest rates may reduce demand-pull __________.', 'inflation'],
        ['4', 'A good judgement should name the condition that affects policy __________.', 'effectiveness'],
      ],
      cue: 'Answer before leaving.',
    },
  ],
};
