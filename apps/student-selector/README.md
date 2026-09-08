# Random Student Selector

This directory is the authenticated Student Selector application within the Oehler-Huang Learning Platform. Its original `gh-pages` history was imported as an unsquashed Git subtree; the public source repository and GitHub Pages deployment remain unchanged.

The account-based application is served from `/selector/` and can also be mounted in a lesson panel. Its classes and active memberships come from protected platform APIs, and selector sessions, attendance snapshots, selections, and informal outcomes are persisted by the server.

Lesson panels also support `classroomMode: true` without sign-in, matching the older Economics selector. This mode reads the existing public list from `https://randomizerselection.github.io/studentselector/assets/students.csv` and keeps selections in a separate browser session. It does not access platform rosters or save platform records. No roster CSV is copied into the platform or deployment.

The public class list and feedback text are cached in page memory for five minutes, including requests already in progress. Failed requests are retryable and time out after 15 seconds. Loading and retry messages stay visible in the controls panel. Escape closes a selector dialog first, then the panel; closing during a download does not recreate its UI. Browser storage failures do not prevent selection within the current panel.

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
