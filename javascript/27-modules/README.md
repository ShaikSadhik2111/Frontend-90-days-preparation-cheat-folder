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