# Oehler-Huang Economics

## Channel identity

**Channel name:** Oehler-Huang Economics  
**Preferred handle:** @OehlerHuangEconomics  
**Fallback handle:** @OehlerHuangEcon  
**Tagline:** Clear explanations. Rigorous reasoning.  
**Parent brand:** Oehler-Huang Platform

The name retains your distinctive surname and tells students immediately what the channel teaches. “Platform” remains the parent identity in the logo clips and About text. The handle is a recommendation; availability has not been checked or reserved.

Use the three curves as the profile symbol, with forest green and warm ivory throughout. Reserve serif lettering for the brand and short thumbnail titles; use a clear sans-serif typeface for explanatory text and diagrams.

## Ready to upload

| File | Use |
|---|---|
| `profile-picture.png` | Square channel avatar; keep the whole symbol in the circular crop |
| `channel-banner.png` | 2560 × 1440 channel banner; key content stays inside the central safe area |
| `video-watermark.png` | Square branding watermark, under 1 MB; optional during lessons |
| `channel-description.txt` | Paste into the channel description |
| `upload-defaults.txt` | Reusable About/footer text; put the specific lesson summary above it |
| `multiplier-thumbnail.png` | Finished 3840 × 2160 thumbnail for the existing video |
| `first-upload-multiplier.txt` | Title, description, actual chapter times, pinned question, and student message |
| `multiplier-captions.srt` | English narration captions for the existing 3:43 video |

The standalone description file contains only the description. The first-upload file contains labelled sections: copy each section into its corresponding field, not the whole file into the description.

## Assets for future videos

| File | Use |
|---|---|
| `thumbnail-editor.html` | Open in a browser; change the wording, insert the new lesson’s diagram, and download a PNG |
| `upload-template.txt` | Reusable title, description, pinned comment, and student message |
| `intro.mp4` | Four-second logo opening with the original three-note cue |
| `outro.mp4` | Five-second logo closing with the resolving cue |
| `intro-sound.wav`, `outro-sound.wav` | Separate audio cues for your video editor |
| `end-screen.png` | Optional final still with space on the right for YouTube’s next-video and subscribe elements |
| `channel-banner.svg`, `multiplier-thumbnail.svg`, `end-screen.svg` | Editable layout sources with the logo embedded |

The thumbnail editor runs locally and needs no account. Keep the title to a few words. Replace the multiplier diagram when the topic changes. The small preview helps judge legibility. Exported images are 3840 × 2160; inserting a large photograph can increase file size.

The intro and outro are extracted from the approved video. Add them only to lesson footage that does not already contain them. The sounds are original synthesized tones, not commercial music samples. Keep them around the branding rather than beneath calculations or explanations.

For a future YouTube end screen, hold `end-screen.png` for about 10–15 seconds after the explanation. Place one recommended video in the upper-right space and the subscribe element below it using YouTube Studio. The PNG itself has no clickable elements. The current multiplier video retains its existing five-second logo ending.

## Suggested playlists

**A Level Economics | Macroeconomics**  
National income, aggregate demand and supply, inflation, unemployment, growth, and macroeconomic policy, explained through models and worked examples.

**A Level Economics | Microeconomics**  
Choices, markets, firms, efficiency, and government intervention, with a focus on the reasoning behind economic diagrams.

**IGCSE Economics | Core Concepts**  
Clear introductions to the concepts and applications students need for IGCSE Economics.

**Economics Diagrams | Step by Step**  
How to construct, interpret, and explain economic diagrams. Add suitable videos to this playlist as well as their course playlist.

Create playlists as their first videos become available; no fixed upload schedule is promised.

## Reusable title patterns

- `[Topic]: [Specific explanation] | A Level Economics`
- `[Question students ask] | IGCSE Economics`
- `[Diagram name] Explained Step by Step | Economics`

Examples: “Price Elasticity of Demand: Calculations Explained | IGCSE Economics”; “The Accelerator: Why Investment Fluctuates | A Level Economics”. Put the topic before the brand name; the channel name already identifies you.

## Short channel-trailer script

“Welcome to Oehler-Huang Economics. I’m Samuel Oehler-Huang, a high-school economics teacher. These short lessons make the reasoning behind economics visible, through clear diagrams, worked calculations, and step-by-step explanations. Whether you’re studying IGCSE or A Level, start with the playlist for your course.”

## A simple upload routine

1. Export the lesson with its introduction and ending. Use the existing 1080p MP4 format as the working standard.
2. Make a topic-specific thumbnail in the editor and check its small preview.
3. Add a specific title and opening description; reuse the channel footer below them. Add only published resource links.
4. Add the course playlist and English captions. Check technical terms, numbers, and formula pronunciation. Caption subdivisions in the supplied SRT use the speech service’s sentence timing.
5. Add chapters from the final video, starting at 00:00. Review the uploaded video’s picture, sound, thumbnail, and captions before choosing when to publish.
6. Add one application question as the pinned comment and share the published link with students.

## Checked YouTube specifications — 10 September 2026

- Banner: minimum 2048 × 1152; recommended 2560 × 1440; maximum 6 MB. The published 1235 × 338 safe area applies at the minimum size. It scales to approximately 1544 × 423 at 2560 × 1440. This banner’s key content fits comfortably inside that central area. Profile images must be supported image formats and no larger than 15 MB; watermarks must be square, at least 150 × 150, and under 1 MB. [YouTube branding guidance](https://support.google.com/youtube/answer/10456525?hl=en).
- Current thumbnail guidance recommends 3840 × 2160 for landscape videos. The upload limits differ by device: 2 MB on mobile, 50 MB on desktop. The supplied PNG is kept below 2 MB. Custom thumbnails require a verified account. [YouTube thumbnail guidance](https://support.google.com/youtube/answer/72431?hl=en).
- Start descriptions with information specific to the lesson; a default footer can supply channel information. [Description guidance](https://support.google.com/youtube/answer/12948449?hl=en).
- Manual chapters start at 00:00, have at least three timestamps, and each last at least 10 seconds. [Chapter guidance](https://support.google.com/youtube/answer/9884579?hl=en).
- End-screen elements can occupy the final 5–20 seconds of a video at least 25 seconds long. [End-screen guidance](https://support.google.com/youtube/answer/6388789?hl=en).
- Handles are unique. Confirm the recommended handle in Studio before using it as a public link. [Handle guidance](https://support.google.com/youtube/answer/11585688?hl=en).

## Source maintenance

The layout builder is `build-kit.mjs`. Run it from the platform repository with `node authoring/brand/oehler-huang-platform/youtube-kit/build-kit.mjs`. It uses the existing approved logo; editable typography and diagram geometry are native SVG. No YouTube account settings have been changed and nothing has been uploaded.
