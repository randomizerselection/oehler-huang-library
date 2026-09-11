Maintained HTML lessons: The multiplier and National income determination (9708 section 9.1.1)

The authoritative sources are apps/library/a-level/lessons/9-1-1-multiplier/ (31 slides)
and apps/library/a-level/lessons/9-1-1-national-income-determination/ (35 slides).
Portable offline outputs under authoring/a-level/outputs/multiplier-html/:
A-Level_Multiplier.html and A-Level_National_Income_Determination.html.

Split into two independent lessons on 10 September 2026. Lesson 1 covers the multiplier
process, size and calculation. Lesson 2 begins with national income determination, builds planned
aggregate expenditure from consumption and investment one component at a time, explains the 45°
line and equilibrium through stock changes, then reconnects the result to diminishing AD shifts.
Every slide belongs to the taught sequence. There is no deferred appendix.

Stable slide IDs live in apps/library/a-level/lessons/9-1-1-multiplier/slides.js. Diagram teaching states live in
apps/library/a-level/lessons/9-1-1-national-income-determination/diagram-scenes.js. Both lessons have their own slides.js and lesson.css. Reusable layouts, interaction and diagram geometry remain under
apps/library/a-level/shared-html/. The visual system and classroom rhythm match the maintained
Aggregate Demand lesson.

Build and check:
node --check apps/library/a-level/lessons/9-1-1-multiplier/slides.js
node --check apps/library/a-level/lessons/9-1-1-national-income-determination/slides.js
node --check apps/library/a-level/lessons/9-1-1-national-income-determination/diagram-scenes.js
node authoring/a-level/deck-sources/multiplier-lessons-1-2/export-html.mjs
node authoring/a-level/deck-sources/multiplier-lessons-1-2/verify-html.mjs

The older PowerPoint and artifact-tool sources remain in this folder as the immutable migration
reference. Do not overwrite base/manual-20260831.pptx. The HTML deck is now maintained
independently and should not be regenerated from the PowerPoint.

The AE model holds prices fixed and uses equal scales. The numerical sequence is internally
consistent: C = 0.75Y, original I = £100m and Y = £400m; after I rises to £150m, Y = £600m;
after I falls to £50m, Y = £200m. Successive AD shifts use £50m, £37.5m and £28.125m to show
the geometric decline created by MPC = 0.75. Six past-paper questions remain verbatim and are checked
against source-audit.json.
