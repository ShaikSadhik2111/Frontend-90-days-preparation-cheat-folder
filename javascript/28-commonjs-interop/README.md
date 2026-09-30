# 28 — CommonJS Interop

## CommonJS
    const util = require("./util");
    module.exports = util;

## ES Modules
    import util from "./util.js";
    export default util;

## Why frontend engineers need this
Even a Vite/React/TypeScript application may depend on CommonJS packages or tooling. This knowledge helps debug import errors, default/named export mismatches, Node scripts and test runners.

## Package configuration
Node behavior can depend on package type, file extensions and package exports.

Do not assume module.exports is always semantically identical to export default. Tooling may provide compatibility wrappers, but the module systems have different semantics.

## Debugging checklist
1. Check package type.
2. Check file extension.
3. Inspect package exports.
4. Identify CJS vs ESM.
5. Verify default vs named export shape.

**Next:** dynamic import enables lazy loading and code splitting.

## Deeper learning standard

### CommonJS

```js
const util = require("./util");
module.exports = util;
```

### ES Modules

```js
import util from "./util.js";
export default util;
```

These systems have different loading and export semantics. Tooling may provide interoperability, but default and named exports should not be assumed to map identically.

### Debugging import errors

Check:

1. package type
2. file extension
3. package exports
4. whether the dependency is CJS or ESM
5. default versus named export shape

### Frontend relevance

Vite, Webpack, test runners and Node scripts can encounter dependencies using different module systems. Understanding the boundary makes otherwise confusing import errors easier to diagnose.

### Practical challenge

Take one dependency from a frontend project and identify its package type and export shape. Explain what your bundler does with it.

**What this unlocks:** dynamic import uses asynchronous module loading for lazy features and code splitting.
