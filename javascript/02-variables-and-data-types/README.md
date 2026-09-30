# 02 — Variables and Data Types

## What this topic gives you

JavaScript variables are **bindings to values**. JavaScript is dynamically typed, so the same binding can later refer to a value of another type.

```js
let value = 10;
value = "hello";
value = { active: true };
```

For frontend interviews, understand the difference between **primitive values, object references, mutation, identity, and numeric precision**.

## 1. Primitive types

JavaScript has seven primitive types:

- string
- number
- bigint
- boolean
- undefined
- null
- symbol

Everything else is an object value, including arrays and functions.

```js
const name = "Sadhik";
const age = 25;
const active = true;
const id = 123n;
const nothing = null;
let missing;
const key = Symbol("id");
```

### Where used

- strings: labels, API text, URLs
- numbers: prices, counts, pagination
- booleans: loading/auth/feature flags
- BigInt: very large integer identifiers/calculations
- Symbol: framework/library protocols and collision-resistant keys

## 2. Primitive vs object behavior

Primitives are immutable values.

```js
let a = 10;
let b = a;
b = 20;

console.log(a); // 10
```

Objects are reference values:

```js
const user1 = { name: "Sam" };
const user2 = user1;

user2.name = "Alex";

console.log(user1.name); // Alex
```

This matters in React/Angular because accidental mutation can make state updates difficult to detect.

## 3. typeof

```js
typeof "hello";       // "string"
typeof 10;            // "number"
typeof true;          // "boolean"
typeof undefined;     // "undefined"
typeof 10n;           // "bigint"
typeof Symbol("x");   // "symbol"
typeof {};            // "object"
typeof function () {}; // "function"
typeof null;          // "object" — historical behavior
```

For arrays:

```js
Array.isArray([]); // true
```

## 4. Number and precision

JavaScript `number` uses IEEE-754 double precision.

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

For money, avoid assuming binary floating point gives exact decimal arithmetic.

A common practical approach is to store currency in the smallest unit:

```js
const priceInPaise = 9999;
const priceInRupees = priceInPaise / 100;
```

For integers outside the safe integer range, consider BigInt:

```js
const huge = 9007199254740993n;
```

Do not mix BigInt and Number directly.

## 5. null vs undefined

```js
let value;            // undefined
const user = null;    // explicitly empty
```

Typical interpretation:

- `undefined`: value has not been supplied/initialized
- `null`: application intentionally represents no value

APIs may use either, so inspect the contract instead of assuming.

## 6. const does not make objects immutable

```js
const user = { name: "Sam" };

user.name = "Alex"; // allowed
// user = {};       // TypeError
```

`const` prevents rebinding. It does not recursively freeze the object.

## 7. Shallow copying

```js
const original = {
  name: "Sam",
  address: { city: "Hyderabad" }
};

const copy = { ...original };

copy.name = "Alex";
copy.address.city = "Bengaluru";

console.log(original.name); // Sam
console.log(original.address.city); // Bengaluru
```

The outer object was copied, but the nested object was still shared.

### Frontend use case

When updating nested React state, copy every object/array level that you modify.

## 8. Interview checklist

- Primitive vs object values
- Reference identity
- `typeof null`
- `Array.isArray`
- Number precision
- safe integers
- BigInt
- null vs undefined
- const vs immutability
- shallow vs deep copying

## Practice

Predict the output:

```js
const a = { count: 1 };
const b = { ...a };

b.count++;

console.log(a.count);
console.log(b.count);
```

Answer: `1` and `2`.

**Next:** equality and coercion explains how these different values interact.