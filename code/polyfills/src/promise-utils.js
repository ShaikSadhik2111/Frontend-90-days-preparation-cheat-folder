// ─── Promise.all ───────────────────────────────────────────────────────────
// Resolves with results in INPUT order; rejects on the first rejection.
export function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const items = Array.from(iterable);
    const results = new Array(items.length);
    let remaining = items.length;
    if (remaining === 0) return resolve([]);
    items.forEach((item, i) => {
      Promise.resolve(item).then((value) => {
        results[i] = value;
        if (--remaining === 0) resolve(results);
      }, reject);
    });
  });
}

// ─── Promise.allSettled ────────────────────────────────────────────────────
export function promiseAllSettled(iterable) {
  return promiseAll(
    Array.from(iterable).map((item) =>
      Promise.resolve(item).then(
        (value) => ({ status: "fulfilled", value }),
        (reason) => ({ status: "rejected", reason })
      )
    )
  );
}

// ─── Promise.race ──────────────────────────────────────────────────────────
export function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    for (const item of iterable) Promise.resolve(item).then(resolve, reject);
  });
}

// ─── Promise.any ───────────────────────────────────────────────────────────
export function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    const items = Array.from(iterable);
    const errors = new Array(items.length);
    let remaining = items.length;
    if (remaining === 0) return reject(new AggregateError([], "All promises were rejected"));
    items.forEach((item, i) => {
      Promise.resolve(item).then(resolve, (err) => {
        errors[i] = err;
        if (--remaining === 0) reject(new AggregateError(errors, "All promises were rejected"));
      });
    });
  });
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── retry with exponential backoff ────────────────────────────────────────
export async function retry(fn, { retries = 3, delay = 100, factor = 2 } = {}) {
  let attempt = 0;
  for (;;) {
    try {
      return await fn(attempt);
    } catch (err) {
      if (attempt >= retries) throw err;
      await sleep(delay * factor ** attempt);
      attempt++;
    }
  }
}

// ─── timeout wrapper ───────────────────────────────────────────────────────
export function withTimeout(promise, ms) {
  let id;
  const timeout = new Promise((_, reject) => {
    id = setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(id));
}

// ─── concurrency-limited pool ──────────────────────────────────────────────
// Run async tasks (functions returning promises) with at most `limit` running.
// Asked as: "upload 100 files, max 3 at a time".
export function promisePool(tasks, limit) {
  return new Promise((resolve, reject) => {
    const results = new Array(tasks.length);
    let next = 0;
    let done = 0;
    if (tasks.length === 0) return resolve([]);

    const runNext = () => {
      if (next >= tasks.length) return;
      const index = next++;
      Promise.resolve()
        .then(() => tasks[index]())
        .then((value) => {
          results[index] = value;
          if (++done === tasks.length) resolve(results);
          else runNext();
        }, reject);
    };
    for (let i = 0; i < Math.min(limit, tasks.length); i++) runNext();
  });
}

// ─── promisify ─────────────────────────────────────────────────────────────
export function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) =>
      fn(...args, (err, result) => (err ? reject(err) : resolve(result)))
    );
}

// ─── Minimal Promise implementation (product-company favourite) ────────────
const PENDING = 0, FULFILLED = 1, REJECTED = 2;
export class MyPromise {
  #state = PENDING;
  #value;
  #handlers = [];

  constructor(executor) {
    const resolve = (v) => this.#settle(FULFILLED, v);
    const reject = (e) => this.#settle(REJECTED, e);
    try { executor(resolve, reject); } catch (e) { reject(e); }
  }

  #settle(state, value) {
    if (this.#state !== PENDING) return;
    // adopt thenables
    if (state === FULFILLED && value && typeof value.then === "function") {
      value.then((v) => this.#settle(FULFILLED, v), (e) => this.#settle(REJECTED, e));
      return;
    }
    this.#state = state;
    this.#value = value;
    this.#handlers.forEach((h) => this.#run(h));
    this.#handlers = [];
  }

  #run({ onFulfilled, onRejected, resolve, reject }) {
    queueMicrotask(() => {
      const cb = this.#state === FULFILLED ? onFulfilled : onRejected;
      if (typeof cb !== "function") {
        (this.#state === FULFILLED ? resolve : reject)(this.#value);
        return;
      }
      try { resolve(cb(this.#value)); } catch (e) { reject(e); }
    });
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const h = { onFulfilled, onRejected, resolve, reject };
      if (this.#state === PENDING) this.#handlers.push(h);
      else this.#run(h);
    });
  }
  catch(onRejected) { return this.then(undefined, onRejected); }
  finally(cb) {
    return this.then(
      (v) => MyPromise.resolve(cb()).then(() => v),
      (e) => MyPromise.resolve(cb()).then(() => { throw e; })
    );
  }
  static resolve(v) { return v instanceof MyPromise ? v : new MyPromise((r) => r(v)); }
  static reject(e) { return new MyPromise((_, r) => r(e)); }
}
