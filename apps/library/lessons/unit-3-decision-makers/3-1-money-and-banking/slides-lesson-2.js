/* Sources:
   Syllabus 2027-2029: ../../../references/igcse-economics-syllabus-2027-2029.md (3.1.1)
   Definitions 2026: ../../../references/igcse-economics-definitions-2026.md (Money, functions and characteristics)
   Paper 2 archive: ../../../references/paper-2-mark-schemes-2023-2025/3-microeconomic-decision-makers.md
   Local Paper 1 corpus: C:/Users/oehle/Documents/past-papers/economics_0455_igcse_paper1/ (2023-2025 QP/MS)
   Local Paper 2 corpus: C:/Users/oehle/Documents/past-papers/economics_0455_igcse_paper2/ (2023-2025 QP/MS)
   Key Paper 1 items: 2023MJ-12 Q11-Q12, 2023MJ-13 Q11, 2024ON-11 Q10, 2025ON-11 Q10, 2025ON-13 Q10
   Key Paper 2 items: 2023MJ-21 Q2(a), 2023ON-21 Q3(b), 2024MJ-22 Q4(b), 2025ON-23 Q3(b)
*/
window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos.moneyBanking;

IGCSE.lesson = {
  meta: {
    code: '3.1.1',
    unit: 'Unit 3 - Microeconomic decision makers',
    title: 'Money lesson 2: characteristics and exam practice - Cambridge IGCSE Economics 0455',
    lessonLabel: 'Money lesson 2',
    courseLabel: 'Cambridge IGCSE Economics 0455',
    creatorLabel: 'Created by Samuel Oehler-Huang, Suzhou Foreign Language School',
  },

  slides: [
    {
      "type": "hero",
      "eyebrow": "Overview",
      "title": "3.1.1 Money",
      "zhTitle": "货币",
      "subtitle": "Money and banking - lesson 2",
      "kicker": "Characteristics and exam practice",
      "visual": photos.coinDenominations,
      "notes": "Afternoon lesson: begin here after class 1 stopped following the functions. Suggested 40 minutes: recall 4; individual characteristics and overview 21; IC Buck discussion 5; general four-mark question and feedback 7; exit 3. Introduce each characteristic with a specific question, a photo-led definition and a quick check. Show the full overview only after all seven have been taught. Reveal model answers only after students attempt them. If time runs short, use the general characteristics question in class and set the coins question as follow-up. Banking begins lesson 3."
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
          "term": "Money",
          "answer": "Money is anything generally accepted as a means of payment."
        },
        {
          "label": "2",
          "term": "Medium of exchange",
          "answer": "Money is a medium of exchange because it is used to buy goods and services."
        },
        {
          "label": "3",
          "term": "Store of value",
          "answer": "Money is a store of value because it allows people to save value over time."
        }
      ],
      "sharePrompt": "Compare with a partner before revealing the model answers.",
      "notes": "Three minutes. Retrieve only content actually taught. Do not ask for characteristics or bank roles yet."
    },

    {
      type: 'classificationTask',
      eyebrow: 'Recall',
      title: 'Name the function',
      zhTitle: '判断货币职能',
      prompt: 'Classify each case using the four function names. Be ready to justify one.',
      zhPrompt: '用四种货币职能来判断每个案例，并准备解释其中一个。',
      categories: [
        { title: 'Medium of exchange', zhTitle: '交换媒介', clue: 'buying or selling now' },
        { title: 'Unit of account', zhTitle: '计价单位', clue: 'pricing or comparing value' },
        { title: 'Store of value', zhTitle: '价值储藏', clue: 'saving purchasing power' },
        { title: 'Deferred payment', zhTitle: '延期支付', clue: 'repaying later' },
      ],
      items: [
        { text: 'A cafe lists tea at RMB 18 and juice at RMB 24.', answer: 'Unit of account', reason: 'Prices use one common unit so customers can compare value.' },
        { text: 'A student pays RMB 18 for the tea.', answer: 'Medium of exchange', reason: 'Money is used to complete a trade now.' },
        { text: 'A family keeps RMB 3,000 for next term.', answer: 'Store of value', reason: 'Purchasing power is kept for future use.' },
        { text: 'A borrower agrees to repay RMB 600 each month.', answer: 'Deferred payment', reason: 'Money provides the agreed unit for payments made later.' },
      ],
      sharePrompt: 'Explain one answer without repeating the category clue word for word.',
    },

    {
      "type": "outcomes",
      "eyebrow": "Objectives",
      "title": "By the end, you can",
      "bullets": [
        "Explain the seven characteristics of money.",
        "Link characteristics to money functions.",
        "Write developed four-mark answers."
      ],
      "zhBullets": [
        "解释货币的七种特征。",
        "将货币特征与职能联系起来。",
        "写出有解释的四分题答案。"
      ]
    },

    {
      type: 'section',
      eyebrow: 'Part 1',
      title: 'Characteristics of effective money',
      zhTitle: '有效货币的特征',
    },

    {
      type: 'discussion',
      layout: 'diamond-question',
      question: 'Would diamonds be a good form of money?',
      visual: { ...photos.diamondPayment, caption: '', credit: 'AI-generated scenario' },
      notes: 'Ask partners to consider the attempted grocery payment. Diamonds are portable, durable and scarce, but are not generally accepted for everyday payments; quality and value vary, verification needs expertise, and cutting one does not create convenient equal-value change. Start with general acceptability, then introduce each remaining characteristic separately before showing the overview. 考虑用钻石购物：商家愿意收吗？怎样找零或判断价值？',
    },

    {
      "type": "term",
      "layout": "photo-term",
      "eyebrow": "Learn",
      "definitionCue": "Characteristic 1 of 7",
      "title": "Generally acceptable",
      "zhTitle": "普遍接受",
      "term": "generally acceptable",
      "definition": "People are willing to accept it as payment.",
      "definitionZh": "人们愿意接受它作为支付手段。",
      "keyTerms": [
        {
          "term": "accept it as payment",
          "zh": "接受它作为支付手段",
          "explain": false
        }
      ],
      "showExamples": false,
      "visual": photos.mediumExchangeCash,
      "sources": [
        {
          "label": "Definitions 2026",
          "ref": "3.1.1 Characteristics of money",
          "extract": "Generally acceptable"
        },
        {
          "label": "Paper 2 source",
          "ref": "2024MJ-22 Q4(b)",
          "question": "Explain two characteristics of money.",
          "extract": "MS basis: generally acceptable (1); people willing to accept it as payment / reward / in settlement of a debt (1)."
        }
      ]
    },

    {
      "type": "yesNoCheck",
      "eyebrow": "Check",
      "title": "Yes or no?",
      "zhTitle": "是还是不是？",
      "items": [
        {
          "statement": "A voucher accepted by just one shop is generally accepted throughout the economy.",
          "answer": false,
          "reason": "Other sellers may refuse it. General acceptability means people are widely willing to receive it in payment."
        }
      ]
    },

    {
      "type": "discussion",
      "layout": "diamond-question",
      "question": "Would you want to carry a heavy stone to pay for your lunch?",
      "visual": { ...photos.heavyStoneLunch, caption: '', credit: 'AI-generated scenario' },
      "notes": "Ask what makes a payment item convenient to carry. Then use the wallet photograph to introduce portability. 你愿意带着一块沉重的石头去买午餐吗？"
    },

    {
      "type": "term",
      "layout": "photo-term",
      "eyebrow": "Learn",
      "definitionCue": "Characteristic 2 of 7",
      "title": "Portable",
      "zhTitle": "便于携带",
      "term": "portable",
      "definition": "Money is easy to carry from one place to another.",
      "definitionZh": "货币便于从一个地方携带到另一个地方。",
      "keyTerms": [
        {
          "term": "easy to carry",
          "zh": "便于携带",
          "explain": false
        }
      ],
      "showExamples": false,
      "visual": photos.portableWallet,
      "sources": [
        {
          "label": "Definitions 2026",
          "ref": "3.1.1 Characteristics of money",
          "extract": "Portable"
        },
        {
          "label": "Paper 2 source",
          "ref": "2024MJ-22 Q4(b)",
          "question": "Explain two characteristics of money.",
          "extract": "MS basis: portable (1); easy to carry (1)."
        }
      ]
    },

    {
      "type": "answer",
      "eyebrow": "Check",
      "title": "Fill in the blanks",
      "mode": "fillBlanks",
      "steps": [
        [
          "1",
          "A banknote fits easily in a wallet, so it is __________.",
          "portable"
        ]
      ]
    },

    {
      "type": "discussion",
      "layout": "diamond-question",
      "question": "How could a shopkeeper tell whether a banknote is genuine?",
      "visual": { ...photos.recognisableBanknote, caption: '' },
      "notes": "Elicit visible designs or security features, then introduce easy identification as genuine currency. 店主怎样判断一张纸币是否为真钞？"
    },

    {
      "type": "term",
      "layout": "photo-term",
      "eyebrow": "Learn",
      "definitionCue": "Characteristic 3 of 7",
      "title": "Recognisable",
      "zhTitle": "容易识别",
      "term": "recognisable",
      "definition": "Money is easy to identify as genuine currency.",
      "definitionZh": "货币容易被识别为真正的货币。",
      "keyTerms": [
        {
          "term": "identify as genuine currency",
          "zh": "识别为真正的货币",
          "explain": false
        }
      ],
      "showExamples": false,
      "visual": photos.recognisableBanknote,
      "sources": [
        {
          "label": "Definitions 2026",
          "ref": "3.1.1 Characteristics of money",
          "extract": "Recognisable"
        },
        {
          "label": "Paper 2 source",
          "ref": "2024MJ-22 Q4(b)",
          "question": "Explain two characteristics of money.",
          "extract": "MS basis: recognisable (1); easy to see it is the country's currency (1)."
        }
      ]
    },

    {
      "type": "quiz",
      "eyebrow": "Check",
      "question": "A cashier checks the watermark on a banknote. Which characteristic is being checked?",
      "choices": [
        "Portable",
        "Recognisable",
        "Divisible",
        "Durable"
      ],
      "answer": 1,
      "prompt": "The watermark helps the cashier identify the note as genuine currency."
    },

    {
      "type": "discussion",
      "layout": "diamond-question",
      "question": "What would happen if money fell apart after being used a few times?",
      "visual": { ...photos.fragileMoney, caption: '', credit: 'AI-generated scenario' },
      "notes": "Connect repeated use to physical survival. Durability is not a guarantee of unchanged purchasing power during inflation. 如果货币使用几次就损坏，会怎样？"
    },

    {
      "type": "term",
      "layout": "photo-term",
      "eyebrow": "Learn",
      "definitionCue": "Characteristic 4 of 7",
      "title": "Durable",
      "zhTitle": "耐用",
      "term": "durable",
      "definition": "Money lasts through repeated use and does not perish easily.",
      "definitionZh": "货币能经受反复使用，不容易损坏或腐烂。",
      "keyTerms": [
        {
          "term": "lasts through repeated use",
          "zh": "经受反复使用",
          "explain": false
        }
      ],
      "showExamples": false,
      "visual": IGCSE.photos.basicEconomicProblem.welcomeIcBucksCoins,
      "sources": [
        {
          "label": "Definitions 2026",
          "ref": "3.1.1 Characteristics of money",
          "extract": "Durable"
        },
        {
          "label": "Paper 2 source",
          "ref": "2024MJ-22 Q4(b)",
          "question": "Explain two characteristics of money.",
          "extract": "MS basis: durable (1); will last some time / can be saved (1)."
        }
      ]
    },

    {
      "type": "answer",
      "eyebrow": "Check",
      "title": "Fill in the blanks",
      "mode": "fillBlanks",
      "steps": [
        [
          "1",
          "Metal coins do not perish and can be reused for a long time. They are __________.",
          "durable"
        ]
      ]
    },

    {
      "type": "discussion",
      "layout": "diamond-question",
      "question": "Would money keep its value if anyone could print as much as they wanted?",
      "visual": { ...photos.currencyProduction, caption: '', credit: 'AI-generated illustration' },
      "notes": "The image illustrates controlled banknote production. Ask students to imagine the opposite: anyone could print as much as they wanted. Elicit the need to control issue. Limited supply does not mean that the money supply can never change. 如果人人都能随意印钱，货币还能保持价值吗？"
    },

    {
      "type": "term",
      "layout": "photo-term",
      "eyebrow": "Learn",
      "definitionCue": "Characteristic 5 of 7",
      "title": "Limited in supply",
      "zhTitle": "供应有限",
      "term": "limited in supply",
      "definition": "The supply of money is controlled to help it maintain its value.",
      "definitionZh": "货币的供应受到控制，以帮助维持其价值。",
      "keyTerms": [
        {
          "term": "maintain its value",
          "zh": "维持其价值",
          "explain": false
        }
      ],
      "showExamples": false,
      "visual": photos.currencyProduction,
      "sources": [
        {
          "label": "Definitions 2026",
          "ref": "3.1.1 Characteristics of money",
          "extract": "Limited in supply"
        },
        {
          "label": "Paper 2 source",
          "ref": "2024MJ-22 Q4(b)",
          "question": "Explain two characteristics of money.",
          "extract": "MS basis: limited in supply (1); so maintains value (1)."
        }
      ]
    },

    {
      "type": "quiz",
      "eyebrow": "Check",
      "question": "Why should money be limited in supply?",
      "choices": [
        "To make every payment the same size",
        "To make it physically stronger",
        "To help it maintain its value",
        "To make it heavier to carry"
      ],
      "answer": 2,
      "prompt": "Controlling supply helps money remain scarce and maintain its value. Its quantity does not have to stay permanently fixed."
    },

    {
      "type": "discussion",
      "layout": "diamond-question",
      "question": "How could you pay exactly RMB 3 if every banknote was worth RMB 100?",
      "visual": { ...photos.smallPayment, caption: '', credit: 'AI-generated scenario' },
      "notes": "Elicit smaller denominations or change. Divisibility is about smaller units of value, not cutting up a banknote. 如果所有纸币都是100元，怎样恰好支付3元？"
    },

    {
      "type": "term",
      "layout": "photo-term",
      "eyebrow": "Learn",
      "definitionCue": "Characteristic 6 of 7",
      "title": "Divisible",
      "zhTitle": "可分割",
      "term": "divisible",
      "definition": "Money has units of different values, allowing small and large payments.",
      "definitionZh": "货币有不同面额，可以用于小额和大额支付。",
      "keyTerms": [
        {
          "term": "units of different values",
          "zh": "不同面额",
          "explain": false
        }
      ],
      "showExamples": false,
      "visual": photos.coinDenominations,
      "sources": [
        {
          "label": "Definitions 2026",
          "ref": "3.1.1 Characteristics of money",
          "extract": "Divisible"
        },
        {
          "label": "Paper 2 source",
          "ref": "2024MJ-22 Q4(b)",
          "question": "Explain two characteristics of money.",
          "extract": "MS basis: divisible (1); there should be units of different value (1)."
        }
      ]
    },

    {
      "type": "quiz",
      "eyebrow": "Check",
      "question": "Which example shows that money is divisible?",
      "choices": [
        "A note survives repeated use",
        "A shop accepts a note",
        "Two RMB 10 notes have equal value",
        "A RMB 10 note can be exchanged for ten RMB 1 coins"
      ],
      "answer": 3,
      "prompt": "Smaller denominations allow the same total value to be split into smaller payments. Tearing a note is not required."
    },

    {
      "type": "discussion",
      "layout": "diamond-question",
      "question": "Should two genuine RMB 10 notes buy the same amount?",
      "visual": { ...photos.equalNotes, caption: '', credit: 'AI-generated illustration' },
      "notes": "Focus on equal face values. Different denominations need not have equal values. 两张真正的10元纸币应有相同的购买力吗？"
    },

    {
      "type": "term",
      "layout": "photo-term",
      "eyebrow": "Learn",
      "definitionCue": "Characteristic 7 of 7",
      "title": "Uniform",
      "zhTitle": "统一",
      "term": "uniform",
      "definition": "Units of money with the same denomination have equal value.",
      "definitionZh": "相同面额的货币具有相同价值。",
      "keyTerms": [
        {
          "term": "equal value",
          "zh": "相同价值",
          "explain": false
        }
      ],
      "showExamples": false,
      "visual": photos.matchingBanknotes,
      "sources": [
        {
          "label": "Definitions 2026",
          "ref": "3.1.1 Characteristics of money",
          "extract": "Uniform"
        },
        {
          "label": "Paper 2 source",
          "ref": "2024MJ-22 Q4(b)",
          "question": "Explain two characteristics of money.",
          "extract": "MS basis: homogeneous / uniform (1); people do not prefer one note to another note of the same value (1)."
        }
      ]
    },

    {
      "type": "yesNoCheck",
      "eyebrow": "Check",
      "title": "Yes or no?",
      "zhTitle": "是还是不是？",
      "items": [
        {
          "statement": "Two genuine RMB 10 notes should have the same value even if one is newer.",
          "answer": true,
          "reason": "Uniformity means equal denominations represent equal value."
        },
        {
          "statement": "Uniformity means that a RMB 10 note and a RMB 50 note must have equal value.",
          "answer": false,
          "reason": "Only units of the same denomination have equal value."
        }
      ]
    },

    {
      type: 'yesNoCheck',
      eyebrow: 'Check',
      title: 'Yes or no?',
      zhTitle: '是还是不是？',
      items: [
        { statement: 'If only one shop accepts something as payment, it is generally acceptable as money.', answer: false, reason: 'No. Other shops will not accept it; money needs to be widely accepted in payment.' },
        { statement: 'Every RMB 10 note should represent the same value as any other RMB 10 note.', answer: true, reason: 'That is uniformity: equal denominations are equivalent.' },
        { statement: 'Coins with different denominations help make money divisible.', answer: true, reason: 'Different unit values allow small and large payments.' },
        { statement: 'Recognisable money should be easy to identify as genuine currency.', answer: true, reason: 'Users need confidence that the item is the accepted currency.' },
      ],
    },

    {
      type: 'visualPause',
      layout: 'contain-overview',
      title: 'Characteristics of money',
      visual: photos.characteristicsOverview,
      notes: 'Only show this full overview after all seven characteristics have been individually introduced and checked. Ask students to explain one characteristic in their own words.',
    },

    {
      type: 'answer',
      eyebrow: 'Check',
      mode: 'fillBlanks',
      title: 'Fill in the blanks',
      steps: [
        ['1', 'Money that fits easily into a pocket is __________.', 'portable'],
        ['2', 'Metal coins can be used repeatedly because they are __________.', 'durable'],
        ['3', 'Money needs to be limited in __________ to help maintain its value.', 'supply'],
      ],
    },

    {
      "type": "section",
      "eyebrow": "Part 2",
      "title": "Using the characteristics",
      "zhTitle": "运用货币特征"
    },

    {
      "type": "discussion",
      "layout": "question-only",
      "question": "Which of the characteristics does the IC Buck have? Which ones does it not have? How can we improve it so it can have more of the characteristics?",
      "notes": "Discuss the department currency students already use. Inspect a real IC Buck and use the actual departmental rules as evidence. Ask students to justify the characteristics it has, identify those it lacks, and connect each suggested improvement to a characteristic. Do not assume its material, denominations, acceptance rules or issue controls. IC Buck具有哪些货币特征？不具备哪些？怎样改进？"
    },

    {
      type: 'visualPause',
      layout: 'contain-overview',
      title: 'Review the characteristics of money',
      visual: photos.characteristicsOverviewDark,
      notes: 'Use this as a rapid retrieval review. Ask students to choose one labelled characteristic and explain why it helps money perform its functions.',
    },

    {
      type: 'quiz',
      eyebrow: 'Paper 1 check',
      question: 'Why do banknotes function as money?',
      choices: [
        'They are backed by gold.',
        'They are durable.',
        'They are generally acceptable.',
        'They have intrinsic value.',
      ],
      answer: 2,
      prompt: 'Durability helps, but it is not sufficient. Banknotes perform money functions because people generally accept them in payment.',
      sources: [
        {
          label: 'Paper 1 source',
          ref: '2025ON-13 Q10',
          note: 'Recent Paper 1 hinge between a helpful characteristic and the fundamental reason banknotes function as money; answer C.',
        },
      ],
    },

    {
      "type": "section",
      "eyebrow": "Part 3",
      "title": "Explaining characteristics",
      "zhTitle": "解释货币特征"
    },

    {
      "type": "discussion",
      "layout": "question-only",
      "question": "Would naming two characteristics be enough for four marks?",
      "notes": "No. Each characteristic needs a linked explanation: one mark for identification and one for development. Ask students to improve “Money is portable” aloud, then attempt the actual Paper 2 question. 四分题只写出两种特征够吗？"
    },

    {
      type: 'exam',
      eyebrow: 'Paper 2 practice',
      title: 'Explain two characteristics of money. [4]',
      examSpec: { paper: 'Paper 2', marks: 4, command: 'Explain', pattern: '2 x (1 + 1)', skills: ['k', 'an'] },
      keywordLabel: 'Build two complete links',
      keywords: ['name the characteristic', 'explain why it helps money work', 'one mark + one mark'],
      prompt: 'For each characteristic, name it and explain why it makes money effective.',
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2024MJ-22 Q4(b)',
          question: 'Explain two characteristics of money.',
          extract: 'MS basis: one mark for each of two characteristics identified and one mark for each explanation.',
        },
      ],
    },

    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Explain two characteristics of money. [4]',
      examSpec: { paper: 'Paper 2', marks: 4, command: 'Explain', pattern: '2 x (1 + 1)', skills: ['k', 'an'] },
      paragraphs: [
        'Money is portable because it is easy to carry from one transaction to another.',
        'Money is limited in supply, so its scarcity helps it maintain its value.',
      ],
      links: ['portable', 'easy to carry', 'limited in supply', 'maintain its value'],
      showLinkChips: false,
      markSchemeNote: 'Each paragraph earns one mark for the characteristic and one for its explanation. If more than two characteristics are listed, only the first three are considered.',
      partialReview: ['.modelAnswerCard', '.modelAnswerNote'],
      sources: [
        {
          label: 'Paper 2 mark scheme',
          ref: '2024MJ-22 Q4(b)',
          question: 'Explain two characteristics of money.',
          extract: 'Accepted links include portable -> easy to carry and limited in supply -> maintains value.',
        },
      ],
    },

    {
      type: 'quiz',
      eyebrow: 'Paper 1 check',
      question: 'What is not a function of money?',
      choices: [
        'Medium of exchange',
        'Portability',
        'Store of value',
        'Unit of account',
      ],
      answer: 1,
      prompt: 'Portability describes what effective money must be like, so it is a characteristic. The other three choices describe what money does, so they are functions.',
      sources: [
        {
          label: 'Paper 1 source',
          ref: '2024ON-11 Q10',
          note: 'Original Paper 1 question; answer B.',
        },
      ],
    },

    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: 'Explain two characteristics that coins possess which mean they can perform the functions of money. [4]',
      examSpec: { paper: 'Paper 2', marks: 4, command: 'Explain', pattern: '2 x (1 + 1)', skills: ['k', 'an'] },
      keywordLabel: 'Choose two complete links',
      keywords: ['characteristic', 'why coins possess it', 'function supported', 'clear development'],
      prompt: 'For each characteristic: name it, then explain how it helps coins perform a function of money.',
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2025ON-23 Q3(b)',
          question: 'Explain two characteristics that coins possess which mean they can perform the functions of money.',
          extract: 'MS basis: one mark for each characteristic and one for each development; functions count only when developed from an identified characteristic.',
        },
      ],
    },

    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Explain two characteristics that coins possess which mean they can perform the functions of money. [4]',
      examSpec: { paper: 'Paper 2', marks: 4, command: 'Explain', pattern: '2 x (1 + 1)', skills: ['k', 'an'] },
      paragraphs: [
        'Coins are generally acceptable, so buyers and sellers are willing to receive them in payment. This allows coins to act as a medium of exchange.',
        'Coins are durable because metal coins do not perish and can be reused for a long time. This supports their use as a store of value.',
      ],
      links: ['generally acceptable', 'medium of exchange', 'durable', 'store of value'],
      showLinkChips: false,
      markSchemeNote: 'Each paragraph earns one mark for the characteristic and one mark for explaining how it supports a money function.',
      partialReview: ['.modelAnswerCard', '.modelAnswerNote'],
      sources: [
        {
          label: 'Paper 2 mark scheme',
          ref: '2025ON-23 Q3(b)',
          question: 'Explain two characteristics that coins possess which mean they can perform the functions of money.',
          extract: 'Accepted developments include general acceptability -> medium of exchange and durability -> long life / store of value.',
        },
      ],
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
          "Money is __________ if it is easy to carry.",
          "portable"
        ],
        [
          "2",
          "Metal coins last through repeated use because they are __________.",
          "durable"
        ],
        [
          "3",
          "General acceptability allows coins to buy goods and services: the function is __________.",
          "medium of exchange"
        ]
      ],
      "notes": "Three minutes. Ask students to explain one answer, not only name it. Check that they distinguish a characteristic from a function. Next lesson: central and commercial banks (3.1.2). Optional function practice follows only if needed."
    },

    {
      type: 'exam',
      eyebrow: 'Paper 2 practice',
      title: 'Identify two functions of money. [2]',
      examSpec: { paper: 'Paper 2', marks: 2, command: 'Identify', pattern: '2 x 1', skills: ['k'] },
      keywordLabel: 'Write only two',
      keywords: ['medium of exchange', 'unit of account', 'store of value', 'standard of deferred payment'],
      prompt: 'Write two function names. Do not add characteristics of money.',
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2023MJ-21 Q2(a)',
          question: 'Identify two functions of money.',
          extract: 'MS basis: one mark for each valid function; descriptions are accepted, but characteristics earn no credit.',
        },
      ],
      notes: "Optional recall extension after the exit ticket. Use only if function explanations still need practice.",
    },

    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Identify two functions of money. [2]',
      examSpec: { paper: 'Paper 2', marks: 2, command: 'Identify', pattern: '2 x 1', skills: ['k'] },
      paragraphs: [
        'Medium of exchange.',
        'Store of value.',
      ],
      links: ['Medium of exchange', 'Store of value'],
      showLinkChips: false,
      markSchemeNote: 'One mark is awarded for each valid function. Characteristics earn no credit. If more than two functions are listed, only the first three are considered.',
      partialReview: ['.modelAnswerCard', '.modelAnswerNote'],
      sources: [
        {
          label: 'Paper 2 mark scheme',
          ref: '2023MJ-21 Q2(a)',
          question: 'Identify two functions of money.',
          extract: 'Accepted functions: medium of exchange, unit of account / measure of value, store of value, and standard of deferred payments.',
        },
      ],
    },

    {
      type: 'exam',
      eyebrow: 'Paper 2 practice',
      title: 'Explain two functions of money. [4]',
      examSpec: { paper: 'Paper 2', marks: 4, command: 'Explain', pattern: '2 x (1 + 1)', skills: ['k', 'an'] },
      keywordLabel: 'Build two complete links',
      keywords: ['name the function', 'explain what it does', 'one mark + one mark'],
      prompt: 'For each function, name it and explain what money allows people to do.',
      sources: [
        {
          label: 'Paper 2 source',
          ref: '2023ON-21 Q3(b)',
          question: 'Explain two functions of money.',
          extract: 'MS basis: one mark for each of two functions identified and one mark for each explanation.',
        },
      ],
      notes: "Optional recall extension after the exit ticket. Use only if function explanations still need practice.",
    },

    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: 'Explain two functions of money. [4]',
      examSpec: { paper: 'Paper 2', marks: 4, command: 'Explain', pattern: '2 x (1 + 1)', skills: ['k', 'an'] },
      paragraphs: [
        'Money is a medium of exchange because it is used to buy goods and services and to trade.',
        'Money is a unit of account because it measures how much a product is worth, allowing values to be compared.',
      ],
      links: ['medium of exchange', 'buy goods and services', 'unit of account', 'measures how much a product is worth'],
      showLinkChips: false,
      markSchemeNote: 'Each paragraph earns one mark for naming the function and one mark for explaining what it enables.',
      partialReview: ['.modelAnswerCard', '.modelAnswerNote'],
      sources: [
        {
          label: 'Paper 2 mark scheme',
          ref: '2023ON-21 Q3(b)',
          question: 'Explain two functions of money.',
          extract: 'Accepted links include medium of exchange -> buy goods and services / trade, and unit of account -> measure how much a product is worth.',
        },
      ],
    },
  ],
};
