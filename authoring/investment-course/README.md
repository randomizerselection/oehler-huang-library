# Investment course authoring

The active HTML lessons are edited directly in
`apps/library/investment-analysis/lessons/` from the repository root. Use that
course's landing page and `AGENTS.md` to select the active source. See
`authoring/README.md` for the consolidated workflow.

- `planning/LESSON_DECK_PREFERENCES.md`: preserved teaching and design preferences.
- `planning/`: supporting course-plan documents and handout preferences. The
  canonical interactive syllabus is `apps/library/investment-analysis/syllabus-2026-27.html`.
- `scripts/verify-lesson.cjs`: rendered checks against the canonical HTML source.
- `lesson-01/`, `lesson-02/`, `templates/` and `assets/`: retained PowerPoint sources,
  builders, templates and imagery. Unlinked decks and unused lesson types are legacy;
  these files are available for explicitly requested PowerPoint work and provenance.
- `lesson-02/source/base/` and its alternative's `base/`: durable starter decks
  previously left in temporary folders. Builders no longer read those old folders.

PowerPoint builders use the bundled presentation runtime. They are not website
build inputs and should not regenerate the independently maintained HTML lessons.
Keep new private source here, generated diagnostics in `tmp/`, and new public HTML
in the course's existing `lessons/` directory.
