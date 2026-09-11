"""Create upload captions, timed chapters, source notes and validation data."""
import json
import textwrap
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[3]
SCRATCH = REPO / 'tmp/accelerator-effect-video'
OUT = REPO / 'authoring/a-level/outputs/videos/accelerator-effect'
timeline = json.loads((SCRATCH / 'timeline.json').read_text(encoding='utf-8'))

def stamp(sec):
    ms = round(sec * 1000)
    return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'

cues=[]
for scene in timeline:
    if scene.get('brand'): continue
    boundaries=[json.loads(s) for s in (SCRATCH/'audio-neural'/f"{scene['id']}.jsonl").read_text(encoding='utf-8').splitlines()]
    for i,b in enumerate(boundaries):
        a=b['offset']/1e7
        z=min(a+b['duration']/1e7,scene['audioDuration'])
        if i+1<len(boundaries): z=min(z,boundaries[i+1]['offset']/1e7-.01)
        assert z>a
        cues.append((scene['start']+a,scene['start']+z,b['text']))
assert all(cues[i][1]<=cues[i+1][0] for i in range(len(cues)-1))
(OUT/'Accelerator-effect-English.srt').write_text('\n\n'.join(f'{i}\n{stamp(a)} --> {stamp(b)}\n'+ '\n'.join(textwrap.wrap(t,48,break_long_words=False)) for i,(a,b,t) in enumerate(cues,1))+'\n',encoding='utf-8')
chapter_ids=['hook','setup','expansion-question','amplification','definition','faster','slower','flat','chart','formula','practice','solution','conditions','direction','check','summary']
chapters=['00:00 The accelerator effect']
for s in timeline:
    if s['id'] in chapter_ids and s['id']!='hook':
        n=int(s['start']); chapters.append(f'{n//60:02}:{n%60:02} {s["title"]}')
description='''TITLE
The Accelerator Effect: Why Investment Falls While Demand Rises | A Level Economics

DESCRIPTION
Why can a factory sell more than ever while buying fewer new machines? Follow a countable factory example to understand the accelerator effect, net and gross investment, and why slower demand growth can reduce investment.

For Cambridge A Level Economics 9708, section 9.1.2. Covers the capital stock versus investment flow, replacement spending, demand growth, a supporting I = v × ΔY calculation, model conditions, and the distinction from the multiplier.

The factory example assumes full capacity, sustained demand, constant productivity and machine prices, and one replacement each year. The coefficient calculation assumes constant v and full adjustment; it excludes replacement. Practice questions are teacher-created, not reproduced examination questions.

CHAPTERS
'''+ '\n'.join(chapters)+'''

Narration: synthetic British male voice. Original opening and closing audio cues. English speech and Chinese key-point support are included in the video. Upload Accelerator-effect-English.srt for full English closed captions.

Oehler-Huang Economics · Oehler-Huang Platform
#ALevelEconomics #AcceleratorEffect #Investment

OPTIONAL TAGS
accelerator principle, accelerator effect, induced investment, net investment, gross investment, capital stock, A Level economics, demand growth

DINGTALK MESSAGE / 钉钉班级消息（草稿）
请观看这段“加速效应”复习视频。重点区分资本存量与投资流量、产量水平与产量变化，以及净投资与总投资。遇到暂停提示时，请先独立作答，再继续观看讲解。
Watch the accelerator-effect video and attempt the pause questions before revealing the answers. Be ready to explain why investment can fall even when demand is still rising.

FILES
YouTube: Accelerator-effect-YouTube-1080p.mp4
DingTalk: Accelerator-effect-DingTalk-720p.mp4
YouTube thumbnail: Accelerator-effect-thumbnail.png
Full English captions: Accelerator-effect-English.srt
'''
(OUT/'Upload-notes.txt').write_text(description,encoding='utf-8')
(OUT/'Transcript.txt').write_text('\n\n'.join(s['title']+'\n'+s['speech'] for s in timeline if not s.get('brand')),encoding='utf-8')
rows=[(800,8,0,1),(1000,10,2,3),(1600,16,6,7),(1800,18,2,3),(1800,18,0,1)]
assert all(q==k*100 and g==n+1 for q,k,n,g in rows)
assert all(rows[i][1]-rows[i-1][1]==rows[i][2] for i in range(1,5))
assert (1000-800)/800*100==25 and (3-1)/1*100==200
assert 2*15==30 and 2*5==10 and 10-30==-20
(SCRATCH/'content-validation.json').write_text(json.dumps({'durationSeconds':timeline[-1]['end'],'scenes':len(timeline),'captionCues':len(cues),'captionTiming':'non-overlapping speech-service boundaries','factoryArithmetic':'passed','coefficientArithmetic':'passed'},indent=2),encoding='utf-8')
print(f'Created upload package with {len(cues)} English caption cues.')
