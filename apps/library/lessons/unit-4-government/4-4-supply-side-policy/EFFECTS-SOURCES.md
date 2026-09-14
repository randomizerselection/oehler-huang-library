# Effects and evaluation: source and coverage record

Revised 14 September 2026. Lesson 4 is now **Effects of supply-side policy** (26 slides: 23 core, 3 optional); Lesson 5 is **Limitations and evaluation** (28 slides). Both are prepared continuations, not evidence that earlier prepared content was taught.

## Coverage audit

Lessons 1–3 already introduce productive capacity and the outward PPC shift, interventionist measures, market-based measures and their mechanisms. Lesson 2 includes skills mismatch; Lesson 3 already questions automatic investment and employment effects. The new continuations retrieve those ideas without repeating whole policy definitions.

| Remaining learning | Explicit teaching and assessment |
| --- | --- |
| Growth and employment | Economy-wide production illustration; productive capacity versus realised output; occupational mobility and suitable vacancies. |
| Inflation | Unit-cost calculation followed by an economy-wide explanation; lower inflation versus falling prices; offsetting input costs and total demand. |
| Competitiveness and balance of payments | Separate export-revenue and import-expenditure explanations; link to the current account, holding other items constant; original six-mark assessed answer. |
| Timing and policy effectiveness | Spending before supply responds; relevant skills, enough jobs, emigration and unequal access; application with hidden models. |
| Costs and trade-offs | Opportunity cost, uncertain investment response, public-finance cost, foregone state-firm profits, competition and worker/protective-rule trade-offs. |
| Evaluation | Two full original Discuss questions; developed benefits and limitations on separate model slides, original question visible throughout; conditional judgement answering the specified aim. |

The current syllabus reference is `references/igcse-economics-syllabus-2027-2029.md`, **4.4.1–4.4.3**, supported by **1.3.1** (opportunity cost), **1.4.4** (PPC shift), and prior fiscal-policy knowledge. The definitions reference uses older numbering: productivity **3.6.3**, budget deficit **4.3.8**, supply-side policy **4.5.1**. Those are definition-archive identifiers, not the new syllabus numbering.

## Original questions and schemes

Original PDFs were read from `C:/Users/oehle/Documents/past-papers/economics_0455_igcse_paper2/`. Relevant complete pages are retained as local PNGs in `assets/` and linked from the labelled source dialogs.

| Paper | Exact question | Question page | Scheme page | Use |
| --- | --- | --- | --- | --- |
| 2023MJ-21 Q3(c) | Analyse how an increase in labour productivity in a country can increase a surplus on the current account of its balance of payments. [6] | 4 | 15 | Lesson 4 core assessed exit. |
| 2023MJ-21 Q3(d) | Discuss why some countries may experience lower inflation in the future and some may not. [8] | 4 | 16 | Price-stability teaching; optional practice after Lesson 4 Summary. |
| 2024ON-21 Q3(d) | Discuss whether or not improving education can help a government achieve its macroeconomic aims. [8] | 4 | 18 | Main basis for effects, access and effectiveness; Lesson 5 guided discussion. |
| 2025FM-22 Q5(d) | Discuss whether supply-side policy measures will reduce a government’s budget deficit. [8] | 5 | 27 | Funding, tax, privatisation and timing; Lesson 5 assessed exit. |

All four are Section B questions that allow reference to their stimulus and/or other studied examples. Their contextual paragraphs remain on the source-page images. The exact question is on the student slide; the optional context is not presented as a required unseen case.

The six-mark trade scheme explicitly credits output per worker, average costs, competitiveness, export revenue and import expenditure. The eight-mark schemes use levels: **6–8** for reasoned discussion with developed analysis of both sides and thoughtful evaluation. One side may be deeper. There is no universal one-mark-per-arrow rule, fixed paragraph count, or separate guaranteed judgement mark. Models are teacher-written examples, not official prose answers or guaranteed scores.

For employment, `3-microeconomic-decision-makers.md`, **2023ON-22 Q3(c)**, is the accepted prior lesson basis: training → skills/productivity → occupational mobility/job opportunities → lower structural unemployment. Its instruction to reward the same point only once informs modelling.

## Scheme wording versus teaching application

- Explicit education-scheme limits: initial spending and inflation; emigration; too few appropriate jobs; access limited to high-income families.
- Explicit budget-scheme limits: spending on education/training/infrastructure; possible failure; lower tax revenue; foregone profits after selling profitable state firms; short-run deficit increase versus possible long-run reduction.
- Opportunity cost, programme quality, weak investment confidence and protective-rule trade-offs are teacher applications of definitions and Lessons 2–3. They are not labelled as quotations from the education question.
- The productivity scene and ¥1,200/100/150 example use hypothetical figures. Hold worker-hours constant in the scene; hold total cost constant and exclude the training cost in the unit-cost calculation. Do not add unlike sector outputs as physical units.
- A firm illustrates a specified unit-cost link. Inflation and growth claims refer to the economy as a whole. The PPC remains an outward-shift explanation; the superseded movement-towards-frontier contrast is not restored.
- Current-account teaching concerns the goods/services balance within the wider account. Other items are held constant; export revenue is not government revenue, and a budget deficit is not a balance-of-payments deficit.

## Teaching and design

Lesson 4: allow about 45 minutes for the core, including the six-minute answer and feedback. Its optional inflation question follows Summary. Lesson 5: allow 50–55 minutes if both full Discuss answers are written; in a shorter period, use the education question for guided planning and reserve independent writing for the budget question, or resume next period. Do not rush feedback to fit a nominal duration.

The design locally adapts Enterprise's warm white, navy and teal system, restrained accents, clear hierarchy, stable answer spaces and labelled source dialogs. No Enterprise or A-level renderer is imported. Models reveal paragraph by paragraph; written checks reveal row by row; the production scene and PPC have Back/Reset controls. Handout view retains completed content and model prose; quizzes and flashcards cover their respective split.

## Validation, 14 September

- JavaScript syntax checks passed; content rebuilt and validated: 49 items, 30 quizzes.
- `playwright test tests/supply-side-effects.spec.js --workers=2`: **10 passed**, covering both decks at 1440×810, 1920×1080 and phone width, completed reveals, source-dialog dismissal/focus, production counts and all study views.
- Scoped library smoke command for the supply-side lesson menu: **1 passed**. The initial unfiltered smoke run was stopped because its default concurrency overloaded the machine; no full-suite success is claimed.
- Existing platform synthetic workflow and 30-student feedback-pack tests: **10 passed**. `/api/config` verified on the existing localhost server; public samples are disabled in that server configuration, so validation used the synthetic workflows.
- Every completed classroom slide was captured and visually reviewed. Local browser checks verified the final sources and scene interaction. A final label-spacing adjustment and cache-version bump followed the layout sweep.
