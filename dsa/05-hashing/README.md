# 05 — Hashing

Hashing is the bridge from repeated searching to fast expected lookup. In JavaScript, the main tools are **Map** and **Set**.

## 1. Mental model

A hash table stores information so we can usually ask:

> "Have I seen this key before?" or "What information do I know about this key?"

with expected O(1) lookup.

Use:

- `Set` when you need membership/uniqueness.
- `Map` when a key must map to information such as a count, index, or group.

Do not describe this as guaranteed mathematical O(1); hash-table performance is generally **expected/amortized** and depends on implementation.

---

## 2. JavaScript operations

```js
const map = new Map();

map.set("a", 10);
map.get("a");       // 10
map.has("a");       // true
map.delete("a");    // true
map.size;           // 0
```

Set:

```js
const seen = new Set();

seen.add(10);
seen.has(10);       // true
seen.delete(10);    // true
```

Map preserves insertion order during iteration. Keys can be objects, unlike the common string-key model of plain objects.

---

# 3. Pattern: frequency counting

### Problem 1 — Character frequency

```js
function frequency(text) {
  const count = new Map();

  for (const char of text) {
    count.set(char, (count.get(char) ?? 0) + 1);
  }

  return count;
}
```

### Line-by-line reasoning

`new Map()` creates empty state.

For every character:

`count.get(char)` retrieves the current count.

`?? 0` converts the missing case to zero.

`+ 1` records the new occurrence.

The invariant is:

> After processing the first i characters, the map contains exactly their frequencies.

Time O(n), space O(k), where k is the number of distinct characters.

### Problem 2 — Valid Anagram

Build frequencies for one string and consume them with the second.

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

The key idea is **remaining required frequency**.

---

# 4. Pattern: membership with Set

### Problem 3 — Contains Duplicate

```js
function containsDuplicate(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }

  return false;
}
```

The moment a value is already present, the duplicate is proven.

This is usually O(n) expected time and O(n) space.

### Why not nested loops?

Nested loops compare many pairs:

O(n²).

A Set remembers prior values, turning the repeated search into expected O(1) lookup.

---

# 5. Pattern: complement lookup

### Problem 4 — Two Sum

```js
function twoSum(nums, target) {
  const indexByValue = new Map();

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];

    if (indexByValue.has(needed)) {
      return [indexByValue.get(needed), i];
    }

    indexByValue.set(nums[i], i);
  }

  return [];
}
```

At index i:

`needed = target - current`.

The map answers:

> Have I already seen the number I need?

Important ordering detail: check before inserting the current value so the same element is not reused.

---

# 6. Pattern: grouping by a computed key

### Problem 5 — Group Anagrams

A canonical representation can become the group key.

Simple approach:

```js
function groupAnagrams(words) {
  const groups = new Map();

  for (const word of words) {
    const key = [...word].sort().join("");

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }

  return [...groups.values()];
}
```

For production-scale inputs, consider a frequency signature instead of sorting every word.

This demonstrates an important pattern:

**compute key → lookup group → append.**

---

# 7. Pattern: first occurrence / remembered state

### Problem 6 — First Unique Character

```js
function firstUniqueChar(s) {
  const count = new Map();

  for (const char of s) {
    count.set(char, (count.get(char) ?? 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) return i;
  }

  return -1;
}
```

Why two passes?

The first pass establishes complete frequency information. The second preserves the original ordering.

---

# 8. Pattern: prefix state + hash map

Hashing becomes more powerful when the stored key represents a **state**, not merely an input value.

### Problem 7 — Subarray Sum Equals K

For prefix sum:

``prefix[i] - prefix[j] = k``

therefore:

``prefix[j] = prefix[i] - k``

So store how often each prefix sum has occurred.

```js
function subarraySum(nums, k) {
  const count = new Map([[0, 1]]);
  let prefix = 0;
  let answer = 0;

  for (const num of nums) {
    prefix += num;

    answer += count.get(prefix - k) ?? 0;

    count.set(prefix, (count.get(prefix) ?? 0) + 1);
  }

  return answer;
}
```

The `[0, 1]` initialization represents an empty prefix whose sum is zero.

This is a major interview pattern:

**prefix state + Map = replace repeated subarray search with lookup.**

---

# 9. Pattern: consecutive sequence

### Problem 8 — Longest Consecutive Sequence

Put all values in a Set. Only start a sequence when `num - 1` is absent.

```js
function longestConsecutive(nums) {
  const values = new Set(nums);
  let best = 0;

  for (const num of values) {
    if (!values.has(num - 1)) {
      let current = num;
      let length = 1;

      while (values.has(current + 1)) {
        current++;
        length++;
      }

      best = Math.max(best, length);
    }
  }

  return best;
}
```

Why is this O(n) expected rather than O(n²)?

Every sequence is expanded only from its smallest element. A number is not repeatedly used as the start of the same sequence.

---

# 10. Pattern: mapping relationships

### Problem 9 — Isomorphic Strings

Two strings are isomorphic when each character consistently maps to one character and the reverse relationship is also unique.

Use two maps:

```js
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;

  const sToT = new Map();
  const tToS = new Map();

  for (let i = 0; i < s.length; i++) {
    const a = s[i];
    const b = t[i];

    if (sToT.has(a) && sToT.get(a) !== b) return false;
    if (tToS.has(b) && tToS.get(b) !== a) return false;

    sToT.set(a, b);
    tToS.set(b, a);
  }

  return true;
}
```

One map prevents one-to-many mappings; the reverse map prevents many-to-one mappings.

---

# 11. Map vs Object

For interview code, prefer `Map` when the problem is explicitly a hash-map problem.

```js
const map = new Map();

map.set(1, "number key");
map.set("1", "string key");
```

These are distinct keys.

With plain objects, keys are property keys and are coerced into strings/symbols.

Use objects when the data naturally represents a record with known property names. Use Map when you need general key-value association.

---

# 12. Set vs Map

| Requirement | Choose |
|---|---|
| Have I seen this? | Set |
| Remove duplicates | Set |
| Count occurrences | Map |
| Store index | Map |
| Group by key | Map |
| Map one entity to another | Map |
| Membership only | Set |

---

# 13. Common mistakes

### Mistake 1 — forgetting zero

```js
count.get(key) + 1
```

fails for an unseen key because `undefined + 1` is NaN.

Use:

``(count.get(key) ?? 0) + 1``

### Mistake 2 — wrong Two Sum order

Insert first and then search can accidentally reuse the same index.

### Mistake 3 — claiming guaranteed O(1)

Say **expected O(1)**.

### Mistake 4 — using an array for membership

Repeated `includes()` creates O(n) lookup and can turn an otherwise linear solution into O(n²).

### Mistake 5 — forgetting what the value means

Always be able to say:

> "The Map key is X; the value stores Y because I need Y later."

---

# 14. Recognition checklist

Think **hashing** when you hear:

- count
- frequency
- duplicate
- already seen
- first occurrence
- last occurrence
- pair/complement
- group by property
- lookup previous state
- remember index
- uniqueness
- prefix state

---

# 15. Interview progression

### Level 1
- Contains Duplicate
- Character Frequency
- Valid Anagram

### Level 2
- Two Sum
- First Unique Character
- Group Anagrams
- Isomorphic Strings

### Level 3
- Longest Consecutive Sequence
- Subarray Sum Equals K
- Longest Substring Without Repeating Characters

### Challenge

For each problem, first solve it without looking at the pattern name.

Then explain:

1. What information must be remembered?
2. What is the Map/Set key?
3. What does its value mean?
4. When is the lookup performed?
5. Why does the lookup remove a repeated scan?
6. What is the invariant?
7. What is the expected time and space complexity?
8. What happens for empty input, duplicates, negatives, and repeated values?

---

## Connection to the next topic

Hashing gives fast lookup by remembering information.

**Two pointers** will show that when the input has useful ordering—especially sorted data—we can sometimes avoid extra hash memory and move pointers using a proof-based invariant.

Next:

**Hashing → Two Pointers → Sliding Window**
