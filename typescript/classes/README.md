# Classes

TypeScript adds typed fields and modifiers to JavaScript classes.

```ts
class UserService {
  constructor(private readonly baseUrl: string) {}

  async getUser(id: string): Promise<unknown> {
    const response = await fetch(this.baseUrl + "/users/" + id);
    return response.json();
  }
}
```

## Modifiers

- `public`: default
- `private`: class-only access through TypeScript
- `protected`: class and subclasses
- `readonly`: prevents reassignment through the type system

## Abstract class

```ts
abstract class Repository<T> {
  abstract findById(id: string): Promise<T | null>;
}
```

## Implements

```ts
interface Cache {
  get(key: string): string | null;
}

class MemoryCache implements Cache {
  get(key: string) {
    return null;
  }
}
```

## Interview point

TypeScript's `private` is a compile-time restriction. JavaScript `#privateField` provides runtime private fields.