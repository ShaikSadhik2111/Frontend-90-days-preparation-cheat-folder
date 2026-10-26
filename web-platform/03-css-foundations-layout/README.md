# 03 — CSS foundations & layout

## Cascade, specificity, inheritance
The cascade decides which rule wins: **origin & `!important` → cascade layers (`@layer`) → specificity → source order**.
Specificity (a, b, c):
| Selector | Score |
|---|---|
| inline `style=""` | beats all selectors |
| `#id` | (1,0,0) |
| `.class`, `[attr]`, `:hover` | (0,1,0) |
| `div`, `::before` | (0,0,1) |
| `*`, `:where()` | 0 |
`:is()`/`:not()`/`:has()` take their most specific argument. Inherited properties: `color`, `font-*`, `line-height`, `visibility`; not inherited: `margin`, `padding`, `border`, `background`.

## Box model
`content + padding + border + margin`. Use `*, *::before, *::after { box-sizing: border-box; }` → `width` includes padding and border. Vertical margins between blocks **collapse** (the larger wins); flex/grid items don't collapse.

## Display & positioning
- `block`, `inline` (ignores width/height, vertical margins), `inline-block`, `flex`, `grid`, `none`.
- `position`: `static` · `relative` (offset from self, becomes containing block for absolute children) · `absolute` (relative to nearest positioned ancestor) · `fixed` (viewport — **unless an ancestor has `transform`/`filter`**) · `sticky` (needs `top`; breaks if an ancestor has `overflow: hidden/auto` without height).

## Stacking context & z-index
`z-index` works on positioned elements and flex/grid items. New stacking contexts: `position` + `z-index`, `opacity < 1`, `transform`, `filter`, `will-change`, `isolation: isolate`, `position: fixed/sticky`. **A child can never rise above its parent's stacking context** → the usual "z-index: 9999 doesn't work" answer; fix by changing the context or rendering in a portal.

## Flexbox (1-D)
```css
.toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.toolbar .search { flex: 1; min-width: 0; }   /* min-width:0 lets long text shrink */
```
`flex: 1` = `flex: 1 1 0%` (grow, shrink, basis). `justify-content` = main axis, `align-items` = cross axis.

## Grid (2-D)
```css
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; } /* responsive, no media queries */
.shell { display: grid; grid-template: "header header" 64px "nav main" 1fr / 240px 1fr; min-height: 100dvh; }
.shell > header { grid-area: header; }
```
`auto-fit` collapses empty tracks (items stretch); `auto-fill` keeps them.

## Centering (3 ways)
```css
.parent { display: grid; place-items: center; }
.parent { display: flex; justify-content: center; align-items: center; }
.child { position: absolute; inset: 0; margin: auto; width: 200px; height: 100px; }
```

## Responsive design
Mobile-first `@media (min-width: 768px)`; relative units (`rem` = root font size, `em` = element's font size, `%`, `vw/vh`, `dvh` for mobile browser bars); `clamp(1rem, 2.5vw, 1.5rem)` fluid type; **container queries** `@container (min-width: 400px)` for components that adapt to their container; `max-width: 100%` images.

## Modern CSS worth naming
Custom properties (`--color-primary`, theming/dark mode), `:has()` (parent selector), nesting, `@layer`, `aspect-ratio`, logical properties (`margin-inline`, RTL-friendly), `prefers-color-scheme`, `prefers-reduced-motion`.

## CSS architecture
BEM naming · CSS Modules (scoped class names) · CSS-in-JS (styled-components/Emotion — runtime cost, SSR setup) · utility-first (Tailwind) · SCSS (variables, mixins). Answer with trade-offs, not preferences.

## Interview questions
1. Calculate specificity of `#nav .item a:hover`. → (1,2,1)
2. Why doesn't my `z-index` work? Why doesn't `position: sticky` work?
3. Flex vs Grid — when each?
4. `em` vs `rem`? `display:none` vs `visibility:hidden` vs `opacity:0`?
5. Build a responsive card grid without media queries.
6. How do you implement dark mode?

Next → [04 DOM & CSSOM](../04-dom-and-cssom/README.md)
