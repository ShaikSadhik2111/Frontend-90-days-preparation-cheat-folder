# JavaScript Arrays

## 1. What is an Array?

An array is an ordered collection. JavaScript arrays are objects with indexed elements and a length property.

    const fruits = ["apple", "banana", "mango"];

    console.log(fruits[0]); // apple
    console.log(fruits.length); // 3

Mental model:

    index:  0        1         2
    value: apple    banana    mango

Arrays can contain mixed values, although application code normally keeps element types consistent.

## 2. Creating Arrays

    const a = [];
    const b = [1, 2, 3];

    const c = new Array(3); // length 3, empty slots
    const d = Array.from("abc"); // ["a", "b", "c"]

## 3. Reading and Updating

    const numbers = [10, 20, 30];

    console.log(numbers[1]); // 20

    numbers[1] = 200;

    console.log(numbers); // [10, 200, 30]
    console.log(numbers[99]); // undefined

## 4. push, pop, shift and unshift

push adds to the end and mutates the array.

    const numbers = [1, 2];
    const length = numbers.push(3, 4);

    console.log(numbers); // [1, 2, 3, 4]
    console.log(length); // 4

pop removes the last element and returns it.

    const numbers = [1, 2, 3];
    const removed = numbers.pop();

    console.log(removed); // 3
    console.log(numbers); // [1, 2]

unshift adds to the beginning. shift removes from the beginning.

    const numbers = [2, 3];

    numbers.unshift(1);
    console.log(numbers); // [1, 2, 3]

    const first = numbers.shift();
    console.log(first); // 1
    console.log(numbers); // [2, 3]

Front operations generally require existing indexes to move, so they are usually more expensive than end operations.

## 5. slice vs splice

This is a high-frequency interview question.

### slice

Returns a new section and does not mutate the source.

    const numbers = [10, 20, 30, 40];
    const result = numbers.slice(1, 3);

    console.log(result); // [20, 30]
    console.log(numbers); // [10, 20, 30, 40]

The end index is exclusive.

### splice

Mutates the source and can remove, insert or replace elements.

    const numbers = [10, 20, 30, 40];
    const removed = numbers.splice(1, 2);

    console.log(removed); // [20, 30]
    console.log(numbers); // [10, 40]

Insert elements:

    const numbers = [10, 40];

    numbers.splice(1, 0, 20, 30);

    console.log(numbers); // [10, 20, 30, 40]

Interview answer: slice returns a section without mutation; splice modifies the original array.

## 6. map

map transforms every element and returns a new array.

    const prices = [100, 200, 300];

    const discounted = prices.map(price => price * 0.9);

    console.log(discounted); // [90, 180, 270]
    console.log(prices); // [100, 200, 300]

The callback must return the transformed value.

    const result = [1, 2, 3].map(n => {
      n * 2;
    });

    console.log(result); // [undefined, undefined, undefined]

Correct:

    const result = [1, 2, 3].map(n => {
      return n * 2;
    });

## 7. forEach

forEach is mainly for side effects and returns undefined.

    const users = ["A", "B", "C"];

    users.forEach(user => {
      console.log(user);
    });

    const result = [1, 2, 3].forEach(n => n * 2);

    console.log(result); // undefined

map vs forEach:

| Method | Purpose | Return |
|---|---|---|
| map | Transform | New array |
| forEach | Side effects | undefined |

## 8. filter

filter returns a new array containing elements that pass a condition.

    const numbers = [1, 2, 3, 4, 5];

    const even = numbers.filter(n => n % 2 === 0);

    console.log(even); // [2, 4]

Unlike map, the output length can be different.

## 9. find and findIndex

find returns the first matching element.

    const users = [
      { id: 1, name: "A" },
      { id: 2, name: "B" }
    ];

    console.log(users.find(user => user.id === 2));
    // { id: 2, name: "B" }

    console.log(users.find(user => user.id === 99));
    // undefined

findIndex returns the first matching index.

    console.log(users.findIndex(user => user.id === 2)); // 1

## 10. some and every

some asks whether at least one element passes.

    const numbers = [1, 3, 4];

    console.log(numbers.some(n => n % 2 === 0)); // true

every asks whether all elements pass.

    console.log(numbers.every(n => n > 0)); // true

Both can stop early once the result is known.

## 11. includes

    const roles = ["admin", "user"];

    console.log(roles.includes("admin")); // true
    console.log(roles.includes("guest")); // false

For objects, includes checks reference identity.

    const a = { id: 1 };
    const list = [a];

    console.log(list.includes(a)); // true
    console.log(list.includes({ id: 1 })); // false

## 12. reduce

reduce repeatedly combines elements into one accumulated result.

    const numbers = [10, 20, 30];

    const total = numbers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    console.log(total); // 60

Step by step:

    initial accumulator = 0

    0 + 10 = 10
    10 + 20 = 30
    30 + 30 = 60

    final result = 60

The second argument is the initial accumulator. Providing it makes empty-array behavior predictable:

    [].reduce((a, b) => a + b, 0); // 0

Without an initial value, reducing an empty array throws.

### reduce for grouping

    const users = [
      { name: "A", role: "admin" },
      { name: "B", role: "user" },
      { name: "C", role: "admin" }
    ];

    const grouped = users.reduce((result, user) => {
      if (!result[user.role]) {
        result[user.role] = [];
      }

      result[user.role].push(user);
      return result;
    }, {});

Result:

    {
      admin: [
        { name: "A", role: "admin" },
        { name: "C", role: "admin" }
      ],
      user: [
        { name: "B", role: "user" }
      ]
    }

## 13. sort

Default sort compares values as strings.

    console.log([10, 2, 5].sort());
    // [10, 2, 5] because comparison is lexical

Numeric ascending:

    const numbers = [10, 2, 5];

    numbers.sort((a, b) => a - b);

    console.log(numbers); // [2, 5, 10]

Descending:

    numbers.sort((a, b) => b - a);

Object sorting:

    users.sort((a, b) => a.age - b.age);

sort mutates the array. To preserve the original:

    const sorted = [...numbers].sort((a, b) => a - b);

## 14. Mutating vs Non-Mutating

Common mutating methods:

- push
- pop
- shift
- unshift
- splice
- sort
- reverse
- fill

Common non-mutating methods:

- map
- filter
- slice
- concat
- find
- some
- every
- includes

This matters heavily in React.

Bad:

    items.push(newItem);
    setItems(items);

Better:

    setItems(previous => [...previous, newItem]);

## 15. Shallow Copy

Spread creates a shallow copy.

    const original = [1, 2, 3];
    const copy = [...original];

    copy.push(4);

    console.log(original); // [1, 2, 3]

Nested objects are still shared:

    const original = [{ name: "A" }];
    const copy = [...original];

    copy[0].name = "B";

    console.log(original[0].name); // B

## 16. Destructuring

    const numbers = [10, 20, 30];

    const [first, second] = numbers;

    console.log(first); // 10
    console.log(second); // 20

Rest:

    const [first, ...remaining] = numbers;

    console.log(first); // 10
    console.log(remaining); // [20, 30]

## 17. Real Frontend Example

API response:

    const products = [
      { id: 1, name: "Phone", price: 50000, active: true },
      { id: 2, name: "Laptop", price: 80000, active: false },
      { id: 3, name: "Monitor", price: 20000, active: true }
    ];

Filter active products:

    const activeProducts = products.filter(product => product.active);

Extract names:

    const names = products.map(product => product.name);

Calculate total:

    const total = products.reduce((sum, product) => {
      return sum + product.price;
    }, 0);

Find one product:

    const laptop = products.find(product => product.name === "Laptop");

These operations are common when transforming API data for UI rendering.

## 18. Practical Problems

### Remove duplicates

    const numbers = [1, 2, 2, 3, 3, 4];

    const unique = [...new Set(numbers)];

    console.log(unique); // [1, 2, 3, 4]

### Frequency counter

    const words = ["js", "react", "js", "ts", "react"];

    const frequency = words.reduce((result, word) => {
      result[word] = (result[word] || 0) + 1;
      return result;
    }, {});

    console.log(frequency);
    // { js: 2, react: 2, ts: 1 }

### Find maximum

    const numbers = [10, 50, 20, 80];

    const max = Math.max(...numbers);

    console.log(max); // 80

## 19. Complexity

For ordinary dense arrays, this is the useful interview model:

| Operation | Typical complexity |
|---|---:|
| Index access | O(1) |
| Search | O(n) |
| map/filter/reduce | O(n) |
| find | O(n) |
| push | Amortized O(1) |
| pop | O(1) |
| shift | O(n) |
| unshift | O(n) |
| sort | O(n log n) typical |

## 20. Common Mistakes

1. Saying map mutates the source.
2. Forgetting sort mutates.
3. Assuming sort is numeric by default.
4. Confusing slice and splice.
5. Using forEach when a new array is needed.
6. Assuming spread is a deep copy.
7. Mutating React state arrays directly.
8. Using reduce without understanding the accumulator.

## 21. Interview Questions

### Q1. map vs forEach?

map transforms and returns a new array. forEach is for side effects and returns undefined.

### Q2. slice vs splice?

slice returns a section without mutation. splice modifies the original array.

### Q3. Why does numeric sort need a comparator?

Because default sorting compares converted string values.

### Q4. Is spread a deep copy?

No. It creates a shallow copy.

### Q5. When should you use reduce?

When a collection must be accumulated into a value or structure such as a sum, object, grouping or derived result.

## 22. Output Practice

What is printed?

    const arr = [1, 2, 3];

    const result = arr.map(n => {
      if (n > 1) return n * 2;
    });

    console.log(result);

Answer:

    [undefined, 4, 6]

The first callback execution reaches the end without returning a value.

## 23. Revision Checklist

- [ ] Array indexing and length
- [ ] push/pop/shift/unshift
- [ ] slice vs splice
- [ ] map/filter/reduce
- [ ] reduce accumulator tracing
- [ ] some/every/find/findIndex/includes
- [ ] mutation vs immutability
- [ ] numeric sort
- [ ] shallow copies
- [ ] array complexity
- [ ] practical interview problems
