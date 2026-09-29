# API and Domain Modeling

TypeScript describes what data should look like, but interfaces do not validate runtime JSON.

## DTO

```ts
interface UserDto {
  id: string;
  display_name: string;
}
```

## Domain model

```ts
type User = {
  id: string;
  displayName: string;
};
```

Transform at the boundary:

```ts
function toUser(dto: UserDto): User {
  return {
    id: dto.id,
    displayName: dto.display_name,
  };
}
```

## Result type

```ts
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
```

## Async UI state

```ts
type State<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };
```

This avoids invalid combinations such as loading + successful data + error all being true simultaneously.

## Rules

- Treat API data as untrusted.
- Validate external data at runtime when correctness matters.
- Separate DTOs from domain models when transformation is meaningful.
- Model states explicitly with discriminated unions.
- Use generics for reusable API envelopes.