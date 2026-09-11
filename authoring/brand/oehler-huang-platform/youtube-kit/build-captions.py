"""Export sentence-timed narration captions for the approved multiplier MP4."""
import json
from pathlib import Path
import textwrap

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[3]
scratch = REPO / "tmp/income-expenditure-video"
timeline = json.loads((scratch / "timeline.json").read_text(encoding="utf-8"))
cues = []
for scene in timeline:
    if scene.get("brand"):
        continue
    boundaries = [json.loads(line) for line in
                  (scratch / "audio-neural" / (scene["id"] + ".jsonl"))
                  .read_text(encoding="utf-8").splitlines()]
    for i, sentence in enumerate(boundaries):
        start = sentence["offset"] / 10_000_000
        end = min(start + sentence["duration"] / 10_000_000, scene["audioDuration"])
        if i + 1 < len(boundaries):
            end = min(end, boundaries[i + 1]["offset"] / 10_000_000 - .01)
        assert end > start
        cues.append((scene["start"] + start, scene["start"] + end, sentence["text"]))


def stamp(seconds):
    value = round(seconds * 1000)
    return f"{value // 3600000:02}:{value // 60000 % 60:02}:{value // 1000 % 60:02},{value % 1000:03}"


result = "\n\n".join(f"{i}\n{stamp(a)} --> {stamp(b)}\n" +
                       "\n".join(textwrap.wrap(text, width=48, break_long_words=False))
                       for i, (a, b, text) in enumerate(cues, 1)) + "\n"
assert all(cues[i][1] <= cues[i+1][0] for i in range(len(cues)-1))
(HERE / "multiplier-captions.srt").write_text(result, encoding="utf-8")
print(f"Wrote {len(cues)} non-overlapping sentence-timed captions.")
