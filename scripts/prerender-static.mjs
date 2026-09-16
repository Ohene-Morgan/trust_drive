// Renders the built server's HTML once and writes it into .output/public,
// turning the SSR build into a plain static site deployable to GitHub Pages.
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const port = 4173;

const server = spawn(process.execPath, [path.join(root, ".output/server/index.mjs")], {
  env: { ...process.env, PORT: String(port), HOST: "127.0.0.1" },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverExited = null;
server.on("exit", (code, signal) => {
  serverExited = { code, signal };
});
let serverOutput = "";
server.stdout.on("data", (chunk) => (serverOutput += chunk));
server.stderr.on("data", (chunk) => (serverOutput += chunk));

const waitForServer = async () => {
  for (let attempt = 0; attempt < 50; attempt++) {
    if (serverExited) {
      throw new Error(`Server process exited early (code=${serverExited.code}, signal=${serverExited.signal}):\n${serverOutput}`);
    }
    try {
      const res = await fetch(`http://127.0.0.1:${port}/`);
      if (res.ok) return res;
    } catch {
      // not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Server did not become ready in time. Output so far:\n${serverOutput}`);
};

try {
  const res = await waitForServer();
  const html = await res.text();
  if (!html.includes("Master the road")) {
    throw new Error("Rendered HTML did not contain expected homepage content");
  }
  await writeFile(path.join(root, ".output/public/index.html"), html, "utf-8");
  console.log("Wrote .output/public/index.html");
} finally {
  server.kill();
}
