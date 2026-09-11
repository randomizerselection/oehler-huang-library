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
      title: "Investment, government spending and net exports",
      course: "Cambridge A Level Economics",
      syllabus: "9708 · 9.1.2",
      coreEnd: "lesson-conclusion",
      plannedLessons: 0.5
    },
    slides: [
      {
        id: "investment-section",
        kind: "hero",
        code: "9.1.2 · Part 2",
        eyebrow: "CAMBRIDGE A LEVEL ECONOMICS · 9708",
        title: "Investment, government spending and net exports",
        subtitle: "Why can a small rise in sales trigger a surge in spending on new machines?",
        syllabus: "Investment, demand growth and the accelerator · 投资与加速原理",
        image: "assets/accelerator-factory-capacity.jpg",
        imagePosition: "center 50%",
        imageAlt: "A vehicle assembly line with workers, cars and production equipment.",
        section: "1 · Investment and the accelerator",
        notes: "Ask students to predict why machine purchases might change much more sharply than sales. The factory example later tests their explanation. Re-establish that investment means spending on capital goods, not buying financial assets.",
        sources: sources(COURSEBOOK, FACTORY_PHOTO)
      },
      {
        id: "investment-learning-outcomes",
        kind: "objectives",
        label: "LESSON OVERVIEW",
        title: "Learning objectives",
        section: "1 · Investment and the accelerator",
        items: [
          { text: "Explain autonomous and induced investment. 区分自主投资与引致投资。" },
          { text: "Apply the accelerator principle and evaluate its conditions. 运用加速原理并评价其条件。" },
          { text: "Analyse changes in government spending and net exports. 分析政府支出与净出口的变化。" }
        ],
        notes: "Continue from consumption and saving in Part 1. Retrieve the consumption function and multiplier briefly before the factory example. The final assessment draws on both parts of 9.1.2.",
        sources: sources(COURSEBOOK, MULTIPLIER)
      },
      {
        section: "1 · Investment and the accelerator",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ],
        id: "investment-retrieval",
        kind: "statement",
        label: "RETRIEVAL",
        title: "Autonomous spending and the next spending round",
        statement: "From memory: the government starts a new road project. Workers then spend part of their extra wages. Which spending is autonomous, which is induced, and what connects them?",
        sampleAnswer: "The initial government spending is autonomous. It creates income, which induces household consumption. Successive spending rounds produce the multiplier effect.",
        notes: "Give 45 seconds of silent recall, then ask for paired explanations before revealing. If students confuse the first injection with subsequent rounds, revisit the distinction before adding accelerator investment. Teacher-created retrieval of the previous lesson."
      },
      {
        id: "accelerator-intuition",
        kind: "hook",
        eyebrow: "VISUAL PAUSE",
        title: "When does a factory need more machines?",
        section: "1 · Investment and the accelerator",
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
        reveal: true,
        section: "1 · Investment and the accelerator",
        items: [
          {
            heading: "AUTONOMOUS INVESTMENT",
            headingZh: "自主投资",
            text: "Investment that changes independently of current income or output.\nFor example, lower interest rates make new machinery cheaper to finance.",
            highlights: ["independently of current income or output"],
            textZh: "不取决于当前收入或产出的投资。",
            highlightsZh: ["不取决于当前收入或产出"],
            detail: "Shifts aggregate expenditure"
          },
          {
            heading: "INDUCED INVESTMENT",
            headingZh: "引致投资",
            text: "Investment that responds to changes in income or demand.\nFor example, sustained growth in orders requires more productive capacity.",
            highlights: ["responds to changes in income or demand", "more productive capacity"],
            textZh: "企业因收入或需求变化并需要更多生产能力而进行的投资。",
            highlightsZh: ["收入或需求变化", "更多生产能力"],
            detail: "The accelerator channel"
          }
        ],
        notes: "Start with both sides hidden. Reveal autonomous investment on the first click, then induced investment on the second. Ask students to classify a firm buying machines after a rate cut versus after sustained growth in orders. The next slide diagrams the distinction.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "autonomous-induced-investment-diagrams",
        kind: "diagram",
        diagram: "autonomous-induced-investment-diagrams",
        label: "DIAGRAM",
        title: "Two different responses to income growth",
        section: "1 · Investment and the accelerator",
        notes: "Compare the same horizontal variable in both panels: the change in income, not the level of income. Reveal the autonomous component, then the induced component, then compare the same two growth amounts. Illustrative values assume other determinants unchanged, a constant capital-output relationship and sufficient pressure on capacity. These are investment-component diagrams, not equilibrium diagrams: there is no 45-degree line. The next AE diagram shows the equilibrium effect of an autonomous change.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "investment-determinants",
        kind: "table",
        label: "CONCEPT",
        title: "Determinants of investment",
        reveal: true,
        section: "1 · Investment and the accelerator",
        table: [
          ["Determinant", "Illustrative change", "Transmission to planned investment"],
          ["Interest rates and finance", "Borrowing costs or the required rate of return rise", "Fewer projects remain profitable, so planned investment falls"],
          ["Business expectations", "Expected future demand and profit improve", "Expected returns rise, so planned investment rises"],
          ["Technology and capital cost", "Productivity improves or capital goods become cheaper", "More investment projects become viable, so planned investment rises"],
          ["Government policy", "Corporation tax falls, subsidies rise or infrastructure improves", "After-tax returns rise or production costs fall, so planned investment rises"]
        ],
        notes: "Begin with the headings only, then reveal one complete row per click. Read each row as a causal link from the illustrative change to planned investment. Ask students to reverse one change and infer the opposite effect. Mention spare capacity as a reason why stronger demand might not immediately cause new investment.",
        sources: sources(COURSEBOOK, LEGACY)
      },
      {
        id: "autonomous-investment-shift",
        kind: "diagram",
        diagram: "autonomous-investment-shift",
        label: "DIAGRAM",
        title: "An autonomous investment shift",
        section: "1 · Investment and the accelerator",
        notes: "This intentionally reuses the numerical model from the multiplier lesson. The purpose is classification: the £50m vertical shift is autonomous I; the subsequent income change induces spending.",
        sources: sources(COURSEBOOK, MULTIPLIER)
      },
      {
        id: "accelerator-principle",
        kind: "definition",
        label: "KEY DEFINITION",
        title: "The accelerator principle",
        termZh: "加速原理",
        section: "1 · Investment and the accelerator",
        definition: "A change in the growth of demand can cause a larger percentage change in investment.",
        highlights: ["change in the growth of demand", "larger percentage change in investment"],
        definitionZh: "需求增长的变化，可能导致投资更大幅度的百分比变化。",
        highlightsZh: ["需求增长的变化", "投资更大幅度的百分比变化"],
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
        section: "1 · Investment and the accelerator",
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
        section: "1 · Investment and the accelerator",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ],
        id: "accelerator-stock-flow-check",
        kind: "mcq",
        label: "QUICK CHECK",
        title: "Capital stock and yearly purchases",
        intro: "Hinge question · Teacher-created",
        question: "A factory keeps operating 10 machines. Demand is unchanged. It buys one machine to replace one that wears out. What are net investment and gross investment, measured in machines?",
        options: [
          "A  Net 1; gross 1",
          "B  Net 0; gross 1",
          "C  Net 0; gross 0",
          "D  Net 10; gross 11"
        ],
        answer: 1,
        feedback: "B: the stock stays at 10, so net investment is zero. Buying one replacement makes gross investment one.",
        notes: "Collect answers from everyone before revealing. A confuses replacement with expansion; C forgets replacement; D confuses the stock with the flow. If these appear, count the stock before and after and repoll before continuing."
      },
      {
        id: "accelerator-mechanism",
        kind: "chain",
        label: "CAUSAL CHAIN",
        title: "The accelerator mechanism",
        section: "1 · Investment and the accelerator",
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
        title: "Small demand increases can multiply machine purchases",
        section: "1 · Investment and the accelerator",
        intro: "Key lesson: demand rises 25% in Year 2, but machine purchases rise 200%.\nEach machine makes 100 units; one wears out each year. Machine prices are unchanged.",
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
        notes: "Based on coursebook Table 41.1, first five years, with columns simplified. Begin with eight machines. Read left to right: demand → desired stock → extra machines → replacement → total purchases. Year 2 demand rises 25% (800 to 1000), while total purchases rise 200% (1 to 3). In Year 4 demand is still rising, but extra machines fall from six to two. In Year 5 net additions are zero, yet one replacement is purchased. A separate final textbook year allows the capital stock to shrink by not replacing a worn-out machine. Reveal one year per click. Pause before Year 2: how many machines are additions, and how many replace worn-out capital? The small baseline of replacement purchases explains the large percentage change. Use the next visual to count it. The later rows show the reverse: slower growth requires fewer additions.",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ],
        reveal: true
      },
      {
        section: "1 · Investment and the accelerator",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ],
        id: "accelerator-machine-visual",
        kind: "diagram",
        diagram: "accelerator-machine-visual",
        label: "DIAGRAM",
        title: "Two extra machines can triple annual purchases",
        notes: "Count the machines rather than treating the diagram as decoration. The operating stock includes the replacement. In Year 1, seven retained machines plus one replacement make eight. In Year 2, seven retained, one replacement and two additions make ten. Purchases are one replacement versus one replacement plus two additions. Equal machine prices make the percentage change in purchases equal the percentage change in investment expenditure. This visual models the first two rows of the coursebook factory table."
      },
      {
        id: "accelerator-paper-definition",
        kind: "mcq",
        label: "EXAM PRACTICE",
        title: "The accelerator relationship",
        section: "1 · Investment and the accelerator",
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
        title: "Calculating investment when output growth slows",
        section: "1 · Investment and the accelerator",
        prompt: "Use $I = v × ΔY$, where $I$ is induced net investment and $ΔY$ is the annual change in output.\nThe accelerator coefficient is $v = 2$.\nOutput rises by £15bn this year and £5bn next year.\nCalculate induced investment in each year. By how much does it change? Explain why.",
        solution: "This year: $I = 2 × £15bn = £30bn$\nNext year: $I = 2 × £5bn = £10bn$\nChange: $£10bn − £30bn = −£20bn$\nInvestment falls by £20bn because slower output growth requires a smaller addition to capacity.",
        notes: "Brief supporting calculation, explicitly taught in the coursebook. Explain ΔY as the change over one year, not the level of GDP or its percentage growth rate. Here v is constant, capacity adjusts fully and replacement investment is excluded. Do not imply coefficient calculation is a separately listed syllabus requirement. The following past-paper table can be solved by comparing annual changes without knowing v. Ask everyone to attempt both calculations and the explanation before showing the method. The question is to find the two investment flows and their change, not to calculate the coefficient.",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ]
      },
      {
        section: "1 · Investment and the accelerator",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ],
        id: "accelerator-data",
        kind: "mcq",
        label: "QUICK CHECK",
        title: "Investment follows annual additions to output",
        intro: "Hinge question · Teacher-created",
        question: "Output in Years 1–6 is £100bn, £110bn, £125bn, £135bn, £140bn and £140bn.\nWith $v = 2$, what is induced investment in Years 4, 5 and 6?",
        options: [
          "A  £20bn, £10bn, £0bn",
          "B  £270bn, £280bn, £280bn",
          "C  £30bn, £20bn, £10bn",
          "D  £20bn, £10bn, £10bn"
        ],
        answer: 0,
        feedback: "A: annual additions are £10bn, £5bn and £0bn. Multiplying each by 2 gives £20bn, £10bn and £0bn. High output can continue with no net additions to capacity.",
        notes: "Collect answers from everyone before revealing. Independent transfer from the worked example. B uses output levels; C uses the previous years; D assumes a high unchanged output level still induces expansion. Ask students to show each subtraction. Use the next graph as visual feedback. Replacement investment is excluded."
      },
      {
        id: "accelerator-response",
        kind: "diagram",
        diagram: "accelerator-response",
        label: "DIAGRAM",
        title: "Slower output growth means less induced investment",
        section: "1 · Investment and the accelerator",
        notes: "Use all four stages: output level, annual change, induced investment, then the contrast. Compare Years 3 and 5: output 125 → 140; induced investment 30 → 10. These are separate panels and quantities, not two lines to compare by height. The missing Year 1 investment is unknown, not zero. This is visual feedback on the preceding calculation check. The shrinking gaps between output levels explain the falling investment bars. Ask students to predict each bar before revealing it.",
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
        section: "1 · Investment and the accelerator",
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
        section: "1 · Investment and the accelerator",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ],
        id: "accelerator-growth-check",
        kind: "mcq",
        label: "QUICK CHECK",
        title: "Equal additions to output across successive years",
        intro: "Hinge question · Teacher-created",
        question: "Output rises by £10bn in each of three successive years. The accelerator coefficient is constant and positive. What happens to induced investment?",
        options: [
          "A  It increases each year because output is higher",
          "B  It stays constant and positive",
          "C  It falls to zero because growth is unchanged",
          "D  It cannot be compared without knowing the coefficient"
        ],
        answer: 1,
        feedback: "B: each year needs the same addition to capacity. With constant $v$ and the same $ΔY$, induced investment stays constant and positive.",
        notes: "Collect answers from everyone before revealing. A reveals confusion between levels and changes; C confuses constant growth with zero growth; D misses that a constant coefficient is enough to compare. Have students sketch equal annual gaps and repoll if necessary."
      },
      {
        id: "accelerator-paper-fall",
        kind: "mcq",
        label: "EXAM PRACTICE",
        title: "The cause of falling investment",
        section: "1 · Investment and the accelerator",
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
        section: "1 · Investment and the accelerator",
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
        section: "1 · Investment and the accelerator",
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
        title: "Year 5 is the first larger income increase",
        section: "1 · Investment and the accelerator",
        prompt: "Explain why Year 5 is correct.\nUse the income data to rule out Year 4 and Year 6.",
        solution: "Annual increases, Years 2–6:\n$40 → 20 → 20 → 30 → 40$ (billion dollars)\nYear 4: $20 = 20$; net investment is unchanged.\nYear 5: $30 > 20$; net investment first rises.\nYear 6: $40 > 30$, but the first rise has already occurred in Year 5.",
        notes: "Teacher-written method, revealed only on request. This is not an official written mark-scheme explanation. Separate the level of income, its first difference, and whether that first difference has increased. The answer is C as verified in the published scheme. Keep the full original question, table and options visible while students attempt and review the explanation. The prompt and model on the right are teacher-written; the repeated stimulus is unchanged.",
        sources: [
          "Cambridge 9708/31 May/June 2026, Q15, question paper p.6; mark scheme p.2: C. Local files 9708_s26_qp_31.pdf and 9708_s26_ms_31.pdf."
        ],
        stimulus: {
          question: "According to the accelerator principle, in which year did net investment first rise to a level above that of the previous year?",
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
          options: [
            "A  year 3",
            "B  year 4",
            "C  year 5",
            "D  year 6"
          ],
          sourceLabel: "9708/31 · May/June 2026 · Q15"
        }
      },
      {
        id: "accelerator-limitations",
        kind: "table",
        label: "EVALUATION",
        title: "Stronger and weaker accelerator responses",
        section: "1 · Investment and the accelerator",
        table: [
          [
            "Factor",
            "Stronger or faster response",
            "Weaker or delayed response"
          ],
          [
            "Capacity utilisation",
            "Near full capacity: extra output needs new machines",
            "Spare capacity: idle machines meet extra demand"
          ],
          [
            "Expected duration",
            "Lasting demand growth makes expansion worthwhile",
            "Temporary demand makes firms postpone expansion"
          ],
          [
            "Finance and equipment",
            "Available credit and machinery allow purchases now",
            "Restricted credit or supply delays purchases"
          ],
          [
            "Capital needed per unit",
            "Unchanged production methods require more machines",
            "Productivity gains let existing machines produce more"
          ]
        ],
        notes: "The first column names neutral factors, not conditions that all strengthen the effect. Compare the two directions within each row. Reveal rows one at a time and ask why the induced response differs. Technology can also trigger autonomous investment; the final row isolates the case where productivity gains reduce the extra capital needed for a given increase in demand.",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ],
        intro: "For the same rise in demand, will firms need and be able to buy extra machines?",
        reveal: true
      },
      {
        section: "1 · Investment and the accelerator",
        sources: [
          "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028, section 9.1.2, p.29 (local PDF).",
          "Cambridge A Level Economics - Textbook.pdf, Chapter 41, section 41.2, PDF pp.354-355 (local coursebook)."
        ],
        id: "accelerator-capacity-check",
        kind: "mcq",
        label: "QUICK CHECK",
        title: "The same demand growth in two factories",
        intro: "Hinge question · Teacher-created",
        question: "Orders rise persistently by 20% at two otherwise identical factories. Both can obtain finance. Factory A has idle machines; Factory B is at full capacity. Which is more likely to invest in extra machines now?",
        options: [
          "A  Factory A, because it has spare capacity",
          "B  Factory B, because extra output needs more capacity",
          "C  Both equally, because orders rise by the same percentage",
          "D  Neither, because demand is already high"
        ],
        answer: 1,
        feedback: "B: Factory A can use idle machines. Factory B needs extra capacity to meet the sustained rise in orders. The same demand growth can produce different investment responses.",
        notes: "Collect answers from everyone before revealing. Ask students to name the binding condition, not just pick B. If C is common, return to the capacity row and ask how each factory can produce the extra output."
      },
      {
        id: "accelerator-mcq",
        kind: "mcq",
        label: "QUICK CHECK",
        title: "The accelerator principle",
        section: "1 · Investment and the accelerator",
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
        section: "1 · Investment and the accelerator",
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
        section: "1 · Investment and the accelerator",
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
        number: "02",
        eyebrow: "SECTION 2",
        title: "Government spending\nand net exports",
        subtitle: "Policy choices, competitiveness and incomes at home and abroad complete aggregate demand",
        section: "2 · Government spending and net exports",
        notes: "Section boundary. Keep the distinction between an accounting component and its determinants.",
        sources: sources(COURSEBOOK)
      },
      {
        id: "government-determinants",
        kind: "table",
        label: "CONCEPT",
        title: "Determinants of government spending",
        section: "2 · Government spending and net exports",
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
        section: "2 · Government spending and net exports",
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
        section: "2 · Government spending and net exports",
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
        section: "2 · Government spending and net exports",
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
        section: "2 · Government spending and net exports",
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
        section: "2 · Government spending and net exports",
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
        section: "2 · Government spending and net exports",
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
