(function renderInvestmentCourseMap(global) {
  const courseMap = global.INVEST && global.INVEST.courseMap;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderTermsForTable(terms) {
    return `<ul class="investment-generator-terms">${terms.map((term) => `
      <li><span class="investment-term-en">${escapeHtml(term.term)}</span><span class="investment-term-zh" lang="zh-Hans">${escapeHtml(term.zh)}</span></li>
    `).join("")}</ul>`;
  }

  function renderTermsForCard(terms) {
    return `<ul class="investment-lesson-terms">${terms.map((term) => `
      <li><strong>${escapeHtml(term.term)}</strong> <span class="investment-term-zh" lang="zh-Hans">${escapeHtml(term.zh)}</span> - ${escapeHtml(term.definition)}</li>
    `).join("")}</ul>`;
  }

  function renderRetrievalPractice(lesson) {
    const retrieval = lesson.retrievalPractice || {};
    if (!retrieval.yesNo || !retrieval.multipleChoice || !retrieval.matching) return "";
    return `
      <ul class="investment-lesson-generator" aria-label="Lesson ${lesson.lesson} retrieval practice">
        <li><strong>Yes/no:</strong> ${escapeHtml(retrieval.yesNo.prompt)} <strong>Answer:</strong> ${escapeHtml(retrieval.yesNo.answer)}</li>
        <li><strong>Multiple choice:</strong> ${escapeHtml(retrieval.multipleChoice.prompt)}</li>
        <li><strong>Matching:</strong> ${escapeHtml(retrieval.matching.prompt)}</li>
        <li><strong>Source check:</strong> ${escapeHtml(retrieval.sourceCheck)}</li>
      </ul>
    `;
  }

  function renderWorksheet(lesson) {
    const worksheet = lesson.worksheet && lesson.worksheet.evidenceAndDataAnalysis;
    if (!worksheet) return "";
    return `
      <div class="investment-lesson-generator" aria-label="Lesson ${lesson.lesson} evidence and data analysis worksheet">
        <p><strong>Evidence and Data Analysis:</strong> ${escapeHtml(worksheet.stimulus)}</p>
        <ol>
          ${worksheet.questions.map((question) => `<li><strong>${escapeHtml(question.command)}:</strong> ${escapeHtml(question.prompt)}</li>`).join("")}
        </ol>
      </div>
    `;
  }

  function renderInvestmentAction(lesson) {
    const action = lesson.investmentAction;
    if (!action) return "";
    return `
      <div class="investment-lesson-action" aria-label="Lesson ${lesson.lesson} practical investment action">
        <p><strong>Practical investing action:</strong> ${escapeHtml(action.studentAction)}</p>
        <ul>
          <li><strong>Decision rule:</strong> ${escapeHtml(action.decisionRule)}</li>
          <li><strong>Fit check:</strong> ${escapeHtml(action.portfolioQuestion)}</li>
          <li><strong>Written action:</strong> ${escapeHtml(action.classroomOutput)}</li>
        </ul>
      </div>
    `;
  }

  function renderPassportCheckpoint(lesson) {
    const checkpoint = lesson.passportCheckpoint;
    if (!checkpoint) return "";
    return `
      <div class="investment-lesson-action" aria-label="Lesson ${lesson.lesson} My Future Investor Passport checkpoint">
        <p><strong>Passport Update · page ${lesson.lesson}:</strong> ${escapeHtml(checkpoint.title)} <span class="investment-term-zh" lang="zh-Hans">${escapeHtml(checkpoint.titleZh)}</span></p>
        <ul>
          <li><strong>Final five minutes:</strong> ${escapeHtml(checkpoint.focus)}</li>
          <li><strong>If unfinished:</strong> Complete privately before the next lesson.</li>
        </ul>
      </div>
    `;
  }

  function renderStockMarketGameLesson(lesson) {
    const smg = lesson.stockMarketGame;
    if (!smg || smg.required !== true) return "";
    return `
      <div class="investment-lesson-smg${smg.milestone ? " is-milestone" : ""}" data-smg-core-lab${smg.milestone ? " data-smg-milestone" : ""} aria-label="Lesson ${lesson.lesson} SMG core lab">
        <div class="investment-lesson-smg-label"><span>SMG core lab</span><strong>${smg.milestone ? "Summative milestone" : "Required formative lab"}</strong></div>
        <p>${escapeHtml(smg.studentAction)}</p>
        ${smg.milestone ? `<p class="investment-lesson-smg-evidence"><strong>Milestone evidence:</strong> ${escapeHtml(smg.requiredEvidence)}</p>` : ""}
      </div>
    `;
  }

  function renderDecisionFirstModel() {
    const grid = document.querySelector("[data-decision-first-model]");
    const model = courseMap && courseMap.decisionFirstSyllabus;
    if (!grid || !model || !Array.isArray(model.lessonContract)) return;

    grid.innerHTML = model.lessonContract.map((item, index) => `
      <article class="investment-card">
        <span class="code">${index + 1}</span>
        <h3>${escapeHtml(item.split(":")[0])}</h3>
        <p>${escapeHtml(item)}</p>
      </article>
    `).join("");
  }

  function renderInvestmentWorkflow() {
    const grid = document.querySelector("[data-investment-workflow]");
    if (!grid || !courseMap || !Array.isArray(courseMap.investmentWorkflow)) return;

    grid.innerHTML = courseMap.investmentWorkflow.map((step) => `
      <article class="investment-card">
        <span class="code">Step ${escapeHtml(step.step)}</span>
        <h3>${escapeHtml(step.title)}</h3>
        <p><strong>Do:</strong> ${escapeHtml(step.studentAction)}</p>
        <p><strong>Check:</strong> ${escapeHtml(step.evidenceCheck)}</p>
        <p><strong>Output:</strong> ${escapeHtml(step.decisionOutput)}</p>
      </article>
    `).join("");
  }

  function renderSimpleLessonStructure() {
    const grid = document.querySelector("[data-simple-lesson-structure]");
    if (!grid || !courseMap || !Array.isArray(courseMap.simpleLessonStructure)) return;

    grid.innerHTML = courseMap.simpleLessonStructure.map((step, index) => `
      <article class="investment-card">
        <span class="code">${index + 1}</span>
        <h3>${escapeHtml(step.label)}</h3>
        <p>${escapeHtml(step.purpose)}</p>
        <p><strong>Student question:</strong> ${escapeHtml(step.studentQuestion)}</p>
      </article>
    `).join("");
  }

  function renderStockMarketGamePhases() {
    const grid = document.querySelector("[data-stock-market-game-phases]");
    const integration = courseMap && courseMap.stockMarketGameIntegration;
    if (!grid || !integration || !Array.isArray(integration.phases)) return;

    grid.innerHTML = integration.phases.map((phase) => `
      <article class="investment-card">
        <span class="code">Lessons ${escapeHtml(phase.lessons.join("-"))}</span>
        <h3>${escapeHtml(phase.officialStage)}</h3>
        <p>${escapeHtml(phase.coursePurpose)}</p>
        <p><strong>Evidence:</strong> ${escapeHtml(phase.requiredEvidence)}</p>
      </article>
    `).join("");
  }

  function renderStockMarketGameUnitEvidence() {
    const grid = document.querySelector("[data-stock-market-game-unit-evidence]");
    const integration = courseMap && courseMap.stockMarketGameIntegration;
    if (!grid || !integration || !Array.isArray(integration.unitEvidence)) return;

    grid.innerHTML = integration.unitEvidence.map((item) => `
      <article class="investment-card">
        <span class="code">Unit ${escapeHtml(item.unit)} · Lessons ${escapeHtml(item.lessons.join("-"))}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p><strong>Team:</strong> ${escapeHtml(item.teamEvidence)}</p>
        <p><strong>Individual:</strong> ${escapeHtml(item.individualEvidence)}</p>
        <p><strong>Assessment:</strong> ${escapeHtml(item.assessmentUse)}</p>
      </article>
    `).join("");
  }

  function renderSimpleFlow(lesson) {
    const flow = Array.isArray(lesson.simpleFlow) ? lesson.simpleFlow : [];
    if (!flow.length) return "";
    return `
      <ol class="investment-simple-flow" aria-label="Lesson ${lesson.lesson} simple lesson structure">
        ${flow.map((step) => `
          <li>
            <span>${escapeHtml(step.label)}</span>
            <p>${escapeHtml(step.text)}</p>
          </li>
        `).join("")}
      </ol>
    `;
  }

  function renderDecisionFirst(lesson) {
    const decision = lesson.decisionFirst;
    if (!decision) return "";
    return `
      <div class="investment-lesson-action" aria-label="Lesson ${lesson.lesson} decision-first teaching contract">
        <p><strong>Starter dilemma:</strong> ${escapeHtml(decision.starterDilemma)}</p>
        <ul>
          <li><strong>First judgement:</strong> ${escapeHtml(decision.firstJudgementPrompt)}</li>
          <li><strong>Missing evidence:</strong> ${escapeHtml(decision.missingEvidence)}</li>
          <li><strong>Misconception check:</strong> ${escapeHtml(decision.misconceptionCheck)}</li>
          <li><strong>Exit judgement:</strong> ${escapeHtml(decision.exitJudgement)}</li>
        </ul>
      </div>
    `;
  }

  function renderKeyTermsPreview(terms = []) {
    const preview = terms.slice(0, 3).map((term) => term.term).join(", ");
    const extra = terms.length > 3 ? ` + ${terms.length - 3} more` : "";
    return `${preview}${extra}`;
  }

  function renderGeneratorTable() {
    const tbody = document.querySelector("[data-course-map-generator-rows]");
    if (!tbody || !courseMap) return;

    tbody.innerHTML = courseMap.lessons.map((lesson) => `
      <tr>
        <th scope="row">${lesson.lesson}<br><span>${escapeHtml(lesson.caseAnchor || lesson.company)}</span></th>
        <td>${escapeHtml(lesson.decisionFirst && lesson.decisionFirst.starterDilemma)}</td>
        <td><span class="investment-generator-title">${escapeHtml(lesson.guidingQuestion)}</span><span class="investment-generator-title-zh" lang="zh-Hans">${escapeHtml(lesson.guidingQuestionZh)}</span></td>
        <td>${escapeHtml(lesson.decisionFirst && lesson.decisionFirst.firstJudgementPrompt)}</td>
        <td>${escapeHtml(lesson.decisionFirst && lesson.decisionFirst.missingEvidence)}</td>
        <td>${escapeHtml(lesson.decisionFirst && lesson.decisionFirst.keyIdea)}</td>
        <td>${escapeHtml(lesson.decisionFirst && lesson.decisionFirst.tryIt)}</td>
        <td>${escapeHtml(lesson.decisionFirst && lesson.decisionFirst.misconceptionCheck)}</td>
        <td>${escapeHtml(lesson.decisionFirst && lesson.decisionFirst.exitJudgement)}</td>
        <td>${escapeHtml(lesson.investmentAction && lesson.investmentAction.studentAction)}</td>
        <td>${escapeHtml(lesson.stockMarketGame && lesson.stockMarketGame.studentAction)}</td>
        <td>${escapeHtml(lesson.avoidOverlap)}</td>
        <td>${escapeHtml(lesson.futureReuse)}</td>
      </tr>
    `).join("");
  }

  function renderLessonCards() {
    const grid = document.querySelector("[data-course-map-lesson-grid]");
    if (!grid || !courseMap) return;

    grid.innerHTML = courseMap.lessons.map((lesson) => `
      <article class="investment-syllabus-lesson" data-syllabus-lesson data-lesson="${lesson.lesson}">
        <div class="investment-lesson-topline"><span class="code">Lesson ${lesson.lesson}</span><strong>${escapeHtml(lesson.caseAnchor || lesson.company)}</strong></div>
        <h3>${escapeHtml(lesson.guidingQuestion)}</h3>
        <p class="investment-lesson-title-zh" lang="zh-Hans">${escapeHtml(lesson.guidingQuestionZh)}</p>
        <p class="investment-lesson-hook">${escapeHtml(lesson.studentHook || lesson.focus)}</p>
        ${renderDecisionFirst(lesson)}
        ${renderSimpleFlow(lesson)}
        <div class="investment-lesson-quick-facts">
          <span><strong>Key terms:</strong> ${escapeHtml(renderKeyTermsPreview(lesson.terms))}</span>
          <span><strong>Formula/check:</strong> ${escapeHtml(lesson.formulaOrNoFormula)}</span>
        </div>
        ${renderInvestmentAction(lesson)}
        ${renderPassportCheckpoint(lesson)}
        ${renderStockMarketGameLesson(lesson)}
        ${lesson.publishedRoutes ? `
          <nav class="investment-lesson-routes" aria-label="Lesson ${lesson.lesson} materials">
            <a href="${escapeHtml(lesson.publishedRoutes.slides)}">Slides</a>
            <a href="${escapeHtml(lesson.publishedRoutes.quiz)}">Quiz</a>
            <a href="${escapeHtml(lesson.publishedRoutes.handout)}">Handout</a>
          </nav>
        ` : ""}
        <details class="investment-lesson-details">
          <summary>Show retrieval, worksheet and generator details</summary>
          <p class="investment-lesson-focus">${escapeHtml(lesson.focus)}</p>
          ${renderTermsForCard(lesson.terms)}
          <p class="investment-lesson-formula"><strong>Formula:</strong> ${escapeHtml(lesson.formulaOrNoFormula)}</p>
          <p class="investment-lesson-evidence"><strong>Evidence:</strong> ${escapeHtml(lesson.evidenceSummary)}</p>
          <p class="investment-lesson-check"><strong>Check:</strong> ${escapeHtml(lesson.check)}</p>
          <p class="investment-lesson-check"><strong>Likely naive answer:</strong> ${escapeHtml(lesson.decisionFirst && lesson.decisionFirst.likelyNaiveAnswer)}</p>
          <p class="investment-lesson-check"><strong>Key idea:</strong> ${escapeHtml(lesson.decisionFirst && lesson.decisionFirst.keyIdea)}</p>
          <p class="investment-lesson-check"><strong>Try it:</strong> ${escapeHtml(lesson.decisionFirst && lesson.decisionFirst.tryIt)}</p>
          ${renderRetrievalPractice(lesson)}
          <p class="investment-lesson-check"><strong>Analyse why:</strong> ${escapeHtml(lesson.analyseWhy && lesson.analyseWhy.question)}</p>
          ${renderWorksheet(lesson)}
          <ul class="investment-lesson-generator" aria-label="Lesson ${lesson.lesson} generator brief">
            <li><strong>Builds on:</strong> ${escapeHtml((lesson.cardGenerator || lesson).retrievalBase)}</li>
            <li><strong>New learning:</strong> ${escapeHtml((lesson.cardGenerator || lesson).newKnowledge)}</li>
            <li><strong>Avoid overlap:</strong> ${escapeHtml((lesson.cardGenerator || lesson).avoidOverlap)}</li>
            <li><strong>Common misconception:</strong> ${escapeHtml((lesson.cardGenerator || lesson).misconception)}</li>
            <li><strong>Evidence task:</strong> ${escapeHtml((lesson.cardGenerator || lesson).evidenceTask)}</li>
            <li><strong>Student output:</strong> ${escapeHtml((lesson.cardGenerator || lesson).studentOutput)}</li>
          </ul>
          <ul class="investment-lesson-generator" aria-label="Lesson ${lesson.lesson} build contract">
            <li><strong>Core claim:</strong> ${escapeHtml(lesson.coreClaim)}</li>
            <li><strong>Primary output:</strong> ${escapeHtml(lesson.primaryOutput && lesson.primaryOutput.description)}</li>
            <li><strong>Case anchor:</strong> ${escapeHtml(lesson.caseAnchor || lesson.company)}</li>
            <li><strong>Case type:</strong> ${escapeHtml(lesson.caseRole)}</li>
            <li><strong>Source pack:</strong> ${escapeHtml((lesson.sourcePack && lesson.sourcePack.requiredSourceTypes || []).join("; "))}</li>
            <li><strong>Assessment:</strong> ${escapeHtml(lesson.assessmentBlueprint && `${lesson.assessmentBlueprint.commandWord}, ${lesson.assessmentBlueprint.marks} marks, ${lesson.assessmentBlueprint.stimulusType}`)}</li>
          </ul>
        </details>
      </article>
    `).join("");
  }

  function renderCourseMap() {
    renderDecisionFirstModel();
    renderInvestmentWorkflow();
    renderSimpleLessonStructure();
    renderStockMarketGamePhases();
    renderStockMarketGameUnitEvidence();
    renderGeneratorTable();
    renderLessonCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderCourseMap);
  } else {
    renderCourseMap();
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
