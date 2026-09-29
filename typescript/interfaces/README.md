# Interfaces

Interfaces describe object contracts.

```ts
interface User {
  id: string;
  name: string;
  email?: string;
  readonly createdAt: Date;
}

interface Admin extends User {
  permissions: string[];
}
```

## Optional and readonly

`email?: string` means the property may be absent. `readonly` prevents reassignment through the type system.

## Index signatures

```ts
interface ErrorMap {
  [field: string]: string;
}
```

## Declaration merging

```ts
interface Window {
  appVersion: string;
}

interface Window {
  featureFlag: boolean;
}
```

The declarations merge into one interface.

## Interface vs type

Both can model objects. Interfaces support declaration merging and `extends`; type aliases are more general for unions/intersections and type-level composition.

Interview answer: don't claim one is universally better. Explain which capability your design needs.