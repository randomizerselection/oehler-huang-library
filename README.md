# Oehler-Huang Library

Classroom-tested lessons, quizzes, handouts, and review materials. The current
collection is the IGCSE Economics Lesson Library, built on one shared design
system.

## Quick start

Open `index.html` in a browser (or double-click it) to see the landing page,
then click any lesson tile to open that deck.

Inside a deck:

| Key              | Action                   |
| ---------------- | ------------------------ |
| `→` / `Space` / `PageDown` | next slide      |
| `←` / `PageUp`   | previous slide           |
| `Home` / `End`   | first / last slide       |
| `F`              | toggle fullscreen        |
| `N`              | toggle teacher notes     |
| `O`              | overview grid (jump)     |
| `Esc`            | close overview           |

URL hash tracks the slide (e.g. `…/index.html#12`), so bookmarks work.

---

On slides that use partial review, the next action reveals the next element
before advancing to the next slide. Use this sparingly: full slides are better
when students need to see the whole structure at once.

## Folder structure

```
oehler-huang-library/
├── index.html                         ← course landing page
├── README.md                          ← this file
├── references/
│   ├── igcse-economics-syllabus-2027-2029.md ← current syllabus reference
│   └── igcse-economics-definitions-2026.md ← recent mark-scheme definitions overview
├── assets/
│   ├── css/
│   │   ├── theme.css                  ← design tokens + primitives (buttons, cards, chips)
│   │   └── presentation.css           ← slide layout, navigation, motion, print
│   └── js/
│       ├── presentation.js            ← reusable slide engine (ES module)
│       └── visuals.js                 ← SVG graphic library
├── lessons/
│   ├── _template/                     ← starter files for a new lesson
│   │   ├── index.html
│   │   └── slides.js
│   └── unit-4-government/
│       └── 4-3-monetary-policy/
│           ├── index.html             ← lesson menu for split decks
│           └── slides-lesson-1.js     ← lesson content (data only)
└── archive/                           ← superseded originals
```

Naming rules:

- Unit folders: `unit-<number>-<slug>` (e.g. `unit-4-government`).
- Lesson folders: `<syllabus-code>-<slug>` (e.g. `4-3-monetary-policy`).
- Lesson slugs use kebab-case; no spaces, no capital letters.

---

## Reference source for lesson content

Use `references/igcse-economics-syllabus-2027-2029.md` as the shared syllabus
source when building or revising decks for the current syllabus. It contains
the revised 2027-2029 syllabus references, assessment overview, command words,
formulas, and planning notes.

Use `references/igcse-economics-definitions-2026.md` as the shared definitions
source. It is an up-to-date overview of definitions and mark-scheme wording as
Cambridge IGCSE Economics 0455 has used them in recent years. Lesson materials
should typically align with these definitions, though slide wording may be made
more concise and student-understandable where appropriate, provided it still
prepares students to earn marks in exams.

The student-facing bilingual definitions overview at `definitions.html` is
generated from that Markdown source plus `scripts/definition-translations.js`.
After editing the definitions reference or translation companion, run
`npm run build:definitions` and commit the regenerated HTML.

Use `references/paper-2-mark-schemes-2023-2025/` as the shared Paper 2
mark-scheme archive. It reorganises recent 0455 Paper 2 mark schemes by
syllabus topic, preserving source paper, question number, command word, marks,
mark-scheme wording, and cross-topic references for broad questions.

Recommended workflow:

1. Find the relevant syllabus rows, e.g. `4.2` for fiscal policy.
2. Check the definitions overview for key terms and exam-ready wording.
3. Check the Paper 2 mark-scheme archive for recent question wording, answer
   chains, accepted alternatives, and evaluation points.
4. Use the planning notes on `term` slides where possible.
5. Shorten wording only when needed for slide clarity or student access.
6. Keep detailed wording in speaker explanation or follow-up practice slides.
7. Add a short source comment near the top of each lesson `slides.js`.

Example comment:

```
Syllabus source: ../../../references/igcse-economics-syllabus-2027-2029.md
Definitions source: ../../../references/igcse-economics-definitions-2026.md
Paper 2 mark-scheme archive: ../../../references/paper-2-mark-schemes-2023-2025/
Use the 4.2 rows for fiscal-policy wording when creating slides.
```

---

## Creating a new lesson

1. Copy `lessons/_template/` into the correct unit folder and rename, e.g.:
   ```
   lessons/unit-2-allocation/2-4-elasticity/
   ```
2. Edit **`slides.js`** — change the `meta` block and rewrite the `slides` array.
   Each slide is a plain object with a `type` and fields for that type.
3. Edit **`quiz.js`** for the separate after-class quiz shown at `?view=quiz`.
   Keep it to short retrieval questions by default, using `multipleChoice` and
   `fillBlank` question objects.
4. Edit **`flashcards.js`** for the self-check revision deck shown at
   `?view=flashcards`. Flashcards must be one of two types only:
   ```js
   {
     type: 'definition',
     id: 'stable-id',
     term: 'Key term',
     definition: 'Short definition'
   }

   {
     type: 'fillBlank',
     id: 'stable-id',
     prompt: 'Sentence with __________ for a missing key term',
     answer: 'missing key term'
   }
   ```
   Flashcards are separately authored. Keep them limited to short definitions
   of key terms or fill-in-the-blank retrieval. In fill-in-the-blank prompts,
   the hidden answer should be the difficult keyword, syllabus phrase, or
   concept students need to retrieve, not an easy tail word such as `bank`,
   `rates`, `aims`, or `supply`.
5. Leave **`index.html`** alone unless you're customising the page itself.
   It simply imports the engine and your slide data.
6. Add a card to `index.html` (the landing page) under the matching unit.

That's it. No CSS or JavaScript changes are needed for a new lesson.

Quiz score submission is configured in `assets/js/quiz-config.js`. The site is
set up for Netlify Forms: quiz attempts post to the hidden
`quiz-submissions` form in `index.html`, and Netlify stores the submissions for
dashboard review and CSV export. After deployment, check Netlify → Forms →
`quiz-submissions`.

### Lesson structure preferences

Default slide decks should open in this order:

1. Title slide
2. Opening hook
3. Learning objectives (`By the end, you can`)

Keep title slides visually engaging but uncluttered: use the lesson title,
a short lesson or unit label, one hook line, and a relevant, specific photo.
Avoid repeating the course name in the slide body when the deck chrome already
shows course information.

Photo choices should be specific to the teaching point. Do not repeatedly reuse
generic classroom, shopping, factory, or port images when a more precise image
would make the concept clearer. New images must be saved locally in
`assets/images/...` and referenced from the deck data. Put reusable photo
metadata in `assets/js/photos.js` and reference those catalog entries from
slides, for example `IGCSE.photos.fiscalPolicy.budgetMeeting` or
`IGCSE.photos.marketTeaching.starbucks`. Keep one-off photo objects in a lesson
file only when the image is unlikely to be reused.

Learning-objective slides should use a simple graphic or no visual. Avoid
photos on objective slides because they compete with the checklist.

After that, teach each micro-sequence in this order:

1. Divider or section slide
2. Fact or discussion slide to introduce the topic
3. Taught content slides
4. Formative assessment, such as quizzes, hinge questions, application checks,
   answer blanks, or exam-style checks

Repeat that divider -> fact/discussion -> content -> formative-assessment
sequence for each major section in the deck.

Fact and discussion slides should be used generously, not as occasional
decoration. Every complete lesson deck should include both formats, and each
major section should normally begin with a concrete fact slide or a discussion
prompt before abstract explanation. If a section introduces an economic aim,
policy, market failure, institution, or real-world mechanism, prefer a sourced
fact slide with a local photo unless the section is deliberately driven by a
student discussion scenario.

On fact slides, keep source attribution out of the large fact text. Do not write
phrases such as `The World Bank expected`, `WHO estimates`, or `According to...`
inside the fact sentence; put the source in the small `source` line. Use flags
on fact panels where relevant, include a China comparison whenever the pattern
supports it, and choose the most specific available local photo. Download and
catalogue a new image when the existing catalogue only offers a generic visual.

Section dividers should name the content actually taught in that section. Use
`zhTitle` for concise Chinese title translations on important `section`, `term`,
and concept-bearing `flow` slides so students can recognise and memorise key
IGCSE terms. Divider subtitles are optional and should be used only as a short
student-facing bridge or contrast that adds meaning beyond the title, such as
`How lower rates change spending and investment`.

Avoid vague divider titles such as `Too much`, `Too little`, `None`, `Part 1`,
or `Next idea`. Use the syllabus concept or mechanism instead, for example
`Over-consumption`, `Under-consumption`, `Non-provision`, or `Restricted
monopoly supply`.

Do not use divider subtitles for syllabus codes, topic breadcrumbs, or formulaic
phrases such as `2.8.2 - advantages include efficiency`. Keep syllabus
references in source comments, hero subtitles, objectives, quiz explanations, or
teacher planning notes instead.

Most teaching slides should not use subtitles or lead text. Prefer a clear,
self-contained title, then move directly into the content.

Quiz slides should not have display titles. Put the cognitive load into the
question and answer options; the shared engine provides click feedback on the
options. Always include an `answer` index on multiple-choice quiz slides so the
visual feedback can show correct and incorrect choices.

Use `answer` slides with `mode: 'fillBlanks'` for retrieval practice. Title
these slides `Fill in the blanks`; show all statements immediately, and put the
answer text in the third item of each step so it appears inside the blank when
clicked. The blank should hide the target keyword or concept phrase students
need to recall, not a low-value completion word. For example, prefer `The
__________ is the amount of money in an economy` with answer `money supply`,
rather than blanking only `economy`.

For bilingual slides, put Chinese translations on discussion and fact slides.
Use `zhTitle` on important section dividers, flow slides and definition slides
so the Chinese appears inline with the English title. Keep the English title
short enough that the bilingual title does not overflow.

For list-like syllabus content, avoid putting all explanations on one dense
slide. Prefer:

- a short overview slide that names the full list
- numbered items when the list has a natural sequence
- one slide per reason, type, effect, or case
- a simple cause/effect chain on each explanation slide
- quick checks of understanding between segments
- exam prompts that ask students to identify the reason, apply it, and add an
  opportunity cost or evaluation point

For example, reasons for government spending and reasons for taxation should
use a numbered overview followed by one slide per reason.

### Slide types (in `slides.js`)

| `type`     | Purpose                                  |
| ---------- | ---------------------------------------- |
| `hero`     | Opening title slide                      |
| `roadmap`  | Numbered agenda cards                    |
| `outcomes` | Learning objectives list                 |
| `term`     | Key-term definition box (+ optional examples / formula) |
| `compare`  | Side-by-side comparison                  |
| `quiz`     | Question + choice pills                  |
| `answer`   | Answer card and/or reasoning steps       |
| `cards`    | Grid of concept cards                    |
| `split`    | Two-column bullet comparison             |
| `flow`     | Chain of arrow-connected chips           |
| `exam`     | Exam-style question + keyword anchors    |
| `section`  | Full-bleed section break                 |

Every slide accepts:

- `eyebrow` — small badge text (top-left)
- `title`   — main heading
- `visual`  — a key from `assets/js/visuals.js`, or a photo object with
  `src`, `alt`, `credit`, and `source`, for the right-hand visual. Prefer
  reusable entries from `assets/js/photos.js` for lesson photos.
- `notes`   — private teacher note revealed with `N`

Also accepts:

- `partialReview` - optional reveal pacing for selected slides

See `lessons/unit-4-government/4-2-fiscal-policy/slides-lesson-4.js` for a full example.

### Partial review

Prefer full content by default. Add `partialReview` only when revealing one
piece at a time improves teaching:

- Good uses: answer steps, exam chains, flow diagrams, dense comparisons,
  starter questions, and definition-then-formula reveals.
- Avoid it: title slides, lesson maps, section breaks, single-concept answer
  slides, and tasks where students need all options visible before responding.

Use `partialReview: true` to reveal all supported content blocks on a slide, or
pass selectors for finer control:

```js
partialReview: ['.choices > .choice', '.prompt']
```

### Compact bilingual cards

Use `cardStyle: 'compactVisual'` for dense overview/category slides with four
to six short concept cards. Keep ordinary tuple cards for simple explanation
slides that already fit comfortably.

Compact cards use object data so each key term can carry a concise Chinese
translation and a small local SVG icon:

```js
{
  type: 'cards',
  title: 'The six macroeconomic aims',
  cardStyle: 'compactVisual',
  cardLayout: 'balancedGrid',
  cards: [
    { title: 'Economic growth', zhTitle: '经济增长', body: 'increase real GDP', icon: 'realGdp' },
    { title: 'Full employment', zhTitle: '充分就业', body: 'keep unemployment low', icon: 'lowUnemployment' },
  ],
}
```

Supported card fields are `title`, `zhTitle`, `body`, `icon`, and `num`.
Existing tuple cards such as `['Economic growth', 'increase real GDP']` remain
supported. Use `cardLayout: 'balancedGrid'` only when a six-card list should
render as a balanced 3 x 2 teaching grid on classroom screens.

### Visual keys

Declared in `assets/js/visuals.js`. Core graphics:

- `hero`          — orbiting-coins title graphic
- `abstract`      — concentric circles with crossed curves (default fall-back)
- `demandShift`   — supply/demand with shifted curve
- `budgetBars`    — two-bar revenue vs. spending chart
- `progressive` / `regressive` / `proportional` — tax-rate bar charts
- `demandUp` / `demandDown` — expansionary / contractionary curves
- `flowArrows`    — four-node horizontal flow

Legacy keys from older lessons are mapped onto these automatically.

### Photo catalogue

Declared in `assets/js/photos.js`. Lesson pages should load it after
`assets/js/visuals.js` and before lesson slide files. Current namespaces:

- `IGCSE.photos.fiscalPolicy` - general fiscal-policy teaching photos
- `IGCSE.photos.fiscalPolicyFacts` - fact-slide photos for fiscal-policy cases
- `IGCSE.photos.marketTeaching` - market-system and market-failure teaching photos
- `IGCSE.photos.monetaryPolicy` - monetary-policy teaching photos and charts

Each entry is a normal `visual` photo object with local `src`, `alt`, `caption`,
`credit`, and `source`. Do not use remote URLs for `src`; source links belong in
`source` only.

---

## Design system

All colours, radii, shadows, and font sizes live as CSS custom properties in
`assets/css/theme.css`. Change the token, every lesson updates.

Tone: dark background (`--bg-0` = `#05101d`), bold white headings with tight
tracking, cyan/gold accents. Large fluid type (`clamp()`) so a single deck
reads cleanly on anything from a 13" laptop to a 75" classroom display.

Motion is gated on `prefers-reduced-motion` and print CSS is included for
PDF export (File → Print → "Save as PDF").

---

## Browser requirements

The engine uses native ES modules (`import` / `export`), so the lesson pages
must be loaded over `http://` (or `file:///` in browsers that allow local
module loads — most do). If double-clicking the HTML fails due to CORS:

```powershell
# from the repo root, in PowerShell
python -m http.server 8080
```
…then open <http://localhost:8080/>.
