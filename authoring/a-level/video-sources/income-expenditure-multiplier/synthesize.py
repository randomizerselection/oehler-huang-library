"""Generate neural male narration and original opening/closing sonic signatures."""
import asyncio
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import wave

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[3]
SCRATCH = REPO / "tmp/income-expenditure-video"
sys.path.insert(0, str(SCRATCH / "python-deps"))
import edge_tts
import imageio_ffmpeg
import numpy as np

VOICE = "en-GB-RyanNeural"
RATE = "-5%"
SR = 48000
AUDIO = SCRATCH / "audio-neural"
AUDIO.mkdir(parents=True, exist_ok=True)
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


def write_wav(filename, samples):
    with wave.open(str(filename), "wb") as f:
        f.setnchannels(2)
        f.setsampwidth(2)
        f.setframerate(SR)
        f.writeframes((np.clip(samples, -1, 1) * 32767).astype("<i2").tobytes())


def signature(name, duration, notes):
    """Gentle felt-key-like tones: C-E-G ascent; G-E-C closing resolution."""
    result = np.zeros((round(duration * SR), 2))
    for index, (midi, start) in enumerate(notes):
        t = np.arange(round((duration - start) * SR)) / SR
        hz = 440 * 2 ** ((midi - 69) / 12)
        attack = 1 - np.exp(-t / 0.012)
        tone = sum(a * np.sin(2 * np.pi * hz * h * t) * np.exp(-t / decay)
                   for h, a, decay in [(1, 1, 1.0), (2, .22, .65), (3, .07, .38)])
        tone *= attack * .10
        offset = round(start * SR)
        for channel, gain in enumerate([.94 + index * .025, .99 - index * .025]):
            result[offset:offset + len(tone), channel] += tone * gain
        # Quiet, short reflections give space without a long music tail.
        for delay, gain in [(.11, .13), (.23, .07)]:
            pos = offset + round(delay * SR)
            count = min(len(tone), len(result) - pos)
            if count > 0:
                result[pos:pos + count] += tone[:count, None] * gain
    fade = min(round(.6 * SR), len(result))
    result[-fade:] *= np.linspace(1, 0, fade)[:, None]
    write_wav(AUDIO / f"{name}.wav", result)


async def main():
    segments = json.loads((HERE / "narration.json").read_text(encoding="utf-8"))
    available = await edge_tts.list_voices()
    selected = next(v for v in available if v["ShortName"] == VOICE)
    assert selected["Gender"] == "Male", selected
    print(f"Voice: {VOICE}, {selected['Gender']}, rate {RATE}", flush=True)
    for segment in segments:
        basename = AUDIO / segment["id"]
        key = hashlib.sha256((VOICE + RATE + segment["speech"]).encode()).hexdigest()
        stamp = basename.with_suffix(".sha256")
        if not (basename.with_suffix(".wav").exists() and stamp.exists()
                and stamp.read_text() == key):
            for attempt in range(3):
                try:
                    await edge_tts.Communicate(segment["speech"], VOICE, rate=RATE).save(
                        str(basename.with_suffix(".mp3")), str(basename.with_suffix(".jsonl")))
                    break
                except Exception:
                    if attempt == 2:
                        raise
                    await asyncio.sleep(2)
            subprocess.run([FFMPEG, "-y", "-v", "error", "-i", str(basename.with_suffix(".mp3")),
                            "-af", "loudnorm=I=-18:TP=-2:LRA=7", "-ar", str(SR), "-ac", "2",
                            "-c:a", "pcm_s16le", str(basename.with_suffix(".wav"))], check=True)
            stamp.write_text(key)
        print(f"Narration ready: {segment['id']}", flush=True)
    signature("brand-intro", 4, [(60, .30), (64, .77), (67, 1.24)])
    signature("brand-outro", 5, [(67, .30), (64, .86), (60, 1.42)])
    (AUDIO / "voice.json").write_text(json.dumps({"voice": VOICE, "gender": "Male", "rate": RATE,
        "service": "Microsoft Edge neural speech", "sampleRate": SR,
        "music": "Original synthesized C-E-G opening and G-E-C closing; no sampled music."}, indent=2))
    print("Logo cues ready: 4-second intro, 5-second outro.", flush=True)


if __name__ == "__main__":
    asyncio.run(main())
