Maintained HTML lessons: Components of Aggregate Demand (9708 section 9.1.2)

The canonical sources are under apps/library/a-level/lessons/ (repository root):
9-1-2-aggregate-demand/ — Part 1: consumption and saving, 22 slides.
9-1-2-investment-accelerator/ — Part 2: investment and the accelerator,
government spending, net exports, synthesis and assessment, 41 slides.

Split on 10 September 2026 at investment-section (formerly slide 23).
The original teaching slides retain their stable IDs and order. Part 2 adds
learning objectives after its opening section slide. Both lessons are linked
from the course landing page and the relevant syllabus planner sessions.

The Part 2 opening now uses a factory photograph. Comparison sides and investment
determinants reveal on successive clicks. A separate diagram compares autonomous
and induced investment against income growth, and the AE shift reaches its new
equilibrium at £600m. The accelerator definition highlights its defining phrases.

The factory sequence now pairs the table with countable machine icons: demand
+25% needs two additions, tripling annual purchases from one to three (+200%).
The former second output table is an independent calculation hinge, followed by
the output/investment graph as feedback. Retrieval, stock/flow, equal-growth and
capacity checks include diagnostic teaching notes. The Year 5 explanation repeats
the original question, data and options beside its revealed method. The conditions
table explicitly contrasts stronger and weaker responses to the same demand rise.

Portable classroom outputs are generated at:
authoring/a-level/outputs/aggregate-demand-html/A-Level_Aggregate_Demand_Components.html
authoring/a-level/outputs/aggregate-demand-html/A-Level_Investment_and_the_Accelerator.html

Together the lessons follow the taught multiplier lessons and cover the planner's complete 1.5-lesson allocation:
consumption and saving functions; autonomous and induced expenditure; investment and the accelerator;
government spending; net exports; synthesis and assessment.

Stable slide IDs live in each lesson's slides.js. Diagram teaching states live in its diagram-scenes.js.
Reusable geometry and classroom interaction remain under apps/library/a-level/shared-html/.

Slide titles follow the project-wide two-level classroom convention in AGENTS.md: a small
function label identifies the teaching move, while the main title names the economics subject.

Formulae follow the current multiplier-deck convention: clean upright sans-serif notation,
proper mathematical symbols, true subscripts, and one calculation step per line in worked methods.

The visual sequence follows the project-wide concept-led image convention: photographs are used
as intuition pauses or applied cases, not as decorative filler. The deck includes three full-screen
visual pauses and two photo cases in addition to the cover image.

Build and check:
node --check apps/library/a-level/lessons/9-1-2-aggregate-demand/slides.js
node --check apps/library/a-level/lessons/9-1-2-aggregate-demand/diagram-scenes.js
node authoring/a-level/deck-sources/aggregate-demand-components/export-html.mjs
node authoring/a-level/deck-sources/aggregate-demand-components/verify-html.mjs

Classroom controls include a Selector button and the S shortcut. They open the same side-panel
Student Selector used by the Economics lessons while keeping the slide visible beside it. The
deck itself remains portable and offline; opening the selector needs an internet connection.

Each lesson has its own offline HTML file. The export and verify commands handle both parts.
Do not edit the generated files directly.
