/* Lesson-local compositions. The course renderer owns navigation, notes and reversible reveal progress. */
(() => {
  'use strict';
  const lesson = window.INVESTMENT_COURSE.lesson;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const photo = p => `<img src="${esc(p.src)}" alt="${esc(p.alt)}" style="object-position:${esc(p.position || '50% 50%')}">`;
  const part = html => `<div class="partial-item mc-step" aria-hidden="true">${html}</div>`;
  const answer = (html, label='Show model') => `<details class="mc-answer"><summary>${label}</summary><div>${html}</div></details>`;
  const prompt = text => `<p class="mc-question">${esc(text)}</p>`;
  const formula = text => text ? `<p class="mc-formula-reference">${esc(text)}</p>` : '';
  const tokens = count => `<div class="mc-tokens" aria-label="${count} shares">${Array.from({length:count},()=>'<i aria-hidden="true"></i>').join('')}</div>`;
  const bars = (companies,field,label) => `<div class="mc-scale-chart" role="img" aria-label="${esc(label)}; common zero baseline">${companies.map(c=>`<div><span>${esc(c.name)}</span><div class="mc-track"><i style="width:${100*field(c)/Math.max(...companies.map(field))}%"></i></div><strong>${esc(c.capLabel)}</strong></div>`).join('')}</div>`;
  const examRow = (t,feedback) => `<div class="mc-exam-row"><div class="mc-exam-question"><b>${esc(t.label)}</b><p>${esc(t.text)} <strong>[${t.marks}]</strong></p></div>${feedback?part(`<p class="mc-mark-model">${esc(t.model)}</p>`):''}</div>`;
  const table = rows => `<table class="mc-table"><thead><tr><th>Company</th><th>Share price<br><span lang="zh-Hans">股价</span></th><th>Shares outstanding<br><span lang="zh-Hans">已发行在外股票</span></th></tr></thead><tbody>${rows.map(r=>`<tr>${r.map((v,i)=>`<${i?'td':'th'}${i?'':' scope="row"'}>${esc(v)}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</tbody></table>`;
  const icons = {
    news:'<rect x="12" y="12" width="64" height="60" rx="4"/><path d="M24 26h40M24 38h18M24 49h40M24 60h30"/>',
    profit:'<path d="M12 72h66M22 70V51h12v19M43 70V38h12v32M64 70V23h12v47M16 34l22-11 17 1L73 9M63 9h10v11"/>',
    value:'<circle cx="44" cy="27" r="14"/><path d="M16 74V59c0-17 56-17 56 0v15M44 45v29M31 61h26"/>',
    trade:'<path d="M11 27h59l-12-12M77 59H18l12 12"/><circle cx="44" cy="43" r="12"/>'
  };
  const icon = name => `<svg class="mc-concept-icon" viewBox="0 0 88 88" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
  const evidenceBar = (r,max) => `<div class="mc-evidence-row"><div><span>${esc(r.label)}</span><strong>${esc(r.display)}</strong></div><div class="mc-evidence-track"><i style="width:${r.value/max*100}%"></i>${r.low?`<b class="mc-range" style="left:${r.low/max*100}%;width:${(r.high-r.low)/max*100}%" aria-label="Range ${r.low} to ${r.high}"></b>`:''}</div></div>`;
  const render = {
    'photo-story': s => `<div class="mc-story-image">${photo(s.photo)}</div><div class="mc-story-copy"><p class="mc-story-event">${esc(s.eventLabel || s.prompt)}</p>${s.headline?`<p class="mc-story-headline">${esc(s.headline)}</p>`:''}<p class="mc-story-question">${esc(s.question)}</p></div>`,
    'causal-path': s => `${prompt(s.question)}<ol class="mc-causal-path">${s.stages.map((t,i)=>`<li>${part(`${icon(t.icon)}<span class="mc-path-number">0${i+1}</span><h2>${esc(t.heading)}</h2><p lang="zh-Hans">${esc(t.zh)}</p><p>${esc(t.text)}</p>${i<3?'<span class="mc-path-arrow" aria-hidden="true">→</span>':''}`)}</li>`).join('')}</ol><p class="mc-unit-help">${esc(s.footer)}</p>`,
    'two-way-path': s => `${prompt(s.question)}<div class="mc-two-way">${part(`<div class="mc-direction mc-direction-up"><strong>Positive surprise · 正面意外</strong><ol>${s.positive.map((t,i)=>`<li><span>0${i+1}</span><p>${esc(t)}</p></li>`).join('')}</ol></div>`)}${part(`<div class="mc-direction mc-direction-down"><strong>Negative surprise · 负面意外</strong><ol>${s.negative.map((t,i)=>`<li><span>0${i+1}</span><p>${esc(t)}</p></li>`).join('')}</ol></div>`)}</div><p class="mc-caution">${esc(s.footer)}</p>`,
    'concept-example': s => `<div class="mc-concept-example"><figure>${photo(s.photo)}</figure><div class="mc-concept-copy"><p class="mc-concept-definition">${esc(s.definition)}</p><div class="mc-concept-case"><span>${esc(s.exampleLabel)}</span><strong>${esc(s.example)}</strong></div><p class="mc-concept-takeaway">${esc(s.takeaway)}</p></div></div>`,
    'trade-mechanism': s => `${prompt(s.question)}<p class="mc-context">${esc(s.context)}</p><ol class="mc-trade-flow">${s.steps.map((step,i)=>`${i?'<li class="mc-trade-arrow" aria-hidden="true">→</li>':''}<li>${i?part(`<span>${esc(step[0])}</span><strong>${esc(step[1])}</strong>`):`<span>${esc(step[0])}</span><strong>${esc(step[1])}</strong>`}</li>`).join('')}</ol><p class="mc-unit-help mc-trade-note">${esc(s.footer)}</p>`,
    'surprise': s => `${prompt(s.question)}<p class="mc-context">${esc(s.context)}</p><div class="mc-surprise-bars">${s.bars.map((r,i)=>{const html=`<div class="mc-surprise-row"><span>${esc(r.label)}</span><div class="mc-evidence-track"><i style="width:${r.value/120*100}%"></i></div><strong>$${r.value}m</strong></div>`;return i===2?part(html):html;}).join('')}</div>${part(`<div class="mc-surprise-judgements">${s.judgements.map(t=>`<p><strong>${esc(t[0])}</strong><br>${esc(t[1])}</p>`).join('')}</div><p class="mc-caution">${esc(s.footer)}</p>`)}`,
    'event-evidence': s => `${prompt(s.question)}<p class="mc-event-date">${esc(s.event)}</p><div class="mc-event-grid"><div><h2>${esc(s.metric)}</h2>${evidenceBar(s.comparison[0],s.max)}${part(evidenceBar(s.comparison[1],s.max))}<p class="mc-zero-note">Common scale from zero · 从零开始</p></div>${part(`<div class="mc-price-result ${s.direction==='down'?'mc-price-result-down':''}"><span>Next closing price</span><strong>${esc(s.change)}</strong><small>${esc(s.priceDates[0])} → ${esc(s.priceDates[1])}</small></div>`)}</div>${part(`<div class="mc-event-explanation"><p>${s.chain.map(esc).join(' → ')}</p></div>`)}<p class="mc-unit-help">${esc(s.footer)}</p>`,
    'price-puzzle': s => `<p class="mc-context">${esc(s.support)}</p><div class="mc-photo-pair">${s.companies.map(c=>`<article class="mc-company mc-${c.tone}">${photo(c.photo)}<div><h2>${esc(c.name)}</h2><p><strong>$${c.price}</strong><span>per share · 每股</span></p></div></article>`).join('')}</div>${prompt(s.question)}`,
    'share-count': s => `${prompt(s.question)}<p class="mc-context">${esc(s.support)}</p><div class="mc-share-rows">${s.companies.map(c=>`<article class="mc-${c.tone}"><div class="mc-share-heading"><h2>${esc(c.name)} <small>$${c.price} per share</small></h2>${part(`<strong>${esc(c.sharesLabel)} shares</strong><div class="mc-track"><i style="width:${100*c.shares/15000}%"></i></div>`)}</div></article>`).join('')}</div>`,
    'ownership': s => `${prompt(s.question)}<div class="mc-ownership">${[s.left,s.right].map(c=>`<article><h2>${esc(c.title)}</h2><strong class="mc-big">${esc(c.count)}</strong>${part(`<p class="mc-calculation">${esc(c.calculation)}</p>`)}</article>`).join('')}</div>`,
    'formula': s => `<div class="mc-equation"><div><strong>Market cap</strong><span lang="zh-Hans">公司市值</span></div><b>=</b><div><strong>Share price</strong><span lang="zh-Hans">股价</span></div><b>×</b><div><strong>Shares<br>outstanding</strong><span lang="zh-Hans">已发行在外股票总数</span></div></div><div class="mc-unit-line"><span>Total value ($)</span><span>Price of one share ($)</span><span>Number of shares</span></div>${part(`<p class="mc-unit-example"><strong>${esc(s.example)}</strong></p><p class="mc-support">${esc(s.support)}<br><span lang="zh-Hans">股数以十亿计，计算出的金额也以十亿美元计。</span></p>`)}`,
    'worked-comparison': s => `${formula(s.formula)}${prompt(s.question)}<div class="mc-worked">${s.companies.map(c=>`<article class="mc-${c.tone}"><h2>${esc(c.name)}</h2><p class="mc-given">$${c.price} × ${esc(c.sharesLabel)} shares</p>${part(`<p class="mc-calculation">${c.shares>=1000?`$${c.price} × ${c.shares/1000} billion`:`$${c.price} × ${c.shares} million<br>= $${(c.price*c.shares).toLocaleString('en-US')} million`}<br><strong>= ${esc(c.capLabel)}</strong></p>`)}</article>`).join('')}</div>${part(`${bars(s.companies,c=>c.price*c.shares,'Approximate market cap in billions of dollars: Apple 4050, Costco 378.4')}<p class="mc-conclusion">${esc(s.conclusion)}</p>`)}<p class="mc-unit-help">${esc(s.support)}</p>`,
    'assessment': s => `${formula(s.formula)}${table(s.rows)}${prompt(s.question)}${s.unitHelp?`<p class="mc-unit-help">${esc(s.unitHelp)}</p>`:''}${answer(s.solutions.map(line=>`<p>${esc(line)}</p>`).join(''))}`,
    'scope': s => `${prompt(s.question)}<div class="mc-scope"><article><h2>${esc(s.claim)}</h2>${answer(`<p>${esc(s.answer)}</p>`,'Reveal judgement')}</article><article><h2>${esc(s.otherClaim)}</h2>${answer(`<p>${esc(s.otherAnswer)}</p>`,'Reveal judgement')}</article></div>`,
    'claim': s => `<blockquote>${esc(s.question)}</blockquote>${prompt(s.task)}${answer(`<p>${esc(s.answer)}</p>`,'Show explanation')}`,
    'summary': s => `<ol class="mc-summary">${s.items.map((r,i)=>`<li><span class="mc-summary-number">0${i+1}</span><div><h2>${esc(r[0])}</h2><p>${esc(r[1])}</p><p lang="zh-Hans">${esc(r[2])}</p></div></li>`).join('')}</ol>`,
    'split': s => `<div class="mc-split-photo">${photo(s.photo)}</div><div class="mc-split-copy">${prompt(s.question)}${answer(`<p>${esc(s.answer)}</p><p class="mc-support">${esc(s.support)}</p>`,'Reveal the effect')}</div>`,
    'chain': s => `<p class="mc-news">${esc(s.context)}</p>${prompt(s.question)}<ol class="mc-chain">${s.stages.map((t,i)=>`<li>${part(`<span class="mc-stage-number">${i+1}</span><div><strong>${esc(t[0])}</strong><p lang="zh-Hans">${esc(t[1])}</p></div>`)}</li>`).join('')}</ol><p class="mc-unit-help">${esc(s.footer)}</p>`,
    'change': s => `${formula(s.formula)}${prompt(s.question)}<div class="mc-change-pair"><article><h2>${esc(s.before[0])}</h2><p>${esc(s.before[1])}</p><strong>${esc(s.before[2])}</strong></article>${part(`<article><h2>${esc(s.after[0])}</h2><p>${esc(s.after[1])}</p><strong>${esc(s.after[2])}</strong></article>`)}</div>${part(`<p class="mc-conclusion">${esc(s.conclusion)}</p><p class="mc-caution">${esc(s.caution)}</p>`)}`,
    'split-model': s => `${prompt(s.question)}<div class="mc-split-model"><article><h2>${esc(s.before.title)}</h2>${tokens(2)}<strong>${esc(s.before.count)}</strong><p>${esc(s.before.price)}</p><p class="mc-split-value">${esc(s.before.value)}</p></article><article><h2>${esc(s.after.title)}</h2>${part(`${tokens(20)}<strong>${esc(s.after.count)}</strong>`)}${part(`<p>${esc(s.after.price)}</p>`)}${part(`<p class="mc-split-value">${esc(s.after.value)}</p>`)}</article></div>${part(`<p class="mc-conclusion">${esc(s.footer)}</p>`)}<p class="mc-unit-help">${esc(s.support)}</p>`,
    'exam': s => `<p class="mc-exam-context">${esc(s.context)}</p><p class="mc-unit-help">${esc(s.support)}</p><div class="mc-exam ${s.feedback?'mc-exam-feedback':'mc-exam-task'}">${s.tasks.map(t=>examRow(t,s.feedback)).join('')}</div>`,
    'exit': s => `<p class="mc-exam-context">${esc(s.context)}</p><p class="mc-unit-help">${esc(s.support)}</p><div class="mc-exit">${s.tasks.map(t=>`<div>${examRow(t,false)}${answer(`<p>${esc(t.model)}</p>`,'Show marking guide')}</div>`).join('')}</div>`
  };
  for (const el of document.querySelectorAll('.market-cap-lesson .slide')) {
    const s = lesson.slides[Number(el.dataset.index)];
    if (s.scene) {
      el.classList.add('mc-scene', `mc-scene-${s.scene}`);
      el.querySelector('.slide-body').innerHTML = render[s.scene](s);
      el.querySelector('.slide-body').classList.remove('slide-body--formula');
      if(el.querySelector('.partial-item')) el.classList.add('has-partials');
    }
    if (s.afterDefinition) {
      const p=document.createElement('p');p.className='mc-definition-support';
      p.innerHTML=s.afterDefinition.split('\n').map((line,i)=>`<span${i?' lang="zh-Hans"':''}>${esc(line)}</span>`).join('');
      el.querySelector('.slide-body').append(p);
    }
    if(s.backdrop) {
      el.classList.add('mc-photo-section');
      const figure=document.createElement('div');figure.className='mc-section-photo';figure.innerHTML=photo(s.backdrop);el.prepend(figure);
    }
    if(s.sources?.length || s.photo?.credit) {
      const button=document.createElement('button');button.type='button';button.className='mc-source';button.textContent='Sources';button.setAttribute('aria-label','Open sources and teacher notes');
      button.addEventListener('click',e=>{e.stopPropagation();if(document.querySelector('#notesPanel').getAttribute('aria-hidden')==='true')document.querySelector('#notesButton').click();});el.append(button);
    }
  }
})();
