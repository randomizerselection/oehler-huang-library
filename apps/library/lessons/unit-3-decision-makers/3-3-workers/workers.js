/* Lesson-owned classroom interactions and accessible print preparation. */
window.IGCSE = window.IGCSE || {};

IGCSE.prepareWorkerHandout = () => {
  if (new URLSearchParams(location.search).get('view') !== 'print') return;
  IGCSE.lesson = {
    ...IGCSE.lesson,
    slides: IGCSE.lesson.slides.flatMap((slide) => {
      if (slide.type !== 'quiz') return [slide];
      const question = {
        ...slide,
        type: 'paperExtract',
        title: slide.eyebrow,
        paragraphs: [slide.question],
        question: undefined,
      };
      const options = {
        id: `${slide.id}-options`,
        type: 'paperExtract',
        title: 'Options',
        paragraphs: slide.choices.map((choice, index) => `${String.fromCharCode(65 + index)}. ${choice}`),
        sources: (slide.sources || []).filter((source) => source.label === 'Question paper'),
      };
      const answer = {
        id: `${slide.id}-answer`,
        type: 'modelAnswer',
        title: `${slide.eyebrow} · Feedback`,
        answer: slide.prompt,
        examSpec: { paper: 'Paper 1', marks: 1 },
        sources: (slide.sources || []).filter((source) => source.label !== 'Question paper'),
      };
      return [question, options, answer];
    }),
  };
};

IGCSE.mountWorkers = () => {
  const factorIcons = [
    '<path d="M18 48h64v38H18zM30 48V32h40v16M28 65h44"/><circle cx="67" cy="72" r="10" fill="#d6a34a"/>',
    '<circle cx="50" cy="50" r="32"/><path d="M50 31v21l16 10M50 12v8M50 80v8M12 50h8M80 50h8"/><path d="M74 18l10 10"/>',
    '<path d="M18 82V43l32-22 32 22v39M32 82V58h36v24"/><path d="M42 45h16"/><circle cx="50" cy="45" r="17" fill="#dce9e6"/>',
    '<path d="M20 82h60M28 82V38h44v44M38 38V24h24v14M41 53h18M41 66h18"/><path d="M76 25l8 8 14-18"/>',
    '<circle cx="50" cy="42" r="24"/><path d="M37 42l9 9 18-20M22 82h56"/><path d="M33 67l-7 15M67 67l7 15"/>',
    '<path d="M18 77h64M25 77V42h50v35M36 42V28h28v14"/><path d="M32 60h36"/><circle cx="77" cy="26" r="12" fill="#d6a34a"/>',
  ];

  document.querySelectorAll('.is-layout-worker-factor-overview').forEach((slide) => {
    slide.querySelectorAll('.cardgrid > .card').forEach((card, index) => {
      const icon = document.createElement('div');
      icon.className = 'worker-factor-icon';
      icon.innerHTML = `<svg viewBox="0 0 100 100" role="img" aria-hidden="true" fill="none" stroke="#142f43" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${factorIcons[index % factorIcons.length]}</svg>`;
      card.prepend(icon);
    });
  });

  document.querySelectorAll('.is-layout-worker-factor-detail').forEach((slide) => {
    const slideData = IGCSE.lesson.slides[Number(slide.dataset.idx)];
    const heading = slide.querySelector('h2');
    if (heading && slideData?.zhTitle && !heading.querySelector('.worker-factor-title-zh')) {
      const translation = document.createElement('span');
      translation.className = 'worker-factor-title-zh';
      translation.lang = 'zh-Hans';
      translation.textContent = slideData.zhTitle;
      heading.append(translation);
    }
    const lead = slide.querySelector('.lead');
    if (lead && slideData?.leadHighlights?.length) {
      const sentence = lead.textContent;
      const phrases = slideData.leadHighlights
        .map((phrase) => ({ phrase, start: sentence.indexOf(phrase) }))
        .filter(({ start }) => start >= 0)
        .sort((a, b) => a.start - b.start);
      const marked = document.createDocumentFragment();
      let cursor = 0;
      for (const { phrase, start } of phrases) {
        if (start < cursor) continue;
        marked.append(document.createTextNode(sentence.slice(cursor, start)));
        const highlight = document.createElement('mark');
        highlight.className = 'worker-definition-highlight';
        highlight.textContent = phrase;
        marked.append(highlight);
        cursor = start + phrase.length;
      }
      marked.append(document.createTextNode(sentence.slice(cursor)));
      lead.replaceChildren(marked);
    }
  });

  document.querySelectorAll('.is-layout-worker-data-chart').forEach((slide) => {
    const slideData = IGCSE.lesson.slides[Number(slide.dataset.idx)];
    const max = Number(slideData?.chart?.max);
    if (!(max > 0)) return;
    slide.querySelectorAll('.cardgrid > .card').forEach((card, index) => {
      const value = Number(slideData.cards[index]?.body);
      if (!Number.isFinite(value)) return;
      const track = document.createElement('div');
      track.className = 'worker-chart-track';
      track.setAttribute('aria-hidden', 'true');
      const fill = document.createElement('span');
      fill.className = 'worker-chart-fill';
      fill.style.width = `${Math.min(100, Math.max(0, value / max * 100))}%`;
      track.append(fill);
      card.append(track);
      card.setAttribute('aria-label', `${slideData.cards[index].title}: ${value} ${slideData.chart.unit}`);
    });
  });
};
