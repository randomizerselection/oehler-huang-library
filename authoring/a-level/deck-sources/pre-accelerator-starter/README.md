# Multiplier starter

Current coverage, corrected by the teacher on 10 September 2026: the multiplier
lesson has been taught; the consumption and saving lesson has NOT. This starter
uses only the multiplier process, MPC/MPS formulae and a short government-spending
application already supported by the multiplier deck. Do not restore the former
consumption-function/APC question or presume the accelerator is the next lesson.

`build.mjs` is the current builder. It imports `manual-base.pptx`, preserving the
user's manually removed labels and adjusted positions, then replaces the repeated
multiplier and Ghana questions and their feedback. `original-build.mjs` is retained
for recovery only and must not regenerate the maintained deck.

Output: `../../outputs/Multiplier-Classroom-Starter.pptx`.
Run with the bundled Node runtime. The builder retains a separately validated
private copy before updating the single classroom output.

Question audit, 10 September 2026:

- Q1: 9708/31 May/June 2021 Q24, QP p.9, MS p.2, D. This multiplier-process
  question replaces 9708/32 February/March 2026 Q15, which required the untaught
  consumption function. Exact wording and option order preserved; absent from
  the taught multiplier deck.
- Replaced the previously taught 9708/32 February/March 2021 Q24 with
  9708/31 October/November 2021 Q24, QP p.8, MS p.2, B. Students infer MPC from
  an injection and the resulting income change. Original wording and options.
- Replaced the previously taught Ghana 9708/41 October/November 2024 Q1(b) with
  9708/41 October/November 2021 Q4(a), QP p.4, MS p.10. Full original 12-mark
  wording is visible, but the assigned task is explicitly a teacher-adapted
  five-minute preparation exercise. Its feedback is not a complete 12-mark model.

Freshness means absent from the taught multiplier deck, checked by question
wording and paper reference. It cannot establish that no student has encountered
the question elsewhere. All source paths and marking distinctions are in speaker
notes. The 10-minute core and optional five-minute extension remain unchanged.

`student-pdf.py` reads only question slides 1–2 from the current classroom PPTX
and makes `../../outputs/pdf/Multiplier-Student-Tasks.pdf`.
This iPad student edition has three 3:4 portrait pages, embedded Arial fonts,
selectable text, one task per page and no solutions, notes or answer annotations.
The optional written task retains its explicit five-minute adaptation. The
script verifies the question wording and option order against the source PPTX.

`solutions-pdf.py` creates the matching four-page iPad answer edition at
`../../outputs/pdf/Multiplier-Revealed-Solutions.pdf` for sharing
after completion. The first three pages keep each original task alongside its
correct answer, working or preparation model. Page 4 is the complete unchanged
original mark-scheme page for 9708/41/O/N/21 Q4(a), source page 10, including all
indicative content and L1–L4 descriptors. It preserves the questions-only PDF
separately and verifies the appended page's text and PDF drawing stream against
the original.
