# Type Aliases

A type alias names a TypeScript type expression.

```ts
type UserId = string;

type User = {
  id: UserId;
  name: string;
};

type Status = "idle" | "loading" | "success" | "error";
```

## Function type

```ts
type Formatter = (value: number) => string;
```

## Intersection

```ts
type Admin = User & {
  permissions: string[];
};
```

## Generic alias

```ts
type ApiResponse<T> = {
  data: T;
  status: number;
};
```

Type aliases are particularly useful for unions, intersections, tuples, mapped and conditional types.

## Interview question

Aliases don't use interface-style `extends`; combine object requirements with intersections.