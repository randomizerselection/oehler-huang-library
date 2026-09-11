const {test,expect}=require('@playwright/test');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const route='investment-analysis/lessons/1-1-3-assumed-return';
const scope={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,route,'slides.js'),'utf8'),scope);
const lesson=scope.window.INVESTMENT_COURSE.lesson,slides=lesson.slides;
const number=id=>slides.findIndex(s=>s.id===id)+1;
const output=path.resolve(root,'../../authoring/investment-course/tmp/assumed-return');

test.beforeEach(async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.route('https://hm.baidu.com/**',route=>route.fulfill({contentType:'text/javascript',body:''}));
  await page.route('http://assumptions.test/**',async request=>{
    const file=path.resolve(root,decodeURIComponent(new URL(request.request().url()).pathname).slice(1));
    if(!file.startsWith(root+path.sep))return request.fulfill({status:403,body:''});
    try {await request.fulfill({contentType:({'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.json':'application/json'})[path.extname(file)]||'text/plain',body:fs.readFileSync(file)});}
    catch {await request.fulfill({status:404,body:''});}
  });
});
async function open(page,id){await page.goto(`http://assumptions.test/${route}/index.html#${number(id)}`);return page.locator(`.slide[data-slide-id="${id}"]`);}

test('@smoke continuation respects reported coverage and complete hidden models',async({page})=>{
  expect(lesson.meta.lesson).toBe(4);
  expect(lesson.meta.priorCoverage.firstUntaughtSlideId).toBe('section-projections');
  expect(number('final-check')).toBe(22);
  expect(slides).toHaveLength(25);
  expect(number('retrieval-compounding')).toBeLessThan(number('section-assumed-return'));
  expect(number('changing-returns-check')).toBeGreaterThan(number('final-check'));
  expect(slides.some(s=>/nominal-return|real-return-formula/.test(s.id))).toBe(false);
  const retrieval=await open(page,'annualised-return-model');
  await expect(retrieval.locator('.retrieval-equation').first()).not.toBeVisible();
  await retrieval.locator('summary').click();
  await expect(retrieval.locator('.retrieval-equation')).toHaveCount(3);
  await expect(retrieval).toContainText('18.07%');
  await expect(retrieval.locator('.retrieval-equation sup .math-fraction > span')).toHaveText(['1','5']);
  const realPractice=await open(page,'annualised-real-practice');
  await realPractice.locator('summary').click();
  await expect(realPractice).toContainText('14.32%');
  const rate=await open(page,'rate-comparison');
  await expect(rate.locator('.comparison-year.is-visible')).toHaveCount(0);
  await expect(rate.locator('.comparison-readout:not([hidden])')).toContainText('Year 1:');
  for(let n=1;n<=3;n++){await page.keyboard.press('ArrowRight');await expect(rate.locator('.comparison-year.is-visible')).toHaveCount(n);}
  await expect(rate.locator('.comparison-readout:not([hidden])')).toContainText('¥2,450.09');
  await page.keyboard.press('ArrowLeft');
  await expect(rate.locator('.comparison-year.is-visible')).toHaveCount(2);
  await expect(rate.locator('.comparison-readout:not([hidden])')).toContainText('¥2,289.8');
  const formula=await open(page,'annualised-return-formula');
  await expect(formula.locator('.equation-step').first()).toContainText('FV = P(1 + r)');
  await expect(formula.locator('.equation-step.partial-item.is-visible')).toHaveCount(0);
  for(let n=1;n<=3;n++){await page.keyboard.press('ArrowRight');await expect(formula.locator('.equation-step.partial-item.is-visible')).toHaveCount(n);}
  await expect(formula.locator('.equation-step').last().locator('.math-ratio-base .math-fraction > span')).toHaveText(['FV','P']);
  await expect(formula.locator('.equation-step').last().locator('sup .math-fraction > span')).toHaveText(['1','n']);
  const lin=await open(page,'lin-required-return');
  await lin.locator('summary').click();
  await expect(lin).toContainText('6.27%');
  await expect(lin).toContainText('¥84.75');
  const exit=await open(page,'final-check');
  await expect(exit.locator('.retrieval-equation').first()).not.toBeVisible();
  await exit.locator('summary').click();
  await expect(exit).toContainText('0.10 = 10%');
  const assumptions=await open(page,'projection-assumptions');
  await expect(assumptions.locator('.method-row.is-visible')).toHaveCount(0);
  for(let n=1;n<=5;n++){await page.keyboard.press('ArrowRight');await expect(assumptions.locator('.method-row.is-visible')).toHaveCount(n);}
  const mei=await open(page,'mei-changing-budget');
  await mei.locator('summary').click();
  await expect(mei).toContainText('¥148.50');
  const definition=await open(page,'definition-assumed-return');
  await expect(definition.locator('.definition-emphasis').first()).toBeVisible();
  await expect(definition.locator('.definition-translation .definition-emphasis').first()).toBeVisible();
  for(const country of ['us','china']){
    expect(number(`historical-growth-${country}`)).toBe(number(`historical-returns-${country}`)+1);
    const chart=await open(page,`historical-growth-${country}`);
    await expect(chart.locator('.concept-series > path')).toHaveCount(3);
    await expect(chart.locator('.concept-series circle')).toHaveCount(66);
  }
});

test('@responsive every continuation slide fits with all models revealed',async({page},testInfo)=>{
  test.setTimeout(180000);
  if(testInfo.project.name==='chromium-desktop')await page.setViewportSize({width:1280,height:720});
  const errors=[],issues=[];page.on('pageerror',error=>errors.push(error.message));
  await open(page,'hero');fs.mkdirSync(output,{recursive:true});
  for(let i=0;i<slides.length;i++){
    await page.evaluate(n=>{location.hash=String(n)},i+1);
    const slide=page.locator(`.slide[data-index="${i}"]`);await expect(slide).toBeVisible();
    for(let j=0;j<await slide.locator('.partial-item').count();j++)await page.keyboard.press('ArrowRight');
    for(const summary of await slide.locator('details > summary').all())await summary.click();
    await slide.evaluate(async el=>Promise.all([...el.querySelectorAll('img')].map(img=>img.decode())));
    const overflow=await slide.evaluate(el=>{
      const issues=[],body=el.querySelector('.slide-body');
      if(innerWidth>820&&body){
        const limit=body.getBoundingClientRect();
        for(const node of body.querySelectorAll('h2,p,.retrieval-equation,.history-card,.definition-panel,.method-row')){
          if(!node.getClientRects().length)continue;
          const box=node.getBoundingClientRect();
          if(box.left<limit.left-3||box.right>limit.right+3||box.top<limit.top-3||box.bottom>limit.bottom+3)issues.push(node.textContent.trim().slice(0,100));
        }
      }
      if(el.scrollWidth>el.clientWidth+2)issues.push('horizontal overflow');
      return issues;
    });
    if(overflow.length)issues.push({slide:i+1,id:slides[i].id,issues:overflow});
    if(testInfo.project.name==='chromium-desktop')await page.screenshot({path:path.join(output,`${String(i+1).padStart(2,'0')}.png`)});
  }
  fs.writeFileSync(path.join(output,`${testInfo.project.name}-layout.json`),JSON.stringify({issues,errors},null,2));
  expect(errors).toEqual([]);expect(issues).toEqual([]);
});
