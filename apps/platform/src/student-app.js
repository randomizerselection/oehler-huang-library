import {
  authFetch,
  ensureAuthenticated,
  getAuthState,
  getPublicConfig,
  initializeAccountUI,
  listStoredRuns,
  loadStoredRun
} from "./auth.js";
import { getDemoSample } from "./demo-data.js";
import { runDemoWorkflow } from "./workflow.js";
import { resolveAssignmentCode } from "./assignments.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const elements = {
  alert: $("#student-alert"),
  codeForm: $("#student-code-form"),
  code: $("#student-assignment-code"),
  assignmentCard: $("#student-assignment-card"),
  uploadCard: $("#student-upload-card"),
  assignmentTitle: $("#student-assignment-title"),
  question: $("#student-question"),
  command: $("#student-command"),
  maxMark: $("#student-max-mark"),
  instructions: $("#student-instructions"),
  ref: $("#student-ref"),
  upload: $("#student-answer-upload"),
  uploadZone: $("#student-upload-zone"),
  uploadTitle: $("#student-upload-title"),
  uploadLimit: $("#student-upload-limit"),
  preview: $("#student-preview"),
  previewImage: $("#student-preview-image"),
  fileName: $("#student-file-name"),
  fileMeta: $("#student-file-meta"),
  removeFile: $("#student-remove-file"),
  consent: $("#student-consent"),
  submit: $("#student-submit"),
  demo: $("#student-demo"),
  resultPanel: $("#student-result-panel"),
  emptyResult: $("#student-empty-result"),
  processing: $("#student-processing"),
  processingTitle: $("#student-processing-title"),
  result: $("#student-result"),
  resultStatus: $("#student-result-status"),
  confidence: $("#student-confidence"),
  score: $("#student-score-value"),
  scoreMax: $("#student-score-max"),
  level: $("#student-level"),
  reviewWarning: $("#student-review-warning"),
  strengths: $("#student-strengths"),
  priorities: $("#student-priorities"),
  followUps: $("#student-follow-ups"),
  evidence: $("#student-evidence"),
  markScheme: $("#student-mark-scheme"),
  markSchemeDetails: $("#student-mark-scheme-details"),
  startAgain: $("#student-start-again"),
  historySection: $("#student-history-section"),
  historyList: $("#student-history-list"),
  quizHistorySection: $("#student-quiz-history-section"),
  quizHistoryList: $("#student-quiz-history-list"),
  toast: $("#student-toast")
};

const state = {
  assignment: null,
  file: null,
  dataUrl: null,
  objectUrl: null,
  processingTimer: null,
  record: null
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
  toast.timer = setTimeout(() => { elements.toast.className = "toast"; }, 4500);
}

function showAlert(message, type = "info") {
  elements.alert.textContent = message;
  elements.alert.className = `student-alert show ${type}`;
}

function updateStepper(step) {
  $$(".student-step").forEach((item, index) => {
    item.classList.toggle("active", index + 1 === step);
    item.classList.toggle("complete", index + 1 < step);
  });
}

function updateSubmitState() {
  elements.submit.disabled = !(state.assignment && state.file && elements.consent.checked);
  updateStepper(state.record ? 3 : state.file ? 2 : 1);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function clearSelectedFile() {
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
  state.file = null;
  state.dataUrl = null;
  state.objectUrl = null;
  elements.upload.value = "";
  elements.preview.hidden = true;
  elements.uploadZone.hidden = false;
  updateSubmitState();
}

async function selectFile(file) {
  if (!file) return;
  const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
  if (!allowed.has(file.type)) {
    toast("请选择 JPG、PNG 或 WEBP 图片。", "error");
    return;
  }
  const maximumMb = getPublicConfig().max_file_mb;
  if (file.size > maximumMb * 1024 * 1024) {
    toast(`图片超过服务器 ${maximumMb} MB 的上限。`, "error");
    return;
  }
  clearSelectedFile();
  state.file = file;
  state.dataUrl = await fileToDataUrl(file);
  state.objectUrl = URL.createObjectURL(file);
  elements.previewImage.src = state.objectUrl;
  elements.fileName.textContent = file.name;
  elements.fileMeta.textContent = `${file.type.replace("image/", "").toUpperCase()} · ${(file.size / 1024).toFixed(0)} KB`;
  elements.preview.hidden = false;
  elements.uploadZone.hidden = true;
  updateSubmitState();
}

function fillList(element, items, fallback) {
  element.replaceChildren();
  const safeItems = Array.isArray(items) && items.length ? items : [fallback];
  safeItems.forEach((item) => element.append(node("li", "", typeof item === "string" ? item : item?.text ?? String(item))));
}

function renderEvidence(items = []) {
  elements.evidence.replaceChildren();
  const credited = items.filter((item) => item.credit_status !== "not_credited");
  if (!credited.length) {
    elements.evidence.append(node("p", "student-evidence-empty", "这份作答暂未找到可稳定计分的原文证据。"));
    return;
  }
  credited.forEach((item) => {
    const article = node("article", "student-evidence-item");
    article.append(node("blockquote", "", `“${item.transcript_quote}”`));
    article.append(node("p", "", item.economic_reason));
    article.append(node("span", "", `+${item.mark_value}`));
    elements.evidence.append(article);
  });
}

function renderResult(record, { demo = false } = {}) {
  state.record = record;
  const output = record.output;
  const feedback = output.feedback_zh ?? output.feedback_en ?? {};
  const isFinal = Number.isInteger(output.final_mark);
  const shownMark = isFinal ? output.final_mark : output.provisional_mark;
  elements.emptyResult.hidden = true;
  elements.processing.hidden = true;
  elements.result.hidden = false;
  elements.resultStatus.textContent = isFinal ? "老师已确认" : "暂定成绩";
  elements.score.textContent = shownMark ?? "—";
  elements.scoreMax.textContent = `/ ${output.max_mark}`;
  elements.level.textContent = `${output.level ?? "按评分点计分"} · ${isFinal ? "Final after teacher review" : "Provisional — not a final grade"}`;
  elements.confidence.textContent = ({ high: "高置信度", medium: "中置信度", low: "需复核" })[output.confidence] ?? "待确认";
  elements.confidence.className = `student-confidence ${output.confidence ?? "low"}`;
  elements.reviewWarning.hidden = !output.manual_review_required;
  elements.reviewWarning.textContent = output.manual_review_required
    ? "两次评分差异较大，这个分数需要老师人工复核。请先关注下面的改进建议，不要把它当作正式成绩。"
    : "";
  fillList(elements.strengths, feedback.strengths, "系统暂未生成优点摘要，请查看得分证据。");
  fillList(elements.priorities, feedback.priorities, "回到评分标准，补充一条完整的因果链。 ");
  fillList(elements.followUps, output.follow_up_questions_zh ?? output.follow_up_questions_en, "怎样把你的结论与前面的分析更紧密地连接起来？");
  renderEvidence(output.evidence);
  elements.markScheme.textContent = record.input?.mark_scheme_text ?? "合成示例使用原创演示评分标准。";
  elements.markSchemeDetails.hidden = false;
  updateStepper(3);
  elements.resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  toast(demo ? "已载入合成示例。真实作答需要登录后上传。" : "暂定成绩已生成，并已保存到你的账户。" );
}

function startProcessing() {
  const stages = ["检查图片与手写内容……", "将原文与评分标准逐项核对……", "进行第二次独立评分……", "整理你的双语改进建议……"];
  let index = 0;
  elements.emptyResult.hidden = true;
  elements.result.hidden = true;
  elements.processing.hidden = false;
  elements.processingTitle.textContent = stages[0];
  clearInterval(state.processingTimer);
  state.processingTimer = setInterval(() => {
    index = Math.min(index + 1, stages.length - 1);
    elements.processingTitle.textContent = stages[index];
  }, 3200);
}

function stopProcessing() {
  clearInterval(state.processingTimer);
  state.processingTimer = null;
}

function friendlyError(error) {
  const messages = {
    AUTH_REQUIRED: "请先登录或创建学生账户，再提交真实作答。",
    TRANSCRIPT_REVIEW_REQUIRED: "系统无法可靠读出这张作答。请在明亮环境下重新拍摄，确保整页清晰、完整且只有一份作答。",
    STUDENT_ASSIGNMENT_NOT_FOUND: "这项作业已关闭或暂时不可用，请向老师确认。",
    FILE_TOO_LARGE: "图片太大，请降低照片分辨率后重试。",
    GRADING_RATE_LIMITED: "你今天提交得太频繁了，请稍后再试。",
    PROVIDER_NOT_CONFIGURED: "自动评分服务尚未配置，请联系老师。"
  };
  return messages[error.code] ?? error.message ?? "暂时无法完成评分，请稍后重试。";
}

async function parseResponse(response) {
  let value;
  try { value = await response.json(); } catch { value = {}; }
  if (!response.ok) {
    const error = new Error(value.message ?? `Request failed with ${response.status}.`);
    error.code = value.error_code ?? "REQUEST_FAILED";
    throw error;
  }
  return value;
}

async function submitAnswer() {
  if (!state.file || !state.assignment || !elements.consent.checked) return;
  if (!ensureAuthenticated()) return;
  if (getAuthState().account?.role !== "student") {
    const message = "真实自评提交需要学生账户。教师可在教师工作台测试合成样例。";
    showAlert(message, "error"); toast(message, "error"); return;
  }
  startProcessing();
  elements.submit.disabled = true;
  showAlert("作答正在安全处理。评分完成前请保持此页面打开。", "info");
  try {
    const response = await authFetch("/api/student/grade", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        run_id: `student-${crypto.randomUUID()}`,
        assignment_code: state.assignment.share_code,
        student_ref: elements.ref.value.trim(),
        answer_name: state.file.name,
        answer_mime_type: state.file.type,
        answer_data_url: state.dataUrl
      })
    });
    const record = await parseResponse(response);
    renderResult(record);
    showAlert("评分已完成。请记住：这个结果在老师复核前始终是暂定成绩。", "success");
    await renderHistory();
  } catch (error) {
    elements.processing.hidden = true;
    elements.emptyResult.hidden = false;
    const message = friendlyError(error);
    showAlert(message, "error");
    toast(message, "error");
  } finally {
    stopProcessing();
    updateSubmitState();
  }
}

function showDemo() {
  const sample = getDemoSample("middle");
  const workflow = runDemoWorkflow({ sample, transcript: sample.transcript, rubricConfirmed: true, mode: "public_sample" });
  renderResult({ ...workflow, created_at: new Date().toISOString() }, { demo: true });
  showAlert("当前显示的是合成示例，不是你的作答。上传真实作答需要先登录。", "info");
}

function resetSubmission() {
  clearSelectedFile();
  state.record = null;
  elements.consent.checked = false;
  elements.emptyResult.hidden = false;
  elements.processing.hidden = true;
  elements.result.hidden = true;
  elements.alert.className = "student-alert";
  updateStepper(1);
  $(".upload-card").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function resolveCode(code, { quiet = false } = {}) {
  const normalized = String(code ?? "").trim().toUpperCase();
  if (!normalized) { if (!quiet) showAlert("请输入老师分享的 8 位作业代码。", "error"); return; }
  try {
    state.assignment = await resolveAssignmentCode(normalized);
  } catch (error) {
    state.assignment = null; elements.assignmentCard.hidden = true; elements.uploadCard.hidden = true; updateSubmitState();
    if (!quiet) showAlert(friendlyError(error), "error");
    return;
  }
  elements.code.value = state.assignment.share_code;
  elements.assignmentTitle.textContent = state.assignment.title;
  elements.question.textContent = state.assignment.question_text;
  elements.command.textContent = state.assignment.command_word;
  elements.maxMark.textContent = `${state.assignment.max_mark} 分`;
  elements.instructions.textContent = state.assignment.student_instructions || "请上传一张清晰、完整且只包含本题作答的照片。";
  elements.assignmentCard.hidden = false;
  elements.uploadCard.hidden = false;
  showAlert(`已打开作业“${state.assignment.title}”。评分标准将在你提交后显示。`, "success");
  updateSubmitState();
}

async function renderHistory() {
  const authenticated = getAuthState().authenticated;
  elements.historySection.hidden = !authenticated;
  elements.historyList.replaceChildren();
  if (!authenticated) return;
  try {
    const records = (await listStoredRuns({ limit: 50 })).items;
    if (!records.length) {
      elements.historyList.append(node("p", "student-history-empty", "你还没有保存的提交记录。"));
      return;
    }
    records.forEach((record) => {
      const button = node("button", "student-history-item");
      button.type = "button";
      const mark = Number.isInteger(record.final_mark) ? record.final_mark : "暂定";
      button.append(node("strong", "", `${record.student_ref} · ${mark}/${record.max_mark}`));
      button.append(node("span", "", `${new Date(record.created_at).toLocaleString("zh-CN")} · ${record.confidence === "low" ? "需要复核" : "查看反馈"}`));
      button.addEventListener("click", async () => {
        try {
          renderResult(await loadStoredRun(record.run_id));
        } catch (error) {
          toast(friendlyError(error), "error");
        }
      });
      elements.historyList.append(button);
    });
  } catch (error) {
    elements.historyList.append(node("p", "student-history-empty", friendlyError(error)));
  }
}

async function renderQuizHistory() {
  const account = getAuthState().account;
  const selected = new URLSearchParams(location.search).get('tab') === 'quizzes';
  elements.quizHistorySection.hidden = !selected || account?.role !== 'student';
  elements.quizHistoryList.replaceChildren();
  if (!selected || account?.role !== 'student') return;
  try {
    const response = await authFetch('/api/quiz-attempts/me?limit=100');
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || '测验记录加载失败。');
    if (!payload.items.length) { elements.quizHistoryList.append(node('p', 'student-history-empty', '你还没有保存的课程测验。')); return; }
    for (const item of payload.items) {
      const article = node('article', 'student-history-item');
      article.append(node('strong', '', `${item.lesson_title || item.lesson_id} · ${item.score}/${item.max_score} (${item.percentage}%)`));
      article.append(node('span', '', `${new Date(item.created_at).toLocaleString('zh-CN')} · ${item.class_name} · v${item.quiz_version}`));
      elements.quizHistoryList.append(article);
    }
  } catch (error) { elements.quizHistoryList.append(node('p', 'student-history-empty', friendlyError(error))); }
}

async function initialise() {
  await initializeAccountUI();
  if (new URLSearchParams(location.search).get('tab') === 'quizzes' && getAuthState().account?.role !== 'student') {
    await window.PlatformAuth?.requireRole?.('student', { context: 'quiz-history', message: '学生账户可查看自己的课程测验记录。' });
  }
  elements.uploadLimit.textContent = `支持 JPG、PNG、WEBP · 最大 ${getPublicConfig().max_file_mb} MB`;
  const codeFromUrl = new URL(location.href).searchParams.get("code");
  if (codeFromUrl) await resolveCode(codeFromUrl);
  await renderHistory();
  await renderQuizHistory();

  elements.codeForm.addEventListener("submit", (event) => { event.preventDefault(); resolveCode(elements.code.value); });

  elements.upload.addEventListener("change", () => selectFile(elements.upload.files?.[0]));
  elements.uploadZone.addEventListener("dragover", (event) => { event.preventDefault(); elements.uploadZone.classList.add("drag"); });
  elements.uploadZone.addEventListener("dragleave", () => elements.uploadZone.classList.remove("drag"));
  elements.uploadZone.addEventListener("drop", (event) => {
    event.preventDefault();
    elements.uploadZone.classList.remove("drag");
    selectFile(event.dataTransfer.files?.[0]);
  });
  elements.removeFile.addEventListener("click", clearSelectedFile);
  elements.consent.addEventListener("change", updateSubmitState);
  elements.submit.addEventListener("click", submitAnswer);
  elements.demo.addEventListener("click", showDemo);
  elements.startAgain.addEventListener("click", resetSubmission);
  window.addEventListener("econmark:authchange", () => { renderHistory(); renderQuizHistory(); });
}

initialise().catch((error) => showAlert(friendlyError(error), "error"));
