# Unified Oehler-Huang Platform specification

Version: 1.0.0  
Canonical repository: `oehler-huang-platform`

## 1. Source ownership

- `apps/library` owns public Economics and Investment lessons, definitions, flashcards, quizzes, assets, templates, and generated content catalogs.
- `apps/platform` owns identity, sessions, EconMark, grading, quiz attempts, teacher reports, privacy operations, and the HTTP server.
- `apps/student-selector` owns the teacher-only selector interface; its accounts, rosters, and history come from the Platform API.
- The former standalone Library and EconMark repositories are preservation sources only. Production and local combined routing must not read them.
- The root `package-lock.json` is the only dependency lock for the npm workspace.

## 2. Routes

| Route | Access | Owner |
|---|---|---|
| `/` | Public | Library landing page |
| `/economics/` | Public | Economics course |
| `/investment-analysis/` | Public | Investment course |
| `/econmark/` | Public shell; student actions authenticated | EconMark student entry |
| `/econmark/teacher` | Teacher | Assignment workspace and quiz gradebook |
| `/econmark/single` | Teacher for real grading; public synthetic sample retained | Single marking |
| `/econmark/batch` | Teacher for real grading; public synthetic sample retained | Batch marking |
| `/selector/` | Teacher | Student Selector |
| `/api/` | Per-endpoint | Shared same-origin API |
| `/platform/account-shell.js` | Public static asset | Shared account custom element |

Legacy `/teacher`, `/student`, `/single`, `/batch`, and `/mark/*` requests return permanent redirects to their `/econmark/*` equivalents.

## 3. Account model

- One username/password account works throughout every application.
- Roles are `student`, `teacher`, and `admin`; the role is inferred from the authenticated account.
- Student self-registration requires one value from `ECONMARK_STUDENT_CLASSES` and stores it as the official `accounts.class_name` cohort.
- Teacher registration requires a single-use administrator invitation. The older static invite-code endpoint remains disabled by default and exists only for controlled migration compatibility.
- Teacher-created classes and memberships are a separate classroom grouping used for assignments and Student Selector. They do not replace the official student cohort.
- Students may edit display name and official class. Teachers and administrators may edit display name. Password changes revoke other sessions.
- Legacy students with a null class may sign in but must complete their profile before a quiz attempt can be stored.

## 4. Shared account interface

- `platform-account` is the only account dialog implementation.
- It uses Shadow DOM to isolate modal, chip, loading, error, profile, password, logout, and role-mismatch styling.
- EconMark mounts it with Chinese-first copy. Library pages mount it with English-first copy and concise Chinese support where present in page chrome.
- A pending protected action resolves after successful login/profile completion. Closing the modal cancels the pending action without clearing quiz answers.
- A student opening teacher-only functionality receives a role explanation and a switch-account action.

## 5. Quiz catalog and grading

- `npm run build:content` generates `apps/library/generated/quiz-bank.json` and `content-manifest.json`.
- Only active Economics and Investment lesson routes are scanned. `_template`, any archive-named directory, `lesson-1-all-types`, temporary files, Android build data, and generated output are excluded.
- The build fails for missing quiz IDs, missing versions, duplicate quiz IDs, missing/duplicate question IDs, unsupported question types, or invalid answer definitions.
- Supported question types are `multipleChoice` and normalized `fillBlank`.
- Browsers submit quiz ID, version, stable attempt ID, and raw answers. Scores supplied by a browser are ignored.
- The server selects the catalog definition and computes score, corrections, accepted answers, and explanations.
- Student retries using the same attempt ID are idempotent only when quiz/version/answers are unchanged. A changed retry returns `409 QUIZ_ATTEMPT_CONFLICT`.
- Teacher and administrator quiz requests return `preview: true, saved: false`; they never create student attempts.

## 6. Quiz API

| Method and path | Role | Contract |
|---|---|---|
| `POST /api/quiz-attempts` | Student; teacher preview | Submit `{attempt_id, quiz_id, quiz_version, answers}` |
| `POST /api/quizzes/:id/attempts` | Compatibility alias | Same server grading rules |
| `GET /api/quiz-attempts/me` | Student | Immutable attempts for the current account only |
| `GET /api/teacher/quiz-attempts` | Teacher/admin | School-wide filtered attempts |
| `GET /api/teacher/quiz-attempts.csv` | Teacher/admin | Same filtered result as UTF-8 CSV |
| `PATCH /api/account/profile` | Authenticated | Update permitted profile fields |

Teacher filters are class, student name/username, course, lesson, quiz, version, start date, end date, and `latest`, `best`, or `all` attempt view.

## 7. Persistence

- SQLite and uploads live below `OH_DATA_DIR`, outside immutable releases.
- Migration 11 adds official account class and immutable quiz-attempt snapshots plus course and lesson identifiers.
- Existing teacher-class memberships remain relational and continue to power assignments and Selector.
- Each attempt stores its official class snapshot so later profile edits do not rewrite history.
- The migration runner creates and verifies a pre-migration SQLite backup for existing databases.
- A compatibility bridge recognizes the former standalone version-5 schema, preserves its accounts and class values, and archives its local attempt table before applying canonical migrations.

## 8. Security

- Session cookies are host-only, `HttpOnly`, `SameSite=Strict`, `Path=/`, and `Secure` on HTTPS.
- All state-changing requests require same-origin validation and CSRF tokens.
- Role checks occur on the server. UI gating is not treated as authorization.
- Registration/login and grading paths are rate limited.
- Student history is filtered by authenticated account ID. Teacher gradebook access requires teacher/admin role.
- Catalog answer data and generated quiz banks are not served as public static files.

## 9. Deployment and release gates

- Deploy one atomic monorepo release using the scripts in `deploy/`.
- Back up SQLite and uploads before migrations and verify the backup.
- `npm run build:content`, `npm test`, and `npm run test:full` must pass.
- Browser regression must cover the public single-answer sample, 30-student synthetic batch, signed-out quiz answer preservation, login-and-resume, student history, teacher preview, gradebook filtering/CSV, notes gating, global logout, desktop, and 390×844 phone layout.
- After activation, verify `/api/config` reports `quiz_catalog_ready: true` and the expected class list/catalog count.
