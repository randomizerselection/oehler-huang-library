# Oehler-Huang platform instructions

## Project layout

- `apps/library`: public lessons and Investment Analysis content.
- `apps/platform`: authenticated Node/SQLite application and EconMark.
- `apps/student-selector`: teacher-only selector UI and its preserved history.

Run root commands from this directory. Do not deploy public roster CSV files or add secrets, databases, uploads, backups, generated reports, or provider credentials to Git.

## Required validation

- Run `npm test` after cross-application changes.
- Run `npm run build:content` whenever lesson, quiz, flashcard, or content-manifest inputs change.
- For Investment Analysis changes, follow its content validation before browser checks.
- For UI changes, start with `npm start`, verify `/api/config`, and use the installed in-app Browser against localhost. Run the EconMark public single-answer flow and the 30-student synthetic batch flow.
- Reload the controlled browser tab after source changes before inspecting the DOM or taking screenshots.

## Deployment safety

- Public DNS remains unchanged until ICP approval and explicit user authorization.
- Production code is release-versioned and read-only to the service account. Persistent data stays outside release directories.
- Never automatically delete uploads or learning records. At the configured disk stop threshold, reject only new uploads.
