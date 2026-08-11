import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const required = [
  "index.html",
  "student.html",
  "teacher.html",
  "batch.html",
  "src/app.js",
  "src/batch-app.js",
  "src/batch-workflow.js",
  "src/feedback-pack.js",
  "src/marker-remarks.js",
  "src/workflow.js",
  "src/auth.js",
  "src/assignments.js",
  "src/student-app.js",
  "src/teacher-app.js",
  "server/provider-config.mjs",
  "server/app-config.mjs",
  "server/account-store.mjs",
  "server/http-security.mjs",
  "server/app-server.mjs",
  "server/provider-client.mjs",
  "server/schema-registry.mjs",
  "server/grading-gateway.mjs",
  "config/provider.example.env",
  "spec/grading-input.schema.json",
  "spec/parsed-rubric.schema.json",
  "spec/evidence-record.schema.json",
  "spec/grading-output.schema.json",
  "spec/teacher-review.schema.json",
  "spec/audit-record.schema.json",
  "spec/batch-run.schema.json",
  "spec/transcription-output.schema.json",
  "spec/primary-score.schema.json",
  "spec/reviewer-score.schema.json",
  "spec/adjudicator-output.schema.json",
  "spec/feedback-output.schema.json",
  "spec/account.schema.json",
  "spec/auth-session.schema.json",
  "spec/persistence-record.schema.json",
  "spec/stored-run.schema.json",
  "spec/assignment.schema.json",
  "docs/coze-workflow.md",
  "docs/batch-provider-contract.md",
  "docs/provider-neutral-gateway.md",
  "docs/data-governance.md",
  "docs/competition-evidence-log.md",
  "docs/migration-guide.md",
  "docs/digitalocean-deployment.md",
  "deploy/econmark.service",
  "deploy/nginx.conf.example",
  "deploy/econmark.env.example",
  "evals/fixtures/synthetic-smoke.json"
];

for (const file of required) await access(resolve(process.cwd(), file));

for (const file of required.filter((file) => file.endsWith(".json"))) {
  JSON.parse(await readFile(resolve(process.cwd(), file), "utf8"));
}

const html = await readFile(resolve(process.cwd(), "student.html"), "utf8");
for (const phrase of ["EconMark", "暂定", "合成", "永久", "作业代码"]) {
  if (!html.includes(phrase)) throw new Error(`student-first landing implementation is missing required copy: ${phrase}`);
}

const batchHtml = await readFile(resolve(process.cwd(), "batch.html"), "utf8");
for (const phrase of ["teacher_review", "full_auto", "默认模式", "全自动模式", "自动形成最终成绩", "永久保存在当前账户", "学生批注稿", "开始评分前还需完成", "尚缺少确认", "每名已终审学生恰好一份", "整页模式：每名学生 1 页 A4"]) {
  if (!batchHtml.includes(phrase)) throw new Error(`automated landing implementation is missing required copy: ${phrase}`);
}

console.log(`Project check passed: ${required.length} required artifacts found and JSON files parsed.`);
