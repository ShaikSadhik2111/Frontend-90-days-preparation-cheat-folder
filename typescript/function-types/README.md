# Function Types

## Parameters and return types

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

## Function type alias

```ts
type Formatter = (value: number) => string;

const format: Formatter = value => value.toFixed(2);
```

## Optional/default/rest

```ts
function greet(name: string, prefix?: string) {
  return (prefix ?? "Hello") + ", " + name;
}

function sum(...values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}
```

## Generic function

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}
```

## Overloads

```ts
function parse(value: string): string[];
function parse(value: string[]): string[];

function parse(value: string | string[]) {
  return Array.isArray(value) ? value : value.split(",");
}
```

Know callback typing, overloads, generics, optional parameters, rest parameters and return types for interviews.