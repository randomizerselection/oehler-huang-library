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

### Stock Market Game setup, 11 September 2026

- Make printed role overviews fact based and specific: state when each role works, which fields to record, the original sources or actual SMG pages to consult, and the checks before reporting. Keep the three simple role names and bilingual wording. Distinguish classroom record requirements from official SMG duties; use the supplied account example without publishing account IDs. Keep research and trading after instruction, separate from the login-only weekend.

- Match screenshot instructions to the actual student HOME screen headed Account Info, as supplied by the teacher. Show the grey navigation, blue heading, Data as of and four balance cards. Ask for the team ID, date, Total Equity and Cash Balance; use placeholders in public examples. Do not invent a separate Account Summary destination when the observed page is HOME / Account Info.

- Keep role allocation immediately understandable: Organiser / 组长 (organise discussion and record decisions), Research lead / 研究负责人 (combine everyone’s evidence), Portfolio coordinator / 账户负责人 (check the account and agreed trades). Give each one main job and three short actions. Avoid compound job titles. Everyone finds information, checks risks and helps decide; A records why a decision was made, while C checks what happened. Apply these labels consistently to slides, QQ examples and printed sheets.

- Explain the game itself before setup: virtual starting cash, simulated investment in real eligible securities, changing portfolio values, and the later research–team decision–review routine. Make the link to return already studied explicit without treating Assumed return as prior learning. Keep this orientation short and distinguish it clearly from the login-only weekend task.

- Use `C:/Users/oehle/Documents/name-lists/IC3 Investment名单.xlsx` for Investment enrolment, not the full IC3 class lists. The teacher identified this as authoritative: 12 pupils from IC3.1 and 12 from IC3.2, 24 total.
- Keep game setup to a few minutes before Assumed return. Use eight student-chosen groups of three with one of nine accounts spare. Give every member a clear role, with shared decisions. Keep groups fixed and roles stable for the first half-term, then review at a teacher-announced checkpoint; do not impose automatic weekly rotation. Complete a one-off individual access check over the weekend.
- Keep student names and account credentials out of public lesson sources. Private team login slips and the enrolment checklist belong in ignored authoring outputs.
- User feedback on the launch: add Chinese directly beside all important instructions, not only headings. Use regular-weight body text and restrained emphasis rather than entire bold paragraphs. Add useful visual explanations such as counted groups, role icons, login-field guides and a concrete submission example.
- The first weekend task is shared onboarding: each member tries the same account once to find device/access problems. This is a classroom access check, not an official requirement for three logins. Any successful member saves one HOME / Account Info screenshot; the organiser sends one QQ message with team details, names, roles and honest login statuses (success, error or no device). Submit by Sunday 13 September at 20:00 China time even if someone cannot log in. No separate role-based weekend research jobs and no trades. Later, everyone contributes research and decisions and gets supported opportunities to use the account; one agreed operator enters each order with the portfolio/trade coordinator checking. Keep passwords hidden. The printable role guide should explain future duties, suitable interests, examples and shared responsibilities.

### Assumed return feedback, 11 September 2026

- Use English given names for fictional student cases instead of Chinese names or pinyin. In Assumed return, use Emma (formerly Mei), Lucy (formerly Lin) and Jack (formerly Jun). Keep the English spelling in Chinese support, questions, answers, image descriptions and notes; preserve the identity across continuing cases. Do not rename real people in evidence or credits.

- The hero must be engaging and visibly connected to the mechanism being taught. A generic product or money photograph is insufficient. Pair the topic title with a concrete subtitle that states the case, stakes or uncertainty; record conceptual/generated imagery honestly in the source notes.
- Include explicit retrieval questions based only on teacher-confirmed prior coverage. Use a short independent calculation as well as recall of meaning or method, with hidden answers and misconception feedback. Oral retrieval in notes alone is insufficient.
- An opening task needs one unambiguous instruction and a clear expected output. Avoid competing questions in the title, case and prompt. If students should calculate, say exactly which quantity and how to express the result.
- Keep three concise bilingual objectives prominent. Remove pictures that do not explain the skill or knowledge point; a decorative timeline or growth symbol is not automatically a useful preview.
- Teach numerical comparisons through reversible steps. Hold other inputs fixed, show the common start and target, ask students to predict or calculate the next step, then reveal it. Use a fixed labelled scale and keep future values hidden until their step.
- Teach annualised return as an equivalent constant compound rate for the same starting value, ending value and duration. Compare an uneven path with the equivalent steady path before consolidating the definition. Explicitly distinguish annualised return, each year's realised return, arithmetic-average return and a chosen forecast input.
- Give students real, dated endpoint data for annualised-return calculations, supported by relevant asset pictures. Include a full worked model and independent practice. State elapsed years, currency, reinvestment and cash-flow/cost treatment. A rebased benchmark is historical performance applied to a hypothetical starting investment, not a real student's transaction.
- Format forecast conditions as a single sequential list. Align each English statement directly with its faithful Chinese equivalent, using readable sizes. Use the same rate and case values throughout the list and its accompanying calculation.
- Place tasks under the concept they actually teach. A successive gain/loss example primarily tests compounding and annualised versus arithmetic-average return; do not label it an assumption without explicitly explaining the connection. Put useful extensions after the main assessed ending when they would crowd core practice.

These explicit preferences override the 10 September design inferences where they conflict. They also supersede older advice to add visual previews to every objective regardless of instructional value.

### Pacing and progress

- Consult `TEACHING_PROGRESS.md` before creating the next deck. The latest teacher-reported stopping point takes precedence over the original slide count or timetable allocation.
- A 40-minute lesson covered Compound growth through future-value practice, stopping before Assumed return. Do not plan the remaining evidence, graphs, assumptions and independent judgement as a brief tail to an already full lesson.
- Plan teaching time for discussion, calculator work, answer reveals and individual writing. Use about 18 core slides for the next continuation as a working estimate, not a universal slide limit. Reserve feedback/buffer time and put optional questions after the main ending.
- Introduce untaught carried-over material as new learning. Use only genuinely completed concepts in retrieval. Record the next stopping point before planning further lessons.

### Standing preferences confirmed on 9 September 2026

Apply these preferences to future decks and subsequent revisions, together with the earlier preferences below.

### Inferences applied when preparing Lesson 5 on 10 September 2026

The user asked to carry forward both explicit and implicit preferences from the most recent lesson. The following are design inferences from the prepared Assumed return deck, rather than new teacher-reported feedback:

- Preserve the coherent sequence from a named student's decision, through a precise calculation method and a full hidden model, to independent application and an assessed judgement. Keep original case data visible when showing the solution.
- Let evidence serve the current syllabus skill. Historical asset comparisons are valuable for choosing assumed returns; they are not a mandatory extra section in every lesson.
- Keep the main assessed method at the syllabus level, with more demanding related algebra after the core ending when it would otherwise displace independent practice and feedback.

The previously confirmed preferences continue below.

- Give every lesson a substantive new skill or rigorous knowledge point. Do not let attractive evidence, caveats and broad discussion substitute for teaching a precise method. Name the method in the objectives; explain it, model a complete solution, provide independent practice, and assess it in the exit. For Assumed return, the core skill is calculating annualised return from endpoints with an nth root, applying it to a required return, and distinguishing it from a chosen forecast input. Replace softer repetition to make room rather than overfilling the period.

- Match the visual structure to the reasoning: present assumptions implicit in a forecast as one clear list, revealed in turn, rather than an artificial two-sided comparison.
- Highlight the defined term and a few meaning-bearing phrases in definitions, including the corresponding Chinese phrases. Use selective bold/accent colour; keep the rest of the sentence visually quieter.
- Give real-asset retrieval questions a relevant image, including gold-return calculations.
- For historical asset comparisons, pair readable image-led snapshots with comparative line graphs over time. Give the main rates strong visual emphasis, use consistent asset colours and chart scales, and show actual dated paths rather than smooth curves inferred from average returns.
- When teaching assumed returns, ground the rates in visual long-run asset comparisons for both China and overseas markets. Pair each asset with its own relevant picture, use consistent scales and matched periods where feasible, and state currency, annualised/compound measure and income treatment. Show what an initial sum grew into, then connect the evidence to the case and explain why a historical average is not a guaranteed annual return.

- Use a concrete, surprising investment question as the hook. A dated “what would an investment made long ago be worth?” guessing challenge can work well; collect guesses before revealing the answer and offer a small prize for the closest guess when appropriate. Include a directly relevant picture. Keep the opening challenge English-first, with Chinese only for difficult terms such as “reinvest dividends”; do not translate the whole scenario, question and answer. Make the connection to the lesson mechanism explicit.
- Keep the learning objectives easy to see. Use three concise bilingual goals, with simple visuals only when they help. Remove secondary captions, redundant numbers, arrows and other labels that compete with the objectives.
- Name each section directly after the knowledge students will learn, such as “Compound growth” or “Assumed return”. A continuing case supports the concept; it should not make the heading or section focus broader than the knowledge being taught. Make the assumptions of forecasts explicit.
- Include Chinese support for teaching titles and important chart labels, not only formal definitions. Keep English dominant and Chinese legible; do not crowd slides with redundant wording.
- Remove detours and repeated explanations that distract from the core mechanism. For compound growth, a separate withdrawing-versus-reinvesting comparison is unnecessary once retained returns earning further returns have been demonstrated.
- Place a section’s introductory question or visual pause after its divider. When a section teaches calculation, introduce the main formula on its first teaching slide, then apply it throughout worked examples and practice with a visible reference. Do not bury the formula behind multiple preliminary slides. For compound future value, show FV = P(1 + r)ⁿ with a true superscript.
- Continue to demonstrate a concept’s logic before defining it. This does not mean delaying the calculation formula after the mechanism has already been taught in an earlier section. Use the formula to organise the calculation section.
- Teach concrete effects by holding other inputs constant: for example, vary the return rate with principal and time fixed, then vary time with principal and a positive return rate fixed. Explain uncertainty as a precise limitation of the result rather than a vague collection of ideas.
- Put an explicit, answerable question before every worked solution. A topic title such as “Using the future value formula” does not tell students what to calculate or judge. Keep the model answer hidden until students have attempted the question; give any follow-up diagram its own clear task, such as checking balances year by year.
- Explain essential terminology when it first appears. On a formula slide, give a concise bilingual meaning of the output immediately: future value is the final total, including principal and growth. Keep the full formal definition in notes if it would crowd the slide; avoid a late duplicate definition slide.
- Use a concise side-by-side contrast for simple and compound interest. Show the accumulating difference over a sufficiently long period with one year revealed per forward click, both series advancing together, and a readable current-year gap. Keep the scale fixed and do not show future results early.
- Use fuller but concise student cases: name the student, explain the desired purchase or activity, give a specific budget and deadline, then ask a decision that the calculation resolves. Connect a visual pause to the same student, goal and picture on the next slide. Carry a useful case into later sections rather than introducing unrelated numbers each time.
- Choose goals that fit these students’ current interests: a new iPhone is a better default than a Nintendo Switch for this class. Include a picture on substantive student savings cases, including independent practice. Treat future budgets as assumed amounts, not live prices.
- Put a couple of optional questions after the main closing slide, with full hidden model answers, for spare lesson time. Keep the core ending clear; use extension questions for additional applications rather than crowding the main teaching sequence.
- Build each section around a concrete question and a connected reasoning sequence. Changing a vague heading alone does not establish coherence. Remove generic projection slides and duplicate calculations when the required output can be integrated into the meaningful case.
- Reveal complete modelled reasoning for multi-step questions, including intermediate balances when needed; a compressed answer alone is insufficient.
- Use a cover image that visibly represents the mechanism, not just the broad money context. Follow a historical growth challenge with a sourced chart of that same investment, keeping the data convention and endpoint consistent.
- Quick checks should require applying the idea and distinguishing common misconceptions, not merely repeating a label or selecting a balance that has just been stated. For example, calculate third-year interest after updating the balance twice and distinguish it from total accumulated interest.

- Audience: junior-high students learning investment and financial decision-making.
- Open with one concrete, student-answerable dilemma before teaching the rule. The hook slide should contain one clear question only, supported where possible by real-world data and a directly relevant photograph.
- Show a short three-part lesson roadmap. Present learning objectives as a visual progression through the lesson's logic, with a meaningful concept preview for each stage, a concise action goal and Chinese support. Reveal stages in turn; avoid a plain list of text boxes or decorative labels.
- Organise teaching into clearly numbered sections. Retain the Shanghai skyline divider treatment in PPT lessons that use the v6 template; preserve the Version 2 divider identity in the HTML course.
- Give every section a distinct, explicit purpose; do not reuse the same section label when one section teaches amounts/components and another teaches percentages or comparison.
- Teach one core idea at a time on clean white slides, then apply it immediately.
- Use an English-first bilingual approach: include a faithful Simplified Chinese translation of each definition, alongside Chinese support for difficult financial terms. Ordinary labels and every other sentence do not need translation.
- Use the investment-analysis `termBank` glossary as the source of truth for definitions and its Chinese terminology where available.
- Concise classroom paraphrases are welcome when the glossary wording is too long; preserve its meaning and retain the full definition in teacher notes. For a financial-investment review, use a financial asset such as shares, not direct rental-property ownership.
- Introduce each new concept through its underlying logic before presenting a definition to memorise. Choose a visual or content structure that follows the idea: a sequence for a process, a comparison for a distinction, or a cause-and-effect chain for a mechanism. Use a concrete example and reveal its steps so students can explain what happens in their own words before naming the pattern. A decorative image beside a definition does not meet this preference.
- Definitions should then summarise the demonstrated concept: keep them self-contained and concise, retain the glossary meaning, and include Chinese translations. Prefer a few connected, effective examples over a mandatory number of examples or asset categories. Guided numerical demonstrations may come before definitions; independent calculation follows the explanation. For compounding, show original money earning a return, that return staying invested, and the larger balance earning a further return before defining compounding.
- Match content to the syllabus principles and checkpoint. Remove classification tasks or example lists that add little to the intended understanding. Retrieval reviews should require recall without definition stems and include independent calculations of previously taught methods.
- Prefer familiar contexts for these students, such as red-packet money, savings goals and recognisable companies. Do not use NS&I in teaching examples. Introduce invented figures naturally with “Suppose…” or “Assume…”; a familiar company name does not make illustrative numbers real market data. Avoid extra student-facing labels such as “Classroom model”, “Classroom case”, “Paper scenario” or “Illustrative returns”. State only the conditions needed to understand or calculate the example, in plain language; put authoring context in teacher notes.
- Introduce how return differs across asset types—for example share-price gains and dividends, bond-price changes and coupon interest, REIT unit-price changes and distributions, and physical gold with no regular income—using real examples and meaningful pictures.
- Build from guided examples to classification, then MCQs, then short written judgements.
- Follow the active A-level Economics decks' title conventions: use a concise academic topic in sentence case, normally about 4–10 words and no more than two lines, without a trailing period. Prefer noun phrases such as “Growth with retained interest” or “Total return on Apple shares”; reserve question titles for genuine opening enquiries and visual-pause discussions. Keep commands such as “Calculate” and “Check your understanding” in the task itself rather than the main title. Use the existing small header for one familiar function label, such as RETRIEVAL, CONCEPT, DIAGRAM, WORKED EXAMPLE, PRACTICE or QUICK CHECK; do not add another label row. Retain Chinese terms on definition titles, keep syllabus numbers on covers or in metadata, and use factual takeaway titles only when the slide's evidence supports them.
- Keep operating directions and teacher commentary off the projected slides: no “Write first, then click each blank”, “Complete the glossary definitions”, or redundant answer hints. Put these in teacher notes. Retain only the actual student question and necessary answer choices.
- Remove redundant concept labels such as “NAMING THE PATTERN · COMPOUNDING” beneath an already clear title. Use the space for the explanation or visual.
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
- Include several full-screen photographic pauses at useful transitions, following the A-level pattern of one strong image and one genuine question. Keep the Investment course's visual identity.
- Use charts to show accumulation and changing outcomes, and timelines to connect today's value to a later value. Introduce assumed returns through contrasting concrete scenarios before their definition.
- Format mathematics as in the A-level course: upright sans-serif notation, true superscripts and subscripts, stacked fractions where appropriate, and one logical calculation per line. Use ×, ÷ and − consistently.
- Derive a rearranged formula from the formula students already know. Show one algebraic operation per line, reveal the steps in order, and label what is done to both sides. Use stacked fractions for ratios and fractional exponents, with clear parentheses around the entire powered expression. Carry that formatting through formula references and worked answers.
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
- Prefer dated real-company or real-asset data for practice questions whenever it can test the same skill cleanly; introduce necessary fictional figures with natural conditional wording, without adding a separate scenario label.
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
