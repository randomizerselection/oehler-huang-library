// Lesson-owned geometry. The course engine controls every reversible stage.
(function () {
  const original=window.EconDiagrams.markup;
  const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  const svgMath=v=>esc(v).replace(/([A-Za-z]+)_\{([^}]+)\}/g,'$1<tspan class="math-sub" baseline-shift="sub" font-size="70%">$2</tspan>');
  const t=(x,y,v,c='',anchor='start')=>`<text x="${x}" y="${y}" class="${c}" text-anchor="${anchor}">${svgMath(v)}</text>`;
  const axisTitle=(x,y,lines)=>lines.map((label,i)=>t(x,y+i*24,label,'axis-title','middle')).join('');
  const line=(x1,y1,x2,y2,c='axis')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}"/>`;
  const group=(body,start=0,end=99)=>`<g data-stage="${start}" data-until="${end}">${body}</g>`;
  const dot=(x,y)=>`<circle cx="${x}" cy="${y}" r="6" class="point"/>`;
  const svg=(b,id,title)=>`<svg class="econ-svg growth-svg" viewBox="0 0 640 560" role="img" aria-labelledby="${id}-svg-title ${id}-svg-desc"><title id="${id}-svg-title">${esc(title)}</title><desc id="${id}-svg-desc">Reversible teacher illustration of actual output and productive capacity.</desc>${b}</svg>`;
  function capacity(id){
    const blocks=(y,count,capacity)=>Array.from({length:capacity},(_,i)=>`<rect x="${40+(i%6)*87}" y="${y+Math.floor(i/6)*57}" width="74" height="44" rx="3" class="${i<count?'block':i>=10?'extra':'empty'}"/>`).join('');
    let b=t(40,38,'The whole economy','large')+t(40,72,'Annual real output · £bn at constant prices','small');
    b+=t(40,127,'Output produced / capacity available','zh');
    b+=group(blocks(155,8,10)+t(40,315,'800 / 1000','large green-text'),0,0);
    b+=group(blocks(155,9,10)+t(40,315,'900 / 1000','large green-text'),1,1);
    b+=group(blocks(155,9,12)+t(40,315,'900 / 1200','large green-text'),2);
    b+=t(40,385,'Filled blocks: output produced','small')+t(40,420,'Outlined blocks: unused capacity','small');
    b+=group(t(40,472,'Output rises; capacity is unchanged.','green-text'),1,1);
    b+=group(t(40,472,'Capacity rises; output is unchanged.','copper-text'),2);
    return svg(b,id,'Actual output rises from 800 to 900 using fixed capacity of 1000; capacity then expands to 1200 while output stays at 900.');
  }
  function ppc(id){
    let b=axisTitle(80,36,['Capital goods','per year'])+line(80,455,576,455)+line(80,455,80,85)+t(80,485,'0','','middle')+t(576,516,'Consumer goods per year','axis-title','end');
    b+='<path d="M 80 165 C 270 165 435 285 435 455" class="actual"/>'+t(380,428,'PPC₁','green-text','end');
    b+=dot(220,355)+t(200,352,'A','green-text','end');
    b+=group(line(231,349,354,286,'arrow')+'<path d="M 341 287 L 354 286 L 347 297" class="arrow"/>'+dot(364.76,279.48)+t(358,260,'B','green-text','end'),1);
    b+=group('<path d="M 80 100 C 320 100 525 270 525 455" class="potential"/>'+t(550,425,'PPC₂','copper-text','middle'),2);
    b+=group(line(376,275,426,255,'arrow')+'<path d="M 413 256 L 426 255 L 419 266" class="arrow"/>'+dot(437.48,250.12)+t(450,233,'C','copper-text'),3);
    return svg(b,id,'PPC diagram. A inside PPC1 moves to B on PPC1, demonstrating actual growth. PPC2 is farther out. C on PPC2 shows use of the expanded capacity.');
  }
  function series(s,id){
    const X=i=>120+190*i,Y=v=>455-(v-900)*1.75;
    let b=axisTitle(82,34,['Real GDP','(£bn)'])+line(82,455,564,455)+line(82,455,82,88);
    for(const v of [900,960,1020,1080,1100])b+=line(76,Y(v),82,Y(v),'guide')+t(67,Y(v)+6,v,'small','end');
    b+=t(564,525,'Year','axis-title','end');
    for(let i=0;i<3;i++)b+=t(X(i),496,i+1,'','middle');
    const curve=a=>a.map((v,i)=>`${X(i)},${Y(v)}`).join(' ');
    b+=`<polyline points="${curve(s.potential)}" class="potential"/>`;
    b+=t(100,93,'Potential · 潜在','copper-text')+line(320,86,390,86,'potential');
    b+=group(`<polyline points="${curve(s.actual)}" class="actual"/>`+t(100,126,'Actual · 实际','green-text')+line(320,119,390,119,'actual')+s.actual.map((v,i)=>dot(X(i),Y(v))).join(''),1);
    const a=s.actual[2],p=s.potential[2],delta=a-p;
    b+=group(line(530,Y(a),530,Y(p),'bracket')+line(523,Y(a),537,Y(a),'bracket')+line(523,Y(p),537,Y(p),'bracket')+t(542,(Y(a)+Y(p))/2+7,delta>0?'+40':'−60','copper-text')+t(488,Y(p)+(delta>0?25:-15),p,'copper-text','end')+t(488,Y(a)+(delta>0?-14:29),a,'green-text','end'),2);
    return svg(b,id,`Illustrative annual real GDP. Potential: ${s.potential.join(', ')}. Actual: ${s.actual.join(', ')}. Final signed gap: ${delta} billion pounds. Both graphs use the same 900 to 1100 scale.`);
  }

  const axes=(labelY=522)=>axisTitle(85,40,['General price','level'])+line(85,460,590,460)+line(85,460,85,90)+t(73,480,'0','small')+t(590,labelY,'Real GDP','axis-title','end');
  const guides=(x,y,yl,pl)=>line(85,y,x,y,'guide')+line(x,y,x,460,'guide')+t(74,y+5,pl,'small','end')+t(x,487,yl,'small','middle');
  const gap=(x1,x2,label)=>line(x1,415,x2,415,'bracket')+line(x1,408,x1,422,'bracket')+line(x2,408,x2,422,'bracket')+t((x1+x2)/2,401,label,'small copper-text','middle');
  function keynesian(id){
    let b=axes(545)+group('<path d="M85 330 H300 C360 330 400 280 400 220 V100" class="actual"/>'+t(413,117,'AS₀','green-text')+line(400,230,400,460,'guide')+t(400,487,'Y_{fe,0}','small','middle'),0,1);
    b+=group(line(100,230,300,430,'actual')+t(305,436,'AD₀','green-text')+guides(200,330,'Y₀','P')+dot(200,330),0,0);
    b+=group(line(130,180,375,425,'actual')+t(343,445,'AD₁','green-text')+guides(280,330,'Y₁','P')+dot(280,330),1,2);
    b+=group('<path d="M85 330 H420 C480 330 520 280 520 220 V100" class="potential"/>'+t(531,117,'AS₁','copper-text')+line(520,230,520,460,'guide')+t(520,487,'Y_{fe,1}','small','middle'),2);
    b+=group(line(270,180,520,430,'actual')+t(534,440,'AD₂','green-text')+guides(420,330,'Y₂','P')+dot(420,330),3);
    b+=group('<path d="M85 330 H300 C360 330 400 280 400 220 V100" class="reference-curve"/>'+t(381,92,'AS₀','small','end')+line(400,235,400,460,'guide')+t(400,510,'Y_{fe,0}','small','middle'),2);
    b+=group(line(100,230,300,430,'reference-curve')+t(290,440,'AD₀','small')+line(200,330,200,460,'guide')+t(200,486,'Y₀','small','middle'),1);
    return svg(b,id,'Keynesian AS: demand first raises actual output with fixed capacity; capacity then expands without raising output; further demand uses more capacity.');
  }
  function lras(id){
    let b=axes()+line(140,124,570,382,'actual')+t(577,390,'AD','green-text')+line(300,105,300,460,'potential')+t(291,93,'LRAS₀','copper-text','end')+guides(300,220,'Y_{fe,0}','P₀')+dot(300,220)+t(276,204,'E₀','small');
    b+=group(line(420,105,420,460,'potential')+t(431,93,'LRAS₁','copper-text')+t(420,487,'Y_{fe,1}','small','middle')+line(325,125,400,125,'arrow')+'<path d="M388 117 L400 125 L388 133" class="arrow"/>',1);
    b+=group(guides(420,292,'Y_{fe,1}','P₁')+dot(420,292)+t(436,280,'E₁','small')+gap(300,420,'ΔY > 0'),2);
    return svg(b,id,'Long-run equilibrium moves from E0 at full employment to E1 on a right-shifted LRAS curve. Real output rises and the price level falls along unchanged AD.');
  }
  function adas(s,id){
    const x=s.positive?475:350,y=520-.6*x;
    let b=axes()+line(420,98,420,460,'potential')+t(433,96,'LRAS','copper-text')+t(420,487,'Y_{fe}','small copper-text','middle')+line(145,433,565,181,'actual')+t(535,165,'SRAS','green-text');
    b+=group((s.positive?line(345,105,595,355,'demand'):line(155,115,490,450,'demand'))+t(s.positive?575:510,s.positive?330:440,'AD','blue-text')+dot(x,y)+t(x-22,y-17,'E','small')+guides(x,y,'Y₁','P₁'),1);
    b+=group(gap(Math.min(x,420),Math.max(x,420),s.positive?'+ gap':'− gap'),2);
    return svg(b,id,`AD and SRAS intersect ${s.positive?'above':'below'} full-employment output Y_{fe}. LRAS is the sustainable benchmark. The horizontal output gap is ${s.positive?'positive':'negative'}.`);
  }
  function ae(id){
    const X=v=>85+.55*v,Y=v=>460-.55*v;
    let b=axisTitle(85,16,['Aggregate','expenditure','(£bn)'])+line(85,460,580,460)+line(85,460,85,90)+t(580,522,'Real income, Y (£bn)','axis-title','end');
    b+=line(X(0),Y(0),X(650),Y(650),'potential')+t(X(650)-10,Y(650)-18,'AE = Y','copper-text','end');
    b+=line(X(0),Y(100),X(720),Y(640),'actual')+t(X(720)+10,Y(640),'AE₀','green-text')+guides(X(400),Y(400),'400','400')+dot(X(400),Y(400))+t(X(400)-23,Y(400)-15,'E₀','small');
    b+=line(X(600),Y(600),X(600),460,'guide')+t(X(600),486,'600 = Y_{fe}','small','middle')+gap(X(400),X(600),'ΔY = 200');
    b+=group(line(X(600),Y(550),X(600),Y(600),'bracket')+t(X(600)+14,(Y(550)+Y(600))/2+7,'50','copper-text'),1);
    b+=group(line(X(0),Y(150),X(720),Y(690),'demand')+t(X(720)+10,Y(690),'AE₁','blue-text')+line(85,Y(600),X(600),Y(600),'guide')+t(73,Y(600)+6,'600','small','end')+dot(X(600),Y(600))+t(X(600)-18,Y(600)-14,'E₁','small'),2);
    return svg(b,id,'AE0 equals 100 plus 0.75Y; equilibrium output400. At full-employment income600 spending is550, a shortfall50. Raising autonomous spending50 shifts AE up to AE1 and raises equilibrium income200 to600.');
  }
  function shock(s,id){
    const policy=s.model==='growth-policy',x=331.111,y=233.333;
    let b=axes()+line(420,98,420,460,'potential')+t(431,96,'LRAS','copper-text')+t(420,487,'Y_{fe}','small copper-text','middle');
    b+=group(line(170,112.5,570,412.5,'demand')+t(550,432,'AD₀','blue-text'),0,policy?0:99);
    if(!policy)b+=group(line(155,459,565,213,'actual')+t(534,201,'SRAS₀','green-text')+dot(420,300)+t(434,299,'E₀','small')+guides(420,300,'Y_{fe}','P₀'),0,1);
    b+=group(line(130,354,535,111,'actual')+t(540,119,'SRAS₁','green-text'),policy?0:1,policy?2:99);
    b+=group(dot(x,y)+t(x-28,y-15,'E₁','small')+guides(x,y,'Y₁','P₁')+gap(x,420,'− gap'),policy?0:2,policy?0:99);
    if(!policy)b+=group(line(155,459,565,213,'reference-curve')+t(530,203,'SRAS₀','small')+dot(420,300)+t(436,300,'E₀','small')+guides(420,300,'Y_{fe}','P₀'),2);
    if(policy){
      b+=group(line(170,112.5,570,412.5,'reference-curve')+t(545,432,'AD₀','small'),1,2);
      b+=group(dot(x,y)+t(x-28,y-15,'E₁','small')+guides(x,y,'Y₁','P₁'),1);
      b+=group(line(130,354,535,111,'reference-curve')+t(540,119,'SRAS₁','small'),3);
      b+=group(line(325,108.75,575,296.25,'demand')+t(550,319,'AD↑','blue-text')+dot(420,180)+t(435,180,'E₂','small')+guides(420,180,'Y_{fe}','P₂'),1,1);
      b+=group(line(100,210,415,446.25,'demand')+t(450,446,'AD↓','blue-text')+dot(220,300)+t(225,280,'E₃','small')+guides(220,300,'Y₃','P₃')+gap(220,420,'larger shortfall'),2,2);
      b+=group(line(170,112.5,570,412.5,'demand')+t(550,432,'AD₀','blue-text')+line(155,459,565,213,'actual')+t(530,200,'SRAS→','green-text')+dot(420,300)+t(436,297,'E₀','small')+guides(420,300,'Y_{fe}','P₀'),3);
    }
    return svg(b,id,policy?'Alternative fiscal responses to a supply shock: AD expansion returns output to Y_{fe} but raises prices further; contraction lowers prices but widens the negative output gap.':'A leftward SRAS shift from an initial full-employment equilibrium raises the price level and lowers actual output below unchanged potential output.');
  }

  const demandAt=(x,y,label,cls='demand',span=105)=>line(x-span,y-span*.75,x+span,y+span*.75,cls)+t(x+span+7,y+span*.75+9,label,cls==='demand'?'blue-text':'small');
  const kCurve=(floorEnd,limit,cls='actual')=>`<path d="M85 350 H${floorEnd} C${floorEnd+100} 350 ${limit} 270 ${limit} 190 V90" class="${cls}"/>`;
  const bend=(a,b,u)=>({x:(1-u)**3*a+3*(1-u)**2*u*(a+100)+3*(1-u)*u*u*b+u**3*b,y:(1-u)**3*350+3*(1-u)**2*u*350+3*(1-u)*u*u*270+u**3*190});
  const intersection=(a,b,m,c)=>{let lo=0,hi=1;for(let i=0;i<60;i++){const mid=(lo+hi)/2,p=bend(a,b,mid);if(p.y>m*p.x+c)lo=mid;else hi=mid;}return bend(a,b,(lo+hi)/2);};
  function ranges(id){
    let b=axes(545)+kCurve(280,440)+t(454,97,'AS','green-text')+line(440,190,440,460,'guide')+t(440,487,'Y_{fe}','small copper-text','middle');
    b+=group(t(175,379,'1 · Horizontal','small')+t(295,407,'2 · Upward sloping','small')+t(454,218,'3 · Vertical','small'),0,0);
    b+=group(line(85,350,280,350,'range-highlight'),1,1);
    b+=group('<path d="M280 350 C380 350 440 270 440 190" class="range-highlight"/>',2,2);
    b+=group(line(440,190,440,90,'range-highlight'),3,3);
    for(const [n,p0,p1] of [[1,{x:170,y:350},{x:265,y:350}],[2,bend(280,440,.4),bend(280,440,.78)],[3,{x:440,y:180},{x:440,y:120}]]){
      const leftY=n===3?'Y_{fe}':'Y₀',rightY=n===3?'Y_{fe}':'Y₁';
      let body=demandAt(p0.x,p0.y,'AD₀','reference-curve',n===1?70:85)+demandAt(p1.x,p1.y,'AD₁','demand',n===1?70:85)+dot(p0.x,p0.y)+dot(p1.x,p1.y)+t(p0.x-20,p0.y-16,'E₀','small')+t(n===3?p1.x-28:p1.x+10,p1.y-15,'E₁','small');
      body+=guides(p0.x,p0.y,leftY,n===1?'P':'P₀');
      body+=line(p1.x,p1.y,p1.x,460,'guide')+(n===3?'':t(p1.x,n===2?513:487,rightY,'small','middle'));
      if(n!==1)body+=line(85,p1.y,p1.x,p1.y,'guide')+t(74,p1.y+5,'P₁','small','end');
      b+=group(body,n,n);
    }
    return svg(b,id,'Three ranges of Keynesian AS. An AD increase raises output at constant prices in the horizontal range; raises output and prices in the upward-sloping range; and raises only prices at the vertical full-employment limit.');
  }
  function keynesianGap(id){
    let b=axes()+kCurve(280,440)+t(455,97,'AS','green-text')+demandAt(230,350,'AD','demand',105)+dot(230,350)+t(241,331,'E','small')+guides(230,350,'Y₁','P₁');
    b+=group(line(440,190,440,460,'guide')+t(440,487,'Y_{fe}','small copper-text','middle'),1);
    b+=group(gap(230,440,'negative output gap'),2);
    return svg(b,id,'Keynesian AD/AS diagram. Actual output at the demand-supply intersection is below potential output at the vertical AS limit. The horizontal shortfall is a negative output gap.');
  }
  function keynesianCapacity(id){
    const p=intersection(370,520,1,-220);
    // AD0 passes through the original full-employment equilibrium (400,180).
    let b=axes(545)+kCurve(250,400,'reference-curve')+t(389,90,'AS₀','small','end')+line(320,100,565,345,'demand')+t(568,363,'AD₀','blue-text')+dot(400,180)+t(374,167,'E₀','small')+guides(400,180,'Y_{fe,0}','P₀');
    b+=group(kCurve(370,520,'potential')+t(532,90,'AS₁','copper-text')+line(520,190,520,460,'guide')+t(520,487,'Y_{fe,1}','small','middle'),1);
    b+=group(dot(p.x,p.y)+t(p.x-30,p.y-16,'E₁','small')+line(85,p.y,p.x,p.y,'guide')+t(74,p.y+5,'P₁','small','end')+line(p.x,p.y,p.x,460,'guide')+t(p.x,513,'Y₁','small','middle'),2);
    b+=group(demandAt(520,135,'AD₁','actual',65)+dot(520,135)+t(532,129,'E₂','small')+line(85,135,520,135,'guide')+t(74,140,'P₂','small','end'),3);
    return svg(b,id,'Outward shift of Keynesian AS raises full-employment output. Unchanged AD uses some new capacity at a lower price level; a further AD rise uses the new full-employment output.');
  }
  function fiscal(id){
    const p=intersection(345,475,.75,-6.25);
    let b=axes(545)+kCurve(345,475)+t(490,97,'AS','green-text')+line(475,190,475,460,'guide')+t(475,487,'600 = Y_{fe}','small','middle')+demandAt(345,350,'AD₀','reference-curve',105)+dot(345,350)+t(321,338,'E₀','small')+guides(345,350,'400 = Y₀','P₀');
    b+=group(gap(345,475,'shortfall = 200'),0,0);
    b+=group(line(260,188.75,590,436.25,'demand')+t(544,425,'AD₁','blue-text')+dot(p.x,p.y)+t(p.x-25,p.y-16,'E₁','small')+line(85,p.y,p.x,p.y,'guide')+t(74,p.y+5,'P₁','small','end')+line(p.x,p.y,p.x,460,'guide')+t(p.x,513,'Y₁','small','middle'),1);
    b+=group(demandAt(475,145,'AD₂','actual',85)+dot(475,145)+t(489,142,'E₂','small')+line(85,145,475,145,'guide')+t(74,150,'P₂','small','end'),2);
    return svg(b,id,'Fiscal expansion with Keynesian AS. Initial output400 and potential600 imply a200 output shortfall. An AD increase that would support600 at the old price level yields a smaller output gain when prices rise. Further AD can reach600 at a higher price level.');
  }
  window.EconDiagrams.markup=(s,id)=>s.model==='growth-ranges'?ranges(id):s.model==='growth-keynesian-gap'?keynesianGap(id):s.model==='growth-keynesian-capacity'?keynesianCapacity(id):s.model==='growth-fiscal'?fiscal(id):s.model==='growth-capacity'?capacity(id):s.model==='growth-ppc'?ppc(id):s.model==='growth-series'?series(s,id):s.model==='growth-keynesian'?keynesian(id):s.model==='growth-lras'?lras(id):s.model==='growth-adas'?adas(s,id):s.model==='growth-ae'?ae(id):['growth-shock','growth-policy'].includes(s.model)?shock(s,id):original(s,id);
}());
