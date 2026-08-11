// Archived 11 July 2026 before course realignment.
window.INVEST = window.INVEST || {};

const investmentPhotos = window.INVEST.photos || {};

window.INVEST.lesson = {
  meta: {
    courseLabel: "Investment Analysis",
    lessonLabel: "Unit 1 Lesson 2: Why do companies need a stock market?",
    sources: [
      {
        label: "HKEX homepage",
        note: "Used for official exchange context and the market-infrastructure source habit.",
        date: "Accessed 6 July 2026",
        url: "https://www.hkex.com.hk/?sc_lang=en"
      },
      {
        label: "HKEX List with HKEX FAQ",
        note: "Used for listing, IPO, primary and secondary listing context, and stock-code allocation.",
        date: "Accessed 6 July 2026",
        url: "https://www.hkex.com.hk/Global/Exchange/FAQ/List-with-HKEX?sc_lang=en"
      },
      {
        label: "HKEX Securities Market Trading Hours",
        note: "Used to show that exchange trading happens inside market sessions and rules.",
        date: "Accessed 6 July 2026",
        url: "https://www.hkex.com.hk/Services/Trading-hours-and-Severe-Weather-Arrangements/Trading-Hours/Securities-Market?sc_lang=en"
      },
      {
        label: "HKEX Securities Market Operations FAQ",
        note: "Used for simple friction examples: board lots, odd lots, price spreads and liquidity.",
        date: "Accessed 6 July 2026",
        url: "https://www.hkex.com.hk/Global/Exchange/FAQ/Securities-Market/Trading/Securities-Market-Operations?sc_lang=en"
      },
      {
        label: "Wikimedia Commons Exchange Square visuals",
        note: "Used for the updated HKEX visual evidence in the opener and market-location slides.",
        date: "Downloaded 6 July 2026",
        url: "https://commons.wikimedia.org/wiki/File:HK_%E4%B8%AD%E7%92%B0_Central_%E4%BA%A4%E6%98%93%E5%BB%A3%E5%A0%B4_Exchange_Square_shop_sign_%E9%A6%99%E6%B8%AF%E4%BA%A4%E6%98%93%E6%89%80_HKEX_July_2019_SSG_08_Jardine_House.jpg"
      }
    ]
  },
  handout: {
    title: "Who gets the money when a share trades?",
    subtitle: "Unit 1 Lesson 2: Why do companies need a stock market?",
    description: "Use HKEX examples to separate company fundraising from investor-to-investor trading, then explain why exchange trading is useful but still has friction.",
    meta: [
      { label: "Name", value: "" },
      { label: "Class", value: "" },
      { label: "Date", value: "" }
    ],
    sections: [
      {
        label: "1",
        title: "Starter judgement",
        instruction: "Answer before definitions. Improve this answer at the end.",
        blocks: [
          {
            type: "prompts",
            prompts: [
              { label: "First answer", prompt: "If you buy one share of 0700.HK from another investor today, who gets your money?", lines: 3 },
              { label: "Reason", prompt: "Why do you think so?", lines: 2 }
            ]
          }
        ]
      },
      {
        label: "2",
        title: "Vocabulary",
        instruction: "Complete the terms that answer the starter question.",
        blocks: [
          {
            type: "terms",
            terms: [
              { label: "Stock exchange", prompt: "A stock exchange is a regulated __________ where listed securities can be bought and sold.", answer: "market" },
              { label: "Listing", prompt: "Listing means a company's shares have permission to __________ on an exchange.", answer: "trade" },
              { label: "Stock code", prompt: "A stock code is a short __________ used to find a listed security.", answer: "identifier" },
              { label: "Liquidity", prompt: "Liquidity means an asset can be bought or sold more __________ without a large price change.", answer: "easily" }
            ]
          }
        ]
      },
      {
        label: "3",
        title: "Primary or secondary?",
        instruction: "Decide whether the company receives new money.",
        blocks: [
          {
            type: "table",
            columns: ["Situation", "Who sells the shares?", "Does the company usually receive new money?"],
            rows: [
              ["IPO / new share issue", "", ""],
              ["Investor buys listed shares from another investor", "", ""]
            ]
          }
        ]
      },
      {
        label: "4",
        title: "HKEX source box",
        instruction: "Record the market identity before making an investment judgement.",
        blocks: [
          {
            type: "facts",
            items: [
              { label: "Exchange case", value: "HKEX" },
              { label: "Example company", value: "Tencent Holdings Limited" },
              { label: "Example code", value: "0700.HK / 00700" },
              { label: "Source habit", value: "Company, exchange, code, source title, accessed date, limitation" },
              { label: "Limitation", value: "A code identifies a security; it does not prove investment quality." }
            ]
          }
        ]
      },
      {
        label: "5",
        title: "Friction register",
        instruction: "Markets reduce friction. They do not remove every problem.",
        blocks: [
          {
            type: "table",
            columns: ["Friction", "Why it matters"],
            rows: [
              ["Trading hours", ""],
              ["Board lots or odd lots", ""],
              ["Low liquidity", ""],
              ["Price spread or transaction cost", ""]
            ]
          }
        ]
      },
      {
        label: "6",
        title: "Exit answer",
        instruction: "Return to the starter and use the lesson terms.",
        blocks: [
          {
            type: "writing",
            question: "Explain why a stock market matters, while making clear why every market purchase does not automatically finance the company.",
            keywords: ["stock exchange", "listing", "stock code", "secondary market", "liquidity", "friction"],
            lines: 8
          }
        ]
      }
    ],
    sources: "HKEX homepage, List with HKEX FAQ, Securities Market Trading Hours, and Securities Market Operations FAQ, accessed 6 Jul 2026. Exchange Square visuals: Wikimedia Commons / Longshing Ma Hon Wonia and Soon Sumia Louam, CC BY-SA 4.0. Classroom example only; not personal investment advice."
  },
  slides: [
    {
      type: "discussion",
      eyebrow: "Starter",
      title: "Who gets the money?",
      zhTitle: "谁收到这笔钱？",
      question: "If you buy one share of 0700.HK from another investor today, does Tencent automatically receive new money?",
      questionZh: "如果你今天从另一位投资者手中买入一股 0700.HK，腾讯会自动收到新资金吗？",
      revealTitle: "A market trade is not always company fundraising",
      answer: "Usually, a normal market purchase transfers ownership from one investor to another. The company raises new money mainly when it issues shares, such as in an IPO or another new share issue.",
      answerZh: "通常，普通市场交易是投资者之间转让所有权。公司主要在发行新股时筹集新资金，例如 IPO 或再次发行新股。",
      visual: investmentPhotos.lesson2ExchangeSquareHkexSign2019,
      notes: [
        "Take the yes/no vote before defining any term.",
        "Let the likely wrong answer stay visible as the puzzle the lesson must solve."
      ]
    },
    {
      type: "outcomes",
      eyebrow: "Objectives",
      title: "By the end of this lesson, you can",
      zhTitle: "本课结束时，你能够",
      bullets: [
        "define stock exchange, listing, stock code and liquidity",
        "match a company to its exchange and stock code using a source box",
        "explain why exchange trading matters without claiming every trade funds the company"
      ],
      zhBullets: [
        "定义证券交易所、上市、股票代码和流动性",
        "用来源框把公司、交易所和股票代码配对",
        "解释交易所交易为什么重要，同时不误说每笔交易都给公司融资"
      ],
      phases: ["Define", "Match", "Explain"]
    },
    {
      type: "peerTask",
      taskType: "definitionRecall",
      eyebrow: "Retrieval",
      title: "Lesson 1 terms you need today",
      zhTitle: "今天需要用到的第一课术语",
      prompt: "Write the missing idea first, then reveal and correct.",
      promptZh: "先写出缺失的概念，再揭示答案并修改。",
      definitionItems: [
        {
          label: "1",
          term: "Share",
          termZh: "股票",
          answer: "A share is one unit of ownership in a company, giving the shareholder a claim on part of the company's equity and, depending on the share class, certain rights such as votes or dividends.",
          answerZh: "股票或股份是公司所有权的一个单位，使股东对公司部分权益拥有要求权，并且视股票类别而可能享有投票权或股息等权利。"
        }
      ],
      sharePrompt: "Bridge: if a share is ownership, a market needs a way to transfer that ownership.",
      sharePromptZh: "衔接：如果股票代表所有权，市场就需要一种转让所有权的方式。"
    },
    {
      type: "peerTask",
      taskType: "definitionRecall",
      eyebrow: "Retrieval",
      title: "Evidence before judgement",
      zhTitle: "先证据，后判断",
      prompt: "Recall the course method before we use the market example.",
      promptZh: "在使用市场例子前，先回忆本课程的方法。",
      definitionItems: [
        {
          label: "2",
          term: "Investment analysis",
          termZh: "投资分析",
          answer: "Investment analysis is the process of evaluating an investment opportunity with evidence to judge its potential return, risk and suitability before making a decision.",
          answerZh: "投资分析是利用证据评估投资机会的过程，在作出决定前判断其潜在回报、风险和适合性。"
        }
      ],
      sharePrompt: "Bridge: the market route is part of the evidence before judgement.",
      sharePromptZh: "衔接：市场路径是判断前证据的一部分。"
    },
    {
      type: "peerTask",
      taskType: "definitionRecall",
      eyebrow: "Retrieval",
      title: "What kind of thing is a share?",
      zhTitle: "股票属于什么？",
      prompt: "Recall the asset category before we discuss trading.",
      promptZh: "讨论交易前，先回忆资产类别。",
      definitionItems: [
        {
          label: "3",
          term: "Asset",
          termZh: "资产",
          answer: "An asset is something with economic value that can be owned or controlled, such as cash, property, a bond, a share or a business resource.",
          answerZh: "资产是指具有经济价值、可以被拥有或控制的东西，例如现金、房产、债券、股票或企业资源。"
        }
      ],
      sharePrompt: "Bridge: if a share is an asset, the market is the route through which that asset can change hands.",
      sharePromptZh: "衔接：如果股票是一种资产，市场就是它转手的路径。"
    },
    {
      type: "section",
      eyebrow: "Part 1",
      title: "Market purpose",
      zhTitle: "市场的作用",
      subtitle: "First separate company fundraising from investor trading",
      notes: "This section answers who gets the money before adding more vocabulary."
    },
    {
      type: "visualPause",
      title: "Exchange Square",
      visual: investmentPhotos.lesson2ExchangeSquareCentral2021,
      notes: [
        "Let students identify that a market is an institution with rules, location, systems and participants.",
        "Prompt silently: what job must this institution do?"
      ]
    },
    {
      type: "discussion",
      eyebrow: "Market problem",
      title: "What problem does a stock market solve?",
      zhTitle: "股票市场解决什么问题？",
      question: "If thousands of investors want to buy or sell the same listed share, what would be difficult without an organised market?",
      questionZh: "如果成千上万的投资者想买卖同一只上市股票，没有有组织的市场会有什么困难？",
      revealTitle: "The market makes transfer possible under rules",
      answer: "Investors would need to find each other, agree on price, follow rules, settle the trade and record ownership. A stock exchange reduces those problems by organising trading in listed securities.",
      answerZh: "投资者需要互相找到对方、商定价格、遵守规则、完成结算并记录所有权。证券交易所通过组织上市证券交易来减少这些困难。",
      visual: investmentPhotos.lesson2HkexBuilding01,
      notes: [
        "Accept simple answers: find a buyer, find a seller, know the price, follow rules.",
        "Do not yet use liquidity as the first definition; let students feel the problem first."
      ]
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Stock exchange",
      term: "Stock exchange",
      termZh: "证券交易所",
      definition: "A stock exchange is a regulated market where listed securities can be bought and sold under published trading rules.",
      definitionZh: "证券交易所是一个受监管的市场，上市证券可以按照公开交易规则在其中买卖。",
      notes: [
        "Students copy the full sentence.",
        "Emphasise regulated market, not a website that gives stock tips."
      ]
    },
    {
      type: "compare",
      eyebrow: "Do not mix these up",
      title: "Primary issue vs secondary-market trade",
      zhTitle: "一级发行与二级市场交易",
      leftTitle: "Company raises money",
      leftTitleZh: "公司筹资",
      rightTitle: "Investors trade with each other",
      rightTitleZh: "投资者之间交易",
      left: [
        {
          label: "A",
          text: "A company issues new shares, such as in an IPO or another share issue.",
          zh: "公司发行新股，例如 IPO 或再次发行。"
        },
        {
          label: "B",
          text: "The company can receive new capital, after costs and rules.",
          zh: "扣除成本并遵守规则后，公司可以获得新资本。"
        }
      ],
      right: [
        {
          label: "C",
          text: "One investor buys existing listed shares from another investor.",
          zh: "一位投资者从另一位投资者手中买入已上市股票。"
        },
        {
          label: "D",
          text: "Ownership changes hands; the company does not automatically receive new money.",
          zh: "所有权转手；公司不会自动收到新资金。"
        }
      ],
      prompt: "Starter correction: Which side describes a normal market purchase today?",
      promptZh: "修正开场问题：今天普通的市场买入属于哪一边？",
      visual: investmentPhotos.lesson2ExchangeSquareHkexSign2019
    },
    {
      type: "yesNoCheck",
      eyebrow: "Hinge check",
      title: "Does the company get the money?",
      zhTitle: "公司会收到这笔钱吗？",
      prompt: "Vote first. Reveal only after students give a reason.",
      promptZh: "先投票。学生说出理由后再揭示。",
      items: [
        {
          text: "A company can raise money when it issues new shares.",
          zh: "公司发行新股时可以筹集资金。",
          answer: true,
          answerZh: "是",
          reason: "That is a primary issue or fundraising event.",
          reasonZh: "这是一级发行或筹资事件。"
        },
        {
          text: "A normal market purchase from another investor automatically gives new money to the company.",
          zh: "从另一位投资者手中进行普通市场买入，会自动给公司新资金。",
          answer: false,
          answerZh: "否",
          reason: "It usually transfers existing shares between investors.",
          reasonZh: "这通常是在投资者之间转让已有股票。"
        },
        {
          text: "The stock market can still matter even when the company does not receive money from every trade.",
          zh: "即使公司不是每笔交易都收到钱，股票市场仍然重要。",
          answer: true,
          answerZh: "是",
          reason: "It helps investors transfer ownership and can make future fundraising more attractive.",
          reasonZh: "它帮助投资者转让所有权，也可能使未来融资更有吸引力。"
        }
      ],
      visual: investmentPhotos.lesson2HkexConnectHall2018
    },
    {
      type: "quiz",
      eyebrow: "Quick check",
      title: "Who receives the money?",
      zhTitle: "谁收到钱？",
      question: "An investor buys listed Tencent shares from another investor on HKEX. What is the safest statement?",
      zh: "一位投资者在港交所从另一位投资者手中买入已上市的腾讯股票。最稳妥的说法是什么？",
      choices: [
        "The trade transfers ownership between investors.",
        "Tencent automatically receives all the purchase money.",
        "The stock code proves Tencent is a good investment.",
        "No market rules are involved."
      ],
      answer: 0,
      explanation: "A secondary-market trade normally transfers existing shares between investors. It is not the same as a new share issue.",
      explanationZh: "二级市场交易通常是在投资者之间转让已有股票，不等于新股发行。",
      visual: investmentPhotos.lesson2ExchangeSquareCentral2021
    },
    {
      type: "section",
      eyebrow: "Part 2",
      title: "Listing and codes",
      zhTitle: "上市与代码",
      subtitle: "A market needs a precise way to identify what is trading",
      notes: "This section turns the institution into a source-box habit."
    },
    {
      type: "visualPause",
      title: "HKEX Connect Hall",
      visual: investmentPhotos.lesson2HkexConnectHall2018,
      notes: [
        "Use this as a reset: students should now ask what exactly is allowed to trade here.",
        "Keep the slide quiet; move to the listing definition next."
      ]
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Listing",
      term: "Listing",
      termZh: "上市",
      definition: "A listing is the formal permission for a company's securities to trade on a stock exchange after the company meets the exchange's requirements.",
      definitionZh: "上市是指公司证券在满足交易所要求后，获得在证券交易所交易的正式许可。",
      notes: [
        "Keep this simple. Do not go into full listing requirements.",
        "Connect to the question: a listed share can trade after the listing event."
      ]
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Stock code",
      term: "Stock code",
      termZh: "股票代码",
      definition: "A stock code is the short market identifier used to find a listed security on an exchange or market-data system.",
      definitionZh: "股票代码是用于在交易所或市场数据系统中查找某一上市证券的简短市场识别代码。",
      notes: [
        "Use 0700.HK as the class example.",
        "Make clear that a code identifies the security; it is not evidence that the share is good value."
      ]
    },
    {
      type: "flow",
      eyebrow: "Source habit",
      title: "Find the listed share",
      zhTitle: "找到上市股票",
      flowStyle: "sequence",
      steps: [
        {
          text: "Company: Tencent Holdings Limited",
          zh: "公司：腾讯控股有限公司"
        },
        {
          text: "Exchange: HKEX / Hong Kong Stock Exchange",
          zh: "交易所：港交所 / 香港联合交易所"
        },
        {
          text: "Stock code: 0700.HK / 00700",
          zh: "股票代码：0700.HK / 00700"
        },
        {
          text: "Source box: title, URL, accessed date, limitation",
          zh: "来源框：标题、网址、访问日期、局限"
        }
      ],
      visual: investmentPhotos.lesson2ExchangeSquareHkexSign2019,
      notes: [
        "This is a source-box routine, not an instruction to buy Tencent.",
        "Students copy the route on the handout."
      ]
    },
    {
      type: "dataSnapshot",
      eyebrow: "HKEX source box",
      title: "Identifier first, judgement later",
      zhTitle: "先识别，再判断",
      focusMetrics: [
        { label: "Company", value: "Tencent" },
        { label: "Exchange", value: "HKEX" },
        { label: "Code", value: "0700.HK" }
      ],
      note: "These facts identify the listed security. They do not yet tell us whether the price is attractive, the business is strong, or the risk is acceptable.",
      noteZh: "这些事实只能识别上市证券，还不能说明价格是否有吸引力、企业是否强、风险是否可接受。",
      task: "Write one sentence that starts: A stock code helps me find the share, but it does not prove...",
      taskZh: "写一句话：股票代码帮助我找到股票，但它不能证明……",
      visual: investmentPhotos.lesson2HkexBuilding01
    },
    {
      type: "peerTask",
      taskType: "sort",
      eyebrow: "Try it",
      title: "Match the market identity",
      zhTitle: "配对市场身份",
      steps: [
        {
          text: "Sort each card under Company, Exchange, Code, or Limitation.",
          zh: "把每张卡片分到公司、交易所、代码或局限。"
        },
        {
          text: "Use the finished sort to build one source-box sentence.",
          zh: "用完成的分类写一个来源框句子。"
        }
      ],
      categories: ["Company", "Exchange", "Code", "Limitation"],
      cases: [
        { label: "A", text: "Tencent Holdings Limited" },
        { label: "B", text: "HKEX" },
        { label: "C", text: "0700.HK" },
        { label: "D", text: "Does not prove investment quality" },
        { label: "E", text: "AIA Group Limited" },
        { label: "F", text: "1299.HK" },
        { label: "G", text: "Hong Kong Stock Exchange" },
        { label: "H", text: "Need date and source before judgement" }
      ],
      sampleAnswer: "Tencent Holdings Limited trades on HKEX under 0700.HK; the code identifies the security but does not prove it is a good investment.",
      sampleAnswerZh: "腾讯控股在港交所以 0700.HK 交易；代码识别证券，但不能证明它是好投资。",
      visual: investmentPhotos.lesson2HkexForumInterior2018
    },
    {
      type: "classificationTask",
      eyebrow: "Misconception sort",
      title: "What can a stock code prove?",
      zhTitle: "股票代码能证明什么？",
      prompt: "Classify each claim.",
      promptZh: "判断每个说法属于哪一类。",
      categories: [
        { title: "Identifier", zhTitle: "识别信息", clue: "helps find the security" },
        { title: "Overclaim", zhTitle: "过度推断", clue: "claims too much" },
        { title: "Source habit", zhTitle: "来源习惯", clue: "records evidence before judgement" }
      ],
      items: [
        {
          label: "A",
          text: "0700.HK helps us find Tencent in market data.",
          zh: "0700.HK 帮助我们在市场数据中找到腾讯。",
          answer: "Identifier",
          answerZh: "识别信息",
          reason: "It identifies the listed security.",
          reasonZh: "它识别上市证券。"
        },
        {
          label: "B",
          text: "A stock code proves the share is a good investment.",
          zh: "股票代码证明这只股票是好投资。",
          answer: "Overclaim",
          answerZh: "过度推断",
          reason: "A code is not valuation evidence.",
          reasonZh: "代码不是估值证据。"
        },
        {
          label: "C",
          text: "Record the source title and accessed date.",
          zh: "记录来源标题和访问日期。",
          answer: "Source habit",
          answerZh: "来源习惯",
          reason: "This makes the evidence checkable.",
          reasonZh: "这让证据可以被核查。"
        },
        {
          label: "D",
          text: "The exchange name helps identify the market where trading occurs.",
          zh: "交易所名称帮助识别交易发生的市场。",
          answer: "Identifier",
          answerZh: "识别信息",
          reason: "Market identity is part of the security record.",
          reasonZh: "市场身份是证券记录的一部分。"
        }
      ],
      sharePrompt: "Rule: identify the security before judging the investment.",
      sharePromptZh: "规则：先识别证券，再判断投资。",
      visual: investmentPhotos.lesson2HkexMuseumShareExchange01
    },
    {
      type: "section",
      eyebrow: "Part 3",
      title: "Liquidity and friction",
      zhTitle: "流动性与摩擦",
      subtitle: "Markets help trading, but trading is not magic",
      notes: "This section makes the lesson more analytical than a definition list."
    },
    {
      type: "discussion",
      eyebrow: "Friction question",
      title: "Why is trading still not frictionless?",
      zhTitle: "为什么交易仍然不是零摩擦？",
      question: "If an exchange helps buyers and sellers meet, why might a real trade still be slower, costlier or harder than a beginner expects?",
      questionZh: "如果交易所帮助买卖双方相遇，为什么真实交易仍可能比初学者想象的更慢、更贵或更难？",
      revealTitle: "Markets reduce friction; they do not erase it",
      answer: "A real trade happens inside rules: trading hours, order types, trading units, available buyers and sellers, spreads and costs. More liquidity usually makes trading easier, but it does not remove risk.",
      answerZh: "真实交易受到规则限制：交易时段、订单类型、交易单位、买卖双方数量、买卖差价和成本。流动性越高通常越容易交易，但不会消除风险。",
      visual: investmentPhotos.lesson2HkexTradeLobby2007
    },
    {
      type: "term",
      eyebrow: "Key term",
      title: "Liquidity",
      term: "Liquidity",
      termZh: "流动性",
      definition: "Liquidity is the ability to trade an asset quickly, at relatively low cost and in meaningful quantities without causing a large price change.",
      definitionZh: "流动性是指能够较快、以相对较低成本并以有意义的数量交易某项资产，而不会造成较大价格变动的能力。",
      notes: [
        "Connect to market usefulness: more possible buyers and sellers can reduce trading difficulty.",
        "Do not imply that liquid assets are automatically safe."
      ]
    },
    {
      type: "dataSnapshot",
      eyebrow: "Market rules",
      title: "Trading happens inside rules",
      zhTitle: "交易发生在规则之内",
      focusMetrics: [
        { label: "Session", value: "9:30-12:00" },
        { label: "Session", value: "13:00-16:00" },
        { label: "Unit", value: "Board lot" }
      ],
      note: "HKEX securities trading uses defined sessions, and Hong Kong listed securities trade in board lots. Rules like these are normal market infrastructure.",
      noteZh: "港交所证券交易有规定交易时段，香港上市证券以每手为交易单位。这些规则是正常的市场基础设施。",
      task: "Name one rule that could matter before an investor tries to trade.",
      taskZh: "说出一个投资者交易前需要注意的规则。",
      visual: investmentPhotos.lesson2HkexConnectHall2018
    },
    {
      type: "riskRegister",
      eyebrow: "Friction register",
      title: "What can make trading harder?",
      zhTitle: "什么会让交易更困难？",
      table: [
        ["Friction", "Student question", "Likely effect"],
        ["Trading hours", "Is the market open now?", "You may need to wait for the next session."],
        ["Board lot", "Can I buy exactly the number of shares I want?", "Trading units can shape order size."],
        ["Low liquidity", "Are there enough buyers and sellers near my price?", "The trade may move price or take longer."],
        ["Spread and costs", "What is the gap between buy and sell prices?", "The cost of entering or exiting can be higher."]
      ],
      effectLabel: "Why it matters",
      revealEffects: true,
      prompt: "Best one-sentence rule:",
      answer: "Check the market route and the trading friction before judging a share.",
      promptZh: "最佳一句话规则：判断股票前，先检查市场路径和交易摩擦。",
      visual: investmentPhotos.smartphoneMarketChart
    },
    {
      type: "peerTask",
      taskType: "missingSentence",
      eyebrow: "Build the sentence",
      title: "Market usefulness with a limit",
      zhTitle: "市场有用，但有边界",
      prompt: "Complete the missing sentence so it avoids the common overclaim.",
      promptZh: "补全缺失句子，避免常见的过度推断。",
      missingSentenceStep: 3,
      missingSentenceAnswer: "does not automatically give new money to the company",
      missingSentenceAnswerZh: "不会自动给公司带来新资金",
      steps: [
        {
          label: "1",
          text: "A stock exchange helps listed shares trade under rules.",
          zh: "证券交易所帮助上市股票在规则下交易。"
        },
        {
          label: "2",
          text: "This can improve liquidity because buyers and sellers have an organised market.",
          zh: "这可以提高流动性，因为买卖双方有组织化市场。"
        },
        {
          label: "3",
          text: "But a normal secondary-market trade __________.",
          zh: "但是普通二级市场交易__________。"
        },
        {
          label: "4",
          text: "So an analyst records the company, exchange, code, source date and trading friction before judging.",
          zh: "因此，分析者在判断前记录公司、交易所、代码、来源日期和交易摩擦。"
        }
      ],
      sharePrompt: "Read the four sentences aloud as one exit explanation.",
      sharePromptZh: "把四句话连起来读成一个出口解释。",
      visual: investmentPhotos.lesson2ExchangeSquareHkexSign2019
    },
    {
      type: "flow",
      eyebrow: "Final route",
      title: "Answer the starter question",
      zhTitle: "回答开场问题",
      flowStyle: "sequence",
      steps: [
        {
          text: "Identify: Tencent Holdings Limited, 0700.HK, HKEX",
          zh: "识别：腾讯控股、0700.HK、港交所"
        },
        {
          text: "Classify the trade: new share issue or secondary-market trade?",
          zh: "分类交易：新股发行还是二级市场交易？"
        },
        {
          text: "If it is secondary-market trading, money goes to the seller, not automatically to the company.",
          zh: "如果是二级市场交易，资金给卖方，而不是自动给公司。"
        },
        {
          text: "Add the market reason: exchange trading can improve liquidity, but rules and friction still matter.",
          zh: "补充市场理由：交易所交易可以提高流动性，但规则和摩擦仍然重要。"
        }
      ],
      visual: investmentPhotos.lesson2ExchangeSquareCentral2021
    },
    {
      type: "yesNoCheck",
      eyebrow: "Exit misconception check",
      title: "Ready to judge the trade?",
      zhTitle: "准备好判断这笔交易了吗？",
      prompt: "Use yes/no plus one reason. Reveal after each reason.",
      promptZh: "用是/否加一个理由。每个理由说完后再揭示。",
      compact: true,
      items: [
        {
          text: "The stock exchange helps listed securities trade.",
          zh: "证券交易所帮助上市证券交易。",
          answer: true,
          answerZh: "是",
          reason: "That is the basic market function.",
          reasonZh: "这是基本市场功能。"
        },
        {
          text: "A stock code is enough evidence to decide whether to buy.",
          zh: "股票代码足以作为是否买入的证据。",
          answer: false,
          answerZh: "否",
          reason: "It identifies the security but does not value it.",
          reasonZh: "它识别证券，但不进行估值。"
        },
        {
          text: "Liquidity means easy trading with no risk.",
          zh: "流动性意味着容易交易且没有风险。",
          answer: false,
          answerZh: "否",
          reason: "Liquidity describes ease of trading; price and investment risk remain.",
          reasonZh: "流动性描述交易便利度；价格和投资风险仍然存在。"
        },
        {
          text: "A market trade can matter even if the company is not receiving new money from that exact trade.",
          zh: "即使公司没有从该笔交易收到新资金，市场交易仍然重要。",
          answer: true,
          answerZh: "是",
          reason: "It supports transfer of ownership and liquidity.",
          reasonZh: "它支持所有权转让和流动性。"
        }
      ],
      visual: investmentPhotos.lesson2HkexInterior2007
    },
    {
      type: "answer",
      eyebrow: "Exit ticket",
      title: "Exit ticket: fix the first answer",
      zhTitle: "出口题：修正第一答案",
      items: [
        {
          prompt: "A stock exchange is a regulated market where listed securities can be bought and ________.",
          answer: "sold",
          zh: "证券交易所是一个受监管的市场，上市证券可以在这里买入和________。"
        },
        {
          prompt: "A stock code helps identify a security, but it does not prove investment ________.",
          answer: "quality",
          zh: "股票代码帮助识别证券，但不能证明投资________。"
        },
        {
          prompt: "When one investor buys existing listed shares from another investor, the company does not automatically receive new ________.",
          answer: "money",
          zh: "当一位投资者从另一位投资者手中买入已有上市股票时，公司不会自动收到新________。"
        },
        {
          prompt: "A good Lesson 2 judgement names the exchange, stock code, source date and one trading ________.",
          answer: "friction",
          zh: "好的第二课判断会写出交易所、股票代码、来源日期和一个交易________。"
        }
      ],
      notes: [
        "Collect or cold-call two exit answers.",
        "The strongest answers should explicitly correct the starter misconception."
      ]
    }
  ]
};
