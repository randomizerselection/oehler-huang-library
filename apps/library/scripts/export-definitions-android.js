'use strict';

const fs = require('fs');
const path = require('path');
const {
  SECTION_TRANSLATIONS,
  entryTranslation,
} = require('./definition-translations');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'references', 'igcse-economics-definitions-2026.md');
const outputPath = path.join(root, 'android-definitions', 'app', 'src', 'main', 'assets', 'definitions.json');

function cleanText(value) {
  return String(value || '').trim();
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function topicKeyForEntry(entry) {
  if (entry.isFormula) return 'formulas';
  return entry.ref.match(/^(\d+\.\d+)/)?.[1] || entry.unitId;
}

function topicTitleForEntries(key, entries) {
  if (key === 'formulas') return 'Formula quick reference';
  const sampleTerms = entries.slice(0, 2).map((entry) => entry.term).join(', ');
  return sampleTerms ? `${key} ${sampleTerms}` : key;
}

function parseDefinitions(markdown) {
  const sections = [];
  let currentSection = null;

  for (const rawLine of markdown.split(/\r?\n/)) {
    const heading = rawLine.match(/^##\s+(.+)$/);
    if (heading) {
      const title = cleanText(heading[1]);
      const unitNumber = title.match(/^(\d+)/)?.[1] || '';
      const isFormulaSection = title === 'Formula quick reference';
      currentSection = {
        title,
        titleZh: SECTION_TRANSLATIONS[title] || title,
        unitId: isFormulaSection ? 'formulas' : `unit-${unitNumber || 'other'}`,
        isFormulaSection,
        entries: [],
      };
      sections.push(currentSection);
      continue;
    }

    const row = rawLine.match(/^\|\s*([^|]*?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$/);
    if (!row || !currentSection) continue;

    const ref = cleanText(row[1]);
    const term = cleanText(row[2]);
    const definition = cleanText(row[3]);
    if (term === 'Term' || /^---+$/.test(ref) || /^---+$/.test(term)) continue;

    const translated = entryTranslation({ ref, term, definition });
    currentSection.entries.push({
      ref,
      term,
      definition,
      unitId: currentSection.unitId,
      unitTitle: currentSection.title === 'Formula quick reference'
        ? 'Formula quick reference'
        : `Unit ${currentSection.title}`,
      unitTitleZh: currentSection.titleZh,
      isFormula: currentSection.isFormulaSection,
      ...translated,
    });
  }

  return sections;
}

function buildAndroidDefinitions(sections) {
  return sections.flatMap((section) => {
    const topicMap = new Map();
    for (const entry of section.entries) {
      const topicId = topicKeyForEntry(entry);
      if (!topicMap.has(topicId)) topicMap.set(topicId, []);
      topicMap.get(topicId).push(entry);
    }

    const topicTitles = new Map(
      [...topicMap.entries()].map(([topicId, entries]) => [topicId, topicTitleForEntries(topicId, entries)])
    );

    return section.entries.map((entry) => {
      const topicId = topicKeyForEntry(entry);
      return {
        id: `${entry.ref || 'formula'}-${slugify(entry.term)}`,
        ref: entry.ref || 'Formula',
        term: entry.term,
        termZh: entry.termZh,
        definition: entry.definition,
        definitionZh: entry.definitionZh,
        unitId: entry.unitId,
        unitTitle: entry.unitTitle,
        unitTitleZh: entry.unitTitleZh,
        topicId,
        topicTitle: topicTitles.get(topicId) || topicId,
        isFormula: entry.isFormula,
      };
    });
  });
}

function main() {
  const markdown = fs.readFileSync(sourcePath, 'utf8');
  const sections = parseDefinitions(markdown);
  const definitions = buildAndroidDefinitions(sections);
  const ids = new Set(definitions.map((definition) => definition.id));
  if (ids.size !== definitions.length) {
    const duplicates = definitions
      .map((definition) => definition.id)
      .filter((id, index, all) => all.indexOf(id) !== index);
    throw new Error(`Duplicate Android definition IDs: ${[...new Set(duplicates)].join(', ')}`);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(definitions, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${definitions.length} Android definitions to ${path.relative(root, outputPath)}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  parseDefinitions,
  buildAndroidDefinitions,
};
