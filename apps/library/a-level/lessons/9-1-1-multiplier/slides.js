// Canonical HTML lesson content. Edit by stable slide id; no build step.
(function () {
  const SYLLABUS = "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.1, p.29 (local PDF).";
  const PLANNER = "A-Level_Macro_International_32-Lesson_Coverage_Planner.xlsx, lessons 1–2 (local workbook).";
  const COURSEBOOK = "Cambridge A Level Economics - Textbook.pdf, Chapter 41, especially PDF pp.351–353 and 357 (local coursebook).";
  const LEGACY = "9.1.1 Multiplier process SHARE.pdf and 9.1.2 Calculating the multiplier SHARE.pdf in previous-lesson-materials (local teaching references).";
  const AE_LEGACY = "9.1.3 National income determination SHARE.pdf in previous-lesson-materials (local teaching reference).";
  const ROAD = "Road-construction photograph inherited from the user’s manual multiplier deck and used once as an applied public-investment case.";
  const HERO = "Multiplier cover visual generated with OpenAI image generation on 7 September 2026; no external reference image used.";
  const CHAIN = "Income-spending visual generated with OpenAI image generation on 7 September 2026 as a deliberately staged teaching scenario.";
  const LEAKAGES = "Marginal-leakage visual generated with OpenAI image generation on 7 September 2026 as a deliberately staged teaching still life.";
  const CAPACITY = "Spare-capacity visual generated with OpenAI image generation on 7 September 2026 as a deliberately staged factory scenario.";
  const INVENTORY = "Production and inventory visual generated with OpenAI image generation on 7 September 2026 as a deliberately staged warehouse scenario.";
  const sources = (...extra) => [SYLLABUS, ...extra];

  const slides = [
    {
      id: "multiplier", kind: "hero", code: "9.1.1", title: "The multiplier",
      subtitle: "Process, calculation and national income determination",
      eyebrow: "CAMBRIDGE A LEVEL ECONOMICS · 9708", syllabus: "Two-lesson sequence",
      section: "Opening · The multiplier", image: "assets/multiplier-economy-hero.png",
      imageAlt: "A public road project connects workers, delivery vehicles and nearby local businesses.",
      notes: "Ask students to identify the initial spending and three possible income recipients. The image establishes a concrete chain before any formula appears.",
      sources: sources(PLANNER, COURSEBOOK, HERO)
    },
    {
      id: "income-spending-puzzle", kind: "hook", eyebrow: "VISUAL PAUSE",
      title: "How many incomes can one payment create?", section: "Opening · The multiplier",
      image: "assets/income-spending-chain.png", imagePosition: "center center",
      imageAlt: "A road worker buys groceries while a supplier unloads boxes outside the shop.",
      notes: "Allow silent looking time. Ask who first earned income from the road project, whose income the shop purchase creates, and what could stop the chain. Do not name the multiplier until students have described repeated income creation.",
      sources: sources(COURSEBOOK, CHAIN)
    },
    {
      id: "starter-spending-chain", kind: "tasks", label: "STARTER",
      title: "The first four spending events", section: "Opening · The multiplier",
      intro: "Classify each event as the initial injection, income creation, induced spending or a leakage.",
      items: [
        { heading: "A", text: "The government pays a road contractor £100m." },
        { heading: "B", text: "The contractor pays workers and suppliers." },
        { heading: "C", text: "Households spend part of their new income." },
        { heading: "D", text: "Households save part of their new income." }
      ],
      takeaway: "Keep the first injection separate from the spending it induces.",
      notes: "Students should attempt all four before the next slide. Insist that B is income creation, not a second autonomous injection.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "starter-spending-chain-feedback", kind: "answers", label: "FEEDBACK",
      title: "Roles in the multiplier process", section: "Opening · The multiplier",
      items: [
        { heading: "A · INITIAL INJECTION", text: "Government spending enters the circular flow independently of current income." },
        { heading: "B · INCOME", text: "The payment becomes wages, profit and supplier revenue." },
        { heading: "C · INDUCED SPENDING", text: "Consumption rises because household income has risen." },
        { heading: "D · LEAKAGE", text: "Saving removes income from the next spending round." }
      ],
      takeaway: "One payment can begin several smaller rounds of income and spending.",
      notes: "Use the words autonomous and induced only after the sequence is secure. Preview that taxation and imports can also reduce the next domestic spending round.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "learning-objectives", kind: "objectives", label: "LESSON OVERVIEW",
      title: "Learning objectives", section: "Opening · The multiplier",
      items: [
        { text: "Explain how an injection creates repeated rounds of income and spending." },
        { text: "Calculate average and marginal propensities, then select the correct multiplier formula." },
        { text: "Use the income approach to determine equilibrium national income." },
        { text: "Explain why a change in aggregate demand may affect real output and the price level." }
      ],
      notes: "Use this as the learning contract. Objectives one and two dominate Lesson 1. Objectives three and four dominate Lesson 2.",
      sources: sources(PLANNER)
    },
    {
      id: "mechanism-section", kind: "section", number: "01", eyebrow: "LESSON 1 · SECTION 1",
      title: "The multiplier process",
      subtitle: "Follow one autonomous injection through smaller rounds of income and spending",
      section: "1 · The multiplier process",
      notes: "Section boundary. Establish the mechanism before calculating the coefficient.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "road-investment-case", kind: "scenario", label: "PHOTO CASE",
      title: "A public investment injection", section: "1 · The multiplier process",
      image: "assets/road.jpeg", imagePosition: "center center",
      imageAlt: "Road rollers and construction workers build a public road.",
      heading: "A government brings a road project forward",
      text: "Identify the first injection. Name the first income recipients. Predict why each later spending round becomes smaller.",
      notes: "The first injection is G. Initial income goes to the contractor, workers and suppliers. Saving, tax and imports make later domestic spending rounds smaller.",
      sources: sources(COURSEBOOK, ROAD)
    },
    {
      id: "multiplier-mechanism", kind: "steps", label: "CONCEPT",
      title: "The multiplier mechanism", section: "1 · The multiplier process",
      items: [
        { heading: "1 · AUTONOMOUS INJECTION", text: "Investment, government spending or exports rise independently of current income." },
        { heading: "2 · INCOME CREATION", text: "Firms increase output and payments become income." },
        { heading: "3 · INDUCED SPENDING", text: "Households spend part of the extra income on domestic output." },
        { heading: "4 · SMALLER ROUNDS", text: "Leakages leave less income to pass into the next round." }
      ],
      takeaway: "The final change in national income exceeds the initial injection.",
      notes: "Clarify that the process also works in reverse. A fall in autonomous spending can cause a larger fall in national income.",
      sources: sources(COURSEBOOK, LEGACY)
    },
    {
      id: "leakage-choices", kind: "hook", eyebrow: "VISUAL PAUSE",
      title: "What prevents all income being spent again?", section: "1 · The multiplier process",
      image: "assets/marginal-leakage-choices.png", imagePosition: "center center",
      imageAlt: "A household table shows groceries, a savings jar, a tax envelope and an imported electronic item.",
      notes: "Ask students to connect each visible object to consumption, saving, taxation or imports. Domestic consumption continues the spending chain. The other three uses withdraw income from the next domestic round.",
      sources: sources(COURSEBOOK, LEAKAGES)
    },
    {
      id: "injections-and-leakages", kind: "flow", label: "CONCEPT",
      title: "Injections and leakages", section: "1 · The multiplier process",
      items: [
        { heading: "INJECTIONS", text: "Investment (I)\nGovernment spending (G)\nExports (X)" },
        { heading: "LEAKAGES", text: "Saving (S)\nTaxation (T)\nImports (M)" }
      ],
      takeaway: "Injections add spending to the domestic flow. Leakages reduce the next round.",
      notes: "Cold-call one example of each flow. At equilibrium, planned injections equal planned leakages. That condition returns in the income-expenditure section.",
      sources: sources(COURSEBOOK, LEGACY)
    },
    {
      id: "spending-rounds", kind: "table", label: "WORKED EXAMPLE",
      title: "Repeated income and spending rounds", section: "1 · The multiplier process",
      intro: "Assume an initial investment of £100m, MPC = 0.75 and saving is the only leakage.",
      table: [
        ["Round", "Extra income (£m)", "Spent next round (£m)", "Saving leakage (£m)"],
        ["Initial", "100.00", "75.00", "25.00"], ["2", "75.00", "56.25", "18.75"],
        ["3", "56.25", "42.19", "14.06"], ["4", "42.19", "31.64", "10.55"],
        ["Later rounds", "126.56", "94.92", "31.64"], ["All rounds", "400.00", "300.00", "100.00"]
      ],
      takeaway: "A 25% leakage makes each new round 25% smaller than the previous one.",
      notes: "Values display to two decimal places, while totals use unrounded values. Ask students to calculate Round 3 before revealing it. Total extra saving eventually equals the initial £100m injection.",
      sources: sources(COURSEBOOK, LEGACY)
    },
    {
      id: "multiplier-definition", kind: "formula", label: "CONCEPT",
      title: "The multiplier coefficient", section: "1 · The multiplier process",
      formula: "k = ΔY ÷ ΔJ",
      definition: "k   multiplier\nΔY  final change in national income\nΔJ  initial change in autonomous injections",
      heading: "READ THE RATIO",
      text: "If a £100m injection raises national income by £400m, k = 4.\n\nThe coefficient has no currency unit.",
      takeaway: "The multiplier compares the final income change with the initial injection.",
      notes: "Use J as a general injection symbol. The initial change may be in I, G or X. Avoid treating the full rise in induced consumption as another initial injection.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "average-marginal-distinction", kind: "compare", label: "CONCEPT",
      title: "Average and marginal propensities", section: "1 · The multiplier process",
      items: [
        { heading: "AVERAGE", text: "A total flow divided by total income.\nAPC = C ÷ Y\nAPS = S ÷ Y", detail: "Describes the existing level" },
        { heading: "MARGINAL", text: "A change in a flow divided by the change in income.\nMPC = ΔC ÷ ΔY\nMPS = ΔS ÷ ΔY", detail: "Determines the next spending round" }
      ],
      takeaway: "Multiplier formulae use marginal propensities because the process concerns extra income.",
      notes: "Use a numerical counterexample to prevent students from substituting APC for MPC. Average and marginal values need not be equal.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "propensity-measures", kind: "table", label: "CONCEPT",
      title: "Propensities for each income flow", section: "1 · The multiplier process",
      table: [
        ["Flow", "Average measure", "Marginal measure", "Role in the process"],
        ["Consumption", "APC = C ÷ Y", "MPC = ΔC ÷ ΔY", "Continues domestic spending"],
        ["Saving", "APS = S ÷ Y", "MPS = ΔS ÷ ΔY", "Leakage"],
        ["Imports", "APM = M ÷ Y", "MPM = ΔM ÷ ΔY", "Leakage"],
        ["Tax", "ART = T ÷ Y", "MRT = ΔT ÷ ΔY", "Leakage"]
      ],
      takeaway: "The marginal measures show how one extra unit of income is divided.",
      notes: "ART means average rate of tax. Ask which measures enter the denominator of the open-economy multiplier and why average values do not.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "propensity-identities", kind: "steps", label: "CONCEPT",
      title: "Marginal propensity identities", section: "1 · The multiplier process",
      items: [
        { heading: "CLOSED, NO GOVERNMENT", text: "MPC + MPS = 1" },
        { heading: "MARGINAL WITHDRAWALS", text: "MPW = MPS + MRT + MPM" },
        { heading: "FULL MODEL", text: "MPC + MPW = 1" },
        { heading: "MULTIPLIER", text: "k = 1 ÷ MPW = 1 ÷ (1 − MPC)" }
      ],
      takeaway: "Every extra unit of income is either spent domestically or withdrawn.",
      notes: "State the model assumption clearly. This decomposition treats saving, tax and imports as the marginal withdrawals from extra income.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "multiplier-formulae", kind: "table", label: "CONCEPT",
      title: "Multiplier formulae by economy model", section: "1 · The multiplier process",
      table: [
        ["Economy", "Leakages from extra income", "Multiplier"],
        ["Closed, no government", "MPS", "1 ÷ MPS"],
        ["Closed, with government", "MPS + MRT", "1 ÷ (MPS + MRT)"],
        ["Open, no government", "MPS + MPM", "1 ÷ (MPS + MPM)"],
        ["Open, with government", "MPS + MRT + MPM", "1 ÷ (MPS + MRT + MPM)"]
      ],
      takeaway: "Build the denominator from the leakage sectors named in the question.",
      notes: "Make students name the economy before choosing a formula. Closed removes imports. No government removes taxation from the marginal withdrawals.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "closed-economy-worked", kind: "worked", label: "WORKED EXAMPLE",
      title: "Closed economy without government", section: "1 · The multiplier process",
      prompt: "MPC = 0.75.\nInvestment rises by £75m.\nFind MPS, k and the final change in national income.",
      solution: "MPS = 1 − 0.75 = 0.25\nk = 1 ÷ 0.25 = 4\nΔY = 4 × £75m = £300m",
      takeaway: "The initial £75m is included within the final £300m income change.",
      notes: "Students often add the injection again and report £375m. Use k = ΔY ÷ ΔJ to show why that double counts the initial spending.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "open-government-worked", kind: "worked", label: "WORKED EXAMPLE",
      title: "Open economy with government", section: "1 · The multiplier process",
      prompt: "MPS = 0.10, MRT = 0.20 and MPM = 0.20.\nGovernment spending rises by £120m.\nFind MPW, k and ΔY.",
      solution: "MPW = 0.10 + 0.20 + 0.20 = 0.50\nk = 1 ÷ 0.50 = 2\nΔY = 2 × £120m = £240m",
      takeaway: "More leakage channels make the spending rounds shrink faster.",
      notes: "Require a formula line, substitution and units. Contrast k = 2 here with k = 4 in the preceding closed-economy example.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "formula-selection-practice", kind: "tasks", label: "QUICK CHECK",
      title: "Selecting the multiplier denominator", section: "1 · The multiplier process",
      intro: "Write only the denominator for each economy.",
      items: [
        { heading: "A", text: "Closed economy without government" },
        { heading: "B", text: "Open economy without government" },
        { heading: "C", text: "Closed economy with government" },
        { heading: "D", text: "Open economy with government" }
      ],
      takeaway: "The words describing the economy determine which leakages belong in the formula.",
      notes: "Give 45 seconds. Students should write A MPS, B MPS + MPM, C MPS + MRT, D MPS + MRT + MPM.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "formula-selection-feedback", kind: "answers", label: "FEEDBACK",
      title: "Leakages in each economy model", section: "1 · The multiplier process",
      items: [
        { heading: "A", text: "MPS" }, { heading: "B", text: "MPS + MPM" },
        { heading: "C", text: "MPS + MRT" }, { heading: "D", text: "MPS + MRT + MPM" }
      ],
      takeaway: "Never insert MPM into a closed economy or MRT into an economy without government.",
      notes: "Ask students to explain one denominator in words. The explanation matters more than memorising four disconnected formulae.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "size-calculation-section", kind: "section", number: "02", eyebrow: "LESSON 1 · SECTION 2",
      title: "Multiplier size and calculation",
      subtitle: "Use marginal data, trace changes in leakages and test the fixed-price result",
      section: "2 · Multiplier size and calculation",
      notes: "Section boundary. Move from the mechanism to calculation and evaluation.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "spare-capacity-pause", kind: "hook", eyebrow: "VISUAL PAUSE",
      title: "How much extra output could this factory produce?",
      section: "2 · Multiplier size and calculation", image: "assets/spare-factory-capacity.png",
      imagePosition: "center center",
      imageAlt: "A factory operates one production line while other machines and workstations remain idle.",
      notes: "Ask students to identify evidence of spare capacity. Separate two questions: marginal leakages determine the numerical multiplier, while spare capacity helps determine how much stronger demand becomes real output rather than a higher price level.",
      sources: sources(COURSEBOOK, CAPACITY)
    },
    {
      id: "large-small-multiplier", kind: "compare", label: "EVALUATION",
      title: "Conditions for a larger multiplier", section: "2 · Multiplier size and calculation",
      items: [
        { heading: "LARGER k", text: "High MPC\nLow MPS\nLow MRT\nLow MPM", detail: "More extra income returns to domestic spending" },
        { heading: "SMALLER k", text: "Low MPC\nHigh MPS\nHigh MRT\nHigh MPM", detail: "Spending leaves the next domestic round faster" }
      ],
      takeaway: "The total marginal leakage is the immediate determinant of k.",
      notes: "Avoid vague statements such as 'more injections make the multiplier larger'. A larger injection raises ΔY for a given k, but it does not itself change the coefficient.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "changes-in-multiplier-size", kind: "steps", label: "CONCEPT",
      title: "Changes in the multiplier coefficient", section: "2 · Multiplier size and calculation",
      items: [
        { heading: "MPS RISES", text: "MPW rises, so k falls." },
        { heading: "MRT FALLS", text: "MPW falls, so k rises." },
        { heading: "MPM RISES", text: "More extra spending buys foreign output, so k falls." },
        { heading: "INJECTION DOUBLES", text: "ΔY doubles if k is unchanged, but k itself does not change." }
      ],
      takeaway: "Distinguish a change in the coefficient from a change in the final income effect.",
      notes: "This distinction is a common exam trap. Ask which item changes the numerator ΔJ and which items change the denominator MPW.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "marginal-data-practice", kind: "table", label: "QUICK CHECK",
      title: "Marginal propensities from data", section: "2 · Multiplier size and calculation",
      intro: "Income rises from £500m to £700m. Find MPC, MPS, MRT, MPM and k.",
      table: [
        ["Flow (£m)", "At Y = £500m", "At Y = £700m", "Change"],
        ["Consumption", "400", "540", "+140"], ["Saving", "50", "70", "+20"],
        ["Tax", "25", "55", "+30"], ["Imports", "25", "35", "+10"]
      ],
      takeaway: "Use the £200m change in income as every denominator.",
      notes: "Students should calculate before revealing the next slide. The marginal flows sum to £200m, which provides a built-in check.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "marginal-data-feedback", kind: "table", label: "FEEDBACK",
      title: "Marginal propensities and multiplier", section: "2 · Multiplier size and calculation",
      table: [
        ["Measure", "Calculation", "Value"],
        ["MPC", "140 ÷ 200", "0.70"], ["MPS", "20 ÷ 200", "0.10"],
        ["MRT", "30 ÷ 200", "0.15"], ["MPM", "10 ÷ 200", "0.05"],
        ["MPW", "0.10 + 0.15 + 0.05", "0.30"], ["k", "1 ÷ 0.30", "3.33 recurring"]
      ],
      takeaway: "Check: MPC + MPW = 0.70 + 0.30 = 1.",
      notes: "Students may write 3.3 or 3.33 depending on the required accuracy. Do not round the coefficient before multiplying in a later calculation.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "calculation-method", kind: "steps", label: "CONCEPT",
      title: "A reliable calculation method", section: "2 · Multiplier size and calculation",
      items: [
        { heading: "1 · IDENTIFY THE MODEL", text: "Decide whether the economy is open and whether it has government." },
        { heading: "2 · FIND MARGINAL VALUES", text: "Use changes, not totals or average propensities." },
        { heading: "3 · CALCULATE k", text: "Add the relevant marginal leakages, then take the reciprocal." },
        { heading: "4 · CALCULATE ΔY", text: "Multiply k by the initial autonomous injection." }
      ],
      takeaway: "Keep full precision until the final answer and state the currency unit for ΔY.",
      notes: "Use the same method for positive and negative shocks. A negative injection produces a negative change in income, while k remains positive.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "reverse-calculation", kind: "worked", label: "WORKED EXAMPLE",
      title: "Reconstructing marginal leakages", section: "2 · Multiplier size and calculation",
      prompt: "Government spending rises by £150m and national income rises by £600m.\nMPS = 0.10 and MPM = 0.05.\nFind k, MPW and MRT.",
      solution: "k = £600m ÷ £150m = 4\nMPW = 1 ÷ 4 = 0.25\nMRT = 0.25 − 0.10 − 0.05 = 0.10",
      takeaway: "Work backwards from k to MPW before finding the missing leakage.",
      notes: "Check that students subtract only the leakages already included in MPW. This task develops flexibility beyond direct substitution.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "past-paper-definition", kind: "mcq", label: "EXAM PRACTICE",
      title: "Multiplier definition", section: "2 · Multiplier size and calculation",
      paper: "9708/32/M/J/25 Q15", legacySourceSlide: 43,
      question: "An initial injection into the circular flow of income causes a much larger increase in GDP. What does this define?",
      options: ["A  autonomous investment", "B  demand-pull inflation", "C  the accelerator principle", "D  the national income multiplier"],
      answer: 3, feedback: "D. The definition describes the national income multiplier.",
      notes: "The question and options are reproduced verbatim. Ask students to identify the initial injection and the larger final GDP change in the wording.",
      sources: ["9708_s25_qp_32.pdf and 9708_s25_ms_32.pdf, Q15 (local past-paper folder)."]
    },
    {
      id: "past-paper-tax-rate", kind: "mcq", label: "EXAM PRACTICE",
      title: "Marginal taxation and multiplier size", section: "2 · Multiplier size and calculation",
      paper: "9708/31/M/J/26 Q16", legacySourceSlide: 44,
      question: "What would increase the value of the multiplier?",
      options: ["A  a decrease in the marginal propensity to consume", "B  a decrease in the marginal rate of tax", "C  an increase in the marginal propensity to import", "D  an increase in the marginal propensity to save"],
      answer: 1, feedback: "B. A lower MRT reduces marginal withdrawals, so the multiplier rises.",
      notes: "The question and options are reproduced verbatim. Require the full chain from MRT to MPW to k.",
      sources: ["9708_s26_qp_31.pdf and 9708_s26_ms_31.pdf, Q16 (local past-paper folder)."]
    },
    {
      id: "past-paper-size-feedback", kind: "answers", label: "FEEDBACK",
      title: "Definition and leakage feedback", section: "2 · Multiplier size and calculation",
      items: [
        { heading: "1 · D", text: "The multiplier compares the final GDP change with the initial injection." },
        { heading: "2 · B", text: "A lower MRT reduces MPW and raises k." },
        { heading: "COMMON ERROR", text: "A larger injection changes ΔY for a given k. It does not automatically change k." }
      ],
      takeaway: "Use the formula to test every verbal claim about multiplier size.",
      notes: "Ask students to eliminate each wrong option in the second question by stating how it changes MPW.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "income-section", kind: "section", number: "03", eyebrow: "LESSON 2 · SECTION 3",
      title: "National income determination",
      subtitle: "Planned expenditure determines equilibrium national income",
      section: "3 · National income determination",
      notes: "This is the start of Lesson 2. Begin by retrieving the multiplier from Lesson 1, then explain that this lesson gives a diagrammatic method for locating the original and new levels of national income.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "production-decision-pause", kind: "hook", eyebrow: "VISUAL PAUSE",
      title: "What would make this firm change production?", section: "3 · National income determination",
      image: "assets/production-inventory-visual-pause.png", imagePosition: "center center",
      imageAlt: "A warehouse supervisor studies uneven stocks of finished goods before deciding the next production run.",
      notes: "Allow silent looking time. Ask students what evidence the supervisor could use before deciding to produce more or less. Draw out sales, orders and stocks. Keep the question open until students identify that firms compare intended purchases with what they have produced.",
      sources: sources(COURSEBOOK, AE_LEGACY, INVENTORY)
    },
    {
      id: "planned-ae-output-gap", kind: "adjustment", label: "CONCEPT",
      title: "Spending, stocks and production", section: "3 · National income determination",
      rows: [
        { condition: "Planned spending exceeds output", signal: "Stocks fall", response: "Firms raise production" },
        { condition: "Planned spending is below output", signal: "Stocks rise", response: "Firms reduce production" }
      ],
      notes: "Answer the warehouse question before introducing formal terminology. Spending relative to output changes stocks, and stocks give firms the signal to change production. Ask what would happen if planned spending exactly equalled output.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "national-income-equilibrium", kind: "statement", label: "CONCEPT",
      title: "National income equilibrium", section: "3 · National income determination",
      statement: "National income equilibrium is the output level where planned spending equals output, so unexpected stock changes do not push firms to change production.",
      notes: "Connect all three terms from the previous slide. If planned spending equals output, stocks do not change unexpectedly and firms have no reason to change production. The national income model applies this condition to firms across the economy.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "planned-expenditure", kind: "statement", label: "CONCEPT",
      title: "Planned aggregate expenditure", section: "3 · National income determination",
      statement: "Planned means intended: planned AE is the amount buyers intend to spend on domestic output.",
      formula: "AE = C + I + G + (X − M)",
      notes: "Now name the spending term used on the previous two slides. Planned means intended purchases, not a forecast made by firms. The first numerical model later simplifies the components to AE = C + I.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "planned-ae-versus-ad", kind: "model-contrast", label: "CONCEPT",
      title: "Planned AE and aggregate demand", section: "3 · National income determination",
      models: [
        {
          name: "AE model", focus: "Spending and output",
          xAxis: "National income / output", yAxis: "Planned expenditure",
          direction: "up",
          alt: "An upward-sloping aggregate expenditure line with national income and output on the horizontal axis and planned expenditure on the vertical axis."
        },
        {
          name: "AD model", focus: "Price level and output",
          xAxis: "Real output", yAxis: "Price level",
          direction: "down",
          alt: "A downward-sloping aggregate demand curve with real output on the horizontal axis and the price level on the vertical axis."
        }
      ],
      takeaway: "AE holds the price level fixed. AD shows demand at different price levels.",
      notes: "Use the diagrams as a visual contrast. Ask students to compare the vertical axes first. The AE model fixes the price level and relates planned spending to output. The AD model varies the price level and shows the amount of real output demanded. Both use C + I + G + (X − M). Do not introduce the 45° line here; the following slides build the AE diagram one element at a time.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-axes", kind: "diagram", diagram: "ae-axes", label: "DIAGRAM",
      title: "Income-expenditure axes", section: "3 · National income determination",
      notes: "Use all three states. Establish that output creates an equal value of income, so Y labels the horizontal axis. The vertical axis measures intended spending at each possible income.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-consumption-function", kind: "diagram", diagram: "ae-consumption-function", label: "DIAGRAM",
      title: "The consumption function", section: "3 · National income determination",
      notes: "Build only the consumption component. In this simplified model autonomous consumption is zero and MPC is 0.75. Students should predict C at Y = £200m before the last state.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-investment-function", kind: "diagram", diagram: "ae-investment-function", label: "DIAGRAM",
      title: "The investment function", section: "3 · National income determination",
      notes: "Explain the simplifying assumption: planned investment is autonomous with respect to current income. Therefore I = £100m at every plotted income and the line is horizontal.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-spending-table", kind: "table", label: "WORKED EXAMPLE",
      title: "Adding consumption and investment", section: "3 · National income determination",
      intro: "Assume C = 0.75Y, fixed I = £100m, no government and no foreign trade.",
      table: [
        ["Income Y (£m)", "Consumption C (£m)", "Investment I (£m)", "Planned AE (£m)"],
        ["0", "0", "100", "100"], ["200", "150", "100", "250"],
        ["400", "300", "100", "400"], ["600", "450", "100", "550"],
        ["800", "600", "100", "700"]
      ],
      takeaway: "At each income, planned AE equals planned consumption plus £100m of investment.",
      notes: "The rows are alternative income levels, not years. Ask students to calculate each C value first, then add the constant investment value. Do not discuss equilibrium until after the AE and equality lines have been built.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-spending-line", kind: "diagram", diagram: "ae-build-from-functions", label: "DIAGRAM",
      title: "AE from consumption and investment", section: "3 · National income determination",
      notes: "Reveal one component at a time. The AE line is the vertical sum of C and I. Constant investment raises the intercept by £100m while the slope remains MPC = 0.75.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-equality-line", kind: "diagram", diagram: "ae-equality-line", label: "DIAGRAM",
      title: "The 45° equality line", section: "3 · National income determination",
      notes: "Use equal numerical changes on both axes to explain the angle. The line shows every possible position where AE = Y. It is not an expenditure function and it is not aggregate supply.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-equilibrium", kind: "diagram", diagram: "ae-equilibrium", label: "DIAGRAM",
      title: "Equilibrium national income", section: "3 · National income determination",
      notes: "Trace E0 to both axes and verify AE = 100 + 0.75(400) = 400. Equilibrium here means no unplanned stock change, not full employment.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-below-equilibrium", kind: "diagram", diagram: "ae-below-equilibrium", label: "DIAGRAM",
      title: "Income below equilibrium", section: "3 · National income determination",
      notes: "At Y = £200m, planned AE is £250m. Unexpected stock depletion gives firms a reason to raise output.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-above-equilibrium", kind: "diagram", diagram: "ae-above-equilibrium", label: "DIAGRAM",
      title: "Income above equilibrium", section: "3 · National income determination",
      notes: "At Y = £600m, planned AE is £550m. Unexpected stock accumulation gives firms a reason to reduce output.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-equilibrium-check", kind: "statement", label: "QUICK CHECK",
      title: "Planned AE below output", section: "3 · National income determination",
      statement: "At Y = £500m, planned AE is £475m. What happens to stocks and production?",
      sampleAnswer: "£25m of output remains unsold, so stocks rise unexpectedly. Firms reduce production, moving national income back towards equilibrium.",
      notes: "Answer: £25m of output remains unsold, so stocks rise unexpectedly. Firms reduce production, moving income back toward equilibrium. The purpose is to check the adjustment rule with one new income level, not to repeat three calculations.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-injection-shift", kind: "diagram", diagram: "ae-injection-shift", label: "DIAGRAM",
      title: "An autonomous investment shift", section: "3 · National income determination",
      notes: "Keep income at £400m while measuring the £50m vertical shift. The shift is ΔI, not the final change in income.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-spending-rounds", kind: "table", label: "WORKED EXAMPLE",
      title: "Income created after the investment rise", section: "3 · National income determination",
      intro: "Investment rises by £50m and MPC remains 0.75.",
      table: [
        ["Round", "Extra income (£m)", "Consumption next round (£m)", "Saving leakage (£m)"],
        ["Initial", "50.00", "37.50", "12.50"], ["2", "37.50", "28.13", "9.38"],
        ["3", "28.13", "21.09", "7.03"], ["4", "21.09", "15.82", "5.27"],
        ["All rounds", "200.00", "150.00", "50.00"]
      ],
      takeaway: "The £50m investment rise induces £150m of extra consumption and £200m of extra income.",
      notes: "Values display to two decimals, while calculations use unrounded values. These are changes, not levels of national income.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-new-equilibrium", kind: "diagram", diagram: "ae-new-equilibrium", label: "DIAGRAM",
      title: "The multiplied income change", section: "3 · National income determination",
      notes: "Connect the diagram to Lesson 1. The £50m autonomous shift creates repeated spending, while movement along the new AE line represents income-induced consumption. Verify AE = 150 + 0.75(600) = 600.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-injections-leakages", kind: "statement", label: "SYNTHESIS",
      title: "Equilibrium and circular-flow balance", section: "3 · National income determination",
      statement: "In this closed model, planned aggregate expenditure equals output only when planned investment equals saving.",
      formula: "AE = Y  ⇔  I = S",
      notes: "Derive the condition orally from Y = C + S and AE = C + I. At the initial equilibrium, I = S = £100m. At the new equilibrium, I = S = £150m. In the full model, equilibrium requires I + G + X = S + T + M.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-draw-and-explain", kind: "tasks", label: "EXAM PRACTICE",
      title: "A fall in autonomous investment", section: "3 · National income determination",
      intro: "Start at Y = £400m. MPC = 0.75 and investment falls from £100m to £50m.",
      items: [
        { heading: "1", text: "Draw and label the original and new AE lines." },
        { heading: "2", text: "Calculate k, ΔY and the new equilibrium income." },
        { heading: "3", text: "Explain the stock signal at the old income." },
        { heading: "4", text: "Distinguish the vertical shift from the horizontal income change." }
      ],
      takeaway: "The multiplier process works for contractions as well as expansions.",
      notes: "Expected values: k = 4, ΔI = −£50m, ΔY = −£200m and new Y = £200m. At old Y, planned AE is £350m, so stocks rise unexpectedly.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-negative-multiplier", kind: "diagram", diagram: "ae-negative-multiplier", label: "MODEL ANSWER",
      title: "The reverse multiplier", section: "3 · National income determination",
      notes: "Reveal after students draw. The coefficient remains positive. The income change is negative because the injection change is negative.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "adas-evaluation-section", kind: "section", number: "04", eyebrow: "LESSON 2 · SECTION 4",
      title: "Aggregate demand and evaluation",
      subtitle: "Each round of induced spending shifts AD by a smaller amount",
      section: "4 · Aggregate demand and evaluation",
      notes: "This remains part of Lesson 2. Return briefly to the familiar AD/AS model. The new teaching focus is the declining size of each induced shift, followed by the effect of an upward-sloping SRAS.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "adas-recall", kind: "diagram", diagram: "adas-recall", label: "RETRIEVAL",
      title: "Aggregate demand and short-run supply", section: "4 · Aggregate demand and evaluation",
      notes: "Ask for both axes and the direction of each curve before revealing the diagram states. The 45-degree line does not belong in this model.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "adas-initial-injection", kind: "diagram", diagram: "adas-initial-injection", label: "DIAGRAM",
      title: "The initial aggregate demand shift", section: "4 · Aggregate demand and evaluation",
      notes: "Show the £50m autonomous rise in investment as AD0 to AD1. This is the largest single shift in the sequence and occurs before induced consumption.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "adas-multiplier-outcome", kind: "diagram", diagram: "adas-multiplier-outcome", label: "DIAGRAM",
      title: "Diminishing aggregate demand shifts", section: "4 · Aggregate demand and evaluation",
      notes: "The gaps between the curves show successive spending rounds: £50m of investment, then £37.5m and about £28.1m of induced consumption. Each curve is the cumulative AD position after that round. Later increments continue to shrink.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "real-output-price-effects", kind: "compare", label: "EVALUATION",
      title: "Spare capacity and real output", section: "4 · Aggregate demand and evaluation",
      items: [
        { heading: "MORE SPARE CAPACITY", text: "Firms can raise real output with less pressure on prices." },
        { heading: "NEAR FULL CAPACITY", text: "More of the rise in demand increases prices rather than real output." }
      ],
      notes: "Do not say spare capacity changes the formulaic value of k. It changes how the rise in nominal demand divides between real output and the price level.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "past-paper-closed-calculation", kind: "mcq", label: "EXAM PRACTICE",
      title: "Closed-economy multiplier calculation", section: "4 · Aggregate demand and evaluation",
      paper: "9708/32/F/M/21 Q24", legacySourceSlide: 46,
      question: "In a closed economy, the marginal propensity to save is 0.1 and the marginal propensity to pay taxes is also 0.1. These values are constant and do not vary with the level of income.\nWhat will be the increase in national income if there is an injection of $100 million into the circular flow?",
      options: ["A  $1000 million", "B  $500 million", "C  $100 million", "D  $80 million"],
      answer: 1,
      feedback: "B. MPW = 0.1 + 0.1 = 0.2, k = 5 and ΔY = $500 million.",
      notes: "The question and options are reproduced verbatim. Closed means no MPM, but the government sector remains because the question includes tax.",
      sources: ["9708_m21_qp_32.pdf and 9708_m21_ms_32.pdf, Q24 (local past-paper folder)."]
    },
    {
      id: "past-paper-tax-revenue", kind: "mcq", label: "EXAM PRACTICE",
      title: "Tax revenue after a demand injection", section: "4 · Aggregate demand and evaluation",
      paper: "9708/31/O/N/22 Q26", legacySourceSlide: 47,
      question: "In an economy, the marginal propensity to consume is 0.2, the marginal propensity to save is 0.3, the marginal propensity to tax is 0.3 and the marginal propensity to import is 0.2 at all levels of income.\nWhat would be the most likely consequence of an increase in government expenditure of $1000m?",
      options: ["A  Import expenditure would increase by $200m.", "B  Import expenditure would increase by $1000m.", "C  Tax revenues would increase by $75m.", "D  Tax revenues would increase by $375m."],
      answer: 3,
      feedback: "D. MPW = 0.8, k = 1.25, ΔY = $1250m and ΔT = 0.3 × $1250m = $375m.",
      notes: "The question and options are reproduced verbatim. Students must calculate the total income change before applying MRT to that change.",
      sources: ["9708_w22_qp_31.pdf and 9708_w22_ms_31.pdf, Q26 (local past-paper folder)."]
    },
    {
      id: "past-paper-calculation-feedback", kind: "statement", label: "FEEDBACK",
      title: "Applying marginal rates", section: "4 · Aggregate demand and evaluation",
      statement: "Calculate the final change in income before applying a marginal tax or import rate.",
      notes: "For the first question, MPW = 0.20, k = 5 and ΔY = $500m. For the second, MPW = 0.80, ΔY = $1,250m and ΔT = $375m. Ask why option A is too small: it applies MPM to the initial $1,000m rather than to the multiplied income change.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "past-paper-trade-leakage", kind: "mcq", label: "EXAM PRACTICE",
      title: "Trade and multiplier size", section: "4 · Aggregate demand and evaluation",
      paper: "9708/31/O/N/23 Q17", legacySourceSlide: 48,
      question: "What might decrease if a closed economy with a government sector decides to allow international trade?",
      options: ["A  components of aggregate expenditure", "B  number of injections into the circular flow of income", "C  number of leakages from the circular flow of income", "D  value of the economy’s multiplier"],
      answer: 3,
      feedback: "D. Imports add a leakage, so the value of the multiplier might decrease.",
      notes: "The question and options are reproduced verbatim. The number of injections and leakages both rises when trade adds exports and imports, so B and C do not decrease.",
      sources: ["9708_w23_qp_31.pdf and 9708_w23_ms_31.pdf, Q17 (local past-paper folder)."]
    },
    {
      id: "ghana-multiplier-question", kind: "paper", label: "EXAM PRACTICE",
      title: "Multiplier effects in Ghana", section: "4 · Aggregate demand and evaluation",
      paper: "9708/41/O/N/24 Q1(b) [4]", legacySourceSlide: 50,
      question: "Explain how the extraction of natural resources in Ghana will ‘create further employment in other sectors through the multiplier effect’. [4]",
      image: "assets/ghana-natural-resource-extraction.png",
      imageAlt: "Concept image of workers, haul trucks and service vehicles at a surface mine in Ghana",
      imagePosition: "center center",
      imageCaption: "Extraction creates income for workers and suppliers",
      takeaway: "Use the context: extraction, Ghanaian income, domestic spending and employment in other sectors.",
      notes: "The question is reproduced verbatim. Give students one minute to study the image before writing. Ask which workers gain income directly and which other sectors might experience higher demand. The generated image represents a Ghanaian mining context and does not show a specific real mine.",
      sources: ["9708_w24_qp_41.pdf and 9708_w24_ms_41.pdf, Q1(b) (local past-paper folder)."]
    },
    {
      id: "ghana-multiplier-answer", kind: "answers", label: "MODEL ANSWER",
      title: "A four-mark multiplier answer", section: "4 · Aggregate demand and evaluation",
      items: [
        {
          heading: "MODEL ANSWER",
          text: "Extracting natural resources creates new jobs and incomes in Ghana, including for mine workers and local suppliers. These workers and firms spend part of their additional income on Ghanaian goods and services. Demand and revenue therefore rise in other sectors, such as retail and transport, so businesses in those sectors employ more workers. Those workers receive income and spend part of it, creating further rounds of employment until savings, taxes and imports reduce the process. This repeated creation of income and spending is the multiplier effect.",
          highlights: [
            "new jobs and incomes in Ghana",
            "spend part of their additional income on Ghanaian goods and services",
            "Demand and revenue therefore rise in other sectors",
            "businesses in those sectors employ more workers",
            "creating further rounds of employment",
            "savings, taxes and imports",
            "multiplier effect"
          ]
        },
        {
          heading: "WHY IT EARNS 4 MARKS",
          text: "1. Extraction creates employment and income in Ghana.\n2. Workers and firms spend part of the new income domestically.\n3. Higher demand causes firms in other sectors to employ more workers.\n4. New income produces repeated rounds of spending until leakages reduce the effect."
        }
      ],
      takeaway: "The model answer applies every stage of the multiplier chain to Ghana.",
      notes: "Read the answer as one connected causal chain. The right-hand column makes the four rewarded links explicit. Evaluation and a multiplier calculation are not required.",
      sources: ["9708_w24_ms_41.pdf, Q1(b) indicative content (local past-paper folder)."]
    },
    {
      id: "final-assessment", kind: "assessment", label: "EXAM PRACTICE",
      title: "Multiplier analysis", section: "Assessment · 9.1.1",
      prompt: "An open economy with government has MPS = 0.10, MPM = 0.20 and MRT = 0.20. Exports rise by £120m.",
      items: [
        { text: "a  Calculate MPW and the multiplier. [2]" },
        { text: "b  Calculate the final change in national income. [2]" },
        { text: "c  Explain the multiplier process that produces this result. [4]" },
        { text: "d  Explain one reason why real GDP may rise by less than your answer to b. [2]" }
      ],
      notes: "Answers: MPW = 0.50, k = 2 and ΔY = £240m. The explanation should distinguish the initial export injection from induced spending and leakages. A valid qualification uses limited spare capacity and a rising price level.",
      sources: sources(COURSEBOOK, LEGACY)
    },
    {
      id: "lesson-conclusion", kind: "statement", label: "SUMMARY",
      title: "The multiplier process", section: "Assessment · 9.1.1",
      statement: "An autonomous injection shifts planned AE. The resulting spending rounds move national income to a new equilibrium.",
      notes: "Exit ticket: calculate k when MPW = 0.40, then state one reason the fixed-price rise in income may not become the same rise in real GDP. Preview 9.1.2.",
      sources: sources(SYLLABUS, PLANNER, COURSEBOOK)
    }
  ];

  slides.forEach((slide, index) => { slide.sourceSlide = index + 1; });
  window.ALEVEL_LESSON = {
    meta: {
      title: "The multiplier", course: "Cambridge A Level Economics", syllabus: "9708 · 9.1.1",
      coreEnd: "lesson-conclusion", plannedLessons: 2, lessonBreak: "income-section",
      sourcePptx: "outputs/multiplier-lessons-1-2-20260904/A-Level_Multiplier_Lessons_1-2.pptx",
      sourceSha256: "bcc403ce0cefdd608b5cc5c314ed67257b5a24068efba7e5d1670f2f8220f1cc"
    },
    slides
  };
}());
