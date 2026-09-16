/* Lesson-owned illustrated mechanisms; native reveal nodes control every state. */
window.IGCSE=window.IGCSE||{};
IGCSE.prepareHouseholdHandout=()=>{
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
IGCSE.mountHouseholds=()=>{
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const text=(x,y,t,size=28,color='#142f43')=>`<text x="${x}" y="${y}" font-family="Arial,Microsoft YaHei,sans-serif" font-size="${size}" fill="${color}">${esc(t)}</text>`;
 const person=(x,y,color='#166c72')=>`<g transform="translate(${x} ${y})"><circle cx="35" cy="28" r="25" fill="#d6a34a"/><path d="M4 102V76Q4 54 35 54Q66 54 66 76V102" fill="${color}"/><path d="M18 102v40M52 102v40" stroke="#142f43" stroke-width="13" stroke-linecap="round"/></g>`;
 const laptop=(x,y)=>`<g transform="translate(${x} ${y})"><rect width="126" height="80" rx="5" fill="#142f43"/><rect x="8" y="8" width="110" height="62" fill="#b9d9d4"/><path d="M-14 82H140L150 95H-24Z" fill="#51616b"/></g>`;
 const arrow=(x,y,w)=>`<path d="M${x} ${y}h${w-8}" stroke="#166c72" stroke-width="5"/><path d="M${x+w-16} ${y-10}L${x+w} ${y}L${x+w-16} ${y+10}Z" fill="#166c72"/>`;
 const svg=(body,label)=>`<svg viewBox="0 0 1120 360" role="img" aria-label="${esc(label)}"><defs><marker id="household-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10" fill="#166c72"/></marker></defs>${body}</svg>`;
 const scene=(kind,stage)=>{
  if(kind==='budget'){
   let b=person(10,105)+text(10,285,'Lucy',25)+text(110,40,'Monthly income: ¥5,000',32);
   for(let i=0;i<10;i++){
    const moved=i<8?stage>=1:stage>=2;
    const x=moved?(i<8?500+(i%4)*112:950):130+(i%5)*66;
    const y=moved?(i<8?110+Math.floor(i/4)*60:110+(i-8)*60):100+Math.floor(i/5)*72;
    b+=`<g data-money><rect x="${x}" y="${y}" width="${moved?94:59}" height="46" rx="3" fill="${i>=8&&stage>=2?'#166c72':'#d6a34a'}"/>${text(x+8,y+31,'500',22,i>=8&&stage>=2?'white':'#142f43')}</g>`;
   }
   b+=text(500,85,'Current spending',28)+text(950,85,'Saving',28);
   if(stage>=1)b+=text(500,270,'¥4,000 · 消费',32);
   if(stage>=2)b+=text(920,270,'¥1,000 · 储蓄',30);
   if(stage>=3)b+=laptop(180,220)+text(375,330,'2 months × ¥1,000 = ¥2,000 for the laptop',29,'#166c72');
   return svg(b,'Ten ¥500 amounts: eight for spending and two for saving; two months of saving buys the laptop.');
  }
  if(kind==='borrow'){
   let b=person(30,115)+text(20,310,'Lucy',27)+text(200,55,'NOW 现在',31)+text(740,55,'ONE YEAR LATER 一年后',31);
   b+=`<path d="M200 80H1090" stroke="#d4dedc" stroke-width="3"/>`;
   if(stage>=1)b+=laptop(245,130)+text(190,280,'Receive and spend ¥2,000',30)+arrow(440,170,190);
   if(stage>=2)b+=text(725,135,'Repay principal  ¥2,000',29)+text(725,195,'Pay interest       ¥100',29)+text(725,285,'Total repayment ¥2,100',32,'#166c72');
   return svg(b,'A loan enables a ¥2,000 purchase now; one year later Lucy owes ¥2,000 plus ¥100 interest.');
  }
  let b=text(0,25,'Same scale · monthly budgets',25,'#51616b');
  const bar=(y,inc,spend,share)=>{
   const save=inc-spend,w=inc/10,sw=spend/10;
   return text(0,y+30,'¥'+inc.toLocaleString(),30)+`<rect x="170" y="${y}" width="${sw}" height="48" fill="#d6a34a"/><rect x="${170+sw}" y="${y}" width="${w-sw}" height="48" fill="#166c72"/>`+text(170,y+87,'Spend ¥'+spend.toLocaleString(),28)+text(670,y+87,'Save ¥'+save.toLocaleString(),28,'#166c72')+text(170,y+129,`Share saved: ${save.toLocaleString()} ÷ ${inc.toLocaleString()} × 100 = ${share}%`,29);
  };
  if(stage>=1)b+=bar(60,5000,4000,20);
  if(stage>=2)b+=bar(215,8000,5600,30);
  return svg(b,'Monthly income rises from ¥5,000 to ¥8,000. Saving rises from ¥1,000, or 20%, to ¥2,400, or 30%.');
 };
 for(const kind of ['budget','borrow','income']){
  const slide=document.querySelector('.is-layout-household-'+kind);if(!slide)continue;
  const steps=[...slide.querySelectorAll('.partial-item')];
  const host=document.createElement('div');host.className='household-scene';
  slide.querySelector('.cardgrid').before(host);slide.classList.add('has-household-scene');
  let last=-1;
  const draw=()=>{
   const n=steps.filter(x=>x.classList.contains('is-visible')).length;if(n===last)return;
   host.innerHTML=scene(kind,n);host.dataset.stage=n;
   const caption=document.createElement('p');caption.className='scene-caption';caption.textContent=n?IGCSE.lesson.slides[[...document.querySelectorAll('#deck .slide')].indexOf(slide)].cards[n-1].body:'Predict the change before the next reveal.';host.append(caption);
   if(last>=0&&!matchMedia('(prefers-reduced-motion: reduce)').matches)host.querySelectorAll('[data-money]').forEach((el,i)=>el.animate([{opacity:.35,transform:'translateY(-12px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,delay:i*20}));
   last=n;
  };
  const observer=new MutationObserver(draw);steps.forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class']}));draw();
 }
 const slides=[...document.querySelectorAll('#deck .slide')];
 slides.forEach((el,i)=>{
  const s=IGCSE.lesson.slides[i];
  if(s.overviewItems){
   if(s.layout)el.classList.add('is-layout-'+s.layout);
   const list=document.createElement('ol');list.className='household-influence-list';
   list.innerHTML=s.overviewItems.map((item,j)=>`<li><span class="household-influence-number">${j+1}.</span><span><strong>${esc(item.term)}</strong><small>${esc(item.zh)}</small></span></li>`).join('');
   const sectionBody=el.querySelector('.content.is-section > div');
   sectionBody.insertBefore(list,sectionBody.querySelector('.sectionProgress'));
  }
  // Preserve exact question tables as accessible HTML; never infer columns from PDF extraction.
  if(s.optionColumns){
   const choices=[...el.querySelectorAll('.choices .choice')];
   const head=document.createElement('div');head.className='household-option-head';head.innerHTML='<span></span>'+s.optionColumns.map(c=>`<span>${esc(c)}</span>`).join('');el.querySelector('.choices').before(head);
   choices.forEach((choice,j)=>{const letter=choice.firstElementChild;choice.replaceChildren(letter);s.choices[j].split(' — ').forEach(v=>{const span=document.createElement('span');span.textContent=v;choice.append(span);});});
  }
  if(s.dataTable){
   const t=document.createElement('table');t.className='household-exam-table';t.innerHTML='<thead><tr>'+s.dataTable.headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')+'</tr></thead><tbody>'+s.dataTable.rows.map(r=>'<tr>'+r.map(v=>`<td>${esc(v)}</td>`).join('')+'</tr>').join('')+'</tbody>';
   const block=el.querySelector('.quizBlock');block.querySelector('.choices').before(t);
  }
 });
 const rate=document.querySelector('.is-layout-household-interest .splitCols');
 if(rate){
  const cols=[...rate.children],rows=cols.map(c=>[...c.querySelectorAll('.choice')]);
  const table=document.createElement('table');table.className='household-interest-table';const tr=table.createTHead().insertRow();cols.forEach(c=>{const th=document.createElement('th');th.textContent=c.querySelector('b').textContent;tr.append(th);});
  for(let i=0;i<3;i++){const r=table.createTBody().insertRow();rows.forEach(col=>r.insertCell().append(col[i]));}rate.replaceWith(table);
 }
};
