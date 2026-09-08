# Course authoring

Use **oehler-huang-platform** for all Investment and A-level work. The HTML files
served by the platform are the editable originals; there is no copy or sync step.
Run commands below from the repository root.

| Work | Canonical location |
|---|---|
| Investment HTML content | `apps/library/investment-analysis/lessons/<lesson>/slides.js` |
| Investment renderer and images | `apps/library/investment-analysis/course-assets/` |
| Investment current syllabus | `apps/library/investment-analysis/syllabus-2026-27.html` |
| Investment teaching preferences and planning documents | `authoring/investment-course/planning/` |
| A-level HTML content and diagram states | `apps/library/a-level/lessons/<lesson>/` |
| A-level renderer and diagram geometry | `apps/library/a-level/shared-html/` |
| A-level planning workbooks | `authoring/a-level/planning/` |
| A-level syllabus and lesson planner | `apps/library/a-level/syllabus/index.html`, `syllabus-data.js`, `syllabus.js`, `syllabus.css` |
| A-level lesson checks and portable HTML exporters | `authoring/a-level/deck-sources/<lesson>/` |
| Retained PowerPoints, builders, templates and handouts | The relevant course folder under `authoring/`; these are legacy references unless explicitly requested |

## Active lessons and new work

The course landing pages are authoritative for active status. Currently they link
Investment Lesson 2 (Measuring investment return), Lesson 3 (Compound growth),
A-level 9.1.1 (The multiplier) and 9.1.2 (Components of aggregate demand).

Unlinked lessons and unused lesson types are legacy. Start new HTML lessons from
the linked course's existing content and renderer, preserve its design identity,
and use its demonstrated slide kinds. The old Investment `unit-1/`, `_template/`,
PowerPoint-only Lesson 1 and comparison decks are not defaults for new work.

Read the course's `AGENTS.md` before editing. Add new lesson folders under the
appropriate public `lessons/` directory and link finished lessons from the course
landing page. Keep private planning and generators under `authoring/`.

The A-level HTML planner is maintained in `apps/library/a-level/syllabus-data.js`.
Its 58 source statements preserve `Syllabus planner.xlsx`; section 9–10 allocations
remain unchanged and section 11 uses explicitly provisional estimates from the
earlier coverage workbook. Its 48 sessions include a quarter-lesson consolidation
slot. Preserve stable lesson IDs when revising teaching plans. Dates, status and
notes entered in the browser are personal local drafts, not changes to the shared
data file. `npm run test:a-level-syllabus --workspace=@oehler-huang/library`
checks source wording, allocations, coverage and active lesson links against the
retained workbooks, using a source snapshot with workbook SHA-256 hashes.
`extract-syllabus.py` refreshes that snapshot after workbook changes; it reads
the workbooks without modifying them and does not overwrite the HTML plan.

## Preview and verification

Run `npm start`, then open `http://127.0.0.1:4173/investment-analysis/` or
`http://127.0.0.1:4173/a-level/`. Reload after source edits. Follow root `AGENTS.md`
for the narrow checks appropriate to the change.

- `npm run check:courses` checks the landing-page lesson routes and local assets.
- `npm run export:a-level` regenerates both portable A-level HTML files directly
  from the canonical HTML lessons, under `authoring/a-level/outputs/`.
- `npm run check:a-level` runs the retained content, diagram and offline checks
  after export.
- `node authoring/investment-course/scripts/verify-lesson.cjs lesson-03` runs the
  retained rendered Investment lesson check; optional slide numbers narrow it.

Portable outputs are generated copies, excluded from Git. Edit the canonical
lesson, then export again. PowerPoint reference builds use the bundled presentation
runtime when needed; they are not part of the website build.

## References and recovery

Textbooks, the A-level syllabus PDF and previous lesson references are available at
`C:\Users\oehle\Documents\oehler-huang-legacy-sources\course-reference-archive\`,
under `investment-course/` and `a-level/`. These optional research files stay outside
Git and deployment. Planning workbooks and current source tools are inside this project.

The original `C:\Users\oehle\Documents\investment-course` and
`C:\Users\oehle\Documents\a-level` folders are retained as deprecated recovery
copies. They can be removed from the Codex project sidebar. Do not continue editing
or syncing them. All imported files were hash-checked before path adaptation.

`authoring/` is outside the platform's HTTP static roots and deployment inputs.
Keep private planning, templates and classroom source material in this directory.
