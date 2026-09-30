# use Callback

## Connection
Hooks extend the component/rendering model. Learn the Rules of Hooks first, then understand each Hook's ownership and timing.

## What it is
useCallback caches a function identity between renders when dependencies are unchanged.

## Why it exists
Hooks let function components participate in state, effects, context, refs, external stores, and rendering priorities.

## How it works
A Hook participates in React's render model. Call order must stay stable, and dependencies determine when related work can be reused or must run again.

## Example
```tsx
function Example() {
  const value = useState(0);
  return null;
}
```

## Real frontend use
Use this for reusable interaction logic, subscriptions, async UI, accessibility, shared configuration, and responsive rendering.

## Pitfalls
- Calling Hooks conditionally or in loops.
- Using Effects for calculations that belong in render.
- Omitting real dependencies.
- Treating memoization as correctness.
- Using refs when rendered state is required.

## Interview reasoning
Explain what persists across renders, what triggers the Hook's work, why the Rules of Hooks exist, and what cleanup or dependency behavior matters.

## Practical challenge
Implement a small custom Hook using this concept and explain its behavior across two renders and an unmount.

## Connection to next topic
Continue into **state management, forms, and data fetching**, where Hook choices become application architecture.

## Official reference
https://react.dev/reference/react/hooks


## Deep reasoning
useCallback preserves a function reference while its dependencies remain unchanged. Its value is reference stability when a memoized child or dependency-sensitive Hook benefits from it.

### Pitfalls
Incorrect dependencies create stale closures. Wrapping every callback adds complexity without necessarily improving performance. State colocation can sometimes be a better optimization than callback memoization.

### Interview drill
Compare a plain callback, useCallback, React.memo, and moving state closer to the child. Explain when each changes observable work.