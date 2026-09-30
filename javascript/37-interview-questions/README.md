# 37 — JavaScript Interview Questions

This folder is the final revision layer. Do not memorize one-line definitions. For each question, explain the concept, show a small example, give a frontend use case, and mention one pitfall.

## Fundamentals

### 1. Primitive vs object values
Primitives are immutable values. Objects are reference values. This affects equality, mutation and state updates.

    const a = { count: 1 };
    const b = a;
    b.count++;
    console.log(a.count); // 2

**Use case:** understand why direct mutation can affect shared frontend state.

### 2. var, let and const
- var: function scoped.
- let/const: block scoped.
- let/const bindings are unavailable in the TDZ before initialization.
- const prevents rebinding, not object mutation.

### 3. Closure
A function retains access to its lexical environment.

    function counter() {
      let count = 0;
      return () => ++count;
    }

**Use cases:** private state, callbacks, memoization, debounce and React hooks.

### 4. this
Ordinary function this depends on the call form. Arrow functions capture this lexically.

### 5. Prototype chain
If a property is not found on the object, JavaScript searches its prototype chain.

### 6. Event loop
Synchronous code runs first. Promise reactions are microtasks; timers and many browser callbacks are scheduled as tasks.

### 7. Promise.all vs allSettled
Promise.all fails fast on rejection. Promise.allSettled waits for every input.

### 8. async/await
async returns a Promise. await suspends the current async function's continuation; it does not block the whole runtime.

### 9. Debounce vs throttle
Debounce waits for inactivity. Throttle limits execution frequency during continuous activity.

### 10. Memoization
Cache results for repeated inputs, trading memory and cache-management complexity for computation time.

## Data and language mechanics

### 11. Shallow vs deep copy
A shallow copy creates a new outer object while nested references remain shared.

### 12. == vs ===
=== does not perform the normal coercion of ==. Prefer === for predictable application logic.

### 13. null vs undefined
undefined commonly means missing/uninitialized; null is an explicit empty value. They are distinct.

### 14. Why is 0.1 + 0.2 not exactly 0.3?
JavaScript Number uses IEEE-754 binary floating point, so many decimal fractions cannot be represented exactly.

### 15. Why is typeof null object?
Historical behavior preserved for web compatibility.

## Collections and objects

### 16. Map vs Object
Map is a collection with arbitrary key types, size and collection-oriented iteration. Object is usually better for record-like domain data.

### 17. Why WeakMap?
It allows object keys to be weakly held, useful for metadata tied to object lifetime.

### 18. Set use case
Use Set for uniqueness and fast membership semantics, such as selected IDs.

### 19. Symbol
A unique primitive commonly used as a non-string property key and for language protocols such as Symbol.iterator.

## Async and browser-facing problems

### 20. Can Promises be cancelled?
Not directly. APIs such as fetch can support cancellation through AbortController.

### 21. Prevent stale search results
Debounce input, then use AbortController or request/version identity so obsolete results cannot overwrite newer state.

### 22. Why can async code still make the UI freeze?
A long synchronous computation blocks the main JavaScript thread even if the application also uses Promises.

### 23. Why use dynamic import?
To defer loading optional/heavy code, often enabling route-level lazy loading and code splitting.

## Advanced

### 24. Generators
Generators pause at yield and produce iterators. Useful for lazy sequences and custom iteration.

### 25. Proxy
Proxy intercepts object operations such as get and set. Useful for validation, reactivity and instrumentation.

### 26. Polyfill
A runtime implementation for a missing platform feature. Interview implementations should mention important specification edge cases.

### 27. Memory leak despite GC
GC removes unreachable objects. A leak occurs when application code unintentionally keeps objects reachable through listeners, timers, caches or closures.

## Practical coding questions

### Implement debounce
Keep a timer in a closure, clear it on every call, and schedule the latest call after the delay. Decide whether cancel/flush behavior is required.

### Implement throttle
Track execution time and/or a pending timer. Explicitly define leading and trailing behavior.

### Implement memoize
Keep a cache in a closure and define a reliable key strategy for the input domain.

### Implement Promise.all
Convert inputs with Promise.resolve, preserve original indexes, count fulfilled results, reject on the first rejection and resolve after all fulfill.

### Implement curry
Track the target function's arity and accumulate supplied arguments until enough arguments exist to invoke the function.

## Output prediction practice

    console.log("A");
    setTimeout(() => console.log("B"), 0);
    Promise.resolve().then(() => console.log("C"));
    console.log("D");

Typical browser output: A, D, C, B.

Explain the result using synchronous execution, microtasks and tasks instead of memorizing the output.

## Senior frontend scenario questions

### Search API fires too many requests. What do you do?
Debounce input, cancel obsolete requests where supported, protect against stale responses, show loading/error state, and consider server-side rate limits.

### React state appears not to update correctly.
Check mutation vs immutable updates, reference identity, stale closures, batching and whether the component actually reads the changed value.

### Page becomes slow after navigating repeatedly.
Inspect retained objects, listeners, timers, subscriptions and caches. Use browser heap snapshots and performance tooling rather than guessing.

### Dashboard takes too long to load.
Identify independent requests and run them concurrently where safe, lazy-load heavy features, reduce initial JavaScript and measure before/after.

## Final revision checklist

- [ ] values and types
- [ ] equality and coercion
- [ ] arrays and objects
- [ ] destructuring/spread/rest
- [ ] functions
- [ ] scope/hoisting
- [ ] execution context
- [ ] this
- [ ] closures
- [ ] prototypes
- [ ] Map/Set/WeakMap/WeakSet
- [ ] Symbols
- [ ] HOFs/callbacks
- [ ] functional programming
- [ ] currying/memoization
- [ ] Promises
- [ ] async/await
- [ ] async errors
- [ ] event loop
- [ ] cancellation
- [ ] modules
- [ ] dynamic import
- [ ] generators/iterators
- [ ] debounce/throttle
- [ ] memory/GC
- [ ] Proxy/Reflect
- [ ] polyfills
- [ ] practical implementation questions