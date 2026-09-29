# Generics

Generics preserve relationships between types instead of replacing them with `any`.

## Basic

```ts
function identity<T>(value: T): T {
  return value;
}

const result = identity("hello"); // string
```

## Arrays

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}
```

## Generic interface

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
}

const response: ApiResponse<User> = {
  data: { id: "1", name: "Asha" },
  status: 200,
};
```

## Multiple type parameters

```ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
```

## Generic class

```ts
class Store<T> {
  constructor(private value: T) {}

  get(): T {
    return this.value;
  }
}
```

## Interview question

**Why generics instead of any?**

Generics preserve type relationships. `any` discards them and allows unchecked operations.