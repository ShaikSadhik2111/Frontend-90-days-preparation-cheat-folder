# 27 — Modules

Modules create explicit boundaries for dependencies, exports, encapsulation, reuse and testing.

## Named exports
    // math.js
    export function add(a, b) { return a + b; }
    export function multiply(a, b) { return a * b; }
    // consumer
    import { add, multiply } from "./math.js";

## Default export
    export default class UserService {}
    import UserService from "./UserService.js";

## Frontend architecture
A feature can be split into UserPage.js, userService.js, userMapper.js and userValidation.js. Imports make the dependency graph explicit instead of relying on globals.

## Circular dependencies
Cycles can produce partially initialized bindings or confusing runtime behavior. Often shared logic should move into a third module.

## ESM vs CommonJS
ESM uses import/export. CommonJS uses require/module.exports. Node supports both with different resolution and interop rules.

**Next:** CommonJS interop.

## Deeper learning standard

### Why modules exist

Modules replace implicit global dependencies with explicit imports and exports. This improves encapsulation, reuse, testing and dependency reasoning.

### Named vs default exports

Named exports make the exported name explicit. Default exports provide one primary exported value. Choose a convention and keep imports predictable.

### Circular dependencies

Circular dependencies can create partially initialized bindings or confusing runtime behavior. If a cycle becomes difficult to reason about, extract shared logic into a third module.

### Frontend architecture

```text
feature/
  page.js
  service.js
  mapper.js
  validation.js
```

Imports make the dependency graph visible instead of relying on globals.

### Interview question

Explain ESM versus CommonJS and why a modern frontend build can still encounter CommonJS packages.

**What this unlocks:** CommonJS interop explains module-system differences encountered in Node tooling and dependencies.
