(function renderInvestmentPassport(global) {
  const documentRoot = document.querySelector('[data-passport-document]');
  const courseMap = global.INVEST && global.INVEST.courseMap;
  const pilot = courseMap && courseMap.personalPassportPilot;
  const checkpoints = courseMap
    ? courseMap.lessons.map((lesson) => lesson.passportCheckpoint).filter(Boolean)
    : [];

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function writingLines(count) {
    return `<div class="passport-write-lines" aria-hidden="true">${Array.from({ length: count }, () => '<span></span>').join('')}</div>`;
  }

  function answerControlsMarkup(format = {}) {
    const optionGroups = (format.optionGroups || []).map((group) => `
      <div class="passport-option-group">
        <div class="passport-option-group-label">
          <strong>${escapeHtml(group.label)}</strong>
          <span lang="zh-Hans">${escapeHtml(group.labelZh)}</span>
        </div>
        <div class="passport-options">
          ${(group.options || []).map((option) => `<span class="passport-option">${escapeHtml(option)}</span>`).join('')}
        </div>
      </div>`).join('');

    const sentenceFrames = (format.sentenceFrames || []).map((frame) => `
      <div class="passport-sentence-frame">${escapeHtml(frame)}</div>`).join('');
    const lineCount = Number.isInteger(format.lines) ? format.lines : 0;

    return `
      <div class="passport-answer-controls">
        ${optionGroups ? `<div class="passport-option-groups">${optionGroups}</div>` : ''}
        ${sentenceFrames ? `<div class="passport-sentence-frames">${sentenceFrames}</div>` : ''}
        ${lineCount > 0 ? writingLines(lineCount) : ''}
      </div>`;
  }

  function taskRow(field, format, step) {
    return `
      <tr class="passport-task-row" data-passport-response="${escapeHtml(field.key)}">
        <th scope="row">
          <span class="passport-step-number">${step}</span>
          <strong>${escapeHtml(field.label)}</strong>
          <span class="passport-step-zh" lang="zh-Hans">${escapeHtml(field.labelZh)}</span>
          <p>${escapeHtml(format.answerType)}</p>
          <p class="passport-zh" lang="zh-Hans">${escapeHtml(format.answerTypeZh)}</p>
        </th>
        <td>${answerControlsMarkup(format)}</td>
      </tr>`;
  }

  function taskTableMarkup(checkpoint, fields, formats) {
    return `
      <table class="passport-task-table" aria-label="Lesson ${checkpoint.lesson} Passport task table">
        <caption>
          <span class="passport-table-label">Today’s focus <i lang="zh-Hans">今天的重点</i></span>
          <strong>${escapeHtml(checkpoint.focus)}</strong>
          <span class="passport-caption-zh" lang="zh-Hans">${escapeHtml(checkpoint.focusZh)}</span>
          <small><b>When:</b> Row 1 in the opening minute · Rows 2–4 in the final five minutes · Finish before the next lesson if needed.</small>
        </caption>
        <colgroup><col class="passport-instruction-column"><col class="passport-answer-column"></colgroup>
        <thead>
          <tr>
            <th scope="col">What to do <span lang="zh-Hans">要做什么</span></th>
            <th scope="col">Your answer <span lang="zh-Hans">你的回答</span></th>
          </tr>
          <tr class="passport-reference-row">
            <th scope="row">Use today’s ideas <span lang="zh-Hans">使用今天的概念</span></th>
            <td>${(checkpoint.supportItems || []).map((item) => `<span>${escapeHtml(item)}</span>`).join('<b> · </b>')}</td>
          </tr>
        </thead>
        <tbody>
          ${taskRow(fields.firstThought, formats.firstThought, 1)}
          ${taskRow(fields.evidence, formats.evidence, 2)}
          ${taskRow(fields.revisedDecision, formats.revisedDecision, 3)}
          ${taskRow(fields.missingInformation, formats.missingInformation, 4)}
        </tbody>
      </table>`;
  }

  function teacherReviewMarkup(checkpoint) {
    if (!checkpoint.reviewCheckpoint) return '';
    const review = (pilot.teacherReview || []).find((item) => item.afterLesson === checkpoint.lesson);
    return `
      <aside class="passport-review">
        <strong>Teacher-private ${checkpoint.reviewCheckpoint} check</strong>
        <span lang="zh-Hans">教师私下${checkpoint.reviewCheckpoint === 'final' ? '期末' : '中期'}检查</span>
        <small>${escapeHtml(review ? review.focus : 'Review concept use, justification and revision.')}</small>
        <div class="passport-review-lines"><span>Strength:</span><i></i><span>Next step:</span><i></i></div>
      </aside>`;
  }

  function pageMarkup(checkpoint) {
    const fields = Object.fromEntries((pilot.sectionFields || []).map((field) => [field.key, field]));
    const formats = checkpoint.answerFormats || {};
    return `
      <section class="passport-page" id="lesson-${checkpoint.lesson}" data-passport-lesson="${checkpoint.lesson}" aria-labelledby="passport-title-${checkpoint.lesson}">
        <header class="passport-page-header">
          <div class="passport-page-kicker">Unit 1 · Lesson ${checkpoint.lesson} · My Future Investor Passport</div>
          <div class="passport-page-heading">
            <div>
              <h1 id="passport-title-${checkpoint.lesson}">${escapeHtml(checkpoint.title)}</h1>
              <p lang="zh-Hans">${escapeHtml(checkpoint.titleZh)}</p>
            </div>
            <span class="passport-page-number">${checkpoint.lesson}<small>/ 8</small></span>
          </div>
          <div class="passport-student-meta">
            <span>Name 姓名</span><i></i><span>Class 班级</span><i></i><span>Date 日期</span><i></i>
          </div>
        </header>

        ${taskTableMarkup(checkpoint, fields, formats)}

        ${teacherReviewMarkup(checkpoint)}

        <footer class="passport-page-footer">
          <span><strong>Private by default.</strong> Broad bands only; no real family income, balances, accounts or exact personal amounts.</span>
          <span>Educational use only · No named products or personal investment advice</span>
        </footer>
      </section>`;
  }

  if (!documentRoot || !pilot || checkpoints.length !== 8) {
    if (documentRoot) documentRoot.innerHTML = '<p class="passport-error">The eight Unit 1 Passport checkpoints could not be loaded.</p>';
    return;
  }

  documentRoot.innerHTML = checkpoints.map(pageMarkup).join('');

  const printButton = document.querySelector('[data-passport-print]');
  if (printButton) printButton.addEventListener('click', () => global.print());
})(typeof globalThis !== 'undefined' ? globalThis : window);
