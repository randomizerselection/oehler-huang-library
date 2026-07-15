const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('@playwright/test');

const root = path.resolve(__dirname, '..');
const passportPath = path.join(root, 'investment-analysis', 'unit-1', 'passport.html');
const captureScreenshots = process.env.PASSPORT_CAPTURE === '1';
const screenshotDir = path.join(root, 'test-results', 'investment-passport');

function fail(message) {
  throw new Error(`Investment Passport layout: ${message}`);
}

async function checkPublishedLesson(page, lessonNumber, viewportLabel) {
  const lessonPath = path.join(root, 'investment-analysis', 'unit-1', `lesson-${lessonNumber}`, 'index.html');
  const lessonUrl = pathToFileURL(lessonPath).toString();
  await page.emulateMedia({ media: 'screen' });
  await page.goto(lessonUrl, { waitUntil: 'load' });
  await page.waitForSelector('.invSlide.is-active');

  const passportLinks = page.locator('.invModeTabs a', { hasText: 'Passport' });
  if (await passportLinks.count() !== 1) fail(`lesson ${lessonNumber} must render one Passport navigation link at ${viewportLabel}`);

  const passportSlideIndexes = await page.evaluate(() => window.INVEST.lesson.slides
    .map((slide, index) => ({ slide, index }))
    .filter(({ slide }) => slide.eyebrow === 'Passport Update')
    .map(({ index }) => index));
  if (passportSlideIndexes.length !== 1) fail(`lesson ${lessonNumber} must render exactly one Passport Update slide at ${viewportLabel}`);

  await page.goto(`${lessonUrl}#${passportSlideIndexes[0] + 1}`, { waitUntil: 'load' });
  const activeSlide = page.locator('.invSlide.is-active');
  await activeSlide.waitFor();
  if (!new RegExp(`Complete Passport page ${lessonNumber}`).test(await activeSlide.innerText())) fail(`lesson ${lessonNumber} Passport Update slide is not active at ${viewportLabel}`);

  const fit = await activeSlide.evaluate((node) => ({
    clientWidth: node.clientWidth,
    scrollWidth: node.scrollWidth,
    clientHeight: node.clientHeight,
    scrollHeight: node.scrollHeight,
  }));
  if (fit.scrollWidth > fit.clientWidth + 1 || fit.scrollHeight > fit.clientHeight + 1) {
    fail(`lesson ${lessonNumber} Passport Update slide overflows at ${viewportLabel} (${fit.scrollWidth}x${fit.scrollHeight} inside ${fit.clientWidth}x${fit.clientHeight})`);
  }
}

async function main() {
  if (!fs.existsSync(passportPath)) fail('passport.html is missing');

  const browser = await chromium.launch({ args: ['--disable-gpu'] });
  const page = await browser.newPage({ viewport: { width: 980, height: 1200 }, deviceScaleFactor: 1 });
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  try {
    await page.goto(pathToFileURL(passportPath).toString(), { waitUntil: 'load' });
    await page.waitForSelector('.passport-page');
    await page.evaluate(() => document.fonts && document.fonts.ready);

    const pages = page.locator('.passport-page');
    const pageCount = await pages.count();
    if (pageCount !== 8) fail(`expected 8 rendered pages, found ${pageCount}`);
    if (pageErrors.length) fail(`page error: ${pageErrors.join('; ')}`);

    const lessonNumbers = await pages.evaluateAll((nodes) => nodes.map((node) => Number(node.dataset.passportLesson)));
    if (lessonNumbers.join('|') !== '1|2|3|4|5|6|7|8') fail(`lesson order is ${lessonNumbers.join('|')}`);

    const tableCounts = await pages.evaluateAll((nodes) => nodes.map((node) => node.querySelectorAll('.passport-task-table').length));
    if (tableCounts.some((count) => count !== 1)) fail(`every page must contain exactly one task table; found ${tableCounts.join('|')}`);

    const responseCounts = await pages.evaluateAll((nodes) => nodes.map((node) => node.querySelectorAll('.passport-task-row').length));
    if (responseCounts.some((count) => count !== 4)) fail(`every task table must contain four response rows; found ${responseCounts.join('|')}`);

    const obsoletePanelCounts = await pages.evaluateAll((nodes) => nodes.map((node) => node.querySelectorAll('.passport-response, .passport-answer-type').length));
    if (obsoletePanelCounts.some((count) => count !== 0)) fail(`former response cards or answer-type panels are still rendered; found ${obsoletePanelCounts.join('|')}`);

    const scaffoldCounts = await pages.evaluateAll((nodes) => nodes.map((node) => node.querySelectorAll('.passport-option-group, .passport-sentence-frame').length));
    if (scaffoldCounts.some((count) => count < 4)) fail(`every page must provide at least four structured answer scaffolds; found ${scaffoldCounts.join('|')}`);

    await page.emulateMedia({ media: 'print' });
    const metrics = await pages.evaluateAll((nodes) => nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      const footer = node.querySelector('.passport-page-footer').getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        clientHeight: node.clientHeight,
        scrollHeight: node.scrollHeight,
        footerBottom: footer.bottom - rect.top,
      };
    }));

    if (captureScreenshots) {
      fs.mkdirSync(screenshotDir, { recursive: true });
      for (const index of [0, 3, 7]) {
        await pages.nth(index).scrollIntoViewIfNeeded();
        await page.waitForTimeout(120);
        await pages.nth(index).screenshot({
          path: path.join(screenshotDir, `page-${index + 1}.jpg`),
          type: 'jpeg',
          quality: 92,
        });
      }
    }

    metrics.forEach((metric, index) => {
      if (Math.abs(metric.width - 793.7) > 2) fail(`page ${index + 1} width is ${metric.width.toFixed(1)}px, not A4`);
      if (Math.abs(metric.height - 1122.5) > 2) fail(`page ${index + 1} height is ${metric.height.toFixed(1)}px, not A4`);
      if (metric.scrollHeight > metric.clientHeight + 1) fail(`page ${index + 1} overflows by ${metric.scrollHeight - metric.clientHeight}px`);
      if (metric.footerBottom > metric.height + 1) fail(`page ${index + 1} footer is outside the page`);
    });

    await checkPublishedLesson(page, 1, 'desktop');
    await checkPublishedLesson(page, 2, 'desktop');
    await page.setViewportSize({ width: 390, height: 844 });
    await checkPublishedLesson(page, 1, 'phone');
    await checkPublishedLesson(page, 2, 'phone');

    console.log('Investment Passport layout validation passed.');
    console.log(`Rendered ${pageCount} A4 pages with one four-row task table each and no page overflow; Lessons 1-2 show one fitted Passport Update slide and navigation link on desktop and phone.`);
    if (captureScreenshots) console.log(`Captured pages 1, 4 and 8 in ${screenshotDir}.`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
