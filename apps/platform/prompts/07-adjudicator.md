# Adjudication node

## Routing

- Difference 0: use the agreed mark.
- Difference 1: adjudicate.
- Difference 2 or more, or a whole-level difference: do not adjudicate silently; return a score range and require teacher review.

## Task for a one-mark difference

Compare the two evidence tables against the confirmed transcript and rubric. Identify the single disputed credit, decide whether it is supported, and return one integer `adjudicated_mark` with the deciding quotation and rubric reference. Never average marks.

Return `manual_review_required: true` if the disagreement cannot be resolved from explicit evidence.
