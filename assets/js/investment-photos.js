window.INVEST = window.INVEST || {};

(function () {
  function imageBase() {
    const path = window.location?.pathname || "";
    if (path.includes("/investment-analysis/_template/")) return "../../assets/images/investment-analysis/";
    if (path.includes("/investment-analysis/unit-")) return "../../../assets/images/investment-analysis/";
    if (path.includes("/investment-analysis/")) return "../assets/images/investment-analysis/";
    return "../../../assets/images/investment-analysis/";
  }

  const base = imageBase();

  function photo(file, alt, caption, credit, source, options = {}) {
    return {
      type: "photo",
      src: `${base}${file}`,
      alt,
      caption,
      credit,
      source,
      objectPosition: options.objectPosition || "center",
      objectFit: options.objectFit || "cover",
      background: options.background || "#05090b"
    };
  }

  window.INVEST.photos = {
    modernTradingDesk: photo(
      "trading-desk-laptops-2025.jpg",
      "Laptops and phones showing financial charts on a dark trading desk.",
      "Modern trading desk with financial charts",
      "Unsplash / Mehedi Hasan",
      "https://unsplash.com/photos/people-working-on-laptops-with-financial-charts-at-night-T1snPsRIvfk",
      { objectPosition: "center 58%" }
    ),
    speculatorInvestorRace: photo(
      "speculator-investor-race.png",
      "Illustration of a fast speculator and a steady investor moving toward a finish line.",
      "Speculator and investor race illustration",
      "User-provided classroom image",
      "Added from user-provided lesson image, 2026-07-04",
      { objectFit: "contain", background: "#ffec8f" }
    ),
    smartphoneMarketChart: photo(
      "smartphone-market-chart-2025.jpg",
      "Hands using a smartphone with a candlestick market chart on screen.",
      "A market chart on a smartphone",
      "Pexels / Jakub Zerdzicki",
      "https://www.pexels.com/photo/analyzing-financial-market-data-on-smartphone-34482029/",
      { objectPosition: "center 46%" }
    ),
    tabletFinancialChart: photo(
      "tablet-financial-chart-2026.jpg",
      "A person marks a candlestick chart on a tablet in a trading workspace.",
      "Tablet chart analysis in a trading workspace",
      "Pexels / Jakub Zerdzicki",
      "https://www.pexels.com/photo/analyzing-financial-charts-on-tablet-for-market-insights-35638638/",
      { objectPosition: "center 58%" }
    ),
    investorChartScreens: photo(
      "investor-chart-screens-2026.jpg",
      "An investor points at a market chart across tablet and monitor screens.",
      "Investor screens used for market analysis",
      "Pexels / Jakub Zerdzicki",
      "https://www.pexels.com/photo/investor-analyzing-charts-on-tablet-and-laptop-screens-35638668/",
      { objectPosition: "center 48%" }
    ),
    financialAnalysisDesk: photo(
      "financial-analysis-desk-2024.jpg",
      "A laptop, calculator and monitor set up for financial analysis.",
      "Financial analysis desk with charts and calculator",
      "Pexels / Jakub Zerdzicki",
      "https://www.pexels.com/photo/financial-results-stock-market-25589797/",
      { objectPosition: "center 54%" }
    ),
    businessChartsPaper: photo(
      "business-charts-paper-2021.jpg",
      "A person marks printed business charts and graphs on a desk.",
      "Printed charts marked before an investment judgement",
      "Pexels / RDNE Stock project",
      "https://www.pexels.com/photo/marketing-people-hand-exit-7414211/",
      { objectPosition: "center 56%" }
    ),
    financeChartWhiteboard: photo(
      "finance-chart-whiteboard-2021.jpg",
      "A finance chart and review sheet pinned to a whiteboard while a person points at the chart.",
      "Finance chart used to identify one listing",
      "Pexels / Kaboompics.com",
      "https://www.pexels.com/photo/a-report-paper-on-white-board-7876379/",
      { objectPosition: "center 48%" }
    ),
    stockReportCalculator: photo(
      "stock-report-calculator-2021.jpg",
      "Stock charts, a calculator and business metrics reports spread across a table.",
      "Calculator and reports used for price-change work",
      "Pexels / RDNE Stock project",
      "https://www.pexels.com/photo/marketing-exit-desk-notebook-7414218/",
      { objectPosition: "center 54%" }
    ),
    assetCashSavings: photo(
      "../monetary-policy/deposit-into-piggy-bank-savings-account.jpg",
      "A person deposits coins into a piggy bank as a simple savings asset.",
      "Cash and savings as a low-risk asset example",
      "Wikimedia Commons contributor",
      "Local economics image asset",
      { objectPosition: "center 52%" }
    ),
    assetPropertyBuilding: photo(
      "hsbc-main-building.jpg",
      "HSBC Main Building in Hong Kong as a property and building asset example.",
      "Property and buildings as asset examples",
      "Wikimedia Commons contributor",
      "https://commons.wikimedia.org/wiki/File:HSBC_Main_Building,_Hong_Kong.jpg",
      { objectPosition: "center 48%" }
    ),
    assetSharesScreen: photo(
      "us-stock-market-screen.jpg",
      "A stock market screen showing listed shares and prices.",
      "Shares as a financial asset example",
      "Wikimedia Commons contributor",
      "Local investment image asset",
      { objectPosition: "center 48%" }
    ),
    assetCommoditiesPort: photo(
      "shipping-containers-port.jpg",
      "Shipping containers at a port representing traded physical goods and commodities.",
      "Commodities and traded goods as asset examples",
      "Unsplash / Andy Li",
      "https://unsplash.com/photos/shipping-containers-stacked-at-a-busy-port-at-sunset-fT4SwA83jH4",
      { objectPosition: "center 50%" }
    ),
    investorMeetingReport: photo(
      "investor-meeting-report-2021.jpg",
      "Business people review printed charts and a tablet during a meeting.",
      "Modern analyst meeting with charts and reports",
      "Pexels / Yan Krukau",
      "https://www.pexels.com/photo/a-man-looking-at-a-document-with-graphs-7693735/",
      { objectPosition: "center 46%" }
    ),
    tencentBinhaiTowers: photo(
      "tencent-binhai-towers-2023.jpg",
      "Tencent Binhai Towers in Shenzhen photographed from street level in June 2023.",
      "Tencent Binhai Towers, Shenzhen, June 2023",
      "Wikimedia Commons / MEAIYAVT 206 Liowcms",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%8D%97%E5%B1%B1%E5%8C%BA_Nanshan_Haitian_2nd_Road_Binhai_Blvd_Road_Haixue_Road_Houhai_Blvd_%E9%A8%B0%E8%A8%8A%E6%B5%B7%E6%BF%B1%E5%A4%A7%E5%BB%88_Tencent_Binhai_Towers_June_2023_Px3_01.jpg",
      { objectPosition: "center 45%" }
    ),
    hkexHall: photo(
      "hkex-hall.jpg",
      "The trading hall of Hong Kong Exchanges and Clearing.",
      "Hong Kong Exchanges and Clearing trading hall",
      "Wikimedia Commons / WiNG",
      "https://commons.wikimedia.org/wiki/File:HKEX_Hall.JPG"
    ),
    tencentTowers: photo(
      "tencent-seafront-towers.jpg",
      "Tencent Seafront Towers in Shenzhen.",
      "Tencent Seafront Towers, Shenzhen",
      "Wikimedia Commons contributor",
      "https://commons.wikimedia.org/wiki/File:Tencent_Seafront_Towers_1.jpg",
      { objectPosition: "center 42%" }
    ),
    appleStore: photo(
      "iphone-apple-store.jpg",
      "iPhone 15 and iPhone 15 Plus displayed in an Apple Store.",
      "Apple products displayed for customers",
      "Wikimedia Commons contributor",
      "https://commons.wikimedia.org/wiki/File:IPhone_15_and_15_Plus_in_Apple_Store_-_1.jpg"
    ),
    hsbcBuilding: photo(
      "hsbc-main-building.jpg",
      "HSBC Main Building in Central, Hong Kong.",
      "HSBC Main Building, Hong Kong",
      "Wikimedia Commons contributor",
      "https://commons.wikimedia.org/wiki/File:HSBC_Main_Building,_Hong_Kong,_Central.jpg"
    ),
    tradingApps: photo(
      "trading-apps-iphone.jpg",
      "Trading apps displayed on an iPhone screen.",
      "Trading apps shown on a smartphone",
      "Wikimedia Commons contributor",
      "https://commons.wikimedia.org/wiki/File:Trading_apps_on_an_iPhone_screen.jpg"
    ),
    shareholderMeeting: photo(
      "tesla-shareholder-meeting.jpg",
      "A Tesla shareholder meeting with Elon Musk on stage.",
      "Shareholder meeting as a company-ownership context",
      "Wikimedia Commons contributor",
      "https://commons.wikimedia.org/wiki/File:2019-06-11-tesla-shareholder-meeting-elon-musk.jpg",
      { objectPosition: "center 32%" }
    ),
    annualReports: photo(
      "annual-report-books.jpg",
      "Printed annual report books arranged on a table.",
      "Annual reports: evidence before judgement",
      "Wikimedia Commons / Wikimedia Foundation",
      "https://commons.wikimedia.org/wiki/File:Wikimedia_Foundation_Annual_Report_2016_books.jpg",
      { objectPosition: "center 55%" }
    ),
    marketScreen: photo(
      "us-stock-market-screen.jpg",
      "A stock market screen showing US market data.",
      "Market screen with changing stock information",
      "Wikimedia Commons contributor",
      "https://commons.wikimedia.org/wiki/File:US_Stock_Market_-_Investing_in_the_United_States.jpg"
    ),
    iphoneDisplay: photo(
      "iphone-display.jpg",
      "Rows of smartphones displayed in an Apple Store.",
      "Product display from a listed technology company",
      "Wikimedia Commons / Fastily",
      "https://commons.wikimedia.org/wiki/File:Apple_Store_iPhone_Display_1_2023-12-10.jpg"
    ),
    shippingPort: photo(
      "shipping-containers-port.jpg",
      "Shipping containers stacked at a busy port.",
      "Global trade and currency exposure can affect returns",
      "Unsplash / Barrett Ward",
      "https://unsplash.com/photos/shipping-containers-stacked-at-a-busy-port-at-sunset-fT4SwA83jH4"
    ),
    lesson1ScenarioFinancialDocuments: photo(
      "lesson-1/scenario-financial-documents-analysis.jpg",
      "Two people review financial documents with a calculator and laptop on a desk.",
      "Financial documents checked before an investment judgement",
      "Pexels / RDNE Stock project",
      "https://www.pexels.com/photo/white-papers-on-the-table-7821708/",
      { objectPosition: "center 52%" }
    ),
    lesson1ScenarioSmartphoneCandlestick: photo(
      "lesson-1/scenario-smartphone-candlestick-chart.jpg",
      "A smartphone displays a stock trading app with candlestick charts.",
      "Smartphone chart used for a short-term trading decision",
      "Pexels / StockRadars Co.",
      "https://www.pexels.com/photo/smartphone-displaying-stock-trading-app-interface-28682345/",
      { objectPosition: "center 46%" }
    ),
    lesson1ScenarioHouseForRent: photo(
      "lesson-1/scenario-house-for-rent-sign.jpg",
      "People move near a house for rent sign outside a residential property.",
      "Rental property sign for a property-investment scenario",
      "Pexels / Ivan S",
      "https://www.pexels.com/search/real%20estate%20rent/",
      { objectPosition: "center 38%" }
    ),
    lesson1ScenarioRedMarketLosses: photo(
      "lesson-1/scenario-smartphone-red-market-losses.jpg",
      "A smartphone displays a stock market app with red negative price changes.",
      "Red market screen for a tip-driven speculation scenario",
      "Pexels / StockRadars Co.",
      "https://www.pexels.com/photo/smartphone-display-of-stock-market-application-28682350/",
      { objectPosition: "center 46%" }
    ),
    lesson1ScenarioContainerPort: photo(
      "lesson-1/scenario-container-ships-hamburg-port.jpg",
      "Large container ships and cranes at Hamburg harbor.",
      "Container port used for a shipping-company investment scenario",
      "Pexels / Wolfgang Weiser",
      "https://www.pexels.com/photo/maersk-line-ships-24896065/",
      { objectPosition: "center 48%" }
    ),
    // First five lesson photo pack (Wikimedia Commons, added 2026-07-05).
    // Lesson 1: Tencent and the first share-investment question.
    lesson1TencentBinhaiBuilding01: photo(
      "lesson-1/tencent-binhai-building-2020.jpg",
      "Tencent Binhai building in Shenzhen seen from street level.",
      "Tencent Binhai building, Shenzhen",
      "Wikimedia Commons / Charlie fong / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Tencent_binghai_building202012.jpg",
      { objectPosition: "center 45%" }
    ),
    lesson1TencentSeafrontSiteVisit03: photo(
      "lesson-1/tencent-seafront-site-visit-03.jpg",
      "Tencent Seafront Towers in Shenzhen during a June 2023 site visit.",
      "Tencent Seafront Towers site visit, Shenzhen",
      "Wikimedia Commons / MEAIYAVT 206 Liowcms / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%8D%97%E5%B1%B1%E5%8C%BA_Nanshan_Binhai_Blvd_%E9%A8%B0%E8%A8%8A%E6%B5%B7%E6%BF%B1%E5%A4%A7%E5%BB%88_Tencent_Seafront_Towers_%E5%8F%83%E8%A7%80_site_visit_June_2023_Px3_03.jpg"
    ),
    lesson1TencentSeafrontSiteVisit05: photo(
      "lesson-1/tencent-seafront-site-visit-05.jpg",
      "Exterior view of Tencent Seafront Towers in Shenzhen.",
      "Tencent Seafront Towers exterior detail",
      "Wikimedia Commons / MEAIYAVT 206 Liowcms / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%8D%97%E5%B1%B1%E5%8C%BA_Nanshan_Binhai_Blvd_%E9%A8%B0%E8%A8%8A%E6%B5%B7%E6%BF%B1%E5%A4%A7%E5%BB%88_Tencent_Seafront_Towers_%E5%8F%83%E8%A7%80_site_visit_June_2023_Px3_05.jpg",
      { objectPosition: "center 45%" }
    ),
    lesson1TencentSeafrontSiteVisit09: photo(
      "lesson-1/tencent-seafront-site-visit-09.jpg",
      "Street-level view of Tencent Seafront Towers and surrounding Shenzhen roads.",
      "Tencent Seafront Towers from the surrounding street",
      "Wikimedia Commons / MEAIYAVT 206 Liowcms / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%8D%97%E5%B1%B1%E5%8C%BA_Nanshan_Binhai_Blvd_%E9%A8%B0%E8%A8%8A%E6%B5%B7%E6%BF%B1%E5%A4%A7%E5%BB%88_Tencent_Seafront_Towers_%E5%8F%83%E8%A7%80_site_visit_June_2023_Px3_09.jpg"
    ),
    lesson1TencentSeafrontSiteVisit08: photo(
      "lesson-1/tencent-seafront-site-visit-08.jpg",
      "Tencent Seafront Towers photographed beside road access in Shenzhen.",
      "Tencent Seafront Towers and nearby road access",
      "Wikimedia Commons / MEAIYAVT 206 Liowcms / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%8D%97%E5%B1%B1%E5%8C%BA_Nanshan_Binhai_Blvd_%E9%A8%B0%E8%A8%8A%E6%B5%B7%E6%BF%B1%E5%A4%A7%E5%BB%88_Tencent_Seafront_Towers_%E5%8F%83%E8%A7%80_site_visit_June_2023_Px3_08.jpg"
    ),
    lesson1TencentSeafrontSiteVisit11: photo(
      "lesson-1/tencent-seafront-site-visit-11.jpg",
      "Approach view toward the Tencent Seafront Towers campus.",
      "Tencent Seafront Towers campus approach",
      "Wikimedia Commons / MEAIYAVT 206 Liowcms / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%8D%97%E5%B1%B1%E5%8C%BA_Nanshan_Binhai_Blvd_%E9%A8%B0%E8%A8%8A%E6%B5%B7%E6%BF%B1%E5%A4%A7%E5%BB%88_Tencent_Seafront_Towers_%E5%8F%83%E8%A7%80_site_visit_June_2023_Px3_11.jpg"
    ),
    lesson1TencentSeafrontSiteVisit13: photo(
      "lesson-1/tencent-seafront-site-visit-13.jpg",
      "Tencent Seafront Towers photographed as company evidence for an investment lesson.",
      "Tencent Seafront Towers building evidence",
      "Wikimedia Commons / MEAIYAVT 206 Liowcms / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%8D%97%E5%B1%B1%E5%8C%BA_Nanshan_Binhai_Blvd_%E9%A8%B0%E8%A8%8A%E6%B5%B7%E6%BF%B1%E5%A4%A7%E5%BB%88_Tencent_Seafront_Towers_%E5%8F%83%E8%A7%80_site_visit_June_2023_Px3_13.jpg"
    ),
    lesson1TencentSeafrontSiteVisit25: photo(
      "lesson-1/tencent-seafront-site-visit-25.jpg",
      "Tencent Seafront Towers with surrounding site context in Shenzhen.",
      "Tencent Seafront Towers site context",
      "Wikimedia Commons / MEAIYAVT 206 Liowcms / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%8D%97%E5%B1%B1%E5%8C%BA_Nanshan_Binhai_Blvd_%E9%A8%B0%E8%A8%8A%E6%B5%B7%E6%BF%B1%E5%A4%A7%E5%BB%88_Tencent_Seafront_Towers_%E5%8F%83%E8%A7%80_site_visit_June_2023_Px3_25.jpg"
    ),
    lesson1TencentSeafrontSiteVisit24: photo(
      "lesson-1/tencent-seafront-site-visit-24.jpg",
      "Street-context photograph of Tencent Seafront Towers in Shenzhen.",
      "Tencent Seafront Towers street context",
      "Wikimedia Commons / MEAIYAVT 206 Liowcms / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%8D%97%E5%B1%B1%E5%8C%BA_Nanshan_Binhai_Blvd_%E9%A8%B0%E8%A8%8A%E6%B5%B7%E6%BF%B1%E5%A4%A7%E5%BB%88_Tencent_Seafront_Towers_%E5%8F%83%E8%A7%80_site_visit_June_2023_Px3_24.jpg"
    ),
    lesson1TencentSeafrontSiteVisit26: photo(
      "lesson-1/tencent-seafront-site-visit-26.jpg",
      "Vertical exterior view of Tencent Seafront Towers in Shenzhen.",
      "Tencent Seafront Towers vertical view",
      "Wikimedia Commons / MEAIYAVT 206 Liowcms / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%8D%97%E5%B1%B1%E5%8C%BA_Nanshan_Binhai_Blvd_%E9%A8%B0%E8%A8%8A%E6%B5%B7%E6%BF%B1%E5%A4%A7%E5%BB%88_Tencent_Seafront_Towers_%E5%8F%83%E8%A7%80_site_visit_June_2023_Px3_26.jpg",
      { objectPosition: "center 45%" }
    ),
    // Lesson 2: HKEX and why a stock market exists.
    lesson2ExchangeSquareHkexSign2019: photo(
      "lesson-2/exchange-square-hkex-sign-2019.jpg",
      "HKEX sign at Exchange Square in Central, Hong Kong.",
      "HKEX sign at Exchange Square, 2019",
      "Wikimedia Commons / Longshing Ma Hon Wonia / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:HK_%E4%B8%AD%E7%92%B0_Central_%E4%BA%A4%E6%98%93%E5%BB%A3%E5%A0%B4_Exchange_Square_shop_sign_%E9%A6%99%E6%B8%AF%E4%BA%A4%E6%98%93%E6%89%80_HKEX_July_2019_SSG_08_Jardine_House.jpg",
      { objectPosition: "center 45%" }
    ),
    lesson2ExchangeSquareCentral2021: photo(
      "lesson-2/exchange-square-central-2021.jpg",
      "Exchange Square in Central, Hong Kong, where HKEX is located.",
      "Exchange Square, Central Hong Kong, 2021",
      "Wikimedia Commons / Soon Sumia Louam / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:HK_%E4%B8%AD%E7%92%B0_Central_%E4%BA%A4%E6%98%93%E5%BB%A3%E5%A0%B4_Exchange_Square_April_2021_SS2_01.jpg",
      { objectPosition: "center 48%" }
    ),
    lesson2HkexBuilding01: photo(
      "lesson-2/hkex-building.jpg",
      "Hong Kong Exchanges and Clearing building exterior.",
      "Hong Kong Exchanges and Clearing building",
      "Wikimedia Commons / Mcy jerry / CC BY-SA 3.0",
      "https://commons.wikimedia.org/wiki/File:HKeX.JPG"
    ),
    lesson2HkexExhibitionHallView1: photo(
      "lesson-2/hkex-exhibition-hall-view-1.jpg",
      "View inside the Hong Kong stock exchange exhibition hall.",
      "HKEX exhibition hall view",
      "Wikimedia Commons / WiNG / CC BY 3.0",
      "https://commons.wikimedia.org/wiki/File:HKEX_ExhibitionHallview1.jpg"
    ),
    lesson2HkexExhibitionHallView2: photo(
      "lesson-2/hkex-exhibition-hall-view-2.jpg",
      "Second view inside the Hong Kong stock exchange exhibition hall.",
      "HKEX exhibition hall trading context",
      "Wikimedia Commons / WiNG / CC BY-SA 3.0",
      "https://commons.wikimedia.org/wiki/File:HKEX_ExhibitionHallview2.jpg"
    ),
    lesson2HkexTradeLobby2007: photo(
      "lesson-2/hkex-trade-lobby-2007.jpg",
      "Trade lobby at the Hong Kong Exchange in 2007.",
      "Hong Kong Exchange trade lobby, 2007",
      "Wikimedia Commons / WiNG / CC BY-SA 3.0",
      "https://commons.wikimedia.org/wiki/File:Hong_Kong_Exchange_Trade_Lobby_2007.jpg"
    ),
    lesson2HkexInterior2007: photo(
      "lesson-2/hkex-exhibition-hall-interior-2007.jpg",
      "Interior view of the HKEX exhibition hall in 2007.",
      "HKEX exhibition hall interior, 2007",
      "Wikimedia Commons / WiNG / CC BY-SA 3.0",
      "https://commons.wikimedia.org/wiki/File:HKEX_Exhibition_Hall_Interior_2007.jpg"
    ),
    lesson2HkexMuseumShareExchange02: photo(
      "lesson-2/hkex-museum-share-exchange-02.jpg",
      "Museum display showing Hong Kong share-exchange history.",
      "HKEX share-exchange display, Hong Kong Museum of History",
      "Wikimedia Commons / DAIMANdald / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:HKMH_%E9%A6%99%E6%B8%AF%E6%AD%B7%E5%8F%B2%E5%8D%9A%E7%89%A9%E9%A4%A8_HK_Museum_of_History_HKEX_Share_Exchange_March_2017_IX1_02.jpg"
    ),
    lesson2HkexMuseumShareExchange01: photo(
      "lesson-2/hkex-museum-share-exchange-01.jpg",
      "Historical display about Hong Kong share exchange activity.",
      "Hong Kong share-exchange history display",
      "Wikimedia Commons / DAIMANdald / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:HKMH_%E9%A6%99%E6%B8%AF%E6%AD%B7%E5%8F%B2%E5%8D%9A%E7%89%A9%E9%A4%A8_HK_Museum_of_History_HKEX_Share_Exchange_March_2017_IX1_01.jpg"
    ),
    lesson2HkexCeremonyStage: photo(
      "lesson-2/hkex-ceremony-stage.jpg",
      "Ceremony stage inside Hong Kong Exchanges and Clearing.",
      "HKEX ceremony stage",
      "Wikimedia Commons / 384 / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:HKEx_Ceremony_Stage.jpg"
    ),
    lesson2HkexConnectHall2018: photo(
      "lesson-2/hkex-connect-hall-interior-2018.jpg",
      "Interior view of the HKEX Connect Hall in 2018.",
      "HKEX Connect Hall interior, 2018",
      "Wikimedia Commons / Wpcpey / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:HKEX_CONNECT_HALL_Interior_2018.jpg"
    ),
    lesson2HkexForumInterior2018: photo(
      "lesson-2/hkex-forum-interior-2018.jpg",
      "Interior forum space at Hong Kong Exchanges and Clearing.",
      "HKEX forum interior, 2018",
      "Wikimedia Commons / RISE / CC BY 2.0",
      "https://commons.wikimedia.org/wiki/File:HKEX_forum_interior_2018.jpg"
    ),
    // Lesson 3: Alibaba and quote-page evidence.
    lesson3AlibabaHeadquarters01: photo(
      "lesson-3/alibaba-group-headquarters.jpg",
      "Alibaba Group headquarters building used as company evidence.",
      "Alibaba Group headquarters",
      "Wikimedia Commons / Thomas LOMBARD, designed by HASSELL (architects)[1] / CC BY-SA 3.0",
      "https://commons.wikimedia.org/wiki/File:Alibaba_group_Headquarters.jpg"
    ),
    lesson3AlibabaXixiPark: photo(
      "lesson-3/taobao-city-alibaba-xixi-park.jpg",
      "Taobao City at Alibaba Xixi Park in Hangzhou.",
      "Taobao City, Alibaba Xixi Park",
      "Wikimedia Commons / Danielinblue / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:TaobaoCity_Alibaba_Xixi_Park.jpg"
    ),
    lesson3AlibabaBinjiangPark: photo(
      "lesson-3/alibaba-binjiang-park.jpg",
      "Alibaba Binjiang Park building exterior.",
      "Alibaba Binjiang Park",
      "Wikimedia Commons / Danielinblue, designed by HASSELL (architects)[1] / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Alibaba_Binjiang_Park.jpg"
    ),
    lesson3AlibabaXionganOffice: photo(
      "lesson-3/alibaba-xiongan-provisional-office.jpg",
      "Alibaba Group provisional office at Xiong'an.",
      "Alibaba Group provisional office at Xiong'an",
      "Wikimedia Commons / N509FZ / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Alibaba_Group_provisional_office_at_Xiong%27an_(20180503164635).jpg"
    ),
    lesson3AlibabaHeadquartersCropped: photo(
      "lesson-3/alibaba-group-headquarters-cropped.jpg",
      "Cropped view of Alibaba Group headquarters.",
      "Alibaba Group headquarters cropped view",
      "Wikimedia Commons / Thomas LOMBARD, designed by HASSELL (architects)[1] / CC BY-SA 3.0",
      "https://commons.wikimedia.org/wiki/File:Alibaba_group_Headquarters_(cropped).jpg"
    ),
    lesson3AlibabaXixiParkPhase4: photo(
      "lesson-3/alibaba-xixi-park-phase-4.jpg",
      "Phase 4 buildings at Alibaba Xixi Park.",
      "Phase 4 of Alibaba Xixi Park",
      "Wikimedia Commons / Windmemories / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Phase_4_of_Alibaba_Xixi_Park_20200913.jpg"
    ),
    lesson3AlibabaWangjingBuilding: photo(
      "lesson-3/alibaba-building-wangjing.jpg",
      "Alibaba building at Wangjing photographed from outside.",
      "Alibaba building at Wangjing",
      "Wikimedia Commons contributor / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Alibaba_Building_at_Wangjing.jpg",
      { objectPosition: "center 45%" }
    ),
    lesson3AlibabaBinjiangCenter: photo(
      "lesson-3/alibaba-center-binjiang-hangzhou-2021.jpg",
      "Alibaba Center in Binjiang, Hangzhou in 2021.",
      "Alibaba Center in Binjiang, Hangzhou",
      "Wikimedia Commons / Charlie fong / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Alibaba_Center_in_Binjiang_Hangzhou2021.jpg"
    ),
    lesson3AlibabaShenzhenBranch: photo(
      "lesson-3/alibaba-shenzhen-branch.jpg",
      "Alibaba Shenzhen Branch building exterior.",
      "Alibaba Shenzhen Branch",
      "Wikimedia Commons / Lhzss8 / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Alibaba_Shenzhen_Branch.jpg"
    ),
    lesson3AlibabaCuigezhuangOffice: photo(
      "lesson-3/alibaba-cuigezhuang-office-2024.jpg",
      "Alibaba Cuigezhuang office building in 2024.",
      "Alibaba Cuigezhuang office, 2024",
      "Wikimedia Commons / N509FZ / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Alibaba_Cuigezhuang_office_(20240304135911).jpg"
    ),
    // Lesson 4: Xiaomi, ownership, voting, and control.
    lesson4XiaomiQingdaoStore: photo(
      "lesson-4/xiaomi-store-qingdao-lion-mall.jpg",
      "Xiaomi Store at Qingdao Lion Mall with products and signage.",
      "Xiaomi Store at Qingdao Lion Mall",
      "Wikimedia Commons contributor / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Xiaomi_Store_at_Qingdao_Lion_Mall.jpg"
    ),
    lesson4XiaomiPortugalStore: photo(
      "lesson-4/xiaomi-store-portugal.jpg",
      "Xiaomi retail store in Portugal.",
      "Xiaomi Store in Portugal",
      "Wikimedia Commons / Justin Sijbolts / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Xiaomi_Store_Portugal.jpg"
    ),
    lesson4XiaomiSuzhouCenterStore: photo(
      "lesson-4/xiaomi-store-suzhou-center-2022.jpg",
      "Xiaomi Store at Suzhou Center in 2022.",
      "Xiaomi Store at Suzhou Center",
      "Wikimedia Commons / Shwangtianyuan / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Xiaomi_Store_at_Suzhou_Center-20220709.jpg"
    ),
    lesson4Xiaomi13TLightbox: photo(
      "lesson-4/xiaomi-13t-series-lightbox.jpg",
      "Xiaomi 13T Series lightbox display in a retail setting.",
      "Xiaomi 13T Series retail lightbox",
      "Wikimedia Commons / Myrat / CC0",
      "https://commons.wikimedia.org/wiki/File:Xiaomi_13T_Series_lightbox.jpg",
      { objectPosition: "center 45%" }
    ),
    lesson4XiaomiSu7MaxStore: photo(
      "lesson-4/xiaomi-su7-max-store-suzhou.jpg",
      "Xiaomi SU7 Max displayed at a Xiaomi Store in Suzhou.",
      "Xiaomi SU7 Max at a Xiaomi Store",
      "Wikimedia Commons / Shwangtianyuan / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Xiaomi_SU7_Max_at_Xiaomi_Store,_AEON_Suzhou_Yuanqu_Hudong-20240413.jpg"
    ),
    lesson4XiaomiRedmiStore03: photo(
      "lesson-4/xiaomi-redmi-store-shenzhen-03.jpg",
      "Xiaomi Redmi Store in Shenzhen photographed in May 2024.",
      "Xiaomi Redmi Store, Shenzhen",
      "Wikimedia Commons / Billingyin FlyingThree300 / CC0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_shop_%E5%B0%8F%E7%B1%B3%E7%B4%85%E7%B1%B3%E5%95%86%E5%BA%97_Xiaomi_Redmi_Store_May_2024_R12S_03.jpg"
    ),
    lesson4XiaomiRedmiStore01: photo(
      "lesson-4/xiaomi-redmi-store-shenzhen-01.jpg",
      "Entrance area of a Xiaomi Redmi Store in Shenzhen.",
      "Xiaomi Redmi Store entrance, Shenzhen",
      "Wikimedia Commons / Billingyin FlyingThree300 / CC0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_shop_%E5%B0%8F%E7%B1%B3%E7%B4%85%E7%B1%B3%E5%95%86%E5%BA%97_Xiaomi_Redmi_Store_May_2024_R12S_01.jpg"
    ),
    lesson4XiaomiRedmiStore05: photo(
      "lesson-4/xiaomi-redmi-store-shenzhen-05.jpg",
      "Product area inside a Xiaomi Redmi Store in Shenzhen.",
      "Xiaomi Redmi Store product area",
      "Wikimedia Commons / Billingyin FlyingThree300 / CC0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_shop_%E5%B0%8F%E7%B1%B3%E7%B4%85%E7%B1%B3%E5%95%86%E5%BA%97_Xiaomi_Redmi_Store_May_2024_R12S_05.jpg"
    ),
    lesson4XiaomiRedmiStore04: photo(
      "lesson-4/xiaomi-redmi-store-shenzhen-04.jpg",
      "Interior view of a Xiaomi Redmi Store in Shenzhen.",
      "Xiaomi Redmi Store interior, Shenzhen",
      "Wikimedia Commons / Billingyin FlyingThree300 / CC0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_shop_%E5%B0%8F%E7%B1%B3%E7%B4%85%E7%B1%B3%E5%95%86%E5%BA%97_Xiaomi_Redmi_Store_May_2024_R12S_04.jpg"
    ),
    lesson4XiaomiRedmiStore08: photo(
      "lesson-4/xiaomi-redmi-store-shenzhen-08.jpg",
      "Display area of a Xiaomi Redmi Store in Shenzhen.",
      "Xiaomi Redmi Store display, Shenzhen",
      "Wikimedia Commons / Billingyin FlyingThree300 / CC0",
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_shop_%E5%B0%8F%E7%B1%B3%E7%B4%85%E7%B1%B3%E5%95%86%E5%BA%97_Xiaomi_Redmi_Store_May_2024_R12S_08.jpg",
      { objectPosition: "center 45%" }
    ),
    // Lesson 5: JD.com and evidence before judgement.
    lesson5JingdongLogisticsVehicle01: photo(
      "lesson-5/jingdong-logistics-vehicle-01.jpg",
      "Jingdong Logistics vehicle photographed in 2025.",
      "Jingdong Logistics vehicle, 2025",
      "Wikimedia Commons / LN9267 / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:WE7522(Jingdong_Logistics)_31-03-2025.jpg"
    ),
    lesson5JingdongLogisticsVehicle02: photo(
      "lesson-5/jingdong-logistics-vehicle-02.jpg",
      "Second Jingdong Logistics vehicle photographed in 2025.",
      "Jingdong Logistics vehicle evidence",
      "Wikimedia Commons / LN9267 / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:AB-52-62(Jingdong_Logistics)_09-04-2025.jpg"
    ),
    lesson5JdTruckHuaxiaAvenue: photo(
      "lesson-5/jd-truck-huaxia-avenue-2021.jpg",
      "JD truck on Huaxia Avenue, useful evidence for logistics activity.",
      "JD truck on Huaxia Avenue",
      "Wikimedia Commons / Windmemories / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:20210903_Truck_of_JD_on_Huaxia_Avenue.jpg"
    ),
    lesson5JdHeadquartersBlockA: photo(
      "lesson-5/jd-headquarters-block-a-2021.jpg",
      "Block A of JD.com headquarters photographed in 2021.",
      "JD.com headquarters, Block A",
      "Wikimedia Commons / N509FZ / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:JD.com_headquarters,_Block_A_(20210309170039).jpg"
    ),
    lesson5JdHeadquartersBuilding1Wide: photo(
      "lesson-5/jd-headquarters-building-1-2024-wide.jpg",
      "Building 1 at JD.com Headquarters photographed in 2024.",
      "Building 1, JD.com Headquarters",
      "Wikimedia Commons / N509FZ / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Building_1,_JD.com_Headquarters_(20240925134055).jpg"
    ),
    lesson5JdHeadquartersBuilding2: photo(
      "lesson-5/jd-headquarters-building-2-2024.jpg",
      "Building 2 at JD.com Headquarters photographed in 2024.",
      "Building 2, JD.com Headquarters",
      "Wikimedia Commons / N509FZ / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Building_2,_JD.com_Headquarters_(20240925133013).jpg"
    ),
    lesson5JdHeadquartersBuilding1Street: photo(
      "lesson-5/jd-headquarters-building-1-2024-street.jpg",
      "Street-level view of Building 1 at JD.com Headquarters.",
      "JD.com Headquarters street view",
      "Wikimedia Commons / N509FZ / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Building_1,_JD.com_Headquarters_(20240925133209).jpg"
    ),
    lesson5JdFoodDeliveryWorker: photo(
      "lesson-5/jd-food-delivery-worker-daqing-2025.jpg",
      "JD.com food delivery worker in Daqing in 2025.",
      "JD.com food delivery worker in Daqing",
      "Wikimedia Commons / TurnOnTheNight / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:A_JD.com_food_delivery_worker_in_Daqing_20250601141557.jpg"
    ),
    lesson5JdlExpressVehicle: photo(
      "lesson-5/jdl-express-vehicle-xidawang-lu-2025.jpg",
      "JDL Express delivery vehicle on Xidawang Lu in 2025.",
      "JDL Express delivery vehicle",
      "Wikimedia Commons / TurnOnTheNight / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:JDL_Express_delivery_vehicle_on_Xidawang_Lu_20250308163306.jpg"
    ),
    lesson5JdApplianceStore: photo(
      "lesson-5/jd-appliance-store-suya-road-2025.jpg",
      "JD Appliance store at Suya Road in 2025.",
      "JD Appliance store at Suya Road",
      "Wikimedia Commons / Shwangtianyuan / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:JD_Appliance_store_at_Suya_Road-20250104.jpg",
      { objectPosition: "center 45%" }
    ),
    // Syllabus keyword photo pack (Wikimedia Commons, added 2026-07-07).
    keywordRevenueSalesCheckout: photo(
      "keywords/revenue-sales-supermarket-checkout.jpg",
      "Checkout barriers at a Sainsbury's supermarket.",
      "Supermarket checkout barriers for revenue and sales evidence",
      "Wikimedia Commons / Cnbrb / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Sainsburys_checkout_barriers_2.jpg",
      { objectPosition: "center 52%" }
    ),
    keywordInventoryWarehouse: photo(
      "keywords/inventory-warehouse-pallet-racks.jpg",
      "A modern warehouse with high pallet racks for stored inventory.",
      "Warehouse pallet racks for inventory and capacity evidence",
      "Wikimedia Commons / Axisadman / CC BY-SA 3.0",
      "https://commons.wikimedia.org/wiki/File:Modern_warehouse_with_pallet_rack_storage_system.jpg",
      { objectPosition: "center 48%" }
    ),
    keywordCashFlowPaymentTerminal: photo(
      "keywords/operating-cash-flow-payment-terminal.jpg",
      "A cash register and payment terminal display in a store.",
      "Payment terminal for operating cash flow evidence",
      "Wikimedia Commons / Ryan Hodnett / CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Cash_Register-Payment_Terminal_Store_Display_-_Bergen,_Norway_2021-07-30_(01).jpg",
      { objectPosition: "center 46%" }
    ),
    keywordCapitalExpenditureAssemblyLine: photo(
      "keywords/capital-expenditure-assembly-line.jpg",
      "Cars moving along an assembly line in a Hyundai factory.",
      "Car assembly line for capacity and capital expenditure",
      "Wikimedia Commons / Anonyme / CC BY-SA 3.0",
      "https://commons.wikimedia.org/wiki/File:Hyundai_car_assembly_line.jpg",
      { objectPosition: "center 50%" }
    ),
    keywordDividendCheque: photo(
      "keywords/dividend-cheque-company-payment.jpg",
      "Officials hold a large dividend cheque during a formal handover.",
      "Dividend cheque handover for dividend income",
      "Wikimedia Commons / Press Information Department / Public domain",
      "https://commons.wikimedia.org/wiki/File:Monnujan_Sufian_receives_edotco_Bangladesh_dividend_cheque_for_Workers_Welfare_Foundation_2022-09-22_(PID-0020968).jpg",
      { objectPosition: "center 42%" }
    ),
    keywordMarketCapTradingScreen: photo(
      "keywords/market-cap-trading-screen.jpg",
      "Trading screens inside the market centre at the Tokyo Stock Exchange.",
      "Stock exchange screen for market value and market capitalisation",
      "Wikimedia Commons / ehnmark / CC BY 2.0",
      "https://commons.wikimedia.org/wiki/File:Market_centre_in_Tokyo_stock_exchange.jpg",
      { objectPosition: "center 48%" }
    ),
    keywordDemandRiskEmptyStore: photo(
      "keywords/demand-risk-empty-store.jpg",
      "An empty retail store space in a shopping plaza.",
      "Empty retail store for demand risk and weak consumer traffic",
      "Wikimedia Commons / G. Edward Johnson / CC BY 4.0",
      "https://commons.wikimedia.org/wiki/File:Empty_store_Loehmanns_Plaza_Rockville_MD_2024-05-25_16-29-42.jpg",
      { objectPosition: "center 48%" }
    ),
    keywordValuationExxonMerger: photo(
      "keywords/valuation-exxon-merger-chart.png",
      "A chart showing merger valuation data for Exxon Mobil.",
      "Merger valuation chart for valuation evidence",
      "Wikimedia Commons via Openverse / Alexeykob / CC BY-SA 3.0",
      "https://commons.wikimedia.org/w/index.php?curid=18498561",
      { objectPosition: "center 50%" }
    ),
    keywordExchangeRatesAmsterdam: photo(
      "keywords/exchange-rates-amsterdam-board.jpg",
      "A currency exchange-rate sign in Amsterdam showing several foreign currency prices.",
      "Currency exchange-rate board for exchange-rate exposure",
      "Wikimedia Commons via Openverse / Donald Trung / CC BY-SA 4.0",
      "https://commons.wikimedia.org/w/index.php?curid=108614336",
      { objectPosition: "center 50%" }
    ),
    keywordVerticalIntegrationOpelLine: photo(
      "keywords/vertical-integration-opel-assembly-line.jpg",
      "A car factory assembly line inside the Opel factory in Gliwice, Poland.",
      "Car assembly line for vertical integration and capacity",
      "Wikimedia Commons via Openverse / Marek Slusarczyk (Tupungato) / CC BY 3.0",
      "https://commons.wikimedia.org/w/index.php?curid=116381354",
      { objectPosition: "center 50%" }
    ),
    keywordBrandEquityFlagshipStore: photo(
      "keywords/brand-equity-flagship-store.jpg",
      "A flagship customer-service store with service counters and branded signs.",
      "Flagship customer-service store for brand equity",
      "Wikimedia Commons via Openverse / LN9267 / CC BY-SA 4.0",
      "https://commons.wikimedia.org/w/index.php?curid=128686271",
      { objectPosition: "center 50%" }
    ),
    keywordLeverageRatioGoldman: photo(
      "keywords/leverage-ratio-goldman-chart.png",
      "A chart of Goldman Sachs leverage ratio from 2003 to 2012.",
      "Leverage-ratio chart for gearing analysis",
      "Wikimedia Commons via Openverse / Farcaster / CC BY-SA 3.0",
      "https://commons.wikimedia.org/w/index.php?curid=47853644",
      { objectPosition: "center 50%" }
    ),
    keywordCreditRiskSubprimeDiagram: photo(
      "keywords/credit-risk-subprime-crisis-diagram.png",
      "A diagram showing relationships in the subprime mortgage crisis.",
      "Subprime crisis diagram for credit-risk chains",
      "Wikimedia Commons via Openverse / Farcaster / CC BY-SA 3.0",
      "https://commons.wikimedia.org/w/index.php?curid=11778069",
      { objectPosition: "center 50%" }
    ),
    keywordExportContainersFlickr: photo(
      "keywords/export-exposure-multicolored-containers.jpg",
      "Multicoloured shipping containers stacked at a port.",
      "Container stacks for export exposure and global trade risk",
      "Flickr via Openverse / Hakan Dahlstrom / CC BY 2.0",
      "https://www.flickr.com/photos/93755244@N00/3144199355",
      { objectPosition: "center 50%" }
    ),
    keywordTranslationCurrencyRubles: photo(
      "keywords/translation-effect-foreign-currency-rubles.jpg",
      "Samples of Soviet ruble banknotes arranged on a surface.",
      "Foreign currency notes for translation-effect prompts",
      "Flickr via Openverse / Jorge Lascar / CC BY 2.0",
      "https://www.flickr.com/photos/8721758@N06/8674923730",
      { objectPosition: "center 50%" }
    ),
    keywordNetworkEffectsTwitterGraph: photo(
      "keywords/network-effects-twitter-smartphone-graph.jpg",
      "A network graph labelled around Twitter and smartphone connections.",
      "Twitter smartphone network graph for network effects",
      "Flickr via Openverse / Marc_Smith / CC BY 2.0",
      "https://www.flickr.com/photos/49503165485@N01/5446841851",
      { objectPosition: "center 50%" }
    ),
    keywordRegulatoryOverhangPlatforms: photo(
      "keywords/regulatory-overhang-platforms.jpg",
      "An image referencing Facebook, Twitter and Google in a political-regulation context.",
      "Platform regulation image for regulatory-overhang prompts",
      "Flickr via Openverse / sfmission.com / CC BY 2.0",
      "https://www.flickr.com/photos/17281186@N00/33394744952",
      { objectPosition: "center 50%" }
    ),
    keywordCyclicalityFactoryEmissions: photo(
      "keywords/cyclicality-factory-emissions.jpg",
      "Factory emissions rising from an industrial site.",
      "Industrial factory emissions for cyclical-sector prompts",
      "Flickr via Openverse / Oregon State University / CC BY-SA 2.0",
      "https://www.flickr.com/photos/33247428@N08/51783941838",
      { objectPosition: "center 50%" }
    ),
    keywordCapitalStrengthFedNy: photo(
      "keywords/capital-strength-federal-reserve-ny.jpg",
      "The Federal Reserve Bank of New York building exterior.",
      "Federal Reserve Bank of New York for bank capital strength context",
      "Flickr via Openverse / epicharmus / CC BY 2.0",
      "https://www.flickr.com/photos/8256808@N02/2397309631",
      { objectPosition: "center 50%" }
    ),
    keywordPricingPowerDigitalDisplay: photo(
      "keywords/pricing-power-digital-price-display.jpg",
      "A wireless in-store price display at a clothing retailer.",
      "Digital in-store price display for pricing-power prompts",
      "Wikimedia Commons via Openverse / Tomwsulcer / CC0 1.0",
      "https://commons.wikimedia.org/w/index.php?curid=22649102",
      { objectPosition: "center 50%" }
    ),
    keywordMultinationalGskBuilding: photo(
      "keywords/multinational-gsk-building.jpg",
      "The exterior of a GSK corporate building.",
      "GSK building for multinational-company exposure",
      "Flickr via Openverse / Peter O'Connor aka anemoneprojectors / CC BY-SA 2.0",
      "https://www.flickr.com/photos/58414938@N00/11187599734",
      { objectPosition: "center 50%" }
    ),
    keywordTurnaroundStoreClosure: photo(
      "keywords/turnaround-store-closure.jpg",
      "A closed electronics retail store after employees lost their jobs.",
      "Store closure for turnaround and recovery analysis",
      "Flickr via Openverse / infomatique / CC BY-SA 2.0",
      "https://www.flickr.com/photos/80824546@N00/6896023040",
      { objectPosition: "center 50%" }
    ),
    keywordActiveUsersSmartphoneGroup: photo(
      "keywords/active-users-smartphone-group.jpg",
      "A group of diverse people using smartphones.",
      "Smartphone user group for active users",
      "Flickr via Openverse / Rawpixel Ltd / CC BY 2.0",
      "https://www.flickr.com/photos/147875007@N03/45739283592",
      { objectPosition: "center 50%" }
    ),
    keywordArpuMobilePaymentQr: photo(
      "keywords/arpu-mobile-payment-qr-code.jpg",
      "A smartphone scanning a QR code for mobile payment.",
      "Mobile payment QR scan for ARPU and monetisation",
      "Flickr via Openverse / pr_ip / CC BY-SA 2.0",
      "https://www.flickr.com/photos/35889705@N04/8693340030",
      { objectPosition: "center 50%" }
    ),
    keywordDebtClockGermany: photo(
      "keywords/debt-clock-germany.jpg",
      "A public debt clock showing changing debt figures.",
      "Debt clock for debt and leverage discussion",
      "Flickr via Openverse / pthread1981 / CC BY 2.0",
      "https://www.flickr.com/photos/55043400@N00/5606295895",
      { objectPosition: "center 50%" }
    ),
    keywordCashFlowStatementTrust: photo(
      "keywords/cash-flow-statement-trust-funds.jpg",
      "A statement of cash flows page for trust funds.",
      "Statement of cash flows for financial-statement source work",
      "Wikimedia Commons via Openverse / Ladyfwr / CC BY-SA 3.0",
      "https://commons.wikimedia.org/w/index.php?curid=15789950",
      { objectPosition: "center 50%" }
    ),
    keywordCentralBankOpenMeeting: photo(
      "keywords/central-bank-open-board-meeting.jpg",
      "Federal Reserve officials seated at an open board meeting.",
      "Federal Reserve open board meeting for interest-rate context",
      "Flickr via Openverse / Federalreserve / Public Domain Mark 1.0",
      "https://www.flickr.com/photos/92618257@N08/26731366111",
      { objectPosition: "center 50%" }
    ),
    keywordPolicyRiskSubprimeGovernment: photo(
      "keywords/policy-risk-subprime-government-chart.jpg",
      "A chart linking government policies and the subprime mortgage crisis.",
      "Government-policy chart for policy-risk discussion",
      "Flickr via Openverse / deborahgomez / CC BY-SA 2.0",
      "https://www.flickr.com/photos/151669515@N07/32642468515",
      { objectPosition: "center 50%" }
    ),
    keywordDefensiveUtilityTransmission: photo(
      "keywords/defensive-utility-transmission-lines-openverse.jpg",
      "Electric transmission lines carrying power across a utility grid.",
      "Transmission lines for defensive utility business evidence",
      "Flickr via Openverse / Chris Hunkeler / CC BY-SA 2.0",
      "https://www.flickr.com/photos/14913305@N00/8550788014",
      { objectPosition: "center 50%" }
    ),
    keywordQualityControlUsda: photo(
      "keywords/quality-control-usda-inspection.jpg",
      "A USDA inspection or quality-control scene in a production setting.",
      "Inspection scene for quality-company prompts",
      "Flickr via Openverse / USDAgov / CC BY 2.0",
      "https://www.flickr.com/photos/41284017@N08/6060417640",
      { objectPosition: "center 50%" }
    ),
    keywordPricingPowerSaleSign: photo(
      "keywords/pricing-power-sale-discount-sign.jpg",
      "A sale sign advertising discounts in a shopping mall.",
      "Sale sign for pricing power and discounting",
      "Flickr via Openverse / Artem Beliaikin / CC0 1.0",
      "https://www.flickr.com/photos/157635012@N07/47020307484",
      { objectPosition: "center 50%" }
    ),
    keywordDebtClockNationalNy: photo(
      "keywords/debt-clock-national-new-york.jpg",
      "The National Debt Clock in New York showing large debt figures.",
      "National debt clock for leverage risk",
      "Flickr via Openverse / Sugarmonster / CC BY-SA 2.0",
      "https://www.flickr.com/photos/18179822@N00/5190843536",
      { objectPosition: "center 50%" }
    ),
    keywordBalanceSheetTaxForm: photo(
      "keywords/liabilities-balance-sheet-paperwork.jpg",
      "A tax or financial form being filled out by hand.",
      "Financial paperwork for liabilities and statement discipline",
      "Flickr via Openverse / kenteegardin / CC BY-SA 2.0",
      "https://www.flickr.com/photos/26373139@N08/5512347305",
      { objectPosition: "center 50%" }
    ),
    keywordEtfKeyboard: photo(
      "keywords/etf-keyboard-openverse.jpg",
      "A computer keyboard key labelled ETF.",
      "ETF keyboard image for exchange-traded fund prompts",
      "Flickr via Openverse / investmentzen / CC BY 2.0",
      "https://www.flickr.com/photos/144551102@N07/28789942743",
      { objectPosition: "center 50%" }
    ),
    keywordIndexFundsWallStreetSign: photo(
      "keywords/index-funds-wall-street-sign.jpg",
      "A Wall Street street sign used for an index funds image.",
      "Wall Street sign for index-fund discussion",
      "Flickr via Openverse / investmentzen / CC BY 2.0",
      "https://www.flickr.com/photos/144551102@N07/33879334026",
      { objectPosition: "center 50%" }
    ),
    keywordPortfolioDiversificationCards: photo(
      "keywords/portfolio-diversification-cards.jpg",
      "A card-style image about diversifying an investment portfolio.",
      "Portfolio diversification card image for spreading-risk prompts",
      "Flickr via Openverse / cogdogblog / CC BY 2.0",
      "https://www.flickr.com/photos/37996646802@N01/6221966664",
      { objectPosition: "center 50%" }
    )
  };
})();
