# Investment and Financial Decision-Making Lesson Template

Use this folder as the starting point for future `investment-analysis/unit-x/lesson-y/` decks.

Before creating or updating a deck, follow `DESIGN-LANGUAGE.md`. It is the source of truth for Investment Analysis typography, slide density, landing-page structure and visual QA.

Also check `../course-map-financial-decisions-data.js` before drafting the lesson. It is the active course-level source for the family, investment-choice, market or company case anchor, `decisionFirst` teaching contract, student hook, simple lesson flow, Grade 9 guiding question, core claim, case role, key terms, definitions, formulae, retrieval practice, analyse-why question, practical investment action, required `stockMarketGame` core lab, worksheet Evidence and Data Analysis section, source pack, handout blocks, assessment blueprint, checkpoint pattern and individual classroom output for each taught lesson. `../syllabus.html` renders its table and lesson cards from that structured source. The former company-analysis route remains in `../course-map-data.js` for archive maintenance only.

Generator context:

- From the repo root, run `node scripts/export-investment-generator-context.js --lesson 2 --target lesson --format md` before drafting a new active-course deck.
- The default and `--syllabus financial-decisions` selectors load the active course. Use `--syllabus company-analysis` only when maintaining an archived lesson.
- Use `--target deck`, `--target handout`, `--target quiz`, `--target exam` or `--target textbook` when building a specific lesson material.
- Programmatic generators should import `investment-analysis/generator-context.js` and call `getLessonGeneratorContext(lessonNumber)` or `getLessonMaterialContext(lessonNumber, target)` instead of copying syllabus fields by hand.
- The generator context is a contract, not optional background: preserve the `decisionFirst`, `studentHook`, `simpleFlow`, `primaryOutput`, `groundedScenario`, `retrievalPractice`, `analyseWhy`, `investmentAction`, `stockMarketGame`, `worksheet`, `avoidOverlap`, `misconception`, `sourcePack`, `artifactBlueprint` and `assessmentBlueprint` unless the structured course map is intentionally revised first.

Required files:

- `index.html` loads `../../../assets/css/investment.css`, `../../../assets/js/investment-deck.js`, `../../../assets/js/investment-quiz.js`, then local `slides.js` and `quiz.js`.
- `slides.js` assigns `window.INVEST.lesson`.
- `quiz.js` assigns `window.INVEST.quiz`.

Classroom rhythm:

1. Starter dilemma from `decisionFirst.starterDilemma`; this should be one short, visible student question that provokes an immediate judgement or discussion. Keep statistics, instructions and explanation off the hook screen.
2. First judgement from `decisionFirst.firstJudgementPrompt`; capture the quick vote, reason, ranking or classification before teaching.
3. Simple visible rhythm from `simpleFlow`: Hook, Key idea, Try it, Decide.
4. Brief retrieval diagnostic that asks students to recover prior knowledge before new content.
5. Exactly three bilingual objectives.
6. Repeated section cycle: retrieve, attempt, reveal/teach, formative check, improvement.
7. Required SMG core lab using the lesson `stockMarketGame.studentAction` as the main application and evidence task; replace compatible generic practice instead of appending another activity.
8. Output rehearsal and individual exit judgement using the same SMG evidence and the lesson `primaryOutput`.
9. Exit ticket, then follow-up quiz.

Keep real company data frozen with source and date metadata. Do not fetch live prices inside lesson files.

Grounded handout scenario:

- Begin every handout with a short data-based scenario that is used in the lesson. It must not be an entirely fictional case or a decorative statistic.
- Include at least one real, dated, source-backed figure or statement that materially informs the student task. Show the source title and evidence date.
- Mock or anonymised family, investor and company details are allowed, but label them clearly and keep them distinct from the real evidence.
- Reuse the same scenario evidence in at least one projected lesson activity and in the handout's Evidence and Data Analysis work.
- State one limitation: what the real evidence cannot prove about the mock case or a future investment result.

Use ISO currency codes that match the case. Use `CNY` for mainland China family scenarios, `HKD` only for Hong Kong-listed securities or Hong Kong transactions, `USD` for United States cases, and the corresponding local or transaction currency elsewhere. In Chinese support, name the currency as `人民币`, `港元` or `美元` rather than copying the English code.

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
- Choose title grammar by slide function instead of forcing one grammatical style across the deck. Use a direct question for `discussion`, `yesNoCheck` and `quiz`; the term alone for `term`; a short academic topic for `section`; a concise command for simulations, classifications, comparisons and written tasks; and a concept, relationship or clear claim for teaching and evidence slides. Keep the cover as the lesson question and the objectives title as stable orientation.
- Keep each `outcomes` objective concise because the phase label carries the action verb. Use a short, specific content label such as `Identify — Four facts needed before investing`, not a full explanatory sentence. Across the three objectives, name the lesson knowledge, evidence or output students will work with.
- `discussion` slides must ask a real student-answerable question. A lesson-opening hook must contain only one short question; move context, choices and explanation into notes, the handout or the reveal. Do not use the prompt to display the answer.
- `discussion.revealTitle` must be a concise answer statement, such as `One share is one ownership unit`, not a vague label such as `Model answer`, `Course rule` or `Bridge`. It must answer the exact question and name the missing information or next action; `Need more information before deciding` is still too vague.
- When a discussion asks for one correction, identification or decision, use `revealTitle` and `revealTitleZh` as the complete one-sentence bilingual answer and omit a second explanatory paragraph unless students genuinely need new evidence.
- Hooks should normally begin with a concrete student decision or dilemma, not a chart by default. Use a chart as evidence after students know what question the evidence is meant to answer.
- `section` dividers should stay quiet: part label, title, optional Chinese title, and the automatic progress strip. Use a concise academic topic or question students can copy into notebooks, such as `Investment and return` or `What is investment?`. Name the knowledge in the section; do not use an activity instruction, slogan, transition or full teaching claim. Do not add photos, prompt cards or manual roadmap lists.
- `flow` slides should contain meaningful `__________` blanks with `answer` values, so students predict the key concept links before reveal.
- `term` definitions should use `definitionBlanks` to blank conceptual payload words such as `ownership`, `identifier`, `market price` or `specific time`, not merely the term being defined. Keep the English `definition` text canonical and unmarked so validators, handouts and recall checks read the same wording.
- `term` slides should show the term, English definition and Chinese definition only; keep extra related terms out of the projected definition block.
- `peerTask` slides should end with an individual written check even when students compare with a partner.
- Use `peerTask` with `taskType: "definitionRecall"` for opening recall from earlier Investment lessons, and `taskType: "missingSentence"` when students need to practise one missing link in an evidence-to-judgement explanation.
- Use `compare` for a simple two-column T-table contrast. Use `comparisonMatrix` instead when students compare choices against three or four shared criteria.
- Use `evidenceSimulator` for a teacher-led whole-class decision that should change as clues appear. Give students three plain next-step choices, have them show 1, 2 or 3 verbally or with fingers, and let the teacher use one reveal control. Show the model conclusion only after the final class choice. Keep this qualitative; do not calculate a suitability score.
- Use `classificationTask` for classify-and-justify routines where the revealed reason matters. Use the older sort-style `peerTask` only when the physical sorting board is the main activity.
- Use `rankingTask` for low-to-high, risk-return, priority or confidence ordering tasks where students must defend a comparative order. Show three to five options in one vertical decision ladder with a blank rank beside each; reveal one defensible sequence and its reasons in the same reading direction. Do not use empty landing slots, a separate card grid or a horizontal phone carousel. Set `axis.showNote: false` when the end labels already define the order.
- Use `yesNoCheck` for misconception votes and borderline judgements where students should commit to yes/no before the reason appears. Keep it to three or four short statements shown as one vertical voting board; students click Yes or No to score the choice and reveal that row's reason, while the normal reveal controls remain available for teacher-led voting. Split longer checks instead of recreating a card grid or phone carousel.
- Do not use deprecated `marketBrief` slides in new decks. They add little teaching value; use `dataSnapshot` for compact figures, `sourceLens` for source validity, `quoteMap` for quote-page fields, or a normal `discussion` for retrieval.

Syllabus alignment:

- Center each lesson on the investment case anchor named in `course-map-financial-decisions-data.js` unless the structured course map itself is intentionally revised.
- Use the syllabus analyst question as the lesson's guiding question, keeping it approachable for Grade 9 students.
- Keep the visible student structure simple and interesting: use `decisionFirst`, `studentHook` and the four `simpleFlow` steps before adding detailed source, retrieval or exam work.
- Use `decisionFirst.missingEvidence` to choose the lesson's first evidence source, calculation, classification or definition; do not begin with a broad topic overview when the contract gives a narrower missing-evidence problem.
- Use `decisionFirst.misconceptionCheck` and `decisionFirst.exitJudgement` as the minimum assessment thread for the deck, handout and quiz.
- Start from the lesson `coreClaim`, `primaryOutput`, `sourcePack`, `artifactBlueprint` and `assessmentBlueprint`; do not invent a separate deck, handout or exam objective.
- Include the lesson `investmentAction` so students finish by choosing a justified next action such as consider, watch, avoid, compare with another choice or gather more evidence.
- Treat the lesson `stockMarketGame.studentAction` as required core work, not an optional extension. Allocate roughly 35-50% of the lesson to that application and reuse its evidence in the individual exit and unit output.
- Capture the required SMG portfolio, watchlist, transaction, quote or benchmark snapshot at the start of the lesson. Do not make the deck, handout or assessment depend on live prices remaining unchanged.
- Add one concise team evidence row and one individual exit judgement. Do not generate a duplicate SMG worksheet, log or homework stream beside the lesson artifact.
- Use `retrievalBase`, `formativeAssessment` and `exitTicket` as the assessment spine for the deck; do not leave them only in the syllabus card.
- Teach the listed key terms and definitions explicitly, with Chinese support for the terms, objectives, difficult prompts and formula wording.
- Use `references/investment-analysis-definitions.md` as the source for every presentation definition. If a term has a CFA glossary match in `references/investment-analysis-cfa-glossary-matches.json`, preserve that CFA-inspired meaning in the slide wording; if no match exists, write a complete definition in the same precise textbook style.
- Add concise Simplified Chinese support for important student-facing teaching text as standard: slide titles, term definitions, core prompts/tasks, main answer/reveal text, flow/answer items and quiz prompts/explanations. Do not translate minor source metadata, codes, dates, numeric values, UI chrome or teacher notes unless they carry the concept.
- Use the listed formulae and calculation wording where applicable; if a lesson has no new formula, include an evidence-reading or judgement check instead.
- Use `investment choice` as the student-facing umbrella. Use the more precise `asset class`, `security`, `fixed-income security`, `fund` or `investment vehicle`, and `deposit product` when the category matters. Reserve `investment product` for a provider offering, factsheet, terms, fees, disclosure or suitability context.
- Record the relevant security, fund, provider product, market, company or family-case label; source title; source URL; publication date; accessed date; key figures; and what the evidence can and cannot prove. Add stock code or listing details when a listed company is used.
- Run the `sourceFitAudit` and check `caseReview` before building a deck; if the source pack fails, replace the company only with a case that preserves the same unit role, skill target and assessment blueprint.
- Build the lesson handout from the six `artifactBlueprint.handoutBlocks` in `course-map-financial-decisions-data.js`: grounded scenario and source box, vocabulary, Evidence and Data Analysis, calculation or judgement task, misconception check and individual written output.
- The Evidence and Data Analysis block should reuse the grounded scenario and work like a compact Cambridge Section A-style worksheet: short case information, then identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions.
- When a Unit 1 lesson has `passportCheckpoint`, keep its mock-case output as the assessable task and end the deck with exactly one `Passport Update` slide. Display the checkpoint during the final five minutes, direct students to the matching page in the separate booklet, and assign only unfinished work as homework. Add an opening teacher note for the one-minute private reread; do not duplicate Passport response boxes in the normal lesson handout.
- Preserve the Passport `pageLayout`: one uncluttered two-column table per lesson, with four numbered rows. Put one direct instruction on the left and only the required choices, sentence frames and writing space on the right; do not repeat the prompt in separate cards or answer-type panels.
- Preserve each checkpoint's `answerFormats` exactly enough that students can see the required response mode before writing. Use finite tick choices, short classifications, supplied calculations or sentence frames; do not replace these with a blank reflection box or a vague open-ended question.
- Preserve the Passport safeguards exactly: broad time and priority bands only, a plausible future-self goal as an alternative, no real family financial figures, no named products and no required public sharing of personal goals.
- The textbook is the compiled sequence of lesson handouts only; do not add separate textbook-only teaching chapters.
- One-class team tasks are allowed for scenario sorting, quote-page reading, ETF comparison and quick risk debate, but they must end with an individual written check.
- The required year-long SMG portfolio and its six cumulative unit outputs are the deliberate exception to the normal ban on invented multi-lesson projects. Do not add a second portfolio, report or final-project sequence beside them.

Visual rhythm:

- Keep each projected slide to one main idea or student action.
- Do not combine a dense table, chart, photo and prompt on the same slide.
- Keep section dividers closer to the economics-presentation divider style: simple reset screen, no lesson-map card, no image column.
- Use visuals like the Economics decks: a hook visual creates a concrete classroom decision, and an image-only `visualPause` directly prepares the next definition, example or evidence-reading task.
- Every visual should have a purpose in teacher notes: what students observe, what misconception it exposes, and which concept comes next. Remove decorative finance photos when students do not need the image to answer.
- Charts are evidence-reading surfaces, not automatic openers. Place them after the student has a reason to inspect what the chart can and cannot prove.
- Use `dataSnapshot` for three key metrics plus a short reading task; keep detailed rows in notes, sources or a separate focused slide.
- Use `conceptTriad` when students must compare three beginner concepts with definition, purpose, risk level, time horizon and example.
- Use `visualGrid` when students need to compare concrete examples through pictures, such as asset types. Keep labels short and make each image necessary for the classification or recall task.
- Use `compare` when students need a clean two-column contrast with fill-in blanks, such as evidence-based analysis versus weak opinion.
- Use `classificationTask` when students classify cases into taught categories and then reveal the reason.
- Use `yesNoCheck` when a misconception can be tested as a yes/no vote before the explanation. Each full-width row should be easy to scan; clicking a choice scores it and lets the verdict and reason replace the vote choices.
- Use `rankingTask` when students must assign ranks to choices on a low-to-high line and defend the sequence with evidence. Keep the attempt and revealed model as single-column reading surfaces.
- Use `sourceLens` when students must test whether a source can support a claim: source title, publisher, date, unit, scope and limitation.
- Use `quoteMap` when students must read a quote page: company, code, exchange, price, date/time and source before making an opinion.
- Use `comparisonMatrix` when students compare two or three choices against the same criteria such as evidence, possible return, risk and price paid.
- Use `evidenceSimulator` when the teacher controls a progressive evidence case on the classroom screen. Limit the case to four clues and three action-based choices, preserve the prompt and revealed clues, and use the conclusion to model how the next step changed rather than to recommend a real product.
- Use `catalystTimeline` when students connect new information, expectations and price movement without overclaiming causation.
- Use `judgementFrame` when students need to assemble a balanced investment judgement from evidence, return, risk and price paid.
- Use `analystBoard` with `revealBlocks: true` and `riskRegister` with `revealEffects: true` for staged evidence/risk thinking, not crowded dashboard panels.
- Use `exam` with `revealKeywords: true` when students should plan before seeing the keyword scaffold.
- Use `modelAnswer` with `cueLabel` and `cueText` so the comparison instruction matches the question.
- Keep landing-page copy student-facing: lesson actions, what students will learn, and clear quiz/data links.
- For a title-only course or lesson opener that should read as the main classroom title, set `prominentTitle: true` and keep the slide clean; avoid a subtitle unless it adds necessary information.

Typography rhythm:

- Projected teaching text uses one text face and two sizes: 48px for slide/term/section titles and 32px for lesson content.
- Do not create special font sizes for metrics, terms, formulas, choices, prompts or model answers; use weight and spacing lightly instead.
- Keep source panels, captions and deck chrome visually quiet so they do not compete with the teaching surface.
- Use modern local photos for visual pauses and context backgrounds. `visualPause` slides must project only the picture: no visible title, prompt, caption or credit. Put the teaching bridge in notes or on an adjacent slide.
- Avoid old stock certificates, archival trading-floor imagery and museum-value photos unless the lesson explicitly teaches historical context.
- Check `investment-analysis/photo-archive.html` or run `node scripts/export-investment-photo-archive.js --format md` before sourcing new images. The archive groups usable local photos by category, lesson fit, tags and slide use.
- Use archive keys in decks with `visual: window.INVEST.photos?.<photoKey>` so generated slides keep credits, captions and local paths from `assets/js/investment-photos.js`.
- Download new high-resolution photos when the catalogue match is weak, resize them to projection quality, and add complete metadata in `assets/js/investment-photos.js`.
