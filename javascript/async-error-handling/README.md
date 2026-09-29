# Async Error Handling

Async failures can occur during promise creation, promise settlement, network operations or application logic.

## Patterns
```js
async function load() {
  try {
    return await fetchData();
  } catch (error) {
    throw new Error("Failed to load data", { cause: error });
  }
}
```

## Important rules
- Always define who owns failure handling.
- Preserve original causes when wrapping.
- Do not catch and ignore errors.
- Distinguish retryable failures from permanent failures.
- Use timeouts and cancellation for external operations when appropriate.

## Race conditions
A successful older request can arrive after a newer request. Track request identity or cancel obsolete work when the UI requires latest-result semantics.
