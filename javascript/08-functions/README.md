# Functions

Functions are first-class values: they can be assigned, passed, returned and stored.

## Forms
- Function declaration
- Function expression
- Arrow function
- Method
- Constructor function

## Parameters
JavaScript supports default parameters, rest parameters and destructuring.

```js
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
```

## First-class functions
```js
function createMultiplier(factor) {
  return value => value * factor;
}
```

## Pure functions
A pure function produces the same output for the same inputs and has no observable side effects.

Pure functions are easier to test and reason about.

## Pitfalls
- Confusing function declaration hoisting with function expression initialization
- Losing `this` when passing methods
- Mutating arguments or captured state unexpectedly
