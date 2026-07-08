(function (root, factory) {
  const data = factory();
  if (typeof module === "object" && module.exports) module.exports = data;
  root.INVEST_PHOTO_ARCHIVE_DATA = data;
})(typeof window !== "undefined" ? window : globalThis, function () {
  const categories = [
    {
      id: "market-screens",
      label: "Market screens and price moves",
      description: "Trading screens, quote screens, phone charts and price-change visuals.",
      generatorFit: "Use for price, quote-page, market-noise, trading-vs-investing and chart-reading moments."
    },
    {
      id: "evidence-desk",
      label: "Evidence, reports and analyst work",
      description: "Reports, calculators, printed evidence and analyst-review desk scenes.",
      generatorFit: "Use for source-dated evidence, annual reports, calculation desks and judgement-before-action prompts."
    },
    {
      id: "asset-classes",
      label: "Asset classes and real economy",
      description: "Cash, property, shares, commodities and real-business context images.",
      generatorFit: "Use when students classify what is being bought or connect an investment to a real asset or business activity."
    },
    {
      id: "company-anchors",
      label: "Company case anchors",
      description: "Company buildings and corporate settings that anchor a named case.",
      generatorFit: "Use as the first visual signal for a company case or as a visual-pause evidence cue."
    },
    {
      id: "market-infrastructure",
      label: "Stock market infrastructure",
      description: "HKEX, Exchange Square and exchange-building images.",
      generatorFit: "Use for listing, exchange, liquidity, secondary-market trade and market-infrastructure lessons."
    },
    {
      id: "retail-products",
      label: "Products, stores and customers",
      description: "Retail stores and product displays from listed-company case work.",
      generatorFit: "Use when students connect revenue, brand, products, demand and business model evidence."
    },
    {
      id: "logistics-operations",
      label: "Logistics and operations",
      description: "Delivery vehicles, trucks, logistics sites and operating-evidence images.",
      generatorFit: "Use for operating evidence, business activity, growth, logistics capacity and company moat discussions."
    },
    {
      id: "scenario-prompts",
      label: "Scenario prompts",
      description: "Images built around student judgement cases rather than one named company.",
      generatorFit: "Use for first-vote prompts, misconception checks, compare tasks and investor-vs-speculator decisions."
    },
    {
      id: "keyword-financial-statements",
      label: "Keywords: statements and cash flow",
      description: "Images tied to statement-reading terms such as revenue, costs, cash flow and source evidence.",
      generatorFit: "Use when a generator needs a concrete picture for financial-statement vocabulary rather than a generic finance desk."
    },
    {
      id: "keyword-business-evidence",
      label: "Keywords: business evidence",
      description: "Operational business visuals for sales, inventory, capacity, capex and store-network terms.",
      generatorFit: "Use for company-evidence prompts where the keyword should connect to a visible business activity."
    },
    {
      id: "keyword-return-valuation",
      label: "Keywords: return and valuation",
      description: "Images for dividend, market value, capitalisation and return/valuation vocabulary.",
      generatorFit: "Use when students need to separate return components and market-value evidence."
    },
    {
      id: "keyword-valuation-metrics",
      label: "Keywords: valuation metrics",
      description: "Charts and visuals for valuation, EPS, P/E, expectations and valuation-risk vocabulary.",
      generatorFit: "Use when a slide needs a concrete valuation metric or multiple rather than a generic finance image."
    },
    {
      id: "keyword-portfolio-funds",
      label: "Keywords: portfolio and funds",
      description: "ETF, index-fund, diversification and portfolio-construction visuals.",
      generatorFit: "Use when students compare single-company risk with diversified fund or portfolio exposure."
    },
    {
      id: "keyword-platform-monetisation",
      label: "Keywords: platforms and monetisation",
      description: "Platform-user, network-effect, active-user, ARPU and monetisation visuals.",
      generatorFit: "Use when a generator needs platform business evidence tied to users and revenue per user."
    },
    {
      id: "keyword-banking-credit",
      label: "Keywords: banking and credit",
      description: "Banking, credit-risk, leverage, debt, liabilities and capital-strength visuals.",
      generatorFit: "Use for banking and balance-sheet risk prompts where students need visible debt or credit context."
    },
    {
      id: "keyword-regulation-currency",
      label: "Keywords: regulation and currency",
      description: "Regulation, policy-risk, exchange-rate, export-exposure and multinational-risk visuals.",
      generatorFit: "Use when the image should make external policy, currency or global-risk exposure visible."
    },
    {
      id: "keyword-risk-macro",
      label: "Keywords: risk and macro exposure",
      description: "Images for demand risk, consumer trends, cyclicality and related risk vocabulary.",
      generatorFit: "Use when the image should make a risk source visible before students write a judgement."
    }
  ];

  const useCases = {
    hook: "Case hook",
    visualPause: "Visual pause",
    discussion: "Discussion background",
    sourceLens: "Source lens",
    dataSnapshot: "Data snapshot",
    compare: "Compare task",
    classificationTask: "Classification task",
    yesNoCheck: "Yes/no check",
    calculationDesk: "Calculation desk",
    quiz: "Quiz or review"
  };

  function entries(category, keys, defaults = {}) {
    return keys.map((key) => ({
      key,
      category,
      lesson: defaults.lesson || "Reusable",
      tags: defaults.tags || [],
      uses: defaults.uses || ["visualPause", "discussion"],
      deckHint: defaults.deckHint || "Use only when the image helps students make or improve an investment judgement."
    }));
  }

  function entry(key, category, defaults = {}) {
    return entries(category, [key], defaults)[0];
  }

  const archiveEntries = [
    ...entries(
      "market-screens",
      [
        "modernTradingDesk",
        "smartphoneMarketChart",
        "tabletFinancialChart",
        "investorChartScreens",
        "tradingApps",
        "marketScreen",
        "assetSharesScreen"
      ],
      {
        tags: ["market price", "quote page", "trading", "short-term movement", "screens"],
        uses: ["hook", "visualPause", "discussion", "dataSnapshot", "yesNoCheck"],
        deckHint: "Good for separating market-price evidence from careful investment analysis."
      }
    ),
    ...entries(
      "evidence-desk",
      [
        "financialAnalysisDesk",
        "businessChartsPaper",
        "financeChartWhiteboard",
        "stockReportCalculator",
        "investorMeetingReport",
        "annualReports"
      ],
      {
        tags: ["evidence", "annual report", "calculation", "source date", "analyst work"],
        uses: ["visualPause", "sourceLens", "calculationDesk", "discussion"],
        deckHint: "Use when the slide asks students what evidence is missing or what one figure can prove."
      }
    ),
    ...entries(
      "asset-classes",
      [
        "assetCashSavings",
        "assetPropertyBuilding",
        "assetCommoditiesPort",
        "shippingPort",
        "hsbcBuilding"
      ],
      {
        tags: ["asset class", "risk", "return", "property", "commodities", "real economy"],
        uses: ["classificationTask", "compare", "visualPause", "discussion"],
        deckHint: "Use for asset-class ranking, risk-return comparison and real-economy exposure prompts."
      }
    ),
    ...entries(
      "scenario-prompts",
      [
        "speculatorInvestorRace",
        "lesson1ScenarioFinancialDocuments",
        "lesson1ScenarioSmartphoneCandlestick",
        "lesson1ScenarioHouseForRent",
        "lesson1ScenarioRedMarketLosses",
        "lesson1ScenarioContainerPort"
      ],
      {
        lesson: "Lesson 1 / reusable",
        tags: ["scenario", "first judgement", "speculation", "investment", "evidence choice"],
        uses: ["hook", "classificationTask", "yesNoCheck", "compare", "quiz"],
        deckHint: "Good for first-vote prompts where students decide whether an action is investing, saving, speculation or evidence gathering."
      }
    ),
    ...entries(
      "company-anchors",
      [
        "tencentBinhaiTowers",
        "tencentTowers",
        "lesson1TencentBinhaiBuilding01",
        "lesson1TencentSeafrontSiteVisit03",
        "lesson1TencentSeafrontSiteVisit05",
        "lesson1TencentSeafrontSiteVisit09",
        "lesson1TencentSeafrontSiteVisit08",
        "lesson1TencentSeafrontSiteVisit11",
        "lesson1TencentSeafrontSiteVisit13",
        "lesson1TencentSeafrontSiteVisit25",
        "lesson1TencentSeafrontSiteVisit24",
        "lesson1TencentSeafrontSiteVisit26"
      ],
      {
        lesson: "Lesson 1 / Tencent",
        tags: ["Tencent", "company anchor", "share", "listed company", "Shenzhen"],
        uses: ["hook", "visualPause", "discussion", "sourceLens"],
        deckHint: "Use to make the Tencent share question concrete before students discuss ownership or evidence."
      }
    ),
    ...entries(
      "market-infrastructure",
      [
        "hkexHall",
        "lesson2ExchangeSquareHkexSign2019",
        "lesson2ExchangeSquareCentral2021",
        "lesson2HkexBuilding01",
        "lesson2HkexExhibitionHallView1",
        "lesson2HkexExhibitionHallView2",
        "lesson2HkexTradeLobby2007",
        "lesson2HkexInterior2007",
        "lesson2HkexMuseumShareExchange02",
        "lesson2HkexMuseumShareExchange01",
        "lesson2HkexCeremonyStage",
        "lesson2HkexConnectHall2018",
        "lesson2HkexForumInterior2018"
      ],
      {
        lesson: "Lesson 2 / HKEX",
        tags: ["HKEX", "stock market", "listing", "liquidity", "secondary market", "exchange"],
        uses: ["hook", "visualPause", "discussion", "sourceLens", "yesNoCheck"],
        deckHint: "Use when students distinguish a listed company, the exchange and secondary-market investors."
      }
    ),
    ...entries(
      "company-anchors",
      [
        "lesson3AlibabaHeadquarters01",
        "lesson3AlibabaXixiPark",
        "lesson3AlibabaBinjiangPark",
        "lesson3AlibabaXionganOffice",
        "lesson3AlibabaHeadquartersCropped",
        "lesson3AlibabaXixiParkPhase4",
        "lesson3AlibabaWangjingBuilding",
        "lesson3AlibabaBinjiangCenter",
        "lesson3AlibabaShenzhenBranch",
        "lesson3AlibabaCuigezhuangOffice"
      ],
      {
        lesson: "Lesson 3 / Alibaba",
        tags: ["Alibaba", "company anchor", "quote page", "listing", "Hangzhou"],
        uses: ["hook", "visualPause", "discussion", "sourceLens"],
        deckHint: "Use for Alibaba quote-page or company-identification work where the image should anchor the named case."
      }
    ),
    ...entries(
      "retail-products",
      [
        "appleStore",
        "iphoneDisplay",
        "lesson4XiaomiQingdaoStore",
        "lesson4XiaomiPortugalStore",
        "lesson4XiaomiSuzhouCenterStore",
        "lesson4Xiaomi13TLightbox",
        "lesson4XiaomiSu7MaxStore",
        "lesson4XiaomiRedmiStore03",
        "lesson4XiaomiRedmiStore01",
        "lesson4XiaomiRedmiStore05",
        "lesson4XiaomiRedmiStore04",
        "lesson4XiaomiRedmiStore08"
      ],
      {
        lesson: "Lesson 4 / products and retail",
        tags: ["product evidence", "retail", "brand", "customer demand", "Xiaomi", "Apple"],
        uses: ["hook", "visualPause", "discussion", "sourceLens", "compare"],
        deckHint: "Use for business-model prompts where students connect stores and products to possible revenue evidence."
      }
    ),
    ...entries(
      "company-anchors",
      ["shareholderMeeting"],
      {
        lesson: "Reusable governance",
        tags: ["shareholder", "ownership", "governance", "voting"],
        uses: ["discussion", "visualPause", "yesNoCheck"],
        deckHint: "Use for ownership, shareholder rights and voting-power prompts."
      }
    ),
    ...entries(
      "logistics-operations",
      [
        "lesson5JingdongLogisticsVehicle01",
        "lesson5JingdongLogisticsVehicle02",
        "lesson5JdTruckHuaxiaAvenue",
        "lesson5JdHeadquartersBlockA",
        "lesson5JdHeadquartersBuilding1Wide",
        "lesson5JdHeadquartersBuilding2",
        "lesson5JdHeadquartersBuilding1Street",
        "lesson5JdFoodDeliveryWorker",
        "lesson5JdlExpressVehicle",
        "lesson5JdApplianceStore"
      ],
      {
        lesson: "Lesson 5 / JD.com",
        tags: ["JD.com", "logistics", "operations", "delivery", "headquarters", "business evidence"],
        uses: ["hook", "visualPause", "discussion", "sourceLens", "compare"],
        deckHint: "Use when students need visible operating evidence before judging a company's business case."
      }
    ),
    ...entries(
      "keyword-business-evidence",
      ["keywordRevenueSalesCheckout"],
      {
        lesson: "Lessons 6 and 26",
        tags: ["revenue", "sales growth", "same-store sales", "business model", "store network"],
        uses: ["hook", "visualPause", "discussion", "sourceLens", "dataSnapshot"],
        deckHint: "Use for revenue, sales growth or same-store-sales prompts where students need a visible sales setting."
      }
    ),
    ...entries(
      "keyword-business-evidence",
      ["keywordInventoryWarehouse"],
      {
        lesson: "Lessons 7, 22, 24 and 26",
        tags: ["inventory risk", "cost of sales", "capacity", "store network", "working capital"],
        uses: ["visualPause", "discussion", "sourceLens", "classificationTask"],
        deckHint: "Use for inventory, capacity or cost-of-sales vocabulary where students should connect shelves and stock to business evidence."
      }
    ),
    ...entries(
      "keyword-financial-statements",
      ["keywordCashFlowPaymentTerminal"],
      {
        lesson: "Lesson 9",
        tags: ["operating cash flow", "free cash flow", "cash receipts", "sales", "payment"],
        uses: ["hook", "visualPause", "discussion", "sourceLens"],
        deckHint: "Use for cash-flow vocabulary before students distinguish profit from cash received."
      }
    ),
    ...entries(
      "keyword-business-evidence",
      ["keywordCapitalExpenditureAssemblyLine"],
      {
        lesson: "Lessons 9, 22 and 27",
        tags: ["capital expenditure", "capacity", "vertical integration", "cyclicality", "factory"],
        uses: ["visualPause", "discussion", "sourceLens", "compare"],
        deckHint: "Use for capital expenditure, capacity and operating-scale prompts tied to real production assets."
      }
    ),
    ...entries(
      "keyword-return-valuation",
      ["keywordDividendCheque"],
      {
        lesson: "Lesson 12",
        tags: ["dividend", "dividend yield", "total return", "income return"],
        uses: ["hook", "visualPause", "discussion", "yesNoCheck"],
        deckHint: "Use for dividend-income prompts where students distinguish cash income from capital gain."
      }
    ),
    ...entries(
      "keyword-return-valuation",
      ["keywordMarketCapTradingScreen"],
      {
        lesson: "Lesson 13",
        tags: ["market capitalisation", "shares outstanding", "mega-cap", "market value", "stock market"],
        uses: ["hook", "visualPause", "discussion", "dataSnapshot"],
        deckHint: "Use for market-value prompts before students calculate or interpret market capitalisation."
      }
    ),
    ...entries(
      "keyword-risk-macro",
      ["keywordDemandRiskEmptyStore"],
      {
        lesson: "Lessons 16, 17, 26 and 27",
        tags: ["demand risk", "consumer trend", "cyclical demand", "same-store sales", "weak traffic"],
        uses: ["hook", "visualPause", "discussion", "yesNoCheck"],
        deckHint: "Use for demand-risk and consumer-trend prompts where weak traffic should be visible before judgement."
      }
    ),
    entry("keywordValuationExxonMerger", "keyword-valuation-metrics", {
      lesson: "Lessons 14, 15 and 30",
      tags: ["valuation", "cheap or expensive", "expectations", "valuation risk"],
      uses: ["discussion", "sourceLens", "dataSnapshot"],
      deckHint: "Use when students need a concrete valuation chart before judging whether a price looks cheap or expensive."
    }),
    entry("keywordExchangeRatesAmsterdam", "keyword-regulation-currency", {
      lesson: "Lessons 19 and 25",
      tags: ["exchange rate", "export exposure", "translation effect", "local/global risk"],
      uses: ["hook", "visualPause", "discussion", "sourceLens"],
      deckHint: "Use for currency-risk prompts before students explain exchange-rate exposure."
    }),
    entry("keywordVerticalIntegrationOpelLine", "keyword-business-evidence", {
      lesson: "Lessons 22 and 27",
      tags: ["vertical integration", "capacity", "capital expenditure", "operating leverage"],
      uses: ["visualPause", "discussion", "sourceLens"],
      deckHint: "Use when students connect owned production capacity to business strategy and operating risk."
    }),
    entry("keywordBrandEquityFlagshipStore", "keyword-business-evidence", {
      lesson: "Lessons 24 and 26",
      tags: ["brand equity", "pricing power", "store network", "consumer trend"],
      uses: ["visualPause", "discussion", "sourceLens"],
      deckHint: "Use when students connect visible brand presence to pricing power and customer demand."
    }),
    entry("keywordLeverageRatioGoldman", "keyword-banking-credit", {
      lesson: "Lesson 29",
      tags: ["gearing or leverage", "debt", "liabilities", "capital strength"],
      uses: ["sourceLens", "dataSnapshot", "discussion"],
      deckHint: "Use when students need to interpret leverage as a ratio rather than only seeing debt as a headline number."
    }),
    entry("keywordCreditRiskSubprimeDiagram", "keyword-banking-credit", {
      lesson: "Lessons 23 and 29",
      tags: ["credit risk", "debt", "liabilities", "policy risk"],
      uses: ["sourceLens", "discussion", "yesNoCheck"],
      deckHint: "Use when students need to trace why weak borrowing quality can become credit risk."
    }),
    entry("keywordExportContainersFlickr", "keyword-regulation-currency", {
      lesson: "Lessons 19 and 25",
      tags: ["export exposure", "multinational", "local/global risk", "exchange rate"],
      uses: ["visualPause", "discussion", "sourceLens", "compare"],
      deckHint: "Use when students connect export activity to currency and global-demand risk."
    }),
    entry("keywordTranslationCurrencyRubles", "keyword-regulation-currency", {
      lesson: "Lessons 19 and 25",
      tags: ["translation effect", "exchange rate", "multinational", "local/global risk"],
      uses: ["visualPause", "discussion", "yesNoCheck"],
      deckHint: "Use as a simple visual cue before explaining why foreign-currency results can translate differently."
    }),
    entry("keywordNetworkEffectsTwitterGraph", "keyword-platform-monetisation", {
      lesson: "Lesson 21",
      tags: ["network effects", "platform business", "active users", "regulatory overhang"],
      uses: ["discussion", "sourceLens", "visualPause"],
      deckHint: "Use when students need to see that a platform can become more valuable as user connections grow."
    }),
    entry("keywordRegulatoryOverhangPlatforms", "keyword-regulation-currency", {
      lesson: "Lessons 18 and 21",
      tags: ["regulatory overhang", "regulation", "policy risk", "platform business"],
      uses: ["discussion", "yesNoCheck", "sourceLens"],
      deckHint: "Use for prompts about whether platform regulation can weigh on an investment case."
    }),
    entry("keywordCyclicalityFactoryEmissions", "keyword-risk-macro", {
      lesson: "Lessons 22 and 27",
      tags: ["cyclicality", "cyclical demand", "sector", "recovery"],
      uses: ["visualPause", "discussion", "compare"],
      deckHint: "Use as a sector-cycle visual before students discuss demand recovery and operating leverage."
    }),
    entry("keywordCapitalStrengthFedNy", "keyword-banking-credit", {
      lesson: "Lesson 23",
      tags: ["capital strength", "credit risk", "interest margin", "bank"],
      uses: ["visualPause", "discussion", "sourceLens"],
      deckHint: "Use to anchor bank-strength and credit-risk discussion in a real financial institution setting."
    }),
    entry("keywordPricingPowerDigitalDisplay", "keyword-business-evidence", {
      lesson: "Lesson 24",
      tags: ["pricing power", "brand equity", "gross margin", "consumer trend"],
      uses: ["visualPause", "discussion", "yesNoCheck"],
      deckHint: "Use when students decide whether a company can raise or maintain prices without losing customers."
    }),
    entry("keywordMultinationalGskBuilding", "keyword-regulation-currency", {
      lesson: "Lesson 25",
      tags: ["multinational", "local/global risk", "comparable company", "exchange rate"],
      uses: ["visualPause", "discussion", "sourceLens"],
      deckHint: "Use when students distinguish local and global risks for a multinational company."
    }),
    entry("keywordTurnaroundStoreClosure", "keyword-risk-macro", {
      lesson: "Lessons 26 and 27",
      tags: ["turnaround", "recovery", "store network", "same-store sales"],
      uses: ["hook", "visualPause", "discussion", "yesNoCheck"],
      deckHint: "Use for turnaround prompts where students judge whether weak stores can recover."
    }),
    entry("keywordActiveUsersSmartphoneGroup", "keyword-platform-monetisation", {
      lesson: "Lessons 21 and 28",
      tags: ["active users", "platform business", "network effects", "monetisation"],
      uses: ["hook", "visualPause", "discussion", "sourceLens"],
      deckHint: "Use for active-user and platform-business prompts before students judge monetisation potential."
    }),
    entry("keywordArpuMobilePaymentQr", "keyword-platform-monetisation", {
      lesson: "Lesson 28",
      tags: ["ARPU", "monetisation", "active users", "platform business"],
      uses: ["visualPause", "discussion", "sourceLens"],
      deckHint: "Use when students connect active users to payment, revenue per user and monetisation."
    }),
    entry("keywordDebtClockGermany", "keyword-banking-credit", {
      lesson: "Lesson 29",
      tags: ["debt", "liabilities", "gearing or leverage", "leverage risk"],
      uses: ["hook", "visualPause", "discussion", "yesNoCheck"],
      deckHint: "Use for debt and leverage prompts before students judge whether borrowing increases risk."
    }),
    entry("keywordCashFlowStatementTrust", "keyword-financial-statements", {
      lesson: "Lessons 5 and 9",
      tags: ["operating cash flow", "free cash flow", "financial statements", "source date"],
      uses: ["sourceLens", "dataSnapshot", "discussion"],
      deckHint: "Use when students need to see that cash-flow evidence comes from a specific statement."
    }),
    entry("keywordCentralBankOpenMeeting", "keyword-banking-credit", {
      lesson: "Lesson 23",
      tags: ["interest margin", "credit risk", "capital strength", "interest rate"],
      uses: ["visualPause", "discussion", "sourceLens"],
      deckHint: "Use when students connect bank interest margins and credit risk to central-bank rate context."
    }),
    entry("keywordPolicyRiskSubprimeGovernment", "keyword-regulation-currency", {
      lesson: "Lessons 18 and 23",
      tags: ["policy risk", "regulation", "credit risk", "company-specific risk"],
      uses: ["sourceLens", "discussion", "yesNoCheck"],
      deckHint: "Use for policy-risk prompts where students must decide what the chart can and cannot prove."
    }),
    entry("keywordDefensiveUtilityTransmission", "keyword-risk-macro", {
      lesson: "Lesson 30",
      tags: ["defensive business", "quality company", "cash flow stability", "risk"],
      uses: ["hook", "visualPause", "discussion"],
      deckHint: "Use for defensive-business prompts where students compare stable utility demand with cyclical demand."
    }),
    entry("keywordQualityControlUsda", "keyword-business-evidence", {
      lesson: "Lessons 16, 24 and 30",
      tags: ["quality company", "execution risk", "brand equity", "pricing power"],
      uses: ["visualPause", "discussion", "sourceLens"],
      deckHint: "Use when students connect quality control and execution to company quality."
    }),
    entry("keywordPricingPowerSaleSign", "keyword-business-evidence", {
      lesson: "Lessons 7, 17 and 24",
      tags: ["pricing power", "gross margin", "consumer trend", "demand risk"],
      uses: ["hook", "visualPause", "yesNoCheck"],
      deckHint: "Use when students decide whether discounts signal weak pricing power or a normal retail tactic."
    }),
    entry("keywordDebtClockNationalNy", "keyword-banking-credit", {
      lesson: "Lesson 29",
      tags: ["debt", "liabilities", "gearing or leverage", "capital strength"],
      uses: ["visualPause", "discussion", "yesNoCheck"],
      deckHint: "Use as an alternative debt visual when comparing debt scale and leverage risk."
    }),
    entry("keywordBalanceSheetTaxForm", "keyword-financial-statements", {
      lesson: "Lessons 5 and 29",
      tags: ["liabilities", "balance sheet", "source date", "evidence log"],
      uses: ["visualPause", "sourceLens", "discussion"],
      deckHint: "Use for statement-discipline prompts where students identify what source a figure came from."
    }),
    entry("keywordEtfKeyboard", "keyword-portfolio-funds", {
      lesson: "Lessons 18 and 20",
      tags: ["ETF", "exchange-traded fund", "index fund", "fund access"],
      uses: ["hook", "visualPause", "discussion"],
      deckHint: "Use when introducing exchange-traded funds as a market-traded fund product."
    }),
    entry("keywordIndexFundsWallStreetSign", "keyword-portfolio-funds", {
      lesson: "Lessons 18 and 20",
      tags: ["index fund", "passive investing", "ETF", "market index"],
      uses: ["hook", "visualPause", "discussion", "sourceLens"],
      deckHint: "Use when students connect index funds to broad market exposure rather than picking one company."
    }),
    entry("keywordPortfolioDiversificationCards", "keyword-portfolio-funds", {
      lesson: "Lessons 18 and 20",
      tags: ["diversification", "portfolio", "risk reduction", "asset allocation"],
      uses: ["visualPause", "discussion", "classificationTask"],
      deckHint: "Use when students explain why a diversified portfolio can reduce single-company risk."
    })
  ];

  return {
    version: "2026-07-08",
    title: "Investment Analysis Photo Archive",
    generatorPattern: "visual: window.INVEST.photos?.<photoKey>",
    catalogueScript: "assets/js/investment-photos.js",
    imageRoot: "assets/images/investment-analysis",
    categories,
    useCases,
    entries: archiveEntries
  };
});
