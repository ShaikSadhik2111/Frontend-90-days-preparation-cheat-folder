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