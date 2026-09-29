# Type Narrowing

Narrowing reduces a broad type to a more specific type using control flow.

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase();
  }

  return id.toFixed(0);
}
```

## Equality narrowing

```ts
function compare(a: string | number, b: string | number) {
  if (a === b) {
    return a;
  }
}
```

## Truthiness

```ts
function length(value: string | null) {
  if (value) return value.length;
  return 0;
}
```

Be careful: empty strings, 0 and false are falsy.

## Discriminant narrowing

```ts
type Result =
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function render(result: Result) {
  if (result.status === "success") {
    return result.data.join(", ");
  }

  return result.message;
}
```

Prefer narrowing over assertions when runtime evidence is available.