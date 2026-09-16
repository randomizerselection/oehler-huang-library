/* Lesson-local screenshot annotations. Shared navigation and reveal state stay
   owned by the Investment renderer; source images are never modified. */
(() => {
  'use strict';
  const lesson=window.INVESTMENT_COURSE.lesson;
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const bi=v=>String(v).split(/\n|\s\/\s/).map(t=>`<span${/[\u3400-\u9fff]/.test(t)?' class="ft-zh" lang="zh-Hans"':''}>${esc(t)}</span>`).join('');
  for(const slide of document.querySelectorAll('.first-trades .slide')){
    const item=lesson.slides[Number(slide.dataset.index)];
    if(item.id==='beijing-trading-times')slide.classList.add('ft-hours');
    if(item.sources?.length&&slide.querySelector('.slide-header')){
      const b=document.createElement('button');b.type='button';b.className='ft-source';b.textContent='Sources';b.setAttribute('aria-label','Open sources and teacher notes');
      b.addEventListener('click',e=>{e.stopPropagation();if(document.getElementById('notesPanel').getAttribute('aria-hidden')==='true')document.getElementById('notesButton').click();});
      slide.querySelector('.slide-header').append(b);
    }
    slide.querySelectorAll('.form-card h2,.form-card p,.compare-card h2,.compare-card p,.compare-card strong,.lesson-table th,.lesson-table td>span,.table-interpretation').forEach(n=>{
      if(!n.children.length)n.innerHTML=bi(n.textContent);
    });
    if(item.screenshot){
      slide.classList.add('ft-screen');
      if(item.narrowScreenshot)slide.classList.add('ft-screen-narrow');
      const s=item.screenshot,[x,y,w,h]=s.crop;
      const scene=document.createElement('div');scene.className='ft-walkthrough';
      const boxes=s.boxes.map(([bx,by,bw,bh],i)=>`<div class="ft-highlight ft-color-${i}" style="left:${(bx-x)/w*100}%;top:${(by-y)/h*100}%;width:${bw/w*100}%;height:${bh/h*100}%"><span class="ft-pin">${i+1}</span></div>`).join('');
      scene.innerHTML=`<figure class="ft-shot"><div class="ft-shot-frame" style="aspect-ratio:${w}/${h}"><div class="ft-shot-image"><img src="${esc(s.src)}" alt="${esc(s.alt)} — supplied Stock Market Game screenshot" style="width:${s.size[0]/w*100}%;left:${-x/w*100}%;top:${-y/h*100}%"></div>${boxes}</div><figcaption>Stock Market Game · supplied 16 Sep 2026 · screenshot detail</figcaption></figure><ol class="ft-annotations">${item.rows.map((r,i)=>`<li class="ft-color-${i}"><span class="ft-note-number" aria-hidden="true">${i+1}</span><div><h2>${bi(r[0])}</h2><p>${bi(r[1])}</p></div></li>`).join('')}</ol>`;
      slide.querySelector('.slide-body').replaceChildren(scene);
    }
    if(item.balanceCards){
      slide.classList.add('ft-balances');
      const cards=document.createElement('div');cards.className='ft-balance-grid';
      cards.innerHTML=item.rows.map(r=>{const [amount,...meaning]=r[1].split(' · ');return `<article><h2>${bi(r[0])}</h2><strong>${esc(amount)}</strong><p>${bi(meaning.join(' · '))}</p></article>`;}).join('');
      slide.querySelector('table').replaceWith(cards);
    }
    if(item.ownership){
      slide.classList.add('ft-ownership');
      const grid=document.createElement('div');grid.className='ft-share-grid';grid.setAttribute('role','img');grid.setAttribute('aria-label','100 equal ownership pieces. Ten are highlighted when Emma’s purchase is revealed.');
      grid.innerHTML=Array.from({length:100},(_,i)=>`<i class="${i<10?'ft-emma-share':''}"></i>`).join('');
      slide.querySelector('.table-scene').prepend(grid);
    }
    if(item.afterDefinition){
      const aside=document.createElement('p');aside.className='ft-definition-extra';aside.innerHTML=bi(item.afterDefinition.join('\n'));
      slide.querySelector('.slide-body').append(aside);
    }
    if(item.id==='team-strategy'||item.id==='team-ticket')slide.classList.add('ft-team');
  }
})();
