/* Lesson-owned adaptation of the latest A-level source controls.
   Uses this lesson's verified records; no cross-course renderer dependency. */
(() => {
  'use strict';
  const slides=[...document.querySelectorAll('#deck .slide')];
  if(!slides.length || !document.body.classList.contains('population-classroom')) return;
  const lesson=window.IGCSE.lesson;
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function records(s) {
    const list=(s.sources||[]).map(r=>({type:r.label,ref:r.ref,detail:[r.label==='Question paper'?s.context:'',r.note,r.question,r.extract].filter(Boolean).join('\n\n'),url:r.url}));
    if(s.type==='quiz'){
      const q=list.find(r=>r.type==='Question paper');
      if(q){q.choices=s.choices;q.columns=s.optionColumns;q.table=s.dataTable;}
    }
    if(s.type==='modelAnswer')list.push({type:'Teaching model',ref:'Teacher-written answer; separate from the official scheme',detail:s.answer});
    if(s.type==='classificationTask')list.push({type:'Teaching model',ref:'Teacher-written retrieval or application',detail:s.items.map(x=>x.text+'\n'+x.answer).join('\n\n')});
    if(s.notes&&s.layout?.startsWith('population-'))list.push({type:'Teaching notes',ref:'Explanation, assumptions and classroom use',detail:s.notes});
    if(s.visual?.source)list.push({type:'Photo',ref:s.visual.alt,detail:s.visual.credit,url:s.visual.source});
    (s.cardVisuals||[]).forEach(v=>{if(v?.source||v?.credit)list.push({type:'Photo',ref:v.alt,detail:v.credit,url:v.source});});
    return list;
  }
  const markSchemeMarkup=detail=>escape(detail).replace(/([^.;:\n]*?\(\d+\))/g,'<mark>$1</mark>').replace(/(Official answer:\s*[A-D])/g,'<mark>$1</mark>');
  const dialog=document.createElement('dialog');
  dialog.className='classroom-source-dialog';
  dialog.setAttribute('aria-labelledby','classroomSourceTitle');
  dialog.innerHTML='<header class="classroom-dialog-head"><h2 id="classroomSourceTitle">Content sources</h2><button type="button" aria-label="Close content sources" autofocus>×</button></header><div class="classroom-source-content"></div>';
  document.body.append(dialog);
  let invoker;
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('keydown',event=>event.stopPropagation());
  dialog.addEventListener('close',()=>{if(invoker?.isConnected)invoker.focus({preventScroll:true});});
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  const optionsMarkup=r=>{
    if(r.table)return `<table><thead><tr>${r.table.headers.map(c=>`<th>${escape(c)}</th>`).join('')}</tr></thead><tbody>${r.table.rows.map(row=>`<tr>${row.map(c=>`<td>${escape(c)}</td>`).join('')}</tr>`).join('')}</tbody></table><ol type="A">${r.choices.map(c=>`<li>${escape(c)}</li>`).join('')}</ol>`;
    if(!r.choices)return '';
    if(r.columns)return `<table><thead><tr><th scope="col">Option</th>${r.columns.map(c=>`<th scope="col">${escape(c)}</th>`).join('')}</tr></thead><tbody>${r.choices.map((c,i)=>`<tr><th scope="row">${String.fromCharCode(65+i)}</th>${c.split(' — ').map(v=>`<td>${escape(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    return `<ol type="A">${r.choices.map(c=>`<li>${escape(c)}</li>`).join('')}</ol>`;
  };
  slides.forEach((slide,index)=>{
    const entries=records(lesson.slides[index]);
    const nav=document.createElement('nav');nav.className='classroom-source-buttons';nav.setAttribute('aria-label','Slide content sources');
    [...new Set(entries.map(r=>r.type))].forEach(type=>{
      const button=document.createElement('button');button.type='button';button.textContent=type;
      button.setAttribute('aria-label',`Show ${type.toLowerCase()} sources`);button.setAttribute('aria-haspopup','dialog');
      button.addEventListener('click',()=>{
        invoker=button;
        dialog.querySelector('.classroom-source-content').innerHTML=entries.filter(r=>r.type===type).map(r=>`<article><p class="classroom-source-type">${escape(r.type)}</p><h3>${escape(r.ref)}</h3><p class="classroom-source-detail">${r.type==='Mark scheme'?markSchemeMarkup(r.detail):escape(r.detail)}</p>${optionsMarkup(r)}${/^https?:\/\//.test(r.url||'')?`<a href="${escape(r.url)}" target="_blank" rel="noopener">Open original source ↗</a>`:''}</article>`).join('');
        dialog.showModal();
      });nav.append(button);
    });
    const topline=slide.querySelector('.topline');
    if(topline)topline.append(nav);else{nav.classList.add('classroom-visual-pause-sources');slide.append(nav);}
    const number=document.createElement('span');number.className='classroom-slide-number';number.textContent=String(index+1).padStart(2,'0');
    const footer=slide.querySelector('.slide-footer');
    if(footer)footer.append(number);else{number.classList.add('classroom-visual-pause-number');slide.append(number);}
  });
})();
