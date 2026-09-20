// Lesson-owned source controls and annotated exam/essay layouts.
// Uses the course's reversible reveal steps; no changes to other lessons.
(function () {
  'use strict';
  const lesson=window.ALEVEL_LESSON;
  const e=(s='')=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  // Explicit lesson notation: true HTML subscripts and stacked fractions.
  function typesetNotation(root){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    const pattern=/\\frac\{([^{}]+)\}\{([^{}]+)\}|([A-Za-z]+)?_\{([^}]+)\}/g;
    for(const node of nodes){
      if(node.parentElement?.closest('svg,script,style,sub,.math-fraction'))continue;
      const value=node.nodeValue;pattern.lastIndex=0;
      if(!pattern.test(value))continue;
      pattern.lastIndex=0;const out=document.createDocumentFragment();let at=0;
      for(const match of value.matchAll(pattern)){
        out.append(value.slice(at,match.index));
        if(match[1]!==undefined){
          const frac=document.createElement('span');frac.className='math-fraction';
          for(const [cls,text] of [['math-numerator',match[1]],['math-denominator',match[2]]]){const part=document.createElement('span');part.className=cls;part.textContent=text;frac.append(part);}out.append(frac);
        }else{
          const term=document.createElement('span');term.className='math-inline';if(match[3])term.append(match[3]);const sub=document.createElement('sub');sub.textContent=match[4];term.append(sub);out.append(term);
        }
        at=match.index+match[0].length;
      }
      out.append(value.slice(at));node.replaceWith(out);
    }
  }
  const marked=(s,phrases=[])=>{
    let out=e(s);
    for(const p of [...phrases].sort((a,b)=>b.length-a.length))out=out.replaceAll(e(p),`<strong class="key-point">${e(p)}</strong>`);
    return out;
  };
  const modal=(name,cls)=>{
    const d=document.createElement('dialog');d.className=cls;d.setAttribute('aria-label',name);
    d.innerHTML=`<header class="dialog-head"><h2>${e(name)}</h2><button type="button" aria-label="Close ${e(name)}">×</button></header><div class="modal-content"></div>`;
    d.querySelector('button').addEventListener('click',()=>d.close());
    d.addEventListener('keydown',ev=>ev.stopPropagation());
    d.addEventListener('click',ev=>{if(ev.target===d){const r=d.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)d.close();}});
    document.body.append(d);return d;
  };
  const sourceDialog=modal('Content sources','lesson-source-dialog');
  const imageDialog=modal('Original question','exam-lightbox');
  const modelDialog=modal('Complete essay model','complete-model-dialog');
  const showImage=(src,alt)=>{imageDialog.querySelector('.modal-content').innerHTML=`<img src="${e(src)}" alt="${e(alt)}">`;imageDialog.showModal();};
  function sourceButtons(s,root){
    const refs=s.sourceRefs.map(key=>lesson.sourceLibrary[key]);
    const types=[...new Set(refs.map(r=>r.type))];
    const nav=document.createElement('nav');nav.className='lesson-sources';nav.setAttribute('aria-label','Slide content sources');
    for(const type of types){
      const b=document.createElement('button');b.type='button';b.textContent=type;b.setAttribute('aria-label',`Show ${type.toLowerCase()} sources`);
      b.addEventListener('click',()=>{
        sourceDialog.querySelector('.modal-content').innerHTML=refs.filter(r=>r.type===type).map(r=>`<article><p class="source-type">${e(r.type)}</p><h3>${e(r.ref)}</h3><p>${e(r.detail)}</p>${r.url?`<a href="${e(r.url)}" target="_blank" rel="noopener">Open original source ↗</a>`:''}${r.image?`<img src="${e(r.image)}" alt="Source excerpt: ${e(r.ref)}">`:''}</article>`).join('');
        typesetNotation(sourceDialog);sourceDialog.showModal();
      });nav.append(b);
    }root.append(nav);
  }
  const questionStrip=s=>`<div class="essay-question"><span>${e(s.paperRef)} · original question</span><p>${e(s.originalQuestion)}</p></div>`;
  function essayLayout(s){
    return `${questionStrip(s)}<p class="essay-focus">${e(s.focus)}</p><div class="essay-rows">${s.items.slice(1).map((p,i)=>{
      const ao=p.heading.match(/AO([123])/);const cls=ao?`ao-${ao[1]}`:'';
      return `<article class="essay-row ${cls}" data-reveal-step="${i+1}"><p class="model-prose">${marked(p.text,p.highlights)}</p><aside><h2>${e(p.heading)}</h2><p>${e(p.note)}</p></aside></article>`;
    }).join('')}</div><div class="lesson-reveal-controls"><button type="button" data-step-back aria-label="Previous explanation step">←</button><button type="button" data-step-next>Reveal next part →</button>${s.modelParagraph||s.id==='paper-four-review'?'<button type="button" class="complete-model-button">Read complete model ↗</button>':''}</div>`;
  }
  function examLayout(s){
    const q=s.image?`<figure><img src="${e(s.image)}" alt="${e(s.imageAlt)}"><button type="button" class="exam-image-button">Enlarge original question ⛶</button></figure>`:`<div class="exam-original-text"><p data-verbatim>${e(s.question)}</p><ol class="original-options">${s.options.map(o=>`<li data-verbatim>${e(o)}</li>`).join('')}</ol></div>`;
    return `<p class="exam-reference">${e(s.paperRef)} · original question and options</p><div class="exam-workshop"><div class="exam-original">${q}</div><div class="exam-reasoning"><p class="attempt-label">Attempt first · reveal after choosing</p>${s.items.slice(1).map((p,i)=>`<article class="exam-step" data-reveal-step="${i+1}"><h2>${e(p.heading)}</h2><p>${marked(p.text,p.highlights)}</p><p class="exam-credit">${e(p.note)}</p></article>`).join('')}</div></div><div class="lesson-reveal-controls"><button type="button" data-step-back aria-label="Previous explanation step">←</button><button type="button" data-step-next>Reveal next part →</button></div>`;
  }
  function showModel(slide){
    const group=slide.modelGroup,meta=lesson.essayModels[group];
    const modelSlides=lesson.slides.filter(s=>s.modelParagraph&&s.modelGroup===group);
    const paragraphs=[];
    for(const part of modelSlides){
      const key=part.paragraphKey||part.id;
      let paragraph=paragraphs.find(p=>p.key===key);
      if(!paragraph){paragraph={key,focus:part.focus,parts:[]};paragraphs.push(paragraph);}
      paragraph.parts.push(...part.items.slice(1));
    }
    modelDialog.querySelector('.modal-content').innerHTML=`<p class="model-status">Teacher-written model · AO labels are teaching annotations · ${e(meta.status)}</p><blockquote>${e(meta.question)} [${meta.marks}]</blockquote>${paragraphs.map(s=>`<section><h3>${e(s.focus.split(' · ')[0])}</h3><p>${s.parts.map(p=>marked(p.text,p.highlights)).join(' ')}</p></section>`).join('')}<p class="model-status">${e(meta.diagram)} The original mark scheme is available through Sources. This model carries no guaranteed mark.</p>`;
    typesetNotation(modelDialog);modelDialog.showModal();
  }
  for(const s of lesson.slides){
    const root=document.getElementById(s.id);
    if(s.paper){
      root.querySelector('.slide-header h1').textContent=s.title;
      root.querySelector('.slide-header .eyebrow').textContent=s.label||'PAST PAPER';
      const ref=document.createElement('p');ref.className='exam-reference';ref.textContent=s.paper;
      root.querySelector('.slide-header').append(ref);
    }
    if(s.layout){
      root.classList.add(`layout-${s.layout}`);
      root.querySelector('.slide-body').innerHTML=s.layout==='essay'?essayLayout(s):examLayout(s);
      const imageButton=root.querySelector('.exam-image-button');if(imageButton)imageButton.addEventListener('click',()=>showImage(s.image,s.imageAlt));
      root.querySelector('.complete-model-button')?.addEventListener('click',()=>showModel(s));
    }
    if(s.kind==='compare'&&s.intro){
      const p=document.createElement('p');p.className='comparison-rule';p.textContent=s.intro;root.querySelector('.slide-body').prepend(p);
    }
    sourceButtons(s,root);
  }
  document.getElementById('stage').addEventListener('click',ev=>{
    if(!ev.target.closest('[data-option]'))return;
    const s=lesson.slides[window.EconPresentation.deck.current];
    const fb=document.getElementById(s.id).querySelector('.mcq-feedback');
    if(fb)fb.innerHTML=marked(fb.textContent,s.feedbackHighlights);
  });
  const deck=window.EconPresentation.deck;
  deck.show(deck.current,deck.step);
  const syncRevealControls=()=>{
    const s=lesson.slides[deck.current];if(!s.layout)return;
    const root=document.getElementById(s.id),last=deck.step===deck.maxStep;
    root.querySelector('[data-step-back]').disabled=deck.step===0;
    const next=root.querySelector('[data-step-next]');next.disabled=last;
    next.textContent=last?'All parts revealed':'Reveal next part →';
  };
  new MutationObserver(()=>{syncRevealControls();typesetNotation(document.getElementById('stage'));}).observe(document.getElementById('status'),{childList:true,characterData:true,subtree:true});
  syncRevealControls();typesetNotation(document.getElementById('stage'));
  new MutationObserver(()=>typesetNotation(document.getElementById('noteContent'))).observe(document.getElementById('noteContent'),{childList:true,subtree:true});
}());
