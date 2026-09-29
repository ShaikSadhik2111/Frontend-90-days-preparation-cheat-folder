# Modules

Modules create explicit boundaries for code and dependencies.

## ES Modules
```js
export function add(a, b) { return a + b; }
export default class User {}
```

```js
import User, { add } from "./user.js";
```

## CommonJS
Node historically used:

```js
const fs = require("node:fs");
module.exports = {};
```

Modern Node supports ESM as well.

## Benefits
- Encapsulation
- Dependency clarity
- Reusability
- Better tooling
- Easier testing

## Pitfalls
- Mixing ESM and CommonJS without understanding interop
- Circular dependencies
- Confusing default and named exports
