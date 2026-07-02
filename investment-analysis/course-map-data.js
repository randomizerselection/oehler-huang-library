(function attachInvestmentCourseMap(global) {
  const courseMap = {
  "version": 1,
  "courseTitle": "Investment Analysis",
  "mapTitle": "30-Lesson Course Map",
  "writtenArtifactRule": "Each lesson handout is the primary written artifact. The textbook is a compiled collection of the 30 handouts with light front matter and unit dividers only.",
  "handoutContract": [
    {
      "key": "sourceBox",
      "title": "Source box",
      "requirement": "Company identity, listed security or source context, source title, URL, publication date, accessed date, key figures and limitation."
    },
    {
      "key": "vocabulary",
      "title": "Vocabulary",
      "requirement": "All lesson terms with English definition and Chinese support."
    },
    {
      "key": "companyEvidence",
      "title": "Company evidence",
      "requirement": "The dated company evidence task named in the course map."
    },
    {
      "key": "calculationOrJudgement",
      "title": "Calculation or judgement task",
      "requirement": "The lesson formula, evidence interpretation or judgement check."
    },
    {
      "key": "misconceptionCheck",
      "title": "Misconception check",
      "requirement": "One explicit misconception the handout breaks."
    },
    {
      "key": "individualOutput",
      "title": "Individual written output",
      "requirement": "The student output that can be assessed in class or in an exam."
    }
  ],
  "textbookAssembly": {
    "source": "lesson handouts",
    "rule": "Do not write separate textbook-only teaching chapters; compile the handout sequence with a cover, contents page and six unit dividers.",
    "sections": [
      "Cover",
      "Contents",
      "Unit divider",
      "Lesson handouts 1-30"
    ]
  },
  "units": [
    {
      "unit": 1,
      "lessons": [
        1,
        5
      ],
      "title": "Market foundations",
      "summary": "Investment-analysis purpose, shares, share prices, exchanges, quote pages, source discipline and the first price-movement chain."
    },
    {
      "unit": 2,
      "lessons": [
        6,
        10
      ],
      "title": "Financial statements",
      "summary": "Revenue first, then direct costs, gross margin, operating margin, cash flow and fair comparison."
    },
    {
      "unit": 3,
      "lessons": [
        11,
        15
      ],
      "title": "Returns and valuation",
      "summary": "Capital gains, dividends, market value, EPS, P/E, valuation risk and the basic risk-return trade-off."
    },
    {
      "unit": 4,
      "lessons": [
        16,
        20
      ],
      "title": "Risk, portfolios and funds",
      "summary": "Company, sector, regulation, currency, ETF/index-fund and concentration risks."
    },
    {
      "unit": 5,
      "lessons": [
        21,
        25
      ],
      "title": "Sector case labs",
      "summary": "Platform, manufacturing, financial, consumer-brand and global comparison cases."
    },
    {
      "unit": 6,
      "lessons": [
        26,
        30
      ],
      "title": "Synthesis case labs",
      "summary": "Recovery, operating leverage, app monetisation, debt risk and final quality-price-risk judgement."
    }
  ],
  "examCheckpoints": [
    {
      "checkpoint": 1,
      "afterLessons": [
        1,
        5
      ],
      "title": "Foundations and market evidence",
      "summary": "Investment-analysis purpose, company/share distinction, share prices, exchanges, quote pages, bid/ask basics and evidence logs."
    },
    {
      "checkpoint": 2,
      "afterLessons": [
        6,
        10
      ],
      "title": "Financial statements",
      "summary": "Revenue, costs, gross margin, cash flow, trends and company comparison using dated evidence."
    },
    {
      "checkpoint": 3,
      "afterLessons": [
        11,
        15
      ],
      "title": "Returns and valuation",
      "summary": "Capital gain, dividends, total return, market capitalisation, EPS, P/E and valuation judgement."
    },
    {
      "checkpoint": 4,
      "afterLessons": [
        16,
        20
      ],
      "title": "Risk, portfolios and funds",
      "summary": "Company risk, sector risk, regulation risk, currency risk, ETF diversification and fund costs."
    },
    {
      "checkpoint": 5,
      "afterLessons": [
        21,
        25
      ],
      "title": "Sector case labs",
      "summary": "Platform, manufacturing, financial-company, consumer-brand and comparable-company judgement."
    },
    {
      "checkpoint": 6,
      "afterLessons": [
        26,
        30
      ],
      "title": "Synthesis case labs",
      "summary": "Recovery verdicts, operating-leverage chains, app monetisation, leverage risk and final quality-price-risk judgement."
    }
  ],
  "lessons": [
    {
      "lesson": 1,
      "company": "Tencent",
      "guidingQuestion": "What is investment analysis, and what is a share?",
      "guidingQuestionZh": "什么是投资分析，什么是股票？",
      "handoutMaterial": "Course-entry concept sorter, Tencent graph observation, company/share distinction prompts, anti-speculation boundary and evidence-before-opinion rule.",
      "formativeAssessment": "Cold-call sort: company, product, share, share price, analysis rule or speculative claim; students justify one choice.",
      "exitTicket": "Write one sentence explaining why investment analysis needs evidence before opinion and is not short-term speculation.",
      "sequenceRole": "Course entry lesson for students with no prior investment study.",
      "retrievalBase": "Everyday experience with companies, products, prices and risk in normal life.",
      "newKnowledge": "Investment analysis, evidence before opinion, company versus share, share price, anti-speculation boundary, risk-return trade-off and a first price-movement question.",
      "evidenceTask": "Use Tencent as a familiar company, inspect a frozen price graph, identify company, listed share and source date, and ask what information might explain one movement.",
      "avoidOverlap": "No percentage-change formula, quote-page mechanics, market capitalisation or valuation judgement yet.",
      "misconception": "Investment analysis means guessing which share to buy, short-term speculation, chasing a tip or treating a famous company as automatically good.",
      "studentOutput": "Course promise sentence, company/share distinction, first share-price definition, evidence-before-opinion rule, anti-speculation boundary, risk-return rule and one evidence question about a price movement.",
      "futureReuse": "Creates the vocabulary, evidence norms and price-movement question used in every later company lesson.",
      "focus": "Focus: what the course studies, why evidence comes before opinion, why this is not short-term stock speculation, how a company is different from one listed share, and how a share-price graph gives an analyst a first question rather than an answer.",
      "terms": [
        {
          "term": "investment analysis",
          "zh": "投资分析",
          "definition": "using evidence to study possible return, risk and price before making a judgement."
        },
        {
          "term": "asset",
          "zh": "资产",
          "definition": "something owned that may have value."
        },
        {
          "term": "share",
          "zh": "股票",
          "definition": "one unit of ownership in a company."
        },
        {
          "term": "share price",
          "zh": "股价",
          "definition": "the market price of one share at a specific time."
        },
        {
          "term": "risk",
          "zh": "风险",
          "definition": "the possibility that results, returns or prices are worse than expected."
        },
        {
          "term": "short-term stock speculation",
          "zh": "投机 / 炒股",
          "definition": "betting mainly on a price movement without enough evidence about value, risk and return; not the course method."
        }
      ],
      "formulaOrNoFormula": "no new formula; students read graph direction and identify old/new price points informally before formal percentage work later.",
      "evidenceSummary": "Tencent as a familiar company, frozen five-year price graph, listed-share identity, source date and one simple company fact that does not by itself prove a good investment.",
      "check": "Separate company, product, share and share price; explain why an analyst needs evidence before opinion; state why this is not short-term speculation; write one question the Tencent graph raises.",
      "unit": 1,
      "unitTitle": "Market foundations",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Tencent company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: investment analysis, asset, share, share price, risk, short-term stock speculation."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Use Tencent as a familiar company, inspect a frozen price graph, identify company, listed share and source date, and ask what information might explain one movement."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Separate company, product, share and share price; explain why an analyst needs evidence before opinion; state why this is not short-term speculation; write one question the Tencent graph raises."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Investment analysis means guessing which share to buy, short-term speculation, chasing a tip or treating a famous company as automatically good."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Course promise sentence, company/share distinction, first share-price definition, evidence-before-opinion rule, anti-speculation boundary, risk-return rule and one evidence question about a price movement."
        }
      ],
      "examPattern": {
        "checkpoint": 1,
        "itemType": "evidence interpretation and judgement paragraph",
        "sourceRequirement": "Use a frozen Tencent extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: What is investment analysis, and what is a share?",
        "mustAssess": "Course promise sentence, company/share distinction, first share-price definition, evidence-before-opinion rule, anti-speculation boundary, risk-return rule and one evidence question about a price movement."
      },
      "cardGenerator": {
        "retrievalBase": "everyday experience with companies, products, prices and risk; no prior investment vocabulary is assumed.",
        "newKnowledge": "investment analysis studies evidence, possible return, risk and price; it is not short-term stock speculation, stock tips or personal buy/sell advice; a share is one ownership unit, the share price is not the whole company, higher possible return usually comes with higher uncertainty, and price movement needs evidence.",
        "avoidOverlap": "do not teach quote-page mechanics, percentage change, market capitalisation or valuation ratios yet.",
        "misconception": "investment analysis means learning how to trade on short-term price jumps, guessing what to buy, chasing tips, or assuming a famous company must be a good investment.",
        "evidenceTask": "use Tencent to identify company, product familiarity, listed share, source date, one graph observation and one question about what information might explain a movement.",
        "studentOutput": "one course promise sentence, one company/share distinction, one share-price definition, one anti-speculation boundary, one risk-return rule, one evidence-before-opinion rule and one evidence question about a price movement."
      }
    },
    {
      "lesson": 2,
      "company": "HKEX",
      "guidingQuestion": "Why do companies need a stock market?",
      "guidingQuestionZh": "公司为什么需要股票市场？",
      "handoutMaterial": "Exchange lookup table, company-code-exchange matching task and a simple trading-friction prompt.",
      "formativeAssessment": "Hinge question: choose the correct role of a stock exchange in one trading scenario.",
      "exitTicket": "Complete one company-code-exchange row and name one trading friction.",
      "sequenceRole": "Market infrastructure bridge between one share and real trading.",
      "retrievalBase": "Lesson 1 investment-analysis purpose, company/share distinction, share price and listed-share identity.",
      "newKnowledge": "Stock exchange, listing, stock code, liquidity and the idea that real trading has frictions.",
      "evidenceTask": "Use HKEX examples to identify company, exchange, code, listing and trading friction.",
      "avoidOverlap": "Keep order types, bid, ask, spread and quote-page interpretation for later use or Lesson 3.",
      "misconception": "Every market purchase gives new money to the company.",
      "studentOutput": "Company-code-exchange match and one sentence explaining why trading through a market is not frictionless.",
      "futureReuse": "Supports quote-page reading, ETF trading context and all source checks.",
      "focus": "Focus: market infrastructure, liquidity and why real buying and selling has friction.",
      "terms": [
        {
          "term": "stock exchange",
          "zh": "证券交易所",
          "definition": "a regulated market where listed securities can be bought and sold."
        },
        {
          "term": "listing",
          "zh": "上市",
          "definition": "permission for a company's shares to trade on an exchange."
        },
        {
          "term": "stock code",
          "zh": "股票代码",
          "definition": "the short market identifier used to find a listed security."
        },
        {
          "term": "liquidity",
          "zh": "流动性",
          "definition": "how easily an asset can be bought or sold without a large price change."
        }
      ],
      "formulaOrNoFormula": "no new formula; students identify company, exchange, code and one trading friction accurately.",
      "evidenceSummary": "HKEX role, exchange website source, example stock codes and listing context.",
      "check": "Match companies to exchange, code and listing information, then name one reason real trading is not frictionless.",
      "unit": 1,
      "unitTitle": "Market foundations",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record HKEX company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: stock exchange, listing, stock code, liquidity."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Use HKEX examples to identify company, exchange, code, listing and trading friction."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Match companies to exchange, code and listing information, then name one reason real trading is not frictionless."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Every market purchase gives new money to the company."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Company-code-exchange match and one sentence explaining why trading through a market is not frictionless."
        }
      ],
      "examPattern": {
        "checkpoint": 1,
        "itemType": "evidence interpretation and judgement paragraph",
        "sourceRequirement": "Use a frozen HKEX extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Why do companies need a stock market?",
        "mustAssess": "Company-code-exchange match and one sentence explaining why trading through a market is not frictionless."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 1 investment-analysis purpose, company/share distinction, share price and listed-share identity.",
        "newKnowledge": "a stock exchange provides a regulated place where listed securities can be bought and sold; liquidity affects whether trading is easy or difficult.",
        "avoidOverlap": "keep order types, bid, ask, spread and quote-page reading for later use or Lesson 3; keep personal investing advice out of the lesson.",
        "misconception": "every stock-market purchase gives new money to the company, or a stock code is just decoration.",
        "evidenceTask": "use HKEX examples to identify company, exchange, stock code, listing and a simple trading friction.",
        "studentOutput": "a company-code-exchange match and one sentence explaining why trading through a market is not frictionless."
      }
    },
    {
      "lesson": 3,
      "company": "Alibaba",
      "guidingQuestion": "What can a stock quote tell us, and what is still missing?",
      "guidingQuestionZh": "股票报价能告诉我们什么，又缺少什么？",
      "handoutMaterial": "Annotated frozen quote page, bid/ask label task, read-only previous-close field, spread calculation box and quote-limit sentence frame.",
      "formativeAssessment": "Live label check: students identify bid, ask, volume and the date of the frozen quote.",
      "exitTicket": "Calculate one bid-ask spread and write what the quote page cannot promise.",
      "sequenceRole": "Market-data reading lesson before ownership and financial evidence deepen.",
      "retrievalBase": "Exchange, listing, code, liquidity and trading friction from Lesson 2.",
      "newKnowledge": "Quote page, volume, bid and ask; previous close and bid-ask spread are source fields used for one calculation, not extra vocabulary to memorise.",
      "evidenceTask": "Label a frozen Alibaba quote table and separate proved facts from missing information.",
      "avoidOverlap": "Do not make the quote page a valuation lesson.",
      "misconception": "A displayed quote guarantees execution at exactly that price.",
      "studentOutput": "Labelled quote extract, spread calculation and quote-limit sentence.",
      "futureReuse": "Reused when students inspect price, source date and market snapshots in later decks.",
      "focus": "Focus: reading quote pages, bid/ask data and why a displayed price is not a promise of instant execution.",
      "terms": [
        {
          "term": "quote page",
          "zh": "报价页面",
          "definition": "a market snapshot showing price and trading information."
        },
        {
          "term": "volume",
          "zh": "成交量",
          "definition": "the number of shares traded during a period."
        },
        {
          "term": "bid",
          "zh": "买价",
          "definition": "the price buyers are currently willing to pay."
        },
        {
          "term": "ask",
          "zh": "卖价",
          "definition": "the price sellers are currently asking for."
        }
      ],
      "formulaOrNoFormula": "bid-ask spread = ask price - bid price; previous close is a read-only field for context.",
      "evidenceSummary": "Alibaba stock quote screenshot or frozen quote table with bid, ask, volume, date and source.",
      "check": "Label what a quote page proves, calculate the spread and explain what it cannot promise.",
      "unit": 1,
      "unitTitle": "Market foundations",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Alibaba company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: quote page, volume, bid, ask."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Label a frozen Alibaba quote table and separate proved facts from missing information."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Label what a quote page proves, calculate the spread and explain what it cannot promise."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "A displayed quote guarantees execution at exactly that price."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Labelled quote extract, spread calculation and quote-limit sentence."
        }
      ],
      "examPattern": {
        "checkpoint": 1,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Alibaba extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: What can a stock quote tell us, and what is still missing?",
        "mustAssess": "Labelled quote extract, spread calculation and quote-limit sentence."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 2 exchange, listing, stock code, liquidity and trading friction.",
        "newKnowledge": "a quote page is a market snapshot; bid, ask and volume answer different questions, while previous close and spread are used as source fields rather than extra vocabulary to memorise.",
        "avoidOverlap": "do not turn this into valuation; do not repeat exchange purpose except as the source of the quote.",
        "misconception": "the displayed price guarantees instant execution at exactly that price.",
        "evidenceTask": "label a frozen Alibaba quote page and separate facts the page proves from facts it cannot prove.",
        "studentOutput": "one labelled quote-page extract, one spread calculation and one sentence explaining the limit of a quote snapshot."
      }
    },
    {
      "lesson": 4,
      "company": "Xiaomi",
      "guidingQuestion": "Does owning shares mean you control the company?",
      "guidingQuestionZh": "持有股票是否意味着控制公司？",
      "handoutMaterial": "Shareholder extract, ownership-percentage calculation grid and small-holder versus large-holder comparison table.",
      "formativeAssessment": "Pair comparison: one-share holder versus major shareholder, then vote on who has more influence.",
      "exitTicket": "Calculate one ownership percentage and explain why ownership size matters.",
      "sequenceRole": "Ownership-size lesson that prevents control misconceptions.",
      "retrievalBase": "One ownership unit from Lesson 1 and listed-share identity from Lesson 2.",
      "newKnowledge": "Voting rights, ordinary shares, control and ownership percentage.",
      "evidenceTask": "Read a Xiaomi shareholder or share-capital extract and identify total shares and shares owned.",
      "avoidOverlap": "Avoid detailed corporate governance and board structures.",
      "misconception": "Owning one share means controlling or owning the whole company.",
      "studentOutput": "Ownership-percentage calculation and small-holder versus large-holder comparison.",
      "futureReuse": "Supports market capitalisation, ETF holdings, control and shareholder-risk lessons.",
      "focus": "Focus: ownership size, voting rights and influence.",
      "terms": [
        {
          "term": "voting rights",
          "zh": "投票权",
          "definition": "shareholder rights to vote on certain company decisions."
        },
        {
          "term": "ordinary share",
          "zh": "普通股",
          "definition": "a standard ownership share in a company."
        },
        {
          "term": "control",
          "zh": "控制权",
          "definition": "the ability to influence or decide company actions."
        }
      ],
      "formulaOrNoFormula": "ownership % = shares owned / total shares x 100.",
      "evidenceSummary": "Xiaomi shareholder or share-capital extract with source and date.",
      "check": "Compare a tiny shareholder with a large holder and explain who has more influence.",
      "unit": 1,
      "unitTitle": "Market foundations",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Xiaomi company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: voting rights, ordinary share, control."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Read a Xiaomi shareholder or share-capital extract and identify total shares and shares owned."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Compare a tiny shareholder with a large holder and explain who has more influence."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Owning one share means controlling or owning the whole company."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Ownership-percentage calculation and small-holder versus large-holder comparison."
        }
      ],
      "examPattern": {
        "checkpoint": 1,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Xiaomi extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Does owning shares mean you control the company?",
        "mustAssess": "Ownership-percentage calculation and small-holder versus large-holder comparison."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 1 ownership-unit meaning and Lesson 2 listing identity.",
        "newKnowledge": "ownership size affects voting influence; ordinary shareholders have ownership claims, but control depends on scale and rights.",
        "avoidOverlap": "avoid detailed corporate governance and board structures; keep the calculation to ownership percentage.",
        "misconception": "owning one share means controlling or owning the whole company.",
        "evidenceTask": "read a Xiaomi shareholder or share-capital extract and identify total shares, shares owned and percentage ownership.",
        "studentOutput": "one ownership-percentage calculation and a comparison between a small shareholder and a large holder."
      }
    },
    {
      "lesson": 5,
      "company": "JD.com",
      "guidingQuestion": "How can one analyst collect evidence before judging a share?",
      "guidingQuestionZh": "分析者如何在判断股票前收集证据？",
      "handoutMaterial": "Evidence-log template, source reliability checklist, information-expectations-price chain and what-the-evidence-cannot-prove prompt.",
      "formativeAssessment": "Source-quality quick check: students flag missing date, URL, figure, limitation or causal link.",
      "exitTicket": "Submit one complete evidence-log row and one information -> expectations -> price sentence.",
      "sequenceRole": "First checkpoint: source discipline and price-movement explanation before financial statements.",
      "retrievalBase": "Lessons 1-4 company identity, price, exchange source and ownership claims.",
      "newKnowledge": "Evidence log, source title, URL, publication date, accessed date, figure, use, limitation and the chain from information to expectations to buying/selling pressure to price movement.",
      "evidenceTask": "Convert JD.com investor-relations material and one dated price or news claim into a clean classroom evidence row.",
      "avoidOverlap": "Do not add new ratios or recommendations.",
      "misconception": "A screenshot or number is enough without source date and limitation, or a price move explains itself without evidence.",
      "studentOutput": "Individual evidence-log row plus one limited price-movement explanation using information, expectations and price.",
      "futureReuse": "Required source habit for every later company deck and exam answer.",
      "focus": "Focus: source discipline, individual analyst habits and first price-movement explanation.",
      "terms": [
        {
          "term": "evidence log",
          "zh": "证据记录",
          "definition": "a structured record of sources, dates, figures and notes."
        },
        {
          "term": "source date",
          "zh": "来源日期",
          "definition": "the date when evidence was published."
        },
        {
          "term": "accessed date",
          "zh": "访问日期",
          "definition": "the date when you used the evidence."
        }
      ],
      "formulaOrNoFormula": "no new formula; students use the chain information -> expectations -> buying/selling pressure -> price movement.",
      "evidenceSummary": "JD.com annual results, investor-relations page, one dated price or news claim and a frozen classroom evidence log.",
      "check": "You complete one individual evidence log row and one limited price-movement explanation without making a recommendation.",
      "unit": 1,
      "unitTitle": "Market foundations",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record JD.com company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: evidence log, source date, accessed date."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Convert JD.com investor-relations material and one dated price or news claim into a clean classroom evidence row."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "You complete one individual evidence log row and one limited price-movement explanation without making a recommendation."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "A screenshot or number is enough without source date and limitation, or a price move explains itself without evidence."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Individual evidence-log row plus one limited price-movement explanation using information, expectations and price."
        }
      ],
      "examPattern": {
        "checkpoint": 1,
        "itemType": "evidence interpretation and judgement paragraph",
        "sourceRequirement": "Use a frozen JD.com extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: How can one analyst collect evidence before judging a share?",
        "mustAssess": "Individual evidence-log row plus one limited price-movement explanation using information, expectations and price."
      },
      "cardGenerator": {
        "retrievalBase": "Lessons 1-4 company identity, price meaning, exchange source and ownership claims.",
        "newKnowledge": "evidence must be recorded with source title, source URL, publication date, accessed date, figure, use and limitation; price movement should be explained through information, expectations, buying/selling pressure and price.",
        "avoidOverlap": "do not add new financial ratios; this is the first checkpoint for source discipline.",
        "misconception": "a screenshot, number or company claim is reliable enough without date, source and limitation, or a price movement explains itself.",
        "evidenceTask": "turn JD.com investor-relations evidence and one dated price or news claim into a clean log row.",
        "studentOutput": "one individual evidence-log row and one limited price-movement explanation using information, expectations and price."
      }
    },
    {
      "lesson": 6,
      "company": "Meituan",
      "guidingQuestion": "Does high revenue mean a company is strong?",
      "guidingQuestionZh": "高收入是否意味着公司很强？",
      "handoutMaterial": "Revenue table or segment extract, growth calculation box and revenue-is-not-profit explanation prompt.",
      "formativeAssessment": "Hinge question: choose whether a figure proves sales, profit, cash or valuation.",
      "exitTicket": "Calculate revenue growth and write why revenue alone does not prove profit.",
      "sequenceRole": "Start of financial-statement block: scale before profit.",
      "retrievalBase": "Evidence logging and the rule that evidence is not yet judgement.",
      "newKnowledge": "Revenue, sales growth and business model.",
      "evidenceTask": "Read Meituan revenue by year or segment and calculate growth from the old base.",
      "avoidOverlap": "Do not teach gross margin or cash flow yet.",
      "misconception": "High revenue automatically means strong or profitable.",
      "studentOutput": "Revenue-growth calculation and limitation sentence.",
      "futureReuse": "Feeds cost, margin, comparison, brand and platform lessons.",
      "focus": "Focus: revenue, growth and business model.",
      "terms": [
        {
          "term": "revenue",
          "zh": "收入",
          "definition": "income earned from selling goods or services before costs are deducted."
        },
        {
          "term": "sales growth",
          "zh": "销售增长",
          "definition": "the increase in revenue over time."
        },
        {
          "term": "business model",
          "zh": "商业模式",
          "definition": "how a company earns revenue and delivers value."
        }
      ],
      "formulaOrNoFormula": "revenue growth = (new revenue - old revenue) / old revenue x 100.",
      "evidenceSummary": "Meituan revenue by year or segment, with source and date.",
      "check": "Explain why high revenue alone does not prove high profit.",
      "unit": 2,
      "unitTitle": "Financial statements",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Meituan company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: revenue, sales growth, business model."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Read Meituan revenue by year or segment and calculate growth from the old base."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Explain why high revenue alone does not prove high profit."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "High revenue automatically means strong or profitable."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Revenue-growth calculation and limitation sentence."
        }
      ],
      "examPattern": {
        "checkpoint": 2,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Meituan extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Does high revenue mean a company is strong?",
        "mustAssess": "Revenue-growth calculation and limitation sentence."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 5 evidence logging and Lesson 1 rule that evidence is not yet investment judgement.",
        "newKnowledge": "revenue measures sales before costs; revenue growth must be linked to business model and later cost/profit evidence.",
        "avoidOverlap": "do not teach gross margin or cash flow yet; mention costs only as the missing next step.",
        "misconception": "high revenue automatically means a strong or profitable company.",
        "evidenceTask": "read Meituan revenue by year or segment and calculate revenue growth with the old figure as the base.",
        "studentOutput": "one revenue-growth calculation and one limitation sentence: revenue shows scale, not profit."
      }
    },
    {
      "lesson": 7,
      "company": "BYD",
      "guidingQuestion": "Can sales rise while costs become a problem?",
      "guidingQuestionZh": "销售增长时，成本会不会成为问题？",
      "handoutMaterial": "Financial extract table, gross-profit calculation steps, gross-margin calculation grid and margin interpretation line.",
      "formativeAssessment": "Worked-example check: students choose the correct numerator and denominator for gross margin.",
      "exitTicket": "Complete one gross-margin calculation and explain what the margin shows.",
      "sequenceRole": "Cost layer after revenue.",
      "retrievalBase": "Revenue and missing-cost question from Lesson 6.",
      "newKnowledge": "Cost of sales, gross profit and gross margin.",
      "evidenceTask": "Use BYD revenue and cost-of-sales figures to calculate gross profit and margin.",
      "avoidOverlap": "Do not introduce operating profit, net profit or free cash flow.",
      "misconception": "Sales growth always means the business is becoming stronger.",
      "studentOutput": "Gross-profit and gross-margin calculation with a margin interpretation.",
      "futureReuse": "Reused in Lessons 8, 10, 15, 22, 24 and 30.",
      "focus": "Focus: direct costs, gross profit and gross margin.",
      "terms": [
        {
          "term": "cost of sales",
          "zh": "销售成本",
          "definition": "direct costs linked to producing or delivering goods and services."
        },
        {
          "term": "gross profit",
          "zh": "毛利",
          "definition": "revenue left after direct costs are deducted."
        },
        {
          "term": "gross margin",
          "zh": "毛利率",
          "definition": "gross profit as a percentage of revenue."
        }
      ],
      "formulaOrNoFormula": "gross profit = revenue - cost of sales; gross margin = gross profit / revenue x 100.",
      "evidenceSummary": "BYD revenue and cost figures from annual or interim results.",
      "check": "Calculate gross profit and explain why margin matters.",
      "unit": 2,
      "unitTitle": "Financial statements",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record BYD company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: cost of sales, gross profit, gross margin."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Use BYD revenue and cost-of-sales figures to calculate gross profit and margin."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Calculate gross profit and explain why margin matters."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Sales growth always means the business is becoming stronger."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Gross-profit and gross-margin calculation with a margin interpretation."
        }
      ],
      "examPattern": {
        "checkpoint": 2,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen BYD extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Can sales rise while costs become a problem?",
        "mustAssess": "Gross-profit and gross-margin calculation with a margin interpretation."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 6 revenue and the question of what revenue misses.",
        "newKnowledge": "direct costs reduce revenue into gross profit; gross margin shows how much of each sales unit remains after direct costs.",
        "avoidOverlap": "do not introduce operating profit, net profit or free cash flow; those come later.",
        "misconception": "rising sales always mean the company is becoming stronger.",
        "evidenceTask": "use BYD revenue and cost-of-sales figures to calculate gross profit and gross margin.",
        "studentOutput": "one completed margin calculation and one explanation of why a margin can matter more than raw sales."
      }
    },
    {
      "lesson": 8,
      "company": "CATL",
      "guidingQuestion": "Which company turns sales into profit more efficiently?",
      "guidingQuestionZh": "哪家公司更有效地把销售转化为利润？",
      "handoutMaterial": "Aligned comparison table, operating-margin difference calculation and one-sentence comparison scaffold.",
      "formativeAssessment": "Mini-whiteboard comparison: students identify whether a difference is percentage points or percent.",
      "exitTicket": "Write one fair margin comparison using aligned data.",
      "sequenceRole": "Operating-margin comparison after gross-margin foundations.",
      "retrievalBase": "Gross margin from Lesson 7.",
      "newKnowledge": "Operating profit, operating margin and percentage-point difference; students distinguish gross margin from operating margin before comparing companies.",
      "evidenceTask": "Compare CATL margin data with one aligned company, period or benchmark.",
      "avoidOverlap": "Do not reteach revenue growth except as contrast to efficiency; do not treat all margins as the same metric.",
      "misconception": "The higher-revenue company is automatically more efficient.",
      "studentOutput": "Fair comparison sentence naming metric, direction and percentage-point difference.",
      "futureReuse": "Becomes the comparison pattern for Lessons 10, 24, 25 and 30.",
      "focus": "Focus: margin comparison and efficiency.",
      "terms": [
        {
          "term": "operating profit",
          "zh": "营业利润",
          "definition": "profit from the company's main operations before some finance and tax items."
        },
        {
          "term": "operating margin",
          "zh": "营业利润率",
          "definition": "operating profit as a percentage of revenue."
        },
        {
          "term": "percentage-point difference",
          "zh": "百分点差异",
          "definition": "subtraction between two percentages."
        }
      ],
      "formulaOrNoFormula": "margin difference = margin A - margin B, measured in percentage points.",
      "evidenceSummary": "CATL margin data and one comparison point from the same source type.",
      "check": "You state which business is more efficient and support it with a margin figure.",
      "unit": 2,
      "unitTitle": "Financial statements",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record CATL company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: operating profit, operating margin, percentage-point difference."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Compare CATL margin data with one aligned company, period or benchmark."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "You state which business is more efficient and support it with a margin figure."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "The higher-revenue company is automatically more efficient."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Fair comparison sentence naming metric, direction and percentage-point difference."
        }
      ],
      "examPattern": {
        "checkpoint": 2,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen CATL extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Which company turns sales into profit more efficiently?",
        "mustAssess": "Fair comparison sentence naming metric, direction and percentage-point difference."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 7 gross profit and gross margin.",
        "newKnowledge": "comparison requires the same metric, period and source type; students distinguish gross margin from operating margin before using percentage-point differences.",
        "avoidOverlap": "do not reteach revenue growth except as a contrast to efficiency; do not treat all margins as the same metric; keep cash-flow comparison for Lesson 9.",
        "misconception": "the company with higher revenue is automatically more efficient.",
        "evidenceTask": "compare CATL margin data with one aligned company, year or benchmark.",
        "studentOutput": "one fair comparison sentence naming the metric, direction and percentage-point difference."
      }
    },
    {
      "lesson": 9,
      "company": "Tesla",
      "guidingQuestion": "Why can a growing company still need cash?",
      "guidingQuestionZh": "为什么成长中的公司仍然可能需要现金？",
      "handoutMaterial": "Cash-flow extract, free-cash-flow calculation desk and profit-versus-cash explanation prompt.",
      "formativeAssessment": "Card sort: profit signal, cash-flow signal or investment-spending signal.",
      "exitTicket": "Calculate free cash flow and explain why profit and cash can differ.",
      "sequenceRole": "Cash-flow correction after profit and margin.",
      "retrievalBase": "Revenue, profit and margin evidence from Lessons 6-8.",
      "newKnowledge": "Operating cash flow, capital expenditure and free cash flow; profit and cash answer different questions.",
      "evidenceTask": "Read Tesla operating cash flow and capital expenditure from a filed extract.",
      "avoidOverlap": "Do not teach a full cash-flow statement or working-capital detail.",
      "misconception": "Profit means the company has plenty of available cash.",
      "studentOutput": "Free-cash-flow calculation and profit-versus-cash explanation.",
      "futureReuse": "Supports later debt, recovery and quality-company analysis.",
      "focus": "Focus: cash flow, profit and investment needs.",
      "terms": [
        {
          "term": "operating cash flow",
          "zh": "经营现金流",
          "definition": "cash generated by the company's main business operations."
        },
        {
          "term": "capital expenditure",
          "zh": "资本支出",
          "definition": "cash spent on long-term assets such as factories, equipment or infrastructure."
        },
        {
          "term": "free cash flow",
          "zh": "自由现金流",
          "definition": "operating cash flow left after capital expenditure."
        }
      ],
      "formulaOrNoFormula": "free cash flow = operating cash flow - capital expenditure.",
      "evidenceSummary": "Tesla cash-flow extract and capital expenditure figure from a filed report.",
      "check": "Explain why profit and cash flow can send different signals.",
      "unit": 2,
      "unitTitle": "Financial statements",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Tesla company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: operating cash flow, capital expenditure, free cash flow."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Read Tesla operating cash flow and capital expenditure from a filed extract."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Explain why profit and cash flow can send different signals."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Profit means the company has plenty of available cash."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Free-cash-flow calculation and profit-versus-cash explanation."
        }
      ],
      "examPattern": {
        "checkpoint": 2,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Tesla extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Why can a growing company still need cash?",
        "mustAssess": "Free-cash-flow calculation and profit-versus-cash explanation."
      },
      "cardGenerator": {
        "retrievalBase": "Lessons 6-8 revenue, profit and margin evidence.",
        "newKnowledge": "operating cash flow and profit answer different questions; capital expenditure can make a growing company need cash.",
        "avoidOverlap": "do not teach a full cash-flow statement or working-capital detail; keep the lesson to operating cash flow, capital expenditure and free cash flow.",
        "misconception": "a profitable company must have plenty of cash available.",
        "evidenceTask": "read Tesla operating cash flow and capital expenditure from a filed extract.",
        "studentOutput": "one free-cash-flow calculation and one sentence explaining why profit and cash can disagree."
      }
    },
    {
      "lesson": 10,
      "company": "TSMC",
      "guidingQuestion": "What makes one strong company look stronger than another?",
      "guidingQuestionZh": "什么让一家强公司看起来比另一家更强？",
      "handoutMaterial": "Side-by-side comparison matrix, same-metric checklist and balanced paragraph planner.",
      "formativeAssessment": "Comparison audit: students mark whether two figures use the same metric, period and source type.",
      "exitTicket": "Write one balanced comparison sentence using a figure from each company.",
      "sequenceRole": "Unit 2 consolidation and first multi-metric comparison checkpoint.",
      "retrievalBase": "Revenue, costs, margins, cash flow and evidence discipline.",
      "newKnowledge": "Benchmark, trend, scale and side-by-side comparison language.",
      "evidenceTask": "Build a TSMC comparison table using the same metric categories for both sides.",
      "avoidOverlap": "No new formula; keep it as consolidation and exam preparation.",
      "misconception": "One impressive metric proves which company is stronger.",
      "studentOutput": "Scale-trend-margin-cash comparison paragraph using at least one figure from each company.",
      "futureReuse": "Reusable structure for comparable-company and case-lab lessons.",
      "focus": "Focus: side-by-side comparison across scale, trend and margin.",
      "terms": [
        {
          "term": "benchmark",
          "zh": "基准",
          "definition": "a standard or comparison point used to judge performance."
        },
        {
          "term": "trend",
          "zh": "趋势",
          "definition": "movement in a figure over time."
        },
        {
          "term": "scale",
          "zh": "规模",
          "definition": "the size of a company or activity."
        }
      ],
      "formulaOrNoFormula": "compare growth, margin and scale side by side; no single new formula.",
      "evidenceSummary": "TSMC revenue, margin and trend figures with one relevant benchmark.",
      "check": "Write one scale-trend-margin-cash comparison sentence using a figure from each company.",
      "unit": 2,
      "unitTitle": "Financial statements",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record TSMC company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: benchmark, trend, scale."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Build a TSMC comparison table using the same metric categories for both sides."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Write one scale-trend-margin-cash comparison sentence using a figure from each company."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "One impressive metric proves which company is stronger."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Scale-trend-margin-cash comparison paragraph using at least one figure from each company."
        }
      ],
      "examPattern": {
        "checkpoint": 2,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen TSMC extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: What makes one strong company look stronger than another?",
        "mustAssess": "Scale-trend-margin-cash comparison paragraph using at least one figure from each company."
      },
      "cardGenerator": {
        "retrievalBase": "Unit 2 revenue, costs, margin, cash flow and evidence discipline.",
        "newKnowledge": "strong company comparison needs scale, trend and margin side by side rather than one isolated figure.",
        "avoidOverlap": "do not introduce new formulas; this is a consolidation and exam-preparation lesson.",
        "misconception": "one impressive number proves which company is stronger.",
        "evidenceTask": "build a TSMC comparison table using the same metric categories for both sides.",
        "studentOutput": "one scale-trend-margin-cash comparison paragraph that uses at least one figure from each company."
      }
    },
    {
      "lesson": 11,
      "company": "Apple",
      "guidingQuestion": "How does a share make or lose money for an investor?",
      "guidingQuestionZh": "股票如何让投资者赚钱或亏钱？",
      "handoutMaterial": "Buy/sell price scenarios, gain/loss calculation table and return-percentage worked-example space.",
      "formativeAssessment": "Hinge calculation: identify purchase price, sale price, gain/loss and denominator.",
      "exitTicket": "Calculate one return percentage and state whether it is a gain or loss.",
      "sequenceRole": "Start of returns and valuation block: investor outcome from price movement.",
      "retrievalBase": "Lesson 1 first price-graph reading, then formal old-price denominator discipline introduced here.",
      "newKnowledge": "Capital gain, capital loss and return percentage.",
      "evidenceTask": "Use an Apple frozen buy/sell price example with dates.",
      "avoidOverlap": "Keep dividends for Lesson 12 and valuation for Lessons 14-15.",
      "misconception": "A larger money gain is always the better return, or higher risk guarantees higher return.",
      "studentOutput": "Gain, loss and return-percentage calculations.",
      "futureReuse": "Basis for dividends, total return, valuation and the risk-return trade-off: higher possible return usually comes with higher uncertainty, but risk does not guarantee return.",
      "focus": "Focus: capital gains, losses, percentage return and the first explicit risk-return trade-off.",
      "terms": [
        {
          "term": "capital gain",
          "zh": "资本利得",
          "definition": "profit from selling a share above the purchase price."
        },
        {
          "term": "capital loss",
          "zh": "资本损失",
          "definition": "loss from selling a share below the purchase price."
        },
        {
          "term": "return",
          "zh": "回报",
          "definition": "gain or loss compared with the original amount invested."
        }
      ],
      "formulaOrNoFormula": "gain = sale price - purchase price; return % = gain / purchase price x 100.",
      "evidenceSummary": "Apple frozen share-price example with dates, not live trading data.",
      "check": "Calculate a gain, a loss and the percentage return.",
      "unit": 3,
      "unitTitle": "Returns and valuation",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Apple company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: capital gain, capital loss, return."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Use an Apple frozen buy/sell price example with dates."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Calculate a gain, a loss and the percentage return."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "A larger money gain is always the better return, or higher risk guarantees higher return."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Gain, loss and return-percentage calculations."
        }
      ],
      "examPattern": {
        "checkpoint": 3,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Apple extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: How does a share make or lose money for an investor?",
        "mustAssess": "Gain, loss and return-percentage calculations."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 1 first price-graph reading; this lesson introduces formal old-price denominator discipline.",
        "newKnowledge": "investors can make capital gains or losses; return percentage compares the gain or loss with the original amount invested; higher possible return usually comes with higher uncertainty, but higher risk does not guarantee higher return.",
        "avoidOverlap": "keep dividends for Lesson 12 and valuation for Lessons 14-15.",
        "misconception": "a larger money gain is always the better return without considering the amount invested, or high risk automatically produces high return.",
        "evidenceTask": "use an Apple frozen buy/sell price example with dates.",
        "studentOutput": "one gain calculation, one loss calculation, one return-percentage explanation and one risk-return trade-off sentence."
      }
    },
    {
      "lesson": 12,
      "company": "HSBC",
      "guidingQuestion": "Why might an investor like dividends?",
      "guidingQuestionZh": "投资者为什么可能喜欢股息？",
      "handoutMaterial": "Dividend announcement extract, dividend-yield calculator and two-investor comparison prompt.",
      "formativeAssessment": "Two-investor check: students decide who has the higher dividend yield and why.",
      "exitTicket": "Calculate one dividend yield and explain why price paid changes the yield.",
      "sequenceRole": "Income-return layer after capital gain.",
      "retrievalBase": "Return from price movement in Lesson 11.",
      "newKnowledge": "Dividend, dividend yield and total return.",
      "evidenceTask": "Read HSBC dividend announcement or annual-report extract and connect dividend to price paid.",
      "avoidOverlap": "Avoid dividend policy, taxation and advanced income strategies.",
      "misconception": "A higher dividend is always better for every investor.",
      "studentOutput": "Dividend-yield calculation and two-investor comparison.",
      "futureReuse": "Reused in total-return, bank and final judgement work.",
      "focus": "Focus: income return and total return.",
      "terms": [
        {
          "term": "dividend",
          "zh": "股息",
          "definition": "profit paid by a company to shareholders."
        },
        {
          "term": "dividend yield",
          "zh": "股息收益率",
          "definition": "annual dividend compared with the share price."
        },
        {
          "term": "total return",
          "zh": "总回报",
          "definition": "return from price change plus dividends."
        }
      ],
      "formulaOrNoFormula": "dividend yield = annual dividend / share price x 100; total return = capital gain + dividends.",
      "evidenceSummary": "HSBC dividend announcement or annual report extract with date.",
      "check": "Explain why two investors may value the same dividend differently.",
      "unit": 3,
      "unitTitle": "Returns and valuation",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record HSBC company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: dividend, dividend yield, total return."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Read HSBC dividend announcement or annual-report extract and connect dividend to price paid."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Explain why two investors may value the same dividend differently."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "A higher dividend is always better for every investor."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Dividend-yield calculation and two-investor comparison."
        }
      ],
      "examPattern": {
        "checkpoint": 3,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen HSBC extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Why might an investor like dividends?",
        "mustAssess": "Dividend-yield calculation and two-investor comparison."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 11 return from price movement.",
        "newKnowledge": "dividends add an income return; total return combines price change and dividends, while yield depends on the price paid.",
        "avoidOverlap": "do not teach dividend policy, taxation or advanced income strategies.",
        "misconception": "a higher dividend is automatically better for every investor.",
        "evidenceTask": "read an HSBC dividend announcement or annual-report extract and connect dividend to share price.",
        "studentOutput": "one dividend-yield calculation and one comparison of two investors paying different prices."
      }
    },
    {
      "lesson": 13,
      "company": "Nvidia",
      "guidingQuestion": "How can one company be worth so much?",
      "guidingQuestionZh": "为什么一家公司会有如此高的市值？",
      "handoutMaterial": "Share-price and shares-outstanding fact box, market-cap calculation grid and limitation sentence.",
      "formativeAssessment": "Misconception check: compare two companies with different share prices and share counts.",
      "exitTicket": "Calculate simplified market capitalisation and state one limitation.",
      "sequenceRole": "Total company value correction after one-share price.",
      "retrievalBase": "One-share price from Lesson 1 and total shares from Lesson 4.",
      "newKnowledge": "Market capitalisation, shares outstanding and mega-cap scale.",
      "evidenceTask": "Use Nvidia share price and shares outstanding from one frozen source.",
      "avoidOverlap": "Keep EPS and P/E for Lesson 14; market cap alone is not valuation.",
      "misconception": "Higher share price means a bigger company.",
      "studentOutput": "Simplified market-cap calculation and limitation sentence.",
      "futureReuse": "Supports P/E, valuation and company-scale comparison.",
      "focus": "Focus: market capitalisation and company scale.",
      "terms": [
        {
          "term": "market capitalisation",
          "zh": "市值",
          "definition": "total market value of a company's equity."
        },
        {
          "term": "shares outstanding",
          "zh": "已发行股数",
          "definition": "shares issued and held by investors."
        },
        {
          "term": "mega-cap",
          "zh": "超大市值公司",
          "definition": "a very large listed company by market value."
        }
      ],
      "formulaOrNoFormula": "market capitalisation = share price x shares outstanding.",
      "evidenceSummary": "Nvidia share price and shares outstanding from a frozen source.",
      "check": "Calculate a simplified market cap and explain what it does not prove.",
      "unit": 3,
      "unitTitle": "Returns and valuation",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Nvidia company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: market capitalisation, shares outstanding, mega-cap."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Use Nvidia share price and shares outstanding from one frozen source."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Calculate a simplified market cap and explain what it does not prove."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Higher share price means a bigger company."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Simplified market-cap calculation and limitation sentence."
        }
      ],
      "examPattern": {
        "checkpoint": 3,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Nvidia extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: How can one company be worth so much?",
        "mustAssess": "Simplified market-cap calculation and limitation sentence."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 1 one-share price and Lesson 4 total shares and ownership percentage.",
        "newKnowledge": "market capitalisation estimates total equity market value by combining price per share with shares outstanding.",
        "avoidOverlap": "keep EPS and P/E for Lesson 14; do not use market cap alone as valuation judgement.",
        "misconception": "the company with the higher share price must be worth more in total.",
        "evidenceTask": "use Nvidia share price and shares outstanding from one frozen source.",
        "studentOutput": "one simplified market-cap calculation and one limitation sentence about what market cap does not prove."
      }
    },
    {
      "lesson": 14,
      "company": "Microsoft",
      "guidingQuestion": "When do investors pay a high price for profit?",
      "guidingQuestionZh": "投资者什么时候愿意为利润支付高价？",
      "handoutMaterial": "EPS/P/E formula desk, frozen price and earnings facts, and optimism-versus-risk interpretation options.",
      "formativeAssessment": "Interpretation check: students classify high P/E as optimism, risk or both depending on evidence.",
      "exitTicket": "Write one P/E interpretation with both possible meanings.",
      "sequenceRole": "First valuation-ratio lesson.",
      "retrievalBase": "Market cap, share count and profit evidence from earlier lessons.",
      "newKnowledge": "EPS, P/E ratio, valuation and expectations.",
      "evidenceTask": "Calculate or read Microsoft EPS and P/E from a frozen source.",
      "avoidOverlap": "Do not present P/E as a mechanical buy/sell rule.",
      "misconception": "High P/E is simply good, or simply bad.",
      "studentOutput": "P/E interpretation giving both optimism and risk as possible meanings.",
      "futureReuse": "Central tool for Lessons 15, 21, 22 and 30.",
      "focus": "Focus: EPS, P/E and expectations.",
      "terms": [
        {
          "term": "EPS",
          "zh": "每股收益",
          "definition": "earnings per share, or net profit divided by shares."
        },
        {
          "term": "P/E ratio",
          "zh": "市盈率",
          "definition": "share price compared with earnings per share."
        },
        {
          "term": "valuation",
          "zh": "估值",
          "definition": "judgement of price compared with evidence and expectations."
        }
      ],
      "formulaOrNoFormula": "EPS = net profit / shares; P/E = share price / EPS.",
      "evidenceSummary": "Microsoft EPS and price example, frozen with source and date.",
      "check": "Explain why a high P/E may show optimism, risk or both.",
      "unit": 3,
      "unitTitle": "Returns and valuation",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Microsoft company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: EPS, P/E ratio, valuation."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Calculate or read Microsoft EPS and P/E from a frozen source."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Explain why a high P/E may show optimism, risk or both."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "High P/E is simply good, or simply bad."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "P/E interpretation giving both optimism and risk as possible meanings."
        }
      ],
      "examPattern": {
        "checkpoint": 3,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Microsoft extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: When do investors pay a high price for profit?",
        "mustAssess": "P/E interpretation giving both optimism and risk as possible meanings."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 13 share count and company value, plus Unit 2 profit evidence.",
        "newKnowledge": "EPS connects company profit to one share; P/E compares the price investors pay with earnings per share.",
        "avoidOverlap": "do not present P/E as a mechanical buy/sell rule; save full synthesis for Lesson 15.",
        "misconception": "a high P/E is simply good because investors are optimistic, or simply bad because the share is expensive.",
        "evidenceTask": "calculate or read Microsoft EPS and P/E from a frozen source and source date.",
        "studentOutput": "one P/E interpretation that gives both optimism and risk as possible meanings."
      }
    },
    {
      "lesson": 15,
      "company": "Toyota",
      "guidingQuestion": "Can a good company still be too expensive?",
      "guidingQuestionZh": "好公司也可能太贵吗？",
      "handoutMaterial": "Valuation evidence board, quality-price-risk sorter and two-point answer planner.",
      "formativeAssessment": "Evidence sorter: quality evidence, price evidence, risk evidence or unsupported claim.",
      "exitTicket": "Write a two-point answer explaining why quality and price must be judged together.",
      "sequenceRole": "Unit 3 valuation synthesis checkpoint.",
      "retrievalBase": "Return, dividend, market cap, EPS and P/E from Lessons 11-14.",
      "newKnowledge": "Quality-versus-price judgement, expectations and margin of safety.",
      "evidenceTask": "Read Toyota growth, profitability and P/E evidence and classify what each can prove.",
      "avoidOverlap": "No new calculation; make writing and judgement the main work.",
      "misconception": "A good company is a good investment at any price.",
      "studentOutput": "Two-point valuation answer linking quality, possible return, price paid and risk.",
      "futureReuse": "Becomes the judgement frame for all remaining company cases.",
      "focus": "Focus: valuation checkpoint using several pieces of evidence.",
      "terms": [
        {
          "term": "cheap or expensive",
          "zh": "便宜或昂贵",
          "definition": "valuation judgement, not just a low or high share price."
        },
        {
          "term": "expectations",
          "zh": "预期",
          "definition": "assumptions about future performance already reflected in price."
        },
        {
          "term": "margin of safety",
          "zh": "安全边际",
          "definition": "room for error between price and estimated value."
        }
      ],
      "formulaOrNoFormula": "compare P/E, growth and risk evidence; no new calculation.",
      "evidenceSummary": "Toyota growth, P/E or profitability snapshot with a valuation prompt.",
      "check": "Write a two-point answer explaining why quality and price must be judged together.",
      "unit": 3,
      "unitTitle": "Returns and valuation",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Toyota company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: cheap or expensive, expectations, margin of safety."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Read Toyota growth, profitability and P/E evidence and classify what each can prove."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Write a two-point answer explaining why quality and price must be judged together."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "A good company is a good investment at any price."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Two-point valuation answer linking quality, possible return, price paid and risk."
        }
      ],
      "examPattern": {
        "checkpoint": 3,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Toyota extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Can a good company still be too expensive?",
        "mustAssess": "Two-point valuation answer linking quality, possible return, price paid and risk."
      },
      "cardGenerator": {
        "retrievalBase": "Lessons 11-14 return, dividend, market capitalisation, EPS and P/E.",
        "newKnowledge": "valuation judgement combines quality, growth, possible return, price, expectations and risk; margin of safety is room for error.",
        "avoidOverlap": "do not add another formula; make this the Unit 3 checkpoint and writing lesson.",
        "misconception": "a good company is automatically a good investment at any price.",
        "evidenceTask": "read Toyota growth, profitability and P/E evidence, then decide what each piece can and cannot prove.",
        "studentOutput": "a two-point valuation answer linking quality, possible return, price paid and risk."
      }
    },
    {
      "lesson": 16,
      "company": "Starbucks",
      "guidingQuestion": "What could hurt one familiar company?",
      "guidingQuestionZh": "一家熟悉的公司可能受到什么伤害？",
      "handoutMaterial": "Risk register, company evidence extract and risk -> future profit -> price chain frame.",
      "formativeAssessment": "Risk-chain check: students complete the missing middle link between risk and price.",
      "exitTicket": "Name one company-specific risk and link it to future revenue or profit.",
      "sequenceRole": "Start of risk block: one-company risk.",
      "retrievalBase": "Lesson 15 rule that price must be judged with risk.",
      "newKnowledge": "Company-specific risk, demand risk and execution risk.",
      "evidenceTask": "Use Starbucks store, demand or margin evidence to identify one company-specific risk.",
      "avoidOverlap": "Do not cover sector, regulation, currency or fund risk yet.",
      "misconception": "A familiar brand is automatically safe.",
      "studentOutput": "Risk -> future revenue/profit -> price effect chain.",
      "futureReuse": "Risk-chain structure reused in Lessons 17-20 and case labs.",
      "focus": "Focus: company-specific risk.",
      "terms": [
        {
          "term": "company-specific risk",
          "zh": "公司特定风险",
          "definition": "risk caused by one company's decisions or situation."
        },
        {
          "term": "demand risk",
          "zh": "需求风险",
          "definition": "the risk that customers buy less than expected."
        },
        {
          "term": "execution risk",
          "zh": "执行风险",
          "definition": "the risk that a strategy is not carried out successfully."
        }
      ],
      "formulaOrNoFormula": "no new formula; build a risk-evidence-effect chain.",
      "evidenceSummary": "Starbucks store, demand or margin evidence from a recent report.",
      "check": "Name one risk and link it to future revenue or profit.",
      "unit": 4,
      "unitTitle": "Risk, portfolios and funds",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Starbucks company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: company-specific risk, demand risk, execution risk."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Use Starbucks store, demand or margin evidence to identify one company-specific risk."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Name one risk and link it to future revenue or profit."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "A familiar brand is automatically safe."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Risk -> future revenue/profit -> price effect chain."
        }
      ],
      "examPattern": {
        "checkpoint": 4,
        "itemType": "evidence interpretation and judgement paragraph",
        "sourceRequirement": "Use a frozen Starbucks extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: What could hurt one familiar company?",
        "mustAssess": "Risk -> future revenue/profit -> price effect chain."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 15 valuation rule that price must be judged with risk.",
        "newKnowledge": "company-specific risk comes from one company's situation, choices, demand conditions or execution.",
        "avoidOverlap": "do not cover sector, regulation, currency or ETF risk yet; this lesson is one-company risk only.",
        "misconception": "a familiar brand is automatically safe.",
        "evidenceTask": "use Starbucks store, demand or margin evidence to identify one company-specific risk.",
        "studentOutput": "one risk-evidence-effect chain: risk -> future revenue or profit -> possible price effect."
      }
    },
    {
      "lesson": 17,
      "company": "Li Ning",
      "guidingQuestion": "How can changing tastes affect a sportswear company?",
      "guidingQuestionZh": "消费者偏好变化如何影响运动服装公司？",
      "handoutMaterial": "Sector trend snapshot, competitor comparison notes and trend impact sorter.",
      "formativeAssessment": "Trend impact sort: same trend helps, hurts or has unclear effect on different companies.",
      "exitTicket": "Explain how one consumer trend could help one company and hurt another.",
      "sequenceRole": "External competitive-risk layer.",
      "retrievalBase": "Company-risk chain and revenue/margin evidence.",
      "newKnowledge": "Sector, competition, consumer trend and optional market share.",
      "evidenceTask": "Compare Li Ning sales trend with competitor or sector evidence.",
      "avoidOverlap": "Do not repeat company-specific risk; make the cause external.",
      "misconception": "A growing sector helps every company equally.",
      "studentOutput": "Explanation of how the same trend can help one company and hurt another.",
      "futureReuse": "Supports brand, comparable-company and sector case labs.",
      "focus": "Focus: sector risk and competition.",
      "terms": [
        {
          "term": "sector",
          "zh": "行业",
          "definition": "a group of companies selling similar goods or services."
        },
        {
          "term": "competition",
          "zh": "竞争",
          "definition": "rivalry between firms for customers and profit."
        },
        {
          "term": "consumer trend",
          "zh": "消费趋势",
          "definition": "a change in what customers prefer to buy."
        }
      ],
      "formulaOrNoFormula": "market share = company sales / sector sales x 100, if suitable data is available.",
      "evidenceSummary": "Li Ning sales trend, competitor context or sector data with source and date.",
      "check": "Explain how a trend can help one company and hurt another.",
      "unit": 4,
      "unitTitle": "Risk, portfolios and funds",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Li Ning company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: sector, competition, consumer trend."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Compare Li Ning sales trend with competitor or sector evidence."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Explain how a trend can help one company and hurt another."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "A growing sector helps every company equally."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Explanation of how the same trend can help one company and hurt another."
        }
      ],
      "examPattern": {
        "checkpoint": 4,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Li Ning extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: How can changing tastes affect a sportswear company?",
        "mustAssess": "Explanation of how the same trend can help one company and hurt another."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 16 risk chain and Unit 2 revenue/margin evidence.",
        "newKnowledge": "sector risk and competition come from the market around the company, not only internal company choices.",
        "avoidOverlap": "do not repeat generic company-specific risk; make the evidence external: sector trend, competitor or market share.",
        "misconception": "a growing sector helps every company in that sector equally.",
        "evidenceTask": "compare Li Ning sales trend with competitor or sector evidence.",
        "studentOutput": "one explanation of how the same trend can help one company and hurt another."
      }
    },
    {
      "lesson": 18,
      "company": "Ping An",
      "guidingQuestion": "How can government rules affect future profit?",
      "guidingQuestionZh": "政府规则如何影响未来利润？",
      "handoutMaterial": "Rule-change scenario cards, effect classification table and regulation-to-profit sentence frame.",
      "formativeAssessment": "Scenario classification: cost increase, revenue limit, risk reduction or unclear effect.",
      "exitTicket": "Explain why a profitable company may still face regulation risk.",
      "sequenceRole": "Regulation-risk layer.",
      "retrievalBase": "Risk-evidence-effect chains from Lessons 16-17.",
      "newKnowledge": "Regulation, compliance cost and policy risk.",
      "evidenceTask": "Classify a Ping An report extract or regulatory note by likely effect.",
      "avoidOverlap": "Keep it business-focused and non-political.",
      "misconception": "Current profit protects a company from rule changes.",
      "studentOutput": "Rule-change classification and future-profit or price link.",
      "futureReuse": "Reused in Tencent platform and financial-company cases.",
      "focus": "Focus: regulation risk.",
      "terms": [
        {
          "term": "regulation",
          "zh": "监管",
          "definition": "government rules that affect how a company operates."
        },
        {
          "term": "compliance cost",
          "zh": "合规成本",
          "definition": "the cost of obeying rules and standards."
        },
        {
          "term": "policy risk",
          "zh": "政策风险",
          "definition": "the risk that rule changes reduce future profit."
        }
      ],
      "formulaOrNoFormula": "no new formula; classify possible rule changes by effect.",
      "evidenceSummary": "Ping An report extract or regulatory note with a careful non-political framing.",
      "check": "Explain why a profitable company may still face regulation risk.",
      "unit": 4,
      "unitTitle": "Risk, portfolios and funds",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Ping An company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: regulation, compliance cost, policy risk."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Classify a Ping An report extract or regulatory note by likely effect."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Explain why a profitable company may still face regulation risk."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Current profit protects a company from rule changes."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Rule-change classification and future-profit or price link."
        }
      ],
      "examPattern": {
        "checkpoint": 4,
        "itemType": "evidence interpretation and judgement paragraph",
        "sourceRequirement": "Use a frozen Ping An extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: How can government rules affect future profit?",
        "mustAssess": "Rule-change classification and future-profit or price link."
      },
      "cardGenerator": {
        "retrievalBase": "Lessons 16-17 risk-evidence-effect chains.",
        "newKnowledge": "regulation risk affects future profit through rules, compliance costs, permitted products or required behaviour.",
        "avoidOverlap": "keep the framing non-political and business-focused; do not broaden into every government policy topic.",
        "misconception": "current profit protects a company from future rule changes.",
        "evidenceTask": "read a Ping An report extract or regulatory note and classify the likely effect on cost, revenue, risk or expectations.",
        "studentOutput": "one rule-change classification and one sentence linking regulation to future profit or price."
      }
    },
    {
      "lesson": 19,
      "company": "Samsung",
      "guidingQuestion": "Why can exchange rates matter to shareholders?",
      "guidingQuestionZh": "汇率为什么会影响股东？",
      "handoutMaterial": "Geographic sales or currency-risk extract, exchange-rate change calculator and investor-risk explanation prompt.",
      "formativeAssessment": "Currency direction check: students decide which figure changes when the exchange rate moves.",
      "exitTicket": "Calculate one exchange-rate change and link it to shareholder risk.",
      "sequenceRole": "Global and currency-risk layer.",
      "retrievalBase": "Risk chains and the percentage-change method from Lesson 11.",
      "newKnowledge": "Exchange rate, export exposure and translation effect.",
      "evidenceTask": "Connect Samsung geographic sales or currency-risk note to a frozen exchange-rate change.",
      "avoidOverlap": "Do not teach foreign-exchange trading.",
      "misconception": "Foreign sales only create opportunity and not measurement or return risk.",
      "studentOutput": "Exchange-rate percentage change plus investor-risk explanation.",
      "futureReuse": "Supports local/global comparison and multinational risk analysis.",
      "focus": "Focus: global sales, currencies and reporting effects.",
      "terms": [
        {
          "term": "exchange rate",
          "zh": "汇率",
          "definition": "the price of one currency in terms of another."
        },
        {
          "term": "export exposure",
          "zh": "出口敞口",
          "definition": "reliance on sales to customers in other countries."
        },
        {
          "term": "translation effect",
          "zh": "折算影响",
          "definition": "how currency changes affect reported figures."
        }
      ],
      "formulaOrNoFormula": "exchange-rate change % = (new rate - old rate) / old rate x 100.",
      "evidenceSummary": "Samsung geographic sales or currency-risk note with a frozen exchange-rate example.",
      "check": "Calculate an exchange-rate change and link it to investor risk.",
      "unit": 4,
      "unitTitle": "Risk, portfolios and funds",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Samsung company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: exchange rate, export exposure, translation effect."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Connect Samsung geographic sales or currency-risk note to a frozen exchange-rate change."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Calculate an exchange-rate change and link it to investor risk."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Foreign sales only create opportunity and not measurement or return risk."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Exchange-rate percentage change plus investor-risk explanation."
        }
      ],
      "examPattern": {
        "checkpoint": 4,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Samsung extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Why can exchange rates matter to shareholders?",
        "mustAssess": "Exchange-rate percentage change plus investor-risk explanation."
      },
      "cardGenerator": {
        "retrievalBase": "Lessons 16-18 risk chains and the percentage-change method from Lesson 11.",
        "newKnowledge": "currency movements can change reported figures, investor returns and expectations for global companies.",
        "avoidOverlap": "do not teach foreign-exchange trading; keep exchange rates as a shareholder risk factor.",
        "misconception": "foreign sales only create growth opportunity and never create measurement or return risk.",
        "evidenceTask": "connect Samsung geographic sales or currency-risk note to one frozen exchange-rate change.",
        "studentOutput": "one exchange-rate percentage change and one investor-risk explanation."
      }
    },
    {
      "lesson": 20,
      "company": "ChinaAMC CSI 300 ETF",
      "guidingQuestion": "How can one fund hold many companies?",
      "guidingQuestionZh": "一个基金如何持有许多公司？",
      "handoutMaterial": "ETF factsheet reading guide, holdings/risk table and ETF-versus-single-share comparison box.",
      "formativeAssessment": "Risk-reduction check: students identify which risk diversification reduces and which remains.",
      "exitTicket": "Compare an ETF with one single-company share: one portfolio weight, one risk reduced, one risk remaining.",
      "sequenceRole": "Unit 4 portfolio and fund checkpoint.",
      "retrievalBase": "Risk types from Lessons 16-19 and ownership from Lesson 4.",
      "newKnowledge": "ETF, index fund, diversification and portfolio weight; expense ratio and tracking are factsheet fields to read, not major new concepts.",
      "evidenceTask": "Read a China-relevant ETF factsheet and identify holdings, index, cost and remaining risks.",
      "avoidOverlap": "Make portfolio weight the main calculation; treat expense ratio as read-only unless extending.",
      "misconception": "Diversification removes all investment risk.",
      "studentOutput": "ETF-versus-single-share comparison with one portfolio-weight calculation, one risk reduced, one risk remaining and one risk-return trade-off sentence.",
      "futureReuse": "Reused whenever final judgements mention portfolio context.",
      "focus": "Focus: China-relevant ETF/index-fund diversification compared with owning one company share.",
      "terms": [
        {
          "term": "ETF",
          "zh": "交易型开放式指数基金",
          "definition": "an exchange-traded fund that can be bought and sold on a stock exchange."
        },
        {
          "term": "index fund",
          "zh": "指数基金",
          "definition": "a fund designed to track a market index rather than pick individual shares."
        },
        {
          "term": "diversification",
          "zh": "分散化",
          "definition": "spreading investment across different holdings to reduce risk."
        },
        {
          "term": "portfolio weight",
          "zh": "投资组合权重",
          "definition": "one holding's value as a share of total portfolio value."
        }
      ],
      "formulaOrNoFormula": "portfolio weight = holding value / total portfolio value x 100; expense ratio and tracking are read-only factsheet fields unless extending.",
      "evidenceSummary": "ChinaAMC CSI 300 ETF or similar Mainland/HK fund factsheet, with BlackRock/iShares used only as a global comparison.",
      "check": "Compare one ETF with one single-company share using one portfolio weight, one risk reduced and one risk remaining.",
      "unit": 4,
      "unitTitle": "Risk, portfolios and funds",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record ChinaAMC CSI 300 ETF company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: ETF, index fund, diversification, portfolio weight."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Read a China-relevant ETF factsheet and identify holdings, index, cost and remaining risks."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Compare one ETF with one single-company share using one portfolio weight, one risk reduced and one risk remaining."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Diversification removes all investment risk."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "ETF-versus-single-share comparison with one portfolio-weight calculation, one risk reduced, one risk remaining and one risk-return trade-off sentence."
        }
      ],
      "examPattern": {
        "checkpoint": 4,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen ChinaAMC CSI 300 ETF extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: How can one fund hold many companies?",
        "mustAssess": "ETF-versus-single-share comparison with one portfolio-weight calculation, one risk reduced, one risk remaining and one risk-return trade-off sentence."
      },
      "cardGenerator": {
        "retrievalBase": "Lessons 16-19 risk types and Lesson 4 ownership of shares.",
        "newKnowledge": "an ETF or index fund can spread exposure across many holdings; diversification reduces company-specific risk but leaves market, sector, tracking and cost risks. Portfolio weight shows how important one holding is inside the fund. Diversification is rational risk control, not a guarantee of return.",
        "avoidOverlap": "make portfolio weight the main calculation; treat expense ratio as a read-only factsheet item unless the deck needs an extension.",
        "misconception": "diversification removes all investment risk.",
        "evidenceTask": "read a China-relevant ETF factsheet and identify holdings, index, cost and remaining risks.",
        "studentOutput": "one ETF-versus-single-share comparison with one portfolio-weight calculation, one risk reduced, one risk remaining and one risk-return trade-off sentence."
      }
    },
    {
      "lesson": 21,
      "company": "Tencent",
      "guidingQuestion": "What makes a platform company attractive or risky?",
      "guidingQuestionZh": "平台公司为什么有吸引力，也为什么有风险？",
      "handoutMaterial": "Platform evidence board, attraction-risk-price triangle and balanced judgement planner.",
      "formativeAssessment": "Balanced-board check: students place evidence into attraction, risk, price or unsupported claim.",
      "exitTicket": "Complete one attraction-risk-price triangle for Tencent.",
      "sequenceRole": "First case lab: platform synthesis.",
      "retrievalBase": "Tencent from Lesson 1 plus growth, margin, P/E and risk tools.",
      "newKnowledge": "Platform business, network effects and regulatory overhang.",
      "evidenceTask": "Combine Tencent revenue mix, margin evidence and one dated risk note.",
      "avoidOverlap": "Do not reteach share-price meaning or revenue definitions.",
      "misconception": "A large platform with many users is automatically low-risk.",
      "studentOutput": "Attraction-risk-price triangle with one evidence point in each corner.",
      "futureReuse": "Model for later sector-specific case judgements.",
      "focus": "Focus: platform businesses and balanced judgement.",
      "terms": [
        {
          "term": "platform business",
          "zh": "平台型业务",
          "definition": "a business that connects different user groups."
        },
        {
          "term": "network effects",
          "zh": "网络效应",
          "definition": "when a service becomes more valuable as more people use it."
        },
        {
          "term": "regulatory overhang",
          "zh": "监管不确定性",
          "definition": "uncertainty caused by possible future rules."
        }
      ],
      "formulaOrNoFormula": "combine growth, margin, P/E and risk notes; no single new formula.",
      "evidenceSummary": "Tencent revenue mix, margin evidence and one risk note.",
      "check": "Complete one attraction-risk-price triangle for Tencent.",
      "unit": 5,
      "unitTitle": "Sector case labs",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Tencent company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: platform business, network effects, regulatory overhang."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Combine Tencent revenue mix, margin evidence and one dated risk note."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Complete one attraction-risk-price triangle for Tencent."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "A large platform with many users is automatically low-risk."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Attraction-risk-price triangle with one evidence point in each corner."
        }
      ],
      "examPattern": {
        "checkpoint": 5,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Tencent extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: What makes a platform company attractive or risky?",
        "mustAssess": "Attraction-risk-price triangle with one evidence point in each corner."
      },
      "cardGenerator": {
        "retrievalBase": "Tencent familiarity from Lesson 1 plus growth, margin, P/E and risk tools from Units 2-4.",
        "newKnowledge": "a platform business can gain from network effects, but platform strength must be balanced against regulation, competition and price.",
        "avoidOverlap": "do not reteach basic share-price meaning or revenue definitions; use them as retrieval only.",
        "misconception": "a large platform with many users is automatically low-risk.",
        "evidenceTask": "combine Tencent revenue mix, margin evidence and one dated risk note.",
        "studentOutput": "one attraction-risk-price triangle with one evidence point in each corner."
      }
    },
    {
      "lesson": 22,
      "company": "BYD",
      "guidingQuestion": "Is BYD attractive because it is strong, or because the price is fair?",
      "guidingQuestionZh": "比亚迪有吸引力是因为业务强，还是因为价格合理？",
      "handoutMaterial": "Strength-price-risk evidence matrix, manufacturing evidence notes and attractiveness judgement frame.",
      "formativeAssessment": "Evidence-tagging check: business strength, valuation, risk or missing evidence.",
      "exitTicket": "Complete one BYD strength-price-risk evidence matrix.",
      "sequenceRole": "Manufacturing case lab: strength versus fair price.",
      "retrievalBase": "BYD margin work and valuation discipline.",
      "newKnowledge": "Vertical integration, capacity and cyclicality.",
      "evidenceTask": "Tag BYD sales, margin, production or valuation evidence as strength, price or risk evidence.",
      "avoidOverlap": "Do not recalculate gross margin from first principles except as retrieval.",
      "misconception": "Operational strength equals investment attractiveness.",
      "studentOutput": "Strength-price-risk evidence matrix separating business strength from investment attractiveness.",
      "futureReuse": "Reused for quality-versus-price thinking in final synthesis.",
      "focus": "Focus: manufacturing strength and valuation discipline.",
      "terms": [
        {
          "term": "vertical integration",
          "zh": "垂直整合",
          "definition": "control over several stages of the supply chain."
        },
        {
          "term": "capacity",
          "zh": "产能",
          "definition": "how much a company can produce."
        },
        {
          "term": "cyclicality",
          "zh": "周期性",
          "definition": "sensitivity to economic cycles and demand changes."
        }
      ],
      "formulaOrNoFormula": "compare margin and growth; then add price and risk evidence.",
      "evidenceSummary": "BYD sales, margin, production or valuation evidence with source date.",
      "check": "Complete one BYD strength-price-risk evidence matrix.",
      "unit": 5,
      "unitTitle": "Sector case labs",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record BYD company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: vertical integration, capacity, cyclicality."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Tag BYD sales, margin, production or valuation evidence as strength, price or risk evidence."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Complete one BYD strength-price-risk evidence matrix."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Operational strength equals investment attractiveness."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Strength-price-risk evidence matrix separating business strength from investment attractiveness."
        }
      ],
      "examPattern": {
        "checkpoint": 5,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen BYD extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Is BYD attractive because it is strong, or because the price is fair?",
        "mustAssess": "Strength-price-risk evidence matrix separating business strength from investment attractiveness."
      },
      "cardGenerator": {
        "retrievalBase": "BYD margin work from Lesson 7 and valuation discipline from Lesson 15.",
        "newKnowledge": "manufacturing strength can come from vertical integration, capacity and cost control, but cyclical demand and price paid still matter.",
        "avoidOverlap": "do not recalculate gross margin from first principles unless used as quick retrieval.",
        "misconception": "operational strength is the same as investment attractiveness.",
        "evidenceTask": "read BYD sales, margin, production or valuation evidence and tag each item as strength, price or risk evidence.",
        "studentOutput": "one strength-price-risk evidence matrix separating business strength from investment attractiveness."
      }
    },
    {
      "lesson": 23,
      "company": "HSBC",
      "guidingQuestion": "Why is analysing a bank different from analysing a tech company?",
      "guidingQuestionZh": "分析银行为什么不同于分析科技公司？",
      "handoutMaterial": "Bank evidence extract, bank-versus-tech exception note and bank-specific risk prompt.",
      "formativeAssessment": "Company-type check: students decide whether evidence is bank-specific or general company evidence.",
      "exitTicket": "Write one bank-evidence exception note.",
      "sequenceRole": "Financial-company case lab.",
      "retrievalBase": "HSBC dividend work and risk classification.",
      "newKnowledge": "Interest margin, credit risk and capital strength.",
      "evidenceTask": "Read HSBC results summary and identify one bank-specific evidence item.",
      "avoidOverlap": "Avoid advanced bank ratios.",
      "misconception": "Banks can be analysed exactly like technology or consumer firms.",
      "studentOutput": "Bank-evidence exception note explaining why one ordinary company metric is insufficient.",
      "futureReuse": "Reused as the exception-case warning for future company selection.",
      "focus": "Focus: financial-company evidence and bank-specific risks.",
      "terms": [
        {
          "term": "interest margin",
          "zh": "利差",
          "definition": "the spread between lending income and funding cost."
        },
        {
          "term": "credit risk",
          "zh": "信用风险",
          "definition": "the risk that borrowers do not repay."
        },
        {
          "term": "capital strength",
          "zh": "资本实力",
          "definition": "ability to absorb losses and keep operating."
        }
      ],
      "formulaOrNoFormula": "basic ratio reading only; avoid advanced bank formulas in Grade 9 decks.",
      "evidenceSummary": "HSBC results summary and simple bank-risk extract.",
      "check": "Write one bank-evidence exception note.",
      "unit": 5,
      "unitTitle": "Sector case labs",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record HSBC company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: interest margin, credit risk, capital strength."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Read HSBC results summary and identify one bank-specific evidence item."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Write one bank-evidence exception note."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Banks can be analysed exactly like technology or consumer firms."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Bank-evidence exception note explaining why one ordinary company metric is insufficient."
        }
      ],
      "examPattern": {
        "checkpoint": 5,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen HSBC extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Why is analysing a bank different from analysing a tech company?",
        "mustAssess": "Bank-evidence exception note explaining why one ordinary company metric is insufficient."
      },
      "cardGenerator": {
        "retrievalBase": "HSBC dividend work from Lesson 12 and risk classification from Unit 4.",
        "newKnowledge": "financial companies need different evidence because interest margins, credit risk and capital strength drive the business.",
        "avoidOverlap": "do not teach advanced bank ratios; keep the deck to basic evidence reading and one bank-specific risk.",
        "misconception": "bank revenue and profit can be analysed exactly like a technology or consumer company.",
        "evidenceTask": "read an HSBC results summary and identify one bank-specific evidence item.",
        "studentOutput": "one bank-evidence exception note explaining why one ordinary company metric is insufficient."
      }
    },
    {
      "lesson": 24,
      "company": "Anta Sports",
      "guidingQuestion": "How much is a strong brand worth to investors?",
      "guidingQuestionZh": "强品牌对投资者有多大价值？",
      "handoutMaterial": "Brand-to-margin evidence map, inventory evidence cards and pricing-power limitation sentence.",
      "formativeAssessment": "Link check: brand evidence -> pricing power or inventory risk -> profit effect.",
      "exitTicket": "Complete one brand-to-margin evidence map with one limitation.",
      "sequenceRole": "Consumer-brand case lab.",
      "retrievalBase": "Revenue, margin and competition analysis.",
      "newKnowledge": "Brand equity, inventory risk and pricing power.",
      "evidenceTask": "Classify Anta revenue, margin, brand and inventory notes as support or limitation evidence.",
      "avoidOverlap": "Do not repeat generic sector risk unless tied to brand, inventory or pricing power.",
      "misconception": "A famous brand guarantees high profit and low risk.",
      "studentOutput": "Brand-to-margin evidence map plus one limitation linked to inventory or demand.",
      "futureReuse": "Prepares global/local brand comparison in Lesson 25.",
      "focus": "Focus: consumer brands, inventory and pricing power.",
      "terms": [
        {
          "term": "brand equity",
          "zh": "品牌权益",
          "definition": "value created by a strong brand name and reputation."
        },
        {
          "term": "inventory risk",
          "zh": "库存风险",
          "definition": "risk that unsold goods reduce profit."
        },
        {
          "term": "pricing power",
          "zh": "定价能力",
          "definition": "ability to raise prices without losing too many customers."
        }
      ],
      "formulaOrNoFormula": "compare revenue growth and margin; no new formula.",
      "evidenceSummary": "Anta Sports revenue, margin and brand or inventory notes.",
      "check": "Complete one brand-to-margin evidence map with one limitation.",
      "unit": 5,
      "unitTitle": "Sector case labs",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Anta Sports company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: brand equity, inventory risk, pricing power."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Classify Anta revenue, margin, brand and inventory notes as support or limitation evidence."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Complete one brand-to-margin evidence map with one limitation."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "A famous brand guarantees high profit and low risk."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Brand-to-margin evidence map plus one limitation linked to inventory or demand."
        }
      ],
      "examPattern": {
        "checkpoint": 5,
        "itemType": "evidence interpretation and judgement paragraph",
        "sourceRequirement": "Use a frozen Anta Sports extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: How much is a strong brand worth to investors?",
        "mustAssess": "Brand-to-margin evidence map plus one limitation linked to inventory or demand."
      },
      "cardGenerator": {
        "retrievalBase": "revenue, margin and competition analysis from Lessons 6-8 and 17.",
        "newKnowledge": "brand equity can support pricing power and margins, but inventory risk and changing demand can weaken the case.",
        "avoidOverlap": "do not repeat generic sector-risk language unless it is tied to brand, inventory or pricing power.",
        "misconception": "a strong or famous brand guarantees high profit and low risk.",
        "evidenceTask": "use Anta revenue, margin, brand and inventory notes to classify support and limitation evidence.",
        "studentOutput": "one brand-to-margin evidence map plus one limitation linked to inventory or demand."
      }
    },
    {
      "lesson": 25,
      "company": "Nike",
      "guidingQuestion": "How can we compare a global brand with a China/HK brand?",
      "guidingQuestionZh": "如何比较全球品牌与中国/香港品牌？",
      "handoutMaterial": "Comparable-company metric alignment table, source-date checklist and fair-comparison paragraph frame.",
      "formativeAssessment": "Fairness audit: students mark whether comparison metrics, dates and currencies are aligned.",
      "exitTicket": "Submit one comparable-company alignment row and one fair comparison sentence.",
      "sequenceRole": "Comparable-company case checkpoint.",
      "retrievalBase": "Comparison discipline and brand analysis.",
      "newKnowledge": "Multinational, comparable company and local/global risk.",
      "evidenceTask": "Align Nike data with one China/HK brand using the same metric set.",
      "avoidOverlap": "No new metrics; focus on fair comparison method.",
      "misconception": "Different years, currencies or metric definitions can still be compared casually.",
      "studentOutput": "Comparable-company alignment row plus one fair comparison paragraph naming metric, source date and limitation.",
      "futureReuse": "Reusable for final exam-style company comparisons.",
      "focus": "Focus: comparable-company analysis across markets.",
      "terms": [
        {
          "term": "multinational",
          "zh": "跨国公司",
          "definition": "a company operating across several countries."
        },
        {
          "term": "comparable company",
          "zh": "可比公司",
          "definition": "a similar firm used for comparison."
        },
        {
          "term": "local/global risk",
          "zh": "本地/全球风险",
          "definition": "risk from specific local markets or worldwide exposure."
        }
      ],
      "formulaOrNoFormula": "compare two companies using the same metric set.",
      "evidenceSummary": "Nike figures plus one China/HK brand comparison using aligned metrics.",
      "check": "Submit one comparable-company alignment row and one fair comparison sentence.",
      "unit": 5,
      "unitTitle": "Sector case labs",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Nike company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: multinational, comparable company, local/global risk."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Align Nike data with one China/HK brand using the same metric set."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Submit one comparable-company alignment row and one fair comparison sentence."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Different years, currencies or metric definitions can still be compared casually."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Comparable-company alignment row plus one fair comparison paragraph naming metric, source date and limitation."
        }
      ],
      "examPattern": {
        "checkpoint": 5,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Nike extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: How can we compare a global brand with a China/HK brand?",
        "mustAssess": "Comparable-company alignment row plus one fair comparison paragraph naming metric, source date and limitation."
      },
      "cardGenerator": {
        "retrievalBase": "comparison discipline from Lesson 10 and brand analysis from Lesson 24.",
        "newKnowledge": "comparable-company analysis requires aligned metrics, time periods, source quality and local/global risk awareness.",
        "avoidOverlap": "do not introduce new financial metrics; focus on fair comparison method.",
        "misconception": "two brands can be compared fairly even when the figures use different definitions, years or currencies.",
        "evidenceTask": "align Nike data with one China/HK brand comparison using the same metric set.",
        "studentOutput": "one comparable-company alignment row plus one fair comparison paragraph naming metric, source date and limitation."
      }
    },
    {
      "lesson": 26,
      "company": "Haidilao",
      "guidingQuestion": "Can a restaurant company recover after a difficult period?",
      "guidingQuestionZh": "餐饮公司能否在困难时期后恢复？",
      "handoutMaterial": "Recovery timeline, store-network evidence table and traffic-light evidence-sufficiency verdict.",
      "formativeAssessment": "Sufficiency check: students decide whether a recovery claim needs one more evidence item.",
      "exitTicket": "Give a red/amber/green recovery verdict and justify the evidence gap.",
      "sequenceRole": "Recovery case: evidence sufficiency.",
      "retrievalBase": "Evidence discipline, revenue, margin and valuation/risk judgement.",
      "newKnowledge": "Turnaround, store network and same-store sales.",
      "evidenceTask": "Compare Haidilao store count, revenue or operating recovery evidence across periods.",
      "avoidOverlap": "Revenue per store is optional and only if data is clean.",
      "misconception": "One recovery figure proves the turnaround is complete.",
      "studentOutput": "Red/amber/green recovery verdict explaining whether the claim needs more evidence.",
      "futureReuse": "Reused for cyclical and final quality judgements.",
      "focus": "Focus: turnaround evidence and store-network quality.",
      "terms": [
        {
          "term": "turnaround",
          "zh": "经营复苏",
          "definition": "improvement after a weak period."
        },
        {
          "term": "store network",
          "zh": "门店网络",
          "definition": "the set of locations through which a company serves customers."
        },
        {
          "term": "same-store sales",
          "zh": "同店销售",
          "definition": "sales from stores open in both comparison periods."
        }
      ],
      "formulaOrNoFormula": "revenue per store = total revenue / number of stores, if data allows.",
      "evidenceSummary": "Haidilao store count, revenue or operating recovery evidence.",
      "check": "Give a red/amber/green recovery verdict and justify the evidence gap.",
      "unit": 6,
      "unitTitle": "Synthesis case labs",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Haidilao company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: turnaround, store network, same-store sales."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Compare Haidilao store count, revenue or operating recovery evidence across periods."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Give a red/amber/green recovery verdict and justify the evidence gap."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "One recovery figure proves the turnaround is complete."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Red/amber/green recovery verdict explaining whether the claim needs more evidence."
        }
      ],
      "examPattern": {
        "checkpoint": 6,
        "itemType": "evidence interpretation with optional calculation",
        "sourceRequirement": "Use a frozen Haidilao extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Can a restaurant company recover after a difficult period?",
        "mustAssess": "Red/amber/green recovery verdict explaining whether the claim needs more evidence."
      },
      "cardGenerator": {
        "retrievalBase": "evidence discipline, revenue analysis, margin caution and valuation/risk judgement from earlier units.",
        "newKnowledge": "turnaround analysis asks whether weak performance is genuinely improving and whether the store network is higher quality.",
        "avoidOverlap": "do not introduce full restaurant accounting; revenue per store is optional and only if the data is clean.",
        "misconception": "one recovery figure proves the turnaround is complete.",
        "evidenceTask": "compare Haidilao store count, revenue or operating recovery evidence across periods.",
        "studentOutput": "one red/amber/green recovery verdict explaining whether the claim needs more evidence."
      }
    },
    {
      "lesson": 27,
      "company": "Trip.com",
      "guidingQuestion": "Why can travel companies rise and fall with the economy?",
      "guidingQuestionZh": "旅游公司为什么会随经济周期起落？",
      "handoutMaterial": "Before/after travel-cycle data table, operating-margin calculation and operating-leverage chain diagram.",
      "formativeAssessment": "Causal-chain check: travel demand -> revenue -> operating profit -> margin.",
      "exitTicket": "Complete a demand -> revenue -> operating profit -> margin chain diagram.",
      "sequenceRole": "Cyclical-demand case.",
      "retrievalBase": "Margin analysis, sector risk and recovery thinking.",
      "newKnowledge": "Cyclical demand, recovery and operating leverage.",
      "evidenceTask": "Compare Trip.com revenue and operating profit before and after a travel-cycle shift.",
      "avoidOverlap": "Do not turn this into a macroeconomics lesson.",
      "misconception": "Revenue and profit should move at the same rate.",
      "studentOutput": "Operating-leverage chain diagram linking travel demand, revenue, operating profit and margin.",
      "futureReuse": "Supports final discussion of economic-cycle risk.",
      "focus": "Focus: cyclical demand and operating leverage.",
      "terms": [
        {
          "term": "cyclical demand",
          "zh": "周期性需求",
          "definition": "demand that rises and falls with economic conditions."
        },
        {
          "term": "recovery",
          "zh": "复苏",
          "definition": "return toward earlier activity or profit levels."
        },
        {
          "term": "operating leverage",
          "zh": "经营杠杆",
          "definition": "profit sensitivity when fixed costs are high."
        }
      ],
      "formulaOrNoFormula": "operating margin = operating profit / revenue x 100.",
      "evidenceSummary": "Trip.com revenue and operating profit before and after a travel cycle change.",
      "check": "Complete a demand -> revenue -> operating profit -> margin chain diagram.",
      "unit": 6,
      "unitTitle": "Synthesis case labs",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Trip.com company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: cyclical demand, recovery, operating leverage."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Compare Trip.com revenue and operating profit before and after a travel-cycle shift."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Complete a demand -> revenue -> operating profit -> margin chain diagram."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Revenue and profit should move at the same rate."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Operating-leverage chain diagram linking travel demand, revenue, operating profit and margin."
        }
      ],
      "examPattern": {
        "checkpoint": 6,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Trip.com extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Why can travel companies rise and fall with the economy?",
        "mustAssess": "Operating-leverage chain diagram linking travel demand, revenue, operating profit and margin."
      },
      "cardGenerator": {
        "retrievalBase": "margin analysis from Unit 2, sector/cyclical risk from Unit 4 and turnaround thinking from Lesson 26.",
        "newKnowledge": "cyclical demand and operating leverage can make profit move faster than revenue when fixed costs are important.",
        "avoidOverlap": "do not turn the lesson into macroeconomics; keep the focus on company evidence before and after a travel cycle change.",
        "misconception": "revenue and profit should rise or fall at the same rate.",
        "evidenceTask": "compare Trip.com revenue and operating profit before and after a travel-cycle shift.",
        "studentOutput": "one operating-leverage chain diagram linking travel demand, revenue, operating profit and margin."
      }
    },
    {
      "lesson": 28,
      "company": "Kuaishou",
      "guidingQuestion": "How does a free app turn users into revenue?",
      "guidingQuestionZh": "免费应用如何把用户转化为收入？",
      "handoutMaterial": "User and revenue metric table, monetisation ladder, ARPU calculation and user-growth limitation prompt.",
      "formativeAssessment": "Metric check: students identify whether a figure measures users, revenue, ARPU or profit.",
      "exitTicket": "Complete one monetisation ladder and one ARPU limitation sentence.",
      "sequenceRole": "User-monetisation case.",
      "retrievalBase": "Platform thinking and revenue/margin caution.",
      "newKnowledge": "Active users, monetisation and ARPU.",
      "evidenceTask": "Read Kuaishou active-user and revenue data from one reporting period.",
      "avoidOverlap": "Do not reteach all platform-business concepts; focus on users to revenue.",
      "misconception": "More users automatically mean more revenue, higher ARPU or better investment quality.",
      "studentOutput": "Monetisation ladder plus ARPU calculation and limitation sentence about users, revenue and profit.",
      "futureReuse": "Reused in platform, brand and growth-quality debates.",
      "focus": "Focus: monetisation and user metrics.",
      "terms": [
        {
          "term": "active users",
          "zh": "活跃用户",
          "definition": "people who use a service during a measured period."
        },
        {
          "term": "monetisation",
          "zh": "商业化变现",
          "definition": "turning user activity into revenue."
        },
        {
          "term": "ARPU",
          "zh": "每用户平均收入",
          "definition": "average revenue per user."
        }
      ],
      "formulaOrNoFormula": "ARPU = revenue / active users.",
      "evidenceSummary": "Kuaishou user number and revenue data from one reporting period.",
      "check": "Complete one monetisation ladder and one ARPU limitation sentence.",
      "unit": 6,
      "unitTitle": "Synthesis case labs",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Kuaishou company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: active users, monetisation, ARPU."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Read Kuaishou active-user and revenue data from one reporting period."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Complete one monetisation ladder and one ARPU limitation sentence."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "More users automatically mean more revenue, higher ARPU or better investment quality."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Monetisation ladder plus ARPU calculation and limitation sentence about users, revenue and profit."
        }
      ],
      "examPattern": {
        "checkpoint": 6,
        "itemType": "calculation, interpretation and limitation",
        "sourceRequirement": "Use a frozen Kuaishou extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: How does a free app turn users into revenue?",
        "mustAssess": "Monetisation ladder plus ARPU calculation and limitation sentence about users, revenue and profit."
      },
      "cardGenerator": {
        "retrievalBase": "platform thinking from Lesson 21 and revenue/margin caution from Unit 2.",
        "newKnowledge": "user metrics must be connected to monetisation; ARPU shows average revenue per active user, not profit per user.",
        "avoidOverlap": "do not repeat all platform-business concepts; focus on the bridge from users to revenue.",
        "misconception": "more users automatically mean more revenue, higher ARPU or a stronger investment case.",
        "evidenceTask": "read Kuaishou active-user and revenue data from one reporting period.",
        "studentOutput": "one monetisation ladder plus ARPU calculation and limitation sentence about users, revenue and profit."
      }
    },
    {
      "lesson": 29,
      "company": "Lenovo",
      "guidingQuestion": "When does borrowing become a risk for shareholders?",
      "guidingQuestionZh": "借款什么时候会成为股东风险？",
      "handoutMaterial": "Balance-sheet extract, leverage benefit-risk note and optional debt-to-equity calculation box.",
      "formativeAssessment": "Benefit/risk sort: borrowing as growth support, fixed obligation or shareholder risk.",
      "exitTicket": "Write one leverage benefit-risk note.",
      "sequenceRole": "Debt-risk case before final synthesis.",
      "retrievalBase": "Risk chains and report evidence reading.",
      "newKnowledge": "Debt, liabilities and gearing or leverage.",
      "evidenceTask": "Read Lenovo balance-sheet extract and identify debt, liabilities, equity or financing notes.",
      "avoidOverlap": "Keep advanced solvency and interest coverage optional.",
      "misconception": "Borrowing is always bad, or harmless if the company is large.",
      "studentOutput": "Leverage benefit-risk note with a simple ratio only if figures are clear.",
      "futureReuse": "Feeds final risk/quality/valuation synthesis.",
      "focus": "Focus: debt, liabilities and leverage risk.",
      "terms": [
        {
          "term": "debt",
          "zh": "债务",
          "definition": "money a company has borrowed and must repay."
        },
        {
          "term": "liabilities",
          "zh": "负债",
          "definition": "obligations a company owes to others."
        },
        {
          "term": "gearing or leverage",
          "zh": "负债杠杆",
          "definition": "the use of debt in a company's financing."
        }
      ],
      "formulaOrNoFormula": "debt-to-equity = total debt / equity, if the data is suitable.",
      "evidenceSummary": "Lenovo balance-sheet extract with debt, liabilities or financing notes.",
      "check": "Write one leverage benefit-risk note.",
      "unit": 6,
      "unitTitle": "Synthesis case labs",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Lenovo company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: debt, liabilities, gearing or leverage."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Read Lenovo balance-sheet extract and identify debt, liabilities, equity or financing notes."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Write one leverage benefit-risk note."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Borrowing is always bad, or harmless if the company is large."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Leverage benefit-risk note with a simple ratio only if figures are clear."
        }
      ],
      "examPattern": {
        "checkpoint": 6,
        "itemType": "evidence interpretation with optional calculation",
        "sourceRequirement": "Use a frozen Lenovo extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: When does borrowing become a risk for shareholders?",
        "mustAssess": "Leverage benefit-risk note with a simple ratio only if figures are clear."
      },
      "cardGenerator": {
        "retrievalBase": "risk-evidence-effect chains and earlier evidence reading of company reports.",
        "newKnowledge": "debt can fund growth but adds obligations; leverage raises both potential benefit and shareholder risk.",
        "avoidOverlap": "keep advanced solvency and interest-coverage ratios optional; use debt-to-equity only if the data is suitable for Grade 9.",
        "misconception": "borrowing is always bad, or borrowing is harmless if the company is large.",
        "evidenceTask": "read a Lenovo balance-sheet extract and identify debt, liabilities, equity or financing notes.",
        "studentOutput": "one leverage benefit-risk note with a simple ratio only if the figures are clear."
      }
    },
    {
      "lesson": 30,
      "company": "Costco",
      "guidingQuestion": "Can a steady business still be a bad investment at the wrong price?",
      "guidingQuestionZh": "稳定企业在价格错误时仍可能是差投资吗？",
      "handoutMaterial": "Final synthesis memo sheet, evidence-price-risk planner and quality-price-risk verdict space.",
      "formativeAssessment": "Final evidence audit: students check whether a judgement includes business quality, price and risk.",
      "exitTicket": "Write a final quality-price-risk memo that avoids speculation, balances possible return with risk and gives no personal investment advice.",
      "sequenceRole": "Final synthesis: quality, price and risk.",
      "retrievalBase": "Full course: sources, growth, margin, cash, return, valuation, risk, funds and comparison.",
      "newKnowledge": "Defensive business, quality company and valuation risk.",
      "evidenceTask": "Combine Costco growth, margin, valuation and risk evidence from dated sources.",
      "avoidOverlap": "No new formula; final judgement only.",
      "misconception": "A steady business is automatically safe or a good investment.",
      "studentOutput": "Final quality-price-risk memo using dated evidence, possible return, price paid and risk without speculation or personal advice.",
      "futureReuse": "Capstone pattern for future independent company analysis.",
      "focus": "Focus: quality, defensiveness and final valuation synthesis.",
      "terms": [
        {
          "term": "defensive business",
          "zh": "防御型业务",
          "definition": "a business whose demand may be more stable in difficult times."
        },
        {
          "term": "quality company",
          "zh": "优质公司",
          "definition": "a company with strong operations, brand, margins or resilience."
        },
        {
          "term": "valuation risk",
          "zh": "估值风险",
          "definition": "risk that the price already assumes too much good news."
        }
      ],
      "formulaOrNoFormula": "synthesis of growth, margin, P/E and risk; no new formula.",
      "evidenceSummary": "Costco growth, margin and valuation evidence from dated sources.",
      "check": "Write a final quality-price-risk memo that avoids speculation, balances possible return with risk and gives no personal investment advice.",
      "unit": 6,
      "unitTitle": "Synthesis case labs",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Costco company identity, listing or source context, source title, URL, publication date, accessed date, key figures and what the evidence can and cannot prove."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the lesson terms: defensive business, quality company, valuation risk."
        },
        {
          "key": "companyEvidence",
          "title": "Company evidence",
          "task": "Combine Costco growth, margin, valuation and risk evidence from dated sources."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Write a final quality-price-risk memo that avoids speculation, balances possible return with risk and gives no personal investment advice."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "A steady business is automatically safe or a good investment."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "Final quality-price-risk memo using dated evidence, possible return, price paid and risk without speculation or personal advice."
        }
      ],
      "examPattern": {
        "checkpoint": 6,
        "itemType": "evidence interpretation and judgement paragraph",
        "sourceRequirement": "Use a frozen Costco extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Assess whether students can answer: Can a steady business still be a bad investment at the wrong price?",
        "mustAssess": "Final quality-price-risk memo using dated evidence, possible return, price paid and risk without speculation or personal advice."
      },
      "cardGenerator": {
        "retrievalBase": "the full course: source discipline, growth, margin, cash, returns, valuation, risk, funds and case comparison.",
        "newKnowledge": "defensive and quality businesses still need valuation discipline because price can already assume good news; rational investment analysis must balance possible return with risk and reject speculation or tips.",
        "avoidOverlap": "do not add a new formula; this is the final synthesis lesson.",
        "misconception": "a steady business is automatically a safe or good investment.",
        "evidenceTask": "combine Costco growth, margin, valuation and risk evidence from dated sources.",
        "studentOutput": "a final quality-price-risk memo using dated evidence, possible return, price paid and risk without speculation or personal investment advice."
      }
    }
  ]
};

  if (typeof module === "object" && module.exports) {
    module.exports = courseMap;
  }

  global.INVEST = global.INVEST || {};
  global.INVEST.courseMap = courseMap;
})(typeof globalThis !== "undefined" ? globalThis : window);
