# Money revision video — IGCSE Economics

English-only Oehler-Huang Platform video for Cambridge IGCSE Economics 0455,
topic 3.1.1. Current runtime: 3 minutes 59 seconds, including branding and thinking time.
The builder enforces a duration below five minutes.
The scope is definition, four functions and seven characteristics, with a brief
forms/payment-tools clarification. Banking operations and A-level monetary theory
are outside this video's scope.

Revised on 11 September 2026 at the user’s request to run under five minutes.
Use concise examples, brief pause prompts and a complete short Paper 2 model.
Keep all four functions and seven characteristics; avoid repeated summaries.

## Sources and teaching choices

- Official syllabus: https://www.cambridgeinternational.org/Images/718148-2027-2029-syllabus.pdf,
  section 3.1.1, printed page 16. Checked 11 September 2026.
- `apps/library/references/igcse-economics-definitions-2026.md`: Money, four
  functions and Characteristics of money, rows under 3.1.1.
- `apps/library/references/paper-2-mark-schemes-2023-2025/3-microeconomic-decision-makers.md`:
  2023ON-21 Q3(b) for functions; 2023ON-23 Q4(a) for the seven characteristics;
  2024MJ-22 Q4(b) for explanations and the displayed four-mark practice;
  2025ON-23 Q3(b) for links between characteristics and functions.
- Active Money lesson 1 and lesson 2 under
  `apps/library/lessons/unit-3-decision-makers/3-1-money-and-banking/`.
- Original hypothetical Alex cases and retrieval questions. The real exam stem
  is identified on screen; its model is teacher-written, grounded in the scheme.

The named IGCSE narrator does not impersonate the teacher. Voice is the established
synthetic British male `en-GB-RyanNeural`, at -5%, normalized to -18 LUFS and -2 dBTP.
There is no music underneath teaching. The short original opening/closing tones
and current three-curve logo continue the platform's video identity. Illustrations
are original canvas diagrams; stylized notes are teaching symbols.

## Rebuild from the repository root

Requires Python with numpy, imageio-ffmpeg and edge-tts, Node with the repository's
Playwright dependency, and Microsoft Edge. The synthesizer can reuse the existing
edge-tts installation at `tmp/income-expenditure-video/python-deps`; otherwise
install `python -m pip install edge-tts numpy imageio-ffmpeg`. Speech generation
requires network access. No API key is used.

```powershell
python authoring/igcse-economics/video-sources/money/synthesize.py
node authoring/igcse-economics/video-sources/money/build.mjs --preview
node authoring/igcse-economics/video-sources/money/build.mjs
python authoring/igcse-economics/video-sources/money/package.py
```

Edit `narration.json` for script changes and `scene.html` for teaching graphics.
The voice cache hashes the text, voice and rate. Source code remains outside public
HTTP roots; no course renderer or active lesson is modified.

Outputs: `authoring/igcse-economics/outputs/videos/money/`. Working audio, timeline
and preview frames: `tmp/igcse-money-video/`. Both paths are excluded from Git.
Files include 1080p YouTube and 720p QQ H.264/AAC MP4s with fast-start headers and
burned-in English captions, SRT, thumbnail, transcript, upload notes and validation.
Creating these assets does not upload to YouTube or send to a QQ group.

## Validation

Preview every scene and every caption interval, check transformed text bounds and
two-line caption fit, visually inspect a contact sheet and selected full-resolution
frames, verify worked arithmetic and seven-characteristic coverage, decode both
complete exports, inspect audio loudness/peak and stream metadata. Captions use
speech-service sentence timestamps. Pause prompts precede separately revealed answers.
