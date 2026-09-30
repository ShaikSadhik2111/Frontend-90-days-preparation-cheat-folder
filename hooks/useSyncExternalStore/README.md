# use SyncExternalStore

## Connection
This topic completes the core Hooks layer and connects directly to state management, performance, modern React, and interview reasoning.

## What it is
useSyncExternalStore provides a React-safe subscription model for data that lives outside React state.

## Why it exists
React needs a deliberate way to remember state, coordinate external systems, prioritize work, or express temporary async UI without turning every interaction into global state.

## How it works
Think in snapshots, queued updates, dependencies, and render priority. A Hook is part of React's render model; it is not an ordinary utility function.

## Example
```tsx
function Example({ items }) {
  const [value, setValue] = useState(0);
  const next = useMemo(() => items.length + value, [items.length, value]);
  return <button onClick={() => setValue(v => v + 1)}>{next}</button>;
}
```

## Real frontend use
Use this layer for local state, complex state transitions, optimistic mutations, expensive calculations, external stores, DOM access, and responsive non-urgent updates.

## Pitfalls
- Adding memoization everywhere.
- Mutating refs when the UI should update.
- Hiding complex state transitions inside unrelated Effects.
- Forgetting that optimistic state is temporary.
- Confusing a transition with background JavaScript execution.

## Interview reasoning
Explain what persists across renders, what schedules work, what React can prioritize, and which part of the UI should own the state.

## Practical challenge
Build a searchable list with local state, a reducer-based filter model, one expensive derived calculation, and a non-urgent result update. Profile it before optimizing.

## Connection to next topic
Move next to **state management and modern React** and decide deliberately when local state is enough and when shared/server state needs another boundary.

## Official reference
https://react.dev/reference/react/hooks
