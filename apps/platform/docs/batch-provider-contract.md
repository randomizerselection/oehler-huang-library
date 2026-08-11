# EconMark 批量评分 HTTP 与存储合同

## 1. 编排原则

批量页面为同源编排器，每名学生调用一次 `POST /api/grade`。整班不会进入同一模型上下文；评分标准解析可由服务器按题目哈希缓存，而 OCR、证据、分数、反馈和失败状态保持学生级隔离。并发、批次人数和数据量由服务器配置。

## 2. 认证

- `POST /api/auth/register`：创建账户并签发会话。
- `POST /api/auth/login`：验证 Argon2id 密码并签发会话。
- `GET /api/auth/me`：返回账户、CSRF 令牌和到期时间。
- `POST /api/auth/logout`、`POST /api/auth/password`：要求会话、同源与 CSRF。

浏览器使用 HttpOnly Cookie；模型 API 密钥不进入响应、HTML、导出或数据库工作流 JSON。

## 3. 单名学生请求

```json
{
  "run_id": "batch-uuid-SUB-uuid",
  "batch_id": "batch-uuid",
  "mode": "account_upload",
  "batch_mode": true,
  "approval_mode": "teacher_review",
  "student_ref": "S01",
  "answer_name": "S01.jpg",
  "answer_mime_type": "image/jpeg",
  "answer_data_url": "data:image/jpeg;base64,...",
  "assignment": {
    "assignment_id": "WH-2026-W01",
    "question_text": "...",
    "command_word": "Discuss",
    "max_mark": 8,
    "mark_scheme_text": "...",
    "teacher_confirmed": true
  },
  "transcript_confirmation_policy": "exception_only",
  "language": "en_zh",
  "schema_version": "econmark/4.0.0"
}
```

除 GET/HEAD 外，请求须携带 `x-csrf-token`。`batch_mode=true` 时 `batch_id` 必填；`approval_mode` 只能为 `teacher_review` 或 `full_auto`。

## 4. 成功响应与原子写入

成功响应为：

```json
{
  "input": { "...": "grading-input.schema.json" },
  "rubric": { "...": "parsed-rubric.schema.json" },
  "output": { "...": "grading-output.schema.json" },
  "persistence": {
    "run_id": "...",
    "account_id": "acct_...",
    "batch_id": "batch-...",
    "image_id": "image_...",
    "image_url": "/api/images/image_...",
    "stored_at": "...",
    "updated_at": "...",
    "retention_policy": "permanent_no_automatic_deletion"
  }
}
```

服务器先验证数据 URL、MIME 和字节上限，再调用模型。成功工作流与图片索引在 SQLite 事务中写入，图片以随机不可猜文件名和 `0600` 模式保存。相同账户与 `run_id` 的重试返回原记录。批次人数、批次字节和账户永久配额在数据库事务中再次检查，不能只依赖前端。

## 5. 终审

供应商输出的 `final_mark` 必须为空。人工终审调用 `POST /api/runs/:runId/decision`；系统从数据库重新加载该账户拥有的原工作流，应用服务器端不变量，再覆盖记录。全自动模式由同一服务器在持久化前执行自动政策；供应商不能通过返回自称“approved”来获得权限。

## 6. 历史与图片

- `GET /api/runs?limit=&offset=`：只列当前账户记录。
- `GET /api/runs/:runId`：完整工作流与持久化元数据。
- `GET /api/images/:imageId`：认证后内联返回当前账户原图。

不存在删除和到期接口。图片 URL 是受认证同源地址，不是公开或可跨账户分享的永久 URL。

## 7. 稳定失败码

| HTTP | 示例代码 | 含义 |
|---:|---|---|
| 400 | `ASSIGNMENT_INCOMPLETE`, `BATCH_ID_REQUIRED` | 请求合同不完整 |
| 401 | `AUTH_REQUIRED`, `LOGIN_INVALID` | 未登录或凭据错误 |
| 403 | `CSRF_INVALID`, `ORIGIN_REJECTED` | 状态变更安全校验失败 |
| 404 | `RUN_NOT_FOUND`, `IMAGE_NOT_FOUND` | 不存在或不属于当前账户 |
| 409 | `USERNAME_TAKEN`, `BATCH_OWNERSHIP_CONFLICT` | 唯一性/所有权冲突 |
| 413 | `FILE_TOO_LARGE`, `BATCH_TOO_LARGE`, `ACCOUNT_STORAGE_QUOTA_REACHED` | 配置容量已达上限 |
| 422 | `TRANSCRIPT_REVIEW_REQUIRED`, `LIVE_FILE_TYPE_UNSUPPORTED` | 输入超出安全评分范围 |
| 429 | `AUTH_RATE_LIMITED`, `GRADING_RATE_LIMITED` | 速率限制 |

一名学生失败不取消其他作答；批量导出保留错误码和消息，但不包含 API 密钥或 base64 原图。
