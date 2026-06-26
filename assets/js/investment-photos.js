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
      objectPosition: options.objectPosition || "center"
    };
  }

  window.INVEST.photos = {
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
    stockCertificate: photo(
      "stock-certificate.jpg",
      "An early twentieth-century stock certificate showing private share ownership.",
      "Stock certificate: a historical ownership claim",
      "Wikimedia Commons / Museum of Vojvodinian Slovaks",
      "https://commons.wikimedia.org/wiki/File:Stock_certificate.jpg"
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
