/* ============================================================
   visuals.js — SVG graphic library for IGCSE Economics decks
   Each function returns an HTML string (one <div class="vizPanel">
   or similar). Keep new diagrams here so lessons stay data-only.
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const axes = () => `
  <line class="gridline" x1="70"  y1="90"  x2="470" y2="90"  />
  <line class="gridline" x1="70"  y1="180" x2="470" y2="180" />
  <line class="gridline" x1="70"  y1="270" x2="470" y2="270" />
  <line class="gridline" x1="70"  y1="360" x2="470" y2="360" />
  <line class="axis"    x1="78"  y1="430" x2="460" y2="430" />
  <line class="axis"    x1="78"  y1="430" x2="78"  y2="70"  />
`;

const arrowDef = (id) => `
  <defs>
    <marker id="${id}" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="var(--gold)"/>
    </marker>
  </defs>
`;

const wrap = (inner, className = '') => `<div class="vizPanel${className ? ` ${className}` : ''}" aria-hidden="true">${inner}</div>`;
const svg  = (id, body) => `<svg viewBox="0 0 520 520" role="img">${arrowDef(id)}${body}</svg>`;
const htmlEsc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[m]));
const svgTextLines = (className, x, y, lines = [], attrs = '', lineHeight = 18) => `
  <text class="${className}" x="${x}" y="${y}" ${attrs}>
    ${lines.map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${htmlEsc(line)}</tspan>`).join('')}
  </text>
`;

IGCSE.isRemoteImageUrl = IGCSE.isRemoteImageUrl || ((src) =>
  /^(?:https?:)?\/\//i.test(String(src || '').trim()));
IGCSE.localImageSrc = IGCSE.localImageSrc || ((src) =>
  IGCSE.isRemoteImageUrl(src) ? '' : String(src || ''));

const renderPhoto = (photo = {}) => {
  const src = IGCSE.localImageSrc(photo.src);
  if (!src) return '';

  const caption = photo.caption || photo.alt || '';
  const credit = photo.credit || '';
  const creditHtml = credit
    ? (photo.source
        ? `<a href="${htmlEsc(photo.source)}" target="_blank" rel="noopener">${htmlEsc(credit)}</a>`
        : htmlEsc(credit))
    : '';
  const captionHtml = caption || creditHtml
    ? `<figcaption>
        ${caption ? `<span>${htmlEsc(caption)}</span>` : '<span></span>'}
        ${creditHtml ? `<span>${creditHtml}</span>` : ''}
      </figcaption>`
    : '';

  return `
    <figure class="photoPanel">
      <img src="${htmlEsc(src)}"
           alt="${htmlEsc(photo.alt || '')}"
           loading="lazy"
           decoding="async" />
      ${captionHtml}
    </figure>
  `;
};

const diagramPpcExamLines = [
  'Exam: label two output axes; curves touch both axes;',
  'show the shift with an arrow or PPC1 to PPC2.',
];

const diagramPpcPointPositions = {
  inside: { x: 236, y: 316 },
  on: { x: 322, y: 272 },
  outside: { x: 408, y: 218 },
};

const diagramPpcCurvePaths = {
  base: 'M86 150 C198 160 354 268 420 390',
  right: 'M86 106 C224 116 412 244 470 390',
  left: 'M86 202 C178 216 306 306 352 390',
};

const diagramArrowId = (id) => `${id}-diagramArrow`;
const diagramArrowDef = (id) => `
  <defs>
    <marker id="${diagramArrowId(id)}" markerWidth="14" markerHeight="14" refX="12" refY="7" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0,0 L0,14 L14,7 z" fill="var(--gold)"/>
    </marker>
  </defs>
`;

const diagramPpcShiftArrow = (id, mode) => {
  if (mode === 'leftShift') {
    return `<path class="diagramShiftArrow" marker-end="url(#${diagramArrowId(id)})" d="M190 184 L190 214"/>`;
  }
  return `<path class="diagramShiftArrow" marker-end="url(#${diagramArrowId(id)})" d="M190 156 L190 126"/>`;
};

const diagramPpcPoint = (label, point, note = '') => `
  <g class="diagramPoint">
    <circle cx="${point.x}" cy="${point.y}" r="7"/>
    <text x="${point.x + 13}" y="${point.y - 10}">${htmlEsc(label)}</text>
    ${note ? `<text class="diagramPointNote" x="${point.x + 13}" y="${point.y + 13}">${htmlEsc(note)}</text>` : ''}
  </g>
`;

const renderPpcDiagram = (spec = {}, id = 'ppc') => {
  const mode = spec.mode || spec.shift || 'rightShift';
  const xLabel = spec.xLabel || 'Consumer goods';
  const yLabel = spec.yLabel || 'Capital goods';
  const title = spec.title || (mode === 'leftShift'
    ? 'PPC: lower productive capacity'
    : mode === 'insideToOn'
      ? 'PPC: using spare resources'
      : 'PPC: higher productive capacity');
  const caption = spec.caption || (mode === 'insideToOn'
    ? 'A to B uses unemployed resources more efficiently; it is not a rightward shift.'
    : mode === 'leftShift'
      ? 'A leftward shift shows lower maximum output.'
      : 'A rightward shift shows higher maximum output.');
  const secondaryCurve = mode === 'leftShift' ? 'left' : mode === 'rightShift' ? 'right' : '';

  const curves = [
    `<path class="diagramCurve is-base" d="${diagramPpcCurvePaths.base}"/>`,
    `<text class="diagramCurveLabel" x="112" y="176">PPC1</text>`,
  ];

  if (secondaryCurve) {
    const labelX = 112;
    const labelY = secondaryCurve === 'right' ? 132 : 222;
    curves.push(`<path class="diagramCurve is-secondary" d="${diagramPpcCurvePaths[secondaryCurve]}"/>`);
    curves.push(`<text class="diagramCurveLabel is-secondary" x="${labelX}" y="${labelY}">PPC2</text>`);
    curves.push(diagramPpcShiftArrow(id, mode));
  }

  const points = [];
  if (mode === 'insideToOn') {
    points.push(diagramPpcPoint('A', diagramPpcPointPositions.inside, 'inside PPC'));
    points.push(diagramPpcPoint('B', diagramPpcPointPositions.on, 'on PPC'));
    points.push(`<path class="diagramMovementArrow" marker-end="url(#${diagramArrowId(id)})" d="M252 304 C274 290 296 280 316 272"/>`);
  } else if (mode === 'points') {
    points.push(diagramPpcPoint('A', diagramPpcPointPositions.inside, 'inside'));
    points.push(diagramPpcPoint('B', diagramPpcPointPositions.on, 'on'));
    points.push(diagramPpcPoint('C', diagramPpcPointPositions.outside, 'outside'));
  } else if (mode === 'movement') {
    points.push(diagramPpcPoint('A', { x: 204, y: 178 }, 'more capital goods'));
    points.push(diagramPpcPoint('B', { x: 356, y: 318 }, 'more consumer goods'));
    points.push(`<path class="diagramMovementArrow" marker-end="url(#${diagramArrowId(id)})" d="M220 190 C268 216 318 266 348 308"/>`);
  }
  const checklistLines = Array.isArray(spec.checklist)
    ? spec.checklist
    : spec.checklist
      ? [spec.checklist]
      : diagramPpcExamLines;

  return wrap(svg(id, `
    ${diagramArrowDef(id)}
    <text class="diagramTitle" x="260" y="34" text-anchor="middle">${htmlEsc(title)}</text>
    <line class="diagramAxis" x1="86" y1="390" x2="478" y2="390"/>
    <line class="diagramAxis" x1="86" y1="390" x2="86" y2="74"/>
    <text class="diagramAxisLabel" x="282" y="430" text-anchor="middle">${htmlEsc(xLabel)}</text>
    <text class="diagramAxisLabel" transform="translate(32 242) rotate(-90)" text-anchor="middle">${htmlEsc(yLabel)}</text>
    <text class="diagramOriginLabel" x="64" y="412">0</text>
    ${curves.join('')}
    ${points.join('')}
    <text class="diagramCaption" x="260" y="460" text-anchor="middle">${htmlEsc(caption)}</text>
    ${spec.checklist === false ? '' : svgTextLines('diagramChecklist', 86, 484, checklistLines)}
  `), 'diagramPanel diagram-ppc');
};

const renderDemandSupplyDiagram = (spec = {}, id = 'demandSupply') => {
  const title = spec.title || 'Demand and supply';
  const shift = spec.shift || '';
  const showDemandShift = shift === 'demandRight' || shift === 'demandLeft';
  const showSupplyShift = shift === 'supplyRight' || shift === 'supplyLeft';
  const demand2 = shift === 'demandLeft' ? 'M110 126 L378 398' : 'M158 126 L426 398';
  const supply2 = shift === 'supplyLeft' ? 'M122 398 L390 126' : 'M170 398 L438 126';
  const showEquilibrium = spec.equilibrium !== false;
  const baseEq = { x: 274, y: 268 };
  const newEq = shift === 'supplyLeft'
    ? { x: 262, y: 256 }
    : shift === 'supplyRight'
      ? { x: 286, y: 280 }
      : shift === 'demandLeft'
        ? { x: 262, y: 280 }
        : shift === 'demandRight'
          ? { x: 286, y: 256 }
          : null;
  const labelPrefix = spec.labelPrefix || '';
  const baseSupplyLabel = showSupplyShift ? 'S1' : 'S';
  const baseDemandLabel = showDemandShift ? 'D1' : 'D';

  return wrap(svg(id, `
    <text class="diagramTitle" x="260" y="42" text-anchor="middle">${htmlEsc(title)}</text>
    <line class="diagramAxis" x1="84" y1="418" x2="476" y2="418"/>
    <line class="diagramAxis" x1="84" y1="418" x2="84" y2="64"/>
    <text class="diagramAxisLabel" x="282" y="482" text-anchor="middle">${htmlEsc(spec.xLabel || 'Quantity')}</text>
    <text class="diagramAxisLabel" transform="translate(30 252) rotate(-90)" text-anchor="middle">${htmlEsc(spec.yLabel || 'Price')}</text>
    <path class="diagramLine demandLine" d="M134 126 L402 398"/>
    <path class="diagramLine supplyLine" d="M146 398 L414 126"/>
    <text class="diagramCurveLabel" x="410" y="398">${baseDemandLabel}</text>
    <text class="diagramCurveLabel" x="422" y="128">${baseSupplyLabel}</text>
    ${showDemandShift ? `<path class="diagramLine demandLine is-secondary" d="${demand2}"/><text class="diagramCurveLabel is-secondary" x="${shift === 'demandLeft' ? 386 : 434}" y="398">D2</text>` : ''}
    ${showSupplyShift ? `<path class="diagramLine supplyLine is-secondary" d="${supply2}"/><text class="diagramCurveLabel is-secondary" x="${shift === 'supplyLeft' ? 398 : 446}" y="128">S2</text>` : ''}
    ${shift ? `<path class="diagramShiftArrow" marker-end="url(#${id})" d="${shift === 'supplyLeft' || shift === 'demandLeft' ? 'M330 196 C298 205 274 214 246 224' : 'M250 260 C280 246 310 232 340 218'}"/>` : ''}
    ${showEquilibrium ? `
      <line class="diagramGuide" x1="84" y1="${baseEq.y}" x2="${baseEq.x}" y2="${baseEq.y}"/>
      <line class="diagramGuide" x1="${baseEq.x}" y1="${baseEq.y}" x2="${baseEq.x}" y2="418"/>
      <circle class="diagramEqPoint" cx="${baseEq.x}" cy="${baseEq.y}" r="6"/>
      <text class="diagramGuideLabel" x="52" y="${baseEq.y + 6}">${labelPrefix}P1</text>
      <text class="diagramGuideLabel" x="${baseEq.x - 12}" y="446">${labelPrefix}Q1</text>
      ${newEq ? `
        <line class="diagramGuide is-new" x1="84" y1="${newEq.y}" x2="${newEq.x}" y2="${newEq.y}"/>
        <line class="diagramGuide is-new" x1="${newEq.x}" y1="${newEq.y}" x2="${newEq.x}" y2="418"/>
        <circle class="diagramEqPoint is-new" cx="${newEq.x}" cy="${newEq.y}" r="6"/>
        <text class="diagramGuideLabel is-new" x="52" y="${newEq.y + 6}">${labelPrefix}P2</text>
        <text class="diagramGuideLabel is-new" x="${newEq.x - 12}" y="446">${labelPrefix}Q2</text>
      ` : ''}
    ` : ''}
    <text class="diagramCaption" x="84" y="458">${htmlEsc(spec.caption || 'Reusable micro diagram shell for future demand and supply lessons.')}</text>
  `), 'diagramPanel diagram-demand-supply');
};

const renderDiagram = (spec = {}, id = 'diagram') => {
  const kind = String(spec.kind || spec.diagram || '').toLowerCase();
  if (kind === 'ppc' || kind === 'productionpossibilitycurve') return renderPpcDiagram(spec, id);
  if (['demand-supply', 'demandsupply', 'demandandsupply'].includes(kind)) return renderDemandSupplyDiagram(spec, id);
  return renderPpcDiagram(spec, id);
};

/* ---------- Catalogue of named graphics ---------- */
const graphics = {

  /* Hero — swirling tax graphic */
  hero: () => `
    <div class="heroGraphic" aria-hidden="true">
      <div class="orbit o1"></div>
      <div class="orbit o2"></div>
      <div class="orbit o3"></div>
      <div class="coin c1">$</div>
      <div class="coin c2">%</div>
      <div class="coin c3">£</div>
      <svg viewBox="0 0 500 500" role="img">
        ${arrowDef('heroArrow')}
        <path class="curve cyan" d="M110 340 C170 180 300 360 390 145"/>
        <path class="curve gold" d="M130 280 C225 310 250 170 375 230"/>
        <text x="250" y="268" text-anchor="middle" font-size="74" font-weight="900" fill="white" letter-spacing="-2">tax</text>
      </svg>
    </div>
  `,

  /* Demand-side shift (price vs quantity), works for "demand"/"indirect"/etc. */
  demandShift: (id='demandShift') => wrap(svg(id, `
    ${axes()}
    <path class="curve cyan" d="M115 120 C185 160 280 260 420 390"/>
    <path class="curve rose" d="M130 370 C210 260 280 170 420 105"/>
    <path class="arrow-line" marker-end="url(#${id})" d="M250 190 C282 218 306 245 330 282"/>
    <text x="96" y="70" fill="#dbe7f6" font-size="20" font-weight="700">P</text>
    <text x="462" y="460" fill="#dbe7f6" font-size="20" font-weight="700">Q</text>
  `)),

  /* Two bars: revenue vs spending — used for budget/deficit/netRevenue */
  budgetBars: (id='budgetBars', label='deficit') => wrap(svg(id, `
    ${axes()}
    <rect class="bar" x="135" y="164" width="88" height="266" fill="var(--cyan)"/>
    <rect class="bar" x="300" y="94"  width="88" height="336" fill="var(--rose)"/>
    <text x="179" y="462" text-anchor="middle" fill="white" font-weight="800" font-size="22">revenue</text>
    <text x="344" y="462" text-anchor="middle" fill="white" font-weight="800" font-size="22">spending</text>
    <text x="258" y="80"  text-anchor="middle" fill="var(--gold)" font-weight="900" font-size="42">${label}</text>
  `)),

  /* Progressive — small vs tall gold bar with upward arrow */
  progressive: (id='progressive') => wrap(svg(id, `
    ${axes()}
    <rect class="bar" x="135" y="310" width="88" height="120" fill="var(--cyan)"/>
    <rect class="bar" x="300" y="160" width="88" height="270" fill="var(--gold)"/>
    <path class="arrow-line" marker-end="url(#${id})" d="M190 250 C250 160 290 130 355 105"/>
    <text x="179" y="462" text-anchor="middle" fill="#dbe7f6" font-size="18">low income</text>
    <text x="344" y="462" text-anchor="middle" fill="#dbe7f6" font-size="18">high income</text>
  `)),

  /* Regressive — heavier burden on low earners */
  regressive: (id='regressive') => wrap(svg(id, `
    ${axes()}
    <rect class="bar" x="135" y="210" width="88" height="220" fill="var(--gold)"/>
    <rect class="bar" x="300" y="350" width="88" height="80"  fill="var(--cyan)"/>
    <text x="260" y="135" text-anchor="middle" fill="white" font-weight="900" font-size="36">same tax</text>
    <text x="260" y="178" text-anchor="middle" fill="white" font-weight="700" font-size="26">unequal burden</text>
    <text x="179" y="462" text-anchor="middle" fill="#dbe7f6" font-size="18">low income</text>
    <text x="344" y="462" text-anchor="middle" fill="#dbe7f6" font-size="18">high income</text>
  `)),

  /* Proportional — two equal green bars */
  proportional: (id='proportional') => wrap(svg(id, `
    ${axes()}
    <rect class="bar" x="135" y="260" width="88" height="170" fill="var(--green)"/>
    <rect class="bar" x="300" y="260" width="88" height="170" fill="var(--green)"/>
    <text x="260" y="140" text-anchor="middle" fill="white" font-weight="900" font-size="42">15% = 15%</text>
  `)),

  /* Expansionary — rising green curve */
  demandUp: (id='demandUp') => wrap(svg(id, `
    ${axes()}
    <path class="curve green" d="M110 385 C170 335 235 265 300 205 C350 160 395 130 430 105"/>
    <path class="arrow-line" marker-end="url(#${id})" d="M250 320 C290 270 320 225 360 180"/>
    <text x="270" y="92" text-anchor="middle" fill="var(--green)" font-weight="900" font-size="40">demand up</text>
  `)),

  /* Contractionary — falling rose curve */
  demandDown: (id='demandDown') => wrap(svg(id, `
    ${axes()}
    <path class="curve rose" d="M110 120 C170 170 235 240 300 300 C350 345 395 380 430 405"/>
    <path class="arrow-line" marker-end="url(#${id})" d="M250 190 C290 240 320 285 360 330"/>
    <text x="270" y="90" text-anchor="middle" fill="var(--rose)" font-weight="900" font-size="40">demand down</text>
  `)),

  /* Abstract — concentric + crossed curves (conceptual/section breaks) */
  abstract: (id='abstract') => wrap(svg(id, `
    ${axes()}
    <circle cx="260" cy="250" r="145" fill="none" stroke="rgba(86,216,255,.4)" stroke-width="26"/>
    <circle cx="260" cy="250" r="95"  fill="none" stroke="rgba(255,209,102,.44)" stroke-width="26"/>
    <path class="curve cyan" d="M125 350 C210 105 310 415 425 150"/>
    <path class="curve gold" d="M120 205 C210 310 310 130 420 295"/>
  `)),

  /* Flow arrows — four chips horizontally (decorative) */
  flowArrows: (id='flowArrows') => wrap(svg(id, `
    ${axes()}
    <path class="arrow-line" marker-end="url(#${id})" d="M100 260 L430 260"/>
    <circle cx="130" cy="260" r="30" fill="var(--cyan)"  opacity=".35"/>
    <circle cx="230" cy="260" r="30" fill="var(--gold)"  opacity=".35"/>
    <circle cx="330" cy="260" r="30" fill="var(--green)" opacity=".35"/>
    <circle cx="420" cy="260" r="30" fill="var(--rose)"  opacity=".35"/>
  `)),
};

/* Alias map: legacy lesson names → current graphic keys.
   Lessons can reference any of these keys in their slide data. */
const aliases = {
  map: 'abstract',
  targets: 'abstract',
  taxchoice: 'demandShift',
  budget: 'budgetBars',
  budgetDeficit: 'budgetBars',
  budgetPractice: 'demandShift',
  tax: 'abstract',
  publicGoods: 'abstract',
  demand: 'demandShift',
  matching: 'abstract',
  matchingAnswer: 'abstract',
  sectionClass: 'abstract',
  sectionGood: 'abstract',
  sectionFiscal: 'abstract',
  direct: 'abstract',
  indirect: 'demandShift',
  classFlow: 'abstract',
  twoDecisions: 'abstract',
  classificationAnswer: 'abstract',
  principles: 'abstract',
  implementation: 'abstract',
  netRevenue: 'budgetBars',
  netRevenueAnswer: 'budgetBars',
  consumers: 'demandShift',
  producers: 'abstract',
  government: 'abstract',
  economy: 'demandShift',
  luxuryCars: 'abstract',
  stakeholders: 'abstract',
  fiscal: 'abstract',
  expansionary: 'demandUp',
  contractionary: 'demandDown',
  balanceTerms: 'budgetBars',
  policyAims: 'demandUp',
  conflict: 'abstract',
  miniCase: 'demandUp',
  exam: 'abstract',
  modelAnswer: 'abstract',
  discipline: 'abstract',
  exit: 'abstract',
  exitAnswer: 'abstract',
};

IGCSE.renderVisual = function(key, id) {
  if (!key) return '';
  if (typeof key === 'object') {
    if (key.type === 'diagram' || key.kind || key.diagram) return renderDiagram(key, id || 'diagram');
    return renderPhoto(key);
  }
  if (key === 'hero') return graphics.hero();
  const resolved = graphics[key] ? key : (aliases[key] || 'abstract');
  const fn = graphics[resolved] || graphics.abstract;
  return fn(id || `viz-${resolved}`);
};

IGCSE.__graphicsRegistry = graphics;
