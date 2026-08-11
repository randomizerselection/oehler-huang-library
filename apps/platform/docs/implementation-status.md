# Implementation status · 9 August 2026

## Implemented in EconMark 3.0

- One Chinese-first public application rather than separate demo and production products.
- Public no-login use of three original single-answer samples and a complete 30-student synthetic class.
- Open account registration and login with Argon2id password hashing, server sessions, HttpOnly cookies, CSRF and same-origin enforcement.
- Account-owned SQLite metadata and permanent VPS filesystem storage for every successfully marked upload; authenticated image retrieval and no application deletion/expiry endpoint.
- Server-configured file, request, batch, concurrency, per-hour grading and per-account permanent-storage limits; the browser reads these values from `/api/config`.
- Single-answer and class-batch marking for `Analyse [6]` and `Discuss [8]`, with exact evidence, independent review, one-mark adjudication and confidence gates.
- Automated class-batch grading is the root landing workflow and defaults to `full_auto`; teacher review remains an explicit alternative, and automatic decisions carry `decision_source=automatic_policy` with a versioned policy identifier.
- Every completed student row provides a read-only annotated-script viewer with the original image, exact evidence highlights, rubric references, credit values, reasons, improvement priorities and scorer/adjudication status.
- Every disabled batch-run state visibly lists all missing prerequisites; an unconfirmed assignment highlights the required confirmation control, and the interface announces when the batch is ready.
- Coverage-guaranteed student feedback/mark sheets: exactly one per finalized student, automatic post-batch preparation, visible missing-sheet reasons, individual printing, full-class two-up A4 printing and optional one-student-per-A4 printing.
- Provider-neutral role routing for Qwen, Kimi and DeepSeek with credentials kept server-side and provider/model trace metadata in results.
- JSON Schemas for grading, reviews, accounts, sessions, permanent persistence and stored runs.
- DigitalOcean-oriented Nginx, systemd and environment templates.

## Verified

- `npm test`: 61/61 tests pass, including landing-route behavior, visible run-readiness blockers, account ownership isolation, password login, CSRF, immutable image persistence, configurable batch limits, automatic approval, per-student annotation isolation, a 30-slip feedback pack and all registered schemas.
- `npm audit`: zero known package vulnerabilities at implementation time.
- `node --check`: account, HTTP, single-page and batch modules parse successfully.
- HTTP integration test: anonymous grading is rejected; owner registration, grading, history, image access and adjusted mark succeed; another account receives 404 for both result and image.
- Codex in-app Browser regression through the supported local-web-development channel: the root landing page defaults to full automation; the 30-student synthetic class completes 30/30 with zero failures and 30 automatic final decisions; every row exposes an isolated annotated script, including the demonstrated 5/8 one-mark adjudication case.

## Not yet validly claimed

- No live Qwen/Kimi/DeepSeek result is labelled validated until owner-supplied keys and representative scripts are used.
- The planned 50-script grading benchmark, re-mark consistency study, classroom time study and teacher feedback ratings remain human-data tasks.
- PDF-to-image preprocessing is not complete; live provider marking is restricted to JPG, PNG and WEBP.
- DigitalOcean production deployment, DNS/TLS, off-host backups, monitoring and school approval remain deployment-owner actions.
- A final manual desktop/mobile visual pass is still required before submission; automated local UI regression now runs through the Codex in-app Browser's supported local-web-development channel.
- Existing competition DOCX/PDF reports must be regenerated from updated source before submission so screenshots and test counts reflect EconMark 3.0.

Synthetic test results establish contract and workflow integrity only. They must not be presented as evidence of real-student marking accuracy or classroom impact.
