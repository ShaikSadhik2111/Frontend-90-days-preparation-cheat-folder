# 18 — Web Components

> Browser-native components: **Custom Elements** + **Shadow DOM** + **HTML templates/slots**. Framework-agnostic — work in React, Angular, AngularJS or plain HTML.

```js
class StatusBadge extends HTMLElement {
  static observedAttributes = ["status"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>:host { display:inline-block } .b { padding:2px 8px; border-radius:999px; font: 12px system-ui }
      .online { background:#dcfce7 } .offline { background:#fee2e2 }</style>
      <span class="b"><slot></slot></span>`;
  }
  attributeChangedCallback(name, _old, value) {
    this.shadowRoot.querySelector(".b").className = `b ${value}`;
  }
  connectedCallback() { /* added to DOM */ }
  disconnectedCallback() { /* cleanup listeners */ }
}
customElements.define("status-badge", StatusBadge);   // name must contain a hyphen
```
```html
<status-badge status="online">Pump A</status-badge>
```

## Key concepts
- **Lifecycle**: `constructor`, `connectedCallback`, `disconnectedCallback`, `attributeChangedCallback`, `adoptedCallback`.
- **Shadow DOM**: encapsulated DOM + styles (outside CSS doesn't leak in, except inherited properties and CSS custom properties). Style from outside with `::part()` and CSS variables.
- **Slots**: project light-DOM children into the shadow tree.
- **Events**: dispatch `CustomEvent` with `bubbles: true, composed: true` to cross the shadow boundary.
- Libraries: **Lit** (reactive properties, templates), Stencil.

## When companies use them
Design systems shared across multiple frameworks (Siemens iX, Bosch-like design systems often ship web components), micro-frontends, embedding widgets in third-party pages, **legacy migrations** (one component usable in AngularJS and React).

## React interop
React 19 supports custom elements fully (properties vs attributes, custom events). React 18 passes everything as attributes and needs refs + `addEventListener` for custom events.

## Interview questions
1. What are Web Components? Pros/cons vs React components?
2. Shadow DOM vs Virtual DOM?
3. How do you style a component with shadow DOM from outside?
4. How do events cross the shadow boundary?

Next → [19 Modern browser APIs](../19-modern-browser-apis/README.md)
