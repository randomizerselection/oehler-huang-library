(() => {
  "use strict";

  const state = {
    session: { authenticated: false, account: null, csrf_token: null },
    manifest: { items: [] },
    content: null,
    queue: [],
    initialized: false,
    lastActivityAt: Date.now(),
    heartbeat: null,
    flushTimer: null
  };

  function uid(prefix = "event") {
    return `${prefix}_${globalThis.crypto?.randomUUID?.() || `${Date.now()}_${Math.random().toString(36).slice(2)}`}`;
  }

  async function parse(response) {
    let body = {};
    try { body = await response.json(); } catch {}
    if (!response.ok) {
      const error = new Error(body.message || `Request failed (${response.status}).`);
      error.code = body.error_code || "REQUEST_FAILED";
      error.status = response.status;
      throw error;
    }
    return body;
  }

  async function api(path, options = {}) {
    const method = String(options.method || "GET").toUpperCase();
    const headers = new Headers(options.headers || {});
    if (!["GET", "HEAD", "OPTIONS"].includes(method) && state.session.csrf_token) headers.set("x-csrf-token", state.session.csrf_token);
    if (options.body && !headers.has("content-type")) headers.set("content-type", "application/json");
    const response = await fetch(path, { ...options, method, headers, credentials: "same-origin" });
    if (response.status === 401) {
      state.session = { authenticated: false, account: null, csrf_token: null };
      renderShell();
    }
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

  function emitAuthChange() {
    document.documentElement.dataset.ohRole = state.session.account?.role || "anonymous";
    window.dispatchEvent(new CustomEvent("oh:authchange", { detail: structuredClone(state.session) }));
  }

  function ensureStyles() {
    if (document.querySelector('link[data-oh-platform-shell]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/platform-shell.css?v=20260812.2";
    link.dataset.ohPlatformShell = "";
    document.head.appendChild(link);
  }

  function shellMarkup() {
    const account = state.session.account;
    return `
      <div class="ohShell" data-oh-shell>
        <details class="ohShellMenu">
          <summary title="Open platform navigation"><span class="ohShellMark" aria-hidden="true">OH</span><span>Platform navigation</span></summary>
          <nav class="ohShellNav" aria-label="Platform navigation">
            <a href="/">Platform home</a>
            <a href="/economics/">Economics</a>
            <a href="/investment-analysis/">Investment</a>
            <a href="/mark/">Homework</a>
            ${account?.role === "teacher" ? '<a class="ohShellUtility" href="/selector/">Student selector</a>' : ''}
            <button class="ohShellButton" type="button" data-oh-account>${account ? `${escapeHtml(account.display_name)} · ${escapeHtml(account.role)}` : "Sign in"}</button>
          </nav>
        </details>
      </div>
      <dialog class="ohDialog" data-oh-dialog>
        <form method="dialog" class="ohDialogClose"><button aria-label="Close">×</button></form>
        <div data-oh-dialog-body></div>
      </dialog>`;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
  }

  function renderShell() {
    ensureStyles();
    document.querySelector("[data-oh-shell]")?.remove();
    document.querySelector("[data-oh-shell-host]")?.remove();
    const host = document.createElement("div");
    host.dataset.ohShellHost = "";
    host.innerHTML = shellMarkup();
    document.body.appendChild(host);
    const shell = host.querySelector("[data-oh-shell]");
    const dock = document.querySelector("[data-oh-account-dock]");
    if (dock && shell) {
      shell.classList.add("ohShellDocked");
      dock.appendChild(shell);
    }
    shell?.querySelector("[data-oh-account]")?.addEventListener("click", () => openAccountDialog());
    emitAuthChange();
  }

  function field(name, label, type = "text", autocomplete = "") {
    return `<label><span>${label}</span><input name="${name}" type="${type}" ${autocomplete ? `autocomplete="${autocomplete}"` : ""} required></label>`;
  }

  function signedOutMarkup(mode = "login") {
    const forms = {
      login: `${field("username", "Username", "text", "username")}${field("password", "Password", "password", "current-password")}`,
      student: `${field("join_code", "Class join code")}${field("display_name", "Display name")}${field("username", "Username", "text", "username")}${field("password", "Password", "password", "new-password")}`,
      teacher: `${field("invitation_code", "Teacher invitation")}${field("display_name", "Display name")}${field("username", "Username", "text", "username")}${field("password", "Password", "password", "new-password")}`,
      recover: `${field("username", "Username")}${field("recovery_code", "Recovery code")}${field("new_password", "New password", "password", "new-password")}`
    };
    return `<h2>${mode === "login" ? "Sign in" : mode === "student" ? "Join a class" : mode === "teacher" ? "Teacher registration" : "Recover account"}</h2>
      <nav class="ohDialogTabs">${["login", "student", "teacher", "recover"].map((item) => `<button type="button" data-oh-mode="${item}" ${item === mode ? 'aria-current="page"' : ""}>${item}</button>`).join("")}</nav>
      <form class="ohAccountForm" data-oh-account-form data-mode="${mode}">${forms[mode]}<p class="ohFormError" data-oh-error></p><button class="ohPrimary" type="submit">Continue</button></form>`;
  }

  function signedInMarkup() {
    const account = state.session.account;
    const roleActions = account.role === "teacher"
      ? `<button type="button" data-oh-action="teacher-dashboard">Classes & reports</button>`
      : account.role === "student"
        ? `<button type="button" data-oh-action="student-dashboard">Assignments & progress</button><button type="button" data-oh-action="join-class">Join another class</button>`
        : `<button type="button" data-oh-action="admin-dashboard">Administration</button>`;
    return `<h2>${escapeHtml(account.display_name)}</h2><p>@${escapeHtml(account.username)} · ${escapeHtml(account.role)}</p>
      <div class="ohAccountActions">${roleActions}<a href="/api/privacy/export" download>Export my data</a><button type="button" data-oh-action="rotate-recovery">Rotate recovery code</button><button type="button" data-oh-action="correction">Correct display name</button><button type="button" data-oh-action="deletion">Request deletion</button><button type="button" data-oh-action="logout">Sign out</button></div>
      <div data-oh-panel></div>`;
  }

  function bindDialog(dialog, mode = "login") {
    dialog.querySelectorAll("[data-oh-mode]").forEach((button) => button.addEventListener("click", () => {
      dialog.querySelector("[data-oh-dialog-body]").innerHTML = signedOutMarkup(button.dataset.ohMode);
      bindDialog(dialog, button.dataset.ohMode);
    }));
    dialog.querySelector("[data-oh-account-form]")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const value = Object.fromEntries(new FormData(form));
      const errorLine = form.querySelector("[data-oh-error]");
      try {
        const endpoint = form.dataset.mode === "login" ? "/api/auth/login" : form.dataset.mode === "recover" ? "/api/auth/recover" : `/api/auth/register/${form.dataset.mode}`;
        const result = await api(endpoint, { method: "POST", body: JSON.stringify(value) });
        if (form.dataset.mode === "recover") {
          showSecret(dialog, "New recovery code", result.recovery_code, "Sign in with your new password after saving this code.");
          return;
        }
        state.session = result;
        renderShell();
        startTelemetry();
        const replacement = document.querySelector("[data-oh-dialog]");
        if (result.recovery_code) showSecret(replacement, "Save your recovery code", result.recovery_code, "It is shown once and replaces email recovery.");
        else {
          const next = new URLSearchParams(location.search).get("next");
          if (next?.startsWith("/") && !next.startsWith("//")) location.assign(next);
          else replacement?.close();
        }
      } catch (error) { errorLine.textContent = error.message; }
    });
    dialog.querySelectorAll("[data-oh-action]").forEach((button) => button.addEventListener("click", () => runAccountAction(button.dataset.ohAction, dialog)));
  }

  function showSecret(dialog, title, secret, note) {
    dialog.querySelector("[data-oh-dialog-body]").innerHTML = `<h2>${escapeHtml(title)}</h2><output class="ohSecret">${escapeHtml(secret)}</output><p>${escapeHtml(note)}</p><button class="ohPrimary" type="button" data-oh-secret-done>Saved securely</button>`;
    dialog.querySelector("[data-oh-secret-done]").addEventListener("click", () => dialog.close());
    if (!dialog.open) dialog.showModal();
  }

  function openAccountDialog(mode = "login") {
    const dialog = document.querySelector("[data-oh-dialog]");
    dialog.querySelector("[data-oh-dialog-body]").innerHTML = state.session.authenticated ? signedInMarkup() : signedOutMarkup(mode);
    bindDialog(dialog, mode);
    if (!dialog.open) dialog.showModal();
  }

  async function runAccountAction(action, dialog) {
    const panel = dialog.querySelector("[data-oh-panel]");
    try {
      if (action === "logout") {
        await api("/api/auth/logout", { method: "POST", body: "{}" });
        state.session = { authenticated: false, account: null, csrf_token: null };
        dialog.close(); renderShell(); return;
      }
      if (action === "rotate-recovery") {
        const result = await api("/api/auth/recovery-code", { method: "POST", body: "{}" });
        showSecret(dialog, "New recovery code", result.recovery_code, "Your previous recovery code no longer works."); return;
      }
      if (action === "join-class") {
        const joinCode = prompt("Class join code");
        if (joinCode) await api("/api/classes/join", { method: "POST", body: JSON.stringify({ join_code: joinCode }) });
        panel.innerHTML = "<p>Class joined.</p>"; return;
      }
      if (action === "correction") {
        const displayName = prompt("Correct display name", state.session.account.display_name);
        if (displayName) state.session.account = await api("/api/privacy/correction", { method: "PATCH", body: JSON.stringify({ display_name: displayName }) });
        renderShell(); return;
      }
      if (action === "deletion") {
        if (confirm("Submit an account deletion request? This will require administrator processing.")) await api("/api/privacy/deletion-request", { method: "POST", body: JSON.stringify({ source: "account-dialog" }) });
        panel.innerHTML = "<p>Deletion request submitted.</p>"; return;
      }
      if (action === "teacher-dashboard") await renderTeacherDashboard(panel);
      if (action === "student-dashboard") await renderStudentDashboard(panel);
      if (action === "admin-dashboard") await renderAdminDashboard(panel);
    } catch (error) { panel.innerHTML = `<p class="ohFormError">${escapeHtml(error.message)}</p>`; }
  }

  async function renderTeacherDashboard(panel) {
    const classes = await api("/api/classes");
    panel.innerHTML = `<section class="ohPanel"><h3>Classes</h3><form data-oh-create-class><input name="name" placeholder="Class name" required><button>Create</button></form>
      <div>${classes.items.map((item) => `<article><strong>${escapeHtml(item.name)}</strong><span>${item.enrollment_enabled ? "Enrollment enabled" : "Consent and join code required"}</span><button data-consent="${item.class_id}">Attest authorization</button><button data-code="${item.class_id}">Rotate join code</button><a href="/selector/?class=${encodeURIComponent(item.class_id)}">Open selector</a></article>`).join("") || "<p>No classes yet.</p>"}</div></section>`;
    panel.querySelector("[data-oh-create-class]").addEventListener("submit", async (event) => {
      event.preventDefault(); await api("/api/classes", { method: "POST", body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) }); await renderTeacherDashboard(panel);
    });
    panel.querySelectorAll("[data-consent]").forEach((button) => button.addEventListener("click", async () => { await api(`/api/classes/${button.dataset.consent}/consent-attestation`, { method: "POST", body: JSON.stringify({ statement_version: "school-authorization-v1" }) }); await renderTeacherDashboard(panel); }));
    panel.querySelectorAll("[data-code]").forEach((button) => button.addEventListener("click", async () => { const result = await api(`/api/classes/${button.dataset.code}/join-code`, { method: "POST", body: "{}" }); alert(`New join code: ${result.join_code}`); await renderTeacherDashboard(panel); }));
  }

  async function renderStudentDashboard(panel) {
    const [assignments, progress] = await Promise.all([api("/api/student/assignments"), api("/api/student/progress")]);
    panel.innerHTML = `<section class="ohPanel"><h3>Assignments</h3>${assignments.items.map((item) => `<article><a href="${state.manifest.items.find((content) => content.id === item.content_id)?.route || '#'}">${escapeHtml(item.title)}</a><span>${item.due_at ? `Due ${escapeHtml(item.due_at)}` : "No due date"}</span></article>`).join("") || "<p>No assigned activities.</p>"}<h3>Progress</h3><p>${progress.lessons.length} lessons started · ${progress.quiz_attempts.length} quiz attempts</p></section>`;
  }

  async function renderAdminDashboard(panel) {
    panel.innerHTML = `<section class="ohPanel"><h3>Teacher invitations</h3><button data-create-invite>Create 72-hour invitation</button><output data-invite></output></section>`;
    panel.querySelector("[data-create-invite]").addEventListener("click", async () => {
      const result = await api("/api/admin/teacher-invitations", { method: "POST", body: JSON.stringify({ expires_hours: 72 }) });
      panel.querySelector("[data-invite]").textContent = result.invitation_code;
    });
  }

  function track(eventType, data = {}) {
    if (!state.session.authenticated || !state.content) return;
    state.queue.push({ event_id: uid(), content_id: state.content.id, content_version: state.content.version, event_type: eventType, occurred_at: new Date().toISOString(), data });
    if (state.queue.length >= 30) flush();
  }

  async function flush() {
    if (!state.session.authenticated || !state.queue.length) return;
    const events = state.queue.splice(0, 200);
    try { await api("/api/learning/events/batch", { method: "POST", body: JSON.stringify({ events }), keepalive: true }); }
    catch { state.queue.unshift(...events); }
  }

  function startTelemetry() {
    if (!state.session.authenticated || state.heartbeat) return;
    track("lesson_open", { route: location.pathname, title: document.title });
    ["pointerdown", "keydown", "scroll"].forEach((name) => addEventListener(name, () => { state.lastActivityAt = Date.now(); }, { passive: true }));
    state.heartbeat = setInterval(() => {
      if (document.visibilityState === "visible" && Date.now() - state.lastActivityAt < 90_000) track("active_time", { seconds: 30 });
    }, 30_000);
    state.flushTimer = setInterval(flush, 60_000);
    addEventListener("pagehide", () => flush());
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
    document.addEventListener("click", (event) => {
      const target = event.target.closest("button, [role=button]");
      if (!target) return;
      if (target.matches("[data-flashcard-show], .reveal, [data-action*=reveal]") || target.closest(".invReveal")) track("reveal", { slide_id: lastSlideId || null });
      if (target.matches("[data-flashcard-mark]")) track(`flashcard_${target.dataset.flashcardMark}`, { card_id: document.querySelector("[data-flashcard-card]")?.dataset.cardId || null });
    });
  }

  function selectorAdapters(lessonContext = {}) {
    return {
      dataAdapter: {
        listClasses: () => api("/api/selector/classes"),
        loadRoster: (classId) => api(`/api/selector/classes/${encodeURIComponent(classId)}/roster`)
      },
      sessionAdapter: {
        start: (value) => api("/api/selector/sessions", { method: "POST", body: JSON.stringify({ ...value, ...lessonContext }) }),
        get: (sessionId) => api(`/api/selector/sessions/${encodeURIComponent(sessionId)}`),
        recordEvents: (sessionId, value) => api(`/api/selector/sessions/${encodeURIComponent(sessionId)}/events/batch`, { method: "POST", body: JSON.stringify(value) }),
        complete: (sessionId, value) => api(`/api/selector/sessions/${encodeURIComponent(sessionId)}/complete`, { method: "POST", body: JSON.stringify(value) })
      }
    };
  }

  async function initialize() {
    if (state.initialized) return state;
    state.initialized = true;
    const [session, manifest] = await Promise.all([
      fetch("/api/auth/me", { credentials: "same-origin" }).then(parse),
      fetch("/api/content/manifest").then(parse)
    ]);
    state.session = session;
    state.manifest = manifest;
    state.content = findContent();
    renderShell();
    startTelemetry();
    if (new URLSearchParams(location.search).get("signin") === "1" && !state.session.authenticated) openAccountDialog("login");
    return state;
  }

  window.OHPlatform = Object.freeze({
    ready: initialize,
    api,
    track,
    flush,
    selectorAdapters,
    submitQuiz: (quizId, value) => api(`/api/quizzes/${encodeURIComponent(quizId)}/attempts`, { method: "POST", body: JSON.stringify(value) }),
    get session() { return structuredClone(state.session); },
    get content() { return state.content ? structuredClone(state.content) : null; },
    openAccountDialog
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
