(function () {
  "use strict";
  if (window.OHPlatform) return;

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
      script.src = "/assets/js/platform-auth.js?v=20260813.1";
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
      : await fetch(path, { ...options, credentials: "same-origin" });
    return parse(response);
  }

  function currentRoute() {
    let path = location.pathname.replace(/\/index\.html$/i, "/").replace(/\.html$/i, "/");
    if (!path.endsWith("/")) path += "/";
    return path;
  }

  function findContent() {
    const route = currentRoute();
    return state.manifest.items.find((item) => item.route === route) || {
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
        loadRoster: (classId) => api(`/api/selector/classes/${encodeURIComponent(classId)}/roster`)
      },
      sessionAdapter: {
        start: (value) => api("/api/selector/sessions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...value, ...lessonContext }) }),
        get: (sessionId) => api(`/api/selector/sessions/${encodeURIComponent(sessionId)}`),
        recordEvents: (sessionId, value) => api(`/api/selector/sessions/${encodeURIComponent(sessionId)}/events/batch`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(value) }),
        complete: (sessionId, value) => api(`/api/selector/sessions/${encodeURIComponent(sessionId)}/complete`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(value) })
      }
    };
  }

  async function initialize() {
    if (state.initialized) return state;
    state.initialized = true;
    const manifestPromise = fetch("/api/content/manifest").then(parse);
    await mountAccount();
    state.manifest = await manifestPromise;
    state.content = findContent();
    state.session = window.PlatformAuth?.getSession?.() || state.session;
    startTelemetry();
    if (new URLSearchParams(location.search).get("signin") === "1" && !state.session.authenticated) window.PlatformAuth?.open?.("login", "student");
    return state;
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
    submitQuiz: (quizId, value) => api("/api/quiz-attempts", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...value, attempt_id: value.attempt_id || value.idempotency_key, quiz_id: quizId, quiz_version: value.quiz_version }) }),
    get session() { return clone(state.session); },
    get content() { return clone(state.content); },
    openAccountDialog: (mode = "login") => window.PlatformAuth?.open?.(mode, "student")
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
