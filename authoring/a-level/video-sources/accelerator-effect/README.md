# Accelerator effect video

Durable animation, English narration and Chinese key-point support for the second
Oehler-Huang Economics explainer. Matches the multiplier video's palette, approved
three-curve brand card, British male neural voice and original musical signatures.

Source: the active `apps/library/a-level/lessons/9-1-2-investment-accelerator/slides.js`,
especially accelerator-factory, accelerator-machine-visual, accelerator-worked,
accelerator-growth-patterns and accelerator-growth-check. Its factory source is
Cambridge A Level Economics coursebook Chapter 41, Table 41.1 (local PDF pp.354–355).
The video retains the first five years and the stated constant productivity and
prices, full capacity, sustained demand and one annual replacement. No exam paper
is reproduced. Calculation and checks are teacher-created supporting practice.

Run from the repository root:

```powershell
python authoring/a-level/video-sources/accelerator-effect/synthesize.py
node authoring/a-level/video-sources/accelerator-effect/build.mjs --preview
node authoring/a-level/video-sources/accelerator-effect/build.mjs
python authoring/a-level/video-sources/accelerator-effect/package.py
node authoring/a-level/video-sources/accelerator-effect/thumbnail.mjs
python authoring/a-level/video-sources/accelerator-effect/verify.py
```

Dependencies: Python numpy, imageio_ffmpeg and edge-tts, plus Playwright and Edge.
The existing edge-tts installation in `tmp/income-expenditure-video/python-deps`
is reused. Voice: `en-GB-RyanNeural`, rate -5%, normalized to -18 LUFS and -2 dBTP.
Audio and intermediate frames are in `tmp/accelerator-effect-video`.

Deliverables are in `authoring/a-level/outputs/videos/accelerator-effect`:
1080p YouTube and 720p DingTalk MP4s, English SRT, thumbnail, transcript and upload
notes. Both MP4s use H.264, 8-bit 4:2:0, 24 fps, stereo AAC and fast-start headers.
The DingTalk file has a lower bitrate for easier sharing. These are local upload
assets; creating them does not publish or message anyone.

Validation: preview every scene, inspect output contact sheets, confirm numeric
examples and caption ordering, decode both complete videos, and check audio level.
