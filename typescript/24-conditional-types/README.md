# Conditional Types

Conditional types choose a type based on a relationship.

```ts
type MessageOf<T> =
  T extends { message: unknown }
    ? T["message"]
    : never;
```

## infer

```ts
type ElementType<T> =
  T extends Array<infer U> ? U : T;

type A = ElementType<string[]>; // string
type B = ElementType<number>;   // number
```

## Distributive behavior

```ts
type ToArray<T> = T extends unknown ? T[] : never;

type Result = ToArray<string | number>;
// string[] | number[]
```

Conditional types distribute when a naked generic type parameter is checked.

To prevent distribution:

```ts
type ToArray<T> = [T] extends [unknown] ? T[] : never;
```

## Interview topics

Understand `extends`, `infer`, distributive conditional types and how utility types are built from these ideas.