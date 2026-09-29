# Dynamic Import

Dynamic import loads a module asynchronously:

```js
const module = await import("./feature.js");
```

## Uses
- Code splitting
- Lazy features
- Optional dependencies
- Reducing initial bundle work

Bundlers such as Vite and Webpack can turn dynamic imports into separate chunks.

## Trade-offs
Dynamic loading can improve initial load time but introduces additional network requests and loading states.

## Interview connection
Explain dynamic import together with lazy loading, code splitting and route-level optimization.
