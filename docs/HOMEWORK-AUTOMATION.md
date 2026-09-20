# QQ and DingTalk homework consolidation — 19 September 2026

The implementation is now in [apps/platform/homework](../apps/platform/homework/README.md).
The existing `name-lists/automation` Python entry points forward into this source.
There is one live state tree per profile, registered privately in
`.platform-data/homework/runtime.json`. No student records or delivery histories
were copied, reset or reimported.

## Operational changes

- A common staged controller handles collection, evidence preparation, compact
  review packets, exact-plan inspection, commit and verified delivery. Models
  continue to review evidence/grade; routine control flow is Python.
- Empty complete inbox checks skip homework review, plans, database writes and
  backups, while still processing outstanding authorized deliveries.
- Successful QQ OCR is cached by image-content hash with text integrity checks.
  Repeated unchanged images incur no new OCR call. Changed image bytes invalidate
  the cache. Images remain necessary for handwriting assessment.
- Fetch output reports counts and evidence paths instead of echoing the pending
  messages a second time. Successful contact lookups are reused within one scan.
- QQ and S3.6 now retain unresolved evidence beyond the overlap window and
  recognize processed multi-assignment message IDs consistently.
- Shared run records contain stage time, output size, counts and private log paths.
  Locks, input hashes and plan hashes prevent overlapping or stale controller work.

The active Codex hourly heartbeat now invokes the shared controller for S3.3/S3.4.
Its frequency, task, models and notification intent are preserved. Kimi's existing
QQ and S3.6 job records were not edited: their old paths now invoke the canonical
code, and their referenced README directs regular checks to the shared controller.
Their native scheduling/model routing remains in Kimi Code. Thus the controller
is available to all three profiles without replacing the existing schedulers.

## Preserved behavior

Existing transport executables, accounts, class/model boundaries, assignment
catalogs, evidence review, teacher exceptions, grading/feedback rules, database
transactions, working-photo delay, receipt keys, uncertain-send handling, personal
queues and absence-response capture are preserved. Regular checks still exclude
missing-work campaigns and unsolicited personal replies.

Runtime data, attachments and transport installations remain at their existing
physical locations for compatibility, including the running QQ friend listener.
Moving those live directories is intentionally separate from moving source. Old
absolute media paths and idempotency histories continue to resolve unchanged.

## Validation and measured limits

All 304 original regression tests passed before migration. The migrated suites
cover 62 S3.3/S3.4, 103 S3.6 and 142 QQ cases; the new controller/compatibility
suite contains 24 tests, including a real-adapter synthetic collect/review/commit/
receipt cycle followed by a duplicate-free second run. All use fixture databases
and mocked student transports. The platform `npm test`, architecture checks and
private-release boundary test passed. No real student grading or messaging was
triggered for maintenance verification.

Seventeen config/catalog/delivery-history fingerprints matched across the 45-file
compatibility cutover. All three legacy import paths resolved to the canonical
source, their runtime roots stayed the same, and the QQ listener reported healthy.

On saved inbox snapshots, the S3.3/S3.4 review packet was 31,257 bytes versus an
895,295-byte raw inbox; S3.6 was 22,516 versus 187,639. These are payload-size
measurements, **not measured model-token or latency savings**. The latter depend
on the next real runs, the evidence requiring review and provider response time.
Stage timings are now available to diagnose that cost without loading raw history.

## Further optimizations and student replies — 19 September

The existing scheduled prompts, profile names and lifecycle commands work without
changes. The additional improvements are:

- Compact UTF-8 review packets and command responses remove duplicate text aliases
  and internal fingerprints from model context. Exact plans remain fully visible
  at inspection; original evidence and full run logs are retained.
- QQ/S3.6 personal-request packets contain the current batch's new/changed items,
  including closures. Open counts and full-history links remain visible. Recovery
  without a matching batch delta falls back to the complete report.
- QQ prefetches at most three independent contact-history pages. Results preserve
  cursor order, every scan refreshes contacts, and any failed read fails collection.
  Sending stays sequential. OCR/media indexing avoids repeated manifest reads and
  unchanged transcription rewrites.
- Shared reply templates use verified preferred names, assignment labels/topics,
  and the student's recorded completion history. Name acknowledgments address the
  saved English name. Working/sentence requests acknowledge what was received;
  completion replies recognize the specific correction when the ledger supports it.
- QQ feedback uses the database's saved score denominator and improvement sentence.
  Text and image delivery progress are saved separately before proceeding. A pending
  model-answer image does not trigger another send/query of confirmed feedback text;
  untracked uncertain sends are surfaced rather than retried.
- Assignment metadata is cached within each helper process, with file-change
  invalidation; identity and saved-result validation remain fresh before delivery.

Offline measurements against the pre-change runner on copied inbox snapshots:

| Measurement | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| S3.3/S3.4 packet, same evidence (5 pending) | 27,271 B | 18,017 B | 33.9% |
| S3.6 packet, same evidence (2 pending) | 22,552 B | 18,234 B | 19.1% |
| S3.6 packet, unchanged personal-request history | 22,552 B | 8,484 B | 62.4% |
| QQ packet, same evidence (empty inbox) | 5,906 B | 5,384 B | 8.8% |
| QQ packet, unchanged personal-request history | 5,906 B | 4,503 B | 23.8% |
| Synthetic successful finish response | 2,894 B | 737 B | 74.5% |
| Synthetic QQ history reads, median of 5 | 0.3641 s | 0.1229 s | 66.2% |

The history benchmark uses 12 independent 30 ms mock reads. It measures bounded
I/O concurrency, not live NapCat latency or an entire homework run. Byte reductions
are not token counts. Personal-request reductions model a repeat check with no new
or changed requests; first-time/changed requests remain in the packet. QQ snapshot
measurements do not represent an image-heavy grading batch.

A provisional expectation is an **additional 10–25% reduction in total run tokens
and 5–20% in elapsed time**, compared with the first consolidated runner. These are
estimates, not live measured savings or additions to earlier percentage estimates.
Actual gains can be lower when retained session context, image review or provider
reasoning dominates. QQ benefits most from overlapping independent history reads;
S3.6 benefits most from avoiding unchanged personal-history context. No extra LLM
call is used to personalize replies. Session-scoped scheduling/expiry is unchanged.

Reproduce the offline measurements using `apps/platform/homework/benchmark.py`.
The saved baseline, aggregate results and validation logs are under private
`.platform-data/homework/optimization-20260919/`. No live student messages are sent
by the benchmarks or regression tests.

Validation: 343 unique homework tests passed (33 controller/compatibility, 62
S3.3/S3.4, 103 S3.6, 145 QQ), including snapshot preservation, listener failure
visibility, bounded ordered reads, partial delivery recovery and saved-grade
personalization. `npm test` passed, including architecture/public boundaries and
the 13 student-selector browser tests. Compatibility preview reports zero
launchers requiring changes. Real-state guards passed for both Kimi workflows.

## First live-run findings and OCR repair — 19 September evening

S3.6 run `run-efcd7642d6a04cafb9f33fc8540bfcc1` completed three Homework 2
records and three confirmed receipts. Its actual elapsed time was 302.653 seconds,
of which 40.670 seconds were scripted stages. The other 261.983 seconds (86.6%)
were between commands: evidence review, model/tool round trips and waits together.
They cannot be attributed entirely to model inference. New run records expose
this breakdown under `timing` without requiring manual log arithmetic.

QQ run `run-5fc7ede629cb4c46a5b3d4e8bc102d3c` failed after 244.469 seconds;
240.336 seconds were the OCR subprocess wait. The downloaded file was a 105x85,
32-frame animated GIF saved with a .jpg suffix. Inspection showed a cartoon
sticker, not an essay. No homework record or grade was produced by that failed run.
The earlier agent's claim that this image established a pending essay was not
supported by inspection.

GIFs now go directly to on-device Windows OCR, with all frames rendered by the
Windows image decoder before recognition. For other images, QQ OCR has a
25-second HTTP timeout/40-second outer budget, followed by one local attempt
(20-second budget) only for timeouts. Authentication/malformed-result failures do
not silently fall back. No service, account, dependency or scheduler was changed.
The native fallback was verified against a synthetic GIF whose first frame is
blank and second frame contains text. The blocked sticker took 2.403 seconds to
decode/recognize all frames with the final implementation; its explicit empty
transcription/provenance is cached. This is about 99% less OCR-stage time for that
file, not a measured whole-run saving. Classification still belongs to review.
Unreadable answers remain pending; blank OCR never supplies invented essay text.

The reported QQ usage was 7,213 uncached input, 3,798 output and 2,541,184 cached
input tokens across six usage records: 99.6% of reported tokens were cache reads,
averaging about 424,000 cached tokens per record. Those figures are not a billing
statement. They show that reducing packets alone cannot substantiate the earlier
10–25% total-token estimate for this long-lived session. That estimate is withdrawn
for this workload; actual total-token savings remain unmeasured. Reducing retained
session history requires changes to Kimi session execution/compaction beyond this
runner and has not been applied automatically.

Post-repair validation: 351 unique homework tests passed (36 controller/native
OCR, 62 S3.3/S3.4, 103 S3.6, 150 QQ), plus architecture/public-boundary tests.
Only OCR evidence/cache for the affected message was prepared during maintenance;
no homework decisions, database updates, or student messages were produced.

## QQ review round-trip reduction - 20 September

The successful morning QQ run reported 32 usage records and 413.2 seconds elapsed,
with 14.3 scripted seconds. This motivates fewer agent/tool interactions rather
than further reductions to already-fast fetch/OCR stages. The 398.9 seconds between
commands also includes provider delays and waits, not just image inspection.

QQ packets now include conversation groups and exact cached OCR text, keyed by
the original transcription path. Text is included once per file, up to 24 KB per
file and 96 KB overall. Omitted/unavailable files are explicitly flagged; their
paths remain available. No messages are filtered or automatically classified.

`runner.py PROFILE viewer --run-id ID` provides an optional maintained browser
viewer when a direct image tool is unavailable. It starts one reusable loopback
server for the open run, shows original images with full-size links, preserves
GIF animation despite misleading filename extensions, and closes after run/batch/
packet changes or one hour. It serves only allowed image files from the private
media directory, escapes labels, and disables active content/external resources.
It does not record an image as inspected or decide whether work is acceptable.

QQ commit reads back critical persisted homework/grade/name/identity values using
a fresh database connection. Its verified counts reach normal finish summaries;
verification failure stops before delivery and must not trigger a blind retry.
REVIEW.md now directs the reviewer to use these results instead of routine SQL
probes, use included OCR without rereading files, group evidence review, and execute
prepare/inspect together when possible while retaining the separate plan-review
boundary before finish. No scheduled prompt, model, account or live state was reset.

These changes remove separate reads for included OCR files, ad-hoc viewer building
and cleanup, and routine post-run SQL/log inspection. They do not guarantee a fixed
turn count: actual photos, ambiguity, provider latency and agent behavior vary.
Whole-run token/time gains require a comparable successful scheduled run; no new
measured percentage is claimed. Inline text slightly increases packet bytes in
exchange for removing separate read requests and their repeated session context.

Validation: all 360 homework tests passed (44 controller, 62 S3.3/S3.4, 103 S3.6,
151 QQ), including bounded/omitted OCR, original-media bytes, path/HTML isolation,
viewer reuse and run-end shutdown, and deliberately corrupted grade readback.
Architecture and private-release checks passed. A synthetic essay was inspected
in the in-app browser at the gallery and original-image URLs; the server stopped
after the fixture run closed. No real grading, database write or send was run.

## Rollback

Private cutover manifest:
`.platform-data/homework/migrations/cbc23126c54940c1ad593e5de4cf8d07/manifest.json`.
It contains exact original script/instruction backups and before/after hashes.
The same directory holds `codex-automation-before.toml` for restoring the prior
heartbeat prompt through Codex's automation tool if required.

`python apps/platform/homework/install_compat.py --rollback <manifest>` restores
unchanged installed launchers/instructions after verifying idle workflows. It
does not reset records, state, message histories, credentials or the database.
Restore the scheduler prompt separately if rolling back its entry point too.
