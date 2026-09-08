const { expect, test } = require("@playwright/test");

test('selection works with blocked storage and fresh mounts do not share outcomes', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage blocked'); };
    Storage.prototype.setItem = () => { throw new Error('Storage blocked'); };
  });
  await page.goto('/tests/harness.html');
  await page.locator('[data-action="class"]').selectOption('class-test');
  await page.getByRole('button', { name: 'Sound', exact: true }).click();
  await page.getByRole('button', { name: 'START SELECTION', exact: true }).click();
  await page.locator('[data-action="no-grade"]').click({ timeout: 15000 });
  expect(await page.evaluate(() => window.__selector.metrics().ungraded)).toBe(1);
  await page.evaluate(() => {
    window.__selector.destroy();
    window.__selector = window.StudentSelector.mount(document.querySelector('#app'), window.__testAdapters);
  });
  await page.locator('[data-action="class"]').selectOption('class-test');
  await expect(page.locator('.selector-metrics .selector-metric').nth(2)).toContainText('0');
});

test("decodes and plays every original MP3 with the original duration mapping", async ({ page }) => {
  const warnings = [];
  page.on("console", (message) => {
    if (message.text().includes("Student selector sound")) warnings.push(message.text());
  });
  await page.goto("/tests/harness.html");
  await page.getByRole("button", { name: "Play Intro", exact: true }).click();
  await expect.poll(() => page.evaluate(() => Boolean(window.__selector.sound.current))).toBe(true);
  const result = await page.evaluate(async () => {
    const app = window.__selector;
    const files = ["welcome", "closing", "select_student", "medium_slot", "long_slot",
      "timeup", "sound_a_star", "sound_a", "sound_b", "sound_c"];
    const decoded = [];
    for (const name of files) {
      await app.sound.play(`assets/${name}.mp3`);
      const buffer = app.sound.current.buffer;
      decoded.push({ name, duration: buffer.duration,
        hasSignal: buffer.getChannelData(0).some((sample) => Math.abs(sample) > 0.01) });
    }
    const state = app.sound.context.state;
    app.sound.stop();
    return { decoded, state, slots: [3, 5, 20].map((seconds) => app.slotSound(seconds)) };
  });
  expect(result.state).toBe("running");
  expect(result.decoded).toHaveLength(10);
  for (const clip of result.decoded) {
    expect(clip.duration, clip.name).toBeGreaterThan(0);
    expect(clip.hasSignal, clip.name).toBe(true);
  }
  expect(result.slots).toEqual(["assets/select_student.mp3", "assets/medium_slot.mp3", "assets/long_slot.mp3"]);
  expect(warnings).toEqual([]);
});

test("time-up survives selection reveal but mute stops all channels", async ({ page }) => {
  await page.goto("/tests/harness.html");
  await page.locator("[data-action='class']").selectOption("class-test");
  await page.getByRole("button", { name: "START SELECTION" }).click();
  await expect.poll(() => page.evaluate(() => Boolean(window.__selector.sound.current?.loop))).toBe(true);
  await expect(page.getByRole("button", { name: /A Strong/ })).toBeVisible({ timeout: 7_000 });
  expect(await page.evaluate(() => ({
    music: window.__selector.sound.current,
    overlays: window.__selector.sound.overlays.size
  }))).toEqual({ music: null, overlays: 1 });
  await page.evaluate(() => window.__selector.toggle("soundEnabled"));
  expect(await page.evaluate(() => window.__selector.sound.overlays.size)).toBe(0);
  await page.evaluate(() => window.__selector.sound.playOverlay("assets/timeup.mp3"));
  expect(await page.evaluate(() => window.__selector.sound.overlays.size)).toBe(0);
});

test("quiet countdown still plays time-up after user activation expires", async ({ page }) => {
  await page.goto("/tests/harness.html");
  await page.locator("[data-action='class']").selectOption("class-test");
  await page.getByRole("button", { name: "Slot Effect" }).click();
  await page.evaluate(() => window.__selector.setTimer(7));
  await page.getByRole("button", { name: "START SELECTION" }).click();
  await expect.poll(() => page.evaluate(() => window.__selector.sound.context?.state)).toBe("running");
  await expect(page.getByRole("button", { name: /A Strong/ })).toBeVisible({ timeout: 10_000 });
  expect(await page.evaluate(() => window.__selector.sound.overlays.size)).toBe(1);
});

test("mute cancels audio still loading and later playback can retry", async ({ page }) => {
  let release;
  const delayed = new Promise((resolve) => { release = resolve; });
  await page.route("**/assets/welcome.mp3", async (route) => {
    await delayed;
    await route.continue();
  });
  await page.goto("/tests/harness.html");
  const requested = page.waitForRequest("**/assets/welcome.mp3");
  await page.getByRole("button", { name: "Play Intro", exact: true }).click();
  await requested;
  await page.getByRole("button", { name: "Sound", exact: true }).click();
  // Unmuting before the download finishes must not resurrect the cancelled cue.
  await page.getByRole("button", { name: "Sound", exact: true }).click();
  release();
  await page.evaluate(async () => {
    await window.__selector.sound.buffer("assets/welcome.mp3");
  });
  expect(await page.evaluate(() => window.__selector.sound.current)).toBeNull();
  await page.getByRole("button", { name: "Play Intro", exact: true }).click();
  await expect.poll(() => page.evaluate(() => Boolean(window.__selector.sound.current))).toBe(true);
});

test("roll call restores the original present, absent and completion tones", async ({ page }) => {
  await page.goto("/tests/harness.html");
  await page.locator("[data-action='class']").selectOption("class-test");
  await page.evaluate(() => {
    window.__toneFrequencies = [];
    window.__gainNodesCreated = 0;
    const createGain = AudioContext.prototype.createGain;
    AudioContext.prototype.createGain = function () {
      window.__gainNodesCreated += 1;
      return createGain.call(this);
    };
    const create = AudioContext.prototype.createOscillator;
    AudioContext.prototype.createOscillator = function () {
      const oscillator = create.call(this);
      const start = oscillator.start.bind(oscillator);
      oscillator.start = (...args) => {
        window.__toneFrequencies.push(oscillator.frequency.value);
        start(...args);
      };
      return oscillator;
    };
  });
  await page.getByRole("button", { name: "Attendance", exact: true }).click();
  await page.keyboard.press("Enter");
  await expect.poll(() => page.evaluate(() => window.__toneFrequencies)).toEqual([988]);
  await page.keyboard.press("KeyA");
  await expect.poll(() => page.evaluate(() => window.__toneFrequencies)).toEqual([988, 523, 392]);
  await page.keyboard.press("Enter");
  await expect.poll(() => page.evaluate(() => window.__toneFrequencies)).toEqual([988, 523, 392, 988, 659, 784, 988]);
  expect(await page.evaluate(() => window.__gainNodesCreated)).toBe(0);
  await page.evaluate(() => window.__selector.destroy());
  expect(await page.evaluate(() => window.__selector.sound.context.state)).toBe("closed");
  expect(await page.evaluate(() => window.__selector.sound.overlays.size)).toBe(0);
});

test("loads roster and completes the core selector flow", async ({ page }) => {
  await page.goto("/tests/harness.html");

  await expect(page.getByRole("heading", { name: "Random Student Selector" })).toBeVisible();

  const classSelect = page.locator("[data-action='class']");
  await expect(classSelect).toBeVisible();
  await expect(classSelect.locator("option").first()).toHaveCSS("color", "rgb(7, 17, 31)");
  await expect(classSelect.locator("option").first()).toHaveCSS("background-color", "rgb(255, 255, 255)");
  const options = await classSelect.locator("option").allTextContents();
  const className = options.find((option) => option !== "Select a Class");
  expect(className).toBeTruthy();

  await classSelect.selectOption({ label: className });
  await expect(page.getByLabel("Selection stage").getByText(/\d+ left \| 0 graded/)).toBeVisible();

  await page.getByRole("button", { name: "Attendance" }).click();
  await expect(page.getByRole("dialog", { name: "Roll call" })).toBeVisible();
  await page.keyboard.press("Enter");
  await page.keyboard.press("KeyA");
  await page.getByLabel("Close").click();

  await page.getByRole("button", { name: "Slot Effect" }).click();
  const startButton = page.getByRole("button", { name: "START SELECTION" });
  await startButton.hover();
  await expect(startButton).toHaveCSS("color", "rgb(255, 250, 243)");
  await expect(startButton).toHaveCSS("background-color", "rgb(133, 77, 34)");
  await startButton.click();

  await expect(page.locator("[data-current-name]")).toHaveText("Get ready");
  await expect(page.getByRole("button", { name: /A\*|Excellent/ })).toBeVisible({ timeout: 7_000 });
  await page.getByRole("button", { name: /A Strong/ }).click();
  await expect(page.getByRole("dialog", { name: "Feedback" })).toBeVisible();
  await page.getByRole("button", { name: "Return To Dock" }).click();
  await page.getByRole("button", { name: "View Summary" }).click();
  await expect(page.getByRole("dialog", { name: "Session summary" })).toBeVisible();
  await expect(page.locator(".selector-summary-row")).toHaveCount(1);
});

test("exposes the reusable lesson overlay API", async ({ page }) => {
  await page.goto("/tests/harness.html");

  const hasApi = await page.evaluate(() => {
    return Boolean(window.StudentSelector?.mount && window.StudentSelector?.open);
  });

  expect(hasApi).toBe(true);

  await page.evaluate(() => {
    window.__selectorOverlay = window.StudentSelector.open(window.__testAdapters);
  });

  await expect(page.locator(".selector-overlay-host")).toBeVisible();
  await expect(page.locator(".selector-overlay-host").getByRole("heading", { name: "Random Student Selector" })).toBeVisible();

  await page.evaluate(() => window.__selectorOverlay.close());
  await expect(page.locator(".selector-overlay-host")).toHaveCount(0);
});
