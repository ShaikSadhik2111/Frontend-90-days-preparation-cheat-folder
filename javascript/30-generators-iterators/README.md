# 30 — Generators and Iterators

## Iterator protocol
An iterator exposes next(), returning objects such as { value, done }.

## Manual iterator
    const iterator = {
      current: 1,
      next() {
        if (this.current <= 3) return { value: this.current++, done: false };
        return { value: undefined, done: true };
      }
    };

## Generator
    function* ids() {
      yield 101;
      yield 102;
      yield 103;
    }
    const iterator = ids();
    console.log(iterator.next().value); // 101

Execution pauses at yield and resumes on the next call.

## for...of
    for (const id of ids()) {
      console.log(id);
    }

## Custom iterable
    const range = {
      start: 1,
      end: 3,
      *[Symbol.iterator]() {
        for (let i = this.start; i <= this.end; i++) yield i;
      }
    };
    console.log([...range]); // [1, 2, 3]

## Use cases
- lazy sequences
- large data processing
- custom iteration
- incremental algorithms
- state-machine style workflows

Async generators use async function* and can be consumed with for await...of.

**Next:** debouncing controls bursty UI input.

## Deeper learning standard

### Iterator protocol

An iterator exposes next(), returning an object containing value and done.

```js
const iterator = {
  current: 1,
  next() {
    if (this.current <= 3) {
      return { value: this.current++, done: false };
    }
    return { value: undefined, done: true };
  }
};
```

### Generator mental model

```text
generator()
   ↓
iterator
   ↓ next()
run until yield
   ↓
paused
   ↓ next()
resume
```

### Symbol connection

A custom object becomes iterable by implementing Symbol.iterator. This directly connects folder 15 to this folder.

### Practical frontend use

Generators are less common in ordinary React/Angular business code, but they are useful for lazy sequences, custom iteration and some state-machine/workflow abstractions.

### Interview questions

- What is an iterator?
- What does next() return?
- What does yield do?
- How is Symbol.iterator related to for...of?
- What is the difference between a generator and an ordinary function?

**What this unlocks:** high-frequency browser events require debouncing and throttling.
