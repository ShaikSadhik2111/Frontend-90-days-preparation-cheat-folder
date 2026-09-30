# 25 — Template Literal Types

## Connection from Previous Topic

Conditional types let us reason about type relationships. Template literal types let us construct new string literal types from existing literal unions.

## Basic example

```ts
type EventName = "click" | "focus";

type HandlerName = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus"
```

## Union expansion

```ts
type Version = "v1" | "v2";
type Resource = "users" | "orders";

type Endpoint = `/${Version}/${Resource}`;
// "/v1/users" | "/v1/orders" | "/v2/users" | "/v2/orders"
```

TypeScript forms combinations from the unions.

## String manipulation helpers

- `Uppercase<T>`
- `Lowercase<T>`
- `Capitalize<T>`
- `Uncapitalize<T>`

## Combine with mapped types

```ts
type Events = {
  userCreated: { id: string };
  userDeleted: { id: string };
};

type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]:
    (payload: T[K]) => void;
};
```

This produces handlers such as `onUserCreated` with the correct payload.

## Frontend use cases

- event handler names
- route keys
- API endpoint patterns
- design-token names
- generated component APIs
- typed event systems

## Interview questions

**How do unions expand?** Each member participates in the template combination.

**Why combine template literals with mapped types?** Together they can generate strongly typed property names and preserve the relationship to the original value types.

## Mini challenge

Create a type that turns `"success" | "error"` into `"isSuccess" | "isError"`.

## What This Unlocks Next

We can now derive and transform types very precisely. Next we need to control how we tell TypeScript about values:

**Template Literal Types → Assertions & satisfies**.