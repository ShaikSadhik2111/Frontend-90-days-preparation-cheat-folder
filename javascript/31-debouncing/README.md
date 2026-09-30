# 31 — Debouncing

Debouncing waits until calls stop arriving for a specified period before invoking a function.

## Implementation
    function debounce(fn, delay) {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    }

## Search use case
Without debounce, typing react could create requests for r, re, rea and react. A 300ms debounce waits for the user's pause.
    const search = debounce(query => fetchResults(query), 300);

## Other use cases
- validation
- autosave
- resize calculations
- filtering
- expensive input processing

## Cleanup
A production implementation can expose cancel() so component cleanup can clear pending work.

Debounce does not solve stale responses. Combine it with AbortController or request identity checks.

**Next:** throttling limits frequency while activity continues.

## Deeper learning standard

### Why debounce works

Debounce uses a closure to retain the current timer.

```text
call 1 → timer
call 2 → clear timer → new timer
call 3 → clear timer → new timer
pause → timer fires → function runs
```

### Search example

```js
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### Production concerns

A reusable debounce implementation may expose cancel and flush operations. Framework components should also clean up pending timers during unmount/destroy.

### Important distinction

Debounce reduces invocation frequency. It does not guarantee that an older network response cannot overwrite a newer result. Combine it with AbortController or request identity checks when necessary.

### Interview challenge

Implement debounce with preserved this, arguments, cancel(), and optional leading/trailing behavior. Explain why the timer is retained through a closure.

**What this unlocks:** throttling limits execution frequency while activity continues.
