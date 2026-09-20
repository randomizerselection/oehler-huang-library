// Visual verification for the 5.3 Population lesson 1 deck.
// Captures every reveal state of every slide at classroom viewport (1440x810),
// then the quiz, flashcards and print views.
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..', '..', '..');
const lessonDir = path.join(root, 'apps', 'library', 'lessons', 'unit-5-economic-development', '5-3-population');
const outDir = path.join(__dirname, 'verify-shots');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const lessonUrl = (view) => {
  const url = pathToFileURL(path.join(lessonDir, 'index.html')).toString();
  return view ? `${url}?view=${view}` : url;
};

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
  const errors = [];
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });

  await page.goto(lessonUrl());
  await page.waitForTimeout(1200);

  const counter = () => page.evaluate(() => {
    const el = document.querySelector('.lesson-navigation-status');
    return el ? el.textContent.trim() : 'none';
  });

  const overflowReport = () => page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.right > window.innerWidth + 2 || r.bottom > window.innerHeight + 2 || r.left < -2 || r.top < -2) {
        const cls = (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || '';
        if (String(cls).includes('slide') === false || String(cls).includes('is-active')) {
          bad.push(`${el.tagName}.${String(cls).split(' ').slice(0, 3).join('.')} [${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)}]`);
        }
      }
    });
    return bad.slice(0, 6);
  });

  let c = await counter();
  console.log('start counter:', c);
  let press = 0;
  const seen = [];
  for (let guard = 0; guard < 400; guard++) {
    const name = `s${c.replace(/[^0-9]/g, '-')}-p${press}`;
    await page.screenshot({ path: path.join(outDir, `${name}.png`) });
    seen.push(name);
    const before = c;
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);
    const after = await counter();
    if (after === before) {
      press += 1;
      if (press > 14) { console.log('stuck on', before); break; }
      // detect end: if counter is at total and a press changes nothing twice in a row we may be at deck end
      const m = after.match(/(\d+)\s*\/\s*(\d+)/);
      if (m && m[1] === m[2]) {
        // one more capture happened next loop; stop after capturing final static state twice
        if (press >= 2) break;
      }
      continue;
    }
    c = after;
    press = 0;
    const m = after.match(/(\d+)\s*\/\s*(\d+)/);
    if (m && m[1] === m[2]) {
      // capture final slide states then stop
      for (let k = 0; k < 14; k++) {
        const nm = `s${c.replace(/[^0-9]/g, '-')}-p${k}`;
        await page.screenshot({ path: path.join(outDir, `${nm}.png`) });
        seen.push(nm);
        const b2 = await counter();
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(200);
        const a2 = await counter();
        if (a2 !== b2) break;
      }
      break;
    }
  }
  console.log('captures:', seen.length);

  // overflow check on a few key slides: go back to start and walk with checks
  await page.goto(lessonUrl());
  await page.waitForTimeout(1000);
  const overflowIssues = [];
  let cc = await counter();
  for (let guard = 0; guard < 400; guard++) {
    const bad = await overflowReport();
    if (bad.length) overflowIssues.push({ slide: cc, bad });
    const before = cc;
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    const after = await counter();
    if (after === before) {
      const m = after.match(/(\d+)\s*\/\s*(\d+)/);
      if (m && m[1] === m[2]) break;
      continue;
    }
    cc = after;
    if (cc === before) break;
  }
  console.log('overflow issues:', overflowIssues.length ? JSON.stringify(overflowIssues, null, 1) : 'none');

  await page.goto(lessonUrl('quiz'));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'view-quiz.png') });

  await page.goto(lessonUrl('flashcards'));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'view-flashcards.png') });

  await page.goto(lessonUrl('print'));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outDir, 'view-print.png'), fullPage: false });

  console.log('JS errors:', errors.length ? errors.join('\n') : 'none');
  await browser.close();
})().catch((err) => { console.error(err); process.exit(1); });
