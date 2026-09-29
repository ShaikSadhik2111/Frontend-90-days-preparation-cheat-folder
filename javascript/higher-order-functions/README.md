# Higher-Order Functions

A higher-order function accepts a function, returns a function, or both.

Examples include `map`, `filter`, `reduce`, event handlers and function factories.

```js
function withLogging(fn) {
  return (...args) => {
    console.log(args);
    return fn(...args);
  };
}
```

## Why important
Higher-order functions support:
- Composition
- Reusable behavior
- Middleware
- Decorator-like patterns
- Functional programming
- React callbacks

## Interview exercise
Implement a reusable `compose` function that combines functions from right to left.

Key concern: define the expected argument/return contract before implementing.
