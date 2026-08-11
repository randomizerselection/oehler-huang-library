# EconMark · 经济学论述题智评助手

EconMark 是面向 Cambridge IGCSE Economics 0455 的学生自评与教师评分系统。目前严谨支持 `Analyse [6]` 与 `Discuss [8]`：教师在中央作业库中创建并发布版本化题目与评分标准，学生通过分享代码直接提交作答并获得暂定反馈；单份精评、批量评分、双评分、裁决、人工终审和永久审计记录均复用同一套工作流。

## 产品模式

- 根网址是学生入口；`/teacher` 是教师作业库与学生提交审核中心；`/single` 和 `/batch` 继续提供教师单份与批量评分。
- 学生和教师为正式分离的账户角色。学生注册开放；教师注册必须提供服务器配置的 `ECONMARK_TEACHER_INVITE_CODE`。
- 题目与评分标准只在教师作业库创建。已发布版本不可原地修改；修订会产生新版本和新分享代码。
- 所有访客无需登录即可运行原创合成样例，包括 30 人合成班级。
- 学生输入分享代码后可匿名预览题目，登录后上传作答；完整评分标准只在成功提交后向该学生显示。
- 任何人均可创建同等功能账户；登录后才可上传真实文件、批量调用模型、访问永久历史和原图。
- 上传图片、转写、评分标准、证据、反馈和终审决定保存在 VPS；系统没有自动删除任务或删除 API。
- 永久保存不等于无限写入：单文件、单批次、并发、请求体和账户磁盘配额均由环境变量配置，达到配额时拒绝新上传而不删除旧记录。
- 模型供应商不是产品边界。Qwen、Kimi、DeepSeek 可按 OCR、初评、复核、裁决和反馈角色独立切换；API 密钥只在服务器端。

## 本地运行

要求 Node.js 22.5 或更新版本（账户数据库使用内置 `node:sqlite`）。

```powershell
npm install
npm start
```

打开 `http://127.0.0.1:4173/`。根网址进入学生代码与自评流程；`/teacher` 管理中央作业库；`/single` 保留三个公开样例和教师单份精评；`/batch` 保留完整 30 人合成班级和真实整班上传。创建账户后，上传与评分结果会写入 `.econmark-data/`：

```text
.econmark-data/
├── econmark.sqlite          # 账户、会话、批次、评分与图片索引
└── images/<account_id>/     # 只增不自动删除的原始上传文件
```

第一次使用请按 [`docs/first-run-guide.md`](docs/first-run-guide.md) 完成单份样例、30 人批量样例和（配置模型密钥后）真实手写作答的分阶段验证。公开合成样例不需要 API 密钥。

## 登录与安全合同

- 密码使用 Argon2id 哈希；数据库不保存明文密码。
- 随机会话令牌只以 SHA-256 摘要入库，并通过 `HttpOnly; SameSite=Strict` Cookie 传输。
- 所有状态变更同时要求同源校验与 CSRF 令牌。
- 结果和图片查询均以已登录 `account_id` 过滤；知道其他账户的 ID 或 URL 也无法读取。
- 注册/登录和评分均有内存速率限制；生产环境还应在 Nginx/防火墙层增加限制与监控。
- 普通静态资源不能访问 `server/`、`config/`、`node_modules/` 或数据目录。

## 容量配置

复制 `config/provider.example.env` 中的变量到 VPS 的受保护环境文件。界面通过 `/api/config` 读取服务器实际配置，不写死“30份”或“12 MB”。主要变量为：

| 变量 | 默认值 | 作用 |
|---|---:|---|
| `ECONMARK_MAX_FILE_MB` | 32 | 单个图片上限 |
| `ECONMARK_MAX_BATCH_SIZE` | 100 | 单批作答数，最大可配置为 500 |
| `ECONMARK_MAX_BATCH_TOTAL_MB` | 512 | 单批原图总量 |
| `ECONMARK_BATCH_CONCURRENCY` | 4 | 同时运行的学生评分任务，最大 12 |
| `ECONMARK_MAX_ACCOUNT_STORAGE_GB` | 50 | 单账户永久存储配额；满额时只拒绝新增 |
| `ECONMARK_GRADING_REQUESTS_PER_HOUR` | 150 | 每账户每小时评分请求数 |
| `ECONMARK_TEACHER_INVITE_CODE` | 空 | 新教师注册邀请码；为空时关闭教师注册 |

实时模型网关目前直接接受 JPG、PNG、WEBP；PDF 预处理尚未宣称完成，部署前应先转为有序图片。

## 验证

```powershell
npm test
npm run check
npm run evaluate
```

当前套件验证账户隔离、密码登录、会话、CSRF、永久图片、批次容量、全自动终审、证据合同、反馈包和全部 JSON Schema。`npm run evaluate` 只是合成数据上的指标计算冒烟测试，不能作为真实学生评分准确率证据。

## 部署

DigitalOcean VPS 是合适的单机部署目标。推荐 Nginx + TLS + systemd + `/var/lib/econmark` 持久磁盘，详见 `docs/digitalocean-deployment.md`，并使用 `deploy/` 中的环境、Nginx 与 systemd 模板。永久保存要求同时备份 SQLite（含一致性快照）和图片目录，并监控磁盘空间；绝不能依赖重建服务器时的临时系统盘。

## 目录

- `server/`：账户、永久存储、HTTP 安全和供应商中立评分网关。
- `spec/ECONMARK-SPEC.md`：人类可读的唯一主规范入口；汇总产品边界、账户权限、工作流、数据、接口、发布门槛与竞赛证据。
- `spec/*.schema.json`：评分、账户、会话、持久化与批次的机器可执行合同。
- `src/`：中文优先界面、确定性公开样例、批量和反馈打印。
- `prompts/`：按职责分离的 OCR、评分、复核、裁决与反馈提示合同。
- `docs/`：竞赛证据、治理、部署、迁移和周末作业流程。
- `tests/`：合同、账户隔离、HTTP、自动化政策与 Schema 测试。

## 评分边界

全自动模式不是无条件放行：OCR 必须达到门槛且无疑难片段，评分标准必须确认，双评分必须一致或一分差异已裁决，低置信度、两分以上分歧和图像异常必须进入人工异常队列。每个最终分数记录 `decision_source` 与策略版本，人工可随后调整或拒绝。真实课堂使用仍需学校明确批准所选 VPS、模型供应商和永久保存政策。
