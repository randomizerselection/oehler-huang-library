const {test,expect}=require('@playwright/test');
const path=require('node:path'),fs=require('node:fs'),vm=require('node:vm');
const route='http://127.0.0.1:4173/lessons/unit-3-decision-makers/3-2-households/index.html';
const context={window:{}};vm.createContext(context);context.IGCSE=context.window.IGCSE={};vm.runInContext(fs.readFileSync(path.join(__dirname,'../lessons/unit-3-decision-makers/3-2-households/slides.js'),'utf8'),context);
const slides=context.IGCSE.lesson.slides;
const output=path.resolve(__dirname,'../../../authoring/igcse-economics/households/review');
async function complete(page,s){
 const active=page.locator('.slide.is-active');
 if(s.type==='quiz')await active.locator('.choices .choice').nth(s.answer).click();
 else {
  const n=await active.locator('.partial-item:not(.is-visible)').count();
  for(let j=0;j<n;j++)await page.keyboard.press('ArrowRight');
  for(const blank of await active.locator('.definitionBlankAnswer,.blankAnswer').all())if(await blank.isVisible() && await blank.getAttribute('aria-expanded')!=='true')await blank.click();
 }
}
test('@smoke @responsive Households catalogue, native reveal and original question tables',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/economics/');
 await expect(page.locator('.topic-group').filter({hasText:'Households'}).getByRole('link',{name:'Open lesson',exact:true})).toHaveAttribute('href',/3-2-households/);
 await page.goto(route+'#five-household-influences');
 await expect(page.locator('.slide.is-active')).toHaveClass(/is-section/);
 await expect(page.locator('.is-active')).not.toContainText('Disposable income');
 await page.keyboard.press('ArrowRight');
 await expect(page.locator('.slide.is-active')).toHaveClass(/is-discussion/);
 await expect(page.locator('.is-active')).toContainText('spend more or less');
 await page.locator('.is-active .discussionAnswerButton').click();
 await expect(page.locator('.discussionAnswerDialog')).toBeVisible();
 await page.keyboard.press('Escape');
 await page.keyboard.press('ArrowRight');
 await expect(page.locator('.slide.is-active')).toHaveClass(/is-layout-household-influence-overview/);
 await expect(page.locator('.is-active .household-factor-picture svg')).toHaveCount(5);
 await expect(page.locator('.is-active')).toContainText('1. Disposable income');
 await expect(page.locator('.is-active')).toContainText('5. Culture');
 const factorPairs=[
  ['income-three-choices','household-influences-overview'],
  ['interest-three-choices','discuss-interest-rates'],
  ['confidence-household-choices','discuss-confidence'],
  ['age-three-choices','discuss-age'],
  ['culture-household-choices','discuss-culture']
 ];
 for(const [factor,prompt] of factorPairs){
  const i=slides.findIndex(s=>s.id===factor);expect(slides[i-1].id).toBe(prompt);
  await page.goto(route+'#'+factor);
  await expect(page.locator('.is-active .cardTitle')).toHaveCount(3);
  await expect(page.locator('.is-active .cardBody.is-visible')).toHaveCount(0);
  await expect(page.locator('.is-active .household-effect-signal')).toHaveCount(3);
  await expect(page.locator('.is-active .photoPanel img')).toHaveCount(1);
 }
 await page.goto(route+'#income-three-choices');
 await expect(page.locator('.is-active')).toContainText('income remaining after direct taxes have been deducted');
 await expect(page.locator('.is-active .partial-item.is-visible')).toHaveCount(0);
 await expect(page.locator('.is-active .cardTitle')).toHaveCount(3);
 await page.keyboard.press('ArrowRight');
 await expect(page.locator('.is-active .partial-item.is-visible')).toHaveCount(1);
 await expect(page.locator('.is-active .cardTitle')).toHaveCount(3);
 await page.keyboard.press('ArrowLeft');
 await expect(page.locator('.is-active .partial-item.is-visible')).toHaveCount(0);
 await page.goto(route+'#income-splits-between-spending-and-saving');
 await expect(page.locator('.is-active .household-scene')).toHaveAttribute('data-stage','0');
 await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');
 await expect(page.locator('.is-active .household-scene')).toHaveAttribute('data-stage','2');
 await page.keyboard.press('ArrowLeft');await expect(page.locator('.is-active .household-scene')).toHaveAttribute('data-stage','1');
 await page.goto(route+'#positive-saving-paper1');
 await expect(page.locator('.is-active .household-exam-table tbody tr')).toHaveCount(6);
 await expect(page.locator('.is-active .mcqExplanation')).toHaveAttribute('hidden','');
 await page.locator('.is-active .choices .choice').nth(3).click();
 await expect(page.locator('.is-active .mcqExplanation')).toContainText('$225');
 const url=page.url();await page.locator('.is-active').getByRole('button',{name:'Show mark scheme sources',exact:true}).click();
 await expect(page.locator('.classroom-source-dialog')).toBeVisible();await expect(page.locator('.classroom-source-dialog')).toContainText('Official answer: D');
 await page.keyboard.press('Escape');await expect(page.locator('.classroom-source-dialog')).not.toBeVisible();expect(page.url()).toBe(url);
 await expect(page.locator('.is-active').getByRole('button',{name:'Show mark scheme sources',exact:true})).toBeFocused();
 await page.goto(route+'#interest-rates-paper1');
 await expect(page.locator('.is-active .household-option-head')).toContainText('saving');
 await expect(page.locator('.is-active .choices .choice').nth(1)).toContainText('decrease');
 expect(errors).toEqual([]);
});
test('Households classroom visual audit: every completed slide at both 16:9 sizes',async({page})=>{
 test.setTimeout(240000);fs.mkdirSync(output,{recursive:true});
 const findings=[];
 for(const [w,h] of [[1440,810],[1920,1080]]){
  await page.setViewportSize({width:w,height:h});
  for(let i=0;i<slides.length;i++){
   const s=slides[i];await page.goto(route+'#'+s.id);await expect(page.locator('.slide.is-active')).toHaveAttribute('data-idx',String(slides.indexOf(s)));await complete(page,s);
   const active=page.locator('.slide.is-active');
   await expect(active).toHaveAttribute('data-idx',String(i));
   await active.screenshot({path:path.join(output,`${w}-${String(i+1).padStart(2,'0')}.png`)});
   const info=await active.evaluate(el=>{
    const r=el.getBoundingClientRect();
    const tooLow=[...el.querySelectorAll('h2,p,.choice,.cardBody,.flowChip,.modelAnswerText,table')].filter(x=>{
     if(x.closest('.has-household-scene .cardgrid'))return false;
     const s=getComputedStyle(x),b=x.getBoundingClientRect();return s.visibility!=='hidden'&&b.width&&b.height&&(b.bottom>r.bottom-25||b.right>r.right+1);
    }).map(x=>({text:x.textContent.slice(0,80),bottom:x.getBoundingClientRect().bottom}));
    return {tooLow,broken:[...el.querySelectorAll('img')].filter(x=>!x.complete||!x.naturalWidth).map(x=>x.src)};
   });
   if(info.tooLow.length||info.broken.length)findings.push({w,slide:i+1,id:s.id,...info});
  }
 }
 fs.writeFileSync(path.join(output,'findings.json'),JSON.stringify(findings,null,2));
 expect(findings).toEqual([]);
});
test('@responsive Households phone and study views',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 for(const s of slides){await page.goto(route+'#'+s.id);await expect(page.locator('.slide.is-active')).toHaveAttribute('data-idx',String(slides.indexOf(s)));await complete(page,s);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}
 await page.goto(route+'?view=print');await expect(page.locator('body')).toContainText('Saving is income not spent');
 await expect(page.locator('body')).toContainText('Explain the effects of an ageing population on spending and saving levels.');
 await expect(page.locator('body')).toContainText('Romanians have become wealthier');
 await expect(page.locator('body')).toContainText('4975');
 await page.goto(route+'?view=quiz');await expect(page.locator('body')).toContainText('Households: spending, saving and borrowing');
 await page.goto(route+'?view=flashcards');await expect(page.locator('body')).toContainText('Households flashcards');
});


