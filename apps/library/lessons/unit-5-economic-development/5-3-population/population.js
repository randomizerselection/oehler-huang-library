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
 const person=(x,y,scale=1,color='#166c72',head='#d6a34a')=>`<g transform="translate(${x} ${y}) scale(${scale})"><circle cx="35" cy="28" r="25" fill="${head}"/><path d="M4 102V76Q4 54 35 54Q66 54 66 76V102" fill="${color}"/><path d="M18 102v40M52 102v40" stroke="#142f43" stroke-width="13" stroke-linecap="round"/></g>`;
 const arrow=(x,y,w,color='#166c72')=>`<path d="M${x} ${y}h${w-8}" stroke="${color}" stroke-width="5"/><path d="M${x+w-16} ${y-10}L${x+w} ${y}L${x+w-16} ${y+10}Z" fill="${color}"/>`;
 const svg=(body,label)=>`<svg viewBox="0 0 1120 360" role="img" aria-label="${esc(label)}">${body}</svg>`;
 const scene=(kind,stage)=>{
  if(kind==='natural'){
   let b=text(40,42,'1,000 residents · each icon = 50 people',25,'#51616b');
   for(let i=0;i<20;i++){
    const dead=stage>=2&&i>=11;
    b+=person(40+(i%10)*58,i<10?80:205,.62,dead?'#9aa7ab':'#166c72',dead?'#c3cbcd':'#d6a34a');
   }
   if(stage>=2)b+=text(40,346,'9 deaths 死亡',30,'#51616b');
   if(stage>=1){
    for(let i=0;i<14;i++)b+=person(640+(i%7)*62,i<7?80:200,.5,'#d6a34a','#d6a34a');
    b+=text(640,346,'14 births 出生',30,'#b98a2f');
   }
   if(stage>=3)b+=text(600,55,'1,000 + 14 − 9 = 1,005',34,'#166c72');
   return svg(b,'Twenty icons for 1,000 residents; fourteen births join and nine deaths leave, giving 1,005 residents.');
  }
  let b=`<rect x="430" y="80" width="260" height="220" rx="14" fill="#f7f7f2" stroke="#142f43" stroke-width="4"/>`;
  b+=text(468,135,'The town 城镇',30)+text(452,180,'1,005 residents',26,'#51616b');
  if(stage>=1){
   for(let i=0;i<8;i++)b+=person(30+(i%4)*85,i<4?95:215,.55,'#166c72','#d6a34a');
   b+=arrow(330,140,90)+arrow(330,260,90)+text(30,55,'8 immigrants arrive 迁入',28,'#166c72');
  }
  if(stage>=2){
   for(let i=0;i<5;i++)b+=person(880+(i%3)*75,i<3?95:215,.55,'#d6a34a','#d6a34a');
   b+=arrow(700,140,80,'#b98a2f')+arrow(700,260,80,'#b98a2f')+text(800,55,'5 emigrants leave 迁出',28,'#b98a2f');
  }
  if(stage>=3)b+=text(430,340,'Net migration = 8 − 5 = +3  ·  1,005 + 3 = 1,008',30,'#166c72');
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
   if(last>=0&&!matchMedia('(prefers-reduced-motion: reduce)').matches)host.querySelectorAll('svg > g').forEach((el,i)=>el.animate([{opacity:0},{opacity:1}],{duration:260,delay:i*18}));
   last=n;
  };
  const observer=new MutationObserver(draw);steps.forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class']}));draw();
 }
 const slides=[...document.querySelectorAll('#deck .slide')];
 slides.forEach((el,i)=>{
  const s=IGCSE.lesson.slides[i];
  if(s.layout==='population-factor-overview'){
   const pictures=[
    '<circle cx="50" cy="42" r="26" fill="#d6a34a"/><path d="M50 24v36M38 34h24M38 50h24" stroke="#fff"/><path d="M14 86h72" stroke-linecap="round"/>',
    '<circle cx="50" cy="50" r="34" fill="#b9d9d4"/><path d="M50 32v36M32 50h36" stroke="#166c72" stroke-width="9"/>',
    '<path d="M18 26h26v52H18zM56 26h26v52H56z" fill="#b9d9d4"/><path d="M50 26v52M24 36h14M24 48h14M62 36h14M62 48h14"/>',
    '<circle cx="34" cy="30" r="14" fill="#d6a34a"/><path d="M14 84V70q0-20 20-20t20 20v14" fill="#b9d9d4"/><circle cx="70" cy="36" r="11" fill="#d4dedc"/><path d="M56 84V74q0-16 14-16t14 16v10" fill="#d4dedc"/><path d="M84 52v32"/>',
    '<path d="M50 14l10 22 24 2-18 16 6 24-22-13-22 13 6-24-18-16 24-2z" fill="#d6a34a"/><path d="M22 88l14-14M78 88L64 74M50 88V68" stroke="#a8423c" stroke-width="6" stroke-linecap="round"/>'
   ];
   const descriptions=['Income and nutrition','Healthcare','Education','Average age','War and natural disasters'];
   el.querySelectorAll('.cardgrid > .card').forEach((card,j)=>{
    const picture=document.createElement('div');picture.className='population-factor-picture';
    picture.innerHTML=`<svg viewBox="0 0 100 100" role="img" aria-label="${descriptions[j]}" fill="none" stroke="#142f43" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${pictures[j]}</svg>`;
    card.prepend(picture);
    });
  }
  // Preserve exact question tables as accessible HTML; never infer columns from PDF extraction.
  if(s.optionColumns){
   const choices=[...el.querySelectorAll('.choices .choice')];
   const head=document.createElement('div');head.className='population-option-head';head.innerHTML='<span></span>'+s.optionColumns.map(c=>`<span>${esc(c)}</span>`).join('');el.querySelector('.choices').before(head);
   choices.forEach((choice,j)=>{const letter=choice.firstElementChild;choice.replaceChildren(letter);s.choices[j].split(' — ').forEach(v=>{const span=document.createElement('span');span.textContent=v;choice.append(span);});});
  }
  if(s.dataTable){
   const t=document.createElement('table');t.className='population-exam-table';t.innerHTML='<thead><tr>'+s.dataTable.headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')+'</tr></thead><tbody>'+s.dataTable.rows.map(r=>'<tr>'+r.map(v=>`<td>${esc(v)}</td>`).join('')+'</tr>').join('')+'</tbody>';
   const block=el.querySelector('.quizBlock');block.querySelector('.choices').before(t);
  }
 });
};
