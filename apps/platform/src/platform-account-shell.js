(function () {
  if (window.PlatformAuth) return;

  const anonymous = () => ({ authenticated: false, account: null, csrf_token: null, expires_at: null });
  const state = {
    session: anonymous(),
    config: { student_classes: [], teacher_registration_enabled: false, platform_base_path: '/econmark' },
    ready: null,
    elements: new Set(),
    pending: new Set(),
    activeElement: null
  };

  const COPY = {
    en: {
      signIn: 'Sign in', create: 'Create account', account: 'Account', settings: 'Account settings', logout: 'Log out',
      student: 'Student', teacher: 'Teacher', username: 'Username', password: 'Password', displayName: 'Display name',
      className: 'Class', chooseClass: 'Choose class', invite: 'Teacher invite code', currentPassword: 'Current password',
      newPassword: 'New password', save: 'Save changes', changePassword: 'Change password', cancel: 'Close', loading: 'Please wait…',
      loginTitle: 'Sign in to your learning account', registerTitle: 'Create your learning account', settingsTitle: 'Account settings',
      loginHelp: 'One account works across EconMark, Economics and Investment.',
      registerHelp: 'Students choose a class. Teachers need the school invite code.',
      profileHelp: 'Your current class is saved on future quiz attempts; earlier results keep their original class.',
      wrongTitle: 'This area needs a different account', switchAccount: 'Switch account',
      studentRequired: 'Student access is required to mark and submit this quiz.',
      teacherRequired: 'Teacher access is required for notes and school-wide results.',
      classRequired: 'Choose your class before continuing.', history: 'Quiz history', gradebook: 'Teacher gradebook',
      loginInstead: 'Already have an account? Sign in', registerInstead: 'Need an account? Create one',
      saved: 'Account settings saved.', passwordChanged: 'Password changed. Other sessions were signed out.',
      retry: 'Try again'
    },
    zh: {
      signIn: '登录', create: '创建账户', account: '账户', settings: '账户设置', logout: '退出',
      student: '学生', teacher: '教师', username: '用户名', password: '密码', displayName: '显示名称',
      className: '班级', chooseClass: '选择班级', invite: '教师邀请码', currentPassword: '当前密码',
      newPassword: '新密码', save: '保存更改', changePassword: '更改密码', cancel: '关闭', loading: '请稍候…',
      loginTitle: '登录统一学习账户', registerTitle: '创建统一学习账户', settingsTitle: '账户设置',
      loginHelp: '同一账户可用于 EconMark、经济学与投资课程。',
      registerHelp: '学生必须选择班级；教师注册需要学校邀请码。',
      profileHelp: '今后的测验会保存当时的班级；以前的记录不会随资料更改。',
      wrongTitle: '此区域需要另一种账户', switchAccount: '切换账户',
      studentRequired: '测验评分与提交需要学生账户。', teacherRequired: '教师笔记与全校成绩需要教师账户。',
      classRequired: '继续前请先选择班级。', history: '测验记录', gradebook: '教师成绩册',
      loginInstead: '已有账户？登录', registerInstead: '没有账户？创建一个',
      saved: '账户设置已保存。', passwordChanged: '密码已更改，其他会话已退出。', retry: '重试'
    }
  };

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  async function parseResponse(response) {
    let value = {};
    try { value = await response.json(); } catch (_error) { /* empty response */ }
    if (!response.ok) {
      const error = new Error(value.message || `Request failed with status ${response.status}.`);
      error.code = value.error_code || 'REQUEST_FAILED';
      error.status = response.status;
      throw error;
    }
    return value;
  }

  function dispatchChange() {
    state.elements.forEach((element) => element.renderChip());
    const detail = clone(state.session);
    window.dispatchEvent(new CustomEvent('platform:authchange', { detail }));
    window.dispatchEvent(new CustomEvent('econmark:authchange', { detail }));
    for (const request of [...state.pending]) {
      const account = state.session.account;
      if (state.session.authenticated && account?.role === request.role && (request.role !== 'student' || account.class_name)) {
        state.pending.delete(request);
        request.resolve(clone(state.session));
      }
    }
  }

  async function refresh() {
    try {
      const [session, config] = await Promise.all([
        fetch('/api/auth/me', { credentials: 'same-origin', headers: { accept: 'application/json' } }).then(parseResponse),
        fetch('/api/config', { credentials: 'same-origin', headers: { accept: 'application/json' } }).then(parseResponse)
      ]);
      state.session = session;
      state.config = config;
    } catch (_error) {
      state.session = anonymous();
    }
    dispatchChange();
    return { session: clone(state.session), config: clone(state.config) };
  }

  async function authFetch(url, options = {}) {
    const method = String(options.method || 'GET').toUpperCase();
    const headers = new Headers(options.headers || {});
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && state.session.csrf_token) headers.set('x-csrf-token', state.session.csrf_token);
    const response = await fetch(url, { ...options, method, headers, credentials: 'same-origin' });
    if (response.status === 401) {
      state.session = anonymous();
      dispatchChange();
    }
    return response;
  }

  class PlatformAccount extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.mode = 'login';
      this.requiredRole = this.getAttribute('role-hint') === 'teacher' ? 'teacher' : 'student';
      this.message = '';
      this.busy = false;
    }

    connectedCallback() {
      state.elements.add(this);
      this.renderBase();
      this.renderChip();
    }

    disconnectedCallback() { state.elements.delete(this); }

    get locale() { return this.getAttribute('locale') === 'zh' ? 'zh' : 'en'; }
    get text() { return COPY[this.locale]; }

    renderBase() {
      this.shadowRoot.innerHTML = `
        <style>
          :host{display:inline-flex;align-items:center;max-width:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;color:#173b35;line-height:1.35}
          *{box-sizing:border-box}button,input,select{font:inherit}button{cursor:pointer}
          .chip{display:flex;align-items:center;gap:7px;max-width:100%}.button{min-height:38px;border:1px solid #bfd0ca;border-radius:999px;padding:8px 13px;background:#fff;color:#174f45;font-size:12px;font-weight:800;white-space:nowrap}.button.primary{border-color:#174f45;background:#174f45;color:#fff}.button:hover{filter:brightness(.97)}
          .identity{display:flex;align-items:center;gap:8px;min-width:0;border:1px solid #c9d8d3;border-radius:999px;padding:4px 5px 4px 11px;background:rgba(255,255,255,.94);box-shadow:0 4px 18px rgba(20,63,55,.08)}.identity-copy{display:grid;min-width:0}.identity-copy strong{overflow:hidden;max-width:132px;text-overflow:ellipsis;white-space:nowrap;font-size:12px}.identity-copy small{color:#627870;font-size:9px}.avatar{width:30px;height:30px;border:0;border-radius:50%;background:#e4efe9;color:#174f45;font-weight:900}
          dialog{width:min(520px,calc(100vw - 28px));max-height:min(760px,calc(100dvh - 28px));padding:0;border:1px solid #c8d8d2;border-radius:20px;background:#fbfaf5;color:#173b35;box-shadow:0 28px 90px rgba(8,32,28,.34);overflow:auto}dialog::backdrop{background:rgba(7,28,25,.66);backdrop-filter:blur(4px)}
          .modal{display:grid;gap:18px;padding:25px}.heading{display:flex;align-items:flex-start;justify-content:space-between;gap:18px}.eyebrow{margin:0 0 6px;color:#a05b26;font-size:10px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}.heading h2{margin:0;font:600 clamp(24px,5vw,31px)/1.1 Georgia,serif;color:#123f3b}.close{width:36px;height:36px;border:1px solid #ccd9d5;border-radius:50%;background:#fff;color:#174f45;font-size:22px}.help{margin:0;color:#5d716b;font-size:12px;line-height:1.55}.role-tabs{display:grid;grid-template-columns:1fr 1fr;gap:7px;padding:5px;border-radius:13px;background:#e9efeb}.role-tabs button{min-height:38px;border:0;border-radius:10px;background:transparent;color:#526b64;font-weight:800}.role-tabs button.active{background:#fff;color:#174f45;box-shadow:0 2px 8px rgba(18,63,59,.1)}
          form{display:grid;gap:13px}.field{display:grid;gap:6px}.field span{font-size:11px;font-weight:800;color:#34534c}.field input,.field select{width:100%;min-height:45px;border:1px solid #c2d1cc;border-radius:11px;background:#fff;padding:10px 12px;color:#173b35}.field input:focus,.field select:focus{outline:3px solid rgba(44,126,104,.18);border-color:#2c7e68}.actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.submit{min-height:44px;border:0;border-radius:11px;padding:11px 18px;background:#174f45;color:#fff;font-weight:900}.submit[disabled]{opacity:.58;cursor:wait}.link{border:0;background:transparent;color:#176f5d;font-size:11px;font-weight:850;padding:8px}.error{min-height:18px;margin:0;color:#a02e26;font-size:11px}.success{color:#17643f}.divider{height:1px;background:#dce5e1}.account-card{display:grid;grid-template-columns:auto 1fr;gap:11px;align-items:center;padding:13px;border:1px solid #d3dfda;border-radius:14px;background:#fff}.account-card .avatar-static{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:#e2eee8;font-weight:900}.account-card strong,.account-card small{display:block}.account-card small{color:#637870;font-size:10px}.mismatch{padding:14px;border:1px solid #e6c8ad;border-radius:13px;background:#fff7ed;color:#73411d}.footer-links{display:flex;flex-wrap:wrap;gap:8px}.footer-links a{color:#176f5d;font-size:11px;font-weight:800}
          @media(max-width:560px){:host{max-width:140px}.button.secondary{display:none}.identity{padding-left:8px}.identity-copy strong{max-width:72px}.identity-copy small{display:none}.modal{padding:20px}.actions{display:grid}.submit{width:100%}.link{text-align:left}.role-tabs{grid-template-columns:1fr 1fr}}
        </style>
        <div class="chip" part="chip"></div>
        <dialog aria-labelledby="platform-account-title"></dialog>
      `;
      this.shadowRoot.querySelector('dialog').addEventListener('close', () => {
        for (const request of [...state.pending]) {
          if (request.element === this) { state.pending.delete(request); request.resolve(null); }
        }
      });
    }

    renderChip() {
      if (!this.shadowRoot) return;
      const chip = this.shadowRoot.querySelector('.chip');
      const t = this.text;
      const account = state.session.account;
      if (!state.session.authenticated) {
        chip.innerHTML = `<button class="button" data-open="login">${t.signIn}</button><button class="button primary secondary" data-open="register">${t.create}</button>`;
      } else {
        const initial = String(account.display_name || account.username || 'A').trim().charAt(0).toUpperCase();
        const roleLine = account.role === 'admin' ? 'Administrator' : account.role === 'teacher' ? t.teacher : `${t.student}${account.class_name ? ` · ${account.class_name}` : ''}`;
        chip.innerHTML = `<div class="identity"><span class="identity-copy"><strong>${this.escape(account.display_name || account.username)}</strong><small>${this.escape(roleLine)}</small></span><button class="avatar" data-open="settings" aria-label="${t.settings}">${this.escape(initial)}</button></div>`;
      }
      chip.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => this.open(button.dataset.open, this.requiredRole)));
    }

    escape(value) { return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character])); }

    open(mode = 'login', role = this.requiredRole, message = '') {
      this.mode = mode;
      this.requiredRole = role === 'teacher' ? 'teacher' : 'student';
      this.message = message;
      state.activeElement = this;
      this.renderModal();
      const dialog = this.shadowRoot.querySelector('dialog');
      if (!dialog.open) dialog.showModal();
      queueMicrotask(() => this.shadowRoot.querySelector('input,select,button')?.focus());
    }

    renderModal() {
      const dialog = this.shadowRoot.querySelector('dialog');
      const t = this.text;
      const account = state.session.account;
      const classes = state.config.student_classes || [];
      const classOptions = classes.map((name) => `<option value="${this.escape(name)}" ${account?.class_name === name ? 'selected' : ''}>${this.escape(name)}</option>`).join('');
      let content = '';
      if (this.mode === 'settings') {
        const initial = String(account?.display_name || account?.username || 'A').trim().charAt(0).toUpperCase();
        content = `
          <div class="account-card"><span class="avatar-static">${this.escape(initial)}</span><span><strong>${this.escape(account?.display_name || '')}</strong><small>@${this.escape(account?.username || '')} · ${account?.role === 'admin' ? 'Administrator' : account?.role === 'teacher' ? t.teacher : t.student}</small></span></div>
          <form data-form="profile">
            <label class="field"><span>${t.displayName}</span><input name="display_name" required maxlength="80" value="${this.escape(account?.display_name || '')}"></label>
            ${account?.role === 'student' ? `<label class="field"><span>${t.className}</span><select name="class_name" required><option value="">${t.chooseClass}</option>${classOptions}</select></label>` : ''}
            <p class="help">${t.profileHelp}</p><p class="error" data-error></p>
            <div class="actions"><button class="submit" type="submit">${t.save}</button></div>
          </form>
          <div class="divider"></div>
          <form data-form="password">
            <label class="field"><span>${t.currentPassword}</span><input name="current_password" type="password" required minlength="10" maxlength="128" autocomplete="current-password"></label>
            <label class="field"><span>${t.newPassword}</span><input name="new_password" type="password" required minlength="10" maxlength="128" autocomplete="new-password"></label>
            <p class="error" data-error></p><div class="actions"><button class="submit" type="submit">${t.changePassword}</button></div>
          </form>
          <div class="footer-links">
            ${account?.role === 'student' ? `<a href="/econmark/?tab=quizzes">${t.history}</a><button class="link" type="button" data-action="join-class">Join a teacher class</button>` : ''}
            ${account?.role === 'teacher' ? `<a href="/econmark/teacher?tab=quizzes">${t.gradebook}</a><button class="link" type="button" data-action="manage-classes">Manage classes</button><a href="/selector/">Student selector</a>` : ''}
            ${account?.role === 'admin' ? '<button class="link" type="button" data-action="teacher-invite">Create teacher invitation</button>' : ''}
            <a href="/api/privacy/export" download>Export my data</a>
            <button class="link" type="button" data-action="logout">${t.logout}</button>
          </div>`;
      } else if (this.mode === 'mismatch') {
        content = `<div class="mismatch"><strong>${t.wrongTitle}</strong><p>${this.escape(this.message || (this.requiredRole === 'teacher' ? t.teacherRequired : t.studentRequired))}</p></div><div class="actions"><button class="submit" type="button" data-action="switch">${t.switchAccount}</button></div>`;
      } else {
        const register = this.mode === 'register';
        content = `
          ${register ? `<div class="role-tabs" role="tablist"><button type="button" data-role="student" class="${this.requiredRole === 'student' ? 'active' : ''}">${t.student}</button><button type="button" data-role="teacher" class="${this.requiredRole === 'teacher' ? 'active' : ''}">${t.teacher}</button></div>` : ''}
          <form data-form="auth">
            ${register ? `<label class="field"><span>${t.displayName}</span><input name="display_name" required maxlength="80" autocomplete="name"></label>` : ''}
            <label class="field"><span>${t.username}</span><input name="username" required minlength="3" maxlength="60" autocomplete="username"></label>
            <label class="field"><span>${t.password}</span><input name="password" type="password" required minlength="10" maxlength="128" autocomplete="${register ? 'new-password' : 'current-password'}"></label>
            ${register && this.requiredRole === 'student' ? `<label class="field"><span>${t.className}</span><select name="class_name" required><option value="">${t.chooseClass}</option>${classOptions}</select></label>` : ''}
            ${register && this.requiredRole === 'teacher' ? `<label class="field"><span>${t.invite}</span><input name="invitation_code" type="password" required maxlength="160"></label>` : ''}
            <p class="error" data-error>${this.escape(this.message)}</p>
            <div class="actions"><button class="submit" type="submit">${register ? t.create : t.signIn}</button><button class="link" type="button" data-action="toggle">${register ? t.loginInstead : t.registerInstead}</button></div>
          </form>`;
      }
      const title = this.mode === 'settings' ? t.settingsTitle : this.mode === 'register' ? t.registerTitle : this.mode === 'mismatch' ? t.wrongTitle : t.loginTitle;
      const help = this.mode === 'register' ? t.registerHelp : this.mode === 'login' ? t.loginHelp : '';
      dialog.innerHTML = `<section class="modal"><header class="heading"><div><p class="eyebrow">EconMark · Oehler-Huang Library</p><h2 id="platform-account-title">${title}</h2></div><button class="close" type="button" data-action="close" aria-label="${t.cancel}">×</button></header>${help ? `<p class="help">${help}</p>` : ''}${content}</section>`;
      this.bindModal();
    }

    bindModal() {
      const dialog = this.shadowRoot.querySelector('dialog');
      dialog.querySelector('[data-action="close"]')?.addEventListener('click', () => dialog.close());
      dialog.querySelector('[data-action="toggle"]')?.addEventListener('click', () => { this.mode = this.mode === 'register' ? 'login' : 'register'; this.message = ''; this.renderModal(); });
      dialog.querySelectorAll('[data-role]').forEach((button) => button.addEventListener('click', () => { this.requiredRole = button.dataset.role; this.renderModal(); }));
      dialog.querySelector('[data-action="logout"]')?.addEventListener('click', () => this.logout());
      dialog.querySelector('[data-action="switch"]')?.addEventListener('click', async () => { await this.logout(false); this.open('login', this.requiredRole); });
      dialog.querySelector('[data-action="teacher-invite"]')?.addEventListener('click', () => this.createTeacherInvitation());
      dialog.querySelector('[data-action="join-class"]')?.addEventListener('click', () => this.joinTeacherClass());
      dialog.querySelector('[data-action="manage-classes"]')?.addEventListener('click', () => this.manageClasses());
      dialog.querySelector('[data-form="auth"]')?.addEventListener('submit', (event) => this.submitAuth(event));
      dialog.querySelector('[data-form="profile"]')?.addEventListener('submit', (event) => this.submitProfile(event));
      dialog.querySelector('[data-form="password"]')?.addEventListener('submit', (event) => this.submitPassword(event));
    }

    setFormState(form, busy, message = '', success = false) {
      form.querySelectorAll('button,input,select').forEach((control) => { control.disabled = busy; });
      const error = form.querySelector('[data-error]');
      if (error) { error.textContent = message; error.classList.toggle('success', success); }
    }

    async submitAuth(event) {
      event.preventDefault();
      const form = event.currentTarget;
      const data = Object.fromEntries(new FormData(form));
      const register = this.mode === 'register';
      const payload = register ? { ...data, role: this.requiredRole } : data;
      this.setFormState(form, true, this.text.loading);
      try {
        const endpoint = register ? `/api/auth/register/${this.requiredRole}` : '/api/auth/login';
        state.session = await parseResponse(await fetch(endpoint, {
          method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload)
        }));
        if (state.session.recovery_code) {
          window.prompt('Save this one-time recovery code. It will not be shown again.', state.session.recovery_code);
          delete state.session.recovery_code;
        }
        dispatchChange();
        if (state.session.account?.role !== this.requiredRole && state.pending.size) {
          this.mode = 'mismatch'; this.message = this.requiredRole === 'teacher' ? this.text.teacherRequired : this.text.studentRequired; this.renderModal(); return;
        }
        if (state.session.account?.role === 'student' && !state.session.account.class_name) { this.mode = 'settings'; this.message = this.text.classRequired; this.renderModal(); return; }
        this.shadowRoot.querySelector('dialog').close();
        const next = new URLSearchParams(location.search).get('next');
        if (next?.startsWith('/') && !next.startsWith('//') && !state.pending.size) location.assign(next);
      } catch (error) { this.setFormState(form, false, error.message); }
    }

    async submitProfile(event) {
      event.preventDefault();
      const form = event.currentTarget;
      const payload = Object.fromEntries(new FormData(form));
      const shouldResume = [...state.pending].some((request) => request.element === this);
      this.setFormState(form, true, this.text.loading);
      try {
        const value = await parseResponse(await authFetch('/api/account/profile', { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }));
        state.session.account = value.account;
        dispatchChange();
        if (shouldResume) {
          this.shadowRoot.querySelector('dialog')?.close();
        } else {
          this.renderModal();
          this.setFormState(this.shadowRoot.querySelector('[data-form="profile"]'), false, this.text.saved, true);
        }
      } catch (error) { this.setFormState(form, false, error.message); }
    }

    async submitPassword(event) {
      event.preventDefault();
      const form = event.currentTarget;
      const payload = Object.fromEntries(new FormData(form));
      this.setFormState(form, true, this.text.loading);
      try {
        await parseResponse(await authFetch('/api/auth/password', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }));
        form.reset(); this.setFormState(form, false, this.text.passwordChanged, true);
      } catch (error) { this.setFormState(form, false, error.message); }
    }

    async createTeacherInvitation() {
      try {
        const value = await parseResponse(await authFetch('/api/admin/teacher-invitations', {
          method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ expires_hours: 72 })
        }));
        window.prompt('Teacher invitation code (valid for 72 hours)', value.invitation_code);
      } catch (error) {
        this.message = error.message;
        this.renderModal();
      }
    }

    async joinTeacherClass() {
      const joinCode = window.prompt('Class join code');
      if (!joinCode) return;
      try {
        await parseResponse(await authFetch('/api/classes/join', {
          method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ join_code: joinCode })
        }));
        window.alert('Class joined.');
      } catch (error) {
        window.alert(error.message);
      }
    }

    async manageClasses() {
      const dialog = this.shadowRoot.querySelector('dialog');
      try {
        const value = await parseResponse(await authFetch('/api/classes'));
        const items = value.items || [];
        dialog.innerHTML = `<section class="modal"><header class="heading"><div><p class="eyebrow">Teacher tools</p><h2 id="platform-account-title">Classes</h2></div><button class="close" type="button" data-action="close" aria-label="Close">×</button></header>
          <form data-form="create-class"><label class="field"><span>Class name</span><input name="name" required maxlength="80"></label><div class="actions"><button class="submit" type="submit">Create class</button></div><p class="error" data-error></p></form>
          <div>${items.map((item) => `<article class="account-card"><span><strong>${this.escape(item.name)}</strong><small>${item.enrollment_enabled ? 'Enrollment enabled' : 'Authorization and join code required'}</small></span><span class="actions"><button class="link" type="button" data-consent="${this.escape(item.class_id)}">Attest authorization</button><button class="link" type="button" data-code="${this.escape(item.class_id)}">New join code</button></span></article>`).join('') || '<p class="help">No teacher classes yet.</p>'}</div></section>`;
        dialog.querySelector('[data-action="close"]')?.addEventListener('click', () => dialog.close());
        dialog.querySelector('[data-form="create-class"]')?.addEventListener('submit', async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          try {
            await parseResponse(await authFetch('/api/classes', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) }));
            await this.manageClasses();
          } catch (error) { this.setFormState(form, false, error.message); }
        });
        dialog.querySelectorAll('[data-consent]').forEach((button) => button.addEventListener('click', async () => {
          await parseResponse(await authFetch(`/api/classes/${encodeURIComponent(button.dataset.consent)}/consent-attestation`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ statement_version: 'school-authorization-v1' }) }));
          await this.manageClasses();
        }));
        dialog.querySelectorAll('[data-code]').forEach((button) => button.addEventListener('click', async () => {
          const created = await parseResponse(await authFetch(`/api/classes/${encodeURIComponent(button.dataset.code)}/join-code`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' }));
          window.prompt('New class join code', created.join_code);
          await this.manageClasses();
        }));
      } catch (error) {
        window.alert(error.message);
      }
    }

    async logout(close = true) {
      try { await parseResponse(await authFetch('/api/auth/logout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' })); } catch (_error) { /* local state still clears */ }
      state.session = anonymous(); dispatchChange();
      if (close) this.shadowRoot.querySelector('dialog')?.close();
    }
  }

  customElements.define('platform-account', PlatformAccount);

  function initialize(options = {}) {
    const mount = options.mount || document.querySelector('[data-platform-account]') || document.querySelector('.header-actions') || document.querySelector('nav') || document.body;
    let element = options.element || mount?.querySelector?.('platform-account');
    if (!element && mount) {
      element = document.createElement('platform-account');
      mount.append(element);
    }
    if (element) {
      element.setAttribute('locale', options.locale === 'zh' ? 'zh' : 'en');
      element.setAttribute('context', options.context || 'library');
      element.setAttribute('role-hint', options.roleHint === 'teacher' ? 'teacher' : 'student');
      element.requiredRole = options.roleHint === 'teacher' ? 'teacher' : 'student';
    }
    if (!state.ready) state.ready = refresh();
    return state.ready;
  }

  function activeElement(options = {}) {
    return options.element || state.activeElement || [...state.elements][0] || null;
  }

  async function requireRole(role, options = {}) {
    await initialize(options);
    const required = role === 'teacher' ? 'teacher' : 'student';
    const element = activeElement(options);
    const account = state.session.account;
    if (state.session.authenticated && account?.role === required && (required !== 'student' || account.class_name)) return clone(state.session);
    return new Promise((resolve) => {
      const request = { role: required, resolve, element };
      state.pending.add(request);
      if (!element) { state.pending.delete(request); resolve(null); return; }
      if (!state.session.authenticated) element.open('login', required, options.message || '');
      else if (account?.role !== required) element.open('mismatch', required, options.message || '');
      else element.open('settings', required, options.message || element.text.classRequired);
    });
  }

  window.PlatformAuth = Object.freeze({
    initialize,
    refresh,
    authFetch,
    parseResponse,
    getSession: () => clone(state.session),
    getConfig: () => clone(state.config),
    open(mode = 'login', role = 'student', options = {}) { activeElement(options)?.open(mode, role, options.message || ''); },
    requireRole,
    createAttemptId() {
      const token = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      return `attempt_${token}`;
    }
  });
})();
