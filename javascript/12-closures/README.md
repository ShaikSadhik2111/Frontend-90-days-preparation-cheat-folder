# 12 — Closures

## Core idea

A closure is a function together with access to the lexical environment where it was created.

That means a function can continue using outer variables after the outer function has returned.

## 1. Basic closure

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
```

`count` remains reachable because the returned function still references it.

## 2. Why closures are useful

Closures are used for:

- private state
- function factories
- callbacks
- memoization
- event handlers
- debouncing/throttling
- React hooks
- module-level encapsulation

## 3. Function factory

```js
function createFormatter(currency) {
  return price => `${currency} ${price.toFixed(2)}`;
}

const formatINR = createFormatter("₹");

formatINR(499); // ₹ 499.00
```

The returned function remembers `currency`.

## 4. Practical frontend example

A configurable validator:

```js
function createMinLengthValidator(min) {
  return value => value.length >= min;
}

const passwordValidator = createMinLengthValidator(8);

passwordValidator("hello");      // false
passwordValidator("password123"); // true
```

## 5. Loop closure

With `let`:

```js
const callbacks = [];

for (let i = 0; i < 3; i++) {
  callbacks.push(() => i);
}

console.log(callbacks.map(fn => fn()));
// [0, 1, 2]
```

Each iteration has the appropriate binding semantics.

## 6. Closure and memory

Closures can retain referenced values.

```js
function createHandler(largeData) {
  return () => console.log(largeData.id);
}
```

If the handler lives for a long time, `largeData` may remain reachable too.

Do not avoid closures; instead avoid unnecessarily capturing huge objects or retaining handlers longer than needed.

## Interview explanation

> A closure lets a function retain access to variables from its lexical environment after the outer function has finished.

### Common question

**Is closure a special object?**

Think of it as a behavior/property of function creation and lexical environments, not as a JavaScript class called Closure.

**Next:** prototypes explain property lookup and inheritance.