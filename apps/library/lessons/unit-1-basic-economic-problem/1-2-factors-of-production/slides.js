/* Sources:
   Syllabus 2027-2029: ../../../references/igcse-economics-syllabus-2027-2029.md (1.2.1)
   Definitions 2026: ../../../references/igcse-economics-definitions-2026.md (Factor of production; Land; Labour; Capital; Enterprise)
   Paper 2 archive: ../../../references/paper-2-mark-schemes-2023-2025/1-basic-economic-problem.md
   Key Paper 2 entries: 2023ON-22 Q2(a), 2025FM-22 Q3(a), 2025MJ-21 Q3(a), 2025MJ-22 Q1(b)
*/
window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.factorsOfProduction;

const enterprisePhotoSource = {
  label: 'Enterprise photograph',
  ref: 'Steve Jobs at Macworld, 9 January 2007 — JD Lasica',
  note: 'https://commons.wikimedia.org/wiki/File:Steve_Jobs_(352583119).jpg — CC BY 2.0: https://creativecommons.org/licenses/by/2.0/ — original file; displayed with a centre crop.',
};

const syllabusSource = {
  label: 'Syllabus source',
  ref: 'Syllabus 1.2.1',
  note: 'The four factors of production are land, labour, capital and enterprise. Their rewards are rent, wages, interest and profit.',
};

const definitionsSource = {
  label: 'Definition source',
  ref: 'Definitions 2026: Factors of production',
  note: 'Exam-ready meanings for factor of production, land, labour, capital and enterprise.',
};

const factorDefinitionSource = {
  label: 'Paper 2 source',
  ref: '2025FM-22 Q3(a)',
  note: 'Direct 2-mark definition of factor of production.',
  question: 'Define factor of production.',
  extract: 'MS basis: a resource or input used to produce goods and services or used in the production process.',
};

const capitalGoodSource = {
  label: 'Paper 2 source',
  ref: '2023ON-22 Q2(a)',
  note: 'Direct 2-mark definition with an example of a capital good.',
  question: 'Define, with an example, a capital good.',
  extract: 'MS basis: a good used to produce another good or service, for example a machine.',
};

const rewardsSource = {
  label: 'Paper 2 source',
  ref: '2025MJ-21 Q3(a)',
  note: 'Direct identification of the rewards to capital and land.',
  question: 'Identify the rewards to capital and land.',
  extract: 'MS basis: interest and rent.',
};

const landExamplesSource = {
  label: 'Paper 2 source',
  ref: '2025MJ-22 Q1(b)',
  note: 'Accepted examples of land include beaches, coral reefs, marine life, rainforests and soil.',
  question: 'Identify two examples of the factor of production land in St. Kitts and Nevis.',
};

IGCSE.lesson = {
  meta: {
    code: '1.2.1',
    unit: 'Unit 1 - The basic economic problem',
    title: '1.2.1 Factors of production and rewards - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Lesson 2: Factors of production and rewards',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      type: 'hero',
      eyebrow: 'Overview',
      title: '1.2.1 Factors of production and rewards',
      zhTitle: '生产要素及其报酬',
      kicker: 'What does it take to produce one loaf of bread?',
      visual: photos.bakeryProductionTeam,
    },
    {
      type: 'peerTask',
      taskType: 'definitionRecall',
      eyebrow: 'Recall',
      title: 'Recall last lesson',
      prompt: 'On paper, write one precise sentence for each term.',
      stepsLabel: 'Write these definitions',
      definitionItems: [
        {
          label: '1',
          term: 'Want',
          answer: 'A good, service or experience that a person would like to have or use.',
        },
        {
          label: '2',
          term: 'Scarcity',
          answer: 'A situation where infinite wants exceed the finite resources available to satisfy them.',
        },
        {
          label: '3',
          term: 'Factor of production',
          answer: 'A resource or input used to produce goods and services.',
        },
      ],
      sharePrompt: 'Compare your definitions with a partner before revealing the model answers.',
    },
    {
      type: 'discussion',
      eyebrow: 'Starter',
      title: 'What must the bakery bring together?',
      question: 'From the photograph, identify one natural input, one person, one human-made item and one person who might organise the business.',
      zh: '从照片中找出一种自然投入、一个劳动者、一件人造物品，以及一位可能负责组织经营的人。',
      answer: 'For example: wheat or water; a baker; an oven or tray; and the bakery owner or manager.',
      answerZh: '例如：小麦或水；面包师；烤炉或烤盘；以及面包店老板或经理。',
      visual: { ...photos.bakeryProductionTeam, caption: '', credit: '' },
    },
    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Define a factor of production and identify land, labour, capital and enterprise.',
        'Distinguish the four factors using familiar and unfamiliar examples.',
        'Match each factor of production with its reward.',
      ],
      zhBullets: [
        '定义生产要素，并识别土地、劳动、资本和企业家才能。',
        '使用熟悉和陌生的例子区分四种生产要素。',
        '将每种生产要素与其报酬正确配对。',
      ],
    },
    {
      type: 'section',
      eyebrow: 'Part 1',
      title: 'The four factors of production',
      zhTitle: '四种生产要素',
    },
    {
      type: 'visualPause',
      title: 'Bread needs several kinds of productive resource.',
      visual: photos.bakeryProductionTeam,
      notes: 'Ask students to point to resources in the image before naming any category. Add wheat, water and the business organiser when students cannot see them directly.',
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      definitionCue: 'Key term',
      title: 'Factor of production',
      zhTitle: '生产要素',
      term: 'factor of production',
      definition: 'A factor of production is a resource or input used to produce goods and services.',
      definitionZh: '生产要素是用于生产商品和服务的资源或投入。',
      keyTerms: [
        { term: 'resource or input', zh: '资源或投入', note: 'something used in the production process' },
        { term: 'produce goods and services', zh: '生产商品和服务', note: 'the purpose for which the input is used' },
      ],
      showExamples: false,
      sources: [definitionsSource, factorDefinitionSource],
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'Four different kinds of productive resource',
      cardStyle: 'compactVisual',
      partialReview: true,
      cards: [
        {
          title: 'Land',
          zhTitle: '土地',
          body: 'Natural resources used in production.',
          visual: photos.landWheatField,
        },
        {
          title: 'Labour',
          zhTitle: '劳动',
          body: 'Human effort or workers used in production.',
          visual: photos.labourBakerKneading,
        },
        {
          title: 'Capital',
          zhTitle: '资本',
          body: 'Human-made goods used in production.',
          visual: photos.capitalIndustrialMachine,
        },
        {
          title: 'Enterprise',
          zhTitle: '企业家才能',
          body: 'Organises the other factors and takes risks. Example: Steve Jobs at Apple.',
          visual: photos.enterpriseSteveJobs,
        },
      ],
      notes: 'Use Steve Jobs and Apple to explain enterprise: the business must bring together materials (land), engineers and other workers (labour), and equipment (capital). Product decisions commit resources before customer demand is certain. Ask which part of this is organisation and which part is risk-taking.',
      sources: [syllabusSource, definitionsSource, enterprisePhotoSource],
    },
    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'Classify the bakery inputs',
      zhTitle: '给面包店的投入分类',
      prompt: 'Place each input in the correct factor-of-production category.',
      zhPrompt: '把每项投入归入正确的生产要素类别。',
      categories: [
        { title: 'Land', zhTitle: '土地', clue: 'provided by nature' },
        { title: 'Labour', zhTitle: '劳动', clue: 'human effort' },
        { title: 'Capital', zhTitle: '资本', clue: 'human-made aid to production' },
        { title: 'Enterprise', zhTitle: '企业家才能', clue: 'organises and takes risks' },
      ],
      items: [
        { label: 'A', text: 'Wheat and water used to make bread', answer: 'Land', reason: 'They are natural resources used in production.' },
        { label: 'B', text: 'The bakers’ time, skill and effort', answer: 'Labour', reason: 'They are human effort used in production.' },
        { label: 'C', text: 'The oven, trays and mixing machine', answer: 'Capital', reason: 'They are human-made goods used to produce bread.' },
        { label: 'D', text: 'The owner who decides what to sell and risks money', answer: 'Enterprise', reason: 'The owner organises the factors and takes risks.' },
      ],
      sharePrompt: 'Choose one item and justify the category using the definition.',
      sources: [syllabusSource, definitionsSource],
    },
    {
      type: 'section',
      eyebrow: 'Part 2',
      title: 'Land, labour and capital',
      zhTitle: '土地、劳动与资本',
    },
    {
      type: 'visualPause',
      title: 'Land includes resources that grow in nature.',
      visual: photos.landWheatField,
      notes: 'Ask what part of this scene is used to produce bread. Draw out soil, water and wheat before showing the definition.',
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      definitionCue: 'Factor 1',
      title: 'Land',
      zhTitle: '土地',
      term: 'land',
      definition: 'Land means the natural resources used in production.',
      definitionZh: '土地是指用于生产的自然资源。',
      keyTerms: [
        { term: 'natural resources', zh: '自然资源', note: 'resources provided by nature rather than made by people' },
      ],
      examples: [
        ['Examples', 'soil, water, forests, fish, minerals and sunlight'],
      ],
      showExamples: true,
      sources: [definitionsSource, landExamplesSource],
    },
    {
      type: 'visualPause',
      title: 'The sea, reefs and fish are also land.',
      visual: photos.landCoralReef,
      notes: 'Ask: Is this land even though it is underwater? Use the economic definition: land includes all natural resources used in production.',
    },
    {
      type: 'yesNoCheck',
      eyebrow: 'Check',
      title: 'Land: Yes or No?',
      zhTitle: '土地：是或否？',
      prompt: 'Read every statement. Decide Yes or No for each, then reveal one answer at a time.',
      items: [
        {
          statement: 'Fish caught from the sea can be an example of land.',
          answer: true,
          reason: 'Fish are a natural resource used in production.',
        },
        {
          statement: 'A factory building is land because it stands on the ground.',
          answer: false,
          reason: 'The site is land, but the human-made building is capital.',
        },
        {
          statement: 'Land includes only farmland.',
          answer: false,
          reason: 'Land includes all natural resources used in production, including water, forests, fish and minerals.',
        },
      ],
      sources: [definitionsSource, landExamplesSource],
    },
    {
      type: 'visualPause',
      title: 'Labour is the human contribution to production.',
      visual: photos.labourBakerKneading,
      notes: 'Ask students to distinguish the worker from the effort and skill being supplied. Labour is the human effort used in production.',
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      definitionCue: 'Factor 2',
      title: 'Labour',
      zhTitle: '劳动',
      term: 'labour',
      definition: 'Labour is the human effort or workers used in production.',
      definitionZh: '劳动是用于生产的人类努力或劳动者。',
      keyTerms: [
        { term: 'human effort', zh: '人力或劳动', note: 'physical or mental work contributed to production' },
      ],
      examples: [
        ['Examples', 'a baker kneading dough, a nurse caring for a patient, a teacher explaining a concept'],
      ],
      showExamples: true,
      sources: [definitionsSource],
    },
    {
      type: 'visualPause',
      title: 'Capital is made by people to help production.',
      visual: photos.capitalIndustrialMachine,
      notes: 'Ask what the machine is used to do. Establish that it is human-made and used for production.',
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      definitionCue: 'Factor 3',
      title: 'Capital',
      zhTitle: '资本',
      term: 'capital',
      definition: 'Capital means human-made goods used in production.',
      definitionZh: '资本是指用于生产的人造物品。',
      keyTerms: [
        { term: 'human-made goods', zh: '人造物品', note: 'produced by people rather than provided by nature' },
        { term: 'used in production', zh: '用于生产', note: 'helps to make another good or service' },
      ],
      examples: [
        ['Examples', 'machines, tools, factory buildings, delivery vans and computers used by firms'],
      ],
      showExamples: true,
      sources: [definitionsSource, capitalGoodSource],
    },
    {
      type: 'quiz',
      eyebrow: 'Check',
      question: 'Which item is capital?',
      choices: [
        'A delivery van used by a bakery',
        'The baker’s savings',
        'The baker’s physical effort',
        'Wheat growing in a field',
      ],
      answer: 0,
      prompt: 'Explain why money is not capital in this definition.',
      visual: 'industry',
      sources: [definitionsSource, capitalGoodSource],
    },
    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'Land, labour or capital?',
      zhTitle: '土地、劳动还是资本？',
      prompt: 'Classify each new example using the exact definitions.',
      zhPrompt: '使用准确的定义给每个新例子分类。',
      categories: [
        { title: 'Land', zhTitle: '土地', clue: 'natural resource' },
        { title: 'Labour', zhTitle: '劳动', clue: 'human effort' },
        { title: 'Capital', zhTitle: '资本', clue: 'human-made production good' },
      ],
      items: [
        { label: 'A', text: 'Sunlight used by a solar farm', answer: 'Land', reason: 'Sunlight is a natural resource.' },
        { label: 'B', text: 'A nurse caring for a patient', answer: 'Labour', reason: 'The nurse supplies human effort and skill.' },
        { label: 'C', text: 'A sewing machine used in a clothing factory', answer: 'Capital', reason: 'It is a human-made good used in production.' },
        { label: 'D', text: 'Iron ore taken from the ground', answer: 'Land', reason: 'It is a natural resource.' },
        { label: 'E', text: 'A teacher planning a lesson', answer: 'Labour', reason: 'The teacher supplies mental effort and skill.' },
        { label: 'F', text: 'A computer used to manage shop orders', answer: 'Capital', reason: 'It is a human-made good used to provide a service.' },
      ],
      sharePrompt: 'For one item, begin your explanation with the words “It is…” and quote the defining feature.',
      sources: [definitionsSource],
    },
    {
      type: 'section',
      eyebrow: 'Part 3',
      title: 'Enterprise and factor rewards',
      zhTitle: '企业家才能与要素报酬',
    },
    {
      type: 'visualPause',
      title: 'Someone must organise the business and take the risk.',
      visual: photos.enterpriseSteveJobs,
      notes: 'Identify Steve Jobs at Apple. Ask: what had to be organised before a new product could be sold? Draw out materials, workers and equipment, then explain that resources are committed before customer demand is certain. This leads into enterprise as organisation and risk-taking.',
      sources: [enterprisePhotoSource],
    },
    {
      type: 'term',
      eyebrow: 'Learn',
      definitionCue: 'Factor 4',
      title: 'Enterprise and entrepreneur',
      zhTitle: '企业家才能与企业家',
      term: 'enterprise',
      definition: 'Enterprise is the factor that organises the other factors of production and takes risks. An entrepreneur runs or owns a business and is willing to take risks.',
      definitionZh: '企业家才能是组织其他生产要素并承担风险的要素。企业家经营或拥有企业，并愿意承担风险。',
      keyTerms: [
        { term: 'organises', zh: '组织', note: 'brings land, labour and capital together' },
        { term: 'takes risks', zh: '承担风险', note: 'may lose money if the business is unsuccessful' },
        { term: 'entrepreneur', zh: '企业家', note: 'the person who supplies enterprise' },
      ],
      showExamples: false,
      sources: [definitionsSource],
    },
    {
      type: 'discussion',
      eyebrow: 'Discuss',
      title: 'Where is the risk?',
      question: 'Think of Steve Jobs at Apple. Launching a new product means paying for design, equipment and workers before knowing how many customers will buy it. What happens if sales revenue is too low?',
      zh: '以史蒂夫·乔布斯和苹果公司为例。推出新产品需要先支付设计、设备和员工的费用，而顾客会购买多少还不确定。如果销售收入太低，会发生什么？',
      answer: 'Sales revenue may not cover the costs, so the business may make a loss. Committing resources before demand is known involves business risk.',
      answerZh: '销售收入可能无法弥补成本，企业就可能亏损。在需求尚不确定时投入资源，就要承担经营风险。',
      visual: { ...photos.enterpriseSteveJobs, caption: '', credit: '' },
      sources: [enterprisePhotoSource],
    },
    {
      type: 'cards',
      eyebrow: 'Learn',
      title: 'Each factor receives a different reward',
      cardStyle: 'compactVisual',
      partialReview: true,
      cards: [
        {
          title: 'Land',
          zhTitle: '土地',
          body: 'Reward: rent. Received for supplying land or natural resources.',
          highlightTerms: ['rent'],
          visual: photos.landWheatField,
        },
        {
          title: 'Labour',
          zhTitle: '劳动',
          body: 'Reward: wages or salaries. Workers receive them for supplying human effort.',
          highlightTerms: ['wages or salaries'],
          visual: photos.labourBakerKneading,
        },
        {
          title: 'Capital',
          zhTitle: '资本',
          body: 'Reward: interest. Received for supplying capital.',
          highlightTerms: ['interest'],
          visual: photos.capitalIndustrialMachine,
        },
        {
          title: 'Enterprise',
          zhTitle: '企业家才能',
          body: 'Reward: profit. Organisation and risk-taking — Steve Jobs at Apple.',
          highlightTerms: ['profit'],
          visual: photos.enterpriseSteveJobs,
        },
      ],
      notes: 'Return to Steve Jobs and Apple as the example of enterprise. Ask: why is profit uncertain when a business launches a new product? Draw out that resources are committed before sales are known; revenue may fail to cover costs.',
      sources: [syllabusSource, definitionsSource, rewardsSource, enterprisePhotoSource],
    },
    {
      type: 'yesNoCheck',
      eyebrow: 'Check',
      title: 'Factors and rewards: Yes or No?',
      zhTitle: '生产要素与报酬：是或否？',
      prompt: 'Read every statement. Decide Yes or No for each, then reveal one answer at a time.',
      items: [
        {
          statement: 'The reward for labour is wages or salaries.',
          answer: true,
          reason: 'Workers receive wages or salaries for supplying human effort.',
        },
        {
          statement: 'The reward for capital is profit.',
          answer: false,
          reason: 'Capital receives interest; enterprise receives profit.',
        },
        {
          statement: 'The reward for land is rent.',
          answer: true,
          reason: 'Rent is paid for the use of land or natural resources.',
        },
        {
          statement: 'The reward for enterprise is profit.',
          answer: true,
          reason: 'Profit rewards the entrepreneur for organising the factors and taking risks.',
        },
      ],
      sources: [syllabusSource, rewardsSource],
    },
    {
      type: 'classificationTask',
      eyebrow: 'Review',
      title: 'A bicycle factory uses all four factors',
      zhTitle: '自行车厂使用四种生产要素',
      prompt: 'Classify each input, then state its reward where one is named.',
      zhPrompt: '给每项投入分类，并在适用时说出其报酬。',
      categories: [
        { title: 'Land', zhTitle: '土地', clue: 'reward: rent' },
        { title: 'Labour', zhTitle: '劳动', clue: 'reward: wages' },
        { title: 'Capital', zhTitle: '资本', clue: 'reward: interest' },
        { title: 'Enterprise', zhTitle: '企业家才能', clue: 'reward: profit' },
      ],
      items: [
        { label: 'A', text: 'Metal ore used to make the bicycle frames', answer: 'Land', reason: 'Metal ore is a natural resource. The reward to land is rent.' },
        { label: 'B', text: 'Workers assembling and testing bicycles', answer: 'Labour', reason: 'The workers supply human effort. Their reward is wages.' },
        { label: 'C', text: 'Machines that cut and shape the frames', answer: 'Capital', reason: 'The machines are human-made goods used in production. The reward to capital is interest.' },
        { label: 'D', text: 'The owner who coordinates production and risks money', answer: 'Enterprise', reason: 'The owner organises the other factors and takes risks. The reward is profit.' },
      ],
      sharePrompt: 'Explain one answer without using the category name until the final word.',
      sources: [syllabusSource, definitionsSource],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Define factor of production. [2]',
      keywordLabel: 'Include both marking points',
      keywords: ['resource or input', 'used to produce', 'goods and services'],
      prompt: 'Write one precise sentence. Examples alone do not answer the question.',
      sources: [definitionsSource, factorDefinitionSource],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Define factor of production. [2]',
      answer: 'A factor of production is a resource or input used to produce goods and services.',
      links: ['resource or input', 'used to produce goods and services'],
      showLinkChips: false,
      partialReview: ['.modelAnswerCard'],
      sources: [definitionsSource, factorDefinitionSource],
    },
    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Define, with an example, a capital good. [2]',
      keywordLabel: 'One definition point and one example',
      keywords: ['human-made good', 'used in production', 'machine'],
      prompt: 'Write the definition first, then give one clear example.',
      sources: [definitionsSource, capitalGoodSource],
    },
    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Define, with an example, a capital good. [2]',
      answer: 'A capital good is a human-made good used to produce another good or service, for example a machine used in a factory.',
      links: ['human-made good', 'used to produce another good or service', 'machine'],
      showLinkChips: false,
      partialReview: ['.modelAnswerCard'],
      sources: [definitionsSource, capitalGoodSource],
    },
    {
      type: 'answer',
      eyebrow: 'Check',
      title: 'Exit ticket',
      zhTitle: '离堂小测',
      mode: 'fillBlanks',
      steps: [
        ['1', 'Natural resources used in production are called __________.', 'land'],
        ['2', 'Human effort used in production is called __________.', 'labour'],
        ['3', 'Human-made goods used in production are called __________.', 'capital'],
        ['4', 'The factor that organises the others and takes risks is __________.', 'enterprise'],
        ['5', 'Land, labour, capital and enterprise receive rent, wages, __________ and profit.', 'interest'],
      ],
      sources: [syllabusSource, definitionsSource, rewardsSource],
    },
  ],
};
