/* Lesson-owned adaptation of the latest A-level source controls.
   Uses this lesson's verified records; no cross-course renderer dependency. */
(() => {
  'use strict';
  const slides=[...document.querySelectorAll('#deck .slide')];
  if(!slides.length || !document.body.classList.contains('enterprise-classroom')) return;
  const lesson=window.IGCSE.lesson;
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const syllabus={type:'Syllabus',ref:'Cambridge IGCSE Economics 0455 · 2027–2029 · 1.2.1',detail:'Definitions of the factors of production and their rewards. This lesson covers enterprise and factor rewards; mobility and changes in the quantity or quality of factors are later knowledge points.'};
  const definitions={type:'Definitions',ref:'IGCSE Economics definitions · retained 2026 course reference',detail:'Land: natural resources used in production. Labour: human effort used in production. Capital: human-made goods used in production. Enterprise organises the other factors of production and takes risks.'};
  // References and official answers verified in PAPER-SOURCES.md.
  const paper2={
    '2025MJ-21 Q3(a)':{ref:'0455/21 · May/June 2025 · Q3(a) [2]',question:'Identify the rewards to capital and land.',answer:'Interest (1); rent (1).',msPage:19},
    '2023FM-22 Q2(a)':{ref:'0455/22 · February/March 2023 · Q2(a) [2]',question:'Identify two reasons why people become entrepreneurs.',answer:'One mark per distinct accepted reason. Accepted reasons include profit, independence, following an interest, innovation and flexible working hours.',msPage:15}
  };
  function records(s) {
    const list=[];
    if(s.type==='quiz'){
      list.push({type:'Question paper',ref:`Cambridge ${s.eyebrow} · printed page 2`,detail:s.question,choices:s.choices,columns:s.optionColumns});
      list.push({type:'Mark scheme',ref:`Cambridge ${s.eyebrow} · official mark scheme, page 2`,detail:`Official answer: ${String.fromCharCode(65+s.answer)} — ${s.choices[s.answer]}.`});
      list.push({type:'Teaching model',ref:'Teacher-written answer explanation',detail:s.prompt});
    } else {
      for(const source of s.sources||[]){
        const original=paper2[source.ref];
        if(original){
          list.push({type:'Question paper',ref:`Cambridge ${original.ref} · printed page 4`,detail:original.question});
          list.push({type:'Mark scheme',ref:`Cambridge ${original.ref} · official mark scheme, page ${original.msPage}`,detail:original.answer});
        } else if(source.label==='Syllabus and definitions') list.push(syllabus,definitions);
        else list.push({type:'Course reference',ref:source.ref,detail:[source.note,source.question,source.extract].filter(Boolean).join('\n\n')});
      }
      if(['hero','section','outcomes'].includes(s.type)) list.push(syllabus);
      if(s.type==='classificationTask') list.push(definitions);
      if(s.type==='modelAnswer') list.push({type:'Teaching model',ref:'Teacher-written model based on the cited mark scheme',detail:s.answer});
      if(s.layout?.startsWith('factor-') && s.type==='cards') list.push({type:'Teaching model',ref:'Original classroom explanation and illustration',detail:['factor-case','factor-assembly','factor-revenue','factor-risk'].includes(s.layout)?'Emma’s school-fair business is fictional. She produces 12 boxes, charges ¥15 per box and pays total costs of ¥120 before sales. Unsold boxes have no resale value. All agreed payments are included in the cost. The diagrams and numerical explanations are teacher-created.':'The visual explanation is teacher-created from the cited course references. It is not an official Cambridge model answer.'});
    }
    if(s.visual?.src?.includes('enterprise-launch-hero')) list.push({type:'Illustration',ref:'Original AI-generated classroom illustration',detail:'Fictional entrepreneur coordinating a sneaker workshop. Created with OpenAI image generation for this lesson; it does not depict a real business.'});
    else if(s.visual?.source) list.push({type:'Photo',ref:s.visual.caption,detail:s.visual.credit,url:s.visual.source});
    return list.filter((r,i)=>list.findIndex(x=>x.type===r.type&&x.ref===r.ref)===i);
  }
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
        dialog.querySelector('.classroom-source-content').innerHTML=entries.filter(r=>r.type===type).map(r=>`<article><p class="classroom-source-type">${escape(r.type)}</p><h3>${escape(r.ref)}</h3><p class="classroom-source-detail">${escape(r.detail)}</p>${optionsMarkup(r)}${/^https?:\/\//.test(r.url||'')?`<a href="${escape(r.url)}" target="_blank" rel="noopener">Open original source ↗</a>`:''}</article>`).join('');
        dialog.showModal();
      });nav.append(button);
    });
    slide.querySelector('.topline').append(nav);
    const number=document.createElement('span');number.className='classroom-slide-number';number.textContent=String(index+1).padStart(2,'0');
    slide.querySelector('.slide-footer').append(number);
  });
})();
