# Memoization

Memoization caches function results so repeated calls with equivalent inputs can avoid repeated expensive computation.

```js
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
```

This example is educational, not universally safe: serialization can be expensive and does not uniquely represent every JavaScript value.

## Good candidates
- Pure expensive functions
- Stable repeated computations

## Risks
- Unbounded cache growth
- Incorrect cache keys
- Stale results
- Memory retention

## Interview principle
Memoization is a trade-off: computation time is exchanged for memory and cache-management complexity.
