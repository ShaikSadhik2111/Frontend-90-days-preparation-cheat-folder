# 13 — Prototypes

## Core idea

JavaScript uses prototype-based delegation.

If a property is not found directly on an object, JavaScript looks through its prototype chain.

```text
object
  ↓
prototype
  ↓
prototype's prototype
  ↓
null
```

## 1. Object.create

```js
const animal = {
  speak() {
    return "sound";
  }
};

const dog = Object.create(animal);
dog.name = "Rex";

dog.speak(); // "sound"
```

`dog` does not own `speak`; lookup delegates to `animal`.

## 2. Own vs inherited

```js
Object.hasOwn(dog, "name");  // true
Object.hasOwn(dog, "speak"); // false
```

## 3. Constructor functions

```js
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return `Hi ${this.name}`;
};

const user = new User("Sam");

user.greet();
```

The `greet` function is shared through the prototype instead of being created separately for every instance.

## 4. Classes use prototypes

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hi ${this.name}`;
  }
}

const user = new User("Sam");
```

Conceptually, `greet` lives on `User.prototype`.

## 5. Real frontend use

Prototype knowledge helps when debugging:

- class instances
- inherited methods
- third-party libraries
- `instanceof`
- custom data structures
- polyfills

Example:

```js
console.log(user instanceof User); // true
console.log(Object.getPrototypeOf(user) === User.prototype); // true
```

## 6. Prototype mutation warning

Changing built-in prototypes globally is usually dangerous:

```js
// Avoid in application code:
Array.prototype.myMethod = ...
```

It can create collisions and surprising behavior across the application.

## Interview checklist

- prototype chain
- property lookup
- own vs inherited
- Object.create
- constructor functions
- class/prototype relationship
- instanceof
- why prototype mutation is risky

**Next:** Map/Set and weak collections solve different collection problems.