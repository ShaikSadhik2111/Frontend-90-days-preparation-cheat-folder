# 18 — Functional Programming

JavaScript is multi-paradigm. Functional programming is a style that emphasizes predictable transformations and controlled side effects.

## Core ideas

- functions as values
- pure functions
- immutability
- higher-order functions
- composition
- declarative transformations

## 1. Pure function

```js
function calculateTotal(price, tax) {
  return price * (1 + tax);
}
```

Same inputs produce the same result and the function does not modify external state.

## 2. Impure function

```js
let total = 0;

function add(value) {
  total += value;
}
```

The result depends on external mutable state.

Impure code is not automatically wrong. Side effects are necessary for I/O, UI updates, network calls, logging and persistence. The goal is to control them.

## 3. Declarative transformation

```js
const activeNames = users
  .filter(user => user.active)
  .map(user => user.name);
```

This describes what data transformation is needed.

## 4. Immutability

Instead of:

```js
items.push(newItem);
```

use:

```js
const nextItems = [...items, newItem];
```

This is particularly important for state management.

## 5. Composition

```js
const normalize = value => value.trim().toLowerCase();
const isValid = value => value.length >= 3;

const validate = value => isValid(normalize(value));
```

Small functions can be combined into domain logic.

## Real frontend use cases

Functional patterns are common in:

- React state updates
- Redux reducers/selectors
- API data transformations
- validation
- form processing
- reusable utilities
- testing

## Pitfall

Do not turn every operation into a long chain of `map/filter/reduce`. Clarity is more important than functional style.

**Next:** currying transforms function argument structure.