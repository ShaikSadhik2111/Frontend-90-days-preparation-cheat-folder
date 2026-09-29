# Objects

Objects are collections of keyed properties and behavior.

## Property access
```js
const user = { name: "Sam", age: 25 };
user.name;
user["age"];
```

## Important concepts
- Own vs inherited properties
- Enumerable properties
- Property descriptors
- Getters/setters
- Computed properties
- Object immutability patterns
- Shallow vs deep copying

## Descriptors
A property can have `value`, `writable`, `enumerable`, and `configurable` attributes.

## Useful APIs
- `Object.keys`
- `Object.values`
- `Object.entries`
- `Object.assign`
- `Object.freeze`
- `Object.defineProperty`
- `Object.hasOwn`

## Pitfall
Spread syntax performs a shallow copy:

```js
const copy = { ...original };
```

Nested objects remain shared references.
