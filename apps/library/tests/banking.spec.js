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
        if(!['term','dataTable','cards','compare','exam','modelAnswer','classificationTask'].includes(slides[i].type))continue;
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
  test(`@smoke @responsive ${title}: table rows, discussion and model reveals`,async({page})=>{
    const url=lessonUrl(n);await page.goto(url);const slides=await page.evaluate(()=>IGCSE.lesson.slides);
    const table=slides.findIndex(s=>s.type==='dataTable');await page.goto(`${url}#${table+1}`);
    const rows=page.locator('.slide.is-active .dataTable tbody tr');
    await expect(rows.first()).toHaveCSS('opacity','0');await expect(rows.nth(1)).toHaveCSS('opacity','0');
    await page.keyboard.press('ArrowRight');await expect(rows.first()).toHaveCSS('opacity','1');await expect(rows.nth(1)).toHaveCSS('opacity','0');
    await page.keyboard.press('ArrowRight');await expect(rows.nth(1)).toHaveCSS('opacity','1');
    const disc=slides.findIndex(s=>s.type==='discussion');await page.goto(`${url}#${disc+1}`);
    await page.locator('.slide.is-active .discussionAnswerButton').click();await expect(page.locator('.discussionAnswerDialog')).toBeVisible();
    await expect(page.locator('.discussionAnswerText')).toHaveText(slides[disc].answer);
    expect(new URL(page.url()).hash).toBe(`#${disc+1}`);
    await page.keyboard.press('Escape');await expect(page.locator('.discussionAnswerDialog')).toBeHidden();
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
    for(let i=0;i<slides.length;i++){
      const s=slides[i];if(s.type==='discussion'){expect(s.answer.length).toBeGreaterThan(30);expect(s.visual.src).toBeTruthy();}
      if(s.type==='dataTable')expect(s.partialReview).toEqual(['.dataTable tbody > tr']);
      if(s.type==='exam'){
        expect(slides[i+1].type).toBe('modelAnswer');expect(slides[i+1].title).toBe(s.title);
        if(s.title.startsWith('Explain two')){expect(s.keywords).toHaveLength(4);expect(s.keywords[0]).toBe(s.keywords[2]);expect(s.keywords[1]).toBe(s.keywords[3]);expect(s.layout).toBe('exam-pairs');}
      }
    }
    const menu=pathToFileURL(path.resolve(__dirname,'../lessons/unit-3-decision-makers/3-1-money-and-banking/index.html')).href;
    await page.goto(menu);await expect(page.locator('a[href="./lesson-3.html"]')).toHaveCount(1);await expect(page.locator('a[href="./lesson-4.html"]')).toHaveCount(1);
  });
}
