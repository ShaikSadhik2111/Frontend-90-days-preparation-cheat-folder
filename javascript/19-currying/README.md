# 19 — Currying

Currying transforms a function that conceptually accepts multiple arguments into a sequence of function calls.

## 1. Basic example

```js
const add = a => b => a + b;

console.log(add(2)(3)); // 5
```

The first call returns a function that remembers `a`.

## 2. Practical use: configuration

```js
const createLogger = level => message =>
  `[${level}] ${message}`;

const info = createLogger("INFO");

info("User loaded");
info("Request completed");
```

The configured function can be reused.

## 3. Currying vs partial application

Currying:

```js
add(2)(3)
```

Partial application:

```js
function multiply(a, b) {
  return a * b;
}

const double = value => multiply(2, value);
```

Partial application fixes some arguments. Currying changes the function into sequential calls.

## 4. Why it matters

Currying can help with:

- reusable configuration
- composition
- dependency injection
- functional utility libraries

It is less common in ordinary frontend business code than callbacks, closures and array methods, but it is a common interview topic.

## Interview exercise

Given:

```js
function add(a, b, c) {
  return a + b + c;
}
```

build:

```js
curry(add)(1)(2)(3); // 6
```

A production-quality generic curry implementation must define how it handles multiple arguments per call, arity and edge cases.

**Next:** memoization applies closures to caching computed results.