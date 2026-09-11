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
      id: "income-section", kind: "section", number: "01", eyebrow: "9.1.1 · PART 2",
      title: "National income determination and the multiplier",
      subtitle: "Planned expenditure determines equilibrium national income",
      section: "1 · National income determination",
      notes: "This is the start of Lesson 2. Begin by retrieving the multiplier from Lesson 1, then explain that this lesson gives a diagrammatic method for locating the original and new levels of national income.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "production-decision-pause", kind: "hook", eyebrow: "VISUAL PAUSE",
      title: "What would make this firm change production?", section: "1 · National income determination",
      image: "assets/production-inventory-visual-pause.png", imagePosition: "center center",
      imageAlt: "A warehouse supervisor studies uneven stocks of finished goods before deciding the next production run.",
      notes: "Allow silent looking time. Ask students what evidence the supervisor could use before deciding to produce more or less. Draw out sales, orders and stocks. Keep the question open until students identify that firms compare intended purchases with what they have produced.",
      sources: sources(COURSEBOOK, AE_LEGACY, INVENTORY)
    },
    {
      id: "planned-ae-output-gap", kind: "adjustment", label: "CONCEPT",
      title: "Spending, stocks and production", section: "1 · National income determination",
      rows: [
        { condition: "Planned spending exceeds output", signal: "Stocks fall", response: "Firms raise production" },
        { condition: "Planned spending is below output", signal: "Stocks rise", response: "Firms reduce production" }
      ],
      notes: "Answer the warehouse question before introducing formal terminology. Spending relative to output changes stocks, and stocks give firms the signal to change production. Ask what would happen if planned spending exactly equalled output.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "national-income-equilibrium", kind: "statement", label: "CONCEPT",
      title: "National income equilibrium", section: "1 · National income determination",
      statement: "National income equilibrium is the output level where planned spending equals output, so unexpected stock changes do not push firms to change production.",
      notes: "Connect all three terms from the previous slide. If planned spending equals output, stocks do not change unexpectedly and firms have no reason to change production. The national income model applies this condition to firms across the economy.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "planned-expenditure", kind: "statement", label: "CONCEPT",
      title: "Planned aggregate expenditure", section: "1 · National income determination",
      statement: "Planned means intended: planned AE is the amount buyers intend to spend on domestic output.",
      formula: "AE = C + I + G + (X − M)",
      notes: "Now name the spending term used on the previous two slides. Planned means intended purchases, not a forecast made by firms. The first numerical model later simplifies the components to AE = C + I.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "planned-ae-versus-ad", kind: "model-contrast", label: "CONCEPT",
      title: "Planned AE and aggregate demand", section: "1 · National income determination",
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
      title: "Income-expenditure axes", section: "1 · National income determination",
      notes: "Use all three states. Establish that output creates an equal value of income, so Y labels the horizontal axis. The vertical axis measures intended spending at each possible income.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-consumption-function", kind: "diagram", diagram: "ae-consumption-function", label: "DIAGRAM",
      title: "The consumption function", section: "1 · National income determination",
      notes: "Build only the consumption component. In this simplified model autonomous consumption is zero and MPC is 0.75. Students should predict C at Y = £200m before the last state.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-investment-function", kind: "diagram", diagram: "ae-investment-function", label: "DIAGRAM",
      title: "The investment function", section: "1 · National income determination",
      notes: "Explain the simplifying assumption: planned investment is autonomous with respect to current income. Therefore I = £100m at every plotted income and the line is horizontal.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-spending-table", kind: "table", label: "WORKED EXAMPLE",
      title: "Adding consumption and investment", section: "1 · National income determination",
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
      title: "AE from consumption and investment", section: "1 · National income determination",
      notes: "Reveal one component at a time. The AE line is the vertical sum of C and I. Constant investment raises the intercept by £100m while the slope remains MPC = 0.75.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-equality-line", kind: "diagram", diagram: "ae-equality-line", label: "DIAGRAM",
      title: "The 45° equality line", section: "1 · National income determination",
      notes: "Use equal numerical changes on both axes to explain the angle. The line shows every possible position where AE = Y. It is not an expenditure function and it is not aggregate supply.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-equilibrium", kind: "diagram", diagram: "ae-equilibrium", label: "DIAGRAM",
      title: "Equilibrium national income", section: "1 · National income determination",
      notes: "Trace E0 to both axes and verify AE = 100 + 0.75(400) = 400. Equilibrium here means no unplanned stock change, not full employment.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-below-equilibrium", kind: "diagram", diagram: "ae-below-equilibrium", label: "DIAGRAM",
      title: "Income below equilibrium", section: "1 · National income determination",
      notes: "At Y = £200m, planned AE is £250m. Unexpected stock depletion gives firms a reason to raise output.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-above-equilibrium", kind: "diagram", diagram: "ae-above-equilibrium", label: "DIAGRAM",
      title: "Income above equilibrium", section: "1 · National income determination",
      notes: "At Y = £600m, planned AE is £550m. Unexpected stock accumulation gives firms a reason to reduce output.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-equilibrium-check", kind: "statement", label: "QUICK CHECK",
      title: "Planned AE below output", section: "1 · National income determination",
      statement: "At Y = £500m, planned AE is £475m. What happens to stocks and production?",
      sampleAnswer: "£25m of output remains unsold, so stocks rise unexpectedly. Firms reduce production, moving national income back towards equilibrium.",
      notes: "Answer: £25m of output remains unsold, so stocks rise unexpectedly. Firms reduce production, moving income back toward equilibrium. The purpose is to check the adjustment rule with one new income level, not to repeat three calculations.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-injection-shift", kind: "diagram", diagram: "ae-injection-shift", label: "DIAGRAM",
      title: "An autonomous investment shift", section: "1 · National income determination",
      notes: "Keep income at £400m while measuring the £50m vertical shift. The shift is ΔI, not the final change in income.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-spending-rounds", kind: "table", label: "WORKED EXAMPLE",
      title: "Income created after the investment rise", section: "1 · National income determination",
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
      title: "The multiplied income change", section: "1 · National income determination",
      notes: "Connect the diagram to Lesson 1. The £50m autonomous shift creates repeated spending, while movement along the new AE line represents income-induced consumption. Verify AE = 150 + 0.75(600) = 600.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-injections-leakages", kind: "steps", label: "SYNTHESIS",
      title: "Equilibrium, saving and planned investment", section: "1 · National income determination",
      intro: "Closed economy without government · I is planned investment",
      items: [
        { heading: "Income and spending", text: "$Y = C + S$\n$AE = C + I$" },
        { heading: "At equilibrium", text: "$Y = AE$" },
        { heading: "Substitute", text: "$C + S = C + I$" },
        { heading: "Subtract C", text: "$S = I$", detail: "Planned saving equals planned investment" }
      ],
      notes: "Reveal one algebraic step per click. Income is consumed or saved, and planned expenditure is consumption plus planned investment. Substitute these expressions into Y = AE and subtract C from both sides. Stress that both no foreign trade and no government are assumptions. I means planned investment: actual investment including unplanned inventory changes equals saving as an accounting identity even away from equilibrium. At the initial equilibrium, I = S = £100m; at the new equilibrium, I = S = £150m. In the full model, equilibrium requires I + G + X = S + T + M.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "ae-draw-and-explain", kind: "tasks", label: "EXAM PRACTICE",
      title: "A fall in autonomous investment", section: "1 · National income determination",
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
      title: "The reverse multiplier", section: "1 · National income determination",
      notes: "Reveal after students draw. The coefficient remains positive. The income change is negative because the injection change is negative.",
      sources: sources(COURSEBOOK, AE_LEGACY)
    },
    {
      id: "adas-evaluation-section", kind: "section", number: "02", eyebrow: "SECTION 2",
      title: "Aggregate demand and evaluation",
      subtitle: "Each round of induced spending shifts AD by a smaller amount",
      section: "2 · Aggregate demand and evaluation",
      notes: "This remains part of Lesson 2. Return briefly to the familiar AD/AS model. The new teaching focus is the declining size of each induced shift, followed by the effect of an upward-sloping SRAS.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "adas-recall", kind: "diagram", diagram: "adas-recall", label: "RETRIEVAL",
      title: "Aggregate demand and short-run supply", section: "2 · Aggregate demand and evaluation",
      notes: "Ask for both axes and the direction of each curve before revealing the diagram states. The 45-degree line does not belong in this model.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "adas-initial-injection", kind: "diagram", diagram: "adas-initial-injection", label: "DIAGRAM",
      title: "The initial aggregate demand shift", section: "2 · Aggregate demand and evaluation",
      notes: "Show the £50m autonomous rise in investment as AD0 to AD1. This is the largest single shift in the sequence and occurs before induced consumption.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "adas-multiplier-outcome", kind: "diagram", diagram: "adas-multiplier-outcome", label: "DIAGRAM",
      title: "Diminishing aggregate demand shifts", section: "2 · Aggregate demand and evaluation",
      notes: "The gaps between the curves show successive spending rounds: £50m of investment, then £37.5m and about £28.1m of induced consumption. Each curve is the cumulative AD position after that round. Later increments continue to shrink.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "real-output-price-effects", kind: "compare", label: "EVALUATION",
      title: "Spare capacity and real output", section: "2 · Aggregate demand and evaluation",
      items: [
        { heading: "MORE SPARE CAPACITY", text: "Firms can raise real output with less pressure on prices." },
        { heading: "NEAR FULL CAPACITY", text: "More of the rise in demand increases prices rather than real output." }
      ],
      notes: "Do not say spare capacity changes the formulaic value of k. It changes how the rise in nominal demand divides between real output and the price level.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "past-paper-closed-calculation", kind: "mcq", label: "EXAM PRACTICE",
      title: "Closed-economy multiplier calculation", section: "2 · Aggregate demand and evaluation",
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
      title: "Tax revenue after a demand injection", section: "2 · Aggregate demand and evaluation",
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
      title: "Applying marginal rates", section: "2 · Aggregate demand and evaluation",
      statement: "Calculate the final change in income before applying a marginal tax or import rate.",
      notes: "For the first question, MPW = 0.20, k = 5 and ΔY = $500m. For the second, MPW = 0.80, ΔY = $1,250m and ΔT = $375m. Ask why option A is too small: it applies MPM to the initial $1,000m rather than to the multiplied income change.",
      sources: sources(COURSEBOOK)
    },
    {
      id: "past-paper-trade-leakage", kind: "mcq", label: "EXAM PRACTICE",
      title: "Trade and multiplier size", section: "2 · Aggregate demand and evaluation",
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
      title: "Multiplier effects in Ghana", section: "2 · Aggregate demand and evaluation",
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
      title: "A four-mark multiplier answer", section: "2 · Aggregate demand and evaluation",
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

  slides.forEach((slide, index) => { slide.sourceSlide = index + 32; });
  window.ALEVEL_LESSON = {
    meta: {
      title: "National income determination and the multiplier", course: "Cambridge A Level Economics", syllabus: "9708 · 9.1.1",
      coreEnd: "lesson-conclusion", plannedLessons: 1, sourceSlideCount: 66,
      sourcePptx: "outputs/multiplier-lessons-1-2-20260904/A-Level_Multiplier_Lessons_1-2.pptx",
      sourceSha256: "bcc403ce0cefdd608b5cc5c314ed67257b5a24068efba7e5d1670f2f8220f1cc"
    },
    slides
  };
}());
