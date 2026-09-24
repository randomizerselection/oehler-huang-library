const { test, expect } = require('@playwright/test');
const path = require('node:path');
const fs = require('node:fs');
const vm = require('node:vm');

const route = 'http://127.0.0.1:4173/lessons/unit-3-decision-makers/3-3-workers/index.html';
const context = { window: {} };
vm.createContext(context);
context.IGCSE = context.window.IGCSE = { photos: { fiscalPolicy: {}, basicEconomicProblem: {} } };
vm.runInContext(fs.readFileSync(path.join(__dirname, '../lessons/unit-3-decision-makers/3-3-workers/slides.js'), 'utf8'), context);
const slides = context.IGCSE.lesson.slides;

async function revealSlide(page, slide) {
  const active = page.locator('.slide.is-active');
  if (slide.type === 'quiz') {
    await active.locator('.choices .choice').nth(slide.answer).click();
    return;
  }
  const count = await active.locator('.partial-item:not(.is-visible)').count();
  for (let index = 0; index < count; index += 1) await page.keyboard.press('ArrowRight');
  for (const blank of await active.locator('.definitionBlankAnswer,.blankAnswer').all()) {
    if (await blank.isVisible() && await blank.getAttribute('aria-expanded') !== 'true') await blank.click();
  }
}

test('@smoke @responsive Workers catalogue, source records and classroom views', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const factorSlides = slides.filter((slide) => slide.layout === 'worker-factor-detail');
  expect(factorSlides).toHaveLength(8);
  expect(factorSlides.every((slide) => Boolean(slide.zhTitle))).toBe(true);
  expect(factorSlides.every((slide) => slide.cards?.length === 2)).toBe(true);
  expect(factorSlides.every((slide) => new Set(slide.cards.map((card) => card.title.split('·')[1]?.trim())).size === 2)).toBe(true);
  expect(factorSlides.every((slide) => slide.leadHighlights?.length >= 1)).toBe(true);
  expect(factorSlides.every((slide) => !slide.cards.some((card) => /Why it affects choice|Exam caution/.test(card.title)))).toBe(true);
  expect(slides.some((slide) => /pension/i.test(JSON.stringify(slide)))).toBe(false);
  expect(slides.some((slide) => ['which-offer-should-emma-choose', 'emma-worked-choice', 'same-offers-different-worker', 'identify-two-non-wage-factors'].includes(slide.id))).toBe(false);

  await page.goto('http://127.0.0.1:4173/economics/');
  await expect(page.locator('.topic-group').filter({ hasText: 'Workers' }).getByRole('link', { name: 'Open lesson', exact: true })).toHaveAttribute('href', /3-3-workers/);

  await page.goto(`${route}#emma-two-job-offers`);
  await expect(page.locator('.slide.is-active')).toContainText('Choose A or B. Give one reason for your choice and one reason Emma might choose the other offer.');
  await expect(page.locator('.slide.is-active .card')).toHaveCount(2);
  await expect(page.locator('.slide.is-active .cardVisual img')).toHaveCount(2);
  for (const image of await page.locator('.slide.is-active .cardVisual img').all()) await expect(image).toBeVisible();

  await page.goto(`${route}#a-job-offer-is-a-bundle`);
  const comparisonStatements = page.locator('.slide.is-active .fillBlank p');
  await expect(comparisonStatements).toHaveCount(4);
  await expect(comparisonStatements.first()).toHaveCSS('color', 'rgb(20, 47, 67)');
  await expect(page.locator('.slide.is-active .fillBlank').first()).toHaveCSS('background-color', 'rgb(255, 255, 255)');

  await page.goto(`${route}#forms-of-financial-reward`);
  await expect(page.locator('.slide.is-active h2')).toHaveText('Four wage factors');
  await expect(page.locator('.slide.is-active .card')).toHaveCount(4);
  await expect(page.locator('.slide.is-active')).toContainText('Pay / wages');
  await expect(page.locator('.slide.is-active')).not.toContainText('Basic pay');
  await expect(page.locator('.slide.is-active')).toContainText('car salesperson receives 3%');

  await page.goto(`${route}#job-safety-versus-job-security`);
  await expect(page.locator('.slide.is-active h2')).toHaveText('Job safety and job security: two different risks');
  await expect(page.locator('.slide.is-active')).toContainText('Job safety 工作安全');
  await expect(page.locator('.slide.is-active')).toContainText('Job security 工作保障');
  await expect(page.locator('.slide.is-active .cardVisual img')).toHaveCount(2);
  await expect(page.locator('.slide.is-active .cardBody mark')).toHaveCount(4);
  await expect(page.locator('.slide.is-active .blankAnswer')).toHaveCount(0);

  await page.goto(`${route}#look-beyond-the-pay`);
  await expect(page.locator('.slide.is-active .visualPauseImage')).toHaveAttribute('src', /ai-job-security-hotel-receptionist/);

  await page.goto(`${route}#six-non-wage-considerations`);
  await expect(page.locator('.slide.is-active')).toContainText('Which non-wage factors can you spot?');
  await expect(page.locator('.slide.is-active .card')).toHaveCount(8);
  await expect(page.locator('.slide.is-active .cardVisual img')).toHaveCount(8);
  for (const image of await page.locator('.slide.is-active .cardVisual img').all()) await expect(image).toBeVisible();
  await expect(page.locator('.slide.is-active .cardVisual img[src*="working-hours-investment-banker-late-night"]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Show generated image sources' })).toBeVisible();

  await page.goto(`${route}#working-hours-and-flexibility`);
  await expect(page.locator('.slide.is-active h2')).toContainText('工作时间与灵活性');
  await expect(page.locator('.slide.is-active')).toContainText('Investment banking analyst 投资银行分析师');
  await expect(page.locator('.slide.is-active')).toContainText('90+ hours a week');
  await expect(page.locator('.slide.is-active .lead mark')).toHaveCount(2);

  await page.goto(`${route}#working-conditions-photo`);
  await expect(page.locator('.slide.is-active .visualPauseImage')).toHaveAttribute('src', /working-conditions-rainy-roofer/);

  await page.goto(`${route}#real-world-working-hours`);
  await expect(page.locator('.slide.is-active .worker-chart-fill')).toHaveCount(4);
  await expect(page.locator('.slide.is-active')).toContainText('41.2');

  await page.goto(`${route}#extreme-banking-working-hours`);
  await expect(page.locator('.slide.is-active .worker-chart-fill')).toHaveCount(3);
  await expect(page.locator('.slide.is-active')).toContainText('105');
  await expect(page.locator('.slide.is-active')).toContainText('13 analysts in 2021');

  await page.goto(`${route}#real-world-job-safety`);
  await expect(page.locator('.slide.is-active .worker-chart-fill')).toHaveCount(3);
  await expect(page.locator('.slide.is-active')).toContainText('48.7');

  await page.goto(`${route}#lanzarote-photo-intro`);
  await expect(page.locator('.slide.is-active .visualPauseImage')).toBeVisible();
  await expect(page.locator('.slide.is-active .visualPauseImage')).toHaveAttribute('alt', /hotel complex.*Lanzarote/i);

  await page.goto(`${route}#lanzarote-original-extract`);
  await expect(page.locator('.slide.is-active .paperExtractPanel')).toContainText('Lanzarote, a Spanish island');
  await expect(page.locator('.slide.is-active .paperExtractQuestion')).toContainText('Identify two non-wage factors that may influence a worker’s job choice. [2]');

  await page.goto(`${route}#non-wage-factor-paper1`);
  await expect(page.locator('.slide.is-active')).toContainText('the risk of unemployment');
  await expect(page.locator('.slide.is-active .mcqExplanation')).toBeHidden();
  await page.locator('.slide.is-active .choices .choice').nth(3).click();
  await expect(page.locator('.slide.is-active .mcqExplanation')).toContainText('job security');

  await page.goto(`${route}#explain-why-builders-may-not-become-teachers`);
  await expect(page.locator('.slide.is-active')).toContainText('Explain two reasons why building workers may not become teachers. [4]');
  await expect(page.locator('.slide.is-active')).toContainText('Reason 1');
  await expect(page.locator('.slide.is-active .prompt')).toHaveCSS('color', 'rgb(20, 47, 67)');
  await expect(page.locator('.slide.is-active .prompt')).toHaveCSS('background-color', 'rgb(237, 241, 237)');

  await page.goto(`${route}#philippines-original-extract`);
  await expect(page.locator('.slide.is-active .paperExtractQuestion')).toContainText('Identify two influences on which country a person decides to work in. [2]');

  await page.goto(`${route}#doctor-abroad-original-discuss`);
  await expect(page.locator('.slide.is-active .paperExtractQuestion')).toContainText('Discuss whether or not a doctor would benefit from working in another country. [8]');

  expect(errors).toEqual([]);
});

test('@responsive Workers completed slides fit classroom and phone viewports', async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 810 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    for (const slide of slides) {
      await page.goto(`${route}#${slide.id}`);
      await revealSlide(page, slide);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${slide.id} at ${viewport.width}`).toBe(true);
      if (viewport.width === 1440 && slide.id === 'a-job-offer-is-a-bundle') {
        const fontSize = await page.locator('.slide.is-active .fillBlank p').first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
        expect(fontSize).toBeGreaterThanOrEqual(28);
      }
      if (viewport.width === 1440 && slide.id === 'doctor-abroad-discuss-model') {
        const fits = await page.evaluate(() => {
          const lastParagraph = document.querySelector('.slide.is-active .modelAnswerText p:last-child');
          const footer = document.querySelector('.slide.is-active .slide-footer');
          return lastParagraph.getBoundingClientRect().bottom < footer.getBoundingClientRect().top;
        });
        expect(fits, 'The full eight-mark discussion model should remain above the footer').toBe(true);
      }
    }
  }
});

test('@smoke Workers study views retain the assessed questions', async ({ page }) => {
  await page.goto(`${route}?view=print`);
  await expect(page.locator('body')).toContainText('Explain two reasons why building workers may not become teachers.');
  await expect(page.locator('body')).toContainText('the risk of unemployment');
  await page.goto(`${route}?view=quiz`);
  await expect(page.locator('body')).toContainText('Workers: choice of occupation');
  await page.goto(`${route}?view=flashcards`);
  await expect(page.locator('body')).toContainText('Choice of occupation flashcards');
});
