# Utility Types

Utility types transform existing types.

```ts
interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}
```

## Partial

```ts
type UserPatch = Partial<User>;
```

All properties become optional.

## Required

```ts
type CompleteUser = Required<User>;
```

## Readonly

```ts
type ImmutableUser = Readonly<User>;
```

## Pick

```ts
type PublicUser = Pick<User, "id" | "name">;
```

## Omit

```ts
type CreateUser = Omit<User, "id">;
```

## Record

```ts
type ErrorMap = Record<string, string>;
```

## Exclude / Extract

```ts
type Status = "idle" | "loading" | "success" | "error";

type Finished = Exclude<Status, "idle" | "loading">;
// "success" | "error"

type LoadingStates = Extract<Status, "idle" | "loading">;
```

## NonNullable

```ts
type Name = NonNullable<string | null | undefined>;
// string
```

## ReturnType / Parameters

```ts
function createUser(name: string, age: number) {
  return { name, age };
}

type CreatedUser = ReturnType<typeof createUser>;
type CreateUserArgs = Parameters<typeof createUser>;
```

## Awaited

```ts
type UserResult = Awaited<Promise<User>>;
// User
```

Know these utility types without memorizing implementation details.