import fs from 'node:fs/promises';
import path from 'node:path';
import { FileBlob, PresentationFile } from '@oai/artifact-tool';
import JSZip from 'jszip';

const ROOT=path.resolve(import.meta.dirname, '../..');
const SOURCE=path.join(ROOT,'deck-sources/multiplier-lessons-1-2');
const TMP=path.join(ROOT,'tmp/multiplier-diagram-teaching');
const OUT=path.join(ROOT,'outputs/legacy-multiplier-pptx/A-Level_Multiplier_Lessons_1-2.pptx');
const starterPptx=path.join(SOURCE,'base/template-starter.pptx');
const map=JSON.parse(await fs.readFile(path.join(SOURCE,'slide-map.json'),'utf8'));
const sourceLayouts=JSON.parse(await fs.readFile(path.join(SOURCE,'source-layouts.json'),'utf8'));
const presentation=await PresentationFile.importPptx(await FileBlob.load(starterPptx));
const C={ink:'#000000',gray:'#B6BBC2',muted:'#59616B',blue:'#3D85FF',coral:'#F56859',green:'#249F6B',pale:'#E9F5FA'};
const srcNotes='[Sources]\nAS & A Economics Syllabus 2026-2028.pdf, PDF p20 (4.2-4.3), p29 (9.1.1-9.1.3).\nCambridge A Level Economics - Textbook.pdf, PDF pp352-354, section 41.1 and Figures 41.3-41.5.\nNumerical examples and checks: teacher-created for this lesson; not past-paper questions.\n[/Sources]';
const current=new Map();
const manifest=[];
let counter=0;

function context(entry){
 const slide=presentation.slides.items[entry.outputSlide-1];
 const layout=sourceLayouts[entry.sourceSlide];
 const refs=new Map();
 for(const element of layout.elements){
  const pool=element.kind==='table'?slide.tables.items:element.kind==='image'?slide.images.items:slide.shapes.items;
  const found=pool.find(s=>s.name===element.name);
  if(found) refs.set(element.id,{shape:found,element});
 }
 const ctx={slide,entry,refs};current.set(entry.key,ctx);return ctx;
}
function ref(ctx,id){const r=ctx.refs.get(String(id));if(!r) throw new Error(`${ctx.entry.key}: missing inherited ${id}`);return r;}
function text(ctx,id,value){
 const {shape,element}=ref(ctx,id);
 shape.text.set(value);
 // Keep the actual first-run style, not the imported shape's fallback theme style.
 const sty=element.paragraphs?.[0]?.runs?.[0] || element.paragraphs?.[0]?.resolvedTextStyle;
 if(sty && value){
  const para=element.paragraphs?.[0]?.resolvedTextStyle||{};
  shape.text.style={fontSize:sty.fontSize,typeface:sty.typeface,color:sty.color,bold:sty.bold??para.bold??false,
   alignment:para.alignment??'left',verticalAlignment:element.resolvedTextStyle?.verticalAlignment??'top',
   insets:element.resolvedTextStyle?.insets,autoFit:'none'};
 }
 return shape;
}
function title(ctx,value){const e=[...ctx.refs.values()].find(r=>r.element.name?.includes('-title'));return text(ctx,e.element.id,value);}
function pos(shape,l,t,w,h){shape.position={left:l,top:t,width:w,height:h};return shape;}
function setline(ctx,id,x1,y1,x2,y2,color=C.ink,width=2,style='solid'){
 const s=ref(ctx,id).shape;
 s.position={left:Math.min(x1,x2),top:Math.min(y1,y2),width:Math.max(0.01,Math.abs(x2-x1)),height:Math.max(0.01,Math.abs(y2-y1)),horizontalFlip:x2<x1,verticalFlip:y2<y1};
 s.line={fill:color,width,style};return s;
}
function hideLine(ctx,id){ref(ctx,id).shape.line={fill:'none',width:0};}
function newLine(ctx,x1,y1,x2,y2,color=C.gray,width=1.3,style='solid'){
 return ctx.slide.shapes.add({name:`${ctx.entry.key}.guide-${++counter}`,geometry:'line',position:{left:Math.min(x1,x2),top:Math.min(y1,y2),width:Math.max(.01,Math.abs(x2-x1)),height:Math.max(.01,Math.abs(y2-y1)),horizontalFlip:x2<x1,verticalFlip:y2<y1},fill:'none',line:{fill:color,width,style}});
}
function label(ctx,txt,l,t,w=100,h=28,color=C.ink,size=20,align='left',bold=false){
 const s=ctx.slide.shapes.add({name:`${ctx.entry.key}.label-${++counter}`,geometry:'textbox',position:{left:l,top:t,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
 s.text=txt;s.text.style={fontSize:size,typeface:'Arial',color,alignment:align,bold,verticalAlignment:'middle',insets:{left:0,right:0,top:0,bottom:0},autoFit:'none'};return s;
}
function dot(ctx,x,y,color=C.blue){ctx.slide.shapes.add({name:`${ctx.entry.key}.point-${++counter}`,geometry:'ellipse',position:{left:x-5,top:y-5,width:10,height:10},fill:color,line:{fill:color,width:1}});}
function notes(ctx,body){ctx.slide.speakerNotes.textFrame.setText(`Stable slide ID: ${ctx.entry.key}\n${body}\n\n${srcNotes}`);}
function copyTextStyle(ctx,id){const r=ref(ctx,id);return r.element.paragraphs?.[0]?.runs?.[0]||{};}

// The inherited graph area remains left of the explanation; both axes use 0.45px/£m.
const X=v=>160+.45*v, Y=v=>555-.45*v;
function aeBase(ctx,heading,sideTitle,body,prompt,{equality=true,old=true,next=false,nextIntercept=150}={}){
 ctx.aeHasNext=next;
 title(ctx,heading);
 setline(ctx,114,160,555,560,555);
 setline(ctx,115,160,555,160,190);
 if(equality) setline(ctx,116,X(0),Y(0),X(800),Y(800),C.ink,2);else hideLine(ctx,116);
 if(old) setline(ctx,117,X(0),Y(100),X(800),Y(700),C.gray,3.5);else hideLine(ctx,117);
 if(next) setline(ctx,118,X(0),Y(nextIntercept),X(800),Y(nextIntercept+600),C.blue,3.5);else hideLine(ctx,118);
 hideLine(ctx,119);hideLine(ctx,120);
 pos(text(ctx,12,'Planned aggregate expenditure, AE (£m)'),80,140,555,36);
 pos(text(ctx,13,'National income / output, Y (£m)'),215,594,425,36);
 pos(text(ctx,14,equality?'AE = Y':' '),485,170,145,28);
 pos(text(ctx,15,old?'AE₀':''),530,Y(700)-9,85,30);
 pos(text(ctx,16,next?(nextIntercept===50?'AE₂':'AE₁'):''),530,Y(nextIntercept+600)-12,85,30);
 text(ctx,17,'');text(ctx,18,'');
 text(ctx,19,sideTitle);text(ctx,20,body);text(ctx,21,prompt);
 for(const v of [0,200,400,600,800]){
  newLine(ctx,X(v),555,X(v),561,C.muted,1);
  label(ctx,String(v),X(v)-25,565,50,27,C.muted,18,'center');
  if(v){newLine(ctx,154,Y(v),160,Y(v),C.muted,1);label(ctx,String(v),104,Y(v)-14,44,28,C.muted,18,'right');}
 }
}
function project(ctx,output,expenditure,{color=C.blue,name='',horizontal=true}={}){
 newLine(ctx,X(output),Y(0),X(output),Y(expenditure),color,1.2,'dashed');
 if(horizontal)newLine(ctx,X(0),Y(expenditure),X(output),Y(expenditure),color,1.2,'dashed');
 dot(ctx,X(output),Y(expenditure),color);
 if(name&&!(name==='E₀'&&ctx.aeHasNext))label(ctx,name,X(output)-53,Y(expenditure)-35,42,28,color===C.gray?C.muted:color,20,'right',true);
}
function verticalGap(ctx,output,lo,hi,txt){
 const x=X(output),top=Y(hi),bottom=Y(lo);
 newLine(ctx,x,top,x,bottom,C.coral,3);newLine(ctx,x-5,top,x+5,top,C.coral,2);newLine(ctx,x-5,bottom,x+5,bottom,C.coral,2);
 label(ctx,txt,x+12,bottom+5,130,28,C.coral,20,'left',true);
}
function horizontalGap(ctx,a,b,txt){
 const y=636;
 newLine(ctx,X(a),y,X(b),y,C.blue,2);newLine(ctx,X(a),y-5,X(a),y+5,C.blue,2);newLine(ctx,X(b),y-5,X(b),y+5,C.blue,2);
 label(ctx,txt,160,646,430,26,C.blue,20,'center',true);
}
function setTable(ctx,rows){
 const tab=[...ctx.refs.values()].find(x=>x.element.kind==='table').shape;
 for(let r=0;r<rows.length;r++)for(let c=0;c<rows[r].length;c++)tab.cells.set(r,c,String(rows[r][c]));
}

for(const entry of map.outputSlides){
 const ctx=context(entry);
 const footer=[...ctx.refs.values()].find(r=>r.element.bbox?.[0]===1160 && r.element.bbox?.[1]===678);
 if(footer)text(ctx,footer.element.id,String(entry.outputSlide).padStart(2,'0'));
 manifest.push({id:entry.key,slideNumber:entry.outputSlide,slideId:ctx.slide.id,sourceSlide:entry.sourceSlide});
}
current.get('original-02').slide.speakerNotes.append('\n[Sources]\nRoad-construction photograph: inherited from the user’s manual deck; originally reused from 9.1.1 Multiplier process SHARE.pptx in previous-lesson-materials.\n[/Sources]');

{
 const c=current.get('as-bridge');title(c,'Use AS ideas to build a new diagram');
 text(c,6,'ALREADY LEARNED AT AS');
 text(c,7,'• Spending creates income for others.\n• I, G and X are injections; S, T and M are leakages.\n• AD/AS links real output to the price level.');
 text(c,9,'NEW IN THE INCOME APPROACH');
 text(c,10,'AE = total planned spending at each income level.\n\nHold prices fixed; assume firms can produce more.');
 notes(c,'AS 4.2 explicitly excludes the multiplier and propensities; these were introduced in Lesson 1, not assumed from AS. Retrieve the components of AD orally: C+I+G+(X−M). Define AE as planned purchases of the economy’s output at each income level. In this simplified model prices are fixed and spare resources allow output to respond. Do not start with a finished Keynesian cross. Allow 1–2 minutes to check the AS bridge.');
}
{
 const c=current.get('ae-axes');
 aeBase(c,'First read the two axes','WHAT DOES ONE POINT MEAN?',
  '• Y = £400m: the value of current output and the income it generates.\n• AE = £350m: planned purchases of that output.\n• Both are flows measured per year.',
  'This point does not yet show equilibrium.',{equality:false,old:false});
 project(c,400,350,{name:'A'});label(c,'350',108,Y(350)-14,40,28,C.blue,18,'right');
 notes(c,'Define aggregate = total and expenditure = spending. First ask learners to read A horizontally (400) and vertically (350); do not yet infer adjustment. Explain why the value of output creates incomes: wages, rent, interest and profit. The vertical axis is planned expenditure, NOT the price level and NOT actual measured expenditure including unplanned stock changes. It can differ from current output. Both axes are £m per year; at fixed prices the output/income change represents a real output change. This is not a GDP income-measurement method; it is a model of income determination.');
}
{
 const c=current.get('ae-equality-line');
 aeBase(c,'The 45° line is a line of equal values','AN EQUALITY GUIDE — NOT AS',
  '• Every point on this line has AE = Y.\n• At B: spending of £400m equals output of £400m.\n• It is 45° because the two axes use the same scale.',
  'Check: where would AE = Y = £600m lie?',{old:false});
 project(c,400,400,{name:'B'});label(c,'45°',185,520,55,28,C.ink,18);
 notes(c,'Draw only the equality line after the axes. Ask students to generate the equal-value pairs (200,200), (400,400) and (600,600). The answer to the check is the point further up the same line at (600,600). The line is a reference condition, not a spending rule and not an AS curve. It does not mean that every actual economy is automatically in equilibrium. The AE line is still missing; only its intersection with this reference line will identify equilibrium.');
}
{
 const c=current.get('ae-spending-table');title(c,'Build planned spending from simple numbers');
 text(c,5,'Closed economy, no government: C = 0.75Y and I = £100m.');
 setTable(c,[['Y (£m)','C = 0.75Y (£m)','I (£m)','AE = C + I (£m)'],['0','0','100','100'],['200','150','100','250'],['400','300','100','400'],['600','450','100','550'],['800','600','100','700']]);
 text(c,7,'For each extra £200m of income, planned spending rises by £150m.');
 notes(c,'All data are teacher-created. Read C=0.75Y as a simple rule: households plan to consume 75p from every £1 of income. This deliberately omits autonomous consumption; do not assume general C=a+bY theory from 9.1.2. I is investment expenditure on capital goods, not buying financial assets. Assume I is fixed at100 at each income level. Since no government or foreign trade is included, AE=C+I. Ask students to compute the400 and600 rows before pointing to the answers. Explain that the rows are possible income levels, not successive years. Prices and MPC are fixed.');
}
{
 const c=current.get('ae-spending-line');
 aeBase(c,'The AE line rises with income','READ THE INTERCEPT AND SLOPE',
  '• At Y = 0, planned AE is £100m: investment is still £100m.\n• More income leads to more consumption.\n• ΔAE / ΔY = 150 / 200 = 0.75.',
  'Here AE = £100m + 0.75Y.',{equality:false});
 pos(text(c,15,'AE'),530,Y(700)-9,85,30);
 project(c,200,250,{name:'',horizontal:false});project(c,400,400,{name:'',horizontal:false});
 newLine(c,X(200),Y(250),X(400),Y(250),C.blue,2,'dashed');
 newLine(c,X(400),Y(250),X(400),Y(400),C.blue,2,'dashed');
 label(c,'+200',X(200)+15,Y(250)+8,78,28,C.blue,18);
 label(c,'+150',X(400)+12,Y(330)-12,70,28,C.blue,18);
 label(c,'100',106,Y(100)-14,42,28,C.gray,18,'right');
 notes(c,'Plot the table pairs on the same axes as the preceding slides. Use the horizontal 200 and vertical150 step to define slope, not merely the visual angle. The intercept100 is investment in this example, not autonomous consumption. The slope is MPC only because we assumed a closed economy, no government, C=0.75Y and fixed investment. In a richer economy imports and taxes affect the induced domestic spending slope. Do not generalise this simplified slope unconditionally. Ask: why does AE rise by less than Y? Answer: some extra income is saved.');
}
{
 const c=current.get('ae-equilibrium');
 aeBase(c,'The intersection gives equilibrium income','PLANNED SPENDING = OUTPUT',
  '• At E₀, the AE line meets the 45° line.\n• Y₀ = £400m and AE = £400m.\n• Firms sell what they planned to produce; there is no unplanned stock change.',
  'Read down to the income axis: Y₀ = £400m.');
 project(c,400,400,{name:'E₀'});
 notes(c,'Add the equality line to the AE line, holding the axes and data unchanged. Trace E0 to BOTH axes. Ask students to verify AE=100+0.75×400=400. Equilibrium means no tendency for output to change within this model, not necessarily full employment. Save inflationary/deflationary gap analysis for9.1.3. Explain stocks/inventories simply as goods firms have produced but not yet sold. Planned stocks can exist; it is the unplanned change that signals disequilibrium.');
}
{
 const c=current.get('ae-below-equilibrium');
 aeBase(c,'Below equilibrium, firms increase output','AT Y = £200m, AE = £250m',
  '• Buyers plan to spend £50m more than current output.\n• Stocks run down unexpectedly; orders may be unfilled.\n• Firms raise production, creating more income.',
  'Predict: which way will Y move? Why?');
 project(c,200,250,{name:'',horizontal:false});verticalGap(c,200,200,250,'£50m');
 dot(c,X(400),Y(400),C.ink);label(c,'E₀',X(400)-53,Y(400)-35,42,28,C.ink,20,'right',true);
 notes(c,'Before explaining, ask for AE atY200 using the table/rule. Answer250. Trace the vertical gap between the AE schedule and equality line at this SAME income. Actual expenditure still equals output in national accounts when unplanned inventory investment is included; planned purchases are larger here. Producers meet some demand by drawing down stocks and respond by expanding production. Extra output generates incomes which induce consumption, but saving prevents endlessly accelerating expansion. The direction is toward400, not necessarily an immediate one-step jump.');
}
{
 const c=current.get('ae-above-equilibrium');
 aeBase(c,'Above equilibrium, firms reduce output','AT Y = £600m, AE = £550m',
  '• Buyers plan to spend £50m less than current output.\n• Unsold goods add to stocks unexpectedly.\n• Firms cut production, reducing income.',
  'Check: why is £600m not equilibrium?');
 project(c,600,550,{name:'',horizontal:false});verticalGap(c,600,550,600,'£50m');
 dot(c,X(400),Y(400),C.ink);label(c,'E₀',X(400)-53,Y(400)-35,42,28,C.ink,20,'right',true);
 notes(c,'Let students predict before revealing the stock mechanism. AtY600, C450+I100 gives plannedAE550. Unsold output50 increases inventories unintentionally, so firms reduce production. The check answer must mention planned spending below output, not simply that the point is on the right. Compare to the previous slide: above/below equilibrium describes the income level on the horizontal axis; AE above/below the equality line describes the planned-spending gap. Return to400.');
}
{
 const c=current.get('ae-injection-shift');
 aeBase(c,'An injection shifts AE up at every income','INVESTMENT: £100m → £150m',
  '• The new £50m of I is autonomous: it does not depend on Y.\n• At every income, AE is now £50m higher.\n• At the old Y₀ = £400m, new AE is £450m.',
  'The vertical £50m gap is ΔI — not ΔY.',{next:true});
 project(c,400,400,{name:'E₀',color:C.gray,horizontal:false});
 dot(c,X(400),Y(450),C.blue);verticalGap(c,400,400,450,'ΔI = 50');
 notes(c,'Keep Y at400 while adding the second AE line. Ask: what changed before any extra income was earned? Only plannedI rose50. NewAE=150+0.75Y. Compare old and new AE at any common Y: the vertical gap is always50, hence a parallel shift. MPC is unchanged. Do not label a new income equilibrium yet. The initial50 spending can prompt firms to expand, creating the first extra income round. Distinguish an autonomous shift caused by I from income-induced consumption represented by movement along the NEW AE line.');
}
{
 const c=current.get('ae-spending-rounds');title(c,'Extra income creates further spending');
 text(c,5,'The £50m investment increase starts the process. MPC stays at 0.75.');
 setTable(c,[['Round','Extra income (£m)','Re-spent next round (£m)','Extra saving (£m)'],['Initial','50.00','37.50','12.50'],['2','37.50','28.13','9.38'],['3','28.13','21.09','7.03'],['4','21.09','15.82','5.27'],['All rounds','200.00','150.00','50.00']]);
 text(c,7,'ΔY = 50 + 37.50 + 28.125 + … = £200m');
 notes(c,'Values displayed to2decimal places; calculations use unrounded values. Draw the link back to the Lesson1 rounds table. These figures are CHANGES in income/spending, not the level of national income. Households spend75% of each new income round; the remaining25% is saved. Total induced extraC150 plus initialΔI50 equals totalΔY200. Output does not jump instantly from400 to600. The income-induced C is movement alongAE1; do not shiftAE again for that same response (which would double-count it). Ask learners to predict the second-round consumption before reading the table.');
}
{
 const c=current.get('ae-new-equilibrium');
 aeBase(c,'The final income rise is larger than the injection','NEW EQUILIBRIUM AT E₁',
  '• E₁ lies where AE₁ = Y = £600m.\n• ΔY = 600 − 400 = £200m.\n• k = 1 / (1 − 0.75) = 4.\n• ΔY = 4 × £50m = £200m.',
  '£50m of extra I + £150m of extra C = £200m.',{next:true});
 project(c,400,400,{name:'E₀',color:C.gray,horizontal:false});project(c,600,600,{name:'E₁',horizontal:false});
 verticalGap(c,400,400,450,'ΔI = 50');horizontalGap(c,400,600,'Horizontal change: ΔY = £200m');
 notes(c,'Trace newE1 down to600. Ask students to give the LEVEL of final income (600), then the CHANGE (200), then the INITIAL injection (50). Explicitly contrast verticalΔI and horizontalΔY. ValidateAE1=150+0.75×600=600. On these equal scales horizontal gap90px is4times vertical22.5px. Both AE lines have slope0.75, flatter than the equality line. This is a fixed-price/spare-capacity model, not a claim that any economy must increase real output by the full calculated amount.');
}
{
 const c=current.get('ae-injections-leakages');title(c,'AE = Y is also injections = leakages');
 text(c,6,'BEFORE THE INJECTION');text(c,7,'Y = £400m\nC = £300m\nS = Y − C = £100m\n\nI = S = £100m');
 text(c,9,'AT THE NEW EQUILIBRIUM');text(c,10,'Y = £600m; C = £450m\nS = £150m; I = £150m\n\nExtra S = £50m\nExtra I = £50m');
 notes(c,'Bridge the income-expenditure diagram to the AS circular-flow equilibrium condition. In the closed economy without government, Y=C+S and plannedAE=C+I. EquilibriumY=AE means C+S=C+I, thereforeS=I. Distinguish LEVELS I=S=150 at final equilibrium from CHANGES ΔI=ΔS=50 after an initial equilibrium at100. Extra saving0.25×200=50 matches the injection. In an open economy with government the equivalent condition is I+G+X=S+T+M; introduce orally using the familiar AS leakages, without another new graph. Ask students why saving has not risen by200.');
}
{
 const c=current.get('ae-draw-and-explain');title(c,'Your turn: draw a fall in investment');
 text(c,6,'TEACHER-CREATED PRACTICE');text(c,7,'Start again at Y₀ = £400m.\nMPC = 0.75 and I = £100m.\n\nInvestment falls to £50m.\nPrices remain fixed.');
 text(c,9,'DRAW, CALCULATE, EXPLAIN');text(c,10,'1  Draw and label both AE lines.\n2  Find k, ΔY and the new Y.\n3  Explain firms’ response at the old income.');
 notes(c,'Allow students to construct the axes, equality line, original and lower AE lines on paper. Keep the next answer slide hidden until they have predicted the direction. Scaffold only if needed: oldAE100+0.75Y; newAE50+0.75Y. Answers on the following slide: k4, ΔI−50, ΔY−200, newY200. At oldY400 newAE350, so unexpected stocks rise50 and output falls. A strong answer distinguishes an initial fall in investment from induced falls in consumption and labels the vertical/horizontal gaps separately. This is teacher-created, not an examination question.');
}
{
 const c=current.get('ae-negative-multiplier');
 aeBase(c,'Answer: income falls from £400m to £200m','THE MULTIPLIER WORKS BOTH WAYS',
  '• New AE₂ = £50m + 0.75Y.\n• At the old Y₀, AE = £350m: stocks build up and output falls.\n• k = 4; ΔY = 4 × (−£50m) = −£200m.',
  'New Y = £400m − £200m = £200m.',{next:true,nextIntercept:50});
 project(c,400,400,{name:'E₀',color:C.gray,horizontal:false});project(c,200,200,{name:'E₂',horizontal:false});
 verticalGap(c,400,350,400,'ΔI = −50');horizontalGap(c,200,400,'Income falls by £200m: 400 → 200');
 notes(c,'Reveal after the independent draw. Check: (1) correct axes; (2) equality line through origin; (3) two parallelAE lines with lower new intercept; (4) equilibrium income200, below400; (5) contraction chain. The multiplier remains positive4; the income change is negative because the injection change is negative. At new equilibriumC150 plusI50 equalsY200, and saving50 equals investment50.');
}

function adasBase(c,stage){
 const sx=v=>100+v,sy=v=>550-v;
 setline(c,113,100,550,620,550);setline(c,114,100,550,100,190);
 setline(c,115,140,sy(24),560,sy(318),C.coral,4);
 setline(c,116,140,sy(210),520,sy(20),C.gray,3);
 if(stage>=1)setline(c,117,140,sy(255),520,sy(65),C.blue,3);else hideLine(c,117);
 if(stage>=2)setline(c,118,140,sy(300),520,sy(110),C.green,3);else hideLine(c,118);
 hideLine(c,119);
 pos(text(c,12,'Price level'),65,142,230,32);pos(text(c,13,'Real GDP'),445,594,175,32);
 pos(text(c,14,'SRAS'),565,211,85,30);
 pos(text(c,15,'AD₀'),535,511,72,30);pos(text(c,16,stage>=1?'AD₁':''),535,466,72,30);pos(text(c,17,stage>=2?'AD₂':''),535,421,72,30);
 // SRAS: p=.7q−4. AD: p=a−.5q. Exact intersections provide labelled projections.
 const levels=[];
 for(let j=0;j<=stage;j++){
  const q=(234+45*j)/1.2,p=.7*q-4;const color=j===0?C.muted:j===1?C.blue:C.green;
  newLine(c,sx(q),550,sx(q),sy(p),color,1.2,'dashed');
  newLine(c,100,sy(p),sx(q),sy(p),color,1.2,'dashed');
  levels.push({q,p,color,j});
 }
 for(const a of levels){dot(c,sx(a.q),sy(a.p),a.color);label(c,`Y${['₀','₁','₂'][a.j]}`,sx(a.q)-22,560,45,28,a.color,20,'center');label(c,`P${['₀','₁','₂'][a.j]}`,65,sy(a.p)-14,30,28,a.color,20);}
}
{
 const c=current.get('adas-recall');adasBase(c,0);title(c,'Return to the familiar AS-level AD/AS model');
 text(c,18,'CHECK THE AXES AGAIN');text(c,19,'• The vertical axis is now the price level, not AE.\n• AD₀ slopes down; SRAS slopes up.\n• At the intersection, read P₀ to the left and Y₀ below.');
 text(c,20,'The 45° line is not part of this model.');
 notes(c,'Use the AS4.3 model as retrieval, not as a new prerequisite. Ask whyAD slopes down with respect to price level and whySRAS slopes up before progressing. Do not claim that the risingAE schedule is anAD curve. The same spending categories C,I,G,(X−M) are involved, but what varies is different: price level inAD/AS, income at fixed prices inAE. The labelled graph is schematic, not numerical; it does not reuse the£m scales of theAE example.');
}
{
 const c=current.get('adas-initial-injection');adasBase(c,1);title(c,'First, the autonomous injection raises AD');
 text(c,18,'ISOLATE THE FIRST CHANGE');text(c,19,'• Higher I increases demand at each price level: AD₀ → AD₁.\n• With upward-sloping SRAS, output and the price level rise.\n• The extra output creates income.');
 text(c,20,'Next: what do households do with extra income?');
 notes(c,'Show only one additionalAD line so students can trace the initial injection and read both new outputs. E1 illustrates the first-stage effect before the full induced spending response, not a claim of a separate lasting equilibrium. Ask students to verbalise Y0→Y1 andP0→P1. The prediction answer: spend part and leak/save part. The exact magnitudes are not inferred from this schematicAD/AS drawing.');
}
{
 const c=current.get('adas-multiplier-outcome');adasBase(c,2);title(c,'Further spending raises AD again');
 text(c,18,'NOW ADD THE MULTIPLIER');text(c,19,'• Extra income induces consumption, shifting AD further to AD₂.\n• AD₂ summarises the later spending rounds.\n• Rising prices can limit the increase in real output.');
 text(c,20,'The fixed-price multiplier is not a guaranteed rise in real GDP.');
 notes(c,'Use the coursebookFigure41.5 spending-round representation:AD2 summarises all later induced-spending rounds, not exactly one more round or a measured equal-sized shift. We show just3curves for readability. Explain the representation difference carefully: income-induced consumption is movement along the newAE schedule in the income-expenditure model; the book represents the rounds as furtherAD shifts in price/output space. Never add shifts toAE for this same inducedC. If prices rise with upward-slopingSRAS, the fixed-price resultk×ΔJ should not be asserted as a guaranteed real GDP change. More spare capacity/more elasticAS allows more output; capacity constraints raise prices more. This uses AS knowledge only: defer detailed output-gap and accelerator evaluation. Check: name the vertical axis in each model and one reason real output may rise by less than the fixed-price calculation.');
}
{
 const c=current.get('core-feedback');title(c,'Past-paper feedback: definition and leakages');
 text(c,5,'1  D');text(c,6,'Definition');text(c,7,'The initial injection leads to a larger final increase in GDP.');
 text(c,9,'2  B');text(c,10,'MRT falls');text(c,11,'MPW falls, so k = 1/MPW rises.');
 text(c,13,'LINK');text(c,14,'Spending rounds');text(c,15,'Smaller leakages leave more income to be spent in the next round.');
 notes(c,'Feedback for9708/32/M/J/25Q15 (D) and9708/31/M/J/26Q16 (B). The consumption-function MCQ9708/32/F/M/26Q15 has moved to the later-study appendix because it requires the general function in9.1.2. Do not assess that equation yet.\n[Sources]\nOriginal question papers and mark schemes in the local past-paper folder:9708_s25_qp_32,9708_s25_ms_32,9708_s26_qp_31,9708_s26_ms_31.\n[/Sources]');
}
{
 const c=current.get('later-consumption-question');title(c,'Past paper (study later): 9708/32/F/M/26 Q15');
 c.slide.speakerNotes.append('\nPrerequisite decision: defer until9.1.2, after autonomous consumption and the general consumption functionC=a+bY. AnswerD: MPC0.8, APC=10000/Y+0.8, greater thanMPC for positiveY. Question stem and all options retained verbatim.');
}
text(current.get('original-41'),16,'Use familiar AS policy tools; return for the full A Level policy evaluation.');
text(current.get('original-42'),8,'AS AD/AS is familiar. First add output gaps and extended fiscal-policy evaluation.');
text(current.get('original-43'),16,'Return after output gaps and A Level policy evaluation, including crowding out and time lags.');
text(current.get('original-44'),8,'First learn induced investment, the accelerator and deflationary gaps.');
{
 const c=current.get('later-study-guide');title(c,'Return to these questions after the prerequisites');
 text(c,8,'1  CONSUMPTION');text(c,9,'After 9.1.2: C = a + bY, autonomous consumption and APC versus MPC.');
 text(c,10,'2  OUTPUT GAPS');text(c,11,'After 9.1.3: apply familiar AS AD/AS to inflationary and deflationary gaps.');
 text(c,12,'3  ACCELERATOR');text(c,13,'After 9.1.2: induced investment and the accelerator principle.');
 text(c,14,'4  EVALUATION');text(c,15,'Then use A Level policy analysis to evaluate the longer essays.');
 text(c,16,'Core Lessons 1–2 end on slide 53. Slides 54–60 are for later study.');
 notes(c,'Syllabus-based prerequisite boundary, not a claim that AS students have never studied policy orAD/AS. They have learned the AS tools. The formal consumption function, accelerator and output gaps are later9.1.2–9.1.3 content, while developed policy evaluation is taught in later A Level lessons. Core diagram building is25–41. Suggested pacing: use these as cumulative clicks, not seventeen separate lecture topics; allow about18–22minutes including the drawing check. Use selected core past-paper questions in class and retain remaining practice for consolidation.');
}

// Save stable names on programmatically maintained elements without touching other content.
for(const entry of map.outputSlides){
 const c=current.get(entry.key);
 if(entry.mode!=='preserve')for(const [id,{shape}] of c.refs)shape.name=`${entry.key}.inherited-${id}`;
}
await fs.mkdir(path.dirname(OUT),{recursive:true});
await fs.mkdir(path.join(TMP,'iteration-preview'),{recursive:true});
await fs.mkdir(path.join(TMP,'iteration-layout'),{recursive:true});
const selected=process.argv.includes('--all')?map.outputSlides:map.outputSlides.filter(e=>e.mode!=='preserve'||e.key==='later-consumption-question'||[41,42,43,44].includes(e.sourceSlide));
for(const e of selected){
 const s=current.get(e.key).slide,stem=`slide-${String(e.outputSlide).padStart(2,'0')}`;
 const png=await presentation.export({slide:s,format:'png',scale:1});
 await fs.writeFile(path.join(TMP,'iteration-preview',`${stem}.png`),new Uint8Array(await png.arrayBuffer()));
 await fs.writeFile(path.join(TMP,'iteration-layout',`${stem}.json`),await (await s.export({format:'layout'})).text());
}
const pptx=await PresentationFile.exportPptx(presentation);await pptx.save(OUT);
// Theme preservation exception required by the Presentations skill: restore ONLY
// the original theme parts after artifact export. All slide edits use artifact-tool.
const originalPackage=await JSZip.loadAsync(await fs.readFile(path.join(SOURCE,'base/manual-20260831.pptx')));
const finalPackage=await JSZip.loadAsync(await fs.readFile(OUT));
for(const name of Object.keys(originalPackage.files))if(/^ppt\/theme\/theme\d+\.xml$/.test(name))finalPackage.file(name,await originalPackage.file(name).async('uint8array'));
await fs.writeFile(OUT,await finalPackage.generateAsync({type:'nodebuffer',compression:'DEFLATE'}));
await fs.writeFile(path.join(SOURCE,'slide-ids.json'),JSON.stringify(manifest,null,2));
await fs.writeFile(path.join(TMP,'authoring-inspect.ndjson'),(await presentation.inspect({kind:'slide,textbox,shape,notes,table',maxChars:1000000})).ndjson);
console.log(JSON.stringify({output:OUT,slides:presentation.slides.items.length,rendered:selected.length}));
