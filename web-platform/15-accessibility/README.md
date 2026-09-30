# 15 — Accessibility and Platform Semantics

**Connection:** semantic HTML supplies meaning to browsers and assistive technologies.

**Learn:** accessible names, labels, focus management, keyboard navigation, focus-visible, ARIA, live regions, reduced motion, contrast, forms and error messaging.

**Example**
```html
<button type="button" aria-expanded="false" aria-controls="menu">
  Menu
</button>
```

**Production:** dialogs, tabs, menus, forms, grids and async status.

**Pitfalls:** ARIA without behavior, removing focus outlines, inaccessible custom controls and broken focus restoration.

**Interview:** accessible name? when ARIA? accessible modal? why semantic HTML first?

**Challenge:** build a modal with focus capture, Escape, restoration and labeling.

**Next:** performance.