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
      "durationMinutes": 100,
      "coreEndSlide": 52,
      "previousEndpoint": "Supply-side policy: limitations and evaluation",
      "status": "Prepared; not yet reported taught",
      "suggestedPause": "After romania-population-change, if taught across two sessions"
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
      "notes": "First deck of Unit 5, following the Supply-side policy sequence. Prepared, not reported taught. The expanded visual and exam sequence may be taught across two periods. Four parts: natural change; migration; why rates vary; original papers. Optimum population and the effects of population change belong to 5.3.2, the next deck."
    },
    {
      "id": "recall-supply-side-policy",
      "type": "classificationTask",
      "layout": "population-written",
      "eyebrow": "Recall",
      "title": "Recall: supply-side policy",
      "items": [
        {
          "text": "Why may education and training take years to raise productive capacity?",
          "answer": "Skills take time to develop, and the training must match the jobs employers need."
        },
        {
          "text": "How may a successful supply-side policy reduce cost-push inflation?",
          "answer": "Higher productivity can lower average costs, reducing pressure on firms to raise prices."
        },
        {
          "text": "Why may government supply-side policies increase a budget deficit in the short run?",
          "answer": "Education, training, healthcare and infrastructure require government spending before higher tax revenue may arrive."
        }
      ],
      "notes": "Three minutes independently. All three questions retrieve the immediately preceding Supply-side policy sequence, especially its effects and evaluation decks. Reveal models one at a time.",
      "sharePrompt": "Write independently; reveal each model separately."
    },
    {
      "id": "population-objectives",
      "type": "outcomes",
      "eyebrow": "Objectives",
      "title": "By the end, you can",
      "bullets": [
        "Define birth rate, death rate, immigration, emigration and net migration.",
        "Calculate how births, deaths and migration change a country's population.",
        "Explain why population growth rates vary and apply this to past-paper questions."
      ],
      "zhBullets": [
        "定义出生率、死亡率、迁入、迁出与净迁移。",
        "计算出生、死亡与迁移如何改变一国人口。",
        "解释人口增长率差异，并运用于历年真题。"
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
      "lead": "Count the changes · predict the final population before each reveal",
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
          "term": "number of births",
          "zh": "出生人数",
          "explain": false
        },
        {
          "term": "per 1,000",
          "zh": "每千人口",
          "explain": false
        },
        {
          "term": "per year",
          "zh": "每年",
          "explain": false
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/sleeping-newborn-baby.jpg",
        "alt": "A newborn baby sleeping on a soft white blanket.",
        "caption": "",
        "credit": "Stephanie Pratt / Wikimedia Commons / CC0 1.0; resized",
        "source": "https://commons.wikimedia.org/wiki/File:Sleeping-baby.jpg"
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
      "notes": "Consolidate the town example into the definition. The town's birth rate is 14 per 1,000 of the population per year. Keep the three marking elements visible: births, per 1,000 population and per year."
    },
    {
      "id": "birth-rate-map",
      "type": "visualPause",
      "layout": "population-map",
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/birth-rate-map-2023.svg",
        "alt": "World choropleth map of birth rates in 2023, showing the highest rates concentrated in sub-Saharan Africa.",
        "credit": "UN World Population Prospects (2024), processed by Our World in Data / CC BY 4.0",
        "source": "https://ourworldindata.org/grapher/crude-birth-rate?tab=map&time=2023"
      },
      "sources": [
        {
          "label": "Data",
          "ref": "UN World Population Prospects 2024 · 2023 estimates",
          "note": "Birth rate: annual number of live births per 1,000 people in the total population."
        }
      ],
      "notes": "Visual reset between definitions. Ask students to locate the darkest and lightest regions, then predict whether the next map—the death rate—will show the same pattern. Return to explanations in Part 3."
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
          "term": "number of deaths",
          "zh": "死亡人数",
          "explain": false
        },
        {
          "term": "per 1,000",
          "zh": "每千人口",
          "explain": false
        },
        {
          "term": "per year",
          "zh": "每年",
          "explain": false
        }
      ],
      "showExamples": false,
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
      "id": "death-rate-map",
      "type": "visualPause",
      "layout": "population-map",
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/death-rate-map-2023.svg",
        "alt": "World choropleth map of crude death rates in 2023.",
        "credit": "UN World Population Prospects (2024), processed by Our World in Data / CC BY 4.0",
        "source": "https://ourworldindata.org/grapher/crude-death-rate?tab=map&time=2023"
      },
      "sources": [
        {
          "label": "Data",
          "ref": "UN World Population Prospects 2024 · crude death rate · 2023",
          "note": "Annual number of deaths per 1,000 people. The crude rate is not adjusted for differences in age structure."
        }
      ],
      "notes": "Visual reset before natural increase. Ask what is surprising when this is compared with the birth-rate map. Do not explain every cause yet; establish that two independently varying rates must be combined."
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
          "term": "birth rate",
          "zh": "出生率",
          "explain": false
        },
        {
          "term": "death rate",
          "zh": "死亡率",
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
      "id": "why-net-migration-rates-vary",
      "type": "cards",
      "layout": "population-photo-grid",
      "eyebrow": "Learn",
      "title": "Causes of differences in net migration",
      "zhTitle": "净迁移差异的原因",
      "cards": [
        {
          "title": "Jobs and income 工作与收入",
          "body": "More jobs or higher wages attract immigrants because people may gain income and a higher living standard."
        },
        {
          "title": "Education and healthcare 教育与医疗",
          "body": "Better services attract migrants by improving skills, employment prospects, health or quality of life."
        },
        {
          "title": "Family links 家庭联系",
          "body": "People may immigrate to join relatives who already live in another country."
        },
        {
          "title": "Conflict, crime and poverty 冲突、犯罪与贫困",
          "body": "Threats to safety or living standards push people to emigrate."
        }
      ],
      "cardVisuals": [
        {
          "type": "photo",
          "src": "../../../assets/images/population/migration-jobs-generated.png",
          "alt": "A jobseeker with a suitcase meets an employer beside a large WE ARE HIRING sign.",
          "caption": "A jobseeker with a suitcase meets an employer beside a large WE ARE HIRING sign.",
          "credit": "AI-generated teaching illustration / OpenAI image generation / 22 September 2026; fictional scene, not a documentary photograph."
        },
        {
          "type": "photo",
          "src": "../../../assets/images/population/migration-services-generated.png",
          "alt": "A classroom lesson beside a doctor examining a child illustrates access to education and healthcare.",
          "caption": "A classroom lesson beside a doctor examining a child illustrates access to education and healthcare.",
          "credit": "AI-generated teaching illustration / OpenAI image generation / 22 September 2026; fictional scene, not a documentary photograph."
        },
        {
          "type": "photo",
          "src": "../../../assets/images/population/migration-family-generated.png",
          "alt": "An arriving daughter and child reunite with relatives at an airport, with luggage beside them.",
          "caption": "An arriving daughter and child reunite with relatives at an airport, with luggage beside them.",
          "credit": "AI-generated teaching illustration / OpenAI image generation / 22 September 2026; fictional scene, not a documentary photograph."
        },
        {
          "type": "photo",
          "src": "../../../assets/images/population/migration-conflict-generated.png",
          "alt": "A family carries luggage away from damaged homes towards a border crossing.",
          "caption": "A family carries luggage away from damaged homes towards a border crossing.",
          "credit": "AI-generated teaching illustration / OpenAI image generation / 22 September 2026; fictional scene, not a documentary photograph."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 23 · 5.3.1",
          "note": "How and why net migration rates can vary between countries."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/23 · October/November 2024 · Q2(c) [6] · 0455_w24_ms_23 · page 14",
          "extract": "Pull factors include higher income, more job opportunities, better healthcare and education, and family links. Push factors include conflict, crime, corruption, intolerance, famine, pollution, climate change, poverty and high taxes."
        }
      ],
      "notes": "Reveal one illustrated cause at a time. These AI-generated scenes illustrate job opportunities, services, family reunion and conflict; they do not depict particular real events. The conflict image is one example of the wider push-factor category. Ask whether each factor is mainly a pull factor, a push factor or can be both. Countries differ in the strength of these factors and in migration restrictions. Net migration still depends on immigration relative to emigration, not on one flow alone."
    },
    {
      "id": "romania-visual-pause",
      "type": "visualPause",
      "layout": "population-photo-pause",
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/bucharest-skyline.jpg",
        "alt": "A wide skyline view across Bucharest, Romania.",
        "caption": "Bucharest, Romania",
        "credit": "Dan Mihai Pitea / Wikimedia Commons / CC BY-SA 3.0",
        "source": "https://commons.wikimedia.org/wiki/File:Bucharest_Skyline.jpg",
        "objectPosition": "50% 48%"
      },
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · February/March 2025 · Q1 source",
          "extract": "Romania's population fell from 23 million in 1990 to 19 million in 2022."
        }
      ],
      "notes": "Observation question: this is Bucharest, Romania. What two flows could make a country's population fall even while its economy and cities continue to change? Bridge directly to the real 2025 Paper 2 case."
    },
    {
      "id": "romania-population-change",
      "type": "cards",
      "layout": "population-romania-case",
      "eyebrow": "Real case · Romania",
      "title": "Romania lost 4 million people",
      "lead": "1990: 23 million → 2022: 19 million",
      "cards": [
        {
          "title": "Birth rate fell",
          "body": "Fewer births reduced natural population growth."
        },
        {
          "title": "Death rate also fell",
          "body": "This change alone would tend to increase, not reduce, population growth."
        },
        {
          "title": "Net emigration",
          "body": "More Romanian workers left to live abroad than migrants arrived to live in Romania."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "notes": "Reveal the data before the explanations. Ask which two changes explain the fall: the accepted answers are the fall in birth rate and emigration/net emigration. Use the falling death rate as a deliberate distractor: fewer deaths would not explain the population decline.",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · February/March 2025 · Q1 source and Q1(b) [2]",
          "question": "Identify two reasons why Romania's population fell between 1990 and 2022.",
          "extract": "Romania's population fell from 23 million to 19 million. Its birth rate and death rate both fell. More Romanian workers left the country to work and live abroad than workers arrived from other countries."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/22 · February/March 2025 · Q1(b) [2] · 0455_m25_ms_22",
          "extract": "Fall in birth rate (1). Emigration / net emigration / people leaving the country (1)."
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
      "title": "Why population growth rates vary between countries",
      "zhTitle": "为什么各国人口增长率不同",
      "sources": [
        {
          "label": "Syllabus",
          "ref": "Cambridge 0455 · 2027–2029 · page 23 · 5.3.1",
          "note": "Factors that affect population growth: definitions of birth rate, death rate, net migration, immigration and emigration; how and why birth rates, death rates and net migration can vary between countries."
        }
      ]
    },
    {
      "id": "birth-rate-extremes",
      "type": "cards",
      "layout": "population-extremes",
      "eyebrow": "Real-world comparison",
      "title": "Birth rates: 46.4 versus 4.6",
      "cards": [
        {
          "title": "Central African Republic",
          "body": "46.4 births per 1,000 people in 2023 — the highest UN WPP estimate."
        },
        {
          "title": "South Korea",
          "body": "4.6 births per 1,000 people in 2023 — among the world's lowest."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Data",
          "ref": "UN World Population Prospects 2024 · birth rate · 2023",
          "note": "Central African Republic: 46.36 births per 1,000 people. South Korea: 4.57. Values rounded to one decimal place."
        }
      ],
      "notes": "Reveal the two values separately. Ask students to explain why the same definition can produce such different values; do not treat income as the only cause."
    },
    {
      "id": "causes-of-birth-rate-differences",
      "type": "cards",
      "layout": "population-photo-grid",
      "eyebrow": "Learn",
      "title": "Causes of differences in birth rates",
      "zhTitle": "出生率差异的原因",
      "cards": [
        {
          "title": "Age of marriage 结婚年龄",
          "body": "A lower average age of marriage may lengthen the period in which families have children, raising the birth rate."
        },
        {
          "title": "Education and birth control 教育与避孕",
          "body": "Less education about, or access to, birth control may lead to more births."
        },
        {
          "title": "Age structure and fertility 年龄结构与生育率",
          "body": "A young female population means more women of child-bearing age, which may raise fertility and births."
        }
      ],
      "cardVisuals": [
        {
          "type": "photo",
          "src": "../../../assets/images/population/young-married-couple-romania.jpg",
          "alt": "A young married couple by a lake in Romania.",
          "credit": "Britchi Mirela / Wikimedia Commons / CC BY-SA 4.0",
          "source": "https://commons.wikimedia.org/wiki/File:Bucharest,_ROMANIA._Mogosoaia_Palace_._The_lake_with_a_young_marriage_couple.jpg"
        },
        {
          "type": "photo",
          "src": "../../../assets/images/population/family-planning-education-generated.jpg",
          "alt": "A community health educator leads an adult workshop about planning the timing and size of families.",
          "credit": "OpenAI image generation / Created for this lesson · 21 September 2026"
        },
        {
          "type": "photo",
          "src": "../../../assets/images/population/young-female-population-generated.jpg",
          "alt": "Young adult women stand beneath a demographic graphic highlighting the female population of child-bearing age.",
          "credit": "OpenAI image generation / Created for this lesson · 21 September 2026"
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2025 · Q4(b) [4] · 0455_s25_ms_21",
          "extract": "High birth rate (1) due to low age of marriage / lack of education on birth control (1). High fertility rate (1) due to a young female population (1)."
        }
      ],
      "notes": "Reveal one photographed cause at a time. These are Cambridge-accepted causal examples, not a complete universal list. Ask students to state the direction: earlier marriage, less education/access and a younger female population tend to raise birth rates, other things equal."
    },
    {
      "id": "fertility-rate-definition",
      "type": "term",
      "eyebrow": "Supporting measure",
      "title": "Fertility rate",
      "zhTitle": "生育率",
      "term": "fertility rate",
      "definition": "The fertility rate is the average number of children born per woman.",
      "definitionZh": "生育率是平均每位女性生育的子女数。",
      "keyTerms": [
        {
          "term": "average number of children",
          "zh": "平均子女数",
          "explain": false
        },
        {
          "term": "per woman",
          "zh": "每位女性",
          "explain": false
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/newborn-baby.jpg",
        "alt": "A newborn baby held by a midwife moments after birth.",
        "credit": "Ernest F / Wikimedia Commons / CC BY-SA 3.0",
        "source": "https://commons.wikimedia.org/wiki/File:HumanNewborn.JPG"
      },
      "showExamples": false,
      "layout": "photo-term",
      "sources": [
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2025 · Q4(b) [4]",
          "extract": "High fertility rate (1) due to a young female population (1)."
        },
        {
          "label": "Data definition",
          "ref": "UN World Population Prospects 2024 · total fertility rate",
          "note": "The formal demographic measure estimates births per woman from current age-specific fertility rates. The slide uses the concise IGCSE classroom wording."
        }
      ],
      "notes": "Distinguish fertility rate from birth rate. Fertility uses women as its denominator; birth rate uses the whole population. Fertility rate is a useful supporting measure and appears in recent mark schemes even though 5.3.1 explicitly requires the birth-rate definition."
    },
    {
      "id": "fertility-rate-map",
      "type": "visualPause",
      "layout": "population-map",
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/fertility-rate-map-2023.svg",
        "alt": "World choropleth map of total fertility rates in 2023.",
        "credit": "UN World Population Prospects (2024), processed by Our World in Data / CC BY 4.0",
        "source": "https://ourworldindata.org/grapher/children-per-woman-un?tab=map&time=2023"
      },
      "sources": [
        {
          "label": "Data",
          "ref": "UN World Population Prospects 2024 · total fertility rate · 2023",
          "note": "Average number of children per woman, estimated from current age-specific fertility rates."
        }
      ],
      "notes": "Observation question: compare this map with the birth-rate map. The patterns are similar but not identical because birth rate also depends on the age and sex structure of the whole population."
    },
    {
      "id": "fertility-rate-extremes",
      "type": "cards",
      "layout": "population-extremes",
      "eyebrow": "Real-world comparison",
      "title": "Fertility: 6.13 versus 0.72",
      "cards": [
        {
          "title": "Somalia",
          "body": "6.13 children per woman in 2023 — the highest UN WPP estimate."
        },
        {
          "title": "South Korea",
          "body": "0.72 children per woman in 2023 — among the world's lowest."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Data",
          "ref": "UN World Population Prospects 2024 · total fertility rate · 2023",
          "note": "Somalia: 6.13 children per woman. South Korea: 0.72."
        }
      ],
      "notes": "Use the contrast to check the denominator: children per woman, not births per 1,000 people."
    },
    {
      "id": "death-rate-extremes",
      "type": "cards",
      "layout": "population-extremes",
      "eyebrow": "Real-world comparison",
      "title": "Death rates can reverse expectations",
      "cards": [
        {
          "title": "Monaco: 21.0 per 1,000",
          "body": "A very old population raises the crude death rate even with high living standards."
        },
        {
          "title": "Qatar: 0.9 per 1,000",
          "body": "A very young, migrant-heavy population helps keep the crude death rate low."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Data",
          "ref": "UN World Population Prospects 2024 · crude death rate · 2023",
          "note": "Monaco: 20.97 deaths per 1,000 people. Qatar: 0.93. The indicator is not age-standardised."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2023 · Q3(a) [2]",
          "extract": "Differences in average age (1) may cause death rates to vary between countries (1)."
        }
      ],
      "notes": "This comparison prevents the misconception that high death rate always means poor healthcare. Death rate measures deaths per 1,000 residents; countries with more elderly residents can have higher crude death rates."
    },
    {
      "id": "causes-of-low-death-rates",
      "type": "cards",
      "layout": "population-photo-grid",
      "eyebrow": "Learn",
      "title": "Causes of lower death rates",
      "zhTitle": "较低死亡率的原因",
      "cards": [
        {
          "title": "Higher incomes 较高收入",
          "body": "Households can afford better food, housing and living conditions."
        },
        {
          "title": "Healthcare 医疗",
          "body": "Prevention and treatment help more people survive illness."
        },
        {
          "title": "Nutrition and clean water 营养与清洁用水",
          "body": "Better nutrition, sanitation and safe water reduce disease and early deaths."
        },
        {
          "title": "Education 教育",
          "body": "Health education can improve knowledge of hygiene, nutrition and disease prevention."
        }
      ],
      "cardVisuals": [
        {
          "type": "photo",
          "src": "../../../assets/images/population/higher-income-healthy-living-generated.jpg",
          "alt": "Adults prepare nutritious food with clean water in a safe, well-maintained home.",
          "credit": "OpenAI image generation / Created for this lesson · 21 September 2026"
        },
        IGCSE.photos.marketEconomicSystem.vaccination,
        {
          "type": "photo",
          "src": "../../../assets/images/population/clean-water-and-sanitation.jpg",
          "alt": "Children using a clean water pump in Sindh, Pakistan.",
          "credit": "UK Department for International Development / Wikimedia Commons / CC BY-SA 2.0",
          "source": "https://commons.wikimedia.org/wiki/File:Providing_clean_water_and_sanitation_(5351673235).jpg"
        },
        {
          "type": "photo",
          "src": "../../../assets/images/population/health-education-generated.jpg",
          "alt": "A community health educator demonstrates handwashing, safe food and clean-water practices to adults.",
          "credit": "OpenAI image generation / Created for this lesson · 21 September 2026"
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2023 · Q3(a) [2] · 0455_s23_ms_21",
          "extract": "Accepted differences include income / standard of living (1), healthcare (1), education (1) and nutrition (1)."
        }
      ],
      "notes": "Reveal each photographed cause. Ask students to complete one causal sentence orally: the factor improves, fewer people die, therefore the death rate falls. These are accepted examples, not an exhaustive list."
    },
    {
      "id": "causes-of-high-death-rates",
      "type": "cards",
      "layout": "population-photo-grid",
      "eyebrow": "Learn",
      "title": "Causes of higher death rates",
      "zhTitle": "较高死亡率的原因",
      "cards": [
        {
          "title": "Older population 老龄化人口",
          "body": "A larger share of elderly residents raises deaths per 1,000 people."
        },
        {
          "title": "Infectious disease 传染病",
          "body": "A wider spread of serious disease can increase deaths."
        },
        {
          "title": "War and conflict 战争与冲突",
          "body": "Violence, displacement and damaged services can raise mortality."
        },
        {
          "title": "Pollution and unsafe work 污染与不安全工作",
          "body": "Poor air, water or working conditions can increase illness and death."
        }
      ],
      "cardVisuals": [
        {
          "type": "photo",
          "src": "../../../assets/images/population/elderly-woman-portrait.jpg",
          "alt": "Portrait of an elderly woman.",
          "credit": "Ferdinand Reus / Wikimedia Commons / CC BY-SA 2.0",
          "source": "https://commons.wikimedia.org/wiki/File:Elderly_Gambian_woman_face_portrait.jpg"
        },
        {
          "type": "photo",
          "src": "../../../assets/images/population/ebola-health-workers-ppe.jpg",
          "alt": "Health workers wear protective equipment outside an Ebola isolation ward in Lagos, Nigeria.",
          "credit": "CDC Global / Wikimedia Commons / CC BY 2.0",
          "source": "https://commons.wikimedia.org/wiki/File:WHO_in_PPE.jpg"
        },
        {
          "type": "photo",
          "src": "../../../assets/images/population/chernihiv-hospital-war-1.jpg",
          "alt": "A cardiology hospital in Chernihiv damaged by bombing in 2022.",
          "credit": "Star61 / Wikimedia Commons / CC BY-SA 4.0",
          "source": "https://commons.wikimedia.org/wiki/File:Chernihiv_cardiology_hospital_1.jpg"
        },
        {
          "type": "photo",
          "src": "../../../assets/images/population/polluted-unsafe-industrial-work-generated.jpg",
          "alt": "Workers operate machinery in a dusty, polluted industrial environment.",
          "credit": "OpenAI image generation / Created for this lesson · 21 September 2026"
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Mark scheme",
          "ref": "0455/21 · May/June 2023 · Q3(a) [2] · 0455_s23_ms_21",
          "extract": "Accepted differences include average age (1), infectious disease (1), war / conflict (1), natural disasters (1), air / water pollution (1), working conditions (1) and crime (1)."
        }
      ],
      "notes": "Keep the factors distinct. Age structure explains why Monaco can have a high crude death rate; disease, conflict and pollution are different causal routes."
    },
    {
      "id": "infant-mortality-rate-definition",
      "type": "term",
      "eyebrow": "Supporting measure",
      "title": "Infant mortality rate",
      "zhTitle": "婴儿死亡率",
      "term": "infant mortality rate",
      "definition": "The infant mortality rate is the number of deaths of children under one year of age per 1,000 live births in a year.",
      "definitionZh": "婴儿死亡率是一年内每千名活产婴儿中未满一岁儿童的死亡数。",
      "keyTerms": [
        {
          "term": "under one year of age",
          "zh": "未满一岁",
          "explain": false
        },
        {
          "term": "per 1,000",
          "zh": "每千名",
          "explain": false
        },
        {
          "term": "live births",
          "zh": "活产婴儿",
          "explain": false
        }
      ],
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/newborn-baby.jpg",
        "alt": "A newborn baby held by a midwife moments after birth.",
        "credit": "Ernest F / Wikimedia Commons / CC BY-SA 3.0",
        "source": "https://commons.wikimedia.org/wiki/File:HumanNewborn.JPG"
      },
      "showExamples": false,
      "layout": "photo-term",
      "sources": [
        {
          "label": "Paper 1",
          "ref": "0455/12 · May/June 2024 · Q26",
          "question": "A rise in which factor would cause an increase in the population growth rate of a country?",
          "extract": "Infant mortality rate appears as a distractor; a rise would reduce, not increase, population growth."
        },
        {
          "label": "Data definition",
          "ref": "UN Inter-agency Group for Child Mortality Estimation 2025",
          "note": "The number of deaths before age one per 1,000 live births."
        }
      ],
      "notes": "This is not the same denominator as the death rate. Infant mortality uses live births; the death rate uses the total population. The term is not one of the five definitions named in syllabus 5.3.1, but it appears in Cambridge Paper 1 and is needed for accurate interpretation."
    },
    {
      "id": "infant-mortality-map",
      "type": "visualPause",
      "layout": "population-map",
      "visual": {
        "type": "photo",
        "src": "../../../assets/images/population/infant-mortality-map-2024.svg",
        "alt": "World choropleth map of infant mortality in 2024.",
        "credit": "UN Inter-agency Group for Child Mortality Estimation (2025), processed by Our World in Data / CC BY 4.0",
        "source": "https://ourworldindata.org/grapher/infant-mortality?tab=map&time=2024"
      },
      "sources": [
        {
          "label": "Data",
          "ref": "UN IGME 2025 · infant mortality · 2024",
          "note": "The downloaded map shows deaths before age one per 100 live births. Multiply the percentage value by 10 to express the usual rate per 1,000 live births."
        }
      ],
      "notes": "Observation question: compare the spatial pattern with the birth-rate and fertility maps. Do not claim that infant mortality alone determines family size; ask students for a possible relationship, then state that healthcare, income, nutrition, sanitation and education influence both outcomes."
    },
    {
      "id": "infant-mortality-extremes",
      "type": "cards",
      "layout": "population-extremes",
      "eyebrow": "Real-world comparison",
      "title": "Infant mortality: 71.9 versus 1.8",
      "cards": [
        {
          "title": "South Sudan",
          "body": "71.9 deaths before age one per 1,000 live births in 2024."
        },
        {
          "title": "Japan",
          "body": "1.8 deaths before age one per 1,000 live births in 2024."
        }
      ],
      "partialReview": [
        ".cardgrid > .card"
      ],
      "sources": [
        {
          "label": "Data",
          "ref": "UN IGME 2025 · infant mortality · 2024",
          "note": "South Sudan: 7.19 deaths per 100 live births = 71.9 per 1,000. Japan: 0.18 per 100 = 1.8 per 1,000."
        }
      ],
      "notes": "Check that students use the full denominator: per 1,000 live births, not per 1,000 of the total population."
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
      "id": "developing-country-growth-paper1",
      "type": "quiz",
      "eyebrow": "0455/13 · M/J/2023 · Q25",
      "question": "What might explain the high population growth in some developing countries?",
      "choices": [
        "high birth rates and falling death rates",
        "low immigration and high emigration",
        "falling birth rates and rising death rates",
        "falling life expectancy"
      ],
      "answer": 0,
      "prompt": "A. A high birth rate adds many people while a falling death rate means fewer people are removed, so natural increase is high.",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/13 · May/June 2023 · Q25",
          "question": "What might explain the high population growth in some developing countries?"
        },
        {
          "label": "Mark scheme",
          "ref": "0455/13 · May/June 2023 · Q25 · official key",
          "extract": "Official answer: A."
        }
      ],
      "notes": "Original Paper 1 question and option order. Ask students to explain both halves of A before revealing the key."
    },
    {
      "id": "growth-combination-paper1",
      "type": "quiz",
      "layout": "population-options-table",
      "eyebrow": "0455/13 · O/N/2023 · Q25",
      "question": "Which combination would be most likely to increase the population of a country?",
      "optionColumns": [
        "net migration",
        "death rates",
        "birth rates"
      ],
      "choices": [
        "positive — high — high",
        "positive — low — high",
        "negative — high — low",
        "negative — low — low"
      ],
      "answer": 1,
      "prompt": "B. Positive net migration adds people, a low death rate removes fewer people and a high birth rate adds more people.",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/13 · October/November 2023 · Q25",
          "question": "Which combination would be most likely to increase the population of a country?"
        },
        {
          "label": "Mark scheme",
          "ref": "0455/13 · October/November 2023 · Q25 · official key",
          "extract": "Official answer: B."
        }
      ],
      "notes": "Original Paper 1 question and table. Students should test each column against the population-change identity before selecting B."
    },
    {
      "id": "romania-population-fall-question",
      "type": "exam",
      "eyebrow": "0455/22 · F/M/2025 · Q1(b) [2]",
      "title": "Explain why Romania’s population fell between 1990 and 2022. [2]",
      "prompt": "Use both pieces of evidence in the extract: what happened to births, and what happened to migration?",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      },
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · February/March 2025 · Q1(b) [2]",
          "question": "Explain why Romania’s population fell between 1990 and 2022.",
          "extract": "Romania’s population fell from 23 million in 1990 to 19 million in 2022. Its birth rate fell and more Romanians left the country than migrants entered it."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/22 · February/March 2025 · Q1(b) [2]",
          "extract": "Fall in birth rate (1). Emigration / net emigration / more people left Romania than entered (1)."
        }
      ]
    },
    {
      "id": "romania-population-fall-model",
      "type": "modelAnswer",
      "eyebrow": "Teacher-written model",
      "title": "Explain why Romania’s population fell between 1990 and 2022. [2]",
      "paragraphs": [
        "Romania’s birth rate fell, so fewer people were added through births.",
        "It also experienced net emigration: more people left Romania to live abroad than entered to live in Romania."
      ],
      "answer": "Romania’s birth rate fell, so fewer people were added through births.\n\nIt also experienced net emigration: more people left Romania to live abroad than entered to live in Romania.",
      "showLinkChips": false,
      "partialReview": [
        ".modelAnswerText > p"
      ],
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      },
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · February/March 2025 · Q1(b) [2]",
          "question": "Explain why Romania’s population fell between 1990 and 2022."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/22 · February/March 2025 · Q1(b) [2]",
          "extract": "Fall in birth rate (1). Emigration / net emigration / more people left Romania than entered (1)."
        }
      ]
    },
    {
      "id": "romania-future-immigration-question",
      "type": "exam",
      "eyebrow": "0455/22 · F/M/2025 · Q1(c) [2]",
      "title": "Explain why immigration into Romania may increase in the future. [2]",
      "prompt": "Develop the link from faster economic growth to a reason a migrant might choose Romania.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      },
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · February/March 2025 · Q1(c) [2]",
          "question": "Explain why immigration into Romania may increase in the future.",
          "extract": "Romania’s economy grew by 4.8% and the extract suggested that this might alter migration."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/22 · February/March 2025 · Q1(c) [2]",
          "extract": "High economic growth (1) may create more job opportunities / higher wages / higher living standards (1)."
        }
      ]
    },
    {
      "id": "romania-future-immigration-model",
      "type": "modelAnswer",
      "eyebrow": "Teacher-written model",
      "title": "Explain why immigration into Romania may increase in the future. [2]",
      "paragraphs": [
        "If Romania continues to experience high economic growth, firms may create more jobs and pay higher wages. This can attract people from other countries who expect a higher living standard."
      ],
      "answer": "If Romania continues to experience high economic growth, firms may create more jobs and pay higher wages. This can attract people from other countries who expect a higher living standard.",
      "showLinkChips": false,
      "partialReview": [
        ".modelAnswerText > p"
      ],
      "examSpec": {
        "paper": "Paper 2",
        "marks": 2
      },
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · February/March 2025 · Q1(c) [2]",
          "question": "Explain why immigration into Romania may increase in the future."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/22 · February/March 2025 · Q1(c) [2]",
          "extract": "High economic growth (1) may create more job opportunities / higher wages / higher living standards (1)."
        }
      ]
    },
    {
      "id": "birth-rate-average-age-question",
      "type": "exam",
      "layout": "population-explain",
      "eyebrow": "0455/22 · O/N/2024 · Q1(e) [4]",
      "title": "Analyse the relationship between birth rate and average age. [4]",
      "keywords": [
        "State the relationship",
        "Use Monaco and Niger",
        "Explain the relationship",
        "Recognise another influence"
      ],
      "prompt": "Use the country evidence, then explain why the relationship occurs. Do not claim that birth rate is the only influence on average age.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 4
      },
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · October/November 2024 · Q1(e) [4]",
          "question": "Analyse the relationship between birth rate and average age."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/22 · October/November 2024 · Q1(e) [4]",
          "extract": "An inverse relationship (1). Monaco had the lowest birth rate and highest average age (1); Niger had the highest birth rate and lowest average age (1). A lower birth rate means children form a smaller share of the population (1). Death rates and net migration may also affect average age (1). Accept recognition of an exception such as the Maldives and Venezuela."
        }
      ]
    },
    {
      "id": "birth-rate-average-age-model",
      "type": "modelAnswer",
      "eyebrow": "Teacher-written model",
      "title": "Analyse the relationship between birth rate and average age. [4]",
      "paragraphs": [
        "There is generally an inverse relationship: countries with lower birth rates tend to have higher average ages. Monaco had the lowest birth rate and highest average age, while Niger had the highest birth rate and lowest average age.",
        "A lower birth rate means children form a smaller share of the population, which raises the average age. However, average age also depends on death rates and net migration."
      ],
      "answer": "There is generally an inverse relationship: countries with lower birth rates tend to have higher average ages. Monaco had the lowest birth rate and highest average age, while Niger had the highest birth rate and lowest average age.\n\nA lower birth rate means children form a smaller share of the population, which raises the average age. However, average age also depends on death rates and net migration.",
      "showLinkChips": false,
      "partialReview": [
        ".modelAnswerText > p"
      ],
      "examSpec": {
        "paper": "Paper 2",
        "marks": 4
      },
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/22 · October/November 2024 · Q1(e) [4]",
          "question": "Analyse the relationship between birth rate and average age."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/22 · October/November 2024 · Q1(e) [4]",
          "extract": "An inverse relationship (1). Monaco had the lowest birth rate and highest average age (1); Niger had the highest birth rate and lowest average age (1). A lower birth rate means children form a smaller share of the population (1). Death rates and net migration may also affect average age (1)."
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
      "id": "migration-causes-question",
      "type": "exam",
      "eyebrow": "0455/23 · O/N/2024 · Q2(c) [6]",
      "title": "Analyse the causes of migration between countries. [6]",
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/23 · October/November 2024 · Q2(c) [6] · 0455_w24_qp_23 · page 4",
          "question": "Analyse the causes of migration between countries."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/23 · October/November 2024 · Q2(c) [6] · 0455_w24_ms_23 · page 14",
          "extract": "Pull factors include higher income, more job opportunities, better healthcare and education, and family links. Push factors include conflict, crime, corruption, intolerance, famine, pollution, climate change, poverty and high taxes. Limit of three marks for simply identifying causes without analysis."
        }
      ],
      "layout": "population-explain",
      "keywords": [
        "Pull factor: identify",
        "Explain why it attracts",
        "Push factor: identify",
        "Explain why it causes departure"
      ],
      "prompt": "Work independently. Develop at least two causes; a list of factors is limited to three marks.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 6
      },
      "notes": "Original question. Give students six minutes. The visible plan is a thinking scaffold, not a compulsory Cambridge paragraph structure. The scheme rewards developed causes and caps undeveloped identification at three marks."
    },
    {
      "id": "migration-causes-model",
      "type": "modelAnswer",
      "eyebrow": "Teacher-written model",
      "title": "Analyse the causes of migration between countries. [6]",
      "paragraphs": [
        "People may immigrate to a country where wages are higher and more jobs are available. Earning a higher income allows them to buy more goods and services, so their living standard may rise.",
        "People may also move to a country with better education. This can improve their own or their children's skills, raising their chance of gaining secure, well-paid employment.",
        "Conflict or high crime can push people to emigrate from a country. Moving to a more secure country reduces the threat to their safety and quality of life."
      ],
      "answer": "People may immigrate to a country where wages are higher and more jobs are available. Earning a higher income allows them to buy more goods and services, so their living standard may rise.\n\nPeople may also move to a country with better education. This can improve their own or their children's skills, raising their chance of gaining secure, well-paid employment.\n\nConflict or high crime can push people to emigrate from a country. Moving to a more secure country reduces the threat to their safety and quality of life.",
      "showLinkChips": false,
      "partialReview": [
        ".modelAnswerText > p"
      ],
      "sources": [
        {
          "label": "Question paper",
          "ref": "0455/23 · October/November 2024 · Q2(c) [6] · 0455_w24_qp_23 · page 4",
          "question": "Analyse the causes of migration between countries."
        },
        {
          "label": "Mark scheme",
          "ref": "0455/23 · October/November 2024 · Q2(c) [6] · 0455_w24_ms_23 · page 14",
          "extract": "Pull factors include higher income, more job opportunities, better healthcare and education, and family links. Push factors include conflict, crime, corruption, intolerance, famine, pollution, climate change, poverty and high taxes. Limit of three marks for simply identifying causes without analysis."
        }
      ],
      "links": [
        "higher wages",
        "more jobs",
        "better education",
        "conflict",
        "high crime"
      ],
      "notes": "Teacher-written model, not an official answer. Reveal one developed cause at a time and ask students to underline the cause and its consequence. Other mark-scheme routes include healthcare, family links, famine, pollution, climate change, poverty and high taxes.",
      "examSpec": {
        "paper": "Paper 2",
        "marks": 6
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
          "title": "Rates and natural change",
          "body": "Birth and death rates are measured per 1,000 people per year; birth rate minus death rate gives the rate of natural increase."
        },
        {
          "title": "Migration",
          "body": "Net migration = immigration − emigration. Population change = natural increase + net migration."
        },
        {
          "title": "Why rates vary",
          "body": "Living standards, healthcare, education, age structure, conflict and migration incentives help explain differences between countries."
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
