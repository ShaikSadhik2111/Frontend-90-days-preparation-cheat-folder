# Proxy and Reflect

`Proxy` intercepts operations on an object, such as property reads, writes and function calls.

```js
const state = new Proxy({}, {
  get(target, key) {
    console.log("read", key);
    return Reflect.get(target, key);
  }
});
```

## Reflect
`Reflect` provides standard methods corresponding to many internal object operations and is useful inside proxy traps.

## Uses
- Validation
- Reactive systems
- Access control
- Instrumentation

## Pitfalls
Proxy behavior can complicate debugging, identity and performance. Use it intentionally.
