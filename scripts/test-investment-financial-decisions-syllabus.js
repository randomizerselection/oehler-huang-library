const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const mapPath = path.join(root, 'investment-analysis', 'course-map-financial-decisions-data.js');
const pagePath = path.join(root, 'investment-analysis', 'syllabus.html');
const homePath = path.join(root, 'investment-analysis', 'index.html');
const passportPath = path.join(root, 'investment-analysis', 'unit-1', 'passport.html');
const passportRenderPath = path.join(root, 'investment-analysis', 'unit-1', 'passport-render.js');
const passportCssPath = path.join(root, 'assets', 'css', 'investment-passport.css');
const map = require(mapPath);
const generator = require(path.join(root, 'investment-analysis', 'generator-context.js'));

const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

check(map.syllabusKey === 'financial-decisions', 'syllabusKey must be financial-decisions');
check(map.courseTitle === 'Investment and Financial Decision-Making', 'course title is incorrect');
check(nonEmpty(map.courseIntroduction), 'course introduction is missing');
check(Array.isArray(map.units) && map.units.length === 6, 'expected exactly six units');
check(Array.isArray(map.lessons) && map.lessons.length === 50, 'expected exactly fifty lessons');
check(Array.isArray(map.examCheckpoints) && map.examCheckpoints.length === 6, 'expected six unit checkpoints');
check(/CNY/.test(map.currencyRule || '') && /HKD/.test(map.currencyRule || '') && /USD/.test(map.currencyRule || ''), 'currency rule must map mainland China, Hong Kong and United States cases to CNY, HKD and USD');

const passport = map.personalPassportPilot;
check(passport && passport.title === 'My Future Investor Passport', 'Unit 1 Passport pilot is missing');
check(passport && passport.unit === 1 && passport.lessonRange.join('-') === '1-8', 'Passport pilot must cover Unit 1 Lessons 1-8 only');
check(passport && passport.bookletRoute === 'unit-1/passport.html', 'Passport pilot must expose the printable booklet route');
check(passport && /one uncluttered two-column table per lesson/i.test(passport.pageLayout || ''), 'Passport pilot must define the one-table page layout');
check(passport && Array.isArray(passport.sectionFields) && passport.sectionFields.map((field) => field.key).join('|') === 'firstThought|evidence|revisedDecision|missingInformation', 'Passport pilot must define the four repeated response fields');
check(passport && Array.isArray(passport.teacherReview) && passport.teacherReview.map((item) => item.afterLesson).join('|') === '4|8', 'Passport teacher reviews must occur after Lessons 4 and 8');
check(passport && passport.safeguards.some((rule) => /never request real family income, balances, accounts or exact personal amounts/i.test(rule)), 'Passport safeguards must forbid real family financial figures');

const passportRequiredFields = [
  'title',
  'titleZh',
  'focus',
  'focusZh',
  'firstThoughtPrompt',
  'firstThoughtPromptZh',
  'evidencePrompt',
  'evidencePromptZh',
  'revisedDecisionPrompt',
  'revisedDecisionPromptZh',
  'missingInformationPrompt',
  'missingInformationPromptZh',
  'timing',
  'teacherNote',
  'privacyRule',
];
const passportAnswerFormatKeys = ['firstThought', 'evidence', 'revisedDecision', 'missingInformation'];

map.lessons.slice(0, 8).forEach((lesson, index) => {
  const checkpoint = lesson.passportCheckpoint;
  check(checkpoint && checkpoint.lesson === index + 1, `lesson ${index + 1} must expose its matching Passport checkpoint`);
  passportRequiredFields.forEach((field) => check(checkpoint && nonEmpty(checkpoint[field]), `lesson ${index + 1} Passport checkpoint is missing ${field}`));
  check(checkpoint && checkpoint.completionMinutes === 5, `lesson ${index + 1} Passport checkpoint must take five minutes`);
  check(checkpoint && /unfinished work becomes homework/i.test(checkpoint.timing), `lesson ${index + 1} Passport checkpoint must define the homework fallback`);
  check(checkpoint && Array.isArray(checkpoint.supportItems) && checkpoint.supportItems.length >= 3, `lesson ${index + 1} Passport checkpoint needs self-contained support`);
  check(checkpoint && checkpoint.pageLayout === passport.pageLayout, `lesson ${index + 1} Passport checkpoint must preserve the shared one-table layout`);
  check(checkpoint && checkpoint.answerFormats && typeof checkpoint.answerFormats === 'object', `lesson ${index + 1} Passport checkpoint needs structured answer formats`);

  passportAnswerFormatKeys.forEach((key) => {
    const format = checkpoint && checkpoint.answerFormats && checkpoint.answerFormats[key];
    check(format && nonEmpty(format.answerType), `lesson ${index + 1} Passport ${key} needs a clear English answer type`);
    check(format && nonEmpty(format.answerTypeZh), `lesson ${index + 1} Passport ${key} needs a clear Chinese answer type`);
    check(format && Array.isArray(format.optionGroups), `lesson ${index + 1} Passport ${key} must define optionGroups`);
    check(format && Array.isArray(format.sentenceFrames), `lesson ${index + 1} Passport ${key} must define sentenceFrames`);
    check(format && Number.isInteger(format.lines) && format.lines >= 0 && format.lines <= 3, `lesson ${index + 1} Passport ${key} must cap free-writing lines at three`);
    check(format && ((format.optionGroups || []).length + (format.sentenceFrames || []).length > 0), `lesson ${index + 1} Passport ${key} needs finite choices or a sentence frame`);
    (format && format.optionGroups || []).forEach((group, groupIndex) => {
      check(nonEmpty(group.label) && nonEmpty(group.labelZh), `lesson ${index + 1} Passport ${key} option group ${groupIndex + 1} needs bilingual labels`);
      check(Array.isArray(group.options) && group.options.length >= 2, `lesson ${index + 1} Passport ${key} option group ${groupIndex + 1} needs at least two choices`);
    });
  });

  const studentPrompts = checkpoint
    ? [checkpoint.firstThoughtPrompt, checkpoint.evidencePrompt, checkpoint.revisedDecisionPrompt, checkpoint.missingInformationPrompt].join(' ')
    : '';
  check(!/my income|my balance|my account|exact personal amount/i.test(studentPrompts), `lesson ${index + 1} Passport prompts must not request private financial figures`);
});

map.lessons.slice(8).forEach((lesson) => {
  check(lesson.passportCheckpoint === null, `lesson ${lesson.lesson} must remain outside the Unit 1 Passport pilot`);
});

function lessonByAnchor(pattern) {
  return map.lessons.find((lesson) => pattern.test(lesson.caseAnchor || ''));
}

const mainlandFamilyCurrencyPattern = /HK\$|HKD|港元/;
const openingFamilyCase = lessonByAnchor(/^Family goal (?:board|table)$/i);
const windfallCase = lessonByAnchor(/^Family windfall$/i);
const alibabaQuoteCase = lessonByAnchor(/^Alibaba quote snapshot$/i);
const nvidiaScaleCase = lessonByAnchor(/^Nvidia and peer scale case$/i);

check(openingFamilyCase && /CNY 50,000/.test(JSON.stringify(openingFamilyCase)) && !mainlandFamilyCurrencyPattern.test(JSON.stringify(openingFamilyCase)), 'opening mainland China family case must use CNY, not HKD');
check(windfallCase && /CNY 500,000/.test(JSON.stringify(windfallCase)) && !mainlandFamilyCurrencyPattern.test(JSON.stringify(windfallCase)), 'mainland China family windfall case must use CNY, not HKD');
check(alibabaQuoteCase && /HKEX/.test(alibabaQuoteCase.studentHook) && /Hong Kong-listed/.test(alibabaQuoteCase.studentHook) && /HKD 82/.test(alibabaQuoteCase.studentHook), 'Alibaba quote case must identify its HKEX context before using HKD');
check(nvidiaScaleCase && /USD 500/.test(nvidiaScaleCase.studentHook) && /USD 100/.test(nvidiaScaleCase.studentHook) && !/HK\$|HKD/.test(nvidiaScaleCase.studentHook), 'United States Nvidia comparison must use USD, not HKD');

const expectedUnits = [
  [1, 'Personal Investment Foundations', 1, 8],
  [2, 'Investment Choices for Families', 9, 17],
  [3, 'How Markets Work', 18, 26],
  [4, 'Analysing Companies', 27, 35],
  [5, 'Portfolios and Investor Behaviour', 36, 43],
  [6, 'Family Investment Decisions and Careers', 44, 50],
];

expectedUnits.forEach(([number, title, first, last], index) => {
  const unit = map.units[index];
  check(unit && unit.unit === number, `unit ${number} is missing or out of order`);
  check(unit && unit.title === title, `unit ${number} title must be ${title}`);
  check(unit && unit.lessons[0] === first && unit.lessons[1] === last, `unit ${number} lesson range must be ${first}-${last}`);
  check(unit && nonEmpty(unit.summary) && nonEmpty(unit.unitOutput), `unit ${number} needs a summary and unit output`);
});

const requiredLessonFields = [
  'lesson',
  'unit',
  'unitTitle',
  'caseAnchor',
  'caseRole',
  'guidingQuestion',
  'guidingQuestionZh',
  'studentHook',
  'retrievalBase',
  'newKnowledge',
  'evidenceTask',
  'avoidOverlap',
  'misconception',
  'studentOutput',
  'futureReuse',
  'coreClaim',
  'formulaOrNoFormula',
  'formativeAssessment',
  'exitTicket',
];

const requiredDecisionFields = [
  'starterDilemma',
  'firstJudgementPrompt',
  'likelyNaiveAnswer',
  'missingEvidence',
  'keyIdea',
  'tryIt',
  'misconceptionCheck',
  'exitJudgement',
];

const questions = new Set();

map.lessons.forEach((lesson, index) => {
  const label = `lesson ${index + 1}`;
  check(lesson.lesson === index + 1, `${label} number is missing or out of sequence`);
  requiredLessonFields.forEach((field) => check(nonEmpty(lesson[field]) || Number.isInteger(lesson[field]), `${label} is missing ${field}`));
  check(!questions.has(lesson.guidingQuestion), `${label} repeats a guiding question`);
  questions.add(lesson.guidingQuestion);

  const unit = map.units.find((candidate) => candidate.unit === lesson.unit);
  check(unit && lesson.lesson >= unit.lessons[0] && lesson.lesson <= unit.lessons[1], `${label} is outside its unit range`);
  check(unit && lesson.unitTitle === unit.title, `${label} unit title does not match the unit map`);
  check(lesson.semester === (lesson.lesson <= 26 ? 1 : 2), `${label} semester assignment is incorrect`);

  check(Array.isArray(lesson.objectives) && lesson.objectives.length === 3, `${label} must define exactly three objectives`);
  check(Array.isArray(lesson.terms) && lesson.terms.length >= 3, `${label} must define at least three terms`);
  (lesson.terms || []).forEach((term) => {
    check(nonEmpty(term.term) && nonEmpty(term.zh) && nonEmpty(term.definition), `${label} has an incomplete bilingual term`);
  });

  check(lesson.decisionFirst && typeof lesson.decisionFirst === 'object', `${label} is missing decisionFirst`);
  requiredDecisionFields.forEach((field) => check(lesson.decisionFirst && nonEmpty(lesson.decisionFirst[field]), `${label} decisionFirst is missing ${field}`));
  check(Array.isArray(lesson.simpleFlow) && lesson.simpleFlow.map((step) => step.label).join('|') === 'Hook|Key idea|Try it|Decide', `${label} must use Hook, Key idea, Try it, Decide`);
  check(lesson.retrievalPractice && lesson.retrievalPractice.yesNo && lesson.retrievalPractice.multipleChoice && lesson.retrievalPractice.matching, `${label} is missing retrieval practice`);
  check(lesson.worksheet && lesson.worksheet.evidenceAndDataAnalysis && lesson.worksheet.evidenceAndDataAnalysis.questions.length === 5, `${label} must define a five-question evidence worksheet`);
  check(lesson.sourcePack && lesson.sourcePack.noLivePriceDependency === true, `${label} must forbid live-price dependency`);
  check(lesson.assessmentBlueprint && nonEmpty(lesson.assessmentBlueprint.judgementRequirement), `${label} is missing the assessment judgement`);
  check(lesson.artifactBlueprint && lesson.artifactBlueprint.deckArc.length === 6, `${label} must define a six-stage deck arc`);
  check(lesson.investmentAction && nonEmpty(lesson.investmentAction.studentAction), `${label} is missing a practical investment action`);
});

const publicScope = [
  ...map.units.map((unit) => `${unit.title} ${unit.summary}`),
  ...map.lessons.map((lesson) => `${lesson.guidingQuestion} ${lesson.coreClaim}`),
].join('\n');

[
  /budgeting/i,
  /payslip/i,
  /consumer credit/i,
  /insurance administration/i,
  /tax administration/i,
].forEach((pattern) => check(!pattern.test(publicScope), `public lesson scope contains rejected general-finance topic ${pattern}`));

check(map.generatorAccess && /financial-decisions/.test(map.generatorAccess.cli), 'generator access must expose the financial-decisions selector');
check(map.practicalInvestingBoundary && map.practicalInvestingBoundary.excluded.includes('personalised financial advice'), 'course boundary must exclude personalised financial advice');
check(map.generatorAccess.rules.some((rule) => /real family account data/i.test(rule)), 'generator rules must forbid real family account data');

check(fs.existsSync(pagePath), 'readable syllabus page is missing');
if (fs.existsSync(pagePath)) {
  const page = fs.readFileSync(pagePath, 'utf8');
  check(/<h1>Investment and Financial Decision-Making<\/h1>/.test(page), 'syllabus page title is missing');
  check(/Personal Wealth, Markets and Analysis/.test(page), 'syllabus page subtitle is missing');
  check(/This two-semester course covers investment goals, asset classes, stock markets, company analysis, portfolio management, family investment decisions and finance careers\./.test(page), 'syllabus page must use the factual course introduction');
  check(!/Investment is not simply choosing a stock|Students learn to make informed investment decisions/.test(page), 'syllabus page still contains the former promotional introduction');
  check(/investment-teaching-disclosure/.test(page), 'teaching details must use progressive disclosure');
  check(/investment-author-disclosure" id="lesson-generator-table"/.test(page), 'generator table must use progressive disclosure');
  check(/investment-author-disclosure" id="generator-access"/.test(page), 'generator access must use progressive disclosure');
  check(/course-map-financial-decisions-data\.js/.test(page), 'syllabus page must load the active course data file');
  check(/course-map-render\.js/.test(page), 'syllabus page must load the shared renderer');
  check(/data-course-map-generator-rows/.test(page), 'syllabus page must render the generator table');
  check(/data-course-map-lesson-grid/.test(page), 'syllabus page must render lesson cards');
  check(/unit-1\/passport\.html/.test(page), 'syllabus page must link the Unit 1 Passport');
  check(/No budgeting, payslips, consumer credit/.test(page), 'syllabus page must state the rejected general-finance boundary');
}

check(fs.existsSync(homePath), 'investment course landing page is missing');
if (fs.existsSync(homePath)) {
  const home = fs.readFileSync(homePath, 'utf8');
  check(/class="investment-home landing-page simplified-landing"/.test(home), 'investment landing page must use the simplified layout');
  check(/Learn how goals, risk, markets, companies and portfolios shape evidence-based investment decisions for families\./.test(home), 'investment landing page must use the current goal-first course introduction');
  check(/unit-1\/passport\.html/.test(home), 'investment landing page must link the Unit 1 Passport');
  check(!/investment-status-panel|investment-card-grid/.test(home), 'investment landing page still contains a duplicated status panel or card grid');
}

check(fs.existsSync(passportPath), 'Unit 1 Passport booklet page is missing');
check(fs.existsSync(passportRenderPath), 'Unit 1 Passport renderer is missing');
check(fs.existsSync(passportCssPath), 'Unit 1 Passport print stylesheet is missing');

if (fs.existsSync(passportPath)) {
  const passportPage = fs.readFileSync(passportPath, 'utf8');
  check(/data-passport-document/.test(passportPage), 'Passport page must provide the booklet mount point');
  check(/course-map-financial-decisions-data\.js/.test(passportPage), 'Passport page must load the canonical financial-decisions map');
  check(/passport-render\.js/.test(passportPage), 'Passport page must load its renderer');
  check(/investment-passport\.css/.test(passportPage), 'Passport page must load its print stylesheet');
}

if (fs.existsSync(passportRenderPath)) {
  const passportRender = fs.readFileSync(passportRenderPath, 'utf8');
  check(/data-passport-lesson/.test(passportRender), 'Passport renderer must mark each lesson page for verification');
  check(/checkpoints\.length !== 8/.test(passportRender), 'Passport renderer must fail closed unless exactly eight checkpoints load');
  check(/Teacher-private/.test(passportRender), 'Passport renderer must include private teacher review panels');
  check(/<table class="passport-task-table"/.test(passportRender) && /passport-task-row/.test(passportRender), 'Passport renderer must use one four-row task table per lesson');
  check(!/passport-response-grid|passport-answer-type/.test(passportRender), 'Passport renderer must not restore the former card grid or repeated answer-type panels');
  check(/passport-option/.test(passportRender) && /passport-sentence-frame/.test(passportRender), 'Passport renderer must display finite choices and sentence frames');
}

if (fs.existsSync(passportCssPath)) {
  const passportCss = fs.readFileSync(passportCssPath, 'utf8');
  check(/@page\s*{[\s\S]*?size:\s*A4/i.test(passportCss), 'Passport stylesheet must define A4 print output');
  check(/height:\s*297mm/.test(passportCss) && /width:\s*210mm/.test(passportCss), 'Passport stylesheet must size each page to A4');
  check(/break-after:\s*page/.test(passportCss) && /page-break-after:\s*always/.test(passportCss), 'Passport stylesheet must force one printed page per lesson');
  check(/\.passport-task-table/.test(passportCss) && /table-layout:\s*fixed/.test(passportCss), 'Passport stylesheet must use a stable full-page table layout');
  check(/\.passport-option::before/.test(passportCss), 'Passport stylesheet must visibly distinguish tick choices');
}

[1, 2].forEach((lessonNumber) => {
  const lessonSlidesPath = path.join(root, 'investment-analysis', 'unit-1', `lesson-${lessonNumber}`, 'slides.js');
  const lessonSlides = fs.readFileSync(lessonSlidesPath, 'utf8');
  check((lessonSlides.match(/eyebrow:\s*"Passport Update"/g) || []).length === 1, `lesson ${lessonNumber} must contain exactly one Passport Update slide`);
  check(new RegExp(`passportUrl: "\\.\\.\\/passport\\.html#lesson-${lessonNumber}"`).test(lessonSlides), `lesson ${lessonNumber} must link its matching Passport page`);
  check(/Opening minute:/.test(lessonSlides), `lesson ${lessonNumber} must include the private opening-minute teacher note`);
  check(/Use the four-row table:/.test(lessonSlides), `lesson ${lessonNumber} Passport Update slide must tell students how to use the one-table layout`);
});

const generatorMap = generator.loadCourseMap('financial-decisions');
check(generatorMap.syllabusKey === 'financial-decisions', 'generator selector did not load the candidate map');
check(generatorMap.lessons.length === 50, 'generator selector must expose fifty active lessons');
const defaultGeneratorMap = generator.loadCourseMap('default');
check(defaultGeneratorMap.syllabusKey === 'financial-decisions', 'default generator selector must load the active financial-decisions map');
const courseContext = generator.getCourseGeneratorContext('financial-decisions');
check(courseContext.course.courseTitle === map.courseTitle, 'course generator context title does not match the candidate map');
check(courseContext.course.currencyRule === map.currencyRule, 'course generator context must expose the currency rule');
check(courseContext.course.personalPassportPilot.bookletRoute === passport.bookletRoute, 'course generator context must expose the Passport pilot');
check(courseContext.generationRules.includes(map.currencyRule), 'generation rules must include the country- and transaction-matched currency rule');
check(courseContext.lessons.length === 50, 'course generator context must expose fifty active lesson summaries');
const lessonContext = generator.getLessonMaterialContext(50, 'deck', generatorMap);
check(lessonContext.lesson.guidingQuestion === map.lessons[49].guidingQuestion, 'lesson 50 deck context does not match the active map');
const passportLessonContext = generator.getLessonMaterialContext(1, 'deck', generatorMap);
check(passportLessonContext.lesson.passportCheckpoint.title === 'My future goals', 'lesson 1 generator context must expose its Passport checkpoint');
check(passportLessonContext.requiredInputs.artifactContract.personalPassportPilot.bookletRoute === passport.bookletRoute, 'lesson artifact contract must expose the shared Passport route');
const nonPassportLessonContext = generator.getLessonMaterialContext(9, 'deck', generatorMap);
check(nonPassportLessonContext.lesson.passportCheckpoint === null, 'lesson 9 generator context must remain outside the Passport pilot');

const cli = spawnSync(
  process.execPath,
  [
    path.join(root, 'scripts', 'export-investment-generator-context.js'),
    '--syllabus',
    'financial-decisions',
    '--lesson',
    '1',
    '--target',
    'deck',
    '--format',
    'md',
  ],
  { cwd: root, encoding: 'utf8' }
);

check(cli.status === 0, `financial-decisions CLI export failed: ${cli.stderr || cli.stdout}`);
check(/Why do people and families invest\?/.test(cli.stdout), 'CLI export is missing the first candidate guiding question');
check(/Decision-First Contract/.test(cli.stdout), 'CLI export is missing the decision-first contract');
check(/Generation Rules/.test(cli.stdout), 'CLI export is missing generation rules');
check(/My Future Investor Passport/.test(cli.stdout) && /Final five minutes/i.test(cli.stdout), 'CLI export is missing the Lesson 1 Passport checkpoint');
check(/Page layout: One uncluttered two-column table per lesson/.test(cli.stdout), 'CLI export must preserve the Passport one-table layout');
check((cli.stdout.match(/Answer format -/g) || []).length === 4 && /Tick choices:/.test(cli.stdout) && /Sentence frames:/.test(cli.stdout), 'CLI export must preserve all four structured Passport answer formats');
check(/CNY/.test(cli.stdout) && /HKD/.test(cli.stdout) && /USD/.test(cli.stdout), 'CLI export is missing the country- and transaction-matched currency rule');

if (failures.length) {
  console.error('Investment and Financial Decision-Making syllabus validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Investment and Financial Decision-Making syllabus validation passed.');
console.log(`Validated ${map.lessons.length} lessons, ${map.units.length} units and ${map.examCheckpoints.length} checkpoints.`);
