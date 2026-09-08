# Investment course classroom presentation instructions

## Consolidated ownership

Work from `C:\Users\oehle\Documents\oehler-huang-platform`. Read the root
`AGENTS.md` and `authoring/README.md`. This folder holds non-public planning and
source tools; the canonical HTML lessons live under `apps/library/` and are edited
directly there. Never sync from the deprecated sibling course project.

The course landing page determines active status. Unlinked lessons and unused
lesson types are legacy references. Use the linked HTML lessons as the default
for new work. The PowerPoint-specific rules below apply only to an explicitly
requested PowerPoint task; they do not override the current HTML course system.

## Authoritative context

- Use `planning/LESSON_DECK_PREFERENCES.md` as the concise, authoritative design and pedagogy brief. Do not infer the same preferences again from every historical deck unless the user asks for comparison or preference discovery.
- Files inside `lesson-XX/` are retained PowerPoint references. Their presence does not make them active classroom lessons. Use the public landing page for active status.
- For an explicitly requested new PowerPoint using v6, use the retained Investment Course Lesson Deck v6 template. For an edit to an existing lesson, use that lesson's current PPTX as the design source and do not restart from the template.
- If more than one active PPTX could match the request, use the user's title or named lesson. Ask only when the target remains materially ambiguous.

## Fast edit mode

Default to Fast Edit Mode for wording, explanation, question, answer, note, pacing, ordering, or other changes limited to a small number of slides in an existing deck.

- Inspect the requested slides and their immediate neighbours first. Do not repeatedly inspect the full template, legacy versions, textbooks, syllabus, or unrelated lessons.
- Preserve masters, layouts, typography, images, notes, and unaffected slide content.
- Reuse existing visuals and claims. Do not search for sources or create images unless the requested change introduces a new factual claim or specifically needs a new visual.
- Edit the existing deck in place through its inherited objects; do not recreate it from scratch or convert it to a generic layout system.
- Keep scratch builders, renders, inspections, and extracted media in one task-specific folder under `tmp/`. Reuse that folder throughout the revision instead of starting a new build tree for each preference adjustment.
- During iterative feedback, render and inspect only changed slides and their immediate neighbours. Run automated overflow/layout checks as appropriate.
- When the user asks for a quick draft, deliver it as a draft after targeted checks. Perform the complete every-slide render and inspection once when the user asks for the final, classroom-ready, or handoff version.
- Produce one updated output. Do not create chains of `v2`, `revised`, `refined`, `polished`, or `final-2` files unless the user requests versions or alternatives.
- When replacing the canonical output, build to a temporary file, validate it, and only then replace the target. Preserve a recoverable prior copy under `legacy/` for a substantial restructuring, not for every minor wording edit.

## New lesson mode

For an explicitly requested new v6 PowerPoint, use the v6 retained reference and `planning/LESSON_DECK_PREFERENCES.md` without re-auditing historical versions.

- Read only the relevant scheme-of-work lesson entry and source excerpts needed for that lesson.
- Create the lesson plan/content once, then batch content decisions before building slides.
- Store reusable authoring source under `lesson-XX/source/` rather than leaving the only builder in `tmp/`.
- Separate editable lesson content from layout helpers when practical: keep concise slide text, answers, teacher notes, and sources in a stable content structure, while reusable layout functions stay in the builder.
- Give slides stable semantic IDs in the authoring source so later edits can target them without rescanning the whole deck.
- Reuse a cached inspection/frame map for the unchanged v6 reference. Reinspect the template only when its file hash changes or the requested layout is not covered by the cache.
- Use existing course assets before searching for or generating new ones.
- Generate one canonical PPTX in the lesson folder. Use `tmp/` only for transient renders and diagnostics.
- Use targeted slide previews while drafting. Perform one complete render, overflow check, notes/source check, and visual inspection after the lesson content is settled.

## Scope boundaries

- Do not update handouts, the scheme of work, another lesson, or the v6 template merely because a deck changes unless the user requests synchronisation.
- Do not re-research frozen figures or citations that remain unchanged.
- Use full review mode for a new deck, substantial narrative rewrite, template/master change, new images, charts or diagrams, global style change, or final publication.
