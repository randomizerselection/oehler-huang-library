/* Canonical lesson source. Official syllabus p16; original papers and schemes checked. See authoring/igcse-economics/households/TEACHING-NOTES.md. */
window.IGCSE=window.IGCSE||{};
IGCSE.lesson={
  "meta": {
    "code": "3.2.1",
    "unit": "Unit 3 - Microeconomic decision-makers",
    "title": "Households: spending, saving and borrowing — Cambridge IGCSE Economics 0455",
    "lessonLabel": "Households",
    "courseLabel": "Cambridge IGCSE Economics 0455",
    "creatorLabel": "Created by Samuel Oehler-Huang, Suzhou Foreign Language School",
    "deliveryPlan": {
      "durationMinutes": 70,
      "coreEndSlide": 36,
      "previousEndpoint": "Central banks",
      "status": "Prepared; not yet reported taught",
      "suggestedPause": "After interest-rates-paper1, if taught across two sessions"
    }
  },
  "slides": [
    {
      "id": "3-2-1-households",
      "type": "hero",
      "eyebrow": "3.2.1 · Households",
      "title": "Spending, saving and borrowing",
      "zhTitle": "消费、储蓄与借款",
      "kicker": "Income, interest rates and household choices",
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/money-and-banking/savings-jar-banknotes.jpg",
        "alt": "A hand placing banknotes into a savings jar.",
        "caption": "",
        "credit": "Kaboompics.com / Pexels",
        "source": "https://www.pexels.com/photo/close-up-shot-of-a-person-saving-money-in-the-glass-jar-7680483/"
      },
      "layout": "household-hero",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        }
      ],
      "notes": "Next deck after Central banks. Prepared, not reported taught. Allow 65–75 minutes including independent writing and feedback; a natural pause is after the interest-rate MCQ. Three sections: choices; five influences; original papers. Use household-level reasoning; no aggregate-demand transmission, multiplier or demographic policy is required."
    },
    {
      "id": "recall-money-and-banks",
      "type": "classificationTask",
      "layout": "household-written",
      "eyebrow": "Recall",
      "title": "Recall: money and banks",
      "items": [
        {
          "text": "Define a central bank.",
          "answer": "A bank to the government and commercial banks."
        },
        {
          "text": "What does lender of last resort mean?",
          "answer": "The central bank lends to commercial banks that cannot obtain the funds they need elsewhere."
        },
        {
          "text": "Why does inflation weaken money as a store of value?",
          "answer": "Rising prices reduce the quantity of goods and services a fixed amount of money can buy."
        }
      ],
      "notes": "Three minutes independently. Recent retrieval plus spaced retrieval from Money. Reveal models one at a time. Do not ask about interest-rate effects before they are taught here.",
      "sharePrompt": "Write independently; reveal each model separately."
    },
    {
      "id": "household-objectives",
      "type": "outcomes",
      "eyebrow": "Objectives",
      "title": "By the end, you can",
      "bullets": [
        "Distinguish spending, saving and borrowing.",
        "Explain the five influences on household choices.",
        "Apply the ideas to original past-paper questions."
      ],
      "zhBullets": [
        "区分消费、储蓄与借款。",
        "解释影响家庭选择的五个因素。",
        "运用这些概念解答历年真题。"
      ],
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        }
      ]
    },
    {
      "id": "household-choices",
      "type": "section",
      "eyebrow": "Part 1",
      "title": "Spending now or later",
      "zhTitle": "现在消费，还是留待以后",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        }
      ]
    },
    {
      "id": "lucy-monthly-budget",
      "type": "cards",
      "layout": "household-brief",
      "eyebrow": "A teaching example",
      "title": "Lucy plans this month’s money",
      "lead": "Lucy earns ¥5,000 after tax each month. She wants a ¥2,000 laptop in four months.",
      "cards": [
        {
          "title": "¥4,000 for this month",
          "body": "Rent, food, transport and other purchases."
        },
        {
          "title": "¥1,000 left to allocate",
          "body": "Keep it for the laptop and unexpected costs."
        }
      ],
      "visual": {
        "type": "photo",
        "src": "./assets/lucy.svg",
        "alt": "Illustrated Lucy with her laptop goal and a calendar.",
        "caption": "",
        "credit": "Original classroom illustration"
      },
      "partialReview": false,
      "notes": "Fictional adult household case. Introduce income, monthly spending and the goal before the animation. Household means a person or people making shared spending decisions. After-tax income is disposable income; all income here is already after tax."
    },
    {
      "id": "income-splits-between-spending-and-saving",
      "type": "cards",
      "layout": "household-budget",
      "title": "Lucy divides her monthly income",
      "lead": "¥5,000 after tax · each rectangle represents ¥500",
      "cards": [
        {
          "title": "Spend ¥4,000",
          "body": "Eight ¥500 amounts pay for current goods and services."
        },
        {
          "title": "Save ¥1,000",
          "body": "Two ¥500 amounts are income not spent this month."
        },
        {
          "title": "Two months at this saving level",
          "body": "¥1,000 + ¥1,000 = ¥2,000: enough for the laptop, before her deadline."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "notes": "Start with ten visible rectangles. Ask how many are needed for ¥4,000 spending. Click to move eight towards current purchases, then two to saving, then show the laptop goal. Reverse every step. Assume unchanged income/spending, no existing savings, no interest or price changes. The entire ¥1,000 is available for the goal in this example; unexpected costs could delay it.",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 3.2.1",
          "note": "Spending: buying goods and services. Saving: income not spent. Borrowing: obtaining money now to repay later. Interest is the reward for saving and the cost of borrowing."
        }
      ]
    },
    {
      "id": "saving-definition",
      "type": "term",
      "eyebrow": "Key term",
      "title": "Saving",
      "zhTitle": "储蓄",
      "term": "saving",
      "definition": "Saving is income not spent.",
      "definitionZh": "储蓄是未被花掉的收入。",
      "keyTerms": [
        {
          "term": "income not spent",
          "zh": "未被花掉的收入",
          "explain": false
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/money-and-banking/savings-jar-banknotes.jpg",
        "alt": "A hand placing banknotes into a savings jar.",
        "caption": "",
        "credit": "Kaboompics.com / Pexels",
        "source": "https://www.pexels.com/photo/close-up-shot-of-a-person-saving-money-in-the-glass-jar-7680483/"
      },
      "showExamples": false,
      "layout": "photo-term",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 3.2.1",
          "note": "Spending: buying goods and services. Saving: income not spent. Borrowing: obtaining money now to repay later. Interest is the reward for saving and the cost of borrowing."
        }
      ],
      "notes": "Consolidate the mechanism. Spending means buying goods and services; Lucy spends ¥4,000 and saves ¥1,000 per month. Distinguish saving during a period from accumulated savings, a stock built up over time. Saving need not mean depositing money in a bank."
    },
    {
      "id": "borrowing-brings-purchase-forward",
      "type": "cards",
      "layout": "household-borrow",
      "eyebrow": "A different timing choice",
      "title": "A loan brings Lucy’s purchase forward",
      "lead": "Same ¥2,000 laptop · a simplified one-year loan · 5% interest",
      "cards": [
        {
          "title": "Receive ¥2,000 now",
          "body": "Lucy buys the laptop now instead of waiting to save."
        },
        {
          "title": "Repay ¥2,100 in one year",
          "body": "¥2,000 principal + ¥100 interest must come from future resources."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "notes": "Illustrate a separate alternative, not an extra stage in the earlier saving plan. Lucy starts with no accumulated savings. Full principal is outstanding for one year, simple interest, no fees, one final repayment. Ask what benefit and obligation change. Borrowing is not additional earned income. This illustrates timing, not financial advice.",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 3.2.1",
          "note": "Spending: buying goods and services. Saving: income not spent. Borrowing: obtaining money now to repay later. Interest is the reward for saving and the cost of borrowing."
        }
      ]
    },
    {
      "id": "borrowing-definition",
      "type": "term",
      "eyebrow": "Key term",
      "title": "Borrowing",
      "zhTitle": "借款",
      "term": "borrowing",
      "definition": "Borrowing is obtaining money now to repay later.",
      "definitionZh": "借款是现在取得资金，并在以后偿还。",
      "keyTerms": [
        {
          "term": "repay later",
          "zh": "以后偿还",
          "explain": false
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/money-and-banking/loan-agreement-future-payment-v2.jpg",
        "alt": "A loan agreement setting out borrowing and future repayment.",
        "caption": "",
        "credit": "RDNE Stock project / Pexels",
        "source": "https://www.pexels.com/photo/close-up-photo-of-an-agreement-on-a-paper-7841821/"
      },
      "showExamples": false,
      "layout": "photo-term",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 3.2.1",
          "note": "Spending: buying goods and services. Saving: income not spent. Borrowing: obtaining money now to repay later. Interest is the reward for saving and the cost of borrowing."
        }
      ],
      "notes": "The principal is the amount borrowed; interest is the cost of borrowing. A loan increases money available now but creates a repayment obligation. Withdrawing previous savings is not new borrowing."
    },
    {
      "id": "positive-saving-paper1",
      "type": "quiz",
      "eyebrow": "0455/11 · O/N/2025 · Q11",
      "question": "The table shows how household spending changes with income.\nWhat is the first level of income shown at which savings are positive?",
      "choices": [
        "$4000",
        "$4600",
        "$4900",
        "$5200"
      ],
      "answer": 3,
      "prompt": "D. At $4900, spending equals income, so saving is zero. At $5200, saving is $5200 − $4975 = $225. At $4000 and $4600, spending exceeds income.",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/11 · O/N/2025 · Q11 · original printed page 5",
          "question": "The table shows how household spending changes with income.\nWhat is the first level of income shown at which savings are positive?"
        },
        {
          "label": "Mark scheme",
          "ref": "0455/11 · O/N/2025 · Q11 · official key page 2",
          "extract": "Official answer: D."
        },
        {
          "label": "Teaching model",
          "ref": "Teacher-written explanation",
          "note": "D. At $4900, spending equals income, so saving is zero. At $5200, saving is $5200 − $4975 = $225. At $4000 and $4600, spending exceeds income."
        }
      ],
      "notes": "Original question, option order and official key checked against the local PDFs. Independent attempt before selecting. D. At $4900, spending equals income, so saving is zero. At $5200, saving is $5200 − $4975 = $225. At $4000 and $4600, spending exceeds income.",
      "layout": "household-data-mcq",
      "dataTable": {
        "headers": [
          "income ($ per month)",
          "spending ($ per month)"
        ],
        "rows": [
          [
            4000,
            4150
          ],
          [
            4300,
            4375
          ],
          [
            4600,
            4650
          ],
          [
            4900,
            4900
          ],
          [
            5200,
            4975
          ],
          [
            5500,
            5275
          ]
        ]
      }
    },
    {
      "id": "five-household-influences",
      "type": "section",
      "eyebrow": "Part 2",
      "title": "Five influences on household choices",
      "zhTitle": "影响家庭选择的五个因素",
      "layout": "household-influence-overview",
      "overviewItems": [
        {
          "term": "Disposable income",
          "zh": "可支配收入"
        },
        {
          "term": "Rate of interest",
          "zh": "利率"
        },
        {
          "term": "Confidence about the future",
          "zh": "对未来的信心"
        },
        {
          "term": "Age",
          "zh": "年龄"
        },
        {
          "term": "Culture",
          "zh": "文化"
        }
      ],
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        }
      ],
      "notes": "Give students time to copy the five numbered key terms. The syllabus says income; disposable income is the more precise household decision term and is explicitly accepted in 0455/23 O/N 2024 Q2(a)."
    },
    {
      "id": "income-amount-and-percentage",
      "type": "cards",
      "layout": "household-income",
      "eyebrow": "1 · Income 收入",
      "title": "Higher income can raise spending and saving",
      "lead": "Compare two monthly budgets: what changes in the amount and the share saved?",
      "cards": [
        {
          "title": "Income ¥5,000",
          "body": "Spending ¥4,000; saving ¥1,000. Share saved = ¥1,000 ÷ ¥5,000 × 100 = 20%."
        },
        {
          "title": "Income ¥8,000",
          "body": "Spending ¥5,600; saving ¥2,400. Share saved = ¥2,400 ÷ ¥8,000 × 100 = 30%."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        },
        {
          "label": "Question paper",
          "ref": "0455/21 · May/June 2023 · Q5(a) [2] · 0455_s23_qp_21 · page 5",
          "question": "Identify two reasons why rich households spend more than the average household."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2023 · Q5(a) [2] · 0455_s23_ms_21 · page 20",
          "extract": "One mark for each reason. Accept higher incomes; easier borrowing; more confidence; more savings/wealth; expensive luxury goods; showing status; possibly larger families. If more than two reasons are given, consider the first three."
        }
      ],
      "notes": "Fictional comparison; not a forecast of Lucy’s pay. Use equal scales. Before revealing ask whether higher spending prevents higher saving. Calculate each share vertically in the illustration. Higher income often permits a larger saving share because necessities take a smaller share, but no fixed percentage is guaranteed. Income after tax is the amount available."
    },
    {
      "id": "income-and-saving-capacity",
      "type": "flow",
      "eyebrow": "Learn",
      "title": "Why higher-income households often save a larger share",
      "zhTitle": "为什么高收入家庭通常储蓄比例更高",
      "mode": "fillBlanks",
      "nodes": [
        [
          {
            "text": "Income after tax __________",
            "answer": "rises",
            "zh": "税后收入增加"
          },
          {
            "text": "Basic needs take a __________ share",
            "answer": "smaller",
            "zh": "基本需要占收入的比例下降"
          },
          {
            "text": "More income can be __________",
            "answer": "saved",
            "zh": "更多收入可以用于储蓄"
          }
        ]
      ],
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        }
      ],
      "notes": "Other things equal. Basic needs do not usually rise in proportion to income. Spending can rise in money terms while its share of income falls. Do not teach an inevitable percentage response."
    },
    {
      "id": "income-and-access-to-borrowing",
      "type": "cards",
      "eyebrow": "1 · Income 收入",
      "title": "Higher income can also make borrowing easier",
      "cards": [
        {
          "title": "Repayment capacity 偿还能力",
          "body": "Higher, stable income can reassure a lender that repayments are affordable."
        },
        {
          "title": "A reason to borrow 借款用途",
          "body": "Even a high-income household may borrow for a home or another large purchase."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/21 · May/June 2023 · Q5(a) [2] · 0455_s23_qp_21 · page 5",
          "question": "Identify two reasons why rich households spend more than the average household."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2023 · Q5(a) [2] · 0455_s23_ms_21 · page 20",
          "extract": "One mark for each reason. Accept higher incomes; easier borrowing; more confidence; more savings/wealth; expensive luxury goods; showing status; possibly larger families. If more than two reasons are given, consider the first three."
        }
      ],
      "notes": "Separate ability from desire: a low-income household may need a loan but be unable to obtain one. Higher current income may reduce the need to borrow for small purchases while increasing access to credit. Do not state that income always raises borrowing."
    },
    {
      "id": "income-groups-paper1",
      "type": "quiz",
      "eyebrow": "0455/12 · O/N/2022 · Q11",
      "question": "Which statement about different income groups is correct?",
      "choices": [
        "High-income groups do not need to borrow money.",
        "High-income groups save less money than low-income groups.",
        "Low-income groups find it easier to borrow than high-income groups.",
        "Low-income groups save a smaller percentage of their income than high-income groups."
      ],
      "answer": 3,
      "prompt": "D. Basic needs take a larger share of low incomes. A is too absolute: wealthy households can still borrow for homes. B reverses the usual saving pattern. C confuses needing credit with being able to repay.",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/12 · O/N/2022 · Q11 · original printed page 5",
          "question": "Which statement about different income groups is correct?"
        },
        {
          "label": "Mark scheme",
          "ref": "0455/12 · O/N/2022 · Q11 · official key page 2",
          "extract": "Official answer: D."
        },
        {
          "label": "Teaching model",
          "ref": "Teacher-written explanation",
          "note": "D. Basic needs take a larger share of low incomes. A is too absolute: wealthy households can still borrow for homes. B reverses the usual saving pattern. C confuses needing credit with being able to repay."
        }
      ],
      "notes": "Original question, option order and official key checked against the local PDFs. Independent attempt before selecting. D. Basic needs take a larger share of low incomes. A is too absolute: wealthy households can still borrow for homes. B reverses the usual saving pattern. C confuses needing credit with being able to repay."
    },
    {
      "id": "interest-two-sides",
      "type": "compare",
      "eyebrow": "2 · Rate of interest 利率",
      "title": "What changes when the rate rises from 2% to 5%?",
      "leftTitle": "Saving ¥2,000 储蓄",
      "rightTitle": "Borrowing ¥2,000 借款",
      "left": [
        "At 2%: interest received = ¥40.",
        "At 5%: interest received = ¥100.",
        "The reward for saving rises by ¥60."
      ],
      "right": [
        "At 2%: interest paid = ¥40.",
        "At 5%: interest paid = ¥100.",
        "The cost of borrowing rises by ¥60."
      ],
      "partialReview": [
        ".splitCols .choice"
      ],
      "layout": "household-interest",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 3.2.1",
          "note": "Spending: buying goods and services. Saving: income not spent. Borrowing: obtaining money now to repay later. Interest is the reward for saving and the cost of borrowing."
        },
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        }
      ],
      "notes": "Give an attempt before revealing. Simple interest = principal × annual rate × time. Same ¥2,000 balance for exactly one year; no fees, tax, compounding or repayments during the year. Hold all else constant. Compare savers and borrowers; the principal is not the interest. Read corresponding rows across both columns.",
      "question": "Interest = amount × annual rate · one year, unchanged balance."
    },
    {
      "id": "higher-interest-saving",
      "type": "flow",
      "eyebrow": "Learn",
      "title": "Higher interest rates reward saving",
      "zhTitle": "较高利率提高储蓄的回报",
      "mode": "fillBlanks",
      "nodes": [
        [
          {
            "text": "Saving earns __________ interest",
            "answer": "more",
            "zh": "储蓄获得更多利息"
          },
          {
            "text": "Saving becomes more __________",
            "answer": "attractive",
            "zh": "储蓄更有吸引力"
          },
          {
            "text": "Current spending tends to __________",
            "answer": "fall",
            "zh": "当前消费通常减少"
          }
        ]
      ],
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        }
      ],
      "notes": "This is an incentive, not a promise for every household. Existing savers may also gain income from interest. Keep scope at household choice, without adding aggregate inflation transmission."
    },
    {
      "id": "higher-interest-borrowing",
      "type": "flow",
      "eyebrow": "Learn",
      "title": "Higher interest rates raise borrowing costs",
      "zhTitle": "较高利率增加借款成本",
      "mode": "fillBlanks",
      "nodes": [
        [
          {
            "text": "Loan interest costs __________",
            "answer": "rise",
            "zh": "贷款利息成本上升"
          },
          {
            "text": "Households tend to borrow __________",
            "answer": "less",
            "zh": "家庭通常减少借款"
          },
          {
            "text": "Credit-financed spending tends to __________",
            "answer": "fall",
            "zh": "借款支持的消费通常减少"
          }
        ]
      ],
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        }
      ],
      "notes": "New loans or variable-rate loans are affected; an existing fixed-rate loan need not change immediately. A higher cost of borrowing usually reduces the amount borrowed. A rate fall reverses these incentives."
    },
    {
      "id": "interest-rates-paper1",
      "type": "quiz",
      "eyebrow": "0455/11 · M/J/2025 · Q11",
      "question": "If interest rates fall, what will be the most likely effect on saving and borrowing?",
      "choices": [
        "decrease — decrease",
        "decrease — increase",
        "increase — decrease",
        "increase — increase"
      ],
      "answer": 1,
      "prompt": "B. A lower return discourages saving; a lower borrowing cost encourages borrowing. A gets borrowing wrong; C reverses both effects; D gets saving wrong.",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/11 · M/J/2025 · Q11 · original printed page 5",
          "question": "If interest rates fall, what will be the most likely effect on saving and borrowing?"
        },
        {
          "label": "Mark scheme",
          "ref": "0455/11 · M/J/2025 · Q11 · official key page 2",
          "extract": "Official answer: B."
        },
        {
          "label": "Teaching model",
          "ref": "Teacher-written explanation",
          "note": "B. A lower return discourages saving; a lower borrowing cost encourages borrowing. A gets borrowing wrong; C reverses both effects; D gets saving wrong."
        }
      ],
      "notes": "Original question, option order and official key checked against the local PDFs. Independent attempt before selecting. B. A lower return discourages saving; a lower borrowing cost encourages borrowing. A gets borrowing wrong; C reverses both effects; D gets saving wrong.",
      "optionColumns": [
        "saving",
        "borrowing"
      ],
      "layout": "household-options-table"
    },
    {
      "id": "confidence-household-choices",
      "type": "compare",
      "title": "Confidence changes plans for future income",
      "leftTitle": "More confidence 信心增强",
      "rightTitle": "Less confidence 信心减弱",
      "left": [
        "Expected secure jobs and higher future income.",
        "More willingness to spend or borrow now; less need for precautionary saving."
      ],
      "right": [
        "Concern about job loss or lower future income.",
        "Delay purchases and borrowing; save for emergencies if income allows."
      ],
      "partialReview": [
        ".splitCols > .card"
      ],
      "notes": "3 · Confidence. Expected income is different from current income. A household can become less confident even before its pay falls. Once unemployment actually reduces income, ability to save may fall; desire and ability must be separated.",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        }
      ]
    },
    {
      "id": "confidence-versus-income",
      "type": "classificationTask",
      "layout": "household-written",
      "eyebrow": "Check",
      "title": "Explain the different saving decisions",
      "items": [
        {
          "text": "Lucy still earns ¥5,000 but fears losing her job. Why might she save more?",
          "answer": "She wants an emergency reserve, so may cut current spending while her income still allows saving."
        },
        {
          "text": "Lucy then loses her job. Why might she save less despite being worried?",
          "answer": "Her income falls. She may have to use previous savings to pay for basic needs."
        }
      ],
      "notes": "Teacher-written hinge check: needed to distinguish a desire to save from the ability to save. Reveal each explanation separately. If students equate lower confidence with an inevitable rise in saving, revisit unchanged income versus lost income.",
      "sharePrompt": "Write independently; reveal each model separately."
    },
    {
      "id": "age-household-timeline",
      "type": "cards",
      "layout": "household-age",
      "eyebrow": "4 · Age 年龄",
      "title": "Income and needs change through life",
      "cards": [
        {
          "title": "Early working life 开始工作",
          "body": "Limited savings and large purchases may encourage borrowing."
        },
        {
          "title": "Preparing for retirement 准备退休",
          "body": "People may save more now to support living standards later."
        },
        {
          "title": "After retirement 退休以后",
          "body": "Lower earned income may lead people to draw on savings for spending."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        },
        {
          "label": "Question paper",
          "ref": "0455/21 · October/November 2024 · Q5(b) [4] · 0455_w24_qp_21 · page 5",
          "question": "Explain the effects of an ageing population on spending and saving levels."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · October/November 2024 · Q5(b) [4] · 0455_w24_ms_21 · page 24",
          "extract": "Accept: fewer people working can lead to withdrawals of savings to fund living; older people may have accumulated savings and spend more; people approaching retirement may save more to support retirement living standards and reduce current spending. Maximum 3 marks for a relevant explanation of either spending or saving."
        }
      ],
      "notes": "Illustrated life stages are tendencies, not rules about every person. Age can affect borrowing through needs and repayment prospects. Define retirement as leaving paid work and an ageing population as a rising proportion of older people, before the final original question. Pensions, wealth, family needs and health vary. Savings stock can decline even when current spending is maintained."
    },
    {
      "id": "age-before-after-retirement",
      "type": "compare",
      "title": "Age does not produce one fixed saving response",
      "leftTitle": "Before retirement 退休前",
      "rightTitle": "After retirement 退休后",
      "left": [
        "Build funds for future living costs.",
        "Saving may rise; current spending may fall."
      ],
      "right": [
        "Use accumulated savings when earned income falls.",
        "Savings may fall; withdrawals can support spending."
      ],
      "partialReview": [
        ".splitCols > .card"
      ],
      "notes": "The official 2024 O/N 21 Q5(b) scheme accepts both cases. A household could also have a sufficient pension and continue saving. Distinguish actual retirement from approaching retirement.",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        },
        {
          "label": "Question paper",
          "ref": "0455/21 · October/November 2024 · Q5(b) [4] · 0455_w24_qp_21 · page 5",
          "question": "Explain the effects of an ageing population on spending and saving levels."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · October/November 2024 · Q5(b) [4] · 0455_w24_ms_21 · page 24",
          "extract": "Accept: fewer people working can lead to withdrawals of savings to fund living; older people may have accumulated savings and spend more; people approaching retirement may save more to support retirement living standards and reduce current spending. Maximum 3 marks for a relevant explanation of either spending or saving."
        }
      ]
    },
    {
      "id": "culture-household-choices",
      "type": "cards",
      "eyebrow": "5 · Culture 文化",
      "title": "Social attitudes influence household choices",
      "cards": [
        {
          "title": "Saving and debt 储蓄与债务",
          "body": "Valuing thrift or avoiding debt may encourage saving and discourage borrowing."
        },
        {
          "title": "Spending expectations 消费习惯",
          "body": "Celebrations, gifts and expectations about living standards may increase spending."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        },
        {
          "label": "Question paper",
          "ref": "0455/23 · October/November 2024 · Q2(a) [2] · 0455_w24_qp_23 · page 4",
          "question": "Identify two influences on the proportion of income saved by households."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/23 · October/November 2024 · Q2(a) [2] · 0455_w24_ms_23 · page 13",
          "extract": "One mark for each influence. Accept interest; disposable income/earnings/wealth/taxation; confidence; saving schemes; strength of financial institutions; age/dependants; culture; cost of living/inflation. Other relevant influences may be credited. Accept any two from the first three responses."
        }
      ],
      "notes": "Culture means shared values, customs and social expectations. These are possible mechanisms, not claims about everyone in a country, religion or ethnic group. People facing similar incomes and rates can make different choices. Avoid asking students to disclose family finances."
    },
    {
      "id": "apply-five-influences",
      "type": "classificationTask",
      "layout": "household-written",
      "eyebrow": "Check",
      "title": "Identify the influence and explain the decision",
      "items": [
        {
          "text": "Jack’s pay rises, but basic living costs change little.",
          "answer": "Income: more money remains after necessities, so he can save more while also spending more."
        },
        {
          "text": "Emma avoids debt because of values learned in her family.",
          "answer": "Culture: disapproval of debt may lead her to save first rather than borrow."
        },
        {
          "text": "Lucy is approaching retirement and cuts non-essential purchases.",
          "answer": "Age: saving more now can support her future living standards."
        }
      ],
      "notes": "Independent application, teacher-written to check the five-influence teaching before original examination work. Ask for the link as well as the factor name.",
      "sharePrompt": "Write independently; reveal each model separately."
    },
    {
      "id": "household-past-papers",
      "type": "section",
      "eyebrow": "Part 3",
      "title": "Past-paper questions",
      "zhTitle": "历年真题",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        }
      ]
    },
    {
      "id": "rich-households-question",
      "type": "exam",
      "eyebrow": "0455/21 · May/June 2023 · Q5(a) [2]",
      "title": "Identify two reasons why rich households spend more than the average household. [2]",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/21 · May/June 2023 · Q5(a) [2] · 0455_s23_qp_21 · page 5",
          "question": "Identify two reasons why rich households spend more than the average household."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2023 · Q5(a) [2] · 0455_s23_ms_21 · page 20",
          "extract": "One mark for each reason. Accept higher incomes; easier borrowing; more confidence; more savings/wealth; expensive luxury goods; showing status; possibly larger families. If more than two reasons are given, consider the first three."
        }
      ],
      "prompt": "Write two distinct reasons. No developed explanation is required by “Identify”.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      }
    },
    {
      "id": "rich-households-model",
      "type": "modelAnswer",
      "eyebrow": "Teacher-written model",
      "title": "Identify two reasons why rich households spend more than the average household. [2]",
      "paragraphs": [
        "They have higher incomes.",
        "They find it easier to borrow."
      ],
      "answer": "They have higher incomes.\n\nThey find it easier to borrow.",
      "showLinkChips": false,
      "partialReview": [
        ".modelAnswerText > p"
      ],
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/21 · May/June 2023 · Q5(a) [2] · 0455_s23_qp_21 · page 5",
          "question": "Identify two reasons why rich households spend more than the average household."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2023 · Q5(a) [2] · 0455_s23_ms_21 · page 20",
          "extract": "One mark for each reason. Accept higher incomes; easier borrowing; more confidence; more savings/wealth; expensive luxury goods; showing status; possibly larger families. If more than two reasons are given, consider the first three."
        }
      ],
      "notes": "Two accepted reasons, one mark each. Other accepted reasons are available in the separate Mark scheme source. The question asks for spending in money terms, not the proportion of income spent.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      }
    },
    {
      "id": "saving-influences-question",
      "type": "exam",
      "eyebrow": "0455/23 · October/November 2024 · Q2(a) [2]",
      "title": "Identify two influences on the proportion of income saved by households. [2]",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/23 · October/November 2024 · Q2(a) [2] · 0455_w24_qp_23 · page 4",
          "question": "Identify two influences on the proportion of income saved by households."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/23 · October/November 2024 · Q2(a) [2] · 0455_w24_ms_23 · page 13",
          "extract": "One mark for each influence. Accept interest; disposable income/earnings/wealth/taxation; confidence; saving schemes; strength of financial institutions; age/dependants; culture; cost of living/inflation. Other relevant influences may be credited. Accept any two from the first three responses."
        }
      ],
      "prompt": "Answer independently. Name two different influences.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      }
    },
    {
      "id": "saving-influences-model",
      "type": "modelAnswer",
      "eyebrow": "Teacher-written model",
      "title": "Identify two influences on the proportion of income saved by households. [2]",
      "paragraphs": [
        "The rate of interest.",
        "The level of disposable income."
      ],
      "answer": "The rate of interest.\n\nThe level of disposable income.",
      "showLinkChips": false,
      "partialReview": [
        ".modelAnswerText > p"
      ],
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/23 · October/November 2024 · Q2(a) [2] · 0455_w24_qp_23 · page 4",
          "question": "Identify two influences on the proportion of income saved by households."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/23 · October/November 2024 · Q2(a) [2] · 0455_w24_ms_23 · page 13",
          "extract": "One mark for each influence. Accept interest; disposable income/earnings/wealth/taxation; confidence; saving schemes; strength of financial institutions; age/dependants; culture; cost of living/inflation. Other relevant influences may be credited. Accept any two from the first three responses."
        }
      ],
      "notes": "One mark each; any two relevant influences accepted, including confidence, age and culture. Do not imply these two are uniquely correct.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      }
    },
    {
      "id": "romania-original-extract",
      "type": "paperExtract",
      "eyebrow": "0455/22 · F/M/2025 · source page 2",
      "title": "Household spending in Romania",
      "paragraphs": [
        "If the Romanian economy continues to grow at its relatively high rate, fewer of its people may emigrate and more immigrants may be attracted. Recent economic growth has been driven largely by increases in household spending. Romanians have become wealthier, more confident about their future and have experienced low interest rates."
      ],
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455_m25_qp_22 · source page 2, question page 3",
          "note": "If the Romanian economy continues to grow at its relatively high rate, fewer of its people may emigrate and more immigrants may be attracted. Recent economic growth has been driven largely by increases in household spending. Romanians have become wealthier, more confident about their future and have experienced low interest rates."
        }
      ],
      "notes": "Verbatim relevant paragraph from the original source. Read it before Q1(d). Wealth is accumulated assets; income is a flow. The exam source describes its own period, not current Romanian conditions. Students need only the three stated household influences, not the migration material."
    },
    {
      "id": "romania-explain-question",
      "type": "exam",
      "eyebrow": "0455/22 · February/March 2025 · Q1(d) [4]",
      "title": "Explain two reasons why household spending has increased in Romania. [4]",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · February/March 2025 · Q1(d) [4] · 0455_m25_qp_22 · source page 2, question page 3",
          "question": "Explain two reasons why household spending has increased in Romania."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/22 · February/March 2025 · Q1(d) [4] · 0455_m25_ms_22 · page 8",
          "extract": "Accept developed explanations: greater wealth gives more purchasing power or ability to borrow; greater confidence about future jobs/income encourages borrowing or less saving; low interest rates reduce borrowing costs or discourage saving; inflation raises spending needed to maintain living standards. One identification and one development for each of two reasons."
        }
      ],
      "layout": "household-explain",
      "keywords": [
        "Reason 1: identify from the source",
        "Explain its effect on spending",
        "Reason 2: identify from the source",
        "Explain its effect on spending"
      ],
      "prompt": "Choose two reasons. Write one developed explanation for each.",
      "context": "If the Romanian economy continues to grow at its relatively high rate, fewer of its people may emigrate and more immigrants may be attracted. Recent economic growth has been driven largely by increases in household spending. Romanians have become wealthier, more confident about their future and have experienced low interest rates.",
      "notes": "3–4 minutes independent attempt before the model. The full original source paragraph is available through the Question paper button. Plan rows pair each reason with its explanation; do not invent a universal mark formula.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 4
      }
    },
    {
      "id": "romania-explain-model",
      "type": "modelAnswer",
      "eyebrow": "Teacher-written model",
      "title": "Explain two reasons why household spending has increased in Romania. [4]",
      "paragraphs": [
        "Romanians have become more confident about their future. Expecting secure jobs and higher future income can encourage them to borrow or save less, allowing more spending now.",
        "They have experienced low interest rates. This reduces the cost of borrowing, so households may take loans to finance more purchases."
      ],
      "answer": "Romanians have become more confident about their future. Expecting secure jobs and higher future income can encourage them to borrow or save less, allowing more spending now.\n\nThey have experienced low interest rates. This reduces the cost of borrowing, so households may take loans to finance more purchases.",
      "showLinkChips": false,
      "partialReview": [
        ".modelAnswerText > p"
      ],
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · February/March 2025 · Q1(d) [4] · 0455_m25_qp_22 · source page 2, question page 3",
          "question": "Explain two reasons why household spending has increased in Romania."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/22 · February/March 2025 · Q1(d) [4] · 0455_m25_ms_22 · page 8",
          "extract": "Accept developed explanations: greater wealth gives more purchasing power or ability to borrow; greater confidence about future jobs/income encourages borrowing or less saving; low interest rates reduce borrowing costs or discourage saving; inflation raises spending needed to maintain living standards. One identification and one development for each of two reasons."
        }
      ],
      "links": [
        "more confident",
        "borrow or save less",
        "reduces the cost of borrowing",
        "more purchases"
      ],
      "notes": "Complete teacher-written model: two accepted identifications with development. Reveal paragraphs separately. Wealth is another valid choice. Use the model to demonstrate a causal explanation, then transfer independently to the final age question.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 4
      }
    },
    {
      "id": "ageing-population-exit",
      "type": "exam",
      "eyebrow": "Check · Exit ticket 离堂小测",
      "title": "Explain the effects of an ageing population on spending and saving levels. [4]",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/21 · October/November 2024 · Q5(b) [4] · 0455_w24_qp_21 · page 5",
          "question": "Explain the effects of an ageing population on spending and saving levels."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · October/November 2024 · Q5(b) [4] · 0455_w24_ms_21 · page 24",
          "extract": "Accept: fewer people working can lead to withdrawals of savings to fund living; older people may have accumulated savings and spend more; people approaching retirement may save more to support retirement living standards and reduce current spending. Maximum 3 marks for a relevant explanation of either spending or saving."
        }
      ],
      "prompt": "Work independently. Explain effects on both spending and saving. State whether people are approaching retirement or already retired.",
      "notes": "Assessed exit: 4 minutes, four marks using the original scheme. The concept of ageing was defined in the age teaching. This applies 3.2.1 age to an original cross-topic question; no additional population-policy theory is required.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 4
      }
    },
    {
      "id": "ageing-population-exit-model",
      "type": "modelAnswer",
      "eyebrow": "Teacher-written model",
      "title": "Explain the effects of an ageing population on spending and saving levels. [4]",
      "paragraphs": [
        "As more people approach retirement, they may save more to support their living standards when they stop earning wages.",
        "To set aside more of their present income, they may reduce their current spending."
      ],
      "answer": "As more people approach retirement, they may save more to support their living standards when they stop earning wages.\n\nTo set aside more of their present income, they may reduce their current spending.",
      "showLinkChips": false,
      "partialReview": [
        ".modelAnswerText > p"
      ],
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/21 · October/November 2024 · Q5(b) [4] · 0455_w24_qp_21 · page 5",
          "question": "Explain the effects of an ageing population on spending and saving levels."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · October/November 2024 · Q5(b) [4] · 0455_w24_ms_21 · page 24",
          "extract": "Accept: fewer people working can lead to withdrawals of savings to fund living; older people may have accumulated savings and spend more; people approaching retirement may save more to support retirement living standards and reduce current spending. Maximum 3 marks for a relevant explanation of either spending or saving."
        }
      ],
      "links": [
        "save more",
        "support their living standards",
        "reduce their current spending"
      ],
      "notes": "One coherent accepted approaching-retirement explanation covering both variables. The scheme caps an answer about only spending OR saving at 3. Also accept developed answers about retired people withdrawing accumulated savings to fund spending. Do not award marks using a fixed sentence count.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 4
      }
    },
    {
      "id": "household-summary",
      "type": "cards",
      "eyebrow": "Review",
      "title": "Summary",
      "layout": "household-summary",
      "cards": [
        {
          "title": "Spending, saving and borrowing",
          "body": "Saving is income not spent. Borrowing brings money forward but requires repayment."
        },
        {
          "title": "Five influences",
          "body": "Income, rate of interest, confidence, age and culture."
        },
        {
          "title": "Explain the conditions",
          "body": "Distinguish amounts from shares, desire from ability, and before from after retirement."
        }
      ],
      "partialReview": false,
      "notes": "Return to the three objectives. Use the exit responses to decide whether to revisit income shares, interest incentives or life-stage conditions. No optional material before this core ending.",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 16 · 3.2.1",
          "note": "Influences on households’ spending, saving and borrowing: income; rate of interest; confidence; age; culture."
        }
      ]
    }
  ]
};
