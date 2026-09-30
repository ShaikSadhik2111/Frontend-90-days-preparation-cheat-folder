# 29 — Dynamic Import

Dynamic import() loads a module asynchronously and returns a Promise.

## Example
    const module = await import("./feature.js");
    module.start();

## Frontend use cases
- route-level lazy loading
- admin-only screens
- heavy chart/editor libraries
- optional features
- reducing initial JavaScript

Example:
    button.addEventListener("click", async () => {
      const { openEditor } = await import("./editor.js");
      openEditor();
    });

Bundlers such as Vite and Webpack can turn dynamic imports into separate chunks.

## Loading and errors
    try {
      const module = await import("./feature.js");
      module.start();
    } catch (error) {
      showFeatureError(error);
    }

Dynamic loading can reduce initial work but introduces loading latency, another request and loading/error states.

**Next:** generators and iterators explain incremental value production.

## Deeper learning standard

### Mental model

```text
User needs feature
      ↓
import()
      ↓
Promise
      ↓
module chunk loads
      ↓
feature executes
```

Dynamic import is useful when code does not need to be included in the initial JavaScript payload.

### Frontend use cases

- route-level lazy loading
- admin-only screens
- heavy chart/editor libraries
- optional integrations
- feature flags

### Trade-offs

Lazy loading can reduce initial JavaScript, but introduces another loading boundary. The UI needs loading and error states, and the chunk may add latency when first requested.

### Interview connection

Explain the relationship between dynamic import, bundler code splitting, initial bundle size and lazy routes.

**What this unlocks:** iterators and generators explain how JavaScript can produce values incrementally.
