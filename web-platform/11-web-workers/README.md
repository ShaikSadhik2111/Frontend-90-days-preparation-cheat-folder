# 11 — Web Workers and Background Execution

**Connection:** long CPU work blocks the main thread.

**Learn:** Dedicated Workers, messaging, structured clone, transferable objects, lifecycle and what Workers cannot access directly.

**Example**
```js
const worker = new Worker("/worker.js");
worker.postMessage({ values });
worker.onmessage = event => renderResult(event.data);
```

**Production:** large parsing, image/data processing and CPU-heavy transformations.

**Pitfalls:** moving tiny work unnecessarily, cloning huge objects, assuming Workers manipulate DOM and leaking worker lifecycles.

**Interview:** Worker vs async function? Why doesn't Worker computation block UI? What crosses the boundary? How cancel?

**Challenge:** move large CSV transformation off-main-thread and measure responsiveness.

**Next:** Service Workers.