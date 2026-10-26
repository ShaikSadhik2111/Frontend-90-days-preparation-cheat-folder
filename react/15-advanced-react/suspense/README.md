# Suspense

> `<Suspense fallback={...}>` shows a fallback while **something inside it is not ready** (lazy code, or data from a Suspense-enabled source) and reveals the content when it is.

```tsx
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<ChartSkeleton />}>        {/* nested boundary: chart loads independently */}
    <TelemetryChart deviceId={id} />
  </Suspense>
</Suspense>
```

## What can suspend
- `React.lazy` components (code).
- Data via Suspense-enabled libraries: TanStack Query `useSuspenseQuery`, Relay, Next.js/RSC async components, React 19 `use(promise)` (the promise must be cached/created outside render, e.g. passed from a loader or server).
- **Not** `useEffect` + fetch — Suspense doesn't detect data fetched in effects.

## Designing boundaries
- Place boundaries where a loading state makes sense to the user (page, panel, widget) — not around every tiny component (popcorn effect).
- Siblings inside one boundary are revealed **together**.
- Pair each boundary with an **error boundary** for failures.
- During navigation, wrap the update in `startTransition` → React keeps showing the current screen (no fallback flash) until the next is ready.
- Avoid waterfalls: start fetches early (loader/prefetch) rather than each component fetching when it renders.

## Interview questions
1. **What is Suspense?** A declarative loading boundary for code and data.
2. **Can Suspense catch data loading in useEffect?** No — only sources that "suspend" (throw a promise / `use`).
3. **How do Suspense and transitions work together?** Transitions keep already-visible content instead of replacing it with a fallback.

Next → [Hydration](../hydration/README.md)
