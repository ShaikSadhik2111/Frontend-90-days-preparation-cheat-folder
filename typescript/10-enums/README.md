# Enums

Enums create named constants.

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

String enums are usually easier to reason about than numeric enums.

## Literal union alternative

```ts
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
```

For many frontend contracts, unions are simpler because they remain plain JavaScript values and don't create enum runtime objects.

## Interview topics

Know:
- numeric enums
- string enums
- reverse mapping behavior of numeric enums
- runtime output
- why a string union may be preferred for API/UI states