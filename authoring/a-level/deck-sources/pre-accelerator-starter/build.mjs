import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
const here=path.dirname(fileURLToPath(import.meta.url));
const workspaceDir=path.resolve(here,'../..');
const tmp=path.join(workspaceDir,'tmp/pre-accelerator-starter/edit');
const skill='C:/Users/oehle/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations';
const runtime='C:/Users/oehle/.cache/codex-runtimes/codex-primary-runtime/dependencies';
process.env.RUNTIME_NODE_MODULES=runtime+'/node/node_modules';
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(here,'manual-base.pptx')));
const snapshot=await p.inspect({kind:'slide,textbox,shape',maxChars:100000});
const records=snapshot.ndjson.trim().split('\n').map(JSON.parse);
const get=name=>{const r=records.find(x=>x.name===name);if(!r)throw Error('Missing inherited object '+name);return p.resolve(r.id);};
function edit(name,value,box,size){const s=get(name);s.text=value;if(box)s.position=box;if(size)s.text.style={fontSize:size,typeface:'Arial'};return s;}
const stem='In a closed economy with no government there is an initial equilibrium level of national income of $500 billion. The economy’s households always spend a constant fraction of every $1 of income they receive. When investment spending increases by $20 billion the economy moves to a new equilibrium level of national income of $600 billion.\n\nWhat is the marginal propensity to consume of the economy’s households?';
const source='9708/31 October/November 2021, Q24 [1]';
const base='C:/Users/oehle/Documents/past-papers/economics_9708_a_level/';
const mcqNotes=`Original wording, values and option order preserved. Question paper: ${base}Question Paper/2021-oct-nov/Paper 3/9708_w21_qp_31.pdf, page 8, Q24. Official mark scheme: ${base}Mark Scheme/2021-oct-nov/Paper 3/9708_w21_ms_31.pdf, page 2: B, 1 mark. Explanations are teacher-written. The net income change is 100 billion, so k = 100/20 = 5 and MPC = 1 - 1/5 = 0.8. C approximates 500/600, which is the ratio of the old to new income levels, not a marginal propensity. D implies no savings leakage and no finite multiplier in this simple model. No accelerator or output-gap knowledge is required.`;
const prompt='Explain what economists mean by the marginal propensity to consume and consider the importance of this concept in relation to government macroeconomic policy. [12]';
const prep='Five-minute preparation: define MPC, then explain how its size affects the impact of higher government spending on output and employment.';
const writtenNotes=`Original full question: ${base}Question Paper/2021-oct-nov/Paper 4/9708_w21_qp_41.pdf, printed/PDF page 4, Q4(a), 12 marks. Mark scheme: ${base}Mark Scheme/2021-oct-nov/Paper 4/9708_w21_ms_41.pdf, page 10. Original full wording is displayed. The classroom task is a teacher-created five-minute preparation exercise covering a definition and one developed causal link, NOT a complete response to the 12-mark question. Do not score the preparatory paragraph out of 12 or invent point marks. Official level 4 (9–12) expects a clear MPC explanation, multiplier explanation, analysis relating to at least three macroeconomic goals and some evaluation of importance across policy types. The short starter deliberately leaves that full essay for later consolidation. The model is a teacher-written example for the limited preparation task, not a model claiming 12 marks.`;

const processQuestion='What describes the multiplier process, as it operates within a closed economy with no government sector?';
const processOptions=[
  'Changes in National Income determine the level of investment.',
  'The level of consumption depends on the level of National Income.',
  'The levels of consumption and investment together determine the level of National Income.',
  'When investment changes, there will be a greater change in equilibrium National Income.'
];
const processSource='9708/31 May/June 2021, Q24 [1]';
const processNotes=`Original question: ${base}Question Paper/2021-may-june/Paper 3/9708_s21_qp_31.pdf, page 9, Q24. Original wording, capitalisation and option order preserved. Official mark scheme: ${base}Mark Scheme/2021-may-june/Paper 3/9708_s21_ms_31.pdf, page 2, D, 1 mark. Absent from the taught multiplier deck. Teacher confirmed 10 September 2026 that this cohort has studied the multiplier but NOT the consumption and saving lesson. This replaces the consumption-function/APC question. Feedback needs only the taught multiplier mechanism; do not teach the accelerator to explain option A.`;
edit('independent-core-title','The multiplier');
edit('consumption-heading','1   Multiplier process');
edit('consumption-stem',processQuestion,{left:65,top:225.97,width:705,height:114},27);
processOptions.forEach((v,i)=>edit('core-consumption-option-'+i,String.fromCharCode(65+i)+'   '+v,{left:65,top:365+i*103,width:705,height:95},27));
edit('consumption-feedback-title','The multiplier process');
edit('q1-repeat',processQuestion,{left:65,top:170,width:710,height:115},27);
processOptions.forEach((v,i)=>edit('feedback-consumption-option-'+i,String.fromCharCode(65+i)+'   '+v,{left:65,top:316+i*103,width:710,height:95},26));
edit('q1-answer','D   A larger change in income');
edit('q1-equations','Investment rises, creating extra demand and income.\n\nHouseholds spend part of that income. Firms receive more demand, generating another round.',{left:835,top:252,width:700,height:225},30);
edit('q1-explanation','The repeated rounds make the total income change greater than the initial investment change.',{left:835,top:489,width:700,height:115},29);
edit('q1-distractors','A reverses the direction of causation.\nB describes only the consumption response.\nC does not describe the multiplied change.',{left:835,top:628,width:700,height:160},27);
edit('q1-source',processSource+'     Official answer: D. Explanations: teacher-written.');
p.slides.items[2].speakerNotes.textFrame.setText(processNotes+' A starts with income changing investment, whereas the multiplier here starts with investment changing income. B and C do not identify a greater total change after repeated rounds. The multiplier also works in reverse when investment falls.');
edit('multiplier-heading','2   Multiplier and MPC');
edit('multiplier-stem',stem,{left:835,top:225.97,width:700,height:323},27);
['0.20','0.80','0.83','1.00'].forEach((v,i)=>edit('core-multiplier-option-'+i,String.fromCharCode(65+i)+'   '+v,{left:835,top:572+i*52,width:700,height:43},29));
edit('core-source',processSource+'     /     '+source);
p.slides.items[0].speakerNotes.textFrame.setText('Project this slide for the ten-minute core. Ask students orally to record answer letters, working and an explanation of one distractor for each. The teacher may ask a monitor privately to advance once to the optional task if still away after ten minutes. Do not restore the deleted timing, management or instruction labels. MPC, MPS and the multiplier formula are explicitly taught in the multiplier deck, so Q2 remains appropriate. The consumption and saving lesson has not yet been taught. '+processNotes+' '+mcqNotes);

edit('optional-written-title','MPC and government spending');
edit('context-label','PAST-PAPER QUESTION');
edit('context',prompt,{left:65,top:312,width:1440,height:164},34);
edit('written-question',prep,{left:65,top:525,width:1450,height:158},34);
edit('written-source','9708/41 October/November 2021, Q4(a). Adapted task: preparation for part of the original 12-mark question.',{left:65,top:838,width:1470,height:54},21);
p.slides.items[1].speakerNotes.textFrame.setText('Optional minutes 10–15 only. Students attempt the displayed preparation task, then wait for the teacher before advancing to answers. No additional topic teaching is needed. '+writtenNotes);

edit('multiplier-feedback-title','MPC from the change in income');
edit('q2-repeat',stem,{left:65,top:170,width:710,height:319},26);
['0.20','0.80','0.83','1.00'].forEach((v,i)=>edit('feedback-multiplier-option-'+i,String.fromCharCode(65+i)+'   '+v,{left:65,top:515+i*57,width:710,height:48},30));
edit('q2-answer','B   MPC = 0.80');
edit('q2-equations','ΔY = $600bn − $500bn\nΔY = $100bn\n\nk = ΔY ÷ ΔI = 100 ÷ 20 = 5\n\nMPS = 1 ÷ k = 0.20\nMPC = 1 − 0.20 = 0.80',undefined,31);
edit('q2-distractors','A gives MPS, the saving fraction.\nC uses income levels: 500 ÷ 600.\nD leaves no saving leakage.',undefined,27);
edit('q2-source',source+'     Official answer: B. Explanations: teacher-written.');
p.slides.items[3].speakerNotes.textFrame.setText(mcqNotes+' If A is common, ask which fraction leaks away rather than being spent. Use the change in income rather than either income level.');

edit('ghana-feedback-title','MPC and the effect of fiscal policy');
edit('ghana-repeat',prompt,{left:65,top:165,width:1460,height:133},30);
edit('ghana-model-label','MODEL FOR THE PREPARATION TASK');
edit('ghana-model','MPC is the proportion of additional income spent on consumption. When the government raises spending, firms receive more demand and workers earn more income. Households spend part of that extra income, creating further rounds of demand and income. A higher MPC means more spending in each round and a larger multiplier. Where firms have spare capacity, the same initial increase in government spending can therefore produce a larger rise in output and employment.',{left:65,top:376,width:935,height:382},31);
edit('ghana-marking-label','OFFICIAL SCHEME: FULL ESSAY');
edit('ghana-marking','The full 12-mark task requires a wider response.\n\nTop-level guidance includes at least three macroeconomic goals and evaluation across policy types.',{left:1070,top:384,width:465,height:337},27);
edit('ghana-source','9708/41 October/November 2021, Q4(a), mark scheme p.10. Teacher-written preparation model.',{left:65,top:843,width:1470,height:43},21);
p.slides.items[4].speakerNotes.textFrame.setText(writtenNotes+' The model uses only the previously taught spending multiplier, consumption response and spare-capacity condition. The full mark scheme also discusses imports and other macroeconomic goals; students are not asked to complete that larger task before the accelerator lesson.');

await fs.mkdir(tmp,{recursive:true});
for(let i=0;i<p.slides.items.length;i++){
 const b=await p.export({slide:p.slides.items[i],format:'png',scale:1});
 await fs.writeFile(path.join(tmp,`after-${i+1}.png`),new Uint8Array(await b.arrayBuffer()));
}
const candidatePath=path.join(tmp,'candidate.pptx');
await(await PresentationFile.exportPptx(p)).save(candidatePath);
const {finalizePresentation}=await import(pathToFileURL(skill+'/container_tools/artifact_tool_utils.mjs'));
await fs.mkdir(path.join(tmp,'validated'),{recursive:true});
const validated=path.join(tmp,'validated','validated-'+Date.now()+'.pptx');
await finalizePresentation({workspaceDir,candidatePath,finalPath:validated,
 pythonExecutable:runtime+'/python/python.exe',
 integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',
 layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',
 layoutArgs:['--expected-slide-size-emu','15240000,8572500','--validate-bullet-geometry','--validate-heading-fit'],
 fontPolicy:{basis:'reference',families:['Arial'],referencePath:path.join(here,'manual-base.pptx'),referenceSha256:createHash('sha256').update(await fs.readFile(path.join(here,'manual-base.pptx'))).digest('hex')},
 verifyArtifactToolImport:true,receiptPath:path.join(tmp,'validation-'+Date.now()+'.json')});
const output=path.join(workspaceDir,'outputs/Multiplier-Classroom-Starter.pptx');
await fs.copyFile(validated,output);
console.log(output);
