const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('url');
const path = require('path');
const root = path.resolve(__dirname, '..');
const lessonUrl = n => pathToFileURL(path.join(root, `lessons/unit-4-government/4-4-supply-side-policy/lesson-${n}.html`)).href;

test('supply-side lesson 2 teaches the missed foundation before detailed policy and ends its planned core', async ({page}) => {
  await page.goto(lessonUrl(2));
  const sequence = await page.evaluate(() => {
    const { slides, meta } = IGCSE.lesson;
    return {
      recall: slides[1].definitionItems.map(x=>x.term),
      titles: slides.map(s=>s.title),
      plan: meta.deliveryPlan,
      firstExit: slides.findIndex(s=>s.title==='Exit ticket')+1,
      quizItems: slides.filter(s=>s.type==='quiz').map(s=>({choices:s.choices,answer:s.answer})),
    };
  });
  expect(sequence.recall).toEqual(['Supply-side policy','Interventionist supply-side policy','Market-based supply-side policy']);
  for(const title of ['Productivity','Efficiency','Productive capacity','Using spare capacity']) {
    expect(sequence.titles.indexOf(title)).toBeGreaterThan(0);
    expect(sequence.titles.indexOf(title)).toBeLessThan(sequence.titles.indexOf('Education and training'));
  }
  expect(sequence.plan.phases.reduce((sum,x)=>sum+x.minutes,0)).toBe(sequence.plan.durationMinutes);
  expect(sequence.firstExit).toBe(sequence.plan.coreEndSlide);
  expect(sequence.titles[sequence.firstExit]).toBe('Healthcare and productivity');
  sequence.quizItems.forEach(item => expect(item.answer).toBeGreaterThanOrEqual(0));
});

for(const n of [1,2,3,4]) {
  test(`supply-side ${n}: every slide fits, photos load, and every PPC state is readable`, async ({page},testInfo) => {
    await page.goto(lessonUrl(n));
    const count=await page.locator('.slide').count();
    const phone=testInfo.project.name.includes('phone');
    if(!phone)await page.setViewportSize({width:1440,height:900});
    for(let i=0;i<count;i++){
      await page.goto(`${lessonUrl(n)}#${i+1}`);
      const active=page.locator('.slide.is-active');
      await expect(active).toHaveAttribute('data-idx',String(i));
      for(const img of await active.locator('img:visible').all()){
        await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
      }
      const diagram=await active.locator('.sspPpc').count();
      const states=diagram?4:1;
      for(let stage=0;stage<states;stage++){
        if(stage)await active.getByRole('button',{name:'Next step',exact:true}).click();
        const bounds=await active.evaluate(el=>{
          const targets=el.querySelectorAll('.sspPpc,.sspPpcPanel,.discussionPrompt,.termBlock,.flowRow,.examBlock,.modelAnswerBlock');
          return {
            pageOverflow:document.documentElement.scrollWidth>innerWidth+2,
            slideOverflow:el.scrollWidth>el.clientWidth+2,
            clipped:[...targets].filter(x=>{
              const r=x.getBoundingClientRect();
              return r.width>0 && (r.left < -2 || r.right > innerWidth+2 || (innerWidth>960 && (r.top < -2 || r.bottom > innerHeight+2)));
            }).map(x=>x.className)
          };
        });
        expect(bounds,`lesson ${n}, slide ${i+1}, stage ${stage}`).toEqual({pageOverflow:false,slideOverflow:false,clipped:[]});
      }
    }
  });
}

test('PPC controls reveal, reverse and reset without skipping the diagram', async ({page})=>{
  await page.goto(lessonUrl(2));
  const diagramIndex=await page.locator('.slide:has(.sspPpc)').first().getAttribute('data-idx');
  await page.goto(`${lessonUrl(2)}#${Number(diagramIndex)+1}`);
  const active=page.locator('.slide.is-active');
  await expect(active).toHaveAttribute('data-ppc-step','0');
  await expect(active.locator('[data-ppc-stage="2"]')).toHaveAttribute('hidden','');
  await active.getByRole('button',{name:'Next step',exact:true}).click();
  await expect(active).toHaveAttribute('data-ppc-step','1');
  await page.keyboard.press('ArrowRight');
  await expect(active).toHaveAttribute('data-ppc-step','2');
  await expect(active.locator('.sspBaseCurve')).toHaveClass(/sspOriginal/);
  await page.keyboard.press('ArrowLeft');
  await expect(active).toHaveAttribute('data-ppc-step','1');
  await active.getByRole('button',{name:'Reset',exact:true}).click();
  await expect(active).toHaveAttribute('data-ppc-step','0');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(active).toHaveAttribute('data-ppc-step','3');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.slide.is-active')).toHaveAttribute('data-idx',String(Number(diagramIndex)+1));
});

test('handout retains complete PPC diagrams and formative answers stay hidden until attempted',async({page})=>{
  await page.goto(lessonUrl(2)+'?view=print');
  await expect(page.locator('.sspPpcHandout .sspPpc')).toHaveCount(3);
  await expect(page.locator('.sspPpcControls')).toHaveCount(0);
  await page.goto(lessonUrl(2));
  const idx=await page.locator('.slide.is-quiz').first().getAttribute('data-idx');
  await page.goto(`${lessonUrl(2)}#${Number(idx)+1}`);
  const quiz=page.locator('.slide.is-active');
  await expect(quiz.locator('.prompt')).toBeHidden();
  await quiz.locator('.choice').first().click();
  await expect(quiz.locator('.prompt')).toBeVisible();
});
