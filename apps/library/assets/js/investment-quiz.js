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

  function answerValue(question, node) {
    if (question.type === 'fillBlank') return node.querySelector('input[type="text"]')?.value || '';
    const checked = node.querySelector('input[type="radio"]:checked');
    return checked ? Number(checked.value) : null;
  }

  function localResult(questions) {
    const responses = questions.map((question, index) => {
      const node = document.querySelector(`[data-question="${index}"]`);
      const correct = Boolean(isCorrect(question, node));
      return {
        correct,
        correctAnswer: question.type === 'fillBlank' ? (question.acceptedAnswers || [])[0] : (question.choices || [])[question.answer],
        explanation: question.explanation || '',
        explanationZh: question.explanationZh || ''
      };
    });
    const score = responses.filter((response) => response.correct).length;
    return { responses, score, maxScore: questions.length, percentage: questions.length ? Math.round((score / questions.length) * 100) : 0 };
  }

  function resultFromAttempt(attempt, questions) {
    const byId = new Map((attempt.result?.questions || []).map((question) => [question.question_id, question]));
    const responses = questions.map((question) => {
      const value = byId.get(question.id) || {};
      return {
        correct: Boolean(value.correct),
        correctAnswer: value.correct_answer_text || value.correct_answer || '',
        explanation: value.explanation || question.explanation || '',
        explanationZh: question.explanationZh || ''
      };
    });
    return {
      responses,
      score: Number(attempt.score ?? attempt.result?.score ?? 0),
      maxScore: Number(attempt.max_score ?? attempt.result?.max_score ?? questions.length),
      percentage: Number(attempt.percentage ?? attempt.result?.percentage ?? 0)
    };
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
            <span class="invQuizAccount" data-platform-account></span>
          </nav>
        </header>
        <section class="invQuizQuestions">
          ${questions.map(questionMarkup).join('')}
        </section>
        <footer class="invQuizFooter">
          <button class="invQuizSubmit" type="button">Mark &amp; submit</button>
          <button class="invQuizReset" type="button">Try again</button>
          <span class="invQuizScore" aria-live="polite"></span>
          <span class="invQuizSaveState" aria-live="polite"></span>
        </footer>
      </main>`;

    function updateAnsweredCount() {
      const count = questions.filter((question, index) => answered(question, document.querySelector(`[data-question="${index}"]`))).length;
      const score = document.querySelector('.invQuizScore');
      if (!score.dataset.marked) score.textContent = `${count}/${questions.length} answered`;
    }

    document.querySelector('.invQuizQuestions').addEventListener('input', updateAnsweredCount);
    document.querySelector('.invQuizQuestions').addEventListener('change', updateAnsweredCount);

    const submitButton = document.querySelector('.invQuizSubmit');
    const saveState = document.querySelector('.invQuizSaveState');
    const accountMount = document.querySelector('[data-platform-account]');
    let lastPayload = null;

    function updateAccountSummary() {
      const account = window.LibraryPlatform?.getSession?.().account;
      saveState.textContent = !account
        ? 'Student sign-in is required when you submit.'
        : account.role === 'teacher'
          ? 'Teacher preview — attempts are not stored.'
          : `${account.display_name} · ${account.class_name || 'Class required'}`;
    }

    INVEST.ensurePlatformAuth?.()
      .then((platform) => platform?.initialize({ mount: accountMount, context: 'investment-quiz', roleHint: 'student' }))
      .then(updateAccountSummary)
      .catch(() => {});
    window.addEventListener('platform:authchange', updateAccountSummary);

    function setLocked(locked) {
      document.querySelectorAll('.invQuizQuestions input').forEach((input) => { input.disabled = locked; });
    }

    function applyResult(result, message) {
      questions.forEach((question, index) => {
        const node = document.querySelector(`[data-question="${index}"]`);
        const response = result.responses[index];
        node.classList.toggle('is-correct', response.correct);
        node.classList.toggle('is-wrong', !response.correct);
        const correction = node.querySelector('.invQuizCorrection');
        correction.innerHTML = `${response.correct ? 'Correct' : `Correct answer: ${escapeHtml(response.correctAnswer)}`}. ${escapeHtml(response.explanation || '')}${response.explanationZh ? `<div class="invPromptZh" lang="zh-Hans">${escapeHtml(response.explanationZh)}</div>` : ''}`;
      });
      const scoreNode = document.querySelector('.invQuizScore');
      scoreNode.dataset.marked = 'true';
      scoreNode.textContent = `${result.score}/${result.maxScore} (${result.percentage}%)`;
      saveState.textContent = message;
      submitButton.textContent = 'Submitted';
      submitButton.disabled = true;
    }

    submitButton.addEventListener('click', async () => {
      const complete = questions.every((question, index) => answered(question, document.querySelector(`[data-question="${index}"]`)));
      if (!complete && !lastPayload) {
        saveState.textContent = 'Answer every question before marking.';
        return;
      }
      if (!lastPayload) {
        lastPayload = {
          attemptId: window.LibraryPlatform?.createAttemptId?.() || `attempt_${Date.now()}-${Math.random().toString(36).slice(2)}`,
          answers: Object.fromEntries(questions.map((question, index) => [question.id, answerValue(question, document.querySelector(`[data-question="${index}"]`))]))
        };
        setLocked(true);
      }
      submitButton.disabled = true;
      saveState.textContent = 'Sign in if needed; your completed answers will stay here.';
      try {
        const platform = await INVEST.ensurePlatformAuth?.();
        const current = platform?.getSession?.();
        if (platform?.hosted === false || current?.account?.role === 'teacher') {
          applyResult(localResult(questions), current?.account?.role === 'teacher' ? 'Teacher preview only — not stored as a student attempt.' : 'Local preview only — open the hosted library to submit.');
          return;
        }
        const session = await platform?.requireRole('student', {
          context: 'investment-quiz',
          message: 'Use a student account to mark and submit this quiz. Your answers will remain completed.'
        });
        if (!session) {
          setLocked(false);
          lastPayload = null;
          submitButton.disabled = false;
          saveState.textContent = 'Submission paused. Your answers are still here.';
          return;
        }
        const attempt = await platform.submitAttempt({ attemptId: lastPayload.attemptId, quiz, answers: lastPayload.answers });
        applyResult(resultFromAttempt(attempt, questions), 'Marked by EconMark and saved to your quiz history.');
      } catch (error) {
        submitButton.disabled = false;
        submitButton.textContent = 'Retry submission';
        saveState.textContent = `${error.message} Your answers are preserved.`;
      }
    });

    document.querySelector('.invQuizReset').addEventListener('click', () => {
      setLocked(false);
      lastPayload = null;
      submitButton.disabled = false;
      submitButton.textContent = 'Mark & submit';
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
      saveState.textContent = '';
      updateAccountSummary();
    });

    updateAnsweredCount();
  }

  INVEST.mountQuiz = mountQuiz;
})();
