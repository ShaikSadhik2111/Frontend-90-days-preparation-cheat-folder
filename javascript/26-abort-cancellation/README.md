# Abort and Cancellation

Promises are not inherently cancellable, but APIs can expose cancellation mechanisms.

## AbortController
```js
const controller = new AbortController();

fetch("/api/search", { signal: controller.signal });
controller.abort();
```

The receiving API must support the signal for cancellation to have an effect.

## Uses
- Search requests
- Component unmount cleanup
- Timeouts
- User-cancelled operations

## Interview distinction
Cancellation is different from ignoring a result. Cancellation attempts to stop the underlying operation; stale-result protection prevents an obsolete result from updating application state.
