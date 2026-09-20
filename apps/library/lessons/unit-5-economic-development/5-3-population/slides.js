/* Canonical lesson source. Official syllabus 2027-2029 p23; original papers and schemes checked. See authoring/igcse-economics/population/. */
window.IGCSE=window.IGCSE||{};
IGCSE.lesson={
  "meta": {
    "code": "5.3.1",
    "unit": "Unit 5 - Economic development",
    "title": "Population growth — Cambridge IGCSE Economics 0455",
    "lessonLabel": "Population growth",
    "courseLabel": "Cambridge IGCSE Economics 0455",
    "creatorLabel": "Created by Samuel Oehler-Huang, Suzhou Foreign Language School",
    "deliveryPlan": {
      "durationMinutes": 75,
      "coreEndSlide": 34,
      "previousEndpoint": "Households: spending, saving and borrowing",
      "status": "Prepared; not yet reported taught",
      "suggestedPause": "After population-increase-paper1, if taught across two sessions"
    }
  },
  "slides": [
    {
      "id": "5-3-1-population-growth",
      "type": "hero",
      "eyebrow": "5.3.1 · Population",
      "title": "Population growth",
      "zhTitle": "人口增长",
      "kicker": "Births, deaths and migration",
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/shibuya-crossing-crowd-2025.jpg",
        "alt": "A dense crowd crossing a busy Tokyo intersection in 2025.",
        "caption": "",
        "credit": "組曲師 / Wikimedia Commons / CC BY 4.0",
        "source": "https://commons.wikimedia.org/wiki/File:Shibuya_Crossing_in_2025.jpg"
      },
      "layout": "population-hero",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 23 · 5.3.1",
          "note": "Factors that affect population growth: definitions of birth rate, death rate, net migration, immigration and emigration; how and why birth rates, death rates and net migration can vary between countries."
        }
      ],
      "notes": "First deck of Unit 5, after Households. Prepared, not reported taught. Allow 70–80 minutes including independent writing and feedback; a natural pause is after the second Paper 1 check. Four parts: natural change; migration; why rates vary; original papers. Optimum population and the effects of population change belong to 5.3.2, the next deck."
    },
    {
      "id": "recall-households-and-banks",
      "type": "classificationTask",
      "layout": "population-written",
      "eyebrow": "Recall",
      "title": "Recall: households and banks",
      "items": [
        {
          "text": "What is saving?",
          "answer": "Income not spent."
        },
        {
          "text": "Other things equal, what happens to borrowing when the interest rate rises?",
          "answer": "Borrowing tends to fall because loans become more expensive to repay."
        },
        {
          "text": "What does lender of last resort mean?",
          "answer": "The central bank lends to commercial banks that cannot obtain the funds they need elsewhere."
        }
      ],
      "notes": "Three minutes independently. Recent retrieval from Households plus spaced retrieval from Central banks. Reveal models one at a time.",
      "sharePrompt": "Write independently; reveal each model separately."
    },
    {
      "id": "population-objectives",
      "type": "outcomes",
      "eyebrow": "Objectives",
      "title": "By the end, you can",
      "bullets": [
        "Define birth rate, death rate and net migration.",
        "Explain how births, deaths and migration change a country's population.",
        "Apply these ideas to original past-paper questions."
      ],
      "zhBullets": [
        "定义出生率、死亡率与净迁移。",
        "解释出生、死亡与迁移如何改变一国人口。",
        "运用这些概念解答历年真题。"
      ],
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 23 · 5.3.1",
          "note": "Factors that affect population growth: definitions of birth rate, death rate, net migration, immigration and emigration; how and why birth rates, death rates and net migration can vary between countries."
        }
      ]
    },
    {
      "id": "births-deaths-natural-increase",
      "type": "section",
      "eyebrow": "Part 1",
      "title": "Birth rate, death rate and natural increase",
      "zhTitle": "出生率、死亡率与自然增长",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 23 · 5.3.1",
          "note": "Factors that affect population growth: definitions of birth rate, death rate, net migration, immigration and emigration; how and why birth rates, death rates and net migration can vary between countries."
        }
      ]
    },
    {
      "id": "town-one-year",
      "type": "cards",
      "layout": "population-natural",
      "eyebrow": "A teaching example",
      "title": "One year in a town of 1,000 people",
      "lead": "Each person icon represents 50 residents · predict the change before each reveal",
      "cards": [
        {
          "title": "14 births 出生",
          "body": "Fourteen babies are born and join the town's population."
        },
        {
          "title": "9 deaths 死亡",
          "body": "Nine residents die and leave the population."
        },
        {
          "title": "1,000 + 14 − 9 = 1,005",
          "body": "More births than deaths: the population rises by 5 over the year."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "notes": "Fictional town; introduce the year, the 1,000 residents and the icons before the first click. Ask students to predict whether the population rises or falls before revealing the result. Reverse every step. Assume no one moves in or out yet; migration comes in Part 2.",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 5.3.1",
          "note": "Birth rate: the number of births per 1000 population per year. Death rate: the number of deaths per 1000 population per year. Natural increase: birth rate exceeds death rate."
        }
      ]
    },
    {
      "id": "birth-rate-definition",
      "type": "term",
      "eyebrow": "Key term",
      "title": "Birth rate",
      "zhTitle": "出生率",
      "term": "birth rate",
      "definition": "The birth rate is the number of births per 1,000 of the population per year.",
      "definitionZh": "出生率是每年每千人口中的出生人数。",
      "keyTerms": [
        {
          "term": "per 1,000 of the population per year",
          "zh": "每年每千人口",
          "explain": false
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/newborn-baby.jpg",
        "alt": "A newborn baby held by a midwife moments after birth.",
        "caption": "",
        "credit": "Ernest F / Wikimedia Commons / CC BY-SA 3.0",
        "source": "https://commons.wikimedia.org/wiki/File:HumanNewborn.JPG"
      },
      "showExamples": false,
      "layout": "photo-term",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 5.3.1",
          "note": "Birth rate: the number of births per 1000 population per year."
        }
      ],
      "notes": "Consolidate the town example into the definition. The town's birth rate is 14 per 1,000 per year. A rate allows fair comparison between countries of different sizes; the total number of births does not."
    },
    {
      "id": "death-rate-definition",
      "type": "term",
      "eyebrow": "Key term",
      "title": "Death rate",
      "zhTitle": "死亡率",
      "term": "death rate",
      "definition": "The death rate is the number of deaths per 1,000 of the population per year.",
      "definitionZh": "死亡率是每年每千人口中的死亡人数。",
      "keyTerms": [
        {
          "term": "per 1,000 of the population per year",
          "zh": "每年每千人口",
          "explain": false
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/elderly-woman-portrait.jpg",
        "alt": "Portrait of an elderly woman.",
        "caption": "",
        "credit": "Ferdinand Reus / Wikimedia Commons / CC BY-SA 2.0",
        "source": "https://commons.wikimedia.org/wiki/File:Elderly_Gambian_woman_face_portrait.jpg"
      },
      "showExamples": false,
      "layout": "photo-term",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 5.3.1",
          "note": "Death rate: the number of deaths per 1000 population per year."
        }
      ],
      "notes": "The town's death rate is 9 per 1,000 per year. Also called the mortality rate. Life expectancy is the average number of years a person can expect to live; lower death rates usually mean higher life expectancy."
    },
    {
      "id": "natural-increase-definition",
      "type": "term",
      "eyebrow": "Key term",
      "title": "Natural increase",
      "zhTitle": "自然增长",
      "term": "natural increase",
      "definition": "Natural increase occurs when the birth rate is higher than the death rate.",
      "definitionZh": "当出生率高于死亡率时，人口自然增长。",
      "keyTerms": [
        {
          "term": "birth rate higher than death rate",
          "zh": "出生率高于死亡率",
          "explain": false
        }
      ],
      "visual": {
        "type": "photo",
        "src": "./assets/natural-increase.svg",
        "alt": "Illustrated people: fourteen births minus nine deaths leaves five more residents.",
        "caption": "",
        "credit": "Original classroom illustration"
      },
      "showExamples": false,
      "layout": "photo-term",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 5.3.1",
          "note": "Natural increase: birth rate exceeds death rate."
        }
      ],
      "notes": "Natural change ignores migration. When the death rate is higher than the birth rate, the population naturally decreases. The town's natural increase is 14 − 9 = 5 per 1,000 per year."
    },
    {
      "id": "birth-rate-calculation",
      "type": "cards",
      "eyebrow": "Worked example",
      "title": "Calculating the birth rate",
      "lead": "A town has 50,000 residents. 700 babies are born in one year. What is the birth rate?",
      "cards": [
        {
          "title": "birth rate = births ÷ population × 1,000",
          "body": "The formula counts births per 1,000 residents."
        },
        {
          "title": "= 700 ÷ 50,000 × 1,000",
          "body": "Substitute the town's figures."
        },
        {
          "title": "= 14 per 1,000 per year",
          "body": "The same rate as the 1,000-person town: 14 births per 1,000 residents."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "notes": "Give students a minute to attempt the calculation before revealing the method. The death rate uses the same structure: deaths ÷ population × 1,000. Rates, not totals, allow comparison between towns or countries of different sizes.",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 5.3.1",
          "note": "Birth rate: the number of births per 1000 population per year. Death rate: the number of deaths per 1000 population per year."
        }
      ]
    },
    {
      "id": "natural-growth-paper1",
      "type": "quiz",
      "eyebrow": "0455/11 · M/J/2025 · Q26",
      "question": "Which combination of statistics is used to calculate the natural population growth of a country?",
      "choices": [
        "birth rate — net immigration",
        "death rate — birth rate",
        "emigration — death rate",
        "immigration — emigration"
      ],
      "answer": 1,
      "prompt": "B. Natural population growth compares births and deaths only: birth rate minus death rate. A, C and D include migration statistics, which change the total population but are not part of natural growth.",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/11 · M/J/2025 · Q26 · original printed page 10",
          "question": "Which combination of statistics is used to calculate the natural population growth of a country?"
        },
        {
          "label": "Mark scheme",
          "ref": "0455/11 · M/J/2025 · Q26 · official key page 2",
          "extract": "Official answer: B."
        },
        {
          "label": "Teaching model",
          "ref": "Teacher-written explanation",
          "note": "B. Natural population growth compares births and deaths only: birth rate minus death rate. A, C and D include migration statistics, which change the total population but are not part of natural growth."
        }
      ],
      "notes": "Original question, option order and official key checked against the local PDFs. Independent attempt before selecting. B. Natural population growth compares births and deaths only: birth rate minus death rate. A, C and D include migration statistics, which change the total population but are not part of natural growth.",
      "layout": "population-options-table",
      "optionColumns": [
        "1st statistic",
        "2nd statistic"
      ]
    },
    {
      "id": "migration-section",
      "type": "section",
      "eyebrow": "Part 2",
      "title": "Migration",
      "zhTitle": "人口迁移",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 23 · 5.3.1",
          "note": "Factors that affect population growth: definitions of birth rate, death rate, net migration, immigration and emigration; how and why birth rates, death rates and net migration can vary between countries."
        }
      ]
    },
    {
      "id": "discuss-why-people-move",
      "type": "discussion",
      "eyebrow": "Small-group discussion",
      "layout": "population-discussion",
      "question": "Why might a worker choose to move from one country to another?",
      "followUp": "Suggest two reasons. For each, explain how it influences the decision.",
      "answer": "Higher wages or more job opportunities can attract workers to another country. Others move to join family members, or to escape conflict, poverty or persecution. Reasons that attract people are called pull factors; reasons that drive people away are called push factors.",
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/airport-departure-hall.jpg",
        "alt": "Travellers with luggage in an airport departure hall.",
        "caption": "",
        "credit": "Wolfmann / Wikimedia Commons / CC BY-SA 4.0",
        "source": "https://commons.wikimedia.org/wiki/File:Bergen_Lufthavn,_Flesland_(Bergen_Airport,_BGO)_Terminal_3_avgangshall_departure_hall_NORWAY_2017-11-02_b.jpg"
      },
      "sources": [
        {
          "label": "Mark scheme",
          "ref": "0455/23 · October/November 2024 · Q2(c) [6] · 0455_w24_ms_23",
          "extract": "Pull factors: higher income / wages; more job opportunities / lower unemployment; better healthcare; better education; family members in another country. Push factors: escape conflict / high crime / corruption; intolerance; famine; pollution; climate change; poverty; high taxes."
        }
      ],
      "notes": "Groups of 3–4: allow about one minute, then invite reasoned examples. Keep suggested answers hidden until groups have shared. Migration here means moving to live in another country, not a holiday or a daily commute."
    },
    {
      "id": "town-migration",
      "type": "cards",
      "layout": "population-migration",
      "eyebrow": "The same town, the same year",
      "title": "People move in and out",
      "lead": "The town now has 1,005 residents · predict the change before each reveal",
      "cards": [
        {
          "title": "8 people arrive to live in the town",
          "body": "New residents move in from other countries."
        },
        {
          "title": "5 residents leave to live abroad",
          "body": "People move out to live in other countries."
        },
        {
          "title": "8 − 5 = +3",
          "body": "More arrivals than leavers: migration adds 3 residents."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "notes": "Continue the town case from Part 1. Count arrivals and leavers separately before revealing the net result. Moving to live somewhere is different from visiting. Reverse every step.",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 5.3.1",
          "note": "Immigration: people entering a country to live there. Emigration: people exit / leave a country to live in another country. Net migration: immigration minus emigration."
        }
      ]
    },
    {
      "id": "immigration-and-emigration",
      "type": "compare",
      "eyebrow": "Key terms",
      "title": "Moving in, moving out",
      "leftTitle": "Immigration 迁入",
      "rightTitle": "Emigration 迁出",
      "left": [
        "People entering a country to live there.",
        "Adds to the country's population."
      ],
      "right": [
        "People leaving a country to live in another country.",
        "Reduces the country's population."
      ],
      "partialReview": [
        ".splitCols > .card"
      ],
      "question": "Same movement, two viewpoints: an emigrant from one country is an immigrant in another.",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 5.3.1",
          "note": "Immigration: people entering a country to live there. Emigration: people exit / leave a country to live in another country."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/23 · May/June 2023 · Q4(a) [2] · 0455_s23_ms_23",
          "extract": "Emigration is when people exit / leave (1) a country (1) to live in another country (1)."
        }
      ],
      "notes": "Teach the pair together: the same person is an emigrant from the country they leave and an immigrant in the country they enter. Use the mark-scheme wording for emigration; the Define question appears in Part 4."
    },
    {
      "id": "net-migration-definition",
      "type": "term",
      "eyebrow": "Key term",
      "title": "Net migration",
      "zhTitle": "净迁移",
      "term": "net migration",
      "definition": "Net migration is immigration minus emigration.",
      "definitionZh": "净迁移等于迁入移民减去迁出移民。",
      "keyTerms": [
        {
          "term": "immigration − emigration",
          "zh": "迁入 − 迁出",
          "explain": false
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/airport-departure-hall.jpg",
        "alt": "Travellers with luggage in an airport departure hall.",
        "caption": "",
        "credit": "Wolfmann / Wikimedia Commons / CC BY-SA 4.0",
        "source": "https://commons.wikimedia.org/wiki/File:Bergen_Lufthavn,_Flesland_(Bergen_Airport,_BGO)_Terminal_3_avgangshall_departure_hall_NORWAY_2017-11-02_b.jpg"
      },
      "showExamples": false,
      "layout": "photo-term",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 5.3.1",
          "note": "Net migration: immigration minus emigration."
        },
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · formulas",
          "note": "Net migration = immigration − emigration."
        }
      ],
      "notes": "The town's net migration is 8 − 5 = +3. Positive net migration adds to the population; negative net migration (net emigration) reduces it. Net migration can also be expressed as a rate per 1,000."
    },
    {
      "id": "town-total-change",
      "type": "cards",
      "eyebrow": "Putting it together",
      "title": "The town's population change",
      "lead": "Population change = natural increase + net migration",
      "cards": [
        {
          "title": "Natural increase: +5",
          "body": "Births (14) minus deaths (9)."
        },
        {
          "title": "Net migration: +3",
          "body": "Immigrants (8) minus emigrants (5)."
        },
        {
          "title": "Total change: +8",
          "body": "1,000 + 5 + 3 = 1,008 residents at the end of the year."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "notes": "Ask students to combine the two changes before revealing the total. Both components can be negative: a country can shrink through natural decrease, net emigration, or both — Romania in Part 4 is a real example.",
      "sources": [
        {
          "label": "Definitions",
          "ref": "Retained IGCSE Economics definitions · 2026 · 5.3.1",
          "note": "Natural increase: birth rate exceeds death rate. Net migration: immigration minus emigration."
        }
      ]
    },
    {
      "id": "population-increase-paper1",
      "type": "quiz",
      "eyebrow": "0455/13 · M/J/2025 · Q26",
      "question": "What will increase a country's population, all other things being equal?",
      "choices": [
        "a rise in emigration",
        "a rise in immigration",
        "death rates higher than birth rates",
        "decreased life expectancy"
      ],
      "answer": 1,
      "prompt": "B. More immigration adds residents. A raises departures; C means a natural decrease; D tends to raise the death rate, increasing natural decrease or reducing natural increase.",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/13 · M/J/2025 · Q26 · original printed page 10",
          "question": "What will increase a country's population, all other things being equal?"
        },
        {
          "label": "Mark scheme",
          "ref": "0455/13 · M/J/2025 · Q26 · official key page 2",
          "extract": "Official answer: B."
        },
        {
          "label": "Teaching model",
          "ref": "Teacher-written explanation",
          "note": "B. More immigration adds residents. A raises departures; C means a natural decrease; D tends to raise the death rate, increasing natural decrease or reducing natural increase."
        }
      ],
      "notes": "Original question, option order and official key checked against the local PDFs. Independent attempt before selecting. B. More immigration adds residents. A raises departures; C means a natural decrease; D tends to raise the death rate, increasing natural decrease or reducing natural increase. Suggested pause point if the lesson runs across two sessions."
    },
    {
      "id": "why-rates-vary-section",
      "type": "section",
      "eyebrow": "Part 3",
      "title": "Why birth and death rates vary between countries",
      "zhTitle": "为什么各国出生率与死亡率不同",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 23 · 5.3.1",
          "note": "Factors that affect population growth: definitions of birth rate, death rate, net migration, immigration and emigration; how and why birth rates, death rates and net migration can vary between countries."
        }
      ]
    },
    {
      "id": "discuss-birth-rates",
      "type": "discussion",
      "eyebrow": "Small-group discussion",
      "layout": "population-discussion",
      "question": "Monaco has one of the world's lowest birth rates; Niger has one of the highest. Why might birth rates differ so much between countries?",
      "followUp": "Suggest two reasons and explain each.",
      "answer": "Where the average age of marriage is low or education about birth control is limited, birth rates tend to be higher. A high birth rate can also reflect lower incomes and living standards, and a younger population has more people of child-bearing age.",
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/fiscal-policy/students-in-a-classroom.jpg",
        "alt": "Students working at desks in a classroom.",
        "caption": "",
        "credit": "Ente75 / Wikimedia Commons",
        "source": "https://commons.wikimedia.org/wiki/File:Students_in_a_classroom.jpg"
      },
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · October/November 2024 · Q1(e) [4] · 0455_w24_qp_22",
          "question": "Analyse the relationship between birth rate and average age. The source data show Monaco with the lowest birth rate and the highest average age, and Niger with the highest birth rate and the lowest average age."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2025 · Q4(b) [4] · 0455_s25_ms_21",
          "extract": "High birth rate (1) due to e.g. low age of marriage / lack of education on birth control (1). High fertility rates (1) due to e.g. young female population (1)."
        }
      ],
      "notes": "Groups of 3–4: allow about one minute. The Monaco–Niger contrast comes from the original 2024 O/N 22 source data. Keep suggested answers hidden until groups have shared; the next slide organises the accepted reasons."
    },
    {
      "id": "rates-vary-overview",
      "type": "cards",
      "eyebrow": "Overview",
      "title": "Why birth and death rates vary between countries",
      "layout": "population-factor-overview",
      "cards": [
        {
          "title": "1. Income and nutrition",
          "body": "收入与营养"
        },
        {
          "title": "2. Healthcare",
          "body": "医疗保健"
        },
        {
          "title": "3. Education",
          "body": "教育"
        },
        {
          "title": "4. Average age",
          "body": "平均年龄"
        },
        {
          "title": "5. War and natural disasters",
          "body": "战争与自然灾害"
        }
      ],
      "partialReview": false,
      "sources": [
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2023 · Q3(a) [2] · 0455_s23_ms_21",
          "extract": "Two from differences in: income / standard of living; healthcare; education; nutrition; lifestyles / suicide rates; average age; spread of Covid / infectious diseases; war / conflict; natural disasters; air pollution / water pollution; conditions of work; level of crime. Do not accept differences in population size as these affect number rather than rate."
        }
      ],
      "notes": "Show all five numbered influences together and give students time to copy the headings. These five come from the accepted reasons in 0455/21 M/J/2023 Q3(a); the scheme also accepts lifestyles, infectious disease, pollution, working conditions and crime. Differences in population size are not accepted because they change the number, not the rate."
    },
    {
      "id": "healthcare-lowers-death-rate",
      "type": "flow",
      "eyebrow": "Learn",
      "title": "How better healthcare lowers the death rate",
      "zhTitle": "更好的医疗如何降低死亡率",
      "mode": "fillBlanks",
      "nodes": [
        [
          {
            "text": "Healthcare __________",
            "answer": "improves",
            "zh": "医疗改善"
          },
          {
            "text": "More people __________ serious illness",
            "answer": "survive",
            "zh": "更多人挺过重病"
          },
          {
            "text": "Death rate __________",
            "answer": "falls",
            "zh": "死亡率下降"
          }
        ]
      ],
      "sources": [
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2025 · Q4(b) [4] · 0455_s25_ms_21",
          "extract": "Low death rate / high life expectancy (1) due to e.g. good quality healthcare (1)."
        }
      ],
      "notes": "Other things equal. Better healthcare also raises life expectancy, so an older average age can follow. Higher incomes and better nutrition work through the same mechanism: healthier people live longer."
    },
    {
      "id": "why-birth-rates-can-be-high",
      "type": "cards",
      "eyebrow": "Learn",
      "title": "Why a birth rate can be high",
      "cards": [
        {
          "title": "Low age of marriage 结婚年龄较早",
          "body": "People tend to have children earlier, and more of them."
        },
        {
          "title": "Limited education on birth control 缺乏避孕教育",
          "body": "Families may be larger when contraception is less understood or less available."
        },
        {
          "title": "A young population 人口结构年轻",
          "body": "More people of child-bearing age raises the fertility rate."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2025 · Q4(b) [4] · 0455_s25_ms_21",
          "extract": "High birth rate (1) due to e.g. low age of marriage / lack of education on birth control (1). High fertility rates (1) due to e.g. young female population (1)."
        }
      ],
      "notes": "Each card is an accepted reason from the 2025 M/J 21 Q4(b) scheme; reveal one at a time. The fertility rate is the average number of children per woman. These are tendencies between countries, not rules about every family."
    },
    {
      "id": "high-growth-paper1",
      "type": "quiz",
      "eyebrow": "0455/12 · F/M/2024 · Q25",
      "question": "An economy has a high rate of population growth.\nWhat is most likely to have caused this?",
      "choices": [
        "The average years of schooling is relatively high.",
        "The birth rate is lower than the death rate.",
        "The retirement age has increased.",
        "There are more immigrants than emigrants."
      ],
      "answer": 3,
      "prompt": "D. More immigrants than emigrants means positive net migration, which adds to the population. B would cause a natural decrease; A and C do not directly add people.",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/12 · F/M/2024 · Q25 · original printed page 9",
          "question": "An economy has a high rate of population growth.\nWhat is most likely to have caused this?"
        },
        {
          "label": "Mark scheme",
          "ref": "0455/12 · F/M/2024 · Q25 · official key page 2",
          "extract": "Official answer: D."
        },
        {
          "label": "Teaching model",
          "ref": "Teacher-written explanation",
          "note": "D. More immigrants than emigrants means positive net migration, which adds to the population. B would cause a natural decrease; A and C do not directly add people."
        }
      ],
      "notes": "Original question, option order and official key checked against the local PDFs. Independent attempt before selecting. D. More immigrants than emigrants means positive net migration, which adds to the population. B would cause a natural decrease; A and C do not directly add people."
    },
    {
      "id": "population-data-paper1",
      "type": "quiz",
      "eyebrow": "0455/13 · M/J/2024 · Q26",
      "question": "The table shows population statistics for three countries in a particular year.\nWhat can be concluded from the table?",
      "choices": [
        "country X has fewer females than country Y",
        "country Y has the smallest population increase",
        "country Y has the highest living standards",
        "country Z has a decreasing population"
      ],
      "answer": 3,
      "prompt": "D. Z: natural increase = (40 − 35) × 40,000 = 200,000, minus net emigration of 1,000,000, so its population falls by 800,000. X grows by 40,000 + 20,000 = 60,000 and Y by 60,000 + 50,000 = 110,000, so B is wrong. The table shows nothing about females (A) or living standards (C).",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/13 · M/J/2024 · Q26 · original printed page 9",
          "question": "The table shows population statistics for three countries in a particular year.\nWhat can be concluded from the table?"
        },
        {
          "label": "Mark scheme",
          "ref": "0455/13 · M/J/2024 · Q26 · official key page 2",
          "extract": "Official answer: D."
        },
        {
          "label": "Teaching model",
          "ref": "Teacher-written explanation",
          "note": "D. Z: natural increase = (40 − 35) × 40,000 = 200,000, minus net emigration of 1,000,000, so its population falls by 800,000. X grows by 40,000 + 20,000 = 60,000 and Y by 60,000 + 50,000 = 110,000, so B is wrong. The table shows nothing about females (A) or living standards (C)."
        }
      ],
      "notes": "Original question, option order, table and official key checked against the local PDFs. Independent attempt before selecting. Guide the calculation: natural change = (birth rate − death rate) × population ÷ 1,000, then add net migration. D. Z: natural increase = (40 − 35) × 40,000 = 200,000, minus net emigration of 1,000,000, so its population falls by 800,000. X grows by 40,000 + 20,000 = 60,000 and Y by 60,000 + 50,000 = 110,000, so B is wrong. The table shows nothing about females (A) or living standards (C).",
      "layout": "population-data-mcq",
      "dataTable": {
        "headers": [
          "country",
          "population size (millions)",
          "birth rate (per thousand of population per year)",
          "death rate (per thousand of population per year)",
          "net migration"
        ],
        "rows": [
          [
            "X",
            20,
            10,
            8,
            "+20 000"
          ],
          [
            "Y",
            30,
            20,
            18,
            "+50 000"
          ],
          [
            "Z",
            40,
            40,
            35,
            "−1 000 000"
          ]
        ]
      }
    },
    {
      "id": "population-past-papers",
      "type": "section",
      "eyebrow": "Part 4",
      "title": "Past-paper questions",
      "zhTitle": "历年真题",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 23 · 5.3.1",
          "note": "Factors that affect population growth: definitions of birth rate, death rate, net migration, immigration and emigration; how and why birth rates, death rates and net migration can vary between countries."
        }
      ]
    },
    {
      "id": "emigration-define-question",
      "type": "exam",
      "eyebrow": "0455/23 · M/J/2023 · Q4(a) [2]",
      "title": "Define emigration. [2]",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/23 · May/June 2023 · Q4(a) [2] · 0455_s23_qp_23",
          "question": "Define emigration."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/23 · May/June 2023 · Q4(a) [2] · 0455_s23_ms_23",
          "extract": "Emigration is when people exit / leave (1) a country (1) to live in another country (1)."
        }
      ],
      "prompt": "Write a full definition. The scheme has three marking points for two marks.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      }
    },
    {
      "id": "emigration-define-model",
      "type": "modelAnswer",
      "eyebrow": "Teacher-written model",
      "title": "Define emigration. [2]",
      "paragraphs": [
        "Emigration is when people leave a country to live in another country."
      ],
      "answer": "Emigration is when people leave a country to live in another country.",
      "showLinkChips": false,
      "partialReview": [
        ".modelAnswerText > p"
      ],
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/23 · May/June 2023 · Q4(a) [2] · 0455_s23_qp_23",
          "question": "Define emigration."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/23 · May/June 2023 · Q4(a) [2] · 0455_s23_ms_23",
          "extract": "Emigration is when people exit / leave (1) a country (1) to live in another country (1)."
        }
      ],
      "notes": "The model covers all three marking points: leaving, a country, to live in another country. Moving for a holiday or a business trip is not emigration.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      }
    },
    {
      "id": "romania-population-question",
      "type": "exam",
      "eyebrow": "0455/22 · F/M/2025 · Q1(b) [2]",
      "title": "Identify two reasons why Romania's population fell between 1990 and 2022. [2]",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · February/March 2025 · Q1(b) [2] · 0455_m25_qp_22",
          "question": "Identify two reasons why Romania's population fell between 1990 and 2022."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/22 · February/March 2025 · Q1(b) [2] · 0455_m25_ms_22",
          "extract": "Fall in birth rate (1) emigration / net emigration / people leaving the country (1)."
        }
      ],
      "prompt": "Identify two distinct reasons. No developed explanation is required by “Identify”.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      },
      "notes": "The same Romanian source as the Households lesson: falling birth rate and emigration reduced the population. A fall in the birth rate below the death rate causes natural decrease; net emigration removes residents."
    },
    {
      "id": "romania-population-model",
      "type": "modelAnswer",
      "eyebrow": "Teacher-written model",
      "title": "Identify two reasons why Romania's population fell between 1990 and 2022. [2]",
      "paragraphs": [
        "The birth rate fell.",
        "People emigrated — more people left Romania than moved in."
      ],
      "answer": "The birth rate fell.\n\nPeople emigrated — more people left Romania than moved in.",
      "showLinkChips": false,
      "partialReview": [
        ".modelAnswerText > p"
      ],
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · February/March 2025 · Q1(b) [2] · 0455_m25_qp_22",
          "question": "Identify two reasons why Romania's population fell between 1990 and 2022."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/22 · February/March 2025 · Q1(b) [2] · 0455_m25_ms_22",
          "extract": "Fall in birth rate (1) emigration / net emigration / people leaving the country (1)."
        }
      ],
      "notes": "One mark for each reason. A falling birth rate below the death rate gives natural decrease; net emigration reduces the population further.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      }
    },
    {
      "id": "death-rates-vary-question",
      "type": "exam",
      "eyebrow": "0455/21 · M/J/2023 · Q3(a) [2]",
      "title": "Identify two reasons why death rates may vary between countries. [2]",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/21 · May/June 2023 · Q3(a) [2] · 0455_s23_qp_21",
          "question": "Identify two reasons why death rates may vary between countries."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2023 · Q3(a) [2] · 0455_s23_ms_21",
          "extract": "Two from differences in: income / standard of living; healthcare; education; nutrition; lifestyles / suicide rates; average age; spread of Covid / infectious diseases; war / conflict; natural disasters; air pollution / water pollution; conditions of work; level of crime. Do not accept differences in population size as these affect number rather than rate. If more than two reasons are given, consider the first three."
        }
      ],
      "prompt": "Name two different reasons. Differences in population size are not accepted.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      }
    },
    {
      "id": "death-rates-vary-model",
      "type": "modelAnswer",
      "eyebrow": "Teacher-written model",
      "title": "Identify two reasons why death rates may vary between countries. [2]",
      "paragraphs": [
        "Differences in healthcare.",
        "Differences in nutrition."
      ],
      "answer": "Differences in healthcare.\n\nDifferences in nutrition.",
      "showLinkChips": false,
      "partialReview": [
        ".modelAnswerText > p"
      ],
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/21 · May/June 2023 · Q3(a) [2] · 0455_s23_qp_21",
          "question": "Identify two reasons why death rates may vary between countries."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2023 · Q3(a) [2] · 0455_s23_ms_21",
          "extract": "Two from differences in: income / standard of living; healthcare; education; nutrition; lifestyles / suicide rates; average age; spread of Covid / infectious diseases; war / conflict; natural disasters; air pollution / water pollution; conditions of work; level of crime. Do not accept differences in population size as these affect number rather than rate. If more than two reasons are given, consider the first three."
        }
      ],
      "notes": "Two accepted reasons, one mark each; the scheme accepts a broad list, including income, education, average age, war and natural disasters. Do not imply these two are uniquely correct.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      }
    },
    {
      "id": "high-growth-exit",
      "type": "exam",
      "eyebrow": "Check · Exit ticket 离堂小测",
      "title": "Explain two reasons why a country may have a high population growth rate. [4]",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/21 · May/June 2025 · Q4(b) [4] · 0455_s25_qp_21",
          "question": "Explain two reasons why a country may have a high population growth rate."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2025 · Q4(b) [4] · 0455_s25_ms_21",
          "extract": "High birth rate (1) due to e.g. low age of marriage / lack of education on birth control (1). Low death rate / high life expectancy (1) due to e.g. good quality healthcare (1). Immigration / net immigration (1) due to e.g. high incomes (1). High fertility rates (1) due to e.g. young female population (1). Birth rate higher than the death rate (1) results in higher natural growth rate (1). One mark each for each of two reasons identified and one mark each for each of two explanations. If more than two reasons given, consider the first three."
        }
      ],
      "layout": "population-explain",
      "keywords": [
        "Reason 1: identify",
        "Explain why it raises growth",
        "Reason 2: identify",
        "Explain why it raises growth"
      ],
      "prompt": "Work independently. Write one developed explanation for each of two reasons.",
      "notes": "Assessed exit: 4 minutes, four marks using the original scheme. Each reason needs one identification and one explanation. Keep the plan rows visible while students write.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 4
      }
    },
    {
      "id": "high-growth-exit-model",
      "type": "modelAnswer",
      "eyebrow": "Teacher-written model",
      "title": "Explain two reasons why a country may have a high population growth rate. [4]",
      "paragraphs": [
        "The country may have a high birth rate, for example because of a low average age of marriage, so many babies are born each year.",
        "It may have a low death rate, for example because of good quality healthcare, so fewer people die each year."
      ],
      "answer": "The country may have a high birth rate, for example because of a low average age of marriage, so many babies are born each year.\n\nIt may have a low death rate, for example because of good quality healthcare, so fewer people die each year.",
      "showLinkChips": false,
      "partialReview": [
        ".modelAnswerText > p"
      ],
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/21 · May/June 2025 · Q4(b) [4] · 0455_s25_qp_21",
          "question": "Explain two reasons why a country may have a high population growth rate."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2025 · Q4(b) [4] · 0455_s25_ms_21",
          "extract": "High birth rate (1) due to e.g. low age of marriage / lack of education on birth control (1). Low death rate / high life expectancy (1) due to e.g. good quality healthcare (1). Immigration / net immigration (1) due to e.g. high incomes (1). High fertility rates (1) due to e.g. young female population (1). Birth rate higher than the death rate (1) results in higher natural growth rate (1). One mark each for each of two reasons identified and one mark each for each of two explanations. If more than two reasons given, consider the first three."
        }
      ],
      "links": [
        "high birth rate",
        "low average age of marriage",
        "low death rate",
        "good quality healthcare"
      ],
      "notes": "Complete teacher-written model: two accepted identifications with development. Net immigration due to high incomes is another valid choice. Reveal paragraphs separately and link each explanation back to the plan rows.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 4
      }
    },
    {
      "id": "population-summary",
      "type": "cards",
      "eyebrow": "Review",
      "title": "Summary",
      "layout": "population-summary",
      "cards": [
        {
          "title": "Births, deaths and natural increase",
          "body": "Birth rate minus death rate gives natural change; more births than deaths means a natural increase."
        },
        {
          "title": "Migration",
          "body": "Net migration = immigration − emigration. Population change = natural increase + net migration."
        },
        {
          "title": "Why rates vary",
          "body": "Income and nutrition, healthcare, education, average age, and war and natural disasters explain differences between countries."
        }
      ],
      "partialReview": false,
      "notes": "Return to the three objectives. Use the exit responses to decide whether to revisit natural change, net migration or the reasons rates vary. The next deck, 5.3.2, covers optimum population and the effects of population change.",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 23 · 5.3.1",
          "note": "Factors that affect population growth: definitions of birth rate, death rate, net migration, immigration and emigration; how and why birth rates, death rates and net migration can vary between countries."
        }
      ]
    },
    {
      "id": "optional-spare-paper1",
      "type": "quiz",
      "eyebrow": "Optional · spare time · 0455/12 · M/J/2024 · Q26",
      "question": "A rise in which factor would cause an increase in the population growth rate of a country?",
      "choices": [
        "birth rate",
        "death rate",
        "infant mortality rate",
        "net emigration"
      ],
      "answer": 0,
      "prompt": "A. A higher birth rate raises natural increase. Higher death or infant mortality rates reduce growth; net emigration means more people leaving than arriving.",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/12 · M/J/2024 · Q26 · original printed page 8",
          "question": "A rise in which factor would cause an increase in the population growth rate of a country?"
        },
        {
          "label": "Mark scheme",
          "ref": "0455/12 · M/J/2024 · Q26 · official key page 2",
          "extract": "Official answer: A."
        },
        {
          "label": "Teaching model",
          "ref": "Teacher-written explanation",
          "note": "A. A higher birth rate raises natural increase. Higher death or infant mortality rates reduce growth; net emigration means more people leaving than arriving."
        }
      ],
      "notes": "Optional question for spare time after the core ending. Original question, option order and official key checked against the local PDFs. A. A higher birth rate raises natural increase. Higher death or infant mortality rates reduce growth; net emigration means more people leaving than arriving."
    }
  ]
};
