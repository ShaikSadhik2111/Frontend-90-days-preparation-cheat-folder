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