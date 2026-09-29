# keyof

`keyof T` produces a union of property keys known on `T`.

```ts
interface User {
  id: string;
  name: string;
}

type UserKey = keyof User;
// "id" | "name"
```

## Generic usage

```ts
function read<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

read({ id: 1, name: "Asha" }, "name"); // string
```

## With mapped types

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

Know `keyof` together with indexed access and mapped types; these concepts are heavily connected.