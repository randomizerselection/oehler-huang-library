(function (global) {
  'use strict';
  let runtimePromise;

  function loadRuntime(baseUrl) {
    if (global.StudentSelector?.mount) return Promise.resolve();
    if (runtimePromise) return runtimePromise;
    runtimePromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL('selector.js', baseUrl).href;
      script.dataset.studentSelectorRuntime = '';
      const timer = setTimeout(() => fail(), 15000);
      const fail = () => {
        clearTimeout(timer); script.remove(); runtimePromise = null;
        reject(new Error('Could not load the student selector.'));
      };
      script.onload = () => {
        if (!global.StudentSelector?.mount) return fail();
        clearTimeout(timer); resolve();
      };
      script.onerror = fail;
      document.head.append(script);
    });
    return runtimePromise;
  }

  function attach({ button, courseLabel, getContext, beforeOpen, baseUrl }) {
    let mounted = null, loading = false, resetLabel;
    const label = button.textContent;
    const resolveBase = () => new URL(
      (typeof baseUrl === 'function' ? baseUrl() : baseUrl) ||
      (location.protocol === 'file:' ? 'https://randomizerselection.github.io/studentselector/' : '/student-selector/'),
      location.href
    ).href.replace(/\/?$/, '/');

    function close() {
      if (!mounted) return;
      mounted.observer.disconnect();
      mounted.resizeObserver.disconnect();
      global.removeEventListener('resize', syncLayout);
      mounted.app?.destroy?.();
      mounted.panel.remove();
      mounted = null;
      document.body.classList.remove('is-student-selector-open');
      document.body.style.removeProperty('--selector-slide-scale');
      button.setAttribute('aria-pressed', 'false');
      button.focus({ preventScroll: true });
    }

    function syncLayout() {
      if (!mounted) return;
      const available = global.innerWidth - mounted.panel.getBoundingClientRect().width;
      const deckWidth = Math.min(global.innerWidth, global.innerHeight * 16 / 9);
      document.body.style.setProperty('--selector-slide-scale', String(Math.min(1, available / deckWidth)));
    }

    async function open() {
      if (mounted) return mounted.panel.focus({ preventScroll: true });
      if (loading) return;
      beforeOpen?.();
      loading = true;
      clearTimeout(resetLabel);
      button.disabled = true;
      button.textContent = 'Loading…';
      let panel;
      try {
        if (global.OHPlatform) await global.OHPlatform.ready().catch(() => {});
        const usePlatformClasses = global.OHPlatform?.session.account?.role === 'teacher';
        const basePath = resolveBase();
        await loadRuntime(basePath);
        panel = document.createElement('aside');
        panel.className = 'studentSelectorSidePanel';
        panel.setAttribute('aria-label', 'Student selector');
        panel.tabIndex = -1;
        panel.innerHTML = '<header class="lesson-selector-heading"><div><p class="lesson-selector-course"></p><h2>Student selector</h2></div><button class="studentSelectorPanelClose" type="button" aria-label="Close student selector">×</button></header><div class="studentSelectorMount"></div>';
        panel.querySelector('.lesson-selector-course').textContent = courseLabel;
        panel.querySelector('.studentSelectorPanelClose').onclick = close;
        document.body.append(panel);
        const lessonContext = getContext();
        const app = global.StudentSelector.mount(panel.querySelector('.studentSelectorMount'), {
          basePath, skipStyles: true, onClose: close, lessonContext,
          defaultClassId: new URLSearchParams(location.search).get('class'),
          classroomMode: !usePlatformClasses,
          ...(usePlatformClasses ? global.OHPlatform.selectorAdapters(lessonContext) : {})
        });
        const syncStage = () => panel.classList.toggle('is-stage-overlay', ['selecting', 'selected'].includes(app.stage?.mode));
        const observer = new MutationObserver(syncStage);
        observer.observe(panel.querySelector('.studentSelectorMount'), { childList: true, subtree: true });
        const resizeObserver = new ResizeObserver(syncLayout);
        mounted = { panel, app, observer, resizeObserver };
        syncStage();
        document.body.classList.add('is-student-selector-open');
        resizeObserver.observe(panel);
        global.addEventListener('resize', syncLayout);
        syncLayout();
        button.setAttribute('aria-pressed', 'true');
        panel.focus({ preventScroll: true });
      } catch (error) {
        console.error(error);
        panel?.remove();
        button.textContent = 'Unavailable';
        resetLabel = setTimeout(() => { button.textContent = label; }, 2200);
      } finally {
        loading = false;
        button.disabled = false;
        if (button.textContent === 'Loading…') button.textContent = label;
      }
    }

    const toggle = () => mounted ? close() : open();
    button.onclick = toggle;
    return { open, close, toggle, get isOpen() { return Boolean(mounted); } };
  }
  global.LessonStudentSelector = { attach };
}(window));
