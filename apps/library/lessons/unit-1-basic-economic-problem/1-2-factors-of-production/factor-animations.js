/* Bespoke factor scenes. The deck's native partial reveals own forward/back state. */
window.IGCSE = window.IGCSE || {};
(() => {
  const ink='#142f43', teal='#166c72', gold='#d6a34a', red='#a8423c', paper='#f7f7f2';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text=(s,x,y,size=25,color=ink,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-size="${size}" font-weight="650">${esc(s)}</text>`;
  const box=(x,y,i,sold=false)=>`<g transform="translate(${x} ${y})" data-move="box${i}"><rect x="-24" y="-19" width="48" height="38" rx="6" fill="${sold?teal:gold}"/><path d="M-24-7 H24 M0-19 V-7" stroke="${paper}" stroke-width="3"/>${text(i+1,0,11,18,sold?'white':ink)}</g>`;
  const wheat=(x,y)=>`<g transform="translate(${x} ${y})"><path d="M0 40 V-40 M0-20 L-28-42 M0 0 L-28-22 M0 20 L-28-2 M0-30 L28-52 M0-10 L28-32 M0 10 L28-12" stroke="${gold}" stroke-width="12" stroke-linecap="round"/><path d="M45 1 Q17 35 45 45 Q75 35 45 1" fill="${teal}"/></g>`;
  const person=(x,y,owner=false)=>`<g transform="translate(${x} ${y})"><circle cy="-24" r="22" fill="#d7a37f"/><path d="M-22-30 Q-14-60 12-45 L24-22 L9-30Z" fill="${ink}"/><path d="M-36 60 V20 Q-36 0 0 0 Q36 0 36 20 V60" fill="${owner?gold:teal}"/><path d="M-21 59 V78 M21 59 V78" stroke="${ink}" stroke-width="11"/>${owner?'<rect x="8" y="18" width="34" height="39" rx="4" fill="white"/><path d="M14 30 H35 M14 40 H35" stroke="#102b46" stroke-width="3"/>':''}</g>`;
  const oven=(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-57" y="-44" width="114" height="110" rx="9" fill="${ink}"/><circle cx="-29" cy="-24" r="6" fill="${gold}"/><circle cy="-24" r="6" fill="${gold}"/><rect x="-43" y="-3" width="86" height="50" rx="5" fill="${teal}"/><path d="M-28 27 Q-20 3-8 27 Q0 3 10 27 Q20 3 28 27" stroke="${gold}" stroke-width="6" fill="none"/></g>`;
  const captions={
    'factor-assembly':[
      ['Emma needs three productive resources.','Who will choose, hire and organise the work?'],
      ['Emma brings the resources together.','Organisation 组织：choose inputs, people and equipment.'],
      ['The team produces 12 bread boxes.','Coordinate the work so the boxes are ready on time.'],
      ['Emma pays ¥120 before selling any bread.','Her own savings are at risk if sales do not cover the cost.']
    ],
    'factor-rewards':[
      ['What does each factor earn?','Name the reward before each reveal.'],
      ['Land earns rent.','土地 → 地租'],['Labour earns wages.','劳动 → 工资'],
      ['Capital earns interest.','资本 → 利息'],['Enterprise earns profit.','企业家才能 → 利润 · Profit is not guaranteed.']
    ],
    'factor-person':[
      ['An entrepreneur supplies enterprise.','Two essential roles: organise production and take risks.'],
      ['Emma organises the other three factors.','She chooses the product, people, equipment and timing.'],
      ['Emma also takes the business risk.','She pays first. She cannot know her profit in advance.']
    ],
    'factor-revenue':[
      ['What happens to the money from customers?','Profit = total revenue − total cost'],
      ['Customers pay ¥180 in total.','Revenue 收入: all the money received from sales.'],
      ['¥120 covers the production costs.','Cost 成本: money spent on production.'],
      ['Only the remaining ¥60 is profit.','¥180 revenue − ¥120 cost = ¥60 profit 利润']
    ],
    'factor-risk':[
      ['12 boxes made. How many will sell?','Predict revenue and profit if all 12 sell.'],
      ['12 sold: ¥60 profit.','Revenue ¥180 − cost ¥120 = profit ¥60'],
      ['6 sold, 6 unsold. Predict the result.','Price and total cost stay the same. Only sales change.'],
      ['6 sold: ¥30 loss.','Revenue ¥90 − cost ¥120 = −¥30']
    ]
  };
  function assembly(stage, mobile){
    const w=mobile?620:1120;let out='';
    const xs=mobile?[100,310,520]:stage===0?[170,560,950]:[340,585,830];
    const y=mobile?145:90;
    if(stage>0)out+=`<rect x="${mobile?28:205}" y="${y-88}" width="${mobile?564:760}" height="255" rx="20" fill="#e4efed" stroke="${teal}" stroke-width="3"/>`;
    out+=wheat(xs[0],y)+person(xs[1],y)+oven(xs[2],y);
    out+=text('Wheat + water',xs[0],y+105,mobile?23:27)+text('Lucy',xs[1],y+105,mobile?23:27)+text('Oven',xs[2],y+105,mobile?23:27);
    out+=text('Land 土地',xs[0],y+139,mobile?22:26,teal)+text('Labour 劳动',xs[1],y+139,mobile?22:26,teal)+text('Capital 资本',xs[2],y+139,mobile?22:26,teal);
    if(stage>0){out+=person(mobile?95:140,mobile?365:280,true)+text('Emma',mobile?95:140,mobile?470:385,mobile?25:30);out+=`<path d="${mobile?'M145 353 H275 V297':'M191 280 H285 V230'}" fill="none" stroke="${teal}" stroke-width="4" stroke-dasharray="8 6"/>`;}
    if(stage>=2){for(let i=0;i<12;i++)out+=box((mobile?250:420)+(i%6)*57,(mobile?340:285)+Math.floor(i/6)*52,i);}
    else out+=text(stage===0?'Who chooses, hires and plans?':'Predict what happens next.',w/2,mobile?420:340,mobile?25:31);
    if(stage===3)out+=text('¥120 paid · sales unknown',mobile?385:710,mobile?485:405,mobile?23:30,red);
    return out;
  }
  function roles(stage,mobile){
    const w=mobile?620:1120,cy=mobile?90:185;
    let out=person(w/2,cy,true)+(mobile?text('Emma · entrepreneur 企业家',w/2,cy+110,25):text('Emma',w/2,cy+110,30)+text('Entrepreneur 企业家',w/2,cy+155,26));
    const left=mobile?165:225,right=mobile?455:895,y=mobile?350:210;
    out+=text('ORGANISE',left,mobile?250:70,mobile?26:32,teal)+text('组织',left,mobile?285:110,25,teal);
    out+=text('TAKE RISKS',right,mobile?250:70,mobile?26:32,red)+text('承担风险',right,mobile?285:110,25,red);
    if(stage>=1){out+=`<g transform="translate(${left} ${y}) scale(.65)">${wheat(-105,0)}${person(0,0)}${oven(120,0)}</g>`+text('Land + labour + capital',left,y+90,mobile?21:25);}
    else out+=text('?',left,y,62,teal);
    if(stage>=2){out+=`<rect x="${right-92}" y="${y-35}" width="184" height="88" rx="12" fill="${red}"/>`+text('¥120 paid',right,y+18,30,'white')+text('Profit or loss?',right,y+92,28,red);}
    else out+=text('?',right,y,62,red);
    return out;
  }
  function revenue(stage,mobile){
    const w=mobile?620:1120;let out='';
    out+=text('12 boxes × ¥15 = ¥180',w/2,55,mobile?29:34);
    out+=text('Each token = ¥30',w/2,96,23,teal);
    for(let i=0;i<6;i++){
      if(stage===0)continue;
      const moved=stage>=2&&i<4;
      const x=mobile?105+i%3*200:(stage>=2?(i<4?130+i*140:805+(i-4)*150):200+i*145);
      const y=mobile?180+Math.floor(i/3)*105:(stage>=2?265:200);
      out+=`<g data-move="money${i}" transform="translate(${x} ${y})"><rect x="-57" y="-31" width="114" height="62" rx="9" fill="${moved?ink:teal}"/><rect x="-49" y="-23" width="98" height="46" rx="5" fill="none" stroke="#ffffff60"/>${text('¥30',0,10,29,'white')}</g>`;
    }
    if(stage===0)out+=text('Revenue? Cost? Profit?',w/2,mobile?245:255,mobile?29:37);
    if(stage===1)out+=text('All ¥180 is revenue.',w/2,mobile?390:340,34,teal);
    if(stage>=2){out+=text('Costs: ¥120',mobile?310:335,mobile?400:355,mobile?30:34,ink);out+=text(stage===3?'Profit: ¥60':'What remains?',mobile?310:880,mobile?458:355,mobile?30:34,teal);}
    return out;
  }
  function rewards(stage,mobile){
    const rows=[['Land 土地','Rent 地租'],['Labour 劳动','Wages 工资'],['Capital 资本','Interest 利息'],['Enterprise 企业家才能','Profit 利润']];
    return rows.map(([factor,reward],i)=>{
      const y=(mobile?80:55)+i*(mobile?126:96), x=mobile?80:125;
      const icon=[wheat,person,oven,(x,y)=>person(x,y,true)][i];
      return `<rect x="15" y="${y-43}" width="${mobile?590:1090}" height="${mobile?116:88}" rx="6" fill="#e7efeb"/>`+
       `<g transform="translate(${x} ${y}) scale(.48)">${icon(0,0)}</g>`+
       text(factor,mobile?142:225,y+9,mobile?23:31,ink,'start')+
       (stage>i?`<path d="M${mobile?386:640} ${y} h${mobile?30:110}" stroke="${teal}" stroke-width="4"/>`+text(reward,mobile?510:900,y+9,mobile?24:34,teal):text('?',mobile?510:900,y+9,34,ink));
    }).join('');
  }
  function risk(stage,mobile){
    let out='';const sales=stage===0?0:stage===1?12:6;
    for(let i=0;i<12;i++)out+=box((mobile?155:95)+(i%6)*62,(mobile?120:135)+Math.floor(i/6)*62,i,i<sales);
    out+=text(stage===0?'12 boxes ready':`${sales} sold · ${12-sales} unsold`,mobile?310:250,mobile?260:275,30);
    out+=text('Price ¥15 each',mobile?310:250,mobile?306:324,25);
    const x=mobile?65:555,y=mobile?413:120,scale=mobile?2.5:2.65;
    out+=text('Total cost 总成本',x,y-26,24,ink,'start');
    out+=`<rect x="${x}" y="${y}" width="${120*scale}" height="43" rx="5" fill="${ink}"/>`+text('¥120',x+120*scale+12,y+30,25,ink,'start');
    out+=text('Sales revenue 销售收入',x,y+105,24,ink,'start');
    if(stage>0){out+=`<rect data-bar="revenue" x="${x}" y="${y+130}" width="${sales*15*scale}" height="43" rx="5" fill="${stage===1?teal:gold}"/>`;
      out+=text(stage===2?'?':`¥${sales*15}`,x+sales*15*scale/2,y+160,25,stage===1?'white':ink);
    }else out+=text('?',x+100,y+161,33);
    out+=`<path d="M${x+120*scale} ${y-8} V${y+186}" stroke="${red}" stroke-width="2" stroke-dasharray="7 6"/>`;
    if(stage===1||stage===3){const yy=mobile?675:390;out+=text(stage===1?'¥60 profit 利润':'¥30 loss 亏损',mobile?310:810,yy,36,stage===1?teal:red);}
    return out;
  }
  IGCSE.mountFactorAnimations=()=>{
    if(document.body.classList.contains('enterprise-classroom')){
      document.querySelectorAll('.is-layout-factor-motives .cardTitle,.is-compare .choice').forEach(el=>{
        const parts=el.textContent.trim().match(/^(.*?)([\u3400-\u9fff].*)$/s);
        if(parts)el.innerHTML=esc(parts[1].trim())+`<span class="inlineZh" lang="zh-Hans">${esc(parts[2])}</span>`;
      });
    }
    for(const kind of Object.keys(captions)){
      const slide=document.querySelector(`.slide.is-layout-${kind}`);if(!slide)continue;
      const steps=[...slide.querySelectorAll('.partial-item')];
      const scenario=slide.querySelector('.content main > div > .lead')?.textContent || '';
      const host=document.createElement('div');host.className='factor-film';host.setAttribute('aria-live','polite');
      slide.querySelector('.content main > div').append(host);slide.classList.add('factor-enhanced');
      let last=-1,lastMobile;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
      const draw=(print=false)=>{
        const stage=print?captions[kind].length-1:steps.filter(s=>s.classList.contains('is-visible')).length;
        const mobile=!print&&innerWidth<760;if(stage===last&&mobile===lastMobile)return;
        const [title,caption]=captions[kind][stage];
        const h=mobile?(kind==='factor-risk'?710:540):420;
        const drawing=({'factor-assembly':assembly,'factor-rewards':rewards,'factor-person':roles,'factor-revenue':revenue,'factor-risk':risk})[kind](stage,mobile);
        host.innerHTML=`<div class="factor-film-heading"><h2>${esc(title)}</h2><span>${stage+1} / ${captions[kind].length}</span></div><p class="factor-context">${esc(scenario)}</p><svg viewBox="0 0 ${mobile?620:1120} ${h}" role="img" aria-label="${esc(title+'. '+caption)}">${drawing}</svg><p class="factor-caption">${esc(caption)}</p>`;
        host.dataset.frame=String(stage);
        if(!print&&!reduced.matches&&last>=0&&last!==stage){
          host.querySelectorAll('[data-move]').forEach((el,i)=>el.animate([{opacity:0,translate:`0 ${stage>last?'-25':'25'}px`},{opacity:1,translate:'0 0'}],{duration:450,delay:i*28,fill:'backwards'}));
          host.querySelectorAll('[data-bar]').forEach(el=>el.animate([{opacity:.25,transform:'scaleX(.2)'},{opacity:1,transform:'scaleX(1)'}],{duration:650}));
        }
        last=stage;lastMobile=mobile;
      };
      const observer=new MutationObserver(()=>draw());steps.forEach(s=>observer.observe(s,{attributes:true,attributeFilter:['class']}));
      observer.observe(slide,{attributes:true,attributeFilter:['class']});new ResizeObserver(()=>draw()).observe(slide);
      addEventListener('beforeprint',()=>draw(true));addEventListener('afterprint',()=>{last=-1;draw();});draw();
    }
    const imageCheck=document.querySelector('.is-layout-factor-image-check');
    if(imageCheck){
      const icons=[wheat,person,(x,y)=>person(x,y,true),oven];
      imageCheck.querySelectorAll('.classificationItemTop').forEach((item,i)=>{
        const figure=document.createElement('div');figure.className='factor-check-icon';
        figure.innerHTML=`<svg viewBox="-85 -65 170 165" role="img" aria-label="${['Natural resources','Worker','Entrepreneur','Production equipment'][i]}">${icons[i](0,0)}</svg>`;
        item.prepend(figure);
      });
    }
    document.querySelectorAll('#deck .slide').forEach((slide,index)=>{
      const data=IGCSE.lesson.slides[index];
      if(!data?.optionColumns)return;
      slide.classList.add('factor-table-mcq');
      const choices=slide.querySelector('.choices');const header=document.createElement('div');header.className='factor-option-head';
      header.innerHTML=`<span></span><b>${esc(data.optionColumns[0])}</b><b>${esc(data.optionColumns[1])}</b>`;choices.before(header);
      choices.querySelectorAll('.choice > span:last-child').forEach(span=>{const cols=span.textContent.split(' — ');span.className='factor-option-pair';span.innerHTML=cols.map(s=>`<span>${esc(s)}</span>`).join('');});
    });
  };
})();
