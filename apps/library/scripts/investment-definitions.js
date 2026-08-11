'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'references', 'investment-analysis-definitions.md');
const cfaMatchesPath = path.join(root, 'references', 'investment-analysis-cfa-glossary-matches.json');
const textbookDefinitionsPath = path.join(root, 'references', 'investment-analysis-textbook-definitions.json');
const htmlOutputPath = path.join(root, 'investment-analysis', 'definitions.html');

function cleanText(value) {
  return String(value || '').trim();
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseFrontMatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  return Object.fromEntries(match[1].split(/\r?\n/)
    .map((line) => line.match(/^([a-zA-Z0-9_-]+):\s*"?([^"]*)"?\s*$/))
    .filter(Boolean)
    .map((lineMatch) => [lineMatch[1], lineMatch[2]]));
}

function splitMarkdownRow(line) {
  const source = String(line || '').trim();
  if (!source.startsWith('|') || !source.endsWith('|')) return null;
  return source.slice(1, -1).split('|').map((cell) => cleanText(cell));
}

function parseInvestmentDefinitions(markdown) {
  const sections = [];
  let currentSection = null;

  for (const rawLine of markdown.split(/\r?\n/)) {
    const heading = rawLine.match(/^##\s+Unit\s+(\d+):\s+(.+)$/i);
    if (heading) {
      const unit = Number(heading[1]);
      const title = cleanText(heading[2]);
      currentSection = {
        id: `unit-${unit}-${slugify(title)}`,
        unit,
        title,
        entries: [],
      };
      sections.push(currentSection);
      continue;
    }

    const cells = splitMarkdownRow(rawLine);
    if (!cells || !currentSection || cells.length < 5) continue;

    const [ref, term, zh, definition, definitionZhOrCourseUse, maybeCourseUse] = cells;
    if (/^---+$/.test(ref) || /^ref$/i.test(ref)) continue;
    const hasDefinitionZh = cells.length >= 6;

    const lessonMatch = ref.match(/L(\d+)/i);
    const entry = {
      ref,
      term: cleanText(term),
      zh: cleanText(zh),
      definition: cleanText(definition),
      definitionZh: hasDefinitionZh ? cleanText(definitionZhOrCourseUse) : '',
      courseUse: cleanText(hasDefinitionZh ? maybeCourseUse : definitionZhOrCourseUse),
      unit: currentSection.unit,
      lesson: lessonMatch ? Number(lessonMatch[1]) : null,
      sectionId: currentSection.id,
      sectionTitle: currentSection.title,
    };
    currentSection.entries.push(entry);
  }

  return sections;
}

function getInvestmentDefinitionSections() {
  return parseInvestmentDefinitions(fs.readFileSync(sourcePath, 'utf8'));
}

function getInvestmentDefinitionEntries() {
  return getInvestmentDefinitionSections().flatMap((section) => section.entries);
}

function getInvestmentDefinitionMap() {
  return new Map(getInvestmentDefinitionEntries().map((entry) => [entry.term.toLowerCase(), entry]));
}

function getCourseMapDefinitionSections(map = require('../investment-analysis/course-map-financial-decisions-data.js')) {
  const legacyDefinitions = getInvestmentDefinitionMap();
  const seen = new Set();

  return map.units.map((unit) => {
    const entries = [];
    for (const lesson of map.lessons.filter((item) => item.unit === unit.unit)) {
      for (const term of lesson.terms || []) {
        const key = String(term.term || '').toLowerCase();
        if (!key || seen.has(key)) continue;
        seen.add(key);
        const legacy = legacyDefinitions.get(key);
        entries.push({
          ref: `U${unit.unit} L${lesson.lesson}`,
          term: cleanText(term.term),
          zh: cleanText(term.zh),
          definition: cleanText(term.definition),
          definitionZh: cleanText(term.definitionZh || legacy?.definitionZh),
          courseUse: `Introduced in Lesson ${lesson.lesson}: ${lesson.guidingQuestion}`,
          unit: unit.unit,
          lesson: lesson.lesson,
          sectionId: `unit-${unit.unit}-${slugify(unit.title)}`,
          sectionTitle: unit.title,
        });
      }
    }
    return {
      id: `unit-${unit.unit}-${slugify(unit.title)}`,
      unit: unit.unit,
      title: unit.title,
      entries,
    };
  });
}

function getInvestmentCfaMatches() {
  return JSON.parse(fs.readFileSync(cfaMatchesPath, 'utf8'));
}

function getInvestmentCfaMatchMap() {
  const data = getInvestmentCfaMatches();
  return new Map((data.matches || []).map((match) => [String(match.term || '').toLowerCase(), match]));
}

function getInvestmentTextbookDefinitions() {
  return JSON.parse(fs.readFileSync(textbookDefinitionsPath, 'utf8'));
}

function getInvestmentTextbookDefinitionMap() {
  const data = getInvestmentTextbookDefinitions();
  const sourceMap = new Map((data.sources || []).map((source) => [source.id, source]));
  const map = new Map();

  for (const match of data.matches || []) {
    const key = String(match.term || '').toLowerCase();
    const source = sourceMap.get(match.sourceId) || {};
    const entry = {
      ...match,
      source,
    };
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(entry);
  }

  return map;
}

module.exports = {
  root,
  sourcePath,
  cfaMatchesPath,
  textbookDefinitionsPath,
  htmlOutputPath,
  parseFrontMatter,
  parseInvestmentDefinitions,
  getInvestmentDefinitionSections,
  getInvestmentDefinitionEntries,
  getInvestmentDefinitionMap,
  getCourseMapDefinitionSections,
  getInvestmentCfaMatches,
  getInvestmentCfaMatchMap,
  getInvestmentTextbookDefinitions,
  getInvestmentTextbookDefinitionMap,
};
