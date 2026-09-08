// Local classroom-deck QA. Usage: node verify-lesson.cjs lesson-03 [slide numbers...]
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');
const assert = require('assert/strict');
const {chromium} = require('@playwright/test');
const root = path.resolve(__dirname, '../../../apps/library');
const course = path.join(root, 'investment-analysis');
const lessonFolder = process.argv[2] || 'lesson-03';
const selected = process.argv.slice(3).map(Number);
assert.match(lessonFolder, /^lesson-\d{2}$/);
const aliases = {'lesson-02': '1-1-2-measuring-investment-return', 'lesson-03': '1-1-3-compound-growth'};
const lessonSlug = aliases[lessonFolder];
assert.ok(lessonSlug, 'Use a linked lesson alias; add a new alias when publishing a lesson');
const lessonRoute = `investment-analysis/lessons/${lessonSlug}`;
assert.ok(fs.readFileSync(path.join(course, 'index.html'), 'utf8').includes(`lessons/${lessonSlug}/index.html`), 'Lesson must be linked from the course landing page');
const out = path.resolve(__dirname, '../tmp/html-verification', lessonFolder);
fs.mkdirSync(out, {recursive: true});
const sandbox = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root,lessonRoute,'slides.js'),'utf8'),sandbox);
const lesson=sandbox.window.INVESTMENT_COURSE.lesson;
assert.equal(new Set(lesson.slides.map(s=>s.id)).size,lesson.slides.length,'unique semantic slide IDs');
assert.equal(lesson.slides.filter(s=>s.kind==='section').length,3);
assert.equal(lesson.slides.find(s=>s.kind==='objectives').items.length,3);
lesson.slides.forEach(s=>assert.ok(s.note,`Missing teacher note: ${s.id}`));
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg'};
  try{res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({headless:true,channel:'chrome'});
  const issues=[],errors=[];
  for(const [width,height] of [[1280,720],[1920,1080],[390,844]]) {
    const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/${lessonRoute}/index.html`);
    for(let i=0;i<lesson.slides.length;i++) {
      if(selected.length&&!selected.includes(i+1))continue;
      await page.evaluate(n=>{location.hash=String(n)},i+1);
      const slide=page.locator(`.slide[data-index="${i}"]`);
      await slide.waitFor({state:'visible'});
      const partials=await slide.locator('.partial-item').count();
      for(let p=0;p<partials;p++) {
        await page.locator('#nextSlide').click();
        assert.equal(await slide.locator('.partial-item.is-visible').count(),p+1,'one reveal per click');
      }
      if(width===1280) await page.screenshot({path:path.join(out,`${String(i+1).padStart(2,'0')}-question.png`)});
      for(const b of await slide.locator('.blank-answer,.inline-reveal').all()){
        await b.click(); assert.equal(await b.getAttribute('aria-expanded'),'true');
      }
      const mcq=slide.locator('.mcq-grid');
      if(await mcq.count()){
        const correct=Number(await mcq.getAttribute('data-answer'));
        await mcq.locator('button').nth((correct+1)%4).click(); assert.equal(await mcq.locator('.is-incorrect').count(),1);
        await mcq.locator('button').nth(correct).click(); assert.equal(await mcq.locator('.is-correct').count(),1);
      }
      await page.evaluate(()=>Promise.all([...document.images].map(im=>im.decode().catch(()=>{}))));
      const check=await slide.evaluate((el,{width})=>{
        const found=[];
        for(const im of el.querySelectorAll('img'))if(!im.complete||!im.naturalWidth)found.push({text:'Image did not load',src:im.src});
        const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node;
        while(node=walker.nextNode()){
          if(!node.textContent.trim()||node.parentElement.closest('figcaption'))continue;
          let hidden=false;
          for(let a=node.parentElement;a&&a!==el.parentElement;a=a.parentElement){const s=getComputedStyle(a);if(s.display==='none'||s.visibility==='hidden'||Number(s.opacity)===0){hidden=true;break;}}
          if(hidden)continue;
          const range=document.createRange();range.selectNodeContents(node);
          for(const r of range.getClientRects())for(let a=node.parentElement;a&&a!==el.parentElement;a=a.parentElement){
            const s=getComputedStyle(a),b=a.getBoundingClientRect();
            if((['hidden','clip'].includes(s.overflowX)&&(r.left<b.left-2||r.right>b.right+2))||(['hidden','clip'].includes(s.overflowY)&&(r.top<b.top-2||r.bottom>b.bottom+2))){found.push({text:node.textContent.trim().slice(0,85),container:a.className});break;}
          }
        }
        const body=el.querySelector('.slide-body'),heading=el.querySelector('.slide-header h1');
        if(width>820&&body&&heading&&heading.getBoundingClientRect().bottom>body.getBoundingClientRect().top+2)found.push({text:'Header overlaps body'});
        if(width>820&&body){const b=body.getBoundingClientRect();for(const child of body.children){const r=child.getBoundingClientRect();if(r.bottom>b.bottom+3)found.push({text:'Body child exceeds available height',child:child.className,by:r.bottom-b.bottom});}}
        if(width<821&&el.scrollWidth>width+2)found.push({text:'Mobile horizontal overflow',scrollWidth:el.scrollWidth});
        if(/Write first|click each blank|Complete the glossary|REMEMBER|Hinge check/.test(el.innerText))found.push({text:'Projected teacher guidance'});
        return found;
      },{width});
      if(check.length)issues.push({slide:i+1,id:lesson.slides[i].id,width,issues:check});
      if(width===1280)await page.screenshot({path:path.join(out,`${String(i+1).padStart(2,'0')}-revealed.png`)});
      if(width===390&&[2,11,17,26,31,34].includes(i+1))await page.screenshot({path:path.join(out,`${String(i+1).padStart(2,'0')}-mobile.png`),fullPage:true});
    }
    await page.locator('#overviewButton').click();assert.equal(await page.locator('#overviewDialog').evaluate(e=>e.open),true);
    assert.equal(await page.locator('#overviewGrid button').count(),lesson.slides.length);
    await page.locator('#closeOverview').click();
    console.log(`Checked ${selected.length||lesson.slides.length} slides at ${width}×${height}`);
    await page.close();
  }
  // Verify motion is present when not explicitly reduced.
  const page=await browser.newPage({viewport:{width:1280,height:720}});
  await page.goto(`http://127.0.0.1:${server.address().port}/${lessonRoute}/index.html#4`);
  const motion=await page.locator('.blank-answer').first().evaluate(e=>getComputedStyle(e).transitionDuration);
  assert.ok(motion.split(',').some(t=>parseFloat(t)>0),'animated answer transitions');
  await page.keyboard.press('Home');
  assert.equal(await page.evaluate(()=>location.hash),'#1');
  await page.keyboard.press('End');
  assert.equal(await page.evaluate(()=>location.hash),`#${lesson.slides.length}`);
  const objectiveIndex=lesson.slides.findIndex(s=>s.kind==='objectives');
  await page.evaluate(n=>{location.hash=String(n)},objectiveIndex+1);
  const objective=page.locator(`.slide[data-index="${objectiveIndex}"]`);
  await objective.waitFor({state:'visible'});
  await page.keyboard.press('ArrowRight');
  assert.equal(await objective.locator('.partial-item.is-visible').count(),1,'keyboard reveals one box');
  await page.keyboard.press('ArrowLeft');
  assert.equal(await objective.locator('.partial-item.is-visible').count(),0,'keyboard reverses one reveal');
  await page.keyboard.press('n');
  assert.equal(await page.locator('#notesPanel').getAttribute('aria-hidden'),'false');
  assert.ok((await page.locator('#notesText').innerText()).length>0);
  await page.keyboard.press('n');
  assert.equal(await page.locator('#notesPanel').getAttribute('aria-hidden'),'true');
  await page.keyboard.press('f');
  await page.waitForFunction(()=>Boolean(document.fullscreenElement));
  await page.keyboard.press('f');
  await page.waitForFunction(()=>!document.fullscreenElement);
  await browser.close();
  // A fresh browser tests a genuine cold offline opening, independently of the
  // decoded-image cache accumulated during three complete render passes.
  const offlineBrowser=await chromium.launch({headless:true,channel:'chrome'});
  try {
    const offline=await offlineBrowser.newPage({viewport:{width:1280,height:720}});
    await offline.goto(`file:///${path.join(root,lessonRoute,'index.html').replaceAll('\\','/')}`);
    const failures=await offline.evaluate(async()=>{
      const failed=[];
      for(const im of document.images){try{await im.decode();}catch(e){failed.push({src:im.src,error:e.message});}}
      return failed;
    });
    assert.deepEqual(failures,[],'original photos decode when opened offline');
    assert.equal(await offline.locator('.slide:not([hidden])').count(),1,'opens directly as a local file');
  } finally { await offlineBrowser.close(); }
  server.close();
  const report={lesson:lesson.meta.title,slideCount:lesson.slides.length,checkedSlides:selected.length?selected:lesson.slides.map((s,i)=>i+1),viewports:['1280x720','1920x1080','390x844'],checked:new Date().toISOString(),issues,errors};
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({slideCount:lesson.slides.length,issues,errors},null,2));
  if(issues.length||errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
