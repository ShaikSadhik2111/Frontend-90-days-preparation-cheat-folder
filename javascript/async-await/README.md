# Async / Await

`async` functions always return promises. `await` pauses the async function's continuation until the awaited promise settles; it does not block the JavaScript thread in the usual sense.

```js
async function loadUser() {
  const response = await fetch("/api/user");
  return response.json();
}
```

## Parallel work
Avoid accidental sequential waits:

```js
const [users, orders] = await Promise.all([
  loadUsers(),
  loadOrders()
]);
```

## Error handling
Use `try/catch` for local handling or allow rejection to propagate to a caller.

## Cancellation
Promises themselves are not cancellable. APIs such as `fetch` can support cancellation through `AbortController`.

## Pitfalls
- Awaiting independent operations sequentially
- Forgetting to handle rejection
- Assuming `await` blocks the entire runtime
