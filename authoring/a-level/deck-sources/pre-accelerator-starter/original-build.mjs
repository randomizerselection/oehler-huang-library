import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const root = 'C:/Users/oehle/Documents/oehler-huang-platform';
const workspaceDir = root + '/authoring/a-level';
const tmp = workspaceDir + '/tmp/pre-accelerator-starter';
const skill = 'C:/Users/oehle/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations';
const runtime = 'C:/Users/oehle/.cache/codex-runtimes/codex-primary-runtime/dependencies';
const finalPath = workspaceDir + '/outputs/Consumption-and-Multiplier-Classroom-Starter.pptx';
const { finalizePresentation } = await import(pathToFileURL(skill + '/container_tools/artifact_tool_utils.mjs'));
const p = Presentation.create({slideSize:{width:1600,height:900}});
const navy='#102D46', ink='#172D3C', blue='#126A8C', grey='#52616C', green='#146452';
const q1 = {
  source:'9708/32 February/March 2026, Q15 [1]',
  stem:'An estimate of the consumption function of an economy is given by an equation C = 10 000 + 0.8Y where C = consumption and Y = income.\n\nWhich conclusion can be drawn from this information?',
  options:[
    'The average propensity to consume is constant.',
    'The average propensity to consume increases as income increases.',
    'The average propensity to consume is always equal to the marginal propensity to consume.',
    'The average propensity to consume is always greater than the marginal propensity to consume.'
  ],
  notes:'Original question: C:/Users/oehle/Documents/past-papers/economics_9708_a_level/Question Paper/2026-march/Paper 3/9708_m26_qp_32.pdf, printed/PDF page 6, Q15. Published mark scheme: Mark Scheme/2026-march/Paper 3/9708_m26_ms_32.pdf, page 2: D, 1 mark. Original wording, data and option order preserved. Equation uses original Y, not a substituted disposable-income symbol. Interpretation assumes positive income, as in the question. Explanations and diagnostic prompts are teacher-written.'
};
const q2 = {
  source:'9708/32 February/March 2021, Q24 [1]',
  stem:'In a closed economy, the marginal propensity to save is 0.1 and the marginal propensity to pay taxes is also 0.1. These values are constant and do not vary with the level of income.\n\nWhat will be the increase in national income if there is an injection of $100 million into the circular flow?',
  options:['$1000 million','$500 million','$100 million','$80 million'],
  notes:'Original question: C:/Users/oehle/Documents/past-papers/economics_9708_a_level/Question Paper/2021-march/Paper 3/9708_m21_qp_32.pdf, printed/PDF page 10, Q24. Published mark scheme: Mark Scheme/2021-march/Paper 3/9708_m21_ms_32.pdf, page 2: B, 1 mark. Original wording, data and option order preserved. This is deliberate retrieval of a question already present in the taught multiplier lesson. Diagnostic distractor explanations are teacher-written. Tax and saving propensities are both measured against national income in this question; add both leakages.'
};
const written = 'Explain how the extraction of natural resources in Ghana will ‘create further employment in other sectors through the multiplier effect’. [4]';
const ghanaNotes = 'Original question: C:/Users/oehle/Documents/past-papers/economics_9708_a_level/Question Paper/2024-oct-nov/Paper 4/9708_w24_qp_41.pdf, Q1(b), printed/PDF page 3. Relevant stimulus: first paragraph, page 2. Published mark scheme: Mark Scheme/2024-oct-nov/Paper 4/9708_w24_ms_41.pdf, page 8. Official allocation: 2 marks for understanding the multiplier, 2 for application using the case study. Four credited elements: total increase in national income/output (1), following an increase in injections into the circular flow (1), new jobs and associated incomes in the article (1), further round of spending/jobs/income (1). Task wording is unchanged. Context summary and model answer are teacher-written. This previously studied question is deliberate retrieval. No diagram or evaluation is required for this explain task.';
function text(s,name,t,x,y,w,h,size=28,color=ink,bold=false){
  const sh=s.shapes.add({name,geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  sh.text=t; sh.text.style={typeface:'Arial',fontSize:size,bold,color,autoFit:'none',verticalAlignment:'top'};
  return sh;
}
function slide(id,label,title){
  const s=p.slides.add(); s.name=id; s.background.fill='#FFFFFF';
  text(s,id+'-label',label,65,32,1470,32,21,blue,true);
  text(s,id+'-title',title,65,75,1470,65,49,navy,true);
  return s;
}
function options(s,id,q,x,y,w,size=27,gaps){
  q.options.forEach((v,i)=>{ const h=gaps?.[i]??50; text(s,id+'-option-'+i,String.fromCharCode(65+i)+'   '+v,x,y,w,h,size); y+=h+9; });
}

{
 const s=slide('independent-core','STARTER     10 MINUTES','Consumption and the multiplier');
 text(s,'core-instructions','Work independently in your notebook. Write the answer letters, show your reasoning and explain one incorrect option for each question.',65,150,1470,67,27);
 text(s,'consumption-heading','1   Consumption function',65,238,720,45,31,blue,true);
 text(s,'consumption-stem',q1.stem,65,293,705,185,27);
 options(s,'core-consumption',q1,65,493,705,27,[42,76,110,110]);
 text(s,'multiplier-heading','2   Multiplier calculation',835,238,700,45,31,blue,true);
 text(s,'multiplier-stem',q2.stem,835,293,700,264,27);
 options(s,'core-multiplier',q2,835,577,700,29,[43,43,43,43]);
 text(s,'core-time','At 10 minutes: if your teacher is still away, the class monitor may advance once to the extension.',835,804,700,62,24,blue,true);
 text(s,'core-source',q1.source+'     /     '+q2.source,65,865,1470,27,18,grey);
 s.speakerNotes.textFrame.setText('SETUP: Project slide 1 before leaving for the meeting. Ask a class monitor to advance exactly once at 10 minutes if you have not returned. Slide 2 is a five-minute extension and explicitly tells students to stop there. Slides 3–5 are feedback for your return. No automatic advance. Suggested core pacing: Q1, five minutes including algebra or numerical checks and a distractor explanation; Q2, five minutes including complete working and a distractor explanation. Calculators optional. Extra explanations are teacher-added practice and carry no additional official marks. Core assesses taught consumption/saving and multiplier content only. The accelerator follows in the main lesson.\n\n'+q1.notes+'\n\n'+q2.notes);
}
{
 const s=slide('optional-written','EXAM PRACTICE     OPTIONAL 5 MINUTES','Employment and the multiplier in Ghana');
 text(s,'extension-instructions','If your teacher is still away, write one developed paragraph. Stop on this slide until your teacher arrives.',65,153,1470,76,30,blue,true);
 text(s,'context-label','CONTEXT SUMMARY',65,265,1470,35,22,grey,true);
 text(s,'context','Ghana discovered an offshore oil field in 2007 and began extraction in 2010. Extraction creates new jobs and raises incomes. Households spend some of the extra income on domestic goods and services and some on imports.',65,312,1440,158,32);
 text(s,'written-question',written,65,510,1450,150,37,navy,true);
 text(s,'early-finish','Finished early? Underline the links in your explanation that show why employment rises in other sectors.',65,727,1400,82,28,blue);
 text(s,'written-source','9708/41 October/November 2024, Q1(b) [4]     Context summary: teacher-written from the source.',65,854,1470,33,21,grey);
 s.speakerNotes.textFrame.setText('OPTIONAL: Minutes 10–15 only. This is a four-mark explanation, not a full essay. Students should work independently without showing the following feedback slides. If the teacher returns at 10 minutes, this task can be skipped. The last prompt is teacher-added review with no extra official marks.\n\n'+ghanaNotes);
}
{
 const s=slide('consumption-feedback','FEEDBACK     TEACHER REVEAL','Average and marginal consumption');
 text(s,'q1-repeat',q1.stem,65,170,710,194,27);
 options(s,'feedback-consumption',q1,65,392,710,26,[45,77,105,105]);
 text(s,'q1-answer','D   APC is greater than MPC',835,170,700,56,34,green,true);
 text(s,'q1-equations','MPC = 0.8\n\nAPC = C ÷ Y\nAPC = 10 000 ÷ Y + 0.8',835,252,700,229,34);
 text(s,'q1-explanation','For positive income, 10 000 ÷ Y is positive, so APC exceeds 0.8.',835,489,700,105,29);
 text(s,'q1-distractors','A and B: as income rises, 10 000 ÷ Y falls. APC falls.\n\nC: positive autonomous consumption keeps APC above MPC.',835,616,700,179,27);
 text(s,'q1-source',q1.source+'     Official answer: D. Explanations: teacher-written.',65,857,1470,31,20,grey);
 s.speakerNotes.textFrame.setText(q1.notes+'\nNumerical check if needed: at Y = 50 000, C = 50 000 and APC = 1. At Y = 100 000, C = 90 000 and APC = 0.9. MPC remains 0.8. Ask students to distinguish the slope from the ratio C/Y. If A or C is common, use these two observations before proceeding. No accelerator knowledge is needed.');
}
{
 const s=slide('multiplier-feedback','FEEDBACK     TEACHER REVEAL','Leakages and the income increase');
 text(s,'q2-repeat',q2.stem,65,170,710,278,27);
 options(s,'feedback-multiplier',q2,65,489,710,30,[48,48,48,48]);
 text(s,'q2-answer','B   $500 million',835,170,700,55,36,green,true);
 text(s,'q2-equations','MPW = MPS + MPT\nMPW = 0.1 + 0.1 = 0.2\n\nk = 1 ÷ 0.2 = 5\n\nΔY = k × injection\nΔY = 5 × $100m = $500m',835,251,700,336,32);
 text(s,'q2-distractors','A omits one leakage.\nC counts only the initial injection.\nD counts only the first induced round.',835,621,700,156,27);
 text(s,'q2-source',q2.source+'     Official answer: B. Explanations: teacher-written.',65,857,1470,31,20,grey);
 s.speakerNotes.textFrame.setText(q2.notes+'\nA: 1/0.1 gives 10 because it omits either tax or saving. C: 100m is the initial injection alone. D: with MPW = 0.2, 80m is the next round of spending. Total income includes the initial and all subsequent rounds. The economy is closed, so there is no import leakage. If A is common, ask students to identify every stated withdrawal before applying the formula.');
}
{
 const s=slide('ghana-feedback','MODEL ANSWER     OPTIONAL TASK','Employment beyond oil extraction');
 text(s,'ghana-repeat',written,65,165,1460,110,30,navy,true);
 text(s,'ghana-model-label','TEACHER-WRITTEN MODEL',65,320,920,36,22,blue,true);
 text(s,'ghana-model','The multiplier describes the total increase in national income or output following an increase in injections into the circular flow. In Ghana, oil extraction creates jobs and raises workers’ incomes. Workers spend part of their extra income on locally produced goods and services. Firms in sectors such as retail and transport receive more demand and employ more workers. Their additional incomes create further rounds of spending and employment.',65,376,935,353,32);
 text(s,'ghana-marking-label','OFFICIAL MARKING POINTS',1070,320,465,38,22,green,true);
 text(s,'ghana-marking','1   Total income/output increase\n\n1   Following increased injections\n\n1   Ghana’s new jobs and incomes\n\n1   Further spending, jobs or income',1070,384,465,357,27);
 text(s,'ghana-source','9708/41 October/November 2024, Q1(b). Mark scheme p.8: understanding [2] + application [2].',65,848,1470,38,22,grey);
 s.speakerNotes.textFrame.setText(ghanaNotes+'\nThe examples of retail and transport are plausible teacher-written applications, not additional facts asserted by the article. Full four-mark coverage comes from the official understanding/application elements; do not award extra marks merely for length. After brief feedback, open the existing Investment and the accelerator lesson.');
}

await fs.mkdir(tmp,{recursive:true});
await fs.mkdir(path.dirname(finalPath),{recursive:true});
const candidatePath=tmp+'/candidate.pptx';
await (await PresentationFile.exportPptx(p)).save(candidatePath);
for(let i=0;i<p.slides.items.length;i++){
 const s=p.slides.items[i];
 const preview=await p.export({slide:s,format:'png',scale:1});
 await fs.writeFile(`${tmp}/slide-${i+1}.png`,new Uint8Array(await preview.arrayBuffer()));
 const layout=await s.export({format:'layout'});
 await fs.writeFile(`${tmp}/slide-${i+1}.layout.json`,await layout.text());
}
await finalizePresentation({workspaceDir,candidatePath,finalPath,
 pythonExecutable:runtime+'/python/python.exe',
 integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',
 layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',
 layoutArgs:['--expected-slide-size-emu','15240000,8572500','--validate-bullet-geometry','--validate-heading-fit'],
 fontPolicy:{basis:'design',families:['Arial']},
 requiredNativeTableOwnerSlides:[],requiredNativeChartOwnerSlides:[],
 verifyArtifactToolImport:true,receiptPath:tmp+'/validation.json'});
console.log(finalPath);
