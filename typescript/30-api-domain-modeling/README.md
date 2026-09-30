# 30 — API and Domain Modeling

## Connection from Previous Topic

Compiler configuration gives us the enforcement environment. Now we apply the entire type system to a real frontend problem: **external data entering the application**.

## DTO vs domain model

API shape:

```ts
interface UserDto {
  id: string;
  display_name: string;
}
```

Application model:

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

This keeps backend naming concerns separate from UI/domain concerns.

## Runtime trust boundary

TypeScript interfaces do not validate JSON.

```text
HTTP response
→ unknown/untrusted data
→ runtime validation
→ DTO
→ domain model
→ UI
```

For important boundaries, use a real runtime validation strategy rather than assuming a cast is validation.

## Generic API response

```ts
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
```

Now:

```ts
type UserResult = Result<User>;
```

## Async UI state

```ts
type State<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };
```

This prevents invalid combinations such as loading + success + error all being true simultaneously.

## Frontend architecture example

```text
API client
  ↓
DTO
  ↓
mapper / validator
  ↓
domain model
  ↓
React/Angular state
  ↓
component props
```

## Interview questions

**Why separate DTO and domain models?** To isolate external contracts from internal application design when the shapes or responsibilities differ.

**Does TypeScript validate API responses?** No; runtime validation is separate.

**Why discriminated unions for UI state?** They model legal states explicitly.

## Mini challenge

Model a `ProductDto`, map it to a `Product` domain model, and create a generic `Result<Product>`.

## What This Unlocks Next

The next folder applies these ideas directly to your frontend stack:

**API / Domain Modeling → React + TypeScript**.