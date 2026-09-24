window.INVESTMENT_COURSE = window.INVESTMENT_COURSE || {};
const imageRoot = '../../course-assets/images/lesson-03/';
const photos = {
  gold: { src: '../../course-assets/images/lesson-02/gold-bullion-bars.jpg', alt: 'Physical gold bullion bars, the asset in Jack’s return calculation.', credit: 'Stevebidmead / Wikimedia Commons · CC0', source: 'https://commons.wikimedia.org/wiki/File:Gold_bullion_bars.jpg', position: '50% 52%' },
  treasury: { src: '../../course-assets/images/lesson-02/us-treasury-building.jpg', alt: 'The US Treasury, issuer of US government bonds.', credit: 'MeanieHyaena / Wikimedia Commons · CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Us-treasury-building.jpg', position: '50% 63%' },
  chinaShares: { src: `${imageRoot}shanghai-stock-exchange.jpg`, alt: 'Shanghai Stock Exchange building represents Chinese shares; CSI 300 includes Shanghai and Shenzhen listings.', credit: '钉钉 / Wikimedia Commons · CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Shanghai_Stock_Exchange6.jpg', position: '50% 40%' },
  chinaBonds: { src: `${imageRoot}china-finance-ministry.jpg`, alt: 'China’s Ministry of Finance, the issuer of central government bonds.', credit: 'N509FZ / Wikimedia Commons · CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Ministry_of_Finance_of_PRC,_south_wing_(20201028170321).jpg', position: '50% 40%' },
  phone: { src: `${imageRoot}iphone-17-pro.jpg`, alt: 'An iPhone 17 Pro represents Emma’s goal of buying a new iPhone.', credit: '茅野ふたば / Wikimedia Commons · CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:IPhone_17_Pro.jpg', position: '50% 50%' },
  camera: { src: `${imageRoot}camera-canon-eos.jpg`, alt: 'A Canon camera represents Lucy’s photography-club savings goal.', credit: 'Thomas Wolf, www.foto-tw.de / Wikimedia Commons · CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Canon_EOS_400D.jpg', position: '50% 50%' },
  growth: { src: `${imageRoot}compound-growth-coins.png`, alt: 'Coin stacks with increasingly large additions represent earlier returns contributing to later growth.', credit: 'AI-generated conceptual image · OpenAI ImageGen, 9 September 2026', position: '90% 50%' },
  packets: { src: `${imageRoot}red-packets.jpg`, alt: 'Red gift envelopes: the starting point for a student’s red-packet savings decision.', credit: 'ProjectManhattan / Wikimedia Commons · CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Red_packet.jpg', position: '50% 50%' },
  market: { src: `${imageRoot}red-packet-market.jpg`, alt: 'Young shoppers choosing red envelopes at a Chinese New Year market in Singapore.', credit: 'Aatu Dorochenko (Aaaatu) / Wikimedia Commons · CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Girls_in_Singapore_selecting_red_envelopes_for_Chinese_New_Year.jpg', position: '50% 45%' },
  console: { src: `${imageRoot}nintendo-switch.jpg`, alt: 'A Nintendo Switch console, used to represent a student’s future savings goal.', credit: 'KK IN HK / Wikimedia Commons · CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Nintendo_Switch.jpg', position: '50% 50%' },
  apple: { src: '../../course-assets/images/lesson-02/apple-fifth-avenue-new.jpg', alt: 'The Apple logo above the glass entrance of an Apple store.', credit: 'Ed Uthman / Wikimedia Commons · CC BY-SA 2.5', source: 'https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg', position: '50% 50%' },
  stocks: { src: '../../course-assets/images/lesson-02/nasdaq-stock-market-display.jpg', alt: 'The NASDAQ MarketSite display represents the US share market in the S&P 500 investment challenge.', credit: 'bfishadow / Wikimedia Commons · CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:NASDAQ_stock_market_display.jpg', position: '58% 50%' },
  microsoft: { src: `${imageRoot}microsoft-redmond.jpg`, alt: 'Microsoft’s campus sign identifies the company in the historical investment-return chart.', credit: 'Derrick Coetzee / Wikimedia Commons · Public domain', source: 'https://commons.wikimedia.org/wiki/File:Microsoft_sign_closeup.jpg', position: '50% 50%' },
};
const sources = {
  usAssets: { label: 'Aswath Damodaran, NYU Stern · Historical returns, January 2026; 2005–2025 CAGR calculated from cumulative values', href: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html' },
  chinaAssets: { label: 'Chen Peng / 有知有行 · SBBI China Yearbook 2025, chapter 1: 2005–2025 annualised returns and benchmarks', href: 'https://youzhiyouxing.cn/sbbi2025/cumulative-chart/' },
  chinaEstimates: { label: 'SBBI China Yearbook 2025 · Estimated early index data and annual CSI 300 returns', href: 'https://youzhiyouxing.cn/sbbi2025/estimated-data/' },
  chinaValues: { label: 'SBBI China Yearbook 2025 · Appendix: cumulative wealth indices', href: 'https://youzhiyouxing.cn/sbbi2025/appendix/' },
  glossary: { label: 'Current syllabus · 1.1.3 Compound growth: content, checkpoint and definitions', href: '../../syllabus-2026-27.html' },
  compound: { label: 'SEC Investor.gov · Compound interest', href: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest' },
  reinvestment: { label: 'SEC Investor.gov · Dividend reinvestment', href: 'https://www.investor.gov/introduction-investing/getting-started/investing-your-own/direct-investing' },
  simple: { label: 'People’s Bank of China · Deposit interest calculation examples, section 2: principal × rate × time', href: 'https://wuhan.pbc.gov.cn/tiaofasi/144941/3581332/3583282/2018080810321272027.pdf' },
  rollover: { label: 'ICBC · Notice deposits: reinvesting principal and interest at rollover', href: 'https://www.icbc.com.cn/page/721852427233165334.html' },
  microsoftHistory: { label: 'Microsoft 2025 Annual Report · Stock Performance, dividends reinvested, June 2020–June 2025', href: 'https://www.microsoft.com/investor/reports/ar25/index.html' },
  sp500History: { label: 'Berkshire Hathaway 2025 Annual Report, pp. 19–20 · S&P 500 total return, 1964–2025', href: 'https://www.berkshirehathaway.com/2025ar/2025ar.pdf' },
};
const money = (value, symbol = '¥') => symbol + value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fv = (p, r, n) => p * (1 + r) ** n;
// Published S&P 500 returns, 1965–2025, including dividends (rounded to 0.1%).
// First two observations end in September; 1967 covers 15 months to December.
const sp500Returns = [10, -11.7, 30.9, 11, -8.4, 3.9, 14.6, 18.9, -14.8, -26.4, 37.2, 23.6, -7.4, 6.4, 18.2, 32.3, -5, 21.4, 22.4, 6.1, 31.6, 18.6, 5.1, 16.6, 31.7, -3.1, 30.5, 7.6, 10.1, 1.3, 37.6, 23, 33.4, 28.6, 21, -9.1, -11.9, -22.1, 28.7, 10.9, 4.9, 15.8, 5.5, -37, 26.5, 15.1, 2.1, 16, 32.4, 13.7, 1.4, 12, 21.8, -4.4, 31.5, 18.4, 28.7, -18.1, 26.3, 25, 17.9];
const sp500Balances = sp500Returns.reduce((values, rate) => [...values, values.at(-1) * (1 + rate / 100)], [1000]);
// End-year historical wealth: NYU cumulative series and SBBI China Appendix 1.1.
// Rebase each to 1,000 at end-2004. These paths are not generated from a fixed CAGR.
const assetHistoryYears = Array.from({length: 22}, (_, i) => 2004 + i);
const usAssetWealth = [[139341.42, 146077.85, 168884.34, 178147.2, 113030.22, 142344.87, 163441.94, 166871.56, 193388.43, 255553.31, 290115.42, 294115.79, 328742.28, 399768.64, 382870.94, 502371.39, 592914.8, 761710.83, 624317.2, 787018.53, 982817.82, 1157598.95], [4331.3, 4455.5, 4542.87, 5006.69, 6013.1, 5344.65, 5796.96, 6726.52, 6926.4, 6295.79, 6972.34, 7061.89, 7110.65, 7309.87, 7308.65, 8012.89, 8920.9, 8526.95, 7006.75, 7278.61, 7159.45, 7752.88], [2110.47, 2485.47, 3062.02, 4039.49, 4213.91, 5268.9, 6809.59, 7628.39, 8062.02, 5835.76, 5843.02, 5135.66, 5551.84, 6254.84, 6196.71, 7378.88, 9162.31, 8818.31, 8866.76, 10042.68, 12649.47, 21025.41]].map(values => values.map(value => value / values[0] * 1000));
const chinaAssetWealth = [[1, 0.95, 2.13, 5.62, 1.93, 3.84, 3.39, 2.58, 2.83, 2.68, 4.17, 4.48, 4.06, 5.05, 3.85, 5.36, 6.97, 6.72, 5.39, 4.9, 5.79, 7.0], [1, 1.14, 1.18, 1.12, 1.33, 1.29, 1.31, 1.4, 1.44, 1.39, 1.55, 1.69, 1.72, 1.67, 1.82, 1.9, 1.94, 2.06, 2.12, 2.22, 2.43, 2.45], [1, 1.13, 1.35, 1.65, 1.61, 2.07, 2.56, 2.71, 2.83, 2.0, 2.04, 1.89, 2.23, 2.31, 2.41, 2.89, 3.3, 3.17, 3.48, 4.06, 5.21, 8.26]].map(values => values.map(value => value * 1000));
const assetHistorySeries = values => ['Shares · 股票', 'Govt bonds · 国债', 'Gold · 黄金'].map((label, i) => ({label, tone: ['forest','blue','copper'][i], values: values[i]}));
const section = (id, number, title, zh, note) => ({ id, kind: 'section', number, title, zh, caption: '', note });
const model = 'Assume 10% each year. Keep all interest invested and add no money.';
const assumptions = 'All numerical scenarios are classroom models, before tax and fees. The 10% rate is chosen to make the arithmetic visible; it is not a bank rate, historical return or forecast.';

window.INVESTMENT_COURSE.lesson = {
  meta: { lesson: 3, title: 'Compound growth', titleZh: '复利增长', folio: 'GROWTH', course: 'Investment Course', source: '../../syllabus-2026-27.html · 1.1.3', designReference: '../1-1-2-measuring-investment-return/index.html', evidenceDate: '2026-09-09' },
  photos,
  slides: [
    { id: 'hero', kind: 'hero', title: 'Compound growth', zh: '复利增长', photo: photos.growth, syllabus: [
      { code: '1', title: 'Investment foundations and return', zh: '投资基础与回报' },
      { code: '1.1', title: 'Investment, saving and return', zh: '投资、储蓄与回报' },
      { code: '1.1.3', title: 'Compound growth', zh: '复利增长' },
    ], note: 'Teaching record updated 22 September 2026: this active lesson ends after the compound-growth formula practice and does not include the unsuccessful Assumed return continuation. Begin with the historical investment guessing challenge, then use familiar savings amounts to explain the mechanism. The AI-generated coin stacks are conceptual, not a numerical chart or historical photograph. Use calculators for the independent tasks.', sources: [sources.glossary] },

    { id: 'opening-interest-puzzle', kind: 'recall', variant: 'retrieval', group: 'OPENING CHALLENGE', title: 'What could US$1,000 grow into?', photo: photos.stocks, context: 'Invest US$1,000 in 1964, matching the S&P 500 (large US companies). Reinvest dividends (股息再投资); add no money.', items: [
      { question: 'Value at the end of 2025? Closest guess wins a prize.', answer: 'About US$455,000 — roughly 455 times the original amount.' },
    ], note: 'Collect individual guesses before revealing; closest absolute dollar estimate wins a small prize. Ask how reinvested dividends might contribute to later returns. Chinese supports the difficult term only. The NASDAQ photo represents US shares; it is not the S&P 500 index. The challenge and following chart now use the same reconstructed series: multiply US$1,000 successively by 1 + each published annual return in Berkshire Hathaway 2025 Annual Report, pp. 19–20. This gives US$454,694.65, presented as approximately US$455,000. Use 454694.65 as the closest-guess scoring benchmark. The separate headline overall gain gives US$461,610; it does not exactly reconcile with the rounded annual-return table and is not used for this chart. Do not attribute the entire discrepancy to rounding without evidence. Follow the report’s measurement convention: the 1965 and 1966 observations end 30 September, and 1967 spans 15 months to 31 December; the series therefore starts 30 September 1964, not year-end 1964. The endpoint is 31 December 2025. This is a hypothetical index-matching investment, not a claim an index fund was available in 1964. Nominal dollars, full dividend reinvestment, no added money, before investor fees and taxes. Historical returns varied; no future return is promised.', sources: [sources.sp500History] },

    { id: 'opening-growth-history', kind: 'chart', variant: 'comparison-lines', group: 'EVIDENCE', title: 'The growth of US$1,000, 1964–2025', context: 'S&P 500 · dividends reinvested · no extra money added', currency: 'US$', unit: 'US dollars', axisLabel: 'Year', years: [1964.75, 1965.75, 1966.75, ...Array.from({length: 59}, (_, i) => 1967 + i)], xTicks: [1970,1980,1990,2000,2010,2020,2025], min: 0, max: 500000, ticks: [0,100000,200000,300000,400000,500000], compactTicks: true, series: [{label: 'Reinvested value', tone: 'forest', values: sp500Balances}], milestones: [{index: 0, label: '1964: US$1,000', dy: -22, anchor: 'start'}, {index: 35, label: '1999: ≈US$60k', dy: -28}, {index: 44, label: '2008 fall', dy: 35}, {index: 61, label: '2025: ≈US$455k', dy: -20, anchor: 'end'}], conclusion: 'Earlier returns stayed invested and could earn later returns. The path included losses.', note: 'Immediately follows the guessing challenge. Trace the actual published annual-return path, including 2000–2002, 2008 and 2022 declines; do not imply a constant 10.5% return. Each point multiplies the previous balance by 1 + that period’s reported S&P return. The reconstruction from rounded annual returns ends at US$454,694.65. Use this same approximate US$455,000 result in the opening challenge. It differs from the separately published overall-gain calculation; the source does not explain the discrepancy. Do not rescale the path or claim the full discrepancy is rounding. The 1964 starting observation and first two endpoints are placed at September; subsequent observations end in December. No additional deposits, all dividends included, before investor fees/taxes. Linear zero-based vertical scale; the visually flatter early decades reflect the much smaller dollar base, not absence of growth.', sources: [sources.sp500History] },

    { id: 'lesson-2-review', titleZh: '回报的组成与计算', kind: 'recall', variant: 'retrieval', title: 'Components and measurement of return', group: 'RETRIEVAL', items: [
      { question: 'What two components make up total return?', answer: 'The change in the investment’s value, plus income received.' },
      { question: 'How do you turn a return amount into a return percentage?', answer: 'Divide total return by the starting value, then multiply by 100.', equations: [{ fraction: ['Total return', 'Starting value'], after: ' × 100 = Return %' }] },
    ], note: '0–4 min including the next two slides. Students retrieve from memory before opening either answer; no sentence stems or answer bank. Ask for price change AND income, then the correct denominator. No deposits or withdrawals in these one-period examples.', sources: [sources.glossary] },

    { id: 'review-total-return', titleZh: '苹果股票的总回报', kind: 'recall', variant: 'retrieval', group: 'RETRIEVAL', title: 'Total return on Apple shares', photo: photos.apple, context: 'Suppose Emma’s Apple shares cost US$1,000. One year later they are worth US$1,080, and she has received US$20 in dividends, kept as cash.', items: [
      { question: 'What is Emma’s total return amount?', equations: ['Total return = Ending value − Starting value + Income', '= 1,080 − 1,000 + 20', '= US$100'], answer: 'US$80 of price gain + US$20 of dividend income.' },
    ], note: 'Independent retrieval calculation. Do not show the formula until students have attempted it. The investor and all figures are illustrative, not reported Apple prices or dividends. No investor contributions or withdrawals; dividend cash is not included in the ending share value.' },

    { id: 'review-return-percentage', titleZh: '黄金的回报率', kind: 'recall', variant: 'retrieval', group: 'RETRIEVAL', title: 'Percentage return on gold', photo: photos.gold, context: 'Suppose Jack buys gold for ¥2,000. One year later it is worth ¥1,900. There is no income and no additional investment.', items: [
      { question: 'What are Jack’s total return and return percentage?', equations: ['Total return = 1,900 − 2,000 = −¥100', { fraction: ['−100', '2,000'], after: ' × 100 = −5%' }], answer: 'The negative sign shows a loss. Use the starting ¥2,000 as the denominator.' },
    ], note: 'Check transfer to a loss and a different starting value. Diagnose division by ending value and omission of the negative sign. These are classroom figures, not a dated gold-price claim.' },

    { id: 'objectives', titleZh: '学习目标', kind: 'objectives', variant: 'visual-roadmap', compact: true, partialReveal: true, group: 'LESSON OVERVIEW', title: 'Learning objectives', items: [
      ['01', 'Explain compound growth', '解释复利增长', 'growth'],
      ['02', 'Calculate future value', '计算若干年后的价值', 'timeline'],
      ['03', 'Interpret a compound-growth result', '解释复利增长的结果', 'projection'],
    ], note: 'Reveal three uncluttered objectives in turn: explain the mechanism, calculate future value and interpret the result. The drawings are schematic previews, not scaled data charts. No Assumed return or annualised-return content is part of this active lesson.' },

    section('section-reinvestment', '01', 'Compound growth', '复利增长', '4–15 min. Demonstrate the larger interest-earning balance, name the concepts, then distinguish simple interest.'),

    { id: 'returns-build-on-returns', bilingual: true, titleZh: '利息留存后的增长', kind: 'chart', variant: 'growth-bars', partialReveal: ['.growth-stage'], group: 'DIAGRAM', title: 'Growth with retained interest', context: model, principal: 1000, rate: .10, years: [0,1,2,3], max: 1500, ticks: [0,500,1000,1500], note: 'Reveal one bar per step. The zero-based vertical scale is identical for every year. Green is the original ¥1,000; copper is all accumulated interest. Read the increasing balances and the new interest above each bar. Before year 2, ask which balance earns the next 10%. No new money is added. ' + assumptions, sources: [sources.compound] },

    { id: 'interest-on-interest', titleZh: '利息产生的利息', kind: 'method', variant: 'equations', partialReveal: ['.equation-step'], group: 'WORKED EXAMPLE', title: 'Interest on earlier interest', context: 'Year 2 begins with ¥1,000 of original money + ¥100 of earlier interest.', steps: [
      { label: 'Interest on the original money · 本金的利息', equation: '¥1,000 × 0.10 = ¥100' },
      { label: 'Interest on the earlier interest · 利息的利息', equation: '¥100 × 0.10 = ¥10', tone: 'copper' },
      { label: 'Total interest in year 2 · 第二年的总利息', equation: '¥100 + ¥10 = ¥110' },
    ], note: 'Make the mechanism explicit: ¥100 of last year’s return now earns ¥10. It is not a higher rate or another red packet. Ask students to explain the second line before revealing the total. ' + assumptions, sources: [sources.compound] },

    { id: 'definition-compounding', highlights: ["Compounding", "later returns build on earlier returns"], highlightsZh: ["复利增长", "后期的回报在前期回报的基础上"], kind: 'definition', group: 'CONCEPT', title: 'Compound growth · 复利增长', prompt: 'Compounding is growth in which later returns build on earlier returns.', translation: '复利增长是指后期的回报在前期回报的基础上继续产生的增长。', note: 'Consolidate the visual mechanism: the original ¥1,000 earns interest, then ¥1,100, then ¥1,210. Point specifically to the extra ¥10 earned by earlier interest. English follows the glossary; Chinese is a faithful classroom translation.', sources: [sources.glossary, sources.compound] },

    { id: 'definition-reinvestment', highlights: ["Reinvestment", "income or gains", "acquire additional assets"], highlightsZh: ["再投资", "收入或收益", "增加资产"], kind: 'definition', group: 'CONCEPT', title: 'Reinvestment · 再投资', prompt: 'Reinvestment is using income or gains to acquire additional assets rather than withdrawing them.', translation: '再投资是指将收入或收益用于增加资产，而不是将其取出。', note: 'Relate the definition to the interest retained in the earlier growth chart. Retained interest increases the financial claim held in the account; a share dividend can instead buy additional shares. The return remains invested and can contribute to later returns. No fresh contribution is needed.', sources: [sources.glossary, sources.reinvestment] },

    { id: 'simple-versus-compound', titleZh: '单利与复利的区别', kind: 'compare', group: 'CONCEPT', title: 'What earns the next interest payment?', left: ['Simple interest · 单利', 'Interest is earned only on the original principal.', '只有原始本金产生利息。'], right: ['Compound interest · 复利', 'Interest is earned on the principal and earlier interest.', '本金和已累积的利息一起产生利息。'], note: 'A concise contrast replaces the former bank-deposit explanation. At the same rate, simple interest adds the same amount each year; compound interest adds more as retained interest enlarges the balance. The next graph holds the initial principal, annual rate and elapsed time equal.', sources: [sources.compound, sources.simple] },

    { id: 'simple-compound-comparison', titleZh: '单利与复利', kind: 'chart', variant: 'comparison-lines', yearByYear: true, partialReveal: ['.comparison-year'], group: 'DIAGRAM', title: 'Simple and compound interest', context: 'Start with ¥1,000 at 10% a year for 20 years. How does the gap grow?', years: Array.from({length: 21}, (_, year) => year), min: 0, max: 7000, ticks: [0,1000,2000,3000,4000,5000,6000,7000], series: [
      { label: 'Compound interest · 复利', tone: 'forest', values: Array.from({length: 21}, (_, year) => fv(1000, .10, year)) },
      { label: 'Simple interest · 单利', tone: 'copper', values: Array.from({length: 21}, (_, year) => 1000 + 100 * year) },
    ], note: 'The starting point is visible immediately. Each forward click adds exactly one year to BOTH lines and updates the balances and gap; back reverses one year. Pause at years 1, 5, 10 and 20. Ask why simple interest adds ¥100 every year while compound interest adds increasingly more. At year 10: compound ¥2,593.74, simple ¥2,000, gap ¥593.74. At year 20: compound ¥6,727.50, simple ¥3,000, gap ¥3,727.50. Fixed zero-based axes make the growing difference honest. The simple balance includes all earned interest, which is retained as non-interest-earning cash; no income is lost or spent. No new money is added. ' + assumptions },

    { id: 'mcq-new-balance', titleZh: '计算第三年的利息', kind: 'recall', variant: 'retrieval', group: 'QUICK CHECK', title: 'Interest earned in the third year', context: '¥2,000 earns 5% a year, with all interest reinvested and no extra deposits.', items: [
      { question: 'How much interest is earned in year 3 alone?', equations: ['Year 1 interest = 2,000 × 0.05 = ¥100', 'Year 1 ends: 2,000 + 100 = ¥2,100', 'Year 2 ends: 2,100 + (2,100 × 0.05) = ¥2,205', 'Year 3 interest = 2,205 × 0.05 = ¥110.25'], answer: 'Use the balance at the start of year 3. ¥315.25 would be the total interest over all three years.' },
    ], note: 'Students attempt the full calculation before opening the model. Follow each line: calculate first interest, retain it, calculate and retain second-year interest, then apply 5% to ¥2,205. The requested answer is the third year’s interest alone, not the ending balance or total growth. Explicit second-year interest: ¥2,100 × 0.05 = ¥105.' },

    section('section-future-value', '02', 'Calculating future value', '计算终值', '14–28 min. Start with FV = P(1 + r)^n. Then pose the savings goal and use the same formula in a worked example, timeline and practice. Section 1 has already demonstrated the underlying mechanism.'),

    { id: 'future-value-formula', titleZh: '复利终值公式', kind: 'method', variant: 'compound-formula', partialReveal: ['.formula-term:not(:first-child)'], group: 'CONCEPT', title: 'The compound future value formula', terms: [
      ['FV', 'Future value', '终值', 'Total amount at the end: principal + growth.', '期末总金额＝本金＋增长额'],
      ['P', 'Starting principal', '初始本金', 'Money invested at the start'],
      ['r', 'Return per period', '每期回报率', 'A decimal: 10% = 0.10'],
      ['n', 'Number of periods', '期数', 'Annual return → number of years'],
    ], note: 'The formula and concise bilingual meaning of FV are visible immediately; reveal P, r and n in turn. FV includes the original money, not just the growth. Full glossary wording for teacher reference: Future value is the projected value of money after growth over a stated period and assumed return. 终值是指在给定期间和假设回报率下，资金增长后的预计价值。 The formula abbreviates the mechanism already demonstrated in section 1. It assumes a constant return per period, full reinvestment, no added money or withdrawals, and excludes fees and tax. The separate late definition slide has been removed.', sources: [sources.glossary, sources.compound] },

    { id: 'future-goal-pause', kind: 'visual', photo: photos.phone, title: 'Could Emma’s red-packet savings buy a new iPhone?', prompt: 'Could Emma’s red-packet savings buy a new iPhone?', promptZh: 'Emma的红包积蓄能买到新iPhone吗？', note: 'Introduce Emma, a fictional Year 7 student saving for a new iPhone after Year 9. Ask what numbers students need to judge the plan. The next slide supplies the same goal, starting money, horizon, assumed return and budget. Photograph: an iPhone 17 Pro, not a claimed photograph of an iPhone 18 or any future model. The future ¥8,000 budget is invented for calculation, not a current product price.' },

    { id: 'formula-substitution', formula: 'FV = P(1 + r)^n', titleZh: 'Emma的新iPhone储蓄计划', kind: 'recall', variant: 'retrieval', group: 'WORKED EXAMPLE', title: 'Emma’s plan for a new iPhone', photo: photos.phone, context: 'Emma, in Year 7, has saved ¥6,500 in red-packet money. She wants a new iPhone after Year 9, in 3 years. Suppose her budget is ¥8,000 and her savings earn 10% a year, fully reinvested, with no extra deposits.', items: [
      { question: 'Will Emma reach her ¥8,000 target? By how much?', equations: ['P = 6,500; r = 0.10; n = 3', 'FV = 6,500 × (1.10)^3 = ¥8,651.50', 'Surplus = 8,651.50 − 8,000 = ¥651.50'], answer: 'Yes, if the assumed returns occur.' },
    ], note: 'Same student, purchase and photo as the visual pause. Students identify inputs and attempt the calculation before the model is opened. Emma and the ¥8,000 future budget are fictional; assume the budget stays fixed, ignore fees/tax. The 10% rate is for arithmetic, not a product offer. The photo depicts an iPhone 17 Pro as a representative phone, not a prediction of the model available in three years. The following timeline checks when this same target is first reached.' },

    { id: 'future-value-timeline', formula: 'FV = P(1 + r)^n', titleZh: '逐年检验储蓄结果', kind: 'chart', variant: 'future-timeline', partialReveal: ['.timeline-stage:not(:first-child)'], group: 'PRACTICE', title: 'Checking Emma’s savings year by year', context: 'Emma starts with ¥6,500 at an assumed 10% a year, with all interest reinvested.', question: 'Calculate each year-end balance. In which year is the ¥8,000 phone budget first reached?', principal: 6500, rate: .10, years: [0,1,2,3], target: 8000, note: 'The starting ¥6,500 is visible. Predict each balance before revealing: ¥7,150; ¥7,865; ¥8,651.50. The target is first reached in year 3; year 2 remains ¥135 short. Each step multiplies the previous balance by 1.10. Final growth is ¥2,151.50; the surplus above the budget is ¥651.50. No new money, fees or tax. Future budget is assumed, not a quoted phone price.' },

    { id: 'future-value-practice', formula: 'FV = P(1 + r)^n', titleZh: 'Lucy的相机储蓄计划', kind: 'recall', variant: 'retrieval', group: 'PRACTICE', title: 'Lucy’s camera savings plan', photo: photos.camera, context: 'Lucy wants a camera for her school photography club in 3 years. She has ¥2,000. Suppose her budget stays ¥2,400 and her savings earn 5% a year, fully reinvested, with no extra deposits.', items: [
      { question: 'Will Lucy have enough? Calculate the final balance and any shortfall.', equations: ['FV = 2,000 × (1.05)^3 = ¥2,315.25', 'Shortfall = 2,400 − 2,315.25 = ¥84.75'], answer: 'No: she is ¥84.75 short, even if 5% is earned each year.' },
    ], note: 'Independent formula practice before reveal. The photograph identifies the type of savings goal, not a promised model or price. Lucy and the unchanged ¥2,400 budget are fictional; ignore fees and tax. This is the final independent calculation before the summary.', sources: [sources.glossary] },

    { id: 'mcq-exponent', formula: 'FV = P(1 + r)^n', titleZh: '公式中的回报率与期数', kind: 'mcq', group: 'QUICK CHECK', title: 'Rates and periods in the formula', question: 'Which expression models ¥1,000 at 10% a year for three years with full reinvestment?', mathOptions: true, options: ['A  1,000 × (1 + 10)^3', 'B  1,000 × (1 + 0.10 × 3)', 'C  1,000 × (1 + 0.10)^3', 'D  1,000 + 0.10^3'], answer: 2, feedback: 'Use a decimal rate and repeat the whole multiplier three times. B calculates simple interest.', note: 'Check units and exponent meaning. Typeset each power as a true superscript.' },

    {
      id: 'summary-compound-growth',
      kind: 'recall',
      variant: 'retrieval',
      group: 'SUMMARY',
      title: 'Compound growth',
      titleZh: '复利增长总结',
      context: 'Return to the lesson question: can money grow when the investor adds no new money?',
      items: [
        {
          question: 'Explain the mechanism, then calculate the value of ¥1,000 after three years at 10% a year with all returns reinvested.',
          equations: ['Year 1: ¥1,000 × 1.10 = ¥1,100', 'Year 2: ¥1,100 × 1.10 = ¥1,210', 'Year 3: ¥1,210 × 1.10 = ¥1,331'],
          answer: 'Yes. Earlier returns stay invested and can earn later returns. The final value is ¥1,331 under the stated conditions.'
        }
      ],
      note: 'Final individual check. Require the mechanism as well as the calculation. The 10% rate is a stated condition of this example, not a forecast or promised return.'
    },
  ],
};
