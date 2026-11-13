// Starts the Resend MCP server with settings from the project's .env file.
// No .env, or no key in it? We fall back to practice mode (local server).
// The send guard in .claude/hooks still checks every send either way.

import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseEnv } from "node:util";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const envFile = join(projectDir, ".env");

const practice = {
  RESEND_API_KEY: "re_practice",
  RESEND_BASE_URL: "http://localhost:4000",
  SENDER_EMAIL_ADDRESS: "onboarding@resend.dev",
};

let fromFile = existsSync(envFile)
  ? parseEnv(readFileSync(envFile, "utf8"))
  : {};

// No key yet means practice mode, so a live URL never meets the practice key.
if ((fromFile.RESEND_API_KEY ?? "").trim() === "") fromFile = {};

const env = { ...process.env };
for (const [name, fallback] of Object.entries(practice)) {
  const value = (fromFile[name] ?? "").trim();
  env[name] = value !== "" ? value : fallback;
}

const mode = env.RESEND_BASE_URL.includes("localhost") ? "practice" : "live";
process.stderr.write(`resend launcher: ${mode} mode (${env.RESEND_BASE_URL})\n`);

// Windows needs a shell to run npx.cmd. The command is fixed text, never user input.
const command = "npx -y resend-mcp@2.27.1";
const child =
  process.platform === "win32"
    ? spawn(command, { env, stdio: "inherit", shell: true })
    : spawn("npx", command.split(" ").slice(1), { env, stdio: "inherit" });

child.on("exit", (code) => process.exit(code ?? 0));
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
