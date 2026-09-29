# Template Literal Types

Template literal types create string literal types from other literal types.

```ts
type EventName = "click" | "focus";

type HandlerName = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus"
```

## Route example

```ts
type Version = "v1" | "v2";
type Resource = "users" | "orders";

type Endpoint = `/${Version}/${Resource}`;
// "/v1/users" | "/v1/orders" | "/v2/users" | "/v2/orders"
```

## Combining with mapped types

Template literals are useful for generating event names, getters, route keys and strongly typed API contracts.

## Interview question

Explain how unions expand inside template literal types and how `Capitalize`, `Uppercase`, `Lowercase` and `Uncapitalize` can transform string literals.