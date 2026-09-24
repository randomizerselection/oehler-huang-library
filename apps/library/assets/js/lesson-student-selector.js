(function (global) {
  'use strict';
  let runtimePromise;
  let signInPromptDismissed = false;
  const integrationScriptUrl = document.currentScript?.src || location.href;

  function loadRuntime(baseUrl) {
    if (global.StudentSelector?.mount) return Promise.resolve();
    if (runtimePromise) return runtimePromise;
    runtimePromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL('selector.js?v=20260920.3', baseUrl).href;
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

  let platformPromise;
  function loadPlatformShell() {
    if (global.OHPlatform) return Promise.resolve(global.OHPlatform);
    if (platformPromise) return platformPromise;
    platformPromise = new Promise((resolve) => {
      const script = document.createElement('script');
      // platform-shell.js lives next to this file in apps/library/assets/js/.
      script.src = new URL('platform-shell.js?v=20260920.2', integrationScriptUrl).href;
      script.onload = () => resolve(global.OHPlatform || null);
      script.onerror = () => resolve(null);
      document.head.append(script);
    });
    return platformPromise;
  }

  function attach({ button, courseLabel, getContext, beforeOpen, baseUrl }) {
    let mounted = null, loading = false, resetLabel;
    const label = button.textContent;
    const configuredBase = () => typeof baseUrl === 'function' ? baseUrl() : baseUrl;
    const resolveBase = () => new URL(
      configuredBase() || (location.protocol === 'file:'
        ? 'https://randomizerselection.github.io/studentselector/'
        : '/student-selector/'),
      location.href
    ).href.replace(/\/?$/, '/');
    const resolveRuntimeBase = () => configuredBase()
      ? resolveBase()
      : location.protocol === 'file:'
        ? new URL('../../../student-selector/', integrationScriptUrl).href
        : resolveBase();

    function close() {
      if (!mounted) return;
      mounted.observer.disconnect();
      mounted.resizeObserver.disconnect();
      global.removeEventListener('resize', syncLayout);
      mounted.app?.destroy?.();
      mounted.panel.remove();
      mounted = null;
      document.body.classList.remove('is-student-selector-open');
      document.body.classList.remove('is-student-selector-minimized');
      document.body.classList.remove('is-selector-attendance-active');
      document.body.classList.remove('is-selector-leaderboard-active');
      document.body.style.removeProperty('--selector-slide-scale');
      button.setAttribute('aria-pressed', 'false');
      button.focus({ preventScroll: true });
    }

    function minimize() {
      if (!mounted || mounted.panel.classList.contains('is-attendance-active')) return;
      mounted.panel.classList.add('is-minimized');
      document.body.classList.remove('is-student-selector-open');
      document.body.classList.add('is-student-selector-minimized');
      document.body.style.removeProperty('--selector-slide-scale');
      button.setAttribute('aria-pressed', 'false');
      mounted.panel.querySelector('.studentSelectorPanelRestore')?.focus({ preventScroll: true });
    }

    function restore() {
      if (!mounted) return;
      mounted.panel.classList.remove('is-minimized');
      document.body.classList.remove('is-student-selector-minimized');
      document.body.classList.add('is-student-selector-open');
      button.setAttribute('aria-pressed', 'true');
      syncLayout();
      mounted.panel.focus({ preventScroll: true });
    }

    function syncLayout() {
      if (!mounted) return;
      if (mounted.panel.classList.contains('is-minimized')) {
        document.body.style.removeProperty('--selector-slide-scale');
        return;
      }
      const available = global.innerWidth - mounted.panel.getBoundingClientRect().width;
      const deckWidth = Math.min(global.innerWidth, global.innerHeight * 16 / 9);
      document.body.style.setProperty('--selector-slide-scale', String(Math.min(1, available / deckWidth)));
    }

    async function open() {
      if (mounted) {
        if (mounted.panel.classList.contains('is-minimized')) restore();
        else mounted.panel.focus({ preventScroll: true });
        return;
      }
      if (loading) return;
      beforeOpen?.();
      loading = true;
      clearTimeout(resetLabel);
      button.disabled = true;
      button.textContent = 'Loading…';
      let panel;
      try {
        const platform = await loadPlatformShell();
        if (platform) await platform.ready().catch(() => {});
        // platform-shell initialize() returns before its async account mount finishes;
        // wait until the auth stack is actually loaded (or the server proved absent).
        if (global.LibraryPlatform?.initialize) {
          await global.LibraryPlatform.initialize({ context: 'library', roleHint: 'teacher' }).catch(() => null);
        }
        let usePlatformClasses = global.OHPlatform?.session.account?.role === 'teacher';
        // Decks opened from disk connect to the local platform; offer sign-in once
        // per page load so the panel can use real rosters instead of the public list.
        if (!usePlatformClasses && location.protocol === 'file:' && global.LibraryPlatform && global.PlatformAuth && !signInPromptDismissed) {
          // The deck's own account mount lives inside the collapsed More menu, where a
          // modal dialog cannot render; prompt through a body-level element instead.
          const promptElement = document.createElement('platform-account');
          promptElement.setAttribute('role-hint', 'teacher');
          document.body.append(promptElement);
          const session = await global.LibraryPlatform.requireRole('teacher', { roleHint: 'teacher', element: promptElement }).catch(() => null);
          if (!session) signInPromptDismissed = true;
          usePlatformClasses = global.OHPlatform?.session.account?.role === 'teacher';
        }
        const basePath = usePlatformClasses && global.OHPlatform?.apiBase
          ? `${global.OHPlatform.apiBase}/student-selector/`
          : resolveBase();
        await loadRuntime(resolveRuntimeBase());
        panel = document.createElement('aside');
        panel.className = 'studentSelectorSidePanel';
        panel.setAttribute('aria-label', 'Student selector');
        panel.tabIndex = -1;
        panel.innerHTML = '<header class="lesson-selector-heading"><div><p class="lesson-selector-course"></p><h2>Student selector</h2></div><div class="studentSelectorPanelActions"><button class="studentSelectorPanelMinimize" type="button" aria-label="Minimize student selector" title="Minimize student selector">−</button><button class="studentSelectorPanelClose" type="button" aria-label="Close student selector">×</button></div></header><button class="studentSelectorPanelRestore" type="button" aria-label="Restore student selector" title="Restore student selector"><span>Selector</span><span aria-hidden="true">‹</span></button><div class="studentSelectorMount"></div>';
        panel.querySelector('.lesson-selector-course').textContent = courseLabel;
        // On file:// decks without the platform server there is no roster homework
        // data, so badges silently disappear; tell the teacher how to reconnect.
        if (!usePlatformClasses && location.protocol === 'file:' && !global.PlatformAuth) {
          const hint = document.createElement('p');
          hint.className = 'lesson-selector-platform-hint';
          hint.textContent = 'Local platform not connected — homework badges (🏆/🐢) are hidden. Start the platform server (npm start), then close and reopen this panel and sign in as teacher. 本地平台未连接：请先运行 npm start 启动平台，再关闭并重新打开本面板、登录教师账号，即可显示作业徽章。';
          panel.querySelector('.lesson-selector-heading').after(hint);
        }
        panel.querySelector('.studentSelectorPanelClose').onclick = close;
        panel.querySelector('.studentSelectorPanelMinimize').onclick = minimize;
        panel.querySelector('.studentSelectorPanelRestore').onclick = restore;
        document.body.append(panel);
        const lessonContext = getContext();
        const app = global.StudentSelector.mount(panel.querySelector('.studentSelectorMount'), {
          basePath, skipStyles: true, onClose: close, lessonContext,
          defaultClassId: new URLSearchParams(location.search).get('class'),
          classroomMode: !usePlatformClasses,
          ...(usePlatformClasses ? global.OHPlatform.selectorAdapters(lessonContext) : {})
        });
        const syncStage = () => {
          panel.classList.toggle('is-stage-overlay', ['selecting', 'selected'].includes(app.stage?.mode));
          const attendanceActive = Boolean(panel.querySelector('.selector-modal.is-attendance:not([hidden])'));
          const leaderboardActive = Boolean(panel.querySelector('.selector-modal.is-leaderboard:not([hidden])'));
          panel.classList.toggle('is-attendance-active', attendanceActive);
          panel.classList.toggle('is-leaderboard-active', leaderboardActive);
          document.body.classList.toggle('is-selector-attendance-active', attendanceActive);
          document.body.classList.toggle('is-selector-leaderboard-active', leaderboardActive);
        };
        const observer = new MutationObserver(syncStage);
        observer.observe(panel.querySelector('.studentSelectorMount'), {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class', 'hidden']
        });
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

    const toggle = () => mounted
      ? mounted.panel.classList.contains('is-minimized') ? restore() : close()
      : open();
    button.onclick = toggle;
    return {
      open, close, minimize, restore, toggle,
      get isOpen() { return Boolean(mounted && !mounted.panel.classList.contains('is-minimized')); },
      get isMinimized() { return Boolean(mounted?.panel.classList.contains('is-minimized')); }
    };
  }
  global.LessonStudentSelector = { attach };
}(window));
