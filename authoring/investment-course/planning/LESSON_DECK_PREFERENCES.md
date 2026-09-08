# Investment course lesson-deck preferences

Work in `oehler-huang-platform`. The course landing page defines active lessons;
unlinked lessons and unused lesson types are legacy references. The linked HTML
lessons and their `course-assets/` renderer are the defaults for new lessons.
Paths to `lesson-XX/` below refer to retained PowerPoint material within
`authoring/investment-course/` and do not override that HTML design authority.
The current syllabus is `apps/library/investment-analysis/syllabus-2026-27.html`;
older planning documents are supporting references, not parallel editable syllabi.

Legacy PowerPoint Lesson 1 reference (not linked from the current course landing page): `lesson-01/Lesson 01 - What is investment.pptx`

Retained PowerPoint template (only when explicitly requested): `$artifact-template-investment-course-lesson-deck-v6`

Current HTML reference: `apps/library/investment-analysis/lessons/1-1-2-measuring-investment-return/index.html` (repository root), based on `lesson-02/Lesson 02 - Return on investment - Version 2 - Investment visual identity.pptx`

## Production speed

- For a small edit to an existing deck, use the current lesson PPTX as the source and inspect only the affected slides plus their immediate neighbours during iteration.
- Do not restart from the v6 template, compare historical versions, re-read all planning sources, or reconstruct the whole deck for a small edit.
- Reuse existing visuals and frozen claims unless the requested change requires new evidence or a new image.
- Keep one task-specific build directory and one updated output rather than creating a new builder and numbered deck for every feedback round.
- A quick draft needs targeted slide checks; reserve the complete every-slide render and inspection for the final classroom-ready version.
- New lessons should retain reusable authoring source under `lesson-XX/source/`, with stable slide IDs and lesson content separated from layout helpers where practical.
- Treat this preferences file as the default design brief. Re-audit older decks only when the user explicitly asks to infer or revise preferences.

## Communication and teaching structure

- Audience: junior-high students learning investment and financial decision-making.
- Open with one concrete, student-answerable dilemma before teaching the rule. The hook slide should contain one clear question only, supported where possible by real-world data and a directly relevant photograph.
- Show a short three-part lesson roadmap.
- Organise teaching into clearly numbered sections. Retain the Shanghai skyline divider treatment in PPT lessons that use the v6 template; preserve the Version 2 divider identity in the HTML course.
- Give every section a distinct, explicit purpose; do not reuse the same section label when one section teaches amounts/components and another teaches percentages or comparison.
- Teach one core idea at a time on clean white slides, then apply it immediately.
- Use an English-first bilingual approach: translate difficult financial terms into Simplified Chinese, but do not translate every sentence or ordinary label.
- Use the investment-analysis `termBank` glossary as the source of truth for definitions and its Chinese terminology where available.
- Concise classroom paraphrases are welcome when the glossary wording is too long; preserve its meaning and retain the full definition in teacher notes. For a financial-investment review, use a financial asset such as shares, not direct rental-property ownership.
- Introduce each new concept through its underlying logic before presenting a definition to memorise. Choose a visual or content structure that follows the idea: a sequence for a process, a comparison for a distinction, or a cause-and-effect chain for a mechanism. Use a concrete example and reveal its steps so students can explain what happens in their own words before naming the pattern. A decorative image beside a definition does not meet this preference.
- Definitions should then summarise the demonstrated concept: keep them self-contained and concise, retain the glossary meaning, and follow them with at least three concrete examples. Guided numerical demonstrations may come before definitions; independent classification or calculation with new terms comes after the mechanism, terminology and examples. For compounding, show original money earning a return, that return staying invested, and the larger balance earning a further return before defining compounding.
- Introduce how return differs across asset types—for example share-price gains and dividends, bond-price changes and coupon interest, REIT unit-price changes and distributions, and physical gold with no regular income—using real examples and meaningful pictures.
- Build from guided examples to classification, then MCQs, then short written judgements.
- Use student-facing titles such as “Check your understanding”; avoid internal pedagogical labels such as “hinge check”.
- Keep operating directions and teacher commentary off the projected slides: no “Write first, then click each blank”, “Complete the glossary definitions”, or redundant answer hints. Put these in teacher notes. Retain only the actual student question and necessary answer choices.
- Explain unfamiliar proper names separately from asset categories: Link (领展) is the name of a specific REIT. Use “external cash flow · 外部现金流” for investor contributions/withdrawals, not “new cash flow”; distinguish it from investment income.
- Use precise content titles. A table title should state what the table contains; a method slide should state what is being calculated; a comparison slide should name the exact distinction being demonstrated.
- For multi-step calculations or written judgements, use a separate model-answer state only when it materially helps teaching. Do not create an immediate duplicate answer slide for a fill-in-the-blank, MCQ, true/false or short classification check.
- End by returning to the opening decision and collecting an individual judgement.

## HTML lesson identity and interaction

- Future investment-course HTML lessons should continue the Lesson 2 Version 2 visual identity and remain visually close to the corresponding Version 2 PPT rather than drifting toward unrelated guidance or another course’s visual identity.
- On HTML hero slides, show the lesson’s actual bilingual syllabus hierarchy instead of generic editorial labels or subtitles. Keep the title image-led and uncluttered; do not add key-term boxes to the cover.
- Reuse the Economics HTML lessons’ interaction method for fill-in-the-blanks, MCQs, true/false and classification tasks: students answer first, then reveal or check the answer with a clear animated state on the same slide.
- Fill-in-the-blank and classification slides must clearly show the permitted answer choices when students are expected to select from a fixed set.
- Keep reveal animations purposeful and restrained: the answer, correctness and explanation should become unmistakable without decorative motion.
- On explanatory slides built from multiple boxes, use partial reveal so one box appears per forward click or key press before the lesson advances. Keep student task instructions and answer controls visible; their existing click-to-check interaction remains independent.
- Use occasional image-led visual pauses to reset attention or introduce evidence, but every pause must remain substantively connected to the next concept or real example.
- Preserve stable semantic slide IDs and reusable layout components so later lessons can extend the same HTML course system.

## Visual system

- Format: 16:9 widescreen.
- Title treatment: use a real-world photograph that directly relates to the lesson topic, with a strong dark gradient and a large title. Shanghai or future-facing finance imagery is suitable only when it is genuinely relevant.
- Divider treatment: deep navy skyline background with restrained network-light details and one large centred section title.
- Content treatment: warm white background, generous margins and one dominant teaching point per slide.
- Typography: large Arial-family sans serif; dark navy headings; near-black body copy; bold only for hierarchy or precise key terms.
- Accent palette: teal for core concepts, blue for numbering/questions, amber for future benefit or positive emphasis, coral for risk or possible loss.
- Use thin navy outlines and rounded rectangles for definitions or framing, not dense dashboard-style card grids.
- Prefer one strong image or a simple comparison over decorative graphics.
- Images are instructional evidence, not decoration. They should identify or explain the company, asset, institution, place, calculation or real example shown on the same slide—for example an Apple image beside an Apple share calculation.
- Use a real-world, topic-specific photograph for title and hook slides rather than a generic decorative image.
- A hook comparing two companies should put a relevant company photograph inside each company's evidence card, not use an exchange photograph for both.
- Preferred real-market comparison layout: pair each named asset or company with a substantive photograph and a compact, colour-coded table that separates price change, income and total return. Reuse this pattern for multi-asset comparisons, worked calculations and evidence-led practice when the image and data genuinely support one another.
- For review slides that compare several concrete concepts, use the same picture-plus-card logic where it improves retrieval: give each concept its own directly relevant photograph and keep the interactive definition or question beneath it.
- Keep projected text readable from the back of the classroom. Split dense material across slides rather than shrinking it.
- Keep HTML lesson navigation visually quiet. Avoid dark boxed control bars or rows of individually boxed buttons beneath the slides; use unobtrusive unboxed controls instead.
- Do not append small dark “Remember”, takeaway or reminder boxes below the main content. Put nonessential explanations in notes; present essential interpretation as plain, unboxed text.
- Use a consistent classroom type scale across HTML lessons. English titles and body text remain dominant; Chinese support should normally be one level smaller, but never reduced to caption size. Reserve the smallest text only for folios, source metadata and navigation—not instructional content.
- Correct obvious contrast and overflow problems while preserving the reference style; section titles must be white or otherwise high-contrast on navy.

## Assessment pattern

- Use evidence-based scenarios with named students or a mock family and realistic CNY amounts.
- Prefer dated real-company or real-asset data for practice questions whenever it can test the same skill cleanly; use fictional figures only when they are pedagogically necessary and label them clearly.
- Phrase real-company and real-asset questions as short cases of one or two complete sentences. Identify the investor and the asset or company, briefly explain any unfamiliar background such as what a REIT is, then give the evidence and ask the calculation or judgement; do not assume students already know the institution or asset structure.
- Present numerical inputs once per question: in the case prose or in an accompanying table, not both. Model answers should use the space for calculations and interpretation rather than repeat a separate input table.
- Avoid vague portfolio language such as “a Coca-Cola holding” or “starting holding” in beginner cases. State concretely what the investor bought and use labels such as “Coca-Cola shares”, “amount invested” and “ending value”.
- Prefer the latest available current-year evidence. When the current year is incomplete, label the example explicitly as year-to-date with exact start and end dates; otherwise use the latest completed reporting year. Retain older figures only when they provide a necessary contrast that current evidence cannot.
- Include a relevant company, asset or institution image on real-company calculation questions when space permits.
- Require students to cite the decision-relevant condition, not merely name a category.
- Include four or five MCQs with plausible misconceptions as distractors.
- Include two or three short-answer tasks with a small bilingual term bank.
- Model answers should visibly highlight the reasoning chain and key terms using the accent palette.
- Avoid personalised investment advice, live-price dependence and short-term trading instructions.

## Source and production expectations

- For every new lesson, download fresh, original, high-quality images that are specifically relevant to that lesson's content; do not reuse images from earlier lessons as the default visual solution.
- Use license-traceable sources and record the original image page and creator in the relevant slide's speaker notes.
- Freeze real figures by date and identify their source; label mock family details clearly.
- Choose examples whose income treatment is explicit. If an asset has no regular income, state that directly; do not imply an income component that the evidence does not establish.
- Keep externally sourced claims and visuals traceable in speaker notes.
- Preserve editability in the final PowerPoint.
- Render and inspect every slide before delivery; fix clipping, unintended overlap, weak contrast and unresolved placeholders.
