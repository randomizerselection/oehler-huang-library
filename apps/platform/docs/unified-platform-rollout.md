# Unified EconMark and lesson-library rollout

## Public routing

- `https://oehlerhuang.com/` serves the public Economics and Investment library.
- `/econmark/` serves EconMark student and teacher tools.
- `/api/` is the same-origin account, grading and quiz-attempt API.
- `/platform/account-shell.js` is the shared Shadow-DOM account control.
- Legacy `/teacher`, `/student`, `/single` and `/batch` routes redirect to
  their `/econmark/` equivalents.

The root monorepo `npm start` command serves the same routing directly from
`apps/library`, `apps/platform`, and `apps/student-selector`. Standalone sibling
repositories are not runtime dependencies.

## Build and validation

From the monorepo root:

1. Run the definition builders in the `@oehler-huang/library` workspace when source definitions changed.
2. Run `npm run build:content`.
3. Run `npm test` for platform, content, and selector contracts.
4. Run `npm run test:full` before deployment for the full Library Playwright suite.

The catalog build fails for a missing or duplicate quiz ID/version, a duplicate
question ID, or an unsupported question type. Do not expose
`assets/data/quiz-catalog.json` as a static file.

## Atomic deployment

1. Stop writes and back up `/var/lib/econmark` as one unit, including
   `econmark.sqlite`, WAL/SHM files if present, and `images/`.
2. Stage one monorepo release containing matching Platform, Library, and Selector workspaces.
3. Build and validate the quiz catalog from the staged library.
4. Switch the single `/opt/oehler-huang-platform/current` release symlink.
5. Restart EconMark, validate Nginx, and reload Nginx.
6. Confirm `/api/config` reports `quiz_catalog_ready: true` and the expected
   class list/catalog size.
7. Run one student login + quiz submission/history smoke test and one teacher
   notes + gradebook/filter/CSV smoke test across both courses.
8. Run the public EconMark sample flow and 30-student synthetic batch flow.
9. Disable new Netlify quiz collection. Keep exports and generated historical
   reports in their archive locations.

Existing accounts are migrated in place. Legacy student accounts may have a
null class and will be prompted once before their first protected action.
Sessions from the previous origin are not portable, so users reauthenticate
once after cutover.

## Rollback

Keep the prior monorepo release. If a smoke test fails, restore the prior
`current` symlink and restart/reload services. Do not restore only the database
unless the current database is damaged: migration 11 preserves account rows
and bridges the former standalone version-5 schema, but attempts created after
cutover must not be silently discarded.
