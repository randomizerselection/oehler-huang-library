# Provider-neutral grading gateway

## Decision

EconMark owns the workflow, prompts, schemas, invariants, retries, audit metadata, and teacher-decision gate. Model vendors supply bounded inference calls only. Qwen, Kimi, DeepSeek, and a future Coze adapter can be replaced without changing the browser application or grading records.

## Roles

| Role | Requires vision | Default Qwen model | Purpose |
|---|---:|---|---|
| `transcription` | yes | `qwen3-vl-plus` | Validate and transcribe one answer image |
| `rubric` | no | `qwen3.7-max-2026-05-20` | Parse the teacher-confirmed assignment rubric; cached per frozen assignment |
| `primary` | no | `qwen3.7-max-2026-05-20` | Extract exact evidence and propose a mark |
| `reviewer` | no | `qwen3.7-max-2026-05-20` | Independently mark without seeing the primary result |
| `adjudicator` | no | `qwen3.7-max-2026-05-20` | Resolve only one-mark differences |
| `feedback` | no | `qwen-flash` | Produce bilingual priorities, outlines, and targeted questions |

DeepSeek is deliberately rejected for the transcription role because its official API models are text-only. Kimi and Qwen may perform vision roles. Every role can use a different provider and model through environment variables.

## Official API verification · 9 August 2026

- Alibaba Cloud documents JSON mode for Qwen3.7 Max and `qwen3-vl-plus`, including OpenAI-compatible multimodal `image_url` input and `response_format={"type":"json_object"}`: [Qwen structured output](https://help.aliyun.com/en/model-studio/qwen-structured-output).
- DeepSeek's current model-list and chat contracts expose `deepseek-v4-pro` and `deepseek-v4-flash`; neither is used for the vision role: [DeepSeek model list](https://api-docs.deepseek.com/api/list-models), [chat completions](https://api-docs.deepseek.com/api/create-chat-completion).
- Kimi's official quick start states that Kimi K3 and K2.6 accept text, image and video input through an OpenAI-compatible API; EconMark retains `kimi-k2.6` as a configurable benchmark candidate rather than claiming it is automatically superior: [Kimi API quick start](https://platform.kimi.com/docs/overview).

Model identifiers remain environment configuration, not hard-coded intellectual property. Recheck these primary sources immediately before deployment and freeze the identifiers used in each benchmark run.

## Local setup

Do not save real keys in `config/provider.example.env`; it is a naming template only. Set secrets in the shell or an approved secret manager before starting the server.

```powershell
$env:DASHSCOPE_API_KEY="your-key"
npm start
```

With one Qwen key, all roles use the Qwen defaults. Recommended cross-provider review:

```powershell
$env:DASHSCOPE_API_KEY="your-qwen-key"
$env:DEEPSEEK_API_KEY="your-deepseek-key"
$env:ECONMARK_REVIEWER_PROVIDER="deepseek"
$env:ECONMARK_REVIEWER_MODEL="deepseek-v4-pro"
npm start
```

Kimi transcription can be selected independently:

```powershell
$env:MOONSHOT_API_KEY="your-kimi-key"
$env:ECONMARK_TRANSCRIPTION_PROVIDER="kimi"
$env:ECONMARK_TRANSCRIPTION_MODEL="kimi-k2.6"
```

Open `http://127.0.0.1:4173/`. Automated batch grading is the default landing workflow; the class overview reports whether the live gateway is ready and names only providers/models, never credentials. Single-answer grading remains available at `/single.html`.

## HTTP surface

- `GET /api/config`: public upload, batch, concurrency, storage and feature limits.
- `GET /api/providers/status`: safe configuration summary; no secrets.
- `POST /api/grade`: authenticated, CSRF-protected processing of exactly one student answer; returns `{ input, rubric, output, persistence }` after permanent storage.
- `/api/auth/*`: account registration, login, logout, session inspection and password change.
- `/api/runs/*` and `/api/images/*`: account-owned permanent history and source-file access.
- The browser defaults to `/api/grade`; `globalThis.ECONMARK_PROVIDER_ENDPOINT` is only needed for an approved external gateway.

The local server accepts base64 JPG, PNG, and WEBP images up to the request-size limit. Live PDF preprocessing is deliberately not claimed yet; convert single-answer PDFs to ordered images before submission.

## Consistency policy

Configuration is read once when the server starts. Each result stores every role's provider and model in `output.provider_trace` and a compact `model_version` string. EconMark never silently fails over to another provider during an assignment. If a provider fails, that submission enters the recovery queue. Deliberate reruns with a new provider must be recorded as new runs.

## Safety and production boundary

- OCR continues automatically only when it is usable, has no validation flags or uncertain spans, and meets `ECONMARK_OCR_AUTO_GATE_MIN` (default `0.97`).
- All credited quotations must exist verbatim in the transcript.
- Every intermediate and final model response is validated locally with JSON Schema.
- A two-mark scorer disagreement always forces manual review.
- No final mark exists before human approval/adjustment or the explicitly selected, locally enforced automatic policy.
- Passwords use Argon2id; state-changing routes require a SameSite HttpOnly session cookie, same-origin request and CSRF token.
- Each successful upload is stored permanently under the authenticated account, and every result/image read checks ownership on the server.
- The development server binds to `127.0.0.1`. Production uses TLS termination, persistent storage, off-host backup, disk/cost alerts and documented school approval.
