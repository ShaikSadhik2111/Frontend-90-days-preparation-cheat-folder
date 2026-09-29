# Promises

A Promise represents the eventual result of an asynchronous operation.

## States
- pending
- fulfilled
- rejected

A promise settles only once.

```js
fetch("/api/users")
  .then(response => response.json())
  .then(users => console.log(users))
  .catch(error => console.error(error));
```

## Composition
- `Promise.all`: fulfills when all fulfill; rejects when one rejects.
- `Promise.allSettled`: waits for every promise and reports each outcome.
- `Promise.race`: settles with the first settled promise.
- `Promise.any`: fulfills with the first fulfilled promise; rejects with AggregateError if all reject.

## Error propagation
A rejection travels down the promise chain until a rejection handler handles it.

## Pitfalls
- Forgetting to return a promise inside `.then`
- Using `Promise.all` when partial success is acceptable
- Assuming Promise means a new thread
