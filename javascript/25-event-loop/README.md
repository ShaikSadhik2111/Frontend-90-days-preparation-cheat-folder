# Event Loop

JavaScript executes synchronous code on the call stack. Asynchronous APIs arrange later work through queues/tasks, allowing the runtime to continue.

## Simplified model
```text
Call Stack
   ↓
Host APIs
   ↓
Task / Microtask queues
   ↓
Event loop
   ↓
Call Stack
```

Promise reactions are scheduled as microtasks. Timers such as `setTimeout` use task/timer mechanisms provided by the host.

## Example
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

Typical browser ordering:

```text
A
D
C
B
```

The exact scheduling model depends on the host, but microtask processing occurs before the next task in the common browser model.

## Interview focus
Explain the difference between synchronous stack execution, microtasks, tasks and host APIs. Avoid saying "JavaScript has only one thread" without explaining browser/Node worker capabilities.
