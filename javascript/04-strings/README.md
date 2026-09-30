# 04 — Strings

## Core idea

Strings are immutable sequences of UTF-16 code units.

```js
const name = "Sadhik";
name[0]; // "S"
name.length; // 6
```

String methods return new strings; they do not mutate the original.

## 1. Common operations

```js
const text = "  Hello JavaScript  ";

text.trim();                 // "Hello JavaScript"
text.toLowerCase();          // "  hello javascript  "
text.includes("Java");       // true
text.startsWith("  Hello");  // true
text.slice(2, 7);            // "Hello"
text.replace("JavaScript", "JS");
```

### Frontend use cases

- search/filter input
- form validation
- URL construction
- formatting API responses
- displaying user names
- parsing CSV-like text

## 2. Template literals

```js
const user = "Sam";
const count = 5;

const message = `Hello ${user}, you have ${count} notifications.`;
```

Useful for readable dynamic strings and multiline content.

## 3. split and join

```js
const tags = "react,typescript,javascript";

const tagList = tags.split(",");
const normalized = tagList.map(tag => tag.trim());

console.log(normalized);
// ["react", "typescript", "javascript"]

console.log(normalized.join(" | "));
// "react | typescript | javascript"
```

## 4. replace vs replaceAll

```js
"foo foo".replace("foo", "bar");
// "bar foo"

"foo foo".replaceAll("foo", "bar");
// "bar bar"
```

Regular expressions can also control replacement behavior.

## 5. Unicode

`length` counts UTF-16 code units, not always user-perceived characters.

```js
const emoji = "😀";

console.log(emoji.length); // 2
console.log([...emoji].length); // 1
```

For many Unicode-aware iteration cases, `for...of` or spread is more appropriate.

## 6. Immutability

```js
const name = "Sam";

// name[0] = "X"; // does not mutate the string
const updated = "X" + name.slice(1);

console.log(name);    // Sam
console.log(updated); // Xam
```

## Interview checklist

- UTF-16 code units
- immutability
- template literals
- slice vs substring
- split/join
- replace/replaceAll
- Unicode edge cases
- string normalization before comparison

**Next:** arrays use ordered collections of values and introduce iteration/transformation.