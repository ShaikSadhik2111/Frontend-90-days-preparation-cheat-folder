# 17 — Generics

## Connection from Previous Topic

We have learned precise alternatives and impossible states. Now we need reusable code that works across many types **without losing the relationship between those types**.

## Why This Topic Exists

A poorly typed helper might use `any`:

```ts
function identity(value: any): any {
  return value;
}
```

The relationship between input and output is lost.

Generics preserve it:

```ts
function identity<T>(value: T): T {
  return value;
}

const result = identity("hello"); // string
```

## Generic arrays

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}
```

The caller gets the correct element type.

## Multiple type parameters

```ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
```

## Generic interfaces

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
}

type UserResponse = ApiResponse<User>;
```

This is a common frontend pattern for reusable API envelopes.

## Generic classes

```ts
class Store<T> {
  constructor(private value: T) {}

  get(): T {
    return this.value;
  }
}
```

## Generic constraints preview

Sometimes a generic needs guaranteed capabilities:

```ts
function getId<T extends { id: string }>(value: T): string {
  return value.id;
}
```

That `extends` means “T must satisfy this constraint,” not class inheritance. We will study it next.

## Frontend use cases

- API response wrappers
- reusable tables/selects
- typed data stores
- repository helpers
- utility functions
- generic React components

## Common mistake

Generics are not automatically better. If a function does not need to preserve a type relationship, a simple concrete type may be clearer.

## Interview questions

**Why generics instead of `any`?** Generics preserve relationships and compiler information.

**What does `T` mean?** It is a type parameter chosen by the caller/inference; the name itself is arbitrary.

## Mini challenge

Create a generic `ApiResponse<T>` and a generic `getFirst<T>` helper. Use them with `User` and `Product`.

## What This Unlocks Next

Generic code is reusable, but sometimes it needs guarantees about what `T` can do:

**Generics → Generic Constraints**.