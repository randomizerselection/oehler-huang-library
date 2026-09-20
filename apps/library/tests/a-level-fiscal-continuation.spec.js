const {test,expect}=require('@playwright/test');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const url=pathToFileURL(path.resolve(__dirname,'../a-level/lessons/9-2-2-fiscal-expansion-multiplier/index.html')).href;

test('40-minute continuation separates core practice from the complete essay @responsive',async({page})=>{
  await page.goto(url);
  const data=await page.evaluate(()=>({meta:window.ALEVEL_LESSON.meta,ids:window.ALEVEL_LESSON.slides.map(s=>s.id)}));
  expect(data.meta.durationMinutes).toBe(40);
  expect(data.meta.startsAfter).toBe('gap-measures');
  expect(data.ids.indexOf('lesson-conclusion')).toBe(16);
  expect(data.ids.indexOf('independent-paragraphs')).toBeLessThan(data.ids.indexOf('feedback-analysis'));
  expect(data.ids.indexOf('current-model-mechanism')).toBeGreaterThan(data.ids.indexOf('lesson-conclusion'));
  await page.goto(url+'#independent-paragraphs');
  await expect(page.locator('#independent-paragraphs .essay-question')).toContainText('Due to the multiplier process');
  await expect(page.locator('#independent-paragraphs .essay-focus')).toContainText('partial practice');
  await expect(page.locator('#independent-paragraphs .essay-row').first()).not.toBeVisible();
  await page.goto(url+'#current-model-mechanism');
  await page.getByRole('button',{name:'Read complete model'}).click();
  const model=page.getByRole('dialog',{name:'Complete essay model',exact:true});
  await expect(model.locator('section')).toHaveCount(3);
  await expect(model).toContainText('AO1 + AO2: 14; AO3: 6');
  await expect(model).not.toContainText('_{');
  await model.getByRole('button',{name:'Close Complete essay model',exact:true}).click();
  await page.goto(url+'#exit-fiscal-confidence');
  await page.locator('#exit-fiscal-confidence [data-option]').nth(1).click();
  await expect(page.locator('#exit-fiscal-confidence .mcq-feedback')).toContainText('B. Low confidence');
});

test('continuation renders all revealed content and original sources @responsive',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);
  const slides=await page.evaluate(()=>window.ALEVEL_LESSON.slides.map(s=>({id:s.id,kind:s.kind,max:s.scene?s.scene.steps.length-1:s.reveal?(s.kind==='table'?s.table.length-1:s.items.length):s.kind==='steps'?s.items.length-1:0})));
  for(let index=0;index<slides.length;index++){
    const s=slides[index];
    for(let step=0;step<=s.max;step++){
      await page.evaluate(({index,step})=>window.EconPresentation.deck.show(index,step),{index,step});
      await expect(page.locator('#'+s.id)).toBeVisible();
    }
    const root=page.locator('#'+s.id);
    if(await root.locator('[data-reveal]').count())await root.locator('[data-reveal]').click();
    expect(await root.evaluate(el=>el.scrollWidth-el.clientWidth),s.id).toBeLessThanOrEqual(1);
    if(s.kind==='diagram')await expect(root.locator('svg desc')).not.toHaveText('');
  }
  await page.goto(url+'#current-essay-question');
  await page.getByRole('button',{name:'Show mark scheme sources',exact:true}).click();
  const dialog=page.getByRole('dialog',{name:'Content sources',exact:true});
  await expect(dialog.locator('img')).toHaveCount(2);
  expect(await dialog.locator('img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0))).toBe(true);
  expect(errors).toEqual([]);
});
