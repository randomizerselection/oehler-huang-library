// One-time, reproducible split of the taught population lesson at slide 21.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const dir = path.resolve(__dirname, '../../../apps/library/lessons/unit-5-economic-development/5-3-population');
const load = (name, key) => {
  const context = { window: { IGCSE: { photos: { marketEconomicSystem: { vaccination: {
    type: 'photo', src: '../../../assets/images/population/medical-student-eye-examination.jpg',
    alt: 'A medical examination.', credit: 'Existing lesson image'
  } } } } } };
  context.IGCSE = context.window.IGCSE;
  vm.runInNewContext(fs.readFileSync(path.join(dir, name), 'utf8'), context);
  return JSON.parse(JSON.stringify(context.IGCSE[key]));
};
const write = (name, key, value) => fs.writeFileSync(path.join(dir, name),
  `window.IGCSE=window.IGCSE||{};\nIGCSE.${key}=${JSON.stringify(value, null, 2)};\n`);
const source = load('slides.js', 'lesson');
const cut = source.slides.findIndex(slide => slide.id === 'why-rates-vary-section');
if (cut !== 20) throw new Error(`Expected the split at slide 21; found ${cut + 1}`);
const prior = source.slides.slice(0, cut);
prior[0].notes = 'Lesson 1 was taught through the population increase Paper 1 question. This deck covers birth and death rates, natural change, immigration, emigration and net migration. The next lesson explains why rates vary.';
prior[2].bullets = [
  'Define birth rate, death rate, immigration, emigration and net migration.',
  'Calculate natural increase, net migration and population change.',
  'Use a real country and a past-paper question to explain population change.'
];
prior[2].zhBullets = [
  '定义出生率、死亡率、迁入、迁出与净迁移。',
  '计算自然增长、净迁移与人口变化。',
  '用真实国家案例和历年真题解释人口变化。'
];
prior.push({id:'population-lesson-1-summary',type:'cards',eyebrow:'Review',title:'Summary',layout:'population-summary',cards:[
  {title:'Natural change',body:'Birth rate − death rate gives the rate of natural increase.'},
  {title:'Migration',body:'Net migration = immigration − emigration.'},
  {title:'Population change',body:'Natural increase and net migration together determine population change.'}
],partialReview:false,notes:'Conclude the taught material. Next lesson: why birth and death rates, and therefore population growth, vary between countries.'});
source.slides = prior;
source.meta.deliveryPlan = {durationMinutes:40,coreEndSlide:prior.length,previousEndpoint:'Supply-side policy: limitations and evaluation',status:'Taught through the previous Paper 1 question; completed at slide 20 on 24 September 2026'};
write('slides.js','lesson',source);

const original = load('slides-before-split.js', 'lesson');
const pick = id => {
  const slide = original.slides.find(item => item.id === id);
  if (!slide) throw new Error(`Missing slide ${id}`);
  return slide;
};
const image = (file,alt,credit,url) => ({type:'photo',src:`../../../assets/images/population/${file}`,alt,caption:'',credit,source:url});
const media = {
  clinic:image('car-health-clinic.jpg','Red Cross medics caring for families in a clinic in Kaga Bandoro, Central African Republic.','UK Department for International Development / Wikimedia Commons / CC BY 2.0','https://commons.wikimedia.org/wiki/File:Local_medics_in_Kaga_Bandoro_(11237105324).jpg'),
  mothers:image('car-mothers-babies.jpg','Mothers and babies queue for vaccination in Bangui, Central African Republic.','UNICEF / Wikimedia Commons / CC BY 2.0','https://commons.wikimedia.org/wiki/File:Caf_babies.jpg'),
  familyPlanning:image('family-planning-talk-nigeria.jpg','Women attending a family planning discussion in Ebonyi State, Nigeria.','Lovecharles2004 / Wikimedia Commons / CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Family_Planning_Talk_at_Umunogodo_Community.jpg')
};
const questionPhoto = (id, question, visual, ref, notes) => ({id,type:'discussion',layout:'population-exam-intro',eyebrow:'Past Paper Question',question,visual,sources:[{label:'Question paper',ref,question}],notes});
const section = pick('why-rates-vary-section'); section.eyebrow='Part 1';
const birth = pick('birth-rate-extremes');
birth.cardVisuals=[media.mothers,image('shibuya-crossing-crowd-2025.jpg','Crowds in East Asia.','組曲師 / Wikimedia Commons / CC BY 4.0','https://commons.wikimedia.org/wiki/File:Shibuya_Crossing_in_2025.jpg')];
birth.notes += ' The photographs locate the two regions only; the numbers are national UN estimates and must not be inferred from a photograph.';
const birthCauses=pick('causes-of-birth-rate-differences');
birthCauses.cardVisuals[1]=media.familyPlanning;
const lowDeath=pick('causes-of-low-death-rates');
lowDeath.cardVisuals[1]=media.clinic;
const highDeath=pick('causes-of-high-death-rates');
const deathExtremes=pick('death-rate-extremes');
deathExtremes.cardVisuals=[image('elderly-woman-portrait.jpg','Portrait of an elderly woman.','Ferdinand Reus / Wikimedia Commons / CC BY-SA 2.0','https://commons.wikimedia.org/wiki/File:Elderly_Gambian_woman_face_portrait.jpg'),image('airport-departure-hall.jpg','People travelling through an airport departure hall.','Wikimedia Commons / see original lesson source','')];
deathExtremes.notes += ' These are illustrative age and migration images, not photographs of Monaco or Qatar.';
const deathQuestion=pick('death-rates-vary-question');
deathQuestion.prompt='Write two distinct reasons. Population size changes the number of deaths, not the death rate.';
const deathModel=pick('death-rates-vary-model');
deathModel.paragraphs=['Death rates may differ because healthcare quality differs between countries.','They may also differ because the average age of the population differs.'];
deathModel.answer=deathModel.paragraphs.join('\n\n');
deathModel.notes='One mark for each distinct accepted reason. Healthcare and age structure are drawn from the official scheme. This model uses full sentences for classroom writing practice.';
const exit=pick('high-growth-exit');
const exitModel=pick('high-growth-exit-model');
const growthMCQ=pick('developing-country-growth-paper1');
const netMCQ=pick('high-growth-paper1');
const slides=[
  {id:'population-rates-lesson-2',type:'hero',eyebrow:'5.3.1 · Population',title:'Why population growth rates vary',zhTitle:'为什么各国人口增长率不同',kicker:'Births, deaths and migration in different countries',layout:'population-hero',visual:media.mothers,sources:section.sources,notes:'Second 40-minute population lesson. Lesson 1 was taught up to, but not including, the original slide 21. The newborns and mothers shown are in the Central African Republic; ask what a photograph cannot tell us about a national rate.'},
  {id:'population-rates-recall',type:'classificationTask',layout:'population-written',eyebrow:'Recall',title:'Recall: how populations change',items:[
    {text:'Define birth rate, including its denominator and time period.',answer:'The birth rate is the number of births per 1,000 of the population per year.'},
    {text:'Define net migration.',answer:'Net migration is immigration minus emigration.'},
    {text:'A country has 20 births and 8 deaths per 1,000 people, and net emigration. Can its total population still fall?',answer:'Yes. Its rate of natural increase is 12 per 1,000, but the total population can fall if net emigration exceeds natural increase.'}
  ],notes:'Three minutes, independently, recalling the immediately preceding population lesson. Reveal answers one at a time.'},
  {id:'population-rates-objectives',type:'outcomes',eyebrow:'Objectives',title:'By the end, you can',bullets:[
    'Compare birth, death and migration rates across countries.',
    'Explain mark-scheme reasons for differences in the rates.',
    'Write two developed reasons for high population growth.'
  ],zhBullets:[
    '比较不同国家的出生率、死亡率与迁移率。',
    '解释评分标准认可的各类差异原因。',
    '完整解释人口高增长的两个原因。'
  ]},
  section,
  pick('birth-rate-map'),
  birth,
  birthCauses,
  pick('fertility-rate-definition'),
  pick('fertility-rate-map'),
  {id:'birth-versus-fertility-check',type:'classificationTask',layout:'population-written',eyebrow:'Check',title:'Which rate is it?',items:[
    {text:'46.4 babies are born per 1,000 residents in a year. Name the measure.',answer:'This is the birth rate: births per 1,000 of the whole population per year.'},
    {text:'The average woman has 0.72 children. Name the measure.',answer:'This is the fertility rate: average children born per woman.'},
    {text:'Why can birth rates differ even when fertility rates are similar?',answer:'The countries may have different proportions of women of child-bearing age in their populations.'}
  ],notes:'Two minutes. The denominator distinguishes the two measures. Fertility is supporting knowledge from the 2025 mark scheme; birth rate is the named syllabus definition.'},
  {id:'population-death-rate-section',type:'section',eyebrow:'Part 2',title:'Why death rates differ',zhTitle:'为什么死亡率不同',notes:'Separate living conditions and healthcare from age structure. A high crude death rate does not alone prove poor healthcare.'},
  pick('death-rate-map'),
  deathExtremes,
  lowDeath,
  highDeath,
  questionPhoto('death-rates-question-photo','Identify two reasons why death rates may vary between countries. [2]',media.clinic,'0455/21 · May/June 2023 · Q3(a) [2]','Give students 60 seconds to identify two different reasons before showing the answer slide. The photograph shows healthcare in the Central African Republic; it is a prompt, not the paper context.'),
  deathQuestion,
  deathModel,
  {id:'population-combined-section',type:'section',eyebrow:'Part 3',title:'Explaining population growth',zhTitle:'解释人口增长',notes:'Reconnect birth rate, death rate and migration. Apply the components before the 2025 Paper 2 exit.'},
  growthMCQ,
  netMCQ,
  questionPhoto('high-growth-question-photo','Explain two reasons why a country may have a high population growth rate. [4]',media.mothers,'0455/21 · May/June 2025 · Q4(b) [4]','Allow four minutes of independent writing. Ask for two full causal sentences. The photograph is a teaching introduction, not the question-paper setting.'),
  exit,
  exitModel,
  {id:'population-rates-summary',type:'cards',eyebrow:'Review',title:'Summary',layout:'population-summary',cards:[
    {title:'Birth rates',body:'Age of marriage, birth-control education and the number of women of child-bearing age can affect births per 1,000 residents.'},
    {title:'Death rates',body:'Healthcare, income, nutrition, disease, conflict and age structure help explain deaths per 1,000 residents.'},
    {title:'Population growth',body:'High birth rates, low death rates or net immigration can raise population growth.'}
  ],partialReview:false,notes:'End of the 40-minute core lesson. Use the 2025 Paper 2 response as the assessed exit.'},
  {id:'population-extension-section',type:'section',eyebrow:'Optional',title:'Further past-paper practice',zhTitle:'选做：历年真题',notes:'Use only if there is spare time or as homework. These are not needed to complete the core lesson.'},
  pick('population-data-paper1'),
  pick('birth-rate-average-age-question'),
  pick('birth-rate-average-age-model'),
  pick('migration-causes-question'),
  pick('migration-causes-model')
];
const second={meta:{...original.meta,title:'Why population growth rates vary — Cambridge IGCSE Economics 0455',lessonLabel:'Why population growth rates vary',deliveryPlan:{durationMinutes:40,coreEndSlide:24,previousEndpoint:'Population growth: natural change and migration',status:'Prepared as the continuation after taught slide 20; optional extension follows Summary'}},slides};
const ids=slides.map(s=>s.id);
if(new Set(ids).size!==ids.length)throw new Error('Duplicate slide IDs');
write('slides-lesson-2.js','lesson',second);

const quiz=load('quiz.js','quiz');
const q2={...quiz,id:'5-3-1-population-rates',title:'Why population growth rates vary',description:'Birth-rate, death-rate and migration reasoning for lesson 2.',questions:quiz.questions.filter(q=>['lower-death-rate','high-birth-rate'].includes(q.id))};
quiz.questions=quiz.questions.filter(q=>!['lower-death-rate','high-birth-rate'].includes(q.id));
write('quiz.js','quiz',quiz);
write('quiz-lesson-2.js','quiz',q2);
const flash=load('flashcards.js','flashcards');
const f2={...flash,id:'5-3-1-population-rates-flashcards',title:'Why population growth rates vary flashcards',cards:flash.cards.filter(c=>['population-recall-3'].includes(c.id))};
flash.cards=flash.cards.filter(c=>!['population-recall-3'].includes(c.id));
write('flashcards.js','flashcards',flash);
write('flashcards-lesson-2.js','flashcards',f2);
console.log(`Split ${cut} taught slides; lesson 1 now ${prior.length} slides, lesson 2 ${slides.length} slides (24 core).`);
