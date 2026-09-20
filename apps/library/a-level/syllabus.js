(function () {
  'use strict';
  const data = window.ALEVEL_SYLLABUS;
  const storageKey = 'oh-a-level-syllabus-personal-v1';
  const statuses = ['Planned', 'In progress', 'Taught', 'Not confirmed'];
  const byId = new Map(data.lessons.map(lesson => [lesson.id, lesson]));
  const extras = data.extraSessions || [];
  const recordIds = new Set([...byId.keys(), ...extras.map(item => item.id)]);
  const schedule = new Map();
  data.semesterPlan.weeks.forEach(week => week.slots.forEach((slot, index) => {
    if (slot.lessonId) schedule.set(slot.lessonId, {plannedWeek:week.start,slot:index+1});
  }));
  extras.forEach(item => schedule.set(item.id,item));
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
      if (!recordIds.has(id) || !entry || typeof entry !== 'object') continue;
      personal[id] = {
        date: /^\d{4}-\d{2}-\d{2}$/.test(entry.date || '') ? entry.date : '',
        actualDate: /^\d{4}-\d{2}-\d{2}$/.test(entry.actualDate || '') ? entry.actualDate : '',
        status: statuses.includes(entry.status) ? entry.status : 'Planned',
        notes: typeof entry.notes === 'string' ? entry.notes.slice(0, 5000) : '',
      };
    }
  } catch {
    $('draft-status').textContent = 'Saved entries could not be loaded. You can still plan here and download a CSV copy.';
  }
  const entryFor = id => ({date:'',actualDate:'',status:'Planned',notes:'',...(data.teachingRecords?.[id] || {}),...(personal[id] || {})});
  const plannedFor = id => {
    const entry=entryFor(id), planned=schedule.get(id);
    if(entry.date) return entry.date;
    if(planned) return `Week of ${planned.plannedWeek}${planned.homework?' · homework':` · class ${planned.slot}`}`;
    return byId.get(id)?.section === '11' ? 'After 14 January 2027 · next-term dates TBC' : 'Earlier plan date not recorded';
  };
  const actualFor = id => {
    const entry=entryFor(id);
    return entry.actualDate || (entry.status==='Planned'?'Not yet taught':`Exact date unconfirmed${entry.reportedOn?' · reported '+entry.reportedOn:''}`);
  };
  const timingText = id => `Planned: ${plannedFor(id)} · Actually taught: ${actualFor(id)}`;
  const recordControls = id => {
    const entry=entryFor(id);
    return `<div class="personal-plan"><label for="date-${id}">Planned class date (optional override)<input id="date-${id}" type="date" data-field="date" value="${escape(entry.date)}"></label><label for="actual-${id}">Actual teaching date<input id="actual-${id}" type="date" data-field="actualDate" value="${escape(entry.actualDate)}"></label><label for="status-${id}">Teaching status<select id="status-${id}" data-field="status">${statuses.map(status=>`<option${entry.status===status?' selected':''}>${status}</option>`).join('')}</select></label><label for="notes-${id}">Planning notes<textarea id="notes-${id}" data-field="notes" rows="2" maxlength="5000">${escape(entry.notes)}</textarea></label></div>`;
  };
  const lessonCodes = lesson => lesson.allocations.map(allocation => allocation.code);
  const lessonSearch = lesson => [lesson.title, lesson.outcome, lesson.retrieve, lesson.teach, lesson.practice, lesson.check, lesson.followUp, ...lessonCodes(lesson).map(code => {
    const point = points.get(code);
    return `${code} ${point.topicTitle} ${point.wording} ${point.bullets}`;
  })].join(' ').toLowerCase();
  const matches = (section, haystack) => ($('section-filter').value === 'all' || $('section-filter').value === section) && haystack.toLowerCase().includes($('planner-search').value.trim().toLowerCase());
  const visibleLessons = () => data.lessons.filter(lesson => matches(lesson.section, lessonSearch(lesson)));
  const exactWording = point => `<div class="exact-wording"><p><strong>${escape(point.code)}</strong> ${escape(point.wording)}</p>${point.bullets ? `<div class="syllabus-bullets">${escape(point.bullets)}</div>` : ''}<p class="source-reference">Syllabus planner.xlsx · ${escape(point.sheet)} · ${escape(point.sourceRange)}</p></div>`;
  const personalPrint = (entry,id) => `${timingText(id)} · Status: ${entry.status}${entry.notes ? '\nNotes: ' + entry.notes : ''}`;
  function lessonMarkup(lesson) {
    const entry = entryFor(lesson.id);
    const allocation = lesson.allocations.map(item => `${item.code}: ${quantity(item.lessons)}`).join(' · ') + (lesson.consolidation ? ` · Consolidation: ${quantity(lesson.consolidation)}` : '');
    return `<details class="lesson-plan" id="${lesson.id}" data-lesson="${lesson.id}"${openLessons.has(lesson.id) ? ' open' : ''}>
      <summary><span class="lesson-number">Lesson ${lesson.number}</span><span class="lesson-summary-copy"><strong class="lesson-heading">${escape(lesson.title)}</strong><span class="lesson-codes">${escape(lessonCodes(lesson).join(' · '))}</span><span class="record-timing">${escape(timingText(lesson.id))}</span></span><span class="personal-status" data-status="${entry.status}">${entry.status}</span></summary>
      <div class="plan-body">
        ${entry.note?`<p class="coverage-note"><strong>Coverage record.</strong> ${escape(entry.note)}</p>`:''}
        <p class="outcome"><strong>Learning outcome.</strong> ${escape(lesson.outcome)}</p>
        <p class="allocation">${escape(allocation)}${lesson.section === '11' ? ' · Provisional allocation' : ''}</p>
        <dl class="lesson-sequence">${[['Retrieve', lesson.retrieve], ['Teach and model', lesson.teach], ['Practise and apply', lesson.practice], ['Exit check', lesson.check]].map(([label, content]) => `<div><dt>${label}</dt><dd>${escape(content)}</dd></div>`).join('')}</dl>
        <p class="follow-up"><strong>Follow-up.</strong> ${escape(lesson.followUp)}</p>
        ${lesson.resource ? `<div class="lesson-resource"><a href="../${escape(lesson.resource.href)}">${escape(lesson.resource.label)}</a>${lesson.resource.note ? `<p>${escape(lesson.resource.note)}</p>` : ''}</div>` : ''}
        <details class="lesson-syllabus"><summary>Original syllabus wording</summary>${lessonCodes(lesson).map(code => exactWording(points.get(code))).join('')}</details>
        ${recordControls(lesson.id)}
        <p class="print-personal">${escape(personalPrint(entry,lesson.id))}</p>
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
  const semester = data.semesterPlan;
  const semesterSlot = slot => slot.lessonId ? { ...slot, title: byId.get(slot.lessonId).title, href: '#' + slot.lessonId, codes: lessonCodes(byId.get(slot.lessonId)) } : slot;
  function renderSemester() {
    const slotHtml = raw => {
      const slot = semesterSlot(raw);
      const id=slot.lessonId || (slot.kind==='teaching'?'fiscal-continuation':null);
      return `<td><span class="semester-kind">${escape({teaching:'Teaching',reserve:'Reserved',review:'Assessment / review'}[slot.kind])}</span>${slot.href ? `<a href="${escape(slot.href)}">${escape(slot.title)}</a>` : escape(slot.title)}${slot.codes ? `<small>${escape(slot.codes.join(' · '))}</small>` : ''}${id?`<small data-semester-record="${id}">${escape(entryFor(id).status)} · Actually taught: ${escape(actualFor(id))}</small>`:''}</td>`;
    };
    $('semester-content').innerHTML = `<p><strong>Two 40-minute lessons per week · finish sections 9–10 before approximately 14 January 2027.</strong> Section 11 follows later.</p>
      <p><strong>32 nominal slots = 25 teaching + 4 holiday/disruption reserves + 3 assessment/review.</strong> The 16 full weeks run from 21 September to 10 January; any lessons on 11–14 January are additional contingency, not required to make this plan fit.</p>
      <p><strong>Reported coverage:</strong> growth/output gaps reached slide 20, <em>Output gaps and expenditure gaps</em>. Next: <a href="../lessons/9-2-2-fiscal-expansion-multiplier/index.html">Fiscal expansion and the multiplier</a>, still untaught. The schedule then covers reference lessons 6–29, targeting completion of new content in the week of 21 December.</p>
      <p>Keep model teaching, calculation/diagram practice and a short assessed response in class. Set complete essays and optional extensions as homework; use retrieval and feedback to address errors. The earlier full-employment essay workshop has no confirmed completion: assign its essay as diagnostic homework and use reserve/review time if further teaching is needed.</p>
      <details class="source-notes"><summary>Weekly semester schedule and assumptions</summary>
      <p>These are week windows, not fixed lesson dates. Holiday reserves around early October and New Year are planning allowances, not a confirmed school calendar; move them to match the actual timetable. If more than four slots are lost, use the final partial week and review the remaining budget. Prepared lessons and this schedule do not mark anything as taught.</p>
      <table class="semester-table"><caption>Forward plan from the teacher-reported stopping point</caption><thead><tr><th scope="col">Week beginning</th><th scope="col">First slot</th><th scope="col">Second slot</th></tr></thead><tbody>${semester.weeks.map(week => `<tr><th scope="row">${escape(week.start)}</th>${week.slots.map(slotHtml).join('')}</tr>`).join('')}</tbody></table>
      <p><strong>11–14 January:</strong> final corrections or catch-up if the timetable permits. No new syllabus topic is scheduled here.</p></details>`;
  }
  function saveCsv(rows, filename) {
    const cell = value => {
      let text = String(value ?? '');
      if (/^[\s]*[=+@-]/.test(text) || /^[\t\r]/.test(text)) text = "'" + text;
      return '"' + text.replaceAll('"', '""') + '"';
    };
    const blob = new Blob(['\ufeff' + rows.map(row => row.map(cell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function downloadSemester() {
    const rows = [['Week beginning', 'Slot', 'Type', 'Topic', 'Reference lesson', 'Syllabus codes','Planned date override','Actual teaching date','Status']];
    semester.weeks.forEach(week => week.slots.forEach((raw, i) => {
      const slot = semesterSlot(raw);
      const id=slot.lessonId || (slot.kind==='teaching'?'fiscal-continuation':null),entry=id?entryFor(id):{};
      rows.push([week.start, i + 1, slot.kind, slot.title, slot.lessonId || '', (slot.codes || []).join('; '),entry.date||'',entry.actualDate||'',entry.status||slot.kind]);
    }));
    saveCsv(rows, 'a-level-semester-to-2027-01-14.csv');
    $('semester-download-status').textContent = 'Downloaded 32 slots: 25 teaching, 4 reserves and 3 assessment/review.';
  }
  function downloadCsv() {
    const weekly = Number($('lessons-per-week').value);
    const validWeekly = Number.isInteger(weekly) && weekly >= 1 && weekly <= 10;
    const rows = [['Lesson', 'Section', 'Title', 'Syllabus codes', 'Allocation', 'Suggested week', 'Planned date', 'Teaching status', 'Learning outcome', 'Retrieve', 'Teach and model', 'Practise and apply', 'Exit check', 'Follow-up', 'Planning notes','Scheduled window','Actual teaching date','Coverage report date','Confirmed coverage']];
    visibleLessons().forEach(lesson => {
      const entry = entryFor(lesson.id);
      rows.push([lesson.number, lesson.section, lesson.title, lessonCodes(lesson).join('; '), lesson.allocations.map(a => `${a.code}: ${a.lessons}`).join('; ') + (lesson.consolidation ? `; consolidation: ${lesson.consolidation}` : ''), validWeekly ? Math.ceil(lesson.number / weekly) : '', entry.date, entry.status, lesson.outcome, lesson.retrieve, lesson.teach, lesson.practice, lesson.check, lesson.followUp, entry.notes,plannedFor(lesson.id),entry.actualDate,entry.reportedOn||'',entry.note||'']);
    });
    saveCsv(rows, 'a-level-lesson-plan.csv');
    $('draft-status').textContent = `Downloaded ${rows.length - 1} lesson plans with your dates, status and notes.`;
  }
  $('plan-summary').textContent = `${data.lessons.length} lessons · ${points.size} syllabus points · ${data.sections.length} sections`;
  renderSemester();
  $('continuation-records').innerHTML=extras.map(item=>{
    const entry=entryFor(item.id);
    return `<article class="continuation-record" data-lesson="${item.id}" id="${item.id}"><h3><a href="${escape(item.href)}">${escape(item.title)}</a></h3><span class="personal-status" data-status="${entry.status}">${entry.status}</span><p class="record-timing">${escape(timingText(item.id))}</p><p class="coverage-note">${escape(entry.note)}</p>${recordControls(item.id)}<p class="print-personal">${escape(personalPrint(entry,item.id))}</p></article>`;
  }).join('');
  $('download-semester').addEventListener('click', downloadSemester);
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
  document.addEventListener('input', event => {
    const field = event.target.dataset.field;
    const lesson = event.target.closest('[data-lesson]');
    if (!lesson || !['date', 'actualDate', 'status', 'notes'].includes(field)) return;
    const entry = { ...entryFor(lesson.dataset.lesson), [field]: event.target.value };
    personal[lesson.dataset.lesson] = entry;
    const status = lesson.querySelector('.personal-status');
    status.textContent = entry.status;
    status.dataset.status = entry.status;
    lesson.querySelector('.print-personal').textContent = personalPrint(entry,lesson.dataset.lesson);
    lesson.querySelector('.record-timing').textContent = timingText(lesson.dataset.lesson);
    document.querySelectorAll(`[data-semester-record="${lesson.dataset.lesson}"]`).forEach(el=>{el.textContent=`${entry.status} · Actually taught: ${actualFor(lesson.dataset.lesson)}`;});
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
    const visible = document.querySelectorAll((view === 'lessons' ? '.lesson-plan' : '.syllabus-point') + ', #semester-content details');
    printOpen = [...visible].map(el => [el, el.open]);
    visible.forEach(el => { el.open = true; });
  });
  window.addEventListener('afterprint', () => { printOpen.forEach(([el, open]) => { el.open = open; }); printOpen = []; });
  window.addEventListener('hashchange', () => openLesson(location.hash.slice(1)));
  render();
  openLesson(location.hash.slice(1));
})();
