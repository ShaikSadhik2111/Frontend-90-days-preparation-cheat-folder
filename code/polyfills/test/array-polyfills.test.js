import { test } from "node:test";
import assert from "node:assert/strict";
import { flatten, flattenIterative, chunk } from "../src/array-polyfills.js";

test("myMap / myFilter / myReduce", () => {
  assert.deepEqual([1, 2, 3].myMap((x) => x * 2), [2, 4, 6]);
  assert.deepEqual([1, 2, 3, 4].myFilter((x) => x % 2 === 0), [2, 4]);
  assert.equal([1, 2, 3].myReduce((a, b) => a + b), 6);
  assert.equal([1, 2, 3].myReduce((a, b) => a + b, 10), 16);
  assert.throws(() => [].myReduce((a, b) => a + b), TypeError);
});

test("flatten", () => {
  const arr = [1, [2, [3, [4]], 5]];
  assert.deepEqual(flatten(arr), [1, 2, 3, 4, 5]);
  assert.deepEqual(flatten(arr, 1), [1, 2, [3, [4]], 5]);
  assert.deepEqual(flattenIterative(arr), [1, 2, 3, 4, 5]);
});

test("chunk", () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});
