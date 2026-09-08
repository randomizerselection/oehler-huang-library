# Repository structure and consolidation boundary

`oehler-huang-platform` is the only active source repository for the public lesson library, Investment Analysis, EconMark, and Student Selector.

See [Architecture and ownership](ARCHITECTURE.md) for dependency direction,
enforced contracts, content lifecycle and the current release boundary.

## Active source

| Path | Responsibility |
|---|---|
| `apps/library` | Public landing, Economics and Investment lessons, definitions, flashcards, quiz definitions, and content generators |
| `apps/platform` | Shared accounts, sessions, API, EconMark, quiz grading and history, teacher tools, persistence, and the combined HTTP server |
| `apps/student-selector` | Teacher-only selector interface using the shared Platform API and account shell |
| `packages/contracts` | Shared content validation and HTTP/release public-file policy; no app dependencies |
| `deploy` | The single production service, Nginx, publishing, rollback, and environment configuration set |
| `docs` | Cross-application repository and operating documentation |
| `authoring` | Non-public Investment and A-level planning, preferences, source checks, classroom exports and retained PowerPoint references |

The root `package.json` defines the npm workspaces. The root `package-lock.json` is the only dependency lockfile. `npm start` always starts the combined same-origin application; no sibling repository is read at runtime.

## Canonical shared interfaces

- `apps/platform/src/platform-account-shell.js` is the only account UI implementation.
- `/api/` is the only browser API namespace.
- `/platform/account-shell.js` is the public shared account-shell asset.
- `apps/library/generated/quiz-bank.json` is the generated, versioned input to server-side quiz grading.
- `apps/platform/spec/UNIFIED-PLATFORM-SPEC.md` is the cross-application functional and security contract.
- `deploy/nginx-oehler-huang-platform.conf` is the canonical proxy and legacy-redirect configuration.

## Generated and preserved material

The following are intentionally excluded from source control: runtime SQLite and uploads, test output, browser screenshots, extracted textbook caches, generated homework reports, release archives, and logs.

Material removed from the active tree during consolidation is preserved at:

```text
C:\Users\oehle\Documents\oehler-huang-legacy-sources\
  essay-grader\                 former standalone EconMark tree
  oehler-huang-library\         former standalone lesson-library tree
  generated-artifacts\
    library-reports\            generated homework reports
    library-tmp\                screenshots and extracted textbook caches
```

These paths are preservation records only. Changes made there do not affect local development or production.

## Course authoring consolidation (7 September 2026)

The HTML lessons linked from the Investment and A-level landing pages are now
maintained directly in this repository. `authoring/README.md` maps their source,
planning and export paths. No maintained HTML source remains in a sibling project.
The original `investment-course` and `a-level` folders are deprecated recovery
copies, not authoring or build inputs.

Textbooks and previous lesson reference material are preserved under
`C:\Users\oehle\Documents\oehler-huang-legacy-sources\course-reference-archive`.
They are optional research sources, not runtime or lesson-build dependencies.
The top-level `authoring/` directory is outside the HTTP static roots and the
deployment archive's explicit inputs. Keep future private course material there.

Course landing pages determine active status. Unlinked lessons and unused lesson
types, including the old Investment `unit-1/` and `_template/` system, are legacy.
Their continued presence preserves references and historical URLs; it does not
make them templates for future lessons.

## Intentional archives inside the Library

Archived Business pages and archive-named Investment lesson folders remain in `apps/library` to preserve historical URLs and source context. Content generation reads the course landing pages instead of recursively collecting HTML, so unlinked material is not treated as active lessons or quizzes. Exact `archive/` directories are private reference material. Removing historical URLs is a separate content-retention decision.

## Required verification

Run from the repository root:

```powershell
npm run build:content
npm run check
npm test
npm run test:library
npm start
```

After startup, verify `/api/config` comes from the current source, then complete the public single-answer and 30-student synthetic batch browser flows. The detailed functional, security, migration, and browser requirements remain in the unified platform specification and rollout guide.
