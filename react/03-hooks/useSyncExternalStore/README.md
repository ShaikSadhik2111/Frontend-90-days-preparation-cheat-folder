# use SyncExternalStore

## Connection
This topic completes the core Hooks layer and connects directly to state management, performance, modern React, and interview reasoning.

## What it is
useSyncExternalStore provides a React-safe subscription model for data stored outside React state.

## Why it exists
React needs deliberate mechanisms for local memory, complex transitions, optimistic async UI, DOM escape hatches, external stores, and rendering priority.

## How it works
Reason in terms of snapshots, queued updates, dependencies, subscriptions, and render priority. A Hook is part of React's render model, not an ordinary utility function.

## Example
```tsx
function Example() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Real frontend use
Use this for local state, complex forms, optimistic mutations, expensive calculations, external stores, DOM access, and responsive non-urgent updates.

## Pitfalls
- Adding memoization everywhere.
- Mutating refs when the UI should update.
- Hiding state transitions inside unrelated Effects.
- Assuming optimistic state is permanent.
- Confusing transitions with background JavaScript execution.

## Interview reasoning
Explain what persists across renders, what schedules work, what React can prioritize, and which component should own the state.

## Practical challenge
Build a searchable list using local state, a reducer for filter transitions, one expensive derived calculation, and a non-urgent result update. Profile it before optimizing.

## Connection to next topic
Move into **state management and modern React** and decide when local state is enough versus shared or server state.

## Official reference
https://react.dev/reference/react/hooks
