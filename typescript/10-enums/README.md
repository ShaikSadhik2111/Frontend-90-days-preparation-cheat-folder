# 10 — Enums

## Connection from Previous Topic

Literal unions already model fixed values. Enums provide named constants and, unlike most TypeScript types, normal enums can create a runtime JavaScript object.

## Why This Topic Exists

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

const direction = Direction.Up;
```

String enums are explicit and easier to inspect than numeric enums.

## Numeric enums

```ts
enum Priority {
  Low,
  Medium,
  High,
}
```

Numeric members default to `0, 1, 2...`. Numeric enums also have reverse-mapping behavior in emitted JavaScript.

## Enum vs literal union

```ts
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
```

For many frontend/API contracts, literal unions are simpler because they remain plain JavaScript values and do not require an enum runtime object.

Enums can still be appropriate when a runtime namespace of named constants is useful or when an existing codebase expects them.

## `const enum`

`const enum` has special inlining behavior and depends on compiler/toolchain settings. Do not treat it as identical to a normal enum.

## Frontend use cases

- application-wide constants
- internal state categories
- legacy Angular/TypeScript codebases
- library APIs intentionally exposing enum values

For UI state, a union is often straightforward:

```ts
type LoadState = "idle" | "loading" | "success" | "error";
```

## Interview questions

**Do enums exist at runtime?** Normal enums emit runtime JavaScript.

**Why string rather than numeric enums?** Explicit values are easier to inspect and debug.

**Enum vs union?** Discuss runtime behavior and API requirements rather than claiming one is universally better.

## Mini challenge

Model `UserRole` as both a string enum and a literal union. Explain the runtime difference and which is clearer for a JSON API contract.

## What This Unlocks Next

Next we move from named values to JavaScript objects with state and behavior:

**Enums → Classes**.