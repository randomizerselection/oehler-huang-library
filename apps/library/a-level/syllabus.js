(function () {
  'use strict';
  const data = window.ALEVEL_SYLLABUS;
  const storageKey = 'oh-a-level-syllabus-personal-v1';
  const statuses = ['Planned', 'In progress', 'Taught'];
  const byId = new Map(data.lessons.map(lesson => [lesson.id, lesson]));
  const points = new Map(data.sections.flatMap(section => section.points.map(point => [point.code, { ...point, section: section.id, sheet: section.sheet }])));
  const $ = id => document.getElementById(id);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const fraction = number => ({ .25: '¼', .5: '½', .75: '¾', 1.5: '1½', 1.25: '1¼', 1.75: '1¾' }[number] || String(number));
  const quantity = number => `${fraction(number)} ${number === 1 ? 'lesson' : 'lessons'}`;
  let view = 'lessons';
  let personal = {};
  let openLessons = new Set();
  let openPoints = new Set();
  let printOpen = [];
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    for (const [id, entry] of Object.entries(saved)) {
      if (!byId.has(id) || !entry || typeof entry !== 'object') continue;
      personal[id] = {
        date: /^\d{4}-\d{2}-\d{2}$/.test(entry.date || '') ? entry.date : '',
        status: statuses.includes(entry.status) ? entry.status : 'Planned',
        notes: typeof entry.notes === 'string' ? entry.notes.slice(0, 5000) : '',
      };
    }
  } catch {
    $('draft-status').textContent = 'Saved entries could not be loaded. You can still plan here and download a CSV copy.';
  }
  const entryFor = id => personal[id] || { date: '', status: 'Planned', notes: '' };
  const lessonCodes = lesson => lesson.allocations.map(allocation => allocation.code);
  const lessonSearch = lesson => [lesson.title, lesson.outcome, lesson.retrieve, lesson.teach, lesson.practice, lesson.check, lesson.followUp, ...lessonCodes(lesson).map(code => {
    const point = points.get(code);
    return `${code} ${point.topicTitle} ${point.wording} ${point.bullets}`;
  })].join(' ').toLowerCase();
  const matches = (section, haystack) => ($('section-filter').value === 'all' || $('section-filter').value === section) && haystack.toLowerCase().includes($('planner-search').value.trim().toLowerCase());
  const visibleLessons = () => data.lessons.filter(lesson => matches(lesson.section, lessonSearch(lesson)));
  const exactWording = point => `<div class="exact-wording"><p><strong>${escape(point.code)}</strong> ${escape(point.wording)}</p>${point.bullets ? `<div class="syllabus-bullets">${escape(point.bullets)}</div>` : ''}<p class="source-reference">Syllabus planner.xlsx · ${escape(point.sheet)} · ${escape(point.sourceRange)}</p></div>`;
  const personalPrint = entry => `Date: ${entry.date || 'Not set'} · Status: ${entry.status}${entry.notes ? '\nNotes: ' + entry.notes : ''}`;
  function lessonMarkup(lesson) {
    const entry = entryFor(lesson.id);
    const allocation = lesson.allocations.map(item => `${item.code}: ${quantity(item.lessons)}`).join(' · ') + (lesson.consolidation ? ` · Consolidation: ${quantity(lesson.consolidation)}` : '');
    return `<details class="lesson-plan" id="${lesson.id}" data-lesson="${lesson.id}"${openLessons.has(lesson.id) ? ' open' : ''}>
      <summary><span class="lesson-number">Lesson ${lesson.number}</span><span class="lesson-summary-copy"><strong class="lesson-heading">${escape(lesson.title)}</strong><span class="lesson-codes">${escape(lessonCodes(lesson).join(' · '))}</span></span><span class="personal-status" data-status="${entry.status}">${entry.status}</span></summary>
      <div class="plan-body">
        <p class="outcome"><strong>Learning outcome.</strong> ${escape(lesson.outcome)}</p>
        <p class="allocation">${escape(allocation)}${lesson.section === '11' ? ' · Provisional allocation' : ''}</p>
        <dl class="lesson-sequence">${[['Retrieve', lesson.retrieve], ['Teach and model', lesson.teach], ['Practise and apply', lesson.practice], ['Exit check', lesson.check]].map(([label, content]) => `<div><dt>${label}</dt><dd>${escape(content)}</dd></div>`).join('')}</dl>
        <p class="follow-up"><strong>Follow-up.</strong> ${escape(lesson.followUp)}</p>
        ${lesson.resource ? `<div class="lesson-resource"><a href="../${escape(lesson.resource.href)}">${escape(lesson.resource.label)}</a>${lesson.resource.note ? `<p>${escape(lesson.resource.note)}</p>` : ''}</div>` : ''}
        <details class="lesson-syllabus"><summary>Original syllabus wording</summary>${lessonCodes(lesson).map(code => exactWording(points.get(code))).join('')}</details>
        <div class="personal-plan">
          <label for="date-${lesson.id}">Planned date<input id="date-${lesson.id}" type="date" data-field="date" value="${escape(entry.date)}"></label>
          <label for="status-${lesson.id}">Teaching status<select id="status-${lesson.id}" data-field="status">${statuses.map(status => `<option${entry.status === status ? ' selected' : ''}>${status}</option>`).join('')}</select></label>
          <label for="notes-${lesson.id}">Planning notes<textarea id="notes-${lesson.id}" data-field="notes" rows="2" maxlength="5000" placeholder="Adjustments, resources or next steps">${escape(entry.notes)}</textarea></label>
        </div>
        <p class="print-personal">${escape(personalPrint(entry))}</p>
      </div>
    </details>`;
  }
  function pointMarkup(point) {
    const linked = data.lessons.filter(lesson => lessonCodes(lesson).includes(point.code));
    return `<details class="syllabus-point" data-point="${point.code}"${openPoints.has(point.code) ? ' open' : ''}><summary><span class="lesson-number">${point.code}</span><span class="lesson-summary-copy"><strong class="lesson-heading">${escape(point.wording)}</strong><span class="lesson-codes">${quantity(point.allocation)}${point.provisional ? ' · Provisional' : ' · Workbook allocation'}</span></span><span class="personal-status">${linked.map(lesson => 'L' + lesson.number).join(', ')}</span></summary><div class="plan-body">${exactWording(point)}${linked.map(lesson => `<a href="#${lesson.id}" data-open-lesson="${lesson.id}">Lesson ${lesson.number}: ${escape(lesson.title)}</a>`).join('')}</div></details>`;
  }
  function rememberOpen() {
    document.querySelectorAll('.lesson-plan').forEach(el => el.open ? openLessons.add(el.dataset.lesson) : openLessons.delete(el.dataset.lesson));
    document.querySelectorAll('.syllabus-point').forEach(el => el.open ? openPoints.add(el.dataset.point) : openPoints.delete(el.dataset.point));
  }
  function render() {
    rememberOpen();
    const lessons = visibleLessons();
    const visiblePoints = [...points.values()].filter(point => matches(point.section, `${point.code} ${point.topicTitle} ${point.wording} ${point.bullets}`));
    $('lesson-plans').innerHTML = data.sections.map(section => {
      const group = lessons.filter(lesson => lesson.section === section.id);
      return group.length ? `<section class="plan-section"><h3>${section.id} · ${escape(section.title)}</h3><p class="section-note">${group.length} ${group.length === 1 ? 'lesson' : 'lessons'}${section.id === '11' ? ' · Pacing is provisional' : ''}</p>${group.map(lessonMarkup).join('')}</section>` : '';
    }).join('');
    $('syllabus-points').innerHTML = data.sections.map(section => {
      const group = visiblePoints.filter(point => point.section === section.id);
      const topics = [...new Set(group.map(point => point.topic))];
      return group.length ? `<section class="plan-section"><h3>${section.id} · ${escape(section.title)}</h3>${topics.map(topic => {
        const members = group.filter(point => point.topic === topic);
        return `<section class="syllabus-topic"><h4>${topic} · ${escape(members[0].topicTitle)}</h4>${members.map(pointMarkup).join('')}</section>`;
      }).join('')}</section>` : '';
    }).join('');
    const isLessonView = view === 'lessons';
    $('lesson-plans').hidden = !isLessonView;
    $('syllabus-points').hidden = isLessonView;
    $('view-title').textContent = isLessonView ? 'Lesson plan' : 'Syllabus coverage';
    document.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
    const count = isLessonView ? lessons.length : visiblePoints.length;
    $('filter-status').textContent = `${count} of ${isLessonView ? data.lessons.length + ' lessons' : points.size + ' syllabus points'} shown`;
    $('empty-results').hidden = count !== 0;
    $('download-plan').hidden = !isLessonView;
    document.querySelector('.draft-help').hidden = !isLessonView;
    updateWeeks();
  }
  function updateWeeks() {
    const weekly = Number($('lessons-per-week').value);
    const valid = Number.isInteger(weekly) && weekly >= 1 && weekly <= 10;
    $('lessons-per-week').setAttribute('aria-invalid', String(!valid));
    $('weeks-output').textContent = valid ? `${Math.ceil(data.lessons.length / weekly)} teaching weeks for ${data.lessons.length} lessons` : 'Enter a whole number from 1 to 10.';
  }
  function openLesson(id) {
    if (!byId.has(id)) return;
    view = 'lessons';
    $('section-filter').value = 'all';
    $('planner-search').value = '';
    render();
    const element = $(id);
    element.open = true;
    openLessons.add(id);
    element.scrollIntoView({ block: 'start' });
    element.querySelector('summary').focus({ preventScroll: true });
  }
  function downloadCsv() {
    const weekly = Number($('lessons-per-week').value);
    const validWeekly = Number.isInteger(weekly) && weekly >= 1 && weekly <= 10;
    const rows = [['Lesson', 'Section', 'Title', 'Syllabus codes', 'Allocation', 'Suggested week', 'Planned date', 'Teaching status', 'Learning outcome', 'Retrieve', 'Teach and model', 'Practise and apply', 'Exit check', 'Follow-up', 'Planning notes']];
    visibleLessons().forEach(lesson => {
      const entry = entryFor(lesson.id);
      rows.push([lesson.number, lesson.section, lesson.title, lessonCodes(lesson).join('; '), lesson.allocations.map(a => `${a.code}: ${a.lessons}`).join('; ') + (lesson.consolidation ? `; consolidation: ${lesson.consolidation}` : ''), validWeekly ? Math.ceil(lesson.number / weekly) : '', entry.date, entry.status, lesson.outcome, lesson.retrieve, lesson.teach, lesson.practice, lesson.check, lesson.followUp, entry.notes]);
    });
    const cell = value => {
      let text = String(value ?? '');
      if (/^[\s]*[=+@-]/.test(text) || /^[\t\r]/.test(text)) text = "'" + text;
      return '"' + text.replaceAll('"', '""') + '"';
    };
    const blob = new Blob(['\ufeff' + rows.map(row => row.map(cell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'a-level-lesson-plan.csv';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $('draft-status').textContent = `Downloaded ${rows.length - 1} lesson plans with your dates, status and notes.`;
  }
  $('plan-summary').textContent = `${data.lessons.length} lessons · ${points.size} syllabus points · ${data.sections.length} sections`;
  $('source-list').innerHTML = data.sources.map(source => `<li><strong>${escape(source.name)}</strong> — ${escape(source.role)}</li>`).join('');
  $('planner-search').addEventListener('input', render);
  $('section-filter').addEventListener('change', render);
  $('lessons-per-week').addEventListener('input', updateWeeks);
  $('clear-filters').addEventListener('click', () => { $('planner-search').value = ''; $('section-filter').value = 'all'; render(); });
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => { view = button.dataset.view; render(); }));
  $('expand-plans').addEventListener('click', () => document.querySelectorAll(view === 'lessons' ? '.lesson-plan' : '.syllabus-point').forEach(el => { el.open = true; }));
  $('collapse-plans').addEventListener('click', () => document.querySelectorAll(view === 'lessons' ? '.lesson-plan' : '.syllabus-point').forEach(el => { el.open = false; }));
  $('syllabus-points').addEventListener('click', event => {
    const link = event.target.closest('[data-open-lesson]');
    if (!link) return;
    event.preventDefault();
    history.replaceState(null, '', '#' + link.dataset.openLesson);
    openLesson(link.dataset.openLesson);
  });
  $('lesson-plans').addEventListener('input', event => {
    const field = event.target.dataset.field;
    const lesson = event.target.closest('[data-lesson]');
    if (!lesson || !['date', 'status', 'notes'].includes(field)) return;
    const entry = { ...entryFor(lesson.dataset.lesson), [field]: event.target.value };
    personal[lesson.dataset.lesson] = entry;
    const status = lesson.querySelector('.personal-status');
    status.textContent = entry.status;
    status.dataset.status = entry.status;
    lesson.querySelector('.print-personal').textContent = personalPrint(entry);
    try {
      localStorage.setItem(storageKey, JSON.stringify(personal));
      $('draft-status').textContent = 'Dates, status and notes saved in this browser.';
    } catch {
      $('draft-status').textContent = 'Browser storage is unavailable or full. Download the plan CSV to keep your changes.';
    }
  });
  $('download-plan').addEventListener('click', downloadCsv);
  $('print-plan').addEventListener('click', () => window.print());
  window.addEventListener('beforeprint', () => {
    const visible = document.querySelectorAll(view === 'lessons' ? '.lesson-plan' : '.syllabus-point');
    printOpen = [...visible].map(el => [el, el.open]);
    visible.forEach(el => { el.open = true; });
  });
  window.addEventListener('afterprint', () => { printOpen.forEach(([el, open]) => { el.open = open; }); printOpen = []; });
  window.addEventListener('hashchange', () => openLesson(location.hash.slice(1)));
  render();
  openLesson(location.hash.slice(1));
})();
