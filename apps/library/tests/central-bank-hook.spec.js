const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const lesson = pathToFileURL(path.join(__dirname, '../lessons/unit-3-decision-makers/3-1-money-and-banking/lesson-4.html')).href;

async function expectIllustrationFits(page, film) {
  const outside = await film.locator('svg').evaluate(svg => {
    const v=svg.viewBox.baseVal;
    return [...svg.querySelectorAll('text')].flatMap(el=>{
      const b=el.getBBox(),m=el.getCTM(),sm=svg.getCTM();
      const relative=sm.inverse().multiply(m);
      const p=new DOMPoint(b.x,b.y).matrixTransform(relative);
      const q=new DOMPoint(b.x+b.width,b.y+b.height).matrixTransform(relative);
      return p.x<0||p.y<0||q.x>v.width||q.y>v.height ? [el.textContent] : [];
    });
  });
  expect(outside).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
}

test('@smoke @responsive central-bank opening teaches lending relationships before emergency lending', async ({page},testInfo) => {
  await page.goto(`${lesson}#5`);
  const film=page.locator('.slide.is-active .cb-film');
  const next=page.getByRole('button',{name:'Next step or slide',exact:true});
  const previous=page.getByRole('button',{name:'Previous step or slide',exact:true});
  const sequence=await page.evaluate(()=>IGCSE.lesson.slides.map(s=>({type:s.type,title:s.title,layout:s.layout,table:s.table})));
  const definition=sequence.findIndex(s=>s.type==='term'&&s.title==='Central bank');
  const emergency=sequence.findIndex(s=>s.layout==='central-bank-film');
  expect(definition).toBeGreaterThan(4);
  expect(emergency).toBeGreaterThan(definition);
  expect(sequence[emergency+1].title).toBe('4. Act as lender of last resort');
  await expect(film.getByRole('img')).toHaveAccessibleName('Commercial banks lend to households and firms.');
  await expect(film).toContainText('Households');
  await expect(film).toContainText('Firms');
  await expect(film).not.toContainText('Central bank');
  await expectIllustrationFits(page,film);
  await page.screenshot({path:testInfo.outputPath('intro-first.png')});
  await next.click();
  await expect(film.getByRole('img')).toHaveAccessibleName('Who lends to commercial banks?');
  await expect(film).not.toContainText('Central bank');
  await expectIllustrationFits(page,film);
  await next.click();
  await expect(film.getByRole('img')).toHaveAccessibleName('Central banks can lend to commercial banks.');
  await expect(film).toContainText('A bank for banks');
  await expect(film).not.toContainText('last resort');
  await expect(film).not.toContainText('withdrawals');
  await expectIllustrationFits(page,film);
  await page.screenshot({path:testInfo.outputPath('intro-complete.png'),animations:'disabled'});
  await previous.click();
  await expect(film).not.toContainText('Central bank');
  await next.click();
  await next.click();
  await expect(page.locator('.slide.is-active')).toContainText('Examples of central banks');
  await previous.click();
  await expect(film).toContainText('A bank for banks');
});

test('@smoke @responsive central-bank visual story reveals payments and reverses without leaving the slide', async ({page}) => {
  test.setTimeout(30000);
  await page.goto(lesson);
  const slideNumber=await page.evaluate(()=>IGCSE.lesson.slides.findIndex(s=>s.layout==='central-bank-film')+1);
  await page.goto(`${lesson}#${slideNumber}`);
  const film = page.locator('.is-layout-central-bank-film .cb-film');
  const next = page.getByRole('button', {name:'Next step or slide',exact:true});
  const previous = page.getByRole('button', {name:'Previous step or slide',exact:true});
  const advance=async()=>{ await page.mouse.move(12,12); await next.click({timeout:5000}); };
  const back=async()=>{ await page.mouse.move(12,12); await previous.click({timeout:5000}); };
  await expect(film.getByRole('img')).toHaveAccessibleName(/Your money is in the bank/);
  await expect(film).not.toContainText('Central bank');
  for(let i=0;i<3;i++) await advance();
  await expect(film.getByRole('img')).toHaveAccessibleName(/Two paid. Two still waiting/);
  await expect(film).toContainText('¥200,000 still needed');
  await back();
  await expect(film.getByRole('img')).toHaveAccessibleName(/Four savers want their money/);
  await expect(film).not.toContainText('¥200,000 still needed');
  for(let i=0;i<3;i++) await advance();
  await expect(film).toContainText('¥200,000 borrowed');
  await expect(film).toContainText('if the bank qualifies');
  await advance();
  await expect(film).toContainText('All four paid');
  await expect(film).toContainText('Lender of last resort');
  expect(new URL(page.url()).hash).toBe(`#${slideNumber}`);
  // The complete SVG, including labels, fits both classroom and portrait layouts.
  await expectIllustrationFits(page,film);
  await advance();
  await expect(page.locator('.slide.is-active')).toContainText('Act as lender of last resort');
  await back();
  await expect(film).toContainText('All four paid');
  await back();
  await expect(film).toContainText('¥200,000 borrowed');
});

test('@smoke central-bank handout retains the complete explanation',async({page})=>{
  await page.goto(`${lesson}?view=print`);
  await expect(page.getByText('Commercial banks lend to households and firms. A central bank can lend to commercial banks.',{exact:true})).toBeVisible();
  await expect(page.getByText('Withdrawals can continue',{exact:true})).toBeVisible();
  await expect(page.getByText(/The central-bank loan must be repaid; support is conditional/)).toBeVisible();
});
