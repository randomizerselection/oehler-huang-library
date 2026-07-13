# Investment Analysis Design Language

Use this standard for every Investment Analysis landing page and lesson deck. The goal is a polished student-facing course identity, not an analyst dashboard.

## Identity

- Name the course clearly: Investment and Financial Decision-Making.
- Keep the Analyst Desk feeling through restrained dark surfaces, precise borders, cyan section labels, green action states and amber task emphasis.
- Use modern real local course images when an image helps the student understand the lesson. Prefer high-resolution photos from the last few years, resize them to roughly a 1920-2560px long edge, and keep accurate `alt`, `caption`, `credit` and `source` metadata.
- Match every monetary figure to the case country or transaction market: use `CNY` for mainland China family scenarios, `HKD` only for Hong Kong-listed securities or Hong Kong transactions, `USD` for United States cases, and the corresponding currency elsewhere. Use `人民币`, `港元` or `美元` in Chinese support.
- Do not use remote images, decorative illustrations, gradient blobs, abstract background ornaments, old stock certificates, archive trading-floor photos, museum-value artifacts, or visuals that make the lesson feel historical unless the slide is explicitly about history.
- Treat every screen as one student-facing action or idea.

## Typography

- Use the shared `--inv-text` stack only. Do not add external fonts.
- Projected desktop slides use two teaching sizes only: 48px for titles, terms and section numbers; 32px for all teaching content.
- Phone slide previews keep teaching text at or above 24px.
- Use 600 weight only for main titles, section labels and compact UI labels. Use 500 for classroom sentences, answer choices, formulas, evidence and model-answer text. Do not use ultra-bold display weights.
- Keep letter spacing at 0. Do not create custom type sizes for individual slide types, metrics, formulas, choices or prompts.

## Slide Anatomy

- Keep the top chrome compact. The slide, not the navigation, must dominate the viewport.
- Keep source panels, notes, overview and photo captions outside the teaching hierarchy.
- Titles appear once and should make the taught concept, question or exercise explicit. Term slides should not repeat the term in both the title and body.
- Body content should sit in the upper-middle teaching zone with generous whitespace. Avoid bottom-heavy layouts on tall classroom screens.
- Important student-facing teaching text should have concise Simplified Chinese support: main titles, term definitions, core prompts/tasks, main reveal answers, flow/answer items and quiz prompts/explanations. Do not translate source metadata, stock codes, dates, numbers, minor labels, UI chrome or teacher notes unless they carry the concept.
- Use reveal states to stage learning, not decoration: students should identify, choose, calculate, classify or draft before answers, evidence bodies, risk effects, keywords or model paragraphs appear.
- Start from the syllabus `decisionFirst` contract: a concrete starter dilemma, a first judgement, the missing evidence, one key idea, one practice task, a misconception check and an exit judgement.
- Use image-first `visualPause` slides as bridges before major definitions, ownership distinctions, data reading, stock-code identification, calculation methods, price-movement logic, judgement frames, risk discussions and exam planning. The projected pause surface is image-only: no visible title, prompt, caption, credit or explanatory text. Put the teaching bridge in notes or on an adjacent slide.
- Use visuals as teaching moves. A hook visual should create a concrete student decision; a visual pause should prepare the exact concept that follows; charts should appear when students are ready to read evidence, not automatically as the opener.
- Keep `section` dividers as simple reset screens: part label, concise academic title, optional concise Chinese title and an automatic progress strip. The title should name the section's knowledge domain, concept, relationship or academic question in roughly one to six words so students can copy it into notebooks. Do not use an activity instruction, slogan, transition or full teaching claim, and do not add image columns, prompt cards, dashboard panels or manual roadmap lists.

## Component Rules

### Visual presentation contract

- Give every slide type one dominant visual signal: cyan for concepts and sources, green for mechanisms and judgements, amber for student tasks and output, and red only for risk or correction states. Apply the signal through a restrained edge, label or active state rather than recolouring the whole slide.
- Keep content cards on one shared surface system: quiet translucent fill, precise border, one accent edge and consistent corner radius. Do not stack several decorative borders, shadows or competing accent colours on one card.
- On desktop, place the teaching move in the upper-middle zone and use the remaining space as deliberate breathing room. Do not stretch short content to fill the slide.
- On phones, compact the course controls before shrinking teaching text. Dense comparison types may use an internal horizontal snap row so each card remains readable; the page and slide itself must never gain horizontal overflow.
- A reveal should strengthen hierarchy: the attempt remains identifiable, while the revealed answer becomes the clearest accented surface. Do not make the whole slide denser merely because an answer is visible.

- Do not use deprecated `marketBrief` slides in new decks. They add little value compared with a focused `dataSnapshot`, `sourceLens`, `quoteMap`, or `discussion` slide.
- `section`: keep the slide visually closer to the standard economics-presentation divider, with a notebook-ready academic topic such as `Investment and return` doing the work and only a quiet progress strip below it.
- `discussion`: ask a real question first. Do not display the model explanation as the initial prompt.
- `priceChart`: use as a dated evidence-reading task after the lesson question is established. Do not default to chart-first lesson openings when a concrete dilemma or visual hook would better match the classroom rhythm.
- `dataSnapshot`: show exactly three key metrics plus one short reading task. Put detailed tables, bars or source rows into notes, sources or a later focused slide.
- `conceptTriad`: compare exactly three concepts; keep each definition short, and use purpose, risk, time horizon and example rows for the reveal layer.
- `visualGrid`: use image-led example cards only when the pictures help students compare or recall concrete categories; keep each label short and avoid decorative image collections.
- `compare`: use for a clean two-column T-table contrast with short fill-in statements. Do not use it for multi-criteria investment choices; use `comparisonMatrix` there.
- `classificationTask`: use for classify-and-justify routines with revealed reasons. Keep category labels short and already taught.
- `yesNoCheck`: use for misconception votes and borderline investment judgements where a yes/no commitment matters before the reason. Present three or four statements in one full-width vertical voting board. Make Yes and No real buttons: a click scores the committed choice and reveals the verdict and reason inside the same row; deck reveal controls remain the teacher-led fallback. Do not use a repeated-card grid or horizontal carousel.
- `rankingTask`: use for ordered low-to-high, risk-return, priority or confidence tasks where students must defend a comparative sequence. Present three to five options as one vertical decision ladder with a rank blank beside each, then replace it with one defensible ordered model and reasons. Do not combine empty slots with a card grid or use a horizontal carousel. Use `axis.showNote: false` when the end labels already make the axis meaning complete.
- `sourceLens`: show four source facts and up to four source-quality checks; use `revealAnswers: true` so students decide authority, date, scope and limitation before seeing a strong answer.
- `quoteMap`: show up to six quote-page fields; use `revealValues: true` when students should locate company, code, exchange, price, date/time and source before reveal.
- `comparisonMatrix`: compare two or three choices using the same criteria; keep row labels short and reveal cells only after students commit to the comparison.
- `catalystTimeline`: show up to four events linking information to expectations or price movement; use `revealEffects: true` so students avoid overclaiming causation.
- `judgementFrame`: use four stages: evidence, return, risk and price paid; reveal answers only after students draft the balanced judgement.
- `analystBoard`: show no more than three large evidence blocks; use `revealBlocks: true` when students should identify the missing evidence block before bodies appear.
- `riskRegister`: show four short risk prompts in large blocks; use `revealEffects: true` so students link risk to future profit, expectations or price paid before seeing the effect.
- `flow`: use large numbered steps with meaningful blanks and `answer` values; do not add a second explanatory line to every step.
- `answer` and fill-blank term slides: blanks must render as clear answer slots with a visible underline/fill, stable width before and after reveal, and punctuation attached to the slot.
- `Exit ticket`: keep it as a compact final-check slide with numbered prompts, no visible source button, and all prompts fitting above the footer on phone.
- `peerTask`: show one large task surface; if a visual is useful, keep it as a subdued background rather than a competing card.
- `peerTask` variants: use `definitionRecall` for three prior terms at the start of Lesson 2+; use `missingSentence` for one missing explanation link, not broad discussion.
- `exam`: use the exam question once, then reveal keywords only after students have tried a plan when `revealKeywords: true`.
- `modelAnswer`: use `cueLabel` and `cueText` to make the comparison task explicit, then reveal paragraphs one at a time.

## Landing Pages

- The landing page is a student course doorway.
- Use a factual course description of no more than two short paragraphs. State level, length, subject coverage and the no-advice boundary directly.
- Keep navigation to the main course routes. Use one primary action and no more than one secondary action in the hero.
- Present the six-unit sequence once. Do not repeat it in a status panel, promise strip, metric panel or second overview card.
- Use a compact resource list for the syllabus, definitions and picture archive. Keep archived materials as a quiet text link.
- Do not link to an existing lesson deck from the landing page until that deck matches the active syllabus sequence.
- Keep generator tables, source contracts, formula banks and teaching-method details behind progressive disclosure on the syllabus page.
- Avoid oversized decorative hero images, profile blocks, repeated statistics and multiple rows of button-like links.

## QA Standard

- Run `npm run test:smoke` and `npm run test:responsive` after design-system changes.
- Keep Playwright guards for: slide count, quiz questions, local modern image metadata, visual-pause fit, reveal behavior, source panels, no horizontal overflow, no slide clipping, 32px/48px desktop teaching scale, at least 24px phone teaching text and no ultra-bold visible slide text.
