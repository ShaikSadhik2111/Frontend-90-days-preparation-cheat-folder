# 23 — Mapped Types

## Connection from Previous Topic

Utility types are reusable transformations. Mapped types explain how to build transformations that iterate over the keys of another type.

## Basic pattern

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

For:

```ts
type User = { id: string; name: string };
```

`Optional<User>` becomes:

```ts
{ id?: string; name?: string }
```

## Modifiers

Remove readonly:

```ts
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
```

Add readonly:

```ts
type Immutable<T> = {
  readonly [K in keyof T]: T[K];
};
```

## Key remapping

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<{
  name: string;
  age: number;
}>;
```

This produces `getName` and `getAge` with the correct return types.

## Frontend use cases

- form state transformations
- immutable/readonly models
- permission maps
- generated event handlers
- derived component APIs
- strongly typed configuration

## Mental model

```text
keyof T
→ iterate each key
→ optionally change modifiers
→ optionally rename key
→ assign a new value type
```

## Interview questions

**What does `in keyof T` do?** Iterates over the known keys of `T`.

**What is key remapping?** The `as` clause changes the generated property name.

## Mini challenge

Create a `Nullable<T>` mapped type that adds `null` to every property, then create a `Getters<T>` type.

## What This Unlocks Next

Mapped types transform properties uniformly. Next we need transformations that make a **decision based on a type**:

**Mapped Types → Conditional Types**.