# Competition evidence log

This is a living checklist. A checked implementation item is not the same as measured classroom evidence.

| Rubric area | Target evidence | Repository evidence | Status |
|---|---|---|---|
| Practicality | Automated image-first class workflow | Root-routed `batch.html`, 30-student synthetic class, exception queue and per-student annotated scripts | Implemented locally |
| Practicality | Evidence-locked provisional marking | `src/invariants.js`, `src/workflow.js`, contracts/tests | Implemented for demo; live model pending Coze build |
| Practicality | 50-script validation | `docs/benchmark-protocol.md`, evaluation runner | Protocol implemented; real benchmark not yet run |
| Practicality | Time saving | Metric calculation and benchmark fields | Not yet measured on real scripts |
| Innovation | Mandatory transcript confirmation | UI gate plus `assertReadyForGrading` | Implemented |
| Innovation | Independent review/adjudication | Separate prompt contracts and workflow branches | Implemented in blueprint/demo |
| Innovation | Exact quote + rubric reference | Evidence schema and invariant | Implemented |
| Innovation | Equivalent bilingual feedback | Stable priority IDs and parity invariant | Implemented |
| Innovation | Personalized retrieval practice | One or two topic-connected questions tied to each answer's missing evidence | Implemented locally; validate teacher usefulness |
| Completeness | No-login public experience | Root landing page runs the full 30-student automatic sample without login | Local complete; public VPS URL pending |
| Completeness | Three one-click examples | Weak, middle, strong original SVG scripts | Implemented |
| Completeness | Failure and recovery states | Scope, upload, gate, provider, review errors | Implemented locally; re-test in Coze |
| Completeness | Export | JSON, CSV, browser Print/Save as PDF, and two-per-page class feedback pack | Implemented locally |
| Completeness | Account continuity | Argon2id login, CSRF-protected sessions, VPS SQLite history, authenticated permanent images | Implemented; HTTP ownership test passes |
| Completeness | Configurable capacity | File, batch, batch-total, concurrency, hourly grading and account-storage limits are server-configured | Implemented in UI and database transaction |
| Completeness | 20 consecutive demo runs | QA log required after published build | Pending |
| Promotion | Reusable rubric workflow | Schemas plus subject adaptation template | Implemented |
| Promotion | Another-teacher handoff | Coze build map and migration guide | Implemented; usability test pending |

Never convert `evals/fixtures/synthetic-smoke.json` results into a performance claim. Add dated screenshots, published URLs, model-shootout results, 20-run QA log, device/network matrix, and anonymized aggregate charts only after those activities occur.
