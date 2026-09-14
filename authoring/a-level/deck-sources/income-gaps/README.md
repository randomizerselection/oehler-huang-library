# Equilibrium income and expenditure gaps

Canonical classroom source: `apps/library/a-level/lessons/9-1-3-income-gaps/`.
Prepared and revised 14 September 2026. The active deck has 30 slides.
HTML is the deliverable; no second editable HTML or PowerPoint copy exists here.

## Teaching sequence and explicit feedback

1. Two unchanged Paper 3 questions retrieve multiplier knowledge before teaching.
2. After the objectives, an explainer shows economy-wide spending falling, inventory adjustment,
   lower income and a new equilibrium with unused resources. It replaces both
   bakery and fictional numerical opening cases. Teacher narration is in notes.
3. Equilibrium and full-employment definitions appear within one reversible
   contrast, immediately followed by the diagram.
4. Deflationary and inflationary gaps are taught as opposites: one definition
   comparison and a common-axis diagram at the same full-employment benchmark.
   The diagram also measures the negative output gap horizontally. A following
   comparison teaches actual minus potential output, negative/positive gaps and
   sustainable capacity. The notional high AE intersection is not actual output.
5. Original gap-reading, inflationary-calculation and injection questions have
   staged explanations, highlighting and a persistent original stimulus.
6. A substantive essay workshop uses the full original 2021 Q6. The sequence
   starts with five AO-labelled guiding sub-questions, then teaches planning, diagnosis, diagram interpretation, fiscal
   analysis/evaluation, monetary analysis/evaluation and a supported conclusion.
   Six model paragraphs have aligned AO annotations. The complete-model dialog
   collects the prose and labelled diagram for continuous reading.
   The diagnosis and both policy-analysis stages explicitly ask students to draw,
   label and use AE diagrams. The guiding sub-questions are teaching scaffolding;
   the original Cambridge question remains intact.
7. An unseen original Paper 3 diagram question provides the exit.
8. A five-point list titled Summary consolidates economics and essay skills.

Past-paper titles now name the subject, with paper identifiers below. The formula
slide explicitly calculates the spending adjustment to reach full employment.

There are no teacher-created assessed questions or shortened essay adaptations.
Teacher-authored illustrations, explanations and model answers are explicitly
identified. Treat the expanded essay workshop as a continuation if necessary;
do not infer all 30 slides and independent essay writing fit the planner's
half-session allocation. Prepared content does not establish taught coverage.
The planner's allocation and session IDs remain unchanged.

## Source audit

All original examination PDFs were checked under
`C:/Users/oehle/Documents/past-papers/economics_9708_a_level/`.
Only relevant question/criterion excerpts are retained in public lesson assets.

| Use | Original source | Question page | Mark-scheme page and answer |
|---|---|---:|---|
| Retrieval: multiplier | 9708/32 May/June 2025 Q15 [1] | 6 | 2: D |
| Retrieval: leakages | 9708/31 May/June 2026 Q16 [1] | 6 | 2: B |
| Deflationary distance | 9708/31 Oct/Nov 2023 Q18 [1] | 7 | 2: A, JK |
| Inflationary calculation | 9708/32 Feb/Mar 2025 Q19 [1] | 7 | 2: A, $40 million |
| Initial injection | 9708/33 Oct/Nov 2021 Q26 [1] | 10 | 2: C, +$40 billion |
| Complete essay workshop | 9708/42 Feb/Mar 2021 Q6 [25] | 4 | 18: holistic levels |
| Independent exit | 9708/31 May/June 2023 Q20 [1] | 8 | 2: D, UV |

Q6 uses the old 25-mark format. Its L4 range is 18–25, requiring equilibrium
explained, developed analysis, critical evaluation, at least two evaluative
comments and a reasoned conclusion addressing both parts. Maximum 21 without
a conclusion. Its scheme accepts a Keynesian demand-side approach or a
supply-side alternative. The model takes the first route and compares fiscal
and monetary transmission. Current AO1/AO2/AO3 labels are teaching annotations,
not invented separate mark allocations for the 2021 question. No guaranteed
score is attached to the teacher-written response.

Current AO definitions and format were checked against the official Cambridge
9708 syllabus 2026–2028, printed/PDF p.13 for AOs and p.36 for Paper 4:
https://www.cambridgeinternational.org/Images/697423-2026-2028-syllabus.pdf .
Application sits within AO1 in the current syllabus.

Textbook: Colin Bamford & Susan Grant, *Economics for Cambridge International
AS & A Level*, CUP, 2021. Retained local PDF:
`C:/Users/oehle/Documents/oehler-huang-legacy-sources/course-reference-archive/a-level/Cambridge A Level Economics - Textbook.pdf`.
Section 41.1 (PDF p.352) supplies multiplier and expenditure/output adjustment;
section 41.3 (PDF p.356), Figures 41.9–41.12, supplies equilibrium/full employment,
opposite expenditure gaps and policy shifts. PDF positions are used because
this electronic copy combines long reflowed pages and answer material.

Bank of England, *Supply and spare capacity*, 7 February 2019, §3.1:
https://www.bankofengland.co.uk/inflation-report/2019/february-2019/supply-and-spare-capacity .
Used for the resource-competition and price-pressure mechanism, not current data.

Output-gap terminology: Bank of England, *In focus: Supply and spare capacity*,
30 January 2020, introduction and Chart 4.1 note:
https://www.bankofengland.co.uk/monetary-policy-report/2020/january-2020/in-focus-supply-and-spare-capacity .
Supports actual-minus-potential output and the sign convention; used without
historical estimates or current-data claims.

Photograph: Bernard Spragg. NZ, *Toronto skyline*, Wikimedia Commons, CC0:
https://commons.wikimedia.org/wiki/File:Toronto_skyline._(49366040606).jpg .
Reuses an existing local image. No inference about unemployment in Toronto.
The old bakery asset is retained unused.

## Models and interactions

Introductory and paired-gap diagrams are labelled teaching illustrations:
AE = 100 + 0.75Y versus AE = 200 + 0.75Y, with full employment 600, annual £m.
They are not invented exam questions. Both gaps are £50m measured vertically;
above-capacity intersections are explicitly notional.

The policy-shift diagram now derives from original Q26: C = 0.8Y, initial
I = 200, equilibrium 1000, full employment 1200, all $ billion. Increasing I
by 40 moves equilibrium to 1200 through a multiplier of 5. No-government
assumptions are preserved; the injection can be private investment.

`slides.js` owns content and the structured source library. `diagram-scenes.js`
owns reversible steps. `lesson-diagrams.js` extends only this lesson's diagram
markup. `lesson-interactions.js` adds lesson-scoped exam/essay layouts using the
existing steps/reveal engine, source dialogs, original-question enlargement and
the complete model. `lesson.css` owns their responsive layout. Shared A-level
and IGCSE renderers were not changed. Source buttons identify type, exact location,
what was drawn from it and whether the displayed reasoning is teacher-written.

## Validation

Use syntax checks, `npm run check:courses`, the required library smoke suite,
and `tests/income-gaps.spec.js`. The focused check covers source-dialog keyboard
isolation, full-model access, question persistence, original currency, reversible
reveals/reset, completed-slide bounds, narrow layouts and reduced motion.
Rendered review artifacts are under `tmp/income-gaps/ao-review/`.

Follow-up revision, 14 September 2026: 30 completed views rendered with no bounds
errors; affected slides and immediate neighbours visually checked. Both focused
lesson tests passed, including the new output-gap comparison and summary at
phone width. JavaScript syntax and whitespace checks passed. The earlier broad
smoke result below was not rerun for this focused lesson revision.

Final validation, 14 September 2026: all 29 completed slides rendered and inspected; focused source, answer, animation, complete-model, narrow-screen and reduced-motion tests passed (2/2). JavaScript syntax and course checks passed. The library smoke run passed 108, skipped 1 and retained one unrelated Stock Market Game launch-title failure in smoke.spec.js:1216. A-level navigation/planner/viewport checks passed. Seventeen synthetic workflow, 30-student batch/print-pack, schema and private-boundary checks passed. Verified source excerpts and the complete model in the in-app Browser.
