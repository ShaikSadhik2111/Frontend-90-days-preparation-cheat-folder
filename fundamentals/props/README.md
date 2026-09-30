# Props

## Connection
This topic connects React fundamentals to reusable interaction logic and then to the Hooks layer.

## What it is
Props are read-only parent inputs. A child can request changes by calling a callback supplied by the owner.

## Why it exists
The goal is predictable data flow. React should have a clear answer to **who owns this value, who can change it, and what causes the UI to update?**

## How it works
Think in snapshots and one-way data flow: a parent owns data, passes props down, and children report user intent through callbacks. Derived values are calculated rather than duplicated.

## Example
```tsx
function Example({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}
```

## Real frontend use
Use this for search fields, filters, forms, reusable controls, parent/child synchronization, and component APIs.

## Pitfalls
- Duplicating derived state.
- Mutating props/state.
- Lifting every piece of local state to the application root.
- Switching an input between controlled and uncontrolled.
- Passing unstable or overly generic component APIs.

## Interview reasoning
Explain ownership, update direction, render timing, and why the chosen state location is appropriate.

## Practical challenge
Build a parent-controlled filter component and a child preview. Add validation and explain exactly which component owns each value.

## Next connection
After fundamentals, connect this model to **rendering and Hooks**.

## Official reference
https://react.dev/
