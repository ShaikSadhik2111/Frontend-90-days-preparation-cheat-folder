# React 19 Actions

## Connection
This topic extends React rendering into production performance and modern application behavior.

## What it is
React Actions coordinate async mutations with pending state, optimistic UI, error handling, and form integration. They are especially useful for modern form and mutation flows.

## Why it exists
Performance is about reducing user-visible work, not making code look clever. The correct optimization depends on where time is actually spent: network, JavaScript, rendering, layout, or interaction.

## How it works
Trace the user journey: **input → scheduled work → render → commit → browser paint/interaction**. Measure before and after the change.

## Example
```tsx
const Chart = lazy(() => import('./Chart'));
function Dashboard() {
  return <Suspense fallback={<Spinner />}><Chart /></Suspense>;
}
```

## Real frontend use
Apply this to large dashboards, charts, admin modules, route-level code, long lists, and interaction-heavy screens.

## Pitfalls
- Optimizing without profiling.
- Adding memoization when props are always new.
- Splitting every tiny module into a network request.
- Ignoring accessibility when virtualizing lists.
- Optimizing development measurements instead of production behavior.

## Interview reasoning
Explain the bottleneck, the measurement, the proposed change, the trade-off, and how you would verify that the user actually benefits.

## Practical challenge
Take a slow list or dashboard, profile it, apply one targeted optimization, and compare the before/after behavior.

## Connection to next topic
After performance, connect the result to **testing and architecture** so optimizations remain maintainable.

## Official reference
https://react.dev/
