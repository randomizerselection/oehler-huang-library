# Current Investment course

Read the repository `AGENTS.md`, this file, and
`authoring/investment-course/planning/LESSON_DECK_PREFERENCES.md` from the repository
root. Work only in `oehler-huang-platform`.

- `index.html` determines the active lessons. Edit the linked `lessons/*/slides.js`
  files directly. Their public HTML is the source, not a generated copy.
- Use `window.INVESTMENT_COURSE.lesson` and
  `window.InvestmentPresentation.mount(...)`, with `course-assets/css/presentation.css`,
  `course-assets/js/presentation.js` and local `course-assets/images/`.
- Preserve the warm-paper, forest-green and copper design, semantic slide IDs,
  teacher notes, sources and answer/reveal interactions used by the linked lessons.
- Apply the 22 September 2026 stronger-design guidance in the saved preferences:
  simple content still needs a visual mechanism, a prediction followed by evidence,
  a connected worked model and independent assessment. The redesigned share-price
  lesson demonstrates this; static repeated text cards are not the default.
  The later same-day feedback requires real companies wherever possible,
  sufficient connected knowledge for 40 minutes, frequent formative checks and
  marked exam-style practice with protected independent response and feedback.
  Do not treat the earlier 14–16-slide simplification as a curriculum ceiling.
- Course exams are almost entirely MCQs (22 September clarification). Make
  exam-style practice and exits predominantly multiple choice, with application,
  calculation, causal reasoning and distractor explanations. Teach information
  effects through explicit mechanisms, visual models and dated real-company
  evidence; see the newest section of the saved lesson preferences.
- The current course sequence is `syllabus-2026-27.html`. The `termBank` in
  `course-map-financial-decisions-data.js` remains a terminology reference; its older
  lesson numbering and generator contract do not replace the current syllabus.
- Unlinked lessons and unused slide types are legacy. `unit-1/`, `_template/`,
  all-types demonstrations, older course renderers and unlinked PowerPoints are
  reference material, not templates for future lessons.
- Reuse the slide kinds demonstrated by the linked lessons. Do not switch the
  current course to `window.IGCSE.lesson` or enforce the old workbook/handout contract
  merely because an older skill or template mentions it.
- For a new lesson, use a linked lesson's mounting page, update content and local
  assets, and link the finished lesson from this course landing page. Update the
  current-course validation when the catalogue changes.
- Store planning, PowerPoint sources and export tools under
  `authoring/investment-course/`; do not maintain a second HTML copy there.
- Apply the validation levels in root `AGENTS.md`. Do not rebuild content for a
  slides-only edit. Legacy tests are not a design specification for current lessons.
