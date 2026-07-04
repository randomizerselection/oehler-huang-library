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

  function renderGeneratorTable() {
    const tbody = document.querySelector("[data-course-map-generator-rows]");
    if (!tbody || !courseMap) return;

    tbody.innerHTML = courseMap.lessons.map((lesson) => `
      <tr>
        <th scope="row">${lesson.lesson}<br><span>${escapeHtml(lesson.company)}</span></th>
        <td><span class="investment-generator-title">${escapeHtml(lesson.guidingQuestion)}</span><span class="investment-generator-title-zh" lang="zh-Hans">${escapeHtml(lesson.guidingQuestionZh)}</span></td>
        <td>${renderTermsForTable(lesson.terms)}</td>
        <td>${escapeHtml(lesson.handoutMaterial)}</td>
        <td>${escapeHtml(lesson.formativeAssessment)}</td>
        <td>${escapeHtml(lesson.exitTicket)}</td>
        <td>${escapeHtml(lesson.sequenceRole)}</td>
        <td>${escapeHtml(lesson.retrievalBase)}</td>
        <td>${escapeHtml(lesson.newKnowledge)}</td>
        <td>${escapeHtml(lesson.evidenceTask)}</td>
        <td>${escapeHtml(lesson.avoidOverlap)}</td>
        <td>${escapeHtml(lesson.misconception)}</td>
        <td>${escapeHtml(lesson.studentOutput)}</td>
        <td>${escapeHtml(lesson.futureReuse)}</td>
      </tr>
    `).join("");
  }

  function renderLessonCards() {
    const grid = document.querySelector("[data-course-map-lesson-grid]");
    if (!grid || !courseMap) return;

    grid.innerHTML = courseMap.lessons.map((lesson) => `
      <article class="investment-syllabus-lesson" data-syllabus-lesson data-lesson="${lesson.lesson}">
        <div class="investment-lesson-topline"><span class="code">Lesson ${lesson.lesson}</span><strong>${escapeHtml(lesson.company)}</strong></div>
        <h3>${escapeHtml(lesson.guidingQuestion)}</h3>
        <p class="investment-lesson-title-zh" lang="zh-Hans">${escapeHtml(lesson.guidingQuestionZh)}</p>
        <p class="investment-lesson-focus">${escapeHtml(lesson.focus)}</p>
        ${renderTermsForCard(lesson.terms)}
        <p class="investment-lesson-formula"><strong>Formula:</strong> ${escapeHtml(lesson.formulaOrNoFormula)}</p>
        <p class="investment-lesson-evidence"><strong>Evidence:</strong> ${escapeHtml(lesson.evidenceSummary)}</p>
        <p class="investment-lesson-check"><strong>Check:</strong> ${escapeHtml(lesson.check)}</p>
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
          <li><strong>Case role:</strong> ${escapeHtml(lesson.caseRole)}</li>
          <li><strong>Source pack:</strong> ${escapeHtml((lesson.sourcePack && lesson.sourcePack.requiredSourceTypes || []).join("; "))}</li>
          <li><strong>Assessment:</strong> ${escapeHtml(lesson.assessmentBlueprint && `${lesson.assessmentBlueprint.commandWord}, ${lesson.assessmentBlueprint.marks} marks, ${lesson.assessmentBlueprint.stimulusType}`)}</li>
        </ul>
      </article>
    `).join("");
  }

  function renderCourseMap() {
    renderGeneratorTable();
    renderLessonCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderCourseMap);
  } else {
    renderCourseMap();
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
