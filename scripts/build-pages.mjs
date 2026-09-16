// Cross-platform entry point for the GitHub Pages build: sets GITHUB_PAGES=true
// (read by vite.config.ts) before running the normal build, then prerenders
// the SSR output into a static index.html.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const env = { ...process.env, GITHUB_PAGES: "true" };

const run = (command, args) => {
  const result = spawnSync(command, args, { cwd: root, env, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run(process.execPath, [path.join(root, "node_modules/vite/bin/vite.js"), "build"]);
run(process.execPath, [path.join(root, "scripts/prerender-static.mjs")]);
