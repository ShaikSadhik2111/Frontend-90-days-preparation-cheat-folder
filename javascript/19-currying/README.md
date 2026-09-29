# Currying

Currying transforms a function with multiple arguments into a sequence of single-argument calls.

```js
const add = a => b => a + b;
add(2)(3); // 5
```

## Why useful
- Partial application
- Reusable configured functions
- Functional composition

## Partial application
Partial application fixes some arguments of a function. Currying specifically transforms argument structure into unary function steps.

## Interview exercise
Implement a generic curry function supporting a function's expected arity and multiple supplied arguments per call.
