# Props

## Connection
This topic builds the React data-flow mental model and prepares you for the Hooks and state-management layers.

## What it is
Props are read-only inputs passed from parent to child; callbacks let children report user intent to the owner.

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
Props are parent-owned inputs. Treat them as read-only and communicate changes through callbacks or shared state. Distinguish value equality from object/function identity because reference changes affect memoization and dependency-sensitive Hooks.

### Pitfalls
Do not automatically copy props into state. First decide whether the child truly owns an editable value or is merely displaying parent data. Avoid mutating prop objects because ownership becomes ambiguous.

### Interview drill
Explain how a child should update a parent-owned order, why direct mutation is unsafe, and how immutable updates preserve one-way data flow.