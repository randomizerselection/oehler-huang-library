window.INVESTMENT_COURSE = window.INVESTMENT_COURSE || {};

const imageRoot = '../../course-assets/images/lesson-02/';
const photos = {
  hero: {
    src: `${imageRoot}nasdaq-stock-market-display.jpg`,
    alt: 'The NASDAQ MarketSite display showing real share prices and percentage changes.',
    credit: 'bfishadow / Wikimedia Commons · CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:NASDAQ_stock_market_display.jpg',
    position: '58% 50%',
  },
  apple: {
    src: `${imageRoot}apple-fifth-avenue-new.jpg`,
    alt: 'The glass cube and prominent Apple logo at the Apple Fifth Avenue store in New York City.',
    credit: 'Ed Uthman, MD / Wikimedia Commons · CC BY-SA 2.5',
    source: 'https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg',
    position: '50% 50%',
  },
  cocaCola: {
    src: `${imageRoot}coca-cola-bottles.jpg`,
    alt: 'Glass Coca-Cola bottles arranged in red delivery crates.',
    credit: 'Alex Proimos / Wikimedia Commons · CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Coca_Cola_Bottles_(7088682579).jpg',
    position: '48% 50%',
  },
  treasury: {
    src: `${imageRoot}us-treasury-building.jpg`,
    alt: 'The United States Treasury Building in Washington, D.C.',
    credit: 'MeanieHyaena / Wikimedia Commons · CC BY 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Us-treasury-building.jpg',
    position: '50% 63%',
  },
  lokFu: {
    src: `${imageRoot}lok-fu-place-2025.jpg`,
    alt: 'The entrance to Link REIT\'s Lok Fu Place shopping centre in Hong Kong.',
    credit: 'Hzam M93008 TWCKMMOU / Wikimedia Commons · CC0',
    source: 'https://commons.wikimedia.org/wiki/File:HK_WTSD_%E6%A8%82%E5%AF%8C%E5%BB%A3%E5%A0%B4_Lok_Fu_Place_mall_B_zone_exit_and_entrance_near_Lok_Fu_MTR_Station_June_2025_R12S_06.jpg',
    position: '50% 53%',
  },
  gold: {
    src: `${imageRoot}gold-bullion-bars.jpg`,
    alt: 'A large group of physical gold bullion bars.',
    credit: 'Stevebidmead / Wikimedia Commons · CC0',
    source: 'https://commons.wikimedia.org/wiki/File:Gold_bullion_bars.jpg',
    position: '50% 52%',
  },
  reviewInvestment: {
    src: `${imageRoot}apple-fifth-avenue-new.jpg`,
    alt: 'The Apple logo identifies the company whose shares represent financial investment and part-ownership.',
    credit: 'Ed Uthman, MD / Wikimedia Commons · CC BY-SA 2.5',
    source: 'https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg',
    position: '50% 44%',
  },
  hookCocaCola: {
    src: `${imageRoot}coca-cola-classic-original.jpg`,
    alt: 'Coca-Cola branded bottles identify the company in the share-return comparison.',
    credit: 'DeusXFlorida / Wikimedia Commons · CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Coca-Cola_bottles.jpg',
    position: '50% 48%',
  },
  reviewSaving: {
    src: `${imageRoot}review-saving-piggybank.jpg`,
    alt: 'A person placing a coin into a piggy bank beside cash, representing income kept rather than spent.',
    credit: '401(K) 2012 / Wikimedia Commons · CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Putting_money_into_a_piggybank.jpg',
    position: '46% 42%',
  },
  reviewSpeculation: {
    src: `${imageRoot}review-speculation-trading-apps.jpg`,
    alt: 'A mobile phone showing trading apps, representing short-term trading based on expected price changes.',
    credit: 'forextime.com / Wikimedia Commons · CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Trading_apps_on_an_iPhone_screen.jpg',
    position: '50% 48%',
  },
};

const sources = {
  glossary: {
    label: 'Source of truth: investment-analysis course-map glossary (termBank)',
  },
  applePricesHistorical: {
    label: 'SEC filing · historical Apple closes (Bloomberg data)',
    href: 'https://www.sec.gov/Archives/edgar/data/886982/000095017025051694/aapldi04_prelim.htm',
  },
  applePrices2026: {
    label: 'Nasdaq · AAPL historical data to 31 Jul 2026',
    href: 'https://www.nasdaq.com/market-activity/stocks/aapl/historical',
  },
  appleDividends: {
    label: 'Apple Investor Relations · dividend history',
    href: 'https://investor.apple.com/dividend-history/',
  },
  cocaColaPrices2026: {
    label: 'Nasdaq · KO historical data to 31 Jul 2026',
    href: 'https://www.nasdaq.com/market-activity/stocks/ko/historical',
  },
  cocaColaDividendQ1_2026: {
    label: 'The Coca-Cola Company · first 2026 quarterly dividend',
    href: 'https://www.coca-colacompany.com/media-center/board-elects-new-officer-and-approves-annual-dividend-increase',
  },
  cocaColaDividendQ2_2026: {
    label: 'The Coca-Cola Company · second 2026 quarterly dividend',
    href: 'https://www.coca-colacompany.com/media-center/board-of-directors-elects-two-new-officers-and-declares-regular-quarterly-dividend',
  },
  treasuryNotes: {
    label: 'TreasuryDirect · Treasury notes',
    href: 'https://treasurydirect.gov/marketable-securities/treasury-notes/',
  },
  treasuryAuction2026: {
    label: 'U.S. Treasury · 10-year note auction result, 11 Feb 2026',
    href: 'https://www.treasurydirect.gov/instit/annceresult/press/preanre/2026/R_20260211_2.pdf',
  },
  linkProperty: {
    label: 'Link REIT · Lok Fu Place property profile',
    href: 'https://www.linkreit.com/en/business/properties/lok-fu-place/',
  },
  linkIdentity: {
    label: 'Link · About us: the named Hong Kong-listed REIT and its property portfolio',
    href: 'https://www.linkreit.com/en/about-us/',
  },
  externalCashFlow: {
    label: 'CFA Institute · GIPS Standards Handbook: external cash flows',
    href: 'https://www.gipsstandards.org/standards/gips-standards-for-firms/gips-standards-handbook-for-firms/',
  },
  link2026: {
    label: 'Link REIT · FY2025/26 five-year performance summary',
    href: 'https://www.linkreit.com/-/media/linkreit/investor-relations/financial-data/financial-highlights/ar2526-five-year-performance-summary_en.pdf',
  },
  gold2026: {
    label: 'World Gold Council · gold market commentary, July 2026',
    href: 'https://www.gold.org/goldhub/research/gold-market-commentary-july-2026',
  },
  goldIncome: {
    label: 'World Gold Council · Gold has no regular cash flow',
    href: 'https://www.gold.org/goldhub/research/relevance-of-gold-as-a-strategic-asset/risks-and-challenges',
  },
};

window.INVESTMENT_COURSE.lesson = {
  meta: {
    code: 'IC-L02',
    lesson: 2,
    title: 'Measuring investment return',
    titleZh: '衡量投资回报',
    course: 'Investment Course',
    source: '../../syllabus-2026-27.html · 1.1.2',
    designReference: 'Investment Course Lesson 2 · approved HTML classroom deck',
  },
  photos,
  slides: [
    { id: 'hero', kind: 'hero', title: 'Measuring investment return', zh: '衡量投资回报', syllabus: [
      { code: '1', title: 'Investment foundations and return', zh: '投资基础与回报' },
      { code: '1.1', title: 'Investment, saving and return', zh: '投资、储蓄与回报' },
      { code: '1.1.2', title: 'Measuring investment return' },
    ], photo: photos.hero, note: 'Use the syllabus hierarchy to locate the lesson within Unit 1. The current 1.1.2 level is emphasised; the cover does not use decorative key-term boxes.' },
    { id: 'opening-dilemma', kind: 'discussion', variant: 'real-hook', partialReveal: true, group: 'COMPANY SHARE RETURNS', title: "Both paid dividends. Why was Coca-Cola's return almost twice Apple's?", periods: [
      { year: 'Apple · Jan–Jul 2026', photo: photos.reviewInvestment, tone: 'gain', rows: [['Starting share price', 'US$271.86'], ['Ending share price', 'US$308.91'], ['Dividends per share', 'US$0.53']], result: '+13.8% total return' },
      { year: 'Coca-Cola · Jan–Jul 2026', photo: photos.hookCocaCola, tone: 'gain', rows: [['Starting share price', 'US$69.91'], ['Ending share price', 'US$87.59'], ['Dividends per share', 'US$1.06']], result: '+26.8% total return' },
    ], note: 'Reveal the Apple evidence first and the Coca-Cola evidence second. Use this single current-market question as an unresolved hook. Students should notice that the much larger Coca-Cola price rise—not dividend income alone—explains most of the difference. Do not teach the formula yet.', sources: [sources.applePrices2026, sources.appleDividends, sources.cocaColaPrices2026, sources.cocaColaDividendQ1_2026, sources.cocaColaDividendQ2_2026] },
    { id: 'objectives', kind: 'objectives', partialReveal: true, group: 'TOTAL RETURN', title: 'Today', items: [
      ['01', 'Explain the components of total return', '解释总回报的构成'],
      ['02', 'Calculate total return amount and percentage', '计算总回报额与总回报率'],
      ['03', 'Use total return percentage to compare fairly', '用总回报率公平比较投资'],
    ], note: 'Reveal the three bilingual objectives one at a time as the lesson roadmap.' },
    { id: 'recall-attempt', kind: 'recall', group: 'LESSON 1 REVIEW', title: 'Lesson 1 review', items: [
      { term: 'Financial investment', termZh: '金融投资', imageLabel: 'Apple shares · Part-ownership', photo: photos.reviewInvestment, text: 'means putting money into financial assets to seek future total ______. Possible ______ remains.', answers: ['return', 'loss'] },
      { term: 'Saving', termZh: '储蓄', imageLabel: 'Example · Income kept for later', photo: photos.reviewSaving, text: 'is current income not spent now. It emphasises capital ______ and ______.', answers: ['preservation', 'liquidity'] },
      { term: 'Speculation', termZh: '投机', imageLabel: 'Example · Short-term trading', photo: photos.reviewSpeculation, text: 'means trading mainly to profit from a predicted ______ change.', answers: ['price'] },
    ], note: 'Ask students to supply the missing words, then reveal each in place. The financial asset is an Apple share, not the pictured store building. The photograph identifies the issuer. Concise classroom paraphrase of termBank.financialInvestment: Financial investment means putting money into an asset to seek future total return. Total return equals income plus the change in market value. Evidence can support the expectation, but possible loss remains. Saving and speculation retain the glossary meanings.', sources: [sources.glossary] },
    { id: 'section-total', kind: 'section', number: '01', title: 'Total return amount and its components', zh: '总回报额及其构成', note: 'Section 1 identifies price change, income and the total return amount.' },
    { id: 'pause-total', kind: 'visual', title: 'Coca-Cola total return · January to July 2026', photo: photos.cocaCola, visualCard: { eyebrow: 'COCA-COLA · KO · JAN–JUL 2026', title: 'Coca-Cola total return · January to July 2026', metrics: [['Share-price change', 'US$69.91 → US$87.59'], ['Dividend income paid', 'US$1.06 per share'], ['Total return', '+26.8%']], prompt: 'An investor held one Coca-Cola share during the period shown. Which part of the return came from the price change, and which part came from income?' }, note: 'This current real-company table separates the two components of Coca-Cola total return over one clearly dated holding period.', sources: [sources.cocaColaPrices2026, sources.cocaColaDividendQ1_2026, sources.cocaColaDividendQ2_2026] },
    { id: 'definition-total-attempt', kind: 'definition', group: 'TOTAL RETURN AMOUNT', title: 'Total return · 总回报', key: 'KEY TERM · 总回报', prompt: 'Total return combines ______ change and ______ received over a stated holding period.', blankAnswers: ['price', 'income'], note: 'Ask students to supply the missing words, then reveal in place. The completed definition follows the glossary. 总回报把价格变化与收到的收入结合起来。', sources: [sources.glossary] },
    { id: 'return-components', kind: 'components', partialReveal: true, group: 'TOTAL RETURN AMOUNT', title: 'Know the four classification options', items: [
      { term: 'Capital gain', zh: '资本利得', definition: "An increase in an asset's value above its purchase price.", example: 'Apple share: US$271.86 → US$308.91 (Jan–Jul 2026).', tone: 'gain' },
      { term: 'Capital loss', zh: '资本损失', definition: "A fall in an asset's value below its purchase price.", example: 'Apple share: US$177.57 → US$129.93 (2022).', tone: 'loss' },
      { term: 'Income', zh: '收入', definition: 'Payments from an investment, such as dividends or interest.', example: 'Apple dividends: US$0.53 per share (Jan–Jul 2026).', tone: 'income' },
      { term: 'External cash flow', zh: '外部现金流', definition: 'Money the investor adds to or withdraws from a portfolio—not return.', example: 'Example: adding CNY 500 from a bank account.', tone: 'external' },
    ], note: 'Reveal the four options one at a time. These are concise classroom paraphrases, not replacements for the glossary. Full capital-gain definition: A capital gain is the increase in an asset\'s value compared with its purchase price when measured or realised. A gain or loss may be unrealised; a sale is not required to measure it. External cash flow is the standard GIPS term for capital entering or leaving a portfolio; dividends and other investment income are not investor contributions. The cash-only classroom example is intentionally simpler than transfers of investments in kind.', sources: [sources.glossary, sources.externalCashFlow, sources.applePrices2026, sources.applePricesHistorical, sources.appleDividends] },
    { id: 'asset-returns-shares-bonds', kind: 'assetReturns', partialReveal: true, group: 'TOTAL RETURN AMOUNT', title: 'Shares and bonds create return differently', items: [
      { asset: 'SHARE', assetZh: '股票', title: 'Apple · Jan–Jul 2026', photo: photos.apple, fact: 'A share is part-ownership of a company.', mechanisms: [
        { type: 'CAPITAL GAIN', zh: '资本利得', text: 'US$271.86 → US$308.91 per share.', result: '+US$37.05 per share', tone: 'gain' },
        { type: 'INCOME · DIVIDEND', zh: '收入 · 股息', text: 'Two dividends during Jan–Jul 2026.', result: 'US$0.53 per share', tone: 'income' },
      ] },
      { asset: 'BOND · TREASURY NOTE', assetZh: '债券 · 美国中期国债', title: '10-year U.S. Treasury note', photo: photos.treasury, fact: 'A loan to the U.S. government, issued in Feb 2026.', mechanisms: [
        { type: 'CAPITAL GAIN / LOSS', zh: '资本利得 / 损失', text: 'Its sale price before maturity may rise or fall.', result: 'Market-price change', tone: 'gain' },
        { type: 'INCOME · COUPON', zh: '收入 · 票息', text: '4.125% yearly interest, paid twice a year.', result: 'US$41.25 a year per US$1,000 face value', tone: 'income' },
      ] },
    ], note: 'Reveal the share and bond cards in sequence. Price change is one part of return; dividend or coupon income is the other. For this Treasury note, 4.125% of US$1,000 face value is US$41.25 per year, paid as two US$20.625 instalments.', sources: [sources.applePrices2026, sources.appleDividends, sources.treasuryNotes, sources.treasuryAuction2026] },
    { id: 'asset-returns-property-gold', kind: 'assetReturns', partialReveal: true, group: 'TOTAL RETURN AMOUNT', title: 'A REIT may pay distributions; physical gold pays no income', items: [
      { asset: 'REIT', assetZh: '房地产投资信托基金', title: 'Link REIT · 领展 · FY2025/26', photo: photos.lokFu, fact: 'Link is the name of a Hong Kong-listed REIT. It owns Lok Fu Place, pictured here.', mechanisms: [
        { type: 'CAPITAL LOSS', zh: '资本损失', text: 'Unit price fell from HK$36.40 to HK$36.02.', result: '−HK$0.38 per unit', tone: 'loss' },
        { type: 'INCOME · DISTRIBUTION', zh: '收入 · 分派', text: 'Property rents support cash payments to investors.', result: 'HK$2.5361 per unit', tone: 'income' },
      ] },
      { asset: 'PHYSICAL GOLD', assetZh: '实物黄金', title: 'USD gold price · Jan–Jul 2026', photo: photos.gold, fact: 'A physical asset, not a share in a company or a loan.', mechanisms: [
        { type: 'CAPITAL LOSS', zh: '资本损失', text: 'The market price of gold fell during this period.', result: '−7.8% in USD', tone: 'loss' },
        { type: 'INCOME', zh: '收入', text: 'No dividend, coupon interest or rent.', result: 'None', tone: 'none' },
      ] },
    ], note: 'Reveal the two asset cards in sequence. Link (领展) is the proper name in Link Real Estate Investment Trust, a Hong Kong-listed REIT, not a type of REIT. The image shows its Lok Fu Place shopping centre. Investors hold financial units in the REIT rather than directly owning the pictured physical property. Income is not automatic: it depends on what the asset produces or promises to pay. Distribution income exceeded the capital loss in FY2025/26; physical gold has no regular income.', sources: [sources.linkIdentity, sources.linkProperty, sources.link2026, sources.gold2026, sources.goldIncome] },
    { id: 'return-examples', kind: 'three', variant: 'market-data', partialReveal: true, group: 'TOTAL RETURN AMOUNT', title: 'How price change and income combined from January to July 2026', items: [{ title: 'Apple share · 2026', photo: photos.apple, components: [['PRICE CHANGE', '+13.6%', 'gain', '价格变动'], ['INCOME', 'US$0.53 per share', 'income', '收入'], ['TOTAL RETURN', '+13.8%', 'total', '总回报']] }, { title: 'Physical gold · USD 2026', photo: photos.gold, components: [['PRICE CHANGE', '−7.8%', 'loss', '价格变动'], ['INCOME', 'None', 'none', '收入'], ['TOTAL RETURN', '−7.8% before costs', 'total', '总回报']] }, { title: 'Coca-Cola share · 2026', photo: photos.cocaCola, components: [['PRICE CHANGE', '+25.3%', 'gain', '价格变动'], ['INCOME', 'US$1.06 per share', 'income', '收入'], ['TOTAL RETURN', '+26.8%', 'total', '总回报']] }], note: 'Reveal the three current-market examples one at a time. All three columns use the same 31 December 2025 to 31 July 2026 measurement window. The picture-plus-table design makes capital gain or loss visually distinct from income; physical gold has no income.', sources: [sources.applePrices2026, sources.appleDividends, sources.gold2026, sources.goldIncome, sources.cocaColaPrices2026, sources.cocaColaDividendQ1_2026, sources.cocaColaDividendQ2_2026] },
    { id: 'classify-attempt', kind: 'classify', group: 'TOTAL RETURN AMOUNT', title: 'Classify each example', options: ['Capital gain · 资本利得', 'Capital loss · 资本损失', 'Income · 收入', 'External cash flow · 外部现金流'], items: ['Apple share price rose by US$37.05 from January to July 2026', 'Apple paid US$0.53 in dividends per share during the period', 'A Treasury note (美国中期国债) pays its coupon interest (票息)', 'Link REIT (领展) paid HK$2.5361 per unit', 'Link REIT\'s unit price fell by HK$0.38 in FY2025/26', 'The investor adds CNY 500 from a bank account to the portfolio'], answers: ['Capital gain · 资本利得', 'Income · 收入', 'Income · 收入', 'Income · 收入', 'Capital loss · 资本损失', 'External cash flow · 外部现金流'], note: 'Ask students to choose from the four options. Each row reveals in place. The last row is an illustrative investor contribution, not a real company payment.', sources: [sources.externalCashFlow, sources.applePrices2026, sources.appleDividends, sources.treasuryNotes, sources.link2026] },
    { id: 'formula-attempt', kind: 'flow', group: 'TOTAL RETURN AMOUNT', title: 'How to calculate the total return amount', steps: [['01', 'Ending value'], ['02', '− ______ value', ['starting']], ['03', '+ ______', ['income']], ['04', '= total return amount']], note: 'Ask students to complete the two blanks, then reveal in place. This simple holding-period formula assumes no investor deposits or withdrawals, and income is not already included in ending value.' },
    { id: 'check-components', kind: 'mcq', group: 'TOTAL RETURN AMOUNT', title: 'Check your understanding', question: 'An investor held one Coca-Cola share from January to July 2026. Its price rose from US$69.91 to US$87.59 and it paid US$1.06 in dividends; which measure combines both changes?', options: ['A  Capital gain · 资本利得', 'B  Dividend income · 股息收入', 'C  Total return · 总回报', 'D  Ending share price'], answer: 2, feedback: 'Total return combines price change and income over the same holding period.', note: 'Students choose, then receive the explanation in place using the current Coca-Cola example.', sources: [sources.cocaColaPrices2026, sources.cocaColaDividendQ1_2026, sources.cocaColaDividendQ2_2026] },
    { id: 'section-calculate', kind: 'section', number: '02', title: 'Calculating total return percentage', zh: '计算总回报率', note: 'Section 2 converts the total return amount into a percentage of the starting value.' },
    { id: 'pause-calculate', kind: 'visual', title: 'Apple return data · January to July 2026', photo: photos.apple, visualCard: { eyebrow: 'APPLE · AAPL · JAN–JUL 2026', title: 'Apple return data · January to July 2026', metrics: [['Starting value · 31 Dec 2025', 'US$271.86'], ['Ending value · 31 Jul 2026', 'US$308.91'], ['Dividend income paid', 'US$0.53 per share']], prompt: 'An investor held one Apple share from 31 December 2025 to 31 July 2026. Use the figures shown to calculate the total return amount and percentage.' }, note: 'This table uses the latest complete month-end period available when the lesson was updated.', sources: [sources.applePrices2026, sources.appleDividends] },
    { id: 'method-attempt', kind: 'method', group: 'RETURN PERCENTAGE', title: 'Calculate total return percentage in four steps', steps: [['1', 'Find capital ______', ['gain or loss']], ['2', 'Add ______', ['income']], ['3', 'Divide by starting ______', ['value']], ['4', '× 100 and ______', ['interpret']]], note: 'Each answer reveals in place; no duplicate method slide follows.' },
    { id: 'worked-example', kind: 'worked', partialReveal: true, group: 'RETURN PERCENTAGE', title: 'Worked calculation · Apple return, January–July 2026', photo: photos.apple, data: [['STARTING VALUE', 'US$271.86'], ['ENDING VALUE', 'US$308.91'], ['DIVIDEND INCOME', 'US$0.53']], steps: [{ label: '1 · CAPITAL GAIN', labelZh: '资本利得', calculation: '308.91 − 271.86', result: 'US$37.05' }, { label: '2 · TOTAL RETURN AMOUNT', labelZh: '总回报额', calculation: '37.05 + 0.53', result: 'US$37.58' }, { label: '3 · TOTAL RETURN PERCENTAGE', labelZh: '总回报率', calculation: '37.58 ÷ 271.86 × 100', result: '13.8%' }], conclusion: 'Interpretation: one Apple share returned about 13.8% from 31 December 2025 to 31 July 2026.', note: 'Reveal the market evidence, then each calculation step, then the interpretation. The worked calculation uses current 2026 data and the preferred image-plus-structured-data pattern.', sources: [sources.applePrices2026, sources.appleDividends] },
    { id: 'gain-practice', kind: 'practice', variant: 'case-prose', group: 'RETURN PERCENTAGE', title: 'Real investment calculation · Link REIT in FY2025/26', photo: photos.lokFu, question: 'Link REIT (领展房地产投资信托基金) is a Hong Kong-listed property fund that owns shopping centres such as Lok Fu Place, pictured here.\n\nOver FY2025/26, an investor held one unit whose value fell from HK$36.40 to HK$36.02 and received HK$2.5361 in distributions; calculate the total return amount and percentage, then interpret the result.', note: 'The inputs appear once, inside the short case. Link is the name of this specific REIT. Distribution income more than offset its small capital loss. Ignore fees and tax.', sources: [sources.linkIdentity, sources.linkProperty, sources.link2026] },
    { id: 'gain-model', kind: 'practice', variant: 'case-prose', group: 'RETURN PERCENTAGE', reveal: true, title: 'Link REIT FY2025/26 · Model answer', photo: photos.lokFu, solution: [
      ['Capital loss', '资本损失', '36.02 − 36.40 = −HK$0.38'],
      ['Total return amount', '总回报额', '−0.38 + 2.5361 = HK$2.1561'],
      ['Total return percentage', '总回报率', '2.1561 ÷ 36.40 × 100 ≈ 5.9%'],
    ], question: 'One unit returned about 5.9% over FY2025/26, before fees and tax: distribution income outweighed the capital loss.', note: 'The answer contains worked calculations and interpretation, without repeating a separate table of case inputs.', sources: [sources.linkProperty, sources.link2026] },
    { id: 'loss-practice', kind: 'practice', variant: 'case-prose', group: 'RETURN PERCENTAGE', title: 'Historical contrast · Apple in 2022', photo: photos.apple, question: 'An investor held one Apple share throughout 2022, when its value fell from US$177.57 to US$129.93 and it paid US$0.91 in dividends.\n\nCalculate the total return amount and percentage, then interpret the result.', note: 'The inputs appear once in the case. This older record is retained to demonstrate a company-share capital loss larger than dividend income. Ignore fees and tax.', sources: [sources.applePricesHistorical, sources.appleDividends] },
    { id: 'loss-model', kind: 'practice', variant: 'case-prose', group: 'RETURN PERCENTAGE', reveal: true, title: 'Historical contrast · Apple 2022 model answer', photo: photos.apple, solution: [
      ['Capital loss', '资本损失', '129.93 − 177.57 = −US$47.64'],
      ['Total return amount', '总回报额', '−47.64 + 0.91 = −US$46.73'],
      ['Total return percentage', '总回报率', '−46.73 ÷ 177.57 × 100 ≈ −26.3%'],
    ], question: 'Dividend income reduced the loss, but total return remained negative at about −26.3%, before fees and tax.', note: 'The answer shows calculations and interpretation without a second table of inputs.', sources: [sources.applePricesHistorical, sources.appleDividends] },
    { id: 'yesno-attempt', kind: 'yesno', group: 'RETURN PERCENTAGE', title: 'Check your understanding · True or false?', items: [{ statement: 'A dividend counts as income.', answer: true, reason: 'It is a distribution received by the investor.' }, { statement: 'Money you add later counts as return.', answer: false, reason: 'It is an external cash flow: an investor contribution, not investment return.' }, { statement: 'A positive income payment guarantees a positive total return.', answer: false, reason: 'A capital loss can be larger.' }, { statement: 'A total return percentage needs the starting value.', answer: true, reason: 'It is the denominator.' }], note: 'Students decide first, then reveal each answer and reason in place.', sources: [sources.externalCashFlow] },
    { id: 'section-compare', kind: 'section', number: '03', title: 'Total return amount and total return percentage', zh: '总回报额与总回报率的区别', note: 'Section 3 explains why the two measures can support different but valid statements.' },
    { id: 'pause-compare', kind: 'visual', partialReveal: true, title: 'Return amount is not the same as return percentage', comparison: { eyebrow: 'APPLE 2026 · SAME PERFORMANCE, DIFFERENT HOLDING SIZE', title: 'Return amount is not the same as return percentage', left: ['1 Apple share', 'Start US$271.86', 'Return amount US$37.58', 'Return percentage 13.8%'], right: ['10 Apple shares', 'Start US$2,718.60', 'Return amount US$375.80', 'Return percentage 13.8%'], prompt: 'The larger holding earns more money, but both holdings have the same percentage return.' }, note: 'Reveal the one-share result, the ten-share result and then the comparison conclusion. The comparison uses the current January–July 2026 Apple record.', sources: [sources.applePrices2026, sources.appleDividends] },
    { id: 'compare-attempt', kind: 'compare', group: 'AMOUNT VS PERCENTAGE', title: 'What is the difference?', left: ['Total return amount', 'How much money was gained or lost?', 'Most meaningful when starting values are ______.', ['similar']], right: ['Total return percentage', 'Return relative to the starting investment.', 'Fairer for comparing ______ starting values.', ['unequal']], note: 'Both answers reveal in place; no duplicate slide follows.' },
    { id: 'opening-attempt', kind: 'case', group: 'AMOUNT VS PERCENTAGE', title: 'Calculate the missing return percentages', prompt: 'Calculate both percentages. Then decide who earned more money and who achieved the higher percentage return.', left: ['Investment A', 'Start CNY 2,000', 'Return CNY 200', 'Total return % = ______'], right: ['Investment B', 'Start CNY 10,000', 'Return CNY 600', 'Total return % = ______'], leftAnswers: [[], [], ['10%']], rightAnswers: [[], [], ['6%']], conclusion: 'A has the higher percentage return; B has the higher return amount.', note: 'This constructed case isolates the difference between return amount and percentage. After both blanks have been checked, the conclusion appears automatically on the same slide.' },
    { id: 'partner-attempt', kind: 'case', group: 'AMOUNT VS PERCENTAGE', title: 'Real market comparison · Apple and Coca-Cola in 2026', prompt: 'Mei bought Apple shares and Leo bought Coca-Cola shares on 31 December 2025. Using the figures below for the period ending 31 July 2026, calculate their return amounts and ending values, then compare who earned more money and who achieved the higher percentage return.', left: { title: 'Mei · Apple shares', photo: photos.apple, lines: ['Amount invested  US$20,000', 'Total return  13.8%', 'Return amount  ______', 'Ending value  ______'] }, right: { title: 'Leo · Coca-Cola shares', photo: photos.cocaCola, lines: ['Amount invested  US$10,000', 'Total return  26.8%', 'Return amount  ______', 'Ending value  ______'] }, note: 'The named investors and amounts invested are hypothetical, but both percentage returns use the same real 31 December 2025 to 31 July 2026 market period. Fees and tax are excluded.', sources: [sources.applePrices2026, sources.appleDividends, sources.cocaColaPrices2026, sources.cocaColaDividendQ1_2026, sources.cocaColaDividendQ2_2026] },
    { id: 'partner-reveal', kind: 'case', partialReveal: true, group: 'AMOUNT VS PERCENTAGE', reveal: true, title: 'Apple and Coca-Cola · Model answer', prompt: 'Leo’s Coca-Cola shares achieved the higher percentage return. Mei’s larger investment in Apple shares earned the greater dollar return amount.', left: { title: 'Mei · Apple shares', photo: photos.apple, lines: ['Return amount  US$2,760', 'Ending value  US$22,760', 'Higher amount: US$2,760'] }, right: { title: 'Leo · Coca-Cola shares', photo: photos.cocaCola, lines: ['Return amount  US$2,680', 'Ending value  US$12,680', 'Higher percentage: 26.8%'] }, note: 'Reveal the two model-answer cards one at a time. This current real-market comparison preserves the deliberate difference between the amount ranking and the percentage ranking.', sources: [sources.applePrices2026, sources.appleDividends, sources.cocaColaPrices2026, sources.cocaColaDividendQ1_2026, sources.cocaColaDividendQ2_2026] },
    { id: 'evidence-record', kind: 'record', partialReveal: true, group: 'AMOUNT VS PERCENTAGE', title: 'How to record total return in the Stock Market Game', fields: ['Starting portfolio value', 'Ending portfolio value', 'Dividends or interest', 'New deposits/withdrawals', 'Total return amount', 'Total return %', 'Measurement period'], sample: { title: 'Worked evidence record · 1 AAPL share', rows: [['Starting value', 'US$271.86'], ['Ending value', 'US$308.91'], ['Income', 'US$0.53'], ['External cash flow', 'US$0.00'], ['Return amount', 'US$37.58'], ['Return percentage', '13.8%'], ['Period', '31 Dec 2025–31 Jul 2026']] }, note: 'Reveal the field checklist first and the completed Apple evidence record second. The title states the practical purpose of the record and uses the current Apple example.', sources: [sources.applePrices2026, sources.appleDividends] },
    { id: 'mcq-attempt', kind: 'mcq', group: 'AMOUNT VS PERCENTAGE', title: 'Check your understanding', question: 'Link REIT (领展) is a Hong Kong-listed property fund that pays cash distributions supported by rental income. Its unit price fell from HK$36.40 to HK$36.02 but it distributed HK$2.5361 per unit in FY2025/26; which statement is correct?', options: ['A  The distribution guaranteed a capital gain', 'B  The total return was about +5.9%', 'C  The total return was −HK$0.38', 'D  Income never affects total return'], answer: 1, feedback: 'Total return amount = −0.38 + 2.5361 = HK$2.1561; 2.1561 ÷ 36.40 × 100 ≈ +5.9%.', note: 'Link is the proper name of the REIT. Check whether students combine its capital loss and income.', sources: [sources.linkIdentity, sources.link2026] },
    { id: 'short-answer', kind: 'short', group: 'AMOUNT VS PERCENTAGE', title: 'Real company calculation · Coca-Cola in 2026', photo: photos.cocaCola, prompt: 'Coca-Cola is a listed drinks company that pays cash dividends to shareholders. An investor bought one share for US$69.91 on 31 December 2025; by 31 July 2026 it was worth US$87.59 and had paid US$1.06 in dividends—calculate the total return amount and percentage, then interpret the result.', note: 'The short case identifies the company, investor and exact dates before asking for a current, evidence-based calculation.', sources: [sources.cocaColaPrices2026, sources.cocaColaDividendQ1_2026, sources.cocaColaDividendQ2_2026] },
    { id: 'short-model', kind: 'short', group: 'AMOUNT VS PERCENTAGE', reveal: true, title: 'Coca-Cola 2026 calculation · Model answer', photo: photos.cocaCola, prompt: 'Total return amount = (87.59 − 69.91) + 1.06 = US$18.74\nTotal return % = 18.74 ÷ 69.91 × 100 = 26.8%\nTherefore, one Coca-Cola share returned about 26.8% from 31 December 2025 to 31 July 2026.', note: 'Students self-check formula, substitution, units and interpretation alongside the real company image.', sources: [sources.cocaColaPrices2026, sources.cocaColaDividendQ1_2026, sources.cocaColaDividendQ2_2026] },
    { id: 'exit-attempt', kind: 'exit', group: 'AMOUNT VS PERCENTAGE', title: 'Final check', checks: [
      { title: 'Total return amount', zh: '总回报额', text: '= Ending value − ______ value + ______', answers: ['starting', 'income'], formula: true },
      { title: 'Total return percentage', zh: '总回报率', numerator: 'Total return amount', denominator: '______ value', answers: ['starting'] },
      { title: 'Fair comparison', zh: '公平比较', text: 'For unequal starting amounts, the ______ is usually the fairer comparison.', answers: ['percentage'] },
    ], note: 'Three numbered checks separate the amount formula, percentage formula and comparison rule. All four answers reveal individually in place; there is no duplicate final slide.' },
  ],
};

if (window.INVESTMENT_COURSE.lesson.slides.length !== 34) {
  throw new Error(`Expected 34 slides, found ${window.INVESTMENT_COURSE.lesson.slides.length}`);
}
