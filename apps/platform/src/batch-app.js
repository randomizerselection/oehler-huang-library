import {
  approveAutomaticResults,
  approveEligibleResults,
  assertBatchReady,
  BATCH_APPROVAL_MODES,
  batchRunReadiness,
  deriveStudentRef,
  nextStudentRef,
  processBatch,
  serializableBatchRecord,
  summarizeBatch,
  uniqueStudentRef
} from "./batch-workflow.js";
import {
  authFetch,
  ensureAuthenticated,
  getAuthState,
  getPublicConfig,
  initializeAccountUI,
  saveRunDecision
} from "./auth.js";
import { DEMO_QUESTION, DEMO_SAMPLES, VERSIONS, getDemoSample } from "./demo-data.js";
import { feedbackPackStats } from "./feedback-pack.js";
import { applyTeacherReview, InvariantError } from "./invariants.js";
import { buildAnnotatedTranscriptSegments, buildMarkerRemarksModel } from "./marker-remarks.js";
import { getProviderStatus, runConfiguredProvider, runDemoWorkflow } from "./workflow.js";
import { listAssignments } from "./assignments.js";

const $ = (selector) => document.querySelector(selector);
const elements = {
  assignmentId: $("#batch-assignment-id"),
  assignmentSelect: $("#batch-assignment-select"),
  command: $("#batch-command"),
  maxMark: $("#batch-max-mark"),
  question: $("#batch-question"),
  rubric: $("#batch-rubric"),
  assignmentState: $("#batch-assignment-state"),
  assignmentPanel: $("#batch-assignment-panel"),
  confirmAssignment: $("#confirm-batch-assignment"),
  approvalModes: [...document.querySelectorAll('input[name="batch-approval-mode"]')],
  approvalNotice: $("#batch-approval-notice"),
  automationPolicyNote: $("#automation-policy-note"),
  upload: $("#batch-upload"),
  cameraFallbackUpload: $("#camera-fallback-upload"),
  openCameraScanner: $("#open-camera-scanner"),
  cameraDialog: $("#camera-scanner-dialog"),
  cameraClose: $("#close-camera-scanner"),
  cameraVideo: $("#camera-scanner-video"),
  cameraCanvas: $("#camera-scanner-canvas"),
  cameraLoading: $("#camera-scanner-loading"),
  cameraMessage: $("#camera-scanner-message"),
  cameraCapture: $("#capture-camera-scan"),
  cameraUndo: $("#undo-camera-scan"),
  cameraSessionCount: $("#camera-session-count"),
  loadSynthetic: $("#load-synthetic-class"),
  countBadge: $("#batch-count-badge"),
  empty: $("#batch-empty"),
  draftShell: $("#batch-draft-table-shell"),
  draftBody: $("#batch-draft-body"),
  run: $("#run-batch"),
  runNote: $("#batch-run-note"),
  runReadiness: $("#batch-run-readiness"),
  results: $("#batch-results"),
  resultBody: $("#batch-result-body"),
  approveEligible: $("#approve-high-confidence"),
  prepareFeedbackPack: $("#prepare-feedback-pack"),
  summaryText: $("#batch-summary-text"),
  average: $("#batch-average"),
  metricTotal: $("#metric-total"),
  metricCompleted: $("#metric-completed"),
  metricReview: $("#metric-review"),
  metricFailed: $("#metric-failed"),
  progressLabel: $("#progress-label"),
  progressPercent: $("#progress-percent"),
  progressFill: $("#progress-fill"),
  providerStatus: $("#provider-status"),
  policyTitle: $("#batch-policy-title"),
  policyList: $("#batch-policy-list"),
  resultsKicker: $("#results-kicker"),
  resultsTitle: $("#results-title"),
  resultsDescription: $("#results-description"),
  detail: $("#batch-detail"),
  detailStudent: $("#detail-student"),
  detailSource: $("#detail-source"),
  detailTranscript: $("#detail-transcript"),
  detailEvidence: $("#detail-evidence"),
  detailMark: $("#detail-mark"),
  detailMax: $("#detail-max"),
  detailConfidence: $("#detail-confidence"),
  detailFeedback: $("#detail-feedback"),
  detailDecisionStatus: $("#detail-decision-status"),
  detailApprove: $("#detail-approve"),
  detailShowAdjust: $("#detail-show-adjust"),
  detailReject: $("#detail-reject"),
  detailAdjustForm: $("#detail-adjust-form"),
  detailAdjustMark: $("#detail-adjust-mark"),
  detailAdjustReason: $("#detail-adjust-reason"),
  detailSaveAdjust: $("#detail-save-adjust"),
  feedbackPackShell: $("#feedback-pack-shell"),
  feedbackPackSummary: $("#feedback-pack-summary"),
  feedbackPackList: $("#feedback-pack-list"),
  feedbackSheetStatus: $("#feedback-sheet-status"),
  feedbackPrintLayout: $("#feedback-print-layout"),
  markerDialog: $("#marker-remarks-dialog"),
  markerDialogClose: $("#marker-dialog-close"),
  markerStudent: $("#marker-student"),
  markerSource: $("#marker-dialog-source"),
  markerScore: $("#marker-score"),
  markerConfidence: $("#marker-confidence"),
  markerDecision: $("#marker-decision"),
  markerQuestion: $("#marker-question"),
  markerScriptImage: $("#marker-script-image"),
  markerTranscript: $("#marker-annotated-transcript"),
  markerRemarksList: $("#marker-remarks-list"),
  markerMissedList: $("#marker-missed-list"),
  markerPriorityList: $("#marker-priority-list"),
  markerScorerSummary: $("#marker-scorer-summary"),
  toast: $("#batch-toast")
};

let activeMarkerObjectUrl = null;
let scannerStream = null;
let scannerSessionId = null;
let scannerCapturing = false;

const SCANNER_MAX_EDGE = 2600;
const SCANNER_JPEG_QUALITY = 0.92;

const state = {
  assignmentConfirmed: false,
  approvalMode: BATCH_APPROVAL_MODES.FULL_AUTO,
  items: [],
  running: false,
  batchId: null,
  createdAt: null,
  completedAt: null,
  selectedIndex: null,
  config: {
    max_file_mb: 32,
    max_batch_size: 100,
    max_batch_total_mb: 512,
    batch_concurrency: 4,
    max_account_storage_gb: 50
  },
  assignments: []
};

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text != null) element.textContent = text;
  return element;
}

function toast(message, type = "info") {
  elements.toast.textContent = message;
  elements.toast.className = `toast show ${type === "error" ? "error" : ""}`;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => { elements.toast.className = "toast"; }, 4300);
}

function setAssignmentState(confirmed) {
  state.assignmentConfirmed = confirmed;
  elements.assignmentState.textContent = confirmed ? "已确认" : "待确认";
  elements.assignmentState.className = `state-pill ${confirmed ? "confirmed" : "pending"}`;
  elements.assignmentPanel.classList.toggle("confirmation-missing", !confirmed);
  elements.confirmAssignment.classList.toggle("confirmation-required", !confirmed);
  elements.confirmAssignment.textContent = confirmed ? "✓ 全班作业设置已确认" : "确认全班作业设置（必需）";
  elements.confirmAssignment.setAttribute("aria-pressed", String(confirmed));
  updateRunButton();
}

function renderApprovalMode() {
  const automatic = state.approvalMode === BATCH_APPROVAL_MODES.FULL_AUTO;
  document.body.classList.toggle("auto-mode", automatic);
  elements.approvalModes.forEach((input) => {
    input.checked = input.value === state.approvalMode;
    input.disabled = state.running;
  });
  elements.approvalNotice.textContent = automatic
    ? "当前为全自动模式：通过硬性质量门槛的 OCR 与评分将由系统自动终审；异常项仍会拦截并提示教师。"
    : "当前为教师复核模式，机器结果在审核前仅为暂定成绩。";
  elements.automationPolicyNote.textContent = automatic
    ? "全自动模式会自动认可高置信度结果，以及已完成一分差异裁决的中置信度结果；低置信度、OCR 疑点和两分以上评分分歧不会被静默通过。"
    : "教师复核模式保留逐份或批量认可步骤，适合正式成绩与首次使用新题目。";
  elements.runNote.textContent = automatic
    ? `并发处理 ${state.config.batch_concurrency} 份；合格结果将自动终审并直接进入反馈打印包。`
    : `并发处理 ${state.config.batch_concurrency} 份；评分完成后进入教师复核队列。`;
  elements.policyTitle.textContent = automatic ? "全自动质量门槛" : "异常优先复核顺序";
  elements.policyList.replaceChildren();
  const policyItems = automatic
    ? ["OCR ≥ 97%，且无疑难文本或图像风险", "双评分一致，或一分差异已完成裁决", "低置信度、两分以上分歧与失败项自动拦截"]
    : ["无法辨认或处理失败的作答", "强制人工复核及中置信度结果", "双评分一致的高置信度结果"];
  policyItems.forEach((text) => elements.policyList.append(node("li", "", text)));
  elements.resultsKicker.textContent = automatic ? "自动终审结果与异常队列" : "教师复核队列";
  elements.resultsTitle.textContent = automatic ? "3. 检查自动终审与异常" : "3. 审核全班结果";
  elements.resultsDescription.textContent = automatic
    ? "合格结果已形成最终成绩并可直接打印反馈；仅异常项需要教师介入。"
    : "教师认可或调整前均为暂定分数；批量认可只处理无风险标记的高置信度结果。";
  elements.approveEligible.hidden = automatic;
}

function setApprovalMode(mode) {
  if (!Object.values(BATCH_APPROVAL_MODES).includes(mode) || state.running) return;
  const changed = state.approvalMode !== mode;
  state.approvalMode = mode;
  if (changed && state.items.some((item) => item.status !== "queued")) {
    state.items = state.items.map((item) => ({
      ...item,
      status: "queued",
      workflow: undefined,
      error_code: undefined,
      error_message: undefined
    }));
    state.batchId = null;
    state.createdAt = null;
    state.completedAt = null;
    state.selectedIndex = null;
    elements.detail.hidden = true;
    elements.feedbackPackShell.hidden = true;
    toast("终审方式已更改；原文件仍在，请重新运行本批次以应用新策略。 ");
  }
  renderAll();
}

function currentAssignment() {
  return {
    assignment_id: elements.assignmentId.value.trim(),
    question_text: elements.question.value.trim(),
    command_word: elements.command.value,
    max_mark: Number(elements.maxMark.value),
    mark_scheme_text: elements.rubric.value.trim(),
    teacher_confirmed: state.assignmentConfirmed
  };
}

function updateRunButton() {
  const realUploadsNeedLogin = state.items.some((item) => !item.sample_id) && !getAuthState().authenticated;
  const readiness = batchRunReadiness({
    running: state.running,
    assignmentConfirmed: state.assignmentConfirmed,
    itemCount: state.items.length,
    realUploadsNeedLogin
  });
  elements.run.disabled = !readiness.ready;
  elements.openCameraScanner.disabled = state.running;
  elements.upload.disabled = state.running;
  elements.run.title = readiness.ready ? "所有必需步骤已完成，可以开始全班批量评分。" : readiness.blockers.map((blocker) => blocker.message).join(" ");
  elements.runReadiness.className = `batch-run-readiness ${readiness.ready ? "ready" : "blocked"}`;
  elements.runReadiness.replaceChildren();
  elements.runReadiness.append(node("strong", "", readiness.ready ? "✓ 已就绪，可以开始评分" : "开始评分前还需完成"));
  if (readiness.ready) {
    elements.runReadiness.append(node("p", "", `全班作业设置已确认，${state.items.length} 份作答已就绪。`));
  } else {
    const list = node("ul");
    readiness.blockers.forEach((blocker) => {
      const item = node("li", `readiness-${blocker.code.toLowerCase().replaceAll("_", "-")}`, blocker.message);
      list.append(item);
    });
    elements.runReadiness.append(list);
  }
}

async function refreshProviderStatus() {
  try {
    const status = await getProviderStatus();
    const providers = [...new Set(Object.values(status.roles).map((role) => role.provider_label))].join(" + ");
    elements.providerStatus.textContent = status.ready
      ? `模型网关已就绪：${providers}。${status.cross_provider_review ? "独立复核使用不同模型供应商。" : "初评与复核当前使用同一供应商。"}`
      : `合成演示可直接使用；真实作答处理尚需配置 ${[...new Set(Object.values(status.roles).filter((role) => !role.configured).map((role) => role.missing_key_environment))].join("、")}。`;
    elements.providerStatus.classList.toggle("configured", status.ready);
  } catch {
    elements.providerStatus.textContent = "合成演示可直接使用；真实作答模型网关当前不可用。";
    elements.providerStatus.classList.remove("configured");
  }
}

function renderDraft() {
  elements.countBadge.textContent = `${state.items.length} / ${state.config.max_batch_size}`;
  elements.empty.hidden = state.items.length > 0;
  elements.draftShell.hidden = state.items.length === 0;
  elements.draftBody.replaceChildren();
  state.items.forEach((item, index) => {
    const row = node("tr");
    row.append(node("td", "", String(index + 1)));
    const refCell = node("td");
    const refInput = node("input", "student-ref-input");
    refInput.value = item.student_ref;
    refInput.maxLength = 80;
    refInput.setAttribute("aria-label", `第 ${index + 1} 名学生的匿名编号`);
    refInput.disabled = state.running || item.status !== "queued";
    refInput.addEventListener("input", () => { state.items[index].student_ref = refInput.value.trim(); });
    refCell.append(refInput);
    row.append(refCell);
    const source = node("td", "source-cell", item.source_name);
    source.title = item.source_name;
    row.append(source);
    row.append(node("td", "", item.sample_id ? "合成样例" : item.mime_type.replace("image/", "").toUpperCase()));
    const actionCell = node("td");
    const remove = node("button", "row-remove", "移除");
    remove.disabled = state.running || item.status !== "queued";
    remove.addEventListener("click", () => {
      state.items.splice(index, 1);
      renderAll();
    });
    actionCell.append(remove);
    row.append(actionCell);
    elements.draftBody.append(row);
  });
}

function statusPriority(item) {
  if (item.status === "failed") return 0;
  const output = item.workflow?.output;
  if (output?.manual_review_required || output?.confidence === "low") return 1;
  if (output?.confidence === "medium" && !output.teacher_review) return 2;
  if (!output?.teacher_review) return 3;
  return 4;
}

const STATUS_LABELS = Object.freeze({ queued: "排队中", processing: "处理中", completed: "已完成", failed: "失败" });
const CONFIDENCE_LABELS = Object.freeze({ high: "高", medium: "中", low: "低" });
const DECISION_LABELS = Object.freeze({ approved: "教师认可", adjusted: "教师调整", rejected: "已拒绝", "auto-approved": "系统自动终审", pending: "待审核", blocked: "受阻" });

function renderResults() {
  const hasProcessed = state.items.some((item) => item.status !== "queued");
  elements.results.hidden = !hasProcessed;
  elements.resultBody.replaceChildren();
  const indexed = state.items.map((item, index) => ({ item, index })).sort((a, b) => statusPriority(a.item) - statusPriority(b.item));
  for (const { item, index } of indexed) {
    const output = item.workflow?.output;
    const row = node("tr", item.status === "failed" ? "failed-row" : output?.manual_review_required || output?.confidence === "medium" ? "needs-review" : "");
    row.append(node("td", "", item.student_ref));
    const statusCell = node("td");
    statusCell.append(node("span", `status-label ${item.status}`, STATUS_LABELS[item.status] ?? item.status));
    row.append(statusCell);
    const markCell = node("td", "mark-cell");
    if (output) {
      markCell.append(node("strong", "", String(output.provisional_mark)));
      markCell.append(node("span", "", ` / ${output.max_mark}`));
    } else markCell.textContent = "—";
    row.append(markCell);
    const confidenceCell = node("td");
    if (output) confidenceCell.append(node("span", `confidence-label ${output.confidence}`, CONFIDENCE_LABELS[output.confidence] ?? output.confidence));
    else confidenceCell.textContent = "—";
    row.append(confidenceCell);
    const automaticApproval = output?.teacher_review?.decision_source === "automatic_policy";
    const decision = automaticApproval ? "auto-approved" : output?.teacher_review?.decision ?? (item.status === "failed" ? "blocked" : "pending");
    const decisionCell = node("td");
    decisionCell.append(node("span", `decision-label ${decision}`, DECISION_LABELS[decision] ?? decision));
    row.append(decisionCell);
    const actionCell = node("td");
    if (output) {
      const actions = node("div", "result-actions");
      const remarks = node("button", "view-result marker-remarks-action", "批注稿");
      remarks.setAttribute("aria-haspopup", "dialog");
      remarks.setAttribute("aria-label", `查看 ${item.student_ref} 的手写作答与阅卷批注`);
      remarks.addEventListener("click", () => openMarkerRemarks(index));
      const view = node("button", "view-result", "评分详情");
      view.addEventListener("click", () => openDetail(index));
      actions.append(remarks, view);
      if (["approved", "adjusted"].includes(output.teacher_review?.decision)) {
        const feedback = node("button", "view-result student-feedback-action", "反馈单");
        feedback.setAttribute("aria-label", `预览并打印 ${item.student_ref} 的学生反馈评分单`);
        feedback.addEventListener("click", () => openStudentFeedbackSheet(item.student_ref));
        actions.append(feedback);
      }
      actionCell.append(actions);
    } else if (item.error_message) actionCell.append(node("span", "version-line", item.error_message));
    row.append(actionCell);
    elements.resultBody.append(row);
  }

  const summary = summarizeBatch(state.items);
  elements.summaryText.textContent = state.approvalMode === BATCH_APPROVAL_MODES.FULL_AUTO
    ? `已评分 ${summary.completed}/${summary.total} · 自动终审 ${summary.automatically_approved} · 异常待处理 ${summary.pending_review}`
    : `已评分 ${summary.completed}/${summary.total} · 待教师复核 ${summary.pending_review} · 已认可 ${summary.approved}`;
  elements.average.textContent = `平均分：${summary.provisional_average == null ? "—" : summary.provisional_average.toFixed(2)}`;
  elements.approveEligible.disabled = state.running || summary.high_confidence_eligible === 0;
  const feedbackStats = feedbackPackStats(state.items, currentAssignment());
  elements.prepareFeedbackPack.disabled = state.running || feedbackStats.reviewed_students === 0;
  elements.prepareFeedbackPack.textContent = `预览学生反馈评分单（${feedbackStats.reviewed_students}/${feedbackStats.total_students}）`;
  elements.feedbackSheetStatus.className = `feedback-sheet-status ${feedbackStats.all_students_have_sheets ? "ready" : feedbackStats.reviewed_students ? "partial" : "pending"}`;
  elements.feedbackSheetStatus.replaceChildren();
  if (feedbackStats.all_students_have_sheets) {
    elements.feedbackSheetStatus.append(
      node("strong", "", `✓ ${feedbackStats.individual_sheet_count}/${feedbackStats.total_students} 份学生反馈评分单已生成`),
      node("span", "", "每名学生恰好一份；可逐人打印，也可使用节纸或整页模式打印全班。")
    );
  } else if (feedbackStats.reviewed_students) {
    const missing = feedbackStats.missing_students.slice(0, 4).map((item) => item.student_ref).join("、");
    elements.feedbackSheetStatus.append(
      node("strong", "", `${feedbackStats.reviewed_students}/${feedbackStats.total_students} 份学生反馈评分单已生成`),
      node("span", "", `尚缺 ${feedbackStats.missing_students.length} 份（${missing}${feedbackStats.missing_students.length > 4 ? "等" : ""}）；这些作答完成终审后才可打印。`)
    );
  } else {
    elements.feedbackSheetStatus.append(
      node("strong", "", state.running ? "正在生成学生反馈评分单……" : "学生反馈评分单尚未生成"),
      node("span", "", "形成最终成绩后，每名学生都会获得一份含分数、双语反馈和针对性巩固题的可打印反馈单。")
    );
  }
}

function updateOverview() {
  const summary = summarizeBatch(state.items);
  elements.metricTotal.textContent = summary.total;
  elements.metricCompleted.textContent = summary.completed;
  elements.metricReview.textContent = summary.pending_review;
  elements.metricFailed.textContent = summary.failed;
  const finished = summary.completed + summary.failed;
  const percent = summary.total ? Math.round((finished / summary.total) * 100) : 0;
  elements.progressPercent.textContent = `${percent}%`;
  elements.progressFill.style.width = `${percent}%`;
  elements.progressLabel.textContent = state.running
    ? `正在处理第 ${finished}/${summary.total} 份`
    : summary.total === 0
      ? "等待添加作答"
      : finished === summary.total && finished > 0
        ? "批量评分已完成"
        : `${summary.total} 份作答已就绪`;
}

function renderAll() {
  renderApprovalMode();
  renderDraft();
  renderResults();
  updateOverview();
  updateRunButton();
}

function loadSyntheticClass() {
  if (state.running) return;
  state.items = Array.from({ length: 30 }, (_, index) => {
    const sample = DEMO_SAMPLES[index % 3];
    return {
      submission_id: `SYN-SUB-${String(index + 1).padStart(2, "0")}`,
      student_ref: `SYN-${String(index + 1).padStart(2, "0")}`,
      source_name: `synthetic-${sample.id}-${String(index + 1).padStart(2, "0")}.svg`,
      mime_type: "image/svg+xml",
      sample_id: sample.id,
      status: "queued"
    };
  });
  elements.question.value = DEMO_QUESTION.question_text;
  elements.assignmentId.value = "demo-assignment";
  elements.assignmentSelect.value = "__demo__";
  elements.command.value = DEMO_QUESTION.command_word;
  elements.maxMark.value = String(DEMO_QUESTION.max_mark);
  elements.rubric.value = DEMO_QUESTION.mark_scheme_text;
  setAssignmentState(false);
  state.batchId = null;
  state.createdAt = null;
  state.completedAt = null;
  state.selectedIndex = null;
  elements.detail.hidden = true;
  elements.feedbackPackShell.hidden = true;
  elements.feedbackPackList.replaceChildren();
  renderAll();
  toast("已载入 30 名合成学生。请先确认全班作业设置，再开始批量评分。 ");
}

function resetBatchAfterIntakeChange({ requeue = false } = {}) {
  if (requeue) {
    state.items = state.items.map((item) => ({
      ...item,
      status: "queued",
      workflow: undefined,
      error_code: undefined,
      error_message: undefined
    }));
  }
  state.batchId = null;
  state.createdAt = null;
  state.completedAt = null;
  state.selectedIndex = null;
  elements.detail.hidden = true;
  elements.feedbackPackShell.hidden = true;
  elements.feedbackPackList.replaceChildren();
}

function updateScannerStatus() {
  const sessionItems = scannerSessionId
    ? state.items.filter((item) => item.scan_session_id === scannerSessionId)
    : [];
  elements.cameraSessionCount.textContent = String(sessionItems.length);
  elements.cameraUndo.disabled = scannerCapturing || !sessionItems.some((item) => item.status === "queued");
  if (scannerStream && !scannerCapturing) {
    elements.cameraMessage.textContent = `${sessionItems.length} 份已加入队列 · 当前批次共 ${state.items.length} 份。放好下一份后继续拍摄。`;
  }
}

async function handleFiles(files, { origin = "files", scanSessionId = null } = {}) {
  if (state.running || !files?.length) return;
  if (!ensureAuthenticated()) {
    elements.upload.value = "";
    elements.cameraFallbackUpload.value = "";
    return [];
  }
  if (getAuthState().account?.role !== "teacher") {
    toast("真实批量评分需要教师账户。", "error");
    elements.upload.value = "";
    elements.cameraFallbackUpload.value = "";
    return [];
  }
  if (!elements.assignmentId.value || elements.assignmentId.value === "demo-assignment") {
    toast("请先从中央作业库选择一项已发布作业。", "error");
    elements.upload.value = "";
    elements.cameraFallbackUpload.value = "";
    return [];
  }
  const incoming = [...files];
  const replacingSynthetic = state.items.some((item) => item.sample_id);
  const existingItems = replacingSynthetic ? [] : state.items;
  if (existingItems.length + incoming.length > state.config.max_batch_size) {
    toast(`当前服务器配置允许每批最多 ${state.config.max_batch_size} 份作答。`, "error");
    elements.upload.value = "";
    elements.cameraFallbackUpload.value = "";
    return [];
  }
  const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
  const invalid = incoming.find((file) => !allowed.has(file.type) || file.size > state.config.max_file_mb * 1024 * 1024);
  if (invalid) {
    toast(`${invalid.name} 格式不受支持或超过 ${state.config.max_file_mb} MB。`, "error");
    elements.upload.value = "";
    elements.cameraFallbackUpload.value = "";
    return [];
  }
  const totalBytes = existingItems.reduce((sum, item) => sum + (item.file?.size ?? 0), 0)
    + incoming.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > state.config.max_batch_total_mb * 1024 * 1024) {
    toast(`当前队列与新图片合计超过批次上限 ${state.config.max_batch_total_mb} MB。`, "error");
    elements.upload.value = "";
    elements.cameraFallbackUpload.value = "";
    return [];
  }
  if (replacingSynthetic) state.items = [];
  const occupied = new Set(state.items.map((item) => item.student_ref));
  const added = incoming.map((file, index) => {
    const proposed = origin === "camera"
      ? nextStudentRef(occupied)
      : deriveStudentRef(file.name, state.items.length + index);
    const studentRef = uniqueStudentRef(proposed, occupied);
    occupied.add(studentRef);
    return {
      submission_id: `SUB-${crypto.randomUUID()}`,
      student_ref: studentRef,
      source_name: file.name,
      mime_type: file.type,
      file,
      status: "queued",
      ...(scanSessionId ? { scan_session_id: scanSessionId } : {})
    };
  });
  const requeue = state.items.some((item) => item.status !== "queued");
  state.items.push(...added);
  resetBatchAfterIntakeChange({ requeue });
  elements.upload.value = "";
  elements.cameraFallbackUpload.value = "";
  renderAll();
  updateScannerStatus();
  if (origin !== "camera") {
    const prefix = replacingSynthetic ? "已移除合成演示班级并" : "";
    toast(`${prefix}新增 ${added.length} 份作答；当前队列共 ${state.items.length} 份。`);
  }
  return added;
}

function stopCameraScanner() {
  scannerStream?.getTracks().forEach((track) => track.stop());
  scannerStream = null;
  elements.cameraVideo.srcObject = null;
  elements.cameraLoading.hidden = false;
}

function closeCameraScanner() {
  if (elements.cameraDialog.open) elements.cameraDialog.close();
  else stopCameraScanner();
}

async function openCameraScanner() {
  if (state.running || !ensureAuthenticated()) return;
  if (getAuthState().account?.role !== "teacher" || !elements.assignmentId.value || elements.assignmentId.value === "demo-assignment") {
    toast("请使用教师账户并先选择一项已发布作业。", "error");
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    elements.cameraFallbackUpload.click();
    return;
  }
  scannerSessionId = `SCAN-${crypto.randomUUID()}`;
  elements.cameraMessage.textContent = "正在连接相机；拍摄的图片会先保留在本机队列中。";
  elements.cameraLoading.hidden = false;
  elements.cameraDialog.showModal();
  updateScannerStatus();
  try {
    scannerStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 1920 },
        height: { ideal: 2560 }
      }
    });
    elements.cameraVideo.srcObject = scannerStream;
    await elements.cameraVideo.play();
    elements.cameraLoading.hidden = true;
    updateScannerStatus();
  } catch (error) {
    stopCameraScanner();
    if (elements.cameraDialog.open) elements.cameraDialog.close();
    toast("无法打开连续相机。请允许相机权限，或使用“从相册或文件中添加”。", "error");
  }
}

function canvasToJpeg(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("无法生成拍摄图片。"));
    }, "image/jpeg", SCANNER_JPEG_QUALITY);
  });
}

async function captureCameraScan() {
  if (scannerCapturing || !scannerStream) return;
  const width = elements.cameraVideo.videoWidth;
  const height = elements.cameraVideo.videoHeight;
  if (!width || !height) {
    elements.cameraMessage.textContent = "相机仍在准备，请稍后再拍。";
    return;
  }
  scannerCapturing = true;
  elements.cameraCapture.disabled = true;
  elements.cameraUndo.disabled = true;
  elements.cameraMessage.textContent = "正在保存这一份作答……";
  try {
    const scale = Math.min(1, SCANNER_MAX_EDGE / Math.max(width, height));
    const canvas = elements.cameraCanvas;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const context = canvas.getContext("2d", { alpha: false });
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(elements.cameraVideo, 0, 0, canvas.width, canvas.height);
    const blob = await canvasToJpeg(canvas);
    const sequence = state.items.length + 1;
    const file = new File([blob], `phone-scan-${String(sequence).padStart(3, "0")}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now()
    });
    const added = await handleFiles([file], { origin: "camera", scanSessionId: scannerSessionId });
    if (added?.length) {
      elements.cameraDialog.classList.remove("camera-flash");
      requestAnimationFrame(() => elements.cameraDialog.classList.add("camera-flash"));
      setTimeout(() => elements.cameraDialog.classList.remove("camera-flash"), 180);
    }
  } catch (error) {
    elements.cameraMessage.textContent = error.message ?? "拍摄失败，请重试。";
  } finally {
    scannerCapturing = false;
    elements.cameraCapture.disabled = false;
    updateScannerStatus();
  }
}

function undoLastCameraScan() {
  if (!scannerSessionId || scannerCapturing) return;
  const index = state.items.findLastIndex((item) => item.scan_session_id === scannerSessionId && item.status === "queued");
  if (index < 0) return;
  state.items.splice(index, 1);
  resetBatchAfterIntakeChange();
  renderAll();
  updateScannerStatus();
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function gradeItem(item, index, assignment, approvalMode) {
  if (item.sample_id) {
    if (
      assignment.question_text !== DEMO_QUESTION.question_text
      || assignment.mark_scheme_text !== DEMO_QUESTION.mark_scheme_text
      || assignment.command_word !== DEMO_QUESTION.command_word
      || assignment.max_mark !== DEMO_QUESTION.max_mark
    ) throw new InvariantError("合成演示班级只能使用原始演示题目与评分标准。", "DEMO_ASSIGNMENT_CHANGED");
    await new Promise((resolve) => setTimeout(resolve, 28 + (index % 4) * 12));
    const sample = getDemoSample(item.sample_id);
    const workflow = runDemoWorkflow({
      sample,
      transcript: sample.transcript,
      rubricConfirmed: true,
      runId: `${state.batchId}-${item.submission_id}`,
      mode: "public_sample",
      confirmationMethod: approvalMode === BATCH_APPROVAL_MODES.FULL_AUTO ? "auto_gated" : "teacher"
    });
    workflow.input.student_ref = item.student_ref;
    workflow.input.answer_images[0].name = item.source_name;
    return workflow;
  }

  const answerDataUrl = await fileToDataUrl(item.file);
  const response = await runConfiguredProvider({
    run_id: `${state.batchId}-${item.submission_id}`,
    batch_id: state.batchId,
    mode: "account_upload",
    batch_mode: true,
    approval_mode: approvalMode,
    assignment_id: assignment.assignment_id,
    student_ref: item.student_ref,
    answer_name: item.source_name,
    answer_mime_type: item.mime_type,
    answer_data_url: answerDataUrl,
    assignment,
    transcript_confirmation_policy: "exception_only",
    language: "en_zh",
    schema_version: VERSIONS.schema_version
  }, authFetch);
  if (!response?.output) throw new Error("模型网关未返回有效的 EconMark 评分结果。 ");
  return response;
}

async function runBatch() {
  try {
    assertBatchReady(state.items, { maxBatchSize: state.config.max_batch_size });
    if (state.items.some((item) => !item.sample_id) && !ensureAuthenticated()) {
      throw new InvariantError("上传作答的批量评分需要先登录。", "AUTH_REQUIRED");
    }
    if (state.items.some((item) => !item.sample_id) && getAuthState().account?.role !== "teacher") {
      throw new InvariantError("真实批量评分需要教师账户。", "ROLE_FORBIDDEN");
    }
    if (!state.assignmentConfirmed) throw new InvariantError("评分前请先确认全班作业设置。", "ASSIGNMENT_UNCONFIRMED");
    state.running = true;
    state.batchId = `batch-${crypto.randomUUID()}`;
    state.createdAt = new Date().toISOString();
    state.completedAt = null;
    elements.feedbackPackShell.hidden = true;
    elements.feedbackPackList.replaceChildren();
    state.items = state.items.map((item) => ({ ...item, status: "queued", workflow: undefined, error_code: undefined, error_message: undefined }));
    renderAll();
    const assignment = currentAssignment();
    const approvalMode = state.approvalMode;
    elements.run.querySelector("span").textContent = "正在批量处理全班作答……";

    const results = await processBatch(state.items, (item, index) => gradeItem(item, index, assignment, approvalMode), {
      concurrency: state.config.batch_concurrency,
      maxConcurrency: state.config.batch_concurrency,
      maxBatchSize: state.config.max_batch_size,
      onProgress: ({ index, status, workflow, error }) => {
        state.items[index] = {
          ...state.items[index],
          status,
          ...(workflow ? { workflow } : {}),
          ...(error ? { error_code: error.code ?? "BATCH_ITEM_FAILED", error_message: error.message } : {})
        };
        renderResults();
        updateOverview();
      }
    });
    state.items = approvalMode === BATCH_APPROVAL_MODES.FULL_AUTO
      ? approveAutomaticResults(results)
      : results;
    state.completedAt = new Date().toISOString();
    const summary = summarizeBatch(state.items);
    const automaticExceptions = approvalMode === BATCH_APPROVAL_MODES.FULL_AUTO ? summary.pending_review : 0;
    toast(summary.failed || automaticExceptions
      ? `已完成 ${summary.completed} 份；自动终审 ${summary.automatically_approved} 份，${summary.failed + automaticExceptions} 份异常待处理。`
      : approvalMode === BATCH_APPROVAL_MODES.FULL_AUTO
        ? `全部 ${summary.completed} 份作答均已自动终审，可直接生成全班反馈。`
        : `全部 ${summary.completed} 份作答均已生成暂定分数。`
    , summary.failed || automaticExceptions ? "error" : "info");
  } catch (error) {
    toast(`${error.code ? `${error.code}: ` : ""}${error.message}`, "error");
  } finally {
    state.running = false;
    elements.run.querySelector("span").textContent = "开始全班批量评分";
    renderAll();
    if (state.completedAt && feedbackPackStats(state.items, currentAssignment()).reviewed_students > 0) {
      prepareFeedbackPack({ scroll: false, silent: true });
    }
  }
}

function addList(container, title, items, ordered = false) {
  container.append(node("h4", "", title));
  const list = node(ordered ? "ol" : "ul");
  items.forEach((item) => list.append(node("li", "", item)));
  container.append(list);
}

function appendSimpleItems(container, items, emptyText) {
  container.replaceChildren();
  if (!items.length) {
    container.append(node("li", "marker-empty", emptyText));
    return;
  }
  items.forEach((item) => container.append(node("li", "", item)));
}

function releaseMarkerObjectUrl() {
  if (!activeMarkerObjectUrl) return;
  URL.revokeObjectURL(activeMarkerObjectUrl);
  activeMarkerObjectUrl = null;
}

function markerImageSource(item) {
  releaseMarkerObjectUrl();
  if (item.sample_id) return getDemoSample(item.sample_id)?.image ?? "";
  if (item.workflow?.persistence?.image_url) return item.workflow.persistence.image_url;
  if (item.file) {
    activeMarkerObjectUrl = URL.createObjectURL(item.file);
    return activeMarkerObjectUrl;
  }
  return "";
}

function closeMarkerRemarks() {
  if (elements.markerDialog.open) elements.markerDialog.close();
  releaseMarkerObjectUrl();
}

function openMarkerRemarks(index) {
  const item = state.items[index];
  if (!item?.workflow?.output) return;
  const model = buildMarkerRemarksModel(item, currentAssignment());
  const review = model.teacher_review;
  const automatic = review?.decision_source === "automatic_policy";

  elements.markerStudent.textContent = model.student_ref;
  elements.markerSource.textContent = model.source_name;
  elements.markerScore.textContent = `${model.final_mark ?? model.provisional_mark} / ${model.max_mark}${model.final_mark == null ? "（暂定）" : ""}`;
  elements.markerConfidence.textContent = `${CONFIDENCE_LABELS[model.confidence] ?? model.confidence}${model.manual_review_required ? " · 需人工复核" : ""}`;
  elements.markerDecision.textContent = review
    ? automatic ? "系统自动终审" : DECISION_LABELS[review.decision] ?? review.decision
    : "等待终审";
  elements.markerQuestion.textContent = model.question_text;
  elements.markerScriptImage.src = markerImageSource(item);
  elements.markerScriptImage.alt = `${model.student_ref} 的手写作答原图`;

  elements.markerTranscript.replaceChildren();
  for (const segment of buildAnnotatedTranscriptSegments(model)) {
    if (segment.type === "text") {
      elements.markerTranscript.append(document.createTextNode(segment.text));
      continue;
    }
    const highlight = node("mark", `marker-highlight ${segment.credit_status === "not_credited" ? "not-credited" : "credited"}`);
    highlight.append(document.createTextNode(segment.text), node("sup", "", String(segment.number)));
    highlight.title = segment.credit_status === "not_credited" ? "该处未计分" : `该处计 ${segment.mark_value} 分`;
    elements.markerTranscript.append(highlight);
  }
  if (!model.transcript) elements.markerTranscript.textContent = "模型服务未返回可携带的转写文本。";

  elements.markerRemarksList.replaceChildren();
  model.annotations.forEach((annotation) => {
    const remark = node("li", `marker-remark ${annotation.credit_status === "not_credited" ? "not-credited" : "credited"}`);
    const heading = node("div", "marker-remark-heading");
    heading.append(
      node("span", "marker-number", String(annotation.number)),
      node("strong", "", annotation.rubric_reference),
      node("b", "marker-credit", annotation.credit_status === "not_credited" ? "不计分" : `+${annotation.mark_value}`)
    );
    remark.append(heading, node("blockquote", "", `“${annotation.transcript_quote}”`), node("p", "", annotation.economic_reason));
    if (annotation.quality_flags.length) {
      const flags = node("div", "marker-flags");
      annotation.quality_flags.forEach((flag) => flags.append(node("span", "", flag)));
      remark.append(flags);
    }
    if (!annotation.located) remark.append(node("p", "marker-location-warning", "警告：该引文未能在当前转写中逐字定位。"));
    elements.markerRemarksList.append(remark);
  });

  appendSimpleItems(elements.markerMissedList, model.missed_opportunities, "本次输出未列出额外缺失发展。");
  appendSimpleItems(elements.markerPriorityList, model.priorities.map((priority) => priority.text), "本次输出未列出额外优先改进项。");
  const scorer = model.scorer_marks;
  elements.markerScorerSummary.replaceChildren();
  if (scorer) {
    elements.markerScorerSummary.append(
      node("p", "", `初评：${scorer.primary}/${model.max_mark}`),
      node("p", "", `独立复评：${scorer.reviewer}/${model.max_mark}`),
      node("p", "", `裁决：${scorer.adjudicated == null ? "无需或未触发" : `${scorer.adjudicated}/${model.max_mark}`}`)
    );
  }
  model.confidence_reasons.forEach((reason) => elements.markerScorerSummary.append(node("p", "marker-confidence-reason", reason)));

  if (!elements.markerDialog.open) elements.markerDialog.showModal();
}

function openDetail(index) {
  const item = state.items[index];
  const output = item?.workflow?.output;
  if (!output) return;
  state.selectedIndex = index;
  elements.detail.hidden = false;
  elements.detailStudent.textContent = item.student_ref;
  elements.detailSource.textContent = item.source_name;
  elements.detailTranscript.textContent = item.workflow.input?.confirmed_transcript?.text ?? "模型服务未返回可携带的转写文本。";
  elements.detailMark.textContent = output.provisional_mark;
  elements.detailMax.textContent = `/ ${output.max_mark}`;
  elements.detailConfidence.textContent = `${CONFIDENCE_LABELS[output.confidence] ?? output.confidence}置信度 · ${output.manual_review_required ? "必须人工复核" : "无强制复核标记"}`;
  elements.detailAdjustMark.max = String(output.max_mark);
  elements.detailAdjustMark.value = String(output.provisional_mark);
  elements.detailAdjustReason.value = "";
  elements.detailAdjustForm.hidden = true;

  elements.detailEvidence.replaceChildren();
  output.evidence.forEach((evidence) => {
    const article = node("article", `evidence-item ${evidence.credit_status === "not_credited" ? "not-credited" : ""}`);
    const header = node("header");
    header.append(node("b", "", evidence.rubric_reference), node("span", "", evidence.credit_status === "not_credited" ? "不计分" : `+${evidence.mark_value}`));
    article.append(header, node("blockquote", "", `“${evidence.transcript_quote}”`), node("p", "", evidence.economic_reason));
    elements.detailEvidence.append(article);
  });

  elements.detailFeedback.replaceChildren();
  addList(elements.detailFeedback, "已有优点", output.feedback_zh.strengths);
  addList(elements.detailFeedback, "两个优先改进点", output.feedback_zh.priorities.map((priority) => priority.text), true);
  addList(elements.detailFeedback, "针对性巩固问题", output.follow_up_questions_zh.map((question) => question.text), true);
  const review = output.teacher_review;
  const automaticApproval = review?.decision_source === "automatic_policy";
  elements.detailDecisionStatus.textContent = review
    ? review.decision === "rejected"
      ? "结果已拒绝，未生成最终成绩。"
      : automaticApproval
        ? `系统自动终审：${output.final_mark}/${output.max_mark} · 策略 ${review.policy_version}`
        : `教师最终分数：${output.final_mark}/${output.max_mark} · ${DECISION_LABELS[review.decision] ?? review.decision}`
    : state.approvalMode === BATCH_APPROVAL_MODES.FULL_AUTO ? "自动终审被质量门槛拦截，等待教师复核。" : "等待教师复核。";
  elements.detailDecisionStatus.className = `decision-status ${review ? review.decision === "rejected" ? "rejected" : "final" : ""}`;
  elements.detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function applyDetailDecision(review) {
  const index = state.selectedIndex;
  const item = state.items[index];
  if (!item?.workflow?.output) return;
  try {
    const workflow = item.workflow.persistence?.run_id
      ? await saveRunDecision(item.workflow.persistence.run_id, review)
      : { ...item.workflow, output: applyTeacherReview(item.workflow.output, review) };
    state.items[index] = {
      ...item,
      workflow
    };
    renderResults();
    updateOverview();
    openDetail(index);
    if (!elements.feedbackPackShell.hidden) prepareFeedbackPack({ scroll: false, silent: true });
    toast("该学生的教师决定已写入审计记录。 ");
  } catch (error) {
    toast(error.message, "error");
  }
}

async function approveHighConfidence() {
  const before = summarizeBatch(state.items).approved;
  const proposed = approveEligibleResults(state.items);
  const synchronized = await Promise.all(proposed.map(async (item, index) => {
    const wasPending = !state.items[index]?.workflow?.output?.teacher_review;
    const isNowApproved = item.workflow?.output?.teacher_review?.decision === "approved";
    if (!wasPending || !isNowApproved || !item.workflow?.persistence?.run_id) return item;
    try {
      return { ...item, workflow: await saveRunDecision(item.workflow.persistence.run_id, { decision: "approved" }) };
    } catch (error) {
      return { ...state.items[index], error_code: error.code ?? "DECISION_SAVE_FAILED", error_message: error.message };
    }
  }));
  state.items = synchronized;
  const after = summarizeBatch(state.items).approved;
  renderAll();
  if (feedbackPackStats(state.items, currentAssignment()).reviewed_students > 0) {
    prepareFeedbackPack({ scroll: false, silent: true });
  }
  if (state.selectedIndex != null && state.items[state.selectedIndex]?.workflow?.output) openDetail(state.selectedIndex);
  toast(`已批量认可 ${after - before} 份高置信度结果；有风险标记或中置信度的作答仍待单独复核。`);
}

function makeRecord() {
  return serializableBatchRecord({
    batchId: state.batchId ?? `draft-${crypto.randomUUID()}`,
    assignment: currentAssignment(),
    items: state.items,
    createdAt: state.createdAt ?? new Date().toISOString(),
    completedAt: state.completedAt,
    versions: VERSIONS,
    approvalMode: state.approvalMode
  });
}

function download(content, type, filename) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function exportJson() {
  const record = makeRecord();
  download(JSON.stringify(record, null, 2), "application/json", `${record.batch_id}.json`);
}

function exportCsv() {
  const rows = [["student_ref", "source_name", "status", "provisional_mark", "max_mark", "confidence", "manual_review_required", "decision", "decision_source", "final_mark", "error"]];
  state.items.forEach((item) => {
    const output = item.workflow?.output;
    rows.push([
      item.student_ref,
      item.source_name,
      item.status,
      output?.provisional_mark,
      output?.max_mark,
      output?.confidence,
      output?.manual_review_required,
      output?.teacher_review?.decision ?? "pending",
      output?.teacher_review?.decision_source ?? "pending",
      output?.final_mark,
      item.error_message
    ]);
  });
  download(rows.map((row) => row.map(csvCell).join(",")).join("\r\n"), "text/csv;charset=utf-8", `${state.batchId ?? "econmark-batch"}.csv`);
}

function addPairedSlipList(container, title, chineseItems, englishItems, ordered = false) {
  const section = node("section", `slip-section ${title.includes("巩固") ? "practice-section" : ""}`);
  section.append(node("h4", "", title));
  const list = node(ordered ? "ol" : "ul");
  chineseItems.forEach((text, index) => {
    const item = node("li");
    item.append(node("span", "", text));
    if (englishItems[index]) item.append(node("small", "", englishItems[index]));
    if (title.includes("巩固")) item.append(node("div", "answer-lines"));
    list.append(item);
  });
  section.append(list);
  container.append(section);
}

function prepareFeedbackPack({ scroll = true, silent = false } = {}) {
  const assignment = currentAssignment();
  const stats = feedbackPackStats(state.items, assignment);
  if (!stats.reviewed_students) {
    if (!silent) toast("生成学生反馈前，请至少认可或调整一份评分结果。", "error");
    return stats;
  }
  elements.feedbackPackList.replaceChildren();
  stats.slips.forEach((slip, index) => {
    const article = node("article", "feedback-slip");
    article.dataset.studentRef = slip.student_ref;
    article.setAttribute("aria-label", `${slip.student_ref} 的学生反馈评分单`);
    const header = node("header", "feedback-slip-header");
    const identity = node("div");
    identity.append(node("h3", "", slip.student_ref), node("p", "", "EconMark 学生反馈与评分单 · Student Feedback & Mark Sheet"));
    const mark = node("div", "feedback-slip-mark");
    mark.append(node("small", "", "最终成绩"), node("strong", "", String(slip.final_mark)), node("span", "", ` / ${slip.max_mark}`));
    header.append(identity, mark);
    article.append(header, node("p", "feedback-slip-question", slip.question_text));
    addPairedSlipList(article, "已有优点 · What you did well", slip.strengths_zh, slip.strengths_en);
    addPairedSlipList(article, "下一步改进 · Next priorities", slip.priorities_zh, slip.priorities_en, true);
    addPairedSlipList(article, "针对性巩固 · Practice before the next essay", slip.follow_up_questions_zh, slip.follow_up_questions_en, true);
    const footer = node("div", "feedback-slip-footer");
    footer.append(
      node("span", "", `成绩已核准 · ${new Date(slip.reviewed_at).toLocaleDateString("zh-CN")}`),
      node("span", "", `第 ${index + 1}/${stats.individual_sheet_count} 份 · 每道巩固题请用 2–4 句话作答。`)
    );
    const actions = node("div", "feedback-slip-actions");
    const printStudent = node("button", "button button-ghost", "单独打印本学生（1 页 A4）");
    printStudent.setAttribute("aria-label", `单独打印 ${slip.student_ref} 的学生反馈评分单`);
    printStudent.addEventListener("click", () => printStudentFeedback(slip.student_ref));
    actions.append(printStudent);
    article.append(footer, actions);
    elements.feedbackPackList.append(article);
  });
  elements.feedbackPackSummary.textContent = stats.all_students_have_sheets
    ? `覆盖完整：${stats.individual_sheet_count}/${stats.total_students} 名学生，每人恰好一份 · 节纸模式 ${stats.sheets_at_two_per_page} 张 A4；整页模式 ${stats.sheets_at_one_per_page} 张 A4`
    : `已生成 ${stats.individual_sheet_count}/${stats.total_students} 份 · 尚有 ${stats.missing_students.length} 名学生等待终审或处理异常，未生成的学生不会被静默遗漏`;
  elements.feedbackPackShell.hidden = false;
  if (scroll) elements.feedbackPackShell.scrollIntoView({ behavior: "smooth", block: "start" });
  return stats;
}

function findFeedbackSheet(studentRef) {
  return [...elements.feedbackPackList.children].find((sheet) => sheet.dataset.studentRef === studentRef) ?? null;
}

function openStudentFeedbackSheet(studentRef) {
  prepareFeedbackPack({ scroll: false });
  const sheet = findFeedbackSheet(studentRef);
  if (!sheet) {
    toast(`${studentRef} 尚未形成最终成绩，暂时不能生成学生反馈评分单。`, "error");
    return;
  }
  elements.feedbackPackList.querySelectorAll(".feedback-slip-focused").forEach((item) => item.classList.remove("feedback-slip-focused"));
  sheet.classList.add("feedback-slip-focused");
  sheet.scrollIntoView({ behavior: "smooth", block: "center" });
}

function clearFeedbackPrintState() {
  document.body.classList.remove("printing-feedback", "printing-single-feedback", "feedback-layout-two-up", "feedback-layout-full-page");
  elements.feedbackPackList.querySelectorAll(".print-selected").forEach((sheet) => sheet.classList.remove("print-selected"));
}

function startFeedbackPrint({ studentRef = null, layout = "two-up" } = {}) {
  const stats = prepareFeedbackPack({ scroll: false });
  if (!stats?.reviewed_students) return;
  clearFeedbackPrintState();
  if (studentRef) {
    const sheet = findFeedbackSheet(studentRef);
    if (!sheet) {
      toast(`${studentRef} 尚无可打印反馈评分单。`, "error");
      return;
    }
    sheet.classList.add("print-selected");
    document.body.classList.add("printing-single-feedback");
    layout = "full-page";
  }
  document.body.classList.add("printing-feedback", layout === "full-page" ? "feedback-layout-full-page" : "feedback-layout-two-up");
  window.addEventListener("afterprint", clearFeedbackPrintState, { once: true });
  window.print();
}

function printStudentFeedback(studentRef) {
  startFeedbackPrint({ studentRef, layout: "full-page" });
}

function printFeedbackPack() {
  startFeedbackPrint({ layout: elements.feedbackPrintLayout.value });
}

function applySavedAssignment(assignment) {
  if (!assignment) {
    elements.assignmentId.value = "";
    elements.question.value = "";
    elements.rubric.value = "";
    setAssignmentState(false);
    return;
  }
  elements.assignmentId.value = assignment.assignment_id;
  elements.question.value = assignment.question_text;
  elements.command.value = assignment.command_word;
  elements.maxMark.value = String(assignment.max_mark);
  elements.rubric.value = assignment.mark_scheme_text;
  setAssignmentState(false);
}

async function loadAssignmentOptions() {
  elements.assignmentSelect.replaceChildren(new Option("请选择已发布作业", ""), new Option("原创 30 人合成演示作业", "__demo__"));
  if (!getAuthState().authenticated || getAuthState().account?.role !== "teacher") return;
  try {
    state.assignments = (await listAssignments()).items.filter((item) => item.status === "published");
    state.assignments.forEach((assignment) => elements.assignmentSelect.add(new Option(`${assignment.title} · V${assignment.version} · ${assignment.command_word} [${assignment.max_mark}]`, assignment.assignment_id)));
    const requested = new URL(location.href).searchParams.get("assignment");
    if (requested && state.assignments.some((item) => item.assignment_id === requested)) {
      elements.assignmentSelect.value = requested;
      applySavedAssignment(state.assignments.find((item) => item.assignment_id === requested));
    }
  } catch (error) { toast(error.message, "error"); }
}

async function initialise() {
  const initialized = await initializeAccountUI();
  state.config = initialized.config;
  const capacity = $("#batch-capacity-value");
  const capacityNote = $("#batch-capacity-note");
  const uploadLimit = $("#batch-upload-limit");
  if (capacity) capacity.textContent = `${state.config.max_batch_size} 份`;
  if (capacityNote) capacityNote.textContent = `单份 ${state.config.max_file_mb} MB；批次 ${state.config.max_batch_total_mb} MB；并发 ${state.config.batch_concurrency}；账户 ${state.config.max_account_storage_gb} GB`;
  if (uploadLimit) uploadLimit.textContent = `每份 ${state.config.max_file_mb} MB，批次合计 ${state.config.max_batch_total_mb} MB`;
  elements.question.value = DEMO_QUESTION.question_text;
  elements.command.value = DEMO_QUESTION.command_word;
  elements.maxMark.value = String(DEMO_QUESTION.max_mark);
  elements.rubric.value = DEMO_QUESTION.mark_scheme_text;
  elements.assignmentId.value = "demo-assignment";
  await loadAssignmentOptions();
  refreshProviderStatus();
  renderAll();

  elements.assignmentSelect.addEventListener("change", () => {
    if (elements.assignmentSelect.value === "__demo__") {
      elements.assignmentId.value = "demo-assignment";
      elements.question.value = DEMO_QUESTION.question_text;
      elements.command.value = DEMO_QUESTION.command_word;
      elements.maxMark.value = String(DEMO_QUESTION.max_mark);
      elements.rubric.value = DEMO_QUESTION.mark_scheme_text;
      setAssignmentState(false);
      return;
    }
    applySavedAssignment(state.assignments.find((item) => item.assignment_id === elements.assignmentSelect.value) ?? null);
  });
  elements.command.addEventListener("change", () => {
    elements.maxMark.value = elements.command.value === "Analyse" ? "6" : "8";
    setAssignmentState(false);
  });
  elements.maxMark.addEventListener("change", () => setAssignmentState(false));
  elements.confirmAssignment.addEventListener("click", () => {
    const assignment = currentAssignment();
    if (!assignment.assignment_id || !assignment.question_text || !assignment.mark_scheme_text) {
      toast("作业编号、题目和评分标准均为必填项。", "error");
      return;
    }
    if ((assignment.command_word === "Analyse" && assignment.max_mark !== 6) || (assignment.command_word === "Discuss" && assignment.max_mark !== 8)) {
      toast("当前批量版本仅支持 Analyse [6] 和 Discuss [8]。", "error");
      return;
    }
    setAssignmentState(true);
    toast("全班作业题目与评分标准已确认。 ");
  });
  elements.upload.addEventListener("change", () => handleFiles(elements.upload.files));
  elements.cameraFallbackUpload.addEventListener("change", () => handleFiles(elements.cameraFallbackUpload.files, {
    origin: "camera",
    scanSessionId: scannerSessionId ?? `SCAN-${crypto.randomUUID()}`
  }));
  elements.openCameraScanner.addEventListener("click", openCameraScanner);
  elements.cameraCapture.addEventListener("click", captureCameraScan);
  elements.cameraUndo.addEventListener("click", undoLastCameraScan);
  elements.cameraClose.addEventListener("click", closeCameraScanner);
  elements.cameraDialog.addEventListener("close", stopCameraScanner);
  elements.loadSynthetic.addEventListener("click", loadSyntheticClass);
  elements.approvalModes.forEach((input) => input.addEventListener("change", () => setApprovalMode(input.value)));
  elements.run.addEventListener("click", runBatch);
  elements.approveEligible.addEventListener("click", approveHighConfidence);
  elements.prepareFeedbackPack.addEventListener("click", () => prepareFeedbackPack());
  $("#export-batch-json").addEventListener("click", exportJson);
  $("#export-batch-csv").addEventListener("click", exportCsv);
  $("#close-feedback-pack").addEventListener("click", () => { elements.feedbackPackShell.hidden = true; });
  $("#print-feedback-pack").addEventListener("click", printFeedbackPack);
  elements.markerDialogClose.addEventListener("click", closeMarkerRemarks);
  elements.markerDialog.addEventListener("close", releaseMarkerObjectUrl);
  $("#close-detail").addEventListener("click", () => { elements.detail.hidden = true; });
  elements.detailApprove.addEventListener("click", () => applyDetailDecision({ decision: "approved" }));
  elements.detailReject.addEventListener("click", () => applyDetailDecision({ decision: "rejected", override_reason: "教师拒绝该暂定结果。" }));
  elements.detailShowAdjust.addEventListener("click", () => { elements.detailAdjustForm.hidden = !elements.detailAdjustForm.hidden; });
  elements.detailSaveAdjust.addEventListener("click", () => applyDetailDecision({
    decision: "adjusted",
    teacher_mark: Number(elements.detailAdjustMark.value),
    override_reason: elements.detailAdjustReason.value
  }));
  window.addEventListener("econmark:authchange", () => { updateRunButton(); loadAssignmentOptions(); });
}

initialise();
