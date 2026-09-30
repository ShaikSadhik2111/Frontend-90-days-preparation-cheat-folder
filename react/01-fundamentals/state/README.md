# State

## Connection
This topic builds the React data-flow mental model and prepares you for the Hooks and state-management layers.

## What it is
State is component memory and each render sees a snapshot. Setters schedule future renders.

## Why it exists
Predictable React starts with a clear answer to **who owns the value, who can change it, and what causes the UI to update?**

## How it works
Use **parent ownership → props down → events/callbacks up → render from current inputs**. Avoid duplicating derived data or mutating snapshots.

## Example
```tsx
function SearchBox({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}
```

## Real frontend use
Use this for search, filters, forms, reusable controls, parent/child synchronization, and shared component APIs.

## Pitfalls
- Duplicating derived state.
- Mutating props/state.
- Lifting every local value to the app root.
- Switching controlled and uncontrolled inputs.
- Extracting a custom Hook that accidentally relies on hidden global state.

## Interview reasoning
Explain ownership, update direction, render timing, and why the chosen state location is appropriate.

## Practical challenge
Build a parent-controlled filter with a child input and preview. Add validation and explain exactly which component owns each value.

## Connection to next topic
Next, connect this model to **rendering and Hooks**, where React's snapshot and scheduling behavior becomes important.

## Official reference
https://react.dev/


## Deep reasoning
State is a render snapshot, not a mutable variable React rewrites immediately. Calling a setter schedules another render, while event handlers close over the snapshot from the render that created them.

### Production reasoning
Keep state minimal. Derive values from existing state where possible, colocate state with the component that owns the behavior, and lift it only when multiple consumers need one source of truth.

### Interview drill
Build a cart with quantity updates and a derived total. Explain which values are state, which are derived, and why functional updates matter.