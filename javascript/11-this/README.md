# 11 — this

## Core rule

For an ordinary function, `this` is primarily determined by **how the function is called**.

Arrow functions are different: they capture `this` lexically from their surrounding scope.

## 1. Method call

```js
const user = {
  name: "Sam",
  greet() {
    return `Hello ${this.name}`;
  }
};

user.greet(); // Hello Sam
```

The call form `user.greet()` supplies `user` as the receiver.

## 2. Detached method

```js
const greet = user.greet;

// In strict/module code, this is not user.
greet();
```

Passing a method as a callback does not automatically preserve its receiver.

### Frontend use case

This can appear when passing class methods to event handlers or callbacks.

## 3. Explicit binding

```js
function greet(prefix) {
  return `${prefix} ${this.name}`;
}

const user = { name: "Sam" };

greet.call(user, "Hello");
greet.apply(user, ["Hello"]);

const bound = greet.bind(user);
bound("Hello");
```

- `call`: invokes immediately with explicit `this`
- `apply`: same idea with an argument array
- `bind`: returns a new function with fixed `this`

## 4. Constructor call

```js
function User(name) {
  this.name = name;
}

const user = new User("Sam");
```

With `new`, a new object is created and used as `this`, with prototype linkage established.

## 5. Arrow functions

```js
const user = {
  name: "Sam",

  normal() {
    return this.name;
  },

  arrow: () => this.name
};
```

The arrow does not get `user` as `this`.

A practical pattern:

```js
const user = {
  name: "Sam",

  greetLater() {
    setTimeout(() => {
      console.log(this.name);
    }, 100);
  }
};
```

The arrow callback captures `this` from `greetLater`.

## 6. Strict mode

In strict-mode ordinary function calls:

```js
"use strict";

function test() {
  return this;
}

console.log(test()); // undefined
```

ES modules are strict by default.

## Interview checklist

- method call
- plain call
- constructor call
- call/apply/bind
- arrow lexical `this`
- detached methods
- strict mode

**Next:** closures connect functions with the lexical environments they retain.