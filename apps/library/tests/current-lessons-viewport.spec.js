const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
const { readFile } = require('node:fs/promises');
const lessons = [
  ['investment-analysis/lessons/1-1-2-measuring-investment-return', '#deck', '.deck-controls', '#fullscreenButton', '#slideStatus'],
  ['investment-analysis/lessons/1-1-3-compound-growth', '#deck', '.deck-controls', '#fullscreenButton', '#slideStatus'],
  ['a-level/lessons/9-1-1-multiplier', '#stage', '.controls', '#fullscreen', '#status'],
  ['a-level/lessons/9-1-2-aggregate-demand', '#stage', '.controls', '#fullscreen', '#status'],
];

for (const [route] of [...lessons, ['lessons/unit-1-basic-economic-problem/1-1-basic-economic-problem']]) {
  test(`@smoke @responsive shared navigation and grouped overview: ${route}`, async ({ page }) => {
    await prepareLessonSelector(page, null);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://lesson.test/${route}/index.html`);
    const nav = page.locator('.lesson-navigation');
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('button', { name: /selector/i })).toBeVisible();
    const box = await nav.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width);
    expect(box.height).toBeLessThanOrEqual(60);
    await page.keyboard.press('o');
    const dialog = page.locator('.lesson-overview');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('input')).toHaveValue('');
    expect(await dialog.locator('h3').count()).toBeGreaterThan(1);
    await expect(dialog.locator('[aria-current="step"]')).toHaveAttribute('data-go', '0');
    const before = page.url();
    await dialog.locator('[data-close]').focus();
    await page.keyboard.press('ArrowRight');
    expect(page.url()).toBe(before);
    await dialog.locator('input').fill('not-a-slide-xyz');
    await expect(dialog.getByRole('status')).toHaveText('No slides match your search.');
    await dialog.locator('input').fill('');
    const section = await dialog.locator('h3').nth(1).textContent();
    await dialog.locator('input').fill(section);
    await expect(dialog.locator('h3')).toHaveCount(1);
    const target = await dialog.locator('[data-go]').first().getAttribute('data-go');
    await dialog.locator('[data-go]').first().click();
    await expect(dialog).not.toBeVisible();
    await expect(nav.getByRole('button', { name: 'Overview', exact: true })).toBeFocused();
    await page.keyboard.press('o');
    await expect(dialog.locator('[aria-current="step"]')).toHaveAttribute('data-go', target);
    await page.keyboard.press('Escape');
    await nav.locator('summary').click();
    await expect(nav.getByRole('link', { name: 'Library index', exact: true })).toHaveAttribute('href', 'http://lesson.test/index.html');
    await expect(nav.getByRole('link', { name: /course|Business index/i })).toHaveCount(1);
    await expect(nav.getByRole('button', { name: /Notes/ })).toBeVisible();
    await expect(nav.getByRole('button', { name: 'Fullscreen', exact: true })).toBeVisible();
    await nav.getByRole('button', { name: 'Hide controls', exact: true }).click();
    await expect(nav).toHaveCSS('opacity', '0');
    await page.keyboard.press('Tab');
    await expect(nav).toHaveCSS('opacity', '1');
    expect(errors).toEqual([]);
  });
}

async function expectLargestCanvas(page, selector) {
  const viewport = await page.evaluate(() => ({ width: innerWidth, height: innerHeight }));
  const width = Math.min(viewport.width, viewport.height * 16 / 9);
  const height = width * 9 / 16;
  const canvas = await page.locator(selector).boundingBox();
  expect(Math.abs(canvas.width - width)).toBeLessThan(1);
  expect(Math.abs(canvas.height - height)).toBeLessThan(1);
  expect(Math.abs(canvas.x - (viewport.width - width) / 2)).toBeLessThan(1);
  expect(Math.abs(canvas.y - (viewport.height - height) / 2)).toBeLessThan(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.documentElement.scrollHeight <= innerHeight)).toBe(true);
}

// Exercise the real selector runtime with synthetic teacher data, without a
// production account or public roster files.
async function prepareLessonSelector(page, role = 'teacher', failFirstLoad = false) {
  await page.route('https://hm.baidu.com/**', route => route.fulfill({ contentType: 'text/javascript', body: '' }));
  let runtimeRequests = 0;
  await page.route('https://randomizerselection.github.io/studentselector/assets/students.csv', route => route.fulfill({
    contentType: 'text/csv', body: 'Class,Student\nSynthetic classroom,Synthetic student\n'
  }));
  await page.route('http://lesson.test/**', async route => {
    const pathname = new URL(route.request().url()).pathname;
    if (pathname === '/student-selector/selector.js') {
      runtimeRequests++;
      if (failFirstLoad && runtimeRequests === 1) return route.abort();
    }
    const file = pathname.startsWith('/student-selector/')
      ? path.join(root, '..', pathname.slice(1))
      : path.join(root, pathname.slice(1));
    const contentType = ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.csv': 'text/csv' })[path.extname(file)];
    try { await route.fulfill({ body: await readFile(file), ...(contentType ? { contentType } : {}) }); }
    catch { await route.fulfill({ status: 404, body: 'Not found' }); }
  });
  await page.addInitScript(role => {
    window.selectorCalls = [];
    window.OHPlatform = {
      ready: async () => {},
      session: { account: role ? { role } : null },
      content: { id: 'a-level:test-lesson' },
      openAccountDialog: mode => window.selectorCalls.push({ login: mode }),
      selectorAdapters: context => ({
        dataAdapter: {
          listClasses: async () => ({ items: [{ class_id: 'test-class', name: 'Synthetic A Level' }] }),
          loadRoster: async () => ({ students: [{ account_id: 'test-student', display_name: 'Synthetic student' }] })
        },
        sessionAdapter: {
          start: async value => {
            window.selectorCalls.push({ context, session: value });
            return { session_id: 'test-session', class_id: value.class_id, status: 'active', version: 1 };
          }
        }
      })
    };
  }, role);
  return () => runtimeRequests;
}

test('@smoke Economics classroom selector stays open without sign-in', async ({ page }) => {
  await prepareLessonSelector(page, null);
  await page.goto('http://lesson.test/lessons/unit-1-basic-economic-problem/1-1-basic-economic-problem/index.html');
    await page.mouse.move(10, 10);
  await page.locator('[data-student-selector]').click();
  await expect(page.locator('.selector-class-select option')).toContainText(['Select a Class', 'Synthetic classroom']);
  await expect(page.locator('[data-student-selector]')).toBeVisible();
  await expect(page.locator('[data-student-selector]')).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => window.selectorCalls)).toEqual([]);
});

for (const [route, trigger] of [
  ['a-level/lessons/9-1-1-multiplier', '#studentSelectorButton'],
  ['a-level/lessons/9-1-2-aggregate-demand', '#studentSelectorButton'],
  ['investment-analysis/lessons/1-1-2-measuring-investment-return', '#studentSelectorButton'],
  ['investment-analysis/lessons/1-1-3-compound-growth', '#studentSelectorButton'],
  ['lessons/unit-1-basic-economic-problem/1-1-basic-economic-problem', '[data-student-selector]']
]) {
  test(`@smoke selector loading, retry, cached reopen and close button: ${route}`, async ({ page }) => {
    await prepareLessonSelector(page, null);
    let requests = 0, release;
    const delayed = new Promise(resolve => { release = resolve; });
    await page.route('https://randomizerselection.github.io/studentselector/assets/students.csv', async route => {
      requests++;
      if (requests === 1) {
        await delayed;
        return route.fulfill({ status: 503, body: 'Temporarily unavailable' });
      }
      await route.fulfill({ contentType: 'text/csv', body: 'Class,Student\nSynthetic classroom,Synthetic student\n' });
    });
    await page.goto(`http://lesson.test/${route}/index.html`);
    await page.mouse.move(10, 10);
    await page.locator(trigger).click();
    await expect(page.locator('.selector-brand')).toContainText('Loading classes');
    await expect(page.locator('.selector-class-select')).toBeDisabled();
    await expect(page.getByRole('button', { name: 'START SELECTION', exact: true })).toBeDisabled();
    release();
    await expect(page.getByRole('alert')).toContainText('Check your connection');
    await page.getByRole('button', { name: 'Try again', exact: true }).click();
    await page.locator('.selector-class-select').selectOption('Synthetic classroom');
    await expect(page.getByRole('alert')).toHaveCount(0);
    // Match the platform account dock that previously intercepted Close clicks.
    await page.evaluate(() => {
      const account = document.createElement('button');
      account.id = 'test-account'; account.textContent = 'Sign in';
      account.style.cssText = 'position:fixed;right:12px;top:12px;width:200px;height:40px;z-index:1200';
      account.onclick = () => { account.dataset.clicked = 'true'; };
      document.body.append(account);
    });
    await page.getByRole('button', { name: 'Close student selector', exact: true }).click();
    await expect(page.locator('.studentSelectorSidePanel')).toHaveCount(0);
    await expect(page.locator('#test-account')).not.toHaveAttribute('data-clicked');
    await expect(page.locator(trigger)).toBeFocused();
    await page.locator('#test-account').evaluate(element => element.remove());
    await page.locator(trigger).click();
    await expect(page.locator('.selector-class-select')).toHaveValue('Synthetic classroom');
    expect(requests).toBe(2);
    await page.keyboard.press('Escape');
    await expect(page.locator('.studentSelectorSidePanel')).toHaveCount(0);
  });
}

test('@smoke closing a selector during loading does not revive its detached UI', async ({ page }) => {
  await prepareLessonSelector(page, null);
  let release, requests = 0;
  const delayed = new Promise(resolve => { release = resolve; });
  await page.route('https://randomizerselection.github.io/studentselector/assets/students.csv', async route => {
    requests++;
    await delayed;
    await route.fulfill({ contentType: 'text/csv', body: 'Class,Student\nSynthetic classroom,Synthetic student\n' });
  });
  await page.goto('http://lesson.test/a-level/lessons/9-1-1-multiplier/index.html');
    await page.mouse.move(10, 10);
  await page.locator('#studentSelectorButton').click();
  await expect(page.locator('.selector-root')).toHaveAttribute('aria-busy', 'true');
  await page.evaluate(() => { window.detachedSelector = document.querySelector('.selector-root'); });
  await page.keyboard.press('Escape');
  await expect(page.locator('.studentSelectorSidePanel')).toHaveCount(0);
  await page.locator('#studentSelectorButton').click();
  release();
  await expect(page.locator('.selector-class-select option')).toHaveCount(2);
  expect(requests).toBe(1);
  expect(await page.evaluate(() => window.detachedSelector.innerHTML)).toBe('');
});

test('@smoke selector controls fit a 720p classroom screen', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop classroom viewport.');
  await prepareLessonSelector(page, null);
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://lesson.test/a-level/lessons/9-1-1-multiplier/index.html');
    await page.mouse.move(10, 10);
  await page.locator('#studentSelectorButton').click();
  await page.locator('.selector-class-select').selectOption('Synthetic classroom');
  const reset = await page.getByRole('button', { name: 'Reset Current Class', exact: true }).boundingBox();
  expect(reset.y + reset.height).toBeLessThanOrEqual(720);
  await expect(page.locator('.studentSelectorSidePanel')).toBeVisible();
});

for (const [route] of lessons) {
  test(`@smoke lesson selector loads teacher classes and reopens: ${route}`, async ({ page }) => {
    const requests = await prepareLessonSelector(page);
    await page.goto(`http://lesson.test/${route}/index.html?class=test-class&assignment=test-assignment`);
    await page.mouse.move(10, 10);
    await page.locator('#studentSelectorButton').click();
    await expect(page.locator('.selector-class-select')).toHaveValue('test-class');
    await expect(page.locator('.selector-metric').first()).toContainText('1');
    expect(await page.evaluate(() => window.selectorCalls[0])).toEqual({
      context: { content_id: 'a-level:test-lesson', learning_assignment_id: 'test-assignment' },
      session: { class_id: 'test-class', lesson_content_id: 'a-level:test-lesson', learning_assignment_id: 'test-assignment' }
    });
    await page.getByRole('button', { name: 'Close student selector', exact: true }).click();
    await expect(page.locator('.studentSelectorSidePanel')).toHaveCount(0);
    await page.locator('#studentSelectorButton').click();
    await expect(page.locator('.selector-class-select')).toHaveValue('test-class');
    expect(requests()).toBe(1);
  });

  test(`@smoke lesson selector retries a failed script download: ${route}`, async ({ page }) => {
    const requests = await prepareLessonSelector(page, 'teacher', true);
    await page.goto(`http://lesson.test/${route}/index.html`);
    await page.mouse.move(10, 10);
    await page.locator('#studentSelectorButton').click();
    await expect(page.locator('#studentSelectorButton')).toHaveText('Unavailable');
    await page.locator('#studentSelectorButton').click();
    await expect(page.locator('.selector-class-select option')).toContainText(['Select a Class', 'Synthetic A Level']);
    expect(requests()).toBe(2);
    await expect(page.locator('#studentSelectorButton')).not.toHaveText('Unavailable');
  });

  for (const role of [null, 'student']) {
    test(`@smoke lesson classroom selector works without teacher sign-in (${role}): ${route}`, async ({ page }) => {
      const requests = await prepareLessonSelector(page, role);
      await page.goto(`http://lesson.test/${route}/index.html`);
    await page.mouse.move(10, 10);
      await page.locator('#studentSelectorButton').click();
      await expect(page.locator('.selector-class-select option')).toContainText(['Select a Class', 'Synthetic classroom']);
      await page.locator('.selector-class-select').selectOption('Synthetic classroom');
      await expect(page.locator('.selector-metric').first()).toContainText('1');
      expect(await page.evaluate(() => window.selectorCalls)).toEqual([]);
      await expect(page.locator('#studentSelectorButton')).toHaveText('Selector');
      expect(requests()).toBe(1);
      await page.getByRole('button', { name: 'Sound', exact: true }).click();
      await page.getByRole('button', { name: 'START SELECTION', exact: true }).click();
      await page.locator('[data-action="no-grade"]').click({ timeout: 15000 });
      await page.getByRole('button', { name: 'Return To Dock', exact: true }).click();
      await expect(page.locator('.selector-metric').nth(2)).toContainText('1');
      expect(await page.evaluate(() => window.selectorCalls)).toEqual([]);
    });
  }
}

for (const [route, canvas, controls, fullscreen, status] of lessons) {
  test(`@smoke current lesson fills the presentation viewport: ${route}`, async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop presentation geometry and fullscreen API.');
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(pathToFileURL(path.join(root, route, 'index.html')).href);
    await page.mouse.move(10, 10);
    await expectLargestCanvas(page, canvas);
    await page.locator('.lesson-navigation-more > summary').click();
    await page.locator(fullscreen).click();
    await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
    await expectLargestCanvas(page, canvas);
    await page.mouse.move(400, 200);
    await expect(page.locator(controls)).toHaveCSS('opacity', '0', { timeout: 5000 });
    const before = await page.locator(status).textContent();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator(status)).not.toHaveText(before);
    await expectLargestCanvas(page, canvas);
    await page.mouse.move(500, 200);
    await expect(page.locator(controls)).toHaveCSS('opacity', '1');
    await page.locator('#overviewButton').click();
    await expect(page.locator('dialog[open]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('dialog[open]')).toHaveCount(0);
    await page.mouse.click(600, 200);
    await expect(page.locator(controls)).toHaveCSS('opacity', '0', { timeout: 5000 });
    await page.keyboard.press('Tab');
    await expect(page.locator(controls)).toHaveCSS('opacity', '1');
    await page.keyboard.press('f');
    await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
    for (const viewport of [{ width: 1440, height: 1000 }, { width: 1920, height: 900 }]) {
      await page.setViewportSize(viewport);
      await expectLargestCanvas(page, canvas);
    }
    expect(errors).toEqual([]);
  });

  test(`@responsive current lesson keeps phone navigation usable: ${route}`, async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Phone reading layout.');
    await page.goto(pathToFileURL(path.join(root, route, 'index.html')).href);
    await page.mouse.move(10, 10);
    await expect(page.locator(`${canvas} .slide:visible`)).toHaveCount(1);
    await expect(page.locator(controls)).toHaveCSS('opacity', '1');
    const before = await page.locator(status).textContent();
    await page.getByRole('button', { name: /^Next (slide|step or slide)$/ }).click();
    await expect(page.locator(status)).not.toHaveText(before);
    await page.locator('#overviewButton').click();
    await expect(page.locator('dialog[open]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

for (const [route, canvas, controls, fullscreen, status] of lessons) {
  test(`@smoke @responsive course selector design and keyboard isolation: ${route}`, async ({ page, isMobile }, testInfo) => {
    await prepareLessonSelector(page, null);
    if (!isMobile) await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(`http://lesson.test/${route}/index.html`);
    await page.mouse.move(10, 10);
    await page.keyboard.press('s');
    const panel = page.locator('.studentSelectorSidePanel');
    await expect(panel).toBeVisible();
    await expect(page.locator('.lesson-selector-course')).toHaveText(route.startsWith('a-level') ? 'A LEVEL ECONOMICS' : 'INVESTMENT & FINANCE');
    const colors = await panel.evaluate(el => ({ paper: getComputedStyle(el).backgroundColor, font: getComputedStyle(el).fontFamily }));
    expect(colors.paper).toBe(route.startsWith('a-level') ? 'rgb(246, 242, 233)' : 'rgb(244, 239, 229)');
    expect(colors.font).toContain('Arial');
    await page.locator('.selector-class-select').selectOption('Synthetic classroom');
    const panelBox = await panel.boundingBox();
    const viewport = page.viewportSize();
    expect(panelBox.x + panelBox.width).toBeLessThanOrEqual(viewport.width + 1);
    if (!isMobile) {
      const slideBox = await page.locator(canvas).boundingBox();
      expect(slideBox.x).toBeGreaterThanOrEqual(-1);
      expect(slideBox.x + slideBox.width).toBeLessThanOrEqual(panelBox.x + 1);
      const reset = await page.locator('[data-action="reset"]').boundingBox();
      expect(reset.y + reset.height).toBeLessThanOrEqual(viewport.height);
    }
    await page.screenshot({ path: testInfo.outputPath('selector-dock.png') });
    const before = await page.locator(status).textContent();
    await panel.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator(status)).toHaveText(before);
    await page.getByRole('button', { name: 'Sound', exact: true }).click();
    await page.locator('[data-action="timer"]').first().click();
    await page.getByRole('button', { name: 'START SELECTION', exact: true }).click();
    await expect(page.locator('[data-action="no-grade"]')).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: testInfo.outputPath('selector-result.png') });
    const outcome = await page.locator('[data-action="no-grade"]').boundingBox();
    expect(outcome.y + outcome.height).toBeLessThanOrEqual(viewport.height);
    await page.locator('[data-action="no-grade"]').click();
    await page.keyboard.press('Escape');
    await expect(panel).toBeVisible();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(panel).toHaveCount(0);
    await expect(page.locator('#studentSelectorButton')).toBeFocused();
    await expect(page.locator(status)).toHaveText(before);
    if (!isMobile) await expectLargestCanvas(page, canvas);
  });
}

