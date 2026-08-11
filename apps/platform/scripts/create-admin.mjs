import { randomBytes } from "node:crypto";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createAccountStore } from "../server/account-store.mjs";
import { resolveAppConfig } from "../server/app-config.mjs";
import { createPlatformStore } from "../server/platform-store.mjs";

process.umask(0o027);
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const envFile = resolve(root, "../../.env");
if (existsSync(envFile)) process.loadEnvFile(envFile);
const args = process.argv.slice(2);
const value = (name, fallback = "") => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
};
const generatedPassword = randomBytes(18).toString("base64url");
const input = {
  username: value("--username", "admin"),
  display_name: value("--display-name", "Platform Administrator"),
  password: value("--password", process.env.OH_ADMIN_PASSWORD || generatedPassword)
};
const config = resolveAppConfig(process.env, root);
const accountStore = createAccountStore(config);
const platformStore = createPlatformStore(config);
try {
  const created = await platformStore.bootstrapAdmin(input);
  console.log(JSON.stringify({ ...created, generated_password: input.password === generatedPassword ? generatedPassword : undefined }, null, 2));
  console.log("Store the password and recovery code securely; neither can be displayed again.");
} finally {
  platformStore.close();
  accountStore.close();
}
