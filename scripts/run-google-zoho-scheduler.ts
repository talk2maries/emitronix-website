import { spawn } from "node:child_process";

const WORKER_INTERVAL_MS = 2 * 60_000;
const DIAGNOSTICS_INTERVAL_MS = 15 * 60_000;
let stopping = false;
let workerRunning = false;
let diagnosticsRunning = false;

async function runNpmScript(script: "conversion:worker" | "conversion:diagnostics") {
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  return new Promise<number>((resolve, reject) => {
    const child = spawn(command, ["run", script], {
      cwd: process.cwd(),
      env: process.env,
      stdio: "inherit",
      shell: false,
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (signal) process.stderr.write(`${script} stopped by ${signal}.\n`);
      resolve(code ?? 1);
    });
  });
}

async function runWorker() {
  if (stopping || workerRunning) return;
  workerRunning = true;
  try {
    const code = await runNpmScript("conversion:worker");
    if (code !== 0) process.stderr.write(`conversion:worker exited with code ${code}.\n`);
  } catch (error) {
    process.stderr.write(`conversion:worker could not start: ${error instanceof Error ? error.message : "unknown error"}\n`);
  } finally {
    workerRunning = false;
  }
}

async function runDiagnostics() {
  if (stopping || diagnosticsRunning) return;
  diagnosticsRunning = true;
  try {
    const code = await runNpmScript("conversion:diagnostics");
    if (code !== 0) process.stderr.write(`conversion:diagnostics exited with code ${code}.\n`);
  } catch (error) {
    process.stderr.write(`conversion:diagnostics could not start: ${error instanceof Error ? error.message : "unknown error"}\n`);
  } finally {
    diagnosticsRunning = false;
  }
}

function stop(signal: string) {
  stopping = true;
  process.stdout.write(`Google/Zoho scheduler received ${signal}; no new jobs will start.\n`);
  clearInterval(workerTimer);
  clearInterval(diagnosticsTimer);
  const waitForChildren = setInterval(() => {
    if (!workerRunning && !diagnosticsRunning) {
      clearInterval(waitForChildren);
      process.exit(0);
    }
  }, 250);
}

process.on("SIGTERM", () => stop("SIGTERM"));
process.on("SIGINT", () => stop("SIGINT"));

const workerTimer = setInterval(() => void runWorker(), WORKER_INTERVAL_MS);
const diagnosticsTimer = setInterval(() => void runDiagnostics(), DIAGNOSTICS_INTERVAL_MS);
workerTimer.unref();
diagnosticsTimer.unref();

process.stdout.write(
  `Google/Zoho scheduler started (worker ${WORKER_INTERVAL_MS / 1000}s; diagnostics ${DIAGNOSTICS_INTERVAL_MS / 1000}s).\n`,
);
void runWorker();

await new Promise<void>((resolve) => {
  const keepAlive = setInterval(() => {
    if (stopping && !workerRunning && !diagnosticsRunning) {
      clearInterval(keepAlive);
      resolve();
    }
  }, 1000);
});
