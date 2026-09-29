# Modules

TypeScript uses JavaScript's module system.

## Export/import

```ts
// user.ts
export interface User {
  id: string;
}

export const version = "1.0";

// app.ts
import { version, type User } from "./user";
```

## Type-only imports

```ts
import type { User } from "./user";
export type { User };
```

These make it explicit that a symbol is used only by the type system.

## Default vs named exports

```ts
export default function App() {}
export const version = "1.0";
```

```ts
import App, { version } from "./module";
```

## Interview point

TypeScript's type layer is erased, but JavaScript module imports/exports are runtime behavior. Compiler/module-resolution settings determine how source modules are interpreted and emitted.