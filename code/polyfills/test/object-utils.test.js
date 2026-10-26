import { test } from "node:test";
import assert from "node:assert/strict";
import { deepClone, deepEqual, get, set, groupBy, flattenObject, classNames } from "../src/object-utils.js";
import { EventEmitter } from "../src/EventEmitter.js";
import { LRUCache } from "../src/LRUCache.js";

test("deepClone handles nesting, Date, Map, Set and cycles", () => {
  const src = { a: [1, { b: 2 }], d: new Date(0), m: new Map([["k", { v: 1 }]]), s: new Set([1]) };
  src.self = src;
  const c = deepClone(src);
  assert.notEqual(c, src);
  assert.notEqual(c.a[1], src.a[1]);
  assert.deepEqual(c.a, src.a);
  assert.equal(c.d.getTime(), 0);
  assert.notEqual(c.m.get("k"), src.m.get("k"));
  assert.equal(c.self, c);
});

test("deepEqual", () => {
  assert.ok(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }));
  assert.ok(!deepEqual({ a: 1 }, { a: 1, b: undefined }));
  assert.ok(deepEqual(NaN, NaN));
  assert.ok(!deepEqual([1], { 0: 1 }));
});

test("get / set", () => {
  const o = { a: { b: [{ c: 5 }] } };
  assert.equal(get(o, "a.b[0].c"), 5);
  assert.equal(get(o, "a.x.y", "def"), "def");
  const t = {};
  set(t, "x.y[0].z", 1);
  assert.deepEqual(t, { x: { y: [{ z: 1 }] } });
});

test("groupBy / flattenObject / classNames", () => {
  assert.deepEqual(groupBy([1.2, 1.5, 2.1], Math.floor), { 1: [1.2, 1.5], 2: [2.1] });
  assert.deepEqual(flattenObject({ a: { b: 1, c: { d: 2 } } }), { "a.b": 1, "a.c.d": 2 });
  assert.equal(classNames("btn", { active: true, disabled: false }, ["lg", null]), "btn active lg");
});

test("EventEmitter on/off/once/unsubscribe", () => {
  const e = new EventEmitter();
  const calls = [];
  const unsub = e.on("x", (v) => calls.push("a" + v));
  e.once("x", (v) => calls.push("once" + v));
  e.emit("x", 1);
  e.emit("x", 2);
  unsub();
  assert.equal(e.emit("x", 3), false);
  assert.deepEqual(calls, ["a1", "once1", "a2"]);
});

test("LRUCache (LeetCode 146 example)", () => {
  const c = new LRUCache(2);
  c.put(1, 1); c.put(2, 2);
  assert.equal(c.get(1), 1);
  c.put(3, 3);               // evicts 2
  assert.equal(c.get(2), -1);
  c.put(4, 4);               // evicts 1
  assert.equal(c.get(1), -1);
  assert.equal(c.get(3), 3);
  assert.equal(c.get(4), 4);
});
