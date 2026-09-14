"""Author the two 4.4.3 continuations. Sources checked against original PDFs, 14 Sep 2026."""
from pathlib import Path
import json

ROOT=Path(__file__).resolve().parents[2]
D=ROOT/'apps/library/lessons/unit-4-government/4-4-supply-side-policy'

PAPERS={
 'education':dict(ref='2024ON-21 Q3(d)',question='Discuss whether or not improving education can help a government achieve its macroeconomic aims.',marks=8,qp='0455_w24_qp_21',qpPage=4,ms='0455_w24_ms_21',msPage=18,
   extract='Accepted points: skills attract investment, raise demand and growth; easier employment; lower average costs and inflation; exports; wider access to well-paid work. Limits: extra government spending may raise demand and inflation; skilled workers may emigrate; too few suitable jobs; access restricted to higher incomes may increase inequality.'),
 'trade':dict(ref='2023MJ-21 Q3(c)',question='Analyse how an increase in labour productivity in a country can increase a surplus on the current account of its balance of payments.',marks=6,qp='0455_s23_qp_21',qpPage=4,ms='0455_s23_ms_21',msPage=15,
   extract='Accepted links: output per worker rises; average costs and prices may fall; quality may improve; export competitiveness and revenue may rise; domestic goods may replace imports, reducing import expenditure. Credit coherent analysis; do not invent one compulsory mark per teaching step.'),
 'budget':dict(ref='2025FM-22 Q5(d)',question='Discuss whether supply-side policy measures will reduce a government’s budget deficit.',marks=8,qp='0455_m25_qp_22',qpPage=5,ms='0455_m25_ms_22',msPage=27,
   extract='Accepted points: productivity, growth and employment may raise direct and indirect tax revenue; privatisation brings sale revenue and may reduce support for state firms. Limits: education, training and infrastructure cost money; tax cuts may reduce revenue; profitable state firms provide profit income that is lost after sale. The deficit may rise in the short run and fall in the long run. Confusing the budget deficit with a balance of payments deficit fails to analyse this question.'),
 'inflation':dict(ref='2023MJ-21 Q3(d)',question='Discuss why some countries may experience lower inflation in the future and some may not.',marks=8,qp='0455_s23_qp_21',qpPage=4,ms='0455_s23_ms_21',msPage=16,
   extract='Accepted reasons for lower inflation: technology lowers costs; education and healthcare raise productivity; international competition; slower wage growth; policies that reduce demand. Opposing reasons: optimism and spending; more government spending; lower interest rates and higher total demand; scarce raw materials; rising energy and food prices.')
}
def sources(*keys):
 return [dict(label='Paper 2',**PAPERS[k]) for k in keys]
def section(n,t,z): return dict(type='section',eyebrow=f'Part {n}',title=t,zhTitle=z)
def written(t,rows,**kw): return dict(dict(type='classificationTask',layout='ssp-written',eyebrow='Check',title=t,items=[dict(text=q,answer=a) for q,a in rows]),**kw)
def flow(t,z,rows,keys=('education',)):
 return dict(type='flow',mode='fillBlanks',eyebrow='Learn',title=t,zhTitle=z,nodes=[[dict(text=t,answer=a,zh=z) for t,a,z in rows]],sources=sources(*keys))
def cards(t,z,rows,keys=('education',),**kw):
 return dict(dict(type='cards',eyebrow='Learn',title=t,zhTitle=z,cards=[dict(title=a,body=b) for a,b in rows],partialReview=['.cardgrid > .card'],sources=sources(*keys)),**kw)
def exam(k,prompt,eyebrow='Exam practice'):
 p=PAPERS[k];return dict(type='exam',eyebrow=eyebrow,title=p['question']+f" [{p['marks']}]",prompt=prompt,partialReview=False,sources=sources(k),notes='Allow an independent written attempt before the model. The source controls preserve the exact question and original scheme. This is an original question; the following prose is a teacher model, not an official answer.')
def model(k,paras,part='Teaching model'):
 p=PAPERS[k];return dict(type='modelAnswer',eyebrow=part,title=p['question']+f" [{p['marks']}]",paragraphs=paras,answer='\n\n'.join(paras),partialReview=['.modelAnswerParagraphs > p'],links=['average costs','export revenue','import expenditure','productivity','tax revenue','government spending','suitable jobs','short run','long run'],showLinkChips=False,sources=sources(k))
def objectives(e,z):return dict(type='outcomes',eyebrow='Objectives',title='By the end, you can',bullets=e,zhBullets=z)
def hero(n,t,z,k,photo):return dict(type='hero',layout='ssp-hero',eyebrow=f'Lesson {n} · 4.4.3',title=t,zhTitle=z,kicker=k,visual='__PHOTO_'+photo+'__')
def summary(rows):return cards('Summary','总结',rows,partialReview=False)

l4=[
 hero(4,'Effects of supply-side policy','供给侧政策的影响','Growth, employment, prices and competitiveness','portTerminal'),
 written('Recall: policies and incentives',[
  ('Name two interventionist policies.','Education and training; infrastructure spending. Healthcare and subsidies are also valid.'),
  ('How can a corporation tax cut encourage investment?','Firms keep more profit, leaving more funds to buy capital goods.'),
  ('What does an outward PPC shift show?','An increase in productive capacity: more possible output with improved resources or technology.')],eyebrow='Recall'),
 objectives(['Explain effects on growth and employment.','Explain lower costs and international competitiveness.','Develop a six-mark past-paper answer.'],['解释对经济增长与就业的影响。','解释成本下降与国际竞争力。','完成有分析深度的六分真题。']),
 section(1,'Productivity, growth and employment','生产率、增长与就业'),
 cards('Skills improve production across the economy','技能改善整个经济体的生产',[
  ('1. The same workers and hours','Training improves production in food, machinery and transport.'),
  ('2. More output from each worker','Each sector produces more with unchanged worker-hours.'),
  ('3. Higher productive capacity','The economy can produce more goods and services.')],layout='ssp-capacity-scene',partialReview=False,
  notes='Teacher-created illustration, not measured data. Three sectors represent the economy; their different outputs are not added as physical units. Hold worker-hours and other inputs constant. Ask what changes before advancing. Distinguish possible output from actual sales. The diagram controls are reversible.'),
 flow('Effect on economic growth','对经济增长的影响',[
  ('Skills and productivity __________','increase','技能与生产率提高'),
  ('Productive __________ rises','capacity','生产能力提高'),
  ('Real output can __________','increase','实际产出能够增加')]),
 cards('Higher capacity allows more output','生产能力提高使更多产出成为可能',[],layout='ppc-teaching',partialReview=False,
  visual=dict(type='diagram',kind='ppc',mode='rightShift',title='Productive capacity increases',caption='An outward shift from PPC1 to PPC2.',checklist=False),
  ppcTeaching=dict(mode='capacity',steps=[
   dict(title='Two types of output',text='Capital goods and consumer goods are quantities of output.',zh='资本品与消费品：两个轴都表示产量。',takeaway='The axes do not show prices.'),
   dict(title='PPC1 shows existing capacity',text='The frontier shows maximum possible output combinations.',zh='PPC1表示现有最大产出组合。',takeaway='Current resources and technology set this boundary.'),
   dict(title='Better resources shift the PPC outwards',text='Skills, capital or technology raise the economy’s productive capacity.',zh='技能、资本或技术改善，生产能力提高。',takeaway='PPC1 → PPC2: more output becomes possible.'),
   dict(title='More consumer goods at the same capital-goods output',text='Trace the horizontal guide and compare the two possible outputs.',zh='沿水平辅助线，比较消费品产量。',takeaway='Demand still affects how much firms actually produce.')]),
  notes='Ask students to draw and label both axes and PPC1 → PPC2. Use one explanation: better resources increase productive capacity. Retain the outward-shift scope; do not teach movement towards an unchanged frontier.'),
 written('Explain why capacity is not guaranteed growth',[
  ('New equipment raises capacity, but total spending is weak. Must real GDP rise by the same amount?','No. Firms may lack buyers, so actual production may rise less than productive capacity.')]),
 flow('Effect on unemployment','对失业的影响',[
  ('Training improves __________','skills','培训提高技能'),
  ('Workers can move between __________','occupations','劳动者更能转换职业'),
  ('More workers fill suitable __________','vacancies','填补适合的职位空缺'),
  ('Structural unemployment may __________','fall','结构性失业可能减少')]),
 written('Explain the employment condition',[
  ('A country trains more mechanics while employers need nurses. Explain the likely limit.','The new skills do not match vacancies. Training may do little to reduce structural unemployment.')]),
 section(2,'Prices and international competitiveness','价格与国际竞争力'),
 cards('More output spreads the same costs','更多产出分摊相同成本',[
  ('Before training','¥1,200 total cost ÷ 100 units = ¥12 per unit.'),
  ('After training','¥1,200 total cost ÷ 150 units = ¥8 per unit.')],layout='ssp-costs',lead='Total cost stays ¥1,200; output rises from 100 to 150 units. What is the new average cost?',notes='Illustrative calculation, holding total cost constant and excluding the one-off training cost. Ask students to calculate the second average cost before reveal. A firm illustrates the unit-cost link; sustained lower inflation requires effects across the economy, not one price change.'),
 flow('Effect on price stability','对价格稳定的影响',[
  ('Economy-wide productivity __________','rises','全经济的生产率提高'),
  ('Average production costs may __________','fall','平均生产成本可能下降'),
  ('Cost-push inflation pressure __________','eases','成本推动型通胀压力缓解')],keys=('education','inflation')),
 written('Distinguish lower inflation from falling prices',[
  ('Inflation falls from 6% to 2%. Explain what happens to the general price level.','Prices still rise, but more slowly. Lower inflation does not mean that past price increases are reversed.')]),
 cards('When productivity gains do not lower inflation','生产率提高未必降低通胀',[
  ('Rising input costs 投入成本上升','Higher energy or raw-material prices may outweigh the saving from higher productivity.'),
  ('Rising total demand 总需求上升','Spending may grow faster than productive capacity, maintaining upward pressure on prices.')],keys=('inflation',)),
 flow('Effect on export revenue','对出口收入的影响',[
  ('Average costs may __________','fall','平均成本可能下降'),
  ('Export prices become more __________','competitive','出口价格更有竞争力'),
  ('Foreign demand may __________','rise','国外需求可能增加'),
  ('Export revenue may __________','increase','出口收入可能增加')],keys=('trade',)),
 flow('Effect on import expenditure','对进口支出的影响',[
  ('Domestic goods become cheaper or __________','better','本国产品更便宜或质量更高'),
  ('Consumers switch from __________','imports','消费者转向本国产品'),
  ('Import expenditure may __________','fall','进口支出可能下降')],keys=('trade',)),
 cards('Effect on the current account','对经常账户的影响',[
  ('Exports 出口','Higher export revenue increases money received from abroad.'),
  ('Imports 进口','Lower import expenditure reduces money paid abroad.'),
  ('Current account 经常账户','Together, these may reduce a deficit or increase a surplus, other items unchanged.')],keys=('trade',),notes='This is the trade component of the current account. The current account also contains primary and secondary income; do not equate it with the government budget or teach a full Unit 6 taxonomy here. Lower export prices need a sufficient quantity response for revenue to rise. More investment may initially require imported machinery.'),
 written('Explain why higher exports are not enough',[
  ('Export revenue rises by ¥20m; import expenditure rises by ¥30m. Other current-account items are unchanged. What happens?','The current-account balance worsens by ¥10m. A deficit widens or a surplus shrinks.')]),
 section(3,'Past paper questions','历年真题'),
 exam('trade','Independent writing · 6 minutes. Explain the export effect and the import effect, then link both to the current-account surplus. This is the assessed exit.',eyebrow='Exit ticket'),
 model('trade',[
  'Higher labour productivity means more output per worker. This may reduce average costs of production and allow firms to lower prices. Exports become more internationally competitive, so foreign demand and export revenue may rise.',
  'Domestic products also become more competitive relative to imports. Residents may switch to domestic goods, reducing import expenditure. Higher export revenue and lower import expenditure increase the current-account surplus, other items unchanged.'
 ]),
 summary([('Growth and employment','Higher capacity allows more real output; relevant skills help workers fill vacancies.'),('Prices','Lower average costs may ease inflation across the economy.'),('Competitiveness','Exports may rise and imports may fall; the outcome depends on demand and costs.')]),
 section('Optional','Inflation: extended practice','通胀：拓展练习'),
 exam('inflation','Optional independent Discuss answer. Develop reasons for lower inflation and reasons it may remain high. Decide which conditions matter most.'),
 model('inflation',[
  'Countries investing successfully in education, healthcare and technology may raise productivity and reduce average costs. This eases cost-push inflation. International competition may also pressure firms to restrain prices.',
  'However, energy and food prices may rise, increasing production costs. More optimistic consumers or higher government spending may raise total demand faster than output, causing demand-pull inflation.',
  'Lower inflation is more likely where productivity gains outweigh cost increases and demand growth remains consistent with the growth of productive capacity.'
 ])
]

l5=[
 hero(5,'Limitations and evaluation','局限与评价','Conditions, trade-offs and Discuss questions','autoMechanicsTraining'),
 written('Recall: effects and fiscal policy',[
  ('How can productivity improve price stability?','More output per worker can lower average costs and ease cost-push inflation.'),
  ('Why does relevant training help employment?','Skills match vacancies, increasing occupational mobility and reducing structural unemployment.'),
  ('What is a government budget deficit?','Government spending exceeds government revenue.')],eyebrow='Recall',notes='First two prompts retrieve Lesson 4. The third is spaced retrieval from fiscal policy. If not secure, consolidate the definition here before the budget section.'),
 objectives(['Explain why supply-side policies may disappoint.','Compare short-run and long-run budget effects.','Write a developed, balanced Discuss answer.'],['解释供给侧政策可能效果不佳的原因。','比较对政府预算的短期与长期影响。','写出充分分析双方观点的讨论答案。']),
 section(1,'Conditions for effective policy','政策有效的条件'),
 cards('Spending now, benefits later','现在支出，以后受益',[
  ('Today 现在','Government pays for teachers, training and construction.'),
  ('During the delay 滞后期间','Skills develop and infrastructure is built; capacity has not yet fully increased.'),
  ('Later 以后','If projects succeed, higher productivity raises productive capacity.')],layout='ssp-timeline',keys=('budget','education'),notes='The timing is schematic, not a fixed estimate for every policy. Teacher explanation extends the budget scheme’s explicit short-run/long-run distinction. Adult retraining may act sooner than schooling; both depend on programme quality.'),
 cards('Short-run demand may rise before supply','短期内需求可能先于供给增长',[
  ('Government spending rises','Payments for teachers and construction add to total demand.'),
  ('Capacity responds later','If spare capacity is limited, spending may push up prices before the supply benefit appears.')],keys=('education',)),
 cards('Skills must match available jobs','技能须匹配现有工作',[
  ('Relevant skills 技能匹配','Training is more effective when employers need the skills taught.'),
  ('Enough vacancies 职位充足','Weak demand may leave too few suitable jobs, even for qualified workers.')],keys=('education',),notes='Underemployment includes workers taking jobs below their skill level or wanting more hours. Distinguish skills mismatch from an economy-wide shortage of demand; more qualifications alone solve neither automatically.'),
 cards('Skilled workers may emigrate','技术劳动者可能移居国外',[
  ('Publicly funded education','Workers gain skills and qualifications.'),
  ('Better opportunities abroad','Some move abroad; the home economy loses part of the expected output and tax benefit.')],keys=('education',),notes='The original scheme accepts emigration as a limit on home-country growth. Do not claim all educated workers emigrate or ignore possible remittances; remittances do not replace the lost domestic labour input.'),
 cards('Access affects income distribution','获得教育的机会影响收入分配',[
  ('Wider access 更广泛的机会','Low-income workers gain skills and better-paid work; income inequality may fall.'),
  ('Restricted access 机会受限','If only high-income families obtain better education, their earnings may rise further ahead.')],keys=('education',)),
 written('Explain the policy failure',[
  ('Graduates leave for better-paid work overseas. Which expected domestic benefit is weakened?','The home economy may gain less productive labour, output and tax revenue.'),
  ('Only affluent families can afford the improved schools. Explain the distributional effect.','Their children may gain better-paid jobs while poorer children miss out, widening income inequality.')]),
 section(2,'Costs and policy trade-offs','成本与政策取舍'),
 cards('Opportunity cost is the alternative forgone','机会成本是放弃的次佳选择',[
  ('Limited public funds','Spending on training may mean a planned hospital improvement is not funded.'),
  ('Compare the alternatives','The opportunity cost is the hospital improvement forgone, not simply the money spent.')],keys=('budget',),notes='Definition: next best alternative forgone (definitions reference 1.3.1). The hospital/training choice is a teacher-created application, not a verbatim scheme point.'),
 cards('Tax cuts may not finance new investment','减税未必转化为新增投资',[
  ('Immediate effect 直接影响','Lower tax rates may reduce government tax revenue.'),
  ('Uncertain response 不确定的反应','Firms may save retained profits or pay dividends if demand and confidence are weak.')],keys=('budget',),notes='Lower tax revenue is an explicit scheme point. Saving/dividends and confidence develop Lesson 3’s already-taught conditional investment mechanism. Do not claim the lower tax rate necessarily reduces total revenue in the long run.'),
 cards('Privatisation changes more than ownership','私有化的收益与代价',[
  ('Government finances 政府财政','Sale proceeds and less support for loss-making firms may help the budget; future profit income may be lost.'),
  ('Consumers and workers 消费者与劳动者','Competition may lower costs and prices; monopoly power, redundancies or lost services may offset gains.')],keys=('budget',),notes='Budget points: 2025FM-22 Q5(d). Consumer/worker trade-offs retrieve Lesson 3’s original 2023MJ-22 Q2(d) private/public prices discussion and bus case; this is synthesis, not a new claim that privatisation necessarily reduces competition.'),
 cards('Deregulation and flexibility involve trade-offs','放松管制与灵活性的取舍',[
  ('Lower barriers and costs','Easier entry and hiring may increase competition, investment and employment.'),
  ('Protection still matters','Removing useful safety or environmental rules can increase harm; easier dismissal can reduce job security.')],keys=(),notes='Synthesis of Lesson 3, including its source-verified employment-protection examples. Distinguish unnecessary entry restrictions from protective rules. These are conditional applications, not a verbatim accepted list from the education question.'),
 written('Turn a limitation into a reasoned judgement',[
  ('“Training takes time, so it is useless.” Improve this argument.','Training may be too slow for immediate unemployment, but effective later if it teaches needed skills and suitable jobs exist.'),
  ('“Privatisation always improves the budget.” Improve this argument.','Sale revenue may help initially, but losing future profits from a profitable state firm can weaken later government revenue.')]),
 cards('Education can widen the budget deficit first','教育支出可能先扩大预算赤字',[
  ('Short run 短期','Government spending rises before workers’ productivity and taxable incomes increase.'),
  ('Long run 长期','Higher employment, incomes and profits may raise direct and indirect tax revenue.')],keys=('budget',),notes='At unchanged other spending/revenue, the deficit rises initially. Long-run revenue depends on successful policy and a sufficiently large tax base; it is not guaranteed to repay every cost.'),
 flow('Growth can improve government finances','增长可以改善政府财政',[
  ('Productivity and employment __________','rise','生产率与就业增加'),
  ('Incomes and profits __________','increase','收入与利润增加'),
  ('Tax revenue may __________','rise','税收收入可能增加'),
  ('Budget deficit may __________','fall','预算赤字可能缩小')],keys=('budget',)),
 written('Keep the two deficits separate',[
  ('Government spends ¥120bn and receives ¥100bn. Name the deficit and its size.','A budget deficit of ¥20bn: government spending exceeds revenue.'),
  ('Exports become more competitive. Does that alone prove the budget deficit falls?','No. Explain an effect on government revenue or spending; export receipts are not all government revenue.')],sources=sources('budget')),
 section(3,'Past paper questions','历年真题'),
 exam('education','Plan before writing: choose two macroeconomic aims. Develop how education helps; develop why it may not. End with a judgement tied to the conditions. Allow 8–10 minutes.'),
 model('education',[
  'Improved education raises skills and productivity. A more productive workforce can attract investment, increasing total demand and real output. Higher productivity may also lower average costs, easing cost-push inflation.',
  'Better qualifications can help workers obtain suitable jobs and reduce unemployment. If low-income families can access this education, their children may gain better-paid work and income inequality may fall.'
 ],'Teaching model · benefits'),
 model('education',[
  'However, education spending increases total demand before productive capacity fully responds, so it may cause inflation. Highly qualified workers may still lack suitable jobs, or may emigrate, reducing the home economy’s expected growth benefit.',
  'If improved education is accessible only to higher-income families, inequality may increase. Overall, education is more likely to achieve the aims when access is broad, skills match vacancies and workers stay; its effects also depend on demand and the time allowed.'
 ],'Teaching model · limits and judgement'),
 exam('budget','Assessed exit · 8–10 minutes. Write independently. Compare effects on government spending and revenue in the short run and long run; make a conditional judgement.',eyebrow='Exit ticket'),
 model('budget',[
  'Supply-side measures may raise productivity, output and employment. Higher incomes and profits can increase direct tax revenue, while more spending can raise indirect tax revenue. If revenue grows faster than government spending, the budget deficit falls.',
  'Privatisation brings sale revenue and may remove the need to support loss-making state firms. This can also reduce the budget deficit.'
 ],'Teaching model · why it may fall'),
 model('budget',[
  'However, education, training and infrastructure increase government spending and may not succeed. Tax cuts can reduce revenue before investment responds. Selling profitable state firms also removes future profit income.',
  'Therefore, the deficit may rise in the short run but fall in the long run if successful measures expand taxable incomes and profits sufficiently. The result depends on the policy’s cost, its effectiveness and the time period, not simply on higher output.'
 ],'Teaching model · limits and judgement'),
 summary([('Explain conditions','Relevant skills, vacancies, access and worker retention affect the result.'),('Compare costs and timing','Upfront spending and tax losses can precede uncertain long-run benefits.'),('Discuss both sides','Develop the economic links, then make a judgement answering the exact question.')])
]

# Teach the quality of evaluation before the exclusively past-paper section.
l5.insert(next(i for i,s in enumerate(l5) if s.get('title')=='Past paper questions'),
 cards('Develop both sides of a Discuss answer','充分分析讨论题的正反两面',[
  ('Develop the benefit','Explain how the policy changes the economy and helps the aim in the question.'),
  ('Develop the limitation','Explain why the effect may be weaker, delayed or offset by a cost.'),
  ('Make a conditional judgement','Decide which conditions matter most, and use them to answer the question.')],keys=('education','budget'),notes='The original level-3 descriptor (6–8) requires reasoned discussion and developed analysis of both sides, with thoughtful evaluation. One side may be more developed. These are thinking prompts, not a fixed paragraph formula or a universal allocation of marks.'))

for n,slides,title,minutes in [(4,l4,'Effects of supply-side policy',45),(5,l5,'Limitations and evaluation',55)]:
 meta=dict(code='4.4.3',unit='Unit 4 - Government and the macroeconomy',title=f'Supply-side policy lesson {n}: {title.lower()} - Cambridge IGCSE Economics 0455',lessonLabel=f'Supply-side policy lesson {n}',courseLabel='Cambridge IGCSE Economics 0455',creatorLabel='Created by Samuel Oehler-Huang, Suzhou Foreign Language School',deliveryPlan=dict(durationMinutes=minutes,coreEndSlide=next(i+1 for i,s in enumerate(slides) if s.get('title')=='Summary'),status='Prepared; not evidence of taught coverage'))
 for s in slides:
  if not s.get('sources'): s['sources']=[dict(label='Course reference',ref='0455 syllabus 4.4.1–4.4.3; definitions 2026; supply-side Lessons 1–3',note='Teacher explanation or retrieval. See EFFECTS-SOURCES.md for the distinction between original scheme points and teaching applications.')]
  if s['type']=='hero': s['notes']=f'Prepared continuation, not reported taught. Allow about {minutes} minutes, including independent writing and feedback. Lesson 5 may need a second period if both full Discuss answers are written. Protect writing time; stop at a section boundary and resume. Optional material follows the core Summary.'
  if s['type'] in ('exam','modelAnswer'):
   p=s['sources'][0]
   s['examSpec']=dict(pattern=p['ref'])
  if s.get('title')=='Summary': s['sources']=sources('education','trade' if n==4 else 'budget')
  s.setdefault('partialReview',False if s['type'] in ['hero','section','outcomes','exam'] else s.get('partialReview'))
  if s['partialReview'] is None: del s['partialReview']
 data=json.dumps(dict(meta=meta,slides=slides),ensure_ascii=False,indent=2)
 import re
 data=re.sub(r'"__PHOTO_(\w+)__"',r'IGCSE.photos.supplySidePolicy.\1',data)
 (D/f'slides-lesson-{n}.js').write_text('/* Source-checked continuation: EFFECTS-SOURCES.md. */\nwindow.IGCSE = window.IGCSE || {};\nIGCSE.lesson = '+data+';\n',encoding='utf-8')
 (D/f'quiz-lesson-{n}.js').write_text('window.IGCSE = window.IGCSE || {};\nIGCSE.quiz = '+json.dumps(dict(id=f'4-4-supply-side-policy-lesson-{n}',version='2.0.0',title=title+' quiz',description='Teacher-written retrieval aligned with this lesson and its cited schemes.',questions=[]),indent=2)+';\n',encoding='utf-8')
print('Wrote',len(l4),'and',len(l5),'slides')

STUDY={4:[
 ('capacity','A policy raises capacity but demand is weak. Why might real GDP rise less?', ['Firms may lack buyers for the extra possible output.','The PPC must shift inwards.','Productivity means the general price level.','Training directly reduces all consumer incomes.'],0,'Productive capacity is possible output; actual production also depends on demand.'),
 ('employment','Which condition makes training more likely to reduce structural unemployment?', ['Courses award more certificates, regardless of content.','The skills taught match available vacancies.','All workers stay in the same occupation.','Firms cut every job vacancy.'],1,'Relevant skills help workers move into available occupations.'),
 ('costs','Total production cost stays ¥1,200 while output rises from 100 to 150 units. New average cost is:', ['¥12','¥18','¥8','¥6'],2,'Average cost = ¥1,200 / 150 = ¥8. The training cost is excluded from these illustrative figures.'),
 ('prices','Inflation falls from 6% to 2%. What follows?', ['All prices return to their original level.','Prices are unchanged.','The price level falls by 4%.','The general price level still rises, more slowly.'],3,'Lower positive inflation is slower price growth, not deflation.'),
 ('exports','Lower domestic average costs can increase export revenue if:', ['Foreign demand responds sufficiently to more competitive prices.','Foreign buyers stop buying domestic goods.','Every firm keeps prices and quantities unchanged.','Import spending rises by the same amount.'],0,'Lower costs may allow lower prices and higher foreign demand; the revenue response is conditional.'),
 ('balance','Exports rise by ¥20m and imports by ¥30m; other current-account items are unchanged. The balance:', ['Improves by ¥50m.','Worsens by ¥10m.','Improves by ¥10m.','Is unchanged.'],1,'The additional import outflow exceeds the additional export inflow by ¥10m.')],
 5:[
 ('lag','Education spending rises now but skills improve later. With little spare capacity, what may happen first?', ['Total supply immediately doubles.','All prices fall.','Higher demand creates inflation pressure.','The budget deficit must fall.'],2,'Spending raises total demand before the supply benefit fully appears.'),
 ('access','Improved schools are accessible only to high-income families. Which limit is most relevant?', ['Income inequality may widen.','Every household gains equally.','The policy must lower all wages.','This is a budget surplus.'],0,'Restricted access may widen differences in qualifications and future earnings.'),
 ('migration','Skilled graduates emigrate. Why can this weaken the policy’s home-country benefit?', ['Their skills cease to exist.','All export demand disappears.','Education spending is automatically refunded.','The home economy loses some expected skilled labour and tax revenue.'],3,'Skills are used abroad; do not assume all domestic output or tax benefits are retained.'),
 ('opportunity','Training replaces the next-best planned hospital improvement. The opportunity cost is:', ['The delay before training works.','The hospital improvement forgone.','The certificates issued.','All government spending.'],1,'Opportunity cost is the next-best alternative forgone.'),
 ('budget','Government spends ¥120bn and receives ¥100bn. This is:', ['A ¥20bn current-account deficit.','A ¥20bn budget surplus.','A ¥20bn budget deficit.','A ¥220bn budget deficit.'],2,'Government spending exceeds government revenue by ¥20bn.'),
 ('privatisation','Why might selling a profitable state firm weaken future government finances?', ['Sale revenue is received every year forever.','The government loses future profit income from that firm.','Private firms cannot pay taxes.','All public spending stops.'],1,'Sale proceeds are an initial receipt; foregone future profits may offset the benefit.'),
 ('judgement','Which judgement best answers whether supply-side measures reduce the budget deficit?', ['They always work because output rises.','It depends, with no further explanation.','Exports equal government revenue.','The deficit may rise first, then fall if taxable incomes grow enough to offset the cost.'],3,'Tie the time period and policy effectiveness to government spending and revenue.')]
}
for n,rows in STUDY.items():
 title='Effects of supply-side policy' if n==4 else 'Limitations and evaluation'
 questions=[dict(id=id,type='multipleChoice',prompt=q,choices=c,answer=a,explanation=e,sources=sources('education','trade' if n==4 else 'budget')) for id,q,c,a,e in rows]
 quiz=dict(id=f'4-4-supply-side-policy-lesson-{n}',version='2.0.0',title=title+' quiz',description='Teacher-written retrieval aligned with this lesson and its cited schemes.',questions=questions)
 flash=dict(id=f'4-4-supply-side-policy-lesson-{n}-flashcards',version='2.0.0',title=title+' flashcards',description='Revision of the taught mechanisms and conditions.',cards=[dict(id=id,type='definition',term=q,definition=c[a]+' '+e,sources=sources('education','trade' if n==4 else 'budget')) for id,q,c,a,e in rows])
 for kind,data in [('quiz',quiz),('flashcards',flash)]:
  (D/f'{kind}-lesson-{n}.js').write_text('window.IGCSE = window.IGCSE || {};\nIGCSE.'+kind+' = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
