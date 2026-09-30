# 24 — Error Handling

## Throwing
    function parseUser(input) {
      if (!input.name) throw new Error("Name is required");
      return input;
    }

## try/catch/finally
    try { parseUser({}); }
    catch (error) { console.error(error.message); }
    finally { console.log("validation finished"); }

## Built-in errors
- Error
- TypeError
- RangeError
- SyntaxError
- ReferenceError

## Custom errors
    class ValidationError extends Error {
      constructor(message) {
        super(message);
        this.name = "ValidationError";
      }
    }

## Error architecture
- API service: normalize transport failures.
- Domain layer: classify business failures.
- UI: show user-facing messages.
- Global error boundary: capture unexpected failures.

Do not swallow errors silently, and never expose secrets in user-facing messages or uncontrolled logs.

**Next:** the event loop explains when asynchronous callbacks execute.

## Deeper learning standard

### Error propagation

If a function does not catch an exception, it can propagate to its caller. Catch where you can recover, translate, add useful context or perform required cleanup.

```js
try {
  await saveUser();
} catch (error) {
  showError(error);
} finally {
  hideLoader();
}
```

### Frontend architecture

```text
API/service
   ↓
transport error
   ↓
domain classification
   ↓
UI state
   ↓
user-facing message
```

Unexpected rendering failures can be captured by a framework error boundary, but error boundaries are not a replacement for Promise rejection handling.

### Common mistakes

- swallowing errors
- exposing stack traces to users
- logging secrets
- classifying errors only by message text
- catching without adding value

### Practical challenge

Create a service error type that preserves the original cause while exposing a safe user-facing category.

**What this unlocks:** the event loop explains when Promise continuations, timers and other asynchronous callbacks actually execute.
