# tsconfig.json

A `tsconfig.json` defines the TypeScript project/compiler configuration.

## Strict baseline

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

The exact configuration depends on Vite, Next.js, Node, Angular or another toolchain.

## Important options

### strict
Enables a family of stronger type checks.

### strictNullChecks
Makes `null` and `undefined` distinct from ordinary types.

### noImplicitAny
Reports places where TypeScript would otherwise infer `any`.

### noUncheckedIndexedAccess
Makes indexed access account for potentially missing elements.

```ts
const users: User[] = [];
const user = users[0];
// with this option: User | undefined
```

### exactOptionalPropertyTypes
Distinguishes an absent optional property from an explicitly supplied `undefined` in relevant assignments.

### target
Controls the JavaScript language level emitted.

### module / moduleResolution
Control module interpretation and resolution strategy.

### jsx
Controls JSX transformation/type-checking behavior for React projects.

## Interview question

**Why strict mode?**

It catches unsafe assumptions earlier and makes the type system more useful for large codebases.