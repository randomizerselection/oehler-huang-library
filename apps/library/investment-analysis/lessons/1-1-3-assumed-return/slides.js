window.INVESTMENT_COURSE = window.INVESTMENT_COURSE || {};
window.INVESTMENT_COURSE.lesson = {
  "meta": {
    "lesson": 4,
    "title": "Assumed return",
    "titleZh": "假设回报率",
    "folio": "ASSUMPTIONS",
    "course": "Investment Course",
    "source": "../../syllabus-2026-27.html · 1.1.3 continuation",
    "designReference": "../1-1-3-compound-growth/index.html",
    "evidenceDate": "2026-09-09",
    "plannedMinutes": 40,
    "priorCoverage": {
      "lesson": 3,
      "lastTaughtSlideId": "mcq-exponent",
      "firstUntaughtSlideId": "section-projections"
    },
    "revisedDate": "2026-09-11",
    "coreSlideCount": 22
  },
  "photos": {
    "camera": {
      "src": "../../course-assets/images/lesson-03/camera-canon-eos.jpg",
      "alt": "A Canon camera represents Lucy’s photography-club savings goal.",
      "credit": "Thomas Wolf, www.foto-tw.de / Wikimedia Commons · CC BY-SA 3.0",
      "source": "https://commons.wikimedia.org/wiki/File:Canon_EOS_400D.jpg",
      "position": "50% 50%"
    },
    "phone": {
      "src": "../../course-assets/images/lesson-03/iphone-17-pro.jpg",
      "alt": "An iPhone 17 Pro represents Emma’s goal of buying a new iPhone.",
      "credit": "茅野ふたば / Wikimedia Commons · CC BY-SA 4.0",
      "source": "https://commons.wikimedia.org/wiki/File:IPhone_17_Pro.jpg",
      "position": "50% 50%"
    },
    "stocks": {
      "src": "../../course-assets/images/lesson-02/nasdaq-stock-market-display.jpg",
      "alt": "The NASDAQ MarketSite display represents the US share market in the S&P 500 investment challenge.",
      "credit": "bfishadow / Wikimedia Commons · CC BY 2.0",
      "source": "https://commons.wikimedia.org/wiki/File:NASDAQ_stock_market_display.jpg",
      "position": "58% 50%"
    },
    "treasury": {
      "src": "../../course-assets/images/lesson-02/us-treasury-building.jpg",
      "alt": "The US Treasury, issuer of US government bonds.",
      "credit": "MeanieHyaena / Wikimedia Commons · CC BY 4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Us-treasury-building.jpg",
      "position": "50% 63%"
    },
    "gold": {
      "src": "../../course-assets/images/lesson-02/gold-bullion-bars.jpg",
      "alt": "Physical gold bullion bars, the asset in Jack’s return calculation.",
      "credit": "Stevebidmead / Wikimedia Commons · CC0",
      "source": "https://commons.wikimedia.org/wiki/File:Gold_bullion_bars.jpg",
      "position": "50% 52%"
    },
    "chinaShares": {
      "src": "../../course-assets/images/lesson-03/shanghai-stock-exchange.jpg",
      "alt": "Shanghai Stock Exchange building represents Chinese shares; CSI 300 includes Shanghai and Shenzhen listings.",
      "credit": "钉钉 / Wikimedia Commons · CC BY-SA 4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Shanghai_Stock_Exchange6.jpg",
      "position": "50% 40%"
    },
    "chinaBonds": {
      "src": "../../course-assets/images/lesson-03/china-finance-ministry.jpg",
      "alt": "China’s Ministry of Finance, the issuer of central government bonds.",
      "credit": "N509FZ / Wikimedia Commons · CC BY-SA 4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Ministry_of_Finance_of_PRC,_south_wing_(20201028170321).jpg",
      "position": "50% 40%"
    }
  },
  "slides": [
    {
      "id": "hero",
      "kind": "hero",
      "title": "Assumed return",
      "zh": "假设回报率",
      "photo": {
        "src": "../../course-assets/images/lesson-04/assumed-return-hero.png",
        "alt": "Conceptual illustration: an investment history branches into three possible forecasts above gold and a camera, against the Shanghai skyline.",
        "credit": "AI-generated conceptual illustration · OpenAI ImageGen · 11 September 2026",
        "source": "SOURCE-NOTES.md",
        "position": "50% 50%"
      },
      "syllabus": [
        {
          "code": "1",
          "title": "Investment foundations and return",
          "zh": "投资基础与回报"
        },
        {
          "code": "1.1",
          "title": "Investment, saving and return",
          "zh": "投资、储蓄与回报"
        },
        {
          "code": "1.1.3",
          "title": "Compound growth: assumed return",
          "zh": "复利增长：假设回报率"
        }
      ],
      "note": "Revised 11 September 2026. The illustration links market uncertainty to Lucy’s savings goal; its paths are conceptual, not market data. Core: retrieval, forecast sensitivity, annualised meaning and method, real-data practice, required rate, evidence and forecast conditions. See LESSON_04_PLAN.md for pacing. Three optional applications follow the exit.",
      "subtitle": "¥2,000 today. A ¥2,400 camera in three years. What return would it take?"
    },
    {
      "id": "retrieval-compounding",
      "kind": "recall",
      "variant": "retrieval",
      "group": "RETRIEVAL",
      "title": "Retrieve: how compound growth works",
      "context": "Use what you learnt last lesson.",
      "items": [
        {
          "question": "What does reinvesting a return mean?",
          "answer": "Keeping the return invested so it can itself earn a return.",
          "answerZh": "把回报继续投入，使这部分回报也能产生回报。"
        },
        {
          "question": "Write the future-value formula and explain P, r and n.",
          "equations": [
            "FV = P(1 + r)^n"
          ],
          "answer": "P = starting amount; r = annual rate as a decimal; n = number of years. FV is the ending total."
        }
      ],
      "titleZh": "复习：复利增长",
      "note": "90 seconds. Silent recall before separate answer reveals. Retrieve only taught concepts. If students use r = 5 rather than 0.05, correct this before the calculation. No annualised-return retrieval because it has not been taught."
    },
    {
      "id": "retrieval-year-three",
      "kind": "recall",
      "variant": "retrieval",
      "group": "RETRIEVAL",
      "title": "Retrieve: the third year’s return",
      "context": "Suppose Emma invests ¥1,000 at 10% a year and reinvests every return.",
      "items": [
        {
          "question": "Calculate the return earned in year 3 only.",
          "equations": [
            "End of year 2 = 1,000 × (1.10)^2 = ¥1,210",
            "Year 3 return = 1,210 × 0.10 = ¥121"
          ],
          "answer": "¥100 uses the original balance. ¥331 is the total gain over three years."
        }
      ],
      "titleZh": "复习：第三年的回报",
      "note": "90 seconds. Ask for independent calculation, then reveal. Reteach the updated balance if students answer ¥100; distinguish one-year return from cumulative gain if they answer ¥331."
    },
    {
      "id": "objectives",
      "kind": "objectives",
      "variant": "visual-roadmap",
      "compact": true,
      "partialReveal": true,
      "group": "TODAY",
      "title": "Learning objectives",
      "titleZh": "学习目标",
      "items": [
        [
          "1",
          "Explain how a rate changes a forecast",
          "解释回报率如何改变预测"
        ],
        [
          "2",
          "Calculate and interpret annualised return",
          "计算并解释年化回报率"
        ],
        [
          "3",
          "Identify a forecast’s assumptions",
          "识别预测所需的假设"
        ]
      ],
      "note": "Three concise bilingual goals. No decorative pictures: the verbs and knowledge points carry the roadmap. Reveal one goal per click."
    },
    {
      "id": "section-assumed-return",
      "kind": "section",
      "number": "01",
      "title": "Assumed return",
      "zh": "假设回报率",
      "caption": "",
      "note": "After retrieval and objectives, introduce the calculation task, then animate rate sensitivity and define the chosen forecast input."
    },
    {
      "id": "opening-lin-claim",
      "kind": "recall",
      "variant": "retrieval",
      "group": "OPENING QUESTION",
      "title": "Lucy changes her forecast to 7%",
      "photo": {
        "src": "../../course-assets/images/lesson-03/camera-canon-eos.jpg",
        "alt": "A Canon camera represents Lucy’s photography-club savings goal.",
        "credit": "Thomas Wolf, www.foto-tw.de / Wikimedia Commons · CC BY-SA 3.0",
        "source": "https://commons.wikimedia.org/wiki/File:Canon_EOS_400D.jpg",
        "position": "50% 50%"
      },
      "context": "Lucy has ¥2,000 and wants a ¥2,400 camera in 3 years. She now assumes 7% a year, reinvests all returns and adds no money. Ignore fees and tax.",
      "items": [
        {
          "question": "Calculate Lucy’s forecast balance after 3 years and the amount above or below her budget.",
          "equations": [
            "FV = 2,000 × (1.07)^3 = ¥2,450.09",
            "Surplus = 2,450.09 − 2,400 = ¥50.09"
          ],
          "answer": "Her forecast is ¥50.09 above the budget. This result depends on earning the assumed return."
        }
      ],
      "note": "One explicit output: final balance and budget gap. Allow an attempt, then reveal the model. Do not add a second competing discussion question. The following animated graph changes only the rate. Lucy and her camera budget are hypothetical.",
      "formula": "FV = P(1 + r)^n"
    },
    {
      "id": "rate-comparison",
      "plotBottom": 170,
      "plotHeight": 250,
      "formula": "FV = P(1 + r)^n",
      "titleZh": "不同回报率能否达到目标？",
      "kind": "chart",
      "variant": "comparison-lines",
      "group": "DIAGRAM",
      "title": "Three rates, the same starting plan",
      "context": "Start with ¥2,000. Predict the next balance at each rate before revealing the next year.",
      "years": [
        0,
        1,
        2,
        3
      ],
      "min": 1800,
      "max": 2700,
      "ticks": [
        1800,
        2000,
        2200,
        2400,
        2600
      ],
      "target": 2400,
      "targetLabel": "Camera goal · 相机目标 ¥2,400",
      "series": [
        {
          "label": "3% a year",
          "tone": "muted",
          "values": [
            2000,
            2060,
            2121.7999999999997,
            2185.454
          ]
        },
        {
          "label": "5% a year",
          "tone": "copper",
          "values": [
            2000,
            2100,
            2205,
            2315.2500000000005
          ]
        },
        {
          "label": "7% a year",
          "tone": "forest",
          "values": [
            2000,
            2140,
            2289.8,
            2450.0860000000002
          ]
        }
      ],
      "conclusion": "At 7%: ¥2,450.09, above the goal. A higher assumed rate raises the calculated value.",
      "note": "Show the common start and target, with no future points. Ask students for each next-year balance, then click once to add that year for all three rates. Back reverses one year. Before year 3, collect a prediction about the target. P = 2,000 and n = 3 stay fixed; only r changes. The labelled vertical axis starts at ¥1,800 to make the divergence readable. 3% ends at 2185.454, 5% at 2315.25, 7% at 2450.086. This is a conditional forecast, not actual historical evidence.",
      "yearByYear": true,
      "showGap": false,
      "partialReveal": [
        ".comparison-year"
      ],
      "stagePrompts": [
        "Year 1: multiply ¥2,000 by 1.03, 1.05 and 1.07.",
        "Year 2: which balance must each rate now multiply? Calculate.",
        "Year 3: predict which line will cross the ¥2,400 goal. Calculate.",
        "Only 7% reaches the goal: ¥50.09 above it. Changing the input changes the forecast."
      ]
    },
    {
      "id": "definition-assumed-return",
      "highlights": [
        "assumed return",
        "input",
        "not a promised outcome"
      ],
      "highlightsZh": [
        "假设回报率",
        "输入条件",
        "不是承诺的结果"
      ],
      "kind": "definition",
      "group": "CONCEPT",
      "title": "Assumed return · 假设回报率",
      "prompt": "An assumed return is a rate used in a projection; it is an input and not a promised outcome.",
      "translation": "假设回报率是预测计算中采用的回报率；它是输入条件，而不是承诺的结果。",
      "note": "6–7 minutes. The 7% input makes a conditional forecast, not an available or promised return. Students next calculate a rate rather than merely choose one.",
      "sources": [
        {
          "label": "Current syllabus · 1.1.3 Compound growth: content, checkpoint and definitions",
          "href": "../../syllabus-2026-27.html"
        }
      ]
    },
    {
      "id": "section-annualised-return",
      "kind": "section",
      "number": "02",
      "title": "Annualised return",
      "zh": "年化回报率",
      "caption": "",
      "note": "First demonstrate an equivalent steady rate alongside an uneven path, then define annualised return. The formula is visible from the first teaching slide; derive it before calculator practice."
    },
    {
      "id": "annualised-return-meaning",
      "plotBottom": 190,
      "plotHeight": 270,
      "kind": "chart",
      "variant": "comparison-lines",
      "group": "MEANING",
      "title": "Different paths can have the same annualised return",
      "titleZh": "不同路径可以有相同的年化回报率",
      "formula": {
        "before": "r = ",
        "fraction": [
          "FV",
          "P"
        ],
        "exponent": "1/n",
        "after": " − 1"
      },
      "context": "Suppose both investments start at ¥2,000 and finish at ¥2,662 after 3 years. Compare their paths.",
      "years": [
        0,
        1,
        2,
        3
      ],
      "min": 1800,
      "max": 2900,
      "ticks": [
        1800,
        2000,
        2400,
        2800
      ],
      "legendValues": false,
      "series": [
        {
          "label": "Uneven returns · 逐年变化",
          "tone": "copper",
          "values": [
            2000,
            2400,
            2200,
            2662
          ]
        },
        {
          "label": "10% each year · 每年10%",
          "tone": "forest",
          "values": [
            2000,
            2200,
            2420,
            2662
          ]
        }
      ],
      "partialReveal": [
        ".concept-series",
        ".chart-reading"
      ],
      "conclusion": "Both are equivalent to 10% compound growth per year over these 3 years, even though one path includes a loss.",
      "note": "2 minutes. Constructed numbers; income retained and no external cash flows. First click shows the uneven path (+20%, −8.333…%, +21%). Ask students to identify the losing year. Second click shows the 10% path: ask what is identical and what differs. Third click consolidates: same start, finish and duration imply the same annualised rate; intermediate returns need not be 10%. Labels identify the paths, not separate investments being recommended. r = equivalent annual rate as decimal; P = start, FV = finish, n = years. Definition follows."
    },
    {
      "id": "definition-annualised-return",
      "kind": "definition",
      "group": "CONCEPT",
      "title": "Annualised return · 年化回报率",
      "prompt": "Annualised return is the constant yearly rate that would compound the starting value into the ending value over the same number of years.",
      "translation": "年化回报率是使初始价值在相同年数内，通过复利增长达到期末价值的固定年回报率。",
      "highlights": [
        "Annualised return",
        "constant yearly rate",
        "same number of years"
      ],
      "highlightsZh": [
        "年化回报率",
        "相同年数",
        "固定年回报率"
      ],
      "note": "One-minute consolidation of the graph. It describes an equivalent constant rate, not what happened in each year. The endpoint calculation here uses positive starting/ending values, no deposits or withdrawals and reinvested income. Ask students to explain “equivalent” by pointing to the matching endpoints. Then derive the formula."
    },
    {
      "id": "annualised-return-formula",
      "kind": "method",
      "variant": "equations",
      "group": "CALCULATION",
      "title": "From future value to annualised return",
      "titleZh": "由终值公式推导年化回报率",
      "partialReveal": [
        ".equation-step:not(:first-child)"
      ],
      "note": "2 minutes. Keep the known FV formula visible. Reveal divide by P, take power (1/n), subtract 1. This spreads the total growth factor across n identical yearly factors. Positive P and FV; n > 0. Show the calculator power key and bracket 1 ÷ n. Convert the decimal to percent only at the end.",
      "context": "P = starting value; FV = ending value; n = years. r is a decimal. Reinvest income; no deposits or withdrawals.",
      "steps": [
        {
          "label": "Start with the known formula · 已学公式",
          "equation": "FV = P(1 + r)^n"
        },
        {
          "label": "Divide both sides by P · 两边除以P",
          "equation": {
            "before": "",
            "fraction": [
              "FV",
              "P"
            ],
            "exponent": "",
            "after": " = (1 + r)^n"
          }
        },
        {
          "label": "Take the nth root · 两边开n次方",
          "equation": {
            "before": "",
            "fraction": [
              "FV",
              "P"
            ],
            "exponent": "1/n",
            "after": " = 1 + r"
          }
        },
        {
          "label": "Subtract 1; write r first · 减1并整理",
          "equation": {
            "before": "r = ",
            "fraction": [
              "FV",
              "P"
            ],
            "exponent": "1/n",
            "after": " − 1"
          },
          "tone": "copper"
        }
      ]
    },
    {
      "id": "annualised-return-model",
      "kind": "recall",
      "variant": "retrieval",
      "group": "CALCULATE",
      "title": "Gold: turn five years into one yearly rate",
      "context": "Suppose Jack’s gold followed the published US-dollar gold benchmark: US$1,000 at end-2020 becomes US$2,294.77 at end-2025. Gold pays no income. No cash flows; before fees and tax.",
      "items": [
        {
          "question": "Calculate the historical annualised return over these 5 years.",
          "equations": [
            {
              "before": "Total growth factor = ",
              "fraction": [
                "2,294.77",
                "1,000"
              ],
              "after": " ≈ 2.29477"
            },
            "Yearly factor = (2,294.77 ÷ 1,000)^(1/5) ≈ 1.18072",
            "r ≈ 1.18072 − 1 = 0.18072 ≈ 18.07%"
          ],
          "answer": "Equivalent to about 18.07% compound growth a year across this period. It does not mean gold rose by this rate each year."
        }
      ],
      "formula": {
        "before": "r = ",
        "fraction": [
          "FV",
          "P"
        ],
        "exponent": "1/n",
        "after": " − 1"
      },
      "photo": {
        "src": "../../course-assets/images/lesson-02/gold-bullion-bars.jpg",
        "alt": "Physical gold bullion bars, the asset in Jack’s return calculation.",
        "credit": "Stevebidmead / Wikimedia Commons · CC0",
        "source": "https://commons.wikimedia.org/wiki/File:Gold_bullion_bars.jpg",
        "position": "50% 52%"
      },
      "titleZh": "黄金：把五年增长换算成年化回报率",
      "sources": [
        {
          "label": "NYU Stern / Aswath Damodaran · Historical Returns, January 2026",
          "href": "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html"
        }
      ],
      "note": "3 minutes. Real benchmark performance, rebased to a hypothetical US$1,000; not an actual named investor's transaction. Source cumulative gold values end-2020 9162.31, end-2025 21025.41. Exact rebased finish 2294.771733329259; CAGR 18.072266052108056%. Students attempt first; reveal the full vertical model. Explain why the fifth root supplies the same multiplying factor five times. Check using 1000 × (1.1807226605210805)^5; do not round the rate before checking. Returns are USD price growth, nominal, before investor costs and taxes, no income or external cash flows. Gold image credit and source retained."
    },
    {
      "id": "annualised-real-practice",
      "kind": "recall",
      "variant": "retrieval",
      "group": "CALCULATE",
      "title": "US shares: calculate your own annualised return",
      "context": "Suppose Emma’s investment tracked the S&P 500, an index of large US companies. US$1,000 at end-2020 becomes US$1,952.39 at end-2025, with dividends reinvested and no deposits or withdrawals. Before fees and tax.",
      "items": [
        {
          "question": "Calculate the 5-year annualised return. Explain what your answer says about those five years.",
          "equations": [
            {
              "before": "r = ",
              "fraction": [
                "1,952.39",
                "1,000"
              ],
              "exponent": "1/5",
              "after": " − 1"
            },
            "r ≈ 0.143176 ≈ 14.32%"
          ],
          "answer": "This constant yearly rate would reproduce the same total growth. Actual yearly returns can be higher, lower or negative."
        }
      ],
      "formula": {
        "before": "r = ",
        "fraction": [
          "FV",
          "P"
        ],
        "exponent": "1/n",
        "after": " − 1"
      },
      "photo": {
        "src": "../../course-assets/images/lesson-02/nasdaq-stock-market-display.jpg",
        "alt": "The NASDAQ MarketSite display represents the US share market in the S&P 500 investment challenge.",
        "credit": "bfishadow / Wikimedia Commons · CC BY 2.0",
        "source": "https://commons.wikimedia.org/wiki/File:NASDAQ_stock_market_display.jpg",
        "position": "58% 50%"
      },
      "titleZh": "美国股票：独立计算年化回报率",
      "sources": [
        {
          "label": "NYU Stern / Aswath Damodaran · Historical Returns, January 2026",
          "href": "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html"
        }
      ],
      "note": "3 minutes of independent work and feedback. Dated real total-return benchmark, rebased to hypothetical US$1,000. Source cumulative S&P 500 wealth end-2020 592914.80; end-2025 1157598.95. Exact rebased finish 1952.3866666846568; CAGR 14.317617999508347%. Income is reinvested dividends; no external cash flows, before fees/tax, USD nominal returns. Accept rounding from the displayed endpoint. Diagnose dividing total percentage growth by 5 and using exponent 5. The stock-market photograph is representative, not an image of the S&P index itself."
    },
    {
      "id": "lin-required-return",
      "kind": "recall",
      "variant": "retrieval",
      "group": "CALCULATE",
      "title": "What annual return would Lucy need?",
      "titleZh": "Lucy需要多高的年回报率？",
      "formula": {
        "before": "r = ",
        "fraction": [
          "FV",
          "P"
        ],
        "exponent": "1/n",
        "after": " − 1"
      },
      "context": "Lucy has ¥2,000 for a ¥2,400 camera in 3 years. Reinvest all returns; no extra deposits, withdrawals, fees or tax.",
      "items": [
        {
          "question": "Find the constant yearly rate needed to meet her target. Would assuming 5% be enough?",
          "equations": [
            {
              "before": "r = ",
              "fraction": [
                "2,400",
                "2,000"
              ],
              "exponent": "1/3",
              "after": " − 1"
            },
            "r ≈ 0.0626586 ≈ 6.27% a year",
            "At 5%: FV = 2,000 × (1.05)^3 = ¥2,315.25"
          ],
          "answer": "5% is ¥84.75 short. The required 6.27% is not a guaranteed return."
        }
      ],
      "photo": {
        "src": "../../course-assets/images/lesson-03/camera-canon-eos.jpg",
        "alt": "A Canon camera represents Lucy’s photography-club savings goal.",
        "credit": "Thomas Wolf, www.foto-tw.de / Wikimedia Commons · CC BY-SA 3.0",
        "source": "https://commons.wikimedia.org/wiki/File:Canon_EOS_400D.jpg",
        "position": "50% 50%"
      },
      "note": "2 minutes of transfer. Use the same equation with a target instead of a historical endpoint. Required 6.27% is neither an offered return nor a prediction. Use the unrounded rate to check the target. Keep the camera case and hidden model."
    },
    {
      "id": "historical-returns-us",
      "kind": "three",
      "variant": "return-history",
      "group": "EVIDENCE",
      "title": "Which asset grew most in US dollars?",
      "titleZh": "美元资产的长期回报",
      "period": "2005–2025 · 21 years · US dollars",
      "context": "Use the method you just learnt: these rates match 21 years of total growth, not each individual year.",
      "partialReveal": [
        ".history-result"
      ],
      "scaleMax": 12,
      "items": [
        {
          "title": "Shares",
          "zh": "股票",
          "tone": "forest",
          "photo": {
            "src": "../../course-assets/images/lesson-02/nasdaq-stock-market-display.jpg",
            "alt": "The NASDAQ MarketSite display represents the US share market in the S&P 500 investment challenge.",
            "credit": "bfishadow / Wikimedia Commons · CC BY 2.0",
            "source": "https://commons.wikimedia.org/wiki/File:NASDAQ_stock_market_display.jpg",
            "position": "58% 50%"
          },
          "benchmark": "S&P 500 · large US companies",
          "rate": 10.61,
          "growth": "US$1,000 → ≈US$8,308",
          "treatment": "Dividends reinvested"
        },
        {
          "title": "Government bonds",
          "zh": "国债",
          "tone": "blue",
          "photo": {
            "src": "../../course-assets/images/lesson-02/us-treasury-building.jpg",
            "alt": "The US Treasury, issuer of US government bonds.",
            "credit": "MeanieHyaena / Wikimedia Commons · CC BY 4.0",
            "source": "https://commons.wikimedia.org/wiki/File:Us-treasury-building.jpg",
            "position": "50% 63%"
          },
          "benchmark": "US Treasury · 10-year bonds",
          "rate": 2.81,
          "growth": "US$1,000 → ≈US$1,790",
          "treatment": "Interest reinvested"
        },
        {
          "title": "Gold",
          "zh": "黄金",
          "tone": "copper",
          "photo": {
            "src": "../../course-assets/images/lesson-02/gold-bullion-bars.jpg",
            "alt": "Physical gold bullion bars, the asset in Jack’s return calculation.",
            "credit": "Stevebidmead / Wikimedia Commons · CC0",
            "source": "https://commons.wikimedia.org/wiki/File:Gold_bullion_bars.jpg",
            "position": "50% 52%"
          },
          "benchmark": "Gold priced in US dollars",
          "rate": 11.57,
          "growth": "US$1,000 → ≈US$9,962",
          "treatment": "Price growth · no income"
        }
      ],
      "footnote": "Before inflation, investor fees and tax. Reinvest income; add no money.",
      "sourceCaption": "Source: Damodaran / NYU Stern, January 2026. Calculations: end-2004 to end-2025.",
      "note": "Brief evidence discussion. Use existing sourced comparisons. Connect one number to the new formula: (8308 ÷ 1000)^(1/21) − 1 ≈ 10.61%. Rounded endpoints suffice for a demonstration. Ask for a ranking before revealing one asset’s results per click. Gold narrowly outpaced shares in this window; the ranking is period-dependent. The 21 annual returns run from 2005 through 2025 inclusive. CAGR = (ending wealth / starting wealth)^(1/21) − 1; not the arithmetic mean of annual returns. Published cumulative values at end-2004 / end-2025: S&P 500 139341.42 / 1157598.95; 10-year Treasury 4331.30 / 7752.88; gold 2110.47 / 21025.41. Corresponding exact computed percentages: 10.6075217, 2.8111527, 11.5683998. Growth endpoints use cumulative-value ratios, not rounded displayed rates. Stocks and bonds are total returns, including reinvested income and price change. Bond figure is not a fixed coupon or today’s yield; the dataset tracks a rolling 10-year bond investment. Gold pays no income; compounding here describes successive price changes. This is a historical compound equivalent, not steady annual payments. NASDAQ photo represents the US market, not an S&P index constituent list. The Treasury photo identifies the bond issuer.",
      "sources": [
        {
          "label": "Aswath Damodaran, NYU Stern · Historical returns, January 2026; 2005–2025 CAGR calculated from cumulative values",
          "href": "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html"
        }
      ]
    },
    {
      "id": "historical-growth-us",
      "kind": "chart",
      "variant": "comparison-lines",
      "historical": true,
      "endLabels": true,
      "legendValues": false,
      "plotRight": 815,
      "pointRadius": 2.5,
      "group": "EVIDENCE",
      "title": "US assets: growth of US$1,000",
      "titleZh": "美国资产：不同的增长路径",
      "context": "US$1,000 in each asset at end-2004 · reinvest income · add no money",
      "currency": "US$",
      "unit": "US dollars",
      "years": [
        2004,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
        2023,
        2024,
        2025
      ],
      "xTicks": [
        2004,
        2008,
        2012,
        2016,
        2020,
        2025
      ],
      "axisLabel": "End of year · 年末",
      "min": 0,
      "max": 11000,
      "ticks": [
        0,
        2000,
        4000,
        6000,
        8000,
        10000
      ],
      "series": [
        {
          "label": "Shares · 股票",
          "tone": "forest",
          "values": [
            1000,
            1048.3447778844222,
            1212.018221143433,
            1278.4942194503258,
            811.174595464866,
            1021.5546102515676,
            1172.9602009223102,
            1197.5732700298304,
            1387.8746893780756,
            1834.0082223935997,
            2082.0472476884474,
            2110.7563709340693,
            2359.2574268297253,
            2868.9864076309827,
            2747.7180869837553,
            3605.3270448944754,
            4255.122418014686,
            5466.506872113115,
            4480.4854148895565,
            5648.130541514504,
            7053.307049691326,
            8307.64427404285
          ]
        },
        {
          "label": "Govt bonds · 国债",
          "tone": "blue",
          "values": [
            1000,
            1028.674993650867,
            1048.8467665596932,
            1155.9323990487842,
            1388.289889871401,
            1233.9597811280676,
            1338.3880128367925,
            1553.0025627409784,
            1599.1503705584926,
            1453.5566688984832,
            1609.7568859233947,
            1630.431971925288,
            1641.6895620252578,
            1687.6849906494585,
            1687.4033200193937,
            1849.9965368365156,
            2059.635675201441,
            1968.6814582227046,
            1617.701382956618,
            1680.46775794796,
            1652.956387227853,
            1789.9660609978528
          ]
        },
        {
          "label": "Gold · 黄金",
          "tone": "copper",
          "values": [
            1000,
            1177.6855392400744,
            1450.8711329703813,
            1914.023890413036,
            1996.6689884243797,
            2496.5529005387425,
            3226.5751230768506,
            3614.5455751562454,
            3820.0116561713744,
            2765.147099935086,
            2768.5870919747736,
            2433.420043876483,
            2630.6178244656408,
            2963.7189820277,
            2936.1753543049654,
            3496.320724767469,
            4341.359981425939,
            4178.36311342971,
            4201.320085099528,
            4758.50402990803,
            5993.6743948030535,
            9962.43016958308
          ]
        }
      ],
      "conclusion": "Gold finished highest. Did it lead throughout? Look for changes in the leading asset.",
      "sourceCaption": "Source: Damodaran / NYU Stern, January 2026 · annual observations · nominal, before investor fees/tax",
      "note": "Brief evidence discussion. One task: find a year when shares fell; explain why the 10.61% annualised rate does not describe every year. Trace the same three investments as the previous slide, using actual published end-year cumulative wealth rebased to US$1,000 at end-2004. 22 points cover 21 years of returns. Shares: S&P 500 including dividends; bonds: rolling 10-year Treasury total return; gold: dollar price, no income. All available income reinvested, no contributions. Each line is straight only between adjacent annual observations; no constant-rate smoothing and no representation of within-year paths. The gold and share rankings change during this period. US shares and bonds both fell in 2022. Direct endpoint labels round to whole dollars and reconcile with the preceding card. Both country graphs share years and a zero-based 0–11,000 numerical scale, but currencies differ. Green solid = shares, blue dashed = bonds, copper solid = gold. Annualised rates summarise the endpoints, not a steady path. Retain the source calculation and benchmark qualifications in SOURCE-NOTES.",
      "sources": [
        {
          "label": "Aswath Damodaran, NYU Stern · Historical returns, January 2026; 2005–2025 CAGR calculated from cumulative values",
          "href": "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html"
        }
      ]
    },
    {
      "id": "historical-returns-china",
      "kind": "three",
      "variant": "return-history",
      "group": "EVIDENCE",
      "title": "Did the same pattern appear in China?",
      "titleZh": "中国资产的长期回报",
      "period": "2005–2025 · 21 years · Renminbi (RMB)",
      "context": "Compare the same asset types and years. Which differences do you notice?",
      "partialReveal": [
        ".history-result"
      ],
      "scaleMax": 12,
      "items": [
        {
          "title": "Shares",
          "zh": "股票",
          "tone": "forest",
          "photo": {
            "src": "../../course-assets/images/lesson-03/shanghai-stock-exchange.jpg",
            "alt": "Shanghai Stock Exchange building represents Chinese shares; CSI 300 includes Shanghai and Shenzhen listings.",
            "credit": "钉钉 / Wikimedia Commons · CC BY-SA 4.0",
            "source": "https://commons.wikimedia.org/wiki/File:Shanghai_Stock_Exchange6.jpg",
            "position": "50% 40%"
          },
          "benchmark": "CSI 300 · 沪深300",
          "rate": 9.71,
          "growth": "¥1,000 → ≈¥7,000",
          "treatment": "Dividends reinvested",
          "comparisonRate": 10.61
        },
        {
          "title": "Government bonds",
          "zh": "国债",
          "tone": "blue",
          "photo": {
            "src": "../../course-assets/images/lesson-03/china-finance-ministry.jpg",
            "alt": "China’s Ministry of Finance, the issuer of central government bonds.",
            "credit": "N509FZ / Wikimedia Commons · CC BY-SA 4.0",
            "source": "https://commons.wikimedia.org/wiki/File:Ministry_of_Finance_of_PRC,_south_wing_(20201028170321).jpg",
            "position": "50% 40%"
          },
          "benchmark": "China government · 7–10 years",
          "rate": 4.36,
          "growth": "¥1,000 → ≈¥2,450",
          "treatment": "Interest reinvested",
          "comparisonRate": 2.81
        },
        {
          "title": "Gold",
          "zh": "黄金",
          "tone": "copper",
          "photo": {
            "src": "../../course-assets/images/lesson-02/gold-bullion-bars.jpg",
            "alt": "Physical gold bullion bars, the asset in Jack’s return calculation.",
            "credit": "Stevebidmead / Wikimedia Commons · CC0",
            "source": "https://commons.wikimedia.org/wiki/File:Gold_bullion_bars.jpg",
            "position": "50% 52%"
          },
          "benchmark": "Shanghai gold · Au9999",
          "rate": 10.57,
          "growth": "¥1,000 → ≈¥8,260",
          "treatment": "Price growth · no income",
          "comparisonRate": 11.57
        }
      ],
      "footnote": "China: RMB. US reference: USD. No currency conversion; before inflation, fees and tax.",
      "sourceCaption": "Sources: Chen Peng / 有知有行, SBBI China Yearbook 2025; US comparison: NYU Stern.",
      "note": "Brief evidence discussion. Compare shares, bonds and gold over the same years. Keep RMB separate from USD. Reveal each result and compare with its US reference rate. Large annualised figures and ending wealth use the same card hierarchy as the US slide; asset colours match the following charts. Same years and broad asset categories, but country benchmarks differ: CSI 300 total-return index H00300; ChinaBond 7–10-year Treasury wealth index CBA06501; Shanghai Gold Exchange Au9999 price. Published annualised rates are 9.71%, 4.36%, 10.57%. Appendix end-2025 wealth multiples on an end-2004 base of 1 are 7.00, 2.45, 8.26; endpoints are approximate and use these published multiples, not rounded-rate exponentiation. Shares/bonds include reinvested dividends/coupons. The yearbook estimates CSI 300 dividends for 2005 and early bond observations for 2005–2006; retain that caveat in teacher notes. These are local-currency nominal comparisons, not returns to a Chinese investor buying US assets: exchange-rate changes and costs would also matter. Gold is the same broad global asset priced in different currencies/markets; do not treat it as two independent national assets. Gold exceeds CSI 300 in this window; the three selected categories do not represent every asset. Stock exchange photo represents the market; the Ministry of Finance photo identifies the bond issuer.",
      "sources": [
        {
          "label": "Chen Peng / 有知有行 · SBBI China Yearbook 2025, chapter 1: 2005–2025 annualised returns and benchmarks",
          "href": "https://youzhiyouxing.cn/sbbi2025/cumulative-chart/"
        },
        {
          "label": "SBBI China Yearbook 2025 · Appendix: cumulative wealth indices",
          "href": "https://youzhiyouxing.cn/sbbi2025/appendix/"
        },
        {
          "label": "SBBI China Yearbook 2025 · Estimated early index data and annual CSI 300 returns",
          "href": "https://youzhiyouxing.cn/sbbi2025/estimated-data/"
        },
        {
          "label": "Aswath Damodaran, NYU Stern · Historical returns, January 2026; 2005–2025 CAGR calculated from cumulative values",
          "href": "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html"
        }
      ]
    },
    {
      "id": "historical-growth-china",
      "kind": "chart",
      "variant": "comparison-lines",
      "historical": true,
      "endLabels": true,
      "legendValues": false,
      "plotRight": 815,
      "pointRadius": 2.5,
      "group": "EVIDENCE",
      "title": "China: growth came with sharp falls",
      "titleZh": "中国资产：增长也伴随下跌",
      "context": "¥1,000 in each asset at end-2004 · reinvest income · add no money",
      "currency": "¥",
      "unit": "Renminbi (¥)",
      "years": [
        2004,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
        2023,
        2024,
        2025
      ],
      "xTicks": [
        2004,
        2008,
        2012,
        2016,
        2020,
        2025
      ],
      "axisLabel": "End of year · 年末",
      "min": 0,
      "max": 11000,
      "ticks": [
        0,
        2000,
        4000,
        6000,
        8000,
        10000
      ],
      "series": [
        {
          "label": "Shares · 股票",
          "tone": "forest",
          "values": [
            1000,
            950,
            2130,
            5620,
            1930,
            3840,
            3390,
            2580,
            2830,
            2680,
            4170,
            4480,
            4059.9999999999995,
            5050,
            3850,
            5360,
            6970,
            6720,
            5390,
            4900,
            5790,
            7000
          ]
        },
        {
          "label": "Govt bonds · 国债",
          "tone": "blue",
          "values": [
            1000,
            1140,
            1180,
            1120,
            1330,
            1290,
            1310,
            1400,
            1440,
            1390,
            1550,
            1690,
            1720,
            1670,
            1820,
            1900,
            1940,
            2060,
            2120,
            2220,
            2430,
            2450
          ]
        },
        {
          "label": "Gold · 黄金",
          "tone": "copper",
          "values": [
            1000,
            1130,
            1350,
            1650,
            1610,
            2070,
            2560,
            2710,
            2830,
            2000,
            2040,
            1890,
            2230,
            2310,
            2410,
            2890,
            3300,
            3170,
            3480,
            4059.9999999999995,
            5210,
            8260
          ]
        }
      ],
      "conclusion": "Find the 2008 share-market fall. Would the 21-year average protect a 3-year goal?",
      "sourceCaption": "Source: Chen Peng / 有知有行, SBBI China Yearbook 2025, Appendix 1.1 · annual observations",
      "note": "Brief evidence discussion. One task: locate the 2008 drop and explain the implication for Lucy’s three-year deadline. Use the same CSI 300, ChinaBond 7–10-year Treasury and Shanghai Au9999 series as the previous slide. Multiply each published Appendix 1.1 wealth index by 1,000. Source indices are rounded to two decimals, so chart points are approximate to about ¥10; do not derive more precise annual percentage changes from them. Final amounts ¥7,000, ¥2,450, ¥8,260 match the snapshot cards. CSI 300 peaks near ¥5,620 in 2007 then falls to about ¥1,930 in 2008; the separately published annual return is −65.61%. Keep the early estimated-data caveats in SOURCE-NOTES (2005 stock dividends; 2005–2006 bonds). Identical scale and colours to the US chart, in RMB rather than USD. No FX adjustment. Income reinvested, no fresh contributions, nominal values before investor costs/taxes; gold has no income. Lines connect end-year observations, not all intra-year market movements. Ask the question before proceeding to Lucy’s three-year camera deadline.",
      "sources": [
        {
          "label": "SBBI China Yearbook 2025 · Appendix: cumulative wealth indices",
          "href": "https://youzhiyouxing.cn/sbbi2025/appendix/"
        },
        {
          "label": "Chen Peng / 有知有行 · SBBI China Yearbook 2025, chapter 1: 2005–2025 annualised returns and benchmarks",
          "href": "https://youzhiyouxing.cn/sbbi2025/cumulative-chart/"
        },
        {
          "label": "SBBI China Yearbook 2025 · Estimated early index data and annual CSI 300 returns",
          "href": "https://youzhiyouxing.cn/sbbi2025/estimated-data/"
        }
      ]
    },
    {
      "id": "section-forecast-assumptions",
      "kind": "section",
      "number": "03",
      "title": "Forecast assumptions",
      "zh": "预测假设",
      "caption": "",
      "note": "Final section: state the specific conditions in Lucy’s 7% scenario, then assess annualised return and forecast interpretation. The gain/loss arithmetic task has moved after the core ending."
    },
    {
      "id": "projection-assumptions",
      "titleZh": "Lucy的预测假设",
      "kind": "method",
      "partialReveal": [
        ".method-row"
      ],
      "group": "CONCEPT",
      "title": "What Lucy’s forecast assumes",
      "steps": [
        {
          "text": "A 7% return each year for 3 years.",
          "zh": "连续3年，每年的回报率均为7%。"
        },
        {
          "text": "All returns stay invested.",
          "zh": "所有回报都继续投入。"
        },
        {
          "text": "No money is added or withdrawn.",
          "zh": "不追加资金，也不取出资金。"
        },
        {
          "text": "Fees and taxes are ignored.",
          "zh": "不计费用和税收。"
        },
        {
          "text": "The camera will cost ¥2,400 in 3 years.",
          "zh": "3年后，相机的价格为2,400元。"
        }
      ],
      "note": "2 minutes. One aligned bilingual list, one numbered condition per click, each English statement directly above its faithful Chinese equivalent. Relate all five to the visible 7% calculation, not the earlier 5% baseline. For item 1, a constant rate is a simplifying path assumption; varying returns with the same 3-year compound factor can produce the same endpoint. Ask orally which condition breaks if Lucy withdraws money or pays a fee. Historical annualised performance alone establishes none of these future conditions.",
      "formula": "2,000 × (1.07)^3 = ¥2,450.09"
    },
    {
      "id": "final-check",
      "kind": "recall",
      "variant": "retrieval",
      "group": "EXIT QUESTION",
      "title": "Calculate the return. Then judge the claim.",
      "titleZh": "计算回报率，再判断预测",
      "formula": {
        "before": "r = ",
        "fraction": [
          "FV",
          "P"
        ],
        "exponent": "1/n",
        "after": " − 1"
      },
      "context": "A fund grew from ¥1,000 to ¥1,210 over 2 years, with all income reinvested and no extra deposits. Lucy says: “So I can assume it pays 10% every year.”",
      "items": [
        {
          "question": "Calculate the historical annualised return. Is Lucy’s claim justified? Name two other assumptions her forecast needs.",
          "equations": [
            {
              "before": "r = ",
              "fraction": [
                "1,210",
                "1,000"
              ],
              "exponent": "1/2",
              "after": " − 1"
            },
            "r = 1.10 − 1 = 0.10 = 10%"
          ],
          "answer": "No. 10% is the equivalent annual growth over those past 2 years, not a promised future payment. A forecast also assumes reinvestment and no added or withdrawn money; fees, tax and the target price must be specified."
        }
      ],
      "note": "Last 4 minutes plus 2-minute feedback buffer. Independent assessment: correct ratio and root, percent conversion, historical interpretation and two valid forecast assumptions. Core ending. Do not proceed to optional questions before all students attempt the exit. Record the actual stopping point; prepared content is not reported coverage."
    },
    {
      "id": "changing-returns-check",
      "titleZh": "拓展：算术平均为零，资金仍可能减少",
      "kind": "recall",
      "variant": "retrieval",
      "group": "EXTRA PRACTICE · OPTIONAL",
      "title": "An average of 0% can still lose money",
      "context": "Jack invests ¥2,000. It gains 20% in year 1, then loses 20% in year 2. He keeps everything invested and adds no money.",
      "items": [
        {
          "question": "Calculate the ending value, then the annualised return over the 2 years.",
          "equations": [
            "FV = 2,000 × 1.20 × 0.80 = ¥1,920",
            {
              "before": "r = ",
              "fraction": [
                "1,920",
                "2,000"
              ],
              "exponent": "1/2",
              "after": " − 1 ≈ −2.02%"
            }
          ],
          "answer": "The simple average is 0%, but compound annualised return is about −2.02%. The loss applies to a larger balance."
        }
      ],
      "note": "Optional after the exit: a precise annualised-return misconception, not a separate forecast assumption. Multiply successive factors, then calculate the equivalent steady loss. +20% and −20% have arithmetic mean zero but product 0.96. Connect to the earlier uneven-versus-steady paths. 3 minutes if time permits.",
      "formula": {
        "before": "r = ",
        "fraction": [
          "FV",
          "P"
        ],
        "exponent": "1/n",
        "after": " − 1"
      }
    },
    {
      "id": "mei-changing-budget",
      "kind": "recall",
      "variant": "retrieval",
      "group": "EXTRA PRACTICE · OPTIONAL",
      "title": "Emma’s phone budget changes",
      "titleZh": "拓展：Emma的手机预算变化",
      "photo": {
        "src": "../../course-assets/images/lesson-03/iphone-17-pro.jpg",
        "alt": "An iPhone 17 Pro represents Emma’s goal of buying a new iPhone.",
        "credit": "茅野ふたば / Wikimedia Commons · CC BY-SA 4.0",
        "source": "https://commons.wikimedia.org/wiki/File:IPhone_17_Pro.jpg",
        "position": "50% 50%"
      },
      "context": "Emma’s earlier plan started with ¥6,500 and assumed 10% a year for 3 years. Suppose her savings reach the forecast ¥8,651.50, but the phone she wants now costs ¥8,800.",
      "items": [
        {
          "question": "Has Emma reached her goal? Calculate the gap and identify the assumption that failed.",
          "equations": [
            "Shortfall = 8,800 − 8,651.50 = ¥148.50"
          ],
          "answer": "No. Her original plan assumed the phone budget would stay ¥8,000. Even with the forecast return, the higher target leaves her ¥148.50 short."
        }
      ],
      "note": "Optional 3–4 minutes after the core ending. Independent transfer to the familiar phone case. The final balance is supplied to keep focus on interpreting assumptions rather than repeating the full FV calculation. One product’s price change is not evidence of general inflation; do not define nominal/real return here. The phone photo is an iPhone 17 Pro representing the planned future purchase, not a future model or a current price quotation. Both budgets are hypothetical."
    },
    {
      "id": "extra-lin-table",
      "formula": "FV = P(1 + r)^n",
      "titleZh": "拓展：多等一年",
      "kind": "recall",
      "variant": "retrieval",
      "group": "EXTRA PRACTICE · OPTIONAL",
      "title": "One more year for Lucy’s camera",
      "context": "Keep Lucy’s ¥2,000 start, 5% annual return and ¥2,400 budget. Reinvest all returns; no extra deposits, fees or tax.",
      "items": [
        {
          "question": "Build a three-year balance table. Would waiting a fourth year let Lucy reach her goal?",
          "table": {
            "columns": [
              "Year",
              "Starting balance",
              "Interest (5%)",
              "Ending balance"
            ],
            "rows": [
              [
                "1",
                "¥2,000",
                "¥100",
                "¥2,100"
              ],
              [
                "2",
                "¥2,100",
                "¥105",
                "¥2,205"
              ],
              [
                "3",
                "¥2,205",
                "¥110.25",
                "¥2,315.25"
              ]
            ]
          },
          "equations": [],
          "answer": "Year 4: ¥2,315.25 × 1.05 = ¥2,431.01. Yes: ¥31.01 above the budget, if the assumptions hold."
        }
      ],
      "note": "Optional 3–4 minute task after the main ending. Students produce the three-year table and apply one more round of growth. This preserves the syllabus table output as available extension work while keeping the last teaching section focused on assumed return. The fourth-year growth is ¥115.76; exact FV is 2431.0125. Time creates another compounding period at this assumed positive rate, not a guarantee of gains."
    }
  ]
};
