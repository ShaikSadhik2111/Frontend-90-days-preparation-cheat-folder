// ─── debounce ──────────────────────────────────────────────────────────────
// Run `fn` only after `wait` ms have passed without another call.
// Use: search input, window resize, autosave.
export function debounce(fn, wait, { leading = false } = {}) {
  let timer = null;
  function debounced(...args) {
    const callNow = leading && timer === null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!leading) fn.apply(this, args); // keep `this` + latest args
    }, wait);
    if (callNow) fn.apply(this, args);
  }
  debounced.cancel = () => { clearTimeout(timer); timer = null; };
  return debounced;
}

// ─── throttle ──────────────────────────────────────────────────────────────
// Run `fn` at most once every `wait` ms. Leading call immediately,
// trailing call with the latest args at the end of the window.
// Use: scroll, mousemove, resize-driven layout work.
export function throttle(fn, wait) {
  let last = null; // time of the last real call (null = never called)
  let timer = null;
  let pendingArgs = null;
  let pendingThis = null;

  return function throttled(...args) {
    const now = Date.now();
    const remaining = last === null ? 0 : wait - (now - last);
    if (remaining <= 0) {
      clearTimeout(timer);
      timer = null;
      last = now;
      fn.apply(this, args);
    } else {
      pendingArgs = args;
      pendingThis = this;
      if (!timer) {
        timer = setTimeout(() => {
          last = Date.now();
          timer = null;
          fn.apply(pendingThis, pendingArgs);
        }, remaining);
      }
    }
  };
}

// ─── once ──────────────────────────────────────────────────────────────────
export function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) { called = true; result = fn.apply(this, args); }
    return result;
  };
}

// ─── memoize ───────────────────────────────────────────────────────────────
// Cache results by a key (default: JSON of args). Only for pure functions.
export function memoize(fn, resolver = (...args) => JSON.stringify(args)) {
  const cache = new Map();
  function memoized(...args) {
    const key = resolver(...args);
    if (cache.has(key)) return cache.get(key);
    const value = fn.apply(this, args);
    cache.set(key, value);
    return value;
  }
  memoized.cache = cache;
  return memoized;
}

// ─── curry ─────────────────────────────────────────────────────────────────
// curry(f)(a)(b)(c) === curry(f)(a, b)(c) === f(a, b, c)
export function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...next) => curried.apply(this, [...args, ...next]);
  };
}

// Infinite currying: sum(1)(2)(3)() === 6
export function sum(a) {
  return (b) => (b === undefined ? a : sum(a + b));
}

// ─── compose / pipe ────────────────────────────────────────────────────────
export const compose = (...fns) => (x) => fns.reduceRight((acc, f) => f(acc), x);
export const pipe = (...fns) => (x) => fns.reduce((acc, f) => f(acc), x);
