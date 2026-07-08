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
    )
  ];

  return {
    version: "2026-07-07",
    title: "Investment Analysis Photo Archive",
    generatorPattern: "visual: window.INVEST.photos?.<photoKey>",
    catalogueScript: "assets/js/investment-photos.js",
    imageRoot: "assets/images/investment-analysis",
    categories,
    useCases,
    entries: archiveEntries
  };
});
