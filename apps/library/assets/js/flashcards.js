window.IGCSE = window.IGCSE || {};

(() => {
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[m]));

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
  const sourceProfileKey = (lesson = {}, flashcards = {}) => {
    const meta = lesson?.meta || {};
    const text = `${meta.code || ''} ${meta.title || ''} ${meta.lessonLabel || ''} ${flashcards?.id || ''} ${flashcards?.title || ''}`.toLowerCase();
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
      return [item.term, item.definition, item.prompt, item.answer, item.hint]
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
  const renderSources = (sources = []) => {
    const items = normalizeSources(sources);
    if (!items.length) return '';
    return `
      <details class="flashcardSources">
        <summary>Sources</summary>
        <span class="sourcePanel" aria-label="Sources">
          ${items.map((source) => `
            <span class="sourceItem">
              <span class="sourceLabel">${esc(source.label)}</span>
              <span class="sourceRef">${esc(source.ref)}</span>
              ${source.note ? `<span class="sourceNote">${esc(source.note)}</span>` : ''}
              ${source.question ? `<span class="sourceQuestion"><b>Exam question:</b> ${esc(source.question)}</span>` : ''}
              ${source.extract ? `<span class="sourceExtract">${esc(source.extract)}</span>` : ''}
            </span>
          `).join('')}
        </span>
      </details>
    `;
  };

  const cardTags = (card) => {
    const baseTag = card.type === 'fillBlank' ? 'Fill in the blank' : 'Definition';
    const tags = [baseTag, ...(Array.isArray(card.tags) ? card.tags : [])]
      .filter((tag, index, arr) => tag && arr.indexOf(tag) === index);
    if (!tags.length) return '';
    return `
      <div class="flashcardTags" aria-label="Card tags">
        ${tags.map((tag) => `<span>${esc(tag)}</span>`).join('')}
      </div>
    `;
  };

  const normalizeCards = (cards = [], deckSources = [], profileKey = '') => cards
    .map((card, index) => {
      const type = card?.type === 'fillBlank' ? 'fillBlank' : 'definition';
      const front = type === 'fillBlank'
        ? card?.prompt
        : (card?.term || card?.front);
      const back = type === 'fillBlank'
        ? card?.answer
        : (card?.definition || card?.back);

      return {
        id: card?.id || `card-${index + 1}`,
        type,
        front,
        back,
        hint: card?.hint || '',
        tags: Array.isArray(card?.tags) ? card.tags : [],
        sources: normalizeSources(card?.sources).length
          ? mergeSources(card.sources, directSourcesForItem(profileKey, card))
          : mergeSources(deckSources, directSourcesForItem(profileKey, card)),
      };
    })
    .filter((card) => card.front && card.back);

  const shuffleCards = (cards) => {
    const next = [...cards];
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  };

  const isTypingTarget = (target) => {
    const tagName = target?.tagName?.toLowerCase();
    return target?.isContentEditable || ['input', 'select', 'textarea'].includes(tagName);
  };

  IGCSE.mountFlashcardLesson = function mountFlashcardLesson(lesson, flashcards, mountEl = document.getElementById('deck')) {
    const meta = lesson?.meta || {};
    const deckSources = normalizeSources(flashcards?.sources).length
      ? normalizeSources(flashcards.sources)
      : normalizeSources(lesson?.meta?.sources).length
        ? normalizeSources(lesson.meta.sources)
        : normalizeSources(SOURCE_PROFILES[sourceProfileKey(lesson, flashcards)] || []);
    const profileKey = sourceProfileKey(lesson, flashcards);
    const originalCards = normalizeCards(flashcards?.cards || [], deckSources, profileKey);
    let queue = [...originalCards];
    let flipped = false;
    const knownIds = new Set();
    const againIds = new Set();

    document.body.classList.add('is-flashcard-mode');
    document.body.classList.remove('is-quiz-mode');
    document.body.classList.remove('is-handout-mode');
    if (meta.title) document.title = `${meta.lessonLabel || meta.title} - Flashcards`;

    if (!originalCards.length) {
      mountEl.className = 'flashcardDeck';
      mountEl.removeAttribute('aria-live');
      mountEl.innerHTML = `
        <section class="flashcardShell">
          <header class="flashcardHero">
            <div class="flashcardKicker">${esc(meta.unit || meta.courseLabel || 'IGCSE Economics Lesson Library')}</div>
            <h1>${esc(meta.lessonLabel || meta.title || 'Lesson flashcards')}</h1>
            <p>This lesson does not yet have flashcards.</p>
          </header>
        </section>
      `;
      return { mode: 'flashcards' };
    }

    mountEl.className = 'flashcardDeck';
    mountEl.removeAttribute('aria-live');
    mountEl.innerHTML = `
      <section class="flashcardShell">
        <header class="flashcardHero">
          <div class="flashcardKicker">${esc(meta.unit || meta.courseLabel || 'IGCSE Economics Lesson Library')}</div>
          <h1>${esc(flashcards?.title || meta.lessonLabel || meta.title || 'Lesson flashcards')}</h1>
          ${flashcards?.description ? `<p>${esc(flashcards.description)}</p>` : ''}
        </header>

        <div class="flashcardStudy" aria-label="Flashcard revision deck">
          <div class="flashcardStatus">
            <div class="flashcardStatusText">
              <span>Queue</span>
              <strong class="flashcardPosition"></strong>
            </div>
            <div class="flashcardCounters" aria-label="Study progress">
              <span><b class="flashcardNewCount">0</b> left</span>
              <span><b class="flashcardAgainCount">0</b> again</span>
              <span><b class="flashcardKnownCount">0</b> know</span>
            </div>
            <div class="flashcardProgressTrack" role="progressbar" aria-label="Cards completed" aria-valuemin="0" aria-valuemax="${originalCards.length}" aria-valuenow="0">
              <span class="flashcardProgressFill"></span>
            </div>
          </div>

          <button type="button" class="flashcardCard" data-flashcard-card aria-live="polite" aria-pressed="false">
            <span class="flashcardFaceLabel"></span>
            <span class="flashcardPrompt"></span>
            <span class="flashcardHint"></span>
            <span class="flashcardTagMount"></span>
          </button>
          <div class="flashcardSourceMount"></div>

          <section class="flashcardComplete" data-flashcard-complete hidden>
            <p class="flashcardCompleteKicker">Session complete</p>
            <h2>All cards finished</h2>
            <dl>
              <div>
                <dt>Known</dt>
                <dd class="flashcardCompleteKnown">0</dd>
              </div>
              <div>
                <dt>Still marked again</dt>
                <dd class="flashcardCompleteAgain">0</dd>
              </div>
            </dl>
          </section>

          <div class="flashcardActions" aria-label="Flashcard controls">
            <button type="button" class="flashcardPrimaryButton" data-flashcard-show>Show Answer</button>
            <button type="button" class="flashcardMarkButton is-again" data-flashcard-mark="again" hidden>Again</button>
            <button type="button" class="flashcardMarkButton is-know" data-flashcard-mark="know" hidden>Know</button>
            <button type="button" class="flashcardSecondaryButton" data-flashcard-shuffle>Shuffle</button>
            <button type="button" class="flashcardSecondaryButton" data-flashcard-reset>Reset</button>
            <button type="button" class="flashcardPrimaryButton" data-flashcard-study-again hidden>Study again</button>
          </div>
        </div>
      </section>
    `;

    const positionEl = mountEl.querySelector('.flashcardPosition');
    const newEl = mountEl.querySelector('.flashcardNewCount');
    const knownEl = mountEl.querySelector('.flashcardKnownCount');
    const againEl = mountEl.querySelector('.flashcardAgainCount');
    const progressTrack = mountEl.querySelector('.flashcardProgressTrack');
    const progressFill = mountEl.querySelector('.flashcardProgressFill');
    const cardButton = mountEl.querySelector('[data-flashcard-card]');
    const faceLabel = mountEl.querySelector('.flashcardFaceLabel');
    const promptEl = mountEl.querySelector('.flashcardPrompt');
    const hintEl = mountEl.querySelector('.flashcardHint');
    const sourceMount = mountEl.querySelector('.flashcardSourceMount');
    const tagMount = mountEl.querySelector('.flashcardTagMount');
    const completeEl = mountEl.querySelector('[data-flashcard-complete]');
    const completeKnownEl = mountEl.querySelector('.flashcardCompleteKnown');
    const completeAgainEl = mountEl.querySelector('.flashcardCompleteAgain');
    const showButton = mountEl.querySelector('[data-flashcard-show]');
    const shuffleButton = mountEl.querySelector('[data-flashcard-shuffle]');
    const resetButton = mountEl.querySelector('[data-flashcard-reset]');
    const studyAgainButton = mountEl.querySelector('[data-flashcard-study-again]');
    const markButtons = [...mountEl.querySelectorAll('[data-flashcard-mark]')];

    const resetSession = () => {
      queue = [...originalCards];
      flipped = false;
      knownIds.clear();
      againIds.clear();
      update();
    };

    const update = () => {
      const completed = knownIds.size;
      const complete = queue.length === 0;
      const card = queue[0];

      positionEl.textContent = complete ? 'Complete' : `${queue.length} left`;
      newEl.textContent = queue.length;
      knownEl.textContent = knownIds.size;
      againEl.textContent = againIds.size;
      progressTrack.setAttribute('aria-valuenow', String(completed));
      progressFill.style.width = `${(completed / originalCards.length) * 100}%`;

      completeEl.hidden = !complete;
      cardButton.hidden = complete;
      showButton.hidden = complete || flipped;
      shuffleButton.hidden = complete;
      studyAgainButton.hidden = !complete;
      completeKnownEl.textContent = knownIds.size;
      completeAgainEl.textContent = againIds.size;

      markButtons.forEach((button) => {
        button.hidden = complete || !flipped;
        button.disabled = complete || !flipped;
      });

      if (complete) return;

      cardButton.classList.toggle('is-flipped', flipped);
      cardButton.classList.toggle('is-known', knownIds.has(card.id));
      cardButton.classList.toggle('is-again', againIds.has(card.id));
      cardButton.setAttribute('aria-pressed', flipped ? 'true' : 'false');
      faceLabel.textContent = flipped
        ? (card.type === 'fillBlank' ? 'Answer' : 'Definition')
        : (card.type === 'fillBlank' ? 'Fill in the blank' : 'Key term');
      promptEl.textContent = flipped ? card.back : card.front;
      hintEl.textContent = flipped ? (card.hint || '') : 'Click the card or press Show Answer to check your answer.';
      hintEl.hidden = flipped ? !card.hint : false;
      sourceMount.innerHTML = flipped ? renderSources(card.sources) : '';
      sourceMount.hidden = !flipped || !normalizeSources(card.sources).length;
      tagMount.innerHTML = cardTags(card);
    };

    const showAnswer = () => {
      if (queue.length === 0 || flipped) return;
      flipped = true;
      update();
    };

    const mark = (value) => {
      if (!flipped || queue.length === 0) return;
      const [card] = queue;
      if (value === 'again') {
        againIds.add(card.id);
        queue = [...queue.slice(1), card];
      } else {
        knownIds.add(card.id);
        againIds.delete(card.id);
        queue = queue.slice(1);
      }
      flipped = false;
      update();
    };

    cardButton.addEventListener('click', showAnswer);
    showButton.addEventListener('click', showAnswer);
    markButtons.forEach((button) => {
      button.addEventListener('click', () => mark(button.dataset.flashcardMark));
    });
    shuffleButton.addEventListener('click', () => {
      queue = shuffleCards(queue);
      flipped = false;
      update();
    });
    resetButton.addEventListener('click', resetSession);
    studyAgainButton.addEventListener('click', resetSession);
    document.addEventListener('keydown', (event) => {
      if (!document.body.classList.contains('is-flashcard-mode') || isTypingTarget(event.target)) return;
      if (!flipped && [' ', 'Enter'].includes(event.key)) {
        event.preventDefault();
        showAnswer();
      } else if (flipped && event.key === '1') {
        event.preventDefault();
        mark('again');
      } else if (flipped && event.key === '2') {
        event.preventDefault();
        mark('know');
      }
    });

    update();
    return { mode: 'flashcards' };
  };
})();
