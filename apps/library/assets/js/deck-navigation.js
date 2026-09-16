/* Shared classroom navigation. Renderers retain their own slide and reveal state. */
(function (global) {
  'use strict';
  const portable = !document.currentScript.src;
  const assetBase = new URL('../', document.currentScript.src || new URL('assets/js/deck-navigation.js', location.href));
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = new URL('css/deck-navigation.css', assetBase).href;
  if (!portable && ![...document.querySelectorAll('link[rel="stylesheet"]')].some(link => link.href === style.href)) document.head.append(style);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function mount(options) {
    const { controls, slides, getCurrent, show, previous, next, status, overviewButton, selector, tools = [], links = [], extras = [] } = options;
    document.body.classList.add('has-deck-navigation');
    controls.classList.add('lesson-navigation');
    controls.setAttribute('aria-label', 'Lesson navigation');
    status.classList.add('lesson-navigation-status');
    previous.classList.add('lesson-navigation-arrow');
    next.classList.add('lesson-navigation-arrow');
    overviewButton.textContent = 'Overview';
    overviewButton.title = 'Slide overview (O)';
    const more = document.createElement('details');
    more.className = 'lesson-navigation-more';
    more.innerHTML = '<summary>More</summary><div class="lesson-navigation-menu"></div>';
    const menu = more.lastElementChild;
    // A source file plus a persisted slide ID identifies a slide across title and
    // order changes. Derive paths relative to Library so localhost and live URLs agree.
    const libraryBase = new URL('../', assetBase);
    const sourceScript = [...document.scripts].find(script => /\/slides[^/]*\.js$/.test(new URL(script.src || location.href).pathname));
    const relativePath = url => decodeURIComponent(url.pathname.startsWith(libraryBase.pathname) ? url.pathname.slice(libraryBase.pathname.length) : url.pathname);
    const deckRef = sourceScript ? relativePath(new URL(sourceScript.src)) : relativePath(new URL(location.href));
    const titleOf = (slide, index) => slide.title || slide.term || slide.question || slide.prompt || slide.eyebrow || `Slide ${index + 1}`;
    const referenceOf = index => `${deckRef}#${slides[index].id || index + 1}`;
    function referenceText() {
      const index = getCurrent(), slide = slides[index];
      const url = new URL(location.href);
      // Keep explicit A-level animation steps, but omit assignment/query context.
      const step = location.hash.match(/\/(\d+)$/)?.[1];
      url.search = '';
      url.hash = `${slide.id || index + 1}${step ? `/${step}` : ''}`;
      return `${options.title}\nSlide ${index + 1}: ${titleOf(slide, index)}\nReference: ${referenceOf(index)}${step ? `\nReveal step: ${Number(step) + 1}` : ''}\n${url.href}`;
    }
    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.textContent = 'Copy slide reference';
    menu.prepend(copyButton);
    const feedback = document.createElement('span');
    feedback.className = 'lesson-reference-feedback';
    feedback.setAttribute('role', 'status');
    let feedbackTimer;
    async function copyReference() {
      const text = referenceText();
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(text);
        feedback.textContent = 'Slide reference copied';
        clearTimeout(feedbackTimer);
        feedbackTimer = setTimeout(() => { feedback.textContent = ''; }, 2200);
        overviewFeedback.textContent = 'Slide reference copied';
        status.title = 'Slide reference copied — paste it into Codex';
      } catch {
        // Local files and HTTP hosts may disallow clipboard access. Keep a
        // selectable copy in the overview rather than claiming success.
        toggleOverview(true);
        referenceField.value = text;
        referenceField.hidden = false;
        referenceField.focus();
        referenceField.select();
        overviewFeedback.textContent = 'Press Ctrl+C (or Command+C) to copy the selected reference.';
      }
    }
    copyButton.onclick = copyReference;
    status.setAttribute('role', 'button');
    status.tabIndex = 0;
    status.onclick = copyReference;
    status.addEventListener('keydown', event => {
      if (['Enter', ' '].includes(event.key)) { event.preventDefault(); event.stopPropagation(); copyReference(); }
    });
    function updateReference() {
      status.title = `Copy slide reference: ${referenceOf(getCurrent())}`;
      status.setAttribute('aria-label', `Copy slide reference, slide ${getCurrent() + 1} of ${slides.length}`);
      feedback.textContent = '';
    }
    new MutationObserver(updateReference).observe(status, { childList: true, characterData: true, subtree: true });
    updateReference();
    const libraryLink = { label: 'Library index', href: new URL('../index.html', assetBase).href };
    const destinations = new Set();
    for (const link of portable ? [] : [...links, libraryLink]) {
      const href = new URL(link.href, location.href).href;
      if (destinations.has(href)) continue;
      destinations.add(href);
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.textContent = link.label;
      menu.append(anchor);
    }
    tools.filter(Boolean).forEach(button => {
      button.classList.add('lesson-navigation-tool');
      menu.append(button);
    });
    extras.filter(Boolean).forEach(element => menu.append(element));
    const account = document.querySelector('[data-platform-account]') || document.createElement('span');
    account.dataset.platformAccount = '';
    account.classList.add('lesson-navigation-account');
    menu.append(account);
    const hide = document.createElement('button');
    hide.type = 'button';
    hide.textContent = 'Hide controls';
    hide.title = 'Move the pointer, tap, or press Tab to show controls again';
    menu.append(hide);
    controls.replaceChildren(previous, overviewButton, status, next, ...(selector ? [selector] : []), more);
    controls.append(feedback);

    let dialog = options.dialog;
    if (!dialog || dialog.tagName !== 'DIALOG') {
      const replacement = document.createElement('dialog');
      replacement.id = dialog?.id || 'overview';
      if (dialog) dialog.replaceWith(replacement); else document.body.append(replacement);
      dialog = replacement;
    }
    dialog.className = 'lesson-overview';
    dialog.setAttribute('aria-labelledby', 'lessonOverviewTitle');
    dialog.innerHTML = `<header class="lesson-overview-head"><div><p>Slide overview</p><h2 id="lessonOverviewTitle">${escape(options.title)}</h2></div><button type="button" data-close aria-label="Close overview">×</button></header><label class="lesson-overview-search">Find a slide<input type="search" id="slideSearch" placeholder="Title, section or slide number…" autocomplete="off"></label><div class="lesson-overview-list"></div>`;
    const referencePanel = document.createElement('div');
    referencePanel.className = 'lesson-overview-reference';
    referencePanel.innerHTML = '<code></code><button type="button">Copy current slide reference</button><span aria-live="polite"></span><textarea aria-label="Slide reference to copy" readonly hidden></textarea>';
    dialog.querySelector('header').after(referencePanel);
    referencePanel.querySelector('button').onclick = copyReference;
    const overviewFeedback = referencePanel.querySelector('[aria-live]');
    const referenceField = referencePanel.querySelector('textarea');
    const search = dialog.querySelector('input');
    search.placeholder = 'Title, section, slide number or ID…';
    const list = dialog.querySelector('.lesson-overview-list');
    let section = 'Opening';
    const entries = slides.map((slide, index) => {
      if ((slide.kind || slide.type) === 'section') section = slide.title || slide.eyebrow || 'Section';
      const group = slide.section || section;
      const title = titleOf(slide, index);
      return { index, group, title, search: `${index + 1} ${title} ${group} ${referenceOf(index)} ${slide.paper || ''} ${slide.zhTitle || ''} ${slide.zh || ''}`.toLowerCase() };
    });
    function renderOverview() {
      const query = search.value.trim().toLowerCase();
      const exact = entries.filter(entry => referenceOf(entry.index).toLowerCase() === query || (slides[entry.index].id && String(slides[entry.index].id).toLowerCase() === query));
      const matches = exact.length ? exact : entries.filter(entry => !query || entry.search.includes(query));
      let last = null;
      list.innerHTML = matches.map(entry => {
        const heading = entry.group !== last ? `<h3>${escape(entry.group)}</h3>` : '';
        last = entry.group;
        return `${heading}<button type="button" class="lesson-overview-item${entry.index === getCurrent() ? ' is-current' : ''}" data-go="${entry.index}"${entry.index === getCurrent() ? ' aria-current="step"' : ''}><span>${String(entry.index + 1).padStart(2, '0')}</span><strong>${escape(entry.title)}<small>${escape(slides[entry.index].id || `Slide ${entry.index + 1}`)}</small></strong></button>`;
      }).join('') || '<p class="lesson-overview-empty" role="status">No slides match your search.</p>';
    }
    function toggleOverview(force) {
      const open = typeof force === 'boolean' ? force : !dialog.open;
      if (!open) { if (dialog.open) dialog.close(); return; }
      options.beforeOverview?.();
      more.open = false;
      referencePanel.querySelector('code').textContent = referenceOf(getCurrent());
      overviewFeedback.textContent = '';
      referenceField.hidden = true;
      search.value = '';
      renderOverview();
      if (!dialog.open) dialog.showModal();
      search.focus();
      list.querySelector('[aria-current]')?.scrollIntoView({ block: 'nearest' });
    }
    search.addEventListener('input', renderOverview);
    dialog.querySelector('[data-close]').onclick = () => toggleOverview(false);
    list.onclick = event => {
      const button = event.target.closest('[data-go]');
      if (button) { show(Number(button.dataset.go)); toggleOverview(false); }
    };
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) toggleOverview(false);
    });
    // Capture prevents renderer shortcuts from changing the slide behind the modal.
    dialog.addEventListener('keydown', event => event.stopPropagation());
    dialog.addEventListener('close', () => { wake(); overviewButton.focus({ preventScroll: true }); });

    let timer;
    function wake() {
      document.body.classList.remove('presentation-idle');
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!more.open && !controls.matches(':hover') && !controls.querySelector(':focus-visible') && !document.querySelector('.studentSelectorSidePanel, .selector-overlay-host')) document.body.classList.add('presentation-idle');
      }, 2500);
    }
    hide.onclick = () => {
      more.open = false;
      hide.blur();
      clearTimeout(timer);
      document.body.classList.add('presentation-idle');
    };
    more.addEventListener('toggle', () => { if (!document.body.classList.contains('presentation-idle')) wake(); });
    more.addEventListener('keydown', event => {
      if (more.open || [' ', 'Enter'].includes(event.key)) event.stopPropagation();
      if (event.key === 'Escape') { more.open = false; more.querySelector('summary').focus(); }
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a, .lesson-navigation-tool')) more.open = false;
    });
    document.addEventListener('pointerdown', event => { if (!more.contains(event.target)) more.open = false; wake(); }, { passive: true });
    document.addEventListener('pointermove', wake, { passive: true });
    document.addEventListener('focusin', wake);
    document.addEventListener('focusout', wake);
    document.addEventListener('fullscreenchange', wake);
    document.addEventListener('keydown', event => {
      if (event.key === 'Tab') wake();
      if (event.key === 'Escape' && more.open) { more.open = false; more.querySelector('summary').focus(); }
    });
    controls.addEventListener('pointerleave', wake);
    wake();
    return { toggleOverview, renderOverview, dialog, wake };
  }
  global.LessonNavigation = { mount };
}(window));
