'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'references', 'investment-analysis-definitions.md');
const cfaMatchesPath = path.join(root, 'references', 'investment-analysis-cfa-glossary-matches.json');
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

function getInvestmentCfaMatches() {
  return JSON.parse(fs.readFileSync(cfaMatchesPath, 'utf8'));
}

function getInvestmentCfaMatchMap() {
  const data = getInvestmentCfaMatches();
  return new Map((data.matches || []).map((match) => [String(match.term || '').toLowerCase(), match]));
}

module.exports = {
  root,
  sourcePath,
  cfaMatchesPath,
  htmlOutputPath,
  parseFrontMatter,
  parseInvestmentDefinitions,
  getInvestmentDefinitionSections,
  getInvestmentDefinitionEntries,
  getInvestmentDefinitionMap,
  getInvestmentCfaMatches,
  getInvestmentCfaMatchMap,
};
