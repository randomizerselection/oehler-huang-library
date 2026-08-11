import test from "node:test";
import assert from "node:assert/strict";
import { calculateMetrics, releaseGateStatus, weightedCohenKappa, wordErrorRate } from "../src/metrics.js";

test("weighted kappa is one for perfect agreement", () => {
  assert.equal(weightedCohenKappa([{ teacher_mark: 1, agent_mark: 1 }, { teacher_mark: 5, agent_mark: 5 }]), 1);
});

test("word error rate uses token-level edit distance", () => {
  assert.equal(wordErrorRate("aggregate demand falls", "aggregate demand falls"), 0);
  assert.equal(wordErrorRate("aggregate demand falls", "aggregate supply falls"), 1 / 3);
});

test("metric calculation and release gates are explicit", () => {
  const cases = [
    { teacher_mark: 2, agent_mark: 2, manual_seconds: 100, assisted_seconds: 40, feedback_ratings: { accuracy: 5 }, reference_transcript: "a b c", agent_transcript: "a b c" },
    { teacher_mark: 6, agent_mark: 5, manual_seconds: 100, assisted_seconds: 40, feedback_ratings: { accuracy: 4 }, reference_transcript: "d e f", agent_transcript: "d e f" }
  ];
  const metrics = calculateMetrics(cases);
  assert.equal(metrics.exact_agreement, 0.5);
  assert.equal(metrics.within_one_agreement, 1);
  assert.equal(metrics.time_reduction, 0.6);
  assert.equal(metrics.feedback_rating_average, 4.5);
  assert.equal(metrics.transcription_word_accuracy, 1);
  const gates = releaseGateStatus(metrics);
  assert.equal(gates.exact_agreement, false);
  assert.equal(gates.within_one_agreement, true);
});
