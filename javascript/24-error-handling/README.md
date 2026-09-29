# Error Handling

Errors represent exceptional conditions that should be handled intentionally.

## Synchronous errors
```js
try {
  riskyOperation();
} catch (error) {
  handle(error);
}
```

## Promise errors
Use `.catch()` or `try/catch` around awaited operations.

## Error objects
Prefer meaningful error types/messages and preserve the original cause when wrapping errors.

```js
throw new Error("Unable to load user", { cause: originalError });
```

## Good practice
- Handle errors at the correct boundary
- Do not silently swallow failures
- Distinguish expected failures from programming bugs
- Never expose secrets in error messages
- Log useful context without sensitive data

## Pitfall
Returning `null` for every failure destroys error semantics and makes debugging harder.
