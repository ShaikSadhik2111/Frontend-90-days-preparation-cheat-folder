# Mapped Types

Mapped types transform each property of another type.

## Basic

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

## Remove readonly

```ts
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
```

## Key remapping

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<{
  name: string;
  age: number;
}>;
// getName: () => string
// getAge: () => number
```

Mapped types connect directly to `keyof`, indexed access and utility types.