# Code splitting

> Split the bundle into chunks loaded **on demand** so users download only what the current screen needs. Built on dynamic `import()`.

```tsx
import { lazy, Suspense } from "react";

const ReportsPage = lazy(() => import("./pages/ReportsPage"));   // separate chunk
const HeavyChart = lazy(() => import("./components/HeavyChart"));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Suspense>
  );
}
```
- `lazy` needs a **default export** (or `import("./X").then(m => ({ default: m.X }))`).
- Declare `lazy` components at **module level**, not inside a component (would recreate and remount).
- Wrap in an **error boundary** — chunk load can fail (deploy replaced the file, offline). Offer "Reload".
- **Where to split:** routes first, then heavy widgets (charts, editors, maps, PDF viewers), admin-only features, rarely used modals.
- **Prefetch** likely-next chunks on hover/idle: `const load = () => import("./pages/ReportsPage");` `onMouseEnter={load}`.
- Vendor splitting: bundlers split `node_modules` automatically; avoid one giant `vendor.js` that changes every deploy.

**Interview:** *How do you reduce initial bundle size?* Route-based splitting, lazy heavy components, tree-shaking (ESM imports), replace heavy libraries (moment → date-fns/dayjs), analyse the bundle, compress (Brotli).

Next → [Lazy loading](../lazy-loading/README.md)
