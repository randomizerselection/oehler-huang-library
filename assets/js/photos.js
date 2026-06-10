/* ============================================================
   photos.js - shared local photo catalogue for lesson decks

   Keep reusable teaching photos here so lesson slide files can stay focused
   on lesson sequence and economic content.
   ============================================================ */

window.IGCSE = window.IGCSE || {};

(() => {
  const photo = (folder, file, alt, credit, source) => ({
    type: 'photo',
    src: `../../../assets/images/${folder}/${file}`,
    alt,
    caption: alt.replace(/\.$/, ''),
    credit,
    source,
  });

  const factPhoto = (file, caption, credit, source) => ({
    type: 'photo',
    src: `../../../assets/images/fiscal-policy/facts/${file}`,
    alt: caption,
    caption,
    credit,
    source,
  });

  const marketEconomicSystem = {
    starbucks: photo(
      'market-economic-system',
      'first-starbucks-pike-place.jpg',
      'Customers inside the Starbucks store at Pike Place Market in Seattle.',
      'Wikimedia Commons / Liz525',
      'https://commons.wikimedia.org/wiki/File:FirstStarbucks.jpg'
    ),
    bubbleTeaShop: photo(
      'market-economic-system',
      'bubble-tea-shop.jpg',
      'A Tapioca Express bubble tea shop in Alameda, California.',
      'Wikimedia Commons / Tony Webster',
      'https://commons.wikimedia.org/wiki/File:Tapioca_Express,_Alameda,_California_(17240075099).jpg'
    ),
    phoneDisplay: photo(
      'market-economic-system',
      'iphone-display.jpg',
      'Rows of smartphones displayed in an Apple Store.',
      'Wikimedia Commons / Fastily',
      'https://commons.wikimedia.org/wiki/File:Apple_Store_iPhone_Display_1_2023-12-10.jpg'
    ),
    eBikeShop: photo(
      'market-economic-system',
      'electric-bike-shop.jpg',
      'An electric bicycle shop on 9th Avenue in New York.',
      'Wikimedia Commons / Jim.henderson',
      'https://commons.wikimedia.org/wiki/File:DC_Electric_Power_Bicycle_shop_jeh.jpg'
    ),
    evCharging: photo(
      'market-economic-system',
      'ev-charging-station.jpg',
      'An electric vehicle charging station.',
      'Wikimedia Commons / Rgaenzle',
      'https://commons.wikimedia.org/wiki/File:Electric_vehicle_charging_station.jpg'
    ),
    vegetables: photo(
      'market-economic-system',
      'supermarket-vegetables.jpg',
      'A supermarket vegetable shelf kept fresh by a mist generator.',
      'Wikimedia Commons / Simon Speed',
      'https://commons.wikimedia.org/wiki/File:VegetableShelfMistGenerator.JPG'
    ),
    factorySmoke: photo(
      'market-economic-system',
      'factory-smoke.jpg',
      'A factory chimney releasing smoke into the sky.',
      'Wikimedia Commons / Thomas Berg',
      'https://commons.wikimedia.org/wiki/File:Factory_Emitting_Smoke.jpg'
    ),
    bakeryBread: photo(
      'market-economic-system',
      'bakery-prepares-bread.jpg',
      'A culinary specialist preparing bread in a bakery.',
      'Wikimedia Commons / U.S. Navy / Timothy C. Roache',
      'https://commons.wikimedia.org/wiki/File:US_Navy_050102-N-5837R-048_Culinary_Specialist_Third_Class_Joshua_Savoy_prepares_bread_in_the_bakery_aboard_the_Nimitz-class_aircraft_carrier_USS_Abraham_Lincoln.jpg'
    ),
    trafficJam: photo(
      'market-economic-system',
      'traffic-jam-census.jpg',
      'A traffic jam on a busy road.',
      'Wikimedia Commons / U.S. Census Bureau',
      'https://commons.wikimedia.org/wiki/File:Trafficjam.jpg'
    ),
    rainforestCanopy: photo(
      'market-economic-system',
      'rainforest-canopy.jpg',
      'Rainforest canopy in Manaus, Brazil.',
      'Wikimedia Commons / Ben Sutherland / CC BY 2.0',
      'https://commons.wikimedia.org/wiki/File:Rainforest_canopy.jpg'
    ),
    vaccination: photo(
      'market-economic-system',
      'giving-a-vaccination.jpg',
      'A doctor giving a vaccination by injection.',
      'Wikimedia Commons / National Cancer Institute / Bill Branson',
      'https://commons.wikimedia.org/wiki/File:Giving_a_vaccination.jpg'
    ),
    floodBarrier: photo(
      'market-economic-system',
      'foss-flood-barrier.jpg',
      'The Foss Flood Barrier in York, England.',
      'Wikimedia Commons / Michael Jagger / CC BY-SA 2.0',
      'https://commons.wikimedia.org/wiki/File:Foss_Flood_Barrier_-_geograph.org.uk_-_1608304.jpg'
    ),
    streetLight: photo(
      'market-economic-system',
      'street-light.jpg',
      'A yellow street light at a road intersection at night.',
      'Wikimedia Commons / Famartin',
      'https://commons.wikimedia.org/wiki/File:2021-10-08_21_20_53_Yellow_street_light_at_the_intersection_of_Kuakini_Highway_and_Likana_Lane_in_Kailua-Kona,_Hawaii_County,_Hawaii.jpg'
    ),
    amazonWarehouse: photo(
      'market-economic-system',
      'amazon-warehouse-garner.jpg',
      'Amazon fulfilment center in Garner, North Carolina.',
      'Wikimedia Commons / Indy beetle',
      'https://commons.wikimedia.org/wiki/File:Amazon_warehouse,_Garner.jpg'
    ),
  };

  const cocoaChocolate = {
    cocoaPods: photo(
      'cocoa-chocolate',
      'cocoa-pods.jpg',
      'Ripe cocoa pods growing on a cocoa tree.',
      'Wikimedia Commons / Medicaster40',
      'https://commons.wikimedia.org/wiki/File:Cocoa_Pods.JPG'
    ),
    cocoaBeansDrying: photo(
      'cocoa-chocolate',
      'cocoa-beans-drying-ghana.jpg',
      'Cocoa beans drying in Mpenkro, Ghana.',
      'Wikimedia Commons / Francesco Veronesi',
      'https://commons.wikimedia.org/wiki/File:Cocoa_beans_drying_Mpenkro_2014_B002a.jpg'
    ),
    chocolateShopDisplay: photo(
      'cocoa-chocolate',
      'chocolate-shop-display-bruges.jpg',
      'Chocolate displayed in a chocolate shop in Bruges, Belgium.',
      'Wikimedia Commons / Dietmar Rabich',
      'https://commons.wikimedia.org/wiki/File:Br%C3%BCgge_(B),_Schokolade_--_2018_--_8470.jpg'
    ),
    confectioneryShelf: photo(
      'cocoa-chocolate',
      'candy-products-supermarket.jpg',
      'Candy products displayed on supermarket shelves in Orlando, Florida.',
      'Wikimedia Commons / Nielsoncaetanosalmeron',
      'https://commons.wikimedia.org/wiki/File:Candy_products_displayed_in_a_supermarket.jpg'
    ),
  };

  const marketFailure = {
    visualPauseFreshFruitShelf: photo(
      'market-failure',
      'visual-pause-fresh-fruit-shelf.jpg',
      'Fresh fruit displayed on a supermarket shelf.',
      'Wikimedia Commons / Mycomp / CC BY-SA 4.0',
      'https://commons.wikimedia.org/wiki/File:Fruit_on_a_shelf.jpg'
    ),
    visualPauseSoftDrinkShelf: photo(
      'market-failure',
      'visual-pause-soft-drink-shelf.jpg',
      'Soft drinks displayed on supermarket shelves.',
      'Wikimedia Commons / Wilfredor / CC BY-SA 4.0',
      'https://commons.wikimedia.org/wiki/File:Soft_drink_shelf_2.jpg'
    ),
    smokingChemotherapyTreatment: photo(
      'market-failure',
      'smoking-cost-chemotherapy-treatment.jpg',
      'A patient receiving chemotherapy treatment from nurses.',
      'Wikimedia Commons / National Cancer Institute / Rhoda Baer',
      'https://commons.wikimedia.org/wiki/File:Patient_receives_chemotherapy.jpg'
    ),
    smokingHospiceEndOfLifeCare: photo(
      'market-failure',
      'smoking-cost-hospice-end-of-life-care.jpg',
      'Terhokoti, an end-of-life care home in Helsinki, Finland.',
      'Wikimedia Commons / Mlang.Finn / CC0',
      'https://commons.wikimedia.org/wiki/File:Terhokoti-2022.jpg'
    ),
    smokingLungCancerXray: photo(
      'market-failure',
      'smoking-cost-lung-cancer-xray.jpg',
      'A chest X-ray showing a growth that could be lung cancer.',
      'Wikimedia Commons / National Cancer Institute',
      'https://commons.wikimedia.org/wiki/File:X-ray(Chest)Cancer.jpg'
    ),
    smokingSevereEmphysemaPatient: photo(
      'market-failure',
      'smoking-cost-severe-emphysema-patient.jpg',
      'A patient with severe emphysema, a smoking-related lung disease.',
      'Wikimedia Commons / James Heilman, MD / CC BY-SA 3.0',
      'https://commons.wikimedia.org/wiki/File:Emphysema2008.jpg'
    ),
    waterUtilityTreatmentPlant: photo(
      'market-failure',
      'water-utility-dalecarlia-treatment-plant.jpg',
      'Dalecarlia Treatment Plant, a large water treatment utility in Washington, D.C.',
      'Wikimedia Commons / District of Columbia Water and Sewer Authority',
      'https://commons.wikimedia.org/wiki/File:Dalecarlia_Treatment_Plant_1997.jpg'
    ),
  };

  const fiscalPolicy = {
    budgetMeeting: photo(
      'fiscal-policy',
      'budget-meeting-with-congress.jpg',
      'Government officials seated around a table during budget negotiations.',
      'Wikimedia Commons / Robert McNeely',
      'https://commons.wikimedia.org/wiki/File:President_Clinton_Meeting_with_Congressional_Leaders_on_the_Federal_Budget_-_NARA_-_6036986.jpg'
    ),
    budgetHearing: photo(
      'fiscal-policy',
      'house-budget-committee-meeting-2020-01-15.jpg',
      'A legislative budget committee meeting in progress.',
      'Wikimedia Commons / House Budget Committee Democrats',
      'https://commons.wikimedia.org/wiki/File:House_Budget_Committee_Meeting_2020-01-15.jpg'
    ),
    classroom: photo(
      'fiscal-policy',
      'students-in-a-classroom.jpg',
      'Students working at desks in a classroom.',
      'Wikimedia Commons / Ente75',
      'https://commons.wikimedia.org/wiki/File:Students_in_a_classroom.jpg'
    ),
    healthcare: photo(
      'fiscal-policy',
      'doctors-and-nurses-at-the-3rd-field-hospital.jpg',
      'Doctors and nurses standing together in a hospital.',
      'Wikimedia Commons / Defense VI Records Center',
      'https://commons.wikimedia.org/wiki/File:Doctors_and_nurses_at_the_3rd_Field_Hospital.jpg'
    ),
    defence: photo(
      'fiscal-policy',
      'defence-officials-meeting.jpg',
      'Defence officials seated for a formal bilateral meeting.',
      'Wikimedia Commons / U.S. Secretary of Defense',
      'https://commons.wikimedia.org/wiki/File:Ash_Carter_hosts_an_enhanced_honor_cordon_and_bilateral_meeting_for_Greek_Defense_Minister_Panos_Kammenos_150521-D-LU733-028.jpg'
    ),
    roadwork: photo(
      'fiscal-policy',
      'going-to-the-sun-road-paving.jpg',
      'A road construction crew paving a mountain road.',
      'Wikimedia Commons / U.S. Dept. of Transportation',
      'https://commons.wikimedia.org/wiki/File:Going-to-the-Sun_Road_paving.jpg'
    ),
    industry: photo(
      'fiscal-policy',
      'national-semiconductor-factory.jpg',
      'The exterior of a semiconductor factory.',
      'Wikimedia Commons / william craig',
      'https://commons.wikimedia.org/wiki/File:National_Semiconductor_1.jpg'
    ),
    socialSecurity: photo(
      'fiscal-policy',
      'signing-of-the-social-security-act.jpg',
      'President Roosevelt signing the Social Security Act.',
      'Wikimedia Commons / National Archives',
      'https://commons.wikimedia.org/wiki/File:Signing_of_the_Social_Security_Act.jpg'
    ),
    shopping: photo(
      'fiscal-policy',
      'shopping-carts-in-a-grocery-store.jpg',
      'Rows of shopping carts inside a grocery store.',
      'Wikimedia Commons / Visitor7',
      'https://commons.wikimedia.org/wiki/File:Shopping_Carts_in_a_Grocery_Store.jpg'
    ),
    taxForms: photo(
      'fiscal-policy',
      'tax-forms.jpg',
      'Printed tax forms laid out on a table.',
      'Wikimedia Commons / Kalamazoo Public Library',
      'https://commons.wikimedia.org/wiki/File:Tax_Forms.jpg'
    ),
    tobacco: photo(
      'fiscal-policy',
      'tobacco-cigarette-pack.jpg',
      'A cigarette pack photographed on a table.',
      'Wikimedia Commons / Lindsay Fox',
      'https://commons.wikimedia.org/wiki/File:Cigarette_pack.jpg'
    ),
    pollution: photo(
      'fiscal-policy',
      'smokestack-in-detroit.jpg',
      'A smokestack rising from an industrial plant.',
      'Wikimedia Commons / Gyre',
      'https://commons.wikimedia.org/wiki/File:Smokestack_in_Detroit.jpg'
    ),
    port: photo(
      'fiscal-policy',
      'cargo-containers.jpg',
      'Stacks of cargo containers at a waterfront port.',
      'Wikimedia Commons / Roy Luck',
      'https://commons.wikimedia.org/wiki/File:Cargo_containers.jpg'
    ),
    inflation: photo(
      'fiscal-policy',
      'meat-inflation-in-the-united-states.jpg',
      'A grocery shelf with posted meat prices.',
      'Wikimedia Commons / Wikideas1',
      'https://commons.wikimedia.org/wiki/File:Meat_Inflation_in_the_United_States.jpg'
    ),
    visualPauseRoadCrew: photo(
      'fiscal-policy',
      'visual-pause-road-crew-maintains-asphalt.jpg',
      'A road worker assists with asphalt road maintenance.',
      'Wikimedia Commons / Sgt. Christopher Ruano, U.S. Air Force',
      'https://commons.wikimedia.org/wiki/File:Road_Crew_Maintains_Asphalt.jpg'
    ),
    visualPauseBudgetNegotiation: photo(
      'fiscal-policy',
      'visual-pause-budget-negotiation.jpg',
      'Government leaders meet around a conference table for federal budget negotiations.',
      'Wikimedia Commons / Clinton White House Photograph Office',
      'https://commons.wikimedia.org/wiki/File:Budget_meeting_with_Congress_-_DPLA_-_389e670ee5b40c14a7c85b792ce07776.jpg'
    ),
    visualPauseCityGrowth: photo(
      'fiscal-policy',
      'visual-pause-toronto-skyline.jpg',
      'A dense city skyline seen from across the water.',
      'Wikimedia Commons / Bernard Spragg. NZ / CC0',
      'https://commons.wikimedia.org/wiki/File:Toronto_skyline._(49366040606).jpg'
    ),
    visualPauseSupermarketLine: photo(
      'fiscal-policy',
      'visual-pause-supermarket-line.jpg',
      'Shoppers wait in line outside a supermarket.',
      'Wikimedia Commons / Siobhan Leachman / CC0',
      'https://commons.wikimedia.org/wiki/File:Wait_line_at_the_supermarket.jpg'
    ),
    visualPauseTaxForm: photo(
      'fiscal-policy',
      'visual-pause-tax-form-1040.jpg',
      'A scanned individual income tax return form.',
      'Wikimedia Commons / U.S. Internal Revenue Service',
      'https://commons.wikimedia.org/wiki/File:Form_1040,_2005.jpg'
    ),
    visualPauseDebtClock: photo(
      'fiscal-policy',
      'visual-pause-national-debt-clock.jpg',
      'The National Debt Clock displayed above a New York street.',
      'Wikimedia Commons / Oscar Grooters / CC BY-SA 4.0',
      'https://commons.wikimedia.org/wiki/File:The_National_Debt_Clock_-_March_1989.jpg'
    ),
    visualPauseCareerFair: photo(
      'fiscal-policy',
      'visual-pause-career-fair.jpg',
      'Career advisers speak with employees at a career fair.',
      'Wikimedia Commons / Savannah River Nuclear Solutions, U.S. Department of Energy',
      'https://commons.wikimedia.org/wiki/File:Reverse_Career_Fair_Event_(29864863237).jpg'
    ),
    visualPauseJobInterview: photo(
      'fiscal-policy',
      'visual-pause-job-interview.jpg',
      'A job candidate listens during a professional interview.',
      'Pexels / Artem Podrez',
      'https://www.pexels.com/photo/man-having-an-interview-6585014/'
    ),
    visualPausePortTacoma: photo(
      'fiscal-policy',
      'visual-pause-port-of-tacoma.jpg',
      'Aerial view of the Port of Tacoma and its container terminals.',
      'Wikimedia Commons / D Coetzee / CC0',
      'https://commons.wikimedia.org/wiki/File:Aerial_photo_of_Port_of_Tacoma.jpg'
    ),
    visualPauseSolarFarm: photo(
      'fiscal-policy',
      'visual-pause-solar-farm.jpg',
      'A large solar farm with rows of photovoltaic panels.',
      'Wikimedia Commons / FBenjr123 / CC BY-SA 4.0',
      'https://commons.wikimedia.org/wiki/File:50_MWAC_San_Miguel_Solar_Farm_Project.jpg'
    ),
    visualPauseWindFarm: photo(
      'fiscal-policy',
      'visual-pause-wind-farm.jpg',
      'Wind turbines on Savage Mountain in Pennsylvania.',
      'Wikimedia Commons / Nyttend',
      'https://commons.wikimedia.org/wiki/File:Savage_Mountain_wind_farm.jpg'
    ),
  };

  const fiscalPolicyFacts = {
    ukBudget: factPhoto(
      'uk-budget-rachel-reeves.jpg',
      'Rachel Reeves official portrait',
      'Wikimedia Commons / Chris McAndrew',
      'https://commons.wikimedia.org/wiki/File:Official_portrait_of_Rachel_Reeves_crop_2.jpg'
    ),
    finlandEducation: factPhoto(
      'finland-vantaankoski-classroom.jpg',
      'Vantaankoski school classroom',
      'Wikimedia Commons / Leo-seta',
      'https://commons.wikimedia.org/wiki/File:Elementary_school_classroom_in_Vantaankoski_school_in_Vantaa,_Finland,_2010.jpg'
    ),
    usSemiconductors: factPhoto(
      'us-intel-d1x-fab.jpg',
      'Intel D1X semiconductor fab',
      'Wikimedia Commons / Intel Free Press',
      'https://commons.wikimedia.org/wiki/File:Intel_D1X_Development_Fab_Hillsboro_Oregon.png'
    ),
    denmarkTax: factPhoto(
      'denmark-ministry-taxation.jpg',
      'Danish Ministry of Taxation',
      'Wikimedia Commons / Bjoertvedt',
      'https://commons.wikimedia.org/wiki/File:Copenhagen_Skatteministeriet_IMG_5647.jpg'
    ),
    philippinesTobacco: factPhoto(
      'philippines-tobacco-warning-labels.jpg',
      'Philippine tobacco warning labels',
      'Wikimedia Commons / Government of the Philippines',
      'https://commons.wikimedia.org/wiki/File:PH_tobacco_packaging_graphic_warning_labels.jpg'
    ),
    ukSugar: factPhoto(
      'uk-soft-drink-shelf.jpg',
      'Soft drinks on supermarket shelves',
      'Wikimedia Commons',
      'https://commons.wikimedia.org/wiki/File:Soft_drink_shelf.JPG'
    ),
    euCbam: factPhoto(
      'netherlands-rotterdam-container-terminal.jpg',
      'Port of Rotterdam container terminal',
      'Wikimedia Commons / AgainErick',
      'https://commons.wikimedia.org/wiki/File:Waalhaven_pier_6_-_Port_of_Rotterdam_-_container_terminal_and_cranes.jpg'
    ),
    swedenCarbon: factPhoto(
      'sweden-hammarbyverket.jpg',
      'Hammarbyverket energy plant',
      'Wikimedia Commons / Holger.Ellgaard',
      'https://commons.wikimedia.org/wiki/File:Hammarbyverket_2008.jpg'
    ),
    singaporeBudget: factPhoto(
      'singapore-budget-2024-thumbnail.jpg',
      'Singapore Budget 2024 video thumbnail',
      'YouTube / Singapore MOF',
      'https://www.mof.gov.sg/budget-archives/budget-2024/'
    ),
    indiaBudget2024: factPhoto(
      'india-union-budget-2024.jpg',
      'India Finance Minister Nirmala Sitharaman arriving to present the Union Budget 2024-25',
      'Wikimedia Commons / Ministry of Finance, Government of India',
      'https://commons.wikimedia.org/wiki/File:The_Union_Minister_for_Finance_and_Corporate_Affairs,_Smt._Nirmala_Sitharaman_along_with_arrived_at_the_Parliament_House_to_present_the_first_Union_Budget_2024-25_of_Modi_3.0,_in_New_Delhi_on_July_23,_2024_(1).jpg'
    ),
    chipsForAmerica: factPhoto(
      'tsmc-arizona-fab-21-construction.jpg',
      'TSMC Fab 21 under construction in Phoenix, Arizona',
      'Wikimedia Commons / TrickHunter',
      'https://commons.wikimedia.org/wiki/File:231105-1_TSMC_Fab_21_construction.jpg'
    ),
    usSocialSecurity: factPhoto(
      'us-social-security-headquarters.jpg',
      'Social Security Administration headquarters',
      'Wikimedia Commons / Coolcaesar',
      'https://commons.wikimedia.org/wiki/File:Socialsecurityheadquarters.jpg'
    ),
    euCbamOfficial: factPhoto(
      'eu-cbam-banner.webp',
      'European Commission CBAM banner',
      'European Commission',
      'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en'
    ),
    swedenCarbonTaxRate: factPhoto(
      'sweden-carbon-tax-rate.png',
      'Swedish carbon tax rate chart',
      'Government Offices of Sweden',
      'https://www.government.se/government-policy/taxes-and-tariffs/swedens-carbon-tax/'
    ),
    hmrcLondon: factPhoto(
      'hmrc-lower-thames-street.jpg',
      'HM Revenue and Customs buildings on Lower Thames Street',
      'Wikimedia Commons / Stephen Richards',
      'https://commons.wikimedia.org/wiki/File:View_of_the_HM_Revenue_%5E_Customs_buildings_on_Lower_Thames_Street_-_geograph.org.uk_-_5448128.jpg'
    ),
  };

  const macroAims = {
    worldBankHeadquarters: photo(
      'macro-aims',
      'world-bank-headquarters.jpg',
      'The World Bank Group headquarters in Washington, D.C.',
      'Wikimedia Commons / Shiny Things',
      'https://commons.wikimedia.org/wiki/File:World_Bank_building_at_Washington.jpg'
    ),
    nbsChina: photo(
      'macro-aims',
      'china-national-bureau-statistics.jpg',
      'The National Bureau of Statistics of China building in Beijing.',
      'Wikimedia Commons / N509FZ',
      'https://commons.wikimedia.org/wiki/File:National_Bureau_of_Statistics_of_China_(20220812161639).jpg'
    ),
    youthCareerFair: photo(
      'macro-aims',
      'youth-career-fair-2024.jpg',
      'A youth career fair at the 2024 National 4-H Conference in Washington, D.C.',
      'Wikimedia Commons / USDA',
      'https://commons.wikimedia.org/wiki/File:Youth_Career_Fair_at_2024_National_4-H_Conference_(20240423-USDA-OSEC-CDP-0292).jpg'
    ),
    inflationShelf: fiscalPolicy.inflation,
    pollution: fiscalPolicy.pollution,
  };

  const monetaryPolicy = {
    fed: photo(
      'monetary-policy',
      'fed-eccles-building.jpg',
      'Marriner S. Eccles Federal Reserve Board Building in Washington, DC.',
      'Wikimedia Commons',
      'https://commons.wikimedia.org/wiki/File:Marriner_S._Eccles_Federal_Reserve_Board_Building.jpg'
    ),
    bankEngland: photo(
      'monetary-policy',
      'bank-of-england-facade.jpg',
      'The front facade of the Bank of England building in London.',
      'Wikimedia Commons / Michael',
      'https://commons.wikimedia.org/wiki/File:Bank_of_England_Facade.jpg'
    ),
    householdSaving: photo(
      'monetary-policy',
      'deposit-into-piggy-bank-savings-account.jpg',
      'A coin being deposited into a piggy bank savings account.',
      'Wikimedia Commons / Ken Teegardin / CC BY-SA 2.0',
      'https://commons.wikimedia.org/wiki/File:Deposit_Into_Piggy_Bank_Savings_Account_(6093700157).jpg'
    ),
    pboc: photo(
      'monetary-policy',
      'people-bank-of-china-2020.jpg',
      "People's Bank of China headquarters in Beijing.",
      'Wikimedia Commons',
      "https://commons.wikimedia.org/wiki/File:People's_Bank_of_China_(2020).jpg"
    ),
    moneySupply: photo(
      'monetary-policy',
      'us-money-supply-components.svg',
      'Chart showing components of the United States money supply.',
      'Wikimedia Commons / Autopilot',
      'https://commons.wikimedia.org/wiki/File:Components_of_US_Money_supply.svg'
    ),
    bankLendingCashier: photo(
      'monetary-policy',
      'cashier-handing-money-riggs-bank.jpg',
      'A cashier handing money to a customer at Riggs Bank.',
      'Library of Congress / Harris & Ewing Collection',
      'https://commons.wikimedia.org/wiki/File:Cashier_handing_money_out,_Riggs_Bank,_3-2-38_LCCN2016873156.jpg'
    ),
    helicopterMoneyDrop: photo(
      'monetary-policy',
      'helicopter-money-drop.png',
      'AI-generated illustration of a helicopter dropping generic banknotes over households and small businesses.',
      'AI-generated image, OpenAI',
      'Generated for this lesson, 2026-06-02'
    ),
    exchangeRate: photo(
      'monetary-policy',
      'cny-usd-exchange-rate.svg',
      'Chart showing the renminbi and United States dollar exchange rate.',
      'Wikimedia Commons / Monaneko',
      'https://commons.wikimedia.org/wiki/File:CNY-USD_v2.svg'
    ),
    currencyExchangeStall: photo(
      'monetary-policy',
      'nyc-currency-exchange-stall.jpg',
      'A currency exchange stall in New York City showing exchange-rate boards.',
      'Wikimedia Commons / Rhododendrites / CC BY-SA 4.0',
      'https://commons.wikimedia.org/wiki/File:NYC_-_Currency_Exchange_stall_-_0670.jpg'
    ),
    visualPauseFomcBoardRoom: photo(
      'monetary-policy',
      'visual-pause-fomc-board-room.jpg',
      'The entrance to the Federal Open Market Committee board room in the Marriner S. Eccles building.',
      'Wikimedia Commons / Federalreserve / U.S. Government Work',
      'https://commons.wikimedia.org/wiki/File:The_Entrance_to_the_FOMC_Board_Room.jpg'
    ),
    visualPauseClosedMallShops: photo(
      'monetary-policy',
      'visual-pause-closed-mall-shops.jpg',
      'Closed shops inside a mall.',
      'Wikimedia Commons / 95 b-body ss / CC BY-SA 3.0',
      'https://commons.wikimedia.org/wiki/File:Closed_mall_shops.JPG'
    ),
    visualPauseGasStationPricing: photo(
      'monetary-policy',
      'visual-pause-gas-station-pricing.jpg',
      'A gas station pricing sign at a former petrol station.',
      'Wikimedia Commons / Moonstruck Exploring / CC BY-SA 4.0',
      'https://commons.wikimedia.org/wiki/File:Gas_station_with_pricing_sign.jpg'
    ),
    visualPauseCreditCardDebt: photo(
      'monetary-policy',
      'visual-pause-credit-card-debt.jpg',
      'A person using a laptop while holding a credit card.',
      'Unsplash / rupixen / Unsplash License',
      'https://unsplash.com/photos/person-using-laptop-computer-holding-card-Q59HmzK38eQ'
    ),
    visualPauseShippingContainersPort: photo(
      'monetary-policy',
      'visual-pause-shipping-containers-port.jpg',
      'Shipping containers stacked at a busy port.',
      'Unsplash / Haris Illahi / Unsplash License',
      'https://unsplash.com/photos/shipping-containers-stacked-at-a-busy-port-at-sunset-fT4SwA83jH4'
    ),
  };

  const supplySidePolicy = {
    singaporeIte: photo(
      'supply-side-policy',
      'singapore-ite-headquarters.jpg',
      'An aeroplane displayed at the Institute of Technical Education headquarters in Singapore.',
      'Wikimedia Commons / ProjectManhattan',
      'https://commons.wikimedia.org/wiki/File:Aeroplane_at_ITE_HQ,_Singapore.jpg'
    ),
    vwApprentices: photo(
      'supply-side-policy',
      'vw-apprentices-training.jpg',
      'Apprentices training in a Volkswagen workshop in Wolfsburg, Germany.',
      'Bundesarchiv, B 145 Bild-F060162-0011 / Engelbert Reineke / CC-BY-SA 3.0',
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_B_145_Bild-F060162-0011,_Wolfsburg,_VW_Autowerk,_Lehrlingsausbildung.jpg'
    ),
    autoMechanicsTraining: photo(
      'supply-side-policy',
      'auto-mechanics-vocational-training.jpg',
      'A student learns engine mechanics at Chawama Youth Resource Centre in Zambia.',
      'Wikimedia Commons / IICD',
      'https://commons.wikimedia.org/wiki/File:Auto_mechanics_class_at_Chawama_Youth_Resource_Centre_(5348624275).jpg'
    ),
    employmentOffice: photo(
      'supply-side-policy',
      'employment-office-erfurt.jpg',
      'The public employment office building in Erfurt, Germany.',
      'Wikimedia Commons / Giorno2',
      'https://commons.wikimedia.org/wiki/File:Agentur_f%C3%BCr_Arbeit_Arbeitsamt_Erfurt_1.JPG'
    ),
    industrialRobot: photo(
      'supply-side-policy',
      'industrial-riveting-robot.jpg',
      'An industrial robot used in an automated riveting process.',
      'Wikimedia Commons / Michael KR',
      'https://commons.wikimedia.org/wiki/File:Blindniet_Roboteranlage_4327.jpg'
    ),
    corporationTaxReturn: photo(
      'supply-side-policy',
      'corporation-tax-return-1120.jpg',
      'A United States corporation income tax return form.',
      'Wikimedia Commons / Internal Revenue Service',
      'https://commons.wikimedia.org/wiki/File:US_Corporation_Income_Tax_Return_2011_form_1120.jpg'
    ),
    portTerminal: photo(
      'supply-side-policy',
      'aarhus-container-terminal.jpg',
      'Container cranes and freight stacks at the Port of Aarhus container terminal.',
      'Wikimedia Commons / Guillaume Baviere',
      'https://commons.wikimedia.org/wiki/File:Aarhus_container_terminal.jpg'
    ),
    mobilePhoneStore: photo(
      'supply-side-policy',
      'mobile-phone-store-stockholm.jpg',
      'A Three mobile phone store on Kungsgatan in Stockholm.',
      'Wikimedia Commons / Tony Webster',
      'https://commons.wikimedia.org/wiki/File:3_Kungsgatan_Mobile_Phone_Store_(22460724332).jpg'
    ),
    smallMobilePhoneShop: photo(
      'supply-side-policy',
      'small-mobile-phone-shop.jpg',
      'A small mobile phone shop selling phones and wireless internet access.',
      'Wikimedia Commons / Oxfam East Africa',
      'https://commons.wikimedia.org/wiki/File:Mobile_phone_shop_(7550611126).jpg'
    ),
    stockCertificate: photo(
      'supply-side-policy',
      'stock-certificate.jpg',
      'An early twentieth-century stock certificate showing private share ownership.',
      'Wikimedia Commons / Museum of Vojvodinian Slovaks',
      'https://commons.wikimedia.org/wiki/File:Stock_certificate.jpg'
    ),
    healthcareWorkforce: fiscalPolicy.healthcare,
    roadwork: fiscalPolicy.roadwork,
    chipsInvestment: fiscalPolicyFacts.chipsForAmerica,
    fed: monetaryPolicy.fed,
  };

  const supplySidePolicyFacts = {
    skillsTraining: supplySidePolicy.singaporeIte,
    vocationalEducation: supplySidePolicy.vwApprentices,
    infrastructure: supplySidePolicy.portTerminal,
    chipsInvestment: fiscalPolicyFacts.chipsForAmerica,
    portLogistics: supplySidePolicy.portTerminal,
    healthcareProductivity: supplySidePolicy.healthcareWorkforce,
  };

  IGCSE.photos = {
    ...(IGCSE.photos || {}),
    fiscalPolicy,
    fiscalPolicyFacts,
    macroAims,
    marketTeaching: {
      ...marketEconomicSystem,
      ...cocoaChocolate,
      ...marketFailure,
      classroom: fiscalPolicy.classroom,
      healthcare: fiscalPolicy.healthcare,
      tobacco: fiscalPolicy.tobacco,
      socialSecurity: fiscalPolicy.socialSecurity,
      port: fiscalPolicy.port,
      roadwork: fiscalPolicy.roadwork,
    },
    marketEconomicSystem,
    cocoaChocolate,
    marketFailure,
    monetaryPolicy,
    supplySidePolicy,
    supplySidePolicyFacts,
  };

  // Backward-compatible alias for older market lessons.
  IGCSE.marketPhotos = IGCSE.marketPhotos || IGCSE.photos.marketTeaching;
})();
