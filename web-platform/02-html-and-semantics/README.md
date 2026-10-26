# 02 — HTML & semantics

> Semantic HTML gives meaning to content → free accessibility, better SEO, built-in keyboard behaviour, less JavaScript.

## Landmarks & structure
```html
<header>…logo, top nav…</header>
<nav aria-label="Main">…</nav>
<main>
  <h1>Devices</h1>            <!-- one h1 per page, headings in order (no skipping h2 → h4) -->
  <section aria-labelledby="alarms-h"><h2 id="alarms-h">Active alarms</h2>…</section>
  <article>…self-contained item (post, card)…</article>
  <aside>…related content…</aside>
</main>
<footer>…</footer>
```
`div`/`span` are for styling only — no meaning.

## Interactive elements
- `<button>` = action (submit, open, save). `<a href>` = navigation. Never `<div onclick>` — no focus, no Enter/Space, no role.
- `<button>` inside a form defaults to `type="submit"` → set `type="button"` for non-submit buttons.
- `<details><summary>` = native disclosure; `<dialog>` = native modal (`showModal()` gives focus trapping + Escape + backdrop).

## Forms
```html
<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-hint" />
  <p id="email-hint">We'll never share it.</p>
  <fieldset><legend>Plan</legend>
    <label><input type="radio" name="plan" value="free" checked /> Free</label>
    <label><input type="radio" name="plan" value="pro" /> Pro</label>
  </fieldset>
  <button type="submit">Sign up</button>
</form>
```
Correct `type` (email, tel, number, date) → right mobile keyboard + validation. `autocomplete` helps password managers and accessibility.

## Images & media
`alt` describes the image's purpose; `alt=""` for decorative images. Always `width`/`height` (prevents layout shift). `<picture>` + `srcset`/`sizes` for responsive images. `loading="lazy"` below the fold.

## Tables
Use `<table>` for **tabular data** (not layout) with `<caption>`, `<thead>`, `<th scope="col">`. Screen readers announce headers per cell.

## Head essentials
`<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, `<title>`, `<meta name="description">`, `<html lang="en">` (screen reader pronunciation), Open Graph tags for sharing.

## Interview questions
1. Why semantic HTML? (a11y, SEO, keyboard, maintainability)
2. `<button>` vs `<a>`?
3. `<section>` vs `<article>` vs `<div>`?
4. What does `lang` do? What's the viewport meta for?
5. When is `alt=""` correct?

Next → [03 CSS foundations & layout](../03-css-foundations-layout/README.md)
