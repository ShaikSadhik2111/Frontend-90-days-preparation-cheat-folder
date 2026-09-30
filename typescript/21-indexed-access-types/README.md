# 21 — Indexed Access Types

## Connection from Previous Topic

`typeof` lets us derive types from values. Indexed access lets us retrieve the type associated with a particular key.

## Basic syntax

```ts
interface User {
  id: string;
  name: string;
  age: number;
}

type UserId = User["id"];          // string
type UserName = User["name"];      // string
type UserValue = User[keyof User]; // string | number
```

The syntax resembles JavaScript property access, but it operates in the type system.

## Arrays

```ts
type Users = User[];
type OneUser = Users[number]; // User
```

This is useful for deriving the element type of an array.

## Generic selector

```ts
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

Here `keyof` restricts the key and indexed access connects the key to the return type.

## Frontend use cases

- generic selectors
- typed table columns
- form field helpers
- event maps
- API/domain transformations
- extracting array element types

## Mental model

```text
T
↓
keyof T → valid keys
↓
T[K] → type of the selected value
```

## Interview question

**Why is `T[K]` better than returning `unknown`?** It preserves the exact relationship between the selected key and its value type.

## Mini challenge

Create an `EventMap` and derive the payload type for a selected event name using `T[K]`.

## What This Unlocks Next

Now that we can select and derive types, we can transform existing types with reusable built-in helpers:

**Indexed Access → Utility Types**.