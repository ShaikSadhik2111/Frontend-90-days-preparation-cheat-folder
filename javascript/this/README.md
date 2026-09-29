# this

`this` is determined primarily by how a function is called, not where it is defined.

## Common rules
1. Constructor call: `new` creates a new instance and binds `this`.
2. Explicit binding: `call`, `apply`, `bind`.
3. Method call: `obj.fn()` gives `obj` as `this`.
4. Plain function call: depends on strict mode; in strict mode `this` is `undefined`.
5. Arrow functions do not create their own `this`; they capture it lexically.

```js
const user = {
  name: "Sam",
  normal() { return this.name; },
  arrow: () => this.name
};
```

Do not expect the arrow method above to use `user` as its `this`.

## bind
`bind` returns a new function with a fixed `this` and optionally pre-filled arguments.

## Pitfalls
- Confusing lexical `this` with dynamic call-site binding
- Losing `this` when passing a method as a callback
- Assuming arrow functions can be rebound with `call`/ `bind`
