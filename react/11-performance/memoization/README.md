# Memoization: React.memo, useMemo, useCallback

> Memoization skips work when inputs haven't changed. In React it's about **skipping re-renders** (`React.memo`) and **keeping values/functions stable** (`useMemo`, `useCallback`). Measure first.

## React.memo
```tsx
const DeviceRow = React.memo(function DeviceRow({ device, onSelect }: { device: Device; onSelect: (id: string) => void }) {
  return <tr onClick={() => onSelect(device.id)}><td>{device.name}</td><td>{device.status}</td></tr>;
});
```
- Skips re-render if every prop is `Object.is`-equal to last time (shallow compare). Optional 2nd arg: custom `arePropsEqual`.
- Still re-renders when **its own state** or a **context it reads** changes.

## What breaks memo (and fixes)
| Breaks memo | Fix |
|---|---|
| Inline object `options={{ a: 1 }}` | Hoist constant outside component or `useMemo` |
| Inline function `onSelect={(id) => …}` | `useCallback` |
| Inline JSX `icon={<Icon/>}` / `children` | `useMemo` the element or restructure |
| New array from `filter()` each render | `useMemo` |
| Spreading a big object of props | Pass only what's needed |

## Alternatives that are often better
1. **Move state down** to the component that needs it.
2. **Lift content up** — pass heavy subtrees as `children` so a wrapper's state changes don't re-create them.
3. **Split contexts / use selectors** in stores.
4. **Virtualize** long lists instead of memoizing 5,000 rows.
5. **React Compiler** — automatic memoization at build time (opt-in).

## Interview questions
1. **When does React.memo help?** Expensive component, re-rendered often by a parent with the same props.
2. **Why didn't React.memo stop the re-render?** New prop references, context change, own state change.
3. **Is it bad to memo everything?** Adds comparison cost and complexity; prefer structural fixes first.

Next → [Profiling](../profiling/README.md)
