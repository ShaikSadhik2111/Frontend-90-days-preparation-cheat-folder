# 35 — Proxy and Reflect

Proxy can intercept operations on a target object.

## get trap
    const state = new Proxy({ count: 0 }, {
      get(target, property, receiver) {
        console.log("read", property);
        return Reflect.get(target, property, receiver);
      }
    });

## set trap
    const user = new Proxy({}, {
      set(target, property, value, receiver) {
        if (property === "age" && value < 0) throw new Error("Invalid age");
        return Reflect.set(target, property, value, receiver);
      }
    });

## Why Reflect?
Reflect provides standard operations corresponding to many internal object operations and is useful inside Proxy traps.

## Use cases
- validation
- reactive state tracking
- instrumentation
- access control
- observable objects
- library abstractions

## Pitfalls
Proxy can complicate debugging, identity assumptions and performance. Use it when interception genuinely improves the design.

**Next:** polyfills turn language knowledge into implementation exercises.

## Deeper learning standard

### Proxy mental model

```text
application code
      ↓
Proxy trap
      ↓
target operation
      ↓
Reflect operation
```

A Proxy can intercept operations such as get, set, has, deleteProperty and more.

### Why Reflect

Reflect provides standard object-operation functions and is commonly used inside traps to preserve normal semantics.

```js
const state = new Proxy({ count: 0 }, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  }
});
```

### Real use cases

- reactive state tracking
- validation
- instrumentation
- access control
- observable libraries

### Pitfalls

Proxy can complicate identity, debugging and performance. It should be used when interception is genuinely part of the design.

### Interview questions

- What does Proxy intercept?
- Why use Reflect inside traps?
- How can Proxy support reactivity?
- What are identity/performance trade-offs?

**What this unlocks:** polyfills turn JavaScript runtime knowledge into implementation exercises.
