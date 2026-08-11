export function exactAgreement(cases) {
  if (!cases.length) return 0;
  return cases.filter((item) => item.teacher_mark === item.agent_mark).length / cases.length;
}

export function withinOneAgreement(cases) {
  if (!cases.length) return 0;
  return cases.filter((item) => Math.abs(item.teacher_mark - item.agent_mark) <= 1).length / cases.length;
}

export function timeReduction(cases) {
  const manual = cases.reduce((sum, item) => sum + Number(item.manual_seconds ?? 0), 0);
  const assisted = cases.reduce((sum, item) => sum + Number(item.assisted_seconds ?? 0), 0);
  return manual > 0 ? (manual - assisted) / manual : 0;
}

export function mean(values) {
  return values.length ? values.reduce((sum, value) => sum + Number(value), 0) / values.length : 0;
}

export function weightedCohenKappa(cases, maxMark = 8) {
  if (!cases.length) return 0;
  const size = maxMark + 1;
  const matrix = Array.from({ length: size }, () => Array(size).fill(0));
  const teacherCounts = Array(size).fill(0);
  const agentCounts = Array(size).fill(0);

  for (const item of cases) {
    const teacher = Number(item.teacher_mark);
    const agent = Number(item.agent_mark);
    if (!Number.isInteger(teacher) || !Number.isInteger(agent) || teacher < 0 || agent < 0 || teacher > maxMark || agent > maxMark) {
      throw new Error(`Marks must be integers from 0 to ${maxMark}.`);
    }
    matrix[teacher][agent] += 1;
    teacherCounts[teacher] += 1;
    agentCounts[agent] += 1;
  }

  let observedWeightedDisagreement = 0;
  let expectedWeightedDisagreement = 0;
  const denominator = maxMark ** 2 || 1;
  const count = cases.length;

  for (let teacher = 0; teacher < size; teacher += 1) {
    for (let agent = 0; agent < size; agent += 1) {
      const weight = ((teacher - agent) ** 2) / denominator;
      observedWeightedDisagreement += weight * (matrix[teacher][agent] / count);
      expectedWeightedDisagreement += weight * ((teacherCounts[teacher] * agentCounts[agent]) / (count ** 2));
    }
  }

  if (expectedWeightedDisagreement === 0) return observedWeightedDisagreement === 0 ? 1 : 0;
  return 1 - (observedWeightedDisagreement / expectedWeightedDisagreement);
}

export function wordErrorRate(reference, hypothesis) {
  const ref = String(reference).trim().split(/\s+/).filter(Boolean);
  const hyp = String(hypothesis).trim().split(/\s+/).filter(Boolean);
  if (!ref.length) return hyp.length ? 1 : 0;
  const grid = Array.from({ length: ref.length + 1 }, () => Array(hyp.length + 1).fill(0));
  for (let i = 0; i <= ref.length; i += 1) grid[i][0] = i;
  for (let j = 0; j <= hyp.length; j += 1) grid[0][j] = j;
  for (let i = 1; i <= ref.length; i += 1) {
    for (let j = 1; j <= hyp.length; j += 1) {
      grid[i][j] = Math.min(
        grid[i - 1][j] + 1,
        grid[i][j - 1] + 1,
        grid[i - 1][j - 1] + (ref[i - 1] === hyp[j - 1] ? 0 : 1)
      );
    }
  }
  return grid[ref.length][hyp.length] / ref.length;
}

export function calculateMetrics(cases) {
  const rated = cases.flatMap((item) => Object.values(item.feedback_ratings ?? {}));
  const transcriptionCases = cases.filter((item) => item.reference_transcript != null && item.agent_transcript != null);
  const overallWer = transcriptionCases.length
    ? mean(transcriptionCases.map((item) => wordErrorRate(item.reference_transcript, item.agent_transcript)))
    : null;
  return {
    case_count: cases.length,
    exact_agreement: exactAgreement(cases),
    within_one_agreement: withinOneAgreement(cases),
    weighted_kappa: weightedCohenKappa(cases),
    time_reduction: timeReduction(cases),
    feedback_rating_average: rated.length ? mean(rated) : null,
    transcription_word_accuracy: overallWer == null ? null : 1 - overallWer
  };
}

export function releaseGateStatus(metrics) {
  return {
    exact_agreement: metrics.exact_agreement >= 0.75,
    within_one_agreement: metrics.within_one_agreement >= 0.95,
    weighted_kappa: metrics.weighted_kappa >= 0.8,
    time_reduction: metrics.time_reduction >= 0.5,
    feedback_quality: metrics.feedback_rating_average == null ? null : metrics.feedback_rating_average >= 4.5,
    transcription_accuracy: metrics.transcription_word_accuracy == null ? null : metrics.transcription_word_accuracy >= 0.95
  };
}
