# 11 — Web Workers

> Run JavaScript on a **background thread** so heavy computation doesn't block the main thread (UI). Workers have no DOM access and communicate by **messages**.

```js
// worker.js
self.onmessage = (e) => {
  const { rows, threshold } = e.data;
  const alarms = rows.filter((r) => r.value > threshold);   // heavy work here
  self.postMessage({ count: alarms.length, alarms });
};

// main.js (Vite/webpack 5 understand this syntax and bundle the worker)
const worker = new Worker(new URL("./worker.js", import.meta.url), { type: "module" });
worker.onmessage = (e) => render(e.data);
worker.onerror = (e) => console.error(e.message);
worker.postMessage({ rows, threshold: 80 });
// worker.terminate() when done
```

## Data transfer
- `postMessage` uses the **structured clone** algorithm (copies objects; functions/DOM nodes can't be sent).
- **Transferable** objects (`ArrayBuffer`, `MessagePort`, `ImageBitmap`, `OffscreenCanvas`) move ownership with zero copy: `worker.postMessage(buffer, [buffer])`.
- `SharedArrayBuffer` + `Atomics` for shared memory (requires cross-origin isolation headers).
- Libraries like **Comlink** turn messages into async function calls.

## Kinds of workers
| Worker | Use |
|---|---|
| Dedicated Worker | Heavy computation for one page (parsing, filtering, crypto, image processing) |
| Shared Worker | Shared between tabs of the same origin (one WebSocket for all tabs) |
| Service Worker | Network proxy, caching, offline, push (see 12) |
| Worklets | Audio/paint/animation hooks |

## Frontend use cases
Parsing big CSV/Excel uploads · filtering/aggregating 100k telemetry points · syntax highlighting / search indexing · image compression before upload · PDF generation · running WASM modules.

## Interview questions
1. Why use a web worker? What can't it do? (no DOM, `window`, synchronous access to main state)
2. How do the main thread and worker communicate? Cost of copying?
3. Worker vs service worker?
4. How would you keep a 100k-row filter responsive?

Next → [12 Service workers & PWA](../12-service-workers-pwa/README.md)
