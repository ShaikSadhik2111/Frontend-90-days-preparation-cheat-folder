# 22 — Async / Await

An async function always returns a Promise. await suspends that async function's continuation until the awaited Promise settles; it does not block the whole runtime.

## API example
    async function loadUser() {
      const response = await fetch("/api/user");
      if (!response.ok) throw new Error("Failed to load user");
      return response.json();
    }

## Error handling
    async function load() {
      try {
        return await loadUser();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

## Sequential vs parallel
Independent calls should often run together:
    const [users, orders] = await Promise.all([
      loadUsers(),
      loadOrders()
    ]);

This is common for dashboard pages where widgets use independent APIs.

## Loops
Sequential:
    for (const id of ids) {
      await loadUser(id);
    }

Concurrent when appropriate:
    const users = await Promise.all(ids.map(id => loadUser(id)));

Consider API rate limits before increasing concurrency.

## finally
    try { await save(); }
    catch (error) { handle(error); }
    finally { hideLoader(); }

**Interview checklist:** async return type, await semantics, parallel work, try/catch/finally, Promise composition, cancellation.

## Deeper learning standard

### What await actually does

Await suspends the continuation of the current async function. It does not block the entire JavaScript runtime.

```js
async function run() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

run();
console.log("C");
// A, C, B
```

### Important performance distinction

Independent operations should normally start together:

```js
const [user, orders] = await Promise.all([
  loadUser(),
  loadOrders()
]);
```

Sequential awaits are appropriate when the second operation depends on the first.

### Common interview trap

```js
ids.forEach(async id => {
  await loadUser(id);
});
```

forEach does not wait for the returned Promises. Use for...of for intentional sequential work or Promise.all(ids.map(...)) for intentional concurrency.

### Practical challenge

Implement a dashboard loader with loading, success and error states. Run independent API requests concurrently and explain the trade-off between sequential and concurrent work.

**What this unlocks:** asynchronous code now needs reliable error handling, cancellation and stale-response protection.
