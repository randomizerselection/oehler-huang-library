# Income–expenditure multiplier video

Editable animation and narration for the National income determination lesson.
Uses the lesson's fixed-price closed-economy example: C = 0.75Y, I initially £100m,
then £150m. Equilibrium income rises from £400m to £600m. The equal-scale diagram
distinguishes the £50m vertical AE shift from the £200m horizontal income change.
The cobweb is a simplified sequential adjustment: output responds to expenditure,
then the resulting income induces consumption. Round lengths are illustrative.

The model assumes no government or foreign trade, fixed prices and spare capacity.
The original reference is the active lesson at
`apps/library/a-level/lessons/9-1-1-national-income-determination/`.

From the repository root:

```powershell
python -m pip install --target tmp/income-expenditure-video/python-deps edge-tts==7.2.8
& authoring/a-level/video-sources/income-expenditure-multiplier/synthesize.ps1
node authoring/a-level/video-sources/income-expenditure-multiplier/build.mjs --preview
node authoring/a-level/video-sources/income-expenditure-multiplier/build.mjs
```

Requires network access to Microsoft Edge neural speech, Playwright with Edge,
and Python's numpy and imageio_ffmpeg. Uses the British male voice
`en-GB-RyanNeural` at -5% speed; speech is normalized to -18 LUFS with a -2 dBTP
target. Synthesis is cached by voice, speed and script hash. The MP4 uses H.264
video, stereo AAC audio, 1920 × 1080 at 24 fps, and a fast-start header.

The approved three-curve logo appears for four seconds at the beginning and
five seconds at the end, with gentle fades. A custom three-note soft-key cue
ascends C-E-G on entry and resolves G-E-C on exit. The tones are synthesized in
`synthesize.py`; no third-party music or samples are used. The cues do not overlap
the narration. Logo source: `authoring/brand/oehler-huang-platform/three-curves-logo.png`.

Narration is synthetic. The source speech service is accessed through
[edge-tts](https://github.com/rany2/edge-tts). Every lesson scene is retimed to its
new narration. Rendering preserves the previous deliverable until the new MP4
has completed and passed a full decode check.
Edit `narration.json` for speech and captions, and `scene.html` for visual states.
Scratch audio, timing data and preview frames stay under `tmp/income-expenditure-video`.
Deliverable: `authoring/a-level/outputs/videos/Income-expenditure-multiplier.mp4`.
