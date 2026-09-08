# Investment and Financial Decision-Making Lesson Template

> Legacy reference. This template belongs to the unlinked Economics-renderer
> Investment lessons. For current and future course work, follow `../AGENTS.md`
> and the lessons linked from `../index.html`. The historical instructions below
> apply only when explicitly restoring or editing that legacy system.

This folder was used for the legacy `investment-analysis/unit-x/lesson-y/` decks.

## Canonical slide generator

Active and future lessons use the shared Economics presentation system:

- `assets/css/theme.css`
- `assets/css/presentation.css`
- `assets/js/presentation.js`
- `window.IGCSE.lesson`
- `window.IGCSE.quiz`

The course uses `window.INVEST.photos` as its local image catalogue. Every lesson must use native Economics slide types, assign its data to `window.IGCSE.lesson` and mount directly with `window.IGCSE.mountLesson(window.IGCSE.lesson)`.

Before drafting, read `DESIGN-LANGUAGE.md` and the lesson entry in `../course-map-financial-decisions-data.js`. Export the canonical lesson context from the repository root:

```powershell
node apps/library/scripts/export-investment-generator-context.js --lesson 2 --target deck --format md
```

## Required files

- `index.html` uses the Economics scaffold in this template.
- `slides.js` assigns `window.IGCSE.lesson`.
- `quiz.js` assigns `window.IGCSE.quiz`.
- Local course images come from `window.INVEST.photos`.

## Lesson rhythm

1. Open with one short dilemma that asks for an immediate judgement.
2. Capture the first judgement before teaching.
3. Show exactly three concise bilingual objectives.
4. Divide the lesson with concise academic topic titles students can copy into notebooks.
5. Teach each key term with an accurate self-contained definition and at least three concise bullet examples.
6. Use a classification or sorting check after a distinction creates meaningful categories.
7. Include varied formative checks: hinge MCQ, yes/no misconception check, classification, peer explanation, short calculation or source check as appropriate.
8. Complete the required Stock Market Game evidence checkpoint from the course map.
9. Rehearse the final judgement, then collect an individual exit response.
10. Use the follow-up quiz to retrieve the same distinctions and decision rule.

Keep each `outcomes` objective concise because the phase label carries the action verb. Name the exact knowledge, comparison dimension or output.

A `discussion.answer` is one English sentence followed by one Chinese sentence in `discussion.answerZh`. It must answer the exact question as a self-contained statement. Do not use labels such as “Model answer,” “Course rule,” or “Need more information.”

## Native Economics slide types

Prefer the smallest component that expresses the teaching move:

- `hero` for the opening question and visual.
- `discussion` for think-first judgement with a modal possible answer.
- `outcomes` for the three objectives.
- `section` for a short academic divider.
- `visualPause` for one thought-provoking image.
- `term` for one definition and three or more concise examples.
- `cards` for a structured comparison grid.
- `compare` for a two-column contrast.
- `flow` for a mechanism or decision sequence.
- `quiz` for one hinge question.
- `yesNoCheck` for misconceptions and boundary cases.
- `classificationTask` for cases classified with reasons.
- `peerTask` for a staged spoken or written task.
- `modelAnswer` for a model shown only after students try.

Do not create a new renderer type when these types can express the learning move.

## Chinese support

Use less Chinese than English, but always translate difficult financial and economic terminology. Include Chinese for:

- difficult terms and complete definitions;
- the opening question and possible answer;
- section titles when they carry taught meaning;
- hinge questions or instructions where misunderstanding would block the task;
- quiz prompts and feedback.

Do not translate source metadata, stock codes, dates, ordinary UI labels, teacher notes or every example automatically. Keep existing translations consistent with the course term bank.

## Handout contract

The knowledge handout is a four-page, monochrome, print-legible bilingual exam-revision sheet.

- Use at least 10 pt throughout.
- Use complete, self-contained definitions; do not use fill-in-the-blank or cloze definitions.
- Give English priority. Translate difficult terms and definitions consistently.
- Use structured grids to compare nearby concepts by the same dimensions.
- Prefer concise bullet examples and varied short practice over long case narratives.
- Keep scenarios only when a small amount of context is necessary to decide the classification.
- Keep practice separate from answer keys or teacher notes.

The knowledge handout and projected slides should complement one another. Students may keep the handout on their desks; slides should prompt thought, comparison and discussion instead of repeating every printed statement.

## Currency and evidence

Use the currency that matches the case: `CNY` for mainland China, `HKD` for Hong Kong securities or transactions, and `USD` for United States cases. Use 人民币, 港元 and 美元 in Chinese support.

Freeze every real figure with a source and date. Label mock or anonymised details clearly. Do not fetch live prices inside lesson files and do not give personalised investment advice.

## Validation

From the repository root:

```powershell
node --check apps/library/assets/js/presentation.js
node --check apps/library/investment-analysis/unit-1/lesson-1/slides.js
node --check apps/library/investment-analysis/_template/slides.js
node apps/library/scripts/test-investment-analysis-content.js
npm run build:content
```

For rendered changes, verify a representative desktop and phone viewport, reveal controls, mode navigation, image loading and overflow. Reload the controlled browser after source changes.
