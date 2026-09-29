# typeof

There are two important meanings.

## JavaScript runtime typeof

```ts
typeof "hello"; // "string"
typeof 10;      // "number"
typeof true;    // "boolean"
```

## TypeScript type-level typeof

It can obtain the type of an existing value:

```ts
const config = {
  retries: 3,
  mode: "safe",
} as const;

type Config = typeof config;
```

This is useful when one runtime object should be the source of truth for a type.

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