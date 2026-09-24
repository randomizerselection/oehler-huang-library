# S3.6 absence follow-ups: fast operating path

Use this only when Samuel explicitly requests absence questions and lesson PDFs.
Kimi Code / DeepSeek owns S3.6. Keep its existing profile, transport, runtime and
class scope. Source lives here; the legacy runtime launcher already forwards here.
An operational request is not a request to develop, port or test the workflow.
Do not run homework `collect`, full test suites, broad directory/chat scans,
manual SQL updates, or temporary recovery drivers during this operation.

Distribution rule (21 September 2026): the lesson PDF is **never** attached to a
student's personal message. It is posted into the `Economics 5` class group when
the group does not already carry it, and the question tells the student to
download it from that group. `prepare` resolves the group by exact title, refuses
an ambiguous or missing group, and records the resolved group plus whether the
PDF is already there. `send` re-checks the group immediately before posting and
uploads the PDF into the group only when it is genuinely absent, so a PDF the
teacher already posted is never duplicated.

From the platform repository, set the command path once:

```powershell
$absenceScript = 'apps/platform/homework/workflows/dingtalk-s36/absence_followups.py'
python $absenceScript status
python $absenceScript prepare --date YYYY-MM-DD
```

Use today's Asia/Shanghai date for "today". `status` reads local campaign state
without contacting DingTalk. If a campaign is authorized/partially sent, resume
it with `send` instead of preparing again. An authorized plan cannot be overwritten.
If a different unfinished campaign blocks the request, report it rather than
resetting the plan or its delivery ledger.

`prepare` selects actual absent attendance records, excludes existing follow-ups
and every lesson date already covered by a recorded multi-day absence period,
and resolves only missing identity links through the existing directory adapter.
The lesson ID selects the PDF under `authoring/a-level/outputs/pdf/`; the command
returns the recipients, exact texts, PDF paths/hashes, unreachable/skipped reasons,
and `planSha256`. Read this output once. If the correct PDF already exists, reuse
it; only export a missing/outdated PDF. Never substitute a different lesson.
For lessons other than output gaps the default message names the recorded lesson
without inventing a list of topics covered. Edit the draft only when needed, then
read the exact revised plan and use the digest from `status`.

Review the plan against Samuel's request, then run:

```powershell
python $absenceScript authorize --plan-sha256 SHA_FROM_REVIEWED_PLAN
python $absenceScript send
```

Authorization binds the reviewed draft digest. Samuel's explicit instruction to
send is sufficient authorization for that scope; do not request it again solely
because the command is called `authorize`. Stop on a failed command.

`send` uploads each PDF into the class group once, persists its upload ID before
querying Drive details, then sends one text question per student, confirming each
delivery and recording the platform follow-up. The PDF name and hash are still
recorded on the follow-up as the lesson material the student was pointed to. It
prints progress and a final summary with the group outcome and elapsed time.
Accepted task IDs are queried up to three times, with short waits; they are never
resent. Each delivery has a 120-second recovery budget and each delivery transport
call a 45-second limit.

For an explicitly retryable `THREADPOOL_BUSY` send failure, the helper waits,
reads only the attempt window (at most three pages), and checks the exact verified
conversation, teacher sender ID, timestamp, message text or uploaded file ID.
A landed message is recorded without resending. A complete scan containing the
verified conversation and no matching delivery permits **one** retry with the
same idempotency key. Missing conversations, partial scans, ambiguous cards,
unknown errors, timeouts and old attempts never authorize a resend. Inspection
bounds and matched message IDs are saved in the existing delivery ledger.

On `needs-attention` (exit 2), use the printed reason, each student's text state
and the group post state. If a saved task is awaiting confirmation, a later `send`
queries that task. If delivery is uncertain, inspect the exact recipient's chat
before any manual recovery: for a student, their own conversation; for the group
post, the `Economics 5` group itself. Never infer a PDF delivery from a global
card count, filename alone, greeting, or another student's chat. Only after
verified non-delivery:

```powershell
python $absenceScript --resolve-uncertain EXACT_KEY --note 'Specific inspected conversation, time window and evidence that nothing was delivered'
python $absenceScript send
```

Do not run repeated recovery loops after the bounded helper stops. Report the
remaining recipients and state path. A completed campaign's `send` is a local
status-only no-op, so it cannot repeat the completed messages. Existing responded
rows are preserved when a partially completed campaign resumes.

No separate inbox scan is needed after a successful send. The scheduled complete
fetch captures only explicit `Absence reason:` replies with substantive content
into `absence_followups`; acknowledgments and unlabelled messages remain ordinary
messages. The regular reviewer
marks the captured S3.6 message `absence_reason`; finish then sends and confirms
one idempotent English acknowledgment. Explicit date ranges, clear `until` dates
and exact durations are retained as inclusive periods so covered later lessons
cannot trigger another question. Summarize sent,
unreachable and pending counts; no extra SQL checks or full history dumps unless
the command reports a specific inconsistency. Never send absence campaigns from
a regular homework check.
