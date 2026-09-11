/* Reusable economic diagrams: semantic model values -> equal-scale SVG geometry.
   No canvas, screenshots, animation libraries or remote dependencies. */
(function (global) {
  'use strict';
  const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const mathMarkup=s=>{
    let out=esc(s).replaceAll('ΔY_d','@@DELTA_Y_SUB_D@@').replaceAll('Y_d','@@Y_SUB_D@@');
    out=out.replace(/\b(C|I|Y|a|v)\b/g,'<tspan class="math-var">$1</tspan>');
    return out
      .replaceAll('@@DELTA_Y_SUB_D@@','<tspan class="math-symbol">Δ</tspan><tspan class="math-var">Y</tspan><tspan class="math-sub">d</tspan>')
      .replaceAll('@@Y_SUB_D@@','<tspan class="math-var">Y</tspan><tspan class="math-sub">d</tspan>');
  };
  const spokenMath=s=>String(s).replaceAll('$','').replaceAll('ΔY_d','change in Y sub d').replaceAll('Y_d','Y sub d');
  const line=(x1,y1,x2,y2,cls='',attr='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" ${attr}/>`;
  const text=(x,y,t,cls='',anchor='start')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(t)}</text>`;
  const mathText=(x,y,t,cls='',anchor='start')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${mathMarkup(t)}</text>`;
  const dot=(x,y,cls='',attr='')=>`<circle cx="${x}" cy="${y}" r="5.5" class="point ${cls}" ${attr}/>`;
  const group=(content,stage=0,until=99,cls='')=>`<g data-stage="${stage}" data-until="${until}" class="${cls}">${content}</g>`;
  const bracket=(x,y1,y2,label)=>line(x,y1,x,y2,'change')+line(x-5,y1,x+5,y1,'change')+line(x-5,y2,x+5,y2,'change')+text(x+14,Math.max(y1,y2)+27,label,'change-label');
  const arrow=(id,color)=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" style="fill:${color};stroke:none"/></marker>`;
  const svg=(body,id,label)=>`<svg viewBox="0 0 640 560" preserveAspectRatio="xMinYMid meet" role="img" aria-labelledby="${id}-title ${id}-desc" class="econ-svg"><title id="${id}-title">${esc(label)}</title><desc id="${id}-desc">Use the diagram step controls to show each change. Original positions remain as labelled dashed reference lines.</desc><defs>${arrow(id+'-arrow','#a66c10')}${arrow(id+'-income','#067467')}${arrow(id+'-shift','#b65b35')}</defs>${body}</svg>`;
  function ae(s,id) {
    const scale=400/s.max, X=v=>100+scale*v,Y=v=>450-scale*v;
    const eq=s.investment/(1-s.mpc), next=(s.investment+s.delta)/(1-s.mpc), aeAt=y=>s.investment+s.mpc*y;
    const isShift=['shift','multiplier'].includes(s.mode),negative=s.delta<0;
    const guides=(x,y,cls='')=>line(X(x),Y(0),X(x),Y(y),`guide ${cls}`)+line(X(0),Y(y),X(x),Y(y),`guide ${cls}`);
    const equal=line(X(0),Y(0),X(s.max),Y(s.max),'equality')+text(513,51,'AE = Y','equality-label');
    const old=line(X(0),Y(s.investment),X(s.max),Y(aeAt(s.max)),isShift?'old-curve':'ae-curve')+text(519,Y(aeAt(s.max))+8,isShift?'AE₀':'AE','curve-label '+(isShift?'muted':''));
    const verticalTitle=s.mode==='consumption'?'Planned consumption, C (£m)':s.mode==='investment'?'Planned investment, I (£m)':'Planned expenditure, AE (£m)';
    let b=text(100,20,verticalTitle,'axis-title')+line(100,450,548,450,'axis')+line(100,450,100,45,'axis')+text(325,505,'National income / output, Y (£m)','axis-title','middle');
    for(let v=0;v<=s.max;v+=200){b+=line(X(v),450,X(v),456,'tick')+text(X(v),480,v,'tick-label','middle');if(v)b+=line(94,Y(v),100,Y(v),'tick')+text(84,Y(v)+7,v,'tick-label','end');}
    if(s.mode==='axes'){
      b+=group(dot(X(400),Y(350))+text(X(400)+14,Y(350)-10,'A','curve-label'),1)+group(guides(400,350)+text(82,Y(350)+7,'350','emphasis','end'),2);
    }else if(s.mode==='consumption'){
      b+=group(line(X(0),Y(0),X(s.max),Y(s.mpc*s.max),'component-line')+mathText(520,Y(s.mpc*s.max)+8,'C = 0.75Y','component-label'),1);
      b+=group(guides(400,s.mpc*400)+dot(X(400),Y(s.mpc*400),'green')+text(X(400)+14,Y(s.mpc*400)-12,'C = £300m','new-label'),2);
    }else if(s.mode==='investment'){
      b+=group(line(X(0),Y(s.investment),X(s.max),Y(s.investment),'investment-line')+mathText(519,Y(s.investment)-12,'I = £100m','investment-label'),1);
      b+=group(guides(400,s.investment)+dot(X(400),Y(s.investment),'copper'),2);
    }else if(s.mode==='build'){
      b+=line(X(0),Y(0),X(s.max),Y(s.mpc*s.max),'component-line')+mathText(519,Y(s.mpc*s.max)+8,'C = 0.75Y','component-label');
      b+=group(line(X(0),Y(s.investment),X(s.max),Y(s.investment),'investment-line')+mathText(519,Y(s.investment)-12,'I = £100m','investment-label')+bracket(X(600),Y(s.mpc*600),Y(aeAt(600)),'+ £100m'),1);
      b+=group(line(X(0),Y(s.investment),X(s.max),Y(aeAt(s.max)),'new-curve')+mathText(519,Y(aeAt(s.max))+8,'AE = C + I','new-label'),2);
      b+=group(guides(400,400,'green')+dot(X(400),Y(400),'green')+text(X(400)+14,Y(400)-12,'300 + 100 = 400','new-label'),3);
    }else if(s.mode==='equality'){
      b+=group(equal,1)+group(guides(400,400)+dot(X(400),Y(400))+text(X(400)-16,Y(400)-15,'B','curve-label','end'),1)+group(guides(600,600,'green')+dot(X(600),Y(600),'green'),2);
      b+=group(`<path d="M 140 450 A 40 40 0 0 0 128.3 421.7" class="angle"/>`+text(151,431,'45°','tick-label'),1);
    }else if(s.mode==='spending'){
      b+=dot(X(0),Y(s.investment))+text(84,Y(s.investment)+7,s.investment,'emphasis','end');
      b+=group(old,1)+group(line(X(200),Y(aeAt(200)),X(400),Y(aeAt(200)),'slope')+line(X(400),Y(aeAt(200)),X(400),Y(aeAt(400)),'slope')+text(X(300),Y(aeAt(200))+29,'+200','change-label','middle')+text(X(400)+14,Y(aeAt(325)),'+150','change-label'),2);
    }else if(s.mode==='equilibrium'){
      b+=equal+old+group(dot(X(eq),Y(eq))+text(X(eq)-13,Y(eq)-18,'E₀','curve-label','end'),1)+group(guides(eq,eq),2);
    }else if(['below','above'].includes(s.mode)){
      const start=s.mode==='below'?200:600,v=aeAt(start);
      b+=equal+old+dot(X(eq),Y(eq),'neutral')+text(X(eq)-15,Y(eq)-16,'E₀','curve-label','end');
      b+=group(guides(start,v)+dot(X(start),Y(v),'neutral'),0,1)+group(bracket(X(start),Y(start),Y(v),'£50m'),1,1);
      b+=group(line(X(start),Y(v),X(eq),Y(eq),'movement',`marker-end="url(#${id}-arrow)"`),2);
      b+=`<g class="traveller" data-from-x="${X(start)}" data-from-y="${Y(v)}" data-to-x="${X(eq)}" data-to-y="${Y(eq)}" data-move-stage="2">${dot(0,0)}</g>`;
      b+=group(guides(eq,eq),2);
    }else if(isShift){
      const newLabel=negative?'AE₂':'AE₁';
      b+=equal+old+dot(X(eq),Y(eq),'neutral')+group(guides(eq,eq,'muted'),0);
      if(s.labelOldEquilibrium)b+=text(X(eq)-15,Y(eq)-18,'E₀','curve-label','end');
      b+=`<g class="shift-line" data-shift="${-s.delta*scale}">${line(X(0),Y(s.investment),X(s.max),Y(aeAt(s.max)),'new-curve')+text(519,Y(aeAt(s.max))+8,newLabel,'new-label')}</g>`;
      b+=group(bracket(X(eq),Y(eq),Y(eq+s.delta),`ΔI = ${s.delta<0?'−':''}£${Math.abs(s.delta)}m`),s.mode==='shift'?2:1);
      b+=group(dot(X(eq),Y(eq+s.delta),'copper'),1);
      if(s.mode==='multiplier'){
        b+=group(line(X(eq),Y(eq+s.delta),X(next),Y(next),'movement',`marker-end="url(#${id}-arrow)"`),2);
        b+=`<g class="traveller new-traveller" data-from-x="${X(eq)}" data-from-y="${Y(eq+s.delta)}" data-to-x="${X(next)}" data-to-y="${Y(next)}" data-move-stage="2">${dot(0,0,'green')}</g>`;
        b+=group(guides(next,next,'green')+text(X(next)-15,Y(next)-18,negative?'E₂':'E₁','new-label','end'),2);
        b+=group(line(X(eq),526,X(next),526,'income-change',`marker-end="url(#${id}-income)"`)+text((X(eq)+X(next))/2,554,`ΔY = ${negative?'−':''}£${Math.abs(next-eq)}m`,'income-label','middle'),3);
      }
    }
    return svg(b,id,'Income-expenditure diagram. '+s.steps[0].label);
  }
  function adas(s,id){
    const X=v=>95+4.7*v,Y=v=>450-4.1*v;
    // Schematic AD: P = intercept - 0.55Y; SRAS: P = 8 + 0.7Y.
    const roundValues=s.roundValues||[50,37.5,28.125],intercepts=[65],subscripts=['₀','₁','₂','₃'];
    roundValues.forEach(value=>intercepts.push(intercepts.at(-1)+.4*value));
    const roundLabel=value=>`£${Number.isInteger(value)?value:value.toFixed(1)}m`,eq=i=>({x:(intercepts[i]-8)/1.25,y:8+.7*(intercepts[i]-8)/1.25});
    const curve=(i,cls)=>line(X(5),Y(intercepts[i]-.55*5),X(92),Y(intercepts[i]-.55*92),cls)+text(X(95),Y(intercepts[i]-.55*92)+8,`AD${subscripts[i]}`,`curve-label ${cls}`);
    const project=(i,cls)=>{const p=eq(i);return line(X(p.x),Y(0),X(p.x),Y(p.y),`guide ${cls}`)+line(X(0),Y(p.y),X(p.x),Y(p.y),`guide ${cls}`)+dot(X(p.x),Y(p.y),cls)+text(X(p.x),480,`Y${subscripts[i]}`,`tick-label ${cls}`,'middle')+text(81,Y(p.y)+7,`P${subscripts[i]}`,`tick-label ${cls}`,'end');};
    let b=text(95,24,'Price level','axis-title')+line(95,450,550,450,'axis')+line(95,450,95,42,'axis')+text(325,515,'Real GDP','axis-title','middle');
    const supply=line(X(4),Y(8+.7*4),X(94),Y(8+.7*94),'supply')+text(X(94)+7,Y(8+.7*94)-8,'SRAS','supply-label');
    if(s.mode==='recall')b+=group(supply+curve(0,'ae-curve'),1)+group(project(0,''),2);
    else if(s.mode==='rounds'){
      const shift=(from,to,x,label,cls,stage)=>{
        const mid=(intercepts[from]+intercepts[to])/2-.55*x;
        return group(curve(to,cls)+line(X(x),Y(intercepts[from]-.55*x),X(x),Y(intercepts[to]-.55*x),'shift-arrow',`marker-end="url(#${id}-shift)"`)+text(X(x)+10,Y(mid)+5,label,'round-label'),stage);
      };
      b+=supply+curve(0,'old-curve')+project(0,'muted');
      b+=shift(0,1,17,roundLabel(roundValues[0]),'round-one',1);
      b+=shift(1,2,31,roundLabel(roundValues[1]),'round-two',2);
      b+=shift(2,3,45,roundLabel(roundValues[2]),'round-three',3);
      b+=group(project(3,'green'),4);
    }else{
      const initial=s.mode==='further'?1:0, end=initial+1;
      b+=supply+curve(0,'old-curve')+project(0,'muted')+(initial===1?curve(1,'reference-blue')+project(1,'reference-blue'):'');
      const shift=-(intercepts[end]-intercepts[initial])*4.1;
      b+=`<g class="shift-line" data-shift="${shift}">${line(X(5),Y(intercepts[initial]-.55*5),X(92),Y(intercepts[initial]-.55*92),'new-curve')+text(X(95),Y(intercepts[initial]-.55*92)+8,`AD${end===1?'₁':'₂'}`,'new-label')}</g>`;
      b+=group(line(X(24),Y(intercepts[initial]-.55*24),X(24),Y(intercepts[end]-.55*24),'shift-arrow',`marker-end="url(#${id}-shift)"`),1);
      const a=eq(initial),z=eq(end);
      b+=group(line(X(a.x),Y(a.y),X(z.x),Y(z.y),'movement',`marker-end="url(#${id}-arrow)"`)+project(end,'green'),2);
      b+=`<g class="traveller new-traveller" data-from-x="${X(a.x)}" data-from-y="${Y(a.y)}" data-to-x="${X(z.x)}" data-to-y="${Y(z.y)}" data-move-stage="2">${dot(0,0,'green')}</g>`;
    }
    return svg(b,id,'Aggregate demand and short-run aggregate supply. Schematic, not to a numerical scale.');
  }
  function consumption(s,id){
    const maxIncome=s.maxIncome||2000,maxValue=s.maxValue||1800;
    const X=v=>100+440*v/maxIncome,Y=v=>450-390*v/maxValue,curve=v=>s.autonomous+s.mpc*v;
    const guides=(x,y,cls='')=>line(X(x),Y(0),X(x),Y(y),`guide ${cls}`)+line(X(0),Y(y),X(x),Y(y),`guide ${cls}`);
    let b=mathText(100,24,'Consumption, C (£m)','axis-title')+line(100,450,552,450,'axis')+line(100,450,100,42,'axis')+mathText(325,515,'Disposable income, Y_d (£m)','axis-title','middle');
    for(let v=0;v<=maxIncome;v+=500)b+=line(X(v),450,X(v),456,'tick')+text(X(v),480,v,'tick-label','middle');
    for(let v=500;v<maxValue;v+=500)b+=line(94,Y(v),100,Y(v),'tick')+text(84,Y(v)+7,v,'tick-label','end');
    const end=Math.min(maxIncome,(maxValue-s.autonomous)/s.mpc);
    b+=group(line(X(0),Y(curve(0)),X(end),Y(curve(end)),'consumption-curve')+dot(X(0),Y(s.autonomous),'copper')+mathText(86,Y(s.autonomous)+7,`a = ${s.autonomous}`,'change-label','end')+mathText(X(end)-5,Y(curve(end))-14,`C = ${s.autonomous} + ${s.mpc}Y_d`,'consumption-label','end'),0);
    const from=1000,to=1500;
    b+=group(guides(to,curve(to))+dot(X(to),Y(curve(to)),'green')+line(X(from),Y(curve(from)),X(to),Y(curve(to)),'slope')+line(X(to),Y(curve(from)),X(to),Y(curve(to)),'slope')+mathText((X(from)+X(to))/2,Y(curve(from))+28,'ΔY_d = 500','change-label','middle')+mathText(X(to)+13,(Y(curve(from))+Y(curve(to)))/2,'ΔC = 400','change-label'),1);
    const breakEven=s.autonomous/(1-s.mpc);
    b+=group(line(X(0),Y(0),X(Math.min(maxIncome,maxValue)),Y(Math.min(maxIncome,maxValue)),'equality')+mathText(X(1680),Y(1680)+26,'C = Y_d','equality-label')+guides(breakEven,breakEven,'green')+dot(X(breakEven),Y(breakEven),'green')+text(X(breakEven)+18,Y(breakEven)-17,'break-even','new-label'),2);
    b+=group(`<polygon points="${X(0)},${Y(0)} ${X(0)},${Y(curve(0))} ${X(breakEven)},${Y(breakEven)}" class="zone-dissaving"/>`+`<polygon points="${X(breakEven)},${Y(breakEven)} ${X(1800)},${Y(1800)} ${X(1800)},${Y(curve(1800))}" class="zone-saving"/>`,3);
    return svg(b,id,'Consumption function showing autonomous and induced consumption, the marginal propensity to consume, and break-even income.');
  }
  function accelerator(s,id){
    const values=s.output,changes=values.map((v,i)=>i?v-values[i-1]:null),investment=changes.map(v=>v===null?null:v*s.coefficient);
    const X=i=>105+i*86,topY=v=>250-(v-100)*3.6,base=455,barY=v=>base-v*4.2;
    let b=text(100,24,'Output level and induced investment','axis-title')+text(73,72,'OUTPUT (£bn)','panel-label')+text(73,320,'INDUCED I (£bn)','panel-label')+line(95,265,550,265,'panel-rule')+line(95,455,550,455,'axis');
    values.forEach((v,i)=>{b+=text(X(i),493,`Year ${i+1}`,'tick-label','middle');});
    const points=values.map((v,i)=>`${X(i)},${topY(v)}`).join(' ');
    b+=group(`<polyline points="${points}" class="series-line"/>`+values.map((v,i)=>dot(X(i),topY(v),i===0?'neutral':'')).join('')+values.map((v,i)=>text(X(i),topY(v)-15,v,'series-value','middle')).join(''),0);
    b+=group(changes.slice(1).map((v,i)=>text((X(i)+X(i+1))/2,topY((values[i]+values[i+1])/2)-17,`+${v}`,'delta-label','middle')).join(''),1);
    b+=group(investment.map((v,i)=>v===null?text(X(i),base-10,'—','bar-label','middle'):`<rect x="${X(i)-22}" y="${barY(v)}" width="44" height="${base-barY(v)}" rx="3" class="bar-investment"/>`+text(X(i),barY(v)-10,v,'bar-label','middle')).join(''),2);
    b+=group(`<rect x="${X(3)-31}" y="${barY(investment[3])-14}" width="62" height="${base-barY(investment[3])+20}" rx="8" class="highlight-ring"/>`+`<rect x="${X(4)-31}" y="${barY(investment[4])-14}" width="62" height="${base-barY(investment[4])+20}" rx="8" class="highlight-ring"/>`+text((X(3)+X(4))/2,305,'GDP rises, but investment falls','highlight-label','middle'),3);
    return svg(b,id,'Accelerator diagram comparing the level of real GDP with induced investment generated by changes in GDP.');
  }
  function investmentComparison(s,id){
    const Y=v=>400-5*v;
    let b='';
    for(const [panel,left,title,zh] of [[0,65,'Autonomous investment','自主投资'],[1,370,'Induced investment','引致投资']]){
      const X=v=>left+9*v;
      b+=text(left+90,45,title,'comparison-title','middle')+text(left+90,74,zh,'comparison-zh','middle');
      b+=text(left,128,'Investment (£m)','comparison-axis');
      b+=line(left,400,left+205,400,'axis')+line(left,400,left,160,'axis');
      for(const v of [0,10,20])b+=line(X(v),400,X(v),406,'tick')+text(X(v),431,v,'tick-label','middle');
      for(const v of [20,40])b+=line(left-5,Y(v),left,Y(v),'tick')+text(left-12,Y(v)+6,v,'tick-label','end');
      b+=text(left+90,469,'Income growth, ΔY (£m)','comparison-axis','middle')+text(left+90,498,'收入增量','comparison-zh','middle');
      if(panel===0){
        b+=group(line(X(0),Y(s.autonomous),X(20),Y(s.autonomous),'investment-line')+text(left+90,Y(s.autonomous)-17,'£20m unchanged','comparison-autonomous','middle'),1);
        b+=group([10,20].map(v=>line(X(v),400,X(v),Y(s.autonomous),'guide')+dot(X(v),Y(s.autonomous),'copper')).join(''),3);
      }else{
        b+=group(line(X(0),Y(0),X(20),Y(20*s.coefficient),'component-line'),2);
        b+=group([10,20].map(v=>line(X(v),400,X(v),Y(v*s.coefficient),'guide green')+line(left,Y(v*s.coefficient),X(v),Y(v*s.coefficient),'guide green')+dot(X(v),Y(v*s.coefficient),'green')).join(''),3);
      }
    }
    return svg(b,id,'Autonomous and induced investment compared against changes in income.');
  }
  function factoryMachines(s,id){
    const machine=(x,y,type)=>`<g transform="translate(${x} ${y})" class="machine-icon machine-${type}"><rect x="0" y="4" width="38" height="30" rx="3"/><path d="M 4 34 V 40 H 10 V 34 M 28 34 V 40 H 34 V 34 M 7 12 H 22 V 23 H 7 Z"/><circle cx="30" cy="13" r="2"/><path d="M 26 23 H 34"/></g>`;
    let b=text(34,36,'Machines operating','machine-heading')+text(414,36,'Bought this year','machine-heading')+line(378,65,378,483,'panel-rule');
    s.years.forEach((row,index)=>{
      const top=index?310:90;
      let stock='',purchases='';
      for(let i=0;i<row.stock;i++){
        const type=i<row.retained?'retained':i<row.retained+row.replacement?'replacement':'extra';
        stock+=machine(35+(i%5)*61,top+34+Math.floor(i/5)*57,type);
      }
      for(let i=0;i<row.replacement+row.extra;i++)purchases+=machine(423+i*57,top+55,i<row.replacement?'replacement':'extra');
      b+=group(text(35,top,`Year ${row.year}: ${row.demand.toLocaleString('en-GB')} units`,'machine-row-title')+stock+text(35,top+164,`${row.stock} machines in use`,'machine-caption')+purchases+text(476,top+134,`${row.replacement+row.extra} purchased`,'machine-purchases','middle'),index+1);
    });
    b+=text(35,533,'Grey: retained','machine-legend')+text(227,533,'Copper: replacement','machine-legend')+text(464,533,'Green: extra','machine-legend');
    return svg(b,id,'Operating machines compared with annual machine purchases.');
  }
  function markup(scene,id){
    if(scene.model==='factory-machines')return factoryMachines(scene,id);
    if(scene.model==='investment-comparison')return investmentComparison(scene,id);
    if(scene.model==='adas')return adas(scene,id);
    if(scene.model==='consumption')return consumption(scene,id);
    if(scene.model==='accelerator')return accelerator(scene,id);
    return ae(scene,id);
  }
  function update(root,scene,step,instant=false){
    root.classList.toggle('instant',instant);
    root.querySelectorAll('[data-stage]').forEach(el=>{const shown=step>=+el.dataset.stage&&step<=+el.dataset.until;el.classList.toggle('is-hidden',!shown);el.setAttribute('aria-hidden',String(!shown));});
    root.querySelectorAll('.shift-line').forEach(el=>{el.style.opacity=step>=1?'1':'0';el.style.transform=`translateY(${step>=1?el.dataset.shift:0}px)`;});
    root.querySelectorAll('.traveller').forEach(el=>{const moved=step>=+el.dataset.moveStage;el.style.transform=`translate(${moved?el.dataset.toX:el.dataset.fromX}px,${moved?el.dataset.toY:el.dataset.fromY}px)`;el.style.opacity=el.classList.contains('new-traveller')&&step<1?'0':'1';});
    const diagram=root.querySelector('svg');
    diagram?.setAttribute('aria-label',spokenMath(`${scene.steps[step].label}. ${scene.steps[step].text} ${scene.steps[step].takeaway}`));
    if(diagram){diagram.querySelector('title').textContent=scene.steps[step].label;diagram.querySelector('desc').textContent=spokenMath(`${scene.steps[step].text} ${scene.steps[step].takeaway}`);}
  }
  global.EconDiagrams={markup,update};
}(window));
