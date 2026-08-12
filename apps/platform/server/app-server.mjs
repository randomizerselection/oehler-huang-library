import { createHash, timingSafeEqual } from "node:crypto";
import { createReadStream, statfsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, relative as relativePath } from "node:path";
import { approveAutomaticResults } from "../src/batch-workflow.js";
import { applyTeacherReview } from "../src/invariants.js";
import { createAccountStore, AccountStoreError } from "./account-store.mjs";
import { resolveAppConfig } from "./app-config.mjs";
import { createGradingGateway } from "./grading-gateway.mjs";
import { createProviderClient } from "./provider-client.mjs";
import { resolveProviderPlan } from "./provider-config.mjs";
import { createSchemaRegistry } from "./schema-registry.mjs";
import { createPlatformStore, PlatformStoreError } from "./platform-store.mjs";
import { createContentCatalog } from "./content-catalog.mjs";
import {
  clearSessionCookie,
  clientIp,
  createRateLimiter,
  parseCookies,
  securityHeaders,
  sessionCookie
} from "./http-security.mjs";

const MIME = Object.freeze({
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".mp3": "audio/mpeg",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
});
const BLOCKED_STATIC_PREFIXES = ["server/", "config/", "scripts/", "node_modules/", "."];
const STATIC_ROUTE_ALIASES = Object.freeze({
  "/": "student.html",
  "/index.html": "student.html",
  "/batch": "batch.html",
  "/batch.html": "batch.html",
  "/teacher": "teacher.html",
  "/teacher.html": "teacher.html",
  "/student": "student.html",
  "/student.html": "student.html",
  "/single": "index.html",
  "/single.html": "index.html"
});

function secretMatches(expected, supplied) {
  if (!expected || !supplied) return false;
  const left = createHash("sha256").update(String(expected)).digest();
  const right = createHash("sha256").update(String(supplied)).digest();
  return timingSafeEqual(left, right);
}

class HttpError extends Error {
  constructor(message, code, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

function json(response, status, value, headers = {}) {
  response.writeHead(status, securityHeaders({
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...headers
  })).end(JSON.stringify(value));
}

async function readJson(request, maximumBytes) {
  if (!String(request.headers["content-type"] ?? "").toLowerCase().startsWith("application/json")) {
    throw new HttpError("Use application/json.", "CONTENT_TYPE_UNSUPPORTED", 415);
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maximumBytes) throw new HttpError("Request body is too large.", "REQUEST_TOO_LARGE", 413);
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new HttpError("Request body must be valid JSON.", "REQUEST_JSON_INVALID", 400);
  }
}

function assertSameOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return;
  try {
    if (new URL(origin).host !== request.headers.host) throw new Error("host mismatch");
  } catch {
    throw new HttpError("Cross-origin state changes are not allowed.", "ORIGIN_REJECTED", 403);
  }
}

function compactAccountSession(session, csrfToken) {
  return {
    authenticated: true,
    account: session.account,
    csrf_token: csrfToken,
    expires_at: session.expiresAt
  };
}

export async function createEconMarkServer({ root = process.cwd(), env = process.env, store: suppliedStore, platformStore: suppliedPlatformStore, gateway: suppliedGateway, storageStatus: suppliedStorageStatus } = {}) {
  const config = resolveAppConfig(env, root);
  function storageStatus() {
    if (suppliedStorageStatus) return suppliedStorageStatus();
    try {
      const stats = statfsSync(config.dataDir);
      const totalBytes = Number(stats.blocks) * Number(stats.bsize);
      const freeBytes = Number(stats.bavail) * Number(stats.bsize);
      const usedPercent = totalBytes ? Math.round(((totalBytes - freeBytes) / totalBytes) * 1000) / 10 : 0;
      return {
        total_bytes: totalBytes,
        free_bytes: freeBytes,
        used_percent: usedPercent,
        level: usedPercent >= config.diskUploadStopPercent ? "upload_stop" : usedPercent >= config.diskCriticalPercent ? "critical" : usedPercent >= config.diskWarnPercent ? "warning" : "normal",
        allowed: usedPercent < config.diskUploadStopPercent,
        uploads_allowed: usedPercent < config.diskUploadStopPercent
      };
    } catch {
      return { total_bytes: null, free_bytes: null, used_percent: null, level: "unknown", allowed: true, uploads_allowed: true };
    }
  }
  const accountStore = suppliedStore ?? createAccountStore({ ...config, uploadGuard: storageStatus });
  const platformStore = suppliedPlatformStore ?? createPlatformStore(config);
  const contentCatalog = createContentCatalog(config.libraryRoot);
  const providerPlan = resolveProviderPlan(env);
  const schemaRegistry = suppliedGateway ? null : await createSchemaRegistry(root);
  const gradingGateway = suppliedGateway ?? await createGradingGateway({
    root,
    plan: providerPlan,
    registry: schemaRegistry,
    completeJson: createProviderClient()
  });
  const loginLimiter = createRateLimiter({ maximum: config.loginAttemptsPer15Minutes, windowMs: 15 * 60 * 1000 });
  const gradeLimiter = createRateLimiter({ maximum: config.gradingRequestsPerHour, windowMs: 60 * 60 * 1000 });

  function sessionFromRequest(request) {
    const token = parseCookies(request.headers.cookie)[config.cookieName];
    const session = accountStore.sessionForToken(token);
    return { token, session };
  }

  function requireSession(request, { csrf = false } = {}) {
    const context = sessionFromRequest(request);
    if (!context.session) throw new HttpError("Please sign in to use uploads, grading, and permanent history.", "AUTH_REQUIRED", 401);
    if (csrf && !accountStore.csrfMatches(context.session, request.headers["x-csrf-token"])) {
      throw new HttpError("The session security token is missing or expired. Refresh and try again.", "CSRF_INVALID", 403);
    }
    return context;
  }

  function requireRole(request, role, options = {}) {
    const context = requireSession(request, options);
    const allowed = Array.isArray(role) ? role : [role];
    if (!allowed.includes(context.session.account.role)) {
      throw new HttpError(`${allowed.join(" or ")} access is required.`, "ROLE_FORBIDDEN", 403);
    }
    return context;
  }

  async function apiHandler(request, response, rawPath) {
    if (request.method === "GET" && rawPath === "/api/config") {
      json(response, 200, { ...config.public, storage: storageStatus(), schema_version: platformStore.migration.to });
      return true;
    }
    if (request.method === "GET" && rawPath === "/api/health") {
      json(response, 200, { status: "ok", storage: storageStatus(), schema_version: platformStore.migration.to, content_schema_version: contentCatalog.manifest().schema_version });
      return true;
    }
    if (request.method === "GET" && rawPath === "/api/content/manifest") {
      json(response, 200, contentCatalog.manifest(), { "cache-control": "public, max-age=300" });
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/auth/register/student") {
      assertSameOrigin(request);
      const rate = loginLimiter(clientIp(request));
      if (!rate.allowed) throw new HttpError("Too many registration attempts. Try again later.", "AUTH_RATE_LIMITED", 429);
      const created = await platformStore.registerStudent(await readJson(request, 64 * 1024));
      const session = accountStore.createSession(created.account.account_id, { userAgent: request.headers["user-agent"], ip: clientIp(request) });
      json(response, 201, { authenticated: true, account: created.account, csrf_token: session.csrfToken, expires_at: session.expiresAt, recovery_code: created.recovery_code, class: created.class }, { "set-cookie": sessionCookie(config, session.token, request, session.expiresAt) });
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/auth/register/teacher") {
      assertSameOrigin(request);
      const rate = loginLimiter(clientIp(request));
      if (!rate.allowed) throw new HttpError("Too many registration attempts. Try again later.", "AUTH_RATE_LIMITED", 429);
      const created = await platformStore.registerTeacher(await readJson(request, 64 * 1024));
      const session = accountStore.createSession(created.account.account_id, { userAgent: request.headers["user-agent"], ip: clientIp(request) });
      json(response, 201, { authenticated: true, account: created.account, csrf_token: session.csrfToken, expires_at: session.expiresAt, recovery_code: created.recovery_code }, { "set-cookie": sessionCookie(config, session.token, request, session.expiresAt) });
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/auth/recover") {
      assertSameOrigin(request);
      const rate = loginLimiter(clientIp(request));
      if (!rate.allowed) throw new HttpError("Too many recovery attempts. Try again later.", "AUTH_RATE_LIMITED", 429);
      json(response, 200, await platformStore.recoverAccount(await readJson(request, 64 * 1024)));
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/auth/recovery-code") {
      assertSameOrigin(request);
      const { session } = requireSession(request, { csrf: true });
      json(response, 200, platformStore.rotateRecoveryCode(session.account.account_id));
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/admin/teacher-invitations") {
      assertSameOrigin(request);
      const { session } = requireRole(request, "admin", { csrf: true });
      json(response, 201, platformStore.createTeacherInvitation(session.account.account_id, await readJson(request, 64 * 1024)));
      return true;
    }
    const adminResetMatch = rawPath.match(/^\/api\/admin\/accounts\/([^/]+)\/reset-password$/);
    if (request.method === "POST" && adminResetMatch) {
      assertSameOrigin(request);
      const { session } = requireRole(request, "admin", { csrf: true });
      const payload = await readJson(request, 64 * 1024);
      json(response, 200, await platformStore.adminResetPassword(session.account.account_id, decodeURIComponent(adminResetMatch[1]), payload.new_password));
      return true;
    }
    const deletionCompleteMatch = rawPath.match(/^\/api\/admin\/privacy\/([^/]+)\/complete$/);
    if (request.method === "POST" && deletionCompleteMatch) {
      assertSameOrigin(request);
      const { session } = requireRole(request, "admin", { csrf: true });
      json(response, 200, await platformStore.completeDeletion(session.account.account_id, decodeURIComponent(deletionCompleteMatch[1])));
      return true;
    }
    if (request.method === "GET" && rawPath === "/api/providers/status") {
      json(response, 200, gradingGateway.status());
      return true;
    }
    const publicAssignmentMatch = rawPath.match(/^\/api\/student\/assignments\/([^/]+)$/);
    if (request.method === "GET" && publicAssignmentMatch) {
      const assignment = accountStore.publishedAssignmentByCode(decodeURIComponent(publicAssignmentMatch[1]));
      if (!assignment) throw new HttpError("This assignment code is invalid, archived, or unavailable.", "STUDENT_ASSIGNMENT_NOT_FOUND", 404);
      json(response, 200, assignment);
      return true;
    }
    if (request.method === "GET" && rawPath === "/api/auth/me") {
      const { session } = sessionFromRequest(request);
      json(response, 200, session ? compactAccountSession(session, session.csrfToken) : { authenticated: false, account: null, csrf_token: null, expires_at: null });
      return true;
    }
    if (request.method === "POST" && ["/api/auth/register", "/api/auth/login"].includes(rawPath)) {
      assertSameOrigin(request);
      const rate = loginLimiter(clientIp(request));
      if (!rate.allowed) throw new HttpError("Too many sign-in attempts. Try again later.", "AUTH_RATE_LIMITED", 429);
      const payload = await readJson(request, 64 * 1024);
      if (rawPath.endsWith("register") && !config.allowLegacyRegistration) {
        throw new HttpError("Use class join registration or a teacher invitation.", "LEGACY_REGISTRATION_DISABLED", 410);
      }
      const requestedRole = payload.role === "teacher" ? "teacher" : "student";
      if (rawPath.endsWith("register") && requestedRole === "teacher" && !secretMatches(config.teacherInviteCode, payload.teacher_invite_code)) {
        throw new HttpError("A valid teacher invite code is required.", "TEACHER_INVITE_INVALID", 403);
      }
      const account = rawPath.endsWith("register")
        ? await accountStore.register({ ...payload, role: requestedRole })
        : await accountStore.authenticate(payload);
      const created = accountStore.createSession(account.account_id, {
        userAgent: request.headers["user-agent"],
        ip: clientIp(request)
      });
      json(response, rawPath.endsWith("register") ? 201 : 200, {
        authenticated: true,
        account,
        csrf_token: created.csrfToken,
        expires_at: created.expiresAt
      }, { "set-cookie": sessionCookie(config, created.token, request, created.expiresAt) });
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/auth/logout") {
      assertSameOrigin(request);
      const { token } = requireSession(request, { csrf: true });
      accountStore.endSession(token);
      json(response, 200, { authenticated: false }, { "set-cookie": clearSessionCookie(config, request) });
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/auth/password") {
      assertSameOrigin(request);
      const { session } = requireSession(request, { csrf: true });
      const payload = await readJson(request, 64 * 1024);
      await accountStore.changePassword(session.account.account_id, payload.current_password, payload.new_password);
      accountStore.endOtherSessions(session.account.account_id, session.sessionId);
      json(response, 200, { changed: true, other_sessions_revoked: true });
      return true;
    }
    if (request.method === "GET" && rawPath === "/api/classes") {
      const { session } = requireSession(request);
      json(response, 200, platformStore.listClasses(session.account));
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/classes") {
      assertSameOrigin(request);
      const { session } = requireRole(request, "teacher", { csrf: true });
      json(response, 201, platformStore.createClass(session.account.account_id, await readJson(request, 64 * 1024)));
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/classes/join") {
      assertSameOrigin(request);
      const { session } = requireRole(request, "student", { csrf: true });
      const payload = await readJson(request, 64 * 1024);
      json(response, 200, platformStore.joinClass(session.account.account_id, payload.join_code));
      return true;
    }
    const classConsentMatch = rawPath.match(/^\/api\/classes\/([^/]+)\/consent-attestation$/);
    if (request.method === "POST" && classConsentMatch) {
      assertSameOrigin(request);
      const { session } = requireRole(request, "teacher", { csrf: true });
      json(response, 200, platformStore.attestClassConsent(session.account.account_id, decodeURIComponent(classConsentMatch[1]), await readJson(request, 64 * 1024)));
      return true;
    }
    const classJoinCodeMatch = rawPath.match(/^\/api\/classes\/([^/]+)\/join-code$/);
    if (request.method === "POST" && classJoinCodeMatch) {
      assertSameOrigin(request);
      const { session } = requireRole(request, "teacher", { csrf: true });
      json(response, 200, platformStore.rotateJoinCode(session.account.account_id, decodeURIComponent(classJoinCodeMatch[1])));
      return true;
    }
    const classRosterMatch = rawPath.match(/^\/api\/classes\/([^/]+)\/roster$/);
    if (request.method === "GET" && classRosterMatch) {
      const { session } = requireRole(request, "teacher");
      json(response, 200, platformStore.roster(session.account.account_id, decodeURIComponent(classRosterMatch[1])));
      return true;
    }
    const learningAssignmentsMatch = rawPath.match(/^\/api\/classes\/([^/]+)\/assignments$/);
    if (request.method === "GET" && learningAssignmentsMatch) {
      const { session } = requireRole(request, "teacher");
      json(response, 200, platformStore.listClassAssignments(session.account.account_id, decodeURIComponent(learningAssignmentsMatch[1])));
      return true;
    }
    if (request.method === "POST" && learningAssignmentsMatch) {
      assertSameOrigin(request);
      const { session } = requireRole(request, "teacher", { csrf: true });
      json(response, 201, platformStore.createLearningAssignment(session.account.account_id, decodeURIComponent(learningAssignmentsMatch[1]), await readJson(request, 128 * 1024), contentCatalog));
      return true;
    }
    if (request.method === "GET" && rawPath === "/api/student/assignments") {
      const { session } = requireRole(request, "student");
      json(response, 200, platformStore.listStudentAssignments(session.account.account_id));
      return true;
    }
    const quizAttemptMatch = rawPath.match(/^\/api\/quizzes\/([^/]+)\/attempts$/);
    if (request.method === "POST" && quizAttemptMatch) {
      assertSameOrigin(request);
      const { session } = requireSession(request, { csrf: true });
      const definition = contentCatalog.quiz(decodeURIComponent(quizAttemptMatch[1]));
      if (!definition) throw new HttpError("Quiz was not found.", "QUIZ_NOT_FOUND", 404);
      const payload = await readJson(request, 256 * 1024);
      const result = contentCatalog.scoreQuiz(definition, payload.answers ?? {});
      json(response, 201, platformStore.saveQuizAttempt(session.account.account_id, definition, payload, result));
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/learning/events/batch") {
      assertSameOrigin(request);
      const { session } = requireSession(request, { csrf: true });
      const payload = await readJson(request, 512 * 1024);
      json(response, 202, platformStore.recordLearningEvents(session.account.account_id, payload.events));
      return true;
    }
    if (request.method === "GET" && rawPath === "/api/student/progress") {
      const { session } = requireRole(request, "student");
      json(response, 200, platformStore.studentProgress(session.account.account_id));
      return true;
    }
    const classProgressMatch = rawPath.match(/^\/api\/classes\/([^/]+)\/progress$/);
    if (request.method === "GET" && classProgressMatch) {
      const { session } = requireRole(request, "teacher");
      json(response, 200, platformStore.classProgress(session.account.account_id, decodeURIComponent(classProgressMatch[1])));
      return true;
    }
    if (request.method === "GET" && rawPath === "/api/selector/classes") {
      const { session } = requireRole(request, "teacher");
      json(response, 200, platformStore.selectorClasses(session.account.account_id));
      return true;
    }
    const selectorRosterMatch = rawPath.match(/^\/api\/selector\/classes\/([^/]+)\/roster$/);
    if (request.method === "GET" && selectorRosterMatch) {
      const { session } = requireRole(request, "teacher");
      json(response, 200, platformStore.roster(session.account.account_id, decodeURIComponent(selectorRosterMatch[1])));
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/selector/sessions") {
      assertSameOrigin(request);
      const { session } = requireRole(request, "teacher", { csrf: true });
      json(response, 201, platformStore.startSelectorSession(session.account.account_id, await readJson(request, 64 * 1024)));
      return true;
    }
    const selectorSessionMatch = rawPath.match(/^\/api\/selector\/sessions\/([^/]+)$/);
    if (request.method === "GET" && selectorSessionMatch) {
      const { session } = requireRole(request, "teacher");
      json(response, 200, platformStore.selectorSessionState(session.account.account_id, decodeURIComponent(selectorSessionMatch[1])));
      return true;
    }
    const selectorEventsMatch = rawPath.match(/^\/api\/selector\/sessions\/([^/]+)\/events\/batch$/);
    if (request.method === "POST" && selectorEventsMatch) {
      assertSameOrigin(request);
      const { session } = requireRole(request, "teacher", { csrf: true });
      json(response, 200, platformStore.recordSelectorEvents(session.account.account_id, decodeURIComponent(selectorEventsMatch[1]), await readJson(request, 256 * 1024)));
      return true;
    }
    const selectorCompleteMatch = rawPath.match(/^\/api\/selector\/sessions\/([^/]+)\/complete$/);
    if (request.method === "POST" && selectorCompleteMatch) {
      assertSameOrigin(request);
      const { session } = requireRole(request, "teacher", { csrf: true });
      const payload = await readJson(request, 64 * 1024);
      json(response, 200, platformStore.completeSelectorSession(session.account.account_id, decodeURIComponent(selectorCompleteMatch[1]), payload.status));
      return true;
    }
    const selectorReportMatch = rawPath.match(/^\/api\/selector\/classes\/([^/]+)\/report$/);
    if (request.method === "GET" && selectorReportMatch) {
      const { session } = requireRole(request, "teacher");
      json(response, 200, platformStore.selectorReport(session.account.account_id, decodeURIComponent(selectorReportMatch[1])));
      return true;
    }
    if (request.method === "GET" && rawPath === "/api/privacy/export") {
      const { session } = requireSession(request);
      json(response, 200, platformStore.privacyExport(session.account.account_id), { "content-disposition": `attachment; filename="oehler-huang-export-${session.account.account_id}.json"` });
      return true;
    }
    if (request.method === "PATCH" && rawPath === "/api/privacy/correction") {
      assertSameOrigin(request);
      const { session } = requireSession(request, { csrf: true });
      json(response, 200, platformStore.correctAccount(session.account.account_id, await readJson(request, 64 * 1024)));
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/privacy/deletion-request") {
      assertSameOrigin(request);
      const { session } = requireSession(request, { csrf: true });
      json(response, 202, platformStore.requestDeletion(session.account.account_id, await readJson(request, 64 * 1024)));
      return true;
    }
    if (request.method === "GET" && rawPath === "/api/runs") {
      const { session } = requireSession(request);
      const url = new URL(request.url, "http://localhost");
      json(response, 200, accountStore.listRuns(session.account.account_id, {
        limit: url.searchParams.get("limit"),
        offset: url.searchParams.get("offset")
      }));
      return true;
    }
    const runMatch = rawPath.match(/^\/api\/runs\/([^/]+)$/);
    if (request.method === "GET" && runMatch) {
      const { session } = requireSession(request);
      const stored = accountStore.getRunForActor(decodeURIComponent(runMatch[1]), session.account);
      if (!stored) throw new HttpError("Stored result was not found.", "RUN_NOT_FOUND", 404);
      json(response, 200, stored);
      return true;
    }
    const decisionMatch = rawPath.match(/^\/api\/runs\/([^/]+)\/decision$/);
    if (request.method === "POST" && decisionMatch) {
      assertSameOrigin(request);
      const { session } = requireRole(request, "teacher", { csrf: true });
      const runId = decodeURIComponent(decisionMatch[1]);
      const stored = accountStore.getRunForActor(runId, session.account);
      if (!stored) throw new HttpError("Stored result was not found.", "RUN_NOT_FOUND", 404);
      const review = await readJson(request, 64 * 1024);
      const { persistence: _persistence, ...workflow } = stored;
      workflow.output = applyTeacherReview(workflow.output, review);
      const updated = accountStore.updateWorkflowForActor(runId, session.account, workflow);
      if (!updated) throw new HttpError("Stored result was not found.", "RUN_NOT_FOUND", 404);
      json(response, 200, updated);
      return true;
    }
    const imageMatch = rawPath.match(/^\/api\/images\/([^/]+)$/);
    if (request.method === "GET" && imageMatch) {
      const { session } = requireSession(request);
      const image = accountStore.getImageForActor(decodeURIComponent(imageMatch[1]), session.account);
      response.writeHead(200, securityHeaders({
        "content-type": image.mime_type,
        "content-length": String(image.byte_size),
        "content-disposition": `inline; filename*=UTF-8''${encodeURIComponent(image.original_name)}`,
        "cache-control": "private, no-store",
        "x-content-type-options": "nosniff"
      }));
      image.stream().pipe(response);
      return true;
    }
    if (request.method === "GET" && rawPath === "/api/assignments") {
      const { session } = requireRole(request, "teacher");
      json(response, 200, accountStore.listAssignments(session.account.account_id));
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/assignments") {
      assertSameOrigin(request);
      const { session } = requireRole(request, "teacher", { csrf: true });
      const payload = await readJson(request, 64 * 1024);
      json(response, 201, accountStore.createAssignment(session.account.account_id, payload));
      return true;
    }
    const assignmentMatch = rawPath.match(/^\/api\/assignments\/([^/]+)$/);
    if (request.method === "GET" && assignmentMatch) {
      const { session } = requireRole(request, "teacher");
      const assignment = accountStore.getAssignment(decodeURIComponent(assignmentMatch[1]), session.account.account_id);
      if (!assignment) throw new HttpError("Assignment was not found.", "ASSIGNMENT_NOT_FOUND", 404);
      json(response, 200, assignment);
      return true;
    }
    if (request.method === "PATCH" && assignmentMatch) {
      assertSameOrigin(request);
      const { session } = requireRole(request, "teacher", { csrf: true });
      const payload = await readJson(request, 64 * 1024);
      json(response, 200, accountStore.updateAssignment(decodeURIComponent(assignmentMatch[1]), session.account.account_id, payload));
      return true;
    }
    const assignmentActionMatch = rawPath.match(/^\/api\/assignments\/([^/]+)\/(publish|revise|archive)$/);
    if (request.method === "POST" && assignmentActionMatch) {
      assertSameOrigin(request);
      const { session } = requireRole(request, "teacher", { csrf: true });
      const assignmentId = decodeURIComponent(assignmentActionMatch[1]);
      const action = assignmentActionMatch[2];
      const value = action === "publish"
        ? accountStore.publishAssignment(assignmentId, session.account.account_id)
        : action === "revise"
          ? accountStore.reviseAssignment(assignmentId, session.account.account_id)
          : accountStore.archiveAssignment(assignmentId, session.account.account_id);
      json(response, action === "revise" ? 201 : 200, value);
      return true;
    }
    const assignmentSubmissionsMatch = rawPath.match(/^\/api\/assignments\/([^/]+)\/submissions$/);
    if (request.method === "GET" && assignmentSubmissionsMatch) {
      const { session } = requireRole(request, "teacher");
      const items = accountStore.listAssignmentSubmissions(session.account.account_id, decodeURIComponent(assignmentSubmissionsMatch[1]));
      if (!items) throw new HttpError("Assignment was not found.", "ASSIGNMENT_NOT_FOUND", 404);
      json(response, 200, items);
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/student/grade") {
      assertSameOrigin(request);
      const { session } = requireRole(request, "student", { csrf: true });
      const rate = gradeLimiter(session.account.account_id);
      if (!rate.allowed) throw new HttpError("This account has reached the configured hourly grading limit.", "GRADING_RATE_LIMITED", 429);
      const payload = await readJson(request, config.maxRequestBytes);
      const assignment = accountStore.assignmentByCodeForGrading(String(payload.assignment_code ?? ""));
      if (!assignment) throw new HttpError("This assignment is unavailable or has closed.", "STUDENT_ASSIGNMENT_NOT_FOUND", 404);
      const gradingPayload = {
        run_id: payload.run_id,
        mode: "account_upload",
        approval_mode: "teacher_review",
        assignment_id: assignment.assignment_id,
        student_ref: String(payload.student_ref ?? session.account.username).trim().slice(0, 80) || session.account.username,
        answer_name: payload.answer_name,
        answer_mime_type: payload.answer_mime_type,
        answer_data_url: payload.answer_data_url,
        assignment: {
          assignment_id: assignment.assignment_id,
          question_text: assignment.question_text,
          command_word: assignment.command_word,
          max_mark: assignment.max_mark,
          mark_scheme_text: assignment.mark_scheme_text,
          teacher_confirmed: true
        }
      };
      const existing = gradingPayload.run_id ? accountStore.getRun(String(gradingPayload.run_id), session.account.account_id) : null;
      if (existing) {
        json(response, 200, existing);
        return true;
      }
      accountStore.validatePayloadUpload(gradingPayload, "student");
      const workflow = await gradingGateway.grade(gradingPayload);
      json(response, 200, await accountStore.persistWorkflow({
        accountId: session.account.account_id,
        payload: gradingPayload,
        workflow
      }));
      return true;
    }
    if (request.method === "POST" && rawPath === "/api/grade") {
      assertSameOrigin(request);
      const { session } = requireRole(request, "teacher", { csrf: true });
      const rate = gradeLimiter(session.account.account_id);
      if (!rate.allowed) throw new HttpError("This account has reached the configured hourly grading limit.", "GRADING_RATE_LIMITED", 429);
      const payload = await readJson(request, config.maxRequestBytes);
      if (payload.batch_mode && !String(payload.batch_id ?? "").trim()) {
        throw new HttpError("Batch grading requires a stable batch_id.", "BATCH_ID_REQUIRED", 400);
      }
      if (payload.approval_mode && !["teacher_review", "full_auto"].includes(payload.approval_mode)) {
        throw new HttpError("approval_mode must be teacher_review or full_auto.", "APPROVAL_MODE_INVALID", 400);
      }
      const assignment = accountStore.assignmentForGrading(String(payload.assignment_id ?? ""), session.account.account_id);
      if (!assignment) throw new HttpError("Select an owned published assignment before grading.", "ASSIGNMENT_NOT_FOUND", 404);
      payload.assignment = {
        assignment_id: assignment.assignment_id,
        question_text: assignment.question_text,
        command_word: assignment.command_word,
        max_mark: assignment.max_mark,
        mark_scheme_text: assignment.mark_scheme_text,
        teacher_confirmed: true
      };
      const existing = payload.run_id ? accountStore.getRun(String(payload.run_id), session.account.account_id) : null;
      if (existing) {
        json(response, 200, existing);
        return true;
      }
      accountStore.validatePayloadUpload(payload, "teacher");
      let workflow = await gradingGateway.grade(payload);
      if (payload.approval_mode === "full_auto") {
        workflow = approveAutomaticResults([{ status: "completed", workflow }])[0].workflow;
      }
      json(response, 200, await accountStore.persistWorkflow({
        accountId: session.account.account_id,
        payload,
        workflow
      }));
      return true;
    }
    return false;
  }

  const server = createServer(async (request, response) => {
    const rawPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    try {
      if (rawPath.startsWith("/api/") && await apiHandler(request, response, rawPath)) return;
      if (rawPath.startsWith("/api/")) {
        json(response, 404, { error_code: "API_ROUTE_NOT_FOUND", message: "API route not found." });
        return;
      }
      const legacyRedirects = {
        "/teacher": "/mark/teacher", "/teacher.html": "/mark/teacher",
        "/student": "/mark/", "/student.html": "/mark/",
        "/single": "/mark/single", "/single.html": "/mark/single",
        "/batch": "/mark/batch", "/batch.html": "/mark/batch"
      };
      if (legacyRedirects[rawPath]) {
        response.writeHead(308, securityHeaders({ location: legacyRedirects[rawPath], "cache-control": "no-store" })).end();
        return;
      }
      if (rawPath === "/student-selector" || rawPath === "/student-selector/" || rawPath === "/student-selector/index.html") {
        response.writeHead(308, securityHeaders({ location: "/selector/", "cache-control": "no-store" })).end();
        return;
      }

      let staticRoot = config.libraryRoot;
      let relative = rawPath.replace(/^\/+/, "");
      let protectedSelector = false;
      if (rawPath === "/selector" || rawPath.startsWith("/selector/")) {
        const { session } = sessionFromRequest(request);
        if (!session) {
          const next = encodeURIComponent(rawPath);
          response.writeHead(302, securityHeaders({ location: `/?signin=1&next=${next}`, "cache-control": "no-store" })).end();
          return;
        }
        if (session.account.role !== "teacher") throw new HttpError("Teacher access is required.", "ROLE_FORBIDDEN", 403);
        staticRoot = config.selectorRoot;
        protectedSelector = true;
        relative = rawPath.replace(/^\/selector\/?/, "") || "index.html";
      } else if (rawPath.startsWith("/student-selector/")) {
        staticRoot = config.selectorRoot;
        relative = rawPath.replace(/^\/student-selector\//, "");
      } else if (rawPath === "/mark" || rawPath.startsWith("/mark/")) {
        staticRoot = root;
        const markPath = rawPath.replace(/^\/mark\/?/, "");
        relative = STATIC_ROUTE_ALIASES[`/${markPath}`] ?? (markPath || "student.html");
      } else if (rawPath.startsWith("/src/")) {
        staticRoot = root;
      } else if (rawPath === "/") {
        relative = "index.html";
      }
      if (relative.endsWith("/")) relative += "index.html";
      if (staticRoot === config.selectorRoot && /(?:^|\/)assets\/students\.csv$/i.test(relative)) {
        response.writeHead(404, securityHeaders({ "content-type": "text/plain; charset=utf-8" })).end("Not found");
        return;
      }
      if (BLOCKED_STATIC_PREFIXES.some((prefix) => relative.startsWith(prefix)) || /(?:^|\/)(?:tests?|docs?|archive|generated\/quiz-bank\.json)(?:\/|$)/i.test(relative) || /(?:^|\/)(?:package(?:-lock)?\.json|AGENTS\.md|README\.md|CNAME)$/i.test(relative)) {
        response.writeHead(404, securityHeaders({ "content-type": "text/plain; charset=utf-8" })).end("Not found");
        return;
      }
      const filePath = normalize(join(staticRoot, relative));
      const rootRelative = relativePath(staticRoot, filePath);
      if (rootRelative.startsWith("..") || rootRelative.includes(":")) {
        response.writeHead(403, securityHeaders()).end("Forbidden");
        return;
      }
      const info = await stat(filePath);
      if (!info.isFile()) throw new Error("Not a file");
      if (staticRoot === config.libraryRoot && extname(filePath).toLowerCase() === ".html") {
        let html = await readFile(filePath, "utf8");
        if (!html.includes("/assets/js/platform-shell.js")) html = html.replace(/<\/head>/i, "  <script src=\"/assets/js/platform-shell.js?v=20260812.1\" defer></script>\n</head>");
        response.writeHead(200, securityHeaders({
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=300",
          "content-security-policy": "default-src 'self'; img-src 'self' blob: data:; media-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
        })).end(html);
        return;
      }
      if (staticRoot === root && extname(filePath).toLowerCase() === ".html") {
        const html = (await readFile(filePath, "utf8"))
          .replaceAll('href="/single.html', 'href="/mark/single')
          .replaceAll('href="/single"', 'href="/mark/single"')
          .replaceAll('href="/batch"', 'href="/mark/batch"')
          .replaceAll('href="/teacher"', 'href="/mark/teacher"')
          .replaceAll('href="/"', 'href="/mark/"');
        response.writeHead(200, securityHeaders({
          "content-type": "text/html; charset=utf-8",
          "cache-control": "private, no-store",
          "content-security-policy": "default-src 'self'; img-src 'self' blob: data:; media-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
        })).end(html);
        return;
      }
      response.writeHead(200, securityHeaders({
        "content-type": MIME[extname(filePath).toLowerCase()] ?? "application/octet-stream",
        "cache-control": protectedSelector || staticRoot === root ? "private, no-store" : "public, max-age=300",
        "content-security-policy": "default-src 'self'; img-src 'self' blob: data:; media-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
      }));
      createReadStream(filePath).pipe(response);
    } catch (error) {
      if (rawPath.startsWith("/api/") || error instanceof HttpError || error instanceof AccountStoreError || error instanceof PlatformStoreError) {
        json(response, Number(error.status ?? 500), {
          error_code: error.code ?? "INTERNAL_ERROR",
          message: error.status ? error.message : "The Oehler-Huang platform encountered an internal error."
        });
      } else {
        response.writeHead(404, securityHeaders({ "content-type": "text/plain; charset=utf-8" })).end("Not found");
      }
    }
  });

  return Object.freeze({
    server,
    config,
    accountStore,
    platformStore,
    contentCatalog,
    gradingGateway,
    close() {
      server.close();
      accountStore.close?.();
      platformStore.close?.();
    }
  });
}
