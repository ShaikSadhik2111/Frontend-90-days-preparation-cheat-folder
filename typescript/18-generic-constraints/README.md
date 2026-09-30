# 18 — Generic Constraints

## Connection from Previous Topic

Generics preserve relationships, but an unconstrained `T` has no guaranteed properties. Constraints let us say what capabilities a generic must provide.

## Basic constraint

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("hello");
getLength([1, 2, 3]);
```

The function remains generic while guaranteeing `length` exists.

## `keyof` constraint

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Asha" };

const name = getProperty(user, "name"); // string
```

The compiler prevents:

```ts
// getProperty(user, "email"); // error
```

This is one of the most important generic patterns in interviews.

## Domain constraint

```ts
interface Entity {
  id: string;
}

function find<T extends Entity>(entity: T): string {
  return entity.id;
}
```

The return value can still preserve the specific subtype elsewhere while the function guarantees the required contract.

## Constraints are not transformations

`T extends X` does **not** mean “T becomes X.” It means “T must be assignable to X.”

## Frontend use cases

- reusable table sorting by valid keys
- generic form helpers
- API repositories
- selectors
- component utilities
- typed object access

## Interview questions

**Why use `K extends keyof T`?** It connects the key parameter to the actual object type and prevents invalid property names.

**Does `extends` here mean inheritance?** No. In a generic constraint it expresses an assignability requirement.

## Mini challenge

Write a generic `sortBy<T, K extends keyof T>` function whose key must exist on the supplied objects.

## What This Unlocks Next

We have now reached the core type-level chain:

**Generic Constraints → `keyof` → `typeof` → Indexed Access (`T[K]`) → Utility/Mapped/Conditional Types**.