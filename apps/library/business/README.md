# Cambridge IGCSE Business 0264 Authoring Guidance

Archive status: this course is retained in the repository for reference, but it is not linked from the public Oehler-Huang Library and Business HTML pages are marked `noindex,nofollow`.

Business decks in this folder should be exam-facing teaching materials for Cambridge IGCSE Business 0264. Use the official syllabus reference and exam-requirements reference as the local planning authorities:

- `../references/igcse-business-0264-syllabus-2027-2029.md`
- `../references/igcse-business-0264-exam-requirements.md`

## Default Lesson Pattern

- Teach the syllabus point through one clear business context.
- Use Harbor Phone Repair as an original teaching case for Unit 5 only; do not label it as a Cambridge source.
- Add mixed Paper 1 and Paper 2 practice in every Unit 5 deck.
- Prefer specific command words and mark sizes over generic "exam practice".
- Follow exam chains in model answers: business term -> case evidence -> consequence -> judgement or rejected alternative.

## Exam Slide Data

Use `examSpec` on `exam` and `modelAnswer` slides:

```js
examSpec: {
  paper: 'P1',
  marks: 8,
  command: 'Justify',
  skills: ['k', 'app', 'an', 'eval'],
  pattern: 'P1 8-mark justify',
}
```

Allowed `paper` values are `P1` and `P2`. Allowed `skills` values are `k`, `app`, `an` and `eval`.

For Paper 2 12-mark decisions, add:

```js
variant: 'businessDecision'
```

Paper 2 12-mark model answers must include a clear recommendation or conclusion and explicit rejection of at least one alternative.

## Unit 5 Standards

- `5.1.1`: include Paper 1 definition/outline/explain practice for finance needs and working capital, plus Paper 2 application where the case supports it.
- `5.1.2`: include a Paper 1 8-mark decision and a Paper 2 12-mark source-of-finance recommendation.
- `5.2.1`: include calculation practice using cash-flow mark-scheme habits, then a Paper 2 12-mark decision on a short-term cash-flow solution.
- Keep all source panels tied to the syllabus reference and the exam-requirements reference.
