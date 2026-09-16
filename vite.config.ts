// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages serves this repo at /trust_drive/, not the domain root, and can only serve
// static files, so its build needs a plain Node server (prerendered to HTML afterwards)
// instead of the default Cloudflare Workers target. Only the GitHub Actions workflow sets
// GITHUB_PAGES=true; local dev/build is unaffected.
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(isGithubPagesBuild ? { nitro: { preset: "node-server" } } : {}),
  vite: { base: isGithubPagesBuild ? "/trust_drive/" : "/" },
});
