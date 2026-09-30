# Zustand

## Connection
This topic connects React's rendering model to scalable state ownership or reliable verification.

## What it is
Zustand is a small external store where components subscribe to selected slices of shared client state.

## Why it exists
The goal is predictable behavior. State libraries should solve a sharing problem; tests should verify behavior that matters to users and system boundaries.

## How it works
Classify the state or test boundary first, then choose the smallest mechanism. For tests, prefer inputs and observable outputs over implementation details.

## Example
```tsx
const count = useStore(state => state.count);
```

## Real frontend use
Apply this to multi-screen workflows, shared filters, shopping carts, editors, and critical user journeys.

## Pitfalls
- Putting every value into global state.
- Mixing server cache with client state.
- Testing internal implementation rather than behavior.
- Mocking so much that the test no longer resembles the real workflow.
- Choosing a state library before identifying the ownership problem.

## Interview reasoning
Explain why the state belongs in this boundary, how updates propagate, what causes consumers to render, and what your test proves.

## Practical challenge
Build a small feature, write a user-facing test for the critical flow, then explain what would fail if the state ownership or API contract changed.

## Connection to next topic
Continue toward **Accessibility, Modern React, Advanced React, and Architecture**, then use this knowledge in interview scenarios.

## Official reference
https://react.dev/
