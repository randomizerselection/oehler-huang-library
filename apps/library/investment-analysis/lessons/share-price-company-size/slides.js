/* Canonical Investment lesson. Local compositions; shared course navigation. */
(function () {
 window.INVESTMENT_COURSE = window.INVESTMENT_COURSE || {};
 window.INVESTMENT_COURSE.lesson = {
  "meta": {
    "lesson": 5,
    "title": "Share price and company size",
    "titleZh": "股价与公司规模",
    "folio": "MARKET CAPITALISATION",
    "course": "Investment Course",
    "source": "../../syllabus-2026-27.html · 3.1.3",
    "designReference": "IGCSE 5.3 Population growth; A-level 9.2.3 Business cycle and 9.2.4 Growth policies",
    "evidenceDate": "2026-09-22",
    "plannedMinutes": 40,
    "coreSlideCount": 33,
    "version": "2026-09-23-directional-definitions",
    "assessment": "One market-capitalisation calculation practice, two formative hinge MCQs and four independent exam-style MCQs including the exit",
    "dataBasis": "Rounded historical 2025 inputs; all new events and split prices explicitly hypothetical",
    "informationSectionMinutes": 15
  },
  "photos": {
    "hero": {
      "src": "../../course-assets/images/lesson-02/apple-fifth-avenue-new.jpg",
      "alt": "Apple’s glass store entrance on Fifth Avenue, New York.",
      "credit": "Ed Uthman / Wikimedia Commons · CC BY-SA 2.5; CSS crop",
      "source": "https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg",
      "position": "50% 50%"
    },
    "apple": {
      "src": "../../course-assets/images/lesson-02/apple-fifth-avenue-new.jpg",
      "alt": "Apple’s glass store entrance on Fifth Avenue, New York.",
      "credit": "Ed Uthman / Wikimedia Commons · CC BY-SA 2.5; CSS crop",
      "source": "https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg",
      "position": "50% 50%"
    },
    "costco": {
      "src": "../../course-assets/images/share-price-company-size/costco.jpg",
      "alt": "The exterior and signage of a Costco Wholesale warehouse.",
      "credit": "Ambrosia LaFluer / Wikimedia Commons · CC BY 2.0; CSS crop",
      "source": "https://commons.wikimedia.org/wiki/File:Costco_Exterior.jpg",
      "position": "50% 45%"
    },
    "nintendo": {
      "src": "../../course-assets/images/share-price-company-size/nintendo.jpg",
      "alt": "Nintendo Switch Joy-Con controllers on a dark surface.",
      "credit": "Aleks Dorohovich / Unsplash License",
      "source": "https://unsplash.com/photos/nintendo-switch-on-black-surface-zufXg9Zc9Ig"
    },
    "nvidia": {
      "src": "../../course-assets/images/share-price-company-size/nvidia-headquarters.jpg",
      "alt": "NVIDIA’s headquarters in Santa Clara, California, photographed in August 2018.",
      "credit": "Coolcaesar; corrected by Jacek Halicki / Wikimedia Commons · CC BY-SA 4.0; CSS crop",
      "source": "https://commons.wikimedia.org/wiki/File:NVIDIA_Headquarters.jpg",
      "position": "50% 48%"
    }
  },
  "slides": [
    {
      "id": "hero",
      "kind": "hero",
      "title": "Share price and company size",
      "zh": "股价与公司规模",
      "subtitle": "Apple or Costco: does a higher share price mean a bigger company?",
      "photo": {
        "src": "../../course-assets/images/lesson-02/apple-fifth-avenue-new.jpg",
        "alt": "Apple’s glass store entrance on Fifth Avenue, New York.",
        "credit": "Ed Uthman / Wikimedia Commons · CC BY-SA 2.5; CSS crop",
        "source": "https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg",
        "position": "50% 50%"
      },
      "syllabus": [
        {
          "code": "3",
          "title": "Markets and company analysis",
          "zh": "市场与公司分析"
        },
        {
          "code": "3.1",
          "title": "How markets work",
          "zh": "市场如何运作"
        },
        {
          "code": "3.1.3",
          "title": "Share price and market capitalisation",
          "zh": "股价与市值"
        }
      ],
      "note": "0:00–0:15. Preview the puzzle without answering it. This is prepared teaching, not confirmed coverage.",
      "sources": [
        {
          "label": "Ed Uthman / Wikimedia Commons · CC BY-SA 2.5; CSS crop",
          "href": "https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg"
        },
        {
          "label": "Ambrosia LaFluer / Wikimedia Commons · CC BY 2.0; CSS crop",
          "href": "https://commons.wikimedia.org/wiki/File:Costco_Exterior.jpg"
        }
      ]
    },
    {
      "id": "retrieval-shares",
      "kind": "recall",
      "variant": "retrieval",
      "group": "RETRIEVAL",
      "title": "Shares and an order cost",
      "context": "Suppose Emma buys 3 Apple shares at $270 each. Ignore charges.",
      "items": [
        {
          "question": "What does one share represent?",
          "answer": "One unit of ownership in a company.",
          "answerZh": "公司所有权的一份。"
        },
        {
          "question": "What is the value of Emma’s three shares?",
          "equations": [
            "3 × $270 = $810"
          ],
          "answer": "This values her holding, not all of Apple."
        }
      ],
      "note": "0:15–1:40. Individual answers; reveal separately. Hypothetical purchase at a rounded teaching price. Correct loan/whole-company misconceptions now."
    },
    {
      "id": "objectives",
      "kind": "objectives",
      "compact": false,
      "partialReveal": true,
      "group": "TODAY",
      "title": "Learning objectives",
      "titleZh": "学习目标",
      "items": [
        [
          "1",
          "Calculate and compare company market values",
          "计算并比较公司市值"
        ],
        [
          "2",
          "Explain how changing expectations affect share prices",
          "解释预期变化如何影响股价"
        ],
        [
          "3",
          "Explain a stock split and test investment claims",
          "解释拆股并判断投资说法"
        ]
      ],
      "note": "1:40–2:00. Three connected outcomes: measure value, explain a change, distinguish a split from a gain or loss."
    },
    {
      "id": "section-one-and-whole",
      "kind": "section",
      "number": "01",
      "title": "Market capitalisation",
      "zh": "公司市值",
      "caption": "",
      "backdrop": {
        "src": "../../course-assets/images/lesson-02/apple-fifth-avenue-new.jpg",
        "alt": "Apple’s glass store entrance on Fifth Avenue, New York.",
        "credit": "Ed Uthman / Wikimedia Commons · CC BY-SA 2.5; CSS crop",
        "source": "https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg",
        "position": "50% 50%"
      },
      "note": "2:00–2:10. Name the concept clearly before moving from one quoted share price to the value of all outstanding shares.",
      "sources": [
        {
          "label": "Ed Uthman / Wikimedia Commons · CC BY-SA 2.5; CSS crop",
          "href": "https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg"
        }
      ]
    },
    {
      "id": "opening-price-puzzle",
      "kind": "short",
      "group": "SHARE PRICE & COMPANY SIZE",
      "title": "Which company is worth more?",
      "titleZh": "哪家公司的市值更高？",
      "scene": "price-puzzle",
      "prompt": "Which company is worth more?",
      "partialReveal": false,
      "companies": [
        {
          "name": "Apple",
          "ticker": "AAPL",
          "price": 270,
          "shares": 15000,
          "sharesLabel": "15 billion",
          "capLabel": "$4,050 billion",
          "tone": "forest",
          "photo": {
            "src": "../../course-assets/images/lesson-02/apple-fifth-avenue-new.jpg",
            "alt": "Apple’s glass store entrance on Fifth Avenue, New York.",
            "credit": "Ed Uthman / Wikimedia Commons · CC BY-SA 2.5; CSS crop",
            "source": "https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg",
            "position": "50% 50%"
          }
        },
        {
          "name": "Costco",
          "ticker": "COST",
          "price": 860,
          "shares": 440,
          "sharesLabel": "440 million",
          "capLabel": "$378.4 billion",
          "tone": "copper",
          "photo": {
            "src": "../../course-assets/images/share-price-company-size/costco.jpg",
            "alt": "The exterior and signage of a Costco Wholesale warehouse.",
            "credit": "Ambrosia LaFluer / Wikimedia Commons · CC BY 2.0; CSS crop",
            "source": "https://commons.wikimedia.org/wiki/File:Costco_Exterior.jpg",
            "position": "50% 45%"
          }
        }
      ],
      "question": "Vote: Apple, Costco, or not enough information. What number is missing?",
      "support": "Rounded historical prices · 31 December 2025 (USD)",
      "sources": [
        {
          "label": "Apple 2025 10-K · 14,776,353,000 shares, 17 October 2025",
          "href": "https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm"
        },
        {
          "label": "Costco 2025 10-K · 443,179,176 shares, 30 September 2025",
          "href": "https://www.sec.gov/Archives/edgar/data/909832/000090983225000101/cost-20250831.htm"
        },
        {
          "label": "AAPL · 31 December 2025 unadjusted close $271.86",
          "href": "https://finance.yahoo.com/quote/AAPL/history/"
        },
        {
          "label": "COST · 31 December 2025 unadjusted close $862.34",
          "href": "https://ca.finance.yahoo.com/quote/COST/history/"
        },
        {
          "label": "Ed Uthman / Wikimedia Commons · CC BY-SA 2.5; CSS crop",
          "href": "https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg"
        },
        {
          "label": "Ambrosia LaFluer / Wikimedia Commons · CC BY 2.0; CSS crop",
          "href": "https://commons.wikimedia.org/wiki/File:Costco_Exterior.jpg"
        }
      ],
      "note": "2:10–3:00. Everyone votes with a reason. Price alone is insufficient. Both prices are in USD. Teaching inputs: 31 Dec 2025 closes rounded to $270 / $860; separately dated 2025 reported share counts rounded to 15 billion / 440 million. These are approximate classroom comparisons, not exact same-day market caps. 1 billion = 1,000 million; 1 trillion = 1,000 billion."
    },
    {
      "id": "one-share-two-companies",
      "kind": "short",
      "group": "SHARE PRICE & COMPANY SIZE",
      "title": "Shares outstanding",
      "titleZh": "已发行在外股票",
      "scene": "ownership",
      "prompt": "Shares outstanding",
      "partialReveal": false,
      "question": "Which share count is used to value the whole company?",
      "left": {
        "title": "Emma’s holding · 个人持股",
        "count": "3 shares",
        "calculation": "$270 × 3 = $810"
      },
      "right": {
        "title": "All shareholders · 全体股东",
        "count": "15 billion shares",
        "calculation": "$270 × 15 billion = $4,050 billion"
      },
      "sources": [
        {
          "label": "Apple 2025 10-K · 14,776,353,000 shares, 17 October 2025",
          "href": "https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm"
        },
        {
          "label": "Costco 2025 10-K · 443,179,176 shares, 30 September 2025",
          "href": "https://www.sec.gov/Archives/edgar/data/909832/000090983225000101/cost-20250831.htm"
        },
        {
          "label": "AAPL · 31 December 2025 unadjusted close $271.86",
          "href": "https://finance.yahoo.com/quote/AAPL/history/"
        },
        {
          "label": "COST · 31 December 2025 unadjusted close $862.34",
          "href": "https://ca.finance.yahoo.com/quote/COST/history/"
        }
      ],
      "note": "3:00–4:20. Reveal Emma’s holding value, then the value of all outstanding shares. The number of shares is not the number of shareholders. Multiplying a quote by all shares outstanding gives equity market value; it is not cash in Apple’s bank. Rounded historical inputs are used for teaching."
    },
    {
      "id": "definition-market-cap",
      "kind": "definition",
      "group": "KEY TERM",
      "title": "Market capitalisation · 公司市值",
      "prompt": "Market capitalisation is the total market value of a company’s outstanding shares.",
      "translation": "公司市值是公司已发行在外股票的市场总价值。",
      "highlights": [
        "total market value",
        "outstanding shares"
      ],
      "highlightsZh": [
        "已发行在外股票",
        "市场总价值"
      ],
      "note": "4:20–5:20. Consolidate the mechanism. Shares outstanding include shares held by individual and institutional shareholders, excluding treasury shares held by the company itself. Market cap is equity value, not sales, profit, cash or enterprise value.",
      "sources": [
        {
          "label": "SEC Investor.gov · Market capitalization",
          "href": "https://www.investor.gov/introduction-investing/investing-basics/glossary/market-capitalization"
        },
        {
          "label": "FINRA · Market Cap Explained",
          "href": "https://www.finra.org/investors/insights/market-cap"
        }
      ],
      "afterDefinition": "Shares outstanding = all shares currently held by shareholders.\n已发行在外股票 = 股东目前持有的全部股票。"
    },
    {
      "id": "section-calculation",
      "kind": "section",
      "number": "02",
      "title": "Calculating market capitalisation",
      "zh": "计算公司市值",
      "caption": "",
      "backdrop": {
        "src": "../../course-assets/images/share-price-company-size/costco.jpg",
        "alt": "The exterior and signage of a Costco Wholesale warehouse.",
        "credit": "Ambrosia LaFluer / Wikimedia Commons · CC BY 2.0; CSS crop",
        "source": "https://commons.wikimedia.org/wiki/File:Costco_Exterior.jpg",
        "position": "50% 45%"
      },
      "note": "5:20–5:30. The section is a method plus a full model and independent practice.",
      "sources": [
        {
          "label": "Ambrosia LaFluer / Wikimedia Commons · CC BY 2.0; CSS crop",
          "href": "https://commons.wikimedia.org/wiki/File:Costco_Exterior.jpg"
        }
      ]
    },
    {
      "id": "market-cap-formula",
      "kind": "short",
      "group": "SHARE PRICE & COMPANY SIZE",
      "title": "Market capitalisation formula",
      "titleZh": "公司市值的计算公式",
      "scene": "formula",
      "prompt": "Market capitalisation formula",
      "partialReveal": false,
      "example": "$270 × 15 billion = $4,050 billion",
      "support": "1 billion = 1,000 million · 1 trillion = 1,000 billion",
      "note": "5:30–6:30. Price in dollars times shares in billions gives value in billions. $4,050 billion = $4.05 trillion. Keep the formula visible through the model and practice. Sources use separate dates and rounded inputs.",
      "sources": [
        {
          "label": "Apple 2025 10-K · 14,776,353,000 shares, 17 October 2025",
          "href": "https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm"
        },
        {
          "label": "Costco 2025 10-K · 443,179,176 shares, 30 September 2025",
          "href": "https://www.sec.gov/Archives/edgar/data/909832/000090983225000101/cost-20250831.htm"
        },
        {
          "label": "AAPL · 31 December 2025 unadjusted close $271.86",
          "href": "https://finance.yahoo.com/quote/AAPL/history/"
        },
        {
          "label": "COST · 31 December 2025 unadjusted close $862.34",
          "href": "https://ca.finance.yahoo.com/quote/COST/history/"
        }
      ]
    },
    {
      "id": "river-summit-worked",
      "kind": "short",
      "group": "SHARE PRICE & COMPANY SIZE",
      "title": "Apple and Costco market capitalisation",
      "titleZh": "苹果与 Costco：比较总市值",
      "scene": "worked-comparison",
      "prompt": "Apple and Costco market capitalisation",
      "partialReveal": false,
      "companies": [
        {
          "name": "Apple",
          "ticker": "AAPL",
          "price": 270,
          "shares": 15000,
          "sharesLabel": "15 billion",
          "capLabel": "$4,050 billion",
          "tone": "forest",
          "photo": {
            "src": "../../course-assets/images/lesson-02/apple-fifth-avenue-new.jpg",
            "alt": "Apple’s glass store entrance on Fifth Avenue, New York.",
            "credit": "Ed Uthman / Wikimedia Commons · CC BY-SA 2.5; CSS crop",
            "source": "https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg",
            "position": "50% 50%"
          }
        },
        {
          "name": "Costco",
          "ticker": "COST",
          "price": 860,
          "shares": 440,
          "sharesLabel": "440 million",
          "capLabel": "$378.4 billion",
          "tone": "copper",
          "photo": {
            "src": "../../course-assets/images/share-price-company-size/costco.jpg",
            "alt": "The exterior and signage of a Costco Wholesale warehouse.",
            "credit": "Ambrosia LaFluer / Wikimedia Commons · CC BY 2.0; CSS crop",
            "source": "https://commons.wikimedia.org/wiki/File:Costco_Exterior.jpg",
            "position": "50% 45%"
          }
        }
      ],
      "formula": "Market cap = share price × shares outstanding",
      "question": "Calculate both market caps. Which company is larger by this measure?",
      "conclusion": "Apple has the lower share price but the larger market cap.",
      "support": "Approximate classroom values · rounded 2025 inputs",
      "sources": [
        {
          "label": "Apple 2025 10-K · 14,776,353,000 shares, 17 October 2025",
          "href": "https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm"
        },
        {
          "label": "Costco 2025 10-K · 443,179,176 shares, 30 September 2025",
          "href": "https://www.sec.gov/Archives/edgar/data/909832/000090983225000101/cost-20250831.htm"
        },
        {
          "label": "AAPL · 31 December 2025 unadjusted close $271.86",
          "href": "https://finance.yahoo.com/quote/AAPL/history/"
        },
        {
          "label": "COST · 31 December 2025 unadjusted close $862.34",
          "href": "https://ca.finance.yahoo.com/quote/COST/history/"
        }
      ],
      "note": "6:30–8:30. First ask students to try. Reveal Apple, Costco, then bars. Apple: $270 × 15 billion = $4,050 billion. Costco: $860 × 440 million = $378,400 million = $378.4 billion. Common-zero bars encode total value. These are approximate classroom comparisons using separately dated, rounded 2025 inputs."
    },
    {
      "id": "two-company-calculation",
      "kind": "short",
      "group": "INDEPENDENT PRACTICE",
      "title": "Market capitalisation practice",
      "titleZh": "公司市值练习",
      "scene": "assessment",
      "prompt": "Market capitalisation practice",
      "partialReveal": false,
      "formula": "Market cap = share price × shares outstanding",
      "rows": [
        [
          "Costco",
          "$900",
          "440 million"
        ]
      ],
      "question": "Suppose Costco trades at $900. Calculate its market capitalisation, then state the unit.",
      "unitHelp": "Work independently for 60 seconds. Keep 440 million as the share-count unit.",
      "solutions": [
        "$900 × 440 million = $396,000 million",
        "$396,000 million = $396 billion"
      ],
      "note": "8:30–10:00. Protect one minute of silent independent work before opening the model. Answer: $396 billion. Diagnose $396 million as losing a factor of 1,000 and division as using the wrong operation."
    },
    {
      "id": "section-price-changes",
      "kind": "section",
      "number": "03",
      "title": "Information and share prices",
      "zh": "信息与股价",
      "caption": "",
      "backdrop": {
        "src": "../../course-assets/images/lesson-02/apple-fifth-avenue-new.jpg",
        "alt": "Apple’s glass store entrance on Fifth Avenue, New York.",
        "credit": "Ed Uthman / Wikimedia Commons · CC BY-SA 2.5; CSS crop",
        "source": "https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg",
        "position": "50% 50%"
      },
      "note": "10:00–10:10. Teach the mechanism in two clear directions, then test it with two documented company events. Do not reduce it to “good news makes prices rise”.",
      "sources": [
        {
          "label": "Ed Uthman / Wikimedia Commons · CC BY-SA 2.5; CSS crop",
          "href": "https://commons.wikimedia.org/wiki/File:Apple_store_fifth_avenue.jpg"
        }
      ]
    },
    {
      "id": "nvidia-news-hook",
      "kind": "short",
      "group": "INFORMATION & SHARE PRICES",
      "title": "NVIDIA’s $11bn sales forecast",
      "titleZh": "英伟达的 110 亿美元销售额预测",
      "scene": "photo-story",
      "prompt": "NVIDIA · 24 May 2023",
      "partialReveal": false,
      "photo": {
        "src": "../../course-assets/images/share-price-company-size/nvidia-headquarters.jpg",
        "alt": "NVIDIA’s headquarters in Santa Clara, California, photographed in August 2018.",
        "credit": "Coolcaesar; corrected by Jacek Halicki / Wikimedia Commons · CC BY-SA 4.0; CSS crop",
        "source": "https://commons.wikimedia.org/wiki/File:NVIDIA_Headquarters.jpg",
        "position": "50% 48%"
      },
      "eventLabel": "NVIDIA · 24 May 2023",
      "headline": "$11bn quarterly revenue forecast as AI demand surged",
      "question": "Why might investors pay more for one NVIDIA share?",
      "note": "10:10–10:50. Real announcement, not a hypothetical case. NVIDIA designs chips used in AI systems. Quarterly revenue is sales, not profit. The large question is the visual priority; take an initial prediction and withhold the price response until the evidence slide.",
      "sources": [
        {
          "label": "NVIDIA · 24 May 2023 results and Q2 FY2024 revenue guidance",
          "href": "https://investor.nvidia.com/news/press-release-details/2023/NVIDIA-Announces-Financial-Results-for-First-Quarter-Fiscal-2024/"
        },
        {
          "label": "Reuters · prior analyst estimate $7.15bn, 24 May 2023",
          "href": "https://www.investing.com/news/stock-market-news/nvidia-forecasts-secondquarter-revenue-above-estimates-3090225"
        },
        {
          "label": "AAII · 25 May close $379.80 vs $305.38, +24.37%",
          "href": "https://www.aaii.com/investingideas/article/61396-why-nvidia-corporation8217s-nvda-stock-is-up-2437"
        },
        {
          "label": "Coolcaesar; corrected by Jacek Halicki / Wikimedia Commons · CC BY-SA 4.0; CSS crop",
          "href": "https://commons.wikimedia.org/wiki/File:NVIDIA_Headquarters.jpg"
        }
      ]
    },
    {
      "id": "expectations-price-chain",
      "kind": "short",
      "group": "INFORMATION & SHARE PRICES",
      "title": "How news can move share prices",
      "titleZh": "新信息如何影响股价",
      "scene": "two-way-path",
      "prompt": "How news can move share prices",
      "partialReveal": false,
      "question": "What connects an announcement to the next traded price?",
      "positive": [
        "Better-than-expected information",
        "Higher expected profits or lower risk",
        "More buying at the old price; bids rise",
        "Higher agreed trade prices"
      ],
      "negative": [
        "Worse-than-expected information",
        "Lower expected profits or higher risk",
        "Less buying or more selling at the old price",
        "Lower agreed trade prices"
      ],
      "footer": "Prices respond to changes in expectations, not to a simple ‘good news = up’ rule.",
      "sources": [
        {
          "label": "FINRA · Stocks: demand, company prospects and traded prices",
          "href": "https://www.finra.org/investors/investing/investment-products/stocks"
        },
        {
          "label": "NVIDIA · 24 May 2023 results and Q2 FY2024 revenue guidance",
          "href": "https://investor.nvidia.com/news/press-release-details/2023/NVIDIA-Announces-Financial-Results-for-First-Quarter-Fiscal-2024/"
        }
      ],
      "note": "10:50–12:40. Reveal the positive chain, then the mirrored negative chain. Revenue is sales income; profit is revenue minus costs. A stronger sales outlook raises expected profit only if costs do not rise by as much. More investors willing to buy at the old price can lift bids; every completed trade still has a buyer and seller. The relationship is possible, not guaranteed."
    },
    {
      "id": "definition-positive-surprise",
      "kind": "definition",
      "group": "KEY RELATIONSHIP",
      "title": "Positive surprise",
      "prompt": "When new information is ________, investors may ________, increase demand for the shares, raise their bids and ________.",
      "blankAnswers": [
        "better than expected",
        "raise their expectations of future profits",
        "push the share price higher"
      ],
      "note": "12:40–13:20. Ask students to supply the three directional phrases before revealing them, then copy the completed sentence. ‘May’ avoids presenting the relationship as guaranteed."
    },
    {
      "id": "definition-negative-surprise",
      "kind": "definition",
      "group": "KEY RELATIONSHIP",
      "title": "Negative surprise",
      "prompt": "When new information is ________, investors may ________, reduce demand for the shares, lower their bids and ________.",
      "blankAnswers": [
        "worse than expected",
        "lower their expectations of future profits",
        "push the share price lower"
      ],
      "note": "13:20–14:00. Ask students to reverse the positive relationship and supply the three directional phrases before revealing them. Students then copy the completed sentence. ‘May’ preserves the role of risk, other news and differences between investors."
    },
    {
      "id": "information-expectations-guidance",
      "kind": "short",
      "group": "INFORMATION & SHARE PRICES",
      "title": "Information: a new fact or announcement",
      "titleZh": "信息：新的事实或公告",
      "scene": "concept-example",
      "partialReveal": false,
      "definition": "Information is a new fact or announcement that investors can use.",
      "exampleLabel": "Example · Costco’s 2025 annual report",
      "example": "Costco reported that its net sales increased 8% to $269.9bn in 2025.",
      "takeaway": "This reported result is information. Investors then compare it with what they had expected.",
      "photo": {
        "src": "../../course-assets/images/share-price-company-size/costco.jpg",
        "alt": "The exterior and signage of a Costco Wholesale warehouse.",
        "position": "50% 45%"
      },
      "sources": [
        {
          "label": "Costco 2025 Form 10-K · net sales increased 8% to $269.912bn",
          "href": "https://www.sec.gov/Archives/edgar/data/909832/000090983225000101/cost-20250831.htm"
        }
      ],
      "note": "14:00–14:40. Use the already familiar Costco example so the only new idea is information. The report gives investors a new fact: 2025 net sales rose 8% to $269.912bn. ‘New’ does not mean automatically good or bad; the next slide supplies the expectations benchmark. Do not mention stock splits until their later section."
    },
    {
      "id": "expectations-example",
      "kind": "short",
      "group": "INFORMATION & SHARE PRICES",
      "title": "Expectations: the benchmark for a surprise",
      "titleZh": "预期：判断意外的基准",
      "scene": "concept-example",
      "partialReveal": false,
      "definition": "Expectations are investors’ beliefs about a company’s future profits and risks.",
      "exampleLabel": "Example · before 24 May 2023",
      "example": "Analysts expected NVIDIA’s next-quarter revenue to be about $7.15bn.",
      "takeaway": "Actual or forecast results are surprising only when compared with this prior benchmark.",
      "photo": {
        "src": "../../course-assets/images/share-price-company-size/nvidia-headquarters.jpg",
        "alt": "NVIDIA headquarters.",
        "position": "50% 48%"
      },
      "sources": [
        {
          "label": "Reuters · prior analyst estimate $7.15bn, 24 May 2023",
          "href": "https://www.investing.com/news/stock-market-news/nvidia-forecasts-secondquarter-revenue-above-estimates-3090225"
        }
      ],
      "note": "14:40–15:20. Expectations are beliefs, not known facts. The analyst estimate is a simplified market benchmark rather than a belief shared identically by every investor."
    },
    {
      "id": "company-guidance-example",
      "kind": "short",
      "group": "INFORMATION & SHARE PRICES",
      "title": "Company guidance: management’s forecast",
      "titleZh": "公司指引：管理层的预测",
      "scene": "concept-example",
      "partialReveal": false,
      "definition": "Company guidance is management’s forecast of the company’s future results.",
      "exampleLabel": "Example · 2 January 2019",
      "example": "Apple revised its quarterly revenue guidance from $89–93bn to about $84bn.",
      "takeaway": "Guidance is information; investors compare it with their existing expectations.",
      "photo": {
        "src": "../../course-assets/images/lesson-02/apple-fifth-avenue-new.jpg",
        "alt": "Apple’s Fifth Avenue store.",
        "position": "50% 50%"
      },
      "sources": [
        {
          "label": "Apple · 1 November 2018 original Q1 FY2019 guidance",
          "href": "https://www.apple.com/newsroom/2018/11/apple-reports-fourth-quarter-results/"
        },
        {
          "label": "Apple · 2 January 2019 revised Q1 FY2019 guidance",
          "href": "https://www.apple.com/newsroom/2019/01/letter-from-tim-cook-to-apple-investors/"
        }
      ],
      "note": "15:20–16:00. Guidance comes from the company and concerns future results; it is not an already earned result. Ask students to identify the old guidance, revised guidance and direction of the revision."
    },
    {
      "id": "buyers-sellers-price",
      "kind": "short",
      "group": "INFORMATION & SHARE PRICES",
      "title": "A higher bid can raise the traded price",
      "titleZh": "更高买价可推高成交价",
      "scene": "trade-mechanism",
      "prompt": "A higher bid can raise the traded price",
      "partialReveal": false,
      "question": "How can stronger demand at the old price lead to a higher next trade?",
      "context": "Illustrative prices · one share",
      "steps": [
        ["Previous trade", "$100"],
        ["Positive surprise", "More buyers at $100"],
        ["Buyer raises the bid", "$110"],
        ["Seller accepts", "New trade: $110"]
      ],
      "footer": "Every completed trade still has both a buyer and a seller.",
      "note": "14:00–15:30. Use invented $100/$110 to isolate price formation; these are not NVIDIA quotes. Reveal the positive surprise, higher bid and new trade. A bid is what a buyer offers. More investors wanting to buy at the old price can put upward pressure on bids; the company does not simply set the exchange price.",
      "sources": [
        {
          "label": "FINRA · Stocks: demand, company prospects and traded prices",
          "href": "https://www.finra.org/investors/investing/investment-products/stocks"
        }
      ]
    },
    {
      "id": "expectations-surprise",
      "kind": "short",
      "group": "INFORMATION & SHARE PRICES",
      "title": "Prices react to surprises",
      "titleZh": "股价对意外信息作出反应",
      "scene": "surprise",
      "prompt": "Prices react to surprises",
      "partialReveal": false,
      "question": "Costco’s profit rises. Could the news still disappoint investors?",
      "context": "Hypothetical annual profits · $ million · common zero baseline",
      "bars": [
        {
          "label": "Last year · 去年",
          "value": 100
        },
        {
          "label": "Expected this year · 今年预期",
          "value": 115
        },
        {
          "label": "Reported this year · 今年公布",
          "value": 105
        }
      ],
      "judgements": [
        [
          "Growth is positive",
          "105 is above last year’s 100."
        ],
        [
          "The surprise is negative",
          "105 is below the expected 115."
        ]
      ],
      "footer": "Already expected = “priced in” · 已反映在价格中. News that merely matches expectations need not raise the price.",
      "note": "16:00–18:00. Reveal reported profit after the past value and expectation. Ask “which comparison matters for new information?” A positive surprise is better than previously expected; a negative surprise is worse. Here profits grow 5% but 15% had been expected: both statements can be true. An unchanged expectation may produce little direct price reaction, holding other news constant. Expectations differ across investors; the numbers are a simplified benchmark, not a claim of unanimous beliefs.",
      "sources": [
        {
          "label": "FINRA · Stocks: demand, company prospects and traded prices",
          "href": "https://www.finra.org/investors/investing/investment-products/stocks"
        }
      ]
    },
    {
      "id": "mcq-expectations",
      "kind": "mcq",
      "group": "QUICK CHECK",
      "title": "Profit growth below expectations",
      "titleZh": "利润增长低于预期",
      "question": "Suppose Costco’s profit rises by 5%, but investors expected 15% growth. Which explanation for a falling share price is strongest?",
      "options": [
        "A  A profitable company cannot have a falling share price",
        "B  Every company must fall after reporting profit",
        "C  Disappointed expectations may reduce willingness to buy at the old price",
        "D  The profit report automatically cancels shares"
      ],
      "answer": 2,
      "feedback": "C. Investors compare the news with expectations. Profit can rise while the news disappoints; other influences also matter.",
      "note": "18:00–19:00. Individual A–D response before anyone explains. A confuses profit growth with a positive surprise; B invents an automatic rule; D confuses news with changes in share count. If A is common, revisit the two comparisons on the bar chart. Ask one student to say the missing causal link."
    },
    {
      "id": "nvidia-news-evidence",
      "kind": "short",
      "group": "INFORMATION & SHARE PRICES",
      "title": "NVIDIA: forecast above expectations",
      "titleZh": "英伟达：预测高于预期",
      "scene": "event-evidence",
      "prompt": "NVIDIA: a forecast above expectations",
      "partialReveal": false,
      "question": "What changed: the business outlook, the number of shares, or both?",
      "event": "24 May 2023 · forecast announced after the US market close",
      "metric": "Next-quarter revenue · $bn",
      "comparison": [
        {
          "label": "Analyst estimate",
          "value": 7.15,
          "display": "$7.15bn"
        },
        {
          "label": "Company guidance",
          "value": 11,
          "display": "$11bn ±2%"
        }
      ],
      "max": 12,
      "priceDates": [
        "24 May close",
        "25 May close"
      ],
      "priceIndex": [
        100,
        124.4
      ],
      "change": "+24.4%",
      "direction": "up",
      "caption": "Daily closing-price index · 24 May = 100",
      "chain": [
        "Unexpectedly strong sales outlook",
        "Higher expected earning potential",
        "Greater willingness to pay"
      ],
      "footer": "Observed reaction, not proof that this announcement explains every part of the move.",
      "note": "19:00–21:00. Reveal the company forecast, then the observed closing-price comparison. The consensus is an analyst survey benchmark, not the company’s earlier guidance. Fiscal Q2 FY2024 was the coming quarter in May 2023; use calendar dates prominently to avoid confusing students. Company forecast is $11bn ±2%; analyst estimate $7.15bn. Daily close rose 24.37%, rounded to 24.4%. The chart uses two observed closes indexed to 100, not an invented intraday path. Revenue, profit and share price are different quantities, so do not imply a 53.8% forecast surprise must produce a 53.8% share-price rise. Other information, risks and market conditions matter.",
      "sources": [
        {
          "label": "NVIDIA · 24 May 2023 results and Q2 FY2024 revenue guidance",
          "href": "https://investor.nvidia.com/news/press-release-details/2023/NVIDIA-Announces-Financial-Results-for-First-Quarter-Fiscal-2024/"
        },
        {
          "label": "Reuters · prior analyst estimate $7.15bn, 24 May 2023",
          "href": "https://www.investing.com/news/stock-market-news/nvidia-forecasts-secondquarter-revenue-above-estimates-3090225"
        },
        {
          "label": "AAII · 25 May close $379.80 vs $305.38, +24.37%",
          "href": "https://www.aaii.com/investingideas/article/61396-why-nvidia-corporation8217s-nvda-stock-is-up-2437"
        }
      ]
    },
    {
      "id": "apple-news-evidence",
      "kind": "short",
      "group": "INFORMATION & SHARE PRICES",
      "title": "Apple: revenue guidance cut",
      "titleZh": "苹果：下调收入指引",
      "scene": "event-evidence",
      "prompt": "Apple: revenue guidance cut",
      "partialReveal": false,
      "question": "Why could Apple’s shares fall even though the company remained profitable?",
      "event": "2 January 2019 · revised guidance after the US market close",
      "metric": "Quarterly revenue guidance · $bn",
      "comparison": [
        {
          "label": "Previous guidance",
          "value": 91,
          "low": 89,
          "high": 93,
          "display": "$89–93bn"
        },
        {
          "label": "Revised guidance",
          "value": 84,
          "display": "about $84bn"
        }
      ],
      "max": 100,
      "priceDates": [
        "2 Jan close",
        "3 Jan close"
      ],
      "priceIndex": [
        100,
        90
      ],
      "change": "−10.0%",
      "direction": "down",
      "caption": "Daily closing-price index · 2 Jan = 100",
      "chain": [
    "Weaker sales outlook",
    "Lower expected profits if costs do not fall enough",
    "Lower willingness to pay"
      ],
      "footer": "Apple’s own announcements confirm both guidance figures; the price move occurred during a wider market sell-off.",
      "note": "21:00–23:00. These are true historical figures. Apple’s 1 Nov 2018 guidance was $89–93bn; on 2 Jan 2019 it revised expected revenue to about $84bn after fewer-than-expected iPhone upgrades and weakness in Greater China. The 3 Jan close fell 9.96%, rounded to −10.0%. Connect the guidance surprise to lower expected profit, holding costs broadly similar, then to lower bids. This is an observed reaction, not an isolated causal estimate. Apple remained profitable and other market news mattered.",
      "sources": [
        {
          "label": "Apple · previous Q1 FY2019 guidance, 1 November 2018",
          "href": "https://www.apple.com/newsroom/2018/11/apple-reports-fourth-quarter-results/"
        },
        {
          "label": "Apple · revised Q1 FY2019 guidance, 2 January 2019",
          "href": "https://www.apple.com/newsroom/2019/01/letter-from-tim-cook-to-apple-investors/"
        },
        {
          "label": "Axios · 3 January 2019 market close: Apple −9.96%",
          "href": "https://www.axios.com/2019/01/03/apple-drives-stock-market-rout"
        }
      ]
    },
    {
      "id": "section-stock-splits",
      "kind": "section",
      "number": "04",
      "title": "Stock splits and ownership",
      "zh": "拆股与所有权",
      "caption": "",
      "backdrop": {
        "src": "../../course-assets/images/share-price-company-size/nintendo.jpg",
        "alt": "Nintendo Switch Joy-Con controllers on a dark surface.",
        "credit": "Aleks Dorohovich / Unsplash License",
        "source": "https://unsplash.com/photos/nintendo-switch-on-black-surface-zufXg9Zc9Ig"
      },
      "note": "23:00–23:10. Contrast a price change caused by revised expectations with a mechanical change in the unit of ownership.",
      "sources": [
        {
          "label": "Aleks Dorohovich / Unsplash License",
          "href": "https://unsplash.com/photos/nintendo-switch-on-black-surface-zufXg9Zc9Ig"
        }
      ]
    },
    {
      "id": "nintendo-split-extension",
      "kind": "short",
      "group": "SHARE PRICE & COMPANY SIZE",
      "title": "Nintendo’s 10-for-1 stock split",
      "titleZh": "任天堂十拆一",
      "scene": "split",
      "prompt": "Nintendo’s 10-for-1 stock split",
      "partialReveal": false,
      "photo": {
        "src": "../../course-assets/images/share-price-company-size/nintendo.jpg",
        "alt": "Nintendo Switch Joy-Con controllers on a dark surface.",
        "credit": "Aleks Dorohovich / Unsplash License",
        "source": "https://unsplash.com/photos/nintendo-switch-on-black-surface-zufXg9Zc9Ig"
      },
      "question": "Nintendo split each ordinary share into 10 on 1 October 2022. Did shareholders become ten times richer?",
      "answer": "No. The split divides the same ownership into more shares; it does not itself create extra business value.",
      "support": "拆股：把每股分成更多股，持股比例不变。",
      "sources": [
        {
          "label": "Nintendo · 10 May 2022 announcement; 10-for-1 split effective 1 October 2022",
          "href": "https://www.nintendo.co.jp/ir/pdf/2022/220510_3e.pdf"
        },
        {
          "label": "Aleks Dorohovich / Unsplash License",
          "href": "https://unsplash.com/photos/nintendo-switch-on-black-surface-zufXg9Zc9Ig"
        }
      ],
      "note": "25:10–26:00. Actual ordinary-share split: 10-for-1, effective 1 Oct 2022. Ask whether wealth automatically rises before revealing the answer. This is core teaching despite the preserved historical ID. Use the following model rather than the US depositary-share ratio."
    },
    {
      "id": "split-worked-model",
      "kind": "short",
      "group": "SHARE PRICE & COMPANY SIZE",
      "title": "A stock split changes units, not value",
      "titleZh": "拆股改变单位，不改变价值",
      "scene": "split-model",
      "prompt": "A stock split changes units, not value",
      "partialReveal": false,
      "question": "Before the split, Emma owns 2 Nintendo shares at an assumed ¥60,000 each. What changes?",
      "before": {
        "title": "Before · 拆股前",
        "count": "2 shares",
        "price": "¥60,000 each",
        "value": "2 × ¥60,000 = ¥120,000"
      },
      "after": {
        "title": "After a 10-for-1 split · 拆股后",
        "count": "20 shares",
        "price": "¥6,000 each",
        "value": "20 × ¥6,000 = ¥120,000"
      },
      "footer": "Her shares ×10 and all shares ×10 → her ownership percentage is unchanged.",
      "support": "Illustrative prices; isolate the split and hold all other influences constant.",
      "sources": [
        {
          "label": "Nintendo · 10 May 2022 announcement; 10-for-1 split effective 1 October 2022",
          "href": "https://www.nintendo.co.jp/ir/pdf/2022/220510_3e.pdf"
        },
        {
          "label": "Aleks Dorohovich / Unsplash License",
          "href": "https://unsplash.com/photos/nintendo-switch-on-black-surface-zufXg9Zc9Ig"
        }
      ],
      "note": "26:00–28:30. Model the hypothetical holding: 2 × ¥60,000 becomes 20 × ¥6,000, both ¥120,000. Reveal count, price and value separately; ask students to predict each. Isolate the split from market news. Her shares and all shares both multiply by ten, preserving percentage ownership."
    },
    {
      "id": "mcq-split-versus-loss",
      "kind": "mcq",
      "group": "QUICK CHECK",
      "title": "Stock split or loss?",
      "titleZh": "股价下降：拆股还是损失？",
      "question": "Nintendo’s price falls by 90%. In case 1 it completes a 10-for-1 split; in case 2 the share count is unchanged. Hold other factors constant.",
      "options": [
        "A  Total market value falls by 90% in both cases",
        "B  Total market value is unchanged in both cases",
        "C  Total market value falls only in case 1",
        "D  Total market value falls only in case 2"
      ],
      "answer": 3,
      "feedback": "D. In case 1, 10 times as many shares offset the price ÷10. In case 2, the unchanged count means market cap falls 90%.",
      "note": "28:30–30:00. Individual response; D. Case 1: 0.1 × price and 10 × shares cancel. Case 2: same shares with 90% lower price gives 90% lower cap. Diagnose A (ignores share-count change), B (treats every fall as a split), C (reverses cases)."
    },
    {
      "id": "exam-style-task",
      "kind": "mcq",
      "group": "EXAM-STYLE MCQ · 1 MARK",
      "title": "Practice 1: market capitalisation",
      "titleZh": "选择题练习 1：公司市值",
      "question": "A company has 2 billion shares outstanding at $35 per share. What is its market capitalisation?",
      "options": [
        "A  $70 million",
        "B  $70 billion",
        "C  $700 billion",
        "D  $17.5 billion"
      ],
      "answer": 1,
      "feedback": "B. $35 × 2 billion = $70 billion.",
      "note": "28:00–32:00: four MCQs, four minutes total. Original teacher-written practice, one mark each; calculator allowed. Students record answers to all four BEFORE feedback. Do not click an option during the independent pass. Return across the four slides during 32:00–37:00 for feedback. Q1: A confuses billion with million; C adds an extra zero; D divides instead of multiplying."
    },
    {
      "id": "exam-style-feedback",
      "kind": "mcq",
      "group": "EXAM-STYLE MCQ · 1 MARK",
      "title": "Practice 2: expected information",
      "titleZh": "选择题练习 2：信息与预期",
      "question": "Suppose Apple’s profit rises 12%, exactly as investors expected. With no other new information, which conclusion is best supported?",
      "options": [
        "A  The share price must rise by 12%",
        "B  The share count must rise by 12%",
        "C  The profit news alone need not raise the share price",
        "D  The company must pay out all the extra profit"
      ],
      "answer": 2,
      "feedback": "C. Expected growth may already be reflected in the price. This announcement need not create a further positive surprise.",
      "note": "Independent Q2, then feedback 34:00–38:00. The preserved ID once held a written model; it is now MCQ practice. A assumes a one-for-one profit/price rule; B confuses profits with share creation; D assumes an automatic dividend. The claim is “need not”, not “cannot move”."
    },
    {
      "id": "exam-mcq-causal-link",
      "kind": "mcq",
      "group": "EXAM-STYLE MCQ · 1 MARK",
      "title": "Practice 3: negative news",
      "titleZh": "选择题练习 3：因果关系",
      "question": "Suppose NVIDIA unexpectedly forecasts lower future sales, while expected costs are unchanged. Which chain best explains possible downward pressure on its share price?",
      "options": [
        "A  Lower expected profits → lower bids from buyers → lower traded prices",
    "B  Lower expected profits → fewer shares outstanding → lower share price",
    "C  Lower bids → lower resale prices → less cash paid into NVIDIA on each resale",
    "D  Lower expected profits → the share price falls by exactly the same percentage"
      ],
      "answer": 0,
      "feedback": "A. Lower sales with unchanged costs reduces expected profits; investors may offer less for the same ownership share.",
   "note": "Independent Q3, then feedback 34:00–38:00. Hypothetical event; not the actual May 2023 forecast. B invents a share-count change; C confuses resale payments to investors with cash received by the company; D assumes an automatic one-for-one profit/price percentage change. Ask students to name the business-profit and investor-order links."
    },
    {
      "id": "exit-market-cap",
      "kind": "mcq",
      "group": "ASSESSED EXIT · MCQ · 1 MARK",
      "title": "Exit: stock split and market capitalisation",
      "titleZh": "选择题出口检测：股价只是其中一部分",
      "question": "Suppose Costco has 440 million shares at $800. A 2-for-1 split occurs with no other changes. Which pair is correct?",
      "options": [
        "A  440 million shares; $176 billion market cap",
        "B  880 million shares; $704 billion market cap",
        "C  440 million shares; $352 billion market cap",
        "D  880 million shares; $352 billion market cap"
      ],
      "answer": 3,
      "feedback": "D. Shares double to 880 million; price halves to $400. $400 × 880 million = $352 billion, unchanged.",
      "note": "Independent Q4/exit, then feedback 34:00–38:00. One mark. All students commit before reveal. A changes price but not count; B doubles count but forgets the price adjustment; C preserves cap but fails to adjust shares. Four-MCQ target: 4/4; use the missed question to select the calculation, expectations, causal-chain or split model for reteaching. No long written-answer marks are assumed."
    },
    {
      "id": "summary",
      "kind": "short",
      "group": "SUMMARY",
      "title": "Summary",
      "titleZh": "本课小结",
      "prompt": "Share price values one share. Market capitalisation values all outstanding shares.",
      "scene": "summary",
      "items": [
        [
          "Measure the whole",
          "Market cap = share price × shares outstanding.",
          "市值 = 股价 × 已发行在外股票总数。"
        ],
        [
          "Explain the surprise",
          "News changes expectations; revised bids and offers can change the traded price.",
          "新信息改变预期，买卖报价变化可能改变成交价。"
        ],
        [
          "Separate price from value",
          "A split changes the units; it creates no automatic gain in wealth.",
          "拆股改变股数和单价，本身不增加财富。"
        ]
      ],
      "note": "37:00–39:00. Students say the chain without looking: new information → revised expected profits/risk → buying and selling decisions → agreed trade price. Check “better or worse than expected”, not simply “good or bad”. Then distinguish a split from a change in business expectations. 39:00–40:00 buffer for the most common MCQ misconception. Core ends here."
    },
    {
      "id": "size-not-value",
      "kind": "short",
      "group": "OPTIONAL · AFTER THE CORE",
      "title": "Optional: larger company, better investment?",
      "titleZh": "公司更大，投资就更好吗？",
      "scene": "scope",
      "prompt": "Larger company, better investment?",
      "partialReveal": false,
      "question": "Return to Apple and Costco. What does the comparison actually establish?",
      "claim": "Apple has the larger market cap.",
      "answer": "Supported by our price × share-count calculations. This measures equity market value.",
      "otherClaim": "Apple must be the better investment.",
      "otherAnswer": "Not established. Compare expected profit, growth and risk with the price paid; company size alone is insufficient.",
      "note": "Optional oral discussion after Summary. No stock recommendation follows from market cap alone. Core MCQs and notes already preserve this distinction.",
      "sources": [
        {
          "label": "SEC Investor.gov · Market capitalization",
          "href": "https://www.investor.gov/introduction-investing/investing-basics/glossary/market-capitalization"
        },
        {
          "label": "FINRA · Market Cap Explained",
          "href": "https://www.finra.org/investors/insights/market-cap"
        }
      ]
    },
    {
      "id": "correct-the-claim",
      "kind": "short",
      "group": "OPTIONAL · AFTER THE CORE",
      "title": "Optional: correct the investment claim",
      "titleZh": "选做：纠正投资说法",
      "scene": "claim",
      "prompt": "Optional: correct the investment claim",
      "partialReveal": false,
      "question": "“Costco’s share costs more than Apple’s, so Costco must be the bigger and better company to invest in.”",
      "task": "Write a two-sentence correction using today’s evidence.",
      "answer": "Apple has the larger approximate market cap in our comparison because its much larger share count outweighs its lower share price. Neither a high share price nor a high market cap establishes better investment value; expected profit, growth and risk also matter.",
      "note": "Optional after Summary. No core time allocation. Accept evidence-based alternatives, not a recommendation to buy either company."
    },
    {
      "id": "optional-shareholder-percentage",
      "kind": "short",
      "group": "OPTIONAL · AFTER THE CORE",
      "title": "Optional: the ownership fraction",
      "titleZh": "选做：持股比例",
      "scene": "claim",
      "prompt": "Optional: the ownership fraction",
      "partialReveal": false,
      "question": "“After Nintendo’s split, Emma has ten times as many shares. Surely her percentage ownership rises?”",
      "task": "Explain what happens to both the numerator and denominator.",
      "answer": "Emma’s share count and Nintendo’s total share count both multiply by ten. Multiplying both parts of the ownership fraction by ten leaves her percentage ownership unchanged.",
      "note": "Optional after Summary. Retrieve the same split mechanism; no new compulsory formula."
    }
  ]
};
})();
