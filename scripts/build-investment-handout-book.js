const fs = require('fs');
const path = require('path');

const courseMap = require('../investment-analysis/course-map-data.js');

const root = path.resolve(__dirname, '..');
const outputPath = path.join(root, 'investment-analysis', 'companion-textbook', 'compiled-handout-book.md');

function line(value = '') {
  return value;
}

function renderTermTable(terms) {
  return [
    '| Term | Chinese support | Definition |',
    '| --- | --- | --- |',
    ...terms.map((term) => `| ${term.term} | ${term.zh} | ${term.definition} |`),
  ].join('\n');
}

function renderLessonHandout(lesson) {
  const sections = [];
  sections.push(line(`## Lesson ${lesson.lesson}: ${lesson.guidingQuestion}`));
  sections.push(line());
  sections.push(line(`**Company:** ${lesson.company}`));
  sections.push(line(`**Unit:** ${lesson.unit}. ${lesson.unitTitle}`));
  sections.push(line(`**Guiding question:** ${lesson.guidingQuestion}`));
  sections.push(line(`**Formula or formula rule:** ${lesson.formulaOrNoFormula}`));
  sections.push(line());

  for (const section of lesson.handoutSections) {
    sections.push(line(`### ${section.title}`));
    sections.push(line());
    if (section.key === 'vocabulary') {
      sections.push(line(renderTermTable(lesson.terms)));
    } else {
      sections.push(line(section.task));
    }
    sections.push(line());
  }

  return sections.join('\n').trim();
}

function renderHandoutBook(map = courseMap) {
  const parts = [];
  parts.push(line(`# ${map.courseTitle}: Compiled Handout Book`));
  parts.push(line());
  parts.push(line(map.writtenArtifactRule));
  parts.push(line());
  parts.push(line('Educational use only. This classroom book does not provide personal investment advice.'));
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
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, output, 'utf8');
  return outputPath;
}

if (require.main === module) {
  if (process.argv.includes('--check')) {
    const expected = renderHandoutBook();
    const actual = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
    if (actual !== expected) {
      console.error(`Compiled handout book is out of date: ${path.relative(root, outputPath)}`);
      process.exit(1);
    }
    console.log(`Compiled handout book is current: ${path.relative(root, outputPath)}`);
  } else {
    const written = writeHandoutBook();
    console.log(`Wrote ${path.relative(root, written)}`);
  }
}

module.exports = {
  outputPath,
  renderHandoutBook,
  writeHandoutBook,
};
