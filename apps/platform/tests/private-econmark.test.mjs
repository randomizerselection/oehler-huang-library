import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createEconMarkServer } from '../server/app-server.mjs';

test('private EconMark protects routes and samples and requires invitations without removing existing accounts', async t => {
  const dataDir = await mkdtemp(join(tmpdir(), 'oh-private-econmark-'));
  const app = await createEconMarkServer({root: process.cwd(), env: {OH_DATA_DIR: dataDir, OH_ALLOW_LEGACY_REGISTRATION: 'true'}, gateway: {status: () => ({ready: false, roles: {}})}});
  await new Promise(resolve => app.server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${app.server.address().port}`;
  t.after(async () => {await new Promise(resolve => app.server.close(resolve)); app.accountStore.close(); app.platformStore.close(); await rm(dataDir, {recursive: true, force: true});});
  const get = (url, cookie) => fetch(base + url, {redirect:'manual', headers: cookie ? {cookie} : {}});
  const post = (url, body) => fetch(base + url, {method:'POST', headers:{'content-type':'application/json', origin:base}, body:JSON.stringify(body)});
  const config = await (await get('/api/config')).json();
  assert.equal(config.econmark_private, true);
  assert.equal(config.public_samples_enabled, false);
  assert.equal(config.class_join_required, true);
  for (const url of ['/', '/economics/index.html', '/platform/account-shell.js']) assert.equal((await get(url)).status, 200, url);
  for (const url of ['/econmark/', '/econmark/single', '/econmark/teacher', '/econmark/batch', '/econmark/batch.html']) {
    const response = await get(url);
    assert.equal(response.status, 302, url);
    assert.match(response.headers.get('location'), /^\/\?signin=1&next=/);
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }
  for (const url of ['/econmark/src/app.js','/econmark/src/demo-data.js','/src/demo-data.js','/econmark/assets/samples/weak.svg','/assets/samples/weak.svg','/api/providers/status','/api/student/assignments/ANYCODE1']) assert.equal((await get(url)).status, 401, url);
  for (const url of ['/single','/batch.html','/mark/single','/mark/src/demo-data.js']) {
    const legacy = await get(url);
    assert.equal(legacy.status,308,url);
    assert.ok([302,401].includes((await get(legacy.headers.get('location'))).status),url);
  }
  assert.equal((await post('/api/grade', {})).status,401);
  assert.equal((await post('/api/student/grade', {})).status,401);
  assert.equal((await post('/api/auth/register', {username:'bypass', password:'synthetic-password-123'})).status,410);
  const credentials = {username:'invited.student', password:'synthetic-password-123', class_name:'IC 1.1'};
  const noInvite = await post('/api/auth/register/student', credentials);
  assert.equal(noInvite.status,403);
  assert.equal((await noInvite.json()).error_code,'CLASS_INVITATION_REQUIRED');
  assert.equal((await post('/api/auth/register/student', {...credentials,join_code:'INVALID'})).status,404);
  assert.equal((await post('/api/auth/register/teacher', {...credentials,invitation_code:'INVALID'})).status,403);

  const admin = await app.platformStore.bootstrapAdmin({username:'private.admin',password:'synthetic-admin-123'});
  const invitation = app.platformStore.createTeacherInvitation(admin.account.account_id);
  const teacherResponse = await post('/api/auth/register/teacher', {username:'private.teacher',password:'synthetic-teacher-123',invitation_code:invitation.invitation_code});
  assert.equal(teacherResponse.status,201);
  const teacherCookie = teacherResponse.headers.get('set-cookie').split(';')[0];
  const teacher = await teacherResponse.json();
  const classroom = app.platformStore.createClass(teacher.account.account_id,{name:'Synthetic classroom'});
  app.platformStore.attestClassConsent(teacher.account.account_id,classroom.class_id,{statement_version:'synthetic-test-only'});
  const joinCode = app.platformStore.rotateJoinCode(teacher.account.account_id,classroom.class_id);
  const studentResponse = await post('/api/auth/register/student',{...credentials,join_code:joinCode.join_code});
  assert.equal(studentResponse.status,201);
  const studentCookie = studentResponse.headers.get('set-cookie').split(';')[0];
  assert.equal((await get('/econmark/',studentCookie)).status,200);
  assert.equal((await get('/econmark/src/student-app.js',studentCookie)).status,200);
  assert.equal((await get('/econmark/teacher',studentCookie)).status,403);
  assert.equal((await get('/econmark/%2e%2fbatch.html',studentCookie)).status,404);
  const teacherPage = await get('/econmark/single',teacherCookie);
  assert.equal(teacherPage.status,200);
  assert.match(await teacherPage.text(), /href="\/">学思札记<\/a>/);
  assert.equal((await get('/assets/samples/weak.svg',teacherCookie)).status,200);

  // An account created before private mode still signs in; no class invitation is retroactively required.
  await app.accountStore.register({username:'existing.student',password:'synthetic-existing-123',role:'student',class_name:'IC 1.1'});
  const existingLogin = await post('/api/auth/login',{username:'existing.student',password:'synthetic-existing-123'});
  assert.equal(existingLogin.status,200);
  const existingCookie = existingLogin.headers.get('set-cookie').split(';')[0];
  assert.equal((await get('/econmark/',existingCookie)).status,200);
});
