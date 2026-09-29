# CommonJS Interop

CommonJS uses `require` and `module.exports`; ES Modules use `import` and `export`.

## CommonJS
```js
const util = require("./util");
module.exports = util;
```

## ESM
```js
import util from "./util.js";
export default util;
```

## Interoperability
Node can support both systems, but resolution, default exports, package metadata and execution mode can differ.

## Pitfalls
- Assuming `module.exports = value` maps identically to an ESM default export in every tooling scenario
- Ignoring package `type` and file extensions
- Mixing module systems without understanding boundaries
