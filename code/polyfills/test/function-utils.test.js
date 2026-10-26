import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { debounce, throttle, once, memoize, curry, sum, compose, pipe } from "../src/function-utils.js";

test("debounce calls once with latest args after wait", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"] });
  const fn = mock.fn();
  const d = debounce(fn, 100);
  d(1); d(2); d(3);
  t.mock.timers.tick(99);
  assert.equal(fn.mock.callCount(), 0);
  t.mock.timers.tick(1);
  assert.equal(fn.mock.callCount(), 1);
  assert.deepEqual(fn.mock.calls[0].arguments, [3]);
});

test("debounce leading + cancel", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const fn = mock.fn();
  const d = debounce(fn, 100, { leading: true });
  d("a"); d("b");
  assert.equal(fn.mock.callCount(), 1);
  d.cancel();
  t.mock.timers.tick(200);
  assert.equal(fn.mock.callCount(), 1);
});

test("throttle: leading call + one trailing call per window", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"] });
  const fn = mock.fn();
  const th = throttle(fn, 100);
  th(1); th(2); th(3);
  assert.equal(fn.mock.callCount(), 1);
  t.mock.timers.tick(100);
  assert.equal(fn.mock.callCount(), 2);
  assert.deepEqual(fn.mock.calls[1].arguments, [3]);
});

test("once", () => {
  const fn = mock.fn((x) => x * 2);
  const o = once(fn);
  assert.equal(o(2), 4);
  assert.equal(o(5), 4);
  assert.equal(fn.mock.callCount(), 1);
});

test("memoize", () => {
  const fn = mock.fn((a, b) => a + b);
  const m = memoize(fn);
  m(1, 2); m(1, 2); m(2, 2);
  assert.equal(fn.mock.callCount(), 2);
});

test("curry & infinite sum", () => {
  const add3 = curry((a, b, c) => a + b + c);
  assert.equal(add3(1)(2)(3), 6);
  assert.equal(add3(1, 2)(3), 6);
  assert.equal(add3(1, 2, 3), 6);
  assert.equal(sum(1)(2)(3)(), 6);
});

test("compose / pipe", () => {
  const inc = (x) => x + 1, dbl = (x) => x * 2;
  assert.equal(compose(inc, dbl)(3), 7);
  assert.equal(pipe(inc, dbl)(3), 8);
});
