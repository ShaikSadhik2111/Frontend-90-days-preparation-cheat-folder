# 12 — Type Narrowing

## Connection from Previous Topic

Unions describe alternatives. At runtime, JavaScript has one actual value, so we need to narrow a broad TypeScript type before using member-specific operations.

## Why This Topic Exists

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toFixed(0);
}
```

TypeScript uses **control-flow analysis** to remember what a check proved.

## Common narrowing techniques

### typeof

```ts
function format(value: string | number) {
  if (typeof value === "string") return value.toUpperCase();
  return value.toFixed(2);
}
```

### Equality

```ts
function compare(a: string | number, b: string | number) {
  if (a === b) return a;
}
```

### Truthiness

```ts
function length(value: string | null) {
  if (value) return value.length;
  return 0;
}
```

Be careful: `""`, `0`, `false`, `null`, and `undefined` are falsy.

### Property/discriminant checks

```ts
type Result =
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function render(result: Result) {
  if (result.status === "success") return result.data.join(", ");
  return result.message;
}
```

## Assignment narrowing

TypeScript can narrow variables based on assignments and control flow:

```ts
let value: string | number = "hello";
value.toUpperCase();

value = 10;
value.toFixed();
```

## Narrowing vs assertion

Prefer evidence-based narrowing:

```ts
if (typeof value === "string") {
  value.toUpperCase();
}
```

over blindly asserting:

```ts
(value as string).toUpperCase();
```

An assertion changes what the compiler believes; narrowing is based on runtime evidence.

## Frontend use cases

- API result states
- optional form values
- DOM elements
- error handling with `unknown`
- reducer actions
- component variants

## Interview questions

**What is narrowing?** Control-flow analysis that reduces a broad type to a more specific type.

**Why is narrowing important?** It connects compile-time safety with runtime checks.

## Mini challenge

Create `string | number | null` and write a function that safely formats all three cases.

## What This Unlocks Next

Narrowing uses runtime checks. The next folder names and reuses those checks as **type guards**.

**Type Narrowing → Type Guards**.