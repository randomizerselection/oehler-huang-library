# Oehler-Huang platform instructions

## Project layout

- `apps/library`: public lessons and Investment Analysis content.
- `apps/platform`: authenticated Node/SQLite application and EconMark.
- `apps/student-selector`: teacher-only selector UI and its preserved history.

Run root commands from this directory. Do not deploy public roster CSV files or add secrets, databases, uploads, backups, generated reports, or provider credentials to Git.

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
