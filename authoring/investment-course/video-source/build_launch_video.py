"""Render the SFLS classroom launch trailer; original graphics and synthesized score."""
from pathlib import Path
import math, subprocess, wave, json, sys
from functools import lru_cache
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
import imageio_ffmpeg

ROOT=Path(__file__).resolve().parents[3]
OUT=ROOT/'authoring/investment-course/outputs/stock-market-game-launch'
TMP=ROOT/'authoring/investment-course/tmp/smg-video'
OUT.mkdir(parents=True,exist_ok=True); TMP.mkdir(parents=True,exist_ok=True)
S=1.5; W,H=1920,1080; FPS=30; DURATION=64
WHITE='#f5f3e9'; MINT='#7de0bc'; GOLD='#e9b27b'; MUTED='#9bbaaf'; RED='#ec9988'
FONTS={'en':'C:/Windows/Fonts/segoeui.ttf','strong':'C:/Windows/Fonts/seguisb.ttf','num':'C:/Windows/Fonts/bahnschrift.ttf','zh':'C:/Windows/Fonts/msyh.ttc'}
def ease(x):
 x=max(0,min(1,x)); return 1-(1-x)**3
def xy(p): return tuple(round(v*S) for v in p)
@lru_cache(maxsize=1200)
def textimg(text,size,color,font):
 f=ImageFont.truetype(FONTS[font],round(size*S))
 box=f.getbbox(text); width=round(f.getlength(text))+6
 assert width<=W-80,(text,width)
 im=Image.new('RGBA',(width,round(size*S*1.55)),(0,0,0,0))
 ImageDraw.Draw(im).text((0,-box[1]),text,font=f,fill=color)
 return im
def txt(im,text,x,y,size=30,color=WHITE,font='en',a=1,center=False):
 layer=textimg(text,size,color,font)
 if a<1:
  layer=layer.copy(); layer.putalpha(layer.getchannel('A').point(lambda v:round(v*max(0,a))))
 px=round(x*S)-(layer.width//2 if center else 0)
 im.paste(layer,(px,round(y*S)),layer)
def line(d,pts,color=MINT,width=2): d.line([xy(p) for p in pts],fill=color,width=round(width*S))
def ellipse(d,box,color,width=2,fill=None): d.ellipse(xy(box),outline=color,width=round(width*S),fill=fill)

yy,xx=np.mgrid[0:H,0:W]
g=np.exp(-((xx-W*.73)**2/(W*.65)**2+(yy-H*.35)**2/(H*.8)**2))
arr=np.stack([8+7*g,22+23*g,23+19*g],axis=2).astype('uint8')
BASE=Image.fromarray(arr)
rng=np.random.default_rng(21)
PARTICLES=rng.random((55,4))
photo=Image.open(ROOT/'apps/library/investment-analysis/course-assets/images/lesson-02/nasdaq-stock-market-display.jpg').convert('RGB')
photo=ImageOps.fit(photo,(2200,1240))
photo=Image.blend(photo,Image.new('RGB',photo.size,'#071d1c'),.57)

SCENES=[(0,4,'count'),(4,11,'title'),(11,18,'cash'),(18,25,'teams'),(25,32,'cycle'),(32,39,'risk'),(39,47,'roles'),(47,59,'weekend'),(59,64,'end')]
def background(t,photographic=False):
 if photographic:
  z=1+.045*math.sin(t*.045)
  cw,ch=round(W/z),round(H/z)
  im=photo.crop((100,50,100+cw,50+ch)).resize((W,H),Image.Resampling.BILINEAR)
 else: im=BASE.copy()
 d=ImageDraw.Draw(im)
 for x in range(0,1280,80): line(d,[(x,85),(x,660)],'#173b35',.5)
 for y in range(100,690,80): line(d,[(0,y),(1280,y)],'#173b35',.5)
 for x,y,s,v in PARTICLES:
  px=(x*1280+t*(4+v*12))%1280; py=(y*720-t*(1+s*3))%720
  ellipse(d,(px,py,px+1+s*2,py+1+s*2),'#43816a',1, '#43816a')
 return im
def header(im,tag):
 txt(im,'SFLS  /  INVESTMENT 2026',64,35,16,MINT,'num')
 txt(im,tag,930,35,15,MUTED,'num')
 line(ImageDraw.Draw(im),[(64,67),(1216,67)],'#31564b',1)
def reveal(im,text,x,y,size,u,delay=0,color=WHITE,font='en',center=False):
 a=ease((u-delay)/.65)
 txt(im,text,x,y+(1-a)*20,size,color,font,a,center)
def icon(d,kind,x,y,c=MINT):
 if kind=='research':
  ellipse(d,(x-23,y-29,x+23,y+17),c,3);line(d,[(x+17,y+13),(x+41,y+39)],c,4)
  line(d,[(x-13,y),(x-3,y-10),(x+9,y-4)],c,3)
 elif kind=='decide':
  for dx,dy in [(-30,7),(30,7),(0,-29)]:
   ellipse(d,(x+dx-8,y+dy-8,x+dx+8,y+dy+8),c,3)
  line(d,[(x-26,y),(x-4,y-23),(x+25,y),(x-26,y)],c,2)
 elif kind=='chart':
  line(d,[(x-35,y-30),(x-35,y+35),(x+40,y+35)],c,3)
  line(d,[(x-27,y+20),(x-10,y+3),(x+4,y+11),(x+25,y-20)],c,4)
 elif kind=='record':
  d.rounded_rectangle(xy((x-27,y-35,x+27,y+35)),radius=5*S,outline=c,width=3)
  for dy in [-16,0,16]:line(d,[(x-14,y+dy),(x+15,y+dy)],c,3)
 elif kind=='login':
  d.rounded_rectangle(xy((x-38,y-28,x+38,y+27)),radius=4*S,outline=c,width=3)
  line(d,[(x,y+28),(x,y+40),(x-21,y+40),(x+21,y+40)],c,3)
 elif kind=='shot':
  d.rounded_rectangle(xy((x-35,y-26,x+35,y+29)),radius=6*S,outline=c,width=3)
  ellipse(d,(x-14,y-13,x+14,y+15),c,3)
 elif kind=='send':
  line(d,[(x-38,y-20),(x+39,y-34),(x+12,y+36),(x-3,y+5),(x-38,y-20),(x+39,y-34),(x-3,y+5)],c,3)

def scene(name,u,t):
 im=background(t,name in ['title','end']);d=ImageDraw.Draw(im)
 header(im,'THE STOCK MARKET GAME')
 if name=='count':
  n=str(3-int(u)) if u<3 else 'READY?'
  frac=u%1; r=155+frac*24
  ellipse(d,(640-r,320-r,640+r,320+r),'#31594b',2)
  d.arc(xy((480,160,800,480)),-90,-90+360*frac,fill=MINT,width=round(5*S))
  txt(im,n,640,220 if u<3 else 284,170 if u<3 else 60,WHITE,'num',center=True)
  txt(im,'SUZHOU FOREIGN LANGUAGE SCHOOL',640,530,27,WHITE,'en',center=True)
  txt(im,'苏州外国语学校 · 投资课程',640,580,28,MINT,'zh',center=True)
 elif name=='title':
  reveal(im,'SUZHOU FOREIGN LANGUAGE SCHOOL',65,135,23,u,color=MINT)
  reveal(im,'The Stock',65,205,86,u,.15,font='strong')
  reveal(im,'Market Game',65,300,86,u,.3,font='strong')
  reveal(im,'股票模拟交易 · 正式启动',69,420,40,u,.55,color=GOLD,font='zh')
  reveal(im,'Your classroom. The markets. Your decisions.',69,518,28,u,.9)
  reveal(im,'从课堂走向市场，让每个决定都有依据。',69,565,28,u,1.1,color=MINT,font='zh')
  txt(im,'MarketSite photo: bfishadow / Wikimedia Commons / CC BY 2.0',65,669,12,MUTED)
 elif name=='cash':
  reveal(im,'WHAT WOULD YOUR TEAM DO WITH...',640,127,27,u,color=MINT,center=True)
  value=round(100000*ease(u/1.8)/1000)*1000
  txt(im,f'${value:,}',640,216,142,GOLD,'num',center=True)
  reveal(im,'VIRTUAL MONEY. REAL MARKET PRICES.',640,401,30,u,.4,center=True)
  reveal(im,'每组10万美元虚拟资金 · 真实市场价格',640,452,33,u,.6,color=MINT,font='zh',center=True)
  for i in range(40):
   x=167+i*24; height=23+(i%5)*7
   d.rounded_rectangle(xy((x,570-height,x+13,570)),radius=2*S,fill=MINT if i<40*ease(u/2) else '#28483f')
  txt(im,'No real money required / 无需投入真钱',640,614,24,MUTED,'zh',center=True)
 elif name=='teams':
  reveal(im,'24 students. One challenge.',640,121,48,u,font='strong',center=True)
  reveal(im,'24位同学，共同迎接挑战。',640,186,30,u,.2,color=MINT,font='zh',center=True)
  for i in range(8):
   x=280+(i%4)*240; y=302+(i//4)*132; a=ease((u-i*.1-.3)/.6)
   rr=48*a; ellipse(d,(x-rr,y-rr,x+rr,y+rr),GOLD,2)
   if a>.4:
    for dx,dy in [(-18,9),(18,9),(0,-16)]:
     ellipse(d,(x+dx-7,y+dy-7,x+dx+7,y+dy+7),MINT,1,MINT)
    txt(im,f'{i+1:02}',x,y+57,14,MUTED,'num',center=True)
  reveal(im,'8 TEAMS × 3 STUDENTS',640,551,42,u,1,color=GOLD,font='num',center=True)
  reveal(im,'八个小组 · 每组三人 · 一个共用账户',640,613,29,u,1.2,color=MINT,font='zh',center=True)
 elif name=='cycle':
  reveal(im,'Make every decision count.',640,125,49,u,font='strong',center=True)
  reveal(im,'让每一次决策都有依据。',640,190,31,u,.2,color=MINT,font='zh',center=True)
  for i,(en,zh,kind,detail) in enumerate([('RESEARCH','研究','research','Find evidence / 寻找证据'),('DECIDE','决策','decide','Agree together / 共同决定'),('REVIEW','复盘','chart','Calculate return / 计算回报')]):
   x=270+i*370
   if u>i*.45+.4:
    icon(d,kind,x,327,GOLD if i==int(u*1.1)%3 else MINT)
    reveal(im,en,x,411,34,u,i*.45+.4,font='num',center=True)
    reveal(im,zh,x,460,30,u,i*.45+.5,color=MINT,font='zh',center=True)
    reveal(im,detail,x,526,22,u,i*.45+.6,color=MUTED,font='zh',center=True)
   if i<2:line(d,[(x+91,329),(x+275,329)],'#487461',2)
  txt(im,'Later, after trading instruction / 学习交易操作后开展',640,636,22,MUTED,'zh',center=True)
 elif name=='risk':
  reveal(im,'Prices rise. Prices fall.',65,120,52,u,font='strong')
  reveal(im,'价格会上涨，也会下跌。',67,189,31,u,.2,color=MINT,font='zh')
  pts=[(80+i*11.6,401-50*math.sin(i*.11)-26*math.sin(i*.48)-i*.25) for i in range(97)]
  upto=max(2,min(97,int(u/3*97)))
  line(d,pts[:upto],MINT,4)
  x,y=pts[upto-1];ellipse(d,(x-7,y-7,x+7,y+7),GOLD,1,GOLD)
  line(d,[(80,491),(1200,491)],'#4c6a5c',1)
  txt(im,'ILLUSTRATION / 示意图',82,505,15,MUTED,'zh')
  reveal(im,'Can your team explain the result?',640,565,35,u,.8,center=True)
  reveal(im,'你们能解释投资结果吗？',640,619,30,u,1,color=GOLD,font='zh',center=True)
 elif name=='roles':
  reveal(im,'One team. Three responsibilities.',640,120,44,u,font='strong',center=True)
  reveal(im,'分工明确，共同决策。',640,186,30,u,.2,color=MINT,font='zh',center=True)
  data=[('Organiser','组长','record','Record decisions','记录决定'),('Research lead','研究负责人','research','Bring evidence together','汇总证据'),('Portfolio coordinator','账户负责人','chart','Submit agreed trades','提交全组同意的交易')]
  for i,(en,zh,kind,job,jzh) in enumerate(data):
   x=239+i*400
   if u>i*.28+.4:
    icon(d,kind,x,304,GOLD)
    reveal(im,en,x,389,25,u,i*.28+.4,center=True)
    reveal(im,zh,x,436,30,u,i*.28+.55,color=MINT,font='zh',center=True)
    reveal(im,job,x,508,23,u,i*.28+.7,center=True)
    reveal(im,jzh,x,551,25,u,i*.28+.8,color=MUTED,font='zh',center=True)
  txt(im,'Agree together. Check before submitting. / 全组同意，复核后提交。',640,636,24,MINT,'zh',center=True)
 elif name=='weekend':
  reveal(im,'YOUR FIRST MISSION',640,116,48,u,font='num',center=True)
  reveal(im,'本周末的第一项任务',640,182,31,u,.2,color=MINT,font='zh',center=True)
  for i,(kind,en,zh) in enumerate([('login','Everyone tries login','每人尝试登录'),('shot','One team screenshot','每组一张账户截图'),('send','Organiser sends on QQ','组长通过QQ提交')]):
   x=240+i*400
   if u>i*.45+.4:
    icon(d,kind,x,300,GOLD)
    reveal(im,en,x,363,26,u,i*.45+.4,center=True)
    reveal(im,zh,x,408,29,u,i*.45+.55,color=MINT,font='zh',center=True)
  reveal(im,'Names + roles + login results + screenshot',640,485,26,u,1.1,center=True)
  reveal(im,'姓名＋职责＋实际登录结果＋截图',640,527,26,u,1.3,color=MINT,font='zh',center=True)
  reveal(im,'SUN 13 SEP · 20:00 CHINA TIME / 9月13日周日20:00（中国时间）',640,584,24,u,1.6,color=GOLD,font='zh',center=True)
  txt(im,'NO TRADES THIS WEEKEND / 本周末不交易',640,641,26,WHITE,'zh',center=True)
 elif name=='end':
  reveal(im,'YOUR TEAM.',640,198,77,u,font='strong',center=True)
  reveal(im,'YOUR DECISIONS.',640,295,77,u,.15,font='strong',center=True)
  reveal(im,'从今天开始，像投资者一样思考。',640,421,36,u,.35,color=GOLD,font='zh',center=True)
  reveal(im,'SUZHOU FOREIGN LANGUAGE SCHOOL',640,528,25,u,.5,color=MINT,center=True)
  txt(im,'THE STOCK MARKET GAME  /  SFLS INVESTMENT 2026',640,588,21,WHITE,'num',center=True)
  txt(im,'stockmarketgame.org  ·  Classroom launch / 课堂启动',640,642,19,MUTED,'zh',center=True)
 # Quiet continuous timeline; transition opacity handled outside.
 line(d,[(64,704),(64+1152*t/DURATION,704)],MINT,2)
 return im

def frame(t):
 for idx,(start,end,name) in enumerate(SCENES):
  if t<end:
   im=scene(name,t-start,t)
   if idx>0 and t-start<.34:
    prev=SCENES[idx-1]; old=scene(prev[2],prev[1]-prev[0]-.01,t)
    im=Image.blend(old,im,ease((t-start)/.34))
   if t>DURATION-.7:im=Image.blend(im,Image.new('RGB',(W,H),'#071c19'),(t-DURATION+.7)/.7)
   return im
 return scene('end',4.9,t)

def score():
 sr=48000; N=int(DURATION*sr); music=np.zeros((N,2),dtype=np.float32); rg=np.random.default_rng(92)
 def add(start,sound,vol=1,pan=0):
  a=int(start*sr); b=min(N,a+len(sound))
  if b<=a:return
  sound=sound[:b-a]*vol
  music[a:b,0]+=sound*(.72-pan*.22);music[a:b,1]+=sound*(.72+pan*.22)
 def tone(freq,dur,mode='pluck'):
  t=np.arange(int(sr*dur))/sr
  if mode=='pad':
   env=np.minimum(t/.3,1)*np.minimum((dur-t)/.6,1)
   return (np.sin(2*np.pi*freq*t)+.3*np.sin(2*np.pi*freq*1.003*t)+.18*np.sin(4*np.pi*freq*t))*env
  return (np.sin(2*np.pi*freq*t)+.23*np.sin(4*np.pi*freq*t)+.12*np.sin(6*np.pi*freq*t))*np.exp(-t*5)*np.minimum(t/.006,1)
 def freq(m):return 440*2**((m-69)/12)
 chords=[(45,52,57,60,64),(41,48,53,57,60),(48,55,60,64,67),(43,50,55,59,62)]
 for bar in range(32):
  start=bar*2; chord=chords[(bar//2)%4]
  for m in chord[1:]:add(start,tone(freq(m),2.6,'pad'),.045,(-1 if m%2 else 1)*.4)
  for j in range(8):
   st=start+j*.25
   if st>=4 and st<62:
    add(st,tone(freq(chord[1+j%4]+12),.7),.105 if st<47 else .072,math.sin(j)*.7)
    add(st+.1875,tone(freq(chord[1+j%4]+12),.4),.022,-math.sin(j)*.7)
  for j in range(4):
   st=start+j*.5
   if st<4 or st>=62:continue
   t=np.arange(int(.32*sr))/sr
   kick=np.sin(2*np.pi*(48*t+55*.025*(1-np.exp(-t/.025))))*np.exp(-t*14)
   add(st,kick,.58)
   add(st,tone(freq(chord[0]),.42),.18)
   if j%2:
    t=np.arange(int(.18*sr))/sr; n=rg.normal(0,1,len(t)); n=np.r_[0,np.diff(n)]
    clap=(n*.45+np.sin(2*np.pi*180*t)*.3)*np.exp(-t*28)
    add(st,clap,.10)
   for off in [0,.25]:
    t=np.arange(int(.08*sr))/sr; n=rg.normal(0,1,len(t)); n=np.r_[0,np.diff(n)]
    add(st+off,n*np.exp(-t*75),.027, .5 if off else -.5)
 for st,_,_ in SCENES[1:]:
  t=np.arange(int(.65*sr))/sr
  impact=(np.sin(2*np.pi*(40*t+3*(1-np.exp(-t*12))))+.15*rg.normal(0,1,len(t)))*np.exp(-t*8)
  add(st,impact,.24)
  if st>=4:
   t=np.arange(sr)/sr; noise=rg.normal(0,1,len(t)); smooth=np.convolve(noise,np.ones(20)/20,mode='same')
   add(st-1,smooth*t*t,.23)
 for st in [0,1,2]:add(st,tone(740,.3),.17)
 add(3,tone(1480,.6),.17)
 for m in [45,57,60,64,69]:add(59,tone(freq(m),4.5,'pad'),.06)
 music=np.tanh(music*1.25)
 peak=float(np.max(np.abs(music)));music*=.87/peak
 fade=np.minimum(np.arange(N)/sr/.08,1)*np.minimum((N-np.arange(N))/sr/1.5,1)
 music*=fade[:,None]
 path=TMP/'original-score.wav'
 with wave.open(str(path),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((music*32767).astype('<i2').tobytes())
 print('Audio peak',round(float(np.max(np.abs(music))),3),'RMS',round(float(np.sqrt(np.mean(music**2))),3),flush=True)
 return path

def previews():
 thumbs=[]
 for start,end,name in SCENES:
  im=frame(min(end-.6,start+3.4));im.save(TMP/f'{name}.jpg',quality=92)
  thumbs.append(im.resize((640,360)))
 sheet=Image.new('RGB',(1920,1080))
 for i,im in enumerate(thumbs):sheet.paste(im,((i%3)*640,(i//3)*360))
 sheet.save(TMP/'contact-sheet.jpg',quality=94)
 frame(7).save(OUT/'SFLS-SMG-launch-poster.jpg',quality=95)

if __name__=='__main__':
 previews()
 if '--preview' in sys.argv:sys.exit(0)
 audio=score(); ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
 staged=TMP/'SFLS-Stock-Market-Game-Launch.mp4'
 args=[ffmpeg,'-y','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-i',str(audio),'-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-movflags','+faststart','-t',str(DURATION),str(staged)]
 with open(TMP/'encode.log','w') as log:
  p=subprocess.Popen(args,stdin=subprocess.PIPE,stderr=log)
  for f in range(FPS*DURATION):
   p.stdin.write(frame(f/FPS).tobytes())
   if f%(FPS*4)==0:print(f'Rendered {f//FPS}/{DURATION} seconds',flush=True)
  p.stdin.close();code=p.wait()
  assert code==0,'Video encoding failed'
 result=OUT/staged.name
 import shutil
 shutil.copy2(staged,result)
 print('COMPLETE',result,round(result.stat().st_size/1024/1024,1),'MB',flush=True)
