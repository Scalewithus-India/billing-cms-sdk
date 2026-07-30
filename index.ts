/**
 * Back-compat entry for consumers that still resolve `billing-cms-sdk` → `index.ts`
 * (package.json `"module"` / `"main"` now point at `src/index.ts`).
 */
export * from "./src/index";
