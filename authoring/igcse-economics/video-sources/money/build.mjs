import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn,execFileSync} from 'node:child_process';
import {once} from 'node:events';
import {pathToFileURL} from 'node:url';
import {chromium} from '@playwright/test';
const here=import.meta.dirname,repo=path.resolve(here,'../../../..');
const scratch=path.join(repo,'tmp/igcse-money-video'),out=path.join(repo,'authoring/igcse-economics/outputs/videos/money');
await fs.mkdir(out,{recursive:true});
const narration=JSON.parse(await fs.readFile(path.join(here,'narration.json'),'utf8'));
const segments=[{id:'brand-intro',brand:true,pause:0},...narration,{id:'brand-outro',brand:true,pause:0}];
function wav(b){let fmt,data;for(let p=12;p+8<=b.length;){let id=b.toString('ascii',p,p+4),n=b.readUInt32LE(p+4);if(id==='fmt ')fmt=b.subarray(p+8,p+8+n);if(id==='data')data=b.subarray(p+8,p+8+n);p+=8+n+n%2;}if(!fmt||!data)throw Error('Bad WAV');return{fmt,data,rate:fmt.readUInt32LE(8)}}
const timeline=[],captions=[],chunks=[];let cursor=0,fmt,rate;
for(const s of segments){const a=wav(await fs.readFile(path.join(scratch,'audio-neural',s.id+'.wav')));if(fmt&&!fmt.equals(a.fmt))throw Error('Different audio formats');fmt=a.fmt;rate=a.rate;const duration=a.data.length/rate,pause=s.pause??.7;timeline.push({...s,start:cursor,end:cursor+duration+pause,audioDuration:duration});chunks.push(a.data,Buffer.alloc(Math.round(pause*rate)));
 if(!s.brand){const entries=(await fs.readFile(path.join(scratch,'audio-neural',s.id+'.jsonl'),'utf8')).trim().split('\n').map(JSON.parse);for(let j=0;j<entries.length;j++){const b=entries[j],start=cursor+b.offset/1e7,end=cursor+Math.min(duration,(b.offset+b.duration)/1e7,j+1<entries.length?entries[j+1].offset/1e7-.005:Infinity);captions.push({start,end,text:b.text});}}
 cursor+=duration+pause;
}
if(cursor>=300)throw Error(`Money revision must be under five minutes; current duration is ${cursor.toFixed(2)} seconds`);
if(!captions.every((c,i)=>c.end>c.start&&(!i||captions[i-1].end<=c.start)))throw Error('Caption overlap');
const pcm=Buffer.concat(chunks),header=Buffer.alloc(44);header.write('RIFF');header.writeUInt32LE(36+pcm.length,4);header.write('WAVEfmt ',8);header.writeUInt32LE(16,16);fmt.copy(header,20,0,16);header.write('data',36);header.writeUInt32LE(pcm.length,40);await fs.writeFile(path.join(scratch,'narration.wav'),Buffer.concat([header,pcm]));
await fs.writeFile(path.join(scratch,'timeline.json'),JSON.stringify(timeline,null,2));await fs.writeFile(path.join(scratch,'captions.json'),JSON.stringify(captions,null,2));
const stamp=t=>{const ms=Math.round(t*1000);return `${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')},${String(ms%1000).padStart(3,'0')}`};
await fs.writeFile(path.join(out,'Money-English.srt'),captions.map((c,i)=>`${i+1}\n${stamp(c.start)} --> ${stamp(c.end)}\n${c.text}`).join('\n\n')+'\n');
await fs.writeFile(path.join(out,'Transcript.txt'),narration.map(s=>`${s.title}\n${s.speech}`).join('\n\n'));
const browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:1920,height:1080}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(pathToFileURL(path.join(here,'scene.html')).href);await page.evaluate(({timeline,captions})=>{window.timeline=timeline;window.captions=captions},{timeline,captions});
const logo=await fs.readFile(path.join(repo,'authoring/brand/oehler-huang-platform/three-curves-logo.png'));await page.evaluate(async src=>{window.brandLogo=new Image();brandLogo.src=src;await brandLogo.decode()},`data:image/png;base64,${logo.toString('base64')}`);await page.evaluate(()=>document.fonts.ready);
try{
 if(process.argv.includes('--preview')){
  for(const [i,s] of timeline.entries()){const t=s.start+Math.min(s.audioDuration/2,10);const check=await page.evaluate(t=>renderFrame(t),t);errors.push(...check.bounds.map(b=>({id:s.id,...b})));await page.screenshot({path:path.join(scratch,`${String(i+1).padStart(2,'0')}-${s.id}.png`)});}
  for(const c of captions){const r=await page.evaluate(t=>renderFrame(t),(c.start+c.end)/2);errors.push(...r.bounds.map(b=>({time:c.start,...b})));}
  await fs.writeFile(path.join(scratch,'visual-validation.json'),JSON.stringify({duration:cursor,scenes:timeline.length,captions:captions.length,errors},null,2));console.log(JSON.stringify({duration:cursor,scenes:timeline.length,captions:captions.length,errors}));
  // A separately composed thumbnail; never expose answers in its title.
  await page.evaluate(()=>{ctx.setTransform(1.5,0,0,1.5,0,0);fg=C.white;accent=C.cyan;ctx.fillStyle=C.navy;ctx.fillRect(0,0,1280,720);text('IGCSE ECONOMICS',70,100,29,C.cyan,700);text('WHAT MAKES',65,242,67,C.white,700);text('MONEY',60,368,120,C.gold,800);text('WORK?',65,475,95,C.white,800);note(1000,294,20,1.85);coin(1035,458,1,68);text('4 FUNCTIONS  ·  7 CHARACTERISTICS',70,578,32,C.cyan,700);text('Oehler-Huang Platform',70,664,24,C.white,500)});await page.screenshot({path:path.join(out,'Money-thumbnail.png')});if(errors.length)process.exitCode=1;
 }else{
  const ff=execFileSync('python',['-c','import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())'],{encoding:'utf8'}).trim();const video=path.join(out,'Money-YouTube-1080p.mp4'),qq=path.join(out,'Money-QQ-720p.mp4');const fps=24,frames=Math.ceil(cursor*fps);
  const encoder=spawn(ff,['-y','-hide_banner','-loglevel','warning','-f','image2pipe','-framerate',String(fps),'-vcodec','mjpeg','-i','pipe:0','-i',path.join(scratch,'narration.wav'),'-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-threads','4','-c:a','aac','-b:a','128k','-movflags','+faststart','-shortest','-metadata','title=Money: definition, functions and characteristics | IGCSE Economics','-metadata','comment=Oehler-Huang Platform. Synthetic British English narration. English open captions. Original diagrams and sonic signatures.',video],{stdio:['pipe','ignore','pipe']});let stderr='';encoder.stderr.on('data',b=>stderr+=b);const done=once(encoder,'close');let lastKey,frame,idx=0,ci=0;
  for(let f=0;f<frames;f++){const t=f/fps;while(idx<timeline.length-1&&t>=timeline[idx].end)idx++;while(ci<captions.length-1&&t>=captions[ci].end)ci++;const s=timeline[idx],u=t-s.start;const moving=s.brand?(u<.8||s.end-t<.8):(['barter','exchange','phone','durable'].includes(s.kind)&&u<2.5);const cue=captions[ci]&&t>=captions[ci].start&&t<captions[ci].end?ci:-1;const key=[idx,cue,moving?f:0,s.pause&&u>s.audioDuration?Math.ceil(s.end-t):0,Math.floor(t)].join(':');
   if(key!==lastKey){const result=await page.evaluate(t=>{const result=renderFrame(t);return{...result,jpeg:document.querySelector('canvas').toDataURL('image/jpeg',.93).split(',')[1]}},t);if(result.bounds.length)throw Error(JSON.stringify(result.bounds));frame=Buffer.from(result.jpeg,'base64');lastKey=key;}
   if(!encoder.stdin.write(frame))await once(encoder.stdin,'drain');if(f%(fps*20)===0)console.log(`Rendered ${Math.round(t)} / ${Math.round(cursor)} seconds`);
  }
  encoder.stdin.end();const [code]=await done;if(code)throw Error(stderr);if(errors.length)throw Error(errors.join('\n'));
  console.log('Creating compact QQ copy');execFileSync(ff,['-y','-v','warning','-i',video,'-vf','scale=1280:720','-c:v','libx264','-preset','fast','-crf','25','-maxrate','1400k','-bufsize','2800k','-threads','4','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart',qq]);
  for(const file of [video,qq]){execFileSync(ff,['-v','error','-i',file,'-f','null','-']);console.log(JSON.stringify({file,bytes:(await fs.stat(file)).size}));}console.log(JSON.stringify({duration:cursor,frames,captions:captions.length,completeDecode:'passed'}));
 }
}finally{await browser.close()}
