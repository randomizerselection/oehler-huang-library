/* Lesson-owned labour-market diagrams. Each stage is a separate, reversible slide. */
(() => {
  const original = IGCSE.renderVisual;
  const line = (x1, y1, x2, y2, cls = '') => `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  const label = (x, y, value, cls = '') => `<text class="${cls}" x="${x}" y="${y}">${value}</text>`;
  function diagram(stage) {
    const shift = stage === 'demand-shift';
    const supplyShift = stage === 'supply-shift';
    const floor = stage === 'floor' || stage === 'below-floor';
    const binding = stage === 'floor';
    const guides = stage !== 'curves';
    const yFloor = binding ? 180 : 315;
    const floorLine = floor ? `${line(125, yFloor, 742, yFloor, 'floor-line')}${label(750, yFloor + 7, 'minimum wage', 'floor-label')}` : '';
    const originalEq = guides ? `
      ${line(125, 255, 460, 255, 'guide')}${line(460, 255, 460, 410, 'guide')}
      <circle cx="460" cy="255" r="7" class="point"/>${label(471, 247, 'E₁', 'point-label')}
      ${label(84, 263, 'W₁', 'axis-value')}${label(449, 444, 'L₁', 'axis-value')}` : '';
    const newEq = shift ? `
      <path d="M330 120 L770 390" class="demand-line shifted"/>
      ${label(768, 405, 'D₂', 'curve-label shifted')}
      ${line(125, 228, 505, 228, 'guide new')}${line(505, 228, 505, 410, 'guide new')}
      <circle cx="505" cy="228" r="7" class="point new"/>${label(515, 219, 'E₂', 'point-label new')}
      ${label(84, 235, 'W₂', 'axis-value new')}${label(493, 444, 'L₂', 'axis-value new')}
      <path d="M515 335 L568 335" class="shift-arrow" marker-end="url(#wage-arrow)"/>` : '';
    const newSupplyEq = supplyShift ? `
      <path d="M330 390 L770 120" class="supply-line shifted"/>
      ${label(774, 122, 'S₂', 'curve-label shifted')}
      ${line(125, 283, 505, 283, 'guide new')}${line(505, 283, 505, 410, 'guide new')}
      <circle cx="505" cy="283" r="7" class="point new"/>${label(515, 277, 'E₂', 'point-label new')}
      ${label(84, 290, 'W₂', 'axis-value new')}${label(493, 444, 'L₂', 'axis-value new')}
      <path d="M485 175 L538 175" class="shift-arrow" marker-end="url(#wage-arrow)"/>` : '';
    const surplus = binding ? `
      ${line(337, 180, 337, 410, 'guide new')}${line(583, 180, 583, 410, 'guide new')}
      <circle cx="337" cy="180" r="7" class="point new"/><circle cx="583" cy="180" r="7" class="point new"/>
      ${label(320, 439, 'Lᴅ', 'axis-value new')}${label(569, 439, 'Lˢ', 'axis-value new')}
      <path d="M353 205 L568 205" class="gap-line" marker-end="url(#wage-arrow)"/>
      ${label(354, 157, 'surplus of labour', 'gap-label')}` : '';
    const mobileEq = stage !== 'curves' ? `
      ${line(45, 151, 180, 151, 'guide')}${line(180, 151, 180, 265, 'guide')}
      <circle cx="180" cy="151" r="4" class="point"/>${label(10, 156, 'W₁', 'axis-value')}${label(171, 286, 'L₁', 'axis-value')}` : '';
    const mobileShift = shift ? `
      <path d="M130 54 L303 248" class="demand-line shifted"/>
      <circle cx="204" cy="131" r="4" class="point new"/>
      ${line(45, 131, 204, 131, 'guide new')}${line(204, 131, 204, 265, 'guide new')}
      ${label(10, 134, 'W₂', 'axis-value new')}${label(197, 303, 'L₂', 'axis-value new')}${label(302, 249, 'D₂', 'curve-label')}` : '';
    const mobileSupplyShift = supplyShift ? `
      <path d="M130 248 L310 54" class="supply-line shifted"/>
      <circle cx="200" cy="173" r="4" class="point new"/>
      ${line(45, 173, 200, 173, 'guide new')}${line(200, 173, 200, 265, 'guide new')}
      ${label(10, 178, 'W₂', 'axis-value new')}${label(196, 303, 'L₂', 'axis-value new')}${label(310, 56, 'S₂', 'curve-label')}` : '';
    const mobileFloor = floor ? `${line(45, binding ? 103 : 205, 318, binding ? 103 : 205, 'floor-line')}
      ${label(278, binding ? 94 : 197, 'floor', 'floor-label')}` : '';
    const mobileSurplus = binding ? `
      ${line(135, 103, 135, 265, 'guide new')}${line(225, 103, 225, 265, 'guide new')}
      <circle cx="135" cy="103" r="4" class="point new"/><circle cx="225" cy="103" r="4" class="point new"/>
      ${label(119, 286, 'Lᴅ', 'axis-value new')}${label(215, 286, 'Lˢ', 'axis-value new')}
      ${label(117, 75, 'surplus of labour', 'gap-label')}` : '';
    return `<div class="wage-diagram" role="img" aria-label="Labour market diagram: ${stage.replaceAll('-', ' ')}">
      <svg class="wage-diagram-desktop" viewBox="0 0 900 480" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="wage-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0 0 L12 6 L0 12" fill="#166c72"/></marker></defs>
        ${line(125, 410, 800, 410, 'axis')}${line(125, 410, 125, 63, 'axis')}
        ${label(318, 471, 'Quantity of labour (workers)', 'axis-label')}
        <text x="26" y="286" transform="rotate(-90 26 286)" class="axis-label">Wage rate</text>
        <path d="M240 120 L680 390" class="demand-line"/>
        <path d="M240 390 L680 120" class="supply-line"/>
        ${label(684, 400, shift ? 'D₁' : 'D', 'curve-label')}
        ${label(684, 116, supplyShift ? 'S₁' : 'S', 'curve-label')}
        ${originalEq}${newEq}${newSupplyEq}${floorLine}${surplus}
      </svg>
      <svg class="wage-diagram-mobile" viewBox="0 0 360 320" xmlns="http://www.w3.org/2000/svg">
        ${line(45, 265, 323, 265, 'axis')}${line(45, 265, 45, 30, 'axis')}
        ${label(146, 315, 'Labour', 'axis-label')}${label(4, 25, 'Wage', 'axis-label')}
        <path d="M90 54 L270 248" class="demand-line"/>
        <path d="M90 248 L270 54" class="supply-line"/>
        ${label(274, 253, shift ? 'D₁' : 'D', 'curve-label')}${label(274, 56, supplyShift ? 'S₁' : 'S', 'curve-label')}
        ${mobileEq}${mobileShift}${mobileSupplyShift}${mobileFloor}${mobileSurplus}
      </svg>
      <p class="wage-diagram-caption">${stage === 'curves' ? 'Employers demand labour; workers supply labour.' : shift ? 'Higher demand for workers raises the equilibrium wage and employment.' : supplyShift ? 'More qualified workers lower the equilibrium wage and raise employment.' : binding ? 'At this wage, more workers offer labour than firms want to hire.' : stage === 'below-floor' ? 'A floor below the market wage does not change the equilibrium.' : 'Demand and supply meet at the equilibrium wage and employment.'}</p>
    </div>`;
  }
  IGCSE.renderVisual = (visual, id) => visual?.type === 'wageDiagram'
    ? diagram(visual.stage || 'curves')
    : original(visual, id);
})();
