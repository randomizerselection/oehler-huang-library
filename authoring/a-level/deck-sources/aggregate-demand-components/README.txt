Maintained HTML deck: Components of Aggregate Demand (9708 section 9.1.2)

The source in apps/library/a-level/lessons/9-1-2-aggregate-demand/ is authoritative (repository root). The portable classroom output is generated at:
authoring/a-level/outputs/aggregate-demand-html/A-Level_Aggregate_Demand_Components.html

The deck follows the taught multiplier lessons and covers the planner's complete 1.5-lesson allocation:
consumption and saving functions; autonomous and induced expenditure; investment and the accelerator;
government spending; net exports; synthesis and assessment.

Stable slide IDs live in apps/library/a-level/lessons/9-1-2-aggregate-demand/slides.js. Diagram teaching states live in apps/library/a-level/lessons/9-1-2-aggregate-demand/diagram-scenes.js.
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

The output is one offline HTML file. Do not edit the generated file directly.
