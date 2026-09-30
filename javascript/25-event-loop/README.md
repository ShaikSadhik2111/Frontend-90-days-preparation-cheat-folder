# 25 — Event Loop

JavaScript executes synchronous code on the call stack. Host APIs handle external work and later schedule callbacks through task/microtask mechanisms.

## Predict the output
    console.log("A");
    setTimeout(() => console.log("B"), 0);
    Promise.resolve().then(() => console.log("C"));
    console.log("D");

Typical browser output: A, D, C, B.

Why: synchronous code finishes first; the Promise reaction is a microtask; the timer callback is a later task.

## Microtasks
Common examples are Promise reactions and queueMicrotask.
    queueMicrotask(() => console.log("microtask"));

## Why frontend engineers care
This explains Promise vs timer ordering, async/await continuation, UI responsiveness, debounce/throttle behavior and why long synchronous loops block the main thread.

## Blocking example
    const start = Date.now();
    while (Date.now() - start < 3000) {}

For CPU-heavy work, Web Workers may be appropriate.

**Interview warning:** distinguish the JavaScript execution context from browser/Node host capabilities and worker threads.

## Deeper learning standard

### Scheduling model

```text
Synchronous code
      ↓
Call stack becomes empty
      ↓
Microtasks are processed
      ↓
Host proceeds with the next task/rendering opportunity
```

Promise reactions and queueMicrotask are microtasks. Timers are scheduled as tasks. Exact scheduling is host-specific, so avoid treating simplified diagrams as the complete browser specification.

### Output prediction

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

Typical browser order: A, D, C, B.

### Frontend impact

A long synchronous loop can freeze input and rendering even when the application uses Promises. For CPU-heavy work, consider Web Workers.

### Practical challenge

Create five output-prediction snippets involving timers, Promise.then, queueMicrotask and async/await. Explain every result from the scheduling model.

**What this unlocks:** cancellation lets frontend code stop or invalidate asynchronous work.
