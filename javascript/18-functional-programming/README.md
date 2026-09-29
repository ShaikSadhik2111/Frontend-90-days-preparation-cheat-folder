# Functional Programming

Functional programming emphasizes composing behavior using functions and minimizing unintended mutation.

## Core ideas
- Pure functions
- Immutability
- First-class functions
- Higher-order functions
- Function composition
- Declarative transformations

## Example
```js
const activeNames = users
  .filter(user => user.active)
  .map(user => user.name);
```

## Benefits
- Easier testing
- Predictable transformations
- Reusable logic
- Reduced shared mutable state

JavaScript is multi-paradigm, so functional programming is a style rather than a requirement to eliminate every mutation.
