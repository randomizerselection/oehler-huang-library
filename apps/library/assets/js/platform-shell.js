(function () {
  "use strict";
  if (window.OHPlatform) return;

  const SHELL_SCRIPT_URL = document.currentScript?.src || location.href;

  const state = {
    initialized: false,
    session: { authenticated: false, account: null, csrf_token: null },
    manifest: { items: [] },
    content: null,
    queue: [],
    heartbeat: null,
    flushTimer: null,
    lastActivityAt: Date.now()
  };

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  async function parse(response) {
    let value = {};
    try { value = await response.json(); } catch (_error) { /* empty response */ }
    if (!response.ok) {
      const error = new Error(value.message || `Request failed with status ${response.status}.`);
      error.code = value.error_code || "REQUEST_FAILED";
      error.status = response.status;
      throw error;
    }
    return value;
  }

  function ensureLibraryPlatform() {
    if (window.LibraryPlatform) return Promise.resolve(window.LibraryPlatform);
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-oh-platform-auth]');
      if (existing) {
        existing.addEventListener("load", () => resolve(window.LibraryPlatform || null), { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const script = document.createElement("script");
      // Resolve relative to this file so decks opened from disk (file://) find it too.
      script.src = new URL("platform-auth.js?v=20260813.1", SHELL_SCRIPT_URL).href;
      script.dataset.ohPlatformAuth = "";
      script.addEventListener("load", () => resolve(window.LibraryPlatform || null), { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  async function api(path, options = {}) {
    await ensureLibraryPlatform();
    const response = window.PlatformAuth
      ? await window.PlatformAuth.authFetch(path, options)
      : await fetch(apiUrl(path), { ...options, credentials: "include" });
    return parse(response);
  }

  function apiUrl(path) {
    // On file:// pages the account shell is loaded from the local platform server
    // and prefixes requests itself; otherwise requests stay same-origin relative.
    const base = window.PlatformAuth?.apiBase ?? window.LibraryPlatform?.apiBase?.() ?? "";
    return `${base}${path}`;
  }

  function currentRoute() {
    let path = location.pathname.replace(/\/index\.html$/i, "/").replace(/\.html$/i, "/");
    if (!path.endsWith("/")) path += "/";
    return path;
  }

  function findContent() {
    const route = currentRoute();
    const exact = state.manifest.items.find((item) => item.route === route);
    if (exact) return exact;
    // A deck opened from disk or behind a hosting prefix has a longer pathname than the
    // manifest route, so fall back to the longest route it ends with. The site root route
    // is excluded because it is a suffix of every path.
    const key = route.toLowerCase();
    const matched = state.manifest.items
      .filter((item) => item.route !== "/" && key.endsWith(item.route.toLowerCase()))
      .sort((a, b) => b.route.length - a.route.length)[0];
    if (matched) return matched;
    return {
      id: route.replace(/^\/+|\/+$/g, "").replaceAll("/", ":") || "library:home",
      version: "1.0.0",
      route,
      title: document.title
    };
  }

  function accountMount() {
    const legacy = document.querySelector("[data-oh-account-dock]");
    if (legacy) {
      legacy.removeAttribute("data-oh-account-dock");
      legacy.dataset.platformAccount = "";
      return legacy;
    }
    const existing = document.querySelector("[data-platform-account]");
    if (existing) return existing;
    const host = document.createElement("div");
    host.dataset.platformAccount = "";
    host.className = "ohPlatformAccountFallback";
    Object.assign(host.style, { position: "fixed", top: "12px", right: "12px", zIndex: "1200" });
    document.body.appendChild(host);
    return host;
  }

  async function mountAccount() {
    const platform = await ensureLibraryPlatform();
    if (!platform) return;
    await platform.initialize({ mount: accountMount(), context: "library", roleHint: "student" });
    state.session = window.PlatformAuth?.getSession?.() || state.session;
    document.documentElement.dataset.ohRole = state.session.account?.role || "anonymous";
  }

  function stopTelemetry() {
    if (state.heartbeat) clearInterval(state.heartbeat);
    if (state.flushTimer) clearInterval(state.flushTimer);
    state.heartbeat = null;
    state.flushTimer = null;
    state.queue = [];
  }

  function track(eventType, data = {}) {
    if (!state.session.authenticated || !state.content) return;
    const token = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    state.queue.push({
      event_id: `event_${token}`,
      content_id: state.content.id,
      content_version: state.content.version,
      event_type: eventType,
      occurred_at: new Date().toISOString(),
      data
    });
    if (state.queue.length >= 30) flush();
  }

  async function flush() {
    if (!state.session.authenticated || !state.queue.length) return;
    const events = state.queue.splice(0, 200);
    try {
      await api("/api/learning/events/batch", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ events }), keepalive: true });
    } catch (_error) {
      state.queue.unshift(...events);
    }
  }

  function startTelemetry() {
    if (!state.session.authenticated || state.heartbeat) return;
    track("lesson_open", { route: location.pathname, title: document.title });
    ["pointerdown", "keydown", "scroll"].forEach((name) => addEventListener(name, () => { state.lastActivityAt = Date.now(); }, { passive: true }));
    state.heartbeat = setInterval(() => {
      if (document.visibilityState === "visible" && Date.now() - state.lastActivityAt < 90_000) track("active_time", { seconds: 30 });
    }, 30_000);
    state.flushTimer = setInterval(flush, 60_000);
    addEventListener("pagehide", flush);
    let lastSlideId = "";
    const syncSlides = () => {
      const slides = [...document.querySelectorAll(".slide, .invSlide")];
      slides.forEach((slide, index) => { slide.dataset.contentSlideId ||= `${state.content.id}:slide-${index + 1}`; });
      const active = slides.find((slide) => slide.classList.contains("active") || slide.classList.contains("is-active") || slide.getAttribute("aria-hidden") === "false");
      if (active?.dataset.contentSlideId && active.dataset.contentSlideId !== lastSlideId) {
        if (lastSlideId) track("slide_complete", { slide_id: lastSlideId });
        lastSlideId = active.dataset.contentSlideId;
        track("slide_visible", { slide_id: lastSlideId });
      }
    };
    new MutationObserver(syncSlides).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "aria-hidden"] });
    syncSlides();
  }

  function selectorAdapters(lessonContext = {}) {
    return {
      dataAdapter: {
        listClasses: () => api("/api/selector/classes"),
        loadRoster: (classId) => api(`/api/selector/classes/${encodeURIComponent(classId)}/roster`),
        loadHomeworkRewards: async (classId) => {
          // Compatibility path for a selector page refreshed while an older local
          // Platform process is still running. Current servers include rewards in
          // the session response, so this fan-out is only used when that field is absent.
          const overview = await api(`/api/classes/${encodeURIComponent(classId)}/student-overview`);
          const profiles = await Promise.all((overview.students || []).map(async (student) => ({
            student,
            profile: await api(`/api/students/${encodeURIComponent(student.account_id)}/profile`)
          })));
          return {
            records: profiles.flatMap(({ student, profile }) => (profile.homework || [])
              .filter((item) => String(item.class_id) === String(classId))
              .map((item) => ({
                account_id: String(student.account_id),
                display_name: student.display_name || student.username || String(student.account_id),
                assignment_title: item.assignment_title,
                assigned_on: item.assigned_on,
                source: item.source,
                status: item.status,
                score: item.score,
                score_max: item.score_max,
                recorded_at: item.recorded_at
              })))
          };
        }
      },
      sessionAdapter: {
        start: (value) => api("/api/selector/sessions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...value, ...lessonContext }) }),
        get: (sessionId) => api(`/api/selector/sessions/${encodeURIComponent(sessionId)}`),
        recordEvents: (sessionId, value) => api(`/api/selector/sessions/${encodeURIComponent(sessionId)}/events/batch`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(value) }),
        saveAttendance: (sessionId, value) => api(`/api/selector/sessions/${encodeURIComponent(sessionId)}/attendance`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(value) }),
        complete: (sessionId, value) => api(`/api/selector/sessions/${encodeURIComponent(sessionId)}/complete`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(value) })
      }
    };
  }

  function initialize() {
    // Return the same in-flight promise to every caller so awaiting ready()
    // actually waits for the account stack (platform-auth + account shell).
    if (state.initializing) return state.initializing;
    state.initializing = (async () => {
      state.initialized = true;
      await mountAccount();
      state.manifest = await fetch(apiUrl("/api/content/manifest"), { credentials: "include" }).then(parse).catch(() => ({ items: [] }));
      state.content = findContent();
      state.session = window.PlatformAuth?.getSession?.() || state.session;
      startTelemetry();
      if (new URLSearchParams(location.search).get("signin") === "1" && !state.session.authenticated) window.PlatformAuth?.open?.("login", "student");
      return state;
    })();
    return state.initializing;
  }

  addEventListener("platform:authchange", (event) => {
    state.session = clone(event.detail);
    document.documentElement.dataset.ohRole = state.session.account?.role || "anonymous";
    if (state.session.authenticated) startTelemetry();
    else stopTelemetry();
  });

  window.OHPlatform = Object.freeze({
    ready: initialize,
    api,
    track,
    flush,
    selectorAdapters,
    get apiBase() { return window.PlatformAuth?.apiBase ?? window.LibraryPlatform?.apiBase?.() ?? ""; },
    submitQuiz: (quizId, value) => api("/api/quiz-attempts", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...value, attempt_id: value.attempt_id || value.idempotency_key, quiz_id: quizId, quiz_version: value.quiz_version }) }),
    get session() { return clone(state.session); },
    get content() { return clone(state.content); },
    openAccountDialog: (mode = "login") => window.PlatformAuth?.open?.(mode, "student")
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
