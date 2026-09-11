/* Lesson-local visual aids; content remains in slides.js. */
(() => {
  const lesson = window.INVESTMENT_COURSE.lesson;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const bi = text => String(text).split('\n').map(line => `<span class="${/[\u3400-\u9fff]/.test(line) ? 'smg-zh' : 'smg-en'}"${/[\u3400-\u9fff]/.test(line) ? ' lang="zh-Hans"' : ''}>${escape(line)}</span>`).join('');
  const paths = {
    person: '<circle cx="32" cy="17" r="9"/><path d="M15 54V43a17 17 0 0 1 34 0v11"/>',
    team: '<circle cx="22" cy="20" r="8"/><circle cx="44" cy="20" r="8"/><path d="M6 52V43a16 16 0 0 1 32 0v9M39 30a16 16 0 0 1 19 15v7"/>',
    notes: '<rect x="14" y="12" width="37" height="46" rx="4"/><rect x="24" y="6" width="17" height="12" rx="3"/><path d="m22 32 4 4 8-9M37 33h7M22 46h22"/>',
    research: '<circle cx="28" cy="27" r="17"/><path d="m40 40 16 16M23 20a6 6 0 1 1 7 9v6M30 39v1"/>',
    account: '<rect x="7" y="10" width="50" height="36" rx="3"/><path d="M22 57h20M32 46v11M17 34l9-10 10 5 12-11"/>'
  };
  const icon = name => `<svg class="smg-icon" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
  const slide = id => document.querySelector(`[data-slide-id="${id}"]`);
  const data = id => lesson.slides.find(s => s.id === id);
  slide('hero').querySelector('.hero-subtitle').innerHTML = bi(data('hero').subtitle);
  const gameVisuals = [
    '<div class="smg-starting-cash">$100,000<span>Virtual cash · 虚拟现金</span></div>',
    `${icon('account')}<span>Shares + funds<br>股票 + 基金</span>`,
    '<svg viewBox="0 0 220 70" role="img" aria-label="Market value can rise and fall / 市值可能上涨或下跌"><path d="M10 60H210M10 10V60" fill="none" stroke="#b8c8bc"/><path d="m12 49 27-12 27 9 27-27 27 14 27-19 28 14 32-17" fill="none" stroke="#32664c" stroke-width="3"/></svg>'
  ];
  slide('how-game-works').querySelectorAll('.form-card').forEach((card, i) => {
    card.querySelector('h2').innerHTML = bi(data('how-game-works').items[i][0].replace(' / ', '\n'));
    card.querySelector('p').innerHTML = bi(data('how-game-works').items[i][1]);
    const visual = document.createElement('div');
    visual.className = 'smg-game-visual';
    visual.innerHTML = gameVisuals[i];
    card.querySelector('h2').after(visual);
  });
  slide('team-investment-cycle').querySelectorAll('.flow-card').forEach((card, i) => {
    card.querySelector('p').innerHTML = bi(data('team-investment-cycle').steps[i][1]);
    const visual = document.createElement('div');
    visual.className = 'smg-card-icon';
    visual.innerHTML = icon(['research', 'team', 'account'][i]);
    card.querySelector('p').before(visual);
  });
  slide('form-teams').querySelectorAll('.form-card').forEach((card, index) => {
    card.querySelector('h2').innerHTML = bi(data('form-teams').items[index][0].replace(' / ', '\n'));
    card.querySelector('p').innerHTML = bi(data('form-teams').items[index][1]);
    const visual = document.createElement('div');
    visual.className = index ? 'smg-card-icon' : 'smg-teams';
    if (!index) {
      visual.setAttribute('role', 'img');
      visual.setAttribute('aria-label', 'Eight groups of three students: 24 students in total. 八组，每组三人，共24人。');
      visual.innerHTML = Array.from({length:8}, (_,i) => `<div class="smg-trio"><span>${i+1}</span><div>${icon('person').repeat(3)}</div></div>`).join('');
    } else visual.innerHTML = icon(index === 1 ? 'team' : 'notes');
    card.querySelector('h2').after(visual);
  });
  const roles = slide('team-roles');
  roles.querySelector('.table-context').innerHTML = bi(data('team-roles').context);
  roles.querySelectorAll('tbody tr').forEach((row,i) => {
    row.querySelector('th').innerHTML = `<div class="smg-role-label">${icon(['notes','research','account'][i])}<div>${bi(data('team-roles').rows[i][0])}</div></div>`;
    row.querySelector('td').innerHTML = bi(data('team-roles').rows[i][1]);
  });
  roles.querySelector('.table-interpretation').innerHTML = bi(data('team-roles').conclusion);
  roles.querySelector('thead th:last-child').textContent = 'Main job / 主要职责';
  const miniViews = [
    '<div class="smg-browser-bar">stockmarketgame.org</div><div class="smg-mini-site">The Stock Market Game<div class="smg-fake-button">Log In 登录</div></div>',
    '<div class="smg-field">Username 用户名<span>Use your team slip / 见本组登录条</span></div><div class="smg-field">Password 密码<span>••••••••</span></div>',
    '<div class="smg-site-nav">HOME 首页</div><div class="smg-info-tab">Account Info</div><div class="smg-summary-line">Total Equity<span>总资产</span></div><div class="smg-summary-line">Cash Balance<span>现金余额</span></div>'
  ];
  slide('weekend-login').querySelectorAll('.flow-card').forEach((card,i) => {
    card.querySelector('p').innerHTML = bi(data('weekend-login').steps[i][1]);
    const panel = document.createElement('div');
    panel.className = 'smg-mini-ui';
    panel.setAttribute('aria-label', 'Simplified field guide / 栏目示意');
    panel.innerHTML = miniViews[i];
    card.querySelector('p').before(panel);
  });
  slide('screenshot-example').querySelector('.slide-body').innerHTML = `
    <div class="smg-real-screen" role="img" aria-label="HOME screen guide: include your team ID under Account Info, Data as of, Total Equity and Cash Balance. 首页截图示意：包含本组账号、日期、总资产和现金余额。">
      <div class="smg-site-nav"><span>HOME</span><span>PORTFOLIO ▾</span><span>TRADE ▾</span><span>RESOURCES ▾</span><span>LOGOUT</span></div>
      <div class="smg-info-heading"><span class="smg-info-tab">Account Info</span></div>
      <div class="smg-site-info">
        <div class="smg-site-team"><div class="smg-capture-id"><span class="smg-guide-number">1</span> YOUR TEAM ID <span lang="zh-Hans">本组账号</span></div><div>Game Dates: 09/08/2026 to 04/09/2027</div><div>Trade Type: REALTIME</div><div>School: Suzhou Foreign Language School</div></div>
        <div class="smg-site-rankings"><div>Rankings</div><p><span>Region:</span><span>NOT RANKED</span></p><p><span>Coordinator:</span><span>NOT RANKED</span></p><p><span>State:</span><span>NOT RANKED</span></p></div>
      </div>
      <div class="smg-site-date"><span class="smg-guide-number">2</span> Data as of <span lang="zh-Hans">日期</span><span class="smg-date-field">MM/DD/YYYY</span><span class="smg-refresh">⟳</span></div>
      <div class="smg-site-balances">
        <div class="smg-required-balance"><h3><span class="smg-guide-number">3</span> Total Equity</h3><p lang="zh-Hans">总资产</p><span>Your value / 本组金额</span></div>
        <div><h3>Net Equity Gain</h3><p lang="zh-Hans">资产净增值</p><span>—</span></div>
        <div><h3>Buying Power</h3><p lang="zh-Hans">购买力</p><span>—</span></div>
        <div class="smg-required-balance"><h3><span class="smg-guide-number">4</span> Cash Balance</h3><p lang="zh-Hans">现金余额</p><span>Your value / 本组金额</span></div>
      </div>
    </div>
    <p class="smg-capture-caption">${bi('Include 1–4 with your own team details. “NOT RANKED” is fine; no trade is needed.\n截图包含①至④，显示本组实际信息。“NOT RANKED（暂无排名）”也可以，无需交易。')}</p>`;
  const last = data('weekend-checklist');
  slide(last.id).querySelector('.slide-body').innerHTML = `
    <div class="smg-deadline">${bi(last.context)}</div>
    <div class="smg-submit-grid">
      <div class="smg-message">
        <div class="smg-message-head">${bi(last.rows[0][0].replace(' / ', '\n'))}</div>
        <div class="smg-message-body"><small>Login result: success / error / no device</small><p lang="zh-Hans">${escape(last.rows[0][1]).replaceAll('\n','<br>')}</p><div class="smg-attachment">${icon('account')}<span>+ 1 HOME / Account Info screenshot<br><span lang="zh-Hans">附1张首页账户信息截图</span></span></div></div>
      </div>
      <div class="smg-screenshot-guide">
        <h2>${bi(last.rows[1][0].replace(' / ', '\n'))}</h2>
        <div class="smg-account-preview"><div class="smg-site-nav">HOME 首页 / Account Info 账户信息</div><div>Team ID 本组账号 <span>①</span></div><div>Data as of 日期 <span>②</span></div><div>Total Equity 总资产 <span>③</span></div><div>Cash Balance 现金余额 <span>④</span></div></div>
        <p>${bi('Report success or an access problem.\n逐人填写：成功／报错／暂无设备。')}</p>
      </div>
    </div>
    <p class="smg-no-trades">${bi(last.conclusion)}</p>`;
})();
