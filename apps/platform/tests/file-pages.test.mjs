import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { request as rawRequest } from 'node:http';
import { createEconMarkServer } from '../server/app-server.mjs';
import { filePagesAllowed, filePageCorsHeaders } from '../server/http-security.mjs';

function raw({ port, method = 'GET', path = '/', headers = {}, body = '' }) {
  return new Promise((resolve, reject) => {
    const req = rawRequest({ host: '127.0.0.1', port, method, path, headers }, (response) => {
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
    req.end(body);
  });
}

// Lesson decks opened from disk (file://, Origin: null) may use the platform API
// when the server runs on loopback; hosted deployments stay strict.
test('file:// lesson pages can sign in on loopback but not on public hosts', async t => {
  const dataDir = await mkdtemp(join(tmpdir(), 'oh-file-pages-'));
  const app = await createEconMarkServer({ root: process.cwd(), env: { OH_DATA_DIR: dataDir }, gateway: { status: () => ({ ready: false, roles: {} }) } });
  await new Promise(resolve => app.server.listen(0, '127.0.0.1', resolve));
  const port = app.server.address().port;
  const loopbackHost = `127.0.0.1:${port}`;
  t.after(async () => { await new Promise(resolve => app.server.close(resolve)); app.accountStore.close(); app.platformStore.close(); await rm(dataDir, { recursive: true, force: true }); });

  // Host gating logic: loopback allows file pages, public hosts never do.
  const fakeRequest = (origin, host) => ({ headers: { origin, host } });
  assert.equal(filePagesAllowed(app.config, fakeRequest('null', loopbackHost)), true);
  assert.equal(filePagesAllowed(app.config, fakeRequest('null', 'localhost:4173')), true);
  assert.equal(filePagesAllowed(app.config, fakeRequest('null', 'oehlerhuang.com')), false);
  assert.equal(filePagesAllowed(app.config, fakeRequest('https://evil.example', loopbackHost)), false);
  assert.equal(filePageCorsHeaders(app.config, fakeRequest('null', 'oehlerhuang.com')), null);

  // Preflight on loopback: credentialed CORS for file pages.
  const preflight = await raw({
    port, method: 'OPTIONS', path: '/api/auth/login',
    headers: { origin: 'null', host: loopbackHost, 'access-control-request-method': 'POST', 'access-control-request-headers': 'content-type, x-csrf-token' }
  });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers['access-control-allow-origin'], 'null');
  assert.equal(preflight.headers['access-control-allow-credentials'], 'true');
  assert.match(preflight.headers['access-control-allow-headers'] || '', /x-csrf-token/);

  // Preflight from a file page on a public host: no CORS allowance, no bypass.
  const publicPreflight = await raw({
    port, method: 'OPTIONS', path: '/api/auth/login',
    headers: { origin: 'null', host: 'oehlerhuang.com', 'access-control-request-method': 'POST' }
  });
  assert.notEqual(publicPreflight.headers['access-control-allow-origin'], 'null');

  const admin = await app.platformStore.bootstrapAdmin({ username: 'file.admin', password: 'synthetic-admin-123' });
  const invitation = app.platformStore.createTeacherInvitation(admin.account.account_id);

  // Registration from a file page on loopback succeeds and issues a cross-site cookie.
  const register = await raw({
    port, method: 'POST', path: '/api/auth/register/teacher',
    headers: { 'content-type': 'application/json', origin: 'null', host: loopbackHost },
    body: JSON.stringify({ username: 'file.teacher', password: 'synthetic-teacher-123', display_name: 'File Teacher', invitation_code: invitation.invitation_code })
  });
  assert.equal(register.status, 201);
  assert.equal(register.headers['access-control-allow-origin'], 'null');
  const cookie = [].concat(register.headers['set-cookie'] || []).join('\n');
  assert.match(cookie, /SameSite=None/);
  assert.match(cookie, /Secure/);
  const teacher = JSON.parse(register.body);

  // The same file-page state change on a public host name stays rejected.
  const rejected = await raw({
    port, method: 'POST', path: '/api/auth/login',
    headers: { 'content-type': 'application/json', origin: 'null', host: 'oehlerhuang.com' },
    body: JSON.stringify({ username: 'file.teacher', password: 'synthetic-teacher-123' })
  });
  assert.equal(rejected.status, 403);
  assert.equal(JSON.parse(rejected.body).error_code, 'ORIGIN_REJECTED');
  assert.equal(rejected.headers['access-control-allow-origin'], undefined);

  // Session-protected selector APIs answer credentialed file-page requests.
  const cookiePair = cookie.split(';')[0];
  const classes = await raw({ port, path: '/api/selector/classes', headers: { origin: 'null', host: loopbackHost, cookie: cookiePair } });
  assert.equal(classes.status, 200);
  assert.equal(classes.headers['access-control-allow-origin'], 'null');

  // Selector session writes still require the CSRF token from the session payload.
  const classroom = app.platformStore.createClass(teacher.account.account_id, { name: 'File Class' });
  app.platformStore.attestClassConsent(teacher.account.account_id, classroom.class_id, { statement_version: 'synthetic-test-only' });
  const joinCode = app.platformStore.rotateJoinCode(teacher.account.account_id, classroom.class_id);
  await app.platformStore.registerStudent({ username: 'file.student', password: 'synthetic-student-123', display_name: 'File Student', join_code: joinCode.join_code });
  const noCsrf = await raw({
    port, method: 'POST', path: '/api/selector/sessions',
    headers: { 'content-type': 'application/json', origin: 'null', host: loopbackHost, cookie: cookiePair },
    body: JSON.stringify({ class_id: classroom.class_id })
  });
  assert.equal(noCsrf.status, 403);
  const withCsrf = await raw({
    port, method: 'POST', path: '/api/selector/sessions',
    headers: { 'content-type': 'application/json', origin: 'null', host: loopbackHost, cookie: cookiePair, 'x-csrf-token': teacher.csrf_token },
    body: JSON.stringify({ class_id: classroom.class_id })
  });
  assert.equal(withCsrf.status, 201);

  // OH_ALLOW_FILE_PAGES=0 turns the loopback allowance off entirely.
  const offDir = await mkdtemp(join(tmpdir(), 'oh-file-pages-off-'));
  const strict = await createEconMarkServer({ root: process.cwd(), env: { OH_DATA_DIR: offDir, OH_ALLOW_FILE_PAGES: '0' }, gateway: { status: () => ({ ready: false, roles: {} }) } });
  await new Promise(resolve => strict.server.listen(0, '127.0.0.1', resolve));
  t.after(async () => { await new Promise(resolve => strict.server.close(resolve)); strict.accountStore.close(); strict.platformStore.close(); await rm(offDir, { recursive: true, force: true }); });
  const strictPort = strict.server.address().port;
  const denied = await raw({
    port: strictPort, method: 'OPTIONS', path: '/api/auth/login',
    headers: { origin: 'null', host: `127.0.0.1:${strictPort}`, 'access-control-request-method': 'POST' }
  });
  assert.equal(denied.headers['access-control-allow-origin'], undefined);
  assert.equal(filePagesAllowed(strict.config, fakeRequest('null', `127.0.0.1:${strictPort}`)), false);
});
