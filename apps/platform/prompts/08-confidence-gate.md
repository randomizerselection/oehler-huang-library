# Confidence gate

Compute confidence from evidence, not tone.

Inputs include transcription confidence, rubric parser confidence, teacher confirmations, scorer agreement, evidence coverage, validation flags, and answer structure.

Set `low` and require manual review if any hard trigger is present: unconfirmed input; missing/ambiguous rubric information; material illegible span; diagram-dependent reasoning; multiple unclear answers; scorer gap of at least two; whole-level disagreement; or failed evidence invariant.

Set `medium` for a one-mark adjudicated difference, minor uncertain text outside credited evidence, or limited evidence coverage. Set `high` only when both inputs are confirmed, all credited excerpts validate, scorer marks agree, and no scope flag is present.

Return `confidence`, `confidence_reasons[]`, and `manual_review_required`.
