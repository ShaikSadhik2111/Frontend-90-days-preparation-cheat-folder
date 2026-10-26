// call / apply / bind polyfills.
// Trick: temporarily attach the function to the context object as a unique
// Symbol property, call it as a method (implicit binding), then delete it.

Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") throw new TypeError("myCall must be called on a function");
  const ctx = context === null || context === undefined ? globalThis : Object(context);
  const key = Symbol("fn");
  ctx[key] = this;
  try {
    return ctx[key](...args);
  } finally {
    delete ctx[key];
  }
};

Function.prototype.myApply = function (context, args = []) {
  return this.myCall(context, ...args);
};

Function.prototype.myBind = function (context, ...boundArgs) {
  const original = this;
  function bound(...args) {
    // If called with `new`, ignore the bound context (spec behaviour).
    if (new.target) return new original(...boundArgs, ...args);
    return original.myCall(context, ...boundArgs, ...args);
  }
  if (original.prototype) bound.prototype = Object.create(original.prototype);
  return bound;
};

export {}; // module marker
