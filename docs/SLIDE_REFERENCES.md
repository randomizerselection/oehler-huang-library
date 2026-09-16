# Referring to lesson decks and slides

In any active HTML deck, click the slide counter (for example, **7 / 28**) to
copy a reference. You can also use **More → Copy slide reference**, or the copy
button in **Overview**. Paste it into Codex and describe the requested edit.

The copied text includes the deck title, current slide number and title, a stable
reference, and a direct link. For example:

```text
Reference: a-level/lessons/9-1-3-income-gaps/slides.js#retrieval-multiplier
```

You can write “In this slide, simplify the Chinese explanation” after the pasted
reference. For several slides, copy each reference. For a whole deck, the part
before `#` identifies its source file. Overview displays each slide's ID and lets
you search by ID or full reference as well as title and number.

Slide numbers describe today's order. The saved `id` stays with the slide through
reordering and wording changes. Existing numeric links still work; copied links
use IDs. A-level links also preserve numbered animation steps. Other interactions
(answer choices, opened feedback, and partial reveals) are not captured; mention
these in the edit request when relevant.

If the browser cannot access the clipboard, Overview shows selected text for
manual copying. References describe the canonical HTML source; previously exported
PowerPoint, PDF and portable HTML files need separate regeneration.

## Authoring rules

- Resolve the reference under `apps/library/`, then find the exact slide `id`.
- Preserve existing IDs when editing or moving slides within a deck. Never
  regenerate IDs from current titles or positions.
- Give new slides unique, readable, lowercase hyphenated IDs. When duplicating a
  slide, assign the copy a new ID. IDs must be unique within each deck.
- A source path plus ID identifies the slide globally. Do not change source paths
  casually; a source-file move changes the deck reference.
- Run the slide reference browser checks after shared navigation changes. They
  validate IDs across active decks and exercise copying and stable navigation.
