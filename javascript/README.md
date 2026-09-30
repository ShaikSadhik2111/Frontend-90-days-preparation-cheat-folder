# JavaScript — Connected Interview Learning Path

This folder is designed to be learned **sequentially**. Do not treat JavaScript as 37 unrelated interview topics.

Each numbered folder builds on the previous mental model.

## Learning path

| # | Topic | Why it comes here |
|---|---|---|
| 01 | Fundamentals | Establish the JavaScript runtime mental model |
| 02 | Variables & Data Types | Understand values and bindings |
| 03 | Equality & Coercion | Understand how values interact |
| 04 | Strings | First important built-in value type |
| 05 | Arrays | Collections and iteration |
| 06 | Objects | Core reference/value model |
| 07 | Destructuring / Spread / Rest | Work with objects and collections |
| 08 | Functions | Functions are first-class values |
| 09 | Scope & Hoisting | Understand variable/function visibility |
| 10 | Execution Context | Understand how code executes |
| 11 | this | Understand call-site-dependent context |
| 12 | Closures | Connect functions with lexical scope |
| 13 | Prototypes | Understand JavaScript inheritance |
| 14 | Map / Set / WeakMap / WeakSet | Choose collection semantics |
| 15 | Symbols | Understand unique property keys |
| 16 | Higher-Order Functions | Functions operating on functions |
| 17 | Callbacks | Practical use of function values |
| 18 | Functional Programming | Compose predictable behavior |
| 19 | Currying | Transform multi-argument functions |
| 20 | Memoization | Reuse results and reason about caching |
| 21 | Promises | Model asynchronous completion |
| 22 | async / await | Write Promise control flow naturally |
| 23 | Async Error Handling | Handle failures across async chains |
| 24 | Error Handling | Build reliable synchronous/async code |
| 25 | Event Loop | Explain actual async execution order |
| 26 | Abort / Cancellation | Control long-running async work |
| 27 | Modules | Organize application code |
| 28 | CommonJS Interop | Understand Node/module compatibility |
| 29 | Dynamic Import | Load modules on demand |
| 30 | Generators / Iterators | Understand iteration protocols |
| 31 | Debouncing | Control high-frequency events |
| 32 | Throttling | Control execution frequency |
| 33 | Memory Management | Reason about references and retention |
| 34 | Garbage Collection | Understand automatic memory reclamation |
| 35 | Proxy / Reflect | Metaprogramming and interception |
| 36 | Polyfills | Understand missing platform features |
| 37 | Interview Questions | Connect and revise everything |

## The mental model

```text
Values
 ↓
Collections
 ↓
Objects / references
 ↓
Functions
 ↓
Scope
 ↓
Execution context
 ↓
this + closures
 ↓
Prototypes
 ↓
Higher-order functions
 ↓
Async callbacks
 ↓
Promises
 ↓
async/await
 ↓
Event loop
 ↓
Modules
 ↓
Performance / memory
 ↓
Advanced language features
 ↓
Interview problems
```

## How to study

For every folder:

1. Read **Connection from Previous Topic**.
2. Understand **Why This Topic Exists**.
3. Type every example yourself.
4. Predict output before running code.
5. Modify the example and predict again.
6. Complete the practical challenge.
7. Read **What This Unlocks Next**.
8. Explain the topic aloud in 2–3 minutes.
9. Move to the next numbered folder.

## One running frontend mental model

Use a realistic frontend application throughout:

```text
API data
→ objects / arrays
→ functions transform data
→ closures preserve state
→ higher-order functions compose behavior
→ promises represent API work
→ async/await consumes promises
→ event loop schedules continuations
→ modules organize the application
→ debouncing/throttling control UI events
→ memory management prevents retention problems
→ React/Angular can then build on these JavaScript fundamentals
```

## Important interview standard

Do not learn:

> "Promise is X, closure is Y, event loop is Z."

Learn:

> "Because JavaScript functions have lexical scope, closures can preserve state. Because API work completes asynchronously, Promises model eventual completion. Because Promise callbacks are scheduled by the runtime, the event loop determines when those callbacks execute."

That connected explanation is what makes the concepts stick.

Official MDN JavaScript Guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide


## What every topic must contain

This folder is not intended to be a glossary. Each topic should be learned at four levels:

1. **Concept** — what the JavaScript feature does and how the runtime behaves.
2. **Code example** — a small example you can type, run and modify.
3. **Real use case** — where the feature appears in frontend engineering, React/Angular applications, browser APIs, Node tooling, or performance work.
4. **Interview reasoning** — common pitfalls, output-prediction questions, trade-offs, complexity or implementation exercises where relevant.

### Study rule

For every folder, ask yourself:

> **What problem does this feature solve? When would I use it in a real frontend application? What can go wrong? Can I explain the runtime behavior without memorizing the answer?**

For example:

```text
Functions
  ↓
Closures
  ↓
Debounce / Throttle / Memoization
  ↓
Real UI behavior
```

and:

```text
Callbacks
  ↓
Promises
  ↓
async/await
  ↓
Event Loop
  ↓
AbortController
  ↓
Reliable API-driven UI
```

This is the standard for the JavaScript section going forward.
