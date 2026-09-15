/* Lesson-local visual adaptation. Content stays in slides.js; the Investment
   renderer retains navigation, answers and reversible partial-reveal state. */
(() => {
 'use strict';
 const lesson=window.INVESTMENT_COURSE.lesson;
 const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const bi=v=>String(v).split(/\n|\s\/\s/).map(t=>`<span${/[\u3400-\u9fff]/.test(t)?' class="ft-zh" lang="zh-Hans"':''}>${esc(t)}</span>`).join('');
 const paths={
 shop:'<path d="M10 25h44v30H10zM7 25l7-16h36l7 16M24 55V37h16v18M9 25q7 12 15 0 8 12 16 0 8 12 15 0"/>',
 costs:'<ellipse cx="25" cy="18" rx="16" ry="7"/><path d="M9 18v14c0 9 32 9 32 0V18M9 31v13c0 8 25 9 32 3M51 15v33m-7-7 7 7 7-7"/>',
 research:'<circle cx="26" cy="26" r="17"/><path d="m39 39 17 17M18 30l7-9 10 5"/>',
 report:'<path d="M14 8h27l10 10v38H14zM41 8v12h10M23 30h19M23 40h19M23 49h12"/>',
 shield:'<path d="m32 7 22 9v16c0 14-22 25-22 25S10 46 10 32V16zM20 31l8 9 17-19"/>',
 identity:'<rect x="7" y="13" width="50" height="39" rx="5"/><circle cx="21" cy="27" r="6"/><path d="M13 44a8 8 0 0 1 16 0M37 25h12M37 34h12M37 43h8"/>',
 wallet:'<path d="M8 24h47v29H8zM8 24v-8l35-6v14M43 34h15v12H43z"/><circle cx="49" cy="40" r="1"/>',
 clock:'<circle cx="32" cy="32" r="23"/><path d="M32 16v18l12 8"/>',
 send:'<path d="m7 30 50-21-19 48-8-19-23-8zM30 38 57 9"/>',
 check:'<circle cx="32" cy="32" r="23"/><path d="m19 32 9 9 18-21"/>',
 team:'<circle cx="22" cy="19" r="8"/><circle cx="45" cy="22" r="7"/><path d="M7 55V43a15 15 0 0 1 30 0v12M39 36a13 13 0 0 1 18 12v7"/>',
 limit:'<path d="M9 16h46M15 27v25h34V27M32 25v19m-8-8 8 8 8-8"/>',
 shares:'<path d="M13 10h31v41H13zM44 17h8v40H21M22 20h13M22 30h13M22 40h8"/>'};
 const icon=n=>`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[n]||paths.report}</svg>`;
 const glyph=n=>`<div class="ft-glyph">${icon(n)}</div>`;
 const el=id=>document.querySelector(`[data-slide-id="${id}"]`);
 const data=id=>lesson.slides.find(s=>s.id===id);
 const panel=(html,old)=>`<article class="ft-panel ${old.classList.contains('partial-item')?'partial-item':''}${old.classList.contains('is-visible')?' is-visible':''}" aria-hidden="${old.getAttribute('aria-hidden')||'false'}">${html}</article>`;
 for(const slide of document.querySelectorAll('.first-trades .slide')){
  const item=lesson.slides[Number(slide.dataset.index)];
  if(item.sources?.length&&slide.querySelector('.slide-header')){
   const b=document.createElement('button');b.type='button';b.className='ft-source';b.textContent='Sources';b.setAttribute('aria-label','Open sources and teacher notes');
   b.addEventListener('click',e=>{e.stopPropagation();if(document.getElementById('notesPanel').getAttribute('aria-hidden')==='true')document.getElementById('notesButton').click();});
   slide.querySelector('.slide-header').append(b);
  }
  slide.querySelectorAll('.retrieval-answer').forEach(a=>[...a.querySelectorAll('.retrieval-equation')].at(-1)?.classList.add('ft-result'));
  slide.querySelectorAll('.form-card,.compare-card').forEach(card=>card.querySelectorAll('h2,p').forEach(n=>{
   // Preserve line boundaries already rendered as BR nodes.
   const text=[...n.childNodes].map(x=>x.nodeName==='BR'?'\n':x.textContent).join('');n.innerHTML=bi(text);
  }));
  slide.querySelectorAll('.lesson-table th,.lesson-table td>span,.table-interpretation').forEach(n=>{if(!n.children.length)n.innerHTML=bi(n.textContent);});
 }
 const amount=document.createElement('div');amount.className='ft-hero-amount';
 amount.innerHTML=`<strong>${esc(data('hero').subtitle.match(/\$[\d,]+/)[0])}</strong><span>Virtual team portfolio <span lang="zh-Hans">小组虚拟投资组合</span></span>`;
 el('hero').querySelector('.hero-zh').after(amount);
 el('hero').querySelector('.hero-subtitle').textContent=data('hero').subtitle.replace(/^Your team has \$[\d,]+\.\s*/, '');
 Object.entries({'business-to-return':['shop','costs','research'],'order-status':['send','clock','check'],'first-weekend-task':['research','wallet','team']}).forEach(([id,names])=>{
  el(id).classList.add('ft-illustrated');if(id==='business-to-return')el(id).classList.add('ft-causal');
  el(id).querySelectorAll('.form-card').forEach((c,i)=>c.insertAdjacentHTML('afterbegin',`<div class="ft-stage-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</div>${glyph(names[i])}`));
 });
 el('market-limit').querySelectorAll('.compare-card').forEach((c,i)=>c.insertAdjacentHTML('afterbegin',glyph(i?'limit':'clock')));
 ['research-record','order-check','summary'].forEach(id=>{
  const names=id==='research-record'?['shop','report','shield','identity']:id==='order-check'?['identity','shares','wallet','team']:['research','wallet','check'];
  el(id).classList.add('ft-record');el(id).querySelectorAll('tbody th').forEach((th,i)=>{const copy=document.createElement('div');while(th.firstChild)copy.append(th.firstChild);th.append(copy);th.insertAdjacentHTML('afterbegin',glyph(names[i]));});
 });
 const loss=el('position-loss'),oldLoss=[...loss.querySelectorAll('tbody tr')];
 const graphic=document.createElement('div');graphic.className='ft-exposure';
 const money=t=>Number(String(t).replace(/[^\d.-]/g,''));
 graphic.innerHTML=data('position-loss').rows.map((r,i)=>{
  const start=money(r[0]),end=money(r[1]),lost=start-end;
  const cells=Array.from({length:100},(_,n)=>`<i class="${n<end/1000?'ft-invested':n<start/1000?'ft-lost':'ft-cash'}"></i>`).join('');
  return panel(`<header><span>Amount invested <span class="ft-zh">投入金额</span></span><strong>${esc(r[0])}</strong></header><div class="ft-money-grid" role="img" aria-label="Of a $100,000 portfolio, ${end} dollars remain invested, ${lost} dollars are lost, and ${100000-start} dollars remain cash.">${cells}</div><div class="ft-loss-result"><span>Portfolio loss <span class="ft-zh">组合损失</span></span><strong>${esc(r[2])}</strong></div><p>Stock value after fall: <strong>${esc(r[1])}</strong></p>`,oldLoss[i]);
 }).join('');loss.querySelector('table').replaceWith(graphic);
 graphic.insertAdjacentHTML('afterend','<div class="ft-legend"><span>Each square = $1,000</span><span><i class="ft-invested"></i>Invested / 持仓</span><span><i class="ft-lost"></i>Lost / 损失</span><span><i class="ft-cash"></i>Cash / 现金</span></div>');
 const limit=el('limit-outcomes'),oldPrices=[...limit.querySelectorAll('tbody tr')];
 const prices=document.createElement('div');prices.className='ft-price-scenarios';
 prices.innerHTML=`<div class="ft-ceiling">${glyph('limit')}<span>Buy limit <span class="ft-zh">买入限价</span></span><strong>$48</strong></div><div class="ft-price-grid">${data('limit-outcomes').rows.map((r,i)=>panel(`<div class="ft-price-value">${esc(r[0])}</div><p>${esc(r[1])}</p><div class="ft-price-outcome ${i===2?'ft-no-fill':''}">${icon(i===2?'limit':'check')}<strong>${esc(r[2])}</strong></div>`,oldPrices[i])).join('')}</div>`;
 limit.querySelector('table').replaceWith(prices);
 const timeline=document.createElement('ol');timeline.className='ft-timeline';
 timeline.innerHTML=data('weekend-timing').rows.map((r,i)=>`<li>${glyph(['team','send','clock','check'][i])}<h2>${esc(r[0])}</h2><p>${bi(r[1])}</p></li>`).join('');
 el('weekend-timing').querySelector('table').replaceWith(timeline);
 el('exit-order').classList.add('ft-exit');
})();
