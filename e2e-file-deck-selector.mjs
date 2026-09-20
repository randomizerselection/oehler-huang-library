// One-off end-to-end verification: file:// lesson deck + local platform server.
// Uses a throwaway database on port 44173; the real .platform-data is untouched.
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createEconMarkServer } from "./apps/platform/server/app-server.mjs";
import { chromium } from "./node_modules/playwright-core/index.mjs";

const PORT = 44173;
const dataDir = await mkdtemp(join(tmpdir(), "oh-file-e2e-"));
const app = await createEconMarkServer({
  root: join(process.cwd(), "apps/platform"),
  env: { OH_DATA_DIR: dataDir },
  gateway: { status: () => ({ ready: false, roles: {} }) }
});
await new Promise((resolve) => app.server.listen(PORT, "127.0.0.1", resolve));

// Seed: teacher, class with two students, two homework assignments.
const admin = await app.platformStore.bootstrapAdmin({ username: "e2e.admin", password: "synthetic-admin-123" });
const invitation = app.platformStore.createTeacherInvitation(admin.account.account_id);
const teacher = await app.platformStore.registerTeacher({ username: "e2e.teacher", password: "synthetic-teacher-123", display_name: "E2E Teacher", invitation_code: invitation.invitation_code });
const classroom = app.platformStore.createClass(teacher.account.account_id, { name: "E2E Class 44" });
app.platformStore.attestClassConsent(teacher.account.account_id, classroom.class_id, { statement_version: "synthetic-test-only" });
const joinCode = app.platformStore.rotateJoinCode(teacher.account.account_id, classroom.class_id);
const studentA = await app.platformStore.registerStudent({ username: "e2e.complete", password: "synthetic-student-123", display_name: "Ada Complete", join_code: joinCode.join_code });
const studentB = await app.platformStore.registerStudent({ username: "e2e.empty", password: "synthetic-student-456", display_name: "Ben Empty", join_code: joinCode.join_code });
for (const [title, assigned_on] of [["Worksheet 1", "2026-09-10"], ["Worksheet 2", "2026-09-15"]]) {
  app.platformStore.recordHomeworkSubmissions(teacher.account.account_id, classroom.class_id, {
    assignment_title: title, assigned_on,
    items: [
      { student_account_id: studentA.account.account_id, status: "submitted" },
      { student_account_id: studentB.account.account_id, status: "missing" }
    ]
  });
}

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.addInitScript((origin) => { window.OH_PLATFORM_ORIGIN = origin; }, `http://127.0.0.1:${PORT}`);
  const lessonPath = "file:///C:/Users/oehle/Documents/oehler-huang-platform/apps/library/a-level/lessons/9-1-3-full-employment-essay/index.html";
  await page.goto(lessonPath);
  await page.locator("#studentSelectorButton").click();

  // The panel should prompt for teacher sign-in (local platform reachable, not signed in).
  const username = page.locator("platform-account input[name='username']");
  await username.waitFor({ timeout: 15000 });
  await username.fill("e2e.teacher");
  await page.locator("platform-account input[name='password']").fill("synthetic-teacher-123");
  await page.locator("platform-account button.submit").click();

  // After sign-in the panel must load platform classes (not the GitHub CSV).
  const classSelect = page.locator(".studentSelectorSidePanel [data-action='class']");
  await classSelect.waitFor({ timeout: 20000 });
  await page.waitForFunction(() => {
    const select = document.querySelector(".studentSelectorSidePanel [data-action='class']");
    return select && [...select.options].some((option) => option.textContent === "E2E Class 44");
  }, { timeout: 20000 });
  await classSelect.selectOption({ label: "E2E Class 44" });

  await page.locator(".studentSelectorSidePanel [data-action='start']").click();
  await page.waitForSelector(".studentSelectorSidePanel .selector-outcomes", { timeout: 20000 });
  await page.waitForTimeout(500);
  const result = await page.evaluate(() => ({
    name: document.querySelector(".studentSelectorSidePanel [data-current-name]")?.textContent,
    badge: document.querySelector(".studentSelectorSidePanel .selector-homework-badge")?.textContent || null,
    badgeLabel: document.querySelector(".studentSelectorSidePanel .selector-homework-badge")?.getAttribute("aria-label") || null
  }));
  const expected = { "Ada Complete": "🏆", "Ben Empty": "🐢" }[result.name];
  console.log("selected:", JSON.stringify(result));
  if (!expected || result.badge !== expected) {
    throw new Error(`Badge mismatch for ${result.name}: expected ${expected}, got ${result.badge}`);
  }
  await page.screenshot({ path: "file-deck-badge.png" });
  console.log("E2E PASS: file:// deck signed into local platform, badge", result.badge, "shown for", result.name);
} finally {
  await browser.close();
  await new Promise((resolve) => app.server.close(resolve));
  app.accountStore.close();
  app.platformStore.close();
  await rm(dataDir, { recursive: true, force: true });
}
