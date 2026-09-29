# Scope and Hoisting

## Scope types
- Global scope
- Module scope
- Function scope
- Block scope

`let` and `const` are block-scoped. `var` is function-scoped.

## Lexical scope
A function can access variables from the scope where it was defined, not where it is called.

```js
const outer = "A";
function read() {
  return outer;
}
```

## Hoisting
Declarations are processed when an execution context is created, but different declarations behave differently.

- Function declarations can generally be called before their declaration.
- `var` is initialized to `undefined`.
- `let`/`const` are in the temporal dead zone until initialization.

```js
console.log(a); // undefined
var a = 1;

console.log(b); // ReferenceError
let b = 2;
```

## Temporal Dead Zone
The TDZ is the period from entering the relevant scope until a `let`/`const`/class binding is initialized.

## Pitfalls
Do not describe hoisting as simply "moving code to the top." It is better to explain binding creation and initialization during execution-context setup.
