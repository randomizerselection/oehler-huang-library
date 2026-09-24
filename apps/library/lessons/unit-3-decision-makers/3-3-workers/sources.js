/* Lesson-owned source controls. Original questions, official schemes and teacher models remain distinct. */
(() => {
  'use strict';
  const slides = [...document.querySelectorAll('#deck .slide')];
  if (!slides.length || !document.body.classList.contains('worker-classroom')) return;
  const lesson = window.IGCSE.lesson;
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);

  function records(slide) {
    const list = (slide.sources || []).map((source) => ({
      type: source.label,
      ref: source.ref,
      detail: [source.note, source.question, source.extract].filter(Boolean).join('\n\n'),
      url: source.url,
    }));
    if (slide.type === 'quiz') {
      const questionPaper = list.find((record) => record.type === 'Question paper');
      if (questionPaper) questionPaper.choices = slide.choices;
    }
    if (slide.type === 'modelAnswer') {
      list.push({
        type: 'Teaching model',
        ref: 'Teacher-written answer; separate from the official mark scheme',
        detail: slide.answer,
      });
    }
    if (slide.type === 'classificationTask') {
      list.push({
        type: 'Teaching model',
        ref: 'Teacher-written retrieval or application',
        detail: slide.items.map((item) => `${item.text}\n${item.answer}`).join('\n\n'),
      });
    }
    if (slide.notes && slide.layout?.startsWith('worker-')) {
      list.push({
        type: 'Teaching notes',
        ref: 'Explanation, assumptions and classroom use',
        detail: slide.notes,
      });
    }
    const visuals = [
      slide.visual,
      ...(slide.cards || []).map((card) => card?.visual || card?.photo || card?.image),
    ].filter((visual) => visual?.source || visual?.generated);
    const seenPhotoSources = new Set();
    visuals.forEach((visual) => {
      const key = visual.source || visual.src;
      if (seenPhotoSources.has(key)) return;
      seenPhotoSources.add(key);
      list.push({
        type: visual.generated ? 'Generated image' : 'Photo',
        ref: visual.alt,
        detail: visual.credit,
        url: visual.source,
      });
    });
    return list;
  }

  const dialog = document.createElement('dialog');
  dialog.className = 'classroom-source-dialog';
  dialog.setAttribute('aria-labelledby', 'classroomSourceTitle');
  dialog.innerHTML = '<header class="classroom-dialog-head"><h2 id="classroomSourceTitle">Content sources</h2><button type="button" aria-label="Close content sources" autofocus>×</button></header><div class="classroom-source-content"></div>';
  document.body.append(dialog);
  let invoker;

  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', (event) => event.stopPropagation());
  dialog.addEventListener('close', () => {
    if (invoker?.isConnected) invoker.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rectangle = dialog.getBoundingClientRect();
    if (
      event.clientX < rectangle.left ||
      event.clientX > rectangle.right ||
      event.clientY < rectangle.top ||
      event.clientY > rectangle.bottom
    ) dialog.close();
  });

  const optionsMarkup = (record) => record.choices
    ? `<ol type="A">${record.choices.map((choice) => `<li>${escape(choice)}</li>`).join('')}</ol>`
    : '';

  slides.forEach((slide, index) => {
    const entries = records(lesson.slides[index]);
    const navigation = document.createElement('nav');
    navigation.className = 'classroom-source-buttons';
    navigation.setAttribute('aria-label', 'Slide content sources');
    [...new Set(entries.map((record) => record.type))].forEach((type) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = type;
      button.setAttribute('aria-label', `Show ${type.toLowerCase()} sources`);
      button.setAttribute('aria-haspopup', 'dialog');
      button.addEventListener('click', () => {
        invoker = button;
        dialog.querySelector('.classroom-source-content').innerHTML = entries
          .filter((record) => record.type === type)
          .map((record) => `
            <article>
              <p class="classroom-source-type">${escape(record.type)}</p>
              <h3>${escape(record.ref)}</h3>
              <p class="classroom-source-detail">${escape(record.detail)}</p>
              ${optionsMarkup(record)}
              ${/^https?:\/\//.test(record.url || '') ? `<a href="${escape(record.url)}" target="_blank" rel="noopener">Open original source ↗</a>` : ''}
            </article>`)
          .join('');
        dialog.showModal();
      });
      navigation.append(button);
    });
    const topline = slide.querySelector('.topline');
    if (topline) topline.append(navigation);
    const number = document.createElement('span');
    number.className = 'classroom-slide-number';
    number.textContent = String(index + 1).padStart(2, '0');
    const footer = slide.querySelector('.slide-footer');
    if (footer) footer.append(number);
  });
})();
