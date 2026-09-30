# 28 — Modules

## Connection from Previous Topic

Types become useful in real applications only when they can be organized across files. TypeScript uses JavaScript's module system and adds type-only import/export syntax.

## Named exports

```ts
// user.ts
export interface User {
  id: string;
}

export const version = "1.0";
```

```ts
// app.ts
import { version, type User } from "./user";
```

## Type-only imports

```ts
import type { User } from "./user";
export type { User };
```

These make it explicit that the symbol is used only by the type system.

## Named vs default exports

```ts
export default function App() {}
export const version = "1.0";
```

```ts
import App, { version } from "./module";
```

## Runtime vs type layer

A type import is erased. A runtime import participates in JavaScript module execution and bundling.

This distinction matters when debugging circular dependencies and bundle behavior.

## Frontend use cases

- feature-based folder architecture
- shared domain types
- React component modules
- API clients/services
- utility libraries
- type-only shared contracts

## Interview questions

**Why use `import type`?** It clearly communicates that the import is type-only and avoids unnecessary runtime import behavior.

**Does TypeScript define a new module system?** No. It builds on JavaScript modules while adding type syntax and compiler configuration.

## Mini challenge

Split a small `User` feature into `user.types.ts`, `user.service.ts`, and `UserCard.tsx`. Use type-only imports where appropriate.

## What This Unlocks Next

Modules depend on compiler/module-resolution behavior. Next we configure the TypeScript compiler correctly for the project:

**Modules → tsconfig**.