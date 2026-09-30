# 26 — Assertions and satisfies

## Connection from Previous Topic

Template literal and mapped types let the compiler derive precise types. Sometimes the compiler cannot infer something that you know from the surrounding runtime context. Assertions and `satisfies` solve different versions of that problem.

## Type assertion

```ts
const root = document.getElementById("root") as HTMLDivElement | null;
```

An assertion changes the compiler's view. **It does not validate or convert the runtime value.**

## Non-null assertion

```ts
const root = document.getElementById("root")!;
```

This tells TypeScript to assume the value is not null. If the assumption is wrong, runtime code can fail.

## as const

```ts
const config = {
  mode: "strict",
  retries: 3,
} as const;
```

This preserves literal values and makes the properties readonly in the inferred type.

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

`satisfies` checks that the expression conforms to the target type while retaining its more specific inferred type.

## Annotation vs assertion vs satisfies

### Annotation

```ts
const routes: Record<string, RouteConfig> = { ... };
```

The variable is typed as the target type.

### Assertion

```ts
const routes = value as Record<string, RouteConfig>;
```

You tell TypeScript to trust your claim.

### satisfies

```ts
const routes = value satisfies Record<string, RouteConfig>;
```

You check compatibility while preserving the expression's inferred details.

## Frontend use cases

- DOM APIs
- strongly typed configuration
- route maps
- feature flags
- design tokens
- constant objects

## Common mistake

Do not use assertions to silence errors you have not investigated. At API boundaries, runtime validation is different from a TypeScript assertion.

## Interview questions

**Does `as User` validate JSON?** No.

**Why use `satisfies`?** To verify a contract without unnecessarily widening away useful inference.

## Mini challenge

Create a route configuration where one invalid route property causes a compile error while valid route-specific literals remain available.

## What This Unlocks Next

We now know how TypeScript represents and transforms types. Next we need to understand **when two different types are considered compatible**:

**Assertions/satisfies → Type Compatibility**.