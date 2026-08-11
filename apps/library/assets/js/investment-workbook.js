(function renderInvestmentWorkbookGuide(global) {
  const map = global.INVEST && global.INVEST.courseMap;
  const workbook = map && map.stockMarketGameIntegration && map.stockMarketGameIntegration.workbook;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  const ruleList = document.querySelector("[data-workbook-rules]");
  if (ruleList && workbook && Array.isArray(workbook.courseRules)) {
    ruleList.innerHTML = workbook.courseRules.map((rule, index) => `
      <li>${escapeHtml(rule)}${workbook.courseRulesZh && workbook.courseRulesZh[index] ? `<span lang="zh-Hans">${escapeHtml(workbook.courseRulesZh[index])}</span>` : ""}</li>
    `).join("");
  }

  const tableBody = document.querySelector("[data-workbook-calendar]");
  if (tableBody && workbook && workbook.lessonPlan) {
    tableBody.innerHTML = Object.entries(workbook.lessonPlan).map(([lesson, item]) => `
      <tr>
        <td>Lesson ${escapeHtml(lesson)}</td>
        <td>${escapeHtml(item.pages)}</td>
        <td>${escapeHtml(item.treatment)}</td>
        <td>${escapeHtml(item.action)}</td>
      </tr>
    `).join("");
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
