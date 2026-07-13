const fs = require('fs');
const path = require('path');
const vm = require('vm');
const childProcess = require('child_process');

const root = path.resolve(__dirname, '..');
const courseRoot = path.join(root, 'investment-analysis');
const courseMap = require('../investment-analysis/course-map-data.js');
const financialDecisionCourseMap = require('../investment-analysis/course-map-financial-decisions-data.js');
const expectedLessonCount = 50;
const expectedUnitCount = 5;
const lessonsPerCheckpoint = 10;
const {
  MATERIAL_TARGETS,
  loadCourseMap,
  getCourseGeneratorContext,
  getLessonGeneratorContext,
  getLessonMaterialContext,
} = require('../investment-analysis/generator-context.js');
const {
  outputPath: handoutBookPath,
  teacherBlueprintPath,
  renderHandoutBook,
  renderTeacherBlueprint,
} = require('./build-investment-handout-book.js');
const {
  sourcePath: investmentDefinitionSourcePath,
  cfaMatchesPath: investmentDefinitionCfaMatchesPath,
  textbookDefinitionsPath: investmentDefinitionTextbookDefinitionsPath,
  htmlOutputPath: investmentDefinitionHtmlPath,
  getInvestmentDefinitionSections,
  getInvestmentDefinitionMap,
  getInvestmentCfaMatches,
  getInvestmentCfaMatchMap,
  getInvestmentTextbookDefinitions,
  getInvestmentTextbookDefinitionMap,
} = require('./investment-definitions.js');
const {
  renderDefinitionPage,
} = require('./build-investment-definitions-page.js');

const vagueRevealTitlePattern = /^(?:answer|possible answer|sample answer|model answer|model sentence|model direction|teacher cue|course rule|analysis boundary|bridge(?: to lesson \d+)?)$/i;
const requiredLessonFields = [
  'lesson',
  'unit',
  'semester',
  'caseAnchor',
  'company',
  'guidingQuestion',
  'decisionFirst',
  'studentHook',
  'simpleFlow',
  'terms',
  'formulaOrNoFormula',
  'formativeAssessment',
  'exitTicket',
  'retrievalBase',
  'newKnowledge',
  'evidenceTask',
  'misconception',
  'studentOutput',
  'handoutSections',
  'coreClaim',
  'caseRole',
  'primaryOutput',
  'sourcePack',
  'artifactBlueprint',
  'assessmentBlueprint',
  'caseReview',
  'examPattern',
  'retrievalPractice',
  'analyseWhy',
  'investmentAction',
  'worksheet',
];
const requiredHandoutSectionKeys = [
  'sourceBox',
  'vocabulary',
  'companyEvidence',
  'calculationOrJudgement',
  'misconceptionCheck',
  'individualOutput',
];
const allowedCaseRoles = new Set([
  'listed company',
  'exchange/infrastructure case',
  'fund',
  'comparison case',
  'synthesis case',
  'financial product',
  'economic data case',
]);
const allowedCaseReviewStatuses = new Set([
  'keep',
  'review-before-production',
  'replace',
]);

function deepProxy() {
  return new Proxy(function noop() {}, {
    get(_target, property) {
      if (property === Symbol.toPrimitive) return () => '';
      return deepProxy();
    },
    apply() {
      return deepProxy();
    }
  });
}

function findInvestmentSlideFiles(dir, base = root) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'test-results' || entry.name === 'output') return [];

    const absolutePath = path.join(dir, entry.name);
    const relativePath = path.relative(base, absolutePath).replace(/\\/g, '/');
    if (relativePath.includes('/archive') || relativePath.includes('-archive-')) return [];
    if (entry.isDirectory()) return findInvestmentSlideFiles(absolutePath, base);
    if (!/^slides.*\.js$/.test(entry.name)) return [];

    return [relativePath];
  });
}

function findInvestmentQuizFiles(dir, base = root) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'test-results' || entry.name === 'output') return [];

    const absolutePath = path.join(dir, entry.name);
    const relativePath = path.relative(base, absolutePath).replace(/\\/g, '/');
    if (relativePath.includes('/archive') || relativePath.includes('-archive-')) return [];
    if (entry.isDirectory()) return findInvestmentQuizFiles(absolutePath, base);
    if (entry.name !== 'quiz.js') return [];

    return [relativePath];
  });
}

function readInvestmentLesson(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const INVEST = {
    photos: deepProxy(),
    marketData: deepProxy(),
  };
  const context = {
    window: { INVEST },
    INVEST,
    console,
  };
  context.window.window = context.window;
  vm.runInNewContext(source, context, { filename: relativePath });
  return context.window.INVEST.lesson;
}

function readInvestmentQuiz(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const INVEST = {};
  const context = {
    window: { INVEST },
    INVEST,
    console,
  };
  context.window.window = context.window;
  vm.runInNewContext(source, context, { filename: relativePath });
  return context.window.INVEST.quiz;
}

function hasTemplateGuidance() {
  const readmePath = path.join(courseRoot, '_template', 'README.md');
  const source = fs.readFileSync(readmePath, 'utf8');
  return /discussion\.revealTitle.+concise answer statement/i.test(source);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function hasChineseText(value) {
  return /[\u3400-\u9fff]/.test(String(value || ''));
}

function normaliseLineEndings(value) {
  return String(value).replace(/\r\n/g, '\n');
}

function stripDefinitionMarkup(value) {
  return decodeHtmlEntities(String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim());
}

function decodeHtmlEntities(value) {
  const named = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
  };

  return String(value || '')
    .replace(/&#(\d+);/g, (_, code) => {
      const point = Number(code);
      return Number.isInteger(point) && point >= 0 && point <= 0x10ffff ? String.fromCodePoint(point) : _;
    })
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => {
      const point = Number.parseInt(code, 16);
      return Number.isInteger(point) && point >= 0 && point <= 0x10ffff ? String.fromCodePoint(point) : _;
    })
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] || match);
}

function normaliseDefinitionText(value) {
  return stripDefinitionMarkup(value)
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

const definitionStopWords = new Set([
  'about',
  'after',
  'again',
  'against',
  'also',
  'before',
  'being',
  'between',
  'company',
  'could',
  'during',
  'every',
  'expected',
  'future',
  'having',
  'including',
  'investment',
  'investor',
  'other',
  'period',
  'price',
  'return',
  'share',
  'shares',
  'showing',
  'stated',
  'their',
  'there',
  'these',
  'those',
  'through',
  'using',
  'while',
  'which',
  'would',
]);

function definitionContentWords(value) {
  return stripDefinitionMarkup(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((word) => word.replace(/^-|-$/g, ''))
    .filter((word) => word.length >= 5 && !definitionStopWords.has(word));
}

function definitionOverlapCount(expected, actual) {
  const expectedWords = [...new Set(definitionContentWords(expected))].slice(0, 14);
  const actualWords = new Set(definitionContentWords(actual));
  return expectedWords.filter((word) => actualWords.has(word)).length;
}

function validateDefinitionStyle(failures, label, value) {
  const text = stripDefinitionMarkup(value);
  if (text.length < 42 || /^[a-z]/.test(text) || !/[.!?]$/.test(text)) {
    failures.push(`${label}: definition must be a complete sentence in the CFA-inspired textbook style`);
  }
  return text;
}

function validateDefinitionAlignment(failures, label, term, value, definitionMap, cfaMatchMap) {
  const text = validateDefinitionStyle(failures, label, value);
  const entry = definitionMap.get(String(term || '').toLowerCase());
  if (!entry) return;

  const requiredOverlap = cfaMatchMap.has(String(term || '').toLowerCase()) ? 4 : 3;
  const overlap = definitionOverlapCount(entry.definition, text);
  if (overlap < requiredOverlap) {
    failures.push(`${label}: definition for "${term}" must stay aligned to references/investment-analysis-definitions.md`);
  }
}

function validateOverviewDefinition(failures, label, term, englishValue, chineseValue, definitionMap, options = {}) {
  const { requireEnglish = true, requireChinese = true, fallbackStyle = true } = options;
  const termKey = String(term || '').toLowerCase();
  const entry = definitionMap.get(termKey);

  if (!entry) {
    if (fallbackStyle && requireEnglish && englishValue) validateDefinitionStyle(failures, `${label} English definition`, englishValue);
    if (fallbackStyle && requireChinese && !hasChineseText(chineseValue)) {
      failures.push(`${label}: missing full Chinese definition translation`);
    }
    return false;
  }

  if (requireEnglish) {
    const expected = normaliseDefinitionText(entry.definition);
    const actual = normaliseDefinitionText(englishValue);
    if (actual !== expected) {
      failures.push(`${label}: English definition for "${entry.term}" must exactly match references/investment-analysis-definitions.md`);
    }
  }

  if (requireChinese) {
    const expectedZh = normaliseDefinitionText(entry.definitionZh);
    const actualZh = normaliseDefinitionText(chineseValue);
    if (actualZh !== expectedZh) {
      failures.push(`${label}: Chinese definition for "${entry.term}" must use the full translation from references/investment-analysis-definitions.md`);
    }
  }

  return true;
}

function includesAllDeckArcPhases(deckArc) {
  if (!Array.isArray(deckArc)) return false;

  const source = deckArc.join('\n');
  return [
    /Hook:/i,
    /Retrieval:/i,
    /Teach:/i,
    /(Evidence|Calculation|Data|Source|Company).*practice:/i,
    /Output rehearsal:/i,
    /(Exit ticket|Individual output):/i,
  ].every((pattern) => pattern.test(source));
}

function validateCourseMapContract() {
  const failures = [];

  if (!courseMap.sourceFitAudit?.rule || !Array.isArray(courseMap.sourceFitAudit?.checks) || courseMap.sourceFitAudit.checks.length < 3) {
    failures.push('investment-analysis/course-map-data.js: sourceFitAudit must define a rule and checks');
  }

  if (!Array.isArray(courseMap.units) || courseMap.units.length !== expectedUnitCount) {
    failures.push(`investment-analysis/course-map-data.js: expected exactly ${expectedUnitCount} units`);
  } else {
    for (const unit of courseMap.units) {
      const label = `investment-analysis/course-map-data.js unit ${unit.unit || '?'}`;
      const expectedSemester = unit.unit <= 3 ? 1 : 2;
      const expectedStart = ((unit.unit || 1) - 1) * lessonsPerCheckpoint + 1;
      const expectedEnd = expectedStart + lessonsPerCheckpoint - 1;
      if (unit.semester !== expectedSemester) failures.push(`${label}: expected semester ${expectedSemester}, got ${unit.semester}`);
      if (!Array.isArray(unit.lessons) || unit.lessons[0] !== expectedStart || unit.lessons[1] !== expectedEnd) {
        failures.push(`${label}: expected lesson range ${expectedStart}-${expectedEnd}`);
      }
    }
  }

  if (!Array.isArray(courseMap.lessons) || courseMap.lessons.length !== expectedLessonCount) {
    failures.push(`investment-analysis/course-map-data.js: expected exactly ${expectedLessonCount} lessons`);
    return failures;
  }
  if (!Array.isArray(courseMap.examCheckpoints) || courseMap.examCheckpoints.length !== expectedUnitCount) {
    failures.push(`investment-analysis/course-map-data.js: expected exactly ${expectedUnitCount} exam checkpoints`);
  } else {
    for (const checkpoint of courseMap.examCheckpoints) {
      const label = `investment-analysis/course-map-data.js checkpoint ${checkpoint.checkpoint || '?'}`;
      const expectedSemester = checkpoint.checkpoint <= 3 ? 1 : 2;
      const expectedStart = ((checkpoint.checkpoint || 1) - 1) * lessonsPerCheckpoint + 1;
      const expectedEnd = expectedStart + lessonsPerCheckpoint - 1;
      if (checkpoint.semester !== expectedSemester) failures.push(`${label}: expected semester ${expectedSemester}, got ${checkpoint.semester}`);
      if (!Array.isArray(checkpoint.afterLessons) || checkpoint.afterLessons[0] !== expectedStart || checkpoint.afterLessons[1] !== expectedEnd) {
        failures.push(`${label}: expected afterLessons ${expectedStart}-${expectedEnd}`);
      }
    }
  }

  if (!/(handout|worksheet)/i.test(courseMap.writtenArtifactRule || '') || !/textbook/i.test(courseMap.writtenArtifactRule || '')) {
    failures.push('investment-analysis/course-map-data.js: writtenArtifactRule must state the worksheet-or-handout/textbook relationship');
  }

  if (!/textbook-only/i.test(courseMap.textbookAssembly?.rule || '')) {
    failures.push('investment-analysis/course-map-data.js: textbookAssembly.rule must forbid textbook-only teaching chapters');
  }

  if (!Array.isArray(courseMap.investmentWorkflow) || courseMap.investmentWorkflow.length < 5) {
    failures.push('investment-analysis/course-map-data.js: investmentWorkflow must define the practical how-to-invest workflow');
  } else {
    for (const step of courseMap.investmentWorkflow) {
      for (const field of ['title', 'studentAction', 'evidenceCheck', 'decisionOutput']) {
        if (!isNonEmptyString(step[field])) failures.push(`investment-analysis/course-map-data.js: every investmentWorkflow step needs ${field}`);
      }
    }
  }
  if (!/consider|watch|avoid/i.test(courseMap.practicalInvestingBoundary || '') || !/evidence/i.test(courseMap.practicalInvestingBoundary || '')) {
    failures.push('investment-analysis/course-map-data.js: practicalInvestingBoundary must describe evidence-based action choices');
  }

  if (!Array.isArray(courseMap.simpleLessonStructure) || courseMap.simpleLessonStructure.length !== 4) {
    failures.push('investment-analysis/course-map-data.js: simpleLessonStructure must define four student-facing steps');
  } else {
    const labels = courseMap.simpleLessonStructure.map((step) => step.label).join('|');
    if (labels !== 'Hook|Key idea|Try it|Decide') {
      failures.push('investment-analysis/course-map-data.js: simpleLessonStructure must use Hook, Key idea, Try it, Decide');
    }
  }
  const decisionModel = courseMap.decisionFirstSyllabus || {};
  if (!isNonEmptyString(decisionModel.coursePromise) || !/first opinion|evidence-based judgement/i.test(decisionModel.coursePromise)) {
    failures.push('investment-analysis/course-map-data.js: decisionFirstSyllabus must describe the first-opinion to evidence-based judgement model');
  }
  if (!Array.isArray(decisionModel.lessonContract) || decisionModel.lessonContract.length < 7) {
    failures.push('investment-analysis/course-map-data.js: decisionFirstSyllabus.lessonContract must describe the full lesson contract');
  }

  const seenLessons = new Set();
  for (const lesson of courseMap.lessons) {
    const label = `investment-analysis/course-map-data.js lesson ${lesson.lesson || '?'}`;
    for (const field of requiredLessonFields) {
      if (!(field in lesson)) failures.push(`${label}: missing required field "${field}"`);
    }

    if (!Number.isInteger(lesson.lesson) || lesson.lesson < 1 || lesson.lesson > expectedLessonCount) {
      failures.push(`${label}: lesson number must be an integer from 1 to ${expectedLessonCount}`);
    }
    if (seenLessons.has(lesson.lesson)) failures.push(`${label}: duplicate lesson number`);
    seenLessons.add(lesson.lesson);

    const expectedUnit = Math.floor((lesson.lesson - 1) / lessonsPerCheckpoint) + 1;
    if (lesson.unit !== expectedUnit) {
      failures.push(`${label}: expected unit ${expectedUnit}, got ${lesson.unit}`);
    }
    const expectedSemester = lesson.lesson <= 30 ? 1 : 2;
    if (lesson.semester !== expectedSemester) {
      failures.push(`${label}: expected semester ${expectedSemester}, got ${lesson.semester}`);
    }

    for (const field of ['company', 'guidingQuestion', 'formulaOrNoFormula', 'formativeAssessment', 'exitTicket', 'retrievalBase', 'newKnowledge', 'evidenceTask', 'misconception', 'studentOutput', 'coreClaim']) {
      if (!isNonEmptyString(lesson[field])) failures.push(`${label}: "${field}" must be a non-empty string`);
    }
    if (!isNonEmptyString(lesson.studentHook) || lesson.studentHook.length < 24) {
      failures.push(`${label}: studentHook must be a concrete, interesting student-facing hook`);
    }
    const decisionFirst = lesson.decisionFirst || {};
    for (const field of ['starterDilemma', 'firstJudgementPrompt', 'likelyNaiveAnswer', 'missingEvidence', 'keyIdea', 'tryIt', 'misconceptionCheck', 'exitJudgement']) {
      if (!isNonEmptyString(decisionFirst[field])) {
        failures.push(`${label}: decisionFirst.${field} must be a non-empty string`);
      }
    }
    if (lesson.studentHook !== decisionFirst.starterDilemma) {
      failures.push(`${label}: studentHook must match decisionFirst.starterDilemma`);
    }
    if (!Array.isArray(lesson.simpleFlow) || lesson.simpleFlow.length !== 4) {
      failures.push(`${label}: simpleFlow must have four steps`);
    } else {
      const simpleLabels = lesson.simpleFlow.map((step) => step.label).join('|');
      if (simpleLabels !== 'Hook|Key idea|Try it|Decide') failures.push(`${label}: simpleFlow must use Hook, Key idea, Try it, Decide`);
      for (const step of lesson.simpleFlow) {
        if (!isNonEmptyString(step.text)) failures.push(`${label}: every simpleFlow step needs text`);
      }
      if (lesson.simpleFlow[0]?.text !== decisionFirst.starterDilemma || lesson.simpleFlow[1]?.text !== decisionFirst.keyIdea || lesson.simpleFlow[2]?.text !== decisionFirst.tryIt || lesson.simpleFlow[3]?.text !== decisionFirst.exitJudgement) {
        failures.push(`${label}: simpleFlow must derive from the decisionFirst contract`);
      }
    }

    if (!allowedCaseRoles.has(lesson.caseRole)) {
      failures.push(`${label}: caseRole must be one of ${[...allowedCaseRoles].join(', ')}`);
    }

    if (!isNonEmptyString(lesson.primaryOutput?.type) || !isNonEmptyString(lesson.primaryOutput?.description)) {
      failures.push(`${label}: primaryOutput must have exactly one type and description`);
    }

    if (!Array.isArray(lesson.terms) || lesson.terms.length === 0) {
      failures.push(`${label}: terms must be a non-empty array`);
    } else {
      for (const term of lesson.terms) {
        if (!isNonEmptyString(term.term) || !isNonEmptyString(term.zh) || !isNonEmptyString(term.definition)) {
          failures.push(`${label}: every term needs term, zh and definition`);
        }
      }
    }

    const sectionKeys = Array.isArray(lesson.handoutSections)
      ? lesson.handoutSections.map((section) => section.key)
      : [];
    if (JSON.stringify(sectionKeys) !== JSON.stringify(requiredHandoutSectionKeys)) {
      failures.push(`${label}: handoutSections must use ${requiredHandoutSectionKeys.join(', ')} in order`);
    }

    const sourceBox = lesson.handoutSections?.find((section) => section.key === 'sourceBox');
    if (!/source/i.test(sourceBox?.task || '') || !/date/i.test(sourceBox?.task || '')) {
      failures.push(`${label}: sourceBox must require source and date evidence`);
    }

    const individualOutput = lesson.handoutSections?.find((section) => section.key === 'individualOutput');
    if (individualOutput?.task !== lesson.studentOutput) {
      failures.push(`${label}: individualOutput handout section must match studentOutput`);
    }

    const retrievalPractice = lesson.retrievalPractice || {};
    if (!isNonEmptyString(retrievalPractice.yesNo?.prompt) || !isNonEmptyString(retrievalPractice.yesNo?.answer)) {
      failures.push(`${label}: retrievalPractice.yesNo must include prompt and answer`);
    }
    if (!isNonEmptyString(retrievalPractice.multipleChoice?.prompt) || !Array.isArray(retrievalPractice.multipleChoice?.options) || retrievalPractice.multipleChoice.options.length < 3 || !isNonEmptyString(retrievalPractice.multipleChoice?.answer)) {
      failures.push(`${label}: retrievalPractice.multipleChoice must include prompt, at least 3 options and answer`);
    }
    if (!isNonEmptyString(retrievalPractice.matching?.prompt) || !Array.isArray(retrievalPractice.matching?.pairs) || retrievalPractice.matching.pairs.length < 2) {
      failures.push(`${label}: retrievalPractice.matching must include prompt and at least 2 pairs`);
    }
    if (!isNonEmptyString(retrievalPractice.sourceCheck) || !/source/i.test(retrievalPractice.sourceCheck) || !/date/i.test(retrievalPractice.sourceCheck)) {
      failures.push(`${label}: retrievalPractice.sourceCheck must require source/date checking`);
    }

    if (!isNonEmptyString(lesson.analyseWhy?.question) || !/analyse why/i.test(lesson.analyseWhy.question)) {
      failures.push(`${label}: analyseWhy.question must be a non-empty Analyse why question`);
    }
    if (!Array.isArray(lesson.analyseWhy?.chain) || lesson.analyseWhy.chain.length < 3) {
      failures.push(`${label}: analyseWhy.chain must include evidence/data, concept and investor implication steps`);
    }

    const action = lesson.investmentAction || {};
    for (const field of ['title', 'studentAction', 'decisionRule', 'portfolioQuestion', 'classroomOutput']) {
      if (!isNonEmptyString(action[field])) failures.push(`${label}: investmentAction.${field} must be a non-empty string`);
    }
    if (!/consider|watch|avoid|gather more evidence|compare/i.test(`${action.studentAction} ${action.decisionRule} ${action.classroomOutput}`)) {
      failures.push(`${label}: investmentAction must lead to a practical next action such as consider, watch, avoid, compare or gather more evidence`);
    }

    const worksheet = lesson.worksheet?.evidenceAndDataAnalysis || {};
    if (!isNonEmptyString(worksheet.stimulus) || !/source/i.test(worksheet.stimulus) || !/date/i.test(worksheet.stimulus)) {
      failures.push(`${label}: worksheet.evidenceAndDataAnalysis.stimulus must include case information with source/date expectations`);
    }
    const worksheetTypes = new Set(Array.isArray(worksheet.questions) ? worksheet.questions.map((question) => question.type) : []);
    for (const type of ['identify-define', 'calculate-interpret', 'explain-evidence', 'analyse-why', 'student-judgement']) {
      if (!worksheetTypes.has(type)) failures.push(`${label}: worksheet.evidenceAndDataAnalysis.questions missing ${type}`);
    }
    const judgementQuestion = Array.isArray(worksheet.questions) ? worksheet.questions.find((question) => question.type === 'student-judgement') : null;
    if (!/next investment action/i.test(judgementQuestion?.prompt || '')) {
      failures.push(`${label}: worksheet student judgement must require a next investment action`);
    }

    const sourcePack = lesson.sourcePack || {};
    if (!Array.isArray(sourcePack.requiredSourceTypes) || sourcePack.requiredSourceTypes.length === 0) {
      failures.push(`${label}: sourcePack.requiredSourceTypes must be a non-empty array`);
    }
    if (!Array.isArray(sourcePack.preferredSourceOrder) || sourcePack.preferredSourceOrder.length === 0) {
      failures.push(`${label}: sourcePack.preferredSourceOrder must be a non-empty array`);
    }
    if (!Array.isArray(sourcePack.snapshotDateFields) || !sourcePack.snapshotDateFields.some((field) => /date/i.test(field))) {
      failures.push(`${label}: sourcePack.snapshotDateFields must include a date field`);
    }
    if (!Array.isArray(sourcePack.evidenceLimitations) || sourcePack.evidenceLimitations.length === 0) {
      failures.push(`${label}: sourcePack.evidenceLimitations must be a non-empty array`);
    }
    if (sourcePack.noLivePriceDependency !== true) {
      failures.push(`${label}: sourcePack.noLivePriceDependency must be true`);
    }

    const artifactBlueprint = lesson.artifactBlueprint || {};
    if (!Array.isArray(artifactBlueprint.deckArc) || artifactBlueprint.deckArc.length < 5) {
      failures.push(`${label}: artifactBlueprint.deckArc must contain at least 5 steps`);
    } else if (!includesAllDeckArcPhases(artifactBlueprint.deckArc)) {
      failures.push(`${label}: artifactBlueprint.deckArc must follow the ILA rhythm: Hook, Retrieval, Teach, practice, Output rehearsal and Exit ticket`);
    }
    const blueprintHandoutKeys = Array.isArray(artifactBlueprint.handoutBlocks)
      ? artifactBlueprint.handoutBlocks.map((section) => section.key)
      : [];
    if (JSON.stringify(blueprintHandoutKeys) !== JSON.stringify(requiredHandoutSectionKeys)) {
      failures.push(`${label}: artifactBlueprint.handoutBlocks must use ${requiredHandoutSectionKeys.join(', ')} in order`);
    }
    for (const block of artifactBlueprint.handoutBlocks || []) {
      if (!isNonEmptyString(block.prompt) || !isNonEmptyString(block.expectedStudentWork)) {
        failures.push(`${label}: every artifactBlueprint handout block needs prompt and expectedStudentWork`);
      }
    }
    if (!/handout/i.test(artifactBlueprint.chapterOutput || '') || /textbook-only/i.test(artifactBlueprint.chapterOutput || '') === false) {
      failures.push(`${label}: artifactBlueprint.chapterOutput must keep textbook chapters tied to handouts and reject textbook-only content`);
    }
    if (!isNonEmptyString(artifactBlueprint.examItemShape)) {
      failures.push(`${label}: artifactBlueprint.examItemShape must be a non-empty string`);
    }

    const assessmentBlueprint = lesson.assessmentBlueprint || {};
    for (const field of ['commandWord', 'stimulusType', 'calculationRequirement', 'judgementRequirement', 'mustAvoid']) {
      if (!isNonEmptyString(assessmentBlueprint[field])) failures.push(`${label}: assessmentBlueprint.${field} must be a non-empty string`);
    }
    if (!Number.isInteger(assessmentBlueprint.marks) || assessmentBlueprint.marks < 1) {
      failures.push(`${label}: assessmentBlueprint.marks must be a positive integer`);
    }

    const review = lesson.caseReview || {};
    if (!allowedCaseReviewStatuses.has(review.status)) {
      failures.push(`${label}: caseReview.status must be one of ${[...allowedCaseReviewStatuses].join(', ')}`);
    }
    if (!isNonEmptyString(review.sourceFit) || !isNonEmptyString(review.reason)) {
      failures.push(`${label}: caseReview must include sourceFit and reason`);
    }
    if (review.status !== 'keep' && !isNonEmptyString(review.replacementCandidate)) {
      failures.push(`${label}: non-keep caseReview entries need a replacementCandidate`);
    }

    if (lesson.examPattern?.checkpoint !== expectedUnit) {
      failures.push(`${label}: examPattern checkpoint must match the ten-lesson unit`);
    }
    for (const field of ['itemType', 'sourceRequirement', 'task', 'mustAssess']) {
      if (!isNonEmptyString(lesson.examPattern?.[field])) failures.push(`${label}: examPattern.${field} must be a non-empty string`);
    }

    for (const field of ['retrievalBase', 'newKnowledge', 'avoidOverlap', 'misconception', 'evidenceTask', 'studentOutput']) {
      if (!isNonEmptyString(lesson.cardGenerator?.[field])) failures.push(`${label}: cardGenerator.${field} must be a non-empty string`);
    }
  }

  for (let lessonNumber = 1; lessonNumber <= expectedLessonCount; lessonNumber += 1) {
    if (!seenLessons.has(lessonNumber)) {
      failures.push(`investment-analysis/course-map-data.js: missing lesson ${lessonNumber}`);
    }
  }

  return failures;
}

function validateSyllabusUsesCourseMap() {
  const failures = [];
  const syllabusPath = path.join(courseRoot, 'syllabus.html');
  const companySyllabusPath = path.join(courseRoot, 'syllabus-company-analysis.html');
  const source = fs.readFileSync(syllabusPath, 'utf8');
  const companySource = fs.existsSync(companySyllabusPath)
    ? fs.readFileSync(companySyllabusPath, 'utf8')
    : '';

  if (!/course-map-financial-decisions-data\.js/.test(source) || !/course-map-render\.js/.test(source)) {
    failures.push('investment-analysis/syllabus.html: must load the active financial-decisions map and shared renderer');
  }
  if (/Personal Finance|personal-finance|course-map-company-analysis-data\.js/.test(source)) {
    failures.push('investment-analysis/syllabus.html: must not expose the archived personal-finance syllabus or old alternate data source');
  }
  if (!/data-course-map-generator-rows/.test(source)) {
    failures.push('investment-analysis/syllabus.html: generator table must render from the course map data target');
  }
  if (!/data-decision-first-model/.test(source) || !/Decision-first investment learning/.test(source)) {
    failures.push('investment-analysis/syllabus.html: must render the decision-first teaching model');
  }
  if (!/data-course-map-lesson-grid/.test(source)) {
    failures.push('investment-analysis/syllabus.html: lesson cards must render from the course map data target');
  }
  if (!/data-investment-workflow/.test(source) || !/Investment action/.test(source)) {
    failures.push('investment-analysis/syllabus.html: must render the practical investing workflow and investment action column');
  }
  if (!/data-simple-lesson-structure/.test(source) || !/Hook, key idea, try it, decide/i.test(source)) {
    failures.push('investment-analysis/syllabus.html: must render the simple lesson structure');
  }
  if (/data-syllabus-lesson/.test(source)) {
    failures.push('investment-analysis/syllabus.html: remove static lesson cards; render them from course-map-data.js');
  }
  if (!companySource) {
    failures.push('investment-analysis/syllabus-company-analysis.html: missing legacy company-analysis syllabus page');
  } else {
    if (!/course-map-data\.js/.test(companySource) || !/course-map-render\.js/.test(companySource)) {
      failures.push('investment-analysis/syllabus-company-analysis.html: must load course-map-data.js and course-map-render.js');
    }
    if (/Personal Finance|personal-finance|course-map-company-analysis-data\.js/.test(companySource)) {
      failures.push('investment-analysis/syllabus-company-analysis.html: must not expose the archived personal-finance syllabus or old alternate data source');
    }
    if (!/Archived: Investment Analysis/.test(companySource) || !/href="syllabus\.html"/.test(companySource)) {
      failures.push('investment-analysis/syllabus-company-analysis.html: must identify itself as archived and link to the current syllabus');
    }
  }

  return failures;
}

function validateGeneratorContextAccess() {
  const failures = [];
  const generatorContextPath = path.join(courseRoot, 'generator-context.js');
  const exportScriptPath = path.join(root, 'scripts', 'export-investment-generator-context.js');
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const materialTargetKeys = Object.keys(MATERIAL_TARGETS);

  if (!fs.existsSync(generatorContextPath)) {
    failures.push('investment-analysis/generator-context.js: missing generator context module');
  }
  if (!fs.existsSync(exportScriptPath)) {
    failures.push('scripts/export-investment-generator-context.js: missing generator context export CLI');
  }
  if (packageJson.scripts?.['export:investment-generator-context'] !== 'node scripts/export-investment-generator-context.js') {
    failures.push('package.json: missing export:investment-generator-context script');
  }
  if (courseMap.generatorAccess?.contextModule !== 'investment-analysis/generator-context.js') {
    failures.push('investment-analysis/course-map-data.js: generatorAccess.contextModule must point to generator-context.js');
  }
  if (!Array.isArray(courseMap.generatorAccess?.rules) || courseMap.generatorAccess.rules.length < 4) {
    failures.push('investment-analysis/course-map-data.js: generatorAccess.rules must define generator guardrails');
  }

  const accessTargets = new Set((courseMap.generatorAccess?.targets || []).map((target) => target.key));
  for (const target of ['lesson', ...materialTargetKeys]) {
    if (!accessTargets.has(target)) {
      failures.push(`investment-analysis/course-map-data.js: generatorAccess missing target "${target}"`);
    }
  }

  const companyAnalysisMap = loadCourseMap('company-analysis');
  if (!Array.isArray(companyAnalysisMap.lessons) || companyAnalysisMap.lessons.length !== expectedLessonCount) {
    failures.push(`investment-analysis/generator-context.js: company-analysis alias must expose all ${expectedLessonCount} default lessons`);
  }
  if (companyAnalysisMap !== courseMap && companyAnalysisMap.courseTitle !== courseMap.courseTitle) {
    failures.push('investment-analysis/generator-context.js: company-analysis alias must use the standard course map');
  }

  const courseContext = getCourseGeneratorContext(courseMap);
  if (courseContext.contextType !== 'course-generator-index') {
    failures.push('investment-analysis/generator-context.js: course context must identify itself as course-generator-index');
  }
  if (!Array.isArray(courseContext.lessons) || courseContext.lessons.length !== expectedLessonCount) {
    failures.push(`investment-analysis/generator-context.js: course context must expose all ${expectedLessonCount} lessons`);
  }

  const companyAnalysisContext = getCourseGeneratorContext('company-analysis');
  if (companyAnalysisContext.course.syllabusKey !== 'company-analysis') {
    failures.push('investment-analysis/generator-context.js: company-analysis course context must expose syllabusKey company-analysis');
  }
  if (!Array.isArray(companyAnalysisContext.lessons) || companyAnalysisContext.lessons.length !== expectedLessonCount) {
    failures.push(`investment-analysis/generator-context.js: company-analysis course context must expose all ${expectedLessonCount} lessons`);
  }

  for (let lessonNumber = 1; lessonNumber <= expectedLessonCount; lessonNumber += 1) {
    const lessonContext = getLessonGeneratorContext(lessonNumber, courseMap);
    if (lessonContext.contextType !== 'lesson-generator-context') {
      failures.push(`investment-analysis/generator-context.js lesson ${lessonNumber}: wrong lesson context type`);
    }
    if (lessonContext.lesson.lesson !== lessonNumber) {
      failures.push(`investment-analysis/generator-context.js lesson ${lessonNumber}: lesson number mismatch`);
    }
    if (!isNonEmptyString(lessonContext.teachingContract?.primaryOutput?.description)) {
      failures.push(`investment-analysis/generator-context.js lesson ${lessonNumber}: missing primary output`);
    }
    if (!isNonEmptyString(lessonContext.teachingContract?.decisionFirst?.starterDilemma) || !isNonEmptyString(lessonContext.generatorBrief?.decisionFirst?.missingEvidence)) {
      failures.push(`investment-analysis/generator-context.js lesson ${lessonNumber}: missing decision-first contract`);
    }
    if (!Array.isArray(lessonContext.artifactContract?.artifactBlueprint?.handoutBlocks)) {
      failures.push(`investment-analysis/generator-context.js lesson ${lessonNumber}: missing handout block contract`);
    }

    for (const target of materialTargetKeys) {
      const materialContext = getLessonMaterialContext(lessonNumber, target, courseMap);
      if (materialContext.contextType !== 'lesson-material-generator-context') {
        failures.push(`investment-analysis/generator-context.js lesson ${lessonNumber} ${target}: wrong material context type`);
      }
      if (materialContext.target !== target) {
        failures.push(`investment-analysis/generator-context.js lesson ${lessonNumber} ${target}: target mismatch`);
      }
      if (!Array.isArray(materialContext.generationRules) || materialContext.generationRules.length === 0) {
        failures.push(`investment-analysis/generator-context.js lesson ${lessonNumber} ${target}: missing generation rules`);
      }
      if (!materialContext.requiredInputs?.evidenceContract?.sourcePack?.noLivePriceDependency) {
        failures.push(`investment-analysis/generator-context.js lesson ${lessonNumber} ${target}: source pack must keep no live price dependency`);
      }
    }
  }

  try {
    const jsonOutput = childProcess.execFileSync(process.execPath, [
      exportScriptPath,
      '--syllabus',
      'company-analysis',
      '--lesson',
      '5',
      '--target',
      'deck',
    ], { cwd: root, encoding: 'utf8' });
    const parsed = JSON.parse(jsonOutput);
    if (parsed.target !== 'deck' || parsed.lesson.lesson !== 5 || parsed.lesson.caseAnchor !== 'HKEX') {
      failures.push('scripts/export-investment-generator-context.js: deck JSON output must include default HKEX market-access lesson');
    }

    const markdownOutput = childProcess.execFileSync(process.execPath, [
      exportScriptPath,
      '--syllabus',
      'company-analysis',
      '--lesson',
      '5',
      '--target',
      'handout',
      '--format',
      'md',
    ], { cwd: root, encoding: 'utf8' });
    if (!/Lesson 5: HKEX/.test(markdownOutput) || !/Decision-First Contract/.test(markdownOutput) || !/Simple Lesson Flow/.test(markdownOutput) || !/Practical Investing Action/.test(markdownOutput) || !/Retrieval Practice/.test(markdownOutput) || !/Evidence and Data Analysis Worksheet/.test(markdownOutput) || !/Analyse Why/.test(markdownOutput) || !/Generation Rules/.test(markdownOutput)) {
      failures.push('scripts/export-investment-generator-context.js: archived company-analysis output must preserve the full lesson contract');
    }

    const companyMarkdownOutput = childProcess.execFileSync(process.execPath, [
      exportScriptPath,
      '--syllabus',
      'company-analysis',
      '--lesson',
      '5',
      '--target',
      'handout',
      '--format',
      'md',
    ], { cwd: root, encoding: 'utf8' });
    if (!/Lesson 5: HKEX/.test(companyMarkdownOutput) || !/Generation Rules/.test(companyMarkdownOutput)) {
      failures.push('scripts/export-investment-generator-context.js: company-analysis markdown output must include HKEX lesson and generation rules');
    }

    try {
      childProcess.execFileSync(process.execPath, [
        exportScriptPath,
        '--syllabus',
        'personal-finance',
        '--lesson',
        '1',
      ], { cwd: root, encoding: 'utf8', stdio: 'pipe' });
      failures.push('scripts/export-investment-generator-context.js: personal-finance syllabus selector must not be publicly supported');
    } catch (error) {
      if (!/syllabus must be one of default, company-analysis/.test(`${error.stderr || ''}${error.stdout || ''}${error.message}`)) {
        failures.push('scripts/export-investment-generator-context.js: personal-finance rejection must identify supported public syllabi');
      }
    }
  } catch (error) {
    failures.push(`scripts/export-investment-generator-context.js: CLI failed: ${error.message}`);
  }

  return failures;
}

function validateInvestmentDefinitionsOverview() {
  const failures = [];
  const sections = getInvestmentDefinitionSections();
  const entries = sections.flatMap((section) => section.entries);
  const definitionMap = getInvestmentDefinitionMap();
  const expectedSource = 'references/investment-analysis-definitions.md';
  const expectedPage = 'investment-analysis/definitions.html';

  if (courseMap.definitionOverview?.source !== expectedSource) {
    failures.push('investment-analysis/course-map-data.js: definitionOverview.source must point to references/investment-analysis-definitions.md');
  }
  if (courseMap.definitionOverview?.studentPage !== expectedPage) {
    failures.push('investment-analysis/course-map-data.js: definitionOverview.studentPage must point to investment-analysis/definitions.html');
  }
  if (courseMap.definitionOverview?.cfaMatches !== 'references/investment-analysis-cfa-glossary-matches.json') {
    failures.push('investment-analysis/course-map-data.js: definitionOverview.cfaMatches must point to references/investment-analysis-cfa-glossary-matches.json');
  }
  if (courseMap.definitionOverview?.textbookDefinitions !== 'references/investment-analysis-textbook-definitions.json') {
    failures.push('investment-analysis/course-map-data.js: definitionOverview.textbookDefinitions must point to references/investment-analysis-textbook-definitions.json');
  }
  if (courseMap.definitionOverview?.prioritySource !== 'CFA Program glossary' || !/cfainstitute\.org\/programs\/cfa-program\/candidate-resources\/glossary-terms/i.test(courseMap.definitionOverview?.prioritySourceUrl || '')) {
    failures.push('investment-analysis/course-map-data.js: definitionOverview must record the CFA Program glossary priority source');
  }
  if (!/textbook-style/i.test(courseMap.definitionOverview?.rule || '')) {
    failures.push('investment-analysis/course-map-data.js: definitionOverview.rule must identify the textbook-style definition source');
  }

  if (!fs.existsSync(investmentDefinitionSourcePath)) {
    failures.push('references/investment-analysis-definitions.md: missing investment definition overview source');
    return failures;
  }
  if (sections.length !== expectedUnitCount) {
    failures.push(`references/investment-analysis-definitions.md: expected exactly ${expectedUnitCount} unit sections`);
  }
  if (entries.length !== definitionMap.size) {
    failures.push('references/investment-analysis-definitions.md: duplicate definition terms detected');
  }

  if (!fs.existsSync(investmentDefinitionCfaMatchesPath)) {
    failures.push('references/investment-analysis-cfa-glossary-matches.json: missing CFA glossary match source');
  } else {
    const cfaMatches = getInvestmentCfaMatches();
    const cfaMatchMap = getInvestmentCfaMatchMap();
    const cfaMatchedTerms = new Set();

    if (!/cfainstitute\.org\/programs\/cfa-program\/candidate-resources\/glossary-terms/i.test(cfaMatches.sourceUrl || '')) {
      failures.push('references/investment-analysis-cfa-glossary-matches.json: sourceUrl must point to the CFA Program glossary');
    }
    if (!Array.isArray(cfaMatches.matches) || cfaMatches.matches.length < 30) {
      failures.push('references/investment-analysis-cfa-glossary-matches.json: expected at least 30 clear CFA glossary matches');
    }
    if (cfaMatchMap.has('capacity')) {
      failures.push('references/investment-analysis-cfa-glossary-matches.json: capacity must not be matched because CFA capacity means borrower repayment ability');
    }

    for (const match of cfaMatches.matches || []) {
      const key = String(match.term || '').toLowerCase();
      const label = `references/investment-analysis-cfa-glossary-matches.json term "${match.term || '?'}"`;
      if (!definitionMap.has(key)) failures.push(`${label}: CFA match term is not present in the definition overview`);
      if (cfaMatchedTerms.has(key)) failures.push(`${label}: duplicate CFA match term`);
      cfaMatchedTerms.add(key);
      if (!isNonEmptyString(match.cfaTerm)) failures.push(`${label}: missing cfaTerm`);
      if (!isNonEmptyString(match.meaningFocus) || match.meaningFocus.length < 30) failures.push(`${label}: missing course-aligned CFA meaning focus`);
      if (!isNonEmptyString(match.matchType)) failures.push(`${label}: missing matchType`);
    }
  }

  if (!fs.existsSync(investmentDefinitionTextbookDefinitionsPath)) {
    failures.push('references/investment-analysis-textbook-definitions.json: missing local textbook definition source');
  } else {
    const textbookData = getInvestmentTextbookDefinitions();
    const textbookMap = getInvestmentTextbookDefinitionMap();
    const sourceIds = new Set((textbookData.sources || []).map((source) => source.id));

    if (!Array.isArray(textbookData.sources) || textbookData.sources.length < 4) {
      failures.push('references/investment-analysis-textbook-definitions.json: expected the four local textbook sources');
    }
    if (!Array.isArray(textbookData.matches) || textbookData.matches.length < 25 || textbookMap.size < 20) {
      failures.push('references/investment-analysis-textbook-definitions.json: expected at least 25 textbook definition matches across at least 20 course terms');
    }

    for (const match of textbookData.matches || []) {
      const key = String(match.term || '').toLowerCase();
      const label = `references/investment-analysis-textbook-definitions.json term "${match.term || '?'}"`;
      if (!definitionMap.has(key)) failures.push(`${label}: textbook match term is not present in the definition overview`);
      if (!sourceIds.has(match.sourceId)) failures.push(`${label}: unknown sourceId ${match.sourceId || '?'}`);
      if (!isNonEmptyString(match.sourceTerm)) failures.push(`${label}: missing sourceTerm`);
      if (!Number.isFinite(Number(match.pdfPage)) || Number(match.pdfPage) <= 0) failures.push(`${label}: missing positive pdfPage`);
      if (!isNonEmptyString(match.definition) || match.definition.length < 30) failures.push(`${label}: missing concise textbook definition note`);
    }
  }

  const courseTermKeys = new Set();
  for (const lesson of courseMap.lessons) {
    for (const term of lesson.terms || []) {
      const key = String(term.term || '').toLowerCase();
      courseTermKeys.add(key);
      const entry = definitionMap.get(key);
      const label = `references/investment-analysis-definitions.md term "${term.term}"`;

      if (!entry) {
        failures.push(`${label}: missing course-map term from definition overview`);
        continue;
      }
      if (entry.ref !== `U${lesson.unit} L${lesson.lesson}`) {
        failures.push(`${label}: expected ref U${lesson.unit} L${lesson.lesson}, got ${entry.ref}`);
      }
      if (!hasChineseText(entry.zh)) {
        failures.push(`${label}: missing Chinese support`);
      }
      if (entry.definition.length < 60 || /^[a-z]/.test(entry.definition) || !/[.!?]$/.test(entry.definition)) {
        failures.push(`${label}: definition must be complete textbook-style sentence wording`);
      }
      if (!hasChineseText(entry.definitionZh) || entry.definitionZh.length < 20) {
        failures.push(`${label}: missing Chinese definition translation`);
      }
      if (term.definition !== entry.definition) {
        failures.push(`${label}: course-map term definition must match the CFA-aligned textbook definition overview`);
      }
      if (!isNonEmptyString(entry.courseUse)) {
        failures.push(`${label}: missing course use`);
      }
    }
  }

  for (const entry of entries) {
    if (!courseTermKeys.has(entry.term.toLowerCase())) {
      failures.push(`references/investment-analysis-definitions.md term "${entry.term}": not present in course-map terms`);
    }
  }

  const expectedHtml = normaliseLineEndings(renderDefinitionPage(sections));
  const actualHtml = fs.existsSync(investmentDefinitionHtmlPath)
    ? normaliseLineEndings(fs.readFileSync(investmentDefinitionHtmlPath, 'utf8'))
    : '';
  if (actualHtml !== expectedHtml) {
    failures.push('investment-analysis/definitions.html: generated investment definitions page is missing or out of date');
  }
  if (!/Textbook definition \/ 中文定义/.test(actualHtml) || !/投资分析/.test(actualHtml)) {
    failures.push('investment-analysis/definitions.html: generated page must show Chinese definition translations');
  }
  if (!/Local textbook definitions/.test(actualHtml) || !/Bodie\/Kane\/Marcus, Essentials/.test(actualHtml) || !/Damodaran, Little Book/.test(actualHtml)) {
    failures.push('investment-analysis/definitions.html: generated page must show local textbook definition matches');
  }
  if (!/CFA source definition/.test(actualHtml) || !/CFA term: Earnings per share/.test(actualHtml) || !/Open original CFA wording/.test(actualHtml)) {
    failures.push('investment-analysis/definitions.html: generated page must show CFA glossary source matches');
  }

  const homeSource = fs.readFileSync(path.join(courseRoot, 'index.html'), 'utf8');
  const syllabusSource = fs.readFileSync(path.join(courseRoot, 'syllabus.html'), 'utf8');
  if (!/href="definitions\.html"/.test(homeSource)) {
    failures.push('investment-analysis/index.html: missing link to definitions.html');
  }
  if (!/investment-analysis-definitions\.md/.test(syllabusSource) || !/href="definitions\.html"/.test(syllabusSource)) {
    failures.push('investment-analysis/syllabus.html: missing definition overview source and page links');
  }

  return failures;
}

function validateCompiledHandoutBook() {
  const failures = [];
  const expected = normaliseLineEndings(renderHandoutBook(courseMap));
  const expectedTeacherBlueprint = normaliseLineEndings(renderTeacherBlueprint(courseMap));
  const actual = fs.existsSync(handoutBookPath)
    ? normaliseLineEndings(fs.readFileSync(handoutBookPath, 'utf8'))
    : '';
  const actualTeacherBlueprint = fs.existsSync(teacherBlueprintPath)
    ? normaliseLineEndings(fs.readFileSync(teacherBlueprintPath, 'utf8'))
    : '';

  if (actual !== expected) {
    failures.push('investment-analysis/companion-textbook/compiled-handout-book.md: compiled handout book is missing or out of date');
  }
  if (actualTeacherBlueprint !== expectedTeacherBlueprint) {
    failures.push('investment-analysis/companion-textbook/course-map-teacher-blueprint.md: teacher blueprint is missing or out of date');
  }

  const lessonHeadings = actual.match(/^## Lesson \d+:/gm) || [];
  const unitHeadings = actual.match(/^# Unit \d+:/gm) || [];
  const sourceBoxes = actual.match(/^### Source box$/gm) || [];
  const blueprintLessonHeadings = actualTeacherBlueprint.match(/^## Lesson \d+:/gm) || [];

  if (lessonHeadings.length !== expectedLessonCount) failures.push(`compiled handout book: expected ${expectedLessonCount} lesson handouts`);
  if (unitHeadings.length !== expectedUnitCount) failures.push(`compiled handout book: expected ${expectedUnitCount} unit dividers`);
  if (sourceBoxes.length !== expectedLessonCount) failures.push('compiled handout book: every lesson handout needs a source box');
  if (blueprintLessonHeadings.length !== expectedLessonCount) failures.push(`teacher blueprint: expected ${expectedLessonCount} lesson blueprints`);
  if (!/Case Review Table/i.test(actualTeacherBlueprint)) failures.push('teacher blueprint: missing case review table');
  if (!/Source-Fit Audit/i.test(actualTeacherBlueprint)) failures.push('teacher blueprint: missing source-fit audit');
  if (/^#{1,3}\s+Chapter\b/im.test(actual)) {
    failures.push('compiled handout book: should not contain separate textbook chapter headings');
  }

  return failures;
}

function validateTermRenderer() {
  const failures = [];
  const rendererPath = path.join(root, 'assets', 'js', 'investment-deck.js');
  const source = fs.readFileSync(rendererPath, 'utf8');

  if (/class="invTermGrid"/.test(source)) {
    failures.push('assets/js/investment-deck.js: term slides should not render invTermGrid below definitions');
  }

  if (!/class="invTermDefinitionZh"/.test(source)) {
    failures.push('assets/js/investment-deck.js: term slides should render definitionZh inside the definition block');
  }

  if (!/applyDefinitionBlanks/.test(source) || !/definitionBlanks/.test(source)) {
    failures.push('assets/js/investment-deck.js: term slides should support definitionBlanks for projected fill-in definitions');
  }

  return failures;
}

function validateInvestmentPresentationDefinitions() {
  const failures = [];
  const definitionMap = getInvestmentDefinitionMap();
  const activeFinancialDefinitionMap = new Map(
    financialDecisionCourseMap.lessons
      .filter((lesson) => lesson.lesson <= 2)
      .flatMap((lesson) => lesson.terms || [])
      .map((entry) => [String(entry.term || '').toLowerCase(), entry]),
  );
  const slideFiles = findInvestmentSlideFiles(courseRoot)
    .filter((slideFile) => !slideFile.includes('/_template/'));

  for (const slideFile of slideFiles) {
    const lesson = readInvestmentLesson(slideFile);
    const usesActiveFinancialDefinitions = /^investment-analysis\/unit-1\/lesson-[12]\/slides\.js$/.test(slideFile);
    for (const [index, slide] of (lesson.slides || []).entries()) {
      const label = `${slideFile} slide ${index + 1} (${slide.type || 'unknown'}: ${slide.title || slide.term || 'untitled'})`;

      if (slide.type === 'term' && slide.definition) {
        const termKey = String(slide.term || slide.title || '').toLowerCase();
        const activeEntry = usesActiveFinancialDefinitions ? activeFinancialDefinitionMap.get(termKey) : null;
        if (activeEntry) {
          if (normaliseDefinitionText(slide.definition) !== normaliseDefinitionText(activeEntry.definition)) {
            failures.push(`${label}: English definition for "${activeEntry.term}" must exactly match course-map-financial-decisions-data.js`);
          }
          if (!hasChineseText(slide.definitionZh)) {
            failures.push(`${label}: missing full Chinese definition translation`);
          }
        } else {
          validateOverviewDefinition(
            failures,
            `${label} term definition`,
            slide.term || slide.title,
            slide.definition,
            slide.definitionZh,
            definitionMap,
          );
        }

        if (slideFile === 'investment-analysis/unit-1/lesson-1/slides.js') {
          const blanks = Array.isArray(slide.definitionBlanks) ? slide.definitionBlanks : [];
          if (!blanks.length) {
            failures.push(`${label}: Lesson 1 definition slides must declare definitionBlanks`);
          }
          for (const blank of blanks) {
            const search = typeof blank === 'string' ? blank : (blank.text || blank.answer || '');
            if (search && !String(slide.definition).includes(search)) {
              failures.push(`${label}: definitionBlank "${search}" must appear in the canonical definition text`);
            }
          }
        }
      }

      if (slide.type === 'peerTask' && slide.taskType === 'definitionRecall') {
        const requiresDefinitionStyle = /\bdefinition/i.test([
          slide.title,
          slide.prompt,
          slide.stepsLabel,
        ].filter(Boolean).join(' '));

        for (const [itemIndex, item] of (slide.definitionItems || []).entries()) {
          if (!item.answer) continue;
          const termKey = String(item.term || '').toLowerCase();
          const activeEntry = usesActiveFinancialDefinitions ? activeFinancialDefinitionMap.get(termKey) : null;
          if (activeEntry) {
            if (normaliseDefinitionText(item.answer) !== normaliseDefinitionText(activeEntry.definition)) {
              failures.push(`${label} definitionRecall item ${itemIndex + 1}: English definition for "${activeEntry.term}" must exactly match course-map-financial-decisions-data.js`);
            }
            if (!hasChineseText(item.answerZh)) {
              failures.push(`${label} definitionRecall item ${itemIndex + 1}: missing full Chinese definition translation`);
            }
          } else {
            if (!definitionMap.has(termKey) && !requiresDefinitionStyle) continue;
            validateOverviewDefinition(
              failures,
              `${label} definitionRecall item ${itemIndex + 1}`,
              item.term,
              item.answer,
              item.answerZh,
              definitionMap,
              { fallbackStyle: requiresDefinitionStyle },
            );
          }
        }
      }

      if (slide.type === 'conceptTriad') {
        for (const [conceptIndex, concept] of (slide.concepts || []).entries()) {
          if (!concept.definition) continue;
          validateOverviewDefinition(
            failures,
            `${label} concept ${conceptIndex + 1}`,
            concept.label,
            concept.definition,
            concept.definitionZh,
            definitionMap,
          );
        }
      }
    }
  }

  return failures;
}

function requireChinese(failures, label, value, description) {
  if (!hasChineseText(value)) failures.push(`${label}: missing ${description}`);
}

function requireChineseArray(failures, label, englishItems, chineseItems, description) {
  const source = Array.isArray(englishItems) ? englishItems : [];
  const translations = Array.isArray(chineseItems) ? chineseItems : [];

  if (source.length !== translations.length) {
    failures.push(`${label}: ${description} must have ${source.length} Chinese entries`);
    return;
  }

  translations.forEach((value, index) => {
    if (!hasChineseText(value)) failures.push(`${label}: missing ${description} ${index + 1}`);
  });
}

function validateImportantChineseSupport() {
  const failures = [];

  for (const slideFile of findInvestmentSlideFiles(courseRoot)) {
    const lesson = readInvestmentLesson(slideFile);
    for (const [index, slide] of (lesson.slides || []).entries()) {
      const label = `${slideFile} slide ${index + 1} (${slide.type || 'unknown'}: ${slide.title || slide.term || 'untitled'})`;

      if (slide.type === 'marketBrief') {
        failures.push(`${label}: do not use deprecated marketBrief slides`);
        continue;
      }

      if (slide.type === 'visualPause') continue;

      if (slide.type !== 'term' && slide.title) {
        requireChinese(failures, label, slide.zhTitle, 'zhTitle for the main slide title');
      }

      switch (slide.type) {
        case 'hero':
          if (slide.question) requireChinese(failures, label, slide.questionZh, 'questionZh for the main question');
          break;
        case 'priceChart':
          if (slide.question) requireChinese(failures, label, slide.questionZh, 'questionZh for the chart question');
          break;
        case 'outcomes':
          requireChineseArray(failures, label, slide.bullets, slide.zhBullets, 'zhBullets');
          break;
        case 'discussion':
          if (slide.question || slide.prompt) {
            if (!hasChineseText(slide.zh) && !hasChineseText(slide.questionZh) && !hasChineseText(slide.promptZh)) {
              failures.push(`${label}: missing Chinese support for the discussion question`);
            }
          }
          if (slide.answer || slide.note) requireChinese(failures, label, slide.answerZh, 'answerZh for the revealed answer');
          break;
        case 'term':
          requireChinese(failures, label, slide.termZh, 'termZh');
          requireChinese(failures, label, slide.definitionZh, 'definitionZh');
          break;
        case 'answer':
          (slide.items || []).forEach((item, itemIndex) => {
            if (item.prompt) requireChinese(failures, `${label} item ${itemIndex + 1}`, item.zh, 'Chinese support for the answer item');
          });
          break;
        case 'flow':
          (slide.steps || []).forEach((step, stepIndex) => {
            if (typeof step === 'string') {
              failures.push(`${label} step ${stepIndex + 1}: flow steps must be objects with zh support`);
            } else if (step.text) {
              requireChinese(failures, `${label} step ${stepIndex + 1}`, step.zh, 'Chinese support for the flow step');
            }
          });
          break;
        case 'peerTask':
          if (slide.taskType === 'definitionRecall') {
            if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the recall prompt');
            (slide.definitionItems || []).forEach((item, itemIndex) => {
              if (item.term) requireChinese(failures, `${label} definition ${itemIndex + 1}`, item.termZh, 'termZh for the recall term');
              if (item.answer) requireChinese(failures, `${label} definition ${itemIndex + 1}`, item.answerZh, 'answerZh for the model definition');
            });
            if (slide.sharePrompt) requireChinese(failures, label, slide.sharePromptZh, 'sharePromptZh for the recall share prompt');
          } else if (slide.taskType === 'missingSentence') {
            if (slide.prompt) {
              if (!hasChineseText(slide.promptZh) && !hasChineseText(slide.zhPrompt)) {
                failures.push(`${label}: missing Chinese support for the missing-sentence prompt`);
              }
            }
            (slide.steps || []).forEach((step, stepIndex) => {
              if (typeof step === 'string') {
                failures.push(`${label} step ${stepIndex + 1}: missingSentence steps must be objects with zh support`);
              } else if (step.text) {
                requireChinese(failures, `${label} step ${stepIndex + 1}`, step.zh, 'Chinese support for the missing-sentence step');
              }
            });
            if (slide.missingSentenceAnswer) requireChinese(failures, label, slide.missingSentenceAnswerZh, 'missingSentenceAnswerZh');
            if (slide.sharePrompt) requireChinese(failures, label, slide.sharePromptZh, 'sharePromptZh for the missing-sentence share prompt');
          } else {
            (slide.steps || []).forEach((step, stepIndex) => {
              if (typeof step === 'string') {
                failures.push(`${label} step ${stepIndex + 1}: peerTask steps must be objects with zh support`);
              } else if (step.text) {
                requireChinese(failures, `${label} step ${stepIndex + 1}`, step.zh, 'Chinese support for the peer-task step');
              }
            });
            if (slide.sampleAnswer) requireChinese(failures, label, slide.sampleAnswerZh, 'sampleAnswerZh for the revealed sample answer');
          }
          break;
        case 'rankingTask':
          if (slide.prompt || slide.task) {
            requireChinese(failures, label, slide.promptZh || slide.taskZh, 'promptZh for the ranking task');
          }
          if (slide.axis?.low) requireChinese(failures, label, slide.axis.lowZh, 'lowZh for the ranking axis');
          if (slide.axis?.high) requireChinese(failures, label, slide.axis.highZh, 'highZh for the ranking axis');
          if (slide.axis?.note) requireChinese(failures, label, slide.axis.noteZh, 'noteZh for the ranking axis');
          (slide.items || slide.cases || []).forEach((item, itemIndex) => {
            if (item.text || item.title) requireChinese(failures, `${label} item ${itemIndex + 1}`, item.zh || item.textZh, 'Chinese support for the ranking card');
            if (item.cue || item.hint) {
              failures.push(`${label} item ${itemIndex + 1}: ranking cards must not include pre-reveal cue or hint text`);
            }
          });
          (slide.modelOrder || slide.answerOrder || []).forEach((item, itemIndex) => {
            if (item.text || item.title) requireChinese(failures, `${label} model item ${itemIndex + 1}`, item.zh || item.textZh, 'Chinese support for the model ranking item');
            if (item.reason) requireChinese(failures, `${label} model item ${itemIndex + 1}`, item.reasonZh, 'reasonZh for the model ranking reason');
          });
          if (slide.caveat) requireChinese(failures, label, slide.caveatZh, 'caveatZh for the ranking caveat');
          if (slide.writtenCheck) requireChinese(failures, label, slide.writtenCheckZh, 'writtenCheckZh for the ranking written check');
          break;
        case 'quiz':
          if (slide.question) requireChinese(failures, label, slide.zh, 'zh for the quiz question');
          if (slide.explanation) requireChinese(failures, label, slide.explanationZh, 'explanationZh for quiz feedback');
          break;
        case 'dataSnapshot':
          if (slide.note) requireChinese(failures, label, slide.noteZh, 'noteZh for the data note');
          if (slide.task) requireChinese(failures, label, slide.taskZh, 'taskZh for the student task');
          break;
        case 'conceptTriad':
          (slide.concepts || []).forEach((concept, conceptIndex) => {
            if (concept.definition) requireChinese(failures, `${label} concept ${conceptIndex + 1}`, concept.definitionZh, 'definitionZh for the concept definition');
          });
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the concept prompt');
          break;
        case 'visualGrid':
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the visual-grid prompt');
          (slide.cards || []).forEach((card, cardIndex) => {
            if (card.title) requireChinese(failures, `${label} card ${cardIndex + 1}`, card.zhTitle, 'zhTitle for the visual-grid card');
            if (card.body) requireChinese(failures, `${label} card ${cardIndex + 1}`, card.bodyZh, 'bodyZh for the visual-grid card');
          });
          break;
        case 'sourceLens':
          if (slide.task) requireChinese(failures, label, slide.taskZh, 'taskZh for the source task');
          (slide.checks || []).forEach((check, checkIndex) => {
            if (check.prompt) requireChinese(failures, `${label} check ${checkIndex + 1}`, check.zh, 'Chinese support for the source check');
            if (check.answer) requireChinese(failures, `${label} check ${checkIndex + 1}`, check.answerZh, 'answerZh for the source-check answer');
          });
          break;
        case 'quoteMap':
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the quote-map task');
          if (slide.answer) requireChinese(failures, label, slide.answerZh, 'answerZh for the revealed quote-map answer');
          break;
        case 'compare':
          [...(slide.left || []), ...(slide.right || [])].forEach((item, itemIndex) => {
            if (item?.text || Array.isArray(item)) {
              const zh = Array.isArray(item) ? item[3] : item.zh;
              requireChinese(failures, `${label} item ${itemIndex + 1}`, zh, 'Chinese support for the compare item');
            }
            if (slide.mode === 'fillBlanks' && item?.answer) {
              if (!String(item.text || item.prompt || '').includes('__________')) {
                failures.push(`${label} item ${itemIndex + 1}: fill-blank compare item must include an English blank marker`);
              }
              if (!String(item.zh || '').includes('__________')) {
                failures.push(`${label} item ${itemIndex + 1}: fill-blank compare item must include a Chinese blank marker`);
              }
              requireChinese(failures, `${label} item ${itemIndex + 1}`, item.answerZh, 'answerZh for the compare blank');
            }
          });
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the compare task');
          break;
        case 'comparisonMatrix':
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the comparison task');
          break;
        case 'classificationTask':
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the classification task');
          if (
            slideFile === 'investment-analysis/unit-1/lesson-1/slides.js'
            && slide.title === 'For each statement, choose the main focus: return, risk or suitability.'
          ) {
            const categoryOrder = (slide.categories || []).map((category) => (
              typeof category === 'string' ? category : (category.title || category.label || '')
            )).filter(Boolean);
            const answerOrder = (slide.items || []).map((item) => item.answer || '').filter(Boolean);
            if (categoryOrder.length && answerOrder.slice(0, categoryOrder.length).join('|') === categoryOrder.join('|')) {
              failures.push(`${label}: answer order must not mirror the category order`);
            }
          }
          (slide.items || []).forEach((item, itemIndex) => {
            if (item.text || item.prompt) requireChinese(failures, `${label} item ${itemIndex + 1}`, item.zh, 'Chinese support for the classification case');
            if (item.reason) requireChinese(failures, `${label} item ${itemIndex + 1}`, item.reasonZh, 'reasonZh for the classification reason');
          });
          if (slide.sharePrompt) requireChinese(failures, label, slide.sharePromptZh, 'sharePromptZh for the classification share prompt');
          break;
        case 'yesNoCheck':
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the yes/no task');
          (slide.items || []).forEach((item, itemIndex) => {
            if (item.text || item.statement) requireChinese(failures, `${label} item ${itemIndex + 1}`, item.zh, 'Chinese support for the yes/no statement');
            if (item.reason) requireChinese(failures, `${label} item ${itemIndex + 1}`, item.reasonZh, 'reasonZh for the yes/no reason');
          });
          break;
        case 'catalystTimeline':
          (slide.events || []).forEach((event, eventIndex) => {
            if (event.detail) requireChinese(failures, `${label} event ${eventIndex + 1}`, event.detailZh, 'detailZh for the timeline detail');
            if (event.effect) requireChinese(failures, `${label} event ${eventIndex + 1}`, event.effectZh, 'effectZh for the timeline effect');
          });
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the timeline task');
          break;
        case 'judgementFrame':
          (slide.stages || []).forEach((stage, stageIndex) => {
            if (stage.prompt) requireChinese(failures, `${label} stage ${stageIndex + 1}`, stage.zh, 'Chinese support for the judgement prompt');
            if (stage.answer) requireChinese(failures, `${label} stage ${stageIndex + 1}`, stage.answerZh, 'answerZh for the judgement answer');
          });
          if (slide.finalPrompt) requireChinese(failures, label, slide.finalPromptZh, 'finalPromptZh for the final prompt');
          break;
        case 'analystBoard':
          (slide.blocks || []).forEach((block, blockIndex) => {
            if (block.body) requireChinese(failures, `${label} block ${blockIndex + 1}`, block.zh, 'Chinese support for the evidence body');
          });
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the analyst-board prompt');
          break;
        case 'calculationDesk':
          if (slide.worked) requireChinese(failures, label, slide.workedZh, 'workedZh for the worked example');
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the calculation prompt');
          if (slide.answer) requireChinese(failures, label, slide.answerZh, 'answerZh for the calculation answer');
          break;
        case 'riskRegister':
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the risk prompt');
          break;
        case 'exam':
          if (slide.prompt) requireChinese(failures, label, slide.zh, 'zh for the exam prompt');
          break;
        case 'modelAnswer':
          if (slide.cueText) requireChinese(failures, label, slide.cueTextZh, 'cueTextZh for the comparison cue');
          requireChineseArray(failures, label, slide.paragraphs, slide.paragraphsZh, 'paragraphsZh');
          if (slide.markNote) requireChinese(failures, label, slide.markNoteZh, 'markNoteZh for the mark note');
          break;
        default:
          break;
      }
    }
  }

  for (const quizFile of findInvestmentQuizFiles(courseRoot)) {
    const quiz = readInvestmentQuiz(quizFile);
    for (const [index, question] of (quiz.questions || []).entries()) {
      const label = `${quizFile} question ${index + 1} (${question.id || question.prompt || 'untitled'})`;
      if (question.prompt) requireChinese(failures, label, question.zh, 'zh for the quiz prompt');
      if (question.explanation) requireChinese(failures, label, question.explanationZh, 'explanationZh for quiz feedback');
    }
  }

  return failures;
}

function validateDiscussionRevealTitles() {
  const failures = [];
  const slideFiles = findInvestmentSlideFiles(courseRoot);

  for (const slideFile of slideFiles) {
    const lesson = readInvestmentLesson(slideFile);
    for (const [index, slide] of (lesson.slides || []).entries()) {
      if (slide.type !== 'discussion') continue;
      const revealTitle = String(slide.revealTitle || '').trim();
      if (revealTitle && vagueRevealTitlePattern.test(revealTitle)) {
        failures.push(`${slideFile} slide ${index + 1}: revealTitle "${revealTitle}" is a label, not an answer statement`);
      }
    }
  }

  if (!hasTemplateGuidance()) {
    failures.push('investment-analysis/_template/README.md: missing discussion.revealTitle answer-statement guidance');
  }

  return failures;
}

function validateActiveLessonAlignment() {
  const failures = [];
  const homepagePath = path.join(courseRoot, 'index.html');
  const homepageSource = fs.readFileSync(homepagePath, 'utf8');
  const activeLessons = [1, 2];

  const expectedTerms = new Map([
    [1, ['investment', 'return', 'financial goal']],
    [2, ['time horizon', 'liquidity need', 'suitability']],
  ]);

  for (const [lessonNumber, terms] of expectedTerms) {
    const lesson = financialDecisionCourseMap.lessons.find((entry) => entry.lesson === lessonNumber);
    const actualTerms = (lesson?.terms || []).map((entry) => String(entry.term || '').toLowerCase());
    if (JSON.stringify(actualTerms) !== JSON.stringify(terms)) {
      failures.push(`investment-analysis/course-map-financial-decisions-data.js lesson ${lessonNumber}: expected term ownership ${terms.join(', ')}`);
    }
  }

  for (const lessonNumber of activeLessons) {
    const mapLesson = financialDecisionCourseMap.lessons.find((entry) => entry.lesson === lessonNumber);
    const lessonDir = path.join(courseRoot, 'unit-1', `lesson-${lessonNumber}`);
    const slidePath = path.join(lessonDir, 'slides.js');
    const quizPath = path.join(lessonDir, 'quiz.js');
    const indexPath = path.join(lessonDir, 'index.html');
    const slideRelative = path.relative(root, slidePath).replace(/\\/g, '/');
    const quizRelative = path.relative(root, quizPath).replace(/\\/g, '/');

    for (const requiredPath of [slidePath, quizPath, indexPath]) {
      if (!fs.existsSync(requiredPath)) {
        failures.push(`${path.relative(root, requiredPath).replace(/\\/g, '/')}: active lesson file is missing`);
      }
    }
    if (!fs.existsSync(slidePath) || !fs.existsSync(quizPath) || !fs.existsSync(indexPath) || !mapLesson) continue;

    const lesson = readInvestmentLesson(slideRelative);
    const quiz = readInvestmentQuiz(quizRelative);
    const slideSource = fs.readFileSync(slidePath, 'utf8');
    const indexSource = fs.readFileSync(indexPath, 'utf8');
    const label = `investment-analysis/unit-1/lesson-${lessonNumber}`;

    if (!String(lesson.meta?.lessonLabel || '').includes(`Unit 1 Lesson ${lessonNumber}`) || !String(lesson.meta?.lessonLabel || '').includes(mapLesson.guidingQuestion)) {
      failures.push(`${label}/slides.js: lessonLabel must include the canonical lesson number and guiding question`);
    }
    if (!indexSource.includes(mapLesson.guidingQuestion)) {
      failures.push(`${label}/index.html: metadata must include the canonical guiding question`);
    }

    const openingDiscussion = (lesson.slides || []).find((slide) => slide.type === 'discussion');
    if (openingDiscussion?.question !== mapLesson.studentHook) {
      failures.push(`${label}/slides.js: opening discussion question must match courseMap.studentHook`);
    }

    const outcomes = (lesson.slides || []).filter((slide) => slide.type === 'outcomes');
    if (outcomes.length !== 1 || outcomes[0].bullets?.length !== 3 || outcomes[0].zhBullets?.length !== 3) {
      failures.push(`${label}/slides.js: active lesson must have exactly one outcomes slide with exactly three bilingual objectives`);
    }

    const slideTerms = (lesson.slides || [])
      .filter((slide) => slide.type === 'term')
      .map((slide) => String(slide.term || slide.title || '').toLowerCase());
    const mapTerms = mapLesson.terms.map((entry) => String(entry.term || '').toLowerCase());
    if (JSON.stringify(slideTerms) !== JSON.stringify(mapTerms)) {
      failures.push(`${label}/slides.js: term slides must match canonical lesson term ownership and order`);
    }

    if (!Array.isArray(lesson.handout?.sections) || lesson.handout.sections.length !== 6) {
      failures.push(`${label}/slides.js: handout must contain exactly six sections`);
    }
    const handoutOutput = lesson.handout?.sections?.[5]?.blocks?.find((block) => block.type === 'writing')?.question;
    if (handoutOutput !== mapLesson.studentOutput) {
      failures.push(`${label}/slides.js: final handout writing question must match courseMap.studentOutput`);
    }

    if (!Array.isArray(quiz.questions) || quiz.questions.length !== 10) {
      failures.push(`${label}/quiz.js: active lesson quiz must contain exactly ten questions`);
    }
    if (!String(quiz.title || '').includes(`Lesson ${lessonNumber}`)) {
      failures.push(`${label}/quiz.js: quiz title must identify the active lesson number`);
    }

    if (lessonNumber === 1 && /What is investment analysis\?|Tencent|share price|stock exchange|saving, investing or speculation/i.test(slideSource)) {
      failures.push(`${label}/slides.js: Lesson 1 must not retain archived company-analysis or saving-versus-speculation teaching`);
    }
    if (lessonNumber === 2 && /HKEX|0700\.HK|stock exchange|secondary market|trading friction/i.test(`${slideSource}\n${fs.readFileSync(quizPath, 'utf8')}\n${indexSource}`)) {
      failures.push(`${label}: active Lesson 2 must not retain archived HKEX market-infrastructure content`);
    }
  }

  for (const lessonNumber of activeLessons) {
    if (!homepageSource.includes(`unit-1/lesson-${lessonNumber}/index.html`)) {
      failures.push(`investment-analysis/index.html: missing current Lesson ${lessonNumber} route`);
    }
  }

  const archiveDirs = [
    'lesson-1-archive-2026-07-11-before-course-realignment',
    'lesson-2-archive-hkex-2026-07-11',
  ];
  for (const archiveDir of archiveDirs) {
    const archivePath = path.join(courseRoot, 'unit-1', archiveDir);
    for (const fileName of ['README.md', 'index.html', 'slides.js', 'quiz.js']) {
      if (!fs.existsSync(path.join(archivePath, fileName))) {
        failures.push(`investment-analysis/unit-1/${archiveDir}/${fileName}: required lesson archive file is missing`);
      }
    }
    if (homepageSource.includes(archiveDir)) {
      failures.push(`investment-analysis/index.html: archived route ${archiveDir} must not appear in student navigation`);
    }
  }
  if (!fs.existsSync(path.join(courseRoot, 'unit-1', archiveDirs[0], 'tencent-price-data.js'))) {
    failures.push(`investment-analysis/unit-1/${archiveDirs[0]}/tencent-price-data.js: Lesson 1 archive must preserve its local data file`);
  }

  for (const lesson of courseMap.lessons) {
    if (!isNonEmptyString(lesson.judgementFocus)) {
      failures.push(`investment-analysis/course-map-data.js lesson ${lesson.lesson}: judgementFocus must be a non-empty grammatical phrase`);
    }
    if (/\babout\s+(?:what|how|why|when|which|does|can)\b.*\?/i.test(lesson.analyseWhy?.question || '')) {
      failures.push(`investment-analysis/course-map-data.js lesson ${lesson.lesson}: analyseWhy question contains an embedded guiding question`);
    }
  }

  const lesson2 = readInvestmentLesson('investment-analysis/unit-1/lesson-2/slides.js');
  const lesson2SourceUrls = (lesson2.meta?.sources || []).map((source) => source.url || '').join('\n');
  if (!/ifec\.org\.hk/i.test(lesson2SourceUrls) || !/hkma\.gov\.hk/i.test(lesson2SourceUrls)) {
    failures.push('investment-analysis/unit-1/lesson-2/slides.js: replacement lesson must cite current official IFEC and HKMA guidance');
  }

  const lesson1 = readInvestmentLesson('investment-analysis/unit-1/lesson-1/slides.js');
  const lesson1SourceUrls = (lesson1.meta?.sources || []).map((source) => source.url || '').join('\n');
  if (!/investor\.gov/i.test(lesson1SourceUrls) || !/ifec\.org\.hk/i.test(lesson1SourceUrls)) {
    failures.push('investment-analysis/unit-1/lesson-1/slides.js: replacement lesson must cite official Investor.gov and IFEC guidance');
  }

  return failures;
}

function validateArchivedPersonalFinanceIsNotPublic() {
  const failures = [];
  const archivePath = path.join(courseRoot, '_archive', 'personal-finance-course-map-data.js');
  if (!fs.existsSync(archivePath)) {
    failures.push('investment-analysis/_archive/personal-finance-course-map-data.js: archived personal-finance syllabus must be preserved internally');
  }

  const publicFiles = [
    path.join(root, 'index.html'),
    path.join(courseRoot, 'index.html'),
    path.join(courseRoot, 'syllabus.html'),
    path.join(courseRoot, 'syllabus-company-analysis.html'),
    path.join(courseRoot, '_template', 'README.md'),
    path.join(root, 'scripts', 'export-investment-generator-context.js'),
    path.join(courseRoot, 'generator-context.js'),
  ];
  for (const filePath of publicFiles) {
    const source = fs.readFileSync(filePath, 'utf8');
    if (/Personal Finance|personal-finance|personal finance/i.test(source)) {
      failures.push(`${path.relative(root, filePath).replace(/\\/g, '/')}: must not publicly expose the archived personal-finance syllabus`);
    }
  }

  return failures;
}

const failures = [
  ...validateCourseMapContract(),
  ...validateSyllabusUsesCourseMap(),
  ...validateGeneratorContextAccess(),
  ...validateInvestmentDefinitionsOverview(),
  ...validateCompiledHandoutBook(),
  ...validateInvestmentPresentationDefinitions(),
  ...validateImportantChineseSupport(),
  ...validateDiscussionRevealTitles(),
  ...validateActiveLessonAlignment(),
  ...validateTermRenderer(),
  ...validateArchivedPersonalFinanceIsNotPublic(),
];

if (failures.length > 0) {
  console.error('Investment Analysis content validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Investment Analysis content validation passed.');
