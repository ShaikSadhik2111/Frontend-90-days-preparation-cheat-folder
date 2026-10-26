// ─── deepClone (handles Date, RegExp, Map, Set, arrays, cycles) ────────────
export function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);          // circular refs
  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (value instanceof Map) {
    const m = new Map(); seen.set(value, m);
    value.forEach((v, k) => m.set(deepClone(k, seen), deepClone(v, seen)));
    return m;
  }
  if (value instanceof Set) {
    const s = new Set(); seen.set(value, s);
    value.forEach((v) => s.add(deepClone(v, seen)));
    return s;
  }
  const copy = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  seen.set(value, copy);
  for (const key of Reflect.ownKeys(value)) copy[key] = deepClone(value[key], seen);
  return copy;
}

// ─── deepEqual ─────────────────────────────────────────────────────────────
export function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));
}

// ─── get (lodash.get) ──────────────────────────────────────────────────────
// get(obj, "a.b[0].c", "default")
export function get(obj, path, defaultValue) {
  const keys = Array.isArray(path) ? path : path.replace(/\[(\w+)\]/g, ".$1").split(".").filter(Boolean);
  let current = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return defaultValue;
    current = current[key];
  }
  return current === undefined ? defaultValue : current;
}

// ─── set (lodash.set) ──────────────────────────────────────────────────────
export function set(obj, path, value) {
  const keys = path.replace(/\[(\w+)\]/g, ".$1").split(".").filter(Boolean);
  let current = obj;
  keys.forEach((key, i) => {
    if (i === keys.length - 1) { current[key] = value; return; }
    if (current[key] === null || typeof current[key] !== "object") {
      current[key] = /^\d+$/.test(keys[i + 1]) ? [] : {};
    }
    current = current[key];
  });
  return obj;
}

// ─── groupBy ───────────────────────────────────────────────────────────────
export function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = typeof keyFn === "function" ? keyFn(item) : item[keyFn];
    (acc[key] ??= []).push(item);
    return acc;
  }, {});
}

// ─── flattenObject {a:{b:1}} → {"a.b": 1} ──────────────────────────────────
export function flattenObject(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flattenObject(v, key, out);
    else out[key] = v;
  }
  return out;
}

// ─── classNames("a", { b: true, c: false }, ["d"]) → "a b d" ───────────────
export function classNames(...args) {
  const out = [];
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === "string" || typeof arg === "number") out.push(arg);
    else if (Array.isArray(arg)) { const inner = classNames(...arg); if (inner) out.push(inner); }
    else if (typeof arg === "object") for (const [k, v] of Object.entries(arg)) if (v) out.push(k);
  }
  return out.join(" ");
}
