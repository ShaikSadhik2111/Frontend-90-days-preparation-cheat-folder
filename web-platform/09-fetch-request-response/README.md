# 09 — Fetch, Request and Response

**Connection:** HTTP is the protocol; Fetch is the browser programming model.

**Example**
```js
const controller = new AbortController();
const response = await fetch("/api/users", {
  signal: controller.signal,
  credentials: "include"
});
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const data = await response.json();
```

**Learn:** Request/Response, headers, body streams, AbortController, credentials, CORS mode, timeouts, retries and response validation.

**Critical fact:** fetch rejects for network-level failures and aborts, not simply because the server returned 404/500.

**Production:** search, forms, dashboards, uploads and server-state synchronization.

**Pitfalls:** stale responses, unsafe retries, unexpected content types and ignoring AbortError.

**Interview:** fetch 404 behavior? abort vs timeout? CORS vs network failure? stale search results?

**Challenge:** cancellable search with timeout, stale guard and runtime validation.

**Next:** caching.