# TypeScript Fundamentals

## What is TypeScript?

TypeScript is a superset of JavaScript that adds a static type system. The compiler checks types during development/build time and emits JavaScript.

## Primitive types

```ts
let username: string = "Sadhik";
let count: number = 10;
let active: boolean = true;
let id: bigint = 100n;
let key: symbol = Symbol("id");
```

Prefer lowercase primitive types such as `string`, `number`, and `boolean`, not boxed `String`, `Number`, or `Boolean`.

## Arrays

```ts
const ids: number[] = [1, 2, 3];
const names: Array<string> = ["A", "B"];
```

## Objects

```ts
type User = {
  id: number;
  name: string;
  email?: string;
  readonly createdAt: Date;
};

const user: User = {
  id: 1,
  name: "Sadhik",
  createdAt: new Date(),
};
```

## any vs unknown

`any` opts out of most type checking:

```ts
const data: any = getData();
data.foo.bar();
data();
```

`unknown` accepts any value but requires narrowing:

```ts
const data: unknown = JSON.parse(rawJson);

if (typeof data === "string") {
  console.log(data.toUpperCase());
}
```

Prefer `unknown` at uncertain boundaries.

## never

`never` represents a value that cannot occur:

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

It is also important for exhaustive union checks.

## void

Usually used when a function's return value is intentionally ignored:

```ts
function log(message: string): void {
  console.log(message);
}
```

## Literal types

```ts
type Theme = "light" | "dark";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
```

## Nullability

With `strictNullChecks`, nullable values must be handled explicitly:

```ts
function getName(user: User | null): string {
  if (!user) return "Guest";
  return user.name;
}
```

## Inference

```ts
const age = 25;        // number
const name = "Sadhik"; // string
```

Do not add annotations to every obvious local variable.

## Interview questions

**Does TypeScript prevent runtime errors?** No. External runtime data still needs validation.

**What is type erasure?** TypeScript-only type information generally does not exist in emitted JavaScript.

**any vs unknown?** `any` permits unchecked operations; `unknown` requires narrowing.

## Exercise

Create a `User` model with nullable profile data and write a function that safely returns the display name.