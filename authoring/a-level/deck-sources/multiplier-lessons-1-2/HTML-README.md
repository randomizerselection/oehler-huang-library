# Multiplier HTML classroom deck

The HTML lesson is now maintained independently of the PowerPoint. The PowerPoint remains untouched; it is the migration reference, not a build dependency for future HTML edits.

## Open it

- Live editable sources: `apps/library/a-level/lessons/9-1-1-multiplier/index.html` and `apps/library/a-level/lessons/9-1-1-national-income-determination/index.html` (repository root).
- Portable classroom outputs: `authoring/a-level/outputs/multiplier-html/A-Level_Multiplier.html` and `authoring/a-level/outputs/multiplier-html/A-Level_National_Income_Determination.html`. Each is a self-contained offline lesson.
- Local preview: run `npm start` from the repository root and open `http://127.0.0.1:4173/a-level/lessons/9-1-1-multiplier/`. Reload after source edits.

## The fast editing path

| Change | Edit |
|---|---|
| Wording, question, table, teacher notes, sources, order | The relevant lesson's `slides.js` |
| A diagram's teaching steps or numerical model | `apps/library/a-level/lessons/9-1-1-national-income-determination/diagram-scenes.js` |
| Reusable diagram geometry, shifts, point movements | `apps/library/a-level/shared-html/diagrams.js` |
| Typography, spacing, palette, responsive layouts | `apps/library/a-level/shared-html/presentation.css` |
| Slide types, controls and interactions | `apps/library/a-level/shared-html/presentation.js` |

Search for the semantic `id`, such as `ae-injection-shift`. Change only the relevant object. Reload the platform browser tab after editing; semantic deep links retain the selected slide and diagram step. There is no bundler or compilation step. Ordinary content changes do not require opening the PowerPoint, re-reading the syllabus, regenerating images, or rendering all 66 slides.

After editing:

```powershell
node --check apps/library/a-level/lessons/9-1-1-multiplier/slides.js
node authoring/a-level/deck-sources/multiplier-lessons-1-2/export-html.mjs
node authoring/a-level/deck-sources/multiplier-lessons-1-2/verify-html.mjs
```

For a focused content change, inspect that slide and its immediate neighbours. For shared styles or diagrams, also check the affected layouts at 1280×720, 1920×1080 and 390×844. Inspect before, during and after each changed transition. Screenshots do not prove that animation works.

The export command inlines the existing CSS, JavaScript and images into one file per lesson. Do not edit the generated portable HTML, or run `import-html.mjs` over later HTML changes. The importer remains only in the deprecated original project as a historical record; it is not a dependency.

## Diagram conventions

- SVG remains sharp at any projector resolution. Text and geometry remain editable.
- AE uses equal x/y scales, so its equality guide is a genuine 45° line. Both axes are £m per year, not the price level.
- Solid blue: the initially taught curve. Dashed grey: an original reference position. Solid teal: the shifted curve. Copper bracket: autonomous change. Amber dotted arrow: movement along a curve. Teal horizontal arrow: the final income change.
- For the multiplier, first shift AE vertically, then move along the new AE line. Do not shift AE again for income-induced consumption.
- All equilibrium coordinates are calculated from `I / (1 − MPC)`; the positive and negative examples share the same baseline. The later-rounds table and captions must be updated too if those teaching numbers change.
- AD/AS is schematic and has different axes. It is not a second numerical version of the fixed-price rise from £400m to £600m.
- In the AD/AS sequence, the gaps between AD curves show successive spending rounds. With MPC = 0.75, the illustrated increments are £50m, £37.5m and £28.125m. Each later shift is smaller, while each curve shows the cumulative AD position after that round.
- Diagram controls are reversible. Enlarge hides explanation copy and expands the graph. Reduced-motion preferences disable transitions without hiding content.
- Semantic deep links include the state: `#ae-new-equilibrium/2` opens the third step directly.

## Classroom controls

Right arrow / Space / Page Down reveals the next step, then advances. Left arrow / Page Up reverses a step, then goes back. Shift + arrow skips slides. O opens the searchable overview; N opens notes and sources; S opens the same side-panel Student Selector used by the Economics lessons while keeping the slide visible; F toggles fullscreen; D enlarges a diagram; R resets the current slide; B blanks the screen; Escape closes or returns. MCQs reveal feedback only after selection. Worked methods use a separate reveal button. The deck remains portable and offline; opening the selector requires an internet connection.

The in-app browser may block the Fullscreen API; the button then shows “Use browser F11”. For full-screen classroom delivery, open the portable HTML in Edge or Chrome and use F11. The in-app browser also blocks direct `file:` navigation, so the offline file was checked for complete inlining, syntax and content; the source version was tested interactively over the local preview server.

The original 66 slides are split into independent lessons: The multiplier has 31 slides; National income determination has 35 and opens at `income-section`. Slide counters and section numbers restart in the second lesson. Original sourceSlide values and stable IDs are retained for traceability. Six past-paper questions and their choices remain unchanged. Sources stay in the teacher panel rather than tiny projected footers.

The deck includes one generated cover, three distinct visual pauses, one road-project photo case and one Ghana extraction image. Each image is used once. The prompts ask students to infer the spending chain, identify leakages or evaluate spare capacity before formal explanation.

## Future HTML lessons

Create `apps/library/a-level/lessons/<new-lesson>/` with a small `index.html`, `slides.js`, optional `diagram-scenes.js` and local assets. Reuse the shared renderer; do not copy its code into every lesson. A new lesson normally needs only new content objects and an adjusted mounting page. Start with an existing slide kind rather than expanding the renderer. Keep stable IDs, notes, source references and a clear boundary between taught material and later prerequisites.

This is the canonical source used by the A-level platform course. Link new lessons from its landing page; unlinked decks and unused lesson types are legacy references. Its warm paper, forest-green divisions and copper accents take their design cue from the Investment Course HTML lessons; its try-first/reveal-second interaction follows the Economics course. General copy and assessment content retain the multiplier deck's AS-first sequence.
