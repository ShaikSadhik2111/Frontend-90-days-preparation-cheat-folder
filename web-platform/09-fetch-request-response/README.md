# 09 — Fetch, Request & Response

## Correct fetch
```js
async function getJSON(url, { signal, timeoutMs = 10_000 } = {}) {
  const timeout = AbortSignal.timeout(timeoutMs);
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;   // modern browsers
  const res = await fetch(url, { signal: combined, headers: { Accept: "application/json" }, credentials: "include" });
  if (!res.ok) {                                  // fetch only rejects on NETWORK errors, not 4xx/5xx!
    const body = await res.text();
    throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status, body });
  }
  return res.status === 204 ? null : res.json();
}
```
- `credentials`: `"same-origin"` (default) · `"include"` (send cookies cross-origin; needs CORS credentials) · `"omit"`.
- POST JSON: `method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)`.
- Uploads: `body: formData` (don't set `Content-Type` — the browser adds the multipart boundary).
- Body can be read **once** (`res.json()`); use `res.clone()` to read twice.
- Errors: `TypeError` (network/CORS failure), `AbortError` (aborted), `TimeoutError` (`AbortSignal.timeout`).

## Cancellation
```js
const controller = new AbortController();
fetch("/api/search?q=" + encodeURIComponent(q), { signal: controller.signal });
controller.abort(); // e.g. when the user types again or the component unmounts
```

## Retry with backoff (idempotent requests)
```js
async function fetchWithRetry(url, opts = {}, retries = 3) {
  for (let attempt = 0; ; attempt++) {
    try { return await getJSON(url, opts); }
    catch (e) {
      const retriable = !e.status || e.status >= 500 || e.status === 429;
      if (attempt >= retries || !retriable || e.name === "AbortError") throw e;
      await new Promise((r) => setTimeout(r, 2 ** attempt * 300 + Math.random() * 100)); // backoff + jitter
    }
  }
}
```

## Streaming responses
`res.body` is a `ReadableStream` → progress for downloads, streaming AI/LLM text, large CSV parsing:
```js
const reader = res.body.getReader(); const decoder = new TextDecoder();
for (;;) { const { done, value } = await reader.read(); if (done) break; append(decoder.decode(value, { stream: true })); }
```

## fetch vs axios
axios: interceptors, automatic JSON, rejects on non-2xx, upload progress (XHR), older browser support. fetch: built-in, streams, `AbortController`, smaller. Many teams wrap fetch in a tiny typed client.

## Interview questions
1. Does fetch reject on 404? How do you handle it?
2. How do you cancel a request / add a timeout?
3. How do you upload a file with progress? (XHR `upload.onprogress` or axios; fetch has no upload progress)
4. What's the difference between fetch and axios?
5. How do you retry safely?

Next → [10 Caching](../10-caching/README.md)
