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
    const search = dialog.querySelector('input');
    const list = dialog.querySelector('.lesson-overview-list');
    let section = 'Opening';
    const entries = slides.map((slide, index) => {
      if ((slide.kind || slide.type) === 'section') section = slide.title || slide.eyebrow || 'Section';
      const group = slide.section || section;
      const title = slide.title || slide.term || slide.question || slide.eyebrow || ((slide.kind || slide.type) === 'visual' || slide.type === 'visualPause' ? 'Visual pause' : `Slide ${index + 1}`);
      return { index, group, title, search: `${index + 1} ${title} ${group} ${slide.id || ''} ${slide.paper || ''} ${slide.zhTitle || ''} ${slide.zh || ''}`.toLowerCase() };
    });
    function renderOverview() {
      const query = search.value.trim().toLowerCase();
      let last = null;
      list.innerHTML = entries.filter(entry => !query || entry.search.includes(query)).map(entry => {
        const heading = entry.group !== last ? `<h3>${escape(entry.group)}</h3>` : '';
        last = entry.group;
        return `${heading}<button type="button" class="lesson-overview-item${entry.index === getCurrent() ? ' is-current' : ''}" data-go="${entry.index}"${entry.index === getCurrent() ? ' aria-current="step"' : ''}><span>${String(entry.index + 1).padStart(2, '0')}</span><strong>${escape(entry.title)}</strong></button>`;
      }).join('') || '<p class="lesson-overview-empty" role="status">No slides match your search.</p>';
    }
    function toggleOverview(force) {
      const open = typeof force === 'boolean' ? force : !dialog.open;
      if (!open) { if (dialog.open) dialog.close(); return; }
      options.beforeOverview?.();
      more.open = false;
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
