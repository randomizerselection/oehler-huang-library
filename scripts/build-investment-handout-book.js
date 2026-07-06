const fs = require('fs');
const path = require('path');

const courseMap = require('../investment-analysis/course-map-data.js');
const { getInvestmentDefinitionMap } = require('./investment-definitions');

const root = path.resolve(__dirname, '..');
const outputPath = path.join(root, 'investment-analysis', 'companion-textbook', 'compiled-handout-book.md');
const teacherBlueprintPath = path.join(root, 'investment-analysis', 'companion-textbook', 'course-map-teacher-blueprint.md');
const investmentDefinitionMap = getInvestmentDefinitionMap();

function line(value = '') {
  return value;
}

function renderTermTable(terms) {
  return [
    '| Term | Chinese support | Definition |',
    '| --- | --- | --- |',
    ...terms.map((term) => {
      const textbookDefinition = investmentDefinitionMap.get(String(term.term || '').toLowerCase())?.definition || term.definition;
      return `| ${term.term} | ${term.zh} | ${textbookDefinition} |`;
    }),
  ].join('\n');
}

function renderHandoutBlock(lesson, block) {
  const lines = [];
  lines.push(line(`### ${block.title}`));
  lines.push(line());

  if (block.key === 'vocabulary') {
    lines.push(line(renderTermTable(lesson.terms)));
  } else if (block.key === 'companyEvidence' && lesson.worksheet?.evidenceAndDataAnalysis) {
    const worksheet = lesson.worksheet.evidenceAndDataAnalysis;
    lines.push(line(`**Case information:** ${worksheet.stimulus}`));
    lines.push(line());
    lines.push(line('**Questions:**'));
    lines.push(line());
    for (const [index, question] of worksheet.questions.entries()) {
      lines.push(line(`${index + 1}. **${question.command}:** ${question.prompt}`));
    }
  } else {
    lines.push(line(block.prompt));
  }

  if (block.expectedStudentWork) {
    lines.push(line());
    lines.push(line(`**Expected student work:** ${block.expectedStudentWork}`));
  }

  return lines.join('\n').trim();
}

function renderLessonHandout(lesson) {
  const sections = [];
  sections.push(line(`## Lesson ${lesson.lesson}: ${lesson.guidingQuestion}`));
  sections.push(line());
  sections.push(line(`**Case anchor:** ${lesson.company}`));
  sections.push(line(`**Unit:** ${lesson.unit}. ${lesson.unitTitle}`));
  sections.push(line(`**Guiding question:** ${lesson.guidingQuestion}`));
  if (lesson.studentHook) sections.push(line(`**Student hook:** ${lesson.studentHook}`));
  sections.push(line(`**Core claim:** ${lesson.coreClaim}`));
  sections.push(line(`**Primary output:** ${lesson.primaryOutput.description}`));
  sections.push(line(`**Formula or formula rule:** ${lesson.formulaOrNoFormula}`));
  if (lesson.analyseWhy?.question) sections.push(line(`**Analyse why:** ${lesson.analyseWhy.question}`));
  if (lesson.investmentAction?.studentAction) {
    sections.push(line(`**Practical investing action:** ${lesson.investmentAction.studentAction}`));
    sections.push(line(`**Decision rule:** ${lesson.investmentAction.decisionRule}`));
  }
  sections.push(line());

  const handoutBlocks = lesson.artifactBlueprint?.handoutBlocks || lesson.handoutSections;
  for (const section of handoutBlocks) {
    sections.push(line(renderHandoutBlock(lesson, section)));
    sections.push(line());
  }

  return sections.join('\n').trim();
}

function renderBulletList(items) {
  return items.map((item) => `- ${item}`).join('\n');
}

function renderDecisionFirstContract(decisionFirst = {}) {
  if (!decisionFirst.starterDilemma) return '';
  return [
    `- **Starter dilemma:** ${decisionFirst.starterDilemma}`,
    `- **First judgement:** ${decisionFirst.firstJudgementPrompt}`,
    `- **Likely naive answer:** ${decisionFirst.likelyNaiveAnswer}`,
    `- **Missing evidence:** ${decisionFirst.missingEvidence}`,
    `- **Key idea:** ${decisionFirst.keyIdea}`,
    `- **Try it:** ${decisionFirst.tryIt}`,
    `- **Misconception check:** ${decisionFirst.misconceptionCheck}`,
    `- **Exit judgement:** ${decisionFirst.exitJudgement}`,
  ].join('\n');
}

function sentence(value = '') {
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function renderLessonTeacherBlueprint(lesson) {
  const lines = [];
  lines.push(`## Lesson ${lesson.lesson}: ${lesson.company}`);
  lines.push('');
  lines.push(`**Guiding question:** ${lesson.guidingQuestion}`);
  if (lesson.studentHook) lines.push(`**Student hook:** ${lesson.studentHook}`);
  lines.push(`**Core claim:** ${lesson.coreClaim}`);
  lines.push(`**Case role:** ${lesson.caseRole}`);
  lines.push(`**Primary output:** ${lesson.primaryOutput.type} - ${lesson.primaryOutput.description}`);
  lines.push(`**Case review:** ${lesson.caseReview.status}; ${lesson.caseReview.reason}`);
  if (lesson.caseReview.replacementCandidate) {
    lines.push(`**Replacement candidate:** ${lesson.caseReview.replacementCandidate}`);
  }
  lines.push('');
  if (Array.isArray(lesson.simpleFlow)) {
    lines.push('### Simple lesson flow');
    lines.push('');
    for (const step of lesson.simpleFlow) {
      lines.push(`- **${step.label}:** ${step.text}`);
    }
    lines.push('');
  }
  if (lesson.decisionFirst) {
    lines.push('### Decision-first teaching contract');
    lines.push('');
    lines.push(renderDecisionFirstContract(lesson.decisionFirst));
    lines.push('');
  }
  lines.push('### Source pack');
  lines.push('');
  lines.push(renderBulletList(lesson.sourcePack.requiredSourceTypes));
  lines.push('');
  lines.push(`**Preferred source order:** ${lesson.sourcePack.preferredSourceOrder.join(' -> ')}`);
  lines.push(`**Snapshot fields:** ${lesson.sourcePack.snapshotDateFields.join(', ')}`);
  lines.push('');
  lines.push('**Evidence limitations:**');
  lines.push(renderBulletList(lesson.sourcePack.evidenceLimitations));
  lines.push('');
  lines.push('### Deck arc');
  lines.push('');
  lines.push(renderBulletList(lesson.artifactBlueprint.deckArc));
  lines.push('');
  if (lesson.retrievalPractice) {
    lines.push('### Retrieval practice');
    lines.push('');
    lines.push(`- **Yes/no:** ${lesson.retrievalPractice.yesNo.prompt} Answer: ${sentence(lesson.retrievalPractice.yesNo.answer)}`);
    lines.push(`- **Multiple choice:** ${lesson.retrievalPractice.multipleChoice.prompt} Answer: ${sentence(lesson.retrievalPractice.multipleChoice.answer)}`);
    lines.push(`- **Matching/classification:** ${lesson.retrievalPractice.matching.prompt}`);
    lines.push(`- **Source check:** ${lesson.retrievalPractice.sourceCheck}`);
    lines.push('');
  }
  if (lesson.investmentAction) {
    lines.push('### Practical investing action');
    lines.push('');
    lines.push(`- **Action:** ${lesson.investmentAction.studentAction}`);
    lines.push(`- **Decision rule:** ${lesson.investmentAction.decisionRule}`);
    lines.push(`- **Fit check:** ${lesson.investmentAction.portfolioQuestion}`);
    lines.push(`- **Written action:** ${lesson.investmentAction.classroomOutput}`);
    lines.push('');
  }
  if (lesson.analyseWhy) {
    lines.push('### Analyse why');
    lines.push('');
    lines.push(lesson.analyseWhy.question);
    lines.push('');
    lines.push(renderBulletList(lesson.analyseWhy.chain));
    lines.push('');
  }
  if (lesson.worksheet?.evidenceAndDataAnalysis) {
    const worksheet = lesson.worksheet.evidenceAndDataAnalysis;
    lines.push('### Evidence and Data Analysis worksheet');
    lines.push('');
    lines.push(`**Case information:** ${worksheet.stimulus}`);
    lines.push('');
    for (const [index, question] of worksheet.questions.entries()) {
      lines.push(`${index + 1}. **${question.command}:** ${question.prompt}`);
    }
    lines.push('');
  }
  lines.push('### Handout/chapter blocks');
  lines.push('');
  for (const block of lesson.artifactBlueprint.handoutBlocks) {
    lines.push(`- **${block.title}:** ${block.prompt}`);
  }
  lines.push('');
  lines.push('### Exam pattern');
  lines.push('');
  lines.push(`- Command word: ${lesson.assessmentBlueprint.commandWord}`);
  lines.push(`- Marks: ${lesson.assessmentBlueprint.marks}`);
  lines.push(`- Stimulus: ${lesson.assessmentBlueprint.stimulusType}`);
  lines.push(`- Calculation: ${lesson.assessmentBlueprint.calculationRequirement}`);
  lines.push(`- Judgement: ${lesson.assessmentBlueprint.judgementRequirement}`);
  lines.push(`- Shape: ${lesson.artifactBlueprint.examItemShape}`);

  return lines.join('\n');
}

function renderTeacherBlueprint(map = courseMap) {
  const lines = [];
  lines.push(`# ${map.courseTitle}: Teacher Blueprint`);
  lines.push('');
  lines.push('This file is generated from `investment-analysis/course-map-data.js`. Use it to build lesson decks, handouts, handout-book chapters and exam questions from the same contract.');
  lines.push('');
  if (map.decisionFirstSyllabus) {
    lines.push('## Decision-First Teaching Model');
    lines.push('');
    lines.push(map.decisionFirstSyllabus.coursePromise);
    lines.push('');
    lines.push(renderBulletList(map.decisionFirstSyllabus.lessonContract));
    lines.push('');
  }
  if (Array.isArray(map.investmentWorkflow)) {
    lines.push('## Practical Investing Workflow');
    lines.push('');
    for (const step of map.investmentWorkflow) {
      lines.push(`- **Step ${step.step}: ${step.title}:** ${step.studentAction}`);
    }
    lines.push('');
  }
  if (Array.isArray(map.simpleLessonStructure)) {
    lines.push('## Simple Lesson Structure');
    lines.push('');
    for (const step of map.simpleLessonStructure) {
      lines.push(`- **${step.label}:** ${step.purpose}`);
    }
    lines.push('');
  }
  lines.push('## Source-Fit Audit');
  lines.push('');
  lines.push(map.sourceFitAudit.rule);
  lines.push('');
  lines.push(renderBulletList(map.sourceFitAudit.checks));
  lines.push('');
  lines.push('## Case Review Table');
  lines.push('');
  lines.push('| Lesson | Case anchor | Role | Status | Replacement candidate |');
  lines.push('| --- | --- | --- | --- | --- |');
  for (const lesson of map.lessons) {
    lines.push(`| ${lesson.lesson} | ${lesson.company} | ${lesson.caseRole} | ${lesson.caseReview.status} | ${lesson.caseReview.replacementCandidate || ''} |`);
  }

  for (const unit of map.units) {
    lines.push('');
    lines.push(`# Unit ${unit.unit}: ${unit.title}`);
    lines.push('');
    lines.push(unit.summary);
    lines.push('');
    for (const lesson of map.lessons.filter((item) => item.unit === unit.unit)) {
      lines.push(renderLessonTeacherBlueprint(lesson));
      lines.push('');
    }
  }

  return `${lines.join('\n').trim()}\n`;
}

function renderHandoutBook(map = courseMap) {
  const parts = [];
  parts.push(line(`# ${map.courseTitle}: Compiled Handout Book`));
  parts.push(line());
  parts.push(line(map.writtenArtifactRule));
  parts.push(line());
  if (map.practicalInvestingBoundary) {
    parts.push(line(map.practicalInvestingBoundary));
    parts.push(line());
  }
  if (map.definitionOverview?.source) {
    parts.push(line(`Vocabulary definitions use the textbook-style overview at \`${map.definitionOverview.source}\`, prioritising ${map.definitionOverview.prioritySource || 'the course definition source'} where course terms overlap.`));
    parts.push(line());
  }
  parts.push(line('Educational use only. Students make evidence-based classroom judgements, not personalised financial advice.'));
  parts.push(line());

  parts.push(line('## Contents'));
  parts.push(line());
  for (const unit of map.units) {
    parts.push(line(`- Unit ${unit.unit}: ${unit.title} (Lessons ${unit.lessons[0]}-${unit.lessons[1]})`));
    for (const lesson of map.lessons.filter((item) => item.unit === unit.unit)) {
      parts.push(line(`  - Lesson ${lesson.lesson}: ${lesson.company} - ${lesson.guidingQuestion}`));
    }
  }

  for (const unit of map.units) {
    parts.push(line());
    parts.push(line(`# Unit ${unit.unit}: ${unit.title}`));
    parts.push(line());
    parts.push(line(unit.summary));
    parts.push(line());
    for (const lesson of map.lessons.filter((item) => item.unit === unit.unit)) {
      parts.push(line(renderLessonHandout(lesson)));
      parts.push(line());
    }
  }

  return `${parts.join('\n').trim()}\n`;
}

function writeHandoutBook() {
  const output = renderHandoutBook();
  const teacherBlueprint = renderTeacherBlueprint();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, output, 'utf8');
  fs.writeFileSync(teacherBlueprintPath, teacherBlueprint, 'utf8');
  return outputPath;
}

if (require.main === module) {
  if (process.argv.includes('--check')) {
    const expected = renderHandoutBook();
    const expectedTeacherBlueprint = renderTeacherBlueprint();
    const actual = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
    const actualTeacherBlueprint = fs.existsSync(teacherBlueprintPath) ? fs.readFileSync(teacherBlueprintPath, 'utf8') : '';
    if (actual !== expected) {
      console.error(`Compiled handout book is out of date: ${path.relative(root, outputPath)}`);
      process.exit(1);
    }
    if (actualTeacherBlueprint !== expectedTeacherBlueprint) {
      console.error(`Teacher blueprint is out of date: ${path.relative(root, teacherBlueprintPath)}`);
      process.exit(1);
    }
    console.log(`Compiled handout book and teacher blueprint are current.`);
  } else {
    const written = writeHandoutBook();
    console.log(`Wrote ${path.relative(root, written)} and ${path.relative(root, teacherBlueprintPath)}`);
  }
}

module.exports = {
  outputPath,
  teacherBlueprintPath,
  renderHandoutBook,
  renderTeacherBlueprint,
  writeHandoutBook,
};
