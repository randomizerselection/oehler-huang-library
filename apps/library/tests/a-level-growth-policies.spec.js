const {test,expect}=require('@playwright/test');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const url=pathToFileURL(path.resolve(__dirname,'../a-level/lessons/9-2-4-growth-policies/index.html')).href;

test('@responsive growth-policy reveals, original questions and complete model',async({page})=>{
  await page.goto(url+'#policy-opening-puzzle');
  const answer=page.locator('#policy-opening-puzzle [data-reveal-step="1"]');
  await expect(answer).not.toBeVisible();
  await page.getByRole('button',{name:'Reveal next part →',exact:true}).click();
  await expect(answer).toBeVisible();
  await page.getByRole('button',{name:'Previous explanation step',exact:true}).click();
  await expect(answer).not.toBeVisible();
  for(const [id,index,key] of [['cyclical-unemployment-retrieval',3,'D.'],['supply-policy-exit',2,'C.']]){
    await page.goto(url+'#'+id);
    await page.locator('#'+id+' [data-option]').nth(index).click();
    await expect(page.locator('#'+id+' .mcq-feedback')).toContainText(key);
  }
  await page.goto(url+'#policy-essay-question');
  await expect(page.locator('#policy-essay-question .essay-question p')).toHaveText('Evaluate how a country might increase its potential economic growth.');
  await expect(page.getByRole('button',{name:'Reveal next part →',exact:true})).not.toBeVisible();
  await page.getByRole('button',{name:'Show mark scheme sources',exact:true}).click();
  const source=page.getByRole('dialog',{name:'Content sources',exact:true});
  await expect(source.locator('img')).toBeVisible();
  expect(await source.locator('img').evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);
  await source.getByRole('button',{name:'Close Content sources',exact:true}).click();
  await page.goto(url+'#training-model');
  await page.getByRole('button',{name:'Read complete model'}).click();
  const model=page.getByRole('dialog',{name:'Complete essay model',exact:true});
  await expect(model.locator('section')).toHaveCount(5);
  await expect(model.locator('section').first()).toContainText('Potential economic growth is');
  await expect(model.locator('section').last()).toContainText('Overall, the best policy');
});

test('@responsive growth-policy deck: every stage, assets and classroom layout',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(url);
  const slides=await page.evaluate(()=>window.ALEVEL_LESSON.slides.map(s=>({id:s.id,kind:s.kind,max:s.scene?s.scene.steps.length-1:s.reveal?(s.kind==='table'?s.table.length-1:s.items.length):['steps','chain'].includes(s.kind)?s.items.length-1:0})));
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
        return [...el.querySelectorAll('.slide-body p,.slide-body h2,.slide-body td')].filter(n=>n.getBoundingClientRect().height&&getComputedStyle(n).visibility!=='hidden'&&n.getBoundingClientRect().bottom>bottom-12).map(n=>n.textContent.slice(0,80));
      });
      expect(overflow,s.id+' vertical overflow').toEqual([]);
    }
    if(process.env.GROWTH_QA_DIR)await page.locator('#'+s.id).screenshot({path:path.join(process.env.GROWTH_QA_DIR,`${String(index+1).padStart(2,'0')}-${s.id}.png`)});
  }
  expect(errors).toEqual([]);
});
