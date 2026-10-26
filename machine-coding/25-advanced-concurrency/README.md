# 25 — Advanced async concurrency

| Problem | Technique |
|---|---|
| Upload 100 files, max 3 at a time | promise pool / queue with concurrency limit |
| Retry flaky requests | exponential backoff + jitter, max attempts, only idempotent |
| Many components request the same data | in-flight dedupe (Map of promises) |
| Requests must apply in order | sequence numbers / queue (`p = p.then(next)`) |
| Latest-only (search) | abort previous / request id |
| Timeout | `AbortSignal.timeout(ms)` or `Promise.race` with timer |
| Batch many small calls | collect for 10 ms → one request (DataLoader pattern) |
| Long CPU work | chunk + yield (`setTimeout`) or Web Worker |

```ts
// in-flight dedupe
const inflight = new Map<string, Promise<unknown>>();
function dedupe<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (!inflight.has(key)) inflight.set(key, fn().finally(() => inflight.delete(key)));
  return inflight.get(key) as Promise<T>;
}

// serial queue — each task starts after the previous one settles
function createQueue() {
  let tail: Promise<unknown> = Promise.resolve();
  return <T>(task: () => Promise<T>) => { const run = tail.then(task, task); tail = run.catch(() => {}); return run; };
}
```
Tested implementations: `promisePool`, `retry`, `withTimeout`, `MyPromise` in [code/polyfills](../../code/polyfills/src/promise-utils.js).

Next → [26 Testing](../26-testing/README.md)
