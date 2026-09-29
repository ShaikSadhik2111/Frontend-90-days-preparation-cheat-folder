# Execution Context

An execution context is the environment in which JavaScript code executes.

## Main types
- Global execution context
- Function execution context
- Module execution context

A function call creates a new function execution context.

## Conceptual components
An execution context tracks things such as:
- Lexical environment
- Variable environment
- Current function/code state
- `this` binding where applicable

The exact engine implementation is an optimization detail; the useful interview model is that bindings are established and code executes within a lexical environment.

## Call stack
Function calls are pushed onto the stack and removed when they return.

```js
function a() { b(); }
function b() { c(); }
function c() {}
a();
```

The stack grows as `a → b → c` execute and unwinds afterward.

## Key connection
Execution context + lexical environments explain scope and closures. The call stack explains synchronous execution order. The event loop explains how asynchronous callbacks are scheduled later.
