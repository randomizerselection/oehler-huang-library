/* Supply-side policy, lesson 4.
   Syllabus: ../../../references/igcse-economics-syllabus-2027-2029.md (4.4).
   Definitions: ../../../references/igcse-economics-definitions-2026.md.
   Paper 2: ../../../references/paper-2-mark-schemes-2023-2025/
   Teaching sequence revised 4 September 2026 after lesson 1 stopped at
   Two types of supply-side policy. See hero notes for classroom pacing.
*/
window.IGCSE = window.IGCSE || {};
const photos = IGCSE.photos.supplySidePolicy;
IGCSE.lesson = {
  "meta": {
    "code": "4.4.3",
    "unit": "Unit 4 - Government and the macroeconomy",
    "title": "Supply-side policy lesson 4: effects and evaluation - Cambridge IGCSE Economics 0455",
    "lessonLabel": "Supply-side policy lesson 4",
    "courseLabel": "Cambridge IGCSE Economics 0455",
    "creatorLabel": "Created by Samuel Oehler-Huang, Suzhou Foreign Language School"
  },
  "slides": [
    {
      "type": "hero",
      "eyebrow": "Overview",
      "title": "Effects and evaluation",
      "zhTitle": "影响与评价",
      "subtitle": "Supply-side policy lesson 4 - 4.4.3",
      "kicker": "How do capacity, productivity and competitiveness affect macroeconomic aims?",
      "visual": photos.portTerminal,
      "notes": "Suggested 40 minutes: recall 4; growth and employment 9; prices and competitiveness 8; evaluation 7; one eight-mark plan/answer and feedback 9; exit 3. Use the education question as the core writing task; the inflation question is optional consolidation. Ask for one quick response on each full-slide question, then check the taught mechanism."
    },
    {
      "type": "peerTask",
      "taskType": "definitionRecall",
      "eyebrow": "Recall",
      "title": "Recall last lesson",
      "prompt": "On paper, write one sentence for each term.",
      "stepsLabel": "Write these definitions",
      "definitionItems": [
        {
          "label": "1",
          "term": "Supply-side policy",
          "answer": "Policy measures designed to increase productive capacity and total supply by improving resources, efficiency or factor mobility."
        },
        {
          "label": "2",
          "term": "Privatisation",
          "answer": "The sale or transfer of assets from the public sector to the private sector."
        },
        {
          "label": "3",
          "term": "Deregulation",
          "answer": "The removal or reduction of government rules and regulations affecting firms."
        }
      ],
      "sharePrompt": "Compare with a partner before revealing the model answers."
    },
    {
      "type": "discussion",
      "question": "If firms become more productive, which macroeconomic aims might improve at the same time?",
      "notes": "如果企业生产率提高，哪些宏观经济目标可能同时改善？ Possible answer: Growth, employment, price stability and the current account may improve, but only if the policy is effective and well targeted. 经济增长、就业、价格稳定和经常账户都可能改善，但前提是政策有效且目标明确。",
      "layout": "question-only"
    },
    {
      "type": "outcomes",
      "eyebrow": "Objectives",
      "title": "By the end, you can",
      "bullets": [
        "Explain supply-side effects on growth, employment and prices.",
        "Explain effects on competitiveness and the current account.",
        "Evaluate supply-side policy in Paper 2 answers."
      ],
      "zhBullets": [
        "解释供给侧政策对增长、就业和价格的影响。",
        "解释对竞争力和经常账户的影响。",
        "在 Paper 2 答案中评价供给侧政策。"
      ]
    },
    {
      "type": "section",
      "eyebrow": "Part 1",
      "title": "Growth and employment",
      "zhTitle": "增长与就业"
    },
    {
      "type": "visualPause",
      "title": "Visual pause: Exam archive",
      "visual": photos.vwApprentices,
      "notes": "Example: Exam archive / China. Former fact context: Recent Paper 2 mark schemes link education, training, healthcare and infrastructure to productivity and lower unemployment. | China planned a modern vocational education system by 2025 to support high-quality development. Teacher question: Which macroeconomic aim is shown, and what cost can unemployment create? Possible answer: The aim is low unemployment; unemployment wastes labour and reduces household income. Source: Source: Cambridge IGCSE Economics 0455 Paper 2 archive, 2023-2025. | Source: China State Council vocational education guidelines, 2021."
    },
    {
      "type": "flow",
      "mode": "fillBlanks",
      "eyebrow": "Learn",
      "title": "How productivity supports growth",
      "zhTitle": "生产率如何支持经济增长",
      "nodes": [
        [
          {
            "text": "Output per worker __________",
            "answer": "rises",
            "zh": "每名工人的产出增加"
          },
          {
            "text": "Productive capacity __________",
            "answer": "increases",
            "zh": "生产能力提高"
          },
          {
            "text": "Firms can produce more __________",
            "answer": "output",
            "zh": "企业能够生产更多产出"
          },
          {
            "text": "Real GDP may __________",
            "answer": "rise",
            "zh": "实际国内生产总值可能增加"
          }
        ]
      ]
    },
    {
      "type": "quiz",
      "eyebrow": "Check",
      "question": "Why can higher productivity support economic growth?",
      "choices": [
        "It automatically makes everyone buy more.",
        "It allows more real output to be produced from available resources.",
        "It always raises the price of every product.",
        "It removes every need for investment."
      ],
      "answer": 1,
      "prompt": "Higher productivity can raise productive capacity and real output. Demand still affects how much of that capacity firms use."
    },
    {
      "type": "cards",
      "eyebrow": "PPC reasoning",
      "title": "Growth on a PPC",
      "cards": [
        [
          "Growth route",
          "productivity or capital increases maximum possible output"
        ],
        [
          "Policy route",
          "education, infrastructure, investment or technology improves supply conditions"
        ],
        [
          "Capacity route",
          "maximum possible output rises"
        ],
        [
          "Analysis",
          "state that productive capacity and long-run output rise"
        ]
      ],
      "visual": {
        "type": "diagram",
        "kind": "ppc",
        "mode": "rightShift",
        "title": "PPC: long-run growth",
        "caption": "Higher productivity, capital or technology can shift PPC1 to PPC2.",
        "checklist": false
      },
      "layout": "ppc-teaching",
      "ppcTeaching": {
        "mode": "capacity",
        "steps": [
          {
            "title": "Read the two output axes",
            "text": "Capital goods are on the vertical axis; consumer goods are on the horizontal axis.",
            "zh": "纵轴是资本品，横轴是消费品。",
            "takeaway": "Both axes show output, not prices or time."
          },
          {
            "title": "Start with the existing capacity",
            "text": "PPC1 shows the maximum combinations possible with current resources and technology.",
            "zh": "PPC1表示现有资源和技术下的最大产出组合。",
            "takeaway": "The curve is the boundary of possible production."
          },
          {
            "title": "Improve the ability to produce",
            "text": "Better skills, more capital or better technology allow the economy to produce more.",
            "zh": "资源数量、质量或技术改善，生产能力提高。",
            "takeaway": "PPC1 → PPC2: the whole frontier shifts outwards."
          },
          {
            "title": "Read what the shift means",
            "text": "At the same output of capital goods, the economy can produce more consumer goods.",
            "zh": "资本品产量不变时，经济体能生产更多消费品。",
            "takeaway": "Higher capacity means more possible output; demand affects how much is used."
          }
        ]
      },
      "notes": " Progressive diagram: use Right/Space or Next step; Back and Reset replay the explanation. The complete native diagram is retained in Handout view."
    },
    {
      "type": "discussion",
      "layout": "question-only",
      "question": "Why can a country have unemployed workers and unfilled jobs at the same time?",
      "notes": "Workers may lack the skills or location employers need. 一个国家为什么可能同时有失业工人和空缺岗位？"
    },
    {
      "type": "flow",
      "mode": "fillBlanks",
      "eyebrow": "Learn",
      "title": "How better skills support employment",
      "zhTitle": "更好的技能如何促进就业",
      "nodes": [
        [
          {
            "text": "Training improves workers’ __________",
            "answer": "skills",
            "zh": "培训提高工人技能"
          },
          {
            "text": "Workers match available __________",
            "answer": "vacancies",
            "zh": "工人与现有空缺岗位匹配"
          },
          {
            "text": "Firms may __________ more workers",
            "answer": "hire",
            "zh": "企业可能雇用更多工人"
          },
          {
            "text": "Structural unemployment may __________",
            "answer": "fall",
            "zh": "结构性失业可能减少"
          }
        ]
      ]
    },
    {
      "type": "yesNoCheck",
      "eyebrow": "Check",
      "title": "Will every training course reduce unemployment?",
      "items": [
        {
          "statement": "A course teaches skills that local employers do not need.",
          "answer": false,
          "reason": "It may fail to improve job matching; policy must target real skills shortages."
        }
      ],
      "notes": "Thumbs up or down. Show one statement, take every student’s vote, then reveal the reason before continuing."
    },
    {
      "type": "cards",
      "eyebrow": "PPC reasoning",
      "title": "Employment on a PPC",
      "cards": [
        [
          "Problem",
          "structural unemployment can leave output inside the PPC"
        ],
        [
          "Policy",
          "skills or mobility improve"
        ],
        [
          "Effect",
          "workers match vacancies and output moves closer to the PPC"
        ],
        [
          "Limit",
          "this is not automatically a rightward shift"
        ]
      ],
      "visual": {
        "type": "diagram",
        "kind": "ppc",
        "mode": "insideToOn",
        "title": "PPC: employment effect",
        "caption": "Lower structural unemployment can move output from inside the PPC towards the PPC.",
        "checklist": false
      },
      "layout": "ppc-teaching",
      "ppcTeaching": {
        "mode": "use",
        "steps": [
          {
            "title": "Keep the same output axes",
            "text": "Read capital goods vertically and consumer goods horizontally.",
            "zh": "纵轴是资本品，横轴是消费品。",
            "takeaway": "Keep resources and technology unchanged in this example."
          },
          {
            "title": "Start inside the frontier",
            "text": "Point A is inside the PPC: some resources are unemployed or used inefficiently.",
            "zh": "A点在PPC内部：部分资源失业或未得到有效利用。",
            "takeaway": "Actual output is below productive capacity."
          },
          {
            "title": "Use existing resources better",
            "text": "Helping suitable workers reach existing vacancies brings unemployed labour into production.",
            "zh": "更充分地利用现有资源，实际产量从A点增加到B点。",
            "takeaway": "A → B: output increases towards the existing frontier."
          },
          {
            "title": "Distinguish output from capacity",
            "text": "Point B lies on the same PPC. Both outputs are higher than at A, but the frontier has not shifted.",
            "zh": "B点仍在同一条PPC上：实际产量增加，生产能力没有改变。",
            "takeaway": "Using spare capacity is different from creating new capacity."
          }
        ]
      },
      "notes": " Progressive diagram: use Right/Space or Next step; Back and Reset replay the explanation. The complete native diagram is retained in Handout view."
    },
    {
      "type": "section",
      "eyebrow": "Part 2",
      "title": "Prices and competitiveness",
      "zhTitle": "价格与竞争力"
    },
    {
      "type": "discussion",
      "question": "Why might a supply-side policy reduce inflation without reducing employment?",
      "notes": "为什么供给侧政策可能在不减少就业的情况下降低通货膨胀？ Possible answer: If productivity rises and unit costs fall, firms may increase supply and lower prices rather than cut output. 如果生产率上升、单位成本下降，企业可能增加供给并降低价格，而不是削减产出。",
      "layout": "question-only"
    },
    {
      "type": "flow",
      "mode": "fillBlanks",
      "eyebrow": "Learn",
      "title": "How supply-side policy eases price pressure",
      "zhTitle": "供给侧政策如何缓解价格压力",
      "nodes": [
        [
          {
            "text": "Workers become more __________",
            "answer": "productive",
            "zh": "工人生产率提高"
          },
          {
            "text": "Costs per unit may __________",
            "answer": "fall",
            "zh": "单位成本可能下降"
          },
          {
            "text": "Firms can increase total __________",
            "answer": "supply",
            "zh": "企业能够增加总供给"
          },
          {
            "text": "Cost-push inflationary pressure may __________",
            "answer": "fall",
            "zh": "成本推动的通胀压力可能下降"
          }
        ]
      ]
    },
    {
      "type": "quiz",
      "eyebrow": "Check",
      "question": "Which link explains lower cost-push inflationary pressure?",
      "choices": [
        "Higher productivity can lower unit costs.",
        "Higher productivity guarantees higher wages only.",
        "Supply-side policy always lowers interest rates.",
        "More skills always reduce output."
      ],
      "answer": 0,
      "prompt": "Lower costs per unit make firms less likely to raise prices as quickly."
    },
    {
      "type": "discussion",
      "layout": "question-only",
      "question": "If two countries sell equally good bicycles, how could lower production costs help one country sell abroad?",
      "notes": "Lower costs may allow a more competitive price. Keep this as the simple exports link; detailed current-account analysis belongs in Unit 6. 自行车质量相同，较低的生产成本怎样帮助出口？"
    },
    {
      "type": "flow",
      "mode": "fillBlanks",
      "eyebrow": "Learn",
      "title": "How competitiveness can improve trade",
      "zhTitle": "竞争力如何改善贸易",
      "nodes": [
        [
          {
            "text": "Quality improves or unit costs __________",
            "answer": "fall",
            "zh": "质量改善或单位成本下降"
          },
          {
            "text": "Exports become more __________",
            "answer": "competitive",
            "zh": "出口产品更有竞争力"
          },
          {
            "text": "Export sales may __________",
            "answer": "rise",
            "zh": "出口销售可能增加"
          },
          {
            "text": "The current account may __________",
            "answer": "improve",
            "zh": "经常账户可能改善"
          }
        ]
      ]
    },
    {
      "type": "yesNoCheck",
      "eyebrow": "Check",
      "title": "Must the current account improve?",
      "items": [
        {
          "statement": "Exports rise, but import spending rises by even more.",
          "answer": false,
          "reason": "Higher exports alone do not guarantee an improved trade balance or current account."
        }
      ],
      "notes": "Thumbs up or down. Show one statement, take every student’s vote, then reveal the reason before continuing."
    },
    {
      "type": "cards",
      "eyebrow": "Learn",
      "title": "Effects on macro aims",
      "cards": [
        [
          "Economic growth",
          "higher capacity can raise real GDP"
        ],
        [
          "Employment",
          "skills and expansion can reduce unemployment"
        ],
        [
          "Price stability",
          "lower unit costs can reduce cost-push pressure"
        ],
        [
          "Current account",
          "competitiveness can raise exports or reduce imports"
        ]
      ],
      "visual": {
        "type": "diagram",
        "kind": "ppc",
        "mode": "rightShift",
        "title": "PPC: long-run growth",
        "caption": "Higher productivity, capital or technology can shift PPC1 to PPC2.",
        "checklist": false
      },
      "layout": "ppc-teaching",
      "ppcTeaching": {
        "mode": "capacity",
        "steps": [
          {
            "title": "Read the two output axes",
            "text": "Capital goods are on the vertical axis; consumer goods are on the horizontal axis.",
            "zh": "纵轴是资本品，横轴是消费品。",
            "takeaway": "Both axes show output, not prices or time."
          },
          {
            "title": "Start with the existing capacity",
            "text": "PPC1 shows the maximum combinations possible with current resources and technology.",
            "zh": "PPC1表示现有资源和技术下的最大产出组合。",
            "takeaway": "The curve is the boundary of possible production."
          },
          {
            "title": "Improve the ability to produce",
            "text": "Better skills, more capital or better technology allow the economy to produce more.",
            "zh": "资源数量、质量或技术改善，生产能力提高。",
            "takeaway": "PPC1 → PPC2: the whole frontier shifts outwards."
          },
          {
            "title": "Read what the shift means",
            "text": "At the same output of capital goods, the economy can produce more consumer goods.",
            "zh": "资本品产量不变时，经济体能生产更多消费品。",
            "takeaway": "Higher capacity means more possible output; demand affects how much is used."
          }
        ]
      },
      "notes": " Progressive diagram: use Right/Space or Next step; Back and Reset replay the explanation. The complete native diagram is retained in Handout view."
    },
    {
      "type": "answer",
      "eyebrow": "Check",
      "title": "Fill in the blanks",
      "mode": "fillBlanks",
      "steps": [
        [
          "1",
          "Higher productivity can reduce average __________.",
          "costs"
        ],
        [
          "2",
          "Lower costs may reduce cost-push __________.",
          "inflation"
        ],
        [
          "3",
          "More competitive exports may improve the current __________.",
          "account"
        ],
        [
          "4",
          "Better skills may reduce structural __________.",
          "unemployment"
        ]
      ]
    },
    {
      "type": "section",
      "eyebrow": "Part 3",
      "title": "Evaluation",
      "zhTitle": "评价"
    },
    {
      "type": "discussion",
      "layout": "question-only",
      "question": "The government opens a new school today. Will factories become more productive tomorrow?",
      "notes": "Schooling takes time before students enter the workforce. 政府今天开办新学校，工厂明天就会更有生产率吗？"
    },
    {
      "type": "cards",
      "eyebrow": "Learn",
      "title": "Time lags and opportunity cost",
      "cards": [
        [
          "Time lag 时间滞后",
          "Education can take years to change workers’ skills and output."
        ],
        [
          "Opportunity cost 机会成本",
          "Money spent on training cannot also fund the next-best alternative, such as healthcare."
        ]
      ]
    },
    {
      "type": "quiz",
      "eyebrow": "Check",
      "question": "Which statement identifies an opportunity cost?",
      "choices": [
        "Training benefits take five years to appear.",
        "Funding training means giving up a planned healthcare improvement.",
        "The training teaches useful skills.",
        "Productivity rises after the course."
      ],
      "answer": 1,
      "prompt": "Opportunity cost is the next-best alternative forgone, not the delay before benefits appear."
    },
    {
      "type": "discussion",
      "layout": "question-only",
      "question": "A training programme raises average skills. Could some people still gain little from it?",
      "notes": "Access may be limited by income, region or course requirements; skills may not match available jobs. 平均技能提高时，为什么有些人仍可能受益很少？"
    },
    {
      "type": "cards",
      "eyebrow": "Learn",
      "title": "Targeting and access",
      "cards": [
        [
          "Targeting 针对性",
          "Courses must match the skills firms actually need."
        ],
        [
          "Access 获得机会",
          "Benefits may favour workers or regions that can access the programme."
        ]
      ]
    },
    {
      "type": "peerTask",
      "taskType": "missingSentence",
      "eyebrow": "Pair task",
      "title": "Complete the missing sentence",
      "zhPrompt": "与同伴一起，写出一条有条件的政策判断。",
      "steps": [
        [
          "1",
          "Government-funded training may reduce unemployment."
        ],
        [
          "2",
          "__________",
          "It is more likely to work if the course teaches skills needed for available jobs."
        ],
        [
          "3",
          "A course with no suitable job opportunities may have little effect."
        ]
      ],
      "missingSentenceStep": 2,
      "missingSentenceAnswer": "It is more likely to work if the course teaches skills needed for available jobs."
    },
    {
      "type": "exam",
      "eyebrow": "Exam practice",
      "title": "Discuss whether improving education can help a government achieve its macroeconomic aims. [8]",
      "keywords": [
        "productivity",
        "employment",
        "prices",
        "exports",
        "opportunity cost"
      ],
      "prompt": "Plan a developed benefit, a developed limitation and a judgement explaining when the policy is most effective."
    },
    {
      "type": "modelAnswer",
      "partialReview": [
        ".modelAnswerCard"
      ],
      "showLinkChips": false,
      "eyebrow": "Model answer",
      "title": "Discuss whether improving education can help a government achieve its macroeconomic aims. [8]",
      "answer": "Improving education can raise workers’ skills and productivity. Firms can then produce more output per worker, raising productive capacity and allowing real GDP to increase. Better qualifications can also help unemployed workers match vacancies. However, education takes years to affect the workforce and has an opportunity cost: funding it may mean giving up healthcare improvements. If courses do not teach the skills employers need, unemployment may remain high. Education is therefore more likely to help when it targets skills shortages, is accessible to the people who need it and is supported by demand for their work.",
      "links": [
        "productivity",
        "employment",
        "prices",
        "exports",
        "opportunity cost"
      ]
    },
    {
      "type": "exam",
      "eyebrow": "Exam practice",
      "title": "Discuss whether supply-side policies are the best way to reduce inflation. [8]",
      "keywords": [
        "productivity",
        "costs",
        "time lag",
        "demand-pull inflation",
        "monetary policy"
      ],
      "prompt": "Plan a developed benefit, a developed limitation and a judgement explaining when the policy is most effective.",
      "notes": "Optional consolidation after the core education writing task. For a 40-minute class, skip this question and its model if needed and go to Exit ticket."
    },
    {
      "type": "modelAnswer",
      "partialReview": [
        ".modelAnswerCard"
      ],
      "showLinkChips": false,
      "eyebrow": "Model answer",
      "title": "Discuss whether supply-side policies are the best way to reduce inflation. [8]",
      "answer": "Supply-side policies can reduce inflation if they raise productivity and lower firms' costs. Lower costs can reduce cost-push inflation and higher output can reduce pressure on prices. However, there may be a long time lag, and these policies may not solve demand-pull inflation quickly. Monetary policy may be more effective if inflation is caused by excessive spending.",
      "links": [
        "productivity",
        "costs",
        "time lag",
        "demand-pull inflation",
        "monetary policy"
      ]
    },
    {
      "type": "answer",
      "eyebrow": "Check",
      "title": "Exit ticket",
      "zhTitle": "离堂小测",
      "mode": "fillBlanks",
      "steps": [
        [
          "1",
          "Supply-side policy can raise long-run output by increasing productive __________.",
          "capacity"
        ],
        [
          "2",
          "It may improve price stability by lowering production __________.",
          "costs"
        ],
        [
          "3",
          "It may improve the current account by raising international __________.",
          "competitiveness"
        ],
        [
          "4",
          "Evaluation should mention time lags, targeting or opportunity __________.",
          "cost"
        ]
      ],
      "cue": "Answer before leaving."
    }
  ]
};
