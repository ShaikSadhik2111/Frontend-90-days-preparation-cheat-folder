# Type Inference

TypeScript can infer many types without annotations.

```ts
const count = 10;       // number
const name = "Sadhik";  // string
const ids = [1, 2, 3];  // number[]
```

## Return-type inference

```ts
function add(a: number, b: number) {
  return a + b;
}
// inferred return type: number
```

## Contextual typing

```ts
const ids = [1, 2, 3];
const labels = ids.map(id => id.toString());
// id is inferred as number
```

## Literal widening

```ts
let status = "loading"; // string
const mode = "dark";    // "dark"
```

Use `as const` when a value should retain literal types:

```ts
const config = {
  mode: "dark",
  retries: 3,
} as const;
// { readonly mode: "dark"; readonly retries: 3 }
```

## Interview points

- Inference reduces unnecessary annotations.
- Contextual typing comes from the expected type.
- Mutable values can widen literal types.
- Public APIs should usually have intentional, readable contracts.

## Exercise

Create a config object with literal values and derive its type using `typeof`.