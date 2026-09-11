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
      id: "multiplier", kind: "hero", code: "9.1.1", title: "The multiplier process",
      subtitle: "Process, formulae and calculation",
      eyebrow: "CAMBRIDGE A LEVEL ECONOMICS · 9708", syllabus: "9.1.1 · Part 1",
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
        { text: "Calculate the change in national income caused by an autonomous injection." }
      ],
      notes: "Use these objectives for the multiplier lesson. National income determination is taught in the separate next lesson.",
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
      formula: "k = \\frac{ΔY}{ΔJ}", math: true,
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
        { heading: "AVERAGE", text: "A total flow divided by total income.\n$APC = \\frac{C}{Y}$\n$APS = \\frac{S}{Y}$", detail: "Describes the existing level" },
        { heading: "MARGINAL", text: "A change in a flow divided by the change in income.\n$MPC = \\frac{ΔC}{ΔY}$\n$MPS = \\frac{ΔS}{ΔY}$", detail: "Determines the next spending round" }
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
        ["Consumption", "$APC = \\frac{C}{Y}$", "$MPC = \\frac{ΔC}{ΔY}$", "Continues domestic spending"],
        ["Saving", "$APS = \\frac{S}{Y}$", "$MPS = \\frac{ΔS}{ΔY}$", "Leakage"],
        ["Imports", "$APM = \\frac{M}{Y}$", "$MPM = \\frac{ΔM}{ΔY}$", "Leakage"],
        ["Tax", "$ART = \\frac{T}{Y}$", "$MRT = \\frac{ΔT}{ΔY}$", "Leakage"]
      ],
      takeaway: "The marginal measures show how one extra unit of income is divided.",
      notes: "ART means average rate of tax. Ask which measures enter the denominator of the open-economy multiplier and why average values do not.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "propensity-identities", kind: "steps", label: "CONCEPT",
      title: "Marginal propensity identities", section: "1 · The multiplier process",
      items: [
        { heading: "CLOSED, NO GOVERNMENT", text: "$MPC + MPS = 1$" },
        { heading: "MARGINAL WITHDRAWALS", text: "$MPW = MPS + MRT + MPM$" },
        { heading: "FULL MODEL", text: "$MPC + MPW = 1$" },
        { heading: "MULTIPLIER", text: "$k = \\frac{1}{MPW} = \\frac{1}{1 − MPC}$" }
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
        ["Closed, no government", "MPS", "$k = \\frac{1}{MPS}$"],
        ["Closed, with government", "MPS + MRT", "$k = \\frac{1}{MPS + MRT}$"],
        ["Open, no government", "MPS + MPM", "$k = \\frac{1}{MPS + MPM}$"],
        ["Open, with government", "MPS + MRT + MPM", "$k = \\frac{1}{MPS + MRT + MPM}$"]
      ],
      takeaway: "Build the denominator from the leakage sectors named in the question.",
      notes: "Make students name the economy before choosing a formula. Closed removes imports. No government removes taxation from the marginal withdrawals.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "closed-economy-worked", kind: "worked", label: "WORKED EXAMPLE",
      title: "Closed economy without government", section: "1 · The multiplier process",
      prompt: "MPC = 0.75.\nInvestment rises by £75m.\nFind MPS, k and the final change in national income.",
      solution: "$MPS = 1 − MPC$\n$MPS = 1 − 0.75 = 0.25$\n$k = \\frac{1}{MPS} = \\frac{1}{0.25} = 4$\n$ΔY = k × ΔI$\n$ΔY = 4 × £75m = £300m$",
      takeaway: "The initial £75m is included within the final £300m income change.",
      notes: "Students often add the injection again and report £375m. Use k = ΔY ÷ ΔJ to show why that double counts the initial spending.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "open-government-worked", kind: "worked", label: "WORKED EXAMPLE",
      title: "Open economy with government", section: "1 · The multiplier process",
      prompt: "$MPS = 0.10$, $MRT = 0.20$ and $MPM = 0.20$.\nGovernment spending rises by £120m.\nFind MPW, k and ΔY.",
      solution: "$MPW = MPS + MRT + MPM$\n$MPW = 0.10 + 0.20 + 0.20 = 0.50$\n$k = \\frac{1}{MPW} = \\frac{1}{0.50} = 2$\n$ΔY = k × ΔG$\n$ΔY = 2 × £120m = £240m$",
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
      solution: "$k = \\frac{ΔY}{ΔG} = \\frac{£600m}{£150m} = 4$\n$MPW = \\frac{1}{k} = \\frac{1}{4} = 0.25$\n$MRT = MPW − MPS − MPM$\n$MRT = 0.25 − 0.10 − 0.05 = 0.10$",
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
    }
  ];

  slides.forEach((slide, index) => { slide.sourceSlide = index + 1; });
  window.ALEVEL_LESSON = {
    meta: {
      title: "The multiplier process", course: "Cambridge A Level Economics", syllabus: "9708 · 9.1.1",
      coreEnd: "past-paper-size-feedback", plannedLessons: 1, sourceSlideCount: 66,
      sourcePptx: "outputs/multiplier-lessons-1-2-20260904/A-Level_Multiplier_Lessons_1-2.pptx",
      sourceSha256: "bcc403ce0cefdd608b5cc5c314ed67257b5a24068efba7e5d1670f2f8220f1cc"
    },
    slides
  };
}());
