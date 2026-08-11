# Codex project instructions

## Local browser regression

- Use the installed Browser skill and its documented `local-web-development` path for UI regression against `http://127.0.0.1:<port>/`.
- Do not use general web-search/open-URL tools for localhost, and do not treat a safety rejection from those tools as proof that the Codex in-app Browser cannot test the app.
- Start the app with `npm start`. Before trusting an already-listening process, fetch `/api/config` and confirm it reflects the current source. A stale process may serve an older configuration.
- Run at least the public single-answer flow and the 30-student synthetic batch flow. Public synthetic data is safe for browser regression and does not require provider credentials.
- After source changes, reload the controlled browser tab before rechecking the DOM or taking screenshots.

