# Homework automation

Platform owns the QQ/IC3 and DingTalk/S3 workflow source, orchestration, tests and
operating instructions. The platform database remains the only student record.

| Profile | Classes | Existing reviewer | Transport |
| --- | --- | --- | --- |
| `dingtalk-submissions` | S3.3, S3.4 | Codex / GPT | Fixed Codex DWS profile |
| `dingtalk-s36` | S3.6 | Kimi Code / DeepSeek and Kimi | Existing npm DWS shim |
| `qq-ic3` | IC3.1, IC3.2, IC3 Investment | Kimi Code | Existing QQ / NapCat |

Model choice, schedules, accounts, recipients and grading rules remain owned by
their existing jobs. This controller makes no model API calls. It consolidates
deterministic operations so the reviewer spends context on evidence and decisions.

DingTalk messages identify **Adam, Samuel's automated teaching assistant**.
Samuel is the teacher; Adam records submissions, sends authorized routine
follow-ups and passes personal requests to Samuel through the existing review
queue. New receipts, working requests, name acknowledgments, reminder campaign
drafts and absence follow-ups carry the same explicit signature. Saved delivery
text and idempotency keys are preserved so this change does not resend messages.
The existing compatibility launchers load these templates directly; no reinstall
or announcement campaign is needed. QQ retains its current identity.

Suggested classroom introduction: “Adam is my automated teaching assistant on
DingTalk. He helps me record homework and send reminders. His messages are signed
with his name. I'm still your teacher; please address personal matters and
teaching questions to me.”

## Run a regular check

Use `python apps/platform/homework/runner.py PROFILE ACTION` from the repository,
or the absolute runner path from any working directory. Use the working Python
runtime already configured for the job. Read [REVIEW.md](REVIEW.md) for decisions.

1. `collect`: preflight (Kimi profiles), acquire the existing run lock, fetch a
   complete inbox, download evidence, cache QQ OCR, and prepare the personal queue.
   Read the returned `packet` and inspect its actual media. It contains the exact
   assignment rules, pending messages, candidate identities, OCR file references,
   and relevant conversation context. Raw output is saved privately, not echoed.
2. Write reviewed homework/name decisions to the packet's specified paths.
   Preserve each profile's existing decision schema. For S3.3/S3.4 also review
   `personalRequests` and write `personal-reply-decisions.json` (an empty list
   when there are no changes). Use the full linked evidence if context is truncated
   or ambiguity remains. Never infer unread evidence.
3. `prepare --run-id ID`: validate the batch and decisions, and generate a plan.
4. `inspect --run-id ID`: read the full plan printed here, including recipients,
   evidence, proposed database writes and available outbound intents.
5. `finish --run-id ID --plan-sha256 SHA`: only after reviewing the printed plan,
   pass its exact SHA. The controller rejects changes to inputs or plan, calls
   the existing transactional commit, and runs receipts, working requests, name
   acknowledgements, QQ grading feedback, the S3.3/S3.4 personal queue, and
   one confirmed acknowledgment for each newly captured reviewed absence reason.

For an **empty** complete fetch, `collect` returns `ready-to-finish`. Review any
personal queue changes, then call `finish --run-id ID` directly. No homework
decision file, model grading, plan, database write or database backup is needed.
Outstanding authorized deliveries still run and can return attention/failure.

Existing scheduled prompts and commands remain compatible. Packet JSON removes
duplicate text aliases; `textFromPendingMessageId` refers to the exact text in
`messages`. QQ/S3.6 `personalRequests` contains new/changed items for this batch,
with `personalSummary.openCount` and the full history at `personalReview`.
Standalone packet recovery without a matching delta shows the full history.
Command responses link `runLog` for complete timings, hashes and per-stage logs;
`inspect` still prints the entire proposed plan.

Never interleave the controller and old manual lifecycle in one run. `collect`
owns `state/run.lock`, which is also recognized by existing Kimi entry points.
Every later controller command requires that run ID. A second operation is
blocked by an exclusive operation lock. A stopped review can be closed with
`abort --run-id ID` after confirming it is no longer being processed. This
preserves all evidence and delivery history; it does not undo a database write.
Do not remove locks or retry an uncertain commit/send to force progress.

`status` reads the current owner. `packet` regenerates a compact view of an
already completed local fetch without a network call, commit or send. It is for
inspection/migration QA, not a substitute for the next scheduled `collect`.

QQ review packets include bounded, exact cached OCR text and conversation groups.
This replaces separate routine transcription reads without replacing image review.
The per-file limit is 24 KB and the total is 96 KB; omitted files are explicitly
flagged and remain linked. Original files and all pending messages are preserved.

If the agent has no direct image tool, use `viewer --run-id ID` with the same
runner/profile prefix. It returns a private loopback URL for the open run, with
all current original images and full-size links on one page. Repeated calls reuse
the same viewer. No server setup, temporary HTML authoring or manual cleanup is
needed. The viewer has no directory listing and serves only allowed media under
the private media directory. It closes when the run ends, evidence changes, or
one hour expires. It is optional and does not send messages or modify decisions.

QQ commit now reads back critical saved values through a fresh database connection
and reports verification counts in the normal finish output. Routine checks use
these counts and the reviewed plan instead of extra SQL or historical log reads.

## Ask absent students why they were away

For an explicit **S3.6 absence + lesson PDF** request, go directly to
[ABSENCE_FOLLOWUPS.md](ABSENCE_FOLLOWUPS.md). This is an implemented campaign,
not a development task or a regular homework check. Its maintained commands
handle preparation, review, authorization, bounded delivery recovery and status.
Do not recreate the module or write a temporary send/recovery driver.

`absence_followups.py` exists in both the `dingtalk-submissions` and `dingtalk-s36`
workflows. It reads `selector_attendance_log`, so it only ever questions students
whose absence was actually marked. Export the lesson PDF first, then run
`prepare`, review the draft plan (recipients, exact English message, lesson date
and PDF hash), set its status to `authorized`, and run `send`. Each recipient gets
one idempotent text question, confirmed before `absence_followups` is written. A
student with no platform identity link and no unique org-directory match stays in
`unreachable` and is never messaged.

The two workflows distribute the lesson PDF differently. S3.3/S3.4 attach a file
card to the student's own message. S3.6 never attaches it: `send` posts the PDF
into the `Economics 5` class group when the group does not already carry it, and
the question tells the student to download it from that group, so a PDF the
teacher already posted is not duplicated.

Replies need no separate step: every complete `fetch.py` scan records a later
reply in the same verified conversation only when it begins with `Absence reason:`
and contains more than an acknowledgment. Other replies remain ordinary messages;
they do not fill `reason_text` or trigger a reason receipt. A later explicit
reason can replace an earlier unacknowledged legacy placeholder, and a verified
manually sent absence prompt can be reconciled to the matching attendance record. Regular
finish sends one idempotent acknowledgment after the reason is reviewed as
routine (`absence_reason` in the S3.6 review). Explicit multi-day date ranges,
clear `until` dates and exact durations are stored as inclusive absence periods.
Any later marked absence whose lesson date falls within that period is listed as
covered and is never asked again, including after the period itself has ended.
Ambiguous dates remain unrecorded rather than being guessed. Pass
`--resolve-uncertain <key> --note <evidence>` only after inspecting the chat and
confirming that nothing was sent; never retry an unresolved delivery blindly.
S3.6 also handles one explicitly retryable `THREADPOOL_BUSY` rejection after a
complete scan of the attempt window in the verified student's conversation;
unclear results remain uncertain. Persisted send tasks are polled without resending.
Never run `prepare` or `send` as part of a regular check.

## Import IC Ketangpai score exports

IC1, IC2 and IC3 Ketangpai score exports can populate the same
`homework_submissions` table used by the selector. The importer targets every
active numbered class in one grade (for example, `IC3.1` and `IC3.2`) and excludes
non-Economics classes such as `IC3 Investment`. A numeric score means submitted;
`未交` means missing. Duplicate Ketangpai accounts for one legal name are combined,
and the highest recorded score is retained. Whole-number percentages also populate
the platform score field; fractional percentages remain in the import evidence
without blocking the submission record. The importer stops if any workbook row or
roster student is unmatched, rather than guessing an identity.

Run a dry check first, with one date per selected assignment in newest-first
column order. Use `--match KETANGPAI_ACCOUNT=STUDENT_ID` for a source row whose
name does not identify the roster student, and `--ignore KETANGPAI_ACCOUNT` only
for a known teacher or non-student row.

```powershell
npm run homework:import:ic --workspace=@oehler-huang/platform -- --file "C:\path\IC3 scores.xls" --grade IC3 --latest 2 --date 2026-09-20 --date 2026-09-13 --match ktp123=STU-0001 --ignore ktp999
```

After reviewing the class totals, create a platform backup and rerun the same
command with `--apply`. Successful imports also register one stable Ketangpai
account per student for later matching. Reimporting the same assignment is safe:
the platform updates the existing class, student, title and date record. This
workflow is only for combined IC grade exports; S3 remains provider-driven and
must not use this importer.

## Source and private data

- `runner.py`: shared lifecycle, leases, reviewed-plan binding and timing records.
- `runtime.py`: source/data separation; reads `.platform-data/homework/runtime.json`.
- `workflows/`: preserved transport-specific processing and validation. They remain
  separate where semantics differ (especially DingTalk scope checks and QQ grades).
- Private runtime: config, assignments, attachments, evidence, ledgers and histories.
  Those files must never be committed or included in a public release.

The private registry maps each profile to `runtimeRoot`. During this migration it
points to the existing `name-lists/automation/PROFILE` directories. Their Python
entry points become compatibility launchers into this repository. Keeping the
same state paths preserves absolute media references, CLI launchers, active QQ
listener access and delivery idempotency. There is **one** live state tree per
profile, not copied state. No runtime data is read from the old Excel workbook.
The transport installation and credential stores stay in their existing homes.

Future relocation of a runtime directory is a separate quiescent operation:
stop its scheduled work/listener, preserve every file, update the private registry,
preserve old absolute paths with a compatibility directory link, verify history,
then resume. Merely copying state and running both copies is unsafe.

## Efficiency and recovery

An empty inbox stops before model review. Review packets contain only pending
evidence and relevant context, with explicit links for longer histories. Contact
lookups are reused within a scan. QQ OCR caches successful transcriptions by image
SHA-256, checks the stored text hash, and invalidates when bytes change. Images
remain the source for assessing handwriting; machine text is never corrected into
invented evidence. Failed OCR is not cached.

QQ and S3.6 retain unresolved evidence across scan windows. Stable message IDs
deduplicate processed multi-assignment records. The existing overlap windows,
pagination checks, working-photo delay, teacher exceptions, receipt keys and
delivery confirmation semantics are preserved.

QQ reads up to three independent contact-history pages concurrently. Results
retain cursor order; any page failure fails collection, and the same complete
scan/overlap checks still apply. No sending is parallelized. OCR indexes the media
manifest once and does not rewrite unchanged transcription files.

QQ OCR has a 25-second HTTP timeout and a 40-second outer process budget. On a
timeout it tries the installed Windows English OCR engine locally (20-second
process budget), without a new cloud model or dependency installation. Actual GIF
content, even when downloaded with a .jpg filename, goes directly to the local
multi-frame decoder. Up to 64 frames are read; larger/unsupported files fail for
review rather than silently sampling. An empty successful result is explicitly
`no-text-found`, with its provider/frame coverage recorded and cached. It does not
classify or accept homework. Both OCR routes failing still stops the run; failed
results are not cached. `--local-only --message-id ID` is a maintenance-only option
to prepare evidence without retrying a failed QQ request.

`student_messages.py` supplies shared deterministic reply templates. Receipts and
working requests use the catalogue's English assignment label/topic and verified
preferred name. A completed working/sentence correction is acknowledged only
when supported by that student's assignment ledger. QQ feedback uses the committed
score denominator and improvement sentence. Confirmed feedback text is not sent
or queried again while its model-answer image is pending. Send intents and each
confirmation are saved before advancing; untracked uncertain sends need attention.
Existing sent histories/keys and previously persisted message text are preserved.

`state/runs/RUN.json` records stage duration, output bytes, counts, status and log
paths. Full stdout/stderr live in `state/runs/RUN/`. These are private audit logs.
`timing` separates elapsed time, scripted stages and time between commands (agent
review, tool round trips, and waits combined; not a direct model-latency measure).
Do not paste entire archives/configs into model context. Failure/attention is not
an empty inbox. Surface authentication issues, incomplete fetches, stale/failed
commits, missing/unreadable evidence, personal requests and uncertain deliveries.
Stay quiet only after a successful complete check with no actionable changes.

`install_compat.py --check` previews compatibility installation. `--apply` backs
up and replaces only supported Python entry points and operating instructions;
it refuses an active workflow lock/process. Config, state, attachments, CLI .cmd
files and the running friend listener are preserved. Its manifest records hashes
and backup locations. `--rollback MANIFEST` restores only unchanged installed
wrappers/instructions, refusing to overwrite intervening edits.

## Tests

Run `npm run test:homework` from the repository. Tests use isolated SQLite files,
synthetic students and mocked transports. They never grade real submissions,
send student messages, or need a signed-in provider. `npm test` covers the main
platform; `npm run test:architecture` verifies private/public release boundaries.
