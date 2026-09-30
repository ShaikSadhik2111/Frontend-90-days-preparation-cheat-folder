# 09 — Scope and Hoisting

## Scope

Scope answers:

> Where can this binding be accessed?

JavaScript uses lexical scope: the source-code structure determines which outer bindings a function can access.

## 1. Global, module, function and block scope

```js
const globalValue = 1;

function demo() {
  const functionValue = 2;

  if (true) {
    const blockValue = 3;

    console.log(globalValue);
    console.log(functionValue);
    console.log(blockValue);
  }
}
```

`let` and `const` are block-scoped. `var` is function-scoped.

## 2. var vs let

```js
if (true) {
  var a = 10;
  let b = 20;
}

console.log(a); // 10
// console.log(b); // ReferenceError
```

This is one reason modern code generally prefers `let`/`const` over `var`.

## 3. Lexical scope

```js
const name = "outer";

function readName() {
  return name;
}

function run() {
  const name = "inner";
  return readName();
}

console.log(run()); // outer
```

The function uses the scope where it was **defined**, not where it was called.

This is the foundation of closures.

## 4. Hoisting

Avoid saying “JavaScript moves declarations to the top.” A better explanation is:

> During execution-context setup, bindings are created and initialized according to their declaration kind.

Function declaration:

```js
greet(); // works

function greet() {
  console.log("hello");
}
```

var:

```js
console.log(value); // undefined
var value = 10;
```

let/const:

```js
// console.log(value); // ReferenceError
let value = 10;
```

## 5. Temporal Dead Zone

The TDZ is the period after entering a scope and before a `let`, `const` or class binding is initialized.

```js
{
  // TDZ for count
  // console.log(count); // ReferenceError

  let count = 0;
}
```

## 6. Real frontend use case

Understanding scope prevents bugs in:

- event handlers
- callbacks
- loops
- React hooks
- asynchronous code
- module-level configuration

Example:

```js
const handlers = [];

for (let i = 0; i < 3; i++) {
  handlers.push(() => i);
}

console.log(handlers.map(fn => fn())); // [0, 1, 2]
```

Using `let` creates a binding appropriate to each iteration.

## Interview checklist

- lexical scope
- block vs function scope
- declaration vs initialization
- hoisting
- TDZ
- closure connection
- loop/callback behavior

**Next:** execution contexts explain how these bindings are established when code runs.