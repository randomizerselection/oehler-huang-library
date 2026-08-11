import { createEconMarkServer } from "../server/app-server.mjs";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

process.umask(0o027);
const envFile = resolve(import.meta.dirname, "..", "..", "..", ".env");
if (existsSync(envFile) && process.loadEnvFile) process.loadEnvFile(envFile);
const port = Number(process.env.OH_PORT ?? process.env.ECONMARK_PORT ?? 4173);
const host = process.env.OH_HOST ?? process.env.ECONMARK_HOST ?? "127.0.0.1";
const applicationRoot = resolve(import.meta.dirname, "..");
const application = await createEconMarkServer({ root: applicationRoot });

application.server.listen(port, host, () => {
  const status = application.gradingGateway.status();
  console.log(`Oehler-Huang Platform is running at http://${host}:${port}`);
  console.log(`Permanent account storage: ${application.config.dataDir}`);
  console.log(status.ready
    ? `Provider gateway ready: ${Object.values(status.roles).map((role) => `${role.provider}/${role.model}`).join(", ")}`
    : `Provider gateway not ready; missing: ${[...new Set(Object.values(status.roles).filter((role) => !role.configured).map((role) => role.missing_key_environment))].join(", ")}`
  );
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    application.close();
    process.exit(0);
  });
}
