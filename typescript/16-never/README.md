# 16 — never

## Connection from Previous Topic

`unknown` represents something we do not yet know. `never` represents something that **cannot happen** in the current type model.

## Function that never completes normally

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

A function returning `never` cannot successfully return a value.

Infinite loops can also produce `never`:

```ts
function runForever(): never {
  while (true) {}
}
```

## Exhaustiveness

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function assertNever(value: never): never {
  throw new Error("Unexpected shape");
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side ** 2;
    default: return assertNever(shape);
  }
}
```

If `triangle` is added but not handled, the default value is no longer `never`, producing a compile-time error.

## `never` in conditional types

```ts
type OnlyStrings<T> = T extends string ? T : never;

type Result = OnlyStrings<string | number>;
// string
```

This becomes important later when learning conditional types and distributive behavior.

## never vs void

- `void`: a function may complete but callers should not use its return value.
- `never`: the function cannot complete normally with a value.

## Frontend use cases

- exhaustive reducers
- state machines
- impossible branches
- filtering union members in conditional types

## Interview questions

**Why is `never` useful?** It represents impossible values and powers exhaustive checking and type-level filtering.

## Mini challenge

Add a third shape to the `Shape` union and observe how `assertNever` exposes the missing case.

## What This Unlocks Next

Now we can model known and impossible states. Next we make functions reusable while preserving relationships between their input and output types:

**never → Generics**.