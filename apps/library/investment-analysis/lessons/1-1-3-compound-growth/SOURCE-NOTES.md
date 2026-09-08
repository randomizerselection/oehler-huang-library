# Lesson 3 — evidence and definitions

Evidence checked on **4 September 2026**. This is a classroom lesson, not a recommendation to purchase the featured investments. Figures are frozen for reproducible calculations; they do not update automatically.

## Scope and design authority

- Current syllabus: `investment-analysis/syllabus-2026-27.html`, Lesson 3, **1.1.3 Compound growth**.
- Design: the approved Lesson 2 HTML classroom deck, retaining its warm-paper, forest-green and copper identity.
- The unlinked legacy `unit-1/` course has a different lesson sequence. Its Lesson 3 is not the current Compound growth lesson.
- Editable content, semantic slide IDs, teacher notes and per-slide citations are in `slides.js`. Shared rendering is in `../../course-assets/js/presentation.js`.

## Definition source of truth

Completed definitions reproduce the local Lesson 3 glossary. Compounding and future value also match the active Investment Analysis term bank in `course-map-financial-decisions-data.js`.

| Term | Glossary definition |
|---|---|
| Compounding · 复利 | Compounding is growth in which later returns build on earlier returns. |
| Reinvestment · 再投资 | Reinvestment is using income or gains to acquire additional assets rather than withdrawing them. |
| Future value · 终值 | Future value is the projected value of money after growth over a stated period and assumed return. |
| Assumed return · 假设回报率 | An assumed return is a rate used in a projection; it is an input and not a promised outcome. |

The core expression is **FV = P(1 + r)ⁿ**. The lesson's annual examples assume a constant annual rate, retained returns and no additional contributions or withdrawals. Currency results are before tax and fees. Rate and period units must match.

## NS&I: real 2026 fixed-term example

[NS&I Guaranteed Growth Bonds](https://www.nsandi.com/products/guaranteed-growth-bonds) and the [18 August 2026 announcement](https://www.nsandi-adviser.com/pr260818-boost-premium-bonds-including-around-308000-extra-tax-free-prizes-plus-improved-rates-four) identify Issue 82: **4.83% gross/AER for three years**. Interest is calculated daily and added on each investment anniversary. The published £1,000 illustration matures at £1,152.01. This issue does not permit withdrawals before maturity.

[British Savings Bonds](https://www.nsandi.com/british-savings-bonds) explains the government backing. The HM Treasury photograph identifies that backer; students are not being asked to invest in the building.

| Year | Starting balance | Interest | Ending balance |
|---|---:|---:|---:|
| 1 | £1,000.00 | £48.30 | £1,048.30 |
| 2 | £1,048.30 | £50.63 | £1,098.93 |
| 3 | £1,098.93 | £53.08 | £1,152.01 |

Calculations retain full precision internally and display two decimal places. The three-year interest is £152.01. The £2,500 practice holding is illustrative, using the real product rate and term: future value **£2,880.03**, interest **£380.03**.

The simple-growth comparison is a controlled mathematical model, **not an alternative withdrawal option on this bond**. It counts unspent cash interest outside the investment so wealth is compared fairly: £1,144.90 versus £1,152.01, a £7.11 difference.

The ten-year £1,602.71 result is explicitly an **assumption that 4.83% continues**, not a ten-year NS&I offer. The 2% and 8% three-year scenarios are illustrative sensitivity inputs, producing £1,061.21 and £1,259.71 respectively.

## Microsoft: reinvestment and a non-smooth return path

[Microsoft's 10 June 2026 dividend announcement](https://news.microsoft.com/source/2026/06/10/microsoft-announces-quarterly-dividend-29/) declared **US$0.91 per share**, payable **10 September 2026**, to eligible shareholders. As of the evidence date it is declared, not already paid.

The practice investor's 100 shares, US$500 execution price, fractional-share facility and absence of fees are **labelled modelling assumptions**. They are not reported transactions or a sourced market price. The arithmetic is US$91 of dividend income, buying 0.182 additional shares, for 100.182 shares afterwards. [Investor.gov's explanation of direct investing](https://www.investor.gov/introduction-investing/getting-started/investing-your-own/direct-investing) supports the dividend-reinvestment mechanism.

The [Microsoft 2025 Annual Report, Stock Performance](https://www.microsoft.com/investor/reports/ar25/index.html) supplies the historical chart, assuming US$100 invested on 30 June 2020 with dividends reinvested:

| 30 June year-end | Value of original US$100 |
|---|---:|
| 2020 | 100.00 |
| 2021 | 134.41 |
| 2022 | 128.48 |
| 2023 | 172.01 |
| 2024 | 227.51 |
| 2025 | 255.13 |

This is a dividend-reinvested total-return series, **not a share-price series**. The 2022 decline shows that reinvestment does not prevent a loss. The verified complete annual-report series ends in 2025; no 2026 endpoint has been invented or extrapolated.

## U.S. Series I savings bonds: match a rate to its period

[TreasuryDirect's I bond page](https://www.treasurydirect.gov/savings-bonds/i-bonds/) describes semiannual compounding. The [1 May 2026 rate announcement](https://www.treasurydirect.gov/news/2026/release-05-01-rates/) gives a **4.26% overall annualised rate for the first six months** for new bonds issued May–October 2026. It is not a six-month return of 4.26%, nor a rate fixed for the investment's whole life. The overall rate resets every six months.

The example concerns a non-marketable U.S. government savings bond, not the marketable Treasury note introduced in Lesson 2. The comparison is about the duration of a quoted rate, not which product is best; currencies, eligibility, taxes and access conditions differ.

## Stock Market Game model

The US$1,000 allocation and constant 5% return are **paper assumptions, not real account performance**. The three-year ending values are US$1,050.00, US$1,102.50 and US$1,157.63. Yearly returns are US$50.00, US$52.50 and US$55.13. An observed starting snapshot, if available, must be separately dated and sourced. A missing snapshot must not be invented.

The submitted evidence is a three-year table plus an assumptions statement. The calculated result follows only if the assumptions hold. [Investor.gov's compound-interest definition](https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest) supports the mechanism.

## Fresh original photographs

All three source-resolution photographs were newly downloaded for this lesson. No Lesson 2 image was reused. Classroom cropping and colour treatment are performed by CSS; the original downloaded files are retained. Per-slide notes contain the image credit and source link, keeping the projected slides free of attribution boxes.

| Local file in `../../course-assets/images/lesson-03/` | Subject and purpose | Creator, licence and original |
|---|---|---|
| `uk-treasury-original.jpg` · 8256 × 5504 | HM Treasury, Whitehall; identifies the government backing the NS&I savings example and the title image | Tilman2007; [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); [source photograph](https://commons.wikimedia.org/wiki/File:1066103_II_Star_New_Government_Offices_(HM_Treasury),_WHITEHALL_SW1_London_20250616_0001.jpg) |
| `microsoft-redmond.jpg` · 2048 × 1536 | Microsoft campus sign; identifies the company in the dividend case and historical chart | Derrick Coetzee; public domain; [source photograph](https://commons.wikimedia.org/wiki/File:Microsoft_sign_closeup.jpg) |
| `us-treasury-original.jpg` · 5184 × 2916 | U.S. Treasury entrance; identifies the Series I savings-bond issuer | Ajay Suresh; [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/); [source photograph](https://commons.wikimedia.org/wiki/File:Department_of_the_Treasury_(53840295873).jpg) |

## Classroom sequence

| Approximate time | Slides | Purpose |
|---|---|---|
| 0–5 min | 1–4 | Real-data hook, objectives and Lesson 2 retrieval |
| 5–15 min | 5–14 | Definitions, asset-specific reinvestment, classification and a year-by-year calculation |
| 15–26 min | 15–23 | Future-value formula, worked calculation, independent NS&I practice and sensitivity comparisons |
| 26–32 min | 24–30 | Assumptions, historical downside, rate periods and Microsoft reinvestment practice |
| 32–40 min | 31–34 | Stock Market Game evidence record, conditional conclusion and final check |

Definitions and short checks reveal in place. Boxes and table rows reveal one at a time where appropriate. Only the two substantive case calculations have separate model-answer slides. Teacher directions remain in notes rather than on the classroom screen.
