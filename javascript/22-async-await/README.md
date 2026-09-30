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