'use strict';

const fs = require('fs');
const path = require('path');
const {
  sourcePath,
  htmlOutputPath,
  parseFrontMatter,
  getInvestmentDefinitionSections,
  getInvestmentCfaMatches,
  getInvestmentCfaMatchMap,
  getInvestmentTextbookDefinitions,
  getInvestmentTextbookDefinitionMap,
} = require('./investment-definitions');

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

function renderUnitFilters(sections) {
  const total = sections.reduce((sum, section) => sum + section.entries.length, 0);
  return [
    `<button class="investment-definition-filter is-active" type="button" data-filter="all" aria-pressed="true">All <b>${total}</b></button>`,
    ...sections.map((section) => (
      `<button class="investment-definition-filter" type="button" data-filter="unit-${section.unit}" aria-pressed="false">Unit ${section.unit} <b>${section.entries.length}</b></button>`
    )),
  ].join('\n            ');
}

function renderCfaMatchCell(match, sourceUrl) {
  if (!match) {
    return `
                  <div class="investment-cfa-match is-unmatched">
                    <strong>No clear CFA match recorded</strong>
                    <p>Use the course definition for this course-specific term.</p>
                  </div>`;
  }

  return `
                  <div class="investment-cfa-match">
                    <strong>CFA term: ${escapeHtml(match.cfaTerm)}</strong>
                    <span>${escapeHtml(match.matchType)}</span>
                    <p><b>Meaning focus:</b> ${escapeHtml(match.meaningFocus)}</p>
                    <a href="${escapeHtml(sourceUrl)}">Open original CFA wording</a>
                  </div>`;
}

function getCfaSearchText(match) {
  if (!match) return '';
  return `${match.cfaTerm || ''} ${match.matchType || ''} ${match.meaningFocus || ''}`;
}

function getTextbookSearchText(matches = []) {
  return matches.map((match) => `${match.sourceTerm || ''} ${match.definition || ''} ${match.source?.shortTitle || ''}`).join(' ');
}

function renderTextbookDefinitionCell(matches = []) {
  if (!matches.length) {
    return `
                  <div class="investment-textbook-match is-unmatched">
                    <strong>No local textbook match recorded</strong>
                    <p>Use the CFA-inspired course definition.</p>
                  </div>`;
  }

  return `
                  <div class="investment-textbook-match-list">
${matches.map((match) => `
                    <article class="investment-textbook-match">
                      <strong>${escapeHtml(match.sourceTerm || match.term)}</strong>
                      <p>${escapeHtml(match.definition)}</p>
                      <span>${escapeHtml(match.source?.shortTitle || match.sourceId)}${match.pdfPage ? `, PDF p. ${escapeHtml(match.pdfPage)}` : ''}</span>
                    </article>`).join('')}
                  </div>`;
}

function renderDefinitionRows(section, cfaMatchMap, textbookDefinitionMap, sourceUrl) {
  return section.entries.map((entry) => `
              <tr class="investment-definition-row" data-unit="unit-${entry.unit}" data-search="${escapeHtml(`${entry.ref} ${entry.term} ${entry.zh} ${entry.definition} ${entry.definitionZh} ${entry.courseUse} ${getCfaSearchText(cfaMatchMap.get(entry.term.toLowerCase()))} ${getTextbookSearchText(textbookDefinitionMap.get(entry.term.toLowerCase()))}`.toLowerCase())}">
                <th scope="row">${escapeHtml(entry.ref)}</th>
                <td>
                  <strong>${escapeHtml(entry.term)}</strong>
                  <span lang="zh-Hans">${escapeHtml(entry.zh)}</span>
                </td>
                <td>
                  <p class="investment-definition-en">${escapeHtml(entry.definition)}</p>
                  <p class="investment-definition-zh" lang="zh-Hans">${escapeHtml(entry.definitionZh)}</p>
                </td>
                <td>${renderCfaMatchCell(cfaMatchMap.get(entry.term.toLowerCase()), sourceUrl)}</td>
                <td>${renderTextbookDefinitionCell(textbookDefinitionMap.get(entry.term.toLowerCase()))}</td>
                <td>${escapeHtml(entry.courseUse)}</td>
              </tr>`).join('');
}

function renderDefinitionSections(sections, cfaMatchMap, textbookDefinitionMap, sourceUrl) {
  return sections.map((section) => `
        <section class="investment-definition-unit" id="unit-${section.unit}" data-unit-section="unit-${section.unit}">
          <div class="investment-section-head">
            <div>
              <div class="investment-section-kicker">Unit ${section.unit}</div>
              <h2>${escapeHtml(section.title)}</h2>
            </div>
            <p>${section.entries.length} textbook-style definitions used in Lessons ${section.entries[0].lesson}-${section.entries[section.entries.length - 1].lesson}.</p>
          </div>

          <div class="investment-definition-table-wrap">
            <table class="investment-definition-table">
              <thead>
                <tr>
                  <th scope="col">Ref</th>
                  <th scope="col">Term</th>
                  <th scope="col">Textbook definition / 中文释义</th>
                  <th scope="col">CFA source definition</th>
                  <th scope="col">Local textbook definitions</th>
                  <th scope="col">Course use</th>
                </tr>
              </thead>
              <tbody>
${renderDefinitionRows(section, cfaMatchMap, textbookDefinitionMap, sourceUrl)}
              </tbody>
            </table>
          </div>
        </section>`).join('\n');
}

function renderDefinitionPage(sections = getInvestmentDefinitionSections()) {
  const markdown = fs.readFileSync(sourcePath, 'utf8');
  const frontMatter = parseFrontMatter(markdown);
  const cfaData = getInvestmentCfaMatches();
  const cfaMatchMap = getInvestmentCfaMatchMap();
  const textbookData = getInvestmentTextbookDefinitions();
  const textbookDefinitionMap = getInvestmentTextbookDefinitionMap();
  const total = sections.reduce((sum, section) => sum + section.entries.length, 0);
  const matchedTotal = Array.from(cfaMatchMap.keys()).length;
  const textbookMatchedTotal = Array.from(textbookDefinitionMap.keys()).length;
  const title = frontMatter.title || 'Investment Analysis Definition Overview';
  const cfaSourceUrl = cfaData.sourceUrl || frontMatter.priority_source_url || 'https://www.cfainstitute.org/programs/cfa-program/candidate-resources/glossary-terms';
  const sectionData = sections.map((section) => ({
    unit: section.unit,
    title: section.title,
    count: section.entries.length,
  }));

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="description" content="Textbook-style definitions for the Investment Analysis company-analysis course." />
  <meta name="author" content="Samuel Oehler-Huang, Suzhou Foreign Language School" />
  <title>${escapeHtml(title)} - Oehler-Huang Library</title>
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="../assets/css/investment.css" />
  <script src="../assets/js/baidu-analytics.js"></script>
  <style>
    .investment-definition-hero .investment-status-panel {
      min-width: min(32rem, 100%);
    }

    .investment-definition-toolbar {
      display: grid;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .investment-definition-search {
      display: grid;
      gap: 0.4rem;
    }

    .investment-definition-search label {
      color: var(--inv-muted);
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    .investment-definition-search input {
      width: 100%;
      border: 1px solid rgba(148, 163, 184, 0.32);
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.78);
      color: var(--inv-ink);
      font: inherit;
      min-height: 2.8rem;
      padding: 0.7rem 0.9rem;
    }

    .investment-definition-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .investment-definition-filter {
      align-items: center;
      background: rgba(15, 23, 42, 0.78);
      border: 1px solid rgba(148, 163, 184, 0.28);
      border-radius: 8px;
      color: var(--inv-ink);
      cursor: pointer;
      display: inline-flex;
      font: inherit;
      font-weight: 800;
      gap: 0.55rem;
      min-height: 2.4rem;
      padding: 0.52rem 0.72rem;
    }

    .investment-definition-filter b {
      color: var(--inv-cyan);
      font-size: 0.82rem;
    }

    .investment-definition-filter.is-active {
      border-color: rgba(34, 211, 238, 0.58);
      box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.12) inset;
    }

    .investment-definition-summary {
      color: var(--inv-muted);
      font-weight: 700;
      min-height: 1.5rem;
    }

    .investment-definition-unit {
      scroll-margin-top: 1rem;
    }

    .investment-definition-table-wrap {
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 8px;
      overflow-x: auto;
    }

    .investment-definition-table {
      border-collapse: collapse;
      min-width: 1500px;
      width: 100%;
    }

    .investment-definition-table th,
    .investment-definition-table td {
      border-bottom: 1px solid rgba(148, 163, 184, 0.18);
      padding: 0.85rem 0.9rem;
      text-align: left;
      vertical-align: top;
    }

    .investment-definition-table thead th {
      background: rgba(15, 23, 42, 0.92);
      color: var(--inv-muted);
      font-size: 0.76rem;
      letter-spacing: 0;
      position: sticky;
      text-transform: uppercase;
      top: 0;
      z-index: 1;
    }

    .investment-definition-table tbody th {
      color: var(--inv-cyan);
      font-weight: 900;
      white-space: nowrap;
      width: 5.5rem;
    }

    .investment-definition-table td:first-of-type {
      width: 15rem;
    }

    .investment-definition-table td:nth-of-type(2) {
      min-width: 28rem;
    }

    .investment-definition-table td:nth-of-type(3) {
      min-width: 24rem;
      width: 26rem;
    }

    .investment-definition-en,
    .investment-definition-zh {
      margin: 0;
    }

    .investment-definition-zh {
      color: rgba(205, 242, 246, 0.82);
      font-size: 0.92rem;
      line-height: 1.55;
      margin-top: 0.55rem;
    }

    .investment-definition-table strong {
      display: block;
      font-size: 1rem;
      margin-bottom: 0.2rem;
    }

    .investment-definition-table span[lang='zh-Hans'] {
      color: var(--inv-muted);
      display: block;
      font-size: 0.88rem;
    }

    .investment-cfa-match {
      display: grid;
      gap: 0.34rem;
    }

    .investment-cfa-match strong {
      color: var(--inv-ink);
      font-size: 0.95rem;
      margin: 0;
    }

    .investment-cfa-match span {
      color: var(--inv-cyan);
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
    }

    .investment-cfa-match p {
      margin: 0;
    }

    .investment-cfa-match b {
      color: var(--inv-muted);
    }

    .investment-cfa-match a {
      color: var(--inv-cyan);
      font-weight: 800;
      text-decoration: none;
    }

    .investment-cfa-match a:hover {
      text-decoration: underline;
    }

    .investment-cfa-match.is-unmatched strong {
      color: var(--inv-muted);
    }

    .investment-cfa-match.is-unmatched p {
      color: var(--inv-muted);
    }

    .investment-textbook-match-list {
      display: grid;
      gap: 0.65rem;
    }

    .investment-textbook-match {
      border-left: 3px solid rgba(34, 211, 238, 0.36);
      display: grid;
      gap: 0.24rem;
      padding-left: 0.65rem;
    }

    .investment-textbook-match strong {
      color: var(--inv-ink);
      font-size: 0.95rem;
      margin: 0;
    }

    .investment-textbook-match p {
      margin: 0;
    }

    .investment-textbook-match span {
      color: var(--inv-muted);
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
    }

    .investment-textbook-match.is-unmatched {
      border-left-color: rgba(148, 163, 184, 0.22);
    }

    .investment-textbook-match.is-unmatched strong,
    .investment-textbook-match.is-unmatched p {
      color: var(--inv-muted);
    }

    .investment-definition-empty {
      border: 1px solid rgba(250, 204, 21, 0.35);
      border-radius: 8px;
      color: var(--inv-ink);
      display: none;
      padding: 1rem;
    }

    .investment-definition-empty.is-visible {
      display: block;
    }

    @media (max-width: 720px) {
      .investment-definition-table {
        min-width: 1180px;
      }

      .investment-definition-table th,
      .investment-definition-table td {
        padding: 0.72rem;
      }
    }
  </style>
</head>
<body class="investment-home investment-definitions-page">
  <!-- Generated by scripts/build-investment-definitions-page.js from references/investment-analysis-definitions.md. Do not edit by hand. -->
  <main class="investment-page">
    <nav class="investment-nav" aria-label="Investment Analysis definitions navigation">
      <a class="investment-link" href="../index.html">Main library</a>
      <div class="investment-nav-links">
        <a class="investment-link" href="index.html">Course home</a>
        <a class="investment-link" href="syllabus.html">Syllabus</a>
        <a class="investment-link" href="unit-1/lesson-1/index.html">Start Lesson 1</a>
      </div>
    </nav>

    <header class="investment-hero investment-definition-hero">
      <div class="investment-hero-copy">
        <div class="investment-eyebrow">Course reference</div>
        <h1>Investment Analysis Definitions</h1>
        <p>
          Textbook-style definitions for all ${total} key terms used across the 30-lesson company-analysis course, with Chinese translations, ${matchedTotal} CFA Program glossary source matches and ${textbookMatchedTotal} local textbook source matches shown beside the classroom wording.
        </p>
        <div class="investment-actions" aria-label="Definition overview links">
          <a class="investment-action primary" href="#definition-overview">Browse definitions</a>
          <a class="investment-action" href="syllabus.html#lesson-generator-table">Lesson map</a>
          <a class="investment-action" href="${escapeHtml(cfaSourceUrl)}">CFA glossary</a>
          <a class="investment-action" href="../references/investment-analysis-definitions.md">Markdown source</a>
          <a class="investment-action" href="../references/investment-analysis-textbook-definitions.json">Textbook sources</a>
        </div>
      </div>

      <div class="investment-status-panel" aria-label="How to use these definitions">
        <div class="investment-eyebrow">Definition rule</div>
        <div class="investment-learning-strip">
          <div class="investment-learning-item">
            <strong>CFA first</strong>
            <span>Where a course term overlaps with the CFA Program glossary, use that finance meaning first.</span>
          </div>
          <div class="investment-learning-item">
            <strong>Original source</strong>
            <span>Matched rows identify the CFA glossary term and link back to the original CFA wording.</span>
          </div>
          <div class="investment-learning-item">
            <strong>Classroom wording</strong>
            <span>Simplify for Grade 9 only after preserving the CFA-aligned investment or accounting meaning.</span>
          </div>
          <div class="investment-learning-item">
            <strong>Textbook cross-check</strong>
            <span>Local textbook notes show where major course terms appear in Bodie, Reilly, Damodaran and Feroldi.</span>
          </div>
        </div>
      </div>
    </header>

    <section class="investment-section" id="definition-overview" aria-labelledby="definition-overview-title">
      <div class="investment-section-head">
        <div>
          <div class="investment-section-kicker">Definition overview</div>
          <h2 id="definition-overview-title">Complete course vocabulary</h2>
        </div>
        <p>Search by course term, Chinese support, Chinese definition translation, CFA glossary term, local textbook source, lesson reference or definition wording. Unit filters preserve the course sequence. Terms without a clear CFA glossary or textbook equivalent remain course-specific.</p>
      </div>

      <div class="investment-definition-toolbar" data-definition-toolbar>
        <div class="investment-definition-search">
          <label for="definition-search">Search definitions</label>
          <input id="definition-search" type="search" placeholder="Search term, Chinese translation, lesson or definition" autocomplete="off" data-definition-search />
        </div>
        <div class="investment-definition-filters" aria-label="Filter by unit">
            ${renderUnitFilters(sections)}
        </div>
        <p class="investment-definition-summary" aria-live="polite" data-definition-summary>${total} definitions shown.</p>
      </div>
    </section>

    <p class="investment-definition-empty" data-definition-empty>No definitions match the current search.</p>

${renderDefinitionSections(sections, cfaMatchMap, textbookDefinitionMap, cfaSourceUrl)}

    <footer class="investment-footer">
      <span>Oehler-Huang Library - independent classroom resources.</span>
      <span>Educational use only; classroom judgements are not personalised financial advice.</span>
    </footer>
  </main>

  <script>
    window.INVESTMENT_DEFINITION_UNITS = ${serializeJsonForScript(sectionData)};
    (() => {
      const searchInput = document.querySelector('[data-definition-search]');
      const filters = Array.from(document.querySelectorAll('[data-filter]'));
      const rows = Array.from(document.querySelectorAll('.investment-definition-row'));
      const sections = Array.from(document.querySelectorAll('[data-unit-section]'));
      const summary = document.querySelector('[data-definition-summary]');
      const empty = document.querySelector('[data-definition-empty]');
      let activeFilter = 'all';

      function applyFilters() {
        const query = (searchInput && searchInput.value || '').trim().toLowerCase();
        let visibleCount = 0;

        for (const row of rows) {
          const matchesUnit = activeFilter === 'all' || row.dataset.unit === activeFilter;
          const matchesSearch = !query || (row.dataset.search || '').includes(query);
          const isVisible = matchesUnit && matchesSearch;
          row.hidden = !isVisible;
          if (isVisible) visibleCount += 1;
        }

        for (const section of sections) {
          const visibleRows = section.querySelectorAll('.investment-definition-row:not([hidden])').length;
          section.hidden = visibleRows === 0;
        }

        if (summary) summary.textContent = visibleCount + ' definition' + (visibleCount === 1 ? '' : 's') + ' shown.';
        if (empty) empty.classList.toggle('is-visible', visibleCount === 0);
      }

      for (const filter of filters) {
        filter.addEventListener('click', () => {
          activeFilter = filter.dataset.filter || 'all';
          for (const item of filters) {
            const isActive = item === filter;
            item.classList.toggle('is-active', isActive);
            item.setAttribute('aria-pressed', String(isActive));
          }
          applyFilters();
        });
      }

      if (searchInput) searchInput.addEventListener('input', applyFilters);
      applyFilters();
    })();
  </script>
</body>
</html>
`;
}

function writeDefinitionPage() {
  const html = renderDefinitionPage();
  fs.mkdirSync(path.dirname(htmlOutputPath), { recursive: true });
  fs.writeFileSync(htmlOutputPath, html, 'utf8');
  return htmlOutputPath;
}

if (require.main === module) {
  if (process.argv.includes('--check')) {
    const expected = renderDefinitionPage();
    const actual = fs.existsSync(htmlOutputPath) ? fs.readFileSync(htmlOutputPath, 'utf8') : '';
    if (actual !== expected) {
      console.error(`Investment definitions page is out of date: ${path.relative(path.resolve(__dirname, '..'), htmlOutputPath)}`);
      process.exit(1);
    }
    console.log('Investment definitions page is current.');
  } else {
    const written = writeDefinitionPage();
    console.log(`Wrote ${path.relative(path.resolve(__dirname, '..'), written)}`);
  }
}

module.exports = {
  renderDefinitionPage,
  writeDefinitionPage,
};
