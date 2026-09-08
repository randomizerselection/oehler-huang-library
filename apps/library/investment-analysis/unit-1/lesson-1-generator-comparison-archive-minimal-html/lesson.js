(function () {
  "use strict";

  const imageRoot = "../../../assets/images/investment-analysis/";

  window.MINIMAL_LESSON = {
    title: "What is investment?",
    slides: [
      {
        type: "cover",
        kicker: "Investment Analysis · Lesson 1",
        title: "What is investment?",
        zh: "什么是投资？",
        cue: "Handout ready",
        notes: "Students keep Handout Version 24 open throughout. Ask for a one-sentence initial answer; do not correct it yet."
      },
      {
        type: "image",
        src: `${imageRoot}speculator-investor-race.png`,
        alt: "A fast rabbit labelled speculator races beside a steady turtle labelled investor.",
        question: "Same asset. Different decision?",
        questionSmall: "Think · pair · share",
        cue: "No writing yet",
        notes: "Hook: two people can buy the same asset for different reasons. Ask what information would be needed before classifying either decision."
      },
      {
        type: "objectives",
        items: ["Define", "Distinguish", "Justify"],
        cue: "Handout + notebook",
        notes: "Three objectives: define financial investment, speculation and saving; distinguish them by the main basis of the decision; justify a classification with a specific clue."
      },
      {
        type: "words",
        words: [
          { text: "PURPOSE" },
          { text: "RETURN SOURCE" }
        ],
        support: "Two questions before any label.",
        cue: "Notebook · write the two questions",
        notes: "Students write: (1) What is the money mainly meant to do? (2) Where is the expected return mainly meant to come from? These are decision questions, not asset labels."
      },
      {
        type: "image",
        src: `${imageRoot}definitions/investment-definition.svg`,
        alt: "Money enters an asset, followed by uncertain future gain or loss.",
        fit: "contain",
        cue: "Handout · page 1",
        notes: "Students read the financial investment definition and examples on page 1. Ask them to identify the asset, expected return and possible loss in one example."
      },
      {
        type: "words",
        words: [{ text: "TOTAL RETURN", zh: "总回报" }],
        support: "income + change in market value",
        formula: true,
        cue: "Notebook · copy the relationship",
        notes: "Clarify that total return has two components: income and the change in market value. Either component can be zero or negative."
      },
      {
        type: "image",
        src: `${imageRoot}lesson-1/scenario-financial-documents-analysis.jpg`,
        alt: "Two people review financial documents with a calculator and laptop.",
        question: "What would count as evidence?",
        cue: "Handout · investment examples",
        notes: "Elicit examples such as earnings, rental income, bond terms, fees and risks. Evidence can support an expectation; it cannot remove possible loss."
      },
      {
        type: "words",
        words: [
          { text: "EVIDENCE" },
          { text: "≠ CERTAINTY" }
        ],
        support: "An informed investment can still lose money.",
        cue: "Handout · discuss the limit",
        notes: "Ask students to state the limit aloud: evidence can support an expected return, but possible loss remains."
      },
      {
        type: "image",
        src: `${imageRoot}lesson-1/scenario-smartphone-candlestick-chart.jpg`,
        alt: "A smartphone displays a trading app with candlestick charts.",
        question: "What is the trade mainly relying on?",
        cue: "Handout · speculation",
        notes: "Do not classify from the image alone. Ask what the person expects to cause the profit. Move to speculation only when predicted price change is the main basis."
      },
      {
        type: "words",
        words: [{ text: "PRICE PREDICTION", zh: "价格预测" }],
        support: "main basis → speculation (投机)",
        cue: "Handout · test the rule",
        notes: "Students complete the rule aloud: if predicted price change is the main basis for the trade, classify it as speculation. Careful research does not automatically change that payoff source."
      },
      {
        type: "image",
        src: "../../../assets/images/monetary-policy/deposit-into-piggy-bank-savings-account.jpg",
        alt: "A person puts coins into a piggy bank.",
        question: "What matters more than return?",
        cue: "Handout · saving",
        notes: "Ask students to infer the priorities of saving before reading the definition: keeping the amount available and limiting the chance of loss."
      },
      {
        type: "words",
        words: [
          { text: "PRESERVATION", zh: "保本" },
          { text: "LIQUIDITY", zh: "流动性" }
        ],
        support: "main priorities → saving (储蓄)",
        cue: "Handout · compare priorities",
        notes: "Ask students to state the saving priorities aloud: capital preservation and liquidity. Interest does not automatically make saving an investment."
      },
      {
        type: "words",
        words: [
          { text: "INVESTMENT", zh: "投资" },
          { text: "SPECULATION", zh: "投机" },
          { text: "SAVING", zh: "储蓄" }
        ],
        support: "Three categories. One main purpose.",
        cue: "Handout · comparison grid",
        notes: "Use the page 1 grid. Stress that the same financial product can sometimes be used for different purposes; classify the decision by its main purpose and basis."
      },
      {
        type: "work",
        page: "Handout · page 2",
        cases: "A–D",
        action: "Classify. Cite one decisive clue.",
        cue: "Pairs · 3 minutes",
        notes: "Students complete cases A–D. Cold-call: category first, then the exact clue. Press for why the nearest alternative is weaker."
      },
      {
        type: "work",
        page: "Handout · page 2",
        cases: "E–J",
        action: "Classify. Reject one nearby category.",
        cue: "Pairs · 5 minutes",
        notes: "Students complete cases E–J. Require a boundary statement: not saving because..., or not investment because...."
      },
      {
        type: "words",
        words: [
          { text: "ONE ANSWER" },
          { text: "ONE REASON" }
        ],
        support: "Explain why one distractor is wrong.",
        cue: "Handout · page 3",
        notes: "Students answer the five multiple-choice questions independently. For one question, they must explain why a tempting distractor is wrong."
      },
      {
        type: "image",
        src: `${imageRoot}lesson-1/market-gainers-and-losers-screen.jpg`,
        alt: "A market screen and smartphone show both gainers and losers.",
        question: "Same asset. Same decision?",
        questionSmall: "Purpose and basis decide",
        cue: "Return to the hook",
        notes: "Revisit the opening question. Students should now say that an asset name alone is insufficient; the main purpose and basis of expected return determine the category."
      },
      {
        type: "words",
        words: [
          { text: "WHEN NEEDED?" },
          { text: "CAN LOSS BE AFFORDED?" }
        ],
        support: "Mina + Leo",
        cue: "Handout · page 4",
        notes: "Short answers have no projected case text because it is on the handout. Students answer Mina and Leo using emergency fund, time horizon, liquidity, capital preservation and possible loss."
      },
      {
        type: "image",
        src: `${imageRoot}lesson-1/scenario-smartphone-red-market-losses.jpg`,
        alt: "A smartphone stock-market app shows red negative price changes.",
        question: "The price falls. What remains?",
        cue: "Handout · Nora",
        notes: "Students read Nora's case. Elicit that a share-price loss does not cancel the debt."
      },
      {
        type: "words",
        words: [
          { text: "BORROWED MONEY", zh: "借入资金" },
          { text: "REPAYMENT REMAINS", zh: "偿还义务" }
        ],
        support: "Borrowing magnifies possible loss (可能亏损).",
        cue: "Notebook · one rule",
        notes: "Students write: Borrowing can magnify loss because the repayment obligation remains even when the asset price falls."
      },
      {
        type: "words",
        words: [
          { text: "CATEGORY" },
          { text: "CLUE" },
          { text: "BOUNDARY" }
        ],
        support: "One sentence. Three parts.",
        cue: "Exit · notebook",
        notes: "Exit sentence: classify one new example, cite the decisive clue, and distinguish it from the nearest alternative. Collect or sample notebooks before students leave."
      }
    ]
  };
})();
