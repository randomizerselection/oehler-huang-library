const fs = require("node:fs");
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
  await page.getByRole("button", { name: "Take Attendance", exact: true }).click();
  await page.keyboard.press("Enter");
  await expect.poll(() => page.evaluate(() => window.__toneFrequencies)).toEqual([988]);
  await page.keyboard.press("KeyA");
  await expect.poll(() => page.evaluate(() => window.__toneFrequencies)).toEqual([988, 523, 392]);
  await page.keyboard.press("Enter");
  await expect.poll(() => page.evaluate(() => window.__toneFrequencies)).toEqual([988, 523, 392, 988]);
  await page.keyboard.press("Enter");
  await expect.poll(() => page.evaluate(() => window.__toneFrequencies)).toEqual([988, 523, 392, 988, 988]);
  await expect(page.getByRole("dialog", { name: "Review attendance" })).toBeVisible();
  await page.getByRole("button", { name: "Save Attendance", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.__toneFrequencies)).toEqual([988, 523, 392, 988, 988, 659, 784, 988]);
  expect(await page.evaluate(() => window.__gainNodesCreated)).toBe(0);
  await page.evaluate(() => window.__selector.destroy());
  expect(await page.evaluate(() => window.__selector.sound.context.state)).toBe("closed");
  expect(await page.evaluate(() => window.__selector.sound.overlays.size)).toBe(0);
});

test('attendance sound toggle preserves the current student and review changes play matching cues', async ({ page }) => {
  await page.goto('/tests/harness.html');
  await page.locator('[data-action="class"]').selectOption('class-test');
  await page.evaluate(() => {
    window.__attendanceNotes = [];
    const create = AudioContext.prototype.createOscillator;
    AudioContext.prototype.createOscillator = function () {
      const oscillator = create.call(this);
      const start = oscillator.start.bind(oscillator);
      oscillator.start = (...args) => {
        window.__attendanceNotes.push(oscillator.frequency.value);
        start(...args);
      };
      return oscillator;
    };
  });
  await page.getByRole('button', { name: 'Take Attendance', exact: true }).click();
  await page.getByRole('button', { name: 'Sound on', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Sound off', exact: true })).toBeFocused();
  expect(await page.evaluate(() => window.__selector.modal.index)).toBe(0);
  // Enter on the sound control must toggle sound, never mark the student.
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Sound on', exact: true })).toBeFocused();
  expect(await page.evaluate(() => window.__selector.modal.index)).toBe(0);
  await expect.poll(() => page.evaluate(() => window.__attendanceNotes)).toEqual([988]);
  await page.getByRole('button', { name: 'Sound on', exact: true }).click();
  expect(await page.evaluate(() => window.__selector.sound.overlays.size)).toBe(0);
  await page.locator('[data-action="attendance-absent"]').click();
  expect(await page.evaluate(() => window.__attendanceNotes)).toEqual([988]);
  await page.getByRole('button', { name: 'Sound off', exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.__attendanceNotes)).toEqual([988, 988]);
  for (let index = 0; index < 3; index++) await page.locator('[data-action="attendance-present"]').click();
  await expect(page.getByRole('dialog', { name: 'Review attendance' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.__attendanceNotes.length)).toBe(5);
  const ada = page.getByRole('group', { name: 'Attendance for Ada', exact: true });
  await ada.getByRole('button', { name: 'Present', exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.__attendanceNotes)).toEqual([988, 988, 988, 988, 988, 988]);
  await ada.getByRole('button', { name: 'Absent', exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.__attendanceNotes.slice(-2))).toEqual([523, 392]);
  await ada.getByRole('button', { name: 'Absent', exact: true }).click();
  expect(await page.evaluate(() => window.__attendanceNotes.length)).toBe(8);
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

  await page.getByRole("button", { name: "Take Attendance" }).click();
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

for (const [outcome, dismiss] of [['A', 'close'], ['A', 'escape'], ['no-grade', 'close'], ['absent', 'close']]) {
  test(`closing ${outcome} feedback with ${dismiss} completes the turn without another grade`, async ({ page }) => {
    await page.goto('/tests/harness.html');
    await page.locator('[data-action="class"]').selectOption('class-test');
    await page.getByRole('button', { name: 'Sound', exact: true }).click();
    await page.evaluate(() => {
      const app = window.__selector;
      const record = app.recordRemoteEvents.bind(app);
      window.__selectionEvents = [];
      app.recordRemoteEvents = async events => {
        window.__selectionEvents.push(...events);
        return record(events);
      };
    });
    await page.clock.install();
    await page.getByRole('button', { name: 'START SELECTION', exact: true }).click();
    await page.clock.runFor(5100);
    const student = await page.evaluate(() => window.__selector.stage.finalStudent);
    await page.locator(outcome === 'A' ? '[data-action="rate"][data-rating="A"]' : `[data-action="${outcome}"]`).click();
    const feedback = page.getByRole('dialog');
    await expect(feedback).toBeVisible();
    if (dismiss === 'escape') await page.keyboard.press('Escape');
    else await feedback.getByRole('button', { name: 'Close', exact: true }).click();
    await expect(feedback).toHaveCount(0);
    await expect(page.locator('[data-stage]')).toHaveAttribute('data-mode', 'idle');
    await expect(page.locator('.selector-outcomes')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'START SELECTION', exact: true })).toBeEnabled();
    expect(await page.evaluate(() => window.__selectionEvents.filter(event => event.type === 'outcome').map(event => event.outcome)))
      .toEqual([outcome === 'A' ? 'A' : outcome === 'no-grade' ? 'No Grade' : 'Absent']);
    // The next call must exclude the already completed student.
    await page.getByRole('button', { name: 'START SELECTION', exact: true }).click();
    await page.clock.runFor(5100);
    expect(await page.evaluate(() => window.__selector.stage.finalStudent)).not.toBe(student);
    const saved = await page.evaluate(() => ({
      state: window.__selector.classState('class-test'),
      outcomes: window.__selectionEvents.filter(event => event.type === 'outcome').length
    }));
    expect(saved.outcomes).toBe(1);
    if (outcome === 'A') expect(saved.state.grades[student]).toBe('A');
    else expect(saved.state[outcome === 'absent' ? 'absent' : 'ungraded']).toContain(student);
  });
}

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

test("attendance result downloads a spreadsheet-ready CSV", async ({ page }) => {
  await page.goto("/tests/harness.html");
  await page.locator("[data-action='class']").selectOption("class-test");
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  await page.getByRole("button", { name: "Take Attendance", exact: true }).click();
  await page.keyboard.press("Enter");
  await page.keyboard.press("KeyA");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Review attendance" })).toBeVisible();
  await page.getByRole("button", { name: "Save Attendance", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Attendance saved" })).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download CSV", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe(`attendance-class-test-${today}.csv`);
  const csv = fs.readFileSync(await download.path(), "utf8");
  expect(csv).toBe("\ufeff" + `Student,${today}\r\nAda,Present\r\nBen,Absent\r\nChloe,Present\r\nDan,Present\r\n`);
  await expect(page.getByRole("status").filter({ hasText: "CSV downloaded" })).toBeVisible();
});

test("roll call is full screen and surfaces attendance and homework talking points", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/tests/harness.html");
  await page.locator("[data-action='class']").selectOption("class-test");
  await page.getByRole("button", { name: "Take Attendance", exact: true }).click();

  const rollCall = page.getByRole("dialog", { name: "Roll call" });
  await expect(rollCall).toBeVisible();
  const bounds = await rollCall.boundingBox();
  expect(bounds).toMatchObject({ x: 0, y: 0, width: 1280, height: 800 });
  await expect(rollCall.getByText("Previous attendance")).toBeVisible();
  await expect(rollCall.getByText("90%", { exact: true })).toBeVisible();
  await expect(rollCall.getByText("Homework completion")).toBeVisible();
  await expect(rollCall.getByText("Market structures worksheet")).toBeVisible();
  await expect(rollCall.getByText("1 previous absence · 1 homework item to follow up")).toBeVisible();
  await expect(rollCall.locator(".selector-homework-badge")).toHaveText("🥇");
  await expect(rollCall.getByLabel("Homework statistics")).toContainText("Missing1");
  await expect(rollCall.getByLabel("Homework statistics")).toContainText("Working needed0");

  const calculationNote = rollCall.getByText("How completion is calculated", { exact: true });
  await calculationNote.press("Enter");
  await expect(rollCall.getByText("Recorded homework in this class. Late work counts as completed; exemptions are excluded.")).toBeVisible();
  await expect(rollCall.getByRole("heading", { name: "Ada", exact: true })).toBeVisible();
  await calculationNote.press("Enter");
  await rollCall.getByRole("heading", { name: "Ada", exact: true }).click();

  await page.keyboard.press("Enter");
  await expect(rollCall.getByRole("heading", { name: "Ben" })).toBeVisible();
  await expect(rollCall.getByText("1 late submission", { exact: true })).toBeVisible();
  await expect(rollCall.locator(".selector-homework-badge")).toHaveText("🏆");
  await expect(rollCall.getByText("100%", { exact: true })).toHaveCount(2);

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileBounds = await rollCall.boundingBox();
  expect(mobileBounds).toMatchObject({ x: 0, y: 0, width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await expect(rollCall.getByRole("button", { name: /Present/ })).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(rollCall.getByRole("heading", { name: "Chloe" })).toBeVisible();
  await expect(rollCall.locator(".selector-homework-badge")).toHaveText("📋");
  await expect(rollCall.getByText("Limited history", { exact: true })).toBeVisible();
  await expect(rollCall.getByLabel("Homework statistics")).toHaveCount(0);
  await page.keyboard.press("Enter");
  await expect(rollCall.locator(".selector-homework-badge")).toHaveText("🌱");
  await expect(rollCall.getByLabel("Homework statistics")).toContainText("Missing2");
});

test("failed attendance save remains in review and never claims success", async ({ page }) => {
  await page.goto("/tests/harness.html");
  await page.evaluate(() => {
    window.__selector.destroy();
    const roster = [
      { account_id: "student-1", display_name: "Ada" },
      { account_id: "student-2", display_name: "Ben" },
      { account_id: "student-3", display_name: "Chloe" }
    ];
    window.__selector = window.StudentSelector.mount(document.querySelector("#app"), {
      ...window.__testAdapters,
      sessionAdapter: {
        start: async () => ({ session_id: "selector-live", class_id: "class-test", status: "active", version: 1, roster, attendance: [], selections: [], attendance_summary: { roster_total: 3, marked: 0, present: 0, absent: 0, finalized: false, finalized_at: null } }),
        saveAttendance: async () => { throw new Error("Network unavailable"); }
      }
    });
  });
  await page.locator("[data-action='class']").selectOption("class-test");
  await page.getByRole("button", { name: "Take Attendance", exact: true }).click();
  await page.keyboard.press("Enter");
  await page.keyboard.press("KeyA");
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Save Attendance", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Review attendance" })).toBeVisible();
  await expect(page.getByRole("alert")).toHaveText("Network unavailable");
  await expect(page.getByRole("dialog", { name: "Attendance saved" })).toHaveCount(0);
});

test("selected student shows a homework encouragement badge", async ({ page }) => {
  await page.goto("/tests/harness.html");
  await page.locator("[data-action='class']").selectOption("class-test");

  const selectStudent = (accountId, name) => page.evaluate(([id, label]) => {
    const app = window.__selector;
    app.stage = { mode: "selected", className: "class-test", finalStudent: id, names: ["", label, ""], progress: 100 };
    app.render();
  }, [accountId, name]);

  const badge = page.locator(".selector-homework-badge");
  const currentName = page.locator("[data-current-name]");

  // All assignments completed: trophy.
  await selectStudent("student-2", "Ben");
  await expect(badge).toHaveCount(1);
  await expect(badge).toHaveText("🏆");
  await expect(badge).toHaveAttribute("aria-label", "Homework: 3 of 3 completed (100%) — All homework completed");
  await expect(currentName).toHaveText("Ben");

  // Partial completion also gets a symbol.
  await selectStudent("student-1", "Ada");
  await expect(badge).toHaveText("🥇");
  await expect(badge).toHaveAttribute("title", "Homework: 3 of 4 completed (75%) — Nearly there");
  await expect(currentName).toHaveText("Ada");

  // Class has homework, but this student has no records: neutral, not zero.
  await selectStudent("student-3", "Chloe");
  await expect(badge).toHaveText("📋");
  await expect(badge).toHaveAttribute("aria-label", "Homework: no records available for this student");

  // Nothing completed yet: a seedling suggests room to grow.
  await selectStudent("student-4", "Dan");
  await expect(badge).toHaveCount(1);
  await expect(badge).toHaveText("🌱");
  await expect(currentName).toHaveText("Dan");

  // The slot animation's text updates must not destroy the badge element.
  await page.evaluate(() => {
    const app = window.__selector;
    app.stage.names = ["", "Dan", ""];
    app.updateStageOnly();
  });
  await expect(badge).toHaveCount(1);
  await expect(currentName).toHaveText("Dan");
});

test("homework badges cover tier boundaries, exemptions and classes without homework", async ({ page }) => {
  await page.goto("/tests/harness.html");
  await page.locator("[data-action='class']").selectOption("class-test");
  const badge = page.locator(".selector-homework-badge");
  for (const [completed, eligible, icon] of [
    [0, 4, "🌱"], [1, 4, "🥉"], [49, 100, "🥉"], [2, 4, "🥈"],
    [74, 100, "🥈"], [3, 4, "🥇"], [199, 200, "🥇"], [4, 4, "🏆"]
  ]) {
    await page.evaluate(({ completed, eligible }) => {
      const app = window.__selector;
      app.studentContext["student-1"].homework = { total: eligible, completed, eligible, completion_rate: Math.round(completed / eligible * 100) };
      app.stage = { mode: "selected", finalStudent: "student-1", names: ["", "Ada", ""], progress: 100 };
      app.render();
    }, { completed, eligible });
    await expect(badge).toHaveText(icon);
    await expect(badge).toHaveAttribute("title", new RegExp(`${completed} of ${eligible} completed`));
  }
  await page.evaluate(() => {
    const app = window.__selector;
    app.studentContext["student-1"].homework = { total: 4, eligible: 0, completed: 0, exempt: 4 };
    app.render();
  });
  await expect(badge).toHaveText("➖");
  await expect(badge).toHaveAttribute("aria-label", "Homework: no eligible assignments (exempt)");
  await page.evaluate(() => {
    const app = window.__selector;
    // A separate class must not inherit badges from a class with homework.
    app.classes["class-empty"] = ["student-empty"];
    app.state.selectedClass = "class-empty";
    app.stage = { mode: "selected", finalStudent: "student-empty", names: ["", "Emma", ""], progress: 100 };
    app.render();
  });
  await expect(badge).toHaveCount(0);
  await page.evaluate(() => {
    const app = window.__selector;
    app.state.selectedClass = "class-test";
    app.stage = { mode: "spinning", finalStudent: "student-2", names: ["", "Ben", ""], progress: 50 };
    app.render();
  });
  await expect(badge).toHaveCount(0);
});
