(function createInvestmentPresentation(global) {
  'use strict';
  const navigationAssetUrl = new URL('../../../assets/js/deck-navigation.js', document.currentScript.src);
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

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  function answerBlank(answer = '') {
    const cleanAnswer = String(answer || '').trim();
    if (!cleanAnswer) return '<span class="blank" aria-label="blank">&nbsp;</span>';
    const width = Math.max(5, Math.min(18, cleanAnswer.length + 2));
    return `<button type="button" class="blank-answer" data-answer="${escapeHtml(cleanAnswer)}" aria-expanded="false" aria-label="Reveal answer" style="--blank-width:${width}ch"><span aria-hidden="true">${escapeHtml(cleanAnswer)}</span></button>`;
  }

  function richText(value = '', answers = []) {
    let answerIndex = 0;
    return String(value || '')
      .split(/(_{4,})/g)
      .map((part) => {
        if (/^_{4,}$/.test(part)) {
          const answer = Array.isArray(answers) ? answers[answerIndex] : '';
          answerIndex += 1;
          return answerBlank(answer);
        }
        return escapeHtml(part).replaceAll('\n', '<br>');
      })
      .join('');
  }

  function bilingualLabel(english = '', chinese = '') {
    const support = chinese ? `<small class="zh-support" lang="zh-CN">${escapeHtml(chinese)}</small>` : '';
    return `${escapeHtml(english)}${support}`;
  }

  function photoMarkup(photo, className = 'photo-frame', position) {
    if (!photo) return '';
    const objectPosition = position || photo.position || '50% 50%';
    return `<figure class="${className}">
      <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt)}" style="object-position:${escapeHtml(objectPosition)}" />
      <figcaption>${escapeHtml(photo.credit)}</figcaption>
    </figure>`;
  }

  function standardFrame(lesson, slide, index, body, extraClass = '') {
    const total = lesson.slides.length;
    return `<section class="slide slide--${escapeHtml(slide.kind)} ${slide.reveal ? 'is-reveal' : ''} ${extraClass}" data-slide-id="${escapeHtml(slide.id)}" data-index="${index}" hidden>
      <span class="slide-rail" aria-hidden="true"></span>
      <header class="slide-header">
        <div class="eyebrow"><span></span>LESSON ${String(lesson.meta.lesson).padStart(2, '0')} / ${escapeHtml(slide.group || lesson.meta.folio || 'RETURN')}</div>
        <div class="folio">${escapeHtml(lesson.meta.folio || 'RETURN')} / ${String(index + 1).padStart(2, '0')}</div>
        <h1>${escapeHtml(slide.title || '')}</h1>
      </header>
      <div class="slide-body">${body}</div>
      <div class="slide-page" aria-hidden="true">${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</div>
    </section>`;
  }

  function renderHero(slide, index) {
    const syllabusCode = Array.isArray(slide.syllabus) && slide.syllabus.length
      ? slide.syllabus[slide.syllabus.length - 1].code
      : '';
    const syllabus = Array.isArray(slide.syllabus)
      ? `<div class="hero-syllabus" aria-label="Syllabus position">${slide.syllabus.map((item, itemIndex) => `<div class="hero-syllabus-item ${itemIndex === slide.syllabus.length - 1 ? 'hero-syllabus-item--current' : ''}">
          <span class="hero-syllabus-code">${escapeHtml(item.code)}</span>
          <div><strong>${escapeHtml(item.title)}</strong>${item.zh ? `<span lang="zh-CN">${escapeHtml(item.zh)}</span>` : ''}</div>
        </div>`).join('')}</div>`
      : '';
    return `<section class="slide slide--hero" data-slide-id="${escapeHtml(slide.id)}" data-index="${index}" hidden>
      <span class="slide-rail" aria-hidden="true"></span>
      <div class="hero-copy">
        <div class="hero-rule" aria-hidden="true"></div>
        ${syllabus}
        <h1>${escapeHtml(slide.title)}</h1>
        <p class="hero-zh" lang="zh-CN">${escapeHtml(slide.zh)}</p>
        <div class="hero-folio">${escapeHtml(syllabusCode)} / ${String(index + 1).padStart(2, '0')}</div>
      </div>
      ${photoMarkup(slide.photo, 'hero-photo')}
    </section>`;
  }

  function renderDiscussion(lesson, slide, index) {
    if (slide.variant === 'photo-evidence') {
      return standardFrame(lesson, slide, index, `<div class="photo-evidence">${photoMarkup(slide.photo, 'evidence-photo')}<div class="evidence-copy"><h2>${escapeHtml(slide.asset)}</h2><p>${escapeHtml(slide.context)}</p><dl>${slide.rows.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl></div></div>`);
    }
    if (slide.variant === 'real-hook') {
      const periods = slide.periods.map((period) => `<article class="hook-period hook-period--${escapeHtml(period.tone)}">
        ${photoMarkup(period.photo, 'hook-company-photo')}
        <div class="hook-period-head"><strong>${escapeHtml(period.year)}</strong><span>${escapeHtml(period.result)}</span></div>
        <dl>${period.rows.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl>
      </article>`).join('');
      const body = `<div class="hook-periods hook-periods--photos">${periods}</div>`;
      return standardFrame(lesson, slide, index, body, 'slide--real-hook');
    }
    const body = `<div class="discussion-prompt">${escapeHtml(slide.prompt)}</div>
      <div class="choice-pair">
        <div class="choice-card choice-card--forest"><b>${escapeHtml(slide.left[0])}</b><strong>${escapeHtml(slide.left[1])}</strong></div>
        <div class="choice-card choice-card--copper"><b>${escapeHtml(slide.right[0])}</b><strong>${escapeHtml(slide.right[1])}</strong></div>
      </div>
      <p class="slide-footnote">${escapeHtml(slide.footer)}</p>`;
    return standardFrame(lesson, slide, index, body);
  }

  function renderObjectives(lesson, slide, index) {
    const rows = slide.items.map(([number, en, zh], itemIndex) => `<article class="objective-row objective-row--${itemIndex === 1 ? 'copper' : 'forest'}">
      <span class="objective-number">${escapeHtml(number)}</span>
      <div><strong>${escapeHtml(en)}</strong><span lang="zh-CN">${escapeHtml(zh)}</span></div>
    </article>`).join('');
    return standardFrame(lesson, slide, index, `<div class="objective-list">${rows}</div>`);
  }

  function renderRecall(lesson, slide, index) {
    if (slide.variant === 'retrieval') {
      const questions = slide.items.map((item) => `<article class="retrieval-question"><h2>${escapeHtml(item.question)}</h2><details class="retrieval-answer"><summary>Show answer</summary><div>${(item.equations || []).map(equation => `<div class="retrieval-equation">${mathMarkup(equation)}</div>`).join('')}${item.answer ? `<p>${escapeHtml(item.answer)}</p>` : ''}</div></details></article>`).join('');
      return standardFrame(lesson, slide, index, `<div class="retrieval-scene ${slide.photo ? 'retrieval-scene--photo' : ''}">${slide.photo ? photoMarkup(slide.photo, 'evidence-photo') : ''}<div class="retrieval-copy">${slide.context ? `<p class="retrieval-context">${escapeHtml(slide.context)}</p>` : ''}<div class="retrieval-questions">${questions}</div></div></div>`);
    }
    const cards = slide.items.map((item) => {
      const data = Array.isArray(item)
        ? { term: item[0], text: item[1], answers: item[2] }
        : item;
      const visual = data.photo ? `<div class="recall-visual">
        ${photoMarkup(data.photo, 'recall-photo')}
        ${data.imageLabel ? `<span class="recall-example">${escapeHtml(data.imageLabel)}</span>` : ''}
      </div>` : '';
      return `<article class="recall-card${data.photo ? ' recall-card--visual' : ''}">
        ${visual}
        <div class="recall-card-copy">
          <h2>${bilingualLabel(data.term, data.termZh)}</h2>
          <p>${richText(data.text, data.answers)}</p>
        </div>
      </article>`;
    }).join('');
    return standardFrame(lesson, slide, index, `<div class="recall-grid">${cards}</div>`);
  }

  function renderSection(slide, index) {
    return `<section class="slide slide--section" data-slide-id="${escapeHtml(slide.id)}" data-index="${index}" hidden>
      <span class="slide-rail" aria-hidden="true"></span>
      <div class="section-inner">
        <div class="section-number">${escapeHtml(slide.number)}</div>
        <div class="section-rule" aria-hidden="true"></div>
        <h1>${escapeHtml(slide.title)}</h1>
        <p lang="zh-CN">${escapeHtml(slide.zh)}</p>
        ${slide.caption !== undefined ? `<span class="section-caption">${escapeHtml(slide.caption)}</span>` : '<span class="section-caption">A MEASUREMENT CHAPTER</span>'}
      </div>
    </section>`;
  }

  function renderVisual(slide, index) {
    if (slide.prompt) {
      return `<section class="slide slide--visual slide--visual-pause" data-slide-id="${escapeHtml(slide.id)}" data-index="${index}" hidden>${photoMarkup(slide.photo, 'visual-photo', slide.position)}<div class="visual-pause-shade"></div><h1>${escapeHtml(slide.prompt)}</h1></section>`;
    }
    if (slide.comparison) {
      const panel = (items, tone) => `<article class="visual-compare-card visual-compare-card--${tone}"><h2>${escapeHtml(items[0])}</h2>${items.slice(1).map((item) => `<p>${escapeHtml(item)}</p>`).join('')}</article>`;
      return `<section class="slide slide--visual slide--visual-data" data-slide-id="${escapeHtml(slide.id)}" data-index="${index}" hidden>
        <span class="visual-rail" aria-hidden="true"></span>
        <div class="visual-comparison">
          <div class="visual-eyebrow">${escapeHtml(slide.comparison.eyebrow)}</div>
          <h1>${escapeHtml(slide.comparison.title)}</h1>
          <div class="visual-compare-grid">${panel(slide.comparison.left, 'forest')}${panel(slide.comparison.right, 'copper')}</div>
          <p>${escapeHtml(slide.comparison.prompt)}</p>
        </div>
      </section>`;
    }
    const visualCard = slide.visualCard
      ? `<aside class="visual-card">
          <div class="visual-eyebrow">${escapeHtml(slide.visualCard.eyebrow)}</div>
          <h1>${escapeHtml(slide.visualCard.title)}</h1>
          <div class="visual-metrics">${slide.visualCard.metrics.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join('')}</div>
          <p>${escapeHtml(slide.visualCard.prompt)}</p>
        </aside>`
      : '';
    return `<section class="slide slide--visual ${slide.visualCard ? 'slide--visual-evidence' : ''}" data-slide-id="${escapeHtml(slide.id)}" data-index="${index}" hidden>
      <span class="visual-rail" aria-hidden="true"></span>
      ${photoMarkup(slide.photo, 'visual-photo', slide.position)}
      ${visualCard}
    </section>`;
  }

  function renderDefinition(lesson, slide, index) {
    const body = `${slide.key ? `<div class="term-label">${escapeHtml(slide.key)}</div>` : ''}
      <div class="definition-panel ${slide.translation ? 'definition-panel--bilingual' : ''}"><p>${richText(slide.prompt, slide.blankAnswers)}</p>${slide.translation ? `<p class="definition-translation" lang="zh-CN">${escapeHtml(slide.translation)}</p>` : ''}</div>`;
    return standardFrame(lesson, slide, index, body);
  }

  function renderThree(lesson, slide, index) {
    if (slide.variant === 'market-data') {
      const cards = slide.items.map((item) => `<article class="market-card">
        ${photoMarkup(item.photo, 'market-photo')}
        <div class="market-card-copy"><h2>${escapeHtml(item.title)}</h2>
          ${item.components.map(([label, value, tone, zh]) => `<div class="market-component market-component--${escapeHtml(tone)}"><span>${bilingualLabel(label, zh)}</span><strong>${escapeHtml(value)}</strong></div>`).join('')}
        </div>
      </article>`).join('');
      return standardFrame(lesson, slide, index, `<div class="market-grid">${cards}</div>`);
    }
    const cards = slide.items.map(([title, text, tone]) => `<article class="form-card form-card--${escapeHtml(tone)}">
      <h2>${escapeHtml(title)}</h2><p>${richText(text)}</p>
    </article>`).join('');
    return standardFrame(lesson, slide, index, `<div class="three-grid ${slide.variant ? `three-grid--${escapeHtml(slide.variant)}` : ''}">${cards}</div>`);
  }

  function renderComponents(lesson, slide, index) {
    const cards = slide.items.map((item) => `<article class="component-card component-card--${escapeHtml(item.tone)}">
      <h2>${bilingualLabel(item.term, item.zh)}</h2>
      <p>${escapeHtml(item.definition)}</p>
      <strong>${escapeHtml(item.example)}</strong>
    </article>`).join('');
    return standardFrame(lesson, slide, index, `<div class="component-grid">${cards}</div>`);
  }

  function renderAssetReturns(lesson, slide, index) {
    const cards = slide.items.map((item) => `<article class="asset-return-card">
      ${photoMarkup(item.photo, 'asset-return-photo')}
      <div class="asset-return-copy">
        <div class="asset-return-heading"><span>${bilingualLabel(item.asset, item.assetZh)}</span><h2>${bilingualLabel(item.title, item.titleZh)}</h2><p>${escapeHtml(item.fact)}</p></div>
        <div class="asset-return-mechanisms">
          ${item.mechanisms.map((mechanism) => `<div class="asset-mechanism asset-mechanism--${escapeHtml(mechanism.tone)}">
            <span>${bilingualLabel(mechanism.type, mechanism.zh)}</span>
            <p>${escapeHtml(mechanism.text)}</p>
            <strong>${escapeHtml(mechanism.result)}</strong>
          </div>`).join('')}
        </div>
      </div>
    </article>`).join('');
    return standardFrame(lesson, slide, index, `<div class="asset-return-grid">${cards}</div>`);
  }

  function renderClassify(lesson, slide, index) {
    const rows = slide.items.map((item, itemIndex) => {
      const prompt = Array.isArray(item) ? item[0] : item;
      const answer = Array.isArray(item) ? item[1] : (slide.answers?.[itemIndex] || '');
      const answerMarkup = answer
        ? (slide.reveal
          ? `<strong>${escapeHtml(answer)}</strong>`
          : `<button type="button" class="inline-reveal" data-answer="${escapeHtml(answer)}" aria-expanded="false"><span>Reveal</span><strong aria-hidden="true">${escapeHtml(answer)}</strong></button>`)
        : '<span class="answer-line"></span>';
      return `<div class="classify-row"><span class="row-number">${itemIndex + 1}.</span><p>${escapeHtml(prompt)}</p>${answerMarkup}</div>`;
    }).join('');
    const options = Array.isArray(slide.options)
      ? `<div class="option-bank"><span>USE ONE OF:</span>${slide.options.map((option) => `<strong>${escapeHtml(option)}</strong>`).join('')}</div>`
      : '';
    return standardFrame(lesson, slide, index, `${slide.prompt ? `<p class="instruction instruction--left">${escapeHtml(slide.prompt)}</p>` : ''}${options}<div class="classify-list">${rows}</div>`);
  }

  function renderFlow(lesson, slide, index) {
    const steps = slide.steps.map(([number, text, answers]) => `<article class="flow-card"><span>${escapeHtml(number)}</span><p>${richText(text, answers)}</p></article>`).join('');
    return standardFrame(lesson, slide, index, `<div class="flow-grid">${steps}</div>`);
  }

  function renderMcq(lesson, slide, index) {
    const options = slide.options.map((option, optionIndex) => `<button type="button" class="mcq-option ${slide.reveal && slide.answer === optionIndex ? 'is-correct' : ''}" data-option="${optionIndex}" ${slide.reveal ? 'disabled' : ''}>${slide.mathOptions ? mathMarkup(option) : escapeHtml(option)}</button>`).join('');
    const feedback = !slide.reveal && slide.feedback
      ? `<div class="mcq-feedback" data-explanation="${escapeHtml(slide.feedback)}" hidden aria-live="polite">${escapeHtml(slide.feedback)}</div>`
      : '';
    const content = `<div class="question-panel">${richText(slide.question)}</div><div class="mcq-grid" data-answer="${Number.isInteger(slide.answer) ? slide.answer : ''}">${options}</div>${feedback}`;
    return standardFrame(lesson, slide, index, slide.photo ? `<div class="quiz-evidence">${photoMarkup(slide.photo, 'evidence-photo')}<div class="quiz-copy">${content}</div></div>` : content);
  }

  // Structured fractions and explicit powers keep lesson equations editable,
  // upright and safely escaped; ordinary prose is never interpreted as HTML.
  function mathMarkup(value) {
    const power = text => escapeHtml(text).replace(/\^([a-zA-Z]|\d+)/g, '<sup>$1</sup>');
    if (value && typeof value === 'object' && value.fraction) {
      return `<span class="math-expression">${power(value.before || '')}<span class="math-fraction"><span>${power(value.fraction[0])}</span><span>${power(value.fraction[1])}</span></span>${power(value.after || '')}</span>`;
    }
    return `<span class="math-expression">${power(value)}</span>`;
  }

  function renderMethod(lesson, slide, index) {
    if (slide.variant === 'equations') {
      const steps = slide.steps.map(step => `<article class="equation-step ${step.tone === 'copper' ? 'equation-step--copper' : ''}"><h2>${escapeHtml(step.label)}</h2><div>${mathMarkup(step.equation)}</div>${step.explanation ? `<p>${escapeHtml(step.explanation)}</p>` : ''}</article>`).join('');
      return standardFrame(lesson, slide, index, `<div class="equation-scene">${slide.context ? `<p class="equation-context">${escapeHtml(slide.context)}</p>` : ''}<div class="equation-steps">${steps}</div></div>`);
    }
    if (slide.variant === 'compound-formula') {
      const terms = slide.terms.map(([symbol, label, zh, meaning]) => `<article class="formula-term"><strong>${escapeHtml(symbol)}</strong><div><h2>${bilingualLabel(label, zh)}</h2><p>${escapeHtml(meaning)}</p></div></article>`).join('');
      return standardFrame(lesson, slide, index, `<div class="compound-formula"><div class="compound-equation">FV = P(1 + r)<sup>n</sup></div><div class="formula-terms">${terms}</div></div>`);
    }
    const rows = slide.steps.map(([number, text, answers], itemIndex) => `<article class="method-row"><span class="method-number ${itemIndex % 2 ? 'is-copper' : ''}">${escapeHtml(number)}</span><p>${richText(text, answers)}</p></article>`).join('');
    return standardFrame(lesson, slide, index, `<div class="method-list">${rows}</div>`);
  }

  function renderWorked(lesson, slide, index) {
    if (slide.photo) {
      const data = slide.data.map((item) => Array.isArray(item)
        ? `<div><span>${escapeHtml(item[0])}</span><strong>${escapeHtml(item[1])}</strong></div>`
        : `<p>${escapeHtml(item)}</p>`).join('');
      const steps = slide.steps.map((item, itemIndex) => (item && typeof item === 'object')
        ? `<article class="worked-calculation-step"><span>${bilingualLabel(item.label, item.labelZh)}</span><p>${escapeHtml(item.calculation)}</p><strong>${escapeHtml(item.result)}</strong></article>`
        : `<p class="worked-step"><span>${itemIndex + 1}.</span>${escapeHtml(item)}</p>`).join('');
      const conclusion = slide.conclusion ? `<p class="worked-conclusion">${escapeHtml(slide.conclusion)}</p>` : '';
      return standardFrame(lesson, slide, index, `<div class="worked-grid worked-grid--visual"><aside>${photoMarkup(slide.photo, 'worked-photo')}<div class="worked-data"><span class="term-label">REAL MARKET EVIDENCE</span>${data}</div></aside><main>${steps}${conclusion}</main></div>`);
    }
    const data = slide.data.map((item) => `<p>${escapeHtml(item)}</p>`).join('');
    const steps = slide.steps.map((item, itemIndex) => `<p class="worked-step ${itemIndex === slide.steps.length - 1 ? 'is-conclusion' : ''}"><span>${itemIndex + 1}.</span>${escapeHtml(item)}</p>`).join('');
    return standardFrame(lesson, slide, index, `<div class="worked-grid"><aside><span class="term-label">CASE DATA</span>${data}</aside><main>${steps}</main></div>`);
  }

  function renderPractice(lesson, slide, index) {
    if (slide.variant === 'case-prose') {
      const solution = Array.isArray(slide.solution)
        ? `<ol class="practice-solution">${slide.solution.map(([label, zh, calculation]) => `<li><h2>${bilingualLabel(label, zh)}</h2><p>${escapeHtml(calculation)}</p></li>`).join('')}</ol>`
        : '';
      return standardFrame(lesson, slide, index, `<div class="practice-case ${slide.reveal ? 'practice-case--model' : ''}">
        ${photoMarkup(slide.photo, 'practice-photo')}
        <div class="practice-case-copy">${solution}<p class="practice-case-text">${richText(slide.question)}</p></div>
      </div>`);
    }
    const data = (slide.data || []).map((item) => `<p>${escapeHtml(item)}</p>`).join('');
    if (slide.photo) {
      return standardFrame(lesson, slide, index, `<div class="practice-panel practice-panel--photo ${slide.reveal ? 'practice-panel--model' : ''}">${photoMarkup(slide.photo, 'practice-photo')}<div class="practice-content"><div class="practice-data">${data}</div><div class="practice-question">${richText(slide.question)}</div></div></div>`);
    }
    return standardFrame(lesson, slide, index, `<div class="practice-panel ${slide.reveal ? 'practice-panel--model' : ''}"><div class="practice-data">${data}</div><div class="practice-question">${richText(slide.question)}</div></div>`);
  }

  function renderYesNo(lesson, slide, index) {
    const rows = slide.items.map((item, itemIndex) => {
      if (Array.isArray(item)) return `<article class="yesno-row"><span class="yesno-badge ${item[0] === 'YES' ? 'is-yes' : 'is-no'}">${escapeHtml(item[0])}</span><p>${escapeHtml(item[1])}</p></article>`;
      if (item && typeof item === 'object') {
        const label = item.answer ? 'TRUE' : 'FALSE';
        const answer = `${label} · ${item.reason || ''}`;
        return `<article class="yesno-row"><span class="row-number">${String(itemIndex + 1).padStart(2, '0')}</span><p>${escapeHtml(item.statement)}</p><button type="button" class="inline-reveal inline-reveal--yesno" data-answer="${escapeHtml(answer)}" aria-expanded="false"><span>Reveal</span><strong aria-hidden="true">${escapeHtml(answer)}</strong></button></article>`;
      }
      return `<article class="yesno-row"><span class="row-number">${String(itemIndex + 1).padStart(2, '0')}</span><p>${escapeHtml(item)}</p><span class="answer-line"></span></article>`;
    }).join('');
    return standardFrame(lesson, slide, index, `<div class="yesno-list">${rows}</div>`);
  }

  function renderCompare(lesson, slide, index) {
    const column = (items, tone) => `<article class="compare-card compare-card--${tone}"><h2>${escapeHtml(items[0])}</h2><p>${escapeHtml(items[1])}</p><strong>${richText(items[2], items[3])}</strong></article>`;
    return standardFrame(lesson, slide, index, `<div class="compare-grid">${column(slide.left, 'copper')}${column(slide.right, 'forest')}</div>`);
  }

  function renderCase(lesson, slide, index) {
    const card = (items, tone, answers) => {
      if (items && !Array.isArray(items) && typeof items === 'object') {
        return `<article class="case-card case-card--${tone} case-card--visual">${photoMarkup(items.photo, 'case-photo')}<div class="case-card-copy"><h2>${escapeHtml(items.title)}</h2>${items.lines.map((item) => `<p class="${slide.reveal ? 'case-result' : ''}">${richText(item)}</p>`).join('')}</div></article>`;
      }
      return `<article class="case-card case-card--${tone}"><h2>${escapeHtml(items[0])}</h2>${items.slice(1).map((item, itemIndex) => `<p class="${slide.reveal && itemIndex >= 1 ? 'case-result' : ''}">${richText(item, answers?.[itemIndex])}</p>`).join('')}</article>`;
    };
    const conclusion = slide.conclusion ? `<p class="case-conclusion" data-group-conclusion hidden>${escapeHtml(slide.conclusion)}</p>` : '';
    const visualClass = !Array.isArray(slide.left) ? 'case-grid--visual' : '';
    return standardFrame(lesson, slide, index, `<p class="instruction">${escapeHtml(slide.prompt)}</p><div class="case-grid ${visualClass}">${card(slide.left, 'forest', slide.leftAnswers)}${card(slide.right, 'copper', slide.rightAnswers)}</div>${conclusion}`);
  }

  function renderRecord(lesson, slide, index) {
    const fields = slide.fields.map((field, fieldIndex) => `<li><span>${String(fieldIndex + 1).padStart(2, '0')}</span>${escapeHtml(field)}</li>`).join('');
    const sample = slide.sample
      ? `<aside class="record-proof"><div class="record-proof-head"><span>EVIDENCE, NOT ESTIMATE</span><strong>${escapeHtml(slide.sample.title)}</strong></div><dl>${slide.sample.rows.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl></aside>`
      : photoMarkup(slide.photo, 'record-photo');
    return standardFrame(lesson, slide, index, `<div class="record-grid"><div class="record-card"><ol>${fields}</ol></div>${sample}</div>`);
  }

  function renderShort(lesson, slide, index) {
    if (slide.photo) {
      return standardFrame(lesson, slide, index, `<div class="short-visual">${photoMarkup(slide.photo, 'short-photo')}<div class="short-panel ${slide.reveal ? 'short-panel--model' : ''}"><p>${richText(slide.prompt)}</p></div></div>`);
    }
    return standardFrame(lesson, slide, index, `<div class="short-panel ${slide.reveal ? 'short-panel--model' : ''}"><p>${richText(slide.prompt)}</p></div>`);
  }

  function renderExit(lesson, slide, index) {
    if (Array.isArray(slide.checks)) {
      const checks = slide.checks.map((check, checkIndex) => {
        const content = check.numerator
          ? `<div class="exit-equation"><span>=</span><span class="exit-fraction"><span>${escapeHtml(check.numerator)}</span><span>${richText(check.denominator, check.answers)}</span></span><span>× 100</span></div>`
          : `<p class="${check.formula ? 'exit-equation' : 'exit-comparison'}">${richText(check.text, check.answers)}</p>`;
        return `<li class="exit-check"><span class="exit-check-number" aria-hidden="true">${String(checkIndex + 1).padStart(2, '0')}</span><h2>${bilingualLabel(check.title, check.zh)}</h2><div class="exit-check-content">${content}</div></li>`;
      }).join('');
      return standardFrame(lesson, slide, index, `<ol class="exit-check-list">${checks}</ol>`);
    }
    return standardFrame(lesson, slide, index, `<div class="exit-panel ${slide.reveal ? 'exit-panel--model' : ''}"><p>${richText(slide.prompt, slide.blankAnswers)}</p></div>`);
  }

  function renderTable(lesson, slide, index) {
    const cell = (value) => value && typeof value === 'object' ? richText(value.text, value.answers) : escapeHtml(value);
    const rows = slide.rows.map((row) => `<tr>${row.map((value, column) => column === 0 ? `<th scope="row" data-label="${escapeHtml(slide.columns[column])}">${cell(value)}</th>` : `<td data-label="${escapeHtml(slide.columns[column])}"><span>${cell(value)}</span></td>`).join('')}</tr>`).join('');
    const table = `<table class="lesson-table ${slide.columns.length === 2 ? 'lesson-table--record' : ''}"><thead><tr>${slide.columns.map((label) => `<th scope="col">${escapeHtml(label)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`;
    return standardFrame(lesson, slide, index, `<div class="table-scene ${slide.photo ? 'table-scene--photo' : ''}">${slide.photo ? photoMarkup(slide.photo, 'evidence-photo') : ''}<div class="table-copy">${slide.context ? `<p class="table-context">${escapeHtml(slide.context)}</p>` : ''}${table}${slide.conclusion ? `<p class="table-interpretation">${escapeHtml(slide.conclusion)}</p>` : ''}</div></div>`);
  }

  function renderChart(lesson, slide, index) {
    if (slide.variant) return renderConceptChart(lesson, slide, index);
    const values = slide.points.map((p) => p[1]);
    const min = slide.min || 0, max = slide.max;
    const x = (i) => 75 + i * 530 / (values.length - 1);
    const y = (v) => 315 - (v - min) * 245 / (max - min);
    const axes = slide.ticks.map((v) => `<g><line x1="75" y1="${y(v)}" x2="605" y2="${y(v)}" class="chart-grid"/><text x="60" y="${y(v) + 6}" text-anchor="end">${v}</text></g>`).join('');
    const labels = slide.points.map(([date, value], i) => `<g><circle cx="${x(i)}" cy="${y(value)}" r="5"/><text x="${x(i)}" y="${y(value) - 15}" text-anchor="middle" class="chart-value">${value.toFixed(2)}</text><text x="${x(i)}" y="350" text-anchor="middle">${escapeHtml(date)}</text></g>`).join('');
    const line = values.map((value, i) => `${i ? 'L' : 'M'} ${x(i)} ${y(value)}`).join(' ');
    return standardFrame(lesson, slide, index, `<div class="chart-scene">${photoMarkup(slide.photo, 'evidence-photo')}<div class="chart-copy"><p class="table-context">${escapeHtml(slide.context)}</p><svg viewBox="0 0 675 370" role="img" aria-label="${escapeHtml(slide.alt)}"><text x="75" y="28">${escapeHtml(slide.unit)}</text>${axes}<path d="${line}" class="chart-series"/>${labels}</svg><p class="table-interpretation">${escapeHtml(slide.conclusion)}</p></div></div>`);
  }

  function renderConceptChart(lesson, slide, index) {
    const amount = value => '¥' + value.toLocaleString('en-GB', { maximumFractionDigits: 2 });
    const future = (principal, rate, year) => principal * (1 + rate) ** year;
    const legend = (tone, text) => `<span><i class="chart-key chart-key--${escapeHtml(tone)}"></i>${escapeHtml(text)}</span>`;
    if (slide.variant === 'future-timeline') {
      const stages = slide.years.map((year, i) => {
        const value = future(slide.principal, slide.rate, year);
        return `<article class="timeline-stage ${i === slide.years.length - 1 ? 'timeline-stage--end' : ''}">${i ? `<div class="timeline-link"><span>× ${(1 + slide.rate).toFixed(2)}</span><b aria-hidden="true">→</b></div>` : ''}<span class="timeline-year">${year ? `End of year ${year}` : 'Today'}</span><strong>${amount(value)}</strong><span class="timeline-meaning">${year ? `${amount(value - slide.principal)} accumulated growth` : 'Starting money'}</span>${i === slide.years.length - 1 ? `<p>Goal: ${amount(slide.target)}<br>${amount(value - slide.target)} above the goal</p>` : ''}</article>`;
      }).join('');
      return standardFrame(lesson, slide, index, `<div class="concept-chart concept-chart--timeline"><p class="chart-context">${escapeHtml(slide.context)}</p><div class="future-timeline">${stages}</div></div>`);
    }
    const left = 85, right = 920, top = 40, bottom = 310;
    const y = value => bottom - (value - (slide.min || 0)) * (bottom - top) / (slide.max - (slide.min || 0));
    const axes = slide.ticks.map(v => `<g class="concept-axis"><line x1="${left}" y1="${y(v)}" x2="${right}" y2="${y(v)}"/><text x="${left - 14}" y="${y(v) + 6}" text-anchor="end">${v.toLocaleString('en-GB')}</text></g>`).join('');
    let drawing = '', key = '', alt = '';
    if (slide.variant === 'growth-bars') {
      key = legend('forest', 'Original money') + legend('copper', 'Accumulated returns');
      alt = 'Balance in yuan. ';
      drawing = slide.years.map((year,i) => {
        const value = future(slide.principal, slide.rate, year);
        const prior = year ? future(slide.principal, slide.rate, year - 1) : slide.principal;
        const x = left + 75 + i * (right - left - 150) / (slide.years.length - 1);
        alt += `Year ${year}: ${amount(value)}. `;
        return `<g class="growth-stage"><rect class="bar-principal" x="${x - 54}" y="${y(slide.principal)}" width="108" height="${bottom - y(slide.principal)}"/><rect class="bar-growth" x="${x - 54}" y="${y(value)}" width="108" height="${y(slide.principal) - y(value)}"/><text class="concept-value" x="${x}" y="${y(value) - 14}" text-anchor="middle">${amount(value)}</text><text x="${x}" y="341" text-anchor="middle">${year ? `Year ${year}` : 'Start'}</text>${slide.intervalLabels !== false && year ? `<text class="bar-increment" x="${x}" y="370" text-anchor="middle">+${amount(value - prior)} this year</text>` : ''}</g>`;
      }).join('');
    } else if (slide.variant === 'scenario-bars') {
      key = legend('muted', `Same starting amount: ${amount(slide.principal)}`);
      alt = 'Illustrative one-year outcomes. ';
      drawing = `<line class="starting-reference" x1="${left}" y1="${y(slide.principal)}" x2="${right}" y2="${y(slide.principal)}"/>` + slide.rates.map((rate,i) => {
        const value = future(slide.principal, rate, 1), x = 230 + i * 265;
        alt += `${rate * 100}%: ${amount(value)}. `;
        return `<g class="scenario-stage"><rect class="${rate < 0 ? 'bar-loss' : 'bar-principal'}" x="${x - 62}" y="${y(value)}" width="124" height="${bottom - y(value)}"/><text class="concept-value" x="${x}" y="${y(value) - 16}" text-anchor="middle">${amount(value)}</text><text x="${x}" y="344" text-anchor="middle">${rate < 0 ? '−' : '+'}${Math.abs(rate * 100)}% return</text></g>`;
      }).join('');
    } else if (slide.variant === 'comparison-lines') {
      const firstYear = slide.years[0], lastYear = slide.years.at(-1);
      const x = i => left + (slide.years[i] - firstYear) * (right - left) / (lastYear - firstYear);
      alt = 'Value in yuan across years. ';
      key = slide.series.map(series => legend(series.tone, `${series.label}: ${amount(series.values.at(-1))}`)).join('');
      drawing = slide.series.map(series => {
        alt += `${series.label}: ${series.values.map((v,i) => `year ${slide.years[i]} ${amount(v)}`).join(', ')}. `;
        const path = series.values.map((v,i) => `${i ? 'L' : 'M'} ${x(i)} ${y(v)}`).join(' ');
        return `<g class="concept-series concept-series--${escapeHtml(series.tone)}"><path d="${path}"/>${series.values.map((v,i) => `<circle cx="${x(i)}" cy="${y(v)}" r="5"/>`).join('')}</g>`;
      }).join('') + slide.years.map((year,i) => `<text x="${x(i)}" y="344" text-anchor="middle">${year}</text>`).join('') + '<text x="500" y="377" text-anchor="middle">Years</text>';
    } else {
      throw new Error(`Unknown concept-chart variant: ${slide.variant}`);
    }
    return standardFrame(lesson, slide, index, `<div class="concept-chart"><p class="chart-context">${escapeHtml(slide.context)}</p><div class="concept-legend">${key}</div><svg viewBox="0 0 1000 390" role="img" aria-label="${escapeHtml(alt)}"><text class="axis-unit" x="12" y="24">Yuan (¥)</text>${axes}${drawing}</svg>${slide.conclusion ? `<p class="chart-reading">${escapeHtml(slide.conclusion)}</p>` : ''}</div>`);
  }

  function renderSlide(lesson, slide, index) {
    const renderers = {
      hero: () => renderHero(slide, index),
      discussion: () => renderDiscussion(lesson, slide, index),
      objectives: () => renderObjectives(lesson, slide, index),
      recall: () => renderRecall(lesson, slide, index),
      section: () => renderSection(slide, index),
      visual: () => renderVisual(slide, index),
      definition: () => renderDefinition(lesson, slide, index),
      three: () => renderThree(lesson, slide, index),
      components: () => renderComponents(lesson, slide, index),
      assetReturns: () => renderAssetReturns(lesson, slide, index),
      classify: () => renderClassify(lesson, slide, index),
      flow: () => renderFlow(lesson, slide, index),
      mcq: () => renderMcq(lesson, slide, index),
      method: () => renderMethod(lesson, slide, index),
      worked: () => renderWorked(lesson, slide, index),
      practice: () => renderPractice(lesson, slide, index),
      yesno: () => renderYesNo(lesson, slide, index),
      compare: () => renderCompare(lesson, slide, index),
      case: () => renderCase(lesson, slide, index),
      record: () => renderRecord(lesson, slide, index),
      short: () => renderShort(lesson, slide, index),
      exit: () => renderExit(lesson, slide, index),
      table: () => renderTable(lesson, slide, index),
      chart: () => renderChart(lesson, slide, index),
    };
    if (!renderers[slide.kind]) throw new Error(`Unknown slide kind: ${slide.kind}`);
    return renderers[slide.kind]();
  }

  const partialRevealSelectors = {
    discussion: ['.hook-period'],
    objectives: ['.objective-row'],
    components: ['.component-card'],
    assetReturns: ['.asset-return-card'],
    three: ['.market-card', '.form-card'],
    worked: ['.worked-grid > aside', '.worked-grid > main > .worked-calculation-step', '.worked-grid > main > .worked-conclusion'],
    visual: ['.visual-compare-card', '.visual-comparison > p'],
    case: ['.case-card'],
    record: ['.record-card', '.record-proof', '.record-photo'],
  };

  function setupPartialReveals(renderedSlides, slides) {
    renderedSlides.forEach((slideElement, slideIndex) => {
      const slide = slides[slideIndex];
      if (!slide?.partialReveal) return;
      const selectors = Array.isArray(slide.partialReveal)
        ? slide.partialReveal
        : partialRevealSelectors[slide.kind];
      if (!Array.isArray(selectors) || !selectors.length) return;
      const items = [...slideElement.querySelectorAll(selectors.join(','))];
      if (!items.length) return;
      slideElement.classList.add('has-partials');
      items.forEach((item) => {
        item.classList.add('partial-item');
        item.setAttribute('aria-hidden', 'true');
      });
    });
  }

  function setupInteractiveAnswers(root) {
    root.querySelectorAll('.blank-answer').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const revealed = button.classList.toggle('is-revealed');
        button.setAttribute('aria-expanded', String(revealed));
        button.setAttribute('aria-label', revealed ? `Answer: ${button.dataset.answer}` : 'Reveal answer');
        const slide = button.closest('.slide');
        const conclusion = slide?.querySelector('[data-group-conclusion]');
        if (conclusion) {
          const blanks = [...slide.querySelectorAll('.blank-answer')];
          conclusion.hidden = !blanks.every((blank) => blank.classList.contains('is-revealed'));
        }
      });
    });

    root.querySelectorAll('.inline-reveal').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const revealed = button.classList.toggle('is-revealed');
        button.setAttribute('aria-expanded', String(revealed));
        button.querySelector('strong')?.setAttribute('aria-hidden', String(!revealed));
      });
    });

    root.querySelectorAll('.mcq-grid[data-answer]').forEach((grid) => {
      const answer = Number(grid.dataset.answer);
      const options = [...grid.querySelectorAll('.mcq-option')];
      if (!Number.isInteger(answer) || !options[answer]) return;
      options.forEach((option, selectedIndex) => {
        option.addEventListener('click', (event) => {
          event.stopPropagation();
          options.forEach((item) => {
            item.classList.remove('is-selected', 'is-correct', 'is-incorrect');
            item.setAttribute('aria-pressed', 'false');
          });
          option.classList.add('is-selected');
          option.setAttribute('aria-pressed', 'true');
          options[answer].classList.add('is-correct');
          if (selectedIndex !== answer) option.classList.add('is-incorrect');
          const feedback = grid.parentElement?.querySelector('.mcq-feedback');
          if (feedback) {
            feedback.textContent = `${selectedIndex === answer ? 'Correct.' : 'Not yet.'} ${feedback.dataset.explanation}`;
            feedback.hidden = false;
            feedback.classList.remove('is-visible');
            requestAnimationFrame(() => feedback.classList.add('is-visible'));
          }
        });
      });
    });
  }

  function notesSources(lesson, slide) {
    const sources = [];
    if (slide.photo) sources.push({ label: `Image: ${slide.photo.credit}`, href: slide.photo.source });
    for (const side of [slide.left, slide.right]) {
      if (side?.photo) sources.push({ label: `Image: ${side.photo.credit}`, href: side.photo.source });
    }
    for (const items of [slide.items, slide.periods]) {
      if (!Array.isArray(items)) continue;
      items.forEach((item) => {
        if (item?.photo) sources.push({ label: `Image: ${item.photo.credit}`, href: item.photo.source });
      });
    }
    if (Array.isArray(slide.sources)) sources.push(...slide.sources);
    if (!sources.length) return `<span>Lesson source: ${escapeHtml(lesson.meta.source)}</span>`;
    return sources.map((source) => {
      const label = escapeHtml(source.label || source.ref || 'Source');
      return source.href
        ? `<a href="${escapeHtml(source.href)}" target="_blank" rel="noreferrer">${label}</a>`
        : `<span>${label}</span>`;
    }).join('<br>');
  }

  function mount(lesson) {
    if (!lesson || !Array.isArray(lesson.slides)) throw new Error('A lesson with slides is required.');
    const deck = document.querySelector('#deck');
    const controls = document.querySelector('.deck-controls');
    let navigation;
    const previous = document.querySelector('#previousSlide');
    const next = document.querySelector('#nextSlide');
    const status = document.querySelector('#slideStatus');
    const overviewDialog = document.querySelector('#overviewDialog');
    const notesPanel = document.querySelector('#notesPanel');
    const notesText = document.querySelector('#notesText');
    const notesSource = document.querySelector('#notesSource');
    let current = Math.max(0, Math.min(lesson.slides.length - 1, Number(location.hash.slice(1)) - 1 || 0));
    const partialProgress = lesson.slides.map(() => 0);

    deck.innerHTML = lesson.slides.map((slide, index) => renderSlide(lesson, slide, index)).join('');
    const renderedSlides = [...deck.querySelectorAll('.slide')];

    setupPartialReveals(renderedSlides, lesson.slides);
    setupInteractiveAnswers(deck);

    function syncPartials(index) {
      const items = [...renderedSlides[index].querySelectorAll('.partial-item')];
      items.forEach((item, itemIndex) => {
        const visible = itemIndex < partialProgress[index];
        item.classList.toggle('is-visible', visible);
        item.setAttribute('aria-hidden', String(!visible));
      });
    }

    function revealNextPartial() {
      const total = renderedSlides[current].querySelectorAll('.partial-item').length;
      if (partialProgress[current] >= total) return false;
      partialProgress[current] += 1;
      syncPartials(current);
      previous.disabled = current === 0 && partialProgress[current] === 0;
      next.disabled = current === lesson.slides.length - 1 && partialProgress[current] >= renderedSlides[current].querySelectorAll('.partial-item').length;
      return true;
    }

    function hidePreviousPartial() {
      if (partialProgress[current] <= 0) return false;
      partialProgress[current] -= 1;
      syncPartials(current);
      previous.disabled = current === 0 && partialProgress[current] === 0;
      next.disabled = current === lesson.slides.length - 1 && partialProgress[current] >= renderedSlides[current].querySelectorAll('.partial-item').length;
      return true;
    }

    function show(index) {
      current = Math.max(0, Math.min(lesson.slides.length - 1, index));
      renderedSlides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === current;
        slide.hidden = !isActive;
        slide.classList.toggle('is-active', isActive);
      });
      previous.disabled = current === 0 && partialProgress[current] === 0;
      next.disabled = current === lesson.slides.length - 1 && partialProgress[current] >= renderedSlides[current].querySelectorAll('.partial-item').length;
      status.textContent = `${current + 1} / ${lesson.slides.length}`;
      const active = lesson.slides[current];
      notesText.textContent = active.note || 'No teacher note for this slide.';
      notesSource.innerHTML = notesSources(lesson, active);
      history.replaceState(null, '', `#${current + 1}`);
      renderedSlides[current].scrollTop = 0;
      syncPartials(current);
      document.title = `${current + 1}. ${active.title || 'Visual pause'} · ${lesson.meta.title}`;
    }

    function toggleOverview(force) {
      navigation?.toggleOverview(force);
    }

    function toggleNotes(force) {
      const shouldOpen = typeof force === 'boolean' ? force : notesPanel.getAttribute('aria-hidden') === 'true';
      notesPanel.setAttribute('aria-hidden', String(!shouldOpen));
    }

    const selectorButton = document.querySelector('#studentSelectorButton');
    const studentSelector = selectorButton && global.LessonStudentSelector?.attach({
      button: selectorButton,
      courseLabel: 'INVESTMENT & FINANCE',
      beforeOpen: () => { toggleOverview(false); toggleNotes(false); },
      getContext: () => ({
        content_id: global.OHPlatform?.content?.id || lesson.meta.code || null,
        learning_assignment_id: new URLSearchParams(location.search).get('assignment')
      })
    });

    previous.addEventListener('click', () => {
      if (!hidePreviousPartial()) show(current - 1);
    });
    next.addEventListener('click', () => {
      if (!revealNextPartial()) show(current + 1);
    });
    document.querySelector('#overviewButton').addEventListener('click', () => toggleOverview(true));
    document.querySelector('#closeOverview').addEventListener('click', () => toggleOverview(false));
    document.querySelector('#notesButton').addEventListener('click', () => toggleNotes());
    document.querySelector('#closeNotes').addEventListener('click', () => toggleNotes(false));
    document.querySelector('#fullscreenButton').addEventListener('click', async () => {
      try {
        if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
        else await document.exitFullscreen();
      } catch {
        document.querySelector('#fullscreenButton').textContent = 'Use browser F11';
      }
    });
    deck.addEventListener('click', (event) => {
      if (event.target.closest('a, button, summary, details')) return;
      if (!revealNextPartial()) show(current + 1);
    });
    addEventListener('hashchange', () => show(Number(location.hash.slice(1)) - 1 || 0));
    addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const editing = event.target.closest('input,textarea,select,[contenteditable="true"]');
      if (studentSelector?.isOpen) {
        if (event.key.toLowerCase() === 's' && !editing) { event.preventDefault(); studentSelector.close(); }
        return;
      }
      if (editing) return;
      if (event.target.closest('button,a,summary') && [' ', 'Enter'].includes(event.key)) return;
      if (overviewDialog.open) return;
      if (event.key.toLowerCase() === 's' && !overviewDialog.open) { event.preventDefault(); studentSelector?.toggle(); return; }
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        if (!revealNextPartial()) show(current + 1);
      }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        if (!hidePreviousPartial()) show(current - 1);
      }
      if (event.key === 'Home') show(0);
      if (event.key === 'End') show(lesson.slides.length - 1);
      if (event.key.toLowerCase() === 'o') { event.preventDefault(); toggleOverview(); }
      if (event.key.toLowerCase() === 'n') toggleNotes();
      if (event.key.toLowerCase() === 'f') document.querySelector('#fullscreenButton').click();
    });

    show(current);
    loadLessonNavigation().then(api => {
      navigation = api.mount({ controls, slides: lesson.slides, getCurrent: () => current, show, previous, next, status,
        title: lesson.meta.title, dialog: overviewDialog,
        overviewButton: document.querySelector('#overviewButton'), selector: selectorButton,
        tools: [document.querySelector('#notesButton'), document.querySelector('#fullscreenButton')],
        links: [{ label: 'Investment course', href: new URL('../../investment-analysis/index.html', navigationAssetUrl).href }],
        beforeOverview: () => toggleNotes(false)
      });
    }).catch(error => console.error('Lesson navigation could not load', error));
  }

  global.InvestmentPresentation = { mount };
}(window));
