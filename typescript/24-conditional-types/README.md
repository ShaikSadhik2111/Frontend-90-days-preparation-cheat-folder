# 24 — Conditional Types

## Connection from Previous Topic

Mapped types transform every property. Conditional types choose a type based on whether one type satisfies a condition.

## Basic syntax

```ts
type MessageOf<T> =
  T extends { message: unknown }
    ? T["message"]
    : never;
```

Read it as:

> If `T` extends the required shape, return the message type; otherwise return `never`.

## infer

`infer` lets a conditional type capture a type discovered inside another type.

```ts
type ElementType<T> =
  T extends Array<infer U> ? U : T;

type A = ElementType<string[]>; // string
type B = ElementType<number>;   // number
```

## Distributive conditional types

When a naked generic parameter is checked, unions distribute:

```ts
type ToArray<T> = T extends unknown ? T[] : never;

type Result = ToArray<string | number>;
// string[] | number[]
```

Prevent distribution by wrapping the parameter:

```ts
type ToArray<T> = [T] extends [unknown] ? T[] : never;
```

## Frontend use cases

- extracting API payload types
- deriving async result types
- filtering union members
- reusable library utilities
- component prop transformations

## Interview questions

Know:

- conditional syntax
- `extends` as a type relationship
- `infer`
- distributive behavior
- how utility types can be expressed using these ideas

## Common mistake

Do not write conditional types merely to demonstrate complexity. Prefer a simple type when it communicates the design clearly.

## Mini challenge

Create a type that extracts the success payload from a discriminated union containing `{ status: "success"; data: T }`.

## What This Unlocks Next

We can now branch on type relationships. Next we generate strongly typed **strings and keys**:

**Conditional Types → Template Literal Types**.