# Random Student Selector

This directory is the authenticated Student Selector application within the Oehler-Huang Learning Platform. Its original `gh-pages` history was imported as an unsquashed Git subtree; the public source repository and GitHub Pages deployment remain unchanged.

The consolidated application is served from `/selector/` and can also be mounted in a lesson panel. It never loads a public roster file. Classes and active memberships come from the platform APIs, and selector sessions, attendance snapshots, selections, and informal outcomes are persisted by the server.

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
