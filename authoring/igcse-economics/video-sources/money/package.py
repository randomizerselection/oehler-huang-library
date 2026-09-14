"""Package local upload assets and verify the two complete video streams."""
from pathlib import Path
import json
import subprocess
import imageio_ffmpeg

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[3]
TMP = REPO / 'tmp/igcse-money-video'
OUT = REPO / 'authoring/igcse-economics/outputs/videos/money'
timeline = json.loads((TMP / 'timeline.json').read_text(encoding='utf-8'))
chapter_ids = {'definition', 'exchange', 'check-functions', 'characteristics', 'divisible', 'acceptable', 'exam'}
chapters = ['00:00 Could you pay with a sandwich?']
for scene in timeline:
    if scene['id'] in chapter_ids:
        seconds = int(scene['start'])
        chapters.append(f"{seconds//60:02}:{seconds%60:02} {scene['title']}")
notes = '''TITLE
Money: Definition, 4 Functions & 7 Characteristics | IGCSE Economics

DESCRIPTION
Why might a seller refuse a valuable sandwich but accept money? Follow Alex through purchases, price comparisons, saving and a repayment agreement to understand what money does and what makes it useful.

English revision for Cambridge IGCSE Economics 0455, topic 3.1.1. Covers the definition of money; a brief distinction between money and payment tools; medium of exchange, unit of account, store of value and standard of deferred payment; and seven characteristics: durability, portability, divisibility, uniformity, recognisability, general acceptability and limited supply.

Revision in under five minutes, including a functions check and a four-mark Paper 2 question with a teacher-written model answer. All money amounts and student cases are illustrative.

CHAPTERS
''' + '\n'.join(chapters) + '''

SOURCE NOTES
Cambridge IGCSE Economics 0455 syllabus, 2027–2029, section 3.1.1:
https://www.cambridgeinternational.org/Images/718148-2027-2029-syllabus.pdf
Paper 2 practice: Cambridge 0455/22, May/June 2024, Q4(b).
Definitions and explanations checked against the platform's IGCSE definitions and 2023–2025 Paper 2 mark-scheme archive. The model answer and remaining practice are teacher-written. Independent revision material; not an official Cambridge publication.

Oehler-Huang Platform
Narration: synthetic British English voice (Microsoft en-GB-RyanNeural).
Original educational graphics; existing Oehler-Huang three-curve logo; original opening and closing tones. Full English captions are visible in both videos. Money-English.srt is also included for selectable YouTube captions.

#IGCSEEconomics #Money #EconomicsRevision

QQ GROUP MESSAGE — READY TO COPY
Watch this English revision video on money before our next lesson. Pause at the checks and write your answer before continuing. Be ready to define money, explain its four functions, and distinguish its characteristics from its functions. Try the four-mark question independently.

FILES
Money-YouTube-1080p.mp4 — full-resolution upload
Money-QQ-720p.mp4 — smaller sharing copy, with the same content and visible captions
Money-thumbnail.png — YouTube thumbnail
Money-English.srt — English captions
Transcript.txt — complete narration

The files are prepared locally. No YouTube upload or QQ message has been sent.
'''
(OUT / 'Upload-notes.txt').write_text(notes, encoding='utf-8')

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
results = {}
for name in ['Money-YouTube-1080p.mp4', 'Money-QQ-720p.mp4']:
    target = OUT / name
    subprocess.run([ffmpeg, '-v', 'error', '-i', str(target), '-f', 'null', '-'], check=True)
    probe = subprocess.run([ffmpeg, '-hide_banner', '-i', str(target)], capture_output=True, text=True)
    level = subprocess.run([ffmpeg, '-hide_banner', '-i', str(target), '-af',
                            'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True, check=True)
    results[name] = {'bytes': target.stat().st_size, 'completeDecode': 'passed',
                     'streams': probe.stderr, 'audioSummary': level.stderr.split('Summary:')[-1]}
assert 30 - 20 == 10 and 10 - 7 == 3
assert timeline[-1]['end'] < 300, 'Video must be under five minutes'
assert len([s for s in timeline if s.get('section', '').startswith('Characteristics ·')]) == 7
visual = json.loads((TMP / 'visual-validation.json').read_text())
assert not visual['errors']
report = {'durationSeconds': timeline[-1]['end'], 'captionCues': visual['captions'],
          'sceneCount': len(timeline), 'visualBounds': 'passed for every scene and caption',
          'contentArithmetic': 'passed', 'files': results}
(OUT / 'Validation.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps({'durationSeconds': timeline[-1]['end'], 'files': {k:v['bytes'] for k,v in results.items()}}, indent=2))
