# never

`never` represents a value that cannot occur.

## Function that never returns

```ts
function fail(message: string): never {
  throw new Error(message);
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
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default:
      return assertNever(shape);
  }
}
```

If a new shape is added and not handled, the default value is no longer `never`, producing a compile-time error.

## never vs void

- `void`: a function may finish and its result is ignored.
- `never`: the function cannot successfully finish normally.