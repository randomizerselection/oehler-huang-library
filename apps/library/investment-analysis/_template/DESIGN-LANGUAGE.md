# Investment Analysis Design Language

Use the shared Economics presentation system for every active and future Investment Analysis deck.

## Visual identity

- Load `theme.css` and `presentation.css`; do not fork their typography, spacing or component system for a single course lesson.
- Use the Economics light presentation theme and its restrained colour hierarchy.
- Keep one dominant idea per slide and generous whitespace.
- Use local course images only. A visual must support the judgement, definition or comparison being taught.
- Avoid decorative dashboards, ornamental charts, remote images and repeated handout text.

## Teaching surfaces

- A hook contains one short student-answerable question.
- A visual pause contains one thought-provoking image; place the teaching question in notes or the adjacent slide.
- A term slide contains one self-contained definition and at least three concise examples.
- A comparison uses the same dimensions for every category.
- A section divider uses a concise academic topic of one to six words so students can copy it into notebooks.
- A classification or sorting check follows when students need to learn a boundary between nearby concepts.
- A model appears only after students have attempted the task.

## Generator contract

New decks assign `window.IGCSE.lesson` and quizzes assign `window.IGCSE.quiz`. Use native Economics types: `hero`, `discussion`, `outcomes`, `section`, `visualPause`, `term`, `cards`, `compare`, `flow`, `quiz`, `yesNoCheck`, `classificationTask`, `peerTask`, and `modelAnswer`.

The Investment image catalogue remains under `window.INVEST.photos`. Every deck uses the native Economics schema and mounts directly through `window.IGCSE.mountLesson(window.IGCSE.lesson)`.

## Language

Use accurate financial and economic terminology with simple sentence structure. Difficult terminology always receives a consistent Simplified Chinese translation. Keep English dominant: translate the conceptual load, not every label, date, example or piece of interface chrome.

## Handout-led projection

Assume students may have the handout on their desks. Project prompts, images, contrasts, decisions and reveal states; do not reproduce paragraphs already available in print. Students should have time to annotate the handout and write a few key ideas in their notebooks.

## Quality checks

- Every active lesson route loads `theme.css`, `presentation.css` and `presentation.js`, then mounts a native `window.IGCSE.lesson`.
- Every lesson has exactly three objectives and a clear first judgement.
- Terms are translated and definitions are self-contained.
- Comparisons use aligned dimensions.
- Formative checks vary across the lesson.
- Text fits at classroom and phone sizes.
- Images load locally and reveal interactions work.
