# 20 — Memoization

Memoization caches a function's result so repeated calls with equivalent inputs can reuse previous work.

## 1. Basic example

```js
function memoize(fn) {
  const cache = new Map();

  return value => {
    if (cache.has(value)) {
      return cache.get(value);
    }

    const result = fn(value);
    cache.set(value, result);
    return result;
  };
}

const square = memoize(n => n * n);

square(10); // calculates
square(10); // cached
```

The cache survives because of a closure.

## 2. Good candidates

Memoization works well when:

- computation is expensive
- function is pure or stable
- same inputs repeat frequently
- cache size can be controlled

Examples:

- expensive derived calculations
- parsing/normalization
- selectors
- repeated domain computations

## 3. Why naive JSON.stringify keys are risky

This:

```js
JSON.stringify(args)
```

is convenient for teaching but is not a universal cache-key strategy.

Problems include:

- object property ordering considerations
- unsupported values
- circular references
- serialization cost
- reference identity semantics

Choose a key strategy based on the input domain.

## 4. React connection

React has memoization tools such as:

- `useMemo`
- `useCallback`
- `React.memo`

These are not magic performance buttons. Memoization has its own comparison and memory costs and should be used where it reduces meaningful work.

## 5. Cache risks

- unbounded growth
- stale values
- incorrect keys
- retained objects
- memory overhead

A cache may need eviction such as LRU depending on the workload.

## Interview answer

> Memoization trades computation time for memory and cache-management complexity.

**Next:** Promises provide a composable model for asynchronous results.