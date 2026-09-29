# Type Aliases

## Connection from Previous Topic

In **Fundamentals**, we learned how to write object types directly:

```ts
const user: {
  id: string;
  name: string;
} = {
  id: "u1",
  name: "Sadhik"
};
```

This works, but repeating the shape becomes painful.

### The problem

```ts
function printUser(user: {
  id: string;
  name: string;
}) {}

function saveUser(user: {
  id: string;
  name: string;
}) {}
```

We need a name for this type.

## Why This Topic Exists

A **type alias** gives a reusable name to a type expression.

```ts
type UserId = string;

type User = {
  id: UserId;
  name: string;
};
```

Now the same type can be reused:

```ts
function printUser(user: User) {}
function saveUser(user: User) {}
```

This is our first important step from **inline types → reusable domain types**.

## Type aliases can represent more than objects

### Literal union

```ts
type Status = "idle" | "loading" | "success" | "error";
```

### Function type

```ts
type Formatter = (value: number) => string;
```

### Intersection

```ts
type Admin = User & {
  permissions: string[];
};
```

### Generic type alias

```ts
type ApiResponse<T> = {
  data: T;
  status: number;
};
```

These will become important later.

## Type alias vs interface

Both can model objects:

```ts
type User = {
  id: string;
  name: string;
};

interface User {
  id: string;
  name: string;
}
```

Use interfaces when you want an extensible object contract and interface features such as declaration merging or `extends`.

Use type aliases when you need unions, intersections, tuples, mapped types, conditional types, or other type-level composition.

Do not memorize "interface is better" or "type is better". Explain the capability required.

## Mini challenge

Create:

```ts
type Product = {
  id: number;
  name: string;
  price: number;
};
```

Then create:

```ts
type ProductStatus = "draft" | "active" | "archived";
```

Then write a function that accepts a Product and returns its ProductStatus.

## What This Unlocks Next

We now have reusable **type expressions**.

But there is another TypeScript construct specifically designed around **object contracts** and extension.

That leads naturally to:

**Type Aliases → Interfaces**

Before moving on, be able to explain:

> "A type alias lets me name any type expression. An interface is especially useful for describing extensible object contracts."
