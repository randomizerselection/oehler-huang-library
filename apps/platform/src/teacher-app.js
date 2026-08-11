import { getAuthState, initializeAccountUI, loadStoredRun, openAccountDialog, saveRunDecision } from "./auth.js";
import { assignmentAction, createAssignment, listAssignments, listAssignmentSubmissions, updateAssignment } from "./assignments.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const elements = {
  notice: $("#teacher-notice"), gate: $("#teacher-auth-gate"), workspace: $("#teacher-workspace"), newAssignment: $("#new-assignment"),
  list: $("#assignment-list"), inboxTitle: $("#inbox-title"), inboxCount: $("#inbox-count"), inboxDescription: $("#inbox-description"), submissions: $("#submission-list"),
  assignmentDialog: $("#assignment-dialog"), assignmentForm: $("#assignment-form"), editId: $("#assignment-edit-id"), formTitle: $("#assignment-dialog-title"), title: $("#assignment-title"), instructions: $("#assignment-instructions"), question: $("#assignment-question"), command: $("#assignment-command"), maxMark: $("#assignment-max-mark"), markScheme: $("#assignment-mark-scheme"), formError: $("#assignment-form-error"),
  submissionDialog: $("#submission-dialog"), student: $("#submission-student"), meta: $("#submission-meta"), image: $("#submission-image"), transcript: $("#submission-transcript"), evidence: $("#submission-evidence"), score: $("#submission-score"), max: $("#submission-max"), confidence: $("#submission-confidence"), feedback: $("#submission-feedback"), decision: $("#submission-decision"), approve: $("#submission-approve"), reject: $("#submission-reject"), adjustToggle: $("#submission-adjust-toggle"), adjustForm: $("#submission-adjust-form"), adjustMark: $("#submission-adjust-mark"), adjustReason: $("#submission-adjust-reason"), adjustSave: $("#submission-adjust-save"), toast: $("#teacher-toast")
};

const state = { assignments: [], filter: "all", selectedAssignmentId: null, selectedRun: null };

function node(tag, className, text) { const item = document.createElement(tag); if (className) item.className = className; if (text != null) item.textContent = text; return item; }
function toast(message, error = false) { elements.toast.textContent = message; elements.toast.className = `toast show${error ? " error" : ""}`; clearTimeout(toast.timer); toast.timer = setTimeout(() => { elements.toast.className = "toast"; }, 4200); }
function notice(message, error = false) { elements.notice.textContent = message; elements.notice.className = `teacher-notice show${error ? " error" : ""}`; }

function requireTeacher() {
  const auth = getAuthState();
  const teacher = auth.authenticated && auth.account?.role === "teacher";
  elements.gate.hidden = teacher;
  elements.workspace.hidden = !teacher;
  elements.newAssignment.hidden = !teacher;
  if (auth.authenticated && !teacher) notice("当前登录的是学生账户。教师作业库需要教师账户。", true);
  return teacher;
}

function assignmentPayload() {
  return { title: elements.title.value.trim(), student_instructions: elements.instructions.value.trim(), question_text: elements.question.value.trim(), command_word: elements.command.value, max_mark: Number(elements.maxMark.value), mark_scheme_text: elements.markScheme.value.trim() };
}

function openAssignmentForm(assignment = null) {
  elements.editId.value = assignment?.assignment_id ?? "";
  elements.formTitle.textContent = assignment ? `编辑草稿 · V${assignment.version}` : "新建作业";
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
    toast(id ? "草稿已更新。" : "作业草稿已创建。发布后才会生成学生分享代码。");
  } catch (error) { elements.formError.textContent = error.message; }
}

function statusLabel(status) { return ({ draft: "草稿", published: "已发布", archived: "已归档" })[status] ?? status; }

async function copyShareLink(assignment) {
  const link = `${location.origin}/?code=${encodeURIComponent(assignment.share_code)}`;
  try { await navigator.clipboard.writeText(link); toast(`学生链接已复制：${assignment.share_code}`); }
  catch { toast(`分享链接：${link}`); }
}

async function performAction(assignment, action) {
  try {
    const result = await assignmentAction(assignment.assignment_id, action);
    await refreshAssignments(result.assignment_id);
    toast(action === "publish" ? `作业已发布，分享代码为 ${result.share_code}。` : action === "revise" ? `已创建 V${result.version} 草稿。` : "作业已归档，不再接受新提交。");
    if (action === "revise") openAssignmentForm(result);
  } catch (error) { toast(error.message, true); }
}

function renderAssignments() {
  elements.list.replaceChildren();
  const assignments = state.assignments.filter((item) => state.filter === "all" || item.status === state.filter);
  if (!assignments.length) { elements.list.append(node("div", "assignment-empty", state.assignments.length ? "此筛选条件下没有作业。" : "还没有作业。点击“新建作业”建立第一份题目与评分标准。")); return; }
  assignments.forEach((assignment) => {
    const article = node("article", `assignment-item${state.selectedAssignmentId === assignment.assignment_id ? " selected" : ""}`);
    const header = node("header"); const copy = node("div"); copy.append(node("h3", "", `${assignment.title} · V${assignment.version}`), node("p", "", `${assignment.command_word} [${assignment.max_mark}] · ${assignment.question_text}`));
    header.append(copy, node("span", `assignment-status ${assignment.status}`, statusLabel(assignment.status))); article.append(header);
    if (assignment.share_code) article.append(node("span", "assignment-code", assignment.share_code));
    const actions = node("div", "assignment-actions");
    const actionButton = (label, handler, primary = false) => { const button = node("button", primary ? "primary" : "", label); button.type = "button"; button.addEventListener("click", handler); actions.append(button); };
    if (assignment.status === "draft") { actionButton("编辑草稿", () => openAssignmentForm(assignment)); actionButton("发布并生成代码", () => performAction(assignment, "publish"), true); }
    if (assignment.status === "published") {
      actionButton("查看学生提交", () => selectAssignment(assignment), true); actionButton("复制学生链接", () => copyShareLink(assignment));
      const single = node("a", "", "用于单份评分"); single.href = `/single?assignment=${encodeURIComponent(assignment.assignment_id)}`; const batch = node("a", "", "用于批量评分"); batch.href = `/batch?assignment=${encodeURIComponent(assignment.assignment_id)}`; actions.append(single, batch);
      actionButton("创建新版本", () => performAction(assignment, "revise")); actionButton("归档", () => performAction(assignment, "archive"));
    }
    if (assignment.status === "archived") { actionButton("查看历史提交", () => selectAssignment(assignment)); actionButton("创建新版本", () => performAction(assignment, "revise")); }
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
  elements.inboxTitle.textContent = assignment.title; elements.inboxDescription.textContent = `V${assignment.version} · ${assignment.share_code ?? "无分享代码"}`; elements.submissions.replaceChildren();
  try {
    const payload = await listAssignmentSubmissions(assignment.assignment_id); elements.inboxCount.textContent = payload.total;
    if (!payload.items.length) { elements.submissions.append(node("div", "assignment-empty", "尚无学生通过此作业代码提交作答。")); return; }
    payload.items.forEach((item) => { const button = node("button", "submission-item"); button.type = "button"; const mark = Number.isInteger(item.final_mark) ? item.final_mark : "暂定"; button.append(node("strong", "", item.student_ref), node("span", "", `${new Date(item.created_at).toLocaleString("zh-CN")} · ${item.confidence}`), node("b", "", `${mark}/${item.max_mark}`)); button.addEventListener("click", () => openSubmission(item.run_id)); elements.submissions.append(button); });
  } catch (error) { elements.submissions.append(node("div", "assignment-empty", error.message)); }
}

function renderEvidence(items = []) { elements.evidence.replaceChildren(); items.forEach((item) => { const article = node("article", `evidence-item ${item.credit_status === "not_credited" ? "not-credited" : ""}`); const header = node("header"); header.append(node("b", "", item.rubric_reference), node("span", "", item.credit_status === "not_credited" ? "不计分" : `+${item.mark_value}`)); article.append(header, node("blockquote", "", `“${item.transcript_quote}”`), node("p", "", item.economic_reason)); elements.evidence.append(article); }); }

async function openSubmission(runId) {
  try {
    state.selectedRun = await loadStoredRun(runId); const record = state.selectedRun; const output = record.output; const feedback = output.feedback_zh ?? output.feedback_en;
    elements.student.textContent = record.input.student_ref; elements.meta.textContent = `${record.input.question_text} · ${new Date(record.persistence.stored_at).toLocaleString("zh-CN")}`; elements.image.src = record.persistence.image_url; elements.transcript.textContent = record.input.confirmed_transcript.text; renderEvidence(output.evidence);
    elements.score.textContent = output.final_mark ?? output.provisional_mark; elements.max.textContent = `/ ${output.max_mark}`; elements.confidence.textContent = `${output.confidence} · ${output.manual_review_required ? "必须人工复核" : "可由教师确认"}`; elements.feedback.textContent = [...(feedback?.strengths ?? []), ...(feedback?.priorities ?? []).map((item) => item.text)].join(" "); elements.adjustMark.max = String(output.max_mark); elements.adjustMark.value = String(output.provisional_mark);
    const review = output.teacher_review; elements.decision.textContent = review ? (review.decision === "rejected" ? "教师已拒绝此结果。" : `教师已确认最终成绩：${output.final_mark}/${output.max_mark}`) : "等待教师复核。"; elements.adjustForm.hidden = true; elements.submissionDialog.showModal();
  } catch (error) { toast(error.message, true); }
}

async function decide(review) { if (!state.selectedRun) return; try { state.selectedRun = await saveRunDecision(state.selectedRun.output.run_id, review); elements.submissionDialog.close(); await renderSubmissions(); toast("教师决定已保存，学生重新打开记录即可看到更新。"); } catch (error) { toast(error.message, true); } }

async function initialise() {
  const initialized = await initializeAccountUI();
  if (!initialized.config.teacher_registration_enabled) {
    $("#account-open-register").hidden = true;
    $("#teacher-gate-register").hidden = true;
  }
  requireTeacher(); await refreshAssignments();
  $("#teacher-gate-login").addEventListener("click", () => openAccountDialog("login", "teacher")); $("#teacher-gate-register").addEventListener("click", () => openAccountDialog("register", "teacher"));
  elements.newAssignment.addEventListener("click", () => openAssignmentForm()); elements.assignmentForm.addEventListener("submit", saveAssignment); $("#assignment-dialog-close").addEventListener("click", () => elements.assignmentDialog.close());
  $$(".assignment-filters button").forEach((button) => button.addEventListener("click", () => { state.filter = button.dataset.filter; $$(".assignment-filters button").forEach((item) => item.classList.toggle("active", item === button)); renderAssignments(); }));
  $("#submission-dialog-close").addEventListener("click", () => elements.submissionDialog.close()); elements.approve.addEventListener("click", () => decide({ decision: "approved" })); elements.reject.addEventListener("click", () => decide({ decision: "rejected", override_reason: "教师拒绝该暂定结果。" })); elements.adjustToggle.addEventListener("click", () => { elements.adjustForm.hidden = !elements.adjustForm.hidden; }); elements.adjustSave.addEventListener("click", () => decide({ decision: "adjusted", teacher_mark: Number(elements.adjustMark.value), override_reason: elements.adjustReason.value.trim() }));
  window.addEventListener("econmark:authchange", async () => { requireTeacher(); await refreshAssignments(); });
}

initialise().catch((error) => notice(error.message, true));
