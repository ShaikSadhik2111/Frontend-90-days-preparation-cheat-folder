# 25 — Bit Manipulation

## Operators
AND &, OR |, XOR ^, NOT ~, left shift <<, right shift >>.

JavaScript bitwise operators convert operands to signed 32-bit integers, so know this before using them on large values.

## XOR identities
x ^ x = 0.
x ^ 0 = x.

Therefore, if every value occurs twice except one, XOR cancels all pairs and leaves the unique value.

## Uses
Parity, power-of-two checks, masks, subset state, bit counting, XOR cancellation.

## Pitfalls
32-bit conversion, signed values, negative numbers, Number vs BigInt, and assuming bitwise code is automatically faster in real applications.

## Challenges
Single Number, Number of 1 Bits, Counting Bits, Missing Number, Power of Two.

## Next
Monotonic stacks add ordering constraints to ordinary stack state.