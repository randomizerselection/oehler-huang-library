// Verify the offline hint: open the A-level deck via file:// with NO platform
// server running, open the selector panel, and confirm the hint appears.
import { chromium } from 'playwright';

const deck = 'file:///C:/Users/oehle/Documents/oehler-huang-platform/apps/library/a-level/lessons/9-1-3-full-employment-essay/index.html';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
page.on('pageerror', (e) => console.log('PAGEERROR:', e.message));
await page.goto(deck);
await page.click('#studentSelectorButton');
await page.waitForSelector('.studentSelectorSidePanel', { timeout: 15000 });
// Give the platform probe (127.0.0.1:4173, expected absent) time to fail.
await page.waitForTimeout(4000);
const hint = await page.locator('.lesson-selector-platform-hint').textContent().catch(() => null);
console.log('HINT:', hint ? hint.slice(0, 60) + '…' : '(none)');
if (!hint) {
  await page.screenshot({ path: 'hint-missing.png' });
  console.log('FAIL: hint not shown');
  process.exitCode = 1;
} else {
  await page.screenshot({ path: 'hint-shown.png' });
  console.log('PASS: hint shown');
}
await browser.close();
