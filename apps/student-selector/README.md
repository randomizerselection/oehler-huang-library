# Random Student Selector

This directory is the authenticated Student Selector application within the Oehler-Huang Learning Platform. Its original `gh-pages` history was imported as an unsquashed Git subtree; the public source repository and GitHub Pages deployment remain unchanged.

The account-based application is served from `/selector/` and can also be mounted in a lesson panel. Its classes and active memberships come from protected platform APIs, and selector sessions, attendance snapshots, selections, and informal outcomes are persisted by the server.

Selected students and the current student during roll call show homework symbols from the class's recorded homework: 🏆 all completed, 🥇 at least 75%, 🥈 at least 50%, 🥉 some completed below 50%, and 🌱 none completed yet. Tiers use completed/eligible counts before rounding. Hover text and accessible labels give the counts and percentage. Late submissions count as completed; exemptions are excluded. ➖ means all recorded work is exempt; 📋 means the class has homework records but this student has none. Classes with no homework records show no symbol.

Roll call also shows previous attendance totals and recent marks, completion totals, separate missing/working-needed/late/exempt counts, and outstanding assignment details. Late submissions are flagged for follow-up even with 100% completion. Missing history is labelled explicitly rather than presented as a clean record.

Lesson panels mount with `skipStyles: true`. Their attendance layout is owned by Library's `assets/css/lesson-selector-attendance.css`, imported by both the shared lesson panel stylesheet and the Economics presentation stylesheet. Verify visual changes inside actual A-level, Investment and Economics lessons as well as the standalone selector; the standalone harness alone cannot catch missing lesson styles.

When roll call finishes, the result dialog offers **Download Attendance (.csv)**: an Excel-ready file (UTF-8 BOM, CRLF) with one row per roster student in roster order — `Student` plus a date column headed with the local date, each marked `Present` or `Absent` — saved as `attendance-<class>-<date>.csv` for pasting into the teacher's name list spreadsheet. The download works in classroom mode too, since it only needs the loaded roster.

Lesson panels also work when decks are opened from disk (`file://`). In that case the panel connects to the local platform server (default `http://127.0.0.1:4173`, overridable with a `oh-platform-origin` meta tag or `window.OH_PLATFORM_ORIGIN`): it offers teacher sign-in once per page load and then uses platform rosters, homework context (homework completion badges), and server sessions. This file-page access is only allowed when the server runs on a loopback host (or `OH_ALLOW_FILE_PAGES=1` is set); public deployments keep rejecting cross-origin calls.

When the local platform is not reachable, lesson panels fall back to `classroomMode: true` without sign-in, matching the older Economics selector. This mode reads the existing public list from `https://randomizerselection.github.io/studentselector/assets/students.csv` and keeps selections in a separate browser session. It does not access platform rosters or save platform records. No roster CSV is copied into the platform or deployment.

The public class list and feedback text are cached in page memory for five minutes, including requests already in progress. Failed requests are retryable and time out after 15 seconds. Loading and retry messages stay visible in the controls panel. Escape closes a selector dialog first, then the panel; closing during a download does not recreate its UI. Browser storage failures do not prevent selection within the current panel.

Attendance has distinct audio cues: one high tone for **Present**, two lower tones for **Absent**, and an ascending cue after saving. The **Sound on/off** button in the roll-call header uses the same preference as the selector's Sound toggle; switching it on plays a sample present cue. Clicking or using attendance shortcuts plays the matching cue, as does changing a mark during review. Muting stops all selector audio.

## Browser API

`selector.js` preserves:

```js
window.StudentSelector.mount(container, options)
window.StudentSelector.open(options)
```

Integrated callers must provide authenticated adapters:

```js
window.StudentSelector.mount(container, {
  basePath: "/student-selector/",
  skipStyles: true,
  onClose,
  defaultClassId,
  lessonContext,
  dataAdapter: { listClasses, loadRoster },
  sessionAdapter: { start, recordEvents, complete }
});
```

`sessionStorage` may preserve local presentation preferences, but server sessions and events are authoritative. Feedback messages, icons, audio, JavaScript, and CSS are served from the same origin.

## Development

- `index.html` — authenticated standalone shell
- `selector.js` — selector behavior and browser API
- `selector.css` — standalone styles
- `assets/messages.csv` — version-controlled feedback text
- `tests/harness.html` — synthetic adapter harness
- `tests/selector.spec.js` — Playwright regression tests

Run from the monorepo root with `npm run test:selector`.
