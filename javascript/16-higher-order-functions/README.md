# 16 — Higher-Order Functions

A higher-order function (HOF) either:

1. accepts a function,
2. returns a function,
3. or does both.

## 1. Passing a function

```js
function calculate(a, b, operation) {
  return operation(a, b);
}

const multiply = (a, b) => a * b;

calculate(4, 5, multiply); // 20
```

## 2. Returning a function

```js
function withPrefix(prefix) {
  return message => `${prefix}: ${message}`;
}

const logInfo = withPrefix("INFO");

logInfo("User loaded");
```

This uses a closure internally.

## 3. Wrapper/decorator pattern

```js
function withLogging(fn) {
  return (...args) => {
    console.log("Calling function");
    const result = fn(...args);
    console.log("Finished");
    return result;
  };
}
```

### Real use cases

- logging
- authorization
- retries
- metrics
- middleware
- event handlers
- reusable UI behavior

## 4. Function composition

```js
const trim = value => value.trim();
const lower = value => value.toLowerCase();

const normalize = value => lower(trim(value));

normalize("  REACT  "); // "react"
```

HOFs make these transformations reusable.

## 5. Array methods are HOFs

```js
users
  .filter(user => user.active)
  .map(user => user.name);
```

`filter` and `map` receive functions.

## Interview question

**Why are HOFs important in React?**

Components and hooks frequently receive callbacks, event handlers, selectors and render functions. Understanding HOFs makes those patterns much easier to reason about.

**Next:** callbacks are the concrete pattern of supplying a function for later execution.