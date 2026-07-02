# Investment Analysis Lesson Template

Use this folder as the starting point for future `investment-analysis/unit-x/lesson-y/` decks.

Before creating or updating a deck, follow `DESIGN-LANGUAGE.md`. It is the source of truth for Investment Analysis typography, slide density, landing-page structure and visual QA.

Also check `../course-map-data.js` before drafting the lesson. It is the course-level source for the real company anchor, Grade 9 analyst question, key terms, definitions, formulae, required evidence fields, handout sections, exam pattern and individual classroom output for each taught lesson. `../syllabus.html` renders its table and lesson cards from that structured source.

Required files:

- `index.html` loads `../../../assets/css/investment.css`, `../../../assets/js/investment-deck.js`, `../../../assets/js/investment-quiz.js`, then local `slides.js` and `quiz.js`.
- `slides.js` assigns `window.INVEST.lesson`.
- `quiz.js` assigns `window.INVEST.quiz`.

Classroom rhythm:

1. Hero or market brief.
2. Concrete starter that asks students to choose, predict or classify before the reveal.
3. Exactly three bilingual objectives.
4. Section divider, visual or data pause, taught content, formative check.
5. Calculation or evidence practice where useful.
6. Exam-style writing and exit ticket.

Keep real company data frozen with source and date metadata. Do not fetch live prices inside lesson files.

Teaching rhythm:

- Stage the work as `try first, reveal second`. Use reveal states for company facts, evidence bodies, risk effects, keywords, calculation answers and model paragraphs.
- Make teaching titles student-facing and note-friendly. Use the taught concept, question or exercise label, such as `What is a share price?` or `Exercise 1`, instead of a slogan such as `One share, one price`.
- `discussion` slides must ask a real student-answerable question. Do not use them to display the answer as the opening prompt.
- `discussion.revealTitle` must be a concise answer statement, such as `One share is one ownership unit`, not a vague label such as `Model answer`, `Course rule` or `Bridge`.
- `section` dividers should stay quiet: part label, title, optional Chinese title, and the automatic progress strip. Do not add photos, prompt cards or manual roadmap lists.
- `flow` slides should contain meaningful `__________` blanks with `answer` values, so students predict the key concept links before reveal.
- `term` definitions should blank conceptual payload words such as `ownership`, `identifier`, `market price` or `specific time`, not merely the term being defined.
- `term` slides should show the term, English definition and Chinese definition only; keep extra related terms out of the projected definition block.
- `peerTask` slides should end with an individual written check even when students compare with a partner.

Syllabus alignment:

- Center each lesson on the real company named in `course-map-data.js` unless the structured course map itself is intentionally revised.
- Use the syllabus analyst question as the lesson's guiding question, keeping it approachable for Grade 9 students.
- Teach the listed key terms and definitions explicitly, with Chinese support for the terms, objectives, difficult prompts and formula wording.
- Use the listed formulae and calculation wording where applicable; if a lesson has no new formula, include an evidence-reading or judgement check instead.
- Record company name, stock code or listing, source title, source URL, publication date, accessed date, key figures and what the evidence can and cannot prove.
- Build the lesson handout from the six `handoutSections` in `course-map-data.js`: source box, vocabulary, company evidence, calculation or judgement task, misconception check and individual written output.
- The textbook is the compiled sequence of lesson handouts only; do not add separate textbook-only teaching chapters.
- One-class team tasks are allowed for scenario sorting, quote-page reading, ETF comparison and quick risk debate, but they must end with an individual written check.
- Do not turn any unit into a multi-lesson portfolio, report or final project sequence.

Visual rhythm:

- Keep each projected slide to one main idea or student action.
- Do not combine a dense table, chart, photo and prompt on the same slide.
- Keep section dividers closer to the economics-presentation divider style: simple reset screen, no lesson-map card, no image column.
- Use `dataSnapshot` for three key metrics plus a short reading task; keep detailed rows in notes, sources or a separate focused slide.
- Use `marketBrief` with `revealMetricValues: true` when students should locate company facts before seeing the answer.
- Use `analystBoard` with `revealBlocks: true` and `riskRegister` with `revealEffects: true` for staged evidence/risk thinking, not crowded dashboard panels.
- Use `exam` with `revealKeywords: true` when students should plan before seeing the keyword scaffold.
- Use `modelAnswer` with `cueLabel` and `cueText` so the comparison instruction matches the question.
- Keep landing-page copy student-facing: lesson actions, what students will learn, and clear quiz/data links.

Typography rhythm:

- Projected teaching text uses one text face and two sizes: 48px for slide/term/section titles and 32px for lesson content.
- Do not create special font sizes for metrics, terms, formulas, choices, prompts or model answers; use weight and spacing lightly instead.
- Keep source panels, captions and deck chrome visually quiet so they do not compete with the teaching surface.
- Use modern local photos for visual pauses and context backgrounds. Avoid old stock certificates, archival trading-floor imagery and museum-value photos unless the lesson explicitly teaches historical context.
- Download new high-resolution photos when the catalogue match is weak, resize them to projection quality, and add complete metadata in `assets/js/investment-photos.js`.
