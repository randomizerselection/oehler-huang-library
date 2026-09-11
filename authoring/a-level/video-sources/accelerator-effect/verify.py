"""Verify final MP4 media and extract representative frames for visual review."""
import json
import re
import subprocess
from pathlib import Path
import imageio_ffmpeg
from PIL import Image, ImageDraw

REPO=Path(__file__).resolve().parents[4]
OUT=REPO/'authoring/a-level/outputs/videos/accelerator-effect'
SCRATCH=REPO/'tmp/accelerator-effect-video'
ff=imageio_ffmpeg.get_ffmpeg_exe()
timeline=json.loads((SCRATCH/'timeline.json').read_text(encoding='utf-8'))
results=[]
ids=['brand-intro','expansion-answer','slower','chart','formula','summary']
sheet=Image.new('RGB',(1280,812),'white')
draw=ImageDraw.Draw(sheet)
for row,(name,size) in enumerate([('YouTube-1080p','1920x1080'),('DingTalk-720p','1280x720')]):
    video=OUT/f'Accelerator-effect-{name}.mp4'
    # Decode was already checked by build.mjs; inspect metadata and samples here.
    info=subprocess.run([ff,'-hide_banner','-i',str(video)],capture_output=True,text=True).stderr
    assert size in info and 'h264' in info and ('yuv420p' in info or 'yuvj420p' in info) and 'aac' in info and 'stereo' in info and '24 fps' in info
    duration=re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)',info)
    h,m,s=duration.groups();sec=int(h)*3600+int(m)*60+float(s)
    assert abs(sec-timeline[-1]['end'])<.1
    raw=video.read_bytes()
    assert raw.index(b'moov')<raw.index(b'mdat'), 'Missing fast-start metadata'
    for col,id in enumerate(ids):
        scene=next(s for s in timeline if s['id']==id)
        t=scene['start']+min(5,(scene['end']-scene['start'])/2)
        image=SCRATCH/f'encoded-{name}-{id}.png'
        subprocess.run([ff,'-y','-v','error','-ss',str(t),'-i',str(video),'-frames:v','1',str(image)],check=True)
        im=Image.open(image);im.thumbnail((426,240))
        x=col%3*426;y=row*406+col//3*203
        im=im.resize((320,180))
        sheet.paste(im,(x,y));draw.text((x+5,y+181),name+' / '+id,fill='black')
    results.append({'file':video.name,'bytes':len(raw),'durationSeconds':sec,'resolution':size,'video':'H.264 8-bit 4:2:0 24fps','audio':'AAC stereo','fastStart':True,'fullDecode':'passed in build.mjs'})
sheet.save(SCRATCH/'encoded-contact.png')
(SCRATCH/'media-validation.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
print(json.dumps(results,indent=2))
