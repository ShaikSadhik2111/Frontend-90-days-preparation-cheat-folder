# 20 — typeof

## Connection from Previous Topic

`keyof` derives keys from a type. TypeScript's type-level `typeof` lets us derive a type from an existing value.

## Two meanings of typeof

### JavaScript runtime operator

```ts
console.log(typeof "hello"); // "string"
console.log(typeof 10);      // "number"
```

This executes at runtime.

### TypeScript type operator

```ts
const config = {
  retries: 3,
  mode: "safe",
} as const;

type Config = typeof config;
```

This exists only for type checking.

## Why derive types from values?

It creates one source of truth:

```ts
const routes = {
  home: "/",
  users: "/users",
} as const;

type Routes = typeof routes;
type RouteName = keyof typeof routes;
```

If the value changes, the derived types change with it.

## Frontend use cases

- route/config objects
- feature flags
- constant maps
- design tokens
- API configuration
- event maps

## Interview trap

Do not confuse:

```ts
typeof value
```

inside an expression with:

```ts
type T = typeof value;
```

inside a type position.

## Mini challenge

Create a `permissions` object with `as const`, then derive its type and its key union without repeating the names manually.

## What This Unlocks Next

We can derive a whole type from a value. Next we select **specific property types** from a type:

**typeof → Indexed Access Types**.