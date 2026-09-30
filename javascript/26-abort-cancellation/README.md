# 26 — Abort and Cancellation

Promises themselves are not cancellable. APIs can expose cancellation separately, commonly through AbortController.

## Cancel fetch
    const controller = new AbortController();
    fetch("/api/search?q=react", { signal: controller.signal });
    controller.abort();

The receiving API must honor the signal.

## Search use case
    let controller;
    async function search(query) {
      controller?.abort();
      controller = new AbortController();
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal });
      return response.json();
    }

## Cancellation vs stale-result protection
Cancellation attempts to stop underlying work. Stale-result protection prevents an obsolete result from updating state. Robust search UIs can use both.

## Timeout
    const signal = AbortSignal.timeout(5000);
    await fetch("/api/data", { signal });

Check target runtime support for newer APIs.

## Use cases
- search-as-you-type
- route changes
- component cleanup
- cancelled uploads
- request timeouts

**Next:** modules create explicit dependency boundaries.

## Deeper learning standard

### AbortController mental model

```text
Controller
   ↓ abort()
AbortSignal
   ↓
fetch / API that honors signal
   ↓
operation rejects with abort-related error
```

Promises themselves are not cancellable. Cancellation is provided by the operation consuming the signal.

### Search-as-you-type

```js
let controller;

async function search(query) {
  controller?.abort();
  controller = new AbortController();

  const response = await fetch(
    `/api/search?q=${encodeURIComponent(query)}`,
    { signal: controller.signal }
  );

  return response.json();
}
```

Cancellation should normally be combined with stale-result protection because cancellation cannot guarantee that obsolete work has no effect everywhere.

### Use cases

- search requests
- route changes
- component cleanup
- request timeout
- uploads and streams where supported

### Interview question

Explain the difference between cancellation and stale-response protection. They solve different problems.

**What this unlocks:** modules provide explicit dependency boundaries for application code.
