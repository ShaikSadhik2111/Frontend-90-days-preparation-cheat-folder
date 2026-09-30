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