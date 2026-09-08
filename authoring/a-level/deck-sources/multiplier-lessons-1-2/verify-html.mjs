// Content, arithmetic, diagram, source-fidelity and offline-packaging checks.
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const here=import.meta.dirname,root=path.resolve(here,'../..'),sandbox={window:{}};
const source = path.resolve(here, '../../../../apps/library/a-level/lessons/9-1-1-multiplier');
vm.createContext(sandbox);
for(const file of ['html/slides.js','html/diagram-scenes.js','../shared-html/diagrams.js']){
  vm.runInContext(await fs.readFile((file.startsWith('html/') ? path.join(source, file.slice(5)) : path.resolve(source, '../../shared-html/diagrams.js')),'utf8'),sandbox,{filename:file});
}

const {slides,meta}=sandbox.window.ALEVEL_LESSON;
const fullSlideKinds=new Set(['hero','hook','section']);
const classroomLabels=new Set([
  'STARTER','LESSON OVERVIEW','RETRIEVAL','CONCEPT','DIAGRAM','WORKED EXAMPLE',
  'QUICK CHECK','FEEDBACK','EVALUATION','SYNTHESIS','EXAM PRACTICE','MODEL ANSWER',
  'SUMMARY','PHOTO CASE'
]);
assert.equal(slides.length,66);
assert.equal(new Set(slides.map(slide=>slide.id)).size,slides.length);
assert.equal(slides.findIndex(slide=>slide.id===meta.coreEnd),slides.length-1);
assert.equal(meta.syllabus,'9708 · 9.1.1');
assert.equal(meta.plannedLessons,2);
assert.equal(slides.findIndex(slide=>slide.id===meta.lessonBreak),31);

let diagramStates=0;
for(const [index,slide] of slides.entries()){
  assert.equal(slide.sourceSlide,index+1,`${slide.id}: incorrect sourceSlide`);
  assert.ok(slide.title,`${slide.id}: missing title`);
  assert.ok(slide.title.replaceAll('\n',' ').split(/\s+/).length<=10,`${slide.id}: title exceeds 10 words`);
  if(!fullSlideKinds.has(slide.kind)){
    assert.ok(classroomLabels.has(slide.label),`${slide.id}: missing or invalid classroom label`);
  }
  assert.ok(slide.notes,`${slide.id}: missing teacher notes`);
  assert.ok(Array.isArray(slide.sources)&&slide.sources.length,`${slide.id}: missing sources`);
  if(slide.kind==='mcq'){
    assert.ok(Number.isInteger(slide.answer));
    assert.ok(slide.answer>=0&&slide.answer<slide.options.length);
  }
  if(slide.kind==='diagram'){
    assert.ok(slide.scene?.steps?.length>=3,`${slide.id}: incomplete diagram scene`);
    diagramStates+=slide.scene.steps.length;
    const svg=sandbox.window.EconDiagrams.markup(slide.scene,slide.id);
    assert.ok(!/NaN|undefined/.test(svg),`${slide.id}: invalid SVG value`);
    assert.equal((svg.match(/<svg /g)||[]).length,1);
    assert.ok(svg.includes('preserveAspectRatio="xMinYMid meet"'));
  }
}

// Numerical model checks.
const rounds=slides.find(slide=>slide.id==='spending-rounds').table.slice(1);
assert.equal(Number(rounds.at(-1)[1]),400);
assert.equal(Number(rounds.at(-1)[2]),300);
assert.equal(Number(rounds.at(-1)[3]),100);
const marginal=slides.find(slide=>slide.id==='marginal-data-practice').table.slice(1);
const changes=Object.fromEntries(marginal.map(row=>[row[0],Number(row[3])]));
assert.equal(changes.Consumption+changes.Saving+changes.Tax+changes.Imports,200);
assert.equal(changes.Consumption/200,0.7);
assert.equal((changes.Saving+changes.Tax+changes.Imports)/200,0.3);
const aeTable=slides.find(slide=>slide.id==='ae-spending-table').table.slice(1);
for(const row of aeTable){
  const income=Number(row[0]),consumption=Number(row[1]),investment=Number(row[2]),ae=Number(row[3]);
  assert.equal(consumption,0.75*income);
  assert.equal(ae,consumption+investment);
}
const aeRounds=slides.find(slide=>slide.id==='ae-spending-rounds').table.slice(1);
assert.equal(Number(aeRounds.at(-1)[1]),200);
assert.equal(Number(aeRounds.at(-1)[2]),150);
assert.equal(Number(aeRounds.at(-1)[3]),50);
const adRounds=slides.find(slide=>slide.id==='adas-multiplier-outcome').scene.roundValues;
assert.deepEqual([...adRounds],[50,37.5,28.125]);
assert.equal(adRounds[1]/adRounds[0],0.75);
assert.equal(adRounds[2]/adRounds[1],0.75);

// Exact past-paper wording remains tied to the immutable migration audit.
const audit=JSON.parse(await fs.readFile(path.join(here,'source-audit.json'),'utf8'));
const paperSlides=slides.filter(slide=>slide.paper);
assert.equal(paperSlides.length,6);
for(const slide of paperSlides){
  const original=audit.slides[slide.legacySourceSlide-1].text;
  assert.equal(slide.question,original['6'],`${slide.id}: question changed`);
  if(slide.options)slide.options.forEach((option,index)=>{
    assert.equal(option,original[String(7+index)],`${slide.id}: option changed`);
  });
}
const sourcePptx=await fs.readFile(path.join(root,'classroom/A-Level_Multiplier_Lessons_1-2.pptx'));
assert.equal(crypto.createHash('sha256').update(sourcePptx).digest('hex'),meta.sourceSha256,'PowerPoint migration source changed');

// Each concept-led image is used once and packaged into the offline file.
const imageSlides=slides.filter(slide=>slide.image);
assert.equal(imageSlides.length,7);
assert.equal(new Set(imageSlides.map(slide=>slide.image)).size,imageSlides.length);
assert.equal(imageSlides.filter(slide=>slide.kind==='hook').length,4);
for(const slide of imageSlides){
  assert.ok(slide.imageAlt,`${slide.id}: missing image alternative text`);
  assert.ok((await fs.stat(path.join(source,slide.image))).size>100000,`${slide.id}: image too small`);
}
const ghanaAnswer=slides.find(slide=>slide.id==='ghana-multiplier-answer');
assert.equal(ghanaAnswer.kind,'answers');
assert.ok(ghanaAnswer.items[0].text.includes('This repeated creation of income and spending is the multiplier effect.'));
assert.ok(ghanaAnswer.items[0].highlights.length>=4);
const equilibriumCheck=slides.find(slide=>slide.id==='ae-equilibrium-check');
assert.ok(equilibriumCheck.sampleAnswer?.includes('stocks rise unexpectedly'));

const html=await fs.readFile(path.join(root,'outputs/multiplier-html/A-Level_Multiplier_Lessons_1-2.html'),'utf8');
assert.ok(!/<script src=|<link rel="stylesheet"/.test(html),'External code dependency');
assert.ok(!html.includes('image: "assets/'),'External image dependency');
assert.ok(html.includes('id="studentSelectorButton"'),'Student selector control missing');
assert.ok(html.includes('https://randomizerselection.github.io/studentselector/'),'Student selector runtime missing');
assert.ok(html.includes('StudentSelector.mount'),'In-deck student selector integration missing');
assert.ok(html.includes("k==='s'"),'Student selector keyboard shortcut missing');
assert.ok(html.includes('.studentSelectorSidePanel'),'Student selector side-panel styles missing');
assert.ok(html.includes('body.is-student-selector-open .stage'),'Slide resizing rule missing');
assert.equal((html.match(/data:image\/(?:png|jpeg);base64,/g)||[]).length,imageSlides.length);
for(const [index,script] of [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].entries()){
  new vm.Script(script[1],{filename:`offline-script-${index}`});
}

console.log(JSON.stringify({
  status:'pass',slides:slides.length,pastPaperQuestions:paperSlides.length,
  diagrams:slides.filter(slide=>slide.kind==='diagram').length,diagramStates,
  images:imageSlides.length,sourcePptxUnchanged:true,portableHtmlBytes:Buffer.byteLength(html)
},null,2));
