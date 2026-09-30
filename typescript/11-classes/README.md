# 11 — Classes

## Connection from Previous Topic

Enums model named values. Classes model **objects with state and behavior** using JavaScript class syntax plus TypeScript's type system.

## Why This Topic Exists

```ts
class UserService {
  constructor(private readonly baseUrl: string) {}

  async getUser(id: string): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    return response.json();
  }
}
```

TypeScript adds compile-time information around JavaScript classes; the runtime class model is still JavaScript.

## Access modifiers

- `public` — default
- `private` — TypeScript-level access restriction
- `protected` — class/subclass access
- `readonly` — prevents reassignment through the type system

## `private` vs `#private`

```ts
class Counter {
  private value = 0; // TypeScript restriction
  #secret = 42;      // JavaScript runtime private field
}
```

This distinction is a common interview question.

## Implements

```ts
interface Cache {
  get(key: string): string | null;
}

class MemoryCache implements Cache {
  get(key: string): string | null {
    return null;
  }
}
```

`implements` checks conformance; it does not change runtime behavior.

## Abstract classes

```ts
abstract class Repository<T> {
  abstract findById(id: string): Promise<T | null>;
}
```

An abstract class can share implementation while requiring subclasses to implement abstract members.

## Parameter properties

```ts
class ApiClient {
  constructor(private readonly baseUrl: string) {}
}
```

This is shorthand for declaring and assigning the property.

## Frontend use cases

Classes are common in service/repository layers, SDKs, stateful utilities and legacy Angular applications. Modern React code often uses functions and objects instead, so use classes when encapsulation or lifecycle/state makes them useful.

## Common mistakes

- assuming `private` provides runtime privacy
- using classes where a function/object is clearer
- confusing `implements` with inheritance

## Interview questions

**`extends` vs `implements`?** `extends` inherits; `implements` checks a contract.

**Does TypeScript `private` exist at runtime?** No. JavaScript `#private` is the runtime mechanism.

## Mini challenge

Create an abstract `ApiRepository<T>` with `findById`, then implement an in-memory repository for `User`.

## What This Unlocks Next

We now model data and behavior. Next we handle values whose runtime type is still broad:

**Classes → Type Narrowing**.