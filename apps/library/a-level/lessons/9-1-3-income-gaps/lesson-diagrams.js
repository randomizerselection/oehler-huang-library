// Lesson-owned diagrams reuse the course's reversible state/transition engine.
(function () {
  'use strict';
  const original=window.EconDiagrams.markup;
  const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  const text=(x,y,s,c='',anchor='start')=>`<text x="${x}" y="${y}" class="${c}" text-anchor="${anchor}">${esc(s)}</text>`;
  const line=(x1,y1,x2,y2,c)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}"/>`;
  const group=(b,start=0,end=99)=>`<g data-stage="${start}" data-until="${end}">${b}</g>`;
  const dot=(x,y,c='')=>`<circle cx="${x}" cy="${y}" r="5" class="point ${c}"/>`;
  const sub=(x,y,a,b,c='gap-axis-label')=>`<text x="${x}" y="${y}" class="${c}" text-anchor="middle">${a}<tspan baseline-shift="sub" font-size="70%">${b}</tspan></text>`;
  const svg=(body,id)=>`<svg class="econ-svg gap-svg" viewBox="0 0 640 560" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">Income and expenditure</title><desc id="${id}-desc">Reversible teaching diagram with labelled model values.</desc>${body}</svg>`;
  function gap(s,id){
    const cash=v=>`${s.currency||'£'}${Number(v.toFixed(6))}${s.unit||'m'}`;
    const scale=400/s.max,X=v=>90+scale*v,Y=v=>450-scale*v;
    const eq=Number((s.autonomous/(1-s.mpc)).toFixed(6)),ae=v=>s.autonomous+s.mpc*v;
    const full=s.full,at=ae(full),delta=full-at,close=s.mode==='close',infl=s.mode==='inflation',intro=s.mode==='equilibrium';
    const project=(v,c)=>line(X(v),450,X(v),Y(v),'guide '+c)+dot(X(v),Y(v),c);
    const eqLabel=(v,label,c)=>project(v,c)+text(X(v)-14,Y(v)-12,label,'gap-eq-label '+c,'end')+text(X(v),478,String(v),'gap-axis-label','middle');
    let b=text(90,22,`Planned expenditure, AE (${s.axisUnit||'£m'})`,'axis-title')+text(90,49,'计划总支出','gap-zh')+line(90,450,535,450,'axis')+line(90,450,90,64,'axis')+text(90,478,'0','gap-axis-label','middle')+text(315,527,`National income / output, Y (${s.axisUnit||'£m'})`,'axis-title','middle')+text(315,555,'国民收入 / 产出','gap-zh','middle');
    b+=line(X(0),Y(0),X(s.max),Y(s.max),'equality')+text(X(s.max)+8,Y(s.max)+6,'AE = Y','gap-curve-label');
    b+=line(X(0),Y(s.autonomous),X(s.max),Y(ae(s.max)),close?'old-curve':'ae-curve')+text(X(s.max)+8,Y(ae(s.max))+(infl?34:close?23:7),close?'AE₀':'AE','gap-curve-label');
    const eqStage=intro?1:infl?3:0;
    b+=group(eqLabel(eq,infl?'E*':'E₀',infl?'muted':''),eqStage);
    if(!infl)b+=group(sub(X(eq),501,'Y','0'),eqStage);
    else b+=group(text(90,78,'E*: notional equilibrium','gap-notional'),3);
    const fullStage=intro?2:0;
    b+=group(line(X(full),450,X(full),90,'gap-capacity')+text(X(full),478,String(full),'gap-axis-label','middle')+sub(X(full),501,'Y','F')+text(X(full)-12,100,'Full employment','gap-capacity-label','end')+text(X(full)-12,124,'充分就业','gap-zh','end'),fullStage);
    if(intro)return svg(b,id);
    if(close){
      const shift=delta*scale,newA=s.autonomous+delta;
      b+=`<g class="shift-line" data-shift="${-shift}">${line(X(0),Y(s.autonomous),X(s.max),Y(ae(s.max)),'new-curve')+text(X(s.max)+8,Y(ae(s.max))+7,'AE₁','gap-curve-label green')}</g>`;
      b+=group(line(X(eq),Y(eq),X(eq),Y(eq+delta),'change')+text(X(eq)-20,Y(eq)+28,`+${cash(delta)}`,'gap-value gap-value-backed','end'),1);
      b+=group(line(X(eq),Y(eq+delta),X(full),Y(full),'movement'),2);
      b+=`<g class="traveller new-traveller" data-from-x="${X(eq)}" data-from-y="${Y(eq+delta)}" data-to-x="${X(full)}" data-to-y="${Y(full)}" data-move-stage="2">${dot(0,0,'green')}</g>`;
      b+=group(text(X(full)+14,Y(full)+10,'E₁','gap-eq-label green','start'),2);
      b+=group(line(X(eq),414,X(full),414,'income-change')+line(X(eq),408,X(eq),420,'income-change')+line(X(full),408,X(full),420,'income-change')+text((X(eq)+X(full))/2,401,`ΔY = +${cash(full-eq)}`,'gap-income-label','middle'),3);
    }else{
      b+=group(line(90,Y(at),X(full),Y(at),'guide green')+dot(X(full),Y(at),'green')+text(76,Y(at)+6,String(at),'gap-axis-label','end')+dot(X(full),Y(full),'neutral')+text(X(full)+(infl?18:-14),Y(full)+(infl?40:-12),`Required: ${full}`,'gap-axis-label',infl?'start':'end'),1);
      b+=group(line(X(full),Y(full),X(full),Y(at),'change')+line(X(full)-7,Y(full),X(full)+7,Y(full),'change')+line(X(full)-7,Y(at),X(full)+7,Y(at),'change')+text(X(full)-14,Y((full+at)/2)+6,cash(Math.abs(delta)),'gap-value gap-value-backed','end'),2);
      if(!infl)b+=group(line(X(eq),413,X(full),413,'income-change')+line(X(eq),407,X(eq),419,'income-change')+line(X(full),407,X(full),419,'income-change')+text((X(eq)+X(full))/2,399,`Income shortfall: ${cash(full-eq)}`,'gap-income-label','middle'),3);
    }
    return svg(b,id);
  }
  function opening(s,id){
    let b=text(40,40,'Across the whole economy','capacity-title');
    b+=text(40,98,'Planned spending · 计划支出','capacity-label')+text(40,250,'Actual output · 实际产出','capacity-label');
    b+=line(520,120,520,354,'gap-capacity')+text(520,390,'Full-employment capacity','gap-zh','end');
    const state=(ae,y,copy,step)=>group(`<rect x="60" y="120" width="${ae}" height="62" rx="3" class="batch batch-used"/><rect x="60" y="272" width="${y}" height="62" rx="3" class="batch batch-used"/>`+text(40,452,copy,'capacity-result'),step,step);
    b+=state(360,460,'Unplanned inventories rise',0);
    b+=state(300,380,'Income ↓ → Consumption ↓',1);
    b+=state(280,280,'AE = Y, but resources remain unused',2);
    b+=group(`<rect x="340" y="272" width="180" height="62" class="batch batch-idle"/>`+text(430,365,'Unused capacity','gap-value','middle'),2);
    b+=text(40,516,'Illustration of adjustment · not measured data','flow-small');
    return svg(b,id);
  }
  function paired(s,id){
    const X=v=>90+400*v/900,Y=v=>450-400*v/900;
    let b=text(90,22,'Planned expenditure, AE (£m)','axis-title')+text(90,49,'计划总支出','gap-zh');
    b+=line(90,450,535,450,'axis')+line(90,450,90,64,'axis')+line(X(0),Y(0),X(900),Y(900),'equality')+text(505,55,'AE = Y','gap-curve-label');
    b+=text(90,478,'0','gap-axis-label','middle')+text(315,527,'National income / output, Y (£m)','axis-title','middle')+text(315,555,'国民收入 / 产出','gap-zh','middle');
    b+=line(X(600),450,X(600),82,'gap-capacity')+text(X(600),478,'600','gap-axis-label','middle')+sub(X(600),501,'Y','F')+text(X(600)-12,92,'Full employment','gap-capacity-label','end')+text(X(600)-12,117,'充分就业','gap-zh','end')+dot(X(600),Y(600),'neutral');
    const side=(a,eq,at,label,c,st)=>group(line(X(0),Y(a),X(900),Y(a+.75*900),c)+text(505,Y(a+.75*900)+6,label,'gap-curve-label '+c)+line(90,Y(at),X(600),Y(at),'guide')+text(76,Y(at)+6,String(at),'gap-axis-label','end')+dot(X(600),Y(at),c)+line(X(600),Y(600),X(600),Y(at),c+' paired-bracket')+text(X(600)+(st===1?14:-14),Y((600+at)/2)+6,'£50m','gap-value gap-value-backed',st===1?'start':'end')+dot(X(eq),Y(eq),c)+line(X(eq),450,X(eq),Y(eq),'guide')+text(X(eq),478,String(eq),'gap-axis-label','middle')+text(X(eq)-12,Y(eq)-10,st===1?'E₀':'E*','gap-eq-label', 'end'),st);
    b+=side(100,400,550,'Low AE','ae-curve',1);
    b+=side(200,800,650,'High AE','paired-high',2);
    b+=group(line(X(400),417,X(600),417,'income-change')+line(X(400),411,X(400),423,'income-change')+line(X(600),411,X(600),423,'income-change')+text((X(400)+X(600))/2,401,'Output gap: −£200m','gap-income-label','middle'),3);
    return svg(b,id);
  }
  window.EconDiagrams.markup=(scene,id)=>scene.model==='income-gap'?gap(scene,id):scene.model==='opening-story'?opening(scene,id):scene.model==='paired-gaps'?paired(scene,id):original(scene,id);
}());
