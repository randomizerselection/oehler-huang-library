/* Lesson-owned adaptation of the latest A-level source controls.
   Uses this lesson's verified records; no cross-course renderer dependency. */
(() => {
  'use strict';
  const slides=[...document.querySelectorAll('#deck .slide')];
  if(!slides.length || !document.body.classList.contains('ssp-classroom')) return;
  const lesson=window.IGCSE.lesson;
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function records(s) {
    const list=[];
    for(const source of s.sources||[]) {
      if(source.qp){
        list.push({type:'Question paper',ref:source.ref+' · original question',detail:source.question+' ['+source.marks+']',url:'./assets/'+source.qp+'-p'+source.qpPage+'.png'});
        list.push({type:'Mark scheme',ref:source.ref+' · scheme points (summary)',detail:source.extract+'\n\nOpen the original page for the full official wording and level descriptors.',url:'./assets/'+source.ms+'-p'+source.msPage+'.png'});
      } else list.push({type:source.type||'Course reference',ref:source.ref,detail:[source.note,source.question,source.extract].filter(Boolean).join('\n\n')});
    }
    if(s.type==='modelAnswer')list.push({type:'Teaching model',ref:'Teacher-written prose, based on the cited original scheme',detail:s.answer});
    if(s.visual?.source)list.push({type:'Photo',ref:s.visual.caption||s.visual.alt,detail:s.visual.credit,url:s.visual.source});
    if(s.layout==='ssp-capacity-scene')list.push({type:'Teaching model',ref:'Original classroom illustration',detail:s.notes});
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
    const data=lesson.slides[index];
    if(data.type==='cards'&&data.zhTitle&&data.layout!=='ppc-teaching'){
      const heading=slide.querySelector('h2');
      if(heading&&!heading.querySelector('.inlineZh')){const zh=document.createElement('span');zh.className='inlineZh';zh.lang='zh-Hans';zh.textContent=data.zhTitle;heading.append(zh);}
    }
    const entries=records(lesson.slides[index]);
    const nav=document.createElement('nav');nav.className='classroom-source-buttons';nav.setAttribute('aria-label','Slide content sources');
    [...new Set(entries.map(r=>r.type))].forEach(type=>{
      const button=document.createElement('button');button.type='button';button.textContent=type;
      button.setAttribute('aria-label',`Show ${type.toLowerCase()} sources`);button.setAttribute('aria-haspopup','dialog');
      button.addEventListener('click',event=>{
        event.stopPropagation();
        invoker=button;
        dialog.querySelector('.classroom-source-content').innerHTML=entries.filter(r=>r.type===type).map(r=>`<article><p class="classroom-source-type">${escape(r.type)}</p><h3>${escape(r.ref)}</h3><p class="classroom-source-detail">${escape(r.detail)}</p>${optionsMarkup(r)}${/^(https?:\/\/|\.\/assets\/)/.test(r.url||'')?`<a href="${escape(r.url)}" target="_blank" rel="noopener">Open original source ↗</a>`:''}</article>`).join('');
        dialog.showModal();
      });nav.append(button);
    });
    slide.querySelector('.topline').append(nav);
    const number=document.createElement('span');number.className='classroom-slide-number';number.textContent=String(index+1).padStart(2,'0');
    slide.querySelector('.slide-footer').append(number);
  });
})();

/* Economy-wide production illustration. The original cards remain the handout. */
(() => {
 const slide=document.querySelector('.slide.is-layout-ssp-capacity-scene');
 if(!slide)return;
 const main=slide.querySelector('main');
 main.querySelector('.cardgrid').remove();
 const scene=document.createElement('div');scene.className='ssp-scene';scene.dataset.frame='0';
 scene.innerHTML='<div class="ssp-scene-illustration"></div><p class="ssp-scene-caption"></p><div class="ssp-scene-controls"><button type="button" data-back>Back</button><button type="button" data-reset>Reset</button><button type="button" data-next>Next step</button></div>';
 main.append(scene);
 let frame=0;
 const captions=[
  'Food, machinery and transport: the same workers and working hours. What could better training change?',
  'Training raises output per worker in each sector. More goods and services can be produced.',
  'Across the economy, productive capacity rises. Actual output still depends on demand.'
 ];
 const labels=['Food 食品','Machinery 机械','Transport 运输'];
 const products=['batches','machines','deliveries'];
 const productZh=['批次','机器','运输次数'];
 function draw(){
  scene.dataset.frame=frame;
  scene.querySelector('.ssp-scene-caption').textContent=captions[frame];
  scene.querySelector('[data-back]').disabled=frame===0;
  scene.querySelector('[data-next]').disabled=frame===2;
  const sectors=labels.map((label,i)=>{
   const x=20+i*375;
   const workers=[0,1].map(j=>`<g transform="translate(${x+45+j*54},98)"><circle cx="0" cy="0" r="14" fill="#d6a34a"/><path d="M-19 48 V26 Q0 5 19 26 V48 M-11 48 V72 M11 48 V72" fill="#166c72" stroke="#166c72" stroke-width="9"/></g>`).join('');
   const count=frame?9:6;
   const boxes=Array.from({length:count},(_,j)=>`<rect data-output x="${x+190+(j%3)*43}" y="${90+Math.floor(j/3)*43}" width="32" height="30" rx="3" fill="${j<6?'#166c72':'#d6a34a'}"/>`).join('');
   return `<g><text x="${x+165}" y="35" text-anchor="middle" font-size="30" font-weight="700">${label}</text><path d="M${x+12} 211 V70 L${x+82} 50 L${x+82} 70 H${x+145} V211" fill="#e1e8e4"/>${workers}${boxes}<text x="${x+80}" y="252" text-anchor="middle" font-size="24">2 workers</text><text x="${x+253}" y="252" text-anchor="middle" font-size="25" fill="#166c72">${count} ${products[i]}</text><text x="${x+253}" y="281" text-anchor="middle" font-size="24" fill="#51616b">${productZh[i]}</text><path d="M${x+350} 40 V265" stroke="#d4dedc" stroke-width="2"/></g>`;
  }).join('');
  scene.querySelector('.ssp-scene-illustration').innerHTML=`<svg viewBox="0 0 1140 290" role="img" aria-label="Illustrative production in three sectors: two workers in each sector, output increases from six to nine units after training. Different products are not added together." style="color:#142f43;font-family:Arial,Microsoft YaHei,sans-serif;fill:currentColor">${sectors}</svg>`;
 }
 function change(n){frame=Math.max(0,Math.min(2,n));draw();}
 scene.addEventListener('click',e=>{e.stopPropagation();if(e.target.closest('[data-back]'))change(frame-1);if(e.target.closest('[data-next]'))change(frame+1);if(e.target.closest('[data-reset]'))change(0);});
 window.addEventListener('keydown',e=>{
  if(!slide.classList.contains('is-active')||document.querySelector('dialog[open]')||e.target.closest('button,input,textarea'))return;
  if(['ArrowRight',' ','PageDown'].includes(e.key)&&frame<2){e.preventDefault();e.stopImmediatePropagation();change(frame+1);}
  else if(['ArrowLeft','PageUp'].includes(e.key)&&frame>0){e.preventDefault();e.stopImmediatePropagation();change(frame-1);}
 },true);
 document.addEventListener('click',e=>{
  if(!slide.classList.contains('is-active')||document.querySelector('dialog[open]'))return;
  if(e.target.closest('#nextSlide')&&frame<2){e.preventDefault();e.stopImmediatePropagation();change(frame+1);return;}
  if(e.target.closest('#previousSlide')&&frame>0){e.preventDefault();e.stopImmediatePropagation();change(frame-1);return;}
  if(e.target.closest('button,a,input,select,details,summary,#overview,#notes'))return;
  if(e.target.closest('.slide')===slide&&frame<2){e.preventDefault();e.stopImmediatePropagation();change(frame+1);}
 },true);
 let beforePrint=0;
 window.addEventListener('beforeprint',()=>{beforePrint=frame;change(2);});
 window.addEventListener('afterprint',()=>change(beforePrint));
 draw();
})();
