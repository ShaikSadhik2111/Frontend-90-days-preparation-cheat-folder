# 08 — Functions

Functions are **first-class values** in JavaScript. This is the foundation for callbacks, closures, higher-order functions, React handlers and functional programming.

## 1. Function declaration

```js
function add(a, b) {
  return a + b;
}
```

Function declarations are initialized differently from function expressions and can generally be called before their source position.

## 2. Function expression

```js
const add = function (a, b) {
  return a + b;
};
```

The variable binding is subject to normal `const` initialization rules.

## 3. Arrow functions

```js
const add = (a, b) => a + b;
```

Arrow functions:

- have lexical `this`
- do not have their own `arguments`
- cannot be called with `new`

Use them heavily for callbacks where lexical `this` is desirable.

## 4. Parameters

Default:

```js
function greet(name = "Guest") {
  return `Hello ${name}`;
}
```

Rest:

```js
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
```

Destructuring:

```js
function renderUser({ name, role }) {
  return `${name}: ${role}`;
}
```

## 5. Functions as values

```js
function execute(operation, a, b) {
  return operation(a, b);
}

const multiply = (a, b) => a * b;

execute(multiply, 3, 4); // 12
```

### Real use cases

- array callbacks
- event handlers
- validators
- middleware
- retry strategies
- dependency injection
- React props such as `onClick`

## 6. Returning functions

```js
function createMultiplier(factor) {
  return value => value * factor;
}

const double = createMultiplier(2);

double(10); // 20
```

This leads directly to closures and function factories.

## 7. Pure functions

A pure function:

1. gives the same output for the same inputs
2. does not produce observable side effects

```js
function addTax(price, rate) {
  return price * (1 + rate);
}
```

Pure functions are easier to test and compose.

## 8. Function vs method

```js
const user = {
  name: "Sam",
  greet() {
    return `Hi ${this.name}`;
  }
};
```

A method is a function accessed as an object property. The call form affects `this`.

## 9. Common pitfall: passing vs calling

Correct:

```js
button.addEventListener("click", handleClick);
```

Incorrect when the API expects a callback:

```js
button.addEventListener("click", handleClick());
```

The second version executes immediately and passes its return value.

## Interview checklist

- declaration vs expression
- arrow functions
- parameters/rest/defaults
- first-class functions
- pure vs impure functions
- callbacks
- returning functions
- method call and `this`

**Next:** scope explains where variables used by functions come from.