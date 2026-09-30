# 10 — Execution Context

## Mental model

An execution context is the conceptual environment in which JavaScript code executes.

Common contexts:

- global execution context
- function execution context
- module execution context

## 1. Function call

```js
function calculate(a, b) {
  const total = a + b;
  return total;
}

calculate(10, 20);
```

Calling `calculate` creates a function execution context with bindings such as `a`, `b`, and `total`.

## 2. Call stack

Synchronous calls form a stack:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  console.log("done");
}

a();
```

Conceptually:

```text
c()
b()
a()
global
```

As functions return, the stack unwinds.

## 3. Scope connection

Execution context works with lexical environments to resolve identifiers.

```js
const tax = 0.18;

function priceWithTax(price) {
  return price * (1 + tax);
}
```

The function can resolve `tax` through its outer lexical environment.

## 4. Execution context vs call stack

Do not treat them as the same thing.

- **Execution context**: conceptual environment for executing code.
- **Call stack**: runtime structure tracking active synchronous calls.

A function execution context is associated with a stack frame while the function is executing.

## 5. Real frontend debugging use

When a stack trace says:

```text
handleClick
  -> submitForm
  -> validateForm
  -> formatPayload
```

you can read it as the chain of active function calls that led to the error.

Understanding the stack makes browser debugging much easier.

## 6. Connection to hoisting

Execution-context setup is why different declaration types behave differently before their source line executes.

## 7. Connection to closures

When a function is created, its lexical environment determines what outer variables it can later access.

That concept is covered in closures.

## Interview checklist

- execution context
- lexical environment
- call stack
- global/function/module context
- setup vs execution
- scope connection
- closure connection

**Next:** `this` is a separate call-context rule and should not be confused with lexical scope.