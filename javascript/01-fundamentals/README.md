# JavaScript Fundamentals

This folder establishes the **mental model of JavaScript** before moving into deeper topics such as scope, closures, prototypes, promises and the event loop.

The goal is not to memorize syntax. For interviews, you should be able to take a small JavaScript program and explain **what happens, in what order, and why**.

---

## 1. What is JavaScript?

JavaScript is a high-level, dynamically typed, garbage-collected programming language standardized as **ECMAScript**.

Important distinction:

- **ECMAScript** = language specification.
- **JavaScript** = common name for implementations of ECMAScript.
- **JavaScript engine** = software that parses and executes JavaScript, such as V8, SpiderMonkey or JavaScriptCore.
- **Runtime / host environment** = engine plus APIs supplied by the environment, such as browser APIs or Node.js APIs.

JavaScript is commonly described as:

- dynamically typed
- prototype-based
- garbage-collected
- multi-paradigm
- single-threaded at the level of a normal JavaScript execution context
- capable of asynchronous/concurrent programming through the host environment and runtime mechanisms

Do not simplify this to "JavaScript is single-threaded, therefore it cannot do multiple things." The JavaScript execution model and the capabilities of the host environment are different concepts.

---

# 2. ECMAScript vs JavaScript

ECMAScript defines language behavior such as:

- variables
- functions
- objects
- classes
- promises
- modules
- operators
- control flow
- built-in objects
- syntax and semantics

The browser provides additional capabilities:

- DOM
- events
- timers
- Fetch
- Web Storage
- Web Workers
- WebSockets
- Service Workers

Node.js provides different host capabilities:

- filesystem
- networking
- processes
- streams
- timers
- worker threads
- server-side APIs

### Interview question

**Is setTimeout part of JavaScript?**

Not as a core ECMAScript language feature. The timer API is supplied by the host environment. The callback is eventually scheduled back into the JavaScript execution model.

---

# 3. JavaScript Engine

A JavaScript engine is responsible for executing JavaScript.

Examples:

| Environment | Engine |
|---|---|
| Chrome | V8 |
| Node.js | V8 |
| Firefox | SpiderMonkey |
| Safari | JavaScriptCore |

A simplified conceptual pipeline is:

```text
JavaScript Source
       |
       v
     Parse
       |
       v
      AST
       |
       v
Bytecode / compiled representation
       |
       v
Execution
       |
       v
Runtime optimization / JIT
```

Real engines are considerably more sophisticated. They may use multiple compilation tiers, inline caches, hidden classes/shapes and other optimizations.

**Interview rule:** describe this as a conceptual model rather than claiming every engine follows exactly the same pipeline.

---

# 4. Parsing and AST

Before executing code, an engine needs to understand its syntax.

Example:

```js
const total = price * quantity;
```

Conceptually:

```text
Source code
    |
    v
Tokenizer / Parser
    |
    v
AST
    |
    +---- declaration: total
    |
    +---- binary expression: *
             /       \
          price    quantity
```

The **Abstract Syntax Tree (AST)** represents the program's structure.

ASTs are useful for:

- compilers
- transpilers
- linters
- formatters
- Babel
- static analysis
- code transformation

---

# 5. Compilation and JIT

Modern JavaScript engines do more than simply interpret every line independently.

A simplified model:

```text
Source
  |
  v
Parse
  |
  v
Initial execution representation
  |
  v
Profile frequently executed code
  |
  v
Optimize hot code
  |
  v
Execute optimized code
  |
  v
Deoptimize if assumptions become invalid
```

**JIT** means **Just-In-Time compilation**.

For interviews, understand the idea:

> The engine can observe runtime behavior and optimize frequently executed code while the program is running.

Do not claim that JavaScript is "always interpreted" or "always compiled." Modern engines use sophisticated hybrid strategies.

---

# 6. JavaScript Runtime Mental Model

This is the most important diagram in this folder.

```text
                         JAVASCRIPT RUNTIME
                                |
                +---------------+---------------+
                |                               |
                v                               v
        JavaScript Engine                 Host Environment
                |                         Browser / Node.js
                |                               |
                v                               |
           Call Stack                           |
                |                               |
                +---------------+---------------+
                                |
                                v
                         Async operations
                                |
                    +-----------+-----------+
                    |                       |
                    v                       v
              Web/Host APIs           External I/O
              timers, fetch,           network, etc.
              DOM events
                    |
                    v
              Queues / scheduling
                    |
                    v
                Event Loop
                    |
                    v
                Call Stack
```

This explains why asynchronous JavaScript does not mean the JavaScript call stack itself is running several normal functions simultaneously.

---

# 7. Call Stack

The call stack tracks currently executing JavaScript function calls.

Example:

```js
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log("Hello");
}

first();
```

Conceptually:

```text
first()
  |
  +--> second()
          |
          +--> third()
```

At the deepest point:

```text
| third |
| second|
| first |
| global|
+-------+
```

When `third` returns, it is removed. Then `second`, then `first`.

### Stack overflow

Infinite or excessively deep recursion can exhaust the call stack:

```js
function recurse() {
  recurse();
}

recurse();
```

This eventually throws a stack-related error.

---

# 8. Execution Context

An **execution context** is the environment in which JavaScript code executes.

Common conceptual types:

- Global execution context
- Function execution context
- Module execution context

When a function is called, a function execution context is created.

It is associated with concepts such as:

- lexical environment
- variable environment
- bindings
- `this` where applicable
- code being executed

Example:

```js
const name = "Sadhik";

function greet() {
  const message = "Hello " + name;
  return message;
}

greet();
```

The function can resolve `name` through its lexical environment.

Execution context connects directly to:

- scope
- hoisting
- closures
- `this`
- call stack

These topics are covered in dedicated folders.

---

# 9. Scope

Scope answers:

> **Where can this variable be accessed?**

Main forms:

```text
Global / Module Scope
        |
        v
Function Scope
        |
        v
Block Scope
```

Example:

```js
const globalValue = 10;

function example() {
  const functionValue = 20;

  if (true) {
    const blockValue = 30;
    console.log(globalValue);
    console.log(functionValue);
    console.log(blockValue);
  }
}
```

`let` and `const` are block-scoped.

`var` is function-scoped.

Scope is lexical: the structure of the source code determines which outer variables a function can access.

---

# 10. Values and Types

JavaScript has primitive values and objects.

### Primitive types

- string
- number
- bigint
- boolean
- undefined
- symbol
- null

Everything else is an object value, including arrays and functions in the language model.

Example:

```js
const name = "Alex";
const age = 25;
const active = true;
const user = { name: "Alex" };
```

JavaScript is **dynamically typed**:

```js
let value = 10;
value = "hello";
value = true;
```

The variable binding does not have a fixed TypeScript-style static type.

---

# 11. Variables: var, let and const

### var

- function-scoped
- has legacy hoisting behavior
- can be redeclared in the same scope

### let

- block-scoped
- can be reassigned
- cannot be redeclared in the same scope
- has a Temporal Dead Zone before initialization

### const

- block-scoped
- binding cannot be reassigned
- object contents can still be mutated

Example:

```js
const user = {
  name: "Alex"
};

user.name = "Sam"; // allowed

// user = {}; // TypeError
```

Important:

> `const` protects the binding, not deep object immutability.

---

# 12. Expressions vs Statements

An **expression** produces a value.

```js
2 + 3
user.name
getUser()
```

A **statement** performs an action or controls execution.

```js
if (loggedIn) {
  showDashboard();
}
```

Some syntax can be both expression-oriented and used within larger expressions.

Understanding expressions helps with:

- callbacks
- arrow functions
- conditional expressions
- functional programming
- React JSX

---

# 13. Functions

Functions are first-class values.

That means they can be:

- assigned to variables
- passed as arguments
- returned from functions
- stored in objects/arrays

Example:

```js
function add(a, b) {
  return a + b;
}

const operation = add;

function execute(fn) {
  return fn(2, 3);
}

execute(operation); // 5
```

This concept leads directly to:

- callbacks
- higher-order functions
- closures
- functional programming
- React event handlers

---

# 14. Objects and References

Objects are mutable collections of properties.

```js
const user = {
  name: "Alex",
  age: 25
};
```

Two variables can reference the same object:

```js
const a = { count: 1 };
const b = a;

b.count = 2;

console.log(a.count); // 2
```

The variables do not contain independent object copies.

This distinction is fundamental for:

- React state
- immutability
- shallow comparison
- memoization
- Redux/Zustand
- caching

---

# 15. Equality

### Strict equality

```js
1 === 1;       // true
1 === "1";     // false
```

### Loose equality

```js
1 == "1";      // true
```

Loose equality applies JavaScript coercion rules.

For most application code, prefer `===` unless you intentionally need the semantics of `==`.

Important edge cases:

```js
NaN === NaN;        // false
Object.is(NaN, NaN); // true

0 === -0;            // true
Object.is(0, -0);    // false
```

---

# 16. Truthy and Falsy

Falsy values include:

```text
false
0
-0
0n
""
null
undefined
NaN
```

Everything else is truthy.

Example:

```js
if (user) {
  console.log("User exists");
}
```

Do not confuse:

```js
null
undefined
false
0
""
NaN
```

They are different values even though they are falsy.

---

# 17. Type Coercion

JavaScript can convert values implicitly.

Examples:

```js
"5" + 2; // "52"
"5" - 2; // 3
Boolean(""); // false
Number("10"); // 10
String(10); // "10"
```

The `+` operator is particularly important because it can perform string concatenation.

Interview questions frequently test coercion.

Do not memorize random output tables. Understand the conversion rules and reason through them.

---

# 18. JavaScript Is Prototype-Based

JavaScript objects can delegate property lookup through a prototype chain.

```text
object
  |
  v
prototype
  |
  v
prototype's prototype
  |
  v
Object.prototype
  |
  v
null
```

Example:

```js
const animal = {
  speak() {
    return "sound";
  }
};

const dog = Object.create(animal);

dog.speak(); // "sound"
```

Classes are built on top of JavaScript's prototype mechanism.

---

# 19. Garbage Collection

JavaScript automatically manages memory using garbage collection.

Conceptually:

```text
Create object
    |
    v
Object reachable?
    |
   yes ---> keep
    |
    no
    |
    v
Eligible for garbage collection
```

Modern engines use tracing-based strategies and sophisticated optimizations.

The key concept:

> An object cannot be collected while it remains reachable from roots through references.

Potential accidental retention can happen through:

- global variables
- long-lived caches
- event listeners
- timers
- closures
- subscriptions

Garbage collection does not make memory leaks impossible.

---

# 20. Asynchronous JavaScript

JavaScript can perform asynchronous work without blocking the main JavaScript execution path.

Example:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

The timer callback does not interrupt the currently executing synchronous code.

Typical output:

```text
A
C
B
```

The detailed scheduling mechanism is covered in the **event-loop** and **promises** folders.

---

# 21. Event Loop Mental Model

A simplified browser model:

```text
             JavaScript Engine
                    |
                    v
               Call Stack
                    |
                    |
             Host / Web APIs
             /      |       \
          timer    fetch    events
             \      |       /
                    v
              Scheduling
                    |
          +---------+---------+
          |                   |
          v                   v
   Microtask Queue       Task Queue
          |                   |
          +---------+---------+
                    |
                    v
                Event Loop
                    |
                    v
               Call Stack
```

Promise reactions are scheduled as microtasks.

Timers and many browser callbacks are associated with task scheduling.

A typical example:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

Typical browser output:

```text
A
D
C
B
```

You must be able to explain **why**, not just memorize the output.

---

# 22. Browser Rendering Connection

For frontend interviews, connect JavaScript execution to rendering:

```text
User interaction
      |
      v
Event callback
      |
      v
JavaScript
      |
      v
DOM / application state changes
      |
      v
Style calculation
      |
      v
Layout
      |
      v
Paint
      |
      v
Composite
      |
      v
Screen
```

Long-running JavaScript on the main thread can delay user interaction and rendering.

This is why performance topics such as:

- expensive loops
- unnecessary work
- layout thrashing
- long tasks
- excessive event handlers
- unnecessary rendering

matter to frontend engineers.

---

# 23. Browser vs Node.js

Both can execute JavaScript, but they provide different host APIs.

### Browser

```text
Browser
├── DOM
├── Window
├── Fetch
├── Storage
├── Timers
├── Web Workers
└── WebSockets
```

### Node.js

```text
Node.js
├── Filesystem
├── HTTP
├── Streams
├── Process
├── Timers
├── Worker Threads
└── Networking
```

The JavaScript language is not the same thing as the complete runtime environment.

---

# 24. Synchronous vs Asynchronous

### Synchronous

Operations execute in sequence:

```js
const a = 10;
const b = 20;
const c = a + b;
console.log(c);
```

### Asynchronous

Work completes later:

```js
setTimeout(() => {
  console.log("Later");
}, 1000);
```

Important:

**Asynchronous does not automatically mean parallel.**

Promises, timers and async/await provide asynchronous control flow; actual parallel work may involve browser capabilities, Web Workers, Node worker threads, operating-system I/O or other runtime mechanisms.

---

# 25. A Complete Execution Example

Consider:

```js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

function calculate() {
  console.log("4");
}

calculate();

console.log("5");
```

Reason through it:

### Step 1 — synchronous execution

```text
1
4
5
```

### Step 2 — microtasks

The Promise reaction runs:

```text
3
```

### Step 3 — timer task

The timer callback runs later:

```text
2
```

Final typical browser order:

```text
1
4
5
3
2
```

This one example connects:

- functions
- call stack
- synchronous execution
- promises
- microtasks
- timers
- event loop

---

# 26. The JavaScript Mental Model You Should Remember

When you see JavaScript code, reason through this sequence:

```text
1. What values exist?
        |
2. What scope can access them?
        |
3. What execution context is created?
        |
4. What goes onto the call stack?
        |
5. Is anything asynchronous?
        |
6. Which host API handles it?
        |
7. Which queue receives the continuation/callback?
        |
8. When does the event loop allow it onto the stack?
        |
9. Does rendering happen between relevant tasks?
        |
10. Could references remain in memory?
```

This is the foundation for senior frontend interviews.

---

# 27. Common Misconceptions

### "JavaScript is single-threaded, so the browser cannot do multiple things."

Incomplete.

The normal JavaScript execution context processes code sequentially, while the host environment can perform other work and expose concurrency mechanisms.

### "setTimeout(0) executes immediately."

No.

It schedules a callback for a later task; `0` is not a guarantee of immediate execution.

### "async makes a function run on another thread."

No.

`async` changes Promise-based control flow. It does not automatically create a worker thread.

### "const makes an object immutable."

No.

It prevents reassignment of the binding.

### "JavaScript is interpreted."

Too simplistic.

Modern engines use parsing, compilation, runtime profiling and optimization.

### "Garbage collection prevents memory leaks."

No.

Objects that remain reachable can still be retained unintentionally.

---

# 28. Interview Questions

### Q1. What is JavaScript?

**Answer:** JavaScript is a dynamically typed, garbage-collected, multi-paradigm programming language standardized as ECMAScript. It commonly runs inside a host environment such as a browser or Node.js.

### Q2. What is the difference between JavaScript and ECMAScript?

**Answer:** ECMAScript is the standardized language specification. JavaScript is the commonly used name for implementations of that language.

### Q3. What is a JavaScript engine?

**Answer:** A JavaScript engine parses and executes JavaScript code and performs runtime optimizations. Examples include V8, SpiderMonkey and JavaScriptCore.

### Q4. What is the difference between an engine and a runtime?

**Answer:** The engine executes JavaScript. A runtime combines the engine with host-provided capabilities such as DOM APIs in browsers or filesystem/network APIs in Node.js.

### Q5. Is JavaScript single-threaded?

**Answer:** Normal JavaScript execution on a given execution context uses a single call stack, but the host environment can provide asynchronous operations and additional concurrency mechanisms such as Web Workers or Node.js worker threads.

### Q6. Is setTimeout part of JavaScript?

**Answer:** The timer API is provided by the host environment. JavaScript receives the callback when the host schedules it for execution.

### Q7. What is an execution context?

**Answer:** It is the environment in which JavaScript code executes, including the lexical environment and execution state needed to resolve bindings and run the code.

### Q8. What is the call stack?

**Answer:** It is the stack of currently executing JavaScript function calls. New function calls are pushed onto it and completed calls are popped from it.

### Q9. What is an AST?

**Answer:** An Abstract Syntax Tree is a structured representation of source-code syntax created during parsing and used by tools and language implementations for analysis and transformation.

### Q10. What is JIT compilation?

**Answer:** Just-In-Time compilation is runtime compilation/optimization of code while the program executes. JavaScript engines can optimize frequently executed code based on observed behavior.

### Q11. What is the difference between synchronous and asynchronous execution?

**Answer:** Synchronous work executes as part of the current execution flow. Asynchronous work allows the current flow to continue and arranges a callback or continuation to run later.

### Q12. Does asynchronous JavaScript mean parallel execution?

**Answer:** No. Asynchronous scheduling and parallel execution are different concepts. Parallel work can be provided by mechanisms such as workers or runtime/OS capabilities.

### Q13. Why does this output happen?

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

**Answer:** Typically:

```text
A
D
C
B
```

Synchronous code runs first, Promise reactions are processed as microtasks, and the timer callback runs as a later task.

---

# 29. Practical Problems

## Problem 1 — Predict the execution order

Given:

```js
console.log("start");

Promise.resolve().then(() => {
  console.log("promise");
});

setTimeout(() => {
  console.log("timer");
}, 0);

console.log("end");
```

Expected typical browser output:

```text
start
end
promise
timer
```

Explain each step using:

- call stack
- microtask queue
- task queue
- event loop

---

## Problem 2 — Explain why this freezes the UI

```js
button.addEventListener("click", () => {
  const end = Date.now() + 5000;

  while (Date.now() < end) {
    // expensive synchronous work
  }
});
```

**Solution:** The handler occupies the JavaScript execution path for roughly five seconds. During that period, the main thread cannot promptly process other JavaScript work or rendering-related work. The UI becomes unresponsive.

A real solution would move expensive work off the main execution path where appropriate, break work into smaller chunks, optimize the computation, or use a Worker for suitable CPU-heavy processing.

---

## Problem 3 — Find the reference retention

```js
const cache = [];

function addData() {
  const hugeObject = createHugeObject();
  cache.push(hugeObject);
}
```

**Solution:** If `cache` remains globally reachable and entries are never removed, the objects remain reachable and cannot be garbage-collected.

The fix depends on the use case:

- implement cache eviction
- remove obsolete entries
- use appropriate weak references where semantics allow
- avoid retaining unnecessary data

---

# 30. Final Revision Checklist

Before moving to advanced JavaScript, you should be able to explain these without notes:

- [ ] ECMAScript vs JavaScript
- [ ] JavaScript engine
- [ ] Runtime vs engine
- [ ] Browser vs Node.js
- [ ] Parsing
- [ ] AST
- [ ] Compilation
- [ ] JIT
- [ ] Execution context
- [ ] Lexical environment
- [ ] Scope
- [ ] Call stack
- [ ] Primitive vs object values
- [ ] var / let / const
- [ ] Expressions vs statements
- [ ] Functions as first-class values
- [ ] Object references
- [ ] Equality
- [ ] Type coercion
- [ ] Truthy/falsy
- [ ] Prototype-based model
- [ ] Garbage collection
- [ ] Synchronous vs asynchronous execution
- [ ] Host APIs
- [ ] Microtasks vs tasks
- [ ] Event loop
- [ ] Browser rendering connection
- [ ] Why long JavaScript blocks UI
- [ ] Why async does not automatically mean parallel

## The one explanation you should be able to give in an interview

If an interviewer asks:

> "Explain how JavaScript works."

A strong answer should connect the entire chain:

```text
JavaScript source
      ↓
Parser / AST
      ↓
JavaScript engine
      ↓
Execution contexts
      ↓
Call stack
      ↓
Synchronous execution
      ↓
Host APIs for asynchronous work
      ↓
Microtask / task scheduling
      ↓
Event loop
      ↓
Call stack
      ↓
Browser rendering
```

Once you understand this chain, individual topics such as closures, promises, async/await, `this`, React rendering and frontend performance become much easier to reason about.
