// Lesson-owned cycle illustrations. Shared presentation code owns reversible stages.
(function(){
  const original=window.EconDiagrams.markup;
  const text=(x,y,value,cls='',anchor='start')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${value}</text>`;
  const line=(x1,y1,x2,y2,cls='axis')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
  const group=(body,stage,end=99)=>`<g data-stage="${stage}" data-until="${end}">${body}</g>`;
  const xs=[100,150,200,250,290,330,380,420,445,490,530,565],deviations=[-55,-30,20,90,120,100,20,-70,-110,-65,-10,20];
  const points=amplitude=>xs.map((x,i)=>[x,320-.2*(x-100)-deviations[i]*amplitude]);
  function path(p){
    let d=`M${p[0].join(' ')}`;
    for(let i=0;i<p.length-1;i++){
      const a=p[Math.max(0,i-1)],b=p[i],c=p[i+1],e=p[Math.min(p.length-1,i+2)];
      const by=[4,8].includes(i)?b[1]:b[1]+(c[1]-a[1])/6;
      const cy=[4,8].includes(i+1)?c[1]:c[1]-(e[1]-b[1])/6;
      d+=` C${b[0]+(c[0]-a[0])/6} ${by} ${c[0]-(e[0]-b[0])/6} ${cy} ${c.join(' ')}`;
    }return d;
  }
  function cycle(s,id){
    const stabilised=s.model==='cycle-stabilisers';
    let b=text(80,38,'Real GDP','axis-title','middle')+line(80,455,590,455)+line(80,455,80,80)+text(590,515,'Time','axis-title','end');
    b+=line(100,320,565,227,'potential')+text(113,90,'Trend / potential GDP','copper-text')+line(390,83,450,83,'potential');
    b+=`<path d="${path(points(1))}" class="${stabilised?'reference-curve':'actual'}"/>`;
    if(stabilised){
      b+=text(113,123,'Without stabilisers','small')+line(390,116,450,116,'reference-curve');
      b+=group(`<path d="${path(points(.45))}" class="actual"/>`+text(113,156,'With stabilisers','green-text')+line(390,149,450,149,'actual'),1);
    }else{
      b+=text(113,123,'Actual real GDP','green-text')+line(390,116,450,116,'actual');
      b+=group(text(116,415,'Expansion','green-text'),1);
      b+=group(text(290,145,'Peak','green-text','middle')+`<circle cx="290" cy="162" r="5" class="point"/>`,2);
      b+=group(text(404,191,'Downturn','green-text'),3);
      b+=group(text(445,401,'Trough','green-text','middle')+`<circle cx="445" cy="361" r="5" class="point"/>`,4);
    }
    const desc=stabilised?'Illustrative actual GDP fluctuates around a rising potential-output trend. Automatic stabilisers reduce the amplitude of the fluctuations without shifting the trend.':'Actual GDP rises during an expansion to a peak, falls during a downturn to a trough, and recovers. The trend/potential GDP line rises throughout.';
    return `<svg class="econ-svg growth-svg" viewBox="0 0 640 560" role="img" aria-labelledby="${id}-svg-title ${id}-svg-desc"><title id="${id}-svg-title">${s.model==='cycle-stabilisers'?'Automatic stabilisers':'Business-cycle phases'}</title><desc id="${id}-svg-desc">${desc}</desc>${b}</svg>`;
  }
  window.EconDiagrams.markup=(s,id)=>['cycle-phases','cycle-stabilisers'].includes(s.model)?cycle(s,id):original(s,id);
}());
