# Discriminated Unions

A discriminated union has a shared literal property that identifies each variant.

```ts
type RequestState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };
```

## Narrowing

```ts
function render(state: RequestState) {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return state.data.join(", ");
    case "error":
      return state.message;
  }
}
```

## Exhaustive checking

```ts
function assertNever(value: never): never {
  throw new Error("Unexpected variant");
}
```

Use it in a default branch when you want newly-added variants to fail compilation until handled.

## Real frontend use

Use discriminated unions for:
- loading/success/error
- reducer actions
- modal states
- payment states
- form submission states
- API result types

This is much safer than several unrelated booleans such as `isLoading`, `isError`, `isSuccess`.