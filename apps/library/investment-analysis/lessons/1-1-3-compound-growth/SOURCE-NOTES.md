> **Pacing update, reported 9 September 2026:** the class completed slides 1–22 and stopped before “Assumed return” (slide 23). The later material below remains in this original deck for reference, but is not recorded as taught. Continue with [Lesson 4: Assumed return](../1-1-3-assumed-return/index.html). The original one-period estimates below have been superseded by this boundary and the revised interactive syllabus.

# Compound growth — lesson evidence and teaching notes

Revised **9 September 2026**. The canonical editable lesson is `slides.js`.

## Syllabus alignment

The [current syllabus, 1.1.3](../../syllabus-2026-27.html) specifies:

1. Reinvestment and compound growth: the updated balance earns the next return.
2. Future value over several periods: introduce FV = P(1 + r)ⁿ first in the calculation section, then apply it and check it with a timeline.
3. Effects of the assumed return and the time horizon: vary one at a time in charts.
4. A projection based on assumptions is distinct from a guaranteed outcome.

The 30-slide deck uses one historical hook and two connected fictional goals. The final teaching section is **Assumed return**: compare Lin’s rate scenarios, define the concept, make all assumptions explicit, then write a conditional conclusion. Two optional questions follow the main closing slide. The first contains Lin’s three-year table and an extra-year calculation; the second tests changing annual returns. The generic projection and unrelated Microsoft example remain removed.

## Historical opening challenge

Students estimate the ending value of US$1,000 invested in 1964, matching the S&P 500 with dividends reinvested through 2025 and no additional contributions. Keep Chinese only for “reinvest dividends (股息再投资)”. Collect guesses before revealing; the closest estimate wins a small prize. A historical chart follows immediately, and the exit question returns to the reinvestment mechanism.

The source is [Berkshire Hathaway’s 2025 Annual Report, pp. 19–20](https://www.berkshirehathaway.com/2025ar/2025ar.pdf), the S&P 500 column including dividends. All 61 published returns are retained in `sp500Returns`. Starting with US$1,000, multiply each previous balance by **1 + reported return ÷ 100**. The reconstructed endpoint is **US$454,694.65**, shown consistently in the hook and chart as **about US$455,000**. Use the unrounded result to score guesses. The 1999 balance is about US$60,316; the 2008 return is −37%; 2022 is −18.1%.

The earlier US$461,610 answer used the report’s separately published 46,061% overall gain. That does not exactly reconcile with compounding its rounded annual-return table. The report does not explain the discrepancy; do not assert that rounding alone explains it. This revision uses the annual reconstruction consistently rather than rescaling the path or substituting the rounded 10.5% annualised rate.

Follow the footnote: the 1965 and 1966 observations end 30 September; 1967 covers 15 months to 31 December. The reconstruction begins 30 September 1964, not year-end 1964. The first coordinates are 1964.75, 1965.75 and 1966.75; remaining observations end in December. The chart uses a zero-based linear dollar scale and actual time spacing. This is a hypothetical index-matching investment, not a claim an index fund existed in 1964. Values are nominal, before investor fees/taxes. Historical growth is not a promised future path.

## Classroom models and checked arithmetic

The red-packet scenario, savings target, named students and share-calculation figures are illustrative. They are not real transactions, company dividend announcements or current product prices. All models exclude fees and tax, retain returns and add no new money unless the question states otherwise. The **10% annual rate** is deliberately simple arithmetic; it is **not a quoted bank rate or forecast**.

| Calculation | Result |
|---|---|
| Apple retrieval: US$1,080 − US$1,000 + US$20 cash dividend | US$100 total return |
| Gold retrieval: (¥1,900 − ¥2,000) ÷ ¥2,000 × 100 | −5% |
| ¥1,000 at 10%: end of years 1, 2, 3 | ¥1,100; ¥1,210; ¥1,331 |
| Year 2: return on original money + return on earlier interest | ¥100 + ¥10 = ¥110 |
| Simple vs compound at 10% over 20 years | ¥3,000 vs ¥6,727.50; gap ¥3,727.50, counting all interest |
| Third-year interest: ¥2,000 at 5%, fully reinvested | ¥2,000 → ¥2,100 → ¥2,205; year 3 interest ¥110.25 |
| Mei’s new-iPhone budget | ¥8,000 in 3 years; ¥6,500 at 10% gives ¥8,651.50, a ¥651.50 surplus |
| Mei’s annual balances | ¥7,150; ¥7,865; ¥8,651.50; first reaches the goal in year 3 |
| Lin’s photography-club camera budget | ¥2,400 in 3 years; ¥2,000 at 5% gives ¥2,315.25, a ¥84.75 shortfall |
| Lin’s annual balances at 5% | ¥2,100; ¥2,205; ¥2,315.25 |
| Lin waits a fourth year at 5% | ¥2,431.01; extra growth ¥115.76; surplus ¥31.01 |
| Lin’s 3-year results at 3%, 5%, 7% | ¥2,185.45; ¥2,315.25; ¥2,450.09 |
| Optional: Jun’s ¥2,000 gains 20%, then loses 20% | ¥2,400 then ¥1,920; loss ¥80 |

Full precision is retained until monetary display. These are fictional savings plans, not observed performance. All bar charts have a zero baseline; principal and accumulated returns are proportional to value. Hold Lin’s starting money and budget fixed, changing only time or the assumed rate. Both the three-year and four-year results are conditional.

## Definitions

English definitions retain the syllabus glossary. Chinese translations support the full definition, rather than translating only the title.

| Term | English | 中文 |
|---|---|---|
| Compound growth | Compounding is growth in which later returns build on earlier returns. | 复利增长是指后期的回报在前期回报的基础上继续产生的增长。 |
| Reinvestment | Reinvestment is using income or gains to acquire additional assets rather than withdrawing them. | 再投资是指将收入或收益用于增加资产，而不是将其取出。 |
| Future value | Future value is the projected value of money after growth over a stated period and assumed return. | 终值是指在给定期间和假设回报率下，资金增长后的预计价值。 |
| Assumed return | An assumed return is a rate used in a projection; it is an input and not a promised outcome. | 假设回报率是预测计算中采用的回报率；它是输入条件，而不是承诺的结果。 |

[Investor.gov: compound interest](https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest) supports returns on prior returns. [Investor.gov: dividend reinvestment](https://www.investor.gov/introduction-investing/getting-started/investing-your-own/direct-investing) supports acquiring additional shares with dividend income.

## Simple and compound interest

Two concise columns contrast interest on the original principal with interest on principal plus prior interest. The following chart holds starting money (¥1,000), annual rate (10%) and elapsed time equal over 20 years. Both series start visibly at year 0; each forward click adds one year and updates both balances and their gap, with back reversing one year. Fixed zero-based axes remain unchanged. At year 10 the balances are ¥2,000 (simple) and ¥2,593.74 (compound); at year 20 they are ¥3,000 and ¥6,727.50. Simple-interest earnings remain as non-interest-earning cash. The gap comes from interest earning interest. No future endpoint values are shown before their year is reached.

## Photographs and visual pauses

Original downloaded photographs remain unmodified; CSS fits them for classroom display. The cover is an AI-generated conceptual illustration of increasingly large additions to coin stacks, not a historical photo or scaled chart. The opening uses only difficult-term Chinese. The new-iPhone pause introduces the same Mei, goal and photograph as the calculation. Its image is an iPhone 17 Pro representing a future phone purchase; it is not described as an iPhone 18 or a forecast of a future model. The ¥8,000 future budget is fictional. Lin’s camera case now includes a camera photograph.

| Local course asset | Credit / licence | Source and teaching purpose |
|---|---|---|
| `lesson-03/compound-growth-coins.png` | OpenAI ImageGen, built-in tool, 9 September 2026 | Conceptual cover, saved in the course asset directory. |
| `lesson-02/nasdaq-stock-market-display.jpg` | bfishadow, CC BY 2.0 | [Original](https://commons.wikimedia.org/wiki/File:NASDAQ_stock_market_display.jpg): a US share-market scene for the hook, not a depiction of the S&P 500 index or a claim that NASDAQ and S&P 500 returns are identical. |
| `lesson-03/iphone-17-pro.jpg` | 茅野ふたば, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [Original](https://commons.wikimedia.org/wiki/File:IPhone_17_Pro.jpg): a representative iPhone for Mei’s future purchase. Original unchanged; CSS framing only. |
| `lesson-03/camera-canon-eos.jpg` | Thomas Wolf, [www.foto-tw.de](https://www.foto-tw.de), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | [Original on Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Canon_EOS_400D.jpg): camera for Lin’s photography goal. Original unchanged; CSS fits the whole camera. |
| `lesson-02/apple-fifth-avenue-new.jpg` | Ed Uthman, CC BY-SA 2.5 | [Original](https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg): company identification in retrieval. |

Cover prompt (built-in ImageGen): “Use case: photorealistic-natural. Asset type: wide 16:9 cover photograph for a classroom lesson titled Compound growth, with title overlay on the left. Primary request: an elegant macro still life representing compound interest: five stacks of coins increasing in height by increasingly large increments across the right two-thirds of the frame, each stack visibly retaining a base of silver coins with additional warm copper coins above, showing returns building on earlier returns. A small green seedling beside the largest stack reinforces growth. Realistic metal texture, natural side lighting, warm paper and deep forest tones, dark softly blurred negative space on the left for the lesson title. Editorial photographic style, believable physical stacks, no charts, no arrows, no written text, no numbers, no logos, no watermark. This is a conceptual illustration, not historical evidence.”

## Original estimated sequence (superseded by the pacing update)

- 0–4 minutes: opening prediction and Lesson 2 retrieval/calculations.
- 4–14: compound growth; retained-interest chart; interest on earlier interest; definitions; simple-versus-compound comparison and balance checkpoint.
- 14–28: **FV = P(1 + r)ⁿ first**, with FV immediately explained as the final total (principal plus growth) in English and Chinese. After the phone picture, calculate whether Mei reaches ¥8,000. Check the same result year by year; then apply the formula independently to Lin’s camera case with a picture. The formula stays visible through practice.
- 28–40: compare Lin’s 3-year scenarios at 3%, 5% and 7%; define assumed return; compare historical US and Chinese asset returns, then apply the distinction between a long-run average and an annual outcome to Lin; explicitly list the forecast conditions; evaluate her claim and return to the opening investment. Allow about 4 minutes for the new evidence sequence, or extend the main lesson slightly if discussion runs longer.
- If time remains: two clearly labelled optional tasks after the ending, both with full hidden answers. Lin’s annual table plus a fourth-year calculation explores time; Jun’s gain/loss question shows why changing annual returns require separate yearly factors.

Use the same forward/back controls for chart stages. Retrieval methods stay hidden until “Show answer” is opened. Equations use upright type, true superscripts and stacked fractions. Narrow screens allow horizontal chart scrolling rather than shrinking all labels to illegibility. No lesson route or title changed; content-manifest rebuilding is unnecessary.

## Long-run asset evidence added 9 September 2026

The paired photographic comparisons use **2005–2025 inclusive**, from end-2004 to end-2025: 21 years. “Average” means the annualised geometric/compound rate, not an arithmetic mean. US figures are in USD; China figures are in RMB. There is no common-currency conversion or claim these are the returns a Chinese investor would obtain abroad. Returns are nominal, before investor costs/taxes; stock dividends and bond interest are reinvested. Gold has price growth only. The snapshot cards emphasise annualised return and ending wealth. China retains a smaller US reference rate in USD. Asset colours remain consistent on the following comparative line graphs: green shares, blue government bonds, copper gold.

### United States: reproducible calculation

[Aswath Damodaran, NYU Stern, Historical Returns on Stocks, Bonds and Bills](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html), updated 5 January 2026. Compute `100 × ((end2025 / end2004)^(1/21) − 1)` from published cumulative wealth columns. Compute growth of 1,000 from the same wealth ratio, without exponentiating the rounded displayed rate.

| Asset | End-2004 cumulative wealth | End-2025 cumulative wealth | Annualised rate | 1,000 becomes |
|---|---:|---:|---:|---:|
| S&P 500 including dividends | 139,341.42 | 1,157,598.95 | 10.61% | ≈8,308 |
| Rolling 10-year US Treasury bonds | 4,331.30 | 7,752.88 | 2.81% | ≈1,790 |
| Gold in USD | 2,110.47 | 21,025.41 | 11.57% | ≈9,962 |

The Treasury figure includes bond-price changes, not just coupons. Gold narrowly beats shares in this selected window; do not present the ranking as universal or permanent.

### China: benchmark definitions and estimates

[Chen Peng / 有知有行, SBBI China Yearbook 2025, chapter 1](https://youzhiyouxing.cn/sbbi2025/cumulative-chart/) provides the annualised figures: CSI 300 total return **9.71%**; ChinaBond 7–10-year Treasury wealth index **4.36%**; Shanghai Gold Exchange Au9999 **10.57%**. These are broad portfolios/indices, not single securities. [Appendix](https://youzhiyouxing.cn/sbbi2025/appendix/) gives end-2025 multiples on an end-2004 base of 1: **7.00, 2.45, 8.26**. Multiplying these published rounded multiples by 1,000 gives the approximate slide endpoints.

The [estimation appendix](https://youzhiyouxing.cn/sbbi2025/estimated-data/) documents estimated 2005 CSI 300 dividends and estimated early 2005–2006 government-bond observations. It also reports the CSI 300's **−65.61%** total return in 2008, used to distinguish the 21-year compound equivalent from annual outcomes. US/China bond maturities and index construction differ; this is a comparison of representative asset categories, not perfectly identical instruments. The scenario question returns to Lin's three-year deadline and her stated forecast conditions.

### Added and reused asset photographs

All originals are unchanged; CSS frames them for the slide. New Chinese-market images were downloaded specifically for this comparison.

| Asset | Creator / licence | Original source |
|---|---|---|
| `lesson-03/shanghai-stock-exchange.jpg` | 钉钉, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [Shanghai Stock Exchange6.jpg](https://commons.wikimedia.org/wiki/File:Shanghai_Stock_Exchange6.jpg), 26 June 2022; represents the Chinese share market, while CSI 300 also includes Shenzhen. |
| `lesson-03/china-finance-ministry.jpg` | N509FZ, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [Ministry of Finance of PRC, south wing](https://commons.wikimedia.org/wiki/File:Ministry_of_Finance_of_PRC,_south_wing_(20201028170321).jpg), 28 October 2020; identifies the government bond issuer. |
| `lesson-02/us-treasury-building.jpg` | MeanieHyaena, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [US Treasury building](https://commons.wikimedia.org/wiki/File:Us-treasury-building.jpg); identifies the issuer, not a particular bond security. |
| `lesson-02/gold-bullion-bars.jpg` | Stevebidmead, CC0 | [Gold bullion bars](https://commons.wikimedia.org/wiki/File:Gold_bullion_bars.jpg); accompanies Jun’s retrieval calculation and gold in both currencies. |

Selective copper/bold emphasis now marks key definition terms and meaning-bearing phrases in both languages; English and Chinese wording is preserved. This preference and visual historical comparisons are recorded in the course-wide teaching brief.


## Comparative historical line graphs and visual revision

Each country’s snapshot now leads directly into a three-series line graph. Both graphs begin at **1,000 at end-2004**, contain **22 annual observations through end-2025**, and use the same **zero-based 0–11,000 scale**. The US graph is in dollars and the China graph in renminbi; no FX comparison is implied. Direct endpoint labels match the preceding cards. The photographs, large annualised rates and colour cues provide a clear hierarchy on the snapshot slides, with asset-by-asset result reveals retained.

The US paths use NYU’s cumulative-wealth columns for S&P 500, 10-year Treasury bonds and gold: divide each year’s cumulative value by its end-2004 value and multiply by 1,000. The China paths multiply the published SBBI Appendix 1.1 wealth multiples by 1,000. China’s source rounds its multiples to two decimals, making plotted balances approximate to about ¥10. Full numerical series are frozen in the lesson source as `usAssetWealth` and `chinaAssetWealth`.

These are historical paths, not smooth curves computed from the annualised rates. Straight segments connect annual observations and omit within-year movements. Shares and bonds include reinvested income; gold has none. Preserve the earlier benchmark and estimated-observation caveats. The US question asks whether the eventual winner always led. The China question directs attention to the 2008 fall and returns to Lin’s three-year deadline. Allow another 2–3 minutes to discuss both graphs.
