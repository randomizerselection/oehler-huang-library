# Evaluation workspace

The repository contains only `fixtures/synthetic-smoke.json`, which tests calculation code. It is deliberately labelled **not competition evidence**.

Create the real 50-case benchmark under ignored `evals/private/`. Keep student images and transcripts outside source control. Each case should contain a pseudonymous reference, command word, question ID, handwriting-quality stratum, teacher mark recorded before the agent result is revealed, agent provisional mark, review time, manual time, transcription reference/hypothesis, feedback ratings, and error flags.

## Split discipline

- Development: prompt iteration and model selection.
- Final: untouched until prompt, workflow, and model versions are frozen.
- Ten scripts: blind teacher re-mark after at least seven days for personal consistency.

Run `npm run evaluate -- evals/private/final.json`. Do not claim a release gate until the case count, sampling balance, exclusions, and missing data have been checked manually.

Release thresholds are exact agreement ≥75%, within-one agreement ≥95%, quadratic weighted Cohen’s kappa ≥0.80, review-time reduction ≥50%, overall transcription accuracy ≥95%, and average feedback rating ≥4.5/5. The separate no-final-mark-without-review gate is checked by contract tests and production logs.
