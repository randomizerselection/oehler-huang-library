# Investment Analysis Lesson Template

Use this folder as the starting point for future `investment-analysis/unit-x/lesson-y/` decks.

Before creating or updating a deck, follow `DESIGN-LANGUAGE.md`. It is the source of truth for Investment Analysis typography, slide density, landing-page structure and visual QA.

Also check `../course-map-data.js` before drafting the lesson. It is the course-level source for the real company anchor, Grade 9 analyst question, core claim, case role, key terms, definitions, formulae, source pack, handout blocks, assessment blueprint, exam pattern and individual classroom output for each taught lesson. `../syllabus.html` renders its table and lesson cards from that structured source.

Generator context:

- From the repo root, run `node scripts/export-investment-generator-context.js --lesson 2 --target lesson --format md` before drafting a new deck.
- Use `--target deck`, `--target handout`, `--target quiz`, `--target exam` or `--target textbook` when building a specific lesson material.
- Programmatic generators should import `investment-analysis/generator-context.js` and call `getLessonGeneratorContext(lessonNumber)` or `getLessonMaterialContext(lessonNumber, target)` instead of copying syllabus fields by hand.
- The generator context is a contract, not optional background: preserve the `primaryOutput`, `avoidOverlap`, `misconception`, `sourcePack`, `artifactBlueprint` and `assessmentBlueprint` unless the structured course map is intentionally revised first.

Required files:

- `index.html` loads `../../../assets/css/investment.css`, `../../../assets/js/investment-deck.js`, `../../../assets/js/investment-quiz.js`, then local `slides.js` and `quiz.js`.
- `slides.js` assigns `window.INVEST.lesson`.
- `quiz.js` assigns `window.INVEST.quiz`.

Classroom rhythm:

1. Case hook.
2. Brief retrieval diagnostic that asks students to recover prior knowledge before new content.
3. Exactly three bilingual objectives.
4. Repeated section cycle: retrieve, attempt, reveal/teach, formative check, improvement.
5. Output rehearsal using the lesson `primaryOutput`.
6. Exit ticket, then follow-up quiz.

Keep real company data frozen with source and date metadata. Do not fetch live prices inside lesson files.

ILA and continuous retrieval:

- Treat ILA as integrated learning and assessment: checks are part of teaching, not a separate test at the end.
- Every taught section should begin with brief retrieval from the lesson `retrievalBase`, earlier course concepts, recurring misconceptions, formulas, source habits or evidence-judgement chains.
- Every taught section should include a student attempt before the reveal and a formative check after the reveal.
- Vary formative assessment across the lesson: hinge questions, sorting, mini calculations, source checks, misconception correction, peer comparison, cold-call justification and individual written checks.
- Every formative check should produce a visible decision point for the teacher: move on, reteach, ask for improvement or collect the individual output.
- The final exit ticket should assess the lesson `primaryOutput`; the lesson quiz should retrieve the same core ideas after the lesson.
- Keep technical ILA language mostly in notes and planning guidance. Visible slide labels should remain student-facing, such as `Try first`, `Key idea`, `Practice check`, `Output rehearsal` and `Exit ticket`.

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
- Do not use deprecated `marketBrief` slides in new decks. They add little teaching value; use `dataSnapshot` for compact figures, `sourceLens` for source validity, `quoteMap` for quote-page fields, or a normal `discussion` for retrieval.

Syllabus alignment:

- Center each lesson on the real company named in `course-map-data.js` unless the structured course map itself is intentionally revised.
- Use the syllabus analyst question as the lesson's guiding question, keeping it approachable for Grade 9 students.
- Start from the lesson `coreClaim`, `primaryOutput`, `sourcePack`, `artifactBlueprint` and `assessmentBlueprint`; do not invent a separate deck, handout or exam objective.
- Use `retrievalBase`, `formativeAssessment` and `exitTicket` as the assessment spine for the deck; do not leave them only in the syllabus card.
- Teach the listed key terms and definitions explicitly, with Chinese support for the terms, objectives, difficult prompts and formula wording.
- Add concise Simplified Chinese support for important student-facing teaching text as standard: slide titles, term definitions, core prompts/tasks, main answer/reveal text, flow/answer items and quiz prompts/explanations. Do not translate minor source metadata, codes, dates, numeric values, UI chrome or teacher notes unless they carry the concept.
- Use the listed formulae and calculation wording where applicable; if a lesson has no new formula, include an evidence-reading or judgement check instead.
- Record company name, stock code or listing, source title, source URL, publication date, accessed date, key figures and what the evidence can and cannot prove.
- Run the `sourceFitAudit` and check `caseReview` before building a deck; if the source pack fails, replace the company only with a case that preserves the same unit role, skill target and assessment blueprint.
- Build the lesson handout from the six `artifactBlueprint.handoutBlocks` in `course-map-data.js`: source box, vocabulary, company evidence, calculation or judgement task, misconception check and individual written output.
- The textbook is the compiled sequence of lesson handouts only; do not add separate textbook-only teaching chapters.
- One-class team tasks are allowed for scenario sorting, quote-page reading, ETF comparison and quick risk debate, but they must end with an individual written check.
- Do not turn any unit into a multi-lesson portfolio, report or final project sequence.

Visual rhythm:

- Keep each projected slide to one main idea or student action.
- Do not combine a dense table, chart, photo and prompt on the same slide.
- Keep section dividers closer to the economics-presentation divider style: simple reset screen, no lesson-map card, no image column.
- Use `dataSnapshot` for three key metrics plus a short reading task; keep detailed rows in notes, sources or a separate focused slide.
- Use `conceptTriad` when students must compare three beginner concepts with definition, purpose, risk level, time horizon and example.
- Use `sourceLens` when students must test whether a source can support a claim: source title, publisher, date, unit, scope and limitation.
- Use `quoteMap` when students must read a quote page: company, code, exchange, price, date/time and source before making an opinion.
- Use `comparisonMatrix` when students compare two or three choices against the same criteria such as evidence, possible return, risk and price paid.
- Use `catalystTimeline` when students connect new information, expectations and price movement without overclaiming causation.
- Use `judgementFrame` when students need to assemble a balanced investment judgement from evidence, return, risk and price paid.
- Use `analystBoard` with `revealBlocks: true` and `riskRegister` with `revealEffects: true` for staged evidence/risk thinking, not crowded dashboard panels.
- Use `exam` with `revealKeywords: true` when students should plan before seeing the keyword scaffold.
- Use `modelAnswer` with `cueLabel` and `cueText` so the comparison instruction matches the question.
- Keep landing-page copy student-facing: lesson actions, what students will learn, and clear quiz/data links.

Typography rhythm:

- Projected teaching text uses one text face and two sizes: 48px for slide/term/section titles and 32px for lesson content.
- Do not create special font sizes for metrics, terms, formulas, choices, prompts or model answers; use weight and spacing lightly instead.
- Keep source panels, captions and deck chrome visually quiet so they do not compete with the teaching surface.
- Use modern local photos for visual pauses and context backgrounds. `visualPause` slides must project only the picture: no visible title, prompt, caption or credit. Put the teaching bridge in notes or on an adjacent slide.
- Avoid old stock certificates, archival trading-floor imagery and museum-value photos unless the lesson explicitly teaches historical context.
- Download new high-resolution photos when the catalogue match is weak, resize them to projection quality, and add complete metadata in `assets/js/investment-photos.js`.
