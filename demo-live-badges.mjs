// Live badge demo: run the platform against a COPY of the real database with a
// temporary demo teacher password, open the real A-level deck via file://,
// sign in, select S3.4, and screenshot a 🏆 and a 🐢 selection.
// The real .platform-data is never modified; everything is torn down at the end.
import { mkdtemp, rm, cp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import argon2 from "argon2";
import { createEconMarkServer } from "./apps/platform/server/app-server.mjs";
import { chromium } from "./node_modules/playwright-core/index.mjs";

const PORT = 4173;
const DEMO_PASSWORD = "demo-badges-123";
const dataDir = await mkdtemp(join(tmpdir(), "oh-badge-demo-"));
await cp(".platform-data", dataDir, { recursive: true });

// Temp teacher password in the COPY only.
const dbFile = join(dataDir, "econmark.sqlite");
const db = new DatabaseSync(dbFile);
db.prepare("UPDATE accounts SET password_hash = ?, updated_at = ? WHERE username = 'teacher' AND role = 'teacher'")
  .run(await argon2.hash(DEMO_PASSWORD, { type: argon2.argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1 }), new Date().toISOString());
db.close();

const app = await createEconMarkServer({
  root: join(process.cwd(), "apps/platform"),
  env: { OH_DATA_DIR: dataDir },
  gateway: { status: () => ({ ready: false, roles: {} }) }
});
await new Promise((resolve) => app.server.listen(PORT, "127.0.0.1", resolve));
console.log("demo server up on", PORT, "data:", dataDir);

const readSelection = async (page) => page.evaluate(() => ({
  name: document.querySelector(".studentSelectorSidePanel [data-current-name]")?.textContent,
  badge: document.querySelector(".studentSelectorSidePanel .selector-homework-badge")?.textContent || null
}));

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.on("pageerror", (e) => console.log("PAGEERROR:", e.message));
  await page.goto("file:///C:/Users/oehle/Documents/oehler-huang-platform/apps/library/a-level/lessons/9-1-3-full-employment-essay/index.html");
  await page.locator("#studentSelectorButton").click();

  const username = page.locator("platform-account input[name='username']");
  await username.waitFor({ timeout: 15000 });
  await username.fill("teacher");
  await page.locator("platform-account input[name='password']").fill(DEMO_PASSWORD);
  await page.locator("platform-account button.submit").click();

  const classSelect = page.locator(".studentSelectorSidePanel [data-action='class']");
  await classSelect.waitFor({ timeout: 20000 });
  await page.waitForFunction(() => {
    const select = document.querySelector(".studentSelectorSidePanel [data-action='class']");
    return select && [...select.options].some((o) => o.textContent.trim() === "S3.4");
  }, { timeout: 20000 });
  await classSelect.selectOption({ label: "S3.4" });
  await page.waitForTimeout(2500);
  const debug = await page.evaluate(() => {
    const btn = document.querySelector(".studentSelectorSidePanel [data-action='start']");
    const select = document.querySelector(".studentSelectorSidePanel [data-action='class']");
    const status = document.querySelector(".studentSelectorSidePanel .selector-load-status");
    const rect = btn?.getBoundingClientRect();
    return {
      disabled: btn?.disabled, rect: rect ? { w: rect.width, h: rect.height, x: rect.x, y: rect.y } : null,
      selectedClass: select?.value, ready: !select?.disabled,
      loadStatus: status?.textContent?.trim() || null,
      options: [...(select?.options || [])].map((o) => o.textContent.trim())
    };
  });
  console.log("DEBUG:", JSON.stringify(debug, null, 1));
  await page.screenshot({ path: "badge-debug.png" });

  const shots = { "🏆": "badge-live-trophy.png", "🐢": "badge-live-turtle.png" };
  const seen = new Set();
  await page.locator(".studentSelectorSidePanel [data-action='start']").click();
  for (let spin = 0; spin < 30 && Object.keys(shots).some((b) => !seen.has(b)); spin++) {
    await page.waitForSelector(".studentSelectorSidePanel .selector-outcomes", { timeout: 25000 });
    await page.waitForTimeout(400);
    const result = await readSelection(page);
    console.log(`spin ${spin + 1}:`, JSON.stringify(result));
    if (result.badge && shots[result.badge] && !seen.has(result.badge)) {
      seen.add(result.badge);
      await page.screenshot({ path: shots[result.badge] });
      console.log("saved", shots[result.badge]);
    }
    if (Object.keys(shots).every((b) => seen.has(b))) break;
    await page.locator(".studentSelectorSidePanel [data-action='no-grade']").click();
    await page.waitForTimeout(600);
    const next = page.locator(".studentSelectorSidePanel [data-action='next-student']");
    if (await next.count()) await next.click();
    await page.waitForTimeout(600);
  }
  const missing = Object.keys(shots).filter((b) => !seen.has(b));
  if (missing.length) throw new Error("Did not land on badge(s): " + missing.join(" "));
  console.log("DEMO PASS: live badges captured from real roster copy");
} finally {
  await browser.close();
  await new Promise((resolve) => app.server.close(resolve));
  app.accountStore.close();
  app.platformStore.close();
  await rm(dataDir, { recursive: true, force: true });
  console.log("demo server stopped, temp data removed");
}
