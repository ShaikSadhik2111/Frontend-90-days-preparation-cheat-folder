# 22 — Utility Types

## Connection from Previous Topic

Indexed access lets us select pieces of types. Utility types package common transformations so we do not repeatedly write them ourselves.

## Core utilities

Given:

```ts
interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}
```

### Partial

```ts
type UserPatch = Partial<User>;
```

Useful for PATCH/update objects.

### Required

```ts
type CompleteUser = Required<User>;
```

### Readonly

```ts
type ImmutableUser = Readonly<User>;
```

### Pick / Omit

```ts
type PublicUser = Pick<User, "id" | "name">;
type CreateUser = Omit<User, "id">;
```

### Record

```ts
type ErrorMap = Record<string, string>;
```

### Exclude / Extract

```ts
type Status = "idle" | "loading" | "success" | "error";

type Finished = Exclude<Status, "idle" | "loading">;
type Active = Extract<Status, "idle" | "loading">;
```

### NonNullable

```ts
type Name = NonNullable<string | null | undefined>;
// string
```

### ReturnType / Parameters

```ts
function createUser(name: string, age: number) {
  return { name, age };
}

type CreatedUser = ReturnType<typeof createUser>;
type CreateUserArgs = Parameters<typeof createUser>;
```

### Awaited

```ts
type UserResult = Awaited<Promise<User>>;
```

## Frontend use cases

- create/update DTOs
- public vs private response models
- reducer/action payloads
- configuration objects
- extracting API/client function types
- immutable state models

## Why learn how utilities work?

You do not need to memorize their implementation, but understanding that many are built from `keyof`, mapped types and conditional types makes the type system much easier to reason about.

## Interview questions

Know the practical difference between `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, `NonNullable`, `ReturnType`, `Parameters`, and `Awaited`.

## Mini challenge

Create `UpdateUser = Partial<Omit<User, "id">>` and explain why this is safer than `any`.

## What This Unlocks Next

Built-in utilities solve common transformations. Next we learn how to build our own property-by-property transformations:

**Utility Types → Mapped Types**.