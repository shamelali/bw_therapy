import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  // Keep the starter on the flat config export that actually runs under the pinned ESLint/Next toolchain.
  ...nextCoreWebVitals,
  // kanban/ is a separate repository (own git history and lint setup, incl. vendored
  // third-party code) — it must not be linted by this project's config.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "kanban/**"]),
]);
