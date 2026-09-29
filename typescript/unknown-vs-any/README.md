# unknown vs any

## any

`any` disables most type checking.

```ts
const value: any = getExternalValue();

value.notReal();
value.foo.bar();
```

The compiler permits these operations.

## unknown

`unknown` accepts any value but forces narrowing.

```ts
const value: unknown = getExternalValue();

if (typeof value === "string") {
  value.toUpperCase();
}
```

## JSON boundary

```ts
const parsed: unknown = JSON.parse(rawJson);
```

Do not immediately cast:

```ts
const user = JSON.parse(rawJson) as User;
```

That assertion does not validate the JSON.

Instead, validate/narrow the value before using it.

## Interview answer

Use `unknown` when you genuinely do not know the type. Use `any` only when intentionally opting out of type safety, such as a controlled migration or library boundary.