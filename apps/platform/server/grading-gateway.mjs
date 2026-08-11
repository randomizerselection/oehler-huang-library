import { createHash, randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  assertBilingualParity,
  assertEvidenceLocked,
  assertGradingOutput,
  assertSupportedQuestion
} from "../src/invariants.js";
import { VERSIONS } from "../src/demo-data.js";
import { imagePromptMessages, textPromptMessages } from "./provider-client.mjs";
import { providerPlanVersion, publicProviderStatus } from "./provider-config.mjs";

const IDS = Object.freeze({
  transcription: "https://econmark.local/spec/transcription-output.schema.json",
  rubric: "https://econmark.local/spec/parsed-rubric.schema.json",
  primary: "https://econmark.local/spec/primary-score.schema.json",
  reviewer: "https://econmark.local/spec/reviewer-score.schema.json",
  adjudicator: "https://econmark.local/spec/adjudicator-output.schema.json",
  feedback: "https://econmark.local/spec/feedback-output.schema.json",
  input: "https://econmark.local/spec/grading-input.schema.json",
  output: "https://econmark.local/spec/grading-output.schema.json"
});

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export class GatewayError extends Error {
  constructor(message, { code = "GATEWAY_ERROR", status = 422, cause } = {}) {
    super(message, { cause });
    this.name = "GatewayError";
    this.code = code;
    this.status = status;
  }
}

async function loadPrompts(root) {
  const names = [
    "00-shared-guardrails.md",
    "01-image-validation.md",
    "02-transcription.md",
    "03-rubric-parser.md",
    "04-evidence-extractor.md",
    "05-primary-scorer.md",
    "06-independent-reviewer.md",
    "07-adjudicator.md",
    "09-feedback-en.md",
    "10-translation-zh.md"
  ];
  const entries = await Promise.all(names.map(async (name) => [
    name,
    await readFile(resolve(root, "prompts", name), "utf8")
  ]));
  return Object.fromEntries(entries);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function decodeDataUrl(dataUrl, mimeType) {
  const match = String(dataUrl ?? "").match(/^data:([^;,]+);base64,([A-Za-z0-9+/=\r\n]+)$/);
  if (!match || match[1] !== mimeType) {
    throw new GatewayError("The answer image must be a matching base64 data URL.", {
      code: "IMAGE_DATA_INVALID",
      status: 400
    });
  }
  return Buffer.from(match[2], "base64");
}

function normalizeRequest(payload) {
  const assignment = payload.assignment ?? payload;
  const commandWord = assignment.command_word;
  const maxMark = Number(assignment.max_mark);
  assertSupportedQuestion(commandWord, maxMark);
  if (!String(assignment.question_text ?? "").trim() || !String(assignment.mark_scheme_text ?? "").trim()) {
    throw new GatewayError("Question text and a teacher-confirmed mark scheme are required.", {
      code: "ASSIGNMENT_INCOMPLETE",
      status: 400
    });
  }
  const mimeType = String(payload.answer_mime_type ?? "");
  if (!ALLOWED_IMAGE_TYPES.has(mimeType)) {
    throw new GatewayError("Live provider marking currently accepts JPG, PNG, or WEBP. Convert a PDF to ordered images first.", {
      code: "LIVE_FILE_TYPE_UNSUPPORTED",
      status: 422
    });
  }
  const imageBytes = decodeDataUrl(payload.answer_data_url, mimeType);
  if (!imageBytes.length) throw new GatewayError("The answer image is empty.", { code: "IMAGE_EMPTY", status: 400 });

  return {
    runId: String(payload.run_id ?? `run-${randomUUID()}`),
    mode: payload.mode === "public_sample" ? "public_sample" : "account_upload",
    studentRef: String(payload.student_ref ?? "PRIVATE-SINGLE").trim().slice(0, 80) || "PRIVATE-SINGLE",
    answerName: String(payload.answer_name ?? "answer.jpg"),
    mimeType,
    imageBytes,
    imageDataUrl: payload.answer_data_url,
    confirmedTranscript: typeof payload.confirmed_transcript === "string" ? payload.confirmed_transcript.trim() : "",
    assignment: {
      assignment_id: String(assignment.assignment_id ?? "single-answer"),
      question_text: String(assignment.question_text).trim(),
      command_word: commandWord,
      max_mark: maxMark,
      mark_scheme_text: String(assignment.mark_scheme_text).trim(),
      teacher_confirmed: assignment.teacher_confirmed === true || payload.rubric_confirmed === true
    }
  };
}

function schemaInstruction(registry, id) {
  return `Return only JSON satisfying this contract:\n${JSON.stringify(registry.schema(id))}`;
}

function levelForMark(rubric, mark) {
  return rubric.levels.find((level) => mark >= level.min_mark && mark <= level.max_mark)?.level ?? null;
}

function assertScoreDetails(score, rubric, transcript, maxMark) {
  if (score.mark > maxMark) throw new Error(`mark must not exceed ${maxMark}`);
  const expectedLevel = levelForMark(rubric, score.mark);
  if (score.level !== expectedLevel) throw new Error(`level must be ${expectedLevel ?? "null"} for mark ${score.mark}`);
  assertEvidenceLocked({ evidence: score.evidence }, transcript);
  const rubricIds = new Set(rubric.criteria.map((criterion) => criterion.criterion_id));
  for (const evidence of score.evidence) {
    if (!rubricIds.has(evidence.rubric_reference)) {
      throw new Error(`unknown rubric reference ${evidence.rubric_reference}`);
    }
  }
}

export async function createGradingGateway({ root = process.cwd(), plan, registry, completeJson }) {
  const prompts = await loadPrompts(root);
  const rubricCache = new Map();

  async function completeRole(role, messages, schemaId, extraValidation = () => {}) {
    return completeJson({
      roleConfig: plan.roles[role],
      messages,
      timeoutMs: plan.timeoutMs,
      maxAttempts: plan.maxAttempts,
      validate(value) {
        registry.assert(schemaId, value);
        extraValidation(value);
      }
    });
  }

  async function transcribe(request) {
    if (request.confirmedTranscript) {
      return {
        text: request.confirmedTranscript,
        confidence: 1,
        uncertain_spans: [],
        validation_flags: [],
        usable: true,
        confirmationMethod: "teacher"
      };
    }
    const system = `${prompts["00-shared-guardrails.md"]}\n\n${prompts["01-image-validation.md"]}\n\n${prompts["02-transcription.md"]}`;
    const user = [
      "Transcribe this single handwritten Economics answer exactly.",
      "Do not correct spelling or improve the student's English.",
      "Set usable=false for blur, cropping, multiple students, unclear answer boundaries, or diagram-dependent credit.",
      schemaInstruction(registry, IDS.transcription)
    ].join("\n\n");
    const result = await completeRole(
      "transcription",
      imagePromptMessages(system, request.imageDataUrl, user),
      IDS.transcription
    );
    if (!result.usable || result.confidence < plan.autoGateMinimum || result.uncertain_spans.length || result.validation_flags.length) {
      throw new GatewayError(
        `Transcription requires teacher correction before marking (confidence ${(result.confidence * 100).toFixed(0)}%).`,
        { code: "TRANSCRIPT_REVIEW_REQUIRED", status: 422 }
      );
    }
    return { ...result, confirmationMethod: "auto_gated" };
  }

  async function parseRubric(request) {
    if (!request.assignment.teacher_confirmed) {
      throw new GatewayError("The teacher must confirm the assignment rubric before provider marking.", {
        code: "RUBRIC_UNCONFIRMED",
        status: 422
      });
    }
    const cacheKey = sha256(JSON.stringify({
      provider: plan.roles.rubric.provider,
      model: plan.roles.rubric.model,
      question: request.assignment.question_text,
      command: request.assignment.command_word,
      max: request.assignment.max_mark,
      scheme: request.assignment.mark_scheme_text
    }));
    if (!rubricCache.has(cacheKey)) {
      const system = `${prompts["00-shared-guardrails.md"]}\n\n${prompts["03-rubric-parser.md"]}`;
      const user = [
        "Parse this teacher-confirmed question and mark scheme. Do not add content from model memory.",
        JSON.stringify(request.assignment),
        schemaInstruction(registry, IDS.rubric)
      ].join("\n\n");
      const pending = completeRole("rubric", textPromptMessages(system, user), IDS.rubric, (rubric) => {
        if (rubric.command_word !== request.assignment.command_word || rubric.max_mark !== request.assignment.max_mark) {
          throw new Error("parsed command word or maximum mark does not match the teacher-confirmed assignment");
        }
      }).then((rubric) => ({ ...rubric, teacher_confirmed: true }));
      rubricCache.set(cacheKey, pending);
      pending.catch(() => rubricCache.delete(cacheKey));
    }
    return structuredClone(await rubricCache.get(cacheKey));
  }

  async function primaryScore(request, transcript, rubric) {
    const system = `${prompts["00-shared-guardrails.md"]}\n\n${prompts["04-evidence-extractor.md"]}\n\n${prompts["05-primary-scorer.md"]}`;
    const user = [
      "Mark the confirmed or safely auto-gated transcript against only this rubric.",
      JSON.stringify({
        question: request.assignment.question_text,
        max_mark: request.assignment.max_mark,
        transcript,
        rubric
      }),
      schemaInstruction(registry, IDS.primary)
    ].join("\n\n");
    return completeRole("primary", textPromptMessages(system, user), IDS.primary, (score) => {
      assertScoreDetails(score, rubric, transcript, request.assignment.max_mark);
    });
  }

  async function independentReview(request, transcript, rubric) {
    const system = `${prompts["00-shared-guardrails.md"]}\n\n${prompts["06-independent-reviewer.md"]}`;
    const user = [
      "Independently mark this response. You have not received and must not infer another scorer's result.",
      JSON.stringify({
        question: request.assignment.question_text,
        max_mark: request.assignment.max_mark,
        transcript,
        rubric
      }),
      schemaInstruction(registry, IDS.reviewer)
    ].join("\n\n");
    return completeRole("reviewer", textPromptMessages(system, user), IDS.reviewer, (review) => {
      if (review.mark > request.assignment.max_mark) throw new Error(`mark must not exceed ${request.assignment.max_mark}`);
      const expectedLevel = levelForMark(rubric, review.mark);
      if (review.level !== expectedLevel) throw new Error(`level must be ${expectedLevel ?? "null"} for mark ${review.mark}`);
    });
  }

  async function adjudicate(request, transcript, rubric, primary, reviewer) {
    const system = `${prompts["00-shared-guardrails.md"]}\n\n${prompts["07-adjudicator.md"]}`;
    const user = [
      "Adjudicate this one-mark disagreement using the transcript, rubric, primary evidence table, and the two marks.",
      JSON.stringify({ transcript, rubric, primary, reviewer }),
      schemaInstruction(registry, IDS.adjudicator)
    ].join("\n\n");
    return completeRole("adjudicator", textPromptMessages(system, user), IDS.adjudicator, (result) => {
      if (![primary.mark, reviewer.mark].includes(result.mark)) throw new Error("adjudicated mark must choose one of the two proposed marks");
      const expectedLevel = levelForMark(rubric, result.mark);
      if (result.level !== expectedLevel) throw new Error(`level must be ${expectedLevel ?? "null"} for mark ${result.mark}`);
    });
  }

  async function createFeedback(request, transcript, rubric, primary, provisionalMark) {
    const system = `${prompts["00-shared-guardrails.md"]}\n\n${prompts["09-feedback-en.md"]}\n\n${prompts["10-translation-zh.md"]}`;
    const user = [
      "Generate concise bilingual feedback only after the mark has been fixed.",
      "Create one or two short questions on this essay topic that directly practice the student's identified weaknesses.",
      "English and Chinese priority IDs, question IDs, target priority IDs, and order must match exactly.",
      JSON.stringify({
        question: request.assignment.question_text,
        transcript,
        rubric,
        evidence: primary.evidence,
        missed_opportunities: primary.missed_opportunities,
        provisional_mark: provisionalMark,
        max_mark: request.assignment.max_mark
      }),
      schemaInstruction(registry, IDS.feedback)
    ].join("\n\n");
    return completeRole("feedback", textPromptMessages(system, user), IDS.feedback, (feedback) => {
      assertBilingualParity(feedback);
    });
  }

  return Object.freeze({
    status() {
      return publicProviderStatus(plan);
    },
    async grade(payload) {
      const request = normalizeRequest(payload);
      const transcription = await transcribe(request);
      const rubric = await parseRubric(request);
      const [primary, reviewer] = await Promise.all([
        primaryScore(request, transcription.text, rubric),
        independentReview(request, transcription.text, rubric)
      ]);
      const difference = Math.abs(primary.mark - reviewer.mark);
      const adjudication = difference === 1
        ? await adjudicate(request, transcription.text, rubric, primary, reviewer)
        : null;
      const provisionalMark = difference >= 2
        ? Math.min(primary.mark, reviewer.mark)
        : adjudication?.mark ?? primary.mark;
      const level = levelForMark(rubric, provisionalMark);
      const feedback = await createFeedback(request, transcription.text, rubric, primary, provisionalMark);
      const manualReviewRequired = difference >= 2;
      const confidence = manualReviewRequired
        ? "low"
        : difference === 1 || transcription.confidence < 0.99 || reviewer.confidence !== "high"
          ? "medium"
          : "high";
      const now = new Date().toISOString();
      const input = {
        run_id: request.runId,
        mode: request.mode,
        student_ref: request.studentRef,
        question_text: request.assignment.question_text,
        command_word: request.assignment.command_word,
        max_mark: request.assignment.max_mark,
        mark_scheme_text: request.assignment.mark_scheme_text,
        mark_scheme_sha256: sha256(request.assignment.mark_scheme_text),
        answer_images: [{
          image_id: `img-${request.runId}-1`,
          name: request.answerName,
          mime_type: request.mimeType,
          page: 1,
          sha256: sha256(request.imageBytes),
          validation_flags: transcription.validation_flags
        }],
        confirmed_transcript: {
          text: transcription.text,
          version: 1,
          teacher_confirmed: transcription.confirmationMethod === "teacher",
          confirmation_method: transcription.confirmationMethod,
          transcription_confidence: transcription.confidence,
          confirmed_at: now,
          uncertain_spans: transcription.uncertain_spans.map(({ text, page, line }) => ({ text, page, line }))
        },
        language: "en_zh",
        schema_version: VERSIONS.schema_version
      };
      const output = {
        run_id: request.runId,
        provisional_mark: provisionalMark,
        max_mark: request.assignment.max_mark,
        level,
        confidence,
        confidence_reasons: [
          `Transcription ${transcription.confirmationMethod === "teacher" ? "confirmed by the teacher" : "passed the automatic gate"} at ${(transcription.confidence * 100).toFixed(0)}% confidence.`,
          difference === 0
            ? "Primary and independent scorers agree."
            : difference === 1
              ? `The one-mark scorer difference was adjudicated: ${adjudication.reason}`
              : `Scorers differ by ${difference} marks; teacher review is mandatory.`,
          ...primary.confidence_reasons,
          ...reviewer.concerns.map((concern) => `Reviewer: ${concern}`)
        ],
        evidence: primary.evidence,
        missed_opportunities: primary.missed_opportunities,
        ...feedback,
        manual_review_required: manualReviewRequired,
        scorer_marks: {
          primary: primary.mark,
          reviewer: reviewer.mark,
          adjudicated: adjudication?.mark ?? null
        },
        provider_trace: Object.fromEntries(Object.entries(plan.roles).map(([role, item]) => [role, {
          provider: item.provider,
          model: item.model
        }])),
        schema_version: VERSIONS.schema_version,
        workflow_version: VERSIONS.workflow_version,
        prompt_version: VERSIONS.prompt_version,
        model_version: providerPlanVersion(plan),
        final_mark: null
      };

      registry.assert(IDS.input, input);
      registry.assert(IDS.rubric, rubric);
      registry.assert(IDS.output, output);
      assertGradingOutput(output, transcription.text);
      return { input, rubric, output };
    }
  });
}
