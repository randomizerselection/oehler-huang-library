// Lesson-owned Keynesian diagrams; reversible stages use the course engine.
(function(){
  const original=window.EconDiagrams.markup;
  const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
  const t=(x,y,v,c='',a='start')=>`<text x="${x}" y="${y}" class="${c}" text-anchor="${a}">${esc(v).replace(/([A-Za-z]+)_\{([^}]+)\}/g,'$1<tspan baseline-shift="sub" font-size="70%">$2</tspan>')}</text>`;
  const line=(a,b,c,d,cls='axis')=>`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${cls}"/>`;
  const g=(v,start=0,end=99)=>`<g data-stage="${start}" data-until="${end}">${v}</g>`;
  const dot=(x,y)=>`<circle cx="${x}" cy="${y}" r="6" class="point"/>`;
  const axes=()=>line(85,460,590,460)+line(85,460,85,90)+t(85,34,'General price','axis-title','middle')+t(85,58,'level','axis-title','middle')+t(590,548,'Real GDP','axis-title','end')+t(73,480,'0','small');
  const guides=(x,y,yl,pl,row=489)=>line(85,y,x,y,'guide')+line(x,y,x,460,'guide')+t(74,y+5,pl,'small','end')+t(x,row,yl,'small','middle');
  const svg=(body,id,desc)=>`<svg class="econ-svg growth-svg" viewBox="0 0 640 570" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">Growth policies in a Keynesian AD/AS model</title><desc id="${id}-desc">${esc(desc)}</desc>${body}</svg>`;
  function demand(id){
    let b=axes()+'<path d="M85 330 H300 C360 330 400 280 400 220 V100" class="actual"/>'+t(413,117,'AS','green-text')+line(400,230,400,460,'guide')+t(400,489,'Y_{fe}','small','middle');
    b+=line(100,230,300,430,'demand')+t(305,438,'AD₀','blue-text')+guides(200,330,'Y₀','P')+dot(200,330)+t(182,310,'E₀','small');
    b+=g(line(130,180,375,425,'potential')+t(351,445,'AD₁','copper-text')+line(280,330,280,460,'guide')+t(280,489,'Y₁','small','middle')+dot(280,330)+t(270,310,'E₁','small')+line(212,410,265,410,'arrow')+'<path d="M255 403 L265 410 L255 417" class="arrow"/>',1);
    return svg(b,id,'With substantial spare capacity, AD shifts right from AD0 to AD1. Real output increases from Y0 to Y1 at unchanged price level P. Full-employment output Yfe is unchanged.');
  }
  function capacity(id){
    let b=axes()+line(270,102.5,590,342.5,'demand')+t(592,354,'AD₀','blue-text');
    b+='<path d="M85 350 H250 L400 250 V100" class="actual"/>'+t(388,95,'AS₀','green-text','end')+guides(400,200,'Y_{fe,0}','P₀')+dot(400,200)+t(381,185,'E₀','small');
    b+=g('<path d="M85 350 H400 L550 250 V100" class="potential"/>'+t(562,95,'AS₁','copper-text')+line(550,255,550,460,'guide')+t(550,518,'Y_{fe,1}','small','middle')+line(427,125,521,125,'arrow')+'<path d="M511 118 L521 125 L511 132" class="arrow"/>',1);
    const x=716.6666667/(.75+2/3),y=.75*x-100;
    b+=g(guides(x,y,'Y₁','P₁')+dot(x,y)+t(x-28,y-15,'E₁','small'),2);
    b+=g(line(427,107.75,610,245,'potential')+t(610,269,'AD₁','copper-text','end')+line(400,200,550,200,'guide')+dot(550,200)+t(563,185,'E₂','small'),3);
    return svg(b,id,'AS shifts right, increasing sustainable full-employment output from Yfe0 to Yfe1. With unchanged AD0, E1 has higher actual output Y1 and a lower price level P1, but unused new capacity. AD1 then uses all new capacity at E2 and the original price level P0.');
  }
  window.EconDiagrams.markup=(s,id)=>s.model==='policy-demand'?demand(id):s.model==='policy-capacity'?capacity(id):original(s,id);
}());
