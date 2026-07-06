(function attachInvestmentCourseMap(global) {
  const courseMap = {
  "version": 4,
  "syllabusKey": "company-analysis",
  "courseTitle": "Investment Analysis: Company Analysis",
  "mapTitle": "Standard 30-Lesson Company Analysis Course Map",
  "writtenArtifactRule": "Each lesson worksheet is the primary written artifact. The textbook is a compiled collection of the 30 worksheets with light front matter and unit dividers only. Every worksheet also ends with a practical investment action so students learn the steps of analysing before investing.",
  "definitionOverview": {
    "source": "references/investment-analysis-definitions.md",
    "cfaMatches": "references/investment-analysis-cfa-glossary-matches.json",
    "textbookDefinitions": "references/investment-analysis-textbook-definitions.json",
    "studentPage": "investment-analysis/definitions.html",
    "prioritySource": "CFA Program glossary",
    "prioritySourceUrl": "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/glossary-terms",
    "rule": "Use the textbook-style definition overview for handouts, textbook chapters, quizzes and assessment wording. Where a course term overlaps with the CFA Program glossary, prioritise the CFA-aligned investment or accounting meaning, then simplify for Grade 9. Use the CFA matches file to show the matched source term and official glossary link, and use the local textbook definitions file as supplementary source support. Shorten definitions for slides only when the same meaning is preserved."
  },
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
      "title": "Evidence and Data Analysis",
      "requirement": "A Section A-style worksheet section with short case information followed by identify, calculate or interpret, explain, analyse why and evidence-based judgement questions."
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
      "requirement": "The student evidence-based judgement or verdict that can be assessed in class or in an exam."
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
  "generatorAccess": {
    "canonicalSource": "investment-analysis/course-map-data.js",
    "contextModule": "investment-analysis/generator-context.js",
    "cli": "node scripts/export-investment-generator-context.js --lesson <1-30> --target lesson",
    "targets": [
      {
        "key": "lesson",
        "purpose": "Full lesson-planning context for a deck generator.",
        "use": "Use before writing slides.js, lesson notes, source tasks or quiz alignment."
      },
      {
        "key": "deck",
        "purpose": "Slide-deck contract.",
        "use": "Use artifactBlueprint.deckArc, retrievalBase, formativeAssessment, exitTicket and primaryOutput as the lesson spine."
      },
      {
        "key": "handout",
        "purpose": "Lesson handout contract.",
        "use": "Use artifactBlueprint.handoutBlocks in the fixed six-block handout order."
      },
      {
        "key": "quiz",
        "purpose": "Follow-up quiz contract.",
        "use": "Retrieve terms, core claim, misconception correction, formula or judgement rule and exit-ticket output."
      },
      {
        "key": "exam",
        "purpose": "Checkpoint exam-item contract.",
        "use": "Use assessmentBlueprint and examPattern for command word, marks, stimulus, calculation and judgement."
      },
      {
        "key": "textbook",
        "purpose": "Compiled handout-book contract.",
        "use": "Use the lesson handout as the chapter; do not create textbook-only teaching content."
      }
    ],
    "rules": [
      "Treat course-map-data.js as the standard company-analysis lesson scope.",
      "Use the simple lesson structure for student-facing decks and syllabus cards: Hook, Key idea, Try it, Decide.",
      "Build every lesson as cumulative knowledge: retrieval practice, new knowledge, evidence and data analysis, analyse-why reasoning and student judgement.",
      "Use references/investment-analysis-definitions.md for textbook-style definition wording in handouts, textbook chapters, quizzes and assessment items; where a term overlaps with the CFA Program glossary, prioritise the CFA-aligned meaning before simplifying for Grade 9, and use references/investment-analysis-textbook-definitions.json as supplementary textbook-source support.",
      "Use worksheet.evidenceAndDataAnalysis as the source for the lesson worksheet stimulus and Section A-style questions.",
      "Make every lesson actionable: students must finish by choosing a justified next investment action such as consider, watch, avoid, compare with another choice or gather more evidence.",
      "Use the investmentWorkflow steps as the course method: know what is being bought, check fit, read business evidence, compare return-risk-price and choose the next action.",
      "Students may make evidence-based classroom judgements such as attractive, risky, too expensive, incomplete evidence, watch, avoid or consider when justified with dated evidence and caveats.",
      "Freeze source dates and figures before generating classroom materials; do not depend on live prices.",
      "Do not turn a lesson into personalised investment advice, stock tips, market timing or unsupported recommendations."
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
      "summary": "Investment-analysis purpose, investment versus speculation, assets, shares, exchanges, quote pages, source discipline and the first price-movement chain."
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
      "summary": "Investment-analysis purpose, investment versus speculation, assets, company/share distinction, quote pages, bid/ask basics and evidence logs."
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
      "guidingQuestion": "What is investment analysis?",
      "guidingQuestionZh": "什么是投资分析？",
      "handoutMaterial": "Tencent starter sheet on investment analysis, investment versus speculation, asset types, asset risk and what buying a share means.",
      "formativeAssessment": "Economics-style checks: first Tencent buy discussion, investment-analysis definition attempt, easy MCQ, 10-statement course boundary yes/no check, investment/speculation comparison, asset-type recall, asset-risk sort and share-ownership classification.",
      "exitTicket": "Complete five concise fill blanks on investment analysis, speculation, asset value, risk and share ownership.",
      "sequenceRole": "Course entry lesson that introduces the method of investment analysis and the foundation vocabulary of assets and shares.",
      "retrievalBase": "Everyday experience with familiar companies, simple owned things with value, first impressions, risk and short-term guesses.",
      "newKnowledge": "Investment analysis uses evidence before judgement; investment differs from speculation; an asset has value and can be owned; asset types have different risks; a share is one unit of ownership in a company and does not guarantee profit.",
      "evidenceTask": "Start with the question 'Would you buy shares in Tencent?', then use local company and asset visuals to decide what evidence and concepts are needed before a careful judgement.",
      "avoidOverlap": "Do not teach quote-page mechanics, percentage change, market capitalisation, valuation ratios, revenue/profit analysis, cash-flow analysis or personal buy/sell recommendations yet. Keep risk ranking qualitative and introductory.",
      "misconception": "A student can decide to buy Tencent shares because the company is familiar; speculation is the same as investment; all assets have the same risk; a share means owning the whole company or guaranteed profit.",
      "studentOutput": "A compact exit ticket plus one short explanation of why familiarity with Tencent is not enough without evidence, asset-risk thinking and a correct understanding of shares.",
      "futureReuse": "Creates the first course habits: ask for evidence before judgement, distinguish investment from speculation, treat shares as risky assets and avoid guaranteed-profit thinking.",
      "focus": "Focus: define investment analysis; separate investment from speculation; define assets and simple asset types; rank asset risk cautiously; define a share as one ownership unit.",
      "terms": [
        {
          "term": "investment analysis",
          "zh": "投资分析",
          "definition": "Investment analysis is the process of using source-dated evidence about an asset, business, return, risk and price before making a justified investment judgement."
        },
        {
          "term": "investment",
          "zh": "投资",
          "definition": "Investment is the act of putting money into an asset with the aim of earning a future return, such as income or capital gain, while accepting the possibility of loss."
        },
        {
          "term": "speculation",
          "zh": "投机",
          "definition": "Speculation is an attempt to profit from uncertain price movements, usually relying more on expectations, timing or risk-taking than on complete evidence."
        },
        {
          "term": "asset",
          "zh": "资产",
          "definition": "An asset is something with economic value that can be owned or controlled, such as cash, property, a bond, a share or a business resource."
        },
        {
          "term": "share",
          "zh": "股票 / 股份",
          "definition": "A share is one unit of ownership in a company, giving the shareholder a claim on part of the company's equity and, depending on the share class, certain rights such as votes or dividends."
        }
      ],
      "formulaOrNoFormula": "no new formula; students classify concepts, rank risk qualitatively and explain in words only.",
      "evidenceSummary": "Tencent as a familiar listed-company example, local analysis and asset visuals, and a simple classroom asset-risk ranking. No live price dependency.",
      "check": "Define investment analysis and asset; separate investment from speculation; recall four asset types; classify what a share gives and does not guarantee.",
      "unit": 1,
      "unitTitle": "Market foundations",
      "handoutSections": [
        {
          "key": "sourceBox",
          "title": "Source box",
          "task": "Record Tencent as the opening company example, the source title or visual source, accessed date where relevant, the asset examples used, and one limitation: visual familiarity is not investment evidence by itself."
        },
        {
          "key": "vocabulary",
          "title": "Vocabulary",
          "task": "Define and use the five Lesson 1 terms: investment analysis, investment, speculation, asset and share."
        },
        {
          "key": "companyEvidence",
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Tencent classroom prompt with company context and local asset visuals. Questions: 1. Identify/Define: Define investment analysis and asset. 2. Calculate/Interpret: Interpret a qualitative asset-risk ranking and state why rankings can differ. 3. Explain: Explain why familiarity with Tencent is not enough reason to buy shares. 4. Analyse why: Analyse why confusing investment with speculation could weaken a judgement. 5. Judge: Give a classroom verdict on whether the current evidence is enough, then choose the next investment action: gather more evidence, watch, compare or avoid."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Risk ranking judgement",
          "task": "Rank cash/savings, property, shares and commodities by risk, then explain why the ranking is not a fixed law."
        },
        {
          "key": "misconceptionCheck",
          "title": "Misconception check",
          "task": "Correct the claim: Tencent is familiar, so buying its shares is an investment, not speculation."
        },
        {
          "key": "individualOutput",
          "title": "Individual written output",
          "task": "A compact exit ticket plus one short explanation of why familiarity with Tencent is not enough without evidence, asset-risk thinking and a correct understanding of shares."
        }
      ],
      "examPattern": {
        "checkpoint": 1,
        "itemType": "Section A-style concept and evidence worksheet",
        "sourceRequirement": "Use a short Tencent classroom prompt plus local asset examples; include source/accessed details for company and visual evidence where relevant.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: What is investment analysis?",
        "mustAssess": "Investment-analysis definition, investment versus speculation, asset definition, qualitative risk ranking and share definition. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "everyday experience with familiar companies, owned things with value, simple risk differences and short-term price guesses.",
        "newKnowledge": "investment analysis uses evidence before judgement; investment differs from speculation; assets have value and can be owned; asset risk differs; a share is one ownership unit in a company.",
        "avoidOverlap": "do not teach quote-page mechanics, percentage change, market capitalisation, valuation ratios, revenue/profit analysis or cash-flow analysis yet.",
        "misconception": "familiarity with Tencent is enough reason to buy; speculation and investment are the same; all assets have the same risk; shares guarantee profit.",
        "evidenceTask": "use Tencent and asset visuals to move from first opinion to evidence questions, asset classification and share-ownership classification.",
        "studentOutput": "a compact exit ticket and one short explanation using investment analysis, asset risk and share ownership."
      },
      "coreClaim": "Investment analysis uses evidence before judgement; shares are risky assets, not guaranteed-profit claims on a whole company.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "foundation-exit-ticket-and-short-explanation",
        "description": "one exit ticket plus a short explanation of why familiarity with Tencent is not enough reason to buy shares"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company investor source for Tencent identity",
          "local visual examples for analysis, assets and shares",
          "teacher-provided source/accessed details for classroom visuals where relevant"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "local classroom visual source with credit",
          "reputable source only when later evidence requires it"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL or local asset path",
          "publication date if available",
          "accessed date",
          "company/security identifier where relevant",
          "asset category used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "A familiar company is not automatically a good investment.",
          "A picture can make an asset concrete but cannot prove return or risk by itself.",
          "A qualitative risk ranking is a first model; exact risk depends on the specific asset, price, time horizon and evidence.",
          "A share is one ownership unit and does not guarantee profit, dividends or control of the whole company."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Explain",
        "marks": 4,
        "stimulusType": "short Tencent classroom prompt with asset-type visuals",
        "calculationRequirement": "No calculation; assess concept definitions, qualitative classification and simple explanation language.",
        "judgementRequirement": "Students explain why familiarity is not enough, separate investment from speculation, define assets and shares, and state that risk and evidence must be checked before choosing gather more evidence, watch, compare or avoid.",
        "mustAvoid": "Do not teach quote-page mechanics, percentage change, market capitalisation, valuation ratios, revenue/profit analysis, cash-flow analysis or unsupported personal buy/sell advice yet. Avoid stock tips, live-price dependence, market timing and personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Hook: ask students 'Would you buy shares in Tencent?' before definitions.",
          "Retrieval: activate first opinions about familiar companies and ask what analysis should do.",
          "Teach: define investment analysis as using evidence before judgement.",
          "Evidence practice: use Tencent and asset visuals to separate evidence, familiarity, investment and speculation.",
          "Output rehearsal: define asset, recall four asset types, rank them by risk and explain why the ranking is not fixed.",
          "Company practice: define a share as one ownership unit and classify what a share gives, may give and does not guarantee.",
          "Exit ticket: complete concise blanks on analysis, speculation, asset, risk and share."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Tencent company context, visual sources used, asset examples and one evidence limitation.",
            "expectedStudentWork": "A dated source/visual record plus one limit before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: investment analysis, investment, speculation, asset and share.",
            "expectedStudentWork": "Five concise definitions with Chinese support and one use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Tencent classroom prompt and asset-type visuals. Questions: 1. Identify/Define: Define investment analysis and asset. 2. Calculate/Interpret: Interpret a qualitative risk ranking. 3. Explain: Explain why familiarity with Tencent is not enough reason to buy shares. 4. Analyse why: Analyse why confusing investment with speculation weakens judgement. 5. Judge: Give a classroom verdict and choose the next action: gather evidence, watch, compare or avoid.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, interpret, explain, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Risk ranking judgement",
            "prompt": "Rank four asset types by risk and explain why exact risk depends on the asset.",
            "expectedStudentWork": "A ranked list plus one caveat sentence."
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Correct this claim: Tencent is familiar, so buying its shares is automatically a good investment.",
            "expectedStudentWork": "A correction sentence that replaces familiarity with evidence, risk and share-ownership thinking."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Complete the exit ticket and write one short Tencent explanation using Lesson 1 terms.",
            "expectedStudentWork": "one exit ticket plus one short explanation using investment analysis, asset, risk and share"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style concept/evidence stimulus followed by identify/define, interpret, explain, analyse why and evidence-based judgement questions for Tencent."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Tencent fits the entry lesson because students know the company but need to learn that familiarity is not investment analysis.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why confusing investment with speculation could weaken a judgement about Tencent shares.",
        "chain": [
          "Identify the weak habit: short-term price guess, familiarity or brand confidence.",
          "Link it to missing evidence, risk or what a share actually gives.",
          "Explain the investor implication: the judgement may overstate return or ignore risk."
        ],
        "expectedStudentWork": "A developed chain using one Lesson 1 concept, one missing-evidence point and one investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Knowing Tencent is enough reason to buy its shares.",
          "answer": "No",
          "explanation": "Correct the misconception by explaining that investment analysis needs evidence, risk thinking and a correct understanding of shares."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful first judgement about Tencent?",
          "options": [
            "Check evidence, risk and what the share gives before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Treat a short-term price movement as the full investment case.",
            "Treat possible dividends as guaranteed profit."
          ],
          "answer": "Check evidence, risk and what the share gives before judging."
        },
        "matching": {
          "prompt": "Match the Lesson 1 terms before using the Tencent case.",
          "pairs": [
            {
              "term": "investment analysis",
              "match": "using evidence before making an investment judgement."
            },
            {
              "term": "investment",
              "match": "aiming for future return while accepting risk."
            },
            {
              "term": "speculation",
              "match": "chasing short-term price movement with weaker evidence."
            },
            {
              "term": "asset",
              "match": "something with value that can be owned."
            },
            {
              "term": "share",
              "match": "one unit of ownership in a company."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, asset example and one limitation before using classroom evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Tencent classroom prompt with company context, source title, source date or accessed date, asset-type visuals and one limitation: familiarity and images are not enough evidence by themselves.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Define investment analysis and asset."
            },
            {
              "type": "calculate-interpret",
              "command": "Interpret",
              "prompt": "Interpret a qualitative risk ranking of cash/savings, property, shares and commodities."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain why knowing Tencent is not enough reason to buy its shares."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why confusing investment with speculation could weaken a judgement about Tencent shares."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your classroom verdict and choose the next investment action: is the current evidence enough, or should the student gather more evidence, watch, compare or avoid? Justify with Lesson 1 terms and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "First evidence-before-judgement action",
        "studentAction": "Before considering Tencent shares, define the asset, name the risk and state what evidence is still missing.",
        "decisionRule": "Do not treat familiarity, a short-term price guess or possible dividends as a complete investment case.",
        "portfolioQuestion": "Ask whether the evidence is strong enough to consider the share, or whether the next action is gather more evidence, watch, compare or avoid.",
        "classroomOutput": "Before I would consider Tencent shares, I need evidence beyond familiarity, a risk check and a correct understanding that one share is one ownership unit, not guaranteed profit."
      },
      "studentHook": "Would you buy shares in Tencent?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Would you buy shares in Tencent?"
        },
        {
          "label": "Key idea",
          "text": "Investment analysis uses evidence before judgement; speculation relies too much on short-term guesses."
        },
        {
          "label": "Try it",
          "text": "Classify assets, rank risk and explain what a share gives."
        },
        {
          "label": "Decide",
          "text": "State what evidence is still missing before judging Tencent shares."
        }
      ]
    },
    {
      "lesson": 2,
      "company": "HKEX",
      "guidingQuestion": "Why do companies need a stock market?",
      "guidingQuestionZh": "公司为什么需要股票市场？",
      "handoutMaterial": "Exchange lookup table, company-code-exchange matching task and a simple trading-friction prompt.",
      "formativeAssessment": "Hinge question: choose the correct role of a stock exchange in one trading scenario. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
      "exitTicket": "Complete one company-code-exchange row and name one trading friction.",
      "sequenceRole": "Market infrastructure bridge between one share and real trading.",
      "retrievalBase": "Lesson 1 investment-analysis purpose, investment-versus-speculation boundary, share ownership, risk-return and share price.",
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
          "definition": "A stock exchange is a regulated trading venue where investment instruments such as listed shares, ETFs and bonds can be bought and sold under market rules."
        },
        {
          "term": "listing",
          "zh": "上市",
          "definition": "A listing is the formal permission for a company's securities to trade on a stock exchange after the company meets the exchange's requirements."
        },
        {
          "term": "stock code",
          "zh": "股票代码",
          "definition": "A stock code is the short market identifier used to find a listed security on an exchange or market-data system."
        },
        {
          "term": "liquidity",
          "zh": "流动性",
          "definition": "Liquidity is the ability to trade an asset quickly, at relatively low cost and in meaningful quantities without causing a large price change."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short HKEX case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define stock exchange. 2. Calculate/Interpret: Interpret one figure or evidence statement from the case and state what it can and cannot prove. 3. Explain: Explain what one HKEX evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the HKEX case could change an investor's judgement about why do companies need a stock market. 5. Judge: Give your own evidence-based classroom verdict on HKEX: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen HKEX extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Why do companies need a stock market?",
        "mustAssess": "Company-code-exchange match and one sentence explaining why trading through a market is not frictionless. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 1 investment-analysis purpose, investment-versus-speculation boundary, share ownership, risk-return and share price.",
        "newKnowledge": "a stock exchange provides a regulated place where listed securities can be bought and sold; liquidity affects whether trading is easy or difficult.",
        "avoidOverlap": "keep order types, bid, ask, spread and quote-page reading for later use or Lesson 3; keep personal investing advice out of the lesson.",
        "misconception": "every stock-market purchase gives new money to the company, or a stock code is just decoration.",
        "evidenceTask": "use HKEX examples to identify company, exchange, stock code, listing and a simple trading friction.",
        "studentOutput": "a company-code-exchange match and one sentence explaining why trading through a market is not frictionless."
      },
      "coreClaim": "A stock exchange helps listed shares trade, but secondary-market trades do not automatically give new money to the company.",
      "caseRole": "exchange/infrastructure case",
      "primaryOutput": {
        "type": "matching-table",
        "description": "one company-code-exchange match plus one trading-friction sentence"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "exchange education/listing page",
          "stock-code example table",
          "dated trading-friction or liquidity note"
        ],
        "preferredSourceOrder": [
          "official exchange source",
          "company/listing examples",
          "secondary explanation only for classroom wording"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Identify and explain",
        "marks": 4,
        "stimulusType": "exchange or listing extract",
        "calculationRequirement": "No new calculation; assess evidence reading and judgement.",
        "judgementRequirement": "Company-code-exchange match and one sentence explaining why trading through a market is not frictionless. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Keep order types, bid, ask, spread and quote-page interpretation for later use or Lesson 3. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Before any trade happens, there is a market behind it. What does that market do?",
          "Hook: start with HKEX and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lesson 1 investment-analysis purpose, investment-versus-speculation boundary, share ownership, risk-return and share price.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new HKEX evidence.",
          "Teach: make students write the core claim: A stock exchange helps listed shares trade, but secondary-market trades do not automatically give new money to the company.",
          "Evidence practice: Use HKEX examples to identify company, exchange, code, listing and trading friction.",
          "Output rehearsal: students build one company-code-exchange match plus one trading-friction sentence.",
          "Analyse why: students build a data -> concept -> investor implication chain for HKEX.",
          "Investment action: students apply the decision rule - If the listing, code, trading venue or liquidity is unclear, the investment cannot be judged properly yet.",
          "Exit ticket: students submit Company-code-exchange match and one sentence explaining why trading through a market is not frictionless."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record HKEX source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: stock exchange, listing, stock code, liquidity.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short HKEX case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define stock exchange. 2. Calculate/Interpret: Interpret one figure or evidence statement from the case and state what it can and cannot prove. 3. Explain: Explain what one HKEX evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the HKEX case could change an investor's judgement about why do companies need a stock market. 5. Judge: Give your own evidence-based classroom verdict on HKEX: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Match companies to exchange, code and listing information, then name one reason real trading is not frictionless.",
            "expectedStudentWork": "one company-code-exchange match plus one trading-friction sentence"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Every market purchase gives new money to the company.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Company-code-exchange match and one sentence explaining why trading through a market is not frictionless.",
            "expectedStudentWork": "one company-code-exchange match plus one trading-friction sentence"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for HKEX."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the HKEX case could change an investor's judgement about why do companies need a stock market.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using HKEX evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Every market purchase gives new money to the company.",
          "answer": "No",
          "explanation": "Correct the misconception using HKEX evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about HKEX?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the HKEX case.",
          "pairs": [
            {
              "term": "stock exchange",
              "match": "a regulated market where listed securities can be bought and sold."
            },
            {
              "term": "listing",
              "match": "permission for a company's shares to trade on an exchange."
            },
            {
              "term": "stock code",
              "match": "the short market identifier used to find a listed security."
            },
            {
              "term": "liquidity",
              "match": "how easily an asset can be bought or sold without a large price change."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using HKEX evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short HKEX case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define stock exchange."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Interpret one figure or evidence statement from the case and state what it can and cannot prove."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one HKEX evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the HKEX case could change an investor's judgement about why do companies need a stock market."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on HKEX: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Market access action",
        "studentAction": "Find the exchange, stock code and basic market access information before analysing a listed company.",
        "decisionRule": "If the listing, code, trading venue or liquidity is unclear, the investment cannot be judged properly yet.",
        "portfolioQuestion": "Ask whether the investor understands where and how the security trades before comparing returns.",
        "classroomOutput": "I can identify the market route for HKEX-related shares and one friction that could affect buying or selling. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "Before any trade happens, there is a market behind it. What does that market do?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Before any trade happens, there is a market behind it. What does that market do?"
        },
        {
          "label": "Key idea",
          "text": "A stock exchange helps listed shares trade, but secondary-market trades do not automatically give new money to the company."
        },
        {
          "label": "Try it",
          "text": "one company-code-exchange match plus one trading-friction sentence"
        },
        {
          "label": "Decide",
          "text": "I can identify the market route for HKEX-related shares and one friction that could affect buying or selling. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 3,
      "company": "Alibaba",
      "guidingQuestion": "What can a stock quote tell us, and what is still missing?",
      "guidingQuestionZh": "股票报价能告诉我们什么，又缺少什么？",
      "handoutMaterial": "Annotated frozen quote page, bid/ask label task, read-only previous-close field, spread calculation box and quote-limit sentence frame.",
      "formativeAssessment": "Live label check: students identify bid, ask, volume and the date of the frozen quote. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "A quote page is a market-data snapshot showing information such as the latest price, price movement, bid, ask, volume and security identifier for a listed asset."
        },
        {
          "term": "volume",
          "zh": "成交量",
          "definition": "Volume is the number of shares or other securities traded during a stated period, such as a trading day."
        },
        {
          "term": "bid",
          "zh": "买价",
          "definition": "The bid is the price at which a buyer, dealer or trader is currently willing to buy a specified quantity of a security."
        },
        {
          "term": "ask",
          "zh": "卖价",
          "definition": "The ask is the price at which a seller, dealer or trader is currently willing to sell an asset, usually for a specified maximum quantity."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Alibaba case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define quote page. 2. Calculate/Interpret: Use or interpret the lesson formula: bid-ask spread = ask price - bid price; previous close is a read-only field for context. 3. Explain: Explain what one Alibaba evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Alibaba case could change an investor's judgement about what can a stock quote tell us, and what is still missing. 5. Judge: Give your own evidence-based classroom verdict on Alibaba: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Alibaba extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: What can a stock quote tell us, and what is still missing?",
        "mustAssess": "Labelled quote extract, spread calculation and quote-limit sentence. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 2 exchange, listing, stock code, liquidity and trading friction.",
        "newKnowledge": "a quote page is a market snapshot; bid, ask and volume answer different questions, while previous close and spread are used as source fields rather than extra vocabulary to memorise.",
        "avoidOverlap": "do not turn this into valuation; do not repeat exchange purpose except as the source of the quote.",
        "misconception": "the displayed price guarantees instant execution at exactly that price.",
        "evidenceTask": "label a frozen Alibaba quote page and separate facts the page proves from facts it cannot prove.",
        "studentOutput": "one labelled quote-page extract, one spread calculation and one sentence explaining the limit of a quote snapshot."
      },
      "coreClaim": "A quote page is a dated market snapshot, not a promise of execution price or investment value.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "quote-label-and-spread-calculation",
        "description": "one labelled quote extract, bid-ask spread calculation and quote-limit sentence"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "frozen quote page",
          "market data provider snapshot",
          "source-date note"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Calculate and explain",
        "marks": 4,
        "stimulusType": "frozen quote page",
        "calculationRequirement": "bid-ask spread = ask price - bid price; previous close is a read-only field for context.",
        "judgementRequirement": "Labelled quote extract, spread calculation and quote-limit sentence. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not make the quote page a valuation lesson. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: A quote page looks like a dashboard. Which numbers actually help an investor?",
          "Hook: start with Alibaba and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lesson 2 exchange, listing, stock code, liquidity and trading friction.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Alibaba evidence.",
          "Teach: make students write the core claim: A quote page is a dated market snapshot, not a promise of execution price or investment value.",
          "Evidence practice: Label a frozen Alibaba quote table and separate proved facts from missing information.",
          "Output rehearsal: students build one labelled quote extract, bid-ask spread calculation and quote-limit sentence.",
          "Analyse why: students build a data -> concept -> investor implication chain for Alibaba.",
          "Investment action: students apply the decision rule - A quote-page move is a prompt for investigation, not a buy or sell reason by itself.",
          "Exit ticket: students submit Labelled quote extract, spread calculation and quote-limit sentence."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Alibaba source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: quote page, volume, bid, ask.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Alibaba case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define quote page. 2. Calculate/Interpret: Use or interpret the lesson formula: bid-ask spread = ask price - bid price; previous close is a read-only field for context. 3. Explain: Explain what one Alibaba evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Alibaba case could change an investor's judgement about what can a stock quote tell us, and what is still missing. 5. Judge: Give your own evidence-based classroom verdict on Alibaba: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Label what a quote page proves, calculate the spread and explain what it cannot promise.",
            "expectedStudentWork": "one labelled quote extract, bid-ask spread calculation and quote-limit sentence"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "A displayed quote guarantees execution at exactly that price.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Labelled quote extract, spread calculation and quote-limit sentence.",
            "expectedStudentWork": "one labelled quote extract, bid-ask spread calculation and quote-limit sentence"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Alibaba."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Alibaba case could change an investor's judgement about what can a stock quote tell us, and what is still missing.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Alibaba evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: A displayed quote guarantees execution at exactly that price.",
          "answer": "No",
          "explanation": "Correct the misconception using Alibaba evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Alibaba?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Alibaba case.",
          "pairs": [
            {
              "term": "quote page",
              "match": "a market snapshot showing price and trading information."
            },
            {
              "term": "volume",
              "match": "the number of shares traded during a period."
            },
            {
              "term": "bid",
              "match": "the price buyers are currently willing to pay."
            },
            {
              "term": "ask",
              "match": "the price sellers are currently asking for."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Alibaba evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Alibaba case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define quote page."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: bid-ask spread = ask price - bid price; previous close is a read-only field for context."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Alibaba evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Alibaba case could change an investor's judgement about what can a stock quote tell us, and what is still missing."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Alibaba: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Quote-page action",
        "studentAction": "Read a stock quote as a snapshot: price, date/time, percentage change and what the quote does not prove.",
        "decisionRule": "A quote-page move is a prompt for investigation, not a buy or sell reason by itself.",
        "portfolioQuestion": "Ask whether a short-term price movement matters for the investor time horizon.",
        "classroomOutput": "I can use the Alibaba quote to say what changed, what is missing and what evidence I would check next. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "A quote page looks like a dashboard. Which numbers actually help an investor?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "A quote page looks like a dashboard. Which numbers actually help an investor?"
        },
        {
          "label": "Key idea",
          "text": "A quote page is a dated market snapshot, not a promise of execution price or investment value."
        },
        {
          "label": "Try it",
          "text": "one labelled quote extract, bid-ask spread calculation and quote-limit sentence"
        },
        {
          "label": "Decide",
          "text": "I can use the Alibaba quote to say what changed, what is missing and what evidence I would check next. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 4,
      "company": "Xiaomi",
      "guidingQuestion": "Does owning shares mean you control the company?",
      "guidingQuestionZh": "持有股票是否意味着控制公司？",
      "handoutMaterial": "Shareholder extract, ownership-percentage calculation grid and small-holder versus large-holder comparison table.",
      "formativeAssessment": "Pair comparison: one-share holder versus major shareholder, then vote on who has more influence. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Voting rights are shareholder rights to vote on certain company decisions, such as electing directors or approving major corporate actions."
        },
        {
          "term": "ordinary share",
          "zh": "普通股",
          "definition": "An ordinary share is a standard equity share in a company that usually carries voting rights and may receive dividends after higher-priority claims are considered."
        },
        {
          "term": "control",
          "zh": "控制权",
          "definition": "Control is the ability to influence or decide company actions, usually through ownership, voting power, board influence or management authority."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Xiaomi case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define voting rights. 2. Calculate/Interpret: Use or interpret the lesson formula: ownership % = shares owned / total shares x 100. 3. Explain: Explain what one Xiaomi evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Xiaomi case could change an investor's judgement about does owning shares mean you control the company. 5. Judge: Give your own evidence-based classroom verdict on Xiaomi: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Xiaomi extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Does owning shares mean you control the company?",
        "mustAssess": "Ownership-percentage calculation and small-holder versus large-holder comparison. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 1 ownership-unit meaning and Lesson 2 listing identity.",
        "newKnowledge": "ownership size affects voting influence; ordinary shareholders have ownership claims, but control depends on scale and rights.",
        "avoidOverlap": "avoid detailed corporate governance and board structures; keep the calculation to ownership percentage.",
        "misconception": "owning one share means controlling or owning the whole company.",
        "evidenceTask": "read a Xiaomi shareholder or share-capital extract and identify total shares, shares owned and percentage ownership.",
        "studentOutput": "one ownership-percentage calculation and a comparison between a small shareholder and a large holder."
      },
      "coreClaim": "A share is an ownership claim, but control depends on ownership size and shareholder rights.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "ownership-percentage-calculation",
        "description": "one ownership-percentage calculation and small-holder versus large-holder comparison"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Calculate and explain",
        "marks": 4,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "ownership % = shares owned / total shares x 100.",
        "judgementRequirement": "Ownership-percentage calculation and small-holder versus large-holder comparison. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Avoid detailed corporate governance and board structures. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: If you buy one share of a phone maker, how much power do you really get?",
          "Hook: start with Xiaomi and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lesson 1 ownership-unit meaning and Lesson 2 listing identity.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Xiaomi evidence.",
          "Teach: make students write the core claim: A share is an ownership claim, but control depends on ownership size and shareholder rights.",
          "Evidence practice: Read a Xiaomi shareholder or share-capital extract and identify total shares and shares owned.",
          "Output rehearsal: students build one ownership-percentage calculation and small-holder versus large-holder comparison.",
          "Analyse why: students build a data -> concept -> investor implication chain for Xiaomi.",
          "Investment action: students apply the decision rule - Do not assume that buying a share gives control over the company.",
          "Exit ticket: students submit Ownership-percentage calculation and small-holder versus large-holder comparison."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Xiaomi source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: voting rights, ordinary share, control.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Xiaomi case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define voting rights. 2. Calculate/Interpret: Use or interpret the lesson formula: ownership % = shares owned / total shares x 100. 3. Explain: Explain what one Xiaomi evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Xiaomi case could change an investor's judgement about does owning shares mean you control the company. 5. Judge: Give your own evidence-based classroom verdict on Xiaomi: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Compare a tiny shareholder with a large holder and explain who has more influence.",
            "expectedStudentWork": "one ownership-percentage calculation and small-holder versus large-holder comparison"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Owning one share means controlling or owning the whole company.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Ownership-percentage calculation and small-holder versus large-holder comparison.",
            "expectedStudentWork": "one ownership-percentage calculation and small-holder versus large-holder comparison"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Xiaomi."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Xiaomi case could change an investor's judgement about does owning shares mean you control the company.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Xiaomi evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Owning one share means controlling or owning the whole company.",
          "answer": "No",
          "explanation": "Correct the misconception using Xiaomi evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Xiaomi?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Xiaomi case.",
          "pairs": [
            {
              "term": "voting rights",
              "match": "shareholder rights to vote on certain company decisions."
            },
            {
              "term": "ordinary share",
              "match": "a standard ownership share in a company."
            },
            {
              "term": "control",
              "match": "the ability to influence or decide company actions."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Xiaomi evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Xiaomi case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define voting rights."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: ownership % = shares owned / total shares x 100."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Xiaomi evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Xiaomi case could change an investor's judgement about does owning shares mean you control the company."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Xiaomi: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Shareholder-rights action",
        "studentAction": "Check what owning one share actually gives: economic exposure, possible voting rights and limits on control.",
        "decisionRule": "Do not assume that buying a share gives control over the company.",
        "portfolioQuestion": "Ask whether the investor wants ownership exposure, income, control or speculation.",
        "classroomOutput": "I can explain what a Xiaomi shareholder owns and what one share does not allow them to control. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "If you buy one share of a phone maker, how much power do you really get?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "If you buy one share of a phone maker, how much power do you really get?"
        },
        {
          "label": "Key idea",
          "text": "A share is an ownership claim, but control depends on ownership size and shareholder rights."
        },
        {
          "label": "Try it",
          "text": "one ownership-percentage calculation and small-holder versus large-holder comparison"
        },
        {
          "label": "Decide",
          "text": "I can explain what a Xiaomi shareholder owns and what one share does not allow them to control. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 5,
      "company": "JD.com",
      "guidingQuestion": "How can one analyst collect evidence before judging a share?",
      "guidingQuestionZh": "分析者如何在判断股票前收集证据？",
      "handoutMaterial": "Evidence-log template, source reliability checklist, information-expectations-price chain and what-the-evidence-cannot-prove prompt.",
      "formativeAssessment": "Source-quality quick check: students flag missing date, URL, figure, limitation or causal link. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "An evidence log is a structured record of sources, dates, figures, notes and limitations used to support an investment judgement."
        },
        {
          "term": "source date",
          "zh": "来源日期",
          "definition": "A source date is the date on which evidence was published, reported or measured."
        },
        {
          "term": "accessed date",
          "zh": "访问日期",
          "definition": "An accessed date is the date on which the analyst viewed or used a source."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short JD.com case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define evidence log. 2. Calculate/Interpret: Interpret one figure or evidence statement from the case and state what it can and cannot prove. 3. Explain: Explain what one JD.com evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the JD.com case could change an investor's judgement about how can one analyst collect evidence before judging a share. 5. Judge: Give your own evidence-based classroom verdict on JD.com: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen JD.com extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: How can one analyst collect evidence before judging a share?",
        "mustAssess": "Individual evidence-log row plus one limited price-movement explanation using information, expectations and price. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lessons 1-4 company identity, price meaning, exchange source and ownership claims.",
        "newKnowledge": "evidence must be recorded with source title, source URL, publication date, accessed date, figure, use and limitation; price movement should be explained through information, expectations, buying/selling pressure and price.",
        "avoidOverlap": "do not add new financial ratios; this is the first checkpoint for source discipline.",
        "misconception": "a screenshot, number or company claim is reliable enough without date, source and limitation, or a price movement explains itself.",
        "evidenceTask": "turn JD.com investor-relations evidence and one dated price or news claim into a clean log row.",
        "studentOutput": "one individual evidence-log row and one limited price-movement explanation using information, expectations and price."
      },
      "coreClaim": "Useful evidence records source, date, figure, use and limitation before explaining a price movement.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "evidence-log-row",
        "description": "one complete evidence-log row plus one limited price-movement explanation"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Compare",
        "marks": 4,
        "stimulusType": "short company evidence extract",
        "calculationRequirement": "No new calculation; assess evidence reading and judgement.",
        "judgementRequirement": "Individual evidence-log row plus one limited price-movement explanation using information, expectations and price. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not add new ratios or recommendations. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: A headline says the share moved. Can you build an evidence file before reacting?",
          "Hook: start with JD.com and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lessons 1-4 company identity, price meaning, exchange source and ownership claims.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new JD.com evidence.",
          "Teach: make students write the core claim: Useful evidence records source, date, figure, use and limitation before explaining a price movement.",
          "Evidence practice: Convert JD.com investor-relations material and one dated price or news claim into a clean classroom evidence row.",
          "Output rehearsal: students build one complete evidence-log row plus one limited price-movement explanation.",
          "Analyse why: students build a data -> concept -> investor implication chain for JD.com.",
          "Investment action: students apply the decision rule - No dated source and no limitation means the judgement is not ready.",
          "Exit ticket: students submit Individual evidence-log row plus one limited price-movement explanation using information, expectations and price."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record JD.com source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: evidence log, source date, accessed date.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short JD.com case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define evidence log. 2. Calculate/Interpret: Interpret one figure or evidence statement from the case and state what it can and cannot prove. 3. Explain: Explain what one JD.com evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the JD.com case could change an investor's judgement about how can one analyst collect evidence before judging a share. 5. Judge: Give your own evidence-based classroom verdict on JD.com: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "You complete one individual evidence log row and one limited price-movement explanation without making a recommendation.",
            "expectedStudentWork": "one complete evidence-log row plus one limited price-movement explanation"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "A screenshot or number is enough without source date and limitation, or a price move explains itself without evidence.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Individual evidence-log row plus one limited price-movement explanation using information, expectations and price.",
            "expectedStudentWork": "one complete evidence-log row plus one limited price-movement explanation"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for JD.com."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the JD.com case could change an investor's judgement about how can one analyst collect evidence before judging a share.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using JD.com evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: A screenshot or number is enough without source date and limitation, or a price move explains itself without evidence.",
          "answer": "No",
          "explanation": "Correct the misconception using JD.com evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about JD.com?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the JD.com case.",
          "pairs": [
            {
              "term": "evidence log",
              "match": "a structured record of sources, dates, figures and notes."
            },
            {
              "term": "source date",
              "match": "the date when evidence was published."
            },
            {
              "term": "accessed date",
              "match": "the date when you used the evidence."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using JD.com evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short JD.com case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define evidence log."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Interpret one figure or evidence statement from the case and state what it can and cannot prove."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one JD.com evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the JD.com case could change an investor's judgement about how can one analyst collect evidence before judging a share."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on JD.com: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Evidence-log action",
        "studentAction": "Build an investment evidence log before judging a share: source, date, figure, claim and limitation.",
        "decisionRule": "No dated source and no limitation means the judgement is not ready.",
        "portfolioQuestion": "Ask whether the evidence is enough for a watch, avoid or gather-more-evidence action.",
        "classroomOutput": "I can produce a JD.com evidence log and a short next action based on evidence quality. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "A headline says the share moved. Can you build an evidence file before reacting?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "A headline says the share moved. Can you build an evidence file before reacting?"
        },
        {
          "label": "Key idea",
          "text": "Useful evidence records source, date, figure, use and limitation before explaining a price movement."
        },
        {
          "label": "Try it",
          "text": "one complete evidence-log row plus one limited price-movement explanation"
        },
        {
          "label": "Decide",
          "text": "I can produce a JD.com evidence log and a short next action based on evidence quality. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 6,
      "company": "Meituan",
      "guidingQuestion": "Does high revenue mean a company is strong?",
      "guidingQuestionZh": "高收入是否意味着公司很强？",
      "handoutMaterial": "Revenue table or segment extract, growth calculation box and revenue-is-not-profit explanation prompt.",
      "formativeAssessment": "Hinge question: choose whether a figure proves sales, profit, cash or valuation. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Revenue is the amount charged or earned from delivering goods or services in the ordinary activities of a business over a stated period, before expenses are deducted."
        },
        {
          "term": "sales growth",
          "zh": "销售增长",
          "definition": "Sales growth is the increase in a company's revenue over time, usually measured as a percentage change between two periods."
        },
        {
          "term": "business model",
          "zh": "商业模式",
          "definition": "A business model is the way a company creates value, earns revenue, pays costs and turns customer demand into profit or cash flow."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Meituan case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define revenue. 2. Calculate/Interpret: Use or interpret the lesson formula: revenue growth = (new revenue - old revenue) / old revenue x 100. 3. Explain: Explain what one Meituan evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Meituan case could change an investor's judgement about does high revenue mean a company is strong. 5. Judge: Give your own evidence-based classroom verdict on Meituan: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Meituan extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Does high revenue mean a company is strong?",
        "mustAssess": "Revenue-growth calculation and limitation sentence. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 5 evidence logging and Lesson 1 rule that evidence is not yet investment judgement.",
        "newKnowledge": "revenue measures sales before costs; revenue growth must be linked to business model and later cost/profit evidence.",
        "avoidOverlap": "do not teach gross margin or cash flow yet; mention costs only as the missing next step.",
        "misconception": "high revenue automatically means a strong or profitable company.",
        "evidenceTask": "read Meituan revenue by year or segment and calculate revenue growth with the old figure as the base.",
        "studentOutput": "one revenue-growth calculation and one limitation sentence: revenue shows scale, not profit."
      },
      "coreClaim": "Revenue shows sales scale, not profit strength or investment quality by itself.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "revenue-growth-calculation",
        "description": "one revenue-growth calculation and one limitation sentence"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Calculate and explain",
        "marks": 4,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "revenue growth = (new revenue - old revenue) / old revenue x 100.",
        "judgementRequirement": "Revenue-growth calculation and limitation sentence. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not teach gross margin or cash flow yet. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: A company can sell a lot and still struggle. What is missing from revenue?",
          "Hook: start with Meituan and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lesson 5 evidence logging and Lesson 1 rule that evidence is not yet investment judgement.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Meituan evidence.",
          "Teach: make students write the core claim: Revenue shows sales scale, not profit strength or investment quality by itself.",
          "Evidence practice: Read Meituan revenue by year or segment and calculate growth from the old base.",
          "Output rehearsal: students build one revenue-growth calculation and one limitation sentence.",
          "Analyse why: students build a data -> concept -> investor implication chain for Meituan.",
          "Investment action: students apply the decision rule - High revenue alone is not strength unless margins, cash, costs and risks are considered later.",
          "Exit ticket: students submit Revenue-growth calculation and limitation sentence."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Meituan source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: revenue, sales growth, business model.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Meituan case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define revenue. 2. Calculate/Interpret: Use or interpret the lesson formula: revenue growth = (new revenue - old revenue) / old revenue x 100. 3. Explain: Explain what one Meituan evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Meituan case could change an investor's judgement about does high revenue mean a company is strong. 5. Judge: Give your own evidence-based classroom verdict on Meituan: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Explain why high revenue alone does not prove high profit.",
            "expectedStudentWork": "one revenue-growth calculation and one limitation sentence"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "High revenue automatically means strong or profitable.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Revenue-growth calculation and limitation sentence.",
            "expectedStudentWork": "one revenue-growth calculation and one limitation sentence"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Meituan."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Meituan case could change an investor's judgement about does high revenue mean a company is strong.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Meituan evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: High revenue automatically means strong or profitable.",
          "answer": "No",
          "explanation": "Correct the misconception using Meituan evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Meituan?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Meituan case.",
          "pairs": [
            {
              "term": "revenue",
              "match": "income earned from selling goods or services before costs are deducted."
            },
            {
              "term": "sales growth",
              "match": "the increase in revenue over time."
            },
            {
              "term": "business model",
              "match": "how a company earns revenue and delivers value."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Meituan evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Meituan case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define revenue."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: revenue growth = (new revenue - old revenue) / old revenue x 100."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Meituan evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Meituan case could change an investor's judgement about does high revenue mean a company is strong."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Meituan: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Revenue-check action",
        "studentAction": "Start company analysis by checking what revenue measures and whether growth is actually useful evidence.",
        "decisionRule": "High revenue alone is not strength unless margins, cash, costs and risks are considered later.",
        "portfolioQuestion": "Ask whether the investor is buying growth, profit quality or an uncertain story.",
        "classroomOutput": "I can say whether Meituan revenue evidence is encouraging, weak or incomplete. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "A company can sell a lot and still struggle. What is missing from revenue?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "A company can sell a lot and still struggle. What is missing from revenue?"
        },
        {
          "label": "Key idea",
          "text": "Revenue shows sales scale, not profit strength or investment quality by itself."
        },
        {
          "label": "Try it",
          "text": "one revenue-growth calculation and one limitation sentence"
        },
        {
          "label": "Decide",
          "text": "I can say whether Meituan revenue evidence is encouraging, weak or incomplete. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 7,
      "company": "BYD",
      "guidingQuestion": "Can sales rise while costs become a problem?",
      "guidingQuestionZh": "销售增长时，成本会不会成为问题？",
      "handoutMaterial": "Financial extract table, gross-profit calculation steps, gross-margin calculation grid and margin interpretation line.",
      "formativeAssessment": "Worked-example check: students choose the correct numerator and denominator for gross margin. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Cost of sales is the cost directly connected with the goods or services sold in a period; for inventory businesses, it is closely related to cost of goods sold."
        },
        {
          "term": "gross profit",
          "zh": "毛利",
          "definition": "Gross profit is revenue or sales minus cost of sales, before operating expenses, financing costs and taxes are deducted."
        },
        {
          "term": "gross margin",
          "zh": "毛利率",
          "definition": "Gross margin is gross profit divided by revenue and expressed as a percentage, showing how much of each unit of sales remains after direct costs."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short BYD case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define cost of sales. 2. Calculate/Interpret: Use or interpret the lesson formula: gross profit = revenue - cost of sales; gross margin = gross profit / revenue x 100. 3. Explain: Explain what one BYD evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the BYD case could change an investor's judgement about can sales rise while costs become a problem. 5. Judge: Give your own evidence-based classroom verdict on BYD: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen BYD extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Can sales rise while costs become a problem?",
        "mustAssess": "Gross-profit and gross-margin calculation with a margin interpretation. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 6 revenue and the question of what revenue misses.",
        "newKnowledge": "direct costs reduce revenue into gross profit; gross margin shows how much of each sales unit remains after direct costs.",
        "avoidOverlap": "do not introduce operating profit, net profit or free cash flow; those come later.",
        "misconception": "rising sales always mean the company is becoming stronger.",
        "evidenceTask": "use BYD revenue and cost-of-sales figures to calculate gross profit and gross margin.",
        "studentOutput": "one completed margin calculation and one explanation of why a margin can matter more than raw sales."
      },
      "coreClaim": "Rising sales can hide cost pressure, so gross profit and gross margin show what remains after direct costs.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "margin-calculation",
        "description": "one gross-profit and gross-margin calculation with interpretation"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Calculate and explain",
        "marks": 4,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "gross profit = revenue - cost of sales; gross margin = gross profit / revenue x 100.",
        "judgementRequirement": "Gross-profit and gross-margin calculation with a margin interpretation. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not introduce operating profit, net profit or free cash flow. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Sales can race ahead while costs catch up. Would investors still be happy?",
          "Hook: start with BYD and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lesson 6 revenue and the question of what revenue misses.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new BYD evidence.",
          "Teach: make students write the core claim: Rising sales can hide cost pressure, so gross profit and gross margin show what remains after direct costs.",
          "Evidence practice: Use BYD revenue and cost-of-sales figures to calculate gross profit and margin.",
          "Output rehearsal: students build one gross-profit and gross-margin calculation with interpretation.",
          "Analyse why: students build a data -> concept -> investor implication chain for BYD.",
          "Investment action: students apply the decision rule - Sales growth is not enough if costs rise faster or margins deteriorate.",
          "Exit ticket: students submit Gross-profit and gross-margin calculation with a margin interpretation."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record BYD source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: cost of sales, gross profit, gross margin.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short BYD case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define cost of sales. 2. Calculate/Interpret: Use or interpret the lesson formula: gross profit = revenue - cost of sales; gross margin = gross profit / revenue x 100. 3. Explain: Explain what one BYD evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the BYD case could change an investor's judgement about can sales rise while costs become a problem. 5. Judge: Give your own evidence-based classroom verdict on BYD: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Calculate gross profit and explain why margin matters.",
            "expectedStudentWork": "one gross-profit and gross-margin calculation with interpretation"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Sales growth always means the business is becoming stronger.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Gross-profit and gross-margin calculation with a margin interpretation.",
            "expectedStudentWork": "one gross-profit and gross-margin calculation with interpretation"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for BYD."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the BYD case could change an investor's judgement about can sales rise while costs become a problem.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using BYD evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Sales growth always means the business is becoming stronger.",
          "answer": "No",
          "explanation": "Correct the misconception using BYD evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about BYD?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the BYD case.",
          "pairs": [
            {
              "term": "cost of sales",
              "match": "direct costs linked to producing or delivering goods and services."
            },
            {
              "term": "gross profit",
              "match": "revenue left after direct costs are deducted."
            },
            {
              "term": "gross margin",
              "match": "gross profit as a percentage of revenue."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using BYD evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short BYD case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define cost of sales."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: gross profit = revenue - cost of sales; gross margin = gross profit / revenue x 100."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one BYD evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the BYD case could change an investor's judgement about can sales rise while costs become a problem."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on BYD: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Cost-pressure action",
        "studentAction": "Check whether rising sales are being absorbed by direct costs or lower gross profit.",
        "decisionRule": "Sales growth is not enough if costs rise faster or margins deteriorate.",
        "portfolioQuestion": "Ask whether the investor is being paid for cost and margin risk.",
        "classroomOutput": "I can use BYD figures to decide whether the cost story needs watch, concern or more evidence."
      },
      "studentHook": "Sales can race ahead while costs catch up. Would investors still be happy?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Sales can race ahead while costs catch up. Would investors still be happy?"
        },
        {
          "label": "Key idea",
          "text": "Rising sales can hide cost pressure, so gross profit and gross margin show what remains after direct costs."
        },
        {
          "label": "Try it",
          "text": "one gross-profit and gross-margin calculation with interpretation"
        },
        {
          "label": "Decide",
          "text": "I can use BYD figures to decide whether the cost story needs watch, concern or more evidence."
        }
      ]
    },
    {
      "lesson": 8,
      "company": "CATL",
      "guidingQuestion": "Which company turns sales into profit more efficiently?",
      "guidingQuestionZh": "哪家公司更有效地把销售转化为利润？",
      "handoutMaterial": "Aligned comparison table, operating-margin difference calculation and one-sentence comparison scaffold.",
      "formativeAssessment": "Mini-whiteboard comparison: students identify whether a difference is percentage points or percent. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Operating profit is profit from a company's usual business activities before taxes and before some financing effects are deducted; it is also called operating income."
        },
        {
          "term": "operating margin",
          "zh": "营业利润率",
          "definition": "Operating margin is a profitability ratio calculated as operating income or operating profit divided by revenue."
        },
        {
          "term": "percentage-point difference",
          "zh": "百分点差异",
          "definition": "A percentage-point difference is the arithmetic difference between two percentages, not a percentage change."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short CATL case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define operating profit. 2. Calculate/Interpret: Use or interpret the lesson formula: margin difference = margin A - margin B, measured in percentage points. 3. Explain: Explain what one CATL evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the CATL case could change an investor's judgement about which company turns sales into profit more efficiently. 5. Judge: Give your own evidence-based classroom verdict on CATL: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen CATL extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Which company turns sales into profit more efficiently?",
        "mustAssess": "Fair comparison sentence naming metric, direction and percentage-point difference. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 7 gross profit and gross margin.",
        "newKnowledge": "comparison requires the same metric, period and source type; students distinguish gross margin from operating margin before using percentage-point differences.",
        "avoidOverlap": "do not reteach revenue growth except as a contrast to efficiency; do not treat all margins as the same metric; keep cash-flow comparison for Lesson 9.",
        "misconception": "the company with higher revenue is automatically more efficient.",
        "evidenceTask": "compare CATL margin data with one aligned company, year or benchmark.",
        "studentOutput": "one fair comparison sentence naming the metric, direction and percentage-point difference."
      },
      "coreClaim": "Efficiency comparison needs aligned metrics, time periods and percentage-point discipline.",
      "caseRole": "comparison case",
      "primaryOutput": {
        "type": "margin-comparison-sentence",
        "description": "one fair comparison sentence naming metric, direction and percentage-point difference"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Compare",
        "marks": 4,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "margin difference = margin A - margin B, measured in percentage points.",
        "judgementRequirement": "Fair comparison sentence naming metric, direction and percentage-point difference. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not reteach revenue growth except as contrast to efficiency; do not treat all margins as the same metric. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Two battery companies can both grow. Which one keeps more profit from sales?",
          "Hook: start with CATL and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lesson 7 gross profit and gross margin.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new CATL evidence.",
          "Teach: make students write the core claim: Efficiency comparison needs aligned metrics, time periods and percentage-point discipline.",
          "Evidence practice: Compare CATL margin data with one aligned company, period or benchmark.",
          "Output rehearsal: students build one fair comparison sentence naming metric, direction and percentage-point difference.",
          "Analyse why: students build a data -> concept -> investor implication chain for CATL.",
          "Investment action: students apply the decision rule - Prefer a company only when the comparison uses the same metric, time period and source discipline.",
          "Exit ticket: students submit Fair comparison sentence naming metric, direction and percentage-point difference."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record CATL source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: operating profit, operating margin, percentage-point difference.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short CATL case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define operating profit. 2. Calculate/Interpret: Use or interpret the lesson formula: margin difference = margin A - margin B, measured in percentage points. 3. Explain: Explain what one CATL evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the CATL case could change an investor's judgement about which company turns sales into profit more efficiently. 5. Judge: Give your own evidence-based classroom verdict on CATL: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "You state which business is more efficient and support it with a margin figure.",
            "expectedStudentWork": "one fair comparison sentence naming metric, direction and percentage-point difference"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "The higher-revenue company is automatically more efficient.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Fair comparison sentence naming metric, direction and percentage-point difference.",
            "expectedStudentWork": "one fair comparison sentence naming metric, direction and percentage-point difference"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for CATL."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the CATL case could change an investor's judgement about which company turns sales into profit more efficiently.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using CATL evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: The higher-revenue company is automatically more efficient.",
          "answer": "No",
          "explanation": "Correct the misconception using CATL evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about CATL?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the CATL case.",
          "pairs": [
            {
              "term": "operating profit",
              "match": "profit from the company's main operations before some finance and tax items."
            },
            {
              "term": "operating margin",
              "match": "operating profit as a percentage of revenue."
            },
            {
              "term": "percentage-point difference",
              "match": "subtraction between two percentages."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using CATL evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short CATL case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define operating profit."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: margin difference = margin A - margin B, measured in percentage points."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one CATL evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the CATL case could change an investor's judgement about which company turns sales into profit more efficiently."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on CATL: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Margin-comparison action",
        "studentAction": "Compare how efficiently companies turn sales into profit by using margin evidence.",
        "decisionRule": "Prefer a company only when the comparison uses the same metric, time period and source discipline.",
        "portfolioQuestion": "Ask whether the investor wants a higher-quality business or a cheaper but weaker one.",
        "classroomOutput": "I can compare CATL margin evidence and state which company looks stronger on efficiency."
      },
      "studentHook": "Two battery companies can both grow. Which one keeps more profit from sales?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Two battery companies can both grow. Which one keeps more profit from sales?"
        },
        {
          "label": "Key idea",
          "text": "Efficiency comparison needs aligned metrics, time periods and percentage-point discipline."
        },
        {
          "label": "Try it",
          "text": "one fair comparison sentence naming metric, direction and percentage-point difference"
        },
        {
          "label": "Decide",
          "text": "I can compare CATL margin evidence and state which company looks stronger on efficiency."
        }
      ]
    },
    {
      "lesson": 9,
      "company": "Tesla",
      "guidingQuestion": "Why can a growing company still need cash?",
      "guidingQuestionZh": "为什么成长中的公司仍然可能需要现金？",
      "handoutMaterial": "Cash-flow extract, free-cash-flow calculation desk and profit-versus-cash explanation prompt.",
      "formativeAssessment": "Card sort: profit signal, cash-flow signal or investment-spending signal. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Operating cash flow is the net amount of cash provided by or used in a company's operating activities during a period."
        },
        {
          "term": "capital expenditure",
          "zh": "资本支出",
          "definition": "Capital expenditure is spending on physical or long-term fixed assets such as property, factories, equipment, technology infrastructure or stores."
        },
        {
          "term": "free cash flow",
          "zh": "自由现金流",
          "definition": "Free cash flow is cash available to a company's investors after the company has made the investments needed to maintain itself as an ongoing business."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Tesla case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define operating cash flow. 2. Calculate/Interpret: Use or interpret the lesson formula: free cash flow = operating cash flow - capital expenditure. 3. Explain: Explain what one Tesla evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Tesla case could change an investor's judgement about why can a growing company still need cash. 5. Judge: Give your own evidence-based classroom verdict on Tesla: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Tesla extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Why can a growing company still need cash?",
        "mustAssess": "Free-cash-flow calculation and profit-versus-cash explanation. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lessons 6-8 revenue, profit and margin evidence.",
        "newKnowledge": "operating cash flow and profit answer different questions; capital expenditure can make a growing company need cash.",
        "avoidOverlap": "do not teach a full cash-flow statement or working-capital detail; keep the lesson to operating cash flow, capital expenditure and free cash flow.",
        "misconception": "a profitable company must have plenty of cash available.",
        "evidenceTask": "read Tesla operating cash flow and capital expenditure from a filed extract.",
        "studentOutput": "one free-cash-flow calculation and one sentence explaining why profit and cash can disagree."
      },
      "coreClaim": "Profit and cash flow answer different questions, and growth can still require cash investment.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "free-cash-flow-calculation",
        "description": "one free-cash-flow calculation and profit-versus-cash explanation"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Calculate and explain",
        "marks": 4,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "free cash flow = operating cash flow - capital expenditure.",
        "judgementRequirement": "Free-cash-flow calculation and profit-versus-cash explanation. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not teach a full cash-flow statement or working-capital detail. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Growth stories sound exciting. Why might cash still be the problem?",
          "Hook: start with Tesla and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lessons 6-8 revenue, profit and margin evidence.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Tesla evidence.",
          "Teach: make students write the core claim: Profit and cash flow answer different questions, and growth can still require cash investment.",
          "Evidence practice: Read Tesla operating cash flow and capital expenditure from a filed extract.",
          "Output rehearsal: students build one free-cash-flow calculation and profit-versus-cash explanation.",
          "Analyse why: students build a data -> concept -> investor implication chain for Tesla.",
          "Investment action: students apply the decision rule - Growth funded by heavy cash needs may raise investment risk even when revenue looks strong.",
          "Exit ticket: students submit Free-cash-flow calculation and profit-versus-cash explanation."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Tesla source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: operating cash flow, capital expenditure, free cash flow.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Tesla case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define operating cash flow. 2. Calculate/Interpret: Use or interpret the lesson formula: free cash flow = operating cash flow - capital expenditure. 3. Explain: Explain what one Tesla evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Tesla case could change an investor's judgement about why can a growing company still need cash. 5. Judge: Give your own evidence-based classroom verdict on Tesla: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Explain why profit and cash flow can send different signals.",
            "expectedStudentWork": "one free-cash-flow calculation and profit-versus-cash explanation"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Profit means the company has plenty of available cash.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Free-cash-flow calculation and profit-versus-cash explanation.",
            "expectedStudentWork": "one free-cash-flow calculation and profit-versus-cash explanation"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Tesla."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Tesla case could change an investor's judgement about why can a growing company still need cash.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Tesla evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Profit means the company has plenty of available cash.",
          "answer": "No",
          "explanation": "Correct the misconception using Tesla evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Tesla?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Tesla case.",
          "pairs": [
            {
              "term": "operating cash flow",
              "match": "cash generated by the company's main business operations."
            },
            {
              "term": "capital expenditure",
              "match": "cash spent on long-term assets such as factories, equipment or infrastructure."
            },
            {
              "term": "free cash flow",
              "match": "operating cash flow left after capital expenditure."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Tesla evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Tesla case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define operating cash flow."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: free cash flow = operating cash flow - capital expenditure."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Tesla evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Tesla case could change an investor's judgement about why can a growing company still need cash."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Tesla: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Cash-quality action",
        "studentAction": "Check whether a growing company also produces or consumes cash.",
        "decisionRule": "Growth funded by heavy cash needs may raise investment risk even when revenue looks strong.",
        "portfolioQuestion": "Ask whether the investor can tolerate a company that needs cash before returns arrive.",
        "classroomOutput": "I can judge whether Tesla growth evidence is supported or weakened by cash-flow evidence. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "Growth stories sound exciting. Why might cash still be the problem?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Growth stories sound exciting. Why might cash still be the problem?"
        },
        {
          "label": "Key idea",
          "text": "Profit and cash flow answer different questions, and growth can still require cash investment."
        },
        {
          "label": "Try it",
          "text": "one free-cash-flow calculation and profit-versus-cash explanation"
        },
        {
          "label": "Decide",
          "text": "I can judge whether Tesla growth evidence is supported or weakened by cash-flow evidence. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 10,
      "company": "TSMC",
      "guidingQuestion": "What makes one strong company look stronger than another?",
      "guidingQuestionZh": "什么让一家强公司看起来比另一家更强？",
      "handoutMaterial": "Side-by-side comparison matrix, same-metric checklist and balanced paragraph planner.",
      "formativeAssessment": "Comparison audit: students mark whether two figures use the same metric, period and source type. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "A benchmark is a standard or point of reference used to evaluate investment, portfolio or company performance."
        },
        {
          "term": "trend",
          "zh": "趋势",
          "definition": "A trend is a longer-term pattern of movement in a particular direction, such as rising, falling or remaining broadly stable."
        },
        {
          "term": "scale",
          "zh": "规模",
          "definition": "Scale is the size of a company or activity, measured by figures such as revenue, users, stores, assets or market value."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short TSMC case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define benchmark. 2. Calculate/Interpret: Use or interpret the lesson formula: compare growth, margin and scale side by side; no single new formula. 3. Explain: Explain what one TSMC evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the TSMC case could change an investor's judgement about what makes one strong company look stronger than another. 5. Judge: Give your own evidence-based classroom verdict on TSMC: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen TSMC extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: What makes one strong company look stronger than another?",
        "mustAssess": "Scale-trend-margin-cash comparison paragraph using at least one figure from each company. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Unit 2 revenue, costs, margin, cash flow and evidence discipline.",
        "newKnowledge": "strong company comparison needs scale, trend and margin side by side rather than one isolated figure.",
        "avoidOverlap": "do not introduce new formulas; this is a consolidation and exam-preparation lesson.",
        "misconception": "one impressive number proves which company is stronger.",
        "evidenceTask": "build a TSMC comparison table using the same metric categories for both sides.",
        "studentOutput": "one scale-trend-margin-cash comparison paragraph that uses at least one figure from each company."
      },
      "coreClaim": "A fair strong-company comparison uses aligned evidence about scale, trend, margin and cash.",
      "caseRole": "comparison case",
      "primaryOutput": {
        "type": "comparison-paragraph",
        "description": "one scale-trend-margin-cash comparison paragraph using figures from both sides"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Compare",
        "marks": 6,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "compare growth, margin and scale side by side; no single new formula.",
        "judgementRequirement": "Scale-trend-margin-cash comparison paragraph using at least one figure from each company. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "No new formula; keep it as consolidation and exam preparation. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Two excellent companies enter the comparison. What makes one look stronger?",
          "Hook: start with TSMC and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Unit 2 revenue, costs, margin, cash flow and evidence discipline.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new TSMC evidence.",
          "Teach: make students write the core claim: A fair strong-company comparison uses aligned evidence about scale, trend, margin and cash.",
          "Evidence practice: Build a TSMC comparison table using the same metric categories for both sides.",
          "Output rehearsal: students build one scale-trend-margin-cash comparison paragraph using figures from both sides.",
          "Analyse why: students build a data -> concept -> investor implication chain for TSMC.",
          "Investment action: students apply the decision rule - Do not compare one company using revenue and another using profit unless the judgement explains the mismatch.",
          "Exit ticket: students submit Scale-trend-margin-cash comparison paragraph using at least one figure from each company."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record TSMC source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: benchmark, trend, scale.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short TSMC case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define benchmark. 2. Calculate/Interpret: Use or interpret the lesson formula: compare growth, margin and scale side by side; no single new formula. 3. Explain: Explain what one TSMC evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the TSMC case could change an investor's judgement about what makes one strong company look stronger than another. 5. Judge: Give your own evidence-based classroom verdict on TSMC: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Write one scale-trend-margin-cash comparison sentence using a figure from each company.",
            "expectedStudentWork": "one scale-trend-margin-cash comparison paragraph using figures from both sides"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "One impressive metric proves which company is stronger.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Scale-trend-margin-cash comparison paragraph using at least one figure from each company.",
            "expectedStudentWork": "one scale-trend-margin-cash comparison paragraph using figures from both sides"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for TSMC."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the TSMC case could change an investor's judgement about what makes one strong company look stronger than another.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using TSMC evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: One impressive metric proves which company is stronger.",
          "answer": "No",
          "explanation": "Correct the misconception using TSMC evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about TSMC?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the TSMC case.",
          "pairs": [
            {
              "term": "benchmark",
              "match": "a standard or comparison point used to judge performance."
            },
            {
              "term": "trend",
              "match": "movement in a figure over time."
            },
            {
              "term": "scale",
              "match": "the size of a company or activity."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using TSMC evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short TSMC case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define benchmark."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: compare growth, margin and scale side by side; no single new formula."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one TSMC evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the TSMC case could change an investor's judgement about what makes one strong company look stronger than another."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on TSMC: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Comparable-company action",
        "studentAction": "Compare two strong companies using the same evidence categories before choosing a stronger investment case.",
        "decisionRule": "Do not compare one company using revenue and another using profit unless the judgement explains the mismatch.",
        "portfolioQuestion": "Ask whether the investor has a better alternative with similar risk.",
        "classroomOutput": "I can compare TSMC with another company and justify which evidence is stronger."
      },
      "studentHook": "Two excellent companies enter the comparison. What makes one look stronger?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Two excellent companies enter the comparison. What makes one look stronger?"
        },
        {
          "label": "Key idea",
          "text": "A fair strong-company comparison uses aligned evidence about scale, trend, margin and cash."
        },
        {
          "label": "Try it",
          "text": "one scale-trend-margin-cash comparison paragraph using figures from both sides"
        },
        {
          "label": "Decide",
          "text": "I can compare TSMC with another company and justify which evidence is stronger."
        }
      ]
    },
    {
      "lesson": 11,
      "company": "Apple",
      "guidingQuestion": "How does a share make or lose money for an investor?",
      "guidingQuestionZh": "股票如何让投资者赚钱或亏钱？",
      "handoutMaterial": "Buy/sell price scenarios, gain/loss calculation table and return-percentage worked-example space.",
      "formativeAssessment": "Hinge calculation: identify purchase price, sale price, gain/loss and denominator. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "A capital gain is the profit made when an asset is sold for more than its purchase price."
        },
        {
          "term": "capital loss",
          "zh": "资本损失",
          "definition": "A capital loss is the loss made when an asset is sold for less than its purchase price."
        },
        {
          "term": "return",
          "zh": "回报",
          "definition": "Return is the gain or loss earned from an investment over a stated holding period, including price change and any income received."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Apple case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define capital gain. 2. Calculate/Interpret: Use or interpret the lesson formula: gain = sale price - purchase price; return % = gain / purchase price x 100. 3. Explain: Explain what one Apple evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Apple case could change an investor's judgement about how does a share make or lose money for an investor. 5. Judge: Give your own evidence-based classroom verdict on Apple: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Apple extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: How does a share make or lose money for an investor?",
        "mustAssess": "Gain, loss and return-percentage calculations. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 1 first price-graph reading; this lesson introduces formal old-price denominator discipline.",
        "newKnowledge": "investors can make capital gains or losses; return percentage compares the gain or loss with the original amount invested; higher possible return usually comes with higher uncertainty, but higher risk does not guarantee higher return.",
        "avoidOverlap": "keep dividends for Lesson 12 and valuation for Lessons 14-15.",
        "misconception": "a larger money gain is always the better return without considering the amount invested, or high risk automatically produces high return.",
        "evidenceTask": "use an Apple frozen buy/sell price example with dates.",
        "studentOutput": "one gain calculation, one loss calculation, one return-percentage explanation and one risk-return trade-off sentence."
      },
      "coreClaim": "Investor return depends on gain or loss relative to the purchase price, not only the money change.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "return-calculation",
        "description": "gain, loss and return-percentage calculations"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Calculate and explain",
        "marks": 4,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "gain = sale price - purchase price; return % = gain / purchase price x 100.",
        "judgementRequirement": "Gain, loss and return-percentage calculations. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Keep dividends for Lesson 12 and valuation for Lessons 14-15. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: A share can reward or hurt an investor. Where exactly does the return come from?",
          "Hook: start with Apple and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lesson 1 first price-graph reading; this lesson introduces formal old-price denominator discipline.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Apple evidence.",
          "Teach: make students write the core claim: Investor return depends on gain or loss relative to the purchase price, not only the money change.",
          "Evidence practice: Use an Apple frozen buy/sell price example with dates.",
          "Output rehearsal: students build gain, loss and return-percentage calculations.",
          "Analyse why: students build a data -> concept -> investor implication chain for Apple.",
          "Investment action: students apply the decision rule - A past price gain does not prove a future return.",
          "Exit ticket: students submit Gain, loss and return-percentage calculations."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Apple source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: capital gain, capital loss, return.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Apple case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define capital gain. 2. Calculate/Interpret: Use or interpret the lesson formula: gain = sale price - purchase price; return % = gain / purchase price x 100. 3. Explain: Explain what one Apple evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Apple case could change an investor's judgement about how does a share make or lose money for an investor. 5. Judge: Give your own evidence-based classroom verdict on Apple: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Calculate a gain, a loss and the percentage return.",
            "expectedStudentWork": "gain, loss and return-percentage calculations"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "A larger money gain is always the better return, or higher risk guarantees higher return.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Gain, loss and return-percentage calculations.",
            "expectedStudentWork": "gain, loss and return-percentage calculations"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Apple."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Apple case could change an investor's judgement about how does a share make or lose money for an investor.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Apple evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: A larger money gain is always the better return, or higher risk guarantees higher return.",
          "answer": "No",
          "explanation": "Correct the misconception using Apple evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Apple?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Apple case.",
          "pairs": [
            {
              "term": "capital gain",
              "match": "profit from selling a share above the purchase price."
            },
            {
              "term": "capital loss",
              "match": "loss from selling a share below the purchase price."
            },
            {
              "term": "return",
              "match": "gain or loss compared with the original amount invested."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Apple evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Apple case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define capital gain."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: gain = sale price - purchase price; return % = gain / purchase price x 100."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Apple evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Apple case could change an investor's judgement about how does a share make or lose money for an investor."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Apple: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Return-source action",
        "studentAction": "Separate the ways a share can make or lose money: price gain, price loss and later dividend evidence.",
        "decisionRule": "A past price gain does not prove a future return.",
        "portfolioQuestion": "Ask whether the investor understands both upside and downside before buying.",
        "classroomOutput": "I can calculate Apple price return and state what it does not prove. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "A share can reward or hurt an investor. Where exactly does the return come from?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "A share can reward or hurt an investor. Where exactly does the return come from?"
        },
        {
          "label": "Key idea",
          "text": "Investor return depends on gain or loss relative to the purchase price, not only the money change."
        },
        {
          "label": "Try it",
          "text": "gain, loss and return-percentage calculations"
        },
        {
          "label": "Decide",
          "text": "I can calculate Apple price return and state what it does not prove. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 12,
      "company": "HSBC",
      "guidingQuestion": "Why might an investor like dividends?",
      "guidingQuestionZh": "投资者为什么可能喜欢股息？",
      "handoutMaterial": "Dividend announcement extract, dividend-yield calculator and two-investor comparison prompt.",
      "formativeAssessment": "Two-investor check: students decide who has the higher dividend yield and why. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "A dividend is a distribution paid to shareholders based on the number of shares they own, usually in cash or additional shares."
        },
        {
          "term": "dividend yield",
          "zh": "股息收益率",
          "definition": "Dividend yield is the annual dividend per share divided by the share price and expressed as a percentage."
        },
        {
          "term": "total return",
          "zh": "总回报",
          "definition": "Total return measures price appreciation or loss plus any income received from the investment over the period."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short HSBC case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define dividend. 2. Calculate/Interpret: Use or interpret the lesson formula: dividend yield = annual dividend / share price x 100; total return = capital gain + dividends. 3. Explain: Explain what one HSBC evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the HSBC case could change an investor's judgement about why might an investor like dividends. 5. Judge: Give your own evidence-based classroom verdict on HSBC: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen HSBC extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Why might an investor like dividends?",
        "mustAssess": "Dividend-yield calculation and two-investor comparison. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 11 return from price movement.",
        "newKnowledge": "dividends add an income return; total return combines price change and dividends, while yield depends on the price paid.",
        "avoidOverlap": "do not teach dividend policy, taxation or advanced income strategies.",
        "misconception": "a higher dividend is automatically better for every investor.",
        "evidenceTask": "read an HSBC dividend announcement or annual-report extract and connect dividend to share price.",
        "studentOutput": "one dividend-yield calculation and one comparison of two investors paying different prices."
      },
      "coreClaim": "Dividends add income, but yield and total return depend on the price paid.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "dividend-yield-calculation",
        "description": "one dividend-yield calculation and two-investor comparison"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Calculate and explain",
        "marks": 4,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "dividend yield = annual dividend / share price x 100; total return = capital gain + dividends.",
        "judgementRequirement": "Dividend-yield calculation and two-investor comparison. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Avoid dividend policy, taxation and advanced income strategies. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Some investors like cash income. When does a dividend help the case?",
          "Hook: start with HSBC and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lesson 11 return from price movement.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new HSBC evidence.",
          "Teach: make students write the core claim: Dividends add income, but yield and total return depend on the price paid.",
          "Evidence practice: Read HSBC dividend announcement or annual-report extract and connect dividend to price paid.",
          "Output rehearsal: students build one dividend-yield calculation and two-investor comparison.",
          "Analyse why: students build a data -> concept -> investor implication chain for HSBC.",
          "Investment action: students apply the decision rule - A high dividend is not automatically safe; it must be checked against business strength and sustainability.",
          "Exit ticket: students submit Dividend-yield calculation and two-investor comparison."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record HSBC source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: dividend, dividend yield, total return.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short HSBC case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define dividend. 2. Calculate/Interpret: Use or interpret the lesson formula: dividend yield = annual dividend / share price x 100; total return = capital gain + dividends. 3. Explain: Explain what one HSBC evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the HSBC case could change an investor's judgement about why might an investor like dividends. 5. Judge: Give your own evidence-based classroom verdict on HSBC: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Explain why two investors may value the same dividend differently.",
            "expectedStudentWork": "one dividend-yield calculation and two-investor comparison"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "A higher dividend is always better for every investor.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Dividend-yield calculation and two-investor comparison.",
            "expectedStudentWork": "one dividend-yield calculation and two-investor comparison"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for HSBC."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the HSBC case could change an investor's judgement about why might an investor like dividends.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using HSBC evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: A higher dividend is always better for every investor.",
          "answer": "No",
          "explanation": "Correct the misconception using HSBC evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about HSBC?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the HSBC case.",
          "pairs": [
            {
              "term": "dividend",
              "match": "profit paid by a company to shareholders."
            },
            {
              "term": "dividend yield",
              "match": "annual dividend compared with the share price."
            },
            {
              "term": "total return",
              "match": "return from price change plus dividends."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using HSBC evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short HSBC case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define dividend."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: dividend yield = annual dividend / share price x 100; total return = capital gain + dividends."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one HSBC evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the HSBC case could change an investor's judgement about why might an investor like dividends."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on HSBC: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Income-return action",
        "studentAction": "Add dividend evidence to the return picture and check whether income changes the judgement.",
        "decisionRule": "A high dividend is not automatically safe; it must be checked against business strength and sustainability.",
        "portfolioQuestion": "Ask whether the investor needs income or long-term growth in the hypothetical profile.",
        "classroomOutput": "I can use HSBC dividend evidence to decide whether income improves or weakens the case. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "Some investors like cash income. When does a dividend help the case?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Some investors like cash income. When does a dividend help the case?"
        },
        {
          "label": "Key idea",
          "text": "Dividends add income, but yield and total return depend on the price paid."
        },
        {
          "label": "Try it",
          "text": "one dividend-yield calculation and two-investor comparison"
        },
        {
          "label": "Decide",
          "text": "I can use HSBC dividend evidence to decide whether income improves or weakens the case. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 13,
      "company": "Nvidia",
      "guidingQuestion": "How can one company be worth so much?",
      "guidingQuestionZh": "为什么一家公司会有如此高的市值？",
      "handoutMaterial": "Share-price and shares-outstanding fact box, market-cap calculation grid and limitation sentence.",
      "formativeAssessment": "Misconception check: compare two companies with different share prices and share counts. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Market capitalisation is the total market value of a company's equity, calculated as share price multiplied by shares outstanding."
        },
        {
          "term": "shares outstanding",
          "zh": "已发行股数",
          "definition": "Shares outstanding are the shares issued by a company and currently held by investors."
        },
        {
          "term": "mega-cap",
          "zh": "超大市值公司",
          "definition": "A mega-cap company is a listed company with a very large market capitalisation compared with most companies in the market."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Nvidia case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define market capitalisation. 2. Calculate/Interpret: Use or interpret the lesson formula: market capitalisation = share price x shares outstanding. 3. Explain: Explain what one Nvidia evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Nvidia case could change an investor's judgement about how can one company be worth so much. 5. Judge: Give your own evidence-based classroom verdict on Nvidia: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Nvidia extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: How can one company be worth so much?",
        "mustAssess": "Simplified market-cap calculation and limitation sentence. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 1 one-share price and Lesson 4 total shares and ownership percentage.",
        "newKnowledge": "market capitalisation estimates total equity market value by combining price per share with shares outstanding.",
        "avoidOverlap": "keep EPS and P/E for Lesson 14; do not use market cap alone as valuation judgement.",
        "misconception": "the company with the higher share price must be worth more in total.",
        "evidenceTask": "use Nvidia share price and shares outstanding from one frozen source.",
        "studentOutput": "one simplified market-cap calculation and one limitation sentence about what market cap does not prove."
      },
      "coreClaim": "Market capitalisation combines one-share price and share count; share price alone is not company size.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "market-cap-calculation",
        "description": "one simplified market-cap calculation and limitation sentence"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Calculate and explain",
        "marks": 4,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "market capitalisation = share price x shares outstanding.",
        "judgementRequirement": "Simplified market-cap calculation and limitation sentence. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Keep EPS and P/E for Lesson 14; market cap alone is not valuation. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: How can one company become worth so much money?",
          "Hook: start with Nvidia and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lesson 1 one-share price and Lesson 4 total shares and ownership percentage.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Nvidia evidence.",
          "Teach: make students write the core claim: Market capitalisation combines one-share price and share count; share price alone is not company size.",
          "Evidence practice: Use Nvidia share price and shares outstanding from one frozen source.",
          "Output rehearsal: students build one simplified market-cap calculation and limitation sentence.",
          "Analyse why: students build a data -> concept -> investor implication chain for Nvidia.",
          "Investment action: students apply the decision rule - A very valuable company still needs evidence that future expectations are reasonable.",
          "Exit ticket: students submit Simplified market-cap calculation and limitation sentence."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Nvidia source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: market capitalisation, shares outstanding, mega-cap.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Nvidia case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define market capitalisation. 2. Calculate/Interpret: Use or interpret the lesson formula: market capitalisation = share price x shares outstanding. 3. Explain: Explain what one Nvidia evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Nvidia case could change an investor's judgement about how can one company be worth so much. 5. Judge: Give your own evidence-based classroom verdict on Nvidia: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Calculate a simplified market cap and explain what it does not prove.",
            "expectedStudentWork": "one simplified market-cap calculation and limitation sentence"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Higher share price means a bigger company.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Simplified market-cap calculation and limitation sentence.",
            "expectedStudentWork": "one simplified market-cap calculation and limitation sentence"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Nvidia."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Nvidia case could change an investor's judgement about how can one company be worth so much.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Nvidia evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Higher share price means a bigger company.",
          "answer": "No",
          "explanation": "Correct the misconception using Nvidia evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Nvidia?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Nvidia case.",
          "pairs": [
            {
              "term": "market capitalisation",
              "match": "total market value of a company's equity."
            },
            {
              "term": "shares outstanding",
              "match": "shares issued and held by investors."
            },
            {
              "term": "mega-cap",
              "match": "a very large listed company by market value."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Nvidia evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Nvidia case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define market capitalisation."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: market capitalisation = share price x shares outstanding."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Nvidia evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Nvidia case could change an investor's judgement about how can one company be worth so much."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Nvidia: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Size-and-expectations action",
        "studentAction": "Use market capitalisation to see how much value investors already place on one company.",
        "decisionRule": "A very valuable company still needs evidence that future expectations are reasonable.",
        "portfolioQuestion": "Ask whether the investor is paying for proven strength or very high expectations.",
        "classroomOutput": "I can explain what Nvidia market value suggests and what evidence must support it. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "How can one company become worth so much money?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "How can one company become worth so much money?"
        },
        {
          "label": "Key idea",
          "text": "Market capitalisation combines one-share price and share count; share price alone is not company size."
        },
        {
          "label": "Try it",
          "text": "one simplified market-cap calculation and limitation sentence"
        },
        {
          "label": "Decide",
          "text": "I can explain what Nvidia market value suggests and what evidence must support it. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 14,
      "company": "Microsoft",
      "guidingQuestion": "When do investors pay a high price for profit?",
      "guidingQuestionZh": "投资者什么时候愿意为利润支付高价？",
      "handoutMaterial": "EPS/P/E formula desk, frozen price and earnings facts, and optimism-versus-risk interpretation options.",
      "formativeAssessment": "Interpretation check: students classify high P/E as optimism, risk or both depending on evidence. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "EPS, or earnings per share, is the income earned during a period for each ordinary share, usually calculated as profit attributable to ordinary shareholders divided by the share count used in the calculation."
        },
        {
          "term": "P/E ratio",
          "zh": "市盈率",
          "definition": "The P/E ratio is the ratio of share price to earnings per share, showing how much investors pay for each unit of current earnings."
        },
        {
          "term": "valuation",
          "zh": "估值",
          "definition": "Valuation is the process of estimating the value of an asset using variables related to future investment returns or comparisons with similar assets."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Microsoft case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define EPS. 2. Calculate/Interpret: Use or interpret the lesson formula: EPS = net profit / shares; P/E = share price / EPS. 3. Explain: Explain what one Microsoft evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Microsoft case could change an investor's judgement about when do investors pay a high price for profit. 5. Judge: Give your own evidence-based classroom verdict on Microsoft: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Microsoft extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: When do investors pay a high price for profit?",
        "mustAssess": "P/E interpretation giving both optimism and risk as possible meanings. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 13 share count and company value, plus Unit 2 profit evidence.",
        "newKnowledge": "EPS connects company profit to one share; P/E compares the price investors pay with earnings per share.",
        "avoidOverlap": "do not present P/E as a mechanical buy/sell rule; save full synthesis for Lesson 15.",
        "misconception": "a high P/E is simply good because investors are optimistic, or simply bad because the share is expensive.",
        "evidenceTask": "calculate or read Microsoft EPS and P/E from a frozen source and source date.",
        "studentOutput": "one P/E interpretation that gives both optimism and risk as possible meanings."
      },
      "coreClaim": "A P/E ratio can signal optimism, risk or both; it is not a mechanical buy/sell rule.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "pe-interpretation",
        "description": "one P/E interpretation giving both optimism and risk as possible meanings"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Explain",
        "marks": 4,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "EPS = net profit / shares; P/E = share price / EPS.",
        "judgementRequirement": "P/E interpretation giving both optimism and risk as possible meanings. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not present P/E as a mechanical buy/sell rule. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Would you pay a high price for each dollar of profit?",
          "Hook: start with Microsoft and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lesson 13 share count and company value, plus Unit 2 profit evidence.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Microsoft evidence.",
          "Teach: make students write the core claim: A P/E ratio can signal optimism, risk or both; it is not a mechanical buy/sell rule.",
          "Evidence practice: Calculate or read Microsoft EPS and P/E from a frozen source.",
          "Output rehearsal: students build one P/E interpretation giving both optimism and risk as possible meanings.",
          "Analyse why: students build a data -> concept -> investor implication chain for Microsoft.",
          "Investment action: students apply the decision rule - A high P/E may be justified or dangerous; it depends on growth, quality and risk evidence.",
          "Exit ticket: students submit P/E interpretation giving both optimism and risk as possible meanings."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Microsoft source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: EPS, P/E ratio, valuation.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Microsoft case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define EPS. 2. Calculate/Interpret: Use or interpret the lesson formula: EPS = net profit / shares; P/E = share price / EPS. 3. Explain: Explain what one Microsoft evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Microsoft case could change an investor's judgement about when do investors pay a high price for profit. 5. Judge: Give your own evidence-based classroom verdict on Microsoft: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Explain why a high P/E may show optimism, risk or both.",
            "expectedStudentWork": "one P/E interpretation giving both optimism and risk as possible meanings"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "High P/E is simply good, or simply bad.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "P/E interpretation giving both optimism and risk as possible meanings.",
            "expectedStudentWork": "one P/E interpretation giving both optimism and risk as possible meanings"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Microsoft."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Microsoft case could change an investor's judgement about when do investors pay a high price for profit.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Microsoft evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: High P/E is simply good, or simply bad.",
          "answer": "No",
          "explanation": "Correct the misconception using Microsoft evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Microsoft?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Microsoft case.",
          "pairs": [
            {
              "term": "EPS",
              "match": "earnings per share, or net profit divided by shares."
            },
            {
              "term": "P/E ratio",
              "match": "share price compared with earnings per share."
            },
            {
              "term": "valuation",
              "match": "judgement of price compared with evidence and expectations."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Microsoft evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Microsoft case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define EPS."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: EPS = net profit / shares; P/E = share price / EPS."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Microsoft evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Microsoft case could change an investor's judgement about when do investors pay a high price for profit."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Microsoft: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Earnings-price action",
        "studentAction": "Use EPS and P/E to ask how much investors pay for each unit of profit.",
        "decisionRule": "A high P/E may be justified or dangerous; it depends on growth, quality and risk evidence.",
        "portfolioQuestion": "Ask whether the investor is comfortable paying today for expected future profit.",
        "classroomOutput": "I can use Microsoft P/E evidence to write a price-for-profit judgement. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "Would you pay a high price for each dollar of profit?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Would you pay a high price for each dollar of profit?"
        },
        {
          "label": "Key idea",
          "text": "A P/E ratio can signal optimism, risk or both; it is not a mechanical buy/sell rule."
        },
        {
          "label": "Try it",
          "text": "one P/E interpretation giving both optimism and risk as possible meanings"
        },
        {
          "label": "Decide",
          "text": "I can use Microsoft P/E evidence to write a price-for-profit judgement. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 15,
      "company": "Toyota",
      "guidingQuestion": "Can a good company still be too expensive?",
      "guidingQuestionZh": "好公司也可能太贵吗？",
      "handoutMaterial": "Valuation evidence board, quality-price-risk sorter and two-point answer planner.",
      "formativeAssessment": "Evidence sorter: quality evidence, price evidence, risk evidence or unsupported claim. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "A share is cheap or expensive only in relation to evidence about value, earnings, growth, risk and expectations, not simply because the price per share is low or high."
        },
        {
          "term": "expectations",
          "zh": "预期",
          "definition": "Expectations are assumptions about future performance, risk or growth that investors may already have reflected in the current price."
        },
        {
          "term": "margin of safety",
          "zh": "安全边际",
          "definition": "Margin of safety is the room for error between the price paid and a cautious estimate of value."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Toyota case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define cheap or expensive. 2. Calculate/Interpret: Use or interpret the lesson formula: compare P/E, growth and risk evidence; no new calculation. 3. Explain: Explain what one Toyota evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Toyota case could change an investor's judgement about can a good company still be too expensive. 5. Judge: Give your own evidence-based classroom verdict on Toyota: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Toyota extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Can a good company still be too expensive?",
        "mustAssess": "Two-point valuation answer linking quality, possible return, price paid and risk. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lessons 11-14 return, dividend, market capitalisation, EPS and P/E.",
        "newKnowledge": "valuation judgement combines quality, growth, possible return, price, expectations and risk; margin of safety is room for error.",
        "avoidOverlap": "do not add another formula; make this the Unit 3 checkpoint and writing lesson.",
        "misconception": "a good company is automatically a good investment at any price.",
        "evidenceTask": "read Toyota growth, profitability and P/E evidence, then decide what each piece can and cannot prove.",
        "studentOutput": "a two-point valuation answer linking quality, possible return, price paid and risk."
      },
      "coreClaim": "A good company only becomes an attractive investment when quality is judged with price and risk.",
      "caseRole": "synthesis case",
      "primaryOutput": {
        "type": "two-point-valuation-answer",
        "description": "one two-point valuation answer linking quality, possible return, price paid and risk"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Assess",
        "marks": 6,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "No new calculation; assess evidence reading and judgement.",
        "judgementRequirement": "Two-point valuation answer linking quality, possible return, price paid and risk. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "No new calculation; make writing and judgement the main work. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Can a company be good but still not worth buying today?",
          "Hook: start with Toyota and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lessons 11-14 return, dividend, market capitalisation, EPS and P/E.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Toyota evidence.",
          "Teach: make students write the core claim: A good company only becomes an attractive investment when quality is judged with price and risk.",
          "Evidence practice: Read Toyota growth, profitability and P/E evidence and classify what each can prove.",
          "Output rehearsal: students build one two-point valuation answer linking quality, possible return, price paid and risk.",
          "Analyse why: students build a data -> concept -> investor implication chain for Toyota.",
          "Investment action: students apply the decision rule - Business quality and investment attractiveness are not the same thing.",
          "Exit ticket: students submit Two-point valuation answer linking quality, possible return, price paid and risk."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Toyota source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: cheap or expensive, expectations, margin of safety.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Toyota case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define cheap or expensive. 2. Calculate/Interpret: Use or interpret the lesson formula: compare P/E, growth and risk evidence; no new calculation. 3. Explain: Explain what one Toyota evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Toyota case could change an investor's judgement about can a good company still be too expensive. 5. Judge: Give your own evidence-based classroom verdict on Toyota: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Write a two-point answer explaining why quality and price must be judged together.",
            "expectedStudentWork": "one two-point valuation answer linking quality, possible return, price paid and risk"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "A good company is a good investment at any price.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Two-point valuation answer linking quality, possible return, price paid and risk.",
            "expectedStudentWork": "one two-point valuation answer linking quality, possible return, price paid and risk"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Toyota."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Toyota case could change an investor's judgement about can a good company still be too expensive.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Toyota evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: A good company is a good investment at any price.",
          "answer": "No",
          "explanation": "Correct the misconception using Toyota evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Toyota?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Toyota case.",
          "pairs": [
            {
              "term": "cheap or expensive",
              "match": "valuation judgement, not just a low or high share price."
            },
            {
              "term": "expectations",
              "match": "assumptions about future performance already reflected in price."
            },
            {
              "term": "margin of safety",
              "match": "room for error between price and estimated value."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Toyota evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Toyota case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define cheap or expensive."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: compare P/E, growth and risk evidence; no new calculation."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Toyota evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Toyota case could change an investor's judgement about can a good company still be too expensive."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Toyota: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Too-expensive action",
        "studentAction": "Test whether a good company may still be unattractive because the price is too high.",
        "decisionRule": "Business quality and investment attractiveness are not the same thing.",
        "portfolioQuestion": "Ask whether the investor would wait for a better price or choose an alternative.",
        "classroomOutput": "I can write a Toyota valuation-risk note: consider, watch or too expensive."
      },
      "studentHook": "Can a company be good but still not worth buying today?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Can a company be good but still not worth buying today?"
        },
        {
          "label": "Key idea",
          "text": "A good company only becomes an attractive investment when quality is judged with price and risk."
        },
        {
          "label": "Try it",
          "text": "one two-point valuation answer linking quality, possible return, price paid and risk"
        },
        {
          "label": "Decide",
          "text": "I can write a Toyota valuation-risk note: consider, watch or too expensive."
        }
      ]
    },
    {
      "lesson": 16,
      "company": "Starbucks",
      "guidingQuestion": "What could hurt one familiar company?",
      "guidingQuestionZh": "一家熟悉的公司可能受到什么伤害？",
      "handoutMaterial": "Risk register, company evidence extract and risk -> future profit -> price chain frame.",
      "formativeAssessment": "Risk-chain check: students complete the missing middle link between risk and price. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Company-specific risk is non-systematic risk tied to a particular company's operations, reputation, financial position, management or business environment."
        },
        {
          "term": "demand risk",
          "zh": "需求风险",
          "definition": "Demand risk is the risk that customers buy less than expected, reducing revenue, profit or growth."
        },
        {
          "term": "execution risk",
          "zh": "执行风险",
          "definition": "Execution risk is the risk that a company fails to carry out its strategy, project or operational plan successfully."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Starbucks case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define company-specific risk. 2. Calculate/Interpret: Interpret one figure or evidence statement from the case and state what it can and cannot prove. 3. Explain: Explain what one Starbucks evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Starbucks case could change an investor's judgement about what could hurt one familiar company. 5. Judge: Give your own evidence-based classroom verdict on Starbucks: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Starbucks extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: What could hurt one familiar company?",
        "mustAssess": "Risk -> future revenue/profit -> price effect chain. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 15 valuation rule that price must be judged with risk.",
        "newKnowledge": "company-specific risk comes from one company's situation, choices, demand conditions or execution.",
        "avoidOverlap": "do not cover sector, regulation, currency or ETF risk yet; this lesson is one-company risk only.",
        "misconception": "a familiar brand is automatically safe.",
        "evidenceTask": "use Starbucks store, demand or margin evidence to identify one company-specific risk.",
        "studentOutput": "one risk-evidence-effect chain: risk -> future revenue or profit -> possible price effect."
      },
      "coreClaim": "A familiar company can still face risks that affect future revenue, profit, expectations and price.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "risk-chain",
        "description": "one risk to future revenue/profit to price-effect chain"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Explain",
        "marks": 4,
        "stimulusType": "short company evidence extract",
        "calculationRequirement": "No new calculation; assess evidence reading and judgement.",
        "judgementRequirement": "Risk -> future revenue/profit -> price effect chain. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not cover sector, regulation, currency or fund risk yet. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: A familiar brand feels safe. What could still go wrong?",
          "Hook: start with Starbucks and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lesson 15 valuation rule that price must be judged with risk.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Starbucks evidence.",
          "Teach: make students write the core claim: A familiar company can still face risks that affect future revenue, profit, expectations and price.",
          "Evidence practice: Use Starbucks store, demand or margin evidence to identify one company-specific risk.",
          "Output rehearsal: students build one risk to future revenue/profit to price-effect chain.",
          "Analyse why: students build a data -> concept -> investor implication chain for Starbucks.",
          "Investment action: students apply the decision rule - Familiar products do not remove business risk.",
          "Exit ticket: students submit Risk -> future revenue/profit -> price effect chain."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Starbucks source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: company-specific risk, demand risk, execution risk.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Starbucks case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define company-specific risk. 2. Calculate/Interpret: Interpret one figure or evidence statement from the case and state what it can and cannot prove. 3. Explain: Explain what one Starbucks evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Starbucks case could change an investor's judgement about what could hurt one familiar company. 5. Judge: Give your own evidence-based classroom verdict on Starbucks: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Name one risk and link it to future revenue or profit.",
            "expectedStudentWork": "one risk to future revenue/profit to price-effect chain"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "A familiar brand is automatically safe.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Risk -> future revenue/profit -> price effect chain.",
            "expectedStudentWork": "one risk to future revenue/profit to price-effect chain"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Starbucks."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Starbucks case could change an investor's judgement about what could hurt one familiar company.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Starbucks evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: A familiar brand is automatically safe.",
          "answer": "No",
          "explanation": "Correct the misconception using Starbucks evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Starbucks?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Starbucks case.",
          "pairs": [
            {
              "term": "company-specific risk",
              "match": "risk caused by one company's decisions or situation."
            },
            {
              "term": "demand risk",
              "match": "the risk that customers buy less than expected."
            },
            {
              "term": "execution risk",
              "match": "the risk that a strategy is not carried out successfully."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Starbucks evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Starbucks case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define company-specific risk."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Interpret one figure or evidence statement from the case and state what it can and cannot prove."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Starbucks evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Starbucks case could change an investor's judgement about what could hurt one familiar company."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Starbucks: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Company-risk action",
        "studentAction": "List the company-specific risks that could damage future returns even when the brand is familiar.",
        "decisionRule": "Familiar products do not remove business risk.",
        "portfolioQuestion": "Ask whether the investor can explain the main risk before investing.",
        "classroomOutput": "I can build a Starbucks risk register and choose one risk to monitor. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "A familiar brand feels safe. What could still go wrong?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "A familiar brand feels safe. What could still go wrong?"
        },
        {
          "label": "Key idea",
          "text": "A familiar company can still face risks that affect future revenue, profit, expectations and price."
        },
        {
          "label": "Try it",
          "text": "one risk to future revenue/profit to price-effect chain"
        },
        {
          "label": "Decide",
          "text": "I can build a Starbucks risk register and choose one risk to monitor. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 17,
      "company": "Li Ning",
      "guidingQuestion": "How can changing tastes affect a sportswear company?",
      "guidingQuestionZh": "消费者偏好变化如何影响运动服装公司？",
      "handoutMaterial": "Sector trend snapshot, competitor comparison notes and trend impact sorter.",
      "formativeAssessment": "Trend impact sort: same trend helps, hurts or has unclear effect on different companies. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "A sector is a group of related industries or companies that share similar business activities or economic exposures."
        },
        {
          "term": "competition",
          "zh": "竞争",
          "definition": "Competition is rivalry between firms for customers, revenue, market share, talent, suppliers or profit."
        },
        {
          "term": "consumer trend",
          "zh": "消费趋势",
          "definition": "A consumer trend is a change in what customers prefer, buy or avoid over time."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Li Ning case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define sector. 2. Calculate/Interpret: Use or interpret the lesson formula: market share = company sales / sector sales x 100, if suitable data is available. 3. Explain: Explain what one Li Ning evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Li Ning case could change an investor's judgement about how can changing tastes affect a sportswear company. 5. Judge: Give your own evidence-based classroom verdict on Li Ning: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Li Ning extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: How can changing tastes affect a sportswear company?",
        "mustAssess": "Explanation of how the same trend can help one company and hurt another. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lesson 16 risk chain and Unit 2 revenue/margin evidence.",
        "newKnowledge": "sector risk and competition come from the market around the company, not only internal company choices.",
        "avoidOverlap": "do not repeat generic company-specific risk; make the evidence external: sector trend, competitor or market share.",
        "misconception": "a growing sector helps every company in that sector equally.",
        "evidenceTask": "compare Li Ning sales trend with competitor or sector evidence.",
        "studentOutput": "one explanation of how the same trend can help one company and hurt another."
      },
      "coreClaim": "The same consumer trend can help one company and hurt another within a sector.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "trend-impact-explanation",
        "description": "one explanation of how the same trend can help one company and hurt another"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Explain",
        "marks": 4,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "Optional calculation only if source data is clean: market share = company sales / sector sales x 100, if suitable data is available.",
        "judgementRequirement": "Explanation of how the same trend can help one company and hurt another. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not repeat company-specific risk; make the cause external. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Trends change fast. How can fashion taste become investment risk?",
          "Hook: start with Li Ning and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lesson 16 risk chain and Unit 2 revenue/margin evidence.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Li Ning evidence.",
          "Teach: make students write the core claim: The same consumer trend can help one company and hurt another within a sector.",
          "Evidence practice: Compare Li Ning sales trend with competitor or sector evidence.",
          "Output rehearsal: students build one explanation of how the same trend can help one company and hurt another.",
          "Analyse why: students build a data -> concept -> investor implication chain for Li Ning.",
          "Investment action: students apply the decision rule - A popular brand today may not stay popular enough to justify the price.",
          "Exit ticket: students submit Explanation of how the same trend can help one company and hurt another."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Li Ning source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: sector, competition, consumer trend.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Li Ning case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define sector. 2. Calculate/Interpret: Use or interpret the lesson formula: market share = company sales / sector sales x 100, if suitable data is available. 3. Explain: Explain what one Li Ning evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Li Ning case could change an investor's judgement about how can changing tastes affect a sportswear company. 5. Judge: Give your own evidence-based classroom verdict on Li Ning: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Explain how a trend can help one company and hurt another.",
            "expectedStudentWork": "one explanation of how the same trend can help one company and hurt another"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "A growing sector helps every company equally.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Explanation of how the same trend can help one company and hurt another.",
            "expectedStudentWork": "one explanation of how the same trend can help one company and hurt another"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Li Ning."
      },
      "caseReview": {
        "status": "review-before-production",
        "reason": "Consumer-trend and competitor evidence must be clean enough for a fair sector comparison.",
        "replacementCandidate": "Xtep or Anta if Li Ning data is not aligned with the chosen trend.",
        "sourceFit": "pending-source-pack-check"
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Li Ning case could change an investor's judgement about how can changing tastes affect a sportswear company.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Li Ning evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: A growing sector helps every company equally.",
          "answer": "No",
          "explanation": "Correct the misconception using Li Ning evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Li Ning?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Li Ning case.",
          "pairs": [
            {
              "term": "sector",
              "match": "a group of companies selling similar goods or services."
            },
            {
              "term": "competition",
              "match": "rivalry between firms for customers and profit."
            },
            {
              "term": "consumer trend",
              "match": "a change in what customers prefer to buy."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Li Ning evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Li Ning case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define sector."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: market share = company sales / sector sales x 100, if suitable data is available."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Li Ning evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Li Ning case could change an investor's judgement about how can changing tastes affect a sportswear company."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Li Ning: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Sector-risk action",
        "studentAction": "Check whether changing consumer tastes or sector conditions could weaken the company case.",
        "decisionRule": "A popular brand today may not stay popular enough to justify the price.",
        "portfolioQuestion": "Ask whether the investor is overexposed to one consumer trend.",
        "classroomOutput": "I can judge whether Li Ning sector evidence supports watch, avoid or consider."
      },
      "studentHook": "Trends change fast. How can fashion taste become investment risk?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Trends change fast. How can fashion taste become investment risk?"
        },
        {
          "label": "Key idea",
          "text": "The same consumer trend can help one company and hurt another within a sector."
        },
        {
          "label": "Try it",
          "text": "one explanation of how the same trend can help one company and hurt another"
        },
        {
          "label": "Decide",
          "text": "I can judge whether Li Ning sector evidence supports watch, avoid or consider."
        }
      ]
    },
    {
      "lesson": 18,
      "company": "Ping An",
      "guidingQuestion": "How can government rules affect future profit?",
      "guidingQuestionZh": "政府规则如何影响未来利润？",
      "handoutMaterial": "Rule-change scenario cards, effect classification table and regulation-to-profit sentence frame.",
      "formativeAssessment": "Scenario classification: cost increase, revenue limit, risk reduction or unclear effect. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Regulation is a system of government rules and enforcement that affects how companies, markets or investors may behave."
        },
        {
          "term": "compliance cost",
          "zh": "合规成本",
          "definition": "Compliance cost is the money, time and resources a company spends to obey laws, rules, standards and reporting requirements."
        },
        {
          "term": "policy risk",
          "zh": "政策风险",
          "definition": "Policy risk is the risk that changes in laws, regulation, taxation, subsidies or government priorities reduce future profit or change business prospects."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Ping An case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define regulation. 2. Calculate/Interpret: Interpret one figure or evidence statement from the case and state what it can and cannot prove. 3. Explain: Explain what one Ping An evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Ping An case could change an investor's judgement about how can government rules affect future profit. 5. Judge: Give your own evidence-based classroom verdict on Ping An: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Ping An extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: How can government rules affect future profit?",
        "mustAssess": "Rule-change classification and future-profit or price link. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lessons 16-17 risk-evidence-effect chains.",
        "newKnowledge": "regulation risk affects future profit through rules, compliance costs, permitted products or required behaviour.",
        "avoidOverlap": "keep the framing non-political and business-focused; do not broaden into every government policy topic.",
        "misconception": "current profit protects a company from future rule changes.",
        "evidenceTask": "read a Ping An report extract or regulatory note and classify the likely effect on cost, revenue, risk or expectations.",
        "studentOutput": "one rule-change classification and one sentence linking regulation to future profit or price."
      },
      "coreClaim": "Regulation can change costs, revenue limits, risk profile and investor expectations.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "rule-change-classification",
        "description": "one rule-change classification with future-profit or price link"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Explain",
        "marks": 4,
        "stimulusType": "short company evidence extract",
        "calculationRequirement": "No new calculation; assess evidence reading and judgement.",
        "judgementRequirement": "Rule-change classification and future-profit or price link. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Keep it business-focused and non-political. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: A rule change can rewrite a profit story. What should investors check?",
          "Hook: start with Ping An and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lessons 16-17 risk-evidence-effect chains.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Ping An evidence.",
          "Teach: make students write the core claim: Regulation can change costs, revenue limits, risk profile and investor expectations.",
          "Evidence practice: Classify a Ping An report extract or regulatory note by likely effect.",
          "Output rehearsal: students build one rule-change classification with future-profit or price link.",
          "Analyse why: students build a data -> concept -> investor implication chain for Ping An.",
          "Investment action: students apply the decision rule - Regulation is not background noise; it can change risk and valuation.",
          "Exit ticket: students submit Rule-change classification and future-profit or price link."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Ping An source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: regulation, compliance cost, policy risk.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Ping An case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define regulation. 2. Calculate/Interpret: Interpret one figure or evidence statement from the case and state what it can and cannot prove. 3. Explain: Explain what one Ping An evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Ping An case could change an investor's judgement about how can government rules affect future profit. 5. Judge: Give your own evidence-based classroom verdict on Ping An: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Explain why a profitable company may still face regulation risk.",
            "expectedStudentWork": "one rule-change classification with future-profit or price link"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Current profit protects a company from rule changes.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Rule-change classification and future-profit or price link.",
            "expectedStudentWork": "one rule-change classification with future-profit or price link"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Ping An."
      },
      "caseReview": {
        "status": "review-before-production",
        "reason": "Regulation evidence must stay business-focused and age-appropriate, not political or too technical.",
        "replacementCandidate": "AIA or China Life if Ping An source evidence is too complex.",
        "sourceFit": "pending-source-pack-check"
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Ping An case could change an investor's judgement about how can government rules affect future profit.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Ping An evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Current profit protects a company from rule changes.",
          "answer": "No",
          "explanation": "Correct the misconception using Ping An evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Ping An?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Ping An case.",
          "pairs": [
            {
              "term": "regulation",
              "match": "government rules that affect how a company operates."
            },
            {
              "term": "compliance cost",
              "match": "the cost of obeying rules and standards."
            },
            {
              "term": "policy risk",
              "match": "the risk that rule changes reduce future profit."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Ping An evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Ping An case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define regulation."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Interpret one figure or evidence statement from the case and state what it can and cannot prove."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Ping An evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Ping An case could change an investor's judgement about how can government rules affect future profit."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Ping An: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Regulation-risk action",
        "studentAction": "Identify how rules, capital requirements or government action could change future profit.",
        "decisionRule": "Regulation is not background noise; it can change risk and valuation.",
        "portfolioQuestion": "Ask whether the investor understands the rule risk before comparing returns.",
        "classroomOutput": "I can explain one Ping An regulation risk and its investor implication. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "A rule change can rewrite a profit story. What should investors check?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "A rule change can rewrite a profit story. What should investors check?"
        },
        {
          "label": "Key idea",
          "text": "Regulation can change costs, revenue limits, risk profile and investor expectations."
        },
        {
          "label": "Try it",
          "text": "one rule-change classification with future-profit or price link"
        },
        {
          "label": "Decide",
          "text": "I can explain one Ping An regulation risk and its investor implication. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 19,
      "company": "Samsung",
      "guidingQuestion": "Why can exchange rates matter to shareholders?",
      "guidingQuestionZh": "汇率为什么会影响股东？",
      "handoutMaterial": "Geographic sales or currency-risk extract, exchange-rate change calculator and investor-risk explanation prompt.",
      "formativeAssessment": "Currency direction check: students decide which figure changes when the exchange rate moves. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "An exchange rate is the price of one currency expressed in terms of another currency."
        },
        {
          "term": "export exposure",
          "zh": "出口敞口",
          "definition": "Export exposure is a company's reliance on sales to customers in other countries or currencies."
        },
        {
          "term": "translation effect",
          "zh": "折算影响",
          "definition": "A translation effect is the change in reported financial figures caused by converting foreign-currency results into the company's reporting currency."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Samsung case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define exchange rate. 2. Calculate/Interpret: Use or interpret the lesson formula: exchange-rate change % = (new rate - old rate) / old rate x 100. 3. Explain: Explain what one Samsung evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Samsung case could change an investor's judgement about why can exchange rates matter to shareholders. 5. Judge: Give your own evidence-based classroom verdict on Samsung: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Samsung extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Why can exchange rates matter to shareholders?",
        "mustAssess": "Exchange-rate percentage change plus investor-risk explanation. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lessons 16-18 risk chains and the percentage-change method from Lesson 11.",
        "newKnowledge": "currency movements can change reported figures, investor returns and expectations for global companies.",
        "avoidOverlap": "do not teach foreign-exchange trading; keep exchange rates as a shareholder risk factor.",
        "misconception": "foreign sales only create growth opportunity and never create measurement or return risk.",
        "evidenceTask": "connect Samsung geographic sales or currency-risk note to one frozen exchange-rate change.",
        "studentOutput": "one exchange-rate percentage change and one investor-risk explanation."
      },
      "coreClaim": "Exchange rates can create measurement and return risk for global companies and shareholders.",
      "caseRole": "listed company",
      "primaryOutput": {
        "type": "exchange-rate-risk-calculation",
        "description": "one exchange-rate percentage-change calculation plus investor-risk explanation"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company annual/interim report or investor presentation",
          "dated market snapshot when price or return is discussed",
          "supporting company or sector source only when required by the evidence task"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Calculate and explain",
        "marks": 4,
        "stimulusType": "company data table or report extract",
        "calculationRequirement": "exchange-rate change % = (new rate - old rate) / old rate x 100.",
        "judgementRequirement": "Exchange-rate percentage change plus investor-risk explanation. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not teach foreign-exchange trading. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: A company can perform well, but currency moves can change the result.",
          "Hook: start with Samsung and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lessons 16-18 risk chains and the percentage-change method from Lesson 11.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Samsung evidence.",
          "Teach: make students write the core claim: Exchange rates can create measurement and return risk for global companies and shareholders.",
          "Evidence practice: Connect Samsung geographic sales or currency-risk note to a frozen exchange-rate change.",
          "Output rehearsal: students build one exchange-rate percentage-change calculation plus investor-risk explanation.",
          "Analyse why: students build a data -> concept -> investor implication chain for Samsung.",
          "Investment action: students apply the decision rule - Foreign revenue or listing currency can change the investment result even if operations look stable.",
          "Exit ticket: students submit Exchange-rate percentage change plus investor-risk explanation."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Samsung source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: exchange rate, export exposure, translation effect.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Samsung case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define exchange rate. 2. Calculate/Interpret: Use or interpret the lesson formula: exchange-rate change % = (new rate - old rate) / old rate x 100. 3. Explain: Explain what one Samsung evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Samsung case could change an investor's judgement about why can exchange rates matter to shareholders. 5. Judge: Give your own evidence-based classroom verdict on Samsung: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Calculate an exchange-rate change and link it to investor risk.",
            "expectedStudentWork": "one exchange-rate percentage-change calculation plus investor-risk explanation"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Foreign sales only create opportunity and not measurement or return risk.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Exchange-rate percentage change plus investor-risk explanation.",
            "expectedStudentWork": "one exchange-rate percentage-change calculation plus investor-risk explanation"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Samsung."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Samsung case could change an investor's judgement about why can exchange rates matter to shareholders.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Samsung evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Foreign sales only create opportunity and not measurement or return risk.",
          "answer": "No",
          "explanation": "Correct the misconception using Samsung evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Samsung?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Samsung case.",
          "pairs": [
            {
              "term": "exchange rate",
              "match": "the price of one currency in terms of another."
            },
            {
              "term": "export exposure",
              "match": "reliance on sales to customers in other countries."
            },
            {
              "term": "translation effect",
              "match": "how currency changes affect reported figures."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Samsung evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Samsung case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define exchange rate."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: exchange-rate change % = (new rate - old rate) / old rate x 100."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Samsung evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Samsung case could change an investor's judgement about why can exchange rates matter to shareholders."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Samsung: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Currency-risk action",
        "studentAction": "Check whether exchange rates could affect reported profit, dividends or shareholder return.",
        "decisionRule": "Foreign revenue or listing currency can change the investment result even if operations look stable.",
        "portfolioQuestion": "Ask whether currency exposure fits the investor profile and portfolio.",
        "classroomOutput": "I can add one Samsung currency-risk caveat to an investment judgement. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "A company can perform well, but currency moves can change the result.",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "A company can perform well, but currency moves can change the result."
        },
        {
          "label": "Key idea",
          "text": "Exchange rates can create measurement and return risk for global companies and shareholders."
        },
        {
          "label": "Try it",
          "text": "one exchange-rate percentage-change calculation plus investor-risk explanation"
        },
        {
          "label": "Decide",
          "text": "I can add one Samsung currency-risk caveat to an investment judgement. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 20,
      "company": "ChinaAMC CSI 300 ETF",
      "guidingQuestion": "How can one fund hold many companies?",
      "guidingQuestionZh": "一个基金如何持有许多公司？",
      "handoutMaterial": "ETF factsheet reading guide, holdings/risk table and ETF-versus-single-share comparison box.",
      "formativeAssessment": "Risk-reduction check: students identify which risk diversification reduces and which remains. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "An ETF is an exchange-traded fund, a pooled investment fund that holds a basket of assets and trades on a stock exchange like a share."
        },
        {
          "term": "index fund",
          "zh": "指数基金",
          "definition": "An index fund is a fund designed to track the performance of a market index rather than choose individual securities through active stock-picking."
        },
        {
          "term": "diversification",
          "zh": "分散化",
          "definition": "Diversification is spreading investment across different holdings, sectors, regions or asset types to reduce dependence on any single source of risk."
        },
        {
          "term": "portfolio weight",
          "zh": "投资组合权重",
          "definition": "Portfolio weight is the value of one holding divided by the total value of the portfolio and expressed as a percentage."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short ChinaAMC CSI 300 ETF case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define ETF. 2. Calculate/Interpret: Use or interpret the lesson formula: portfolio weight = holding value / total portfolio value x 100; expense ratio and tracking are read-only factsheet fields unless extending. 3. Explain: Explain what one ChinaAMC CSI 300 ETF evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the ChinaAMC CSI 300 ETF case could change an investor's judgement about how can one fund hold many companies. 5. Judge: Give your own evidence-based classroom verdict on ChinaAMC CSI 300 ETF: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen ChinaAMC CSI 300 ETF extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: How can one fund hold many companies?",
        "mustAssess": "ETF-versus-single-share comparison with one portfolio-weight calculation, one risk reduced, one risk remaining and one risk-return trade-off sentence. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Lessons 16-19 risk types and Lesson 4 ownership of shares.",
        "newKnowledge": "an ETF or index fund can spread exposure across many holdings; diversification reduces company-specific risk but leaves market, sector, tracking and cost risks. Portfolio weight shows how important one holding is inside the fund. Diversification is rational risk control, not a guarantee of return.",
        "avoidOverlap": "make portfolio weight the main calculation; treat expense ratio as a read-only factsheet item unless the deck needs an extension.",
        "misconception": "diversification removes all investment risk.",
        "evidenceTask": "read a China-relevant ETF factsheet and identify holdings, index, cost and remaining risks.",
        "studentOutput": "one ETF-versus-single-share comparison with one portfolio-weight calculation, one risk reduced, one risk remaining and one risk-return trade-off sentence."
      },
      "coreClaim": "Diversification reduces company-specific risk but does not remove market, sector or fund risks.",
      "caseRole": "fund",
      "primaryOutput": {
        "type": "etf-comparison",
        "description": "one ETF-versus-single-share comparison with weight, risk reduced and risk remaining"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "ETF factsheet",
          "holdings table",
          "fund cost/index description"
        ],
        "preferredSourceOrder": [
          "issuer factsheet",
          "index provider or exchange source",
          "market snapshot only if trading context is needed"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Compare",
        "marks": 4,
        "stimulusType": "ETF factsheet extract",
        "calculationRequirement": "portfolio weight = holding value / total portfolio value x 100; expense ratio and tracking are read-only factsheet fields unless extending.",
        "judgementRequirement": "ETF-versus-single-share comparison with one portfolio-weight calculation, one risk reduced, one risk remaining and one risk-return trade-off sentence. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Make portfolio weight the main calculation; treat expense ratio as read-only unless extending. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Instead of choosing one company, what happens if you buy a basket?",
          "Hook: start with ChinaAMC CSI 300 ETF and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Lessons 16-19 risk types and Lesson 4 ownership of shares.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new ChinaAMC CSI 300 ETF evidence.",
          "Teach: make students write the core claim: Diversification reduces company-specific risk but does not remove market, sector or fund risks.",
          "Evidence practice: Read a China-relevant ETF factsheet and identify holdings, index, cost and remaining risks.",
          "Output rehearsal: students build one ETF-versus-single-share comparison with weight, risk reduced and risk remaining.",
          "Analyse why: students build a data -> concept -> investor implication chain for ChinaAMC CSI 300 ETF.",
          "Investment action: students apply the decision rule - Diversification reduces single-company risk but does not remove market risk, fees or concentration.",
          "Exit ticket: students submit ETF-versus-single-share comparison with one portfolio-weight calculation, one risk reduced, one risk remaining and one risk-return trade-off sentence."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record ChinaAMC CSI 300 ETF source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: ETF, index fund, diversification, portfolio weight.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short ChinaAMC CSI 300 ETF case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define ETF. 2. Calculate/Interpret: Use or interpret the lesson formula: portfolio weight = holding value / total portfolio value x 100; expense ratio and tracking are read-only factsheet fields unless extending. 3. Explain: Explain what one ChinaAMC CSI 300 ETF evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the ChinaAMC CSI 300 ETF case could change an investor's judgement about how can one fund hold many companies. 5. Judge: Give your own evidence-based classroom verdict on ChinaAMC CSI 300 ETF: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Compare one ETF with one single-company share using one portfolio weight, one risk reduced and one risk remaining.",
            "expectedStudentWork": "one ETF-versus-single-share comparison with weight, risk reduced and risk remaining"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Diversification removes all investment risk.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "ETF-versus-single-share comparison with one portfolio-weight calculation, one risk reduced, one risk remaining and one risk-return trade-off sentence.",
            "expectedStudentWork": "one ETF-versus-single-share comparison with weight, risk reduced and risk remaining"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for ChinaAMC CSI 300 ETF."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the ChinaAMC CSI 300 ETF case could change an investor's judgement about how can one fund hold many companies.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using ChinaAMC CSI 300 ETF evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Diversification removes all investment risk.",
          "answer": "No",
          "explanation": "Correct the misconception using ChinaAMC CSI 300 ETF evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about ChinaAMC CSI 300 ETF?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the ChinaAMC CSI 300 ETF case.",
          "pairs": [
            {
              "term": "ETF",
              "match": "an exchange-traded fund that can be bought and sold on a stock exchange."
            },
            {
              "term": "index fund",
              "match": "a fund designed to track a market index rather than pick individual shares."
            },
            {
              "term": "diversification",
              "match": "spreading investment across different holdings to reduce risk."
            },
            {
              "term": "portfolio weight",
              "match": "one holding's value as a share of total portfolio value."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using ChinaAMC CSI 300 ETF evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short ChinaAMC CSI 300 ETF case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define ETF."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: portfolio weight = holding value / total portfolio value x 100; expense ratio and tracking are read-only factsheet fields unless extending."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one ChinaAMC CSI 300 ETF evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the ChinaAMC CSI 300 ETF case could change an investor's judgement about how can one fund hold many companies."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on ChinaAMC CSI 300 ETF: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Diversification-action",
        "studentAction": "Use an ETF factsheet to see how one fund spreads exposure across many companies.",
        "decisionRule": "Diversification reduces single-company risk but does not remove market risk, fees or concentration.",
        "portfolioQuestion": "Ask whether the investor should analyse a fund instead of choosing one company.",
        "classroomOutput": "I can judge whether the ChinaAMC CSI 300 ETF gives useful broad exposure or still needs caution. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "Instead of choosing one company, what happens if you buy a basket?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Instead of choosing one company, what happens if you buy a basket?"
        },
        {
          "label": "Key idea",
          "text": "Diversification reduces company-specific risk but does not remove market, sector or fund risks."
        },
        {
          "label": "Try it",
          "text": "one ETF-versus-single-share comparison with weight, risk reduced and risk remaining"
        },
        {
          "label": "Decide",
          "text": "I can judge whether the ChinaAMC CSI 300 ETF gives useful broad exposure or still needs caution. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 21,
      "company": "Tencent",
      "guidingQuestion": "What makes a platform company attractive or risky?",
      "guidingQuestionZh": "平台公司为什么有吸引力，也为什么有风险？",
      "handoutMaterial": "Platform evidence board, attraction-risk-price triangle and balanced judgement planner.",
      "formativeAssessment": "Balanced-board check: students place evidence into attraction, risk, price or unsupported claim. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "A platform business connects different user groups and creates value by enabling interactions, transactions, content, services or data exchange between them."
        },
        {
          "term": "network effects",
          "zh": "网络效应",
          "definition": "Network effects occur when a product or service becomes more valuable as more users, buyers, sellers or partners join it."
        },
        {
          "term": "regulatory overhang",
          "zh": "监管不确定性",
          "definition": "Regulatory overhang is uncertainty created when possible future regulation may affect a company's operations, valuation or investor confidence."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Tencent case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define platform business. 2. Calculate/Interpret: Use or interpret the lesson formula: combine growth, margin, P/E and risk notes; no single new formula. 3. Explain: Explain what one Tencent evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Tencent case could change an investor's judgement about what makes a platform company attractive or risky. 5. Judge: Give your own evidence-based classroom verdict on Tencent: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Tencent extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: What makes a platform company attractive or risky?",
        "mustAssess": "Attraction-risk-price triangle with one evidence point in each corner. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "Tencent familiarity from Lesson 1 plus growth, margin, P/E and risk tools from Units 2-4.",
        "newKnowledge": "a platform business can gain from network effects, but platform strength must be balanced against regulation, competition and price.",
        "avoidOverlap": "do not reteach basic share-price meaning or revenue definitions; use them as retrieval only.",
        "misconception": "a large platform with many users is automatically low-risk.",
        "evidenceTask": "combine Tencent revenue mix, margin evidence and one dated risk note.",
        "studentOutput": "one attraction-risk-price triangle with one evidence point in each corner."
      },
      "coreClaim": "Platform network effects can be attractive, but price, competition and regulation still matter.",
      "caseRole": "synthesis case",
      "primaryOutput": {
        "type": "attraction-risk-price-triangle",
        "description": "one attraction-risk-price triangle with one evidence point in each corner"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company report or results presentation",
          "dated market valuation or quote snapshot when price is discussed",
          "risk/news/regulatory source only when needed for the case question"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Assess",
        "marks": 6,
        "stimulusType": "multi-evidence company case extract",
        "calculationRequirement": "combine growth, margin, P/E and risk notes; no single new formula.",
        "judgementRequirement": "Attraction-risk-price triangle with one evidence point in each corner. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not reteach share-price meaning or revenue definitions. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Platform companies look powerful. What makes that power durable or risky?",
          "Hook: start with Tencent and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate Tencent familiarity from Lesson 1 plus growth, margin, P/E and risk tools from Units 2-4.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Tencent evidence.",
          "Teach: make students write the core claim: Platform network effects can be attractive, but price, competition and regulation still matter.",
          "Evidence practice: Combine Tencent revenue mix, margin evidence and one dated risk note.",
          "Output rehearsal: students build one attraction-risk-price triangle with one evidence point in each corner.",
          "Analyse why: students build a data -> concept -> investor implication chain for Tencent.",
          "Investment action: students apply the decision rule - Platform size is useful only if it links to monetisation, competition and regulation evidence.",
          "Exit ticket: students submit Attraction-risk-price triangle with one evidence point in each corner."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Tencent source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: platform business, network effects, regulatory overhang.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Tencent case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define platform business. 2. Calculate/Interpret: Use or interpret the lesson formula: combine growth, margin, P/E and risk notes; no single new formula. 3. Explain: Explain what one Tencent evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Tencent case could change an investor's judgement about what makes a platform company attractive or risky. 5. Judge: Give your own evidence-based classroom verdict on Tencent: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Complete one attraction-risk-price triangle for Tencent.",
            "expectedStudentWork": "one attraction-risk-price triangle with one evidence point in each corner"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "A large platform with many users is automatically low-risk.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Attraction-risk-price triangle with one evidence point in each corner.",
            "expectedStudentWork": "one attraction-risk-price triangle with one evidence point in each corner"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Tencent."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Tencent case could change an investor's judgement about what makes a platform company attractive or risky.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Tencent evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: A large platform with many users is automatically low-risk.",
          "answer": "No",
          "explanation": "Correct the misconception using Tencent evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Tencent?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Tencent case.",
          "pairs": [
            {
              "term": "platform business",
              "match": "a business that connects different user groups."
            },
            {
              "term": "network effects",
              "match": "when a service becomes more valuable as more people use it."
            },
            {
              "term": "regulatory overhang",
              "match": "uncertainty caused by possible future rules."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Tencent evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Tencent case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define platform business."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: combine growth, margin, P/E and risk notes; no single new formula."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Tencent evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Tencent case could change an investor's judgement about what makes a platform company attractive or risky."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Tencent: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Platform-quality action",
        "studentAction": "Judge whether a platform company has network effects, user strength and risk that justify attention.",
        "decisionRule": "Platform size is useful only if it links to monetisation, competition and regulation evidence.",
        "portfolioQuestion": "Ask whether the investor is buying durable platform quality or a weak growth story.",
        "classroomOutput": "I can write a Tencent platform verdict with one strength, one risk and one action. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "Platform companies look powerful. What makes that power durable or risky?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Platform companies look powerful. What makes that power durable or risky?"
        },
        {
          "label": "Key idea",
          "text": "Platform network effects can be attractive, but price, competition and regulation still matter."
        },
        {
          "label": "Try it",
          "text": "one attraction-risk-price triangle with one evidence point in each corner"
        },
        {
          "label": "Decide",
          "text": "I can write a Tencent platform verdict with one strength, one risk and one action. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 22,
      "company": "BYD",
      "guidingQuestion": "Is BYD attractive because it is strong, or because the price is fair?",
      "guidingQuestionZh": "比亚迪有吸引力是因为业务强，还是因为价格合理？",
      "handoutMaterial": "Strength-price-risk evidence matrix, manufacturing evidence notes and attractiveness judgement frame.",
      "formativeAssessment": "Evidence-tagging check: business strength, valuation, risk or missing evidence. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Vertical integration is a strategy in which a company controls more than one stage of its supply chain, such as production, components, distribution or retail."
        },
        {
          "term": "capacity",
          "zh": "产能",
          "definition": "Capacity is the maximum amount a company can produce, deliver or serve using its available resources over a period."
        },
        {
          "term": "cyclicality",
          "zh": "周期性",
          "definition": "Cyclicality is the sensitivity of a company's sales, profit or valuation to changes in the economic cycle or industry demand cycle."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short BYD case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define vertical integration. 2. Calculate/Interpret: Use or interpret the lesson formula: compare margin and growth; then add price and risk evidence. 3. Explain: Explain what one BYD evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the BYD case could change an investor's judgement about is BYD attractive because it is strong, or because the price is fair. 5. Judge: Give your own evidence-based classroom verdict on BYD: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen BYD extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Is BYD attractive because it is strong, or because the price is fair?",
        "mustAssess": "Strength-price-risk evidence matrix separating business strength from investment attractiveness. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "BYD margin work from Lesson 7 and valuation discipline from Lesson 15.",
        "newKnowledge": "manufacturing strength can come from vertical integration, capacity and cost control, but cyclical demand and price paid still matter.",
        "avoidOverlap": "do not recalculate gross margin from first principles unless used as quick retrieval.",
        "misconception": "operational strength is the same as investment attractiveness.",
        "evidenceTask": "read BYD sales, margin, production or valuation evidence and tag each item as strength, price or risk evidence.",
        "studentOutput": "one strength-price-risk evidence matrix separating business strength from investment attractiveness."
      },
      "coreClaim": "Operational strength must be separated from fair price and manufacturing-cycle risk.",
      "caseRole": "synthesis case",
      "primaryOutput": {
        "type": "strength-price-risk-matrix",
        "description": "one strength-price-risk evidence matrix separating business strength from investment attractiveness"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company report or results presentation",
          "dated market valuation or quote snapshot when price is discussed",
          "risk/news/regulatory source only when needed for the case question"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Assess",
        "marks": 6,
        "stimulusType": "multi-evidence company case extract",
        "calculationRequirement": "compare margin and growth; then add price and risk evidence.",
        "judgementRequirement": "Strength-price-risk evidence matrix separating business strength from investment attractiveness. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not recalculate gross margin from first principles except as retrieval. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Strength is not the same as a fair price. Which matters more for investors?",
          "Hook: start with BYD and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate BYD margin work from Lesson 7 and valuation discipline from Lesson 15.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new BYD evidence.",
          "Teach: make students write the core claim: Operational strength must be separated from fair price and manufacturing-cycle risk.",
          "Evidence practice: Tag BYD sales, margin, production or valuation evidence as strength, price or risk evidence.",
          "Output rehearsal: students build one strength-price-risk evidence matrix separating business strength from investment attractiveness.",
          "Analyse why: students build a data -> concept -> investor implication chain for BYD.",
          "Investment action: students apply the decision rule - A strong company can still be a weak investment if expectations and price are too high.",
          "Exit ticket: students submit Strength-price-risk evidence matrix separating business strength from investment attractiveness."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record BYD source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: vertical integration, capacity, cyclicality.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short BYD case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define vertical integration. 2. Calculate/Interpret: Use or interpret the lesson formula: compare margin and growth; then add price and risk evidence. 3. Explain: Explain what one BYD evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the BYD case could change an investor's judgement about is BYD attractive because it is strong, or because the price is fair. 5. Judge: Give your own evidence-based classroom verdict on BYD: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Complete one BYD strength-price-risk evidence matrix.",
            "expectedStudentWork": "one strength-price-risk evidence matrix separating business strength from investment attractiveness"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Operational strength equals investment attractiveness.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Strength-price-risk evidence matrix separating business strength from investment attractiveness.",
            "expectedStudentWork": "one strength-price-risk evidence matrix separating business strength from investment attractiveness"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for BYD."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the BYD case could change an investor's judgement about is BYD attractive because it is strong, or because the price is fair.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using BYD evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Operational strength equals investment attractiveness.",
          "answer": "No",
          "explanation": "Correct the misconception using BYD evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about BYD?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the BYD case.",
          "pairs": [
            {
              "term": "vertical integration",
              "match": "control over several stages of the supply chain."
            },
            {
              "term": "capacity",
              "match": "how much a company can produce."
            },
            {
              "term": "cyclicality",
              "match": "sensitivity to economic cycles and demand changes."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using BYD evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short BYD case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define vertical integration."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: compare margin and growth; then add price and risk evidence."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one BYD evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the BYD case could change an investor's judgement about is BYD attractive because it is strong, or because the price is fair."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on BYD: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Strength-versus-price action",
        "studentAction": "Separate BYD business strength from whether the share price is fair.",
        "decisionRule": "A strong company can still be a weak investment if expectations and price are too high.",
        "portfolioQuestion": "Ask whether another auto or battery choice offers a better risk-return-price trade-off.",
        "classroomOutput": "I can decide whether BYD is consider, watch or too expensive using strength and price evidence."
      },
      "studentHook": "Strength is not the same as a fair price. Which matters more for investors?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Strength is not the same as a fair price. Which matters more for investors?"
        },
        {
          "label": "Key idea",
          "text": "Operational strength must be separated from fair price and manufacturing-cycle risk."
        },
        {
          "label": "Try it",
          "text": "one strength-price-risk evidence matrix separating business strength from investment attractiveness"
        },
        {
          "label": "Decide",
          "text": "I can decide whether BYD is consider, watch or too expensive using strength and price evidence."
        }
      ]
    },
    {
      "lesson": 23,
      "company": "HSBC",
      "guidingQuestion": "Why is analysing a bank different from analysing a tech company?",
      "guidingQuestionZh": "分析银行为什么不同于分析科技公司？",
      "handoutMaterial": "Bank evidence extract, bank-versus-tech exception note and bank-specific risk prompt.",
      "formativeAssessment": "Company-type check: students decide whether evidence is bank-specific or general company evidence. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Interest margin is the spread between interest earned on loans or other earning assets and interest paid on deposits or other funding; net interest margin compares that spread with average earning assets."
        },
        {
          "term": "credit risk",
          "zh": "信用风险",
          "definition": "Credit risk is the risk of loss caused by a borrower or counterparty failing to make timely payments or by a change in the value of a financial instrument because default risk changes."
        },
        {
          "term": "capital strength",
          "zh": "资本实力",
          "definition": "Capital strength is a financial institution's ability to absorb losses and continue operating, supported by equity capital, reserves and regulatory capital ratios."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short HSBC case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define interest margin. 2. Calculate/Interpret: Use or interpret the lesson formula: basic ratio reading only; avoid advanced bank formulas in Grade 9 decks. 3. Explain: Explain what one HSBC evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the HSBC case could change an investor's judgement about why is analysing a bank different from analysing a tech company. 5. Judge: Give your own evidence-based classroom verdict on HSBC: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen HSBC extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Why is analysing a bank different from analysing a tech company?",
        "mustAssess": "Bank-evidence exception note explaining why one ordinary company metric is insufficient. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "HSBC dividend work from Lesson 12 and risk classification from Unit 4.",
        "newKnowledge": "financial companies need different evidence because interest margins, credit risk and capital strength drive the business.",
        "avoidOverlap": "do not teach advanced bank ratios; keep the deck to basic evidence reading and one bank-specific risk.",
        "misconception": "bank revenue and profit can be analysed exactly like a technology or consumer company.",
        "evidenceTask": "read an HSBC results summary and identify one bank-specific evidence item.",
        "studentOutput": "one bank-evidence exception note explaining why one ordinary company metric is insufficient."
      },
      "coreClaim": "Banks require bank-specific evidence, so ordinary company metrics can mislead if used alone.",
      "caseRole": "synthesis case",
      "primaryOutput": {
        "type": "bank-exception-note",
        "description": "one bank-evidence exception note explaining why an ordinary metric is insufficient"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company report or results presentation",
          "dated market valuation or quote snapshot when price is discussed",
          "risk/news/regulatory source only when needed for the case question"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Explain",
        "marks": 4,
        "stimulusType": "multi-evidence company case extract",
        "calculationRequirement": "basic ratio reading only; avoid advanced bank formulas in Grade 9 decks.",
        "judgementRequirement": "Bank-evidence exception note explaining why one ordinary company metric is insufficient. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Avoid advanced bank ratios. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Banks are different machines. What makes their evidence different?",
          "Hook: start with HSBC and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate HSBC dividend work from Lesson 12 and risk classification from Unit 4.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new HSBC evidence.",
          "Teach: make students write the core claim: Banks require bank-specific evidence, so ordinary company metrics can mislead if used alone.",
          "Evidence practice: Read HSBC results summary and identify one bank-specific evidence item.",
          "Output rehearsal: students build one bank-evidence exception note explaining why an ordinary metric is insufficient.",
          "Analyse why: students build a data -> concept -> investor implication chain for HSBC.",
          "Investment action: students apply the decision rule - Banks require attention to capital, loan risk, interest rates and regulation.",
          "Exit ticket: students submit Bank-evidence exception note explaining why one ordinary company metric is insufficient."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record HSBC source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: interest margin, credit risk, capital strength.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short HSBC case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define interest margin. 2. Calculate/Interpret: Use or interpret the lesson formula: basic ratio reading only; avoid advanced bank formulas in Grade 9 decks. 3. Explain: Explain what one HSBC evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the HSBC case could change an investor's judgement about why is analysing a bank different from analysing a tech company. 5. Judge: Give your own evidence-based classroom verdict on HSBC: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Write one bank-evidence exception note.",
            "expectedStudentWork": "one bank-evidence exception note explaining why an ordinary metric is insufficient"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Banks can be analysed exactly like technology or consumer firms.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Bank-evidence exception note explaining why one ordinary company metric is insufficient.",
            "expectedStudentWork": "one bank-evidence exception note explaining why an ordinary metric is insufficient"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for HSBC."
      },
      "caseReview": {
        "status": "review-before-production",
        "reason": "Bank evidence can become too technical; use only clear student-readable interest margin, credit risk or capital-strength evidence.",
        "replacementCandidate": "Standard Chartered if HSBC source extracts do not give a clean bank-specific contrast.",
        "sourceFit": "pending-source-pack-check"
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the HSBC case could change an investor's judgement about why is analysing a bank different from analysing a tech company.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using HSBC evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Banks can be analysed exactly like technology or consumer firms.",
          "answer": "No",
          "explanation": "Correct the misconception using HSBC evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about HSBC?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the HSBC case.",
          "pairs": [
            {
              "term": "interest margin",
              "match": "the spread between lending income and funding cost."
            },
            {
              "term": "credit risk",
              "match": "the risk that borrowers do not repay."
            },
            {
              "term": "capital strength",
              "match": "ability to absorb losses and keep operating."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using HSBC evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short HSBC case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define interest margin."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: basic ratio reading only; avoid advanced bank formulas in Grade 9 decks."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one HSBC evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the HSBC case could change an investor's judgement about why is analysing a bank different from analysing a tech company."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on HSBC: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Financial-company action",
        "studentAction": "Analyse a bank with bank-specific evidence rather than treating it like a normal tech or consumer company.",
        "decisionRule": "Banks require attention to capital, loan risk, interest rates and regulation.",
        "portfolioQuestion": "Ask whether the investor understands the different risk engine before comparing sectors.",
        "classroomOutput": "I can explain why HSBC needs a different investment checklist. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "Banks are different machines. What makes their evidence different?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Banks are different machines. What makes their evidence different?"
        },
        {
          "label": "Key idea",
          "text": "Banks require bank-specific evidence, so ordinary company metrics can mislead if used alone."
        },
        {
          "label": "Try it",
          "text": "one bank-evidence exception note explaining why an ordinary metric is insufficient"
        },
        {
          "label": "Decide",
          "text": "I can explain why HSBC needs a different investment checklist. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 24,
      "company": "Anta Sports",
      "guidingQuestion": "How much is a strong brand worth to investors?",
      "guidingQuestionZh": "强品牌对投资者有多大价值？",
      "handoutMaterial": "Brand-to-margin evidence map, inventory evidence cards and pricing-power limitation sentence.",
      "formativeAssessment": "Link check: brand evidence -> pricing power or inventory risk -> profit effect. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Brand equity is the value created by a company's brand name, reputation, customer loyalty and perceived quality."
        },
        {
          "term": "inventory risk",
          "zh": "库存风险",
          "definition": "Inventory risk is the risk that unsold or obsolete goods reduce profit through discounting, write-downs, storage costs or lost working capital."
        },
        {
          "term": "pricing power",
          "zh": "定价能力",
          "definition": "Pricing power is the ability to raise prices or maintain high prices without losing too many customers or too much sales volume."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Anta Sports case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define brand equity. 2. Calculate/Interpret: Interpret one figure or evidence statement from the case and state what it can and cannot prove. 3. Explain: Explain what one Anta Sports evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Anta Sports case could change an investor's judgement about how much is a strong brand worth to investors. 5. Judge: Give your own evidence-based classroom verdict on Anta Sports: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Anta Sports extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: How much is a strong brand worth to investors?",
        "mustAssess": "Brand-to-margin evidence map plus one limitation linked to inventory or demand. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "revenue, margin and competition analysis from Lessons 6-8 and 17.",
        "newKnowledge": "brand equity can support pricing power and margins, but inventory risk and changing demand can weaken the case.",
        "avoidOverlap": "do not repeat generic sector-risk language unless it is tied to brand, inventory or pricing power.",
        "misconception": "a strong or famous brand guarantees high profit and low risk.",
        "evidenceTask": "use Anta revenue, margin, brand and inventory notes to classify support and limitation evidence.",
        "studentOutput": "one brand-to-margin evidence map plus one limitation linked to inventory or demand."
      },
      "coreClaim": "Brand strength matters only when it connects to pricing power, margins and inventory or demand limits.",
      "caseRole": "synthesis case",
      "primaryOutput": {
        "type": "brand-to-margin-map",
        "description": "one brand-to-margin evidence map with an inventory or demand limitation"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company report or results presentation",
          "dated market valuation or quote snapshot when price is discussed",
          "risk/news/regulatory source only when needed for the case question"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Explain",
        "marks": 4,
        "stimulusType": "multi-evidence company case extract",
        "calculationRequirement": "No new calculation; assess evidence reading and judgement.",
        "judgementRequirement": "Brand-to-margin evidence map plus one limitation linked to inventory or demand. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not repeat generic sector risk unless tied to brand, inventory or pricing power. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: A brand can make customers pay more. Is that enough for investors?",
          "Hook: start with Anta Sports and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate revenue, margin and competition analysis from Lessons 6-8 and 17.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Anta Sports evidence.",
          "Teach: make students write the core claim: Brand strength matters only when it connects to pricing power, margins and inventory or demand limits.",
          "Evidence practice: Classify Anta revenue, margin, brand and inventory notes as support or limitation evidence.",
          "Output rehearsal: students build one brand-to-margin evidence map with an inventory or demand limitation.",
          "Analyse why: students build a data -> concept -> investor implication chain for Anta Sports.",
          "Investment action: students apply the decision rule - A strong brand matters only if it protects revenue, margin or cash flow.",
          "Exit ticket: students submit Brand-to-margin evidence map plus one limitation linked to inventory or demand."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Anta Sports source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: brand equity, inventory risk, pricing power.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Anta Sports case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define brand equity. 2. Calculate/Interpret: Interpret one figure or evidence statement from the case and state what it can and cannot prove. 3. Explain: Explain what one Anta Sports evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Anta Sports case could change an investor's judgement about how much is a strong brand worth to investors. 5. Judge: Give your own evidence-based classroom verdict on Anta Sports: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Complete one brand-to-margin evidence map with one limitation.",
            "expectedStudentWork": "one brand-to-margin evidence map with an inventory or demand limitation"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "A famous brand guarantees high profit and low risk.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Brand-to-margin evidence map plus one limitation linked to inventory or demand.",
            "expectedStudentWork": "one brand-to-margin evidence map with an inventory or demand limitation"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Anta Sports."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Anta Sports case could change an investor's judgement about how much is a strong brand worth to investors.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Anta Sports evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: A famous brand guarantees high profit and low risk.",
          "answer": "No",
          "explanation": "Correct the misconception using Anta Sports evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Anta Sports?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Anta Sports case.",
          "pairs": [
            {
              "term": "brand equity",
              "match": "value created by a strong brand name and reputation."
            },
            {
              "term": "inventory risk",
              "match": "risk that unsold goods reduce profit."
            },
            {
              "term": "pricing power",
              "match": "ability to raise prices without losing too many customers."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Anta Sports evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Anta Sports case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define brand equity."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Interpret one figure or evidence statement from the case and state what it can and cannot prove."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Anta Sports evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Anta Sports case could change an investor's judgement about how much is a strong brand worth to investors."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Anta Sports: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Brand-value action",
        "studentAction": "Use brand evidence to test whether pricing power and customer loyalty support investment quality.",
        "decisionRule": "A strong brand matters only if it protects revenue, margin or cash flow.",
        "portfolioQuestion": "Ask whether the investor is paying for real brand strength or only a popular name.",
        "classroomOutput": "I can judge whether Anta brand evidence improves the investment case. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "A brand can make customers pay more. Is that enough for investors?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "A brand can make customers pay more. Is that enough for investors?"
        },
        {
          "label": "Key idea",
          "text": "Brand strength matters only when it connects to pricing power, margins and inventory or demand limits."
        },
        {
          "label": "Try it",
          "text": "one brand-to-margin evidence map with an inventory or demand limitation"
        },
        {
          "label": "Decide",
          "text": "I can judge whether Anta brand evidence improves the investment case. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 25,
      "company": "Nike",
      "guidingQuestion": "How can we compare a global brand with a China/HK brand?",
      "guidingQuestionZh": "如何比较全球品牌与中国/香港品牌？",
      "handoutMaterial": "Comparable-company metric alignment table, source-date checklist and fair-comparison paragraph frame.",
      "formativeAssessment": "Fairness audit: students mark whether comparison metrics, dates and currencies are aligned. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "A multinational is a company that operates, sells, produces or earns revenue in more than one country."
        },
        {
          "term": "comparable company",
          "zh": "可比公司",
          "definition": "A comparable company is a firm with similar business risk, preferably in the same industry, used as a reference point for comparing growth, margins, valuation or risk."
        },
        {
          "term": "local/global risk",
          "zh": "本地/全球风险",
          "definition": "Local/global risk is the contrast between risks tied to a specific local market and risks created by worldwide exposure across countries, currencies and regulations."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Nike case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define multinational. 2. Calculate/Interpret: Use or interpret the lesson formula: compare two companies using the same metric set. 3. Explain: Explain what one Nike evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Nike case could change an investor's judgement about how can we compare a global brand with a China/HK brand. 5. Judge: Give your own evidence-based classroom verdict on Nike: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Nike extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: How can we compare a global brand with a China/HK brand?",
        "mustAssess": "Comparable-company alignment row plus one fair comparison paragraph naming metric, source date and limitation. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "comparison discipline from Lesson 10 and brand analysis from Lesson 24.",
        "newKnowledge": "comparable-company analysis requires aligned metrics, time periods, source quality and local/global risk awareness.",
        "avoidOverlap": "do not introduce new financial metrics; focus on fair comparison method.",
        "misconception": "two brands can be compared fairly even when the figures use different definitions, years or currencies.",
        "evidenceTask": "align Nike data with one China/HK brand comparison using the same metric set.",
        "studentOutput": "one comparable-company alignment row plus one fair comparison paragraph naming metric, source date and limitation."
      },
      "coreClaim": "Fair company comparison requires aligned metrics, dates, currencies and local/global risk context.",
      "caseRole": "comparison case",
      "primaryOutput": {
        "type": "comparable-company-row",
        "description": "one comparable-company alignment row plus fair comparison paragraph"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company report or results presentation",
          "dated market valuation or quote snapshot when price is discussed",
          "risk/news/regulatory source only when needed for the case question"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Compare",
        "marks": 4,
        "stimulusType": "multi-evidence company case extract",
        "calculationRequirement": "compare two companies using the same metric set.",
        "judgementRequirement": "Comparable-company alignment row plus one fair comparison paragraph naming metric, source date and limitation. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "No new metrics; focus on fair comparison method. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Global brand or China/HK brand: how do we compare fairly?",
          "Hook: start with Nike and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate comparison discipline from Lesson 10 and brand analysis from Lesson 24.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Nike evidence.",
          "Teach: make students write the core claim: Fair company comparison requires aligned metrics, dates, currencies and local/global risk context.",
          "Evidence practice: Align Nike data with one China/HK brand using the same metric set.",
          "Output rehearsal: students build one comparable-company alignment row plus fair comparison paragraph.",
          "Analyse why: students build a data -> concept -> investor implication chain for Nike.",
          "Investment action: students apply the decision rule - A fair comparison needs common metrics and clear caveats about market differences.",
          "Exit ticket: students submit Comparable-company alignment row plus one fair comparison paragraph naming metric, source date and limitation."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Nike source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: multinational, comparable company, local/global risk.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Nike case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define multinational. 2. Calculate/Interpret: Use or interpret the lesson formula: compare two companies using the same metric set. 3. Explain: Explain what one Nike evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Nike case could change an investor's judgement about how can we compare a global brand with a China/HK brand. 5. Judge: Give your own evidence-based classroom verdict on Nike: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Submit one comparable-company alignment row and one fair comparison sentence.",
            "expectedStudentWork": "one comparable-company alignment row plus fair comparison paragraph"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Different years, currencies or metric definitions can still be compared casually.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Comparable-company alignment row plus one fair comparison paragraph naming metric, source date and limitation.",
            "expectedStudentWork": "one comparable-company alignment row plus fair comparison paragraph"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Nike."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Nike case could change an investor's judgement about how can we compare a global brand with a China/HK brand.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Nike evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Different years, currencies or metric definitions can still be compared casually.",
          "answer": "No",
          "explanation": "Correct the misconception using Nike evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Nike?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Nike case.",
          "pairs": [
            {
              "term": "multinational",
              "match": "a company operating across several countries."
            },
            {
              "term": "comparable company",
              "match": "a similar firm used for comparison."
            },
            {
              "term": "local/global risk",
              "match": "risk from specific local markets or worldwide exposure."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Nike evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Nike case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define multinational."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: compare two companies using the same metric set."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Nike evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Nike case could change an investor's judgement about how can we compare a global brand with a China/HK brand."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Nike: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Cross-market comparison action",
        "studentAction": "Compare a global brand and a China/HK brand using the same quality, price and risk criteria.",
        "decisionRule": "A fair comparison needs common metrics and clear caveats about market differences.",
        "portfolioQuestion": "Ask whether the investor should choose, watch both, or gather better comparable evidence.",
        "classroomOutput": "I can compare Nike and Anta and state the better-supported classroom action."
      },
      "studentHook": "Global brand or China/HK brand: how do we compare fairly?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Global brand or China/HK brand: how do we compare fairly?"
        },
        {
          "label": "Key idea",
          "text": "Fair company comparison requires aligned metrics, dates, currencies and local/global risk context."
        },
        {
          "label": "Try it",
          "text": "one comparable-company alignment row plus fair comparison paragraph"
        },
        {
          "label": "Decide",
          "text": "I can compare Nike and Anta and state the better-supported classroom action."
        }
      ]
    },
    {
      "lesson": 26,
      "company": "Haidilao",
      "guidingQuestion": "Can a restaurant company recover after a difficult period?",
      "guidingQuestionZh": "餐饮公司能否在困难时期后恢复？",
      "handoutMaterial": "Recovery timeline, store-network evidence table and traffic-light evidence-sufficiency verdict.",
      "formativeAssessment": "Sufficiency check: students decide whether a recovery claim needs one more evidence item. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "A turnaround is an improvement in a company's performance after a weak period, often involving recovery in sales, profit, cash flow, operations or confidence."
        },
        {
          "term": "store network",
          "zh": "门店网络",
          "definition": "A store network is the set of physical locations through which a company reaches customers, sells products or delivers services."
        },
        {
          "term": "same-store sales",
          "zh": "同店销售",
          "definition": "Same-store sales are sales from stores that were open in both comparison periods, used to separate existing-store performance from expansion."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Haidilao case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define turnaround. 2. Calculate/Interpret: Use or interpret the lesson formula: revenue per store = total revenue / number of stores, if data allows. 3. Explain: Explain what one Haidilao evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Haidilao case could change an investor's judgement about can a restaurant company recover after a difficult period. 5. Judge: Give your own evidence-based classroom verdict on Haidilao: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Haidilao extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Can a restaurant company recover after a difficult period?",
        "mustAssess": "Red/amber/green recovery verdict explaining whether the claim needs more evidence. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "evidence discipline, revenue analysis, margin caution and valuation/risk judgement from earlier units.",
        "newKnowledge": "turnaround analysis asks whether weak performance is genuinely improving and whether the store network is higher quality.",
        "avoidOverlap": "do not introduce full restaurant accounting; revenue per store is optional and only if the data is clean.",
        "misconception": "one recovery figure proves the turnaround is complete.",
        "evidenceTask": "compare Haidilao store count, revenue or operating recovery evidence across periods.",
        "studentOutput": "one red/amber/green recovery verdict explaining whether the claim needs more evidence."
      },
      "coreClaim": "Recovery judgement needs enough evidence across operations, stores, revenue and profitability.",
      "caseRole": "synthesis case",
      "primaryOutput": {
        "type": "recovery-verdict",
        "description": "one red/amber/green recovery verdict explaining the evidence gap"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company report or results presentation",
          "dated market valuation or quote snapshot when price is discussed",
          "risk/news/regulatory source only when needed for the case question"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Assess",
        "marks": 6,
        "stimulusType": "multi-evidence company case extract",
        "calculationRequirement": "Optional calculation only if source data is clean: revenue per store = total revenue / number of stores, if data allows.",
        "judgementRequirement": "Red/amber/green recovery verdict explaining whether the claim needs more evidence. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Revenue per store is optional and only if data is clean. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: A restaurant recovers after a difficult period. Is recovery enough?",
          "Hook: start with Haidilao and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate evidence discipline, revenue analysis, margin caution and valuation/risk judgement from earlier units.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Haidilao evidence.",
          "Teach: make students write the core claim: Recovery judgement needs enough evidence across operations, stores, revenue and profitability.",
          "Evidence practice: Compare Haidilao store count, revenue or operating recovery evidence across periods.",
          "Output rehearsal: students build one red/amber/green recovery verdict explaining the evidence gap.",
          "Analyse why: students build a data -> concept -> investor implication chain for Haidilao.",
          "Investment action: students apply the decision rule - A rebound from a difficult period is not enough if quality and price are not convincing.",
          "Exit ticket: students submit Red/amber/green recovery verdict explaining whether the claim needs more evidence."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Haidilao source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: turnaround, store network, same-store sales.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Haidilao case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define turnaround. 2. Calculate/Interpret: Use or interpret the lesson formula: revenue per store = total revenue / number of stores, if data allows. 3. Explain: Explain what one Haidilao evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Haidilao case could change an investor's judgement about can a restaurant company recover after a difficult period. 5. Judge: Give your own evidence-based classroom verdict on Haidilao: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Give a red/amber/green recovery verdict and justify the evidence gap.",
            "expectedStudentWork": "one red/amber/green recovery verdict explaining the evidence gap"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "One recovery figure proves the turnaround is complete.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Red/amber/green recovery verdict explaining whether the claim needs more evidence.",
            "expectedStudentWork": "one red/amber/green recovery verdict explaining the evidence gap"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Haidilao."
      },
      "caseReview": {
        "status": "review-before-production",
        "reason": "Recovery evidence needs comparable period data; same-store sales or store-network evidence may be incomplete.",
        "replacementCandidate": "Yum China if Haidilao recovery data is not clean enough.",
        "sourceFit": "pending-source-pack-check"
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Haidilao case could change an investor's judgement about can a restaurant company recover after a difficult period.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Haidilao evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: One recovery figure proves the turnaround is complete.",
          "answer": "No",
          "explanation": "Correct the misconception using Haidilao evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Haidilao?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Haidilao case.",
          "pairs": [
            {
              "term": "turnaround",
              "match": "improvement after a weak period."
            },
            {
              "term": "store network",
              "match": "the set of locations through which a company serves customers."
            },
            {
              "term": "same-store sales",
              "match": "sales from stores open in both comparison periods."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Haidilao evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Haidilao case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define turnaround."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: revenue per store = total revenue / number of stores, if data allows."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Haidilao evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Haidilao case could change an investor's judgement about can a restaurant company recover after a difficult period."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Haidilao: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Recovery-action",
        "studentAction": "Test whether a recovery story is supported by revenue, margin, cash or store evidence.",
        "decisionRule": "A rebound from a difficult period is not enough if quality and price are not convincing.",
        "portfolioQuestion": "Ask whether the investor is buying recovery evidence or just hoping for a turnaround.",
        "classroomOutput": "I can decide whether Haidilao recovery evidence supports consider, watch or avoid."
      },
      "studentHook": "A restaurant recovers after a difficult period. Is recovery enough?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "A restaurant recovers after a difficult period. Is recovery enough?"
        },
        {
          "label": "Key idea",
          "text": "Recovery judgement needs enough evidence across operations, stores, revenue and profitability."
        },
        {
          "label": "Try it",
          "text": "one red/amber/green recovery verdict explaining the evidence gap"
        },
        {
          "label": "Decide",
          "text": "I can decide whether Haidilao recovery evidence supports consider, watch or avoid."
        }
      ]
    },
    {
      "lesson": 27,
      "company": "Trip.com",
      "guidingQuestion": "Why can travel companies rise and fall with the economy?",
      "guidingQuestionZh": "旅游公司为什么会随经济周期起落？",
      "handoutMaterial": "Before/after travel-cycle data table, operating-margin calculation and operating-leverage chain diagram.",
      "formativeAssessment": "Causal-chain check: travel demand -> revenue -> operating profit -> margin. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Cyclical demand is demand that rises and falls with economic conditions, consumer confidence, income, travel activity or industry cycles."
        },
        {
          "term": "recovery",
          "zh": "复苏",
          "definition": "Recovery is a return toward earlier activity, revenue, profit or demand levels after a weak period or disruption."
        },
        {
          "term": "operating leverage",
          "zh": "经营杠杆",
          "definition": "Operating leverage is the use of fixed operating costs in a company's cost structure, making profit more sensitive to changes in revenue."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Trip.com case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define cyclical demand. 2. Calculate/Interpret: Use or interpret the lesson formula: operating margin = operating profit / revenue x 100. 3. Explain: Explain what one Trip.com evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Trip.com case could change an investor's judgement about why can travel companies rise and fall with the economy. 5. Judge: Give your own evidence-based classroom verdict on Trip.com: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Trip.com extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Why can travel companies rise and fall with the economy?",
        "mustAssess": "Operating-leverage chain diagram linking travel demand, revenue, operating profit and margin. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "margin analysis from Unit 2, sector/cyclical risk from Unit 4 and turnaround thinking from Lesson 26.",
        "newKnowledge": "cyclical demand and operating leverage can make profit move faster than revenue when fixed costs are important.",
        "avoidOverlap": "do not turn the lesson into macroeconomics; keep the focus on company evidence before and after a travel cycle change.",
        "misconception": "revenue and profit should rise or fall at the same rate.",
        "evidenceTask": "compare Trip.com revenue and operating profit before and after a travel-cycle shift.",
        "studentOutput": "one operating-leverage chain diagram linking travel demand, revenue, operating profit and margin."
      },
      "coreClaim": "Cyclical demand can make operating profit move faster than revenue through operating leverage.",
      "caseRole": "synthesis case",
      "primaryOutput": {
        "type": "operating-leverage-chain",
        "description": "one operating-leverage chain diagram linking demand, revenue, operating profit and margin"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company report or results presentation",
          "dated market valuation or quote snapshot when price is discussed",
          "risk/news/regulatory source only when needed for the case question"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Explain",
        "marks": 4,
        "stimulusType": "multi-evidence company case extract",
        "calculationRequirement": "operating margin = operating profit / revenue x 100.",
        "judgementRequirement": "Operating-leverage chain diagram linking travel demand, revenue, operating profit and margin. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not turn this into a macroeconomics lesson. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Travel demand can surge or disappear. How does that change investment risk?",
          "Hook: start with Trip.com and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate margin analysis from Unit 2, sector/cyclical risk from Unit 4 and turnaround thinking from Lesson 26.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Trip.com evidence.",
          "Teach: make students write the core claim: Cyclical demand can make operating profit move faster than revenue through operating leverage.",
          "Evidence practice: Compare Trip.com revenue and operating profit before and after a travel-cycle shift.",
          "Output rehearsal: students build one operating-leverage chain diagram linking demand, revenue, operating profit and margin.",
          "Analyse why: students build a data -> concept -> investor implication chain for Trip.com.",
          "Investment action: students apply the decision rule - Cyclical upside comes with downside risk when demand weakens.",
          "Exit ticket: students submit Operating-leverage chain diagram linking travel demand, revenue, operating profit and margin."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Trip.com source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: cyclical demand, recovery, operating leverage.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Trip.com case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define cyclical demand. 2. Calculate/Interpret: Use or interpret the lesson formula: operating margin = operating profit / revenue x 100. 3. Explain: Explain what one Trip.com evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Trip.com case could change an investor's judgement about why can travel companies rise and fall with the economy. 5. Judge: Give your own evidence-based classroom verdict on Trip.com: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Complete a demand -> revenue -> operating profit -> margin chain diagram.",
            "expectedStudentWork": "one operating-leverage chain diagram linking demand, revenue, operating profit and margin"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Revenue and profit should move at the same rate.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Operating-leverage chain diagram linking travel demand, revenue, operating profit and margin.",
            "expectedStudentWork": "one operating-leverage chain diagram linking demand, revenue, operating profit and margin"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Trip.com."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Trip.com case could change an investor's judgement about why can travel companies rise and fall with the economy.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Trip.com evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Revenue and profit should move at the same rate.",
          "answer": "No",
          "explanation": "Correct the misconception using Trip.com evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Trip.com?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Trip.com case.",
          "pairs": [
            {
              "term": "cyclical demand",
              "match": "demand that rises and falls with economic conditions."
            },
            {
              "term": "recovery",
              "match": "return toward earlier activity or profit levels."
            },
            {
              "term": "operating leverage",
              "match": "profit sensitivity when fixed costs are high."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Trip.com evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Trip.com case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define cyclical demand."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: operating margin = operating profit / revenue x 100."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Trip.com evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Trip.com case could change an investor's judgement about why can travel companies rise and fall with the economy."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Trip.com: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Cyclical-risk action",
        "studentAction": "Check how economic cycles and travel demand could make profit rise or fall faster than revenue.",
        "decisionRule": "Cyclical upside comes with downside risk when demand weakens.",
        "portfolioQuestion": "Ask whether the investor can tolerate cycle risk and wait through weak periods.",
        "classroomOutput": "I can write a Trip.com cycle-risk action with one indicator to monitor. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "Travel demand can surge or disappear. How does that change investment risk?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Travel demand can surge or disappear. How does that change investment risk?"
        },
        {
          "label": "Key idea",
          "text": "Cyclical demand can make operating profit move faster than revenue through operating leverage."
        },
        {
          "label": "Try it",
          "text": "one operating-leverage chain diagram linking demand, revenue, operating profit and margin"
        },
        {
          "label": "Decide",
          "text": "I can write a Trip.com cycle-risk action with one indicator to monitor. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 28,
      "company": "Kuaishou",
      "guidingQuestion": "How does a free app turn users into revenue?",
      "guidingQuestionZh": "免费应用如何把用户转化为收入？",
      "handoutMaterial": "User and revenue metric table, monetisation ladder, ARPU calculation and user-growth limitation prompt.",
      "formativeAssessment": "Metric check: students identify whether a figure measures users, revenue, ARPU or profit. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Active users are people who use a digital service during a measured period, such as daily active users or monthly active users."
        },
        {
          "term": "monetisation",
          "zh": "商业化变现",
          "definition": "Monetisation is the process of turning user activity, attention, data, subscriptions, advertising or transactions into revenue."
        },
        {
          "term": "ARPU",
          "zh": "每用户平均收入",
          "definition": "ARPU, or average revenue per user, is revenue divided by the number of users over a stated period."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Kuaishou case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define active users. 2. Calculate/Interpret: Use or interpret the lesson formula: ARPU = revenue / active users. 3. Explain: Explain what one Kuaishou evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Kuaishou case could change an investor's judgement about how does a free app turn users into revenue. 5. Judge: Give your own evidence-based classroom verdict on Kuaishou: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Kuaishou extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: How does a free app turn users into revenue?",
        "mustAssess": "Monetisation ladder plus ARPU calculation and limitation sentence about users, revenue and profit. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "platform thinking from Lesson 21 and revenue/margin caution from Unit 2.",
        "newKnowledge": "user metrics must be connected to monetisation; ARPU shows average revenue per active user, not profit per user.",
        "avoidOverlap": "do not repeat all platform-business concepts; focus on the bridge from users to revenue.",
        "misconception": "more users automatically mean more revenue, higher ARPU or a stronger investment case.",
        "evidenceTask": "read Kuaishou active-user and revenue data from one reporting period.",
        "studentOutput": "one monetisation ladder plus ARPU calculation and limitation sentence about users, revenue and profit."
      },
      "coreClaim": "User growth becomes investment evidence only when linked to monetisation, revenue and profit limits.",
      "caseRole": "synthesis case",
      "primaryOutput": {
        "type": "monetisation-ladder",
        "description": "one monetisation ladder plus ARPU calculation and limitation sentence"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company report or results presentation",
          "dated market valuation or quote snapshot when price is discussed",
          "risk/news/regulatory source only when needed for the case question"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Explain",
        "marks": 4,
        "stimulusType": "multi-evidence company case extract",
        "calculationRequirement": "ARPU = revenue / active users.",
        "judgementRequirement": "Monetisation ladder plus ARPU calculation and limitation sentence about users, revenue and profit. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Do not reteach all platform-business concepts; focus on users to revenue. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Millions of users are impressive. How does that become money?",
          "Hook: start with Kuaishou and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate platform thinking from Lesson 21 and revenue/margin caution from Unit 2.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Kuaishou evidence.",
          "Teach: make students write the core claim: User growth becomes investment evidence only when linked to monetisation, revenue and profit limits.",
          "Evidence practice: Read Kuaishou active-user and revenue data from one reporting period.",
          "Output rehearsal: students build one monetisation ladder plus ARPU calculation and limitation sentence.",
          "Analyse why: students build a data -> concept -> investor implication chain for Kuaishou.",
          "Investment action: students apply the decision rule - More users are not enough unless monetisation, cost and profit evidence improve.",
          "Exit ticket: students submit Monetisation ladder plus ARPU calculation and limitation sentence about users, revenue and profit."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Kuaishou source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: active users, monetisation, ARPU.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Kuaishou case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define active users. 2. Calculate/Interpret: Use or interpret the lesson formula: ARPU = revenue / active users. 3. Explain: Explain what one Kuaishou evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Kuaishou case could change an investor's judgement about how does a free app turn users into revenue. 5. Judge: Give your own evidence-based classroom verdict on Kuaishou: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Complete one monetisation ladder and one ARPU limitation sentence.",
            "expectedStudentWork": "one monetisation ladder plus ARPU calculation and limitation sentence"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "More users automatically mean more revenue, higher ARPU or better investment quality.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Monetisation ladder plus ARPU calculation and limitation sentence about users, revenue and profit.",
            "expectedStudentWork": "one monetisation ladder plus ARPU calculation and limitation sentence"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Kuaishou."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Kuaishou case could change an investor's judgement about how does a free app turn users into revenue.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Kuaishou evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: More users automatically mean more revenue, higher ARPU or better investment quality.",
          "answer": "No",
          "explanation": "Correct the misconception using Kuaishou evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Kuaishou?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Kuaishou case.",
          "pairs": [
            {
              "term": "active users",
              "match": "people who use a service during a measured period."
            },
            {
              "term": "monetisation",
              "match": "turning user activity into revenue."
            },
            {
              "term": "ARPU",
              "match": "average revenue per user."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Kuaishou evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Kuaishou case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define active users."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: ARPU = revenue / active users."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Kuaishou evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Kuaishou case could change an investor's judgement about how does a free app turn users into revenue."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Kuaishou: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Monetisation-action",
        "studentAction": "Trace how users become revenue and whether ARPU evidence supports the investment case.",
        "decisionRule": "More users are not enough unless monetisation, cost and profit evidence improve.",
        "portfolioQuestion": "Ask whether the investor is paying for user growth or proven revenue quality.",
        "classroomOutput": "I can judge whether Kuaishou user and ARPU evidence is attractive, risky or incomplete. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "Millions of users are impressive. How does that become money?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Millions of users are impressive. How does that become money?"
        },
        {
          "label": "Key idea",
          "text": "User growth becomes investment evidence only when linked to monetisation, revenue and profit limits."
        },
        {
          "label": "Try it",
          "text": "one monetisation ladder plus ARPU calculation and limitation sentence"
        },
        {
          "label": "Decide",
          "text": "I can judge whether Kuaishou user and ARPU evidence is attractive, risky or incomplete. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 29,
      "company": "Lenovo",
      "guidingQuestion": "When does borrowing become a risk for shareholders?",
      "guidingQuestionZh": "借款什么时候会成为股东风险？",
      "handoutMaterial": "Balance-sheet extract, leverage benefit-risk note and optional debt-to-equity calculation box.",
      "formativeAssessment": "Benefit/risk sort: borrowing as growth support, fixed obligation or shareholder risk. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
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
          "definition": "Debt is money a company has borrowed and is expected to repay, usually with interest and according to agreed terms."
        },
        {
          "term": "liabilities",
          "zh": "负债",
          "definition": "Liabilities are present obligations arising from past events that are expected to require an outflow of economic resources; they are claims by creditors and others on a company's resources."
        },
        {
          "term": "gearing or leverage",
          "zh": "负债杠杆",
          "definition": "Gearing or leverage is the use of fixed financing costs, especially debt and interest expense, in a company's capital structure; it can increase both potential shareholder returns and financial risk."
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Lenovo case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define debt. 2. Calculate/Interpret: Use or interpret the lesson formula: debt-to-equity = total debt / equity, if the data is suitable. 3. Explain: Explain what one Lenovo evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Lenovo case could change an investor's judgement about when does borrowing become a risk for shareholders. 5. Judge: Give your own evidence-based classroom verdict on Lenovo: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Lenovo extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: When does borrowing become a risk for shareholders?",
        "mustAssess": "Leverage benefit-risk note with a simple ratio only if figures are clear. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "risk-evidence-effect chains and earlier evidence reading of company reports.",
        "newKnowledge": "debt can fund growth but adds obligations; leverage raises both potential benefit and shareholder risk.",
        "avoidOverlap": "keep advanced solvency and interest-coverage ratios optional; use debt-to-equity only if the data is suitable for Grade 9.",
        "misconception": "borrowing is always bad, or borrowing is harmless if the company is large.",
        "evidenceTask": "read a Lenovo balance-sheet extract and identify debt, liabilities, equity or financing notes.",
        "studentOutput": "one leverage benefit-risk note with a simple ratio only if the figures are clear."
      },
      "coreClaim": "Borrowing can fund growth but also raises shareholder risk through fixed obligations and leverage.",
      "caseRole": "synthesis case",
      "primaryOutput": {
        "type": "leverage-benefit-risk-note",
        "description": "one leverage benefit-risk note with a simple ratio only if figures are clear"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company report or results presentation",
          "dated market valuation or quote snapshot when price is discussed",
          "risk/news/regulatory source only when needed for the case question"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Explain",
        "marks": 4,
        "stimulusType": "multi-evidence company case extract",
        "calculationRequirement": "Optional calculation only if source data is clean: debt-to-equity = total debt / equity, if the data is suitable.",
        "judgementRequirement": "Leverage benefit-risk note with a simple ratio only if figures are clear. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "Keep advanced solvency and interest coverage optional. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: Borrowing can power growth or increase danger. Where is the line?",
          "Hook: start with Lenovo and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate risk-evidence-effect chains and earlier evidence reading of company reports.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Lenovo evidence.",
          "Teach: make students write the core claim: Borrowing can fund growth but also raises shareholder risk through fixed obligations and leverage.",
          "Evidence practice: Read Lenovo balance-sheet extract and identify debt, liabilities, equity or financing notes.",
          "Output rehearsal: students build one leverage benefit-risk note with a simple ratio only if figures are clear.",
          "Analyse why: students build a data -> concept -> investor implication chain for Lenovo.",
          "Investment action: students apply the decision rule - Debt can help returns but can also magnify losses and financial stress.",
          "Exit ticket: students submit Leverage benefit-risk note with a simple ratio only if figures are clear."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Lenovo source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: debt, liabilities, gearing or leverage.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Lenovo case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define debt. 2. Calculate/Interpret: Use or interpret the lesson formula: debt-to-equity = total debt / equity, if the data is suitable. 3. Explain: Explain what one Lenovo evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Lenovo case could change an investor's judgement about when does borrowing become a risk for shareholders. 5. Judge: Give your own evidence-based classroom verdict on Lenovo: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Write one leverage benefit-risk note.",
            "expectedStudentWork": "one leverage benefit-risk note with a simple ratio only if figures are clear"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "Borrowing is always bad, or harmless if the company is large.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Leverage benefit-risk note with a simple ratio only if figures are clear.",
            "expectedStudentWork": "one leverage benefit-risk note with a simple ratio only if figures are clear"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Lenovo."
      },
      "caseReview": {
        "status": "review-before-production",
        "reason": "Debt evidence must be simple enough for Grade 9 and not depend on advanced solvency analysis.",
        "replacementCandidate": "Xiaomi or another familiar company if Lenovo debt figures are not classroom-clean.",
        "sourceFit": "pending-source-pack-check"
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Lenovo case could change an investor's judgement about when does borrowing become a risk for shareholders.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Lenovo evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: Borrowing is always bad, or harmless if the company is large.",
          "answer": "No",
          "explanation": "Correct the misconception using Lenovo evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Lenovo?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Lenovo case.",
          "pairs": [
            {
              "term": "debt",
              "match": "money a company has borrowed and must repay."
            },
            {
              "term": "liabilities",
              "match": "obligations a company owes to others."
            },
            {
              "term": "gearing or leverage",
              "match": "the use of debt in a company's financing."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Lenovo evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Lenovo case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define debt."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Use or interpret the lesson formula: debt-to-equity = total debt / equity, if the data is suitable."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Lenovo evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Lenovo case could change an investor's judgement about when does borrowing become a risk for shareholders."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Lenovo: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Leverage-risk action",
        "studentAction": "Check whether borrowing supports growth or creates shareholder risk through fixed obligations.",
        "decisionRule": "Debt can help returns but can also magnify losses and financial stress.",
        "portfolioQuestion": "Ask whether leverage risk is acceptable before considering the share.",
        "classroomOutput": "I can write a Lenovo debt-risk action with one ratio or caveat. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "Borrowing can power growth or increase danger. Where is the line?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "Borrowing can power growth or increase danger. Where is the line?"
        },
        {
          "label": "Key idea",
          "text": "Borrowing can fund growth but also raises shareholder risk through fixed obligations and leverage."
        },
        {
          "label": "Try it",
          "text": "one leverage benefit-risk note with a simple ratio only if figures are clear"
        },
        {
          "label": "Decide",
          "text": "I can write a Lenovo debt-risk action with one ratio or caveat. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    },
    {
      "lesson": 30,
      "company": "Costco",
      "guidingQuestion": "Can a steady business still be a bad investment at the wrong price?",
      "guidingQuestionZh": "稳定企业在价格错误时仍可能是差投资吗？",
      "handoutMaterial": "Final synthesis memo sheet, evidence-price-risk planner and quality-price-risk verdict space.",
      "formativeAssessment": "Final evidence audit: students check whether a judgement includes business quality, price and risk. Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice.",
      "exitTicket": "Write a final quality-price-risk memo that avoids speculation, balances possible return with risk and gives evidence-based classroom judgement.",
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
          "definition": "A defensive business is a business whose demand, revenue or profit may be more stable than average during difficult economic conditions."
        },
        {
          "term": "quality company",
          "zh": "优质公司",
          "definition": "A quality company is a company with strong operations, durable advantages, resilient demand, sound finances, good margins or reliable cash generation."
        },
        {
          "term": "valuation risk",
          "zh": "估值风险",
          "definition": "Valuation risk is the risk that investment returns disappoint because the price already assumes too much good news or is high relative to evidence."
        }
      ],
      "formulaOrNoFormula": "synthesis of growth, margin, P/E and risk; no new formula.",
      "evidenceSummary": "Costco growth, margin and valuation evidence from dated sources.",
      "check": "Write a final quality-price-risk memo that avoids speculation, balances possible return with risk and gives evidence-based classroom judgement.",
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
          "title": "Evidence and Data Analysis",
          "task": "Case information: Use a short Costco case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define defensive business. 2. Calculate/Interpret: Interpret one figure or evidence statement from the case and state what it can and cannot prove. 3. Explain: Explain what one Costco evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Costco case could change an investor's judgement about can a steady business still be a bad investment at the wrong price. 5. Judge: Give your own evidence-based classroom verdict on Costco: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
        },
        {
          "key": "calculationOrJudgement",
          "title": "Calculation or judgement task",
          "task": "Write a final quality-price-risk memo that avoids speculation, balances possible return with risk and gives evidence-based classroom judgement."
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
        "itemType": "Section A-style evidence and data analysis worksheet",
        "sourceRequirement": "Use a frozen Costco extract with source title, date, accessed date and at least one figure or evidence statement.",
        "task": "Use the worksheet Evidence and Data Analysis section to answer: Can a steady business still be a bad investment at the wrong price?",
        "mustAssess": "Final quality-price-risk memo using dated evidence, possible return, price paid and risk without speculation or personal advice. Include one analyse-why chain and one evidence-based classroom verdict. It must also assess whether the student can choose a justified next investment action."
      },
      "cardGenerator": {
        "retrievalBase": "the full course: source discipline, growth, margin, cash, returns, valuation, risk, funds and case comparison.",
        "newKnowledge": "defensive and quality businesses still need valuation discipline because price can already assume good news; rational investment analysis must balance possible return with risk and reject speculation or tips.",
        "avoidOverlap": "do not add a new formula; this is the final synthesis lesson.",
        "misconception": "a steady business is automatically a safe or good investment.",
        "evidenceTask": "combine Costco growth, margin, valuation and risk evidence from dated sources.",
        "studentOutput": "a final quality-price-risk memo using dated evidence, possible return, price paid and risk without speculation or personalised investment advice."
      },
      "coreClaim": "A quality defensive business can still be a poor investment if the price already assumes too much good news.",
      "caseRole": "synthesis case",
      "primaryOutput": {
        "type": "quality-price-risk-memo",
        "description": "one final quality-price-risk memo using dated evidence with dated evidence and caveats"
      },
      "sourcePack": {
        "requiredSourceTypes": [
          "official company report or results presentation",
          "dated market valuation or quote snapshot when price is discussed",
          "risk/news/regulatory source only when needed for the case question"
        ],
        "preferredSourceOrder": [
          "official company/issuer source",
          "exchange or market-data snapshot",
          "reputable news/regulator/sector source for risk context"
        ],
        "snapshotDateFields": [
          "source title",
          "source URL",
          "publication date",
          "accessed date",
          "snapshot date",
          "company/security identifier",
          "key figures used",
          "evidence limitation"
        ],
        "evidenceLimitations": [
          "The lesson evidence task cannot by itself prove a unsupported personal unsupported buy/sell recommendation.",
          "A single figure or graph cannot prove quality, value and risk at the same time.",
          "Source dates and accessed dates must be recorded because investment evidence changes over time."
        ],
        "noLivePriceDependency": true,
        "sourceFitCheck": "Complete the source-fit audit before building the deck, handout chapter or exam item."
      },
      "assessmentBlueprint": {
        "commandWord": "Assess",
        "marks": 8,
        "stimulusType": "multi-evidence company case extract",
        "calculationRequirement": "No new calculation; assess evidence reading and judgement.",
        "judgementRequirement": "Final quality-price-risk memo using dated evidence, possible return, price paid and risk without speculation or personal advice. Students may make their own evidence-based classroom judgement with caveats. The answer should choose a next investment action and justify it with dated evidence and caveats.",
        "mustAvoid": "No new formula; final judgement only. Avoid stock tips, live-price dependence, market timing and unsupported personalised recommendations."
      },
      "artifactBlueprint": {
        "deckArc": [
          "Student hook: A steady business feels safe. Could the price still make it a bad investment?",
          "Hook: start with Costco and the guiding question, using a concrete source or visual before definitions.",
          "Retrieval: activate the full course: source discipline, growth, margin, cash, returns, valuation, risk, funds and case comparison.",
          "Retrieval practice: yes/no misconception check, multiple-choice knowledge check and matching/classification practice before new Costco evidence.",
          "Teach: make students write the core claim: A quality defensive business can still be a poor investment if the price already assumes too much good news.",
          "Evidence practice: Combine Costco growth, margin, valuation and risk evidence from dated sources.",
          "Output rehearsal: students build one final quality-price-risk memo using dated evidence with dated evidence and caveats.",
          "Analyse why: students build a data -> concept -> investor implication chain for Costco.",
          "Investment action: students apply the decision rule - Never buy only because a company is high quality; price and risk must still be judged.",
          "Exit ticket: students submit Final quality-price-risk memo using dated evidence, possible return, price paid and risk without speculation or personal advice."
        ],
        "handoutBlocks": [
          {
            "key": "sourceBox",
            "title": "Source box",
            "prompt": "Record Costco source title, URL, publication date, accessed date, company/security identifier, key figures and limitation.",
            "expectedStudentWork": "A complete dated source record before any judgement."
          },
          {
            "key": "vocabulary",
            "title": "Vocabulary",
            "prompt": "Define and use: defensive business, quality company, valuation risk.",
            "expectedStudentWork": "English definitions with Chinese support and one short use-in-context check."
          },
          {
            "key": "companyEvidence",
            "title": "Evidence and Data Analysis",
            "prompt": "Case information: Use a short Costco case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate. Questions: 1. Identify/Define: Identify the source date and define defensive business. 2. Calculate/Interpret: Interpret one figure or evidence statement from the case and state what it can and cannot prove. 3. Explain: Explain what one Costco evidence point shows and one thing it cannot prove. 4. Analyse why: Analyse why the evidence used in the Costco case could change an investor's judgement about can a steady business still be a bad investment at the wrong price. 5. Judge: Give your own evidence-based classroom verdict on Costco: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats.",
            "expectedStudentWork": "Completed Section A-style answers: identify/define, calculate or interpret, explain evidence, analyse why and one evidence-based classroom verdict."
          },
          {
            "key": "calculationOrJudgement",
            "title": "Calculation or judgement task",
            "prompt": "Write a final quality-price-risk memo that avoids speculation, balances possible return with risk and gives evidence-based classroom judgement.",
            "expectedStudentWork": "one final quality-price-risk memo using dated evidence with dated evidence and caveats"
          },
          {
            "key": "misconceptionCheck",
            "title": "Misconception check",
            "prompt": "A steady business is automatically safe or a good investment.",
            "expectedStudentWork": "A correction sentence that states why the misconception is wrong."
          },
          {
            "key": "individualOutput",
            "title": "Individual written output",
            "prompt": "Final quality-price-risk memo using dated evidence, possible return, price paid and risk without speculation or personal advice.",
            "expectedStudentWork": "one final quality-price-risk memo using dated evidence with dated evidence and caveats"
          }
        ],
        "chapterOutput": "Use this lesson handout as the textbook chapter; do not add separate textbook-only teaching content.",
        "examItemShape": "Section A-style case-information stimulus followed by identify/define, calculate or interpret, explain, analyse why and evidence-based judgement questions for Costco."
      },
      "caseReview": {
        "status": "keep",
        "sourceFit": "pending-source-pack-check",
        "reason": "Current anchor fits the unit role and teaching question; replace only if the source-pack audit fails before deck production.",
        "replacementCandidate": null
      },
      "analyseWhy": {
        "question": "Analyse why the evidence used in the Costco case could change an investor's judgement about can a steady business still be a bad investment at the wrong price.",
        "chain": [
          "Use one dated evidence or data point from the case.",
          "Link it to the lesson concept or formula.",
          "Explain the investor implication for return, risk, price or evidence quality."
        ],
        "expectedStudentWork": "A developed chain using Costco evidence, the lesson concept and an investor implication before a classroom verdict."
      },
      "retrievalPractice": {
        "yesNo": {
          "prompt": "Yes or no: A steady business is automatically safe or a good investment.",
          "answer": "No",
          "explanation": "Correct the misconception using Costco evidence and the lesson concept."
        },
        "multipleChoice": {
          "prompt": "Which action best supports a careful judgement about Costco?",
          "options": [
            "Check dated source evidence and its limitation before judging.",
            "Assume the company is attractive because the name is familiar.",
            "Use one price movement as a complete investment conclusion.",
            "Ignore risk if the possible return looks high."
          ],
          "answer": "Check dated source evidence and its limitation before judging."
        },
        "matching": {
          "prompt": "Match the lesson terms to their meaning before using the Costco case.",
          "pairs": [
            {
              "term": "defensive business",
              "match": "a business whose demand may be more stable in difficult times."
            },
            {
              "term": "quality company",
              "match": "a company with strong operations, brand, margins or resilience."
            },
            {
              "term": "valuation risk",
              "match": "risk that the price already assumes too much good news."
            }
          ]
        },
        "sourceCheck": "Record the source title, date or accessed date, one key figure and one limitation before using Costco evidence."
      },
      "worksheet": {
        "evidenceAndDataAnalysis": {
          "title": "Evidence and Data Analysis",
          "stimulus": "Use a short Costco case extract with company background, source title, publication or accessed date, key figures and one limitation. Include a table, chart, quote-page item, report extract or factsheet detail where appropriate.",
          "questions": [
            {
              "type": "identify-define",
              "command": "Identify/Define",
              "prompt": "Identify the source date and define defensive business."
            },
            {
              "type": "calculate-interpret",
              "command": "Calculate/Interpret",
              "prompt": "Interpret one figure or evidence statement from the case and state what it can and cannot prove."
            },
            {
              "type": "explain-evidence",
              "command": "Explain",
              "prompt": "Explain what one Costco evidence point shows and one thing it cannot prove."
            },
            {
              "type": "analyse-why",
              "command": "Analyse why",
              "prompt": "Analyse why the evidence used in the Costco case could change an investor's judgement about can a steady business still be a bad investment at the wrong price."
            },
            {
              "type": "student-judgement",
              "command": "Judge",
              "prompt": "Give your own evidence-based classroom verdict on Costco: attractive, risky, too expensive, incomplete evidence, watch, avoid or consider. Then choose the next investment action: consider, watch, avoid, compare with another choice or gather more evidence. Justify it with dated evidence and caveats."
            }
          ]
        }
      },
      "investmentAction": {
        "title": "Final-investment-memo action",
        "studentAction": "Combine business quality, possible return, price paid, risk and alternatives into one final investment memo.",
        "decisionRule": "Never buy only because a company is high quality; price and risk must still be judged.",
        "portfolioQuestion": "Ask whether the evidence supports consider, watch, avoid or gather more evidence for the hypothetical profile.",
        "classroomOutput": "I can write a Costco final memo with dated evidence, caveats and a defensible next action. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
      },
      "studentHook": "A steady business feels safe. Could the price still make it a bad investment?",
      "simpleFlow": [
        {
          "label": "Hook",
          "text": "A steady business feels safe. Could the price still make it a bad investment?"
        },
        {
          "label": "Key idea",
          "text": "A quality defensive business can still be a poor investment if the price already assumes too much good news."
        },
        {
          "label": "Try it",
          "text": "one final quality-price-risk memo using dated evidence with dated evidence and caveats"
        },
        {
          "label": "Decide",
          "text": "I can write a Costco final memo with dated evidence, caveats and a defensible next action. Next action: choose consider, watch, avoid, compare with another choice or gather more evidence."
        }
      ]
    }
  ],
  "sourceFitAudit": {
    "rule": "Run this before building a lesson deck or final exam item. Keep the current anchor unless source evidence is not classroom-clean, source dates are missing, or the company case no longer fits the unit role.",
    "checks": [
      "At least one official dated source is available for the required evidence task.",
      "The needed figures can be frozen into a classroom snapshot without live-price dependency.",
      "The source can support the lesson output without requiring advanced finance beyond the map.",
      "The case does not duplicate the prior lesson output or weaken the six-unit progression.",
      "Any replacement keeps the same unit role, skill target and assessment blueprint."
    ]
  },
  "practicalInvestingBoundary": "Students learn a practical investing process: identify what is being bought, collect dated evidence, compare return, risk, price and alternatives, then make an evidence-based classroom action such as consider, watch, avoid or gather more evidence. They do not receive stock tips, market timing calls or personalised portfolio instructions.",
  "investmentWorkflow": [
    {
      "step": 1,
      "title": "Know what you are buying",
      "studentAction": "Name the product, company, listing, stock code or fund, and explain what ownership or exposure it gives.",
      "evidenceCheck": "Record source title, publication date or accessed date, exchange, ticker and the figure being used.",
      "decisionOutput": "I can or cannot explain the investment in plain English."
    },
    {
      "step": 2,
      "title": "Check whether it fits the investor",
      "studentAction": "State the goal, time horizon, need for liquidity and risk level before looking at possible return.",
      "evidenceCheck": "Separate money needed soon from money that could accept market risk in a hypothetical profile.",
      "decisionOutput": "This could fit, does not fit, or needs a safer product for the profile."
    },
    {
      "step": 3,
      "title": "Read business evidence",
      "studentAction": "Use revenue, costs, margins, cash flow, dividends, users or sector evidence to judge business quality.",
      "evidenceCheck": "Use dated figures and state what each figure can and cannot prove.",
      "decisionOutput": "The business evidence is improving, weakening, mixed or incomplete."
    },
    {
      "step": 4,
      "title": "Compare return, risk and price",
      "studentAction": "Estimate possible sources of return, identify risks, and ask whether the price already reflects good news.",
      "evidenceCheck": "Use valuation, quote-page, dividend, fund-cost or comparison evidence where the lesson has taught it.",
      "decisionOutput": "At this price and risk level, the case is attractive, risky, too expensive or not clear enough."
    },
    {
      "step": 5,
      "title": "Choose the next action",
      "studentAction": "Write a justified classroom action: consider, watch, avoid, compare with another choice, or gather more evidence.",
      "evidenceCheck": "Include dated evidence, one caveat and one item to monitor later.",
      "decisionOutput": "A short investment memo that can be defended without tips or guesswork."
    }
  ],
  "simpleLessonStructure": [
    {
      "label": "Hook",
      "purpose": "Start with a company puzzle, chart or investor dilemma that students can immediately care about.",
      "studentQuestion": "What is interesting or surprising here?"
    },
    {
      "label": "Key idea",
      "purpose": "Teach one concept, formula or rule that helps answer the puzzle.",
      "studentQuestion": "What new idea helps me understand the case?"
    },
    {
      "label": "Try it",
      "purpose": "Use one short evidence task, calculation, matching check or source check before longer analysis.",
      "studentQuestion": "Can I use the evidence myself?"
    },
    {
      "label": "Decide",
      "purpose": "Choose a justified next action: consider, watch, avoid, compare or gather more evidence.",
      "studentQuestion": "What would a careful investor do next?"
    }
  ]
};

  global.INVEST = global.INVEST || {};
  global.INVEST.courseMap = courseMap;

  if (typeof module === "object" && module.exports) {
    module.exports = courseMap;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
