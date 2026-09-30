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