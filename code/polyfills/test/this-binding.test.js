import { test } from "node:test";
import assert from "node:assert/strict";
import "../src/this-binding.js";

function greet(greeting, mark) { return `${greeting}, ${this.name}${mark}`; }
const user = { name: "Sadhik" };

test("myCall / myApply", () => {
  assert.equal(greet.myCall(user, "Hi", "!"), "Hi, Sadhik!");
  assert.equal(greet.myApply(user, ["Hello", "?"]), "Hello, Sadhik?");
  assert.equal(Object.getOwnPropertySymbols(user).length, 0, "temporary key removed");
});

test("myBind with partial args and new", () => {
  const bound = greet.myBind(user, "Hey");
  assert.equal(bound("."), "Hey, Sadhik.");
  function Point(x, y) { this.x = x; this.y = y; }
  const BoundPoint = Point.myBind(null, 1);
  const p = new BoundPoint(2);
  assert.deepEqual({ x: p.x, y: p.y }, { x: 1, y: 2 });
  assert.ok(p instanceof Point);
});
