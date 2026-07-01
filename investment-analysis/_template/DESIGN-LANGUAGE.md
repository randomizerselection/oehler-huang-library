# Investment Analysis Design Language

Use this standard for every Investment Analysis landing page and lesson deck. The goal is a polished student-facing course identity, not an analyst dashboard.

## Identity

- Name the course clearly: Investment Analysis.
- Keep the Analyst Desk feeling through restrained dark surfaces, precise borders, cyan section labels, green action states and amber task emphasis.
- Use modern real local course images when an image helps the student understand the lesson. Prefer high-resolution photos from the last few years, resize them to roughly a 1920-2560px long edge, and keep accurate `alt`, `caption`, `credit` and `source` metadata.
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
- Titles appear once. Term slides should not repeat the term in both the title and body.
- Body content should sit in the upper-middle teaching zone with generous whitespace. Avoid bottom-heavy layouts on tall classroom screens.
- Use reveal states to stage secondary evidence instead of showing every detail at once.
- Use image-first `visualPause` slides as bridges before major definitions, ownership distinctions, data reading, stock-code identification, calculation methods, price-movement logic, judgement frames, risk discussions and exam planning. Keep the projected pause surface visual-first; put the teaching bridge in notes.

## Component Rules

- `dataSnapshot`: show exactly three key metrics plus one short reading task. Put detailed tables, bars or source rows into notes, sources or a later focused slide.
- `analystBoard`: show no more than three large evidence blocks.
- `riskRegister`: show four short risk prompts in large blocks; keep detailed explanations out of the projected surface.
- `flow`: use large numbered steps with blanks; do not add a second explanatory line to every step.
- `answer` and fill-blank term slides: blanks must render as clear answer slots with a visible underline/fill, stable width before and after reveal, and punctuation attached to the slot.
- `Exit ticket`: keep it as a compact final-check slide with numbered prompts, no visible source button, and all prompts fitting above the footer on phone.
- `peerTask`: show one large task surface; if a visual is useful, keep it as a subdued background rather than a competing card.
- `exam` and `modelAnswer`: use the exam question once, then staged keywords or paragraphs.

## Landing Pages

- The landing page is a student course doorway.
- Primary action: Start Lesson 1.
- Secondary actions: 30-lesson course map, quiz and data snapshot.
- Include a short course promise, a "What you will learn" strip and a roadmap card pattern.
- Use student-facing labels: Lesson, Slides, Quiz, Data snapshot, 30-lesson course map, What you will learn. Avoid internal labels such as dashboard, status panel, internal course or projector system.

## QA Standard

- Run `npm run test:smoke` and `npm run test:responsive` after design-system changes.
- Keep Playwright guards for: slide count, quiz questions, local modern image metadata, visual-pause fit, reveal behavior, source panels, no horizontal overflow, no slide clipping, 32px/48px desktop teaching scale, at least 24px phone teaching text and no ultra-bold visible slide text.
