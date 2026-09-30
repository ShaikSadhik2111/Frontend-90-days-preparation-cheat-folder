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