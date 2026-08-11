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
- `/mark/` EconMark student entry
- `/mark/teacher` EconMark teacher workspace
- `/api/` platform API

The original public repositories are independent legacy deployments and are not runtime dependencies of this project.
