import { test } from "node:test";
import assert from "node:assert/strict";
import {
  promiseAll, promiseAllSettled, promiseRace, promiseAny, retry,
  withTimeout, promisePool, promisify, sleep, MyPromise,
} from "../src/promise-utils.js";

test("promiseAll keeps order and rejects fast", async () => {
  assert.deepEqual(await promiseAll([sleep(20).then(() => "a"), "b", Promise.resolve("c")]), ["a", "b", "c"]);
  await assert.rejects(promiseAll([sleep(50), Promise.reject(new Error("x"))]), /x/);
  assert.deepEqual(await promiseAll([]), []);
});

test("promiseAllSettled", async () => {
  const r = await promiseAllSettled([1, Promise.reject("no")]);
  assert.deepEqual(r, [{ status: "fulfilled", value: 1 }, { status: "rejected", reason: "no" }]);
});

test("promiseRace / promiseAny", async () => {
  assert.equal(await promiseRace([sleep(30).then(() => "slow"), sleep(5).then(() => "fast")]), "fast");
  assert.equal(await promiseAny([Promise.reject(1), sleep(5).then(() => "ok")]), "ok");
  await assert.rejects(promiseAny([Promise.reject(1), Promise.reject(2)]), AggregateError);
});

test("retry succeeds on 3rd attempt", async () => {
  let calls = 0;
  const v = await retry(async () => { calls++; if (calls < 3) throw new Error("fail"); return "done"; }, { retries: 3, delay: 1 });
  assert.equal(v, "done");
  assert.equal(calls, 3);
});

test("withTimeout", async () => {
  await assert.rejects(withTimeout(sleep(50), 10), /Timed out/);
  assert.equal(await withTimeout(Promise.resolve(1), 10), 1);
});

test("promisePool never exceeds the limit", async () => {
  let running = 0, maxRunning = 0;
  const tasks = Array.from({ length: 8 }, (_, i) => async () => {
    running++; maxRunning = Math.max(maxRunning, running);
    await sleep(5 + (i % 3) * 5);
    running--;
    return i;
  });
  const results = await promisePool(tasks, 3);
  assert.deepEqual(results, [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.equal(maxRunning, 3);
});

test("promisify", async () => {
  const cbFn = (a, cb) => setTimeout(() => (a < 0 ? cb(new Error("neg")) : cb(null, a * 2)));
  assert.equal(await promisify(cbFn)(2), 4);
  await assert.rejects(promisify(cbFn)(-1), /neg/);
});

test("MyPromise: chaining, async order, errors, finally", async () => {
  const order = [];
  new MyPromise((res) => { order.push("executor"); res(1); }).then((v) => order.push("then " + v));
  order.push("sync");
  await sleep(0);
  assert.deepEqual(order, ["executor", "sync", "then 1"]);

  const v = await new MyPromise((res) => setTimeout(() => res(2), 5))
    .then((x) => x * 10)
    .then((x) => { throw new Error("boom " + x); })
    .catch((e) => e.message)
    .finally(() => {});
  assert.equal(v, "boom 20");

  assert.equal(await MyPromise.resolve(new MyPromise((r) => r(7))), 7);
});
