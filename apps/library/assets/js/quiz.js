window.IGCSE = window.IGCSE || {};

(() => {
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[m]));

  const normalizeAnswer = (value) => String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

  const isCorrectFillBlank = (value, accepted = []) => {
    const normalized = normalizeAnswer(value);
    return accepted.some((answer) => normalizeAnswer(answer) === normalized);
  };

  const questionMaxPoints = (question) => Number.isFinite(question.points) ? question.points : 1;
  const classOptions = ['IC 1.1', 'IC 1.2', 'IC 1.3', 'IC 2.1', 'IC 2.2', 'IC 3.1', 'IC 3.2'];
  const questionTypeLabel = (question) => question.type === 'fillBlank' ? 'Short answer' : 'Multiple choice';
  const SOURCE_PROFILES = {
    marketSystem: [
      { label: 'Syllabus source', ref: 'Syllabus 2.8' },
      { label: 'Definition source', ref: 'Definitions 2026: Market economic system; Price mechanism; Consumer sovereignty' },
      { label: 'Paper 2 source', ref: '2-allocation archive: 2.8 Market economic system', note: 'Aligned to market-allocation and price-signal wording' },
    ],
    marketFailure: [
      { label: 'Syllabus source', ref: 'Syllabus 2.9' },
      { label: 'Definition source', ref: 'Definitions 2026: Market failure; External costs/benefits; Merit/public goods; Monopoly' },
      { label: 'Paper 2 source', ref: '2-allocation archive: 2.9 Market failure', note: 'Includes merit/public goods, external benefits and market-allocation items' },
    ],
    macroAims: [
      { label: 'Syllabus source', ref: 'Syllabus 4.1.1' },
      { label: 'Definition source', ref: 'Definitions 2026: macroeconomic aims' },
      { label: 'Paper 2 source', ref: '4-government archive: 4.1 Macroeconomic aims', note: 'Aligned to aim/conflict explain and discuss wording' },
    ],
    fiscal: [
      { label: 'Syllabus source', ref: 'Syllabus 4.2' },
      { label: 'Definition source', ref: 'Definitions 2026: Fiscal policy; Taxation; Government budget; Budget deficit/surplus' },
      { label: 'Paper 2 source', ref: '4-government archive: 4.2 Fiscal policy', note: 'Includes tax types, budget and fiscal-policy measure items' },
    ],
    monetary: [
      { label: 'Syllabus source', ref: 'Syllabus 4.3' },
      { label: 'Definition source', ref: 'Definitions 2026: Monetary policy; Interest rate; Central bank; Money supply' },
      { label: 'Paper 2 source', ref: '4-government archive: 4.3 Monetary policy', note: 'Includes central bank and monetary-policy measure items' },
    ],
  };
  const PAPER_2_QUESTIONS = {
    '2024ON-23 Q4(b)': 'Explain the difference between the private sector and the public sector.',
    '2025MJ-23 Q3(a)': 'Define public sector.',
    '2024ON-21 Q2(c)': 'Analyse how market forces can increase wages.',
    '2023FM-22 Q2(d)': 'Discuss whether or not private sector firms are likely to charge lower prices than public sector firms.',
    '2025MJ-22 Q3(b)': 'Explain, with an example of each, the difference between a merit good and a public good.',
    '2023MJ-23 Q5(b)': 'Explain, with examples, the difference between private benefits and external benefits.',
    '2023MJ-23 Q1(b)': 'Identify two external costs arising from the milk and car industries.',
    '2023MJ-23 Q1(d)': 'Explain the two plans that the New Zealand government has to reduce external costs to the environment.',
    '2023ON-21 Q3(c)': 'Analyse the consequences of market failure.',
    '2024ON-23 Q2(d)': 'Discuss whether or not government intervention can overcome the disadvantages of a market economic system.',
    '2023MJ-23 Q5(a)': 'Define government budget.',
    '2023ON-21 Q3(a)': 'Identify two types of tax.',
    '2025ON-21 Q3(a)': 'Identify two fiscal policy measures.',
    '2023MJ-21 Q2(c)': "Analyse the causes of an increase in a government's tax revenue.",
    '2024FM-22 Q2(b)': 'Explain two reasons for a change in the amount of tax revenue a government receives.',
    '2023MJ-21 Q1(h)': 'Discuss whether or not Australia is likely to have a budget deficit in 2026.',
    '2024ON-23 Q5(a)': 'Define a central bank.',
    '2023ON-23 Q3(b)': 'Explain two functions of a central bank.',
    '2023ON-21 Q5(a)': 'Identify two monetary policy measures.',
    '2025ON-22 Q4(a)': 'Identify two policy measures a central bank could use to maintain price stability.',
    '2025ON-21 Q1(g)': 'Discuss whether or not an increase in interest rates will harm the Swiss economy.',
    '2024ON-22 Q3(c)': 'Analyse how the macroeconomic aims of economic growth and balance of payments stability may conflict.',
    '2023FM-22 Q1(g)': 'Discuss whether or not a central bank should aim for a low inflation rate.',
  };
  const paper2QuestionsForRef = (ref = '') => Object.entries(PAPER_2_QUESTIONS)
    .filter(([key]) => String(ref).includes(key))
    .map(([key, question]) => `${key}: ${question}`)
    .join(' ');
  const normalizeSources = (sources = []) => Array.isArray(sources)
    ? sources
      .map((source) => ({
        label: String(source?.label || '').trim(),
        ref: String(source?.ref || '').trim(),
        note: String(source?.note || '').trim(),
        question: String(source?.question || paper2QuestionsForRef(source?.ref) || '').trim(),
        extract: String(source?.extract || '').trim(),
      }))
      .filter((source) => source.label && source.ref)
    : [];
  const sourceProfileKey = (lesson = {}, quiz = {}) => {
    const meta = lesson?.meta || {};
    const text = `${meta.code || ''} ${meta.title || ''} ${meta.lessonLabel || ''} ${quiz?.id || ''} ${quiz?.title || ''}`.toLowerCase();
    if (text.includes('2.8') || text.includes('2-8') || text.includes('market economic system')) return 'marketSystem';
    if (text.includes('2.9') || text.includes('2-9') || text.includes('market failure')) return 'marketFailure';
    if (text.includes('4.1') || text.includes('4-1') || text.includes('macroeconomic aims')) return 'macroAims';
    if (text.includes('4.2') || text.includes('4-2') || text.includes('fiscal policy')) return 'fiscal';
    if (text.includes('4.3') || text.includes('4-3') || text.includes('monetary policy')) return 'monetary';
    return '';
  };
  const DIRECT_SOURCE_RULES = {
    marketSystem: [
      { terms: ['private sector', 'public sector'], source: { label: 'Paper 2 source', ref: '2024ON-23 Q4(b)', note: 'Private/public sector comparison wording', extract: 'MS basis: private sector owned by individuals/firms; public sector owned by government.' } },
      { terms: ['market forces', 'price mechanism'], source: { label: 'Paper 2 source', ref: '2024ON-21 Q2(c)', note: 'Market forces analysis wording', extract: 'MS basis: demand and supply influence wages/prices through market forces.' } },
    ],
    marketFailure: [
      { terms: ['merit good', 'public good'], source: { label: 'Paper 2 source', ref: '2025MJ-22 Q3(b)', note: 'Merit/public good distinction and examples', extract: 'MS basis: merit goods are under-consumed; public goods are non-excludable/non-rival and often government-funded.' } },
      { terms: ['private benefits', 'external benefits'], source: { label: 'Paper 2 source', ref: '2023MJ-23 Q5(b)', note: 'Private/external benefit distinction', extract: 'MS basis: private benefits go to consumers/producers; external benefits go to third parties.' } },
      { terms: ['external costs'], source: { label: 'Paper 2 source', ref: '2023MJ-23 Q1(b); 2023MJ-23 Q1(d)', note: 'External-cost examples and reduction chain', extract: 'MS basis: pollution/environmental harm are external costs; intervention can reduce them.' } },
      { terms: ['market failure'], source: { label: 'Paper 2 source', ref: '2023ON-21 Q3(c)', note: 'Consequences of market failure', extract: 'MS basis: consequences include under-consumption, non-supply of public goods and monopoly power.' } },
    ],
    macroAims: [
      { terms: ['economic growth', 'balance of payments'], source: { label: 'Paper 2 source', ref: '2024ON-22 Q3(c)', note: 'Macroeconomic aim conflict wording', extract: 'MS basis: growth can raise imports and create balance of payments pressure.' } },
      { terms: ['stable prices', 'low inflation'], source: { label: 'Paper 2 source', ref: '2023FM-22 Q1(g)', note: 'Low-inflation aim wording', extract: 'MS basis: low inflation can support planning, confidence and stable costs.' } },
    ],
    fiscal: [
      { terms: ['government budget'], source: { label: 'Paper 2 source', ref: '2023MJ-23 Q5(a)', note: 'Direct government budget definition item', extract: 'MS basis: a plan/forecast for government expenditure and revenue.' } },
      { terms: ['direct tax', 'indirect tax', 'progressive', 'proportional', 'regressive', 'types of tax'], source: { label: 'Paper 2 source', ref: '2023ON-21 Q3(a)', note: 'Tax types and accepted examples', extract: 'MS basis: direct/indirect and progressive/proportional/regressive accepted, plus relevant examples.' } },
      { terms: ['fiscal policy measures', 'government spending', 'taxation'], source: { label: 'Paper 2 source', ref: '2025ON-21 Q3(a)', note: 'Fiscal-policy measures item', extract: 'MS basis: government spending and taxation are fiscal-policy measures.' } },
      { terms: ['tax revenue'], source: { label: 'Paper 2 source', ref: '2023MJ-21 Q2(c); 2024FM-22 Q2(b)', note: 'Tax revenue explanation wording', extract: 'MS basis: tax revenue changes with income, employment, spending, profits, rates and collection.' } },
      { terms: ['budget deficit'], source: { label: 'Paper 2 source', ref: '2023MJ-21 Q1(h)', note: 'Budget-deficit discuss wording', extract: 'MS basis: deficit depends on government spending versus tax revenue.' } },
    ],
    monetary: [
      { terms: ['central bank'], source: { label: 'Paper 2 source', ref: '2024ON-23 Q5(a); 2023ON-23 Q3(b)', note: 'Central bank definition and functions', extract: 'MS basis: government bank, bankers bank, issuer of currency and implementer of monetary policy.' } },
      { terms: ['monetary policy measures', 'interest rates', 'money supply', 'foreign exchange-rate measures'], source: { label: 'Paper 2 source', ref: '2023ON-21 Q5(a); 2025ON-22 Q4(a)', note: 'Monetary-policy measure items', extract: 'MS basis: interest rates, money supply and exchange-rate measures are accepted policy tools.' } },
      { terms: ['interest rate'], source: { label: 'Paper 2 source', ref: '2025ON-21 Q1(g)', note: 'Interest-rate effects discuss wording', extract: 'MS basis: interest-rate changes affect borrowing, saving, spending and investment.' } },
    ],
  };
  const itemSourceText = (item = {}) => {
    try {
      return JSON.stringify(item).replace(/["{}[\],:]/g, ' ').toLowerCase();
    } catch (_error) {
      return [item.prompt, item.explanation, item.correctAnswer]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
    }
  };
  const mergeSources = (...sourceGroups) => {
    const seen = new Set();
    return sourceGroups.flatMap(normalizeSources).filter((source) => {
      const key = `${source.label}|${source.ref}|${source.note}|${source.question}|${source.extract}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };
  const directSourcesForItem = (profileKey, item) => {
    const text = itemSourceText(item);
    return (DIRECT_SOURCE_RULES[profileKey] || [])
      .filter((rule) => rule.terms.some((term) => text.includes(term)))
      .map((rule) => rule.source);
  };
  const pointsLabel = (question) => {
    const points = questionMaxPoints(question);
    return `${points} ${points === 1 ? 'point' : 'points'}`;
  };

  const renderQuestionLegend = (question, index) => `
    <legend>
      <span class="quizQuestionNumber">Question ${index + 1}</span>
      <b>${esc(question.prompt)}</b>
      <span class="quizQuestionMeta">
        <span>${esc(questionTypeLabel(question))}</span>
        <span>${esc(pointsLabel(question))}</span>
        <span class="quizQuestionState">Unanswered</span>
      </span>
    </legend>
  `;

  const renderChoiceQuestion = (question, index) => `
    <fieldset class="quizQuestion" data-question-index="${index}">
      ${renderQuestionLegend(question, index)}
      <div class="quizChoices">
        ${(question.choices || []).map((choice, choiceIndex) => `
          <label class="quizChoice">
            <input type="radio" name="q-${index}" value="${choiceIndex}" required />
            <span class="quizChoiceLetter">${String.fromCharCode(65 + choiceIndex)}</span>
            <span>${esc(choice)}</span>
          </label>
        `).join('')}
      </div>
      <div class="quizCorrection" hidden></div>
    </fieldset>
  `;

  const renderFillBlankQuestion = (question, index) => `
    <fieldset class="quizQuestion" data-question-index="${index}">
      ${renderQuestionLegend(question, index)}
      <label class="quizBlank">
        <span>Answer</span>
        <input type="text" name="q-${index}" autocomplete="off" required />
      </label>
      <div class="quizCorrection" hidden></div>
    </fieldset>
  `;

  const renderQuestion = (question, index) => {
    if (question.type === 'fillBlank') return renderFillBlankQuestion(question, index);
    return renderChoiceQuestion(question, index);
  };

  const choiceAnswerText = (question) => question.choices?.[question.answer] || '';
  const acceptedAnswerText = (question) => {
    if (question.type === 'fillBlank') return (question.acceptedAnswers || []).join(' / ');
    return choiceAnswerText(question);
  };

  const readStudentAnswer = (form, question, index) => {
    const fieldName = `q-${index}`;
    if (question.type === 'fillBlank') return form.elements[fieldName]?.value || '';
    const checked = form.querySelector(`input[name="${fieldName}"]:checked`);
    return checked ? Number(checked.value) : null;
  };

  const gradeQuestion = (question, answer) => {
    const maxPoints = questionMaxPoints(question);
    const correct = question.type === 'fillBlank'
      ? isCorrectFillBlank(answer, question.acceptedAnswers || [])
      : Number(answer) === Number(question.answer);

    return {
      id: question.id || '',
      type: question.type || 'multipleChoice',
      prompt: question.prompt || '',
      studentAnswer: question.type === 'multipleChoice'
        ? (question.choices?.[answer] || '')
        : String(answer || ''),
      correctAnswer: acceptedAnswerText(question),
      correct,
      points: correct ? maxPoints : 0,
      maxPoints,
      explanation: question.explanation || '',
      sources: normalizeSources(question.sources),
    };
  };

  const isQuestionAnswered = (form, question, index) => {
    const answer = readStudentAnswer(form, question, index);
    if (question.type === 'fillBlank') return normalizeAnswer(answer).length > 0;
    return answer !== null;
  };

  const gradeQuiz = (form, questions) => {
    const responses = questions.map((question, index) => {
      const answer = readStudentAnswer(form, question, index);
      return gradeQuestion(question, answer);
    });
    const score = responses.reduce((sum, response) => sum + response.points, 0);
    const maxScore = responses.reduce((sum, response) => sum + response.maxPoints, 0);
    return {
      responses,
      score,
      maxScore,
      percentage: maxScore ? Math.round((score / maxScore) * 100) : 0,
    };
  };

  const applyCorrections = (form, questions, responses) => {
    questions.forEach((question, index) => {
      const response = responses[index];
      const fieldset = form.querySelector(`[data-question-index="${index}"]`);
      const correction = fieldset?.querySelector('.quizCorrection');
      if (!fieldset || !correction) return;

      fieldset.classList.toggle('is-correct', response.correct);
      fieldset.classList.toggle('is-incorrect', !response.correct);
      fieldset.querySelector('.quizQuestionState').textContent = response.correct ? 'Correct' : 'Review';
      fieldset.querySelectorAll('.quizChoice').forEach((label) => {
        const input = label.querySelector('input');
        const isAnswer = Number(input?.value) === Number(question.answer);
        const isSelected = input?.checked;
        label.classList.toggle('is-answer', isAnswer);
        label.classList.toggle('is-selected', Boolean(isSelected));
      });

      correction.hidden = false;
      correction.innerHTML = `
        <b>${response.correct ? 'Correct' : 'Correct answer'}: ${esc(response.correctAnswer)}</b>
        ${response.explanation ? `<p>${esc(response.explanation)}</p>` : ''}
      `;
    });
  };

  const createPayload = (lesson, quiz, student, result) => ({
    attemptId: `${quiz.id || lesson.meta?.code || 'quiz'}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    submittedAt: new Date().toISOString(),
    lesson: {
      code: lesson.meta?.code || '',
      title: lesson.meta?.lessonLabel || lesson.meta?.title || '',
      unit: lesson.meta?.unit || '',
    },
    quiz: {
      id: quiz.id || '',
      version: quiz.version || '',
      title: quiz.title || '',
    },
    student,
    score: result.score,
    maxScore: result.maxScore,
    percentage: result.percentage,
    responses: result.responses,
  });

  async function submitPayload(payload) {
    const config = window.IGCSE.quizConfig || {};
    const openedLocally = window.location.protocol === 'file:';
    const submitEndpoint = openedLocally && config.localSubmitEndpoint
      ? config.localSubmitEndpoint
      : config.submitEndpoint;
    const useOpaqueSubmit = openedLocally && Boolean(config.localSubmitEndpoint);

    if (!config.submissionEnabled || !submitEndpoint) {
      return { state: 'disabled' };
    }

    if (config.provider === 'netlify-forms') {
      const body = new URLSearchParams({
        'form-name': config.formName || 'quiz-submissions',
        attemptId: payload.attemptId,
        submittedAt: payload.submittedAt,
        studentName: payload.student.name,
        studentClass: payload.student.className,
        lessonCode: payload.lesson.code,
        lessonTitle: payload.lesson.title,
        lessonUnit: payload.lesson.unit,
        quizId: payload.quiz.id,
        quizVersion: payload.quiz.version,
        quizTitle: payload.quiz.title,
        score: String(payload.score),
        maxScore: String(payload.maxScore),
        percentage: String(payload.percentage),
        responsesJson: JSON.stringify(payload.responses),
      });

      const response = await fetch(submitEndpoint, {
        method: 'POST',
        mode: useOpaqueSubmit ? 'no-cors' : 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (response.type !== 'opaque' && !response.ok) {
        throw new Error(`Submission failed with HTTP ${response.status}`);
      }
      return { state: 'submitted' };
    }

    const response = await fetch(submitEndpoint, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`Submission failed with HTTP ${response.status}`);
    return { state: 'submitted' };
  }

  const setStatus = (statusEl, state, message) => {
    statusEl.className = `quizSubmitStatus is-${state}`;
    statusEl.textContent = message;
  };

  const setFormLocked = (form, locked) => {
    form.classList.toggle('is-locked', locked);
    form.querySelectorAll('.quizIdentity input, .quizIdentity select, .quizQuestions input').forEach((input) => {
      input.disabled = locked;
    });
    form.querySelector('[data-quiz-submit]').disabled = locked;
  };

  IGCSE.mountQuizLesson = function mountQuizLesson(lesson, quiz, mountEl = document.getElementById('deck')) {
    const meta = lesson?.meta || {};
    const quizSources = normalizeSources(quiz?.sources).length
      ? normalizeSources(quiz.sources)
      : normalizeSources(lesson?.meta?.sources).length
        ? normalizeSources(lesson.meta.sources)
        : normalizeSources(SOURCE_PROFILES[sourceProfileKey(lesson, quiz)] || []);
    const profileKey = sourceProfileKey(lesson, quiz);
    const questions = Array.isArray(quiz?.questions)
      ? quiz.questions.map((question) => ({
        ...question,
        sources: normalizeSources(question?.sources).length
          ? mergeSources(question.sources, directSourcesForItem(profileKey, question))
          : mergeSources(quizSources, directSourcesForItem(profileKey, question)),
      }))
      : [];
    document.body.classList.add('is-quiz-mode');
    document.body.classList.remove('is-handout-mode');
    document.body.classList.remove('is-flashcard-mode');
    if (meta.title) document.title = `${meta.lessonLabel || meta.title} - Quiz`;

    if (!questions.length) {
      mountEl.className = 'quizDeck';
      mountEl.removeAttribute('aria-live');
      mountEl.innerHTML = `
        <section class="quizShell">
          <header class="quizHero">
            <div class="quizKicker">${esc(meta.unit || meta.courseLabel || 'IGCSE Economics Lesson Library')}</div>
            <h1>${esc(meta.lessonLabel || meta.title || 'Lesson quiz')}</h1>
            <p>This lesson does not yet have a quiz.</p>
          </header>
        </section>
      `;
      return { mode: 'quiz' };
    }

    mountEl.className = 'quizDeck';
    mountEl.removeAttribute('aria-live');
    mountEl.innerHTML = `
      <section class="quizShell">
        <header class="quizHero">
          <div class="quizKicker">${esc(meta.unit || meta.courseLabel || 'IGCSE Economics Lesson Library')}</div>
          <h1>${esc(quiz.title || `${meta.lessonLabel || meta.title || 'Lesson'} quiz`)}</h1>
          <p>${esc(quiz.description || 'Complete the quiz after reviewing the lesson. Your answers are marked automatically.')}</p>
        </header>

        <form class="quizForm">
          <section class="quizIdentity" aria-label="Student details">
            <label>
              <span>Name</span>
              <input name="studentName" type="text" autocomplete="name" required />
            </label>
            <label>
              <span>Class</span>
              <select name="studentClass" required>
                <option value="">Choose class</option>
                ${classOptions.map((className) => `<option value="${esc(className)}">${esc(className)}</option>`).join('')}
              </select>
            </label>
          </section>

          <section class="quizStatus" aria-label="Quiz progress" aria-live="polite">
            <div class="quizStatusText">
              <span>Progress</span>
              <strong class="quizAnsweredCount">0/${questions.length} answered</strong>
            </div>
            <div class="quizStatusTotal">${questions.length} questions</div>
            <div class="quizProgressTrack" role="progressbar" aria-label="Answered questions" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="0">
              <span class="quizProgressFill"></span>
            </div>
          </section>

          <section class="quizQuestions" aria-label="Quiz questions">
            ${questions.map(renderQuestion).join('')}
          </section>

          <section class="quizActions">
            <button class="quizPrimaryButton" type="submit" data-quiz-submit>Mark quiz</button>
            <button class="quizSecondaryButton" type="button" data-quiz-reset hidden>Try again</button>
          </section>

          <section class="quizResult" aria-live="polite" hidden>
            <div class="quizScoreBlock">
              <span>Score</span>
              <strong class="quizScore"></strong>
            </div>
            <dl class="quizResultStats">
              <div>
                <dt>Correct</dt>
                <dd class="quizCorrectCount"></dd>
              </div>
              <div>
                <dt>Review</dt>
                <dd class="quizReviewCount"></dd>
              </div>
              <div>
                <dt>Percent</dt>
                <dd class="quizPercent"></dd>
              </div>
            </dl>
            <p class="quizSubmitStatus"></p>
            <button class="quizSecondaryButton" type="button" data-quiz-retry hidden>Retry submission</button>
          </section>
        </form>
      </section>
    `;

    const form = mountEl.querySelector('.quizForm');
    const resultEl = mountEl.querySelector('.quizResult');
    const scoreEl = mountEl.querySelector('.quizScore');
    const correctCountEl = mountEl.querySelector('.quizCorrectCount');
    const reviewCountEl = mountEl.querySelector('.quizReviewCount');
    const percentEl = mountEl.querySelector('.quizPercent');
    const statusEl = mountEl.querySelector('.quizSubmitStatus');
    const retryButton = mountEl.querySelector('[data-quiz-retry]');
    const resetButton = mountEl.querySelector('[data-quiz-reset]');
    const answeredCountEl = mountEl.querySelector('.quizAnsweredCount');
    const progressBar = mountEl.querySelector('.quizProgressTrack');
    const progressFill = mountEl.querySelector('.quizProgressFill');
    let lastPayload = null;

    const updateProgress = () => {
      const answered = questions.filter((question, index) => {
        const hasAnswer = isQuestionAnswered(form, question, index);
        const fieldset = form.querySelector(`[data-question-index="${index}"]`);
        fieldset?.classList.toggle('is-answered', hasAnswer);
        const stateEl = fieldset?.querySelector('.quizQuestionState');
        if (stateEl && !fieldset.classList.contains('is-correct') && !fieldset.classList.contains('is-incorrect')) {
          stateEl.textContent = hasAnswer ? 'Answered' : 'Unanswered';
        }
        return hasAnswer;
      }).length;
      const percent = questions.length ? (answered / questions.length) * 100 : 0;
      answeredCountEl.textContent = `${answered}/${questions.length} answered`;
      progressBar.setAttribute('aria-valuenow', String(answered));
      progressFill.style.width = `${percent}%`;
    };

    const runSubmission = async () => {
      if (!lastPayload) return;
      retryButton.hidden = true;
      setStatus(statusEl, 'pending', 'Submitting score...');
      try {
        const submitResult = await submitPayload(lastPayload);
        if (submitResult.state === 'submitted') {
          setStatus(statusEl, 'submitted', 'Score submitted to your teacher.');
        } else {
          setStatus(statusEl, 'disabled', 'Score marked locally. No teacher submission endpoint is configured.');
        }
      } catch (_error) {
        setStatus(statusEl, 'failed', 'Submission failed - retry when your connection or endpoint is available.');
        retryButton.hidden = false;
      }
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const result = gradeQuiz(form, questions);
      const student = {
        name: form.elements.studentName.value.trim(),
        className: form.elements.studentClass.value.trim(),
      };
      lastPayload = createPayload(lesson, quiz, student, result);

      applyCorrections(form, questions, result.responses);
      scoreEl.textContent = `${result.score}/${result.maxScore} (${result.percentage}%)`;
      const correctCount = result.responses.filter((response) => response.correct).length;
      correctCountEl.textContent = `${correctCount}/${questions.length}`;
      reviewCountEl.textContent = `${questions.length - correctCount}`;
      percentEl.textContent = `${result.percentage}%`;
      resultEl.hidden = false;
      resetButton.hidden = false;
      setFormLocked(form, true);
      await runSubmission();
      resultEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });

    retryButton.addEventListener('click', runSubmission);
    resetButton.addEventListener('click', () => {
      setFormLocked(form, false);
      form.reset();
      resultEl.hidden = true;
      retryButton.hidden = true;
      resetButton.hidden = true;
      lastPayload = null;
      form.querySelectorAll('.quizQuestion').forEach((question) => {
        question.classList.remove('is-answered', 'is-correct', 'is-incorrect');
        question.querySelector('.quizCorrection').hidden = true;
        question.querySelector('.quizQuestionState').textContent = 'Unanswered';
        question.querySelectorAll('.quizChoice').forEach((choice) => {
          choice.classList.remove('is-answer', 'is-selected');
        });
      });
      updateProgress();
      mountEl.querySelector('.quizIdentity input')?.focus();
    });

    form.addEventListener('input', updateProgress);
    form.addEventListener('change', updateProgress);
    updateProgress();

    return { mode: 'quiz' };
  };
})();
