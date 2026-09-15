/* Presentation-only refinement for the two 4.4.3 decks.
   Keep original text and interactive nodes: sources, blanks and partial reveals
   remain owned by the IGCSE renderer. No authoring-content duplication. */
(() => {
 'use strict';
 const slides=[...document.querySelectorAll('.ssp-classroom #deck .slide')];
 if(!slides.length)return;
 const icons={
  skills:'<path d="M10 17q11-6 22 0v34q-11-6-22 0zm44 0q-11-6-22 0v34q11-6 22 0z"/><path d="m17 26 8-1m-8 9 8-1m14-7 8 1m-8 7 8 1"/>',
  factory:'<path d="M8 53V30l16-9v12l16-9v29zm35-29V10h10v43H8"/><path d="M16 42h4m10 0h4m12 0h4"/>',
  output:'<path d="m10 19 12-6 12 6-12 6zm0 0v15l12 6 12-6V19M22 25v15m8 1 12-6 12 6-12 6zm0 0v14l12 6 12-6V41M42 47v14"/>',
  mobility:'<circle cx="22" cy="15" r="7"/><path d="m16 51 5-14-8-6 8-9 10 7 8 1m-18 7 10 6 4 12M39 15h18m-5-5 5 5-5 5"/>',
  vacancy:'<rect x="12" y="21" width="41" height="30" rx="4"/><path d="M23 21v-9h18v9m-29 24h41m-26-1v7h11v-7"/>',
  employment:'<circle cx="25" cy="18" r="9"/><path d="M9 54v-7a16 16 0 0 1 28-10m6 8 7 7 12-17"/>',
  costs:'<ellipse cx="26" cy="17" rx="16" ry="7"/><path d="M10 17v13c0 9 32 9 32 0V17M10 29v13c0 8 25 9 32 3m10-29v34m-8-8 8 8 8-8"/>',
  prices:'<path d="m9 18 26-7 21 24-21 18L9 29z"/><circle cx="21" cy="23" r="3"/><path d="m32 30 5 6 11-9"/>',
  globe:'<circle cx="32" cy="32" r="23"/><ellipse cx="32" cy="32" rx="11" ry="23"/><path d="M9 32h46M15 17h34M15 47h34"/>',
  demand:'<path d="M8 19h7l6 25h30l6-18H17m7 10h24"/><circle cx="25" cy="53" r="3"/><circle cx="47" cy="53" r="3"/><path d="M40 20V7m-5 5 5-5 5 5"/>',
  exports:'<path d="M10 33h44l-8 18H20zm8-14h14v14H18zm15 0h13v14H33zM6 58q6-6 13 0 6-6 13 0 6-6 13 0 6-6 13 0M37 9h18m-6-6 6 6-6 6"/>',
  income:'<path d="M8 24h47v29H8zM8 24v-8l35-6v14"/><path d="M43 34h15v12H43z"/><circle cx="49" cy="40" r="1"/>',
  domestic:'<path d="m8 31 24-22 24 22M15 26v29h34V26M26 55V36h13v19m-18-31h7"/>',
  tax:'<path d="M15 7h34v50l-6-4-6 4-6-4-6 4-10-4zM23 17h18m-18 9h18m-18 9h9m7-1 9 9m0-9-9 9"/>',
  balance:'<path d="M32 9v46M13 19h38M22 55h20M14 20 5 39h18zm36 0-9 19h18z"/>',
  clock:'<circle cx="32" cy="32" r="23"/><path d="M32 16v18l12 8"/>',
  investment:'<path d="M10 52h45M16 45V32h8v13m8 0V23h8v22m8 0V12h8v33M11 23l15-10 11 4 16-12"/>',
  access:'<circle cx="16" cy="22" r="7"/><circle cx="47" cy="22" r="7"/><path d="M5 52V42a11 11 0 0 1 22 0v10m9 0V42a11 11 0 0 1 22 0v10M26 13h11m-7-5 6 5-6 5"/>',
  protection:'<path d="m32 7 22 9v16c0 14-22 25-22 25S10 46 10 32V16z"/><path d="m20 31 8 9 17-19"/>',
  hospital:'<path d="M12 55V17h40v38zM25 11h14v16H25zm-6 24h6m14 0h6m-26 9h6m14 0h6M28 55V43h8v12"/>',
  transfer:'<path d="M7 22h45m-9-9 9 9-9 9M57 44H12m9-9-9 9 9 9"/>',
  judgement:'<path d="m14 42 25-25m-11-6 16 16m-6-20 10 10m-29 3 10 10M8 49h17m14-10h17v16H39z"/>',
 };
 const icon=name=>`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.factory}</svg>`;
 const arrow='<svg viewBox="0 0 64 24" preserveAspectRatio="none" aria-hidden="true"><path d="M2 12h54m-5-7 5 7-5 7" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"/></svg>';
 const flows={
  'Effect on economic growth':['skills','factory','output'],
  'Effect on unemployment':['skills','mobility','vacancy','employment'],
  'Effect on price stability':['factory','costs','prices'],
  'Effect on export revenue':['costs','globe','demand','exports'],
  'Effect on import expenditure':['domestic','transfer','costs'],
  'Growth can improve government finances':['employment','income','tax','balance']
 };
 // Preserve the teaching relationship: two conditions differ from a sequence or
 // a comparison. The content lives only in slides-lesson-*.js.
 const cardDesigns={
  'When productivity gains do not lower inflation':['paired',['costs','demand']],
  'Short-run demand may rise before supply':['sequence',['investment','clock']],
  'Skills must match available jobs':['paired',['skills','vacancy']],
  'Skilled workers may emigrate':['sequence',['skills','globe']],
  'Access affects income distribution':['comparison',['access','access']],
  'Opportunity cost is the alternative forgone':['paired',['tax','hospital']],
  'Tax cuts may not finance new investment':['sequence',['tax','investment']],
  'Privatisation changes more than ownership':['paired',['balance','access']],
  'Deregulation and flexibility involve trade-offs':['comparison',['factory','protection']],
  'Education can widen the budget deficit first':['comparison',['clock','investment']],
  'Develop both sides of a Discuss answer':['principles',['factory','protection','judgement']],
  'Effect on the current account':['balance',['exports','domestic','balance']],
  'Spending now, benefits later':['timeline',['investment','clock','factory']],
 };
 const summaryIcons={'Growth and employment':'factory','Prices':'prices','Competitiveness':'globe','Explain conditions':'skills','Compare costs and timing':'clock','Discuss both sides':'judgement'};
 const bilingual=element=>{
  if(!element||element.children.length)return;
  const text=element.textContent.trim();
  const match=text.match(/^(.+?)\s+([\u3400-\u9fff].*)$/);
  if(match){element.textContent=match[1];const zh=document.createElement('span');zh.className='ssp-card-zh';zh.lang='zh-Hans';zh.textContent=match[2];element.append(zh);}
 };
 slides.forEach((slide,i)=>{
  const data=window.IGCSE.lesson.slides[i];
  const stack=slide.querySelector('.content > main > div');
  const isDiagram=['ppc-teaching','ssp-capacity-scene'].includes(data.layout);
  if(stack&&!isDiagram)stack.classList.add('ssp-content-stack');
  if(data.type==='flow'){
   slide.classList.add('ssp-causal');
   const nodes=[...slide.querySelectorAll('.flowChip')];
   slide.style.setProperty('--ssp-stages',nodes.length);
   nodes.forEach((node,n)=>{
    const glyph=document.createElement('div');glyph.className='ssp-flow-glyph';glyph.innerHTML=icon((flows[data.title]||[])[n]);
    node.prepend(glyph);
    node.querySelector('.flowNumber').textContent=String(n+1).padStart(2,'0');
    if(n<nodes.length-1){const link=document.createElement('span');link.className='ssp-flow-link';link.innerHTML=arrow;node.append(link);}
   });
  }
  if(data.type==='cards'&&!isDiagram){
   const design=data.title==='Summary'?['summary',data.cards.map(card=>summaryIcons[card.title])]:cardDesigns[data.title];
   if(design){
    slide.classList.add(`ssp-${design[0]}`);
    slide.querySelectorAll('.cardgrid>.card').forEach((card,n)=>{
     const glyph=document.createElement('div');glyph.className='ssp-card-glyph';glyph.innerHTML=icon(design[1][n]);card.prepend(glyph);
     bilingual(card.querySelector('.cardTitle'));
    });
   }
  }
  if(data.type==='classificationTask')slide.dataset.sspItems=data.items.length;
  if(data.type==='modelAnswer'){
   const reference=slide.querySelector('.examSpecChips');
   if(reference)reference.classList.add('ssp-paper-reference');
  }
  if(data.layout==='ssp-costs'){
   slide.classList.add('ssp-calculation');
   slide.querySelectorAll('.cardBody').forEach(body=>{
    const text=body.textContent;
    const parts=text.match(/^(¥[\d,]+) total cost ÷ (\d+) units = (¥\d+) per unit\.$/);
    if(!parts)return;
    body.setAttribute('role','img');
    body.setAttribute('aria-label',text);
    body.innerHTML=`<div class="ssp-fraction" aria-hidden="true"><span>${parts[1]}</span><span>${parts[2]} units</span></div><span class="ssp-equals" aria-hidden="true">=</span><div class="ssp-cost-result" aria-hidden="true"><strong>${parts[3]}</strong><span>per unit</span></div>`;
   });
  }
 });
})();
