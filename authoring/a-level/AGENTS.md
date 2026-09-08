# A-level classroom presentation instructions

## Consolidated ownership

Work from `C:\Users\oehle\Documents\oehler-huang-platform`. Read the root
`AGENTS.md` and `authoring/README.md`. This folder holds non-public planning and
source tools; the canonical HTML lessons live under `apps/library/` and are edited
directly there. Never sync from the deprecated sibling course project.

The course landing page determines active status. Unlinked lessons and unused
lesson types are legacy references. Use the linked HTML lessons as the default
for new work. The PowerPoint-specific rules below apply only to an explicitly
requested PowerPoint task; they do not override the current HTML course system.

## Exam alignment and authentic practice

Standing teaching preference, recorded 8 September 2026:

- Prioritise real Cambridge 9708 past-paper questions over made-up questions. Include both Paper 3 multiple-choice questions and Paper 4 written questions in relevant lessons and course materials. Search the local question-paper and mark-scheme corpus before authoring substitutes.
- Design explanations, worked examples, diagrams and practice around what students must do in exam-like questions. Identify the assessed concepts, command words, application, calculations, analysis and evaluation before deciding the teaching sequence. Teach the reasoning needed to transfer knowledge to unfamiliar questions.
- Verify each selected question against its original paper and published mark scheme. Record the paper code, series, question number, marks and source pages. Preserve wording, data and option order; clearly label any adaptations and teacher-created questions.
- Model how to answer for full marks, using the specific mark scheme and assessment objectives. For Paper 3, explain the correct answer and diagnose plausible distractors. For Paper 4, show how to interpret the task, plan an answer and develop a complete response with relevant application, causal analysis, diagrams or calculations, evaluation and a supported judgement where required.
- Make the route to credit visible: annotate model answers to explain why their steps or paragraphs earn marks or meet level descriptors. Distinguish official marking guidance from teacher-written models; do not invent point allocations for levels-based questions or promise a guaranteed mark.
- Present questions before revealing worked methods and model answers, then provide an opportunity for independent exam-style practice. Use teacher-created questions mainly for scaffolding or gaps that suitable real questions do not cover, rather than as the default assessment material.
- Select questions that fit the taught prerequisites. When a useful Paper 4 question spans later topics, retain it as clearly signposted later consolidation and revisit it when those topics have been taught; do not silently omit written-paper preparation or teach unsupported shortcuts.

## Student PDF requests

For student PDF exports, follow [PDF-EXPORT.md](PDF-EXPORT.md) and use
`scripts/export-pdf.mjs` against the canonical active HTML deck. Preserve every
diagram stage with its explanation and keep questions before revealed answers.
Verify the rendered PDF, including all diagram stages, before delivery. Do not
use ordinary browser Print or the retained legacy PowerPoint as the export source.

## Default edit mode

Default to a fast, focused edit for an existing classroom deck when the user asks to change wording, explanations, questions, answers, notes, pacing, or a small number of slides. Treat a new deck, substantial rewrite, redesign, template change, or final publication as a full presentation job.

For a focused edit:

- Identify the target deck and slides first. Inspect the target slides and their immediate neighbours before editing; do not repeatedly reconstruct the lesson narrative or research claims that are not changing.
- Preserve the existing theme, masters, layouts, images, and unaffected slide content.
- Edit inherited elements in place. Do not redesign surrounding slides or replace assets unless the request requires it.
- During iteration, render and inspect only the changed slides. After the edit is stable, perform one complete final render and overflow check of the delivered deck.
- Produce one requested output. Do not create chains of files named `revised`, `refined`, `updated`, `final-2`, or similar unless the user asks for alternatives.
- Keep scratch inspections, renders, extracted media, and experimental builders under `tmp`; do not present them as deliverables.

## Durable source for maintained decks

Do not leave the only reusable authoring or edit logic in `tmp` for a deck that will be revised again.

- Store durable deck source under `deck-sources/<deck-slug>/`, with the source module, any immutable base/template deck, and deck-specific assets together.
- Treat the durable source as authoritative and the `.pptx` as its generated classroom output once a deck has been migrated to this structure.
- Reuse the durable source for later edits instead of importing, reverse-engineering, or rebuilding the PowerPoint from scratch.
- Give programmatically maintained slides stable IDs so a later request can target a slide without rescanning the whole deck.
- Keep shared layout/theme helpers separate from lesson content when that materially reduces repeated work, but do not introduce a framework for a one-off deck.
- If an actively maintained deck has no durable source, create the reusable source during the next substantial revision. For a genuinely small urgent edit, modify the existing deck without turning the request into a migration project.

## Validation levels

- Content-only change: inspect the affected slides and their neighbours during iteration, then do one final whole-deck render and overflow check.
- Layout, image, chart, or diagram change: inspect every affected slide at full size and check crops, wrapping, overlap, and readability.
- Template, master, or shared-helper change: inspect representative descendants during iteration and every final slide before delivery.
- Final publication or handoff: run the complete presentation quality workflow once after all requested changes are settled.

## Senior high classroom slide titles

Use a two-level title system for senior high classroom decks:

- Put the slide's classroom function in a small, consistent label, such as `STARTER`, `LESSON OVERVIEW`, `RETRIEVAL`, `CONCEPT`, `DIAGRAM`, `WORKED EXAMPLE`, `QUICK CHECK`, `FEEDBACK`, `EVALUATION`, `SYNTHESIS`, `EXAM PRACTICE`, `MODEL ANSWER`, or `SUMMARY`.
- Make the main title name the academic subject directly. Prefer a concise noun phrase for definitions, processes, setup, and reference slides. Use a factual takeaway only when the slide's evidence directly supports it.
- Use sentence case, omit trailing periods, and keep the main title to about 4-10 words and no more than two lines.
- Keep instructional verbs such as "retrieve", "classify", "check", and "apply" out of the main title; the function label already communicates the task.
- Reserve question titles for genuine opening enquiries or discussion prompts.
- Keep syllabus numbers in the cover, section label, or footer rather than routinely placing them in main titles.

## Concept-led classroom visuals

- Use photographs and generated images as teaching evidence, prompts, or scenarios rather than decoration. Each visual should make a mechanism, distinction, assumption, or applied context easier to reason about.
- Include visual-pause slides at useful changes of pace. Show one strong image with one genuine question, allow silent looking time, and use the teacher notes to guide the intended inference before introducing the formal concept.
- Prefer high-quality real photography when a real setting can carry the idea, including households, workplaces, infrastructure, production, and trade. Use AI-generated photographs when a counterfactual or carefully staged scenario is needed to make an abstract model visible.
- Avoid generic illustrations, generic business imagery, repeated decorative photos, and pictures that merely restate the slide title.
- On photo-case slides, connect concrete details in the image to an explicit economics classification, causal chain, calculation, or evaluation question.
- For a lesson of roughly 40 slides, aim for several distinct visual moments distributed through the sequence, while keeping diagrams, tables, and worked examples where they are the better teaching form.

## Mathematical notation

- Match the current multiplier-deck convention: set equations in the deck's clean sans-serif typeface, with variables, symbols, numerals, units, and explanatory prose upright.
- Use proper mathematical symbols such as `Δ`, `×`, `÷`, and `−` rather than improvised `d`, `x`, `/`, or hyphen-minus notation.
- Use true subscripts and superscripts instead of baseline approximations. For example, show disposable income as `Y` with a subscript `d`, not `Yd`.
- In worked calculations, put each logical equation, substitution, and result on its own line so students can follow the method vertically.
- Keep the same notation in equations, worked examples, tables, questions, feedback, diagrams, and teacher notes.
- Keep short inline expressions together so a variable and its subscript do not split across lines.

## Lists, definitions, and causal structure

- Do not default to the same numbered-list layout for unrelated content types. Match the layout to the intellectual relationship between the points.
- For determinant sets and other concrete categories, use a specifically relevant photograph for each point when the images help students distinguish the factors, following the investment-course visual-card pattern.
- Use a compact table when students need to compare the same dimensions across several factors or when a table uses the screen more clearly than separate list items.
- Show mechanisms as one continuous directional path with prominent numbered nodes and short connector labels. Make each link state why the next change follows; do not present a causal sequence as independent text columns with floating arrows.
- Give important technical concepts a dedicated definition slide before applying the concept. Show the English key term and definition together with a concise Simplified Chinese translation.
- Do not place generic takeaway statements in a footer at the bottom of content slides. Remove redundant statements, integrate necessary explanation into the main content, or promote a genuinely important insight into its own appropriately placed slide or evidence-led title.
