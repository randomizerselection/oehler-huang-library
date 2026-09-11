/* Small data-driven classroom renderer. All lesson-specific copy lives in slides.js.
   Interactions use one delegated listener; slides render once, then toggle visibility. */
(function (global) {
  'use strict';
  const navigationAssetUrl = new URL('../../assets/js/deck-navigation.js', document.currentScript.src || location.href);
  function loadLessonNavigation() {
    if (global.LessonNavigation) return Promise.resolve(global.LessonNavigation);
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = navigationAssetUrl.href;
      script.onload = () => resolve(global.LessonNavigation);
      script.onerror = reject;
      document.head.append(script);
    });
  }
  const e=(s='')=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
  const typesetMath=s=>{
    // Explicit fractions keep prose and existing inline notation unchanged.
    const fraction = /\\frac\{([^{}]+)\}\{([^{}]+)\}/g;
    const parts = [...String(s).matchAll(fraction)];
    if(parts.length){
      let start=0,html='';
      for(const match of parts){
        html+=typesetMath(String(s).slice(start,match.index));
        html+=`<span class="math-fraction"><span class="math-numerator">${typesetMath(match[1])}</span><span class="math-denominator">${typesetMath(match[2])}</span></span>`;
        start=match.index+match[0].length;
      }
      return html+typesetMath(String(s).slice(start));
    }
    let out=e(s)
      .replaceAll('ΔY_d','@@DELTA_Y_SUB_D@@')
      .replaceAll('Y_d','@@Y_SUB_D@@')
      .replaceAll('ΔY','@@DELTA_Y@@')
      .replaceAll('ΔC','@@DELTA_C@@')
      .replaceAll('ΔS','@@DELTA_S@@');
    out=out.replace(/\b(AD|APC|APS|MPC|MPS|C|I|G|X|M|S|Y|a|b|s|v)\b/g,'<var>$1</var>');
    return out
      .replaceAll('@@DELTA_Y_SUB_D@@','<span class="math-symbol">Δ</span><var>Y</var><sub>d</sub>')
      .replaceAll('@@Y_SUB_D@@','<var>Y</var><sub>d</sub>')
      .replaceAll('@@DELTA_Y@@','<span class="math-symbol">Δ</span><var>Y</var>')
      .replaceAll('@@DELTA_C@@','<span class="math-symbol">Δ</span><var>C</var>')
      .replaceAll('@@DELTA_S@@','<span class="math-symbol">Δ</span><var>S</var>');
  };
  const proseMath=s=>e(s)
    .replaceAll('ΔY_d','<span class="math-inline"><span class="math-symbol">Δ</span><var>Y</var><sub>d</sub></span>')
    .replaceAll('Y_d','<span class="math-inline"><var>Y</var><sub>d</sub></span>');
  const inlineMath=s=>String(s??'').split(/(\$[^$\n]+\$)/g).map(part=>part.startsWith('$')&&part.endsWith('$')?`<span class="math-inline">${typesetMath(part.slice(1,-1))}</span>`:proseMath(part)).join('');
  const rich=s=>inlineMath(s).replaceAll('\n','<br>');
  const paragraphs=s=>String(s||'').split(/\n+/).filter(Boolean).map(t=>`<p>${inlineMath(t.replace(/^•\s*/,''))}</p>`).join('');
  const takeaway=s=>s?`<p class="takeaway">${inlineMath(s)}</p>`:'';
  const revealButton='<button class="reveal-button" data-reveal aria-expanded="false">Show method <span>↗</span></button>';
  const sampleAnswerButton='<button class="reveal-button answer-reveal-button" data-reveal data-reveal-kind="answer" aria-expanded="false">View sample answer <span>↗</span></button>';
  const photo=s=>`<img src="${e(s.image)}" alt="${e(s.imageAlt||'Lesson photograph')}" loading="lazy"${s.imagePosition?` style="object-position:${e(s.imagePosition)}"`:''}>`;
  const itemPhoto=item=>`<img src="${e(item.image)}" alt="${e(item.imageAlt||'Lesson photograph')}" loading="lazy" style="object-position:${e(item.imagePosition||'center')};object-fit:${e(item.imageFit||'cover')};${item.imageBackground?`background:${e(item.imageBackground)};`:''}">`;
  const translatedHeading=item=>`${e(item.heading||'')}${item.headingZh?`<span class="heading-zh" lang="zh-Hans">${e(item.headingZh)}</span>`:''}`;
  const applyHighlights=(html,highlights=[])=>highlights.reduce((out,phrase)=>out.replaceAll(e(phrase),`<strong class="key-point">${e(phrase)}</strong>`),html);
  const translatedText=item=>`${applyHighlights(paragraphs(item.text),item.highlights)}${item.textZh?`<p class="text-zh" lang="zh-Hans">${applyHighlights(inlineMath(item.textZh),item.highlightsZh)}</p>`:''}`;
  function tableMarkup(s){
    const [head,...rows]=s.table;
    return `<div class="table-wrap"><table><thead><tr>${head.map(x=>`<th scope="col">${rich(x)}</th>`).join('')}</tr></thead><tbody>${rows.map((row,index)=>`<tr${s.reveal?` data-reveal-step="${index+1}"`:''}>${row.map((x,i)=>`<${i?'td':'th'} ${i?'':'scope="row"'} data-label="${e(head[i])}">${rich(x)}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function columns(s,staged=false){return `<div class="columns columns-${s.items.length}">${s.items.map((x,i)=>`<article ${staged?`data-reveal-step="${i+(s.reveal?1:0)}"`:''}>${/^\d/.test(x.heading||'')?'':`<span class="item-number">${String(i+1).padStart(2,'0')}</span>`}<h2>${translatedHeading(x)}</h2><div class="item-text">${translatedText(x)}</div>${x.detail?`<p class="item-detail">${rich(x.detail)}</p>`:''}</article>`).join('')}</div>`;}
  function chain(s){return `<div class="chain-layout chain-${s.items.length}">${s.items.map((x,i)=>`<article class="chain-step" data-reveal-step="${i}"><div class="chain-marker"><span>${String(i+1).padStart(2,'0')}</span></div><h2>${translatedHeading(x)}</h2><div class="chain-text">${translatedText(x)}</div></article>${i<s.items.length-1?`<div class="chain-connector" data-reveal-step="${i+1}"><span>${rich(x.link||'leads to')}</span></div>`:''}`).join('')}</div>`;}
  function visualGrid(s){return `<div class="visual-grid visual-grid-${s.items.length}">${s.items.map(x=>`<article><figure>${itemPhoto(x)}</figure><h2>${translatedHeading(x)}</h2><div class="visual-grid-text">${translatedText(x)}</div></article>`).join('')}</div>`;}
  function diagramBody(s){
    const shifts=['shift','multiplier','first','further'].includes(s.scene.mode),moves=['below','above','multiplier','first','further'].includes(s.scene.mode);
    const legend=shifts||moves?`<div class="diagram-legend ${shifts?'':'blue-reference'}"><span class="legend-original">Original</span>${shifts?'<span class="legend-new">Shifted curve</span>':''}${moves?'<span class="legend-movement">Movement along curve</span>':''}</div>`:'';
    return `<div class="diagram-layout"><div class="diagram-frame">${global.EconDiagrams.markup(s.scene,s.id)}${legend}</div><aside class="diagram-teaching"><div class="step-count"></div><h2 class="step-title"></h2><div class="step-copy"></div><p class="step-takeaway"></p><div class="diagram-controls"><button data-step-back aria-label="Previous diagram step">←</button><button data-step-next>Next step →</button><button data-replay title="Replay the diagram steps">Replay ↻</button><button data-focus title="D: enlarge diagram">Enlarge ⛶</button></div></aside></div>`;
  }
  function modelContrast(s){
    const modelFigure=model=>{
      const downward=model.direction==='down';
      const curve=downward
        ?'<path class="model-curve model-curve-ad" d="M 128 64 C 150 132, 230 218, 408 232"></path>'
        :'<path class="model-curve model-curve-ae" d="M 92 218 L 414 70"></path>';
      const label=downward
        ?'<text class="model-curve-label model-curve-label-ad" x="388" y="218">AD</text>'
        :'<text class="model-curve-label model-curve-label-ae" x="390" y="68">AE</text>';
      return `<figure class="model-contrast-figure"><figcaption><strong>${e(model.name)}</strong><span>${e(model.focus)}</span></figcaption><svg viewBox="0 0 500 300" role="img" aria-label="${e(model.alt)}"><line class="model-axis" x1="92" y1="252" x2="442" y2="252"></line><line class="model-axis" x1="92" y1="252" x2="92" y2="40"></line>${curve}${label}<text class="model-axis-label model-axis-label-x" x="267" y="287">${e(model.xAxis)}</text><text class="model-axis-label model-axis-label-y" x="24" y="146" transform="rotate(-90 24 146)">${e(model.yAxis)}</text></svg></figure>`;
    };
    return `<div class="model-contrast-layout">${s.models.map(modelFigure).join('')}</div><p class="model-contrast-takeaway">${inlineMath(s.takeaway)}</p>`;
  }
  function workedWithStimulus(s){
    const q=s.stimulus;
    return `<div class="worked-layout worked-with-stimulus"><article class="worked-stimulus"><h2>Original question</h2><p class="stimulus-source">${e(q.sourceLabel)}</p><p class="stimulus-question" data-verbatim>${inlineMath(q.question)}</p>${tableMarkup(q)}<p class="stimulus-options" data-verbatim>${q.options.map(e).join(' · ')}</p></article><article class="solution"><h2>Your explanation</h2><div class="given">${paragraphs(s.prompt)}</div>${revealButton}<div class="solution-text" hidden>${paragraphs(s.solution)}</div></article></div>`;
  }
  function render(s,i){
    let body='';
    switch(s.kind){
      case 'hero': body=`<div class="hero-copy"><p class="eyebrow">${e(s.eyebrow)}</p><span class="hero-code">${e(s.code||'')}</span><h1>${e(s.title)}</h1><p class="hero-subtitle">${e(s.subtitle)}</p><p class="hero-syllabus">${e(s.syllabus)}</p></div><div class="hero-image">${photo(s)}</div>`;break;
      case 'hook':body=`<div class="hook-image">${photo(s)}</div><div class="hook-copy"><span class="eyebrow">${e(s.eyebrow||'THINK FIRST')}</span><h1>${e(s.title)}</h1></div>`;break;
      case 'section':body=`<div class="section-copy"><p class="eyebrow">${e(s.eyebrow)}</p><h1>${e(s.title)}</h1>${takeaway(s.subtitle)}<div class="section-index">${e(s.number||'')}</div></div>`;break;
      case 'statement':body=`<div class="statement-layout ${s.sampleAnswer?'statement-check-layout':''}"><p class="statement-copy">${inlineMath(s.statement)}</p>${s.formula?`<p class="statement-formula">${typesetMath(s.formula)}</p>`:''}${s.sampleAnswer?`${sampleAnswerButton}<div class="solution-text quick-check-answer" hidden><h2>Sample answer</h2>${paragraphs(s.sampleAnswer)}</div>`:''}</div>`;break;
      case 'objectives':body=`<div class="objective-list">${s.items.map((x,j)=>`<article><span>${String(j+1).padStart(2,'0')}</span><p>${e(x.text)}</p></article>`).join('')}</div>`;break;
      case 'scenario':body=`<div class="scenario"><div>${photo(s)}</div><article><h2>${e(s.heading)}</h2>${paragraphs(s.text)}</article></div>`;break;
      case 'steps':body=(s.intro?`<p class="intro">${inlineMath(s.intro)}</p>`:'')+columns(s,true)+takeaway(s.takeaway);break;
      case 'chain':body=(s.intro?`<p class="intro">${inlineMath(s.intro)}</p>`:'')+chain(s);break;
      case 'visual-grid':body=visualGrid(s);break;
      case 'tasks':body=(s.intro?`<p class="intro">${inlineMath(s.intro)}</p>`:'')+columns(s)+takeaway(s.takeaway);break;
      case 'answers':case 'compare':body=columns(s,!!s.reveal)+takeaway(s.takeaway);break;
      case 'adjustment':body=`<div class="adjustment-layout">${s.rows.map(row=>`<div class="adjustment-row"><p>${inlineMath(row.condition)}</p><span class="adjustment-connector" aria-hidden="true"></span><p>${inlineMath(row.signal)}</p><span class="adjustment-connector" aria-hidden="true"></span><p>${inlineMath(row.response)}</p></div>`).join('')}</div>`;break;
      case 'model-contrast':body=modelContrast(s);break;
      case 'flow':body=`<div class="flow-layout"><article class="flow-in"><h2>Injections</h2>${paragraphs(s.items[0].text)}</article><div class="flow-center"><span class="flow-arrow">→</span><div>National<br>income<br><strong>flow</strong></div><span class="flow-arrow outward">→</span></div><article class="flow-out"><h2>Leakages</h2>${paragraphs(s.items[1].text)}</article></div>`;break;
      case 'table':body=(s.intro?`<p class="intro">${inlineMath(s.intro)}</p>`:'')+tableMarkup(s)+takeaway(s.takeaway);break;
      case 'formula':body=`<div class="formula-layout"><div><p class="big-formula">${s.math?typesetMath(s.formula):e(s.formula)}</p><p class="definition">${rich(s.definition)}</p></div><article><h2>${e(s.heading)}</h2>${paragraphs(s.text)}</article></div>`+takeaway(s.takeaway);break;
      case 'definition':body=`<div class="definition-layout"><p class="definition-term-zh" lang="zh-Hans">${e(s.termZh)}</p><p class="definition-text">${applyHighlights(inlineMath(s.definition),s.highlights)}</p><p class="definition-text-zh" lang="zh-Hans">${applyHighlights(inlineMath(s.definitionZh),s.highlightsZh)}</p>${s.formula?`<p class="definition-formula">${typesetMath(s.formula)}</p>`:''}</div>`;break;
      case 'worked':body=s.stimulus?workedWithStimulus(s):`<div class="worked-layout"><article><h2>Given</h2><div class="given">${paragraphs(s.prompt)}</div></article><article class="solution"><h2>Method</h2>${revealButton}<div class="solution-text" hidden>${paragraphs(s.solution)}</div></article></div>`+(s.takeaway?`<p class="takeaway solution-takeaway" hidden>${e(s.takeaway)}</p>`:'');break;
      case 'diagram':body=diagramBody(s);break;
      case 'mcq':body=(s.intro?`<p class="intro">${inlineMath(s.intro)}</p>`:'')+(s.table?tableMarkup(s):'')+`<p class="paper-question" data-verbatim>${inlineMath(s.question)}</p><div class="mcq-options">${s.options.map((x,j)=>`<button class="mcq-option" data-option="${j}"><span>${e(x.slice(0,1))}</span><span data-verbatim>${inlineMath(x.slice(1).trim())}</span></button>`).join('')}</div><div class="mcq-feedback" role="status" hidden></div>`;break;
      case 'paper':body=s.image
        ?`<div class="paper-photo-layout"><figure>${photo(s)}${s.imageCaption?`<figcaption>${e(s.imageCaption)}</figcaption>`:''}</figure><div class="paper-photo-question"><blockquote class="exam-question" data-verbatim>${inlineMath(s.question)}</blockquote>${takeaway(s.takeaway)}</div></div>`
        :`<blockquote class="exam-question" data-verbatim>${inlineMath(s.question)}</blockquote>`+takeaway(s.takeaway);break;
      case 'assessment':body=`<p class="assessment-prompt">${inlineMath(s.prompt)}</p><ol class="assessment-list" type="a">${s.items.map(x=>`<li>${inlineMath(x.text.replace(/^[a-d]\s+/,''))}</li>`).join('')}</ol>`;break;
      default:throw Error(`Unknown slide kind: ${s.kind}`);
    }
    const full=['hero','hook','section'].includes(s.kind);
    const heading=s.paper?s.paper:s.title;
    return `<section class="slide slide-${e(s.kind)} ${s.deferred?'is-deferred':''}" id="${e(s.id)}" data-slide-id="${e(s.id)}" data-index="${i}" hidden aria-label="Slide ${i+1}: ${e(s.title)}">${full?body:`<header class="slide-header"><p class="eyebrow">${s.paper?(s.deferred?'Past paper · Study later':'Past paper'):e(s.label||s.section)}</p><h1>${e(heading)}</h1></header><div class="slide-body">${body}</div>`}<span class="folio">${String(i+1).padStart(2,'0')}</span></section>`;
  }
  function mount(lesson){
    const controls = document.querySelector('.controls');
    let navigation;
    if(!lesson?.slides?.length)throw Error('Lesson data missing');
    const stage=document.querySelector('#stage'),slides=lesson.slides;
    stage.innerHTML=slides.map(render).join('');
    const roots=[...stage.querySelectorAll('.slide')], progress=slides.map(()=>0),answerState=new Map();
    let current=0,replay=null,focus=false;
    const byId=new Map(slides.map((s,i)=>[s.id,i])), dialogs=[...document.querySelectorAll('dialog')];
    function maxStep(s){return s.kind==='diagram'?s.scene.steps.length-1:s.reveal?(s.kind==='table'?s.table.length-1:s.items.length):['steps','chain'].includes(s.kind)?s.items.length-1:0;}
    function stopReplay(){clearInterval(replay);replay=null;}
    function updateChrome(instant=false){
      const s=slides[current],root=roots[current],step=progress[current],max=maxStep(s);
      if(s.kind==='diagram'){
        const state=s.scene.steps[step];
        root.querySelector('.step-count').textContent=`${String(step+1).padStart(2,'0')} / ${String(max+1).padStart(2,'0')}`;
        root.querySelector('.step-title').textContent=state.label;
        root.querySelector('.step-copy').innerHTML=paragraphs(state.text);
        root.querySelector('.step-takeaway').innerHTML=inlineMath(state.takeaway);
        root.querySelector('[data-step-back]').disabled=step===0;
        root.querySelector('[data-step-next]').disabled=step===max;
        global.EconDiagrams.update(root,s.scene,step,instant);
      }
      root.querySelectorAll('[data-reveal-step]').forEach(el=>{const hide=+el.dataset.revealStep>step;el.classList.toggle('unrevealed',hide);el.setAttribute('aria-hidden',String(hide));});
      document.querySelector('#status').textContent=`${current+1} / ${slides.length}${max?` · ${step+1}/${max+1}`:''}`;
      document.querySelector('#previous').disabled=current===0&&step===0;
      document.querySelector('#next').disabled=current===slides.length-1&&step===max;
      history.replaceState(null,'',`#${s.id}${step?`/${step}`:''}`);
      document.title=`${current+1}. ${s.title} · ${lesson.meta.title}`;
    }
    function show(index,step){
      stopReplay();current=Math.max(0,Math.min(slides.length-1,index));
      if(Number.isFinite(step))progress[current]=Math.max(0,Math.min(maxStep(slides[current]),step));
      roots.forEach((r,i)=>r.hidden=i!==current);
      stage.classList.toggle('diagram-focus',focus&&slides[current].kind==='diagram');
      roots[current].scrollTop=0;updateChrome(true);updateNotes();
    }
    function stepBy(delta,skip=false){
      stopReplay();const next=progress[current]+delta;
      if(!skip&&next>=0&&next<=maxStep(slides[current])){progress[current]=next;updateChrome();return;}
      show(current+delta);
    }
    function toggleFocus(){focus=!focus;stage.classList.toggle('diagram-focus',focus&&slides[current].kind==='diagram');}
    function reset(){stopReplay();progress[current]=0;const root=roots[current];root.querySelectorAll('.is-correct,.is-wrong,.is-selected').forEach(el=>el.classList.remove('is-correct','is-wrong','is-selected'));root.querySelectorAll('.mcq-option').forEach(el=>el.setAttribute('aria-pressed','false'));const fb=root.querySelector('.mcq-feedback');if(fb)fb.hidden=true;const sol=root.querySelector('.solution-text');if(sol)sol.hidden=true;const st=root.querySelector('.solution-takeaway');if(st)st.hidden=true;const rb=root.querySelector('[data-reveal]');if(rb){const answer=rb.dataset.revealKind==='answer';rb.setAttribute('aria-expanded','false');rb.innerHTML=`${answer?'View sample answer':'Show method'} <span>↗</span>`;};answerState.delete(slides[current].id);updateChrome();}
    function updateNotes(){const s=slides[current];document.querySelector('#noteContent').innerHTML=`<p class="note-ref">Slide ${current+1} · ${e(s.id)}${s.sourceSlide?` · PPT source ${s.sourceSlide}`:''}</p><h3>${e(s.title)}</h3><div class="notes-copy">${paragraphs(s.notes||'Pause for a student prediction before revealing the next step.')}</div><h3>Sources</h3><ul>${[...new Set(s.sources||[])].map(x=>`<li>${e(x)}</li>`).join('')}</ul>${lesson.meta.sourcePptx?`<p class="note-ref">Converted from the verified ${lesson.meta.sourceSlideCount}-slide PowerPoint. Diagram movements use the stated model, not pixel approximations.</p>`:''}`;}
    function openDialog(id){
      stopReplay();
      if(id==='overview'){navigation?.toggleOverview(true);return;}
      const d=document.getElementById(id);if(!d.open)d.showModal();
    }
    const studentSelector=global.LessonStudentSelector.attach({
      button:document.querySelector('#studentSelectorButton'),courseLabel:'A LEVEL ECONOMICS',beforeOpen:stopReplay,
      baseUrl:()=>lesson.meta.studentSelectorBaseUrl||global.ALEVEL_STUDENT_SELECTOR_BASE_URL,
      getContext:()=>({content_id:global.OHPlatform?.content?.id||lesson.meta.code||null,learning_assignment_id:new URLSearchParams(location.search).get('assignment')})
    });
    document.querySelector('#previous').onclick=()=>stepBy(-1);
    document.querySelector('#next').onclick=()=>stepBy(1);
    document.querySelector('#overviewButton').onclick=()=>openDialog('overview');
    document.querySelector('#notesButton').onclick=()=>openDialog('notes');
    document.querySelector('#helpButton').onclick=()=>openDialog('help');
    document.querySelector('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{document.querySelector('#fullscreen').textContent='Use browser F11';}};
    dialogs.forEach(d=>{d.querySelector('[data-close]').onclick=()=>d.close();d.addEventListener('click',event=>{if(event.target===d&&event.offsetX>=0&&event.offsetY>=0){const r=d.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)d.close();}});});
    stage.addEventListener('click',event=>{
      const b=event.target.closest('button');if(!b)return;
      const s=slides[current],root=roots[current];stopReplay();
      if(b.hasAttribute('data-step-next'))stepBy(1);
      if(b.hasAttribute('data-step-back'))stepBy(-1);
      if(b.hasAttribute('data-focus'))toggleFocus();
      if(b.hasAttribute('data-replay')){progress[current]=0;updateChrome();replay=setInterval(()=>{if(progress[current]<maxStep(s)){progress[current]++;updateChrome();}else stopReplay();},1800);}
      if(b.hasAttribute('data-reveal')){const visible=b.getAttribute('aria-expanded')!=='true',answer=b.dataset.revealKind==='answer';b.setAttribute('aria-expanded',String(visible));root.querySelector('.solution-text').hidden=!visible;const t=root.querySelector('.solution-takeaway');if(t)t.hidden=!visible;b.innerHTML=visible?`${answer?'Hide sample answer':'Hide method'} <span>↙</span>`:`${answer?'View sample answer':'Show method'} <span>↗</span>`;}
      if(b.hasAttribute('data-option')){
        const chosen=+b.dataset.option,correct=chosen===s.answer;
        root.querySelectorAll('.mcq-option').forEach((el,i)=>{el.classList.toggle('is-selected',i===chosen);el.classList.toggle('is-correct',i===s.answer);el.classList.toggle('is-wrong',i===chosen&&!correct);el.setAttribute('aria-pressed',String(i===chosen));});
        const fb=root.querySelector('.mcq-feedback');fb.hidden=false;fb.innerHTML=inlineMath((correct?'Correct. ':'Not quite. ')+s.feedback);answerState.set(s.id,chosen);
      }
    });
    const blank=document.querySelector('#blankScreen');blank.onclick=()=>blank.hidden=true;
    document.addEventListener('keydown',event=>{
      if(event.altKey||event.ctrlKey||event.metaKey)return;
      if(studentSelector.isOpen){if(event.key.toLowerCase()==='s'&&!event.target.closest('input,textarea,select,[contenteditable="true"]')){event.preventDefault();studentSelector.close();}return;}
      if(event.key==='Escape'){blank.hidden=true;if(focus){focus=false;stage.classList.remove('diagram-focus');}stopReplay();return;}
      if(dialogs.some(d=>d.open)||event.target.closest('input,textarea,select,[contenteditable="true"]'))return;
      if(event.target.closest('button,a,summary')&&[' ','Enter'].includes(event.key))return;
      const k=event.key.toLowerCase();
      if(!blank.hidden){if(['b',' ','enter'].includes(k)){event.preventDefault();blank.hidden=true;}return;}
      if(['arrowright','pagedown',' '].includes(k)){event.preventDefault();stepBy(1,event.shiftKey);}
      else if(['arrowleft','pageup'].includes(k)){event.preventDefault();stepBy(-1,event.shiftKey);}
      else if(k==='home'){event.preventDefault();show(0,0);}else if(k==='end'){event.preventDefault();show(slides.length-1);}
      else if(k==='o'){event.preventDefault();openDialog('overview');}else if(k==='n')openDialog('notes');else if(k==='s')studentSelector.toggle();else if(k==='?')openDialog('help');else if(k==='f')document.querySelector('#fullscreen').click();else if(k==='d')toggleFocus();else if(k==='r')reset();else if(k==='b'){stopReplay();blank.hidden=false;}
    });
    function fromHash(){const [id,step]=decodeURIComponent(location.hash.slice(1)).split('/');show(byId.has(id)?byId.get(id):/^\d+$/.test(id)?+id-1:0,Number(step)||0);}
    addEventListener('hashchange',fromHash);fromHash();
    if(/^https?:$/.test(location.protocol)&&['127.0.0.1','localhost'].includes(location.hostname)){
      const live=new EventSource('/__events');live.onmessage=()=>location.reload();live.onerror=()=>{if(live.readyState===EventSource.CLOSED)live.close();};
    }
    loadLessonNavigation().then(api => {
      navigation = api.mount({ controls, slides, getCurrent: () => current, show,
        title: lesson.meta.title, dialog: document.querySelector('#overview'),
        previous: document.querySelector('#previous'), next: document.querySelector('#next'), status: document.querySelector('#status'),
        overviewButton: document.querySelector('#overviewButton'), selector: document.querySelector('#studentSelectorButton'),
        tools: [document.querySelector('#notesButton'), document.querySelector('#fullscreen'), document.querySelector('#helpButton')],
        links: [{ label: 'A-level course', href: new URL('../../a-level/index.html', navigationAssetUrl).href }],
        beforeOverview: stopReplay
      });
      document.querySelector('#helpButton').textContent = 'Keyboard shortcuts';
    }).catch(error => console.error('Lesson navigation could not load', error));
    // Small, explicit inspection hook for regression checks and fast slide-targeted previews.
    global.EconPresentation.deck={lesson,show,stepBy,reset,toggleFocus,get current(){return current;},get step(){return progress[current];},get maxStep(){return maxStep(slides[current]);}};
  }
  global.EconPresentation={mount};
}(window));
