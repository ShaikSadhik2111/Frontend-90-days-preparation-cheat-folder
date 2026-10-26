# JavaScript — interview revision sheet (+ output-prediction drill)

> Every interviewer at Siemens, Honeywell, Continental, Walmart, Target etc. opens with JS.
> If you cannot predict output and explain *why*, React knowledge will not save you.
> Rule: for every section, run the snippets in Node/Chrome console and **say the answer out loud before running**.

---

## 1. Types, values and coercion

**8 types:** `undefined`, `null`, `boolean`, `number`, `bigint`, `string`, `symbol` (primitives) and `object` (everything else: arrays, functions, dates…).

- Primitives are **immutable** and compared **by value**. Objects are compared **by reference**.
- `typeof null === "object"` (historic bug). `typeof function(){} === "function"`. `typeof [] === "object"` → use `Array.isArray`.
- `NaN !== NaN` → use `Number.isNaN(x)` (not global `isNaN`, which coerces: `isNaN("abc") === true`).
- `Object.is(NaN, NaN) === true`, `Object.is(0, -0) === false`.

### `==` vs `===`
`===` never converts. `==` follows the Abstract Equality algorithm:
1. `null == undefined` → `true` (and they equal nothing else).
2. number vs string → string converted to number.
3. boolean vs anything → boolean converted to number **first** (`true → 1`).
4. object vs primitive → object converted with `ToPrimitive` (`valueOf`, then `toString`).

```js
[] == false        // true:  false→0, []→""→0
[] == ![]          // true:  ![] is false → same as above
null == 0          // false: null only == undefined
null >= 0          // true:  relational ops convert null→0 (inconsistent with ==)
"5" + 3            // "53"  (+ with a string concatenates)
"5" - 3            // 2     (- always numeric)
[] + {}            // "[object Object]"
[1,2] + [3]        // "1,23"
true + true        // 2
```

**Falsy values (8):** `false, 0, -0, 0n, "", null, undefined, NaN`. Everything else is truthy — including `"0"`, `"false"`, `[]`, `{}`.

### `??` vs `||`, `?.`
```js
0 || 10    // 10  (|| skips all falsy)
0 ?? 10    // 0   (?? skips only null/undefined)
user?.address?.city   // undefined instead of TypeError
fn?.()                // call only if defined
```

### Numbers
`0.1 + 0.2 === 0.30000000000000004` (IEEE-754). Compare with `Math.abs(a-b) < Number.EPSILON`. Max safe int `2**53 - 1` → use `BigInt` beyond.

---

## 2. Scope, hoisting, TDZ

- `var` → function scoped, hoisted **and initialised to `undefined`**, can be redeclared, attaches to `window` at top level.
- `let`/`const` → block scoped, hoisted but **not initialised** → accessing before declaration throws `ReferenceError` (Temporal Dead Zone).
- `const` makes the **binding** constant, not the value (`const a = []; a.push(1)` is fine).
- Function **declarations** are hoisted fully (callable before definition). Function **expressions** follow their variable's rules.

```js
console.log(a); // undefined
var a = 1;

console.log(b); // ReferenceError (TDZ)
let b = 2;

foo();          // "hi" — declaration hoisted
function foo() { console.log("hi"); }

bar();          // TypeError: bar is not a function (var bar = undefined)
var bar = function () {};
```

**Lexical scope:** a function sees variables where it was **defined**, not where it is called.

---

## 3. Closures

A closure = function + reference to the scope it was created in. The scope stays alive as long as the function is reachable.

```js
function counter() {
  let count = 0;               // private
  return {
    inc: () => ++count,
    get: () => count,
  };
}
const c = counter(); c.inc(); c.inc(); c.get(); // 2
```

**Classic loop question**
```js
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i)); // 3 3 3
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i)); // 0 1 2
```
`var` → one shared `i`. `let` → a **new binding per iteration**. Pre-ES6 fix: IIFE `(function(j){ setTimeout(()=>console.log(j)) })(i)`.

**Real uses:** data privacy/module pattern, `debounce`/`throttle`, memoize, once, React hooks (each render's handlers close over that render's state → *stale closure* bugs).

**Memory:** closures keep their whole scope reachable → large objects captured by long-lived listeners leak. Remove listeners / clear timers.

---

## 4. `this` — decided at **call time** (except arrows)

Priority order:
1. `new Fn()` → the new object.
2. `fn.call/apply/bind(obj)` → `obj` (explicit). `bind` is permanent; a bound function can't be re-bound (but `new` still overrides).
3. `obj.fn()` → `obj` (implicit).
4. plain `fn()` → `undefined` in strict mode / modules / classes; `globalThis` in sloppy mode.
5. **Arrow functions have no own `this`**; they use the enclosing lexical `this`. `call/bind` can't change it.

```js
const user = {
  name: "Sadhik",
  regular() { return this.name; },
  arrow: () => this?.name,            // `this` of module scope → undefined
  later() { setTimeout(function () { console.log(this?.name); }); }, // undefined (lost)
  laterFixed() { setTimeout(() => console.log(this.name)); },       // "Sadhik"
};
const f = user.regular;
f();                 // undefined (strict) — method extracted, implicit binding lost
user.regular();      // "Sadhik"
```
Event handlers: in `el.addEventListener("click", function(){})` `this === el`; with an arrow it's the outer `this`.

`call` → args individually, `apply` → args array, `bind` → returns new function (supports partial application).

---

## 5. Prototypes and classes

- Every object has a hidden `[[Prototype]]` (`Object.getPrototypeOf(o)` / `__proto__`). Property lookup walks the chain until `null`.
- Functions have a `.prototype` object; `new F()` creates an object whose `[[Prototype]]` is `F.prototype`.
- `class` is syntax over prototypes. Methods live on `Class.prototype`; fields (`x = 1`) live on each instance.

What `new` does:
1. create `obj = Object.create(F.prototype)`
2. call `F.apply(obj, args)`
3. if F returned an object use that, else return `obj`.

```js
class Animal { constructor(n){ this.name = n; } speak(){ return `${this.name} makes a sound`; } }
class Dog extends Animal { speak(){ return `${super.speak()} — woof`; } }
new Dog("Tom") instanceof Animal // true (Animal.prototype is on the chain)
```
`Object.create(proto)` → object with given prototype. `Object.create(null)` → no prototype (pure dictionary).
`hasOwnProperty`/`Object.hasOwn` → own vs inherited. `for…in` iterates inherited enumerable keys too; `Object.keys` only own.

Private fields: `#secret` (truly private, `#x in obj` checks). Static: `static create(){}`.

---

## 6. The event loop (asked in ~100% of interviews)

JS runs on **one call stack**. Async work is handed to the host (browser/Node). When it completes, a callback is queued.

- **Microtasks:** Promise `then/catch/finally`, `await` continuation, `queueMicrotask`, `MutationObserver`.
- **Macrotasks (tasks):** `setTimeout`, `setInterval`, I/O, UI events, `MessageChannel`.

**Algorithm:** run one task (script itself is the first) → drain **all** microtasks (including ones added during draining) → browser may render (rAF callbacks run just before paint) → next task.

```js
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
queueMicrotask(() => console.log(4));
console.log(5);
// 1 5 3 4 2
```

```js
async function a() {
  console.log("a1");
  await b();                 // b runs synchronously; rest of a() becomes a microtask
  console.log("a2");
}
async function b() { console.log("b"); }
console.log("start");
a();
new Promise(r => { console.log("p"); r(); }).then(() => console.log("then"));
console.log("end");
// start a1 b p end a2 then
```

```js
setTimeout(() => console.log("t1"));
Promise.resolve().then(() => {
  console.log("m1");
  setTimeout(() => console.log("t2"));
  Promise.resolve().then(() => console.log("m2"));
});
// m1 m2 t1 t2
```
Key facts: the Promise **executor runs synchronously**. `setTimeout(fn, 0)` is ≥ 0ms and nested timers clamp to ≥4ms. An infinite microtask loop **freezes the page** (rendering never gets a turn); an infinite chain of `setTimeout` doesn't.

Node extra: `process.nextTick` runs before promise microtasks.

---

## 7. Promises & async/await

States: `pending → fulfilled | rejected` (settled once, immutable).

- `.then` returns a **new promise**; returning a value fulfils it, throwing rejects it, returning a promise adopts it.
- `.catch(fn)` = `.then(undefined, fn)`. `.finally` receives no value and passes the original result through.

| Combinator | Resolves when | Rejects when |
|---|---|---|
| `Promise.all` | all fulfil (array in input order) | **first** rejection |
| `Promise.allSettled` | all settle (`{status, value/reason}`) | never |
| `Promise.race` | first settles (either way) | first settles with rejection |
| `Promise.any` | first fulfils | all reject → `AggregateError` |

```js
// sequential (slow) vs parallel
for (const id of ids) await fetchUser(id);                 // one after another
const users = await Promise.all(ids.map(fetchUser));        // parallel
```
`forEach` + `async` does **not** wait: `arr.forEach(async x => await f(x))` fires all and returns immediately. Use `for…of` or `Promise.all(arr.map(...))`.

**Error handling:** wrap `await` in `try/catch`; unhandled rejections fire `unhandledrejection`. `fetch` only rejects on network failure — **check `res.ok`** for 4xx/5xx.

**Cancellation:**
```js
const controller = new AbortController();
fetch(url, { signal: controller.signal })
  .catch(e => { if (e.name === "AbortError") return; throw e; });
controller.abort();
// timeouts: fetch(url, { signal: AbortSignal.timeout(5000) })
```

---

## 8. Functions toolkit

- **Pure function**: same input → same output, no side effects.
- **Higher-order function**: takes/returns functions (`map`, `filter`, `reduce`, `debounce`).
- **Currying**: `f(a,b,c)` → `f(a)(b)(c)`. **Partial application**: fix some args (`bind`).
- **Debounce**: run after the user *stops* for N ms (search box, resize). **Throttle**: run at most once per N ms (scroll, mousemove).
- **Memoization**: cache by args (only for pure functions; watch memory).
- **IIFE**: `(() => { ... })()` — private scope (pre-modules).

All of these are implemented and tested in [`code/polyfills`](../../code/polyfills). Write each one **from memory** at least twice.

---

## 9. Objects, arrays, copying

```js
const shallow = { ...obj };            // or Object.assign({}, obj)
const deep = structuredClone(obj);     // handles Date, Map, Set, cycles; NOT functions/DOM nodes
JSON.parse(JSON.stringify(obj));       // loses undefined, functions, Date→string, breaks on cycles
```
- `Object.freeze` is shallow. `Object.seal` → no add/remove, can modify.
- Mutating array methods: `push pop shift unshift splice sort reverse fill copyWithin`. Non-mutating: `map filter reduce slice concat flat` and ES2023 `toSorted toReversed toSpliced with`.
- `[10, 1, 2].sort()` → `[1, 10, 2]` (string sort!) → `sort((a,b)=>a-b)`.
- `Map` vs object: any key type, keeps insertion order, `.size`, better for frequent add/delete. `Set` for uniqueness: `[...new Set(arr)]`.
- `WeakMap/WeakSet`: keys must be objects, held weakly (no leaks), not iterable → private data / caches per DOM node.
- Getters/setters, `Object.defineProperty(obj, key, { writable, enumerable, configurable })`.

---

## 10. Modules

- **ESM** (`import/export`): static, analysed at build time → tree-shaking; live bindings; async loading; strict by default; top-level `await`.
- **CommonJS** (`require/module.exports`): dynamic, synchronous, copies of values, Node legacy.
- Dynamic `import("./x.js")` returns a promise → code-splitting (`React.lazy`).
- Named vs default exports: prefer named (better refactoring and tree shaking).

---

## 11. Memory, GC & leaks

GC is **mark-and-sweep** from roots (globals, stack). Reachable = alive. Common frontend leaks:
1. Event listeners / `setInterval` never removed (forgotten `useEffect` cleanup).
2. Detached DOM nodes still referenced in JS.
3. Closures holding big data; global caches growing forever (use `WeakMap` / LRU).
4. Subscriptions (WebSocket, RxJS, store) not unsubscribed.

Debug: Chrome DevTools → Memory → heap snapshots, compare before/after an action, search "Detached".

---

## 12. Generators, iterators, Proxy (know the idea)

- Iterable = has `[Symbol.iterator]()` returning `{ next() → {value, done} }`. Used by `for…of`, spread, destructuring.
- `function*` + `yield` pauses execution; `async function*` + `for await`. Redux-Saga is built on generators.
- `Proxy` intercepts operations (`get`, `set`, `has`...). Vue 3 reactivity, MobX, validation layers use it. `Reflect` provides the default behaviour.

---

## 13. ES2015 → ES2024 features worth naming
Destructuring with defaults, rest/spread, template literals & tagged templates, classes, `Symbol`, `Map/Set`, optional chaining, nullish coalescing, `Promise.allSettled/any`, `Array.prototype.at`, `Object.fromEntries`, `structuredClone`, logical assignment (`a ??= b`), numeric separators `1_000_000`, `Array.prototype.findLast`, `toSorted`, `Object.groupBy`, `Promise.withResolvers`.

---

## 14. Output-prediction drill (cover the answer, predict, then check)

```js
// Q1
let x = 1;
{ console.log(x); let x = 2; }
```
<details><summary>Answer</summary>ReferenceError — inner `x` is in TDZ; the block's `x` shadows the outer one.</details>

```js
// Q2
const obj = { a: 1, getA() { return this.a; } };
const { getA } = obj;
console.log(getA());
```
<details><summary>Answer</summary>TypeError (`this` is undefined in module/strict code) or `undefined` in sloppy scripts. Destructuring loses implicit binding.</details>

```js
// Q3
console.log([1, 2, 3].map(parseInt));
```
<details><summary>Answer</summary>`[1, NaN, NaN]` — map passes (value, index): parseInt("2", 1) → NaN, parseInt("3", 2) → NaN.</details>

```js
// Q4
const p = new Promise((res) => { console.log("A"); res("B"); console.log("C"); });
p.then(console.log);
console.log("D");
```
<details><summary>Answer</summary>A C D B</details>

```js
// Q5
function Person() { this.age = 0; setTimeout(function () { this.age++; console.log(this.age); }); }
new Person();
```
<details><summary>Answer</summary>`NaN` in a browser sloppy script (`this` = window, `undefined + 1`); TypeError in strict mode. Fix: arrow function.</details>

```js
// Q6
console.log(typeof typeof 1);
```
<details><summary>Answer</summary>"string"</details>

```js
// Q7
const a = {}; const b = { key: "b" }; const c = { key: "c" };
a[b] = 123; a[c] = 456;
console.log(a[b]);
```
<details><summary>Answer</summary>456 — object keys are converted to the string "[object Object]", so both write the same key.</details>

```js
// Q8
Promise.reject(1)
  .then(() => console.log("then"))
  .catch((e) => { console.log("catch", e); return 2; })
  .then((v) => console.log("after", v));
```
<details><summary>Answer</summary>catch 1, after 2 — catch recovers the chain.</details>

```js
// Q9
async function f() { return 1; }
console.log(f());
```
<details><summary>Answer</summary>`Promise {<fulfilled>: 1}` — async functions always return a promise.</details>

```js
// Q10
var name = "global";
const o = { name: "o", fn: () => console.log(this.name) };
o.fn();
```
<details><summary>Answer</summary>In a classic browser script: "global" (arrow uses top-level `this` = window, and `var` attaches to window). In a module/Node: undefined.</details>

```js
// Q11
console.log(0.1 + 0.2 === 0.3, 3 > 2 > 1, 1 < 2 < 3);
```
<details><summary>Answer</summary>false false true — `3>2` → true → `true > 1` → `1 > 1` false.</details>

```js
// Q12
const arr = [1, 2, 3];
arr[10] = 11;
console.log(arr.length, arr.filter(() => true).length);
```
<details><summary>Answer</summary>11 4 — holes are skipped by filter/map/forEach.</details>

```js
// Q13
function f(a, b = a * 2) { console.log(arguments.length, a, b); }
f(1);
```
<details><summary>Answer</summary>1 1 2</details>

```js
// Q14
console.log("start");
setTimeout(() => console.log("timeout"), 0);
(async () => {
  console.log("iife");
  await null;
  console.log("after await");
})();
requestAnimationFrame?.(() => console.log("raf"));
console.log("end");
```
<details><summary>Answer</summary>start, iife, end, after await, then timeout and raf — in a browser the order of timeout vs raf depends on when the next frame happens (usually timeout first). Say this nuance in an interview.</details>

```js
// Q15
const user = { name: "A" };
const users = [user];
user.name = "B";
const copy = [...users];
copy[0].name = "C";
console.log(users[0].name);
```
<details><summary>Answer</summary>"C" — spread is shallow; both arrays reference the same object.</details>

---

## 15. Theory questions you must answer in < 60 seconds each
1. Difference between `var`, `let`, `const`; what is TDZ?
2. What is a closure? Give a real use and a bug it causes.
3. Explain `this` rules. Why can't arrow functions be constructors?
4. Explain the event loop, microtask vs macrotask with an example.
5. `call` vs `apply` vs `bind`.
6. Prototype chain; how does `class extends` work underneath?
7. `==` vs `===`; when is `==` acceptable (`x == null`)?
8. Shallow vs deep copy; how does `structuredClone` differ from JSON?
9. Debounce vs throttle with use-cases.
10. `Promise.all` vs `allSettled` vs `race` vs `any`.
11. How does `async/await` work under the hood (generators + promises)?
12. ESM vs CommonJS; what enables tree-shaking?
13. What causes memory leaks in SPAs and how do you find them?
14. Event delegation and why it's efficient (see browser notes).
15. What's new in recent ES versions that you have used?
