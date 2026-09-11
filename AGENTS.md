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

- Use English given names for fictional student cases, including within Chinese support. Keep names consistent across a connected case and its questions, answers and notes. Preserve real people's names in sources and credits (11 September 2026).

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
