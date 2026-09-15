# Planning your first stock trades

Lesson 5, Wednesday 16 September 2026. Prepared 14 September for the first SMG orders on 19–20 September. 26 core slides, 2 optional extensions, 40 minutes including a two-minute buffer. Uses the existing Investment HTML renderer. Preparation is not evidence that a lesson was taught.

## Evidence and scope

- [SMG general rules](https://www.stockmarketgame.org/rotg.html), checked 14 September 2026: $100,000 starting virtual cash; general buy minimum 10 shares; $5 transaction fee; eligible securities and local restrictions; real-time versus end-of-day pricing; weekend entry and next-business-day pricing; limit-price handling. Local account rules and the active competition mode take precedence. Do not substitute old 100-share or 1% commission rules.
- [SMG stock-entry reference](https://www.stockmarketgame.org/enterstock_prod.htm): ticker validation, share quantity, order type, limit price and preview. Student account fields must be checked on Friday. The deck supplies a checklist, not an invented account screenshot.
- [SMG Pending Orders](https://www.stockmarketgame.org/pending-orders_b.html) and [Transaction Notes](https://www.stockmarketgame.org/transaction-notes_b.html): distinguish queued, rejected and executed orders; inspect records before re-entry; do not promise cancellation in every game mode.
- [SMG account summary help](https://www.stockmarketgame.org/acctsum_b.html): cash and buying power differ. The teacher-supplied student screen remains HOME / Account Info. No real student account values or credentials appear here.
- [Investor.gov: types of orders](https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders): a market order does not fix the execution price; a buy limit permits the limit or lower and can remain unfilled. SMG’s own pricing and order-lifetime rules govern this simulation.
- [Investor.gov: stocks](https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks) and [diversification](https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/diversify-your-investments): ownership, uncertain returns and spreading exposure. Two companies can share a risk; two holdings do not establish broad diversification.
- [NYSE trading information](https://www.nyse.com/trade/trading-information): core session 09:30–16:00 Eastern. For 18 and 21 September 2026 this converts to 21:30–04:00 next day in China. The weekend task collects order-entry evidence; actual fills depend on the next session, account mode, limits and eligibility.

All Emma, Lucy and Jack prices, budgets and business results are explicit assumptions, not market quotes or recommendations. The sizing method assumes one order, whole shares, a fixed fee and no extra charges. Substitute actual local charges when preparing a real SMG ticket. The loss table holds the percentage price fall constant, excludes fees and cash interest, and illustrates exposure rather than a forecast or maximum loss.

The proposed first-weekend classroom policy is 1–2 eligible ordinary stocks, buy limits, no borrowing or shorting, at most $10,000 per stock and $20,000 combined including fees and pending commitments. These are teaching constraints, not official SMG requirements or a real-money portfolio recommendation. Everyone researches and agrees; one student enters with another checking. Report an unresolved problem honestly rather than claiming a fill.

## Photograph

Epicgenius, [Wall St May 2025 42](https://commons.wikimedia.org/wiki/File:Wall_St_May_2025_42.jpg), photographed 13 May 2025. [Original JPEG](https://upload.wikimedia.org/wikipedia/commons/6/6e/Wall_St_May_2025_42.jpg). [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Newly downloaded for this lesson. CSS crops and darkens the photograph on the cover and visual pause. Any adapted photograph remains under the same licence. It represents the exchange setting, not a company's business evidence or the student account.

## Assessment

Exit: 80 shares, maximum $4,965 including the assumed fee; a $63 pricing attempt fails a $62 buy limit; confirmation requires execution evidence and matching holdings. Five marks, one for each element. Target four marks plus correct limit/status reasoning before Friday’s ticket rehearsal. Optional extensions follow Summary.

## Design refinement, 14 September 2026

Reference: the local IGCSE `4-4-supply-side-policy/lesson-4.html#21` and its surrounding explanation slides, as requested by the teacher. Adapted the prominent task area, bilingual type hierarchy, meaningful icons and concept-specific layouts within the Investment renderer. `design.js` and `lesson.css` apply only to this lesson; no reference-deck code or shared renderer was changed.

SVG illustrations are original, editable lesson graphics. In the exposure graphic each square represents $1,000 of the original $100,000 portfolio: green is remaining stock value, stripes are lost value and pale squares are unchanged cash. A $10,000 starting position becomes $8,000 with $2,000 lost; a $50,000 position becomes $40,000 with $10,000 lost. These are assumed scenarios, not historical charts. The three limit-price panels are independent pricing attempts, not a price path. Original source links remain in notes, accessible through the small Sources controls.
