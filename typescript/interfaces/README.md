# Interfaces

## Connection from Previous Topic

In **Type Aliases**, we created reusable object models:

```ts
type User = {
  id: string;
  name: string;
};
```

Now ask:

> What if this object represents a domain contract that other types should extend?

That is where interfaces become useful.

## Why This Topic Exists

An interface describes the shape of an object and can be extended.

```ts
interface User {
  id: string;
  name: string;
  email?: string;
  readonly createdAt: Date;
}

interface Admin extends User {
  permissions: string[];
}
```

Now:

```ts
const admin: Admin = {
  id: "1",
  name: "Sadhik",
  createdAt: new Date(),
  permissions: ["users:read"]
};
```

The important connection is:

```text
type alias
   ↓
reusable object model
   ↓
interface
   ↓
extend the model
```

## Optional and readonly

```ts
interface User {
  email?: string;
  readonly id: string;
}
```

Optional means the property may be absent.

Readonly means TypeScript prevents reassignment through that type.

## Index signatures

Useful when keys are dynamic:

```ts
interface ErrorMap {
  [field: string]: string;
}

const errors: ErrorMap = {
  email: "Invalid email",
  password: "Too short"
};
```

## Declaration merging

Interfaces can merge:

```ts
interface Window {
  appVersion: string;
}

interface Window {
  featureFlag: boolean;
}
```

The resulting Window contract contains both properties.

## Interface vs type

Do not treat this as a winner-takes-all question.

A useful interview explanation:

- interface → object contracts, `extends`, declaration merging
- type → unions, intersections, tuples and advanced type composition

## Mini challenge

Create:

```ts
interface Vehicle {
  id: string;
  brand: string;
}

interface Car extends Vehicle {
  doors: number;
}
```

Then create a function that accepts `Car`.

## What This Unlocks Next

We can now describe **data**.

But applications also contain **behavior**.

We need to describe functions that consume and return these typed objects.

Next:

**Interfaces → Function Types**

Try to write this before opening the next folder:

```ts
function getUserName(user: User): string {
  return user.name;
}
```
