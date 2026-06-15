# IGCSE Economics Structured-Answer Grading Pilot

This folder defines the Codex-run pilot workflow for grading photographed handwritten Cambridge IGCSE Economics structured answers.

The pilot is review-first: AI/Codex marks are provisional until a teacher reviews them in the workbook. Do not treat raw AI marks as final scores.

## Run Folder

Create one run folder per exam:

```text
grading/runs/<exam-id>/
  exam/
    question-paper.*
    mark-scheme.*
  photos/
    <student or page photos>
  work/
    grading-data.json
  outputs/
    <generated review workbook>
```

Use `node scripts/grading/create-grading-run.js <exam-id>` to create the folders and starter `work/grading-data.json`.

The generated `grading/runs/` folders are local working data and are ignored by git.

## Required Inputs

Each run must include:

- `exam/question-paper.*`
- `exam/mark-scheme.*`
- photos under `photos/`
- a filled `work/grading-data.json`

Do not infer a live exam mark scheme from the repository's Paper 2 archive unless explicitly asked. The mark scheme supplied in the run folder is authoritative.

## Photo Expectations

For the best Codex-run pilot results:

- Photograph one student answer sheet at a time, flat and well lit.
- Keep the student name/class and all question numbers visible.
- Avoid cutting off margins, diagrams, labels, or the bottom of the page.
- If one answer spans multiple photos, keep filenames in page order.
- Use filenames that help grouping, even though Codex will still read names from the photo.

## Codex Workflow

For each pilot run, Codex should:

1. Read the question paper and mark scheme from `exam/`.
2. Convert the mark scheme into `rubric` entries in `work/grading-data.json`.
3. Inspect the photos, extract student name/class/page/question boundaries, and transcribe only enough answer text to justify marks.
4. Award provisional marks against the supplied mark scheme.
5. Record evidence, missing points, confidence, flags, and source photo references for every student-question row.
6. Put unreadable names, duplicate identities, missing pages, or severe ambiguity in `unmatched`.
7. Run `node scripts/grading/generate-review-workbook.js grading/runs/<exam-id>` to create the Excel review workbook.

## Marking Rules

- Use Cambridge/British terminology and the exact marks from the supplied mark scheme.
- Award identify marks as one mark per valid identification.
- Award explain/analyse/discuss marks only when the answer develops a valid economic link.
- Do not award vague economics language unless it maps to a mark-scheme point or a clearly valid alternative.
- Do not award evaluation or judgement marks for unsupported assertions.
- Treat diagram questions as review-required unless the photo clearly shows the correct labels, curve shift, and equilibrium effect.

## Workbook Review

The workbook has these sheets:

- `Review Dashboard`: run totals, pending review count, low-confidence count, question weakness summary.
- `Student Scores`: provisional totals, review status, teacher final totals.
- `Question Detail`: one row per student-question, with AI mark, evidence, confidence, flags, source photos, teacher review status, override, and final mark formula.
- `Rubric`: the structured mark scheme used for the run.
- `Unmatched`: unreadable names, ambiguous identity, missing pages, or other intake issues.
- `Audit`: run metadata, validation issues, assumptions, and limitations.

Final marks appear only when a question row is marked `Approved` or `Adjusted`. Until then, teacher final totals stay blank or pending.

## Pilot Acceptance Check

Before grading a full class, run 3-5 representative students first:

- one clear script
- one weak or short answer
- one ambiguous name
- one diagram answer, if the exam includes a diagram

The pilot is acceptable when every row has a source photo reference, every low-confidence or identity issue is flagged, and no final score appears before teacher review.
