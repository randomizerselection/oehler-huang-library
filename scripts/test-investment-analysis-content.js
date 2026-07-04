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
          });
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the compare task');
          break;
        case 'comparisonMatrix':
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the comparison task');
          break;
        case 'classificationTask':
          if (slide.prompt) requireChinese(failures, label, slide.promptZh, 'promptZh for the classification task');
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

const failures = [
  ...validateCourseMapContract(),
  ...validateSyllabusUsesCourseMap(),
  ...validateGeneratorContextAccess(),
  ...validateCompiledHandoutBook(),
  ...validateImportantChineseSupport(),
  ...validateDiscussionRevealTitles(),
  ...validateTermRenderer(),
];

if (failures.length > 0) {
  console.error('Investment Analysis content validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Investment Analysis content validation passed.');
