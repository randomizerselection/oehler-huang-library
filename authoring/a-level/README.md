# A-level authoring

The canonical HTML lessons and shared renderer are under `apps/library/a-level/`
in this repository. Use the course landing page to select active lessons; unlinked
decks and unused slide types are legacy references.

- `planning/`: the syllabus planner, 32-lesson coverage planner and extracted
  sections 9–11 syllabus workbook.
- `deck-sources/`: source audits, portable HTML export/check scripts and immutable
  historical PowerPoint references. There is no editable `html/` copy here.
- `classroom/`: the retained multiplier PowerPoint used by the source-fidelity audit.
- `handouts/`: preserved handout documents; revise only when requested.
- `outputs/`: regenerated portable classroom HTML, excluded from Git.
- `scripts/export-pdf.mjs`: student PDF exporter with complete diagram stages.
  Follow [PDF-EXPORT.md](PDF-EXPORT.md) for export and visual verification.

From the repository root, run `npm run export:a-level`, then `npm run check:a-level`.
Use `npm start` to preview the public lesson source. Follow the root and course
`AGENTS.md` files for focused edits and validation.

The one-time PowerPoint-to-HTML importer and standalone preview server remain in
the deprecated original project as historical records. Neither is a maintained
dependency. Edit the canonical HTML directly and use the platform preview server.
