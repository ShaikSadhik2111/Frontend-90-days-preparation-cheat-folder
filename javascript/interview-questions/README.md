# JavaScript Interview Questions — With Answers

## Fundamentals

### 1. What is the difference between primitive and reference values?
**Answer:** Primitive values represent immutable values such as strings, numbers and booleans. Objects, including arrays and functions, are object values and variables hold references to them.

**Example:**
```js
let a = 1, b = a;
b = 2; // a remains 1

const x = {}, y = x;
y.name = "Sam"; // x.name also exists
```

### 2. What is hoisting?
**Answer:** During execution-context setup, JavaScript creates bindings before executing statements. Function declarations can be initialized for use before their source position; `var` is initialized to `undefined`; `let`, `const` and class bindings remain unavailable in the TDZ until initialization.

### 3. What is a closure?
**Answer:** A closure is a function together with access to its lexical environment, allowing it to use variables from an outer scope even after that outer function has returned.

### 4. How is `this` determined?
**Answer:** For ordinary functions it primarily depends on the call form: method call, constructor call, explicit binding or plain call. Arrow functions capture `this` lexically.

### 5. What is the prototype chain?
**Answer:** If a property is not found on an object, JavaScript looks for it on the object's prototype and continues until the chain reaches `null`.

### 6. What is the event loop?
**Answer:** Synchronous JavaScript runs on the call stack. Host environments schedule asynchronous work and callbacks through task/microtask mechanisms. Promise reactions are microtasks and commonly run before the next task.

### 7. What is the difference between Promise.all and Promise.allSettled?
**Answer:** `Promise.all` fulfills only when all inputs fulfill and rejects when one rejects. `Promise.allSettled` waits for every input and returns each fulfillment/rejection result.

### 8. Does async/await block JavaScript?
**Answer:** No. `await` suspends the current async function's continuation until the promise settles; it does not block the entire JavaScript runtime.

### 9. What is the difference between debounce and throttle?
**Answer:** Debounce waits until calls stop for a period before running. Throttle limits execution frequency while calls continue.

### 10. What is memoization?
**Answer:** Memoization caches results for repeated inputs, trading memory and cache-management complexity for reduced computation.

### 11. What is the difference between shallow and deep copy?
**Answer:** A shallow copy duplicates the outer object but preserves references to nested objects. A deep copy recursively creates independent nested values according to the cloning mechanism.

### 12. Why is 0.1 + 0.2 not exactly 0.3?
**Answer:** JavaScript numbers use IEEE-754 binary floating-point representation, and many decimal fractions cannot be represented exactly in binary.

### 13. What is the difference between == and ===?
**Answer:** `===` performs strict comparison without the normal type coercion of `==`. `==` applies JavaScript's coercion rules before comparison.

### 14. What is the difference between null and undefined?
**Answer:** `undefined` generally represents an absent/uninitialized value, while `null` is an explicit empty value chosen by application code or APIs. They are distinct values.

### 15. Why does typeof null return object?
**Answer:** It is a historical language-design behavior preserved for web compatibility.

## Advanced

### 16. What is the difference between Map and Object?
**Answer:** Map is a dedicated key/value collection supporting keys of any type, explicit size, iteration and collection-oriented APIs. Objects are general records with prototype behavior and string/symbol property keys.

### 17. Why use WeakMap?
**Answer:** WeakMap allows object keys to be weakly held, so metadata associated with an object does not by itself prevent garbage collection.

### 18. What are generators?
**Answer:** Generators are functions that can pause at `yield` and resume later, producing an iterator. They are useful for lazy sequences and custom iteration.

### 19. What is a Symbol?
**Answer:** Symbol is a unique primitive commonly used for non-colliding property keys and language protocols such as `Symbol.iterator`.

### 20. What does Proxy do?
**Answer:** Proxy intercepts operations on an object through traps such as `get` and `set`, enabling controlled customization of object behavior.

### 21. Why can a JavaScript application have a memory leak despite garbage collection?
**Answer:** Garbage collection only removes unreachable objects. If application code accidentally retains references through listeners, timers, global caches or closures, the objects remain reachable and cannot be collected.

### 22. Can Promises be cancelled?
**Answer:** A Promise itself does not provide cancellation. An underlying API can expose cancellation, such as fetch using AbortController.

### 23. How would you prevent stale search results?
**Answer:** Debounce input to reduce requests and then use cancellation or request/version identity checks so an obsolete response cannot overwrite a newer result.

### 24. What is the difference between currying and partial application?
**Answer:** Currying transforms a multi-argument function into a sequence of unary functions. Partial application fixes some arguments and returns a function for the remaining arguments.

### 25. Why is array sort tricky?
**Answer:** Default sort compares string representations, so numeric sorting requires a comparator such as `(a, b) => a - b`. Sort also mutates the array.

### 26. What happens when a method is passed as a callback?
**Answer:** The original receiver is not automatically preserved for an ordinary function. Calling the detached function can change or lose `this`. Binding or an arrow wrapper can preserve the intended context.

### 27. What is the difference between ESM and CommonJS?
**Answer:** ESM uses `import/export` and has standardized module semantics. CommonJS uses `require/module.exports`. Node supports both with different resolution and interop rules.

### 28. What is a polyfill?
**Answer:** A polyfill is an implementation that provides a platform feature to environments where that feature is unavailable.

### 29. How would you implement Promise.all conceptually?
**Answer:** Convert inputs to promises, preserve input order, track how many have fulfilled, store each result at its original index, resolve when all fulfill, and reject immediately when a promise rejects.

### 30. What JavaScript topics should a senior frontend engineer be able to explain deeply?
**Answer:** Scope/closures, execution context, this, prototypes, asynchronous execution, promises/event loop, memory, browser APIs, modules, immutability, functional patterns, performance and common implementation exercises such as debounce, throttle, memoization and Promise utilities.

## Practical interview problems

### Problem 1 — Implement debounce
**Solution:** Maintain a timer in a closure, clear the previous timer on every call, and schedule the latest invocation after the delay.

### Problem 2 — Implement throttle
**Solution:** Track the last execution time or a pending timer and prevent execution until the configured interval has elapsed. Explicitly decide leading/trailing behavior.

### Problem 3 — Implement memoize
**Solution:** Keep a cache in a closure, derive a reliable key for the function's input domain, return cached values when present, otherwise calculate/store/return.

### Problem 4 — Implement Promise.all
**Solution:** Wrap each input with Promise.resolve, allocate a results array, track remaining promises, write each result by original index, reject on the first rejection, and resolve when the count reaches zero.

### Problem 5 — Explain this output
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

**Solution:** In a typical browser environment the output is `A D C B`: synchronous logs run first, the Promise reaction is a microtask, and the timer callback is a later task.

## Final revision checklist

- [ ] Scope and TDZ
- [ ] Execution context
- [ ] Closures
- [ ] this
- [ ] Prototypes
- [ ] Objects/arrays
- [ ] Promises
- [ ] async/await
- [ ] Event loop
- [ ] Modules
- [ ] Memory/GC
- [ ] Debounce/throttle
- [ ] Currying/memoization
- [ ] Polyfills
- [ ] Iterators/generators
- [ ] Map/Set/WeakMap/WeakSet
- [ ] Proxy/Reflect
- [ ] Async cancellation
- [ ] Senior-level interview explanations
