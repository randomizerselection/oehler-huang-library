const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const route = 'investment-analysis/lessons/1-1-3-compound-growth';
const source = fs.readFileSync(path.join(root, route, 'slides.js'), 'utf8');
const sandbox = {window:{}};
vm.runInNewContext(source, sandbox);
const slides = sandbox.window.INVESTMENT_COURSE.lesson.slides;
const number = id => slides.findIndex(slide => slide.id === id) + 1;
const output = path.resolve(root, '../../authoring/investment-course/tmp/compound-concept-revision');

async function open(page, id) {
  await page.goto(`http://compound.test/${route}/index.html#${number(id)}`);
  return page.locator(`.slide[data-slide-id="${id}"]`);
}
test.beforeEach(async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.route('https://hm.baidu.com/**', route => route.fulfill({contentType:'text/javascript',body:''}));
  await page.route('http://compound.test/**', async request => {
    const relative = decodeURIComponent(new URL(request.request().url()).pathname).slice(1);
    const file = path.resolve(root, relative);
    if (!file.startsWith(root + path.sep)) return request.fulfill({status:403,body:''});
    try {
      const contentType = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.json':'application/json'}[path.extname(file)] || 'text/plain';
      await request.fulfill({contentType,body:fs.readFileSync(file)});
    } catch { await request.fulfill({status:404,body:''}); }
  });
});

test('@smoke compound concepts: truthful chart scales and mechanism-before-definition order', async ({page}) => {
  expect(source).not.toMatch(/NS&I|NAMING THE PATTERN/);
  expect(number('returns-build-on-returns')).toBeLessThan(number('definition-compounding'));
  expect(slides.some(slide => slide.id === 'definition-future-value')).toBe(false);
  expect(number('rate-comparison')).toBeLessThan(number('definition-assumed-return'));
  expect(number('future-value-formula')).toBe(number('section-future-value') + 1);
  expect(number('future-goal-pause')).toBeGreaterThan(number('section-future-value'));
  expect(slides.some(slide => slide.id === 'reinvestment-choice')).toBe(false);
  const slide = await open(page,'returns-build-on-returns');
  await expect(slide.locator('.growth-stage.is-visible')).toHaveCount(0);
  for(let n=1;n<=4;n++) {
    await page.keyboard.press('ArrowRight');
    await expect(slide.locator('.growth-stage.is-visible')).toHaveCount(n);
  }
  const heights=await slide.locator('.bar-principal,.bar-growth').evaluateAll(elements=>elements.map(e=>Number(e.getAttribute('height'))));
  expect(heights[0]).toBeCloseTo(heights[2]);
  expect(heights[3]/heights[2]).toBeCloseTo(.1);
  expect(heights[7]/heights[6]).toBeCloseTo(.331);
  await page.keyboard.press('ArrowLeft');
  await expect(slide.locator('.growth-stage.is-visible')).toHaveCount(3);
  for(const id of ['definition-compounding','definition-reinvestment','definition-assumed-return']) {
    const definition=await open(page,id);
    await expect(definition.locator('[lang="zh-CN"]')).toBeVisible();
    await expect(definition.locator('.term-label')).toHaveCount(0);
    await expect(definition.locator('.definition-panel > p').first().locator('strong').first()).toBeVisible();
    await expect(definition.locator('.definition-translation strong').first()).toBeVisible();
  }
  const formula = await open(page, 'future-value-formula');
  await expect(formula.locator('.formula-term').first()).toBeVisible();
  await expect(formula.locator('.formula-term').first()).toContainText('principal + growth');
  await expect(formula.locator('.formula-term').first().locator('[lang="zh-CN"]').last()).toHaveText('期末总金额＝本金＋增长额');
});

test('@smoke historical asset evidence preserves staged results and sourced growth paths', async ({page}) => {
  await page.setViewportSize({width:1280,height:720});
  for (const id of ['historical-returns-us','historical-returns-china']) {
    const slide = await open(page,id);
    await expect(slide.locator('.history-result.is-visible')).toHaveCount(0);
    await expect(slide.locator('.history-card img')).toHaveCount(3);
    for(let n=1;n<=3;n++) {
      await page.keyboard.press('ArrowRight');
      await expect(slide.locator('.history-result.is-visible')).toHaveCount(n);
    }
    await expect(slide.locator('.history-rate > strong')).toHaveCount(3);
    const bounds=await slide.evaluate(el=>({cardBottom:Math.max(...[...el.querySelectorAll('.history-card')].map(e=>e.getBoundingClientRect().bottom)), footerTop:el.querySelector('.history-footer').getBoundingClientRect().top}));
    expect(bounds.cardBottom).toBeLessThan(bounds.footerTop);
  }
  const us=slides.find(s=>s.id==='historical-returns-us');
  const endpoints=[[139341.42,1157598.95],[4331.30,7752.88],[2110.47,21025.41]];
  us.items.forEach((item,i)=>expect(item.rate).toBeCloseTo(100*((endpoints[i][1]/endpoints[i][0])**(1/21)-1),2));
  for (const country of ['us','china']) {
    expect(number(`historical-growth-${country}`)).toBe(number(`historical-returns-${country}`)+1);
    const data=slides.find(s=>s.id===`historical-growth-${country}`);
    expect(data.years).toHaveLength(22);
    expect(data.years[0]).toBe(2004);
    expect(data.years.at(-1)).toBe(2025);
    expect(data.min).toBe(0);
    expect(data.max).toBe(11000);
    for (const series of data.series) {expect(series.values).toHaveLength(22);expect(series.values[0]).toBe(1000);}
    const chart=await open(page,data.id);
    await expect(chart.locator('.concept-series > path')).toHaveCount(3);
    await expect(chart.locator('.chart-end-label')).toHaveCount(3);
    await expect(chart.locator('.concept-series circle')).toHaveCount(66);
  }
  const china=slides.find(s=>s.id==='historical-growth-china');
  expect(china.series.map(s=>s.values.at(-1))).toEqual([7000,2450,8260]);
  expect(china.series[0].values[3]).toBe(5620);
  expect(china.series[0].values[4]).toBe(1930);
  const usa=slides.find(s=>s.id==='historical-growth-us');
  expect(usa.series[0].values[4]).toBeLessThan(usa.series[0].values[3]);
  expect(usa.series[1].values[18]).toBeLessThan(usa.series[1].values[17]);
});

test('@smoke comparison adds exactly one year per click and reverses without leaking future balances', async ({page}) => {
  const slide = await open(page, 'simple-compound-comparison');
  await expect(slide.locator('.comparison-year.is-visible')).toHaveCount(0);
  await expect(slide.locator('.comparison-readout:visible strong')).toHaveText(['0', '¥1,000', '¥1,000', '¥0']);
  for (let year = 1; year <= 20; year++) {
    await page.keyboard.press('ArrowRight');
    await expect(slide).toBeVisible();
    await expect(slide.locator('.comparison-year.is-visible')).toHaveCount(year);
    await expect(slide.locator('.comparison-readout:visible strong').first()).toHaveText(String(year));
  }
  await expect(slide.locator('.comparison-readout:visible strong')).toHaveText(['20', '¥6,727.5', '¥3,000', '¥3,727.5']);
  await page.keyboard.press('ArrowLeft');
  await expect(slide.locator('.comparison-year.is-visible')).toHaveCount(19);
  await expect(slide.locator('.comparison-readout:visible strong').first()).toHaveText('19');
});

test('@smoke historical growth and student cases have consistent evidence and complete hidden models', async ({page}) => {
  expect(number('opening-growth-history')).toBe(number('opening-interest-puzzle') + 1);
  const history = slides.find(s => s.id === 'opening-growth-history');
  expect(history.years).toHaveLength(62);
  expect(history.series[0].values[0]).toBe(1000);
  expect(history.series[0].values.at(-1)).toBeCloseTo(454694.65, 2);
  const drop = history.years.indexOf(2008);
  expect(history.series[0].values[drop] / history.series[0].values[drop - 1]).toBeCloseTo(.63);
  const opening = await open(page, 'opening-interest-puzzle');
  await expect(opening).toContainText('股息再投资');
  await expect(opening.locator('.retrieval-translation,.title-translation')).toHaveCount(0);
  const interest = await open(page, 'mcq-new-balance');
  await expect(interest.locator('.retrieval-equation').first()).not.toBeVisible();
  await interest.locator('summary').click();
  await expect(interest.locator('.retrieval-equation')).toHaveCount(4);
  await expect(interest.locator('.retrieval-equation').last()).toContainText('¥110.25');
  const lin = await open(page, 'extra-lin-table');
  await expect(lin.locator('.retrieval-table')).not.toBeVisible();
  await lin.locator('summary').click();
  await expect(lin.locator('.retrieval-table tbody tr')).toHaveCount(3);
  await expect(lin.locator('.retrieval-table tbody tr').last()).toContainText('¥2,315.25');
  await expect(lin.locator('.retrieval-answer')).toContainText('¥2,431.01');
  expect(number('rate-comparison')).toBe(number('section-projections') + 1);
  expect(number('extra-lin-table')).toBeGreaterThan(number('final-check'));
  expect(number('extra-changing-returns')).toBe(number('extra-lin-table') + 1);
  expect(slides.some(s => ['smg-projection-task','microsoft-real-return-path','horizon-practice'].includes(s.id))).toBe(false);
  const rates = await open(page, 'rate-comparison');
  await expect(rates.locator('.chart-target')).toContainText('¥2,400');
});

test('@smoke retrieval hides methods until requested and preserves mathematical notation', async ({page}) => {
  const slide=await open(page,'review-total-return');
  const answer=slide.locator('.retrieval-answer > div');
  await expect(answer).not.toBeVisible();
  await slide.locator('summary').click();
  await expect(answer).toBeVisible();
  await expect(answer).toContainText('US$100');
  await expect(slide).toBeVisible();
  await slide.locator('summary').click();
  await expect(answer).not.toBeVisible();
  const percent=await open(page,'review-return-percentage');
  await percent.locator('summary').click();
  await expect(percent.locator('.math-fraction > span')).toHaveText(['−100','2,000']);
  await expect(percent).toContainText('−5%');
  const formula=await open(page,'formula-substitution');
  await expect(formula.locator('.formula-reference sup')).toHaveText('n');
  await expect(formula.locator('.retrieval-answer > div')).not.toBeVisible();
  await expect(formula).toContainText('Will Mei reach her ¥8,000 target?');
  await formula.locator('summary').click();
  await expect(formula.locator('.retrieval-equation sup')).toHaveText('3');
  await expect(formula.locator('.retrieval-answer > div')).toContainText('¥8,651.50');
  const mcq=await open(page,'mcq-exponent');
  await mcq.locator('[data-option="1"]').click();
  await expect(mcq.locator('.is-incorrect')).toHaveCount(1);
  await mcq.locator('[data-option="2"]').click();
  await expect(mcq.locator('.is-correct')).toHaveCount(1);
  await expect(mcq.locator('.mcq-feedback')).toBeVisible();
});

test('@responsive compound lesson: all slides, answers, images and layout', async ({page},testInfo) => {
  test.setTimeout(180000);
  if(testInfo.project.name==='chromium-desktop') await page.setViewportSize({width:1280,height:720});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await open(page,'hero');
  fs.mkdirSync(output,{recursive:true});
  const issues=[];
  for(let i=0;i<slides.length;i++) {
    await page.evaluate(n=>{location.hash=String(n)},i+1);
    const slide=page.locator(`.slide[data-index="${i}"]`);
    await expect(slide).toBeVisible();
    for(let j=0;j<await slide.locator('.partial-item').count();j++) await page.keyboard.press('ArrowRight');
    for(const summary of await slide.locator('details > summary').all()) await summary.click();
    for(const blank of await slide.locator('.blank-answer,.inline-reveal').all()) await blank.click();
    await slide.evaluate(async el=>{await Promise.all([...el.querySelectorAll('img')].map(im=>im.decode()));});
    const overflow=await slide.evaluate(el=>{
      const issues=[];
      const body=el.querySelector('.slide-body'), heading=el.querySelector('.slide-header h1');
      if(innerWidth>820&&body&&heading&&heading.getBoundingClientRect().bottom>body.getBoundingClientRect().top+2) issues.push('Header overlaps body');
      if(innerWidth>820&&body) {
        const content=body.querySelector('.formula-content') || body;
        const limit=content.getBoundingClientRect();
        for(const node of content.querySelectorAll('h2,p,.retrieval-equation,.math-expression,.timeline-stage')) {
          if(!node.getClientRects().length)continue;
          const box=node.getBoundingClientRect();
          if(box.top<limit.top-3||box.bottom>limit.bottom+3||box.right>limit.right+3||box.left<limit.left-3) issues.push(node.textContent.trim().slice(0,80));
        }
      }
      if(el.scrollWidth>el.clientWidth+2) issues.push('Horizontal page overflow');
      return issues;
    });
    if(overflow.length)issues.push({slide:i+1,id:slides[i].id,issues:overflow});
    if(testInfo.project.name==='chromium-desktop') await page.screenshot({path:path.join(output,`${String(i+1).padStart(2,'0')}-revealed.png`)});
  }
  fs.writeFileSync(path.join(output,`${testInfo.project.name}-layout.json`),JSON.stringify({issues,errors},null,2));
  expect(errors).toEqual([]);
  expect(issues).toEqual([]);
});
