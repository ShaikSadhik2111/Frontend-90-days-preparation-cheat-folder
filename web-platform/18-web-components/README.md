# 18 — Web Components and Custom Elements

**Connection:** DOM, events and CSS are platform primitives that can be packaged into standards-based custom elements.

**Learn:** customElements, lifecycle callbacks, Shadow DOM, slots, CSS encapsulation, CustomEvent and framework interoperability.

**Example**
```js
class UserBadge extends HTMLElement {
  connectedCallback() {
    this.textContent = this.getAttribute("name") ?? "Unknown";
  }
}
customElements.define("user-badge", UserBadge);
```

**Production:** design-system primitives, framework-neutral widgets and legacy integration.

**Pitfalls:** assuming Shadow DOM solves every styling issue, poor accessibility, lifecycle leaks and event-retargeting surprises.

**Interview:** Shadow DOM vs iframe? encapsulation? CustomEvent? when useful in React?

**Challenge:** build an accessible tooltip custom element and consume it from React.

**Next:** modern browser capabilities.