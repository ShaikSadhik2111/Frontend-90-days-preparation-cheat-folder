# 04 — Strings

Strings are both a **JavaScript language topic** and a major DSA category. This chapter covers both: first understand exactly how JavaScript string APIs behave, then learn the algorithmic patterns built on top of strings.

---

## 1. String mental model

A JavaScript string is an immutable sequence of UTF-16 code units.

```js
const name = "Sadhik";
```

The variable stores a string value. String methods return new values rather than modifying the original string.

```js
const text = "hello";

const upper = text.toUpperCase();

console.log(text);  // "hello"
console.log(upper); // "HELLO"
```

This immutability matters when reasoning about performance and transformations.

---

# 2. Creating strings

## String literals

```js
const a = "hello";
const b = 'hello';
const c = `hello`;
```

Template literals additionally support interpolation and multiline text.

```js
const name = "Sadhik";
const message = `Hello, ${name}`;
```

## String constructor

```const value = String(123); // "123"```

Prefer `String(value)` when explicit conversion is required rather than relying on implicit coercion.

---

# 3. length

```js
const text = "JavaScript";

console.log(text.length); // 10
```

Important: `length` counts UTF-16 code units, not necessarily user-perceived characters.

For example, some Unicode symbols occupy two code units.

---

# 4. Accessing characters

## Bracket notation

```js
const text = "hello";

console.log(text[0]); // "h"
console.log(text[4]); // "o"
```

## at()

```js
console.log(text.at(0));  // "h"
console.log(text.at(-1)); // "o"
```

`at(-1)` is useful when you need the last character without calculating `length - 1`.

## charAt()

```js
text.charAt(1); // "e"
```

A notable difference:

```js
text[99];       // undefined
text.charAt(99); // ""
```

---

# 5. Unicode-aware iteration

```js
for (const char of "hello") {
  console.log(char);
}
```

`for...of` iterates Unicode code points, whereas indexing operates on UTF-16 code units.

This distinction matters for interview questions involving emojis or non-BMP characters.

---

# 6. slice()

```js
const text = "JavaScript";

text.slice(0, 4);   // "Java"
text.slice(4);      // "Script"
text.slice(-6);     // "Script"
text.slice(0, -6);  // "Java"
```

General form:

``slice(start, end)``

- start is inclusive
- end is exclusive
- negative indexes count from the end
- original string is unchanged

---

# 7. substring()

```js
const text = "JavaScript";

text.substring(0, 4); // "Java"
```

Important differences from `slice`:

- negative arguments are treated as 0
- if start > end, arguments are swapped

```js
text.slice(4, 1);      // "a"
text.substring(4, 1);  // "ava"
```

Know this distinction for small-company JavaScript interviews.

---

# 8. substr()

`substr(start, length)` is a legacy/deprecated API. Do not use it in new code.

Know that it differs from `substring`:

``substr(start, length)``

The second argument represents a **length**, not an ending index.

---

# 9. Searching

## includes()

```js
"frontend".includes("end"); // true
```

Returns a boolean.

## startsWith / endsWith

```js
"javascript".startsWith("java"); // true
"javascript".endsWith("script");  // true
```

## indexOf()

```js
const index = "hello world".indexOf("world");
// 6
```

Returns the first matching index or `-1`.

## lastIndexOf()

Returns the last occurrence.

```js
"banana".lastIndexOf("a"); // 5
```

## search()

Uses a regular expression and returns the matching index or `-1`.

---

# 10. Extracting matches

## match()

```js
"cat dog cat".match(/cat/g);
// ["cat", "cat"]
```

Without `g`, the result contains additional match information.

## matchAll()

Returns an iterator over all regex matches and their capture information.

---

# 11. Replacing text

## replace()

```js
"hello hello".replace("hello", "hi");
// "hi hello"
```

A string pattern replaces the first occurrence.

## replaceAll()

```js
"hello hello".replaceAll("hello", "hi");
// "hi hi"
```

Always remember: these methods return a new string.

---

# 12. Splitting

```js
const words = "one,two,three".split(",");

console.log(words);
// ["one", "two", "three"]
```

The optional limit changes how many pieces are returned.

```js
"a-b-c".split("-", 2);
// ["a", "b"]
```

Common interview pattern:

``string → split → process → join``

But do not use split blindly for Unicode-sensitive character processing.

---

# 13. Joining

Strings themselves do not have a `join` method. Arrays do.

```js
const words = ["frontend", "engineer"];

const result = words.join(" ");

console.log(result);
// "frontend engineer"
```

For repeated string construction, collecting pieces and joining once can be clearer than repeatedly creating intermediate strings.

---

# 14. Concatenation

```js
const a = "Hello";
const b = "World";

const result = a + " " + b;
```

Or:

```js
a.concat(" ", b);
```

Template literals are often easier to read for interpolation.

---

# 15. Case conversion

```js
"hello".toUpperCase(); // "HELLO"
"HELLO".toLowerCase(); // "hello"
```

For user-facing internationalized text, locale-aware behavior may matter:

``toLocaleLowerCase()``

Do not assume ASCII casing rules cover every language.

---

# 16. Trimming whitespace

```js
const text = "  hello  ";

text.trim();      // "hello"
text.trimStart(); // "hello  "
text.trimEnd();   // "  hello"
```

Common frontend use:

- form normalization
- search input
- validation
- user-generated text

Be careful not to trim data when whitespace is semantically meaningful.

---

# 17. Padding

```js
"42".padStart(5, "0");
// "00042"

"42".padEnd(5, "0");
// "42000"
```

Useful for display formatting and fixed-width representations.

---

# 18. repeat()

```js
"ab".repeat(3);
// "ababab"
```

Useful in formatting and simple algorithmic construction.

---

# 19. Comparing strings

Basic comparison:

```js
"apple" < "banana"; // true
```

For locale-aware ordering:

``localeCompare()``

```js
"apple".localeCompare("banana");
```

Do not assume lexical comparison is identical to human language sorting.

---

# 20. Converting between string and number

```js
Number("42"); // 42
String(42);   // "42"
parseInt("42px", 10); // 42
parseFloat("3.14px"); // 3.14
```

Understand the difference between conversion and parsing.

For example:

``Number("42px")`` → NaN

while:

``parseInt("42px", 10)`` → 42

Do not use parseInt as a general-purpose numeric validator.

---

# 21. Regex connection

Strings frequently combine with regular expressions.

```js
/^\d+$/.test("123"); // true
```

Know the difference between:

- literal string search
- regex search
- capture groups
- global matching
- replacement patterns

Do not use complex regex when a simple string method is clearer.

---

# 22. JavaScript string behavior interview traps

### Is a string mutable?

No.

```js
let text = "cat";
text[0] = "b";

console.log(text);
// "cat"
```

You create a new string instead.

### slice vs substring?

``slice`` supports negative indexes; ``substring`` converts negatives to 0 and swaps reversed arguments.

### indexOf result?

`-1` means not found.

### Does replace modify the original?

No.

### What does split return?

An array.

### What does join return?

A string.

### Does length always equal the number of visible characters?

No. Unicode code points/grapheme clusters can differ from UTF-16 code-unit length.

---

# 23. DSA pattern — frequency counting

Frequency is one of the most common string interview patterns.

```js
function isAnagram(a, b) {
  if (a.length !== b.length) return false;

  const count = new Map();

  for (const char of a) {
    count.set(char, (count.get(char) ?? 0) + 1);
  }

  for (const char of b) {
    const next = (count.get(char) ?? 0) - 1;

    if (next < 0) return false;

    count.set(char, next);
  }

  return true;
}
```

### Trace

For `a = "abb"`:

``a → 1``
``b → 1``
``b → 2``

For `b = "bab"`, the second loop consumes the counts.

The Map represents the remaining required frequency.

Time: O(n), auxiliary space: O(k).

---

# 24. DSA pattern — palindrome

A palindrome reads the same from both directions.

```js
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;

    left++;
    right--;
  }

  return true;
}
```

Invariant:

> Everything outside [left, right] has already been verified as matching.

Time O(n), space O(1).

---

# 25. DSA pattern — two pointers

Two pointers are useful when characters at opposite ends can be compared or processed.

Typical problems:

- Valid Palindrome
- Reverse String
- Container With Most Water
- 3Sum

The key interview question is:

> Why is it safe to move this pointer?

If you cannot answer that, the pointer algorithm is not yet understood.

---

# 26. DSA pattern — sliding window

Used for contiguous substrings.

Classic problem:

**Longest Substring Without Repeating Characters**

```js
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }

  return best;
}
```

Each character enters and leaves the set at most once, so the algorithm is O(n), not O(n²).

---

# 27. Substring vs subsequence

This is a common interview distinction.

### Substring

Characters must be contiguous.

`"abc"` is a substring of `"xxabcxx"`.

### Subsequence

Characters do not need to be contiguous, but their relative order must remain.

`"ace"` is a subsequence of `"abcde"`.

This distinction changes the algorithm completely.

---

# 28. Important string problems

## Foundation

1. Reverse String
2. Valid Palindrome
3. Valid Anagram
4. First Unique Character
5. Longest Common Prefix
6. Reverse Words in a String
7. Is Subsequence

## Intermediate

8. Group Anagrams
9. Longest Substring Without Repeating Characters
10. String Compression
11. Permutation in String
12. Find All Anagrams in a String
13. Longest Repeating Character Replacement
14. Encode and Decode Strings

## Advanced

15. Minimum Window Substring
16. Longest Palindromic Substring
17. Palindromic Substrings
18. Word Break
19. Word Search
20. Implement strStr / substring search
21. Edit Distance

---

# 29. Common string algorithm choices

| Problem signal | First idea |
|---|---|
| character frequency | Map / fixed frequency table |
| same characters, different order | frequency / sorting |
| palindrome | two pointers |
| longest contiguous substring | sliding window |
| minimum valid substring | sliding window |
| prefix matching | trie / prefix scan |
| dictionary segmentation | DP / trie |
| all combinations | backtracking |
| repeated pattern matching | string matching algorithms |
| edit operations | dynamic programming |

---

# 30. Debugging checklist

When a string solution fails, inspect:

- empty string
- one character
- repeated characters
- all identical characters
- spaces
- punctuation
- uppercase/lowercase
- Unicode
- negative/invalid indexes
- substring boundaries
- duplicate matches
- whether the problem says substring or subsequence
- whether input may be mutated

---

# 31. Interview drill

For every string problem, answer:

1. What exactly is the input?
2. Are characters ASCII or arbitrary Unicode?
3. Is case significant?
4. Are spaces significant?
5. Is the result a substring, subsequence, or arbitrary selection?
6. Can I use extra memory?
7. Can two pointers reduce the search?
8. Is this a frequency problem?
9. Is it a sliding-window problem?
10. What is the invariant?
11. What is the complexity?
12. What happens for an empty input?

## Practical challenge

Take **Longest Substring Without Repeating Characters** and solve it three ways:

1. brute force
2. Set-based sliding window
3. last-seen-index Map optimization

Then explain why each version has its particular complexity.

---

# 32. What you should be able to answer in a small-company interview

You should be comfortable answering questions such as:

- Difference between `slice`, `substring`, and `substr`.
- Difference between `charAt`, bracket indexing, and `at`.
- Is JavaScript string mutable?
- What does `split()` return?
- What does `join()` return?
- Difference between `replace()` and `replaceAll()`.
- Difference between `includes()` and `indexOf()`.
- How does `trim()` work conceptually?
- How do you reverse a string?
- How do you count characters?
- How do you check an anagram?
- How do you find the first non-repeating character?
- How do you find the longest substring without duplicates?
- What is the difference between substring and subsequence?
- How do Unicode and UTF-16 affect character handling?
- What is the time complexity of your solution?
- Why did you choose Map/Set/two pointers/sliding window?

This is the **end-to-end standard**: language-level operations + runtime behavior + DSA patterns + implementation + debugging + interview questions.
