# 06 — Objects

## Why objects matter

Objects are the main way JavaScript models structured application data.

```js
const user = {
  id: 101,
  name: "Sadhik",
  role: "frontend-engineer"
};
```

In a frontend application, API responses, configuration, component props, state and domain models are commonly represented with objects.

## 1. Property access

```js
user.name;
user["role"];

const key = "name";
user[key];
```

Use bracket notation when the property name is dynamic.

## 2. Own vs inherited properties

```js
const parent = { role: "admin" };
const user = Object.create(parent);
user.name = "Sam";

console.log(user.name); // own property
console.log(user.role); // inherited

console.log(Object.hasOwn(user, "role")); // false
```

This distinction matters when iterating, validating payloads or working with prototypes.

## 3. Useful APIs

```js
Object.keys(user);
Object.values(user);
Object.entries(user);

Object.hasOwn(user, "name");
```

Transforming API data:

```js
const params = Object.entries({ page: 1, limit: 20 })
  .map(([key, value]) => `${key}=${value}`)
  .join("&");
```

## 4. Computed properties

```js
const field = "email";

const formState = {
  [field]: "sam@example.com"
};
```

Very common in dynamic forms and reducers.

## 5. Spread is shallow

```js
const original = {
  user: { name: "Sam" }
};

const copy = { ...original };

copy.user.name = "Alex";

console.log(original.user.name); // Alex
```

## 6. Property descriptors

Properties can have:

- value
- writable
- enumerable
- configurable

```js
const user = {};

Object.defineProperty(user, "id", {
  value: 101,
  writable: false,
  enumerable: true
});
```

Descriptor knowledge becomes useful for libraries, metaprogramming and polyfill interviews.

## 7. Getters and setters

```js
const user = {
  firstName: "Sam",
  lastName: "K",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

console.log(user.fullName);
```

A getter looks like a property but executes code when read.

## 8. Frontend use case: immutable update

```js
const state = {
  profile: {
    name: "Sam",
    city: "Hyderabad"
  }
};

const nextState = {
  ...state,
  profile: {
    ...state.profile,
    city: "Bengaluru"
  }
};
```

Only the changed object levels are recreated.

## Interview checklist

- object identity
- own/inherited properties
- Object.keys/values/entries
- computed properties
- descriptors
- getters/setters
- shallow copying
- immutable nested updates

**Next:** destructuring, spread and rest provide concise ways to work with these objects and arrays.