const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const url = pathToFileURL(path.resolve(__dirname, '../a-level/lessons/9-2-1-growth-output-gaps/index.html')).href;

test('growth lesson renders every reveal state without runtime errors @smoke @responsive', async ({ page }) => {
  const errors=[];
  page.on('pageerror', e=>errors.push(e.message));
  await page.goto(url);
  const slides=await page.evaluate(()=>window.ALEVEL_LESSON.slides.map(s=>({id:s.id,kind:s.kind,max:s.scene?s.scene.steps.length-1:s.reveal?(s.kind==='table'?s.table.length-1:s.items.length):s.kind==='steps'||s.kind==='chain'?s.items.length-1:0})));
  expect(slides.map(s=>s.id)).toEqual(expect.arrayContaining(['potential-full-employment','keynesian-growth','negative-gap-adas','positive-gap-adas','multiplier-gap-bridge','stagflation-policy','current-essay-question','full-employment-essay-guidance','stagflation-essay-guidance']));
  for(let index=0;index<slides.length;index++) {
    const s=slides[index];
    for(let step=0;step<=s.max;step++) {
      await page.evaluate(({index,step})=>window.EconPresentation.deck.show(index,step),{index,step});
      const root=page.locator(`#${s.id}`);
      await expect(root).toBeVisible();
      await expect(page.locator('#status')).toContainText(`${index+1} / ${slides.length}`);
      if(s.kind==='diagram') {
        await expect(root.locator('svg desc')).not.toHaveText('');
        expect(await root.locator('[data-stage]').evaluateAll((nodes,step)=>nodes.every(n=>(n.getAttribute('aria-hidden')==='true')===(step<+n.dataset.stage||step>+n.dataset.until)),step)).toBe(true);
      }
    }
    const root=page.locator(`#${s.id}`);
    const reveal=root.locator('[data-reveal]');
    if(await reveal.count()) { await expect(root.locator('.solution-text')).toBeHidden();await reveal.click();await expect(root.locator('.solution-text')).toBeVisible(); }
    if(s.kind==='mcq') { await root.locator('[data-option]').first().click();await expect(root.locator('.paper-question')).toBeVisible();await expect(root.locator('.mcq-feedback')).toBeVisible(); }
    expect(await root.evaluate(el=>el.scrollWidth-el.clientWidth),s.id).toBeLessThanOrEqual(1);
  }
  expect(errors).toEqual([]);
});

test('growth lesson reverses diagrams and preserves the original essay during feedback @smoke', async ({ page }) => {
  await page.goto(url+'#ppc-growth');
  const root=page.locator('#ppc-growth');
  await expect(root.locator('[data-stage="1"]')).toHaveAttribute('aria-hidden','true');
  await root.locator('[data-step-next]').click();
  await expect(root.locator('[data-stage="1"]')).toHaveAttribute('aria-hidden','false');
  await expect(page.locator('#status')).toContainText('2/4');
  await root.locator('[data-step-back]').click();
  await expect(root.locator('[data-stage="1"]')).toHaveAttribute('aria-hidden','true');
  await expect(page.locator('#status')).toContainText('1/4');
  await page.goto(url+'#current-model-mechanism/2');
  await expect(page.locator('#current-model-mechanism .essay-question')).toContainText('Due to the multiplier process');
  await page.getByRole('button',{name:'Read complete model'}).click();
  const model=page.getByRole('dialog',{name:'Complete essay model',exact:true});
  await expect(model.locator('section')).toHaveCount(3);
  await expect(model).toContainText('2026–2028 syllabus');
});


test('current essay models are isolated and 2026 essay leads the assessment @smoke', async ({ page }) => {
  await page.goto(url+'#current-model-mechanism/3');
  const ids=await page.evaluate(()=>window.ALEVEL_LESSON.slides.map(s=>s.id));
  expect(ids.indexOf('current-essay-question')).toBeLessThan(ids.indexOf('lesson-conclusion'));
  expect(ids).not.toContain('paper-four-question');
  expect(ids).not.toContain('infrastructure-section');
  expect(ids).not.toContain('keynesian-as-ranges');
  expect(ids).not.toContain('adas-model-comparison');
  for(const id of ['negative-gap','positive-gap','output-gap-percentage','gap-worked','gap-independent']) expect(ids.indexOf(id)).toBeGreaterThan(ids.indexOf('lesson-conclusion'));
  expect(ids.indexOf('multiplier-gap-bridge')).toBeLessThan(ids.indexOf('current-essay-question'));
  expect(ids.indexOf('lesson-conclusion')).toBeLessThan(ids.indexOf('stagflation-shock'));
  for (const [id,text,absent] of [['current-model-mechanism','Due to the multiplier process','Economic growth can only occur'],['full-employment-model-demand','Economic growth can only occur','A country is experiencing stagflation'],['stagflation-model-demand','A country is experiencing stagflation','Due to the multiplier process']]) {
    await page.goto(url+'#'+id+'/3');
    await page.getByRole('button',{name:'Read complete model'}).click();
    const model=page.getByRole('dialog',{name:'Complete essay model',exact:true});
    await expect(model.locator('section')).toHaveCount(3);
    await expect(model).toContainText(text);
    await expect(model).not.toContainText(absent);
    await expect(model).toContainText('AO1 + AO2: 14; AO3: 6');
    await model.getByRole('button',{name:'Close Complete essay model',exact:true}).click();
  }
});


test('notation and comparison tables stay correctly rendered through reversible stages @smoke @responsive', async ({page})=>{
  await page.goto(url+'#potential-full-employment/2');
  await expect(page.locator('#potential-full-employment sub')).toHaveText('fe');
  await page.goto(url+'#negative-gap-adas/2');
  await expect(page.locator('#negative-gap-adas .step-copy sub')).toHaveText('fe');
  await expect(page.locator('#negative-gap-adas svg .math-sub')).toHaveText('fe');
  await page.locator('#negative-gap-adas [data-step-back]').click();
  await page.locator('#negative-gap-adas [data-step-next]').click();
  await expect(page.locator('#negative-gap-adas .step-copy')).not.toContainText('_{');
  await page.goto(url+'#fiscal-injection-formula');
  await expect(page.locator('#fiscal-injection-formula .math-fraction')).toHaveCount(2);
  await page.goto(url+'#current-model-diagram/2');
  await expect(page.locator('#current-model-diagram .math-fraction')).toHaveCount(1);
  await page.getByRole('button',{name:'Read complete model'}).click();
  await expect(page.locator('.complete-model-dialog .math-fraction')).toHaveCount(1);
  await expect(page.locator('.complete-model-dialog')).not.toContainText('_{');
});
