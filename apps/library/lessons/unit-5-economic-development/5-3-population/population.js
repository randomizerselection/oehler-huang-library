/* Lesson-owned illustrated mechanisms; native reveal nodes control every state. */
window.IGCSE=window.IGCSE||{};
IGCSE.preparePopulationHandout=()=>{
 if(new URLSearchParams(location.search).get('view')!=='print')return;
 IGCSE.lesson={...IGCSE.lesson,slides:IGCSE.lesson.slides.flatMap(s=>{
  if(s.type!=='quiz')return [s];
  const question={...s,type:'paperExtract',title:s.eyebrow,paragraphs:[s.question],question:undefined,questions:undefined};
  const options={id:s.id+'-options',type:'paperExtract',title:'Options',paragraphs:s.choices.map((c,i)=>String.fromCharCode(65+i)+'. '+c),sources:s.sources.filter(x=>x.label==='Question paper')};
  const table=s.dataTable?{id:s.id+'-table',type:'dataTable',title:'Original question data',table:{columns:s.dataTable.headers,rows:s.dataTable.rows}}:s.optionColumns?{id:s.id+'-table',type:'dataTable',title:'Original options',table:{columns:['Option',...s.optionColumns],rows:s.choices.map((c,i)=>[String.fromCharCode(65+i),...c.split(' — ')])}}:null;
  const answer={id:s.id+'-answer',type:'modelAnswer',title:s.eyebrow+' · Feedback',answer:s.prompt,examSpec:{paper:'Paper 1',marks:1},sources:s.sources.filter(x=>x.label!=='Question paper')};
  return [question,table,...(s.optionColumns?[]:[options]),answer].filter(Boolean);
 })};
};
IGCSE.mountPopulation=()=>{
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const text=(x,y,t,size=28,color='#142f43')=>`<text x="${x}" y="${y}" font-family="Arial,Microsoft YaHei,sans-serif" font-size="${size}" fill="${color}">${esc(t)}</text>`;
 const person=(x,y,scale=1,color='#166c72',head='#d6a34a')=>`<g transform="translate(${x} ${y})"><g transform="scale(${scale})"><circle cx="35" cy="28" r="25" fill="${head}"/><path d="M4 102V76Q4 54 35 54Q66 54 66 76V102" fill="${color}"/><path d="M18 102v40M52 102v40" stroke="#142f43" stroke-width="13" stroke-linecap="round"/></g></g>`;
 const arrow=(x,y,w,color='#166c72')=>`<path d="M${x} ${y}h${w-8}" stroke="${color}" stroke-width="5"/><path d="M${x+w-16} ${y-10}L${x+w} ${y}L${x+w-16} ${y+10}Z" fill="${color}"/>`;
 const svg=(body,label)=>`<svg viewBox="0 0 1120 430" role="img" aria-label="${esc(label)}">${body}</svg>`;
 const scene=(kind,stage)=>{
  if(kind==='natural'){
   let b=`<rect x="430" y="92" width="260" height="220" rx="14" fill="#f7f7f2" stroke="#142f43" stroke-width="4"/>`;
   b+=text(472,150,'The town 城镇',30)+text(452,197,'1,000 residents',26,'#51616b');
   if(stage>=1){
    for(let i=0;i<14;i++)b+=person(20+(i%7)*52,i<7?92:232,.44,'#d6a34a','#d6a34a');
    b+=arrow(365,152,53)+arrow(365,272,53)+text(20,48,'14 births join 出生',27,'#b98a2f');
   }
   if(stage>=2){
    for(let i=0;i<9;i++)b+=person(825+(i%5)*57,i<5?92:232,.44,'#c3cbcd','#d8dddf');
    b+=arrow(704,152,75,'#a8423c')+arrow(704,272,75,'#a8423c')+text(825,48,'9 deaths leave 死亡',27,'#a8423c');
   }
   if(stage>=3)b+=text(405,405,'1,000 + 14 − 9 = 1,005',31,'#166c72');
   return svg(b,'A town starts with 1,000 residents; fourteen births join and nine deaths leave, giving 1,005 residents.');
  }
  let b=`<rect x="430" y="92" width="260" height="220" rx="14" fill="#f7f7f2" stroke="#142f43" stroke-width="4"/>`;
  b+=text(468,150,'The town 城镇',30)+text(452,197,'1,005 residents',26,'#51616b');
  if(stage>=1){
   for(let i=0;i<8;i++)b+=person(28+(i%4)*78,i<4?92:232,.52,'#166c72','#d6a34a');
   b+=arrow(338,152,80)+arrow(338,272,80)+text(28,48,'8 immigrants arrive 迁入',27,'#166c72');
  }
  if(stage>=2){
   for(let i=0;i<5;i++)b+=person(835+(i%3)*78,i<3?92:232,.52,'#d6a34a','#d6a34a');
   b+=arrow(704,152,88,'#b98a2f')+arrow(704,272,88,'#b98a2f')+text(835,48,'5 emigrants leave 迁出',27,'#b98a2f');
  }
  if(stage>=3)b+=text(365,405,'Net migration = 8 − 5 = +3  ·  1,005 + 3 = 1,008',29,'#166c72');
  return svg(b,'Eight people move into the town and five leave; net migration is plus three, giving 1,008 residents.');
 };
 for(const kind of ['natural','migration']){
  const slide=document.querySelector('.is-layout-population-'+kind);if(!slide)continue;
  const steps=[...slide.querySelectorAll('.partial-item')];
  const host=document.createElement('div');host.className='population-scene';
  slide.querySelector('.cardgrid').before(host);slide.classList.add('has-population-scene');
  let last=-1;
  const draw=()=>{
   const n=steps.filter(x=>x.classList.contains('is-visible')).length;if(n===last)return;
   host.innerHTML=scene(kind,n);host.dataset.stage=n;
   const caption=document.createElement('p');caption.className='scene-caption';caption.textContent=n?IGCSE.lesson.slides[[...document.querySelectorAll('#deck .slide')].indexOf(slide)].cards[n-1].body:'Predict the change before the next reveal.';host.append(caption);
   if(last>=0&&!matchMedia('(prefers-reduced-motion: reduce)').matches)host.querySelectorAll('svg > g').forEach(el=>el.animate([{opacity:0},{opacity:1}],{duration:140}));
   last=n;
  };
  const observer=new MutationObserver(draw);steps.forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class']}));draw();
 }
 const slides=[...document.querySelectorAll('#deck .slide')];
 slides.forEach((el,i)=>{
 const s=IGCSE.lesson.slides[i];
  if(Array.isArray(s.cardVisuals)){
   const cards=[...el.querySelectorAll('.cardgrid > .card')];
   el.classList.add(`has-${cards.length}-photo-cards`);
   s.cardVisuals.forEach((visual,j)=>{
    const card=cards[j];
    if(!card||!visual?.src)return;
    const figure=document.createElement('figure');figure.className='population-card-visual';
    const image=document.createElement('img');image.src=visual.src;image.alt=visual.alt||'';image.loading='lazy';image.decoding='async';
    figure.append(image);card.prepend(figure);
   });
  }
  if(s.layout==='population-driver-overview'){
   const pictures=[
    '<circle cx="30" cy="26" r="14" fill="#d6a34a"/><path d="M12 76V62q0-20 18-20t18 20v14" fill="#166c72"/><circle cx="70" cy="26" r="14" fill="#d6a34a"/><path d="M52 76V62q0-20 18-20t18 20v14" fill="#166c72"/><path d="M18 89h64"/>',
    '<circle cx="50" cy="27" r="16" fill="#d6a34a"/><path d="M28 82V64q0-23 22-23t22 23v18" fill="#b9d9d4"/><path d="M24 91h52"/><path d="M82 20v62" stroke="#a8423c"/><path d="M75 73l7 9 7-9" stroke="#a8423c"/>',
    '<path d="M12 50h68"/><path d="M70 40l12 10-12 10" fill="#166c72" stroke="#166c72"/><circle cx="25" cy="25" r="12" fill="#d6a34a"/><path d="M10 90V78q0-18 15-18t15 18v12" fill="#b9d9d4"/><circle cx="72" cy="76" r="12" fill="#d6a34a"/><path d="M57 100V92q0-16 15-16t15 16v8" fill="#166c72"/>'
   ];
   const descriptions=['Birth rate','Death rate','Net migration rate'];
   el.querySelectorAll('.cardgrid > .card').forEach((card,j)=>{
    const picture=document.createElement('div');picture.className='population-driver-picture';
    picture.innerHTML=`<svg viewBox="0 0 100 100" role="img" aria-label="${descriptions[j]}" fill="none" stroke="#142f43" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${pictures[j]}</svg>`;
    card.prepend(picture);
    });
  }
  // Preserve exact question tables as accessible HTML; never infer columns from PDF extraction.
  if(s.optionColumns){
   const choices=[...el.querySelectorAll('.choices .choice')];
   const columns=`50px repeat(${s.optionColumns.length},minmax(0,1fr))`;
   const head=document.createElement('div');head.className='population-option-head';head.style.gridTemplateColumns=columns;head.innerHTML='<span></span>'+s.optionColumns.map(c=>`<span>${esc(c)}</span>`).join('');el.querySelector('.choices').before(head);
   choices.forEach((choice,j)=>{choice.style.gridTemplateColumns=columns;const letter=choice.firstElementChild;choice.replaceChildren(letter);s.choices[j].split(' — ').forEach(v=>{const span=document.createElement('span');span.textContent=v;choice.append(span);});});
  }
  if(s.dataTable){
   const t=document.createElement('table');t.className='population-exam-table';t.innerHTML='<thead><tr>'+s.dataTable.headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')+'</tr></thead><tbody>'+s.dataTable.rows.map(r=>'<tr>'+r.map(v=>`<td>${esc(v)}</td>`).join('')+'</tr>').join('')+'</tbody>';
   const block=el.querySelector('.quizBlock');block.querySelector('.choices').before(t);
  }
 });
};
