import { statfsSync } from "node:fs";
import { resolve } from "node:path";
import { resolveAppConfig } from "../server/app-config.mjs";

const root = resolve(import.meta.dirname, "..");
const config = resolveAppConfig(process.env, root);
const stats = statfsSync(config.dataDir);
const total = Number(stats.blocks) * Number(stats.bsize);
const free = Number(stats.bavail) * Number(stats.bsize);
const usedPercent = total ? Math.round(((total - free) / total) * 1000) / 10 : 0;
const level = usedPercent >= config.diskUploadStopPercent ? "UPLOAD_STOP" : usedPercent >= config.diskCriticalPercent ? "CRITICAL" : usedPercent >= config.diskWarnPercent ? "WARNING" : "OK";
console.log(JSON.stringify({ level, used_percent: usedPercent, total_bytes: total, free_bytes: free, thresholds: { warning: config.diskWarnPercent, critical: config.diskCriticalPercent, upload_stop: config.diskUploadStopPercent } }));
if (level !== "OK") console.error(`OEHLER_HUANG_STORAGE_${level}: filesystem usage is ${usedPercent}%`);
process.exitCode = level === "UPLOAD_STOP" ? 2 : level === "CRITICAL" ? 1 : 0;
