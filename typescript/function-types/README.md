# Function Types

## Connection from Previous Topic

Interfaces taught us how to describe **data**:

```ts
interface User {
  id: string;
  name: string;
}
```

Now we need to describe **behavior** — functions that consume and return that data.

```ts
function getUserName(user: User): string {
  return user.name;
}
```

This gives us the next layer:

```text
object shape
→ interface
→ function consuming the interface
```

## Why This Topic Exists

Functions have contracts too:

- what parameters they accept
- what they return
- whether parameters are optional
- whether they are generic
- whether they have multiple call signatures

## Function type aliases

```ts
type Formatter = (value: number) => string;

const formatPrice: Formatter = (value) => {
  return `₹${value}`;
};
```

## Optional and default parameters

```ts
function greet(name: string, prefix = "Hello"): string {
  return `${prefix}, ${name}`;
}
```

## Rest parameters

```ts
function sum(...values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}
```

## Generic functions

We will later study generics deeply:

```ts
function identity<T>(value: T): T {
  return value;
}
```

## Function overloads

```ts
function format(value: string): string;
function format(value: number): string;

function format(value: string | number): string {
  return String(value);
}
```

The implementation signature must be compatible with the overload signatures.

## Mini challenge

Using the `User` interface from the previous lesson, create:

```ts
type UserFormatter = (user: User) => string;
```

Then implement it.

## What This Unlocks Next

A function can accept one type, but real applications often need to accept **one of several valid types**.

Example:

```ts
function findUser(id: string): User;
function findUser(id: number): User;
```

This leads to the concept behind:

**Function Types → Unions**

Next we will learn how to represent alternatives and then safely determine which alternative we actually have.
