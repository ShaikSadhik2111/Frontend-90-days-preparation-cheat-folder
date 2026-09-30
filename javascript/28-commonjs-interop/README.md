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