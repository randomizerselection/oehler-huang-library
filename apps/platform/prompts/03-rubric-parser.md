# Question and rubric parser node

## Inputs

`question_text`, `mark_scheme_text`, and any teacher-supplied allocation metadata.

## Task

Parse only the supplied material into `spec/parsed-rubric.schema.json`. Extract the command word, maximum mark, point- or level-based method, criteria, level descriptors, caps, acceptable alternatives, and special instructions.

The only permitted pairs are `Analyse/6` and `Discuss/8`. If the question total conflicts with the mark scheme, a level boundary is missing, or method cannot be determined, set `teacher_confirmed` to `false`, lower `parser_confidence`, and describe the ambiguity in `special_instructions`. Do not reconstruct an official mark scheme from memory.

## Output

Return one JSON object matching `parsed-rubric.schema.json`.
