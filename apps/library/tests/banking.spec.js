const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');
const lessonUrl = n => pathToFileURL(path.resolve(__dirname, `../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-${n}.html`)).href;
for (const [n, title, quizCount, cardCount, examCount] of [[3,'Commercial banks',7,8,7],[4,'Central banks',7,5,4]]) {
  test(`@smoke @responsive ${title}: slides and study views`, async ({page},testInfo)=>{
    test.setTimeout(180000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    const url=lessonUrl(n);await page.goto(url);
    const slides=await page.evaluate(()=>IGCSE.lesson.slides);
    for(let i=0;i<slides.length;i++){
      await page.goto(`${url}#${i+1}`);
      const active=page.locator('.slide.is-active');await expect(active).toBeVisible();
      await expect.poll(()=>active.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0))).toBe(true);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`slide ${i+1}`).toBe(true);
    }
    await page.goto(`${url}?view=print`);await expect(page.locator('.handoutDocument')).toBeVisible();
    await expect(page.locator('.handoutDocument')).toContainText(n===3?'Explain two roles of commercial banks for firms.':'Explain two functions of a central bank.');
    await page.goto(`${url}?view=quiz`);await expect(page.locator('.quizQuestion')).toHaveCount(quizCount);
    await page.goto(`${url}?view=flashcards`);await expect(page.locator('.flashcardPosition')).toHaveText(`${cardCount} left`);
    if(testInfo.project.name==='chromium-desktop'){
      await page.setViewportSize({width:1600,height:900});
      for(let i=0;i<slides.length;i++){
        if(!['term','dataTable','cards','compare','flow','exam','modelAnswer','classificationTask'].includes(slides[i].type))continue;
        await page.goto(`${url}#${i+1}`);
        const partials=await page.locator('.slide.is-active .partial-item').count();
        for(let j=0;j<partials;j++)await page.keyboard.press('ArrowRight');
        const bounds=await page.locator('.slide.is-active .content').evaluate(el=>{const r=el.getBoundingClientRect();return {top:r.top,bottom:r.bottom};});
        expect(bounds.top,`${title} ${i+1} top`).toBeGreaterThanOrEqual(0);
        expect(bounds.bottom,`${title} ${i+1} bottom`).toBeLessThanOrEqual(900);
      }
    }
    expect(errors).toEqual([]);
  });
  test(`@smoke @responsive ${title}: teaching and answer reveals`,async({page})=>{
    const url=lessonUrl(n);await page.goto(url);const slides=await page.evaluate(()=>IGCSE.lesson.slides);
    const teaching=slides.findIndex(s=>n===3?s.type==='dataTable'&&s.layout!=='bank-comparison':s.layout==='central-bank-function'&&s.cards.length>1);
    await page.goto(`${url}#${teaching+1}`);
    const rows=page.locator(n===3?'.slide.is-active .dataTable tbody tr':'.slide.is-active .cardgrid > .card');
    await expect(rows.first()).toHaveCSS('opacity','0');await expect(rows.nth(1)).toHaveCSS('opacity','0');
    await page.keyboard.press('ArrowRight');await expect(rows.first()).toHaveCSS('opacity','1');await expect(rows.nth(1)).toHaveCSS('opacity','0');
    await page.keyboard.press('ArrowRight');await expect(rows.nth(1)).toHaveCSS('opacity','1');
    const disc=slides.findIndex(s=>s.type==='discussion');
    if(n===3)expect(disc).toBeGreaterThanOrEqual(0);
    if(disc>=0){
      await page.goto(`${url}#${disc+1}`);
      await page.locator('.slide.is-active .discussionAnswerButton').click();await expect(page.locator('.discussionAnswerDialog')).toBeVisible();
      await expect(page.locator('.discussionAnswerText')).toHaveText(slides[disc].answer);
      expect(new URL(page.url()).hash).toBe(`#${disc+1}`);
      await page.keyboard.press('Escape');await expect(page.locator('.discussionAnswerDialog')).toBeHidden();
    }
    const model=slides.findIndex(s=>s.type==='modelAnswer'&&s.paragraphs.length>1);await page.goto(`${url}#${model+1}`);
    const paragraphs=page.locator('.slide.is-active .modelAnswerParagraphs > p');await expect(paragraphs.first()).toHaveCSS('opacity','0');
    await page.keyboard.press('ArrowRight');await expect(paragraphs.first()).toHaveCSS('opacity','1');await expect(paragraphs.nth(1)).toHaveCSS('opacity','0');
  });
  test(`${title}: coherent scope and mark-scheme plans`,async({page})=>{
    await page.goto(lessonUrl(n));const slides=await page.evaluate(()=>IGCSE.lesson.slides);
    expect(slides.filter(s=>s.type==='section')).toHaveLength(3);
    expect(slides.filter(s=>s.type==='section')[0].title).toContain('Definition');
    expect(slides.some(s=>s.type==='peerTask')).toBe(false);
    expect(slides.filter(s=>s.type==='exam')).toHaveLength(examCount);
    if(n===4){
      const sections=slides.filter(s=>s.type==='section');
      expect(sections.map(s=>s.title)).toEqual(['Definition of a central bank','Functions of a central bank','Past paper practice']);
      const practice=slides.lastIndexOf(sections[2]);
      expect(slides.slice(0,practice).some(s=>s.type==='exam'||s.type==='modelAnswer')).toBe(false);
      expect(slides.slice(practice+1).map(s=>s.type)).toEqual(['exam','modelAnswer','exam','modelAnswer','exam','modelAnswer','exam','modelAnswer']);
      const functions=slides.filter(s=>/^Function \d of 6$/.test(s.eyebrow||''));
      expect(functions.map(s=>s.title.match(/^\d/)[0])).toEqual(['1','2','3','4','5','6']);
      expect(functions.every(s=>slides.indexOf(s)>slides.indexOf(sections[1])&&slides.indexOf(s)<practice)).toBe(true);
      expect(slides.filter(s=>s.type==='exam').map(s=>s.examSpec.marks)).toEqual([2,2,4,6]);
    }
    for(let i=0;i<slides.length;i++){
      const s=slides[i];if(s.type==='discussion'){expect(s.answer.length).toBeGreaterThan(30);expect(s.visual.src).toBeTruthy();}
      if(s.type==='dataTable')expect(s.partialReview).toEqual([s.layout==='bank-comparison'?'.dataTable tbody > tr > td':'.dataTable tbody > tr']);
      if(s.type==='exam'){
        expect(slides[i+1].type).toBe('modelAnswer');expect(slides[i+1].title).toBe(s.title);
        if(s.title.startsWith('Explain two')){expect(s.keywords).toHaveLength(4);expect(s.keywords[0]).toBe(s.keywords[2]);expect(s.keywords[1]).toBe(s.keywords[3]);expect(s.layout).toBe('exam-pairs');}
      }
    }
    const menu=pathToFileURL(path.resolve(__dirname,'../lessons/unit-3-decision-makers/3-1-money-and-banking/index.html')).href;
    await page.goto(menu);await expect(page.locator('a[href="./lesson-3.html"]')).toHaveCount(1);await expect(page.locator('a[href="./lesson-4.html"]')).toHaveCount(1);
  });
}

test('@smoke @responsive Central bank comparison: fixed headings and individual cells',async({page})=>{
  await page.goto(lessonUrl(4));
  const index=await page.evaluate(()=>IGCSE.lesson.slides.findIndex(s=>s.layout==='bank-comparison'));
  await page.goto(`${lessonUrl(4)}#${index+1}`);
  const table=page.locator('.slide.is-active .dataTable');
  const headers=table.locator('th'),cells=table.locator('tbody td');
  await expect(headers).toHaveCount(5);
  await expect(cells).toHaveCount(4);
  for(const header of await headers.all()) {
    await expect(header).toBeVisible();
    await expect(header).toHaveCSS('opacity','1');
  }
  await expect(table).not.toContainText('Basis');
  await expect(table).not.toContainText('Foreign currency');
  for(let i=0;i<4;i++)await expect(cells.nth(i)).toHaveCSS('color','rgba(0, 0, 0, 0)');
  const initial=await table.boundingBox();
  for(let i=0;i<4;i++) {
    await page.keyboard.press('ArrowRight');
    for(let j=0;j<4;j++)await expect(cells.nth(j)).toHaveAttribute('aria-hidden',j<=i?'false':'true');
    await expect(cells.nth(i)).not.toHaveCSS('color','rgba(0, 0, 0, 0)');
  }
  expect(await table.boundingBox()).toEqual(initial);
  await expect(table).toContainText('Usually price stability.');
  await expect(table).toContainText('Profitability (profit maximisation).');
  await page.keyboard.press('ArrowLeft');
  await expect(cells.last()).toHaveCSS('color','rgba(0, 0, 0, 0)');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('@responsive Central bank recall: readable answers, stable questions and reversible feedback',async({page},testInfo)=>{
  const sizes=testInfo.project.name==='chromium-desktop'
    ? [{width:1280,height:720},{width:1600,height:900}]
    : [{width:390,height:844}];
  for(const size of sizes){
    await page.setViewportSize(size);
    await page.goto(`${lessonUrl(4)}#2`);
    await page.reload();
    const slide=page.locator('.slide.is-active');
    const questions=slide.locator('.classificationItemTop');
    const answers=slide.locator('.classificationResult');
    await expect(questions).toHaveCount(3);
    await expect(slide).toContainText('poor store of value');
    await expect(slide).not.toContainText('Define a loan.');
    const before=await questions.evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}));
    for(let i=0;i<3;i++){
      await expect(questions.nth(i)).toBeVisible();
      await expect(answers.nth(i)).toHaveCSS('opacity','0');
    }
    for(let i=0;i<3;i++){
      await page.keyboard.press('ArrowRight');
      for(let j=0;j<3;j++)await expect(answers.nth(j)).toHaveAttribute('aria-hidden',j<=i?'false':'true');
    }
    const after=await questions.evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}));
    expect(after).toEqual(before);
    const answerSizes=await slide.locator('.classificationAnswer').evaluateAll(els=>els.map(el=>parseFloat(getComputedStyle(el).fontSize)));
    expect(Math.min(...answerSizes)).toBeGreaterThanOrEqual(size.width>900?26:20);
    const bounds=await slide.locator('.classificationTaskBlock').boundingBox();
    expect(bounds.y).toBeGreaterThanOrEqual(0);
    expect(bounds.y+bounds.height).toBeLessThanOrEqual(size.height);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await page.keyboard.press('ArrowLeft');
    await expect(answers.nth(2)).toHaveCSS('opacity','0');
    await expect(answers.nth(1)).toHaveCSS('opacity','1');
  }
});

test('@responsive Central bank functions: six specific pictures and readable sequential explanations',async({page},testInfo)=>{
  if(testInfo.project.name==='chromium-desktop')await page.setViewportSize({width:1280,height:720});
  await page.goto(lessonUrl(4));
  const functions=await page.evaluate(()=>IGCSE.lesson.slides.map((s,i)=>({...s,index:i})).filter(s=>s.layout==='central-bank-function'));
  expect(functions).toHaveLength(6);
  expect(new Set(functions.map(s=>s.visual.src)).size).toBe(6);
  for(const s of functions){
    await page.goto(`${lessonUrl(4)}#${s.index+1}`);
    const active=page.locator('.slide.is-active');
    const picture=active.locator('.photoPanel img');
    await expect(picture).toBeVisible();
    await expect.poll(()=>picture.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
    await expect(active).not.toContainText('What it does');
    await expect(active).not.toContainText('Why it matters');
    const points=active.locator('.cardgrid > .card');
    await expect(points.first()).toHaveCSS('opacity','0');
    for(let i=0;i<s.cards.length;i++)await page.keyboard.press('ArrowRight');
    await expect(points.last()).toHaveCSS('opacity','1');
    expect(new URL(page.url()).hash).toBe(`#${s.index+1}`);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    if(testInfo.project.name==='chromium-desktop'){
      const bounds=await active.locator('.content').boundingBox();
      expect(bounds.y).toBeGreaterThanOrEqual(0);
      expect(bounds.y+bounds.height).toBeLessThanOrEqual(720);
      expect((await picture.boundingBox()).width).toBeGreaterThan(400);
    }
    await page.keyboard.press('ArrowLeft');
    await expect(points.last()).toHaveCSS('opacity','0');
  }
});

test('@responsive Central bank applications: immediate facts and reversible yes/no reasons',async({page},testInfo)=>{
  const desktop=testInfo.project.name==='chromium-desktop';
  await page.setViewportSize(desktop?{width:1280,height:720}:{width:390,height:844});
  await page.goto(lessonUrl(4));
  const slides=await page.evaluate(()=>IGCSE.lesson.slides.map((s,i)=>({...s,index:i})));
  const examples=slides.filter(s=>s.layout==='central-bank-example');
  const checks=slides.filter(s=>s.layout==='central-bank-check');
  expect(examples).toHaveLength(3);
  expect(checks.reduce((n,s)=>n+s.items.length,0)).toBe(7);
  for(const s of examples){
    await page.goto(`${lessonUrl(4)}#${s.index+1}`);
    const active=page.locator('.slide.is-active');
    await expect(active.locator('.partial-item')).toHaveCount(0);
    await expect(active.locator('.card')).toContainText(s.cards[0].body);
    await expect.poll(()=>active.locator('img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0))).toBe(true);
    if(desktop){
      const box=await active.locator('.content').boundingBox();
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y+box.height).toBeLessThanOrEqual(720);
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await page.keyboard.press('ArrowRight');
    expect(new URL(page.url()).hash).toBe(`#${s.index+2}`);
  }
  for(const s of checks){
    await page.goto(`${lessonUrl(4)}#${s.index+1}`);
    await page.reload();
    const active=page.locator('.slide.is-active');
    const prompts=active.locator('.yesNoStatement'),answers=active.locator('.yesNoAnswer');
    const before=await prompts.evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}));
    for(let i=0;i<s.items.length;i++){
      await expect(prompts.nth(i)).toBeVisible();
      await expect(answers.nth(i)).toHaveCSS('opacity','0');
    }
    for(let i=0;i<s.items.length;i++){
      await page.keyboard.press('ArrowRight');
      for(let j=0;j<s.items.length;j++)await expect(answers.nth(j)).toHaveAttribute('aria-hidden',j<=i?'false':'true');
      await expect(answers.nth(i).locator('.yesNoBadge')).toHaveText(s.items[i].answer?'Yes':'No');
      await expect(answers.nth(i).locator('em')).toHaveText(s.items[i].reason);
    }
    const after=await prompts.evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}));
    expect(after).toEqual(before);
    const sizes=await active.locator('.yesNoStatement b,.yesNoAnswer em').evaluateAll(els=>els.map(el=>parseFloat(getComputedStyle(el).fontSize)));
    expect(Math.min(...sizes)).toBeGreaterThanOrEqual(desktop?24:21);
    if(desktop){
      const box=await active.locator('.yesNoCheckBlock').boundingBox();
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y+box.height).toBeLessThanOrEqual(640);
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await page.keyboard.press('ArrowLeft');
    await expect(answers.last()).toHaveCSS('opacity','0');
    await expect(answers.first()).toHaveCSS('opacity','1');
  }
  await page.goto(`${lessonUrl(4)}?view=print`);
  for(const s of checks)for(const item of s.items)await expect(page.locator('.handoutDocument')).toContainText(item.reason);
});
