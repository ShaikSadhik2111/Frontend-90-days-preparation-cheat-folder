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
