const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const courseRoot = path.join(root, 'investment-analysis');
const courseMap = require('../investment-analysis/course-map-data.js');
const { outputPath: handoutBookPath, renderHandoutBook } = require('./build-investment-handout-book.js');

const vagueRevealTitlePattern = /^(?:answer|possible answer|sample answer|model answer|model sentence|model direction|teacher cue|course rule|analysis boundary|bridge(?: to lesson \d+)?)$/i;
const requiredLessonFields = [
  'lesson',
  'unit',
  'company',
  'guidingQuestion',
  'terms',
  'formulaOrNoFormula',
  'retrievalBase',
  'newKnowledge',
  'evidenceTask',
  'misconception',
  'studentOutput',
  'handoutSections',
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

function validateCourseMapContract() {
  const failures = [];

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

    for (const field of ['company', 'guidingQuestion', 'formulaOrNoFormula', 'retrievalBase', 'newKnowledge', 'evidenceTask', 'misconception', 'studentOutput']) {
      if (!isNonEmptyString(lesson[field])) failures.push(`${label}: "${field}" must be a non-empty string`);
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

function validateCompiledHandoutBook() {
  const failures = [];
  const expected = normaliseLineEndings(renderHandoutBook(courseMap));
  const actual = fs.existsSync(handoutBookPath)
    ? normaliseLineEndings(fs.readFileSync(handoutBookPath, 'utf8'))
    : '';

  if (actual !== expected) {
    failures.push('investment-analysis/companion-textbook/compiled-handout-book.md: compiled handout book is missing or out of date');
    return failures;
  }

  const lessonHeadings = actual.match(/^## Lesson \d+:/gm) || [];
  const unitHeadings = actual.match(/^# Unit \d+:/gm) || [];
  const sourceBoxes = actual.match(/^### Source box$/gm) || [];

  if (lessonHeadings.length !== 30) failures.push('compiled handout book: expected 30 lesson handouts');
  if (unitHeadings.length !== 6) failures.push('compiled handout book: expected 6 unit dividers');
  if (sourceBoxes.length !== 30) failures.push('compiled handout book: every lesson handout needs a source box');
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
