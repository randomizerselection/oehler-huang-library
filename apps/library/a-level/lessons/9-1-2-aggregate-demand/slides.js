// Canonical HTML lesson content. Edit by stable slide id; no build step.
(function () {
  const SYLLABUS = "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).";
  const PLANNER = "Syllabus planner.xlsx, sheet '9 Macroeconomy', row 4: section 9.1.2 allocated 1.5 lessons (local workbook).";
  const COURSEBOOK = "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook).";
  const LEGACY = "9.1.4 Changes in AD.pptx and 9.1.5 Changes in AD (2).pptx in previous-lesson-materials (local teaching references).";
  const MULTIPLIER = "A-Level_Multiplier_Lessons_1-2.html (previous taught HTML lesson; local maintained deck).";
  const HERO = "Hero visual generated for this lesson with OpenAI image generation on 7 September 2026; no external reference image used.";
  const AUTONOMOUS_PHOTO = "Autonomous-consumption visual generated with OpenAI image generation on 7 September 2026; a deliberately staged teaching scenario with no external reference image.";
  const HOUSEHOLD_PHOTO = "Household borrowing-costs photograph: Pexels / Mikhail Nilov, https://www.pexels.com/photo/couple-calculating-all-their-bills-6964107/ (copied from the local investment-course photo archive).";
  const FACTORY_PHOTO = "Factory-capacity photograph: Wikimedia Commons / Anonyme / CC BY-SA 3.0, https://commons.wikimedia.org/wiki/File:Hyundai_car_assembly_line.jpg (copied from the local investment-course photo archive).";
  const ROAD_PHOTO = "Road-construction photograph inherited from the user's manual multiplier deck and reused here to connect government spending with the previously taught multiplier process.";
  const PORT_PHOTO = "Container-port photograph: Pexels / Wolfgang Weiser, https://www.pexels.com/photo/maersk-line-ships-24896065/ (copied from the local investment-course photo archive).";
  const sources = (...extra) => [SYLLABUS, ...extra];

  window.ALEVEL_LESSON = {
    meta: {
      title: "Consumption and saving functions",
      course: "Cambridge A Level Economics",
      syllabus: "9708 · 9.1.2",
      coreEnd: "saving-mcq",
      plannedLessons: 1
    },
    slides: [
      {
        id: "aggregate-demand-components",
        kind: "hero",
        code: "9.1.2 · Part 1",
        title: "Consumption and saving functions",
        subtitle: "Components of aggregate demand and their determinants",
        eyebrow: "CAMBRIDGE A LEVEL ECONOMICS · 9708",
        syllabus: "Next in sequence after the multiplier",
        section: "Opening · Components of AD",
        image: "assets/aggregate-demand-hero.png",
        imageAlt: "A city economy linking households, a factory, public transport construction and a container port.",
        notes: "Open by asking students to identify four types of spending in the image. Link the factory and construction to the previous lesson: an autonomous change in any component can begin a multiplier process.",
        sources: sources(PLANNER, COURSEBOOK, MULTIPLIER, HERO)
      },
      {
        id: "four-shocks",
        kind: "steps",
        label: "STARTER",
        title: "Four demand shocks",
        section: "Opening · Components of AD",
        intro: "For each shock, predict the first component of AD to change and its direction.",
        items: [
          { heading: "HOUSE PRICES RISE", text: "Household wealth increases." },
          { heading: "FIRMS TURN OPTIMISTIC", text: "Expected future sales improve." },
          { heading: "A NEW METRO IS APPROVED", text: "The government funds construction." },
          { heading: "OVERSEAS GROWTH SLOWS", text: "Foreign customers cut spending." }
        ],
        notes: "Reveal one at a time. Expected first effects: C rises; I rises; G rises; exports fall so net exports fall. Do not discuss the multiplier until students have classified each initial change.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "learning-outcomes",
        kind: "objectives",
        label: "LESSON OVERVIEW",
        title: "Learning objectives",
        section: "Opening · Components of AD",
        items: [
          { text: "Distinguish autonomous expenditure from spending induced by income." },
          { text: "Use and interpret consumption and saving functions." },
          { text: "Explain how income and other determinants affect consumption." }
        ],
        notes: "Use this as the learning contract for consumption and saving. Finish with the consumption and saving calculation. Investment and the remaining AD components continue in the next lesson.",
        sources: sources(PLANNER, COURSEBOOK)
      },
      {
        id: "multiplier-retrieval",
        kind: "chain",
        label: "RETRIEVAL",
        title: "The multiplier mechanism",
        section: "Opening · Components of AD",
        items: [
          { heading: "AUTONOMOUS INJECTION RISES", text: "Planned spending increases independently of current income.", link: "raises output and income" },
          { heading: "INCOME RISES", text: "Firms produce more and households receive the extra payments.", link: "induces consumption" },
          { heading: "INDUCED SPENDING RISES", text: "Households spend part of the additional income.", link: "starts another round" },
          { heading: "LATER ROUNDS BECOME SMALLER", text: "Saving, tax and imports leak income from the circular flow." }
        ],
        notes: "Cold-call the distinction between the initial autonomous injection and later induced spending. Misconception to address: later consumption does not create a fresh parallel shift of the consumption function.",
        sources: sources(MULTIPLIER, COURSEBOOK)
      },
      {
        id: "aggregate-demand-definition",
        kind: "definition",
        label: "KEY DEFINITION",
        title: "Aggregate demand",
        termZh: "总需求",
        section: "Opening · Components of AD",
        definition: "Aggregate demand is the total planned expenditure on domestically produced goods and services at a given price level in a given time period.",
        definitionZh: "总需求是在一定时期内、在给定价格水平下，对本国生产的商品与服务的计划总支出。",
        notes: "Read the definition once, then ask students to identify the three limiting phrases: planned expenditure, domestically produced, and given price level in a time period.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "ad-identity",
        kind: "formula",
        label: "CONCEPT",
        title: "The components of aggregate demand",
        section: "Opening · Components of AD",
        formula: "AD = C + I + G + (X − M)",
        math: true,
        definition: "$C$  household consumption\n$I$   investment in capital goods\n$G$  government spending\n$X − M$  net exports",
        heading: "READ THE SIGNS",
        text: "• Exports add demand for domestic output.\n• Imports are spending on foreign output.\n• Net exports may be positive or negative.\n• An initial change can be multiplied.",
        notes: "Ask why imports are subtracted. They are included within C, I or G but are not demand for domestically produced output.",
        sources: sources(COURSEBOOK, LEGACY)
      },
      {
        id: "classify-shocks",
        kind: "tasks",
        label: "STARTER",
        title: "Demand shocks by component",
        section: "Opening · Components of AD",
        items: [
          { heading: "A", text: "Banks reduce mortgage rates." },
          { heading: "B", text: "A tax allowance lowers the cost of new machinery." },
          { heading: "C", text: "A government delays a hospital-building programme." },
          { heading: "D", text: "A trading partner enters a recession." }
        ],
        notes: "Try first. Expected: A mainly C rises (and possibly I); B I rises; C G falls; D X falls, so net exports fall. Accept secondary channels only after the first effect is clear.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "classify-shocks-answers",
        kind: "answers",
        label: "FEEDBACK",
        title: "First-round effects on aggregate demand",
        section: "Opening · Components of AD",
        items: [
          { heading: "A · C ↑", text: "Cheaper borrowing encourages interest-sensitive household purchases." },
          { heading: "B · I ↑", text: "A higher expected return makes more capital projects worthwhile." },
          { heading: "C · G ↓", text: "Delayed public procurement directly reduces government demand." },
          { heading: "D · X − M ↓", text: "Lower foreign income reduces demand for exports." }
        ],
        notes: "Emphasise ceteris paribus. A mortgage-rate cut can also influence house prices and confidence; the task asks for the most direct component.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "consumption-saving-section",
        kind: "section",
        number: "01",
        eyebrow: "SECTION 1",
        title: "Consumption and saving",
        subtitle: "Separate the spending that exists before income from the spending caused by income",
        section: "1 · Consumption and saving",
        notes: "Section boundary. Begin with the language autonomous and induced before introducing the equation.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "autonomous-consumption-intuition",
        kind: "hook",
        eyebrow: "VISUAL PAUSE",
        title: "Why does consumption\ncontinue at zero income?",
        section: "1 · Consumption and saving",
        image: "assets/autonomous-consumption-zero-income.png",
        imagePosition: "center center",
        imageAlt: "A man at a kitchen table opens a savings jar beside essential groceries, medicine, a wallet, keys and a credit card.",
        notes: "Give students silent looking time. Ask them to identify the spending that cannot stop immediately and the ways it can be financed. Elicit essentials, contractual payments, past saving and borrowing before naming autonomous consumption.",
        sources: sources(COURSEBOOK, AUTONOMOUS_PHOTO)
      },
      {
        id: "autonomous-induced-consumption",
        kind: "compare",
        label: "CONCEPT",
        title: "Autonomous and induced consumption",
        section: "1 · Consumption and saving",
        items: [
          {
            heading: "AUTONOMOUS CONSUMPTION",
            headingZh: "自主消费",
            text: "Household spending that does not depend on current disposable income.\nAt zero income, households borrow or use past saving.",
            textZh: "不取决于当前可支配收入的家庭支出。",
            detail: "The intercept: $a$"
          },
          {
            heading: "INDUCED CONSUMPTION",
            headingZh: "引致消费",
            text: "Household spending that changes in response to a change in current disposable income.\nA higher income causes a movement along the function.",
            textZh: "因当前可支配收入变动而发生变化的家庭支出。",
            detail: "The income-dependent part: $bY_d$"
          }
        ],
        notes: "Ask for a real-life example of consumption at zero current income. Clarify that autonomous does not mean uncaused; it means independent of current income in the model.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "consumption-function",
        kind: "formula",
        label: "CONCEPT",
        title: "The consumption function",
        section: "1 · Consumption and saving",
        formula: "C = a + bY_d",
        math: true,
        definition: "$a$  autonomous consumption\n$b$  marginal propensity to consume\n$Y_d$  disposable income\n$bY_d$  induced consumption",
        heading: "EXAMPLE",
        text: "$C = £100m + 0.8Y_d$\n\nAt $Y_d = £1,000m$:\n$C = 100 + 0.8(1,000)$\n$C = £900m$\n\n$b = 0.8$ means each extra £1 of disposable income adds 80p to consumption.",
        notes: "Keep disposable income visible in the notation. The coursebook uses $Y$ for disposable income in this function; $Y_d$ makes the income base explicit for students.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "function-table",
        kind: "table",
        label: "WORKED EXAMPLE",
        title: "Consumption and saving schedule",
        section: "1 · Consumption and saving",
        intro: "Use $C = £100m + 0.8Y_d$ and $S = Y_d − C$.",
        table: [
          ["Disposable income $Y_d$ (£m)", "Autonomous $C$", "Induced $C$", "Total $C$ (£m)", "Saving $S$ (£m)"],
          ["0", "100", "0", "100", "−100"],
          ["500", "100", "400", "500", "0"],
          ["1,000", "100", "800", "900", "100"],
          ["1,500", "100", "1,200", "1,300", "200"]
        ],
        notes: "Reveal the saving column orally after students calculate it. Ask why saving is negative at zero income and why the autonomous-consumption column never changes.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "consumption-function-graph",
        kind: "diagram",
        diagram: "consumption-function-graph",
        label: "DIAGRAM",
        title: "Intercept, slope and break-even income",
        section: "1 · Consumption and saving",
        notes: "Use all four diagram states. Insist that a change in $Y_d$ is read as a movement along the function. The 45-degree line is equality between $C$ and $Y_d$, not the AE equality line from the previous lesson, although the geometric idea is similar.",
        sources: sources(COURSEBOOK, LEGACY)
      },
      {
        id: "movement-versus-shift",
        kind: "compare",
        label: "CONCEPT",
        title: "Changes in the consumption function",
        section: "1 · Consumption and saving",
        items: [
          {
            heading: "MOVEMENT ALONG C",
            text: "Disposable income changes.\nInduced consumption changes by $MPC × ΔY_d$.",
            detail: "Same $a$ and same $MPC$"
          },
          {
            heading: "SHIFT OF C",
            text: "Wealth, interest rates, credit conditions or expectations change autonomous consumption.",
            detail: "Different consumption at each $Y_d$"
          }
        ],
        notes: "Test the language with two prompts: a tax cut raises $Y_d$ (movement) versus rising house prices raise wealth (shift). A change in $MPC$ changes the slope rather than making a parallel shift.",
        sources: sources(COURSEBOOK, LEGACY)
      },
      {
        id: "consumption-determinants",
        kind: "table",
        label: "CONCEPT",
        title: "Shifts in autonomous consumption",
        section: "1 · Consumption and saving",
        table: [
          ["Determinant", "Change", "Transmission to autonomous consumption"],
          ["Wealth", "Asset values rise", "Households can sell assets or borrow against them, so $C$ rises"],
          ["Interest and credit", "Rates rise or credit tightens", "Borrowing costs rise and saving becomes more attractive, so $C$ falls"],
          ["Expectations", "Confidence in future income rises", "Households bring spending forward, so $C$ rises"],
          ["Income distribution", "Income shifts toward high-income households", "Their lower $APC$ may reduce total $C$"]
        ],
        notes: "Ask students to convert each item into a causal chain. For interest rates, accept ambiguity for savers, but the standard aggregate effect of a rise is lower consumption.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "household-borrowing-costs",
        kind: "scenario",
        label: "PHOTO CASE",
        title: "Household borrowing costs",
        section: "1 · Consumption and saving",
        image: "assets/household-borrowing-costs.jpg",
        imagePosition: "center 48%",
        imageAlt: "A couple studies household bills with a calculator and laptop at a kitchen table.",
        heading: "Interest rates fall while income is unchanged",
        text: "The household can refinance debt and borrow more cheaply. Current disposable income has not changed.\nWhich part of consumption changes first? Does this create a movement or a shift?",
        notes: "Students should identify a rise in autonomous consumption and an upward shift of the consumption function. Press them to explain why this is not a movement along the function: current disposable income is unchanged.",
        sources: sources(COURSEBOOK, HOUSEHOLD_PHOTO)
      },
      {
        id: "consumption-mcq",
        kind: "mcq",
        label: "QUICK CHECK",
        title: "Movement along or shift of the consumption function",
        section: "1 · Consumption and saving",
        question: "Which change is most likely to shift the consumption function upward at every level of disposable income?",
        options: [
          "A  A rise in current disposable income",
          "B  A rise in household wealth",
          "C  A fall in the marginal propensity to consume",
          "D  A rise in household saving caused by pessimism"
        ],
        answer: 1,
        feedback: "Higher wealth raises autonomous consumption. Higher disposable income causes a movement along the function; a lower MPC flattens it; pessimism shifts it downward.",
        notes: "Let students commit before selecting. Follow up: what would a change in MPC do to the line?",
        sources: sources(COURSEBOOK)
      },
      {
        id: "saving-function",
        kind: "formula",
        label: "CONCEPT",
        title: "The saving function",
        section: "1 · Consumption and saving",
        formula: "S = −a + sY_d",
        math: true,
        definition: "$−a$  autonomous dissaving\n$s$  marginal propensity to save\n$sY_d$  induced saving\n$S = Y_d − C$",
        heading: "FROM THE SAME EXAMPLE",
        text: "$C = 100 + 0.8Y_d$\nso $S = −100 + 0.2Y_d$\n\nAt $Y_d = 1,000$:\n$S = −100 + 200 = £100m$",
        notes: "Distinguish saving, a leakage, from investment, an injection. The negative intercept represents drawing down saving or borrowing at zero current income.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "propensity-identities",
        kind: "compare",
        label: "CONCEPT",
        title: "Consumption and saving identities",
        section: "1 · Consumption and saving",
        items: [
          {
            heading: "AVERAGE",
            text: "$APC = C ÷ Y_d$\n$APS = S ÷ Y_d$",
            detail: "$APC + APS = 1$"
          },
          {
            heading: "MARGINAL",
            text: "$MPC = ΔC ÷ ΔY_d$\n$MPS = ΔS ÷ ΔY_d$",
            detail: "$MPC + MPS = 1$"
          }
        ],
        notes: "This is retrieval from the multiplier unit, now linked to the consumption and saving functions. Ask why APC can exceed 1 at low income: APS is then negative.",
        sources: sources(COURSEBOOK, MULTIPLIER)
      },
      {
        id: "marginal-propensities-worked",
        kind: "worked",
        label: "WORKED EXAMPLE",
        title: "Calculating MPC and MPS",
        section: "1 · Consumption and saving",
        prompt: "Disposable income rises from £1,200m to £1,500m.\nConsumption rises from £1,060m to £1,300m.\nFind MPC and MPS.",
        solution: "$ΔY_d = 1,500 − 1,200 = £300m$\n$ΔC = 1,300 − 1,060 = £240m$\n$MPC = 240 ÷ 300 = 0.8$\n$MPS = 1 − 0.8 = 0.2$",
        notes: "Ask students to calculate alone before revealing. Common error: $1,300 ÷ 1,500$ is $APC$, not $MPC$.",
        sources: sources(COURSEBOOK, MULTIPLIER)
      },
      {
        id: "saving-mcq",
        kind: "mcq",
        label: "QUICK CHECK",
        title: "Consumption and saving calculation",
        section: "1 · Consumption and saving",
        question: "The consumption function is $C = £120m + 0.75Y_d$. What is saving when disposable income is £800m?",
        options: [
          "A  −£120m",
          "B  £80m",
          "C  £200m",
          "D  £720m"
        ],
        answer: 1,
        feedback: "$C = 120 + 0.75(800) = 720$. Therefore $S = Y_d − C = 800 − 720 = £80m$.",
        notes: "After the answer, ask for the saving function: $S = −120 + 0.25Y_d$. This is the exit check for Part 1. Next lesson: investment and the accelerator, followed by government spending and net exports.",
        sources: sources(COURSEBOOK)
      }
    ]
  };
}());
