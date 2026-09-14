/* Syllabus 3.1.2; original Paper 2 questions and model answers. See PAPER-2-ANALYSIS.md. */
window.IGCSE = window.IGCSE || {};
IGCSE.lesson = {
  "meta": {
    "code": "3.1.2",
    "unit": "Unit 3 - Microeconomic decision makers",
    "title": "Central banks — Cambridge IGCSE Economics 0455",
    "lessonLabel": "Money and banking lesson 4",
    "courseLabel": "Cambridge IGCSE Economics 0455",
    "creatorLabel": "Created by Samuel Oehler-Huang, Suzhou Foreign Language School",
    "deliveryPlan": {
      "durationMinutes": 45,
      "previousEndpoint": "Commercial banks",
      "coreEnd": "Past paper practice: six-mark analysis and feedback",
      "coreEndSlide": 31,
      "optionalStartSlide": null,
      "nextSession": "Use the final six-mark question to assess understanding. Continue unfinished past-paper practice before moving on; prepared slides do not establish taught coverage."
    }
  },
  "slides": [
    {
      "type": "hero",
      "eyebrow": "Overview",
      "title": "3.1.2 Central banks",
      "zhTitle": "中央银行",
      "subtitle": "Money and banking — lesson 4",
      "kicker": "Functions, financial stability and price stability",
      "visual": IGCSE.photos.monetaryPolicy.bankEngland,
      "notes": "Teach after Commercial banks. This lesson covers the central-bank half of syllabus 3.1.2, with original Paper 2 questions and teacher-written models."
    },
    {
      "type": "classificationTask",
      "layout": "banking-recall",
      "eyebrow": "Recall",
      "title": "Recall: banks and money",
      "items": [
        {
          "text": "Define a commercial bank.",
          "answer": "A bank that accepts deposits, lends money and provides payment services to customers."
        },
        {
          "text": "Why does rapid inflation make money a poor store of value?",
          "answer": "Rising prices reduce purchasing power, so the same amount of money buys fewer goods and services."
        },
        {
          "text": "Define an overdraft.",
          "answer": "An arrangement allowing spending beyond a current-account balance up to an agreed limit."
        }
      ],
      "sharePrompt": "Write three short answers. Then check each against the model.",
      "notes": "Independent retrieval: questions 1 and 3 revisit Commercial banks; question 2 revisits Money lesson 1, Store of value and its rapid-inflation check (syllabus 3.1.1). It asks for the purchasing-power explanation already taught there and prepares the later price-stability discussion. Allow about three minutes before feedback. Keep all questions visible; reveal each large model answer separately with Right/Next and reverse with Left."
    },
    {
      "type": "outcomes",
      "eyebrow": "Objectives",
      "title": "By the end, you can",
      "bullets": [
        "Define a central bank and distinguish its role.",
        "Explain the functions of a central bank.",
        "Analyse the importance of central banks."
      ],
      "zhBullets": [
        "定义中央银行并区分其作用。",
        "解释中央银行的职能。",
        "分析中央银行的重要性。"
      ]
    },
    {
      "type": "section",
      "eyebrow": "Part 1",
      "title": "Definition of a central bank",
      "zhTitle": "中央银行的定义"
    },
    {
      "type": "cards",
      "layout": "central-bank-intro",
      "eyebrow": "Opening story",
      "title": "Who lends to a bank?",
      "lead": "Commercial banks lend to households and firms. A central bank can lend to commercial banks.",
      "cards": [
        {
          "title": "Who lends to commercial banks?",
          "body": "Households and firms can borrow from a commercial bank. Where can the bank itself borrow?"
        },
        {
          "title": "A bank for banks 银行的银行",
          "body": "A central bank can lend to commercial banks. These banks lend to households and firms."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "notes": "Start with the familiar relationship: a commercial bank lends to households buying a home and firms buying equipment. On the next click, ask who could lend to the commercial bank; pause before revealing the central bank. Use only the distinction between the borrowers at each level. The arrows show lending relationships, not a claim that each customer loan is financed by central-bank borrowing. Commercial banks have other funding sources and can lend to each other. Central-bank lending is one example of its banking services; the following examples and definition establish its wider role. Save withdrawals, funding shortages and lender of last resort for the illustrated example in Part 2."
    },
    {
      "type": "cards",
      "eyebrow": "Learn",
      "title": "Examples of central banks 中央银行实例",
      "layout": "bank-gallery",
      "cards": [
        {
          "title": "People’s Bank of China",
          "zhTitle": "中国人民银行",
          "body": "Beijing · China",
          "visual": IGCSE.photos.monetaryPolicy.pboc
        },
        {
          "title": "Bank of England",
          "zhTitle": "英格兰银行",
          "body": "London · United Kingdom",
          "visual": IGCSE.photos.monetaryPolicy.bankEngland
        },
        {
          "title": "Federal Reserve",
          "zhTitle": "美国联邦储备系统",
          "body": "Board headquarters · Washington, DC",
          "visual": IGCSE.photos.monetaryPolicy.fed
        }
      ],
      "sources": [
        {
          "label": "People’s Bank of China headquarters",
          "ref": "https://commons.wikimedia.org/wiki/File:People's_Bank_of_China_(2020).jpg",
          "note": "Headquarters in Beijing; local photograph from the monetary-policy catalogue."
        },
        {
          "label": "Bank of England — Michael / Wikimedia Commons",
          "ref": "https://commons.wikimedia.org/wiki/File:Bank_of_England_Facade.jpg",
          "note": "Headquarters facade in London."
        },
        {
          "label": "Federal Reserve Board headquarters",
          "ref": "https://commons.wikimedia.org/wiki/File:Marriner_S._Eccles_Federal_Reserve_Board_Building.jpg",
          "note": "Marriner S. Eccles building, Washington, DC; local photograph from the monetary-policy catalogue."
        }
      ],
      "notes": "Show the headquarters to locate the institutions. The Federal Reserve is a system: the photograph shows its Board of Governors headquarters, not a single commercial-bank head office. Contrast the People’s Bank of China with Bank of China (Hong Kong).",
      "handoutVisuals": true
    },
    {
      "type": "term",
      "layout": "photo-term",
      "eyebrow": "Learn",
      "title": "Central bank",
      "zhTitle": "中央银行",
      "definition": "A central bank provides banking services to government and commercial banks and implements monetary policy.",
      "definitionZh": "中央银行为政府和商业银行提供银行服务，并实施货币政策。",
      "keyTerms": [
        {
          "term": "government and commercial banks",
          "zh": "政府和商业银行",
          "explain": false
        },
        {
          "term": "monetary policy",
          "zh": "货币政策",
          "note": "Policy using interest rates and money-supply measures to influence the economy."
        }
      ],
      "showExamples": false,
      "visual": IGCSE.photos.monetaryPolicy.pboc,
      "sources": [
        {
          "label": "Syllabus 2027–2029",
          "ref": "3.1.2 Banking",
          "note": "The role and importance of central banks and commercial banks."
        },
        {
          "label": "Definitions 2026",
          "ref": "3.1.2 Central bank and commercial bank"
        },
        {
          "label": "Paper 2 question and mark scheme",
          "ref": "2024ON-23 Q5(a)",
          "question": "Define a central bank.",
          "extract": "MS basis: Accepted details include providing banking services to government/commercial banks and operating monetary policy or setting interest rates. Each is a separate creditworthy detail."
        }
      ],
      "notes": "Use two independent details for the actual two-mark definition: who it serves, and monetary policy. Avoid relying on the vague phrase manages the banking system for a second mark. Government ownership is another accepted detail in this paper, but ownership arrangements are not universal."
    },
    {
      "type": "dataTable",
      "eyebrow": "Learn",
      "title": "Central and commercial banks",
      "zhTitle": "中央银行与商业银行",
      "layout": "bank-comparison",
      "table": {
        "columns": [
          "Feature 比较项目",
          "Central bank",
          "Commercial bank"
        ],
        "rows": [
          [
            "Main aim 主要目标",
            "Usually price stability.",
            "Profitability (profit maximisation)."
          ],
          [
            "Accounts 账户",
            "Holds government accounts.",
            "Holds accounts for households and firms."
          ]
        ],
        "rowHeaders": true
      },
      "sources": [
        {
          "label": "Paper 2 question and mark scheme",
          "ref": "2025ON-23 Q3(a)",
          "question": "Identify two ways central banks differ from commercial banks.",
          "extract": "MS basis: One mark for a central-bank characteristic and one for a linked positive commercial-bank characteristic. A negative comment such as commercial banks do not only earns the first mark."
        }
      ],
      "notes": "Feature means what is being compared. Verified against 0455_w25_ms_23.pdf, page 17, Q3(a): the accepted contrasts include usually price stability versus profit maximisation or growth, and government accounts versus household/firm accounts. Focus the commercial-bank aim on profitability through profit maximisation. Keep the header row and feature column visible from the start; reveal the central-bank aim, commercial-bank aim, central-bank accounts and commercial-bank accounts one cell per click. Use positive facts on both sides. These are typical distinctions, not absolute exclusivity: commercial banks can also serve government.",
      "partialReview": [
        ".dataTable tbody > tr > td"
      ]
    },
    {
      "type": "section",
      "eyebrow": "Part 2",
      "title": "Functions of a central bank",
      "zhTitle": "中央银行的职能"
    },
    {
      "type": "cards",
      "layout": "central-bank-function",
      "eyebrow": "Function 1 of 6",
      "title": "1. Issue notes and coins",
      "lead": "发行纸币与硬币",
      "cardLayout": "function-issue",
      "cards": [
        {
          "title": "Often the only bank allowed to issue notes and coins.",
          "zhTitle": "通常是唯一获准发行纸币与硬币的银行。"
        }
      ],
      "visual": {
        ...IGCSE.photos.moneyBanking.currencyProduction,
        "caption": "Illustration: authorised banknote production",
        "credit": "Teaching illustration / OpenAI",
        "source": ""
      },
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2023ON-23 Q3(b) · MS p. 17",
          "question": "Explain two functions of a central bank.",
          "extract": "Accepted functions include currency issue, banking for government, holding foreign currency reserves, lender of last resort, regulation and monetary policy. One mark per function and one per explanation."
        }
      ],
      "notes": "Use the illustration to identify controlled currency issue, then reveal the qualified monopoly point credited in 2023ON-23 Q3(b). The picture shows fictional notes, not an actual central-bank factory. Issue arrangements vary, so retain often."
    },
    {
      "type": "cards",
      "layout": "central-bank-example",
      "eyebrow": "Real example · Hong Kong",
      "title": "Hong Kong banknote issuers",
      "cards": [
        {
          "title": "3 commercial banks",
          "body": "HSBC, Standard Chartered and Bank of China (Hong Kong) issue Hong Kong banknotes."
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/central-bank-functions/bank-of-china-hk-1000-sample.png",
        "alt": "Sample front of a Bank of China (Hong Kong) 2018-series HK$1,000 banknote.",
        "caption": "Bank of China (Hong Kong) · HK$1,000 sample",
        "credit": "HKMA / Bank of China (Hong Kong)",
        "source": "https://www.hkma.gov.hk/media/eng/doc/key-functions/money/notes-and-coins/design-and-security/2018/Leaflet_Eng.pdf"
      },
      "sources": [
        {
          "label": "HKMA: note-issuing banks",
          "ref": "https://www.hkma.gov.hk/eng/data-publications-and-research/guide-to-monetary-banking-and-financial-terms/money_launder/",
          "note": "Lists the three note-issuing banks. Their notes are backed by US dollars placed with the Exchange Fund."
        },
        {
          "label": "HKMA: 2018 Series Hong Kong Banknotes",
          "ref": "https://www.hkma.gov.hk/media/eng/doc/key-functions/money/notes-and-coins/design-and-security/2018/Leaflet_Eng.pdf",
          "note": "Names the three issuers and shows the illustrated banknote."
        }
      ],
      "notes": "A concise real exception to often the only bank allowed to issue notes: Hong Kong’s authorised commercial banks issue the HK$20, $50, $100, $500 and $1,000 notes. The government issues $10 notes and coins. Do not equate Bank of China (Hong Kong) with the People’s Bank of China. The pictured 2018-series banknote is a sample image extracted from the HKMA leaflet, not a newly created note. The currency-board arrangements are context, not additional exam content to memorise.",
      "partialReview": false,
      "handoutVisuals": true
    },
    {
      "type": "cards",
      "layout": "central-bank-function",
      "eyebrow": "Function 2 of 6",
      "title": "2. Act as banker to government",
      "lead": "充当政府的银行",
      "cardLayout": "function-roles",
      "cards": [
        {
          "title": "Receives payments to the government",
          "zhTitle": "接收政府款项"
        },
        {
          "title": "Makes payments on behalf of the government",
          "zhTitle": "代表政府付款"
        },
        {
          "title": "Manages the national debt",
          "zhTitle": "管理国债"
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/central-bank-functions/government-banking.svg",
        "alt": "A central bank handles government receipts, payments and national debt.",
        "caption": "Government banking",
        "credit": "Oehler-Huang teaching illustration",
        "source": ""
      },
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2023ON-23 Q3(b) · MS p. 17",
          "question": "Explain two functions of a central bank.",
          "extract": "Accepted functions include currency issue, banking for government, holding foreign currency reserves, lender of last resort, regulation and monetary policy. One mark per function and one per explanation."
        }
      ],
      "notes": "The three statements are parallel operations, not a causal chain. Each is accepted in 2023ON-23 Q3(b). National debt means government borrowing. The illustration represents the government account and payments; it is not a retail customer account."
    },
    {
      "type": "cards",
      "layout": "central-bank-function",
      "eyebrow": "Function 3 of 6",
      "title": "3. Hold foreign currency reserves",
      "lead": "持有外汇储备",
      "cardLayout": "function-flow",
      "cards": [
        {
          "title": "Buys or sells foreign currency",
          "zhTitle": "买卖外币"
        },
        {
          "title": "Influences the exchange rate",
          "zhTitle": "影响汇率"
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/central-bank-functions/foreign-currency-reserves.svg",
        "alt": "A central-bank vault holds currencies that can be bought and sold.",
        "caption": "Foreign currency reserves",
        "credit": "Oehler-Huang teaching illustration",
        "source": ""
      },
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2023ON-23 Q3(b) · MS p. 17",
          "question": "Explain two functions of a central bank.",
          "extract": "Accepted functions include currency issue, banking for government, holding foreign currency reserves, lender of last resort, regulation and monetary policy. One mark per function and one per explanation."
        },
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2025ON-21 Q3(c) · MS p. 19",
          "question": "Analyse reasons why central banks are important for an economy.",
          "extract": "Accepted developments include currency transactions influencing exchange rates; liquidity for commercial banks; monitoring banks, preventing collapse, protecting savings and credit, and financial stability; monetary policy, inflation control and purchasing power."
        }
      ],
      "notes": "The holding function is in the title and vault illustration; the two revealed statements link currency transactions to the exchange rate, as credited in both selected schemes. Explain exchange rate as one currency’s price in another."
    },
    {
      "type": "yesNoCheck",
      "layout": "central-bank-check",
      "eyebrow": "Check",
      "title": "Banking operations: yes or no?",
      "prompt": "Decide yes or no. Give an economic reason. 判断并解释。",
      "items": [
        {
          "statement": "Bank of China (Hong Kong) issues banknotes. Is this enough to identify it as a central bank?",
          "answer": false,
          "reason": "Issuing notes alone is insufficient. It is a commercial bank; its main aim is profitability."
        },
        {
          "statement": "A central bank pays teachers on the government’s behalf. Has it decided how much to spend on education?",
          "answer": false,
          "reason": "Making government payments is a banking service. It does not mean deciding the government’s budget."
        },
        {
          "statement": "A central bank leaves interest rates unchanged but buys foreign currency. Can it still influence the exchange rate?",
          "answer": true,
          "reason": "Buying or selling foreign currency can influence the exchange rate."
        }
      ],
      "sources": [
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2025ON-23 Q3(a) · MS p. 17",
          "note": "Central banks usually aim for price stability; commercial banks aim for profit maximisation or growth."
        },
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2023ON-23 Q3(b) · MS p. 17",
          "note": "Currency issue; banker to government; reserves and exchange rates; emergency lending; banking regulation; monetary policy."
        },
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2025ON-21 Q3(c) · MS p. 19",
          "note": "Liquidity, bank risks and financial stability; inflation control and purchasing power."
        }
      ],
      "notes": "Teacher-written application check, not a past-paper question. All questions appear immediately. Take an individual decision and a reason before each reversible answer reveal. The Hong Kong example qualifies often the only bank allowed to issue currency; do not turn it into a rule that note-issuing banks are central banks. For question 2, distinguish executing payments from choosing expenditure. For question 3, return to the reserves diagram if students think interest rates are the only instrument."
    },
    {
      "type": "cards",
      "layout": "central-bank-film",
      "eyebrow": "Function 4 · Example",
      "title": "4. Lender of last resort: emergency funds",
      "lead": "A bank has valuable assets but may still need money for withdrawals today.",
      "cards": [
        {
          "title": "Loans are repaid later",
          "body": "After lending, the bank has ¥200,000 available and ¥900,000 in sound loans."
        },
        {
          "title": "Four savers request ¥400,000",
          "body": "Each saver wants ¥100,000. Calculate the shortage before revealing the payments."
        },
        {
          "title": "Two paid; two still waiting",
          "body": "The bank pays ¥200,000 but still needs another ¥200,000."
        },
        {
          "title": "Who lends to a bank?",
          "body": "Suppose other commercial banks will not lend and the loans cannot be turned into money today."
        },
        {
          "title": "A central-bank loan",
          "body": "If eligible, the bank may borrow ¥200,000 from the central bank as lender of last resort."
        },
        {
          "title": "Withdrawals can continue",
          "body": "The remaining savers receive their money. The central-bank loan must be repaid; support is conditional."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "notes": "A seven-frame illustrated story, controlled by the normal Next/Right and Previous/Left controls. Let students predict on frames 0, 2 and 4. Each banknote bundle represents ¥100,000; these are units of value, not denominations. Initially the fictional bank has ¥1.1m in funds, financed by ¥1m in deposits and ¥100,000 of owners’ capital. It lends ¥900,000, leaving ¥200,000 available. Assume the loans retain their value, will be repaid later, and cannot be converted into money today. Four savers each request ¥100,000. After two are paid, the bank needs another ¥200,000. If it qualifies for central-bank assistance, an emergency loan meets the remaining withdrawals. This illustrates a liquidity shortage, not loan losses, automatic rescue, or a general model of deposit creation. Students already know what a central bank is. Use this example to introduce lender of last resort immediately before the numbered explanation of function 4. Keep narration conversational and off-screen; allow about three minutes."
    },
    {
      "type": "cards",
      "layout": "central-bank-function",
      "eyebrow": "Function 4 of 6",
      "title": "4. Act as lender of last resort",
      "lead": "充当最后贷款人",
      "cardLayout": "function-flow",
      "cards": [
        {
          "title": "Lends to commercial banks in difficulties",
          "zhTitle": "向陷入困难的商业银行贷款"
        },
        {
          "title": "Provides liquidity to commercial banks",
          "zhTitle": "向商业银行提供流动资金"
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/central-bank-functions/emergency-central-bank-lending.svg",
        "alt": "A central bank supplies emergency lending to a commercial bank in difficulty.",
        "caption": "Emergency central-bank lending",
        "credit": "Oehler-Huang teaching illustration",
        "source": ""
      },
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2023ON-23 Q3(b) · MS p. 17",
          "question": "Explain two functions of a central bank.",
          "extract": "Accepted functions include currency issue, banking for government, holding foreign currency reserves, lender of last resort, regulation and monetary policy. One mark per function and one per explanation."
        },
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2025ON-21 Q3(c) · MS p. 19",
          "question": "Analyse reasons why central banks are important for an economy.",
          "extract": "Accepted developments include currency transactions influencing exchange rates; liquidity for commercial banks; monitoring banks, preventing collapse, protecting savings and credit, and financial stability; monetary policy, inflation control and purchasing power."
        }
      ],
      "notes": "Consolidate the preceding animation using the precise lending and liquidity points in the two schemes. Liquidity means funds available to meet immediate payments. Emergency support is conditional."
    },
    {
      "type": "cards",
      "layout": "central-bank-example",
      "eyebrow": "Real example · United Kingdom",
      "title": "Northern Rock: emergency support",
      "cards": [
        {
          "title": "14 September 2007",
          "body": "The Bank of England announced emergency liquidity support for Northern Rock."
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/central-bank-functions/northern-rock-2007.jpg",
        "alt": "Customers queue outside Northern Rock in Brighton on 14 September 2007.",
        "caption": "Northern Rock, Brighton · 14 September 2007",
        "credit": "Dominic Alves / CC BY 2.0",
        "source": "https://commons.wikimedia.org/wiki/File:Northern_Rock_Queue.jpg"
      },
      "sources": [
        {
          "label": "Bank of England: Liquidity Support Facility for Northern Rock plc",
          "ref": "https://www.bankofengland.co.uk/news/2007/september/liquidity-support-facility-for-northern-rock-plc",
          "note": "Announcement dated 14 September 2007: Chancellor authorised liquidity support against appropriate collateral and at an interest-rate premium."
        },
        {
          "label": "Photograph: Northern Rock Queue, Dominic Alves",
          "ref": "https://www.flickr.com/photos/dominicspics/1381505612/",
          "note": "Brighton, 14 September 2007. CC BY 2.0: https://creativecommons.org/licenses/by/2.0/. Local copy of the photographer’s 1024px Flickr image."
        }
      ],
      "notes": "This is the real lender-of-last-resort example. The facility supplied liquidity to a commercial bank in difficulty, subject to collateral and an interest-rate premium; it was not an unconditional gift. The photograph shows actual queues in Brighton on the announcement date. It does not imply that support instantly ended withdrawals or solved every problem. Keep the visible example to the date and fact; elicit the function verbally.",
      "partialReview": false,
      "handoutVisuals": true
    },
    {
      "type": "cards",
      "layout": "central-bank-function",
      "eyebrow": "Function 5 of 6",
      "title": "5. Regulate the banking system",
      "lead": "监管银行体系",
      "cardLayout": "function-flow",
      "cards": [
        {
          "title": "Monitors banks and limits excessive risks",
          "zhTitle": "监督银行，限制过度冒险"
        },
        {
          "title": "Reduces the likelihood of bank collapse",
          "zhTitle": "降低银行倒闭的可能性"
        },
        {
          "title": "Protects savings and access to credit",
          "zhTitle": "保护储蓄并维持信贷供应"
        },
        {
          "title": "Maintains financial stability",
          "zhTitle": "维持金融稳定"
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/central-bank-functions/bank-risk-supervision.svg",
        "alt": "A magnifying glass examines a commercial bank and its risks; a shield represents protection.",
        "caption": "Banking supervision",
        "credit": "Oehler-Huang teaching illustration",
        "source": ""
      },
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2023ON-23 Q3(b) · MS p. 17",
          "question": "Explain two functions of a central bank.",
          "extract": "Accepted functions include currency issue, banking for government, holding foreign currency reserves, lender of last resort, regulation and monetary policy. One mark per function and one per explanation."
        },
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2025ON-21 Q3(c) · MS p. 19",
          "question": "Analyse reasons why central banks are important for an economy.",
          "extract": "Accepted developments include currency transactions influencing exchange rates; liquidity for commercial banks; monitoring banks, preventing collapse, protecting savings and credit, and financial stability; monetary policy, inflation control and purchasing power."
        }
      ],
      "notes": "Read down the consequences of supervision, using the development credited in 2025ON-21 Q3(c). Regulation may be shared with other authorities; it reduces risk rather than guaranteeing that no bank fails."
    },
    {
      "type": "yesNoCheck",
      "layout": "central-bank-check",
      "eyebrow": "Check",
      "title": "Financial stability: yes or no?",
      "prompt": "Decide yes or no. Give an economic reason. 判断并解释。",
      "items": [
        {
          "statement": "A bank’s sound loans will be repaid next year, but withdrawals exceed its cash today. Could it need the lender of last resort?",
          "answer": true,
          "reason": "Valuable loans are not necessarily funds available today. Emergency lending can provide liquidity."
        },
        {
          "statement": "A bank’s risks are monitored and it later receives emergency funds. Are these examples of the same central-bank function?",
          "answer": false,
          "reason": "Regulation monitors and limits risks. Lender-of-last-resort support provides emergency funds."
        }
      ],
      "sources": [
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2023ON-23 Q3(b) · MS p. 17",
          "note": "Currency issue; banker to government; reserves and exchange rates; emergency lending; banking regulation; monetary policy."
        },
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2025ON-21 Q3(c) · MS p. 19",
          "note": "Liquidity, bank risks and financial stability; inflation control and purchasing power."
        }
      ],
      "notes": "Teacher-written application check, not a past-paper question. All questions appear immediately. Take an individual decision and a reason before each reversible answer reveal. Question 1 transfers the animation to a new judgement: sound assets do not remove an immediate shortage of funds. Assistance is conditional, not automatic. Question 2 asks students to distinguish two mechanisms despite their shared contribution to financial stability."
    },
    {
      "type": "cards",
      "layout": "central-bank-function",
      "eyebrow": "Function 6 of 6",
      "title": "6. Operate monetary policy",
      "lead": "实施货币政策",
      "cardLayout": "function-flow",
      "cards": [
        {
          "title": "Sets interest rates or manages the money supply",
          "zhTitle": "设定利率或管理货币供应量"
        },
        {
          "title": "Controls inflation: prevents prices rising too much",
          "zhTitle": "控制通胀，防止价格过度上涨"
        },
        {
          "title": "Protects purchasing power",
          "zhTitle": "保护购买力"
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/central-bank-functions/fomc-policy-meeting.jpg",
        "alt": "Jerome Powell and Philip Jefferson participate in the January 30–31, 2024 FOMC monetary-policy meeting.",
        "caption": "FOMC monetary-policy meeting · January 2024",
        "credit": "Federal Reserve / public domain",
        "source": "https://www.flickr.com/photos/federalreserve/53500908885/"
      },
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2023ON-23 Q3(b) · MS p. 17",
          "question": "Explain two functions of a central bank.",
          "extract": "Accepted functions include currency issue, banking for government, holding foreign currency reserves, lender of last resort, regulation and monetary policy. One mark per function and one per explanation."
        },
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2025ON-21 Q3(c) · MS p. 19",
          "question": "Analyse reasons why central banks are important for an economy.",
          "extract": "Accepted developments include currency transactions influencing exchange rates; liquidity for commercial banks; monitoring banks, preventing collapse, protecting savings and credit, and financial stability; monetary policy, inflation control and purchasing power."
        }
      ],
      "notes": "Follow the monetary-policy development in 2025ON-21 Q3(c), with the interest-rate and money-supply instruments credited in 2023ON-23 Q3(b). Protecting purchasing power means limiting its deterioration; lower inflation does not necessarily mean falling prices. The photograph is an actual FOMC policy meeting in January 2024. Keep this at the 3.1.2 role-and-aim level. Teach the effects of rate changes on borrowing, saving, spending and inflation in Unit 4.3, using the dedicated Interest rates deck; do not insert a transmission-mechanism discussion here."
    },
    {
      "type": "cards",
      "layout": "central-bank-example",
      "eyebrow": "Real example · United Kingdom",
      "title": "UK interest-rate rises",
      "cards": [
        {
          "title": "0.1% → 5.25%",
          "body": "Bank Rate rose from early December 2021 to August 2023 as the Bank of England acted to reduce inflation."
        }
      ],
      "visual": IGCSE.photos.monetaryPolicy.bankEngland,
      "sources": [
        {
          "label": "Bank of England: December 2021 policy decision",
          "ref": "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2021/december-2021",
          "note": "On 16 December 2021 Bank Rate rose from 0.1% to 0.25%; use early December as the 0.1% starting date."
        },
        {
          "label": "Bank of England: August 2023 policy decision",
          "ref": "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2023/august-2023",
          "note": "Published 3 August 2023: Bank Rate increased to 5.25%. The stated monetary-policy aim was to meet the 2% inflation target."
        }
      ],
      "notes": "Historical rates, not current rates. Bank Rate means the Bank of England’s main policy interest rate, not every mortgage or savings rate. The starting 0.1% is before the 16 December 2021 increase; 5.25% took effect in August 2023. This illustrates the interest-rate instrument and price-stability aim; it does not prove that interest rates alone caused a subsequent inflation change. The photograph shows the Bank’s headquarters, not the particular policy meeting. Use only as a brief example of a central bank setting its policy rate. Save explanation of the spending and inflation mechanism for Unit 4.3.",
      "partialReview": false,
      "handoutVisuals": true
    },
    {
      "type": "yesNoCheck",
      "layout": "central-bank-check",
      "eyebrow": "Check",
      "title": "Price stability: yes or no?",
      "prompt": "Decide yes or no. Give an economic reason. 判断并解释。",
      "items": [
        {
          "statement": "Inflation falls from 8% to 3%. Has money recovered the purchasing power it lost?",
          "answer": false,
          "reason": "Prices are still rising. Money loses purchasing power more slowly; the earlier loss is not reversed."
        },
        {
          "statement": "A central bank earns less profit while inflation is low and stable. Could it still be achieving its main aim?",
          "answer": true,
          "reason": "Its main aim is usually price stability. Lower profit does not by itself show failure."
        }
      ],
      "sources": [
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2023ON-23 Q3(b) · MS p. 17",
          "note": "Currency issue; banker to government; reserves and exchange rates; emergency lending; banking regulation; monetary policy."
        },
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2025ON-21 Q3(c) · MS p. 19",
          "note": "Liquidity, bank risks and financial stability; inflation control and purchasing power."
        },
        {
          "label": "Original Paper 2 mark scheme",
          "ref": "2025ON-23 Q3(a) · MS p. 17",
          "note": "Central banks usually aim for price stability; commercial banks aim for profit maximisation or growth."
        }
      ],
      "notes": "Teacher-written application check, not a past-paper question. All questions appear immediately. Take an individual decision and a reason before each reversible answer reveal. Both cases are hypothetical applications. Question 1 revisits inflation and money as a store of value from Money lesson 1: lower inflation does not reverse earlier price rises. Question 2 applies the central/commercial-bank comparison: judge a central bank against its price-stability aim rather than commercial profitability. Neither question requires the interest-rate transmission mechanism from Unit 4.3. Reteach weak links before the original past-paper questions; the six-mark independent attempt remains the assessed exit."
    },
    {
      "type": "section",
      "eyebrow": "Part 3",
      "title": "Past paper practice",
      "zhTitle": "历年真题练习",
      "notes": "All remaining slides are original past-paper questions followed by separate teacher-written models. Preserve time for independent writing. The final six-mark question assesses the functions and their economic consequences."
    },
    {
      "type": "exam",
      "eyebrow": "Exam practice",
      "title": "Define a central bank. [2]",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2,
        "command": "Define",
        "skills": [
          "k"
        ]
      },
      "keywordLabel": "October/November 2024, 0455/23 Q5(a)",
      "keywords": [
        "State who it serves [1]",
        "State its policy role [1]"
      ],
      "prompt": "Write one precise sentence before revealing the model.",
      "sources": [
        {
          "label": "Paper 2 question and mark scheme",
          "ref": "2024ON-23 Q5(a)",
          "question": "Define a central bank.",
          "extract": "MS basis: Accepted details include providing banking services to government/commercial banks and operating monetary policy or setting interest rates. Each is a separate creditworthy detail."
        }
      ],
      "notes": "Original wording and allocation verified in 0455_w24_qp_23.pdf page 5 and 0455_w24_ms_23.pdf page 22."
    },
    {
      "type": "modelAnswer",
      "eyebrow": "Model answer",
      "title": "Define a central bank. [2]",
      "paragraphs": [
        "A central bank provides banking services to the government and commercial banks and implements monetary policy."
      ],
      "links": [
        "banking services to the government and commercial banks",
        "implements monetary policy"
      ],
      "showLinkChips": false,
      "markSchemeNote": "Banking services to government/commercial banks is one creditworthy detail. Operating monetary policy is a second.",
      "partialReview": [
        ".modelAnswerText",
        ".modelAnswerNote"
      ],
      "sources": [
        {
          "label": "Paper 2 question and mark scheme",
          "ref": "2024ON-23 Q5(a)",
          "question": "Define a central bank.",
          "extract": "MS basis: Accepted details include providing banking services to government/commercial banks and operating monetary policy or setting interest rates. Each is a separate creditworthy detail."
        }
      ],
      "notes": ""
    },
    {
      "type": "exam",
      "eyebrow": "Exam practice",
      "title": "Identify two ways central banks differ from commercial banks. [2]",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2,
        "command": "Identify",
        "skills": [
          "k"
        ]
      },
      "keywordLabel": "October/November 2025, 0455/23 Q3(a)",
      "keywords": [
        "Compare the same feature",
        "State a positive fact about each bank"
      ],
      "prompt": "Write two concise contrasting statements. Do not rely on “commercial banks do not”.",
      "sources": [
        {
          "label": "Paper 2 question and mark scheme",
          "ref": "2025ON-23 Q3(a)",
          "question": "Identify two ways central banks differ from commercial banks.",
          "extract": "MS basis: One mark for a central-bank characteristic and one for a linked positive commercial-bank characteristic. A negative comment such as commercial banks do not only earns the first mark."
        }
      ],
      "notes": "The actual wording asks for two ways. The mark scheme awards a central-bank characteristic and a linked commercial-bank characteristic, not an automatic mark for each separate sentence. Students can give two paired contrasts; the maximum remains two marks."
    },
    {
      "type": "modelAnswer",
      "eyebrow": "Model answer",
      "title": "Identify two ways central banks differ from commercial banks. [2]",
      "paragraphs": [
        "A central bank’s main objective is usually price stability, whereas a commercial bank’s main objective is usually profit maximisation.",
        "A central bank holds government and commercial-bank accounts, whereas commercial banks hold accounts for households and firms."
      ],
      "links": [
        "price stability",
        "profit maximisation",
        "government and commercial-bank accounts",
        "households and firms"
      ],
      "showLinkChips": false,
      "markSchemeNote": "The scheme requires a positive central-bank fact and a linked positive commercial-bank fact. A negative statement alone does not earn the second mark.",
      "partialReview": [
        ".modelAnswerParagraphs > p",
        ".modelAnswerNote"
      ],
      "sources": [
        {
          "label": "Paper 2 question and mark scheme",
          "ref": "2025ON-23 Q3(a)",
          "question": "Identify two ways central banks differ from commercial banks.",
          "extract": "MS basis: One mark for a central-bank characteristic and one for a linked positive commercial-bank characteristic. A negative comment such as commercial banks do not only earns the first mark."
        }
      ],
      "notes": "These are two valid paired contrasts. The first complete linked contrast already contains both credited sides in this particular mark scheme. Do not imply four marks or one automatic mark for each contrast."
    },
    {
      "type": "exam",
      "eyebrow": "Exam practice",
      "title": "Explain two functions of a central bank. [4]",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 4,
        "command": "Explain",
        "skills": [
          "k",
          "an"
        ]
      },
      "keywordLabel": "October/November 2023, 0455/23 Q3(b)",
      "keywords": [
        "Identify function [1]",
        "Explain function [1]",
        "Identify function [1]",
        "Explain function [1]"
      ],
      "prompt": "Write two developed points in four minutes. Choose functions you can explain accurately.",
      "sources": [
        {
          "label": "Paper 2 question and mark scheme",
          "ref": "2023ON-23 Q3(b)",
          "question": "Explain two functions of a central bank.",
          "extract": "MS basis: One mark for each of two functions and one for each explanation. Currency issue, government banking, lender of last resort, regulation, monetary policy and foreign reserves are accepted."
        }
      ],
      "notes": "",
      "layout": "exam-pairs"
    },
    {
      "type": "modelAnswer",
      "eyebrow": "Model answer",
      "title": "Explain two functions of a central bank. [4]",
      "paragraphs": [
        "The central bank acts as banker to the government. It receives money into government accounts and makes payments on the government’s behalf.",
        "The central bank acts as lender of last resort. It provides emergency loans to commercial banks that cannot obtain funds elsewhere, helping them meet withdrawals."
      ],
      "links": [
        "banker to the government",
        "receives money",
        "makes payments",
        "lender of last resort",
        "emergency loans"
      ],
      "showLinkChips": false,
      "markSchemeNote": "One mark for each function plus one for its explanation. The two paragraphs explain different functions.",
      "partialReview": [
        ".modelAnswerParagraphs > p",
        ".modelAnswerNote"
      ],
      "sources": [
        {
          "label": "Paper 2 question and mark scheme",
          "ref": "2023ON-23 Q3(b)",
          "question": "Explain two functions of a central bank.",
          "extract": "MS basis: One mark for each of two functions and one for each explanation. Currency issue, government banking, lender of last resort, regulation, monetary policy and foreign reserves are accepted."
        }
      ],
      "notes": ""
    },
    {
      "type": "exam",
      "eyebrow": "Exam practice",
      "title": "Analyse reasons why central banks are important for an economy. [6]",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 6,
        "command": "Analyse",
        "skills": [
          "k",
          "an"
        ]
      },
      "keywordLabel": "October/November 2025, 0455/21 Q3(c)",
      "keywords": [
        "State an economic benefit",
        "Explain the bank’s action",
        "Develop the consequence"
      ],
      "prompt": "Write for six minutes. Explain why the roles matter to people or the economy.",
      "sources": [
        {
          "label": "Paper 2 question and mark scheme",
          "ref": "2025ON-21 Q3(c)",
          "question": "Analyse reasons why central banks are important for an economy.",
          "extract": "MS basis: Develop effects: monetary policy can control inflation and protect purchasing power; supervision can maintain financial stability; emergency liquidity can support commercial banks."
        }
      ],
      "notes": "Original wording verified in 0455_w25_qp_21.pdf page 4. Move beyond the previous four-mark role explanation. The six-mark scheme accepts developed reasons, not a compulsory number of paragraphs. Use this independent attempt as the assessed exit; collect responses before revealing the model."
    },
    {
      "type": "modelAnswer",
      "eyebrow": "Model answer",
      "title": "Analyse reasons why central banks are important for an economy. [6]",
      "paragraphs": [
        "Central banks can help control inflation through monetary policy, using interest rates or the money supply. Preventing prices from rising too quickly helps protect purchasing power, so households’ money loses value more slowly and goods and services remain more affordable.",
        "Central banks can help maintain financial stability by monitoring commercial banks’ risks. This may reduce the likelihood of bank failure, helping protect depositors’ savings and preserving households’ and firms’ access to credit."
      ],
      "links": [
        "control inflation",
        "protect purchasing power",
        "financial stability",
        "monitoring commercial banks’ risks",
        "protect depositors’ savings",
        "access to credit"
      ],
      "showLinkChips": false,
      "markSchemeNote": "Each paragraph develops an action into economic consequences. Repeating “central banks are important” or listing functions does not supply those links.",
      "partialReview": [
        ".modelAnswerParagraphs > p",
        ".modelAnswerNote"
      ],
      "sources": [
        {
          "label": "Paper 2 question and mark scheme",
          "ref": "2025ON-21 Q3(c)",
          "question": "Analyse reasons why central banks are important for an economy.",
          "extract": "MS basis: Develop effects: monetary policy can control inflation and protect purchasing power; supervision can maintain financial stability; emergency liquidity can support commercial banks."
        }
      ],
      "notes": "Reveal the two explanations separately. Lender-of-last-resort analysis is another valid approach taught earlier. Do not require a judgement for this Analyse question or allocate three marks mechanically to every paragraph. The monetary-policy paragraph develops the accepted inflation/purchasing-power points without requiring the borrowing-and-spending transmission mechanism taught in Unit 4.3."
    }
  ]
};
