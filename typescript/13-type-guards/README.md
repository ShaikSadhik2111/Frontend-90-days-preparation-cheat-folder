# 13 — Type Guards

## Connection from Previous Topic

Type narrowing is the result. A **type guard** is the runtime evidence that allows TypeScript to perform that narrowing.

## Built-in guards

### typeof

```ts
function format(value: string | number) {
  if (typeof value === "string") return value.toUpperCase();
  return value.toFixed(2);
}
```

### instanceof

```ts
function printError(error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
```

### in

```ts
type Admin = { permissions: string[] };
type User = { name: string };

function describe(value: Admin | User) {
  if ("permissions" in value) return value.permissions;
  return value.name;
}
```

## Custom type predicates

```ts
interface User {
  id: string;
  name: string;
}

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;

  return (
    "id" in value &&
    typeof value.id === "string" &&
    "name" in value &&
    typeof value.name === "string"
  );
}
```

The `value is User` return type tells TypeScript what is true when the function returns `true`.

## Important limitation

A predicate does not magically validate data. If the implementation is incorrect, TypeScript trusts the predicate.

For nested API data, a real runtime schema validator may be appropriate.

## Frontend use cases

- validating API responses
- handling `unknown` errors
- narrowing DOM values
- feature-specific object variants
- reusable domain checks

## Interview questions

**Is a type guard compile-time or runtime?** The check executes at runtime; its result gives the compiler narrowing information.

**What does `value is User` mean?** When true, TypeScript may treat `value` as `User` in the relevant control-flow branch.

## Mini challenge

Write `isApiError(value: unknown): value is { message: string }` with a genuine runtime check.

## What This Unlocks Next

Custom guards work well for independent shapes. For application state, a shared literal discriminant gives an even cleaner model:

**Type Guards → Discriminated Unions**.