const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const lessonFile = path.resolve(__dirname, '../lessons/unit-1-basic-economic-problem/1-2-factors-of-production/lesson-3.html');
const route = pathToFileURL(lessonFile).href;

test('quantity and quality lesson preserves syllabus scope, exact questions and study views', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(route);

  const shape = await page.evaluate(() => ({
    code: IGCSE.lesson.meta.code,
    slides: IGCSE.lesson.slides.length,
    coreEnd: IGCSE.lesson.meta.deliveryPlan.coreEndSlide,
    optionalStart: IGCSE.lesson.meta.deliveryPlan.optionalStartSlide,
    objectives: IGCSE.lesson.slides.find(slide => slide.id === 'quantity-quality-objectives').bullets.length
  }));
  expect(shape).toEqual({ code: '1.2.2', slides: 33, coreEnd: 29, optionalStart: 30, objectives: 3 });

  const ids = await page.evaluate(() => IGCSE.lesson.slides.map(slide => slide.id));
  expect(new Set(ids).size).toBe(ids.length);
  expect(await page.evaluate(() => JSON.stringify(IGCSE.lesson))).not.toContain('labour mobility');

  await page.goto(`${route}#27`);
  const active = page.locator('.slide.is-active');
  await expect(active).toContainText('Explain one reason why the quantity of land may increase and one reason why the quality of land may increase. [4]');
  await active.getByRole('button', { name: 'Show question paper sources' }).click();
  await expect(page.getByRole('dialog', { name: 'Content sources' })).toContainText('0455/22/M/J/23 Q3(b)');
  await page.keyboard.press('Escape');

  await page.goto(`${route}#28`);
  await expect(active).toContainText('Land reclamation can create usable land from the sea');
  await expect(active).toContainText('fertility and productivity of existing land');

  await page.goto(`${route}?view=print`);
  await expect(page.locator('.handoutDocument')).toBeVisible();
  await expect(page.locator('.handoutDocument')).toContainText('Quantity and quality are different changes');
  await expect(page.locator('.handoutDocument')).toContainText('Training raises labour productivity');

  await page.goto(`${route}?view=quiz`);
  await expect(page.locator('.quizQuestion')).toHaveCount(8);
  await page.goto(`${route}?view=flashcards`);
  await expect(page.locator('.flashcardPosition')).toHaveText('8 left');
  expect(errors).toEqual([]);
});

test('quantity and quality visuals load and completed core slides fit a classroom screen', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('phone'), 'Classroom geometry is checked at 16:9.');
  await page.setViewportSize({ width: 1440, height: 810 });

  for (const number of [1, 5, 7, 11, 12, 18, 20, 21, 23, 27, 28, 29]) {
    await page.goto(`${route}#${number}`);
    const active = page.locator('.slide.is-active');
    const hidden = await active.locator('.partial-item:not(.is-visible)').count();
    for (let i = 0; i < hidden; i += 1) await page.keyboard.press('ArrowRight');
    await active.evaluate(async element => {
      await document.fonts.ready;
      await Promise.all(element.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {})));
    });
    const overflow = await active.evaluate(element => ({
      horizontal: element.scrollWidth > element.clientWidth + 1,
      vertical: element.scrollHeight > element.clientHeight + 1,
      outside: [...element.querySelectorAll('h1,h2,.cardgrid,.splitCols,.flowBlock,.classificationItems,.modelAnswerCard,.termBlock')]
        .filter(node => node.getBoundingClientRect().height > 0)
        .map(node => node.getBoundingClientRect())
        .some(rect => rect.left < -1 || rect.right > innerWidth + 1 || rect.top < -1 || rect.bottom > innerHeight - 42)
    }));
    expect(overflow, `Slide ${number} should fit`).toEqual({ horizontal: false, vertical: false, outside: false });
  }

  for (const number of [1, 5, 10, 17, 22, 26, 31]) {
    await page.goto(`${route}#${number}`);
    const images = page.locator('.slide.is-active img');
    await expect(images).not.toHaveCount(0);
    for (let i = 0; i < await images.count(); i += 1) {
      expect(await images.nth(i).evaluate(image => image.complete && image.naturalWidth >= 1000)).toBe(true);
    }
  }
});
