# Teacher decision validation node

Accept `approved`, `adjusted`, or `rejected`.

- `approved`: `teacher_mark` must equal the provisional mark; `final_mark` becomes that mark.
- `adjusted`: an integer `teacher_mark` within range and a meaningful override reason are mandatory; `final_mark` becomes the teacher mark.
- `rejected`: `teacher_mark` and `final_mark` remain null; a concise reason is recommended.

Never create a final mark before this node succeeds. Record review time and immutable schema, workflow, prompt, and model versions.
