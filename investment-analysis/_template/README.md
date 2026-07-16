# Investment and Financial Decision-Making Lesson Template

Use this folder as the starting point for future `investment-analysis/unit-x/lesson-y/` decks.

Before creating or updating a deck, follow `DESIGN-LANGUAGE.md`. It is the source of truth for Investment Analysis typography, slide density, landing-page structure and visual QA.

Also check `../course-map-financial-decisions-data.js` before drafting the lesson. It is the active course-level source for the family, investment-choice, market or company case anchor, `decisionFirst` teaching contract, student hook, simple lesson flow, Grade 9 guiding question, core claim, case role, key terms, definitions, formulae, retrieval practice, analyse-why question, practical investment action, required `stockMarketGame` core lab, assigned SMG workbook pages, concise-insert rule, source pack, assessment blueprint, checkpoint pattern and individual classroom output for each taught lesson. `../syllabus.html` renders its table and lesson cards from that structured source. The former company-analysis route remains in `../course-map-data.js` for archive maintenance only.

Generator context:

- From the repo root, run `node scripts/export-investment-generator-context.js --lesson 2 --target lesson --format md` before drafting a new active-course deck.
- The default and `--syllabus financial-decisions` selectors load the active course. Use `--syllabus company-analysis` only when maintaining an archived lesson.
- Use `--target deck`, `--target handout`, `--target activity-insert`, `--target quiz`, `--target exam` or `--target textbook` when building a specific lesson material.
- Generate `--target activity-insert` only when the active lesson context says `applicable: true`. An assigned official workbook page makes the insert inapplicable because the page already holds the student work.
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
- Reuse the same scenario evidence in at least one projected lesson activity and in the workbook or separately labelled activity insert. Do not place the scenario task in the content-only handout.
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
- `quiz` slides, including hinge questions and quick checks, should show exactly one bilingual question in `title` and `zhTitle`. Do not add a second `question` / `zh` prompt in the body; place the answer choices directly below the title.
- `discussion.revealTitle` and `discussion.revealTitleZh` must be the complete short answer: one English sentence followed by one Chinese sentence. Do not add `answer`, `answerZh` or a second explanatory paragraph to a discussion reveal.
- The English sentence must answer the exact question and name the missing information or next action; use a statement such as `One share is one ownership unit`, not a label such as `Model answer`, `Course rule`, `Bridge` or `Need more information before deciding`.
- Hooks should normally begin with a concrete student decision or dilemma, not a chart by default. Use a chart as evidence after students know what question the evidence is meant to answer.
- `section` dividers should stay quiet: part label, title, optional Chinese title, and the automatic progress strip. Use a concise academic topic or question students can copy into notebooks, such as `Investment and return` or `What is investment?`. Name the knowledge in the section; do not use an activity instruction, slogan, transition or full teaching claim. Do not add photos, prompt cards or manual roadmap lists.
- Causal and retrieval `flow` slides should contain meaningful `__________` blanks with `answer` values, so students predict the key concept links before reveal.
- Decision-method flows should use `flowStyle: "decisionChecks"` and `revealSteps: true`. Give every box a short, prominent bilingual header such as `Goal` / `目标`, use a question as the slide title, reveal the boxes one at a time, and use plain text rather than fill-in-the-blanks.
- `term` definitions should use `definitionBlanks` to blank conceptual payload words such as `ownership`, `identifier`, `market price` or `specific time`, not merely the term being defined. Keep the English `definition` text canonical and unmarked so validators, handouts and recall checks read the same wording.
- `term` slides should show the term, English definition and Chinese definition only; keep extra related terms out of the projected definition block.
- Use `compare` for a simple two-column T-table contrast. Use `comparisonMatrix` instead when students compare choices against three or four shared criteria.
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
- Build a visible `SMG core lab` segment into every deck before the individual exit. It must include the named team action, one concise team evidence row and an individual written judgement; a teacher note or final reminder is not sufficient.
- Capture the required SMG portfolio, watchlist, transaction, quote or benchmark snapshot at the start of the lesson. Do not make the deck, handout or assessment depend on live prices remaining unchanged.
- Complete one individual workbook judgement or activity insert. Add a team-log row when the lesson creates a team decision or monitoring update; do not generate a duplicate SMG worksheet, log or homework stream.
- Use `retrievalBase`, `formativeAssessment` and `exitTicket` as the assessment spine for the deck; do not leave them only in the syllabus card.
- Teach the listed key terms and definitions explicitly, with Chinese support for the terms, objectives, difficult prompts and formula wording.
- Use the active lesson's `terms` in `course-map-financial-decisions-data.js` as the canonical source for every active-course presentation definition. Use `references/investment-analysis-definitions.md` only when maintaining the archived company-analysis course or checking an exact legacy glossary match.
- Add concise Simplified Chinese support for important student-facing teaching text as standard: slide titles, term definitions, core prompts/tasks, main answer/reveal text, flow/answer items and quiz prompts/explanations. Do not translate minor source metadata, codes, dates, numeric values, UI chrome or teacher notes unless they carry the concept.
- Use the listed formulae and calculation wording where applicable; if a lesson has no new formula, include an evidence-reading or judgement check instead.
- Use `investment choice` as the student-facing umbrella. Use the more precise `asset class`, `security`, `fixed-income security`, `fund` or `investment vehicle`, and `deposit product` when the category matters. Reserve `investment product` for a provider offering, factsheet, terms, fees, disclosure or suitability context.
- Record the relevant security, fund, provider product, market, company or family-case label; source title; source URL; publication date; accessed date; key figures; and what the evidence can and cannot prove. Add stock code or listing details when a listed company is used.
- Run the `sourceFitAudit` and check `caseReview` before building a deck; if the source pack fails, replace the company only with a case that preserves the same unit role, skill target and assessment blueprint.
- Treat the complete SMG Essentials Workbook as the default individual work record. Name and use the exact `stockMarketGame.workbook.pages`, treatment and action in the lesson activity, not in the handout.
- Make the print handout a bilingual exam-revision sheet with exactly two `artifactBlueprint.handoutBlocks`: fill-in-the-blank key definitions followed by four to seven short numbered revision points.
- Every definition needs the English term, Chinese term, an English prompt with selected `__________` key words, an ordered `answers` array and a complete Simplified Chinese definition. Blanks must be answerable from content taught during the lesson.
- Write each numbered point as an English and Simplified Chinese pair of complete statements students can memorise. Across the list, cover the core principle, essential relationship, formula or qualitative decision rule and misconception correction.
- Do not place workbook directions, scenarios to analyse, evidence tasks, questions, writing lines, individual outputs or team-log instructions in the handout. If the workbook cannot hold essential student work, create a separately labelled activity insert and file it with the workbook.
- Keep the shared SMG team decision log authoritative for evidence, team decisions, dissent, order checks, platform status and review triggers. A workbook or insert answer never authorises a transaction.
- A compiled course knowledge handbook may consist of the lesson handouts verbatim with light unit navigation. Do not add textbook-only chapters or workbook activities.
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
- Use `yesNoCheck` when a misconception can be tested as a yes/no vote before the explanation. Each full-width row should be easy to scan; clicking a choice scores it and lets the verdict and reason replace the vote choices.
- Use `rankingTask` when students must assign ranks to choices on a low-to-high line and defend the sequence with evidence. Keep the attempt and revealed model as single-column reading surfaces.
- Use `sourceLens` when students must test whether a source can support a claim: source title, publisher, date, unit, scope and limitation.
- Use `quoteMap` when students must read a quote page: company, code, exchange, price, date/time and source before making an opinion.
- Use `comparisonMatrix` when students compare two or three choices against the same criteria such as evidence, possible return, risk and price paid.
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
