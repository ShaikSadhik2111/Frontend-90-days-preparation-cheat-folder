# 04 — Strings

## Mental model
JavaScript strings are immutable values. Many string problems can be solved with array techniques, hashing, two pointers, or sliding windows.

## Frequency example
~~~js
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
~~~

The first loop records counts. The second consumes them. A negative count means b contains a character too many times.

Time O(n), space O(k) for distinct characters.

## Unicode
String indexing uses UTF-16 code units. A visible character can occupy multiple code units. for...of is generally more appropriate when iterating Unicode code points.

## Patterns
Palindrome, frequency map, longest substring, minimum window, parsing, stack matching.

## Pitfalls
Assuming ASCII, repeated expensive string construction, confusing substring with subsequence, and ignoring normalization requirements.

## Challenge
Solve longest substring without repeating characters and explain why its left pointer never moves backward.

## Next
Hashing turns repeated membership/frequency queries into expected constant-time operations.