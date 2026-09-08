# Current A-level lessons

Work in `oehler-huang-platform`. Read root `AGENTS.md` and
`authoring/a-level/AGENTS.md` for the preserved teaching and notation preferences.

- `index.html` determines active lessons. Edit linked `lessons/<slug>/` files
  directly: `slides.js`, `diagram-scenes.js`, `lesson.css` and local assets.
- Shared rendering, interaction and diagram geometry are in `shared-html/`.
  Preserve `window.ALEVEL_LESSON`, stable slide IDs and the current design.
- Prioritise authentic Paper 3 and Paper 4 questions and explicit modelling of
  answers for full marks. Follow the exam-alignment guidance in
  `authoring/a-level/AGENTS.md` when planning teaching and practice.
- Unlinked decks and unused slide types are legacy references. New lessons follow
  the linked HTML lessons and their demonstrated slide kinds, not archived PPTX
  layouts or a one-time PowerPoint importer.
- Planning, source audits, portable HTML exporters and checks are under
  `authoring/a-level/`. No second editable HTML copy exists there.
- Use `npm start` at the repository root for preview. Follow root validation levels.
  `npm run export:a-level` followed by `npm run check:a-level` verifies portable
  outputs when they are in scope.
- Link a finished new lesson from the course landing page and rebuild the content
  manifest when routes or titles change. Preserve course-home and platform hooks.
