const {test,expect}=require('@playwright/test');
const path=require('node:path');
const fs=require('node:fs/promises');
const {pathToFileURL}=require('node:url');
const lesson=pathToFileURL(path.resolve(__dirname,'../a-level/lessons/9-1-3-income-gaps/index.html')).href;
const review=path.resolve(__dirname,'../../../tmp/income-gaps/ao-review');

test('income gaps: authentic questions, reversible modelling and source controls',async({page})=>{
  await page.setViewportSize({width:1440,height:810});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(lesson);
  const data=await page.evaluate(()=>window.ALEVEL_LESSON);
  expect(data.slides).toHaveLength(33);
  expect(data.slides.some(s=>s.kind==='worked'||s.id==='bakery-case')).toBe(false);
  expect(data.slides.filter(s=>s.kind==='mcq'||s.layout==='exam').every(s=>s.sourceRefs.some(k=>data.sourceLibrary[k].type==='Question paper')&&s.sourceRefs.some(k=>data.sourceLibrary[k].type==='Mark scheme'))).toBe(true);
  const show=async(id,step=0)=>page.evaluate(({id,step})=>{const d=window.EconPresentation.deck;d.show(d.lesson.slides.findIndex(s=>s.id===id),step);},{id,step});
  await show('retrieval-multiplier');
  await expect(page.locator('#retrieval-multiplier .mcq-feedback')).toBeHidden();
  await page.locator('#retrieval-multiplier [data-option="3"]').click();
  await expect(page.locator('#retrieval-multiplier .mcq-feedback')).toContainText('Correct.');
  await expect(page.locator('#retrieval-multiplier .mcq-feedback strong')).toHaveCount(3);
  await show('paper-four-model-diagnosis');
  await expect(page.locator('#paper-four-model-diagnosis .essay-row').first()).toHaveAttribute('aria-hidden','true');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#paper-four-model-diagnosis .essay-row').first()).toHaveAttribute('aria-hidden','false');
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('#paper-four-model-diagnosis .essay-row').first()).toHaveAttribute('aria-hidden','true');
  await page.getByRole('button',{name:'Show mark scheme sources',exact:true}).filter({visible:true}).click();
  await expect(page.locator('.lesson-source-dialog[open]')).toContainText('Maximum 21 without a conclusion');
  const url=page.url();await page.keyboard.press('ArrowRight');expect(page.url()).toBe(url);
  await page.keyboard.press('Escape');await expect(page.locator('.lesson-source-dialog')).not.toBeVisible();
  await page.locator('#paper-four-model-diagnosis .complete-model-button').click();
  await expect(page.locator('.complete-model-dialog[open] section')).toHaveCount(6);
  await page.keyboard.press('Escape');
  for(const id of ['paper-deflationary-distance','paper-inflationary-gap','exit-assessment']){
    await show(id);
    await expect(page.locator(`#${id} .exam-step`).first()).toHaveAttribute('aria-hidden','true');
    await page.locator(`#${id} .exam-image-button`).click();
    await expect(page.locator('.exam-lightbox[open] img')).toBeVisible();
    const before=page.url();await page.keyboard.press('ArrowRight');expect(page.url()).toBe(before);
    await page.keyboard.press('Escape');
    await page.keyboard.press('ArrowRight');
    await expect(page.locator(`#${id} .exam-step`).first()).toHaveAttribute('aria-hidden','false');
    await expect(page.locator(`#${id} .exam-original img`)).toBeVisible();
    await page.keyboard.press('r');
    await expect(page.locator(`#${id} .exam-step`).first()).toHaveAttribute('aria-hidden','true');
  }
  await show('paper-injection',3);
  await expect(page.locator('#paper-injection .exam-original')).toContainText('$1000 billion');
  await expect(page.locator('#paper-injection .exam-reasoning')).toContainText('+$40 billion');
  await show('closing-deflationary-gap',0);
  await expect(page.locator('#closing-deflationary-gap .shift-line')).toHaveCSS('opacity','0');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#closing-deflationary-gap .shift-line')).toHaveCSS('opacity','1');
  await page.keyboard.press('r');
  await expect(page.locator('#closing-deflationary-gap .shift-line')).toHaveCSS('opacity','0');
  await fs.mkdir(review,{recursive:true});const overflows=[];
  for(const s of data.slides){
    const i=data.slides.indexOf(s),max=s.scene?s.scene.steps.length-1:s.reveal?(s.kind==='table'?s.table.length-1:s.items.length):['steps','chain'].includes(s.kind)?s.items.length-1:0;
    await show(s.id,max);
    if(s.kind==='mcq')await page.locator(`#${s.id} [data-option="${s.answer}"]`).click();
    await page.evaluate(()=>document.fonts.ready);
    const bad=await page.locator(`#${s.id}`).evaluate(root=>{
      const r=root.getBoundingClientRect();
      return [...root.querySelectorAll('.slide-header,.slide-body,h1,h2,p,figure,table,svg,button')].filter(el=>{
        if(!el.checkVisibility()||el.closest('[hidden],.unrevealed,.is-hidden'))return false;
        const b=el.getBoundingClientRect();return b.right>r.right+2||b.bottom>r.bottom+2||b.left<r.left-2||b.top<r.top-2;
      }).map(el=>({tag:el.tagName,text:el.textContent.slice(0,100)}));
    });
    if(bad.length)overflows.push({id:s.id,bad});
    await page.locator(`#${s.id}`).screenshot({path:path.join(review,`${String(i+1).padStart(2,'0')}-${s.id}.png`),animations:'disabled'});
  }
  await fs.writeFile(path.join(review,'layout.json'),JSON.stringify(overflows,null,2));
  expect(overflows).toEqual([]);expect(errors).toEqual([]);
});

test('income gaps: new layouts on narrow screens and reduced motion',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});
  for(const [id,step] of [['paper-four-model-diagnosis',3],['paper-inflationary-gap',3],['gaps-compared',2],['gaps-both',3],['output-gaps',2],['full-employment-unemployment',2],['uk-deflationary-example',2],['canada-inflationary-example',2],['lesson-conclusion',0]]){
    await page.goto(lesson+`#${id}/${step}`);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
  await page.goto(lesson+'#paper-four-model-diagnosis/3');
  await expect(page.locator('#paper-four-model-diagnosis .essay-row').first()).toHaveCSS('transition-duration','0s');
  await page.locator('#paper-four-model-diagnosis .lesson-sources button').first().click();
  await expect(page.locator('.lesson-source-dialog')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
