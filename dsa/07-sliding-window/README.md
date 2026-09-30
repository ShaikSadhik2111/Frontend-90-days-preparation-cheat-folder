# 07 — Sliding Window

## Mental model
A window is [left...right]. Expand right to include data; move left when the window violates its invariant.

## Example
~~~js
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
~~~

Each character enters once and leaves at most once, so the nested while does not make this O(n²). Total pointer movement is O(n).

## Fixed vs variable
Fixed window has size k. Variable window expands/shrinks according to a condition.

## Warning
Sliding window is not universally valid. Negative numbers can break common sum-based shrinking assumptions because adding/removing an element may not change the sum monotonically.

## Challenges
Maximum Average Subarray, Longest Repeating Character Replacement, Minimum Window Substring, Max Consecutive Ones III.

## Next
Prefix sums solve many range-sum problems by storing cumulative information.