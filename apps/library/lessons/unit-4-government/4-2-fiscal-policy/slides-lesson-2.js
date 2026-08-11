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
    title:        'Fiscal policy lesson 2: taxation foundations - Cambridge IGCSE Economics 0455',
    lessonLabel:  'Fiscal policy lesson 2',
    courseLabel:  'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
          type: 'hero',
          eyebrow:  'Lesson overview',
          title:    'Taxation',
      zhTitle: '税收',
          subtitle: 'Fiscal policy lesson 2',
          kicker:   'Why do governments tax, and how can taxes be classified?',
          visual:   photos.shopping,
        },
    {
          type: 'discussion',
          eyebrow: 'Starter',
          title:   'Every receipt is a policy choice',
          question: 'When you buy something in a shop, which taxes might be hidden in the final price?',
          zh: '当你在商店买东西时，最终价格里可能隐藏着哪些税？',
          answer: 'Indirect taxes such as VAT, sales tax, excise duty or tariffs may be included in the final price.',
          answerZh: '最终价格中可能包含增值税、销售税、消费税或关税等间接税。',
          visual: photos.shopping,
        },
    {
          type: 'outcomes',
          eyebrow: 'Objectives',
          title:   'By the end, you can',
          bullets: [
            'Explain reasons for taxation.',
            'Distinguish between direct and indirect tax.',
            'Use real examples of direct and indirect taxes.',
          ],
          zhBullets: [
            '解释征税的原因。',
            '区分直接税和间接税。',
            '使用直接税和间接税的现实例子。',
          ],
    },
    {
          type: 'section',
          eyebrow: 'New section',
          title:   'Why governments tax',
          zhTitle: '政府征税的原因',
        },
        {
      type: 'visualPause',
      title: 'Visual pause: Denmark',
      visual: factPhotos.denmarkTax,
      notes: 'Example: Denmark / China. Former fact context: Denmark’s tax revenue was 45.2% of GDP in 2024. | China’s tax revenue was 20.4% of GDP in 2023. Teacher question: How does tax revenue help finance government spending? Possible answer: Tax revenue gives the government funds to pay for public services, transfers and investment. Source: Source: OECD Revenue Statistics 2025. | Source: OECD Revenue Statistics in Asia and the Pacific 2025.',
    },
    {
          type: 'flow',
          mode: 'fillBlanks',
          eyebrow: 'Learn',
          title:   '1. Raise revenue',
          zhTitle: '增加财政收入',
          nodes: [
        [
          { text: 'government charges __________', answer: 'taxes', zh: '中文提示： government charges taxes' },
          { text: 'revenue __________', answer: 'rises', zh: '中文提示： revenue rises' },
          { text: 'public services can be __________', answer: 'funded', zh: 'public services can be funded' },
        ]
      ],
    },
    {
          type: 'flow',
          mode: 'fillBlanks',
          eyebrow: 'Learn',
          title:   '2. Reduce demerit goods',
          zhTitle: '减少有害品',
          nodes: [
        [
          { text: 'tax on __________', answer: 'cigarettes', zh: '中文提示： tax on cigarettes' },
          { text: 'price __________', answer: 'rises', zh: '价格上升' },
          { text: 'quantity demanded may __________', answer: 'fall', zh: '中文提示： quantity demanded may fall' },
          { text: 'health costs may __________', answer: 'fall', zh: '中文提示： health costs may fall' },
        ]
      ],
    },
        {
      type: 'visualPause',
      title: 'Visual pause: Australia',
      visual: factPhotos.philippinesTobacco,
      notes: 'Example: Australia / China. Former fact context: Australia charged AUD 1.40312 excise tax per cigarette in March 2025. | China uses excise taxes on cigarettes, including production and wholesale taxes. Teacher question: How could a cigarette tax reduce consumption of a demerit good? Possible answer: Education can be under-consumed because people may underestimate its private and external benefits. Source: Source: Australian Taxation Office. | Source: China consumption tax rate table.',
    },
    {
          type: 'flow',
          mode: 'fillBlanks',
          eyebrow: 'Learn',
          title:   '3. Reduce imports',
          zhTitle: '减少进口',
          nodes: [
        [
          { text: 'tariff on __________', answer: 'imports', zh: '中文提示： tariff on imports' },
          { text: 'import prices __________', answer: 'rise', zh: '中文提示： import prices rise' },
          { text: 'consumers may buy fewer __________', answer: 'imports', zh: '中文提示： consumers may buy fewer imports' },
          { text: 'domestic firms may sell __________', answer: 'more', zh: '中文提示： domestic firms may sell more' },
        ]
      ],
    },
    {
          type: 'quiz',
          eyebrow: 'Check',
          question: 'A government increases tax on alcohol. Which reason for taxation is most direct?',
          choices: [
            'Raise revenue only',
            'Reduce consumption of a demerit good',
            'Reduce imports',
          ],
          answer: 1,
          prompt: 'Add one reason why the effect may be limited.',
          visual: photos.tobacco,
        },
    {
          type: 'flow',
          mode: 'fillBlanks',
          eyebrow: 'Learn',
          title:   '4. Redistribute income',
          zhTitle: '收入再分配',
          nodes: [
        [
          { text: 'higher taxes on high __________', answer: 'incomes', zh: '中文提示： higher taxes on high incomes' },
          { text: 'government revenue __________', answer: 'rises', zh: '中文提示： government revenue rises' },
          { text: 'welfare can be __________', answer: 'funded', zh: '中文提示： welfare can be funded' },
          { text: 'inequality may __________', answer: 'fall', zh: '中文提示： inequality may fall' },
        ]
      ],
    },
    {
          type: 'flow',
          mode: 'fillBlanks',
          eyebrow: 'Learn',
          title:   '5. Influence demand',
          zhTitle: '影响需求',
          nodes: [
        [
          { text: 'higher income __________', answer: 'tax', zh: '中文提示： higher income tax' },
          { text: 'disposable income __________', answer: 'falls', zh: '中文提示： disposable income falls' },
          { text: 'consumer spending may __________', answer: 'fall', zh: '中文提示： consumer spending may fall' },
          { text: 'inflationary pressure may __________', answer: 'fall', zh: '中文提示： inflationary pressure may fall' },
        ]
      ],
    },
    {
          type: 'flow',
          mode: 'fillBlanks',
          eyebrow: 'Learn',
          title:   '6. Encourage environmental sustainability',
          zhTitle: '鼓励可持续发展',
          nodes: [
        [
          { text: 'pollution __________', answer: 'tax', zh: '中文提示： pollution tax' },
          { text: 'firms face higher costs for __________', answer: 'polluting', zh: '中文提示： firms face higher costs for polluting' },
          { text: 'cleaner methods become more __________', answer: 'attractive', zh: '中文提示： cleaner methods become more attractive' },
        ]
      ],
    },
    {
          type: 'quiz',
          eyebrow: 'Check',
          question: 'A pollution tax raises money and makes pollution more expensive. Which answer is strongest?',
          choices: [
            'It can raise revenue and encourage environmental sustainability',
            'It can only raise revenue',
            'It can only reduce imports',
          ],
          answer: 0,
          prompt: 'Explain why one tax can have more than one effect.',
          visual: photos.pollution,
        },
    {
          type: 'answer',
          eyebrow: 'Check',
          title:   'Fill in the blanks',
          mode:    'fillBlanks',
          steps: [
            ['1', 'Taxes raise government __________.', 'revenue'],
            ['2', 'A tax on cigarettes can reduce consumption of a __________ good.', 'demerit'],
            ['3', 'A tariff can reduce __________ by making them more expensive.', 'imports'],
            ['4', 'Higher taxes on high incomes can help __________ income.', 'redistribute'],
          ],
    },
    {
          type: 'section',
          eyebrow: 'New section',
          title:   'Direct and indirect\ntaxes',
          zhTitle: '直接税与间接税',
        },
    {
          type: 'discussion',
          eyebrow: 'Explore',
          title:   'Who should pay?',
          question: 'If the government needs more revenue for hospitals, should it raise income tax, VAT, corporation tax or a tax on unhealthy products?',
          zh: '如果政府需要更多收入来资助医院，应该提高所得税、增值税、公司税，还是对不健康产品征税？',
          answer: 'A strong answer chooses one tax and explains revenue, fairness, incentives and possible side effects.',
          answerZh: '好的回答应选择一种税，并解释收入、公平性、激励作用和可能的副作用。',
          visual: photos.healthcare,
        },
    {
          type: 'term',
          showExamples: false,
          eyebrow: 'Learn',
          title:   'Direct tax',
          zhTitle: '直接税',
          term:    'direct tax',          keyTerms: [
        { term: 'Direct tax', zh: '直接税', note: 'key economics term' },
      ],

          definition: 'A direct tax is a tax on income or wealth paid directly to government, such as income tax, corporation tax or wealth tax.',
          definitionZh: '直接税是对收入或财富征收、直接向政府缴纳的税，如所得税、公司税或财富税。',
          examples: [
            ['Income tax', 'tax on wages'],
            ['Corporation tax', 'tax on company profits'],
            ['Property tax', 'tax on land or buildings'],
          ],
    },
    {
          type: 'term',
          showExamples: false,
          eyebrow: 'Learn',
          title:   'Indirect tax',
          zhTitle: '间接税',
          term:    'indirect tax',          keyTerms: [
        { term: 'Indirect tax', zh: '间接税', note: 'key economics term' },
      ],

          definition: 'An indirect tax is a tax on spending / goods and services, such as VAT, sales tax, excise duties or tariffs.',
          definitionZh: '间接税是对支出、商品和服务征收的税，如增值税、销售税、消费税或关税。',
          examples: [
            ['VAT', 'added to many prices'],
            ['Sales tax', 'paid at checkout'],
            ['Excise tax', 'on goods such as fuel'],
          ],
    },
        {
      type: 'visualPause',
      title: 'Visual pause: United Kingdom',
      visual: factPhotos.ukSugar,
      notes: 'Example: United Kingdom / China. Former fact context: After the UK sugar levy, sugar in taxed soft drinks fell 46% from 2015 to 2020. | China has no national sugar-sweetened beverage excise tax in this international policy dataset. Teacher question: How could a tax change firms\' incentives and consumer choices? Possible answer: A tax can raise prices or encourage reformulation, so consumers buy less and firms reduce sugar content. Source: Source: HM Treasury and HMRC. | Source: World Bank Global SSB Tax Database.',
    },
    {
          type: 'compare',
          mode: 'fillBlanks',
          eyebrow: 'Learn',
          title:   'Two direct taxes',
          leftTitle: 'Income tax',
          left: [
        ['1', 'tax on wages, salaries or other personal __________', 'income'],
        ['2', 'rates may vary by income band or income __________', 'level'],
      ],
          rightTitle: 'Corporation tax',
          right: [
        ['1', 'tax on company __________', 'profits'],
      ],          visual: photos.industry,        },
    {
          type: 'discussion',
          eyebrow: 'Explore',
          title:   'Taxing company profits',
          question: 'If corporation tax rises, what might a firm do with prices, wages, investment or dividends?',
          zh: '如果公司税上升，企业可能会如何调整价格、工资、投资或股息？',
          answer: 'A firm may raise prices, limit wage growth, reduce investment, or pay lower dividends to shareholders.',
          answerZh: '企业可能提高价格、限制工资增长、减少投资，或向股东支付更低股息。',
          visual: photos.industry,
        },
    {
          type: 'compare',
          mode: 'fillBlanks',
          eyebrow: 'Learn',
          title:   'VAT, sales tax and other indirect taxes',
          leftTitle: 'VAT or sales tax',
          left: [
        ['1', 'indirect tax on __________', 'spending'],
        ['2', 'charged as a percentage of the selling __________', 'price'],
        ['3', 'real examples: VAT in the UK and EU; sales tax in many US __________', 'states'],
      ],
          rightTitle: 'Indirect tax on specific goods',
          right: [
        ['1', 'indirect tax on specific __________', 'goods'],
        ['2', 'often used on cigarettes, alcohol and __________', 'fuel'],
        ['3', 'aims can include revenue and reducing demerit __________', 'goods'],
      ],
          visual: photos.tobacco,        },
    {
          type: 'discussion',
          eyebrow: 'Explore',
          title:   'Taxing harmful goods',
          question: 'Why might governments tax cigarettes more heavily than bread?',
          zh: '为什么政府可能对香烟征收比面包更高的税？',
          answer: 'Cigarettes create health costs and are demerit goods, while bread is a basic necessity.',
          answerZh: '香烟会带来健康成本，属于有害品；面包则是基本必需品。',
          visual: photos.tobacco,
        },
    {
          type: 'flow',
          mode: 'fillBlanks',
          eyebrow: 'Example',
          title:   'Indirect tax on tobacco',
          zhTitle: '烟草间接税',
          question: 'Many governments put high indirect taxes on cigarettes.',
          nodes: [
        [
          { text: 'tax per packet __________', answer: 'rises', zh: '中文提示： tax per packet rises' },
          { text: 'retail price __________', answer: 'rises', zh: '中文提示： retail price rises' },
          { text: 'some smokers buy fewer __________', answer: 'cigarettes', zh: 'some smokers buy fewer cigarettes' },
          { text: 'health costs may __________', answer: 'fall', zh: '中文提示： health costs may fall' },
        ]
      ],
    },
    {
          type: 'term',
          showExamples: false,
          eyebrow: 'Learn',
          title:   'Import tariff',
          zhTitle: '进口关税',
          term:    'tariff',          keyTerms: [
        { term: 'Import tariff', zh: '进口关税', note: 'key economics term' },
      ],

          definition: 'A tariff is an indirect tax on imported goods. It raises the price of imports and may protect domestic producers.',
          definitionZh: '关税是对进口商品征收的间接税。它提高进口品价格，并可能保护国内生产者。',
          examples: [
            ['Imported cars', 'price rises'],
            ['Imported steel', 'domestic firms protected'],
            ['Imported clothing', 'consumer prices may rise'],
          ],
    },
    {
          type: 'discussion',
          eyebrow: 'Explore',
          title:   'At the port',
          question: 'If a tariff makes imported phones more expensive, who might gain and who might lose?',
          zh: '如果关税使进口手机更贵，谁可能受益，谁可能受损？',
          answer: 'Domestic producers and the government may gain, while consumers and foreign producers may lose.',
          answerZh: '国内生产者和政府可能受益，消费者和外国生产者可能受损。',
          visual: photos.port,
        },
        {
      type: 'visualPause',
      title: 'Visual pause: Sweden',
      visual: factPhotos.swedenCarbon,
      notes: 'Example: Sweden / China. Former fact context: Sweden introduced a carbon tax in 1991. | China started a national carbon market in 2021, covering power-sector emissions. Teacher question: How could a pollution charge or carbon market reduce external costs? Possible answer: The third party is people affected by pollution; they face health costs that are not fully paid by producers or consumers. Source: Source: Government Offices of Sweden. | Source: Gov.cn and MEE reporting.',
    },
    {
          type: 'discussion',
          eyebrow: 'Explore',
          title:   'The smoke stack',
          question: 'Should a factory pay tax for pollution if it provides jobs in the local area?',
          zh: '如果工厂为当地提供就业，它还应该为污染纳税吗？',
          answer: 'It may still be taxed because pollution creates external costs, but the tax should consider jobs and competitiveness.',
          answerZh: '它仍可能应纳税，因为污染产生外部成本，但税收也应考虑就业和竞争力。',
          visual: photos.pollution,
        },
    {
          type: 'answer',
          eyebrow: 'Check',
          title:   'Exit ticket',
          zhTitle: '\u79bb\u5802\u5c0f\u6d4b',
          mode:    'fillBlanks',
          steps: [
            ['1', 'A direct tax is paid directly by the __________ to the government.', 'taxpayer'],
            ['2', 'An indirect tax is added to the __________ of a good or service.', 'price'],
            ['3', 'Corporation tax is a tax on company __________.', 'profits'],
            ['4', 'A tariff is an indirect tax on __________ goods.', 'imported'],
          ],
    },

  ],
};
