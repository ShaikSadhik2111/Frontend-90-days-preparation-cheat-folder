# JavaScript Fundamentals

## What JavaScript is
JavaScript is a dynamically typed, prototype-based language standardized as ECMAScript. In browsers it runs inside a JavaScript engine such as V8, SpiderMonkey or JavaScriptCore. Node.js embeds V8 outside the browser.

## Core building blocks
- Statements and expressions
- Literals
- Variables: `let`, `const`, legacy `var`
- Primitive values: string, number, bigint, boolean, undefined, symbol, null
- Objects and functions
- Operators and control flow
- Arrays and strings
- Functions and callbacks

## Variables
Prefer `const` when the binding is not reassigned and `let` when it is. `var` is function-scoped and has historical hoisting behavior.

```js
const user = { name: "Sam" };
let count = 0;
count++;
```

## Equality
`===` performs strict equality without implicit type conversion in the normal cases. `==` permits coercion and should be used only when the coercion is deliberate and understood.

## Truthy/falsy
Falsy values include `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Everything else is truthy.

## Interview principle
Do not memorize isolated rules. Be able to explain how a piece of JavaScript executes: values → scope → execution context → call stack → async queues/event loop.

## Common pitfalls
- Confusing `null` and `undefined`
- Using `==` without understanding coercion
- Mutating objects accidentally
- Assuming `const` makes an object immutable
- Assuming JavaScript is multithreaded in the normal execution model
