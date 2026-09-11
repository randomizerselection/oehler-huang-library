import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn,execFileSync} from 'node:child_process';
import {once} from 'node:events';
import {pathToFileURL} from 'node:url';
import {chromium} from '@playwright/test';
const here=import.meta.dirname,repo=path.resolve(here,'../../../..');
const scratch=path.join(repo,'tmp/accelerator-effect-video');
const outDir=path.join(repo,'authoring/a-level/outputs/videos/accelerator-effect');
await fs.mkdir(scratch,{recursive:true});await fs.mkdir(outDir,{recursive:true});
const lessonSegments=JSON.parse(await fs.readFile(path.join(here,'narration.json'),'utf8'));
const segments=[{id:'brand-intro',brand:true,pause:0},...lessonSegments.map((s,sceneIndex)=>({...s,sceneIndex})),{id:'brand-outro',brand:true,pause:0}];
const audioDir=path.join(scratch,'audio-neural');
function wav(buffer){let fmt,data;for(let p=12;p+8<=buffer.length;){const id=buffer.toString('ascii',p,p+4),n=buffer.readUInt32LE(p+4);if(id==='fmt ')fmt=buffer.subarray(p+8,p+8+n);if(id==='data')data=buffer.subarray(p+8,p+8+n);p+=8+n+(n%2);}if(!fmt||!data)throw new Error('Invalid WAV');return {fmt,data,rate:fmt.readUInt32LE(8)};}
let cursor=0,fmt,rate;const chunks=[],timeline=[];
for(const s of segments){const sound=wav(await fs.readFile(path.join(audioDir,s.id+'.wav')));if(fmt&&!fmt.equals(sound.fmt))throw new Error('Audio formats differ');fmt=sound.fmt;rate=sound.rate;const audioDuration=sound.data.length/rate,pause=s.pause??(s.id==='summary'?1.5:.8);timeline.push({...s,start:cursor,end:cursor+audioDuration+pause,audioDuration});chunks.push(sound.data,Buffer.alloc(Math.round(pause*rate)));cursor+=audioDuration+pause;}
const pcm=Buffer.concat(chunks),header=Buffer.alloc(44);header.write('RIFF');header.writeUInt32LE(36+pcm.length,4);header.write('WAVEfmt ',8);header.writeUInt32LE(16,16);fmt.copy(header,20,0,16);header.write('data',36);header.writeUInt32LE(pcm.length,40);
await fs.writeFile(path.join(scratch,'narration.wav'),Buffer.concat([header,pcm]));
await fs.writeFile(path.join(scratch,'timeline.json'),JSON.stringify(timeline,null,2));
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(pathToFileURL(path.join(here,'scene.html')).href);
await page.evaluate(data=>{window.timeline=data;},timeline);
const logo=await fs.readFile(path.join(repo,'authoring/brand/oehler-huang-platform/three-curves-logo.png'));
await page.evaluate(async data=>{window.brandLogo=new Image();brandLogo.src=data;await brandLogo.decode();},`data:image/png;base64,${logo.toString('base64')}`);
await page.evaluate(()=>document.fonts.ready);
if(process.argv.includes('--preview')){
  for(const [i,s] of timeline.entries()){
    const check=await page.evaluate(t=>renderFrame(t),s.brand?s.start+2:s.end-.1);if(check?.bounds?.length)errors.push(...check.bounds.map(b=>s.id+': '+JSON.stringify(b))); 
    await page.screenshot({path:path.join(scratch,`${String(i+1).padStart(2,'0')}-${s.id}.png`)});
  }
  console.log(JSON.stringify({duration:cursor,scenes:timeline.length,errors}));await browser.close();process.exit(errors.length?1:0);
}
const ffmpeg=execFileSync('python',['-c','import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())'],{encoding:'utf8'}).trim();
const output=path.join(outDir,'Accelerator-effect-YouTube-1080p.mp4');
const stagingOutput=path.join(scratch,'Accelerator-effect-render.mp4');
const fps=24,frames=Math.ceil(cursor*fps);
const encoder=spawn(ffmpeg,['-y','-hide_banner','-loglevel','warning','-f','image2pipe','-framerate',String(fps),'-vcodec','mjpeg','-i','pipe:0','-i',path.join(scratch,'narration.wav'),'-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-threads','4','-c:a','aac','-b:a','128k','-movflags','+faststart','-shortest','-metadata','title=The accelerator effect: why investment falls when demand still grows','-metadata','comment=Male neural narration: Microsoft en-GB-RyanNeural. Original three-note intro and outro. Constant productivity and capital prices; one replacement each year. Synthetic narration.',stagingOutput],{stdio:['pipe','ignore','pipe']});
let encoderError='';encoder.stderr.on('data',b=>encoderError+=b.toString());
const completed=once(encoder,'close');
try{
  let lastKey,frame;
  for(let f=0;f<frames;f++){
    const time=f/fps,scene=Math.max(0,timeline.findIndex(s=>time<s.end)),item=timeline[scene],relative=time-item.start,lessonScene=item.sceneIndex;
    const moving=item.brand?(relative<.8||time>item.end-.8):(['expansion-answer','faster','slower','flat','chart'].includes(item.id)&&relative<3.2);
    const key=moving?`${scene}:${f}`:String(scene);
    if(key!==lastKey){
      const encoded=await page.evaluate(t=>{renderFrame(t);return document.getElementById('film').toDataURL('image/jpeg',.92).split(',')[1];},time);
      frame=Buffer.from(encoded,'base64');lastKey=key;
    }
    if(!encoder.stdin.write(frame))await once(encoder.stdin,'drain');
    if(f%(fps*10)===0)console.log(`Rendered ${(f/fps).toFixed(0)} / ${cursor.toFixed(0)} seconds`);
  }
  encoder.stdin.end();const [code]=await completed;if(code!==0)throw new Error(encoderError);
  if(errors.length)throw new Error(errors.join('\n'));
  execFileSync(ffmpeg,['-v','error','-i',stagingOutput,'-f','null','-'],{stdio:'pipe'});
  await fs.copyFile(stagingOutput,output);
  const compact=path.join(outDir,'Accelerator-effect-DingTalk-720p.mp4');
  execFileSync(ffmpeg,['-y','-v','warning','-i',output,'-vf','scale=1280:720','-c:v','libx264','-preset','fast','-crf','24','-maxrate','1600k','-bufsize','3200k','-pix_fmt','yuv420p','-threads','4','-c:a','aac','-b:a','96k','-movflags','+faststart',compact],{stdio:'pipe'});
  execFileSync(ffmpeg,['-v','error','-i',compact,'-f','null','-'],{stdio:'pipe'});
  console.log(JSON.stringify({compact,bytes:(await fs.stat(compact)).size}));
  console.log(JSON.stringify({output,duration:cursor,frames,fps,width:1920,height:1080,bytes:(await fs.stat(output)).size}));
}finally{await browser.close();}
