import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {chromium} from '@playwright/test';
const here=import.meta.dirname,brand=path.dirname(here),repo=path.resolve(here,'../../../..');
const logo='data:image/png;base64,'+(await fs.readFile(path.join(brand,'youtube-profile.png'))).toString('base64');
const paper='#f6f2e9',forest='#164b43';
const svg=(w,h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
const icon=(x,y,size)=>`<defs><clipPath id="logoClip"><circle cx="${x+size/2}" cy="${y+size/2}" r="${size/2}"/></clipPath></defs><image href="${logo}" x="${x}" y="${y}" width="${size}" height="${size}" clip-path="url(#logoClip)"/>`;
const banner=svg(2560,1440,`<rect width="2560" height="1440" fill="${paper}"/>
${icon(645,590,260)}
<g fill="${forest}"><text x="980" y="645" font-family="Georgia,serif" font-size="78">Oehler-Huang</text>
<text x="984" y="710" font-family="Arial,sans-serif" font-size="37" letter-spacing="10">ECONOMICS</text>
<text x="984" y="792" font-family="Arial,sans-serif" font-size="31">Clear explanations. Rigorous reasoning.</text>
<text x="984" y="845" font-family="Arial,sans-serif" font-size="24" fill="#647073">IGCSE · A level · International curricula</text></g>`);
await fs.writeFile(path.join(here,'channel-banner.svg'),banner);

// Shared native SVG layout: used both for the first thumbnail and its offline editor.
function thumbnail(d,logo){
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
 const X=v=>790+330*v/800,Y=v=>530-330*v/800;
 const graph=`<path d="M790 188V530H1150" stroke="#f6f2e9" stroke-width="3" fill="none"/>
 <path d="M${X(0)} ${Y(0)}L${X(800)} ${Y(800)}" stroke="#a8c4b8" stroke-width="3"/>
 <path d="M${X(0)} ${Y(100)}L${X(800)} ${Y(700)}" stroke="#829a94" stroke-width="5" stroke-dasharray="9 7"/>
 <path d="M${X(0)} ${Y(150)}L${X(800)} ${Y(750)}" stroke="#f2b78b" stroke-width="6"/>
 <path d="M${X(400)} ${Y(400)}V530M${X(600)} ${Y(600)}V530" stroke="#bed1c7" stroke-width="2" stroke-dasharray="5 6"/>
 <circle cx="${X(400)}" cy="${Y(400)}" r="7" fill="#a8c4b8"/><circle cx="${X(600)}" cy="${Y(600)}" r="8" fill="#f2b78b"/>
 <g font-family="Arial,sans-serif" font-size="27" fill="#f6f2e9"><text x="783" y="166">AE</text><text x="1160" y="540">Y</text><text x="${X(400)}" y="567" text-anchor="middle">400</text><text x="${X(600)}" y="567" text-anchor="middle">600</text><text x="1136" y="${Y(750)+8}" fill="#f2b78b">AE₁</text><text x="1136" y="${Y(700)+18}" fill="#b6c8bf">AE₀</text></g>`;
 const visual=d.customImage?`<image href="${esc(d.customImage)}" x="755" y="165" width="455" height="430" preserveAspectRatio="xMidYMid meet"/>`:graph;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="3840" height="2160" viewBox="0 0 1280 720"><rect width="1280" height="720" fill="#164b43"/>
 <text x="66" y="83" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="3" fill="#e9b58e">${esc(d.course)}</text>
 <text x="62" y="215" font-family="Georgia,serif" font-size="82" fill="#fffaf0">${esc(d.line1)}</text>
 <text x="62" y="313" font-family="Georgia,serif" font-size="82" fill="#fffaf0">${esc(d.line2)}</text>
 <text x="66" y="391" font-family="Arial,sans-serif" font-size="27" fill="#c7d8cd">${esc(d.subtitle)}</text>
 <text x="62" y="530" font-family="Arial,sans-serif" font-size="67" font-weight="700" fill="#f2b78b">${esc(d.hook)}</text>
 ${visual}<line x1="66" y1="616" x2="1210" y2="616" stroke="#56786c"/>
 <defs><clipPath id="thumbLogo"><circle cx="92" cy="662" r="26"/></clipPath></defs><image href="${logo}" x="66" y="636" width="52" height="52" clip-path="url(#thumbLogo)"/>
 <text x="136" y="670" font-family="Arial,sans-serif" font-size="23" fill="#e8eee5">Oehler-Huang Economics</text></svg>`;
}
const config={course:'A LEVEL ECONOMICS',line1:'The',line2:'multiplier',subtitle:'Income–expenditure explained',hook:'£50m → £200m',customImage:''};
await fs.writeFile(path.join(here,'thumbnail-settings.json'),JSON.stringify(config,null,2));
await fs.writeFile(path.join(here,'multiplier-thumbnail.svg'),thumbnail(config,logo));
const editor=`<!doctype html><html lang="en"><meta charset="utf-8"><title>Oehler-Huang thumbnail editor</title>
<style>*{box-sizing:border-box}body{margin:0;background:#f6f2e9;color:#164b43;font:16px Arial}main{max-width:1240px;padding:35px;margin:auto}h1{font:36px Georgia;margin:0 0 12px}.layout{display:grid;grid-template-columns:300px 1fr;gap:30px;margin-top:30px}label{display:block;margin-bottom:16px}input{display:block;width:100%;padding:10px;margin-top:6px;border:1px solid #a8b8ad;border-radius:5px;background:#fffdf7;font:inherit}button{background:#164b43;color:white;border:0;padding:12px 17px;border-radius:5px;font:inherit;cursor:pointer;margin:5px 0}#preview svg{width:100%;height:auto}#small svg{width:320px;height:auto}p{line-height:1.5}#status{font-size:14px}small{display:block;line-height:1.4}@media(max-width:800px){.layout{grid-template-columns:1fr}}</style>
<main><h1>Your next economics thumbnail</h1><p>Keep the wording brief. Replace the diagram with one from the new lesson. Download a finished PNG.</p><div class="layout"><section>
${Object.entries({course:'Course label',line1:'Title, first line',line2:'Title, second line',subtitle:'Short explanation',hook:'Key question or result'}).map(([k,v])=>`<label>${v}<input id="${k}" value="${config[k]}" maxlength="${k==='course'?28:k==='subtitle'?38:k==='hook'?20:15}"></label>`).join('')}
<label>Your diagram or image<input type="file" id="upload" accept="image/png,image/jpeg,image/webp"></label><small>Use a clear diagram. Its labels must remain legible in the small preview.</small><button id="reset">Restore multiplier diagram</button><button id="download">Download PNG</button><p id="status" role="status"></p></section><section><div id="preview"></div><p>Small-screen preview</p><div id="small"></div></section></div></main>
<script>const logo=${JSON.stringify(logo)},config=${JSON.stringify(config)};const thumbnail=${thumbnail.toString()};
function draw(){for(const k of ['course','line1','line2','subtitle','hook'])config[k]=document.getElementById(k).value;const art=thumbnail(config,logo);document.getElementById('preview').innerHTML=art;document.getElementById('small').innerHTML=art;return art;}
document.querySelectorAll('input:not([type=file])').forEach(el=>el.oninput=draw);
document.getElementById('upload').onchange=e=>{if(!e.target.files[0])return;const r=new FileReader();r.onload=()=>{config.customImage=r.result;draw();};r.readAsDataURL(e.target.files[0]);};
document.getElementById('reset').onclick=()=>{config.customImage='';document.getElementById('upload').value='';draw();};
document.getElementById('download').onclick=async()=>{const u=URL.createObjectURL(new Blob([draw()],{type:'image/svg+xml'})),im=new Image();im.src=u;await im.decode();const c=document.createElement('canvas');c.width=3840;c.height=2160;c.getContext('2d').drawImage(im,0,0);URL.revokeObjectURL(u);c.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='economics-thumbnail.png';a.click();document.getElementById('status').textContent='Downloaded 3840 × 2160 PNG ('+(b.size/1e6).toFixed(2)+' MB).';setTimeout(()=>URL.revokeObjectURL(a.href),1000);});};draw();</script></html>`;
await fs.writeFile(path.join(here,'thumbnail-editor.html'),editor);
const end=svg(1920,1080,`<rect width="1920" height="1080" fill="${paper}"/>${icon(140,170,190)}
<g fill="${forest}"><text x="140" y="470" font-family="Georgia,serif" font-size="68">Keep thinking</text><text x="140" y="555" font-family="Georgia,serif" font-size="68">economically.</text><text x="145" y="650" font-family="Arial,sans-serif" font-size="25">Oehler-Huang Economics</text><text x="1030" y="225" font-family="Arial,sans-serif" font-size="24" letter-spacing="4">CONTINUE LEARNING</text><text x="1030" y="750" font-family="Arial,sans-serif" font-size="24" letter-spacing="4">SUBSCRIBE FOR MORE ECONOMICS</text></g>`);
await fs.writeFile(path.join(here,'end-screen.svg'),end);
await fs.copyFile(path.join(brand,'youtube-profile.png'),path.join(here,'profile-picture.png'));
await fs.copyFile(path.join(brand,'youtube-profile.png'),path.join(here,'video-watermark.png'));
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage();
for(const [name,width,height] of [['channel-banner',2560,1440],['multiplier-thumbnail',3840,2160],['end-screen',1920,1080]]){
 await page.setViewportSize({width,height});await page.goto(pathToFileURL(path.join(here,name+'.svg')).href);await page.screenshot({path:path.join(here,name+'.png')});
}
await browser.close();
const ffmpeg=execFileSync('python',['-c','import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'],{encoding:'utf8'}).trim();
const video=path.join(repo,'authoring/a-level/outputs/videos/Income-expenditure-multiplier.mp4');
for(const [name,start,duration] of [['intro',0,4],['outro',218.252,5]]){
 execFileSync(ffmpeg,['-y','-v','error','-ss',String(start),'-i',video,'-t',String(duration),'-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k','-movflags','+faststart',path.join(here,name+'.mp4')]);
 await fs.copyFile(path.join(repo,`tmp/income-expenditure-video/audio-neural/brand-${name}.wav`),path.join(here,name+'-sound.wav'));
}
console.log('Created channel banner, profile, watermark, thumbnail, editor, end screen and reusable intro/outro clips.');
