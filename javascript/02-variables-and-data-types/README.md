# Variables and Data Types

## Primitives
- String
- Number
- BigInt
- Boolean
- Undefined
- Null
- Symbol

Primitives are immutable values. Objects are reference values.

```js
let a = 10;
let b = a;
b = 20; // a remains 10

const x = { value: 10 };
const y = x;
y.value = 20; // x.value is now 20
```

## typeof
`typeof null` is `"object"` for historical compatibility. Arrays and ordinary objects both return `"object"`, so use `Array.isArray()` for arrays.

## Number
JavaScript `number` uses IEEE-754 double precision. This explains precision surprises such as:

```js
0.1 + 0.2 !== 0.3
```

Use `BigInt` for integer values outside the safe integer range when appropriate.

## Copying
Primitive assignment copies a value. Object assignment copies a reference. Use structured cloning or an intentional transformation when a deep copy is required.

## Pitfalls
- Treating `const` as deep immutability
- Assuming all numbers are exact integers
- Confusing reference identity with structural equality
