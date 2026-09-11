# Student PDF exports

Use this procedure whenever students request a PDF of an active A-level HTML
deck. The first active deck is `9-1-1-multiplier`, selected from the course landing
page. Export the current canonical HTML; the retained PowerPoint is historical.

## Export

From the repository root, start the platform with `npm start` and verify that
`http://127.0.0.1:4173/api/config` returns HTTP 200. Then run:

```powershell
node authoring/a-level/scripts/export-pdf.mjs 9-1-1-multiplier
```

The exporter uses the project's Playwright package with installed Microsoft Edge
in headless mode. `ALEVEL_EXPORT_BROWSER` can select another installed Playwright
channel; `ALEVEL_EXPORT_BASE_URL` overrides the localhost base URL. No browser
profile containing student or teacher data is used.

Output: `authoring/a-level/outputs/pdf/9-1-1-multiplier.pdf`.
This reproducible export stays outside public deployment roots and Git. Scratch
renders and the page manifest go under `authoring/a-level/tmp/pdf/<slug>/`.
Use another active lesson's folder slug to export it through the same renderer.

## Preserve the teaching content and diagrams

- Use the original 16:9 classroom design at 1600 x 900 CSS pixels, screen media,
  zero PDF margins and printed background colours. Keep SVG diagrams and text
  as vectors/selectable text. Do not rebuild the deck from screenshots or PPTX.
- Force lazy images to load eagerly, await image decoding and `document.fonts.ready`.
- Default to **one completed view per source slide**, following the user's
  10 September 2026 feedback that animation-by-animation exports are too long.
  Do not create extra pages for diagram steps, bullet reveals, rows or builds.
- Show each diagram's final step through `EconPresentation.deck.show(index, step)`.
  Capture its initialized transforms, staged visibility and final explanation.
  Do not force every SVG element visible: some deliberately disappear at later
  stages. Earlier step explanations remain in the interactive lesson; do not
  duplicate the slide just to preserve each animation's narration.
- Preserve original slide numbers. Show ordinary staged lists/chains completely
  on one page. Do not add diagram-stage numbers to the PDF folio.
- Keep questions before their answers. Capture a second page after the existing
  answer/method reveal or correct MCQ selection. Preserve dedicated answer slides.
- Give every cloned SVG ID a unique per-page prefix and update marker URLs and
  accessibility references. Duplicate marker IDs can lose arrowheads in a PDF.
- Freeze animation/transitions and remove presentation controls and teacher
  dialogs from the export. Never change the canonical classroom files to print.
- For the AD rounds scene, the original final curve crosses the "Price level"
  heading. The exporter adds SVG headroom and moves only that heading above the
  plot. A paper-coloured text halo keeps pound-value labels readable over guides
  and curves. All curves, points and model geometry retain their coordinates.

## Verify before delivery

The export fails on broken images, page JavaScript errors, duplicate IDs, missing
local SVG markers, wrong dimensions, or content extending outside a slide.

Render the actual PDF independently with Poppler, then check it:

```powershell
pdftoppm -r 96 -png authoring/a-level/outputs/pdf/9-1-1-multiplier.pdf authoring/a-level/tmp/pdf/9-1-1-multiplier/pdf
python authoring/a-level/scripts/check-pdf.py 9-1-1-multiplier
```

Use the Python and Poppler paths returned by Codex workspace dependencies when
they are not on PATH. Python needs `pypdf` and `Pillow`. If applying the Codex PDF
skill, follow its artifact-operation marker requirement before initial authoring.

The checker verifies page count, 16:9 dimensions, nonempty selectable text and
vector drawing commands, exactly one base page per source slide, final diagram
states and question-before-answer order. It compares **every completed diagram** against a browser
reference image with a small tolerance for different text antialiasing. Inspect
all generated contact sheets, plus full-size complex diagram pages, to catch
overlap, clipped axes/labels, missing curves/arrowheads, bad equations, and absent
photographs. Pixel comparison supplements visual inspection; it does not prove
that the original classroom layout itself is correct.

After a source change, export again and rerun the checks on the regenerated PDF.
Export-only work does not require content builds, unrelated platform tests, or
EconMark flows. If canonical lessons or shared rendering are edited, follow the
repository's validation rules for those changes.

## Current convention

The 8 September 2026 animation-by-animation convention is superseded. Page count
now equals the source slide count plus separately revealed answer/method pages.
The manifest records `completed-slide-with-answer-reveals` and is authoritative
for each run. Remove stale generated page PNGs and contact sheets from that
lesson's scratch directory before rendering a shorter replacement PDF.
