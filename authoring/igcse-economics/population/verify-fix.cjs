// Re-verify the two fixed scenes (slides 5 and 13) after the animation/label fix,
// and test the slide-24 MCQ explanation reveal for overflow.
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..', '..', '..');
const lessonDir = path.join(root, 'apps', 'library', 'lessons', 'unit-5-economic-development', '5-3-population');
const outDir = path.join(__dirname, 'verify-shots');
fs.mkdirSync(outDir, { recursive: true });
const url = pathToFileURL(path.join(lessonDir, 'index.html')).toString();

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto(url);
  await page.waitForTimeout(1000);

  const counter = () => page.evaluate(() => document.querySelector('.lesson-navigation-status')?.textContent.trim());

  // walk to slide 5, capturing each stage after animations settle
  while ((await counter()) !== '5 / 35') { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(150); }
  for (let stage = 0; stage <= 3; stage++) {
    await page.waitForTimeout(1100); // let staggered fade finish
    await page.screenshot({ path: path.join(outDir, `fix-s5-stage${stage}.png`) });
    if (stage < 3) await page.keyboard.press('ArrowRight');
  }

  // walk to slide 13
  while ((await counter()) !== '13 / 35') { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(150); }
  for (let stage = 0; stage <= 3; stage++) {
    await page.waitForTimeout(1100);
    await page.screenshot({ path: path.join(outDir, `fix-s13-stage${stage}.png`) });
    if (stage < 3) await page.keyboard.press('ArrowRight');
  }

  // walk to slide 24 and answer the MCQ (correct key D)
  while ((await counter()) !== '24 / 35') { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(150); }
  await page.waitForTimeout(600);
  const choices = page.locator('.slide.is-active .choices .choice, .slide.is-active .choices button');
  console.log('choices on slide 24:', await choices.count());
  await choices.nth(3).click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'fix-s24-answered.png') });
  const overflow = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('.slide.is-active *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height && (r.bottom > window.innerHeight + 2 || r.right > window.innerWidth + 2)) {
        const cs = getComputedStyle(el);
        if (cs.visibility !== 'hidden' && cs.display !== 'none' && cs.opacity !== '0') {
          bad.push(`${el.tagName}.${String(el.className).split(' ')[0]} bottom=${Math.round(r.bottom)} right=${Math.round(r.right)}`);
        }
      }
    });
    return bad.slice(0, 8);
  });
  console.log('slide 24 visible overflow after answering:', overflow.length ? overflow : 'none');
  console.log('JS errors:', errors.length ? errors.join(' | ') : 'none');
  await browser.close();
})().catch((err) => { console.error(err); process.exit(1); });
