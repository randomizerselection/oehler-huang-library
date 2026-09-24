# Share price lesson design review

22 September 2026. Teacher requested a stronger replacement inspired by the newest active IGCSE and A-level decks. The canonical revised source remains `apps/library/investment-analysis/lessons/share-price-company-size/`; no second editable deck is kept here.

## What the comparison showed

| Reference inspected | Strength | Applied change |
|---|---|---|
| IGCSE 5.3 Population growth, `town-one-year` | Counted changes make the mechanism visible before a definition. Students predict each result. | Show share-count bars before calculating total value; count the 2-to-20 Nintendo split with equal-sized tokens and reversible reveals. |
| A-level 9.2.3 Business cycle, `cycle-opening-puzzle` and its following diagram/definition sequence | The initial uncertainty drives the explanation. One diagram develops in stages rather than repeating text. | Opening price-only vote, reveal the missing count, derive total value, then name market capitalisation. |
| A-level 9.2.4 Growth policies, `elizabeth-line-case`, worked analysis and independent writing | Specific photographs connect to the knowledge point; explanation, model and independent work have different visual forms. | Real Apple/Costco/Nintendo photos, photographic dividers, large formula, worked arithmetic and shared-scale bars, causal stages, and original exam-style independent writing with staged model feedback. |

The old Investment lesson had correct basic content but a static, repetitive sequence: price puzzle, text comparison, definition, formula and several similar price-only claims. The “visual” slide was mainly another pair of text panels. The opening was partly answered by the cover subtitle, the worked-example reveal selector did not stage the plain calculation lines, and the final short-answer model existed only in notes. Simplicity had removed the explanatory model instead of removing repetition.

## Latest information-depth and MCQ revision

The teacher subsequently asked for much deeper information/price teaching and clarified that course exams will be almost entirely MCQs. The current version therefore has 32 core slides and four optional applications. The 15-minute information section teaches the business-profit-ownership-order-price mechanism, clear bilingual concepts, an illustrative buyer/seller transaction, profit-growth versus expectation-surprise bars, and contrasting real NVIDIA (May 2023) and Apple (January 2019) events. Each historical case has a picture-led introduction, sourced information comparison, closing-price chart and explicit causal interpretation. Calendar dates, historical observations, forecasts and hypothetical examples are distinct.

The former long written task/model and written exit have become four one-mark exam-style MCQs, with four minutes for independent answers and four for feedback. Three formative hinge MCQs remain. Each distractor maps to a specific misconception, with reteaching guidance in notes. The inverse calculation and general investment-quality discussion have moved after Summary to protect the deeper teaching within 40 minutes. Semantic IDs are preserved.

Validation of this revision: JavaScript syntax, current Investment HTML checks and course catalogue checks passed. Changed slides and their neighbours were inspected at 1280×720 in completed states; corrected definition/evidence spacing and MCQ feedback clearance. All seven MCQs were tested with wrong and correct responses; the longest feedback ends at y=633, above the slide-body limit y=648. Changed slides/neighbours passed the 390×844 horizontal-overflow review; the focused phone suite passed 8 tests with 2 desktop-only skips. Full smoke again reported 161 passes, 1 skip and the same five pre-existing selector/attendance/cache-URL failures outside this lesson. Local service `/api/config` returned 200. No deployment or platform/authentication changes.

## Earlier real-company revision

The teacher's subsequent feedback required real companies, more knowledge for 40 minutes and stronger formative/exam-style practice. The current revision replaces River/Summit with Apple/Costco and real company photographs. It retains the question → mechanism → definition → model sequence, then develops expectations and price formation, fixed-share-count revaluation, market value versus cash, and Nintendo's split as core teaching. Shared-scale bars suit the real share counts better than the earlier small fictional block totals; counted tokens now show the split mechanism itself.

The 26-slide core has three hinge MCQs addressing distinct misconceptions, an inverse calculation, an original eight-mark structured question with six minutes independent writing and three minutes feedback, and a four-mark independent exit. Question/data remain beside staged model reasoning. Two optional questions follow Summary. Sources distinguish actual historical observations, rounding, separate dates and hypothetical scenarios. The lesson still has one coherent line of enquiry: how price and the number of ownership units determine total market value. The old 17-slide scope was too thin; it is no longer a recommended limit.

Keep each existing semantic ID, the Investment renderer and classroom tools. The local `design.js` follows the established first-trades pattern and uses the renderer's existing partial progress instead of implementing separate navigation. The local CSS changes no other deck.

The durable rules are recorded in `LESSON_DECK_PREFERENCES.md`, under “Real companies, substantive teaching and assessment” and “Stronger Investment lesson design”, 22 September 2026, and signposted in the course `AGENTS.md`. Prepared coverage remains explicitly unconfirmed in `TEACHING_PROGRESS.md`.

## Current real-company revision validation

- All 28 semantic IDs are unique; all 18 preceding IDs survive. The core ends at slide 26, Summary. The historical `exit-market-cap` reference still resolves (slide 25).
- Inspected completed classroom layouts at 1280×720, including all model disclosures; no text overflow or broken images found. The expanded Costco million-to-billion conversion was tightened locally and rechecked: content ends at y=630, above the body boundary y=648.
- All three MCQs were checked with incorrect and correct responses. Worked reveals progressed to three visible steps and reversed 2 → 1 → 0. On fresh load, all three exam feedback rows are hidden; both exit marking guides are closed.
- All 28 slides, with reveals/disclosures completed, passed a 390×844 horizontal-overflow check. The focused phone suite passed 8 tests, with 2 desktop-only skips. Mobile body text is explicitly sized so question letters do not inherit viewport-scaled tiny text.
- JavaScript syntax, current Investment HTML validation and `check:courses` passed. Required full smoke: 161 passed, 1 skipped, the same 5 existing failures listed below (selector/attendance fixtures and file-runtime cache-version expectation); none is in the revised share-price lesson.
- Existing localhost service verified with `/api/config` HTTP 200. Prior authenticated EconMark single/batch browser checks still require sign-in; no authentication or platform code changed. No deployment performed. The immediate preceding slides are recoverable as `tmp/share-price-redesign/before-real-companies-slides.js`.

### Previous revision checks

- Checked all 18 slide layouts in the in-app Browser at 1280×720, including revealed model answers. Corrected section-title layering, photograph text contrast, expanded retrieval spacing and practice-answer clearance.
- Confirmed all local images load and all 16 original slide IDs survive. Worked-example progress follows `0, 1, 2, 3, 2, 1, 0`; both MCQ wrong/correct feedback paths work. All 18 slides passed the phone horizontal-overflow check at 390×844.
- JavaScript syntax, `check:courses`, and `test:current-investment-html` passed. The focused phone suite reported 8 passes and 2 desktop-only skips.
- Required broad desktop smoke: 161 passes, 1 skip, 5 failures outside the revised deck. Failures concern an IGCSE homework-leader selector lookup, three existing attendance-name lookups, and an A-level file-runtime URL expectation that omits its current cache version. No shared selector or attendance source was changed in this task.
- `npm start` found the existing server on port 4173; `/api/config` returned HTTP 200. Single-answer and batch browser entries redirected to sign-in, so those authenticated browser flows were not completed. The separate batch-workflow and feedback-pack tests passed all 15 tests, including the synthetic 30-student paths.
- No deployment was performed. The prior lesson files are recoverable in the ignored `authoring/investment-course/tmp/share-price-redesign/` workspace.
