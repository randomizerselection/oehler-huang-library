import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { calculateMetrics, releaseGateStatus } from "../src/metrics.js";

const source = resolve(process.cwd(), process.argv[2] ?? "evals/fixtures/synthetic-smoke.json");
const payload = JSON.parse(await readFile(source, "utf8"));
const metrics = calculateMetrics(payload.cases);
const gates = releaseGateStatus(metrics);

console.log(JSON.stringify({
  dataset: payload.dataset,
  warning: payload.warning,
  metrics,
  release_gates: gates,
  all_measured_gates_pass: Object.values(gates).filter((value) => value !== null).every(Boolean)
}, null, 2));
