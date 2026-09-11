# Lesson 4: Assumed return

This 40-minute lesson continues syllabus **1.1.3 Compound growth**. The teacher reported on 9 September 2026 that Lesson 3 ended before the Assumed return divider. The remaining material is therefore taught as new learning. The revised deck has **22 core slides and three optional questions**. Nominal and real return is the following lesson.

## Sequence and checks

0–3 minutes: explicit retrieval. 3–8: objectives, Lucy’s calculation and animated rate comparison. 8–14: equivalent paths, annualised-return definition and derivation. 14–23: real gold model, independent share calculation and Lucy’s required rate. 23–30: US/China evidence. 30–34: forecast conditions. 34–38: independent exit. 38–40: feedback/buffer.

The new hard skill is `r = (FV ÷ P)^(1/n) − 1`, reversing `FV = P(1+r)^n`. This endpoint method assumes positive balances, retained income and no external cash flows. It is an equivalent yearly growth rate, not a claim of constant actual returns.

Slide 12 derives this from the previously taught formula, with one step revealed per click: divide both sides by P, take the nth root of both sides, then subtract 1 and place r first. Ratios and fractional exponents use stacked fractions with enclosing parentheses; the same notation continues through reference formulae and worked answers.

The meaning diagram compares two illustrative paths from ¥2,000 to ¥2,662 in three years, both equivalent to 10% annualised growth. The real gold worked model gives **18.07%** and independent US share calculation **14.32%**; see the revision evidence below. Lucy’s required rate is `(2400 ÷ 2000)^(1/3) − 1 ≈ 6.26586%`, reported as **6.27%**; her 5% projection is ¥84.75 short. The assumptions list consistently uses her 7% projection of ¥2,450.09. The independent exit is `(1210 ÷ 1000)^(1/2) − 1 = 10%`, with interpretation and two conditions.

The three optional questions are changing returns (`2000 × 1.20 × 0.80 = ¥1,920`, annualised return about −2.02%), Emma’s changed phone budget (¥148.50 shortfall), and Lucy’s fourth-year balance (¥2,431.01). Student cases and budgets are hypothetical. The phone photograph depicts an iPhone 17 Pro, not an asserted future model or price. The full teaching plan is retained privately in LESSON_04_PLAN.md.

## Historical evidence

The approved historical figures and paths are carried forward unchanged from Lesson 3. They are frozen through end-2025; no live-price dependence is introduced.

- **United States:** [Aswath Damodaran, NYU Stern, Historical Returns](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html), updated 5 January 2026. The 2005–2025 annualised compound rates are calculated from cumulative wealth at end-2004 and end-2025: S&P 500 **10.61%**, rolling 10-year Treasury bonds **2.81%**, gold **11.57%**. Rebased growth of US$1,000 ends at approximately **US$8,308**, **US$1,790**, **US$9,962**.
- **China:** [Chen Peng / 有知有行, SBBI China Yearbook 2025, chapter 1](https://youzhiyouxing.cn/sbbi2025/cumulative-chart/): CSI 300 total return **9.71%**, ChinaBond 7–10-year Treasury wealth index **4.36%**, Shanghai Au9999 gold **10.57%**. [Appendix 1.1](https://youzhiyouxing.cn/sbbi2025/appendix/) gives the wealth multiples used for the paths: ¥1,000 ends at approximately **¥7,000**, **¥2,450**, **¥8,260**. The [estimation appendix](https://youzhiyouxing.cn/sbbi2025/estimated-data/) documents estimated 2005 stock dividends, early 2005–2006 bond observations and the separately published **−65.61%** CSI 300 return in 2008.

Both graphs have 22 annual observations, beginning at end-2004, and the same zero-based 0–11,000 scale. USD and RMB remain separate; no exchange-rate adjustment is implied. Stocks and bonds include reinvested income; gold has price growth only. Returns are nominal, before investor costs and taxes. Bond returns include price movements and are not fixed coupon rates or current offers. Straight segments connect annual observations, not all within-year movements. China’s rounded wealth indices make its plotted balances approximate to about ¥10. Annualised rates summarise total growth, not steady payments every year.

The full source calculations and benchmark qualifications remain in [Lesson 3 evidence notes](../1-1-3-compound-growth/SOURCE-NOTES.md). This lesson stores its own complete slide data and does not load another lesson at runtime.

## Photographs

The approved photos are deliberately reused to continue the same cases and evidence. Originals remain unchanged; CSS frames them for the slide. Each slide’s Sources panel links the image provenance.

| Image | Creator and licence | Purpose / original |
|---|---|---|
| Camera | Thomas Wolf, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | [Canon EOS 400D](https://commons.wikimedia.org/wiki/File:Canon_EOS_400D.jpg), Lucy’s calculation cases. |
| Phone | 茅野ふたば, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [iPhone 17 Pro](https://commons.wikimedia.org/wiki/File:IPhone_17_Pro.jpg), Emma’s familiar case. |
| US shares | bfishadow, CC BY 2.0 | [NASDAQ market display](https://commons.wikimedia.org/wiki/File:NASDAQ_stock_market_display.jpg), representative US market imagery; the measured index is S&P 500. |
| US bonds | MeanieHyaena, CC BY 4.0 | [US Treasury building](https://commons.wikimedia.org/wiki/File:Us-treasury-building.jpg), identifies the issuer. |
| Gold | Stevebidmead, CC0 | [Gold bullion bars](https://commons.wikimedia.org/wiki/File:Gold_bullion_bars.jpg). |
| China shares | 钉钉, CC BY-SA 4.0 | [Shanghai Stock Exchange](https://commons.wikimedia.org/wiki/File:Shanghai_Stock_Exchange6.jpg), representative of the market; CSI 300 also includes Shenzhen. |
| China bonds | N509FZ, CC BY-SA 4.0 | [Ministry of Finance](https://commons.wikimedia.org/wiki/File:Ministry_of_Finance_of_PRC,_south_wing_(20201028170321).jpg), identifies the issuer. |
# Revision evidence and visual, 11 September 2026

The real-data worked model and independent practice use the January 2026 [NYU Stern / Aswath Damodaran Historical Returns dataset](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html), accessed 11 September 2026. Five completed years run from end-2020 to end-2025. Gold cumulative wealth: 9,162.31 to 21,025.41; S&P 500 cumulative wealth including dividends: 592,914.80 to 1,157,598.95. The dataset's cumulative values are wealth series based on $100 at the start of 1928, not gold spot prices or share-index levels.

For classroom-sized figures, divide ending cumulative wealth by starting cumulative wealth and multiply by US$1,000. This gives gold US$2,294.7717333 and US shares US$1,952.3866667. Display endpoints to cents; annualised returns from the full ratios are 18.0722661% and 14.3176180%. Income: gold has none; stock dividends are reinvested. No added/withdrawn money; US-dollar nominal benchmark performance before investor fees and taxes. Jack and Emma are hypothetical investors whose results follow real benchmark data. They are not reported real transactions. These rates describe the chosen historical period and do not promise future returns.

The new cover image, `../../course-assets/images/lesson-04/assumed-return-hero.png`, was generated with the built-in OpenAI ImageGen tool on 11 September 2026. It is a conceptual illustration, not a historical market photograph or data chart. The editable teaching charts carry the actual numerical reasoning separately.

Final image prompt:

Use case: stylized-concept. Asset type: photographic editorial hero for a junior-high investment lesson titled Assumed return. Wide landscape 16:9, cinematic high-quality conceptual photography. Shanghai financial skyline at blue hour, glowing amber and deep forest green city lights. In sharp foreground right, a desk with realistic gold bars and a modern camera representing a student's savings goal; a transparent glass display shows ONE historical jagged financial line arriving from the left at a single point, then three subtle dotted projection paths branching to different future heights, one low or falling and two rising, no arrows. Powerful sense of possibility AND uncertainty, sophisticated and exciting, believable physical textures, not sci-fi neon. Keep left 45 percent dark and visually quiet for separately rendered white lesson title. Main photographic subjects occupy right half. No text, no numbers, no letters, no logos, no watermark. The paths are a conceptual illustration, not financial data.
