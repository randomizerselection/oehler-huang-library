(function () {
  if (window.LibraryPlatform) return;

  let loader = null;

  const DEFAULT_LOCAL_PLATFORM_ORIGIN = 'http://127.0.0.1:4173';

  // Decks opened from disk talk to the local platform server. Override with
  // <meta name="oh-platform-origin" content="http://host:port"> when the server
  // runs on a different port.
  function localPlatformOrigin() {
    const configured = document.querySelector('meta[name="oh-platform-origin"]')?.content || window.OH_PLATFORM_ORIGIN || '';
    return String(configured || DEFAULT_LOCAL_PLATFORM_ORIGIN).replace(/\/+$/, '');
  }

  function apiBase() {
    return location.protocol === 'file:' ? localPlatformOrigin() : '';
  }

  function loadAccountShell() {
    if (window.PlatformAuth) return Promise.resolve(window.PlatformAuth);
    if (!loader) {
      loader = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const local = location.protocol === 'file:';
        script.src = local ? `${localPlatformOrigin()}/platform/account-shell.js` : '/platform/account-shell.js';
        script.async = true;
        script.addEventListener('load', () => resolve(window.PlatformAuth || null), { once: true });
        script.addEventListener('error', () => {
          // Local decks keep working (public class list) when the platform server is not running.
          if (local) { loader = null; resolve(null); }
          else reject(new Error('Account service is unavailable.'));
        }, { once: true });
        document.head.append(script);
      });
    }
    return loader;
  }

  function accountMount(preferred) {
    if (preferred) return preferred;
    let mount = document.querySelector('[data-platform-account]');
    if (mount) return mount;
    const navigation = document.querySelector('.landing-nav, .investment-home-nav, .lesson-toolbar, .toolbar, nav');
    if (!navigation) return null;
    mount = document.createElement('span');
    mount.className = 'platformAccountMount';
    mount.dataset.platformAccount = '';
    navigation.append(mount);
    return mount;
  }

  async function initialize(options = {}) {
    const platform = await loadAccountShell();
    if (!platform) return { session: { authenticated: false, account: null }, config: { student_classes: [] } };
    return platform.initialize({
      mount: accountMount(options.mount),
      locale: document.documentElement.lang.startsWith('zh') ? 'zh' : 'en',
      context: options.context || 'library',
      roleHint: options.roleHint || 'student'
    });
  }

  async function requireRole(role, options = {}) {
    const platform = await loadAccountShell();
    if (!platform) return null;
    await initialize(options);
    return platform.requireRole(role, { ...options, locale: 'en', context: options.context || 'library' });
  }

  async function submitAttempt({ attemptId, quiz, answers }) {
    const platform = await loadAccountShell();
    if (!platform) throw new Error('Open this lesson through oehlerhuang.com to submit a quiz.');
    const response = await platform.authFetch('/api/quiz-attempts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        attempt_id: attemptId,
        quiz_id: quiz.id,
        quiz_version: quiz.version,
        answers
      })
    });
    return platform.parseResponse(response);
  }

  window.LibraryPlatform = Object.freeze({
    hosted: location.protocol !== 'file:',
    initialize,
    requireRole,
    submitAttempt,
    apiBase,
    getSession: () => window.PlatformAuth?.getSession?.() || { authenticated: false, account: null },
    createAttemptId: () => window.PlatformAuth?.createAttemptId?.() || `attempt_${Date.now()}-${Math.random().toString(36).slice(2)}`
  });

  function autoMount() {
    if (document.querySelector('[data-platform-account]') || document.body?.matches('.landing-page, .library-home, .economics-home, .investment-home, .definitions-page, .definition-page')) {
      initialize({ context: 'library' }).catch(() => {});
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoMount, { once: true });
  else autoMount();
})();
