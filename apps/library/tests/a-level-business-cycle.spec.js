const {test,expect}=require('@playwright/test');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const url=pathToFileURL(path.resolve(__dirname,'../a-level/lessons/9-2-3-business-cycle/index.html')).href;

test('@responsive business cycle teaches the syllabus with original exam practice',async({page})=>{
  await page.goto(url+'#japan-expansion-evidence');
  await expect(page.locator('#japan-expansion-evidence .essay-question')).toContainText('Explain two pieces of evidence');
  await expect(page.locator('#japan-expansion-evidence .essay-focus')).toContainText('falling unemployment rate');
  await expect(page.locator('#japan-expansion-evidence .essay-row').first()).not.toBeVisible();
  await page.getByRole('button',{name:'Reveal next part →',exact:true}).click();
  await expect(page.locator('#japan-expansion-evidence .essay-row').first()).toBeVisible();
  await expect(page.locator('#japan-expansion-evidence .essay-row').first()).toContainText('Identify · 1 mark');
  await expect(page.locator('#japan-expansion-evidence .essay-row').first()).toContainText('Explain · 1 mark');
  await expect(page.locator('#japan-expansion-evidence .essay-row').nth(1)).not.toBeVisible();
  await page.getByRole('button',{name:'Show mark scheme sources',exact:true}).click();
  const source=page.getByRole('dialog',{name:'Content sources',exact:true});
  await expect(source.locator('img')).toBeVisible();
  expect(await source.locator('img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await source.getByRole('button',{name:'Close Content sources',exact:true}).click();
  for(const [id,answer,feedback] of [['automatic-stabiliser-mcq',1,'B.'],['overheating-exit',0,'A.']]){
    await page.goto(url+'#'+id);await page.locator('#'+id+' [data-option]').nth(answer).click();
    await expect(page.locator('#'+id+' .mcq-feedback')).toContainText(feedback);
  }
  const ids=await page.evaluate(()=>window.ALEVEL_LESSON.slides.map(s=>s.id));
  expect(ids.indexOf('lesson-conclusion')).toBeLessThan(ids.indexOf('full-employment-essay-guidance'));
  await page.goto(url+'#full-employment-model-demand');
  await page.getByRole('button',{name:'Read complete model'}).click();
  const model=page.getByRole('dialog',{name:'Complete essay model',exact:true});
  await expect(model.locator('section')).toHaveCount(3);
  await expect(model).toContainText('Economic growth can only occur');
  await expect(model).not.toContainText('Due to the multiplier process');
});

test('@responsive cycle curve moves forward and formative answers reveal separately',async({page})=>{
  await page.goto(url+'#cycle-phases-table/4');
  const positions=await page.locator('#cycle-phases-table .phase-wave path').evaluate(p=>Array.from({length:101},(_,i)=>p.getPointAtLength(p.getTotalLength()*i/100).x));
  expect(positions.every((x,i)=>i===0||x>positions[i-1])).toBe(true);
  await page.goto(url+'#automatic-or-new-policy');
  const answers=page.locator('#automatic-or-new-policy .classification-feedback');
  await expect(answers.first()).not.toBeVisible();await expect(answers.nth(1)).not.toBeVisible();
  await expect(page.locator('#automatic-or-new-policy .classification-cases')).toContainText('existing eligibility rules');
  await page.getByRole('button',{name:'Reveal next part →',exact:true}).click();
  await expect(answers.first()).toBeVisible();await expect(answers.nth(1)).not.toBeVisible();
  await page.getByRole('button',{name:'Reveal next part →',exact:true}).click();
  await expect(answers.nth(1)).toBeVisible();
  await page.getByRole('button',{name:'Previous explanation step',exact:true}).click();
  await expect(answers.nth(1)).not.toBeVisible();
});

test('@responsive business-cycle diagrams and all revealed slides render',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(url);
  const slides=await page.evaluate(()=>window.ALEVEL_LESSON.slides.map(s=>({id:s.id,kind:s.kind,max:s.scene?s.scene.steps.length-1:s.reveal?(s.kind==='table'?s.table.length-1:s.items.length):s.kind==='steps'?s.items.length-1:0})));
  for(let index=0;index<slides.length;index++){
    const s=slides[index];
    for(let step=0;step<=s.max;step++){
      await page.evaluate(({index,step})=>window.EconPresentation.deck.show(index,step),{index,step});
      await expect(page.locator('#'+s.id)).toBeVisible();
    }
    expect(await page.locator('#'+s.id).evaluate(el=>el.scrollWidth-el.clientWidth),s.id).toBeLessThanOrEqual(1);
    for(const img of await page.locator('#'+s.id+' img').all())expect(await img.evaluate(el=>el.complete&&el.naturalWidth>0),s.id+' image').toBe(true);
    if(page.viewportSize().width>760){
      const overflow=await page.locator('#'+s.id).evaluate(el=>{
        const bottom=el.getBoundingClientRect().bottom;
        return [...el.querySelectorAll('.slide-body p,.slide-body h2,.slide-body blockquote,.slide-body strong')].filter(n=>n.getBoundingClientRect().height&&getComputedStyle(n).visibility!=='hidden'&&n.getBoundingClientRect().bottom>bottom-12).map(n=>n.textContent.slice(0,80));
      });
      expect(overflow,s.id+' vertical overflow').toEqual([]);
    }
    if(process.env.CYCLE_QA_DIR)await page.locator('#'+s.id).screenshot({path:path.join(process.env.CYCLE_QA_DIR,`${String(index+1).padStart(2,'0')}-${s.id}.png`)});
    if(s.kind==='diagram')await expect(page.locator('#'+s.id+' svg desc')).not.toHaveText('');
  }
  await page.goto(url+'#stabiliser-cycle-diagram/2');
  await expect(page.locator('#stabiliser-cycle-diagram svg')).toContainText('With stabilisers');
  await expect(page.locator('#stabiliser-cycle-diagram svg')).toContainText('Time');
  expect(errors).toEqual([]);
});

test('@responsive cycle visuals reverse cleanly and essay question precedes guidance',async({page})=>{
  await page.goto(url+'#cycle-opening-puzzle');
  const output=page.locator('#cycle-opening-puzzle [data-reveal-step="1"]');
  await expect(output).not.toBeVisible();
  await page.getByRole('button',{name:'Reveal next part →',exact:true}).click();
  await expect(output).toBeVisible();
  await page.getByRole('button',{name:'Previous explanation step',exact:true}).click();
  await expect(output).not.toBeVisible();
  const ids=await page.evaluate(()=>window.ALEVEL_LESSON.slides.map(s=>s.id));
  expect(ids.indexOf('japan-case-introduction')+1).toBe(ids.indexOf('japan-expansion-evidence'));
  expect(ids.indexOf('full-employment-essay-question')+1).toBe(ids.indexOf('full-employment-essay-guidance'));
  await page.goto(url+'#full-employment-essay-question');
  await expect(page.locator('#full-employment-essay-question .essay-question')).toContainText('Economic growth can only occur when an economy is below full employment.');
  await expect(page.getByRole('button',{name:'Reveal next part →',exact:true})).not.toBeVisible();
});
