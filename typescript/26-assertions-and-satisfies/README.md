# Assertions and satisfies

## Type assertion

An assertion tells TypeScript to treat a value as a type.

```ts
const root =
  document.getElementById("root") as HTMLDivElement | null;
```

It does **not** perform runtime validation.

## Non-null assertion

```ts
const root = document.getElementById("root")!;
```

This tells TypeScript that the value is not null. If that assumption is wrong, runtime code can fail.

Use carefully.

## as const

```ts
const config = {
  mode: "strict",
  retries: 3,
} as const;
```

This preserves literal values and makes properties readonly at the type level.

## satisfies

```ts
type RouteConfig = {
  path: string;
  auth: boolean;
};

const routes = {
  home: { path: "/", auth: false },
  admin: { path: "/admin", auth: true },
} satisfies Record<string, RouteConfig>;
```

`satisfies` checks that the expression conforms to the target type while retaining the expression's more specific inferred type.

## Interview comparison

- Annotation: gives the variable a target type.
- Assertion: tells the compiler to trust your type claim.
- satisfies: checks compatibility while preserving the expression's inferred details.