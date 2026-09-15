const {test,expect}=require('@playwright/test');
const path=require('node:path');
const fs=require('node:fs');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'../lessons/unit-4-government/4-4-supply-side-policy');
const url=n=>pathToFileURL(path.join(root,`lesson-${n}.html`)).href;
// Measure within the teaching block so phone auto-scrolling is not mistaken
// for a layout shift when Playwright brings the next answer button into view.
const answerGeometry=el=>{
 const r=el.getBoundingClientRect(),p=el.closest('.flowRow,.slide').getBoundingClientRect();
 return {x:r.x-p.x,y:r.y-p.y,width:r.width,height:r.height};
};

for(const n of [4,5])test(`effects ${n}: completed slides fit classroom and phone @smoke @responsive`,async({page},info)=>{
 test.setTimeout(180000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const phone=info.project.name.includes('phone');
 const sizes=phone?[{width:390,height:844}]:[{width:1440,height:810},{width:1920,height:1080}];
 for(const size of sizes){
  await page.setViewportSize(size);await page.goto(url(n));
  const count=await page.locator('.slide').count();
  for(let i=1;i<=count;i++){
   await page.goto(url(n)+'#'+i);
   const active=page.locator('.slide.is-active');
   const partials=await active.locator('.partial-item:not(.is-visible)').count();
   for(let j=0;j<partials;j++)await page.keyboard.press('ArrowRight');
   for(const button of await active.locator('.blankAnswer').all()){
    const before=await button.evaluate(answerGeometry);await button.click();const after=await button.evaluate(answerGeometry);
    for(const dimension of ['x','y','width','height'])expect(Math.abs(after[dimension]-before[dimension]),`L${n} slide ${i}: revealing a term keeps its position`).toBeLessThan(1);
   }
   if(await active.locator('.ssp-scene').count())for(let j=0;j<2;j++)await active.locator('[data-next]').click();
   if(await active.locator('.sspPpc').count())for(let j=0;j<3;j++)await active.getByRole('button',{name:'Next step',exact:true}).click();
   await active.evaluate(async el=>{await document.fonts.ready;await Promise.all(el.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{})));});
   for(const img of await active.locator('img').all())expect(await img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),`L${n} slide ${i} page width`).toBe(true);
   if(!phone){
    const clipped=await active.evaluate(el=>[...el.querySelectorAll('h1,h2,.classificationItems,.modelAnswerCard,.flowRow,.cardgrid,.ssp-scene,.sspPpcShell,.choices.is-outcomes')].filter(x=>x.getBoundingClientRect().height>0).map(x=>({tag:x.className||x.tagName,r:x.getBoundingClientRect().toJSON()})).filter(({r})=>r.x<0||r.right>innerWidth+2||r.top<0||r.bottom>innerHeight-36));
    expect.soft(clipped,`L${n} slide ${i} at ${size.width}`).toEqual([]);
    const tiny=await active.evaluate(el=>[...el.querySelectorAll('.cardBody,.classificationAnswer,.classificationItemTop p,.modelAnswerText p,.flowText,.ssp-fraction>span,.ssp-equals')].filter(x=>x.getBoundingClientRect().height>0&&parseFloat(getComputedStyle(x).fontSize)<27).map(x=>({tag:x.className,size:getComputedStyle(x).fontSize})));
    expect.soft(tiny,`L${n} slide ${i} font sizes`).toEqual([]);
    if(process.env.SSP_SCREENSHOTS&&size.width===1440){const out=process.env.SSP_SCREENSHOT_DIR||path.resolve(__dirname,'../../..','authoring/igcse-economics/review/supply-side-effects');fs.mkdirSync(out,{recursive:true});await page.screenshot({path:path.join(out,`L${n}-${String(i).padStart(2,'0')}.png`)});}
   }
  }
 }
 expect(errors).toEqual([]);
});

test('effects: source dialog and answers preserve question state @smoke',async({page})=>{
 await page.goto(url(5));
 const questionIndex=Number(await page.locator('.slide.is-exam').first().getAttribute('data-idx'))+1;
 await page.goto(url(5)+'#'+questionIndex);
 const active=page.locator('.slide.is-active');
 const button=active.getByRole('button',{name:'Show mark scheme sources'});
 await button.click();
 const dialog=page.getByRole('dialog',{name:'Content sources'});
 await expect(dialog).toContainText('2024ON-21 Q3(d)');
 await page.keyboard.press('ArrowRight');await page.keyboard.press('Home');
 expect(await page.evaluate(()=>location.hash)).toBe('#'+questionIndex);
 await page.keyboard.press('Escape');await expect(dialog).toBeHidden();await expect(button).toBeFocused();
 await active.getByRole('button',{name:'Show question paper sources'}).click();
 await expect(dialog).toContainText('whether or not improving education');
 await expect(dialog).not.toContainText('Accepted points');
 await page.mouse.click(1,1);await expect(dialog).toBeHidden();
 await page.goto(url(5)+'#'+(questionIndex+1));
 await expect(page.locator('.slide.is-active .modelAnswerParagraphs .is-visible')).toHaveCount(0);
 await page.keyboard.press('ArrowRight');
 await expect(page.locator('.slide.is-active .modelAnswerParagraphs .is-visible')).toHaveCount(1);
 await page.keyboard.press('ArrowLeft');
 await expect(page.locator('.slide.is-active .modelAnswerParagraphs .is-visible')).toHaveCount(0);
 await page.goto(url(4)+'#5');await page.keyboard.press('ArrowRight');
 await expect(page.locator('.ssp-scene')).toHaveAttribute('data-frame','1');
 await expect(page.locator('.ssp-scene [data-output]')).toHaveCount(27);
 await page.keyboard.press('ArrowLeft');await expect(page.locator('.ssp-scene [data-output]')).toHaveCount(18);
});

for(const n of [4,5])test(`effects ${n}: study views match the split @smoke @responsive`,async({page})=>{
 await page.goto(url(n)+'?view=print');await expect(page.locator('.handoutDocument')).toBeVisible();
 await expect(page.locator('.handoutDocument')).toContainText(n===4?/import expenditure/i:/government spending/i);
 await page.goto(url(n)+'?view=quiz');await expect(page.locator('.quizQuestion')).toHaveCount(n===4?6:7);
 await page.goto(url(n)+'?view=flashcards');await expect(page.locator('.flashcardPosition')).toHaveText(n===4?'6 left':'7 left');
});
