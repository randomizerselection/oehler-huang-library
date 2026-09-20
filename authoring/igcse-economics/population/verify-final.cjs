// Final checks: slide 8 SVG contain fix, slide 21 flow blank reveals, source dialog.
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..', '..', '..');
const lessonDir = path.join(root, 'apps', 'library', 'lessons', 'unit-5-economic-development', '5-3-population');
const outDir = path.join(__dirname, 'verify-shots');
const url = pathToFileURL(path.join(lessonDir, 'index.html')).toString();

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto(url);
  await page.waitForTimeout(1000);
  const counter = () => page.evaluate(() => document.querySelector('.lesson-navigation-status')?.textContent.trim());
  const goTo = async (n) => {
    while ((await counter()) !== `${n} / 35`) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(120); }
    await page.waitForTimeout(700);
  };

  await goTo(8);
  await page.screenshot({ path: path.join(outDir, 'final-s8.png') });

  await goTo(21);
  const blanks = page.locator('.slide.is-active .blankAnswer');
  const n = await blanks.count();
  console.log('flow blanks on slide 21:', n);
  for (let i = 0; i < n; i++) { await blanks.nth(i).click(); await page.waitForTimeout(150); }
  await page.screenshot({ path: path.join(outDir, 'final-s21-revealed.png') });

  // source dialog on slide 21 (Mark scheme button)
  await page.locator('.slide.is-active .classroom-source-buttons button').first().click();
  await page.waitForTimeout(500);
  const dialogOpen = await page.evaluate(() => !!document.querySelector('.classroom-source-dialog[open]'));
  console.log('source dialog opens:', dialogOpen);
  await page.screenshot({ path: path.join(outDir, 'final-source-dialog.png') });

  console.log('JS errors:', errors.length ? errors.join(' | ') : 'none');
  await browser.close();
})().catch((err) => { console.error(err); process.exit(1); });
