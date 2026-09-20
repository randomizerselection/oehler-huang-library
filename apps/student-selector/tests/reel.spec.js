const { test, expect } = require('@playwright/test');

async function prepare(page) {
  await page.goto('/tests/harness.html');
  await page.locator('[data-action="class"]').selectOption('class-test');
  await page.getByRole('button', { name: 'Sound', exact: true }).click();
}

test('reel moves continuously and lands on the chosen eligible student', async ({ page }) => {
  await prepare(page);
  await page.clock.install();
  await page.getByRole('button', { name: 'START SELECTION', exact: true }).click();
  const chosen = await page.evaluate(() => window.__selector.studentLabel(window.__selector.stage.finalStudent));
  await page.clock.runFor(600);
  const first = await page.locator('.selector-name-stack').evaluate(el => getComputedStyle(el).transform);
  await page.clock.runFor(32);
  const second = await page.locator('.selector-name-stack').evaluate(el => getComputedStyle(el).transform);
  expect(first).not.toBe(second);
  await expect(page.locator('.selector-name-stack')).toHaveAttribute('aria-hidden', 'true');
  await page.clock.runFor(4400);
  await expect(page.locator('[data-current-name]')).toHaveText(chosen);
  await expect(page.getByRole('status')).toContainText(`${chosen} — your turn.`);
  await expect(page.locator('[data-action="no-grade"]')).toBeVisible();
  expect(await page.evaluate(() => window.__selector.metrics().remaining)).toBe(3);
});

for (const mode of ['quiet', 'reduced motion']) {
  test(`${mode} advances the countdown without rolling names`, async ({ page }) => {
    if (mode === 'reduced motion') await page.emulateMedia({ reducedMotion: 'reduce' });
    await prepare(page);
    if (mode === 'quiet') await page.getByRole('button', { name: 'Slot Effect', exact: true }).click();
    await page.clock.install();
    await page.getByRole('button', { name: 'START SELECTION', exact: true }).click();
    await page.clock.runFor(1500);
    await expect(page.locator('[data-current-name]')).toHaveText('Get ready');
    const width = await page.locator('[data-progress]').evaluate(el => parseFloat(el.style.width));
    expect(width).toBeGreaterThan(20);
    expect(width).toBeLessThan(90);
    await expect(page.locator('.selector-name-stack')).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
    await page.clock.runFor(3600);
    await expect(page.locator('[data-action="no-grade"]')).toBeVisible();
  });
}

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 1024, height: 600 }]) {
  test(`reel frame fits long names at ${viewport.width} × ${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await prepare(page);
    await page.evaluate(() => {
      const app = window.__selector;
      app.studentLabels['student-1'] = '陈安 Alexander Chen';
      app.stage = { mode: 'selected', finalStudent: 'student-1', names: ['', app.studentLabels['student-1'], ''], progress: 100 };
      app.render();
    });
    const geometry = await page.locator('.selector-reel-window').evaluate(el => {
      const name = el.querySelector('[data-current-name]');
      const frame = el.getBoundingClientRect(), rect = name.getBoundingClientRect();
      return { height: frame.height, left: rect.left - frame.left, right: frame.right - rect.right,
        centered: Math.abs((rect.top + rect.bottom) / 2 - (frame.top + frame.bottom) / 2),
        overflow: name.scrollHeight > name.clientHeight, radius: getComputedStyle(el).borderRadius };
    });
    expect(geometry.height).toBeLessThanOrEqual(326);
    expect(geometry.centered).toBeLessThan(2);
    expect(geometry.left).toBeGreaterThan(8);
    expect(geometry.right).toBeGreaterThan(8);
    expect(geometry.overflow).toBe(false);
    expect(geometry.radius).toBe('14px');
  });
}
