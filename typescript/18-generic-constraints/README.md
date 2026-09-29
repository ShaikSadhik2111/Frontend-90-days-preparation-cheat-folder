# Generic Constraints

Use `extends` to restrict what a generic can accept.

## Object constraint

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("hello");
getLength([1, 2, 3]);
```

## keyof constraint

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Asha" };

const name = getProperty(user, "name"); // string
```

`K extends keyof T` prevents callers from requesting a property that does not exist.

## Constraint with a domain type

```ts
interface Entity {
  id: string;
}

function find<T extends Entity>(entity: T) {
  return entity.id;
}
```

This keeps the specific subtype while guaranteeing the required `id` field.