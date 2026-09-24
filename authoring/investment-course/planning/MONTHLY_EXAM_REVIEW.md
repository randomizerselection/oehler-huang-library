# First monthly exam review · Lesson 6

Prepared 23 September 2026 for the existing 25 September revision slot.
Public source: `apps/library/investment-analysis/lessons/monthly-exam-review/`.
34 core slides and two optional chart applications, 40 minutes including feedback.
This preparation is not a claim that the review has been taught.

## Authoritative exam evidence

Read the current, non-archived files in
`C:/Users/oehle/Documents/monthly-exams/2026-27_S1_01/Investment/`:
`exam.json`, `questions.json`, `specifications.md`.
The current exam is labelled October 2026; exact date TBC. It has 100 marks in
60 minutes: 25 MCQs (50), four matching groups (25), five calculation tasks (25).
Business news was removed. Calculator and formula guide are allowed.

The exam brief records a later explicit teacher confirmation that Share price
and company size was taught. That overrides the older course progress note
which still calls it prepared. The five-lesson scope is authoritative for this
review. Do not infer coverage of the new Risk and possible return lesson.

## Coverage mapping (private)

| Exam content | Review slide IDs |
| --- | --- |
| A1–4; investment foundations in B26 | retrieval-foundations |
| A5–11; B27; C30–31 | cash-flow-mechanism, return-formulas, dividend-model, return-model, return-independent, compare-return-mcq, matching-return |
| A12–16; compounding/reinvestment in B26; C33 | compound-mechanism, compound-formula, compound-model, compound-independent, compound-input-mcq |
| A17–20; B28; C32 | matching-trading, order-cost-model, limit-price-mcq, exit-order-calculation |
| A21–24; B29; C34 | market-cap-model, market-cap-independent, split-model, expectations-mechanism, matching-company |
| Chart applications A7/A25 | exit-chart, optional-dividend-chart, optional-growth-chart |

The public deck contains original analogues, changed values and option orders,
not copied future exam items, charts, letter keys or candidate/teacher PDFs.
Actual exam material stays in the private monthly-exams workspace.

## Pacing and assessment

0–3:30: objectives, format, initial five-item matching retrieval.
3:30–11: returns, connected dividend/return model, independent calculation,
percentage comparison and cash-flow matching.
11–16:20: simple versus compound mechanism, formula, periodic-rate model,
independent calculation and proportionality check.
16:20–26: ownership/orders, fee-inclusive cost, buy-limit check, company value,
independent market-cap calculation, split model, expectations and matching.
26–32: independent check (four 2-mark MCQs and one 2-mark calculation).
32–36:30: revisit the five responses; reveal solutions only after all are recorded.
36:30–40: Summary, one corrected method per student, feedback buffer.
Optional charts follow Summary, about two minutes each.

Notes supply marking and misconception-specific reteaching. Core has four
five-item matching tasks, three independent calculation practices (5, 5, 4
marks), three formative MCQs, and the independent 10-mark check. A target of
8/10 is diagnostic, not a prediction of an examination grade.

## Calculation audit

- 0.20 + 0.25 + 0.25 = 0.70; 12 shares give $8.40.
- (1296 − 1200 + 8.40) / 1200 × 100 = 8.7%.
- (752 − 800 + 16) / 800 × 100 = −4%.
- 600 × 1.03^4 = 675.305286 → $675.31.
- 800 × 1.015^4 = 849.0908405 → $849.09.
- 6 × 145 + 5 = 875; budget remainder 25.
- 145 × 2 billion = 290 billion; 80 × 3 billion = 240 billion;
  88 × 3 billion = 264 billion.
- Split: 4/40 = 8/80 = 10%; 4 × 20 = 8 × 10 = $80.
- Independent key: C, A, D, C, $966. Compound final value 441; gain 41.
- Optional chart: (0.25−0.20)/0.20 = 25%; (126−100)/100 = 26%.

## Validation completed 23 September 2026

- JavaScript syntax, content build, course catalogue/asset checks and content
  validation passed. Public manifest contains the new lesson route.
- All 36 slides rendered and visually inspected; automated layout, reveal,
  answer, MCQ, overview, notes, fullscreen and offline checks passed at
  1280×720, 1920×1080 and 390×844. The changed image, formula and MCQ-label
  slides received a second focused pass. In-app Browser inspection confirmed
  the final formula layout and photo divider after reloading.
- Focused navigation/catalogue/selector checks: 11 passed, one phone-only check
  skipped by the desktop project. All-slide phone layout checks passed separately.
- Full library smoke run: 169 passed, one skipped, six failures. The newly
  outdated seven-card catalogue expectation was updated for eight lessons and
  passed on rerun. Five other failures remain outside this lesson: homework
  praise screen, attendance styling on three other routes, and file-opened
  A-level selector runtime. No shared selector implementation was changed.
- EconMark synthetic single-answer and 30-student batch workflow checks:
  17 passed. The existing localhost server answered `/api/config`; live public
  samples are disabled, so no live public sample submission was performed.
- No deployment, exam-paper modification, or student-data changes.
