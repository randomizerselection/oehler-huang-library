import { authFetch, getAuthState, initializeAccountUI, loadStoredRun, openAccountDialog, saveRunDecision } from "./auth.js";
import { assignmentAction, createAssignment, listAssignments, listAssignmentSubmissions, updateAssignment } from "./assignments.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const elements = {
  notice: $("#teacher-notice"), gate: $("#teacher-auth-gate"), workspace: $("#teacher-workspace"), newAssignment: $("#new-assignment"),
  gateTitle: $("#teacher-gate-title"), gateHelp: $("#teacher-gate-help"), gateLogin: $("#teacher-gate-login"), gateRegister: $("#teacher-gate-register"),
  list: $("#assignment-list"), inboxTitle: $("#inbox-title"), inboxCount: $("#inbox-count"), inboxDescription: $("#inbox-description"), submissions: $("#submission-list"),
  assignmentDialog: $("#assignment-dialog"), assignmentForm: $("#assignment-form"), editId: $("#assignment-edit-id"), formTitle: $("#assignment-dialog-title"), title: $("#assignment-title"), instructions: $("#assignment-instructions"), question: $("#assignment-question"), command: $("#assignment-command"), maxMark: $("#assignment-max-mark"), markScheme: $("#assignment-mark-scheme"), formError: $("#assignment-form-error"),
  submissionDialog: $("#submission-dialog"), student: $("#submission-student"), meta: $("#submission-meta"), image: $("#submission-image"), transcript: $("#submission-transcript"), evidence: $("#submission-evidence"), score: $("#submission-score"), max: $("#submission-max"), confidence: $("#submission-confidence"), feedback: $("#submission-feedback"), decision: $("#submission-decision"), approve: $("#submission-approve"), reject: $("#submission-reject"), adjustToggle: $("#submission-adjust-toggle"), adjustForm: $("#submission-adjust-form"), adjustMark: $("#submission-adjust-mark"), adjustReason: $("#submission-adjust-reason"), adjustSave: $("#submission-adjust-save"), toast: $("#teacher-toast")
  , quizGradebook: $("#quiz-gradebook"), quizFilters: $("#quiz-filters"), quizRows: $("#quiz-gradebook-rows"), quizSummary: $("#quiz-gradebook-summary"), quizExport: $("#quiz-export")
  , studentsPanel: $("#students-panel"), studentsClassSelect: $("#students-class-select"), studentsFormClassSelect: $("#students-form-class-select"), studentsSearch: $("#students-search"), studentsAttentionOnly: $("#students-attention-only"), studentsRows: $("#students-rows"), studentsSummary: $("#students-summary"), studentsStats: $("#students-stats"), studentsAttention: $("#students-attention"), studentsAttendanceLog: $("#students-attendance-log"),
  studentDialog: $("#student-dialog"), studentDialogName: $("#student-dialog-name"), studentDialogMeta: $("#student-dialog-meta"), studentAttendance: $("#student-attendance"), studentHomework: $("#student-homework"), studentSelector: $("#student-selector")
};

const requestedTab = new URLSearchParams(location.search).get("tab");
const state = { assignments: [], filter: "all", selectedAssignmentId: null, selectedRun: null, classes: null, studentOverview: null, tab: ["quizzes", "students"].includes(requestedTab) ? requestedTab : "assignments" };

const ATTENDANCE_LABELS = { present: "Present", absent: "Absent" };
const HOMEWORK_LABELS = { submitted: "Submitted", late: "Late", missing: "Missing", exempt: "Exempt", awaiting_working: "Working required" };

function fmtDate(value) { if (!value) return "—"; const d = new Date(value); return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" }); }
function fmtTime(value) { if (!value) return "—"; const d = new Date(value); return Number.isNaN(d.getTime()) ? "—" : d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }); }
function fmtDateTime(value) { return value ? `${fmtDate(value)} ${fmtTime(value)}` : "—"; }
function studentCountLabel(count) { return `${count} ${count === 1 ? "student" : "students"}`; }
function overviewClassName(payload) { return elements.studentsClassSelect.value === "all" ? "All courses" : payload.class.name; }
function lessonLabel(title, contentId) {
  if (title) return title;
  if (!contentId) return "—";
  const slug = String(contentId).split(/[\\/#]/).filter(Boolean).at(-1).replace(/^\d+(?:-\d+)*-/, "").replace(/[-_]+/g, " ").trim();
  return slug ? `${slug.charAt(0).toUpperCase()}${slug.slice(1)}` : contentId;
}
function pill(label, kind) { const span = document.createElement("span"); span.className = `pill pill-${kind}`; span.textContent = label; return span; }
function meterCell(pct, detail) {
  const wrap = node("div", "meter-cell");
  const bar = node("div", "meter"); const fill = node("i"); fill.style.width = `${Math.max(0, Math.min(100, pct))}%`;
  fill.className = pct >= 90 ? "good" : pct >= 70 ? "mid" : "low";
  bar.append(fill);
  wrap.append(bar, node("b", "", `${pct}%`), node("small", "", detail));
  return wrap;
}
function classLabel(classId) { return state.classes?.find((item) => item.class_id === classId)?.name || classId || "—"; }
function gradeChips(selector) {
  const wrap = node("div", "grade-chips");
  const grades = [["A*", selector.a_star], ["A", selector.a_count], ["B", selector.b_count], ["C", selector.c_count], ["Not rated", selector.no_grade]].filter(([, count]) => count > 0);
  if (!grades.length) { wrap.append(node("span", "muted", "—")); return wrap; }
  grades.forEach(([grade, count]) => wrap.append(node("span", `grade-chip grade-${grade === "A*" ? "astar" : grade === "Not rated" ? "none" : grade.toLowerCase()}`, `${grade} × ${count}`)));
  return wrap;
}

function node(tag, className, text) { const item = document.createElement(tag); if (className) item.className = className; if (text != null) item.textContent = text; return item; }
function toast(message, error = false) { elements.toast.textContent = message; elements.toast.className = `toast show${error ? " error" : ""}`; clearTimeout(toast.timer); toast.timer = setTimeout(() => { elements.toast.className = "toast"; }, 4200); }
function notice(message, error = false) { elements.notice.textContent = message; elements.notice.className = `teacher-notice show${error ? " error" : ""}`; }

function requireTeacher() {
  const auth = getAuthState();
  const teacher = auth.authenticated && auth.account?.role === "teacher";
  elements.gate.hidden = teacher;
  elements.workspace.hidden = !teacher || state.tab !== "assignments";
  elements.quizGradebook.hidden = !teacher || state.tab !== "quizzes";
  elements.studentsPanel.hidden = !teacher || state.tab !== "students";
  elements.newAssignment.hidden = !teacher || state.tab !== "assignments";
  $$('[data-teacher-tab]').forEach((link) => link.classList.toggle('active', link.dataset.teacherTab === state.tab));
  const wrongRole = auth.authenticated && !teacher;
  elements.gateTitle.textContent = wrongRole ? "Teacher account required" : "Sign in to manage assignments";
  elements.gateHelp.textContent = wrongRole ? "You are signed in with a student account. Switch to a teacher account to continue." : "An administrator invitation is required to create a new account.";
  elements.gateLogin.textContent = wrongRole ? "Switch account" : "Sign in";
  if (wrongRole) notice("This area requires a teacher account.", true);
  else { elements.notice.textContent = ""; elements.notice.className = "teacher-notice"; }
  return teacher;
}

function assignmentPayload() {
  return { title: elements.title.value.trim(), student_instructions: elements.instructions.value.trim(), question_text: elements.question.value.trim(), command_word: elements.command.value, max_mark: Number(elements.maxMark.value), mark_scheme_text: elements.markScheme.value.trim() };
}

function openAssignmentForm(assignment = null) {
  elements.editId.value = assignment?.assignment_id ?? "";
  elements.formTitle.textContent = assignment ? `Edit draft · V${assignment.version}` : "New assignment";
  elements.title.value = assignment?.title ?? "";
  elements.instructions.value = assignment?.student_instructions ?? "";
  elements.question.value = assignment?.question_text ?? "";
  elements.command.value = assignment?.command_word ?? "Discuss";
  elements.maxMark.value = String(assignment?.max_mark ?? 8);
  elements.markScheme.value = assignment?.mark_scheme_text ?? "";
  elements.formError.textContent = "";
  elements.assignmentDialog.showModal();
}

async function saveAssignment(event) {
  event.preventDefault();
  try {
    const id = elements.editId.value;
    const assignment = id ? await updateAssignment(id, assignmentPayload()) : await createAssignment(assignmentPayload());
    elements.assignmentDialog.close();
    await refreshAssignments(assignment.assignment_id);
    toast(id ? "Draft updated." : "Assignment draft created. A student share code will be generated when you publish it.");
  } catch (error) { elements.formError.textContent = error.message; }
}

function statusLabel(status) { return ({ draft: "Draft", published: "Published", archived: "Archived" })[status] ?? status; }

async function copyShareLink(assignment) {
  const link = `${location.origin}/econmark/?code=${encodeURIComponent(assignment.share_code)}`;
  try { await navigator.clipboard.writeText(link); toast(`Student link copied: ${assignment.share_code}`); }
  catch { toast(`Share link: ${link}`); }
}

async function performAction(assignment, action) {
  try {
    const result = await assignmentAction(assignment.assignment_id, action);
    await refreshAssignments(result.assignment_id);
    toast(action === "publish" ? `Assignment published. Share code: ${result.share_code}.` : action === "revise" ? `Draft V${result.version} created.` : "Assignment archived. New submissions are no longer accepted.");
    if (action === "revise") openAssignmentForm(result);
  } catch (error) { toast(error.message, true); }
}

function renderAssignments() {
  elements.list.replaceChildren();
  const assignments = state.assignments.filter((item) => state.filter === "all" || item.status === state.filter);
  if (!assignments.length) { elements.list.append(node("div", "assignment-empty", state.assignments.length ? "No assignments match this filter." : "No assignments yet. Select “New assignment” to create your first question and mark scheme.")); return; }
  assignments.forEach((assignment) => {
    const article = node("article", `assignment-item${state.selectedAssignmentId === assignment.assignment_id ? " selected" : ""}`);
    const header = node("header"); const copy = node("div"); copy.append(node("h3", "", `${assignment.title} · V${assignment.version}`), node("p", "", `${assignment.command_word} [${assignment.max_mark}] · ${assignment.question_text}`));
    header.append(copy, node("span", `assignment-status ${assignment.status}`, statusLabel(assignment.status))); article.append(header);
    if (assignment.share_code) article.append(node("span", "assignment-code", assignment.share_code));
    const actions = node("div", "assignment-actions");
    const actionButton = (label, handler, primary = false) => { const button = node("button", primary ? "primary" : "", label); button.type = "button"; button.addEventListener("click", handler); actions.append(button); };
    if (assignment.status === "draft") { actionButton("Edit draft", () => openAssignmentForm(assignment)); actionButton("Publish and create code", () => performAction(assignment, "publish"), true); }
    if (assignment.status === "published") {
      actionButton("View submissions", () => selectAssignment(assignment), true); actionButton("Copy student link", () => copyShareLink(assignment));
      const single = node("a", "", "Use for single marking"); single.href = `/econmark/single?assignment=${encodeURIComponent(assignment.assignment_id)}`; const batch = node("a", "", "Use for batch marking"); batch.href = `/econmark/batch?assignment=${encodeURIComponent(assignment.assignment_id)}`; actions.append(single, batch);
      actionButton("Create new version", () => performAction(assignment, "revise")); actionButton("Archive", () => performAction(assignment, "archive"));
    }
    if (assignment.status === "archived") { actionButton("View previous submissions", () => selectAssignment(assignment)); actionButton("Create new version", () => performAction(assignment, "revise")); }
    article.append(actions); elements.list.append(article);
  });
}

async function refreshAssignments(selectId = state.selectedAssignmentId) {
  if (!requireTeacher()) return;
  try { state.assignments = (await listAssignments()).items; state.selectedAssignmentId = selectId && state.assignments.some((item) => item.assignment_id === selectId) ? selectId : null; renderAssignments(); if (state.selectedAssignmentId) await renderSubmissions(); }
  catch (error) { notice(error.message, true); }
}

async function selectAssignment(assignment) { state.selectedAssignmentId = assignment.assignment_id; renderAssignments(); await renderSubmissions(); }

async function renderSubmissions() {
  const assignment = state.assignments.find((item) => item.assignment_id === state.selectedAssignmentId);
  if (!assignment) return;
  elements.inboxTitle.textContent = assignment.title; elements.inboxDescription.textContent = `V${assignment.version} · ${assignment.share_code ?? "No share code"}`; elements.submissions.replaceChildren();
  try {
    const payload = await listAssignmentSubmissions(assignment.assignment_id); elements.inboxCount.textContent = payload.total;
    if (!payload.items.length) { elements.submissions.append(node("div", "assignment-empty", "No students have submitted work using this assignment code.")); return; }
    payload.items.forEach((item) => { const button = node("button", "submission-item"); button.type = "button"; const mark = Number.isInteger(item.final_mark) ? item.final_mark : "Provisional"; button.append(node("strong", "", item.student_ref), node("span", "", `${new Date(item.created_at).toLocaleString("en-GB")} · ${item.confidence}`), node("b", "", `${mark}/${item.max_mark}`)); button.addEventListener("click", () => openSubmission(item.run_id)); elements.submissions.append(button); });
  } catch (error) { elements.submissions.append(node("div", "assignment-empty", error.message)); }
}

function renderEvidence(items = []) { elements.evidence.replaceChildren(); items.forEach((item) => { const article = node("article", `evidence-item ${item.credit_status === "not_credited" ? "not-credited" : ""}`); const header = node("header"); header.append(node("b", "", item.rubric_reference), node("span", "", item.credit_status === "not_credited" ? "No credit" : `+${item.mark_value}`)); article.append(header, node("blockquote", "", `“${item.transcript_quote}”`), node("p", "", item.economic_reason)); elements.evidence.append(article); }); }

async function openSubmission(runId) {
  try {
    state.selectedRun = await loadStoredRun(runId); const record = state.selectedRun; const output = record.output; const feedback = output.feedback_en ?? output.feedback_zh;
    elements.student.textContent = record.input.student_ref; elements.meta.textContent = `${record.input.question_text} · ${new Date(record.persistence.stored_at).toLocaleString("en-GB")}`; elements.image.src = record.persistence.image_url; elements.transcript.textContent = record.input.confirmed_transcript.text; renderEvidence(output.evidence);
    elements.score.textContent = output.final_mark ?? output.provisional_mark; elements.max.textContent = `/ ${output.max_mark}`; elements.confidence.textContent = `${output.confidence} · ${output.manual_review_required ? "Manual review required" : "Ready for teacher confirmation"}`; elements.feedback.textContent = [...(feedback?.strengths ?? []), ...(feedback?.priorities ?? []).map((item) => item.text)].join(" "); elements.adjustMark.max = String(output.max_mark); elements.adjustMark.value = String(output.provisional_mark);
    const review = output.teacher_review; elements.decision.textContent = review ? (review.decision === "rejected" ? "The teacher rejected this result." : `Teacher-confirmed final mark: ${output.final_mark}/${output.max_mark}`) : "Awaiting teacher review."; elements.adjustForm.hidden = true; elements.submissionDialog.showModal();
  } catch (error) { toast(error.message, true); }
}

async function decide(review) { if (!state.selectedRun) return; try { state.selectedRun = await saveRunDecision(state.selectedRun.output.run_id, review); elements.submissionDialog.close(); await renderSubmissions(); toast("Teacher decision saved. The student will see the update when they reopen the record."); } catch (error) { toast(error.message, true); } }

function quizFilterParams() {
  const params = new URLSearchParams();
  for (const [key, value] of new FormData(elements.quizFilters)) if (String(value).trim()) params.set(key, String(value).trim());
  return params;
}

function renderQuizAttempts(payload) {
  elements.quizRows.replaceChildren();
  elements.quizSummary.textContent = `Showing ${payload.items.length} of ${payload.total} matching records. Class names reflect the student’s class at the time of submission.`;
  for (const item of payload.items) {
    const row = document.createElement('tr');
    const values = [
      new Date(item.created_at).toLocaleString('en-GB'),
      item.class_name,
      `${item.display_name}${item.student_id ? ` (${item.student_id})` : ""}`,
      `${item.course_title || item.course_id} · ${item.lesson_title || item.lesson_id}`,
      `${item.quiz_id} · v${item.quiz_version}`,
      `${item.score}/${item.max_score} (${item.percentage}%)`
    ];
    values.forEach((value) => row.append(node('td', '', value)));
    elements.quizRows.append(row);
  }
  if (!payload.items.length) { const row = document.createElement('tr'); const cell = node('td', 'assignment-empty', 'No quiz records match these filters.'); cell.colSpan = 6; row.append(cell); elements.quizRows.append(row); }
}

async function refreshQuizGradebook() {
  if (state.tab !== 'quizzes' || !requireTeacher()) return;
  const params = quizFilterParams();
  elements.quizExport.href = `/api/teacher/quiz-attempts.csv?${params}`;
  try {
    const response = await authFetch(`/api/teacher/quiz-attempts?${params}`);
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || 'Unable to load quiz records.');
    renderQuizAttempts(payload);
  } catch (error) { elements.quizSummary.textContent = error.message; }
}

function studentNeedsAttention(item) {
  return item.attendance.last_status === "absent" || item.homework.missing > 0 || item.homework.awaiting_working > 0;
}

function summariseStudents(students) {
  return students.reduce((acc, item) => {
    acc.presents += item.attendance.presents;
    acc.marks += item.attendance.marks;
    acc.submitted += item.homework.submitted;
    acc.late += item.homework.late;
    acc.homework += item.homework.total;
    acc.missing += item.homework.missing;
    acc.awaitingWorking += item.homework.awaiting_working;
    acc.selections += item.selector.selected_count;
    if (item.homework.missing > 0) acc.studentsMissing += 1;
    if (item.homework.awaiting_working > 0) acc.studentsAwaitingWorking += 1;
    if (item.attendance.last_status === "absent") acc.latestAbsences += 1;
    if (item.selector.selected_count === 0) acc.neverSelected += 1;
    if (studentNeedsAttention(item)) acc.needsAttention += 1;
    if (item.form_class) acc.formClasses.add(String(item.form_class));
    return acc;
  }, { presents: 0, marks: 0, submitted: 0, late: 0, homework: 0, missing: 0, awaitingWorking: 0, selections: 0, studentsMissing: 0, studentsAwaitingWorking: 0, latestAbsences: 0, neverSelected: 0, needsAttention: 0, formClasses: new Set() });
}

function renderStudentStats(payload, students) {
  elements.studentsStats.replaceChildren();
  const totals = summariseStudents(students);
  const className = overviewClassName(payload);
  const cards = [
    ["Students", String(students.length), `${totals.formClasses.size || "No"} form ${totals.formClasses.size === 1 ? "class" : "classes"} in ${className}`],
    ["Average attendance", totals.marks ? `${Math.round((totals.presents / totals.marks) * 100)}%` : "—", totals.marks ? `${totals.presents}/${totals.marks} present marks` : "No attendance records yet"],
    ["Homework completion", totals.homework ? `${Math.round(((totals.submitted + totals.late) / totals.homework) * 100)}%` : "—", totals.homework ? `Submitted ${totals.submitted} · Late ${totals.late} · Total ${totals.homework}` : "No homework records yet"],
    ["Needs attention", String(totals.needsAttention), `${totals.missing} missing · ${totals.awaitingWorking} need working`],
    ["Class participation", totals.selections ? String(totals.selections) : "—", `${totals.neverSelected} students not selected yet`]
  ];
  cards.forEach(([label, value, detail]) => {
    const card = node("div", "stat-card");
    card.append(node("span", "stat-label", label), node("strong", "stat-value", value), node("small", "stat-detail", detail));
    elements.studentsStats.append(card);
  });
}

function renderAttentionSummary(students) {
  const totals = summariseStudents(students);
  elements.studentsAttention.replaceChildren();
  const heading = node("div", "attention-heading");
  const headingCopy = node("div");
  headingCopy.append(node("p", "section-kicker", "Attention needed"), node("h3", "", totals.needsAttention ? `${totals.needsAttention} students need follow-up` : "No immediate follow-up"));
  heading.append(headingCopy, node("span", `attention-status${totals.needsAttention ? " alert" : ""}`, totals.needsAttention ? "Review" : "Clear"));
  const metrics = node("div", "attention-metrics");
  [
    ["Missing submissions", totals.missing, studentCountLabel(totals.studentsMissing)],
    ["Working required", totals.awaitingWorking, studentCountLabel(totals.studentsAwaitingWorking)],
    ["Latest status absent", totals.latestAbsences, "Based on each student's latest mark"],
    ["Not selected yet", totals.neverSelected, "Class participation coverage"]
  ].forEach(([label, value, detail]) => {
    const metric = node("div", "attention-metric");
    metric.append(node("span", "", label), node("strong", "", String(value)), node("small", "", detail));
    metrics.append(metric);
  });
  elements.studentsAttention.append(heading, metrics);
}

function renderAttendanceLog(items = []) {
  elements.studentsAttendanceLog.replaceChildren();
  if (!items.length) {
    const row = document.createElement("tr"); const cell = node("td", "assignment-empty", "No attendance records yet. After a roll call in the student selector, its date, time and lesson will appear here."); cell.colSpan = 8; row.append(cell);
    elements.studentsAttendanceLog.append(row); return;
  }
  for (const item of items) {
    const row = document.createElement("tr");
    const total = Number(item.present) + Number(item.absent);
    const rate = total ? `${Math.round((Number(item.present) / total) * 100)}%` : "—";
    const deck = lessonLabel(item.lesson_title, item.lesson_content_id);
    const sent = Number(item.followup_sent || 0); const received = Number(item.reasons_received || 0); const unlinked = Number(item.dingtalk_unlinked || 0);
    const followup = Number(item.absent) ? `${received}/${item.absent} reasons · ${sent} messaged${unlinked ? ` · ${unlinked} not linked` : ""}` : "—";
    const isComplete = Boolean(item.attendance_finalized_at) && Number(item.marked) === Number(item.roster_total);
    const recordCell = document.createElement("td");
    recordCell.append(node("span", `attendance-record-state ${isComplete ? "is-saved" : "is-partial"}`, isComplete ? "Saved" : "Partial"));
    recordCell.append(node("small", "cell-sub", `${Number(item.marked)}/${Number(item.roster_total)} marked`));
    row.append(node("td", "", fmtDate(item.last_marked_at)), node("td", "", `${fmtTime(item.first_marked_at)} – ${fmtTime(item.last_marked_at)}`), node("td", "", deck), recordCell);
    [String(item.present), String(item.absent), rate, followup].forEach((value) => row.append(node("td", "", value)));
    elements.studentsAttendanceLog.append(row);
  }
}

function renderStudentOverview(payload) {
  elements.studentsRows.replaceChildren();
  const selectedFormClass = elements.studentsFormClassSelect.value;
  const query = elements.studentsSearch.value.trim().toLocaleLowerCase("en");
  const className = overviewClassName(payload);
  const cohort = selectedFormClass ? payload.students.filter((item) => String(item.form_class ?? "") === selectedFormClass) : payload.students;
  const students = cohort.filter((item) => {
    const haystack = [item.display_name, item.student_id, item.form_class, ...(item.course_classes || [])].filter(Boolean).join(" ").toLocaleLowerCase("en");
    return (!query || haystack.includes(query)) && (!elements.studentsAttentionOnly.checked || studentNeedsAttention(item));
  });
  const formLabel = selectedFormClass ? ` · Form class ${selectedFormClass}` : "";
  const showing = students.length === cohort.length ? `${cohort.length} students` : `showing ${students.length} of ${cohort.length} students`;
  elements.studentsSummary.textContent = `${className}${formLabel} · ${showing}. Select a name to open the full profile.`;
  renderStudentStats(payload, cohort);
  renderAttentionSummary(cohort);
  const attendanceLog = selectedFormClass
    ? (payload.attendance_log_by_form_class || []).filter((item) => String(item.form_class) === selectedFormClass)
    : payload.attendance_log;
  renderAttendanceLog(attendanceLog);
  for (const item of students) {
    const row = document.createElement("tr");
    if (studentNeedsAttention(item)) row.className = "student-needs-attention";
    const nameCell = document.createElement("td");
    const open = node("button", "student-open", item.display_name);
    open.type = "button";
    open.addEventListener("click", () => openStudentProfile(item.account_id));
    nameCell.append(open);
    nameCell.append(node("small", "cell-sub student-id", item.student_id || "No student ID"));
    row.append(nameCell);
    const formClassCell = document.createElement("td");
    formClassCell.append(item.form_class ? node("span", "form-class-badge", `Class ${item.form_class}`) : node("span", "muted", "—"));
    row.append(formClassCell);
    const courseCell = document.createElement("td");
    (item.course_classes?.length ? item.course_classes : [className]).forEach((name) => courseCell.append(node("span", "course-class-badge", name)));
    row.append(courseCell);
    const attendanceCell = document.createElement("td");
    if (item.attendance.marks) {
      attendanceCell.append(meterCell(Math.round((item.attendance.presents / item.attendance.marks) * 100), `${item.attendance.presents}/${item.attendance.marks} marks · ${item.attendance.absences} absent`));
      const latest = node("div", "cell-status-line");
      latest.append(pill(ATTENDANCE_LABELS[item.attendance.last_status] ?? item.attendance.last_status, item.attendance.last_status), node("small", "", fmtDate(item.attendance.last_marked_at)));
      attendanceCell.append(latest);
      if (item.attendance.last_lesson_title || item.attendance.last_lesson_content_id) attendanceCell.append(node("small", "cell-sub", lessonLabel(item.attendance.last_lesson_title, item.attendance.last_lesson_content_id)));
    }
    else attendanceCell.append(node("span", "muted", "—"));
    row.append(attendanceCell);
    const homeworkCell = document.createElement("td");
    if (item.homework.total) {
      homeworkCell.append(meterCell(Math.round(((item.homework.submitted + item.homework.late) / item.homework.total) * 100), `${item.homework.submitted} submitted · ${item.homework.late} late · ${item.homework.total} total`));
      const issues = node("div", "cell-status-line");
      if (item.homework.missing) issues.append(pill(`${item.homework.missing} missing`, "homework-missing"));
      if (item.homework.awaiting_working) issues.append(pill(`${item.homework.awaiting_working} need working`, "homework-awaiting_working"));
      if (!issues.children.length && item.homework.last_status) issues.append(pill(HOMEWORK_LABELS[item.homework.last_status] ?? item.homework.last_status, `homework-${item.homework.last_status}`));
      homeworkCell.append(issues);
      if (item.homework.last_assignment_title) homeworkCell.append(node("small", "cell-sub", `${item.homework.last_assignment_title} · ${item.homework.last_assigned_on}`));
      if (item.homework.last_score !== null && item.homework.last_score !== undefined) homeworkCell.append(node("small", "cell-sub", `Score ${item.homework.last_score}/${item.homework.last_score_max ?? "—"}${item.homework.last_feedback ? ` · ${item.homework.last_feedback}` : ""}`));
    }
    else homeworkCell.append(node("span", "muted", "—"));
    row.append(homeworkCell);
    const gradesCell = document.createElement("td");
    gradesCell.append(gradeChips(item.selector));
    row.append(gradesCell);
    const selectedCell = document.createElement("td");
    if (item.selector.selected_count) {
      selectedCell.append(node("b", "", String(item.selector.selected_count)));
      selectedCell.append(node("small", "cell-sub", `Latest ${fmtDate(item.selector.last_selected_at)}`));
    } else selectedCell.append(node("span", "muted", "0"));
    row.append(selectedCell);
    elements.studentsRows.append(row);
  }
  if (!students.length) { const row = document.createElement("tr"); const cell = node("td", "assignment-empty", "No students match these filters."); cell.colSpan = 7; row.append(cell); elements.studentsRows.append(row); }
}

async function refreshStudentsPanel() {
  if (state.tab !== 'students' || !requireTeacher()) return;
  try {
    if (!state.classes) {
      const response = await authFetch('/api/classes');
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || 'Unable to load classes.');
      state.classes = payload.items;
      elements.studentsClassSelect.replaceChildren();
      const allOption = document.createElement('option'); allOption.value = 'all'; allOption.textContent = 'All courses'; elements.studentsClassSelect.append(allOption);
      for (const item of state.classes) { const option = document.createElement('option'); option.value = item.class_id; option.textContent = item.name; elements.studentsClassSelect.append(option); }
    }
    const classId = elements.studentsClassSelect.value;
    if (!classId) { elements.studentsSummary.textContent = 'No classes yet. Create a class and add students first.'; elements.studentsRows.replaceChildren(); return; }
    const endpoint = classId === 'all' ? '/api/students/overview' : `/api/classes/${encodeURIComponent(classId)}/student-overview`;
    const response = await authFetch(endpoint);
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || 'Unable to load student records.');
    state.studentOverview = payload;
    renderStudentOverview(payload);
  } catch (error) { elements.studentsSummary.textContent = error.message; }
}

function fillRows(container, items, colSpan, build) {
  container.replaceChildren();
  if (!items.length) { const row = document.createElement("tr"); const cell = node("td", "assignment-empty", "No records yet."); cell.colSpan = colSpan; row.append(cell); container.append(row); return; }
  items.forEach((item) => { const row = document.createElement("tr"); build(item).forEach((cellContent) => { const cell = document.createElement("td"); if (typeof cellContent === "string") cell.textContent = cellContent; else if (cellContent) cell.append(cellContent); row.append(cell); }); container.append(row); });
}

async function openStudentProfile(accountId) {
  try {
    const response = await authFetch(`/api/students/${encodeURIComponent(accountId)}/profile`);
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || "Unable to load the student profile.");
    elements.studentDialogName.textContent = payload.student.display_name;
    elements.studentDialogMeta.textContent = `${payload.student.student_id || "No student ID"} · ${payload.student.form_class ? `Form class ${payload.student.form_class} · ` : ""}@${payload.student.username} · ${payload.classes.map((item) => item.name).join(" · ")}`;
    fillRows(elements.studentAttendance, payload.attendance, 6, (item) => [
      fmtDate(item.marked_at), fmtTime(item.marked_at), item.class_name || "—", lessonLabel(item.lesson_title, item.lesson_content_id),
      pill(ATTENDANCE_LABELS[item.status] ?? item.status, item.status),
      item.reason_text || (item.followup_status === "sent" ? "Awaiting reply" : item.followup_status === "unreachable" ? "DingTalk identity not linked" : item.followup_status === "failed" ? "Delivery failed" : item.status === "absent" ? "Not sent" : "—")
    ]);
    fillRows(elements.studentHomework, payload.homework, 4, (item) => [
      item.assigned_on, item.assignment_title,
      (() => {
        const cell = node("div", "homework-status");
        cell.append(pill(HOMEWORK_LABELS[item.status] ?? item.status, `homework-${item.status}`));
        if (item.score !== null && item.score !== undefined) cell.append(node("small", "cell-sub", `${item.score}/${item.score_max ?? "—"}`));
        return cell;
      })(),
      item.feedback || item.note || "—"
    ]);
    fillRows(elements.studentSelector, payload.selector, 3, (item) => [
      fmtDateTime(item.selected_at), classLabel(item.class_id), item.outcome ? pill(item.outcome, `grade-${item.outcome === "A*" ? "astar" : item.outcome.toLowerCase().replace(/\s+/g, "-")}`) : "Not rated"
    ]);
    elements.studentDialog.showModal();
  } catch (error) { toast(error.message, true); }
}

async function initialise() {
  const initialized = await initializeAccountUI({ locale: "en" });
  const classSelect = elements.quizFilters.elements.class_name;
  for (const className of initialized.config.student_classes || []) { const option = document.createElement('option'); option.value = className; option.textContent = className; classSelect.append(option); }
  if (!initialized.config.teacher_registration_enabled) $("#teacher-gate-register").hidden = true;
  requireTeacher(); await refreshAssignments(); await refreshQuizGradebook(); await refreshStudentsPanel();
  $("#teacher-gate-login").addEventListener("click", () => openAccountDialog(getAuthState().authenticated ? "mismatch" : "login", "teacher")); $("#teacher-gate-register").addEventListener("click", () => openAccountDialog("register", "teacher"));
  elements.newAssignment.addEventListener("click", () => openAssignmentForm()); elements.assignmentForm.addEventListener("submit", saveAssignment); $("#assignment-dialog-close").addEventListener("click", () => elements.assignmentDialog.close());
  $$(".assignment-filters button").forEach((button) => button.addEventListener("click", () => { state.filter = button.dataset.filter; $$(".assignment-filters button").forEach((item) => item.classList.toggle("active", item === button)); renderAssignments(); }));
  $("#submission-dialog-close").addEventListener("click", () => elements.submissionDialog.close()); elements.approve.addEventListener("click", () => decide({ decision: "approved" })); elements.reject.addEventListener("click", () => decide({ decision: "rejected", override_reason: "The teacher rejected the provisional result." })); elements.adjustToggle.addEventListener("click", () => { elements.adjustForm.hidden = !elements.adjustForm.hidden; }); elements.adjustSave.addEventListener("click", () => decide({ decision: "adjusted", teacher_mark: Number(elements.adjustMark.value), override_reason: elements.adjustReason.value.trim() }));
  elements.quizFilters.addEventListener('submit', async (event) => { event.preventDefault(); await refreshQuizGradebook(); });
  elements.studentsClassSelect.addEventListener('change', () => refreshStudentsPanel());
  elements.studentsFormClassSelect.addEventListener('change', () => { if (state.studentOverview) renderStudentOverview(state.studentOverview); });
  elements.studentsSearch.addEventListener('input', () => { if (state.studentOverview) renderStudentOverview(state.studentOverview); });
  elements.studentsAttentionOnly.addEventListener('change', () => { if (state.studentOverview) renderStudentOverview(state.studentOverview); });
  $("#student-dialog-close").addEventListener("click", () => elements.studentDialog.close());
  window.addEventListener("econmark:authchange", async () => { requireTeacher(); await refreshAssignments(); await refreshQuizGradebook(); await refreshStudentsPanel(); });
}

initialise().catch((error) => notice(error.message, true));
