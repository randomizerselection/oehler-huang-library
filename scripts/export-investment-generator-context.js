const fs = require('fs');
const path = require('path');

const {
  MATERIAL_TARGETS,
  loadCourseMap,
  getCourseGeneratorContext,
  getLessonGeneratorContext,
  getLessonMaterialContext,
} = require('../investment-analysis/generator-context.js');

function usage() {
  return [
    'Usage:',
    '  node scripts/export-investment-generator-context.js',
    '  node scripts/export-investment-generator-context.js --lesson 5 --target lesson',
    '  node scripts/export-investment-generator-context.js --lesson 5 --target deck --format md',
    '',
    'Targets:',
    `  course, lesson, all, ${Object.keys(MATERIAL_TARGETS).join(', ')}`,
    '',
    'Options:',
    '  --lesson <1-50>       Lesson number for lesson/material contexts.',
    '  --target <target>     Context target. Defaults to course without --lesson, lesson with --lesson.',
    '  --syllabus <key>      default/financial-decisions (active) or company-analysis (archived).',
    '  --format <json|md>    Output format. Defaults to json.',
    '  --out <path>          Write to a file instead of stdout.',
    '  --help                Show this message.',
  ].join('\n');
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--lesson') options.lesson = argv[++index];
    else if (arg === '--target') options.target = argv[++index];
    else if (arg === '--syllabus') options.syllabus = argv[++index];
    else if (arg === '--format') options.format = argv[++index];
    else if (arg === '--out') options.out = argv[++index];
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function buildContext(options) {
  const target = String(options.target || (options.lesson ? 'lesson' : 'course')).toLowerCase();
  const courseMap = loadCourseMap(options.syllabus || 'default');

  if (target === 'course') return getCourseGeneratorContext(courseMap);
  if (!options.lesson) throw new Error(`--lesson is required for target "${target}"`);
  if (target === 'lesson') return getLessonGeneratorContext(options.lesson, courseMap);
  if (target === 'all') {
    return {
      schemaVersion: 1,
      contextType: 'lesson-all-generator-context',
      lesson: getLessonGeneratorContext(options.lesson, courseMap),
      materials: Object.fromEntries(
        Object.keys(MATERIAL_TARGETS).map((key) => [key, getLessonMaterialContext(options.lesson, key, courseMap)])
      ),
    };
  }
  return getLessonMaterialContext(options.lesson, target, courseMap);
}

function bulletList(items = []) {
  return items.map((item) => `- ${item}`).join('\n');
}

function renderTerms(terms = []) {
  return terms.map((term) => `- ${term.term}: ${term.definition}`).join('\n');
}

function sentence(value = '') {
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function renderRetrievalPractice(retrievalPractice = {}) {
  const lines = [];
  if (retrievalPractice.yesNo) lines.push(`- Yes/no: ${retrievalPractice.yesNo.prompt} Answer: ${sentence(retrievalPractice.yesNo.answer)}`);
  if (retrievalPractice.multipleChoice) lines.push(`- Multiple choice: ${retrievalPractice.multipleChoice.prompt} Answer: ${sentence(retrievalPractice.multipleChoice.answer)}`);
  if (retrievalPractice.matching) lines.push(`- Matching: ${retrievalPractice.matching.prompt}`);
  if (retrievalPractice.sourceCheck) lines.push(`- Source check: ${retrievalPractice.sourceCheck}`);
  return lines.join('\n');
}

function renderWorksheet(worksheet = {}) {
  const section = worksheet.evidenceAndDataAnalysis;
  if (!section) return '';
  return [
    `**Stimulus:** ${section.stimulus}`,
    '',
    ...section.questions.map((question, index) => `${index + 1}. **${question.command}:** ${question.prompt}`),
  ].join('\n');
}

function renderInvestmentAction(action = {}) {
  if (!action.studentAction) return '';
  return [
    `- Action: ${action.studentAction}`,
    `- Decision rule: ${action.decisionRule}`,
    `- Fit check: ${action.portfolioQuestion}`,
    `- Written action: ${action.classroomOutput}`,
  ].join('\n');
}

function renderDecisionFirst(decisionFirst = {}) {
  if (!decisionFirst.starterDilemma) return '';
  return [
    `- Starter dilemma: ${decisionFirst.starterDilemma}`,
    `- First judgement: ${decisionFirst.firstJudgementPrompt}`,
    `- Likely naive answer: ${decisionFirst.likelyNaiveAnswer}`,
    `- Missing evidence: ${decisionFirst.missingEvidence}`,
    `- Key idea: ${decisionFirst.keyIdea}`,
    `- Try it: ${decisionFirst.tryIt}`,
    `- Misconception check: ${decisionFirst.misconceptionCheck}`,
    `- Exit judgement: ${decisionFirst.exitJudgement}`,
  ].join('\n');
}

function renderSimpleFlow(flow = []) {
  return flow.map((step) => `- ${step.label}: ${step.text}`).join('\n');
}

function renderPassportAnswerFormat(label, format = {}) {
  const optionGroups = (format.optionGroups || [])
    .map((group) => `${group.label}: ${(group.options || []).join(' / ')}`)
    .join('; ');
  const sentenceFrames = (format.sentenceFrames || []).join(' | ');
  return [
    `- Answer format - ${label}: ${format.answerType || 'Not specified'}`,
    ...(optionGroups ? [`  - Tick choices: ${optionGroups}`] : []),
    ...(sentenceFrames ? [`  - Sentence frames: ${sentenceFrames}`] : []),
  ].join('\n');
}

function renderPassport(checkpoint = {}) {
  if (!checkpoint.lesson) return '';
  const formats = checkpoint.answerFormats || {};
  return [
    `- Booklet page: ${checkpoint.lesson}. ${checkpoint.title}`,
    `- Page layout: ${checkpoint.pageLayout}`,
    `- Focus: ${checkpoint.focus}`,
    `- My first thought: ${checkpoint.firstThoughtPrompt}`,
    renderPassportAnswerFormat('My first thought', formats.firstThought),
    `- What today's evidence showed: ${checkpoint.evidencePrompt}`,
    renderPassportAnswerFormat("What today's evidence showed", formats.evidence),
    `- My revised decision: ${checkpoint.revisedDecisionPrompt}`,
    renderPassportAnswerFormat('My revised decision', formats.revisedDecision),
    `- Still missing: ${checkpoint.missingInformationPrompt}`,
    renderPassportAnswerFormat('Still missing', formats.missingInformation),
    `- Timing: ${checkpoint.timing}`,
    `- Teacher note: ${checkpoint.teacherNote}`,
    `- Privacy: ${checkpoint.privacyRule}`,
  ].join('\n');
}

function renderMarkdown(context) {
  if (context.contextType === 'course-generator-index') {
    const passportPilot = context.course.personalPassportPilot;
    return [
      `# ${context.course.courseTitle}: Generator Index`,
      '',
      context.course.writtenArtifactRule,
      '',
      '## Decision-First Teaching Model',
      '',
      context.course.decisionFirstSyllabus?.coursePromise || '',
      '',
      bulletList(context.course.decisionFirstSyllabus?.lessonContract || []),
      '',
      '## Practical Investing Workflow',
      '',
      ...((context.course.investmentWorkflow || []).map((step) => `- Step ${step.step}: ${step.title} - ${step.studentAction}`)),
      '',
      '## Simple Lesson Structure',
      '',
      ...((context.course.simpleLessonStructure || []).map((step) => `- ${step.label}: ${step.purpose}`)),
      '',
      ...(passportPilot ? [
        '## Unit 1 My Future Investor Passport Pilot',
        '',
        passportPilot.purpose,
        '',
        `- Booklet: ${passportPilot.bookletRoute}`,
        `- Page layout: ${passportPilot.pageLayout}`,
        ...passportPilot.routine.map((step) => `- ${step}`),
        '',
      ] : []),
      '## Lessons',
      '',
      ...context.lessons.map((lesson) => `- Lesson ${lesson.lesson}: ${lesson.caseAnchor || lesson.company} - ${lesson.guidingQuestion}`),
      '',
      '## Generation Rules',
      '',
      bulletList(context.generationRules),
    ].join('\n').trim() + '\n';
  }

  if (context.contextType === 'lesson-all-generator-context') {
    return [
      renderMarkdown(context.lesson).trim(),
      '',
      '## Material Targets',
      '',
      ...Object.values(context.materials).map((material) => `- ${material.target}: ${material.materialTarget.label}`),
    ].join('\n').trim() + '\n';
  }

  const lesson = context.lesson;
  const requiredInputs = context.requiredInputs || context;
  const teaching = requiredInputs.teachingContract || context.teachingContract;
  const content = requiredInputs.contentContract || context.contentContract;
  const evidence = requiredInputs.evidenceContract || context.evidenceContract;
  const artifact = requiredInputs.artifactContract || context.artifactContract;
  const assessment = requiredInputs.assessmentContract || context.assessmentContract;
  const passport = context.generatorBrief.passportCheckpoint || teaching.passportCheckpoint || lesson.passportCheckpoint;
  const titlePrefix = context.target ? `${context.materialTarget.label}: ` : '';

  return [
    `# ${titlePrefix}Lesson ${lesson.lesson}: ${lesson.caseAnchor || lesson.company}`,
    '',
    `**Guiding question:** ${lesson.guidingQuestion}`,
    `**Unit:** ${lesson.unit}. ${lesson.unitTitle}`,
    `**Core claim:** ${teaching.coreClaim}`,
    `**Primary output:** ${teaching.primaryOutput.description}`,
    `**Student hook:** ${context.generatorBrief.studentHook || lesson.studentHook || ''}`,
    '',
    '## Decision-First Contract',
    '',
    renderDecisionFirst(context.generatorBrief.decisionFirst || teaching.decisionFirst || lesson.decisionFirst),
    '',
    '## Simple Lesson Flow',
    '',
    renderSimpleFlow(context.generatorBrief.simpleFlow || lesson.simpleFlow || []),
    '',
    '## Generator Brief',
    '',
    `- Builds on: ${context.generatorBrief.retrievalBase}`,
    `- New learning: ${context.generatorBrief.newKnowledge}`,
    `- Avoid overlap: ${context.generatorBrief.avoidOverlap}`,
    `- Misconception: ${context.generatorBrief.misconception}`,
    `- Evidence task: ${context.generatorBrief.evidenceTask}`,
    `- Student output: ${context.generatorBrief.studentOutput}`,
    '',
    '## Practical Investing Action',
    '',
    renderInvestmentAction(context.generatorBrief.investmentAction || teaching.investmentAction || lesson.investmentAction),
    '',
    ...(passport ? [
      '## My Future Investor Passport',
      '',
      renderPassport(passport),
      '',
    ] : []),
    '## Retrieval Practice',
    '',
    renderRetrievalPractice(context.generatorBrief.retrievalPractice),
    '',
    '## Evidence and Data Analysis Worksheet',
    '',
    renderWorksheet(context.generatorBrief.worksheet),
    '',
    '## Analyse Why',
    '',
    `- Question: ${context.generatorBrief.analyseWhy?.question || lesson.analyseWhy?.question || ''}`,
    `- Chain: ${(context.generatorBrief.analyseWhy?.chain || lesson.analyseWhy?.chain || []).join(' -> ')}`,
    '',
    '## Terms',
    '',
    renderTerms(content.terms),
    '',
    '## Source Pack',
    '',
    bulletList(evidence.sourcePack.requiredSourceTypes),
    '',
    '## Artifact',
    '',
    bulletList(artifact.artifactBlueprint.deckArc),
    '',
    '## Assessment',
    '',
    `- Command word: ${assessment.assessmentBlueprint.commandWord}`,
    `- Marks: ${assessment.assessmentBlueprint.marks}`,
    `- Stimulus: ${assessment.assessmentBlueprint.stimulusType}`,
    `- Calculation: ${assessment.assessmentBlueprint.calculationRequirement}`,
    `- Judgement: ${assessment.assessmentBlueprint.judgementRequirement}`,
    '',
    '## Generation Rules',
    '',
    bulletList(context.generationRules),
  ].join('\n').trim() + '\n';
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }

  const format = String(options.format || 'json').toLowerCase();
  const context = buildContext(options);
  let output;
  if (format === 'json') output = `${JSON.stringify(context, null, 2)}\n`;
  else if (format === 'md' || format === 'markdown') output = renderMarkdown(context);
  else throw new Error(`Unsupported format: ${format}`);

  if (options.out) {
    const outputPath = path.resolve(options.out);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, output, 'utf8');
  } else {
    process.stdout.write(output);
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    console.error('');
    console.error(usage());
    process.exit(1);
  }
}
