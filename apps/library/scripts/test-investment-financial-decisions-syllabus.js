const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const mapPath = path.join(root, 'investment-analysis', 'course-map-financial-decisions-data.js');
const pagePath = path.join(root, 'investment-analysis', 'syllabus.html');
const smgGuidePath = path.join(root, 'investment-analysis', 'stock-market-game-integration.md');
const smgWorkbookGuidePath = path.join(root, 'investment-analysis', 'smg-workbook-course-guide.html');
const smgTeamLogPath = path.join(root, 'investment-analysis', 'smg-team-evidence-log.html');
const lessonTemplatePath = path.join(root, 'investment-analysis', '_template', 'README.md');
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

function loadBrowserData(filePath, expression) {
  const sandbox = { window: { INVEST: {}, IGCSE: {} } };
  vm.runInNewContext(fs.readFileSync(filePath, 'utf8'), sandbox, { filename: filePath });
  return expression({ ...sandbox.window.INVEST, ...sandbox.window.IGCSE });
}

check(map.syllabusKey === 'financial-decisions', 'syllabusKey must be financial-decisions');
check(map.courseTitle === 'Investment and Financial Decision-Making', 'course title is incorrect');
const expectedParentFacingIntroduction = 'Students will develop practical financial skills they can use throughout their lives. They will learn why people invest and how goals, time, risk and possible return shape sensible financial decisions. Students will compare cash, bonds, shares and investment funds, discover how stock markets work and learn to understand basic company information. They will also practise building a balanced mix of investments (a portfolio). The course aims to help students become more confident, thoughtful and responsible when discussing financial choices and prepare for possible careers in finance.';
check(map.courseIntroduction === expectedParentFacingIntroduction, 'course introduction must preserve the approved parent-facing description');
check(Array.isArray(map.units) && map.units.length === 6, 'expected exactly six units');
check(Array.isArray(map.lessons) && map.lessons.length === 32, 'expected exactly thirty-two lessons');
check(Array.isArray(map.examCheckpoints) && map.examCheckpoints.length === 6, 'expected six unit checkpoints');
check(/CNY/.test(map.currencyRule || '') && /HKD/.test(map.currencyRule || '') && /USD/.test(map.currencyRule || ''), 'currency rule must map mainland China, Hong Kong and United States cases to CNY, HKD and USD');
check(map.deliveryModel?.duration === 'one semester', 'course must be one semester');
check(map.deliveryModel?.teachingWeeks === 16 && map.deliveryModel?.lessonsPerWeek === 2 && map.deliveryModel?.plannedLessons === 32, 'course must schedule two lessons per week across sixteen weeks');
check(map.deliveryModel?.acceptedLessonRange?.[0] === 30 && map.deliveryModel?.acceptedLessonRange?.[1] === 35, 'course must preserve the accepted 30-35 lesson range');

check(!Object.prototype.hasOwnProperty.call(map, 'personalPassportPilot'), 'retired Investor Passport contract must not remain in the course map');
check(map.lessons.every((lesson) => !Object.prototype.hasOwnProperty.call(lesson, 'passportCheckpoint')), 'retired Investor Passport checkpoints must not remain on lessons');
function lessonByAnchor(pattern) {
  return map.lessons.find((lesson) => pattern.test(lesson.caseAnchor || ''));
}

const mainlandFamilyCurrencyPattern = /HK\$|HKD|港元/;
const openingFamilyCase = lessonByAnchor(/^Family goal (?:board|table)$/i);
const windfallCase = lessonByAnchor(/^Windfall and suspicious-offer case$/i);
const tradeQuoteCase = lessonByAnchor(/^Trade journey and quote snapshot$/i);
const priceScaleCase = lessonByAnchor(/^Price reaction and company scale$/i);

check(openingFamilyCase && /CNY 50,000/.test(JSON.stringify(openingFamilyCase)) && !mainlandFamilyCurrencyPattern.test(JSON.stringify(openingFamilyCase)), 'opening mainland China family case must use CNY, not HKD');
check(windfallCase && /CNY 500,000/.test(JSON.stringify(windfallCase)) && !mainlandFamilyCurrencyPattern.test(JSON.stringify(windfallCase)), 'mainland China family windfall case must use CNY, not HKD');
check(tradeQuoteCase && /order/i.test(tradeQuoteCase.guidingQuestion) && /quote/i.test(tradeQuoteCase.guidingQuestion), 'compressed market sequence must retain order and quote reading');
check(priceScaleCase && /share price/i.test(priceScaleCase.guidingQuestion) && /company value/i.test(priceScaleCase.guidingQuestion), 'compressed market sequence must retain the share-price versus company-scale distinction');

const expectedUnits = [
  [1, 'Personal Investment Foundations', 1, 7],
  [2, 'Investment Choices for Families', 8, 13],
  [3, 'How Markets Work', 14, 18],
  [4, 'Analysing Companies', 19, 24],
  [5, 'Portfolios and Investor Behaviour', 25, 28],
  [6, 'Family Investment Decisions and Careers', 29, 32],
];

expectedUnits.forEach(([number, title, first, last], index) => {
  const unit = map.units[index];
  check(unit && unit.unit === number, `unit ${number} is missing or out of order`);
  check(unit && unit.title === title, `unit ${number} title must be ${title}`);
  check(unit && unit.lessons[0] === first && unit.lessons[1] === last, `unit ${number} lesson range must be ${first}-${last}`);
  check(unit && nonEmpty(unit.summary) && nonEmpty(unit.unitOutput), `unit ${number} needs a summary and unit output`);
});

const smg = map.stockMarketGameIntegration;
check(smg && smg.status === 'required for every enrolled student', 'Stock Market Game participation must be required for every enrolled student');
check(smg && smg.role === 'core course laboratory and assessment spine', 'Stock Market Game must be the course laboratory and assessment spine');
check(smg && smg.courseStart === '2026-09-01', 'Stock Market Game integration must use the 1 September 2026 course start');
check(smg && Array.isArray(smg.officialSequence) && smg.officialSequence.join('|') === 'Understanding SMG|Before You Invest|Selecting Your Investments|Tracking Your Investments|Reflections', 'Stock Market Game official sequence is incomplete');
check(smg && Array.isArray(smg.phases) && smg.phases.length === 6, 'Stock Market Game integration must define six course phases');
check(smg && /at least 10 shares/i.test(smg.nationalMinimum) && /not sufficient evidence of individual course participation/i.test(smg.nationalMinimum), 'Stock Market Game national minimum must be separated from individual course participation');
check(smg && /Lesson 13/i.test(smg.launchGate && smg.launchGate.timing) && /long stock buy of at least 10 shares/i.test(smg.launchGate && smg.launchGate.qualifyingAction), 'Stock Market Game launch gate must require the controlled first trade after Lesson 13');
check(smg && Array.isArray(smg.classroomRules) && smg.classroomRules.some((rule) => /Long-only/i.test(rule)) && smg.classroomRules.some((rule) => /No margin/i.test(rule)), 'Stock Market Game classroom rules must be long-only and prohibit margin');
check(smg && smg.operatingModel && /35-50% of every lesson/i.test(smg.operatingModel.lessonTimeShare), 'Stock Market Game operating model must reserve a substantial share of every lesson');
check(smg && /official workbook is the default individual work record/i.test(smg.operatingModel && smg.operatingModel.integrationRule), 'Stock Market Game operating model must make the official workbook the default individual work record');
check(smg && /individual workbook entry or activity insert/i.test(smg.operatingModel && smg.operatingModel.lessonEvidenceCadence) && /team decision-log row/i.test(smg.operatingModel.lessonEvidenceCadence), 'Stock Market Game operating model must separate individual work evidence from the authoritative team log');
check(smg && /Only the six unit outputs are summative/i.test(smg.operatingModel && smg.operatingModel.summativeCadence), 'Stock Market Game operating model must separate six summative unit outputs from formative labs');
check(smg && /frozen snapshot/i.test(smg.operatingModel && smg.operatingModel.snapshotRule), 'Stock Market Game operating model must freeze lesson evidence');
check(smg && /no trade quota/i.test(smg.operatingModel && smg.operatingModel.tradingCadence), 'Stock Market Game operating model must allow evidence-based hold and no-trade decisions');
check(smg && Array.isArray(smg.decisionLogFields) && smg.decisionLogFields.length === 8, 'Stock Market Game decision log must define eight concise fields');
check(smg && Array.isArray(smg.unitEvidence) && smg.unitEvidence.length === 6, 'Stock Market Game integration must define one evidence checkpoint per unit');
check(smg && smg.phases.every((phase) => Array.isArray(phase.officialResources) && phase.officialResources.length >= 2), 'Every Stock Market Game phase must point to official local resources');
check(smg && Array.isArray(smg.individualParticipationEvidence) && smg.individualParticipationEvidence.length >= 5, 'Stock Market Game integration needs individual participation evidence');
check(smg && /not portfolio rank or short-term return/i.test(smg.assessmentRule), 'Stock Market Game assessment must not reward rank or return');
check(smg && smg.officialResourceDirectory === 'investment-analysis/references/stock-market-game/README.md', 'Stock Market Game official resource directory is missing');
check(smg && smg.workbook && smg.workbook.pages === 55 && /every student/i.test(smg.workbook.distribution), 'The complete 55-page SMG Essentials Workbook must be issued to every student');
check(smg && smg.workbook && Array.isArray(smg.workbook.sessions) && smg.workbook.sessions.length === 10, 'Workbook integration must map all ten official sessions');
check(smg && smg.workbook && smg.workbook.lessonPlan && Object.keys(smg.workbook.lessonPlan).length >= 20, 'Workbook integration must define a substantial lesson page calendar');
check(smg && smg.workbook && Array.isArray(smg.workbook.courseRules) && smg.workbook.courseRules.some((rule) => /never record a password/i.test(rule)), 'Workbook course rules must protect passwords');
check(smg && smg.workbook && smg.workbook.courseRules.some((rule) => /buy, purchase or enter a trade/i.test(rule)), 'Workbook course rules must override automatic trade instructions');
check(smg && smg.workbook && /smg-workbook-course-guide\.html/.test(smg.workbook.studentGuide) && /smg-team-evidence-log\.html/.test(smg.workbook.teamLog), 'Workbook integration must expose the printable guide and authoritative team log');
if (smg && smg.workbook && smg.workbook.lessonPlan) {
  const coveredPages = new Set();
  Object.values(smg.workbook.lessonPlan).forEach((item) => {
    const label = String(item.pages || '');
    const ranges = label.match(/\d+(?:-\d+)?/g) || [];
    ranges.forEach((range) => {
      const [start, end = start] = range.split('-').map(Number);
      for (let page = start; page <= end; page += 1) coveredPages.add(page);
    });
  });
  check(Array.from({ length: 55 }, (_, index) => index + 1).every((page) => coveredPages.has(page)), 'Workbook lesson plan must assign or revisit every page from 1 to 55');
}
check(/SMG Essentials Workbook/i.test(map.writtenArtifactRule) && /team decision log remains the authoritative/i.test(map.writtenArtifactRule), 'The written-artifact rule must make the workbook primary and the team log authoritative');
const knowledgeHandoutKeys = 'definitions|numberedRevisionPoints';
check(Array.isArray(map.handoutContract) && map.handoutContract.map((item) => item.key).join('|') === knowledgeHandoutKeys, 'Lesson handouts must use definitions and numbered revision points');

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
  check(lesson.semester === 1, `${label} must remain in the single active semester`);

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
  check(lesson.caseReview?.status === (lesson.publishedRoutes ? 'published and source-verified' : 'planned'), `${label} case review status must match its publication state`);
  check(lesson.assessmentBlueprint && nonEmpty(lesson.assessmentBlueprint.judgementRequirement), `${label} is missing the assessment judgement`);
  check(lesson.artifactBlueprint && lesson.artifactBlueprint.deckArc.length === 6, `${label} must define a six-stage deck arc`);
  check(lesson.investmentAction && nonEmpty(lesson.investmentAction.studentAction), `${label} is missing a practical investment action`);
  check(lesson.stockMarketGame && lesson.stockMarketGame.required === true, `${label} is missing its required Stock Market Game action`);
  check(lesson.stockMarketGame && lesson.stockMarketGame.central === true, `${label} must use Stock Market Game as a central course lab`);
  check(lesson.stockMarketGame && Number.isInteger(lesson.stockMarketGame.phase) && lesson.stockMarketGame.phase === lesson.unit, `${label} Stock Market Game phase must match its unit`);
  check(lesson.stockMarketGame && nonEmpty(lesson.stockMarketGame.officialStage) && nonEmpty(lesson.stockMarketGame.studentAction) && nonEmpty(lesson.stockMarketGame.requiredEvidence), `${label} has incomplete Stock Market Game guidance`);
  check(lesson.stockMarketGame && ['summative unit output', 'formative evidence checkpoint', 'required formative course lab'].includes(lesson.stockMarketGame.integrationLevel), `${label} has an invalid Stock Market Game integration level`);
  check(lesson.stockMarketGame && nonEmpty(lesson.stockMarketGame.lessonUse), `${label} is missing Stock Market Game workload guidance`);
  check(lesson.stockMarketGame && nonEmpty(lesson.stockMarketGame.requiredOutput) && nonEmpty(lesson.stockMarketGame.dataRule), `${label} is missing Stock Market Game evidence or snapshot guidance`);
  check(lesson.stockMarketGame && lesson.stockMarketGame.workbook && nonEmpty(lesson.stockMarketGame.workbook.pages) && nonEmpty(lesson.stockMarketGame.workbook.studentAction), `${label} is missing its workbook or concise-insert assignment`);
  check(lesson.writtenRecord && nonEmpty(lesson.writtenRecord.primaryArtifact) && nonEmpty(lesson.writtenRecord.supplementRule) && /authoritative/i.test(lesson.writtenRecord.authoritativeTeamRecord), `${label} is missing the workbook-first written-record contract`);
  check(Array.isArray(lesson.handoutSections) && lesson.handoutSections.map((section) => section.key).join('|') === knowledgeHandoutKeys, `${label} must use the two-block exam-revision handout`);
  const definitionSection = lesson.handoutSections.find((section) => section.key === 'definitions');
  check(definitionSection?.bilingual === true && definitionSection?.fillInTheBlanks === true && /Simplified Chinese/i.test(definitionSection?.translationRule || ''), `${label} definitions must be bilingual fill-in-the-blank content`);
  const revisionPoints = lesson.handoutSections.find((section) => section.key === 'numberedRevisionPoints')?.content || [];
  check(Array.isArray(revisionPoints) && revisionPoints.length >= 4 && revisionPoints.length <= 7 && revisionPoints.every(nonEmpty), `${label} must provide four to seven numbered revision points`);
  const revisionSection = lesson.handoutSections.find((section) => section.key === 'numberedRevisionPoints');
  check(revisionSection?.bilingual === true && /Simplified Chinese/i.test(revisionSection?.translationRule || ''), `${label} numbered revision points must require bilingual output`);
  check(!/(task|prompt|expectedStudentWork)/i.test(JSON.stringify(lesson.handoutSections)), `${label} knowledge handout must not contain tasks, prompts or expected student work`);
});

check(map.lessons.filter((lesson) => lesson.stockMarketGame.milestone).length === 6, 'Stock Market Game integration must use exactly six summative unit outputs');
check(map.lessons.filter((lesson) => lesson.stockMarketGame.evidenceCheckpoint).length === 9, 'Stock Market Game integration must use exactly nine formative evidence checkpoints');
check(map.lessons.slice(0, 12).every((lesson) => !/complete the qualifying long stock purchase|enter one teacher-approved long stock buy/i.test(lesson.stockMarketGame.studentAction)), 'Lessons 1-12 must not enter the first live order');
check(/qualifying long stock purchase/i.test(map.lessons[12].stockMarketGame.studentAction), 'Lesson 13 must contain the first qualifying order');
check(new Set(map.lessons.map((lesson) => lesson.stockMarketGame.studentAction)).size === 32, 'Every lesson must have a distinct Stock Market Game core-lab action');
check(map.units.every((unit) => /SMG/i.test(unit.unitOutput)), 'Every unit output must be explicitly built around Stock Market Game evidence');

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
check(map.generatorAccess.targets.some((target) => target.key === 'activity-insert'), 'generator access must expose the missing-evidence activity-insert target');
check(map.practicalInvestingBoundary && map.practicalInvestingBoundary.excluded.includes('personalised financial advice'), 'course boundary must exclude personalised financial advice');
check(map.generatorAccess.rules.some((rule) => /real family account data/i.test(rule)), 'generator rules must forbid real family account data');

check(fs.existsSync(pagePath), 'readable syllabus page is missing');
if (fs.existsSync(pagePath)) {
  const page = fs.readFileSync(pagePath, 'utf8');
  check(/<h1>Investment and Financial Decision-Making[\s\S]*投资与财务决策[\s\S]*<\/h1>/.test(page), 'syllabus page must use a bilingual course title');
  check(/Goals, evidence, markets and portfolios[\s\S]*目标、证据、市场与投资组合/.test(page), 'syllabus page must use the bilingual student-facing subtitle');
  check(/Learn how to make and defend investment decisions[\s\S]*学习如何作出并论证投资决策/.test(page), 'syllabus page must use the concise bilingual course introduction');
  check(!/Investment is not simply choosing a stock|Students learn to make informed investment decisions/.test(page), 'syllabus page still contains the former promotional introduction');
  check(/investment-teaching-disclosure/.test(page), 'teaching details must use progressive disclosure');
  check(/investment-author-disclosure" id="lesson-generator-table"/.test(page), 'generator table must use progressive disclosure');
  check(/investment-author-disclosure" id="generator-access"/.test(page), 'generator access must use progressive disclosure');
  check(/course-map-financial-decisions-data\.js/.test(page), 'syllabus page must load the active course data file');
  check(/course-map-render\.js/.test(page), 'syllabus page must load the shared renderer');
  check(/data-course-map-generator-rows/.test(page), 'syllabus page must render the generator table');
  check(/data-course-map-lesson-grid/.test(page), 'syllabus page must render lesson cards');
  check(!/passport/i.test(page), 'syllabus page must not retain the retired Investor Passport');
  check(/id="stock-market-game"/.test(page), 'syllabus page must expose the required Stock Market Game section');
  check(/Every student participates and contributes evidence[\s\S]*每位学生都必须参加/.test(page), 'syllabus page must state required participation bilingually');
  check(/One semester · 32 lessons/.test(page), 'syllabus page must state the one-semester 32-lesson delivery model');
  check(/Two lessons per week/.test(page), 'syllabus page must state the two-lessons-per-week cadence');
  check(/First trade after Lesson 13/.test(page), 'syllabus page must state the controlled first-trade gate');
  check(/Process, not rank or return/.test(page), 'syllabus page must state the Stock Market Game assessment rule');
  check(/data-stock-market-game-phases/.test(page), 'syllabus page must render the six Stock Market Game phases');
  check(/data-stock-market-game-unit-evidence/.test(page), 'syllabus page must render the six Stock Market Game evidence checkpoints');
  check(/Workbook and team decision log[\s\S]*学习手册与团队决策记录/.test(page), 'syllabus page must state the student record model bilingually');
  check(/The complete workbook stays in the course/.test(page), 'syllabus page must explain that the entire workbook remains in use');
  check(/data-stock-market-game-workbook-sessions/.test(page), 'syllabus page must render all workbook sessions');
  check(/smg-workbook-course-guide\.html/.test(page) && /smg-team-evidence-log\.html/.test(page), 'syllabus page must link both printable workbook operating artifacts');
  check(/One evidence trail, six assessed outputs/.test(page), 'syllabus page must state the cumulative Stock Market Game evidence model');
  check(/stock-market-game-integration\.md/.test(page), 'syllabus page must link the Stock Market Game implementation guide');
  check(/references\/stock-market-game\/README\.md/.test(page), 'syllabus page must link the official Stock Market Game archive');
  check(/No budgeting, payslips, consumer credit/.test(page), 'syllabus page must state the rejected general-finance boundary');
}

check(fs.existsSync(smgGuidePath), 'Stock Market Game implementation guide is missing');
if (fs.existsSync(smgGuidePath)) {
  const guide = fs.readFileSync(smgGuidePath, 'utf8');
  check(/Every lesson has a required, concept-specific SMG application/i.test(guide), 'Stock Market Game guide must define the every-lesson core lab');
  check(/roughly 35-50% of each lesson/i.test(guide), 'Stock Market Game guide must define a substantial lesson-time share');
  check(/there is no trading quota/i.test(guide), 'Stock Market Game guide must allow evidence-based hold and no-trade decisions');
  check(/## Six assessed SMG outputs/.test(guide), 'Stock Market Game guide must map unit evidence');
  check(/## Six summative outputs and formative evidence checkpoints/.test(guide), 'Stock Market Game guide must distinguish unit outputs from checkpoints');
  check(/Every other lesson also has a required formative SMG core lab/i.test(guide), 'Stock Market Game guide must make all non-summative labs required');
  check(/Print and issue the complete 55-page SMG Essentials Workbook to every student/i.test(guide), 'Stock Market Game guide must require full-workbook distribution');
  check(/## Workbook course rules/.test(guide) && /## Workbook page calendar/.test(guide), 'Stock Market Game guide must contain the course overrides and page calendar');
  check(/shared team decision log is authoritative/i.test(guide), 'Stock Market Game guide must keep the team decision log authoritative');
}

check(fs.existsSync(smgWorkbookGuidePath), 'printable SMG workbook course guide is missing');
if (fs.existsSync(smgWorkbookGuidePath)) {
  const guide = fs.readFileSync(smgWorkbookGuidePath, 'utf8');
  check(/data-workbook-rules/.test(guide) && /data-workbook-calendar/.test(guide), 'workbook guide must render canonical course rules and the lesson page calendar');
  check(/Open official workbook/.test(guide) && /smg-team-evidence-log\.html/.test(guide), 'workbook guide must link the official workbook and authoritative team log');
}

check(fs.existsSync(smgTeamLogPath), 'printable authoritative SMG team evidence log is missing');
if (fs.existsSync(smgTeamLogPath)) {
  const log = fs.readFileSync(smgTeamLogPath, 'utf8');
  ['Decision date', 'Student and role', 'Dated evidence', 'Plan and risk fit', 'Team decision', 'Platform result', 'Review trigger'].forEach((field) => {
    check(log.includes(field), `SMG team evidence log is missing ${field}`);
  });
  check(/Never write a password/i.test(log), 'SMG team evidence log must protect passwords');
}

check(fs.existsSync(lessonTemplatePath), 'investment lesson template guidance is missing');
if (fs.existsSync(lessonTemplatePath)) {
  const template = fs.readFileSync(lessonTemplatePath, 'utf8');
  check(/shared Economics presentation system/i.test(template) && /window\.IGCSE\.lesson/.test(template), 'lesson template must make the Economics slide generator canonical');
  check(/Stock Market Game evidence checkpoint/i.test(template), 'lesson template must build the required Stock Market Game evidence checkpoint into the classroom rhythm');
  check(/four-page, monochrome, print-legible bilingual exam-revision sheet/i.test(template), 'lesson template must preserve the four-page monochrome handout contract');
  check(/at least 10 pt throughout/i.test(template), 'lesson template must preserve the minimum print font size');
  check(/complete, self-contained definitions; do not use fill-in-the-blank or cloze definitions/i.test(template), 'lesson template must require self-contained definitions without cloze formatting');
  check(/structured grids to compare nearby concepts/i.test(template), 'lesson template must require structured comparison grids');
  check(/always translate difficult financial and economic terminology/i.test(template), 'lesson template must preserve consistent Chinese support for difficult terminology');
  check(/students may keep the handout on their desks/i.test(template), 'lesson template must keep projected slides complementary to the handout');
}

check(fs.existsSync(homePath), 'investment course landing page is missing');
if (fs.existsSync(homePath)) {
  const home = fs.readFileSync(homePath, 'utf8');
  check(/class="bg-ambient course-home investment-course-home"/.test(home) && /assets\/css\/course-home\.css/.test(home), 'investment landing page must use the shared course layout');
  check(/<h1[^>]*>Investment and finance<\/h1>[\s\S]*投资与金融/.test(home), 'investment landing page must use the consistent bilingual course title');
  check(/lessons\/1-1-2-measuring-investment-return\/index\.html/.test(home) && /lessons\/1-1-3-compound-growth\/index\.html/.test(home), 'investment landing page must expose both current HTML lessons');
  check(!/unit-1\/lesson-[123]\/index\.html/.test(home), 'investment landing page must not expose the older platform-native lessons');
  check(!/passport/i.test(home), 'investment landing page must not retain the retired Investor Passport');
  check(/syllabus-2026-27\.html/.test(home), 'investment landing page must expose the current 2026/27 syllabus');
  check(!/smg-workbook-course-guide\.html|smg-team-evidence-log\.html/.test(home), 'investment landing page must not expose resources from the older course sequence');
  check(!/stock-market-game-integration\.md/.test(home), 'investment landing page must not expose the teacher implementation guide as a primary student route');
  check(!/investment-status-panel|investment-card-grid/.test(home), 'investment landing page still contains a duplicated status panel or card grid');
}

check(!fs.existsSync(path.join(root, 'investment-analysis', 'unit-1', 'passport.html')), 'retired Investor Passport page must be removed');
check(!fs.existsSync(path.join(root, 'investment-analysis', 'unit-1', 'passport-render.js')), 'retired Investor Passport renderer must be removed');
check(!fs.existsSync(path.join(root, 'assets', 'css', 'investment-passport.css')), 'retired Investor Passport stylesheet must be removed');
[1, 2, 3].forEach((lessonNumber) => {
  const lessonSlidesPath = path.join(root, 'investment-analysis', 'unit-1', `lesson-${lessonNumber}`, 'slides.js');
  const lessonQuizPath = path.join(root, 'investment-analysis', 'unit-1', `lesson-${lessonNumber}`, 'quiz.js');
  const lessonSlides = fs.readFileSync(lessonSlidesPath, 'utf8');
  const lessonData = loadBrowserData(lessonSlidesPath, (invest) => invest.lesson);
  const quizData = loadBrowserData(lessonQuizPath, (invest) => invest.quiz);
  const handoutSource = lessonSlides.match(/handout:\s*\{([\s\S]*?)\n\s*slides:\s*\[/)?.[1] || '';
  check(!/passport/i.test(lessonSlides), `lesson ${lessonNumber} must not retain the retired Investor Passport`);
  if (lessonNumber === 1) {
    check(!handoutSource, 'lesson 1 uses the separate four-page handout and should not duplicate it inside the deck source');
    check(lessonData.meta?.subject === 'economics', 'lesson 1 must declare the canonical Economics presentation subject');
  } else {
    check(lessonData.slides.some((slide) => slide.eyebrow === 'SMG core lab'), `lesson ${lessonNumber} must contain a visible SMG core-lab slide`);
    check(lessonSlides.includes(map.lessons[lessonNumber - 1].stockMarketGame.studentAction), `lesson ${lessonNumber} deck must use the exact canonical SMG action`);
    check(/team evidence row/i.test(lessonSlides) && /individual exit/i.test(lessonSlides), `lesson ${lessonNumber} SMG lab must produce team and individual evidence`);
    const handoutSections = lessonData.handout?.sections || [];
    const handoutBlocks = handoutSections.flatMap((section) => section.blocks || []);
    check(handoutSections.length === 2 && /key definitions/i.test(handoutSections[0]?.title || '') && /numbered revision points/i.test(handoutSections[1]?.title || ''), `lesson ${lessonNumber} handout must contain definitions and numbered revision points`);
    check(handoutBlocks.filter((block) => block.type === 'bilingualDefinitions').length === 1 && handoutBlocks.filter((block) => block.type === 'bilingualNumberedKnowledge').length === 1, `lesson ${lessonNumber} handout must render bilingual definitions and one bilingual numbered revision list`);
    const expectedDefinitionCount = map.lessons[lessonNumber - 1].terms.length;
    const handoutDefinitions = handoutBlocks.find((block) => block.type === 'bilingualDefinitions')?.items || [];
    check(handoutDefinitions.length === expectedDefinitionCount && handoutDefinitions.every((item) => item.termZh && item.definition && item.definitionZh && !item.prompt && !item.answers), `lesson ${lessonNumber} handout must contain complete definitions with canonical Chinese support and no cloze fields`);
    check(!/type:\s*"(?:scenario|prompts|table|calculation|writing|sentence|cases|terms)"/.test(handoutSource), `lesson ${lessonNumber} handout must not contain tasks or response blocks`);
    check(!/Workbook pp\.|team-log row|lines:\s*\d/i.test(handoutSource), `lesson ${lessonNumber} handout must not contain workbook directions, team-log instructions or writing lines`);
    check(lessonData.stockMarketGame.integrationLevel === map.lessons[lessonNumber - 1].stockMarketGame.integrationLevel, `lesson ${lessonNumber} deck must use the canonical SMG assessment level`);
    check(/Lesson 13 launch gate/.test(lessonData.stockMarketGame.dataRule), `lesson ${lessonNumber} deck must preserve the Lesson 13 first-trade gate`);
    const smgShare = Number.parseInt(lessonData.meta?.deliveryPlan?.phaseShares?.smgCoreLab, 10);
    check(smgShare >= 35 && smgShare <= 50, `lesson ${lessonNumber} must reserve 35-50% of delivery time for the SMG core lab`);
    check(Array.isArray(lessonData.meta?.deliveryPlan?.optionalReinforcementSlides) && lessonData.meta.deliveryPlan.optionalReinforcementSlides.length >= 2 && lessonData.meta.deliveryPlan.optionalReinforcementSlides.length <= 3, `lesson ${lessonNumber} must name two or three optional reinforcement slides`);
    check(lessonData.meta.deliveryPlan.optionalReinforcementSlides.every((title) => lessonData.slides.some((slide) => slide.title === title)), `lesson ${lessonNumber} delivery plan names a missing optional slide`);
  }
  const multipleChoice = quizData.questions.filter((question) => question.type === 'multipleChoice');
  const answerCounts = [0, 1, 2, 3].map((answer) => multipleChoice.filter((question) => question.answer === answer).length);
  check(multipleChoice.length === (lessonNumber === 1 ? 8 : 10), `lesson ${lessonNumber} quiz must contain the expected multiple-choice retrieval questions`);
  check(Math.max(...answerCounts) - Math.min(...answerCounts) <= 1, `lesson ${lessonNumber} quiz answer positions must be evenly balanced`);
  check(new Set(multipleChoice.map((question) => question.answer)).size === 4, `lesson ${lessonNumber} quiz must use every answer position`);
});

const generatorMap = generator.loadCourseMap('financial-decisions');
check(generatorMap.syllabusKey === 'financial-decisions', 'generator selector did not load the candidate map');
check(generatorMap.lessons.length === 32, 'generator selector must expose thirty-two active lessons');
const defaultGeneratorMap = generator.loadCourseMap('default');
check(defaultGeneratorMap.syllabusKey === 'financial-decisions', 'default generator selector must load the active financial-decisions map');
const courseContext = generator.getCourseGeneratorContext('financial-decisions');
check(courseContext.course.courseTitle === map.courseTitle, 'course generator context title does not match the candidate map');
check(courseContext.course.deliveryModel?.plannedLessons === 32 && courseContext.course.deliveryModel?.lessonsPerWeek === 2, 'course generator context must expose the one-semester delivery model');
check(courseContext.course.currencyRule === map.currencyRule, 'course generator context must expose the currency rule');
check(courseContext.course.stockMarketGameIntegration.status === 'required for every enrolled student', 'course generator context must expose required Stock Market Game participation');
check(courseContext.course.stockMarketGameIntegration.workbook.pages === 55, 'course generator context must expose the complete workbook contract');
check(courseContext.lessons.every((lesson) => lesson.stockMarketGame && lesson.stockMarketGame.required === true), 'course generator context must expose every lesson Stock Market Game action');
check(courseContext.generationRules.includes(map.currencyRule), 'generation rules must include the country- and transaction-matched currency rule');
check(courseContext.lessons.length === 32, 'course generator context must expose thirty-two active lesson summaries');
const lessonContext = generator.getLessonMaterialContext(32, 'deck', generatorMap);
check(lessonContext.lesson.guidingQuestion === map.lessons[31].guidingQuestion, 'lesson 32 deck context does not match the active map');
const firstLessonContext = generator.getLessonMaterialContext(1, 'deck', generatorMap);
check(firstLessonContext.lesson.stockMarketGame.phase === 1, 'lesson generator context must expose the Lesson 1 Stock Market Game phase');
check(firstLessonContext.lesson.stockMarketGame.workbook.pages === 'Lesson 1 handout', 'lesson generator context must expose the integrated Lesson 1 handout');
check(firstLessonContext.materialTarget.label === 'Lesson deck', 'deck target label must remain a lesson deck');
const firstHandoutContext = generator.getLessonMaterialContext(1, 'handout', generatorMap);
check(firstHandoutContext.materialTarget.label === 'Bilingual exam revision handout', 'financial-decisions handout target must be a bilingual exam revision handout');
check(firstHandoutContext.generationRules.some((rule) => /Exclude workbook page directions.*questions.*writing lines/i.test(rule)), 'knowledge handout generator must exclude student tasks and response spaces');
check(!firstHandoutContext.generatorBrief.evidenceTask && !firstHandoutContext.generatorBrief.studentOutput && !firstHandoutContext.requiredInputs.evidenceContract.worksheet && !firstHandoutContext.requiredInputs.assessmentContract, 'knowledge handout generator context must not expose activity, worksheet or assessment prompts');
const missingEvidenceInsert = generator.getLessonMaterialContext(14, 'activity-insert', generatorMap);
check(missingEvidenceInsert.applicable === true, 'Lesson 14 must expose a one-page activity insert because no official workbook pages are assigned');
check(missingEvidenceInsert.materialTarget.output === 'one-page activity insert filed with the SMG workbook', 'activity-insert target must define the canonical filing location');
const assignedWorkbookInsert = generator.getLessonMaterialContext(4, 'activity-insert', generatorMap);
check(assignedWorkbookInsert.applicable === false && /do not generate a duplicate insert/i.test(assignedWorkbookInsert.applicabilityReason), 'Lesson 4 must reject a duplicate activity insert because workbook pages are assigned');
check(!/passport/i.test(JSON.stringify(firstLessonContext)), 'lesson generator context must not retain the retired Investor Passport');

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
check(/What is investment\?/.test(cli.stdout), 'CLI export is missing the first candidate guiding question');
check(/Decision-First Contract/.test(cli.stdout), 'CLI export is missing the decision-first contract');
check(/Generation Rules/.test(cli.stdout), 'CLI export is missing generation rules');
check(/Stock Market Game Core Lab/.test(cli.stdout), 'CLI export is missing the Lesson 1 SMG core lab');
check(/Workbook pages: Lesson 1 handout/.test(cli.stdout), 'CLI export is missing the Lesson 1 handout assignment');
check(cli.stdout.includes(map.lessons[0].stockMarketGame.studentAction), 'CLI export must preserve the exact Lesson 1 SMG action');
check(!/passport/i.test(cli.stdout), 'CLI export must not retain the retired Investor Passport');
check(/CNY/.test(cli.stdout) && /HKD/.test(cli.stdout) && /USD/.test(cli.stdout), 'CLI export is missing the country- and transaction-matched currency rule');

const handoutCli = spawnSync(
  process.execPath,
  [
    path.join(root, 'scripts', 'export-investment-generator-context.js'),
    '--syllabus',
    'financial-decisions',
    '--lesson',
    '1',
    '--target',
    'handout',
    '--format',
    'md',
  ],
  { cwd: root, encoding: 'utf8' }
);

check(handoutCli.status === 0, `exam-revision handout CLI export failed: ${handoutCli.stderr || handoutCli.stdout}`);
check(/# Bilingual exam revision handout/.test(handoutCli.stdout) && /## Key Definitions \/ 核心定义/.test(handoutCli.stdout) && /## Numbered Revision Points \/ 编号复习要点/.test(handoutCli.stdout), 'handout CLI must output bilingual definitions and numbered revision points');
check((handoutCli.stdout.match(/^\d+\. /gm) || []).length >= 4, 'handout CLI must output at least four numbered revision points');
check(!/Evidence and Data Analysis Worksheet|Student output|Workbook pages:/i.test(handoutCli.stdout), 'handout CLI must not expose activity or workbook prompts');

const activityInsertCli = spawnSync(
  process.execPath,
  [
    path.join(root, 'scripts', 'export-investment-generator-context.js'),
    '--syllabus',
    'financial-decisions',
    '--lesson',
    '14',
    '--target',
    'activity-insert',
    '--format',
    'md',
  ],
  { cwd: root, encoding: 'utf8' }
);

check(activityInsertCli.status === 0, `activity-insert CLI export failed: ${activityInsertCli.stderr || activityInsertCli.stdout}`);
check(/# Lesson Activity Insert: Lesson 14/.test(activityInsertCli.stdout), 'activity-insert CLI must produce the missing-evidence page for Lesson 14');
check(/Frozen scenario and source/.test(activityInsertCli.stdout) && /Evidence task/.test(activityInsertCli.stdout) && /Final judgement/.test(activityInsertCli.stdout), 'activity-insert CLI must include the one-page evidence sequence');

const duplicateInsertCli = spawnSync(
  process.execPath,
  [
    path.join(root, 'scripts', 'export-investment-generator-context.js'),
    '--syllabus',
    'financial-decisions',
    '--lesson',
    '4',
    '--target',
    'activity-insert',
    '--format',
    'md',
  ],
  { cwd: root, encoding: 'utf8' }
);

check(duplicateInsertCli.status === 0, `assigned-workbook insert check failed: ${duplicateInsertCli.stderr || duplicateInsertCli.stdout}`);
check(/Activity insert not required: Lesson 4/.test(duplicateInsertCli.stdout), 'activity-insert CLI must refuse to duplicate assigned Lesson 4 workbook pages');

if (failures.length) {
  console.error('Investment and Financial Decision-Making syllabus validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Investment and Financial Decision-Making syllabus validation passed.');
console.log(`Validated ${map.lessons.length} lessons, ${map.units.length} units and ${map.examCheckpoints.length} checkpoints.`);
