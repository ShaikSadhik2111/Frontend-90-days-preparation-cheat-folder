# 04 — DOM and CSSOM

**Connection:** HTML becomes the DOM; CSS becomes the CSSOM.

**Learn:** Node/Element relationships, traversal, selectors, attributes vs properties, classList, dataset, createElement, event listeners and computed styles.

**Example**
```js
const button = document.querySelector("[data-action='save']");
button?.addEventListener("click", () => {
  button.classList.toggle("is-loading");
});
```

**Production:** refs, focus management, measurements, third-party widgets and debugging.

**Pitfalls:** repeated layout reads/writes, stale elements, forgotten listener cleanup, unsafe innerHTML, broad selectors and mutating DOM behind React.

**Debugging:** inspect DOM, attributes and computed styles before assuming application state is wrong.

**Interview:** property vs attribute? Why can measurement trigger layout? Why is direct DOM mutation risky in React?

**Challenge:** implement vanilla tabs with minimal DOM mutation.

**Next:** browser events.