/*
Syllabus source: ../../../references/igcse-economics-syllabus-2027-2029.md (1.2.2)
Original syllabus PDF checked: IGCSE Economics Syllabus (2027-2029).pdf, p. 11.
Definitions source: ../../../references/igcse-economics-definitions-2026.md
Paper 2 mark-scheme archive: ../../../references/paper-2-mark-schemes-2023-2025/1-basic-economic-problem.md
Original papers checked: 0455/22/F/M/23 Q1(b), 0455/22/M/J/23 Q3(b), 0455/21/O/N/25 Q3(b).
*/
window.IGCSE = window.IGCSE || {};

const quantityQualitySource = {
  label: 'Syllabus and definitions',
  ref: 'Cambridge IGCSE Economics 0455 syllabus 2027–2029 · 1.2.2',
  note: 'Syllabus 1.2.2 requires causes of changes in the quantity and quality of factors of production.'
};

const reclamationPhoto = {
  type: 'photo',
  src: './assets/land-reclamation-hkia.jpg',
  alt: 'Land reclamation works beside Hong Kong International Airport during the third-runway expansion.',
  caption: 'Hong Kong International Airport land reclamation · 2019',
  credit: 'Wpcpey / Wikimedia Commons / CC BY 4.0',
  source: 'https://commons.wikimedia.org/wiki/File:HKIA_The_Three_Runways_System_Expansion_reclamation_201911.jpg',
  objectPosition: '50% 50%'
};

const trainingPhoto = {
  type: 'photo',
  src: './assets/labour-training-welding.jpg',
  alt: 'An experienced welder demonstrates a welding torch during practical technical training.',
  caption: 'Practical welding training',
  credit: 'Sgt Tammy Hineline / U.S. Marine Corps / public domain',
  source: 'https://commons.wikimedia.org/wiki/File:A_U.S._Marine_Corps_welder_with_Combat_Logistics_Battalion_(CLB)_6_demonstrates_how_to_use_a_welding_torch_during_training_at_Camp_Shorabak,_Helmand_province,_Afghanistan,_Dec._17,_2013_131217-M-RF397-085.jpg',
  objectPosition: '50% 50%'
};

const healthcarePhoto = {
  type: 'photo',
  src: './assets/labour-healthcare-vaccine.jpg',
  alt: 'A factory worker in Lesotho receives a vaccine from a healthcare worker.',
  caption: 'A factory worker receives healthcare in Lesotho · 2021',
  credit: 'USAID / Wikimedia Commons / public domain',
  source: 'https://commons.wikimedia.org/wiki/File:A_factory_worker_in_Lesotho_receives_vaccine.jpg',
  objectPosition: '50% 50%'
};

IGCSE.lesson = {
  meta: {
    code: '1.2.2',
    unit: 'Unit 1 - The basic economic problem',
    title: '1.2.2 Quantity and quality of factors of production - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Factors of production · Lesson 3',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
    deliveryPlan: {
      durationMinutes: 58,
      previousEndpoint: 'Enterprise and factor rewards',
      coreEndSlide: 29,
      optionalStartSlide: 30,
      nextSession: '1.3 Opportunity cost',
      coreEnd: 'Original Paper 2 exit question, model answer and Summary'
    }
  },
  slides: [
    {
      id: 'quantity-and-quality-of-factors-of-production',
      type: 'hero',
      layout: 'enterprise-hero',
      eyebrow: 'Lesson 3 · 1.2.2',
      title: '1.2.2 Quantity and quality of factors of production',
      zhTitle: '生产要素的数量与质量',
      kicker: 'How an economy gains more resources—or makes each resource more productive',
      visual: {
        type: 'photo',
        src: './assets/quantity-quality-hero.png',
        alt: 'A commercial greenhouse with many workers and irrigation systems, while one worker receives technical instruction.',
        caption: '',
        credit: 'OpenAI image generation · fictional greenhouse',
        source: ''
      },
      notes: 'The greenhouse combines both ideas: more workers and systems suggest quantity; technical instruction and precision equipment suggest quality. Do not define the terms yet. Ask students to spot the two different ways the greenhouse could produce more.'
    },
    {
      id: 'recall-enterprise-and-rewards',
      type: 'classificationTask',
      layout: 'factor-written',
      eyebrow: 'Recall',
      title: 'Recall: enterprise and rewards',
      items: [
        { text: 'Define enterprise.', answer: 'Enterprise organises the other factors of production and takes risks.' },
        { text: 'What is the reward for labour?', answer: 'The reward for labour is wages or salaries.' },
        { text: 'Why is profit not guaranteed?', answer: 'Profit depends on sales revenue minus total costs, so the entrepreneur may make a loss.' }
      ],
      sharePrompt: 'Write all three answers before revealing each model.',
      notes: 'Three minutes of independent writing. These three prompts retrieve the essential content from Lesson 2.'
    },
    {
      id: 'quantity-quality-objectives',
      type: 'outcomes',
      eyebrow: 'Objectives',
      title: 'By the end, you can',
      bullets: [
        'Distinguish the quantity and quality of factors of production.',
        'Explain causes of changes in the quantity and quality of each factor.',
        'Build full-mark explanations for Paper 2 questions.'
      ],
      zhBullets: [
        '区分生产要素的数量与质量。',
        '解释各生产要素数量和质量变化的原因。',
        '写出符合 Paper 2 评分标准的完整解释。'
      ]
    },
    {
      id: 'two-ways-resources-can-change',
      type: 'section',
      eyebrow: 'Part 1',
      title: 'Two ways resources can change',
      zhTitle: '资源变化的两种方式'
    },
    {
      id: 'more-carpenters-more-machines',
      type: 'visualPause',
      visual: {
        type: 'photo',
        src: './assets/quantity-workshop.png',
        alt: 'The same furniture workshop shown with two workers and one machine, then with six workers and three matching machines.',
        credit: 'OpenAI image generation · fictional workshop',
        source: ''
      },
      notes: 'Silent observation first. Ask students to count the workers and machines on each side. The skill and technology level is intentionally unchanged; only the amount of labour and capital rises.'
    },
    {
      id: 'what-changed-in-the-workshop',
      type: 'discussion',
      layout: 'opening',
      title: 'What changed in the workshop?',
      zhTitle: '车间里什么发生了变化？',
      question: 'The second workshop has the same type of workers and machines. What has increased?',
      zh: '第二个车间的工人类型和机器类型相同。什么增加了？',
      answer: 'The quantity of labour and capital increased: there are more workers, workbenches and machines. Their skill and technology did not visibly improve.',
      answerZh: '劳动和资本的数量增加了：工人、工作台和机器都更多了。工人的技能和机器的技术水平并没有明显提高。',
      visual: {
        type: 'photo',
        src: './assets/quantity-workshop.png',
        alt: 'A furniture workshop before and after the number of workers and machines increases.',
        caption: '',
        credit: 'OpenAI image generation · fictional workshop',
        source: ''
      },
      notes: 'Take answers before opening the possible answer. Require students to name the factors: workers are labour; machines and workbenches are capital.'
    },
    {
      id: 'quantity-versus-quality',
      type: 'compare',
      eyebrow: 'Learn',
      title: 'Quantity and quality are different changes',
      zhTitle: '数量变化与质量变化不同',
      leftTitle: 'Quantity 数量',
      left: [
        'The amount of a factor available for production.',
        'Ask: are there more or fewer resources?',
        'Example: six workers instead of two.'
      ],
      rightTitle: 'Quality 质量',
      right: [
        'How productive or effective a factor is.',
        'Ask: can each resource produce more or better output?',
        'Example: the same workers gain better skills.'
      ],
      partialReview: ['.splitCols > .card'],
      sources: [quantityQualitySource],
      notes: 'Reveal quantity, then quality. Quantity is about amount, not output itself. Quality is about the productive capability of the input, not the quality of the final product alone.'
    },
    {
      id: 'quantity-or-quality-first-check',
      type: 'classificationTask',
      layout: 'factor-written',
      eyebrow: 'Check',
      title: 'Quantity or quality?',
      items: [
        { text: 'A hospital recruits 20 additional nurses.', answer: 'Quantity of labour increases.' },
        { text: 'The same nurses complete advanced emergency-care training.', answer: 'Quality of labour increases.' },
        { text: 'A farm buys three more tractors of the same type.', answer: 'Quantity of capital increases.' },
        { text: 'The farm replaces one old tractor with a faster, more reliable model.', answer: 'Quality of capital increases.' }
      ],
      sharePrompt: 'Decide all four before revealing the answers.',
      notes: 'Hinge check. If students classify output changes instead of input changes, return to the two diagnostic questions on the previous slide.'
    },
    {
      id: 'increasing-the-quantity-of-factors',
      type: 'section',
      eyebrow: 'Part 2',
      title: 'Increasing the quantity of factors',
      zhTitle: '增加生产要素的数量'
    },
    {
      id: 'hong-kong-land-reclamation',
      type: 'visualPause',
      visual: reclamationPhoto,
      notes: 'This 2019 photograph shows reclamation during Hong Kong International Airport expansion. Ask: how can an economy create usable land where there was previously sea? Bridge to land reclamation.'
    },
    {
      id: 'more-land',
      type: 'flow',
      eyebrow: '1 of 4',
      title: 'More land',
      zhTitle: '更多土地',
      question: 'Land means natural resources used in production.',
      nodes: [
        'Land reclamation fills an area of sea',
        'more usable land becomes available',
        'the quantity of land increases'
      ],
      footer: 'Discovery of new natural resources, such as an oil field, can also increase the quantity of land.',
      partialReview: true,
      sources: [
        quantityQualitySource,
        {
          label: 'Authentic photograph',
          ref: 'HKIA third-runway expansion reclamation · November 2019',
          url: reclamationPhoto.source,
          note: 'Photograph by Wpcpey, licensed CC BY 4.0.'
        },
        {
          label: 'Cambridge mark scheme',
          ref: '0455/22/M/J/23 Q3(b)',
          note: 'Accepted quantity causes include land reclamation creating land from the sea and discovery of new natural resources.'
        }
      ],
      notes: 'Every arrow means “therefore”. Reclamation creates usable land from the sea; it does not make an existing hectare more fertile.'
    },
    {
      id: 'more-labour-capital-and-enterprise',
      type: 'cards',
      eyebrow: '2–4 of 4',
      title: 'More labour, capital and enterprise',
      cards: [
        {
          num: '2',
          title: 'Labour',
          zhTitle: '劳动',
          body: 'A larger labour force—from population growth, immigration or higher participation—means more workers are available.'
        },
        {
          num: '3',
          title: 'Capital',
          zhTitle: '资本',
          body: 'Investment in additional machines, tools, factories or infrastructure increases the stock of capital goods.'
        },
        {
          num: '4',
          title: 'Enterprise',
          zhTitle: '企业家才能',
          body: 'More people starting and organising businesses increases the amount of enterprise supplied.'
        }
      ],
      partialReview: ['.cardgrid > .card'],
      sources: [quantityQualitySource],
      notes: 'One card per click. Keep quantity language explicit: more workers, more capital goods, more entrepreneurs. Do not call money itself capital.'
    },
    {
      id: 'which-factor-increased',
      type: 'classificationTask',
      layout: 'factor-written',
      eyebrow: 'Apply',
      title: 'Which factor increased?',
      items: [
        { text: 'New oil deposits are discovered.', answer: 'The quantity of land increases.' },
        { text: 'More people enter paid employment.', answer: 'The quantity of labour increases.' },
        { text: 'A logistics firm buys ten additional vans.', answer: 'The quantity of capital increases.' },
        { text: 'More people start businesses.', answer: 'The quantity of enterprise increases.' }
      ],
      sharePrompt: 'Name the factor and use the word “quantity”.',
      sources: [quantityQualitySource],
      notes: 'Require complete sentences. New oil is land because land includes natural resources. Vans are capital goods because they are human-made goods used in production.'
    },
    {
      id: '0455-22-f-m-23-q1b',
      type: 'exam',
      eyebrow: 'Quick paper check · 0455/22/F/M/23 Q1(b)',
      title: 'Identify two causes of the increase in the quantity of US factors of production. [2]',
      prompt: 'Write two distinct causes. “Identify” does not require a developed explanation.',
      sources: [{
        label: 'Original Cambridge question',
        ref: '0455/22/F/M/23 Q1(b) · question paper p. 3; mark scheme p. 8',
        question: 'Identify two causes of the increase in the quantity of US factors of production.',
        extract: 'Official answer: land reclamation (1); increase in the labour force (1).'
      }],
      notes: 'Two minutes independent writing. The item depends on the US source extract, so use only the two official answers here rather than accepting every theoretically possible cause.'
    },
    {
      id: '0455-22-f-m-23-q1b-model',
      type: 'modelAnswer',
      eyebrow: 'Official points in full sentences',
      title: 'Identify two causes of the increase in the quantity of US factors of production. [2]',
      answer: 'Land reclamation can increase the quantity of land.\nAn increase in the labour force can increase the quantity of labour.',
      showLinkChips: false,
      partialReview: ['.modelAnswerCard'],
      sources: [{
        label: 'Cambridge mark scheme',
        ref: '0455/22/F/M/23 Q1(b) · mark scheme p. 8',
        question: 'Identify two causes of the increase in the quantity of US factors of production.',
        extract: 'Land reclamation (1); increase in the labour force (1).'
      }],
      notes: 'The mark scheme needs the two points only. The visible model uses full sentences to reinforce precise factor language.'
    },
    {
      id: 'improving-the-quality-of-factors',
      type: 'section',
      eyebrow: 'Part 3',
      title: 'Improving the quality of factors',
      zhTitle: '提高生产要素的质量'
    },
    {
      id: 'same-number-better-resources',
      type: 'visualPause',
      visual: {
        type: 'photo',
        src: './assets/quality-garage.png',
        alt: 'The same two mechanics and one diagnostic machine shown in an older garage and then with improved skills and newer equipment.',
        credit: 'OpenAI image generation · fictional garage',
        source: ''
      },
      notes: 'Silent observation. Ask students to count mechanics and diagnostic machines: the quantity stays at two workers and one main machine on each side. The later scene suggests better skills, organisation and technology.'
    },
    {
      id: 'what-improved-in-the-garage',
      type: 'discussion',
      layout: 'opening',
      title: 'What improved in the garage?',
      zhTitle: '修理厂里什么得到了提高？',
      question: 'There are still two mechanics and one diagnostic machine. Why might they repair more cars per day?',
      zh: '仍然只有两名技师和一台诊断设备。为什么他们每天可能修理更多汽车？',
      answer: 'The mechanics may have better training and the diagnostic machine uses better technology. The quality of labour and capital has increased, so each input can be more productive.',
      answerZh: '技师可能接受了更好的培训，诊断设备也采用了更先进的技术。劳动和资本的质量提高了，因此每单位投入可以更具生产力。',
      visual: {
        type: 'photo',
        src: './assets/quality-garage.png',
        alt: 'A car-repair workshop before and after the quality of labour and capital improves.',
        caption: '',
        credit: 'OpenAI image generation · fictional garage',
        source: ''
      },
      notes: 'Open the answer only after students name training and technology. The image controls quantity so students can isolate a quality change.'
    },
    {
      id: 'quality-of-a-factor-of-production',
      type: 'term',
      layout: 'photo-term',
      eyebrow: 'Learn',
      title: 'Quality of a factor of production',
      zhTitle: '生产要素的质量',
      term: 'quality of a factor of production',
      definition: 'A higher-quality factor can produce more or better output from a given amount of that factor.',
      definitionZh: '质量更高的生产要素，能以给定数量的该要素生产更多或更好的产出。',
      keyTerms: [
        { term: 'more or better output', zh: '更多或更好的产出', explain: false },
        { term: 'given amount', zh: '给定数量', explain: false }
      ],
      visual: trainingPhoto,
      sources: [quantityQualitySource],
      notes: 'This concise teaching definition consolidates the mechanism; the syllabus itself asks for causes of change rather than a memorised definition. “Given amount” keeps quality separate from quantity.'
    },
    {
      id: 'four-routes-to-better-labour',
      type: 'cards',
      layout: 'factor-quality-routes',
      cardStyle: 'photoGrid',
      cardLayout: 'photoGridFour',
      eyebrow: 'Labour',
      title: 'Four routes to better labour',
      cards: [
        { num: '1', title: 'Education', zhTitle: '教育', body: 'Builds knowledge and qualifications, enabling workers to complete more complex tasks.', visual: { src: './assets/quantity-quality-hero.png', alt: 'A technician learning how to use modern greenhouse technology.' } },
        { num: '2', title: 'Training', zhTitle: '培训', body: 'Develops job-specific skills, so workers may produce more accurately or quickly.', visual: { src: trainingPhoto.src, alt: trainingPhoto.alt } },
        { num: '3', title: 'Healthcare', zhTitle: '医疗保健', body: 'Healthier workers may produce more and take fewer days off sick.', visual: { src: healthcarePhoto.src, alt: healthcarePhoto.alt } },
        { num: '4', title: 'Experience', zhTitle: '经验', body: 'Practice helps workers make fewer mistakes and solve problems more efficiently.', visual: { src: './assets/quality-garage.png', alt: 'Experienced mechanics diagnosing a car in a well-organised workshop.' } }
      ],
      partialReview: ['.cardgrid > .card'],
      sources: [
        quantityQualitySource,
        { label: 'Authentic training photograph', ref: 'Practical welding training · 17 December 2013', url: trainingPhoto.source, note: trainingPhoto.credit },
        { label: 'Authentic healthcare photograph', ref: 'Factory worker receiving a vaccine in Lesotho · 22 October 2021', url: healthcarePhoto.source, note: healthcarePhoto.credit },
        { label: 'Cambridge mark scheme', ref: '0455/21/O/N/25 Q3(b)', note: 'Accepted productivity influences include education, healthcare, technology and quality of factors of production.' }
      ],
      notes: 'Reveal one route at a time. Each explanation must link the cause to a change in skill, health or efficiency; merely naming “education” or “healthcare” is not an explanation.'
    },
    {
      id: 'training-raises-labour-productivity',
      type: 'flow',
      eyebrow: 'Explain the link',
      title: 'Training raises labour productivity',
      zhTitle: '培训提高劳动生产率',
      nodes: [
        'workers receive job-specific training',
        'their skills and accuracy improve',
        'each worker produces more output per hour'
      ],
      partialReview: true,
      sources: [
        quantityQualitySource,
        { label: 'Cambridge mark scheme', ref: '0455/21/O/N/25 Q3(b)', note: 'Education can create skilled workers and affect labour productivity.' }
      ],
      notes: 'Model the two-mark logic: identify the influence, then explain the effect. Every arrow must read as “therefore”.'
    },
    {
      id: 'welding-training-in-action',
      type: 'visualPause',
      visual: trainingPhoto,
      notes: 'This is practical welding training photographed in 2013. Ask students to narrate the causal chain from instructor demonstration to fewer errors or more output.'
    },
    {
      id: 'better-land-capital-and-enterprise',
      type: 'cards',
      eyebrow: 'Other factors',
      title: 'Better land, capital and enterprise',
      cards: [
        {
          num: '1',
          title: 'Land',
          zhTitle: '土地',
          body: 'Fertiliser, irrigation, less pollution or better farming technology can raise fertility and productivity.'
        },
        {
          num: '2',
          title: 'Capital',
          zhTitle: '资本',
          body: 'Research, development and technological progress can make equipment faster, safer or more reliable.'
        },
        {
          num: '3',
          title: 'Enterprise',
          zhTitle: '企业家才能',
          body: 'Education, training and experience can improve entrepreneurs’ decisions, organisation and innovation.'
        }
      ],
      partialReview: ['.cardgrid > .card'],
      sources: [
        quantityQualitySource,
        { label: 'Cambridge mark scheme', ref: '0455/22/M/J/23 Q3(b)', note: 'Accepted quality-of-land causes include fertiliser, reduced pollution, good weather and better equipment or technology.' }
      ],
      notes: 'Keep the cards parallel: cause, then productive effect. Avoid saying “more fertiliser means more land”; it changes the productivity of existing land, so it is quality.'
    },
    {
      id: 'quantity-or-quality-second-check',
      type: 'classificationTask',
      layout: 'factor-written',
      eyebrow: 'Hinge check',
      title: 'Quantity or quality—and which factor?',
      items: [
        { text: 'A country discovers a new copper deposit.', answer: 'Quantity of land increases.' },
        { text: 'Farmers use fertiliser to raise soil fertility.', answer: 'Quality of land increases.' },
        { text: 'A factory installs five additional machines of the same type.', answer: 'Quantity of capital increases.' },
        { text: 'Engineers develop a faster and more reliable machine.', answer: 'Quality of capital increases.' }
      ],
      sharePrompt: 'For each one, name both the type of change and the factor.',
      notes: 'Students should answer all four before review. If fertiliser is misclassified as quantity, ask whether the number of hectares changed.'
    },
    {
      id: 'paper-2-explanation',
      type: 'section',
      eyebrow: 'Part 4',
      title: 'Paper 2 explanation',
      zhTitle: 'Paper 2 解释题'
    },
    {
      id: 'reclamation-before-the-question',
      type: 'visualPause',
      visual: reclamationPhoto,
      notes: 'Full-screen question introduction. Ask students to recall the term and its precise effect before showing the original question. The next slide uses a white paper-style surface, avoiding light text on this bright photograph.'
    },
    {
      id: '0455-22-m-j-23-q3b',
      type: 'exam',
      eyebrow: 'Exit ticket · 0455/22/M/J/23 Q3(b)',
      title: 'Explain one reason why the quantity of land may increase and one reason why the quality of land may increase. [4]',
      prompt: 'Write two cause → effect explanations. One must change the amount of land; the other must change its productivity.',
      sources: [{
        label: 'Original Cambridge question',
        ref: '0455/22/M/J/23 Q3(b) · question paper p. 4; mark scheme p. 16',
        question: 'Explain one reason why the quantity of land may increase and one reason why the quality of land may increase.',
        extract: 'Quantity: e.g. reclamation creating land from the sea. Quality: e.g. fertiliser raising productivity, efficiency or fertility.'
      }],
      notes: 'Assessed core exit, four minutes. Award one mark for each relevant reason and one mark for explaining each. Insist on quantity and quality as separate paragraphs.'
    },
    {
      id: '0455-22-m-j-23-q3b-model',
      type: 'modelAnswer',
      eyebrow: 'Model answer · 4/4',
      title: 'Explain one reason why the quantity of land may increase and one reason why the quality of land may increase. [4]',
      answer: 'Land reclamation can create usable land from the sea, so the quantity of land available for production increases.\n\nUsing fertiliser can raise the fertility and productivity of existing land, so the quality of land increases.',
      showLinkChips: false,
      partialReview: ['.modelAnswerCard'],
      sources: [{
        label: 'Cambridge mark scheme',
        ref: '0455/22/M/J/23 Q3(b) · mark scheme p. 16',
        question: 'Explain one reason why the quantity of land may increase and one reason why the quality of land may increase.',
        extract: 'Reclamation (1), creating land from the sea (1). Use of fertilisers (1), raising productivity, efficiency or fertility of land (1).'
      }],
      notes: 'Reveal only after collecting answers. This is a teacher-written full-sentence model built directly from two official mark-scheme chains, not an official Cambridge model answer.'
    },
    {
      id: 'quantity-quality-summary',
      type: 'cards',
      eyebrow: 'Summary',
      title: 'Summary',
      cards: [
        { num: '1', title: 'Quantity', zhTitle: '数量', body: 'The amount of land, labour, capital or enterprise available for production.' },
        { num: '2', title: 'Quality', zhTitle: '质量', body: 'How productive or effective each factor is.' },
        { num: '3', title: 'Quantity causes', zhTitle: '数量变化原因', body: 'Reclamation or discovery, a larger labour force, investment in more capital goods, and more entrepreneurs.' },
        { num: '4', title: 'Quality causes', zhTitle: '质量变化原因', body: 'Education, training, healthcare, experience, technology, research and better use of natural resources.' }
      ],
      sources: [quantityQualitySource],
      notes: 'Core lesson ending. Ask students to give one fresh example for quantity and one for quality without repeating the visible examples.'
    },
    {
      id: 'optional-productivity-practice',
      type: 'section',
      eyebrow: 'Optional practice',
      title: 'From factor quality to productivity',
      zhTitle: '从要素质量到生产率'
    },
    {
      id: 'training-before-productivity-question',
      type: 'visualPause',
      visual: trainingPhoto,
      notes: 'Optional full-screen introduction. Ask students to convert the photograph into a two-mark chain: training → skills → more output per worker.'
    },
    {
      id: '0455-21-o-n-25-q3b',
      type: 'exam',
      eyebrow: 'Optional · 0455/21/O/N/25 Q3(b)',
      title: 'Explain two influences on productivity. [4]',
      prompt: 'Choose two influences. For each, explain why output per input may rise or fall.',
      sources: [{
        label: 'Original Cambridge question',
        ref: '0455/21/O/N/25 Q3(b) · question paper p. 4; mark scheme p. 18',
        question: 'Explain two influences on productivity.',
        extract: 'Accepted influences include quality of factors, working conditions or wages, technology, education, healthcare, institutions and use of resources.'
      }],
      notes: 'Optional five-minute extension. Productivity is fully taught later in 3.5.3; here students apply the quality mechanisms already learned. Award one mark for each influence and one for each explanation.'
    },
    {
      id: '0455-21-o-n-25-q3b-model',
      type: 'modelAnswer',
      eyebrow: 'Model answer · 4/4',
      title: 'Explain two influences on productivity. [4]',
      answer: 'Education can improve workers’ skills, enabling each worker to produce more output.\n\nHealthcare can make workers healthier, so they can produce more and take fewer days off sick.',
      showLinkChips: false,
      partialReview: ['.modelAnswerCard'],
      sources: [{
        label: 'Cambridge mark scheme',
        ref: '0455/21/O/N/25 Q3(b) · mark scheme p. 18',
        question: 'Explain two influences on productivity.',
        extract: 'Education: skilled workers/effects on labour productivity. Healthcare: healthier workers can produce more or take less time off.'
      }],
      notes: 'Teacher-written model using official mark-scheme links. Keep this after the core ending so it can be omitted when time is short.'
    }
  ]
};
