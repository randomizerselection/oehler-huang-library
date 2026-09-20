# Oehler-Huang platform instructions

## Project layout

- `apps/library`: public lessons and Investment Analysis content.
- `apps/platform`: authenticated Node/SQLite application and EconMark.
- `apps/student-selector`: teacher-only selector UI and its preserved history.
- `packages/contracts`: app-independent content contracts and public-file policy, shared by builders, server and release tooling. Apps must declare this dependency and must not import sibling app implementations.
- `authoring/investment-course` and `authoring/a-level`: non-public course planning, preferences, export/check tools and retained PowerPoint references. Start all new course work in this repository.

## Course ownership and legacy material

- Course landing pages determine which lessons are active. Lessons and lesson types not linked from the relevant course landing page are legacy. Preserve them as references; do not use them as default templates or add them back to the catalogue without a user request.
- Edit Investment HTML directly under `apps/library/investment-analysis/lessons/`, using its `course-assets/` renderer. Read that course's `AGENTS.md` and `authoring/investment-course/planning/LESSON_DECK_PREFERENCES.md` first. The older `unit-1/`, `_template/` and Economics-renderer Investment system are legacy.
- Edit A-level HTML directly under `apps/library/a-level/lessons/`, using `apps/library/a-level/shared-html/`. Read that course's `AGENTS.md` and `authoring/a-level/AGENTS.md` first.
- Use the slide kinds demonstrated by the linked lessons. An unused renderer branch or an old all-types demonstration does not make a lesson type current. Preserve each course's own design and interactions.
- The sibling `investment-course` and `a-level` projects are deprecated recovery copies. Do not edit them, sync from them, or create another HTML source under `authoring/`.
- Keep planning, templates, PowerPoint builders and classroom export files outside `apps/library`. See `authoring/README.md` for the current paths and external reference archive.
- Complete a new HTML lesson by linking it from its course landing page and updating the relevant catalogue checks; until then, label it explicitly as a draft.

Run root commands from this directory. Do not deploy public roster CSV files or add secrets, databases, uploads, backups, generated reports, or provider credentials to Git.

Read `docs/ARCHITECTURE.md` for architecture work. Keep course renderers owned by
their courses. New shared application contracts belong under `packages/`; private
authoring stays outside public roots. `npm run check:architecture` enforces module
boundaries. `npm run release:plan` previews the explicit release inputs. Legacy
generator checks run through `npm run test:legacy`, not the active lesson baseline.

## Teaching preference: introduce the logic before the definition

For future topic introductions, first demonstrate how the idea works through a
concrete example. Make the visual or content structure follow the concept's
logic, using a sequence, comparison or cause-and-effect chain as appropriate.
Let students see and explain the mechanism before presenting a concise definition
to consolidate it. For example, show money earning interest, that interest staying
invested, and the larger balance earning interest again before defining compounding.
Apply this when creating or revising introductions; preserve each course's own
design and interactions.

## Standing classroom-deck preferences

- A-level coverage, 20 September 2026: the 40-minute growth/output-gap lesson ended after `gap-measures` (slide 20), before `fiscal-expansion-section`. Next is the prepared 40-minute `9-2-2-fiscal-expansion-multiplier` continuation, not the business cycle. Keep eight minutes for independent paragraphs; the complete essay is homework/later writing. See `authoring/a-level/planning/TEACHING_PROGRESS.md`; prepared content is not taught coverage.

- A-level diagram axes use English-only labels, without Chinese translations (20 September 2026). This overrides the broader bilingual chart-label preference for axes.

- A-level clarification, 20 September 2026: AD/AS is already known by this class. Use Keynesian diagrams without reteaching their ranges or a generic comparison with SRAS/LRAS. Distinguish core syllabus/mark-scheme requirements from optional techniques; time-series output gaps and percentage-gap calculations are optional in the growth/output-gap deck. Retrieve expenditure–output analysis when applying the multiplier, in line with the textbook sequence. Details and diagram-benchmark evidence are in `authoring/a-level/AGENTS.md`.

- A-level feedback, 20 September 2026: give key terms complete mark-scheme-aligned definitions; equivalences alone are insufficient. Remove empty labels, and use academic titles that identify the concept/model and teaching sequence. Lead AD/AS teaching with the three ranges of Keynesian AS, while teaching SRAS/LRAS where useful. Compare PPC, AD/AS and expenditure–output using connected examples and explicit model assumptions. Use true subscripts and stacked fractions throughout. Remove obsolete case studies when the assessed question changes, and retain worked examples only for relevant assessed reasoning. See `authoring/a-level/AGENTS.md` for details.

- Keep real-world example slides to about one sentence over a suitable full-screen photo, with details in teacher notes and on-demand sources. In essay workshops, move directly from the guiding sub-questions to model sentences; omit an extra argument-plan slide between them (15 September 2026).

- Explain expenditure gaps intuitively as the initial spending adjustment needed for full employment: an extra autonomous injection for a deflationary gap, and a spending reduction to remove excess demand for an inflationary gap. Keep the formal definitions alongside this explanation. Show the two gaps on separate diagrams, using consistent scales and benchmarks; distinguish the spending adjustment from the multiplied change in income (15 September 2026).

- Before defining equilibrium and full employment, show a simple visualization of spending matching output while some productive resources remain unused. Reveal the unused capacity after students see the matching amounts, then name the concepts on the following comparison slide. Do not repeat the definitions in an opening text comparison or introduce inventory adjustment and income feedback here (15 September 2026).

- For essay workshops, break the original question into clear guiding sub-questions labelled by AO. Prompt students to draw, label and use diagrams where they support explanation or policy analysis (14 September 2026).

- Finish opening retrieval before beginning the topic's visual explanation and keep that explanation connected to the following teaching. Give past-paper slides descriptive academic titles with paper codes as smaller references. Name formula slides for what they calculate. End with “Summary” and a concise list of the key lessons, rather than a contrast layout (14 September 2026).

- A-level feedback, 14 September 2026: use original past-paper questions for retrieval, practice and exits; open with a concise educational-explainer mechanism rather than a long fictional case. Integrate definitions into meaningful comparisons and teach opposite concepts together. Provide small on-demand source controls. Model essays with the original question visible, staged prose, highlighted causal relationships and aligned AO annotations; teach planning, analysis, conditional evaluation and judgement instead of using Given/Method columns. Preserve each question's original mark scheme and distinguish teacher models from official answers.

- Teach macroeconomic concepts with economy-wide examples and aggregate spending–income feedback. Do not substitute a single firm's sales/capacity for national-income equilibrium or one product's price rise for inflation. Household and firm examples should explain a specified link in the aggregate mechanism, with the scope clear (14 September 2026).

- Use English given names for all fictional scenarios, including Chinese support. Use Emma instead of Mei, Lucy instead of Lin, and Jack instead of Jun; keep each name consistent through connected cases, questions, answers, image descriptions and teacher notes. Preserve real names in sources and credits. (reaffirmed 13 September 2026).

- For mathematical explanations, prefer a short visible derivation with stated assumptions. Use consistent upright notation, readable stacked fractions and vertically arranged worked calculations, with clear emphasis on the final result (multiplier-deck feedback, 10 September 2026).
- For classroom-deck PDFs, use one completed view per source slide. Export the
  final diagram state and completed animated content; do not add a page per
  animation step. Keep question pages before separately revealed answers.
  This compact PDF preference was requested on 10 September 2026.

Carry forward the user's feedback across deck revisions and future decks:

- Treat slide feedback as a durable preference: update the relevant saved course guidance whenever the user revises a deck. Use a relevant background picture on the hero and a concrete, engaging subtitle that suggests the mechanism students will investigate.
- Highlight only the phrases that distinguish concepts or define the causal relationship. Make Chinese support large enough to read comfortably in class, with explicit sizing rather than small inherited text.
- Reveal comparison sides and determinant-table rows one at a time with reversible clicks. Follow an important conceptual comparison with a diagram of the same distinction.
- Make diagram-stage titles state the economic relationship rather than a generic instruction. Complete equilibrium diagrams with the new equilibrium, labelled income and the change from the original position.
- Keep definitions concise and direct. Put the defining relationship first, highlight its key phrases, and move introductory commentary into the explanation or teacher notes.
- Make each example's title and visible explanation identify what students should learn from its data. Remove repeated exposition or turn it into independent practice. Use memorable, countable visuals to connect quantities to mechanisms.
- Give every worked example an explicit question before revealing the method. Keep the original question, data and options visible during exam feedback. Add retrieval and hinge checks between conceptual steps, with explanations of distractors and guidance for reteaching before moving on.
- Name evaluation factors neutrally, and show clearly which circumstances strengthen versus weaken or delay the effect; avoid listing obstacles under a title that implies they all strengthen it.

- Make hooks concrete, student-answerable and directly connected to the mechanism being taught. Include a directly relevant picture and selective Chinese support for difficult terms; avoid translating the whole opening challenge. For investment lessons, a dated long-term investment guessing challenge with a closest-answer prize is a useful pattern.
- Keep three concise bilingual learning objectives prominent. Remove secondary captions and other labels that distract from them; use simple visuals only when they clarify the goals.
- Name sections after specific knowledge points. Add Chinese support to important teaching titles and chart labels while preserving each course's design.
- Remove detours and repeated explanations that dilute the main lesson. In compound growth, do not restore the removed withdrawing-versus-reinvesting comparison by default.
- Put section-introduction questions after the relevant divider. In a calculation section, show the main formula on the first teaching slide and keep it available through worked examples and practice. Demonstrating the mechanism in an earlier section already satisfies the logic-before-definition preference; it is not a reason to bury the formula.
- Teach the effect of a changing input by holding the others constant. Use a concrete knowledge point such as the effects of return rate and investment time instead of a vague section on assumptions and projections.
- Ask an explicit question before showing a worked solution, keep the answer hidden for an initial attempt, and state what students should do with follow-up diagrams. Explain essential terms when first used, preferably concisely on the formula slide. Quick checks should require application rather than obvious recall. When showing accumulation over time, use a long enough period and click-by-click steps so students can see the difference develop.

- Use connected student cases with a named person, specific goal, budget and deadline. Tie visual pauses to the following case, carry the case through later comparisons, and remove generic repeated exercises. Show complete modelled reasoning when a question needs multiple steps. A section must build a coherent explanation around its stated teaching question.
- Use student goals that match the class’s current interests and support substantive cases with pictures. Name a section after its core concept and state forecast assumptions explicitly. Place a couple of optional questions with revealed model answers after the main lesson ending for spare time.

## Required validation

Future Investment lessons need a concrete new skill or rigorous knowledge point, with explicit teaching, a full worked model, independent practice and an assessed exit. Asset pictures, evidence and general discussion should support that learning. See the saved lesson preferences for the Assumed return example.

For Investment lesson planning, read `authoring/investment-course/planning/TEACHING_PROGRESS.md` before creating the next deck. Teacher-reported coverage overrides the original pacing estimate. On 9 September 2026 the class finished Compound growth through slide 22 and stopped before Assumed return; Lesson 4 is the untaught continuation. Do not infer that prepared slides were taught. Preserve time for discussion, independent answers and feedback, and keep extensions after the core ending.

Carry forward highlighted bilingual definition terms, image-led asset comparisons followed by sourced historical line graphs, and a single sequential list for forecast assumptions. Match the visual structure to the idea being taught.

- Run `npm test` after cross-application changes.
- For a content-only edit to an existing `slides.js` or `slides-lesson-*.js`, use the fast lesson-edit path: check the changed file's JavaScript syntax, open the affected lesson, and inspect the changed slides plus their immediate neighbours at the normal classroom viewport. Do not run unrelated browser suites.
- Do not run `npm run build:content` for slides-only or flashcards-only edits. The content builder does not read those files.
- Run `npm run build:content` when lesson HTML routes or titles, referenced quiz files, quiz data, or the content-generation script changes.
- Run `npm run test:smoke --workspace=@oehler-huang/library` after a new lesson, a substantial lesson restructure, or changes to lesson navigation, quiz behaviour, handouts, indexes, or shared presentation code.
- Run responsive or regression tests only when the change affects layout behaviour, shared CSS/JavaScript, renderers, images, print/handout output, mobile behaviour, or multiple lessons.
- For UI changes, start with `npm start`, verify `/api/config`, and use the installed in-app Browser against localhost. Run the EconMark public single-answer flow and the 30-student synthetic batch flow.
- Reload the controlled browser tab after source changes before inspecting the DOM or taking screenshots.

## Fast classroom-deck edits

### Stable slide references

All active HTML decks expose a copyable source-file-plus-slide-ID reference through
the slide counter, More menu and Overview. See `docs/SLIDE_REFERENCES.md`. Resolve
pasted references under `apps/library/` and edit the object with that exact `id`.
Preserve IDs through wording changes and reordering; give new or duplicated slides
new unique IDs. Never renumber or regenerate existing IDs from titles or positions.

For short A-level starter PowerPoints, keep timing and classroom-management
guidance in teacher notes and preserve manually removed task-slide labels. See
`authoring/a-level/AGENTS.md` for the 10 September 2026 starter preference.

Default to a focused content edit when the user asks to change wording, explanations, questions, answers, teacher notes, lesson pace, or a small number of slides in an existing deck.

- Locate the target slide data with `rg` and read only the target objects, their immediate context, and source passages needed for claims that are actually changing.
- Preserve existing slide types, styling, images, navigation, quizzes, flashcards, and shared files unless the request requires changing them.
- Do not research unchanged facts, review unrelated lessons, create alternate versions, or broaden a content edit into a redesign.
- Make one focused edit pass, run the narrow validation above, and stop when the requested slides render correctly.
- Use broader review only for new lessons, substantial rewrites, shared-component changes, new or replaced images, responsive/print changes, or deployment.

## Deployment safety

- Public DNS remains unchanged until ICP approval and explicit user authorization.
- Production code is release-versioned and read-only to the service account. Persistent data stays outside release directories.
- Never automatically delete uploads or learning records. At the configured disk stop threshold, reject only new uploads.

## IGCSE Economics lesson preferences

Before creating or substantially revising IGCSE Economics decks, read
`authoring/igcse-economics/LESSON_DECK_PREFERENCES.md`. It records the latest
user feedback on syllabus/mark-scheme wording, Paper 2 modelling, question
difficulty, discussion layouts, definition slides and banking visuals, and
overrides older conflicting lesson-builder defaults.

## Student data: platform database is the source of truth

- Student rosters, class memberships, attendance and homework records live in the platform database (`.platform-data/econmark.sqlite`, git-ignored). This replaces the `C:\Users\oehle\Documents\name-lists\outputs\20260910-s3-name-list` Excel workflow; that workbook is a historical snapshot only — do not regenerate spreadsheet name lists as the working copy (17 September 2026).
- View and manage students through the teacher "学生数据" tab (`/econmark/teacher?tab=students`) or the platform store/API. The student selector, the DingTalk homework checker and future integrations should all read from this shared data pool rather than keeping separate copies.
- QQ homework submissions (IC3 classes) flow through the same pool: the `qq-ic3` automation at `C:\Users\oehle\Documents\name-lists\automation\qq-ic3\` (NapCatQQ OneBot v11 transport, teacher QQ 1507125549) writes `homework_submissions` with `source='qq'` and links students via `student_integrations(provider='qq', external_id=<QQ number>)` (18 September 2026).
- Homework automation source and shared orchestration now belong to `apps/platform/homework/`. Read its `README.md` and `REVIEW.md` for changes or regular checks. The private `.platform-data/homework/runtime.json` registry preserves existing QQ/S3 runtime directories and delivery histories; legacy Python paths are compatibility launchers. Preserve the Codex S3.3/S3.4, Kimi S3.6, and Kimi QQ class/model boundaries. Run `npm run test:homework` after changes. Do not duplicate or reset live state, or move the running transport/credential stores (19 September 2026).
- Student account credentials live only in git-ignored `authoring/**/outputs/` PRIVATE files. Never commit credentials or `.platform-data/`.
- Student IDs (`accounts.student_id`) use the school-issued 学号 wherever the name-list workbook provides one (currently S3.3/S3.4/S3.6, 8-digit `2024xxxx`). IC classes had no school IDs in the 20260910 workbook (IC2.2/IC2.3's "Student No." column is class-internal numbering, not a school ID); they keep provisional `STU-####` IDs until the school list is supplied. When a school 学号 becomes available, prefer it over the provisional ID.
- Administrative/form class is stored separately in `accounts.form_class`. For current eight-digit school IDs, the fifth digit is the form class (`20241025` → class 1, `20244019` → class 4); valid values are 1–6. Course-class membership remains in `class_memberships` because students from several form classes may share one Economics course.
