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
const config = resolveAppConfig(process.env, root);
const accountStore = createAccountStore(config);
const platformStore = createPlatformStore(config);
console.log(JSON.stringify(platformStore.migration, null, 2));
platformStore.close();
accountStore.close();
