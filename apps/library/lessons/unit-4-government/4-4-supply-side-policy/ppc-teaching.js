/* Lesson-scoped progressive PPC diagrams. All curve and point positions are
   derived from the same schematic frontier, as in the multiplier deck.
   Native diagram specs remain in the slide data for the complete handout. */
(() => {
  const lesson = window.IGCSE?.lesson;
  if (!lesson) return;
  const x0=96, y0=438, width=410, height=294;
  const frontier=(w,h)=>Array.from({length:65},(_,i)=>{
    const t=i*Math.PI/128;
    return `${i?'L':'M'}${(x0+w*Math.sin(t)).toFixed(2)} ${(y0-h*Math.cos(t)).toFixed(2)}`;
  }).join(' ');
  const pointOn=(t)=>({x:x0+width*Math.sin(t),y:y0-height*Math.cos(t)});
  const b=pointOn(Math.PI/4), a={x:242,y:342};
  const controllers=new Map();
  function markup(mode,id){
    const movement=mode==='use';
    const fixedY=290;
    const oldX=x0+width*Math.sqrt(1-((y0-fixedY)/height)**2);
    const newX=x0+515*Math.sqrt(1-((y0-fixedY)/374)**2);
    const point=(p,label,extra='')=>`<circle class="sspPoint ${extra}" cx="${p.x}" cy="${p.y}" r="7"/><text class="sspLabel" x="${p.x+13}" y="${p.y-11}">${label}</text>`;
    return `<svg class="sspPpc" viewBox="0 0 720 550" role="img" aria-label="${movement?'Output moves from inside to the existing PPC; the frontier stays fixed.':'Higher productive capacity shifts the frontier from PPC1 to PPC2.'}">
      <defs><marker id="${id}-axis" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#173747"/></marker><marker id="${id}-change" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#ad613b"/></marker></defs>
      <path class="sspAxis" d="M96 438V44" marker-end="url(#${id}-axis)"/><path class="sspAxis" d="M96 438H660" marker-end="url(#${id}-axis)"/>
      <text x="370" y="508" text-anchor="middle">Consumer goods</text><text transform="translate(30 257) rotate(-90)" text-anchor="middle">Capital goods</text><text x="70" y="465">0</text>
      <g data-ppc-stage="1"><path class="sspCurve sspBaseCurve" d="${frontier(width,height)}"/><text class="sspLabel sspBaseLabel" x="506" y="358">${movement?'PPC':'PPC1'}</text></g>
      ${movement?`
        <g data-ppc-stage="1">${point(a,'A','sspOldPoint')}</g>
        <g data-ppc-stage="2"><path class="sspChange" d="M${a.x+10} ${a.y-9}L${b.x-11} ${b.y+9}" marker-end="url(#${id}-change)"/>${point(b,'B')}</g>
        <g data-ppc-stage="3"><path class="sspGuide" d="M96 ${b.y}H${b.x}V438"/><text x="360" y="68" text-anchor="middle" class="sspNewLabel sspLabel">Same frontier; more actual output</text></g>
      `:`
        <g data-ppc-stage="2"><path class="sspCurve sspNew" d="${frontier(515,374)}"/><text class="sspLabel sspNewLabel" x="615" y="353">PPC2</text><path class="sspChange" d="M267 158L292 95" marker-end="url(#${id}-change)"/><path class="sspChange" d="M515 421L592 421" marker-end="url(#${id}-change)"/></g>
        <g data-ppc-stage="3"><path class="sspGuide" d="M96 ${fixedY}H${newX}V438M${oldX} ${fixedY}V438"/><path class="sspChange" d="M${oldX+9} ${fixedY}H${newX-10}" marker-end="url(#${id}-change)"/>${point({x:oldX,y:fixedY},'A','sspOldPoint')}${point({x:newX,y:fixedY},'B')}<text x="335" y="43" text-anchor="middle" class="sspNewLabel sspLabel">More possible output</text></g>
      `}
    </svg>`;
  }
  if (!document.querySelector('.slide')) {
    // Reading/handout mode uses a different renderer. Add the completed
    // diagrams to their matching knowledge blocks, without any controls.
    const blocks=[...document.querySelectorAll('.handoutBlock')];
    lesson.slides.forEach((spec,index)=>{
      if(!spec.ppcTeaching)return;
      const block=blocks.find(el=>el.querySelector('h3')?.textContent.includes(spec.title));
      if(!block)return;
      const figure=document.createElement('figure');
      figure.className='sspPpcHandout';
      figure.innerHTML=markup(spec.ppcTeaching.mode,`ssp-handout-${index}`);
      const caption=document.createElement('figcaption');
      caption.textContent=spec.ppcTeaching.steps.at(-1).takeaway;
      figure.append(caption);
      if(spec.ppcTeaching.mode!=='use')figure.querySelector('.sspBaseCurve').classList.add('sspOriginal');
      block.append(figure);
    });
    return;
  }
  lesson.slides.forEach((spec,index)=>{
    const config=spec.ppcTeaching;
    if(!config)return;
    const slide=document.querySelector(`.slide[data-idx="${index}"]`);
    if(!slide)return;
    const main=slide.querySelector('.content > main');
    const visual=slide.querySelector('aside.visual');
    if(!main||!visual)return;
    slide.classList.add('is-layout-ppc-teaching');
    visual.removeAttribute('aria-hidden');
    visual.innerHTML=markup(config.mode,`ssp-${index}`);
    main.innerHTML=`<div class="sspPpcPanel"><div class="sspPpcStepCount"></div><div aria-live="polite" aria-atomic="true"><h2></h2><p class="sspPpcCopy"></p><p class="sspPpcZh" lang="zh-Hans"></p><p class="sspPpcTakeaway"></p></div><div class="sspPpcControls" aria-label="PPC diagram steps"><button type="button" data-ppc-action="back">Back</button><button type="button" data-ppc-action="next">Next step</button><button type="button" data-ppc-action="reset">Reset</button></div></div>`;
    const context=document.createElement('div');
    context.className='sspPpcContext';context.textContent=spec.title;
    main.querySelector('.sspPpcPanel').prepend(context);
    let stage=0;
    const paint=()=>{
      const step=config.steps[stage];
      slide.dataset.ppcStep=String(stage);
      main.querySelector('.sspPpcStepCount').textContent=`STEP ${stage+1} / ${config.steps.length}`;
      main.querySelector('h2').textContent=step.title;
      main.querySelector('.sspPpcCopy').textContent=step.text;
      main.querySelector('.sspPpcZh').textContent=step.zh;
      main.querySelector('.sspPpcTakeaway').textContent=step.takeaway;
      main.querySelector('[data-ppc-action="back"]').disabled=stage===0;
      main.querySelector('[data-ppc-action="next"]').disabled=stage===config.steps.length-1;
      visual.querySelectorAll('[data-ppc-stage]').forEach(el=>{
        const hidden=Number(el.dataset.ppcStage)>stage;
        el.toggleAttribute('hidden',hidden);
        el.setAttribute('aria-hidden',String(hidden));
      });
      const faded=config.mode!=='use'&&stage>=2;
      visual.querySelector('.sspBaseCurve').classList.toggle('sspOriginal',faded);
      visual.querySelector('.sspBaseLabel').classList.toggle('sspOldLabel',faded);
      visual.querySelector('svg').setAttribute('aria-label',`${step.title}. ${step.text} ${step.takeaway}`);
    };
    const move=delta=>{
      const next=Math.min(config.steps.length-1,Math.max(0,stage+delta));
      if(next===stage)return false;
      stage=next;paint();return true;
    };
    main.querySelectorAll('button').forEach(button=>button.addEventListener('click',event=>{
      event.stopPropagation();
      if(button.dataset.ppcAction==='reset'){stage=0;paint();}
      else move(button.dataset.ppcAction==='next'?1:-1);
    }));
    // Leave the complete diagram in the browser's printed slide view.
    let stageBeforePrint=0;
    window.addEventListener('beforeprint',()=>{stageBeforePrint=stage;stage=config.steps.length-1;paint();});
    window.addEventListener('afterprint',()=>{stage=stageBeforePrint;paint();});
    controllers.set(slide,move);paint();
  });
  document.addEventListener('keydown',event=>{
    if(event.altKey||event.ctrlKey||event.metaKey||event.target.closest('input,select,textarea,a,[contenteditable="true"]'))return;
    if(event.target.closest('button') && (event.key===' ' || !event.target.closest('.sspPpcControls')))return;
    if(document.querySelector('#overview.is-visible, #notes.is-visible'))return;
    const active=document.querySelector('.slide.is-active');
    const move=controllers.get(active);
    if(!move)return;
    const delta=['ArrowRight',' ','PageDown'].includes(event.key)?1:['ArrowLeft','PageUp'].includes(event.key)?-1:0;
    if(delta&&move(delta)){event.preventDefault();event.stopImmediatePropagation();}
  },true);
  // The existing deck supports clicking its surface to reveal. On a diagram,
  // reveal the next stage first, then let the normal next-slide action run.
  document.addEventListener('click',event=>{
    if(event.target.closest('button,a,input,select,details,summary,#overview,#notes'))return;
    const active=event.target.closest('.slide.is-active');
    if(controllers.get(active)?.(1)){event.preventDefault();event.stopImmediatePropagation();}
  },true);
})();
