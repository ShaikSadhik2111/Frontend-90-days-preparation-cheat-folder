# Destructuring, Spread and Rest

## Destructuring
Extract values from arrays or properties from objects.

```js
const { name, age } = user;
const [first, second] = items;
```

## Spread
Expands iterable values or own enumerable properties.

```js
const copy = { ...user };
const combined = [...a, ...b];
```

## Rest
Collects remaining arguments/properties/elements.

```js
function sum(...numbers) {}
```

## Critical distinction
Spread creates a shallow copy. Nested objects remain shared.

## Pitfall
Object spread copies own enumerable properties; it does not clone prototypes, descriptors or nested objects.
