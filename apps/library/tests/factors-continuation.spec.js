const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const route = pathToFileURL(path.resolve(__dirname, '../lessons/unit-1-basic-economic-problem/1-2-factors-of-production/lesson-2.html')).href;

test('motives reveal complete cards and the scenario photo stays with the answer', async ({page}) => {
  await page.goto(`${route}#20`);
  const active=page.locator('.slide.is-active');
  const cards=active.locator('.cardgrid > .card');
  await expect(cards.filter({has:page.locator('.cardTitle')})).toHaveCount(3);
  await expect(active.locator('.cardgrid > .card.is-visible')).toHaveCount(0);
  for(let count=1;count<=3;count++){
    await page.keyboard.press('ArrowRight');
    await expect(active.locator('.cardgrid > .card.is-visible')).toHaveCount(count);
    await expect(cards.nth(count-1).locator('img')).toBeVisible();
  }
  await page.keyboard.press('ArrowLeft');
  await expect(active.locator('.cardgrid > .card.is-visible')).toHaveCount(2);
  await page.goto(`${route}#17`);
  await expect(active.locator('.paymentTimingTable th')).toHaveText(['Before sales 销售前','After sales 销售后']);
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(active.locator('.paymentTimingTable tbody tr').first().locator('.choice.is-visible')).toHaveCount(2);
  await expect(active.locator('.paymentTimingTable tbody tr').nth(1).locator('.choice.is-visible')).toHaveCount(0);
  await page.goto(`${route}#22`);
  const photo=active.locator('.photoPanel img');
  await expect(photo).toHaveAttribute('alt','A delivery driver standing beside a delivery van.');
  expect(await photo.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await expect(active.locator('.mcqExplanation')).toBeHidden();
  await active.locator('.choice').first().click();
  await expect(active.locator('.mcqExplanation')).toContainText('Additional vans increase capital');
  await expect(photo).toBeVisible();
  expect(await active.evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);
});

test('profit past paper keeps all three data columns and reveals the calculation', async ({page}) => {
  await page.goto(`${route}#25`);
  const active=page.locator('.slide.is-active');
  await expect(active.locator('.factor-option-head b')).toHaveText(['total output of pairs of shoes','total cost ($)','total revenue ($)']);
  await expect(active.locator('.factor-option-pair').nth(1).locator('span')).toHaveText(['200','1800','2200']);
  await expect(active.locator('.mcqExplanation')).toBeHidden();
  await active.locator('.choice').nth(1).click();
  await expect(active.locator('.mcqExplanation')).toContainText('The highest profit is $400 at 200 pairs');
  await active.getByRole('button',{name:'Show question paper sources'}).click();
  const dialog=page.getByRole('dialog',{name:'Content sources'});
  await expect(dialog).toContainText('printed page 5');
  await expect(dialog.locator('thead th')).toHaveCount(4);
  await expect(dialog.locator('tbody tr').nth(1).locator('td')).toHaveText(['200','1800','2200']);
  await expect(dialog).not.toContainText('Official answer');
  await page.keyboard.press('Escape');
  expect(await active.evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);
});

test('typed source dialogs preserve question context, keyboard state and focus',async({page})=>{
  await page.goto(`${route}#19`);
  const active=page.locator('.slide.is-active');
  const paper=active.getByRole('button',{name:'Show question paper sources'});
  await expect(paper).toBeVisible();
  await expect(active.locator('.slideSourceControl')).toBeHidden();
  await paper.click();
  const dialog=page.getByRole('dialog',{name:'Content sources'});
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('0455/11/O/N/24 Q2');
  await expect(dialog).toContainText('first factor');
  await expect(dialog.locator('tbody tr')).toHaveCount(4);
  expect(await dialog.locator('.classroom-source-content').evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);
  await expect(dialog).not.toContainText('Official answer');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Home');
  expect(await page.evaluate(()=>location.hash)).toBe('#19');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(paper).toBeFocused();
  await active.getByRole('button',{name:'Show mark scheme sources'}).click();
  await expect(dialog).toContainText('Official answer: D — land — enterprise.');
  await dialog.getByRole('button',{name:'Close content sources'}).click();
  await expect(active.getByRole('button',{name:'Show mark scheme sources'})).toBeFocused();
  await active.getByRole('button',{name:'Show teaching model sources'}).click();
  await expect(dialog).toContainText('Teacher-written answer explanation');
  await page.mouse.click(1,1);
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(()=>location.hash)).toBe('#19');
});

test('factor continuation: reversible predictions, correct counts, study views and classroom fit', async ({page}) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(route);
  const shape=await page.evaluate(()=>({slides:IGCSE.lesson.slides.length,exit:IGCSE.lesson.slides[27].title}));
  expect(shape).toEqual({slides:29,exit:'Identify two reasons why people become entrepreneurs. [2]'});
  for(const [slide,last] of [[6,3],[8,2],[11,4],[15,3],[16,3]]){
    await page.goto(`${route}#${slide}`);
    const film=page.locator('.slide.is-active .factor-film');
    await expect(film).toHaveAttribute('data-frame','0');
    for(let frame=1;frame<=last;frame++){
      await page.keyboard.press('ArrowRight');
      await expect(film).toHaveAttribute('data-frame',String(frame));
    }
    if(slide===6||slide===16)await expect(film.locator('[data-move]')).toHaveCount(12);
    if(slide===16){
      await expect(film).toContainText('¥30 loss');
      await page.keyboard.press('ArrowLeft');
      await expect(film).toHaveAttribute('data-frame','2');
      await expect(film).not.toContainText('¥30 loss');
      await page.keyboard.press('ArrowRight');
    }
    await page.keyboard.press('ArrowLeft');
    await expect(film).toHaveAttribute('data-frame',String(last-1));
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    const bounds=await film.boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x+bounds.width).toBeLessThanOrEqual(page.viewportSize().width+1);
  }
  await page.goto(`${route}#2`);
  await page.locator('.slide.is-active').evaluate(async el=>{await document.fonts.ready;await Promise.all(el.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{})));});
  const questions=page.locator('.slide.is-active .classificationItemTop');
  const positions=await questions.evaluateAll(nodes=>nodes.map(x=>x.getBoundingClientRect().y));
  await expect(page.locator('.slide.is-active .classificationResult.is-visible')).toHaveCount(0);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.slide.is-active .classificationResult.is-visible')).toHaveCount(1);
  await page.locator('.slide.is-active').evaluate(async el=>{await Promise.all(el.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{})));});
  const after=await questions.evaluateAll(nodes=>nodes.map(x=>x.getBoundingClientRect().y));
  after.forEach((y,i)=>expect(Math.abs(y-positions[i])).toBeLessThan(1));
  await page.goto(`${route}#19`);
  await expect(page.locator('.slide.is-active .factor-option-head')).toContainText('first factor');
  await expect(page.locator('.slide.is-active .mcqExplanation')).toBeHidden();
  const beforeAnswer=await page.locator('.slide.is-active .choices').boundingBox();
  await page.locator('.slide.is-active .choice').nth(3).click();
  await expect(page.locator('.slide.is-active .mcqExplanation')).toContainText('Rent for land');
  const afterAnswer=await page.locator('.slide.is-active .choices').boundingBox();
  expect(Math.abs(afterAnswer.y-beforeAnswer.y)).toBeLessThan(1);
  await page.goto(`${route}?view=print`);
  await expect(page.locator('.handoutDocument')).toBeVisible();
  await expect(page.locator('.handoutDocument')).toContainText('¥180');
  await expect(page.locator('.handoutDocument')).toContainText('¥30 loss');
  await page.goto(`${route}?view=quiz`);
  await expect(page.locator('.quizQuestion')).toHaveCount(7);
  await page.goto(`${route}?view=flashcards`);
  await expect(page.locator('.flashcardPosition')).toHaveText('6 left');
  expect(errors).toEqual([]);
});

test('all continuation slides keep completed content readable at classroom size', async ({page}, info) => {
  test.skip(info.project.name.includes('phone'), 'Classroom geometry only.');
  for (const viewport of [{width:1440,height:810},{width:1920,height:1080}]) {
  await page.setViewportSize(viewport);
  for(let number=1;number<=29;number++){
    await page.goto(`${route}#${number}`);
    const active=page.locator('.slide.is-active');
    const partials=await active.locator('.partial-item:not(.is-visible)').count();
    for(let i=0;i<partials;i++)await page.keyboard.press('ArrowRight');
    if(await active.locator('.choices.is-mcq').count()) await active.locator('.choice').first().click();
    await active.evaluate(async el=>{await document.fonts.ready;await Promise.all(el.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{})));});
    const overflow=await active.evaluate(el=>[...el.querySelectorAll('h1,h2,.classificationItems,.modelAnswerCard,.factor-film,.choices.is-outcomes,.cardgrid,.quizBlock,.termBlock,.compareBlock,.sectionTitle')].filter(node=>node.getBoundingClientRect().height>0).map(node=>({tag:node.className||node.tagName,rect:node.getBoundingClientRect().toJSON()})).filter(({rect})=>rect.x<0||rect.right>innerWidth+1||rect.top<0||rect.bottom>innerHeight-45));
    expect(overflow,`Slide ${number} overflows`).toEqual([]);
    if (![1,4,10,21].includes(number)) {
      const unreadable=await active.evaluate(el=>{
        const luminance=rgb=>rgb.map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
        const bg=luminance([247,247,242]);
        return [...el.querySelectorAll('.classificationItemTop p,.classificationAnswer,.outcomeZh,.choices.is-outcomes .choice>span,.quizBlock>.lead,.quizBlock .choice,.mcqExplanation,.termDefinitionText,.termDefinitionZh,.is-compare .choice,.cardBody,.cardTitle,.modelAnswerText')].filter(x=>x.getBoundingClientRect().height>0&&getComputedStyle(x).visibility!=='hidden').map(x=>{
          const c=getComputedStyle(x),rgb=c.color.match(/[\d.]+/g).slice(0,3).map(Number),lum=luminance(rgb);
          return {text:x.textContent.trim().slice(0,50),font:parseFloat(c.fontSize),contrast:(Math.max(bg,lum)+.05)/(Math.min(bg,lum)+.05)};
        }).filter(x=>x.font<24||x.contrast<4.5);
      });
      expect(unreadable,`Slide ${number}: classroom text size/contrast`).toEqual([]);
    }
    if (process.env.FACTOR_REVIEW_DIR && viewport.width===1440) await page.screenshot({path:path.join(process.env.FACTOR_REVIEW_DIR,`${String(number).padStart(2,'0')}.png`)});
  }
  }
});
