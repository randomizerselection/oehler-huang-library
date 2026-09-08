# Oehler-Huang platform instructions

## Project layout

- `apps/library`: public lessons and Investment Analysis content.
- `apps/platform`: authenticated Node/SQLite application and EconMark.
- `apps/student-selector`: teacher-only selector UI and its preserved history.
- `packages/contracts`: app-independent content contracts and public-file policy, shared by builders, server and release tooling. Apps must declare this dependency and must not import sibling app implementations.
- `authoring/investment-course` and `authoring/a-level`: non-public course planning, preferences, export/check tools and retained PowerPoint references. Start all new course work in this repository.

## Course ownership and legacy material

- Course landing pages determine which lessons are active. Lessons and lesson types not linked from the relevant course landing page are legacy. Preserve them as references; do not use them as default templates or add them back to the catalogue without a user request.
- Edit Investment HTML directly under `apps/library/investment-analysis/lessons/`, using its `course-assets/` renderer. Read that course's `AGENTS.md` and `authoring/investment-course/planning/LESSON_DECK_PREFERENCES.md` first. The older `unit-1/`, `_template/` and Economics-renderer Investment system are legacy.
- Edit A-level HTML directly under `apps/library/a-level/lessons/`, using `apps/library/a-level/shared-html/`. Read that course's `AGENTS.md` and `authoring/a-level/AGENTS.md` first.
- Use the slide kinds demonstrated by the linked lessons. An unused renderer branch or an old all-types demonstration does not make a lesson type current. Preserve each course's own design and interactions.
- The sibling `investment-course` and `a-level` projects are deprecated recovery copies. Do not edit them, sync from them, or create another HTML source under `authoring/`.
- Keep planning, templates, PowerPoint builders and classroom export files outside `apps/library`. See `authoring/README.md` for the current paths and external reference archive.
- Complete a new HTML lesson by linking it from its course landing page and updating the relevant catalogue checks; until then, label it explicitly as a draft.

Run root commands from this directory. Do not deploy public roster CSV files or add secrets, databases, uploads, backups, generated reports, or provider credentials to Git.

Read `docs/ARCHITECTURE.md` for architecture work. Keep course renderers owned by
their courses. New shared application contracts belong under `packages/`; private
authoring stays outside public roots. `npm run check:architecture` enforces module
boundaries. `npm run release:plan` previews the explicit release inputs. Legacy
generator checks run through `npm run test:legacy`, not the active lesson baseline.

## Teaching preference: introduce the logic before the definition

For future topic introductions, first demonstrate how the idea works through a
concrete example. Make the visual or content structure follow the concept's
logic, using a sequence, comparison or cause-and-effect chain as appropriate.
Let students see and explain the mechanism before presenting a concise definition
to consolidate it. For example, show money earning interest, that interest staying
invested, and the larger balance earning interest again before defining compounding.
Apply this when creating or revising introductions; preserve each course's own
design and interactions.

## Required validation

- Run `npm test` after cross-application changes.
- For a content-only edit to an existing `slides.js` or `slides-lesson-*.js`, use the fast lesson-edit path: check the changed file's JavaScript syntax, open the affected lesson, and inspect the changed slides plus their immediate neighbours at the normal classroom viewport. Do not run unrelated browser suites.
- Do not run `npm run build:content` for slides-only or flashcards-only edits. The content builder does not read those files.
- Run `npm run build:content` when lesson HTML routes or titles, referenced quiz files, quiz data, or the content-generation script changes.
- Run `npm run test:smoke --workspace=@oehler-huang/library` after a new lesson, a substantial lesson restructure, or changes to lesson navigation, quiz behaviour, handouts, indexes, or shared presentation code.
- Run responsive or regression tests only when the change affects layout behaviour, shared CSS/JavaScript, renderers, images, print/handout output, mobile behaviour, or multiple lessons.
- For UI changes, start with `npm start`, verify `/api/config`, and use the installed in-app Browser against localhost. Run the EconMark public single-answer flow and the 30-student synthetic batch flow.
- Reload the controlled browser tab after source changes before inspecting the DOM or taking screenshots.

## Fast classroom-deck edits

Default to a focused content edit when the user asks to change wording, explanations, questions, answers, teacher notes, lesson pace, or a small number of slides in an existing deck.

- Locate the target slide data with `rg` and read only the target objects, their immediate context, and source passages needed for claims that are actually changing.
- Preserve existing slide types, styling, images, navigation, quizzes, flashcards, and shared files unless the request requires changing them.
- Do not research unchanged facts, review unrelated lessons, create alternate versions, or broaden a content edit into a redesign.
- Make one focused edit pass, run the narrow validation above, and stop when the requested slides render correctly.
- Use broader review only for new lessons, substantial rewrites, shared-component changes, new or replaced images, responsive/print changes, or deployment.

## Deployment safety

- Public DNS remains unchanged until ICP approval and explicit user authorization.
- Production code is release-versioned and read-only to the service account. Persistent data stays outside release directories.
- Never automatically delete uploads or learning records. At the configured disk stop threshold, reject only new uploads.
