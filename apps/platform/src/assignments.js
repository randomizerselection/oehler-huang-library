import { authFetch } from "./auth.js";

async function parseResponse(response) {
  let value;
  try { value = await response.json(); } catch { value = {}; }
  if (!response.ok) {
    const error = new Error(value.message ?? `Request failed with ${response.status}.`);
    error.code = value.error_code ?? "REQUEST_FAILED";
    error.status = response.status;
    throw error;
  }
  return value;
}

export function listAssignments() {
  return authFetch("/api/assignments", { headers: { accept: "application/json" } }).then(parseResponse);
}

export function getAssignment(assignmentId) {
  return authFetch(`/api/assignments/${encodeURIComponent(assignmentId)}`, { headers: { accept: "application/json" } }).then(parseResponse);
}

export function createAssignment(payload) {
  return authFetch("/api/assignments", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  }).then(parseResponse);
}

export function updateAssignment(assignmentId, payload) {
  return authFetch(`/api/assignments/${encodeURIComponent(assignmentId)}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  }).then(parseResponse);
}

export function assignmentAction(assignmentId, action) {
  return authFetch(`/api/assignments/${encodeURIComponent(assignmentId)}/${action}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}"
  }).then(parseResponse);
}

export function listAssignmentSubmissions(assignmentId) {
  return authFetch(`/api/assignments/${encodeURIComponent(assignmentId)}/submissions`, { headers: { accept: "application/json" } }).then(parseResponse);
}

export function resolveAssignmentCode(code) {
  return fetch(`/api/student/assignments/${encodeURIComponent(String(code).trim().toUpperCase())}`, { headers: { accept: "application/json" } }).then(parseResponse);
}
