# Student Selector integration

The consolidated selector is a same-origin, authenticated platform application. Teachers can use `/selector/` directly or open the scoped right-side panel from a lesson. Anonymous users and students must not receive class, roster, session, outcome, or report data.

## Required adapters

```js
const selector = window.StudentSelector.mount(panel, {
  basePath: "/student-selector/",
  skipStyles: true,
  defaultClassId,
  lessonContext: { lessonId, slideId, assignmentId },
  dataAdapter: {
    listClasses: () => api("/api/selector/classes"),
    loadRoster: (classId) => api(`/api/selector/classes/${classId}/roster`)
  },
  sessionAdapter: {
    start: (input) => api("/api/selector/sessions", { method: "POST", body: input }),
    recordEvents: (sessionId, input) => api(`/api/selector/sessions/${sessionId}/events/batch`, { method: "POST", body: input }),
    complete: (sessionId, input) => api(`/api/selector/sessions/${sessionId}/complete`, { method: "POST", body: input })
  },
  onClose: () => panel.remove()
});
```

Use `skipStyles: true` in lessons so the lesson viewer supplies scoped selector styles. Closing a panel only hides it; the platform session remains active for reopening. “End session” completes it, and “Reset” completes it with reset status before starting a new snapshot.

The application loads only non-roster assets relative to `basePath`: feedback messages, icons, audio, CSS, and JavaScript. There is intentionally no deployed `assets/students.csv`.
