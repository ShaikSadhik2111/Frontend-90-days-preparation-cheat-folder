# Prototypes

JavaScript objects can delegate property lookup through a prototype chain.

```js
const animal = {
  speak() { return "sound"; }
};

const dog = Object.create(animal);
dog.name = "Rex";
dog.speak();
```

If a property is not found on the object, JavaScript looks up its prototype, continuing until `null`.

## Constructor functions and classes
`class` syntax provides a higher-level model over JavaScript's prototype-based inheritance.

```js
class User {
  greet() { return "hello"; }
}
```

Methods are placed on `User.prototype`, rather than copied into every instance.

## Key methods
- `Object.create`
- `Object.getPrototypeOf`
- `Object.setPrototypeOf`
- `hasOwn`

## Pitfalls
Prototype inheritance is not the same as classical class inheritance. Property lookup and delegation are the core mechanism.
