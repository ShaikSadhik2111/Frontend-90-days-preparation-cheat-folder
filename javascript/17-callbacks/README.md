# 17 — Callbacks

A callback is a function supplied to another function to be invoked later or during an operation.

## 1. Synchronous callback

```js
const numbers = [1, 2, 3];

const doubled = numbers.map(number => number * 2);
```

The callback runs during the `map` operation.

## 2. Event callback

```js
button.addEventListener("click", () => {
  console.log("Clicked");
});
```

The browser invokes the callback when the event occurs.

## 3. Timer callback

```js
setTimeout(() => {
  console.log("Runs later");
}, 1000);
```

The host schedules the callback for later execution.

## 4. Node-style error-first callback

Historical Node APIs commonly use:

```js
fs.readFile("file.txt", (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
});
```

The first parameter represents failure.

## 5. Callback hell

Nested asynchronous callbacks can become difficult to maintain:

```js
getUser(user => {
  getOrders(user, orders => {
    getPayment(orders, payment => {
      // deeply nested flow
    });
  });
});
```

Promises and `async/await` provide better composition for many async workflows.

## 6. Common callback bugs

### Calling instead of passing

```js
setTimeout(handle(), 1000); // executes immediately
setTimeout(handle, 1000);   // passes function
```

### Losing this

```js
const handler = user.greet;
button.addEventListener("click", handler);
```

The receiver is not automatically preserved.

## Frontend use cases

Callbacks appear in:

- event listeners
- array transformations
- timers
- subscriptions
- observers
- custom hooks
- library APIs

**Next:** functional programming combines first-class functions, purity and composition.