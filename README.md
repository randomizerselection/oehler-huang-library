# Oehler-Huang Learning Platform

This private local monorepo consolidates the Oehler-Huang Library, Investment Analysis, EconMark, and Random Student Selector.

## Local setup

1. Copy `.env.example` to `.env` and adjust local values if needed.
2. Run `npm install`.
3. Run `npm run build:content`.
4. Bootstrap the first administrator with `npm run admin:create --workspace=@oehler-huang/platform -- --username admin --display-name "Platform Administrator"`.
5. Start the application with `npm start` and open `http://127.0.0.1:4173/`.

The Library is public. Accounts, class rosters, learning records, Student Selector, and EconMark history are served by the same-origin platform API.

## Important routes

- `/` public Library
- `/investment-analysis/` Investment Analysis
- `/selector/` teacher-only Student Selector
- `/econmark/` EconMark student entry
- `/econmark/teacher` EconMark teacher workspace and quiz gradebook
- `/api/` platform API

This monorepo is the only active source of truth. Superseded standalone sources and generated artifacts are preserved outside the repository under `C:\Users\oehle\Documents\oehler-huang-legacy-sources`; they are not runtime dependencies.

The canonical cross-application contract is
[`apps/platform/spec/UNIFIED-PLATFORM-SPEC.md`](apps/platform/spec/UNIFIED-PLATFORM-SPEC.md);
deployment and rollback steps are in
[`apps/platform/docs/unified-platform-rollout.md`](apps/platform/docs/unified-platform-rollout.md).
The ownership, generated-file, and archive boundaries are documented in
[`docs/REPOSITORY-STRUCTURE.md`](docs/REPOSITORY-STRUCTURE.md).
