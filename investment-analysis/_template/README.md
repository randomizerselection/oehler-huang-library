# Investment Analysis Lesson Template

Use this folder as the starting point for future `investment-analysis/unit-x/lesson-y/` decks.

Before creating or updating a deck, follow `DESIGN-LANGUAGE.md`. It is the source of truth for Investment Analysis typography, slide density, landing-page structure and visual QA.

Required files:

- `index.html` loads `../../../assets/css/investment.css`, `../../../assets/js/investment-deck.js`, `../../../assets/js/investment-quiz.js`, then local `slides.js` and `quiz.js`.
- `slides.js` assigns `window.INVEST.lesson`.
- `quiz.js` assigns `window.INVEST.quiz`.

Classroom rhythm:

1. Hero or market brief.
2. Concrete starter.
3. Exactly three bilingual objectives.
4. Section divider, visual or data pause, taught content, formative check.
5. Calculation or evidence practice where useful.
6. Exam-style writing and exit ticket.

Keep real company data frozen with source and date metadata. Do not fetch live prices inside lesson files.

Visual rhythm:

- Keep each projected slide to one main idea or student action.
- Do not combine a dense table, chart, photo and prompt on the same slide.
- Use `dataSnapshot` for three key metrics plus a short reading task; keep detailed rows in notes, sources or a separate focused slide.
- Use `analystBoard` and `riskRegister` for a small number of large evidence/risk blocks with reveal prompts, not crowded dashboard panels.
- Keep landing-page copy student-facing: lesson actions, what students will learn, and clear quiz/data links.

Typography rhythm:

- Projected teaching text uses one text face and two sizes: 48px for slide/term/section titles and 32px for lesson content.
- Do not create special font sizes for metrics, terms, formulas, choices, prompts or model answers; use weight and spacing lightly instead.
- Keep source panels, captions and deck chrome visually quiet so they do not compete with the teaching surface.
- Use modern local photos for visual pauses and context backgrounds. Avoid old stock certificates, archival trading-floor imagery and museum-value photos unless the lesson explicitly teaches historical context.
- Download new high-resolution photos when the catalogue match is weak, resize them to projection quality, and add complete metadata in `assets/js/investment-photos.js`.
