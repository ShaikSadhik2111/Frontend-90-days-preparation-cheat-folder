# Union Types

A union means a value can be one of several types.

```ts
type Id = string | number;

function formatId(id: Id): string {
  return typeof id === "string"
    ? id.toUpperCase()
    : id.toString();
}
```

Before narrowing, only operations valid for every union member are safe.

## Literal union

```ts
type Status = "idle" | "loading" | "success" | "error";
```

This is excellent for UI state because invalid states become harder to represent.

## Interview question

Union = alternatives. Intersection = combined requirements.

## Exercise

Create a `Payment` union with `card`, `upi`, and `cash`, each carrying different fields.