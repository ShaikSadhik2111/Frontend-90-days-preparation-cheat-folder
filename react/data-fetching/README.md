# Data Fetching

## Connection
This topic extends the React rendering model into production data and application architecture.

## What it is
Data fetching coordinates loading, success, error, cancellation, freshness, caching, and invalidation.

## Why it exists
Large applications fail when ownership, caching, permissions, or module boundaries are implicit. This topic makes those decisions explicit.

## How it works
Classify the concern first: local UI state, shared client state, server state, URL state, identity, or authorization. Then define the smallest boundary that owns it.

## Example
```tsx
function FeatureView({ data, onSave }) {
  return <button onClick={onSave}>{data ? "Save" : "Create"}</button>;
}
```

## Real frontend use
Use this for dashboards, multi-screen workflows, shopping carts, authentication flows, feature modules, and reusable application infrastructure.

## Pitfalls
- Putting every value in global state.
- Copying server state into local state without a reason.
- Treating client permission checks as security.
- Creating shared abstractions before real reuse exists.
- Mixing domain logic and rendering responsibilities without a boundary.

## Interview reasoning
Explain ownership, dependency flow, caching or security implications, testability, and the trade-offs of the chosen architecture.

## Practical challenge
Take one application feature and identify its data owner, API boundary, UI boundary, loading/error states, and test boundary.

## Connection to next topic
Next, connect these decisions to **forms, error handling, performance, and interview scenarios**.

## Official reference
https://react.dev/
