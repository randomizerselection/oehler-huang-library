export class ProviderCallError extends Error {
  constructor(message, { code = "PROVIDER_CALL_FAILED", status = 502, retryable = false, cause } = {}) {
    super(message, { cause });
    this.name = "ProviderCallError";
    this.code = code;
    this.status = status;
    this.retryable = retryable;
  }
}

function extractJsonText(value) {
  const text = typeof value === "string"
    ? value
    : Array.isArray(value)
      ? value.map((item) => item?.text ?? item?.content ?? "").join("")
      : "";
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced ? fenced[1].trim() : trimmed;
}

async function errorMessage(response) {
  try {
    const payload = await response.json();
    return payload?.error?.message ?? payload?.message ?? `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}

export function createProviderClient({ fetchImpl = fetch } = {}) {
  return async function completeJson({ roleConfig, messages, validate, timeoutMs = 120000, maxAttempts = 2 }) {
    if (!roleConfig.apiKey) {
      throw new ProviderCallError(`Missing ${roleConfig.apiKeyEnv} for ${roleConfig.role}.`, {
        code: "PROVIDER_KEY_MISSING",
        status: 503
      });
    }

    let currentMessages = structuredClone(messages);
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      let response;
      try {
        response = await fetchImpl(roleConfig.baseUrl, {
          method: "POST",
          headers: {
            authorization: `Bearer ${roleConfig.apiKey}`,
            "content-type": "application/json"
          },
          body: JSON.stringify({
            model: roleConfig.model,
            messages: currentMessages,
            response_format: { type: "json_object" },
            stream: false
          }),
          signal: AbortSignal.timeout(timeoutMs)
        });
      } catch (error) {
        lastError = new ProviderCallError(`${roleConfig.providerLabel} request failed.`, {
          code: error?.name === "TimeoutError" ? "PROVIDER_TIMEOUT" : "PROVIDER_NETWORK_ERROR",
          status: 502,
          retryable: true,
          cause: error
        });
        if (attempt < maxAttempts) continue;
        throw lastError;
      }

      if (!response.ok) {
        const detail = await errorMessage(response);
        const retryable = response.status === 429 || response.status >= 500;
        lastError = new ProviderCallError(`${roleConfig.providerLabel} returned ${detail}.`, {
          code: response.status === 429 ? "PROVIDER_RATE_LIMIT" : "PROVIDER_HTTP_ERROR",
          status: response.status === 429 ? 429 : 502,
          retryable
        });
        if (retryable && attempt < maxAttempts) continue;
        throw lastError;
      }

      let parsed;
      try {
        const payload = await response.json();
        const content = payload?.choices?.[0]?.message?.content;
        parsed = JSON.parse(extractJsonText(content));
      } catch (error) {
        lastError = new ProviderCallError(`${roleConfig.providerLabel} did not return parseable JSON.`, {
          code: "PROVIDER_JSON_INVALID",
          status: 502,
          retryable: true,
          cause: error
        });
        if (attempt < maxAttempts) {
          currentMessages.push({
            role: "user",
            content: "Your previous response was not valid JSON. Return only one complete JSON object with no markdown fences or commentary."
          });
          continue;
        }
        throw lastError;
      }

      try {
        validate(parsed);
        return parsed;
      } catch (error) {
        lastError = new ProviderCallError(`${roleConfig.providerLabel} returned JSON that failed the EconMark contract.`, {
          code: "PROVIDER_SCHEMA_INVALID",
          status: 502,
          retryable: true,
          cause: error
        });
        if (attempt < maxAttempts) {
          currentMessages.push({
            role: "user",
            content: `Correct the JSON so it satisfies the required contract. Validation error: ${error.message}. Return JSON only.`
          });
          continue;
        }
        throw lastError;
      }
    }
    throw lastError;
  };
}

export function imagePromptMessages(systemPrompt, imageDataUrl, userPrompt) {
  return [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content: [
        { type: "image_url", image_url: { url: imageDataUrl } },
        { type: "text", text: userPrompt }
      ]
    }
  ];
}

export function textPromptMessages(systemPrompt, userPrompt) {
  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt }
  ];
}
