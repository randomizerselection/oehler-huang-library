window.INVESTMENT_COURSE = window.INVESTMENT_COURSE || {};
const imageRoot = '../../course-assets/images/lesson-03/';
const photos = {
  packets: { src: `${imageRoot}red-packets.jpg`, alt: 'Red gift envelopes: the starting point for a student’s red-packet savings decision.', credit: 'ProjectManhattan / Wikimedia Commons · CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Red_packet.jpg', position: '50% 50%' },
  market: { src: `${imageRoot}red-packet-market.jpg`, alt: 'Young shoppers choosing red envelopes at a Chinese New Year market in Singapore.', credit: 'Wikimedia Commons · see original photograph for attribution', source: 'https://commons.wikimedia.org/wiki/File:Girls_in_Singapore_selecting_red_envelopes_for_Chinese_New_Year.jpg', position: '50% 45%' },
  console: { src: `${imageRoot}nintendo-switch.jpg`, alt: 'A Nintendo Switch console, used to represent a student’s future savings goal.', credit: 'KK IN HK / Wikimedia Commons · CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Nintendo_Switch.jpg', position: '50% 50%' },
  apple: { src: '../../course-assets/images/lesson-02/apple-fifth-avenue-new.jpg', alt: 'The Apple logo above the glass entrance of an Apple store.', credit: 'Ed Uthman / Wikimedia Commons · CC BY-SA 2.5', source: 'https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg', position: '50% 50%' },
  microsoft: { src: `${imageRoot}microsoft-redmond.jpg`, alt: 'Microsoft’s campus sign identifies the company in the historical investment-return chart.', credit: 'Derrick Coetzee / Wikimedia Commons · Public domain', source: 'https://commons.wikimedia.org/wiki/File:Microsoft_sign_closeup.jpg', position: '50% 50%' },
};
const sources = {
  glossary: { label: 'Current syllabus · 1.1.3 Compound growth: content, checkpoint and definitions', href: '../../syllabus-2026-27.html' },
  compound: { label: 'SEC Investor.gov · Compound interest', href: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest' },
  reinvestment: { label: 'SEC Investor.gov · Dividend reinvestment', href: 'https://www.investor.gov/introduction-investing/getting-started/investing-your-own/direct-investing' },
  simple: { label: 'People’s Bank of China · Deposit interest calculation examples, section 2: principal × rate × time', href: 'https://wuhan.pbc.gov.cn/tiaofasi/144941/3581332/3583282/2018080810321272027.pdf' },
  rollover: { label: 'ICBC · Notice deposits: reinvesting principal and interest at rollover', href: 'https://www.icbc.com.cn/page/721852427233165334.html' },
  microsoftHistory: { label: 'Microsoft 2025 Annual Report · Stock Performance, dividends reinvested, June 2020–June 2025', href: 'https://www.microsoft.com/investor/reports/ar25/index.html' },
};
const money = (value, symbol = '¥') => symbol + value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fv = (p, r, n) => p * (1 + r) ** n;
const blank = answer => ({ text: '______', answers: [answer] });
const section = (id, number, title, zh, note) => ({ id, kind: 'section', number, title, zh, caption: '', note });
const model = 'Classroom model · 10% each year · All interest retained · No extra deposits';
const assumptions = 'All numerical scenarios are classroom models, before tax and fees. The 10% rate is chosen to make the arithmetic visible; it is not a bank rate, historical return or forecast.';

window.INVESTMENT_COURSE.lesson = {
  meta: { lesson: 3, title: 'Compound growth', titleZh: '复利增长', folio: 'GROWTH', course: 'Investment Course', source: '../../syllabus-2026-27.html · 1.1.3', designReference: '../1-1-2-measuring-investment-return/index.html', evidenceDate: '2026-09-08' },
  photos,
  slides: [
    { id: 'hero', kind: 'hero', title: 'Compound growth', zh: '复利增长', photo: photos.market, syllabus: [
      { code: '1', title: 'Investment foundations and return', zh: '投资基础与回报' },
      { code: '1.1', title: 'Investment, saving and return', zh: '投资、储蓄与回报' },
      { code: '1.1.3', title: 'Compound growth', zh: '复利增长' },
    ], note: 'Approximately 40 minutes. Begin with familiar red-packet money and a savings goal. The people pictured are not the fictional students in the calculations. Use calculators for the independent tasks.', sources: [sources.glossary] },

    { id: 'opening-interest-puzzle', kind: 'visual', photo: photos.packets, title: 'Can your red-packet money grow without adding more?', prompt: 'Can your red-packet money grow without adding more?', note: 'Brief visual pause: allow silent looking, then take one prediction. The envelopes represent money that could be saved or invested; leaving cash in an envelope earns no interest. Return to this question at the end. Do not define compounding yet.' },

    { id: 'lesson-2-review', kind: 'recall', variant: 'retrieval', title: 'What can you recall from Lesson 2?', group: 'LESSON 2', items: [
      { question: 'What two components make up total return?', answer: 'The change in the investment’s value, plus income received.' },
      { question: 'How do you turn a return amount into a return percentage?', answer: 'Divide total return by the starting value, then multiply by 100.', equations: [{ fraction: ['Total return', 'Starting value'], after: ' × 100 = Return %' }] },
    ], note: '0–4 min including the next two slides. Students retrieve from memory before opening either answer; no sentence stems or answer bank. Ask for price change AND income, then the correct denominator. No deposits or withdrawals in these one-period examples.', sources: [sources.glossary] },

    { id: 'review-total-return', kind: 'recall', variant: 'retrieval', group: 'LESSON 2', title: 'Calculate the total return', photo: photos.apple, context: 'Classroom case · Mei’s Apple shares cost US$1,000. One year later they are worth US$1,080, and she has received US$20 in dividends, kept as cash.', items: [
      { question: 'What is Mei’s total return amount?', equations: ['Total return = Ending value − Starting value + Income', '= 1,080 − 1,000 + 20', '= US$100'], answer: 'US$80 of price gain + US$20 of dividend income.' },
    ], note: 'Independent retrieval calculation. Do not show the formula until students have attempted it. The investor and all figures are illustrative, not reported Apple prices or dividends. No investor contributions or withdrawals; dividend cash is not included in the ending share value.' },

    { id: 'review-return-percentage', kind: 'recall', variant: 'retrieval', group: 'LESSON 2', title: 'Calculate the return percentage', context: 'Classroom case · Jun buys gold for ¥2,000. One year later it is worth ¥1,900. There is no income and no additional investment.', items: [
      { question: 'What are Jun’s total return and return percentage?', equations: ['Total return = 1,900 − 2,000 = −¥100', { fraction: ['−100', '2,000'], after: ' × 100 = −5%' }], answer: 'The negative sign shows a loss. Use the starting ¥2,000 as the denominator.' },
    ], note: 'Check transfer to a loss and a different starting value. Diagnose division by ending value and omission of the negative sign. These are classroom figures, not a dated gold-price claim.' },

    { id: 'objectives', kind: 'objectives', partialReveal: true, group: 'COMPOUND GROWTH', title: 'Today', items: [
      ['01', 'Explain why returns can earn further returns', '解释回报如何产生更多回报'],
      ['02', 'Calculate a value several years ahead', '计算若干年后的价值'],
      ['03', 'Explain what a projection can and cannot tell us', '解释预测结果及其局限'],
    ], note: 'The three sections follow the four syllabus content points: mechanism; future-value calculation; effects of rate and horizon plus the limits of a projection.' },

    section('section-reinvestment', '01', 'How returns build on returns', '回报如何产生更多回报', '4–15 min. Demonstrate the larger interest-earning balance, name the concepts, then distinguish simple interest.'),

    { id: 'returns-build-on-returns', kind: 'chart', variant: 'growth-bars', partialReveal: ['.growth-stage'], group: 'REINVESTMENT', title: 'What happens when the interest stays invested?', context: model, principal: 1000, rate: .10, years: [0,1,2,3], max: 1500, ticks: [0,500,1000,1500], note: 'Reveal one bar per step. The zero-based vertical scale is identical for every year. Green is the original ¥1,000; copper is all accumulated interest. Read the increasing balances and the new interest above each bar. Before year 2, ask which balance earns the next 10%. No new money is added. ' + assumptions, sources: [sources.compound] },

    { id: 'interest-on-interest', kind: 'method', variant: 'equations', partialReveal: ['.equation-step'], group: 'REINVESTMENT', title: 'Where does the extra ¥10 come from?', context: 'Year 2 begins with ¥1,000 of original money + ¥100 of earlier interest.', steps: [
      { label: 'Interest on the original money · 本金的利息', equation: '¥1,000 × 0.10 = ¥100' },
      { label: 'Interest on the earlier interest · 利息的利息', equation: '¥100 × 0.10 = ¥10', tone: 'copper' },
      { label: 'Total interest in year 2 · 第二年的总利息', equation: '¥100 + ¥10 = ¥110' },
    ], note: 'Make the mechanism explicit: ¥100 of last year’s return now earns ¥10. It is not a higher rate or another red packet. Ask students to explain the second line before revealing the total. ' + assumptions, sources: [sources.compound] },

    { id: 'reinvestment-choice', kind: 'case', partialReveal: true, group: 'REINVESTMENT', title: 'What changes if you take the interest out?', prompt: 'Same classroom model: ¥1,000 earns ¥100 in year 1. The next year’s rate stays at 10%.', left: ['Take the ¥100 out', '¥1,000 stays invested', 'Year 2 interest: ¥100', 'The withdrawn cash earns nothing'], right: ['Keep the ¥100 invested', '¥1,100 stays invested', 'Year 2 interest: ¥110', 'The earlier interest earns ¥10 too'], note: 'Replaces the broad asset list and contribution-classification exercise. Focus on the syllabus checkpoint: the amount earning the next return. Compare interest earned, not total wealth; the left-hand ¥100 still exists as cash. The next definitions name the two principles students have just explained. ' + assumptions },

    { id: 'definition-compounding', kind: 'definition', group: 'REINVESTMENT', title: 'Compound growth · 复利增长', prompt: 'Compounding is growth in which later returns build on earlier returns.', translation: '复利增长是指后期的回报在前期回报的基础上继续产生的增长。', note: 'Consolidate the visual mechanism: the original ¥1,000 earns interest, then ¥1,100, then ¥1,210. Point specifically to the extra ¥10 earned by earlier interest. English follows the glossary; Chinese is a faithful classroom translation.', sources: [sources.glossary, sources.compound] },

    { id: 'definition-reinvestment', kind: 'definition', group: 'REINVESTMENT', title: 'Reinvestment · 再投资', prompt: 'Reinvestment is using income or gains to acquire additional assets rather than withdrawing them.', translation: '再投资是指将收入或收益用于增加资产，而不是将其取出。', note: 'Relate the definition to the KEEP choice. Retained interest increases the financial claim held in the account; a share dividend can instead buy additional shares. The return remains invested and can contribute to later returns. No fresh contribution is needed.', sources: [sources.glossary, sources.reinvestment] },

    { id: 'simple-versus-compound', kind: 'method', variant: 'equations', partialReveal: ['.equation-step'], group: 'REINVESTMENT', title: 'Simple interest is used in real deposits', context: 'A standard fixed-term bank deposit (整存整取) can pay interest on the original principal at maturity, without compounding within the term.', steps: [
      { label: 'Simple interest · 单利', equation: 'Interest = Principal × Annual rate × Years' },
      { label: 'Illustration: ¥1,000 for 3 years at 2% a year', equation: '¥1,000 × 0.02 × 3 = ¥60' },
      { label: 'To earn interest on that ¥60', equation: 'Reinvest principal + interest after maturity', explanation: 'The next term may offer a different rate.', tone: 'copper' },
    ], note: 'Use the standard term simple interest, not a named investment product called simple growth. The PBOC’s deposit examples explicitly use principal × rate × term. The 2% rate here is an arithmetic assumption, not a current bank offer. Interest is not capitalised during this term; reinvesting both amounts at maturity can compound across successive terms. Actual products have their own calculation and payment rules.', sources: [sources.simple, sources.rollover] },

    { id: 'simple-compound-comparison', kind: 'chart', variant: 'comparison-lines', group: 'REINVESTMENT', title: 'Same rate, different interest-earning balances', context: 'Classroom comparison · ¥1,000 · 10% a year · 3 years · No extra deposits', years: [0,1,2,3], min: 0, max: 1500, ticks: [0,500,1000,1500], series: [
      { label: 'Compound interest', tone: 'forest', values: [1000,1100,1210,1331] },
      { label: 'Simple interest', tone: 'copper', values: [1000,1100,1200,1300] },
    ], conclusion: 'The extra ¥31 comes from interest earning interest.', note: 'Hold principal, rate and time constant. The simple result includes the original money plus all interest; no interest is lost or spent. The interest difference is modest on this honest zero-based axis. The earlier stacked chart and ¥10 calculation explain it. ' + assumptions },

    { id: 'mcq-new-balance', kind: 'mcq', group: 'REINVESTMENT', title: 'Check your understanding', question: 'The balance grows from ¥1,000 to ¥1,100. Which amount earns the next year’s 10% if all interest stays invested?', options: ['A  Only the original ¥1,000', 'B  The updated ¥1,100', 'C  Only the ¥100 interest', 'D  A new ¥1,000 deposit is needed'], answer: 1, feedback: 'Apply the return to the updated balance: ¥1,100 × 10% = ¥110.', note: 'This is the syllabus checkpoint. Do not move on if students repeatedly apply the return only to the original principal.' },

    { id: 'future-goal-pause', kind: 'visual', photo: photos.console, title: 'Will today’s money be enough for your future goal?', prompt: 'Will today’s money be enough for your future goal?', note: 'Brief full-screen visual pause. The console represents a familiar goal, not a recommendation or a current price quote. Ask students what they would need to know: starting money, time, future return and the target budget. The next slide supplies a fictional ¥1,300 target.' },
    section('section-future-value', '02', 'From today’s money to a future value', '从今天的金额到未来的价值', '15–25 min. Show the timeline first, then define future value and derive the exponent from repeated multiplication.'),

    { id: 'future-value-timeline', kind: 'chart', variant: 'future-timeline', partialReveal: ['.timeline-stage'], group: 'FUTURE VALUE', title: 'Follow ¥1,000 to the end of year 3', context: 'Classroom savings goal: ¥1,300 · Assume 10% a year · All interest retained', principal: 1000, rate: .10, years: [0,1,2,3], target: 1300, note: 'Reveal each successive point on the time line. Each arrow multiplies the previous balance by 1.10. The endpoint ¥1,331 is the whole future amount: original ¥1,000 plus ¥331 growth. Compare it with the fictional target; do not imply a real console will cost ¥1,300 in three years. Prices can change. ' + assumptions },

    { id: 'definition-future-value', kind: 'definition', group: 'FUTURE VALUE', title: 'Future value · 终值', prompt: 'Future value is the projected value of money after growth over a stated period and assumed return.', translation: '终值是指在给定期间和假设回报率下，资金增长后的预计价值。', note: 'Point back to the final timeline amount ¥1,331. Future value includes the original ¥1,000, not just the ¥331 growth. The period is three years and 10% is a chosen assumption. The term summarises the process already seen.', sources: [sources.glossary] },

    { id: 'formula-substitution', kind: 'method', variant: 'equations', partialReveal: ['.equation-step'], group: 'FUTURE VALUE', title: 'Repeated growth becomes a power', steps: [
      { label: 'One year: keep the money and add 10%', equation: '¥1,000 × (1 + 0.10) = ¥1,100' },
      { label: 'Three years: apply the same multiplier three times', equation: '¥1,000 × 1.10 × 1.10 × 1.10 = ¥1,331' },
      { label: 'Write the repeated multiplication as a power', equation: '¥1,000 × (1.10)^3 = ¥1,331', tone: 'copper' },
    ], note: 'Derive the compact notation from the timeline. The superscript 3 counts multiplications; it does not mean multiply the rate by three. Keep variables and numerals upright as in the A-level course.' },

    { id: 'future-value-formula', kind: 'method', variant: 'compound-formula', partialReveal: ['.formula-term'], group: 'FUTURE VALUE', title: 'The compound future-value formula', terms: [
      ['FV', 'Future value', '终值', 'The whole amount at the end'],
      ['P', 'Starting principal', '初始本金', 'Money invested at the start'],
      ['r', 'Return per period', '每期回报率', 'A decimal: 10% = 0.10'],
      ['n', 'Number of periods', '期数', 'Annual return → number of years'],
    ], note: 'The expression FV = P(1 + r)^n now abbreviates a familiar mechanism. Constant return per period, full reinvestment and no added money or withdrawals are required. These classroom values exclude fees and tax. Show one symbol meaning at a time.', sources: [sources.glossary, sources.compound] },

    { id: 'future-value-practice', kind: 'recall', variant: 'retrieval', group: 'FUTURE VALUE', title: 'Calculate a different savings scenario', context: 'Classroom model · Lin starts with ¥2,000 and assumes a 5% annual return for 3 years. All returns stay invested; no money is added or withdrawn.', items: [
      { question: 'Calculate the future value and the total growth.', equations: ['FV = 2,000 × (1 + 0.05)^3', '= ¥2,315.25', 'Total growth = 2,315.25 − 2,000 = ¥315.25'], answer: 'The result follows if the assumed 5% return occurs each year.' },
    ], note: 'Allow an independent written calculation before revealing the method. Require r = 0.05 and n = 3. Diagnose use of 5 instead of 0.05, omission of the principal, or simple interest. Full-precision result is 2315.25. This is an illustrative scenario.' },

    { id: 'mcq-exponent', kind: 'mcq', group: 'FUTURE VALUE', title: 'Check your understanding', question: 'Which expression models ¥1,000 at 10% a year for three years with full reinvestment?', mathOptions: true, options: ['A  1,000 × (1 + 10)^3', 'B  1,000 × (1 + 0.10 × 3)', 'C  1,000 × (1 + 0.10)^3', 'D  1,000 + 0.10^3'], answer: 2, feedback: 'Use a decimal rate and repeat the whole multiplier three times. B calculates simple interest.', note: 'Check units and exponent meaning. Typeset each power as a true superscript.' },

    section('section-projections', '03', 'What if the future is different?', '如果未来与假设不同呢？', '25–40 min. Introduce assumptions through alternative outcomes, vary rate and horizon, then make a conditional conclusion.'),
    { id: 'assumption-pause', kind: 'visual', photo: photos.apple, title: 'Does liking Apple tell us next year’s share return?', prompt: 'Does liking Apple tell us next year’s share return?', note: 'Full-screen visual pause. Distinguish a familiar, attractive product from a known future investment return. Take reasons rather than a prediction of Apple’s price. The following chart models three possible inputs, not forecasts.' },

    { id: 'assumed-return-scenarios', kind: 'chart', variant: 'scenario-bars', partialReveal: ['.scenario-stage'], group: 'PROJECTIONS', title: 'One starting amount, three possible futures', context: 'Paper model of ¥1,000 in shares · One year · Illustrative returns, not forecasts', principal: 1000, rates: [-.10, .05, .10], min: 0, max: 1200, ticks: [0,400,800,1200], note: 'Ask what has changed while the starting ¥1,000 and one-year horizon stay fixed. A chosen −10% gives ¥900, +5% gives ¥1,050, and +10% gives ¥1,100. We can calculate what follows from each input without knowing which return will happen. Now introduce the name assumed return.' },

    { id: 'definition-assumed-return', kind: 'definition', group: 'PROJECTIONS', title: 'Assumed return · 假设回报率', prompt: 'An assumed return is a rate used in a projection; it is an input and not a promised outcome.', translation: '假设回报率是预测计算中采用的回报率；它是输入条件，而不是承诺的结果。', note: 'Refer to the three rates just entered into the model. The calculation gives their consequences, not evidence that any one will occur. Keep this distinction when using the familiar 10% classroom assumption.', sources: [sources.glossary] },

    { id: 'rate-comparison', kind: 'chart', variant: 'comparison-lines', group: 'PROJECTIONS', title: 'How does the assumed return change growth?', context: 'Same ¥1,000 · Same 5 years · Full reinvestment · Illustrative constant annual returns', years: [0,1,2,3,4,5], min: 0, max: 1700, ticks: [0,500,1000,1500], series: [.02,.05,.10].map((r,i) => ({ label: `${r*100}% a year`, tone: ['muted','copper','forest'][i], values: [0,1,2,3,4,5].map(n => fv(1000,r,n)) })), conclusion: 'A higher assumed rate produces a higher calculated value; it does not make that outcome certain.', note: 'Hold time and principal fixed. Five-year results: 2% → ¥1,104.08; 5% → ¥1,276.28; 10% → ¥1,610.51. Before reading the legend values, ask students which path would match 5%. All three are scenarios, not product rates or company forecasts.' },

    { id: 'time-horizon-comparison', kind: 'chart', variant: 'growth-bars', partialReveal: ['.growth-stage'], group: 'PROJECTIONS', title: 'How does more time change growth?', context: 'Same ¥1,000 · Same assumed 5% annual return · All returns retained', principal: 1000, rate: .05, years: [0,1,5,10], max: 1800, ticks: [0,500,1000,1500], intervalLabels: false, note: 'Hold rate and principal fixed. Treat these as four separate horizon choices, not equally spaced years on a time axis. Balances at years 1, 5 and 10 are ¥1,050, ¥1,276.28 and ¥1,628.89. At this positive assumed rate, more time gives more compounding. Time itself does not guarantee a gain.' },

    { id: 'microsoft-real-return-path', kind: 'chart', group: 'HISTORICAL EVIDENCE', title: 'Real returns do not follow a smooth path', photo: photos.microsoft, context: 'Microsoft shares · US$100 in June 2020 · Dividends reinvested', unit: 'Value each 30 June (US$)', points: [['2020',100],['2021',134.41],['2022',128.48],['2023',172.01],['2024',227.51],['2025',255.13]], min: 0, max: 300, ticks: [0,100,200,300], alt: 'Microsoft dividend-reinvested investment: 100 in 2020, 134.41 in 2021, 128.48 in 2022, 172.01 in 2023, 227.51 in 2024 and 255.13 in 2025.', conclusion: 'The value fell in 2022 even though dividends were reinvested.', note: 'Retained, verified historical series from Microsoft’s 2025 annual report. It is total return, not a share-price series or a 2026 forecast. Reinvestment did not prevent a down year. The 2021–2022 change is about −4.41%. Do not infer an expected future rate from this short history.', sources: [sources.microsoftHistory] },

    { id: 'check-projection-limits', kind: 'yesno', group: 'PROJECTIONS', title: 'Check your understanding · True or false?', items: [
      { statement: 'A three-year calculation at 5% proves that the investment will earn 5% every year.', answer: false, reason: '5% is an input; the actual return may differ.' },
      { statement: 'At the same positive rate, a larger invested balance earns more.', answer: true, reason: 'The rate applies to more money.' },
      { statement: 'Reinvestment prevents shares from losing value.', answer: false, reason: 'Prices can still fall.' },
      { statement: 'An annual return rate must be paired with a number of years.', answer: true, reason: 'Rate and period units must match.' },
    ], note: 'Reveal each response after an individual judgement. Use the historical fall and the scenario chart to justify the answers.' },

    { id: 'smg-projection-task', kind: 'table', group: 'STOCK MARKET GAME', title: 'Build your three-year projection', context: 'Paper scenario · US$1,000 · Assume 5% each year · Full reinvestment · No new money', columns: ['Year', 'Starting value', 'Return', 'Ending value'], rows: [
      ['1', 'US$1,000.00', blank('US$50.00'), blank('US$1,050.00')],
      ['2', blank('US$1,050.00'), blank('US$52.50'), blank('US$1,102.50')],
      ['3', blank('US$1,102.50'), blank('US$55.13'), blank('US$1,157.63')],
    ], note: '32–37 min. Core syllabus output: students construct the three-year table and then state assumptions. Do not reveal year 2’s starting amount in advance: it must come from year 1’s ending value. Retain full precision in the calculator and round displayed money to two decimals. This is a paper scenario, not observed game performance. No live login is required.', sources: [sources.glossary] },

    { id: 'smg-assumptions-record', kind: 'recall', variant: 'retrieval', group: 'STOCK MARKET GAME', title: 'What must be true for this projection?', items: [
      { question: 'State the assumptions behind your three-year result.', answer: '5% each year for 3 years; all returns reinvested; no added money or withdrawals; fees and tax ignored.' },
      { question: 'Why could the real outcome be different?', answer: 'Actual returns could differ, including losses. Fees, tax or changes in cash flows could also alter the result.' },
    ], note: 'The assumptions statement completes the syllabus output. Students write it before opening the answers. If using a game evidence record, label this table a scenario; do not enter it as an observed account balance. Keep team performance data separately dated and sourced.' },

    { id: 'mcq-conditional-conclusion', kind: 'mcq', group: 'PROJECTIONS', title: 'Which conclusion does the calculation support?', question: 'Your paper model gives US$1,157.63 after three years. Which statement is justified?', options: ['A  The actual return must be 5% every year', 'B  The account cannot lose money', 'C  The formula guarantees US$1,157.63', 'D  US$1,157.63 follows if the assumptions hold'], answer: 3, feedback: 'A projection calculates the consequences of its inputs. It does not promise the future return.', note: 'Require the conditional wording. Diagnose any student who treats correct arithmetic as proof of a guaranteed outcome.' },

    { id: 'final-check', kind: 'recall', variant: 'retrieval', group: 'COMPOUND GROWTH', title: 'Return to the red-packet question', items: [
      { question: 'How can invested money grow when no new money is added?', answer: 'Retained returns become part of the invested balance and can earn further returns.' },
      { question: 'Correct this claim: “¥1,000 will become ¥1,331 in three years.”', answer: 'It would become ¥1,331 if it earned 10% each year, all returns were reinvested, no money was added or withdrawn, and fees and tax were ignored.' },
    ], note: '37–40 min. Individual exit. Students explain the mechanism and rewrite the promise conditionally before revealing the answers. The full lesson returns to its one opening question. Do not accept simply naming compound growth without explaining returns on returns.' },
  ],
};
