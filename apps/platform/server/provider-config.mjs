const ROLE_NAMES = Object.freeze([
  "transcription",
  "rubric",
  "primary",
  "reviewer",
  "adjudicator",
  "feedback"
]);

const PROVIDERS = Object.freeze({
  qwen: Object.freeze({
    label: "Alibaba Cloud Qwen",
    apiKeyEnv: "DASHSCOPE_API_KEY",
    baseUrlEnv: "QWEN_BASE_URL",
    defaultBaseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    supportsVision: true,
    models: Object.freeze({
      transcription: "qwen3-vl-plus",
      rubric: "qwen3.7-max-2026-05-20",
      primary: "qwen3.7-max-2026-05-20",
      reviewer: "qwen3.7-max-2026-05-20",
      adjudicator: "qwen3.7-max-2026-05-20",
      feedback: "qwen-flash"
    })
  }),
  kimi: Object.freeze({
    label: "Moonshot Kimi",
    apiKeyEnv: "MOONSHOT_API_KEY",
    baseUrlEnv: "KIMI_BASE_URL",
    defaultBaseUrl: "https://api.moonshot.cn/v1/chat/completions",
    supportsVision: true,
    models: Object.freeze({
      transcription: "kimi-k2.6",
      rubric: "kimi-k2.6",
      primary: "kimi-k2.6",
      reviewer: "kimi-k2.6",
      adjudicator: "kimi-k2.6",
      feedback: "kimi-k2.6"
    })
  }),
  deepseek: Object.freeze({
    label: "DeepSeek",
    apiKeyEnv: "DEEPSEEK_API_KEY",
    baseUrlEnv: "DEEPSEEK_BASE_URL",
    defaultBaseUrl: "https://api.deepseek.com/chat/completions",
    supportsVision: false,
    models: Object.freeze({
      transcription: null,
      rubric: "deepseek-v4-pro",
      primary: "deepseek-v4-pro",
      reviewer: "deepseek-v4-pro",
      adjudicator: "deepseek-v4-pro",
      feedback: "deepseek-v4-flash"
    })
  })
});

function normalizeProvider(value, role) {
  const provider = String(value ?? "qwen").trim().toLowerCase();
  if (!(provider in PROVIDERS)) {
    throw new Error(`Unsupported ${role} provider: ${provider}. Use qwen, kimi, or deepseek.`);
  }
  return provider;
}

function roleEnvironmentName(role, suffix) {
  return `ECONMARK_${role.toUpperCase()}_${suffix}`;
}

function boundedNumber(value, fallback, minimum, maximum) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(minimum, Math.min(maximum, parsed));
}

export function resolveProviderPlan(env = process.env) {
  const defaultProvider = normalizeProvider(env.ECONMARK_DEFAULT_PROVIDER ?? "qwen", "default");
  const roles = {};

  for (const role of ROLE_NAMES) {
    const provider = normalizeProvider(env[roleEnvironmentName(role, "PROVIDER")] ?? defaultProvider, role);
    const definition = PROVIDERS[provider];
    if (role === "transcription" && !definition.supportsVision) {
      throw new Error(`${definition.label} is text-only and cannot be the transcription provider.`);
    }
    const model = String(env[roleEnvironmentName(role, "MODEL")] ?? definition.models[role] ?? "").trim();
    if (!model) throw new Error(`${definition.label} cannot perform the ${role} role without an explicit model override.`);
    roles[role] = Object.freeze({
      role,
      provider,
      providerLabel: definition.label,
      model,
      apiKey: env[definition.apiKeyEnv] ?? "",
      apiKeyEnv: definition.apiKeyEnv,
      baseUrl: env[definition.baseUrlEnv] ?? definition.defaultBaseUrl,
      supportsVision: definition.supportsVision
    });
  }

  return Object.freeze({
    roles: Object.freeze(roles),
    timeoutMs: boundedNumber(env.ECONMARK_PROVIDER_TIMEOUT_MS, 120000, 10000, 300000),
    maxAttempts: boundedNumber(env.ECONMARK_PROVIDER_MAX_ATTEMPTS, 2, 1, 3),
    // The portable grading invariant sets 0.97 as the minimum safe auto-gate.
    // Deployments may be stricter, but an environment variable must not weaken it.
    autoGateMinimum: boundedNumber(env.ECONMARK_OCR_AUTO_GATE_MIN, 0.97, 0.97, 1)
  });
}

export function providerPlanVersion(plan) {
  return ROLE_NAMES
    .map((role) => `${role}:${plan.roles[role].provider}/${plan.roles[role].model}`)
    .join("|");
}

export function publicProviderStatus(plan) {
  const roles = Object.fromEntries(ROLE_NAMES.map((role) => {
    const item = plan.roles[role];
    return [role, {
      provider: item.provider,
      provider_label: item.providerLabel,
      model: item.model,
      configured: Boolean(item.apiKey),
      missing_key_environment: item.apiKey ? null : item.apiKeyEnv
    }];
  }));
  return {
    ready: Object.values(roles).every((role) => role.configured),
    provider_neutral: true,
    cross_provider_review: roles.primary.provider !== roles.reviewer.provider,
    auto_gate_minimum: plan.autoGateMinimum,
    roles
  };
}

export { PROVIDERS, ROLE_NAMES };
