const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const mapPath = path.join(root, 'investment-analysis', 'course-map-financial-decisions-data.js');
const pagePath = path.join(root, 'investment-analysis', 'syllabus.html');
const homePath = path.join(root, 'investment-analysis', 'index.html');
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

function lessonByAnchor(pattern) {
  return map.lessons.find((lesson) => pattern.test(lesson.caseAnchor || ''));
}

const mainlandFamilyCurrencyPattern = /HK\$|HKD|港元/;
const openingFamilyCase = lessonByAnchor(/^Family goal board$/i);
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
  check(/No budgeting, payslips, consumer credit/.test(page), 'syllabus page must state the rejected general-finance boundary');
}

check(fs.existsSync(homePath), 'investment course landing page is missing');
if (fs.existsSync(homePath)) {
  const home = fs.readFileSync(homePath, 'utf8');
  check(/class="investment-home landing-page simplified-landing"/.test(home), 'investment landing page must use the simplified layout');
  check(/The course teaches students to set investment goals, compare asset classes, understand stock markets, analyse companies and portfolios, and evaluate family investment cases\./.test(home), 'investment landing page must use the factual course introduction');
  check(!/investment-status-panel|investment-card-grid/.test(home), 'investment landing page still contains a duplicated status panel or card grid');
}

const generatorMap = generator.loadCourseMap('financial-decisions');
check(generatorMap.syllabusKey === 'financial-decisions', 'generator selector did not load the candidate map');
check(generatorMap.lessons.length === 50, 'generator selector must expose fifty active lessons');
const defaultGeneratorMap = generator.loadCourseMap('default');
check(defaultGeneratorMap.syllabusKey === 'financial-decisions', 'default generator selector must load the active financial-decisions map');
const courseContext = generator.getCourseGeneratorContext('financial-decisions');
check(courseContext.course.courseTitle === map.courseTitle, 'course generator context title does not match the candidate map');
check(courseContext.course.currencyRule === map.currencyRule, 'course generator context must expose the currency rule');
check(courseContext.generationRules.includes(map.currencyRule), 'generation rules must include the country- and transaction-matched currency rule');
check(courseContext.lessons.length === 50, 'course generator context must expose fifty active lesson summaries');
const lessonContext = generator.getLessonMaterialContext(50, 'deck', generatorMap);
check(lessonContext.lesson.guidingQuestion === map.lessons[49].guidingQuestion, 'lesson 50 deck context does not match the active map');

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
check(/CNY/.test(cli.stdout) && /HKD/.test(cli.stdout) && /USD/.test(cli.stdout), 'CLI export is missing the country- and transaction-matched currency rule');

if (failures.length) {
  console.error('Investment and Financial Decision-Making syllabus validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Investment and Financial Decision-Making syllabus validation passed.');
console.log(`Validated ${map.lessons.length} lessons, ${map.units.length} units and ${map.examCheckpoints.length} checkpoints.`);
