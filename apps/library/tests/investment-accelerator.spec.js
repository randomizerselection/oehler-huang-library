const {test,expect}=require('@playwright/test');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const url=pathToFileURL(path.resolve(__dirname,'../a-level/lessons/9-1-2-investment-accelerator/index.html')).href;

test('comparison sides and determinant rows reveal and reverse independently',async({page})=>{
  await page.goto(url+'#autonomous-induced-investment');
  const sides=page.locator('#autonomous-induced-investment [data-reveal-step]');
  await expect(sides.locator('strong.key-point').first()).toHaveText('independently of current income or output');
  await expect(page.locator('#autonomous-induced-investment [aria-hidden="false"]')).toHaveCount(0);
  await page.keyboard.press('ArrowRight');
  await expect(sides.nth(0)).toHaveAttribute('aria-hidden','false');
  await expect(sides.nth(1)).toHaveAttribute('aria-hidden','true');
  await page.keyboard.press('ArrowRight');
  await expect(sides.nth(1)).toHaveAttribute('aria-hidden','false');
  await page.keyboard.press('ArrowLeft');
  await expect(sides.nth(1)).toHaveAttribute('aria-hidden','true');
  await page.keyboard.press('r');
  await expect(sides.nth(0)).toHaveAttribute('aria-hidden','true');
  await page.goto(url+'#investment-determinants');
  const rows=page.locator('#investment-determinants tbody tr');
  await expect(rows).toHaveCount(4);
  for(let shown=0;shown<=4;shown++){
    await expect(page.locator('#investment-determinants tbody tr[aria-hidden="false"]')).toHaveCount(shown);
    if(shown<4)await page.keyboard.press('ArrowRight');
  }
  await page.keyboard.press('ArrowLeft');
  await expect(rows.last()).toHaveAttribute('aria-hidden','true');
  if(page.viewportSize().width>700)await expect(page.locator('#investment-determinants thead')).toBeVisible();
  else await expect(rows.first().locator('td').first()).toHaveAttribute('data-label','Illustrative change');
});

test('investment diagrams preserve the income-growth distinction and reach the new equilibrium',async({page})=>{
  await page.goto(url+'#autonomous-induced-investment-diagrams/3');
  const comparison=page.locator('#autonomous-induced-investment-diagrams');
  await expect(comparison.locator('svg')).toContainText('Income growth, ΔY (£m)');
  await expect(comparison.locator('.step-copy')).toContainText('induced investment rises from £20m to £40m');
  await expect(comparison.locator('svg .is-hidden')).toHaveCount(0);
  await page.goto(url+'#autonomous-investment-shift/3');
  const shift=page.locator('#autonomous-investment-shift');
  await expect(shift.locator('.step-title')).toHaveText('Equilibrium income rises from £400m to £600m');
  await expect(shift.locator('svg')).toContainText('E₁');
  await expect(shift.locator('svg .income-label')).toHaveText('ΔY = £200m');
  expect(await page.evaluate(()=>{
    const s=window.ALEVEL_LESSON.slides.find(s=>s.id==='autonomous-investment-shift').scene;
    return (s.investment+s.delta)/(1-s.mpc);
  })).toBe(600);
  await page.keyboard.press('r');
  await expect(shift.locator('svg .income-label').locator('..')).toHaveAttribute('aria-hidden','true');
});

test('the concise accelerator definition highlights the defining relationship',async({page})=>{
  await page.goto(url+'#accelerator-principle');
  const definition=page.locator('#accelerator-principle .definition-text');
  await expect(definition).toHaveText('A change in the growth of demand can cause a larger percentage change in investment.');
  await expect(definition.locator('strong')).toHaveCount(2);
  await expect(page.locator('#accelerator-principle .definition-text-zh strong')).toHaveCount(2);
});

test('exam feedback keeps the original stimulus visible before and after the method',async({page})=>{
  await page.goto(url+'#accelerator-paper-income-method');
  const slide=page.locator('#accelerator-paper-income-method');
  const question=await page.evaluate(()=>window.ALEVEL_LESSON.slides.find(s=>s.id==='accelerator-paper-income-table').question);
  await expect(slide.locator('.stimulus-question')).toHaveText(question);
  await expect(slide.locator('tbody tr')).toHaveCount(6);
  await expect(slide.locator('.stimulus-options')).toContainText('C  year 5');
  await expect(slide.locator('.solution-text')).toBeHidden();
  await slide.locator('[data-reveal]').click();
  await expect(slide.locator('.solution-text')).toContainText('Year 5: 30 > 20');
  await expect(slide.locator('.stimulus-question')).toBeVisible();
  await expect(slide.locator('tbody')).toContainText('2350');
});

test('hinge questions diagnose misconceptions and keep feedback hidden until a choice',async({page})=>{
  for(const [id,answer] of [['accelerator-stock-flow-check',1],['accelerator-data',0],['accelerator-growth-check',1],['accelerator-capacity-check',1]]){
    await page.goto(url+'#'+id);
    const slide=page.locator('#'+id);
    await expect(slide.locator('.mcq-feedback')).toBeHidden();
    await slide.locator('[data-option]').nth(answer).click();
    await expect(slide.locator('.mcq-feedback')).toContainText('Correct');
    await page.keyboard.press('r');
    await expect(slide.locator('.mcq-feedback')).toBeHidden();
  }
  await page.goto(url+'#accelerator-machine-visual/3');
  await expect(page.locator('#accelerator-machine-visual svg')).toContainText('1 purchased');
  await expect(page.locator('#accelerator-machine-visual svg')).toContainText('3 purchased');
});
