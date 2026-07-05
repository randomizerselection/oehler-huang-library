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
    )
  };
})();
