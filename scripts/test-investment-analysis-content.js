const fs = require('fs');
const path = require('path');
const vm = require('vm');
const childProcess = require('child_process');

const root = path.resolve(__dirname, '..');
const courseRoot = path.join(root, 'investment-analysis');
const courseMap = require('../investment-analysis/course-map-data.js');
const {
  MATERIAL_TARGETS,
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

const vagueRevealTitlePattern = /^(?:answer|possible answer|sample answer|model answer|model sentence|model direction|teacher cue|course rule|analysis boundary|bridge(?: to lesson \d+)?)$/i;
const requiredLessonFields = [
  'lesson',
  'unit',
  'company',
  'guidingQuestion',
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

function hasTemplateGuidance() {
  const readmePath = path.join(courseRoot, '_template', 'README.md');
  const source = fs.readFileSync(readmePath, 'utf8');
  return /discussion\.revealTitle.+concise answer statement/i.test(source);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function normaliseLineEndings(value) {
  return String(value).replace(/\r\n/g, '\n');
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

  if (!Array.isArray(courseMap.units) || courseMap.units.length !== 6) {
    failures.push('investment-analysis/course-map-data.js: expected exactly 6 units');
  }

  if (!Array.isArray(courseMap.lessons) || courseMap.lessons.length !== 30) {
    failures.push('investment-analysis/course-map-data.js: expected exactly 30 lessons');
    return failures;
  }

  if (!/handout/i.test(courseMap.writtenArtifactRule || '') || !/textbook/i.test(courseMap.writtenArtifactRule || '')) {
    failures.push('investment-analysis/course-map-data.js: writtenArtifactRule must state the handout/textbook relationship');
  }

  if (!/textbook-only/i.test(courseMap.textbookAssembly?.rule || '')) {
    failures.push('investment-analysis/course-map-data.js: textbookAssembly.rule must forbid textbook-only teaching chapters');
  }

  const seenLessons = new Set();
  for (const lesson of courseMap.lessons) {
    const label = `investment-analysis/course-map-data.js lesson ${lesson.lesson || '?'}`;
    for (const field of requiredLessonFields) {
      if (!(field in lesson)) failures.push(`${label}: missing required field "${field}"`);
    }

    if (!Number.isInteger(lesson.lesson) || lesson.lesson < 1 || lesson.lesson > 30) {
      failures.push(`${label}: lesson number must be an integer from 1 to 30`);
    }
    if (seenLessons.has(lesson.lesson)) failures.push(`${label}: duplicate lesson number`);
    seenLessons.add(lesson.lesson);

    const expectedUnit = Math.floor((lesson.lesson - 1) / 5) + 1;
    if (lesson.unit !== expectedUnit) {
      failures.push(`${label}: expected unit ${expectedUnit}, got ${lesson.unit}`);
    }

    for (const field of ['company', 'guidingQuestion', 'formulaOrNoFormula', 'formativeAssessment', 'exitTicket', 'retrievalBase', 'newKnowledge', 'evidenceTask', 'misconception', 'studentOutput', 'coreClaim']) {
      if (!isNonEmptyString(lesson[field])) failures.push(`${label}: "${field}" must be a non-empty string`);
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
      failures.push(`${label}: examPattern checkpoint must match the five-lesson unit`);
    }
    for (const field of ['itemType', 'sourceRequirement', 'task', 'mustAssess']) {
      if (!isNonEmptyString(lesson.examPattern?.[field])) failures.push(`${label}: examPattern.${field} must be a non-empty string`);
    }

    for (const field of ['retrievalBase', 'newKnowledge', 'avoidOverlap', 'misconception', 'evidenceTask', 'studentOutput']) {
      if (!isNonEmptyString(lesson.cardGenerator?.[field])) failures.push(`${label}: cardGenerator.${field} must be a non-empty string`);
    }
  }

  for (let lessonNumber = 1; lessonNumber <= 30; lessonNumber += 1) {
    if (!seenLessons.has(lessonNumber)) {
      failures.push(`investment-analysis/course-map-data.js: missing lesson ${lessonNumber}`);
    }
  }

  return failures;
}

function validateSyllabusUsesCourseMap() {
  const failures = [];
  const syllabusPath = path.join(courseRoot, 'syllabus.html');
  const source = fs.readFileSync(syllabusPath, 'utf8');

  if (!/course-map-data\.js/.test(source) || !/course-map-render\.js/.test(source)) {
    failures.push('investment-analysis/syllabus.html: must load course-map-data.js and course-map-render.js');
  }
  if (!/data-course-map-generator-rows/.test(source)) {
    failures.push('investment-analysis/syllabus.html: generator table must render from the course map data target');
  }
  if (!/data-course-map-lesson-grid/.test(source)) {
    failures.push('investment-analysis/syllabus.html: lesson cards must render from the course map data target');
  }
  if (/data-syllabus-lesson/.test(source)) {
    failures.push('investment-analysis/syllabus.html: remove static lesson cards; render them from course-map-data.js');
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

  const courseContext = getCourseGeneratorContext(courseMap);
  if (courseContext.contextType !== 'course-generator-index') {
    failures.push('investment-analysis/generator-context.js: course context must identify itself as course-generator-index');
  }
  if (!Array.isArray(courseContext.lessons) || courseContext.lessons.length !== 30) {
    failures.push('investment-analysis/generator-context.js: course context must expose all 30 lessons');
  }

  for (let lessonNumber = 1; lessonNumber <= 30; lessonNumber += 1) {
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
      '--lesson',
      '2',
      '--target',
      'deck',
    ], { cwd: root, encoding: 'utf8' });
    const parsed = JSON.parse(jsonOutput);
    if (parsed.target !== 'deck' || parsed.lesson.lesson !== 2) {
      failures.push('scripts/export-investment-generator-context.js: deck JSON output must include target deck and lesson 2');
    }

    const markdownOutput = childProcess.execFileSync(process.execPath, [
      exportScriptPath,
      '--lesson',
      '2',
      '--target',
      'handout',
      '--format',
      'md',
    ], { cwd: root, encoding: 'utf8' });
    if (!/Lesson 2: HKEX/.test(markdownOutput) || !/Generation Rules/.test(markdownOutput)) {
      failures.push('scripts/export-investment-generator-context.js: markdown output must include the lesson and generation rules');
    }
  } catch (error) {
    failures.push(`scripts/export-investment-generator-context.js: CLI failed: ${error.message}`);
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

  if (lessonHeadings.length !== 30) failures.push('compiled handout book: expected 30 lesson handouts');
  if (unitHeadings.length !== 6) failures.push('compiled handout book: expected 6 unit dividers');
  if (sourceBoxes.length !== 30) failures.push('compiled handout book: every lesson handout needs a source box');
  if (blueprintLessonHeadings.length !== 30) failures.push('teacher blueprint: expected 30 lesson blueprints');
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

const failures = [
  ...validateCourseMapContract(),
  ...validateSyllabusUsesCourseMap(),
  ...validateGeneratorContextAccess(),
  ...validateCompiledHandoutBook(),
  ...validateDiscussionRevealTitles(),
  ...validateTermRenderer(),
];

if (failures.length > 0) {
  console.error('Investment Analysis content validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Investment Analysis content validation passed.');
