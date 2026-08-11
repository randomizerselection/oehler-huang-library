const state = {
  session: { authenticated: false, account: null, csrf_token: null, expires_at: null },
  config: {
    max_file_mb: 32,
    max_batch_size: 100,
    max_batch_total_mb: 512,
    batch_concurrency: 4,
    max_account_storage_gb: 50,
    permanent_storage: true,
    account_required_for_uploads: true,
    public_samples_enabled: true,
    teacher_registration_enabled: false
  },
  initialized: false,
  registrationRole: "student"
};

function $(selector) {
  return document.querySelector(selector);
}

async function parseResponse(response) {
  let value;
  try { value = await response.json(); } catch { value = {}; }
  if (!response.ok) {
    const error = new Error(value.message ?? `Request failed with status ${response.status}.`);
    error.code = value.error_code ?? "REQUEST_FAILED";
    error.status = response.status;
    throw error;
  }
  return value;
}

function renderAccountControls() {
  const signedIn = state.session.authenticated;
  document.body.classList.toggle("account-authenticated", signedIn);
  document.body.dataset.accountRole = state.session.account?.role ?? "anonymous";
  const signedOut = $("#account-signed-out");
  const signedInBlock = $("#account-signed-in");
  if (signedOut) signedOut.hidden = signedIn;
  if (signedInBlock) signedInBlock.hidden = !signedIn;
  const name = $("#account-name");
  if (name) name.textContent = state.session.account?.display_name ?? state.session.account?.username ?? "";
}

function dispatchChange() {
  renderAccountControls();
  window.dispatchEvent(new CustomEvent("econmark:authchange", { detail: getAuthState() }));
}

export function getAuthState() {
  return structuredClone(state.session);
}

export function getPublicConfig() {
  return structuredClone(state.config);
}

export async function authFetch(url, options = {}) {
  const method = String(options.method ?? "GET").toUpperCase();
  const headers = new Headers(options.headers ?? {});
  if (!["GET", "HEAD", "OPTIONS"].includes(method) && state.session.csrf_token) {
    headers.set("x-csrf-token", state.session.csrf_token);
  }
  const response = await fetch(url, { ...options, method, headers, credentials: "same-origin" });
  if (response.status === 401) {
    state.session = { authenticated: false, account: null, csrf_token: null, expires_at: null };
    dispatchChange();
  }
  return response;
}

export function openAccountDialog(mode = "login", role = "student") {
  const dialog = $("#account-dialog");
  if (!dialog) return;
  const selectedMode = mode === "register" ? "register" : "login";
  state.registrationRole = role === "teacher" ? "teacher" : "student";
  dialog.dataset.mode = selectedMode;
  $("#account-dialog-title").textContent = selectedMode === "register"
    ? (state.registrationRole === "teacher" ? "创建教师账户" : "创建学生账户")
    : "登录 EconMark";
  $("#account-submit").textContent = selectedMode === "register" ? "创建账户并登录" : "登录";
  $("#account-display-name-field").hidden = selectedMode !== "register";
  const inviteField = $("#account-teacher-invite-field");
  if (inviteField) inviteField.hidden = !(selectedMode === "register" && state.registrationRole === "teacher");
  let joinField = $("#account-class-join-field");
  if (!joinField && $("#account-error")) {
    joinField = document.createElement("label");
    joinField.id = "account-class-join-field";
    joinField.className = "field";
    joinField.htmlFor = "account-class-join";
    joinField.innerHTML = '<span>班级加入码</span><input id="account-class-join" maxlength="32" autocomplete="off" />';
    $("#account-error").before(joinField);
  }
  if (joinField) joinField.hidden = !(selectedMode === "register" && state.registrationRole === "student");
  $("#account-password").autocomplete = selectedMode === "register" ? "new-password" : "current-password";
  $("#account-mode-toggle").textContent = selectedMode === "register" ? "已有账户？改为登录" : "没有账户？创建学生账户";
  $("#account-error").textContent = "";
  if (!dialog.open) dialog.showModal();
  $("#account-username")?.focus();
}

export function ensureAuthenticated() {
  if (state.session.authenticated) return true;
  openAccountDialog("login");
  return false;
}

async function refreshSession() {
  const response = await fetch("/api/auth/me", { headers: { accept: "application/json" }, credentials: "same-origin" });
  state.session = await parseResponse(response);
  dispatchChange();
  return getAuthState();
}

async function submitAccountForm(event) {
  event.preventDefault();
  const dialog = $("#account-dialog");
  const mode = dialog.dataset.mode === "register" ? "register" : "login";
  const payload = {
    username: $("#account-username").value.trim(),
    password: $("#account-password").value,
    ...(mode === "register" ? {
      display_name: $("#account-display-name").value.trim(),
      ...(state.registrationRole === "teacher"
        ? { invitation_code: $("#account-teacher-invite")?.value ?? "" }
        : { join_code: $("#account-class-join")?.value ?? "" })
    } : {})
  };
  const errorLine = $("#account-error");
  try {
    $("#account-submit").disabled = true;
    const endpoint = mode === "register" ? `/api/auth/register/${state.registrationRole}` : "/api/auth/login";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(payload)
    });
    state.session = await parseResponse(response);
    if (state.session.recovery_code) {
      window.prompt("请立即保存一次性恢复码；系统不会再次显示。", state.session.recovery_code);
      delete state.session.recovery_code;
    }
    dialog.close();
    $("#account-password").value = "";
    dispatchChange();
  } catch (error) {
    errorLine.textContent = error.message;
  } finally {
    $("#account-submit").disabled = false;
  }
}

async function logout() {
  try {
    await parseResponse(await authFetch("/api/auth/logout", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" }));
  } finally {
    state.session = { authenticated: false, account: null, csrf_token: null, expires_at: null };
    dispatchChange();
  }
}

function openAccountSettings() {
  const dialog = $("#account-settings-dialog");
  if (!dialog || !state.session.authenticated) return;
  const account = state.session.account;
  $("#account-settings-summary").textContent = `${account.display_name} · @${account.username} · ${account.account_id} · 账户记录永久保存`;
  $("#account-settings-error").textContent = "";
  if (!dialog.open) dialog.showModal();
  $("#account-current-password")?.focus();
}

async function changePassword(event) {
  event.preventDefault();
  const errorLine = $("#account-settings-error");
  const button = $("#account-change-password");
  try {
    button.disabled = true;
    const response = await authFetch("/api/auth/password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        current_password: $("#account-current-password").value,
        new_password: $("#account-new-password").value
      })
    });
    await parseResponse(response);
    $("#account-current-password").value = "";
    $("#account-new-password").value = "";
    $("#account-settings-dialog").close();
  } catch (error) {
    errorLine.textContent = error.message;
  } finally {
    button.disabled = false;
  }
}

export async function initializeAccountUI() {
  if (state.initialized) return { session: getAuthState(), config: getPublicConfig() };
  state.initialized = true;
  $("#account-open-login")?.addEventListener("click", () => openAccountDialog("login", $("#account-open-register")?.dataset.accountRole ?? "student"));
  $("#account-open-register")?.addEventListener("click", (event) => openAccountDialog("register", event.currentTarget.dataset.accountRole ?? "student"));
  $("#account-logout")?.addEventListener("click", logout);
  $("#account-open-settings")?.addEventListener("click", openAccountSettings);
  $("#account-settings-close")?.addEventListener("click", () => $("#account-settings-dialog").close());
  $("#account-settings-form")?.addEventListener("submit", changePassword);
  $("#account-dialog-close")?.addEventListener("click", () => $("#account-dialog").close());
  $("#account-mode-toggle")?.addEventListener("click", () => openAccountDialog($("#account-dialog").dataset.mode === "register" ? "login" : "register", state.registrationRole));
  $("#account-form")?.addEventListener("submit", submitAccountForm);
  const [sessionResult, configResult] = await Promise.allSettled([
    refreshSession(),
    fetch("/api/config", { headers: { accept: "application/json" } }).then(parseResponse)
  ]);
  if (configResult.status === "fulfilled") state.config = configResult.value;
  if (sessionResult.status === "rejected") {
    state.session = { authenticated: false, account: null, csrf_token: null, expires_at: null };
    dispatchChange();
  }
  return { session: getAuthState(), config: getPublicConfig() };
}

export async function listStoredRuns({ limit = 100, offset = 0 } = {}) {
  return parseResponse(await authFetch(`/api/runs?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`));
}

export async function loadStoredRun(runId) {
  return parseResponse(await authFetch(`/api/runs/${encodeURIComponent(runId)}`));
}

export async function saveRunDecision(runId, review) {
  return parseResponse(await authFetch(`/api/runs/${encodeURIComponent(runId)}/decision`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(review)
  }));
}
