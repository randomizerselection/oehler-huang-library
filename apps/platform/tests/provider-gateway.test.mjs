import test from "node:test";
import assert from "node:assert/strict";
import { createGradingGateway } from "../server/grading-gateway.mjs";
import { createProviderClient } from "../server/provider-client.mjs";
import { publicProviderStatus, resolveProviderPlan } from "../server/provider-config.mjs";
import { createSchemaRegistry } from "../server/schema-registry.mjs";
import { DEMO_RUBRIC, DEMO_SAMPLES } from "../src/demo-data.js";
import { runDemoWorkflow } from "../src/workflow.js";

test("provider plan supports per-role routing without exposing keys", () => {
  const plan = resolveProviderPlan({
    DASHSCOPE_API_KEY: "qwen-secret",
    DEEPSEEK_API_KEY: "deepseek-secret",
    ECONMARK_REVIEWER_PROVIDER: "deepseek"
  });
  assert.equal(plan.roles.transcription.provider, "qwen");
  assert.equal(plan.roles.reviewer.provider, "deepseek");
  const status = publicProviderStatus(plan);
  assert.equal(status.ready, true);
  assert.equal(status.cross_provider_review, true);
  assert.equal(JSON.stringify(status).includes("secret"), false);
});

test("text-only DeepSeek cannot be selected for transcription", () => {
  assert.throws(
    () => resolveProviderPlan({ ECONMARK_TRANSCRIPTION_PROVIDER: "deepseek" }),
    /text-only/
  );
});

test("provider configuration cannot weaken the OCR auto-gate", () => {
  assert.equal(resolveProviderPlan({ ECONMARK_OCR_AUTO_GATE_MIN: "0.20" }).autoGateMinimum, 0.97);
  assert.equal(resolveProviderPlan({ ECONMARK_OCR_AUTO_GATE_MIN: "0.995" }).autoGateMinimum, 0.995);
  assert.equal(resolveProviderPlan({ ECONMARK_OCR_AUTO_GATE_MIN: "invalid" }).autoGateMinimum, 0.97);
});

test("provider client retries contract-invalid JSON once", async () => {
  let calls = 0;
  const client = createProviderClient({
    fetchImpl: async (_url, options) => {
      calls += 1;
      const request = JSON.parse(options.body);
      assert.equal(request.model, "test-model");
      assert.equal(request.response_format.type, "json_object");
      return new Response(JSON.stringify({
        choices: [{ message: { content: calls === 1 ? "{\"ok\":false}" : "{\"ok\":true}" } }]
      }), { status: 200, headers: { "content-type": "application/json" } });
    }
  });
  const result = await client({
    roleConfig: {
      role: "primary",
      providerLabel: "Test",
      model: "test-model",
      apiKey: "test-key",
      apiKeyEnv: "TEST_KEY",
      baseUrl: "https://provider.invalid/chat"
    },
    messages: [{ role: "user", content: "Return JSON" }],
    maxAttempts: 2,
    validate(value) {
      if (value.ok !== true) throw new Error("ok must be true");
    }
  });
  assert.deepEqual(result, { ok: true });
  assert.equal(calls, 2);
});

test("provider-neutral gateway assembles a schema-valid auto-gated result", async () => {
  const registry = await createSchemaRegistry();
  const plan = resolveProviderPlan({ DASHSCOPE_API_KEY: "test-key" });
  const sample = DEMO_SAMPLES[1];
  const demo = runDemoWorkflow({ sample, transcript: sample.transcript, mode: "account_upload" });
  const calls = [];
  const gateway = await createGradingGateway({
    plan,
    registry,
    completeJson: async ({ roleConfig, validate }) => {
      calls.push(roleConfig.role);
      const responses = {
        transcription: {
          text: sample.transcript,
          confidence: 0.99,
          uncertain_spans: [],
          validation_flags: [],
          usable: true
        },
        rubric: { ...structuredClone(DEMO_RUBRIC), teacher_confirmed: true },
        primary: {
          mark: 5,
          level: "L2",
          evidence: structuredClone(sample.evidence_templates),
          missed_opportunities: demo.output.missed_opportunities,
          confidence_reasons: ["Evidence is locked to exact transcript quotations."]
        },
        reviewer: { mark: 5, level: "L2", concerns: [], confidence: "high" },
        feedback: {
          feedback_en: demo.output.feedback_en,
          feedback_zh: demo.output.feedback_zh,
          improved_outline_en: demo.output.improved_outline_en,
          improved_outline_zh: demo.output.improved_outline_zh,
          follow_up_questions_en: demo.output.follow_up_questions_en,
          follow_up_questions_zh: demo.output.follow_up_questions_zh
        }
      };
      const value = structuredClone(responses[roleConfig.role]);
      validate(value);
      return value;
    }
  });
  const payload = {
    run_id: "live-test-1",
    mode: "account_upload",
    student_ref: "S01",
    answer_name: "S01.png",
    answer_mime_type: "image/png",
    answer_data_url: "data:image/png;base64,AA==",
    assignment: {
      assignment_id: "WH-TEST",
      question_text: "Discuss whether an increase in interest rates is likely to reduce inflation. [8]",
      command_word: "Discuss",
      max_mark: 8,
      mark_scheme_text: "Teacher-confirmed demonstration mark scheme.",
      teacher_confirmed: true
    }
  };
  const result = await gateway.grade(payload);
  assert.equal(result.output.provisional_mark, 5);
  assert.equal(result.output.final_mark, null);
  assert.equal(result.input.confirmed_transcript.confirmation_method, "auto_gated");
  assert.equal(result.input.confirmed_transcript.teacher_confirmed, false);
  assert.equal(result.output.provider_trace.primary.provider, "qwen");
  assert.deepEqual(calls.sort(), ["feedback", "primary", "reviewer", "rubric", "transcription"].sort());

  await gateway.grade({ ...payload, run_id: "live-test-2" });
  assert.equal(calls.filter((role) => role === "rubric").length, 1, "rubric should be cached per frozen assignment");
});
