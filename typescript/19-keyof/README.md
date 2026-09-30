# 19 — keyof

## Connection from Previous Topic

Generic constraints let us guarantee that a key belongs to an object. `keyof` is the type-level operation that produces those valid keys.

## Why This Topic Exists

```ts
interface User {
  id: string;
  name: string;
  active: boolean;
}

type UserKey = keyof User;
// "id" | "name" | "active"
```

This turns object structure into a reusable union of property names.

## Generic property access

```ts
function read<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

Now the key and returned value stay connected.

## Frontend use cases

- table column definitions
- form field names
- sorting/filtering helpers
- selectors
- configuration maps
- reusable component APIs

Example:

```ts
type UserColumn = keyof User;

function sortUsers(users: User[], key: UserColumn) {
  return [...users].sort((a, b) =>
    String(a[key]).localeCompare(String(b[key]))
  );
}
```

## Important detail

`keyof` can produce string, number, or symbol keys depending on the type.

## Interview questions

**What does `keyof T` return?** A union of the property keys known on `T`.

**Why is `K extends keyof T` powerful?** It prevents invalid keys while preserving the relationship between the selected key and value.

## Mini challenge

Create a generic `getField<T, K extends keyof T>` helper and make sure the return type changes when different keys are supplied.

## What This Unlocks Next

We can derive keys from a type. Next we derive a **type from an existing runtime value**:

**keyof → typeof**.