# Indexed Access Types

Indexed access retrieves a type using a key.

```ts
interface User {
  id: string;
  name: string;
  age: number;
}

type UserId = User["id"];       // string
type UserName = User["name"];   // string
type UserValue = User[keyof User]; // string | number
```

## Arrays

```ts
type Users = User[];
type OneUser = Users[number]; // User
```

## Generic selector

```ts
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

Indexed access is essential for type-safe selectors, generic APIs and derived models.