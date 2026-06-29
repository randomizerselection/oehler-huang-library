(function () {
  window.INVEST = window.INVEST || {};

  const INVEST = window.INVEST;
  const interactiveSelector = 'a, button, input, textarea, select, label, summary, details, .sourcePanel, .sourceList, .invOverview';

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function html(value) {
    return String(value ?? '');
  }

  function photoStyle(photo) {
    return photo?.objectPosition ? ` style="--photo-position:${escapeHtml(photo.objectPosition)}"` : '';
  }

  function backgroundStyle(photo) {
    if (!photo?.src) return '';
    const resolvedSrc = new URL(photo.src, window.location.href).href;
    return ` style="--hero-photo:url('${escapeHtml(resolvedSrc)}');--photo-position:${escapeHtml(photo.objectPosition || 'center')}"`;
  }

  function photoMarkup(photo, className = 'invPhotoFull') {
    if (!photo?.src) return '';
    return `
      <figure class="invPhotoFigure ${escapeHtml(className)}"${photoStyle(photo)}>
        <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || '')}" loading="eager" />
        <figcaption class="invPhotoCaption">
          <span>${escapeHtml(photo.caption || photo.alt || '')}</span>
          ${photo.credit ? `<span class="photoCredit">${escapeHtml(photo.credit)}</span>` : ''}
        </figcaption>
      </figure>`;
  }

  function sourceMarkup(sources) {
    if (!sources || !sources.length) return '';
    return `
      <details class="sourceList">
        <summary>Sources</summary>
        <div class="sourcePanel">
          ${sources.map((source) => `
            <article>
              <h3>${escapeHtml(source.label || 'Source')}</h3>
              ${source.ref ? `<p><strong>Ref:</strong> ${escapeHtml(source.ref)}</p>` : ''}
              ${source.note ? `<p>${escapeHtml(source.note)}</p>` : ''}
              ${source.date ? `<p><strong>Date:</strong> ${escapeHtml(source.date)}</p>` : ''}
              ${source.url ? `<p><a href="${escapeHtml(source.url)}">${escapeHtml(source.url)}</a></p>` : ''}
            </article>
          `).join('')}
        </div>
      </details>`;
  }

  function blankMarkup(answer) {
    const answerText = String(answer ?? '');
    const width = Math.max(4, Math.min(16, answerText.length + 2));
    return `<span class="blank invReveal" data-answer="${escapeHtml(answerText)}" style="--blank-width:${width}ch"><span class="invBlankText">${escapeHtml(answerText)}</span></span>`;
  }

  function fillBlankMarkup(template, answer) {
    return escapeHtml(template).replace(/__________([.,!?%]*)/g, (_match, punctuation = '') => {
      const slot = blankMarkup(answer);
      if (!punctuation) return slot;
      return `<span class="invBlankGroup">${slot}<span class="invBlankPunctuation">${escapeHtml(punctuation)}</span></span>`;
    });
  }

  function slideShell(slide, index, lesson, body, extraClass = '', backgroundPhoto = null, options = {}) {
    const sources = slide.sources || lesson.meta?.sources || lesson.sources || [];
    const className = ['invSlide', extraClass].filter(Boolean).join(' ');
    return `
      <section class="${escapeHtml(className)}" data-idx="${index}" data-type="${escapeHtml(slide.type)}" aria-label="${escapeHtml(slide.title || `Slide ${index + 1}`)}"${backgroundStyle(backgroundPhoto)}>
        <header class="invSlideHeader">
          <div class="invTitleBlock">
            ${slide.eyebrow ? `<div class="invEyebrow">${escapeHtml(slide.eyebrow)}</div>` : ''}
            ${slide.title && !options.hideTitle ? `<h1>${html(slide.title)}</h1>` : ''}
            ${slide.zhTitle ? `<div class="invZhTitle" lang="zh-Hans">${escapeHtml(slide.zhTitle)}</div>` : ''}
            ${slide.subtitle ? `<p class="invLead">${html(slide.subtitle)}</p>` : ''}
            ${slide.kicker ? `<p class="invHeroKicker">${escapeHtml(slide.kicker)}</p>` : ''}
          </div>
          ${sourceMarkup(sources)}
        </header>
        <div class="invSlideBody">${body}</div>
        <footer class="invSlideFooter">
          ${slide.sourceStamp ? `<div class="invSourceStamp">${escapeHtml(slide.sourceStamp)}</div>` : ''}
        </footer>
      </section>`;
  }

  function renderHero(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const hasMarketCard = Boolean(slide.ticker || (slide.metrics || []).length);
    const titleOnly = !hasMarketCard && !slide.question;
    const metrics = (slide.metrics || []).slice(0, 3).map((metric) => `
      <div class="invMetric">
        <strong>${escapeHtml(metric.label)}</strong>
        <span class="invMetricValue">${escapeHtml(metric.value)}</span>
      </div>
    `).join('');

    if (titleOnly) {
      return slideShell(slide, index, lesson, '', 'invHeroSlide invTitleOnlySlide', photo);
    }

    const body = `
      <div class="invHeroGrid ${hasMarketCard ? '' : 'is-titleOnly'}">
        <div class="invPanel">
          ${slide.ticker ? `<span class="invTicker">${escapeHtml(slide.ticker)}</span>` : ''}
          ${slide.question || slide.kicker ? `<div class="invBigQuestion">${html(slide.question || slide.kicker)}</div>` : ''}
          ${slide.questionZh ? `<p class="invPromptZh" lang="zh-Hans">${escapeHtml(slide.questionZh)}</p>` : ''}
          ${photo?.credit ? `<div class="invHeroPhotoCredit">${escapeHtml(photo.caption || photo.alt || '')} · ${escapeHtml(photo.credit)}</div>` : ''}
        </div>
        ${hasMarketCard ? `<div class="invMarketCard">
          <div class="invTickerStrip" aria-label="Market snapshot">
            <span>Company</span>
            <span>Code</span>
            <span>Market</span>
          </div>
          <div class="invMetricGrid">${metrics}</div>
        </div>` : ''}
      </div>`;

    return slideShell(slide, index, lesson, body, 'invHeroSlide', photo);
  }

  function renderOutcomes(slide, index, lesson) {
    const body = `
      <div class="invObjectiveGrid">
        ${(slide.bullets || []).map((bullet, i) => `
          <div class="invObjective">
            <strong>${escapeHtml(bullet)}</strong>
            <span class="invObjectiveZh" lang="zh-Hans">${escapeHtml((slide.zhBullets || [])[i] || '')}</span>
          </div>
        `).join('')}
      </div>`;
    return slideShell(slide, index, lesson, body);
  }

  function renderSection(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const parts = slide.parts || [];
    const currentPartIndex = parts.findIndex((part) => part.current);
    const roadmap = currentPartIndex >= 0 ? parts.slice(currentPartIndex + 1) : parts.filter((part) => !part.current);
    const sectionDeck = `
      <div class="invSectionDeck">
        <div>
          <div class="invSectionNumber">${escapeHtml(slide.part || index)}</div>
          <div class="invEyebrow">${escapeHtml(slide.kicker || 'Lesson map')}</div>
        </div>
        <div>
          <p class="invLead">${html(slide.prompt || '')}</p>
          ${roadmap.length ? `<div class="invSectionList">
            ${roadmap.map((part) => `<span>${escapeHtml(part.label || part)}</span>`).join('')}
          </div>` : ''}
        </div>
      </div>`;
    const body = photo?.src ? `
      <div class="invTwoColumn">
        ${sectionDeck}
        ${photo?.src ? `<div class="invPhotoColumn">${photoMarkup(photo)}</div>` : ''}
      </div>` : sectionDeck;
    return slideShell(slide, index, lesson, body, 'invSectionSlide');
  }

  function renderVisualPause(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    if (photo?.src) {
      return `
        <section class="invSlide invVisualPauseSlide" data-idx="${index}" data-type="${escapeHtml(slide.type)}" aria-label="${escapeHtml(slide.title || `Slide ${index + 1}`)}">
          <div class="invVisualPauseHero"${photoStyle(photo)}>
            <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || '')}" loading="eager" />
            <div class="invVisualPauseText">
              ${slide.eyebrow ? `<div class="invEyebrow">${escapeHtml(slide.eyebrow)}</div>` : ''}
              ${slide.title ? `<h1>${html(slide.title)}</h1>` : ''}
              ${slide.zhTitle ? `<p lang="zh-Hans">${escapeHtml(slide.zhTitle)}</p>` : ''}
              <p>${escapeHtml(photo.caption || photo.alt || '')}${photo.credit ? ` · ${escapeHtml(photo.credit)}` : ''}</p>
            </div>
          </div>
        </section>`;
    }
    const body = `
      <div class="invPanel">
        <div class="invBigQuestion">${html(slide.title || '')}</div>
        ${slide.zhTitle ? `<p class="invPromptZh" lang="zh-Hans">${escapeHtml(slide.zhTitle)}</p>` : ''}
        <div class="invTickerStrip" aria-label="Listed company examples">
          ${(slide.visual?.rows || []).map((row) => `
            <span>${escapeHtml(row.company)} · ${escapeHtml(row.code)} · ${escapeHtml(row.signal)}</span>
          `).join('')}
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body);
  }

  function renderDiscussion(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const body = `
      <div class="invDiscussionStack">
        <div class="invPanel">
          <div class="invBigQuestion">${html(slide.question || slide.prompt || '')}</div>
          ${slide.zh ? `<p class="invPromptZh" lang="zh-Hans">${escapeHtml(slide.zh)}</p>` : ''}
        </div>
        <div class="invNotePanel invReveal">
          <strong>${escapeHtml(slide.revealTitle || 'Teacher cue')}</strong>
          <p>${html(slide.answer || slide.note || '')}</p>
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invDiscussionSlide invContextPhotoSlide', photo);
  }

  function renderTerm(slide, index, lesson) {
    const terms = (slide.keyTerms || []).map((term) => `
      <div class="invTermNote invReveal">
        <strong>${escapeHtml(term.term)}</strong>
        ${term.zh ? `<span class="invTermZh" lang="zh-Hans">${escapeHtml(term.zh)}</span>` : ''}
        ${term.note ? `<p>${escapeHtml(term.note)}</p>` : ''}
      </div>
    `).join('');
    const termBox = `
      <div class="invTermBox">
        <div>
          <div class="invTermWord">${escapeHtml(slide.term || slide.title)}</div>
          ${slide.termZh ? `<div class="invTermZh" lang="zh-Hans">${escapeHtml(slide.termZh)}</div>` : ''}
        </div>
        <div class="invTermDefinition">${html(slide.definition || '')}</div>
        ${slide.definitionZh ? `<p class="invPromptZh" lang="zh-Hans">${escapeHtml(slide.definitionZh)}</p>` : ''}
        <div class="invTermGrid">${terms}</div>
      </div>`;
    const body = termBox;
    return slideShell(slide, index, lesson, body, 'invTermSlide', null, { hideTitle: true });
  }

  function renderAnswer(slide, index, lesson) {
    const isExitTicket = /exit ticket/i.test(slide.title || '');
    const items = (slide.items || []).map((item, i) => `
      <div class="invCheckItem">
        ${isExitTicket ? `<span class="invCheckNumber">${i + 1}</span>` : ''}
        <span class="invCheckText">
          ${fillBlankMarkup(item.prompt, item.answer)}
          ${item.zh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(item.zh)}</div>` : ''}
        </span>
      </div>
    `).join('');
    const body = `<div class="invCheckList${isExitTicket ? ' invExitList' : ''}">${items}</div>`;
    return slideShell(slide, index, lesson, body, isExitTicket ? 'invAnswerSlide invExitTicketSlide' : 'invAnswerSlide');
  }

  function renderFlow(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const steps = (slide.steps || []).map((step, i) => `
      <div class="invStep">
        <span class="invStepNum">${i + 1}</span>
        <strong>${fillBlankMarkup(step.text, step.answer)}</strong>
      </div>
    `).join('');
    const body = `<div class="invFlow">${steps}</div>`;
    return slideShell(slide, index, lesson, body, 'invFlowSlide invContextPhotoSlide', photo);
  }

  function renderDataSnapshot(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const focus = (slide.focusMetrics || []).map((metric) => `
      <div class="invDataFocusCard">
        <span>${escapeHtml(metric.label)}</span>
        <strong>${escapeHtml(metric.value)}</strong>
      </div>
    `).join('');
    const body = `
      <div class="invDataSimple">
        ${focus ? `<div class="invDataFocus">${focus}</div>` : ''}
        <div class="invDataPrompt">
          <p>${escapeHtml(slide.note || 'Use the source, date and key figures before making a judgement.')}</p>
          <div class="invDataTask">
            <strong>Student task</strong>
            <span>Find the stock code, the source date, and one performance number before judging the share.</span>
          </div>
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invDataSnapshotSlide invContextPhotoSlide', photo);
  }

  function renderAnalystBoard(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const blocks = (slide.blocks || []).slice(0, 3).map((block) => `
      <div class="invEvidence">
        <span class="invEyebrow">${escapeHtml(block.label)}</span>
        <strong>${escapeHtml(block.title)}</strong>
        <p>${escapeHtml(block.body)}</p>
        ${block.zh ? `<p class="invZhLine" lang="zh-Hans">${escapeHtml(block.zh)}</p>` : ''}
      </div>
    `).join('');
    const body = `
      <div>
        <div class="invEvidenceGrid">${blocks}</div>
        ${slide.prompt ? `<div class="invFocusPrompt invReveal">${escapeHtml(slide.prompt)}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, 'invAnalystBoardSlide invContextPhotoSlide', photo);
  }

  function renderCalculationDesk(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const body = `
      <div>
        <div class="invCalcBox">
          ${slide.formula ? `<div class="invFormula">${escapeHtml(slide.formula)}</div>` : ''}
          ${slide.worked ? `<div class="invWorked"><strong>Worked example</strong><br>${html(slide.worked)}${slide.workedZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.workedZh)}</div>` : ''}</div>` : ''}
          ${slide.prompt ? `<div class="invTryIt"><strong>Try it</strong><br>${html(slide.prompt)}${slide.promptZh ? `<div class="invZhLine" lang="zh-Hans">${escapeHtml(slide.promptZh)}</div>` : ''}</div>` : ''}
          ${slide.answer ? `<div class="invNotePanel invReveal"><strong>Answer</strong><p>${html(slide.answer)}</p></div>` : ''}
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invCalculationDeskSlide invContextPhotoSlide', photo);
  }

  function renderRiskRegister(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const rows = (slide.table || []).slice(1).map((row) => `
      <div class="invRiskItem">
        <strong>${escapeHtml(row[0])}</strong>
        <p>${escapeHtml(row[1])}</p>
        <p><span class="invEyebrow">Likely effect</span> ${escapeHtml(row[2])}</p>
      </div>
    `).join('');
    const body = `
      <div>
        <div class="invRiskGrid">${rows}</div>
        ${slide.prompt ? `<div class="invFocusPrompt invReveal"><strong>${escapeHtml(slide.prompt)}</strong> ${escapeHtml(slide.answer || '')}</div>` : ''}
      </div>`;
    return slideShell(slide, index, lesson, body, 'invRiskRegisterSlide invContextPhotoSlide', photo);
  }

  function renderPeerTask(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const steps = (slide.steps || []).map((step, i) => `
      <div class="invStep">
        <span class="invStepNum">${i + 1}</span>
        <strong>${html(step)}</strong>
      </div>
    `).join('');
    const body = `
      <div>
        <div class="invPeerBox">
          <div class="invPeerSteps">${steps}</div>
          ${slide.sampleAnswer ? `<div class="invNotePanel invReveal"><strong>Sample answer</strong><p>${html(slide.sampleAnswer)}</p></div>` : ''}
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invPeerTaskSlide', photo);
  }

  function renderQuiz(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const choices = (slide.choices || []).map((choice, i) => `
      <button class="invChoice" type="button" data-choice="${i}">${escapeHtml(choice)}</button>
    `).join('');
    const body = `
      <div>
        <div class="invPanel">
          <div class="invBigQuestion">${html(slide.question || '')}</div>
          <div class="invQuizChoices">${choices}</div>
          <div class="invQuizFeedback" hidden>${html(slide.explanation || '')}</div>
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invQuizSlide invContextPhotoSlide', photo);
  }

  function renderExam(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const keywords = (slide.keywords || []).map((keyword) => `<span class="invKeyword">${escapeHtml(keyword)}</span>`).join('');
    const body = `
      <div>
        <div class="invExamBox">
          ${slide.prompt ? `<h3>${html(slide.prompt)}</h3>` : ''}
          <div class="invExamKeywords">${keywords}</div>
          ${slide.zh ? `<p class="invPromptZh" lang="zh-Hans">${escapeHtml(slide.zh)}</p>` : ''}
        </div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invExamSlide invContextPhotoSlide', photo);
  }

  function renderModelAnswer(slide, index, lesson) {
    const photo = slide.visual || slide.photo;
    const paragraphs = (slide.paragraphs || []).map((paragraph) => `<p class="invReveal">${html(paragraph)}</p>`).join('');
    const body = `
      <div class="invModelFrame">
        <div class="invModelCue">
          <strong>Answer focus</strong>
          <span>Two developed points: one about profit, one about price and risk.</span>
        </div>
        <div class="invModelParas">${paragraphs}</div>
      </div>`;
    return slideShell(slide, index, lesson, body, 'invModelAnswerSlide invContextPhotoSlide', photo);
  }

  const renderers = {
    hero: renderHero,
    marketBrief: renderHero,
    outcomes: renderOutcomes,
    section: renderSection,
    visualPause: renderVisualPause,
    discussion: renderDiscussion,
    term: renderTerm,
    answer: renderAnswer,
    flow: renderFlow,
    dataSnapshot: renderDataSnapshot,
    analystBoard: renderAnalystBoard,
    calculationDesk: renderCalculationDesk,
    riskRegister: renderRiskRegister,
    peerTask: renderPeerTask,
    quiz: renderQuiz,
    exam: renderExam,
    modelAnswer: renderModelAnswer,
  };

  function renderSlide(slide, index, lesson) {
    const renderer = renderers[slide.type] || renderDiscussion;
    return renderer(slide, index, lesson);
  }

  function mountLesson(lesson, target = document.body) {
    if (!lesson) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'quiz' && INVEST.quiz && typeof INVEST.mountQuiz === 'function') {
      document.body.classList.remove('investment-deck');
      document.body.classList.add('investment-quiz');
      INVEST.mountQuiz(INVEST.quiz, target);
      return;
    }

    document.body.classList.add('investment-deck');
    const slides = lesson.slides || [];
    const title = lesson.meta?.lessonLabel || lesson.title || 'Investment Analysis';
    target.innerHTML = `
      <main class="invApp">
        <header class="invTopbar">
          <div class="invBrand"><span class="invDot"></span><span>${escapeHtml(lesson.meta?.courseLabel || 'Investment Analysis')}</span></div>
          <nav class="invModeTabs" aria-label="Lesson views">
            <a href="${escapeHtml(location.pathname)}" aria-current="page">Slides</a>
            <a href="${escapeHtml(location.pathname)}?view=quiz">Quiz</a>
            <a href="../../index.html">Course</a>
            <a href="../../../index.html">Library</a>
          </nav>
          <div class="invControls">
            <button class="invButton" type="button" data-action="notes">Notes</button>
            <button class="invButton" type="button" data-action="overview">Overview</button>
          </div>
        </header>
        <div class="invDeckStage">${slides.map((slide, index) => renderSlide(slide, index, lesson)).join('')}</div>
        <footer class="invFooter">
          <span class="invCounter"></span>
          <div class="invProgressTrack" aria-hidden="true"><div class="invProgressFill"></div></div>
          <span class="invProgressText">${escapeHtml(title)}</span>
        </footer>
        <aside class="invNotes" aria-live="polite"></aside>
        <div class="invOverview" role="dialog" aria-modal="true" aria-label="Slide overview">
          <div class="invOverviewPanel">
            <h2>Slide overview</h2>
            <div class="invOverviewGrid">
              ${slides.map((slide, index) => `<button class="invOverviewItem" type="button" data-jump="${index}"><strong>${index + 1}</strong><br>${escapeHtml(slide.title || slide.type)}</button>`).join('')}
            </div>
          </div>
        </div>
      </main>`;

    const state = {
      index: hashIndex(slides.length),
      slides: [...document.querySelectorAll('.invSlide')],
      notesVisible: false,
    };

    function activeSlide() {
      return state.slides[state.index];
    }

    function hashIndex(count) {
      const raw = Number(String(window.location.hash || '').replace('#', ''));
      if (Number.isFinite(raw) && raw >= 1 && raw <= count) return raw - 1;
      return 0;
    }

    function updateNotes() {
      const notes = document.querySelector('.invNotes');
      const slide = slides[state.index];
      const body = Array.isArray(slide.notes)
        ? `<ul>${slide.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul>`
        : `<p>${escapeHtml(slide.notes || 'No teacher notes for this slide.')}</p>`;
      notes.innerHTML = `<h2>Teacher notes</h2>${body}`;
      notes.classList.toggle('is-visible', state.notesVisible);
    }

    function showSlide(index, options = {}) {
      state.index = Math.max(0, Math.min(slides.length - 1, index));
      state.slides.forEach((node, i) => {
        node.classList.toggle('is-active', i === state.index);
        if (i !== state.index && !options.keepReveals) {
          node.querySelectorAll('.invReveal.is-revealed').forEach((item) => item.classList.remove('is-revealed'));
          node.querySelectorAll('.blank.is-revealed').forEach((item) => item.classList.remove('is-revealed'));
        }
      });
      document.querySelector('.invCounter').textContent = `${state.index + 1} / ${slides.length}`;
      document.querySelector('.invProgressFill').style.width = `${((state.index + 1) / slides.length) * 100}%`;
      if (window.location.hash !== `#${state.index + 1}`) {
        history.replaceState(null, '', `#${state.index + 1}`);
      }
      updateNotes();
    }

    function revealNext() {
      const next = activeSlide()?.querySelector('.invReveal:not(.is-revealed)');
      if (!next) return false;
      next.classList.add('is-revealed');
      if (next.classList.contains('blank')) next.classList.add('is-revealed');
      return true;
    }

    function advance() {
      if (revealNext()) return;
      showSlide(state.index + 1);
    }

    function retreat() {
      showSlide(state.index - 1, { keepReveals: true });
    }

    function toggleNotes() {
      state.notesVisible = !state.notesVisible;
      updateNotes();
    }

    function toggleOverview(force) {
      const overview = document.querySelector('.invOverview');
      overview.classList.toggle('is-visible', typeof force === 'boolean' ? force : !overview.classList.contains('is-visible'));
    }

    document.querySelector('.invDeckStage').addEventListener('click', (event) => {
      if (event.target.closest(interactiveSelector)) return;
      advance();
    });

    document.querySelector('[data-action="notes"]').addEventListener('click', toggleNotes);
    document.querySelector('[data-action="overview"]').addEventListener('click', () => toggleOverview());
    document.querySelector('.invOverview').addEventListener('click', (event) => {
      const jump = event.target.closest('[data-jump]');
      if (jump) {
        showSlide(Number(jump.dataset.jump));
        toggleOverview(false);
      } else if (event.target.classList.contains('invOverview')) {
        toggleOverview(false);
      }
    });

    document.addEventListener('click', (event) => {
      const choice = event.target.closest('.invChoice');
      if (!choice) return;
      event.stopPropagation();
      const slideNode = choice.closest('.invSlide');
      const slideData = slides[Number(slideNode.dataset.idx)];
      const selected = Number(choice.dataset.choice);
      slideNode.querySelectorAll('.invChoice').forEach((button) => {
        button.classList.remove('is-selected', 'is-correct', 'is-wrong');
        const choiceIndex = Number(button.dataset.choice);
        if (choiceIndex === slideData.answer) button.classList.add('is-correct');
      });
      choice.classList.add('is-selected');
      if (selected !== slideData.answer) choice.classList.add('is-wrong');
      const feedback = slideNode.querySelector('.invQuizFeedback');
      if (feedback) feedback.hidden = false;
    });

    document.addEventListener('keydown', (event) => {
      if (event.target.closest('input, textarea, select')) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        advance();
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        retreat();
      } else if (event.key.toLowerCase() === 'n') {
        event.preventDefault();
        toggleNotes();
      } else if (event.key.toLowerCase() === 'o') {
        event.preventDefault();
        toggleOverview();
      } else if (event.key === 'Escape') {
        toggleOverview(false);
      }
    });

    window.addEventListener('hashchange', () => showSlide(hashIndex(slides.length), { keepReveals: true }));
    showSlide(state.index);
  }

  INVEST.mountLesson = mountLesson;
})();
