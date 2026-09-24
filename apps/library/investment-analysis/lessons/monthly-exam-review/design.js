(function () {
  const lesson = window.INVESTMENT_COURSE.lesson;
  const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const math = v => v && typeof v === 'object' ? `<span class="math-expression">${esc(v.before)}<span class="math-fraction"><span>${esc(v.fraction[0])}</span><span>${esc(v.fraction[1])}</span></span>${esc(v.after)}</span>` : esc(v).replace(/\^([a-z]|\d+)/gi,'<sup>$1</sup>');
  const part = html => `<div class="partial-item" aria-hidden="true">${html}</div>`;
  const context = s => s.context ? `<p class="rv-context">${esc(s.context)}</p>` : '';
  const question = s => `<p class="rv-question">${esc(s.question)}</p>`;
  const details = (html,label='Show model') => `<details class="rv-answer"><summary>${label}</summary><div>${html}</div></details>`;
  const steps = s => s.map(t=>`<p class="rv-step">${math(t)}</p>`).join('');
  const grid = (n,owned) => `<div class="rv-tokens" role="img" aria-label="${owned} owned shares out of ${n}">${Array.from({length:n},(_,i)=>`<i class="${i<owned?'owned':''}"></i>`).join('')}</div>`;
  const render = {
    format:s=>`<table class="rv-format"><tbody>${s.rows.map(r=>`<tr>${r.map((c,i)=>`<${i?'td':'th'}>${esc(c)}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</tbody></table><p class="rv-footer">${esc(s.footer)}</p>`,
    matching:s=>`<p class="rv-instruction">Match each statement to a letter. Use each letter once.</p><div class="rv-match"><ol class="rv-bank">${s.bank.map(t=>`<li>${esc(t)}</li>`).join('')}</ol><ol class="rv-statements">${s.items.map(t=>`<li>${esc(t)}</li>`).join('')}</ol></div>${details(`<div class="rv-key">${s.answers.map(t=>`<span>${esc(t)}</span>`).join('')}</div>`,'Show matches')}`,
    calculation:s=>`${context(s)}<div class="rv-formula">${math(s.formula)}${s.percentageFormula?`<div>${math({before:'Return percentage = ',fraction:['total return amount','starting value'],after:' × 100'})}</div>`:''}</div><div class="rv-calculation"><dl>${s.rows.map(r=>`<div><dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd></div>`).join('')}</dl><div><ol class="rv-tasks">${s.questions.map(t=>`<li>${esc(t)}</li>`).join('')}</ol>${details(steps(s.steps))}</div></div>`,
    cashflow:s=>`${context(s)}<div class="rv-waterfall">${s.changes.map((r,i)=>part(`<article class="${i===2?'external':''}"><span>${esc(r[0])}</span><strong>${esc(r[1])}</strong><p>${esc(r[2])}</p></article>`)).join('')}</div>${question(s)}${details(`<p>${esc(s.answer)}</p>`,'Show return')}`,
    growth:s=>`${context(s)}<div class="rv-growth-legend"><span>■ Simple interest</span><span>■ Compound interest</span></div><div class="rv-growth">${s.rows.map((r,i)=>{const row=`<div class="rv-growth-row"><b>${esc(r[0])}</b><div><div class="rv-track"><i style="width:${r[1]/1400*100}%"></i><span>$${r[1].toLocaleString()}</span></div><div class="rv-track compound"><i style="width:${r[2]/1400*100}%"></i><span>$${r[2].toLocaleString()}</span></div></div></div>`;return i?part(row):row;}).join('')}</div><p class="rv-footer">${esc(s.footer)}</p>`,
    split:s=>`${context(s)}${question(s)}<div class="rv-split"><article><h2>Before · 拆股前</h2>${grid(40,4)}<p>4 of 40 shares · $20 each</p></article>${part(`<article><h2>After · 拆股后</h2>${grid(80,8)}<p>8 of 80 shares · $10 each</p></article>`)}</div>${details(`<p>${esc(s.answer)}</p><p>${esc(s.footer)}</p>`,'Show comparison')}`,
    expectations:s=>`${context(s)}<div class="rv-expectations"><div><p class="rv-unit">Profit · $ million</p>${s.bars.map((r,i)=>{const bar=`<div class="rv-evidence"><span>${esc(r[0])}</span><div class="rv-track"><i style="width:${r[1]/110*100}%"></i></div><b>${r[1]}</b></div>`;return i===2?part(bar):bar;}).join('')}</div><div>${question(s)}${details(steps(s.steps),'Show explanation')}</div></div><p class="rv-footer">${esc(s.footer)}</p>`,
    check:s=>`<ol class="rv-check">${s.items.map(t=>`<li>${esc(t)}</li>`).join('')}</ol><p class="rv-footer">${esc(s.footer)}</p>`,
    summary:s=>`<ol class="rv-summary">${s.items.map(r=>`<li><div><h2>${esc(r[0])}</h2><p>${esc(r[1])}</p><p lang="zh-Hans">${esc(r[2])}</p></div></li>`).join('')}</ol>`,
    'dividend-chart':s=>`${context(s)}<div class="rv-chart-layout"><svg viewBox="0 0 500 280" role="img" aria-label="Dividend per share: first payment 0.20 dollars; later payment 0.25 dollars. Zero baseline."><text x="40" y="25">Dividend per share ($)</text>${[0,.1,.2,.3].map((v,i)=>`<line x1="70" y1="${225-i*60}" x2="470" y2="${225-i*60}" stroke="#c7c2b8"/><text x="15" y="${230-i*60}">${v.toFixed(2)}</text>`).join('')}<rect x="130" y="105" width="95" height="120" fill="#164b3e"/><rect x="300" y="75" width="95" height="150" fill="#c96d3f"/><text x="160" y="95">0.20</text><text x="330" y="65">0.25</text><text x="130" y="260">Earlier</text><text x="310" y="260">Later</text></svg><div>${question(s)}${details(steps(s.steps))}</div></div>`,
    'path-chart':s=>`${context(s)}<div class="rv-chart-layout"><svg viewBox="0 0 500 300" role="img" aria-label="Hypothetical reinvested value: start 100, year 1 112, year 2 105, year 3 126 dollars. Vertical axis starts at zero."><text x="40" y="25">Investment value ($)</text>${[0,50,100,150].map((v,i)=>`<line x1="60" y1="${250-i*70}" x2="480" y2="${250-i*70}" stroke="#c7c2b8"/><text x="10" y="${255-i*70}">${v}</text>`).join('')}<polyline points="${s.points.map((v,i)=>`${80+i*125},${250-v*1.4}`).join(' ')}" fill="none" stroke="#164b3e" stroke-width="4"/>${s.points.map((v,i)=>`<circle cx="${80+i*125}" cy="${250-v*1.4}" r="6" fill="#c96d3f"/><text x="${65+i*125}" y="${233-v*1.4}">${v}</text><text x="${60+i*125}" y="280">${i?'Year '+i:'Start'}</text>`).join('')}</svg><div>${question(s)}${details(steps(s.steps))}</div></div>`
  };
  for(const el of document.querySelectorAll('.review-lesson .slide')) {
    const s = lesson.slides[Number(el.dataset.index)];
    el.querySelectorAll('.mcq-option').forEach((option,i)=>{const label=document.createElement('span');label.className='rv-letter';label.textContent='ABCD'[i]+' · ';option.prepend(label);});
    if(s.scene) {
      el.classList.add('rv-scene',`rv-${s.scene}`);
      const body=el.querySelector('.slide-body');body.innerHTML=render[s.scene](s);
      if(el.querySelector('.partial-item'))el.classList.add('has-partials');
    }
    if(s.backdrop){el.classList.add('rv-photo-section');const img=document.createElement('img');img.className='rv-section-photo';img.src=s.backdrop.src;img.alt=s.backdrop.alt;el.prepend(img);}
    if(s.sources?.length){const button=document.createElement('button');button.className='rv-source';button.textContent='Sources';button.addEventListener('click',()=>{if(document.querySelector('#notesPanel').getAttribute('aria-hidden')==='true')document.querySelector('#notesButton').click();});el.append(button);}
  }
})();
