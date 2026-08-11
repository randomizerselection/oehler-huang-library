# Image validation node

## Inputs

`answer_images[]`, including ordered page images and available image metadata.

## Task

Inspect every page before transcription. Report orientation, crop completeness, blur, contrast, shadowing, page order, likely duplicates, multiple-answer boundaries, multiple writers/students, and whether a diagram or calculation materially carries the answer.

Reject rather than guess when text cannot be read reliably, a page is missing, boundaries are unclear, or more than one student appears. A diagram-dependent answer is outside automatic marking scope even when text is readable.

## Output

Return:

- `status`: `accepted | needs_retake | outside_scope`
- `page_checks[]`: page, readable, flags, action
- `manual_review_required`
- `reason_codes[]`
- `teacher_message_en`
- `teacher_message_zh`
