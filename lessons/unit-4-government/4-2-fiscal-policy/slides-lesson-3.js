/* ============================================================
   Lesson 4.2 - Fiscal policy (4.2.3)
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
    code:         '4.2.3',
    unit:         'Unit 4 - Government and the macroeconomy',
    title:        'Fiscal policy lesson 3: tax structures - Cambridge IGCSE Economics 0455',
    lessonLabel:  'Fiscal policy lesson 3',
    courseLabel:  'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow:  'Lesson overview',
      title:    'Progressive, regressive and proportional taxes',
      zhTitle: '累进税、累退税和比例税',
      subtitle: 'Fiscal policy lesson 3',
      kicker:   'Who pays a higher share of income when taxes change?',
      visual:   photos.taxForms,
    },
    {
          type: 'discussion',
          eyebrow: 'Explore',
          title:   'Income and wealth',
          question: 'Should higher-income households pay a higher percentage of their income in tax?',
          zh: '高收入家庭是否应该缴纳更高比例的收入作为税？',
          answer: 'A progressive tax can reduce inequality, but very high rates may reduce incentives or encourage avoidance.',
          answerZh: '累进税可以减少不平等，但过高税率可能削弱激励或鼓励避税。',
          visual: photos.taxForms,
        },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title:   'By the end, you can',
      bullets: [
        'Distinguish between progressive, regressive and proportional taxes.',
        'Classify taxes as progressive, regressive or proportional from their design.',
        'Explain why indirect taxes can be regressive.',
        'Classify taxes before explaining their effects.',
      ],
    },
    {
          type: 'section',
          eyebrow: 'New section',
          title:   'Progressive, regressive\nand proportional taxes',
          zhTitle: '累进税、累退税和比例税',
        },
    {
          type: 'fact',
          eyebrow: 'Country fact',
          flag: '🇬🇧',
          country: 'United Kingdom',
          context: 'The UK income tax system has bands of 0%, 20%, 40% and 45% in the 2026-27 tax year.',
          question: 'Why is this an example of progressive taxation?',
          questionZh: '为什么这是累进税的例子？',
          answer: 'It is progressive because people with higher taxable income face a higher tax rate.',
          zh: '英国在2026-27纳税年度设有0%、20%、40%和45%的所得税税率档。较高应税收入可能适用更高的边际税率，因此这是累进税的例子。',
          source: 'Source: GOV.UK Income Tax rates and Personal Allowances, 2026-27.',
          visual: factPhotos.hmrcLondon,
        },
    {
          type: 'fact',
          eyebrow: 'Country fact',
          flag: '🇯🇵',
          country: 'Japan',
          context: 'Japan has a 10% standard consumption tax rate, with an 8% reduced rate for some items.',
          question: 'Why can a consumption tax be regressive?',
          questionZh: '为什么消费税可能具有累退性？',
          answer: 'It can be regressive because lower-income households may spend a larger share of income on taxed consumption.',
          zh: '日本的消费税标准税率为10%，部分项目适用8%的较低税率。如果低收入家庭把更大比例的收入用于消费，消费税可能具有累退性。',
          source: 'Source: Japan National Tax Agency consumption tax rate table; regressive effect is classroom inference.',
          visual: photos.shopping,
        },
    {
          type: 'fact',
          eyebrow: 'Country fact',
          flag: '🇭🇺',
          country: 'Hungary',
          context: 'Hungary sets personal income tax at 15% in 2026.',
          question: 'Why is this an example of proportional taxation?',
          questionZh: '为什么这是比例税的例子？',
          answer: 'It is proportional because the same percentage tax rate is applied to income.',
          zh: '匈牙利在2026年将个人所得税税率设为15%。对收入使用单一百分比税率体现了比例税，虽然高收入者缴纳的总金额更多。',
          source: 'Source: Hungarian National Tax and Customs Administration, short summary on private-person taxation in 2026.',
          visual: photos.taxForms,
        },
    {
          type: 'cards',
          eyebrow: 'Learn',
          title:   'Progressive, regressive and proportional taxes',
          showTitle: false,
          cards: [
            {
              title: 'Progressive tax',
              definition: 'A progressive tax takes a higher proportion of income as income rises.',
              definitionZh: '累进税随着收入增加而征收更高比例的收入。',
              examples: [
                ['Income tax', 'higher income bands pay higher tax rates'],
                ['Effect', 'often used to reduce inequality'],
              ],
            },
            {
              title: 'Regressive tax',
              definition: 'A regressive tax takes a higher proportion of income from lower-income households.',
              definitionZh: '累退税从低收入家庭征收更高比例的收入。',
              examples: [
                ['Sales tax', 'can take a larger share of a poorer household income'],
                ['Effect', 'may increase inequality'],
              ],
            },
            {
              title: 'Proportional tax',
              definition: 'A proportional tax takes the same proportion of income at all income levels, even though higher earners pay more money in total.',
              definitionZh: '比例税在所有收入水平上征收相同比例的收入，虽然高收入者缴纳的总金额更多。',
              examples: [
                ['Low income', '10% of $20,000 = $2,000'],
                ['High income', '10% of $80,000 = $8,000'],
                ['Key point', 'same percentage, different amount'],
              ],
            },
          ],
          footer: 'Key point: compare the percentage of income paid, not just the amount of money paid.',
          partialReview: ['.cardgrid > .card', '.prompt'],
        },
    {
          type: 'quiz',
          eyebrow: 'Check',
          question: 'A low-income worker pays 10% of income in tax. A high-income worker pays 25% of income in tax. What type of tax is this?',
          choices: [
            'Progressive tax',
            'Regressive tax',
            'Proportional tax',
          ],
          answer: 0,
          prompt: 'Explain using the phrase "higher proportion of income".',
          visual: photos.taxForms,
        },
    {
          type: 'quiz',
          eyebrow: 'Check',
          question: 'A tax takes 15% of income from every taxpayer. Higher earners pay more money in total, but the same percentage. What type of tax is this?',
          choices: [
            'Progressive tax',
            'Regressive tax',
            'Proportional tax',
          ],
          answer: 2,
          prompt: 'Why is "more money paid" not enough to prove a progressive tax?',
          visual: 'proportional',
        },
    {
          type: 'answer',
          eyebrow: 'Check',
          title:   'Classify the tax',
          mode:    'fillBlanks',
          steps: [
            ['1', 'Income tax with higher rates for higher income bands is usually __________.', 'progressive'],
            ['2', 'A single 15% income tax rate at all income levels is __________.', 'proportional'],
            ['3', 'A sales tax on basic goods can be __________ if poorer households spend a larger share of income.', 'regressive'],
          ],
          cue: 'Look at what happens to the percentage of income paid as income changes.',
        },
    {
          type: 'quiz',
          eyebrow: 'Check',
          question: 'Which tax is most likely to be progressive?',
          choices: [
            'Income tax with higher rates for higher income bands',
            'VAT charged at the same rate on most goods',
            'Sales tax added to basic necessities',
          ],
          answer: 0,
          prompt: 'Explain why this tax can reduce inequality.',
          visual: photos.socialSecurity,
        },
    {
          type: 'quiz',
          eyebrow: 'Check',
          question: 'Which tax is most likely to be regressive?',
          choices: [
            'Indirect tax on basic goods bought by most households',
            'Income tax with rising rates for higher incomes',
            'A flat 10% tax on all income',
          ],
          answer: 0,
          prompt: 'Use "lower-income households spend a larger share of income" in your explanation.',
          visual: photos.shopping,
        },
    {
          type: 'cards',
          eyebrow: 'Practice',
          title:   'Sort the examples',
          cards: [
            ['Progressive', 'higher income bands pay higher income tax rates'],
            ['Regressive', 'indirect tax on goods takes a larger share from poorer households'],
            ['Proportional', 'same percentage rate is charged at every income level'],
            ['Not enough information', 'one household pays more money in total'],
          ],
          footer: 'For each card, say what evidence proves the classification.',
          partialReview: ['.cardgrid > .card', '.prompt'],
        },
    {
          type: 'taxRateDiagramCompare',
          eyebrow: 'Diagram',
          title:   'Tax rate diagrams',
          lead:    'Income taxed is on the x-axis. Tax rate is on the y-axis.',
          diagrams: [
            {
              mode: 'progressive',
              title: 'Progressive tax',
              zhTitle: '累进税',
              note: 'As income taxed rises, the tax rate rises.',
            },
            {
              mode: 'regressive',
              title: 'Regressive tax',
              zhTitle: '累退税',
              note: 'As income taxed rises, the tax rate falls.',
            },
            {
              mode: 'proportional',
              title: 'Proportional tax',
              zhTitle: '比例税',
              note: 'The same tax rate applies at every income level.',
            },
          ],
          prompt: 'The slope shows what happens to the percentage rate as income taxed increases.',
          partialReview: ['.taxRateDiagramCard', '.prompt'],
        },
    {
          type: 'quiz',
          eyebrow: 'Check',
          question: 'On a tax-rate diagram, the line slopes downward as income taxed rises. Which classification fits best?',
          choices: [
            'Progressive, because the rate rises with income',
            'Regressive, because the rate falls as income rises',
            'Proportional, because the rate stays constant',
          ],
          answer: 1,
          prompt: 'State what happens to the percentage tax rate.',
          visual: 'regressive',
        },
    {
          type: 'quiz',
          eyebrow: 'Check',
          question: 'A tax-rate diagram shows a flat horizontal line. What does this mean?',
          choices: [
            'The same percentage tax rate applies at all income levels',
            'High-income groups always pay a lower tax rate',
            'Low-income groups always pay no tax',
          ],
          answer: 0,
          prompt: 'Name the tax structure and explain the diagram.',
          visual: 'proportional',
        },
    {
          type: 'taxSim',
          eyebrow: 'Explore',
          title:   'Progressive or regressive?',
          defaultMode: 'progressive',
        },
    {
          type: 'chinaIncomeTaxSim',
          eyebrow: 'Example',
          title:   'Mainland China income tax',
          defaultIncome: 240000,
          standardDeduction: 60000,
          presets: [96000, 180000, 360000, 720000, 1200000],
          source: 'Resident comprehensive income; simplified classroom estimate. Sources: STA Individual Income Tax Law; PwC Worldwide Tax Summaries.',
        },
    {
          type: 'discussion',
          eyebrow: 'Explore',
          title:   'At the checkout',
          question: 'Is a tax added to prices fair if poorer households spend most of their income?',
          zh: '如果较贫困家庭会花掉大部分收入，加在价格上的税公平吗？',
          answer: 'It may be unfair because poorer households can pay a higher share of their income through indirect taxes.',
          answerZh: '这可能不公平，因为较贫困家庭可能把更高比例的收入用于缴纳间接税。',
          visual: photos.shopping,
        },
    {
          type: 'indirectTaxSim',
          eyebrow: 'Explore',
          title:   'Why indirect taxes can be regressive',
          taxRate: 10,
        },
    {
          type: 'flow',
          eyebrow: 'Example',
          title:   'Sales tax can be regressive',
          zhTitle: '销售税可能具有累退性',
          question: 'A sales tax is charged on basic goods bought by most households.',
          nodes: [['basic goods are taxed', 'poorer households spend a larger share of income', 'tax takes a higher proportion from poorer households', 'regressive tax']],
          footer: 'Key explanation: classification depends on the share of income paid, not just the cash amount paid.',
          visual: photos.shopping,
          partialReview: ['.flowRow > .flowChip', '.prompt'],
        },
    {
          type: 'quiz',
          eyebrow: 'Check',
          question: 'A student says: "A sales tax cannot be regressive because the same rate is charged at the checkout." What is the best correction?',
          choices: [
            'Compare the tax as a share of income, not only the tax rate on the product',
            'A tax is regressive only if high-income households pay more money',
            'Sales taxes are always proportional because shops use the same rate',
          ],
          answer: 0,
          prompt: 'Use the words "share of income" in your correction.',
          visual: photos.shopping,
        },
    {
          type: 'answer',
          eyebrow: 'Check',
          title:   'Explain the classification',
          mode:    'fillBlanks',
          steps: [
            ['1', 'A progressive income tax can reduce inequality because higher-income groups pay a higher __________ of income.', 'proportion'],
            ['2', 'An indirect tax can be regressive because poorer households spend a larger share of income on __________.', 'goods and services'],
            ['3', 'A proportional tax is not progressive because the __________ stays the same at all income levels.', 'percentage'],
          ],
          cue: 'Each answer must link the tax type to the proportion of income paid.',
        },
    {
          type: 'answer',
          eyebrow: 'Check',
          title:   'Fill in the blanks',
          mode:    'fillBlanks',
          steps: [
            ['1', 'A progressive tax takes a higher proportion as income __________.', 'rises'],
            ['2', 'A regressive tax takes a higher proportion from __________-income households.', 'lower'],
            ['3', 'A proportional tax charges the same __________ at all income levels.', 'percentage'],
            ['4', 'An indirect tax can be regressive if poorer households spend a larger share of their __________.', 'income'],
          ],
        },
    {
          type: 'section',
          eyebrow: 'New section',
          title:   'Classify and explain',
          zhTitle: '分类并解释',
        },
    {
          type: 'quiz',
          eyebrow: 'Check',
          question: 'A government charges a percentage tax on company profits and uses the revenue to fund schools.',
          choices: [
            'Direct tax and corporation tax',
            'Indirect tax on spending',
            'Tariff and regressive tax',
          ],
          answer: 0,
          prompt: 'Add one possible effect on firms.',
          visual: photos.industry,
        },
    {
          type: 'answer',
          eyebrow: 'Check',
          title:   'Exit ticket',
          zhTitle: '离堂小测',
          mode:    'fillBlanks',
          steps: [
            ['1', 'A direct tax is paid on income, profit or __________.', 'wealth'],
            ['2', 'An indirect tax is paid when goods and services are __________.', 'bought'],
            ['3', 'A tariff is a tax on __________.', 'imports'],
            ['4', 'A progressive tax takes a higher __________ as income rises.', 'proportion'],
          ],
          cue: 'Answer before moving from taxation to wider fiscal policy.',
        },

  ],
};
