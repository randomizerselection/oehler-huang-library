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
  "code": "1.2.1",
  "unit": "Unit 1 - The basic economic problem",
  "title": "1.2.1 Factors of production - Cambridge IGCSE Economics 0455",
  "lessonLabel": "Factors of production · Lesson 1",
  "courseLabel": "Cambridge IGCSE Economics 0455",
  "creatorLabel": "Created by Samuel Oehler-Huang, Suzhou Foreign Language School",
  "deliveryPlan": {
    "previousEndpoint": "Land, labour or capital?",
    "coreEndSlide": 20,
    "nextSession": "Continue in lesson-2.html: Enterprise and factor rewards."
  }
},

  slides: [
    {
      id: '1-2-1-factors-of-production',
      type: 'hero',
      eyebrow: 'Overview',
      title: '1.2.1 Factors of production',
      zhTitle: '生产要素',
      kicker: 'Land, labour and capital',
      visual: photos.bakeryProductionTeam,
    },
    {
      id: 'slide',
      "type": "classificationTask",
      "layout": "factor-written",
      "eyebrow": "Recall",
      "title": "Recall last lesson",
      "items": [
        {
          "text": "Define want.",
          "answer": "A good, service or experience that a person would like to have or use."
        },
        {
          "text": "Define scarcity.",
          "answer": "A situation where infinite wants exceed the finite resources available to satisfy them."
        },
        {
          "text": "Define factor of production.",
          "answer": "A resource or input used to produce goods and services."
        }
      ],
      "sharePrompt": "Write your answers first. Reveal each model separately."
    },
    {
      id: 'what-must-the-bakery-bring-together',
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
      id: 'slide-2',
      "type": "outcomes",
      "eyebrow": "Objectives",
      "title": "By the end, you can",
      "bullets": [
        "Define a factor of production.",
        "Identify land, labour and capital.",
        "Justify classifications using precise definitions."
      ],
      "zhBullets": [
        "定义生产要素。",
        "识别土地、劳动与资本。",
        "用准确的定义解释分类。"
      ]
    },
    {
      id: 'the-four-factors-of-production',
      type: 'section',
      eyebrow: 'Part 1',
      title: 'The four factors of production',
      zhTitle: '四种生产要素',
    },
    {
      id: 'bread-needs-several-kinds-of-productive-resource',
      type: 'visualPause',
      title: 'Bread needs several kinds of productive resource.',
      visual: photos.bakeryProductionTeam,
      notes: 'Ask students to point to resources in the image before naming any category. Add wheat, water and the business organiser when students cannot see them directly.',
    },
    {
      id: 'factor-of-production',
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
      id: 'four-different-kinds-of-productive-resource',
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
      id: 'classify-the-bakery-inputs',
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
      id: 'land-labour-and-capital',
      type: 'section',
      eyebrow: 'Part 2',
      title: 'Land, labour and capital',
      zhTitle: '土地、劳动与资本',
    },
    {
      id: 'land-includes-resources-that-grow-in-nature',
      type: 'visualPause',
      title: 'Land includes resources that grow in nature.',
      visual: photos.landWheatField,
      notes: 'Ask what part of this scene is used to produce bread. Draw out soil, water and wheat before showing the definition.',
    },
    {
      id: 'land',
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
      id: 'the-sea-reefs-and-fish-are-also-land',
      type: 'visualPause',
      title: 'The sea, reefs and fish are also land.',
      visual: photos.landCoralReef,
      notes: 'Ask: Is this land even though it is underwater? Use the economic definition: land includes all natural resources used in production.',
    },
    {
      id: 'land-yes-or-no',
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
      id: 'labour-is-the-human-contribution-to-production',
      type: 'visualPause',
      title: 'Labour is the human contribution to production.',
      visual: photos.labourBakerKneading,
      notes: 'Ask students to distinguish the worker from the effort and skill being supplied. Labour is the human effort used in production.',
    },
    {
      id: 'labour',
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
      id: 'capital-is-made-by-people-to-help-production',
      type: 'visualPause',
      title: 'Capital is made by people to help production.',
      visual: photos.capitalIndustrialMachine,
      notes: 'Ask what the machine is used to do. Establish that it is human-made and used for production.',
    },
    {
      id: 'capital',
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
      id: 'check',
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
      id: 'land-labour-or-capital',
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
  ],
};
