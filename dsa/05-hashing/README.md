# 05 — Hashing

## Mental model
Hashing maps a key to a storage location so lookup can usually be performed in expected O(1).

JavaScript tools: Map for key/value associations and Set for membership/uniqueness.

## Frequency pattern
~~~js
const freq = new Map();

for (const value of nums) {
  freq.set(value, (freq.get(value) ?? 0) + 1);
}
~~~

get returns the current count or undefined. Nullish coalescing converts the missing case to zero. set stores the incremented count.

## Recognition signals
Have we seen this? Count occurrences. Find duplicates. Find a pair. Group by a key. Remember first occurrence.

## Trade-off
Hashing usually trades O(n) memory for a reduction from repeated O(n) searching to expected O(1) lookup.

## Important distinction
Map and Set provide clearer semantics than plain objects for arbitrary keys and membership. Do not casually claim mathematical O(1); use expected complexity.

## Challenges
Two Sum, Contains Duplicate, Group Anagrams, Longest Consecutive Sequence.

For each, state exactly what the key means and what information the value stores.

## Next
When input is sorted, two pointers can often remove the need for hashing.