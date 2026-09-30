# 21 — Promises

A Promise represents the eventual outcome of asynchronous work. It can be pending, fulfilled, or rejected, and settles only once.

## Basic example
    const promise = new Promise(resolve => {
      setTimeout(() => resolve("Data loaded"), 500);
    });
    promise.then(value => console.log(value));

## Real frontend use case — API calls
    fetch("/api/users")
      .then(response => {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then(users => renderUsers(users))
      .catch(error => showError(error));

Important: fetch normally does not reject only because the server returns HTTP 404/500. Check response.ok.

## Promise chaining
    getUser()
      .then(user => getOrders(user.id))
      .then(orders => renderOrders(orders))
      .catch(handleError);

Return the next Promise. Forgetting to return it breaks the chain.

## Composition
- Promise.all: all must fulfill; one rejection rejects the combined Promise.
- Promise.allSettled: waits for every result.
- Promise.race: first settlement wins; it does not cancel the losers.
- Promise.any: first fulfillment wins; all rejection produces AggregateError.

## Interview point
A Promise does not create a new JavaScript thread. It provides a composable model for asynchronous completion.

**Next:** async/await provides cleaner Promise control flow.

## Deeper learning standard

### Mental model

```text
pending → fulfilled
        ↘ rejected
```

A Promise settles only once. Promise chaining works because then/catch/finally return new Promises.

### Important distinction

Promise.all is coordination, not cancellation. Promise.race is also coordination, not cancellation. If an operation must stop, use an API that supports cancellation such as AbortController.

### Interview exercise

Build a dashboard loader with three independent requests. Start them concurrently, handle HTTP failures, and explain why Promise.all is appropriate.

### Frontend connection

```text
Callback
  ↓
Promise
  ↓
async/await
  ↓
Error handling
  ↓
Event loop
```

**What this unlocks:** async/await gives Promise-based code a sequential-looking syntax.
