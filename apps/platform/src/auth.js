import "./platform-account-shell.js";

const platform = window.PlatformAuth;

function pageRole() {
  const path = location.pathname.toLowerCase();
  return path.includes("teacher") || path.includes("single") || path.includes("batch") ? "teacher" : "student";
}

export function getAuthState() {
  return platform.getSession();
}

export function getPublicConfig() {
  return platform.getConfig();
}

export function authFetch(url, options = {}) {
  return platform.authFetch(url, options);
}

export function openAccountDialog(mode = "login", role = pageRole()) {
  platform.open(mode, role);
}

export function ensureAuthenticated() {
  if (platform.getSession().authenticated) return true;
  platform.open("login", pageRole());
  return false;
}

export async function initializeAccountUI() {
  const mount = document.querySelector(".header-actions");
  return platform.initialize({ mount, locale: "zh", context: "econmark", roleHint: pageRole() });
}

export async function listStoredRuns({ limit = 100, offset = 0 } = {}) {
  return platform.parseResponse(await authFetch(`/api/runs?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`));
}

export async function loadStoredRun(runId) {
  return platform.parseResponse(await authFetch(`/api/runs/${encodeURIComponent(runId)}`));
}

export async function saveRunDecision(runId, review) {
  return platform.parseResponse(await authFetch(`/api/runs/${encodeURIComponent(runId)}/decision`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(review)
  }));
}
