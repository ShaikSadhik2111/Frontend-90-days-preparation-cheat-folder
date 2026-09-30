# 03 — CSS Foundations and Layout

**Connection:** HTML defines structure; CSS defines presentation and layout.

**Learn:** cascade, inheritance, specificity, box model, display, positioning, containing blocks, overflow, Flexbox, Grid, media/container queries, stacking contexts, transforms and transitions.

**Example**
```css
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}
```

**Production:** responsive dashboards, design systems, theming and focus states.

**Pitfalls:** absolute-positioning everything, specificity wars, overflow bugs, accidental stacking contexts and JavaScript viewport checks where CSS can solve the problem.

**Interview:** Flexbox vs Grid? What creates a stacking context? Why can transforms affect positioning? What causes layout shift?

**Challenge:** build a responsive dashboard using Grid and container queries.

**Next:** DOM/CSSOM.