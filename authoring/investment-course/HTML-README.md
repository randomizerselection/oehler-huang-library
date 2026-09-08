# Investment HTML lessons

The canonical source is `apps/library/investment-analysis/` in the repository root.
Its landing page identifies the active lessons. Edit the linked `lessons/*/slides.js`
files directly; the standalone `html-course/` copy is deprecated.

Current references are Lesson 2 (Measuring investment return) and Lesson 3 (Compound
growth). They use warm paper, forest green and copper, with the shared renderer in
`course-assets/js/presentation.js`, stylesheet in `course-assets/css/presentation.css`
and local images under `course-assets/images/lesson-XX/`.

Use the course `AGENTS.md` and `authoring/investment-course/planning/LESSON_DECK_PREFERENCES.md`.
The linked decks and demonstrated slide kinds define the current system. Unlinked
lessons, old templates and unused kinds are legacy. Set new lesson metadata,
semantic slide IDs, notes and source citations explicitly; link finished lessons
from the landing page and update its catalogue check.

Run `npm start` from the repository root and preview `/investment-analysis/`.
Reload after edits. The retained detailed check is:

```powershell
node authoring/investment-course/scripts/verify-lesson.cjs lesson-03
```

Optional slide numbers narrow the check. It uses installed Chrome and the root
Playwright dependency, checks 1280×720, 1920×1080 and 390×844, and writes diagnostics
to `authoring/investment-course/tmp/html-verification/`. Inspect screenshots when
visual QA is needed. Use the root `AGENTS.md` validation level appropriate to the change.

Arrow keys reveal and advance; O opens overview, N opens notes and F requests
fullscreen. Students answer first, then check or reveal on the same slide.
Tables, partial reveals, blanks and MCQ feedback retain the linked lessons' behavior.
