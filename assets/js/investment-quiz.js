(function () {
  window.INVEST = window.INVEST || {};

  const INVEST = window.INVEST;

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalise(value) {
    return String(value || '').trim().toLowerCase();
  }

  function questionMarkup(question, index) {
    if (question.type === 'fillBlank') {
      return `
        <article class="invQuizQuestion" data-question="${index}">
          <div class="invQuizPrompt">${escapeHtml(index + 1)}. ${escapeHtml(question.prompt)}</div>
          ${question.zh ? `<div class="invPromptZh" lang="zh-Hans">${escapeHtml(question.zh)}</div>` : ''}
          <label>
            <span class="investment-card-meta">Answer</span><br>
            <input type="text" aria-label="Answer ${index + 1}" />
          </label>
          <div class="invQuizCorrection"></div>
        </article>`;
    }

    return `
      <article class="invQuizQuestion" data-question="${index}">
        <div class="invQuizPrompt">${escapeHtml(index + 1)}. ${escapeHtml(question.prompt)}</div>
        ${question.zh ? `<div class="invPromptZh" lang="zh-Hans">${escapeHtml(question.zh)}</div>` : ''}
        <div class="invQuizChoices">
          ${(question.choices || []).map((choice, choiceIndex) => `
            <label>
              <input type="radio" name="q${index}" value="${choiceIndex}">
              ${escapeHtml(choice)}
            </label>
          `).join('')}
        </div>
        <div class="invQuizCorrection"></div>
      </article>`;
  }

  function isCorrect(question, node) {
    if (question.type === 'fillBlank') {
      const value = normalise(node.querySelector('input[type="text"]')?.value);
      return (question.acceptedAnswers || []).map(normalise).includes(value);
    }
    const checked = node.querySelector('input[type="radio"]:checked');
    return checked && Number(checked.value) === Number(question.answer);
  }

  function answered(question, node) {
    if (question.type === 'fillBlank') return Boolean(node.querySelector('input[type="text"]')?.value.trim());
    return Boolean(node.querySelector('input[type="radio"]:checked'));
  }

  function mountQuiz(quiz, target = document.body) {
    document.body.classList.add('investment-quiz');
    const questions = quiz.questions || [];
    const currentPage = location.href.split('?')[0].split('#')[0];
    target.innerHTML = `
      <main class="invQuizDeck">
        <header class="invQuizHeader">
          <div>
            <div class="invQuizMeta">Investment Analysis Quiz</div>
            <h1>${escapeHtml(quiz.title || 'Lesson quiz')}</h1>
            ${quiz.description ? `<p>${escapeHtml(quiz.description)}</p>` : ''}
          </div>
          <nav class="invQuizNav" aria-label="Quiz navigation">
            <a class="investment-link" href="${escapeHtml(currentPage)}">Slides</a>
            <a class="investment-link" href="../../index.html">Course</a>
            <a class="investment-link" href="../../../index.html">Library</a>
          </nav>
        </header>
        <section class="invQuizQuestions">
          ${questions.map(questionMarkup).join('')}
        </section>
        <footer class="invQuizFooter">
          <button class="invQuizSubmit" type="button">Mark quiz</button>
          <button class="invQuizReset" type="button">Try again</button>
          <span class="invQuizScore" aria-live="polite"></span>
        </footer>
      </main>`;

    function updateAnsweredCount() {
      const count = questions.filter((question, index) => answered(question, document.querySelector(`[data-question="${index}"]`))).length;
      const score = document.querySelector('.invQuizScore');
      if (!score.dataset.marked) score.textContent = `${count}/${questions.length} answered`;
    }

    document.querySelector('.invQuizQuestions').addEventListener('input', updateAnsweredCount);
    document.querySelector('.invQuizQuestions').addEventListener('change', updateAnsweredCount);

    document.querySelector('.invQuizSubmit').addEventListener('click', () => {
      let score = 0;
      questions.forEach((question, index) => {
        const node = document.querySelector(`[data-question="${index}"]`);
        const correct = Boolean(isCorrect(question, node));
        if (correct) score += 1;
        node.classList.toggle('is-correct', correct);
        node.classList.toggle('is-wrong', !correct);
        const correction = node.querySelector('.invQuizCorrection');
        const answerText = question.type === 'fillBlank'
          ? (question.acceptedAnswers || [])[0]
          : (question.choices || [])[question.answer];
        correction.innerHTML = `${correct ? 'Correct' : `Correct answer: ${escapeHtml(answerText)}`}. ${escapeHtml(question.explanation || '')}${question.explanationZh ? `<div class="invPromptZh" lang="zh-Hans">${escapeHtml(question.explanationZh)}</div>` : ''}`;
      });
      const scoreNode = document.querySelector('.invQuizScore');
      scoreNode.dataset.marked = 'true';
      scoreNode.textContent = `${score}/${questions.length} (${Math.round((score / questions.length) * 100)}%)`;
    });

    document.querySelector('.invQuizReset').addEventListener('click', () => {
      document.querySelectorAll('.invQuizQuestion').forEach((node) => {
        node.classList.remove('is-correct', 'is-wrong');
        node.querySelectorAll('input').forEach((input) => {
          if (input.type === 'radio') input.checked = false;
          else input.value = '';
        });
        node.querySelector('.invQuizCorrection').innerHTML = '';
      });
      const scoreNode = document.querySelector('.invQuizScore');
      delete scoreNode.dataset.marked;
      scoreNode.textContent = `0/${questions.length} answered`;
    });

    updateAnsweredCount();
  }

  INVEST.mountQuiz = mountQuiz;
})();
