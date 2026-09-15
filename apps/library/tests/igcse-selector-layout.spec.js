const { test, expect } = require('@playwright/test');
const { readFile } = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

async function prepare(page) {
  await page.route('https://hm.baidu.com/**', route => route.fulfill({ body: '' }));
  await page.route('https://randomizerselection.github.io/studentselector/assets/students.csv', route => route.fulfill({
    contentType: 'text/csv', body: 'Class,Student\nSynthetic classroom,Synthetic student\n'
  }));
  await page.route('http://lesson.test/**', async route => {
    const pathname = new URL(route.request().url()).pathname;
    const file = path.join(pathname.startsWith('/student-selector/') ? path.dirname(root) : root, pathname.slice(1));
    const contentType = ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.csv': 'text/csv', '.svg': 'image/svg+xml' })[path.extname(file)];
    try { await route.fulfill({ body: await readFile(file), ...(contentType ? { contentType } : {}) }); }
    catch { await route.fulfill({ status: 404, body: 'Not found' }); }
  });
}

const routes = [
  'lessons/unit-1-basic-economic-problem/1-1-basic-economic-problem/index.html',
  'lessons/unit-1-basic-economic-problem/1-2-factors-of-production/lesson-2.html',
  'lessons/unit-4-government/4-4-supply-side-policy/lesson-4.html'
];

// Check the content's layout as well as the outer canvas: a narrow canvas can
// sit beside the panel while overflowing text and diagrams are silently clipped.
async function contentLayout(page) {
  return page.locator('.slide.is-active').evaluate(slide =>
    [slide, ...slide.querySelectorAll('h1, h2, h3, p, img, svg, .card, .slide-footer')]
      .map(el => ({ width: el.clientWidth, height: el.clientHeight, scrollWidth: el.scrollWidth, scrollHeight: el.scrollHeight }))
  );
}

async function expectBesidePanel(page) {
  await expect.poll(async () => {
    const deck = await page.locator('#deck').boundingBox();
    const panel = await page.locator('.studentSelectorSidePanel').boundingBox();
    const { width, height } = page.viewportSize();
    return deck && panel && deck.width > 0 && deck.x >= -1 && deck.y >= -1 &&
      Math.abs(deck.width - panel.x) < 1 && deck.y + deck.height <= height + 1 &&
      Math.abs(deck.width / deck.height - width / height) < 0.01;
  }).toBe(true);
}

for (const route of routes) {
  test(`@smoke @responsive IGCSE selector preserves complete content: ${route}`, async ({ page, isMobile }) => {
    await prepare(page);
    await page.goto(`http://lesson.test/${route}`);
    await page.evaluate(() => document.fonts.ready);
    const viewports = isMobile ? [{ width: 390, height: 844 }] : [
      { width: 1440, height: 900 }, { width: 1280, height: 720 }, { width: 845, height: 900 }
    ];
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      for (const slide of [1, 5, 9]) {
        await page.goto(`http://lesson.test/${route}#${slide}`);
        await expect(page.locator('.slide.is-active')).toHaveCount(1);
        // Let entrance animations and question-title fitting finish first.
        await page.locator('.slide.is-active').evaluate(async el => {
          await Promise.all(el.getAnimations().map(animation => animation.finished));
        });
        const before = await contentLayout(page);
        await page.keyboard.press('s');
        await expect(page.locator('.studentSelectorSidePanel')).toBeVisible();
        if (!isMobile) await expectBesidePanel(page);
        else await expect(page.locator('#deck')).toHaveCSS('transform', 'none');
        expect(await contentLayout(page)).toEqual(before);
        await page.getByRole('button', { name: 'Close student selector', exact: true }).click();
        await expect(page.locator('.studentSelectorSidePanel')).toHaveCount(0);
        await expect(page.locator('#deck')).toHaveCSS('transform', 'none');
        expect(await contentLayout(page)).toEqual(before);
      }
    }
    if (!isMobile) {
      await page.keyboard.press('s');
      for (const viewport of [{ width: 1920, height: 1080 }, { width: 1280, height: 720 }]) {
        await page.setViewportSize(viewport);
        await expectBesidePanel(page);
      }
      await page.emulateMedia({ media: 'print' });
      await expect(page.locator('#deck')).toHaveCSS('transform', 'none');
    }
  });
}
