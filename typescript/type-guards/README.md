# Type Guards

A type guard is a runtime check that gives TypeScript evidence for narrowing.

## typeof

```ts
function format(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value.toFixed(2);
}
```

## instanceof

```ts
function printError(error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
```

## in

```ts
type Admin = { permissions: string[] };
type User = { name: string };

function describe(value: Admin | User) {
  if ("permissions" in value) {
    return value.permissions;
  }

  return value.name;
}
```

## Custom predicate

```ts
function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return "id" in value && "name" in value;
}
```

A type predicate must correspond to a real runtime check. It does not magically validate data.