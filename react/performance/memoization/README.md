# Memoization

## Connection
This topic extends React rendering into production performance and modern async UI.

## What it is
Memoization caches calculations or component work to avoid repeated cost. React Compiler can automate many memoization cases, so measure before adding manual memoization.

## Why it exists
Performance work should reduce user-visible cost. The correct technique depends on whether the bottleneck is network, JavaScript, rendering, DOM size, or interaction scheduling.

## How it works
Trace **user input → scheduled work → render → reconciliation → commit → browser paint/interaction** and measure before and after.

## Example
```tsx
const Chart = lazy(() => import('./Chart'));
function Dashboard() {
  return <Suspense fallback={<Spinner />}><Chart /></Suspense>;
}
```

## Real frontend use
Use this for large dashboards, charts, admin modules, route-level code, long lists, and interaction-heavy screens.

## Pitfalls
- Optimizing without profiling.
- Memoizing when props are always new.
- Creating too many network chunks.
- Ignoring accessibility with virtualization.
- Optimizing development measurements instead of production behavior.

## Interview reasoning
Explain the bottleneck, measurement, optimization, trade-off, and verification method.

## Practical challenge
Profile a slow list or dashboard, apply one targeted optimization, and compare before/after behavior.

## Connection to next topic
Connect performance to **testing and architecture** so optimizations remain maintainable.

## Official reference
https://react.dev/
