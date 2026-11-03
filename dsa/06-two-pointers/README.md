# 06 — Two Pointers

Two pointers reduce unnecessary comparisons by maintaining two positions whose movement is justified by an invariant.

This pattern is especially useful for sorted arrays, opposite-end comparisons, partitions, and fast/slow traversal.

## 1. Core mental model

Instead of repeatedly searching a range, maintain pointers that describe the unresolved region.

Common forms:

1. **Opposite ends** — left/right move toward each other.
2. **Same direction** — slow/fast or read/write pointers.
3. **Sorted convergence** — pointer movement is justified by ordering.
4. **Partitioning** — pointers separate processed and unprocessed regions.

The critical interview question is:

> Why is it safe to move this pointer?

If you cannot justify the movement, you do not yet have the algorithm.

---

# 2. Opposite-end pattern

## Problem 1 — Reverse String

```js
function reverseString(chars) {
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }

  return chars;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(reverseString(["h", "e", "l", "l", "o"])); // → ["o","l","l","e","h"]
```

Invariant:

> Everything outside [left, right] has already been placed correctly.

Time O(n), auxiliary space O(1).

---

# 3. Palindrome

## Problem 2 — Valid Palindrome

If normalization is required, normalize first.

```js
function isAlphaNumeric(ch) {
  return /^[a-z0-9]$/i.test(ch);   // letter or digit
}

function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlphaNumeric(s[left])) left++;
    while (left < right && !isAlphaNumeric(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(isPalindrome("A man, a plan, a canal: Panama")); // → true
console.log(isPalindrome("race a car")); // → false
console.log(isPalindrome(" ")); // → true
```

The two pointers compare the next meaningful characters.

Interview discussion: normalization can change complexity and memory depending on implementation.

---

# 4. Sorted convergence

## Problem 3 — Two Sum II

Because the array is sorted:

```js
function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) return [left + 1, right + 1];

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(twoSumSorted([2, 7, 11, 15], 9)); // → [1,2]
console.log(twoSumSorted([2, 3, 4], 6)); // → [1,3]
console.log(twoSumSorted([-1, 0], -1)); // → [1,2]
```

### Why can we move safely?

If sum is too small, moving the right pointer left can only make the sum smaller or equal. It cannot help.

Therefore increase the smaller side.

If sum is too large, decrease the larger side.

This proof is the important part—not memorizing the code.

---

# 5. Same-direction read/write pointers

## Problem 4 — Remove Duplicates from Sorted Array

```js
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let write = 1;

  for (let read = 1; read < nums.length; read++) {
    if (nums[read] !== nums[write - 1]) {
      nums[write] = nums[read];
      write++;
    }
  }

  return write;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const k = removeDuplicates(nums);
console.log(k); // → 5
console.log(nums.slice(0, k)); // → [0,1,2,3,4]
```

Meaning:

- `read` scans input.
- `write` marks the next valid output position.

Invariant:

> nums[0..write-1] contains the unique values discovered so far.

---

# 6. Move zeroes

## Problem 5 — Move Zeroes

```js
function moveZeroes(nums) {
  let write = 0;

  for (const num of nums) {
    if (num !== 0) {
      nums[write] = num;
      write++;
    }
  }

  while (write < nums.length) {
    nums[write] = 0;
    write++;
  }

  return nums;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
const arr = [0, 1, 0, 3, 12];
moveZeroes(arr);
console.log(arr); // → [1,3,12,0,0]
```

This is a partition/compression pattern.

The first pass preserves the relative order of non-zero values.

---

# 7. Fast/slow pointers

Two pointers can also operate at different speeds.

## Problem 6 — Linked List Cycle

```js
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true;
  }

  return false;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
const toList = (arr) => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = (head) => { const out = []; while (head) { out.push(head.val); head = head.next; } return out; };
const cyclic = toList([3, 2, 0, -4]); cyclic.next.next.next.next = cyclic.next; // tail points back to node 2
console.log(hasCycle(cyclic)); // → true
console.log(hasCycle(toList([1, 2, 3]))); // → false
```

Why does this work?

If a cycle exists, fast eventually laps slow inside the cycle.

If no cycle exists, fast reaches null.

This is Floyd's cycle detection.

---

# 8. Middle of linked list

## Problem 7 — Middle of Linked List

```js
function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
const toList = (arr) => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = (head) => { const out = []; while (head) { out.push(head.val); head = head.next; } return out; };
console.log(middleNode(toList([1, 2, 3, 4, 5])).val); // → 3
console.log(middleNode(toList([1, 2, 3, 4, 5, 6])).val); // → 4
```

Fast travels twice as quickly, so when fast reaches the end, slow is around the middle.

---

# 9. Container With Most Water

## Problem 8

```js
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let best = 0;

  while (left < right) {
    const width = right - left;
    const current = Math.min(height[left], height[right]) * width;

    best = Math.max(best, current);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return best;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // → 49
console.log(maxArea([1, 1])); // → 1
```

The area is limited by the shorter wall.

Why move the shorter wall?

Keeping it and reducing width cannot produce a better area. Moving the taller wall still leaves the shorter wall as the limiting factor.

---

# 10. Three Sum

## Problem 9 — 3Sum

Sort first, then fix one value and use two pointers for the remaining two.

```js
function threeSum(nums) {
  nums.sort((a, b) => a - b);

  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] > 0) break;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // → [[-1,-1,2],[-1,0,1]]
console.log(threeSum([0, 0, 0, 0])); // → [[0,0,0]]
console.log(threeSum([0, 1, 1])); // → []
```

Expected complexity after sorting: O(n²).

The important skills are:

- sorting
- fixing one value
- two-pointer convergence
- duplicate skipping
- early termination

---

# 11. Partitioning

Another two-pointer family separates values into regions.

Typical problems:

- Move Zeroes
- Sort Colors
- Partition Array
- Remove Element

The invariant should describe what each region means.

Example:

``[processed valid values | unread values | ...]``

or, for three-way partitioning:

``[small | unknown | large]``

---

# 12. When NOT to use two pointers

Do not force the pattern.

It may be inappropriate when:

- ordering provides no useful information
- pointer movement cannot be justified
- the problem requires arbitrary historical lookup
- a frequency map is the natural state
- the window boundaries depend on a different constraint

Ask:

> What information makes pointer movement safe?

---

# 13. Common mistakes

### Mistake 1 — moving both pointers blindly

Each movement must preserve the invariant.

### Mistake 2 — forgetting sortedness

Two Sum II works because the array is sorted. The same pointer logic is not automatically valid on arbitrary input.

### Mistake 3 — off-by-one

Be explicit about whether a pointer represents an included or unresolved position.

### Mistake 4 — duplicate handling

3Sum requires deliberate duplicate skipping.

### Mistake 5 — accidental mutation

`sort()` mutates the array. If the caller must preserve input, copy it first.

---

# 14. Recognition checklist

Think **two pointers** when you see:

- sorted array
- pair/triplet target
- palindrome
- reverse
- compare both ends
- remove duplicates in place
- move/partition values
- linked-list middle
- linked-list cycle
- fast/slow traversal

---

# 15. Core problem ladder

### Foundation
1. Reverse String
2. Valid Palindrome
3. Remove Duplicates from Sorted Array

### Intermediate
4. Two Sum II
5. Move Zeroes
6. Middle of Linked List
7. Linked List Cycle

### Advanced
8. Container With Most Water
9. 3Sum
10. Sort Colors

For every problem, explain **why each pointer moves**.

---

## Connection to the next topic

Two pointers work when pointer movement can be justified by ordering or structure.

**Sliding Window** builds on the same left/right boundary idea, but instead of simply converging, the two boundaries maintain a valid contiguous range.

Next:

**Two Pointers → Sliding Window**

---

## More solutions — code, complexity, LeetCode

> **How to run:** copy a function and its **Try it** lines into `practice.js` and run `node practice.js` (or paste into the browser console). The expected output is after `// →`.

### Valid Palindrome II — [LeetCode 680](https://leetcode.com/problems/valid-palindrome-ii/)

**Idea:** Move two pointers inward. At the first mismatch you may delete **one** character: check whether skipping the left one **or** the right one leaves a palindrome.

```js
function validPalindrome(s) {
  const isPal = (l, r) => {
    while (l < r) { if (s[l] !== s[r]) return false; l++; r--; }
    return true;
  };
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return isPal(left + 1, right) || isPal(left, right - 1);
    left++; right--;
  }
  return true;
}
```

**Try it:**

```js
console.log(validPalindrome("aba")); // → true
console.log(validPalindrome("abca")); // → true
console.log(validPalindrome("abc")); // → false
console.log(validPalindrome("deeee")); // → true
```

**Complexity:** Time O(n) · Space O(1).  
**Edge cases:** Already a palindrome → true; deleting is optional.

### Squares of a Sorted Array — [LeetCode 977](https://leetcode.com/problems/squares-of-a-sorted-array/)

**Idea:** The largest square is at one of the **two ends** (big negative or big positive). Compare ends and fill the result from the back.

```js
function sortedSquares(nums) {
  const result = Array(nums.length);
  let left = 0, right = nums.length - 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (Math.abs(nums[left]) > Math.abs(nums[right])) { result[i] = nums[left] ** 2; left++; }
    else { result[i] = nums[right] ** 2; right--; }
  }
  return result;
}
```

**Try it:**

```js
console.log(JSON.stringify(sortedSquares([-4,-1,0,3,10]))); // → [0,1,9,16,100]
console.log(JSON.stringify(sortedSquares([-7,-3,2,3,11]))); // → [4,9,9,49,121]
console.log(JSON.stringify(sortedSquares([-3,-2]))); // → [4,9]
```

**Complexity:** Time O(n) · Space O(n) for the output (sorting the squares would be O(n log n)).  
**Edge cases:** All negative; all positive; single element.
