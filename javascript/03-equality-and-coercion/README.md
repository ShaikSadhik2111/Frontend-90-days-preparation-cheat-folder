# 03 — Equality and Coercion

## Why this matters

Many JavaScript interview questions are really tests of whether you understand **type conversion + equality + object identity**.

## 1. Strict equality

`===` compares values without the usual type coercion.

```js
1 === 1;       // true
1 === "1";     // false
true === 1;    // false
```

For objects, equality is based on reference identity:

```js
{} === {}; // false

const a = {};
const b = a;

a === b; // true
```

### Frontend use case

Reference equality is important for:

- React memoization
- state-change detection
- Redux selectors
- cache keys
- avoiding unnecessary renders

## 2. Loose equality

`==` performs JavaScript's defined coercion algorithm.

```js
1 == "1"; // true
0 == false; // true
```

Do not explain `==` as “random” or simply “bad”. It is rule-based, but the rules are easy to misuse.

For normal application code, `===` is usually clearer.

## 3. Object.is

`Object.is` is useful for two special numeric cases:

```js
Object.is(NaN, NaN); // true
Object.is(-0, 0);    // false

NaN === NaN; // false
-0 === 0;    // true
```

## 4. Coercion

JavaScript can convert values implicitly.

```js
"5" + 2; // "52"
"5" - 2; // 3

Boolean(""); // false
Number("42"); // 42
String(42);   // "42"
```

The `+` operator is especially important because it can mean numeric addition or string concatenation.

## 5. Truthy and falsy

Falsy values include:

```text
false
0
-0
0n
""
null
undefined
NaN
```

Everything else is truthy.

```js
const token = "";

if (!token) {
  console.log("No token");
}
```

### Pitfall

```js
const count = 0;

if (count) {
  // does not run
}
```

If zero is valid, use an explicit check instead.

## 6. Practical normalization

When consuming form input, values are often strings:

```js
const rawAge = "25";
const age = Number(rawAge);

if (Number.isFinite(age)) {
  console.log(age);
}
```

This is safer than relying on implicit conversion throughout business logic.

## Interview questions

### Why is {} === {} false?

Because each object literal creates a different object reference.

### Why is NaN !== NaN?

Because strict equality follows the ECMAScript numeric equality semantics; `Object.is` treats NaN as equal to itself.

### Why does "5" - 2 produce 3?

The subtraction operator converts operands to numeric values.

**Next:** strings apply these value/coercion rules to text processing.