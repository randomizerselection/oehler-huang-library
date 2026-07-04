const fs = require('fs');
const path = require('path');

const {
  MATERIAL_TARGETS,
  getCourseGeneratorContext,
  getLessonGeneratorContext,
  getLessonMaterialContext,
} = require('../investment-analysis/generator-context.js');

function usage() {
  return [
    'Usage:',
    '  node scripts/export-investment-generator-context.js',
    '  node scripts/export-investment-generator-context.js --lesson 2 --target lesson',
    '  node scripts/export-investment-generator-context.js --lesson 2 --target deck --format md',
    '',
    'Targets:',
    `  course, lesson, all, ${Object.keys(MATERIAL_TARGETS).join(', ')}`,
    '',
    'Options:',
    '  --lesson <1-30>       Lesson number for lesson/material contexts.',
    '  --target <target>     Context target. Defaults to course without --lesson, lesson with --lesson.',
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
    else if (arg === '--format') options.format = argv[++index];
    else if (arg === '--out') options.out = argv[++index];
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function buildContext(options) {
  const target = String(options.target || (options.lesson ? 'lesson' : 'course')).toLowerCase();

  if (target === 'course') return getCourseGeneratorContext();
  if (!options.lesson) throw new Error(`--lesson is required for target "${target}"`);
  if (target === 'lesson') return getLessonGeneratorContext(options.lesson);
  if (target === 'all') {
    return {
      schemaVersion: 1,
      contextType: 'lesson-all-generator-context',
      lesson: getLessonGeneratorContext(options.lesson),
      materials: Object.fromEntries(
        Object.keys(MATERIAL_TARGETS).map((key) => [key, getLessonMaterialContext(options.lesson, key)])
      ),
    };
  }
  return getLessonMaterialContext(options.lesson, target);
}

function bulletList(items = []) {
  return items.map((item) => `- ${item}`).join('\n');
}

function renderTerms(terms = []) {
  return terms.map((term) => `- ${term.term}: ${term.definition}`).join('\n');
}

function renderMarkdown(context) {
  if (context.contextType === 'course-generator-index') {
    return [
      `# ${context.course.courseTitle}: Generator Index`,
      '',
      context.course.writtenArtifactRule,
      '',
      '## Lessons',
      '',
      ...context.lessons.map((lesson) => `- Lesson ${lesson.lesson}: ${lesson.company} - ${lesson.guidingQuestion}`),
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
  const titlePrefix = context.target ? `${context.materialTarget.label}: ` : '';

  return [
    `# ${titlePrefix}Lesson ${lesson.lesson}: ${lesson.company}`,
    '',
    `**Guiding question:** ${lesson.guidingQuestion}`,
    `**Unit:** ${lesson.unit}. ${lesson.unitTitle}`,
    `**Core claim:** ${teaching.coreClaim}`,
    `**Primary output:** ${teaching.primaryOutput.description}`,
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
