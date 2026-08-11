# Optional Coze adapter map

EconMark 3.0 does not require Coze. The custom VPS application is the competition runtime and source of truth. `coze/workflow-blueprint.json` remains a platform-neutral behavioral reference for a future Coze adapter; it is not a claim that Coze can import the JSON directly or reproduce account storage and permanent audit semantics without additional services.

## Build order

1. Create `EconMark_Main_v1` and define every start variable listed in the blueprint. Use strings for version identifiers and JSON/object variables for images, transcript, rubric, evidence, feedback, and review.
2. Add the scope condition before any model call. Accept only `Analyse/6` and `Discuss/8`.
3. Add image validation and transcription as separate vision nodes. Paste the shared guardrails before the node-specific prompts. Do not let transcription flow directly into grading.
4. Implement transcript confirmation in the conversation/UI layer. Store both draft and confirmed text, increment `transcript_version`, and pass only the confirmed object forward.
5. Parse the teacher-supplied question and mark scheme into `parsed-rubric.schema.json`. Display command word, total, method, levels, and caps for confirmation.
6. Fork after the evidence invariant: one branch to the primary scorer and one to the independent reviewer. The reviewer must not receive the primary mark or rationale.
7. Route scorer differences: zero to confidence; one to adjudication; two or more or a whole-level difference to an explicit range/manual-review state.
8. Generate English feedback only after the mark is fixed, including one or two short questions that practice the specific missing evidence on the current essay topic, then translate it. Verify both the `priority_id` arrays and the follow-up question `question_id`/`target_priority_id` pairs are identical across languages.
9. Assemble `grading-output.schema.json` with `final_mark = null`.
10. Present `Approve`, `Adjust`, and `Reject`. An adjustment must supply an in-range integer and an override reason. Only this action may populate a final mark.
11. Public synthetic samples terminate without a database write. Real uploads require an EconMark account and are permanently stored by the VPS application, not by the Coze adapter.

## Coze variable mapping

| Repository field | Workflow variable | Rule |
|---|---|---|
| `schema_version` | `schema_version` | Constant `econmark/4.0.0` |
| `prompt_version` | `prompt_version` | Constant `econmark-prompts/3.0.0` |
| `workflow_version` | `workflow_version` | Constant `econmark-workflow/3.0.0` |
| `student_ref` | `student_ref` | Pseudonym only; reject obvious names/classes in public mode |
| `answer_images` | `answer_images` | Ordered array; permanent source objects remain in the authenticated EconMark account |
| `confirmed_transcript` | `confirmed_transcript` | Never overwrite the draft; version it |
| `parsed_rubric` | `parsed_rubric` | Must be teacher-confirmed |
| `evidence` | `evidence` | Exact quote plus rubric reference for every candidate |
| targeted questions | `follow_up_questions_en`, `follow_up_questions_zh` | One or two per student; IDs, weakness targets, and order must match across languages |
| scorer marks | `primary_mark`, `reviewer_mark`, `adjudicated_mark` | Reviewer isolated until comparison |
| `final_mark` | `final_mark` | Null until teacher decision |

## Model shootout

Do not select models by reputation. On a fixed 10-case development subset, compare available Coze-native vision models for transcription accuracy and available reasoning models for exact agreement, within-one agreement, evidence faithfulness, schema success, latency, and cost. Record the date, visible model name/version, settings, and every failure. Use different primary and reviewer models only when both independently pass the evidence tests; diversity without quality is not a benefit.

## Public bot configuration

- Open without login for original synthetic samples; real upload remains an authenticated EconMark VPS capability.
- Put three sample cards before the upload control.
- Store no synthetic public messages, files, transcripts, outputs, analytics payloads containing answer text, or generated reports after the session.
- Do not put official Cambridge questions or mark schemes in a public knowledge base.
- Test the published link on school Wi-Fi, mobile data, one phone, and one desktop, signed out of the builder account.

## Production stop conditions

Stop and show a recovery message for unreadable/cropped images, unclear multiple answers, multiple students, diagram-dependent answers, missing rubric, conflicting totals, unconfirmed transcript/rubric, schema failure, evidence mismatch, translation priority mismatch, or scorer disagreement requiring manual review. A failure state is a product outcome, not something to hide with a plausible mark.

## Thirty-answer weekend batches

Use this workflow as a single-answer service and let `batch.html` orchestrate the server-configured number of concurrent calls. Never place the entire class into one prompt or workflow context. The request, response, authentication, and failure contract is specified in `docs/batch-provider-contract.md`.
