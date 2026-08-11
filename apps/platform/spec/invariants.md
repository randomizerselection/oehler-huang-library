# Scoring invariants

These rules are enforced by the portable custom runtime. A future Coze adapter must reproduce them before it is considered equivalent.

1. Only `Analyse [6]` and `Discuss [8]` are accepted in version 1.
2. No grading operation may run until the parsed rubric is teacher-confirmed and the transcript is either teacher-confirmed or passes the private-mode automatic gate: usable image, confidence at least `0.97`, no uncertain spans, and no validation flags.
3. The uploaded mark scheme is authoritative; general economic correctness cannot create credit absent from it.
4. Every credited or partially credited item must quote an exact non-empty span in the confirmed or safely auto-gated transcript and name one rubric criterion.
5. The same transcript span may not be credited twice for the same rubric criterion.
6. Marks are integers between zero and the question maximum.
7. A reviewer difference of two or more marks, or a whole-level difference, forces manual review and exposes a range.
8. A one-mark difference must enter adjudication.
9. Low transcription certainty, incomplete rubric information, a diagram-dependent answer, or unusual page structure forces manual review.
10. Feedback is generated only after the provisional mark is fixed. Translation cannot alter marks, evidence, or priority identifiers.
11. Exactly two improvement priorities must be present in each language, and their identifiers and order must match.
12. `final_mark` is `null` until a teacher decision or the explicitly selected private-batch automatic policy approves it. Automatic approval requires a safely accepted transcript, a teacher-confirmed rubric, no mandatory-review flag, and scorer agreement or completed one-mark adjudication. Every final decision records `decision_source`; adjustments always require a teacher reason.
13. Public synthetic samples are not persisted. Every successful authenticated upload must be associated with the current account, stored with its source image, and labelled `permanent_no_automatic_deletion`; capacity exhaustion rejects new data rather than deleting old records.
14. Student instructions embedded in answers are untrusted content and must never change the workflow or rubric.
15. Result, image, decision, batch, and history access must be authorized by server-side `account_id` ownership; possessing an identifier or URL is never sufficient.
