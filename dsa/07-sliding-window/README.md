# 07 — Sliding Window

Sliding window is a specialized two-pointer technique for **contiguous** ranges.

## Mental model
[left, right] is the current window. Expand right to include data; when the window violates a constraint, move left until it is valid again.

The core invariant is:

> After the inner loop finishes, the current window satisfies the problem constraint.

### Fixed vs variable
- Fixed: window length is predetermined.
- Variable: length changes according to validity.

## Problem 1 — Maximum sum of size K

```js
function maxSum(nums, k) {
  if (k <= 0 || k > nums.length) return null;

  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];

  let best = sum;

  for (let right = k; right < nums.length; right++) {
    sum += nums[right];
    sum -= nums[right - k];
    best = Math.max(best, sum);
  }

  return best;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(maxSum([2, 1, 5, 1, 3, 2], 3)); // → 9
console.log(maxSum([1, 2], 3)); // → null
```

Instead of recalculating every window in O(nk), remove the outgoing value and add the incoming value. Time O(n), space O(1).

## Problem 2 — Longest substring without repeating characters

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

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(lengthOfLongestSubstring("abcabcbb")); // → 3
console.log(lengthOfLongestSubstring("pwwkew")); // → 3
```

The window is always duplicate-free. Although there is a nested while, each character enters and leaves the Set at most once: O(n).

## Problem 3 — Permutation in String

Use a fixed-size frequency window.

```js
function checkInclusion(pattern, text) {
  if (pattern.length > text.length) return false;

  const need = new Map();
  const have = new Map();

  for (const c of pattern) {
    need.set(c, (need.get(c) ?? 0) + 1);
  }

  let matches = 0;
  const required = need.size;

  for (let right = 0; right < text.length; right++) {
    const c = text[right];
    have.set(c, (have.get(c) ?? 0) + 1);

    if (need.has(c) && have.get(c) === need.get(c)) matches++;

    if (right >= pattern.length) {
      const out = text[right - pattern.length];
      if (need.has(out) && have.get(out) === need.get(out)) matches--;
      have.set(out, have.get(out) - 1);
    }

    if (matches === required) return true;
  }

  return false;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(checkInclusion("ab", "eidbaooo")); // → true
console.log(checkInclusion("ab", "eidboaoo")); // → false
```

This demonstrates that sliding windows can track **frequency state**, not just membership.

## Advanced problems
- Find All Anagrams in a String
- Longest Repeating Character Replacement
- Fruit Into Baskets
- Minimum Window Substring

### Minimum-window reasoning
Expand until valid; then shrink while still valid. Record the smallest valid window before shrinking makes it invalid.

## Recognition
Look for: contiguous substring/subarray, longest/shortest, at most/exactly K, fixed K, frequency constraints.

## Pitfalls
Do not use sliding window for arbitrary subsequences. Be precise about whether validity is checked before or after adding/removing an element.

## Interview drill
Explain what the window represents, what makes it invalid, why left only moves forward, and why total pointer movement is O(n).

## Connection
**Sliding Window → Prefix Sum**: windows maintain a dynamic contiguous state; prefix sums store cumulative state so range sums can be answered or combined with hashing.

---

## More solutions — code, complexity, LeetCode

> **How to run:** copy a function and its **Try it** lines into `practice.js` and run `node practice.js` (or paste into the browser console). The expected output is after `// →`.

### Maximum Average Subarray I — [LeetCode 643](https://leetcode.com/problems/maximum-average-subarray-i/)

**Idea:** **Fixed-size window** of k: add the new element, remove the one that left, track the best sum. Divide once at the end.

```js
function findMaxAverage(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    best = Math.max(best, sum);
  }
  return best / k;
}
```

**Try it:**

```js
console.log(findMaxAverage([1,12,-5,-6,50,3],4)); // → 12.75
console.log(findMaxAverage([5],1)); // → 5
```

**Complexity:** Time O(n) · Space O(1).  
**Edge cases:** k equals array length; negative numbers.

### Minimum Size Subarray Sum — [LeetCode 209](https://leetcode.com/problems/minimum-size-subarray-sum/)

**Idea:** **Variable window** (all numbers are positive): expand right; while the sum is ≥ target, record the length and shrink from the left.

```js
function minSubArrayLen(target, nums) {
  let left = 0, sum = 0, best = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= nums[left++];
    }
  }
  return best === Infinity ? 0 : best;
}
```

**Try it:**

```js
console.log(minSubArrayLen(7,[2,3,1,2,4,3])); // → 2
console.log(minSubArrayLen(4,[1,4,4])); // → 1
console.log(minSubArrayLen(11,[1,1,1,1,1,1,1,1])); // → 0
```

**Complexity:** Time O(n) — each index enters and leaves once · Space O(1).  
**Edge cases:** No valid subarray → 0. Works only because numbers are positive (negatives need prefix sums).
