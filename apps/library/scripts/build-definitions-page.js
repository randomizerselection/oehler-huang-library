'use strict';

const fs = require('fs');
const path = require('path');
const {
  SECTION_TRANSLATIONS,
  entryTranslation,
} = require('./definition-translations');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'references', 'igcse-economics-definitions-2026.md');
const outputPath = path.join(root, 'definitions.html');

function cleanText(value) {
  return String(value || '')
    .replace(/鈥檚/g, "'s")
    .replace(/鈥\?s/g, "'s")
    .replace(/鈥\?/g, "'")
    .replace(/梅/g, '÷')
    .replace(/脳/g, '×')
    .replace(/鈭\?/g, '−')
    .trim();
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function serializeJsonForScript(value) {
  return JSON.stringify(value)
    .replace(/&/g, '\\u0026')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseDefinitions(markdown) {
  const sections = [];
  let currentSection = null;

  for (const rawLine of markdown.split(/\r?\n/)) {
    const heading = rawLine.match(/^##\s+(.+)$/);
    if (heading) {
      const title = cleanText(heading[1]);
      currentSection = {
        id: slugify(title),
        title,
        titleZh: SECTION_TRANSLATIONS[title] || title,
        filter: title === 'Formula quick reference' ? 'formulas' : `unit-${title.match(/^(\d+)/)?.[1] || 'other'}`,
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

    const entry = {
      ref,
      term,
      definition,
      sectionId: currentSection.id,
      sectionTitle: currentSection.title,
      sectionTitleZh: currentSection.titleZh,
      filter: currentSection.filter,
    };
    Object.assign(entry, entryTranslation(entry));
    currentSection.entries.push(entry);
  }

  return sections;
}

function parseFrontMatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  return Object.fromEntries(match[1].split(/\r?\n/)
    .map((line) => line.match(/^([a-zA-Z0-9_-]+):\s*"?([^"]*)"?\s*$/))
    .filter(Boolean)
    .map((lineMatch) => [lineMatch[1], lineMatch[2]]));
}

function renderSectionNav(sections) {
  return sections.map((section) => `
        <a class="section-link" href="#${section.id}">
          <span>${escapeHtml(section.title)}</span>
          <small lang="zh-Hans">${escapeHtml(section.titleZh)}</small>
          <b>${section.entries.length}</b>
        </a>`).join('');
}

function renderFilterChips(sections) {
  const filters = [
    { id: 'all', label: 'All', zh: '全部', count: sections.reduce((sum, section) => sum + section.entries.length, 0) },
    ...sections.map((section) => ({
      id: section.filter,
      label: section.title === 'Formula quick reference' ? 'Formulas' : `Unit ${section.title.match(/^(\d+)/)?.[1]}`,
      zh: section.titleZh.replace(/^\d+\s*/, ''),
      count: section.entries.length,
    })),
  ];

  return filters.map((filter, index) => `
          <button class="filter-chip" type="button" data-filter="${escapeHtml(filter.id)}" aria-pressed="${index === 0 ? 'true' : 'false'}">
            <span>${escapeHtml(filter.label)}</span>
            <small lang="zh-Hans">${escapeHtml(filter.zh)}</small>
            <b>${filter.count}</b>
          </button>`).join('');
}

function topicKeyForEntry(entry) {
  if (entry.filter === 'formulas') return 'formulas';
  return entry.ref.match(/^(\d+\.\d+)/)?.[1] || entry.filter;
}

function topicTitleForEntries(key, entries) {
  if (key === 'formulas') return 'Formula quick reference';
  const sampleTerms = entries.slice(0, 2).map((entry) => entry.term).join(', ');
  return sampleTerms ? `${key} ${sampleTerms}` : key;
}

function buildStudyGroups(sections) {
  return sections.map((section) => {
    const topicMap = new Map();

    for (const entry of section.entries) {
      const topicKey = topicKeyForEntry(entry);
      if (!topicMap.has(topicKey)) topicMap.set(topicKey, []);
      topicMap.get(topicKey).push(entry);
    }

    const unitNumber = section.title.match(/^(\d+)/)?.[1];
    const unitTitle = section.title === 'Formula quick reference'
      ? 'Formula quick reference'
      : `Unit ${unitNumber}: ${section.title.replace(/^\d+\s*/, '')}`;

    return {
      id: section.filter,
      title: unitTitle,
      titleZh: section.titleZh.replace(/^\d+\s*/, ''),
      count: section.entries.length,
      topics: [...topicMap.entries()].map(([key, entries]) => ({
        key,
        title: topicTitleForEntries(key, entries),
        count: entries.length,
      })),
    };
  });
}

function renderStudyPicker(sections, total) {
  const groups = buildStudyGroups(sections);

  return `
      <section class="study-panel" aria-labelledby="study-title">
        <button class="study-toggle" type="button" data-study-toggle aria-expanded="false" aria-controls="definition-study-picker">
          <span>
            <small class="study-kicker">Flashcard test</small>
            <strong id="study-title">Study definitions <span lang="zh-Hans">定义抽认卡</span></strong>
            <em>Choose syllabus parts for a self-marking test.</em>
          </span>
          <b data-study-summary>${total} selected</b>
        </button>
        <div id="definition-study-picker" class="study-picker" data-study-picker hidden>
          <div class="study-panel-head">
            <div>
              <p class="study-kicker">Flashcard setup</p>
              <h2>Choose what to study <span lang="zh-Hans">选择复习范围</span></h2>
            </div>
            <div class="study-count" aria-live="polite">
              <b data-study-count>${total}</b>
              <span data-study-count-label>definitions selected</span>
            </div>
          </div>
          <p class="study-intro">Choose the syllabus parts you want to practise. The card shows the ref and English term first; reveal it to check the English definition and Chinese translation.</p>
          <label class="study-option is-master">
            <input type="checkbox" data-study-all checked />
            <span>
              <strong>All definitions</strong>
              <small lang="zh-Hans">全部定义和公式</small>
            </span>
            <b>${total}</b>
          </label>
          <div class="study-groups" aria-label="Choose units and topics">
${groups.map((group) => `
            <details class="study-group" open>
              <summary>
                <span>${escapeHtml(group.title)}</span>
                <small lang="zh-Hans">${escapeHtml(group.titleZh)}</small>
                <b>${group.count}</b>
              </summary>
              <div class="study-group-options">
                <label class="study-option">
                  <input type="checkbox" data-study-unit="${escapeHtml(group.id)}" disabled />
                  <span>
                    <strong>Whole ${escapeHtml(group.title)}</strong>
                    <small>All topic groups in this part</small>
                  </span>
                  <b>${group.count}</b>
                </label>
                <div class="topic-options">
${group.topics.map((topic) => `
                  <label class="study-option is-topic">
                    <input type="checkbox" data-study-topic="${escapeHtml(topic.key)}" data-study-unit-parent="${escapeHtml(group.id)}" disabled />
                    <span>
                      <strong>${escapeHtml(topic.title)}</strong>
                      <small>${topic.count === 1 ? '1 definition' : `${topic.count} definitions`}</small>
                    </span>
                    <b>${topic.count}</b>
                  </label>`).join('')}
                </div>
              </div>
            </details>`).join('')}
          </div>
          <div class="study-start-row">
            <button class="study-start-button" type="button" data-study-start>Start flashcard test</button>
          </div>
        </div>
      </section>`;
}

function renderFlashcardData(sections) {
  return sections.flatMap((section) => section.entries.map((entry, index) => ({
    id: `${entry.ref || 'formula'}-${entry.term}-${index}`,
    ref: entry.ref || 'Formula',
    term: entry.term,
    termZh: entry.termZh,
    definition: entry.definition,
    definitionZh: entry.definitionZh,
    unit: section.filter,
    topic: topicKeyForEntry(entry),
    sectionTitle: section.title,
    sectionTitleZh: section.titleZh,
  })));
}

function renderEntry(entry, index) {
  const searchText = [
    entry.ref,
    entry.term,
    entry.termZh,
    entry.definition,
    entry.definitionZh,
    entry.sectionTitle,
    entry.sectionTitleZh,
  ].join(' ').toLowerCase();

  return `
          <article class="definition-card" data-filter="${escapeHtml(entry.filter)}" data-search="${escapeHtml(searchText)}">
            <header class="card-head">
              <span class="ref">${escapeHtml(entry.ref || 'Formula')}</span>
              <span class="card-index">${index + 1}</span>
            </header>
            <h3>${escapeHtml(entry.term)}</h3>
            <p class="term-zh" lang="zh-Hans">${escapeHtml(entry.termZh)}</p>
            <div class="definition-copy">
              <p>${escapeHtml(entry.definition)}</p>
              <p class="definition-zh" lang="zh-Hans">${escapeHtml(entry.definitionZh)}</p>
            </div>
          </article>`;
}

function renderSections(sections) {
  let runningIndex = 0;
  return sections.map((section) => {
    const cards = section.entries.map((entry) => renderEntry(entry, runningIndex++)).join('');
    return `
      <section class="definition-section" id="${section.id}" data-section="${escapeHtml(section.filter)}">
        <div class="definition-section-head">
          <div>
            <span class="section-kicker">${escapeHtml(section.title === 'Formula quick reference' ? 'Quick reference' : `Unit ${section.title.match(/^(\d+)/)?.[1]}`)}</span>
            <h2>${escapeHtml(section.title)}</h2>
            <p lang="zh-Hans">${escapeHtml(section.titleZh)}</p>
          </div>
          <span class="section-count">${section.entries.length} terms</span>
        </div>
        <div class="definition-grid">
${cards}
        </div>
      </section>`;
  }).join('');
}

function renderPage(sections, metadata) {
  const total = sections.reduce((sum, section) => sum + section.entries.length, 0);
  const sourceDate = metadata.converted_on || 'the canonical source date';
  const flashcardData = renderFlashcardData(sections);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="description" content="Cambridge IGCSE Economics 0455 key definitions for student revision, with exam-ready English wording and Chinese translations." />
  <meta name="author" content="Samuel Oehler-Huang, Suzhou Foreign Language School" />
  <title>IGCSE Economics Key Definitions</title>
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="assets/css/theme.css" />
  <style>
    :root {
      --page-max: 1180px;
      --card-radius: 8px;
    }

    body {
      min-height: 100vh;
      overflow-y: auto;
    }

    a {
      color: inherit;
    }

    .definition-page {
      width: min(var(--page-max), calc(100% - 40px));
      margin: 0 auto;
      padding: 24px 0 58px;
    }

    .top-link {
      display: inline-flex;
      align-items: center;
      min-height: 38px;
      padding: .55rem .75rem;
      border: 1px solid var(--line);
      border-radius: 8px;
      color: var(--ink-dim);
      text-decoration: none;
      font-size: 14px;
      font-weight: 800;
      background: rgba(255,255,255,.045);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .revision-hero {
      margin-top: 18px;
      padding: clamp(24px, 4.5vw, 54px);
      border: 1px solid var(--line);
      border-radius: 8px;
      background:
        linear-gradient(135deg, rgba(86,216,255,.14), rgba(255,255,255,.035) 46%, rgba(255,209,102,.08)),
        var(--bg-1);
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: .55rem;
      margin-bottom: .7rem;
      color: var(--green);
      font-size: 13px;
      font-weight: 850;
      letter-spacing: .13em;
      text-transform: uppercase;
    }

    .eyebrow::before {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--green);
    }

    .revision-hero h1 {
      max-width: 15ch;
      font-size: clamp(44px, 6vw, 88px);
      line-height: 1.05;
      letter-spacing: 0;
    }

    .hero-zh {
      margin-top: .5rem;
      color: var(--cyan);
      font-size: clamp(22px, 2.2vw, 34px);
      font-weight: 850;
      line-height: 1.2;
    }

    .revision-hero .lead {
      max-width: 58rem;
      margin-top: 1rem;
      color: var(--ink-dim);
      font-size: clamp(18px, 1.9vw, 28px);
      line-height: 1.35;
    }

    .source-note {
      margin-top: 1rem;
      max-width: 68rem;
      color: var(--muted);
      font-size: 15px;
      line-height: 1.55;
    }

    .source-note code {
      color: var(--gold);
      font-size: .95em;
    }

    .revision-tools {
      position: sticky;
      top: 0;
      z-index: 4;
      margin: 18px 0 28px;
      padding: .9rem;
      border: 1px solid rgba(255,255,255,.13);
      border-radius: 8px;
      background: rgba(7,17,31,.92);
      backdrop-filter: blur(14px);
      box-shadow: 0 16px 36px rgba(0,0,0,.28);
    }

    .search-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: .8rem;
      align-items: center;
    }

    .search-box {
      min-width: 0;
      width: 100%;
      min-height: 48px;
      padding: .8rem 1rem;
      border: 1px solid var(--line-strong);
      border-radius: 8px;
      background: rgba(255,255,255,.06);
      color: var(--ink);
      font: inherit;
      font-size: 16px;
      outline: none;
    }

    .search-box:focus {
      border-color: rgba(86,216,255,.65);
      box-shadow: 0 0 0 3px rgba(86,216,255,.14);
    }

    .result-count {
      min-width: 120px;
      color: var(--ink-dim);
      font-size: 14px;
      font-weight: 850;
      text-align: right;
    }

    .result-count b {
      color: var(--gold);
      font-size: 1.3em;
    }

    .filter-row {
      display: flex;
      flex-wrap: wrap;
      gap: .55rem;
      margin-top: .8rem;
    }

    .filter-chip {
      display: inline-grid;
      grid-template-columns: auto auto;
      gap: .1rem .45rem;
      align-items: center;
      min-height: 40px;
      padding: .55rem .7rem;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: rgba(255,255,255,.045);
      color: var(--ink-dim);
      cursor: pointer;
      font: inherit;
      text-align: left;
    }

    .filter-chip[aria-pressed="true"] {
      border-color: rgba(126,240,181,.55);
      background: rgba(126,240,181,.12);
      color: #fff;
    }

    .filter-chip span {
      font-size: 13px;
      font-weight: 900;
    }

    .filter-chip small {
      grid-column: 1;
      color: var(--muted);
      font-size: 12px;
    }

    .filter-chip b {
      grid-row: 1 / span 2;
      grid-column: 2;
      color: var(--gold);
      font-size: 13px;
    }

    .study-panel {
      display: grid;
      gap: .7rem;
      margin: -10px 0 28px;
    }

    .study-toggle {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: .75rem;
      align-items: center;
      width: 100%;
      min-height: 74px;
      padding: .85rem .95rem;
      border: 1px solid rgba(255,255,255,.13);
      border-radius: 8px;
      background: rgba(255,255,255,.04);
      color: inherit;
      cursor: pointer;
      font: inherit;
      text-align: left;
      box-shadow: 0 10px 24px rgba(0,0,0,.14);
    }

    .study-toggle:hover,
    .study-toggle[aria-expanded="true"] {
      border-color: rgba(126,240,181,.5);
      background: rgba(126,240,181,.08);
    }

    .study-toggle span {
      min-width: 0;
      display: grid;
      gap: .16rem;
    }

    .study-toggle strong {
      color: #fff;
      font-size: clamp(18px, 1.6vw, 24px);
      font-weight: 900;
      line-height: 1.1;
    }

    .study-toggle strong span {
      display: inline;
      color: var(--cyan);
      font-size: .78em;
      font-weight: 850;
    }

    .study-toggle em {
      color: var(--ink-dim);
      font-size: 13px;
      font-style: normal;
      line-height: 1.35;
    }

    .study-toggle b {
      color: var(--gold);
      font-size: 13px;
      white-space: nowrap;
    }

    .study-picker {
      display: grid;
      gap: .8rem;
      padding: .9rem;
      border: 1px solid rgba(255,255,255,.13);
      border-radius: 8px;
      background: rgba(7,17,31,.78);
      box-shadow: 0 12px 28px rgba(0,0,0,.18);
    }

    .study-picker[hidden] {
      display: none !important;
    }

    .study-panel-head {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: end;
    }

    .study-kicker {
      color: var(--green);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: .12em;
      text-transform: uppercase;
    }

    .study-panel h2 {
      margin-top: .15rem;
      color: #fff;
      font-size: clamp(21px, 2vw, 30px);
      line-height: 1.1;
      letter-spacing: 0;
    }

    .study-panel h2 span {
      display: block;
      margin-top: .2rem;
      color: var(--cyan);
      font-size: .72em;
    }

    .study-intro {
      max-width: 68rem;
      color: var(--ink-dim);
      font-size: 14px;
      line-height: 1.5;
    }

    .study-count {
      flex: 0 0 auto;
      color: var(--ink-dim);
      font-size: 13px;
      font-weight: 850;
      text-align: right;
    }

    .study-count b {
      color: var(--gold);
      font-size: 1.45em;
    }

    .study-option {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: .7rem;
      align-items: center;
      min-width: 0;
      padding: .7rem .75rem;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: rgba(255,255,255,.04);
      color: var(--ink-dim);
      cursor: pointer;
    }

    .study-option input {
      width: 18px;
      height: 18px;
      accent-color: var(--green);
    }

    .study-option input:disabled {
      cursor: not-allowed;
    }

    .study-option span {
      min-width: 0;
      display: grid;
      gap: .15rem;
    }

    .study-option strong {
      color: #fff;
      font-size: 14px;
      line-height: 1.2;
      overflow-wrap: anywhere;
    }

    .study-option small {
      color: var(--muted);
      font-size: 12px;
      line-height: 1.25;
    }

    .study-option b {
      color: var(--gold);
      font-size: 13px;
    }

    .study-option:has(input:checked) {
      border-color: rgba(126,240,181,.55);
      background: rgba(126,240,181,.1);
    }

    .study-groups {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: .65rem;
    }

    .study-group {
      min-width: 0;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: rgba(255,255,255,.03);
      overflow: hidden;
    }

    .study-group summary {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: .15rem .6rem;
      align-items: center;
      padding: .75rem;
      cursor: pointer;
      list-style: none;
    }

    .study-group summary::-webkit-details-marker {
      display: none;
    }

    .study-group summary span {
      grid-column: 1;
      color: #fff;
      font-size: 13px;
      font-weight: 900;
      line-height: 1.2;
      overflow-wrap: anywhere;
    }

    .study-group summary small {
      grid-column: 1;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.25;
    }

    .study-group summary b {
      grid-column: 2;
      grid-row: 1 / span 2;
      justify-self: end;
      color: var(--green);
      font-size: 14px;
    }

    .study-group-options {
      display: grid;
      gap: .55rem;
      padding: 0 .65rem .65rem;
    }

    .topic-options {
      display: grid;
      gap: .45rem;
    }

    .study-option.is-topic {
      padding: .6rem .65rem;
      background: rgba(255,255,255,.025);
    }

    .study-start-row {
      display: flex;
      justify-content: flex-end;
    }

    .study-start-button,
    .definition-flashcards button {
      min-height: 42px;
      border: 1px solid rgba(126,240,181,.55);
      border-radius: 8px;
      background: rgba(126,240,181,.16);
      color: #fff;
      font: inherit;
      font-weight: 900;
      cursor: pointer;
    }

    .study-start-button {
      padding: .7rem 1rem;
    }

    .study-start-button:disabled,
    .definition-flashcards button:disabled {
      opacity: .48;
      cursor: not-allowed;
    }

    .section-nav {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: .7rem;
      margin-bottom: 32px;
    }

    .section-link {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: .2rem .7rem;
      min-width: 0;
      padding: .85rem;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: rgba(255,255,255,.035);
      text-decoration: none;
    }

    .section-link span {
      grid-column: 1;
      grid-row: 1;
      color: #fff;
      font-size: 14px;
      font-weight: 850;
      line-height: 1.2;
    }

    .section-link small {
      grid-column: 1;
      grid-row: 2;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.3;
    }

    .section-link b {
      grid-row: 1 / span 2;
      grid-column: 2;
      align-self: center;
      justify-self: end;
      color: var(--green);
      font-size: 18px;
    }

    .definition-section {
      margin: 0 0 38px;
      scroll-margin-top: 130px;
    }

    .definition-section[hidden],
    .definition-card[hidden] {
      display: none;
    }

    .definition-section-head {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: end;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--line);
    }

    .section-kicker {
      color: var(--green);
      font-size: 12px;
      font-weight: 850;
      letter-spacing: .12em;
      text-transform: uppercase;
    }

    .definition-section h2 {
      margin-top: .25rem;
      font-size: clamp(28px, 3vw, 48px);
      line-height: 1.05;
      letter-spacing: 0;
    }

    .definition-section-head p {
      margin-top: .35rem;
      color: var(--ink-dim);
      font-size: clamp(17px, 1.4vw, 23px);
      font-weight: 750;
      line-height: 1.25;
    }

    .section-count {
      flex: 0 0 auto;
      color: var(--gold);
      font-size: 14px;
      font-weight: 850;
    }

    .definition-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: .85rem;
    }

    .definition-card {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: .62rem;
      min-height: 248px;
      padding: .95rem;
      border: 1px solid rgba(255,255,255,.11);
      border-radius: var(--card-radius);
      background:
        linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.028)),
        rgba(255,255,255,.026);
      box-shadow: 0 12px 28px rgba(0,0,0,.16);
    }

    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: .7rem;
    }

    .ref,
    .card-index {
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      padding: .22rem .5rem;
      border: 1px solid rgba(86,216,255,.32);
      border-radius: 999px;
      color: var(--cyan);
      background: rgba(86,216,255,.08);
      font-size: 12px;
      font-weight: 900;
      line-height: 1;
    }

    .card-index {
      color: var(--muted);
      border-color: var(--line);
      background: rgba(255,255,255,.035);
    }

    .definition-card h3 {
      color: #fff;
      font-size: clamp(19px, 1.45vw, 24px);
      line-height: 1.12;
      letter-spacing: 0;
      overflow-wrap: anywhere;
    }

    .term-zh {
      color: var(--green);
      font-size: 16px;
      font-weight: 850;
      line-height: 1.28;
      overflow-wrap: anywhere;
    }

    .definition-copy {
      display: grid;
      gap: .65rem;
      margin-top: auto;
    }

    .definition-copy p {
      color: var(--ink-dim);
      font-size: 15px;
      line-height: 1.5;
    }

    .definition-copy .definition-zh {
      padding-top: .65rem;
      border-top: 1px solid rgba(255,255,255,.1);
      color: #cfe0f4;
      font-size: 14px;
      line-height: 1.55;
    }

    .empty-state {
      display: none;
      padding: 2rem;
      border: 1px solid var(--line);
      border-radius: 8px;
      color: var(--ink-dim);
      text-align: center;
      background: rgba(255,255,255,.035);
    }

    .empty-state.is-visible {
      display: block;
    }

    .definition-flashcards {
      display: none;
      margin-top: 24px;
    }

    .definition-flashcards[hidden] {
      display: none !important;
    }

    body.is-definition-test .revision-tools,
    body.is-definition-test .study-panel,
    body.is-definition-test .section-nav,
    body.is-definition-test #definition-results,
    body.is-definition-test .empty-state,
    body.is-definition-test .page-foot {
      display: none !important;
    }

    body.is-definition-test .definition-flashcards {
      display: grid;
    }

    .flashcard-shell {
      display: grid;
      gap: 1rem;
      padding: clamp(18px, 3vw, 34px);
      border: 1px solid var(--line);
      border-radius: 8px;
      background: rgba(255,255,255,.035);
      box-shadow: 0 16px 36px rgba(0,0,0,.22);
    }

    .flashcard-top {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
    }

    .flashcard-back-button,
    .flashcard-secondary-button {
      padding: .62rem .8rem;
      border-color: var(--line) !important;
      background: rgba(255,255,255,.045) !important;
      color: var(--ink-dim) !important;
    }

    .flashcard-counters {
      display: flex;
      flex-wrap: wrap;
      gap: .45rem;
      justify-content: flex-end;
      color: var(--ink-dim);
      font-size: 13px;
      font-weight: 850;
    }

    .flashcard-counters span {
      padding: .34rem .55rem;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: rgba(255,255,255,.035);
    }

    .flashcard-counters b {
      color: var(--gold);
    }

    .flashcard-progress-track {
      height: 8px;
      border-radius: 999px;
      background: rgba(255,255,255,.08);
      overflow: hidden;
    }

    .flashcard-progress-fill {
      display: block;
      width: 0%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--green), var(--cyan));
      transition: width .18s ease;
    }

    .flashcard-card {
      display: grid;
      gap: .9rem;
      width: 100%;
      min-height: 310px;
      padding: clamp(18px, 4vw, 42px);
      border-color: rgba(86,216,255,.32) !important;
      background:
        linear-gradient(180deg, rgba(86,216,255,.11), rgba(255,255,255,.035)),
        rgba(255,255,255,.035) !important;
      text-align: left;
    }

    .flashcard-face-label,
    .flashcard-ref {
      justify-self: start;
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      padding: .22rem .55rem;
      border: 1px solid rgba(86,216,255,.32);
      border-radius: 999px;
      color: var(--cyan);
      background: rgba(86,216,255,.08);
      font-size: 12px;
      font-weight: 900;
      line-height: 1;
    }

    .flashcard-ref {
      color: var(--gold);
      border-color: rgba(255,209,102,.34);
      background: rgba(255,209,102,.08);
    }

    .flashcard-term {
      color: #fff;
      font-size: clamp(34px, 5.5vw, 74px);
      font-weight: 900;
      line-height: 1.04;
      letter-spacing: 0;
      overflow-wrap: anywhere;
    }

    .flashcard-hint {
      color: var(--muted);
      font-size: 14px;
      line-height: 1.45;
    }

    .flashcard-answer {
      display: grid;
      gap: .75rem;
      padding-top: .9rem;
      border-top: 1px solid rgba(255,255,255,.12);
    }

    .flashcard-definition {
      color: var(--ink);
      font-size: clamp(18px, 2vw, 28px);
      line-height: 1.35;
    }

    .flashcard-term-zh {
      color: var(--green);
      font-size: clamp(18px, 1.8vw, 24px);
      font-weight: 850;
      line-height: 1.25;
    }

    .flashcard-definition-zh {
      color: #cfe0f4;
      font-size: clamp(15px, 1.4vw, 19px);
      line-height: 1.55;
    }

    .flashcard-actions {
      display: flex;
      flex-wrap: wrap;
      gap: .55rem;
    }

    .flashcard-actions button {
      padding: .68rem .9rem;
    }

    .flashcard-mark-again {
      border-color: rgba(255,209,102,.55) !important;
      background: rgba(255,209,102,.14) !important;
    }

    .flashcard-mark-know {
      border-color: rgba(126,240,181,.55) !important;
      background: rgba(126,240,181,.16) !important;
    }

    .flashcard-complete {
      padding: 1.5rem;
      border: 1px solid rgba(126,240,181,.42);
      border-radius: 8px;
      background: rgba(126,240,181,.1);
    }

    .flashcard-complete h2 {
      margin-top: .25rem;
      color: #fff;
      font-size: clamp(28px, 3vw, 44px);
      line-height: 1.05;
    }

    .flashcard-complete p,
    .flashcard-complete dl {
      color: var(--ink-dim);
    }

    .page-foot {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 48px;
      padding-top: 1rem;
      border-top: 1px solid var(--line);
      color: var(--muted);
      font-size: 14px;
      line-height: 1.45;
    }

    @media (max-width: 760px) {
      .definition-page {
        width: min(100% - 28px, var(--page-max));
        padding-top: 18px;
      }

      .revision-tools {
        position: relative;
      }

      .search-row,
      .study-toggle,
      .study-panel-head,
      .flashcard-top,
      .definition-section-head {
        display: grid;
        grid-template-columns: 1fr;
      }

      .result-count,
      .study-count {
        min-width: 0;
        text-align: left;
      }

      .study-toggle b {
        justify-self: start;
      }

      .study-groups {
        grid-template-columns: 1fr;
      }

      .study-start-row,
      .flashcard-counters {
        justify-content: stretch;
      }

      .study-start-button,
      .flashcard-actions button {
        width: 100%;
      }

      .definition-grid {
        grid-template-columns: 1fr;
      }
    }

    @media print {
      body {
        background: #fff;
        color: #111827;
      }

      .bg-ambient::before,
      .top-link,
      .revision-tools,
      .study-panel,
      .definition-flashcards,
      .section-nav,
      .page-foot {
        display: none !important;
      }

      .definition-page {
        width: 100%;
        padding: 0;
      }

      .revision-hero,
      .definition-card {
        border-color: #d1d5db;
        background: #fff;
        box-shadow: none;
      }

      .definition-card {
        break-inside: avoid;
        min-height: 0;
      }

      .revision-hero h1,
      .definition-section h2,
      .definition-card h3,
      .definition-copy p,
      .definition-copy .definition-zh {
        color: #111827;
      }

      .hero-zh,
      .term-zh,
      .ref,
      .section-kicker,
      .section-count {
        color: #075985;
      }
    }
  </style>
  <script src="assets/js/baidu-analytics.js"></script>
</head>
<body class="bg-ambient">
  <!-- Generated by scripts/build-definitions-page.js from references/igcse-economics-definitions-2026.md. Do not edit by hand. -->
  <main class="definition-page">
    <a class="top-link" href="index.html">Back to library / 返回课程库</a>

    <header class="revision-hero">
      <div class="eyebrow">Cambridge IGCSE Economics 0455</div>
      <h1>Key Definitions</h1>
      <p class="hero-zh" lang="zh-Hans">IGCSE 经济学核心定义</p>
      <p class="lead">Use this page when you revise for quizzes, class tests, and IGCSE Economics exams. Search a term, learn the exam-ready English wording, and use the Chinese translation to check that the meaning is clear.</p>
      <p class="source-note">Tip: practise writing the English definition first. The Chinese translation is here to help you understand and remember it. Class definitions reference updated: ${escapeHtml(sourceDate)}.</p>
    </header>

    <section class="revision-tools" aria-label="Definition search and filters">
      <div class="search-row">
        <label class="sr-only" for="definition-search">Search definitions</label>
        <input id="definition-search" class="search-box" type="search" placeholder="Search ref, term, Chinese, or wording..." autocomplete="off" aria-label="Search definitions" />
        <div class="result-count" aria-live="polite"><b data-visible-count>${total}</b>/<span data-definition-count>${total}</span> visible</div>
      </div>
      <div class="filter-row" aria-label="Syllabus section filters">
${renderFilterChips(sections)}
      </div>
    </section>

${renderStudyPicker(sections, total)}

    <nav class="section-nav" aria-label="Definition sections">
${renderSectionNav(sections)}
    </nav>

    <div id="definition-results">
${renderSections(sections)}
    </div>

    <p class="empty-state" data-empty-state>No matching definitions. Try a syllabus ref, English term, Chinese term, or keyword.</p>

    <section class="definition-flashcards" data-flashcard-shell hidden aria-label="Definition flashcard test">
      <div class="flashcard-shell">
        <div class="flashcard-top">
          <button class="flashcard-back-button" type="button" data-flashcard-back>Back to definitions</button>
          <div class="flashcard-counters" aria-label="Flashcard progress">
            <span><b data-flashcard-left>0</b> left</span>
            <span><b data-flashcard-again>0</b> again</span>
            <span><b data-flashcard-known>0</b> know</span>
          </div>
        </div>
        <div class="flashcard-progress-track" role="progressbar" aria-label="Cards completed" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0">
          <span class="flashcard-progress-fill" data-flashcard-progress></span>
        </div>
        <button class="flashcard-card" type="button" data-flashcard-card aria-live="polite" aria-pressed="false">
          <span class="flashcard-face-label" data-flashcard-face>Key term</span>
          <span class="flashcard-ref" data-flashcard-ref>Ref</span>
          <span class="flashcard-term" data-flashcard-term></span>
          <span class="flashcard-hint" data-flashcard-hint>Click Show Answer to check your definition.</span>
          <span class="flashcard-answer" data-flashcard-answer hidden>
            <span class="flashcard-definition" data-flashcard-definition></span>
            <span class="flashcard-term-zh" data-flashcard-term-zh lang="zh-Hans"></span>
            <span class="flashcard-definition-zh" data-flashcard-definition-zh lang="zh-Hans"></span>
          </span>
        </button>
        <section class="flashcard-complete" data-flashcard-complete hidden>
          <p>Session complete</p>
          <h2>All selected definitions finished</h2>
          <dl>
            <div><dt>Known</dt><dd data-flashcard-complete-known>0</dd></div>
            <div><dt>Marked again</dt><dd data-flashcard-complete-again>0</dd></div>
          </dl>
        </section>
        <div class="flashcard-actions" aria-label="Flashcard controls">
          <button type="button" data-flashcard-show>Show Answer</button>
          <button class="flashcard-mark-again" type="button" data-flashcard-mark="again" hidden>Again</button>
          <button class="flashcard-mark-know" type="button" data-flashcard-mark="know" hidden>Know</button>
          <button class="flashcard-secondary-button" type="button" data-flashcard-shuffle>Shuffle</button>
          <button class="flashcard-secondary-button" type="button" data-flashcard-reset>Reset</button>
          <button type="button" data-flashcard-study-again hidden>Study again</button>
        </div>
      </div>
    </section>

    <footer class="page-foot">
      <span>Oehler-Huang Library - independent classroom resources.</span>
      <span>Not endorsed by Cambridge International Education.</span>
    </footer>
  </main>

  <script id="definitions-data" type="application/json">${serializeJsonForScript(flashcardData)}</script>
  <script>
    (() => {
      const definitionDeck = JSON.parse(document.querySelector('#definitions-data').textContent);
      const searchInput = document.querySelector('#definition-search');
      const chips = [...document.querySelectorAll('.filter-chip')];
      const cards = [...document.querySelectorAll('.definition-card')];
      const sections = [...document.querySelectorAll('.definition-section')];
      const visibleCount = document.querySelector('[data-visible-count]');
      const emptyState = document.querySelector('[data-empty-state]');
      const studyToggle = document.querySelector('[data-study-toggle]');
      const studyPicker = document.querySelector('[data-study-picker]');
      const studySummary = document.querySelector('[data-study-summary]');
      const allInput = document.querySelector('[data-study-all]');
      const unitInputs = [...document.querySelectorAll('[data-study-unit]')];
      const topicInputs = [...document.querySelectorAll('[data-study-topic]')];
      const studyCount = document.querySelector('[data-study-count]');
      const studyCountLabel = document.querySelector('[data-study-count-label]');
      const startButton = document.querySelector('[data-study-start]');
      const flashcardShell = document.querySelector('[data-flashcard-shell]');
      const flashcardBack = document.querySelector('[data-flashcard-back]');
      const leftEl = document.querySelector('[data-flashcard-left]');
      const againEl = document.querySelector('[data-flashcard-again]');
      const knownEl = document.querySelector('[data-flashcard-known]');
      const progressTrack = document.querySelector('.flashcard-progress-track');
      const progressFill = document.querySelector('[data-flashcard-progress]');
      const flashcardCard = document.querySelector('[data-flashcard-card]');
      const faceEl = document.querySelector('[data-flashcard-face]');
      const refEl = document.querySelector('[data-flashcard-ref]');
      const termEl = document.querySelector('[data-flashcard-term]');
      const hintEl = document.querySelector('[data-flashcard-hint]');
      const answerEl = document.querySelector('[data-flashcard-answer]');
      const definitionEl = document.querySelector('[data-flashcard-definition]');
      const termZhEl = document.querySelector('[data-flashcard-term-zh]');
      const definitionZhEl = document.querySelector('[data-flashcard-definition-zh]');
      const completeEl = document.querySelector('[data-flashcard-complete]');
      const completeKnownEl = document.querySelector('[data-flashcard-complete-known]');
      const completeAgainEl = document.querySelector('[data-flashcard-complete-again]');
      const showButton = document.querySelector('[data-flashcard-show]');
      const shuffleButton = document.querySelector('[data-flashcard-shuffle]');
      const resetButton = document.querySelector('[data-flashcard-reset]');
      const studyAgainButton = document.querySelector('[data-flashcard-study-again]');
      const markButtons = [...document.querySelectorAll('[data-flashcard-mark]')];
      let activeFilter = 'all';
      let sessionCards = [];
      let queue = [];
      let flipped = false;
      const knownIds = new Set();
      const againIds = new Set();

      function shuffleItems(items) {
        const next = [...items];
        for (let index = next.length - 1; index > 0; index -= 1) {
          const swapIndex = Math.floor(Math.random() * (index + 1));
          [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
        }
        return next;
      }

      function isTypingTarget(target) {
        const tagName = target?.tagName?.toLowerCase();
        return target?.isContentEditable || ['input', 'select', 'textarea'].includes(tagName);
      }

      function applyFilters() {
        const query = searchInput.value.trim().toLowerCase();
        let count = 0;

        for (const card of cards) {
          const filterMatch = activeFilter === 'all' || card.dataset.filter === activeFilter;
          const searchMatch = !query || card.dataset.search.includes(query);
          const visible = filterMatch && searchMatch;
          card.hidden = !visible;
          if (visible) count += 1;
        }

        for (const section of sections) {
          const hasVisibleCard = Boolean(section.querySelector('.definition-card:not([hidden])'));
          section.hidden = !hasVisibleCard;
        }

        visibleCount.textContent = String(count);
        emptyState.classList.toggle('is-visible', count === 0);
      }

      function selectedCards() {
        if (allInput.checked) return [...definitionDeck];

        const selectedTopics = new Set(
          topicInputs
            .filter((input) => input.checked)
            .map((input) => input.dataset.studyTopic)
        );

        return definitionDeck.filter((card) => selectedTopics.has(card.topic));
      }

      function updateUnitState(unitInput) {
        const topics = topicInputs.filter((input) => input.dataset.studyUnitParent === unitInput.dataset.studyUnit);
        const checked = topics.filter((input) => input.checked).length;
        unitInput.checked = checked > 0 && checked === topics.length;
        unitInput.indeterminate = checked > 0 && checked < topics.length;
      }

      function updateStudySelection() {
        const allSelected = allInput.checked;
        for (const input of [...unitInputs, ...topicInputs]) {
          input.disabled = allSelected;
        }

        if (!allSelected) {
          for (const unitInput of unitInputs) updateUnitState(unitInput);
        } else {
          for (const unitInput of unitInputs) unitInput.indeterminate = false;
        }

        const count = selectedCards().length;
        studyCount.textContent = String(count);
        studyCountLabel.textContent = count === 1 ? 'definition selected' : 'definitions selected';
        studySummary.textContent = count === 1 ? '1 selected' : String(count) + ' selected';
        startButton.disabled = count === 0;
      }

      function setStudyPickerOpen(open) {
        studyPicker.hidden = !open;
        studyToggle.setAttribute('aria-expanded', String(open));
      }

      function resetSession(cardsForSession = sessionCards) {
        sessionCards = [...cardsForSession];
        queue = [...sessionCards];
        flipped = false;
        knownIds.clear();
        againIds.clear();
        updateFlashcard();
      }

      function startSession(cardsForSession) {
        if (!cardsForSession.length) return;
        resetSession(cardsForSession);
        document.body.classList.add('is-definition-test');
        flashcardShell.hidden = false;
        flashcardCard.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      function exitSession() {
        document.body.classList.remove('is-definition-test');
        flashcardShell.hidden = true;
        startButton.focus({ preventScroll: true });
      }

      function updateFlashcard() {
        const complete = queue.length === 0;
        const current = queue[0];
        const completed = knownIds.size;
        const total = Math.max(sessionCards.length, 1);

        leftEl.textContent = String(queue.length);
        againEl.textContent = String(againIds.size);
        knownEl.textContent = String(knownIds.size);
        progressTrack.setAttribute('aria-valuemax', String(sessionCards.length));
        progressTrack.setAttribute('aria-valuenow', String(completed));
        progressFill.style.width = String((completed / total) * 100) + '%';

        completeEl.hidden = !complete;
        flashcardCard.hidden = complete;
        showButton.hidden = complete || flipped;
        shuffleButton.hidden = complete;
        resetButton.hidden = false;
        studyAgainButton.hidden = !complete;
        completeKnownEl.textContent = String(knownIds.size);
        completeAgainEl.textContent = String(againIds.size);

        for (const button of markButtons) {
          button.hidden = complete || !flipped;
          button.disabled = complete || !flipped;
        }

        if (complete) return;

        flashcardCard.setAttribute('aria-pressed', flipped ? 'true' : 'false');
        faceEl.textContent = flipped ? 'Definition' : 'Key term';
        refEl.textContent = current.ref || 'Formula';
        termEl.textContent = current.term;
        hintEl.textContent = flipped
          ? 'Mark this card Again or Know.'
          : 'Write or say the English definition before you reveal it.';
        answerEl.hidden = !flipped;
        definitionEl.textContent = flipped ? current.definition : '';
        termZhEl.textContent = flipped ? current.termZh : '';
        definitionZhEl.textContent = flipped ? current.definitionZh : '';
      }

      function showAnswer() {
        if (!queue.length || flipped) return;
        flipped = true;
        updateFlashcard();
      }

      function markCard(value) {
        if (!flipped || !queue.length) return;
        const [current] = queue;

        if (value === 'again') {
          againIds.add(current.id);
          queue = [...queue.slice(1), current];
        } else {
          knownIds.add(current.id);
          againIds.delete(current.id);
          queue = queue.slice(1);
        }

        flipped = false;
        updateFlashcard();
      }

      searchInput.addEventListener('input', applyFilters);
      for (const chip of chips) {
        chip.addEventListener('click', () => {
          activeFilter = chip.dataset.filter;
          for (const otherChip of chips) {
            otherChip.setAttribute('aria-pressed', String(otherChip === chip));
          }
          applyFilters();
        });
      }

      studyToggle.addEventListener('click', () => {
        setStudyPickerOpen(studyPicker.hidden);
      });
      allInput.addEventListener('change', updateStudySelection);
      for (const unitInput of unitInputs) {
        unitInput.addEventListener('change', () => {
          for (const topicInput of topicInputs.filter((input) => input.dataset.studyUnitParent === unitInput.dataset.studyUnit)) {
            topicInput.checked = unitInput.checked;
          }
          updateStudySelection();
        });
      }
      for (const topicInput of topicInputs) {
        topicInput.addEventListener('change', updateStudySelection);
      }

      startButton.addEventListener('click', () => startSession(selectedCards()));
      flashcardBack.addEventListener('click', exitSession);
      flashcardCard.addEventListener('click', showAnswer);
      showButton.addEventListener('click', showAnswer);
      for (const button of markButtons) {
        button.addEventListener('click', () => markCard(button.dataset.flashcardMark));
      }
      shuffleButton.addEventListener('click', () => {
        queue = shuffleItems(queue);
        flipped = false;
        updateFlashcard();
      });
      resetButton.addEventListener('click', () => resetSession());
      studyAgainButton.addEventListener('click', () => resetSession());
      document.addEventListener('keydown', (event) => {
        if (!document.body.classList.contains('is-definition-test') || isTypingTarget(event.target)) return;
        if (!flipped && [' ', 'Enter'].includes(event.key)) {
          event.preventDefault();
          showAnswer();
        } else if (flipped && event.key === '1') {
          event.preventDefault();
          markCard('again');
        } else if (flipped && event.key === '2') {
          event.preventDefault();
          markCard('know');
        }
      });

      updateStudySelection();
    })();
  </script>
</body>
</html>
`;
}

const markdown = fs.readFileSync(sourcePath, 'utf8');
const sections = parseDefinitions(markdown);
const html = renderPage(sections, parseFrontMatter(markdown));
fs.writeFileSync(outputPath, html, 'utf8');

const total = sections.reduce((sum, section) => sum + section.entries.length, 0);
console.log(`Generated definitions.html with ${total} entries.`);
