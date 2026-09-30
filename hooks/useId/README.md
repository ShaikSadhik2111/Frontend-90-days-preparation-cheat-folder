# use Id

## Connection
Hooks extend the component/rendering model. Learn the rules first, then understand what each Hook owns and what causes it to run.

## What it is
useId generates stable unique IDs useful for connecting labels, inputs, and other accessibility relationships.

## Why it exists
Hooks let function components participate in React state, effects, context, refs, external stores, and rendering priorities without class lifecycle APIs.

## How it works
A Hook participates in React's render process. Its call order must remain stable, and its inputs/dependencies determine when React needs to reuse or re-run related work.

## Example
```tsx
function Example() {
  const value = useSomething();
  return null;
}
```

## Real frontend use
Use this concept for reusable interaction logic, subscriptions, async UI, accessibility IDs, shared configuration, or performance-sensitive rendering.

## Pitfalls
- Calling Hooks conditionally or inside loops.
- Using Effects for calculations that belong in render.
- Omitting real dependencies.
- Using memoization for correctness instead of performance.
- Treating refs as replacement state.

## Interview reasoning
Explain what React stores across renders, what causes the Hook's work to run again, and why the Hook rules exist.

## Practical challenge
Implement a small custom Hook that uses this concept, then explain its lifecycle across two renders.

## Next connection
Continue into **state ownership, forms, and data fetching**, where Hook decisions become application architecture.

## Official reference
https://react.dev/reference/react/hooks
