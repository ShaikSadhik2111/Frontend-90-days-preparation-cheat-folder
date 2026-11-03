# 25 — Bit Manipulation

JavaScript bitwise operators convert numbers to signed 32-bit integers. This is a crucial JS-specific caveat.

Operators:
`&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`.

## Core patterns

### Check bit
```js
(value & (1 << bit)) !== 0
```

### Set bit
```value | (1 << bit)``

### Clear bit
```value & ~(1 << bit)``

### Toggle bit
```value ^ (1 << bit)``

## Problem 1 — Single Number

XOR cancels equal values because x ^ x = 0 and x ^ 0 = x.

```js
function singleNumber(nums) {
  let answer = 0;
  for (const num of nums) answer ^= num;
  return answer;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(singleNumber([4, 1, 2, 1, 2])); // → 4
console.log(singleNumber([2, 2, 1])); // → 1
```

## Problem 2 — Number of 1 Bits

Repeatedly clear the lowest set bit:

``n = n & (n - 1)``

Each iteration removes one set bit.

## Problem 3 — Counting Bits

Build answers for every number using:

``bits[i] = bits[i >> 1] + (i & 1)``

## Problem 4 — Missing Number

XOR indices and values; equal values cancel, leaving the missing index.

## Problem 5 — Power of Two

For a positive power of two, exactly one bit is set.

``n > 0 && (n & (n - 1)) === 0``

## Problem 6 — Reverse Bits

Process 32 bits and construct the reversed result.

## Pitfalls
Bitwise operations are 32-bit in JavaScript. For values outside that domain, consider BigInt where appropriate and understand that BigInt and Number cannot be mixed directly.

## Recognition
XOR cancellation, binary flags, masks, powers of two, set-bit counting.

---

## Full solutions — code, complexity, LeetCode

JavaScript bitwise operators work on **32-bit signed integers**. Use `>>> 0` to read a result as unsigned.

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Number of 1 Bits — [LeetCode 191](https://leetcode.com/problems/number-of-1-bits/)

**Idea:** `n & (n - 1)` clears the lowest set bit. Count how many times you can do it.

```js
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) { n &= n - 1; count++; }
  return count;
}
```

**Try it:**

```js
console.log(hammingWeight(11)); // → 3
console.log(hammingWeight(128)); // → 1
console.log(hammingWeight(2147483645)); // → 30
```

**Complexity:** Time O(number of set bits) · Space O(1).  
**Edge cases:** Inputs up to 2³¹−1 on LeetCode.

### Counting Bits — [LeetCode 338](https://leetcode.com/problems/counting-bits/)

**Idea:** `bits[i] = bits[i >> 1] + (i & 1)` — i has the same bits as i/2 plus its last bit.

```js
function countBits(n) {
  const bits = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) bits[i] = bits[i >> 1] + (i & 1);
  return bits;
}
```

**Try it:**

```js
console.log(JSON.stringify(countBits(2))); // → [0,1,1]
console.log(JSON.stringify(countBits(5))); // → [0,1,1,2,1,2]
```

**Complexity:** Time O(n) · Space O(n).  
**Edge cases:** n = 0 → [0].

### Missing Number — [LeetCode 268](https://leetcode.com/problems/missing-number/)

**Idea:** XOR every index 0..n with every value; pairs cancel (`x ^ x = 0`) and only the missing number remains. (Sum formula also works.)

```js
function missingNumber(nums) {
  let x = nums.length;
  for (let i = 0; i < nums.length; i++) x ^= i ^ nums[i];
  return x;
}
```

**Try it:**

```js
console.log(missingNumber([3,0,1])); // → 2
console.log(missingNumber([0,1])); // → 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // → 8
```

**Complexity:** Time O(n) · Space O(1).  
**Edge cases:** Missing 0 or missing n.

### Power of Two — [LeetCode 231](https://leetcode.com/problems/power-of-two/)

**Idea:** A power of two has exactly one set bit, so `n & (n - 1)` is 0. Must be positive.

```js
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}
```

**Try it:**

```js
console.log(isPowerOfTwo(1)); // → true
console.log(isPowerOfTwo(16)); // → true
console.log(isPowerOfTwo(3)); // → false
console.log(isPowerOfTwo(0)); // → false
```

**Complexity:** Time O(1) · Space O(1).  
**Edge cases:** 0 and negatives → false.

### Reverse Bits — [LeetCode 190](https://leetcode.com/problems/reverse-bits/)

**Idea:** Take the lowest bit of n 32 times and push it onto the result from the right. `>>> 0` keeps the result unsigned in JS.

```js
function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
}
```

**Try it:**

```js
console.log(reverseBits(43261596)); // → 964176192
console.log(reverseBits(4294967293)); // → 3221225471
```

**Complexity:** Time O(32) · Space O(1).  
**Edge cases:** Results above 2³¹ need `>>> 0` to stay positive.
