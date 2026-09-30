# 03 — Types

## Connection from Previous Topic

Type inference lets TypeScript determine many types automatically. Now we need to understand the major type building blocks used to model real application data.

## Why This Topic Exists

Types are the foundation of TypeScript: primitives, objects, arrays, literal types, function types, and special types such as any, unknown, void and never.

## Primitive types

```ts
let name: string = "Sadhik";
let age: number = 25;
let active: boolean = true;
let id: bigint = 100n;
let token: symbol = Symbol("token");
```

## Arrays

```ts
const userIds: number[] = [101, 102, 103];
const users: Array<string> = ["Asha", "Rahul"];
```

## Object types

```ts
type User = {
  id: string;
  name: string;
  email?: string;
};
```

Object types become the foundation for API models, component props, form state and domain entities.

## Literal types

```ts
type Theme = "light" | "dark";
type HttpMethod = "GET" | "POST";
```

Literal unions are especially useful for UI states and configuration because invalid values become compile-time errors.

## Special types

### any

```ts
let data: any = getExternalValue();
data.foo.bar();
```

`any` largely disables type checking.

### unknown

```ts
const data: unknown = getExternalValue();

if (typeof data === "string") {
  console.log(data.toUpperCase());
}
```

`unknown` is safer at uncertain boundaries because it requires narrowing.

### void

```ts
function log(message: string): void {
  console.log(message);
}
```

### never

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

## Nullability

With `strictNullChecks`, null and undefined are explicit possibilities.

```ts
function getDisplayName(user: User | null): string {
  if (user === null) return "Guest";
  return user.name;
}
```

## Runtime vs compile time

TypeScript types do not automatically validate runtime JSON. External data still needs validation when correctness matters.

## Frontend use cases

- React props
- Angular service models
- API responses
- form state
- component state
- event handlers
- configuration
- reducer actions

## Interview questions

**Does TypeScript prevent runtime errors?** No. Runtime values can still violate compile-time assumptions.

**What is type erasure?** TypeScript type information is generally removed from emitted JavaScript.

**Why `unknown` instead of `any`?** `unknown` forces you to establish what the value is before using it.

## Mini challenge

Create a Product type with id, name, price, optional description and status restricted to draft, active or archived. Then write a function that safely prints the product.

## What This Unlocks Next

We now know the major TypeScript type building blocks. Repeating complex object shapes is not scalable, so next we move from Types to reusable named type expressions: **04 Type Aliases**.