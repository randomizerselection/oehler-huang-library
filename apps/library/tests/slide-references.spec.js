const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const { activeContentFiles } = require('../scripts/content-sources.js');
const root = path.resolve(__dirname, '..');
const pages = activeContentFiles(root).filter(file => /src=["'][^"']*slides[^"']*\.js/.test(fs.readFileSync(path.join(root, file), 'utf8')));

async function prepare(page, { blocked = false, reverse = false } = {}) {
  await page.route('http://lesson.test/**', async route => {
    const pathname = new URL(route.request().url()).pathname;
    const file = path.join(root, pathname);
    try {
      let body = fs.readFileSync(file);
      if (reverse && /\/slides[^/]*\.js$/.test(pathname)) body = Buffer.from(body.toString() + '\n;(window.ALEVEL_LESSON || window.INVESTMENT_COURSE?.lesson || window.IGCSE?.lesson).slides.reverse();');
      const contentType = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' }[path.extname(file)];
      await route.fulfill({ body, ...(contentType ? { contentType } : {}) });
    } catch { await route.fulfill({ status: 404, body: '' }); }
  });
  await page.addInitScript(blocked => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async text => {
      if (blocked) throw new Error('Clipboard denied');
      window.copiedReference = text;
    } } });
  }, blocked);
}

for (const file of pages) {
  test(`@smoke stable slide IDs: ${file}`, async ({ page }) => {
    await prepare(page);
    await page.goto(`http://lesson.test/${file}`);
    await expect(page.locator('.lesson-navigation-status')).toHaveAttribute('role', 'button');
    const ids = await page.evaluate(() => (window.ALEVEL_LESSON || window.INVESTMENT_COURSE?.lesson || window.IGCSE?.lesson).slides.map(s => s.id));
    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9][a-z0-9-]*$/);
    expect(new Set(ids).size).toBe(ids.length);
    await page.keyboard.press('o');
    await expect(page.locator('.lesson-overview-reference code')).toContainText(`#${ids[0]}`);
    await page.locator('.lesson-overview-search input').fill(ids[ids.length - 1]);
    await expect(page.locator(`.lesson-overview-item[data-go="${ids.length - 1}"]`)).toBeVisible();
  });
}

const examples = [pages.find(x => x.startsWith('a-level/')), pages.find(x => x.startsWith('investment-analysis/')), pages.find(x => x.startsWith('lessons/'))];
for (const file of examples) {
  test(`@smoke @responsive copy and reopen after reordering: ${file}`, async ({ page, context }) => {
    await prepare(page);
    await page.goto(`http://lesson.test/${file}#3`);
    const status = page.locator('.lesson-navigation-status');
    await status.press('Enter');
    await expect.poll(() => page.evaluate(() => window.copiedReference)).toContain('Slide 3:');
    const text = await page.evaluate(() => window.copiedReference);
    const reference = text.split('\n').find(line => line.startsWith('Reference: ')).slice(11);
    const url = text.split('\n').at(-1);
    expect(url).toContain(`#${reference.split('#')[1]}`);
    // Simulate a later edit that changes slide order while preserving IDs.
    const reordered = await context.newPage();
    await prepare(reordered, { reverse: true });
    await reordered.goto(url);
    await reordered.locator('.lesson-navigation-status').press('Enter');
    await expect.poll(() => reordered.evaluate(() => window.copiedReference)).toContain(`Reference: ${reference}`);
    await reordered.close();
    await page.keyboard.press('o');
    await page.locator('.lesson-overview-search input').fill(reference);
    await expect(page.locator('.lesson-overview-item')).toHaveCount(1);
    const box = await page.locator('.lesson-overview').boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width);
  });
}

test('@smoke @responsive blocked clipboard offers selected reference', async ({ page }) => {
  await prepare(page, { blocked: true });
  await page.goto(`http://lesson.test/${examples[0]}`);
  await page.locator('.lesson-navigation-status').press('Enter');
  const field = page.getByRole('textbox', { name: 'Slide reference to copy' });
  await expect(field).toBeVisible();
  await expect(field).toBeFocused();
  expect(await field.evaluate(el => el.selectionEnd - el.selectionStart)).toBe((await field.inputValue()).length);
  await expect(page.locator('.lesson-overview-reference [aria-live]')).toContainText('Ctrl+C');
});
