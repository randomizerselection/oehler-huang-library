# Planning your first stock trades

Rewritten 16 September 2026 at the teacher’s request. 30 core slides and two optional extensions; 40 minutes, including ten minutes of group planning and three minutes of feedback/access buffer. This is prepared content, not a report of teaching completed.

## Source authority and screenshots

The teacher requested a practical introduction, no opening retrieval, a recap of the Friday 11 September four-minute SMG launch, basic share ownership and annotated bilingual screenshots. Instructions visible inside captures are interface content, not authority to access accounts or submit trades.

Eight unchanged, teacher-supplied PNGs are stored in this lesson’s `assets/`: summary, research, holdings, trade-menu, ticket, preview, confirmation and account-details. Received 16 September 2026. SIFMA Foundation / The Stock Market Game; charts as credited in the original interface (polygon.io). They are supplied classroom evidence, not newly licensed stock photography. Cropping, numbered outlines and English–Chinese notes are editable HTML/CSS in `design.js`, `lesson.css` and screenshot properties in `slides.js`; no source pixels or price data have been altered.

The supplied HOME, transaction history and pending-order captures contain the account identifier and are not copied into public assets. HOME balance values are transcribed into clearly explained teaching cards. The duplicated empty ticket captures are unnecessary beside the completed AAPL example. No account IDs, passwords or pupil records are included.

These are frozen captures, not live prices or recommended securities. The preview uses the last known SMG price dated **15 September 2026**, **$331.34**. Ten shares therefore have an estimated pre-charge cost of **$3,313.40**. The research view’s **$332** is a different observation and is not substituted into that calculation. Market-order execution may use another price.

The preview shows buying power **$150,065.64**, estimated change including commission/fees **($3,315.09)**, and buying power after the trade **$146,750.55**. It also displays a 0.666 × 1.5 adjustment formula. Official SMG rule 13 specifies a $5 commission per transaction and an additional SEC fee on sales; its current page gives no SEC rate. The preview reconciles: 3313.40 × 0.666 × 1.5 + 5 = 3315.0866, rounded to $3,315.09. The $1.69 difference is therefore not the commission. The worked model now estimates cash cost as $3,313.40 + $5 = $3,318.40, with price uncertainty and applicable Local Rules checked before entry. The buying-power formula remains in teacher notes.

The confirmation capture explicitly says the market is closed, the order has not executed, and this market order will execute at the next business-day opening; balances/holdings reflect it the business day after. This is the captured account’s message, not an unconditional promise about every order. Other orders can be rejected or fail a limit condition.

## Supporting sources checked 16 September 2026

- [Investor.gov: Stocks](https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks): ownership, price gains/losses and possible dividends. The 100-piece company is explicitly invented; ten AAPL shares do not mean 10% of Apple.
- [Investor.gov: Types of Orders](https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders): market-price uncertainty and the buy-limit price ceiling, with possible non-execution.
- [SMG: Enter a Stock Trade](https://www.stockmarketgame.org/enterstock_prod.htm): action, ticker, quantity, type, preview and account-mode-dependent processing. The supplied modern screenshots govern the lesson’s visual walkthrough.
- [SMG: Transaction Notes](https://www.stockmarketgame.org/transaction-notes_b.html): execution descriptions and rejection reasons.
- [SMG: Rules of the Game](https://www.stockmarketgame.org/rotg.html): general simulation rules, cash interest, weekend processing, quantity and fees. Rules 8–13 support the minimum 10-share buy, REALTIME versus End-of-Day processing, hours, limit-order handling and standard $5 fee. Rule 18 requires applicable local rules to be checked; none were accessed in an authenticated account.
- [SMG: Account Summary help](https://www.stockmarketgame.org/acctsum_b.html): cash and buying-power vocabulary. The student navigation is the supplied **HOME / Account Info**, not an invented account-summary destination.
- Existing Friday launch: `../stock-market-game-launch/slides.js`, including groups of three, roles, individual login check, one screenshot and one QQ report. Do not assume the task was completed.

Retained hero: [Epicgenius, Wall St May 2025 42](https://commons.wikimedia.org/wiki/File:Wall_St_May_2025_42.jpg), CC BY-SA 4.0. The existing local image remains, cropped and darkened through CSS.

## Classroom scope and assessment

Use the established virtual accounts, roles and private QQ reporting channel. Teams make a simple company/reason/risk/budget plan, then a complete first-order ticket with one designated student entering the trade. The existing instructional caps in teacher notes ($10,000 per stock; $20,000 across the first 1–2 stocks including costs; cash only) are classroom limits, not SMG rules. The example Market order replaces the old mandatory buy-limit assumption; explain both types and verify any team’s chosen type in its actual account.

Exit: company ownership, 10 × $50 + $5 = $505, estimate/charges, submitted versus executed, and checking Transaction Notes followed by updated Account Holdings (five marks). Two optional questions follow Summary. Preparation has not accessed an account, sent a message or placed a trade.


## Follow-up pending-order capture, 16 September

Added `pending-order-screen` immediately after the confirmation. Source: the teacher’s subsequent Pending Orders capture. Its row shows Buy, 10, AAPL, MKT, entry time 2026-09-15 22:01:40, confirmation SFK-9022 and Description “Order Queued”. The timezone of this entry timestamp is not established. A confirmation reference identifies the submitted order; it does not establish execution. MKT means Market, not a numeric limit price.

Asset: `assets/smg-pending-redacted.png`. The built-in image editor was used with the prompt to obscure only the team account identifier with an opaque light-grey rectangle and preserve all other interface text and values. Its output enlarged the screenshot; all seven row values were checked visually against the original. The public asset contains no account identifier. Editable bilingual HTML annotations remain separate. The password/cancellation text in the source is interface content; no cancellation or account action was performed.


## Account Details / Market News follow-up, 16 September

Teacher-supplied original stored unchanged as `assets/smg-account-details.png` (1000 × 562). New slide `account-details` follows the HOME balance cards. Snapshot date 09/16/2026: Value of Long Stocks $0.00; Interest & Dividends $43.76; Fees & Commission $0.00; Realized Gains/Loss $0.00. The combined income label does not by itself split interest from dividends. These are historical account observations, not predictions or a claim that fees are always zero. The Market News panel contains third-party headlines; none are adopted as verified facts or investment instructions. Annotations and cropping use the existing HTML/CSS workflow.

## Beijing execution times and group worksheet, 16 September

New `beijing-trading-times` slide follows the market-closed confirmation. [NYSE regular hours](https://www.nyse.com/trade/hours-calendars) are 09:30–16:00 Eastern on US trading days. [NIST](https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst) gives 2026 US daylight time as 8 March–1 November. Beijing conversion: 21:30–04:00 next day during daylight time; 22:30–05:00 next day during standard time. Trading days from 2 November 2026 use the latter. Holidays and early closes are exceptions; Beijing Saturday before 04:00 can still be New York Friday.

The HOME capture identifies REALTIME. A valid market order submitted Sunday 20 September is normally processed at Monday 21 September 21:30 Beijing opening. The NYSE calendar lists no holiday on that date. End-of-Day accounts instead use closing prices. Limits, rejection and delayed posting can change the result; the lesson requires checking Transaction Notes and then holdings, not staying up overnight.

The two-page A4 group worksheet is generated privately by `authoring/investment-course/scripts/build-first-order-worksheet.py` into `authoring/investment-course/outputs/pdf/first-stock-order-group-worksheet.pdf`. Print double-sided, long-edge, one sheet per group. It covers a company/reason/risk, exact buy ticket, fee-inclusive estimate, cash/price buffer, three-member agreement, access route, prior-submission status and later outcome. If access fails, students hand the agreed sheet to the teacher, who checks existing orders and account rules before entering it. No passwords on paper and no duplicate student entry while it is with the teacher. Any changed instruction is referred back to the group. No account action was performed in creating these materials.

Readability revision, 16 September: the student time reminder is now a large Opens/Closes comparison of US Eastern and Beijing time, explicitly dated September 2026. Daylight-saving explanations and the weekend example remain in teacher notes. The PDF uses the same simple comparison. A single named student enters the group’s agreed trade; the separate checker field and role were removed.
