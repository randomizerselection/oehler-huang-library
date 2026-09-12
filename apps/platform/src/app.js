import { DEMO_QUESTION, DEMO_RUBRIC, DEMO_SAMPLES, VERSIONS, getDemoSample } from "./demo-data.js";
import {
  authFetch,
  ensureAuthenticated,
  getAuthState,
  getPublicConfig,
  initializeAccountUI,
  listStoredRuns,
  loadStoredRun,
  saveRunDecision
} from "./auth.js";
import { exportCsv, exportJson, printReport } from "./export.js";
import { applyTeacherReview, InvariantError } from "./invariants.js";
import { runConfiguredProvider, runDemoWorkflow } from "./workflow.js";
import { listAssignments } from "./assignments.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const elements = {
  notice: $("#notice"),
  upload: $("#answer-upload"),
  uploadZone: $("#upload-zone"),
  previewShell: $("#preview-shell"),
  imagePreview: $("#image-preview"),
  imageMeta: $("#image-meta"),
  transcript: $("#transcript"),
  transcriptState: $("#transcript-state"),
  confirmTranscript: $("#confirm-transcript"),
  question: $("#question-text"),
  commandWord: $("#command-word"),
  maxMark: $("#max-mark"),
  markScheme: $("#mark-scheme"),
  rubricState: $("#rubric-state"),
  assignmentSelect: $("#single-assignment-select"),
  assignmentNote: $("#single-assignment-note"),
  confirmRubric: $("#confirm-rubric"),
  runGrading: $("#run-grading"),
  emptyResult: $("#empty-result"),
  result: $("#result"),
  score: $("#score-value"),
  scoreMax: $("#score-max"),
  level: $("#level-value"),
  confidence: $("#confidence-badge"),
  manualReview: $("#manual-review-warning"),
  primary: $("#primary-mark"),
  reviewer: $("#reviewer-mark"),
  adjudicated: $("#adjudicated-mark"),
  evidenceList: $("#evidence-list"),
  feedback: $("#feedback-content"),
  decisionStatus: $("#decision-status"),
  approve: $("#approve-button"),
  showAdjust: $("#show-adjust-button"),
  reject: $("#reject-button"),
  adjustForm: $("#adjust-form"),
  adjustMark: $("#adjust-mark"),
  overrideReason: $("#override-reason"),
  saveAdjustment: $("#save-adjustment"),
  versionLine: $("#version-line"),
  historySection: $("#history-section"),
  historyList: $("#history-list"),
  toast: $("#toast")
};

const state = {
  sample: null,
  uploadedFile: null,
  uploadedDataUrl: null,
  objectUrl: null,
  transcriptConfirmed: false,
  rubricConfirmed: false,
  transcriptVersion: 0,
  record: null,
  feedbackLanguage: "zh",
  assignmentId: null,
  assignments: []
};

function toast(message, type = "info") {
  elements.toast.textContent = message;
  elements.toast.className = `toast show ${type === "error" ? "error" : ""}`;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => { elements.toast.className = "toast"; }, 4200);
}

function setGate(element, confirmed) {
  element.textContent = confirmed ? "已确认" : "待确认";
  element.className = `state-pill ${confirmed ? "confirmed" : "pending"}`;
}

function updateSteps() {
  const completed = [
    Boolean(state.sample || state.uploadedFile),
    state.transcriptConfirmed,
    state.rubricConfirmed,
    Boolean(state.record),
    Boolean(state.record?.output?.teacher_review)
  ];
  const activeIndex = completed.findIndex((item) => !item);
  $$(".step").forEach((step, index) => {
    step.classList.toggle("complete", completed[index]);
    step.classList.toggle("active", index === (activeIndex < 0 ? 4 : activeIndex));
  });
}

function updateRunState() {
  const hasSource = Boolean(state.sample || state.uploadedFile);
  elements.confirmTranscript.disabled = !hasSource || !elements.transcript.value.trim();
  elements.runGrading.disabled = !(hasSource && state.transcriptConfirmed && state.rubricConfirmed);
  updateSteps();
}

function revokePreviewUrl() {
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
  state.objectUrl = null;
}

function showPreview(src, kind, meta, alt = "作答图片预览") {
  elements.previewShell.hidden = false;
  elements.imagePreview.replaceChildren();
  const preview = kind === "application/pdf" ? document.createElement("embed") : document.createElement("img");
  preview.src = src;
  if (preview.tagName === "IMG") preview.alt = alt;
  if (preview.tagName === "EMBED") preview.type = "application/pdf";
  elements.imagePreview.append(preview);
  elements.imageMeta.textContent = meta;
}

function resetReview() {
  state.record = null;
  elements.emptyResult.hidden = false;
  elements.result.hidden = true;
  elements.adjustForm.hidden = true;
  elements.decisionStatus.textContent = "尚未生成最终成绩。";
  elements.decisionStatus.className = "decision-status";
}

function invalidateTranscript() {
  state.transcriptConfirmed = false;
  setGate(elements.transcriptState, false);
  resetReview();
  updateRunState();
}

function invalidateRubric() {
  state.rubricConfirmed = false;
  setGate(elements.rubricState, false);
  resetReview();
  updateRunState();
}

function loadSample(id) {
  const sample = getDemoSample(id);
  if (!sample) return;
  revokePreviewUrl();
  state.sample = sample;
  state.uploadedFile = null;
  state.uploadedDataUrl = null;
  state.assignmentId = null;
  elements.assignmentSelect.value = "";
  elements.upload.value = "";
  $$(".sample-card").forEach((card) => card.classList.toggle("selected", card.dataset.sample === id));
  showPreview(sample.image, "image/svg+xml", `原创合成样例 · ${sample.label_zh ?? sample.label_en}`, sample.image_alt);
  elements.transcript.value = sample.transcript;
  elements.question.value = DEMO_QUESTION.question_text;
  elements.commandWord.value = DEMO_QUESTION.command_word;
  elements.maxMark.value = String(DEMO_QUESTION.max_mark);
  elements.markScheme.value = DEMO_QUESTION.mark_scheme_text;
  state.transcriptConfirmed = false;
  state.rubricConfirmed = false;
  setGate(elements.transcriptState, false);
  setGate(elements.rubricState, false);
  resetReview();
  updateRunState();
  toast(`已载入${sample.label_zh ?? sample.label_en}样例。请对照图片核对并确认转写。`);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function handleUpload(file) {
  const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
  if (!file) return;
  if (!ensureAuthenticated()) {
    elements.upload.value = "";
    return;
  }
  if (getAuthState().account?.role !== "teacher") {
    toast("真实单份评分需要教师账户。学生请返回学生入口使用作业代码提交。", "error");
    elements.upload.value = "";
    return;
  }
  if (!state.assignmentId) {
    toast("请先从中央作业库选择一项已发布作业。", "error");
    elements.upload.value = "";
    return;
  }
  if (!allowed.has(file.type)) {
    toast("文件格式不受支持。请使用 JPG、PNG 或 WEBP。", "error");
    return;
  }
  const maxFileMb = getPublicConfig().max_file_mb;
  if (file.size > maxFileMb * 1024 * 1024) {
    toast(`文件超过服务器配置上限 ${maxFileMb} MB。`, "error");
    return;
  }
  revokePreviewUrl();
  state.sample = null;
  state.uploadedFile = file;
  state.uploadedDataUrl = await fileToDataUrl(file);
  state.objectUrl = URL.createObjectURL(file);
  $$(".sample-card").forEach((card) => card.classList.remove("selected"));
  showPreview(state.objectUrl, file.type, `${file.type.replace("image/", "").toUpperCase()} · ${(file.size / 1024).toFixed(0)} KB`, file.name);
  elements.transcript.value = "";
  invalidateTranscript();
  state.rubricConfirmed = true;
  setGate(elements.rubricState, true);
  resetReview();
  updateRunState();
  toast("图片已接收。评分完成后，原图、转写、证据与结果将永久保存到您的 VPS 账户。 ");
}

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text != null) element.textContent = text;
  return element;
}

function renderEvidence(output) {
  elements.evidenceList.replaceChildren();
  for (const item of output.evidence) {
    const article = node("article", `evidence-item ${item.credit_status === "not_credited" ? "not-credited" : ""}`);
    const header = node("header");
    header.append(node("b", "", item.rubric_reference));
    header.append(node("span", "", item.credit_status === "not_credited" ? "不计分" : `+${item.mark_value}`));
    const quote = node("blockquote", "", `“${item.transcript_quote}”`);
    const reason = node("p", "", item.economic_reason);
    article.append(header, quote, reason);
    elements.evidenceList.append(article);
  }
  if (!output.evidence.length) elements.evidenceList.append(node("p", "version-line", "未找到可与评分标准对应的学生原文证据。"));
}

function renderFeedback() {
  if (!state.record) return;
  const output = state.record.output;
  const language = state.feedbackLanguage;
  const feedback = language === "zh" ? output.feedback_zh : output.feedback_en;
  const outline = language === "zh" ? output.improved_outline_zh : output.improved_outline_en;
  const followUps = language === "zh" ? output.follow_up_questions_zh : output.follow_up_questions_en;
  const labels = language === "zh"
    ? { strengths: "已有优点", missing: "尚需发展", priorities: "两个优先改进点", followUps: "针对性巩固问题", outline: "改进段落提纲" }
    : { strengths: "Strengths", missing: "Missing development", priorities: "Two priorities", followUps: "Targeted follow-up questions", outline: "Improved paragraph outline" };
  const container = node("div", "feedback-block");
  const sections = [
    [labels.strengths, feedback.strengths, "ul", ""],
    [labels.missing, feedback.missing_development, "ul", ""],
    [labels.priorities, feedback.priorities.map((item) => item.text), "ol", "priority-list"],
    [labels.followUps, followUps.map((item) => item.text), "ol", "follow-up-list"],
    [labels.outline, outline, "ol", ""]
  ];
  for (const [title, items, listTag, listClass] of sections) {
    container.append(node("h4", "", title));
    const list = node(listTag, listClass);
    items.forEach((item) => list.append(node("li", "", item)));
    container.append(list);
  }
  elements.feedback.replaceChildren(container);
}

function renderResult() {
  const output = state.record.output;
  elements.emptyResult.hidden = true;
  elements.result.hidden = false;
  elements.score.textContent = output.provisional_mark;
  elements.scoreMax.textContent = `/ ${output.max_mark}`;
  elements.level.textContent = output.level ?? "按点计分";
  const confidenceLabel = { high: "高置信度", medium: "中置信度", low: "低置信度" }[output.confidence] ?? output.confidence;
  elements.confidence.textContent = confidenceLabel;
  elements.confidence.className = `confidence ${output.confidence}`;
  elements.primary.textContent = output.scorer_marks?.primary ?? "—";
  elements.reviewer.textContent = output.scorer_marks?.reviewer ?? "—";
  elements.adjudicated.textContent = output.scorer_marks?.adjudicated ?? "—";
  elements.manualReview.hidden = !output.manual_review_required;
  elements.manualReview.textContent = "必须人工复核：双评分存在明显分歧，或输入置信度未达到安全放行标准。";
  elements.adjustMark.max = String(output.max_mark);
  elements.adjustMark.value = String(output.provisional_mark);
  elements.versionLine.textContent = `${output.schema_version} · ${output.workflow_version} · ${output.prompt_version} · ${output.model_version} · ${output.run_id}`;
  renderEvidence(output);
  renderFeedback();
  const review = output.teacher_review;
  if (!review) {
    elements.decisionStatus.textContent = "尚未形成最终成绩。";
    elements.decisionStatus.className = "decision-status";
  } else if (review.decision === "rejected") {
    elements.decisionStatus.textContent = "结果已拒绝，未生成最终分数。";
    elements.decisionStatus.className = "decision-status rejected";
  } else {
    const source = review.decision_source === "automatic_policy" ? "系统自动终审" : "人工终审";
    elements.decisionStatus.textContent = `${source}：${output.final_mark}/${output.max_mark}`;
    elements.decisionStatus.className = "decision-status final";
  }
  updateSteps();
  if (window.innerWidth < 980) $("#output-panel").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function runGrading() {
  try {
    elements.runGrading.disabled = true;
    elements.runGrading.querySelector("span").textContent = "正在核对证据……";
    let workflow;
    if (state.sample) {
      workflow = runDemoWorkflow({
        sample: state.sample,
        transcript: elements.transcript.value.trim(),
        rubricConfirmed: state.rubricConfirmed,
        mode: "public_sample"
      });
    } else {
      if (!ensureAuthenticated()) throw new InvariantError("上传真实作答并评分前请先登录。", "AUTH_REQUIRED");
      workflow = await runConfiguredProvider({
        run_id: `run-${crypto.randomUUID()}`,
        mode: "account_upload",
        assignment_id: state.assignmentId,
        answer_data_url: state.uploadedDataUrl,
        answer_mime_type: state.uploadedFile.type,
        answer_name: state.uploadedFile.name,
        confirmed_transcript: elements.transcript.value.trim(),
        question_text: elements.question.value.trim(),
        command_word: elements.commandWord.value,
        max_mark: Number(elements.maxMark.value),
        mark_scheme_text: elements.markScheme.value.trim(),
        rubric_confirmed: state.rubricConfirmed,
        schema_version: VERSIONS.schema_version
      }, authFetch);
    }
    state.record = { ...workflow, created_at: new Date().toISOString() };
    renderResult();
    toast(state.record.persistence
      ? "暂定结果与原始图片已永久写入您的服务器账户。"
      : "样例结果已生成；合成样例不会写入账户历史。"
    );
    await renderHistory();
  } catch (error) {
    const message = error instanceof InvariantError ? `${error.code}: ${error.message}` : error.message;
    toast(message, "error");
  } finally {
    elements.runGrading.querySelector("span").textContent = "开始证据锁定评分";
    updateRunState();
  }
}

async function setDecision(review) {
  if (!state.record) return;
  try {
    if (state.record.persistence?.run_id) {
      state.record = await saveRunDecision(state.record.persistence.run_id, review);
    } else {
      state.record.output = applyTeacherReview(state.record.output, review);
    }
    renderResult();
    elements.adjustForm.hidden = true;
    await renderHistory();
    updateSteps();
    toast("教师决定已写入审计记录。 ");
  } catch (error) {
    toast(error.message, "error");
  }
}

async function renderHistory() {
  const authenticated = getAuthState().authenticated;
  elements.historySection.hidden = !authenticated;
  elements.historyList.replaceChildren();
  if (!authenticated) return;
  let history;
  try {
    history = (await listStoredRuns({ limit: 200 })).items;
  } catch (error) {
    elements.historyList.append(node("p", "version-line", error.message));
    return;
  }
  if (!history.length) {
    elements.historyList.append(node("p", "version-line", "您的 VPS 账户中暂无评分记录。"));
    return;
  }
  for (const record of history) {
    const item = node("button", "history-item");
    item.type = "button";
    const copy = node("p");
    const mark = record.status === "rejected" ? "已拒绝" : (record.final_mark ?? "待审核");
    copy.append(node("strong", "", `${record.student_ref} · ${mark}/${record.max_mark}`));
    copy.append(node("small", "", `${record.source_name} · ${new Date(record.created_at).toLocaleString("zh-CN")} · 永久保存`));
    item.addEventListener("click", async () => {
      try {
        state.record = await loadStoredRun(record.run_id);
        state.sample = null;
        state.uploadedFile = null;
        elements.transcript.value = state.record.input?.confirmed_transcript?.text ?? "";
        elements.question.value = state.record.input?.question_text ?? "";
        elements.commandWord.value = state.record.input?.command_word ?? "Discuss";
        elements.maxMark.value = String(state.record.input?.max_mark ?? state.record.output.max_mark);
        elements.markScheme.value = state.record.input?.mark_scheme_text ?? "";
        state.transcriptConfirmed = Boolean(state.record.input?.confirmed_transcript);
        state.rubricConfirmed = Boolean(state.record.rubric?.teacher_confirmed);
        setGate(elements.transcriptState, state.transcriptConfirmed);
        setGate(elements.rubricState, state.rubricConfirmed);
        if (state.record.persistence?.image_url) showPreview(state.record.persistence.image_url, state.record.input?.answer_images?.[0]?.mime_type ?? "image/jpeg", `${record.source_name} · VPS 永久存储`, record.source_name);
        renderResult();
        toast("已从您的服务器账户载入评分记录。 ");
      } catch (error) {
        toast(error.message, "error");
      }
    });
    item.append(copy);
    elements.historyList.append(item);
  }
}

function applyAssignment(assignment) {
  state.assignmentId = assignment?.assignment_id ?? null;
  if (!assignment) {
    elements.question.value = "";
    elements.markScheme.value = "";
    state.rubricConfirmed = false;
    setGate(elements.rubricState, false);
    updateRunState();
    return;
  }
  elements.question.value = assignment.question_text;
  elements.commandWord.value = assignment.command_word;
  elements.maxMark.value = String(assignment.max_mark);
  elements.markScheme.value = assignment.mark_scheme_text;
  state.rubricConfirmed = true;
  setGate(elements.rubricState, true);
  const icon = node("span", "", "✓");
  const text = document.createTextNode(` 已锁定“${assignment.title}”V${assignment.version}。修改请前往`);
  const link = node("a", "", "教师作业库");
  link.href = "/econmark/teacher";
  elements.assignmentNote.replaceChildren(icon, text, link, document.createTextNode("创建新版本。"));
  resetReview();
  updateRunState();
}

async function loadAssignmentOptions() {
  elements.assignmentSelect.replaceChildren(new Option("请选择已发布作业", ""));
  if (!getAuthState().authenticated || getAuthState().account?.role !== "teacher") return;
  try {
    state.assignments = (await listAssignments()).items.filter((item) => item.status === "published");
    state.assignments.forEach((assignment) => elements.assignmentSelect.add(new Option(`${assignment.title} · V${assignment.version} · ${assignment.command_word} [${assignment.max_mark}]`, assignment.assignment_id)));
    const requested = new URL(location.href).searchParams.get("assignment");
    if (requested && state.assignments.some((item) => item.assignment_id === requested)) {
      elements.assignmentSelect.value = requested;
      applyAssignment(state.assignments.find((item) => item.assignment_id === requested));
    }
  } catch (error) { toast(error.message, "error"); }
}

async function initialise() {
  await initializeAccountUI();
  const config = getPublicConfig();
  const limit = $("#single-upload-limit");
  if (limit) limit.textContent = `${config.max_file_mb} MB`;
  elements.question.value = DEMO_QUESTION.question_text;
  elements.commandWord.value = DEMO_QUESTION.command_word;
  elements.maxMark.value = String(DEMO_QUESTION.max_mark);
  elements.markScheme.value = DEMO_QUESTION.mark_scheme_text;
  await loadAssignmentOptions();
  updateRunState();
  await renderHistory();

  $$(".sample-card").forEach((card) => card.addEventListener("click", () => loadSample(card.dataset.sample)));
  elements.upload.addEventListener("change", () => handleUpload(elements.upload.files?.[0]));
  elements.assignmentSelect.addEventListener("change", () => applyAssignment(state.assignments.find((item) => item.assignment_id === elements.assignmentSelect.value) ?? null));
  elements.uploadZone.addEventListener("dragover", (event) => { event.preventDefault(); elements.uploadZone.classList.add("drag"); });
  elements.uploadZone.addEventListener("dragleave", () => elements.uploadZone.classList.remove("drag"));
  elements.uploadZone.addEventListener("drop", (event) => {
    event.preventDefault();
    elements.uploadZone.classList.remove("drag");
    handleUpload(event.dataTransfer.files?.[0]);
  });

  elements.transcript.addEventListener("input", invalidateTranscript);
  elements.question.addEventListener("input", invalidateRubric);
  elements.commandWord.addEventListener("change", () => {
    elements.maxMark.value = elements.commandWord.value === "Analyse" ? "6" : "8";
    invalidateRubric();
  });
  elements.maxMark.addEventListener("change", invalidateRubric);
  elements.markScheme.addEventListener("input", invalidateRubric);

  elements.confirmTranscript.addEventListener("click", () => {
    if (!elements.transcript.value.trim()) return;
    state.transcriptConfirmed = true;
    state.transcriptVersion += 1;
    setGate(elements.transcriptState, true);
    updateRunState();
    toast(`转写文本第 ${state.transcriptVersion} 版已确认。`);
  });
  elements.confirmRubric.addEventListener("click", () => {
    const command = elements.commandWord.value;
    const max = Number(elements.maxMark.value);
    if (!elements.question.value.trim() || !elements.markScheme.value.trim()) {
      toast("题目和评分标准均为必填项。", "error");
      return;
    }
    if ((command === "Analyse" && max !== 6) || (command === "Discuss" && max !== 8)) {
      toast("当前版本仅支持 Analyse [6] 和 Discuss [8]。", "error");
      return;
    }
    state.rubricConfirmed = true;
    setGate(elements.rubricState, true);
    updateRunState();
    toast("题目与评分标准已确认为本次评分的唯一依据。 ");
  });
  elements.runGrading.addEventListener("click", runGrading);

  $$(".language-tabs button").forEach((tab) => tab.addEventListener("click", () => {
    state.feedbackLanguage = tab.dataset.lang;
    $$(".language-tabs button").forEach((item) => item.classList.toggle("active", item === tab));
    renderFeedback();
  }));
  elements.approve.addEventListener("click", () => setDecision({ decision: "approved" }));
  elements.reject.addEventListener("click", () => setDecision({ decision: "rejected", override_reason: "教师拒绝该暂定结果。" }));
  elements.showAdjust.addEventListener("click", () => { elements.adjustForm.hidden = !elements.adjustForm.hidden; });
  elements.saveAdjustment.addEventListener("click", () => setDecision({
    decision: "adjusted",
    teacher_mark: Number(elements.adjustMark.value),
    override_reason: elements.overrideReason.value
  }));

  $("#export-json").addEventListener("click", () => state.record && exportJson(state.record));
  $("#export-csv").addEventListener("click", () => state.record && exportCsv(state.record));
  $("#print-report").addEventListener("click", printReport);
  window.addEventListener("econmark:authchange", () => { renderHistory(); loadAssignmentOptions(); });
}

initialise();

// Expose only harmless demo metadata for competition screenshots and debugging.
globalThis.EconMarkDemo = Object.freeze({ samples: DEMO_SAMPLES.map(({ id, label_en, expected_mark }) => ({ id, label_en, expected_mark })), versions: VERSIONS, rubric: DEMO_RUBRIC });
