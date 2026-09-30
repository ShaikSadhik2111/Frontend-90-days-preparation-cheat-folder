# 29 — tsconfig.json

## Connection from Previous Topic

Modules and TypeScript features are interpreted and compiled according to project configuration. `tsconfig.json` defines those compiler/project rules.

## A practical strict baseline

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noEmit": true,
    "skipLibCheck": true
  }
}
```

The correct settings depend on Vite, Next.js, Angular, Node and the project's build pipeline.

## Important options

### strict

Enables the strict family of type checks.

### strictNullChecks

Makes `null` and `undefined` explicit rather than silently assignable everywhere.

### noImplicitAny

Reports locations where TypeScript would otherwise infer `any`.

### noUncheckedIndexedAccess

```ts
const users: User[] = [];
const user = users[0];
// User | undefined
```

This catches assumptions that an index is always present.

### exactOptionalPropertyTypes

Makes the distinction between an absent optional property and explicitly assigning `undefined` meaningful in relevant assignments.

### target

Controls the JavaScript language level TypeScript emits when it emits code.

### module / moduleResolution

Control module interpretation and how imports are resolved.

### jsx

Controls JSX-related compilation/type-checking behavior.

### noEmit

Useful when Vite/Next/another build tool handles JavaScript transformation and TypeScript is used primarily for checking.

## Frontend use cases

- React + Vite
- Next.js
- Angular
- shared packages
- monorepos
- CI type-checking

## Common mistake

Copying a `tsconfig` from another project without understanding the build tool can create confusing module-resolution or JSX errors.

## Interview questions

**Why `strict`?** It catches unsafe assumptions earlier.

**Why `noUncheckedIndexedAccess`?** It forces code to account for missing indexed values.

**Why can `moduleResolution` differ between projects?** Different runtimes/build tools resolve modules differently.

## Mini challenge

Take your React project configuration and explain the purpose of `target`, `module`, `moduleResolution`, `strict`, `jsx`, and `noEmit`.

## What This Unlocks Next

We now understand the language, type system and compiler configuration. Next we apply them to the boundary where frontend applications most often become unsafe:

**tsconfig → API / Domain Modeling**.