# Debouncing

Debouncing delays execution until calls stop arriving for a configured period.

Typical use: search input.

```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

## Use cases
- Search
- Validation
- Resize handling
- Autosave

## Important concerns
- Preserve arguments
- Preserve intended `this` when required
- Cancel pending work when needed
- Avoid stale asynchronous results

## Interview extension
For API search, debounce alone does not prevent out-of-order responses. Combine it with request cancellation or response identity checks.
