# Factors of production — split on 14 September 2026

Teacher-reported endpoint: **Land, labour or capital?**, original slide 20, inclusive. `index.html` remains the first deck and ends exactly there. Enterprise was briefly named in its four-factor overview; detailed enterprise teaching and factor rewards were not covered. The first deck's objectives, quiz and flashcards match its taught scope.

`lesson-2.html` is the self-contained continuation prepared for 15 September 2026, not evidence of taught coverage. It covers syllabus **1.2.1**; factor mobility and changes in quantity/quality remain later knowledge points.

## Teaching sequence (about 45 minutes)

- Slides 1–3: recall of productive resources and three bilingual objectives: define enterprise/entrepreneur, identify rewards, answer past-paper questions (5 minutes).
- Slides 4–9: introduce Emma's school-fair stall before the resource animation; define enterprise; distinguish the person from their organising and risk-taking roles; check with the original 2022 café MCQ (12 minutes).
- Slides 10–13: illustrate and retrieve the four factor rewards; apply them to an original reward-table MCQ (7 minutes).
- Slides 14–17: count revenue tokens, allocate costs, identify profit, then predict what happens when only six boxes sell. Compare agreed payments with uncertain profit and answer the original 2024 MCQ (10 minutes).
- Slide 18: discuss three illustrated motivations; ask students to predict each reason before revealing its explanation (3 minutes).
- Slides 19–22: independent original 2025 delivery-service MCQ and Paper 2 factor-reward question, followed by feedback (4 minutes).
- Slides 23–24: assessed exit using the original 2023 Paper 2 entrepreneur-motivation question, then its model answer (4 minutes).

Pause for individual thinking before each answer reveal. Use responses to the embedded MCQs to decide whether to revisit the definition, a reward pairing or the revenue/cost distinction. Prepared slides are not evidence of teaching progress.

## Bespoke visuals and controls

Five local SVG scenes use the normal Right/Next and Left/Previous partial-reveal controls. The assembly consistently identifies wheat as land, Lucy as labour and the oven as capital. The entrepreneur scene separates organising resources from taking business risk. The reward scene pairs illustrated inputs with rewards. Six revenue tokens each represent ¥30: four cover costs and two remain as profit. The risk scene holds price and cost constant, colours 12 countable bread boxes by whether sold, and compares revenue with a fixed cost threshold. Pause before revealing the six-sales outcome.

The hero is a new AI-generated sneaker-business launch illustration; the repeated bakery photograph is removed from the continuation. Emma's case and the motivation cards have custom teaching illustrations. The definition uses the existing attributed Steve Jobs photograph. Matching rows have small factor icons. Motivation explanations reveal separately while their illustrations remain visible.

Reduced-motion settings disable animation. Phone scenes reflow; print events show the final state. The handout retains the explanatory cards, including both sales outcomes. Quiz and flashcards remain separate study views.

## Model assumptions and accuracy

Emma makes 12 bread boxes for a fictional school-fair stall, charging ¥15 per box. She pays the total cost of ¥120 from her savings before any sales. All agreed payments, including Lucy's wage, are included. Unsold boxes have no resale value. If all 12 sell, revenue is ¥180 and profit is ¥60. If 6 sell, revenue is ¥90 and the loss is ¥30.

The factor-reward table follows the syllabus convention capital → interest. It does not call equipment-hire payments interest or classify money itself as a physical capital good. One person can supply different factors. Enterprise involves both organising the other factors and taking risks.

## Sources and latest revision

See `PAPER-SOURCES.md` for six original Cambridge questions and official mark-scheme checks: four Paper 1 questions and two Paper 2 questions. Original question wording and answer-table column order are retained; feedback is teacher-written. The Emma numerical case teaches the mechanism and is not presented as an exam question. The invented written practice and fruit-stall question have been removed.

The 14 September feedback is saved in `authoring/igcse-economics/LESSON_DECK_PREFERENCES.md`: exciting relevant heroes, readable recall spacing, clear assessment objectives, case setup before animation, consistent factor labels, illustrated definitions/matching, purpose-built visual explanations and authentic past-paper practice.

## Validation

### Whole-deck classroom redesign, 14 September 2026

`classroom.css` defines the continuation's scoped warm-white/navy/teal system. Hero and section boundaries remain dark; teaching slides use flat, uncluttered layouts. Removed repeated labels and decorative panels, standardised type sizes and margins, simplified case/motivation copy, separated bilingual support and enlarged the five diagrams. Original Cambridge stems/options and the 24-slide teaching sequence remain intact. Comparison sides and question feedback retain reversible reveals with reserved space.

Latest checks: all 24 completed slides passed 1440 × 810 and 1920 × 1080 geometry checks. Selected teaching-text elements also passed a minimum 24px size and 4.5:1 foreground/canvas contrast check. Desktop and phone interaction checks passed, including recall/MCQ position stability, animations, study views and original paper tables. The first lesson's exact endpoint smoke check passed. Full-deck review images are retained privately in `authoring/igcse-economics/review/enterprise-classroom/`.

Further reference-led polish: the active A-level **Equilibrium income and expenditure gaps** deck now informs the compact category-labelled source buttons, readable modal, header rules, side accent and quiet numbering. `classroom-sources.js` uses this lesson's verified references and image credits; it does not import A-level implementation code or change access to teacher notes. Question-paper dialogs retain original stems/options and exclude official answers, which have their own Mark scheme button. Source dialogs close using their close button, Escape or the backdrop, restore focus and suppress background slide shortcuts. Desktop and phone tests cover these behaviours. Original inline source records remain available to the print/handout renderer.

- JavaScript syntax, content build and content validation passed (48 items, 29 quizzes).
- Focused continuation tests passed on desktop and phone: reversible animation stages, 12-box counts, stable recall spacing, original exam-table headings, hidden/revealed feedback, and study views. All 24 completed slides passed classroom viewport geometry checks at 1440 × 900.
- The existing-lesson smoke check passed, including the first deck's exact 20-slide endpoint.
- In-app Browser visual review covered the new hero, recall, case, factor labels, illustrated definition, entrepreneur roles, matching, money-token diagram, original exam table and motivations.
- Earlier full smoke run for the split: 104 passed, 1 skipped and 5 failures in unrelated A-level/Investment features in the dirty working tree. These were not changed for this lesson.
- The local server is available on port 4173 and `/api/config` responded. Private EconMark single-answer and batch routes require sign-in; public samples are disabled. No access settings were changed.
