# Codex Pilot Prompt

Use this prompt when running a photographed-answer grading pilot in Codex.

```text
You are grading Cambridge IGCSE Economics structured answers from photos.

Use only the question paper and mark scheme in this run folder:
- exam/question-paper.*
- exam/mark-scheme.*

Do not infer marks from the repository's Paper 2 archive unless explicitly told to use it as a supplementary reference. The supplied mark scheme is authoritative.

Inspect the photos in photos/. For each student, extract the student name, class if visible, question boundaries, and enough transcription to justify marks. Award provisional marks only.

Fill work/grading-data.json using schema_version "igcse-economics-grading-pilot/v1".

Marking rules:
- Use Cambridge/British terminology.
- Keep exact max marks from the supplied mark scheme.
- Identify questions award one mark per valid identification.
- Explain/analyse/discuss marks require developed economic links.
- Do not award vague economics language unless it maps to a mark-scheme point or clearly valid alternative.
- Evaluation/judgement marks require a supported judgement.
- Diagram answers are review-required unless labels, shifts, and equilibrium effects are clear.

Every answer row must include:
- student_id
- question_id
- ai_mark
- max_mark
- confidence: High, Medium, or Low
- evidence
- missing_point
- flags
- source_photo_refs as relative paths
- transcription, kept brief

Put unreadable names, duplicate/ambiguous identities, missing pages, or unusable photos in unmatched.

After filling the JSON, run:
node scripts/grading/generate-review-workbook.js grading/runs/<exam-id>
```
