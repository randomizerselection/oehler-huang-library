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
      title: "Components of aggregate demand",
      course: "Cambridge A Level Economics",
      syllabus: "9708 · 9.1.2",
      coreEnd: "lesson-conclusion",
      plannedLessons: 1.5
    },
    slides: [
      {
        id: "aggregate-demand-components",
        kind: "hero",
        code: "9.1.2",
        title: "Aggregate demand",
        subtitle: "Consumption, investment, government spending and net exports",
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
          { text: "Explain autonomous and induced investment, including the accelerator." },
          { text: "Trace how determinants of C, I, G and net exports change aggregate demand." }
        ],
        notes: "Use this as the learning contract. The final assessment returns to all four outcomes.",
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
        notes: "After the answer, ask for the saving function: $S = −120 + 0.25Y_d$.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "investment-section",
        kind: "section",
        number: "02",
        eyebrow: "SECTION 2",
        title: "Investment and the accelerator",
        subtitle: "Firms respond both to conditions independent of income and to changes in demand",
        section: "2 · Investment and the accelerator",
        notes: "Section boundary. Re-establish that investment means spending on capital goods, not buying financial assets.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "accelerator-intuition",
        kind: "hook",
        eyebrow: "VISUAL PAUSE",
        title: "When does a factory need more machines?",
        section: "2 · Investment and the accelerator",
        image: "assets/accelerator-factory-capacity.jpg",
        imagePosition: "center 50%",
        imageAlt: "Cars and workers move through a busy vehicle assembly line.",
        notes: "Ask students to distinguish using idle machines from buying new ones. A sustained rise in demand can require extra capacity; a high but unchanged level of sales does not require repeated expansion. Return to the photograph when evaluating spare capacity.",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook).",
          "Factory-capacity photograph: Wikimedia Commons / Anonyme / CC BY-SA 3.0, https://commons.wikimedia.org/wiki/File:Hyundai_car_assembly_line.jpg (copied from the local investment-course photo archive)."
        ]
      },
      {
        id: "autonomous-induced-investment",
        kind: "compare",
        label: "CONCEPT",
        title: "Autonomous and induced investment",
        section: "2 · Investment and the accelerator",
        items: [
          {
            heading: "AUTONOMOUS INVESTMENT",
            headingZh: "自主投资",
            text: "Investment that changes independently of current income or output: for example, confidence improves, interest rates fall or a new technology appears.",
            textZh: "不取决于当前收入或产出的投资。",
            detail: "Shifts aggregate expenditure"
          },
          {
            heading: "INDUCED INVESTMENT",
            headingZh: "引致投资",
            text: "Investment that responds to changes in income or demand when firms need more productive capacity.",
            textZh: "企业因收入或需求变化并需要更多生产能力而进行的投资。",
            detail: "The accelerator channel"
          }
        ],
        notes: "Ask students to classify a firm buying machines after a rate cut versus after sustained growth in orders.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "investment-determinants",
        kind: "table",
        label: "CONCEPT",
        title: "Determinants of investment",
        section: "2 · Investment and the accelerator",
        table: [
          ["Determinant", "Illustrative change", "Transmission to planned investment"],
          ["Interest rates and finance", "Borrowing costs or the required rate of return rise", "Fewer projects remain profitable, so planned investment falls"],
          ["Business expectations", "Expected future demand and profit improve", "Expected returns rise, so planned investment rises"],
          ["Technology and capital cost", "Productivity improves or capital goods become cheaper", "More investment projects become viable, so planned investment rises"],
          ["Government policy", "Corporation tax falls, subsidies rise or infrastructure improves", "After-tax returns rise or production costs fall, so planned investment rises"]
        ],
        notes: "Read each row as a causal link from the illustrative change to planned investment. Ask students to reverse one change and infer the opposite effect. Mention spare capacity as a reason why stronger demand might not immediately cause new investment.",
        sources: sources(COURSEBOOK, LEGACY)
      },
      {
        id: "autonomous-investment-shift",
        kind: "diagram",
        diagram: "autonomous-investment-shift",
        label: "DIAGRAM",
        title: "An autonomous investment shift",
        section: "2 · Investment and the accelerator",
        notes: "This intentionally reuses the numerical model from the multiplier lesson. The purpose is classification: the £50m vertical shift is autonomous I; the subsequent income change induces spending.",
        sources: sources(COURSEBOOK, MULTIPLIER)
      },
      {
        id: "accelerator-principle",
        kind: "definition",
        label: "KEY DEFINITION",
        title: "The accelerator principle",
        termZh: "加速原理",
        section: "2 · Investment and the accelerator",
        definition: "The accelerator principle links induced investment to changes in income and demand. A change in the growth of demand can cause a larger percentage change in investment.",
        definitionZh: "加速原理说明收入和需求的变动如何引致投资。需求增长的变化，可能导致投资更大幅度的百分比变化。",
        formula: "",
        notes: "Teach the direction of causation first: changes in income and demand → induced investment. The coursebook discusses a greater proportionate change, subject to capacity and expectations. The syllabus names the accelerator; unlike the multiplier, it does not separately list coefficient calculations. The coefficient is introduced briefly later, after the factory example.",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook).",
          "Cambridge 9708/32 February/March 2023, Q21, question paper p.9; mark scheme p.2: C. Local files 9708_m23_qp_32.pdf and 9708_m23_ms_32.pdf."
        ]
      },
      {
        id: "accelerator-stock-flow",
        kind: "compare",
        label: "CONCEPT",
        title: "Capital stock and investment spending",
        section: "2 · Investment and the accelerator",
        items: [
          {
            heading: "CAPITAL STOCK",
            headingZh: "资本存量",
            text: "The machines and buildings a firm has at a point in time. Higher sustained output requires more capacity when existing equipment is fully used.",
            detail: "Machines already owned"
          },
          {
            heading: "INVESTMENT",
            headingZh: "投资流量",
            text: "Spending on capital goods during a period. Net investment adds to the stock; replacement investment replaces worn-out capital.",
            detail: "Gross investment = net investment + depreciation"
          }
        ],
        notes: "Define stock and flow before the numerical example. A factory may keep producing at a high level without adding to its capital stock. Gross investment can remain positive because equipment needs replacing. In the example, all machines are identical and the only net additions are induced by demand.",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ]
      },
      {
        id: "accelerator-mechanism",
        kind: "chain",
        label: "CAUSAL CHAIN",
        title: "The accelerator mechanism",
        section: "2 · Investment and the accelerator",
        items: [
          {
            heading: "DEMAND INCREASES",
            text: "Firms expect higher sales to last.",
            link: "requires more output"
          },
          {
            heading: "CAPACITY IS FULLY USED",
            text: "Existing machines cannot meet all the extra demand.",
            link: "requires more capacity"
          },
          {
            heading: "MORE CAPITAL IS NEEDED",
            text: "The desired stock of machines rises.",
            link: "requires new purchases"
          },
          {
            heading: "INVESTMENT IS INDUCED",
            text: "Firms buy additional machines to expand production."
          }
        ],
        notes: "Reveal one connected link at a time. Rising demand induces additions to capital. To explain why investment itself rises, compare the size of the addition with last year: faster demand growth may require a larger addition. Do not equate a higher capital stock with a higher annual investment flow.",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ]
      },
      {
        id: "accelerator-factory",
        kind: "table",
        label: "WORKED EXAMPLE",
        title: "Demand growth and machine purchases",
        section: "2 · Investment and the accelerator",
        intro: "100 units per machine each year; one machine wears out. Year 2: demand +25%; total purchases +200%.",
        table: [
          [
            "Year",
            "Demand\n(units/year)",
            "Machines\nneeded",
            "Extra\nmachines",
            "Replacement\nmachines",
            "Total\npurchases"
          ],
          [
            "1",
            "800",
            "8",
            "0",
            "1",
            "1"
          ],
          [
            "2",
            "1,000",
            "10",
            "2",
            "1",
            "3"
          ],
          [
            "3",
            "1,600",
            "16",
            "6",
            "1",
            "7"
          ],
          [
            "4",
            "1,800",
            "18",
            "2",
            "1",
            "3"
          ],
          [
            "5",
            "1,800",
            "18",
            "0",
            "1",
            "1"
          ]
        ],
        notes: "Based on coursebook Table 41.1, first five years, with columns simplified. Begin with eight machines. Read left to right: demand → desired stock → extra machines → replacement → total purchases. Year 2 demand rises 25% (800 to 1000), while total purchases rise 200% (1 to 3). In Year 4 demand is still rising, but extra machines fall from six to two. In Year 5 net additions are zero, yet one replacement is purchased. A separate final textbook year allows the capital stock to shrink by not replacing a worn-out machine.",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ]
      },
      {
        id: "accelerator-paper-definition",
        kind: "mcq",
        label: "EXAM PRACTICE",
        title: "The accelerator relationship",
        section: "2 · Investment and the accelerator",
        paper: "9708/32 · Feb/Mar 2023 · Q21",
        question: "What does the accelerator principle state?",
        options: [
          "A  Consumption is a function of the rate of change of income.",
          "B  Income is a function of the rate of change of investment.",
          "C  Investment is a function of the rate of change of income.",
          "D  Investment is a function of the rate of interest."
        ],
        answer: 2,
        feedback: "C: changes in income induce investment. A concerns consumption; B reverses the causal direction. Interest rates affect investment, but D does not state the accelerator principle.",
        notes: "Original Cambridge question and option order; line breaks reset for the classroom. Answer verified against the published mark scheme, p.2. Explanations are teacher-written. Ask for a reason before selecting an answer.",
        sources: [
          "Cambridge 9708/32 February/March 2023, Q21, question paper p.9; mark scheme p.2: C. Local files 9708_m23_qp_32.pdf and 9708_m23_ms_32.pdf."
        ]
      },
      {
        id: "accelerator-worked",
        kind: "worked",
        label: "WORKED EXAMPLE",
        title: "The accelerator coefficient",
        section: "2 · Investment and the accelerator",
        prompt: "The coefficient measures induced investment per unit of additional output.\nIn this simplified model, $v = 2$.\nOutput rises by £15bn, then by £5bn in the following year.",
        solution: "Induced $I = v × ΔY$\nFirst year: $2 × £15bn = £30bn$\nFollowing year: $2 × £5bn = £10bn$\nOutput rises in both years, but induced investment falls.",
        notes: "Brief supporting calculation, explicitly taught in the coursebook. Explain ΔY as the change over one year, not the level of GDP or its percentage growth rate. Here v is constant, capacity adjusts fully and replacement investment is excluded. Do not imply coefficient calculation is a separately listed syllabus requirement. The following past-paper table can be solved by comparing annual changes without knowing v.",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ]
      },
      {
        id: "accelerator-data",
        kind: "table",
        label: "WORKED EXAMPLE",
        title: "Output levels and annual changes",
        section: "2 · Investment and the accelerator",
        intro: "Illustrative model: $v = 2$. Values are £bn; replacement investment is excluded.",
        table: [
          [
            "Year",
            "Output level",
            "Annual change",
            "Induced investment"
          ],
          [
            "1",
            "100",
            "—",
            "—"
          ],
          [
            "2",
            "110",
            "+10",
            "20"
          ],
          [
            "3",
            "125",
            "+15",
            "30"
          ],
          [
            "4",
            "135",
            "+10",
            "20"
          ],
          [
            "5",
            "140",
            "+5",
            "10"
          ],
          [
            "6",
            "140",
            "0",
            "0"
          ]
        ],
        notes: "Read each row left to right: Y → ΔY → induced I. Year 1 investment cannot be inferred because earlier output is not supplied. Highlight Years 3–5: output is higher but the annual increment is smaller, so induced investment falls. Year 6 has zero induced additions, not necessarily zero gross investment. Amounts are consistent £bn, not an output index mixed with investment amounts.",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ]
      },
      {
        id: "accelerator-response",
        kind: "diagram",
        diagram: "accelerator-response",
        label: "DIAGRAM",
        title: "Rising output with falling investment",
        section: "2 · Investment and the accelerator",
        notes: "Use all four stages: output level, annual change, induced investment, then the contrast. Compare Years 3 and 5: output 125 → 140; induced investment 30 → 10. These are separate panels and quantities, not two lines to compare by height. The missing Year 1 investment is unknown, not zero.",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook).",
          "9.1.4 Changes in AD.pptx and 9.1.5 Changes in AD (2).pptx in previous-lesson-materials (local teaching references)."
        ]
      },
      {
        id: "accelerator-growth-patterns",
        kind: "table",
        label: "CONCEPT",
        title: "Growth patterns and induced investment",
        section: "2 · Investment and the accelerator",
        intro: "Compare the additions to output in equal time periods, assuming unchanged production conditions.",
        table: [
          [
            "Output pattern",
            "Annual additions",
            "Induced investment"
          ],
          [
            "Rises by larger amounts",
            "+10 → +15",
            "Rises"
          ],
          [
            "Rises by equal amounts",
            "+10 → +10",
            "Stays constant and positive"
          ],
          [
            "Rises by smaller amounts",
            "+15 → +5",
            "Falls, but remains positive"
          ],
          [
            "Stops rising",
            "+5 → 0",
            "Falls to zero; replacement may continue"
          ]
        ],
        notes: "Equal absolute additions, not equal percentage growth, give constant induced investment in the simple model. A constant positive percentage applied to a growing base produces larger absolute additions. If output falls, desired capital stock falls; firms may let equipment wear out without replacing it. Negative net investment is a reduction of the stock, not a purchase of negative machines.",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ]
      },
      {
        id: "accelerator-paper-fall",
        kind: "mcq",
        label: "EXAM PRACTICE",
        title: "The cause of falling investment",
        section: "2 · Investment and the accelerator",
        paper: "9708/33 · Oct/Nov 2023 · Q21",
        question: "What, according to the accelerator principle, will cause the level of investment to fall?",
        options: [
          "A  a decrease in confidence",
          "B  a decrease in the rate of growth of national income",
          "C  an increase in the price of capital equipment",
          "D  an increase in the rate of interest"
        ],
        answer: 1,
        feedback: "B: slower income growth reduces the extra capacity firms need. A, C and D can also reduce investment, but they are other determinants; the question specifies the accelerator channel.",
        notes: "Original Cambridge question and option order; line breaks reset for the classroom. Answer verified against the published mark scheme, p.2. Explanations are teacher-written. Ask for a reason before selecting an answer.",
        sources: [
          "Cambridge 9708/33 October/November 2023, Q21, question paper p.7; mark scheme p.2: B. Local files 9708_w23_qp_33.pdf and 9708_w23_ms_33.pdf."
        ]
      },
      {
        id: "accelerator-paper-smaller-rise",
        kind: "mcq",
        label: "EXAM PRACTICE",
        title: "Smaller rises and smaller falls",
        section: "2 · Investment and the accelerator",
        paper: "9708/34 · May/June 2025 · Q15",
        question: "According to the accelerator theory, what would cause investment in an economy to be lower than in the previous year?",
        options: [
          "A  a lower marginal propensity to consume than in the previous year",
          "B  a lower marginal propensity to save than in the previous year",
          "C  a smaller fall in national income than occurred in the previous year",
          "D  a smaller rise in national income than occurred in the previous year"
        ],
        answer: 3,
        feedback: "D: a smaller rise requires a smaller addition to capacity. A smaller fall is an improvement in the income change, so C points in the opposite direction. A and B describe propensities, not the accelerator relationship.",
        notes: "Original wording and option order. Published mark scheme: D. Use as independent consolidation if time is short. For C, compare income changes of −10 and −5: the change becomes less negative. This does not establish a further fall in net investment.",
        sources: [
          "Cambridge 9708/34 May/June 2025, Q15, question paper p.7; mark scheme p.2: D. Local files 9708_s25_qp_34.pdf and 9708_s25_ms_34.pdf."
        ]
      },
      {
        id: "accelerator-paper-income-table",
        kind: "mcq",
        label: "EXAM PRACTICE",
        title: "Investment from national income data",
        section: "2 · Investment and the accelerator",
        paper: "9708/31 · May/June 2026 · Q15",
        question: "According to the accelerator principle, in which year did net investment first rise to a level above that of the previous year?",
        options: [
          "A  year 3",
          "B  year 4",
          "C  year 5",
          "D  year 6"
        ],
        answer: 2,
        feedback: "C: annual income increases in Years 2–6 are 40, 20, 20, 30 and 40 (billion dollars). The first increase over the preceding annual change is 20 → 30 in Year 5. Year 6 has the highest income, but is not the first rise in investment.",
        notes: "Original wording, figures and A–D order; table retypeset. Published mark scheme: C. Keep the stimulus and options visible together. Ask students to calculate annual changes privately, then identify the FIRST increase in those changes. No coefficient is supplied or needed. No Year 1 net-investment value can be inferred.",
        intro: "The table gives the national income of a country over six years.",
        table: [
          [
            "year",
            "national income\n($ billion)"
          ],
          [
            "1",
            "2200"
          ],
          [
            "2",
            "2240"
          ],
          [
            "3",
            "2260"
          ],
          [
            "4",
            "2280"
          ],
          [
            "5",
            "2310"
          ],
          [
            "6",
            "2350"
          ]
        ],
        sources: [
          "Cambridge 9708/31 May/June 2026, Q15, question paper p.6; mark scheme p.2: C. Local files 9708_s26_qp_31.pdf and 9708_s26_ms_31.pdf."
        ]
      },
      {
        id: "accelerator-paper-income-method",
        kind: "worked",
        label: "FEEDBACK",
        title: "Comparing successive income changes",
        section: "2 · Investment and the accelerator",
        prompt: "9708/31 · May/June 2026 · Q15\nWhy is Year 5 correct?\nExplain why Year 4 and Year 6 are not the answer.",
        solution: "Annual increases, Years 2–6:\n$40 → 20 → 20 → 30 → 40$ (billion dollars)\nYear 4: $20 = 20$; investment is unchanged.\nYear 5: $30 > 20$; investment first rises.\nYear 6: another rise, but not the first.",
        notes: "Teacher-written method, revealed only on request. This is not an official written mark-scheme explanation. Separate the level of income, its first difference, and whether that first difference has increased. The answer is C as verified in the published scheme.",
        sources: [
          "Cambridge 9708/31 May/June 2026, Q15, question paper p.6; mark scheme p.2: C. Local files 9708_s26_qp_31.pdf and 9708_s26_ms_31.pdf."
        ]
      },
      {
        id: "accelerator-limitations",
        kind: "table",
        label: "EVALUATION",
        title: "Conditions for a strong accelerator effect",
        section: "2 · Investment and the accelerator",
        table: [
          ["Condition", "Stronger accelerator", "Weaker or delayed accelerator"],
          ["Spare capacity", "Factories are near capacity", "Idle machines and workers can meet extra demand"],
          ["Expected persistence", "Firms expect demand growth to continue", "Firms see the rise as temporary"],
          ["Finance and supply", "Finance and capital goods are available", "Credit or equipment supply is constrained"],
          ["Capital-output relationship", "A stable ratio links capacity closely to output", "Technology changes the capacity required per unit of output"]
        ],
        notes: "Use this slide to add evaluation. The coefficient example is deliberately mechanical; real firms face expectations, finance, lags and spare capacity.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "accelerator-mcq",
        kind: "mcq",
        label: "QUICK CHECK",
        title: "The accelerator principle",
        section: "2 · Investment and the accelerator",
        question: "Real GDP is 100, 110, 125 and 133 in four successive years. If the accelerator coefficient is 2, during which period is induced investment greatest?",
        options: [
          "A  Year 1 to Year 2",
          "B  Year 2 to Year 3",
          "C  Year 3 to Year 4",
          "D  It is the same in every period"
        ],
        answer: 1,
        feedback: "The changes in GDP are +10, +15 and +8, so induced investment is greatest from Year 2 to Year 3.",
        notes: "Students do not need the coefficient to rank the periods, but they should recognise that investment follows the largest $ΔY$.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "multiplier-accelerator",
        kind: "chain",
        label: "SYNTHESIS",
        title: "Multiplier–accelerator interaction",
        section: "2 · Investment and the accelerator",
        items: [
          { heading: "AUTONOMOUS INVESTMENT RISES", text: "Confidence improves, finance becomes cheaper or new technology appears.", link: "creates an injection" },
          { heading: "THE MULTIPLIER RAISES INCOME", text: "Higher spending creates output and household income.", link: "speeds demand growth" },
          { heading: "THE ACCELERATOR RAISES INVESTMENT", text: "Firms add capacity when faster demand growth persists.", link: "creates another injection" },
          { heading: "THE MULTIPLIER OPERATES AGAIN", text: "The additional investment raises income through further spending rounds." }
        ],
        notes: "This is a conceptual sequence, not a claim that the process continues without limit. Leakages, capacity constraints, expectations and policy reactions weaken it.",
        sources: sources(COURSEBOOK, MULTIPLIER)
      },
      {
        id: "accelerator-paper-multiplier",
        kind: "mcq",
        label: "EXAM PRACTICE",
        title: "Investment in the two mechanisms",
        section: "2 · Investment and the accelerator",
        paper: "9708/32 · Feb/Mar 2026 · Q16",
        question: "Investment is involved in both the accelerator and the multiplier. What is the nature of the investment in each case?",
        options: [
          "A  Accelerator: autonomous; multiplier: autonomous",
          "B  Accelerator: autonomous; multiplier: induced",
          "C  Accelerator: induced; multiplier: autonomous",
          "D  Accelerator: induced; multiplier: induced"
        ],
        answer: 2,
        feedback: "C: the accelerator explains induced investment responding to income changes. In the basic multiplier model, autonomous investment is the initial injection that raises income. Induced consumption then drives further spending rounds.",
        notes: "Published mark scheme: C. Original question wording and option values retained. The original two-column option table (accelerator first, multiplier second) is reflowed into labelled options. These labels preserve the relationship and order. Explain the basic model distinction, while recognising that induced investment can itself create further multiplier effects in the interaction.",
        sources: [
          "Cambridge 9708/32 February/March 2026, Q16, question paper p.7; mark scheme p.2: C. Local files 9708_m26_qp_32.pdf and 9708_m26_ms_32.pdf."
        ]
      },
      {
        id: "government-net-exports-section",
        kind: "section",
        number: "03",
        eyebrow: "SECTION 3",
        title: "Government spending\nand net exports",
        subtitle: "Policy choices, competitiveness and incomes at home and abroad complete aggregate demand",
        section: "3 · Government spending and net exports",
        notes: "Section boundary. Keep the distinction between an accounting component and its determinants.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "government-determinants",
        kind: "table",
        label: "CONCEPT",
        title: "Determinants of government spending",
        section: "3 · Government spending and net exports",
        table: [
          ["Determinant", "Why government spending changes", "Possible direction"],
          ["Fiscal stance", "Policymakers use spending to influence aggregate demand", "Expansion may raise $G$; austerity may reduce $G$"],
          ["Political priorities", "Governments choose different roles in health, education, welfare and infrastructure", "Priorities reallocate or change total $G$"],
          ["Population and events", "Demographic change, migration, disasters and conflict alter public needs", "Greater needs usually raise $G$"],
          ["Revenue and borrowing", "Tax receipts, debt costs and access to finance constrain funding", "Tighter fiscal capacity may reduce $G$"]
        ],
        notes: "The coursebook emphasises downturns, market-failure provision, population, disasters and conflict. Fiscal capacity is included as the constraint through which economic conditions matter.",
        sources: sources(COURSEBOOK, LEGACY)
      },
      {
        id: "government-road-case",
        kind: "scenario",
        label: "PHOTO CASE",
        title: "Public infrastructure spending",
        section: "3 · Government spending and net exports",
        image: "assets/government-road-investment.jpeg",
        imagePosition: "center 50%",
        imageAlt: "Road rollers and construction workers build a new public road.",
        heading: "The government brings a road project forward",
        text: "Construction firms receive orders before household income changes.\nWhich AD component changes first? Which later changes belong to the multiplier?",
        notes: "The first change is autonomous G. Firms then hire workers and buy inputs, creating income and induced consumption in later multiplier rounds. Use the familiar road image to connect classification in this lesson with the mechanism taught previously.",
        sources: sources(COURSEBOOK, MULTIPLIER, ROAD_PHOTO)
      },
      {
        id: "net-exports-intuition",
        kind: "hook",
        eyebrow: "VISUAL PAUSE",
        title: "Whose income drives exports from this port?",
        section: "3 · Government spending and net exports",
        image: "assets/net-exports-container-port.jpg",
        imagePosition: "center 48%",
        imageAlt: "Container ships, cranes and stacked containers at Hamburg harbor.",
        notes: "Ask who buys the exports on the departing ships and what determines their ability to buy. Elicit foreign income for exports. Then reverse the perspective: domestic income influences imports arriving at the port.",
        sources: sources(COURSEBOOK, PORT_PHOTO)
      },
      {
        id: "net-exports-determinants",
        kind: "table",
        label: "CONCEPT",
        title: "Determinants of exports and imports",
        section: "3 · Government spending and net exports",
        table: [
          ["Determinant", "Export channel", "Import channel"],
          ["Income", "Higher foreign income tends to raise $X$", "Higher domestic income tends to raise $M$"],
          ["Relative prices and exchange rate", "Cheaper domestic output tends to raise $X$", "Cheaper foreign output tends to raise $M$"],
          ["Quality and preferences", "Stronger non-price competitiveness raises foreign demand", "Preference for foreign products raises import demand"],
          ["Trade access", "Lower foreign barriers improve export access", "Lower domestic barriers improve import access"]
        ],
        notes: "Ask which income matters for exports and which for imports. Keep exchange-rate effects conditional on price elasticities when moving beyond the basic direction.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "competitiveness-chain",
        kind: "table",
        label: "CONCEPT",
        title: "International competitiveness",
        section: "3 · Government spending and net exports",
        table: [
          ["Initial change", "Transmission", "Likely effect"],
          ["Productivity rises", "Unit costs fall relative to competitors", "Price competitiveness improves and $X$ tends to rise"],
          ["Relative inflation falls", "Domestic prices rise more slowly than foreign prices", "$X$ tends to rise and $M$ becomes less attractive"],
          ["Currency depreciates", "Export prices fall and import prices rise, subject to elasticities", "$X − M$ tends to rise after adjustment"],
          ["Quality improves", "Reliability, design or service raises non-price competitiveness", "$X$ can rise without a price cut"]
        ],
        notes: "Use 'relative' repeatedly. A productivity rise only improves price competitiveness if it feeds through to unit costs or margins. A depreciation does not guarantee an immediate improvement in net exports.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "net-exports-worked",
        kind: "worked",
        label: "WORKED EXAMPLE",
        title: "Changes in net exports",
        section: "3 · Government spending and net exports",
        prompt: "Domestic income grows by 4%.\nForeign income grows by only 1%.\nThe domestic currency appreciates by 8%.\nPredict the likely change in net exports, ceteris paribus.",
        solution: "Domestic income growth raises import demand; weak foreign growth limits export demand.\nAn appreciation weakens export price competitiveness and makes imports cheaper.\nSo X − M is likely to fall, reducing AD.",
        notes: "Credit answers that qualify the exchange-rate effect using elasticities, contracts and time lags. The direction here is intentionally framed as likely, not certain.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "net-exports-mcq",
        kind: "mcq",
        label: "QUICK CHECK",
        title: "Determinants of net exports",
        section: "3 · Government spending and net exports",
        question: "Which combination is most likely to reduce a country's net exports?",
        options: [
          "A  Foreign income rises and domestic productivity rises",
          "B  Domestic income falls and the currency depreciates",
          "C  Domestic income rises and the currency appreciates",
          "D  Foreign income rises and domestic inflation falls relative to competitors"
        ],
        answer: 2,
        feedback: "Higher domestic income tends to raise imports, while an appreciation tends to weaken export price competitiveness and make imports cheaper.",
        notes: "Ask students to explain why each wrong option tends to improve net exports through at least one channel.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "synthesis-table",
        kind: "table",
        label: "SYNTHESIS",
        title: "Classifying changes in aggregate demand",
        section: "Assessment · 9.1.2",
        intro: "What changes first? Is it autonomous or induced? Which way does AD move? What happens next?",
        table: [
          ["Shock", "First component", "Type", "Initial AD", "Likely next mechanism"],
          ["Household wealth rises", "C", "Autonomous C", "↑", "Multiplier"],
          ["Disposable income rises", "C", "Induced C", "↑", "Movement along C"],
          ["Business confidence rises", "I", "Autonomous I", "↑", "Multiplier"],
          ["Output growth accelerates", "I", "Induced I", "↑", "Accelerator"],
          ["Government delays projects", "G", "Autonomous G", "↓", "Reverse multiplier"],
          ["Foreign income falls", "X − M", "Autonomous X", "↓", "Reverse multiplier"]
        ],
        notes: "Use this as a final retrieval grid. 'Autonomous' here means not induced by current domestic income; exports can still be induced by foreign income.",
        sources: sources(COURSEBOOK, MULTIPLIER)
      },
      {
        id: "lesson-assessment",
        kind: "assessment",
        label: "EXAM PRACTICE",
        title: "Aggregate demand analysis",
        section: "Assessment · 9.1.2",
        prompt: "An economy has $C = £80bn + 0.75Y_d$. Business confidence then improves and firms increase investment.",
        items: [
          { text: "a  Calculate consumption and saving when $Y_d = £400bn$. [2]" },
          { text: "b  Distinguish the rise in autonomous investment from induced expenditure. [4]" },
          { text: "c  Analyse how the multiplier and accelerator may interact after the rise in confidence. [6]" }
        ],
        notes: "Try without notes. Answers: (a) $C = 80 + 0.75(400) = £380bn$; $S = £20bn$. (b) confidence changes $I$ independently of current income and shifts $AE$; induced $C$ or $I$ responds to the resulting income/demand. (c) use the chain on the next slide and add conditions.",
        sources: sources(COURSEBOOK, MULTIPLIER)
      },
      {
        id: "assessment-plan",
        kind: "chain",
        label: "MODEL ANSWER",
        title: "Stages in an aggregate demand analysis",
        section: "Assessment · 9.1.2",
        items: [
          { heading: "CALCULATE THE BASELINE", text: "Using $C = 80 + 0.75(400)$ gives $C = £380bn$ and $S = £20bn$.", link: "establishes the starting values" },
          { heading: "IDENTIFY THE INITIAL CHANGE", text: "Higher confidence raises autonomous investment and shifts planned expenditure upward.", link: "creates output and income" },
          { heading: "APPLY THE MULTIPLIER", text: "Higher output creates income. With MPC 0.75, consumption rises in later rounds.", link: "may accelerate demand" },
          { heading: "ADD ACCELERATOR CONDITIONS", text: "Faster demand growth may induce investment when spare capacity is limited and firms expect the rise to persist." }
        ],
        notes: "Reveal one stage at a time after students compare plans. Accept other relevant constraints such as finance, capital-goods capacity and leakages.",
        sources: sources(COURSEBOOK, MULTIPLIER)
      },
      {
        id: "lesson-conclusion",
        kind: "table",
        label: "SUMMARY",
        title: "Sources of changes in aggregate demand",
        section: "Assessment · 9.1.2",
        table: [
          ["Component", "Main autonomous determinants", "Induced response or next mechanism"],
          ["Consumption and saving", "Wealth, credit conditions and expectations", "Disposable income changes $C$ through the $MPC$"],
          ["Investment", "Interest rates, expectations, technology and policy", "Output growth can induce investment through the accelerator"],
          ["Government spending", "Fiscal stance, priorities, needs and fiscal capacity", "An initial change in $G$ can start a multiplier process"],
          ["Net exports", "Foreign income, domestic income, competitiveness and trade access", "A change in $X − M$ can start a multiplier process"]
        ],
        notes: "Exit ticket: give one autonomous determinant of each component and explain one accelerator limitation. Preview 9.1.3 without teaching the gap diagrams yet.",
        sources: sources(SYLLABUS, PLANNER, COURSEBOOK, MULTIPLIER)
      }
    ]
  };
}());
