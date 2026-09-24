const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const route = 'investment-analysis/lessons/share-price-company-size';
const source = fs.readFileSync(path.join(root, route, 'slides.js'), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
const lesson = sandbox.window.INVESTMENT_COURSE.lesson;
const slides = lesson.slides;
const number = id => slides.findIndex(slide => slide.id === id) + 1;

async function open(page, id) {
  await page.goto(`http://market-cap.test/${route}/index.html#${number(id)}`);
  return page.locator(`.slide[data-slide-id="${id}"]`);
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('https://hm.baidu.com/**', route => route.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.route('http://market-cap.test/**', async request => {
    const relative = decodeURIComponent(new URL(request.request().url()).pathname).slice(1);
    const file = path.resolve(root, relative);
    if (!file.startsWith(root + path.sep)) return request.fulfill({ status: 403, body: '' });
    try {
      const contentType = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' }[path.extname(file)] || 'text/plain';
      await request.fulfill({ contentType, body: fs.readFileSync(file) });
    } catch {
      await request.fulfill({ status: 404, body: '' });
    }
  });
});

test('@smoke share price lesson keeps a clear knowledge-and-practice sequence', async ({ page }) => {
  expect(lesson.meta.coreSlideCount).toBe(33);
  expect(slides).toHaveLength(36);
  expect(new Set(slides.map(slide => slide.id)).size).toBe(36);
  expect(slides.filter(slide => slide.kind === 'section').map(slide => slide.title)).toEqual([
    'Market capitalisation',
    'Calculating market capitalisation',
    'Information and share prices',
    'Stock splits and ownership'
  ]);
  expect(number('opening-price-puzzle')).toBeLessThan(number('definition-market-cap'));
  expect(number('market-cap-formula')).toBeLessThan(number('river-summit-worked'));
  expect(number('river-summit-worked')).toBeLessThan(number('two-company-calculation'));
  expect(number('two-company-calculation')).toBeLessThan(number('section-price-changes'));
  expect(number('expectations-price-chain')).toBeLessThan(number('definition-positive-surprise'));
  expect(number('definition-positive-surprise')).toBeLessThan(number('definition-negative-surprise'));
  expect(number('definition-negative-surprise')).toBeLessThan(number('information-expectations-guidance'));
  expect(number('information-expectations-guidance')).toBeLessThan(number('expectations-example'));
  expect(number('expectations-example')).toBeLessThan(number('company-guidance-example'));
  expect(number('summary')).toBe(33);
  expect(number('exit-market-cap')).toBe(32);
  expect(source).not.toMatch(/annualised return|real return|P\/E/i);
  expect(source).not.toMatch(/One share and all shares|The missing number: all the shares|Emma’s holding or all of Apple|From new information to a new price|How changed expectations become a trade/);

  const hero = await open(page, 'hero');
  await expect(hero).toContainText('Share price and company size');
  await expect(hero.locator('img')).toBeVisible();

  const section = await open(page, 'section-one-and-whole');
  await expect(section).toContainText('Market capitalisation');

  const formula = await open(page, 'market-cap-formula');
  await expect(formula).toContainText('Market cap');
  await expect(formula).toContainText('Share price');
  await expect(formula.locator('.mc-equation > div > strong').nth(2)).toContainText('Shares');
  await expect(formula.locator('.mc-equation > div > strong').nth(2)).toContainText('outstanding');
  await expect(formula.locator('.mc-equation')).toHaveCount(1);

  const practice = await open(page, 'two-company-calculation');
  await expect(practice).toContainText('Work independently for 60 seconds');
  await expect(practice.locator('.mc-answer > div')).not.toBeVisible();
  await practice.locator('.mc-answer summary').click();
  await expect(practice.locator('.mc-answer')).toContainText('$396 billion');

  const hook = await open(page, 'nvidia-news-hook');
  await expect(hook.locator('.slide-header')).toBeHidden();
  await expect(hook.locator('.mc-story-question')).toContainText('Why might investors pay more');

  const mechanism = await open(page, 'expectations-price-chain');
  for (let i = 0; i < 2; i += 1) await page.keyboard.press('ArrowRight');
  await expect(mechanism.locator('.mc-direction')).toHaveCount(2);
  await expect(mechanism).toContainText('Higher agreed trade prices');
  await expect(mechanism).toContainText('Lower agreed trade prices');

  const positive = await open(page, 'definition-positive-surprise');
  await expect(positive.locator('.definition-panel > p')).toHaveCount(1);
  await expect(positive.locator('.blank-answer')).toHaveCount(3);
  await expect(positive.locator('.blank-answer').nth(1)).toHaveAttribute('data-answer', 'raise their expectations of future profits');
  await expect(positive.locator('.blank-answer').nth(1)).toHaveAttribute('aria-expanded', 'false');
  await positive.locator('.blank-answer').nth(1).click();
  await expect(positive.locator('.blank-answer').nth(1)).toHaveAttribute('aria-expanded', 'true');
  await expect(positive.locator('.definition-translation')).toHaveCount(0);

  const negative = await open(page, 'definition-negative-surprise');
  await expect(negative.locator('.definition-panel > p')).toHaveCount(1);
  await expect(negative.locator('.blank-answer')).toHaveCount(3);
  await expect(negative.locator('.blank-answer').nth(1)).toHaveAttribute('data-answer', 'lower their expectations of future profits');
  await expect(negative.locator('.definition-translation')).toHaveCount(0);

  const information = await open(page, 'information-expectations-guidance');
  await expect(information.locator('.mc-concept-example img')).toBeVisible();
  await expect(information).toContainText('Costco reported that its net sales increased 8% to $269.9bn');
  await expect(information).not.toContainText('stock split');

  const expectations = await open(page, 'expectations-example');
  await expect(expectations.locator('.mc-concept-example img')).toBeVisible();
  await expect(expectations).toContainText('$7.15bn');

  const guidance = await open(page, 'company-guidance-example');
  await expect(guidance.locator('.mc-concept-example img')).toBeVisible();
  await expect(guidance).toContainText('$89–93bn');
  await expect(guidance).toContainText('about $84bn');

  const apple = await open(page, 'apple-news-evidence');
  for (let i = 0; i < 3; i += 1) await page.keyboard.press('ArrowRight');
  await expect(apple).toContainText('$89–93bn');
  await expect(apple).toContainText('about $84bn');
  await expect(apple.locator('.mc-price-result')).toContainText('−10.0%');

  const exit = await open(page, 'exit-market-cap');
  await expect(exit).toContainText('2-for-1 split');
  await expect(exit).toContainText('880 million shares');
});

test('@smoke share price lesson fits every slide at the classroom viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  const issues = [];

  for (const item of slides) {
    const slide = await open(page, item.id);
    await expect(slide).toBeVisible();
    for (const summary of await slide.locator('details > summary').all()) await summary.click();
    const overflow = await slide.evaluate(element => {
      const found = [];
      const body = element.querySelector('.slide-body');
      const heading = element.querySelector('.slide-header h1');
      if (body && heading && heading.getBoundingClientRect().bottom > body.getBoundingClientRect().top + 2) {
        found.push('header overlaps body');
      }
      if (element.scrollWidth > element.clientWidth + 2) found.push('horizontal overflow');
      if (!element.matches('.mc-photo-section,.mc-scene-photo-story') && element.scrollHeight > element.clientHeight + 2) found.push('vertical overflow');
      return found;
    });
    if (overflow.length) issues.push({ id: item.id, overflow });
  }

  expect(issues).toEqual([]);
});
