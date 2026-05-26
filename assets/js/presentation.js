/* ============================================================
   presentation.js — reusable slide engine for IGCSE Economics
   Usage (from a lesson's index.html):
       <script src="../../../assets/js/visuals.js"></script>
       <script src="../../../assets/js/presentation.js"></script>
       <script src="./slides.js"></script>
       <script>IGCSE.mountLesson(IGCSE.lesson);</script>
   The lesson object must have: { meta, slides } (see _template).
   ============================================================ */

window.IGCSE = window.IGCSE || {};

/* ---------- Utilities ---------- */
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[m]));

const localImageSrc = (src) => {
  if (window.IGCSE?.localImageSrc) return window.IGCSE.localImageSrc(src);
  return /^(?:https?:)?\/\//i.test(String(src || '').trim()) ? '' : String(src || '');
};

const pad = (n) => String(n).padStart(2, '0');

const normalizeQuestionText = (value = '') => String(value)
  .replace(/^Q\d+[A-Z]?:\s*/i, '')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase();

const titleContainsQuestion = (title, question) => {
  const titleText = normalizeQuestionText(title);
  const questionText = normalizeQuestionText(question);
  return Boolean(titleText && questionText && titleText.includes(questionText));
};

const SOURCE_PROFILES = {
  marketSystem: [
    { label: 'Syllabus source', ref: 'Syllabus 2.8' },
    { label: 'Definition source', ref: 'Definitions 2026: Market economic system; Price mechanism; Consumer sovereignty' },
    { label: 'Paper 2 source', ref: '2-allocation archive: 2.8 Market economic system', note: 'Aligned to market-allocation and price-signal wording' },
  ],
  marketFailure: [
    { label: 'Syllabus source', ref: 'Syllabus 2.9' },
    { label: 'Definition source', ref: 'Definitions 2026: Market failure; External costs/benefits; Merit/public goods; Monopoly' },
    { label: 'Paper 2 source', ref: '2-allocation archive: 2.9 Market failure', note: 'Includes merit/public goods, external benefits and market-allocation items' },
  ],
  macroAims: [
    { label: 'Syllabus source', ref: 'Syllabus 4.1.1' },
    { label: 'Definition source', ref: 'Definitions 2026: macroeconomic aims' },
    { label: 'Paper 2 source', ref: '4-government archive: 4.1 Macroeconomic aims', note: 'Aligned to aim/conflict explain and discuss wording' },
  ],
  fiscal: [
    { label: 'Syllabus source', ref: 'Syllabus 4.2' },
    { label: 'Definition source', ref: 'Definitions 2026: Fiscal policy; Taxation; Government budget; Budget deficit/surplus' },
    { label: 'Paper 2 source', ref: '4-government archive: 4.2 Fiscal policy', note: 'Includes tax types, budget and fiscal-policy measure items' },
  ],
  monetary: [
    { label: 'Syllabus source', ref: 'Syllabus 4.3' },
    { label: 'Definition source', ref: 'Definitions 2026: Monetary policy; Interest rate; Central bank; Money supply' },
    { label: 'Paper 2 source', ref: '4-government archive: 4.3 Monetary policy', note: 'Includes central bank and monetary-policy measure items' },
  ],
  supplySide: [
    { label: 'Syllabus source', ref: 'Syllabus 4.4' },
    { label: 'Definition source', ref: 'Definitions 2026: Supply-side policy; Productivity; Factor immobility; Structural unemployment' },
    { label: 'Paper 2 source', ref: '4-government archive: 4.4 Supply-side policy', note: 'Includes supply-side measure, unemployment, growth and evaluation items' },
  ],
};

const PAPER_2_QUESTIONS = {
  '2024ON-23 Q4(b)': 'Explain the difference between the private sector and the public sector.',
  '2025MJ-23 Q3(a)': 'Define public sector.',
  '2024ON-21 Q2(c)': 'Analyse how market forces can increase wages.',
  '2023FM-22 Q2(d)': 'Discuss whether or not private sector firms are likely to charge lower prices than public sector firms.',
  '2025MJ-22 Q3(b)': 'Explain, with an example of each, the difference between a merit good and a public good.',
  '2023MJ-23 Q5(b)': 'Explain, with examples, the difference between private benefits and external benefits.',
  '2023MJ-23 Q1(b)': 'Identify two external costs arising from the milk and car industries.',
  '2023MJ-23 Q1(d)': 'Explain the two plans that the New Zealand government has to reduce external costs to the environment.',
  '2023ON-21 Q3(c)': 'Analyse the consequences of market failure.',
  '2024ON-23 Q2(d)': 'Discuss whether or not government intervention can overcome the disadvantages of a market economic system.',
  '2023MJ-23 Q5(a)': 'Define government budget.',
  '2023ON-21 Q3(a)': 'Identify two types of tax.',
  '2025ON-21 Q3(a)': 'Identify two fiscal policy measures.',
  '2023MJ-21 Q2(c)': "Analyse the causes of an increase in a government's tax revenue.",
  '2024FM-22 Q2(b)': 'Explain two reasons for a change in the amount of tax revenue a government receives.',
  '2023MJ-21 Q1(h)': 'Discuss whether or not Australia is likely to have a budget deficit in 2026.',
  '2024ON-23 Q5(a)': 'Define a central bank.',
  '2023ON-23 Q3(b)': 'Explain two functions of a central bank.',
  '2023ON-21 Q5(a)': 'Identify two monetary policy measures.',
  '2025ON-22 Q4(a)': 'Identify two policy measures a central bank could use to maintain price stability.',
  '2025ON-21 Q1(g)': 'Discuss whether or not an increase in interest rates will harm the Swiss economy.',
  '2023ON-22 Q3(c)': 'Analyse how supply-side policy measures could reduce unemployment.',
  '2024ON-21 Q3(d)': 'Discuss whether or not improving education can help a government achieve its macroeconomic aims.',
  '2023FM-22 Q4(a)': 'Identify two causes of an increase in labour productivity.',
  '2025ON-22 Q5(b)': 'Explain two differences between monetary policy and supply-side policy.',
  '2025MJ-21 Q4(c)': 'Analyse how a cut in the corporation (corporate income) tax rate can increase economic growth.',
  '2023ON-22 Q5(c)': "Analyse, using a production possibility curve (PPC) diagram, the effect of a decrease in the size of a country's labour force on its economy.",
  '2024ON-21 Q1(f)': 'Analyse, using a production possibility curve (PPC) diagram, the effect of technological progress on an economy such as the UAE.',
  '2025MJ-22 Q3(a)': 'Identify what is measured on the axes of a production possibility curve.',
  '2025ON-22 Q2(b)': 'Explain two ways an economy could reach a point outside its current PPC.',
  '2024ON-22 Q3(c)': 'Analyse how the macroeconomic aims of economic growth and balance of payments stability may conflict.',
  '2023FM-22 Q1(g)': 'Discuss whether or not a central bank should aim for a low inflation rate.',
};

const paper2QuestionsForRef = (ref = '') => Object.entries(PAPER_2_QUESTIONS)
  .filter(([key]) => String(ref).includes(key))
  .map(([key, question]) => `${key}: ${question}`)
  .join(' ');

const sourceProfileKey = (meta = {}) => {
  const text = `${meta.code || ''} ${meta.title || ''} ${meta.lessonLabel || ''}`.toLowerCase();
  if (text.includes('2.8') || text.includes('market economic system')) return 'marketSystem';
  if (text.includes('2.9') || text.includes('market failure')) return 'marketFailure';
  if (text.includes('4.4') || text.includes('supply-side policy')) return 'supplySide';
  if (text.includes('4.1') || text.includes('macroeconomic aims')) return 'macroAims';
  if (text.includes('4.2') || text.includes('fiscal policy')) return 'fiscal';
  if (text.includes('4.3') || text.includes('monetary policy')) return 'monetary';
  return '';
};

const DIRECT_SOURCE_RULES = {
  marketSystem: [
    { terms: ['private sector', 'public sector'], source: { label: 'Paper 2 source', ref: '2024ON-23 Q4(b)', note: 'Private/public sector comparison wording', extract: 'MS basis: private sector owned by individuals/firms; public sector owned by government.' } },
    { terms: ['public sector'], source: { label: 'Paper 2 source', ref: '2025MJ-23 Q3(a)', note: 'Direct public sector definition item', extract: 'MS basis: organisations owned/operated by government.' } },
    { terms: ['market forces', 'price mechanism'], source: { label: 'Paper 2 source', ref: '2024ON-21 Q2(c)', note: 'Market forces analysis wording', extract: 'MS basis: demand and supply influence wages/prices through market forces.' } },
    { terms: ['private sector firms'], source: { label: 'Paper 2 source', ref: '2023FM-22 Q2(d)', note: 'Private-sector firm discuss wording', extract: 'MS basis: competition and profit motive can affect prices and efficiency.' } },
  ],
  marketFailure: [
    { terms: ['merit good', 'public good'], source: { label: 'Paper 2 source', ref: '2025MJ-22 Q3(b)', note: 'Merit/public good distinction and examples', extract: 'MS basis: merit goods are under-consumed; public goods are non-excludable/non-rival and often government-funded.' } },
    { terms: ['private benefits', 'external benefits'], source: { label: 'Paper 2 source', ref: '2023MJ-23 Q5(b)', note: 'Private/external benefit distinction', extract: 'MS basis: private benefits go to consumers/producers; external benefits go to third parties.' } },
    { terms: ['external costs'], source: { label: 'Paper 2 source', ref: '2023MJ-23 Q1(b); 2023MJ-23 Q1(d)', note: 'External-cost examples and reduction steps', extract: 'MS basis: pollution/environmental harm are external costs; intervention can reduce them.' } },
    { terms: ['market failure'], source: { label: 'Paper 2 source', ref: '2023ON-21 Q3(c)', note: 'Consequences of market failure', extract: 'MS basis: consequences include under-consumption, non-supply of public goods and monopoly power.' } },
    { terms: ['monopoly'], source: { label: 'Paper 2 source', ref: '2024ON-23 Q2(d)', note: 'Monopoly and market-failure intervention wording', extract: 'MS basis: monopoly power can raise prices and reduce choice/affordability.' } },
  ],
  fiscal: [
    { terms: ['government budget'], source: { label: 'Paper 2 source', ref: '2023MJ-23 Q5(a)', note: 'Direct government budget definition item', extract: 'MS basis: a plan/forecast for government expenditure and revenue.' } },
    { terms: ['direct tax', 'indirect tax', 'progressive', 'proportional', 'regressive', 'types of tax'], source: { label: 'Paper 2 source', ref: '2023ON-21 Q3(a)', note: 'Tax types and accepted examples', extract: 'MS basis: direct/indirect and progressive/proportional/regressive accepted, plus relevant examples.' } },
    { terms: ['fiscal policy measures', 'government spending', 'taxation'], source: { label: 'Paper 2 source', ref: '2025ON-21 Q3(a)', note: 'Fiscal-policy measures item', extract: 'MS basis: government spending and taxation are fiscal-policy measures.' } },
    { terms: ['tax revenue'], source: { label: 'Paper 2 source', ref: '2023MJ-21 Q2(c); 2024FM-22 Q2(b)', note: 'Tax revenue explanation wording', extract: 'MS basis: tax revenue changes with income, employment, spending, profits, rates and collection.' } },
    { terms: ['budget deficit'], source: { label: 'Paper 2 source', ref: '2023MJ-21 Q1(h)', note: 'Budget-deficit discuss wording', extract: 'MS basis: deficit depends on government spending versus tax revenue.' } },
  ],
  monetary: [
    { terms: ['central bank'], source: { label: 'Paper 2 source', ref: '2024ON-23 Q5(a); 2023ON-23 Q3(b)', note: 'Central bank definition and functions', extract: 'MS basis: government bank, bankers bank, issuer of currency and implementer of monetary policy.' } },
    { terms: ['monetary policy measures', 'interest rates', 'money supply', 'foreign exchange-rate measures'], source: { label: 'Paper 2 source', ref: '2023ON-21 Q5(a); 2025ON-22 Q4(a)', note: 'Monetary-policy measure items', extract: 'MS basis: interest rates, money supply and exchange-rate measures are accepted policy tools.' } },
    { terms: ['interest rate'], source: { label: 'Paper 2 source', ref: '2025ON-21 Q1(g)', note: 'Interest-rate effects discuss wording', extract: 'MS basis: interest-rate changes affect borrowing, saving, spending and investment.' } },
  ],
  supplySide: [
    { terms: ['supply-side policy', 'productive capacity', 'total supply'], source: { label: 'Paper 2 source', ref: '2025ON-22 Q5(b)', note: 'Monetary and supply-side policy difference wording', extract: 'MS basis: supply-side policy aims to increase total supply and usually takes longer than demand-side measures.' } },
    { terms: ['ppc', 'production possibility curve', 'rightward ppc shift', 'rightward shift', 'point outside'], source: { label: 'Paper 2 source', ref: '2024ON-21 Q1(f); 2025MJ-22 Q3(a); 2025ON-22 Q2(b)', note: 'PPC productive-capacity diagram wording', extract: 'MS basis: axes need two different outputs; curves slope downward and touch both axes; right shift or PPC1 to PPC2 shows higher productive capacity.' } },
    { terms: ['point inside', 'inside ppc', 'unemployed resources', 'spare resources'], source: { label: 'Paper 2 source', ref: '2023ON-22 Q5(c)', note: 'PPC capacity and resource-use wording', extract: 'MS basis: a change in available resources changes productive capacity; the diagram mark scheme stresses axes, curves to axes and labelled shifts.' } },
    { terms: ['education', 'training', 'healthcare', 'labour mobility', 'structural unemployment'], source: { label: 'Paper 2 source', ref: '2023ON-22 Q3(c); 2024ON-21 Q3(d)', note: 'Human-capital and unemployment chains', extract: 'MS basis: education/training raise skills, productivity and mobility; healthcare reduces lost work time; these may reduce unemployment.' } },
    { terms: ['productivity'], source: { label: 'Paper 2 source', ref: '2023FM-22 Q4(a)', note: 'Labour productivity causes item', extract: 'MS basis: productivity can rise through education, training, healthcare, technology, capital equipment and working conditions.' } },
    { terms: ['infrastructure', 'corporation tax', 'investment', 'tax incentive'], source: { label: 'Paper 2 source', ref: '2025MJ-21 Q4(c)', note: 'Investment and growth chain', extract: 'MS basis: lower corporation tax can increase retained profit, investment, technology, productivity, capacity and GDP.' } },
    { terms: ['privatisation', 'deregulation', 'subsidies', 'subsidy'], source: { label: 'Paper 2 source', ref: '2023ON-22 Q3(c)', note: 'Supply-side policy measure examples', extract: 'MS basis: privatisation, deregulation, subsidies and labour-market reforms can raise efficiency, cut costs or encourage expansion.' } },
  ],
  macroAims: [
    { terms: ['economic growth', 'balance of payments'], source: { label: 'Paper 2 source', ref: '2024ON-22 Q3(c)', note: 'Macroeconomic aim conflict wording', extract: 'MS basis: growth can raise imports and create balance of payments pressure.' } },
    { terms: ['low inflation', 'stable prices'], source: { label: 'Paper 2 source', ref: '2023FM-22 Q1(g)', note: 'Low-inflation aim wording', extract: 'MS basis: low inflation can support planning, confidence and stable costs.' } },
  ],
};

const itemSourceText = (item = {}) => {
  try {
    return JSON.stringify(item).replace(/["{}[\],:]/g, ' ').toLowerCase();
  } catch (_error) {
    return [item.title, item.term, item.definition, item.question, item.prompt, item.footer, item.cue]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
  }
};

const mergeSources = (...sourceGroups) => {
  const seen = new Set();
  return sourceGroups.flatMap(normalizeSources).filter((source) => {
    const key = `${source.label}|${source.ref}|${source.note}|${source.question}|${source.extract}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const directSourcesForItem = (profileKey, item) => {
  const text = itemSourceText(item);
  return (DIRECT_SOURCE_RULES[profileKey] || [])
    .filter((rule) => rule.terms.some((term) => text.includes(term)))
    .map((rule) => rule.source);
};

const normalizeSources = (sources = []) => Array.isArray(sources)
  ? sources
    .map((source) => ({
      label: String(source?.label || '').trim(),
      ref: String(source?.ref || '').trim(),
      note: String(source?.note || '').trim(),
      question: String(source?.question || paper2QuestionsForRef(source?.ref) || '').trim(),
      extract: String(source?.extract || '').trim(),
    }))
    .filter((source) => source.label && source.ref)
  : [];

const renderSources = (sources = [], className = 'sourceList') => {
  const items = normalizeSources(sources);
  if (!items.length) return '';
  return `
    <details class="${className}">
      <summary>Sources</summary>
      <div class="sourcePanel" aria-label="Sources">
        ${items.map((source) => `
          <div class="sourceItem">
            <span class="sourceLabel">${esc(source.label)}</span>
            <span class="sourceRef">${esc(source.ref)}</span>
            ${source.note ? `<span class="sourceNote">${esc(source.note)}</span>` : ''}
            ${source.question ? `<span class="sourceQuestion"><b>Exam question:</b> ${esc(source.question)}</span>` : ''}
            ${source.extract ? `<span class="sourceExtract">${esc(source.extract)}</span>` : ''}
          </div>
        `).join('')}
      </div>
    </details>
  `;
};

const contentSourceTypes = new Set(['term', 'cards', 'flow', 'compare', 'exam', 'modelAnswer', 'answer', 'split', 'systemCompare', 'socialEffectsVenn', 'paperExtract']);

function sourcesForSlide(meta, slide) {
  const key = sourceProfileKey(meta);
  if (!contentSourceTypes.has(slide?.type)) return normalizeSources(slide?.sources);
  const ownSources = normalizeSources(slide?.sources);
  if (ownSources.length) return mergeSources(ownSources, directSourcesForItem(key, slide));
  const metaSources = normalizeSources(meta?.sources);
  if (metaSources.length) return mergeSources(metaSources, directSourcesForItem(key, slide));
  return mergeSources(SOURCE_PROFILES[key] || [], directSourcesForItem(key, slide));
}

/* ---------- Slide chrome ---------- */
const topline = (slide, idx, total) => `
  <div class="topline">
    <span class="badge">${esc(slide.eyebrow || 'Economics')}</span>
    <label class="count slideJumpControl">
      <select
        class="slideJumpSelect"
        data-slide-jump
        aria-label="Go to slide number, 1 to ${total}"
      >
        ${Array.from({ length: total }, (_item, i) => `
          <option value="${i + 1}"${i === idx ? ' selected' : ''}>${pad(i + 1)}</option>
        `).join('')}
      </select>
      <span class="slideJumpTotal" aria-hidden="true">/ ${pad(total)}</span>
    </label>
  </div>
`;

const footer = (meta, slide) => `
  <div class="slide-footer">
    <span>${esc(meta.courseLabel || 'IGCSE Economics Lesson Library')}</span>
    <span class="creator">${esc(meta.creatorLabel || 'Oehler-Huang Library')}</span>
    <span>${esc(slide.eyebrow || meta.lessonLabel || '')}</span>
  </div>
`;

/* ---------- Component helpers ---------- */
const cardIcons = {
  bank: '<path d="M8 18h48"/><path d="M14 18v24M26 18v24M38 18v24M50 18v24"/><path d="M12 42h40"/><path d="M10 18 32 7l22 11z"/>',
  balancePayments: '<path d="M12 22h16l4 8h20v16H12z"/><path d="M18 46a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"/><path d="M42 46a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"/><path d="M42 14h10v10"/><path d="M52 14 38 28"/><path d="M22 14H12v10"/><path d="M12 14l14 14"/>',
  currentAccount: '<path d="M12 18h28"/><path d="M12 30h40"/><path d="M12 42h28"/><path d="m42 14 8 8-8 8"/><path d="m22 34-8 8 8 8"/>',
  defence: '<path d="M32 8 50 16v13c0 13-8 21-18 27-10-6-18-14-18-27V16z"/><path d="M32 16v30"/>',
  education: '<path d="M8 22 32 10l24 12-24 12z"/><path d="M18 28v12c8 5 20 5 28 0V28"/><path d="M52 24v18"/>',
  environmentalSustainability: '<circle cx="29" cy="32" r="18"/><path d="M13 32h32M29 14c5 6 8 12 8 18s-3 12-8 18M29 14c-5 6-8 12-8 18s3 12 8 18"/><path d="M41 47c-1-9 4-17 13-23-11 0-20 5-22 13-1 5 2 9 7 10"/><path d="M42 47c-3-5-7-8-13-9"/>',
  employment: '<path d="M23 21a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"/><path d="M14 54c3-10 11-16 18-16s15 6 18 16"/>',
  growth: '<path d="M10 50h44"/><path d="M16 44 27 33l8 7 15-20"/><path d="M43 20h7v7"/>',
  healthcare: '<path d="M32 52s-18-10-18-25a10 10 0 0 1 18-6 10 10 0 0 1 18 6c0 15-18 25-18 25z"/><path d="M32 24v15M24 31h16"/>',
  industry: '<path d="M10 50h44V24L41 32v-8L28 32v-8L10 35z"/><path d="M18 42h6M30 42h6M42 42h6"/>',
  incomeRedistribution: '<path d="M14 48h10V28H14z"/><path d="M40 48h10V16H40z"/><path d="M43 22C33 23 26 28 22 36"/><path d="m22 36-1-9"/><path d="m22 36 9-1"/><text x="17" y="22">L</text><text x="43" y="13">H</text>',
  infrastructure: '<path d="M10 48h44"/><path d="M16 48 28 18l12 30"/><path d="M22 34h20"/><path d="M12 40h40"/>',
  lowInflation: '<path d="M15 16h22l12 12v20H15z"/><path d="M37 16v12h12"/><path d="M22 40h20"/><path d="m38 34 7 6-7 6"/><text x="21" y="30">%</text>',
  lowUnemployment: '<path d="M22 20a8 8 0 1 0 16 0 8 8 0 0 0-16 0z"/><path d="M12 52c3-10 10-15 18-15 5 0 10 2 14 6"/><path d="m42 47 5 5 10-13"/>',
  macroeconomy: '<circle cx="32" cy="32" r="20"/><path d="M12 32h40M32 12c6 6 9 13 9 20s-3 14-9 20M32 12c-6 6-9 13-9 20s3 14 9 20"/>',
  market: '<path d="M12 26h40l-4 26H16z"/><path d="M20 26c0-8 5-14 12-14s12 6 12 14"/><path d="M22 37h20"/>',
  payments: '<path d="M12 22h40v28H12z"/><path d="M12 30h40"/><path d="M22 42h8"/><path d="M39 42h5"/>',
  prices: '<path d="M16 14h23l9 9v27H16z"/><path d="M38 14v10h10"/><path d="M24 40c5 4 12 4 16 0"/><path d="M25 31h.1M39 31h.1"/>',
  publicGood: '<path d="M32 8 53 20v9c0 14-9 22-21 27-12-5-21-13-21-27v-9z"/><path d="M23 33h18M32 24v18"/>',
  realGdp: '<path d="M10 50h44"/><path d="M16 44 26 34l8 6 15-19"/><path d="M43 21h7v7"/><rect x="14" y="37" width="6" height="13"/><rect x="27" y="30" width="6" height="20"/><rect x="40" y="24" width="6" height="26"/><text x="13" y="18">GDP</text>',
  redistribution: '<path d="M18 18h28"/><path d="M23 18 15 36h16z"/><path d="M41 18 33 36h16z"/><path d="M32 18v30"/><path d="M22 52h20"/>',
  subsidy: '<path d="M32 10v44"/><path d="M20 22c0-5 5-8 12-8s12 3 12 8-5 7-12 7-12 3-12 8 5 8 12 8 12-3 12-8"/>',
  sustainability: '<path d="M33 52c-2-15 5-27 17-36-15 0-28 8-31 20-1 5 2 10 7 12"/><path d="M32 51c-3-11-9-18-18-22 11-2 20 2 24 10"/>',
  welfare: '<path d="M16 34c6-4 12-4 18 0l3 2c4 2 8 1 11-2"/><path d="M12 46h40"/><path d="M21 22a7 7 0 1 0 14 0 7 7 0 0 0-14 0z"/>',
};

const cardIcon = (icon = '') => {
  const paths = cardIcons[icon];
  if (!paths) return '';
  return `
    <span class="cardIcon" aria-hidden="true">
      <svg viewBox="0 0 64 64" focusable="false">
        ${paths}
      </svg>
    </span>
  `;
};

const normalizeCard = (card = {}) => {
  if (Array.isArray(card)) {
    return {
      title: card[0],
      body: card[1],
      num: card[2],
    };
  }

  return {
    title: card.title,
    zhTitle: card.zhTitle,
    body: card.body || card.detail || (!card.examples && !card.definitionZh ? card.definition : ''),
    definition: card.definition,
    definitionZh: card.definitionZh,
    examples: card.examples,
    num: card.num || card.number,
    icon: card.icon,
  };
};

const cardExampleBox = (examples = []) => {
  if (!examples.length) return '';
  return `
    <div class="cardExampleBox">
      <span class="cardBoxLabel">Example</span>
      ${examples.map((example) => {
        const label = Array.isArray(example) ? example[0] : '';
        const detail = Array.isArray(example) ? example[1] : example;
        return `
          <div class="cardExampleLine">
            ${label ? `<span>${esc(label)}</span>` : ''}
            <em>${esc(detail || '')}</em>
          </div>
        `;
      }).join('')}
    </div>
  `;
};

const cardGrid = (cards = [], options = {}) => {
  const style = options.style ? ` is-${esc(options.style)}` : '';
  const layout = options.layout ? ` is-${esc(options.layout)}` : '';
  return `
    <div class="cardgrid${style}${layout}">
      ${cards.map((rawCard) => {
        const card = normalizeCard(rawCard);
        return `
          <div class="card">
            ${card.icon ? cardIcon(card.icon) : ''}
            ${card.num ? `<div class="num">${esc(card.num)}</div>` : ''}
            <b class="cardTitle">
              ${esc(card.title)}
              ${card.zhTitle ? `<span class="cardTitleZh" lang="zh-Hans">${esc(card.zhTitle)}</span>` : ''}
            </b>
            ${card.body ? `<span class="cardBody">${esc(card.body)}</span>` : ''}
            ${card.definition ? `
              <div class="cardDefinitionBox">
                <span class="cardBoxLabel">Definition</span>
                <p>${esc(card.definition)}</p>
                ${card.definitionZh ? `<p class="cardDefinitionZh">${esc(card.definitionZh)}</p>` : ''}
              </div>
            ` : ''}
            ${cardExampleBox(card.examples || [])}
          </div>
        `;
      }).join('')}
    </div>
  `;
};

const taxRateDiagramPath = (mode = '') => {
  switch (String(mode).toLowerCase()) {
    case 'progressive':
      return 'M78 250 C128 240 180 210 232 158 C258 132 280 104 304 76';
    case 'regressive':
      return 'M78 82 C128 102 180 140 232 192 C258 218 282 238 304 250';
    case 'proportional':
      return 'M78 166 L304 166';
    default:
      return 'M78 166 L304 166';
  }
};

const taxRateDiagramCard = (item = {}) => `
  <article class="taxRateDiagramCard is-${esc(item.mode || 'proportional')}">
    <h3>${esc(item.title || '')}</h3>
    ${item.zhTitle ? `<p lang="zh-Hans">${esc(item.zhTitle)}</p>` : ''}
    <svg class="taxRateSvg" viewBox="0 0 360 320" role="img" aria-label="${esc(item.title || 'Tax rate diagram')}">
      <line class="taxRateAxis" x1="58" y1="270" x2="318" y2="270"/>
      <line class="taxRateAxis" x1="58" y1="270" x2="58" y2="42"/>
      <path class="taxRateCurve" d="${taxRateDiagramPath(item.mode)}"/>
      <text class="taxRateAxisLabel" x="188" y="306" text-anchor="middle">Income taxed</text>
      <text class="taxRateAxisLabel" transform="translate(20 162) rotate(-90)" text-anchor="middle">Tax rate</text>
      <text class="taxRateTickLabel" x="54" y="292" text-anchor="end">0</text>
      <text class="taxRateTickLabel" x="84" y="292" text-anchor="middle">low</text>
      <text class="taxRateTickLabel" x="304" y="292" text-anchor="middle">high</text>
    </svg>
    ${item.note ? `<div class="taxRateNote">${esc(item.note)}</div>` : ''}
  </article>
`;

const taxRateDiagramCompare = (s) => {
  const diagrams = s.diagrams || [
    {
      mode: 'progressive',
      title: 'Progressive',
      zhTitle: '累进税',
      note: 'Tax rate rises as income taxed rises.',
    },
    {
      mode: 'regressive',
      title: 'Regressive',
      zhTitle: '累退税',
      note: 'Tax rate falls as income taxed rises.',
    },
    {
      mode: 'proportional',
      title: 'Proportional',
      zhTitle: '比例税',
      note: 'Tax rate stays the same at all income levels.',
    },
  ];

  return `
    <div class="taxRateCompare">
      <h2>${esc(s.title || 'Tax rate diagrams')}</h2>
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      <div class="taxRateDiagramGrid">
        ${diagrams.map(taxRateDiagramCard).join('')}
      </div>
      ${s.prompt ? `<div class="prompt">${esc(s.prompt)}</div>` : ''}
    </div>
  `;
};

const numberedCards = (items = []) => `
  <div class="cardgrid">
    ${items.map(it => `
      <div class="card">
        <div class="num">${esc(it[0])}</div>
        <b>${esc(it[1])}</b>
        <span>${esc(it[2] || '')}</span>
      </div>
    `).join('')}
  </div>
`;

const choiceList = (items = []) => `
  <div class="choices">
    ${items.map(x => `<div class="choice">${esc(x)}</div>`).join('')}
  </div>
`;

const mcqChoiceList = (items = [], answer = null) => `
  <div class="choices is-mcq" ${Number.isInteger(answer) ? `data-answer="${answer}"` : ''}>
    ${items.map((x, i) => `
      <button type="button" class="choice" aria-pressed="false" ${i === answer ? 'data-correct="true"' : ''}>
        <span class="choiceLetter">${String.fromCharCode(65 + i)}</span>
        <span>${esc(x)}</span>
      </button>
    `).join('')}
  </div>
`;

const stepList = (items = []) => `
  <div class="steps">
    ${items.map(x => `
      <div class="step">
        <div class="label">${esc(x[0])}</div>
        <div class="desc">${esc(x[1])}</div>
      </div>
    `).join('')}
  </div>
`;

const blankStatement = (text = '', answer = '') => {
  const blankPattern = /_{3,}/;
  const parts = String(text || '').split(blankPattern);
  return answer && parts.length > 1
    ? `${esc(parts[0])}<button type="button" class="blankAnswer" aria-expanded="false"><span>${esc(answer)}</span></button>${esc(parts.slice(1).join(''))}`
    : esc(text);
};

const normaliseFlowNode = (node = {}) => {
  if (Array.isArray(node)) return { text: node[0], zh: node[1] };
  if (node && typeof node === 'object') return node;
  return { text: node };
};

const flowChips = (nodes = [], mode = '') => {
  const arr = Array.isArray(nodes[0]) ? nodes[0] : nodes;
  return `
    <div class="flowChain flowRow${mode === 'fillBlanks' ? ' is-fillBlanks' : ''}" style="--flow-count:${arr.length}">
      ${arr.map((x, i) => {
        const node = normaliseFlowNode(x);
        const text = mode === 'fillBlanks' ? blankStatement(node.text, node.answer) : esc(node.text);
        return `
        <div class="flowStep flowChip">
          <span class="flowNumber">${i + 1}</span>
          <span class="flowText">${text}</span>
          ${node.zh ? `<span class="flowTextZh" lang="zh-Hans">${esc(node.zh)}</span>` : ''}
        </div>
      `;
      }).join('')}
    </div>
  `;
};

const cleanList = (items = []) =>
  `<ul class="clean">${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;

const escapeRegExp = (value = '') =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightTerms = (text = '', terms = []) => {
  const uniqueTerms = [...new Set((terms || [])
    .map((term) => String(term || '').trim())
    .filter(Boolean))]
    .sort((a, b) => b.length - a.length);

  if (!uniqueTerms.length) return esc(text);

  const pattern = new RegExp(`(${uniqueTerms.map(escapeRegExp).join('|')})`, 'gi');
  const chunks = [];
  let lastIndex = 0;

  String(text || '').replace(pattern, (match, _term, offset) => {
    chunks.push(esc(String(text).slice(lastIndex, offset)));
    chunks.push(`<mark>${esc(match)}</mark>`);
    lastIndex = offset + match.length;
    return match;
  });

  chunks.push(esc(String(text).slice(lastIndex)));
  return chunks.join('');
};

const modelAnswerBody = (s = {}) => {
  const paragraphs = Array.isArray(s.paragraphs) && s.paragraphs.length
    ? s.paragraphs
    : [s.answer || ''];
  const rendered = paragraphs
    .filter((paragraph) => String(paragraph || '').trim())
    .map((paragraph) => `<p>${highlightTerms(paragraph, s.links || [])}</p>`)
    .join('');

  return paragraphs.length > 1
    ? `<div class="modelAnswerText modelAnswerParagraphs">${rendered}</div>`
    : `<p class="modelAnswerText">${highlightTerms(paragraphs[0] || '', s.links || [])}</p>`;
};

const definitionWithBlanks = (text = '', terms = []) => {
  const uniqueTerms = [...new Set((terms || [])
    .map((term) => String(term || '').trim())
    .filter(Boolean))]
    .sort((a, b) => b.length - a.length);

  if (!uniqueTerms.length) return esc(text);

  const pattern = new RegExp(`(${uniqueTerms.map(escapeRegExp).join('|')})`, 'gi');
  const chunks = [];
  let lastIndex = 0;

  String(text || '').replace(pattern, (match, _term, offset) => {
    chunks.push(esc(String(text).slice(lastIndex, offset)));
    chunks.push(`<button type="button" class="blankAnswer definitionBlankAnswer" aria-expanded="false"><span>${esc(match)}</span></button>`);
    lastIndex = offset + match.length;
    return match;
  });

  chunks.push(esc(String(text).slice(lastIndex)));
  return chunks.join('');
};

const termExamples = (items = []) => `
  <div class="termExamples">
    ${items.map((item, i) => {
      const label = Array.isArray(item) ? item[0] : String(item);
      const detail = Array.isArray(item) ? item[1] : '';
      return `
        <div class="termExample">
          <span>${i + 1}</span>
          <b>${esc(label)}</b>
          ${detail ? `<em>${esc(detail)}</em>` : ''}
        </div>
      `;
    }).join('')}
  </div>
`;

const termNotes = (items = []) => {
  const normalised = (items || [])
    .map((item) => {
      if (Array.isArray(item)) {
        return { term: item[0], zh: item[1], note: item[2] };
      }
      return item || {};
    })
    .filter((item) => item.term && (item.zh || item.note));

  if (!normalised.length) return '';

  return `
    <div class="definitionTermNotes" aria-label="Highlighted term notes">
      ${normalised.map((item) => `
        <div class="definitionTermNote">
          <b>${esc(item.term)}</b>
          ${item.zh ? `<span lang="zh-Hans">${esc(item.zh)}</span>` : ''}
          ${item.note ? `<em>${esc(item.note)}</em>` : ''}
        </div>
      `).join('')}
    </div>
  `;
};

const fillBlankList = (items = []) => {
  const blankPattern = /_{3,}/;
  return `
    <div class="fillBlanks">
      ${items.map((item, i) => {
        const raw = Array.isArray(item) ? item[1] : String(item);
        const answer = Array.isArray(item) ? (item[2] || '') : '';
        const parts = raw.split(blankPattern);
        const statement = answer && parts.length > 1
          ? `${esc(parts[0])}<button type="button" class="blankAnswer" aria-expanded="false"><span>${esc(answer)}</span></button>${esc(parts.slice(1).join(''))}`
          : esc(raw);
        return `
          <div class="fillBlank">
            <span class="fillNumber">${i + 1}</span>
            <p>${statement}</p>
          </div>
        `;
      }).join('')}
    </div>
  `;
};

const splitFactText = (fact = {}) => {
  const fallback = String(fact.fact || '');
  if (fact.context || fact.question) {
    return {
      context: fact.context || fallback,
      question: fact.question || '',
    };
  }

  const questionMatch = fallback.match(/^(.*?)([^.?!]*\?)\s*$/);
  return {
    context: questionMatch ? questionMatch[1].trim() : fallback,
    question: questionMatch ? questionMatch[2].trim() : '',
  };
};

const fallbackFactAnswer = (fact = {}) => {
  const { context, question } = splitFactText(fact);
  if (fact.answer) return fact.answer;
  if (!question) return '';
  return `${context ? `${context} ` : ''}A possible answer should connect the real-world example directly to the economic concept in the question.`;
};

const factPanel = (fact = {}, modifier = '', options = {}) => {
  const { context, question } = splitFactText(fact);
  const answer = fallbackFactAnswer(fact);
  const sideAttr = options.side ? ` data-fact-side="${esc(options.side)}"` : '';
  return `
    <article class="factPanel${modifier ? ` ${modifier}` : ''}${options.active ? ' is-active' : ''}"${sideAttr}
      data-answer="${esc(answer)}" data-answer-zh="${esc(fact.answerZh || '')}">
      ${options.showCountry === false ? '' : `
        <div class="factCountry">
          ${fact.flag ? `<span class="factFlag">${esc(fact.flag)}</span>` : ''}
          <span>${esc(fact.country || '')}</span>
        </div>
      `}
      <div class="factText">
        ${context ? `<p class="factContext">${esc(context)}</p>` : ''}
        ${question ? `<p class="factQuestion">${esc(question)}</p>` : ''}
        ${fact.questionZh ? `<p class="factQuestionZh" lang="zh-Hans">${esc(fact.questionZh)}</p>` : ''}
      </div>
      ${fact.zh ? `<p class="factZh">${esc(fact.zh)}</p>` : ''}
      ${fact.source ? `<div class="factSource">${esc(fact.source)}</div>` : ''}
    </article>
  `;
};

const chinaFactPanel = (fact = {}, modifier = '') => `
  <aside class="chinaFactPanel${modifier ? ` ${modifier}` : ''}" aria-label="China comparison">
    <div class="chinaFactHeader">
      ${fact.flag ? `<span class="factFlag">${esc(fact.flag)}</span>` : ''}
      <span>${esc(fact.country || 'China')} comparison</span>
    </div>
    ${(() => {
      const { context, question } = splitFactText(fact);
      return `
        <div class="chinaFactText">
          ${context ? `<p class="factContext">${esc(context)}</p>` : ''}
          ${question ? `<p class="factQuestion">${esc(question)}</p>` : ''}
        </div>
      `;
    })()}
    ${fact.zh ? `<p class="chinaFactZh">${esc(fact.zh)}</p>` : ''}
    ${fact.source ? `<div class="factSource">${esc(fact.source)}</div>` : ''}
  </aside>
`;

const factBlock = (s) => {
  if (s.facts?.left || s.facts?.china) {
    const left = s.facts.left || {};
    const china = s.facts.china || {};
    const hasChina = Boolean(china.context || china.question || china.fact);
    return `
      <div class="factBlock has-fact-switcher">
        ${hasChina ? `
          <div class="factCountrySwitch" role="group" aria-label="Choose fact example">
            <button type="button" class="factSwitchButton is-active" data-fact-target="example" aria-pressed="true">
              ${left.flag ? `<span class="factFlag">${esc(left.flag)}</span>` : ''}
              <span>${esc(left.country || 'Example')}</span>
            </button>
            <button type="button" class="factSwitchButton" data-fact-target="china" aria-pressed="false">
              ${china.flag ? `<span class="factFlag">${esc(china.flag)}</span>` : '<span class="factFlag">🇨🇳</span>'}
              <span>${esc(china.country || 'China')}</span>
            </button>
          </div>
        ` : ''}
        <div class="factPanelStack">
          ${factPanel(left, 'is-main', { side: 'example', active: true, showCountry: !hasChina })}
          ${hasChina ? factPanel(china, 'is-main is-china', { side: 'china', showCountry: false }) : ''}
        </div>
        <button type="button" class="discussionAnswerButton factAnswerButton" aria-haspopup="dialog">
          <span>Show possible answer</span>
        </button>
      </div>
    `;
  }

  return `
    <div class="factBlock">
      ${factPanel({
        flag: s.flag,
        country: s.country,
        fact: s.fact || (s.facts || [])[0] || '',
        context: s.context,
        question: s.question,
        questionZh: s.questionZh,
        answer: s.answer,
        answerZh: s.answerZh,
        zh: s.zh,
        source: s.source,
      }, '', { active: true })}
      <button type="button" class="discussionAnswerButton factAnswerButton" aria-haspopup="dialog">
        <span>Show possible answer</span>
      </button>
    </div>
  `;
};
const systemCompare = (systems = []) => `
  <div class="systemCompare">
    ${systems.map((system, i) => `
      <div class="systemCard" style="--system-index:${i}">
        <div class="systemTop">
          <span class="systemVisual is-${esc(system.visual || `system-${i + 1}`)}" aria-hidden="true">
            <i></i><i></i><i></i>
          </span>
          <b>${esc(system.title)}${system.zhTitle ? `<span>${esc(system.zhTitle)}</span>` : ''}</b>
        </div>
        ${cleanList(system.points || [])}
      </div>
    `).join('')}
  </div>
`;

const sectionProgress = (slide) => {
  const titles = slide._sectionTitles || [];
  if (!titles.length) return '';
  return `
    <div class="sectionProgress" aria-label="Lesson section progress">
      <div class="sectionTrack">
        ${titles.map((title, i) => `
          <span class="${i + 1 < slide._sectionStep ? 'is-complete' : i + 1 === slide._sectionStep ? 'is-current' : ''}">
            <i>${i + 1}</i>
            <em>${esc(String(title).replace(/\n/g, ' '))}</em>
          </span>
        `).join('')}
      </div>
    </div>
  `;
};

const peerTaskMissingSentence = (s) => {
  const missingStep = Number(s.missingSentenceStep || 2);
  const steps = (s.steps || []).map((step, i) => {
    const label = Array.isArray(step) ? String(step[0]) : String(i + 1);
    const text = Array.isArray(step) ? step[1] : step;
    const answer = Array.isArray(step) ? step[2] : '';
    const isMissing = Number(label) === missingStep || i + 1 === missingStep;
    return `
      <div class="step${isMissing ? ' is-missingSentence' : ''}">
        <div class="label">${esc(label)}</div>
        <div class="desc">${isMissing ? blankStatement(text, s.missingSentenceAnswer || answer) : esc(text)}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="peerTaskBlock is-missingSentenceTask">
      ${s.title || s.zhTitle ? `<h2>${esc(s.title || '')}${s.zhTitle ? `<span class="inlineZh">${esc(s.zhTitle)}</span>` : ''}</h2>` : ''}
      ${s.prompt ? `<p class="lead">${esc(s.prompt)}</p>` : ''}
      ${s.zhPrompt ? `<p class="peerTaskZh" lang="zh-Hans">${esc(s.zhPrompt)}</p>` : ''}
      <div class="peerTaskMissingSteps steps">
        ${steps}
      </div>
      ${s.sharePrompt ? `<div class="prompt peerTaskShare">${esc(s.sharePrompt)}</div>` : ''}
    </div>
  `;
};

/* ---------- Slide body renderers, keyed by slide.type ---------- */
const renderers = {
  hero: (s) => `
    <div>
      ${s.subtitle ? `<div class="sub">${esc(s.subtitle)}</div>` : ''}
      <h1>${esc(s.title)}</h1>
      ${s.zhTitle ? `<div class="heroTitleZh" lang="zh-Hans">${esc(s.zhTitle)}</div>` : ''}
      ${s.kicker ? `<div class="kicker">${esc(s.kicker)}</div>` : ''}
    </div>
  `,

  roadmap: (s) => `
    <div>
      <h2>${esc(s.title)}</h2>
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      ${numberedCards(s.items)}
    </div>
  `,

  outcomes: (s) => `
    <div>
      <h2>${esc(s.title)}</h2>
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      <div class="choices is-outcomes">
        ${(s.bullets || []).map((bullet, i) => `
          <div class="choice">
            <span>${esc(bullet)}</span>
            ${s.zhBullets?.[i] ? `<span class="outcomeZh" lang="zh-Hans">${esc(s.zhBullets[i])}</span>` : ''}
          </div>
        `).join('')}
      </div>
      ${s.footer ? `<div class="prompt">${esc(s.footer)}</div>` : ''}
    </div>
  `,

  term: (s) => {
    const notes = s.keyTerms || s.termNotes || [];
    const highlightLabels = (notes || [])
      .map((item) => Array.isArray(item) ? item[0] : item?.term)
      .filter(Boolean);
    const definitionCue = s.definitionCue === false ? '' : (s.definitionCue || 'Key term');

    return `
      <div class="termBlock">
        ${definitionCue ? `<div class="definitionCue">${esc(definitionCue)}</div>` : ''}
        <h2>${esc(s.title)}${s.zhTitle ? `<span class="inlineZh">${esc(s.zhTitle)}</span>` : ''}</h2>
        ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
        <div class="termBox">
          ${s.term && s.term.toLowerCase() !== String(s.title || '').toLowerCase()
            ? `<b>${esc(s.term)}</b>`
            : ''}
          <p class="termDefinitionText">${definitionWithBlanks(s.definition, highlightLabels)}</p>
          ${s.definitionZh ? `<p class="termDefinitionZh" lang="zh-Hans">${esc(s.definitionZh)}</p>` : ''}
        </div>
        ${termNotes(notes)}
        ${s.formula ? `<div class="formula">${esc(s.formula)}</div>` : ''}
        ${s.examples && s.showExamples !== false ? termExamples(s.examples) : ''}
      </div>
    `;
  },

  compare: (s) => `
    <div class="compareBlock${s.mode === 'fillBlanks' ? ' is-fillBlanks' : ''}${s.variant ? ` is-${esc(String(s.variant).replace(/[^a-z0-9_-]/gi, ''))}` : ''}">
      ${s.title ? `<h2>${esc(s.title)}</h2>` : ''}
      ${s.question ? `<p class="lead">${esc(s.question)}</p>` : ''}
      ${s.term ? `
        <div class="termBox">
          <b>${esc(s.term)}</b>
          <p>${esc(s.definition)}</p>
        </div>` : ''}
      <div class="splitCols">
        <div class="card"><b>${esc(s.leftTitle)}</b>${s.mode === 'fillBlanks' ? fillBlankList(s.left) : choiceList(s.left)}</div>
        <div class="card"><b>${esc(s.rightTitle)}</b>${s.mode === 'fillBlanks' ? fillBlankList(s.right) : choiceList(s.right)}</div>
      </div>
      ${s.prompt ? `<div class="prompt">${esc(s.prompt)}</div>`
        : s.divider ? `<div class="prompt">${esc(s.divider)}</div>` : ''}
    </div>
  `,

  socialEffectsVenn: (s) => `
    <div class="socialEffectsVenn">
      <h2>${esc(s.title)}</h2>
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      <div class="vennGrid">
        ${['costs', 'benefits'].map((key) => {
          const item = s[key] || {};
          return `
            <section class="vennBox">
              <h3>${esc(item.title || '')}</h3>
              <div class="vennDiagram" aria-label="${esc(item.title || '')}">
                <div class="vennSocial">
                  <span>${esc(item.social || '')}</span>
                </div>
                <div class="vennPrivate">
                  <b>${esc(item.private || '')}</b>
                  <em>${esc(item.privateNote || '')}</em>
                </div>
                <div class="vennExternal">
                  <b>${esc(item.external || '')}</b>
                  <em>${esc(item.externalNote || '')}</em>
                </div>
              </div>
              <div class="vennFormula">${esc(item.formula || '')}</div>
            </section>
          `;
        }).join('')}
      </div>
      ${s.prompt ? `<div class="prompt">${esc(s.prompt)}</div>` : ''}
    </div>
  `,

  quiz: (s) => `
    <div class="quizBlock">
      ${s.question ? `<p class="lead">${esc(s.question)}</p>` : ''}
      ${mcqChoiceList(s.choices, s.answer)}
      ${s.prompt ? `<div class="prompt">${esc(s.prompt)}</div>` : ''}
    </div>
  `,

  peerTask: (s) => s.taskType === 'missingSentence' ? peerTaskMissingSentence(s) : `
    <div class="peerTaskBlock">
      ${s.title || s.zhTitle ? `<h2>${esc(s.title || '')}${s.zhTitle ? `<span class="inlineZh">${esc(s.zhTitle)}</span>` : ''}</h2>` : ''}
      <div class="peerTaskGrid">
        <section class="peerTaskPromptPanel">
          <div class="peerTaskBadge">${esc(s.eyebrow || 'Pair check')}</div>
          ${s.prompt ? `<p class="lead">${esc(s.prompt)}</p>` : ''}
          ${s.zhPrompt ? `<p class="peerTaskZh" lang="zh-Hans">${esc(s.zhPrompt)}</p>` : ''}
        </section>
        <section class="peerTaskStepsPanel">
          <div class="peerTaskPanelLabel">Do these three steps</div>
          ${stepList((s.steps || []).map((step, i) => Array.isArray(step) ? step : [String(i + 1), step]))}
        </section>
      </div>
      ${s.sharePrompt || (s.sampleAnswers || []).length ? `
        <div class="peerTaskBottom">
          ${s.sharePrompt ? `<div class="prompt peerTaskShare">${esc(s.sharePrompt)}</div>` : ''}
          ${(s.sampleAnswers || []).length ? `
            <div class="peerTaskSamples">
              <div class="peerTaskSampleLabel">Model answer after you try <span lang="zh-Hans">参考答案</span></div>
              ${(s.sampleAnswers || []).map((answer) => `<div class="choice">${esc(answer)}</div>`).join('')}
            </div>` : ''}
        </div>` : ''}
    </div>
  `,

  answer: (s) => `
    <div>
      <h2>${esc(s.title)}${s.zhTitle ? `<span class="inlineZh">${esc(s.zhTitle)}</span>` : ''}</h2>
      ${s.answer ? `
        <div class="answerBox">
          <div class="big">${esc(s.answer)}</div>
          ${s.body ? `<p>${esc(s.body)}</p>` : ''}
        </div>` : ''}
      ${s.mode === 'fillBlanks' && s.steps ? fillBlankList(s.steps) : s.steps ? stepList(s.steps) : ''}
      ${s.cue ? `<div class="prompt">${esc(s.cue)}</div>` : ''}
    </div>
  `,

  cards: (s) => `
    <div>
      ${s.showTitle === false ? '' : `<h2>${esc(s.title)}</h2>`}
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      ${cardGrid(s.cards, { style: s.cardStyle, layout: s.cardLayout })}
      ${s.footer ? `<div class="prompt">${esc(s.footer)}</div>` : ''}
    </div>
  `,

  split: (s) => `
    <div>
      <h2>${esc(s.title)}</h2>
      <div class="splitCols">
        <div class="card"><b>${esc(s.leftTitle)}</b>${cleanList(s.left)}</div>
        <div class="card"><b>${esc(s.rightTitle)}</b>${cleanList(s.right)}</div>
      </div>
      ${s.prompt ? `<div class="prompt">${esc(s.prompt)}</div>` : ''}
    </div>
  `,

  flow: (s) => `
      <div class="flowBlock">
      <h2>${esc(s.title)}${s.zhTitle ? `<span class="inlineZh">${esc(s.zhTitle)}</span>` : ''}</h2>
      ${s.question ? `<p class="lead">${esc(s.question)}</p>` : ''}
      ${flowChips(s.nodes, s.mode)}
      ${s.prompt ? `<div class="prompt">${esc(s.prompt)}</div>` : ''}
      ${s.footer ? `<div class="prompt">${esc(s.footer)}</div>` : ''}
    </div>
  `,

  exam: (s) => {
    const showQuestion = s.question && !titleContainsQuestion(s.title, s.question);
    return `
      <div class="examBlock">
        <h2>${esc(s.title)}</h2>
        ${showQuestion ? `<p class="lead examQuestion">${esc(s.question)}</p>` : ''}
        <div class="examChainLabel">${esc(s.keywordLabel || 'Required explanation points')}</div>
        <div class="cardgrid">
          ${(s.keywords || []).map((k, i) => `
            <div class="card examChainLink">
              <div class="num">${i + 1}</div>
              <b>${esc(k)}</b>
            </div>
          `).join('')}
        </div>
        ${s.prompt ? `<div class="prompt">${esc(s.prompt)}</div>` : ''}
      </div>
    `;
  },

  paperExtract: (s) => {
    const showQuestion = s.question && !titleContainsQuestion(s.title, s.question);
    const visibleQuestions = (s.questions || []).filter((question) => !titleContainsQuestion(s.title, question));
    return `
      <div class="paperExtractBlock">
        <h2>${esc(s.title || 'Question paper extract')}</h2>
        ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
        <div class="paperExtractPanel">
          <div class="paperExtractLabel">Question paper extract</div>
          <div class="paperExtractText">
            ${(s.paragraphs || []).map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
          </div>
          ${showQuestion ? `
            <div class="paperExtractQuestion">
              <b>Question</b>
              <span>${esc(s.question)}</span>
            </div>` : ''}
          ${visibleQuestions.length ? `
            <div class="paperExtractQuestions">
              <b>Questions</b>
              <ol>
                ${visibleQuestions.map((question) => `<li>${esc(question)}</li>`).join('')}
              </ol>
            </div>` : ''}
          ${s.source ? `<div class="paperExtractSource">${esc(s.source)}</div>` : ''}
        </div>
      </div>
    `;
  },

  modelAnswer: (s) => {
    const showQuestion = s.question && !titleContainsQuestion(s.title, s.question);
    return `
      <div class="modelAnswerBlock">
        <h2>${esc(s.title || 'Model answer')}</h2>
        ${showQuestion ? `<p class="lead modelAnswerQuestion">${esc(s.question)}</p>` : ''}
        <div class="modelAnswerCard">
          <div class="modelAnswerLabel">Model answer</div>
          ${modelAnswerBody(s)}
        </div>
        ${(s.links || []).length && s.showLinkChips !== false ? `
          <div class="modelAnswerLinks" aria-label="Required links used">
            ${(s.links || []).map((link) => `<span>${esc(link)}</span>`).join('')}
          </div>` : ''}
        ${s.markSchemeNote ? `
          <div class="modelAnswerNote">
            <b>Why this scores well</b>
            <span>${esc(s.markSchemeNote)}</span>
          </div>` : ''}
      </div>
    `;
  },

  discussion: (s) => `
    <div class="discussionPrompt">
      <p>${esc(s.question)}</p>
      ${s.zh ? `<p class="zh">${esc(s.zh)}</p>` : ''}
      ${s.answer ? `
        <button type="button" class="discussionAnswerButton" data-discussion-answer="${s.discussionAnswerIndex ?? ''}" aria-haspopup="dialog">
          <span>Show possible answer</span>
        </button>
      ` : ''}
    </div>
  `,

  fact: (s) => factBlock(s),

  systemCompare: (s) => `
    <div>
      <h2>${esc(s.title)}</h2>
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      ${systemCompare(s.systems)}
      ${s.prompt ? `<div class="prompt">${esc(s.prompt)}</div>` : ''}
    </div>
  `,

  taxSim: (s) => `
    <div class="taxSim" data-default-mode="${esc(s.defaultMode || 'progressive')}">
      <h2>${esc(s.title || 'Tax burden simulator')}</h2>
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      <div class="simModes" role="group" aria-label="Tax type">
        <button type="button" class="simMode is-active" data-mode="progressive">Progressive</button>
        <button type="button" class="simMode" data-mode="proportional">Proportional</button>
        <button type="button" class="simMode" data-mode="regressive">Regressive</button>
      </div>
      <div class="simResults">
        <div class="simHousehold" data-household="low">
          <div class="simName">Lower-income household</div>
          <div class="simIncome"></div>
          <div class="simBarLabel">Income split</div>
          <div class="simStackedBar">
            <span class="simTaxSegment"></span>
            <span class="simAfterTaxSegment"></span>
          </div>
          <div class="simTaxRows">
            <div><span>Tax amount</span><b class="simTaxAmount"></b></div>
            <div><span>Tax paid as % of income</span><b class="simTaxRate"></b></div>
            <div><span>After-tax income</span><b class="simAfterTax"></b></div>
          </div>
        </div>
        <div class="simHousehold" data-household="high">
          <div class="simName">Higher-income household</div>
          <div class="simIncome"></div>
          <div class="simBarLabel">Income split</div>
          <div class="simStackedBar">
            <span class="simTaxSegment"></span>
            <span class="simAfterTaxSegment"></span>
          </div>
          <div class="simTaxRows">
            <div><span>Tax amount</span><b class="simTaxAmount"></b></div>
            <div><span>Tax paid as % of income</span><b class="simTaxRate"></b></div>
            <div><span>After-tax income</span><b class="simAfterTax"></b></div>
          </div>
        </div>
      </div>
      <div class="simLegend">
        <span><i class="is-tax"></i>Tax paid</span>
        <span><i class="is-after-tax"></i>After-tax income</span>
      </div>
      <div class="simTakeaway"></div>
    </div>
  `,

  taxRateDiagramCompare: (s) => taxRateDiagramCompare(s),

  chinaIncomeTaxSim: (s) => `
    <div class="chinaTaxSim"
      data-default-income="${esc(s.defaultIncome ?? 240000)}"
      data-standard-deduction="${esc(s.standardDeduction ?? 60000)}">
      <h2>${esc(s.title || 'Mainland China income tax calculator')}</h2>
      <p class="chinaTaxZh">中国大陆个人所得税计算器</p>
      <div class="chinaTaxGrid">
        <div class="chinaTaxPanel">
          <div class="chinaTaxControls">
            <label>
              <span>Annual gross income</span>
              <small>税前年收入</small>
              <input class="chinaGrossIncome" type="number" min="0" step="1000" inputmode="numeric" />
            </label>
            <label>
              <span>Other annual deductions</span>
              <small>其他年度扣除</small>
              <input class="chinaExtraDeductions" type="number" min="0" step="1000" inputmode="numeric" value="0" />
            </label>
          </div>
          <div class="chinaPresetRow" role="group" aria-label="Income presets">
            ${(s.presets || [96000, 180000, 360000, 720000, 1200000]).map((amount) => `
              <button type="button" class="chinaPreset" data-income="${esc(amount)}"></button>
            `).join('')}
          </div>
          <div class="chinaFormula">
            Taxable income = annual income - RMB 60,000 - deductions.
            <span>应纳税所得额 = 年收入 - 60,000元 - 扣除。</span>
          </div>
        </div>
        <div class="chinaTaxPanel chinaTaxResults">
          <div class="chinaMetric is-large">
            <span>Estimated annual IIT</span>
            <b class="chinaTaxDue"></b>
          </div>
          <div class="chinaMetric">
            <span>Taxable income</span>
            <b class="chinaTaxableIncome"></b>
          </div>
          <div class="chinaMetric">
            <span>Marginal rate</span>
            <b class="chinaMarginalRate"></b>
          </div>
          <div class="chinaMetric">
            <span>Effective rate</span>
            <b class="chinaEffectiveRate"></b>
          </div>
          <div class="chinaMetric">
            <span>Income after IIT</span>
            <b class="chinaAfterTaxIncome"></b>
          </div>
        </div>
      </div>
      <div class="chinaIncomeSplit" aria-label="Taxable income calculation">
        <span class="chinaStandardSegment"></span>
        <span class="chinaExtraSegment"></span>
        <span class="chinaTaxableSegment"></span>
      </div>
      <div class="chinaLegend">
        <span><i class="is-standard"></i>RMB 60,000 standard deduction</span>
        <span><i class="is-extra"></i>Other deductions</span>
        <span><i class="is-taxable"></i>Taxable income</span>
      </div>
      <div class="chinaBracketViz"></div>
      <div class="chinaSource">
        ${esc(s.source || 'Resident comprehensive income; simplified estimate using annual brackets and quick deductions.')}
      </div>
    </div>
  `,

  indirectTaxSim: (s) => `
    <div class="indirectTaxSim" data-tax-rate="${esc(s.taxRate ?? 10)}">
      <h2>${esc(s.title || 'Why indirect taxes can be regressive')}</h2>
      <div class="productChooser" role="group" aria-label="Choose product">
        ${(s.products || [
          ['Groceries', '🛒', 50],
          ['School shoes', '👟', 80],
          ['Smartphone', '📱', 600],
          ['Bicycle', '🚲', 900],
          ['Laptop', '💻', 1200],
        ]).map((product, i) => `
          <button type="button" class="productButton${i === 0 ? ' is-active' : ''}" data-price="${esc(product[2])}">
            <span class="productPic">${esc(product[1])}</span>
            <span class="productName">${esc(product[0])}</span>
            <span class="productPrice"></span>
          </button>
        `).join('')}
      </div>
      <div class="indirectProductSummary"></div>
      <div class="indirectViz">
        <div class="indirectHousehold" data-household="low">
          <div class="indirectName">Lower-income household</div>
          <div class="indirectMeta">Income: $20,000</div>
          <div class="indirectRows">
            <div><span>Indirect tax paid</span><b class="indirectTaxPaid"></b></div>
            <div><span>Tax as % of income</span><b class="indirectBurden"></b></div>
          </div>
          <div class="burdenMeter"><span></span></div>
        </div>
        <div class="indirectHousehold" data-household="high">
          <div class="indirectName">Higher-income household</div>
          <div class="indirectMeta">Income: $100,000</div>
          <div class="indirectRows">
            <div><span>Indirect tax paid</span><b class="indirectTaxPaid"></b></div>
            <div><span>Tax as % of income</span><b class="indirectBurden"></b></div>
          </div>
          <div class="burdenMeter"><span></span></div>
        </div>
      </div>
      <div class="indirectLegend">
        <span><i class="is-tax"></i>Tax as share of annual income</span>
      </div>
      <div class="indirectTakeaway"></div>
    </div>
  `,

  marketMechanismSim: (s) => `
    <div class="marketMechanismSim"
      data-default-demand="${esc(s.defaultDemand ?? 55)}"
      data-default-cost="${esc(s.defaultCost ?? 18)}">
      <h2>${esc(s.title || 'Price mechanism simulator')}</h2>
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      <div class="marketSimGrid">
        <div class="marketSimPanel">
          <label>
            <span>Consumer demand</span>
            <input class="marketDemandInput" type="range" min="10" max="100" step="5" />
          </label>
          <label>
            <span>Cost of production</span>
            <input class="marketCostInput" type="range" min="5" max="40" step="1" />
          </label>
          <div class="marketSimBars">
            <div><span>Demand</span><b class="marketDemandValue"></b><i><em class="marketDemandBar"></em></i></div>
            <div><span>Price signal</span><b class="marketPriceValue"></b><i><em class="marketPriceBar"></em></i></div>
            <div><span>Resources attracted</span><b class="marketResourceValue"></b><i><em class="marketResourceBar"></em></i></div>
          </div>
        </div>
        <div class="marketSimPanel marketSimResults">
          <div class="marketMetric">
            <span>Estimated market price</span>
            <b class="marketPriceMetric"></b>
          </div>
          <div class="marketMetric">
            <span>Profit per unit</span>
            <b class="marketProfitMetric"></b>
          </div>
          <div class="marketMetric">
            <span>Producer response</span>
            <b class="marketResponseMetric"></b>
          </div>
          <div class="marketChain"></div>
        </div>
      </div>
      <div class="marketTakeaway"></div>
    </div>
  `,

  marketFailureExternalitySim: (s) => `
    <div class="marketFailureExternalitySim"
      data-default-private-benefit="${esc(s.defaultPrivateBenefit ?? 56)}"
      data-default-private-cost="${esc(s.defaultPrivateCost ?? 44)}"
      data-default-spillover="${esc(s.defaultSpillover ?? 24)}">
      <h2>${esc(s.title || 'External cost simulator')}</h2>
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      <div class="failureSimGrid">
        <div class="failurePanel">
          <label>
            <span class="failureSpilloverLabel">External cost</span>
            <input class="failureSpillover" type="range" min="0" max="70" step="2" />
          </label>
          <div class="marketSimBars">
            <div><span>Private benefit</span><b class="failurePrivateBenefitValue"></b><i><em class="failurePrivateBenefitBar"></em></i></div>
            <div><span>Private cost</span><b class="failurePrivateCostValue"></b><i><em class="failurePrivateCostBar"></em></i></div>
            <div><span class="failureSocialLabel">Social cost</span><b class="failureSocialValue"></b><i><em class="failureSocialBar"></em></i></div>
          </div>
        </div>
        <div class="failurePanel failureResults">
          <div class="marketMetric">
            <span>Private cost</span>
            <b class="failurePrivateCostMetric"></b>
          </div>
          <div class="marketMetric">
            <span>External cost</span>
            <b class="failureExternalCostMetric"></b>
          </div>
          <div class="marketMetric">
            <span>Social cost</span>
            <b class="failureSocialCostMetric"></b>
          </div>
          <div class="marketChain"></div>
        </div>
      </div>
      <div class="marketTakeaway"></div>
    </div>
  `,

  publicGoodFreeRiderSim: (s) => `
    <div class="publicGoodFreeRiderSim"
      data-default-people="${esc(s.defaultPeople ?? 80)}"
      data-default-benefit="${esc(s.defaultBenefit ?? 12)}"
      data-default-paying="${esc(s.defaultPaying ?? 25)}"
      data-default-cost="${esc(s.defaultCost ?? 700)}">
      <h2>${esc(s.title || 'Public good free-rider problem')}</h2>
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      <div class="failureSimGrid">
        <div class="failurePanel">
          <label>
            <span>Share willing to pay</span>
            <input class="publicPaying" type="range" min="0" max="100" step="5" />
          </label>
          <div class="marketSimBars">
            <div><span>Willing to pay</span><b class="publicPayingValue"></b><i><em class="publicPayingBar"></em></i></div>
            <div><span>Private revenue</span><b class="publicRevenueBarValue"></b><i><em class="publicRevenueBar"></em></i></div>
            <div><span>Cost of provision</span><b class="publicCostBarValue"></b><i><em class="publicCostBar"></em></i></div>
          </div>
        </div>
        <div class="failurePanel failureResults">
          <div class="marketMetric">
            <span>Private revenue</span>
            <b class="publicRevenue"></b>
          </div>
          <div class="marketMetric">
            <span>Social benefit</span>
            <b class="publicSocialBenefit"></b>
          </div>
          <div class="marketMetric">
            <span>Private outcome</span>
            <b class="publicOutcome"></b>
          </div>
          <div class="marketChain"></div>
        </div>
      </div>
      <div class="marketTakeaway"></div>
    </div>
  `,

  monopolyPowerSim: (s) => `
    <div class="monopolyPowerSim"
      data-default-competition="${esc(s.defaultCompetition ?? 35)}">
      <h2>${esc(s.title || 'Monopoly power simulator')}</h2>
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      <div class="failureSimGrid">
        <div class="failurePanel">
          <label>
            <span>Competition level</span>
            <input class="monopolyCompetition" type="range" min="0" max="100" step="5" />
          </label>
          <div class="marketSimBars">
            <div><span>Competition</span><b class="monopolyCompetitionValue"></b><i><em class="monopolyCompetitionBar"></em></i></div>
            <div><span>Price</span><b class="monopolyPriceValue"></b><i><em class="monopolyPriceBar"></em></i></div>
            <div><span>Output</span><b class="monopolyOutputValue"></b><i><em class="monopolyOutputBar"></em></i></div>
          </div>
        </div>
        <div class="failurePanel failureResults">
          <div class="marketMetric">
            <span>Market power</span>
            <b class="monopolyPowerValue"></b>
          </div>
          <div class="marketMetric">
            <span>Price effect</span>
            <b class="monopolyImpact"></b>
          </div>
          <div class="marketMetric">
            <span>Output effect</span>
            <b class="monopolyExam"></b>
          </div>
          <div class="marketChain"></div>
        </div>
      </div>
      <div class="marketTakeaway"></div>
    </div>
  `,

  marketFailureScenarioGame: (s) => `
    <div class="marketFailureScenarioGame">
      <h2>${esc(s.title || 'Classify the market failure')}</h2>
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      <div class="marketGameTop">
        <div class="marketGameRound"></div>
        <div class="marketGameScore"></div>
      </div>
      <div class="marketGameScenario"></div>
      <div class="failureScenarioGrid">
        <button type="button" class="failureScenarioOption" data-choice="external-cost"><span class="marketOptionCode">EC</span><b>External cost</b></button>
        <button type="button" class="failureScenarioOption" data-choice="external-benefit"><span class="marketOptionCode">EB</span><b>External benefit</b></button>
        <button type="button" class="failureScenarioOption" data-choice="merit-good"><span class="marketOptionCode">MG</span><b>Merit good</b></button>
        <button type="button" class="failureScenarioOption" data-choice="demerit-good"><span class="marketOptionCode">DG</span><b>Demerit good</b></button>
        <button type="button" class="failureScenarioOption" data-choice="public-good"><span class="marketOptionCode">PG</span><b>Public good</b></button>
        <button type="button" class="failureScenarioOption" data-choice="inequality"><span class="marketOptionCode">IN</span><b>Inequality</b></button>
        <button type="button" class="failureScenarioOption" data-choice="monopoly"><span class="marketOptionCode">MO</span><b>Monopoly power</b></button>
      </div>
      <div class="marketGameFeedback"></div>
      <div class="marketGameChain">
        <span>Identify</span>
        <span>Explain cause</span>
        <span>Show consequence</span>
        <span>Judge market limit</span>
      </div>
      <button type="button" class="marketNextSignal">Next scenario</button>
    </div>
  `,

  marketSignalGame: (s) => `
    <div class="marketSignalGame">
      <h2>${esc(s.title || 'Resource allocation game')}</h2>
      ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ''}
      <div class="marketGameTop">
        <div class="marketGameRound"></div>
        <div class="marketGameScore"></div>
      </div>
      <div class="marketGameScenario"></div>
      <div class="marketGameGrid">
        <button type="button" class="marketOption" data-choice="bubble-tea">
          <span class="marketOptionCode">BT</span>
          <b>Bubble tea</b>
          <span>Move workers and capital into drinks.</span>
        </button>
        <button type="button" class="marketOption" data-choice="umbrellas">
          <span class="marketOptionCode">UM</span>
          <b>Umbrellas</b>
          <span>Move resources into rain products.</span>
        </button>
        <button type="button" class="marketOption" data-choice="e-bikes">
          <span class="marketOptionCode">EB</span>
          <b>Electric bikes</b>
          <span>Move resources into transport.</span>
        </button>
        <button type="button" class="marketOption" data-choice="tutoring">
          <span class="marketOptionCode">TU</span>
          <b>Tutoring</b>
          <span>Move resources into exam services.</span>
        </button>
      </div>
      <div class="marketGameFeedback"></div>
      <div class="marketGameChain">
        <span>Demand signal</span>
        <span>Price changes</span>
        <span>Profit incentive</span>
        <span>Resources move</span>
      </div>
      <button type="button" class="marketNextSignal">Next signal</button>
    </div>
  `,
};

/* ---------- Full slide renderer ---------- */
function renderSlide(meta, slide, idx, total) {
  if (slide.type === 'discussion') {
    const photo = slide.visual && typeof slide.visual === 'object' ? slide.visual : null;
    const photoSrc = photo?.src ? localImageSrc(photo.src) : '';
    const caption = photo?.caption || photo?.alt || '';
    const credit = photo?.credit || '';
    const promptLength = String(slide.question || '').length + String(slide.zh || '').length;
    const sizeClass = promptLength > 135 ? ' is-long' : promptLength > 100 ? ' is-medium' : '';
    return `
      <section class="slide is-discussion${sizeClass}" data-idx="${idx}"
               data-notes="${esc(slide.notes || 'Teacher cue: let students discuss the question before taking responses.')}">
        ${photoSrc ? `
          <img class="discussionBg"
               src="${esc(photoSrc)}"
               alt="${esc(photo.alt || '')}"
               loading="lazy"
               decoding="async" />` : ''}
        ${topline(slide, idx, total)}
        <div class="discussionContent">
          ${renderers.discussion({ ...slide, discussionAnswerIndex: idx })}
        </div>
        ${caption || credit ? `
          <div class="discussionCredit">
            ${caption ? `<span>${esc(caption)}</span>` : '<span></span>'}
            ${credit ? `<span>${esc(credit)}</span>` : ''}
          </div>` : ''}
        ${footer(meta, slide)}
      </section>
    `;
  }

  // Section transitions get a special wide layout
  if (slide.type === 'section') {
    const sectionVisual = IGCSE.renderVisual(slide.visual, `sec-${idx}`);
    return `
      <section class="slide is-section" data-idx="${idx}"
               data-notes="${esc(slide.notes || 'Section transition — pause and reset attention.')}">
        ${topline(slide, idx, total)}
        <div class="content is-section${sectionVisual ? '' : ' is-full'}">
          <div>
            <div class="sectionTitle">${esc(slide.title)}${slide.zhTitle ? `<span class="inlineZh">${esc(slide.zhTitle)}</span>` : ''}</div>
            ${slide.subtitle ? `<p class="lead">${esc(slide.subtitle)}</p>` : ''}
            ${sectionProgress(slide)}
          </div>
          ${sectionVisual ? `<aside class="visual">${sectionVisual}</aside>` : ''}
        </div>
        ${footer(meta, slide)}
      </section>
    `;
  }

  const isHero = slide.type === 'hero';
  const isFact = slide.type === 'fact';
  const typeClass = slide.type && !['hero', 'fact'].includes(slide.type)
    ? ` is-${String(slide.type).replace(/[^a-z0-9_-]/gi, '')}`
    : '';
  const sideBySideContrastTypes = new Set(['compare', 'split', 'systemCompare']);
  const visual = sideBySideContrastTypes.has(slide.type)
    ? ''
    : IGCSE.renderVisual(slide.visual, `viz-${idx}`);
  const r = renderers[slide.type];
  const renderSlide = {
    ...slide,
    ...(isFact ? { chinaCompareIndex: idx } : {}),
    sources: sourcesForSlide(meta, slide),
  };
  const body = r ? r(renderSlide) : `<div><h2>${esc(slide.title || '')}</h2></div>`;
  const slideSourceControl = renderSources(renderSlide.sources, 'sourceList slideSourceControl');

  return `
    <section class="slide${typeClass}${isHero ? ' is-hero' : ''}${isFact ? ' is-fact' : ''}" data-idx="${idx}"
             data-notes="${esc(slide.notes || 'Teacher cue: ask students to explain the mechanism before revealing any answer.')}">
      ${topline(slide, idx, total)}
      <div class="content${visual ? '' : ' is-full'}">
        <main>${body}</main>
        ${visual ? `<aside class="visual">${visual}</aside>` : ''}
      </div>
      ${slideSourceControl}
      ${footer(meta, slide)}
    </section>
  `;
}

/* ---------- Student print/reading view ---------- */
function isHandoutView() {
  const view = new URLSearchParams(location.search).get('view');
  return ['print', 'handout', 'student'].includes(String(view || '').toLowerCase());
}

function isQuizView() {
  const view = new URLSearchParams(location.search).get('view');
  return String(view || '').toLowerCase() === 'quiz';
}

function isFlashcardView() {
  const view = new URLSearchParams(location.search).get('view');
  return ['flashcards', 'cards', 'revision'].includes(String(view || '').toLowerCase());
}

function lessonViewUrl(view) {
  const url = new URL(location.href);
  if (view === 'handout') {
    url.searchParams.set('view', 'print');
    url.hash = '';
  } else if (view === 'quiz') {
    url.searchParams.set('view', 'quiz');
    url.hash = '';
  } else if (view === 'flashcards') {
    url.searchParams.set('view', 'flashcards');
    url.hash = '';
  } else {
    url.searchParams.delete('view');
  }
  return url.href;
}

function courseIndexUrl() {
  return new URL('../../../index.html#course-map', location.href).href;
}

function lessonStartUrl() {
  const url = new URL(location.href);
  url.searchParams.delete('view');
  url.hash = '1';
  return url.href;
}

function studentSelectorBaseUrl() {
  return String(
    window.IGCSE?.studentSelectorBaseUrl ||
    'https://randomizerselection.github.io/studentselector/'
  ).replace(/\/?$/, '/');
}

function loadStudentSelectorAsset(tagName, attrs) {
  return new Promise((resolve, reject) => {
    const selector = attrs.href
      ? `${tagName}[href="${attrs.href}"]`
      : `${tagName}[src="${attrs.src}"]`;
    const existing = document.querySelector(selector);
    if (existing) {
      resolve(existing);
      return;
    }

    const element = document.createElement(tagName);
    Object.entries(attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    element.addEventListener('load', () => resolve(element), { once: true });
    element.addEventListener('error', () => reject(new Error(`Could not load ${attrs.href || attrs.src}`)), { once: true });
    document.head.appendChild(element);
  });
}

let mountedStudentSelector = null;

function syncStudentSelectorButtons() {
  const isOpen = Boolean(mountedStudentSelector?.panel?.isConnected);
  document.querySelectorAll('[data-student-selector]').forEach((button) => {
    button.setAttribute('aria-pressed', isOpen ? 'true' : 'false');
  });
}

function closeStudentSelectorPanel() {
  try {
    mountedStudentSelector?.app?.destroy?.();
  } catch (error) {
    console.error(error);
  }
  mountedStudentSelector?.observer?.disconnect?.();
  mountedStudentSelector?.panel?.remove();
  mountedStudentSelector = null;
  document.body.classList.remove('is-student-selector-open');
  syncStudentSelectorButtons();
}

function selectorModalIsOpen(panel) {
  const modal = panel.querySelector('.selector-modal');
  return Boolean(modal && !modal.hidden && modal.getAttribute('hidden') === null);
}

function syncStudentSelectorStageMode(panel) {
  const currentName = panel.querySelector('[data-current-name]')?.textContent?.trim() || '';
  const hasOutcomes = Boolean(panel.querySelector('.selector-outcomes'));
  const hasModal = selectorModalIsOpen(panel);
  const looksIdle = !hasOutcomes && !hasModal && ['Ready', 'Select a class', ''].includes(currentName);

  const shouldOverlay =
    panel.dataset.selectorRunning === 'true' ||
    hasOutcomes ||
    (!looksIdle && Boolean(panel.querySelector('.selector-stage')));

  panel.classList.toggle('is-stage-overlay', shouldOverlay);
}

function attachStudentSelectorStageObserver(panel) {
  panel.addEventListener('click', (event) => {
    const trigger = event.target?.closest?.('[data-action], button');
    const action = trigger?.dataset?.action;
    const label = trigger?.textContent?.trim() || '';
    if (action === 'start' || /^start selection$/i.test(label)) {
      panel.dataset.selectorRunning = 'true';
      panel.classList.add('is-stage-overlay');
    } else if (['return-dock', 'reset', 'class'].includes(action)) {
      panel.dataset.selectorRunning = 'false';
      panel.classList.remove('is-stage-overlay');
    }
  }, true);

  panel.addEventListener('change', (event) => {
    if (event.target?.closest?.('[data-action="class"]')) {
      panel.dataset.selectorRunning = 'false';
      panel.classList.remove('is-stage-overlay');
    }
  }, true);

  const observer = new MutationObserver(() => syncStudentSelectorStageMode(panel));
  observer.observe(panel, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['hidden', 'class', 'style'],
    characterData: true,
  });
  panel.dataset.selectorRunning = 'false';
  syncStudentSelectorStageMode(panel);
  return observer;
}

async function openStudentSelector() {
  const baseUrl = studentSelectorBaseUrl();
  if (mountedStudentSelector?.panel?.isConnected) {
    mountedStudentSelector.panel.focus({ preventScroll: true });
    return;
  }

  try {
    if (!window.StudentSelector?.open) {
      await loadStudentSelectorAsset('script', {
        src: new URL('selector.js', baseUrl).href,
      });
    }
    if (window.StudentSelector?.mount) {
      const panel = document.createElement('aside');
      panel.className = 'studentSelectorSidePanel';
      panel.setAttribute('aria-label', 'Student selector');
      panel.setAttribute('tabindex', '-1');
      panel.innerHTML = `
        <button type="button" class="studentSelectorPanelClose" data-student-selector-close aria-label="Close student selector">×</button>
        <div class="studentSelectorMount"></div>
      `;
      document.body.appendChild(panel);

      const app = window.StudentSelector.mount(panel.querySelector('.studentSelectorMount'), {
        basePath: baseUrl,
        skipStyles: true,
        onClose: closeStudentSelectorPanel,
      });
      panel.querySelector('[data-student-selector-close]')?.addEventListener('click', closeStudentSelectorPanel);
      const observer = attachStudentSelectorStageObserver(panel);
      mountedStudentSelector = { panel, app, observer };
      document.body.classList.add('is-student-selector-open');
      syncStudentSelectorButtons();
      panel.focus({ preventScroll: true });
      return;
    }
    throw new Error('Student selector API was not available after loading.');
  } catch (error) {
    console.error(error);
    closeStudentSelectorPanel();
    window.open(baseUrl, '_blank', 'noopener');
  }
}

function toggleStudentSelector() {
  if (mountedStudentSelector?.panel?.isConnected) {
    closeStudentSelectorPanel();
    return;
  }
  openStudentSelector();
}

function mountLessonModeSwitch(mode, meta = {}) {
  document.querySelector('.lessonModeSwitch')?.remove();
  const nav = document.createElement('nav');
  nav.className = 'lessonModeSwitch';
  nav.setAttribute('aria-label', 'Lesson navigation');
  const currentMode = ['handout', 'quiz', 'flashcards'].includes(mode) ? mode : 'slides';
  const allowedViews = Array.isArray(meta.availableViews) && meta.availableViews.length
    ? new Set(meta.availableViews)
    : null;
  const modeTabs = [
    ['slides', 'Slides'],
    ['handout', 'Handout'],
    ['quiz', 'Quiz'],
    ['flashcards', 'Flashcards'],
  ].filter(([view]) => !allowedViews || allowedViews.has(view)).map(([view, label]) => {
    const active = currentMode === view;
    return `
      <a
        class="lessonModeTab${active ? ' is-active' : ''}"
        href="${esc(lessonViewUrl(view))}"
        ${active ? 'aria-current="page"' : ''}
      >${label}</a>
    `;
  }).join('');

  nav.innerHTML = `
    <div class="lessonModeTabs" aria-label="Lesson modes">
      ${modeTabs}
    </div>
    ${currentMode === 'slides' ? '<button type="button" class="lessonModeButton lessonModeButton--selector lessonModeSelectorToggle" data-student-selector aria-label="Student selector" aria-pressed="false">Selector</button>' : ''}
    <details class="lessonModeMenu">
      <summary class="lessonModeMenuButton">More</summary>
      <div class="lessonModeUtilities" aria-label="Lesson actions">
        <a class="lessonModeButton" href="${esc(courseIndexUrl())}">Library index</a>
        <a class="lessonModeButton" href="${esc(lessonStartUrl())}">Lesson start</a>
        ${currentMode === 'handout' ? '<button type="button" class="lessonModeButton" data-print-lesson>Print</button>' : ''}
        ${currentMode !== 'slides' ? '<button type="button" class="lessonModeButton lessonModeButton--selector" data-student-selector aria-pressed="false">Student selector</button>' : ''}
      </div>
    </details>
  `;
  nav.querySelector('[data-print-lesson]')?.addEventListener('click', () => window.print());
  nav.querySelector('[data-student-selector]')?.addEventListener('click', (event) => {
    event.currentTarget.blur();
    toggleStudentSelector();
  });
  document.body.appendChild(nav);
  syncStudentSelectorButtons();
}

function handoutTitle(slide) {
  return esc(slide.title || slide.eyebrow || '');
}

function handoutParagraph(text, className = '') {
  return text ? `<p${className ? ` class="${className}"` : ''}>${esc(text)}</p>` : '';
}

function handoutList(items = [], ordered = false) {
  if (!items.length) return '';
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag}>${items.map((item) => `<li>${esc(item)}</li>`).join('')}</${tag}>`;
}

function handoutPairs(items = [], className = 'handoutPairs') {
  if (!items.length) return '';
  return `
    <div class="${className}">
      ${items.map((item) => {
        const title = Array.isArray(item) ? item[0] : item?.title;
        const detail = Array.isArray(item) ? item[1] : (item?.detail || item?.body || item?.definition);
        const number = Array.isArray(item) ? item[2] : item?.number;
        const definitionZh = Array.isArray(item) ? '' : item?.definitionZh;
        const examples = Array.isArray(item) ? [] : (item?.examples || []);
        return `
          <div>
            ${number ? `<span>${esc(number)}</span>` : ''}
            <b>${esc(title || '')}</b>
            ${detail ? `<p>${esc(detail)}</p>` : ''}
            ${definitionZh ? `<p class="handoutDefinitionZh">${esc(definitionZh)}</p>` : ''}
            ${examples.length ? handoutPairs(examples, 'handoutExamples') : ''}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function handoutSteps(items = []) {
  if (!items.length) return '';
  return `
    <ol class="handoutSteps">
      ${items.map((item) => {
        const label = Array.isArray(item) ? item[0] : '';
        const detail = Array.isArray(item) ? item[1] : item;
        return `<li>${label ? `<b>${esc(label)}</b>` : ''}${esc(detail || '')}</li>`;
      }).join('')}
    </ol>
  `;
}

function handoutFlow(nodes = []) {
  const arr = Array.isArray(nodes[0]) ? nodes[0] : nodes;
  if (!arr?.length) return '';
  return `
    <ol class="handoutFlow">
      ${arr.map((rawNode) => {
        const node = normaliseFlowNode(rawNode);
        return `
          <li>
            ${esc(node.text || '')}
            ${node.zh ? `<p lang="zh-Hans">${esc(node.zh)}</p>` : ''}
          </li>
        `;
      }).join('')}
    </ol>
  `;
}

function handoutChoices(choices = []) {
  if (!choices.length) return '';
  return `
    <ol class="handoutChoices" type="A">
      ${choices.map((choice) => `<li>${esc(choice)}</li>`).join('')}
    </ol>
  `;
}

function handoutSources() {
  return '';
}

function handoutBlock(slide, body, modifier = '') {
  if (!body.trim()) return '';
  return `
    <article class="handoutBlock${modifier ? ` ${modifier}` : ''}">
      ${slide.title ? `<h3>${handoutTitle(slide)}</h3>` : ''}
      ${body}
    </article>
  `;
}

const handoutContentTypes = new Set([
  'cards',
  'compare',
  'flow',
  'paperExtract',
  'socialEffectsVenn',
  'split',
  'systemCompare',
  'term',
  'taxRateDiagramCompare',
]);

function shouldIncludeHandoutSlide(slide) {
  return handoutContentTypes.has(slide.type);
}

function renderHandoutBlock(slide) {
  switch (slide.type) {
    case 'paperExtract': {
      const showQuestion = slide.question && !titleContainsQuestion(slide.title, slide.question);
      const visibleQuestions = (slide.questions || []).filter((question) => !titleContainsQuestion(slide.title, question));
      return handoutBlock(slide, `
        ${handoutParagraph(slide.lead)}
        ${(slide.paragraphs || []).map((paragraph) => handoutParagraph(paragraph)).join('')}
        ${showQuestion ? `
          <div class="handoutPaperQuestion">
            <b>Question</b>
            ${handoutParagraph(slide.question)}
          </div>` : ''}
        ${visibleQuestions.length ? `
          <div class="handoutPaperQuestion">
            <b>Questions</b>
            ${handoutList(visibleQuestions, true)}
          </div>` : ''}
        ${handoutParagraph(slide.source, 'handoutNote')}
        ${handoutSources(slide.sources)}
      `, 'is-paper-extract');
    }

    case 'cards':
      return handoutBlock(slide, `
        ${handoutParagraph(slide.lead)}
        ${handoutPairs(slide.cards || [])}
        ${handoutParagraph(slide.footer, 'handoutNote')}
        ${handoutSources(slide.sources)}
      `, 'is-key-points');

    case 'term':
      return handoutBlock(slide, `
        ${handoutParagraph(slide.lead)}
        <div class="handoutDefinition">
          ${slide.term ? `<b>${esc(slide.term)}</b>` : ''}
          ${handoutParagraph(slide.definition)}
          ${handoutParagraph(slide.definitionZh, 'handoutDefinitionZh')}
        </div>
        ${slide.formula ? `<p class="handoutFormula">${esc(slide.formula)}</p>` : ''}
        ${handoutPairs(slide.examples || [], 'handoutExamples')}
        ${handoutSources(slide.sources)}
      `, 'is-definition');

    case 'compare':
    case 'split':
      return handoutBlock(slide, `
        ${handoutParagraph(slide.question)}
        ${slide.term ? `
          <div class="handoutDefinition">
            <b>${esc(slide.term)}</b>
            ${handoutParagraph(slide.definition)}
          </div>` : ''}
        <div class="handoutColumns">
          <section>
            <h4>${esc(slide.leftTitle || 'Left')}</h4>
            ${handoutList(slide.left || [])}
          </section>
          <section>
            <h4>${esc(slide.rightTitle || 'Right')}</h4>
            ${handoutList(slide.right || [])}
          </section>
        </div>
        ${handoutParagraph(slide.prompt || slide.divider, 'handoutNote')}
        ${handoutSources(slide.sources)}
      `, 'is-compare');

    case 'flow':
      return handoutBlock(slide, `
        ${handoutParagraph(slide.question)}
        ${handoutFlow(slide.nodes || [])}
        ${handoutParagraph(slide.prompt || slide.footer, 'handoutNote')}
        ${handoutSources(slide.sources)}
      `, 'is-flow');

    case 'socialEffectsVenn':
      return handoutBlock(slide, `
        ${handoutParagraph(slide.lead)}
        <div class="handoutColumns">
          ${['costs', 'benefits'].map((key) => {
            const item = slide[key] || {};
            return `
              <section>
                <h4>${esc(item.title || '')}</h4>
                ${handoutList([
                  `${item.private || 'Private'}: ${item.privateNote || ''}`,
                  `${item.external || 'External'}: ${item.externalNote || ''}`,
                  item.formula || '',
                ].filter(Boolean))}
              </section>
            `;
          }).join('')}
        </div>
        ${handoutParagraph(slide.prompt, 'handoutNote')}
        ${handoutSources(slide.sources)}
      `, 'is-compare');

    case 'systemCompare':
      return handoutBlock(slide, `
        ${handoutParagraph(slide.lead)}
        <div class="handoutColumns">
          ${(slide.systems || []).map((system) => `
            <section>
              <h4>${esc(system.title || '')}${system.zhTitle ? ` <span>${esc(system.zhTitle)}</span>` : ''}</h4>
              ${handoutList(system.points || [])}
            </section>
          `).join('')}
        </div>
        ${handoutParagraph(slide.prompt, 'handoutNote')}
        ${handoutSources(slide.sources)}
      `, 'is-compare');

    case 'taxRateDiagramCompare':
      return handoutBlock(slide, `
        ${handoutParagraph(slide.lead)}
        ${handoutPairs((slide.diagrams || []).map((diagram) => ({
          title: diagram.title,
          body: diagram.note,
        })))}
        ${handoutParagraph(slide.prompt, 'handoutNote')}
        ${handoutSources(slide.sources)}
      `, 'is-key-points');

    default:
      return '';
  }
}

function renderHandoutSections(slides) {
  const sections = [];
  let current = { title: 'Key content', blocks: [] };

  slides.forEach((slide) => {
    if (slide.type === 'section') {
      if (current.blocks.length) sections.push(current);
      current = {
        title: slide.title || 'Section',
        subtitle: slide.subtitle || '',
        blocks: [],
      };
      return;
    }

    if (!shouldIncludeHandoutSlide(slide)) return;
    const block = renderHandoutBlock(slide);
    if (block) current.blocks.push(block);
  });

  if (current.blocks.length) sections.push(current);

  if (!sections.length) {
    return `
      <section class="handoutSection">
        <h2>Key content</h2>
        <p class="handoutSectionLead">This lesson does not yet have content marked for the student handout.</p>
      </section>
    `;
  }

  return sections.map((section, i) => `
    <section class="handoutSection">
      <div class="handoutSectionHeader">
        <span>${String(i + 1).padStart(2, '0')}</span>
        <h2>${esc(section.title)}</h2>
      </div>
      ${section.subtitle ? `<p class="handoutSectionLead">${esc(section.subtitle)}</p>` : ''}
      <div class="handoutSectionBody">
        ${section.blocks.join('')}
      </div>
    </section>
  `).join('');
}

function mountHandoutLesson(meta, slides, mountEl) {
  document.body.classList.add('is-handout-mode');
  document.body.classList.remove('is-quiz-mode');
  document.body.classList.remove('is-flashcard-mode');
  if (meta.title) document.title = `${meta.lessonLabel || meta.title} - Student print view`;
  mountLessonModeSwitch('handout', meta);

  mountEl.className = 'handoutDeck';
  mountEl.removeAttribute('aria-live');
  const sourcedSlides = slides.map((slide) => ({
    ...slide,
    sources: sourcesForSlide(meta, slide),
  }));
  mountEl.innerHTML = `
    <header class="handoutHero">
      <div class="handoutKicker">${esc(meta.unit || meta.courseLabel || 'IGCSE Economics Lesson Library')}</div>
      <h1>${esc(meta.lessonLabel || meta.title || 'Lesson handout')}</h1>
      <p>${esc(meta.code ? `${meta.code} - key content handout` : 'Key content handout')}</p>
    </header>
    <div class="handoutDocument" aria-label="Printable lesson content">
      ${renderHandoutSections(sourcedSlides)}
    </div>
  `;
}

/* ---------- Partial reveal helpers ---------- */
const partialSelectors = [
  '.content main > div > .lead',
  '.content main > div > .termBox',
  '.content main > div > .formula',
  '.content main > div > .choices > .choice',
  '.content main > div > .cardgrid > .card',
  '.content main > div > .splitCols > .card',
  '.content main > div > .flowRow > .flowChip',
  '.content main > div > .answerBox',
  '.content main > div > .steps > .step',
  '.content main > div > .prompt',
  '.content.is-section > div > .lead',
].join(',');

function getPartialSelectors(meta, slide) {
  const config = slide.partialReview;
  if (slide.type === 'quiz') return '';
  if (config === false) return '';
  if (slide.type === 'peerTask' && slide.taskType === 'missingSentence') return '';
  if (slide.type === 'peerTask') return '.content main > div .peerTaskSamples > .choice';
  if (Array.isArray(config)) return config.map((selector) => `.content main > div ${selector}`).join(',');
  if (slide.type === 'term') return '.content main > div > .definitionTermNotes > .definitionTermNote';
  if (slide.type === 'hero' && config !== true) return '';
  return (config || meta.partialReview) ? partialSelectors : '';
}

function setupPartialReview(slideEls, slides, meta) {
  slideEls.forEach((el, i) => {
    const selectors = getPartialSelectors(meta, slides[i]);
    if (!selectors) return;
    const items = [...el.querySelectorAll(selectors)];
    if (!items.length) return;
    el.classList.add('has-partials');
    items.forEach((item) => {
      item.classList.add('partial-item');
      item.setAttribute('aria-hidden', 'true');
    });
  });
}

const QUESTION_TITLE_SELECTOR = '.examBlock h2, .paperExtractBlock h2, .modelAnswerBlock h2';

function fitQuestionTitle(title) {
  if (!title || !title.isConnected || title.offsetParent === null) return;
  title.style.removeProperty('--question-title-size');

  const baseSize = Number.parseFloat(window.getComputedStyle(title).fontSize) || 38;
  const minSize = Math.max(18, Math.min(24, baseSize * 0.62));
  const maxLines = window.matchMedia('(max-width: 760px)').matches ? 4 : 2;

  for (let size = baseSize; size >= minSize; size -= 1) {
    title.style.setProperty('--question-title-size', `${size}px`);
    const style = window.getComputedStyle(title);
    const lineHeight = Number.parseFloat(style.lineHeight) || size * 1.13;
    const fitsWidth = title.scrollWidth <= title.clientWidth + 1;
    const fitsHeight = title.scrollHeight <= (lineHeight * maxLines) + 2;
    if (fitsWidth && fitsHeight) return;
  }

  title.style.setProperty('--question-title-size', `${minSize}px`);
}

function fitActiveQuestionTitles(root = document) {
  const activeSlide = root.querySelector?.('.slide.is-active') || root;
  activeSlide.querySelectorAll?.(QUESTION_TITLE_SELECTOR).forEach(fitQuestionTitle);
}

/* ---------- Mount & navigation ---------- */
IGCSE.mountLesson = function(lesson, mountEl = document.getElementById('deck')) {
  if (!lesson || !Array.isArray(lesson.slides)) {
    console.error('mountLesson: lesson.slides is required');
    return;
  }
  const { meta = {}, slides } = lesson;
  const sectionTitles = slides
    .filter((slide) => slide.type === 'section')
    .map((slide) => slide.title || slide.eyebrow || 'Section');
  let sectionStep = 0;
  const renderSlides = slides.map((slide) => {
    if (slide.type !== 'section') return slide;
    sectionStep += 1;
    return {
      ...slide,
      _sectionStep: sectionStep,
      _sectionTotal: sectionTitles.length,
      _sectionTitles: sectionTitles,
    };
  });

  // Document title
  if (meta.title) document.title = meta.title;

  if (isHandoutView()) {
    mountHandoutLesson(meta, renderSlides, mountEl);
    return { mode: 'handout' };
  }

  if (isQuizView()) {
    mountLessonModeSwitch('quiz', meta);
    if (typeof IGCSE.mountQuizLesson === 'function') {
      return IGCSE.mountQuizLesson(lesson, IGCSE.quiz, mountEl);
    }
    console.error('mountLesson: quiz runtime is required for quiz view');
    return { mode: 'quiz' };
  }

  if (isFlashcardView()) {
    mountLessonModeSwitch('flashcards', meta);
    if (typeof IGCSE.mountFlashcardLesson === 'function') {
      return IGCSE.mountFlashcardLesson(lesson, IGCSE.flashcards, mountEl);
    }
    console.error('mountLesson: flashcard runtime is required for flashcard view');
    return { mode: 'flashcards' };
  }

  document.body.classList.remove('is-quiz-mode');
  document.body.classList.remove('is-handout-mode');
  document.body.classList.remove('is-flashcard-mode');
  mountLessonModeSwitch('slides', meta);

  // Render
  mountEl.innerHTML = renderSlides
    .map((s, i) => renderSlide(meta, s, i, slides.length))
    .join('');

  const slideEls = [...mountEl.querySelectorAll('.slide')];
  const progressBar = document.querySelector('#progress > span');
  const notesEl = document.getElementById('notes');
  const overviewEl = document.getElementById('overview');

  let idx = 0;
  const partialProgress = slides.map(() => 0);
  const chinaDialog = mountChinaComparisonDialog();
  const discussionDialog = mountDiscussionAnswerDialog();

  setupPartialReview(slideEls, slides, meta);
  setupTaxSimulators(mountEl);
  setupChinaIncomeTaxSimulators(mountEl);
  setupIndirectTaxSimulators(mountEl);
  setupMarketMechanismSimulators(mountEl);
  setupMarketFailureExternalitySimulators(mountEl);
  setupPublicGoodFreeRiderSimulators(mountEl);
  setupMonopolyPowerSimulators(mountEl);
  setupMarketFailureScenarioGames(mountEl);
  setupMarketSignalGames(mountEl);
  setupQuizChoices(mountEl);
  setupFillBlanks(mountEl);
  document.fonts?.ready?.then(() => fitActiveQuestionTitles(mountEl)).catch(() => {});

  function syncPartials(n) {
    const items = [...slideEls[n].querySelectorAll('.partial-item')];
    items.forEach((item, i) => {
      const isVisible = i < partialProgress[n];
      item.classList.toggle('is-visible', isVisible);
      item.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
    });
  }

  function revealNextPartial() {
    const total = slideEls[idx].querySelectorAll('.partial-item').length;
    if (partialProgress[idx] >= total) return false;
    partialProgress[idx] += 1;
    syncPartials(idx);
    return true;
  }

  function hidePreviousPartial() {
    if (partialProgress[idx] <= 0) return false;
    partialProgress[idx] -= 1;
    syncPartials(idx);
    return true;
  }

  function show(n) {
    closeChinaComparison();
    idx = Math.max(0, Math.min(slides.length - 1, n));
    slideEls.forEach((el, i) => el.classList.toggle('is-active', i === idx));
    mountEl.querySelectorAll('[data-slide-jump]').forEach((input, i) => {
      input.value = String(i + 1);
    });
    syncPartials(idx);
    if (progressBar) progressBar.style.width = (((idx + 1) / slides.length) * 100) + '%';
    if (notesEl) notesEl.textContent = slideEls[idx].dataset.notes || '';
    fitActiveQuestionTitles(mountEl);
    requestAnimationFrame(() => fitActiveQuestionTitles(mountEl));
    if (location.hash !== `#${idx + 1}`) {
      history.replaceState(null, '', `#${idx + 1}`);
    }
  }

  function showFromHash() {
    const fromHash = parseInt(location.hash.replace('#', ''), 10);
    if (Number.isFinite(fromHash)) show(fromHash - 1);
  }

  function toggleNotes() {
    if (notesEl) notesEl.classList.toggle('is-visible');
  }

  function buildOverview() {
    if (!overviewEl) return;
    overviewEl.innerHTML = `
      <h2>${esc(meta.title || 'Lesson overview')}</h2>
      <div class="thumbGrid">
        ${slides.map((s, i) => `
          <button class="thumb" data-jump="${i}">
            <span class="n">${pad(i + 1)} · ${esc(s.eyebrow || s.type)}</span>
            <span class="t">${esc((s.title || '').replace(/\n/g, ' '))}</span>
          </button>
        `).join('')}
      </div>
    `;
    overviewEl.querySelectorAll('.thumb').forEach((b) => {
      b.addEventListener('click', () => {
        const n = parseInt(b.dataset.jump, 10);
        overviewEl.classList.remove('is-visible');
        show(n);
      });
    });
  }

  function toggleOverview() {
    if (!overviewEl) return;
    if (!overviewEl.dataset.built) { buildOverview(); overviewEl.dataset.built = '1'; }
    overviewEl.classList.toggle('is-visible');
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  }

  function applySlideJump(select) {
    if (!select) return;
    const requested = Number.parseInt(select.value, 10);
    if (!Number.isFinite(requested)) {
      select.value = String(idx + 1);
      return;
    }
    show(Math.max(1, Math.min(slides.length, requested)) - 1);
  }

  function openChinaComparison(slideIndex) {
    const fact = slides[slideIndex]?.facts?.china;
    if (!fact || !chinaDialog) return;
    chinaDialog.querySelector('.chinaDialogHeader').innerHTML = `
      ${fact.flag ? `<span class="factFlag">${esc(fact.flag)}</span>` : ''}
      <span>${esc(fact.country || 'China')} comparison</span>
    `;
    const { context, question } = splitFactText(fact);
    chinaDialog.querySelector('.chinaDialogText').innerHTML = `
      ${context ? `<p class="factContext">${esc(context)}</p>` : ''}
      ${question ? `<p class="factQuestion">${esc(question)}</p>` : ''}
    `;
    const zhEl = chinaDialog.querySelector('.chinaDialogZh');
    zhEl.textContent = fact.zh || '';
    zhEl.hidden = !fact.zh;
    const sourceEl = chinaDialog.querySelector('.chinaDialogSource');
    sourceEl.textContent = fact.source || '';
    sourceEl.hidden = !fact.source;
    chinaDialog.hidden = false;
    chinaDialog.classList.add('is-visible');
    chinaDialog.setAttribute('aria-hidden', 'false');
    chinaDialog.querySelector('.chinaDialogClose')?.focus({ preventScroll: true });
  }

  function closeChinaComparison() {
    if (!chinaDialog || chinaDialog.hidden) return false;
    chinaDialog.classList.remove('is-visible');
    chinaDialog.setAttribute('aria-hidden', 'true');
    chinaDialog.hidden = true;
    return true;
  }

  function openDiscussionAnswer(slideIndex) {
    const slide = slides[slideIndex];
    if (!slide?.answer || !discussionDialog) return;
    discussionDialog.querySelector('.discussionAnswerText').textContent = slide.answer || '';
    const zhEl = discussionDialog.querySelector('.discussionAnswerZh');
    zhEl.textContent = slide.answerZh || '';
    zhEl.hidden = !slide.answerZh;
    discussionDialog.hidden = false;
    discussionDialog.classList.add('is-visible');
    discussionDialog.setAttribute('aria-hidden', 'false');
    discussionDialog.querySelector('.discussionAnswerClose')?.focus({ preventScroll: true });
  }

  function openFactAnswer(panel) {
    if (!panel || !discussionDialog) return;
    const answer = panel.dataset.answer || '';
    if (!answer) return;
    discussionDialog.querySelector('.discussionAnswerText').textContent = answer;
    const zhEl = discussionDialog.querySelector('.discussionAnswerZh');
    zhEl.textContent = panel.dataset.answerZh || '';
    zhEl.hidden = !panel.dataset.answerZh;
    discussionDialog.hidden = false;
    discussionDialog.classList.add('is-visible');
    discussionDialog.setAttribute('aria-hidden', 'false');
    discussionDialog.querySelector('.discussionAnswerClose')?.focus({ preventScroll: true });
  }

  function closeDiscussionAnswer() {
    if (!discussionDialog || discussionDialog.hidden) return false;
    discussionDialog.classList.remove('is-visible');
    discussionDialog.setAttribute('aria-hidden', 'true');
    discussionDialog.hidden = true;
    return true;
  }

  function mountChinaComparisonDialog() {
    document.querySelector('.chinaCompareDialog')?.remove();
    const dialog = document.createElement('aside');
    dialog.className = 'chinaCompareDialog';
    dialog.hidden = true;
    dialog.setAttribute('aria-hidden', 'true');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'China comparison');
    dialog.innerHTML = `
      <div class="chinaDialogPanel">
        <button type="button" class="chinaDialogClose" aria-label="Close China comparison">×</button>
        <div class="chinaDialogHeader"></div>
        <p class="chinaDialogText"></p>
        <p class="chinaDialogZh"></p>
        <div class="chinaDialogSource"></div>
      </div>
    `;
    dialog.addEventListener('click', (event) => event.stopPropagation());
    dialog.querySelector('.chinaDialogClose')?.addEventListener('click', (event) => {
      event.stopPropagation();
      closeChinaComparison();
    });
    document.body.appendChild(dialog);
    return dialog;
  }

  function mountDiscussionAnswerDialog() {
    document.querySelector('.discussionAnswerDialog')?.remove();
    const dialog = document.createElement('aside');
    dialog.className = 'discussionAnswerDialog';
    dialog.hidden = true;
    dialog.setAttribute('aria-hidden', 'true');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Possible answer');
    dialog.innerHTML = `
      <div class="discussionAnswerPanel">
        <button type="button" class="discussionAnswerClose" aria-label="Close possible answer">×</button>
        <div class="discussionAnswerHeader">Possible answer</div>
        <p class="discussionAnswerText"></p>
        <p class="discussionAnswerZh"></p>
      </div>
    `;
    dialog.addEventListener('click', (event) => event.stopPropagation());
    dialog.querySelector('.discussionAnswerClose')?.addEventListener('click', (event) => {
      event.stopPropagation();
      closeDiscussionAnswer();
    });
    document.body.appendChild(dialog);
    return dialog;
  }

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.selector-overlay-host, .studentSelectorSidePanel')) return;
    // Don't hijack keys when typing somewhere
    const target = e.target?.closest ? e.target : null;
    if (target?.closest('input, textarea, [contenteditable]')) return;
    const k = e.key;
    if (chinaDialog && !chinaDialog.hidden) {
      if (['Escape', 'ArrowLeft', 'PageUp'].includes(k)) {
        e.preventDefault();
        closeChinaComparison();
      } else if (['ArrowRight', 'PageDown', ' '].includes(k)) {
        e.preventDefault();
      }
      return;
    }
    if (discussionDialog && !discussionDialog.hidden) {
      if (['Escape', 'ArrowLeft', 'PageUp'].includes(k)) {
        e.preventDefault();
        closeDiscussionAnswer();
      } else if (['ArrowRight', 'PageDown', ' '].includes(k)) {
        e.preventDefault();
      }
      return;
    }
    if (['ArrowRight', 'PageDown', ' '].includes(k)) {
      e.preventDefault();
      if (revealNextPartial()) return;
      show(idx + 1);
    }
    else if (['ArrowLeft', 'PageUp'].includes(k)) {
      e.preventDefault();
      if (!hidePreviousPartial()) show(idx - 1);
    }
    else if (k === 'Home')                            { e.preventDefault(); show(0); }
    else if (k === 'End')                             { e.preventDefault(); show(slides.length - 1); }
    else if (k.toLowerCase() === 'n')                 { toggleNotes(); }
    else if (k.toLowerCase() === 'o')                 { toggleOverview(); }
    else if (k.toLowerCase() === 'f')                 { toggleFullscreen(); }
    else if (k === 'Escape')                          { overviewEl?.classList.remove('is-visible'); }
  });

  mountEl.addEventListener('change', (event) => {
    const select = event.target?.closest?.('[data-slide-jump]');
    if (select) {
      applySlideJump(select);
    }
  });

  mountEl.querySelectorAll('.chinaCompareButton').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const slideIndex = Number.parseInt(button.dataset.chinaCompare || '', 10);
      if (Number.isFinite(slideIndex)) openChinaComparison(slideIndex);
    });
  });

  mountEl.querySelectorAll('.factAnswerButton').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const block = button.closest('.factBlock');
      openFactAnswer(block?.querySelector('.factPanel.is-active') || block?.querySelector('.factPanel'));
    });
  });

  mountEl.querySelectorAll('.factSwitchButton').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const block = button.closest('.factBlock');
      const targetSide = button.dataset.factTarget || 'example';
      block?.querySelectorAll('.factSwitchButton').forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      block?.querySelectorAll('.factPanel').forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.factSide === targetSide);
      });
    });
  });

  mountEl.querySelectorAll('.discussionAnswerButton:not(.factAnswerButton)').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const slideIndex = Number.parseInt(button.dataset.discussionAnswer || '', 10);
      if (Number.isFinite(slideIndex)) openDiscussionAnswer(slideIndex);
    });
  });

  // Click-to-advance (but not on overview / notes / controls)
  mountEl.addEventListener('click', (e) => {
    const target = e.target?.closest ? e.target : null;
    if (target?.closest('.thumb, #notes, .help, .slideJumpControl, button, a, input, label, select, details, summary, .sourceList, .sourcePanel, .taxSim, .chinaTaxSim, .indirectTaxSim, .marketMechanismSim, .marketFailureExternalitySim, .publicGoodFreeRiderSim, .monopolyPowerSim, .marketFailureScenarioGame, .marketSignalGame')) return;
    if (revealNextPartial()) return;
    show(idx + 1);
  });

  // Touch-swipe
  let touchX = null;
  mountEl.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  mountEl.addEventListener('touchend', (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 60) {
      if (dx < 0) {
        if (revealNextPartial()) return;
        show(idx + 1);
      } else if (!hidePreviousPartial()) {
        show(idx - 1);
      }
    }
    touchX = null;
  });

  // Initial
  const fromHash = parseInt(location.hash.replace('#', ''), 10);
  show(Number.isFinite(fromHash) ? fromHash - 1 : 0);
  window.addEventListener('hashchange', showFromHash);
  window.addEventListener('resize', () => fitActiveQuestionTitles(mountEl));

  return { show, toggleNotes, toggleOverview };
}

function setupQuizChoices(root) {
  root.querySelectorAll('.choices.is-mcq').forEach((list) => {
    const choices = [...list.querySelectorAll('.choice')];
    const correctChoice = choices.find((choice) => choice.dataset.correct === 'true');
    choices.forEach((choice) => {
      choice.addEventListener('click', () => {
        choices.forEach((item) => {
          item.classList.remove('is-selected');
          item.classList.remove('is-correct', 'is-incorrect');
          item.setAttribute('aria-pressed', 'false');
        });
        choice.classList.add('is-selected');
        choice.setAttribute('aria-pressed', 'true');
        if (correctChoice) {
          correctChoice.classList.add('is-correct');
          if (choice !== correctChoice) choice.classList.add('is-incorrect');
        }
      });
    });
  });
}

function setupFillBlanks(root) {
  root.querySelectorAll('.blankAnswer').forEach((blank) => {
    blank.addEventListener('click', (event) => {
      event.stopPropagation();
      blank.classList.toggle('is-revealed');
      blank.setAttribute('aria-expanded', blank.classList.contains('is-revealed') ? 'true' : 'false');
    });
  });
}

function setupTaxSimulators(root) {
  const sims = [...root.querySelectorAll('.taxSim')];
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const rates = {
    progressive: { low: 0.10, high: 0.30 },
    proportional: { low: 0.20, high: 0.20 },
    regressive: { low: 0.30, high: 0.10 },
  };

  const taxFor = (income, mode, household) => {
    const rate = rates[mode]?.[household] ?? 0;
    return income * rate;
  };

  const labelFor = (mode) => ({
    progressive: 'Progressive: the higher-income household pays a higher percentage.',
    proportional: 'Proportional: both households pay the same percentage.',
    regressive: 'Regressive: the lower-income household pays a higher percentage.',
  }[mode] || '');

  sims.forEach((sim) => {
    let mode = sim.dataset.defaultMode || 'progressive';
    const buttons = [...sim.querySelectorAll('.simMode')];
    const incomes = { low: 20000, high: 100000 };

    const update = () => {
      buttons.forEach((button) => button.classList.toggle('is-active', button.dataset.mode === mode));
      for (const key of ['low', 'high']) {
        const box = sim.querySelector(`[data-household="${key}"]`);
        const tax = taxFor(incomes[key], mode, key);
        const rate = (tax / incomes[key]) * 100;
        box.querySelector('.simIncome').textContent = `Income: ${money.format(incomes[key])}`;
        box.querySelector('.simTaxAmount').textContent = money.format(tax);
        box.querySelector('.simTaxRate').textContent = `${rate.toFixed(1)}% of income`;
        box.querySelector('.simAfterTax').textContent = money.format(incomes[key] - tax);
        box.querySelector('.simTaxSegment').style.width = `${rate}%`;
        box.querySelector('.simAfterTaxSegment').style.width = `${100 - rate}%`;
      }
      sim.querySelector('.simTakeaway').textContent = labelFor(mode);
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        mode = button.dataset.mode;
        update();
      });
    });
    update();
  });
}

function setupChinaIncomeTaxSimulators(root) {
  const sims = [...root.querySelectorAll('.chinaTaxSim')];
  const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  const money = (amount) => `RMB ${number.format(Math.max(0, Math.round(amount || 0)))}`;
  const brackets = [
    { lower: 0, upper: 36000, rate: 0.03, quick: 0 },
    { lower: 36000, upper: 144000, rate: 0.10, quick: 2520 },
    { lower: 144000, upper: 300000, rate: 0.20, quick: 16920 },
    { lower: 300000, upper: 420000, rate: 0.25, quick: 31920 },
    { lower: 420000, upper: 660000, rate: 0.30, quick: 52920 },
    { lower: 660000, upper: 960000, rate: 0.35, quick: 85920 },
    { lower: 960000, upper: Infinity, rate: 0.45, quick: 181920 },
  ];

  const clampNumber = (value) => Math.max(0, Number(value) || 0);
  const bracketLabel = (bracket) => {
    if (bracket.lower === 0) return `0-${number.format(bracket.upper)}`;
    if (!Number.isFinite(bracket.upper)) return `Over ${number.format(bracket.lower)}`;
    return `${number.format(bracket.lower)}-${number.format(bracket.upper)}`;
  };

  const calculateTax = (taxable) => {
    let tax = 0;
    const segments = brackets.map((bracket) => {
      const amount = Math.max(0, Math.min(taxable, bracket.upper) - bracket.lower);
      const segmentTax = amount * bracket.rate;
      tax += segmentTax;
      return { ...bracket, amount, segmentTax };
    });
    const active = brackets.find((bracket) => taxable > bracket.lower && taxable <= bracket.upper) || brackets[0];
    return { tax, segments, active };
  };

  sims.forEach((sim) => {
    const grossInput = sim.querySelector('.chinaGrossIncome');
    const extraInput = sim.querySelector('.chinaExtraDeductions');
    const presets = [...sim.querySelectorAll('.chinaPreset')];
    const standardDeduction = clampNumber(sim.dataset.standardDeduction || 60000);

    grossInput.value = sim.dataset.defaultIncome || 240000;

    presets.forEach((button) => {
      const income = clampNumber(button.dataset.income);
      button.textContent = money(income);
      button.addEventListener('click', () => {
        grossInput.value = income;
        update();
      });
    });

    const update = () => {
      const gross = clampNumber(grossInput.value);
      const extra = clampNumber(extraInput.value);
      const standardUsed = Math.min(gross, standardDeduction);
      const extraUsed = Math.min(extra, Math.max(0, gross - standardUsed));
      const taxable = Math.max(0, gross - standardDeduction - extra);
      const { tax, segments, active } = calculateTax(taxable);
      const grossBase = Math.max(gross, 1);

      presets.forEach((button) => {
        button.classList.toggle('is-active', clampNumber(button.dataset.income) === gross);
      });

      sim.querySelector('.chinaTaxDue').textContent = money(tax);
      sim.querySelector('.chinaTaxableIncome').textContent = money(taxable);
      sim.querySelector('.chinaMarginalRate').textContent = `${(active.rate * 100).toFixed(0)}%`;
      sim.querySelector('.chinaEffectiveRate').textContent = gross > 0 ? `${((tax / gross) * 100).toFixed(2)}%` : '0.00%';
      sim.querySelector('.chinaAfterTaxIncome').textContent = money(gross - tax);
      sim.querySelector('.chinaStandardSegment').style.width = `${(standardUsed / grossBase) * 100}%`;
      sim.querySelector('.chinaExtraSegment').style.width = `${(extraUsed / grossBase) * 100}%`;
      sim.querySelector('.chinaTaxableSegment').style.width = `${(taxable / grossBase) * 100}%`;

      sim.querySelector('.chinaBracketViz').innerHTML = segments.map((segment) => {
        const bracketSize = Number.isFinite(segment.upper) ? segment.upper - segment.lower : Math.max(segment.amount, 1);
        const fill = Math.min(100, (segment.amount / bracketSize) * 100);
        const activeClass = segment.amount > 0 ? ' is-used' : '';
        return `
          <div class="chinaBracketRow${activeClass}">
            <div class="chinaBracketMeta">
              <span>${bracketLabel(segment)}</span>
              <b>${(segment.rate * 100).toFixed(0)}%</b>
            </div>
            <div class="chinaBracketBar"><span style="width:${fill}%"></span></div>
            <div class="chinaBracketAmount">${money(segment.amount)} taxed | ${money(segment.segmentTax)} tax</div>
          </div>
        `;
      }).join('');
    };

    grossInput.addEventListener('input', update);
    extraInput.addEventListener('input', update);
    update();
  });
}

function setupIndirectTaxSimulators(root) {
  const sims = [...root.querySelectorAll('.indirectTaxSim')];
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  sims.forEach((sim) => {
    const buttons = [...sim.querySelectorAll('.productButton')];
    const taxRate = Number(sim.dataset.taxRate || 10);
    const households = {
      low: { income: 20000 },
      high: { income: 100000 },
    };
    let selected = buttons[0];

    const update = () => {
      const price = Number(selected.dataset.price || 0);
      const tax = price * (taxRate / 100);
      buttons.forEach((button) => {
        button.classList.toggle('is-active', button === selected);
        button.querySelector('.productPrice').textContent = money.format(Number(button.dataset.price || 0));
      });
      sim.querySelector('.indirectProductSummary').textContent =
        `${selected.querySelector('.productName').textContent}: ${money.format(price)} price, ${taxRate}% indirect tax = ${money.format(tax)} tax`;

      for (const key of ['low', 'high']) {
        const burden = (tax / households[key].income) * 100;
        const box = sim.querySelector(`[data-household="${key}"]`);
        box.querySelector('.indirectTaxPaid').textContent = money.format(tax);
        box.querySelector('.indirectBurden').textContent = `${burden.toFixed(2)}%`;
        box.querySelector('.burdenMeter span').style.width = `${Math.min(100, burden * 20)}%`;
      }

      const lowBurden = (tax / households.low.income) * 100;
      const highBurden = (tax / households.high.income) * 100;
      sim.querySelector('.indirectTakeaway').textContent =
        `Both households pay ${money.format(tax)} tax, but it is ${lowBurden.toFixed(2)}% of the lower income and ${highBurden.toFixed(2)}% of the higher income.`;
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        selected = button;
        update();
      });
    });
    update();
  });
}

function setupMarketMechanismSimulators(root) {
  const sims = [...root.querySelectorAll('.marketMechanismSim')];
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  sims.forEach((sim) => {
    const demandInput = sim.querySelector('.marketDemandInput');
    const costInput = sim.querySelector('.marketCostInput');
    demandInput.value = sim.dataset.defaultDemand || 55;
    costInput.value = sim.dataset.defaultCost || 18;

    const update = () => {
      const demand = Number(demandInput.value || 0);
      const cost = Number(costInput.value || 0);
      const price = clamp(8 + demand * 0.42, 8, 52);
      const profit = price - cost;
      const resourceScore = clamp(Math.round((profit * 2.2) + (demand * 0.45)), 0, 100);
      const response = profit > 14
        ? 'produce much more'
        : profit > 4
          ? 'produce more'
          : profit > 0
            ? 'produce cautiously'
            : 'move resources away';

      sim.querySelector('.marketDemandValue').textContent = `${demand}%`;
      sim.querySelector('.marketPriceValue').textContent = money.format(price);
      sim.querySelector('.marketResourceValue').textContent = `${resourceScore}%`;
      sim.querySelector('.marketDemandBar').style.width = `${demand}%`;
      sim.querySelector('.marketPriceBar').style.width = `${(price / 52) * 100}%`;
      sim.querySelector('.marketResourceBar').style.width = `${resourceScore}%`;
      sim.querySelector('.marketPriceMetric').textContent = money.format(price);
      sim.querySelector('.marketProfitMetric').textContent = money.format(profit);
      sim.querySelector('.marketProfitMetric').classList.toggle('is-negative', profit < 0);
      sim.querySelector('.marketResponseMetric').textContent = response;
      sim.querySelector('.marketChain').innerHTML = [
        `${demand}% demand`,
        `${money.format(price)} price`,
        `${money.format(profit)} profit per unit`,
        response,
      ].map((text) => `<span>${esc(text)}</span>`).join('');
      sim.querySelector('.marketTakeaway').textContent =
        profit > 0
          ? 'Higher demand raises the price signal and creates a profit incentive, so firms are likely to allocate more resources to this market.'
          : 'Even when demand exists, high costs can remove the profit incentive, so private firms may allocate fewer resources.';
    };

    demandInput.addEventListener('input', update);
    costInput.addEventListener('input', update);
    update();
  });
}

function setupMarketFailureExternalitySimulators(root) {
  const sims = [...root.querySelectorAll('.marketFailureExternalitySim')];
  const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

  sims.forEach((sim) => {
    const spilloverInput = sim.querySelector('.failureSpillover');
    const privateBenefit = Number(sim.dataset.defaultPrivateBenefit || 56);
    const privateCost = Number(sim.dataset.defaultPrivateCost || 44);
    spilloverInput.value = sim.dataset.defaultSpillover || 24;

    const update = () => {
      const spillover = Number(spilloverInput.value || 0);
      const socialCost = privateCost + spillover;

      sim.querySelector('.failurePrivateBenefitValue').textContent = number.format(privateBenefit);
      sim.querySelector('.failurePrivateCostValue').textContent = number.format(privateCost);
      sim.querySelector('.failureSocialValue').textContent = number.format(socialCost);
      sim.querySelector('.failurePrivateBenefitBar').style.width = `${privateBenefit}%`;
      sim.querySelector('.failurePrivateCostBar').style.width = `${privateCost}%`;
      sim.querySelector('.failureSocialBar').style.width = `${Math.min(100, socialCost)}%`;
      sim.querySelector('.failurePrivateCostMetric').textContent = number.format(privateCost);
      sim.querySelector('.failureExternalCostMetric').textContent = number.format(spillover);
      sim.querySelector('.failureSocialCostMetric').textContent = number.format(socialCost);

      const chain = ['private cost', '+ external cost', '= social cost', 'output may be too high'];
      sim.querySelector('.marketChain').innerHTML = chain.map((text) => `<span>${esc(text)}</span>`).join('');
      sim.querySelector('.marketTakeaway').textContent =
        `Social cost is ${number.format(socialCost)} because it includes the ${number.format(spillover)} external cost. If firms ignore this, the market may produce too much.`;
    };

    spilloverInput.addEventListener('input', update);
    update();
  });
}

function setupPublicGoodFreeRiderSimulators(root) {
  const sims = [...root.querySelectorAll('.publicGoodFreeRiderSim')];
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  sims.forEach((sim) => {
    const payingInput = sim.querySelector('.publicPaying');
    const people = Number(sim.dataset.defaultPeople || 80);
    const benefit = Number(sim.dataset.defaultBenefit || 12);
    const cost = Number(sim.dataset.defaultCost || 700);
    payingInput.value = sim.dataset.defaultPaying || 25;

    const update = () => {
      const paying = Number(payingInput.value || 0);
      const privateRevenue = people * (paying / 100) * benefit;
      const socialBenefit = people * benefit;
      const privateProvides = privateRevenue >= cost;
      const sociallyWorthwhile = socialBenefit >= cost;
      const outcome = privateProvides ? 'provided' : 'not provided';

      sim.querySelector('.publicPayingValue').textContent = `${paying}%`;
      sim.querySelector('.publicRevenueBarValue').textContent = money.format(privateRevenue);
      sim.querySelector('.publicCostBarValue').textContent = money.format(cost);
      sim.querySelector('.publicPayingBar').style.width = `${paying}%`;
      sim.querySelector('.publicRevenueBar').style.width = `${Math.min(100, (privateRevenue / Math.max(cost, 1)) * 100)}%`;
      sim.querySelector('.publicCostBar').style.width = '100%';
      sim.querySelector('.publicRevenue').textContent = money.format(privateRevenue);
      sim.querySelector('.publicSocialBenefit').textContent = money.format(socialBenefit);
      sim.querySelector('.publicOutcome').textContent = outcome;
      sim.querySelector('.publicOutcome').classList.toggle('is-negative', !privateProvides && sociallyWorthwhile);
      sim.querySelector('.marketChain').innerHTML = [
        `${people} people benefit`,
        `${paying}% pay voluntarily`,
        `${money.format(privateRevenue)} private revenue`,
        outcome,
      ].map((text) => `<span>${esc(text)}</span>`).join('');
      sim.querySelector('.marketTakeaway').textContent = !privateProvides && sociallyWorthwhile
        ? 'The good has enough social benefit, but too few users can be charged, so a private firm may not provide it.'
        : privateProvides
          ? 'Enough users pay to cover private cost, so private provision is possible in this setting.'
          : 'Private provision is unlikely, and the total social benefit is also below the cost in this setting.';
    };

    payingInput.addEventListener('input', update);
    update();
  });
}

function setupMonopolyPowerSimulators(root) {
  const sims = [...root.querySelectorAll('.monopolyPowerSim')];
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  sims.forEach((sim) => {
    const competitionInput = sim.querySelector('.monopolyCompetition');
    competitionInput.value = sim.dataset.defaultCompetition || 35;

    const update = () => {
      const competition = Number(competitionInput.value || 0);
      const marketPower = 100 - competition;
      const price = Math.round(35 + marketPower * 0.5);
      const output = Math.round(35 + competition * 0.55);
      const impact = marketPower > 50 ? 'price rises' : 'price pressure';
      const exam = marketPower > 50 ? 'output restricted' : 'output protected';

      sim.querySelector('.monopolyCompetitionValue').textContent = `${competition}%`;
      sim.querySelector('.monopolyPriceValue').textContent = money.format(price);
      sim.querySelector('.monopolyOutputValue').textContent = `${output}%`;
      sim.querySelector('.monopolyCompetitionBar').style.width = `${competition}%`;
      sim.querySelector('.monopolyPriceBar').style.width = `${Math.min(100, (price / 85) * 100)}%`;
      sim.querySelector('.monopolyOutputBar').style.width = `${output}%`;
      sim.querySelector('.monopolyPowerValue').textContent = `${marketPower}%`;
      sim.querySelector('.monopolyImpact').textContent = impact;
      sim.querySelector('.monopolyExam').textContent = exam;
      sim.querySelector('.monopolyExam').classList.toggle('is-negative', marketPower > 50);
      sim.querySelector('.marketChain').innerHTML = [
        `${marketPower}% market power`,
        `${money.format(price)} price`,
        `${output}% output`,
        exam,
      ].map((text) => `<span>${esc(text)}</span>`).join('');
      sim.querySelector('.marketTakeaway').textContent = marketPower > 50
        ? 'Weak competition can allow a dominant firm to restrict output and charge higher prices.'
        : 'Stronger competition limits market power, so firms face more pressure on price and output.';
    };

    competitionInput.addEventListener('input', update);
    update();
  });
}

function setupMarketFailureScenarioGames(root) {
  const games = [...root.querySelectorAll('.marketFailureScenarioGame')];
  const rounds = [
    {
      scenario: 'A factory sells cement cheaply, but nearby residents suffer dirty air and health costs.',
      answer: 'external-cost',
      correct: 'Correct. Pollution is an external cost, so social cost exceeds private cost and output may be too high.',
      wrong: 'Look for the cost imposed on people outside the transaction. This is an external cost.',
    },
    {
      scenario: 'Vaccination protects the patient and also reduces disease spread to other people.',
      answer: 'external-benefit',
      correct: 'Correct. Other people gain external benefits, so social benefit exceeds private benefit.',
      wrong: 'The clue is a wider benefit to people beyond the consumer. This is an external benefit.',
    },
    {
      scenario: 'Some families buy less education than is socially desirable because they underestimate long-run benefits.',
      answer: 'merit-good',
      correct: 'Correct. Education is a merit good that can be under-consumed.',
      wrong: 'The clue is under-consumption of a beneficial good. This is a merit good.',
    },
    {
      scenario: 'Consumers buy too many sugary drinks because they focus on short-run enjoyment and ignore health costs.',
      answer: 'demerit-good',
      correct: 'Correct. A demerit good may be over-consumed when costs are underestimated.',
      wrong: 'The clue is over-consumption of a harmful good. This is a demerit good.',
    },
    {
      scenario: 'Street lighting benefits everyone on the road, including people who do not pay directly.',
      answer: 'public-good',
      correct: 'Correct. Non-payers can benefit, so the free-rider problem may cause non-provision.',
      wrong: 'The clue is that non-payers cannot easily be excluded. This is a public good.',
    },
    {
      scenario: 'One dominant firm buys rivals, reduces output and raises prices.',
      answer: 'monopoly',
      correct: 'Correct. Monopoly power can restrict supply and reduce consumer benefits.',
      wrong: 'The clue is one dominant firm with power over output and price. This is monopoly power.',
    },
  ];

  games.forEach((game) => {
    const options = [...game.querySelectorAll('.failureScenarioOption')];
    const next = game.querySelector('.marketNextSignal');
    let roundIndex = 0;
    let score = 0;
    let answered = false;
    let finished = false;

    const render = () => {
      const round = rounds[roundIndex];
      answered = false;
      finished = false;
      game.querySelector('.marketGameRound').textContent = `Scenario ${roundIndex + 1} of ${rounds.length}`;
      game.querySelector('.marketGameScore').textContent = `Score ${score}/${rounds.length}`;
      game.querySelector('.marketGameScenario').textContent = round.scenario;
      game.querySelector('.marketGameFeedback').textContent = '';
      game.querySelector('.marketGameFeedback').classList.remove('is-correct', 'is-wrong');
      next.disabled = true;
      next.textContent = roundIndex === rounds.length - 1 ? 'Finish round' : 'Next scenario';
      options.forEach((option) => {
        option.disabled = false;
        option.classList.remove('is-correct', 'is-wrong', 'is-muted');
      });
    };

    options.forEach((option) => {
      option.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const round = rounds[roundIndex];
        const isCorrect = option.dataset.choice === round.answer;
        if (isCorrect) score += 1;
        game.querySelector('.marketGameScore').textContent = `Score ${score}/${rounds.length}`;
        game.querySelector('.marketGameFeedback').textContent = isCorrect ? round.correct : round.wrong;
        game.querySelector('.marketGameFeedback').classList.add(isCorrect ? 'is-correct' : 'is-wrong');
        options.forEach((item) => {
          const isAnswer = item.dataset.choice === round.answer;
          item.disabled = true;
          item.classList.toggle('is-correct', isAnswer);
          item.classList.toggle('is-wrong', item === option && !isCorrect);
          item.classList.toggle('is-muted', !isAnswer && item !== option);
        });
        next.disabled = false;
      });
    });

    next.addEventListener('click', () => {
      if (finished) {
        roundIndex = 0;
        score = 0;
        render();
        return;
      }
      if (roundIndex < rounds.length - 1) {
        roundIndex += 1;
        render();
      } else {
        finished = true;
        game.querySelector('.marketGameRound').textContent = 'Game complete';
        game.querySelector('.marketGameScenario').textContent =
          score === rounds.length
            ? 'Perfect score. You can classify each market failure.'
            : 'Review the clues: who pays, who benefits, and whether the market produces too much or too little.';
        game.querySelector('.marketGameFeedback').textContent =
          `Final score: ${score}/${rounds.length}. Exam link: identify the cause, then explain the consequence for resource allocation.`;
        game.querySelector('.marketGameFeedback').classList.remove('is-correct', 'is-wrong');
        game.querySelector('.marketGameFeedback').classList.add(score === rounds.length ? 'is-correct' : 'is-wrong');
        next.textContent = 'Play again';
        options.forEach((option) => {
          option.disabled = true;
          option.classList.remove('is-correct', 'is-wrong', 'is-muted');
        });
      }
    });

    render();
  });
}

function setupMarketSignalGames(root) {
  const games = [...root.querySelectorAll('.marketSignalGame')];
  const rounds = [
    {
      scenario: 'A heat wave arrives and students queue for cold drinks after school.',
      answer: 'bubble-tea',
      correct: 'Correct. Higher demand for cold drinks can raise price and profit, attracting more resources into bubble tea.',
      wrong: 'Not this signal. The clearest demand increase is for cold drinks, so resources should move into bubble tea.',
    },
    {
      scenario: 'Weather forecasts predict two weeks of heavy rain.',
      answer: 'umbrellas',
      correct: 'Correct. Demand for umbrellas rises, so higher prices and profits can attract more resources.',
      wrong: 'Not this signal. Rain increases demand for umbrellas most directly.',
    },
    {
      scenario: 'Petrol prices rise and the city builds safer bicycle lanes.',
      answer: 'e-bikes',
      correct: 'Correct. Demand for cheaper transport can rise, attracting resources into electric bikes.',
      wrong: 'Not this signal. The transport change most directly raises demand for electric bikes.',
    },
    {
      scenario: 'Final exams are close and parents want extra revision support.',
      answer: 'tutoring',
      correct: 'Correct. Demand for tutoring rises, so profit incentives can pull labour into exam services.',
      wrong: 'Not this signal. Exam pressure most directly increases demand for tutoring.',
    },
  ];

  games.forEach((game) => {
    const options = [...game.querySelectorAll('.marketOption')];
    const next = game.querySelector('.marketNextSignal');
    let roundIndex = 0;
    let score = 0;
    let answered = false;
    let finished = false;

    const render = () => {
      const round = rounds[roundIndex];
      answered = false;
      finished = false;
      game.querySelector('.marketGameRound').textContent = `Signal ${roundIndex + 1} of ${rounds.length}`;
      game.querySelector('.marketGameScore').textContent = `Score ${score}/${rounds.length}`;
      game.querySelector('.marketGameScenario').textContent = round.scenario;
      game.querySelector('.marketGameFeedback').textContent = '';
      game.querySelector('.marketGameFeedback').classList.remove('is-correct', 'is-wrong');
      next.disabled = true;
      next.textContent = roundIndex === rounds.length - 1 ? 'Finish round' : 'Next signal';
      options.forEach((option) => {
        option.disabled = false;
        option.classList.remove('is-correct', 'is-wrong', 'is-muted');
      });
    };

    options.forEach((option) => {
      option.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const round = rounds[roundIndex];
        const isCorrect = option.dataset.choice === round.answer;
        if (isCorrect) score += 1;
        game.querySelector('.marketGameScore').textContent = `Score ${score}/${rounds.length}`;
        game.querySelector('.marketGameFeedback').textContent = isCorrect ? round.correct : round.wrong;
        game.querySelector('.marketGameFeedback').classList.add(isCorrect ? 'is-correct' : 'is-wrong');
        options.forEach((item) => {
          const isAnswer = item.dataset.choice === round.answer;
          item.disabled = true;
          item.classList.toggle('is-correct', isAnswer);
          item.classList.toggle('is-wrong', item === option && !isCorrect);
          item.classList.toggle('is-muted', !isAnswer && item !== option);
        });
        next.disabled = false;
      });
    });

    next.addEventListener('click', () => {
      if (finished) {
        roundIndex = 0;
        score = 0;
        render();
        return;
      }
      if (roundIndex < rounds.length - 1) {
        roundIndex += 1;
        render();
      } else {
        finished = true;
        game.querySelector('.marketGameRound').textContent = 'Game complete';
        game.querySelector('.marketGameScenario').textContent =
          score === rounds.length
            ? 'Perfect score. You followed each price signal.'
            : 'Review the signals where demand changed, then try again.';
        game.querySelector('.marketGameFeedback').textContent =
          `Final score: ${score}/${rounds.length}. Exam link: demand changes create price and profit signals that move resources.`;
        game.querySelector('.marketGameFeedback').classList.remove('is-correct', 'is-wrong');
        game.querySelector('.marketGameFeedback').classList.add(score === rounds.length ? 'is-correct' : 'is-wrong');
        next.textContent = 'Play again';
        options.forEach((option) => {
          option.disabled = true;
          option.classList.remove('is-correct', 'is-wrong', 'is-muted');
        });
      }
    });

    render();
  });
}
